---
title: "Differential Forms 01: Tangent, Cotangent, and Forms"
layout: page
categories: Mathematics
tags: [differential-forms, tangent-spaces, cotangent-spaces]
topics: tangent vectors, derivations, cotangent vectors, local forms
short: "Forms as smooth fields of alternating covectors."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-01" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 01</p>

# Tangent, cotangent, and forms

<p class="df-deck">A differential form is not a decorated integral sign. It is a smoothly varying alternating covector, designed to be evaluated on tangent directions.</p>
</header>
{% include df_calculus_root_01.md %}


The PDF begins Part III by defining tangent vectors as derivations and forms as alternating multilinear maps (Part III, Section 4.1, p.154). This is the right starting point: the integral calculus of forms is built from pointwise linear algebra.

## Tangent vectors as derivations

Let $$U\subset \mathbb R^n$$ be open and $$p\in U$$. A tangent vector at $$p$$ may be treated as a derivation

$$
D:C^\infty(U)\to \mathbb R,\qquad
D(fg)=f(p)D(g)+g(p)D(f).
$$

The coordinate derivations

$$
\partial_i\vert_p(f)={\partial f\over \partial x_i}(p)
$$

form a basis of $$T_pU$$. Hence every tangent vector is uniquely

$$
v=\sum_{i=1}^n v^i\partial_i\vert_p.
$$

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: derivation on a polynomial</span>

In $$\mathbb R^2$$, let $$p=(1,2)$$ and $$v=3\partial_x-\partial_y$$. For

$$
f(x,y)=x^2y+\sin y,
$$

one has

$$
v(f)=3(2xy)\vert_{(1,2)}-(x^2+\cos y)\vert_{(1,2)}
=12-1-\cos 2.
$$

The vector is not a tiny arrow by definition; it is the operator taking directional derivatives at $$p$$.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: tangent vector on a parametrized curve</span>

For $$\gamma(t)=(t,t^2,e^t)$$ in $$\mathbb R^3$$, the tangent vector at $$t=0$$ is

$$
\gamma'(0)=\partial_x+0\partial_y+\partial_z.
$$

As a derivation it sends $$h(x,y,z)=xz+y^2$$ to

$$
\gamma'(0)(h)=h_x(0,0,1)+h_z(0,0,1)=1+0=1.
$$
</div>

## Cotangent vectors and coordinate 1-forms

The cotangent space $$T_p^*U$$ is the dual vector space of linear functionals on $$T_pU$$. The coordinate 1-forms $$dx_i$$ are defined by

$$
dx_i(\partial_j)=\delta_{ij}.
$$

A 1-form on $$U$$ is a smooth field of covectors

$$
\eta=\sum_{i=1}^n a_i\,dx_i,\qquad a_i\in C^\infty(U).
$$

Its value on a vector $$v=\sum v^i\partial_i$$ is

$$
\eta_p(v)=\sum_{i=1}^n a_i(p)v^i.
$$

This row-vector/column-vector picture is useful, but only locally. Under a coordinate change the coefficients and the basis covectors transform together.

## Differential of a function

For a smooth function $$f$$,

$$
df=\sum_i {\partial f\over \partial x_i}\,dx_i.
$$

The point of this definition is the identity

$$
(df)_p(v)=v(f).
$$

Thus $$df$$ packages all directional derivatives of $$f$$ into a single 1-form.

<div class="df-env" markdown="1">
<span class="df-env-title">Definition</span>

A smooth $$k$$-form on $$U$$ is a smooth assignment

$$
p\longmapsto \omega_p\in \Lambda^k(T_p^*U),
$$

where $$\omega_p$$ is alternating and multilinear in $$k$$ tangent-vector inputs. The space of all smooth $$k$$-forms is denoted $$\Omega^k(U)$$.
</div>

The low-degree cases matter:

- $$\Omega^0(U)=C^\infty(U)$$.
- $$\Omega^1(U)$$ consists of covector fields.
- $$\Omega^n(U)$$ consists of density-like objects that can be integrated over oriented $$n$$-dimensional regions.
- $$\Omega^k(U)=0$$ for $$k>n$$.

## Local coordinate form

Every $$k$$-form can be written uniquely as

$$
\omega=\sum_{1\le i_1<\cdots<i_k\le n}
a_{i_1\cdots i_k}\,dx_{i_1}\wedge\cdots\wedge dx_{i_k}.
$$

This formula should be read as a coordinate expansion, not as a definition of forms. The coordinate-free object is the alternating covector field; the expression above is what one computes with.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: a 2-form measuring signed area</span>

In $$\mathbb R^2$$,

$$
\omega=dx\wedge dy
$$

acts by

$$
\omega(v,w)=
\det\begin{pmatrix}
dx(v)&dx(w)\\
dy(v)&dy(w)
\end{pmatrix}.
$$

For $$v=(1,1)$$ and $$w=(2,1)$$ this gives $$1\cdot 1-2\cdot 1=-1$$. Swapping the vectors changes the sign.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 4: a top form in three variables</span>

In $$\mathbb R^3$$,

$$
\omega=(x^2+z)\,dx\wedge dy\wedge dz
$$

evaluated at $$p=(1,0,2)$$ multiplies oriented volume by $$3$$. On vectors $$u,v,w$$,

$$
\omega_p(u,v,w)=3\det[u\ v\ w].
$$
</div>

## What smoothness means

For a form $$\omega$$ to be smooth, its value on smooth vector fields must vary smoothly. In coordinates this is equivalent to the coefficient functions being smooth. For example, the assignment

$$
\omega_p=
\begin{cases}
dx\wedge dy,&x(p)\ge 0,\\
0,&x(p)<0
\end{cases}
$$

is pointwise alternating, but not a smooth 2-form because its coefficient jumps across the line $$x=0$$.

<nav class="df-nav">
  <a href="/articles/differential-forms/"><span>Index</span>Roadmap</a>
  <a class="df-next" href="/articles/df-02-wedge-product-and-exterior-algebra/"><span>Next</span>Wedge Product</a>
</nav>

</article>
