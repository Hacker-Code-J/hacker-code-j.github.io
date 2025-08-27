---
layout: page
title: Projects
permalink: /projects/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
    {%- for p in site.projects -%}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {%- endfor -%}
</ul>