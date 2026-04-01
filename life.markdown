---
layout: page
title: Life
permalink: /life/
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

/* ── Side-by-side columns ────────────────────────────── */
.diary-columns {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}
.diary-col { flex: 1; min-width: 0; }

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
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
}
.diary-photo-wrap {
  flex: 1 1 110px;
  max-width: 170px;
}
.diary-photo-wrap a {
  display: block;
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
.diary-photo-date {
  font-size: .67em;
  color: var(--d-muted);
  text-align: center;
  margin-top: .22rem;
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

<!-- ════════════════════════════════════
     2023
     ════════════════════════════════════ -->
<div class="diary-year"><span>2023</span></div>

<!-- <div class="diary-note">Write about 2023 here.</div> -->

<div class="diary-columns">

  <!-- ── Places ── -->
  <div class="diary-col">
    <div class="diary-label">Places</div>
    <div class="diary-gallery">

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230703.jpg" target="_blank">
          <img src="/assets/life/places/20230703.jpg" alt="Place · 2023-07-03">
        </a>
        <div class="diary-photo-date">Jul 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230703-2.jpg" target="_blank">
          <img src="/assets/life/places/20230703-2.jpg" alt="Place · 2023-07-03">
        </a>
        <div class="diary-photo-date">Jul 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230503.jpg" target="_blank">
          <img src="/assets/life/places/20230503.jpg" alt="Place · 2023-05-03">
        </a>
        <div class="diary-photo-date">May 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230503-2.jpg" target="_blank">
          <img src="/assets/life/places/20230503-2.jpg" alt="Place · 2023-05-03">
        </a>
        <div class="diary-photo-date">May 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230403.jpg" target="_blank">
          <img src="/assets/life/places/20230403.jpg" alt="Place · 2023-04-03">
        </a>
        <div class="diary-photo-date">Apr 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230403-2.jpg" target="_blank">
          <img src="/assets/life/places/20230403-2.jpg" alt="Place · 2023-04-03">
        </a>
        <div class="diary-photo-date">Apr 3</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20230403-3.jpg" target="_blank">
          <img src="/assets/life/places/20230403-3.jpg" alt="Place · 2023-04-03">
        </a>
        <div class="diary-photo-date">Apr 3</div>
      </div>

    </div>
  </div>

  <!-- ── Food ── -->
  <div class="diary-col">
    <div class="diary-label">Food</div>
    <div class="diary-gallery">

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20230623.jpg" target="_blank">
          <img src="/assets/life/foods/20230623.jpg" alt="Food · 2023-06-23">
        </a>
        <div class="diary-photo-date">Jun 23</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20230513.jpg" target="_blank">
          <img src="/assets/life/foods/20230513.jpg" alt="Food · 2023-05-13">
        </a>
        <div class="diary-photo-date">May 13</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20230513-2.jpg" target="_blank">
          <img src="/assets/life/foods/20230513-2.jpg" alt="Food · 2023-05-13">
        </a>
        <div class="diary-photo-date">May 13</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20230328.jpg" target="_blank">
          <img src="/assets/life/foods/20230328.jpg" alt="Food · 2023-03-28">
        </a>
        <div class="diary-photo-date">Mar 28</div>
      </div>

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20230328-2.jpg" target="_blank">
          <img src="/assets/life/foods/20230328-2.jpg" alt="Food · 2023-03-28">
        </a>
        <div class="diary-photo-date">Mar 28</div>
      </div>

    </div>
  </div>

</div>

<!-- ════════════════════════════════════
     2022
     ════════════════════════════════════ -->
<div class="diary-year"><span>2022</span></div>

<!-- <div class="diary-note">Write about 2022 here.</div> -->

<div class="diary-columns">

  <!-- ── Places ── -->
  <div class="diary-col">
    <div class="diary-label">Places</div>
    <div class="diary-gallery">

      <div class="diary-photo-wrap">
        <a href="/assets/life/places/20221016.jpg" target="_blank">
          <img src="/assets/life/places/20221016.jpg" alt="Place · 2022-10-16">
        </a>
        <div class="diary-photo-date">Oct 16</div>
      </div>

    </div>
  </div>

  <!-- ── Food ── -->
  <div class="diary-col">
    <div class="diary-label">Food</div>
    <div class="diary-gallery">

      <div class="diary-photo-wrap">
        <a href="/assets/life/foods/20221019.jpg" target="_blank">
          <img src="/assets/life/foods/20221019.jpg" alt="Food · 2022-10-19">
        </a>
        <div class="diary-photo-date">Oct 19</div>
      </div>

    </div>
  </div>



</div>
