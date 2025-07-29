# HAKCafe Vuln Site

Welcome to the **HAKCafe Vuln Site** – a simple, browser-based vulnerable web app designed for cybersecurity students to explore and practice web application security concepts.

This project simulates a basic challenge environment with clickable tiles that may correspond to various exercises or hidden vulnerabilities. Perfect for labs, workshops, or CTF-style events.

---

## Features

- Clickable challenge grid with 9 tiles
- Currently includes 18 different challenges.
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

- Add third set of challenges (bring total to 27)
- Add `keep-going` button to allow refresh to new tiles that haven't been completed yet without clearing out progress.
- Add `submit-score` button to create a pdf file that shows which challenges were completed by the user.
