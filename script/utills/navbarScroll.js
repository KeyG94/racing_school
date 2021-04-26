window.onscroll = function() {
    let scrollPos = window.pageYOffset;
  if (scrollPos <= 0) {
    document.querySelector(".nav").style.background = "none";
  } else {
    document.querySelector(".nav").style.background = "#333333";
  }
}