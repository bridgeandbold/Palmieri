# Palmieri Cleaning

Site de captação de leads para a Palmieri Cleaning (Connecticut). Next.js 15
(App Router) + Tailwind v4, pronto para deploy na Vercel. O lead do formulário
sai por Web3Forms e cai no e-mail do dono da access key.

## Rodar local

```bash
npm install
npm run dev
```

## O que mexer quando o cliente pedir mudança

| O que mudar | Onde |
|---|---|
| Telefone, e-mail, domínio | `src/lib/site.ts` → objeto `site` |
| Cidades, ZIPs, texto de cada cidade, prioridade | `src/lib/site.ts` → `cities` |
| Serviços (título, texto, itens) | `src/lib/site.ts` → `services` |
| Diferenciais ("Why Palmieri") | `src/lib/site.ts` → `reasons` |
| Perguntas frequentes | `src/lib/site.ts` → `faqs` |
| Cores da marca | `src/app/globals.css` → `navy` e `royal` |
| Título e textos da primeira dobra | `src/components/Hero.tsx` |

**Quase tudo está em `src/lib/site.ts`.** Comece por lá.

## Como as cidades foram usadas

Cada cidade tem um `tier` em `src/lib/site.ts`:

| Tier | Cidades | Efeito no site |
|---|---|---|
| `core` (melhores) | Farmington, Avon, Groton | Aparecem no título do Google e no texto do hero; prioridade 0.9 no sitemap |
| `growth` (potencial) | Old Lyme, Manchester | Prioridade 0.8 |
| `light` (fracas) | Torrington, New Preston | Continuam no site; prioridade 0.7 |

Toda cidade ganha uma página própria em `/cleaning-services/<cidade>-ct`
(ex.: `/cleaning-services/farmington-ct`), com texto local e o formulário já
com a cidade selecionada. É isso que ajuda a ranquear em "house cleaning
Farmington CT". Para adicionar uma cidade, basta incluir na lista: a página,
o menu de áreas, o rodapé, o `<select>` do formulário e o sitemap acompanham.

## ⚠️ Pendências antes de publicar

1. **Telefone do cliente.** Está vazio em `src/lib/site.ts`. Com o campo
   vazio, o site esconde o botão de ligar. Preencheu, aparece em todo lugar.
   (O e-mail já está: `taianypalmiericleaning@gmail.com`.)
2. **Access key do Web3Forms** (ver abaixo). Sem ela o formulário não envia.
3. **Conferir os ZIPs.**
   - Torrington: você passou `06759`, mas esse ZIP é de **Litchfield**. Coloquei
     `06790` (Torrington). Se o cliente atende Litchfield, troque o nome da cidade.
   - Groton: `06355` é o ZIP de **Mystic** (lado de Groton). O ZIP principal de
     Groton é `06340`. Mantive `06355` e o texto cita Mystic.
4. **Domínio.** Trocar `site.url` em `src/lib/site.ts` pelo domínio real.
   Alimenta o SEO, o sitemap e o schema.org.
5. **Confirmar as afirmações com o cliente.** Não inventei nada grave, mas estas
   frases assumem coisas que precisam ser verdade:
   - "We bring the supplies" (hero e FAQ)
   - "Local to Connecticut" (diferenciais)
   - Serviços de **Vacation Rental Turnovers**, **Post-Construction** e
     **Office**: se não fizer, remova de `services`.
   - Se for **licensed/insured** ou tiver **garantia de satisfação**, vale
     acrescentar em `reasons`. São os argumentos que mais pesam nesse mercado.
6. **Logo em PNG (opcional).** A logo do site é um SVG redesenhado à mão em
   `src/components/Logo.tsx` (vetorial, nunca borra). O favicon é
   `src/app/icon.svg`. Se preferir o arquivo original: salve em
   `public/logo.png` e troque `<Logo />` por
   `<img src="/logo.png" alt="Palmieri Cleaning" />` no `Header.tsx` e `Footer.tsx`.
