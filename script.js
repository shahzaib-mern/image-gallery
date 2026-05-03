/**
 * ImageGallery Class
 * Manages albums, image uploads, lightbox, favorites, search, import/export.
 */
class ImageGallery {
    constructor() {
        // 1. DATA SETUP — all albums start with sample images
        this.albums = {
            default: [
                { id: 1, src: 'https://picsum.photos/id/104/800/600', category: 'nature', title: 'Mountain Lake', caption: 'Serene mountain landscape', favorite: false },
                { id: 2, src: 'https://picsum.photos/id/15/800/600', category: 'nature', title: 'Forest Path', caption: 'Misty morning in pine forest', favorite: false },
                { id: 3, src: 'https://picsum.photos/id/96/800/600', category: 'nature', title: 'Mountain Peak', caption: 'Snow capped mountains', favorite: false },
                { id: 4, src: 'https://picsum.photos/id/20/800/600', category: 'city', title: 'City Lights', caption: 'Downtown skyline', favorite: false },
                { id: 5, src: 'https://picsum.photos/id/91/800/600', category: 'city', title: 'Urban Architecture', caption: 'Modern glass buildings', favorite: false },
                { id: 6, src: 'https://picsum.photos/id/21/800/600', category: 'city', title: 'Waterfront', caption: 'City by the river', favorite: false },
                { id: 7, src: 'https://picsum.photos/id/107/800/600', category: 'animals', title: 'Wild Grass', caption: 'Golden grass in sunlight', favorite: false },
                { id: 8, src: 'https://picsum.photos/id/130/800/600', category: 'animals', title: 'Meadow', caption: 'Beautiful field of flowers', favorite: false },
                { id: 9, src: 'https://picsum.photos/id/42/800/600', category: 'abstract', title: 'Piano Keys', caption: 'Abstract musical composition', favorite: false },
                { id: 10, src: 'https://picsum.photos/id/0/800/600', category: 'abstract', title: 'Laptop & Coffee', caption: 'Workspace aesthetic', favorite: false }
            ],
            nature: [
                { id: 101, src: 'https://picsum.photos/id/1015/800/600', category: 'nature', title: 'River Valley', caption: 'Dramatic river canyon', favorite: false },
                { id: 102, src: 'https://picsum.photos/id/1016/800/600', category: 'nature', title: 'Rocky Mountain', caption: 'Majestic mountain peak', favorite: false },
                { id: 103, src: 'https://picsum.photos/id/1036/800/600', category: 'nature', title: 'Autumn Forest', caption: 'Golden autumn leaves', favorite: false }
            ],
            city: [
                { id: 201, src: 'https://picsum.photos/id/100/800/600', category: 'city', title: 'Beach Pier', caption: 'Wooden pier on tropical beach', favorite: false },
                { id: 202, src: 'https://picsum.photos/id/101/800/600', category: 'city', title: 'Old Architecture', caption: 'Historic European building', favorite: false },
                { id: 203, src: 'https://picsum.photos/id/164/800/600', category: 'city', title: 'Bridge Walk', caption: 'Pedestrian bridge', favorite: false }
            ],
            travel: [
                { id: 301, src: 'https://picsum.photos/id/103/800/600', category: 'travel', title: 'Desert Dunes', caption: 'Endless sand dunes', favorite: false },
                { id: 302, src: 'https://picsum.photos/id/163/800/600', category: 'travel', title: 'Coastal Road', caption: 'Scenic road by coastline', favorite: false },
                { id: 303, src: 'https://picsum.photos/id/188/800/600', category: 'travel', title: 'Lakeside Cabin', caption: 'Peaceful cabin by lake', favorite: false }
            ],
            personal: [
                { id: 401, src: 'https://picsum.photos/id/237/800/600', category: 'personal', title: 'Black Puppy', caption: 'Cute labrador portrait', favorite: false },
                { id: 402, src: 'https://picsum.photos/id/250/800/600', category: 'personal', title: 'Camera Lens', caption: 'Vintage camera close-up', favorite: false }
            ]
        };

        this.currentAlbum = 'default';
        this.viewMode = 'grid';
        this.showFavoritesOnly = false;
        this.searchQuery = '';
        this.lightboxIndex = 0;
        this.filteredImages = [];
        this.slideshowTimer = null;
        this.isSlideshow = false;
        this.nextId = 1000;

        this.init();
    }

