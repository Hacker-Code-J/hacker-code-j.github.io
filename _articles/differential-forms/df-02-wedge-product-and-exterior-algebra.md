---
title: "Differential Forms 02: Wedge Product and Exterior Algebra"
layout: page
categories: Mathematics
tags: [differential-forms, wedge-product, exterior-algebra]
topics: wedge product, signs, determinants, volume forms
short: "The sign algebra behind integration on oriented objects."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-02" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 02</p>

# Wedge product and exterior algebra

<p class="df-deck">The wedge product is the multiplication rule that remembers orientation, dimension, and the cancellation caused by repeated directions.</p>
</header>
{% include df_calculus_root_02.md %}


Section 4.1 of the PDF uses the wedge product as the algebraic engine for determinants, area, volume, and exterior differentiation. The rule is compact:

$$
\alpha\wedge\beta=(-1)^{pq}\beta\wedge\alpha
\qquad
(\alpha\in\Omega^p,\ \beta\in\Omega^q).
$$

For 1-forms this says

$$
dx_i\wedge dx_j=-dx_j\wedge dx_i,\qquad dx_i\wedge dx_i=0.
$$

## Determinants from wedges

If $$\alpha_1,\ldots,\alpha_k$$ are 1-forms, then

$$
(\alpha_1\wedge\cdots\wedge\alpha_k)(v_1,\ldots,v_k)
=\det(\alpha_i(v_j))_{i,j}.
$$

This formula is the reason wedge products are not merely formal symbols: they compute signed volumes after the 1-forms measure vector components.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: signed area in the plane</span>

Let $$v=(2,1)$$ and $$w=(-1,3)$$. Then

$$
(dx\wedge dy)(v,w)=
\det\begin{pmatrix}2&-1\\1&3\end{pmatrix}=7.
$$

The same parallelogram with reversed ordered basis gives

$$
(dx\wedge dy)(w,v)=-7.
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: volume in three dimensions</span>

For

$$
u=(1,0,1),\quad v=(0,2,1),\quad w=(1,1,0),
$$

the form $$dx\wedge dy\wedge dz$$ gives

$$
\det
\begin{pmatrix}
1&0&1\\
0&2&1\\
1&1&0
\end{pmatrix}
=-3.
$$

The negative sign says the ordered frame $$(u,v,w)$$ has opposite orientation from $$(\partial_x,\partial_y,\partial_z)$$.
</div>

## Expanding products

Let

$$
\alpha=a\,dx+b\,dy,\qquad \beta=c\,dx+d\,dy.
$$

Then

$$
\alpha\wedge\beta
=(ad-bc)\,dx\wedge dy.
$$

The determinant has appeared again. In higher dimensions, the same principle gives minors. For instance, in $$\mathbb R^3$$,

$$
(P\,dx+Q\,dy+R\,dz)\wedge dx\wedge dz=-Q\,dx\wedge dy\wedge dz.
$$

Only the coefficient of the missing basis direction survives.

<div class="df-warning" markdown="1">
<span class="df-env-title">Common sign error</span>

The identity $$dy\wedge dx=-dx\wedge dy$$ is the most frequent source of wrong answers. In computations, move every term to the ordered basis $$dx_1\wedge\cdots\wedge dx_n$$ before comparing coefficients.
</div>

## Degree and vanishing

Forms vanish when their degree exceeds the dimension. On a surface,

$$
\Omega^3=0.
$$

Thus every 2-form on a surface is automatically closed after applying one more exterior derivative for degree reasons. This is not a topological fact; it is linear algebra.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: automatic vanishing in two variables</span>

For $$\omega=f(x,y)\,dx\wedge dy$$,

$$
d\omega=df\wedge dx\wedge dy
=(f_x\,dx+f_y\,dy)\wedge dx\wedge dy=0.
$$

Both terms contain a repeated factor.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 4: non-automatic behavior in three variables</span>

In $$\mathbb R^3$$,

$$
\omega=x\,dy\wedge dz+y\,dz\wedge dx+z\,dx\wedge dy
$$

is a 2-form, and its derivative is a 3-form:

$$
d\omega=3\,dx\wedge dy\wedge dz.
$$

Top degree is not zero; degree larger than top degree is zero.
</div>

## Pullback and the wedge

If $$F:V\to U$$ is smooth, then pullback respects wedge products:

$$
F^*(\alpha\wedge\beta)=F^*\alpha\wedge F^*\beta.
$$

For a parametrization $$F(s,t)=(u(s,t),v(s,t))$$,

$$
F^*(du\wedge dv)=
(u_s\,ds+u_t\,dt)\wedge(v_s\,ds+v_t\,dt)
=\det DF\,ds\wedge dt.
$$

This is the change-of-variables Jacobian written as an identity of 2-forms.

<nav class="df-nav">
  <a href="/articles/df-01-tangent-cotangent-and-forms/"><span>Previous</span>Tangent and Cotangent</a>
  <a class="df-next" href="/articles/df-03-exterior-derivative/"><span>Next</span>Exterior Derivative</a>
</nav>

</article>
