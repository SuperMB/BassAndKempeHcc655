var mode = "MoveMode";
var typedIn = {};

function ChangeToAnnotationMode(ev, id)
{
    var pen = document.getElementById(id);
    if (mode == "MoveMode") {

        pen.style.backgroundColor = "var(--pink)";

        var headerCommentCells = document.querySelectorAll(".moveCell");
        var rowCommentCells = document.querySelectorAll(".comparisonComments");
        var reviewCommentCells = document.querySelectorAll(".moveCellReview");
        var allCommentCells = Array.prototype.slice.call(headerCommentCells);
        allCommentCells = allCommentCells.concat(Array.prototype.slice.call(rowCommentCells));
        allCommentCells = allCommentCells.concat(Array.prototype.slice.call(reviewCommentCells));

        mode = "WriteMode";
        
        for (var i = 0; i < allCommentCells.length; i++) {
            if (!typedIn[allCommentCells[i].id]) {
                allCommentCells[i].style.backgroundColor = "white";
                allCommentCells[i].style.borderLeft = "solid 15px var(--lightSeafoam)";
                allCommentCells[i].style.borderRight = "solid 15px var(--lightSeafoam)";
            }
        }

        document.getElementById("StartStop").innerText = "Stop";
        document.getElementById("TrashCan").style.opacity = "0.2";
        document.getElementById("TrashText").style.opacity = "0.2";
        document.getElementById("DragText").style.opacity = "0.2";
    }
    else {

        pen.style.backgroundColor = "var(--navy)";

        var headerCommentCells = document.querySelectorAll(".moveCell");
        var rowCommentCells = document.querySelectorAll(".comparisonComments");
        var reviewCommentCells = document.querySelectorAll(".moveCellReview");
        var allCommentCells = Array.prototype.slice.call(headerCommentCells);
        allCommentCells = allCommentCells.concat(Array.prototype.slice.call(rowCommentCells));

        mode = "MoveMode";
        
        for (var i = 0; i < allCommentCells.length; i++) {
            if (!typedIn[allCommentCells[i].id]) {
                allCommentCells[i].style.backgroundColor = "transparent";
                allCommentCells[i].style.borderLeft = "none";
                allCommentCells[i].style.borderRight = "none";
            }
        }
        for (var i = 0; i < rowCommentCells.length; i++) {
            if (!typedIn[rowCommentCells[i].id]) {
                rowCommentCells[i].style.backgroundColor = "var(--lightSeafoam)";
            }
        }
        for (var i = 0; i < reviewCommentCells.length; i++) {
            if (!typedIn[reviewCommentCells[i].id]) {
                reviewCommentCells[i].style.backgroundColor = "var(--lightSeafoam)";
                reviewCommentCells[i].style.borderLeft = "none";
                reviewCommentCells[i].style.borderRight = "none";
            }
        }

        document.getElementById("StartStop").innerText = "Start";
        document.getElementById("TrashCan").style.opacity = "1";
        document.getElementById("TrashText").style.opacity = "1";
        document.getElementById("DragText").style.opacity = "1";
    }
}

function MouseOver(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        cell.style.border = "dotted 2px black";
        document.getElementById(id).style.cursor = "text";
    }
}

function MouseOut(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        cell.style.borderTop = "transparent";
        cell.style.borderBottom = "transparent";
        cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
        cell.style.borderRight = "solid 15px var(--lightSeafoam)";
        document.getElementById(id).style.cursor = "default";
    }
}

function MouseOutRow(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        if (!typedIn[id]) {
            cell.style.borderTop = "transparent";
            cell.style.borderBottom = "transparent";
            cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
            cell.style.borderRight = "solid 15px var(--lightSeafoam)";
        }
        else {
            cell.style.borderTop = "transparent";
            cell.style.borderBottom = "transparent";
            cell.style.borderRight = "none";
            cell.style.borderLeft = "none";
        }
    }
}

function MoveCellClick(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        cell.style.borderTop = "transparent";
        cell.style.borderBottom = "transparent";
        cell.style.borderLeft = "solid 15px var(--lightSeafoam)";
        cell.style.borderRight = "solid 15px var(--lightSeafoam)";
        cell.style.backgroundColor = "var(--brightBlueTransparent)";
        cell.contentEditable = "true";
        var width = cell.offsetWidth;
        cell.style.maxWidth = width;
        typedIn[id] = "set";

        var parent = cell.parentNode;
        var thisColumn = 0;
        for(var i = 0; i < parent.children.length; i++)
        {
            if (parent.children[i] == cell) {
                var lowerCell = parent.nextElementSibling.children[i];
                if (typedIn[parent.nextElementSibling.children[parent.nextElementSibling.children.length - 1].id] == "set")
                {
                    lowerCell.style.backgroundColor = "none";
                    lowerCell.style.backgroundColor = "var(--greenTransparent)";
                }
                else
                {
                    lowerCell.style.backgroundColor = "none";
                    lowerCell.style.backgroundColor = "var(--brightBlueTransparent)";
                }
            }
        }

    }
}

