function search(kind) {
  const value = document.getElementById("input-search").value.toLowerCase()

  document.querySelectorAll(".card").forEach((card) => {
    if (kind == "clear") {
      card.style.display = "block"
    } else {
      if (card.querySelector("h4").textContent.toLowerCase().includes(value)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    }
  })
}

function validInput() {
  if (document.getElementById("input-search").value === "") {
    search("clear")
  }
}
