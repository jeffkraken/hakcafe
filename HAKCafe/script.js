document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const id = tile.dataset.id;
      window.open(`challenges/${id}.html`, '_blank');
    });
  });
  
  // Optional: Track solved tiles with localStorage
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
      setTimeout(() => location.reload(), 3000); // Or load next set
    }
  }
  
  checkSolvedTiles();
  