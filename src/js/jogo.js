import { adicionarTexto, zeroEsquerda } from "./utils.js";
import { criarCarta, embaralharCartas } from "./cartas.js";

let tempoSegundos = 0;
let tempoMinutos = 0;

let bloqueio = false;
let cartaUm;
let cartaDois;
let paresAcertados = 0;
let vitoria = false;
let vidas = 3;

function resetarCartas() {
  cartaUm = null;
  cartaDois = null;
  bloqueio = false;
}

function iniciarJogor() {
  const containerCartas = document.querySelector(".cartas");

  const cartas = ["circulo", "quadrado", "estrela", "coracao"];
  const paresDeCartas = [...cartas, ...cartas];
  const cartasAcertadas = [];

  const acertosElemento = document.getElementById("acertos");
  const vidasElemento = document.getElementById("vida");
  const tempoElemento = document.getElementById("tempo");

  const temporizador = setInterval(() => {
    tempoSegundos++;

    if (tempoSegundos === 60) {
      tempoMinutos++;

      tempoSegundos = 0;
    }

    const tempo = `${zeroEsquerda(tempoMinutos)}:${zeroEsquerda(
      tempoSegundos
    )}`;

    adicionarTexto(tempoElemento, tempo);

    if (vitoria) {
      clearInterval(temporizador);
    }
  }, 1000);

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
          cartasAcertadas.push(cartaUm);
          cartasAcertadas.push(cartaDois);

          resetarCartas();
          paresAcertados++;
          adicionarTexto(acertosElemento, paresAcertados);

          if (cartasAcertadas.length === cartasEmbaralhadas.length)
            vitoria = true;
        } else {
          vidas--;
          adicionarTexto(vidasElemento, vidas);

          const primeiraCarta = cartaUm.querySelector(".virar");
          const segundaCarta = cartaDois.querySelector(".virar");

          // Mantém as cartas viradas por alguns segundos
          setTimeout(() => {
            primeiraCarta.classList.remove("ativo");
            segundaCarta.classList.remove("ativo");
            resetarCartas();

            // Vira todas as cartas em caso de derrota
            if (vidas === 0) {
              clearInterval(temporizador);

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
}

export default iniciarJogor;
