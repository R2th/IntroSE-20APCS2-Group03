Xin chào tất cả các bạn, corona thật sự đang rất ảnh hưởng đến cuộc sống của mỗi chúng ta đặc biệt là việc phải làm remote ở nhà với một cái màn hình máy tính thì thật là không vui chút nào. Nhớ những ngày được đi làm còn có đồng nghiệp hỏi han nhưng nay thui thủi chỉ ta với chiếc máy thì biết làm sao bây giờ. Thôi thì làm một ứng dụng tự chơi **oẳn tù tì** với máy cho vui vậy. Ứng dụng ngày hôm nay mình hướng dẫn các bạn làm thuần mang tính chất giải trí tuy nhiên cũng không nằm ngoài mục đích chia sẻ công nghệ là chính. Kì thực để thực hiện ứng dụng này trên nền tàng web mình cũng đã phải mất khá nhiều thời gian để đọc tài liệu và tìm cách chuyển đổi mô hình sang một framework mới đó là **deeplearn.js** và mình hi vọng rằng ứng dụng này sẽ giúp các bạn cảm thấy vui, hay ít nhất là không cảm thấy buồn chán trong mùa dịch bệnh lan tràn như thế này. OK chúng ta bắt đầu thôi nhé. 

# Game oẳn tù tì 

## Cách chơi thủ công 
Đây là trò chơi có thể nói là kinh điển và cũng là một phương pháp để xác định người chiến thắng trong những cuộc chơi mà chẳng biết phải lựa chọn như thế nào là đúng. Mình thì rất hay dùng phương pháp này với bạn cùng phòng để quyết định xem ai sẽ là người rửa bát sau bữa ăn. Thế nên chắc không phải giải thích nhiều chúng ta cũng đều đã biết đến trò chơi này rồi. Mỗi một người chơi sẽ dùng bàn tay để đưa ra 1 trong 3 hình là **cái búa, cái kéo và tờ giấy**. Lúc đó luật chơi như sau: 
> **Cái kéo cắt được tờ giấy**
> **Tờ giấy bọc được cái búa**
> **Cái búa đập được cái kéo**

Đơn giản như vậy các bạn có thể hình dung nó trong hình sau:

