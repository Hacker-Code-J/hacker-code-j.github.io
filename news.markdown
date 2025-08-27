---
layout: page
title: News
permalink: /news/
---

<link rel="stylesheet" href="/assets/css/custom.css">



<ul class="full-width">
    {%- assign posts = site.news | sort: 'date' | reverse -%}
    {%- for item in posts -%}
    <li>
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        <small>— {{ item.date | date: "%b %d, %Y" }}</small>
    </li>
    {%- endfor -%}
</ul>

