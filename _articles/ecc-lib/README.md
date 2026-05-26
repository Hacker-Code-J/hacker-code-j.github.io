# ecc-lib implementation test

This directory is an internal implementation-test workspace. It is not an article series, is not linked from `articles.markdown`, and should not be added to the public site navigation.

The purpose is narrow: test whether the bignum-arithmetic and elliptic-arithmetic articles are enough to guide a working NIST P-256 arithmetic implementation in C with 32-bit words and no wider C integer type.

## Target

- Field: $$\mathbb F_p$$ with $$p=2^{256}-2^{224}+2^{192}+2^{96}-1$$.
- Curve: $$y^2=x^3-3x+b$$ with the standard NIST P-256 base point, order, and cofactor.
- Public field representation: eight little-endian `uint32_t` words.
- Product model: each 32-by-32 product is decomposed into four 16-by-16 products, and all carry propagation stays in `uint32_t`.
- Goal: correctness and auditability, not production performance.

## Files

- `src/ecc_lib.h` and `src/ecc_lib.c`: fixed-size P-256 field, affine/Jacobian point, and public scalar multiplication code.
- `tests/test_ecc_lib.c`: deterministic C tests against generated vectors.
- `tests/gen_vectors.py`: SageMath vector generator using visible `print(...)` output.
- `IMPLEMENTATION_AUDIT.md`: notes on which article sections were sufficient and which implementation details needed extra assumptions.

## Build

Run:

```sh
make -C _articles/ecc-lib test
make -C _articles/ecc-lib vectors
make -C _articles/ecc-lib clean
```

The code intentionally avoids dynamic allocation and uses fixed-size arrays. Several helpers, including carry propagation, reduction correction, inversion, and scalar multiplication, are correctness-first and value-dependent. The scalar multiplication routine is public-input test code; it is not a production constant-time secret-scalar routine.
