# Catálogo Olivir

Catálogo pessoal de semi jóias para o vendedor: foto, nome, código e preço de cada peça, marcação de vendida com anotações da venda (comprador, prazo e forma de pagamento) e comissão calculada.

Site estático, sem build. Tudo está em `index.html`.

## Rodar localmente

```bash
npx serve .
```

## Publicar na Vercel

1. Importe este repositório em https://vercel.com/new.
2. Framework Preset: **Other**. Deixe build command e output directory em branco.
3. Clique em Deploy.

## Onde os dados ficam

Fora do Claude, as peças e as fotos ficam salvas no navegador do aparelho (localStorage), sem sincronizar entre aparelhos. O limite do navegador é de cerca de 5 MB, o que dá para dezenas de fotos reduzidas. Limpar os dados do site apaga o catálogo, então use "Exportar lista" quando disponível ou mantenha um backup.
