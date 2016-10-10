
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
    else 
        product.style.boxShadow = "0 0 20px var(--pink)";
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
        document.getElementById("checkMark".concat(idNumber)).style.visibility = "visible";
        product.style.boxShadow = "0 0 20px var(--yellow)";
    }
    else 
    {
        delete selected[idNumber];
        document.getElementById("checkMark".concat(idNumber)).style.visibility = "hidden";
        product.style.boxShadow = "0 0 20px var(--navy)";
    }
}














//var mode = "MoveMode";
//var typedIn = {};

//function ChangeMode() {

//    var headerCommentCells = document.querySelectorAll(".moveCell");
//    var rowCommentCells = document.querySelectorAll(".comparisonComments");
//    var allCommentCells = Array.prototype.slice.call(headerCommentCells);
//    allCommentCells = allCommentCells.concat(Array.prototype.slice.call(rowCommentCells));

//    if (mode == "MoveMode") {
//        mode = "WriteMode";
//        document.getElementById("ModeSelector").innerHTML = "Move Mode";

//        for (var i = 0; i < allCommentCells.length; i++) {
//            if (!typedIn[allCommentCells[i].id]) {
//                allCommentCells[i].style.backgroundColor = "white";
//                allCommentCells[i].style.borderLeft = "solid 15px var(--lightSeafoam)";
//                allCommentCells[i].style.borderRight = "solid 15px var(--lightSeafoam)";
//            }
//        }
//    }
//    else {
//        mode = "MoveMode";
//        document.getElementById("ModeSelector").innerHTML = "Write Mode";

//        for (var i = 0; i < allCommentCells.length; i++) {
//            if (!typedIn[allCommentCells[i].id]) {
//                allCommentCells[i].style.backgroundColor = "transparent";
//                allCommentCells[i].style.borderLeft = "none";
//                allCommentCells[i].style.borderRight = "none";
//            }
//        }
//        for (var i = 0; i < rowCommentCells.length; i++) {
//            if (!typedIn[rowCommentCells[i].id]) {
//                rowCommentCells[i].style.backgroundColor = "var(--lightSeafoam)";
//            }
//        }
//    }
//}

//function MouseOver(ev, id) {
//    if (mode == "WriteMode") {
//        var cell = document.getElementById(id);
//        cell.style.border = "dotted 2px black";
//        document.getElementById(id).style.cursor = "text";
//    }
//}

//function MouseOut(ev, id) {
//    if (mode == "WriteMode") {
//        var cell = document.getElementById(id);
//        cell.style.borderTop = "transparent";
//        cell.style.borderBottom = "transparent";
//        cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
//        cell.style.borderRight = "solid 15px var(--lightSeafoam)";
//        document.getElementById(id).style.cursor = "default";
//    }
//}

//function MouseOutRow(ev, id) {
//    if (mode == "WriteMode") {
//        var cell = document.getElementById(id);
//        if (!typedIn[id]) {
//            cell.style.borderTop = "transparent";
//            cell.style.borderBottom = "transparent";
//            cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
//            cell.style.borderRight = "solid 15px var(--lightSeafoam)";
//        }
//        else {
//            cell.style.borderTop = "transparent";
//            cell.style.borderBottom = "transparent";
//            cell.style.borderRight = "none";
//            cell.style.borderLeft = "none";
//        }
//    }
//}

//function MoveCellClick(ev, id) {
//    if (mode == "WriteMode") {
//        var cell = document.getElementById(id);
//        cell.style.borderTop = "transparent";
//        cell.style.borderBottom = "transparent";
//        cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
//        cell.style.borderRight = "solid 15px var(--lightSeafoam)";
//        cell.style.backgroundColor = "var(--brightBlueTransparent)";
//        cell.contentEditable = "true";
//        var width = cell.offsetWidth;
//        cell.style.maxWidth = width;
//        typedIn[id] = "set";

