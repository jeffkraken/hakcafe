const totalChallenges = 32;
const visibleCount = 9;

function getChallenges() {
  const isSolved = (id) => !!localStorage.getItem(`solved-${id}`);

  // for when all is solved?
  let firstUnsolved = null;
  for (let i = 1; i <= totalChallenges; i++) {
    if (!isSolved(i)) {firstUnsolved = i; break;}
  }
  if (firstUnsolved === null) return [];

  
  // starting block based on unsolved challenges
  const blockStart = Math.floor((firstUnsolved -1) / visibleCount) * visibleCount + 1;
  const blockEnd = Math.min(blockStart + visibleCount -1, totalChallenges);

  // show unsolved from block
  const ids = [];
  for (let id = blockStart; id <= blockEnd; id++) {
    if (!isSolved(id)) ids.push(id);
  }
  return ids;
}
  

function renderTiles() {
  const grid = document.getElementById('tile-grid');
  grid.innerHTML = '';
  const selected = getChallenges();

  selected.forEach(id => {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.dataset.id = id;
    div.textContent = `Challenge ${id}`;

    if (localStorage.getItem(`solved-${id}`)) {
      div.classList.add('solved');
    }

    div.addEventListener('click', () => {
      const frame = document.getElementById('challenge-frame');
      frame.src = `challenges/${id}.html`;
      frame.dataset.id = id;
      document.getElementById('challenge-container').style.display = 'block';
    });

    grid.appendChild(div);
  });
}

// refresh to unsolved challenges
function refreshTiles() {
  renderTiles();
  document.getElementById('status').textContent = '';
}

function closeChallenge() {
  const container = document.getElementById('challenge-container');
  const frame = document.getElementById('challenge-frame');
  frame.src = "";
  container.style.display = 'none';
}

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'challengeSolved') {
    const id = event.data.id;
    localStorage.setItem(`solved-${id}`, true);
    checkSolvedTiles();
    closeChallenge();
  }
});

function checkSolvedTiles() {
  document.querySelectorAll('.tile').forEach(tile => {
    const id = tile.dataset.id;
    if (localStorage.getItem(`solved-${id}`)) {
      tile.classList.add('solved');
    }
  });

  const allSolved = [...document.querySelectorAll('.tile')].every(tile =>
    localStorage.getItem(`solved-${tile.dataset.id}`)
  );

  if (allSolved) {
    document.getElementById('status').textContent = "🎉 All 9 challenges complete! Click Submit Score to generate a pdf for points! After that... Try refreshing for more!";
    setTimeout(() => refreshTiles(), 4000);
  }
}

// document.getElementById("keep-going").addEventListener("click", () => {
//     const container = document.getElementById("challenges"); // Assumes a container holds your challenge links
//     for (let i = 20; i <= 28; i++) {
//         if (!localStorage.getItem(`challenge-${i}`)) {
//             const link = document.createElement("a");
//             link.href = `challenges/${i}.html`;
//             link.textContent = `Challenge ${i}`;
//             link.className = "challenge-link";
//             container.appendChild(link);
//             container.appendChild(document.createElement("br"));
//         }
//     }
// });

document.getElementById("submit-score").addEventListener("click", async () => {
    const userName = prompt("Enter your name:");
    if (!userName) return;

    // Gather completed challenges from localStorage
    const completed = [];
    for (let i = 1; i <= totalChallenges; i++) {
        if (localStorage.getItem(`solved-${i}`)) {
            completed.push(`Challenge ${i}`);
        }
    }

    const docText =
        `HAKCafe Transcript of Completion\n` +
        `Submit to info(at)cybergoblin.org for a digital badge\n\n` +
        `User: ${userName}\n\n` +
        `Completed Challenges:\n` +
        (completed.length ? completed.join("\n") : "None yet");

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const lineHeight = 10;
    const maxWidth = pageWidth - margin * 2;

    const wrappedLines = docText
        .split("\n")
        .flatMap(line => doc.splitTextToSize(line, maxWidth));


    let y = margin + lineHeight;
    for (const line of wrappedLines) {
        if (y > pageHeight - margin) {
            doc.addPage();
            y = margin + lineHeight;
        }
        doc.text(line, margin, y);
        y += lineHeight;
    }

    const safeName = String(userName).replace(/[^\w\-]+/g, "_");
    doc.save(`${safeName}-score.pdf`);
});

renderTiles();









