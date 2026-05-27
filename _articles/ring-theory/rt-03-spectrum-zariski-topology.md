---
title: "Ring Theory 03: Spectrum and Zariski Topology"
layout: page
categories: Mathematics
tags: [ring-theory, spectrum, zariski-topology]
topics: Spec A, V(I), D(f), closed sets, basic opens, functoriality
short: "The topological space attached to a commutative ring."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include ring_theory_article_style.html %}

<article class="rt-note rt-note-03" markdown="1">

<header class="rt-note-head" markdown="1">
<p class="rt-series">Ring theory / 03</p>

# Spectrum and Zariski topology

<p class="rt-deck">The spectrum of a ring is a topological space whose closed sets are defined by vanishing of ideals. Its topology is coarse, algebraic, and built to make localization visible.</p>
</header>

This article constructs \\(\operatorname{Spec}A\\), the sets \\(V(I)\\), the Zariski topology, basic opens \\(D(f)\\), and the quotient-closed-subspace correspondence. It also keeps the elementary topology definitions explicit enough to explain why the construction really produces a topology.

## Topological preliminaries

A topology on a set \\(X\\) is a collection \\(\mathcal T\\) of subsets called open sets such that

$$
\emptyset,X\in\mathcal T,
$$

arbitrary unions of open sets are open, and finite intersections of open sets are open. A subset is closed if its complement is open. A map \\(f:X\to Y\\) is continuous if \\(f^{-1}(V)\\) is open in \\(X\\) for every open \\(V\subseteq Y\\).

If \\(Y\subseteq X\\), the subspace topology on \\(Y\\) has open sets \\(U\cap Y\\), where \\(U\\) is open in \\(X\\). Equivalently, the closed subsets of \\(Y\\) are \\(C\cap Y\\), where \\(C\\) is closed in \\(X\\).

This last fact is exactly what appears later in the theorem

$$
\operatorname{Spec}(A/I)\cong V(I)
$$

with \\(V(I)\\) carrying the subspace topology.

## The spectrum

The spectrum of a commutative ring \\(A\\) is

$$
\operatorname{Spec}A=\{\mathfrak p\subset A:\mathfrak p\text{ is a prime ideal}\}.
$$

This is only a set so far. Its points are not ordinary elements of \\(A\\); they are prime ideals.

<div class="rt-example" markdown="1">
<span class="rt-env-title">Example: fields and polynomial rings</span>

If \\(k\\) is a field, then \\(\operatorname{Spec}k=\{(0)\}\\). If \\(k\\) is algebraically closed, then

$$
\operatorname{Spec}k[x]=\{(0)\}\cup\{(x-a):a\in k\}.
$$

The ideals \\((x-a)\\) are closed points. The ideal \\((0)\\) is a generic point whose closure is all of \\(\operatorname{Spec}k[x]\\).
</div>

<div class="rt-example" markdown="1">
<span class="rt-env-title">Example: \\(\operatorname{Spec}\mathbb Z\\)</span>

The prime ideals of \\(\mathbb Z\\) are \\((0)\\) and \\((p)\\) for rational primes \\(p\\). Thus

$$
\operatorname{Spec}\mathbb Z=\{(0)\}\cup\{(p):p\text{ prime}\}.
$$

The point \\((0)\\) is generic; every nonempty open subset contains it. The closed points are the arithmetic primes.
</div>

## Closed sets \\(V(I)\\)

For an ideal \\(I\subseteq A\\), define

$$
V(I)=\{\mathfrak p\in\operatorname{Spec}A:I\subseteq\mathfrak p\}.
$$

Think of \\(V(I)\\) as the common zero locus of all functions in \\(I\\). The condition \\(f\in\mathfrak p\\) means that \\(f\\) vanishes at the prime point \\(\mathfrak p\\).

More precisely, each \\(a\in A\\) has a residue value at \\(\mathfrak p\\),

$$
a(\mathfrak p)\in\kappa(\mathfrak p)=\operatorname{Frac}(A/\mathfrak p).
$$

Then

$$
a(\mathfrak p)=0
\quad\Longleftrightarrow\quad
a\in\mathfrak p.
$$

