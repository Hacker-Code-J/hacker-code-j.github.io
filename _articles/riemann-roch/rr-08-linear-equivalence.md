---
title: "Riemann-Roch 08: Linear Equivalence"
layout: page
categories: Mathematics
tags: [riemann-roch, linear-equivalence, jacobian]
topics: principal divisors, Abel-Jacobi, Jacobian
short: "Why divisor classes matter more than written divisors."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include riemann_roch_article_style.html %}

<article class="rr-note rr-note-08" markdown="1">

<header class="rr-note-head" markdown="1">
<p class="rr-series">Riemann-Roch notes / VIII</p>

# Linear equivalence is not bookkeeping

<p class="rr-deck">The divisor written on the page is only a representative. The dimension depends on its linear equivalence class.</p>
</header>

Divisors should not be treated as isolated formal sums. Meromorphic functions move zeros and poles, and Riemann-Roch respects that motion.

Two divisors are linearly equivalent if

$$
D-E=(f)
$$

for some nonzero meromorphic function $$f$$. We write $$D\sim E$$.

## Why the equivalence matters

If $$D-E=(f)$$, multiplication by $$f$$ gives

$$
L(D)\longrightarrow L(E),
\qquad h\longmapsto fh.
$$

This is an isomorphism. Consequently

$$
D\sim E \quad\Rightarrow\quad \ell(D)=\ell(E).
$$

So Riemann-Roch is naturally a theorem about divisor classes.

## Degree zero classes

Principal divisors have degree zero, so degree is preserved under linear equivalence. The degree zero divisor classes form $$\operatorname{Pic}^0(X)$$. Analytically this is the Jacobian,

$$
\operatorname{Pic}^0(X)\cong \operatorname{Jac}(X).
$$

For genus one the Jacobian is the elliptic curve itself. For genus $$g$$ it is a complex torus of dimension $$g$$.

<div class="rr-example" markdown="1">
<span class="rr-env-title">Elliptic curve intuition</span>

On an elliptic curve with origin $$O$$, a degree zero divisor $$P-Q$$ is principal only when $$P=Q$$ in the group law. More generally, a degree zero divisor is principal precisely when its Abel-Jacobi sum vanishes.
</div>

This is why degree alone is insufficient in positive genus. Degree tells how large a divisor is; the Jacobian records where its degree zero part lies.

<div class="rr-example" markdown="1">
<span class="rr-env-title">Two ways linear equivalence becomes visible</span>

On $$\mathbb P^1$$,

$$
\operatorname{div}\!\left(\frac{z-a}{z-b}\right)=[a]-[b].
$$

Thus any two points on the projective line are linearly equivalent. This is the concrete reason degree alone classifies divisor classes on $$\mathbb P^1$$.

On $$E:y^2=x^3-x$$, choose $$a\in\mathbb C$$ away from the branch values and let $$P=(a,\sqrt{a^3-a})$$. Then

$$
(x-a)=P+(-P)-2O.
$$

So $$P+(-P)\sim 2O$$. This is the group law entering divisor language: the pair of opposite points behaves like twice the origin.
</div>

## In computations

Before applying Riemann-Roch, it is often worth replacing $$D$$ by a linearly equivalent divisor that is easier to read. On $$\mathbb P^1$$ this usually means moving everything to infinity. On an elliptic curve it means using the group law. On higher genus curves it means working inside the Picard group or the Jacobian.

<nav class="rr-nav">
  <a href="/articles/rr-07-genus-one/"><span>Previous</span>Riemann-Roch 07: Genus One</a>
  <a class="rr-next" href="/articles/rr-09-cohomological-form/"><span>Next</span>Riemann-Roch 09: Cohomological Form</a>
</nav>

</article>
