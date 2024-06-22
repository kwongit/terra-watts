document.querySelectorAll(".image-transform").forEach((element) => {
  const image = element.querySelector("img");

  function handleMouseMove(event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element.
    const y = event.clientY - rect.top; // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateY = percentX * 15; // Adjust the rotation angle as needed
    const rotateX = -percentY * 15; // Adjust the rotation angle as needed

    image.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  function handleMouseLeave() {
    image.style.transform = `rotateY(0deg) rotateX(0deg)`;
  }

  function updateTransformEffect() {
    if (window.matchMedia("(orientation: landscape)").matches) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    } else {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    }
  }

  // Initial check
  updateTransformEffect();

  // Update on orientation change
  window.addEventListener("orientationchange", updateTransformEffect);
});
