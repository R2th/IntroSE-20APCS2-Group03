### Bé nhà tôi ngày nào cũng muốn được ba đọc ehon cho nghe
Con gái tôi sắp 2 tuổi, và rất thích đọc truyện Ehon. Trước khi đi ngủ, tối nào nó cũng tự chọn 1 quyển truyện rồi mang ra cho tôi đọc. Vì công việc, có những ngày tôi phải đi công tác, hai ba con không thể gặp nhau. Nếu trong những ngày tôi đi vắng đó, bé vẫn được nghe giọng ba đọc truyện, thì ngày hôm sau, có lẽ bé vẫn sẽ chọn tôi (thay vì mẹ, hay bà...v.v) rồi mang truyện Ehon đến nhờ tôi đọc tiếp. Chính vì thế, tôi đã làm 1 Web Application, tạm gọi là “Ba kể con nghe”. App này có tính năng: Dùng machine learning phán đoán quyển Ehon mà con gái tôi thích, rồi bật nội dung cuốn truyện bằng giọng đọc của tôi. 
![](https://images.viblo.asia/5a9df19f-96bd-48c1-b73e-4b585a1cb7a3.png)

Video

https://twitter.com/i/status/1325425425196015616


Mục đích của app này là để cho con gái tôi dùng. Vì thế, tôi đã để màn hình của app đơn giản hết mức. Chỉ cần bé giơ quyển Ehon lên camera, thì ngay lập tức giọng tôi đọc truyện sẽ được bật lên. Dưới đây là màn hình thực tế khi dùng.
![](https://images.viblo.asia/89af64df-3376-491f-a8b3-7282b8a51bb0.png)


Ngoài ra, để biết được thông tin "con gái đã dùng app khi nào", tôi đã thêm chức năng "thông báo" bằng LINE Notify. Hehe, đây là chức năng tôi tự thưởng cho bản thân. Khi ngồi trên tàu điện về nhà, tôi sẽ vừa mỉm cười vừa check: "À, hôm nay con gái đã nghe những truyện này!", tận hưởng niềm vui nho nhỏ của người lần đầu làm cha. 

### Các thành phần cấu thành app này
１．Sử dụng Teachable Machine. Cho máy học những quyển Ehon mà con gái tôi thích thú. Sau đó phát hành link dùng để nhúng Model.

![](https://images.viblo.asia/0565bb94-65dc-4f2b-9965-1679c0494c16.png)


２．Dùng Model learning, mI5 để load. Cái này chạy trên Frontend.
```
sample.html
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
```
 
```
sample.js
// URL của Model đã tạo
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/XXXXX/';

// Load model tự tạo
classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, () => {
// Hoàn thành Load
console.log('Model Loaded!');
});
```
 
３．Implement sao cho: từ kết quả phán đoán của model learning, file âm thanh thu giọng sẽ được bật lên.
```
sample.html
<audio id="sound-file1" preload="auto">
  <source src="https://dotup.org/uploda/dotup.org2302152.mp3" type="audio/mp3" controls>
</audio>
```
 
```
sample.js
function storytelling1(){
  //Tạo file âm thanh
  document.getElementById('sound-file1').play();
  //Access vào Webhook
  sendWebhook(' Đọc truyện「Do you want a Hug?」');
}
```
 
４．Sử dụng axios, sẽ access được vào WebhookURL của Integromat khi nguồn âm thanh được chạy.
```
sample.html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
 
```
sample.js
// Thêm message muốn gửi vào đối số argument
async function sendWebhook(message) {
// Gửi lên Integromat
try {
// WebhookURL của Integromat đã lấy được
const res = await axios.get(`https://hook.integromat.com/XXXXXXXXXXXXXXXXXXXXXXXXXX?message=${message}`);
console.log(res.data);
} catch (err) {
console.error(err);
}
}
```
 
５．Sử dụng Integromat, liên kết LINE Notification với WebhookURL, thông báo 「読み聞かせ」/Ba kể con nghe đã được chạy (bé đã dùng app).

![](https://images.viblo.asia/f46e6ed8-1605-4eea-a67d-30ba1630f466.png)


### Source code
storytelling.html
<!DOCTYPE html>
```
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Storytelling</title>
  </head>

  <body>
    <h1>Storytelling</h1>
    <div id="console_log"></div>
    <video id="myvideo" width="640" height="480" muted autoplay playsinline></video>
    <audio id="sound-file1" preload="auto">
        <source src="https://dotup.org/uploda/dotup.org2302152.mp3" type="audio/mp3" controls>
    </audio>
    <audio id="sound-file2" preload="auto">
        <source src="https://dotup.org/uploda/dotup.org2302153.mp3" type="audio/mp3" controls>
    </audio>
    <audio id="sound-file3" preload="auto">
        <source src="https://dotup.org/uploda/dotup.org2302151.mp3" type="audio/mp3" controls>
    </audio>

    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script>
      // URL của model đã tạo
      const imageModelURL = 'https://teachablemachine.withgoogle.com/models/XXXXXXX/';

      console.log = function (log) {
      document.getElementById('console_log').innerHTML = log;
      }

      async function main() {
        // Get ảnh từ Camera
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });

        // Get DOM "myvideo" tương ứng với ID
        const video = document.getElementById('myvideo');

        // Set ảnh camera vào video
        video.srcObject = stream;

        // Load model tự tạo
        classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, () => {
          // Hoàn tất việc load
          console.log('Model Loaded!');
        });

        // Thực hiện liên tiếp việc xử lý phân loại
        function onDetect(err, results) {
          if (results[0]) {
              console.log(results[0].label);
              //Phát giọng đọc
              if (results[0].label === 'Do you want a Hug?') {
              // Run tham số storytelling 
                 storytelling1();
              }
              if (results[0].label === 'おつきさまこんばんは/Xin chào ông trăng') {
                 storytelling2();
              }
              if (results[0].label === 'だるまさんと/Lật đật Daruma') {
                 storytelling3();
              }
            }
          classifier.classify(onDetect);
        }
        classifier.classify(onDetect);
      }

      // Thêm message muốn gửi vào đối số
      async function sendWebhook(message) {
      // Gửi vào Integromat
      try {
      // WebhookURL của Integromat đã lấy về
      const res = await axios.get(`https://hook.integromat.com/XXXXXXXXXXXXXXXXXXXXXXXXXX?message=${message}`);
      console.log(res.data);
        } catch (err) {
      console.error(err);
       }
      }

      function storytelling1(){
            //Bật file âm thanh
            document.getElementById('sound-file1').play();
            sendWebhook('Đọc truyện「Do you want a Hug?」');
      }

      function storytelling2(){
            //Bật file âm thanh
            document.getElementById('sound-file2').play();
            sendWebhook('Đọc「おつきさまこんばんは」/xin chào ông trăng');
      }

      function storytelling3(){
            //Bật file âm thanh
            document.getElementById('sound-file3').play();
            sendWebhook('Đọc「だるまさんと」/Lật đật daruma');
      }
      // Run
      main();

    </script>
  </body>
