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
                    if (comparisonRows[i].children[j].innerText != "") {
                        if (thisCount <= 0.2 * max)
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

        document.getElementById("goBackText").style.display = "none";
        document.getElementById("goBackToSelectionText").style.display = "block";
    }
}

function Judgement(ev, id) {
    if (perspective == "Selection") {
        document.getElementById("inputForm").submit();
        //return true;
    }
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

        document.getElementById("goBackText").style.display = "block";
        document.getElementById("goBackToSelectionText").style.display = "none";
    }
}




