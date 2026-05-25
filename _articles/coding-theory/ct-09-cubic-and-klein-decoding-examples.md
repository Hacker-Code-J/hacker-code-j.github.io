---
title: "Coding Theory 09: Cubic and Klein Decoding Examples"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: cubic curve, Klein quartic, finite fields, syndrome matrices
short: "The worked decoding examples from Chapter 3 made explicit."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-09" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 09</p>

# Cubic and Klein decoding examples

<p class="ct-deck">The examples in Chapter 3 show how abstract divisor spaces become concrete finite-field matrices.</p>
</header>

Chapter 3 works out two decoding examples: a smooth plane cubic and the Klein quartic. The point of these examples is not the final numerical word alone. The point is the chain

$$
\text{curve}\to \text{rational points}\to L(aP_0)\to \text{syndrome table}\to \text{locator}\to e.
$$

## The cubic curve

Consider the plane cubic

$$
X:x^3+y^3+z^3=0.
$$

In characteristic different from $$3$$ it is smooth, hence has genus $$1$$. The computation uses small extensions of $$\mathbb F_2$$ and lists the rational points explicitly. With a chosen point $$P_0$$ and divisor $$G=aP_0$$, the dual code $$C_\Omega(D,G)$$ has length equal to the number of selected rational points away from $$P_0$$.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: basis from pole orders</span>

Near $$P_0=(0:1:1)$$, functions such as

$$
1,\quad {x\over y+z},\quad {y\over y+z},\quad {x^2\over (y+z)^2},\quad {xy\over (y+z)^2},\quad {x^3\over (y+z)^3}
$$

have controlled pole orders at $$P_0$$. They form the rows of the evaluation matrix for the dual parity checks.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: why SV needs a larger divisor</span>

A code with divisor $$5P_0$$ has designed-distance bound large enough to suggest correction of two errors, but the SV auxiliary spaces cannot be chosen large enough inside the required product constraints. With $$6P_0$$ the locator space $$L(3P_0)$$ works. This is the genus-loss phenomenon made concrete.
</div>

## Duursma on the cubic

For the same cubic, Duursma can decode at $$5P_0$$ where SV is too restrictive. The unknown syndrome table has one missing high-order entry. The vote fills it, and then a locator such as

$$
\Theta=1+{y\over y+z}
$$

vanishes on a set containing the error locations. The final error vector is obtained by solving a small linear system using the known syndromes.

## The Klein quartic

The Klein quartic is

$$
X:x^3y+y^3z+xz^3=0.
$$

It is a smooth plane quartic in characteristic not $$7$$, hence has genus $$3$$. The computation works over $$\mathbb F_{16}$$, lists points, and uses the example to show a nontrivial majority vote.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: genus three creates a larger table</span>

Because the genus is $$3$$, the decoding table has more missing entries than in the elliptic cubic case. Several candidate rows and columns appear before a true locator is visible. Majority voting is not decorative here; it is the mechanism that recovers additional syndromes.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: finite-field labels are coordinates, not notation noise</span>

The source labels elements of $$\mathbb F_{16}$$ by integers through a polynomial basis. This makes point lists and matrices compact. To reconstruct the computations, one must translate each label back into an element of $$\mathbb F_2[x]/(x^4+x^3+1)$$ before doing arithmetic.
</div>

## What the examples teach

The worked examples should be read as templates. First compute rational points. Second build bases of Riemann-Roch spaces. Third evaluate basis functions to get syndrome matrices. Fourth use locators and voting. Fifth solve for error values. Every later surface-code discussion lacks an equally general decoding template, which is why Chapter 6 ends with decoding as an open problem.

<nav class="ct-nav">
  <a href="/articles/ct-08-duursma-majority-voting/"><span>Previous</span>Duursma Voting</a>
  <a class="ct-next" href="/articles/ct-10-sheaves-line-bundles-and-twists/"><span>Next</span>Sheaves and Twists</a>
</nav>

</article>
