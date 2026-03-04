

let materials=[];
let allMaterials = [];
let currentPage=1;
const itemsPerPage=4;
let currentCategory="all";
let currentSubCategory = "all";

// ================= LOAD DATA =================
function loadMaterialsFromAPI(){

showLoader();

fetch(API+"?type=getData")
.then(res=>res.json())
.then(data=>{

allMaterials = data.map(item => {

let categoryPath=item.categoryPath||"";
let parts=categoryPath.split(">");

let mainCategory=parts[0]?parts[0].toLowerCase().trim():"other";

if(mainCategory.includes("floor")) mainCategory="flooring";
if(mainCategory.includes("wall")) mainCategory="wall-finishes";
if(mainCategory.includes("light")) mainCategory="lighting";
if(mainCategory.includes("fixture")) mainCategory="fixtures";
if(mainCategory.includes("furniture")) mainCategory="furniture";
if(mainCategory.includes("decor")) mainCategory="decor";

let subCategory=parts.length>1?parts[parts.length-1]:"";

let img=item.image||"";
let fileId="";

if(img.includes("/d/")){
fileId=img.split("/d/")[1].split("/")[0];
}

if(fileId){
img="https://lh3.googleusercontent.com/d/"+fileId+"=s1000";
}

return{
id:item.id,
name:item.title,
category:mainCategory,
subCategory:subCategory,
price:item.price||0,
unit:item.unit||"",
image:img,
description:mainCategory
};

});

// show all initially
materials=[...allMaterials];
renderSubCategories();
renderMaterials();
renderPagination();

hideLoader();

})
.catch(err=>{
console.log("API error:",err);
hideLoader();
});
}

// ================= RENDER =================
function renderMaterials(){

const grid=document.getElementById("materialsGrid");
if(!grid) return;

let start=(currentPage-1)*itemsPerPage;
let end=start+itemsPerPage;
let paginatedItems=materials.slice(start,end);

grid.innerHTML=paginatedItems.map(material=>`
<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="material-card">
                <div class="material-image">
                    <img src="${material.image}" alt="${material.name}" loading="lazy">
                    <div class="material-overlay"></div>
                    <span class="material-category-badge">
${material.subCategory && material.subCategory.trim() !== "" 
    ? material.subCategory 
    : material.category}
</span>
                </div>
                <div class="material-body">
                    <h3 class="material-name">${material.name}</h3>
                    <p class="material-description">${material.description}</p>
                    <div class="material-price-row">
                        <div>
                            <span class="material-price">Rs ${material.price}</span>
                            <span class="material-unit">${material.unit}</span>
                        </div>
                    </div>
                   <!-- <button class="material-btn" onclick="viewMaterialDetails(${material.id})">
                        <i class="fas fa-eye me-2"></i>View Details
                    </button> -->
                </div>
            </div>
        </div>
`).join("");

}

// ================= PAGINATION =================
function renderPagination(){

let totalPages=Math.ceil(materials.length/itemsPerPage);
let pagination=document.getElementById("pagination");

let html="";

for(let i=1;i<=totalPages;i++){
html+=`
<li class="page-item ${i===currentPage?'active':''}">
<a class="page-link cust-pagination" href="javascript:void(0)" onclick="changePage(${i})">${i}</a>
</li>
`;
}

pagination.innerHTML=html;
}

function changePage(page){
currentPage=page;
renderMaterials();
renderPagination(); 
window.scrollTo({top:document.getElementById("materialsGrid").offsetTop-100,behavior:"smooth"});
}

// ================= SEARCH =================
document.getElementById("searchInput")?.addEventListener("input", function(){

let q = this.value.toLowerCase().trim();
const grid = document.getElementById("materialsGrid");
const noResults = document.getElementById("noResults");

// if search empty → show all
if(q === ""){
    materials = [...allMaterials];
} else {

    materials = allMaterials.filter(item =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.price && item.price.toString().includes(q))
    );
}

// ⭐ If nothing found
if(materials.length === 0){
    grid.innerHTML = '';
    noResults.style.display = 'block';
    document.getElementById("pagination").innerHTML = '';
    return;
} else {
    noResults.style.display = 'none';
}

currentPage = 1;
renderMaterials();
renderPagination();

});

// ================= Category =================
document.addEventListener("click",function(e){

if(e.target.closest(".category-btn")){

let btn=e.target.closest(".category-btn");

document.querySelectorAll(".category-btn")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

let cat=btn.dataset.category;
currentCategory=cat;
currentSubCategory="all";

const grid = document.getElementById("materialsGrid");
const noResults = document.getElementById("noResults");

// filter category
if(cat==="all"){
materials=[...allMaterials];
}else{
materials=allMaterials.filter(m=>m.category===cat);
}

// no results
if(materials.length===0){
grid.innerHTML="";
noResults.style.display="block";
document.getElementById("pagination").innerHTML="";
renderSubCategories();
return;
}else{
noResults.style.display="none";
}

currentPage=1;
renderMaterials();
renderPagination();
renderSubCategories();   // ⭐ important

}
});

function renderSubCategories(){

const subCategoryFilter = document.getElementById('subCategoryFilter');
if(!subCategoryFilter) return;

// hide if all category
if(currentCategory === "all"){
subCategoryFilter.style.display = "none";
return;
}

// get subcategories from real data
let subs = new Set();

allMaterials.forEach(item=>{
if(item.category === currentCategory && item.subCategory){
subs.add(item.subCategory);
}
});

let subArr = [...subs];

if(subArr.length === 0){
subCategoryFilter.style.display="none";
return;
}

subCategoryFilter.style.display="block";

// create buttons
let html = `
<button class="sub-category-btn ${currentSubCategory==='all'?'active':''}"
onclick="filterBySubCategory('all')">
All
</button>
`;

subArr.forEach(sub=>{
html += `
<button class="sub-category-btn ${currentSubCategory===sub?'active':''}"
onclick="filterBySubCategory('${sub}')">
${sub}
</button>
`;
});

subCategoryFilter.innerHTML = html;
}

function filterBySubCategory(sub){

currentSubCategory = sub;

const grid = document.getElementById("materialsGrid");
const noResults = document.getElementById("noResults");

// filter logic
if(sub === "all"){
materials = allMaterials.filter(m => m.category === currentCategory);
}else{
materials = allMaterials.filter(m =>
m.category === currentCategory &&
m.subCategory === sub
);
}

// no result check
if(materials.length === 0){
grid.innerHTML="";
noResults.style.display="block";
document.getElementById("pagination").innerHTML="";
return;
}else{
noResults.style.display="none";
}

currentPage = 1;
renderMaterials();
renderPagination();
renderSubCategories();
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


// ================= LOADER =================
function showLoader(){
document.getElementById("preloader").style.display="flex";
}

function hideLoader(){
document.getElementById("preloader").style.display="none";
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded",function(){
loadMaterialsFromAPI();
setupBackToTop();
setupScrollEffects();
setupNavbar();
});