//        var parent = cell.parentNode;
//        var thisColumn = 0;
//        for(var i = 0; i < parent.children.length; i++)
//        {
//            if (parent.children[i] == cell) {
//                var lowerCell = parent.nextElementSibling.children[i];
//                if (typedIn[parent.nextElementSibling.children[parent.nextElementSibling.children.length - 1].id] == "set")
//                {
//                    lowerCell.style.backgroundColor = "none";
//                    lowerCell.style.backgroundColor = "var(--greenTransparent)";
//                }
//                else
//                {
//                    lowerCell.style.backgroundColor = "none";
//                    lowerCell.style.backgroundColor = "var(--brightBlueTransparent)";
//                }
//            }
//        }

//    }
//}

//function MoveCellClickRow(ev, id) {
//    if (mode == "WriteMode") {
//        var cell = document.getElementById(id);
//        var productNumber = id.match(/\d+$/);
//        var row = document.getElementById("product".concat(productNumber));
//        cell.style.backgroundColor = "var(--yellowTransparent)";
//        row.style.backgroundColor = "var(--yellowTransparent)";
//        row.style.color = "var(--navy)";
//        cell.contentEditable = "true";
//        var width = cell.offsetWidth;
//        cell.style.maxWidth = width;
//        typedIn[id] = "set";

//        var moveCellRow = row.previousElementSibling;
//        for(var i = 0; i < moveCellRow.children.length; i++)
//        {
//            if(typedIn[moveCellRow.children[i].id] == "set")
//            {
//                row.children[i].style.backgroundColor = "var(--greenTransparent)";
//            }
//        }
//    }
//}

//function Dragging(ev) {
//    if (mode == "MoveMode") {
//        ev.dataTransfer.setData("text", ev.target.id);
//        var allRows = document.querySelectorAll(".moveRow");
//        for (var i = 0; i < allRows.length; i++) {
//            allRows[i].style.backgroundColor = "var(--pinkTransparent)";
//        }
//    }
//}

//function StopDragging(ev) {
//    if (mode == "MoveMode") {
//        ev.dataTransfer.setData("text", ev.target.id);
//        var allRows = document.querySelectorAll(".moveRow");
//        for (var i = 0; i < allRows.length; i++) {
//            allRows[i].style.backgroundColor = "transparent";
//        }
//    }
//}

//function DragEnter(ev, id) {
//    if (mode == "MoveMode") {
//        ev.preventDefault();
//        var row = document.getElementById(id);
//        row.style.backgroundColor = "var(--pink)";
//    }
//}

//function DragExit(ev, id) {
//    if (mode == "MoveMode") {
//        ev.preventDefault();
//        var row = document.getElementById(id);
//        row.style.backgroundColor = "var(--pinkTransparent)";
//    }
//}

//function ComparisonRowMouseOver(ev, id) {
//    if (mode == "MoveMode") {
//        document.getElementById(id).style.cursor = "pointer";
//    }
//}

//function ComparisonRowMouseOut(ev, id) {
//    if (mode == "MoveMode") {
//        document.getElementById(id).style.cursor = "default";
//    }
//}

//function Drop(ev, id) {
//    if (mode == "MoveMode") {
//        ev.preventDefault();
//        var draggedId = ev.dataTransfer.getData("text");
//        //alert('#'.concat(draggedId));

//        var row = document.getElementById(id);
//        row.style.backgroundColor = "transparent";
//        //alert('#'.concat(id));

//        var elementToAppendAfterId = $('#'.concat(id)).prev().prev().attr('id');

//        //alert(elementToAppendAfterId);
//        $('#'.concat(draggedId)).insertAfter('#'.concat(elementToAppendAfterId));
//        var draggedNumber = draggedId.match(/\d+$/);
//        //alert('#'.concat('moveRow').concat(draggedNumber));
//        $('#'.concat('moveRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
//        $('#'.concat('heightFor').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
//    }
//}