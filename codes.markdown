---
layout: page
title: Codes
permalink: /codes/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
{% assign all = site.codes %}
{% assign tag_map = "" | split: "" %}
{% for p in all %}
  {% for t in p.tags %}
    {% unless tag_map contains t %}{% assign tag_map = tag_map | push: t %}{% endunless %}
  {% endfor %}
{% endfor %}
{% assign tag_map = tag_map | sort %}

{% for t in tag_map %}
  <h2 id="{{ t | slugify }}">#{{ t }}</h2>
  <ul>
    {% assign tagged = all | where_exp: "i", "i.tags contains t" | sort: "title" %}
    {% for code in tagged %}
      <li>
        <a href="{{ code.url }}">{{ code.title }}</a>
        {% if code.description %} — {{ code.description }}{% endif %}
      </li>
    {% endfor %}
  </ul>
{% endfor %}
</ul>

<!-- <p>Total: {{ site.codes | size }}</p>

<ul>
  {% assign items = site.codes | sort: "title" %}
  {% for code in items %}
    <li>
      <a href="{{ code.url }}">{{ code.title }}</a>
      {% if code.description %} — {{ code.description }}{% endif %}
      {% if code.tags and code.tags.size > 0 %}
        <em>(tags: {{ code.tags | join: ", " }})</em>
      {% endif %}

      {% comment %}Inline GitHub link derived from front matter or site config{% endcomment %}
      {% if code.github_url %}
        &middot; <a href="{{ code.github_url }}" target="_blank" rel="noopener">GitHub</a>
      {% elsif code.source_path and site.github %}
        {% assign gh = 'https://github.com/' | append: site.github.user | append: '/' | append: site.github.repo | append: '/blob/' | append: site.github.branch | append: '/' | append: code.source_path %}
        &middot; <a href="{{ gh }}" target="_blank" rel="noopener">GitHub</a>
      {% endif %}
    </li>
  {% endfor %}
</ul> -->