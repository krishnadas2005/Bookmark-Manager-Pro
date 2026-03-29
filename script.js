let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function save(){
localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
render();
}

function addBookmark(){

let name=document.getElementById("name").value;
let url=document.getElementById("url").value;

if(!name || !url){
alert("Enter details");
return;
}

bookmarks.push({name,url});

document.getElementById("name").value="";
document.getElementById("url").value="";

save();
}

function render(){

let grid=document.getElementById("bookmarkGrid");
grid.innerHTML="";

bookmarks.forEach((b,i)=>{

let div=document.createElement("div");
div.className="bookmark";

let domain=new URL(b.url).hostname;

div.innerHTML=`

<div>
<img src="https://www.google.com/s2/favicons?domain=${domain}">
<a href="${b.url}" target="_blank">${b.name}</a>
</div>

<div class="actions">

<button onclick="editBookmark(${i})">Edit</button>

<button onclick="deleteBookmark(${i})">Delete</button>

</div>

`;

grid.appendChild(div);

});

}

function deleteBookmark(i){
bookmarks.splice(i,1);
save();
}

function editBookmark(i){

let name=prompt("Edit name",bookmarks[i].name);
let url=prompt("Edit url",bookmarks[i].url);

if(name && url){

bookmarks[i].name=name;
bookmarks[i].url=url;

save();

}

}

document.getElementById("search").addEventListener("input",function(){

let q=this.value.toLowerCase();

let cards=document.querySelectorAll(".bookmark");

cards.forEach(card=>{

let text=card.innerText.toLowerCase();

card.style.display=text.includes(q)?"block":"none";

});

});

function toggleDark(){
document.body.classList.toggle("dark");
}

function exportBookmarks(){

let data=JSON.stringify(bookmarks);

let blob=new Blob([data],{type:"application/json"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="bookmarks.json";

a.click();
}

document.getElementById("importFile").addEventListener("change",function(){

let file=this.files[0];

let reader=new FileReader();

reader.onload=function(){

bookmarks=JSON.parse(reader.result);
save();

}

reader.readAsText(file);

});

render();