7. **Depoimentos.** Não existe seção de depoimentos, de propósito. Review
   inventado é risco jurídico. Quando houver reviews reais (Google), a gente
   adiciona.
8. **Fotos.** O site não usa fotos (o cartão de checklist no hero faz esse
   papel). Fotos reais de antes/depois aumentam bastante a conversão.

## Formulário de lead (Web3Forms)

Fluxo: form → `POST api.web3forms.com/submit` → e-mail cai no inbox do **dono
da access key** → redireciona para `/thank-you`.

> **O e-mail de destino não está no código.** Ele é propriedade da conta
> Web3Forms que gerou a chave. Trocar destinatário = gerar chave nova na conta certa.

### Configurar

1. Em uma **janela anônima** (`Ctrl+Shift+N`), gerar a access key em
   [web3forms.com](https://web3forms.com) usando o e-mail
   `taianypalmiericleaning@gmail.com`. Janela
   anônima evita gerar a chave dentro da conta de outro cliente: o sintoma
   disso é a API responder `200` e o e-mail sumir.
2. Local: copiar `.env.local.example` para `.env.local` e preencher
   `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
3. Vercel: **Settings → Environment Variables**

   | Nome | Valor | Ambientes |
   |---|---|---|
   | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | a chave gerada | Production **+** Preview **+** Development |

4. **Redeploy sem build cache.** Variável `NEXT_PUBLIC_*` é embutida em build
   time. Mudar a variável sem redeployar não muda nada.
5. Enviar um lead de teste de verdade e confirmar `200` + `success: true`.
   Só o dono da conta consegue confirmar a chegada no inbox.

### Segundo destinatário (sem pagar o PRO)

O plano free aceita 1 destinatário por chave. Para receber o lead também no seu
e-mail: crie uma segunda conta Web3Forms, gere outra chave e cadastre como
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2`. O código envia para as duas em paralelo com
`Promise.allSettled`: se a secundária falhar, o lead principal **não** se perde.

### Proteções já embutidas

- **Honeypot** `botcheck` (escondido por classe *e* por style inline).
- **Guard de chave ausente**: sem a chave, o visitante vê um erro e o console
  mostra `[Palmieri] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ausente no build`. Sem
  isso, o form falharia `400` para sempre sem ninguém notar.
- **Erro real na tela**: se o Web3Forms recusar, o visitante vê a mensagem e,
  quando preenchidos, o telefone e o e-mail como alternativa.

Limites do plano grátis: 250 envios/mês, submissões guardadas 30 dias, um único
destinatário por chave (CC é PRO).

## Deploy na Vercel

1. Subir para um repositório GitHub.
2. Vercel → New Project → importar o repo (framework Next.js, detecta sozinho).
3. Cadastrar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` **antes** do primeiro deploy.
4. Deploy.

A Vercel faz deploy a cada push na `main`. Ela **não** publica sozinha o que já
estava no repositório no momento em que o Git foi conectado: é preciso um commit
novo depois da conexão para o primeiro deploy sair.

## Estrutura

```
src/
  app/
    layout.tsx                  fontes, SEO, schema.org HouseCleaningService
    page.tsx                    home (monta todas as seções)
    cleaning-services/[city]/   uma página por cidade (SEO local)
    thank-you/                  destino após o envio do formulário
    sitemap.ts, robots.ts       gerados a partir das cidades
    icon.svg                    favicon
    globals.css                 paleta da marca (navy, royal)
  components/
    Logo.tsx          logo em SVG (tone="light" para fundo escuro)
    Header.tsx        nav fixa + menu mobile
    Hero.tsx          primeira dobra + cartão de checklist
    Services.tsx      6 serviços
    WhyUs.tsx         4 diferenciais
    Process.tsx       3 passos
    ServiceAreas.tsx  cidades agrupadas por região
    Faq.tsx
    ContactForm.tsx   Web3Forms + honeypot + 2º destinatário
    Footer.tsx
    MobileCta.tsx     barra fixa de orçamento no celular
  lib/
    site.ts           painel de controle: contato, cidades, serviços, FAQ
```
