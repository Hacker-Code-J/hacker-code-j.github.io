---
title: "Sheaf Cohomology 02: Divisors and Associated Line Bundles"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, divisors, line-bundles]
topics: divisors, meromorphic functions, local orders, O(D), principal divisors
short: "How zeros and poles become a line bundle."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-02" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 02</p>

# Divisors and associated line bundles

<p class="sc-deck">A divisor is a finite prescription of zeros and poles; the sheaf $$\mathcal O(D)$$ turns that prescription into holomorphic sections.</p>
</header>

Sections 6.2 and 6.5 of the PDF connect divisors with line bundles. This is the bridge from concrete meromorphic functions to the Picard group and ultimately to Riemann-Roch.

## Divisors and local orders

On a compact Riemann surface $$X$$, a divisor is a finite formal sum

$$
D=\sum_{p\in X} n_p p,\qquad n_p\in\mathbb Z.
$$

The degree is $$\deg D=\sum_p n_p$$. If $$f$$ is meromorphic and $$t$$ is a local coordinate at $$p$$, write

$$
f=t^m u,\qquad u(p)\ne0.
$$

Then $$\operatorname{ord}_p(f)=m$$. A positive order is a zero, a negative order is a pole, and the principal divisor of $$f$$ is

$$
(f)=\sum_p \operatorname{ord}_p(f)\,p.
$$

## The sheaf $$\mathcal O(D)$$

Define

$$
\mathcal O(D)(U)=
\{f\in\mathcal M_X(U): \operatorname{ord}_p(f)+n_p\ge0
\text{ for every }p\in U\}.
$$

Thus a section of $$\mathcal O(D)$$ is a meromorphic function whose pole at $$p$$ has order at most $$n_p$$ when $$n_p>0$$, and whose zero at $$p$$ has order at least $$-n_p$$ when $$n_p<0$$.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: one allowed pole on $$\mathbb{CP}^1$$</span>

Let $$D=m\infty$$ on $$\mathbb{CP}^1$$. Then

$$
H^0(\mathbb{CP}^1,\mathcal O(m\infty))
$$

is the vector space of rational functions with no finite poles and pole order at most $$m$$ at infinity. These are exactly polynomials of degree at most $$m$$:

$$
a_0+a_1z+\cdots+a_m z^m.
$$

Hence $$h^0(\mathbb{CP}^1,\mathcal O(m\infty))=m+1$$ for $$m\ge0$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: forcing a zero</span>

Let $$D=-p$$. Then

$$
\mathcal O(-p)(U)=\{f\in\mathcal O(U): f(p)=0\}
$$

for neighborhoods $$U$$ of $$p$$. A global section of $$\mathcal O(-p)$$ is a holomorphic function vanishing at $$p$$. On a compact connected Riemann surface, every holomorphic function is constant, so

$$
H^0(X,\mathcal O(-p))=0.
$$

This is the simplest example where a negative divisor kills global sections.
</div>

## Local construction of the line bundle

Choose an open cover $$\{U_i\}$$ so that on each $$U_i$$ there is a meromorphic function $$f_i$$ with

$$
D|_{U_i}=(f_i).
$$

On overlaps, $$f_j/f_i$$ is nowhere-zero holomorphic. Therefore

$$
g_{ij}=f_j/f_i
$$

is the transition function in the section convention of Article 01: a section $$h\in\mathcal O(D)(U)$$ is represented locally by the holomorphic functions $$h f_i$$, and on overlaps $$h f_j=(f_j/f_i)h f_i$$. This defines the holomorphic line bundle associated with $$D$$, whose sheaf of holomorphic sections is canonically identified with $$\mathcal O(D)$$.

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Why $$f_j/f_i$$ is holomorphic and invertible</span>

Both $$f_i$$ and $$f_j$$ have the same divisor on the overlap, because both represent $$D$$ there. Their quotient has zero order at every point, so it has neither zeros nor poles. Hence $$f_j/f_i\in\mathcal O^*(U_i\cap U_j)$$.
</div>

## Principal divisors give trivial bundles

If $$D=(f)$$ globally, take the same meromorphic function on every open set. Then all transition functions are $$1$$. More invariantly,

$$
\mathcal O((f))\cong\mathcal O_X.
$$

In the convention fixed above, the isomorphism sends a local meromorphic section $$h$$ of $$\mathcal O((f))$$ to the holomorphic function $$hf$$. The inverse sends a holomorphic function $$u$$ to $$u/f$$. This is the reason divisor classes modulo principal divisors map to the Picard group.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: $$z-a$$ on $$\mathbb{CP}^1$$</span>

For $$f(z)=z-a$$,

$$
(f)=[a]-[\infty].
$$

Thus $$[a]$$ and $$[\infty]$$ determine isomorphic line bundles:

$$
\mathcal O([a])\cong\mathcal O([\infty]).
$$

The actual divisors are different, but their difference is principal.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: elliptic curve degree-one divisors</span>

On an elliptic curve $$E$$ with chosen origin, degree-one divisors $$[p]$$ and $$[q]$$ need not be linearly equivalent. Their difference $$[p]-[q]$$ maps under Abel-Jacobi to $$p-q\in E$$, so it is principal exactly when $$p=q$$. Thus unlike $$\mathbb{CP}^1$$, degree alone does not determine the line bundle.
</div>

## Meromorphic sections

In the convention fixed above, the local equations $$f_i$$ glue to a distinguished meromorphic section of $$\mathcal O(D)$$ whose divisor is $$D$$. Multiplying this section by a meromorphic function changes the divisor by a principal divisor. The invariant statement is:

$$
\text{meromorphic sections of }L
\quad\leftrightarrow\quad
\text{divisors in the linear equivalence class representing }L.
$$

Zeros and poles of a meromorphic section are not decoration; they are the divisor data from which the line bundle can be reconstructed.

<nav class="sc-nav">
  <a href="/articles/sc-01-line-bundles-and-transition-functions/"><span>Previous</span>Line Bundles</a>
  <a class="sc-next" href="/articles/sc-03-picard-group-and-degree/"><span>Next</span>Picard Group and Degree</a>
</nav>

</article>
