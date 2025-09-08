---
layout: page
title: Techniques
permalink: /techniques/
---
<link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>



## Mathematics

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

## Cryptography
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

## Programming
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



