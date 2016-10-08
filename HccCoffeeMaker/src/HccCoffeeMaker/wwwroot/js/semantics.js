function lolFoo(err, mmd_and_metadata) {
    var metadata = BSUtils.unwrap(mmd_and_metadata.metadata);
    console.log(metadata)

    metadata.
}
var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf']);

var options = {};
var callback = lolFoo;
bsService.loadMetadata("https://en.wikipedia.org/wiki/Cat", options, callback);

