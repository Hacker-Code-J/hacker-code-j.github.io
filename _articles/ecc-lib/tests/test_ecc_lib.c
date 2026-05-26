#include "ecc_lib.h"

#include <stdio.h>

static uint32_t failures = 0u;

static const word_t FIELD_X[P256_WORDS] = {
    0x05060708u, 0x01020304u, 0xccddeeffu, 0x8899aabbu,
    0x44556677u, 0x00112233u, 0x89abcdefu, 0x01234567u
};

static const word_t FIELD_Y[P256_WORDS] = {
    0x45566778u, 0x01122334u, 0x4f3f2f1fu, 0x8f7f6f5fu,
    0xcfbfaf9fu, 0x0fffefdfu, 0x87654321u, 0x0fedcba9u
};

static const word_t FIELD_ADD[P256_WORDS] = {
    0x4a5c6e80u, 0x02142638u, 0x1c1d1e1eu, 0x18191a1bu,
    0x14151617u, 0x10111213u, 0x11111110u, 0x11111111u
};

static const word_t FIELD_SUB[P256_WORDS] = {
    0xbfaf9f8fu, 0xffefdfcfu, 0x7d9ebfdfu, 0xf91a3b5du,
    0x7495b6d7u, 0xf0113253u, 0x02468aceu, 0xf13579bdu
};

static const word_t FIELD_MUL[P256_WORDS] = {
    0xd9485a42u, 0x6def67f9u, 0xf5abdc53u, 0xcfa1fcbcu,
    0x65b69fcbu, 0x9af37703u, 0x80bf07e5u, 0x574db241u
};

static const word_t FIELD_SQR[P256_WORDS] = {
    0x74a1ec65u, 0x7c72ab12u, 0x39c1c047u, 0xa5e59eb0u,
    0xcb2e7302u, 0x348b7524u, 0x14770059u, 0x3d0cb017u
};

static const word_t FIELD_INV[P256_WORDS] = {
    0x9248fc6cu, 0xb6982200u, 0xae32d9ceu, 0x7c4ba41bu,
    0xff86df91u, 0x7798c1d2u, 0x4935d927u, 0x45b2b3fdu
};

static const word_t FIELD_MONT[P256_WORDS] = {
    0xaf5c08b6u, 0xfeaa5601u, 0xca976430u, 0x92c3f526u,
    0x4498ed41u, 0xbf258bf1u, 0x99530cc3u, 0x6e91b4d8u
};

static const word_t GX[P256_WORDS] = {
    0xd898c296u, 0xf4a13945u, 0x2deb33a0u, 0x77037d81u,
    0x63a440f2u, 0xf8bce6e5u, 0xe12c4247u, 0x6b17d1f2u
};

static const word_t GY[P256_WORDS] = {
    0x37bf51f5u, 0xcbb64068u, 0x6b315eceu, 0x2bce3357u,
    0x7c0f9e16u, 0x8ee7eb4au, 0xfe1a7f9bu, 0x4fe342e2u
};

static const word_t TWO_X[P256_WORDS] = {
    0x47669978u, 0xa60b48fcu, 0x77f21b35u, 0xc08969e2u,
    0x04b51ac3u, 0x8a523803u, 0x8d034f7eu, 0x7cf27b18u
};

static const word_t TWO_Y[P256_WORDS] = {
    0x227873d1u, 0x9e04b79du, 0x3ce98229u, 0xba7dade6u,
    0x9f7430dbu, 0x293d9ac6u, 0xdb8ed040u, 0x07775510u
};

static const word_t THREE_X[P256_WORDS] = {
    0xc6e7fd6cu, 0xfb41661bu, 0xefada985u, 0xe6c6b721u,
    0x1d4bf165u, 0xc8f7ef95u, 0xa6330a44u, 0x5ecbe4d1u
};

static const word_t THREE_Y[P256_WORDS] = {
    0xa27d5032u, 0x9a79b127u, 0x384fb83du, 0xd82ab036u,
    0x1a64a2ecu, 0x374b06ceu, 0x4998ff7eu, 0x8734640cu
};

static const word_t N_MINUS_ONE_X[P256_WORDS] = {
    0xd898c296u, 0xf4a13945u, 0x2deb33a0u, 0x77037d81u,
    0x63a440f2u, 0xf8bce6e5u, 0xe12c4247u, 0x6b17d1f2u
};

static const word_t N_MINUS_ONE_Y[P256_WORDS] = {
    0xc840ae0au, 0x3449bf97u, 0x94cea131u, 0xd431cca9u,
    0x83f061e9u, 0x711814b5u, 0x01e58065u, 0xb01cbd1cu
};

static const word_t K1_X[P256_WORDS] = {
    0xda672482u, 0x2257323fu, 0xd8e93468u, 0x00275bcau,
    0x92a2ac0bu, 0x11d5d1aau, 0xb9f52c7fu, 0x3988322au
};