Thus \\(V(I)\\) is exactly the set of prime points at which every \\(a\in I\\) has zero residue value, and

$$
D(f)=\{\mathfrak p:f(\mathfrak p)\ne0\}.
$$

This is a pointwise description, but it is not yet the structure sheaf. The values lie in varying fields \\(\kappa(\mathfrak p)\\), and pointwise residue values alone do not encode restrictions, local fractions, gluing, or nilpotent functions.

The basic identities are

$$
V(0)=\operatorname{Spec}A,\qquad V(A)=\emptyset,
$$

$$
V(I)\cup V(J)=V(IJ)=V(I\cap J),
$$

and

$$
\bigcap_\alpha V(I_\alpha)=V\left(\sum_\alpha I_\alpha\right).
$$

These identities show that the sets \\(V(I)\\) satisfy the closed-set axioms: arbitrary intersections and finite unions of closed sets are closed.

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof of the identities</span>

Every prime ideal contains \\(0\\), and no proper prime ideal contains \\(A\\), so \\(V(0)=\operatorname{Spec}A\\) and \\(V(A)=\emptyset\\).

If \\(\mathfrak p\\) contains \\(I\\) or \\(J\\), then it contains \\(IJ\\). Conversely, suppose \\(IJ\subseteq\mathfrak p\\) and \\(\mathfrak p\\) contains neither \\(I\\) nor \\(J\\). Choose \\(a\in I\setminus\mathfrak p\\) and \\(b\in J\setminus\mathfrak p\\). Then \\(ab\in IJ\subseteq\mathfrak p\\), contradicting primality.

The equality \\(V(IJ)=V(I\cap J)\\) follows because \\(IJ\subseteq I\cap J\\), hence \\(V(I\cap J)\subseteq V(IJ)\\), while \\(I\subseteq\mathfrak p\\) or \\(J\subseteq\mathfrak p\\) implies \\(I\cap J\subseteq\mathfrak p\\).

Finally, \\(\mathfrak p\in\bigcap\_\alpha V(I\_\alpha)\\) exactly when every \\(I\_\alpha\subseteq\mathfrak p\\), equivalently when the ideal \\(\sum\_\alpha I\_\alpha\\) is contained in \\(\mathfrak p\\).
</div>

## The Zariski topology

The Zariski topology on \\(\operatorname{Spec}A\\) is the topology whose closed sets are exactly the sets \\(V(I)\\). It is usually much coarser than metric topologies. On \\(\operatorname{Spec}k[x]\\), for example, nonempty open sets are large: they contain the generic point and all but finitely many closed points when \\(k\\) is algebraically closed.

The closure of a point \\(\mathfrak p\\) is

$$
\overline{\{\mathfrak p\}}=V(\mathfrak p).
$$

Thus \\(\mathfrak p\\) specializes to every prime containing it. Closed points are exactly maximal ideals.

## Distinguished open subsets

For \\(f\in A\\), define

$$
D(f)=\{\mathfrak p\in\operatorname{Spec}A:f\notin\mathfrak p\}.
$$

Since

$$
D(f)=\operatorname{Spec}A\setminus V((f)),
$$

\\(D(f)\\) is open. These are the distinguished or basic open subsets.

They satisfy

$$
D(f)\cap D(g)=D(fg),
$$

because a prime ideal fails to contain \\(fg\\) exactly when it fails to contain both \\(f\\) and \\(g\\).

The sets \\(D(f)\\) form a basis for the Zariski topology. Indeed,

$$
\operatorname{Spec}A\setminus V(I)
=
\bigcup_{f\in I}D(f).
$$

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Basis proof</span>

Every open subset is the complement of some closed set \\(V(I)\\). A prime \\(\mathfrak p\\) lies in \\(\operatorname{Spec}A\setminus V(I)\\) exactly when \\(I\not\subseteq\mathfrak p\\), which is equivalent to the existence of \\(f\in I\\) with \\(f\notin\mathfrak p\\). This is exactly the displayed union. Since \\(D(f)\cap D(g)=D(fg)\\), finite intersections of basis elements are again basis elements.
</div>

