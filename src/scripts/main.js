// Busca um elemento do HTML pelo seu identificador.
const obterElemento = (id) => document.getElementById(id);

// Reune os elementos usados pelo JavaScript em um unico lugar.
const elementos = {
  video: obterElemento('video'),
  telaCaptura: obterElemento('canvas'),
  quadroCamera: obterElemento('cameraFrame'),
  mensagemCamera: obterElemento('cameraPlaceholder'),
  indicadorCamera: obterElemento('cameraBadge'),
  indicadorLeitura: obterElemento('scanStatus'),
  botaoCamera: obterElemento('startCamera'),
  campoImagem: obterElemento('imageInput'),
  iconeMaterial: obterElemento('materialIcon'),
  nomeMaterial: obterElemento('materialName'),
  mensagemMaterial: obterElemento('materialHint'),
  valorConfianca: obterElemento('confidenceValue'),
  barraConfianca: obterElemento('confidenceBar'),
  mensagemConfianca: obterElemento('confidenceHint'),
  descarteSugerido: obterElemento('disposalValue'),
  mensagemDescarte: obterElemento('disposalHint')
};

// Guarda o fluxo da camera enquanto ela estiver ativo.
let fluxoCamera = null;

// Guarda o endereco temporario da imagem enviada pelo usuario.
let enderecoImagemSelecionada = null;

// Guarda o modelo exportado pelo Teachable Machine depois que ele for carregado.
let modeloEcoScan = null;

// Identifica cada análise para impedir que uma resposta antiga sobrescreva a nova.
let identificadorAnaliseAtual = 0;

// Define os caminhos dos arquivos exportados para o modelo.
const caminhosModelo = Object.freeze({
  modelo: 'modelo/model.json',
  metadados: 'modelo/metadata.json'
});

// Atualiza o painel enquanto o modelo ainda nao pode mostrar um resultado.
function definirEstadoAnalise(mensagem) {
  // Remove o indicador visual quando a analise terminar ou encontrar um erro.
  elementos.quadroCamera.classList.remove('analisando');
  elementos.iconeMaterial.textContent = '?';
  elementos.nomeMaterial.textContent = 'Aguardando analise';
  elementos.mensagemMaterial.textContent = mensagem;
  elementos.valorConfianca.textContent = '--';
  elementos.barraConfianca.style.width = '0%';
  elementos.mensagemConfianca.textContent = 'A confianca aparecera depois da analise';
  elementos.descarteSugerido.textContent = '--';
  elementos.mensagemDescarte.textContent = 'O descarte sera sugerido conforme a classe identificada';
}

// Atualiza os textos e indicadores visuais da camera.
function definirEstadoCamera(estaAtiva) {
  // O video so fica visivel depois que a permissao foi concedida e o fluxo comecou.
  elementos.video.hidden = !estaAtiva;
  elementos.video.style.display = estaAtiva ? 'block' : 'none';
  elementos.mensagemCamera.hidden = estaAtiva;
  elementos.mensagemCamera.style.display = estaAtiva ? 'none' : 'flex';
  elementos.indicadorCamera.textContent = estaAtiva ? 'CAMERA ATIVA' : 'CAMERA DESATIVADA';
  elementos.indicadorCamera.style.color = estaAtiva ? '#b9f17f' : 'white';
  elementos.indicadorLeitura.textContent = estaAtiva ? 'AO VIVO' : 'AGUARDANDO';
}

// Carrega os arquivos do modelo exportado pelo Teachable Machine.
async function carregarModelo() {
  if (!window.tmImage) {
    definirEstadoAnalise('A biblioteca do modelo nao foi carregada. Verifique a conexao e tente novamente.');
    return;
  }

  try {
    elementos.indicadorLeitura.textContent = 'MODELO';
    definirEstadoAnalise('Carregando o modelo de materiais...');

    // O Teachable Machine le o model.json e o metadata.json juntos.
    modeloEcoScan = await window.tmImage.load(caminhosModelo.modelo, caminhosModelo.metadados);

    elementos.indicadorLeitura.textContent = 'PRONTO';
    definirEstadoAnalise('Modelo pronto. Ative a camera ou envie uma imagem.');
  } catch (erro) {
    console.error('Nao foi possivel carregar o modelo do EcoScan:', erro);
    elementos.indicadorLeitura.textContent = 'ERRO';
    definirEstadoAnalise('Nao foi possivel carregar o modelo. Confira os arquivos dentro de src/modelo.');
  }
}

