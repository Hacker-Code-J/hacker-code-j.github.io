---
layout: home
---
<link rel="stylesheet" href="/assets/css/custom.css">

<div style="display: flex; align-items: flex-start; gap: 2rem; margin-top: 2rem;">
  <div style="flex: 0 0 150px;">
  <img src="/assets/jyh/20240113.jpg" alt="Profile Image" style="width: 150px; height: 200px; object-fit: cover; border-radius: 10px; border: 2px solid #ccc;">
  </div>
  <div style="flex: 1;">
    <h2>Ji, Yong-Hyeon</h2>
    <p>M.S. Student in 
    <a href="https://gdse.kookmin.ac.kr/department/join/financial">Department of Cyber Security at Kookmin University</a> <br>
    <b>Research:</b> Formal Verification for Cryptographic Algorithm <br>
    <b>Contact:</b> <a href="mailto:hacker3740@kookmin.ac.kr">hacker3740@kookmin.ac.kr</a> <br>
    <b>Github:</b> <a href="https://github.com/Hacker-Code-J">Hacker-Code-J</a> <br>
    <b>Youtube:</b> <a href="https://www.youtube.com/@hacker-code-j">Code-J</a> <br>
    <!-- Email -->
<a href="mailto:hacker3740@kookmin.ac.kr" title="Email">
  <svg width="24" height="24" fill="currentColor"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm8 5l8-5H4l8 5zm0 2l-8-5v10h16V8l-8 5z"/></svg>
</a>
<!-- GitHub -->
<a href="https://github.com/Hacker-Code-J" target="_blank" title="GitHub">
  <svg width="24" height="24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
</a>
<!-- YouTube -->
<a href="https://www.youtube.com/@hacker-code-j" target="_blank" title="YouTube">
  <svg width="24" height="24" fill="currentColor"><path d="M23.5 6.5s-.2-1.7-.8-2.4c-.7-.8-1.5-.8-1.9-.9C17.1 3 12 3 12 3h-.1s-5.1 0-8.8.2c-.4 0-1.2.1-1.9.9-.6.7-.8 2.4-.8 2.4S0 8.3 0 10.1v1.8c0 1.8.2 3.6.2 3.6s.2 1.7.8 2.4c.7.8 1.7.8 2.1.9 1.5.1 6.7.2 6.7.2s5.1 0 8.8-.2c.4 0 1.2-.1 1.9-.9.6-.7.8-2.4.8-2.4s.2-1.8.2-3.6v-1.8c0-1.8-.2-3.6-.2-3.6zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
</a>
    </p>
  </div>
</div>

<div style="display: flex; align-items: flex-start; gap: 2rem; margin-top: 2rem;">
</div>

> I’m **Ji Yong-Hyeon**, and my main interests lie in **Mathematics** and **Cryptography**.  
> My academic work is motivated by the elegance of modern cryptography and the challenge of bridging theoretical ideas with practical implementations.

<div style="display: flex; align-items: flex-start; gap: 2rem; margin-top: 2rem;">
</div>


{% if site.news != empty %}
[News]({% link news.markdown %})
====

{% assign orderedNews = site.news | reverse %}
{% for item in orderedNews limit:5 %}
- [**{{ item.title }}**]({{ item.url | relative_url }}) ({{ item.date | date: '%B' }} {{ item.date | date : '%d' | plus:'0' }}{{ item.date | date : ', %Y' }})<br/>
  {% capture link %} [{{ item.linkback }}]({{ item.url | relative_url }}){% endcapture %}
  {{ item.summary | append:link | markdownify | strip_newlines }}
{% endfor %}
{% endif %}

<!-- [See news.]({% link news.markdown %}) -->


[Projects]({% link projects.markdown %})
====

{% for project in site.projects %}
<!-- - [**{{ project.project }}**]({{ project.url | relative_url }}) — [Repository]({{ project.git }})<br/>
  {{ project.short }} -->
- [{{ project.year }}] [**{{ project.project }}**]({{ project.url | relative_url }})<br/>
  {{ project.short }}
{% endfor %}


[Publications]({% link publications.markdown %})
====
<!-- - [{{ project.year }}] [**{{ project.project }}**]({{ project.url | relative_url }})<br/>
{{ project.short }} -->

[Tools]({% link tools.markdown %})
====

[Talks]({% link talks.markdown %})
====



<!-- <!-- ## 📖 Research Interests
- Mathematical foundations of cryptography  
- Secure design and analysis of cryptographic algorithms  
- Bridging theoretical models with real-world implementations  

What inspires me most is the **design and implementation of cryptography**, where theoretical insight can directly shape secure, practical solutions.  

---

## 📚 Publications & Work
I aim to contribute to both the **theoretical** understanding of cryptography and its **engineering applications**.  
You can explore more in the [publications](/publications) section.  

---

## 🛠️ Projects
On my [GitHub](https://github.com/username), I share projects that span:  
- Cryptographic protocol implementations  
- Algorithm design and evaluation  
- Experimental systems that combine mathematical rigor with practical deployment  

---

## 🤝 Collaboration
I actively seek collaborations with researchers and developers who share an interest in advancing cryptographic methods.  
Feel free to connect or reach me at [you@example.com](mailto:you@example.com).  

---

Thank you for visiting my research space.

--- -->