---
title: "Sheaf Cohomology 05: Morphisms, Stalks, and Exactness"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, stalks, exact-sequences]
topics: morphisms, kernels, images, stalks, germs, exactness
short: "Why exactness of sheaves is a local condition, and why global sections need not preserve it."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-05" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 05</p>

# Morphisms, stalks, and exactness

<p class="sc-deck">Sheaf exactness is tested on germs, not on global sections. This distinction is the source of cohomology.</p>
</header>

Sections 7.3-7.5 of the PDF introduce morphisms, exact sequences, stalks, and examples. The main lesson is that sheaves are local objects, while global sections are not an exact functor.

## Morphisms

A morphism of sheaves $$\varphi:\mathcal F\to\mathcal G$$ is a compatible family of maps

$$
\varphi_U:\mathcal F(U)\to\mathcal G(U)
$$

for all open $$U\subset X$$, satisfying

$$
\rho^U_V\circ\varphi_U=\varphi_V\circ\rho^U_V
\quad(V\subset U).
$$

Kernels are computed sectionwise:

$$
(\ker\varphi)(U)=\ker(\varphi_U).
$$

Images require care: the sectionwise image presheaf may fail to be a sheaf, so the image sheaf is the sheafification of that presheaf.

## Stalks and germs

The stalk of $$\mathcal F$$ at $$p\in X$$ is the direct limit

$$
\mathcal F_p=\varinjlim_{p\in U}\mathcal F(U).
$$

An element of $$\mathcal F_p$$ is a germ: two local sections represent the same germ if they agree on some smaller neighborhood of $$p$$.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: holomorphic function germs</span>

The stalk $$\mathcal O_{\mathbb C,0}$$ consists of convergent power series

$$
a_0+a_1z+a_2z^2+\cdots
$$

near $$0$$. A holomorphic function on a disk and its restriction to a smaller disk define the same germ. The maximal ideal consists of germs vanishing at $$0$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: skyscraper sheaf</span>

Fix $$p\in X$$ and an abelian group $$A$$. The skyscraper sheaf $$A_p$$ is defined by

$$
A_p(U)=
\begin{cases}
A,& p\in U,\\
0,& p\notin U.
\end{cases}
$$

Its stalk at $$p$$ is $$A$$, while every other stalk is $$0$$. It models data concentrated at a single point, such as the quotient $$\mathcal O_p/\mathfrak m_p$$.
</div>

## Exactness is stalkwise

A sequence of sheaves

$$
\mathcal F'\xrightarrow{\alpha}\mathcal F\xrightarrow{\beta}\mathcal F''
$$

is exact if for every point $$p$$,

$$
\operatorname{im}(\alpha_p)=\ker(\beta_p)
$$

inside the stalk $$\mathcal F_p$$. This is equivalent to exactness after restricting sufficiently near every point.

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Why stalks are the correct test</span>

Suppose a local section $$s\in\mathcal F(U)$$ maps to zero in $$\mathcal F''(U)$$. Exactness should mean that near each point $$p\in U$$, the germ $$s_p$$ is locally the image of a section of $$\mathcal F'$$. There may be no single global preimage on all of $$U$$. Stalks encode exactly this local lifting condition.
</div>

## Global sections are only left exact

The functor $$\Gamma(X,-)$$ sends a sheaf to its group of global sections. From a short exact sequence

$$
0\to\mathcal F'\to\mathcal F\to\mathcal F''\to0
$$

one always gets an exact sequence

$$
0\to\Gamma(X,\mathcal F')\to\Gamma(X,\mathcal F)\to\Gamma(X,\mathcal F'').
$$

Surjectivity on global sections can fail. Sheaf cohomology measures this failure.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: the exponential map on $$\mathbb C^*$$</span>

The morphism

$$
\mathcal O_{\mathbb C^*}\xrightarrow{\exp(2\pi i\,\cdot)}\mathcal O_{\mathbb C^*}^*
$$

is locally surjective: every nowhere-zero holomorphic function has a local normalized logarithm. But the global section $$z\in\mathcal O^*(\mathbb C^*)$$ has no global normalized logarithm, equivalently no global preimage under $$f\mapsto\exp(2\pi i f)$$. Thus local surjectivity does not imply global surjectivity.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: an effective divisor exact sequence</span>

For a point $$p$$ on a Riemann surface there is a short exact sequence

$$
0\to\mathcal O(-p)\to\mathcal O\to\mathbb C_p\to0,
$$

where the last map evaluates a germ at $$p$$. On global sections over a compact connected Riemann surface, constants map onto $$\mathbb C$$, so this example is globally exact. But replacing $$\mathcal O$$ by a more restrictive line bundle can make the evaluation map fail to be surjective, and the obstruction appears in $$H^1$$.
</div>

## Constant sheaf and constant presheaf

The constant sheaf $$\underline A$$ consists of locally constant $$A$$-valued functions. It is not the same as the presheaf assigning $$A$$ to every nonempty open set. On a disconnected open set $$U=U_1\sqcup U_2$$, a locally constant section can choose independent values on the two components, so

$$
\underline A(U)\cong A\times A.
$$

This distinction is a basic example of sheafification: one repairs a presheaf by adding the local gluing behavior it lacks.

<nav class="sc-nav">
  <a href="/articles/sc-04-sheaves-presheaves-and-locality/"><span>Previous</span>Sheaves and Locality</a>
  <a class="sc-next" href="/articles/sc-06-cech-cohomology/"><span>Next</span>Cech Cohomology</a>
</nav>

</article>
