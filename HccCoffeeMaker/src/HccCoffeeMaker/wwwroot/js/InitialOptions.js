var perspective = "Selection";
var selected = {};

function MoveToComparison(ev, id) {
    if (perspective == "Selection") {
        perspective = "Comparison";

        showingReviews = {};

        var heightRows = Array.prototype.slice.call(document.querySelectorAll(".heightRow"));
        var moveRows = Array.prototype.slice.call(document.querySelectorAll(".moveRow"));
        var comparisonRows = Array.prototype.slice.call(document.querySelectorAll(".comparisonRow"));
        var reviewRows = Array.prototype.slice.call(document.querySelectorAll(".reviewRow"));
        var rows = heightRows.concat(moveRows).concat(comparisonRows).concat(reviewRows);
        for (var i = 0; i < rows.length; i++) {
            var idNumber = rows[i].id.match(/\d+$/);
            if (selected[idNumber] == undefined)
                rows[i].style.display = "none";
            else
                rows[i].style.display = "";
        }


        document.getElementById("Selection").style.display = "none";
        document.getElementById("Comparison").style.display = "block";

        document.getElementById("rightArrow").style.display = "none";
        document.getElementById("leftArrow").style.display = "";

        var notInColumns = [0, 1, 3, 5, 6];
        for (var k = 0; k < notInColumns.length; k++)
        {
            j = notInColumns[k];
            for (var i = 0; i < comparisonRows.length; i++) {
                comparisonRows[i].children[j].style.borderBottom = "solid 10px var(--navyTransparent)";
            }
        }

        var columns = [2, 4, 7, 8, 9, 10, 11];
        for (var k = 0; k < columns.length; k++) {
            var j = columns[k];
            var countValues = {};
            for (var i = 0; i < comparisonRows.length; i++) {
                if (comparisonRows[i].style.display != "none") {
                    if (countValues[comparisonRows[i].children[j].innerText] == undefined) {
                        countValues[comparisonRows[i].children[j].innerText] = 1;
                    }
                    else {
                        countValues[comparisonRows[i].children[j].innerText]++;
                    }
                }
            }

            var count = 0;
            var keys = Object.keys(countValues);
            var max = 0;
            for (var i = 0; i < keys.length; i++) {
                count = count + countValues[keys[i]];
                if (countValues[keys[i]] > max)
                    max = countValues[keys[i]];
            }

            for (var i = 0; i < comparisonRows.length; i++) {
                if (comparisonRows[i].style.display != "none") {
                    var thisCount = countValues[comparisonRows[i].children[j].innerText];
                    if (thisCount <= 0.2*max)
                        comparisonRows[i].children[j].style.borderBottom = "solid 10px var(--pink)";
                    else if (thisCount <= 0.34 * max)
                        comparisonRows[i].children[j].style.borderBottom = "solid 10px var(--yellow)";
                    else if (thisCount <= 0.51 * max)
                        comparisonRows[i].children[j].style.borderBottom = "solid 10px var(--brightBlue)";
                    else
                       comparisonRows[i].children[j].style.borderBottom = "solid 10px var(--navyTransparent)";
                }
            }
        }

    }
}

function Judgement(ev, id) {
    if (perspective == "Selection")
        return true;
    else {
        ev.preventDefault();
        MoveToSelection(ev, id);
        return false;
    }
}

function MoveToSelection(ev, id) {
    if (perspective == "Comparison") {
        perspective = "Selection";
        document.getElementById("Comparison").style.display = "none";
        document.getElementById("Selection").style.display = "block";

        document.getElementById("rightArrow").style.display = "";
        var leftArrow = document.getElementById("leftArrow");
        leftArrow.style.display = "";

        var allCheckBoxes = Array.prototype.slice.call(document.querySelectorAll(".checkClass"));
        for(var i = 0; i < allCheckBoxes.length; i++)
        {
            var idNumber = allCheckBoxes[i].id.match(/\d+$/);
            if (selected[idNumber] != "selected") {
                allCheckBoxes[i].innerHTML = "&nbsp";
                document.getElementById("productPartial".concat(idNumber)).style.boxShadow = "none";
            }
        }

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