function MoveCellClickRow(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        var productNumber = id.match(/\d+$/);
        var row = document.getElementById("product".concat(productNumber));
        cell.style.backgroundColor = "var(--yellowTransparent)";
        row.style.backgroundColor = "var(--yellowTransparent)";
        row.style.color = "var(--navy)";
        cell.contentEditable = "true";
        var width = cell.offsetWidth;
        cell.style.maxWidth = width;
        typedIn[id] = "set";

        var moveCellRow = row.previousElementSibling;
        for(var i = 0; i < moveCellRow.children.length; i++)
        {
            if(typedIn[moveCellRow.children[i].id] == "set")
            {
                row.children[i].style.backgroundColor = "var(--greenTransparent)";
            }
        }
    }
}

function MoveCellReviewClick(ev, id) {
    if (mode == "WriteMode") {
        var cell = document.getElementById(id);
        cell.style.borderTop = "solid 15px var(--lightSeafoam)";
        cell.style.borderBottom = "solid 15px var(--lightSeafoam)";
        cell.style.borderLeft = "transparent";
        cell.style.borderRight = "transparent";
        cell.style.backgroundColor = "var(--brightBlueTransparent)";
        cell.contentEditable = "true";
        var width = cell.offsetWidth;
        cell.style.maxWidth = width;
        typedIn[id] = "set";


    }
}

function Dragging(ev, id) {
    if (mode == "MoveMode") {
        ev.dataTransfer.setData("text", ev.target.id);
        document.getElementById(id).style.cursor = "move";
        var allRows = document.querySelectorAll(".moveRow");
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].style.backgroundColor = "var(--pinkTransparent)";
        }
    }
}

function StopDragging(ev, id) {
    if (mode == "MoveMode") {
        document.getElementById(id).style.cursor = "default";
        ev.dataTransfer.setData("text", ev.target.id);
        var allRows = document.querySelectorAll(".moveRow");
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].style.backgroundColor = "transparent";
        }
    }
}

function DragEnter(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        var row = document.getElementById(id);
        row.style.backgroundColor = "var(--pink)";
        document.getElementById(id).style.cursor = "move";
    }
}

function DragExit(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        var row = document.getElementById(id);
        row.style.backgroundColor = "var(--pinkTransparent)";
        document.getElementById(id).style.cursor = "default";
    }
}

function ComparisonRowMouseOver(ev, id) {
    if (mode == "MoveMode") {
        document.getElementById(id).style.cursor = "move";
    }
}

function ComparisonRowMouseOut(ev, id) {
    if (mode == "MoveMode") {
        document.getElementById(id).style.cursor = "default";
    }
}

function Drop(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        var draggedId = ev.dataTransfer.getData("text");
        //alert('#'.concat(draggedId));

        var row = document.getElementById(id);
        row.style.backgroundColor = "transparent";
        //alert('#'.concat(id));

        var elementToAppendAfterId = $('#'.concat(id)).prev().prev().attr('id');

        //alert(elementToAppendAfterId);
        var draggedNumber = draggedId.match(/\d+$/);
        $('#'.concat('reviewRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        $('#'.concat(draggedId)).insertAfter('#'.concat(elementToAppendAfterId));
        //alert('#'.concat('moveRow').concat(draggedNumber));
        $('#'.concat('moveRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        $('#'.concat('heightFor').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
    }
}

function TrashDragEnter(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        //document.getElementById(id).style.cursor = "move";
    }
}

function TrashDragExit(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        //document.getElementById(id).style.cursor = "default";
    }
}

function TrashDrop(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        var draggedId = ev.dataTransfer.getData("text");
        var productNumber = draggedId.match(/\d+$/);

        var heightRow = document.getElementById("heightFor".concat(productNumber));
        var moveRow = document.getElementById("moveRow".concat(productNumber));
        var comparisonRow = document.getElementById("product".concat(productNumber));
        var reviewRow = document.getElementById("reviewRow".concat(productNumber));

        heightRow.style.display = "none";
        moveRow.style.display = "none";
        comparisonRow.style.display = "none";
        reviewRow.style.display = "none";

        delete selected[productNumber];
    }
}

function ShowReviews(ev, id) {
    var productNumber = id.match(/\d+$/);

    document.getElementById("reviews".concat(productNumber)).style.display = "block";
    var arrow = document.getElementById("expandReview".concat(productNumber));
    document.getElementById("reviewsClick".concat(productNumber)).setAttribute('onclick', 'HideReviews(event, this.id)');
    arrow.innerText = "(X)";

}

function HideReviews(ev, id) {
    var productNumber = id.match(/\d+$/);

    document.getElementById("reviews".concat(productNumber)).style.display = "none";
    var arrow = document.getElementById("expandReview".concat(productNumber));
    document.getElementById("reviewsClick".concat(productNumber)).setAttribute('onclick', 'ShowReviews(event, this.id)');
    arrow.innerText = "(+)";

}

function MouseOverReview(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "pointer";
}

function MouseOutReview(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "default";
}