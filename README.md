# Project Opik - React Portfolio

Portfolio website dengan gaya visual mirip game Genshin Impact (miHoYo), dibangun dengan React, Tailwind CSS, dan Framer Motion.

## Tech Stack

- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build Tool

## Fitur

- ✨ Loading Screen dengan progress bar
- 🎮 Title Screen dengan animasi gatekeeper-style
- 🌟 Star particle canvas animation
- 📑 Smooth scroll navigation dengan scrollspy
- 🖼️ Portfolio gallery dengan tab filter & 3D hover effects
- 📱 Responsive design dengan mobile menu
- 🎨 Custom Genshin-style UI components

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Struktur Project

```
src/
├── components/
│   ├── LoadingScreen.jsx    # Initial loading animation
│   ├── TitleScreen.jsx      # Game-style title screen
│   ├── StarCanvas.jsx       # Twinkling stars background
│   ├── Navbar.jsx           # Fixed navigation
│   ├── Hero.jsx             # Hero section
│   ├── About.jsx            # About / Profile section
│   ├── Portfolio.jsx        # Gallery dengan tabs
│   ├── GalleryModal.jsx     # Project detail modal
│   ├── Contact.jsx          # Contact section
│   └── Footer.jsx            # Footer
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Kustomisasi

### Mengubah Nama & Konten
Edit file `src/components/` untuk mengubah:
- Nama di Hero, About, Footer
- Profile image
- Portfolio projects
- Social links

### Mengubah Warna
Edit `tailwind.config.js` untuk mengubah warna tema:
- gold-premium: Warna aksen utama
- bg-dark: Background warna gelap
- anemo-teal: Efek glow

## Lisensi

&copy; 2026 Opik Portfolio. All rights reserved.