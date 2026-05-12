# GEO audit — compared-to-what

## Applied (this branch)
- [x] Three-tier robots.txt
- [x] llms.txt at root
- [x] sitemap.xml
- [x] JSON-LD (WebSite + Organization + Person, sameAs entity graph anchored at canonical https://www.itsmrmetaverse.com/#aragorn)

## Flagged for Aragorn — content not auto-edited
Inspect each HTML file in this repo:

- Direct answer in the first 100 words of each page? GEO Lab found a +24pp citation rate from answer-first formatting alone.
- Paragraphs at 40-60 words (single extractable idea)? Standard long-form 100-200 word paragraphs are sub-optimal for AI chunking.
- H2 headers in question form ("What is X?", "How does Y work?")? 3.4x more likely to be cited.
- `<title>` (≤60 chars), `<meta name="description">` (≤160 chars, lead with the answer), `<link rel="canonical">` — verify each page.
- Open Graph + Twitter Card meta — verify on every page.

## Production URL
https://compared-to-what.itsmrmetaverse.com — confirm correctness against the actual deployment (CNAME / DNS).

## Reference
See [Stop Optimizing for Clicks. Start Optimizing for Citations.](https://parallax.itsmrmetaverse.com/article/stop-optimizing-for-clicks-start-optimizing-for-citations) for the full verified GEO field manual.
