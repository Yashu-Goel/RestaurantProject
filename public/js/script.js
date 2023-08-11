window.onscroll=function(){
    setSticky();
};

var features = document.querySelector(".features");
var navigation=document.querySelector("nav");

// if(features!=nuull){
function setSticky(){

    if(features){
    var dftop=features.offsetTop;
    if(window.pageYOffset>dftop){
        navigation.classList.add("sticky");
    }else if(window.pageYOffset<dftop){
        navigation.classList.remove("sticky");
    }}
}
// }