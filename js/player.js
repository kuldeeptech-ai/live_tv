const video = document.getElementById("video");
const iframe = document.getElementById("iframe");
const grid = document.getElementById("channels");
const sug = document.getElementById("suggestions");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

let all = [];

fetch("data/channels.json")
.then(r=>r.json())
.then(d=>{
  d.categories.forEach(cat=>{
    filter.innerHTML += `<option>${cat.name}</option>`;
    cat.channels.forEach(c=>{
      c.category = cat.name;
      all.push(c);
    });
  });
  render(all);
});

function render(list){
  grid.innerHTML="";
  list.forEach(c=>{
    const v = views(c.name);
    const div=document.createElement("div");
    div.className="channel";
    div.innerHTML=`
      <img src="${c.logo}">
      <span>${c.name}</span>
      <small>${v} views</small>
    `;
    div.onclick=()=>play(c);
    grid.appendChild(div);
  });
}

search.oninput = apply;
filter.onchange = apply;

function apply(){
  const s=search.value.toLowerCase();
  const f=filter.value;
  render(all.filter(c =>
    c.name.toLowerCase().includes(s) &&
    (f==="all" || c.category===f)
  ));
}

function views(n){
  return localStorage.getItem("v_"+n) || 0;
}

function addView(n){
  let v=views(n);
  localStorage.setItem("v_"+n,++v);
}

function play(c){
  addView(c.name);
  suggest(c.category);

  iframe.style.display="none";
  video.style.display="block";

  if(c.type==="hls"){
    if(Hls.isSupported()){
      const h=new Hls();
      h.loadSource(c.url);
      h.attachMedia(video);
    } else video.src=c.url;
  } else {
    video.style.display="none";
    iframe.style.display="block";
    iframe.src=c.embed_url;
  }
}

function suggest(cat){
  sug.innerHTML="";
  all.filter(c=>c.category===cat).slice(0,4).forEach(c=>{
    const d=document.createElement("div");
    d.className="channel";
    d.innerHTML=`<img src="${c.logo}"><span>${c.name}</span>`;
    d.onclick=()=>play(c);
    sug.appendChild(d);
  });
}
