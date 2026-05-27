---
title: "Ring Theory 04: Sheaves, Stalks, and Locality"
layout: page
categories: Mathematics
tags: [ring-theory, sheaves, stalks]
topics: presheaves, sheaves, stalks, sheafification, locality, gluing
short: "The local-to-global language needed for the structure sheaf."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-04" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 04</p>

# Sheaves, stalks, and locality

<p class="rt-deck">A sheaf is not merely a rule assigning data to open sets. It is a rule with restriction, locality, and gluing, so that compatible local information is exactly the same as global information.</p>
</header>

The structure sheaf is what turns a topological spectrum into an affine scheme. Before constructing it, we need the general language of presheaves, sheaves, and stalks. This article overlaps intentionally with the sheaf-cohomology series, but the emphasis here is algebraic: sheaves will be rings and modules on \\(\operatorname{Spec}A\\).

## Presheaves

Let \\(X\\) be a topological space. A presheaf \\(\mathcal F\\) of rings on \\(X\\) assigns:

1. a ring \\(\mathcal F(U)\\) to every open set \\(U\subseteq X\\);
2. a restriction map \\(\rho^U\_V:\mathcal F(U)\to\mathcal F(V)\\) for every inclusion \\(V\subseteq U\\);
3. identities

$$
\rho^U_U=\operatorname{id},
\qquad
\rho^V_W\circ\rho^U_V=\rho^U_W
\quad(W\subseteq V\subseteq U).
$$

Elements of \\(\mathcal F(U)\\) are called sections over \\(U\\), and \\(s|\_V\\) denotes \\(\rho^U\_V(s)\\).

## Sheaf axioms

A presheaf \\(\mathcal F\\) is a sheaf if every open cover \\(U=\bigcup\_i U\_i\\) satisfies two axioms.

**Locality.** If \\(s,t\in\mathcal F(U)\\) and \\(s|\_{U\_i}=t|\_{U\_i}\\) for every \\(i\\), then \\(s=t\\).

**Gluing.** If sections \\(s\_i\in\mathcal F(U\_i)\\) satisfy

$$
s_i|_{U_i\cap U_j}=s_j|_{U_i\cap U_j}
$$

for all \\(i,j\\), then there exists a unique \\(s\in\mathcal F(U)\\) with \\(s|\_{U\_i}=s\_i\\).

The uniqueness in gluing follows from locality. The existence is the substantive condition.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Common confusion</span>

A sheaf is not just the assignment \\(U\mapsto\mathcal F(U)\\). The restriction maps and gluing law are part of the object. Without them, the assignment does not know how local data compare on overlaps.
</div>

## Examples and non-examples

The sheaf of continuous real-valued functions on a topological space is a sheaf: continuous functions are local and glue when they agree on overlaps.

The sheaf of regular functions on an affine scheme will be the structure sheaf. On \\(D(f)\subseteq\operatorname{Spec}A\\), its sections will be \\(A\_f\\).

A typical non-example is the presheaf of bounded continuous functions. Local bounded functions may glue to an unbounded global function, so the gluing axiom fails.

## Stalks

Let \\(\mathcal F\\) be a sheaf on \\(X\\) and let \\(x\in X\\). The stalk at \\(x\\) is

$$
\mathcal F_x=\varinjlim_{x\in U}\mathcal F(U).
$$

Informally, \\(\mathcal F\_x\\) consists of germs of sections near \\(x\\). Two sections represent the same germ if they agree on some smaller neighborhood of \\(x\\).

For algebraic geometry, stalks are local rings or local modules. They answer questions that can be checked in an arbitrarily small neighborhood of a point.

## Locality through stalks

Many sheaf-theoretic properties can be tested at stalks. For example, a morphism of sheaves of abelian groups

$$
\alpha:\mathcal F\to\mathcal G
$$

is an isomorphism if and only if every induced map

$$
\alpha_x:\mathcal F_x\to\mathcal G_x
$$

is an isomorphism.

This principle is essential for coherent sheaves: exactness, finite generation, and support are often most transparent after localizing at every prime.

## Sheafification

Some naturally defined objects first appear as presheaves. Sheafification is the process of replacing a presheaf \\(\mathcal P\\) by a sheaf \\(\mathcal P^+\\) with the same local germs. It is universal among maps from \\(\mathcal P\\) to sheaves.

The structure sheaf on \\(\operatorname{Spec}A\\) can be described in two compatible ways:

1. specify sections on basic opens \\(D(f)\\) by \\(\mathcal O(D(f))=A\_f\\), then glue;
2. define sections over arbitrary opens as locally representable fractions.

The first viewpoint is computational. The second viewpoint explains why the result is genuinely a sheaf.

## Ringed and locally ringed spaces

A ringed space is a pair \\((X,\mathcal O\_X)\\), where \\(X\\) is a topological space and \\(\mathcal O\_X\\) is a sheaf of rings. A locally ringed space is a ringed space whose stalks \\(\mathcal O\_{X,x}\\) are local rings.

This local condition is not decorative. It identifies which functions vanish at a point: in a local ring, the unique maximal ideal consists of the functions that fail to be invertible near that point.

## The affine target

For an affine scheme \\(X=\operatorname{Spec}A\\), the stalk at a prime \\(\mathfrak p\\) will be

$$
\mathcal O_{X,\mathfrak p}\cong A_{\mathfrak p}.
$$

Because \\(A\_{\mathfrak p}\\) is local, \\(\operatorname{Spec}A\\) with its structure sheaf is a locally ringed space.

<div class="rt-aside" markdown="1">
<span class="rt-env-title">Why this matters</span>

The topological space \\(\operatorname{Spec}A\\) alone does not recover \\(A\\). The structure sheaf is what remembers the algebra of functions. The slogan "a ring is a space" is incomplete; the correct object is a space together with its sheaf of rings.
</div>

<nav class="rt-nav">
  <a href="/articles/rt-03-spectrum-zariski-topology/"><span>Previous</span>Spectrum and Zariski Topology</a>
  <a class="rt-next" href="/articles/rt-05-structure-sheaf-affine-schemes/"><span>Next</span>Structure Sheaf and Affine Schemes</a>
</nav>

</article>
