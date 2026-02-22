---
layout: page
title: Projects
permalink: /projects/
---
<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
    {%- for p in site.projects reversed -%}
    <li><a href="{{ p.url | relative_url }}">{{ p.list }}</a></li>
    {%- endfor -%}
</ul>