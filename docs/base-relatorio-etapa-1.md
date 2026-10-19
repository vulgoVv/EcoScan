# Base do relatório da etapa 1

Este documento reúne as informações do modelo de relatório e do plano de trabalho que podem ser usadas na redação do relatório do EcoScan.

## Dados institucionais

- Curso: Análise e Desenvolvimento de Sistemas, Ciência da Computação ou Engenharia de Software.
- Disciplina vocacionada: Processamento de imagens.
- Professor informado no plano de trabalho: Vinícius Colombo Sonda.
- Turno: Noite.
- Ano e semestre: 2026/2.
- Carga horária: 20 horas-relógio.
- Tema delimitado: Visão Computacional.
- Nome informado no modelo de relatório: Vinícius Colombo Sonda.
- Local e data do modelo: Caxias do Sul, 2026.

## Título sugerido

ECOSCAN APLICAÇÃO WEB PARA IDENTIFICAÇÃO DE MATERIAIS RECICLÁVEIS COM VISÃO COMPUTACIONAL

O modelo solicita que o título seja escrito em letras maiúsculas, em negrito, centralizado e com no máximo três linhas.

## Problema identificado

Pessoas podem ter dificuldade para identificar o material predominante de um resíduo quando a aparência do objeto não deixa clara a diferença entre plástico, vidro, metal, papel e papelão. Essa dificuldade pode contribuir para a separação incorreta dos resíduos e reduzir a qualidade da coleta seletiva.

## Objetivo geral

Desenvolver uma aplicação web capaz de auxiliar a identificação de materiais recicláveis por meio de imagens capturadas pela câmera do dispositivo, utilizando técnicas de visão computacional e inteligência artificial.

## Objetivos específicos

- Criar uma interface web simples e acessível para o EcoScan.
- Permitir o uso da webcam no navegador.
- Permitir o envio de imagens para análise.
- Preparar as imagens com técnicas de processamento visual.
- Estruturar o reconhecimento das categorias plástico, metal, vidro, papel e papelão.
- Utilizar OpenCV.js no pré-processamento das imagens.
- Utilizar TensorFlow.js para executar o modelo no navegador.
- Exibir a categoria provável e o nível de confiança da previsão.
- Informar quando a imagem não for suficiente para uma classificação segura.
- Apoiar a educação ambiental e a separação inicial de resíduos.

## Núcleo interdisciplinar relacionado

O núcleo mais diretamente relacionado ao EcoScan é **Meio Ambiente, Sustentabilidade e Responsabilidade Social**, pois o projeto trata da separação de resíduos, da reciclagem e do uso de tecnologia para apoiar práticas ambientais.

O projeto também pode se relacionar ao núcleo **Educação, Desenvolvimento Humano e Cultura**, porque a aplicação possui finalidade educativa e pode ser utilizada para explicar materiais recicláveis em atividades escolares ou comunitárias.

## Objetivos de Desenvolvimento Sustentável relacionados

### ODS 4 — Educação de qualidade

O EcoScan transforma o reconhecimento de resíduos em uma experiência prática de aprendizagem, aproximando visão computacional, sustentabilidade e educação ambiental.

### ODS 11 — Cidades e comunidades sustentáveis

A ferramenta pode apoiar ações de coleta seletiva e incentivar práticas que contribuam para ambientes urbanos mais organizados e sustentáveis.

### ODS 12 — Consumo e produção responsáveis

Esta é a relação principal do projeto. A identificação dos materiais pode estimular o descarte correto, a reciclagem e a separação dos resíduos na origem.

### ODS 15 — Vida terrestre

O descarte adequado pode contribuir para reduzir a presença de resíduos no solo e diminuir impactos sobre ecossistemas terrestres.

## Justificativa relacionada aos ODS

O EcoScan relaciona tecnologia e sustentabilidade ao oferecer uma orientação visual para a identificação inicial de resíduos. A aplicação pode ser usada como ferramenta educativa para mostrar que diferentes materiais exigem formas diferentes de separação e descarte. Essa proposta se relaciona principalmente ao ODS 12, porque incentiva padrões de consumo e produção mais responsáveis, e aos ODS 4 e 11, por unir aprendizagem, participação comunitária e sustentabilidade urbana.

## Introdução teórica

Visão computacional é uma área da computação que permite analisar imagens e vídeos para extrair informações. No EcoScan, a câmera captura a imagem de um objeto e o sistema prepara essa imagem antes da classificação.

O OpenCV.js será utilizado no navegador para tarefas de pré-processamento, como redimensionamento, conversão de cores e preparação dos pixels. O TensorFlow.js será utilizado para carregar e executar um modelo de inteligência artificial no próprio navegador.

Para reconhecer as cinco categorias do projeto, será necessário adaptar um modelo visual pré-treinado por meio de transferência de aprendizado. A MobileNet é uma alternativa adequada para a primeira versão porque foi criada para aplicações com recursos limitados e pode ser executada em navegadores e dispositivos móveis.

## Descrição da atividade da etapa 1

1. Foi criada a estrutura inicial do repositório EcoScan.
2. A aplicação foi organizada na pasta `src`, com arquivos separados para HTML, CSS, JavaScript e recursos.
3. Foi criada a interface inicial do scanner.
4. Foi implementado o acesso à webcam pelo navegador.
5. Foi implementado o envio de uma imagem pelo usuário.
6. Foi configurada a prévia da câmera dentro da página.
7. Foram adicionadas as referências do OpenCV.js e do TensorFlow.js.
8. O OpenCV.js foi preparado para redimensionar a imagem para `224x224` pixels.
9. O código foi documentado com comentários didáticos e nomes de funções em português.
10. O projeto foi configurado para ser executado pelo Live Server.
11. A prévia da câmera foi testada no navegador.

## Resultados da etapa 1

A etapa resultou em uma aplicação web funcional em sua estrutura inicial. A página apresenta o EcoScan, permite ativar a câmera, exibe a prévia do vídeo dentro do scanner e permite enviar uma imagem. O projeto também possui uma área preparada para mostrar material, confiança e sugestão de descarte.

O reconhecimento automático ainda não foi apresentado como resultado porque o modelo específico das cinco classes ainda precisa ser treinado. Nesta etapa, a imagem é preparada para a futura integração do modelo TensorFlow.js.

## Conclusão da etapa 1

A primeira etapa foi concluída com a criação da base web, a configuração do scanner, a integração inicial das bibliotecas e o teste da câmera pelo navegador. A próxima etapa deve concentrar-se na montagem do conjunto de imagens e na preparação do pipeline de treinamento do modelo de classificação.

## Evidências que podem ser adicionadas ao relatório

- Captura de tela da página inicial.
- Captura de tela com a câmera ativa dentro do scanner.
- Captura de tela do envio de uma imagem.
- Captura da estrutura de pastas do projeto.
- Trecho do `index.html` mostrando as referências do OpenCV.js e TensorFlow.js.
- Trecho do `main.js` mostrando a captura e a preparação da imagem.
- Endereço local usado no teste com Live Server.

## Referências para completar o relatório

- OpenCV. OpenCV.js e processamento de imagens. https://docs.opencv.org/4.x/
- TensorFlow. TensorFlow.js. https://www.tensorflow.org/js
- TensorFlow. Modelos para TensorFlow.js. https://www.tensorflow.org/js/models
- Organização das Nações Unidas. Objetivos de Desenvolvimento Sustentável. https://sdgs.un.org/goals
