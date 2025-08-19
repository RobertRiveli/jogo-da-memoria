function criarCarta(tipoCarta) {
  const carta = document.createElement("div");
  const acaoVirar = document.createElement("div");
  const frente = document.createElement("div");
  const verso = document.createElement("div");
  const iconeCarta = document.createElement("div");

  carta.classList.add("carta");
  acaoVirar.classList.add("virar");
  frente.classList.add("frente");
  verso.classList.add("verso");

  acaoVirar.appendChild(verso);
  acaoVirar.appendChild(frente);

  iconeCarta.classList.add(tipoCarta);
  frente.appendChild(iconeCarta);
  carta.appendChild(acaoVirar);
  carta.dataset.atributo = tipoCarta;

  return carta;
}

function embaralharCartas(array) {
  let index = array.length,
    indexAleatorio;

  while (index !== 0) {
    indexAleatorio = Math.floor(Math.random() * index);
    index--;

    [array[index], array[indexAleatorio]] = [
      array[indexAleatorio],
      array[index],
    ];
  }

  return array;
}

export { criarCarta, embaralharCartas };
