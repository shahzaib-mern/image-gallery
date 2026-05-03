# Image Gallery - Vanilla JS

[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-100%25-blueviolet)](https://vanillajs.net/)

## 🎨 Modern Image Gallery App

A fully-featured, responsive image gallery built with **pure Vanilla JavaScript**, **HTML5**, and **CSS3**. No frameworks or libraries required!

**Live Demo**: [Open index.html](index.html)

### ✨ Features

- **📁 Album Management** - Create, switch, and organize images into albums
- **⬆️ Drag & Drop Upload** - Upload multiple images with preview
- **🔍 Smart Search** - Filter by title or caption
- **❤️ Favorites** - Mark and filter favorite images
- **📱 Dual View Modes** - Grid or list layout
- **🌙 Lightbox Modal** - Full-screen viewer with navigation, slideshow, keyboard controls
- **✏️ Image Editing** - Edit titles, captions, categories
- **📤 Import/Export** - JSON backup/restore entire gallery
- **📊 Stats & Empty States** - Visual feedback and counters
- **🎨 Glassmorphism UI** - Modern gradients, blur effects, smooth animations
- **📱 Fully Responsive** - Mobile-first design

### 🖼️ Screenshots

| Albums Overview | Gallery Grid View | Lightbox Modal |
| --- | --- | --- |
| ![Albums](screenshots/albums.png) | ![Grid](screenshots/grid.png) | ![Lightbox](screenshots/lightbox.png) |

| List View | Upload Area | Edit Modal |
| --- | --- | --- |
| ![List](screenshots/list.png) | ![Upload](screenshots/upload.png) | ![Edit](screenshots/edit.png) |

### 🚀 Quick Start

1. **No setup required** - Just open `index.html` in any modern browser
2. **Pre-loaded sample images** from Picsum across 5 albums
3. **Start uploading** your own images via drag-drop or file picker

```
# From command line (optional)
open index.html
# or
start index.html (Windows)
```

### 📋 Album Structure

```
default     (10 sample images)
├── nature  (3 images)
├── city    (3 images)  
├── travel  (3 images)
└── personal (2 images)
```

**Categories**: nature, city, animals, abstract, travel, personal, other

### 🎮 Usage

1. **Browse Albums** - Click album cards or use dropdown
2. **Upload Images** - Drag-drop or click browse
3. **Search & Filter** - Type to search, toggle favorites
4. **View Modes** - Switch grid/list with buttons
5. **Lightbox** - Click any image
   - **Arrow keys** / **Mouse** to navigate
   - **ESC** to close
   - **Spacebar** toggle slideshow
6. **Edit** - Click heart (favorite), pen (edit), trash (delete) in lightbox
7. **Backup** - Export JSON, import to restore

### 🛠️ Tech Stack

- **100% Vanilla JS** (~1100 LOC class-based)
- **CSS3** - Flexbox/Grid, Animations, Glassmorphism, Backdrop-filter
- **HTML5** - Drag-drop API, FileReader, LocalStorage-ready
- **External**: Font Awesome icons only

### 📱 Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 90+  
✅ Safari 14+  
✅ Mobile browsers

### 🚀 Performance

- **Lazy loading** images
- **Base64 storage** (client-side only)
- **60fps animations**
- **Optimized renders**

### 🔮 Future Enhancements

- [ ] LocalStorage persistence
- [ ] Image compression
- [ ] Bulk actions
- [ ] Tags system
- [ ] Share links
- [ ] PWA installable

## 🤝 Contributing

1. Fork this repo
2. Create feature branch
3. Add your images/album
4. Open Pull Request

## 📄 License

MIT License - Feel free to use in commercial projects!

---

**Built with ❤️ using Vanilla JS** | [View Live Demo](index.html)

