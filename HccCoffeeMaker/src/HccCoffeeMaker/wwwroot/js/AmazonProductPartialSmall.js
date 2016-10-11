
function MouseOverImage(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "zoom-in";
}

function MouseOutImage(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "default";
}

function MouseOverProduct(ev, id) {
    ev.preventDefault();
    var idNumber = id.match(/\d+$/);
    var product = document.getElementById("productPartial".concat(idNumber));
    product.style.cursor = "pointer";
    if (selected[idNumber] != "selected")
        product.style.boxShadow = "0 0 20px var(--navy)";
    //else 
        //product.style.boxShadow = "0 0 20px var(--pink)";
}

function MouseOutProduct(ev, id) {
    ev.preventDefault();
    var idNumber = id.match(/\d+$/);
    var product = document.getElementById("productPartial".concat(idNumber));
    product.style.cursor = "default";
    if (selected[idNumber] != "selected")
        product.style.boxShadow = "none";
    else
        product.style.boxShadow = "0 0 20px var(--yellow)";
}

function MouseClickProduct(ev, id) {
    var idNumber = id.match(/\d+$/);
    var product = document.getElementById("productPartial".concat(idNumber));
    if (selected[idNumber] != "selected")
    {
        selected[idNumber] = "selected";
        document.getElementById("xMark".concat(idNumber)).style.display = "inline";
        document.getElementById("checkMark".concat(idNumber)).style.display = "none";
        product.style.boxShadow = "0 0 20px var(--yellow)";
    }
    else 
    {
        delete selected[idNumber];
        document.getElementById("xMark".concat(idNumber)).style.display = "none";
        document.getElementById("checkMark".concat(idNumber)).style.display = "inline";
        product.style.boxShadow = "0 0 20px var(--navy)";
    }
}