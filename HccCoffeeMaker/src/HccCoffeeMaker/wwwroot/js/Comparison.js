var mode = "MoveMode";
var typedIn = {};

function GetValue(id, type){
    if (type == "price")
        return GetPrice(id);
    if (type == "rating")
        return GetRating(id);
    if (type == "servingSize")
        return GetServingSize(id);
    if (type == "color")
        return GetColor(id);
    if (type == "durability")
        return GetDurability(id);
    if (type == "brewingTime")
        return GetBrewingTime(id);
    if (type == "warranty")
        return GetWarranty(id);
    if (type == "brand")
        return GetBrand(id);
    if (type == "type")
        return GetType(id);
}

function GetPrice(id){
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonPrice')[0].innerText;
    stringValue = stringValue.substring(1, stringValue.length);
    var value = parseFloat(stringValue);
    return value;
}

function GetRating(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonOverallRating')[0].innerText;
    var value = parseFloat(stringValue);
    return value;
}

function GetServingSize(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonServingSize')[0].innerText;
    if (stringValue == "1 Cup")
        return 0;
    var value = parseInt(stringValue);
    return value;
}

function GetColor(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonColor')[0].innerText;
    if (stringValue == "Black")
        return 0;
    else if (stringValue == "Blue")
        return 1;
    else if (stringValue == "Green")
        return 2;
    else if (stringValue == "Red")
        return 3;
    else if (stringValue == "Silver")
        return 4;
    else
        return 5;
}

function GetDurability(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonDurability')[0].innerText;
    if (stringValue == "Light Use")
        return 0;
    else if (stringValue == "Outdoor Use")
        return 1;
    else if (stringValue == "Normal Use")
        return 2;
    else if (stringValue == "Heavy Commercial Use")
        return 3;
    else
        return 4;
}

function GetBrewingTime(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonBrewingTime')[0].innerText;
    var value = parseInt(stringValue);
    return value;
}

function GetWarranty(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonWarranty')[0].innerText;
    if (stringValue == "None")
        return 0;
    else if (stringValue == "Additional Cost")
        return 10;
    var value = parseInt(stringValue);
    return value;
}

function GetBrand(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonBrand')[0].innerText;
    if (stringValue == "Cuisinart")
        return 0;
    else if (stringValue == "Hamilton")
        return 1;
    else if (stringValue == "Kuerig")
        return 2;
    else if (stringValue == "Nespresso")
        return 3;
    else
        return 4;
}

function GetType(id) {
    var stringValue = document.getElementById(id).getElementsByClassName('comparisonType')[0].innerText;
    if (stringValue == "Automatic Drip")
        return 0;
    else if (stringValue == "French Press")
        return 1;
    else if (stringValue == "Single Serve Pods")
        return 2;
    else
        return 3;
}

function PriceSortAscend(ev, id) {
    if(document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "price");
}

function PriceSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "price");
}

function RatingSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "rating");
}

function RatingSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "rating");
}

function ServingSizeSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "servingSize");
}

function ServingSizeSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "servingSize");
}

function ColorSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "color");
}

function ColorSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "color");
}

function DurabilitySortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "durability");
}

function DurabilitySortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "durability");
}

function BrewingTimeSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "brewingTime");
}

function BrewingTimeSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "brewingTime");
}

function WarrantySortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "warranty");
}

function WarrantySortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "warranty");
}

function BrandSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "brand");
}

function BrandSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "brand");
}

function TypeSortAscend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "ascend", "type");
}

function TypeSortDescend(ev, id) {
    if (document.getElementById(id).style.color == "white")
        Sort(ev, id, "descend", "type");
}

function Sort(ev, id, direction, type) {
    var comparisonRows = Array.prototype.slice.call(document.querySelectorAll(".comparisonRow"));

    var sortedRows = [];

    var max = 0;
    for (var i = 0; i < comparisonRows.length; i++) {
        if (comparisonRows[i].style.display != "none") {

            var value = GetValue(comparisonRows[i].id, type);

            var position = 0;
            for (var j = 0; j < sortedRows.length; j++) {
                if (direction == "ascend") {
                    if (value > GetValue(sortedRows[j], type))
                        position++;
                }
                else
                    if (value < GetValue(sortedRows[j], type))
                        position++;
            }
            sortedRows.splice(position, 0, comparisonRows[i].id);
        }
    }

    ApplySort(sortedRows);

    ClearArrowColors(id);
}

function ApplySort(sortedRows) {

    var table = document.getElementById("theTable");
    for (var i = sortedRows.length - 1; i >= 0; i--) {
        var elementToAppendAfterId = "breakRow";

        var draggedNumber = sortedRows[i].match(/\d+$/);
        $('#'.concat('reviewRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        $('#'.concat(sortedRows[i])).insertAfter('#'.concat(elementToAppendAfterId));
        $('#'.concat('moveRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        $('#'.concat('heightFor').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
    }
}

function ClearArrowColors(id)
{
    document.getElementById("priceSortDescend").style.color = "white";
    document.getElementById("priceSortAscend").style.color = "white";
    document.getElementById("ratingSortDescend").style.color = "white";
    document.getElementById("ratingSortAscend").style.color = "white";
    document.getElementById("servingSizeSortAscend").style.color = "white";
    document.getElementById("servingSizeSortDescend").style.color = "white";
    document.getElementById("colorSortAscend").style.color = "white";
    document.getElementById("colorSortDescend").style.color = "white";
    document.getElementById("durabilitySortAscend").style.color = "white";
    document.getElementById("durabilitySortDescend").style.color = "white";
    document.getElementById("brewingTimeSortAscend").style.color = "white";
    document.getElementById("brewingTimeSortDescend").style.color = "white";
    document.getElementById("warrantySortAscend").style.color = "white";
    document.getElementById("warrantySortDescend").style.color = "white";
    document.getElementById("brandSortAscend").style.color = "white";
    document.getElementById("brandSortDescend").style.color = "white";
    document.getElementById("typeSortAscend").style.color = "white";
    document.getElementById("typeSortDescend").style.color = "white";

    document.getElementById(id).style.color = "var(--yellow)";
}




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
        document.getElementById(id).style.boxShadow = "0 0 20px var(--pink)";
        //document.getElementById(id).style.cursor = "move";
    }
}

function TrashDragExit(ev, id) {
    if (mode == "MoveMode") {
        ev.preventDefault();
        document.getElementById(id).style.boxShadow = "none";
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
        document.getElementById(id).style.boxShadow = "none";
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