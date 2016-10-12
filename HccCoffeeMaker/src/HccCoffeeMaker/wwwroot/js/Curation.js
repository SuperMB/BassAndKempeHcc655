function Dragging(ev, id) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(id).style.cursor = "move";
}

function StopDragging(ev, id) {
    document.getElementById(id).style.cursor = "default";
    ev.dataTransfer.setData("text", ev.target.id);
}

function DragEnter(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "move";
}

function DragExit(ev, id) {
    ev.preventDefault();
    document.getElementById(id).style.cursor = "default";
}

function Drop(ev, id) {
        ev.preventDefault();
        var draggedElement = document.getElementById(ev.dataTransfer.getData("text"));
        var parent = draggedElement.parentNode.parentNode;
        parent.style.display = "none";

        var form = document.getElementById("dropAreaID");
        form.appendChild(draggedElement.cloneNode(true));

        //var elementToAppendAfterId = $('#'.concat(id)).prev().prev().attr('id');

        //var draggedNumber = draggedId.match(/\d+$/);
        //$('#'.concat('reviewRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        //$('#'.concat(draggedId)).insertAfter('#'.concat(elementToAppendAfterId));
        //$('#'.concat('moveRow').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
        //$('#'.concat('heightFor').concat(draggedNumber)).insertAfter('#'.concat(elementToAppendAfterId));
}
