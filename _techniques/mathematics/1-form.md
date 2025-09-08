---
title: One-form
layout: page
categories: Mathematics
date: 2025-08-27
tags: 1-form, integral, FTC
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- You can write mathematics using MathJax in two ways:

- **Inline mode:** Wrap your math with single dollar signs, for example, `$a^2 + b^2 = c^2$`, which renders as \( a^2 + b^2 = c^2 \).
- **Display mode:** Use double dollar signs or `\[` and `\]` for larger equations. For example:

    ```math
    $$
    \int_a^b f(x)\,dx = F(b) - F(a)
    $$
    ```

    or

    ```
    \[
        \nabla \cdot \vec{F} = \frac{\partial F_1}{\partial x} + \frac{\partial F_2}{\partial y}
    \]
    ```

Both methods will render mathematical expressions clearly in your document. -->

# One-form

A **1-form** is a type of differential form that can be integrated over a curve in a manifold. In coordinates, a 1-form on $$\mathbb{R}^n$$ is an expression of the form:
<!-- ```math
$$
    E = m c^2
$$
``` -->

$$
\omega = f_1(x)\,dx^1 + f_2(x)\,dx^2 + \cdots + f_n(x)\,dx^n
$$
	
where each $$f_i(x)$$ is a smooth function.

<!-- $$ 
    \omega = f_1(x)\,dx^1 + f_2(x)\,dx^2 + \cdots + f_n(x)\,dx^n
$$
where each $f_i(x)$ is a smooth function. -->

## Properties
- 1-forms are linear functionals on tangent vectors.
- They can be pulled back by smooth maps.
- The exterior derivative of a 0-form (function) is a 1-form.

## Example
Let $$\omega = y\,dx + x\,dy $$ on $$ \mathbb{R}^2 $$. For a curve $$ \gamma(t) = (t, t^2) \), \( t \in [0,1] $$:

$$
	\int_\gamma \omega = \int_0^1 \left( t^2 \cdot 1 + t \cdot 2t \right) dt = \int_0^1 (t^2 + 2t^2) dt = \int_0^1 3t^2 dt = 1
$$

## Applications
- Line integrals in vector calculus
- Fundamental Theorem of Calculus for line integrals
- Physics: work done by a force field