    init() {
        this.bindEvents();
        this.showAlbumsScreen();
    }

    showAlbumsScreen() {
        const albumsScreen = document.getElementById('albumsScreen');
        const galleryScreen = document.getElementById('galleryScreen');
        if (albumsScreen) albumsScreen.style.display = 'block';
        if (galleryScreen) galleryScreen.style.display = 'none';
        this.renderAlbums();
    }

    showGalleryScreen(albumKey) {
        this.currentAlbum = albumKey;
        const albumsScreen = document.getElementById('albumsScreen');
        const galleryScreen = document.getElementById('galleryScreen');
        if (albumsScreen) albumsScreen.style.display = 'none';
        if (galleryScreen) galleryScreen.style.display = 'block';

        const title = albumKey.charAt(0).toUpperCase() + albumKey.slice(1);
        const galleryTitle = document.getElementById('galleryTitle');
        if (galleryTitle) galleryTitle.innerHTML = `<i class="fas fa-folder"></i> ${title}`;

        const albumSelect = document.getElementById('albumSelect');
        if (albumSelect) albumSelect.value = albumKey;

        // Reset filters
        this.searchQuery = '';
        this.showFavoritesOnly = false;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        const favBtn = document.getElementById('favFilterBtn');
        if (favBtn) { favBtn.classList.remove('active'); favBtn.innerHTML = '<i class="far fa-heart"></i>'; }

        this.renderGallery();
        this.updateStats();
    }

