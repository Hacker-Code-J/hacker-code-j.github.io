---
title: "Coding Theory 10: Sheaves, Line Bundles, and Twists"
layout: page
categories: Mathematics
tags: [coding-theory, algebraic-geometric-codes]
topics: sheaves, locally free modules, coherent sheaves, O(n)
short: "The scheme-theoretic language introduced in Chapter 4.1."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include coding_theory_article_style.html %}

<article class="ct-note ct-note-10" markdown="1">

<header class="ct-note-head" markdown="1">
<p class="ct-series">Coding theory / 10</p>

# Sheaves, line bundles, and twists

<p class="ct-deck">Higher-dimensional AG codes require replacing function spaces on curves by global sections of invertible sheaves.</p>
</header>

A sheaf of $$\mathcal O_X$$-modules on a ringed space $$(X,\mathcal O_X)$$ assigns to each open set $$U$$ an $$\mathcal O_X(U)$$-module compatibly with restrictions. Locally free sheaves are sheaf-theoretic vector bundles. An invertible sheaf is locally free of rank $$1$$.

The isomorphism classes of invertible sheaves form the Picard group $$\operatorname{Pic}(X)$$ under tensor product.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 1: free sheaf on affine space</span>

On $$X=\operatorname{Spec} A$$, an $$A$$-module $$M$$ gives a sheaf $$\widetilde M$$. If $$M=A^r$$, then $$\widetilde M\simeq\mathcal O_X^r$$. This is the local model for a rank $$r$$ vector bundle.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 2: an invertible sheaf is locally trivial, not globally trivial</span>

On projective space, $$\mathcal O(1)$$ is locally isomorphic to $$\mathcal O$$ but globally carries the hyperplane class. Its sections are linear forms. This distinction between local triviality and global geometry is exactly what line bundles encode.
</div>

## Coherent and quasi-coherent sheaves

A sheaf is quasi-coherent if it locally comes from modules over affine coordinate rings. It is coherent if those modules can be chosen finitely generated. These definitions matter because global section spaces of coherent sheaves over projective schemes are finite-dimensional, so they can serve as code message spaces.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 3: ideal sheaf of a closed subscheme</span>

If $$Y\hookrightarrow X$$ is a closed immersion, the kernel of $$\mathcal O_X\to i_*\mathcal O_Y$$ is an ideal sheaf. On a noetherian scheme it is coherent. Such sheaves record vanishing conditions geometrically.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 4: quotient sheaves create embedded geometry</span>

On $$\mathbb A^2=\operatorname{Spec}K[x,y]$$, the quotient $$K[x,y]/(y-x^2)$$ gives the parabola. The associated sheaf is the structure sheaf of that closed subscheme. This is the sheaf version of imposing equations.
</div>

## Twisted sheaves

For $$X=\operatorname{Proj} S$$, the graded shift $$S(n)$$ defines $$\mathcal O_X(n)$$. If $$\mathcal F$$ is a sheaf, then $$\mathcal F(n)=\mathcal F\otimes\mathcal O_X(n)$$. Twists are the projective analogue of changing degree bounds.

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 5: sections of $$\mathcal O_{\mathbb P^r}(d)$$</span>

The global sections of $$\mathcal O_{\mathbb P^r}(d)$$ are homogeneous degree $$d$$ polynomials in $$r+1$$ variables. Evaluating them at rational points gives projective Reed-Muller type codes.
</div>

<div class="ct-example" markdown="1">
<span class="ct-env-title">Example 6: negative twists have no global polynomial sections</span>

On $$\mathbb P^r$$, $$H^0(\mathbb P^r,\mathcal O(-1))=0$$. Negative twists represent pole or dual behavior rather than ordinary homogeneous polynomials.
</div>

<nav class="ct-nav">
  <a href="/articles/ct-09-cubic-and-klein-decoding-examples/"><span>Previous</span>Worked Decoding</a>
  <a class="ct-next" href="/articles/ct-11-divisors-picard-and-variety-codes/"><span>Next</span>Divisors and Variety Codes</a>
</nav>

</article>
