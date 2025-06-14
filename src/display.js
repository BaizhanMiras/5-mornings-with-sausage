export function showBlackDisplay() {
  const blackDisplay = document.createElement("div");
  blackDisplay.className = "black-display";
  document.body.appendChild(blackDisplay);
  blackDisplay.classList.add("active");

  setTimeout(() => {
    blackDisplay.classList.remove("active");
    blackDisplay.offsetWidth;
  }, 3000)
}
