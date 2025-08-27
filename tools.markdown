---
layout: page
title: Tools
permalink: /tools/
---

<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
    {%- for t in site.tools -%}
    <li><a href="{{ t.url | relative_url }}">{{ t.title }}</a></li>
    {%- endfor -%}
</ul>