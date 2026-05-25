---
title: "Provable Security 07: RSA, Trapdoor Permutations, and OAEP"
layout: page
categories: Cryptography
tags: [provable-security, RSA, OAEP, trapdoor-permutations]
topics: RSA trapdoor permutation, textbook RSA failures, OAEP encoding, random-oracle proof anatomy
short: "Why RSA needs randomized checkable encoding before it becomes CCA-oriented encryption."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-07" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / VII</p>

# RSA, trapdoor permutations, and OAEP

<p class="ps-deck">RSA is a useful trapdoor permutation, but raw RSA is not a secure encryption or signature scheme.</p>
</header>

The RSA map, on a stated RSA domain such as the unit group $$\mathbb Z_N^*$$,

$$
f_{N,e}(x)=x^e\bmod N
$$

is a trapdoor permutation candidate when $$N=pq$$ and $$e$$ is invertible modulo $$\varphi(N)$$. The trapdoor is $$d=e^{-1}\bmod\varphi(N)$$. RSA-OAEP additionally needs a precise bit-string-to-integer encoding and rejection convention. The bare algebraic map is deterministic and is not a complete encryption scheme.

## Textbook failures

If public-key encryption is simply

$$
c=m^e\bmod N,
$$

then anyone can test a guessed message by encrypting it. The scheme is not IND-CPA secure.

If signatures are simply

$$
\sigma=m^d\bmod N,
$$

then multiplicativity gives forgeries:

$$
(\sigma_1\sigma_2)^e\equiv m_1m_2\pmod N.
$$

A trapdoor permutation is not a complete cryptographic scheme.

## OAEP structure

OAEP wraps a trapdoor permutation with randomness and redundancy. Let

$$
G:\{0,1\}^{k_0}\to\{0,1\}^{n+k_1},
\qquad
H:\{0,1\}^{n+k_1}\to\{0,1\}^{k_0}.
$$

For message $$m\in\{0,1\}^n$$ and random seed $$r\in\{0,1\}^{k_0}$$,

$$
s=(m\,\|\,0^{k_1})\oplus G(r),
\qquad
t=r\oplus H(s),
$$

and the ciphertext is

$$
c=f(s\,\|\,t).
$$

Decryption inverts $$f$$, unmasks the seed and message block, and rejects unless the final check bits are zero.

<div class="ps-proof" markdown="1">
<span class="ps-env-title">Proof anatomy</span>

In the random oracle model, the simulator maintains lists of $$G$$ and $$H$$ queries. A decryption query can be answered by checking whether the adversary has already made oracle queries consistent with a valid OAEP encoding. If not, the simulator can reject. The proof then bounds the probability that this simulated rejection differs from real decryption.
</div>

## What OAEP teaches

CCA security needs more than randomness. It needs malformed ciphertexts to be handled in a way that does not become a decryption side channel. OAEP's check bits and oracle-mediated masks create structure the proof can recognize.

<div class="ps-warning" markdown="1">
<span class="ps-env-title">Implementation condition</span>

RSA-OAEP proofs assume uniform padding randomness, correct length handling, correct rejection behavior, and no distinguishable error paths. A padding oracle is not a small implementation defect; it changes the adversary's oracle.
</div>

<nav class="ps-nav">
  <a href="/articles/ps-06-random-oracles/"><span>Previous</span>Provable Security 06: Random Oracles</a>
  <a class="ps-next" href="/articles/ps-08-fujisaki-okamoto-kems/"><span>Next</span>Provable Security 08: Fujisaki-Okamoto and KEMs</a>
</nav>

</article>
