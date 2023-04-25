const dropArea = document.querySelector(".drag-Area");
dragText = dropArea.querySelector("header");
button = dropArea.querySelector("button");
input = dropArea.querySelector("input");


let file;

input.addEventListener("change", function () {
  file = this.files[0];
  showFile();
});

//user drag file over area//
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload";
});

//user leave area without drop the file//
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag your file with poap links here";
});

//user drop the file on area//
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

async function showFile() {
  let fileType = file.type;
  let validExtensions = ["text/plain"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    let textDecoder = new TextDecoder();
    fileReader.onload = function () {
      let buffer = fileReader.result;
      let text = textDecoder.decode(buffer);
      let lines = text.split('\n').map(line => line.trim());
      uploadFile(lines);
    }
    fileReader.readAsArrayBuffer(file);
  } else {
    alert("Please select a txt file.");
  }
}


async function uploadFile(url) {
  const linksArray = url;
  const linksMap = {
    'e-mail':"email",
    'links': linksArray
  };
  // starting the upload
  // for localhost you can use: http://localhost:5000 after semicolon is port number. 
  let response = await fetch('http://localhost:5000/gerenciador', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(linksMap)
  });


  // upload finished
  if (response.status === 200 || response.status === 201) {
    alert("Uploaded successfully");
  } else {
    alert("Failed to upload");
  }
}