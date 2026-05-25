---
title: "Differential Forms 03: Exterior Derivative"
layout: page
categories: Mathematics
tags: [differential-forms, exterior-derivative, closed-forms]
topics: exterior derivative, graded Leibniz rule, d squared zero
short: "The differential operator that turns forms into Stokes data."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-03" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 03</p>

# Exterior derivative

<p class="df-deck">The exterior derivative is the unique calculus operation that extends ordinary differentiation and makes boundary integrals equal interior integrals.</p>
</header>
{% include df_calculus_root_03.md %}


For a local expression

$$
\omega=\sum_I a_I\,dx_I,
$$

the exterior derivative is

$$
d\omega=\sum_I da_I\wedge dx_I,
\qquad
da_I=\sum_j {\partial a_I\over \partial x_j}\,dx_j.
$$

This is the computational rule used in Section 4.1 of the PDF. The definitions are arranged so that two structural identities hold:

$$
d(\alpha\wedge\beta)=d\alpha\wedge\beta+(-1)^{\deg\alpha}\alpha\wedge d\beta,
\qquad
d^2=0.
$$

## Functions and 1-forms

For a function $$f$$,

$$
df=\sum_i f_{x_i}\,dx_i.
$$

For a planar 1-form $$\eta=P\,dx+Q\,dy$$,

$$
d\eta=dP\wedge dx+dQ\wedge dy=(Q_x-P_y)\,dx\wedge dy.
$$

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: curl as exterior derivative</span>

Let

$$
\eta=(x^2y)\,dx+(\sin x+y^3)\,dy.
$$

Then

$$
d\eta=(\cos x- x^2)\,dx\wedge dy.
$$

The coefficient is the scalar curl $$Q_x-P_y$$.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: divergence as derivative of a 2-form</span>

In $$\mathbb R^3$$ associate a vector field $$F=(P,Q,R)$$ to

$$
\alpha=P\,dy\wedge dz+Q\,dz\wedge dx+R\,dx\wedge dy.
$$

Then

$$
d\alpha=(P_x+Q_y+R_z)\,dx\wedge dy\wedge dz.
$$

Thus the divergence theorem is a Stokes theorem for this 2-form.
</div>

## Why the sign in Leibniz appears

If $$\alpha=a_I dx_I$$ is degree $$k$$ and $$\beta=b_Jdx_J$$, then

$$
d(\alpha\wedge\beta)=
d(a_Ib_J)\wedge dx_I\wedge dx_J.
$$

The term $$a_I\,db_J$$ must move past the $$k$$ one-forms in $$dx_I$$, producing the factor $$(-1)^k$$. Therefore

$$
d(\alpha\wedge\beta)=d\alpha\wedge\beta+(-1)^k\alpha\wedge d\beta.
$$

<div class="df-proof" markdown="1">
<span class="df-env-title">Proof sketch of $$d^2=0$$</span>

It is enough to test $$\omega=a\,dx_{i_1}\wedge\cdots\wedge dx_{i_k}$$. Then

$$
d\omega=\sum_p a_{x_p}\,dx_p\wedge dx_{i_1}\wedge\cdots\wedge dx_{i_k}.
$$

Applying $$d$$ again gives

$$
d^2\omega=
\sum_{p,q} a_{x_qx_p}\,
dx_q\wedge dx_p\wedge dx_{i_1}\wedge\cdots\wedge dx_{i_k}.
$$

The term $$(p,q)$$ cancels the term $$(q,p)$$ because mixed partials agree while $$dx_q\wedge dx_p=-dx_p\wedge dx_q$$. Terms with $$p=q$$ vanish because $$dx_p\wedge dx_p=0$$.
</div>

## Closed and exact

A form $$\omega$$ is closed if $$d\omega=0$$. It is exact if $$\omega=d\eta$$ for some form $$\eta$$. Since $$d^2=0$$,

$$
\text{exact}\quad\Longrightarrow\quad\text{closed}.
$$

For positive-degree forms, the converse is local on small balls but not global on arbitrary domains. In degree zero, closed means locally constant; there are no $$(-1)$$-forms whose exterior derivative could produce an exact 0-form.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: exact form</span>

Let $$f=x^2y+\cos y$$. Then

$$
df=2xy\,dx+(x^2-\sin y)\,dy.
$$

The form is closed because

$$
d(df)=((2x)-(2x))\,dx\wedge dy=0.
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 4: a closed 2-form for degree reasons</span>

On $$\mathbb R^2$$, every 2-form $$f\,dx\wedge dy$$ is closed. But it is not meaningful to infer topology from this alone; $$d$$ would land in $$\Omega^3(\mathbb R^2)=0$$. Degree can force closedness without saying anything about primitives.
</div>

## Reading Stokes in advance

The exterior derivative is constructed so that

$$
\int_{\partial M}\omega=\int_M d\omega
$$

has a uniform meaning. In dimension one this is the fundamental theorem of calculus. In dimension two it becomes Green's theorem. In dimension three it becomes classical Stokes or divergence, depending on the degree of $$\omega$$.

<nav class="df-nav">
  <a href="/articles/df-02-wedge-product-and-exterior-algebra/"><span>Previous</span>Wedge Product</a>
  <a class="df-next" href="/articles/df-04-line-integrals-and-conservative-fields/"><span>Next</span>Line Integrals</a>
</nav>

</article>
