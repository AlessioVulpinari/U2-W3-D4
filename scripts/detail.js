const params = new URLSearchParams(window.location.search)
const URL_PHOTO = "https://api.pexels.com/v1/photos/"
const id = params.get("id")
const url_id = URL_PHOTO + id

window.addEventListener("DOMContentLoaded", () => {
  fetch(url_id, {
    headers: {
      Authorization: "cdMVQ0LZLKYx2BotqicCd7ymdsfQXPXiuM2VRRzcL6IE2LaWbipEXWjZ",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error("Errore nella fetch")
      }
    })
    .then((photoObj) => {
      console.log(photoObj)

      const container = document.getElementById("photo-details")

      container.innerHTML = `
            <img src = ${photoObj.src.original} alt = "${photoObj.alt}" class = "img w-100" />
            <h1 class="display-5">${photoObj.photographer}</h1>
            <a class="font-monospace" href = ${photoObj.photographer_url}>${photoObj.photographer_url}</a>
            `
    })
    .catch((err) => console.log(err))
})
