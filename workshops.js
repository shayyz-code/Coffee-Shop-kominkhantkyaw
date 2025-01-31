const workshops = [
  {
    id: 1,
    img: "images/blog-1.jpg",
    name: "Coffee Origins & Roasting Basics",
    byDate: "By Admin / 28.5.2022",
    description:
      "Understanding where coffee comes from (origin) and how it is roasted helps you appreciate the wide spectrum of flavors available. From bright, citrusy Ethiopian beans roasted light to bring out floral notes, to bold, dark-roasted Sumatran coffees with chocolate and spice undertones the possibilities are endless",
  },
  {
    id: 2,
    img: "images/blog-2.jpg",
    name: "Hands-On Brewing Techniques",
    byDate: "By Admin / 8.8.2022",
    description:
      "By exploring various brewing techniques and learning how to control essential brewing variables, coffee enthusiasts can elevate their home brewing game. Attendees leave with practical skills and a deeper understanding of how to unlock a coffee is full potential, no matter which method they choose.",
  },
  {
    id: 3,
    img: "images/blog-3.jpg",
    name: "Advanced Espresso & Latte Art",
    byDate: "By Admin / 22.10.2022",
    description:
      "Mastering advanced espresso extraction and latte art elevates the coffee experience, showcasing both craftsmanship and creativity. Through proper technique, attention to detail, and a dash of artistry, baristas (and dedicated home enthusiasts) can consistently serve delicious, visually appealing espresso-based drinks.",
  },
]

const workshopsDiv = document.getElementById("workshops")
workshopsDiv.innerHTML = workshops
  .map(
    (workshop) => `
    <div class="card">
        <img src="${workshop.img}" alt="blog-1" class="blog-img" />
        <div class="blog-content" id="blog-content-${workshop.id}">
            <h1 class="content-head">${workshop.name}</h1>
            <p class="content-date">${workshop.byDate}</p>
            <p class="content-description">${workshop.description}</p>
            <button class="btn blog-btn" onclick="registerNow(${workshop.id})">Register Now</button>
        </div>
    </div>`
  )
  .join("")

const getWorkshops = () => JSON.parse(localStorage.getItem("workshops")) || []

function registerNow(id) {
  const prevWorkshops = getWorkshops()
  const workshop = workshops.find((workshop) => workshop.id === id)

  if (
    prevWorkshops.length > 0 &&
    prevWorkshops.find((prevW) => prevW.id === workshop.id) !== null
  ) {
    alert("You have already registered for this event.")
  } else {
    openModal(workshop)
  }
}

const modal = document.createElement("form")
modal.classList.add("modal")

function closeModal() {
  document.body.removeChild(modal)
}

function openModal(workshop) {
  modal.innerHTML = `
        <i class="fa-solid fa-xmark" onclick="closeModal()"></i>
        <h2>Register</h2>
        <p>${workshop.name}</p>
        <input id="input-firstname" type="text" placeholder="First Name" required />
        <input id="input-lastname" type="text" placeholder="Last Name" required />
        <input id="input-email" type="email" placeholder="Email" required />
        <button type="submit">Register</button>
    `
  document.body.appendChild(modal)

  modal.onsubmit = (e) => {
    e.preventDefault()
    const firstName = document.getElementById("input-firstname").value
    const lastName = document.getElementById("input-lastname").value
    const email = document.getElementById("input-email").value
    if (firstName !== "" && lastName !== "" && email !== "") {
      registerWorkshop(workshop, { firstName, lastName, email })
    } else {
      return
    }
  }
}

function registerWorkshop(workshop, user) {
  workshop.user = user
  localStorage.setItem(
    "workshops",
    JSON.stringify([...getWorkshops(), workshop])
  )
  alert("You have successfully registered for this workshop.")
  closeModal()
}
