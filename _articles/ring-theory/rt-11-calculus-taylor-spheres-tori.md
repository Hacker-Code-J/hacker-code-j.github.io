---
title: "Ring Theory 11: Calculus, Taylor Expansions, Spheres, and Tori"
layout: page
categories: Mathematics
tags: [ring-theory, affine-schemes, calculus, taylor-series]
topics: residue fields, local rings, Taylor expansions, tangent spaces, spheres, tori
short: "A careful calculus analogy for schemes, local rings, coherent sheaves, S^2, and T^2."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-11" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 11</p>

# Calculus, Taylor expansions, spheres, and tori

<p class="rt-deck">Affine scheme theory is not literally calculus, but it generalizes a familiar calculus pattern: functions determine local behavior, local expansions describe infinitesimal neighborhoods, and sheaves organize the passage from local data to global geometry.</p>
</header>

This article is a conceptual bridge. Classical calculus usually begins with a space and studies functions on it. Affine algebraic geometry reverses the direction: it begins with a commutative ring and reconstructs a space whose functions are controlled by that ring.

The analogy is useful only if it is kept precise. Smooth calculus uses arbitrary smooth functions, coordinate charts, derivatives, and Taylor polynomials. Analytic functions are determined locally by their convergent Taylor series, but smooth functions need not be: a nonzero smooth function can have all derivatives zero at a point. Affine algebraic geometry uses polynomial or regular functions, prime ideals, local rings, residue fields, and sheaves. The languages overlap strongly around germs, tangent spaces, finite jets, and local-to-global reasoning, but they are not the same theory.

## From functions on a space to a space from functions

In calculus, one studies functions such as

$$
f:S^2\to\mathbb R
\qquad\text{or}\qquad
g:T^2\to\mathbb R,
$$

where \\(S^2\\) is the sphere and \\(T^2\\) is the two-dimensional torus. The space is already present. The functions are then differentiated, expanded locally, and compared on coordinate charts.

In affine algebraic geometry, the starting point is instead a ring \\(A\\). The reconstruction is

$$
A
\quad\leadsto\quad
\operatorname{Spec}A
\quad\leadsto\quad
(\operatorname{Spec}A,\mathcal O_{\operatorname{Spec}A}).
$$

The first step creates the points and topology. The second step creates the sheaf of local regular functions. A ring element \\(a\in A\\) is a global regular function, but its pointwise value at \\(\mathfrak p\\) lies in the residue field

$$
\kappa(\mathfrak p)=\operatorname{Frac}(A/\mathfrak p),
$$

not in one fixed scalar field independent of the point.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Warning</span>

It is safe to say that affine schemes have a calculus-like local structure. It is not safe to say that scheme theory is just calculus. Scheme theory also keeps generic points, nilpotents, arithmetic residue fields, and sheaf-theoretic gluing data that ordinary pointwise calculus does not see.
</div>

## Taylor expansion and local rings

In one-variable calculus, local behavior near \\(a\in\mathbb C\\) is organized by powers of \\(x-a\\):

$$
f(x)=f(a)+f'(a)(x-a)+\frac{f''(a)}{2}(x-a)^2+\cdots.
$$

Algebraically, the point \\(a\\) corresponds to the maximal ideal

$$
\mathfrak m_a=(x-a)\subset\mathbb C[x].
$$

The local ring at that point is

$$
\mathbb C[x]_{\mathfrak m_a}
=
\mathbb C[x]_{(x-a)}.
$$

This ring consists of rational functions \\(g/h\\) with \\(h(a)\ne0\\). In calculus language, these are algebraic functions defined near \\(a\\), at least wherever the denominator does not vanish.

The powers

$$
\mathfrak m_a,\quad
\mathfrak m_a^2,\quad
\mathfrak m_a^3,\quad\ldots
$$

measure increasing orders of vanishing at \\(a\\). The quotient

$$
\mathbb C[x]_{(x-a)}/(x-a)^{N+1}
$$

