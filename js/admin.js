const URL_API = "https://xp41-soundgarden-api.herokuapp.com"

async function listEvents() {
  const table = document.querySelector("tbody")
  const response = await fetch(`${URL_API}/events`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  })
  console.log(response)

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

  const contentResponse = await response.json()
  contentResponse.forEach((item) => {
    table.innerHTML += `<tr>
    <th scope="row">${contentResponse.indexOf(item) + 1}</th>
    <td>${dataCorreta(item.scheduled)}</td>
    
    <td>${item.name}</td>
    <td>${item.attractions}</td>
    <td>
        <a href="reserva-evento.html?id=${
          item._id
        }" class="btn btn-dark">ver reservas</a>
        <a href="editar-evento.html?id=${
          item._id
        }" class="btn btn-secondary">editar</a>
        <a href="excluir-evento.html?id=${
          item._id
        }" class="btn btn-danger">excluir</a>
    </td>
</tr>`
  })
}

listEvents()
