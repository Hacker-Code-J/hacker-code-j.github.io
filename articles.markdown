---
layout: page
title: Articles
permalink: /articles/
---
<link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<style>
.page-content {
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  overflow-x: hidden;
}
.page-content > .wrapper,
.post,
.post-content,
.art-library,
.art-nav,
.art-content,
.art-section,
.art-equation,
.art-quote,
.art-list,
.art-row {
  box-sizing: border-box;
  min-width: 0;
}
.post,
.post-content,
.art-library,
.art-nav,
.art-content,
.art-section,
.art-equation,
.art-quote,
.art-list,
.art-row {
  max-width: 100%;
}

/* ── Scalable article navigator ── */
.art-library {
  display: grid;
  grid-template-columns: minmax(12rem, 15rem) minmax(0, 1fr);
  gap: 1.8rem;
  align-items: start;
  margin-top: 1.2rem;
}
.art-nav {
  position: sticky;
  top: 0.75rem;
  z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.85rem;
  box-shadow: 0 10px 28px rgba(31,41,55,0.05);
}
.art-nav-inner {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.85rem;
}
.art-nav-group { display: grid; gap: 0.18rem; }
.art-nav-group-label {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9ca3af;
  padding: 0 0.45rem 0.12rem;
}
.art-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35em;
  padding: 0.42rem 0.5rem;
  font-size: 0.73rem;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-left: 3px solid transparent;
  border-radius: 5px;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}
