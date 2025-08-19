---
layout: page
title: Projects
permalink: /projects/
---


<ul>
    {%- for p in site.projects -%}
    <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {%- endfor -%}
</ul>