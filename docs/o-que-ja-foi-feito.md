# EcoScan — O que já foi feito

Este documento registra o estado atual do projeto para evitar retrabalho e manter a evolução organizada.

## Estrutura do projeto

O projeto foi organizado com uma estrutura separando aplicação e documentação:

```text
EcoScan/
├── docs/
│   ├── o-que-ja-foi-feito.md
│   ├── plano-desenvolvimento.md
│   └── proximas-etapas.md
├── src/
│   ├── assets/
│   ├── index.html
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       └── main.css
├── README.md
├── .vscode/
│   ├── extensions.json
│   └── settings.json
└── .gitattributes
```

## Interface

- Criada a página principal do EcoScan.
- Criada uma identidade visual própria para o projeto.
- Criado layout responsivo para computador e celular.
- Criadas as seções de scanner, resultado, funcionamento e apresentação do projeto.
- Criada a área de confiança da classificação.
- Criada a área de sugestão de descarte.
- Criadas mensagens para orientar o usuário durante a captura.

## Câmera e imagens

- Adicionado acesso à câmera pelo navegador.
- Adicionada solicitação de permissão para uso da câmera.
- Adicionada captura do quadro atual do vídeo.
- Adicionado envio de uma imagem pelo computador ou celular.
- Adicionada exibição da imagem enviada dentro do quadro do scanner.
- Adicionada liberação da câmera ao sair da página.
- Adicionada liberação dos endereços temporários das imagens enviadas.

## Bibliotecas

- TensorFlow.js foi incluído no `index.html`.
- OpenCV.js foi incluído no `index.html`.
- O código verifica se as bibliotecas foram carregadas.
- O OpenCV.js já redimensiona a imagem para `224x224`, tamanho planejado para o modelo baseado em MobileNet.

## JavaScript

O arquivo `src/scripts/main.js` foi organizado com nomes de funções e variáveis em português:

- `iniciarCamera()`;
- `analisarQuadro()`;
- `prepararImagem()`;
- `exibirImagemSelecionada()`;
- `tratarImagemSelecionada()`;
- `configurarEventos()`;
- `verificarBibliotecas()`;
- `encerrarCamera()`.

O código ainda não atribui um material artificialmente. Ele prepara a imagem e aguarda a integração do modelo de classificação treinado.

## Documentação

- Criado o plano geral de desenvolvimento.
- Criado este registro do que já foi feito.
- Criado o documento com as próximas etapas.
- Criado o `README.md` com a estrutura, tecnologias e direção do projeto.

## Configuração do VS Code

- Adicionadas recomendações de Live Server, ESLint e Prettier.
- Configurado o Live Server para servir a pasta `src`.
- Configurado o Prettier para formatar os arquivos ao salvar.

## Ainda não implementado

- Modelo treinado para as cinco classes.
- Arquivo `model.json` e seus arquivos de pesos.
- Inferência com `modelo.predict()`.
- Conjunto de dados próprio.
- Métricas de precisão, validação e teste.
- Detecção automática de objeto no enquadramento.

## Etapa 2 definida

- A primeira versão analisará um objeto principal por vez.
- O usuário será orientado a manter o objeto centralizado e bem iluminado.
- O classificador terá cinco categorias: plástico, metal, vidro, papel e papelão.
- A confiança mínima definida para uma resposta segura é de 70%.
- As regras foram registradas em `src/scripts/configuracao.js`.

## Etapa 3 iniciada

- Criada a pasta `dados` separada do código da aplicação.
- Criadas as divisões `treinamento`, `validacao` e `teste`.
- Criadas as cinco classes dentro de cada divisão.
- Criado `dados/README.md` com as regras para coletar, nomear e revisar as imagens.
- As imagens reais ainda precisam ser adicionadas e separadas.
