const fetchDogs = () => {
  fetch("https://api.pexels.com/v1/search?query=dog&per_page=9", {
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
    .then((dogsData) => {
      const dogsPhoto = dogsData.photos

      destroyCols()
      createCards(dogsPhoto)
    })
}

const fetchCats = () => {
  fetch("https://api.pexels.com/v1/search?query=cat&per_page=9", {
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
    .then((catsData) => {
      catsPhoto = catsData.photos

      destroyCols()
      createCards(catsPhoto)
    })
}

const createCards = (array) => {
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

    const img = document.createElement("img")
    img.src = card.url
    img.classList.add("bd-placeholder-img", "card-img-top")

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

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

    const editBtn = document.createElement("button")
    editBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    editBtn.type = "button"
    editBtn.innerText = "Edit"

    const innerDiv = document.createElement("div")

    const small = document.createElement("small")
    small.classList.add("text-muted")
    small.innerText = card.id

    cardContainer.appendChild(img)

    cardBody.appendChild(h5)
    cardBody.appendChild(description)
    btnInnerContainer.appendChild(viewBtn)
    btnInnerContainer.appendChild(editBtn)
    btnContainer.appendChild(btnInnerContainer)
    innerDiv.appendChild(small)
    btnContainer.appendChild(innerDiv)
    cardBody.appendChild(btnContainer)
    cardContainer.appendChild(cardBody)
    col.appendChild(cardContainer)
    row.appendChild(col)
  })
}

const destroyCols = () => {
  const cards = document.querySelectorAll(".col-md-4")

  cards.forEach((col) => {
    col.remove()
  })
}

window.onload = () => {
  const btnPrimary = document.getElementById("cat")
  const btnSecondary = document.getElementById("dog")

  btnPrimary.addEventListener("click", fetchCats)
  btnSecondary.addEventListener("click", fetchDogs)
}
