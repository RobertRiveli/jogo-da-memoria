const containerCartas = document.querySelector(".cartas");

const cartas = ["circulo", "quadrado", "estrela", "coracao"];
const paresDeCartas = [...cartas, ...cartas];

const acertosElemento = document.getElementById("acertos");
const vidasElemento = document.getElementById("vida");
const tempoElemento = document.getElementById("tempo");

let tempo = 0;
let bloqueio = false;
let cartaUm;
let cartaDois;
let paresAcertados = 0;

let vidas = 3;

function resetarCartas() {
  cartaUm = null;
  cartaDois = null;
  bloqueio = false;
}

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

const cartasEmbaralhadas = embaralharCartas(paresDeCartas);

cartasEmbaralhadas.forEach((carta) => {
  containerCartas.appendChild(criarCarta(carta));
});

containerCartas.addEventListener("click", (e) => {
  if (bloqueio) return;
  const el = e.target;

  if (el.classList.contains("verso")) {
    const virar = el.parentElement;
    const cartaElemento = virar.parentElement;

    if (!cartaUm) {
      virar.classList.add("ativo");

      cartaUm = cartaElemento;

      console.log(cartaUm);
    } else {
      virar.classList.add("ativo");

      cartaDois = cartaElemento;
      bloqueio = true;
    }

    if (cartaUm && cartaDois) {
      // Verifica se as cartas são iguais
      const tipoCartaUm = cartaUm.dataset.atributo;
      const tipoCartaDois = cartaDois.dataset.atributo;

      const saoIguais = tipoCartaUm === tipoCartaDois;

      console.log(saoIguais);
      if (saoIguais) {
        resetarCartas();
        paresAcertados++;
        acertosElemento.textContent = paresAcertados;
      } else {
        vidas--;
        vidasElemento.textContent = vidas;

        const primeiraCarta = cartaUm.querySelector(".virar");
        const segundaCarta = cartaDois.querySelector(".virar");

        // Mantém as cartas viradas por alguns segundos
        setTimeout(() => {
          primeiraCarta.classList.remove("ativo");
          segundaCarta.classList.remove("ativo");
          resetarCartas();

          // Vira todas as cartas em caso de derrota
          if (vidas === 0) {
            const todasCartas = containerCartas.querySelectorAll(".virar");
            todasCartas.forEach((carta) => {
              carta.classList.add("ativo");
            });
          }
        }, 1500);
      }
    }
  }
});
