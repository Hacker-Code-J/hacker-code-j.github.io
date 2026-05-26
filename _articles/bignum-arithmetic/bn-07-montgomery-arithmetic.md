---
title: "Bignum Arithmetic 07: Montgomery Arithmetic"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: Montgomery reduction, REDC, RSA, Diffie-Hellman, SageMath vectors
short: "Montgomery representation, REDC, word-size bounds, and C implementation structure."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-07" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 07</p>

# Montgomery arithmetic

<p class="bn-deck">Montgomery reduction replaces division by an odd modulus with word-by-word cancellation modulo the radix.</p>
</header>

Let $$m$$ be odd, $$0<m<B^n$$, and $$R=B^n$$ with $$\gcd(R,m)=1$$. The Montgomery representation of $$x$$ is

$$
\tilde x=xR\bmod m.
$$

A Montgomery multiplication computes

$$
\operatorname{MontMul}(\tilde x,\tilde y)=\tilde x\tilde yR^{-1}\bmod m=xyR\bmod m.
$$
The elliptic-curve series uses this exact contract in its [field arithmetic interface](/articles/ec-05-field-arithmetic-interface/): if field elements are stored as $$xR\bmod p$$, additions and point formulas must remain representation-preserving.

## The REDC identity

Choose

$$
m'\equiv -m^{-1}\pmod B.
$$

For an input $$T< mR$$, REDC repeatedly chooses

$$
q_i\equiv T_i m'\pmod B
$$

so that the low limb of $$T+q_i mB^i$$ becomes zero. After $$n$$ steps, the accumulated value is divisible by $$R$$.

<div class="bn-proof" markdown="1">
<span class="bn-env-title">Low-limb cancellation</span>

At step $$i$$, the current low active limb is $$t_i$$. Set $$q_i=t_i m'\bmod B$$. Since $$m'm\equiv -1\pmod B$$,

$$
t_i+q_i m_0\equiv t_i(1+m'm)\equiv 0\pmod B.
$$

Thus shifting away that limb is exact.
</div>

## C skeleton
Preconditions for the skeleton: `t` has at least `2*n + 1` limbs, initially stores $$T<mR$$ in its low `2*n` limbs, and the extra high limb is zero. The modulus array `m` has `n` limbs and is odd. Without the extra limb, the carry propagation past `t[i+n]` can write out of bounds.

```c
#define BN_MAX_LIMBS 256

void mont_redc(limb_t *r, limb_t *t,
               const limb_t *m, limb_t m0inv, uint32_t n) {
    /* API contract: n <= BN_MAX_LIMBS and t has 2*n + 1 limbs. */
    for (uint32_t i = 0; i < n; i++) {
        limb_t q = t[i] * m0inv; /* low word modulo B */
        for (uint32_t j = 0; j < n; j++) {
            limb_t lo, hi;
            bn_mul_word(q, m[j], &lo, &hi);
            bn_add_word_at(t, 2u*n + 1u, i + j, lo);
            bn_add_word_at(t, 2u*n + 1u, i + j + 1u, hi);
        }
    }
    limb_t high = t[2u*n];        /* under T < mR, high is 0 or 1 */
    limb_t tmp[BN_MAX_LIMBS];
    for (uint32_t i = 0; i < n; i++) r[i] = t[i+n];
    uint32_t borrow = bn_sub_n(tmp, r, m, n);
    bn_cmov(r, tmp, r, n, (uint32_t)high | (borrow ^ 1u));
}
```

The final canonicalization must also account for the extra high limb `t[2*n]`. The REDC candidate is below $$2m$$, but it can still be at least $$B^n$$ when $$m$$ is close to $$B^n$$. In that case the low `n` limbs alone may look smaller than `m`, so the high limb must force selection of the subtracted result.

This skeleton uses the same correctness-first carry helper as the schoolbook product. The internal P-256 test code specializes the cancellation word to the active low word, because the low word of the P-256 prime is $$B-1$$ and therefore $$m'=1$$. Its safety is part of the REDC invariant: under $$0\le T<mR$$, the represented intermediate stays below $$2mR<2R^2$$, so no limb beyond `t[2*n]` is required. Production code should make `BN_MAX_LIMBS` an enforced compile-time or API-level bound and use fixed public-loop canonicalization instead of value-dependent helper exits.

## Computing `m0inv`

If `m[0]` is odd, compute $$m'=-m_0^{-1}\bmod B$$. Newton iteration doubles correct bits:

$$
x_{k+1}=x_k(2-m_0x_k)\pmod {2^{2^k}}.
$$

## P-256 word-model note

For P-256 with $$B=2^{32}$$ and $$n=8$$, the low word of the modulus is $$B-1$$. Hence $$m_0^{-1}\equiv -1\pmod B$$ and $$m'\equiv 1\pmod B$$, so the cancellation word at each REDC step is just the active low word. This simplifies the choice of `q`, but it does not remove the word-product proof: each `q*m[j]` product still has to be computed by 16-bit partial products when the implementation uses no wider C integer type.

## Example: RSA-style modulus

For a 2048-bit odd modulus under this 32-bit teaching model, $$w=32$$, $$n=64$$, and $$R=2^{2048}$$. Every modular multiplication in exponentiation can be performed as Montgomery multiplication after converting the base to $$xR\bmod m$$ and converting the final result by multiplying by 1.

## Example: Diffie-Hellman prime field

For a finite-field Diffie-Hellman group modulo a fixed 2048-bit prime, Montgomery constants $$R^2\bmod p$$ and $$m'$$ are precomputed once. The fixed modulus makes the reduction schedule and table sizes public.

## SageMath vector generator

```python
def mont_params(m, w, n):
    B = 2^w
    R = B^n
    print(gcd(m, B) == 1 and m < R)
    mp = (-inverse_mod(m, B)) % B
    return B, R, mp, (R^2 % m)

m = 2^127 - 1
B, R, mp, R2 = mont_params(m, 32, 4)
x, y = 123456789, 987654321
xt = x*R % m
yt = y*R % m
print((xt * yt * inverse_mod(R, m)) % m == (x*y*R) % m)
print(hex(mp), hex(R2))
# Small REDC case where the final high limb matters.
B, R, m, T = 16, 16, 9, 121
mp = (-inverse_mod(m, B)) % B
q = (T*mp) % B
A = (T + q*m) // R
print(A, A // R, A % R, A - m)
```


## Range requirement

A standard REDC proof assumes $$0\le T<mR$$ and yields a candidate $$A=(T+qm)/R$$ with $$0\le A<2m$$. If multiplication produces $$T<m^2$$ and $$m<R$$, then $$T<mR$$ holds. Because $$A$$ may lie in $$[R,2m)$$, an implementation stores the low $$n$$ limbs together with a high carry limb and canonicalizes by selecting $$A-m$$ whenever that high limb is set or the low-limb subtraction does not borrow.

<nav class="bn-nav">
  <a href="/articles/bn-06-modular-add-sub-and-reduction/"><span>Previous</span>Bignum Arithmetic 06: Modular Add, Subtract, and Reduction</a>
  <a class="bn-next" href="/articles/bn-08-barrett-and-pseudo-mersenne-reduction/"><span>Next</span>Bignum Arithmetic 08: Barrett and Pseudo-Mersenne Reduction</a>
</nav>

</article>
