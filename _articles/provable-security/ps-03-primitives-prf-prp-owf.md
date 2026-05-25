---
title: "Provable Security 03: PRFs, PRPs, One-Wayness, and Trapdoors"
layout: page
categories: Cryptography
tags: [provable-security, PRF, PRP, one-way-functions, RSA]
topics: pseudorandom functions, pseudorandom permutations, one-way functions, trapdoor permutations, hard bits
short: "The primitive assumptions that reductions commonly target."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-03" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / III</p>

# PRFs, PRPs, one-wayness, and trapdoors

<p class="ps-deck">Before encryption and signature theorems can be proved, the primitive assumptions have to be stated as games.</p>
</header>

Many security proofs reduce a scheme-level attack to an attack on a simpler primitive. The primitive may be a pseudorandom function, a pseudorandom permutation, a one-way function, or a trapdoor one-way permutation. Each has its own game.

## PRFs

A pseudorandom function family is a keyed family

$$
F:K\times D\to R,
\qquad F_K(x)=F(K,x),
$$

whose oracle behavior should be indistinguishable from a random function.

<div class="ps-env" markdown="1">
<span class="ps-env-title">PRF advantage</span>

For oracle distinguisher $$A$$,

$$
\operatorname{Adv}^{\mathsf{prf}}_F(A)
=
\frac12\left|\Pr_K[A^{F_K}=1]-\Pr_{\mathcal R}[A^{\mathcal R}=1]\right|,
$$

where $$\mathcal R:D\to R$$ is a random function, usually simulated by lazy sampling.
This matches the success-bias convention used in these notes. Texts that use the doubled convention omit the factor $$1/2$$.
</div>

A PRF proof often has a standard first move: replace $$F_K$$ by $$\mathcal R$$. If the adversary notices, it becomes a PRF distinguisher.


<div class="ps-env" markdown="1">
<span class="ps-env-title">PRF security game</span>

1. The Challenger $$\mathcal C$$ samples $$b\leftarrow\{0,1\}$$.
2. If $$b=1$$, it samples a key $$K\leftarrow\mathcal K$$ and prepares oracle $$O(x)=F_K(x)$$.
3. If $$b=0$$, it prepares a lazy random-function oracle $$O(x)=\mathcal R(x)$$. Repeated queries receive the same stored answer.
4. The Adversary $$\mathcal A^O$$ may query any $$x\in D$$, adaptively, up to its query budget.
5. $$\mathcal A$$ outputs $$b'$$.
6. The game outputs $$1$$ if $$b'=b$$.

The PRF advantage is the distance between this success probability and random guessing.
</div>

## PRPs


<div class="ps-game-diagram" aria-label="PRF security game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\begin{aligned} b&\leftarrow\{0,1\},\ K\leftarrow\mathcal K,\\ \mathcal O_b(x)&=\begin{cases}F_K(x),& b=1,\\ \mathcal R(x),& b=0.\end{cases}\end{aligned}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(\mathcal O_b\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(x_i\leftarrow\mathcal A^{\mathcal O_b}(\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(x_i\in D\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(y_i:=\mathcal O_b(x_i)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf T_i:=\mathsf T_{i-1}\cup\{(x_i,y_i)\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(y_i\in R\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(b^{\prime}\leftarrow\mathcal A^{\mathcal O_b}(\mathsf T_q)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(b^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{PRF}^{\mathcal A}_F(1^\lambda):=\mathbf 1[b^{\prime}=b]\)</span></div>
</div>

A pseudorandom permutation has the same domain and codomain and is bijective. Its ideal object is a random permutation, not a random function. A block cipher is usually modeled as a PRP family.

The PRP-PRF switching principle says that a random permutation looks like a random function until the adversary sees collisions that a permutation cannot have:

$$
\left|\operatorname{Adv}^{\mathsf{prf}}(A;q)-\operatorname{Adv}^{\mathsf{prp}}(A;q)\right|
\lesssim \frac{q^2}{2\,|D|}.
$$

Under the doubled convention, the same comparison is written with the corresponding doubled birthday term.
The switching lemma is why birthday bounds enter block-cipher mode proofs.


<div class="ps-env" markdown="1">
<span class="ps-env-title">PRP security game</span>

1. $$\mathcal C$$ samples $$b\leftarrow\{0,1\}$$.
2. If $$b=1$$, it samples $$K$$ and answers forward queries by $$F_K(x)$$.
3. If $$b=0$$, it answers by a uniformly random permutation on $$D$$, sampled lazily while preserving one-to-one consistency.
4. In the stronger PRP game, $$\mathcal A$$ may also query an inverse oracle; $$\mathcal C$$ must keep forward and inverse tables consistent.
5. $$\mathcal A$$ outputs $$b'$$ and wins if $$b'=b$$.

The key detail is consistency. In the random-permutation branch, two distinct inputs must never receive the same output.
</div>

## One-way functions


