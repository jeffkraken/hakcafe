document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const id = tile.dataset.id;
    const frame = document.getElementById('challenge-frame');
    frame.src = `challenges/${id}.html`;
    frame.dataset.id = id;

    document.getElementById('challenge-container').style.display = 'block';
  });
});

function closeChallenge() {
  const container = document.getElementById('challenge-container');
  const frame = document.getElementById('challenge-frame');

  frame.src = "";
  container.style.display = 'none';
}

// Listen for message from iframe when challenge is solved
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'challengeSolved') {
    const id = event.data.id;
    localStorage.setItem(`solved-${id}`, true);
    checkSolvedTiles();
    closeChallenge();
  }
});

// Highlight solved challenges
function checkSolvedTiles() {
  document.querySelectorAll('.tile').forEach(tile => {
    const id = tile.dataset.id;
    if (localStorage.getItem(`solved-${id}`)) {
      tile.classList.add('solved');
    }
  });

  const allSolved = [...Array(9)].every((_, i) => localStorage.getItem(`solved-${i+1}`));
  if (allSolved) {
    document.getElementById('status').textContent = "🎉 All challenges complete! Loading next board soon...";
    setTimeout(() => location.reload(), 3000);
  }
}

checkSolvedTiles();
