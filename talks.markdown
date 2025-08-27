---
layout: page
title: Talks
permalink: /talks/
---
<link rel="stylesheet" href="/assets/css/custom.css">



<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2em; padding: 0;">
  {%- assign talks = site.talks | sort: 'date' | reverse -%}
  {%- for item in talks -%}
    <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 1.5em; background: #fafbfc; min-width: 0;">
      <h3 style="margin-top: 0; margin-bottom: 0.5em; word-break: break-word;">
        <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
      </h3>
      <p style="margin: 0 0 0.5em 0;">
        <b>Date:</b> {{ item.date }}<br>
        <b>Event:</b> {{ item.event }}<br>
        <b>Location:</b> {{ item.location }}<br>
        {% if item.slides %}<b>Slides:</b> <a href="{{ item.slides }}" target="_blank">View Slides</a><br>{% endif %}
        {% if item.recording %}<b>Recording:</b> <a href="{{ item.recording }}" target="_blank">Watch Recording</a><br>{% endif %}
        <b>Categories:</b> {{ item.categories | join: ', ' }}<br>
        <b>Tags:</b> {% for tag in item.tags %}<span style="background:#e3e3e3; border-radius:4px; padding:2px 8px; margin-right:4px;">{{ tag }}</span>{% endfor %}<br>
        <b>Layout:</b> {{ item.layout }}
      </p>
    </div>
  {%- endfor -%}
</div>
<!-- <ul>
    {%- for t in site.tools -%}
    <li><a href="{{ t.url | relative_url }}">{{ t.title }}</a></li>
    {%- endfor -%}
</ul> -->