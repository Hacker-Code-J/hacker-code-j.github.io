---
layout: page
title: Publications
permalink: /publications/
---

<link rel="stylesheet" href="/assets/css/custom.css">

<!-- Template 1: Simple List (Current) -->
<ul class="full-width">
    {%- assign pubs = site.publications | sort: 'year' | reverse -%}
    {%- for pub in pubs -%}
    <li>
      {{ pub.year }} — 
      {%- if pub.link -%}
        &nbsp;[<a href="{{ pub.link }}" target="_blank">arXiv</a>]
      <a href="{{ pub.url | relative_url }}">{{ pub.title }}</a>
      {%- endif -%}
    </li>
    {%- endfor -%}
</ul>

<!-- Template 2: Detailed Card Grid (Uncomment to use)
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2em; padding: 0;">
  {%- assign pubs = site.publications | sort: 'year' | reverse -%}
  {%- for pub in pubs -%}
    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 1.5em; background: #fafbfc;">
      <h3 style="margin-top: 0; margin-bottom: 0.5em;">
        <a href="{{ pub.url | relative_url }}">{{ pub.title }}</a>
      </h3>
      <p style="margin: 0 0 0.5em 0;">
        <b>Year:</b> {{ pub.year }}<br>
        {% if pub.authors %}<b>Authors:</b> {{ pub.authors }}<br>{% endif %}
        {% if pub.venue %}<b>Venue:</b> {{ pub.venue }}<br>{% endif %}
        {% if pub.doi %}<b>DOI:</b> <a href="https://doi.org/{{ pub.doi }}" target="_blank">{{ pub.doi }}</a><br>{% endif %}
        {% if pub.pdf %}<b>PDF:</b> <a href="{{ pub.pdf }}" target="_blank">Download</a><br>{% endif %}
      </p>
    </div>
  {%- endfor -%}
</div>
-->

<!-- Template 3: Grouped by Year (Uncomment to use)
{%- assign pubs = site.publications | sort: 'year' | reverse -%}
{%- assign years = pubs | map: 'year' | uniq -%}

{%- for year in years -%}
  <h2>{{ year }}</h2>
  <ul class="full-width">
    {%- for pub in pubs -%}
      {%- if pub.year == year -%}
        <li><a href="{{ pub.url | relative_url }}">{{ pub.title }}</a></li>
      {%- endif -%}
    {%- endfor -%}
  </ul>
{%- endfor -%}
-->