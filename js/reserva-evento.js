const URL_API = "https://xp41-soundgarden-api.herokuapp.com"

const headingModal = document.querySelector("#heading-modal")
const btn_submit = document.querySelector("#btn-submit")
const btn_close = document.querySelector("#btn-close")
const heading = document.querySelector("#reservas")
const tickets = document.querySelector("#tickets")
const eventId = document.querySelector("#eventId")
const evento = document.querySelector("#eventos")
const ticket = document.querySelector("#ticket")
const btn = document.querySelector("#btn-book")
const email = document.querySelector("#email")
const modal = document.querySelector("#modal")
const table = document.querySelector("tbody")
const form = document.querySelector("#form")
const nome = document.querySelector("#name")


const id = new URLSearchParams(window.location.search).get("id")

async function listaReservas() {
  const response = await fetch(`${URL_API}/bookings/event/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  })

  const contentResponse = await response.json()
  heading.innerHTML = contentResponse[0].event.name

  
  contentResponse.forEach((item) => {
    table.innerHTML += `<tr>
    <th scope="row">${contentResponse.indexOf(item) + 1}</th>
    <td>${item.owner_name}</td>
    <td>${item.owner_email}</td>
    <td class="td-01">${item.number_tickets}</td>
    <td class="td-btn">
    <button class="btn btn-danger" 
    onclick="deletaReserva('${item._id}')">excluir
    </button>
    </td>
    </tr>`

  })
}

listaReservas()

async function deletaReserva(id) {
  const response = await fetch(`${URL_API}/bookings/${id}`, {
    method: "DELETE",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  })
  if (response.status == 204) {
    alert("Reserva excluída com sucesso!")
  }
  window.location.reload()
}

// MODAL

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

async function openModal(_id) {
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

function closeModal() {
  modal.setAttribute("style", "display:none")
  nome.value = ""
  email.value = ""
  ticket.value = ""
  eventId.value = ""
}

btn_close.onclick = () => {
  closeModal()
}

form.onsubmit = async (evento) => {
  evento.preventDefault()
  console.log(evento)

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
  window.location.reload()
}