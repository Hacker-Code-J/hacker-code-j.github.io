---
title: "Differential Forms 05: Complex Line Integrals"
layout: page
categories: Mathematics
tags: [differential-forms, complex-analysis, residues]
topics: dz, dbar z, winding number, residues
short: "Complex contour integrals as 1-form integrals."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include differential_forms_note_style.html %}

<article class="df-note df-note-05" markdown="1">

<header class="df-note-head" markdown="1">
<p class="df-series">Differential forms / 05</p>

# Complex line integrals

<p class="df-deck">The forms $$dz$$ and $$d\bar z$$ are a change of basis for planar 1-forms; residues are period computations around punctures.</p>
</header>
{% include df_calculus_root_05.md %}


Section 4.3 of the PDF rewrites planar line integrals in complex coordinates. Let

$$
z=x+iy,\qquad \bar z=x-iy.
$$

Then

$$
dz=dx+i\,dy,\qquad d\bar z=dx-i\,dy,
$$

and conversely

$$
dx={1\over 2}(dz+d\bar z),\qquad
dy={1\over 2i}(dz-d\bar z).
$$

## Real 1-forms in complex basis

For a real 1-form $$\eta=P\,dx+Q\,dy$$,

$$
\eta={1\over 2}(P-iQ)\,dz+{1\over 2}(P+iQ)\,d\bar z.
$$

This is linear algebra, not yet holomorphic analysis. Holomorphicity enters when the coefficient of $$d\bar z$$ disappears in the appropriate differential equation.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 1: convert a real form</span>

For $$\eta=x\,dx-y\,dy$$, use the formulas above:

$$
\eta={1\over 2}\bigl((x+iy)\,dz+(x-iy)\,d\bar z\bigr)
={1\over 2}(z\,dz+\bar z\,d\bar z).
$$

Since $$\eta=d\left({1\over2}(x^2-y^2)\right)$$, it is exact.
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 2: the form $$d\bar z\wedge dz$$</span>

Compute

$$
d\bar z\wedge dz=(dx-i\,dy)\wedge(dx+i\,dy)=2i\,dx\wedge dy.
$$

Thus

$$
dx\wedge dy={1\over 2i}d\bar z\wedge dz.
$$

This identity is the area-form bridge used in the Cauchy-Green formula.
</div>

## The vortex form as an imaginary part

On $$\mathbb C^\times$$,

$$
{dz\over z}
={dx+i\,dy\over x+iy}
={x\,dx+y\,dy\over x^2+y^2}
+i\,{x\,dy-y\,dx\over x^2+y^2}.
$$

Therefore

$$
\operatorname{Im}{dz\over z}
={x\,dy-y\,dx\over x^2+y^2}.
$$

This is exactly the closed non-exact form from the punctured-plane example.

For $$C_R(t)=Re^{it}$$,

$$
{dz\over z}=i\,dt,
\qquad
\int_{C_R}{dz\over z}=2\pi i,
\qquad
\int_{C_R}\operatorname{Im}{dz\over z}=2\pi.
$$

## Winding number

For a loop $$C$$ avoiding $$p$$,

$$
{1\over 2\pi i}\int_C {dz\over z-p}
$$

is the winding number of $$C$$ about $$p$$ when $$C$$ is a standard piecewise smooth closed curve. In form language, the integral of $$dz/(z-p)$$ is a period of a closed form on $$\mathbb C\setminus\{p\}$$.

<div class="df-example" markdown="1">
<span class="df-env-title">Example 3: an $$n$$-fold loop</span>

Let $$C_n(t)=p+Re^{int}$$, $$0\le t\le 2\pi$$. Then

$$
dz=i n Re^{int}\,dt,\qquad z-p=Re^{int},
$$

so

$$
\int_{C_n}{dz\over z-p}=2\pi i n.
$$
</div>

<div class="df-example" markdown="1">
<span class="df-env-title">Example 4: residue as a coefficient</span>

For

$$
g(z)={3\over z-a}+{2\over (z-a)^2}+h(z)
$$

with $$h$$ holomorphic near $$a$$, the integral around a small positively oriented circle is

$$
\int g(z)\,dz=2\pi i\cdot 3.
$$

The double-pole term contributes no period because it is the derivative of $$-2/(z-a)$$.
</div>

## Relation to Cauchy's theorem

If $$g$$ is holomorphic on a simply connected domain, then $$g(z)\,dz$$ has a global primitive and all closed contour integrals vanish. If the domain has isolated poles, the obstruction is measured by residues and winding numbers:

$$
\int_C g(z)\,dz=2\pi i\sum_a \operatorname{Res}_a(g)\operatorname{wind}(C,a),
$$
where the sum is over poles $$a$$ not on $$C$$, with only poles of nonzero winding contributing.

This is not separate from differential forms. It is the same closed-versus-exact story in complex notation.

<nav class="df-nav">
  <a href="/articles/df-04-line-integrals-and-conservative-fields/"><span>Previous</span>Line Integrals</a>
  <a class="df-next" href="/articles/df-06-stokes-cauchy-green-and-area-forms/"><span>Next</span>Stokes and Cauchy-Green</a>
</nav>

</article>
