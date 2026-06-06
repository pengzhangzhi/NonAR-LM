# NonAR-LM @ COLM 2026

Website for the workshop **Non-Autoregressive Language Models for Fast and Flexible Text
Generation**, co-located with [COLM 2026](https://colmweb.org/) in San Francisco on
**October 9, 2026**.

🔗 **Live site:** https://pengzhangzhi.github.io/NonAR-LM/

## Overview

A single-page static site — plain HTML, CSS, and a small amount of JavaScript. No build
step, no dependencies. It is served directly by GitHub Pages.

```
index.html              # all page content (edit here)
assets/
  css/styles.css        # theme + layout
  js/main.js            # nav, scroll-spy, key-date logic (enhancement only)
  img/people/           # speaker & organizer headshots (square ~480px)
  img/logos/            # sponsor / venue logos
  img/favicon.svg
.nojekyll               # tells GitHub Pages to serve files as-is
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Editing content

All content lives in `index.html`, organized into clearly commented sections
(`Hero`, `Key dates`, `News`, `About`, `Topics`, `Call for Papers`, `Schedule`,
`Speakers`, `Panel`, `Organizers`, `Inclusion`, `Footer`).

**Add a news item** — add an `<li>` to the `.news-list` in the *News* section:

```html
<li><time datetime="2026-07-24">Jul 2026</time><span>Acceptance notifications sent.</span></li>
```

**Add a speaker / organizer** — copy an existing `<figure class="person">…</figure>` block
and update the photo, name, link, and affiliation. Add the headshot to
`assets/img/people/` (square crop, ~480px, named `first-last.jpg`).

**Add the OpenReview link** — in the *Call for Papers* section, replace the disabled button:

```html
<a class="btn btn--disabled" aria-disabled="true" href="#cfp">OpenReview — coming soon</a>
```

with the live link:

```html
<a class="btn btn--primary" href="https://openreview.net/group?id=…" target="_blank" rel="noopener">Submit on OpenReview</a>
```

**Key dates** — edit the `.date-card` blocks under *Key dates*. The `data-deadline="YYYY-MM-DD"`
attribute lets the page automatically grey out past dates and flag the next upcoming one.

**Add accepted papers** — after notifications, add an "Accepted Papers" `<section>` (Oral /
Spotlight / Poster) following the same card pattern.

## Deploying to GitHub Pages

1. Push to the `main` branch of `github.com/pengzhangzhi/NonAR-LM`.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **`main`**, folder **`/ (root)`**, then **Save**.
3. The site publishes at https://pengzhangzhi.github.io/NonAR-LM/ within a minute or two.

All asset paths are relative, so the site works correctly under the `/NonAR-LM/` project path.

## License

Content © 2026 the workshop organizers. Speaker and organizer photographs remain the property
of their respective owners and are used here for the purpose of the workshop program.
