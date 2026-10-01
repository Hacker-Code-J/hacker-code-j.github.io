---
layout: page
title: Life
permalink: /life/
# Add photos here with a quoted YYYY-MM-DD date, category (Places/Food), and image path.
# Within each year, Places stays on the left and Food on the right.
# Photos with the same date are grouped within their category column.
photos:
  - date: "2026-08-20"
    category: Places
    image: /assets/life/places/20260820-1.jpg
  - date: "2026-08-20"
    category: Places
    image: /assets/life/places/20260820-2.jpg
  - date: "2023-07-03"
    category: Places
    image: /assets/life/places/20230703.jpg
  - date: "2023-07-03"
    category: Places
    image: /assets/life/places/20230703-2.jpg
  - date: "2023-05-03"
    category: Places
    image: /assets/life/places/20230503.jpg
  - date: "2023-05-03"
    category: Places
    image: /assets/life/places/20230503-2.jpg
  - date: "2023-04-03"
    category: Places
    image: /assets/life/places/20230403.jpg
  - date: "2023-04-03"
    category: Places
    image: /assets/life/places/20230403-2.jpg
  - date: "2023-04-03"
    category: Places
    image: /assets/life/places/20230403-3.jpg
  - date: "2023-06-23"
    category: Food
    image: /assets/life/foods/20230623.jpg
  - date: "2023-05-13"
    category: Food
    image: /assets/life/foods/20230513.jpg
  - date: "2023-05-13"
    category: Food
    image: /assets/life/foods/20230513-2.jpg
  - date: "2023-03-28"
    category: Food
    image: /assets/life/foods/20230328.jpg
  - date: "2023-03-28"
    category: Food
    image: /assets/life/foods/20230328-2.jpg
  - date: "2022-10-16"
    category: Places
    image: /assets/life/places/20221016.jpg
  - date: "2022-10-19"
    category: Food
    image: /assets/life/foods/20221019.jpg
# Optional location information for a dated Places group.
locations:
  "2026-08-20":
    name: 샤롯데씨어터
    address: 서울특별시 송파구 올림픽로 240
    event: 뮤지컬 겨울왕국
  "2023-07-03":
    name: 건국대학교 서울캠퍼스
    address: 서울특별시 광진구 능동로 120
    event: 제2회 CO-Week ACADEMY(코위크 아카데미)
    period: "2023. 7. 3. ~ 7. 7."
  "2023-05-03":
    name: 국민대학교
    address: 서울특별시 성북구 정릉로 77
  "2023-04-03":
    name: 국민대학교
    address: 서울특별시 성북구 정릉로 77
  "2022-10-16":
    event: 2022 계룡 세계 군 문화 엑스포
    address: 충청남도 계룡시 신도안면 석계리 1-5
    map_query: 충청남도 계룡시 신도안면 석계리 1-5
---
<link rel="stylesheet" href="/assets/css/custom.css">

<style>
/* ── Diary tokens ────────────────────────────────────── */
:root {
  --d-accent  : #b07843;
  --d-gold    : #c8956c;
  --d-brown   : #3d2f2a;
  --d-muted   : #9e8a7a;
  --d-cream   : #fdf6ee;
  --d-border  : #e8d9c8;
}

/* ── Hero ────────────────────────────────────────────── */
.diary-hero {
  text-align: center;
  padding: 2rem 0 1.2rem;
  border-bottom: 1px solid var(--d-border);
  margin-bottom: 2rem;
}
.diary-hero h1 {
  font-size: 2.2rem;
  color: var(--d-brown);
  letter-spacing: .1em;
  margin: 0 0 .3rem;
}
.diary-hero .tagline {
  font-size: 2em;
  color: var(--d-muted);
  font-style: italic;
  letter-spacing: .05em;
}

/* ── Year divider ────────────────────────────────────── */
.diary-year {
  display: flex;
  align-items: center;
  gap: .8rem;
  margin: 2.2rem 0 1rem;
}
.diary-year span {
  font-size: 1rem;
  font-weight: 800;
  color: var(--d-accent);
  letter-spacing: .14em;
  text-transform: uppercase;
  flex-shrink: 0;
}
.diary-year::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--d-border);
}

/* ── Daily post ──────────────────────────────────────── */
.diary-entry {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--d-border);
  border-radius: 10px;
}
.diary-entry .diary-date {
  margin: 0 0 .8rem;
  font-size: 1rem;
  color: var(--d-brown);
}
.diary-location {
  margin: .75rem 0 0;
  font-size: .8rem;
  line-height: 1.6;
  color: var(--d-brown);
}
.diary-location a {
  color: var(--d-accent);
  text-decoration: underline;
}
.diary-event {
  display: block;
  margin-bottom: .5rem;
}
.diary-map-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .3rem .8rem;
  margin-top: .2rem;
}
.diary-map-links a {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  white-space: nowrap;
}
.diary-map-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* ── Side-by-side columns ────────────────────────────── */
.diary-columns {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}
.diary-col { flex: 1; min-width: 0; width: 100%; }

@media (max-width: 560px) {
  .diary-columns { flex-direction: column; gap: 1rem; }
}

