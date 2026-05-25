---
title: "Coding Theory 08: Duursma Majority Voting"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: Duursma algorithm, H-order, syndrome table, majority voting
short: "How Chapter 3.3 extends SV decoding to the designed half-distance range."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-08" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 08</p>

# Duursma majority voting

<p class="ct-deck">Duursma improves SV decoding by filling unknown syndromes through a structured majority vote.</p>
</header>

SV decoding may fail before the theoretical half-distance radius because the required product syndromes are not all known. Duursma keeps a syndrome table and infers missing entries. In the notation of Chapter 3.3, the target range is $$\operatorname{wt}(e)\le t$$ with

$$
2t\le \deg G-2g+1,
$$

which is the designed half-distance condition for $$C_\Omega(D,G)$$. Fix a rational point $$Q$$ outside the support of $$D$$. For a divisor $$H$$ and a nonzero function $$\Theta$$, the $$H$$-order with respect to $$Q$$ is the smallest integer $$m$$ such that

$$
\Theta\in L(H+(m-\deg H)Q).
$$

If no such integer exists, the order is defined as $$+\infty$$. This order indexes bases and organizes the syndrome table.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: order on $$\mathbb P^1$$</span>

With $$Q=P_\infty$$ and $$H=0$$, the $$H$$-order of $$x^m$$ is $$m$$. Duursma order is therefore an extension of ordinary polynomial degree.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: elliptic pole-order gaps</span>

On an elliptic curve at $$O$$, there is no order-one function. A basis indexed by pole order jumps from $$0$$ to $$2$$ and $$3$$. This is one reason a table indexed by order is more flexible than a naive degree table.
</div>

## Order calculus

The $$H$$-order behaves like a pole-order degree. If $$\mu_H(\Theta)=r$$, then increasing the divisor from $$H$$ to $$K\ge H$$ shifts the order by the degree of $$K-H$$ away from $$Q$$. Products add orders:

$$
\mu_{H+H_0}(\Theta\Theta_0)=\mu_H(\Theta)+\mu_{H_0}(\Theta_0).
$$

This additivity is why the product table can be indexed by sums $$i+j$$.

<div class="ct-env" markdown="1">
<span class="ct-env-title">Syndrome completion lemma</span>

Assume all syndromes $$\phi\circ e$$ of order $$<s$$ are known. If one table entry of order $$s$$ becomes known, then every entry of order $$s$$ becomes known. Indeed every product of order $$s$$ differs from a scalar multiple of the chosen basis element by a lower-order combination.
</div>

## Syndrome table and candidates

Choose divisors $$A$$ and $$A_0$$ of degree $$t$$ and ordered bases $$\psi_i$$, $$\chi_j$$. The table entries are

$$
S_{ij}=\psi_i\chi_j\circ e.
$$

Entries with product order at most $$\deg G$$ are known from the received vector. Higher entries are unknown. A row candidate is a normalized combination of rows that vanishes against all currently known columns. A column candidate is defined symmetrically.

<div class="ct-env" markdown="1">
<span class="ct-env-title">Voting mechanism</span>

For a missing order $$s$$, a test entry $$S_{rr_0}$$ with $$r+r_0=s$$ has both a row candidate and a column candidate. Assuming the row candidate is a true locator gives one proposed value for the unknown syndrome of order $$s$$. Assuming the column candidate is true gives the same proposed value. Duursma proves that correct votes outnumber incorrect votes.
</div>

The majority theorem is the key point: if all syndromes of order $$<s$$ are known, $$s\ge 2g+2t$$, and no locator has yet been found from the known rows or columns, then the test entries of order $$s$$ vote, and the correct value wins by a positive margin. More precisely, in the notation of Chapter 3.3, correct votes exceed incorrect votes by at least

$$
s-2g-2t+1>0.
$$

This inequality is the reason the procedure is deterministic rather than heuristic. It lets the algorithm grow the known table until a locator appears.

<div class="ct-proof" markdown="1">
<span class="ct-env-title">Proof audit</span>

The table is safe because entries of product order at most $$\deg G$$ come from functions in $$L(G)$$, so their syndromes are computed from the received word. The completion lemma is triangular: once one order-$$s$$ entry is known, its product expansion determines the basis syndrome $$\phi_s\circ e$$ modulo already known lower-order terms, and then every other order-$$s$$ entry follows by linearity.

For majority voting, a test entry of order $$s$$ is correct whenever both the matching row and column orders contain true locators. If a test entry votes incorrectly, then neither of those two orders can contain a true locator; otherwise the candidate identity would force the true syndrome value. Propositions 3.5-3.7 in the PDF count these alternatives over all pairs $$r+r_0=s$$ and give the margin

$$
\#\{\text{correct votes}\}-\#\{\text{incorrect votes}\}\ge s-2g-2t+1.
$$

The hypothesis $$s\ge2g+2t$$ makes this margin positive.
</div>


<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: one unknown corner</span>

In the cubic example, the syndrome table has a single unknown entry of highest order. Since it is the only test entry, the majority vote is trivial: the unique vote must be correct. This illustrates the mechanism without showing its full force.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: Klein quartic shows real majority voting</span>

For the Klein quartic, the table has several unknown entries. Different row and column candidates generate competing votes. The algorithm uses the majority theorem, not trust in a single candidate, to choose the next syndrome value.
</div>

## Algorithm outline

Duursma decoding proceeds as follows under the range hypothesis $$\deg G\ge2t+2g-1$$.

1. Compute all syndromes of product order at most $$\deg G$$.
2. Search known rows and columns for an error locator.
3. If no locator appears, identify the next unknown order $$s$$.
4. Form test entries and collect votes for the missing syndrome.
5. Fill the syndrome value by majority and update all entries of that order.
6. Return to the locator search.
7. Once a locator is found, solve for error values as in SV decoding.

<nav class="ct-nav">
  <a href="/articles/ct-07-sv-decoding-algorithm/"><span>Previous</span>SV Decoding</a>
  <a class="ct-next" href="/articles/ct-09-cubic-and-klein-decoding-examples/"><span>Next</span>Worked Decoding Examples</a>
</nav>

</article>
