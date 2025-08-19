---
layout: page
title: News
permalink: /news/
---


<ul>
    {%- assign posts = site.news | sort: 'date' | reverse -%}
    {%- for item in posts -%}
    <li>
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
        <small>— {{ item.date | date: "%b %d, %Y" }}</small>
    </li>
    {%- endfor -%}
</ul>