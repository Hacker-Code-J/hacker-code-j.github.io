---
title: "Provable Security 02: Games, Advantage, and Concrete Bounds"
layout: page
categories: Cryptography
tags: [provable-security, security-games, advantage]
topics: security parameter, adversarial advantage, negligible functions, birthday bounds, concrete security
short: "How game probabilities become security claims."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-02" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / II</p>

# Games, advantage, and concrete bounds

<p class="ps-deck">The language of provable security begins with experiments and with the difference between baseline guessing and real adversarial success.</p>
</header>

A security definition is an experiment. The challenger samples keys and hidden coins, gives the adversary a controlled interface, and declares a winning condition. The adversary's advantage measures how much better it performs than a baseline strategy.

The security parameter $$\lambda$$ indexes a family of schemes. It may control key size, modulus size, group order, hash output length, or lattice dimension. Asymptotic security asks what happens as $$\lambda$$ grows. Concrete security asks what the actual bound says at deployed parameter sizes.


## Challenger and adversary format

A security game is an interactive experiment between a Challenger $$\mathcal C$$ and an Adversary $$\mathcal A$$. The Challenger defines the world; the Adversary tries to distinguish, invert, forge, or otherwise violate the target property.

<div class="ps-env" markdown="1">
<span class="ps-env-title">Generic game transcript</span>

1. $$\mathcal C$$ samples hidden data: keys, a challenge bit, random coins, or a hard-problem instance.
2. $$\mathcal C$$ gives public information to $$\mathcal A$$, such as a public key, domain parameters, or oracle access.
3. $$\mathcal A$$ adaptively makes allowed oracle queries. The game must state exactly which queries are allowed and which are forbidden.
4. $$\mathcal C$$ answers according to the experiment, maintaining any required state such as oracle tables, previous messages, or previous ciphertexts.
5. $$\mathcal A$$ outputs a final value: a bit, a plaintext, a preimage, a ciphertext relation, or a forgery.
6. The game outputs $$1$$ if the win condition is satisfied and $$0$$ otherwise.

The advantage is computed over all randomness of $$\mathcal C$$, all randomness of $$\mathcal A$$, and any random-oracle or sampling tables used in the experiment.
</div>

A proof is then a statement about this transcript.


<div class="ps-game-diagram" aria-label="Generic security game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{st}_{\mathcal C}\leftarrow\mathsf{Setup}(1^\lambda;r_{\mathcal C})\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((\mathsf{pp},\mathcal O)\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(\mathsf{st}_{\mathcal A,0}\leftarrow\mathcal A(\mathsf{pp};r_{\mathcal A})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(q_i\leftarrow\mathcal A^{\mathcal O}(\mathsf{st}_{\mathcal A,i-1},\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(q_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(a_i\leftarrow\mathcal O_{\mathsf{st}_{\mathcal C}}(q_i)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf T_i:=\mathsf T_{i-1}\cup\{(q_i,a_i)\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(a_i\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(w\leftarrow\mathcal A^{\mathcal O}(\mathsf{st}_{\mathcal A,q},\mathsf T_q)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(w\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{Game}^{\mathcal A}(1^\lambda):=\mathbf 1[\mathsf{Win}(\mathsf{st}_{\mathcal C},\mathsf T_q,w)]\)</span></div>
</div> It does not analyze an informal attacker; it analyzes algorithms that interact with precisely this Challenger.

## Advantage

For a distinguishing experiment with hidden bit $$b\leftarrow\{0,1\}$$, a common advantage convention is

$$
\operatorname{Adv}_{A}=\left|\Pr[b'=b]-\frac12\right|.
$$

Some texts multiply this by two. The convention is less important than consistency. A theorem must make clear whether advantage is measured above $$1/2$$ or on a scale from $$0$$ to $$1$$.

<div class="ps-example" markdown="1">
<span class="ps-env-title">Tag guessing</span>

If a MAC tag has $$t$$ uniform bits and the adversary makes $$q$$ independent verification attempts, then a union bound gives

$$
\Pr[\mathsf{forge}]\le q2^{-t}.
$$

For $$t=128$$ and $$q=2^{40}$$, this is at most $$2^{-88}$$. The asymptotic claim may be negligible; the concrete claim is the actual exponent after the query budget is included.
</div>

## Negligibility

A function $$\mu(\lambda)$$ is negligible if for every constant $$c>0$$ there exists $$\lambda_0$$ such that

$$
\mu(\lambda)<\lambda^{-c}
$$

for all $$\lambda>\lambda_0$$. This definition is designed for closure under polynomially many events: a polynomial number of negligible errors remains negligible.

But asymptotics do not replace parameter analysis. A theorem with a factor $$q_H$$ may be excellent for one proof and weak for another, depending on how large the hash-query budget is allowed to be.

## Birthday terms

Collision probabilities are the first place where query counts matter sharply. If $$q$$ values are sampled from a set of size $$N=2^n$$, then

$$
\Pr[\mathsf{collision}]\approx 1-\exp\left(-\frac{q(q-1)}{2N}\right),
$$

and for small probabilities this is about $$q^2/2^{n+1}$$.

<div class="ps-example" markdown="1">
<span class="ps-env-title">Block size is not key size</span>

A block-cipher mode with 128-bit blocks can have birthday terms of the form $$q(q-1)/2^{129}$$, often coarsened to a constant-factor $$q^2/2^{128}$$ estimate. At $$q=2^{48}$$ blocks, the sharper birthday term is near $$2^{-33}$$. This does not mean the key has been brute-forced. It means the proof has a block-collision event whose probability is already visible.
</div>

## Reading a bound

A concrete theorem such as

$$
\operatorname{Adv}^{\mathsf{scheme}}_A
\le
\operatorname{Adv}^{\mathsf{prf}}_B
+\frac{q^2}{2^n}
+q_v2^{-t}
$$

says three different things: break the PRF, cause a collision, or guess a tag. Good parameter choices make every term small under the intended query budget.

<nav class="ps-nav">
  <a href="/articles/ps-01-roadmap/"><span>Previous</span>Provable Security 01: Roadmap</a>
  <a class="ps-next" href="/articles/ps-03-primitives-prf-prp-owf/"><span>Next</span>Provable Security 03: PRFs, PRPs, One-Wayness, and Trapdoors</a>
</nav>

</article>
