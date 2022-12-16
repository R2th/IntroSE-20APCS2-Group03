# p5.js là gì?
[p5.js](https://p5js.org/) là một thư viện Javascript, thường thì nó sẽ sử dụng để dùng làm những thứ linh tinh với đồ họa các thứ sử dụng `canvas`. Các bạn có thể sử dụng p5.js bằng p5 Web Editor ở [đây](https://editor.p5js.org/).
## Sơ qua về p5.js
Ở trong p5.js thì sẽ có hai function quan trọng. Đó là `setup()` và `draw()`.
### `setup()`
Đây là function sẽ chạy ngay lập tức khi chạy. Thường thì hay dùng để config trước khi chạy thực tế.
### `draw()`
Function này sẽ chạy ngay sau thằng `setup()` ở trên. Đây là function chính của p5.js.
# ml5.js là gì?
[ml5.js](https://ml5js.org/) là một thư viện bao gồm các thuật toán và pre-trained models cho browser. ml5.js được build trên nền của tensoeflow.js. Vì thế, mình có thể dùng ml5.js để build một số thứ hay ho dựa trên các pre-trained models có sẵn. 
Lý do mình dùng p5.js trong bài này là vì thằng ml5.js này chơi thân với thằng p5.js nên nó dễ sử dụng hơn.
# Ví dụ 
Bây giờ thì mình làm linh tinh một cái gì đó để ví dụ về cái ml5.js này cho vui. Mình ở đây sẽ làm một cái project vui vui sử dụng poseNet pre-trained model.
# poseNet pre-trained model
poseNet pre-trained model là một pre-trained model dùng để mô phỏng vị trí tay, chân, mắt, mũi, miệng, bla bla bla của con người.
![1_7qDyLpIT-3s4ylULsrnz8A](https://htknguyen.com/content/images/2019/11/1_7qDyLpIT-3s4ylULsrnz8A.png)
## Cấu trúc Project
Về cấu trúc thì đơn giản như sau.
```bash
index.html
nancy.mp4
script.js
```
Trong file `index.html` thì import p5.js và ml5.js vào thôi
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Getting Started with ml5.js</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
    <script src="https://unpkg.com/ml5@0.4.1/dist/ml5.min.js"></script>
  </head>

  <body>
    <script src="script.js"></script>
  </body>
</html>
```
## Load Video bằng function `createVideo` của p5.js
Để load Video thì trong p5.js mình dùng function `createVideo()`. Vì là load video thì mình viết nó trong `setup()`, sau khi load xong rồi thì mới hiển thị đó ra ở `draw()` function. 
```javascript
let video;
let poses = [];
function setup() {
  createCanvas(406, 720);
  video = createVideo(["nancy.mp4"], () => {
    video.loop();
    video.volume(0);
  });
  video.size(width, height);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
}
```
Lúc này kết quả như sau.
![Workspace-1_012](https://htknguyen.com/content/images/2019/11/Workspace-1_012.png)
## Load poseNet pre-trained model
Công việc tiếp theo là mình load tiếp pre-trained model vào. Mình sẽ viết tiếp trong function `setup()` như sau.
```javascript
  poseNet = ml5.poseNet(video, () => {
    console.log("Model is ready");
  });
  // Listen to new 'pose' events
  poseNet.on("pose", function(results) {
    poses = results;
  });
```
## Vẽ skeleton lên Video
Sau khi lắng nghe sự kiện pose ở trên. Nó sẽ trả một mảng các pose, bao gồm các properties như sau:
```javascript
[
  {
    pose: {
      keypoints: [{position:{x,y}, score, part}, ...],
      leftAnkle: {x: 289.23709728843284, y: 739.7039085522032, confidence: 0.02065359242260456}
      leftEar: {x: 259.3518055698328, y: 113.62603513818037, confidence: 0.17528685927391052}
      leftElbow: {x: 312.8670815584952, y: 355.85845010322436, confidence: 0.3681596517562866}
      leftEye: {x: 242.82734312090957, y: 98.04618166204084, confidence: 0.9990793466567993}
      leftHip: {x: 285.8621941282038, y: 423.13189556724143, confidence: 0.2725003957748413}
      leftKnee: {x: 275.85972595214844, y: 682.6726759525767, confidence: 0.9468103647232056}
      leftShoulder: {x: 291.67652035596075, y: 222.69961507696854, confidence: 0.9864554405212402}
      leftWrist: {x: 315.4616281609786, y: 308.55148850825793, confidence: 0.31114229559898376}
      nose: {x: 230.66232273034882, y: 115.1411611992016, confidence: 0.9995276927947998}
      rightAnkle: {x: 187.2091764483535, y: 734.9885826780085, confidence: 0.12924212217330933}
      rightEar: {x: 177.03415412233585, y: 108.54197920414438, confidence: 0.705632746219635}
      rightElbow: {x: 88.15446646171702, y: 364.6860253183465, confidence: 0.6543225646018982}
      rightEye: {x: 209.1365689729389, y: 97.66484712299547, confidence: 0.9994242787361145}
      rightHip: {x: 177.5815705416495, y: 426.5434666683799, confidence: 0.25370630621910095}
      rightKnee: {x: 191.22615238658165, y: 676.1598981890762, confidence: 0.7883720397949219}
      rightShoulder: {x: 127.5505650838216, y: 220.96515889753374, confidence: 0.9299540519714355}
      rightWrist: {x: 119.36843028821443, y: 311.3493300320809, confidence: 0.6887825727462769}
      score: 0.6017089601167861zz
    }
  }
]
```
Từ đây thì mình lặp hết và vẽ skeleton lên thôi.
```javascript
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      strokeWeight(4);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
```
Sau đó để function `drawSkeleton()` này vào function `draw()`
```javascript
function draw() {
  image(video, 0, 0, width, height);
  drawSkeleton();
}
```
Kết quả sẽ như sau
![Alt Text](https://media.giphy.com/media/XbtFIA89HB15RvKDBc/giphy.gif)
# Kết luận
Trên đây là một ứng dụng cơ bản của thằng ml5.js. Ngoài poseNet pre-trained model, thằng ml5.js còn cung cấp một số pre-trained model khác cũng hay ho, ví dụ như là Image Classifier sử dụng [Mobilet Net](https://learn.ml5js.org/docs/#/reference/image-classifier), [FaceApi](https://learn.ml5js.org/docs/#/reference/face-api), hay [YOLO](https://learn.ml5js.org/docs/#/reference/yolo). Các bạn cứ ghé vào trang chủ của ml5.js để ngó qua nhé.
Mình cũng có viết một bài về [Nhận diện gương mặt với face-api-js](https://htknguyen.com/viet-he-thong-nhan-dien-guong-mat-bang-face-api-js/). Các bạn có thể xem thêm nhé.
Các bạn có thể xem source code ở đây: [https://github.com/nguyen47/nancy-skeleton-ml5-js](https://github.com/nguyen47/nancy-skeleton-ml5-js)

Hiện tại mình đang tập tọe viết Blog ở địa chỉ [https://htknguyen.com/](https://htknguyen.com/). Nếu bạn nào có hứng thú thì ghé vào blog của mình nghe mình chém gió loạn lên dưới góc độ một thằng Developer cùi nhé. *Bắn tim*