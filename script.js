// ===================================
// DATA STRUCTURE
// ===================================

const categories = {
    flooring: {
        name: 'Flooring',
        subCategories: ['Hardwood', 'Marble', 'Tiles', 'Vinyl', 'Laminate']
    },
    'wall-finishes': {
        name: 'Wall Finishes',
        subCategories: ['Paint', 'Wallpaper', 'Panels', 'Stone Cladding', 'Texture']
    },
    lighting: {
        name: 'Lighting',
        subCategories: ['Chandeliers', 'Pendant Lights', 'Recessed Lighting', 'Wall Sconces', 'Floor Lamps']
    },
    fixtures: {
        name: 'Fixtures',
        subCategories: ['Faucets', 'Door Handles', 'Bathroom Fixtures', 'Kitchen Fixtures', 'Hardware']
    },
    furniture: {
        name: 'Furniture',
        subCategories: ['Living Room', 'Bedroom', 'Office', 'Outdoor', 'Dining']
    },
    decor: {
        name: 'Decor',
        subCategories: ['Artwork', 'Mirrors', 'Plants', 'Accessories', 'Sculptures']
    }
};

const materials = [
    // Flooring - Hardwood
    { id: 1, name: 'Oak Hardwood Premium', category: 'flooring', subCategory: 'Hardwood', price: 85, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800', description: 'Premium oak hardwood with natural grain pattern' },
    { id: 2, name: 'Walnut Engineered Wood', category: 'flooring', subCategory: 'Hardwood', price: 95, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1534939268631-4d7457e8d0d4?w=800', description: 'Rich walnut finish engineered hardwood flooring' },
    
    // Flooring - Marble
    { id: 3, name: 'Carrara Marble', category: 'flooring', subCategory: 'Marble', price: 120, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800', description: 'Classic white Carrara marble with grey veining' },
    { id: 4, name: 'Emperador Dark Marble', category: 'flooring', subCategory: 'Marble', price: 145, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800', description: 'Luxurious dark emperador marble with brown tones' },
    
    // Flooring - Tiles
    { id: 5, name: 'Porcelain Tiles Modern', category: 'flooring', subCategory: 'Tiles', price: 45, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800', description: 'Contemporary porcelain tiles with matte finish' },
    { id: 6, name: 'Terrazzo Pattern Tiles', category: 'flooring', subCategory: 'Tiles', price: 65, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1615876237200-e5f7d29fa0c8?w=800', description: 'Stylish terrazzo pattern floor tiles' },
    
    // Wall Finishes - Paint
    { id: 7, name: 'Velvet Matte Finish Paint', category: 'wall-finishes', subCategory: 'Paint', price: 65, unit: 'gallon', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800', description: 'Premium velvet matte finish interior paint' },
    { id: 8, name: 'Textured Wall Paint', category: 'wall-finishes', subCategory: 'Paint', price: 75, unit: 'gallon', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800', description: 'Dimensional textured wall paint finish' },
    
    // Wall Finishes - Wallpaper
    { id: 9, name: 'Geometric Pattern Wallpaper', category: 'wall-finishes', subCategory: 'Wallpaper', price: 85, unit: 'roll', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', description: 'Modern geometric design premium wallpaper' },
    { id: 10, name: 'Luxury Silk Wallpaper', category: 'wall-finishes', subCategory: 'Wallpaper', price: 125, unit: 'roll', image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800', description: 'Premium silk texture elegant wallpaper' },
    
    // Lighting - Chandeliers
    { id: 11, name: 'Crystal Chandelier', category: 'lighting', subCategory: 'Chandeliers', price: 1850, unit: 'piece', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800', description: 'Elegant crystal chandelier with LED lighting' },
    { id: 12, name: 'Modern Linear Chandelier', category: 'lighting', subCategory: 'Chandeliers', price: 1250, unit: 'piece', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', description: 'Contemporary linear design chandelier' },
    
    // Lighting - Pendant
    { id: 13, name: 'Industrial Pendant Light', category: 'lighting', subCategory: 'Pendant Lights', price: 285, unit: 'piece', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800', description: 'Industrial style metal pendant light' },
    { id: 14, name: 'Globe Pendant Light', category: 'lighting', subCategory: 'Pendant Lights', price: 195, unit: 'piece', image: 'https://images.unsplash.com/photo-1567225591450-4d385a5e5c0e?w=800', description: 'Minimalist globe shaped pendant light' },
    
    // Fixtures - Faucets
    { id: 15, name: 'Brushed Gold Faucet', category: 'fixtures', subCategory: 'Faucets', price: 425, unit: 'piece', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800', description: 'Luxury brushed gold finish faucet' },
    { id: 16, name: 'Matte Black Faucet', category: 'fixtures', subCategory: 'Faucets', price: 385, unit: 'piece', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', description: 'Modern matte black designer faucet' },
    
    // Furniture - Living Room
    { id: 17, name: 'Luxury Velvet Sofa', category: 'furniture', subCategory: 'Living Room', price: 2850, unit: 'piece', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', description: 'Premium velvet upholstered 3-seater sofa' },
    { id: 18, name: 'Marble Coffee Table', category: 'furniture', subCategory: 'Living Room', price: 1450, unit: 'piece', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800', description: 'Elegant marble top coffee table with gold base' },
    
    // Decor - Mirrors
    { id: 19, name: 'Gold Frame Wall Mirror', category: 'decor', subCategory: 'Mirrors', price: 485, unit: 'piece', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800', description: 'Ornate gold frame decorative wall mirror' },
    { id: 20, name: 'Modern Round Mirror', category: 'decor', subCategory: 'Mirrors', price: 325, unit: 'piece', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800', description: 'Contemporary round wall mirror with metal frame' },
    
    // Decor - Artwork
    { id: 21, name: 'Abstract Canvas Art', category: 'decor', subCategory: 'Artwork', price: 650, unit: 'piece', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', description: 'Large abstract canvas artwork 48x36 inches' },
    { id: 22, name: 'Minimalist Line Art', category: 'decor', subCategory: 'Artwork', price: 385, unit: 'piece', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', description: 'Modern minimalist line art print set' },
    
    // Additional items for variety
    { id: 23, name: 'Herringbone Oak Flooring', category: 'flooring', subCategory: 'Hardwood', price: 105, unit: 'sq ft', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', description: 'Classic herringbone pattern oak flooring' },
    { id: 24, name: 'Crystal Wall Sconce', category: 'lighting', subCategory: 'Wall Sconces', price: 325, unit: 'piece', image: 'https://images.unsplash.com/photo-1534955157-a6c05d0c4bdf?w=800', description: 'Elegant crystal wall sconce with LED' },
];

// ===================================
// STATE MANAGEMENT
// ===================================

let currentCategory = 'all';
let currentSubCategory = 'all';
let searchQuery = '';

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize materials grid
    renderMaterials();
    
    // Event Listeners
    setupCategoryFilters();
    setupSearch();
    setupScrollEffects();
    setupBackToTop();
    setupNavbar();
});

// ===================================
// RENDER FUNCTIONS
// ===================================

function renderMaterials() {
    const grid = document.getElementById('materialsGrid');
    const noResults = document.getElementById('noResults');
    
    const filteredMaterials = materials.filter(material => {
        const matchesCategory = currentCategory === 'all' || material.category === currentCategory;
        const matchesSubCategory = currentSubCategory === 'all' || material.subCategory === currentSubCategory;
        const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             material.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSubCategory && matchesSearch;
    });
    
    if (filteredMaterials.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    grid.innerHTML = filteredMaterials.map(material => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="material-card">
                <div class="material-image">
                    <img src="${material.image}" alt="${material.name}" loading="lazy">
                    <div class="material-overlay"></div>
                    <span class="material-category-badge">${material.subCategory}</span>
                </div>
                <div class="material-body">
                    <h3 class="material-name">${material.name}</h3>
                    <p class="material-description">${material.description}</p>
                    <div class="material-price-row">
                        <div>
                            <span class="material-price">$${material.price}</span>
                            <span class="material-unit">/${material.unit}</span>
                        </div>
                    </div>
                    <button class="material-btn" onclick="viewMaterialDetails(${material.id})">
                        <i class="fas fa-eye me-2"></i>View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSubCategories() {
    const subCategoryFilter = document.getElementById('subCategoryFilter');
    
    if (currentCategory === 'all') {
        subCategoryFilter.style.display = 'none';
        return;
    }
    
    const categoryData = categories[currentCategory];
    if (!categoryData) return;
    
    subCategoryFilter.style.display = 'block';
    subCategoryFilter.innerHTML = `
        <button class="sub-category-btn ${currentSubCategory === 'all' ? 'active' : ''}" 
                onclick="filterBySubCategory('all')">
            All ${categoryData.name}
        </button>
        ${categoryData.subCategories.map(subCat => `
            <button class="sub-category-btn ${currentSubCategory === subCat ? 'active' : ''}" 
                    onclick="filterBySubCategory('${subCat}')">
                ${subCat}
            </button>
        `).join('')}
    `;
}

// ===================================
// FILTER FUNCTIONS
// ===================================

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterByCategory(category) {
    currentCategory = category;
    currentSubCategory = 'all';
    renderSubCategories();
    renderMaterials();
}

function filterBySubCategory(subCategory) {
    currentSubCategory = subCategory;
    renderMaterials();
    
    // Update sub-category button states
    const subCategoryBtns = document.querySelectorAll('.sub-category-btn');
    subCategoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// ===================================
// SEARCH FUNCTION
// ===================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value;
        renderMaterials();
    });
}

// ===================================
// SCROLL EFFECTS
// ===================================

function setupScrollEffects() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===================================
// NAVBAR EFFECTS
// ===================================

function setupNavbar() {
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// MATERIAL DETAILS
// ===================================

function viewMaterialDetails(materialId) {
    const material = materials.find(m => m.id === materialId);
    if (material) {
        alert(`Material Details:\n\nName: ${material.name}\nCategory: ${material.subCategory}\nPrice: $${material.price}/${material.unit}\n\nDescription: ${material.description}\n\n(In a real application, this would open a detailed modal or page)`);
    }
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
