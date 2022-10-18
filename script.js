var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 250,
    height: 250
});

function makeCode() {
    var elText = document.getElementById("QR-content");
    qrcode.makeCode(elText.value);
};

function genQRContent() {
    var elText = document.getElementById("QR-content");
    var partNumber = document.getElementById("partNumber").value;
    var partName = document.getElementById("partName").value;
    var IDconditionE = document.getElementById("IDconditionE").checked;
    var IDconditionA = document.getElementById("IDconditionA").checked;
    var IDconditionB = document.getElementById("IDconditionB").checked;
    var IDconditionC = document.getElementById("IDconditionC").checked;
    var elpartSKU = document.getElementById("partSKU");
    var partSKU = elpartSKU.value;
    var stringFill = "";

    var partCondition = "";
    
    var QRcontent = `${partNumber}|${partName}|0|0|0|Được thể hiện trên bao bì|_|_|_|${partCondition}|_|${partSKU}|${stringFill}`;
    if (IDconditionE) { partCondition = "E" };
    if (IDconditionA) { partCondition = "A" };
    if (IDconditionB) { partCondition = "B" };
    if (IDconditionC) { partCondition = "C" };

    if (!partSKU) {
        partSKU = randomString(12);
        elpartSKU.value = partSKU;
    }
    stringFill = randomString(124 - QRcontent.length);
    console.log(stringFill);
    QRcontent = `${partNumber}|${partName}|0|0|0|Được thể hiện trên bao bì|_|_|_|${partCondition}|_|${partSKU}|${stringFill}`;
    console.log("part SKU",partSKU);
    elText.value = QRcontent;
};

function randomString(len, an) {
    // console.log(randomString(10));      // i.e: "4Z8iNQag9v"
    // console.log(randomString(10, "a")); // i.e: "aUkZuHNcWw"
    // console.log(randomString(10, "n")); // i.e: "9055739230"
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
};
function regenQRCode(){
    var elpartSKU = document.getElementById("partSKU");
    var partSKU = elpartSKU.value;
    partSKU = randomString(12);
    elpartSKU.value = partSKU;
};

makeCode();

$("#QR-content").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });

$(".on-change-content-event").
    on("blur", function () {
        genQRContent();
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            genQRContent();
            makeCode();
        }
    });

$('input[type="radio"]').
on("click", function () {
    genQRContent();
    makeCode();
});

$('#regen-qrcode').
on("click", function () {
    regenQRCode();
    genQRContent();
    makeCode();
});