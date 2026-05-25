---
title: "Coding Theory 11: Divisors, Picard Groups, and Variety Codes"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: Weil divisors, line bundles, germ maps, variety codes
short: "Chapter 4.2-4.3: divisors and the H-construction of AG codes on varieties."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-11" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 11</p>

# Divisors, Picard groups, and variety codes

<p class="ct-deck">On higher-dimensional varieties, AG codes are built from global sections of line bundles and evaluated through fibers.</p>
</header>

On a normal variety, a prime divisor is an irreducible codimension-one subvariety. A Weil divisor is a finite integral combination of prime divisors. A rational function $$f$$ has a divisor $$(f)$$, and principal divisors define linear equivalence.

A locally principal divisor $$D$$ defines an invertible sheaf $$\mathcal L(D)$$. On smooth varieties, divisor classes and invertible sheaves match through the Picard group.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: hyperplanes on projective space</span>

On $$\mathbb P^r$$, a hyperplane $$H$$ defines $$\mathcal L(H)\simeq\mathcal O(1)$$. The divisor $$dH$$ corresponds to $$\mathcal O(d)$$, whose sections are degree $$d$$ homogeneous polynomials.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: principal divisors do not change the line bundle class</span>

If $$D_1-D_2=(f)$$, then multiplication by $$f$$ identifies $$\mathcal L(D_1)$$ and $$\mathcal L(D_2)$$. This is the higher-dimensional version of the curve Picard relation.
</div>

## Global sections and zero divisors

A nonzero section $$s\in H^0(X,\mathcal L(D))$$ determines an effective divisor of zeros $$Z(s)$$ linearly equivalent to $$D$$. The code distance problem becomes a question about how many rational evaluation points can lie on zero divisors in a linear system.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: plane curves as zero divisors</span>

For $$X=\mathbb P^2$$ and $$\mathcal L=\mathcal O(d)$$, a section is a homogeneous form of degree $$d$$. Its zero divisor is a plane curve of degree $$d$$. The number of rational evaluation points on that curve controls the weight of the corresponding codeword.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: product surfaces</span>

On $$\mathbb P^1\times\mathbb P^1$$, a section of $$\mathcal O(a,b)$$ has a zero divisor of bidegree $$(a,b)$$. It can contain vertical and horizontal fibers, which strongly affects the number of rational zeros.
</div>

## Germ-map construction

Let $$X/\mathbb F_q$$ be projective, $$\mathcal L$$ an invertible sheaf, and $$P_1,\ldots,P_n\in X(\mathbb F_q)$$. For each point, choose a trivialization of the fiber $$\mathcal L_{P_i}\simeq\mathbb F_q$$. Evaluation of global sections gives

$$
\alpha:H^0(X,\mathcal L)\to\mathbb F_q^n.
$$

The code is $$C(X,P,\mathcal L)=\operatorname{im}\alpha$$. Different trivializations multiply coordinates by nonzero scalars, so they produce monomially equivalent codes.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 5: curve codes recovered</span>

If $$X$$ is a curve and $$\mathcal L=\mathcal L(G)$$, then $$H^0(X,\mathcal L)=L(G)$$. The germ map is the evaluation map defining $$C_L(D,G)$$.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 6: projective Reed-Muller codes</span>

Taking $$X=\mathbb P^r$$ and $$\mathcal L=\mathcal O(d)$$ gives codes from evaluating homogeneous degree $$d$$ forms at rational projective points. This is a basic higher-dimensional AG code before surface-specific geometry enters.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-10-sheaves-line-bundles-and-twists/"><span>Previous</span>Sheaves and Twists</a>
  <a class="ct-next" href="/articles/ct-12-surface-geometry-for-codes/"><span>Next</span>Surface Geometry</a>
</nav>

</article>
