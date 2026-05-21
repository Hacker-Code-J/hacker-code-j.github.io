---
layout: home
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* Homepage design tokens */
:root {
  --c-accent : #2563eb;
  --c-navy   : #1e3a5f;
  --c-muted  : #6b7280;
  --c-border : #e5e7eb;
  --c-soft   : #f8fafc;
  --idx-radius: 10px;
  --idx-shadow: 0 12px 28px rgba(30,58,95,.10);
}

.idx-home {
  color: #374151;
}

.idx-home h1,
.idx-home h2 {
  letter-spacing: 0;
}

.idx-home a {
  text-underline-offset: .16em;
}

/* Profile */
.idx-profile {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  align-items: center;
  gap: 2.2rem;
  margin: 2.6rem 0 1.8rem;
}

.idx-portrait-link {
  display: block;
  max-width: 220px;
}

.idx-portrait {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--idx-radius);
  border: 1px solid #dbeafe;
  box-shadow: var(--idx-shadow);
}

.idx-profile-body {
  min-width: 0;
}

.idx-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .65rem;
  margin: 0 0 .35rem;
  color: var(--c-navy);
  font-size: 2rem;
  line-height: 1.1;
}

.idx-hit-counter {
  display: inline-flex;
  align-items: center;
  max-width: 110px;
}

.idx-hit-counter img {
  display: block;
  max-width: 100%;
  max-height: 20px;
}

.idx-affiliation {
  margin: 0 0 1rem;
  color: var(--c-muted);
  font-size: .95em;
  line-height: 1.55;
}

.idx-affiliation a {
  color: var(--c-accent);
  font-weight: 600;
  text-decoration: none;
}

.idx-affiliation a:hover {
  text-decoration: underline;
}

.idx-interest {
  margin-bottom: 1rem;
}

.idx-kicker {
  margin-bottom: .42rem;
  color: #9ca3af;
  font-size: .72em;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
}

