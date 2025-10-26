# How to Run Brainstorm.ai Applications

This project contains two Next.js applications that work together:

## 📦 Applications

1. **Main Portfolio App** (Port 3000) - `agntix-nextjs/`
   - Main agency/portfolio website
   - Contains blog functionality with AI generation
   - Admin panel for blog management
   - **Automatically launches** the Brainstorming app when needed

2. **Brainstorming App** (Port 3001) - `Brainstorming-App-main/`
   - AI-powered brainstorming tool
   - Uses Google Gemini API
   - **Launches automatically** when you click "Get In Touch"

---

## 🚀 Quick Start (Recommended)

### Just Run the Main App!

```bash
cd agntix-nextjs
npm run dev
```

**That's it!** The Brainstorming app will start automatically when you click "Get In Touch".

---

## 🎯 How It Works

1. **Start** only the Main Portfolio App:
   ```bash
   cd agntix-nextjs
   npm run dev
   ```

2. **Visit** http://localhost:3000

3. **Click** the menu button (parallel lines) → **Contact** → **Get In Touch**

4. The system will:
   - ✨ Automatically start the Brainstorming App (if not running)
   - ⏳ Show a loading screen while it starts
   - 🚀 Redirect you to http://localhost:3001 when ready

**No need to manually start the Brainstorming app!**

---

## ⚙️ Environment Variables

### Brainstorming App
Create `.env` in `Brainstorming-App-main/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Main Portfolio App
Create `.env.local` in `agntix-nextjs/`:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
```

---

## 📝 Notes

- Both apps must be running for the "Get In Touch" button to work
- The Brainstorming App requires a Google Gemini API key
- The Main Portfolio App requires OpenAI and Supabase credentials for blog generation

---

## 🐛 Troubleshooting

**Port already in use?**
- Make sure no other apps are running on ports 3000 or 3001
- Check with: `netstat -ano | findstr :3000` or `netstat -ano | findstr :3001`

**Can't connect to Brainstorming App?**
- Make sure the Brainstorming App is running on port 3001
- Check the terminal for any errors
- Verify the GEMINI_API_KEY is set correctly

---

## 🎉 Success!

When both apps are running:
- **Portfolio**: http://localhost:3000
- **Brainstorming**: http://localhost:3001

Happy brainstorming! 🚀
