# EcoScan

Aplicação web de visão computacional para identificação de materiais recicláveis.

## Estrutura

```text
EcoScan/
├── docs/
│   └── plano-desenvolvimento.md
├── src/
│   ├── assets/
│   ├── index.html
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       └── main.css
└── README.md
```

## Tecnologias

- HTML sem framework para a estrutura da aplicação;
- CSS responsivo para a interface;
- JavaScript para webcam, captura e fluxo da aplicação;
- OpenCV.js para preparação das imagens;
- TensorFlow.js para inferência no navegador;
- MobileNet como base do classificador.

## Direção do projeto

O desenvolvimento será incremental, sempre evoluindo a mesma aplicação. O objetivo é classificar plástico, metal/alumínio, vidro, papel e papelão a partir de imagens capturadas pela câmera ou enviadas pelo usuário.

A interface já está organizada para receber o modelo treinado. Enquanto o modelo não estiver integrado, a aplicação prepara a imagem e preserva o estado da análise sem atribuir uma classe artificialmente.

## Execução local

Como a câmera do navegador normalmente exige um contexto seguro, execute a pasta `src` usando um servidor HTTP local. Por exemplo, com a extensão Live Server do VS Code ou com qualquer servidor estático configurado para servir `src/index.html`.

## Próximas etapas

Consulte o [plano de desenvolvimento](docs/plano-desenvolvimento.md) para acompanhar a preparação do pipeline OpenCV.js, treinamento do modelo e integração da inferência real.
