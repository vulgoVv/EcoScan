# Dados do EcoScan

Esta pasta guarda as imagens usadas para preparar e avaliar o modelo de classificação.

## Divisões

```text
dados/
├── treinamento/
├── validacao/
└── teste/
```

- `treinamento`: imagens usadas para o modelo aprender.
- `validacao`: imagens usadas para acompanhar o aprendizado e ajustar o modelo.
- `teste`: imagens separadas para medir o resultado final.

Cada divisão possui as mesmas cinco classes:

```text
plastico/
metal/
vidro/
papel/
papelao/
```

## Como adicionar imagens

- Coloque somente imagens do material indicado pelo nome da pasta.
- Use imagens de objetos reais, com formatos e tamanhos variados.
- Inclua diferentes cores, fundos, distâncias e condições de luz.
- Mantenha o objeto principal visível e razoavelmente centralizado.
- Não use a mesma imagem em mais de uma divisão.
- Evite colocar várias fotos quase iguais da mesma situação em divisões diferentes.
- Use nomes simples, como `vidro_copo_001.jpg` ou `plastico_garrafa_002.png`.
- Não coloque imagens com pessoas identificáveis sem necessidade.

## Divisão inicial sugerida

- 70% das imagens para `treinamento`;
- 15% das imagens para `validacao`;
- 15% das imagens para `teste`.

Essa divisão deve ser feita por objeto ou por situação de captura. Fotos muito parecidas do mesmo objeto devem ficar na mesma divisão para evitar um resultado enganoso.

## Cuidados com as classes

- `plastico`: copos, garrafas, potes, tampas e embalagens plásticas.
- `metal`: latas, objetos de alumínio e embalagens metálicas.
- `vidro`: copos, garrafas, frascos e potes de vidro.
- `papel`: folhas, envelopes, impressos e embalagens leves.
- `papelao`: caixas, placas e embalagens rígidas de papelão.

Objetos feitos com mais de um material devem ser classificados pelo material predominante. Se isso não estiver claro, a imagem deve ser separada para revisão antes de entrar no conjunto de treinamento.

## Estado atual

A estrutura das pastas foi criada. As imagens ainda precisam ser coletadas, revisadas e distribuídas entre treinamento, validação e teste.
