---
layout: home
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* ── Design tokens ───────────────────────────────────── */
:root {
  --c-accent : #2563eb;
  --c-navy   : #1e3a5f;
  --c-muted  : #6b7280;
  --c-border : #e5e7eb;
  --c-soft   : #f8fafc;
}

/* ── Profile ─────────────────────────────────────────── */
.idx-name {
  margin: 0 0 .1rem; font-size: 1.6rem; color: var(--c-navy);
  display: flex; align-items: center; gap: .6rem; flex-wrap: wrap;
}

/* ── Research-interest badges ────────────────────────── */
.idx-badge {
  display: inline-block; border-radius: 20px;
  padding: .18rem .65rem; font-size: .78em; font-weight: 600;
  border: 1px solid transparent;
}
.badge-math { background: #ede9fe; color: #5b21b6; border-color: #c4b5fd; }
.badge-code { background: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.badge-sec  { background: #fce7f3; color: #9d174d; border-color: #f9a8d4; }
.badge-qec  { background: #e0f2fe; color: #075985; border-color: #7dd3fc; }

/* ── Social / contact buttons ────────────────────────── */
.idx-social { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }
.idx-social a {
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .3rem .75rem; border-radius: 6px; font-size: .84em;
  font-weight: 500; text-decoration: none; color: #374151;
  border: 1px solid var(--c-border);
  transition: background .2s, color .2s, border-color .2s;
}
.idx-social a:hover { background: var(--c-accent); color: #fff; border-color: var(--c-accent); }

/* ── Sticky nav ──────────────────────────────────────── */
.idx-nav { display: flex; justify-content: center; flex-wrap: wrap; gap: .25rem; padding: 0 1rem; }
.idx-nav a {
  text-decoration: none; font-weight: 600; font-size: .86em;
  color: var(--c-muted); padding: .3rem .85rem; border-radius: 20px;
  transition: color .2s, background .2s;
}
.idx-nav a:hover { color: var(--c-accent); background: #eff6ff; }

/* ── Section headings ────────────────────────────────── */
.idx-h2 {
  display: flex; align-items: center; gap: .55rem;
  margin-top: 2rem; margin-bottom: 0;
  padding-bottom: .35rem; border-bottom: 1px solid var(--c-border);
  color: var(--c-navy);
}
.idx-h2::before {
  content: ''; display: inline-block; flex-shrink: 0;
  width: 4px; height: 1.1em; border-radius: 2px;
  background: var(--c-accent);
}
.idx-h2 a { text-decoration: none; color: inherit; }
.idx-h2 a:hover { color: var(--c-accent); }

/* ── Entry cards ─────────────────────────────────────── */
.idx-entry {
  padding: .45rem .8rem; margin: .3rem 0;
  border-left: 3px solid var(--c-border);
  border-radius: 0 6px 6px 0;
  transition: border-color .2s, background .2s;
}
.idx-entry:hover { border-left-color: var(--c-accent); background: #f5f9ff; }

.entry-year {
  display: inline-block; font-size: .72em; font-weight: 700;
  background: #eff6ff; color: var(--c-accent); border: 1px solid #bfdbfe;
  border-radius: 4px; padding: .03rem .35rem; margin-right: .3rem;
  vertical-align: middle;
}
.entry-title { font-weight: 600; font-size: .95em; text-decoration: none; color: var(--c-navy); }
.entry-title:hover { color: var(--c-accent); text-decoration: underline; }
.entry-short { color: var(--c-muted); font-size: .84em; margin-top: .1rem; }
.entry-links { margin-top: .25rem; }
.entry-links a {
  font-size: .76em; font-weight: 600;
  padding: .05rem .38rem; margin-right: .25rem;
  border: 1px solid var(--c-border); border-radius: 4px;
  text-decoration: none; color: #374151;
  transition: background .15s, color .15s;
}
.entry-links a:hover { background: var(--c-accent); color: #fff; border-color: var(--c-accent); }

/* ── Education timeline ──────────────────────────────── */
.edu-item   { display: flex; gap: .85rem; margin-bottom: .7rem; align-items: flex-start; }
.edu-dot    {
  flex-shrink: 0; width: 10px; height: 10px; border-radius: 50%;
  background: var(--c-accent); margin-top: .42em;
  box-shadow: 0 0 0 3px #bfdbfe;
}
.edu-dot.muted { background: #9ca3af; box-shadow: 0 0 0 3px #e5e7eb; }
.edu-period { font-size: .78em; font-weight: 700; color: var(--c-accent);
              text-transform: uppercase; letter-spacing: .04em; }
.edu-period.muted { color: #9ca3af; }
.edu-degree { font-weight: 600; color: var(--c-navy); margin: .1rem 0 0; font-size: .97em; }
.edu-sub    { font-size: .85em; color: var(--c-muted); margin: .1rem 0 0; }

/* ── Intro split layout ──────────────────────────────── */
.idx-intro-split {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 1.2rem 0 2rem;
  flex-wrap: wrap;
}
.idx-intro-text {
  flex: 1 1 420px;
  padding: .8rem 1.2rem;
  border-left: 4px solid var(--c-accent);
  background: var(--c-soft);
  border-radius: 0 8px 8px 0;
  font-size: .92em;
  line-height: 1.7;
  color: #374151;
}
.idx-intro-sign {
  flex: 0 1 260px;
  max-width: 320px;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
.idx-intro-sign img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

@media (max-width: 720px) {
  .idx-intro-split {
    gap: 1rem;
  }

  .idx-intro-sign {
    max-width: 220px;
  }
}

/* ── Back-to-top ─────────────────────────────────────── */
#back-to-top {
  display: none; position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
  width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer;
  background: var(--c-accent); color: #fff; font-size: 1.15rem;
  box-shadow: 0 4px 14px rgba(37,99,235,.35);
  transition: transform .2s, box-shadow .2s;
}
#back-to-top:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(37,99,235,.45); }
</style>

<!-- ════════════════════════════════════════════════════
     PROFILE
     ════════════════════════════════════════════════════ -->
<div style="display:flex; align-items:flex-start; gap:2rem; margin-top:1.8rem; flex-wrap:wrap;">

  <div style="flex-shrink:0;">
    <a href="/assets/jyh/20240113.jpg" target="_blank">
      <img src="/assets/jyh/20240113.jpg" alt="Ji, Yonghyeon"
           style="width:200px; height:300px; object-fit:cover;
                  border-radius:12px; border:3px solid #dbeafe;
                  box-shadow:0 4px 16px rgba(30,58,95,.14);">
    </a>
  </div>

  <div style="flex:1; min-width:240px;">

    <h1 class="idx-name">Ji, Yonghyeon
      <a href="https://myhits.vercel.app">
        <img src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fhacker-code-j.github.io%2F?color=blue&label=Hits&size=small"
             alt="Hits" style="vertical-align:middle;">
      </a>
    </h1>

    <p style="margin:.15rem 0 .7rem; font-size:.9em; color:var(--c-muted);">
      M.S. Student &nbsp;·&nbsp;
      <a href="https://gdse.kookmin.ac.kr/department/join/financial"
         style="color:var(--c-accent); text-decoration:none; font-weight:500;">
        Dept. of Cyber Security, Kookmin University
      </a>
      &nbsp;·&nbsp; Seoul, Korea
    </p>

    <div style="margin-bottom:.75rem;">
      <div style="font-size:.72em; text-transform:uppercase; letter-spacing:.07em;
                  color:#9ca3af; font-weight:700; margin-bottom:.3rem;">Research Interests</div>
      <div style="display:flex; flex-wrap:wrap; gap:.3rem;">
        <span class="idx-badge badge-math">Algebraic Geometry</span>
        <span class="idx-badge badge-math">Algebraic Topology</span>
        <span class="idx-badge badge-math">Complex Analysis</span>
        <span class="idx-badge badge-code">Algebraic Geometry Codes</span>
        <span class="idx-badge badge-sec">Formal Verification</span>
        <span class="idx-badge badge-sec">Provable Security</span>
        <span class="idx-badge badge-qec">Quantum Error-Correction</span>
      </div>
    </div>

    <div class="idx-social">
      <a href="mailto:hacker3740@kookmin.ac.kr" title="Email">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Email
      </a>
      <a href="https://github.com/Hacker-Code-J" target="_blank" title="GitHub">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
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
<div style="position:sticky; top:0; z-index:100;
            background:var(--background-color,#fff);
            border-bottom:1px solid var(--c-border);
            padding:.45rem 0; margin:1.5rem -1rem 0 -1rem;
            box-shadow:0 2px 10px rgba(0,0,0,.05);">
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


<!-- ════════════════════════════════════════════════════
     EDUCATION
     ════════════════════════════════════════════════════ -->
<h2 id="education" class="idx-h2">Education</h2>

<div style="margin:.6rem 0 1.2rem; padding-left:.1rem;">

  <div class="edu-item">
    <div class="edu-dot"></div>
    <div>
      <div class="edu-period">Mar. 2025 – Present</div>
      <div class="edu-degree">M.S. in Cyber Security</div>
      <p class="edu-sub">
        <a href="https://gdse.kookmin.ac.kr/department/join/financial">Kookmin University</a>
        &nbsp;·&nbsp; Thesis: TBA
      </p>
    </div>
  </div>

  <div class="edu-item">
    <div class="edu-dot"></div>
    <div>
      <div class="edu-period">Mar. 2019 – Feb. 2025</div>
      <div class="edu-degree">B.S. in Information Security, Cryptology &amp; Mathematics</div>
      <p class="edu-sub">
        <a href="https://cns.kookmin.ac.kr/cns/index.do">Kookmin University</a>
      </p>
    </div>
  </div>

  <div class="edu-item">
    <div class="edu-dot muted"></div>
    <div>
      <div class="edu-period muted">2016 – 2017</div>
      <div class="edu-degree">Institute of Information Security Education for the Gifted</div>
      <p class="edu-sub">Kongju National University</p>
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

<div style="margin:.5rem 0 1rem;">
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

<div style="margin:.5rem 0 1rem;">
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

<div style="margin:.5rem 0 1rem;">
{% assign orderedTech = site.articles | reverse %}
{% for articles in orderedTech limit:5 %}
<div class="idx-entry">
  <div>
    <span class="entry-year" style="background:#f0fdf4; color:#166534; border-color:#bbf7d0;">{{ articles.categories }}</span>
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

<script>
(function () {
  var btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
})();
</script>
