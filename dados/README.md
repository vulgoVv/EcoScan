# Dados do EcoScan

Esta pasta guarda as imagens usadas para preparar e avaliar o modelo de classificacao.

## Divisoes

```text
dados/
|-- treinamento/
|-- validacao/
`-- teste/
```

- `treinamento`: imagens usadas para o modelo aprender.
- `validacao`: imagens usadas para acompanhar o aprendizado e ajustar o modelo.
- `teste`: imagens separadas para medir o resultado final.

Cada divisao possui as mesmas cinco classes:

```text
plastico/
metal/
vidro/
papel/
papelao/
```

## Imagens adicionadas

Foi adicionada uma selecao do conjunto publico TrashNet, usando a versao redimensionada das imagens.

Foram adicionadas 300 imagens para cada categoria do EcoScan:

- 210 imagens para treinamento;
- 45 imagens para validacao;
- 45 imagens para teste.

A categoria `trash` do conjunto original nao foi usada, porque ela nao faz parte das cinco categorias definidas para o EcoScan.

## Como adicionar imagens

- Coloque somente imagens do material indicado pelo nome da pasta.
- Use imagens de objetos reais, com formatos e tamanhos variados.
- Inclua diferentes cores, fundos, distancias e condicoes de luz.
- Mantenha o objeto principal visivel e razoavelmente centralizado.
- Nao use a mesma imagem em mais de uma divisao.
- Evite colocar varias fotos quase iguais da mesma situacao em divisoes diferentes.
- Use nomes simples, como `vidro_copo_001.jpg` ou `plastico_garrafa_002.png`.
- Nao coloque imagens com pessoas identificaveis sem necessidade.

## Cuidados com as classes

- `plastico`: copos, garrafas, potes, tampas e embalagens plasticas.
- `metal`: latas, objetos de aluminio e embalagens metalicas.
- `vidro`: copos, garrafas, frascos e potes de vidro.
- `papel`: folhas, envelopes, impressos e embalagens leves.
- `papelao`: caixas, placas e embalagens rigidas de papelao.

Objetos feitos com mais de um material devem ser classificados pelo material predominante. Se isso nao estiver claro, a imagem deve ser separada para revisao antes de entrar no conjunto de treinamento.

## Fonte das imagens

As imagens iniciais foram obtidas da versao redimensionada do conjunto publico TrashNet:

- Repositorio: https://github.com/garythung/trashnet
- Licenca informada no repositorio: MIT

A fonte deve ser citada no relatorio do projeto. Fotos proprias ainda podem ser adicionadas para representar melhor o uso real pela camera.
