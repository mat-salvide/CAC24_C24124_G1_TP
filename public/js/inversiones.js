
const parser = new DOMParser()

let nuevoPlazoFijo = {}

let cuenta = "123 456789/0"

let tasa = "30%"

const confirmarPFdialog = '<h6> Nuevo plazo fijo confirmación</h6><section><p>Caja de ahorro: CA $</p><p>Tipo de plazo fijo: </p><p>Clase de renovación: </p><p>Monto $: </p><p>Plazo en días: </p><p>TNA: </p><div class="text-center"><p>¿Confirma constitución de plazo fijo?</p><button id="nuevoPF-confirmar">CONFIRMAR</button><button id="nuevoPF-cancelar">CANCELAR</button></div></section>'

document.getElementById("montoPF").addEventListener('change', e => {
    e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(2)
})

document.getElementById("nuevoPF-form").addEventListener("submit", (e) => {
  e.preventDefault()
  let dataPF = new FormData(e.target)
  nuevoPlazoFijo.tipo = dataPF.get("tipoPF")
  nuevoPlazoFijo.renovacion = dataPF.get("renovacionPF")
  if(nuevoPlazoFijo.renovacion == "sin") {nuevoPlazoFijo.renovacion = "Sin renovación (acred. al vto.)"}
  if(nuevoPlazoFijo.renovacion == "parcial") {nuevoPlazoFijo.renovacion = "Parcial (sólo capital)"}
  if(nuevoPlazoFijo.renovacion == "total") {nuevoPlazoFijo.renovacion = "Total (capital + intereses)"}
  nuevoPlazoFijo.monto = parseFloat(dataPF.get("montoPF"))
  nuevoPlazoFijo.plazo = parseInt(dataPF.get("diasPF"))
    
  nuevoPlazoFijo.tasa = tasa

  let pfDialog = confirmarPFdialog

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('CA $') + 4) + cuenta + pfDialog.slice(pfDialog.indexOf('CA $') + 4)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Tipo de plazo fijo:') + 20) + nuevoPlazoFijo.tipo + pfDialog.slice(pfDialog.indexOf('Tipo de plazo fijo:') + 20)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Clase de renovación:') + 21) + nuevoPlazoFijo.renovacion + pfDialog.slice(pfDialog.indexOf('Clase de renovación:') + 21)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Monto $:') + 9) + nuevoPlazoFijo.monto.toFixed(2) + pfDialog.slice(pfDialog.indexOf('Monto $:') + 9)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('Plazo en días:') + 15) + nuevoPlazoFijo.plazo + pfDialog.slice(pfDialog.indexOf('Plazo en días:') + 15)

  pfDialog = pfDialog.slice(0,pfDialog.indexOf('TNA:') + 5) + nuevoPlazoFijo.tasa + pfDialog.slice(pfDialog.indexOf('TNA:') + 5)

  const dialog = document.createElement("dialog")

  dialog.setAttribute("id", "popupPF")

  dialog.setAttribute("open", "true")

  dialog.innerHTML = pfDialog

  document.body.appendChild(dialog)

  document.getElementById("nuevoPF-confirmar").addEventListener('click', () => {

    document.getElementById("nuevoPF-form").reset()      
      
    document.body.removeChild(dialog)
    
  })

  document.getElementById("nuevoPF-cancelar").addEventListener('click', () => {

    document.getElementById("nuevoPF-form").reset()      
      
    document.body.removeChild(dialog)
    
  })

})

