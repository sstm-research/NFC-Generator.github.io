const dropArea = document.querySelector(".drag-Area");
dragText = dropArea.querySelector("header");
button = dropArea.querySelector("button");
input = dropArea.querySelector("input");

let file;



input.addEventListener("change", function(){
  file = this.files[0];
  showFile();
});

//user drag file over area//
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload";
});

//user leave area without drop the file//
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag your file with poap links here";
});
 
//user drop the file on area//
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile(){
  let fileType = file.type;
  let validExtentions = ["text/plain"]
    if(validExtentions.includes(fileType)){
      let fileReader = new fileReader();
      fileReader.onload = () =>{
        let fileURL = fileReader.result; 
        fetch.up
      }
      fileReader.readAsDataURL(file);
    }else{
      alert("Please Select a Txt") 
    }
}