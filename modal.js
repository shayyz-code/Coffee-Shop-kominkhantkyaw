const getUsers = () => JSON.parse(localStorage.getItem("users")) || []
const getActiveUser = () =>
  JSON.parse(sessionStorage.getItem("active-user")) || null

const userModal = document.createElement("form")
userModal.classList.add("modal", "user-modal")

if (
  getActiveUser() === null &&
  (lastPath === "index.html" || lastPath === "")
) {
  openUser("welcome")
}

function closeModal() {
  document.body.removeChild(userModal)
}

function openUser(action) {
  if (getActiveUser() === null) {
    switch (action) {
      case "login":
        userModal.innerHTML = `
                <i class="fa-solid fa-xmark pointer" onclick="closeModal()"></i>
                <h2>Log In</h2>
                <input id="input-email" type="email" placeholder="Email" required />
                <input id="input-password" type="password" placeholder="Password" required />
                <button class="btn" type="submit">Log In</button>
                <p>Do not have an account? <a onclick="openUser('signup')">Sign Up</a></p>
                `
        break
      case "signup":
        userModal.innerHTML = `
                    <i class="fa-solid fa-xmark pointer" onclick="closeModal()"></i>
                    <h2>Sign Up</h2>
                    <input id="input-email" type="email" placeholder="Email" required />
                    <input id="input-password" type="password" placeholder="Password" required />
                    <button class="btn" type="submit">Sign Up</button>
                    <p>Already have an account? <a onclick="openUser('login')">Log In</a></p>
                    `
        break
      case "welcome":
        userModal.innerHTML = `
                        <i class="fa-solid fa-xmark pointer" onclick="closeModal()"></i>
                        <h2>Get Discount!</h2>
                        <p>Since you're a first-time user, we're offering you a discount.</p>
                        <p>Go to <a onclick="openUser('signup')">Sign Up</a> page</p>
                        `
        break
      default:
        return
    }
  } else if (getActiveUser() !== null) {
    switch (action) {
      case "login":
      case "signup":
      case "signout":
        userModal.innerHTML = `
                    <i class="fa-solid fa-xmark pointer" onclick="closeModal()"></i>
                    <h2>Sign Out</h2>
                    <p>Are you sure you want to sign out?</p>
                    <button class="btn" type="submit" onclick="signoutUser()">Sign Out</button>
                    `
        break

      default:
        return
    }
  }
  userModal.onsubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById("input-email").value
    const password = document.getElementById("input-password").value
    if (email !== "" && password !== "") {
      switch (action) {
        case "login":
          loginUser(email, password)
          break
        case "signup":
          signupUser(email, password)
          break
        case "signout":
          signoutUser()
          break
        default:
          return
      }
    } else {
      return
    }
  }
  document.body.appendChild(userModal)
}

function loginUser(email, password) {
  const users = getUsers()
  if (
    users.find((user) => user.email === email && user.password === password)
  ) {
    sessionStorage.setItem("active-user", JSON.stringify({ email, password }))
    alert(`You have successfully logged in as ${email}.`)
    closeModal()
  } else {
    alert(`Failed to log in as email or password is incorrect.`)
  }
}

function signupUser(email, password) {
  const users = getUsers()
  if (users.find((user) => user.email === email)) {
    alert("There's already an account with the provided email.")
  } else {
    localStorage.setItem(
      "users",
      JSON.stringify([...getUsers(), { email, password }])
    )
    loginUser(email, password)
  }
}

function signoutUser() {
  sessionStorage.removeItem("active-user")
  alert("You have successfully signed out.")
  closeModal()
}
