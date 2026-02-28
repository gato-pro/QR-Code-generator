const container = document.getElementById("qr-container");

const textInput = document.getElementById("text");
const qrColorInput = document.getElementById("qrColor");
const bgColorInput = document.getElementById("bgColor");
const styleInput = document.getElementById("qrStyle");

// create qr with temporary size; will be resized later for responsiveness
const qr = new QRCodeStyling({
// initial values, will be overridden by resizeQR()
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

// responsive helper: adjust qr size based on container width
function resizeQR(){
    const cw = container.clientWidth;
    const size = Math.min(cw, 350);
    qr.update({ width: size, height: size });
}

// apply on load and when the window resizes
resizeQR();
window.addEventListener("resize", resizeQR);

function updateQR(){
    // also adjust size when user updates QR (useful if container changed)
    resizeQR();

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

// produce a high-resolution image for download by temporarily enlarging
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.onclick = async function(){
    // compute current (rendered) size
    const currentSize = Math.min(container.clientWidth, 350);
    const highSize = currentSize * 5; // 5× scale for sharpness

    // update and download PNG
    qr.update({ width: highSize, height: highSize });
    await qr.download({ name: "qr-code", extension: "png" });

    // restore original size and re‑layout
    qr.update({ width: currentSize, height: currentSize });
    resizeQR();

    // also offer SVG by default for vector quality
    // note: users can rename the file to .svg if they prefer an editable vector.
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
