const container = document.getElementById("qr-container");

const textInput = document.getElementById("text");
const qrColorInput = document.getElementById("qrColor");
const bgColorInput = document.getElementById("bgColor");
const styleInput = document.getElementById("qrStyle");

const qr = new QRCodeStyling({
width:350,
height:350,
type:"svg",
data:"https://github.com/gato-pro",
margin:20,

dotsOptions:{
color:"#111111",
type:"dots"
},

backgroundOptions:{
color:"#ffffff"
},

cornersSquareOptions:{
color:"#111111",
type:"extra-rounded"
},

cornersDotOptions:{
color:"#111111",
type:"dot"
}
});

qr.append(container);

function updateQR(){

const text=textInput.value.trim();
const qrColor=qrColorInput.value;
const bgColor=bgColorInput.value;
const style=styleInput.value;

let dotsType="dots";
let squareType="extra-rounded";
let dotType="dot";

if(style==="square"){
dotsType="square";
squareType="square";
dotType="square";
}

if(style==="rounded"){
dotsType="rounded";
squareType="extra-rounded";
dotType="dot";
}

qr.update({
data:text || "https://github.com",
dotsOptions:{
color:qrColor,
type:dotsType
},
cornersSquareOptions:{
color:qrColor,
type:squareType
},
cornersDotOptions:{
color:qrColor,
type:dotType
},
backgroundOptions:{
color:bgColor
}
});

}

/* Live preview events */

textInput.addEventListener("input", updateQR);
qrColorInput.addEventListener("input", updateQR);
bgColorInput.addEventListener("input", updateQR);
styleInput.addEventListener("change", updateQR);

/* Download */

document.getElementById("downloadBtn").onclick=function(){
qr.download({
name:"qr-code",
extension:"png"
});
};

/* Dark mode */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// choose icon paths
const sunIconPath = "SVG/sun.svg";
const moonIconPath = "SVG/moon.svg";

// set initial icon based on current theme (default light)
if (document.body.classList.contains("dark")) {
    themeIcon.src = moonIconPath;
} else {
    themeIcon.src = sunIconPath;
}

themeToggle.onclick = function() {
    const isDark = document.body.classList.toggle("dark");
    themeIcon.src = isDark ? moonIconPath : sunIconPath;
};
