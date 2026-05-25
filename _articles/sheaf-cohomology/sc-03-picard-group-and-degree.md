---
title: "Sheaf Cohomology 03: Picard Group and Degree"
layout: page
categories: Mathematics
tags: [sheaf-cohomology, picard-group, degree]
topics: Picard group, O(n), CP1, global sections, degree map
short: "Line bundles up to isomorphism, their tensor group law, and the degree invariant."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-03" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Sheaf cohomology / 03</p>

# Picard group and degree

<p class="sc-deck">The Picard group remembers holomorphic line bundles under tensor product; degree is its first numerical shadow.</p>
</header>

Sections 6.3 and 6.6-6.8 of the PDF identify holomorphic line bundles with multiplicative Cech cohomology and compute the basic model $$\mathcal O(n)$$ on $$\mathbb{CP}^1$$.

## Picard group

The Picard group of a complex manifold $$X$$ is

$$
\operatorname{Pic}(X)=
\{\text{holomorphic line bundles on }X\}/\cong
$$

with group law induced by tensor product. In transition functions,

$$
[g_{ij}]+[h_{ij}]=[g_{ij}h_{ij}],\qquad
-[g_{ij}]=[g_{ij}^{-1}].
$$

The classification by cocycles gives

$$
\operatorname{Pic}(X)\cong H^1(X,\mathcal O_X^*).
$$

This is not a slogan. It says exactly that a line bundle is a 1-cocycle with values in invertible holomorphic functions, modulo gauge changes.

## Degree on compact Riemann surfaces

If $$L\cong\mathcal O(D)$$, define

$$
\deg L=\deg D.
$$

This is well-defined because principal divisors have degree zero. It satisfies

$$
\deg(L\otimes M)=\deg L+\deg M,
\qquad
\deg(L^\vee)=-\deg L.
$$

<div class="sc-proof" markdown="1">
<span class="sc-env-title">Why principal divisors have degree zero</span>

For a meromorphic function $$f:X\to\mathbb{CP}^1$$ on a compact Riemann surface, the number of preimages of a generic value, counted with multiplicity, is constant. Counting preimages of $$0$$ and $$\infty$$ gives the same number:

$$
\sum_{f(p)=0}\operatorname{ord}_p(f)=
\sum_{f(p)=\infty}-\operatorname{ord}_p(f).
$$

Therefore $$\deg((f))=0$$.
</div>

## The bundles $$\mathcal O(n)$$ on $$\mathbb{CP}^1$$

Let $$\mathcal O(1)$$ be the hyperplane bundle. Its powers are

$$
\mathcal O(n)=\mathcal O(1)^{\otimes n}.
$$

On the two standard charts $$U_0,U_\infty$$, the section convention of Article 01 gives compatibility by $$z^{-n}$$ on $$\mathbb C^*$$; the reciprocal frame convention uses $$z^n$$. The global sections are homogeneous polynomials of degree $$n$$:

$$
a_0Z_0^n+a_1Z_0^{n-1}Z_1+\cdots+a_n Z_1^n.
$$

Thus

$$
h^0(\mathbb{CP}^1,\mathcal O(n))=
\begin{cases}
n+1,& n\ge0,\\
0,& n<0.
\end{cases}
$$

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 1: $$\mathcal O(2)$$ and quadratic sections</span>

A section of $$\mathcal O(2)$$ is a quadratic homogeneous form

$$
aZ_0^2+bZ_0Z_1+cZ_1^2.
$$

On $$U_0$$ this becomes $$a+bz+cz^2$$. Its zero divisor has degree two, counting multiplicity. For instance $$Z_1^2$$ has divisor $$2[0]$$, while $$Z_0Z_1$$ has divisor $$[0]+[\infty]$$.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 2: no global sections of $$\mathcal O(-1)$$</span>

A holomorphic section of $$\mathcal O(-1)$$ would have an effective zero divisor whose degree is $$\deg\mathcal O(-1)=-1$$. Effective divisors have nonnegative degree, so no nonzero holomorphic section can exist. Therefore $$H^0(\mathbb{CP}^1,\mathcal O(-1))=0$$.
</div>

## Degree does not classify everything

On $$\mathbb{CP}^1$$, degree classifies line bundles:

$$
\operatorname{Pic}(\mathbb{CP}^1)\cong\mathbb Z,
\qquad
\mathcal O(n)\leftrightarrow n.
$$

On higher genus Riemann surfaces, degree is not enough. The kernel of the degree map,

$$
\operatorname{Pic}^0(X)=\ker(\deg:\operatorname{Pic}(X)\to\mathbb Z),
$$

is the Jacobian variety. It contains many nontrivial degree-zero bundles.

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 3: degree zero on an elliptic curve</span>

Let $$E$$ be an elliptic curve. The line bundle $$\mathcal O([p]-[0])$$ has degree zero. It is trivial precisely when $$[p]-[0]$$ is a principal divisor, which happens exactly for $$p=0$$ in the elliptic curve group law. Varying $$p$$ gives the standard isomorphism $$E\cong\operatorname{Pic}^0(E)$$, $$p\mapsto\mathcal O([p]-[0])$$; the calculation above identifies its kernel.
</div>

<div class="sc-example" markdown="1">
<span class="sc-env-title">Example 4: canonical degree</span>

The canonical bundle $$K_X$$ has degree

$$
\deg K_X=2g-2.
$$

For $$\mathbb{CP}^1$$, this gives $$\deg K=-2$$. For an elliptic curve, $$\deg K=0$$ and in fact $$K_E$$ is trivial because $$dz$$ descends from $$\mathbb C$$ to $$E=\mathbb C/\Lambda$$.
</div>

## The Picard group as a refinement of degree

Degree is numerical, while the Picard group is geometric. A divisor first gives a line bundle, then degree forgets most of that line bundle. Riemann-Roch depends on both layers: degree gives the leading dimension count, and the special contribution comes from the residual line bundle $$K-D$$.

<nav class="sc-nav">
  <a href="/articles/sc-02-divisors-and-associated-line-bundles/"><span>Previous</span>Divisors</a>
  <a class="sc-next" href="/articles/sc-04-sheaves-presheaves-and-locality/"><span>Next</span>Sheaves, Presheaves, and Locality</a>
</nav>

</article>
