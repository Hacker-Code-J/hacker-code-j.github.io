---
layout: page
title: Notes
permalink: /notes/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
    {%- for n in site.notes -%}
    <li><a href="{{ n.url | relative_url }}">{{ n.title }}</a></li>
    {%- endfor -%}
</ul>