static const word_t K1_Y[P256_WORDS] = {
    0xaacd9918u, 0x97732034u, 0xc8bd90c7u, 0x001e3a0eu,
    0x3d57dc02u, 0x0014311cu, 0xf116c19cu, 0x855b7389u
};

static const word_t K2_X[P256_WORDS] = {
    0x6651acceu, 0xec0b38a4u, 0xeff41a9cu, 0x1895955du,
    0x9c3f234eu, 0xde720688u, 0xd81d7cddu, 0xdf5155a0u
};

static const word_t K2_Y[P256_WORDS] = {
    0x02d14fe8u, 0x582c06a6u, 0x4dfa5f68u, 0xf061dae0u,
    0x9962d7bfu, 0x5ad4b6bbu, 0xf4961981u, 0xd1a65e8du
};

static const word_t P256_N_MINUS_ONE[P256_WORDS] = {
    0xfc632550u, 0xf3b9cac2u, 0xa7179e84u, 0xbce6faadu,
    0xffffffffu, 0xffffffffu, 0x00000000u, 0xffffffffu
};

static const word_t K_FIXED_1[P256_WORDS] = {
    0x89abcdefu, 0x01234567u, 0x00000000u, 0x00000000u,
    0x00000000u, 0x00000000u, 0x00000000u, 0x00000000u
};

static const word_t K_FIXED_2[P256_WORDS] = {
    0x89abcdefu, 0x01234567u, 0x76543210u, 0xfedcba98u,
    0x00000000u, 0x00000000u, 0x00000000u, 0x00000000u
};

static void fail_word(const char *name, uint32_t index, word_t got, word_t want) {
    printf("FAIL %s[%u]: got 0x%08x want 0x%08x\n",
           name, (unsigned int)index, (unsigned int)got, (unsigned int)want);
    failures++;
}

static void check_words(const char *name, const word_t *got, const word_t *want, uint32_t n) {
    for (uint32_t i = 0; i < n; i++) {
        if (got[i] != want[i]) fail_word(name, i, got[i], want[i]);
    }
}

static void check_fe(const char *name, const fe256_t *got, const word_t *want) {
    check_words(name, got->v, want, P256_WORDS);
}

static void check_affine(const char *name, const p256_affine_t *got,
                         uint32_t infinity, const word_t *x, const word_t *y) {
    if (got->infinity != infinity) {
        printf("FAIL %s.infinity: got %u want %u\n",
               name, (unsigned int)got->infinity, (unsigned int)infinity);
        failures++;
        return;
    }
    if (infinity == 0u) {
        check_words(name, got->x.v, x, P256_WORDS);
        check_words(name, got->y.v, y, P256_WORDS);
    }
}

static void check_scalar(const char *name, const word_t k[P256_WORDS],
                         uint32_t infinity, const word_t *x, const word_t *y) {
    p256_affine_t g, got;
    p256_jac_t r;
    p256_get_base_point(&g);
    p256_scalar_mul_public(&r, &g, k);
    p256_jac_to_affine(&got, &r);
    check_affine(name, &got, infinity, x, y);
}

static void test_word_arithmetic(void) {
    word_t lo, hi;
    word_t a[P256_WORDS];
    word_t b[P256_WORDS];
    word_t r[P256_WORDS];
    word_t zero[P256_WORDS] = {0u, 0u, 0u, 0u, 0u, 0u, 0u, 0u};
    word_t max[P256_WORDS];

    p256_mul_words(0xffffffffu, 0xffffffffu, &lo, &hi);
    if (lo != 0x00000001u) fail_word("word product lo", 0u, lo, 0x00000001u);
    if (hi != 0xfffffffeu) fail_word("word product hi", 0u, hi, 0xfffffffeu);

    for (uint32_t i = 0; i < P256_WORDS; i++) {
        a[i] = 0xffffffffu;
        max[i] = 0xffffffffu;
        b[i] = 0u;
    }
    b[0] = 1u;
    if (p256_add_words(r, a, b, P256_WORDS) != 1u) {
        printf("FAIL carry edge did not return carry\n");
        failures++;
    }
    check_words("carry edge", r, zero, P256_WORDS);

    if (p256_sub_words(r, zero, b, P256_WORDS) != 1u) {
        printf("FAIL borrow edge did not return borrow\n");
        failures++;
    }
    check_words("borrow edge", r, max, P256_WORDS);
}