## The first algebra-geometry dictionary

| Algebra | Geometry |
|---|---|
| Prime ideal \\(\mathfrak p\\) | Point of \\(\operatorname{Spec}A\\) |
| Maximal ideal \\(\mathfrak m\\) | Closed point |
| Ideal \\(I\\) | Equations |
| \\(V(I)\\) | Closed set where equations vanish |
| \\(D(f)\\) | Open set where \\(f\\) is nonzero |
| \\(A\_f\\) | Functions on \\(D(f)\\) |
| \\(A/I\\) | Closed subscheme cut out by \\(I\\) |

## Quotients and closed subspaces

Let \\(\pi:A\to A/I\\) be the quotient map. Prime ideals of \\(A/I\\) correspond exactly to prime ideals of \\(A\\) that contain \\(I\\):

$$
\operatorname{Spec}(A/I)\longleftrightarrow V(I).
$$

The correspondence sends \\(\mathfrak q\subset A/I\\) to \\(\pi^{-1}(\mathfrak q)\\), and sends \\(\mathfrak p\supseteq I\\) to \\(\mathfrak p/I\\).

With the subspace topology on \\(V(I)\\), this correspondence is a homeomorphism:

$$
\operatorname{Spec}(A/I)\cong V(I).
$$

Topologically, quotienting by \\(I\\) means passing to the closed locus on which all elements of \\(I\\) vanish. Scheme-theoretically, the map \\(\operatorname{Spec}(A/I)\to\operatorname{Spec}A\\) is a closed immersion whose structure sheaf is obtained by quotienting the restricted structure sheaf by the ideal generated by \\(I\\).

<div class="rt-proof" markdown="1">
<span class="rt-env-title">Proof of the homeomorphism</span>

The quotient map \\(\pi:A\to A/I\\) sends a prime \\(\mathfrak q\subset A/I\\) to \\(\pi^{-1}(\mathfrak q)\\), a prime of \\(A\\) containing \\(I\\). Conversely, if \\(\mathfrak p\supseteq I\\) is prime in \\(A\\), then \\(\mathfrak p/I\\) is prime in \\(A/I\\), because \\((A/I)/(\mathfrak p/I)\cong A/\mathfrak p\\) is a domain. These constructions are inverse.

For topology, a closed set in \\(\operatorname{Spec}(A/I)\\) has the form \\(V\_{A/I}(J)\\), where \\(J=K/I\\) for some ideal \\(K\supseteq I\\). Under the above bijection it corresponds to \\(V\_A(K)\cap V\_A(I)\\), which is closed in the subspace \\(V\_A(I)\\). Conversely, every subspace closed set \\(V\_A(K)\cap V\_A(I)\\) corresponds to \\(V\_{A/I}((K+I)/I)\\). Hence the bijection is a homeomorphism.
</div>

<div class="rt-example" markdown="1">
<span class="rt-env-title">Example: the node-like crossing</span>

For \\(A=k[x,y]\\) and \\(I=(xy)\\),

$$
\operatorname{Spec}k[x,y]/(xy)\cong V(xy).
$$

The closed set is the union \\(V(x)\cup V(y)\\), the two coordinate axes. The minimal primes \\((x)\\) and \\((y)\\) are the generic points of the two components.
</div>

## Functoriality preview

If \\(\varphi:A\to B\\) is a unital ring homomorphism, then inverse image of primes defines

$$
\operatorname{Spec}B\to\operatorname{Spec}A,\qquad
\mathfrak q\mapsto\varphi^{-1}(\mathfrak q).
$$

This map is continuous because inverse images of basic opens are basic opens:

$$
(\operatorname{Spec}\varphi)^{-1}(D(f))=D(\varphi(f)).
$$

The full locally ringed-space morphism appears after the structure sheaf is built.

<nav class="rt-nav">
  <a href="/articles/rt-02-prime-maximal-localization/"><span>Previous</span>Prime Ideals and Localization</a>
  <a class="rt-next" href="/articles/rt-04-sheaves-and-stalks/"><span>Next</span>Sheaves and Stalks</a>
</nav>

</article>
