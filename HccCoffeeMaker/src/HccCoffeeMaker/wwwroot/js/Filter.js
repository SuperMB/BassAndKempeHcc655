var count = 0;

function removeSelectorAndShowOriginal(selectorId) {
    var facetId = selectorId.substring(0, selectorId.length - 5);
    var facetAdded = document.getElementById(selectorId);
    var facet = document.getElementById(facetId);

    facetAdded.style.display = "none";
    //facet.style.visibility = "visible";
}


function clickFacet(id) {
    var background = document.getElementById("myDiv");
    background.style.display = "block";
    var element = document.getElementById(id);
    var elementFacets = document.getElementById(id.concat("Added"));
    //element.style.visibility = "hidden";
    elementFacets.style.display = "inline-block";
}

function clickClose(id) {
    var background = document.getElementById("myDiv");
    background.style.display = "none";

    var facetAddedId = id.substring(0, id.length - 5);
    removeSelectorAndShowOriginal(facetAddedId);

    var facetId = facetAddedId.substring(0, facetAddedId.length - 5);
    var facet = document.getElementById(facetId);
    facet.style.backgroundColor = "var(--navy)";
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