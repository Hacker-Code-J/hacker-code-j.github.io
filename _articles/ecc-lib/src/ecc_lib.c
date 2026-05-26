#include "ecc_lib.h"

static const word_t P256_P[P256_WORDS] = {
    0xffffffffu, 0xffffffffu, 0xffffffffu, 0x00000000u,
    0x00000000u, 0x00000000u, 0x00000001u, 0xffffffffu
};

static const word_t P256_N[P256_WORDS] = {
    0xfc632551u, 0xf3b9cac2u, 0xa7179e84u, 0xbce6faadu,
    0xffffffffu, 0xffffffffu, 0x00000000u, 0xffffffffu
};

static const word_t P256_B[P256_WORDS] = {
    0x27d2604bu, 0x3bce3c3eu, 0xcc53b0f6u, 0x651d06b0u,
    0x769886bcu, 0xb3ebbd55u, 0xaa3a93e7u, 0x5ac635d8u
};

static const word_t P256_GX[P256_WORDS] = {
    0xd898c296u, 0xf4a13945u, 0x2deb33a0u, 0x77037d81u,
    0x63a440f2u, 0xf8bce6e5u, 0xe12c4247u, 0x6b17d1f2u
};

static const word_t P256_GY[P256_WORDS] = {
    0x37bf51f5u, 0xcbb64068u, 0x6b315eceu, 0x2bce3357u,
    0x7c0f9e16u, 0x8ee7eb4au, 0xfe1a7f9bu, 0x4fe342e2u
};

static const word_t P256_PM2[P256_WORDS] = {
    0xfffffffdu, 0xffffffffu, 0xffffffffu, 0x00000000u,
    0x00000000u, 0x00000000u, 0x00000001u, 0xffffffffu
};

static const word_t P256_R2[P256_WORDS] = {
    0x00000003u, 0x00000000u, 0xffffffffu, 0xfffffffbu,
    0xfffffffeu, 0xffffffffu, 0xfffffffdu, 0x00000004u
};

static void word_copy(word_t *r, const word_t *a, uint32_t n) {
    for (uint32_t i = 0; i < n; i++) r[i] = a[i];
}

static void word_zero(word_t *r, uint32_t n) {
    for (uint32_t i = 0; i < n; i++) r[i] = 0u;
}

void p256_mul_words(word_t a, word_t b, word_t *lo, word_t *hi) {
    word_t a0 = a & P256_HALF_MASK;
    word_t a1 = a >> P256_HALF_BITS;
    word_t b0 = b & P256_HALF_MASK;
    word_t b1 = b >> P256_HALF_BITS;
    word_t p0 = a0 * b0;
    word_t p1 = a0 * b1;
    word_t p2 = a1 * b0;
    word_t p3 = a1 * b1;
    word_t mid = (p0 >> P256_HALF_BITS) + (p1 & P256_HALF_MASK) + (p2 & P256_HALF_MASK);

    *lo = (p0 & P256_HALF_MASK) | ((mid & P256_HALF_MASK) << P256_HALF_BITS);
    *hi = p3 + (p1 >> P256_HALF_BITS) + (p2 >> P256_HALF_BITS) + (mid >> P256_HALF_BITS);
}

uint32_t p256_add_words(word_t *r, const word_t *a, const word_t *b, uint32_t n) {
    word_t carry = 0u;
    for (uint32_t i = 0; i < n; i++) {
        word_t s = a[i] + b[i];
        word_t c1 = (s < a[i]);
        word_t t = s + carry;
        word_t c2 = (t < s);
        r[i] = t;
        carry = c1 | c2;
    }
    return carry;
}

uint32_t p256_sub_words(word_t *r, const word_t *a, const word_t *b, uint32_t n) {
    word_t borrow = 0u;
    for (uint32_t i = 0; i < n; i++) {
        word_t d = a[i] - b[i];
        word_t b1 = (a[i] < b[i]);
        word_t e = d - borrow;
        word_t b2 = (d < borrow);
        r[i] = e;
        borrow = b1 | b2;
    }
    return borrow;
}

