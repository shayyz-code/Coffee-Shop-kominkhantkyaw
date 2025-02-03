const infoInputs = document.querySelector(".info-inputs")
infoInputs.querySelector("button").addEventListener("click", () => {
  let valid_level = 0
  infoInputs.querySelectorAll("input").forEach((input) => {
    if (input.value != "") {
      valid_level++
    }
  })
  if (valid_level == 3) {
    infoInputs.querySelectorAll("input").forEach((input) => {
      input.value = ""
    })
    alert(`We'll contact you back very soon. Stay tuned.`)
  } else {
    alert(`Please, fill all the credentials.`)
  }
})
