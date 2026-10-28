// Guarda apenas as probabilidades e a classe corrigida, sem salvar a imagem.
window.memoriaCorrecoes = (() => {
  // O sessionStorage mantém esses dados enquanto esta aba estiver aberta.
  const chaveArmazenamento = 'ecoscan-correcoes-da-sessao';

  // Limita a memória para que várias correções não ocupem espaço desnecessário.
  const quantidadeMaximaCorrecoes = 50;

  // Só aplica uma correção quando as probabilidades forem parecidas o bastante.
  const distanciaMaxima = 0.2;

  // Mantém as correções disponíveis mesmo se o navegador bloquear o sessionStorage.
  let correcoes = carregarCorrecoes();

  // Lê as correções da aba e descarta dados que não tenham o formato esperado.
  function carregarCorrecoes() {
    try {
      const dadosSalvos = sessionStorage.getItem(chaveArmazenamento);
      const correcoesSalvas = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      if (!Array.isArray(correcoesSalvas)) {
        return [];
      }

      return correcoesSalvas.filter((correcao) => (
        correcao &&
        typeof correcao.classeCorreta === 'string' &&
        correcao.probabilidades &&
        typeof correcao.probabilidades === 'object'
      )).slice(-quantidadeMaximaCorrecoes);
    } catch (erro) {
      // Um armazenamento indisponível não impede a memória temporária em JavaScript.
      console.warn('Não foi possível ler as correções da sessão:', erro);
      return [];
    }
  }

  // Atualiza o sessionStorage depois que uma correção é adicionada ou removida.
  function salvarCorrecoes() {
    try {
      sessionStorage.setItem(chaveArmazenamento, JSON.stringify(correcoes));
      return true;
    } catch (erro) {
      // As correções continuam ativas até a página ser atualizada ou fechada.
      console.warn('Não foi possível salvar as correções da sessão:', erro);
      return false;
    }
  }

  // Converte a lista do Teachable Machine em um mapa fácil de comparar.
  function criarVetorProbabilidades(previsoes) {
    return Object.fromEntries(
      previsoes.map((previsao) => [previsao.className, previsao.probability])
    );
  }

  // Mede a diferença entre duas previsões usando as probabilidades de cada classe.
  function calcularDistancia(probabilidadesAtuais, probabilidadesSalvas) {
    const classesAtuais = Object.keys(probabilidadesAtuais);
    const classesSalvas = Object.keys(probabilidadesSalvas);

    // Ignora dados antigos caso a lista de categorias do modelo tenha mudado.
    if (
      classesAtuais.length !== classesSalvas.length ||
      classesAtuais.some((classe) => !(classe in probabilidadesSalvas))
    ) {
      return Infinity;
    }

    const somaDiferencas = classesAtuais.reduce((soma, classe) => {
      const diferenca = probabilidadesAtuais[classe] - probabilidadesSalvas[classe];
      return soma + diferenca ** 2;
    }, 0);

    return Math.sqrt(somaDiferencas);
  }

  // Guarda a classe certa junto das probabilidades produzidas pelo modelo atual.
  function adicionarCorrecao(previsoes, classeCorreta) {
    const probabilidades = criarVetorProbabilidades(previsoes);

    // Se esta mesma previsão já foi corrigida, a correção mais recente prevalece.
    correcoes = correcoes.filter((correcao) => (
      calcularDistancia(probabilidades, correcao.probabilidades) > 0.001
    ));

    correcoes.push({ probabilidades, classeCorreta });

    // Mantém somente as correções mais recentes para limitar o espaço usado.
    correcoes = correcoes.slice(-quantidadeMaximaCorrecoes);

    return {
      quantidade: correcoes.length,
      persistida: salvarCorrecoes()
    };
  }

  // Procura a correção salva cuja saída do modelo mais se parece com a atual.
  function encontrarCorrecao(previsoes) {
    if (correcoes.length === 0) {
      return null;
    }

    const probabilidadesAtuais = criarVetorProbabilidades(previsoes);
    const correcaoMaisProxima = correcoes
      .map((correcao) => ({
        ...correcao,
        distancia: calcularDistancia(probabilidadesAtuais, correcao.probabilidades)
      }))
      .reduce((maisProxima, atual) => (
        atual.distancia < maisProxima.distancia ? atual : maisProxima
      ));

    // Uma previsão diferente demais não deve herdar uma correção antiga.
    return (
      correcaoMaisProxima.distancia <= distanciaMaxima &&
      correcaoMaisProxima.classeCorreta in probabilidadesAtuais
    )
      ? correcaoMaisProxima
      : null;
  }

  // Apaga as correções e limpa a memória desta aba.
  function limparCorrecoes() {
    correcoes = [];

    try {
      sessionStorage.removeItem(chaveArmazenamento);
    } catch (erro) {
      // A lista em memória já foi limpa, mesmo se o armazenamento falhar.
      console.warn('Não foi possível limpar o sessionStorage:', erro);
    }
  }

  // Expõe somente as ações que a página precisa usar.
  return Object.freeze({
    adicionar: adicionarCorrecao,
    encontrar: encontrarCorrecao,
    limpar: limparCorrecoes,
    contar: () => correcoes.length
  });
})();
