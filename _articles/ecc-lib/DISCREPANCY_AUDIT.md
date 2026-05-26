# Discrepancy audit: articles versus P-256 test implementation

This audit compares the public bignum and elliptic arithmetic notes with the internal P-256 implementation-test workspace. It is an internal artifact and has no front matter.

## Current article order and dependency structure

- Bignum order: roadmap; 32-bit words and radix; addition/subtraction/comparison; schoolbook multiplication; squaring; division/reduction; modular add/sub; Montgomery arithmetic; Barrett and pseudo-Mersenne reduction; modular exponentiation; prime-field arithmetic; testing; constant-time C security; minimal library design.
- Elliptic order: roadmap; fields and curve equations; affine group law; projective/Jacobian coordinates; Jacobian formulas; field interface; scalar multiplication; side-channel-safe group operations; validation and subgroups; standard curves; ECDSA/ECDH arithmetic needs; SageMath testing; minimal C library design.
- Stack dependency: 32-bit word operations feed multiword arithmetic, multiword arithmetic feeds modular and P-256 field arithmetic, field arithmetic feeds affine/Jacobian point formulas, point formulas feed scalar multiplication, and validation/protocol articles state what arithmetic correctness does not prove.
- Structural conclusion: no file rename, split, or merge is needed in this pass. The main corrections are local proof-contract and snippet-alignment fixes.

## Current audit summary

- `bn-01-limbs-radix-and-word-size.md`: matches the implementation model. The article teaches `uint32_t` public words, radix $$B=2^{32}$$, and the same 16-bit half-word decomposition used by `p256_mul_words`.
- `bn-02-addition-subtraction-and-comparison.md`: harmless generalization. The addition code matches `p256_add_words`; the subtraction snippet uses an equivalent borrow formula rather than the exact `p256_sub_words` schedule.
- `bn-03-schoolbook-multiplication.md`: corrected in this pass. The article now describes the same correctness-first `add_word_at` behavior used by `_articles/ecc-lib/src/ecc_lib.c`, including the extra scratch word and early exit. It explicitly warns that this is not a production constant-time multiplier.
- `bn-06-modular-add-sub-and-reduction.md`: harmless generalization. The article gives a masked canonicalization pattern; ecc-lib uses branchy canonicalization because it is a correctness-test artifact.
- `bn-07-montgomery-arithmetic.md`: corrected in this pass. The article now states that the skeleton uses the same correctness-first carry helper and explains the P-256 specialization `m' = 1`.
- `bn-10-prime-field-arithmetic.md` and `bn-11-testing-verification-and-fuzzing.md`: match the P-256 eight-word vector and field-element representation used by ecc-lib.

## Elliptic article discrepancies

- `ec-00-roadmap.md`, `ec-01-fields-and-curve-equations.md`, and `ec-05-field-arithmetic-interface.md`: corrected in this pass where needed. The affine point snippet now uses `fe256_t`/`p256_affine_t`, matching the eight-word `uint32_t` P-256 teaching model.
- `ec-03-projective-and-jacobian-coordinates.md`: corrected in this pass. The infinity encoding note now names the same canonical test encoding used by ecc-lib, `(0:1:0)`, and the snippet uses `fe256_t`/`p256_jac_t`.
- `ec-04-jacobian-addition-and-doubling.md`: corrected in this pass. The prose and SageMath formulas match the `a = -3` Jacobian schedule used by `p256_jac_double` and `p256_jac_add_mixed`; the C snippet now uses P-256/`fe256_t` names while still stating that infinity handling, exceptional cases, and aliasing must be handled explicitly.
- `ec-06-scalar-multiplication.md`: corrected in this pass. It distinguishes the branchy public correctness-test scalar multiplication used by `p256_scalar_mul_public` from production secret-scalar code, its selector/ladder snippets now use P-256 names, and it marks the complete-addition ladder call as a required production primitive rather than an ecc-lib claim.
- `ec-07-side-channel-safe-group-operations.md`: intentionally stronger than ecc-lib. It describes the production side-channel contract that the internal test artifact does not claim to satisfy, and the C snippets now use `fe256_t`/P-256 names.
- `ec-08-curve-validation-and-subgroups.md`: corrected in this pass. The validation snippet now matches P-256 cofactor-one validation: reject infinity, require canonical on-curve coordinates, then accept without an extra subgroup multiplication.
- `ec-09-standard-curves-and-parameters.md` and `ec-12-minimal-c-library-design.md`: corrected where needed to use P-256 API names and match the constants and SageMath generation model used by ecc-lib.

## ecc-lib status

- `README.md` was corrected to avoid claiming fixed loop bounds. It now describes the workspace as fixed-size and correctness-first, with value-dependent helper behavior.
- `IMPLEMENTATION_AUDIT.md` accurately describes the P-256 correctness-test scope and remaining production gaps.
- `bn-13-minimal-cryptographic-bignum-library.md`: corrected in this pass. The type sketch now explicitly defines `limb_t` as `uint32_t`, so the generic library outline still teaches the 32-bit word model.
- The workspace remains internal-only and must stay out of `articles.markdown`.

## Second proof-level review pass

- `bn-05-division-reduction-and-normalization.md`: missing hypothesis/implementation note. The Knuth-style quotient estimate uses a mathematical two-limb numerator; under the 32-bit-only teaching model a C implementation must not pack that numerator into a wider C type. The article should say that a two-word division estimator or an avoided-public-only division path is required.
- `ec-05-field-arithmetic-interface.md`: missing representation-mixing warning. If field elements are stored in Montgomery form, constants and small multipliers used by point formulas must be represented or interpreted consistently; canonical and Montgomery residues must not be silently mixed.
- `ec-08-curve-validation-and-subgroups.md`: missing group-order hypothesis. The cofactor-one shortcut is correct for P-256 because the domain parameter order is prime and `h=1`; the article should not state it as a prime-subgroup conclusion without that prime-order condition.
- Structural conclusion remains unchanged: the order is coherent and no article rename, split, or merge is needed.

## Third proof-level review pass

- `bn-10-prime-field-arithmetic.md`, `ec-01-fields-and-curve-equations.md`, `ec-02-affine-group-law.md`, `ec-04-jacobian-addition-and-doubling.md`, `ec-05-field-arithmetic-interface.md`, and `ec-11-testing-with-sagemath.md`: stale generic API names remained in proof notes or test snippets. They were not wide-type violations, but they obscured that the teaching model is the P-256 `fe256_t`/`p256_*` interface rather than a second abstract field API.
- Structural conclusion remains unchanged: the article order is coherent and no rename, split, or merge is needed.

## Fourth proof-level review pass

- Rechecked the current bignum and elliptic article stack after the previous corrections. Forbidden-type scans, stale 16-bit teaching-limb scans, Sage/Python `assert` scans, and stale generic API-name scans found no remaining violations.
- Rechecked representative SageMath examples for affine addition/doubling, Jacobian doubling/mixed addition, and subgroup validation. The examples match their stated conclusions.
- No additional article restructuring is needed. The current order remains coherent and the public teaching model remains the 32-bit P-256 `fe256_t`/`p256_*` model.

## Correction pass

The public articles now use the eight-word P-256-compatible `uint32_t` model for teaching. Sixteen-bit values appear only as internal half-words for product decomposition. Article snippets and prose now distinguish three things: the actual correctness-first ecc-lib implementation, the mathematical proof obligations, and the stronger constant-time requirements needed before production use.
