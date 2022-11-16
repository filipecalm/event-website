document.getElementById("radio1").checked = true

let count = 1
setInterval(function () {
  nextImage()
}, 3000)

function nextImage() {
  count++
  if (count > 5) {
    count = 1
  }
  document.getElementById("radio" + count).checked = true
}
