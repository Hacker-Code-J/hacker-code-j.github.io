---
title: "Elliptic Arithmetic 11: Testing with SageMath"
layout: page
categories: Computing
tags: [elliptic-arithmetic, SageMath, testing, C]
topics: test vectors, randomized tests, edge cases, differential testing
short: "SageMath as the executable reference model for field and point arithmetic tests."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include elliptic_arithmetic_article_style.html %}

<article class="ec-note ec-note-11" markdown="1">

<header class="ec-note-head" markdown="1">
<p class="ec-series">Elliptic arithmetic notes / 11</p>

# Testing with SageMath

<p class="ec-deck">SageMath is the algebra oracle. It should generate vectors, expose edge cases, and catch formula mistakes, while C-specific bounds are checked separately.</p>
</header>

The bignum testing article already explains differential testing against exact integers. Elliptic testing adds group structure and exceptional cases.

## Test layers

| Layer | SageMath reference | C target |
|---|---|---|
| Field | arithmetic in `GF(p)` | `fe_add`, `fe_mul`, `fe_sqr`, `fe_inv` |
| Affine point | `EllipticCurve(GF(p), [a,b])` | public/spec addition and validation |
| Jacobian point | explicit coordinate conversion | `ec_jac_double`, `ec_jac_add_mixed` |
| Scalar multiplication | `k*P` | secret/public multiplication routines |

## Edge cases

Include: infinity, $$P+\mathcal O$$, $$P+(-P)$$, doubling with $$y=0$$, noncanonical encodings, points not on the curve, scalar 0, scalar 1, scalar $$n-1$$, and low-order points if the curve has cofactor greater than 1.

## Vector generator

Use `print(...)`, not `assert`, so the article shows visible outcomes and expected values.

```python
p = 17
E = EllipticCurve(GF(p), [2, 2])
P = E(5, 1)
for k in range(0, 12):
    Q = k*P
    if Q == E(0):
        print(k, "INF")
    else:
        print(k, int(Q[0]), int(Q[1]))
print("order", P.order())
```

## Jacobian formula check

```python
p = 17
F = GF(p)
E = EllipticCurve(F, [2, 2])
def from_jac(X, Y, Z):
    if Z == 0:
        return E(0)
    return E(X/Z^2, Y/Z^3)
X, Y, Z = F(5), F(1), F(1)
print(from_jac(X, Y, Z) == E(5, 1))
```

## Randomized C harness shape

```c
/* C test harness prints hex limbs; SageMath parses and checks them. */
for (uint32_t i = 0; i < trials; i++) {
    random_fe(&a);
    random_fe(&b);
    fe_mul(&c, &a, &b);
    print_case("mul", &a, &b, &c);
}
```

Random tests should be supplemented by constructed boundary cases: all-zero limbs, all-one limbs, values near $$p$$, values near $$2p$$ for lazy paths, and carries across every limb.

## What tests cannot prove

Tests do not prove constant-time behavior, absence of undefined behavior, or correctness for all inputs. They narrow the search. The proof obligations still live in the field bounds, formula preconditions, and scalar-loop invariants.

<nav class="ec-nav">
  <a href="/articles/ec-10-ecdsa-and-ecdh-arithmetic-needs/"><span>Previous</span>Elliptic Arithmetic 10: ECDSA and ECDH Arithmetic Needs</a>
  <a class="ec-next" href="/articles/ec-12-minimal-c-library-design/"><span>Next</span>Elliptic Arithmetic 12: Minimal C Library Design</a>
</nav>

</article>

