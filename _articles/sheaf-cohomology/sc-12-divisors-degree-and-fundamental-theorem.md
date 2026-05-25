---
title: "Sheaf Cohomology 12: Divisors, Degree, and the Fundamental Theorem"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, divisors, fundamental-theorem-of-algebra]
topics: compact Riemann surfaces, divisor degree, Picard group, principal divisors, FTA
short: "Divisor degree on compact Riemann surfaces and the sheaf-theoretic proof of algebraic closure of C."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-12" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 12</p>

# Divisors, degree, and the fundamental theorem

<p class="sc-deck">On compact Riemann surfaces, divisor degree is constrained by compactness; on $$\mathbb{CP}^1$$ this constraint becomes the fundamental theorem of algebra.</p>
</header>

Chapter 14 of the PDF closes Part IV by returning to divisors, degree, divisor classes, the Picard group, and the fundamental theorem of algebra. The point is not that sheaf theory is needed to prove the theorem, but that the theorem is a model case of divisor-degree reasoning.

## Degree and principal divisors

For a compact Riemann surface $$X$$, the degree of a divisor

$$
D=\sum_p n_p p
$$

is $$\deg D=\sum_p n_p$$. If $$f$$ is a nonzero meromorphic function, then

$$
(f)=\sum_p\operatorname{ord}_p(f)p
$$

has degree zero.

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Residue proof of degree zero</span>

The logarithmic derivative $$df/f$$ is a meromorphic 1-form with simple poles at zeros and poles of $$f$$. Its residue at $$p$$ is $$\operatorname{ord}_p(f)$$. The residue theorem on a compact Riemann surface gives

$$
\begin{aligned}
0&=\sum_p \operatorname{res}_p(df/f)\\
&=\sum_p\operatorname{ord}_p(f)\\
&=\deg((f)).
\end{aligned}
$$
</div>

## Divisor classes and Picard group

Two divisors are linearly equivalent if their difference is principal:

$$
D\sim D' \quad\Longleftrightarrow\quad D-D'=(f).
$$

The map

$$
D\mapsto\mathcal O(D)
$$

sends linearly equivalent divisors to isomorphic line bundles. On compact Riemann surfaces, divisor classes map naturally into the Picard group, and every holomorphic line bundle is represented by a divisor.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: all degree-one divisors on $$\mathbb{CP}^1$$</span>

For any $$a\in\mathbb C$$,

$$
(z-a)=[a]-[\infty].
$$

Hence $$[a]\sim[\infty]$$. Every degree-one divisor on $$\mathbb{CP}^1$$ gives the same line bundle class $$\mathcal O(1)$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: degree zero on an elliptic curve</span>

On an elliptic curve $$E$$ with chosen origin, $$[p]-[q]$$ has degree zero. The Abel-Jacobi map identifies its divisor class with $$p-q\in E$$, so $$[p]-[q]$$ is principal exactly when $$p=q$$. Thus degree-zero divisors carry Jacobian information that degree alone cannot see.
</div>

## Fundamental theorem of algebra on $$\mathbb{CP}^1$$

Let

$$
P(z)=a_n z^n+\cdots+a_0
$$

be a nonconstant polynomial. View $$P$$ as a meromorphic function on $$\mathbb{CP}^1$$. It has a pole of order $$n$$ at $$\infty$$ and no other poles. Since the principal divisor has degree zero, the total degree of its zero divisor is $$n$$:

$$
(P)=Z(P)-n[\infty],
\qquad
\deg Z(P)=n.
$$

Therefore $$P$$ has exactly $$n$$ zeros in $$\mathbb C$$ counted with multiplicity. This proves that every nonconstant complex polynomial has a root.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: multiplicity count</span>

For

$$
P(z)=(z-1)^2(z+3),
$$

the divisor is

$$
(P)=2[1]+[-3]-3[\infty].
$$

The zero degree is $$3$$ and the pole degree is $$3$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: no polynomial without zeros</span>

Suppose a nonconstant polynomial $$P$$ had no finite zeros. Then as a meromorphic function on $$\mathbb{CP}^1$$ it would have divisor

$$
(P)=-n[\infty],
$$

whose degree is $$-n\ne0$$. This contradicts the degree-zero property of principal divisors.
</div>

## Degree, curvature, and Riemann-Roch

The degree of a line bundle can be read in several equivalent ways:

$$
\deg\mathcal O(D)=\deg D,
$$

$$
\deg L=\langle c_1(L),[X]\rangle
=\int_X \eta
$$

when $$\eta$$ is a normalized de Rham representative of $$c_1(L)$$, and, for the canonical bundle,

$$
\deg K_X=2g-2.
$$

Riemann-Roch combines degree with cohomology:

$$
\begin{aligned}
h^0(X,L)&-h^0(X,K_X\otimes L^{-1})\\
&=\deg L+1-g.
\end{aligned}
$$
The sheaf viewpoint makes the formula natural: sections are $$H^0$$ of a line bundle, and the correction term is the dual $$H^1$$ information expressed through the canonical bundle.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 5: $$\mathcal O(n)$$ again</span>

For $$X=\mathbb{CP}^1$$ and $$L=\mathcal O(n)$$, Riemann-Roch gives

$$
h^0(\mathcal O(n))-h^0(\mathcal O(-n-2))=n+1.
$$

If $$n\ge0$$, the second term vanishes and $$h^0=n+1$$. If $$n=-1$$, both sides are $$0$$; if $$n=-2$$, the identity reads $$0-1=-1$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 6: canonical divisors on genus $$g$$ surfaces</span>

For $$L=K_X$$,

$$
h^0(K_X)-h^0(\mathcal O_X)=g-1.
$$

Since $$h^0(\mathcal O_X)=1$$ on a connected compact Riemann surface, $$h^0(K_X)=g$$. This matches the fact that the space of holomorphic 1-forms has dimension $$g$$.
</div>

## Closing viewpoint

Part IV begins with transition functions and ends with a theorem about roots of polynomials because both are controlled by the same local-to-global logic. Local orders define divisors; divisors define line bundles; line bundles define sheaves of sections; cohomology measures the obstruction to globalizing local solutions.

<nav class="sc-nav">
  <a href="/articles/sc-11-canonical-bundles-chern-classes-curvature/"><span>Previous</span>Canonical Bundles and Curvature</a>
  <a class="sc-next" href="/articles/sheaf-cohomology/"><span>Back</span>Roadmap</a>
</nav>

</article>
