function populate() {
    document.getElementById("backgroundColor").value = localStorage.getItem("backgroundColor");
    document.getElementById("fontColor").value = localStorage.getItem("fontColor");
}

document.getElementById("backgroundColor").addEventListener("change", e => {
    let backgroundColor = document.getElementById("backgroundColor").value;
    if (backgroundColor == "") {
        backgroundColor = "#ffffff";
    }
    localStorage.setItem("backgroundColor", backgroundColor);
});

document.getElementById("fontColor").addEventListener("change", e => {
    let fontColor = document.getElementById("fontColor").value;
    if (fontColor == "") {
        fontColor = "#000000";
    }
    localStorage.setItem("fontColor", fontColor);
});

document.body.onload = populate;
