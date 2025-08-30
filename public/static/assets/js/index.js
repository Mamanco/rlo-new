// Get the button
const mybutton = document.getElementById("backTop");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  // Get the current scroll position
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  // If already at the top, don't do anything
  if (scrollTop === 0) {
    return;
  }

  // Calculate the scroll distance and duration based on the current scroll position
  const scrollDistance = scrollTop;
  const scrollDuration = Math.min(1000, scrollDistance / 3);

  // Define the start time
  const startTime = performance.now();

  // Define the animation function
  function scrollStep(timestamp) {
    // Calculate the time elapsed since the animation started
    const timeElapsed = timestamp - startTime;

    // Calculate the percentage of the animation that has completed
    const percentComplete = Math.min(timeElapsed / scrollDuration, 1);

    // Calculate the new scroll position using an easing function
    const newScrollTop = Math.easeInOutQuad(
      percentComplete,
      scrollTop,
      -scrollTop,
      1
    );

    // Set the new scroll position
    document.documentElement.scrollTop = newScrollTop;
    document.body.scrollTop = newScrollTop;

    // If the animation is not finished, request the next frame
    if (timeElapsed < scrollDuration) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  // Start the animation
  window.requestAnimationFrame(scrollStep);
}

// Easing function
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

mybutton.addEventListener("click", topFunction);
// toggle
// get the menu_bar and ul elements
const menuBar = document.getElementById("menu_bar");
const menuList = document.getElementById("menuList");

// add an event listener to the menu_bar element
menuBar.addEventListener("click", function () {
  // toggle the "active" class on the ul element
  menuList.classList.toggle("active");
});
