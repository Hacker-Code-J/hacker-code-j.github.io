---
layout: page
title: Articles
permalink: /articles/
---
<link rel="stylesheet" href="/assets/css/custom.css">
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<style>
/* ── Sticky nav ── */
.art-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  margin: 0 -1rem 0 -1rem;
  padding: 0 1rem;
}
.art-nav-inner {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.art-nav-inner::-webkit-scrollbar { display: none; }
.art-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.6rem 0.85rem;
  font-size: 0.73rem;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
}
.art-nav-link:hover { color: #1f2937; border-bottom-color: #d1d5db; }
.art-nav-link.active { color: #0066cc; border-bottom-color: #0066cc; }
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

/* ── Articles page ─────────────────────────────────────────────────────── */
.art-section { margin-top: 2.2rem; }
.art-section:first-of-type { margin-top: 1.5rem; }

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
</style>

{%- assign math_articles   = site.articles | where_exp: "item", "item.path contains '/mathematics/'"  | sort: 'title' -%}
{%- assign crypto_articles = site.articles | where_exp: "item", "item.path contains '/cryptography/'" | sort: 'title' -%}
{%- assign prog_articles   = site.articles | where_exp: "item", "item.path contains '/programmings/'" | sort: 'title' -%}
{%- assign etc_articles    = site.articles | where_exp: "item", "item.path contains '/etc/'"          | sort: 'title' -%}

<nav class="art-nav" aria-label="Article sections">
  <div class="art-nav-inner">
    <a class="art-nav-link" href="#mathematics">Mathematics <span class="nav-count">{{ math_articles | size }}</span></a>
    <a class="art-nav-link" href="#cryptography">Cryptography <span class="nav-count">{{ crypto_articles | size }}</span></a>
    <a class="art-nav-link" href="#programming">Programming <span class="nav-count">{{ prog_articles | size }}</span></a>
    <a class="art-nav-link" href="#etc">E.T.C. <span class="nav-count">{{ etc_articles | size }}</span></a>
  </div>
</nav>

<script>
(function () {
  const links = document.querySelectorAll('.art-nav-link');
  const ids = ['mathematics','cryptography','programming','etc'];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector('.art-nav-link[href="#' + e.target.id + '"]');
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -75% 0px' });
  document.addEventListener('DOMContentLoaded', () => {
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    if (links.length) links[0].classList.add('active');
  });
  links.forEach(l => l.addEventListener('click', e => {
    const id = l.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
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
