---
title: "Čech Cohomology 01: De Rham and Calculus Bridge"
layout: page
categories: Mathematics
tags: [cech-cohomology, de-rham-cohomology, vector-calculus]
topics: grad curl div, local potentials, closed forms, exact forms, sheaf cohomology
short: "How grad, curl, div, and local potentials explain the Čech obstruction mechanism."
---
{% include mathjax-support.html %}
{% include sheaf_cohomology_note_style.html %}

<article class="sc-note sc-note-01" markdown="1">

<header class="sc-note-head" markdown="1">
<p class="sc-series">Čech cohomology / 01</p>

# De Rham and calculus bridge

<p class="sc-deck">Start from the calculus picture: de Rham cohomology gives local differential equations, and Čech cohomology records whether the local solutions patch globally.</p>
</header>

This is the conceptual model for the rest of the sequence. Every later Čech computation repeats the same move: solve locally, compare on overlaps, adjust the local choices if possible, and keep the obstruction if it survives.

The vector-calculus complex

$$
C^\infty
\xrightarrow{\nabla}
\mathfrak X
\xrightarrow{\nabla\times}
\mathfrak X
\xrightarrow{\nabla\cdot}
C^\infty
$$

is the familiar three-dimensional face of the de Rham complex

$$
\Omega^0\xrightarrow{d}
\Omega^1\xrightarrow{d}
\Omega^2\xrightarrow{d}
\Omega^3.
$$

The identities

$$
\nabla\times\nabla f=0,
\qquad
\nabla\cdot(\nabla\times A)=0
$$

are the same structural statement as $$d^2=0$$. Čech cohomology has its own version:

$$
\delta^2=0.
$$

The useful comparison is not just symbolic. It is computational.

## Closed versus exact means local versus global

A closed form satisfies a differential equation:

$$
d\alpha=0.
$$

On small enough open sets, the Poincare lemma gives a local primitive:

$$
\alpha=df_i\qquad\text{on }U_i.
$$

The global question is whether one can choose a single $$f$$ on all of $$X$$ with $$df=\alpha$$. Čech cohomology records the obstruction. On overlaps,

$$
d(f_j-f_i)=0,
$$

so the difference $$f_j-f_i$$ is locally constant. The family

$$
c_{ij}=f_j-f_i
$$

is a Čech $$1$$-cocycle for the constant sheaf.

<div class="sc-env" markdown="1">
<span class="sc-env-title">Dictionary in degree one</span>

<table>
  <thead>
    <tr>
      <th>de Rham language</th>
      <th>Čech language</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>\(d\alpha=0\)</td>
      <td>local primitives exist</td>
    </tr>
    <tr>
      <td>\(\alpha=df\) globally</td>
      <td>the overlap cocycle is a coboundary</td>
    </tr>
    <tr>
      <td>closed but not exact</td>
      <td>local primitives differ by a nonzero Čech class</td>
    </tr>
    <tr>
      <td>period around a loop</td>
      <td>constant jump around the cover</td>
    </tr>
  </tbody>
</table>
</div>

## The sheaf-theoretic bridge

The reason this comparison is not just an analogy is that the de Rham complex is locally exact:

$$
0\to\underline{\mathbb R}\to
\mathcal A^0\xrightarrow{d}
\mathcal A^1\xrightarrow{d}
\mathcal A^2\to\cdots .
$$

Here $$\mathcal A^q$$ is the sheaf of smooth $$q$$-forms. Local exactness means that a closed form can be locally integrated. Smooth form sheaves also admit partitions of unity, so their higher sheaf cohomology vanishes in ordinary smooth settings. Thus the global de Rham complex computes the same obstruction groups as the constant sheaf $$\underline{\mathbb R}$$.

For practical Čech computations, this teaches the right habit:

1. replace "integrate locally" by "solve the sheaf problem locally";
2. replace "subtract local primitives" by "compare local sections on overlaps";
3. replace "change primitives by constants" by "change local choices by a lower-degree cochain";
4. keep the surviving overlap data as the cohomology class.

## Grad, curl, div intuition

For $$H^1$$, think "curl-free but not a global gradient." A vector field $$F$$ with $$\nabla\times F=0$$ is locally $$F=\nabla f_i$$. If the scalar potentials $$f_i$$ do not patch to one global potential, the obstruction is a Čech $$1$$-class.

For $$H^2$$, think "divergence-free but not a global curl." A field $$B$$ with $$\nabla\cdot B=0$$ may locally be written as

$$
B=\nabla\times A_i.
$$

On overlaps,

$$
\nabla\times(A_j-A_i)=0,
$$

so $$A_j-A_i$$ is locally a gradient. Those local gradients create the next layer of overlap data. The obstruction is one degree higher because vector potentials themselves are only locally chosen.

<div class="sc-example" markdown="1">
<span class="sc-env-title">The punctured-plane pattern</span>

On a punctured plane, the angular form is locally a differential of an angle function. On overlapping angular charts, the angle functions differ by constants. Going once around the puncture changes the chosen branch by a period. Čech sees the constant jumps; de Rham sees the nonzero loop integral.
</div>

## Why this helps sheaf cohomology

Sheaf cohomology often asks for the same operation in a less calculus-looking setting:

1. solve locally,
2. compare solutions on overlaps,
3. check whether the comparison can be removed by changing local choices,
4. if not, record the obstruction class.

The sheaf may be $$\underline{\mathbb R}$$, $$\mathcal O_X$$, $$\mathcal O_X^*$$, $$\mathcal O_X(D)$$, or a quotient sheaf. The calculation pattern remains the same.

For example, the exponential sequence asks whether local logarithms patch. The line-bundle problem asks whether local frames patch. A divisor sequence asks whether prescribed local values extend to global sections. In each case, Čech cochains are the bookkeeping device for local choices and their overlap errors.

## Practical takeaway

When a sheaf-cohomology calculation feels abstract, translate it into the calculus template:

<div class="sc-bridge-table">
  <div class="sc-bridge-row sc-bridge-head">
    <span>Step</span>
    <span>Calculus picture</span>
    <span>Čech/sheaf picture</span>
  </div>
  <div class="sc-bridge-row">
    <span>local solve</span>
    <span>find local potentials</span>
    <span>choose local sections or lifts</span>
  </div>
  <div class="sc-bridge-row">
    <span>compare</span>
    <span>subtract potentials on overlaps</span>
    <span>form a Čech cochain</span>
  </div>
  <div class="sc-bridge-row">
    <span>compatibility</span>
    <span>derivative of the difference vanishes</span>
    <span>the cochain is a cocycle</span>
  </div>
  <div class="sc-bridge-row">
    <span>global solve</span>
    <span>one potential exists</span>
    <span>the cocycle is a coboundary</span>
  </div>
  <div class="sc-bridge-row">
    <span>obstruction</span>
    <span>period or flux survives</span>
    <span>a cohomology class survives</span>
  </div>
</div>

This is the reason Čech cohomology is practical: it keeps the local choices visible all the way to the final cohomology class.

<nav class="sc-nav">
  <a href="/articles/cech-cohomology/"><span>Previous</span>Roadmap</a>
  <a class="sc-next" href="/articles/cc-02-covers-cochains-and-coboundary/"><span>Next</span>Covers, Cochains, and Coboundary</a>
</nav>

</article>
