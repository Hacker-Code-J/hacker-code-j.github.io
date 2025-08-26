---
layout: simple
title: Research
permalink: /research/
---

<ul>
{% raw %}{% assign items = site.research | sort: 'date' | reverse %}
{% for item in items %}
    <li>
        <a href="{{ item.url }}">{{ item.title }}</a>
        <small>({{ item.date | date: "%Y-%m-%d" }})</small>
        {% if item.tags %} — <em>{{ item.tags | join: ", " }}</em>{% endif %}
    </li>
    {% endfor %}{% endraw %}
</ul>