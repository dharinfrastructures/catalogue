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
function uploadItem(){

let title=document.getElementById("title").value;
let price=document.getElementById("price").value;
let unit=document.getElementById("unit").value;
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

// show progress
let box=document.getElementById("uploadProgressBox");
let bar=document.getElementById("uploadProgress");

box.style.display="block";
bar.style.width="0%";
bar.innerHTML="0%";

// smooth fake progress
let percent=0;
let interval=setInterval(()=>{
percent+=5;
if(percent<=90){
bar.style.width=percent+"%";
bar.innerHTML=percent+"%";
}
},500);

// actual upload
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
+"&unit="+encodeURIComponent(unit)
+"&token="+TOKEN)
.then(res=>res.text())
.then(()=>{

clearInterval(interval);

bar.style.width="100%";
bar.innerHTML="Upload Complete";

setTimeout(()=>{
box.style.display="none";
bar.style.width="0%";
bar.innerHTML="0%";
},1200);

alert("Uploaded Successfully");
loadItemsAdmin();

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
<p>Rs ${item.price} ${item.unit || ""}</p>
<hr>
</div>
`;
});

document.getElementById("gallery").innerHTML=html;

});

}


// 📂 LOAD CATEGORIES
function loadCategories(){

fetch(API+"?type=getCategories")
.then(res=>res.json())
.then(data=>{

let sel=document.getElementById("categorySelect");
if(!sel) return;

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


// 🧠 LOAD ITEMS ADMIN
function loadItemsAdmin(){
fetch(API+"?type=getData")
.then(res=>res.json())
.then(data=>{

allItems = data; 
displayItems(data);

});
}

loadItemsAdmin();


// 🗑 DELETE
function deleteItem(id){

if(!confirm("Delete item?")) return;

fetch(API+"?type=delete&id="+id+"&token="+TOKEN)
.then(res=>res.text())
.then(()=>{
loadItemsAdmin();
});

}


// 🔍 SEARCH
function searchItems(){

let q=document.getElementById("searchInput").value.toLowerCase();

let filtered = allItems.filter(item =>
(item.title && item.title.toLowerCase().includes(q)) ||
(item.categoryPath && item.categoryPath.toLowerCase().includes(q)) ||
(item.price && item.price.toString().includes(q)) ||
(item.unit && item.unit.toLowerCase().includes(q))
);

displayItems(filtered);

}


// 🎨 DISPLAY ADMIN ITEMS
function displayItems(data){

let html="";

data.reverse().forEach(item=>{

html+=`
<div class="col-md-3 col-6 mb-3">
  <div class="card h-100 shadow-sm">
    <img src="${item.image}" class="card-img-top" style="max-height:300px; object-fit:cover;">

    <div class="card-body d-flex flex-column">
      <h6>${item.title}</h6>
      <p class="text-muted small">${item.categoryPath}</p>

      <b>₹ ${item.price || ""} ${item.unit || ""}</b>

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


// 🚪 LOGOUT
function logout(){
localStorage.removeItem("admin");
window.location="login.html";
}