import iniciarJogor from "./jogo.js";
import { dificuldadeJogo } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const modo = dificuldadeJogo();

  iniciarJogor(modo);
});
