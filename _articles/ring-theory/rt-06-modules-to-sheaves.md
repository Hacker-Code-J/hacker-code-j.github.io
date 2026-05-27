---
title: "Ring Theory 06: From Modules to Quasi-Coherent Sheaves"
layout: page
categories: Mathematics
tags: [ring-theory, modules, quasi-coherent-sheaves]
topics: associated sheaf, tilde construction, localization of modules, quasi-coherent sheaves
short: "How A-modules become sheaves on Spec A."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-06" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 06</p>

# From modules to quasi-coherent sheaves

<p class="rt-deck">The structure sheaf turns a ring into functions on a space. The tilde construction turns modules into sheaves of algebraic data over that space.</p>
</header>

The associated sheaf \\(\widetilde M\\) is defined by localizing \\(M\\) on basic opens. Atiyah and Macdonald supply the module-theoretic foundation: localization is exact, commutes with finite constructions, and is best understood through tensor products.

## Localization of modules

Let \\(M\\) be an \\(A\\)-module and \\(S\subset A\\) a multiplicative set. The localization \\(S^{-1}M\\) consists of fractions

$$
\frac m s,\qquad m\in M,\ s\in S,
$$

with the usual equivalence relation. If \\(S=\{1,f,f^2,\ldots\}\\), write

$$
M_f=S^{-1}M.
$$

Equivalently,

$$
M_f\cong M\otimes_A A_f.
$$

At a prime \\(\mathfrak p\\),

$$
M_{\mathfrak p}=(A\setminus\mathfrak p)^{-1}M.
$$

## The associated sheaf

Let \\(X=\operatorname{Spec}A\\). The associated sheaf \\(\widetilde M\\) is the \\(\mathcal O\_X\\)-module determined on basic opens by

$$
\widetilde M(D(f))=M_f.
$$

The action of \\(\mathcal O\_X(D(f))=A\_f\\) on \\(M\_f\\) makes this a sheaf of modules over the structure sheaf.

Its stalks are

$$
(\widetilde M)_{\mathfrak p}\cong M_{\mathfrak p}.
$$

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof</span>

Basic neighborhoods of \\(\mathfrak p\\) are \\(D(f)\\) with \\(f\notin\mathfrak p\\), and \\(\widetilde M(D(f))=M\_f\\). The stalk is therefore

$$
\varinjlim_{f\notin\mathfrak p}M_f.
$$

