---
title: "Provable Security 05: Reductions and Game Hopping"
layout: page
categories: Cryptography
tags: [provable-security, reductions, game-hopping, hybrids]
topics: simulation, oracle queries, hybrid games, bad events, tightness
short: "How security proofs move from the real game to an ideal game."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-05" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / V</p>

# Reductions and game hopping

<p class="ps-deck">A reduction is an algorithm that runs the adversary while embedding a hard challenge and keeping the simulation believable.</p>
</header>

Most provable-security arguments are not one jump from attack to assumption. They are a sequence of games. Each game changes one aspect of the experiment, and every change is justified by an assumption, an exact equality, or a bad-event bound.

## Hybrid inequality

For games $$G_0,\ldots,G_t$$,

$$
\left|\Pr[G_0=1]-\Pr[G_t=1]\right|
\le
\sum_{i=0}^{t-1}\left|\Pr[G_i=1]-\Pr[G_{i+1}=1]\right|.
$$

The proof must explain every summand.

<div class="ps-example" markdown="1">
<span class="ps-env-title">PRF replacement</span>

In a nonce encryption proof, Game 0 uses $$F_K(N)$$. Game 1 uses a random function $$\mathcal R(N)$$. If the adversary distinguishes these games, construct a PRF distinguisher that uses its own oracle to answer encryption queries. The reduction does not need to know whether its oracle is real or random; the adversary's behavior tells it.
</div>

## Bad events

A bad event isolates the condition under which two games may diverge. The games are identical until that event occurs.

If the event is a collision among $$q$$ random $$n$$-bit values, then

$$
\Pr[\mathsf{bad}]\le {q\choose 2}2^{-n}.
$$

The proof does not pretend the event is impossible. It pays for it explicitly.

## Oracle simulation

The reduction must answer the adversary's queries with the right distribution. This is the hard part in CCA and signature proofs.

| Oracle | Simulation difficulty |
|---|---|
| Encryption | Often easy in public-key settings because $$pk$$ is public. |
| Decryption | Hard when the reduction does not know the secret key. |
| Signing | Hard when the final forgery must reveal the embedded challenge. |
| Random oracle | Flexible, because answers can be lazily sampled and sometimes programmed. |
| Decapsulation | Hard because malformed ciphertext behavior must match the real algorithm. |

A proof that says only "use the adversary to break the assumption" has skipped the simulation problem.

## Tightness

A reduction is tight if the adversary's advantage transfers to the assumption with little loss. A loose reduction may lose factors such as $$q_H$$, $$q_S$$, number of users, or number of sessions.

<div class="ps-example" markdown="1">
<span class="ps-env-title">Guessing loss</span>

If a signature proof must guess which of $$q_H$$ hash queries becomes the forgery target, the bound may contain

$$
\operatorname{Adv}^{\mathsf{forge}}(A)
\le q_H\operatorname{Adv}^{\mathsf{dl}}(B)+\varepsilon.
$$

At $$q_H=2^{32}$$, this consumes 32 bits of concrete margin. The theorem can be correct and still demand larger parameters.
</div>

<nav class="ps-nav">
  <a href="/articles/ps-04-encryption-definitions/"><span>Previous</span>Provable Security 04: Encryption Definitions</a>
  <a class="ps-next" href="/articles/ps-06-random-oracles/"><span>Next</span>Provable Security 06: Random Oracles</a>
</nav>

</article>
