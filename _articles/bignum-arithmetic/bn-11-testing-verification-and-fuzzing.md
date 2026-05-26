---
title: "Bignum Arithmetic 11: Testing, Verification, and Fuzzing"
layout: page
categories: Computing
tags: [bignum-arithmetic, C, cryptography]
topics: SageMath testing, fuzzing, edge cases, sanitizers
short: "SageMath reference models, edge cases, randomized tests, and sanitizer discipline."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include bignum_arithmetic_article_style.html %}

<article class="bn-note bn-note-11" markdown="1">

<header class="bn-note-head" markdown="1">
<p class="bn-series">Bignum arithmetic notes / 11</p>

# Testing, verification, and fuzzing

<p class="bn-deck">Bignum tests should be adversarial. Random inputs are useful, but edge cases are where carry proofs are falsified.</p>
</header>

Testing has two layers: algebraic equality against a reference model and implementation hygiene under compilers and sanitizers.

## Reference model

SageMath integers are exact. Use them to define the value relation for each C routine.

```python
def limbs(x, n, w):
    B = 2^w
    return [(Integer(x) >> (w*i)) & (B-1) for i in range(n)]

def value(a, w):
    B = 2^w
    return sum(Integer(ai) * B^i for i, ai in enumerate(a))
```

## Mandatory edge cases

| Case | Why it matters |
|---|---|
| zero and one | identity behavior |
| all limbs `0xffff...ffff` | carry across every limb |
| alternating bits | catches endian and shift mistakes |
| modulus minus one | canonical boundary |
| product of maximal operands | accumulator bound |
| noncanonical residue | input validation policy |

## Example: addition vectors

```python
w, n = 32, 8
B = 2^w
cases = [
    (0, 0),
    (B^n - 1, 1),
    (B^n - 1, B^n - 1),
    (sum(B^i for i in range(n)), sum((B-1)*B^i for i in range(n))),
]
for a, b in cases:
    s = a + b
    print(limbs(a, n, w), limbs(b, n, w), limbs(s % B^n, n, w), s // B^n)
```

## Example: Montgomery vectors

```python
w, n = 32, 4
B, R = 2^w, 2^(w*n)
m = 2^127 - 1
mp = (-inverse_mod(m, B)) % B
for x, y in [(1, 1), (2, 3), (m-1, m-1), (123456789, 987654321)]:
    xt, yt = x*R % m, y*R % m
    zt = xt*yt*inverse_mod(R, m) % m
    print(zt == x*y*R % m)
```

## P-256 vector shape

Because the teaching model uses 32-bit words, P-256 vectors are emitted as eight little-endian words:

```python
p = 2^256 - 2^224 + 2^192 + 2^96 - 1
def words(x, n=8):
    return [hex((Integer(x) >> (32*i)) & 0xffffffff) for i in range(n)]
for x, y in [(1, 2), (p-2, p-3)]:
    print(words((x*y) % p))
```

This keeps the article vectors and the P-256 C harness in the same representation.

## Differential testing loop

A C test harness can print hex limbs; SageMath can parse them and compare. For faster iteration, Python's built-in `int` is enough for many tests, while SageMath is useful for finite-field and modular inverse checks.

## Sanitizers and warnings

Compile test builds with flags such as:

```sh
cc -std=c11 -Wall -Wextra -Wconversion -Wshadow -fsanitize=undefined,address test_bn.c
```

Unsigned wraparound is defined and will not be reported as undefined behavior. Signed overflow, invalid shifts, out-of-bounds scratch arrays, and uninitialized reads should be treated as failures.

## Proof audit notes

Every test file should identify which theorem or invariant it stresses. For example, a multiplication test with all-one limbs targets the accumulator bound, with each 32-by-32 product represented as two `uint32_t` words:

$$
z=a_i b_j+r_{i+j}+c<B^2.
$$

Tests do not replace the proof, but they catch mismatches between the proof's algorithm and the code that was actually written.

<nav class="bn-nav">
  <a href="/articles/bn-10-prime-field-arithmetic/"><span>Previous</span>Bignum Arithmetic 10: Prime-Field Arithmetic</a>
  <a class="bn-next" href="/articles/bn-12-constant-time-and-c-security/"><span>Next</span>Bignum Arithmetic 12: Constant-Time C and Security Boundaries</a>
</nav>

</article>
