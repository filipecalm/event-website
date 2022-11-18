const URL_API = "https://xp41-soundgarden-api.herokuapp.com"

const headingModal = document.querySelector("#heading-modal")
const btn_submit = document.querySelector("#btn-submit")
const btn_close = document.querySelector("#btn-close")
const tickets = document.querySelector("#tickets")
const eventId = document.querySelector("#eventId")
const evento = document.querySelector("#eventos")
const ticket = document.querySelector("#ticket")
const modal = document.querySelector("#modal")
const email = document.querySelector("#email")
const form = document.querySelector("#form")
const nome = document.querySelector("#name")

ticket.setAttribute("required","required")
email.setAttribute("required","required")
nome.setAttribute("required","required")

const dataCorreta = (date) => {
  let data = date.split("")
  let data_Correta =
    data.slice(8, 10).join("") +
    "/" +
    data.slice(5, 7).join("") +
    "/" +
    data.slice(0, 4).join("")
  return data_Correta
}

async function openModal(id) {
  modal.setAttribute("style", "display:flex");
  eventId.value = id
  const response = await fetch(`${URL_API}/events/${id}`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  })

  const contentResponse = await response.json()
  headingModal.innerHTML = `Reserve seu ingresso para ${contentResponse.name}`
  tickets.innerHTML = `Tickets disponíveis: (${contentResponse.number_tickets})`
  ticket.max = contentResponse.number_tickets

}

function closeModal() {
  modal.setAttribute("style", "display:none")
  nome.value = ""
  email.value = ""
  ticket.value = ""
  eventId.value = ""
}

async function listEvents() {
  const response = await fetch(`${URL_API}/events`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  })
  console.log(response)

  const contentResponse = await response.json()
  const eventAttractions = contentResponse.slice(0, 3)
  eventAttractions.forEach((item) => {
    evento.innerHTML += `<article class="evento card p-5 m-3">
    <h2>${item.name} - ${dataCorreta(item.scheduled)}</h2>
    <h4 id="title-attractions">${item.attractions}</h4>
    <p id="description-event">${item.description}</p>
    <button id="btn-book" class="btn btn-primary" onclick="openModal('${
      item._id
    }')" >reservar ingresso</button>
    </article>`
  })
}

listEvents()

btn_close.onclick = () => {
  closeModal()
}

form.onsubmit = async (evento) => {
  evento.preventDefault()

  const reservarTicket = {
    owner_name: nome.value,
    owner_email: email.value,
    number_tickets: parseInt(ticket.value),
    event_id: eventId.value,
  }

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(reservarTicket),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  }

  const response = await fetch(`${URL_API}/bookings`, requestOptions)
  const contentResponse = await response.json()
  console.log(contentResponse)

  if (response.status == 201) {
    alert("Reserva feita com sucesso!")

    closeModal()
  }
}
