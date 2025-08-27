---
layout: page
title: Publications
permalink: /publications/
---

<link rel="stylesheet" href="/assets/css/custom.css">

<ul class="full-width">
    {%- assign pubs = site.publications | sort: 'year' | reverse -%}
    {%- for pub in pubs -%}
    <li>{{ pub.year }} — {{ pub.title }}</li>
    {%- endfor -%}
</ul>