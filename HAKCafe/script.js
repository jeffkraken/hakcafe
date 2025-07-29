const totalChallenges = 27;
const visibleCount = 9;

function getRandomChallenges() {
  const all = Array.from({ length: totalChallenges }, (_, i) => i + 1);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, visibleCount);
}

function renderTiles() {
  const grid = document.getElementById('tile-grid');
  grid.innerHTML = '';
  const selected = getRandomChallenges();

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

function refreshTiles() {
  // Clear completions only for visible challenges
  document.querySelectorAll('.tile').forEach(tile => {
    const id = tile.dataset.id;
    localStorage.removeItem(`solved-${id}`);
  });
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
    document.getElementById('status').textContent = "🎉 All 9 challenges complete! Try refreshing for more!";
    setTimeout(() => refreshTiles(), 4000);
  }
}

renderTiles();
