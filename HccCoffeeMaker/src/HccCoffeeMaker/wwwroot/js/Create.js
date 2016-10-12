
var options = {};
var callback = lolFoo;
var metadata;

function GetJson(ev, id) {
    var url = document.getElementById("url").value;
    bsService.loadMetadata(url, options, callback);
}

function lolFoo(err, mmd_and_metadata) {
    metadata = BSUtils.unwrap(mmd_and_metadata.metadata);
    console.log(metadata)
    var json = JSON.stringify(metadata);

    var image = document.getElementById("productImage");
    image.src = metadata["main_images"][0]["location"];
    image.style.visibility = "visible";

    document.getElementById("metaData").value = json;
    //document.getElementById("metaData").style.display = "inline";

    var form = document.getElementById("dropAreaID");

    if (metadata["title"] != undefined) {
        var titleHidden = document.getElementById("titleHidden");
        var titleHiddenItem = document.getElementById("titleHiddenItem");
        titleHiddenItem.value = metadata["title"];
        form.appendChild(titleHidden);
        titleHidden.style.display = "inline-block";
    }

    if (metadata["description"] != undefined) {
        var titleHidden = document.getElementById("descriptionHidden");
        var titleHiddenItem = document.getElementById("descriptionHiddenItem");
        titleHiddenItem.value = metadata["description"];
        form.appendChild(titleHidden);
        titleHidden.style.display = "inline-block";
    }

    if (metadata["price"] != undefined) {
        var titleHidden = document.getElementById("priceHidden");
        var titleHiddenItem = document.getElementById("priceHiddenItem");
        titleHiddenItem.value = metadata["price"];
        form.appendChild(titleHidden);
        titleHidden.style.display = "inline-block";
    }

    document.getElementById("noImage").style.display = "none";
    document.getElementById("productImageContainer").style.display = "block";

    document.getElementById("submitButton").style.display = "inline-block";
}
var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf']);