</html>
```
 
### Cảm nhận khi sử dụng machine learning để làm app

Khi bản thân tự tìm hiểu, vọc vạch với keyword Machine learning, tôi đã nghĩ là sẽ phải học rất nhiều thứ. Tuy nhiên, khi dùng các công cụ như TeachableMachine..v.v, thì tôi đã có thể tạo được model learning một cách dễ dàng. Ngoài ra, cá nhân tôi cảm thấy việc sử dụng model từ các library như mI5 cũng không quá khó.  
Có lẽ mỗi model type sẽ có những hạn chế nhất định. Tuy nhiên tôi vẫn muốn vừa dùng vừa học thêm.

### P/S
・Tôi cũng đã suy nghĩ tới phương án: Chụp ảnh các trang trong ehon, lồng giọng mình vào rồi cho chạy video. Tuy nhiên, con gái tôi thường đọc Ehon trước khi đi ngủ. Nếu bé cứ liên tục nhìn vào màn hình phát sáng, thì bé sẽ không buồn ngủ nữa. Vì vậy, tôi đã chọn phương án là: Cho chạy file âm thanh (còn hình ảnh thì bé vẫn cần mở sách ehon ra xem).
・Đối với tôi, việc đọc ehon cho con nghe nằm trong TOP3 những điều tôi muốn làm khi ở cùng con mình. Tôi sẽ cố gắng nghĩ thêm nhiều idea, để có thể dành cho con những khoảng thời gian tốt đẹp, vui vẻ hơn.

Link bài gốc: https://sal.vn/SWZi5X