// Solicita permissao e inicia o video da camera do dispositivo.
async function iniciarCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    definirEstadoAnalise('Seu navegador nao oferece acesso a camera. Envie uma imagem para continuar.');
    return;
  }

  try {
    // Encerra um fluxo anterior antes de solicitar uma nova camera.
    fluxoCamera?.getTracks().forEach((faixa) => faixa.stop());

    fluxoCamera = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 }
      },
      audio: false
    });

    // Essas propriedades ajudam o Opera a reproduzir a camera dentro da pagina.
    elementos.video.autoplay = true;
    elementos.video.muted = true;
    elementos.video.playsInline = true;
    elementos.video.srcObject = fluxoCamera;
    elementos.quadroCamera.querySelector('img')?.remove();
    definirEstadoCamera(true);

    // A reproducao e iniciada depois que o fluxo foi ligado ao elemento de video.
    elementos.video.play().catch((erro) => {
      console.warn('A previa foi autorizada, mas o video nao iniciou automaticamente:', erro);
    });

    elementos.botaoCamera.innerHTML = '<span>◉</span> Analisar quadro';
    elementos.botaoCamera.removeEventListener('click', iniciarCamera);
    elementos.botaoCamera.addEventListener('click', analisarQuadro);
  } catch (erro) {
    console.error('Nao foi possivel iniciar a camera:', erro);
    definirEstadoAnalise('Nao foi possivel acessar a camera. Verifique a permissao ou envie uma imagem.');
  }
}

// Captura o quadro atual do video para preparar e analisar a imagem.
function analisarQuadro() {
  if (!elementos.video.videoWidth || !elementos.video.videoHeight) {
    definirEstadoAnalise('A camera ainda esta iniciando. Aguarde um instante e tente novamente.');
    return;
  }

  elementos.telaCaptura.width = elementos.video.videoWidth;
  elementos.telaCaptura.height = elementos.video.videoHeight;

  const contexto = elementos.telaCaptura.getContext('2d');
  contexto.drawImage(elementos.video, 0, 0);
  prepararImagem(elementos.telaCaptura);
}

// Prepara a imagem antes de envia-la para o modelo.
function prepararImagem(origemImagem) {
  if (!modeloEcoScan) {
    definirEstadoAnalise('O modelo ainda esta carregando. Aguarde um instante.');
    return;
  }

  definirEstadoAnalise('Analisando o material predominante do objeto...');
  // Mostra uma camada de analise para dar retorno visual imediato ao usuario.
  elementos.quadroCamera.classList.add('analisando');
  elementos.indicadorLeitura.textContent = 'ANALISANDO';

  // Cria um identificador novo para esta imagem ou quadro capturado.
  const identificadorAnalise = identificadorAnaliseAtual + 1;
  identificadorAnaliseAtual = identificadorAnalise;
  elementos.botaoCamera.disabled = true;

  // O Teachable Machine ja redimensiona e normaliza a imagem internamente.
  // Manter a imagem original evita alterar as cores antes da previsao.
  analisarImagem(origemImagem, identificadorAnalise);
}

// Envia a imagem preparada para o modelo e mostra a maior probabilidade.
async function analisarImagem(imagem, identificadorAnalise) {
  try {
    const previsoes = await modeloEcoScan.predict(imagem);

    // Ignora uma resposta antiga se outra análise já tiver começado.
    if (identificadorAnalise !== identificadorAnaliseAtual) {
      return;
    }

    // Mostra todas as probabilidades para ajudar a conferir o comportamento do modelo.
    console.table(previsoes.map((previsao) => ({
      classe: previsao.className,
      confianca: `${Math.round(previsao.probability * 100)}%`
    })));

    const previsao = previsoes.reduce((maior, atual) => (
      atual.probability > maior.probability ? atual : maior
    ));

    exibirResultado(previsao.className, previsao.probability);
  } catch (erro) {
    // Uma análise antiga não deve alterar o resultado mais recente da tela.
    if (identificadorAnalise !== identificadorAnaliseAtual) {
      return;
    }

    console.error('Nao foi possivel analisar a imagem:', erro);
    elementos.quadroCamera.classList.remove('analisando');
    definirEstadoAnalise('Nao foi possivel analisar esta imagem. Tente novamente.');
    elementos.indicadorLeitura.textContent = 'ERRO';
  } finally {
    // Libera o botão somente quando esta for a análise atual.
    if (identificadorAnalise === identificadorAnaliseAtual) {
      elementos.botaoCamera.disabled = false;
    }
  }
}