/* ── Category label ──────────────────────────────────── */
.diary-label {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .7em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .09em;
  color: var(--d-muted);
  margin-bottom: .5rem;
}
.diary-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--d-border);
}

/* ── Photo grid ──────────────────────────────────────── */
.diary-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .45rem;
}
.diary-photo-wrap {
  min-width: 0;
}
.diary-photo-wrap a {
  display: block;
  cursor: zoom-in;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--d-border);
  transition: transform .2s, box-shadow .2s;
}
.diary-photo-wrap a:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,.14);
}
.diary-photo-wrap img {
  width: 100%;
  height: 115px;
  object-fit: cover;
  display: block;
}

/* ── Photo viewer ────────────────────────────────────── */
html.diary-lightbox-open { overflow: hidden; }
.diary-lightbox {
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 4.75rem 1rem 1rem;
  border: 0;
  background: transparent;
  color: #fff;
  overflow: hidden;
}
.diary-lightbox[open] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .75rem;
}
.diary-lightbox::backdrop { background: rgba(0, 0, 0, .88); }
.diary-lightbox img {
  display: block;
  flex-shrink: 0;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100vh - 8rem);
  max-height: calc(100dvh - 8rem);
  object-fit: contain;
}
.diary-lightbox-caption {
  margin: 0;
  font-size: .9rem;
  text-align: center;
}
.diary-lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, .6);
  border-radius: 50%;
  background: #282421;
  color: #fff;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}
.diary-lightbox-close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

/* ── Entry note (for future text) ────────────────────── */
.diary-note {
  font-size: .91em;
  color: #554c46;
  line-height: 1.75;
  margin-bottom: .6rem;
}
</style>

<!-- ════════════════════════════════════
     HERO
     ════════════════════════════════════ -->
<div class="diary-hero">
  <!-- <h1>Life</h1> -->
  <div class="tagline">Moments &nbsp;·&nbsp; Places &nbsp;·&nbsp; Meals &nbsp;·&nbsp; Memories</div>
</div>

<!-- ════════════════════════════════════
     2025
     ════════════════════════════════════ -->
<!-- <div class="diary-year"><span>2025</span></div> -->

<!-- <div class="diary-note">Write about 2025 here.</div> -->

<!-- <div class="diary-columns"> -->

  <!-- ── Places ── -->
  <!-- <div class="diary-col">
    <div class="diary-label">Places</div>
    <div class="diary-gallery">
      <div class="diary-photo-wrap">...</div> 
    </div>
  </div> -->

  <!-- ── Food ── -->
  <!-- <div class="diary-col">
    <div class="diary-label">Food</div>
    <div class="diary-gallery"> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20250706.jpg" target="_blank">
      <img src="/assets/life/foods/20250706.jpg" alt="Food · 2025-07-06">
    </a>
    <div class="diary-photo-date">Jul 6</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20250118.jpg" target="_blank">
      <img src="/assets/life/foods/20250118.jpg" alt="Food · 2025-01-18">
    </a>
    <div class="diary-photo-date">Jan 18</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20250118-2.jpg" target="_blank">
      <img src="/assets/life/foods/20250118-2.jpg" alt="Food · 2025-01-18">
    </a>
    <div class="diary-photo-date">Jan 18</div>
  </div> -->

  <!-- </div> -->
  <!-- </div> -->

<!-- </div> -->

<!-- ════════════════════════════════════
     2024
     ════════════════════════════════════ -->
<!-- <div class="diary-year"><span>2024</span></div> -->

<!-- <div class="diary-note">Write about 2024 here.</div> -->

<!-- <div class="diary-columns"> -->

  <!-- ── Places ── -->
  <!-- <div class="diary-col">
    <div class="diary-label">Places</div>
    <div class="diary-gallery"> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/places/20240331.jpg" target="_blank">
      <img src="/assets/life/places/20240331.jpg" alt="Place · 2024-03-31">
    </a>
    <div class="diary-photo-date">Mar 31</div>
  </div> -->

  <!-- </div> -->
  <!-- </div> -->

  <!-- ── Food ── -->
  <!-- <div class="diary-col">
    <div class="diary-label">Food</div>
    <div class="diary-gallery"> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240511.jpg" target="_blank">
      <img src="/assets/life/foods/20240511.jpg" alt="Food · 2024-05-11">
    </a>
    <div class="diary-photo-date">May 11</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240331.jpg" target="_blank">
      <img src="/assets/life/foods/20240331.jpg" alt="Food · 2024-03-31">
    </a>
    <div class="diary-photo-date">Mar 31</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240321.jpg" target="_blank">
      <img src="/assets/life/foods/20240321.jpg" alt="Food · 2024-03-21">
    </a>
    <div class="diary-photo-date">Mar 21</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240321-2.jpg" target="_blank">
      <img src="/assets/life/foods/20240321-2.jpg" alt="Food · 2024-03-21">
    </a>
    <div class="diary-photo-date">Mar 21</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240225.jpg" target="_blank">
      <img src="/assets/life/foods/20240225.jpg" alt="Food · 2024-02-25">
    </a>
    <div class="diary-photo-date">Feb 25</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240220.jpg" target="_blank">
      <img src="/assets/life/foods/20240220.jpg" alt="Food · 2024-02-20">
    </a>
    <div class="diary-photo-date">Feb 20</div>
  </div> -->

  <!-- <div class="diary-photo-wrap">
    <a href="/assets/life/foods/20240113.jpg" target="_blank">
      <img src="/assets/life/foods/20240113.jpg" alt="Food · 2024-01-13">
    </a>
    <div class="diary-photo-date">Jan 13</div>
  </div> -->

  <!-- </div> -->
  <!-- </div> -->

