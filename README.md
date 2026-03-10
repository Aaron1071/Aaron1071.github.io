# Aaron's Cybersecurity Portfolio

> Built in the terminal. Deployed on the internet.

Live at: **https://Aaron1071.github.io**

---

## 🚀 Quick Setup (GitHub Pages — Free Hosting)

1. **Create a repo** named exactly: `Aaron1071.github.io`
2. **Upload all these files** to the repo (drag & drop on GitHub or use git)
3. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)**
4. Done! Your site is live at `https://Aaron1071.github.io` in ~2 minutes

---

## ✍️ How to Add a New Writeup

### Step 1 — Add entry to `data/writeups.json`

Open `data/writeups.json` and add a new object to the array:

```json
{
  "id": 3,
  "title": "Your Writeup Title",
  "slug": "your-writeup-slug",
  "category": "CTF",
  "difficulty": "Medium",
  "date": "2026-03-15",
  "excerpt": "Short description shown on the card (1-2 sentences).",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "link": "writeups/your-writeup-slug.html",
  "coming_soon": false
}
```

**Categories:** `CTF` | `Web` | `Pwn` | `Forensics` | `Misc`  
**Difficulty:** `Easy` | `Medium` | `Hard`  
**coming_soon:** `true` = card shows but no link; `false` = fully clickable

### Step 2 — Duplicate the template

Copy `writeups/template.html` → rename to `writeups/your-writeup-slug.html`

Open the new file and:
- Change the `<title>` tag
- Update the category badge, difficulty, date, title, tags in the header
- Write your content in the `<!-- WRITE YOUR CONTENT BELOW -->` section
- Use `<div class="code-block"><pre><code class="language-bash">...</code></pre><button ...>Copy</button></div>` for code blocks
- Use `<div class="flag-box">` for flags

### Step 3 — Push to GitHub

```bash
git add .
git commit -m "feat: add writeup - Your Title"
git push origin main
```

Your writeup is live within seconds! 🚀

---

## 🎨 Customizing Colors

All colors are CSS variables in `assets/css/main.css`:

```css
--clr-cyan:   #00f5ff;   /* Primary accent */
--clr-purple: #7b2fff;   /* Secondary accent */
--clr-green:  #00e5b0;   /* Status/success */
--clr-pink:   #ff2d78;   /* Error/hard difficulty */
```

Change any of these to retheme the entire site instantly.

---

## 📁 Project Structure

```
/
├── index.html              ← Main page
├── 404.html                ← Custom 404
├── data/
│   └── writeups.json       ← ADD YOUR WRITEUPS HERE
├── writeups/
│   └── template.html       ← COPY THIS for each writeup
├── assets/
│   ├── css/                ← Modular CSS files
│   │   ├── main.css        ← Variables & global styles
│   │   ├── animations.css
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── skills.css
│   │   ├── writeups.css
│   │   ├── timeline.css
│   │   └── contact.css
│   ├── js/                 ← Modular JS (ES6 modules)
│   │   ├── main.js         ← Entry point
│   │   ├── particles.js
│   │   ├── typewriter.js
│   │   ├── glitch.js
│   │   ├── nav.js
│   │   └── writeups.js
│   └── images/
│       └── favicon.svg
```

---

## 🔗 Updating Social Links

In `index.html`, find the `contact-info` section and update:

```html
<a href="https://github.com/Aaron1071" ...>
<a href="https://twitter.com/YOUR_HANDLE" ...>
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>
<a href="https://tryhackme.com/p/YOUR_USERNAME" ...>
<a href="https://app.hackthebox.com/profile/YOUR_ID" ...>
```

---

*Built with pure HTML/CSS/JS. No frameworks. No BS.*