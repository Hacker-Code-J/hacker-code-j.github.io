---
layout: archive
title: "Blog"
permalink: /blog/
---

Welcome to my blog! Below are my latest posts:

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%B %-d, %Y" }}
{% endfor %}