int p256_cmp_words(const word_t *a, const word_t *b, uint32_t n) {
    for (uint32_t i = n; i > 0u; i--) {
        uint32_t j = i - 1u;
        if (a[j] < b[j]) return -1;
        if (a[j] > b[j]) return 1;
    }
    return 0;
}

static uint32_t add_word_at(word_t *r, uint32_t n, uint32_t pos, word_t x) {
    if (x == 0u) return 0u;
    while (pos < n) {
        word_t old = r[pos];
        r[pos] = old + x;
        if (r[pos] >= old) return 0u;
        x = 1u;
        pos++;
    }
    return 1u;
}

static void mul_8x8(word_t out[P256_PRODUCT_WORDS], const word_t *a, const word_t *b) {
    word_t t[P256_PRODUCT_WORDS + 1u];
    word_zero(t, P256_PRODUCT_WORDS + 1u);
    for (uint32_t i = 0; i < P256_WORDS; i++) {
        for (uint32_t j = 0; j < P256_WORDS; j++) {
            word_t lo, hi;
            p256_mul_words(a[i], b[j], &lo, &hi);
            (void)add_word_at(t, P256_PRODUCT_WORDS + 1u, i + j, lo);
            (void)add_word_at(t, P256_PRODUCT_WORDS + 1u, i + j + 1u, hi);
        }
    }
    for (uint32_t i = 0; i < P256_PRODUCT_WORDS; i++) out[i] = t[i];
}

static uint32_t rem_ge_p(const word_t rem[9]) {
    if (rem[8] != 0u) return 1u;
    return p256_cmp_words(rem, P256_P, P256_WORDS) >= 0;
}

static void rem_sub_p(word_t rem[9]) {
    word_t borrow = p256_sub_words(rem, rem, P256_P, P256_WORDS);
    rem[8] = rem[8] - borrow;
}

static void rem_shift_add(word_t rem[9], word_t bit) {
    word_t carry = bit;
    for (uint32_t i = 0; i < 9u; i++) {
        word_t next = rem[i] >> 31u;
        rem[i] = (rem[i] << 1u) | carry;
        carry = next;
    }
}

static void reduce_product(fe256_t *r, const word_t x[P256_PRODUCT_WORDS]) {
    word_t rem[9];
    word_zero(rem, 9u);
    for (uint32_t wi = P256_PRODUCT_WORDS; wi > 0u; wi--) {
        word_t w = x[wi - 1u];
        for (uint32_t bi = P256_WORD_BITS; bi > 0u; bi--) {
            word_t bit = (w >> (bi - 1u)) & 1u;
            rem_shift_add(rem, bit);
            if (rem_ge_p(rem) != 0u) rem_sub_p(rem);
        }
    }
    for (uint32_t i = 0; i < P256_WORDS; i++) r->v[i] = rem[i];
}

static void mont_reduce(fe256_t *r, const word_t x[P256_PRODUCT_WORDS]) {
    word_t t[P256_PRODUCT_WORDS + 1u];
    word_zero(t, P256_PRODUCT_WORDS + 1u);
    for (uint32_t i = 0; i < P256_PRODUCT_WORDS; i++) t[i] = x[i];

    for (uint32_t i = 0; i < P256_WORDS; i++) {
        word_t m = t[i];
        for (uint32_t j = 0; j < P256_WORDS; j++) {
            word_t lo, hi;
            p256_mul_words(m, P256_P[j], &lo, &hi);
            (void)add_word_at(t, P256_PRODUCT_WORDS + 1u, i + j, lo);
            (void)add_word_at(t, P256_PRODUCT_WORDS + 1u, i + j + 1u, hi);
        }
        t[i] = 0u;
    }

    word_t u[9];
    for (uint32_t i = 0; i < 9u; i++) u[i] = t[i + P256_WORDS];
    while (rem_ge_p(u) != 0u) rem_sub_p(u);
    for (uint32_t i = 0; i < P256_WORDS; i++) r->v[i] = u[i];
}

