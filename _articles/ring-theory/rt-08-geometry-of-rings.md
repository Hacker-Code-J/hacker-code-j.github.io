---
title: "Ring Theory 08: Geometry of Rings"
layout: page
categories: Mathematics
tags: [ring-theory, algebraic-geometry, dimension]
topics: nilpotents, reduced rings, irreducibility, components, dimension, closed subschemes
short: "How ring-theoretic operations encode geometric features."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-08" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 08</p>

# Geometry of rings

<p class="rt-deck">Nilpotents, radicals, minimal primes, localizations, and quotient rings are not merely algebraic devices. They encode thickness, components, open restrictions, and closed subspaces.</p>
</header>

This article collects the geometric consequences of the algebra built so far. It uses Atiyah and Macdonald's treatment of radicals, localization, Noetherian rings, and dimension while keeping the algebra-geometry dictionary as the organizing principle.

## Reduced rings and nilpotent thickening

A ring \\(A\\) is reduced if it has no nonzero nilpotent elements. The nilradical is

$$
\sqrt{(0)}=\bigcap_{\mathfrak p\in\operatorname{Spec}A}\mathfrak p.
$$

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof</span>

If \\(a\\) is nilpotent and \\(\mathfrak p\\) is prime, then \\(a^N=0\in\mathfrak p\\) implies \\(a\in\mathfrak p\\), so every nilpotent lies in every prime ideal. Conversely, if \\(a\\) is not nilpotent, then the multiplicative set \\(S=\{1,a,a^2,\ldots\}\\) does not contain \\(0\\). Hence \\(S^{-1}A\\) is not the zero ring, so it has a maximal ideal \\(\mathfrak m\\). The contraction \\(\mathfrak p=\{x\in A:x/1\in\mathfrak m\}\\) is prime and is disjoint from \\(S\\), because every element of \\(S\\) becomes a unit in \\(S^{-1}A\\). In particular \\(a\notin\mathfrak p\\). Hence an element contained in every prime must be nilpotent.
</div>

The reduced quotient is

$$
A_{\operatorname{red}}=A/\sqrt{(0)}.
$$

The topological spaces \\(\operatorname{Spec}A\\) and \\(\operatorname{Spec}A\_{\operatorname{red}}\\) are canonically homeomorphic, but their structure sheaves differ if \\(A\\) has nilpotents. Thus schemes can carry infinitesimal structure invisible to the underlying set.

<div class="rt-example" markdown="1">
<span class="rt-env-title">Dual numbers</span>

For \\(A=k[\epsilon]/(\epsilon^2)\\), the only prime ideal is \\((\epsilon)\\). The space has one point, but the ring has a nonzero nilpotent element. This is a first-order thickening of a point.

The residue field at the unique point is \\(k\\), and the value of \\(\epsilon\\) in that residue field is zero. Therefore pointwise residue-field values do not determine functions on nonreduced schemes. The structure sheaf remembers the nilpotent direction that ordinary point-values forget.
</div>

## Irreducible components and minimal primes

A nonempty topological space is irreducible if it cannot be written as a union of two proper closed subsets. For a nonzero ring \\(A\\),

$$
\operatorname{Spec}A\text{ is irreducible}
\quad\Longleftrightarrow\quad
\sqrt{(0)}\text{ is prime}.
$$

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof sketch</span>

Let \\(\mathfrak n=\sqrt{(0)}\\). If \\(\mathfrak n\\) is prime and

$$
\operatorname{Spec}A=V(I)\cup V(J)=V(IJ),
$$

then \\(IJ\subseteq\mathfrak n\\). Since \\(\mathfrak n\\) is prime, either \\(I\subseteq\mathfrak n\\) or \\(J\subseteq\mathfrak n\\), so either \\(V(I)=\operatorname{Spec}A\\) or \\(V(J)=\operatorname{Spec}A\\). Thus the space is irreducible.

Conversely, if \\(\mathfrak n\\) is not prime, choose \\(a,b\notin\mathfrak n\\) with \\(ab\in\mathfrak n\\). Then

$$
\operatorname{Spec}A=V(ab)=V(a)\cup V(b),
$$

while \\(V(a)\\) and \\(V(b)\\) are proper closed subsets because \\(a\\) and \\(b\\) are not nilpotent. Hence \\(\operatorname{Spec}A\\) is reducible.
</div>

Minimal prime ideals correspond to irreducible components: for each minimal prime \\(\mathfrak p\\), the closed subset \\(V(\mathfrak p)\\) is an irreducible component, and every irreducible component arises this way. If \\(A\\) is Noetherian, there are only finitely many minimal primes. Reducedness is not required for the correspondence, but it makes the nilradical vanish and makes the component picture easier to read.

<div class="rt-example" markdown="1">
<span class="rt-env-title">Crossing axes</span>

Let

$$
A=k[x,y]/(xy).
$$

The minimal primes are \\((x)\\) and \\((y)\\). They correspond to the two axes. The maximal ideal \\((x,y)\\) is the intersection point.
</div>

## Quotients as closed subschemes

For an ideal \\(I\subset A\\), the quotient \\(A/I\\) defines a closed subscheme

$$
\operatorname{Spec}(A/I)\hookrightarrow\operatorname{Spec}A.
$$