static void test_field_arithmetic(void) {
    fe256_t x, y, r, inv, one, xm, ym, zm, decoded;
    for (uint32_t i = 0; i < P256_WORDS; i++) {
        x.v[i] = FIELD_X[i];
        y.v[i] = FIELD_Y[i];
    }

    fe256_add(&r, &x, &y);
    check_fe("field add", &r, FIELD_ADD);
    fe256_sub(&r, &x, &y);
    check_fe("field sub", &r, FIELD_SUB);
    fe256_mul(&r, &x, &y);
    check_fe("field mul", &r, FIELD_MUL);
    fe256_sqr(&r, &x);
    check_fe("field sqr", &r, FIELD_SQR);
    fe256_inv(&inv, &x);
    check_fe("field inv", &inv, FIELD_INV);
    fe256_mul(&r, &x, &inv);
    fe256_set_one(&one);
    if (fe256_equal(&r, &one) == 0u) {
        printf("FAIL field inverse product is not one\n");
        failures++;
    }

    fe256_to_mont(&xm, &x);
    check_fe("mont encode", &xm, FIELD_MONT);
    fe256_from_mont(&decoded, &xm);
    check_fe("mont decode", &decoded, FIELD_X);
    fe256_to_mont(&ym, &y);
    fe256_mont_mul(&zm, &xm, &ym);
    fe256_from_mont(&decoded, &zm);
    check_fe("mont mul", &decoded, FIELD_MUL);
}

static void test_point_validation(void) {
    p256_affine_t g, bad, noncanon;
    fe256_t prime;
    p256_get_base_point(&g);
    if (p256_validate_public(&g) == 0u) {
        printf("FAIL base point rejected\n");
        failures++;
    }

    bad = g;
    fe256_add(&bad.y, &bad.y, &(fe256_t){{1u, 0u, 0u, 0u, 0u, 0u, 0u, 0u}});
    if (p256_validate_public(&bad) != 0u) {
        printf("FAIL invalid point accepted\n");
        failures++;
    }

    p256_get_prime(&prime);
    p256_affine_set(&noncanon, &prime, &g.y);
    if (p256_validate_public(&noncanon) != 0u) {
        printf("FAIL noncanonical point accepted\n");
        failures++;
    }
}

static void test_point_arithmetic(void) {
    p256_affine_t g, two, three, inverse_g, sum;
    p256_jac_t gj, twoj, threej, invj, zeroj;
    p256_get_base_point(&g);
    p256_jac_from_affine(&gj, &g);

    p256_jac_double(&twoj, &gj);
    p256_jac_to_affine(&two, &twoj);
    check_affine("jac double", &two, 0u, TWO_X, TWO_Y);

    p256_jac_add_mixed(&threej, &twoj, &g);
    p256_jac_to_affine(&three, &threej);
    check_affine("mixed add", &three, 0u, THREE_X, THREE_Y);

    p256_affine_set(&inverse_g, &g.x, &(fe256_t){{N_MINUS_ONE_Y[0], N_MINUS_ONE_Y[1],
                                                  N_MINUS_ONE_Y[2], N_MINUS_ONE_Y[3],
                                                  N_MINUS_ONE_Y[4], N_MINUS_ONE_Y[5],
                                                  N_MINUS_ONE_Y[6], N_MINUS_ONE_Y[7]}});
    p256_jac_add_mixed(&invj, &gj, &inverse_g);
    p256_jac_to_affine(&sum, &invj);
    check_affine("inverse add", &sum, 1u, GX, GY);

    p256_jac_set_infinity(&zeroj);
    p256_jac_add_mixed(&invj, &zeroj, &g);
    p256_jac_to_affine(&sum, &invj);
    check_affine("infinity add", &sum, 0u, GX, GY);
}

static void test_scalar_multiplication(void) {
    static const word_t K0[P256_WORDS] = {
        0u, 0u, 0u, 0u, 0u, 0u, 0u, 0u
    };
    static const word_t K1_SMALL[P256_WORDS] = {
        1u, 0u, 0u, 0u, 0u, 0u, 0u, 0u
    };
    static const word_t K2_SMALL[P256_WORDS] = {
        2u, 0u, 0u, 0u, 0u, 0u, 0u, 0u
    };
    static const word_t K3_SMALL[P256_WORDS] = {
        3u, 0u, 0u, 0u, 0u, 0u, 0u, 0u
    };

    check_scalar("scalar zero", K0, 1u, GX, GY);
    check_scalar("scalar one", K1_SMALL, 0u, GX, GY);
    check_scalar("scalar two", K2_SMALL, 0u, TWO_X, TWO_Y);
    check_scalar("scalar three", K3_SMALL, 0u, THREE_X, THREE_Y);
    check_scalar("scalar order minus one", P256_N_MINUS_ONE, 0u, N_MINUS_ONE_X, N_MINUS_ONE_Y);
    check_scalar("scalar fixed k1", K_FIXED_1, 0u, K1_X, K1_Y);
    check_scalar("scalar fixed k2", K_FIXED_2, 0u, K2_X, K2_Y);
}

int main(void) {
    test_word_arithmetic();
    test_field_arithmetic();
    test_point_validation();
    test_point_arithmetic();
    test_scalar_multiplication();

    if (failures != 0u) {
        printf("%u test failure(s)\n", (unsigned int)failures);
        return 1;
    }
    printf("P-256 implementation-test vectors passed\n");
    return 0;
}