records the Taylor polynomial of order \\(N\\) for algebraic local functions. Thus local rings and their quotients by powers of the maximal ideal are algebraic versions of finite Taylor data.

The arithmetic analogue is \\(\mathbb Z\\) at a prime \\((p)\\). The local ring

$$
\mathbb Z_{(p)}
$$

consists of rational numbers whose denominators are not divisible by \\(p\\). Its residue field is

$$
\mathbb Z_{(p)}/p\mathbb Z_{(p)}\cong\mathbb F_p.
$$

The powers \\(p,p^2,p^3,\ldots\\) measure increasing divisibility by \\(p\\), just as powers of \\(x-a\\) measure increasing vanishing at a complex point of \\(\operatorname{Spec}\mathbb C[x]\\). This is not Taylor series in the analytic sense, but it is the same local algebra pattern: a point, a local ring, a maximal ideal, and successive infinitesimal or congruence neighborhoods.

## Dual numbers as first-order Taylor data

The dual numbers

$$
\mathbb C[\epsilon]/(\epsilon^2)
$$

encode first-order infinitesimal behavior. A Taylor expansion modulo terms of order two has the form

$$
f(a+\epsilon)=f(a)+f'(a)\epsilon,
\qquad
\epsilon^2=0.
$$

The nilpotent element \\(\epsilon\\) has zero value in the residue field, but it is not zero in the ring. This is exactly why schemes keep nilpotents: they record infinitesimal data that ordinary point-values erase.

<div class="rt-example" markdown="1">
<span class="rt-env-title">Example: first-order neighborhood of a point</span>

The closed point \\((x-a)\subset\mathbb C[x]\\) has residue field \\(\mathbb C\\). The quotient

$$
\mathbb C[x]/(x-a)^2
$$

is the first-order thickening of that point. If \\(\epsilon=x-a\\), then \\(\epsilon^2=0\\), and the quotient is isomorphic to \\(\mathbb C[\epsilon]/(\epsilon^2)\\).
</div>

## Tangent spaces from maximal ideals

For a scheme \\(X\\) and a point \\(p\\), let \\(\mathcal O\_{X,p}\\) be the local ring and \\(\mathfrak m\_p\\) its maximal ideal. The absolute Zariski tangent space of the local scheme at \\(p\\) is

$$
T_pX\cong
\operatorname{Hom}_{\kappa(p)}
\left(
\mathfrak m_p/\mathfrak m_p^2,
\kappa(p)
\right).
$$

The quotient \\(\mathfrak m\_p/\mathfrak m\_p^2\\) captures first-order functions vanishing at \\(p\\), modulo functions vanishing to second order. Its dual is the space of first-order directions.

For a smooth manifold, the tangent space is usually defined using velocities of curves or derivations of smooth functions. At a smooth real point of a real algebraic variety, the algebraic formula gives the same first-order linear constraints as the differential calculation. In general schemes, however, this is the Zariski tangent space; it can be larger than the geometric dimension at singular or nonreduced points.

## The sphere \\(S^2\\)

As a smooth manifold,

$$
S^2=\{(x,y,z)\in\mathbb R^3:x^2+y^2+z^2=1\}
$$

has a ring of smooth functions \\(C^\infty(S^2)\\). Calculus on \\(S^2\\) is local: one chooses coordinate charts, differentiates functions in those coordinates, and checks that the results transform correctly on overlaps.

The same equation also defines a real affine scheme, or real affine algebraic variety in the classical language, whose real points are the usual sphere and whose coordinate ring is

$$
\mathbb R[x,y,z]/(x^2+y^2+z^2-1).
$$

This algebraic object remembers polynomial regular functions, not all smooth functions. Its local rings describe algebraic germs. The smooth manifold and the real algebraic variety have closely related geometric intuition, but their function rings are different.

At a real point \\(p=(a,b,c)\in S^2\\), the usual tangent plane is obtained by linearizing the defining equation. The differential of

$$
x^2+y^2+z^2-1
$$

at \\(p\\) is

