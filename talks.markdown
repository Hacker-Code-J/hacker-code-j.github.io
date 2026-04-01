---
layout: page
title: Talks
permalink: /talks/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* ── Talks page ─────────────────────────────────────────────────────────── */

/* ── Sticky year nav ── */
.talk-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  margin: 0 -1rem;
  padding: 0 1rem;
}
.talk-nav-inner {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.talk-nav-inner::-webkit-scrollbar { display: none; }
.talk-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.58rem 0.85rem;
  font-size: 0.73rem;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
}
.talk-nav-link:hover { color: #1f2937; border-bottom-color: #d1d5db; }
.talk-nav-link.active { color: #0891b2; border-bottom-color: #0891b2; }
.talk-nav-link .nav-count {
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
.talk-nav-link.active .nav-count {
  background: #cffafe;
  border-color: #a5f3fc;
  color: #0e7490;
}

/* ── Year section ── */
.talk-year-section { margin-top: 2rem; }
.talk-year-section:first-of-type { margin-top: 1.5rem; }

.talk-year-header {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.8rem;
}
.talk-year-header::before {
  content: '';
  flex-shrink: 0;
  width: 3px;
  height: 1em;
  background: linear-gradient(180deg, #0891b2 0%, #0e7490 100%);
  border-radius: 2px;
}
.talk-year-label {
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #374151;
  margin: 0;
}
.talk-year-count {
  font-family: var(--font-mono, monospace);
  font-size: 0.60rem;
  color: #9ca3af;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0.1em 0.55em;
}

/* ── Card grid ── */
.talk-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.65rem;
}

/* ── Card ── */
.talk-list > li { display: flex; }
.talk-card {
  position: relative;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  padding: 0.85rem 1.2rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
}
.talk-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0891b2 0%, #06b6d4 55%, #67e8f9 100%);
}
.talk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(8,145,178,0.10);
}

/* ── Top row: date + badge ── */
.talk-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.talk-date {
  font-family: var(--font-mono, monospace);
  font-size: 0.67rem;
  font-weight: 600;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.1em 0.5em;
  white-space: nowrap;
}
.talk-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-size: 0.60rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.15em 0.6em;
  color: #0e7490;
  background: #ecfeff;
  border: 1px solid #a5f3fc;
  white-space: nowrap;
}
.talk-badge::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #06b6d4;
  flex-shrink: 0;
}

/* ── Title ── */
.talk-title-link {
  font-size: 0.92rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  line-height: 1.45;
  letter-spacing: -0.01em;
  display: block;
}
.talk-title-link:hover { color: #0891b2; }

/* ── Event + location ── */
.talk-where {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.3rem 0.5rem;
  margin: 0;
}
.talk-event   { font-size: 0.79rem; font-weight: 600; color: #374151; }
.talk-location { font-size: 0.74rem; color: #9ca3af; }
.talk-location::before { content: '· '; }

/* ── Tags ── */
.talk-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.talk-chip {
  font-size: 0.63rem;
  font-family: var(--font-mono, monospace);
  color: #4b5563;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  padding: 0.05em 0.42em;
}

/* Push footer to bottom of card */
.talk-card .talk-footer { margin-top: auto; padding-top: 0.4rem; }

/* ── Buttons ── */
.talk-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  margin-top: 0.1rem;
}
.talk-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.28em;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.2em 0.65em;
  border-radius: 4px;
  border: 1px solid;
  transition: background 0.12s, transform 0.1s;
  white-space: nowrap;
}
.talk-btn:hover { transform: translateY(-1px); }
.talk-btn-slides    { color: #1e40af; border-color: #93c5fd; background: #eff6ff; }
.talk-btn-slides:hover    { background: #dbeafe; }
.talk-btn-recording { color: #7c3aed; border-color: #c4b5fd; background: #f5f3ff; }
.talk-btn-recording:hover { background: #ede9fe; }
.talk-btn-detail    { color: #374151; border-color: #d1d5db; background: #f9fafb; }
.talk-btn-detail:hover    { background: #f3f4f6; }

/* Responsive */
@media (max-width: 500px) {
  .talk-card { padding: 0.75rem 0.9rem 0.7rem; }
  .talk-title-link { font-size: 0.86rem; }
}
</style>

{%- assign all_talks = site.talks | sort: 'date' | reverse -%}
{%- assign year_str = "" -%}
{%- for item in all_talks -%}
  {%- assign y = item.date | date: "%Y" -%}
  {%- assign year_str = year_str | append: y | append: "," -%}
{%- endfor -%}
{%- assign years = year_str | split: "," | uniq -%}

<nav class="talk-nav" aria-label="Talk years">
  <div class="talk-nav-inner">
    {%- for year in years -%}
    {%- assign count = 0 -%}
    {%- for item in all_talks -%}
      {%- assign iy = item.date | date: "%Y" -%}
      {%- if iy == year -%}{%- assign count = count | plus: 1 -%}{%- endif -%}
    {%- endfor -%}
    <a class="talk-nav-link" href="#year-{{ year }}">{{ year }} <span class="nav-count">{{ count }}</span></a>
    {%- endfor -%}
  </div>
</nav>

<script>
(function () {
  const links = document.querySelectorAll('.talk-nav-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector('.talk-nav-link[href="#' + e.target.id + '"]');
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -80% 0px' });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.talk-year-section').forEach(el => obs.observe(el));
    if (links.length) links[0].classList.add('active');
  });
  links.forEach(l => l.addEventListener('click', e => {
    const target = document.querySelector(l.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
})();
</script>

{%- for year in years -%}
<div class="talk-year-section" id="year-{{ year }}">
  <div class="talk-year-header">
    <span class="talk-year-label">{{ year }}</span>
    {%- assign count = 0 -%}
    {%- for item in all_talks -%}
      {%- assign iy = item.date | date: "%Y" -%}
      {%- if iy == year -%}{%- assign count = count | plus: 1 -%}{%- endif -%}
    {%- endfor -%}
    <span class="talk-year-count">{{ count }}</span>
  </div>
  <ul class="talk-list">
    {%- for item in all_talks -%}
    {%- assign iy = item.date | date: "%Y" -%}
    {%- if iy == year -%}
    <li>
      <div class="talk-card">
        <div class="talk-meta">
          <span class="talk-date">{{ item.date | date: "%b %d, %Y" }}</span>
          <span class="talk-badge">Talk</span>
        </div>
        <a class="talk-title-link" href="{{ item.url | relative_url }}">{{ item.title }}</a>
        <p class="talk-where">
          {%- if item.event -%}<span class="talk-event">{{ item.event }}</span>{%- endif -%}
          {%- if item.location -%}<span class="talk-location">{{ item.location }}</span>{%- endif -%}
        </p>
        {%- if item.tags -%}
        <div class="talk-chips">
          {%- for tag in item.tags -%}<span class="talk-chip">{{ tag }}</span>{%- endfor -%}
        </div>
        {%- endif -%}
        <div class="talk-footer">
          {%- if item.slides -%}
          <a class="talk-btn talk-btn-slides" href="{{ item.slides }}" target="_blank" rel="noopener noreferrer">Slides ↗</a>
          {%- endif -%}
          {%- if item.recording -%}
          <a class="talk-btn talk-btn-recording" href="{{ item.recording }}" target="_blank" rel="noopener noreferrer">Recording ↗</a>
          {%- endif -%}
          <a class="talk-btn talk-btn-detail" href="{{ item.url | relative_url }}">Details →</a>
        </div>
      </div>
    </li>
    {%- endif -%}
    {%- endfor -%}
  </ul>
</div>
{%- endfor -%}
