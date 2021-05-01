window.onscroll = function() {
    let scrollPos = window.pageYOffset;
  if (scrollPos <= 0) {
    document.querySelector(".nav").style.background = "none";
    document.querySelector(".logo").style.background = "none";
  } else {
    document.querySelector(".nav").style.background = "#333333";
    document.querySelector(".logo").style.background = "#333333";
  }
}