const URL_API = "https://xp41-soundgarden-api.herokuapp.com"

const eventDescricao = document.querySelector("#descricao")
const eventAtracoes = document.querySelector("#atracoes")
const eventLotacao = document.querySelector("#lotacao")
const eventBanner = document.querySelector("#banner")
const eventNome = document.querySelector("#nome")
const eventData = document.querySelector("#data")
const form = document.querySelector("form")

const id = new URLSearchParams(window.location.search).get("id")

async function listarEvento() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  }
  
  const response = await fetch(`${URL_API}/events/${id}`, requestOptions)

  const contentResponse = await response.json()
  eventNome.value = contentResponse.name
  eventBanner.value = contentResponse.poster
  eventAtracoes.value = contentResponse.attractions
  eventDescricao.value = contentResponse.description
  eventData.value = contentResponse.scheduled.slice(0, 16)
  eventLotacao.value = contentResponse.number_tickets
}

listarEvento()

form.onsubmit = async (evento) => {
  evento.preventDefault()

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  }

  const response = await fetch(`${URL_API}/events/${id}`, requestOptions)
  if (response.status == 204) {

    alert("Evento excluído com sucesso!")
    window.location.href = "./admin.html"
  }
}
