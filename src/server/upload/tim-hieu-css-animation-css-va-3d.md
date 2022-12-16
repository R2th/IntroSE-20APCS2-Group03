![](https://images.viblo.asia/2e101c62-0be1-412f-b06d-502804b3fa0c.gif)

# Mở đầu
Trong các bài trước, mình đã từng nhắc qua về 3D trong css rồi, [bài này](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM#_3d-transform-10) đã giới thiệu cho các bạn 1 vài sơ lược về sử dụng 3D trong CSS. Và hôm nay mình sẽ đi sâu hơn vào phân tích cách tạo dựng 3D. Trong bài này sẽ hướng dẫn chỉ về CSS, sau này mình sẽ có vài bài về sử dụng Three.js cho hiệu ứng 3D hoàn hảo và 'Awesome' hơn.
# Các thuộc tính chủ yếu tạo nên hiệu ứng 3D
## Perspective

Lúc trước mình có nhắc đến khái niệm Perspective rồi, bạn có thể đọc lại tại [đây](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM#_perspective--translatez-11). Tóm tắt lại: `perspective` định nghĩa luật xa gần và điểm hội tụ cho ảnh mà bạn nhìn thấy, hay còn được biết như điểm hội tụ khi vẽ tranh vậy, vị trí điểm hội tụ được quy định bởi `perspective-origin`. Bởi vậy, khi muốn sử dụng 3D nhớ hãy định nghĩa `perspective` trước nhé, `perspective-origin` thì có defalut 50%, 50%.

[Xem VD trên codepen](https://codepen.io/desandro/pen/bMqZmr)
{@embed: https://codepen.io/desandro/pen/bMqZmr}
## 3D transform function
Về transform thì mình cũng đã giới thiệu sơ qua cũng trong bài trên, 3D có đầy đủ các function của 2D (tất nhiên) và thêm 1 vài function nữa (do có thêm trục z). Đầy đủ về transform có thể xem tại đây: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function
### Rotation
[Xem thêm](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM#_rotate-in-3d-12)
### Scale
Sử dụng để điều chỉnh kích thước (co, giãn) đối tượng.

`scaleZ()`: giãn theo chiều Z (giống như thổi bóng bay dài hoặc bóng ba con sói ấy, nó dãn ra theo chiều trước mặt bạn - trục z so với mắt)

`scale3d()`: function tổng hợp rút gọn giãn theo cả 3 chiều X, Y, Z
### Translate
Sử dụng để quyết địmh đường di chuyển của đối tượng

`translateZ()`: di chuyển theo trục Z

`translate3d()`: function tổng hợp rút gọn di chuyển theo 3 trục X, Y, Z
# Học đi đôi với hành, làm ví dụ cho dễ hiểu
## 3D cho vật thể 2 mặt (lật - xoay thẻ)
### Bài toán
Bắt đầu với đối tượng dễ nhất, chính là 1 hình phẳng, chỉ có 2 mặt, lấy VD ở đây là lá bài khi coi như bề dày của lá bài = 0.
![](https://images.viblo.asia/f5dc73bf-1404-450b-a77d-ca146284c37a.gif)

Nhìn tấm bài này thì có nhận xét như sau: lá bài có 2 mặt khác nhau, 1 mặt 4 rô, 1 mặt là nền bộ bài. Vậy mình sẽ vẽ 2 mặt lá bài khác nhau và úp lưng vào nhau nhé:
```html
<div class="d-container">
    <div class="card">
        <div class="face front">Front</div>
        <div class="face back">Back</div>
    </div>
</div>
```
Ở đây, có 1 div "d-container" bao ngoài chứa lá bài, đây chính là khoảng không gian 3 chiều chứa lá bài mà mình sẽ tạo. Vậy thì như đã nói ở trên, bắt đầu làm việc với 3d thì việc đầu tiên là định nghĩa không gian có `perspective` như nào đã, nhân tiện định hình kích cỡ không gian luôn:
```css
.d-container {
  width: 400px;
  height: 400px;
  perspective: 600px;
}
```
Giờ 2 mặt lá bài đã  được đặt trong không gian 3 chiều, tuy nhiên hiện tại chưa có css gì để xác định hình dạng cho nó nên thêm 1 chút css nữa. Trước hết là mình vẽ mỗi mặt lá bài có chiều rộng 200px, cao 250px, mỗi mặt có 1 màu:
```css
.face {
    width: 200px;
    height: 250px;
}
.front {
    background-color: tomato;
}
.back {
    background-color: lavender;
}
```
và ta sẽ có hiện trạng như này:
![](https://images.viblo.asia/71ef6d5b-7149-4966-883d-072eae2fc097.png)


Hiện tại như bạn thấy thì đáng lẽ thằng 'back' - mặt sau đáng lẽ phải quay lưng với mặt trước phải không? (tức là chữ back bị lật ngược lại theo chiều dọc ấy). Vậy nên mình sẽ xoay lá mặt sau 180 độ theo trục y: 
```css
.back {
  background: lavender;
  transform: rotateY(180deg);
}
```
![](https://images.viblo.asia/e804bef6-b761-4fed-9be1-ffff777cb3a4.png)

Xử lý hiển thị cho 2 mặt đã xong, giờ còn việc dính 2 cái mặt lá bài vào nhau nữa là giống 1 lá bài thật rồi. Để chồng 2 lá lên nhau, mình cần `position: absolute` cho 2 lá. Như vậy thì thằng cha nó (thằng `.card`) phải có `position: relative` trước. 
```css
.card {
    position: relative;
}
.card div {
    width: 200px;
    height: 250px;
    position: absolute;
}
```

Tuy nhiên là hiện tại bạn sẽ thấy thằng mặt sau đang đè lên mặt trước. Để ẩn mặt sau đi, thêm `backface-visibility: hidden;` vào `.face`, vậy là giờ trông nó giống như mong muốn rồi đấy. 

![](https://images.viblo.asia/524fd8ca-c2ca-4863-b84d-9961f4ed61d5.png)


Ơ mà khoan, có gì đó không đúng lắm. Trông có khác méo gì hiển thị mỗi mặt trước, ẩn mặt sau đi đâu? Vậy giờ thử tí effect 3d xem nào. Mình sẽ cho thẳng card này xoay 180 lật mặt xem nhé: sử dụng transform rotate cho cái card:
```css
.card {
      transition: transform 1s; /* xoay mất 1s */
}
.card:hover {
    transform: rotateY(180deg);  /* lật mặt khi hover */
}
```

![](https://images.viblo.asia/fcf53937-d3e7-4a67-9b19-a4aa0dfe5913.gif)

Vẫn có gì đó sai sai (capcuu). Hiện tại khi flip thì mặt sau chỉ hiển thị đúng mặt sau của 'front', chứ ko hiển thị mặt 'back'. Đấy là vì nếu muốn hiệu ứng transform 3d thì cần thêm 1 dòng nho nhỏ này nữa: `transform-style: preserve-3d;`
```css
.card {
      transition: transform 1s; /* xoay mất 1s */
      transform-style: preserve-3d; /* to tranform with 3d effect */
}
```
 ![](https://images.viblo.asia/f45f17ef-6db5-4766-a0c9-d40b365ce173.gif)

Giờ thì đúng như mong muốn rồi đây =)). 

Vậy là, những thứ cần chú ý khi làm card flip 3d (3d với hình 2 chiều) như sau:
> Định nghĩa `perspective` cho không gian chứa thành không gian 3d

> Phải có cả mặt trước và mặt sau rồi dính úp lưng 2 mặt với nhau (1 tờ giấy thì có 2 mặt mà)

> Mặt đang quay phía sau của hình phẳng cần được ẩn đi bằng `backface-visibility: hidden;`

> Vì là 2 mặt nên nhớ lật hình cho mặt sau nhé: sử dụng `rotate()`

> Đối tượng thực hiện 3d transform cần có `transform-style: preserve-3d;`

Kết quả đê: https://codepen.io/bunnypi04/pen/zYvJJjG?editors=1100
{@embed: https://codepen.io/bunnypi04/pen/zYvJJjG?editors=1100}
### Ứng dụng thực tế hay ho
Nhìn thì có vẻ cũng không có gì hấp dẫn lắm, tuy nhiên là với vài custom thêm, chẳng hạn như đổi trục xoay, hay vừa xoay vừa di chuyển vị trí, bạn có thể làm cái thẻ xoay loạn xạ như cái gif minh họa. Hoặc là làm gì đó đẹp hơn như này: (sưu tầm)
https://codepen.io/akhil_001/pen/zoQdaO
{@embed: https://codepen.io/akhil_001/pen/zoQdaO}
## 3d cho khối hộp vuông (6 mặt)
### Bài toán
Từ dễ dần dần lên khó, tiếp theo mình làm với khối hộp 6 mặt, tuy nhiên là hộp thì có hộp chữ nhật, hộp hình thang,... mà mỗi mặt là 1 kích thước hình dạng có thể khác nhau; nên mình sẽ hướng dẫn cái đơn giản nhất để mọi người có thể hiểu: 6 mặt kích thước bằng nhau - khối hộp vuông.

![](https://images.viblo.asia/358a53f0-157e-4e95-b6f6-5fd8929ba6ed.gif)

Vẫn như hình 2 mặt ở trên, việc đầu tiên là định nghĩa tạo các mặt cho đối tượng đã, và nhớ đặt 1 không gian chứa dice có `perspective` nữa:
```html
<div classs="container">
  <div class="dice">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
    <div class="face left">Left</div>
    <div class="face right">Right</div>
    <div class="face top">Top</div>
    <div class="face bottom">Bottom</div>
  </div>
</div>
```
```css
.container {
  perspective: 600px;
}
.face { /* tạo kích cỡ bằng nhau cho các mặt, vẽ thêm cái border nhìn cho rõ :D */
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
/* Vẽ mỗi mặt 1 màu cho dễ nhìn */
.front { background-color: tomato; }
.back { background-color: lavender; }
.left { background-color: olive; }
.right { background-color: lightgreen; }
.top { background-color: wheat; }
.bottom { background-color: cornflowerblue; }
```
![](https://images.viblo.asia/ed77f5a4-ecf5-4f8e-babd-03aaa2e5baca.png)


Tại thời điểm này thì ta được 1 lô các hình vuông xếp dọc nhau trên màn hình y như đoạn tạo 2 mặt cho lá bài ở trên. Tiếp theo là công việc đính các mặt cho đúng chỗ. Điều đầu tiên để di chuyển chồng chéo như nhau tất nhiên vẫn là `position: absolute` rồi:
```css
.dice {
    position: relative;
}
.face {
    position: absolute;
}
```
Giờ thì mấy mặt này nó chồng hết lên nhau rồi, 6 thằng như 1.

Nhìn hình ảnh trước khi xếp chồng và hình ảnh của 1 khối hộp thì có thể tưởng tượng ra việc phải làm như sau: 
 - Mặt 'Front' giữ nguyên hiện trạng
 - Flip mặt 'Back'  cần flip lại cho đúng.
 - Mặt 'Left' cần xoay góc 90 độ về bên trái theo trục y: `rotateY(-90deg)`
 - Mặt 'Right' cần xoay góc 90 độ về bên phải theo trục y: `rotateY(90deg)` 
 - Mặt 'Top' cần xoay góc 90 độ lên trên theo trục x: `rotateX(90deg)`
 - Mặt 'Bottom' cần xoay góc 90 độ xuống dưới theo trục x: `rotateX(-90deg)`

Đến đây, để cho dễ dàng nhìn thấy sự thay đổi của các mặt, mình cho thêm 1 animation xoay vòng tròn vào cho Dice của mình, và hạ opacity của các mặt xuống cho dễ nhìn "xuyên thấu":
```css
.dice {
    width: 100px;
    height: 100px; /* width và height bằng với face để tâm xoay là chính giữa khối dice */
    position: relative;
    animation: rotate 3s linear infinite;
    transform-style: preserve-3d; /* đừng quên chọn kiểu chuyển động 3d nhé */
}
.face {
    position: absolute;
    opacity: 0.6;
}
@keyframes rotate {
     100% {
         transform: rotateY(360deg);
     }
}
```
Rồi giờ áp vào hình nào:

![](https://images.viblo.asia/59b8a794-3c20-43a1-bbd2-cbc0c66e8997.gif)

Như có thể thấy, các mặt left, right, back, front đang xoay, các mặt đều vuông góc đúng như dự kiến. Còn mặt top và bottom thì chính là đường thẳng ở giữa đang xoay kìa, do nó vuông góc với tầm nhìn (khi không định nghĩa thì mặc định tâm xoay là tâm hình). Giờ cần đẩy các mặt về đúng vị trí nữa là ổn rồi.

Coi như cạnh hình vuông là `a` (ở đây mình là 100px), đối chiếu hình xoay phía trên thì mỗi mặt dịch theo chiều Z (vuông góc) so với vị trí - trạng thái hiện tại của chính nó 1 đoạn `a/2` = 50px là về đúng chỗ: 
* Do mặt top đang hướng lên trên: cần dịch theo Z giá trị dương 50px: `translateZ(50px)`;
* Mặt bottom đang hướng xuống dưới, nên dù đối với chúng ta nhìn thì là dịch xuống chiều Z 50px, nhưng so với chiều dương của mặt thì vẫn là `translateZ(50px)`
* Mặt left: đang quay bên trái, dịch theo sang trái 50px = dịch chiều Z (+50px) = `translateZ(50px)`
* Mặt right: đang quay bên phải, dịch theo sang phải 50px = dịch chiều Z (+50px) = `translateZ(50px)`
* Mặt front: đang quay phía trước, dịch về phía trước 50px = dịch chiều Z (+50px) = `translateZ(50px)`
* Mặt back: đang quay phía sau, dịch về phía sau 50px = dịch chiều Z (+50px) = `translateZ(50px)`

Tổng kết lại là tất cả các mặt đều thêm `translateZ(50px)` :D

Nếu các bạn đang thắc mắc, vì sao lại bảo mặt nào đang quay về phía nào để xác định chiều (+) của Z, thì đừng quên là trước đó đã có bước rotate cho hướng đúng mặt rồi nhé :D. Và tiếp theo đây, thêm  `translateZ(50px)` vào sau tất cả các transform đã rotate của mỗi mặt, nhớ là rotate trước, xong mới translate mới ghi được đúng vị trí nhé: VD:
```css
.back {
  background-color: lavender;
  transform: rotateY(180deg) translateZ(50px);
}
```
Giờ thì có thể thấy thành quả rồi: https://codepen.io/bunnypi04/pen/pojOQOL?editors=0110

![](https://images.viblo.asia/0a613add-89f6-42f7-a8b2-a988e5ed59bb.gif)

## 3d hộp chữ nhật
Dựa vào bài phân tích 3d khối vuông ở trên, mình nghĩ là các bạn có thể step by step tự tạo nên khối chữ nhật rồi :D. Bài mình có tham khảo nhưng cũng cố

## 3d khối trụ đa diện
### Bài toán
Ở đây mình không chắc lắm về cách gọi, ghép từ "khối trụ" tức là có 2 mặt đáy song song, và "đa diện" - tức nhiều mặt - ở đây mình đang nói tới nhiều mặt bên. Đại thể thì nó như cái carousel ở đầu bài viết này vậy, mình lấy sinh động hơn là cái máy game này: coi mỗi hình này là 1 chữ nhật phẳng, thì mỗi roll này sẽ có n mặt (n bao nhiêu không biết =)), n càng cao thì càng tiến tới hình trụ tròn :D ), và mình bỏ qua 2 mặt đáy hình trụ luôn (nếu muốn thêm đáy cũng đc, chỉ cần follow các công thức tính dưới này bạn có thể thêm được thôi :))

![](https://images.viblo.asia/fbbd2195-b8a3-4c49-9a1f-1fe8feea456f.gif)

Vậy việc ở đây cần làm gì? Trước tiên là xác định các mặt bên là bao nhiêu, kích cỡ các mặt, rồi tính toán vị trí dịch chuyển và góc xoay cho mỗi mặt nữa. 

Bắt đầu từ bước 1 trước: Xác định các mặt: Mình chọn hình có 9 mặt bên (như mẫu trên đầu bài), và các mặt sẽ bằng nhau (cho dễ tính toán) kích cỡ = 120 x 200
```html
<div class="container">
  <div class="machine">
    <div class="face slide">1</div>
    <div class="face slide">2</div>
    <div class="face slide">3</div>
    <div class="face slide">4</div>
    <div class="face slide">5</div>
    <div class="face slide">6</div>
    <div class="face slide">7</div>
    <div class="face slide">8</div>
    <div class="face slide">9</div>
  </div>
</div>
```
```css
.container  {
  perspective: 1000px; // đừng quên set perspective đầu tiên
  position: relative;
}
.slide {
  width: 120px;
  height: 200px;
  background-color: wheat;
  border: 1px solid black;
}
.slide:nth-child(1) {
  background-color: tomato;
}
.slide:nth-child(2) {
  background-color: lavender;
}
.slide:nth-child(3) {
  background-color: olive;
}
.slide:nth-child(4) {
  background-color: lightgreen;
}
.slide:nth-child(5) {
  background-color: wheat;
}
.slide:nth-child(6) {
  background-color: cornflowerblue;
}
.slide:nth-child(7) {
  background-color: brown;
}
.slide:nth-child(8) {
  background-color: yellow;
}
.slide:nth-child(9) {
  background-color: midnightblue;
}
```
Giờ có 9 hình chữ nhật đứng rồi. Set position absolute cho các mặt để có thể điều chỉnh vị trí so với container nhé. Và thêm `transform-style: preserve-3d` để có hiệu ứng 3d cho đúng:
```css
.machine {
  transform-style: preserve-3d;
}
.slide {
    position: absolute;
}
```
Giờ thì 9 mặt chập 1 rồi. Như bài khối hộp vuông (Dice, việc tiếp theo sẽ là xoay các mặt cho đúng). Do có tận 9 mặt, tức là 360 độ chia cho 9 = 40 deg. Lần lượt cho các mặt xoay theo thứ tự, mỗi lần cộng thêm 40 deg vào. Do mình muốn xoay theo trục ngang (như bánh xe), nên sẽ rotateX:
```css
.slide:nth-child(1) {
  transform: rotateX(0deg);
}
.slide:nth-child(2) {
  transform: rotateX(40deg);
}
.slide:nth-child(3) {
  transform: rotateX(80deg);
}
.slide:nth-child(4) {
  transform: rotateX(120deg);
}
.slide:nth-child(5) {
  transform: rotateX(160deg);
}
.slide:nth-child(6) {
  transform: rotateX(200deg);
}
.slide:nth-child(7) {
  transform: rotateX(240deg);
}
.slide:nth-child(8) {
  transform: rotateX(280deg);
}
.slide:nth-child(9) {
  transform: rotateX(320deg);
}
```
Đại để thì sẽ có 1 loạt hình kiểu kiểu thế này:
![](https://images.viblo.asia/782462db-672a-4907-ac43-3d915d55269a.png)

Có vẻ đúng rồi nhở :D. Tuy nhiên là hiện tại hình như nó đang hướng mặt sang bên trái. Do chúng ta không set `perspective-origin` và xác định chiều không gian 3d cho perspective, mặc định thì perspective origin nằm ở điểm tâm của container, nhưng container đang quá lớn nên tâm hội tụ này không nằm trên trục chính giữa của slide. Hay hiểu đơn giản là khi bạn đặt máy ảnh lệch so với hộp vuông sẽ chụp được cả mặt nghiêng của hộp, còn nếu hướng camera vuông góc với 1 mặt, nằm trên đường thẳng tâm mặt Z thì chỉ chụp được 1 mặt vuông. 

Nếu muốn chỉnh cho hướng trục Z của mặt phẳng vuông góc thì có 2 cách, 1 là điều chỉnh `perspective-origin` cho đúng, nhưng việc này đôi khi hơi khó tính toán. Cách đơn giản hơn là điều chỉnh kích thước không gian 3 chiều - `container` cho bẳng kích thước 1 slide.

![](https://images.viblo.asia/62d215ac-4959-4ef1-baf5-008c296dafdd.png)


Tiếp theo là đặt mỗi mặt cho đúng chỗ nữa nhé. Như bài tính khối hộp vuông thì có thể rút ra là mỗi mặt sẽ phải di chuyển theo chiều Z dương của chính nó 1 đoạn là `r`. Thế `r` bằng nhiêu? Đến đoạn này thì cần lục lại 1 ít toán học hồi cấp 2 đây.

![](https://images.viblo.asia/75f8a119-08a9-4554-9fff-518410ae7a38.png)


Kia là sơ đồ vòng xoay của mình với 9 mặt và kích cỡ tương ứng với slide của mình. Vậy là cần dịch chuyển mỗi mặt theo chiều Z lên 274.47px thôi, nhớ là translate phải sai khi rotate nhé:
```css
...
.slide:nth-child(3) {
  background-color: olive;
  transform: rotateX(80deg) translateZ(274.47px);
}
.slide:nth-child(4) {
  background-color: lightgreen;
  transform: rotateX(120deg) translateZ(274.47px);
}
...
```

Vậy là ta có thành quả:
```html
<div class="container">
  <div class="machine">
    <div class="face slide">1</div>
    <div class="face slide">2</div>
    <div class="face slide">3</div>
    <div class="face slide">4</div>
    <div class="face slide">5</div>
    <div class="face slide">6</div>
    <div class="face slide">7</div>
    <div class="face slide">8</div>
    <div class="face slide">9</div>
  </div>
</div>
```
```css
.container  {
  perspective: 1000px;
  position: relative;
  margin-left: 200px;
  margin-top: 300px;
  width: 120px;
  height: 200px;
  float: left;
}
.machine {
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  width: 140px;
  height: 220px;
  animation: lucky 3s both infinite;
}
.slide {
  width: 120px;
  height: 200px;
  background-color: wheat;
  border: 1px solid black;
  opacity: 0.8;
  position: absolute;
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  color: white;
  line-height: 200px;
}
.slide:nth-child(1) {
  background-color: tomato;
  transform: rotateX(0deg) translateZ(274.47px);
}
.slide:nth-child(2) {
  background-color: lavender;
  transform: rotateX(40deg) translateZ(274.47px);
}
.slide:nth-child(3) {
  background-color: olive;
  transform: rotateX(80deg) translateZ(274.47px);
}
.slide:nth-child(4) {
  background-color: lightgreen;
  transform: rotateX(120deg) translateZ(274.47px);
}
.slide:nth-child(5) {
  background-color: wheat;
  transform: rotateX(160deg) translateZ(274.47px);
}
.slide:nth-child(6) {
  background-color: cornflowerblue;
  transform: rotateX(200deg) translateZ(274.47px);
}
.slide:nth-child(7) {
  background-color: brown;
  transform: rotateX(240deg) translateZ(274.47px);
}
.slide:nth-child(8) {
  background-color: yellow;
  transform: rotateX(280deg) translateZ(274.47px);
}
.slide:nth-child(9) {
  background-color: midnightblue;
  transform: rotateX(320deg) translateZ(274.47px);
}
```
### Ứng dụng
Giờ bạn có thể tự làm mấy cái slide hoàng tráng hơn slide bình thường rồi, slide bao nhiêu hình cũng đc, hoặc cũng có thể làm cái bánh xe số,...
Mọi người có thể xem thành quả của mình nhé: https://codepen.io/bunnypi04/pen/PoPxmRy
{@embed: https://codepen.io/bunnypi04/pen/PoPxmRy}

# Kết
Qua bài này mình đã thông qua việc hướng dẫn làm vài hình 3D đơn giản để giúp mọi người hiểu cách dựng hình 3D chỉ bằng CSS thuần, dựa vào những thứ trên, cộng thêm sức tưởng tương và khả năng toán học, hình học thì các bạn có thể tạo ra rất nhiều thứ hay ho, ví dụ như vẽ hình minh họa cho môn  Hình học không gian để dạy mấy đưaá em cấp 3 học  chẳng hạn :D. Bài tiếp theo mình sẽ cố gắng kiếm 1 ví dụ hoành tráng hơn để các bạn thấy được khả năng tưởng tượng và chỉ với css thì có thể tạo ra những thứ 'Awesome' như nào. Cao cấp hơn, sau này sẽ có series bài về Three.js - 1 công cụ JS chuyên dùng xử lý 3d nhé :D