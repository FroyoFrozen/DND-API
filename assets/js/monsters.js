console.log("JavaScript is working!");

async function init() {
  const domElement = document.getElementById("dnd");

  if (!domElement) {
    console.error("Element with ID 'dnd' not found.");
    return;
  }

  try {
    const monstersData = await getDndData("https://www.dnd5eapi.co/api/monsters");
    console.log("Monsters data fetched:", monstersData);

    const selectedMonsterNames = [
      "Deva",
      "Shambling Mound",
      "Adult Red Dragon",
      "Gelatinous Cube",
      "Lich",
      "Mummy Lord",
      "Owlbear",
      "Doppelganger",
      "Tarrasque",
      "Unicorn",
      "Grimlock",
      "Zombie"
    ];

    const filteredMonsters = monstersData.results.filter(monster => selectedMonsterNames.includes(monster.name));

    filteredMonsters.forEach(monster => {
      const container = document.createElement("div");
      container.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "transform", "transition", "duration-500", "hover:scale-105");
    
      const image = document.createElement("img");
      image.src = getImageForMonster(monster.name);
      image.alt = monster.name;
      image.classList.add("w-full", "h-48", "object-cover", "object-top");
    
      const monsterButton = document.createElement("button");
      monsterButton.textContent = monster.name;
      monsterButton.classList.add("bg-blue-900", "text-white", "px-4", "py-2", "block", "text-center", "w-full", "hover:bg-blue-700");
    
      // Link to monster details page on button click
      monsterButton.addEventListener("click", () => {
        window.location.href = `monster-details.html?monster=${monster.index}`;
      });
    
      // Append all elements to container
      container.appendChild(image);
      container.appendChild(monsterButton);
      domElement.appendChild(container);
    });
    
  } catch (error) {
    console.error("Error fetching monsters:", error);
  }
}

/**
 * Async function to get the data from the D&D 5e API
 * @returns - returns a promise
 */
async function getDndData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}


// Function to get image path based on monster name
function getImageForMonster(monsterName) {
  return `assets/images/${monsterName.toLowerCase().replace(/ /g, '-')}.png`;
}

document.addEventListener("DOMContentLoaded", init);
