---
title: "Elliptic Arithmetic 04: Jacobian Addition and Doubling"
layout: page
categories: Computing
tags: [elliptic-arithmetic, Jacobian, C, SageMath]
topics: point doubling, mixed addition, incomplete formulas, operation counts
short: "Jacobian point formulas with preconditions, C scheduling, and SageMath verification."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-04" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 04</p>

# Jacobian addition and doubling

<p class="ec-deck">The formulas are algebraic identities with preconditions. A C implementation must make those preconditions explicit instead of hiding them behind convenient pseudocode.</p>
</header>

The book gives optimized Jacobian formulas, especially for curves $$y^2=x^3-3x+b$$, where doubling can use $$3(X-Z^2)(X+Z^2)$$. Many standard prime curves use $$a=-3$$ for this reason.

## Doubling for $$a=-3$$

Let $$P=(X_1:Y_1:Z_1)$$ with $$Z_1\ne 0$$ and $$Y_1\ne 0$$. Define

$$
A=3(X_1-Z_1^2)(X_1+Z_1^2),\quad B=2Y_1,\quad C=B^2,\quad D=CX_1.
$$

Then a common Jacobian doubling schedule is

$$
X_3=A^2-2D,\qquad
Y_3=A(D-X_3)-C^2/2,\qquad
Z_3=BZ_1.
$$

The division by 2 is multiplication by $$2^{-1}\bmod p$$. For odd prime fields this is well-defined, but the field API should expose `fe256_half` with a range proof.

```c
static void p256_jac_double_core(p256_jac_t *r, const p256_jac_t *p) {
    fe256_t z2, xmz2, xpz2, A, B, C, D, twoD, C2;
    fe256_sqr(&z2, &p->Z);
    fe256_sub(&xmz2, &p->X, &z2);
    fe256_add(&xpz2, &p->X, &z2);
    fe256_mul(&A, &xmz2, &xpz2);
    fe256_mul_small(&A, &A, 3u);
    fe256_add(&B, &p->Y, &p->Y);
    fe256_sqr(&C, &B);
    fe256_mul(&D, &C, &p->X);
    fe256_add(&twoD, &D, &D);
    fe256_sqr(&r->X, &A);
    fe256_sub(&r->X, &r->X, &twoD);
    fe256_sqr(&C2, &C);
    fe256_half(&C2, &C2);
    fe256_sub(&D, &D, &r->X);
    fe256_mul(&r->Y, &A, &D);
    fe256_sub(&r->Y, &r->Y, &C2);
    fe256_mul(&r->Z, &B, &p->Z);
}
```

This clarity-first snippet does not show infinity handling or constant-time exceptional handling. Those belong in the caller contract or in a complete formula.

## Mixed affine-Jacobian addition

Let $$P=(X_1:Y_1:Z_1)$$ and $$Q=(x_2,y_2)$$. Define

$$
Z_1^2=A,\quad Z_1^3=B,\quad U_2=x_2A,\quad S_2=y_2B,
$$

$$
H=U_2-X_1,\qquad R=S_2-Y_1.
$$

If $$H\ne 0$$, then

$$
X_3=R^2-H^2(X_1+U_2),\quad
Y_3=R(X_1H^2-X_3)-Y_1H^3,\quad
Z_3=Z_1H.
$$

If $$H=0$$ and $$R=0$$, the input is a doubling. If $$H=0$$ and $$R\ne 0$$, the sum is infinity.

<div class="ec-warning" markdown="1">
<span class="ec-env-title">Incomplete formulas</span>

These formulas are not complete. They need special handling for infinity, equal points, and inverse points. If input points or scalar bits are secret, special handling must be arranged so the branch condition is public or avoided.
</div>

## SageMath numeric verification

```python
p = 17
F = GF(p)
E = EllipticCurve(F, [-3, 5])
P = E(5, 8)
Q = E(6, 4)
T = E(8, 0)

def jac_double_a_minus_3(X, Y, Z):
    A = 3*(X - Z^2)*(X + Z^2)
    B = 2*Y
    C = B^2
    D = C*X
    X3 = A^2 - 2*D
    Y3 = A*(D - X3) - C^2/2
    Z3 = B*Z
    return X3, Y3, Z3

def mixed_add_jac_affine(X1, Y1, Z1, x2, y2):
    A = Z1^2
    B = Z1^3
    U2 = x2*A
    S2 = y2*B
    H = U2 - X1
    R = S2 - Y1
    X3 = R^2 - H^2*(X1 + U2)
    Y3 = R*(X1*H^2 - X3) - Y1*H^3
    Z3 = Z1*H
    return X3, Y3, Z3

X3, Y3, Z3 = jac_double_a_minus_3(F(5), F(8), F(1))
MX, MY, MZ = mixed_add_jac_affine(F(5), F(8), F(1), F(6), F(4))
print(E.discriminant() != 0)
print(2*P == E(6, 13))
print((X3/Z3^2, Y3/Z3^3) == (F(6), F(13)))
print(P + Q == E(5, 9))
print((MX/MZ^2, MY/MZ^3) == (F(5), F(9)))
print(2*T == E(0))
for k in range(1, 8):
    print(k, k*P)
```

## Proof obligation

Each temporary must have a range compatible with the field API. If `fe256_add` returns $$<2p$$ and `fe256_mul` accepts only canonical residues, the formula is invalid as written. Either canonicalize between operations or design the field layer to accept the documented lazy ranges.
The C function also needs an aliasing contract. The clarity-first formulas should be treated as out-of-place unless every assignment schedule has been proved safe when the output aliases an input; scalar-multiplication code should use separate temporaries for doubled and added states when that proof is absent.

<nav class="ec-nav">
  <a href="/articles/ec-03-projective-and-jacobian-coordinates/"><span>Previous</span>Elliptic Arithmetic 03: Projective and Jacobian Coordinates</a>
  <a class="ec-next" href="/articles/ec-05-field-arithmetic-interface/"><span>Next</span>Elliptic Arithmetic 05: Field Arithmetic Interface</a>
</nav>

</article>

