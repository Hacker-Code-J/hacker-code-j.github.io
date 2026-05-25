---
title: "Differential Forms 08: Hodge-Weyl on Riemann Surfaces"
layout: page
categories: Mathematics
tags: [differential-forms, hodge-theory, riemann-surfaces]
topics: weak solutions, Poincare inequality, Lax-Milgram, Weyl regularity
short: "The Poisson equation on a compact Riemann surface."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-08" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 08</p>

# Hodge-Weyl on Riemann surfaces

<p class="df-deck">The compact-surface Poisson equation is solved by turning Stokes' theorem into an energy identity and then applying Hilbert-space existence.</p>
</header>
{% include df_calculus_root_08.md %}


Chapter 5 of Part III proves a Hodge-Weyl theorem for functions on a compact Riemann surface. Let $$M$$ be compact, let $$\omega$$ be a smooth Hermitian area form, and consider

$$
\Delta_\omega u=f.
$$

The obstruction is constants:

$$
\int_M \Delta_\omega u\,\omega=0.
$$

Thus a solution can exist only if

$$
\int_M f\,\omega=0.
$$

The normalization

$$
\int_M u\,\omega=0
$$

removes the freedom to add constants.

## Weak formulation

Define

$$
\langle u,v\rangle_{L^2}=\int_M uv\,\omega,
\qquad
\|\nabla u\|_{L^2}^2=\int_M |\nabla u|^2\,\omega.
$$

The weak equation is

$$
\int_M \langle \nabla u,\nabla\phi\rangle\,\omega
=\int_M f\phi\,\omega
$$

for all smooth test functions $$\phi$$, using the nonnegative Laplacian convention $$\Delta=-\operatorname{div}\nabla$$. With the opposite convention the right-hand side changes sign. The identity is integration by parts on a closed surface, hence Stokes without boundary.
 
<div class="df-env" markdown="1">
<span class="df-env-title">Mean-zero Hilbert space</span>

Let

$$
W^{1,2}_\perp(M)=
\left\{u\in W^{1,2}(M):\int_M u\,\omega=0\right\}.
$$

On this space the Poincare inequality says

$$
\|u\|_{L^2}\le C_P\|\nabla u\|_{L^2}.
$$
</div>

## Existence by Lax-Milgram

Set

$$
A(u,v)=\int_M\langle\nabla u,\nabla v\rangle\,\omega,
\qquad
\Lambda_f(v)=\int_M fv\,\omega.
$$

On $$W^{1,2}_\perp(M)$$, the Poincare inequality makes $$A$$ coercive:

$$
A(u,u)=\|\nabla u\|_{L^2}^2\ge c\|u\|_{W^{1,2}}^2.
$$

The functional $$\Lambda_f$$ is bounded by Cauchy-Schwarz and Poincare. Lax-Milgram gives a unique weak solution $$u\in W^{1,2}_\perp(M)$$ and an energy estimate

$$
\|\nabla u\|_{L^2}\le C\|f\|_{L^2}.
$$

Weyl's lemma and elliptic regularity upgrade the weak solution to a smooth solution when $$f$$ is smooth.

<div class="df-proof" markdown="1">
<span class="df-env-title">The theorem</span>

If $$f\in C^\infty(M)$$ and $$\int_M f\,\omega=0$$, then there is a unique smooth $$u$$ satisfying

$$
\Delta_\omega u=f,\qquad \int_M u\,\omega=0.
$$

The proof is: mean-zero compatibility, Poincare coercivity, Lax-Milgram weak existence, then elliptic regularity.
</div>

## Model computations

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: circle Fourier mode</span>

On $$S^1=\mathbb R/2\pi\mathbb Z$$ with $$\Delta=-d^2/d\theta^2$$, solve

$$
\Delta u=\sin(3\theta),\qquad \int_0^{2\pi}u\,d\theta=0.
$$

Since

$$
-{d^2\over d\theta^2}\left({1\over 9}\sin(3\theta)\right)=\sin(3\theta),
$$

the normalized solution is

$$
u(\theta)={1\over9}\sin(3\theta).
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: flat torus mode</span>

On $$T^2=\mathbb R^2/\mathbb Z^2$$ with $$\Delta=-(\partial_x^2+\partial_y^2)$$, take

$$
f(x,y)=\cos(2\pi x)\cos(2\pi y).
$$

The mean is zero. Since

$$
\Delta\bigl(\cos(2\pi x)\cos(2\pi y)\bigr)=8\pi^2\cos(2\pi x)\cos(2\pi y),
$$

the solution is

$$
u(x,y)={1\over 8\pi^2}\cos(2\pi x)\cos(2\pi y).
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: round sphere height</span>

On the round sphere, the height function $$z$$ has mean zero and is a first spherical harmonic. With the nonnegative Laplacian convention,

$$
\Delta z=2z.
$$

Therefore $$u=z/2$$ solves $$\Delta u=z$$ with mean zero.
</div>

## Why this belongs in a forms chapter

The proof is not an isolated PDE result. The weak identity is integration by parts, integration by parts is Stokes, and the mean-zero obstruction is the statement that a divergence integrates to zero on a compact manifold without boundary.

<nav class="df-nav">
  <a href="/articles/df-07-gauss-bonnet-and-curvature-forms/"><span>Previous</span>Gauss-Bonnet</a>
  <a class="df-next" href="/articles/df-09-worked-computations-and-pitfalls/"><span>Next</span>Computations</a>
</nav>

</article>