void fe256_set_zero(fe256_t *r) {
    word_zero(r->v, P256_WORDS);
}

void fe256_set_one(fe256_t *r) {
    fe256_set_zero(r);
    r->v[0] = 1u;
}

void fe256_set_u32(fe256_t *r, word_t x) {
    fe256_set_zero(r);
    r->v[0] = x;
}

void fe256_copy(fe256_t *r, const fe256_t *a) {
    word_copy(r->v, a->v, P256_WORDS);
}

uint32_t fe256_is_zero(const fe256_t *a) {
    word_t z = 0u;
    for (uint32_t i = 0; i < P256_WORDS; i++) z |= a->v[i];
    return z == 0u;
}

uint32_t fe256_is_odd(const fe256_t *a) {
    return a->v[0] & 1u;
}

uint32_t fe256_is_canonical(const fe256_t *a) {
    return p256_cmp_words(a->v, P256_P, P256_WORDS) < 0;
}

uint32_t fe256_equal(const fe256_t *a, const fe256_t *b) {
    word_t d = 0u;
    for (uint32_t i = 0; i < P256_WORDS; i++) d |= a->v[i] ^ b->v[i];
    return d == 0u;
}

void fe256_add(fe256_t *r, const fe256_t *a, const fe256_t *b) {
    word_t carry = p256_add_words(r->v, a->v, b->v, P256_WORDS);
    if (carry != 0u || p256_cmp_words(r->v, P256_P, P256_WORDS) >= 0) {
        word_t tmp[P256_WORDS];
        (void)p256_sub_words(tmp, r->v, P256_P, P256_WORDS);
        word_copy(r->v, tmp, P256_WORDS);
    }
}

void fe256_sub(fe256_t *r, const fe256_t *a, const fe256_t *b) {
    word_t borrow = p256_sub_words(r->v, a->v, b->v, P256_WORDS);
    if (borrow != 0u) {
        word_t tmp[P256_WORDS];
        (void)p256_add_words(tmp, r->v, P256_P, P256_WORDS);
        word_copy(r->v, tmp, P256_WORDS);
    }
}

void fe256_neg(fe256_t *r, const fe256_t *a) {
    fe256_t zero;
    fe256_set_zero(&zero);
    if (fe256_is_zero(a) != 0u) {
        fe256_set_zero(r);
    } else {
        fe256_sub(r, &zero, a);
    }
}

void fe256_half(fe256_t *r, const fe256_t *a) {
    word_t tmp[9];
    for (uint32_t i = 0; i < P256_WORDS; i++) tmp[i] = a->v[i];
    tmp[8] = 0u;
    if ((a->v[0] & 1u) != 0u) {
        word_t carry = p256_add_words(tmp, tmp, P256_P, P256_WORDS);
        tmp[8] = carry;
    }
    for (uint32_t i = 0; i < P256_WORDS; i++) {
        r->v[i] = (tmp[i] >> 1u) | ((tmp[i + 1u] & 1u) << 31u);
    }
}

void fe256_mul(fe256_t *r, const fe256_t *a, const fe256_t *b) {
    word_t prod[P256_PRODUCT_WORDS];
    mul_8x8(prod, a->v, b->v);
    reduce_product(r, prod);
}

void fe256_sqr(fe256_t *r, const fe256_t *a) {
    fe256_mul(r, a, a);
}

void fe256_mul_small(fe256_t *r, const fe256_t *a, word_t c) {
    fe256_t b;
    fe256_set_u32(&b, c);
    fe256_mul(r, a, &b);
}

