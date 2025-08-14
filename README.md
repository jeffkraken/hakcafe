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
- `refresh-tiles` button that swaps the current tiles with the next set of unsolved tiles
- Simple UI with dark mode styling
- Custom status output area
- Easily moddable HTML/JS/CSS structure
- `robots.txt` hinting at restricted files

---

## TO-DO

- Add fourth set of challenges (bring total to 36)
- Update storage to focus on sesssions or use sqlite.
- Fix challenge 19, unlockInvite() not generating right flag. (correct should be flag{invite-code-123})
- Fix challenge 23, window sizing for 'terminal' is too big and answer is redundant.
