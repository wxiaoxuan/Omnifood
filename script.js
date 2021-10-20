// ==============================================================================================
// SET CURRENT YEAR
// ==============================================================================================

const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear;
yearEL.textContent = currentYear;

// ==============================================================================================
// MAKE MOBILE NAVIGATION WORK
// ==============================================================================================

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  //toggle : add & remove all at the same time
  headerEl.classList.toggle("nav-open");
});

// ==============================================================================================
// SMOOTH SCROLLING ANIMATION
// ==============================================================================================

// select all the anchor elements links (a:link)
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // console.log(e);
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href);

    //OMNIFOOD LOGO: SCROLL BACK TO TOP
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      //console.log(href);
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //CLOSE MOBILE NAVIGATION
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// ==============================================================================================
// STICKY NAVIGATION
// ==============================================================================================

const sectionheroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(function(entries) {
  const ent = entries[0];
  console.log(ent);
  //if (ent.isIntersecting === false)
  if (!ent.isIntersecting)
  document.body.classList.add('sticky');

  if (ent.isIntersecting)
  document.body.classList.remove('sticky');
}, 
{
  root: null, //observe the hero section inside the viewport
  threshold: 0 , //will have an event as soon as 0% of hero-section is inside of viewport
  rootMargin: "-70px",
});

obs.observe(sectionheroEl); //observe some elements in the HTML using this observer 

// ==============================================================================================
// Fixing flexbox gap property missing in some Safari versions
// ==============================================================================================

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js