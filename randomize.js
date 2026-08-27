function updateGameUI(gameValue) {
  const marvelCheckboxSection = document.getElementById('marvel-legendary-player-count-container');
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
  document.getElementById('placeholder-results').style.display = 'block';
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
  const gameValue = document.getElementById('game-select').value;
  document.querySelectorAll('.result-list-li').forEach((li) => li.remove());

  if (gameValue === 'cosmic-encounter') {
    const cosmicResults = document.getElementById('cosmic-encounter-results');
    const cosmicPlayerCount =
      document.getElementById('cosmic-encounter-player-count-value').value;

    if (cosmicPlayerCount === null || cosmicPlayerCount < 3 || cosmicPlayerCount > 8 || cosmicPlayerCount === undefined) {
      alert('Hey! Select between 3 to 8 players');
    }

    let cosmicAlienResults;
    cosmicAlienResults = pickUniqueRandom(cosmicEncounterAliensList, cosmicPlayerCount);

    const resultsList = document.getElementById('cosmic-results-list');

    // Clear previous randomize runs so you don't keep stacking aliens
    resultsList.querySelectorAll('.result-list-li').forEach((li) => li.remove());

    cosmicAlienResults.forEach((alien) => {
      const li = document.createElement('li');
      li.className = 'result-list-li';
      li.textContent = alien;
      resultsList.appendChild(li);
    });

    document.getElementById('cosmic-encounter-player-count-result-list-item').textContent = cosmicPlayerCount;
    document.getElementById('placeholder-results').style.display = 'none';
  } else if (gameValue === 'marvel-legendary') {
    const marvelResults = document.getElementById('marvel-legendary-results');
    const marvelPlayerCount = document.getElementById('marvel-legendary-player-count').value;
    marvelResults.style.display = 'block';

    let heroResults;
    if (marvelPlayerCount === 1) {
      heroResults = pickUniqueRandom(marvelLegendaryHeroes, 3);
    } else {
      heroResults = pickUniqueRandom(marvelLegendaryHeroes, 5);
    }

    const schemeResult = pickUniqueRandom(marvelLegendarySchemes, 1);
    const mastermindResult = pickUniqueRandom(marvelLegendaryMasterMinds, 1);

    let villainGroupResults;
    if (marvelPlayerCount === '1') {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 1);
    } else if (marvelPlayerCount === '2') {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 2);
    } else if (
      marvelPlayerCount === '3' ||
      marvelPlayerCount === '4'
    ) {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 3);
    } else {
      villainGroupResults = pickUniqueRandom(marvelLegendaryVillainGroups, 4);
    }

    let henchmenGroupResults;
    if (
      marvelPlayerCount === '4' ||
      marvelPlayerCount === '5'
    ) {
      henchmenGroupResults = pickUniqueRandom(marvelLegendaryHenchmenVillains, 2);
    } else {
      henchmenGroupResults = pickUniqueRandom(marvelLegendaryHenchmenVillains, 1);
    }

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