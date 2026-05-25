---
title: "Provable Security 12: Where Proofs Stop"
layout: page
categories: Cryptography
tags: [provable-security, implementation, model-boundaries]
topics: random oracle limits, side channels, nonce failure, malformed ciphertexts, multi-user security
short: "The boundary between abstract security proofs and deployed systems."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-12" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / XII</p>

# Where proofs stop

<p class="ps-deck">A proof is strongest inside its model; the implementation must still satisfy the model it claims to instantiate.</p>
</header>

Provable security is valuable because it makes assumptions explicit. It is also limited for the same reason: if the real system violates the model, the theorem may no longer apply.

## Random-oracle boundary

A random-oracle proof assumes the adversary only sees a public random function through oracle queries. A concrete hash function is finite code with structure, encodings, state, and implementation behavior.

<div class="ps-warning" markdown="1">
<span class="ps-env-title">Common gaps</span>

Missing domain separation, ambiguous encodings, length-extension behavior, cross-protocol reuse, and inconsistent transcript hashing can all break the connection between the random-oracle model and the deployed hash function.
</div>

## Side channels

Game definitions usually return mathematical values: plaintext, key, signature, or $$\bot$$. Implementations return timing, memory access patterns, power traces, cache behavior, branch behavior, logs, exceptions, and sometimes distinct network errors.

A CCA proof that models one rejection symbol does not cover an implementation that reveals why rejection occurred.

## Nonce and randomness failure

Many theorems condition on fresh randomness. If randomness repeats, the theorem is often inapplicable rather than merely weaker.

| Failure | Consequence |
|---|---|
| Reused stream nonce | Reveals XOR of plaintexts. |
| Reused Schnorr nonce | Reveals signing key. |
| Biased padding randomness | May make RSA encodings searchable. |
| Reused KEM coins | Can correlate encapsulations outside the proof model. |

## Malformed ciphertext behavior

CCA and KEM proofs are sensitive to how invalid ciphertexts behave. A decapsulation function that rejects uniformly in the proof but leaks timing differences in code gives the adversary a stronger oracle.

<div class="ps-example" markdown="1">
<span class="ps-env-title">Two rejection paths</span>

If a hybrid decryptor reports "KEM invalid" and "DEM tag invalid" separately, an adversary learns which layer failed. A proof that exposes only one symbol $$\bot$$ does not automatically cover that behavior.
</div>

## Multi-user and multi-session systems

A theorem for one key and one session may degrade with the number of users, sessions, or targets. A deployment with millions of public keys should not read a single-user bound as if the factor were free.

## Final rule

A proof gives a map of what must be true. Implementation work is the task of ensuring the real system follows that map: same inputs, same distributions, same rejection behavior, same side-channel assumptions, same key separation, and same query limits.

<div class="ps-aside" markdown="1">
<span class="ps-env-title">Source note</span>

The boundary issues here should be read together with the definitions and construction transforms in Smart's *Cryptography Made Simple*, Chapters 11 and 16. The chapters define the abstract games and public-key transforms; this note records the places where deployed systems must still match those abstractions.
</div>

<nav class="ps-nav">
  <a href="/articles/ps-11-reading-security-theorems/"><span>Previous</span>Provable Security 11: How to Read Security Theorems</a>
</nav>

</article>
