# EcoScan

Aplicação web de visão computacional para auxiliar na identificação de materiais recicláveis.

O EcoScan recebe uma imagem da câmera ou um arquivo enviado pelo usuário e estima se o material predominante é plástico, metal, vidro, papel ou papelão.

## Estado atual

O projeto já possui:

- interface web responsiva;
- acesso à câmera do navegador;
- envio de imagens pelo computador;
- captura de um quadro da câmera para análise;
- modelo exportado pelo Teachable Machine;
- classificação executada localmente no navegador;
- indicação do material provável;
- porcentagem de confiança;
- aviso quando a confiança fica abaixo do limite definido;
- sugestão inicial de descarte;
- comentários didáticos no código;
- execução pelo Live Server, sem Node.js e sem npm.

O OpenCV.js está previsto para uma etapa futura de preparação das imagens. No código atual, o redimensionamento necessário é feito internamente pelo modelo do Teachable Machine.

## Estrutura do projeto

```text
EcoScan/
├── src/
│   ├── index.html
│   ├── modelo/
│   │   ├── metadata.json
│   │   ├── model.json
│   │   └── weights.bin
│   ├── scripts/
│   │   ├── configuracao.js
│   │   └── main.js
│   └── styles/
│       └── main.css
└── README.md
```

### Principais arquivos

- `src/index.html`: estrutura da página, botões, câmera e área de resultado.
- `src/styles/main.css`: aparência, responsividade e animações da interface.
- `src/scripts/configuracao.js`: categorias, limite de confiança e regras gerais.
- `src/scripts/main.js`: câmera, upload, captura do quadro, carregamento do modelo e previsão.
- `src/modelo/model.json`: estrutura do modelo exportado.
- `src/modelo/metadata.json`: nomes das classes e informações do modelo.
- `src/modelo/weights.bin`: pesos numéricos aprendidos durante o treinamento.

## Tecnologias

- **HTML**: estrutura da aplicação.
- **CSS**: layout, cores, responsividade e feedback visual.
- **JavaScript**: câmera, envio de imagens e fluxo da análise.
- **TensorFlow.js**: execução do modelo no navegador.
- **Teachable Machine**: carregamento do modelo exportado e chamada da previsão.
- **MobileNet**: base visual usada pelo modelo treinado no Teachable Machine.
- **OpenCV.js**: tecnologia prevista para futuras etapas de preparação das imagens.

## Como o modelo funciona

O modelo foi treinado separadamente no Teachable Machine com cinco categorias:

- papel;
- papelão;
- vidro;
- metal;
- plástico.

Depois do treinamento, o modelo foi exportado para TensorFlow.js. Os três arquivos exportados foram colocados em `src/modelo/`.

Quando o usuário clica em analisar, o `main.js` captura a imagem atual e executa:

```javascript
const previsoes = await modeloEcoScan.predict(imagem);
```

O modelo retorna uma probabilidade para cada classe. O EcoScan mostra a classe com maior probabilidade, desde que ela atinja o limite mínimo de confiança de 70%.

O modelo não compara a imagem com uma pasta durante a execução. As imagens usadas no treinamento foram transformadas em pesos numéricos no arquivo `weights.bin`.

## Como executar localmente

### Requisito

Instale no Visual Studio Code a extensão **Live Server**, de Ritwick Dey.

Não é necessário instalar Node.js, npm ou criar um servidor com `npm run dev`.

### Passo a passo

1. Abra a pasta do projeto no Visual Studio Code:

   ```text
   C:\Users\vgabr\Documents\GitHub\EcoScan
   ```

2. Abra a pasta `src`.

3. Clique com o botão direito no arquivo `index.html`.

4. Escolha **Open with Live Server**.

5. O navegador abrirá um endereço parecido com:

   ```text
   http://127.0.0.1:5500/src/index.html
   ```

6. Clique em **Ativar câmera**.

7. Permita o acesso à câmera quando o navegador solicitar.

8. Coloque um objeto na moldura e clique em **Analisar quadro**.

Também é possível clicar em **Enviar imagem** para testar uma imagem salva no computador.

## Se a câmera não aparecer

- Verifique se a página foi aberta pelo Live Server.
- Não abra o arquivo usando duplo clique, começando com `file:///`.
- Confirme a permissão da câmera no navegador.
- Feche outros programas que estejam usando a câmera.
- Recarregue a página com `Ctrl + F5`.
- Use boa iluminação e mantenha um objeto por vez no centro da moldura.

## Limitações atuais

O resultado é uma estimativa do material predominante. O modelo pode errar quando:

- o objeto está parcialmente escondido;
- há mais de um material na mesma imagem;
- a imagem está escura ou desfocada;
- o fundo chama mais atenção que o objeto;
- o objeto tem formato diferente das imagens usadas no treinamento;
- papel e papelão aparecem com características muito parecidas;
- vidro e plástico possuem reflexos semelhantes.

Durante os testes, o modelo apresentou tendência a classificar imagens diferentes como papelão. Esse comportamento está relacionado ao treinamento e à diferença entre as imagens usadas no modelo e as imagens reais capturadas pela câmera.

## Próximas etapas

- melhorar e equilibrar as imagens de treinamento;
- treinar novamente o modelo com imagens mais próximas do uso real;
- testar cada classe com imagens que não participaram do treinamento;
- registrar a precisão e os erros por categoria;
- avaliar o uso do OpenCV.js no pré-processamento;
- melhorar a distinção entre papel e papelão e entre vidro e plástico;
- continuar a evolução da mesma aplicação.
