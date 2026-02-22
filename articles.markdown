---
layout: page
title: Articles
permalink: /articles/
---
<link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<!-- <nav style="position: sticky; top: 0; z-index: 100; background: var(--background-color, #fff); border-bottom: 2px solid #ddd; padding: 0.8rem 0; margin: 2rem -1rem 1rem -1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1.5rem; max-width: 1000px; margin: 0 auto; padding: 0 1rem;">
    <a href="#mathematics" style="text-decoration: none; font-weight: 600; color: #0066cc; padding: 0.3rem 0.8rem; border-radius: 4px; transition: all 0.3s;">Mathematics</a>
    <a href="#cryptography" style="text-decoration: none; font-weight: 600; color: #0066cc; padding: 0.3rem 0.8rem; border-radius: 4px; transition: all 0.3s;">Cryptography</a>
    <a href="#programming" style="text-decoration: none; font-weight: 600; color: #0066cc; padding: 0.3rem 0.8rem; border-radius: 4px; transition: all 0.3s;">Programming</a>
  </div>
</nav> -->

<h1 id="mathematics">Mathematics</h1>

$$\int_a^b f'(x)\; dx = f(b) - f(a),\quad\quad\quad\frac{d}{dx}\left(\int_a^x f(t)\; dt\right)=f(x)$$

<blockquote>
  <p>The integration on forms concept is of fundamental importance in differential topology, geometry, and physics, and also yields one of the most important examples of cohomology, namely de Rahm cohomology, which (roughly speaking) measures precisely the extend to which the fundamental theorem of calculus fails in higher and on general manifolds.</p>
    <span class="quote-author">Terrence Tao, <a href="https://www.math.ucla.edu/~tao/preprints/forms.pdf" target="_blank" rel="noopener noreferrer"><em>Differential Forms and Integration</em></a></span>
</blockquote>

<ul class="full-width">		
    {%- assign math_articles = site.articles | where_exp: "item", "item.path contains '/mathematics/'" | sort: 'title' -%}
    {%- for item in math_articles -%}
        <li><details><summary>
            <a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a><br></summary>
            <b>Topics:</b> {{ item.topics }}<br>
            <!-- <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %} -->
        </details></li>
    {%- endfor -%}
</ul>

<h1 id="cryptography">Cryptography</h1>

$$
\operatorname{Adv}^{\mathrm{IND\text{-}CPA}}_{\mathcal{A}}(\Pi)
\;:=\;
\left|\Pr\!\left[\mathsf{Game}^{\mathrm{IND\text{-}CPA}}_{\Pi,\mathcal{A}}(1^\lambda)=1\right]-\tfrac12\right|.
$$

<blockquote>
  <p>
    In modern security definitions, a construction is considered secure if every efficient adversary’s advantage
    in a well-specified experiment is negligible as a function of the security parameter.
    This viewpoint makes cryptographic claims precise, composable, and testable against explicit threat models.
  </p>
  <!-- <span class="quote-author">Game-based security (standard methodology)</span> -->
</blockquote>



<ul class="full-width">		
    {%- assign crypto_articles = site.articles | where_exp: "item", "item.path contains '/cryptography/'" | sort: 'title' -%}
    {%- for item in crypto_articles -%}
        <li><!-- <a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a><br> -->
        <details><summary><a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a></summary>
            <b>Category:</b> {{ item.category }}<br>
            <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
        </details>
        </li>
    {%- endfor -%}
</ul>

<h1 id="programming">Programming</h1>

$$
\text{Program} = \text{Algorithms} + \text{Data Structures}
$$

<blockquote>
  <p>"Programs must be written for people to read, and only incidentally for machines to execute."</p>
  <span class="quote-author">Harold Abelson, <a href="https://web.mit.edu/6.001/6.037/sicp.pdf" target="_blank" rel="noopener noreferrer"><em>Structure and Interpretation of Computer Programs</em></a></span>
</blockquote>

<ul class="full-width">		
    {%- assign prog_articles = site.articles | where_exp: "item", "item.path contains '/programmings/'" | sort: 'title' -%}
    {%- for item in prog_articles -%}
        <li>
            <details><summary><a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a></summary>
            <b>Category:</b> {{ item.category }}<br>
            <b>Date:</b> {{ item.date }}<br>
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
            </details>
        </li>
    {%- endfor -%}
</ul>


<h1 id="ETC">E.T.C.</h1>

<ul class="full-width">		
    {%- assign prog_articles = site.articles | where_exp: "item", "item.path contains '/etc/'" | sort: 'title' -%}
    {%- for item in prog_articles -%}
        <li>
            <details><summary><a href="{{ item.url | relative_url }}"><b>{{ item.title }}</b></a></summary>
            <b>Category:</b> {{ item.category }}<br>
            <!-- <b>Date:</b> {{ item.date }}<br> -->
            <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}
            </details>
        </li>
    {%- endfor -%}
</ul>