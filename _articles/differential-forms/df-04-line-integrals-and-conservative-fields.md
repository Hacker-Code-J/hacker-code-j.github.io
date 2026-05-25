---
title: "Differential Forms 04: Line Integrals and Conservative Fields"
layout: page
categories: Mathematics
tags: [differential-forms, line-integrals, closed-exact]
topics: line integrals, conservative vector fields, exact forms, topology
short: "Line integrals as integration of 1-forms."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-04" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 04</p>

# Line integrals and conservative fields

<p class="df-deck">A vector-field line integral is the integral of a 1-form; exactness is the condition that the integral only sees endpoints.</p>
</header>
{% include df_calculus_root_04.md %}


Section 4.2 of the PDF rewrites planar vector calculus in form language. A vector field $$F=(P,Q)$$ on a domain $$D\subset\mathbb R^2$$ corresponds to the 1-form

$$
\eta=P\,dx+Q\,dy.
$$

If $$C$$ is parametrized by $$r(t)=(x(t),y(t))$$, $$a\le t\le b$$, then

$$
\int_C \eta
=\int_a^b \left(P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)\right)\,dt.
$$

This is exactly $$\int_C F\cdot dr$$.

## Conservative fields

The field $$F$$ is conservative when $$F=\nabla f$$. In form language,

$$
\eta=P\,dx+Q\,dy=df.
$$

Then

$$
\int_C df=f(r(b))-f(r(a)).
$$

This is the fundamental theorem for line integrals. The integral over every closed curve is zero.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: potential found by integration</span>

Let

$$
\eta=(3x^2+6xy)\,dx+(3x^2+6y)\,dy.
$$

Since $$P_y=6x=Q_x$$, the form is closed. On $$\mathbb R^2$$ this closedness is enough for exactness. Integrating $$f_x=P$$ gives

$$
f=x^3+3x^2y+h(y).
$$

Then $$f_y=3x^2+h'(y)=3x^2+6y$$, so $$h(y)=3y^2$$. Thus $$\eta=df$$ with

$$
f=x^3+3x^2y+3y^2.
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: path dependence</span>

For $$\eta=y\,dx$$, integrate from $$(0,0)$$ to $$(1,1)$$. Along the line $$r(t)=(t,t)$$,

$$
\int_C y\,dx=\int_0^1 t\,dt={1\over 2}.
$$

Along the broken path $$(0,0)\to(1,0)\to(1,1)$$, the first segment has $$y=0$$ and the second has $$dx=0$$, so the integral is $$0$$. The form is not exact; indeed $$d\eta=-dx\wedge dy\ne0$$.
</div>

## Closed need not mean exact

On a simply connected planar domain, a closed 1-form is exact. On a domain with a hole, closedness still gives local potentials, but it need not give one global potential.

The standard form on the punctured plane is

$$
\eta={-y\,dx+x\,dy\over x^2+y^2}.
$$

Compute

$$
d\eta=0\qquad\text{on }\mathbb R^2\setminus\{0\}.
$$

Yet on the circle $$C_R(t)=(R\cos t,R\sin t)$$,

$$
dx=-R\sin t\,dt,\qquad dy=R\cos t\,dt,
$$

so

$$
\eta=dt,\qquad \int_{C_R}\eta=2\pi.
$$

If $$\eta=df$$ globally, every closed-loop integral would vanish. Hence $$\eta$$ is closed but not exact.

<div class="df-aside" markdown="1">
<span class="df-env-title">Topology detected by periods</span>

For closed cycles homologous inside the domain, the number $$\int_\gamma \eta$$ depends only on the homology class of $$\gamma$$ when $$\eta$$ is closed. For the punctured plane, the homology class of a loop is measured by its winding number around the missing point.
</div>

## Displaced circles

The same closed form gives zero around loops that do not wind around the origin. For the circle $$C(t)=(2+\cos t,\sin t)$$,

$$
\int_C \eta=\int_0^{2\pi}{1+2\cos t\over 5+4\cos t}\,dt=0.
$$

This calculation is not a contradiction. The form is closed; the integral is determined by winding, and this circle has winding number zero about $$0$$.

## Practical test

For $$\eta=P\,dx+Q\,dy$$:

1. Compute $$d\eta=(Q_x-P_y)\,dx\wedge dy$$.
2. If $$d\eta\ne0$$, the form is not exact.
3. If $$d\eta=0$$, check the domain. On a star-shaped domain, or on a simply connected planar domain in this two-dimensional setting, find a potential. On a punctured domain, test periods around holes.

<nav class="df-nav">
  <a href="/articles/df-03-exterior-derivative/"><span>Previous</span>Exterior Derivative</a>
  <a class="df-next" href="/articles/df-05-complex-line-integrals/"><span>Next</span>Complex Line Integrals</a>
</nav>

</article>