void fe256_inv(fe256_t *r, const fe256_t *a) {
    fe256_t acc;
    fe256_t base;
    fe256_set_one(&acc);
    fe256_copy(&base, a);
    for (uint32_t wi = P256_WORDS; wi > 0u; wi--) {
        word_t w = P256_PM2[wi - 1u];
        for (uint32_t bi = P256_WORD_BITS; bi > 0u; bi--) {
            word_t bit = (w >> (bi - 1u)) & 1u;
            fe256_sqr(&acc, &acc);
            if (bit != 0u) fe256_mul(&acc, &acc, &base);
        }
    }
    fe256_copy(r, &acc);
}

void fe256_mont_mul(fe256_t *r, const fe256_t *a, const fe256_t *b) {
    word_t prod[P256_PRODUCT_WORDS];
    mul_8x8(prod, a->v, b->v);
    mont_reduce(r, prod);
}

void fe256_to_mont(fe256_t *r, const fe256_t *a) {
    fe256_t r2;
    word_copy(r2.v, P256_R2, P256_WORDS);
    fe256_mont_mul(r, a, &r2);
}

void fe256_from_mont(fe256_t *r, const fe256_t *a) {
    fe256_t one;
    fe256_set_one(&one);
    fe256_mont_mul(r, a, &one);
}

void p256_get_prime(fe256_t *r) {
    word_copy(r->v, P256_P, P256_WORDS);
}

void p256_get_order(word_t r[P256_WORDS]) {
    word_copy(r, P256_N, P256_WORDS);
}

void p256_get_base_point(p256_affine_t *g) {
    word_copy(g->x.v, P256_GX, P256_WORDS);
    word_copy(g->y.v, P256_GY, P256_WORDS);
    g->infinity = 0u;
}

void p256_affine_set_infinity(p256_affine_t *r) {
    fe256_set_zero(&r->x);
    fe256_set_zero(&r->y);
    r->infinity = 1u;
}

void p256_affine_set(p256_affine_t *r, const fe256_t *x, const fe256_t *y) {
    fe256_copy(&r->x, x);
    fe256_copy(&r->y, y);
    r->infinity = 0u;
}

uint32_t p256_affine_on_curve(const p256_affine_t *p) {
    fe256_t y2, x2, x3, three_x, rhs, b;
    if (p->infinity != 0u) return 1u;
    if (fe256_is_canonical(&p->x) == 0u || fe256_is_canonical(&p->y) == 0u) return 0u;
    fe256_sqr(&y2, &p->y);
    fe256_sqr(&x2, &p->x);
    fe256_mul(&x3, &x2, &p->x);
    fe256_mul_small(&three_x, &p->x, 3u);
    fe256_sub(&rhs, &x3, &three_x);
    word_copy(b.v, P256_B, P256_WORDS);
    fe256_add(&rhs, &rhs, &b);
    return fe256_equal(&y2, &rhs);
}

uint32_t p256_validate_public(const p256_affine_t *p) {
    if (p->infinity != 0u) return 0u;
    return p256_affine_on_curve(p);
}

void p256_jac_set_infinity(p256_jac_t *r) {
    fe256_set_zero(&r->X);
    fe256_set_one(&r->Y);
    fe256_set_zero(&r->Z);
}

uint32_t p256_jac_is_infinity(const p256_jac_t *p) {
    return fe256_is_zero(&p->Z);
}

void p256_jac_from_affine(p256_jac_t *r, const p256_affine_t *p) {
    if (p->infinity != 0u) {
        p256_jac_set_infinity(r);
        return;
    }
    fe256_copy(&r->X, &p->x);
    fe256_copy(&r->Y, &p->y);
    fe256_set_one(&r->Z);
}

void p256_jac_to_affine(p256_affine_t *r, const p256_jac_t *p) {
    fe256_t zi, zi2, zi3;
    if (p256_jac_is_infinity(p) != 0u) {
        p256_affine_set_infinity(r);
        return;
    }
    fe256_inv(&zi, &p->Z);
    fe256_sqr(&zi2, &zi);
    fe256_mul(&zi3, &zi2, &zi);
    fe256_mul(&r->x, &p->X, &zi2);
    fe256_mul(&r->y, &p->Y, &zi3);
    r->infinity = 0u;
}

