---
title: "Differential Forms 06: Stokes, Cauchy-Green, and Area Forms"
layout: page
categories: Mathematics
tags: [differential-forms, stokes-theorem, cauchy-green]
topics: Stokes theorem, Cauchy-Green formula, area forms, pullback
short: "Boundary integrals, area integrals, and reparametrization."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-06" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 06</p>

# Stokes, Cauchy-Green, and area forms

<p class="df-deck">The generalized Stokes theorem says that exterior differentiation is the operation whose integral over a region is measured on the boundary.</p>
</header>
{% include df_calculus_root_06.md %}


For a compact oriented smooth $$n$$-manifold with boundary and an $$(n-1)$$-form $$\omega$$, Stokes' theorem is

$$
\int_{\partial M}\omega=\int_M d\omega.
$$

Section 4.4 of the PDF uses the planar version to derive Green's theorem, the Cauchy-Green formula, and the coordinate invariance of surface area.

## Green's theorem as Stokes

Let $$\Omega\subset\mathbb R^2$$ have positively oriented boundary and let

$$
\eta=P\,dx+Q\,dy.
$$

Since

$$
d\eta=(Q_x-P_y)\,dx\wedge dy,
$$

Stokes becomes

$$
\int_{\partial\Omega}P\,dx+Q\,dy
=\iint_\Omega (Q_x-P_y)\,dx\,dy.
$$

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: area from a boundary integral</span>

Take $$\eta=x\,dy$$. Then $$d\eta=dx\wedge dy$$, so

$$
\int_{\partial\Omega}x\,dy=\operatorname{Area}(\Omega).
$$

For the unit disk, parametrizing $$\partial\Omega$$ by $$(\cos t,\sin t)$$ gives

$$
\int_0^{2\pi}\cos^2 t\,dt=\pi.
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: orientation reversal</span>

If the same boundary is traversed clockwise, the induced orientation changes and

$$
\int_{-\partial\Omega}\eta=-\int_{\partial\Omega}\eta.
$$

This is why Stokes requires an oriented boundary convention, not only a geometric curve.
</div>

## Cauchy-Green

Let $$\Omega\subset\mathbb C$$ be a bounded smooth domain and $$f\in C^1(\overline\Omega)$$. Fix $$z\in\Omega$$. On $$\Omega\setminus\{z\}$$ consider

$$
\omega(w)={f(w)\over w-z}\,dw.
$$

Using $$df=f_w\,dw+f_{\bar w}\,d\bar w$$,

$$
d\omega={f_{\bar w}(w)\over w-z}\,d\bar w\wedge dw.
$$

Apply Stokes to $$\Omega$$ with a small disk around $$z$$ removed. The induced orientation on the inner circle is clockwise, so its boundary integral tends to $$-2\pi i f(z)$$; moving that term to the other side gives

$$
f(z)= {1\over 2\pi i}
\left(
\int_{\partial\Omega}{f(w)\over w-z}\,dw
-\iint_\Omega {f_{\bar w}(w)\over w-z}\,d\bar w\wedge dw
\right).
$$

When $$f_{\bar w}=0$$, this becomes the Cauchy integral formula.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: holomorphic input</span>

If $$f(w)=w^2$$ on the unit disk, then $$f_{\bar w}=0$$ and

$$
z^2={1\over 2\pi i}\int_{|w|=1}{w^2\over w-z}\,dw.
$$

The area term vanishes because holomorphicity is precisely the disappearance of the $$d\bar w$$ direction.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 4: nonholomorphic input</span>

For $$f(w)=\bar w$$, $$f_{\bar w}=1$$. The boundary term and the area term must both be accounted for. On the unit circle $$\bar w=1/w$$, so the boundary integral of $$\bar w/(w-z)$$ may be computed by residues; the missing holomorphicity is exactly compensated by

$$
\iint_{|w|<1}{1\over w-z}\,d\bar w\wedge dw.
$$
</div>

## Area as a 2-form

For a surface patch $$\sigma:U\to\mathbb R^3$$ with coordinates $$(u,v)$$,

$$
dA_{\mathrm{dens}}=\|\sigma_u\times\sigma_v\|\,du\,dv.
$$

Equivalently, with

$$
E=\sigma_u\cdot\sigma_u,\quad
F=\sigma_u\cdot\sigma_v,\quad
G=\sigma_v\cdot\sigma_v,
$$

one has

$$
dA_{\mathrm{dens}}=\sqrt{EG-F^2}\,du\,dv.
$$

This is the positive area density. Once an orientation has been chosen, it is represented in an oriented chart by the 2-form

$$
dA=\sqrt{EG-F^2}\,du\wedge dv.
$$

If $$\Phi(s,t)=(u(s,t),v(s,t))$$, then

$$
\Phi^*(du\wedge dv)=\det(D\Phi)\,ds\wedge dt.
$$

Thus the oriented area form changes sign under orientation reversal, while the unoriented area density uses $$|\det(D\Phi)|$$ and stays positive.

<nav class="df-nav">
  <a href="/articles/df-05-complex-line-integrals/"><span>Previous</span>Complex Line Integrals</a>
  <a class="df-next" href="/articles/df-07-gauss-bonnet-and-curvature-forms/"><span>Next</span>Gauss-Bonnet</a>
</nav>

</article>
