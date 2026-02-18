let allItems = [];

// 🔐 LOGIN
function login(){

let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

fetch(API+"?type=login&email="+email+"&pass="+pass)
.then(res=>res.text())
.then(data=>{
if(data=="success"){
window.location="dashboard.html";
}else{
alert("Wrong login");
}
});

}

// 🖼 UPLOAD IMAGE + SAVE
// document.getElementById("uploadBtn").onclick = uploadItem;

function uploadItem(){

let title=document.getElementById("title").value;
let price=document.getElementById("price").value;
let existing=document.getElementById("categorySelect").value;
let newCat=document.getElementById("newCategory").value;
let file=document.getElementById("imageInput").files[0];

let categoryPath = newCat ? newCat : existing;

if(!title || !categoryPath || !file){
alert("Fill all fields");
return;
}

let reader=new FileReader();

reader.onload=function(){

let base64=reader.result.split(",")[1];

let fd=new FormData();
fd.append("type","upload");
fd.append("file",base64);
fd.append("mime",file.type);
fd.append("filename",file.name);

fetch(API,{
method:"POST",
body:fd
})
.then(res=>res.text())
.then(imgUrl=>{

// save to sheet
fetch(API+"?type=add"
+"&title="+encodeURIComponent(title)
+"&categoryPath="+encodeURIComponent(categoryPath)
+"&image="+encodeURIComponent(imgUrl)
+"&price="+encodeURIComponent(price)
+"&token="+TOKEN)
.then(res=>res.text())
.then(()=>{
alert("Uploaded");
loadItems();
});

});

};

reader.readAsDataURL(file);
}



// 📦 LOAD ITEMS FOR USER
function loadItems(){

fetch(API+"?type=getData")
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(item=>{
html+=`
<div>
<h3>${item.title}</h3>
<img src="${item.image}" width="200">
${item.categoryPath}<br>
<p>Rs ${item.price}</p>
<hr>
</div>
`;
});

document.getElementById("gallery").innerHTML=html;

});

}

function loadCategories(){

fetch(API+"?type=getCategories")
.then(res=>res.json())
.then(data=>{

let sel=document.getElementById("categorySelect");
sel.innerHTML="<option value=''>Select category</option>";

data.forEach(cat=>{
let opt=document.createElement("option");
opt.value=cat;
opt.textContent=cat;
sel.appendChild(opt);
});

});
}

loadCategories();

function loadItemsAdmin(){
fetch(API+"?type=getData")
.then(res=>res.json())
.then(data=>{

allItems = data; 
let html="";

data.reverse().forEach(item=>{

html+=`
<div class="col-6 col-md-4 col-lg-3">
<div class="card shadow-sm h-100">
<img src="${item.image}" class="card-img-top">
<div class="card-body">
<h6 class="card-title">${item.title}</h6>
<p class="text-muted small">${item.categoryPath}</p>
<b>₹ ${item.price}</b>
<button class="btn btn-danger btn-sm w-100 mt-2" onclick="deleteItem('${item.id}')">Delete</button>
</div>
</div>
</div>
`;

});

displayItems(data);

});
}

loadItemsAdmin();

function deleteItem(id){

if(!confirm("Delete item?")) return;

fetch(API+"?type=delete&id="+id+"&token="+TOKEN)
.then(res=>res.text())
.then(()=>{
loadItemsAdmin();
});

}

function searchItems(){

let q=document.getElementById("searchInput").value.toLowerCase();

let filtered = allItems.filter(item =>
(item.title && item.title.toLowerCase().includes(q)) ||
(item.categoryPath && item.categoryPath.toLowerCase().includes(q)) ||
(item.price && item.price.toString().includes(q))
);

displayItems(filtered);

}


function displayItems(data){

let html="";

data.reverse().forEach(item=>{

html+=`
<div class="col-md-3 col-6 mb-3">
  <div class="card h-100 shadow-sm">
    <img src="${item.image}" class="card-img-top">

    <div class="card-body d-flex flex-column">
      <h6>${item.title}</h6>
      <p class="text-muted small">${item.categoryPath}</p>
      <b>₹ ${item.price || ""}</b>

      <button class="btn btn-danger btn-sm mt-auto"
      onclick="deleteItem('${item.id}')">
      Delete
      </button>
    </div>
  </div>
</div>
`;

});

document.getElementById("itemsContainer").innerHTML=html;
}

function logout(){
localStorage.removeItem("admin");
window.location="login.html";
}
