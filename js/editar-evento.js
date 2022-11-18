const URL_API = "https://xp41-soundgarden-api.herokuapp.com"

const eventDescricao = document.querySelector("#descricao")
const eventAtracoes = document.querySelector("#atracoes")
const eventLotacao = document.querySelector("#lotacao")
const eventBanner = document.querySelector("#banner");
const eventNome = document.querySelector("#nome")
const eventData = document.querySelector("#data")
const form = document.querySelector("form")

eventDescricao.setAttribute("required","required") 
eventAtracoes.setAttribute("required","required") 
eventLotacao.setAttribute("required","required") 
eventBanner.setAttribute("required","required") 
eventNome.setAttribute("required","required") 
eventData.setAttribute("required","required")


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

  const atualizarEvento = {
    name: eventNome.value,
    poster: eventBanner.value,
    attractions: eventAtracoes.value.split(","),
    description: eventDescricao.value,
    scheduled: eventData.value,
    number_tickets: eventLotacao.value,
  }

  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(atualizarEvento),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  }

  const response = await fetch(`${URL_API}/events/${id}`, requestOptions)
  if (response.status == 200) {
    alert("Evento editado com sucesso!")
    window.location.href = "./admin.html"
    
    eventNome.value = ""
    eventBanner.value = ""
    eventAtracoes.value = ""
    eventDescricao.value = ""
    eventData.value = ""
    eventLotacao.value = ""
  }
}

