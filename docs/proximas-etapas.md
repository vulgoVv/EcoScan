# EcoScan — O que precisa ser feito a partir de agora

Este documento orienta a continuação do desenvolvimento da mesma aplicação, em etapas pequenas e verificáveis.

## 1. Preparar o ambiente de desenvolvimento

- [Dispensado por enquanto] Instalar o Node.js LTS. O fluxo atual usa Live Server e não depende de npm.
- [Concluído] Instalar as extensões Live Server, ESLint e Prettier.
- [Concluído] Definir a pasta `src` como raiz do Live Server.
- [Concluído] Confirmar que a câmera funciona no navegador usando um servidor local.
- [Dispensado por enquanto] Criar um `package.json`, pois o projeto atual não depende de ferramentas executadas pelo npm.

## 2. Definir o comportamento da primeira versão do classificador — concluída

- [Concluído] Analisar um objeto principal por vez.
- [Concluído] Orientar o usuário a centralizar o objeto na moldura.
- [Concluído] Trabalhar inicialmente com cinco classes:
  - plástico;
  - metal e alumínio;
  - vidro;
  - papel;
  - papelão.
- [Definido] Classificar o material predominante quando o objeto tiver mais de um material.
- [Definido] Exibir uma mensagem de incerteza quando a confiança for menor que 70%.

## 3. Montar o conjunto de imagens — em andamento

- [Concluído] Criar uma pasta de dados separada do código da aplicação.
- [Concluído] Organizar as pastas por treinamento, validação e teste.
- [Concluído] Criar as cinco classes em cada divisão.
- [Concluído] Documentar a forma de adicionar, nomear e revisar as imagens em `dados/README.md`.
- [Pendente] Adicionar imagens reais por classe.
- [Pendente] Incluir objetos de formatos, cores e tamanhos diferentes.
- [Pendente] Variar iluminação, distância, ângulo, fundo e estado do objeto.
- [Pendente] Incluir copos de vidro e plástico em situações visualmente parecidas.
- [Pendente] Separar as imagens em treinamento, validação e teste sem repetir situações.

## 4. Treinar o modelo

- Usar MobileNet como base de transferência de aprendizado.
- Treinar uma camada final para as cinco classes do EcoScan.
- Aplicar aumento de dados com rotação, escala, brilho e enquadramento.
- Medir precisão por classe.
- Gerar uma matriz de confusão.
- Avaliar especialmente os erros entre vidro e plástico e entre papel e papelão.

## 5. Exportar o modelo para o navegador

- Converter o modelo para o formato TensorFlow.js.
- Adicionar uma pasta de modelo ao projeto, por exemplo `src/modelo/`.
- Salvar o `model.json` e os arquivos de pesos.
- Criar um arquivo com os nomes e a ordem das classes.
- Confirmar que o modelo pode ser carregado pelo navegador.

## 6. Integrar o TensorFlow.js

- Criar uma função para carregar o modelo uma única vez.
- Converter a imagem preparada pelo OpenCV.js em tensor.
- Normalizar os valores dos pixels conforme o treinamento.
- Executar `modelo.predict()`.
- Relacionar cada índice de saída ao nome correto da classe.
- Exibir a maior probabilidade e sua confiança.
- Liberar os tensores com `dispose()` para evitar consumo crescente de memória.

## 7. Melhorar a análise da câmera

- Analisar mais de um quadro para evitar resultados instáveis.
- Calcular uma média das previsões recentes.
- Detectar imagem escura ou desfocada.
- Orientar o usuário quando o objeto estiver muito longe ou parcialmente oculto.
- Avaliar se a imagem contém um objeto centralizado antes da classificação.

## 8. Validar com objetos reais

- Testar copos de vidro e plástico.
- Testar garrafas, potes, latas, folhas, caixas e embalagens.
- Testar objetos limpos, amassados, dobrados e parcialmente ocultos.
- Testar ambientes com iluminação natural e artificial.
- Registrar os erros encontrados.
- Ajustar os dados e o modelo antes de alterar a interface.

## 9. Finalizar a aplicação

- Adicionar uma tela de carregamento do modelo.
- Informar quando o modelo estiver pronto para uso.
- Tratar falhas de carregamento e falta de conexão quando o modelo for remoto.
- Documentar como executar o projeto.
- Testar em computador e celular.
- Publicar somente após validar o modelo com imagens que não participaram do treinamento.

## Próxima tarefa recomendada

A próxima tarefa prática é adicionar e revisar as imagens das cinco classes dentro da pasta `dados`. Depois disso, será possível iniciar o treinamento com MobileNet e avaliar os primeiros resultados.
