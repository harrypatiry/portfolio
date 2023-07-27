window.onload = function() {
    const mobile = document.querySelector('.mobile-menu');
    const head = document.querySelector('#head');
    const nav = document.querySelector('.nav-links');
    mobile.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        head.classList.toggle('head-active');
    })
}
