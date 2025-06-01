# LLM Chat Tool Assessment

This is a minimal full-stack chat application built with **Next.js App Router**, **TailwindCSS**. It supports streaming LLM responses.

## ✨ Features

- Clean, responsive chat UI (`/chat` route)
- Real-time streamed responses from an LLM
- Error handling for invalid input
- Local chat history

---

## 🚀 Live Demo

[https://llm-chat-tool-assessment.vercel.app/chat](https://llm-chat-tool-assessment.vercel.app/chat)

---

## 📦 Tech Stack

- Next.js (App Router)
- TailwindCSS
- TypeScript

---

## 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/max-im/llm-chat-tool-assessment.git
cd llm-chat-tool-assessment
```

2. **Make up `.env.local` file from `env.local.sample`, put your own openai api key**
3. **Install dependencies `npm install`**
4. **Set up Prisma**

```bash
npx prisma generate
npx prisma db push
```

If you're using a different database than SQLite, update DATABASE_URL in .env.local.

3. **Start the development server**

```bash
npm run dev
```
