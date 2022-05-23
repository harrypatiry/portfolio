window.onload = function() {
    const mobile = document.querySelector('.mobile-menu');
    const head = document.querySelector('#head');
    const nav = document.querySelector('.nav-links');
    mobile.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        head.classList.toggle('head-active');
    })
}

const buttons = document.querySelectorAll("[data-scroll-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.scrollButton === "next" ? 1 : -1
    const items = button
      .closest("[data-scroll]")
      .querySelector("[data]")

    const activeItem = items.querySelector("[data-active]")
    let newIndex = [...items.children].indexOf(activeItem) + offset
    if (newIndex < 0) newIndex = items.children.length - 1
    if (newIndex >= items.children.length) newIndex = 0

    items.children[newIndex].dataset.active = true
    delete activeItem.dataset.active
  })
})