# Edit Guide

This site is meant to be easy to customize.

## Start the preview

From `/Users/andyalexaitis/Documents/New project`, run:

```zsh
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/projects/web/andrew-portfolio/
```

## Main file to edit

Edit this file:

`/Users/andyalexaitis/Documents/New project/projects/web/andrew-portfolio/owner-content.js`

That one file controls:

- your name and brand text
- your email and phone
- your main CTA labels and links
- service copy
- portfolio project details
- FAQ answers
- final contact section

## Best first changes

1. Keep the headline aligned to the current target lane: remote AI operations, implementation, support, and workflow automation.
2. Keep project claims interview-defensible and tied to files in this workspace.
3. Update the resume files in `assets/resume/` by running `scripts/career/build_remote_ai_ops_resume.py`.
4. Add real public GitHub links only after the repos are polished and intentionally pushed.
5. Add testimonials only when real quotes are available, then turn the testimonials section on.

## Files you usually do not need to edit

- `app.js` controls how the page is rendered
- `styles.css` controls the design
- `index.html` is the page shell

## Local portfolio links

This site already links to:

- `/Users/andyalexaitis/Documents/New project/projects/web/seaaxe-concept`
- `/Users/andyalexaitis/Documents/New project/projects/web/snake`
- `/Users/andyalexaitis/Documents/New project/projects/web/web-studio-site`

So when you run the preview from the project root, those portfolio buttons work locally.