<!-- </div> -->

{% assign years = page.photos | group_by_exp: "photo", "photo.date | slice: 0, 4" | sort: "name" | reverse %}
{% assign categories = "Places,Food" | split: "," %}
{% for year in years %}
<div class="diary-year"><span>{{ year.name }}</span></div>
<div class="diary-columns">
  {% for category in categories %}
  <div class="diary-col">
    <div class="diary-label">{{ category }}</div>
    {% assign category_photos = year.items | where: "category", category %}
    {% assign days = category_photos | group_by: "date" | sort: "name" | reverse %}
    {% for day in days %}
    <article class="diary-entry" aria-labelledby="diary-date-{{ category | slugify }}-{{ day.name }}">
      <h2 class="diary-date" id="diary-date-{{ category | slugify }}-{{ day.name }}">
        <time datetime="{{ day.name }}">{{ day.name | date: "%b %-d" }}</time>
      </h2>
      <div class="diary-gallery">
        {% for photo in day.items %}
        <div class="diary-photo-wrap">
          <a href="{{ photo.image | relative_url | escape }}">
            <img src="{{ photo.image | relative_url | escape }}" alt="{{ category }} · {{ day.name }}">
          </a>
        </div>
        {% endfor %}
      </div>
      {% assign location = page.locations[day.name] %}
      {% if category == "Places" and location %}
      {% assign map_query = location.name | append: ", " | append: location.address %}
      {% assign map_query = location.map_query | default: map_query %}
      {% assign naver_query = location.map_query | default: location.name %}
      <p class="diary-location">
        {% if location.event %}
        <span class="diary-event">
          <strong>{{ location.event | escape }}</strong>
          {% if location.period %}<br>개최기간: {{ location.period | escape }}{% endif %}
        </span>
        {% endif %}
        <span class="diary-place">{% if location.name %}{{ location.name | escape }} ({{ location.address | escape }}){% else %}{{ location.address | escape }}{% endif %}</span>
        <span class="diary-map-links">
          <a href="https://www.google.com/maps/search/?api=1&amp;query={{ map_query | url_encode | escape }}" target="_blank" rel="noopener" aria-label="{{ location.name | default: location.event | escape }} Google 지도 (새 창)">
            <svg class="diary-map-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="#4285f4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38c-.23 1.25-.94 2.31-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/>
              <path fill="#34a853" d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.23-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.59A10 10 0 0 0 12 22Z"/>
              <path fill="#fbbc05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.51H3.06a10 10 0 0 0 0 8.98Z"/>
              <path fill="#ea4335" d="M12 5.98c1.47 0 2.79.51 3.83 1.51l2.88-2.88A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.51L6.4 10.1c.79-2.36 3-4.12 5.6-4.12Z"/>
            </svg>
            <span>Google 지도</span>
          </a>
          <a href="https://map.naver.com/p/search/{{ naver_query | url_encode | replace: '+', '%20' | escape }}" target="_blank" rel="noopener" aria-label="{{ location.name | default: location.event | escape }} 네이버 지도 (새 창)">
            <svg class="diary-map-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect width="24" height="24" rx="4" fill="#03c75a"/>
              <path fill="#fff" d="M6 6h4l4 6V6h4v12h-4l-4-6v6H6Z"/>
            </svg>
            <span>네이버 지도</span>
          </a>
        </span>
      </p>
      {% endif %}
    </article>
    {% endfor %}
  </div>
  {% endfor %}
</div>
{% endfor %}

<dialog id="diary-lightbox" class="diary-lightbox" aria-label="사진 크게 보기" aria-describedby="diary-lightbox-caption" hidden>
  <button class="diary-lightbox-close" type="button" aria-label="사진 닫기" autofocus>×</button>
  <img id="diary-lightbox-image" alt="">
  <p id="diary-lightbox-caption" class="diary-lightbox-caption"></p>
</dialog>

<script>
(() => {
  const dialog = document.getElementById('diary-lightbox');
  if (typeof dialog.showModal !== 'function') return;

  const image = document.getElementById('diary-lightbox-image');
  const caption = document.getElementById('diary-lightbox-caption');
  const closeButton = dialog.querySelector('.diary-lightbox-close');
  let opener = null;
  dialog.hidden = false;

  document.querySelectorAll('.diary-photo-wrap a').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', dialog.id);
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = image.alt;
      dialog.showModal();
      document.documentElement.classList.add('diary-lightbox-open');
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('diary-lightbox-open');
    image.removeAttribute('src');
    if (opener) opener.focus({ preventScroll: true });
  });
})();
</script>
