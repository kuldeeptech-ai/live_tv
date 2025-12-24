const PASSWORD="Kld123";

const loginBox=document.getElementById("login");
const panel=document.getElementById("panel");

function login(){
  if(document.getElementById("pass").value===PASSWORD){
    localStorage.setItem("admin","1");
    open();
  } else alert("Wrong password");
}

function open(){
  loginBox.style.display="none";
  panel.classList.remove("hidden");
  fetch("data/channels.json")
    .then(r=>r.text())
    .then(t=>editor.value=t);
}

if(localStorage.getItem("admin")) open();

function info(){
  alert(
`GitHub Pages static hai.

JSON yahin edit karo →
Copy →
GitHub repo data/channels.json me paste →
Commit`
  );
}
