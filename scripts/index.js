const URL_PIX = "https://api.pexels.com/v1/search?query="

const fetchDogs = () => {
  fetchText("dog")
}

const fetchCats = () => {
  fetchText("cat")
}

const createCards = (array, url) => {
  array.forEach((photo) => {
    const card = {
      url: photo.src.original,
      photographer: photo.photographer,
      id: photo.id,
      description: photo.alt,
    }

    const row = document.getElementById("row")

    const col = document.createElement("col")
    col.classList.add("col-md-4")

    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card", "mb-4", "shadow-sm")

    const anchorImg = document.createElement("a")
    anchorImg.href = "./detail.html?id=" + photo.id

    const img = document.createElement("img")
    img.src = card.url
    img.classList.add("bd-placeholder-img", "card-img-top")

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const anchorH5 = document.createElement("a")
    anchorH5.href = "./detail.html?id=" + photo.id

    const h5 = document.createElement("h5")
    h5.classList.add("card-title")
    h5.innerText = card.photographer

    const description = document.createElement("p")
    description.classList.add("card-text")
    description.innerText = card.description

    const btnContainer = document.createElement("div")
    btnContainer.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    )

    const btnInnerContainer = document.createElement("div")
    btnInnerContainer.classList.add("btn-group")

    const viewBtn = document.createElement("button")
    viewBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    viewBtn.type = "button"
    viewBtn.innerText = "View"

    const hideBtn = document.createElement("button")
    hideBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    hideBtn.type = "button"
    hideBtn.innerText = "hide"
    hideBtn.addEventListener("click", handleHideBtn)

    const innerDiv = document.createElement("div")

    const small = document.createElement("small")
    small.classList.add("text-muted")
    small.innerText = card.id

    anchorImg.appendChild(img)
    cardContainer.appendChild(anchorImg)
    anchorH5.appendChild(h5)
    cardBody.appendChild(anchorH5)
    cardBody.appendChild(description)
    btnInnerContainer.appendChild(viewBtn)
    btnInnerContainer.appendChild(hideBtn)
    btnContainer.appendChild(btnInnerContainer)
    innerDiv.appendChild(small)
    btnContainer.appendChild(innerDiv)
    cardBody.appendChild(btnContainer)
    cardContainer.appendChild(cardBody)
    col.appendChild(cardContainer)
    row.appendChild(col)
  })
}

const handleHideBtn = function (event) {
  event.target.closest(".col-md-4").remove()
}

const destroyCols = () => {
  const cards = document.querySelectorAll(".col-md-4")

  cards.forEach((col) => {
    col.remove()
  })
}

const fetchText = (text) => {
  newUrl = URL_PIX + text + "&per_page=9"
  console.log(newUrl)
  fetch(newUrl, {
    headers: {
      Authorization: "cdMVQ0LZLKYx2BotqicCd7ymdsfQXPXiuM2VRRzcL6IE2LaWbipEXWjZ",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request")
        }
        if (response.status === 401) {
          throw new Error("Unauthorized")
        }
        if (response.status === 403) {
          throw new Error("Forbidden")
        }
        if (response.status === 404) {
          throw new Error("Not Found")
        }
        if (response.status === 500) {
          throw new Error("Server Error")
        }

        throw new Error("Generic Fetch Error")
      }
    })
    .then((data) => {
      const photo = data.photos

      destroyCols()
      createCards(photo, newUrl)
    })
}

const handleSubmitForm = (e) => {
  e.preventDefault()
  const inputBox = document.getElementById("inputText")
  const text = inputBox.value
  inputBox.value = ""

  fetchText(text)
}

window.onload = () => {
  const font = document.querySelector("form")
  font.addEventListener("submit", handleSubmitForm)
  const btnPrimary = document.getElementById("cat")
  const btnSecondary = document.getElementById("dog")

  btnPrimary.addEventListener("click", fetchCats)
  btnSecondary.addEventListener("click", fetchDogs)
}
