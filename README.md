# HAKCafe Vuln Site

Welcome to the **HAKCafe Vuln Site** – a simple, browser-based vulnerable web app designed for cybersecurity students to explore and practice web application security concepts.

This project simulates a basic challenge environment with clickable tiles that may correspond to various exercises or hidden vulnerabilities. Perfect for labs, workshops, or CTF-style events.

---

## Features

- Clickable challenge grid with 9 tiles
- Currently includes 27 different challenges.
  - CTF-style challenges that require a found flag for completion.
  - Multiple-choice-style challenges that require selecting an answer from a dropdown menu.
  - Short answer challenges that require typing out a port, user, or file name.
- `refresh-tiles` button that swaps the current tiles with 9 random tiles
- Simple UI with dark mode styling
- Custom status output area
- Easily extensible HTML/JS/CSS structure
- `robots.txt` hinting at restricted files

---

## TO-DO

- Add fourth set of challenges (bring total to 36)
- Fix commented out `keep-going` button in both index and script
- Fix `refresh-tiles` so that it cycles in 9 unique challenges (not repeating ones that were in the last batch).
- Fix `keep-going` so that it only cycles in unsolved challenges
