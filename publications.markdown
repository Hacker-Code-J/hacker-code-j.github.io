---
layout: page
title: Publications
permalink: /publications/
---


<ul>
    {%- assign pubs = site.publications | sort: 'year' | reverse -%}
    {%- for pub in pubs -%}
    <li>{{ pub.year }} — {{ pub.title }}</li>
    {%- endfor -%}
</ul>