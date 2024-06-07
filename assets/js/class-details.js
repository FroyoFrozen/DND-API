function getQueryParam(parameterName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

async function getClassDetails(className) {
  try {
      const lowerCaseClassName = className.toLowerCase();
      const apiUrl = `https://www.dnd5eapi.co/api/classes/${lowerCaseClassName}`;
      const response = await fetch(apiUrl);
      const classData = await response.json();
      return classData;
  } catch (error) {
      console.error("Error fetching class details:", error);
      return null;
  }
}

async function displayClassDetails() {
  const className = getQueryParam("class");

  if (className) {
      const classImage = document.getElementById("class-image");
      const classNameElement = document.getElementById("class-name");
      const proficiencyBox = document.getElementById("proficiency-box");
      const equipmentBox = document.getElementById("equipment-box");
      const subclassBox = document.getElementById("subclass-box");

      const classData = await getClassDetails(className);

      if (classData) {
          classImage.src = getImageForClass(className);
          classImage.alt = classData.name;

          classNameElement.textContent = classData.name;

          const proficienciesHTML = classData.proficiencies.map(proficiency => `<li>${proficiency.name}</li>`).join("");
          proficiencyBox.innerHTML = `<h3 class="text-lg font-bold mb-2">Proficiencies</h3><ul>${proficienciesHTML}</ul>`;

          const startingEquipmentHTML = classData.starting_equipment.map(equipment => `<li>${equipment.quantity}x ${equipment.equipment.name}</li>`).join("");
          const startingEquipmentOptionsHTML = classData.starting_equipment_options.map(option => `<li>${option.desc}</li>`).join("");
          equipmentBox.innerHTML = `
              <h3 class="text-lg font-bold mb-2">Starting Equipment</h3>
              <ul>${startingEquipmentHTML}</ul>
              <p class="mt-2"><strong>Starting Equipment Options:</strong></p>
              <ul>${startingEquipmentOptionsHTML}</ul>
          `;

          const subclassHTML = `<p class="text-lg">${classData.subclasses[0].name}</p>`;
          subclassBox.innerHTML = `<h3 class="text-lg font-bold mb-2">Subclass</h3>${subclassHTML}`;
      } else {
          classNameElement.textContent = "Class details not found";
      }
  } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Class not specified.";
      document.body.appendChild(errorMessage);
  }
}

function getImageForClass(className) {
  return `assets/images/${className.toLowerCase()}.png`;
}

displayClassDetails();
