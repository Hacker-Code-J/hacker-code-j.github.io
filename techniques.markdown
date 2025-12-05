---
layout: page
title: Techniques
permalink: /techniques/
---
<link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- <style>
.page-container {
  display: flex;
  gap: 2rem;
  position: relative;
}

.toc-sidebar {
  position: sticky;
  top: 2rem;
  width: 200px;
  height: fit-content;
  flex-shrink: 0;
}

.toc-sidebar nav {
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

.toc-sidebar h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: #333;
}

.toc-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-sidebar li {
  margin: 0.5rem 0;
}

.toc-sidebar a {
  text-decoration: none;
  color: #0366d6;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.toc-sidebar a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.main-content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }
  
  .toc-sidebar {
    position: static;
    width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>

<div class="page-container">
  <aside class="toc-sidebar">
    <nav>
      <h3>Contents</h3>
      <ul>
        <li><a href="#mathematics">Mathematics</a></li>
        <li><a href="#cryptography">Cryptography</a></li>
        <li><a href="#programming">Programming</a></li>
      </ul>
    </nav>
  </aside>

<div class="main-content"> -->

# Mathematics

$$\int_a^b f'(x)\; dx = f(b) - f(a),\quad\quad\quad\frac{d}{dx}\left(\int_a^x f(t)\; dt\right)=f(x)$$

<blockquote>
  <p>The integration on forms concept is of fundamental importance in differential topology, geometry, and physics, and also yields one of the most important examples of cohomology, namely de Rahm cohomology, which (roughly speaking) measures precisely the extend to which the fundamental theorem of calculus fails in higher and on general manifolds.</p>
    <span class="quote-author">Terrence Tao, <a href="https://www.math.ucla.edu/~tao/preprints/forms.pdf" target="_blank" rel="noopener noreferrer"><em>Differential Forms and Integration</em></a></span>
</blockquote>

<ul class="full-width">		
    {%- assign math_techniques = site.techniques | where_exp: "item", "item.path contains '/mathematics/'" | sort: 'title' -%}
    {%- for item in math_techniques -%}
        <li>
            <a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a><br>
            <b>Category:</b> {{ item.category }}<br>
            <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
        </li>
    {%- endfor -%}
</ul>

# Cryptography

$$
c = \operatorname{Enc}_k(m),\quad 
m = \operatorname{Dec}_k(c),\qquad
\Pr[M = m \mid C = c] = \Pr[M = m]
$$

<blockquote>
  <p>"The enemy knows the system."</p>
  <span class="quote-author">Claude Shannon, <a href="https://pages.cs.wisc.edu/~rist/642-spring-2014/shannon-secrecy.pdf" target="_blank" rel="noopener noreferrer"><em>Communication Theory of Secrecy Systems</em></a></span>
</blockquote>

<ul class="full-width">		
    {%- assign crypto_techniques = site.techniques | where_exp: "item", "item.path contains '/cryptography/'" | sort: 'title' -%}
    {%- for item in crypto_techniques -%}
        <li><!-- <a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a><br> -->
        <details><summary><a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a></summary>
            <b>Category:</b> {{ item.category }}<br>
            <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
        </details>
        </li>
    {%- endfor -%}
</ul>

# Programming

$$
\text{Program} = \text{Algorithms} + \text{Data Structures}
$$

<blockquote>
  <p>"Programs must be written for people to read, and only incidentally for machines to execute."</p>
  <span class="quote-author">Harold Abelson, <a href="https://web.mit.edu/6.001/6.037/sicp.pdf" target="_blank" rel="noopener noreferrer"><em>Structure and Interpretation of Computer Programs</em></a></span>
</blockquote>

<!-- $$
\texttt{C}: \quad \text{low-level control} \;+\; \text{high-level portability}
$$

<blockquote>
  <p>"C is quirky, flawed, and an enormous success."</p>
  <span class="quote-author">Dennis M. Ritchie, <em>The Development of the C Language</em></span>
</blockquote> -->

<!-- $$
\text{NEON}: \quad \mathbf{y} \leftarrow \mathbf{a} \cdot \mathbf{x} + \mathbf{y} \quad
\bigl(\text{SIMD on 128-bit vectors}\bigr)
$$
<blockquote>
  <p>NEON is a 128-bit SIMD instruction set extension for the ARMv8 architecture, enabling efficient data-parallel computation.</p>
  <span class="quote-author">ARM Architecture Reference (paraphrased)</span>
</blockquote> -->

<ul class="full-width">		
    {%- assign prog_techniques = site.techniques | where_exp: "item", "item.path contains '/programmings/'" | sort: 'title' -%}
    {%- for item in prog_techniques -%}
        <li>
            <details><summary><a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a></summary>
            <b>Category:</b> {{ item.category }}<br>
            <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
            </details>
        </li>
    {%- endfor -%}
</ul>



