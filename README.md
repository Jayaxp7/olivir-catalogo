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

## App instalável

No celular, abra o site do vendedor no Chrome, toque nos 3 pontos e em **Instalar app** (ou **Adicionar à tela inicial**). Depois de aberto uma vez com internet, o catálogo abre também sem sinal.

## Duas páginas

- `index.html`: área do vendedor (cadastro, vendas, comissão). Pede e-mail e senha.
- `catalogo.html`: catálogo dos compradores. Só foto, nome e preço, com botão para o WhatsApp.

## Configurar o Firebase (uma vez, plano Spark gratuito)

1. Em https://console.firebase.google.com crie um projeto.
2. **Authentication > Sign-in method**: ative E-mail/senha. Em **Users**, adicione o usuário do vendedor.
3. **Firestore Database**: crie o banco (modo produção). Em **Regras**, cole o conteúdo de `firestore.rules` trocando `SEU_EMAIL_AQUI` pelo e-mail do vendedor, e publique.
4. **Project settings > Seus apps > Web (`</>`)**: registre um app e copie `apiKey`, `authDomain`, `projectId` e `appId` para `config.js`, junto com o número do WhatsApp (só números, com 55 e DDD).
5. **Authentication > Settings > Authorized domains**: adicione o domínio da Vercel (ex.: `olivir-catalogo.vercel.app`).
6. Suba os arquivos no GitHub. A Vercel publica sozinha.

As fotos ficam dentro do próprio Firestore (reduzidas no celular), então não precisa ativar o Storage nem trocar de plano.

Sem o `config.js` preenchido, a área do vendedor funciona só neste navegador (localStorage).