// Converte o nome usado pelo modelo para a forma exibida no site.
function normalizarNomeMaterial(nomeClasse) {
  const nomes = {
    plastico: 'Plastico',
    metal: 'Metal',
    vidro: 'Vidro',
    papel: 'Papel',
    papelao: 'Papelao'
  };

  return nomes[nomeClasse.toLowerCase()] ?? nomeClasse;
}

// Mostra o resultado, a confianca e uma sugestao simples de descarte.
function exibirResultado(nomeClasse, probabilidade) {
  // Retira a camada de analise antes de mostrar o resultado final.
  elementos.quadroCamera.classList.remove('analisando');
  const nomeMaterial = normalizarNomeMaterial(nomeClasse);
  const porcentagem = Math.round(probabilidade * 100);
  const confiancaMinima = configuracaoEcoScan.confiancaMinima;
  const resultadoSeguro = probabilidade >= confiancaMinima;
  const descartes = {
    plastico: 'Coleta de plastico',
    metal: 'Coleta de metal',
    vidro: 'Coleta de vidro',
    papel: 'Coleta de papel',
    papelao: 'Coleta de papelao'
  };

  elementos.indicadorLeitura.textContent = 'CONCLUIDO';
  elementos.iconeMaterial.textContent = resultadoSeguro ? '✓' : '?';
  elementos.nomeMaterial.textContent = resultadoSeguro ? nomeMaterial : 'Resultado incerto';
  elementos.mensagemMaterial.textContent = resultadoSeguro
    ? 'Material predominante identificado.'
    : 'A confianca ficou baixa. Tente aproximar o objeto e melhorar a iluminacao.';
  elementos.valorConfianca.textContent = `${porcentagem}%`;
  elementos.barraConfianca.style.width = `${porcentagem}%`;
  elementos.mensagemConfianca.textContent = resultadoSeguro
    ? 'Resultado acima do limite minimo de confianca.'
    : 'Resultado abaixo do limite minimo de 70%.';
  elementos.descarteSugerido.textContent = resultadoSeguro
    ? descartes[nomeClasse.toLowerCase()] ?? 'Consulte a coleta da sua regiao'
    : 'Tente uma nova imagem';
  elementos.mensagemDescarte.textContent = resultadoSeguro
    ? 'Confirme as regras de coleta da sua cidade.'
    : 'O descarte so sera sugerido com mais seguranca.';
}

// Exibe a imagem enviada pelo usuario dentro do quadro da camera.
function exibirImagemSelecionada(arquivo) {
  if (enderecoImagemSelecionada) {
    URL.revokeObjectURL(enderecoImagemSelecionada);
  }

  enderecoImagemSelecionada = URL.createObjectURL(arquivo);
  const imagem = new Image();

  imagem.onload = () => {
    elementos.video.hidden = true;
    elementos.video.style.display = 'none';
    elementos.mensagemCamera.hidden = true;
    elementos.mensagemCamera.style.display = 'none';
    imagem.alt = 'Imagem enviada para analise';

    const imagemAnterior = elementos.quadroCamera.querySelector('img');
    imagemAnterior?.remove();
    elementos.quadroCamera.prepend(imagem);

    prepararImagem(imagem);
  };

  imagem.src = enderecoImagemSelecionada;
}

// Recebe o arquivo escolhido no campo de upload.
function tratarImagemSelecionada(evento) {
  const arquivo = evento.target.files?.[0];

  if (arquivo) {
    exibirImagemSelecionada(arquivo);
  }
}

// Registra todos os eventos necessarios para a pagina funcionar.
function configurarEventos() {
  elementos.botaoCamera.addEventListener('click', iniciarCamera);
  elementos.campoImagem.addEventListener('change', tratarImagemSelecionada);
  window.addEventListener('beforeunload', encerrarCamera);
}

// Registra no HTML quais bibliotecas foram carregadas com sucesso.
function verificarBibliotecas() {
  if (window.cv) {
    document.body.dataset.opencv = 'ready';
  }

  if (window.tf) {
    document.body.dataset.tensorflow = 'ready';
  }

  if (window.tmImage) {
    document.body.dataset.teachableMachine = 'ready';
  }
}

// Libera a camera e o endereco temporario antes de fechar a pagina.
function encerrarCamera() {
  fluxoCamera?.getTracks().forEach((faixa) => faixa.stop());

  if (enderecoImagemSelecionada) {
    URL.revokeObjectURL(enderecoImagemSelecionada);
  }
}

// Configura os eventos assim que o arquivo JavaScript e carregado.
configurarEventos();

// Aguarda as bibliotecas externas e carrega o modelo exportado.
window.addEventListener('load', () => {
  verificarBibliotecas();
  carregarModelo();
});
