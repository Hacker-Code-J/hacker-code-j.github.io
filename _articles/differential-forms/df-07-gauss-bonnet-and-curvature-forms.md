---
title: "Differential Forms 07: Gauss-Bonnet and Curvature Forms"
layout: page
categories: Mathematics
tags: [differential-forms, gauss-bonnet, curvature]
topics: area form, Gaussian curvature, total curvature, Euler characteristic
short: "Curvature integrated as a global topological invariant."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-07" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 07</p>

# Gauss-Bonnet and curvature forms

<p class="df-deck">Gaussian curvature is a scalar, but total curvature is the integral of the 2-form $$K\,dA$$.</p>
</header>
{% include df_calculus_root_07.md %}


Section 4.5 of the PDF treats the area element and Gaussian curvature as invariant data on a surface. In an oriented chart, a parametrization $$\sigma(u,v)$$ gives

$$
dA=\sqrt{EG-F^2}\,du\wedge dv,
$$

and the curvature contribution is the 2-form

$$
K\,dA.
$$

The key theorem for a compact oriented surface without boundary is

$$
\int_M K\,dA=2\pi\chi(M).
$$

## The unit sphere

For the unit sphere, use the outward-oriented coordinate order $$(\phi,\theta)$$:

$$
\sigma(\phi,\theta)=(\sin\phi\cos\theta,\sin\phi\sin\theta,\cos\phi).
$$

The first fundamental form coefficients in this order are

$$
E=1,\qquad F=0,\qquad G=\sin^2\phi,
$$

so the outward area form is

$$
dA=\sin\phi\,d\phi\wedge d\theta.
$$

Since $$K\equiv1$$,

$$
\int_{S^2}K\,dA
=\int_0^\pi\int_0^{2\pi} \sin\phi\,d\theta\,d\phi
=4\pi.
$$

This agrees with $$2\pi\chi(S^2)=2\pi\cdot2$$.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: sphere of radius $$R$$</span>

For radius $$R$$, the outward area element is $$R^2\sin\phi\,d\phi\wedge d\theta$$ and the Gaussian curvature is $$K=1/R^2$$. Hence

$$
K\,dA=\sin\phi\,d\phi\wedge d\theta,
$$

and the total curvature is still $$4\pi$$. Scaling changes local area and local curvature inversely.
</div>

## The torus of revolution

Let $$R>r>0$$ and

$$
\sigma(\theta,\phi)=((R+r\cos\phi)\cos\theta,(R+r\cos\phi)\sin\theta,r\sin\phi).
$$

Then

$$
E=(R+r\cos\phi)^2,\qquad F=0,\qquad G=r^2,
$$

so

$$
dA=r(R+r\cos\phi)\,d\theta\wedge d\phi.
$$

The standard curvature formula is

$$
K(\phi)={\cos\phi\over r(R+r\cos\phi)}.
$$

Therefore

$$
K\,dA=\cos\phi\,d\theta\wedge d\phi,
$$

and

$$
\int_{T^2}K\,dA
=\int_0^{2\pi}\int_0^{2\pi}\cos\phi\,d\phi\,d\theta=0.
$$

This agrees with $$\chi(T^2)=0$$.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: where the torus curvature changes sign</span>

Because $$r(R+r\cos\phi)>0$$, the sign of $$K$$ is the sign of $$\cos\phi$$. The outer band has $$K>0$$, the inner band has $$K<0$$, and the top and bottom circles have $$K=0$$. Gauss-Bonnet says the positive and negative contributions cancel.
</div>

## What the theorem says and does not say

Gauss-Bonnet does not say curvature is determined pointwise by topology. It says the integral of the curvature 2-form is. A sphere can have nonconstant curvature under a non-round metric, but the integral remains $$4\pi$$. A genus $$g$$ surface satisfies

$$
\int_M K\,dA=2\pi(2-2g).
$$

<div class="df-proof" markdown="1">
<span class="df-env-title">Proof mechanism</span>

In a moving-frame proof one chooses local orthonormal coframes, writes a connection 1-form $$\omega_{12}$$, and has a structure equation

$$
d\omega_{12}=-K\,dA
$$

up to convention. On overlapping coordinate patches, Stokes' theorem converts local boundary terms into transition-angle contributions. Those transition terms sum to the Euler characteristic. The proof is therefore a global bookkeeping refinement of Stokes.
</div>

<nav class="df-nav">
  <a href="/articles/df-06-stokes-cauchy-green-and-area-forms/"><span>Previous</span>Stokes and Cauchy-Green</a>
  <a class="df-next" href="/articles/df-08-hodge-weyl-on-riemann-surfaces/"><span>Next</span>Hodge-Weyl</a>
</nav>

</article>
