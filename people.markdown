---
layout: page
title: People
permalink: /people/
---


<ul>
    {%- for p in site.people -%}
    <li><a href="{{ p.url | relative_url }}">{{ p.name }}</a></li>
    {%- endfor -%}
</ul>