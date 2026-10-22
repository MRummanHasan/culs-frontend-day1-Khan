// 1. The names of the herb data files
const herbNames = ["basil", "mint", "rosemary", "thyme", "parsley"];

// 2. Find the parts of the page we will update
const grid = document.querySelector("#herb-grid");
const search = document.querySelector("#herb-search");
const filter = document.querySelector("#category-filter");
const status = document.querySelector("#search-status");
const detail = document.querySelector("#detail-content");
const placeholder = document.querySelector(".detail-placeholder");

let herbs = [];

// 3. Read every herb's JSON file
async function loadGarden() {
  for (const name of herbNames) {
    try {
      const response = await fetch(`data/${name}.json`);
      if (!response.ok) continue;
      const herb = await response.json();
      herbs.push(herb);
    } catch (error) {
      console.log("Could not load:", name);
    }
  }

  showCards();
  showSelectedHerb();
}

// 4. Create one card for each herb
function showCards() {
  grid.replaceChildren();

  const word = search.value.toLowerCase().trim();
  const category = filter.value;

  const matchingHerbs = herbs.filter(function (herb) {
    const matchesWord = (herb.name + " " + herb.scientificName)
      .toLowerCase().includes(word);
    const matchesCategory = category === "all" || herb.category === category;
    return matchesWord && matchesCategory;
  });

  matchingHerbs.forEach(function (herb) {
    const card = document.createElement("article");
    card.className = "herb-card";

    const emoji = document.createElement("div");
    emoji.className = "herb-art";
    emoji.textContent = herb.emoji;

    const title = document.createElement("h3");
    title.textContent = herb.name;

    const description = document.createElement("p");
    description.textContent = herb.description;

    const link = document.createElement("a");
    link.className = "text-button";
    link.href = "#" + herb.id;
    link.textContent = "Explore herb";

    card.append(emoji, title, description, link);
    grid.append(card);
  });

  status.textContent = matchingHerbs.length + " herbs shown";
}

// 5. Show the selected herb when its link/hash changes
async function showSelectedHerb() {
  const id = location.hash.slice(1);
  if (!id) return;

  const herb = herbs.find(function (item) {
    return item.id === id;
  });

  if (!herb) {
    placeholder.hidden = false;
    placeholder.querySelector("h2").textContent = "Herb not found";
    return;
  }

  placeholder.hidden = true;
  detail.replaceChildren();

  const title = document.createElement("h2");
  title.textContent = herb.emoji + " " + herb.name;

  const scientific = document.createElement("p");
  scientific.textContent = herb.scientificName;

  const description = document.createElement("p");
  description.textContent = herb.description;

  const care = document.createElement("p");
  care.textContent = "Light: " + herb.light + " | Water: " + herb.water;

  detail.append(title, scientific, description, care);
}

// 6. Update cards when the visitor searches or changes category
search.addEventListener("input", showCards);
filter.addEventListener("change", showCards);

// Update selected herb when the URL hash changes
window.addEventListener("hashchange", showSelectedHerb);

// Start the garden
loadGarden();
