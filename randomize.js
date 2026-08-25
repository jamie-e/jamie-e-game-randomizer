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

function pickUniqueRandom(source, count) {
  const pool = [...source];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
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
    marvelResults.style.display = 'block';

    let heroResults;
    if (document.getElementById('marvel-legendary-player-count').value === 1) {
      heroResults = pickUniqueRandom(marvelLegendaryHeroes, 3);
    } else {
      heroResults = pickUniqueRandom(marvelLegendaryHeroes, 5);
    }

    let villainGroupResults;
    if (document.getElementById('marvel-legendary-player-count').value === 1) {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 3);
    } else {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 5);
    }

    let henchmenGroupResults;
    if (
      document.getElementById('marvel-legendary-player-count').value === 4 ||
      document.getElementById('marvel-legendary-player-count').value === 5
    ) {
      henchmenGroupResults = pickUniqueRandom(marvelLegendaryHenchmenVillains, 2);
    } else {
      henchmenGroupResults = pickUniqueRandom(marvelLegendaryHenchmenVillains, 1);
    }

    const schemeResult = pickUniqueRandom(marvelLegendarySchemes, 1);
    const mastermindResult = pickUniqueRandom(marvelLegendaryMasterMinds, 1);

    const coinFlipItems = [1, 2];
    const grievousWoundResult = coinFlipItems[Math.floor(Math.random() * coinFlipItems.length)];
    const sidekickResult = coinFlipItems[Math.floor(Math.random() * coinFlipItems.length)];
    const specialBystanderResult = coinFlipItems[Math.floor(Math.random() * coinFlipItems.length)];

    document.getElementById('marvel-heroes-results').textContent = heroResults.join(', ');
    document.getElementById('marvel-scheme-results').textContent = schemeResult.join(', ');
    document.getElementById('marvel-mastermind-results').textContent = mastermindResult.join(', ');
    document.getElementById('marvel-villain-group-results').textContent = villainGroupResults.join(', ');
    document.getElementById('marvel-henchmen-results').textContent = henchmenGroupResults.join(', ');

    document.getElementById('marvel-grievous-wounds').textContent = (grievousWoundResult === 1 ? 'Yes' : 'No');
    document.getElementById('marvel-sidekick-results').textContent = (sidekickResult === 1 ? 'Yes' : 'No');
    document.getElementById('marvel-special-bystander-results').textContent = (specialBystanderResult === 1 ? 'Yes' : 'No');
  }
}