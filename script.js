

let materials=[];
let allMaterials = [];
let currentPage=1;
const itemsPerPage=4;
let currentCategory="all";

// ================= LOAD DATA =================
function loadMaterialsFromAPI(){

showLoader();

fetch(API+"?type=getData")
.then(res=>res.json())
.then(data=>{

materials=data.map(item=>{

let categoryPath=item.categoryPath||"";
let parts=categoryPath.split(">");

let mainCategory=parts[0]?parts[0].toLowerCase().trim():"other";

if(mainCategory.includes("floor")) mainCategory="flooring";
if(mainCategory.includes("wall")) mainCategory="wall-finishes";
if(mainCategory.includes("light")) mainCategory="lighting";
if(mainCategory.includes("fixture")) mainCategory="fixtures";
if(mainCategory.includes("furniture")) mainCategory="furniture";
if(mainCategory.includes("decor")) mainCategory="decor";

let subCategory=parts.length>1?parts[parts.length-1]:mainCategory;


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
allMaterials = [...materials];
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
                    <span class="material-category-badge">${material.subCategory}</span>
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
document.getElementById("searchInput")?.addEventListener("input",function(){

let q = this.value.toLowerCase().trim();

// if search empty → show all
if(q === ""){
    materials = [...allMaterials];   // restore original
}else{

    materials = allMaterials.filter(item =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.price && item.price.toString().includes(q))
    );

}

currentPage = 1;
renderMaterials();
renderPagination();

});

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
});