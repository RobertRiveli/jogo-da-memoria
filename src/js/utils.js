function adicionarTexto(textoElementoHtml, mensagem) {
  return (textoElementoHtml.textContent = mensagem);
}

function zeroEsquerda(numero) {
  if (numero < 10) {
    return "0" + numero;
  }

  return numero;
}

export { adicionarTexto, zeroEsquerda };
