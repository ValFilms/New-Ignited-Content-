IGNITED CONTENT CO — WEBSITE
============================

This folder is your complete, ready-to-upload website. Everything in it
is static — no build step, no server code. Upload the CONTENTS of this
folder (not the folder itself) to any static host.

WHAT'S INSIDE
-------------
  index.html ............ Home page (this is the page visitors land on)
  privacy.html .......... Privacy Policy
  terms.html ............ Terms & Conditions
  404.html .............. Branded "page not found" page
  *.css ................. Styles (5 files)
  *.jsx ................. Page code (6 files)
  robots.txt ............ Search-engine instructions
  sitemap.xml ........... Page map for search engines

HOW TO DEPLOY (pick one)
------------------------
  • Netlify  — drag this whole folder onto https://app.netlify.com/drop
  • Vercel   — "Add New Project" > drag the folder, or `vercel` in this dir
  • Cloudflare Pages, GitHub Pages, S3, or any web host — upload all files,
    keeping them together in the same directory.

  index.html is served automatically as the home page. 404.html is shown
  for unknown URLs on most hosts.

BEFORE YOU GO LIVE — UPDATE THESE
---------------------------------
  1. DOMAIN: search the files for "ignitedcontent.co" and replace with your
     real domain (in index.html, privacy.html, terms.html, sitemap.xml,
     robots.txt). Affects social-share previews and SEO only.

  2. THE BOOKING FORM is a working demo — it validates and shows a success
     screen, but does NOT yet send submissions anywhere. To receive booking
     requests, connect it to a form service (e.g. Formspree, Basin) or a
     scheduler (e.g. Calendly). Ask your developer, or send this folder back
     and we'll wire it up.

  3. CONTACT EMAIL is set to Val@Ignitedcontent.co on the legal pages.

NOTES
-----
  • The orange "Ignited" ball is drawn in code (CSS), so it stays razor-sharp
    at any size and needs no image file.
  • Internet connection required on first load (fonts + framework load from a
    CDN).

© 2026 Ignited Content Co.
