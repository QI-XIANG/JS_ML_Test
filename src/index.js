document.getElementById('fileInput').addEventListener('change', function (event) {
        
    // Initialize Image Classifier with MobileNet.
    const classifier = ml5.imageClassifier('MobileNet');
    
    var files = event.target.files;
    var preview = document.getElementById('preview');
    var result = document.getElementById('result');

    // Clear any existing content
    preview.innerHTML = '';
    result.innerHTML = '辨識圖片中 ...';

    // Loop through all selected files
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Only process image files
        if (!file.type.match('image.*')) {
            continue;
        }

        var imgContainer = document.createElement('div');
        imgContainer.style.marginTop = '10px';
        imgContainer.style.marginBottom = '20px'; // Spacing between each image container

        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxHeight = '500px';
        //img.style.maxWidth = '400px';
        img.style.display = 'block'; // Ensure the image is displayed in a block to put it on a new line
        img.style.marginBottom = '10px';
        img.id = "image";

        var fileInfo = document.createElement('p');
        fileInfo.textContent = `檔案名稱: ${file.name}, 檔案類型: ${file.type}, 檔案大小: ${file.size} bytes`;
        fileInfo.style.fontSize = '14px';
        fileInfo.style.marginTop = '0';

        // Append the image and file info to the container
        imgContainer.appendChild(img);
        imgContainer.appendChild(fileInfo);

        // Append the container to the preview div
        preview.appendChild(imgContainer);
    }


    if(document.getElementById("image") != null) {
        //document.getElementById("image").style.objectFit = "contain";
        classifier.classify(document.getElementById("image"), gotResult);
    }

});

// Function to run when results arrive
function gotResult(error, results) {
    const element = document.getElementById("result");
    if (error) {
        element.innerHTML = error;
    } else {
        let num = results[0].confidence * 100;
        element.innerHTML = "圖片辨識結果: " + results[0].label + "<br>信心水準: " + num.toFixed(2) + "%";
    }
}