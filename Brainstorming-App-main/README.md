<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# IDEA RIOT - Brainstorming App

A Next.js application for creative brainstorming powered by Google's Gemini AI.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **AI:** Google Gemini API

## Run Locally

**Prerequisites:** Node.js 18.17 or later

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Features

- Interactive brainstorming brief form
- AI-powered creative trigger generation
- Swipeable trigger board for curation
- Workshop mode with timer
- CSV export functionality