<div class="ps-game-diagram" aria-label="PRP security game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\begin{aligned} b&\leftarrow\{0,1\},\ K\leftarrow\mathcal K,\\ \Pi_b&=\begin{cases}P_K,& b=1,\\ \pi\leftarrow\mathrm{Perm}(D),& b=0.\end{cases}\end{aligned}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((\Pi_b,\Pi_b^{-1})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\((s_i,u_i)\leftarrow\mathcal A^{\Pi_b,\Pi_b^{-1}}(\mathsf T_{i-1}),\ s_i\in\{+,-\}\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\((s_i,u_i)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(v_i:=\begin{cases}\Pi_b(u_i),&s_i=+,\\ \Pi_b^{-1}(u_i),&s_i=-.\end{cases}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(v_i\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(b^{\prime}\leftarrow\mathcal A^{\Pi_b,\Pi_b^{-1}}(\mathsf T_q)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(b^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{PRP}^{\mathcal A}_P(1^\lambda):=\mathbf 1[b^{\prime}=b]\)</span></div>
</div>

A function $$f:D\to C$$ is one-way if it is easy to evaluate but hard to invert on a random image.

$$
\operatorname{Adv}^{\mathsf{ow}}_f(A)
=\Pr_{x\leftarrow D}\left[f(A(f(x)))=f(x)\right].
$$

The discrete logarithm map $$x\mapsto g^x$$ is a canonical example: evaluation is easy, inversion is assumed hard in appropriate groups.


<div class="ps-env" markdown="1">
<span class="ps-env-title">One-way-function game</span>

1. $$\mathcal C$$ samples $$x\leftarrow D$$.
2. It computes $$y=f(x)$$ and sends $$y$$, together with the public description of $$f$$, to $$\mathcal A$$.
3. $$\mathcal A$$ outputs $$x'$$.
4. $$\mathcal A$$ wins if $$f(x')=y$$.

There is no evaluation oracle because $$f$$ is public. The challenge is inversion on a random image.
</div>

## Trapdoor one-way permutations


<div class="ps-game-diagram" aria-label="One-way function game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(x\leftarrow D_\lambda,\quad y:=f_\lambda(x)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((f_\lambda,y)\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(x^{\prime}\leftarrow\mathcal A(f_\lambda,y)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(x^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{OW}^{\mathcal A}_f(1^\lambda):=\mathbf 1[f_\lambda(x^{\prime})=y]\)</span></div>
</div>

A trapdoor one-way permutation has public evaluation and secret inversion.

$$
(pk,td)\leftarrow\mathsf{TrapGen}(1^\lambda),
\qquad y=f_{pk}(x).
$$

The holder of $$td$$ can invert; everyone else should find inversion hard.


<div class="ps-env" markdown="1">
<span class="ps-env-title">Trapdoor one-wayness game</span>

1. $$\mathcal C$$ runs $$(pk,td)\leftarrow\mathsf{TrapGen}(1^\lambda)$$.
2. It samples $$x\leftarrow D_{pk}$$ and computes $$y=f_{pk}(x)$$.
3. It gives $$(pk,y)$$ to $$\mathcal A$$, but keeps $$td$$ secret.
4. $$\mathcal A$$ outputs $$x'$$.
5. $$\mathcal A$$ wins if $$f_{pk}(x')=y$$.

Correctness says the trapdoor holder can invert. Security says the adversary without the trapdoor cannot invert with non-negligible probability.
</div>

<div class="ps-example" markdown="1">


<div class="ps-game-diagram" aria-label="Trapdoor one-wayness game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((pk,td)\leftarrow\mathsf{TrapGen}(1^\lambda),\ x\leftarrow D_{pk},\ y:=f_{pk}(x)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((pk,y)\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(x^{\prime}\leftarrow\mathcal A(pk,y)\quad(td\not\to\mathcal A)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(x^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{TOW}^{\mathcal A}_f(1^\lambda):=\mathbf 1[f_{pk}(x^{\prime})=y]\)</span></div>
</div>
<span class="ps-env-title">RSA as primitive</span>

For $$N=pq$$ and $$\gcd(e,\varphi(N))=1$$,

$$
f_{N,e}(x)=x^e\bmod N
$$

is inverted by $$d=e^{-1}\bmod \varphi(N)$$ on the RSA domain, commonly $$\mathbb Z_N^*$$; any larger encoded-residue domain must be stated together with its validity checks. This is a trapdoor permutation candidate. It is not, by itself, a secure public-key encryption scheme or a secure signature scheme. The deterministic algebra must be wrapped by a scheme with the right security game.
</div>

## Hard bits

A hard-core predicate is a bit of the preimage that remains hard to predict from the image. For RSA, least significant bit and half-interval predicates have this flavor: if an oracle reveals the bit reliably enough, one can iteratively recover the preimage. The lesson is that security is not only about hiding the whole secret; a single predicate can carry the whole inversion difficulty.

<nav class="ps-nav">
  <a href="/articles/ps-02-games-advantage/"><span>Previous</span>Provable Security 02: Games, Advantage, and Concrete Bounds</a>
  <a class="ps-next" href="/articles/ps-04-encryption-definitions/"><span>Next</span>Provable Security 04: Encryption Definitions</a>
</nav>

</article>
