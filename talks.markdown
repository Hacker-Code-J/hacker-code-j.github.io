---
layout: page
title: Talks
permalink: /talks/
---
<link rel="stylesheet" href="/assets/css/custom.css">


<ul>
    {%- for t in site.tools -%}
    <li><a href="{{ t.url | relative_url }}">{{ t.title }}</a></li>
    {%- endfor -%}
</ul>