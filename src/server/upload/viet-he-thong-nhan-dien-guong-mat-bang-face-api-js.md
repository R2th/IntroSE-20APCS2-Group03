Nhắc đến nhận diện gương mặt thì nhắc đến một cái gì đó đao to búa lớn như là Machine Learning cùng với một số thuận ngữ mang tầm vĩ mô như Deep Learning, Training Model, Neural Network, vân vân và mây mây. Đứng dưới góc độ của một thằng Developer quèn thì mình không đủ sức dùng Machine Learning hay gì cả. Cho nên mình xin chia sẻ các bạn một cách đơn giản hơn để thực hiện việc nhận dạng gương mặt chỉ bằng Javscript với face-api-js.

Giới thiệu về [face-api-js](https://github.com/justadudewhohacks/face-api.js/)
------------------------------------------------------------------------------

[face-api-js](https://github.com/justadudewhohacks/face-api.js/) là một Javascript API dùng để nhận diện gương mặt trên Browser cũng như NodeJS sử dụng Tensorflow.js. 

Link github: [https://github.com/justadudewhohacks/face-api.js/](https://github.com/justadudewhohacks/face-api.js/) ![](https://user-images.githubusercontent.com/31125521/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif)

### Một số tính năng chính

*   Nhận diện gương mặt.
*   Nhận điện Face Landmark (Không biết dịch ra tiếng việt là gì luôn).
*   Dự đoán tuổi và giới tính.

Các bước thực hiện
------------------

Trước khi bắt đầu thì có một điều quan trọng nó là như thế này. Nhận diện gương mặt bao gồm 2 bước.

1.  Phát hiện gương mặt.
2.  Nhận diện gương mặt.

Chuẩn bị
--------

Đầu tiên tạo một folder cơ bản nhé.

```bash
mkdir face
touch index.html
touch script.js
mkdir data // Dùng để bỏ dữ liệu ảnh đầu vào
mkdir images // Ảnh dùng để test
mkdir models // Chứa các pre-train model
face-api-js.min.js // Tải từ github ở trên về.
```

Dữ liệu models tải ở: [https://github.com/justadudewhohacks/face-api.js/tree/master/weights](https://github.com/justadudewhohacks/face-api.js/tree/master/weights) . 

Các bạn cứ ném hết vào thư mục models nhé. Dù dùng không hết đâu. Cấu trúc thư mục sẽ như sau ![](https://htknguyen.com/wp-content/uploads/2019/10/Selection_003.png) 

Ở file html thì đơn giản mình chỉ để cái ảnh vào thôi. Và một thẻ canvas để hiển thị cái box của gương mặt.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="./face-api.min.js"></script>
    <script src="./script.js"></script>
    <title>Face Recognition</title>
    <style>
        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>

<body>
    <img id="myImg" src="images/nancy.jpg" />
    <canvas id="myCanvas">
</body>

</html>
```

1.  Load Model vào trong dự án
2.  Dùng hàm `detectSingleFace` để phát hiện ra gương mặt ở trong ảnh
3.  Dùng hàm `FaceMatcher` và `findBestMatch` để nhận diện gương mặt.

Load Model vào trong dự án
--------------------------

Đầu tiên là load model vào. Ở đây sử dụng 3 model chính.

*   ssdMobilenetV1 Model: Đây là pre-trained model dùng để phát hiện gương mặt.
*   faceLandmark68Net Model: Đây là pre-trained model dùng để hiển thị được các điểm xung quanh mặt của mình.
*   FaceRecognitionNet Model: Đây là pre-trained model dùng để nhận dạng gương mặt.

Các bạn có thể đọc thêm chi tiết của các model này ở trong link Github ở trên nhé. Tại sao phải load model faceLandmark68Net? Câu trả lời là nhờ vào faceLandmark68Net thì mình phải có thể "nhận dạng" được gương mặt. Nên cho dù không dùng cũng phải load vào. ![](https://www.researchgate.net/profile/Sebastien_Marcel/publication/37434867/figure/fig1/AS:309878666088448@1450892239254/Example-face-image-annotated-with-68-landmarks.png) 
Ví dụ về Landmark68Net 

Vì thế trong file `script.js`thì mình sẽ load 3 model này vào trước.

```javascript
(async () => {
  // Load model
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
})();
```

Phát hiện gương mặt
-------------------

Sau khi load xong model thì mình bắt đầu viết phần phát hiện gương mặt.

```javascript
(async () => {
  // Load model
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

  // Detect Face
  const input = document.getElementById("myImg");
  const result = await faceapi
    .detectSingleFace(input, new faceapi.SsdMobilenetv1Options())
    .withFaceLandmarks()
    .withFaceDescriptor();
  const displaySize = { width: input.width, height: input.height };
  // resize the overlay canvas to the input dimensions
  const canvas = document.getElementById("myCanvas");
  faceapi.matchDimensions(canvas, displaySize);
  const resizedDetections = faceapi.resizeResults(result, displaySize);
  console.log(resizedDetections);
})();
```

Kết quả như sau
![](https://htknguyen.com/wp-content/uploads/2019/10/Selection_004-1024x526.png) 
Đuông Cy :sexy: - À không, Nancy :sexy:

Hàm `detectSingleFace()`sẽ trả về kết quả là phát hiện được gương mặt và trả về tọa độ của gương mặt như trên ảnh.

Nhận diện gương mặt
-------------------

Sau khi phát hiện được gương mặt thì lúc này mình sẽ viết hàm `detectNancyFace()` dùng để nhận diện gương mặt của Nancy :sexy:

```javascript
async function detectNancyFace() {
  const label = "Nancy";
  const numberImage = 5;
  const descriptions = [];
  for (let i = 1; i <= numberImage; i++) {
    const img = await faceapi.fetchImage(
      `http://localhost:5500/data/Nancy/${i}.jpg`
    );
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    descriptions.push(detection.descriptor);
  }
  return new faceapi.LabeledFaceDescriptors(label, descriptions);
}
```

Sau đó, mình sử dụng hàm `detectNancyFace()`để nhận diện gương mặt và vẽ cái box quanh gương mặt.

```javascript
(async () => {
  // Load model
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

  // Detect Face
  const input = document.getElementById("myImg");
  const result = await faceapi
    .detectSingleFace(input, new faceapi.SsdMobilenetv1Options())
    .withFaceLandmarks()
    .withFaceDescriptor();
  const displaySize = { width: input.width, height: input.height };
  // resize the overlay canvas to the input dimensions
  const canvas = document.getElementById("myCanvas");
  faceapi.matchDimensions(canvas, displaySize);
  const resizedDetections = faceapi.resizeResults(result, displaySize);
  console.log(resizedDetections);

  // Recognize Face
  const labeledFaceDescriptors = await detectNancyFace();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);
  if (result) {
    const bestMatch = faceMatcher.findBestMatch(result.descriptor);
    const box = resizedDetections.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.label });
    drawBox.draw(canvas);
  }
})();
```

Kết quả như sau 
![](https://htknguyen.com/wp-content/uploads/2019/10/Selection_005-1024x526.png) 
Sau khi nhận dạng được Đuông Cy

Nếu như mình đưa một tấm ảnh không phải là Nancy, ở đây ví dụ mình đưa Trump vào, thì nó sẽ hiện kết quả là Unknown. 
![](https://htknguyen.com/wp-content/uploads/2019/10/Selection_006-1024x522.png) Kết quả sau khi nhận diện Đỗ Nam Trung

Đến đây thì mình đã hoàn thành hệ thống nhận điện đơn giản chỉ bằng Javascript.

Mở rộng
-------

Các bước ở trên thì nó chỉ nhận dạng được một gương mặt của Nancy thôi. Minh muốn nó nhận diện được thêm nhiều người nữa thì phải làm sao? Ví dụ như nhận diện Nancy và Yeonwoo thì làm thế nào? Rất đơn giản, mình chỉ cần tạo folder Yeonwoo và thêm data vào đó. Mình sẽ sửa hàm `detectNancyFace()` thành `detectAllLabeledFaces()`

```javascript
async function detectAllLabeledFaces() {
  const labels = ["Nancy", "Yeonwoo"];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `http://localhost:5500/data/${label}/${i}.jpg`
        );
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detection.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
```

Nhớ sửa cả hàm chính của file `script.js`nữa nhé

```javascript
  // Recognize Face
  const labeledFaceDescriptors = await detectAllLabeledFaces();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);
  if (result) {
    const bestMatch = faceMatcher.findBestMatch(result.descriptor);
    const box = resizedDetections.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.label });
    drawBox.draw(canvas);
  }
