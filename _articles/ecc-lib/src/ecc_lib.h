#ifndef ECC_LIB_H
#define ECC_LIB_H

#include <stdint.h>

#define P256_WORDS 8u
#define P256_PRODUCT_WORDS 16u
#define P256_WORD_BITS 32u
#define P256_HALF_BITS 16u
#define P256_HALF_MASK 0xffffu

typedef uint32_t word_t;

typedef struct {
    word_t v[P256_WORDS];
} fe256_t;

typedef struct {
    fe256_t x;
    fe256_t y;
    uint32_t infinity;
} p256_affine_t;

typedef struct {
    fe256_t X;
    fe256_t Y;
    fe256_t Z;
} p256_jac_t;

void p256_mul_words(word_t a, word_t b, word_t *lo, word_t *hi);
uint32_t p256_add_words(word_t *r, const word_t *a, const word_t *b, uint32_t n);
uint32_t p256_sub_words(word_t *r, const word_t *a, const word_t *b, uint32_t n);
int p256_cmp_words(const word_t *a, const word_t *b, uint32_t n);

void fe256_set_zero(fe256_t *r);
void fe256_set_one(fe256_t *r);
void fe256_set_u32(fe256_t *r, word_t x);
void fe256_copy(fe256_t *r, const fe256_t *a);
uint32_t fe256_is_zero(const fe256_t *a);
uint32_t fe256_is_odd(const fe256_t *a);
uint32_t fe256_is_canonical(const fe256_t *a);
uint32_t fe256_equal(const fe256_t *a, const fe256_t *b);
void fe256_add(fe256_t *r, const fe256_t *a, const fe256_t *b);
void fe256_sub(fe256_t *r, const fe256_t *a, const fe256_t *b);
void fe256_neg(fe256_t *r, const fe256_t *a);
void fe256_half(fe256_t *r, const fe256_t *a);
void fe256_mul(fe256_t *r, const fe256_t *a, const fe256_t *b);
void fe256_sqr(fe256_t *r, const fe256_t *a);
void fe256_mul_small(fe256_t *r, const fe256_t *a, word_t c);
void fe256_inv(fe256_t *r, const fe256_t *a);
void fe256_to_mont(fe256_t *r, const fe256_t *a);
void fe256_from_mont(fe256_t *r, const fe256_t *a);
void fe256_mont_mul(fe256_t *r, const fe256_t *a, const fe256_t *b);

void p256_get_prime(fe256_t *r);
void p256_get_order(word_t r[P256_WORDS]);
void p256_get_base_point(p256_affine_t *g);

void p256_affine_set_infinity(p256_affine_t *r);
void p256_affine_set(p256_affine_t *r, const fe256_t *x, const fe256_t *y);
uint32_t p256_affine_on_curve(const p256_affine_t *p);
uint32_t p256_validate_public(const p256_affine_t *p);

void p256_jac_set_infinity(p256_jac_t *r);
uint32_t p256_jac_is_infinity(const p256_jac_t *p);
void p256_jac_from_affine(p256_jac_t *r, const p256_affine_t *p);
void p256_jac_to_affine(p256_affine_t *r, const p256_jac_t *p);
void p256_jac_double(p256_jac_t *r, const p256_jac_t *p);
void p256_jac_add_mixed(p256_jac_t *r, const p256_jac_t *p, const p256_affine_t *q);
void p256_scalar_mul_public(p256_jac_t *r, const p256_affine_t *p, const word_t k[P256_WORDS]);

#endif
