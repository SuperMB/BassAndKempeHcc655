var count = 0;

function over(id) {
    if (document.getElementById(id).style.backgroundColor == "var(--yellow)")
        document.getElementById(id).style.backgroundColor = "var(--pink)";
    else
        document.getElementById(id).style.backgroundColor = "var(--navyTransparent)";

    document.getElementById(id).style.cursor = "pointer";
}

function out(id) {
    if (document.getElementById(id).style.backgroundColor == "var(--pink)")
        document.getElementById(id).style.backgroundColor = "var(--yellow)";
    else
        document.getElementById(id).style.backgroundColor = "var(--navy)";

    document.getElementById(id).style.cursor = "default";
}

function removeSelectorAndShowOriginal(selectorId) {
    var facetId = selectorId.substring(0, selectorId.length - 5);
    var facetAdded = document.getElementById(selectorId);
    var facet = document.getElementById(facetId);

    facetAdded.style.display = "none";
    //facet.style.visibility = "visible";
}


function clickFacet(id) {
    var element = document.getElementById(id);

    if (element.style.backgroundColor == "var(--pink)") {
        clickClose(id.concat("AddedClose"));
    }
    else {
        var background = document.getElementById("myDiv");
        background.style.display = "block";
        var elementFacets = document.getElementById(id.concat("Added"));
        //element.style.visibility = "hidden";
        elementFacets.style.display = "inline-block";
    }
}

function clickClose(id) {
    var background = document.getElementById("myDiv");
    background.style.display = "none";

    var facetAddedId = id.substring(0, id.length - 5);
    removeSelectorAndShowOriginal(facetAddedId);

    var facetId = facetAddedId.substring(0, facetAddedId.length - 5);
    var facet = document.getElementById(facetId);
    facet.style.backgroundColor = "var(--navyTransparent)";
    facet.style.boxShadow = "0 0 0";
    facet.style.color = "var(--lightSeafoam)";

    var facetAdded = document.getElementById(facetAddedId);
    facetAdded.style.display = "none";
    facetAdded.style.position = "absolute";
    facetAdded.style.zIndex = "3";
    facet.appendChild(facetAdded);
    //var facetAddedHead = document.getElementById(facetAddedId.concat("Head"));

    facet.parentNode.insertBefore(facetAdded, facet);

    document.getElementById(facetAddedId.concat("Select")).style.display = "";

    count--;
    if (count == 0)
        document.getElementById("rightArrow").style.display = "none";


    var checkBoxes = document.getElementById(facetAddedId).getElementsByTagName('input');
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type == "checkbox")
            checkBoxes[i].checked = false;
    }

}

function clickSelect(id) {
    var background = document.getElementById("myDiv");
    background.style.display = "none";

    var facetAddedId = id.substring(0, id.length - 6);
    removeSelectorAndShowOriginal(facetAddedId);

    var facetId = facetAddedId.substring(0, facetAddedId.length - 5);
    var facet = document.getElementById(facetId);
    facet.style.backgroundColor = "var(--yellow)";
    facet.style.boxShadow = "0 0 20px var(--navy)";
    facet.style.color = "var(--navy)";

    var facetAdded = document.getElementById(facetAddedId);
    var formField = document.getElementById("formField");
    formField.appendChild(facetAdded);
    facetAdded.style.display = "inline-block";
    facetAdded.style.position = "relative";
    facetAdded.style.zIndex = "2";
    //facetAdded.style.float = "left";

    count++;

    document.getElementById(facetAddedId.concat("Select")).style.display = "none";

    document.getElementById("rightArrow").style.display = "block";
}

function MoveToSelectionFromFilters(ev, id) {
    document.getElementById("inputForm").submit();
}

function MoveToTypeSelectFromFilters(ev, id) {
    document.getElementById("inputForm2").submit();
}
