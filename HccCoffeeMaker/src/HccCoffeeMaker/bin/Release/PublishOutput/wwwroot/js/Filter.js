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

    var facetAddedCopy = document.getElementById(facetAddedId).cloneNode(true);
    var formField = document.getElementById("formField");
    formField.appendChild(facetAddedCopy);
    facetAddedCopy.style.display = "block";
    facetAddedCopy.style.position = "relative";
    facetAddedCopy.style.zIndex = "2";
    facetAddedCopy.style.float = "left";

}

function MoveToSelectionFromFilters(ev, id) {
    document.getElementById("inputForm").submit();
}