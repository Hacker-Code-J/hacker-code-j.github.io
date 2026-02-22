---
# title: "Paper Notes: Riemann–Roch as the Main Bridge (Cho, 2026)"
# date: 2026-01-13
# categories: [paper-notes, mathematics]
# tags: [riemann-roch, riemann-surfaces, algebraic-geometry, divisors, line-bundles, sheaf-cohomology, serre-duality]
# math: true
title: Riemann–Roch
layout: page
categories: Mathematics
date: 2026-01-13
tags: [riemann-roch, riemann-surfaces, algebraic-geometry, divisors, line-bundles, sheaf-cohomology, serre-duality]
---

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

## TL;DR

Why complex analysis on a compact Riemann surface *turns into* algebraic geometry? It is **Riemann–Roch**. It converts geometric input (a divisor / line bundle and the genus) into a computable formula for the dimension of meromorphic sections. Riemann–Roch is the hinge connecting residues/meromorphic functions, sheaves/cohomology, Serre duality, and Jacobians.

**PDF:** https://arxiv.org/pdf/2601.06868

---

## Why Riemann–Roch

Riemann–Roch is not just a dimension formula. It is a machine:

- It tells you **when meromorphic functions exist** with prescribed zeros/poles.
- It explains the size of **spaces of differentials** and **linear systems**.
- It is the formal point where analysis + topology (genus) becomes the algebraic geometry of **divisors, line bundles, and cohomology**.

---

## Setup and notation

Let $$X$$ be a compact Riemann surface of genus $$g$$.

- A **divisor** is $$D=\sum_p n_p\,p$$ (finite sum, $$n_p\in\mathbb{Z}$$).
- The associated line bundle is $$\mathcal{O}(D)$$.
- Define the dimension of meromorphic sections with pole divisor bounded by $$D$$:

$$
\ell(D) := \dim H^0(X,\mathcal{O}(D)),
$$

- Let $$K$$ be a canonical divisor.

---

## The Riemann–Roch theorem (core statement)

For any divisor $$D$$ on $$X$$,

$$
\ell(D) - \ell(K-D) = \deg(D) + 1 - g.
$$

Interpretation:
- $$\ell(D)$$ counts meromorphic functions/sections with poles bounded by $$D$$.
- $$\ell(K-D)$$ is the “correction/obstruction term.”
- $$\deg(D)+1-g$$ is the predicted Euler characteristic.

---

## The theorem as a workflow (how I use it)

To decide whether a nonconstant meromorphic function exists with poles bounded by $$D$$:

1. Compute $$\deg(D)$$.
2. Compare $$\deg(D)$$ to $$g$$.
3. Use Riemann–Roch and control $$\ell(K-D)$$.

A common practical case: if $$\deg(D)$$ is large enough that $$\ell(K-D)=0$$, then

$$
\ell(D)=\deg(D)+1-g.
$$

---

## High-impact corollaries

### 1) Existence of meromorphic functions with prescribed poles

If $$D$$ is effective and $$\deg(D)$$ is sufficiently large, Riemann–Roch implies $$\ell(D)\ge 2$$, so there exists a **nonconstant** meromorphic function with poles bounded by $$D$$.

---

### 2) Dimension of holomorphic differentials

Take $$D=0$$:

$$
\ell(0) - \ell(K) = 1 - g.
$$

Since $$\ell(0)=1$$ (constants), we get

$$
\ell(K)=g,
$$

so the space of holomorphic $$1$$-forms has dimension $$g$$.

---

### 3) Canonical divisor degree

A standard consequence is

$$
\deg(K)=2g-2.
$$

---

### 4) Sanity-check examples (genus 0 and genus 1)

**Genus 0: $$X=\mathbb{P}^1$$**
- $$g=0$$ and $$\deg(K)=-2$$.
- For $$\deg(D)\ge 0$$ one gets
  
$$
\ell(D)=\deg(D)+1,
$$

matching the fact that rational functions with pole order $$\le n$$ form an $$(n+1)$$-dimensional space.

**Genus 1: elliptic curve / complex torus**
- $$g=1$$ and $$\deg(K)=0$$.
- Riemann–Roch becomes
  
$$
\ell(D)-\ell(-D)=\deg(D).
$$

For effective $$D$$ with $$\deg(D)\ge 1$$, typically $$\ell(-D)=0$$, giving $$\ell(D)=\deg(D)$$.

---

## How this connects to the rest of the notes

Riemann–Roch is naturally expressed as an Euler characteristic identity:

- $$\ell(D)=\dim H^0(X,\mathcal{O}(D))$$.
- By Serre duality,
  
$$
H^1(X,\mathcal{O}(D))^\* \cong H^0(X, K\otimes\mathcal{O}(-D)).
$$

So

$$
\dim H^1(X,\mathcal{O}(D)) = \ell(K-D),
$$

and Riemann–Roch is equivalent to

$$
\chi(\mathcal{O}(D)) := \dim H^0(X,\mathcal{O}(D)) - \dim H^1(X,\mathcal{O}(D))
= \deg(D)+1-g.
$$

---

## Citation (BibTeX)

```bibtex
@misc{cho2026complex_analysis_riemann_surfaces,
  title        = {Complex Analysis and Riemann Surfaces: A Graduate Path to Algebraic Geometry},
  author       = {Cho, Gunhee and collaborators},
  year         = {2026},
  eprint       = {2601.06868},
  archivePrefix= {arXiv},
  primaryClass = {math.CV},
  note         = {Version 1}
}
```