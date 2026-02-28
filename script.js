const container = document.getElementById("qr-container");

const qr = new QRCodeStyling({
width:300,
height:300,
type:"svg",
data:"https://example.com",
margin:15,
dotsOptions:{
color:"#111111",
type:"rounded"
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

document.getElementById("generateBtn").onclick = function(){

const text = document.getElementById("text").value.trim();
const qrColor = document.getElementById("qrColor").value;
const bgColor = document.getElementById("bgColor").value;
const style = document.getElementById("qrStyle").value;

if(text === ""){
alert("Enter text or URL first");
return;
}

let dotsType = "rounded";
let squareType = "extra-rounded";
let dotType = "dot";

if(style === "square"){
dotsType = "square";
squareType = "square";
dotType = "square";
}

if(style === "dots"){
dotsType = "dots";
squareType = "extra-rounded";
dotType = "dot";
}

qr.update({
data:text,
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

};

document.getElementById("downloadBtn").onclick = function(){
qr.download({
name:"qr-code",
extension:"png"
});
};
