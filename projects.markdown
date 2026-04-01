---
layout: page
title: Projects
permalink: /projects/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* ── Full-bleed wrapper ── */
.proj-page {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: clamp(1rem, 5vw, 3rem);
  padding-right: clamp(1rem, 5vw, 3rem);
  box-sizing: border-box;
}

/* ── Projects page ─────────────────────────────────────────────────────── */
.proj-section { margin-top: 2rem; }
.proj-section:first-of-type { margin-top: 0.5rem; }

/* Section header */
.proj-section-header {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.75rem;
}
.proj-section-header::before {
  content: '';
  flex-shrink: 0;
  width: 3px;
  height: 1em;
  background: linear-gradient(180deg, #0066cc 0%, #004499 100%);
  border-radius: 2px;
}
.proj-section-title {
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #374151;
  margin: 0;
}

/* Card stack */
.proj-cards {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* Individual card */
.proj-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 3px solid #0066cc;
  border-radius: 0 6px 6px 0;
  padding: 0.65rem 1rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-left-color 0.15s ease;
}
.proj-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 102, 204, 0.09);
  border-left-color: #004499;
}
.proj-card.past { border-left-color: #cbd5e1; }
.proj-card.past:hover {
  border-left-color: #94a3b8;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

/* Top row: period + badge */
.proj-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.proj-period {
  font-family: var(--font-mono, monospace);
  font-size: 0.67rem;
  font-weight: 500;
  color: #374151;
  letter-spacing: 0.03em;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.1em 0.5em;
  white-space: nowrap;
}
.proj-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-size: 0.60rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.15em 0.55em;
  white-space: nowrap;
}
.proj-badge::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.proj-badge.active  { color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; }
.proj-badge.active::before  { background: #059669; }
.proj-badge.done    { color: #6b7280; background: #f9fafb; border: 1px solid #e5e7eb; }
.proj-badge.done::before    { background: #d1d5db; }

/* Title */
.proj-title-link {
  font-size: 0.90rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  line-height: 1.4;
  display: block;
}
.proj-title-link:hover { color: #0066cc; }

/* Description */
.proj-desc {
  font-size: 0.79rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.55;
}

/* Footer: tags + arrow */
.proj-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.1rem;
}
.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.proj-tag {
  font-size: 0.63rem;
  font-family: var(--font-mono, monospace);
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  padding: 0.05em 0.42em;
}
.proj-arrow {
  font-size: 0.75rem;
  color: #9ca3af;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.12s;
}
.proj-arrow:hover { color: #0066cc; }

/* Responsive */
@media (max-width: 540px) {
  .proj-card { padding: 0.55rem 0.85rem 0.5rem; }
  .proj-title-link { font-size: 0.85rem; }
}
</style>

{%- assign all_projects = site.projects | reverse -%}

<div class="proj-section">
  <div class="proj-section-header">
    <span class="proj-section-title">Current Research</span>
  </div>
  <div class="proj-cards">
    {%- for p in all_projects -%}
      {%- assign end_year = p.year | split: ' ' | last | slice: 0, 4 -%}
      {%- if end_year == '20xx' or end_year >= '2026' -%}
    <div class="proj-card">
      <div class="proj-meta">
        <span class="proj-period">{{ p.year }}</span>
        <span class="proj-badge active">Active</span>
      </div>
      <a class="proj-title-link" href="{{ p.url | relative_url }}">{{ p.project }}</a>
      {%- if p.short and p.short != 'TBA' -%}
      <p class="proj-desc">{{ p.short }}</p>
      {%- endif -%}
      <div class="proj-footer">
        <div class="proj-tags">
          {%- for tag in p.tags -%}<span class="proj-tag">{{ tag }}</span>{%- endfor -%}
        </div>
        <a class="proj-arrow" href="{{ p.url | relative_url }}">View project &rarr;</a>
      </div>
    </div>
      {%- endif -%}
    {%- endfor -%}
  </div>
</div>

<div class="proj-section">
  <div class="proj-section-header">
    <span class="proj-section-title">Past Projects</span>
  </div>
  <div class="proj-cards">
    {%- for p in all_projects -%}
      {%- assign end_year = p.year | split: ' ' | last | slice: 0, 4 -%}
      {%- unless end_year == '20xx' or end_year >= '2026' -%}
    <div class="proj-card past">
      <div class="proj-meta">
        <span class="proj-period">{{ p.year }}</span>
        <span class="proj-badge done">Completed</span>
      </div>
      <a class="proj-title-link" href="{{ p.url | relative_url }}">{{ p.project }}</a>
      {%- if p.short and p.short != 'TBA' -%}
      <p class="proj-desc">{{ p.short }}</p>
      {%- endif -%}
      <div class="proj-footer">
        <div class="proj-tags">
          {%- for tag in p.tags -%}<span class="proj-tag">{{ tag }}</span>{%- endfor -%}
        </div>
        <a class="proj-arrow" href="{{ p.url | relative_url }}">View project &rarr;</a>
      </div>
    </div>
      {%- endunless -%}
    {%- endfor -%}
  </div>
</div>
