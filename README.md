# Ji, Yong Hyeon


Here’s a simple step-by-step guide to get a GitHub Pages blog running on Jekyll with the **minima** theme:

---

## 1. Create your repository

1. Go to GitHub and create a new repository named `<your-username>.github.io` (replace `<your-username>` with your actual GitHub username).
2. Clone it locally:

   ```bash
   git clone https://github.com/<your-username>/<your-username>.github.io
   cd <your-username>.github.io
   ```

---

## 2. Scaffold a new Jekyll site

From inside that directory, run:

```bash
jekyll new . --force
```

This will generate a basic Jekyll site (by default it uses **minima**).

> **Note:** If you don’t have Jekyll installed, first install Ruby, then:
>
> ```bash
> gem install jekyll bundler
> ```

---

## 3. Configure the minima theme

Open `_config.yml` in your repo and adjust these settings (update the URL fields to match your username):

```yaml
title:     My Awesome Blog
email:     you@example.com
description: >- # this means “fold this text to a single line”
  A blog about X, Y, and Z.
baseurl: "" # the subpath of your site, e.g. /blog
url:       "https://<your-username>.github.io" # the base hostname

# Use minima theme
theme: minima

# (optional) Uncomment to customize which pages appear in navigation:
# defaults:
#   - scope:
#       path: ""
#       type: "pages"
#     values:
#       layout: "page"
#       permalink: "/:title/"
```

---

## 4. (Optional) Use GitHub Pages gem for parity

To ensure GitHub’s build environment matches your local setup, you can use the `github-pages` gem:

1. Create a file named `Gemfile` with:

   ```ruby
   source "https://rubygems.org"
   gem "github-pages", group: :jekyll_plugins
   ```
2. Run:

   ```bash
   bundle install
   ```
3. From now on, run the server locally with:

   ```bash
   bundle exec jekyll serve
   ```

---

## 5. Add your first post or page

### Home page

Edit `index.md` (or create one) with front matter telling Jekyll to use minima’s home layout:

```markdown
---
layout: home
title: Welcome
---

Hello! This is my new blog running on **Jekyll + minima**.
```

### Blog posts

In `_posts/`, create a file named `YYYY-MM-DD-my-first-post.md`, e.g.:

```markdown
---
layout: post
title:  "My First Post"
date:   2025-07-18 12:00:00 +0900
---
I’m excited to share my thoughts on…
```

---

## 6. Preview locally

Start the local server:

```bash
bundle exec jekyll serve
```

Then open [http://localhost:4000](http://localhost:4000) in your browser to make sure everything looks right.

---

## 7. Commit & push

```bash
git add .
git commit -m "Initial Jekyll + minima setup"
git push origin main
```

GitHub will automatically build your site (usually within a minute). Your blog will be live at

```
https://<your-username>.github.io
```

---

## 8. (Optional) Customizing minima

If you want to tweak colors, typography or layouts, you can override any of minima’s Sass or Liquid files:

1. Copy the file from the theme into your project:

   ```bash
   mkdir -p _sass
   cp $(bundle show minima)/assets/main.scss _sass/minima.scss
   ```
2. Edit `_sass/minima.scss` (or any partials it includes).
3. Rebuild (`bundle exec jekyll serve`) to see your changes.

---

🎉 That’s it! You now have a GitHub-hosted Jekyll blog using the **minima** theme. Feel free to explore Jekyll’s documentation for more advanced features like plugins, collections, and data files.
