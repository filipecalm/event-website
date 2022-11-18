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

form.onsubmit = async (evento) => {
  evento.preventDefault()

  const newEvent = {
    name: eventNome.value,
    poster: eventBanner.value,
    attractions: eventAtracoes.value.split(","),
    description: eventDescricao.value,
    scheduled: eventData.value.slice(0, 16),
    number_tickets: eventLotacao.value,
  }

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  }

  const response = await fetch(`${URL_API}/events`, requestOptions)
  const contentResponse = await response.json()
  console.log(contentResponse)

  if (response.status == 201) {
    alert("Evento cadastrado com sucesso!")
    window.location.href = "./admin.html"

    eventNome.value = ""
    eventBanner.value = ""
    eventAtracoes.value = ""
    eventDescricao.value = ""
    eventData.value = ""
    eventLotacao.value = ""
  }
}
