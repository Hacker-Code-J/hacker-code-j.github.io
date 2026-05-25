---
title: "Coding Theory 01: Coding Theory Foundations"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: block codes, Hamming metric, Singleton, Hamming, Plotkin, Gilbert-Varshamov
short: "The metric and asymptotic foundations used in Chapter 1."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-01" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 01</p>

# Coding theory foundations

<p class="ct-deck">Chapter 1 begins with a geometric problem in Hamming space: place many words far apart while keeping the length finite.</p>
</header>

Let $$A$$ be an alphabet of size $$q$$. A block code of length $$n$$ is a subset $$C\subseteq A^n$$. When $$A=\mathbb F_q$$ and $$C$$ is an $$\mathbb F_q$$-subspace of $$\mathbb F_q^n$$, the code is linear. The Hamming distance is

$$
d(x,y)=\#\{i:x_i\ne y_i\}.
$$

The minimum distance is $$d(C)=\min\{d(x,y):x,y\in C, x\ne y\}$$. For a linear code it is the smallest nonzero Hamming weight. A code with $$M$$ words is written $$(n,M,d)_q$$; a linear code is written $$[n,k,d]_q$$, where $$M=q^k$$.

<div class="ct-env" markdown="1">
<span class="ct-env-title">Correction radius</span>

A code detects every error pattern of weight $$<d$$ and corrects every error pattern of weight

$$
t=\left\lfloor {d-1\over 2}\right\rfloor.
$$

This is exactly the statement that Hamming balls of radius $$t$$ centered at codewords are disjoint.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: repetition code as maximal separation</span>

The binary code $$C=\{00000,11111\}$$ has parameters $$[5,1,5]_2$$. It corrects two errors. Its rate is $$1/5$$, so it buys reliability with extreme redundancy. It is the cleanest model of distance without rate.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: parity-check code as high rate with no correction</span>

The even parity code $$\{x\in\mathbb F_2^n:x_1+\cdots+x_n=0\}$$ has parameters $$[n,n-1,2]_2$$. It detects one error but corrects none, since $$\lfloor(d-1)/2\rfloor=0$$. This is the opposite endpoint of the rate-distance tradeoff.
</div>

## Singleton and perfect packing

The Singleton bound says that an $$(n,M,d)_q$$ code satisfies

$$
M q^{d-1}\le q^n.
$$

For a linear $$[n,k,d]_q$$ code this becomes $$d+k\le n+1$$. Codes with equality are MDS codes. The Hamming sphere bound gives a different obstruction: if $$d=2t+1$$, then

$$
q^k\sum_{i=0}^t {n\choose i}(q-1)^i\le q^n.
$$

A perfect code fills the whole ambient space with disjoint correction balls.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: the binary Hamming code is perfect</span>

For the $$[7,4,3]_2$$ Hamming code,

$$
2^4(1+7)=2^7.
$$

The radius-one balls exactly partition $$\mathbb F_2^7$$. This equality is stronger than being merely one-error-correcting; every received word has a unique nearest codeword.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: a Singleton-tight evaluation code</span>

Over $$\mathbb F_7$$, evaluate polynomials of degree at most $$2$$ at five distinct elements. A nonzero quadratic has at most two roots, hence the code has parameters $$[5,3,3]_7$$. Since $$3=5-3+1$$, it meets Singleton.
</div>

## Plotkin and high relative distance

The Plotkin bound controls the opposite extreme from high-rate packing. If an $$(n,M,d)_q$$ code satisfies

$$
qd>(q-1)n,
$$

then

$$
M\le {qd\over qd-(q-1)n}.
$$

For a linear code this sharply limits $$k=\log_q M$$ once the relative distance crosses $$(q-1)/q$$. In asymptotic language it explains why one only expects positive rate for $$\delta\le(q-1)/q$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 5: binary distance above one half</span>

For a binary code of length $$5$$ and distance $$4$$, Plotkin gives

$$
M\le {2\cdot4\over 2\cdot4-5}={8\over3},
$$

so $$M\le2$$. The repetition-type code $$\{00000,11111\}$$ has distance $$5$$ and is already essentially the only large-separation possibility.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 6: why AG asymptotics stay below the threshold</span>

The TVZ and Gilbert-Varshamov comparisons later concern $$\delta$$ below $$(q-1)/q$$. Above that threshold, Plotkin forces bounded code size, hence asymptotic rate $$0$$. This separates the high-distance obstruction from the AG improvement problem.
</div>

## Shannon and asymptotics

Chapter 1 uses Shannon motivation to justify studying families rather than isolated codes. Let $$A_q(n,d)$$ be the largest size of a $$q$$-ary length $$n$$ code with distance at least $$d$$. The asymptotic rate function is

$$
\alpha_q(\delta)=\limsup_{n\to\infty}{1\over n}\log_q A_q(n,\lfloor \delta n\rfloor).
$$

Singleton gives $$\alpha_q(\delta)\le1-\delta$$. Gilbert-Varshamov gives a lower bound. Define

$$
H_q(x)=x\log_q(q-1)-x\log_q x-(1-x)\log_q(1-x).
$$

Here the endpoint convention is $$0\log_q0=0$$.

Then, for $$0\le \delta\le(q-1)/q$$,

$$
\alpha_q(\delta)\ge1-H_q(\delta).
$$

The algebraic-geometric story becomes significant when curves over finite fields produce code families that improve this lower bound for suitable square fields.

<nav class="ct-nav">
  <a href="/articles/coding-theory/"><span>Index</span>Roadmap</a>
  <a class="ct-next" href="/articles/ct-02-linear-codes-duality-syndromes/"><span>Next</span>Linear Codes and Syndromes</a>
</nav>

</article>
