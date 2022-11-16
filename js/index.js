const URL_API = "https://xp41-soundgarden-api.herokuapp.com"
const evento = document.querySelector("#eventos")
const modal = document.querySelector("#modal")
const btn_exit = document.querySelector("#btn-exit")
const btn_close = document.querySelector("#btn-close")
const headingModal = document.querySelector("#heading-modal")
const tickets = document.querySelector("#tickets")
const form = document.querySelector("#form")
const email = document.querySelector("#email")
const ticket = document.querySelector("#ticket")
const nome = document.querySelector("#name")
const eventId = document.querySelector("#eventId")

const dataCorreta = (date) => {
  let data = date.split("")
  let dataCorreta =
    data.slice(8, 10).join("") +
    "/" +
    data.slice(5, 7).join("") +
    "/" +
    data.slice(0, 4).join("")
  return dataCorreta
}

async function abreModal(id) {
  // modal.style.display = "flex"
  modal.setAttribute("style", "display:flex")
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

function fechaModal() {
  modal.setAttribute("style", "display:none")
  nome.value = ""
  email.value = ""
  ticket.value = ""
  eventId.value = ""
}

async function listarEventos() {
  const response = await fetch(`${URL_API}/events`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  })
  console.log(response)

  const contentResponse = await response.json()
  const bandas = contentResponse.slice(0, 3)
  bandas.forEach((item) => {
    evento.innerHTML += ` <article class="evento card p-5 m-3">
    <h2>${item.name} - ${dataCorreta(item.scheduled)}</h2>
    <h4>${item.attractions}</h4>
    <p>${item.description}</p>
    <button class="btn btn-primary" onclick="abreModal('${
      item._id
    }')" >reservar ingresso</button>
    </article>`
  })
}

listarEventos()

btn_close.onclick = () => {
  fechaModal()
}
btn_exit.onclick = () => {
  fechaModal()
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

    fechaModal()
  }
}
