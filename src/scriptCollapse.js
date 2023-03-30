console.log("scriptCollapse.js loaded");

const collapseContent = document.getElementsByClassName("collapse-content");
const buttonCollapse = document.getElementsByClassName("collapse-trigger");


for (let i = 0; i < buttonCollapse.length; i++) {
    buttonCollapse[i].addEventListener("click", function() {
        invertDisplay(buttonCollapse[i], collapseContent[i]);
    });
    buttonCollapse[i].style.backgroundImage = "url('images/expand.svg')";
}

function invertDisplay(self, element) {
    if (element.style.display === "none") {
        element.style.display = "flex";
        self.style.rotate = "0deg";
    } else {
        element.style.display = "none";
        self.style.rotate = "-90deg";
    }
}