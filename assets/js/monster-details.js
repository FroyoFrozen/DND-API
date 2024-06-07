// Function to extract query parameter from URL
function getQueryParam(parameterName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

async function getMonsterDetails(monsterIndex) {
  try {
    const apiUrl = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`;
    const response = await fetch(apiUrl);
    const monsterData = await response.json();
    return monsterData;
  } catch (error) {
    console.error("Error fetching monster details:", error);
    return null;
  }
}

async function displayMonsterDetails() {
  const monsterIndex = getQueryParam("monster");

  if (monsterIndex) {
    const monsterData = await getMonsterDetails(monsterIndex);

    if (monsterData) {
      const monsterImageElement = document.getElementById("monster-image");
      const monsterNameElement = document.getElementById("monster-name");
      const monsterSizeElement = document.getElementById("monster-size");
      const monsterTypeElement = document.getElementById("monster-type");
      const monsterAlignmentElement = document.getElementById("monster-alignment");
      const monsterActionsList = document.getElementById("monster-actions");

      // Set monster image source
      monsterImageElement.src = getImageForMonster(monsterData.name);

      monsterNameElement.textContent = monsterData.name;
      monsterSizeElement.textContent = `Size: ${monsterData.size}`;
      monsterTypeElement.textContent = `Type: ${monsterData.type}`;
      monsterAlignmentElement.textContent = `Alignment: ${monsterData.alignment}`;

      // Display monster actions
      monsterData.actions.forEach(action => {
        const actionItem = document.createElement("li");
        actionItem.innerHTML = `
          <h3 class="text-lg font-bold">${action.name}</h3>
          <p class="text-base">${action.desc}</p>
        `;
        monsterActionsList.appendChild(actionItem);
      });
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Monster details not found.";
      document.body.appendChild(errorMessage);
    }
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Monster index not specified.";
    document.body.appendChild(errorMessage);
  }
}

function getImageForMonster(monsterName) {
  return `assets/images/${monsterName.toLowerCase().replace(/ /g, '-')}.png`;
}

document.addEventListener("DOMContentLoaded", displayMonsterDetails);
