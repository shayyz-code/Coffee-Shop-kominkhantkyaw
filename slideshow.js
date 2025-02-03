document.querySelectorAll(".slideshow img").forEach((img) => {
  let reducer = 0
  setInterval(() => {
    reducer -= 300
    img.style.transform = `translateX(${reducer}px)`
    if (reducer === -600) {
      reducer = 300
    }
  }, 3000)
})
