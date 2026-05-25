---
title: "Coding Theory 07: The Skorobogatov-Vladut Decoding Algorithm"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: SV algorithm, error locators, auxiliary divisors
short: "The full locator-based decoding architecture from Chapter 3.1."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-07" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 07</p>

# The Skorobogatov-Vladut decoding algorithm

<p class="ct-deck">SV decoding turns AG syndromes into an error locator, then turns the locator into error values.</p>
</header>

Let $$C_\Omega(D,G)$$ be a dual AG code on a curve $$X$$ of genus $$g$$, with $$\deg G>2g-2$$ and support disjoint from $$D=P_1+\cdots+P_n$$. Its designed distance is $$d^*=\deg G-(2g-2)$$. Suppose a word $$c$$ is transmitted while $$f=c+e$$ is received. Since the dual of $$C_\Omega(D,G)$$ is $$C_L(D,G)$$, every $$\varphi\in L(G)$$ regular at the evaluation points gives the syndrome

$$
\varphi\circ f=\sum_i \varphi(P_i)f_i=\varphi\circ e.
$$

The codeword vanishes from the syndrome equation.

An error location is a point $$P_i$$ with $$e_i\ne0$$. An error locator is a function $$\Theta$$, regular at all $$P_i$$, such that $$\Theta(P_i)=0$$ at every error location.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: locator existence by dimension</span>

If $$\operatorname{wt}(e)\le t$$ and $$\dim L(A)\ge t+1$$, then the equations $$\Theta(P_i)=0$$ at the error locations impose at most $$t$$ homogeneous linear conditions on $$L(A)$$. Hence a nonzero locator exists.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: genus-zero locator</span>

On $$\mathbb P^1$$, a locator for errors at $$\alpha_1,\ldots,\alpha_t$$ is $$\prod_j(x-\alpha_j)$$. This lies in $$L(tP_\infty)$$. The SV definition is exactly this idea transported from polynomials to functions on curves.
</div>

## Lemmas behind the algorithm

The SV algorithm rests on three elementary but important facts. They are the proof skeleton of Chapter 3.1.

<div class="ct-env" markdown="1">
<span class="ct-env-title">Locator existence</span>

If $$\operatorname{wt}(e)\le t$$ and $$\dim L(A)\ge t+1$$, then a nonzero error locator exists in $$L(A)$$. The proof is only linear algebra: vanishing at the error locations gives at most $$t$$ homogeneous equations on $$L(A)$$.
</div>

<div class="ct-env" markdown="1">
<span class="ct-env-title">Error values from a locator</span>

If $$A$$ has support disjoint from $$D$$, $$\deg A\le t+r$$, and $$\Theta\in L(A)$$ is a locator, then the zero set $$M$$ of $$\Theta$$ among the evaluation points has size at most $$t+r$$. Syndromes against a space $$L(Z)$$ with $$\deg Z\ge t+r+2g-1$$ determine the error vector uniquely. The reason is that two solutions would differ by a word in the dual AG code $$C_\Omega(D,Z)$$ whose designed distance is larger than the possible support.
</div>

<div class="ct-env" markdown="1">
<span class="ct-env-title">Testing a locator without knowing the error</span>

If $$\deg Y\ge t+2g-1$$ and $$\Theta$$ has no poles at the evaluation points, then $$\Theta$$ is a locator if and only if

$$
\Theta\chi\circ e=0\qquad\text{for every }\chi\in L(Y).
$$

When $$A+Y\le G$$, the products $$\Theta\chi$$ lie inside the known syndrome range, so these equations can be computed from $$f=c+e$$ rather than from the unknown $$e$$.
</div>

These statements explain why the algorithm searches a row kernel of a product-syndrome matrix and why the auxiliary divisors must satisfy several simultaneous degree constraints.

<div class="ct-proof" markdown="1">
<span class="ct-env-title">Proof audit</span>

