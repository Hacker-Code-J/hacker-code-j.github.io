---
title: "Provable Security 06: Random Oracles"
layout: page
categories: Cryptography
tags: [provable-security, random-oracle-model, programmability]
topics: lazy sampling, oracle programmability, Fiat-Shamir, model limits
short: "How the random oracle model helps reductions and where its idealization enters."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-06" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / VI</p>

# Random oracles and programmability

<p class="ps-deck">The random oracle model gives the reduction a public random function it can answer consistently and sometimes program.</p>
</header>

A random oracle is an ideal public function

$$
H:\{0,1\}^*\to R.
$$

The proof implements it by lazy sampling. Maintain a table. If an input was queried before, return the stored value. If not, sample a fresh output and store it.

## Why it helps

Random oracles are useful because they let reductions control the hash interface. The adversary sees a consistent random function. The reduction may use the oracle table to embed a challenge, detect when the adversary has queried an important value, or make a simulated ciphertext or signature distribution consistent.

<div class="ps-env" markdown="1">
<span class="ps-env-title">Programmability</span>

Programming means choosing the oracle value at a particular input instead of sampling it uniformly at the moment the input first appears. This is valid only if the adversary has not already received a different value for the same input.
</div>

Programming is the reason many random-oracle proofs track hash-query lists explicitly.

## Fiat-Shamir example

In a Schnorr identification protocol, the prover sends $$R=g^r$$, receives challenge $$c$$, and answers

$$
s=r+cx\bmod q.
$$

Verification checks

$$
g^s=RY^c.
$$

Fiat-Shamir replaces $$c$$ by $$H(R,m)$$ to produce a signature. A forking proof rewinds the adversary and answers the same query with a different challenge. Two valid responses for the same commitment give

$$
x=(s-s')(c-c')^{-1}\bmod q.
$$

The extraction depends on the ability to control the challenge in the proof.

## Random oracle is not a hash theorem

A random-oracle proof does not prove the same statement for every concrete hash function. It proves security in a model where the hash behaves as an ideal random function and the adversary interacts with it only through oracle queries.

<div class="ps-warning" markdown="1">
<span class="ps-env-title">Where model gaps appear</span>

A concrete implementation can fail through ambiguous encodings, missing domain separation, length-extension behavior, cross-protocol hash reuse, or side channels around hash inputs. Those are not modeled by a plain random oracle.
</div>

## When to accept the model

The random oracle model is often a pragmatic proof tool. It is especially common in OAEP, Fujisaki-Okamoto transforms, and Fiat-Shamir signatures. The right reading is neither blind trust nor automatic rejection. Record exactly where programmability is used; those are the steps that would require different structure in a standard-model proof.

<nav class="ps-nav">
  <a href="/articles/ps-05-reductions-game-hopping/"><span>Previous</span>Provable Security 05: Reductions and Game Hopping</a>
  <a class="ps-next" href="/articles/ps-07-rsa-oaep/"><span>Next</span>Provable Security 07: RSA, Trapdoor Permutations, and OAEP</a>
</nav>

</article>
