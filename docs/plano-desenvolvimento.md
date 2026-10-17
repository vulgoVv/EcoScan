# Plano de desenvolvimento — EcoScan

## Etapa 1 — Base visual e interação

- Criar a página responsiva com identidade visual do EcoScan.
- Criar a área de câmera com moldura de enquadramento.
- Permitir ativar a webcam pelo navegador.
- Permitir enviar uma imagem do computador ou celular.
- Exibir material, confiança e orientação de descarte.
- Carregar TensorFlow.js e OpenCV.js via CDN.
- Preparar a imagem localmente no navegador para o futuro modelo.

## Entrega 2 — Pipeline de visão computacional

- Usar OpenCV.js para redimensionar, normalizar e reduzir ruído.
- Detectar se há um objeto razoavelmente enquadrado.
- Criar mensagens para baixa iluminação, desfoque, fundo poluído e oclusão.
- Capturar vários quadros e usar uma média das previsões para estabilizar o resultado.

## Entrega 3 — Modelo de classificação

- Organizar imagens nas cinco classes: plástico, metal/alumínio, vidro, papel e papelão.
- Separar os dados em treinamento, validação e teste.
- Aplicar aumento de dados com variações de rotação, escala, brilho e enquadramento.
- Fazer transferência de aprendizado a partir da MobileNet.
- Exportar o modelo em formato compatível com TensorFlow.js.
- Implementar a inferência em `src/scripts/main.js` com `model.predict()`.

## Entrega 4 — Confiabilidade e experiência

- Definir um limite mínimo de confiança antes de mostrar uma resposta categórica.
- Mostrar “não foi possível identificar” para imagens ambíguas.
- Testar objetos reais em diferentes ambientes e iluminações.
- Avaliar especialmente a diferença entre papel e papelão e entre vidro e plástico.
- Informar que objetos compostos podem ser classificados pelo material predominante.

## Entrega 5 — Publicação e documentação

- Testar a aplicação em Chrome, Edge e celular.
- Documentar como executar localmente e como trocar o modelo.
- Adicionar uma página ou seção com limitações e uso educativo.
- Publicar como site estático quando o modelo estiver validado.

## Critério para o primeiro modelo

O modelo inicial deve ser considerado pronto quando conseguir classificar um conjunto de teste separado, com resultados registrados por classe. A métrica principal será a precisão por categoria, acompanhada da matriz de confusão para identificar onde o modelo mais erra.

## Próximo passo técnico

Treinar ou obter um conjunto de imagens rotuladas e exportar um modelo MobileNet de cinco classes. A interface já possui o ponto de integração em `src/scripts/main.js`; a inferência será adicionada quando o modelo validado estiver disponível.
