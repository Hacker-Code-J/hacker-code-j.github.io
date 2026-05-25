---
title: "Sheaf Cohomology 11: Canonical Bundles, Chern Classes, and Curvature"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, canonical-bundle, chern-class]
topics: canonical bundles, curvature, Ricci form, Chern classes, canonical divisors
short: "The analytic representatives of degree and canonical divisor data."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-11" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 11</p>

# Canonical bundles, Chern classes, and curvature

<p class="sc-deck">Curvature gives differential-form representatives of Chern classes; the canonical bundle records how holomorphic one-forms transform.</p>
</header>
{% include sc_bridge_11_curvature_from_forms.md %}


Chapter 13 of the PDF brings together local complex-coordinate formulas, curvature, Ricci form, Chern classes, and canonical divisors. The formulas carry sign conventions, so this article fixes one convention: if a Hermitian metric on a line bundle is locally $$h=e^{-\varphi}$$, take the Chern curvature form to be $$F_\nabla=\partial\bar\partial\varphi$$ and normalize the real Chern form as $$\frac{i}{2\pi}F_\nabla$$. Authors using the opposite curvature sign must reverse $$F_\nabla$$ consistently.

## Canonical bundle

For a complex manifold $$X$$ of dimension $$n$$, the canonical bundle is

$$
K_X=\Omega_X^n,
$$

the line bundle of holomorphic top forms. On a Riemann surface, it is simply the bundle of holomorphic 1-forms.

If $$z_i$$ and $$z_j$$ are holomorphic coordinates on a Riemann surface, then

$$
dz_j={dz_j\over dz_i}\,dz_i.
$$

Thus the transition functions of $$K_X$$ are Jacobians of coordinate changes.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: $$K_{\mathbb{CP}^1}\cong\mathcal O(-2)$$</span>

On $$\mathbb{CP}^1$$, use coordinates $$z$$ and $$w=1/z$$. Then

$$
dw=-z^{-2}\,dz,
\qquad
dz=-z^2\,dw.
$$

Thus the frame transition in the convention of Article 01 is $$z^2$$ up to a nonzero constant, which is the transition of $$\mathcal O(-2)$$ because $$\mathcal O(n)$$ uses $$z^{-n}$$. Hence

$$
K_{\mathbb{CP}^1}\cong\mathcal O(-2).
$$

Equivalently, the meromorphic form $$dz$$ has a double pole at infinity and no finite poles.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: the elliptic curve</span>

For $$E=\mathbb C/\Lambda$$, the form $$dz$$ is invariant under translations $$z\mapsto z+\lambda$$. It descends to a nowhere-zero holomorphic 1-form on $$E$$. Therefore

$$
K_E\cong\mathcal O_E,
\qquad
\deg K_E=0.
$$
</div>

## Chern forms of Hermitian line bundles

Let $$L$$ be a holomorphic line bundle with local holomorphic frame $$e$$ and Hermitian metric

$$
|e|_h^2=e^{-\varphi}.
$$

The Chern connection has curvature locally of type $$(1,1)$$. With the convention above, the first Chern class is represented in de Rham cohomology by

$$
c_1(L,h)=\left[\frac{i}{2\pi}F_\nabla\right].
$$

Changing the metric changes the representative by an exact form, so the cohomology class is independent of the metric.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: Fubini-Study curvature of $$\mathcal O(1)$$</span>

On $$U_0\subset\mathbb{CP}^1$$, the Fubini-Study metric on $$\mathcal O(1)$$ has local potential

$$
\varphi(z)=\log(1+|z|^2).
$$

The Chern form is

$$
\omega_{\mathrm{FS}}
=\frac{i}{2\pi}\partial\bar\partial\log(1+|z|^2),
$$

and

$$
\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=1.
$$

This realizes $$c_1(\mathcal O(1))$$ as a curvature form.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: tensor products</span>

If $$L$$ and $$M$$ have metrics with local weights $$\varphi_L$$ and $$\varphi_M$$, then $$L\otimes M$$ has weight $$\varphi_L+\varphi_M$$. Therefore

$$
c_1(L\otimes M)=c_1(L)+c_1(M).
$$

This is the curvature-form version of multiplying transition functions.
</div>

## Ricci form and the canonical bundle

For a Hermitian metric on a Riemann surface written locally as

$$
ds^2=\lambda(z)^2 |dz|^2,
$$

the Ricci form represents the curvature of the anticanonical direction, equivalently the negative of the canonical-bundle curvature under the convention below:

$$
\operatorname{Ric}=-i\,\partial\bar\partial\log \lambda^2.
$$

The Chern class relation is

$$
\left[\frac{1}{2\pi}\operatorname{Ric}\right]
=c_1(T_X)=-c_1(K_X).
$$

Thus Gauss-Bonnet and the degree of the canonical bundle are the same invariant in analytic and algebraic clothing:

$$
\deg K_X=2g-2.
$$

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 5: genus two surface</span>

If $$X$$ has genus $$2$$, then $$\deg K_X=2$$. A nonzero holomorphic 1-form has a zero divisor of total degree two. Hyperelliptic models make this visible: holomorphic differentials vanish at ramification patterns whose total order is forced by the canonical degree.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 6: flat torus has zero Ricci form</span>

For the flat metric on $$E=\mathbb C/\Lambda$$, $$\lambda$$ is constant, so

$$
\partial\bar\partial\log\lambda^2=0.
$$

The Ricci form vanishes and $$c_1(T_E)=0$$. This matches the triviality of $$K_E$$.
</div>

## Canonical divisors

A nonzero meromorphic 1-form $$\omega$$ on a compact Riemann surface has a divisor

$$
(\omega)=\sum_p \operatorname{ord}_p(\omega)p.
$$

Any divisor obtained from a nonzero meromorphic 1-form is a canonical divisor. Its linear equivalence class is the class of $$K_X$$, and its degree is

$$
\deg(\omega)=2g-2.
$$

The same object can therefore be read in three ways: as transition functions of $$K_X$$, as a divisor of a meromorphic differential, or as a Chern class represented by curvature.

<nav class="sc-nav">
  <a href="/articles/sc-10-fine-sheaves-and-de-rham/"><span>Previous</span>Fine Sheaves and de Rham</a>
  <a class="sc-next" href="/articles/sc-12-divisors-degree-and-fundamental-theorem/"><span>Next</span>Divisors, Degree, and FTA</a>
</nav>

</article>
