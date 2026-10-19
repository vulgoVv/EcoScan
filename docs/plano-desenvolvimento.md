# Plano de desenvolvimento — EcoScan

## Etapa 1 — Base visual e interação — concluída

- Criar a página responsiva com a identidade visual do EcoScan.
- Criar a área de câmera com moldura de enquadramento.
- Permitir ativar a webcam pelo navegador.
- Permitir enviar uma imagem do computador ou celular.
- Criar as áreas de resultado, confiança e descarte.
- Carregar TensorFlow.js e OpenCV.js via CDN.
- Preparar a imagem localmente no navegador.
- Testar a câmera usando o Live Server.

## Etapa 2 — Regras do primeiro classificador — concluída

- Analisar um objeto principal por vez.
- Orientar o usuário a centralizar o objeto e usar boa iluminação.
- Trabalhar com plástico, metal, vidro, papel e papelão.
- Considerar o material predominante em objetos compostos.
- Usar 70% como confiança mínima para uma resposta segura.
- Registrar as regras em `src/scripts/configuracao.js`.

## Etapa 3 — Preparação das imagens — iniciada

- [Concluído] Criar a pasta `dados` separada do código da aplicação.
- [Concluído] Criar as pastas de treinamento, validação e teste.
- [Concluído] Criar as cinco classes em cada divisão.
- [Documentado] Definir como as imagens devem ser coletadas e nomeadas.
- [Pendente] Adicionar imagens reais nas cinco classes.
- [Pendente] Incluir objetos de formatos, cores e tamanhos diferentes.
- [Pendente] Variar iluminação, distância, ângulo, fundo e estado do objeto.
- [Pendente] Incluir copos de vidro e plástico em situações parecidas.
- [Pendente] Revisar e separar as imagens sem repetir situações entre as divisões.

## Etapa 4 — Treinamento do modelo

- Usar MobileNet como base de transferência de aprendizado.
- Treinar uma camada final para as cinco classes.
- Aplicar pequenas mudanças de rotação, escala, brilho e enquadramento.
- Medir a precisão de cada classe.
- Criar uma matriz de confusão.
- Avaliar especialmente os erros entre vidro e plástico e entre papel e papelão.

## Etapa 5 — Integração com TensorFlow.js

- Converter o modelo para o formato do TensorFlow.js.
- Salvar o `model.json` e os arquivos de pesos.
- Criar o arquivo com os nomes e a ordem das classes.
- Carregar o modelo uma única vez no navegador.
- Transformar a imagem preparada pelo OpenCV.js em tensor.
- Executar `modelo.predict()`.
- Exibir a maior probabilidade e sua confiança.
- Liberar os tensores com `dispose()`.

## Etapa 6 — Confiabilidade e testes

- Analisar mais de um quadro para reduzir mudanças bruscas no resultado.
- Detectar imagem escura ou desfocada.
- Orientar quando o objeto estiver longe ou parcialmente escondido.
- Mostrar uma mensagem quando a confiança for baixa.
- Testar copos, garrafas, potes, latas, folhas, caixas e embalagens.
- Testar ambientes com luz natural e artificial.

## Etapa 7 — Finalização

- Adicionar uma tela de carregamento do modelo.
- Informar quando o modelo estiver pronto para uso.
- Tratar falhas de carregamento.
- Documentar como executar e atualizar o modelo.
- Testar em computador e celular.
- Publicar somente depois de validar o modelo com imagens que não participaram do treinamento.

## Critério para o primeiro modelo

O modelo será considerado pronto quando classificar um conjunto de teste separado, com resultados registrados por classe. A principal medida será a precisão de cada categoria, acompanhada da matriz de confusão para mostrar os erros mais comuns.

## Próxima etapa

Montar o conjunto de imagens das cinco classes. A interface já está preparada para receber o modelo quando o treinamento estiver concluído.