void p256_jac_double(p256_jac_t *r, const p256_jac_t *p) {
    fe256_t z2, xmz2, xpz2, a, b, c, d, two_d, c2, tmp;
    if (p256_jac_is_infinity(p) != 0u || fe256_is_zero(&p->Y) != 0u) {
        p256_jac_set_infinity(r);
        return;
    }
    fe256_sqr(&z2, &p->Z);
    fe256_sub(&xmz2, &p->X, &z2);
    fe256_add(&xpz2, &p->X, &z2);
    fe256_mul(&a, &xmz2, &xpz2);
    fe256_mul_small(&a, &a, 3u);
    fe256_add(&b, &p->Y, &p->Y);
    fe256_sqr(&c, &b);
    fe256_mul(&d, &c, &p->X);
    fe256_add(&two_d, &d, &d);
    fe256_sqr(&r->X, &a);
    fe256_sub(&r->X, &r->X, &two_d);
    fe256_sqr(&c2, &c);
    fe256_half(&c2, &c2);
    fe256_sub(&tmp, &d, &r->X);
    fe256_mul(&r->Y, &a, &tmp);
    fe256_sub(&r->Y, &r->Y, &c2);
    fe256_mul(&r->Z, &b, &p->Z);
}

void p256_jac_add_mixed(p256_jac_t *r, const p256_jac_t *p, const p256_affine_t *q) {
    fe256_t a, b, u2, s2, h, rr, h2, h3, x1h2, sum_x, tmp;
    if (q->infinity != 0u) {
        *r = *p;
        return;
    }
    if (p256_jac_is_infinity(p) != 0u) {
        p256_jac_from_affine(r, q);
        return;
    }
    fe256_sqr(&a, &p->Z);
    fe256_mul(&b, &a, &p->Z);
    fe256_mul(&u2, &q->x, &a);
    fe256_mul(&s2, &q->y, &b);
    fe256_sub(&h, &u2, &p->X);
    fe256_sub(&rr, &s2, &p->Y);
    if (fe256_is_zero(&h) != 0u) {
        if (fe256_is_zero(&rr) != 0u) {
            p256_jac_double(r, p);
        } else {
            p256_jac_set_infinity(r);
        }
        return;
    }
    fe256_sqr(&h2, &h);
    fe256_mul(&h3, &h2, &h);
    fe256_mul(&x1h2, &p->X, &h2);
    fe256_add(&sum_x, &p->X, &u2);
    fe256_mul(&tmp, &h2, &sum_x);
    fe256_sqr(&r->X, &rr);
    fe256_sub(&r->X, &r->X, &tmp);
    fe256_sub(&tmp, &x1h2, &r->X);
    fe256_mul(&r->Y, &rr, &tmp);
    fe256_mul(&tmp, &p->Y, &h3);
    fe256_sub(&r->Y, &r->Y, &tmp);
    fe256_mul(&r->Z, &p->Z, &h);
}

void p256_scalar_mul_public(p256_jac_t *r, const p256_affine_t *p, const word_t k[P256_WORDS]) {
    p256_jac_t acc;
    p256_jac_set_infinity(&acc);
    for (uint32_t wi = P256_WORDS; wi > 0u; wi--) {
        word_t w = k[wi - 1u];
        for (uint32_t bi = P256_WORD_BITS; bi > 0u; bi--) {
            word_t bit = (w >> (bi - 1u)) & 1u;
            p256_jac_t doubled, added;
            p256_jac_double(&doubled, &acc);
            p256_jac_add_mixed(&added, &doubled, p);
            acc = doubled;
            if (bit != 0u) acc = added;
        }
    }
    *r = acc;
}
