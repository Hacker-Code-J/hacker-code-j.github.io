---
title: "Differential Forms 09: Worked Computations and Pitfalls"
layout: page
categories: Mathematics
tags: [differential-forms, computations, stokes-theorem]
topics: signs, pullbacks, orientation, Stokes checks
short: "A computation manual for forms and Stokes."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-09" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 09</p>

# Worked computations and pitfalls

<p class="df-deck">Most mistakes with forms are sign mistakes, orientation mistakes, or attempts to treat coordinate expressions as coordinate-free objects.</p>
</header>
{% include df_calculus_root_09.md %}


This article collects the computations that make Part III usable. Each item should be checked by expanding into ordered coordinate bases.

## 1. Wedge signs

Let

$$
\alpha=x\,dx+y\,dy,\qquad \beta=dx+2dy.
$$

Then

$$
\begin{aligned}
\alpha\wedge\beta
&=x\,dx\wedge dx+2x\,dx\wedge dy \\ 
&\quad + y\,dy\wedge dx+2y\,dy\wedge dy \\ 
&=(2x-y)\,dx\wedge dy.
\end{aligned}
$$

The only surviving terms are those with distinct differentials.

<div class="df-example" markdown="1">
<span class="df-env-title">Second sign check</span>

In $$\mathbb R^3$$,

$$
dy\wedge dz\wedge dx=dx\wedge dy\wedge dz
$$

because the cyclic permutation $$(x,y,z)\mapsto(y,z,x)$$ is even. But

$$
dy\wedge dx\wedge dz=-dx\wedge dy\wedge dz.
$$
</div>

## 2. Exterior derivative

For

$$
\eta=(x^2+y)\,dx+(xy+\sin y)\,dy,
$$

one has

$$
d\eta=(Q_x-P_y)\,dx\wedge dy=(y-1)\,dx\wedge dy.
$$

For

$$
\alpha=x\,dy\wedge dz+y^2\,dz\wedge dx+e^z\,dx\wedge dy,
$$

one obtains

$$
d\alpha=(1+2y+e^z)\,dx\wedge dy\wedge dz.
$$

## 3. Pullback under polar coordinates

Let $$F(r,\theta)=(r\cos\theta,r\sin\theta)$$. Then

$$
F^*dx=\cos\theta\,dr-r\sin\theta\,d\theta,
$$

$$
F^*dy=\sin\theta\,dr+r\cos\theta\,d\theta.
$$

Therefore

$$
F^*(dx\wedge dy)=r\,dr\wedge d\theta.
$$

The Jacobian appears because wedge products discard the repeated terms.

<div class="df-example" markdown="1">
<span class="df-env-title">Pullback of a 1-form</span>

For $$\eta=-y\,dx+x\,dy$$,

$$
\begin{aligned}
F^*\eta
&=-r\sin\theta(\cos\theta\,dr-r\sin\theta\,d\theta) \\ 
&\quad +r\cos\theta(\sin\theta\,dr+r\cos\theta\,d\theta) \\ 
&=r^2\,d\theta.
\end{aligned}
$$
</div>

## 4. Verifying Stokes on a rectangle

Let $$R=[0,a]\times[0,b]$$ and $$\eta=x\,dy$$. Since $$d\eta=dx\wedge dy$$,

$$
\int_R d\eta=ab.
$$

On the boundary, the horizontal sides have $$dy=0$$. The left vertical side has $$x=0$$. The right vertical side is parametrized by $$(a,y)$$, $$0\le y\le b$$, so

$$
\int_{\partial R}x\,dy=\int_0^b a\,dy=ab.
$$

Equivalently, using $$\eta=-y\,dx$$ also gives $$d\eta=dx\wedge dy$$. Then the top edge has orientation right-to-left and contributes

$$
\int_{\text{top}}-b\,dx=ab.
$$

This example isolates the boundary-orientation trap: the nonzero contribution depends on which primitive of $$dx\wedge dy$$ is used.

## 5. Cauchy-Green bookkeeping

For $$\omega=f(w)(w-z)^{-1}dw$$,

$$
d\omega=d\left({f(w)\over w-z}\right)\wedge dw.
$$

The derivative of $$(w-z)^{-1}$$ produces a multiple of $$dw\wedge dw$$, hence vanishes. Only the $$\bar\partial$$ term survives:

$$
d\omega={f_{\bar w}(w)\over w-z}\,d\bar w\wedge dw.
$$

This is the entire algebraic reason the Cauchy-Green formula measures failure of holomorphicity.

## 6. Closed non-exact forms

The form

$$
\eta=\operatorname{Im}{dz\over z}
$$

is closed on $$\mathbb C^\times$$, but

$$
\int_{|z|=1}\eta=2\pi.
$$

The form

$$
d\log|z|=\operatorname{Re}{dz\over z}
$$

is also closed on $$\mathbb C^\times$$, but it is exact:

$$
d\log|z|=d\left({1\over2}\log(x^2+y^2)\right).
$$

The imaginary part detects angle and winding; the real part detects radius and has a global potential on the punctured plane.

## 7. Surface area

For the graph $$\sigma(u,v)=(u,v,u^2+v^2)$$,

$$
\sigma_u=(1,0,2u),\qquad \sigma_v=(0,1,2v).
$$

Thus

$$
\begin{aligned}
E&=1+4u^2,\qquad F=4uv,\\
G&=1+4v^2.
\end{aligned}
$$

and

$$
\sqrt{EG-F^2}=\sqrt{1+4u^2+4v^2}.
$$

So the area over a region $$R$$ is

$$
\iint_R \sqrt{1+4u^2+4v^2}\,du\,dv.
$$

## 8. Hodge-Weyl compatibility

Before solving a compact Poisson problem, do not try to solve $$\Delta u=f$$ before checking

$$
\int_M f\,\omega=0.
$$

For example, on $$S^1$$ the equation $$-u''=1$$ has no periodic solution because

$$
\int_0^{2\pi}1\,d\theta\ne0.
$$

But $$-u''=\cos(5\theta)$$ has the normalized solution

$$
u={1\over25}\cos(5\theta).
$$

<nav class="df-nav">
  <a href="/articles/df-08-hodge-weyl-on-riemann-surfaces/"><span>Previous</span>Hodge-Weyl</a>
  <a class="df-next" href="/articles/differential-forms/"><span>Index</span>Roadmap</a>
</nav>

</article>
