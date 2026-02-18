// 🔐 ADMIN LOGIN
const ADMIN_EMAIL = "dharinfrastructures@gmail.com";
const ADMIN_PASS = "dhar1234";
const ADMIN_TOKEN = "dhar_admin_2026";

// 📄 SHEET + DRIVE
const SHEET_ID = "18TySYoJamSPPDq3eshf9bWi-uyrJOB_jrzk1e1GGAwk";
const FOLDER_ID = "1eFHw2iIdgVy-PEgTt61H5mOXDx1QZznl";

// ================= API =================
function doPost(e){

  if(e.parameter.type=="upload"){
    return uploadFile(e);
  }

}

function doGet(e){

  if(e.parameter.type=="getData"){
    return getData();
  }

  if(e.parameter.type=="login"){
    return login(e);
  }

  if(e.parameter.type=="add"){
    return addItem(e);
  }

  if(e.parameter.type=="getCategories"){
    return getCategories();
  }

  if(e.parameter.type=="delete"){
    return deleteItem(e);
  }

  return ContentService.createTextOutput("API running");
}

// ================= GET DATA =================
function getData(){

const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
const data = sheet.getDataRange().getValues();

let result=[];

for(let i=1;i<data.length;i++){
result.push({
id:data[i][0],
title:data[i][1],
categoryPath:data[i][2],
image:data[i][3]
});
}

return ContentService
.createTextOutput(JSON.stringify(result))
.setMimeType(ContentService.MimeType.JSON);
}


// ================= LOGIN =================
function login(e){

  let email=e.parameter.email;
  let pass=e.parameter.pass;

  if(email==ADMIN_EMAIL && pass==ADMIN_PASS){
    return ContentService.createTextOutput("success");
  }else{
    return ContentService.createTextOutput("fail");
  }
}

// ================= ADD ITEM =================
function addItem(e){
if(e.parameter.token!=ADMIN_TOKEN){
return ContentService.createTextOutput("unauthorized");
}
let title = e.parameter.title;
let categoryPath = e.parameter.categoryPath;
let image = e.parameter.image;

const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");

sheet.appendRow([
Date.now(),
title,
categoryPath,
image,
new Date()
]);

return ContentService.createTextOutput("added");
}

// ================= IMAGE UPLOAD =================
function uploadFile(e){
  try{

    var data = Utilities.base64Decode(e.parameter.file);
    var blob = Utilities.newBlob(data, e.parameter.mime, e.parameter.filename);

    var file = Drive.Files.create({
      name: e.parameter.filename,
      parents: [FOLDER_ID]
    }, blob);

    var fileId = file.id;

    // make public
    Drive.Permissions.create({
      role: "reader",
      type: "anyone"
    }, fileId);

    var url = "https://lh3.googleusercontent.com/d/"+fileId;

    return ContentService.createTextOutput(url);

  }catch(err){
    return ContentService.createTextOutput("error: "+err);
  }
}

 function getCategories(){

const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
const data = sheet.getDataRange().getValues();

let set = new Set();

for(let i=1;i<data.length;i++){
let path = data[i][2];
if(path){
let parts = path.split(">");
let current="";
for(let p of parts){
current = current ? current+">"+p : p;
set.add(current);
}
}
}

let arr=[...set];

return ContentService
.createTextOutput(JSON.stringify(arr))
.setMimeType(ContentService.MimeType.JSON);
}

function deleteItem(e){

if(e.parameter.token!=ADMIN_TOKEN){
return ContentService.createTextOutput("unauthorized");
}

let id = e.parameter.id;

const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
const data = sheet.getDataRange().getValues();

for(let i=1;i<data.length;i++){

if(data[i][0]==id){

let imageUrl = data[i][3]; // image column
let fileId = "";

// extract file id
if(imageUrl && imageUrl.includes("/d/")){
fileId = imageUrl.split("/d/")[1];
}

try{
if(fileId){
Drive.Files.remove(fileId);
}
}catch(err){}

sheet.deleteRow(i+1);
break;

}
}

return ContentService.createTextOutput("deleted");
}



