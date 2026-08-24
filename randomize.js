function updateGameUI(gameValue) {
  const marvelCheckboxSection = document.getElementById('marvel-legendary-solo-checkbox-container');
  const cosmicPlayerSection = document.getElementById('cosmic-encounter-player-count');
  const marvelResults = document.getElementById('marvel-legendary-results');
  const cosmicResults = document.getElementById('cosmic-encounter-results');

  marvelCheckboxSection.style.display = gameValue === 'marvel-legendary' ? 'block' : 'none';
  cosmicPlayerSection.style.display = gameValue === 'cosmic-encounter' ? 'block' : 'none';

  if (gameValue === 'marvel-legendary') {
    marvelCheckboxSection.style.display = 'block';
    cosmicPlayerSection.style.display = 'none';
    cosmicResults.style.display = 'none';
  }

  if (gameValue === 'cosmic-encounter') {
    cosmicPlayerSection.style.display = 'block';
    marvelCheckboxSection.style.display = 'none';
    marvelResults.style.display = 'none';
  }
}

document.getElementById('game-select').addEventListener('change', (event) => {
  updateGameUI(event.target.value);
});

function randomize() {
  const gameValue = document.getElementById('game-select').value
  
  if (gameValue === 'cosmic-encounter') {
    const cosmicResults = document.getElementById('cosmic-encounter-results');
  } else if (gameValue === 'marvel-legendary') {
    const marvelResults = document.getElementById('marvel-legendary-results');
  }
}