---
title: "Ring Theory 07: Coherent Sheaves"
layout: page
categories: Mathematics
tags: [ring-theory, coherent-sheaves, noetherian-rings]
topics: Noetherian rings, finite modules, coherent sheaves, kernels, cokernels, local finite presentation
short: "Finite modules over Noetherian affine schemes become coherent sheaves."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-07" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 07</p>

# Coherent sheaves

<p class="rt-deck">Coherent sheaves are the finite, algebraically controlled sheaves of modules. On a Noetherian affine scheme, they are exactly sheaves associated to finitely generated modules.</p>
</header>

On \\(X=\operatorname{Spec}A\\) with \\(A\\) Noetherian, coherent sheaves are the sheaves of the form \\(\widetilde M\\), where \\(M\\) is a finitely generated \\(A\\)-module. This article expands that definition and explains why it is the right finiteness condition.

## Noetherian rings

A ring \\(A\\) is Noetherian if every ideal of \\(A\\) is finitely generated. Equivalently, every ascending chain of ideals stabilizes:

$$
I_1\subseteq I_2\subseteq I_3\subseteq\cdots
\quad\Rightarrow\quad
I_N=I_{N+1}=\cdots
$$

for some \\(N\\).

Atiyah and Macdonald treat Noetherian rings as the central finiteness class in commutative algebra. Polynomial rings over fields are Noetherian by Hilbert's basis theorem, and localizations and quotients of Noetherian rings remain Noetherian.

## Finite modules

An \\(A\\)-module \\(M\\) is finitely generated if there is a surjection

$$
A^n\to M\to0.
$$

It is finitely presented if there is an exact sequence

$$
A^m\to A^n\to M\to0.
$$

Over a Noetherian ring, finitely generated modules are finitely presented. This is one reason Noetherian hypotheses make coherent sheaves stable under kernels and cokernels.

## Definition on affine schemes

Let \\(X=\operatorname{Spec}A\\), with \\(A\\) Noetherian. An \\(\mathcal O\_X\\)-module \\(\mathcal F\\) is coherent if

$$
\mathcal F\cong\widetilde M
$$

for some finitely generated \\(A\\)-module \\(M\\).

Equivalently in this Noetherian affine setting, \\(\mathcal F\\) is quasi-coherent and locally finitely generated. More generally, on a locally Noetherian scheme, a quasi-coherent sheaf is coherent exactly when it is locally of finite type; the Noetherian hypothesis promotes finite generation to finite presentation locally. Without that hypothesis, the intrinsic definition is stricter: \\(\mathcal F\\) must be locally finitely generated, and for every map from a finite free module \\(\mathcal O\_X^n\to\mathcal F\\), the kernel must be locally finitely generated.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Scope warning</span>

Outside the Noetherian setting, coherence is not the same as finite generation. One must require finite presentation and finite generation of kernels of maps from finite free modules. This series uses the Noetherian affine criterion because it is the setting needed for the first scheme-theoretic dictionary.
</div>

## Local picture

At a prime \\(\mathfrak p\\),

$$
\mathcal F_{\mathfrak p}\cong M_{\mathfrak p}.
$$

Thus coherence says that near every point, the sheaf has finitely many generators and finitely many relations. If \\(M\\) admits a presentation

$$
A^m\to A^n\to M\to0,
$$

then on \\(D(f)\\) it becomes

$$
A_f^m\to A_f^n\to M_f\to0.
$$

The same finite presentation works after restriction to a basic open.

## Stability properties

On a Noetherian affine scheme, coherent sheaves form an abelian category. Under the affine equivalence between \\(A\\)-modules and quasi-coherent sheaves, a morphism

$$
\alpha:\widetilde M\to\widetilde N
$$

comes from a unique \\(A\\)-module map \\(u:M\to N\\). The kernel, image, cokernel, and coimage are coherent. Algebraically, these are associated to the corresponding finite \\(A\\)-modules:

$$
\ker\alpha\cong\widetilde{\ker u},\qquad
\operatorname{coker}\alpha\cong\widetilde{\operatorname{coker}u}
$$

for the module map \\(u:M\to N\\) inducing \\(\alpha\\).

The Noetherian condition matters because submodules of finite modules are finite.

## Coherent sheaves as generalized vector bundles

A vector bundle corresponds to a locally free sheaf of finite rank. Coherent sheaves are broader: they may fail to be locally free, may have torsion, and may be supported on a proper closed subset.

<div class="rt-example" markdown="1">
<span class="rt-env-title">Locally free example</span>

For \\(M=A^r\\),

$$
\widetilde M\cong\mathcal O_X^r.
$$

This is the trivial rank \\(r\\) vector bundle on \\(X\\).
</div>

<div class="rt-example" markdown="1">
<span class="rt-env-title">Torsion example</span>

For \\(A=k[x]\\) and \\(M=A/(x)\\), the coherent sheaf \\(\widetilde M\\) is supported at the closed point \\((x)\\). It is not locally free on all of \\(\operatorname{Spec}A\\), because its stalk vanishes away from \\((x)\\) and is nonzero at \\((x)\\).
</div>

<div class="rt-example" markdown="1">
<span class="rt-env-title">Ideal sheaf on crossing axes</span>

Let \\(A=k[x,y]/(xy)\\). The ideal \\(I=(x)\subset A\\) gives a coherent ideal sheaf \\(\widetilde I\\). It records functions vanishing along the component \\(V(x)\\), but the behavior at the intersection point \\((x,y)\\) is not that of a vector bundle. Coherent sheaves naturally remember this singular behavior.

The quotient \\(\mathcal O\_X/\widetilde I\cong\widetilde{A/I}\\) is the structure sheaf of the closed subscheme \\(V(x)\\). The ideal sheaf \\(\widetilde I\\) itself is supported where the module \\(I\\) is nonzero; here \\(\operatorname{Ann}(I)=(y)\\), so its support is \\(V(y)\\). This distinction between the closed subscheme cut out by an ideal and the support of the ideal as a module is often useful near reducible singularities.
</div>

## Coherent versus quasi-coherent

Every coherent sheaf on a Noetherian affine scheme is quasi-coherent. The converse is false: if \\(M\\) is an infinitely generated \\(A\\)-module, \\(\widetilde M\\) is quasi-coherent but not coherent.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Common confusion</span>

Coherence is not a pointwise finite-dimensional condition. It is a local finite-presentation condition over the structure sheaf. A stalk may be a finite module over a local ring, but coherence also requires compatibility of finite generators and relations on neighborhoods.
</div>

## Why coherent sheaves matter

Coherent sheaves are stable under the operations needed for geometry:

1. kernels and cokernels of morphisms;
2. restrictions to open subsets;
3. tensor products and finite constructions;
4. ideal sheaves of closed subschemes;
5. modules of relations among equations.

They are the natural home for divisors, closed subschemes, singularities, algebraic vector bundles, and cohomology on Noetherian schemes.

<nav class="rt-nav">
  <a href="/articles/rt-06-modules-to-sheaves/"><span>Previous</span>Modules to Sheaves</a>
  <a class="rt-next" href="/articles/rt-08-geometry-of-rings/"><span>Next</span>Geometry of Rings</a>
</nav>

</article>
