---
title: "Coding Theory 02: Linear Codes, Duality, and Syndromes"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: generator matrices, canonical form, dual codes, syndrome decoding
short: "The linear-algebraic infrastructure used before AG codes appear."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-02" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 02</p>

# Linear codes, duality, and syndromes

<p class="ct-deck">Before geometric codes can be decoded, the linear algebra of generators, checks, duality, and cosets has to be fixed.</p>
</header>

An $$[n,k]_q$$ linear code $$C\subseteq\mathbb F_q^n$$ is the row span of a generator matrix $$G\in M_{k\times n}(\mathbb F_q)$$. If elementary row operations and coordinate permutations put $$G$$ in the form

$$
G=(I_k\; P),
$$

then the first $$k$$ coordinates are information symbols and the remaining coordinates are control symbols. Two codes are equivalent when one is obtained from the other by a permutation of coordinates; their decoding power is the same.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: a systematic parity code</span>

The binary $$[4,3,2]$$ even parity code has generator matrix

$$
G=\begin{pmatrix}
1&0&0&1\\
0&1&0&1\\
0&0&1&1
\end{pmatrix}.
$$

The last coordinate records the sum of the first three. A single coordinate error changes the parity relation and is detected.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: equivalent codes preserve distance</span>

Permuting the coordinates of the preceding code may move the parity symbol to the first position, but all Hamming distances are unchanged. This is the coordinate-permutation equivalence used in the elementary theory. Later, changing fiber trivializations in geometric codes may also multiply coordinates by nonzero scalars; that gives a monomially equivalent code and still preserves weights and distances.
</div>

## Dual codes and control matrices

The dual code is

$$
C^\perp=\{y\in\mathbb F_q^n: x\cdot y=0 \text{ for all } x\in C\}.
$$

If $$G=(I_k\;P)$$, then a control matrix for $$C$$ is

$$
H=(-P^T\; I_{n-k}).
$$

A word $$x$$ is in $$C$$ precisely when $$xH^T=0$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: dual of the repetition code</span>

The binary repetition code $$\{000,111\}$$ has dual

$$
C^\perp=\{x\in\mathbb F_2^3:x_1+x_2+x_3=0\},
$$

the even parity code of length $$3$$. The two extreme examples from the previous article are dual in this small case.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: Hamming check matrix as a syndrome address book</span>

For the binary $$[7,4,3]$$ Hamming code, take $$H$$ whose columns are the nonzero vectors of $$\mathbb F_2^3$$. If a received vector has syndrome equal to the fifth column, then the most likely single error is in coordinate $$5$$.
</div>

## Syndrome decoding

If $$y=c+e$$ is received and $$c\in C$$, then

$$
yH^T=eH^T.
$$

The syndrome discards the unknown codeword and keeps information about the error coset. Maximum-likelihood syndrome decoding chooses a minimum-weight representative of the coset.

<div class="ct-env" markdown="1">
<span class="ct-env-title">Coset leaders</span>

Each syndrome corresponds to a coset of $$C$$ in $$\mathbb F_q^n$$. A coset leader is a vector of minimal weight in that coset. If $$d=2t+1$$, every vector of weight at most $$t$$ is the unique leader of its coset.
</div>

This point of view is exactly what later reappears in AG decoding. The parity checks are no longer arbitrary rows of a matrix; they are evaluations of functions or residues of differentials.

<nav class="ct-nav">
  <a href="/articles/ct-01-coding-theory-foundations/"><span>Previous</span>Coding Theory Foundations</a>
  <a class="ct-next" href="/articles/ct-03-curves-divisors-riemann-roch/"><span>Next</span>Curves and Riemann-Roch</a>
</nav>

</article>
