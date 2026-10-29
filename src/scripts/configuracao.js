// Reúne as regras da primeira versão do classificador em um único lugar.
const configuracaoEcoScan = Object.freeze({
  // O sistema começa com um objeto principal por análise.
  quantidadeObjetosPorAnalise: 1,

  // Estas são as cinco categorias que o futuro modelo deverá reconhecer.
  categoriasMateriais: Object.freeze([
    "plástico",
    "metal",
    "vidro",
    "papel",
    "papelão",
  ]),

  // Abaixo deste valor, a aplicação deverá informar que o resultado é incerto.
  confiancaMinima: 0.7,

  // O modelo receberá imagens quadradas com 224 pixels de largura e altura.
  tamanhoImagemModelo: Object.freeze({
    largura: 224,
    altura: 224,
  }),
});