The three lemmas use only the parameter bounds of differential AG codes.
For locator existence, evaluation at the error support is a linear map
$$L(A)\to\mathbb F_q^{\operatorname{wt}(e)}$$, so a nonzero kernel element exists when $$\dim L(A)>\operatorname{wt}(e)$$.
For error-value uniqueness, if two candidate errors supported in $$M$$ have the same syndromes against $$L(Z)$$, their difference is a word of $$C_\Omega(D,Z)$$ supported in $$M$$. Since

$$
d(C_\Omega(D,Z))\ge \deg Z-(2g-2)\ge t+r+1>|M|,
$$

the difference must be zero. For the locator test, put
$$e'_i=\Theta(P_i)e_i$$. If $$\Theta\chi\circ e=0$$ for all $$\chi\in L(Y)$$, then $$e'\in C_\Omega(D,Y)$$. But

$$
d(C_\Omega(D,Y))\ge \deg Y-(2g-2)\ge t+1,
$$

while $$\operatorname{wt}(e')\le t$$, hence $$e'=0$$. This is exactly the statement that $$\Theta$$ vanishes at every true error location.
</div>


## Auxiliary divisors

SV decoding uses divisors $$A,Y,Z$$ with support disjoint from $$D$$. The roles are:

| Divisor | Role |
|---|---|
| $$A$$ | space in which the locator $$\Theta\in L(A)$$ is searched |
| $$Y$$ | test functions $$\chi\in L(Y)$$ used to force $$\Theta\chi\circ e=0$$ |
| $$Z$$ | functions whose syndromes determine the error values |

The constraints are chosen so that $$A+Y\le G$$ and $$Z\le G$$, allowing syndromes to be computed from the received word. The sufficient setup used in Chapter 3.1 is

$$
\dim L(A)>t,\qquad \deg A\le \deg G-(2g-1)-t,
$$

$$
\deg Z\ge \deg A+2g-1,\qquad \deg Y\ge t+2g-1,\qquad Z\le G,\qquad A+Y\le G.
$$

If $$\Theta\chi\circ e=0$$ for all $$\chi\in L(Y)$$ under these hypotheses, then $$\Theta$$ is a true locator.

<div class="ct-env" markdown="1">
<span class="ct-env-title">SV algorithm</span>

1. Choose bases $$\{\psi_i\}$$ of $$L(A)$$, $$\{\chi_j\}$$ of $$L(Y)$$, and $$\{\varphi_l\}$$ of $$L(Z)$$.
2. Compute the matrix $$S=(\psi_i\chi_j\circ f)$$.
3. Find a nonzero vector $$a$$ with $$\sum_i a_iS_i=0$$, where $$S_i$$ are the rows.
4. Set $$\Theta=\sum_i a_i\psi_i$$.
5. Let $$M$$ be the set of evaluation points where $$\Theta$$ vanishes.
6. Solve $$\sum_{P_i\in M}\varphi_l(P_i)e_i=\varphi_l\circ f$$ for the error values.
</div>

The genus loss comes from the need to choose auxiliary divisor spaces large enough for locators and uniqueness, while still staying inside the known syndrome range $$L(G)$$. Chapter 3.1 gives the simple sufficient existence criterion

$$
2t<\deg G-(3g-2)=d^*-g.
$$

Thus SV is safely below the designed half-distance radius by a genus term; Duursma's algorithm removes this particular loss by completing missing syndromes.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: why $$Y$$ is needed</span>

A function can vanish at the true error locations and also at extra points. Multiplying by functions in $$L(Y)$$ tests whether the weighted error vector disappears against enough functions. The condition is a geometric substitute for checking all coordinates directly.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: error values after locator recovery</span>

If a locator vanishes at five candidate points but the error has weight two, the final linear system over $$L(Z)$$ distinguishes the true nonzero error values from extra zeros. The locator reduces the support search; it does not by itself determine error magnitudes.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-06-rational-points-and-asymptotic-bounds/"><span>Previous</span>Rational Points and Bounds</a>
  <a class="ct-next" href="/articles/ct-08-duursma-majority-voting/"><span>Next</span>Duursma Majority Voting</a>
</nav>

</article>
