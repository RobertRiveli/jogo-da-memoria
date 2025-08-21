function adicionarTexto(textoElementoHtml, mensagem) {
  return (textoElementoHtml.textContent = mensagem);
}

function zeroEsquerda(numero) {
  if (numero < 10) {
    return "0" + numero;
  }

  return numero;
}

function exibirModal(modal, tempo) {
  setTimeout(() => {
    modal.showModal();
  }, tempo);
}

export { adicionarTexto, zeroEsquerda, exibirModal };
