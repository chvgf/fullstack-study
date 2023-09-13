const hEl = document.querySelector('header');

window.addEventListener('scroll', function () {

console.log(window.scrollY);

if (window.scrollY > 100) {


    gsap.to(hEl, 0.6, {
    opacity: 0,
    display: 'none'
    });
} else {


    gsap.to(hEl, 0.6, {
    opacity: 1,
    display: 'block'
    });
}
});