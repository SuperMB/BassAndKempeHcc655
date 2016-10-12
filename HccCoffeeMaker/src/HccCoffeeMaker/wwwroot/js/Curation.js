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
    //document.getElementById(id).style.cursor = "move";
}

function DragExit(ev, id) {
    ev.preventDefault();
    //document.getElementById(id).style.cursor = "default";
}

function Drop(ev, id) {
    ev.preventDefault();
    var draggedElement = document.getElementById(ev.dataTransfer.getData("text"));
    var parent = draggedElement.parentNode.parentNode;
    parent.style.display = "none";

    var form = document.getElementById("dropAreaID");
    var parentHidden = document.getElementById(parent.id.concat("Hidden"));
    parentHidden.appendChild(draggedElement.cloneNode(true));
    var parentHiddenCopy = parentHidden.cloneNode(true);
    form.appendChild(parentHiddenCopy);
    parentHiddenCopy.style.display = "inline-block";
}

function SubmitForm()
{
    document.getElementById("createForm").submit();
}