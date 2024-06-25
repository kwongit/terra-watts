document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".fade-in");

  function checkIfInView() {
    elements.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      if (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      ) {
        element.classList.add("in-view");
      }
    });
  }

  window.addEventListener("scroll", checkIfInView);
  setTimeout(checkIfInView, 500); // Delay the initial check by 100ms
});