As a topological space, its image is \\(V(I)\\). As a scheme, it also remembers the quotient sheaf

$$
\mathcal O_{\operatorname{Spec}(A/I)}
$$

and may include nilpotent thickening.

For example, \\(k[x]/(x)\\) and \\(k[x]/(x^2)\\) have the same underlying closed point in \\(\operatorname{Spec}k[x]\\), but the second is a nonreduced first-order thickening.

## Localization as open restriction

For \\(f\in A\\),

$$
\operatorname{Spec}A_f\cong D(f)\subseteq\operatorname{Spec}A.
$$

This is an open immersion. Algebraically, making \\(f\\) invertible removes all prime ideals containing \\(f\\). Geometrically, it restricts to the open set where \\(f\\) does not vanish.

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof sketch</span>

Prime ideals of \\(A\_f\\) correspond to prime ideals \\(\mathfrak p\subset A\\) disjoint from \\(\{1,f,f^2,\ldots\}\\). This disjointness is exactly the condition \\(f\notin\mathfrak p\\), so the image is \\(D(f)\\). The topology is compatible because a basic open \\(D\_{A\_f}(a/f^n)\\) corresponds to \\(D\_A(af)\subseteq D(f)\\), and these opens form bases on both sides. The structure sheaves agree on basic opens by the canonical localization isomorphisms \\((A\_f)\_{a/f^n}\cong A\_{af}\\).
</div>

<div class="rt-example" markdown="1">
<span class="rt-env-title">Removing the origin from the affine line</span>

For \\(A=k[x]\\), the open set \\(D(x)\\) has coordinate ring

$$
k[x]_x=k[x,x^{-1}].
$$

This is the algebraic punctured affine line.
</div>

## Dimension

The Krull dimension of \\(A\\) is the supremum of lengths \\(n\\) of chains of prime ideals

$$
\mathfrak p_0\subsetneq\mathfrak p_1\subsetneq\cdots\subsetneq\mathfrak p_n.
$$

It is also the dimension of \\(\operatorname{Spec}A\\). Atiyah and Macdonald develop this through Noetherian local rings, Hilbert functions, and regular local rings.

Examples:

$$
\dim k=0,\qquad
\dim k[x]=1,\qquad
\dim k[x_1,\ldots,x_n]=n,\qquad
\dim\mathbb Z=1.
$$

The local dimension at a prime \\(\mathfrak p\\) is reflected in the local ring \\(A\_{\mathfrak p}\\). For a closed point on an integral Noetherian affine curve, the local ring has dimension \\(1\\); at the generic point, the local ring is the function field and has dimension \\(0\\).

## Reduced versus irreducible versus integral

The conditions are distinct:

| Ring condition | Geometric meaning |
|---|---|
| Reduced | No nilpotent thickening |
| Irreducible spectrum | One generic component |
| Integral domain | Reduced and irreducible affine scheme |

The ring \\(k[x,y]/(xy)\\) is reduced but not a domain, so its spectrum is reducible. The ring \\(k[\epsilon]/(\epsilon^2)\\) is irreducible as a topological space but not reduced.

## Functions, closed points, and generic values

For \\(\mathfrak p\in\operatorname{Spec}A\\), the residue field is

$$
\kappa(\mathfrak p)=\operatorname{Frac}(A/\mathfrak p).
$$

An element \\(f\in A\\) has value at \\(\mathfrak p\\) in \\(\kappa(\mathfrak p)\\). Saying \\(f\\) vanishes at \\(\mathfrak p\\) means its image in \\(\kappa(\mathfrak p)\\) is zero, equivalently \\(f\in\mathfrak p\\).

This recovers the definition of \\(V(I)\\): the functions in \\(I\\) vanish at every point of \\(V(I)\\).

For maximal ideals, this specializes to familiar closed-point evaluation. If \\(A=\mathbb C[x]\\), then

$$
\mathbb C[x]/(x-\alpha)\cong\mathbb C,
$$

and \\(f((x-\alpha))=f(\alpha)\\). If \\(A=\mathbb Z\\), then \\(n((p))\\) is the residue class of \\(n\\) in \\(\mathbb F\_p\\).

The full spectrum also contains generic values. In \\(\operatorname{Spec}\mathbb C[x]\\), the generic point \\((0)\\) has residue field \\(\mathbb C(x)\\), so a polynomial has generic value as a rational function. In \\(\operatorname{Spec}\mathbb Z\\), the generic point \\((0)\\) has residue field \\(\mathbb Q\\). These generic values are what allow irreducible components and dense open behavior to be visible in the same space as the closed points.

<div class="rt-warning" markdown="1">
<span class="rt-env-title">Common confusion</span>

The set \\(V(I)\\) only sees \\(\sqrt I\\), but the closed subscheme \\(\operatorname{Spec}(A/I)\\) sees \\(I\\). Replacing \\(I\\) by \\(\sqrt I\\) discards nilpotent structure and can change coherent sheaves, tangent data, and multiplicities.
</div>

<nav class="rt-nav">
  <a href="/articles/rt-07-coherent-sheaves/"><span>Previous</span>Coherent Sheaves</a>
  <a class="rt-next" href="/articles/rt-09-morphisms-and-global-sections/"><span>Next</span>Morphisms and Global Sections</a>
</nav>

</article>
