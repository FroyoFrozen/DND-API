const currentLocation = window.location.href;
const menuLinks = document.querySelectorAll('nav a');


menuLinks.forEach(link => {
  if (link.href === currentLocation) {
    link.classList.add('bg-blue-700');
  }
});