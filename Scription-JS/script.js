(function () {

  const navLinks = document.querySelectorAll('nav ul li a');
  const logo = document.querySelector('.logo');

  navLinks.forEach(link => link.addEventListener('click', smoothScroll));
  logo.addEventListener('click', scrollToTop);

  function smoothScroll(event){
    event.preventDefault();

    const targetID = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetID);

    const originalTop = Math.floor(targetSection.getBoundingClientRect().top) - 101;
    window.scrollBy({
      top: originalTop,
      left: 0,
      behavior: 'smooth'
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('load', function(){
    const posts = document.querySelectorAll('section');
    let postTops = [];
    let pageTop;
    let counter = 0;
    let prevCounter = 0;
    let doneResizing;

    resetPagePosition();

    window.addEventListener('scroll', function(){
      pageTop = window.pageYOffset + window.innerHeight * 0.25;   // your updated offset

      if (pageTop > postTops[counter + 1]) {
        counter++;
      } else if (counter > 0 && pageTop < postTops[counter]) {
        counter--;
      }

      // 🔒 Clamp counter so it never goes out of range
      if (counter < 0) counter = 0;
      if (counter > navLinks.length - 1) counter = navLinks.length - 1;

      if (counter !== prevCounter) {
        navLinks.forEach(link => link.removeAttribute('class'));

        const thisLink = document.querySelector(`nav ul li:nth-child(${counter + 1}) a`);
        if (thisLink) thisLink.className = 'selected';

        prevCounter = counter;
      }
    });

    window.addEventListener('resize', function(){
      clearTimeout(doneResizing);
      doneResizing = setTimeout(function(){
        resetPagePosition();
      }, 500);
    });

    function resetPagePosition(){
      postTops = [];

      posts.forEach(function(post){
        postTops.push(post.offsetTop);
      });

      const pagePosition = window.pageYOffset + window.innerHeight * 0.25;
      counter = 0;

      postTops.forEach(function(post){
        if (pagePosition > post){
          counter++;
        }
      });

      // 🔒 Clamp again for safety
      if (counter < 0) counter = 0;
      if (counter > navLinks.length - 1) counter = navLinks.length - 1;

      navLinks.forEach(link => link.removeAttribute('class'));

      const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
      if (thisLink) thisLink.className = 'selected';

      prevCounter = counter;
    }
    
     const slider = document.querySelector('.flexslider .slides');
     let slides = document.querySelectorAll('.flexslider .slides li');

// Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

// Insert clones
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// Refresh NodeList
slides = document.querySelectorAll('.flexslider .slides li');

// Start on real slide 1
let index = 1;
slider.style.transform = `translateX(-${index * 100}%)`;

// -----------------------------
// Slide movement
// -----------------------------
function goToSlide(i) {
  slider.style.transition = 'transform 1s ease';
  slider.style.transform = `translateX(-${i * 100}%)`;
}

// Teleport when hitting clones
slider.addEventListener('transitionend', () => {
  if (slides[index].classList.contains('clone')) {
    slider.style.transition = 'none';

    if (index === slides.length - 1) {
      index = 1; // teleport from firstClone → real slide 1
    } else if (index === 0) {
      index = slides.length - 2; // teleport from lastClone → real last slide
    }

    slider.style.transform = `translateX(-${index * 100}%)`;
  }

    // ⭐ CTA + pagination must update AFTER teleport
    updateActiveSlide();
    updateSquares();
  
});

// Auto-slide
function nextSlide() {
  index++;
  goToSlide(index);
}

// -----------------------------
// Pagination
// -----------------------------
const pagination = document.querySelector('.pagination');
const realSlideCount = slides.length - 2; // remove clones

for (let i = 0; i < realSlideCount; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('click', () => {
    index = i + 1; // real slides start at index 1
    goToSlide(index);

    clearInterval(autoSlide);

    autoSlide = setTimeout(() => {
      autoSlide = setInterval(nextSlide, 4000);
    }, 6000);
  });

  pagination.appendChild(square);
}

// Highlight correct pagination square
function updateSquares() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach((sq, i) => {
    sq.classList.toggle('active', i + 1 === index);
  });
}

// -----------------------------
// CTA animation
// -----------------------------
function updateActiveSlide() {
  slides.forEach((slide, i) => {
    const cta = slide.querySelector('.cta');
    if (!cta) return;

    cta.classList.remove('animate');

    if (i  === index) {
      void cta.offsetWidth; // restart animation
      cta.classList.add('animate');
    }
  });
}

// -----------------------------
// Auto-slide + hover pause
// -----------------------------
let autoSlide = setInterval(nextSlide, 4000);

slider.addEventListener('mouseover', () => {
  clearInterval(autoSlide);
});

slider.addEventListener('mouseout', () => {
  autoSlide = setInterval(nextSlide, 4000);
});

pagination.addEventListener('mouseover', () => {
  clearInterval(autoSlide);
});

pagination.addEventListener('mouseout', () => {
  autoSlide = setInterval(nextSlide, 4000);
});


  });

  let tabs = document.querySelectorAll('#tabs ul li a');

  for(var i =0; i < tabs.length; i++){
    tabs[i].addEventListener('click', selectTab);
  }

  document.querySelector('#tab1').style.display = 'block';
  tabs[0].classList.add('active');

  function selectTab(event){
    event.preventDefault();

    document.querySelectorAll('#tab1, #tab2, #tab3').forEach(tab =>{
      tab.style.display = 'none';
    });

    tabs.forEach(link => {
      link.classList.remove('active');
    });

    const selectedID = event.currentTarget.getAttribute('href');
    document.querySelector(selectedID).style.display = 'block';

    event.currentTarget.classList.add('active');
  }
 
  const quotes = [
    `
      <blockquote>&ldquo;Our team has been 34% more productive than we were before Scription took control of our workflow.&rdquo;
			<footer>&mdash; Fleur DeLeaf, <span>Project Manager</span></footer>
			</blockquote>
    `,
    `
    <blockquote>&ldquo;Scription streamlined our entire workflow - we collaborate faster than ever.&rdquo;
			<footer>&mdash; Bill Rowan, <span>Project Manager</span></footer>
			</blockquote>
    `,
    `
    <blockquote>&ldquo;Our clients love scription.  The tool saves me and my clients so much time!&rdquo;
    <footer>&mdash; Helen Slater, <span>Customer Relations</span></footer>
    </blockquote>
    `
  ];

  const rotator = document.getElementById("rotator");
  let index = 0;

  function RotateBlockQuote(){
    rotator.style.opacity = 0;
    rotator.style.transform = "rotateX(90deg)";

    setTimeout(()=>{
      index = (index + 1) % quotes.length;
      rotator.innerHTML = quotes[index];

      rotator.style.transform = "rotateX(0deg)";
      rotator.style.opacity = 1;
    }, 600);
  }

  setInterval(RotateBlockQuote, 6000);

})();
