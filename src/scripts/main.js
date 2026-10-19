// Elementos usados pela interface
const obterElemento = (id) => document.getElementById(id);

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

let fluxoCamera = null;
let enderecoImagemSelecionada = null;

/**
 * Atualiza o painel de resultado enquanto o modelo ainda não foi integrado.
 * A aplicação não inventa uma classe: ela informa que a imagem está pronta.
 */
function definirEstadoAnalise(mensagem) {
  elementos.iconeMaterial.textContent = '…';
  elementos.nomeMaterial.textContent = 'Modelo em preparação';
  elementos.mensagemMaterial.textContent = mensagem;
  elementos.valorConfianca.textContent = '—';
  elementos.barraConfianca.style.width = '0%';
  elementos.mensagemConfianca.textContent = 'A confiança será exibida após a integração do modelo';
  elementos.descarteSugerido.textContent = '—';
  elementos.mensagemDescarte.textContent = 'O descarte será sugerido conforme a classe identificada';
}

/** Atualiza os textos e indicadores visuais da câmera. */
function definirEstadoCamera(estaAtiva) {
  // O vídeo só fica visível depois que a permissão foi concedida e o fluxo começou.
  elementos.video.hidden = !estaAtiva;
  elementos.video.style.display = estaAtiva ? 'block' : 'none';
  elementos.mensagemCamera.hidden = estaAtiva;
  elementos.mensagemCamera.style.display = estaAtiva ? 'none' : 'flex';
  elementos.indicadorCamera.textContent = estaAtiva ? 'CÂMERA ATIVA' : 'CÂMERA DESATIVADA';
  elementos.indicadorCamera.style.color = estaAtiva ? '#b9f17f' : 'white';
  elementos.indicadorLeitura.textContent = estaAtiva ? 'AO VIVO' : 'AGUARDANDO';
}

/** Solicita permissão e inicia o vídeo da câmera do dispositivo. */
async function iniciarCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    definirEstadoAnalise('Seu navegador não oferece acesso à câmera. Envie uma imagem para continuar.');
    return;
  }

  try {
    // Encerra um fluxo anterior antes de solicitar uma nova câmera.
    fluxoCamera?.getTracks().forEach((faixa) => faixa.stop());

    fluxoCamera = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 }
      },
      audio: false
    });

    // Essas propriedades ajudam o Opera a reproduzir a câmera dentro da página.
    elementos.video.autoplay = true;
    elementos.video.muted = true;
    elementos.video.playsInline = true;
    elementos.video.srcObject = fluxoCamera;
    elementos.quadroCamera.querySelector('img')?.remove();
    definirEstadoCamera(true);

    // A prévia já foi liberada; a reprodução é iniciada sem bloquear o restante da interface.
    elementos.video.play().catch((erro) => {
      console.warn('A prévia foi autorizada, mas o vídeo não iniciou automaticamente:', erro);
    });
    elementos.botaoCamera.innerHTML = '<span>◉</span> Analisar quadro';
    elementos.botaoCamera.removeEventListener('click', iniciarCamera);
    elementos.botaoCamera.addEventListener('click', analisarQuadro);
  } catch (erro) {
    console.error('Não foi possível iniciar a câmera:', erro);
    definirEstadoAnalise('Não foi possível acessar a câmera. Verifique a permissão ou envie uma imagem.');
  }
}

/** Captura o quadro atual do vídeo para a etapa de preparação da imagem. */
function analisarQuadro() {
  if (!elementos.video.videoWidth || !elementos.video.videoHeight) {
    definirEstadoAnalise('A câmera ainda está iniciando. Aguarde um instante e tente novamente.');
    return;
  }

  elementos.telaCaptura.width = elementos.video.videoWidth;
  elementos.telaCaptura.height = elementos.video.videoHeight;

  const contexto = elementos.telaCaptura.getContext('2d');
  contexto.drawImage(elementos.video, 0, 0);
  prepararImagem(elementos.telaCaptura);
}

/**
 * Redimensiona a imagem para o tamanho esperado pelo futuro modelo.
 * O resultado desta função será usado depois em `modelo.predict()`.
 */
function prepararImagem(origemImagem) {
  definirEstadoAnalise('Imagem pronta para analisar o material predominante do objeto.');
  elementos.indicadorLeitura.textContent = 'IMAGEM PRONTA';

  const bibliotecaOpenCV = window.cv;
  if (!bibliotecaOpenCV?.Mat || !bibliotecaOpenCV.imread || !bibliotecaOpenCV.resize) {
    return;
  }

  const imagemOriginal = bibliotecaOpenCV.imread(origemImagem);
  const imagemRedimensionada = new bibliotecaOpenCV.Mat();

  bibliotecaOpenCV.resize(
    imagemOriginal,
    imagemRedimensionada,
    new bibliotecaOpenCV.Size(
      configuracaoEcoScan.tamanhoImagemModelo.largura,
      configuracaoEcoScan.tamanhoImagemModelo.altura
    )
  );

  // O tensor do TensorFlow.js será criado aqui na próxima etapa do projeto.
  imagemOriginal.delete();
  imagemRedimensionada.delete();
}

/** Exibe a imagem enviada pelo usuário dentro do quadro da câmera. */
function exibirImagemSelecionada(arquivo) {
  if (enderecoImagemSelecionada) {
    URL.revokeObjectURL(enderecoImagemSelecionada);
  }

  enderecoImagemSelecionada = URL.createObjectURL(arquivo);
  const imagem = new Image();

  imagem.onload = () => {
    elementos.video.hidden = true;
    elementos.mensagemCamera.hidden = true;
    imagem.alt = 'Imagem enviada para análise';

    const imagemAnterior = elementos.quadroCamera.querySelector('img');
    imagemAnterior?.remove();
    elementos.quadroCamera.prepend(imagem);

    prepararImagem(imagem);
  };

  imagem.src = enderecoImagemSelecionada;
}

/** Recebe o arquivo escolhido no campo de upload. */
function tratarImagemSelecionada(evento) {
  const arquivo = evento.target.files?.[0];
  if (arquivo) {
    exibirImagemSelecionada(arquivo);
  }
}

/** Registra todos os eventos necessários para a página funcionar. */
function configurarEventos() {
  elementos.botaoCamera.addEventListener('click', iniciarCamera);
  elementos.campoImagem.addEventListener('change', tratarImagemSelecionada);
  window.addEventListener('beforeunload', encerrarCamera);
}

/** Registra no HTML quais bibliotecas foram carregadas com sucesso. */
function verificarBibliotecas() {
  if (window.cv) {
    document.body.dataset.opencv = 'ready';
  }

  if (window.tf) {
    document.body.dataset.tensorflow = 'ready';
  }
}

/** Libera a câmera e o endereço temporário da imagem antes de fechar a página. */
function encerrarCamera() {
  fluxoCamera?.getTracks().forEach((faixa) => faixa.stop());

  if (enderecoImagemSelecionada) {
    URL.revokeObjectURL(enderecoImagemSelecionada);
  }
}

configurarEventos();
window.addEventListener('load', verificarBibliotecas);
