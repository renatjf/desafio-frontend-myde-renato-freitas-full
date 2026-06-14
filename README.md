# Desafio Frontend — Renato Freitas · Myde

> **Inbox de Atendimento WhatsApp com IA** — Next.js 15 · App Router · React Query · Tailwind CSS 4

---

## Como instalar e rodar

### Pré-requisitos

- Node.js 18+ (recomendado: 20 LTS)
- npm 9+

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/renatjf/desafio-frontend-myde-renato-freitas-full.git
cd desafio-frontend-myde-renato-freitas-full

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# O arquivo já vem pré-configurado com a URL da API hospedada.

# 4. Rode em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no browser.

### Scripts disponíveis

| Comando             | Descrição                                           |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com hot reload          |
| `npm run build`     | Build de produção (Next.js)                         |
| `npm run start`     | Servidor de produção (após build)                   |
| `npm run typecheck` | Verificação de tipos TypeScript sem emitir arquivos |
| `npm run lint`      | Lint com ESLint                                     |

### Variáveis de ambiente

| Variável              | Descrição               | Padrão                                                   |
| --------------------- | ----------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API backend | `https://8tymn68hp9.execute-api.us-east-1.amazonaws.com` |

---

## Arquitetura do projeto

```
desafio-frontend-myde-renato-freitas/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raiz — metadados, OG image, providers
│   ├── page.tsx                # Redirect / → /inbox
│   ├── globals.css             # Reset + variáveis CSS (tokens de design)
│   ├── providers.tsx           # QueryClientProvider (React Query)
│   └── inbox/
│       ├── layout.tsx          # Layout de duas colunas (sidebar + chat)
│       ├── page.tsx            # Estado vazio (nenhuma conversa selecionada)
│       └── [id]/
│           └── page.tsx        # Rota dinâmica da conversa
│
├── components/
│   ├── ConversationList.tsx    # Sidebar: lista, busca e filtro de não lidas
│   ├── ConversationItem.tsx    # Item de conversa com highlight de busca
│   ├── ChatArea.tsx            # Histórico de mensagens + scroll automático
│   ├── MessageBubble.tsx       # Bolha de mensagem (in/out) com status
│   ├── MessageInput.tsx        # Input de envio com update otimista e IA
│   ├── DateSeparator.tsx       # Separador de data entre grupos de mensagens
│   ├── MobileChatWrapper.tsx   # Renderiza ChatArea com flag isMobile para botão voltar
│   ├── MobileInboxShell.tsx    # Shell mobile: alterna sidebar ↔ chat via pathname
│   └── ui/
│       ├── Avatar.tsx          # Avatar com iniciais e cor customizável
│       ├── Spinner.tsx         # Indicador de carregamento acessível
│       ├── EmptyState.tsx      # Estado vazio com ícone e descrição
│       ├── ErrorState.tsx      # Estado de erro com retry
│       └── MessageStatus.tsx   # Ícones de status (enviado/entregue/lido)
│
├── hooks/
│   ├── useConversations.ts     # Fetch + polling automático das conversas (15s)
│   ├── useMessages.ts          # Fetch + polling automático das mensagens (8s)
│   └── useAgent.ts             # Dados do atendente logado (cache longo)
│
├── lib/
│   ├── api.ts                  # Cliente Axios + tipos TypeScript + funções de API
│   └── utils.ts                # Formatação de datas, telefone BR, iniciais, normalização de busca
│
└── public/
    └── og-image.jpg            # Imagem de Open Graph (WhatsApp, Twitter, LinkedIn)
```

### Fluxo de dados

```
/inbox → InboxLayout
  ├── ConversationList (useConversations — polling 15s)
  │     └── ConversationItem × N
  └── /inbox/[id] → MobileChatWrapper
        └── ChatArea (useMessages — polling 8s)
              ├── MessageBubble × N
              └── MessageInput
                    ├── sendMessage (mutação com update otimista)
                    └── suggestReply (mutação IA)
```

---

## Decisões de arquitetura

### Server vs Client Components

- **Server Components** são usados nos layouts e pages de rota (`app/inbox/layout.tsx`, `app/inbox/[id]/page.tsx`). Eles não têm estado e carregam o HTML inicial com zero JS extra.
- **Client Components** (`"use client"`) são usados apenas onde há interatividade: lista de conversas com busca/filtro, chat com scroll, input de mensagem. Isso minimiza o bundle JS enviado ao browser.

### Data fetching com React Query

Optei por **polling** ao invés de WebSocket pelos seguintes motivos:

- O backend fornecido é REST (AWS API Gateway), sem suporte a WebSocket nativo.
- React Query torna o polling trivial com `refetchInterval`, com cache, deduplicação e retry automático.
- Intervalos diferenciados: conversas a 15s (mudança menos crítica) e mensagens a 8s (exige mais responsividade).

Com mais tempo, implementaria SSE (Server-Sent Events) ou WebSocket no proxy Next.js para atualização em tempo real.

### Update otimista

O envio de mensagem usa `onMutate` do React Query para:

1. Cancelar queries em andamento (evitar race condition).
2. Adicionar a mensagem imediatamente à lista (UI responsiva).
3. Reverter com `onError` se a requisição falhar.
4. Substituir a mensagem otimista pela real retornada da API em `onSuccess`.

### Layout mobile

O principal bug de mobile em projetos de chat é o **teclado virtual** (iOS/Android). Quando o teclado abre, a viewport diminui, e um `height: 100vh` calculado no carregamento da página faz o input sair da tela.

A solução correta usa:

- `height: 100dvh` — **dynamic viewport height**, que recalcula quando o teclado abre/fecha.
- `flex flex-col` no container do chat com `flex-1 overflow-y-auto` na área de mensagens e `flex-shrink-0` no input.
- `MobileChatWrapper` posicionado como `fixed inset-0` no mobile, garantindo que o chat ocupe a tela toda independentemente do layout pai.
- `overflow: hidden` apenas no container filho (não no `body`), evitando que o iOS trave o scroll.

### OG Image

Adicionada via `metadata.openGraph` e `metadata.twitter` no `app/layout.tsx` do Next.js 15, apontando para `/og-image.jpg` em `/public`. Isso garante que a imagem apareça ao compartilhar o link no WhatsApp, Twitter/X e LinkedIn.

O .env para funcionar o openGraph deve ficar assim:
NEXT_PUBLIC_API_URL=https://8tymn68hp9.execute-api.us-east-1.amazonaws.com/
NEXT_PUBLIC_SITE_URL=https://desafio-frontend-myde-full.netlify.app

---

## O que faria diferente com mais tempo

- **Testes**: unitários com Vitest para hooks e utils; testes de integração com Testing Library para os componentes principais.
- **Acessibilidade avançada**: foco automático no campo de input ao abrir o chat, anúncios de novas mensagens via `aria-live`, suporte completo a navegação por teclado.
- **Notificações**: `Notification API` do browser para alertar mensagens novas quando a aba estiver em segundo plano.
- **Virtualização**: para caixas com centenas de mensagens, usar `@tanstack/react-virtual` para renderizar apenas as visíveis.
- **Otimistic rollback visual**: mostrar toast de erro com botão "Reenviar" em vez de apenas reverter silenciosamente.
- **SSE ou WebSocket**: substituir polling por push real do servidor.
- **Design system**: extrair os tokens de cor do CSS para um arquivo de configuração e criar variantes de tema (modo escuro).

---

## Links

- 🔗 **Demo em produção**: https://desafio-front-myde-next.netlify.app/
- 📦 **Repositório**: https://github.com/renatjf/desafio-frontend-myde-renato-freitas-full
