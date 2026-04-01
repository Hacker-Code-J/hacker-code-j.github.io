---
layout: page
title: Preprints
permalink: /preprints/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* ── Preprints page ─────────────────────────────────────────────────────── */
.pre-list {
  list-style: none;
  padding: 0;
  margin: 1.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

/* ── Card ── */
.pre-card {
  position: relative;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem 1.25rem 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
/* Gradient top stripe */
.pre-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0066cc 0%, #60a5fa 60%, #a78bfa 100%);
}
.pre-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.09);
}

/* ── Top row: year + badge ── */
.pre-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.pre-year {
  font-family: var(--font-mono, monospace);
  font-size: 0.67rem;
  font-weight: 600;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.1em 0.5em;
}
.pre-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-size: 0.60rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.15em 0.6em;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}
.pre-badge::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
}

/* ── Title ── */
.pre-title-link {
  font-size: 0.94rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  line-height: 1.5;
  letter-spacing: -0.01em;
  display: block;
}
.pre-title-link:hover { color: #0066cc; }

/* ── Authors ── */
.pre-authors {
  font-size: 0.77rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.55;
}
.pre-authors strong { color: #1d4ed8; font-weight: 600; }

/* ── Venue badge ── */
.pre-venue-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 500;
  font-style: italic;
  color: #6b7280;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.12em 0.55em;
  align-self: flex-start;
}

/* ── Abstract ── */
.pre-abstract {
  font-size: 0.77rem;
  color: #6b7280;
  line-height: 1.68;
  margin: 0.1rem 0 0;
  padding: 0.5rem 0.85rem;
  background: #f8faff;
  border-left: 2px solid #bfdbfe;
  border-radius: 0 4px 4px 0;
}

/* ── Buttons ── */
.pre-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.15rem;
}
.pre-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.28em;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.22em 0.7em;
  border-radius: 4px;
  border: 1px solid;
  transition: background 0.12s, transform 0.1s;
  white-space: nowrap;
}
.pre-btn:hover { transform: translateY(-1px); }
.pre-btn-arxiv  { color: #92400e; border-color: #fcd34d; background: #fffbeb; }
.pre-btn-arxiv:hover  { background: #fef3c7; }
.pre-btn-pdf    { color: #991b1b; border-color: #fca5a5; background: #fef2f2; }
.pre-btn-pdf:hover    { background: #fee2e2; }
.pre-btn-detail { color: #374151; border-color: #d1d5db; background: #f9fafb; }
.pre-btn-detail:hover { background: #f3f4f6; }

/* Responsive */
@media (max-width: 500px) {
  .pre-card { padding: 0.9rem 1rem 0.85rem; }
  .pre-title-link { font-size: 0.88rem; }
}
</style>

{%- assign preprints = site.preprints | sort: 'year' | reverse -%}

<ul class="pre-list">
  {%- for pub in preprints -%}
  {%- if pub.title and pub.title != 'Preprint - New Results' -%}
  <li>
    <div class="pre-card">
      <div class="pre-meta">
        <span class="pre-year">{{ pub.year }}</span>
        <span class="pre-badge">Preprint</span>
      </div>
      <a class="pre-title-link" href="{{ pub.url | relative_url }}">{{ pub.title }}</a>
      {%- if pub.authors -%}
      <p class="pre-authors">{{ pub.authors }}</p>
      {%- endif -%}
      {%- if pub.venue -%}
      <span class="pre-venue-badge">{{ pub.venue }}</span>
      {%- endif -%}
      {%- if pub.short -%}
      <p class="pre-abstract">{{ pub.short }}</p>
      {%- endif -%}
      <div class="pre-footer">
        {%- if pub.link -%}
        <a class="pre-btn pre-btn-arxiv" href="{{ pub.link }}" target="_blank" rel="noopener noreferrer">arXiv ↗</a>
        {%- endif -%}
        {%- if pub.pdf -%}
        <a class="pre-btn pre-btn-pdf" href="{{ pub.pdf }}" target="_blank" rel="noopener noreferrer">PDF ↗</a>
        {%- endif -%}
        <a class="pre-btn pre-btn-detail" href="{{ pub.url | relative_url }}">Details →</a>
      </div>
    </div>
  </li>
  {%- endif -%}
  {%- endfor -%}
</ul>