$$
2a\,dx+2b\,dy+2c\,dz.
$$

Therefore tangent vectors \\((u,v,w)\\) satisfy

$$
au+bv+cw=0.
$$

This is both the calculus derivative and the algebraic first-order condition saying that the defining equation vanishes modulo square-zero terms.

## The torus \\(T^2\\)

As a smooth manifold,

$$
T^2=S^1\times S^1.
$$

It has smooth functions \\(C^\infty(T^2)\\), local coordinates by angles, and tangent spaces with two independent directions at every point.

One algebraic model over \\(\mathbb R\\) is the affine scheme, or classical real subvariety of \\(\mathbb R^4\\), cut out by two circle equations:

$$
x_1^2+y_1^2=1,
\qquad
x_2^2+y_2^2=1.
$$

Its coordinate ring is

$$
\mathbb R[x_1,y_1,x_2,y_2]/
(x_1^2+y_1^2-1,\ x_2^2+y_2^2-1).
$$

At a point \\((a\_1,b\_1,a\_2,b\_2)\\), tangent directions \\((u\_1,v\_1,u\_2,v\_2)\\) satisfy the two linearized equations

$$
a_1u_1+b_1v_1=0,
\qquad
a_2u_2+b_2v_2=0.
$$

Thus the tangent space is two-dimensional, matching the smooth manifold picture. Again, the algebraic model uses polynomial functions, while the smooth torus uses all smooth functions.

## Coherent sheaves and finite local data

Vector bundles in differential geometry are locally free sheaves of smooth sections. Coherent sheaves are the algebraic analogue of finite systems of local algebraic data, but they are more flexible than vector bundles.

On a Noetherian affine scheme \\(X=\operatorname{Spec}A\\), a finitely generated module \\(M\\) gives a coherent sheaf \\(\widetilde M\\). If \\(M\\) is finite locally free, then \\(\widetilde M\\) behaves like an algebraic vector bundle. If \\(M\\) has torsion or singular support, then \\(\widetilde M\\) is still coherent, but not a vector bundle.

This is similar to calculus in the following limited sense: local data are described in neighborhoods, restrictions compare data on smaller neighborhoods, and gluing constructs global objects from compatible local objects. The sheaf formalism is the precise mechanism.

## Local-to-global dictionary

| Calculus or smooth geometry | Affine algebraic geometry |
|---|---|
| Function near a point | Element of a local ring \\(\mathcal O\_{X,p}\\) |
| Value at a point | Image in the residue field \\(\kappa(p)\\) |
| Taylor polynomial to order \\(N\\) | Quotient by \\(\mathfrak m\_p^{N+1}\\) |
| First derivative | First-order behavior modulo \\(\mathfrak m\_p^2\\) |
| Tangent space | Dual of \\(\mathfrak m\_p/\mathfrak m\_p^2\\) |
| Vector bundle | Locally free coherent sheaf |
| Local sections and compatibility | Sheaf restrictions and gluing |
| Smooth functions on \\(S^2\\) or \\(T^2\\) | Regular functions on an algebraic model |

The unifying idea is local-to-global organization. Taylor polynomials and jets organize finite-order local behavior of functions. Local rings organize algebraic germs. Stalks organize the behavior of sheaves at points. Coherent sheaves organize finite algebraic data in a way that can be checked locally and glued globally.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Final caution</span>

Smooth manifolds such as \\(S^2\\) and \\(T^2\\) are not determined by polynomial functions in the same way affine schemes are determined by coordinate rings. The analogy is strongest at the level of local rings, infinitesimal neighborhoods, tangent spaces, and sheaf gluing. It should not erase the difference between smooth, real algebraic, complex algebraic, affine, and non-affine geometry.
</div>

<nav class="rt-nav">
  <a href="/articles/rt-10-ring-and-space-synthesis/"><span>Previous</span>Ring-to-Space Synthesis</a>
  <a class="rt-next" href="/articles/rt-appendix-reference-map/"><span>Next</span>Reference Map</a>
</nav>

</article>
