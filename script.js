const qr = new QRCodeStyling({
width:300,
height:300,
data:"",
dotsOptions:{
color:"#000000",
type:"rounded"
},
backgroundOptions:{
color:"#ffffff"
}
});

qr.append(document.getElementById("qr-container"));

function generateQR(){

const text = document.getElementById("text").value;
const qrColor = document.getElementById("qrColor").value;
const bgColor = document.getElementById("bgColor").value;

qr.update({
data:text,
dotsOptions:{color:qrColor},
backgroundOptions:{color:bgColor}
});

}

function downloadQR(){
qr.download({
name:"qr-code",
extension:"png"
});
}
