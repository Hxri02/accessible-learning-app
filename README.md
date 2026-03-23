# Accessible Learning App

A multi-modal learning application designed for differently abled users — helping individuals with **hearing impairments** and **visual impairments** learn alphabets, numbers, and basic words through alternative sensory feedback.

---

## Project Info

| Field        | Details                              |
|--------------|--------------------------------------|
| Developer    | Hariharan J                          |
| College      | Prathyusha Engineering College, Aranvoyalkuppam, Tiruvallur |
| Year         | 2023 – 2024                          |
| Type         | Academic Group Project               |
| Tech Stack   | HTML5, CSS3, JavaScript (Vanilla)    |

---

## Features

### Audio Mode — For Visually Impaired Users
- Each letter, number, or word is **spoken aloud** using the Web Speech API
- Speaks the character first, then the hint (e.g. "A" → "as in Apple")
- Adjustable speech rate and pitch for clarity

### Vibration Mode — For Hearing Impaired Users
- Each character has a **unique haptic vibration pattern**
- On-screen dots animate one by one to simulate the vibration visually
- On supported mobile devices, triggers real device vibration via the Vibration API

### Lesson Categories
- **Letters** — A to Z (26 items)
- **Numbers** — 1 to 10
- **Words** — Simple everyday words (CAT, DOG, SUN, etc.)

### Other Features
- Progress dots track completed items per lesson
- Score counter shows Current / Total / Done
- Step-by-step lesson flow (gradual learning)
- Fully responsive — works on mobile and desktop

---

## Folder Structure

```
accessible-learning-app/
│
├── index.html          # Main HTML — app structure
├── css/
│   └── style.css       # All styles and CSS variables
├── js/
│   ├── data.js         # Lesson data (letters, numbers, words)
│   └── app.js          # App logic (modes, render, play, navigation)
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

---

## How to Run

### Method 1 — Open directly in browser (simplest)
```bash
# Just double-click index.html
# Or drag it into Chrome / Edge / Firefox
```

### Method 2 — VS Code Live Server
```bash
# 1. Open folder in VS Code
# 2. Install "Live Server" extension
# 3. Right-click index.html → "Open with Live Server"
# 4. Opens at: http://127.0.0.1:5500
```

### Method 3 — Python local server
```bash
cd accessible-learning-app
python -m http.server 8000
# Open: http://localhost:8000
```

### Method 4 — Node.js local server
```bash
cd accessible-learning-app
npx serve .
# Open: http://localhost:3000
```

---

## Deployment (Host Online)

### GitHub Pages
```bash
# 1. Create a GitHub repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Hxri02/accessible-learning-app.git
git push -u origin main

# 2. Go to repo Settings → Pages → Branch: main → Save
# 3. Live at: https://Hxri02.github.io/accessible-learning-app
```

### Netlify (Drag & Drop)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `accessible-learning-app/` folder
3. Get a live URL instantly

### Vercel
```bash
npm install -g vercel
cd accessible-learning-app
vercel
```

---

## Browser Compatibility

| Feature          | Chrome | Firefox | Safari | Edge | Android Chrome |
|------------------|--------|---------|--------|------|----------------|
| Audio Mode (TTS) | Yes    | Yes     | Yes    | Yes  | Yes            |
| Vibration Mode   | Yes    | No      | No     | Yes  | Yes (best)     |
| General UI       | Yes    | Yes     | Yes    | Yes  | Yes            |

> **Note:** Vibration API works best on Android Chrome. iOS Safari does not support the Vibration API.

---

## APIs Used

| API                        | Purpose                          |
|----------------------------|----------------------------------|
| `SpeechSynthesisUtterance` | Text-to-speech for audio mode    |
| `navigator.vibrate()`      | Device haptic feedback           |
| Vanilla DOM API            | UI rendering and interactions    |

---

## License

This project was developed as an academic project at Prathyusha Engineering College.  
Free to use for educational and accessibility purposes.
