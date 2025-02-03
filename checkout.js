const getInfo = () => JSON.parse(sessionStorage.getItem("checkout")) || null

const subtotal = $("#subtotal")
const discount = $("#discount")
const total = $("#total")

const info = getInfo()

if (info !== null) {
  const netTotal = info.total - info.total / 10
  subtotal.text(`$${info.total}`)
  discount.text(`$${(info.total / 10).toFixed(2)}`)
  total.text(`$${netTotal.toFixed(2)}`)
}

$("form").on("submit", (e) => {
  e.preventDefault()
  alert("You have successfully purchased for the order. Thank You!")
  window.location.href = "index.html"
})