```

Kết quả sau khi mình sửa ảnh thành Yeonwoo như sau ![](https://htknguyen.com/wp-content/uploads/2019/10/Selection_007-1024x522.png) 
Kết quả sau khi nhận diện Yeonwoo

Phát triển
----------

Dựa vào bài này, các bạn có thể phát triển thành một dự án vui vẻ hơn. Ví dụ như clone lại cái [Nhận Diện Jav Idol](https://toidicodedao.com/tag/series-nhan-dien-idol/) của anh Hoàng Code Dạo chẳng hạn. Hoặc hệ thống điểm danh nhận diện gương mặt chẳng hạn. Ngoài ra, face-api-js còn có các hàm dùng để xác định tuổi, cảm xúc nữa. Nên các bạn đem ra vọc vạch thử cũng vui. Ví dụ như đưa một tấm hình vào và đoán xem ngườ ta bao nhiêu tuổi, như cái [https://www.how-old.net/](https://www.how-old.net/) của Micro$oft chẳng hạn.

Kết luận
--------

Trên đây là bài viết giới thiệu về face-api-js API và cách sử dụng đơn giản của nó. Chú ý là hệ thống nhận diện này được sử dụng bằng các pre-trained model mà không qua bất kì một bước phức tạp nào để tranfer dữ liệu từ pre-trained model nên độ chính xác ở mức tương đối. Không thể nào được như Deep Learning được nhé. Đôi khi mình để ảnh Yeonwoo vào mà nó nhận diện ra Nancy (Chứng tỏ là gái Hàn con nào cũng giống giống nhau). 
 
Các bạn có thể xem source code tại link [Github](https://github.com/nguyen47/face-recognize) của mình nhé. 

Hy vọng các bạn đã thích bài này.

p/s: Đây là lần đầu tiên mình viết bài về code. Bạn nào hứng thú thì có thể ghé thăm blog của mình ở [đây](https://htknguyen.com/) để nghe mình xàm nhé.

> Tình hình là vì mốt số lý do nào đó nên link ảnh bị mất. Các bạn nếu follow theo mà vẫn chưa hoàn chỉnh thì vào [blog mình](https://htknguyen.com/viet-he-thong-nhan-dien-guong-mat-bang-face-api-js/) để xem hình ảnh minh họa đầy đủ nhé. Mình cảm ơn ạ.