The natural map from this direct limit to \\(M\_{\mathfrak p}\\) sends a local section \\(m/f^n\\) to the same fraction in \\((A\setminus\mathfrak p)^{-1}M\\). It is surjective because every \\(m/s\in M\_{\mathfrak p}\\) is represented on \\(D(s)\\). It is injective because if representatives \\(m/f^n\in M\_f\\) and \\(m'/g^r\in M\_g\\) become equal in \\(M\_{\mathfrak p}\\), then equality holds after multiplying by some \\(t\notin\mathfrak p\\), hence after restricting both representatives to \\(D(fgt)\\). Therefore \\((\widetilde M)\_{\mathfrak p}\cong M\_{\mathfrak p}\\).
</div>

## Quasi-coherent sheaves

An \\(\mathcal O\_X\\)-module \\(\mathcal F\\) on an affine scheme \\(X=\operatorname{Spec}A\\) is quasi-coherent if

$$
\mathcal F\cong\widetilde M
$$

for some \\(A\\)-module \\(M\\).

On an arbitrary scheme, quasi-coherence is defined locally: every point has an affine open neighborhood on which \\(\mathcal F\\) is associated to a module. On affine schemes, the global module \\(\Gamma(X,\mathcal F)\\) recovers a quasi-coherent sheaf:

$$
\widetilde{\Gamma(X,\mathcal F)}\cong\mathcal F.
$$

<div class="rt-env" markdown="1">
<span class="rt-env-title">Affine equivalence</span>

The standard affine quasi-coherence theorem says that, for \\(X=\operatorname{Spec}A\\), the category of \\(A\\)-modules is equivalent to the category of quasi-coherent \\(\mathcal O\_X\\)-modules:

$$
M\mapsto\widetilde M,\qquad
\mathcal F\mapsto\Gamma(X,\mathcal F).
$$

The nontrivial direction is that a quasi-coherent sheaf on an affine scheme is determined by its global sections. On each basic open \\(D(f)\\), the canonical comparison map gives

$$
\Gamma(X,\mathcal F)_f\cong\mathcal F(D(f)),
$$

and these isomorphisms agree on intersections \\(D(fg)\\). Since the \\(D(f)\\)'s form a basis, they glue to \\(\widetilde{\Gamma(X,\mathcal F)}\cong\mathcal F\\).
</div>

## Exactness

Localization is exact: for every prime \\(\mathfrak p\\), localizing a short exact sequence of \\(A\\)-modules remains exact. Therefore a short exact sequence

$$
0\to M'\to M\to M''\to0
$$

induces a short exact sequence of sheaves

$$
0\to\widetilde{M'}\to\widetilde M\to\widetilde{M''}\to0.
$$

Stalkwise, this is just the exact sequence

$$
0\to M'_{\mathfrak p}\to M_{\mathfrak p}\to M''_{\mathfrak p}\to0.
$$

This is one reason affine geometry is algebraically powerful: exact module computations localize cleanly.

Conversely, a sequence of sheaves of modules is exact if and only if it is exact on all stalks. Thus exactness of the displayed sheaf sequence follows rigorously from exactness of the localized module sequence at every \\(\mathfrak p\\).

## Examples

### The structure sheaf

For \\(M=A\\),

$$
\widetilde A=\mathcal O_{\operatorname{Spec}A}.
$$

Thus the structure sheaf is the module sheaf associated to the regular module \\(A\\).

### Ideal sheaves

If \\(I\subset A\\) is an ideal, then \\(\widetilde I\\) is a subsheaf of \\(\mathcal O\_X\\). It is the sheaf of functions locally belonging to \\(I\\). The quotient sequence

$$
0\to I\to A\to A/I\to0
$$

gives

$$
0\to\widetilde I\to\mathcal O_X\to\widetilde{A/I}\to0.
$$

The sheaf \\(\widetilde{A/I}\\) is supported on \\(V(I)\\).

### A skyscraper-like affine example

Let \\(A=k[x]\\) and \\(M=A/(x-a)\\). Then

$$
M_{\mathfrak p}=0
$$

unless \\(\mathfrak p\supseteq(x-a)\\). Since \\((x-a)\\) is maximal, the only nonzero stalk is at the closed point \\((x-a)\\). The sheaf \\(\widetilde{A/(x-a)}\\) is therefore concentrated at that point, like a skyscraper sheaf.

### Modules over the crossing axes

Let \\(A=k[x,y]/(xy)\\). The module \\(A/(x)\\) corresponds to the \\(y\\)-axis component. As a sheaf, \\(\widetilde{A/(x)}\\) is supported on \\(V(x)\\), one irreducible component of the crossing.

## Local generators

If \\(M\\) is generated by \\(m\_1,\ldots,m\_n\\), then \\(\widetilde M\\) is generated by the corresponding global sections. On \\(D(f)\\), these generate \\(M\_f\\) over \\(A\_f\\). Conversely, local generation of sheaves on affine opens translates into generation of localized modules.

This is the bridge to coherent sheaves: finite module generation becomes finite local generation of sheaves.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Common confusion</span>

Quasi-coherent does not mean finite. The module \\(M\\) may be infinitely generated. Coherence is the stronger finiteness condition obtained from finitely generated modules over Noetherian rings.
</div>

<nav class="rt-nav">
  <a href="/articles/rt-05-structure-sheaf-affine-schemes/"><span>Previous</span>Structure Sheaf and Affine Schemes</a>
  <a class="rt-next" href="/articles/rt-07-coherent-sheaves/"><span>Next</span>Coherent Sheaves</a>
</nav>

</article>