![](https://images.viblo.asia/full/d7970434-78cc-47c4-86a4-e6f40141ff8f.jpg)

Trò chơi này chỉ thực sự có ý nghĩa khi có hai người chơi thôi chứ chẳng ai ngồi một mình lấy tay trái chơi với tay phải cả. Chắc trên đời chỉ có mấy bác dị nhân như lão ngoan đồng Chu Bá Thông trong kiếm hiệp Kim Dung là làm được như vậy thôi. Rất tiếc mình không phải dị nhân như thế nên đành tính cách khác vậy 

## Cách chơi với máy 
Bây giờ muốn chơi với máy mà lại yêu cầu được khua chân múa tay như là chơi với người thật thì chỉ có cách là giúp máy có thể nhìn được các cử chỉ tay của bạn thông qua webcam và hiểu được chúng thông qua các thuật toán AI. Muốn làm được điều đó thì có nhiều cách tuy nhiên mình lựa chọn môi trường phát triển là web vì hai lý do:
* **Thứ nhất: Dễ dùng**: Khi mình vứt một đường link cho người nào muốn chơi thì bất cứ ai cũng có thể chơi được **
* **Thứ hai: Công nghệ mới**: Nếu các bạn theo dõi các bài viết của mình thì đa phần các thuật toán AI trong các bài viết mình đều sử dụng Python để viết tuy nhiên điều đó làm cho mình có hứng thú thử thách với những công nghệ mới trên nền tảng web và **deeplearn.js** là một trong số những cái mà mình thích tìm hiểu. 
*  **Thứ ba: Dễ deploy** vì đơn giản nó chỉ là một trang web tĩnh, các tác vụ training và predict được thực hiện hoàn toàn phía dưới trình duyệt của bạn nên mình không cần phải care nhiều đến việc deploy cũng như monitor các mô hình sau khi deploy nữa. 

OK vậy là việc lựa chọn công nghệ đã hoàn tất. Chúng ta tiền hành xây dựng ứng dụng thôi 

# Sơ lược về deeplearn.js 
## Các khái niệm cơ bản 
**Deeplearn.js** được viết bằng Javascript (tất nhiên rồi không lẽ lại viết bằng C :smiley: ) và nó là một em hàng của bác Google.  Đây là một framework mới và được thiết kế riêng để thực hiện các thuật toán Machine Learning trên trình duyệt. Nó chứa các core package liên quan đến các tác vụ như training mô hình, tương tác với GPU thông qua nhân của WebGL, inference các mô hình pre-trained, vissualization các tập dữ liệu giúp đem đến các cái nhìn trực quan về dataset đó. Có hai ưu điểm khi sử dụng framework này đó là:

* **Tốc độ tính toán**: Thằng deeplearn.js này sẽ sủ dụng trực tiếp tài nguyên GPU trên máy tính cá nhân của chúng ta bằng cách tương tác với GPU thông qua nhân của WebGL. Điều này khiến cho việc training các thuật toán Deep Learning trên trình duyệt trở nên hiệu quả hơn rất nhiều chẳng kém gì khi chúng ta chạy trên PC với Python cả. 
* **Code base gần giống như Tensorflow** thực sự là rất nản nếu như phải học các khái niệm của một framework mới đẻ ra trong khi chỉ để thực hiện một tác vụ tương tự như thế. Thật may là sau một thời gian mày mò tìm hiểu về framework này thì mình thấy cấu trúc code và các khái niệm của nó cũng na ná giống với Tensorflow - một thư viện Deep learning nổi tiếng trên nền tảng Python. Có lẽ rằng cùng hàng của bác Google nên các khái niệm sinh ra cũng khá giống như nhau và vấn đề chỉ còn là thay đổi ngôn ngữ lập trình từ Python sang JS thôi.  Các khái niệm bạn có thẻ tìm thấy trong Deeplearn.js tương tự như Tensorflow như:
    * **Placeholder**
    * **Tensor**
    * **Session**
    * **Graph**
    * **Layer**
    * **Optimizer**

Cài đặt nó cũng rất đơn giản chẳng kém gì trên Python cả. Các bạn có thể sử dụng như sau:

```python 
npm install deeplearn
```
## Lựa chọn mô hình cho nhận diện cử chỉ tay 
Ban đầu mình định sử dụng Deep Learning để triển khai nhưng do máy tính của mình không có GPU (đang làm remote mà) nên đành phải lựa chọn một mô hình khác đơn giản gọn nhẹ hơn để làm demo tạm vậy. Sau khi vọc vạch các mô hnfh khác nhau thì thì quyết định sử dụng một mô hình đơn giản hết mức có thể đó là **KNN** để xây dựng cho bài toán này bởi lẽ đơn giản nó phù hợp cho việc chạy trên phần cứng yếu. Tiếp theo mình bắt đầu tiến hành các bước xây dựng ứng dụng theo trình tự từ trên xuống. Chúng ta tiếp tục nhé 

# Xây dựng giao diện trang web demo 
Có lẽ các bạn thấy hơi ngược là tại sao giao diện lại phải xây dựng trước nhưng với bài toán này thì nó hợp lý đó. Các bạn nên xây dựng giao diện trước bao gồm một màn hình chứa camera và các nút bấm để tiến hành training cho các trạng thái bàn tay. Sau khi đã có giao diện chúng ta mới tiến hành add thêm các chức năng vào để hoàn thiện. Các bước xây dựng giao diện này khá đơn giản thôi nên mình cũng không đi quá sâu các bạn nhé. Cơ bản sẽ qua hai bước như sau:

## Dựng khung HTML 
```html 
<body>
    <div class="page-wrap">
        <div class="container">
            <div class="row" style="display: inline-block; padding-top: 50px">
                <h3 class="title" style="text-align: center">Chơi game oản tù tì trên trình duyệt</h3>
                <h5 class="title" style="text-align: center">Đưa bàn tay vào trong khung hình của camera và nhấn vào nút HỌC.</h4>
            </div>
            <div class="row">
                <div class="column clearfix">
                    <div class="float-right">
                        <video id="cam-video" autoplay=""></video>
                    </div>
                </div>
                <div class="column" style="padding-top: 50px">
                    <div>
                        <button id="train-rock-button" class="button button-outline">Học hình cái búa</button>
                        <span id="train-rock-span">Chưa có dữ liệu</span>
                    </div>
                    <div>
                        <button id="train-paper-button" class="button button-outline">Học hình tờ giấy</button>
                        <span id="train-paper-span"> Chưa có dữ liệu</span>
                    </div>
                    <div class="">
                        <button id="train-scissors-button" class="button button-outline">Học hình cái kéo</button>
                        <span id="train-scissors-span"> Chưa có dữ liệu</span>
                    </div>
                </div>
            </div>
            <div class="row" style="display: flex; justify-content: center; padding-top: 15px;">
                <button class="button-large" id="start-game-button" disabled>Bắt đầu chơi game</button>
            </div>
            <div class="row" style="display: flex; justify-content: center;">
                <span id="game-status">Hãy huấn luyện mô hình trước khi bắt đầu game</span>
            </div>
            <div class="row">
                <div class="column clearfix">
                    <img id="rock-you" src="images/rock.png" class="flip float-right" hidden>
                    <img id="paper-you" src="images/paper.png" class="float-right" hidden>
                    <img id="scissors-you" src="images/scissors.png" class="float-right" hidden>
                    <img id="you" class="float-right" hidden>
                </div>
                <div class="column">
                    <img id="rock-cpu" src="images/rock.png" hidden>
                    <img id="paper-cpu" src="images/paper.png" class="flip" hidden>
                    <img id="scissors-cpu" src="images/scissors.png" class="flip" hidden>
                </div>
            </div>
        </div>
    </div>
</body>
```
## THêm CSS trang trí cho đẹp 
```html 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Game oản tù tì với Tensorflow JS</title>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
    <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
</head>
<style>
.button-large {
  font-size: 1.4rem;
  height: 4.5rem;
  line-height: 4.5rem;
  padding: 0 20rem;
  background-color: green;
}

.button-outline {
    color: green !important;
    border-color: green !important;
}

.flip {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

html, body {
  height: 100%;
}
.page-wrap {
  min-height: 100%;
  /* equal to footer height */
  margin-bottom: -60px; 
}
.page-wrap:after {
  content: "";
  display: block;
}
</style>
```
## Test thử giao diện 
Chúng ta thu được một giao diện đơn giản như sau
![](https://images.viblo.asia/4fe52560-0102-4dbe-a91f-c91b8259cd7a.png)
Việc tiếp theo đó là thêm các xử lý logic vào cho nó. 

# Cài đặt môi trường phát triển 
Các bạn thêm file **package.json** với nội dụng sau:

```json 
{
  "name": "deep-learning-browser-book-rps",
  "version": "0.1.0",
  "license": "",
  "dependencies": {
    "babel-polyfill": "~6.26.0",
    "deeplearn": "~0.5.0",
    "deeplearn-knn-image-classifier": "^0.3.0",
    "milligram": "^1.3.0"
  },
  "scripts": {
    "start": "budo main.js:dist/bundle.js --live --host localhost",
    "watch": "watchify main.js -v --debug -o dist/bundle.js",
    "prep": "yarn && mkdirp dist",
    "build": "browserify main.js -o dist/bundle.js",
    "lint": "eslint main.js",
    "deploy": "yarn build && uglifyjs dist/bundle.js -c -m -o dist/bundle.min.js"
  },
  "browserify": {
    "transform": [
      [
        "babelify",
        {
          "presets": [
            "es2015"
          ],
          "plugins": [
            "syntax-async-functions",
            "transform-regenerator"
          ]
        }
      ]
    ]
  },
  "devDependencies": {
    "babel-plugin-syntax-async-functions": "~6.13.0",
    "babel-plugin-transform-regenerator": "~6.26.0",
    "babel-preset-es2015": "~6.24.1",
    "babelify": "~7.3.0",
    "budo": "^10.0.4",
    "eslint": "~4.11.0",
    "eslint-config-google": "~0.9.1",
    "mkdirp": "~0.5.1",
    "uglify-js": "^3.3.17"
  }
}
```
Sau đó chạy lệnh 
```shell
yarn install 
```
Nếu không có lỗi gì thì tất cả các thư viện cần thiết củ chúng ta sẽ được chứa trong thư mục node_modules 
![](https://images.viblo.asia/e0e711bb-52bb-490a-9e57-224298f9dac3.png)

# Xử lý tương tác với camera 
Chúng ta sẽ sử dụng WebMedia đê tương tác trực tiếp với camera của máy tính và thực hiện show kết quả lên trình duyệt thông qua HTML Canvas. Để thực hiện được điều đó các bạn tiến hành khởi tạo file **main.js** và thêm vào nội dung sau:

```js
// Webcam Image size. Must be 227.
const IMAGE_SIZE = 227;

/**
 * Main application to start on window load
 */
class Main {
    // Init all variables need for this app 
    constructor() {
        this.videoPlaying = false;
        this.video = document.getElementById('cam-video');

        // Setup webcam
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then((stream) => {
            this.video.srcObject = stream;
            this.video.width = IMAGE_SIZE;
            this.video.height = IMAGE_SIZE;

            this.video.addEventListener('playing', ()=> this.videoPlaying = true);
            this.video.addEventListener('paused', ()=> this.videoPlaying = false);
        });
    }
}

window.addEventListener('load', () => new Main());
```

Đoạn code trên thực hiện việc đọc video stream từ camera của laptop các bạn và show lên thẻ video có id là **cam-video**. Để thực hiện đoạn code này chúng ta tạo thư mục **dist** và chạy lệnh 

```
yarn build 
```

Sau khi build xong thì trong thư mục dist sẽ xuất hiện file **bundle.js** chúng ta tiến hành import file này và trong file index.html của chúng ta trước đó. 

```html 
<script src="dist/bundle.js"></script>
```

Sau đó tiến hành chạy lệnh 

```
yarn start 
```
để khởi chạy server. Chúng ta sẽ thấy giao diện như sau:

![](https://images.viblo.asia/b64f9385-46ca-4610-a8f4-9729e5c9ec2a.png)

Tiếp theo chúng ta tiến hành xử lý dữ liệu đầu vào từ camera nhé 

![](https://images.viblo.asia/b49bfa60-6e3c-4763-8cf6-664b6e616d48.gif)


# Training mô hình 
## Import các thư viện cần thiết 
```js 
import {KNNImageClassifier} from 'deeplearn-knn-image-classifier';
import * as dl from 'deeplearn';

// Number of classes to classify
const NUM_CLASSES = 3;
// Webcam Image size. Must be 227.
const IMAGE_SIZE = 227;
// K value for KNN
const TOPK = 10;

const MOVES = [
  'cái búa',
  'tờ giấy',
  'cái kéo',
];

const trainButtonIds = [
  'train-rock-button',
  'train-paper-button',
  'train-scissors-button',
];

const trainSpanIds = [
  'train-rock-span',
  'train-paper-span',
  'train-scissors-span',
];

const gestureYouIds = [
  'rock-you',
  'paper-you',
  'scissors-you',
];

const gestureCpuIds = [
  'rock-cpu',
  'paper-cpu',
  'scissors-cpu',
];
```
Ở đây chúng ta sử dụng mô hình knn nên cần phải khởi tạo nó trong construction. Các bạn tạo một biến như sau:

```js 
        // Initiate deeplearn.js math and knn classifier objects
        this.knn = new KNNImageClassifier(NUM_CLASSES, TOPK);
````

## Code training 

Trong bước training này chúng ta thấy có 3 button là training cái búa, training cái kéo và training tờ giấy. Mục tiêu của phần này là khi click vào mỗi button đó chúng ta sẽ load dữ liệu từ camera và training mô hình trực tiếp từ dữ leiuej đó. Chúng ta thực hiện nó bằng cách tạo một hàm **execute()** trong class Main 

```js 
/**
     * The main deeplearn.js loop
     */
    execute() {
        if (this.videoPlaying) {
            // Get image data from video element
            const image = dl.fromPixels(this.video);

            // Train class if one of the buttons is held down
            if (this.training != -1) {
                // Add current image to classifier
                this.knn.addImage(image, this.training);
            }
        }
        this.timer = requestAnimationFrame(this.execute.bind(this));
    }
```
Hàm này thực hiện việc kiểm tra khi camera được bật thì lấy image từ các frame camera bằng lệnh:
```js 
const image = dl.fromPixels(this.video);
```
Sau đó nếu như mode **this.training** được bật tương ứng với việc bạn ấn chuột vào nút training thì sẽ tiến hành thêm ảnh vào bộ phân lớp với class tương ứng:

```js 
// Train class if one of the buttons is held down
if (this.training != -1) {
    // Add current image to classifier
    this.knn.addImage(image, this.training);
}
```

Việc cần làm tiếp theo là xử lý các sự kiện click vào các button kia 
## Xử lý với giao diện training 
Đầu tiên chúng ta khởi tạo hằng số lưu ID của các button sử dụng để training 
```js 
// Train button ids 
const TRAIN_BUTTON_IDS = [
    'train-rock-button',
    'train-paper-button',
    'train-scissors-button',
];
// Span innertext 
const TRAIN_SPAN_IDS = [
    'train-rock-span',
    'train-paper-span',
    'train-scissors-span',
];
const MOVES = [
    'cái búa',
    'tờ giấy',
    'cái kéo',
];
```
Sau đó thêm 3 hằng số vào để tiến hành tracking các trạng thái của quá trình training 

```js 
        this.training = -1; // -1 when no class is being trained
        this.infoTexts = [];
        this.currentMove = -1;
```

Tiếp theo đó chúng ta tiến hành add thêm các sự kiện vào cho các button bằng cách sử dụng một vòng for trong hàm constructor 

```js 
// Add event listener into buttons 
for (let i = 0; i < NUM_CLASSES; i++) {
    let button = document.getElementById(TRAIN_BUTTON_IDS[i]);
    button.addEventListener('mousedown', () => {
        this.training = i;
        button.innerText = `Đang học ${MOVES[i]}...`;
    });
    button.addEventListener('mouseup', () => {
        this.training = -1;
        button.innerText = `Học hình ${MOVES[i]}...`;
    });
    this.infoTexts.push(document.getElementById(TRAIN_SPAN_IDS[i]));
}
```

## Kiểm tra việc thêm mẫu 

Sau khi add thêm mẫu cần kiểm tra xem dữ liệu đã được thêm vào model thành công chưa bằng cách trả thử kết quả ra console log. Chúng ta thêm dòng sau vào trong hàm **execute()** phía trên phần Code training 

```js 
// Train class if one of the buttons is held down
if (this.training != -1) {
    // Add current image to classifier
    this.knn.addImage(image, this.training);
    // If any examples have been added
    const exampleCount = this.knn.getClassExampleCount();
}
```
Sau đó chúng ta thêm hàm start model vào trong contructor()
```js 
// Load knn model
this.knn.load()
.then(() => this.start());
```
rồi tiến hành add thử ảnh ta có kết quả như sau 
![](https://images.viblo.asia/b49bfa60-6e3c-4763-8cf6-664b6e616d48.gif)

Như vậy là bước thêm ảnh vào model để training đã thành công. Giờ chúng ta sẽ tiến hành show các trạng thái của model để quá trình theo dõi được dễ dàng hơn. Chúng ta thêm vào hàm execute() đoạn xử lý sau:

```js 
// If any examples have been added
const exampleCount = this.knn.getClassExampleCount();
if (Math.max(...exampleCount) > 0) {
    for (let i=0; i<NUM_CLASSES; i++) {
        // Update info text
        if (exampleCount[i] > 0) {
            this.infoTexts[i].innerText = ` ${exampleCount[i]} mẫu`;
        }
    }
}
```
Add thử dữ liệu chúng ta được kết quả như sau:

![](https://images.viblo.asia/3582aee9-00c5-4c90-a726-8050c89cf8dc.png)
Vậy là bước training mô hình bằng cách thêm dữ liệu vào mô hình KNN đã xong. Tại bước training thuật toán KNN chỉ thêm dữ liệu vào trong các cây index của nó. Trong bước predict nó sẽ dựa vào cây index đã được xây dựng để dự đoán ra kết quả tốt nhất. Chúng ta cùng code tiếp phần xử lý predict tiếp sau đây 
## Code predict 
Chúng ta thực hiện tại mỗi frame sẽ predict kết quả dựa vào mô hình được được huấn luyện từ các bước trước. Chúng ta viết lại đoạn code phía trên như sau:

```js 
if (Math.max(...exampleCount) > 0) {
    this.knn.predictClass(image)
    .then((res) => {
        this.currentMove = res.classIndex;
        for (let i=0; i<NUM_CLASSES; i++) {
            // Make the predicted class bold
            if (res.classIndex == i) {
                this.infoTexts[i].style.fontWeight = 'bold';
            } else {
                this.infoTexts[i].style.fontWeight = 'normal';
            }
            // Update info text
            if (exampleCount[i] > 0) {
                this.infoTexts[i].innerText = 
                ` ${exampleCount[i]} mẫu - ${res.confidences[i]*100}%`;
            }
        }
    });
}
```

Thử lại ứng dụng sau khi đã add thêm các mẫu training chúng ta có kêt quả như sau:

![](https://images.viblo.asia/ac6ee777-fd20-45ea-85eb-2439bd5e0428.gif)

Các bạn có thể adđ thêm nhiều mẫu nữa để có được kết quả chính xác hơn nữa nhé. Hơn nữa việc để backgroud khác biệt cũng giúp chomo hình cải thiện đáng kể độ chính xác. Ở đây mình chưa để background khác biệt. Các bạn có thể chỉ lấy background trắng sẽ cho hiệu quả tốt hơn. Bây giờ chung ta sẽ đi sang phần quan trọng nhất và cũng là phần logic nhiều nhất đó chính là logic trò chơi. OK tiếp tục nào 

# Xử lý logic trò chơi 
## Thêm một vài hằng số cần thiết 
```js 

const GESTURE_YOUR_IDS = [
    'rock-you',
    'paper-you',
    'scissors-you',
];

const GESTURE_CPU_IDS = [
    'rock-cpu',
    'paper-cpu',
    'scissors-cpu',
];

const WINNER_MATRIX = [
    [0, 1, -1],
    [-1, 0, 1],
    [1, -1, 0],
];
```
## Xử lý sự kiện click button 
Chúng ta thêm một số hằng số trong hàm khởi tạo để thuận lợi cho quá trình xử lý game 

```js 
this.gaming = false;

// Create button for starting a game
this.startButton = document.getElementById('start-game-button');
this.startButton.onclick = () => {
    this.startGame();
};

this.gameStatus = document.getElementById('game-status');

this.gestureYouImages = gestureYouIds.map((val) => {
    return document.getElementById(val);
});

this.gestureCpuImages = gestureCpuIds.map((val) => {
    return document.getElementById(val);
});

this.youImg = document.getElementById('you');
this.hiddenCanvas = document.createElement('canvas');
this.hiddenCanvas.width = IMAGE_SIZE;
this.hiddenCanvas.height = IMAGE_SIZE;
```

TRên đoạn code trên chúng a thấy rằng khi click vào nút start game thì sẽ call đến hàm startGame(). Giừo chúng ta sẽ tiến hành xử lý trong hàm đó như sau 

```js 
/**
 * Start a game of rock-paper-scissors
 */
startGame() {
    if (this.startButton.disabled) {
        return;
    }
    this.gaming = true;
    this.startButton.disabled = true;
}
```
Chúng ta tiến hành xử lý tiếp một bộ countdown để nhằm mục đích đếm ngược thời gian cho đến khi người dùng ra đòn. Bộ xử lý đó như sau 

## Bộ xử lý countdown 
Chúng ta tạo hẳn một class mới để thuận tiện cho việc extend sau này. 
```js 
/**
 * Countdown in game mode 
 */
class CountDownTimer {
    constructor(duration, granularity) {
        this.duration = duration;
        this.granularity = granularity;
        this.tickFns = [];
        this.running = false;
    }

    start() {
        if (this.running) {
            return;
        }
        this.running = true;
        var tickerFn = () => {
            let diff = this.duration - (Date.now() - this.start);
            if (diff > 0) {
                setTimeout(tickerFn, this.granularity);
            } else {
                diff = 0;
                this.running = false;
            }
            this.tickFns.forEach((fn) => {
                fn(diff);
            });
        }
        this.start = Date.now();
        tickerFn();
    }

    get expired() {
        return !this.running();
    }

    addTickFn(fn) {
        this.tickFns.push(fn);
    }
}
```

## Xử lý logic chính 

Việc cuối cùng là chúng ta sẽ định nghĩa hàm resolveGame() để giải quyết logic chính của game nhé 

```js 
/**
     * Resolve the game
     */
    resolveGame() {
        this.gaming = false;
        let computerMove = Math.floor(Math.random()*3);
        let result = WINNER_MATRIX[computerMove][this.currentMove];
        switch (result) {
            case -1:
                this.gameStatus.innerText = 'Bạn thua rồi. Hãy thử lại nhé';
                break;
            case 0:
                this.gameStatus.innerText = `Không phân thắng bại. Hãy thử lại nhé. `;
                break;
            case 1:
                this.gameStatus.innerText = 'Xin chúc mừng. Bạn đã chiến thắng!';
        }
        for (let i = 0; i < 3; i++) {
            this.gestureCpuImages[i].hidden = (i !== computerMove);
        }
        this.startButton.disabled = false;
        this.hiddenCanvas.getContext('2d').drawImage(
        this.video, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
        this.youImg.src = this.hiddenCanvas.toDataURL();
        this.youImg.onload = () => {
            for (let i = 0; i < 3; i++) {
                this.gestureYouImages[i].hidden = true;
            }
            this.youImg.hidden = false;
        };
    }
```

# Demo 
Các bạn có thể theo dõi link demo trực tiép tại video bên dưới hoặc chơi trực tiếp tại trang mình đã deploy ở đây [https://oantuti.netlify.com/](https://oantuti.netlify.com/)

{@embed: https://www.youtube.com/watch?v=FCsKA4tRC2A}

# Source code
Các bạn có thể tham khảo sourcecode của bài viết tại [đây](https://github.com/toanpv-0639/oantuti). Chúc các bạn luôn có một tâm thế thoải mái và vui vẻ để chống lại đại dịch này