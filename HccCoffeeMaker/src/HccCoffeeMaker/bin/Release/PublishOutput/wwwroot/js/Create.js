
var options = {};
var callback = lolFoo;
var metadata;

function GetJson() {
    var url = document.getElementById("url").value;
    bsService.loadMetadata(url, options, callback);
}

function lolFoo(err, mmd_and_metadata) {
    metadata = BSUtils.unwrap(mmd_and_metadata.metadata);
    console.log(metadata)
    var json = JSON.stringify(metadata);
    document.getElementById("metaData").value = json;
    document.getElementById("metaData").style.display = "inline";
}
var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf']);