.art-nav-link:hover { color: #1f2937; background: #f8fafc; border-left-color: #d1d5db; }
.art-nav-link.active { color: #0066cc; background: #f0f6ff; border-left-color: #0066cc; }
.art-nav-link .nav-count {
  font-family: var(--font-mono, monospace);
  font-size: 0.60rem;
  font-weight: 400;
  color: #9ca3af;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0 0.4em;
  line-height: 1.5;
}
.art-nav-link.active .nav-count { background: #dbeafe; border-color: #bfdbfe; color: #2563eb; }
.art-category-field { display: none; }
.art-category-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #6b7280;
}
.art-category-select {
  box-sizing: border-box;
  width: 100%;
  min-height: 2.45rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background: #fff;
  color: #1f2937;
  font-size: 0.86rem;
}
.art-content { min-width: 0; }

/* ── Articles page ─────────────────────────────────────────────────────── */
.art-section { margin-top: 2.2rem; }
.art-section:first-of-type { margin-top: 1.5rem; }
.js-tabs-enabled .art-section[hidden] { display: none; }
.js-tabs-enabled .art-section { animation: artPanelIn 0.18s ease-out; }
@keyframes artPanelIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .js-tabs-enabled .art-section { animation: none; }
}


/* ── Section header ── */
.art-section-header {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1rem;
}
.art-section-header::before {
  content: '';
  flex-shrink: 0;
  width: 3px;
  height: 1em;
  background: linear-gradient(180deg, #0066cc 0%, #004499 100%);
  border-radius: 2px;
}
.art-section-title {
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #374151;
  margin: 0;
}

/* ── Equation epigraph ── */
.art-equation {
  background: linear-gradient(135deg, #f0f6ff 0%, #f8faff 100%);
  border: 1px solid #dbeafe;
  border-radius: 8px;
  padding: 0.85rem 1.5rem;
  margin: 0 0 0.9rem 0;
  text-align: center;
  overflow-x: auto;
  font-size: 0.95rem;
}

/* ── Blockquote ── */
.art-quote {
  position: relative;
  margin: 0 0 1rem 0;
  padding: 0.7rem 1rem 0.7rem 1.2rem;
  border-left: 3px solid #bfdbfe;
  background: #f8faff;
  border-radius: 0 6px 6px 0;
}
.art-quote p {
  margin: 0 0 0.35rem 0;
  font-size: 0.81rem;
  color: #4b5563;
  line-height: 1.65;
  font-style: italic;
}
.art-quote .quote-author {
  font-size: 0.74rem;
  color: #6b7280;
  font-style: normal;
}
.art-quote .quote-author::before { content: "— "; }
.art-quote .quote-author a { color: #0066cc; text-decoration: none; }
.art-quote .quote-author a:hover { text-decoration: underline; }

/* ── Article list ── */
.art-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Article row ── */
.art-row {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  padding: 0.55rem 0.6rem 0.55rem 0.5rem;
  border-bottom: 1px solid #f3f4f6;
  border-left: 3px solid transparent;
  border-radius: 0 4px 4px 0;
  transition: background 0.13s, border-left-color 0.13s;
  align-items: start;
}
.art-row:last-child { border-bottom: none; }
.art-row:hover {
  background: #f5f9ff;
  border-left-color: #93c5fd;
}

/* Title — col 1, row 1 */
.art-title-link {
  grid-column: 1;
  grid-row: 1;
  font-size: 0.88rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  line-height: 1.4;
  display: block;
}
.art-title-link:hover { color: #0066cc; }

/* Topics — col 1, row 2 */
.art-topics {
  grid-column: 1;
  grid-row: 2;
  font-size: 0.74rem;
  color: #9ca3af;
  margin: 0.12rem 0 0 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right column: chips + date — col 2, rows 1-2 */
.art-right {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
  padding-top: 0.08rem;
}
.art-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.22rem;
  justify-content: flex-end;
}
.art-chip {
  font-size: 0.61rem;
  font-family: var(--font-mono, monospace);
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  padding: 0.05em 0.4em;
  white-space: nowrap;
}
.art-date {
  font-family: var(--font-mono, monospace);
  font-size: 0.61rem;
  color: #b0b8c4;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 540px) {
  .art-row { grid-template-columns: 1fr; }
  .art-right { grid-column: 1; grid-row: auto; flex-direction: row; flex-wrap: wrap; align-items: center; margin-top: 0.25rem; }
  .art-topics { white-space: normal; }
}
@media (max-width: 760px) {
  .art-library {
    display: block;
    margin-top: 0.75rem;
  }
  .art-nav {
    top: 0;
    margin: 0 0 1.1rem;
    padding: 0.75rem 1rem;
    border-left: none;
    border-right: none;
    border-radius: 0;
    box-shadow: none;
  }
  .js-tabs-enabled .art-nav-inner { display: none; }
  .js-tabs-enabled .art-category-field { display: block; }
}
</style>

{%- assign math_articles   = site.articles | where_exp: "item", "item.path contains '/mathematics/'"  | sort: 'title' -%}
{%- assign df_articles     = site.articles | where_exp: "item", "item.path contains '/differential-forms/'" | sort: 'title' -%}
{%- assign sc_articles     = site.articles | where_exp: "item", "item.path contains '/sheaf-cohomology/'" | sort: 'title' -%}
{%- assign rr_articles     = site.articles | where_exp: "item", "item.path contains '/riemann-roch/'" | sort: 'title' -%}
{%- assign crypto_articles = site.articles | where_exp: "item", "item.path contains '/cryptography/'" | sort: 'title' -%}
{%- assign ps_articles     = site.articles | where_exp: "item", "item.path contains '/provable-security/'" | sort: 'title' -%}
{%- assign ct_articles     = site.articles | where_exp: "item", "item.path contains '/coding-theory/'" | sort: 'title' -%}
{%- assign bn_articles     = site.articles | where_exp: "item", "item.path contains '/bignum-arithmetic/'" | sort: 'title' -%}
{%- assign ec_articles     = site.articles | where_exp: "item", "item.path contains '/elliptic-arithmetic/'" | sort: 'title' -%}
{%- assign prog_articles   = site.articles | where_exp: "item", "item.path contains '/programmings/'" | sort: 'title' -%}
{%- assign etc_articles    = site.articles | where_exp: "item", "item.path contains '/etc/'"          | sort: 'title' -%}

<div class="art-library">
<nav class="art-nav" aria-label="Article sections">
  <div class="art-category-field">
    <label class="art-category-label" for="art-category-select">Category</label>
    <select class="art-category-select" id="art-category-select" aria-label="Article category">
      <optgroup label="Mathematics">
        <option value="mathematics">Mathematics ({{ math_articles | size }})</option>
        <option value="differential-forms">Differential Forms ({{ df_articles | size }})</option>
        <option value="sheaf-cohomology">Sheaf Cohomology ({{ sc_articles | size }})</option>
        <option value="riemann-roch">Riemann-Roch ({{ rr_articles | size }})</option>
      </optgroup>
      <optgroup label="Cryptography">
        <option value="cryptography">Cryptography ({{ crypto_articles | size }})</option>
        <option value="provable-security">Provable Security ({{ ps_articles | size }})</option>
        <option value="coding-theory">Coding Theory ({{ ct_articles | size }})</option>
      </optgroup>
      <optgroup label="Computing">
        <option value="bignum-arithmetic">Bignum Arithmetic ({{ bn_articles | size }})</option>
        <option value="elliptic-arithmetic">Elliptic Arithmetic ({{ ec_articles | size }})</option>
        <option value="programming">Programming ({{ prog_articles | size }})</option>
      </optgroup>
      <optgroup label="Miscellaneous">
        <option value="etc">E.T.C. ({{ etc_articles | size }})</option>
      </optgroup>
    </select>
  </div>
  <div class="art-nav-inner" role="tablist" aria-label="Article categories">
    <div class="art-nav-group">
      <span class="art-nav-group-label">Mathematics</span>
      <a class="art-nav-link active" id="tab-mathematics" role="tab" aria-selected="true" aria-controls="mathematics" href="#mathematics">Mathematics <span class="nav-count">{{ math_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-differential-forms" role="tab" aria-selected="false" aria-controls="differential-forms" href="#differential-forms">Differential Forms <span class="nav-count">{{ df_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-sheaf-cohomology" role="tab" aria-selected="false" aria-controls="sheaf-cohomology" href="#sheaf-cohomology">Sheaf Cohomology <span class="nav-count">{{ sc_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-riemann-roch" role="tab" aria-selected="false" aria-controls="riemann-roch" href="#riemann-roch">Riemann-Roch <span class="nav-count">{{ rr_articles | size }}</span></a>
    </div>
    <div class="art-nav-group">
      <span class="art-nav-group-label">Cryptography</span>
      <a class="art-nav-link" id="tab-cryptography" role="tab" aria-selected="false" aria-controls="cryptography" href="#cryptography">Cryptography <span class="nav-count">{{ crypto_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-provable-security" role="tab" aria-selected="false" aria-controls="provable-security" href="#provable-security">Provable Security <span class="nav-count">{{ ps_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-coding-theory" role="tab" aria-selected="false" aria-controls="coding-theory" href="#coding-theory">Coding Theory <span class="nav-count">{{ ct_articles | size }}</span></a>
    </div>
    <div class="art-nav-group">
      <span class="art-nav-group-label">Computing</span>
      <a class="art-nav-link" id="tab-bignum-arithmetic" role="tab" aria-selected="false" aria-controls="bignum-arithmetic" href="#bignum-arithmetic">Bignum Arithmetic <span class="nav-count">{{ bn_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-elliptic-arithmetic" role="tab" aria-selected="false" aria-controls="elliptic-arithmetic" href="#elliptic-arithmetic">Elliptic Arithmetic <span class="nav-count">{{ ec_articles | size }}</span></a>
      <a class="art-nav-link" id="tab-programming" role="tab" aria-selected="false" aria-controls="programming" href="#programming">Programming <span class="nav-count">{{ prog_articles | size }}</span></a>
    </div>
    <div class="art-nav-group">
      <span class="art-nav-group-label">Miscellaneous</span>
      <a class="art-nav-link" id="tab-etc" role="tab" aria-selected="false" aria-controls="etc" href="#etc">E.T.C. <span class="nav-count">{{ etc_articles | size }}</span></a>
    </div>
  </div>
</nav>
<div class="art-content">

<script>
(function () {
  const ids = ["mathematics", "differential-forms", "sheaf-cohomology", "riemann-roch", "cryptography", "provable-security", "coding-theory", "bignum-arithmetic", "elliptic-arithmetic", "programming", "etc"];
  const links = Array.from(document.querySelectorAll(".art-nav-link[role=tab]"));
  const categorySelect = document.getElementById("art-category-select");

  function setActive(id, updateHash) {
    if (!ids.includes(id)) id = ids[0];

    ids.forEach(panelId => {
      const panel = document.getElementById(panelId);
      const isActive = panelId === id;
      if (panel) {
        panel.hidden = !isActive;
        panel.setAttribute("aria-hidden", String(!isActive));
      }
    });

    links.forEach(link => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-selected", String(isActive));
      link.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    if (categorySelect && categorySelect.value !== id) {
      categorySelect.value = id;
    }

    if (updateHash) {
      history.replaceState(null, "", "#" + id);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("js-tabs-enabled");
    ids.forEach(id => {
      const panel = document.getElementById(id);
      if (panel) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", "tab-" + id);
      }
    });

    const initial = ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : ids[0];
    setActive(initial, false);
  });
  window.addEventListener("hashchange", () => {
    setActive(location.hash.slice(1), false);
  });


  links.forEach((link, index) => {
    link.addEventListener("click", event => {
      event.preventDefault();
      setActive(link.getAttribute("href").slice(1), true);
    });

    link.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + links.length) % links.length;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % links.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = links.length - 1;

      const next = links[nextIndex];
      setActive(next.getAttribute("href").slice(1), true);
      next.focus();
    });
  });

  if (categorySelect) {
    categorySelect.addEventListener("change", event => {
      setActive(event.target.value, true);
    });
  }
})();
</script>


<!-- ── Mathematics ────────────────────────────────────────────────────── -->
<div class="art-section" id="mathematics">
  <div class="art-section-header">
    <span class="art-section-title">Mathematics</span>
  </div>

  <div class="art-equation">
    $$\int_a^b f'(x)\, dx = f(b) - f(a) \qquad\qquad \frac{d}{dx}\!\left(\int_a^x f(t)\, dt\right) = f(x)$$
  </div>

  <div class="art-quote">
    <p>The integration on forms concept is of fundamental importance in differential topology, geometry, and physics, and also yields one of the most important examples of cohomology, namely de Rham cohomology, which measures precisely the extent to which the fundamental theorem of calculus fails in higher dimensions and on general manifolds.</p>
    <span class="quote-author">Terence Tao, <a href="https://www.math.ucla.edu/~tao/preprints/forms.pdf" target="_blank" rel="noopener noreferrer"><em>Differential Forms and Integration</em></a></span>
  </div>

  <ul class="art-list">
    {%- for item in math_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
        <!-- {%- if item.date -%}<span class="art-date">{{ item.date | date: "%Y-%m-%d" }}</span>{%- endif -%} -->
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

<!-- ── Differential Forms ─────────────────────────────────────────────── -->
<div class="art-section" id="differential-forms">
  <div class="art-section-header">
    <span class="art-section-title">Differential Forms</span>
  </div>

  <div class="art-equation">
    $$\int_{\partial M}\omega=\int_M d\omega, \qquad d^2=0$$
  </div>

  <div class="art-quote">
    <p>Differential forms turn orientation, boundary, and change of variables into one calculus: the exterior derivative records what a form contributes on the boundary.</p>
  </div>

  <ul class="art-list">
    {%- for item in df_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

{% include sheaf_cohomology_articles_tab.html %}

<!-- ── Riemann-Roch ───────────────────────────────────────────────────── -->

<div class="art-section" id="riemann-roch">
  <div class="art-section-header">
    <span class="art-section-title">Riemann-Roch</span>
  </div>

  <div class="art-equation">
    $$\ell(D)-\ell(K-D)=\deg(D)+1-g$$
  </div>

  <div class="art-quote">
    <p>A divisor records the requested zeros and allowed poles; Riemann-Roch turns that data, together with the genus, into an exact dimension count.</p>
  </div>

  <ul class="art-list">
    {%- for item in rr_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

<!-- ── Cryptography ───────────────────────────────────────────────────── -->
<div class="art-section" id="cryptography">
  <div class="art-section-header">
    <span class="art-section-title">Cryptography</span>
  </div>

  <div class="art-equation">
    $$\operatorname{Adv}^{\mathrm{IND\text{-}CPA}}_{\mathcal{A}}(\Pi) \;:=\; \left|\Pr\!\left[\mathsf{Game}^{\mathrm{IND\text{-}CPA}}_{\Pi,\mathcal{A}}(1^\lambda)=1\right]-\tfrac{1}{2}\right|$$
  </div>

  <div class="art-quote">
    <p>In modern security definitions, a construction is considered secure if every efficient adversary's advantage in a well-specified experiment is negligible as a function of the security parameter. This viewpoint makes cryptographic claims precise, composable, and testable against explicit threat models.</p>
  </div>

  <ul class="art-list">
    {%- for item in crypto_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
        <!-- {%- if item.date -%}<span class="art-date">{{ item.date | date: "%Y-%m-%d" }}</span>{%- endif -%} -->
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>


<!-- -- Provable Security -------------------------------------------------- -->
<div class="art-section" id="provable-security">
  <div class="art-section-header">
    <span class="art-section-title">Provable Security</span>
  </div>

  <div class="art-equation">
    $$\operatorname{Adv}^{\mathsf{scheme}}_{A}(\lambda)\le q(\lambda)\operatorname{Adv}^{\mathsf{assumption}}_{B}(\lambda)+\varepsilon(\lambda)$$
  </div>

  <div class="art-quote">
    <p>A proof in cryptography is a reduction: it states which attack game is being ruled out, which assumption is being invoked, and how much quantitative security is lost in the translation.</p>
  </div>

  <ul class="art-list">
    {%- for item in ps_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>


<!-- -- Coding Theory -------------------------------------------------- -->
<div class="art-section" id="coding-theory">
  <div class="art-section-header">
    <span class="art-section-title">Coding Theory</span>
  </div>

  <div class="art-equation">
    $$C_L(D,G)=\{(f(P_1),\ldots,f(P_n)): f\in L(G)\}, \qquad C_\Omega(D,G)=C_L(D,G)^\perp$$
  </div>

  <div class="art-quote">
    <p>Error-correcting codes become geometric when codewords are evaluations of functions and parity checks are residues of differentials.</p>
  </div>

  <ul class="art-list">
    {%- for item in ct_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

<!-- -- Bignum Arithmetic -------------------------------------------------- -->
<div class="art-section" id="bignum-arithmetic">
  <div class="art-section-header">
    <span class="art-section-title">Bignum Arithmetic</span>
  </div>
  <div class="art-equation">
    $$\operatorname{val}_B(a)=\sum_{i=0}^{n-1}a_iB^i,\qquad B=2^{16}$$
  </div>
  <div class="art-quote">
    <p>A cryptographic bignum primitive is a proof-carrying C program: every word operation must preserve the integer invariant and the leakage boundary.</p>
  </div>
  <ul class="art-list">
    {%- for item in bn_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>
<!-- -- Elliptic Arithmetic -------------------------------------------------- -->
<div class="art-section" id="elliptic-arithmetic">
  <div class="art-section-header">
    <span class="art-section-title">Elliptic Arithmetic</span>
  </div>
  <div class="art-equation">
    $$E/\mathbb F_p:\ y^2=x^3+ax+b,\qquad [k]P=P+\cdots+P$$
  </div>
  <div class="art-quote">
    <p>Elliptic-curve arithmetic is the group-law layer above bignum field arithmetic: words implement residues, residues implement points, and points implement public-key primitives.</p>
  </div>
  <ul class="art-list">
    {%- for item in ec_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>
<!-- ── Programming ───────────────────────────────────────────────────── -->
<div class="art-section" id="programming">
  <div class="art-section-header">
    <span class="art-section-title">Programming</span>
  </div>

  <div class="art-equation">
    $$\text{Program} = \text{Algorithms} + \text{Data Structures}$$
  </div>

  <div class="art-quote">
    <p>"Programs must be written for people to read, and only incidentally for machines to execute."</p>
    <span class="quote-author">Harold Abelson, <a href="https://web.mit.edu/6.001/6.037/sicp.pdf" target="_blank" rel="noopener noreferrer"><em>Structure and Interpretation of Computer Programs</em></a></span>
  </div>

  <ul class="art-list">
    {%- for item in prog_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
        <!-- {%- if item.date -%}<span class="art-date">{{ item.date | date: "%Y-%m-%d" }}</span>{%- endif -%} -->
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

<!-- ── E.T.C. ────────────────────────────────────────────────────────── -->
<div class="art-section" id="etc">
  <div class="art-section-header">
    <span class="art-section-title">E.T.C.</span>
  </div>

  <ul class="art-list">
    {%- for item in etc_articles -%}
    <li class="art-row">
      <a class="art-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
      {%- if item.topics -%}
      <p class="art-topics">{{ item.topics }}</p>
      {%- endif -%}
      <div class="art-right">
        {%- if item.tags -%}
        <div class="art-chips">{%- for tag in item.tags -%}<span class="art-chip">{{ tag }}</span>{%- endfor -%}</div>
        {%- endif -%}
        <!-- {%- if item.date -%}<span class="art-date">{{ item.date | date: "%Y-%m-%d" }}</span>{%- endif -%} -->
      </div>
    </li>
    {%- endfor -%}
  </ul>
</div>

</div>
</div>
