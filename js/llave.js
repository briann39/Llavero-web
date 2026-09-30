// La llave del inicio: un diente se talla por cada carácter que escribes.
// Los cortes son aleatorios, no salen de lo escrito: solo reflejan cuántos caracteres llevas.
;(() => {
  const DIENTES = 9
  const MAX_CORTE = 4
  const PASO = 5 // píxeles de profundidad por nivel de corte
  const BORDE_INFERIOR = 92

  const placa = document.getElementById('placa')
  const campo = document.getElementById('prueba')
  const boton = document.getElementById('girar')
  const dientes = [...document.querySelectorAll('#hoja .diente')]
  if (!placa || !campo || !boton || dientes.length !== DIENTES) return

  let cortes = []

  function ajustar(largo) {
    if (largo <= cortes.length) return cortes.slice(0, largo)
    const nuevos = new Uint8Array(largo - cortes.length)
    crypto.getRandomValues(nuevos)
    return [...cortes, ...Array.from(nuevos, (n) => 1 + (n % MAX_CORTE))]
  }

  function pintar() {
    // Con más caracteres que dientes, la llave muestra los últimos
    const visibles = cortes.slice(-DIENTES)
    const vacios = DIENTES - visibles.length
    dientes.forEach((d, i) => {
      const alto = (i < vacios ? 0 : visibles[i - vacios]) * PASO
      d.setAttribute('y', BORDE_INFERIOR - alto)
      d.setAttribute('height', alto)
    })
  }

  campo.addEventListener('input', () => {
    cortes = ajustar([...campo.value].length)
    pintar()
  })

  let temporizador
  boton.addEventListener('click', () => {
    clearTimeout(temporizador)
    placa.classList.add('girando')
    temporizador = setTimeout(() => placa.classList.remove('girando'), 1400)
  })
})()
