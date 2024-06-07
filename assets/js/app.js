console.log("JavaScript is working!");

async function init() {
  const domElement = document.getElementById("dnd");

  const classes = await getDndData("https://www.dnd5eapi.co/api/classes");

  classes.results.forEach(classItem => {
    const container = document.createElement("div");
    container.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "transform", "transition", "duration-500", "hover:scale-105");

    const image = document.createElement("img");
    image.src = getImageForClass(classItem.name);
    image.alt = classItem.name;
    image.classList.add("w-full", "h-48", "object-cover", "object-top");

    const classButton = document.createElement("button");
    classButton.textContent = classItem.name;
    classButton.classList.add("bg-blue-900", "text-white", "px-4", "py-2", "block", "text-center", "w-full", "hover:bg-blue-700");

    classButton.addEventListener("click", () => {
      window.location.href = `class-details.html?class=${classItem.name}`;
    });

    container.appendChild(image);
    container.appendChild(classButton);
    domElement.appendChild(container);
  });
}

async function getDndData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error("Error: ", err);
  }
}

function getImageForClass(className) {
  return `assets/images/${className.toLowerCase()}.png`;
}

init();