    renderAlbums() {
        const grid = document.getElementById('albumsGrid');
        if (!grid) return;

        const albums = Object.keys(this.albums);
        grid.innerHTML = albums.map(key => {
            const images = this.albums[key] || [];
            const count = images.length;
            const thumb = count > 0 ? images[0].src : null;
            const title = key.charAt(0).toUpperCase() + key.slice(1);

            return `
                <div class="album-card" data-album="${key}">
                    <div class="album-thumb">
                        ${thumb ? `<img src="${thumb}" alt="${title}" loading="lazy">` : '<i class="fas fa-images album-icon"></i>'}
                        <span class="album-count">${count} photo${count !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="album-info">
                        <h3>${title}</h3>
                        <p>${count > 0 ? images[0].title + (count > 1 ? ' + more' : '') : 'Empty album'}</p>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.album-card').forEach(card => {
            card.addEventListener('click', () => this.showGalleryScreen(card.dataset.album));
        });
    }

    bindEvents() {
        const backToAlbums = document.getElementById('backToAlbums');
        if (backToAlbums) backToAlbums.addEventListener('click', () => this.showAlbumsScreen());

        const albumSelect = document.getElementById('albumSelect');
        if (albumSelect) {
            albumSelect.addEventListener('change', (e) => {
                this.currentAlbum = e.target.value;
                this.renderGallery();
                this.updateStats();
            });
        }

        // Create album button on main albums page
        const createAlbumBtn = document.getElementById('createAlbumBtn');
        if (createAlbumBtn) {
            createAlbumBtn.addEventListener('click', () => this.openCreateAlbumModal());
        }

        // Plus button in gallery toolbar
        const newAlbumBtn = document.getElementById('newAlbumBtn');
        if (newAlbumBtn) {
            newAlbumBtn.addEventListener('click', () => this.openCreateAlbumModal());
        }

        const albumCreate = document.getElementById('albumCreate');
        const albumCancel = document.getElementById('albumCancel');
        if (albumCreate) albumCreate.addEventListener('click', () => this.createAlbum());
        if (albumCancel) albumCancel.addEventListener('click', () => this.closeModal('albumModal'));

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderGallery();
            });
        }

        const gridViewBtn = document.getElementById('gridViewBtn');
        const listViewBtn = document.getElementById('listViewBtn');
        if (gridViewBtn) gridViewBtn.addEventListener('click', () => this.setViewMode('grid'));
        if (listViewBtn) listViewBtn.addEventListener('click', () => this.setViewMode('list'));

        const favFilterBtn = document.getElementById('favFilterBtn');
        if (favFilterBtn) {
            favFilterBtn.addEventListener('click', () => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                favFilterBtn.classList.toggle('active', this.showFavoritesOnly);
                favFilterBtn.innerHTML = this.showFavoritesOnly ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
                this.renderGallery();
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportData());

        const importBtn = document.getElementById('importBtn');
        const importFile = document.getElementById('importFile');
        if (importBtn) importBtn.addEventListener('click', () => { if (importFile) importFile.click(); });
        if (importFile) importFile.addEventListener('change', (e) => this.importData(e));

        // Upload
        const uploadInput = document.getElementById('uploadInput');
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });
        }

        const uploadBox = document.querySelector('.upload-box');
        if (uploadBox) {
            uploadBox.addEventListener('dragover', (e) => { e.preventDefault(); uploadBox.classList.add('dragover'); });
            uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
            uploadBox.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadBox.classList.remove('dragover');
                this.handleFiles(e.dataTransfer.files);
            });
        }

        // Lightbox
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        if (lightboxClose) lightboxClose.addEventListener('click', () => this.closeLightbox());
        if (lightboxPrev) lightboxPrev.addEventListener('click', () => this.prevImage());
        if (lightboxNext) lightboxNext.addEventListener('click', () => this.nextImage());

        const lbFav = document.getElementById('lbFavBtn');
        const lbSlide = document.getElementById('lbSlideshowBtn');
        const lbEdit = document.getElementById('lbEditBtn');
        const lbDel = document.getElementById('lbDeleteBtn');
        if (lbFav) lbFav.addEventListener('click', () => this.toggleLightboxFavorite());
        if (lbSlide) lbSlide.addEventListener('click', () => this.toggleSlideshow());
        if (lbEdit) lbEdit.addEventListener('click', () => this.openEditModal());
        if (lbDel) lbDel.addEventListener('click', () => this.deleteCurrentImage());

        const editSave = document.getElementById('editSave');
        const editCancel = document.getElementById('editCancel');
        if (editSave) editSave.addEventListener('click', () => this.saveEdit());
        if (editCancel) editCancel.addEventListener('click', () => this.closeModal('editModal'));

        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox || !lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
    }

    openCreateAlbumModal() {
        this.openModal('albumModal');
        const input = document.getElementById('newAlbumName');
        if (input) { input.value = ''; input.focus(); }
    }

    getFilteredImages() {
        const album = this.albums[this.currentAlbum];
        if (!album) return [];
        let images = [...album];

        if (this.showFavoritesOnly) images = images.filter(img => img.favorite);
        if (this.searchQuery) {
            images = images.filter(img =>
                (img.title && img.title.toLowerCase().includes(this.searchQuery)) ||
                (img.caption && img.caption.toLowerCase().includes(this.searchQuery))
            );
        }
        return images;
    }

    renderGallery() {
        const grid = document.getElementById('galleryGrid');
        const empty = document.getElementById('emptyState');
        if (!grid) return;

        const images = this.getFilteredImages();
        this.filteredImages = images;

        if (images.length === 0) {
            grid.style.display = 'none';
            if (empty) empty.style.display = 'block';
            this.updateStats();
            return;
        }

        grid.style.display = this.viewMode === 'grid' ? 'grid' : 'flex';
        grid.className = this.viewMode === 'grid' ? 'gallery-grid' : 'gallery-list';
        if (empty) empty.style.display = 'none';

        grid.innerHTML = images.map((img, idx) => {
            if (this.viewMode === 'grid') {
                return this.gridItemHTML(img, idx);
            } else {
                return this.listItemHTML(img, idx);
            }
        }).join('');

        this.attachItemEvents();
        this.updateStats();
    }

    gridItemHTML(img, idx) {
        return `
            <div class="gallery-item" data-id="${img.id}" data-index="${idx}">
                <img src="${img.src}" alt="${img.title}" loading="lazy">
                <button class="fav-btn ${img.favorite ? 'active' : ''}" data-id="${img.id}">
                    <i class="${img.favorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <div class="overlay">
                    <h3><i class="fas fa-image"></i> ${img.title}</h3>
                    <p><i class="fas fa-tag"></i> ${img.category}</p>
                </div>
            </div>
        `;
    }

    listItemHTML(img, idx) {
        return `
            <div class="list-item" data-id="${img.id}" data-index="${idx}">
                <img src="${img.src}" alt="${img.title}" loading="lazy">
                <div class="list-info">
                    <h3>${img.title}</h3>
                    <p>${img.caption}</p>
                    <div class="list-meta">
                        <span><i class="fas fa-tag"></i> ${img.category}</span>
                        <span><i class="fas fa-folder"></i> ${this.currentAlbum}</span>
                    </div>
                </div>
                <div class="list-fav ${img.favorite ? 'active' : ''}" data-id="${img.id}">
                    <i class="${img.favorite ? 'fas' : 'far'} fa-heart"></i>
                </div>
            </div>
        `;
    }

    attachItemEvents() {
        document.querySelectorAll('.gallery-item, .list-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.fav-btn') || e.target.closest('.list-fav')) return;
                const idx = parseInt(item.dataset.index);
                this.openLightbox(idx);
            });
        });

        document.querySelectorAll('.fav-btn, .list-fav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.toggleFavorite(id);
            });
        });
    }

    setViewMode(mode) {
        this.viewMode = mode;
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        if (gridBtn) gridBtn.classList.toggle('active', mode === 'grid');
        if (listBtn) listBtn.classList.toggle('active', mode === 'list');
        this.renderGallery();
    }

    toggleFavorite(id) {
        const album = this.albums[this.currentAlbum];
        if (!album) return;
        const img = album.find(i => i.id === id);
        if (img) {
            img.favorite = !img.favorite;
            this.renderGallery();
            this.updateLightboxFavButton();
        }
    }

    toggleLightboxFavorite() {
        const img = this.filteredImages[this.lightboxIndex];
        if (img) this.toggleFavorite(img.id);
    }

    updateLightboxFavButton() {
        const img = this.filteredImages[this.lightboxIndex];
        const btn = document.getElementById('lbFavBtn');
        if (!btn) return;
        if (img && img.favorite) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    }

    openLightbox(index) {
        this.lightboxIndex = index;
        this.isSlideshow = false;
        this.stopSlideshow();
        this.updateLightboxContent();
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.classList.add('active');
        this.updateLightboxFavButton();
    }

    closeLightbox() {
        this.stopSlideshow();
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.classList.remove('active');
    }

    prevImage() {
        if (this.filteredImages.length === 0) return;
        this.lightboxIndex = (this.lightboxIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightboxContent();
        this.updateLightboxFavButton();
    }

    nextImage() {
        if (this.filteredImages.length === 0) return;
        this.lightboxIndex = (this.lightboxIndex + 1) % this.filteredImages.length;
        this.updateLightboxContent();
        this.updateLightboxFavButton();
    }

    updateLightboxContent() {
        const img = this.filteredImages[this.lightboxIndex];
        if (!img) return;
        const imgEl = document.getElementById('lightboxImg');
        const lbTitle = document.getElementById('lbTitle');
        const lbCaption = document.getElementById('lbCaption');
        const lbCategory = document.getElementById('lbCategory');
        if (imgEl) { imgEl.src = img.src; imgEl.alt = img.title; }
        if (lbTitle) lbTitle.textContent = img.title;
        if (lbCaption) lbCaption.textContent = img.caption || '';
        if (lbCategory) lbCategory.innerHTML = `<i class="fas fa-tag"></i> ${img.category}`;
    }

    toggleSlideshow() {
        const btn = document.getElementById('lbSlideshowBtn');
        if (this.isSlideshow) {
            this.stopSlideshow();
        } else {
            this.isSlideshow = true;
            if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
            this.slideshowTimer = setInterval(() => this.nextImage(), 3000);
        }
    }

    stopSlideshow() {
        this.isSlideshow = false;
        if (this.slideshowTimer) { clearInterval(this.slideshowTimer); this.slideshowTimer = null; }
        const btn = document.getElementById('lbSlideshowBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
    }

    openEditModal() {
        const img = this.filteredImages[this.lightboxIndex];
        if (!img) return;
        const editTitle = document.getElementById('editTitle');
        const editCaption = document.getElementById('editCaption');
        const editCategory = document.getElementById('editCategory');
        if (editTitle) editTitle.value = img.title;
        if (editCaption) editCaption.value = img.caption || '';
        if (editCategory) editCategory.value = img.category;
        this.openModal('editModal');
    }

    saveEdit() {
        const img = this.filteredImages[this.lightboxIndex];
        if (!img) return;
        const editTitle = document.getElementById('editTitle');
        const editCaption = document.getElementById('editCaption');
        const editCategory = document.getElementById('editCategory');
        if (editTitle) img.title = editTitle.value.trim() || img.title;
        if (editCaption) img.caption = editCaption.value.trim();
        if (editCategory) img.category = editCategory.value;
        this.closeModal('editModal');
        this.renderGallery();
        this.updateLightboxContent();
    }

    deleteCurrentImage() {
        const img = this.filteredImages[this.lightboxIndex];
        if (!img) return;
        if (!confirm(`Delete "${img.title}"?`)) return;

        const album = this.albums[this.currentAlbum];
        const idx = album.findIndex(i => i.id === img.id);
        if (idx !== -1) album.splice(idx, 1);

        this.closeLightbox();
        this.renderGallery();
    }

    handleFiles(fileList) {
        if (!fileList || fileList.length === 0) return;

        const uploadBox = document.querySelector('.upload-box');
        if (uploadBox) uploadBox.style.opacity = '0.6';

        let uploadedCount = 0;
        const imageFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
        const totalImages = imageFiles.length;
        if (totalImages === 0) {
            if (uploadBox) uploadBox.style.opacity = '1';
            return;
        }

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                const newImage = {
                    id: this.nextId++,
                    src: base64,
                    category: 'other',
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    caption: 'Uploaded image',
                    favorite: false
                };

                const album = this.albums[this.currentAlbum];
                if (album) album.push(newImage);

                uploadedCount++;
                this.renderGallery();

                if (uploadedCount === totalImages) {
                    if (uploadBox) uploadBox.style.opacity = '1';
                    alert(`Successfully uploaded ${uploadedCount} image(s) to "${this.currentAlbum}" album!`);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset input
        const uploadInput = document.getElementById('uploadInput');
        if (uploadInput) uploadInput.value = '';
    }

    createAlbum() {
        const input = document.getElementById('newAlbumName');
        if (!input) return;
        const name = input.value.trim();
        if (!name) { alert('Please enter an album name'); return; }

        const key = name.toLowerCase().replace(/\s+/g, '_');
        if (this.albums[key]) { alert('An album with this name already exists'); return; }

        this.albums[key] = [];

        const select = document.getElementById('albumSelect');
        if (select) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = name;
            select.appendChild(option);
            select.value = key;
        }

        this.currentAlbum = key;
        this.closeModal('albumModal');
        this.showGalleryScreen(key);
    }

    exportData() {
        const dataStr = JSON.stringify(this.albums, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gallery_export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (typeof data !== 'object' || data === null) throw new Error('Invalid format');
                this.albums = data;

                const select = document.getElementById('albumSelect');
                if (select) {
                    select.innerHTML = '';
                    Object.keys(this.albums).forEach(key => {
                        const option = document.createElement('option');
                        option.value = key;
                        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                        select.appendChild(option);
                    });
                }

                this.currentAlbum = Object.keys(this.albums)[0] || 'default';
                if (select) select.value = this.currentAlbum;
                this.renderGallery();
                this.updateStats();
                alert('Gallery imported successfully!');
            } catch (err) {
                alert('Failed to import file. Make sure it is a valid gallery JSON.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    updateStats() {
        const album = this.albums[this.currentAlbum];
        const visible = this.getFilteredImages().length;
        const total = album ? album.length : 0;
        const statsText = document.getElementById('statsText');
        const albumStats = document.getElementById('albumStats');
        if (statsText) statsText.innerHTML = `<i class="fas fa-images"></i> ${visible} / ${total} image${total !== 1 ? 's' : ''}`;
        if (albumStats) albumStats.innerHTML = `<i class="fas fa-folder"></i> Album: ${this.currentAlbum.charAt(0).toUpperCase() + this.currentAlbum.slice(1)}`;
    }

    openModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    }
}

new ImageGallery();