.idx-badges {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

.idx-interest-groups {
  display: grid;
  gap: .42rem;
}

.idx-interest-group {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: .55rem;
  align-items: start;
}

.idx-interest-label {
  padding-top: .18rem;
  color: #64748b;
  font-size: .7em;
  font-weight: 800;
  letter-spacing: .06em;
  line-height: 1.25;
  text-transform: uppercase;
}

/* Research-interest badges */
.idx-badge {
  display: inline-block;
  border-radius: 999px;
  padding: .22rem .65rem;
  font-size: .78em;
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
}
.badge-math { background: #ede9fe; color: #5b21b6; border-color: #c4b5fd; }
.badge-code { background: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.badge-sec  { background: #fce7f3; color: #9d174d; border-color: #f9a8d4; }
.badge-qec  { background: #e0f2fe; color: #075985; border-color: #7dd3fc; }

/* Social / contact buttons */
.idx-social {
  display: flex;
  align-items: center;
  gap: .55rem;
  flex-wrap: wrap;
}

.idx-social a {
  display: inline-flex;
  align-items: center;
  gap: .38rem;
  min-height: 34px;
  padding: .36rem .8rem;
  border-radius: 8px;
  color: #374151;
  font-size: .84em;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--c-border);
  transition: background .2s, color .2s, border-color .2s, transform .2s;
}

.idx-social a:hover,
.idx-social a:focus {
  background: var(--c-accent);
  color: #fff;
  border-color: var(--c-accent);
  transform: translateY(-1px);
}

.idx-social svg {
  flex: 0 0 auto;
}

/* Sticky nav */
.idx-nav-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  margin: 1.8rem 0 0;
  padding: .55rem 0;
  background: var(--background-color, #fff);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  box-shadow: 0 8px 22px rgba(30,58,95,.06);
}

.idx-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: .35rem;
  padding: 0 .5rem;
}

.idx-nav a {
  border-radius: 999px;
  color: var(--c-muted);
  font-size: .86em;
  font-weight: 700;
  line-height: 1;
  padding: .44rem .9rem;
  text-decoration: none;
  transition: color .2s, background .2s;
}

.idx-nav a:hover,
.idx-nav a:focus {
  color: var(--c-accent);
  background: #eff6ff;
}

/* Section headings */
.idx-h2 {
  display: flex;
  align-items: center;
  gap: .55rem;
  scroll-margin-top: 5rem;
  margin: 2.35rem 0 .65rem;
  padding-bottom: .5rem;
  color: var(--c-navy);
  font-size: 1.55rem;
  line-height: 1.25;
  border-bottom: 1px solid var(--c-border);
}

.idx-h2::before {
  content: '';
  display: inline-block;
  flex-shrink: 0;
  width: 4px;
  height: 1.05em;
  border-radius: 2px;
  background: var(--c-accent);
}

.idx-h2 a { text-decoration: none; color: inherit; }
.idx-h2 a:hover { color: var(--c-accent); }

/* Entry cards */
.idx-section-list {
  margin: .65rem 0 1.35rem;
}

.idx-entry {
  margin: .35rem 0;
  padding: .7rem .85rem;
  border-left: 2px solid var(--c-border);
  border-radius: 0 8px 8px 0;
  transition: border-color .2s, background .2s, transform .2s;
}

.idx-entry:hover {
  background: #f5f9ff;
  border-left-color: var(--c-accent);
  transform: translateX(2px);
}

.entry-year {
  display: inline-block;
  margin-right: .45rem;
  padding: .08rem .4rem;
  color: var(--c-accent);
  font-size: .72em;
  font-weight: 700;
  white-space: nowrap;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  vertical-align: middle;
}

.entry-year-green {
  background: #f0fdf4;
  color: #166534;
  border-color: #bbf7d0;
}

.entry-title {
  color: var(--c-navy);
  font-size: .98em;
  font-weight: 700;
  line-height: 1.35;
  text-decoration: none;
}

.entry-title:hover { color: var(--c-accent); text-decoration: underline; }

.entry-short {
  max-width: 72ch;
  margin-top: .18rem;
  color: var(--c-muted);
  font-size: .86em;
  line-height: 1.55;
}

.entry-links {
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
  margin-top: .35rem;
}

.entry-links a {
  padding: .08rem .42rem;
  color: #374151;
  font-size: .76em;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  transition: background .15s, color .15s;
}

.entry-links a:hover { background: var(--c-accent); color: #fff; border-color: var(--c-accent); }

/* Education timeline */
.idx-education {
  margin: .8rem 0 1.5rem;
  padding-left: .1rem;
}

.edu-item {
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: .85rem;
  align-items: flex-start;
  margin-bottom: .85rem;
}

.edu-dot    {
  width: 9px;
  height: 9px;
  margin-top: .45em;
  background: var(--c-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 4px #bfdbfe;
}
.edu-dot.muted { background: #9ca3af; box-shadow: 0 0 0 3px #e5e7eb; }
.edu-period {
  color: var(--c-accent);
  font-size: .78em;
  font-weight: 800;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.edu-period.muted { color: #9ca3af; }
.edu-degree {
  margin: .12rem 0 0;
  color: var(--c-navy);
  font-size: .98em;
  font-weight: 700;
}
.edu-sub {
  margin: .12rem 0 0;
  color: var(--c-muted);
  font-size: .86em;
  line-height: 1.5;
}

/* Intro split layout */
.idx-intro-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  align-items: center;
  gap: 1.6rem;
  margin: 1.35rem 0 2.35rem;
}
.idx-intro-text {
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--c-accent);
  background: var(--c-soft);
  border-radius: 0 var(--idx-radius) var(--idx-radius) 0;
  font-size: .92em;
  line-height: 1.7;
  color: #374151;
}
.idx-intro-sign {
  justify-self: end;
  width: 100%;
  max-width: 260px;
  border-radius: var(--idx-radius);
  overflow: hidden;
}
.idx-intro-sign img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* SageMath illustration atlas */
.idx-math-atlas {
  margin: 1.5rem 0 2.45rem;
  padding: .2rem 0;
  color: #334155;
}

.idx-math-atlas__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: .85rem;
  padding-bottom: .65rem;
  border-bottom: 1px solid var(--c-border);
}

.idx-math-atlas__head h2 {
  margin: 0;
  color: var(--c-navy);
  font-size: 1.18rem;
  line-height: 1.2;
}

.idx-math-atlas__head p {
  max-width: 34rem;
  margin: 0;
  color: var(--c-muted);
  font-size: .82em;
  line-height: 1.45;
  text-align: right;
}

.idx-math-atlas__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: .9rem;
  perspective: 1100px;
}

.ma-panel {
  --ma-hot-x: 50%;
  --ma-hot-y: 50%;
  --ma-tilt-x: 0deg;
  --ma-tilt-y: 0deg;
  position: relative;
  grid-column: span 3;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: .58rem;
  min-height: 292px;
  margin: 0;
  padding: .82rem;
  overflow: hidden;
  background:
    radial-gradient(circle at var(--ma-hot-x) var(--ma-hot-y), rgba(20,184,166,.12), transparent 34%),
    linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,250,252,.96));
  border: 1px solid #dbe3ee;
  border-radius: 8px;
  box-shadow: 0 12px 26px rgba(30,58,95,.08);
  transform: rotateX(var(--ma-tilt-x)) rotateY(var(--ma-tilt-y)) translateZ(0);
  transform-style: preserve-3d;
  transition: border-color .2s, box-shadow .2s, transform .16s ease-out;
}

.ma-panel:nth-child(n+3) {
  grid-column: span 2;
  min-height: 268px;
}

.ma-panel::after {
  content: "";
  position: absolute;
  inset: auto .9rem .55rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(37,99,235,.34), transparent);
  opacity: 0;
  transform: scaleX(.6);
  transition: opacity .2s, transform .2s;
}

.ma-panel:hover,
.ma-panel:focus,
.ma-panel.is-active {
  border-color: #bfdbfe;
  box-shadow: 0 18px 36px rgba(30,58,95,.13);
  outline: none;
}

.ma-panel:hover::after,
.ma-panel:focus::after,
.ma-panel.is-active::after {
  opacity: 1;
  transform: scaleX(1);
}

.ma-panel__meta {
  display: grid;
  gap: .18rem;
  min-width: 0;
}

.ma-panel__meta figcaption {
  color: var(--c-navy);
  font-size: .92rem;
  font-weight: 800;
  line-height: 1.2;
}

.ma-formula {
  display: block;
  overflow: hidden;
  color: #64748b;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: .68rem;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ma-canvas {
  position: relative;
  aspect-ratio: 16 / 11.5;
  min-height: 176px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(226,232,240,.9);
  border-radius: 7px;
  transform: translateZ(20px);
}

.ma-panel:nth-child(n+3) .ma-canvas {
  min-height: 154px;
}

.ma-canvas img,
.ma-canvas svg {
  display: block;
  width: 100%;
  height: 100%;
}

.ma-canvas img {
  object-fit: contain;
}

.ma-facts {
  display: flex;
  flex-wrap: wrap;
  gap: .28rem;
  min-height: 1.3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ma-facts li {
  padding: .12rem .42rem;
  color: #475569;
  font-size: .62rem;
  font-weight: 800;
  line-height: 1.25;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
}

.ma-svg {
  background:
    radial-gradient(circle at 74% 20%, rgba(245,158,11,.08), transparent 28%),
    radial-gradient(circle at 16% 78%, rgba(20,184,166,.09), transparent 28%),
    #fff;
}

.ma-bg-grid path {
  fill: none;
  stroke: rgba(148,163,184,.22);
  stroke-width: .45;
  stroke-dasharray: 2 9;
  animation: ma-grid-breathe 8s ease-in-out infinite;
}

.ma-line,
.ma-edge,
.ma-link-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.ma-line {
  stroke: #94a3b8;
  stroke-width: 1.1;
  stroke-dasharray: 380;
  stroke-dashoffset: 380;
  animation: ma-draw 1.2s cubic-bezier(.16,1,.3,1) forwards;
  transition: opacity .2s linear, stroke-width .2s linear;
}

.ma-line--heavy {
  stroke-width: 2.3;
}

.ma-line--accent {
  stroke: var(--c-accent);
}

.ma-line--teal {
  stroke: #0f766e;
}

.ma-line--soft {
  stroke: #93c5fd;
  opacity: .86;
}

.ma-line--ghost {
  stroke: #cbd5e1;
  stroke-width: .75;
  opacity: .78;
}

.ma-edge {
  stroke-width: 2.6;
  opacity: .78;
  transition: opacity .18s linear, stroke-width .18s linear;
}

.ma-edge--a { stroke: #2563eb; }
.ma-edge--b { stroke: #0f766e; stroke-dasharray: 6 5; }

.ma-surface {
  stroke: #2563eb;
  stroke-width: 1.1;
}

.ma-surface--blue {
  fill: rgba(219,234,254,.62);
}

.ma-plane-shape {
  fill: rgba(240,253,250,.86);
  stroke: #99f6e4;
  stroke-width: 1;
}

.ma-sphere-rim {
  fill: rgba(248,250,252,.35);
  stroke: var(--c-navy);
  stroke-width: 1.45;
  filter: drop-shadow(0 7px 14px rgba(30,58,95,.10));
}

.ma-dot {
  fill: var(--c-accent);
  stroke: #fff;
  stroke-width: 1;
  filter: drop-shadow(0 1px 4px rgba(37,99,235,.28));
  transition: opacity .18s linear, r .18s linear;
}

.ma-dot--soft { fill: #64748b; opacity: .78; }
.ma-dot--plane { fill: #0f766e; }
.ma-dot--amber,
.ma-tracer--amber { fill: #f59e0b; }
.ma-dot--rose { fill: #be123c; }
.ma-dot--navy { fill: var(--c-navy); }
.ma-dot--sum { fill: #0f766e; }

.ma-tracer {
  fill: #14b8a6;
  stroke: #fff;
  stroke-width: 1.1;
  filter: drop-shadow(0 0 6px rgba(20,184,166,.5));
}

.ma-tracer--rose {
  fill: #be123c;
  filter: drop-shadow(0 0 6px rgba(190,18,60,.45));
}

.ma-link-line {
  stroke: rgba(100,116,139,.36);
  stroke-width: .7;
  stroke-dasharray: 4 5;
  transition: opacity .18s linear, stroke-width .18s linear;
}

.ma-label {
  fill: #334155;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0;
}

.ma-label--title {
  fill: var(--c-navy);
  font-size: 13px;
}

.ma-label--small {
  font-size: 10px;
}

.ma-label--tiny {
  font-size: 8px;
}

.ma-label--mono {
  fill: #64748b;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 8px;
  font-weight: 700;
}

.ma-equation {
  fill: rgba(248,250,252,.9);
  stroke: #dbeafe;
  stroke-width: 1;
  transition: opacity .18s linear, stroke-width .18s linear;
}

.ma-equation--thin {
  fill: rgba(255,255,255,.9);
}

.ma-cell {
  fill: #f8fafc;
  stroke: #e2e8f0;
  stroke-width: .55;
  transition: opacity .16s linear;
}

.ma-cell--on {
  fill: #2563eb;
  stroke: #dbeafe;
  animation: ma-cell-glow 3.4s ease-in-out infinite;
}

.ma-matrix--goppa .ma-cell--on {
  fill: #be123c;
}

.ma-matrix--ldpc-z .ma-cell--on {
  fill: #0f766e;
}

.ma-cell-face {
  fill: rgba(219,234,254,.34);
  stroke: rgba(147,197,253,.75);
  stroke-width: 1;
  transition: opacity .24s linear;
}

.ma-noscript-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: .8rem;
  margin-top: 1rem;
}

.ma-noscript-card {
  margin: 0;
}

.ma-noscript-card img {
  display: block;
  width: 100%;
  border: 1px solid var(--c-border);
  border-radius: 8px;
}

.ma-noscript-card figcaption {
  margin-top: .35rem;
  color: var(--c-navy);
  font-size: .78rem;
  font-weight: 800;
}

@keyframes ma-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes ma-grid-breathe {
  0%, 100% { opacity: .42; }
  50% { opacity: .75; }
}

@keyframes ma-cell-glow {
  0%, 74%, 100% { opacity: .72; }
  86% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ma-panel,
  .ma-panel::after,
  .ma-line,
  .ma-cell--on,
  .ma-bg-grid path {
    animation: none;
    transition: none;
  }

  .ma-line {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }
}

@media (max-width: 720px) {
  .idx-profile {
    grid-template-columns: 1fr;
    gap: 1.3rem;
    margin: 2rem 0 1.3rem;
  }

  .idx-portrait-link {
    max-width: 210px;
  }

  .idx-name {
    font-size: 1.65rem;
  }

  .idx-affiliation {
    font-size: .92em;
  }

  .idx-interest-group {
    grid-template-columns: 1fr;
    gap: .22rem;
  }

  .idx-interest-label {
    padding-top: 0;
  }

  .idx-nav-wrap {
    margin-left: -1rem;
    margin-right: -1rem;
    padding: .5rem .35rem;
  }

  .idx-nav a {
    padding: .45rem .72rem;
  }

  .idx-intro-split {
    grid-template-columns: 1fr;
    gap: 1.05rem;
  }

  .idx-intro-sign {
    justify-self: start;
    max-width: 220px;
  }

  .idx-math-atlas__head {
    display: block;
  }

  .idx-math-atlas__head p {
    margin-top: .35rem;
    text-align: left;
  }

  .idx-math-atlas__grid {
    grid-template-columns: 1fr;
  }

  .ma-panel,
  .ma-panel:nth-child(n+3) {
    grid-column: 1 / -1;
    min-height: 0;
  }

  .ma-canvas,
  .ma-panel:nth-child(n+3) .ma-canvas {
    min-height: 178px;
  }

  .idx-entry {
    padding: .68rem .72rem;
  }
}

@media (max-width: 480px) {
  .idx-portrait-link {
    max-width: 200px;
  }

  .idx-social a {
    flex: 1 1 auto;
    justify-content: center;
  }

  .entry-year {
    margin-bottom: .2rem;
  }

  .idx-h2 {
    font-size: 1.42rem;
  }
}

/* Back to top */
#back-to-top {
  display: none;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 999;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 1.15rem;
  background: var(--c-accent);
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(37,99,235,.35);
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
#back-to-top:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(37,99,235,.45); }
</style>

<div class="idx-home">

<!-- ════════════════════════════════════════════════════
     PROFILE
     ════════════════════════════════════════════════════ -->
<div class="idx-profile">

  <div>
    <a class="idx-portrait-link" href="/assets/jyh/20240113.jpg" target="_blank" rel="noopener">
      <img src="/assets/jyh/20240113.jpg" alt="Ji, YongHyeon"
           class="idx-portrait">
    </a>
  </div>

  <div class="idx-profile-body">

    <h1 class="idx-name">Ji, YongHyeon
      <a class="idx-hit-counter" href="https://myhits.vercel.app">
        <img src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fhacker-code-j.github.io%2F?color=blue&label=Hits&size=small"
             alt="Hits" style="vertical-align:middle;">
      </a>
    </h1>

    <p class="idx-affiliation">
      M.S. Student &nbsp;·&nbsp;
      <a href="https://gdse.kookmin.ac.kr/department/join/financial">
        Dept. of Cyber Security, Kookmin University
      </a>
      &nbsp;·&nbsp; Seoul, Republic of Korea
    </p>

    <div class="idx-interest">
      <div class="idx-kicker">Research Interests</div>
      <div class="idx-interest-groups">
        <div class="idx-interest-group">
          <div class="idx-interest-label">Mathematics</div>
          <div class="idx-badges">
            <span class="idx-badge badge-math">Algebraic Geometry</span>
            <span class="idx-badge badge-math">Algebraic Topology</span>
            <span class="idx-badge badge-math">Complex Analysis</span>
          </div>
        </div>
        <div class="idx-interest-group">
          <div class="idx-interest-label">Cryptography</div>
          <div class="idx-badges">
            <span class="idx-badge badge-sec">Provable Security</span>
            <span class="idx-badge badge-sec">Formal Verification</span>
          </div>
        </div>
        <div class="idx-interest-group">
          <div class="idx-interest-label">Applications</div>
          <div class="idx-badges">
            <span class="idx-badge badge-code">Algebraic Geometry Codes</span>
            <span class="idx-badge badge-qec">Quantum Error-Correction</span>
          </div>
        </div>
      </div>
    </div>

    <div class="idx-social">
      <a href="mailto:hacker3740@kookmin.ac.kr" title="Email">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Email
      </a>
      <a href="https://github.com/Hacker-Code-J" target="_blank" rel="noopener" title="GitHub">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
        </svg>
        GitHub
      </a>
    </div>


  </div>
</div>

<!-- ════════════════════════════════════════════════════
     STICKY NAV
     ════════════════════════════════════════════════════ -->
<div class="idx-nav-wrap">
  <nav class="idx-nav">
    <a href="#education">Education</a>
    <!-- <a href="#news">News</a> -->
    <a href="#preprints">Preprints</a>
    <a href="#projects">Projects</a>
    <a href="#articles">Articles</a>
    <a href="#codes">Codes</a>
    <a href="#talks">Talks</a>
  </nav>
</div>

<!-- ════════════════════════════════════════════════════
     RESEARCH STATEMENT
     ════════════════════════════════════════════════════ -->
<div class="idx-intro-split">
  <div class="idx-intro-text">
    My research focuses on <strong>Cryptography</strong> at the intersection of
    <strong>Mathematics</strong> and <strong>Computer Science</strong> — particularly
    how algebraic and geometric structures arise in cryptographic systems.
    I work on both the <strong>theoretical foundations</strong> and the
    <strong>practical implementation</strong> of secure cryptography,
    connecting rigorous mathematical analysis with real-world applications.
  </div>
  <div class="idx-intro-sign">
    <img src="/assets/image/handwriting_sign.png" alt="Welcome Banner">
  </div>
</div>

{% include math_atlas_generated.html %}

<!-- ════════════════════════════════════════════════════
     EDUCATION
     ════════════════════════════════════════════════════ -->
<h2 id="education" class="idx-h2">Education</h2>

<div class="idx-education">

  <div class="edu-item">
    <div class="edu-dot"></div>
    <div>
      <div class="edu-period">Mar. 2025 – Present</div>
      <div class="edu-degree">M.S. in Cyber Security</div>
      <p class="edu-sub">
        <a href="https://gdse.kookmin.ac.kr/department/join/financial">Kookmin University</a>
        &nbsp;·&nbsp; Seoul, Republic of Korea<br>
        Thesis: Machine-checked Verification for Correctness and Security of Cryptographic Algorithms
      </p>
    </div>
  </div>

  <div class="edu-item">
    <div class="edu-dot muted"></div>
    <div>
      <div class="edu-period muted">Mar. 2019 – Feb. 2025</div>
      <div class="edu-degree">B.S. in Information Security, Cryptology, and Mathematics</div>
      <p class="edu-sub">
        <a href="https://cns.kookmin.ac.kr/cns/index.do">Kookmin University</a>
        &nbsp;·&nbsp; Seoul, Republic of Korea
      </p>
    </div>
  </div>

  <div class="edu-item">
    <div class="edu-dot muted"></div>
    <div>
      <div class="edu-period muted">2016 – 2017</div>
      <div class="edu-degree">Institute of Information Security Education for the Gifted</div>
      <p class="edu-sub">
        Kongju National University
        &nbsp;·&nbsp; Chungcheongnam-do, Republic of Korea
      </p>
    </div>
  </div>

</div>

<!-- ════════════════════════════════════════════════════
     NEWS
     ════════════════════════════════════════════════════ -->
<!-- {% if site.news != empty %}
<h2 id="news" class="idx-h2">
  <a href="{% link news.markdown %}">News</a>
</h2>
<div style="margin:.5rem 0 1rem;">
{% assign orderedNews = site.news | reverse %}
{% for item in orderedNews limit:5 %}
- ({{ item.date | date: '%B %d, %Y' }}) [**{{ item.title }}**]({{ item.url | relative_url }}) <br/>
  {% capture link %} [{{ item.linkback }}]({{ item.url | relative_url }}){% endcapture %}
  {{ item.summary | append:link | markdownify | strip_newlines }}
{% endfor %}
</div>
{% endif %} -->

<!-- ════════════════════════════════════════════════════
     PREPRINTS
     ════════════════════════════════════════════════════ -->
<h2 id="preprints" class="idx-h2">
  <a href="{% link preprints.markdown %}">Preprints</a>
</h2>

<div class="idx-section-list">
{% if site.preprints != empty %}
{% for pub in site.preprints reversed %}
<div class="idx-entry">
  <div>
    <span class="entry-year">{{ pub.year }}</span>
    <a href="{{ pub.url | relative_url }}" class="entry-title">{{ pub.title }}</a>
  </div>
  <div class="entry-short">{{ pub.short }}</div>
  <div class="entry-links">
    {% if pub.link %}<a href="{{ pub.link }}" target="_blank">arXiv</a>{% endif %}
    {% if pub.pdf %}<a href="{{ pub.pdf }}" target="_blank">PDF</a>{% endif %}
    {% if pub.doi %}<a href="https://doi.org/{{ pub.doi }}" target="_blank">DOI</a>{% endif %}
  </div>
</div>
{% endfor %}
{% else %}
<p style="color:var(--c-muted); font-style:italic; font-size:.93em; margin:.5rem 0;">
  Preprints forthcoming.
</p>
{% endif %}
</div>

<!-- ════════════════════════════════════════════════════
     PROJECTS
     ════════════════════════════════════════════════════ -->
<h2 id="projects" class="idx-h2">
  <a href="{% link projects.markdown %}">Projects</a>
</h2>

<div class="idx-section-list">
{% for project in site.projects reversed %}
<div class="idx-entry">
  <div>
    <span class="entry-year">{{ project.year }}</span>
    <a href="{{ project.url | relative_url }}" class="entry-title">{{ project.project }}</a>
  </div>
  <div class="entry-short">{{ project.short }}</div>
</div>
{% endfor %}
</div>

<!-- ════════════════════════════════════════════════════
     ARTICLES
     ════════════════════════════════════════════════════ -->
<h2 id="articles" class="idx-h2">
  <a href="{% link articles.markdown %}">Articles</a>
</h2>

<div class="idx-section-list">
{% assign orderedTech = site.articles | reverse %}
{% for articles in orderedTech limit:5 %}
<div class="idx-entry">
  <div>
    <span class="entry-year entry-year-green">{{ articles.categories }}</span>
    <a href="{{ articles.url | relative_url }}" class="entry-title">{{ articles.title }}</a>
  </div>
  <div class="entry-short">{{ articles.short }}</div>
</div>
{% endfor %}
</div>

<!-- ════════════════════════════════════════════════════
     CODES
     ════════════════════════════════════════════════════ -->
<h2 id="codes" class="idx-h2">
  <a href="{% link codes.markdown %}">Codes</a>
</h2>

<!-- ════════════════════════════════════════════════════
     TALKS
     ════════════════════════════════════════════════════ -->
<h2 id="talks" class="idx-h2">
  <a href="{% link talks.markdown %}">Talks</a>
</h2>

<!-- ════════════════════════════════════════════════════
     BACK TO TOP
     ════════════════════════════════════════════════════ -->
<button id="back-to-top"
        onclick="window.scrollTo({top:0, behavior:'smooth'})"
        title="Back to top">&#8679;</button>

</div>

<script>
(function () {
  var btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
})();
</script>
