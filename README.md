<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
</head>

<body>
    <nav>
        <img src="img/logo.png" alt="Logo">
    </nav>

    <main>
        <div class="box">
            <img src="img/start.png" alt="star">

            <h1>NFC POAP
                <A> GENERATOR </A>
            </h1>
            <p>
                Is a service that t0fu.tech provide to the
                POAP community as a way to generate random links
                to deliver mint links though NFC technology.
            </p>
            <div class="drag-Area">
                <img src="img/upload.png" alt="uploadicon" href="#">
                <header id="dragText">Drag your file with poap links here</header>
                <h6> TXT file max 5MB </h6>
                <input type="file" id="upload" style="display: none;">
                <label class="upload-button" for="upload">SELECT FILE</label>
            </div>
            <div class="email">
                <p>Enter your email to save your links</p>
                <input type="email" name="email" id="email">
                <button class="getlink" id="btn"> GET LINK </button>
            </div>
        </div>
    </main>

    <footer>

    </footer>
</body>
<script>const dropArea = document.querySelector(".drag-Area");
dragText = dropArea.querySelector("header");
button = dropArea.querySelector("button");
input = dropArea.querySelector("input");


let file;
let emails = [];

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


        // example {id:1592304983049, title: 'Deadpool', year: 2015}
        const addEmails = (ev)=>{
          ev.preventDefault();  //to stop the form submitting
          let email = {
              id: Date.now(),
              title: document.getElementById('email').value,
              
          }
          emails.push(email);
         // document.forms[0].reset(); // to clear the form for the next entries
          //document.querySelector('email').reset();

          //for display purposes only
           console.warn('added' , {emails} );
          let pre = document.querySelector('#msg pre');
          pre.textContent = '\n' + JSON.stringify(emails, '\t', 2); 

          //saving to localStorage
          localStorage.setItem('Emails', JSON.stringify(emails) );
      }
      document.addEventListener('DOMContentLoaded', ()=>{
          document.getElementById('btn').addEventListener('click', addEmails);
      });</script>
</body>

</html>
