# Vài lời
Qua 3 bài trước trong series, mình đã hướng dẫn mọi người tìm hiểu về các yếu tố cơ bản trong css animation. Tất nhiên là vẫn còn nhiều thứ khác để khiến cho trình css của bạn "Awesome" hơn, ví dụ như hiệu ứng với cube chẳng hạn :D. Tuy nhiên là với sự tìm hiểu của mình thì chưa đến tầm "ngấm" được đám hiệu ứng 3D đó (1 số cái còn phải làm toán tích phân để tính góc ấy (sohai4)). Vì vậy, sau 3 bài mình chọn viết 1 bài thực hành áp dụng những gì đã học làm 1 vài hiệu ứng vui vui cho website :D

Hiện tại mình đang làm cái Chrome starting page cho mình (chỉ vì tìm được cái hình ảnh đẹp :D), nên mình chọn làm hiệu ứng thời tiết cho cái tranh phong cảnh của starting page của mình. Và tất nhiên, như tiêu chí ban đầu của mình: Just pure CSS
# Hiệu ứng mưa rơi
![](https://images.viblo.asia/9257f25b-fe31-4259-9970-36ead2adc13a.gif)

1 trong những hiệu ứng thời tiết phổ biến nhất chắc là mưa rơi rồi :D. Trên mạng thì nhiều hướng dẫn mưa rơi với js lắm, nhưng tất nhiên là mình sẽ không sử dụng js rồi
## Tạo các hạt mưa
Đầu tiên, tất nhiên ta phải tạo hạt mưa rơi rồi: Ở đây mình sử dụng màu trắng cho hạt mưa, do hạt mưa đang rơi, nên mình cho hạt mưa chuyển sắc từ transparent tới trắng theo chiều từ trên xuống nữa. Và để tạo cảm giác mưa rơi, "hạt" mưa này sẽ có chiều dài 100px, và để nó "visible", nhớ cho nó bề rộng 1px nhé (hạt nên bé thôi, đừng ai cho hạt mưa đá siêu to khổng lồ nhé, vỡ đầu mất :D). 
Tất nhiên 1 cơn mưa không thể chỉ có 1 hạt mưa. Giờ cần nhân lên nhiều hạt mưa nữa. Và các hạt mưa thì có thể có chiều dài khác nhau, nên mình tạo vài "lớp" mưa với mỗi lớp có chiều dài hạt mưa khác nhau.  Cơn mưa lớn hay nhỏ sẽ tùy thuộc vào số lớp và số hạt mưa bạn tạo nên:
```html:index.html
<body>
    <div class="layer-1">
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
    </div>
    <div class="layer-2">
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
        <div class="rain-drop"></div>
    </div>
</body>
```
```css:style.css
.rain-drop {
    width: 1px;
    background-image: linear-gradient(to bottom, transparent, white); /* màu chuyển sắc từ trong suốt tới trắng*/
}
.layer-1 .rain-drop {
    height: 100px;
}
.layer-2 .rain-drop {
    height: 50px;
}
```

## Chọn chỗ mưa rơi
Hiện tại, nếu xem trên màn hình bạn sẽ thấy mấy hạt mưa đang xếp theo chiều dọc, và để đảm bảo các hạt mưa này luôn rơi trên màn hình như mong muốn mà không bị ảnh hưởng bởi các div khác, mình cho `position: fixed`. Nhưng mà giờ thì đám mưa đang "chồng" lên nhau. Vậy nên cần vứt mỗi thằng 1 chỗ rải rác trên màn hình đã (để lấy ví dụ thì mình sử dụng 1 layer thôi):
```css:style.css
.rain-drop:nth-child(2) {
  left: 10%; /* sử dụng % là để tiện responsive nhé */
}
.rain-drop:nth-child(3) {
  left: 80%
}
.rain-drop:nth-child(4) {
  left: 35%
}
.rain-drop:nth-child(5) {
  left: 65%
}
...
```
![](https://images.viblo.asia/6605201e-97bb-4564-ac70-75b0c8d5919c.png)

Vậy là xong phần vẽ mấy hạt mưa với vứt lung tung trên màn hình. Giờ để vứt lên "mây" và thả mưa rơi xuống, sẽ cần tạo keyframes mưa rơi: ban đầu hạt mưa sẽ ở trên "mây" (tức là cao hơn màn hình: hạt mưa dài 100px thì mình cho vị trí ban đầu của nó là: `top: -100px`); sau khi mưa rơi tới hết màn hình, thì vị trí hạt mưa sau rơi sẽ là vị trí hết chiều dài màn hình: `top: 100vh;` (vh là view height: chiều dài view)
## Cho mưa rơi
```css:style.css
@keyframes rainFall {
  0% {
    top: -100px;
  }
  50% { /* cái 50% này là optional, mình muốn hạt mưa rơi xuống hết xong chờ 1 chút rồi mới lại rơi lần nữa, có thể là 50% hoặc bao nhiêu % tùy thuộc vào bạn muốn đỗ trễ  là bao nhiêu */
    top: 100vh;
  }
  100% {
    top: 100vh;
  }
}
```
Giờ chỉ cần thêm keyframes `rainFall` này vào các hạt mưa là ổn. Để mỗi hạt mưa có thời gian rơi khác nhau, hãy chỉnh các tham số delay và duration cho mỗi hạt khác nhau nhé
```css
  animation: rainFall .8s linear 2s infinite;
  /* thứ tự các tham số: [tên hiệu ứng] [duration] [timing function] [delay time] [iteration-count]  */
```
Nếu lỡ không nhớ mấy cái tham số kia thì mở bài này xem nhá: [Bài 3: Keyframes & Animation](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-3-keyframes-animation-3Q75w86BKWb)

Với duration, bạn sẽ quyết định tốc độ rơi của mưa, thêm vào đó là đỗ trễ ở trong key frames nữa (cái mình ghi optional ấy), 2 điều này cùng với độ "dày" các hạt mưa bạn tạo sẽ quyết định độ lớn nhỏ của cơn mưa, mưa nhỏ hay mưa bão. Nếu định làm bão với mưa rơi nghiêng, thì hãy thêm thuộc tính `left/right: ?vw` để tạo độ nghiêng cho mưa rơi nhé: vd:
```css
@keyframes storm {
  0% {
    top: -100px;
  }
  100% {
    top: 100vh;
    left: 20vw; /*vw: view width */
  }
}
```
Mọi người có thể tham khảo thành quả tại đây nhé: https://codepen.io/bunnypi04/pen/JjddZYK
{@embed: https://codepen.io/bunnypi04/pen/JjddZYK}
# Hiệu ứng hoa tuyết rơi
Hiệu ứng này mình sẽ làm vài bông tuyết xinh xinh rơi lờ đờ, các bạn cũng có thể dùng hình tròn trắng cơ bản xong blur ra cũng được nhé, chứ mình thì thích đẹp :D
``` 
Hoa tuyết 1:  ❅
Hoa tuyết 2:  ❆
```
## Tạo các bông hoa tuyết
Tương tự như các hạt mưa rơi, tạo vài bông tuyết chờ được rơi nhé:
```html:fileHTML
  <div class="snowflake">  ❅  </div>
  <div class="snowflake">  ❆  </div>
  <div class="snowflake">  ❅  </div>
  <div class="snowflake">  ❆  </div>
...
```
Mật độ bông tuyết tất nhiên là tùy bạn muốn tuyết rơi nhiều hay ít thôi, cứ thêm vào cho đến khi thấy đủ nhé :D

Hoa tuyết nên mình muốn để nó màu trắng, tất nhiên là trong 1 số trường hợp nó màu xanh nhạt, hoặc bạn muốn nó màu đỏ thì cũng là tùy bạn nhé :D. Vì ở đây sử dụng text symbol, nên để chỉnh kích cỡ hoa tuyết chỉ cần thay đổi font-size là được. Nếu nền trắng như tuyết thì nhớ thêm shadow cho bông tuyết nếu không lại "trắng quá nhìn không ra" nhé:
```css:fileCss
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px #000;
/* Để  tuyết luôn rơi trên màn hình và không bị ảnh hưởng, set position fixed*/
  position: fixed;
  z-index: 999; /* cho chắc =)) */
/* tuyết cần rơi từ điểm bắt đầu nằm trên cái màn hình */
  top: -10%;
}
```
## Chọn vị trí tuyết bắt đầu rơi

Như hiệu ứng mưa rơi ở trên, mình sẽ random các vị trí bắt đầu cho các bông tuyết bằng thuộc tính `left: x%;`
```css:fileCSS
.snowflake:nth-of-type(0) {
  left: 1%;
}
.snowflake:nth-of-type(1) {
  left: 10%;
}
.snowflake:nth-of-type(2) {
  left: 20%;
}
...
```
## Rơi nào
Tương tự như mưa rơi, mình sẽ làm keyframes `snowFall` với điểm bắt đầu là trên cùng và kết thúc là chạy hết màn hình:
```css
@keyframes snowflakes-fall {
  0% {
    top: -10%
  }
  100% {
    top: 100%
  }
}
```

Tuy nhiên nếu chỉ như thế thì chưa đẹp. Cho bông tuyết "đu đưa", "lạng lách" trên đường rơi xuống trông cho giống thật nữa. Ở đây mình sẽ chọn cách "đu đưa" đơn giản thôi, đấy là lượn sang bên phải, xong lại lượn về 
```css
@keyframes snowflakes-shake {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(80px);
  }
}
```
Vậy là xong keyframes. Giờ cần add keyframes vào cho các bông tuyết nữa là xong. Vì add tận 2 hiệu ứng, nên mình sẽ viết tường minh ra cho dễ customize, không viết short syntax nữa:
```css
.snowflake {
  animation-name: snowflakes-fall, snowflakes-shake; /* Sử dụng 2 hiệu ứng(Keyframes): kf_1, kf_2 */
  animation-duration: 10s, 3s; /* duration tương ứng cho 2 hiệu ứng */
  animation-timing-function: linear, ease-in-out; /* timing function tương ứng */
  animation-iteration-count: infinite, infinite; /* lặp lại vô hạn hiệu ứng, để tuyết không ngừng rơi :v */
  animation-play-state: running, running; /* cái này là để cho nó chạy thôi */
}
```

Hiện tại thì các bông tuyết đang rơi cùng lúc, chỉ cần chỉnh thời gian delay random cho từng bông tuyết nữa là xong:
```css
.snowflake:nth-of-type(0) {
  animation-delay: 0s, 0s /* độ trễ tương ứng với kf_1, kf_2 */
}
.snowflake:nth-of-type(1) {
  animation-delay: 1s, 1s
}
.snowflake:nth-of-type(2) {
  animation-delay: 6s, .5s
}
.snowflake:nth-of-type(3) {
  animation-delay: 4s, 2s
}
```

Vậy là xong tuyết rơi rồi, các bạn có thể tham khảo tại đây nhé: https://codepen.io/bunnypi04/pen/ZEGGxey

Hiệu ứng tuyết rơi được tham khảo và lược từ https://pajasevi.github.io/CSSnowflakes/

Tương tự như trên, custom lại 1 chút bạn có thể tạo ra hiệu ứng gió (lá bay loạn xạ), hoa bay,...
# Hiệu ứng sương bay (mây bay)
Với hiệu ứng sương và mây, khác nhau đôi chút ở độ hiển thị (opacity) và độ đặc của khối mây. Về cơ bản, mình sẽ tạo các khối elip bay lơ lửng và khiến nó "mờ ảo" để tạo các đám sương.
```html:TạoKhốiSương
<div class="fog"></div>
<style>
    .fog {
        position: fixed;
        width: 40vw;
        height: 5vw;
        bottom: 5vw;
        left: 10vw;
        border-radius: 50%;
        background-color: white; /* mình tạo sương/mây trắng thôi, cứ coi như là không ô nhiễm xám xịt nhé =)) */
    }
</style>
```
Giờ bạn sẽ thấy 1 khối elip trắng lơ lửng ở giữa màn hình. Chưa giống sương lắm nhờ. Mình sẽ làm nó tản ra bằng cách thêm filter `blur`. Bạn nào hay dùng photoshop hoặc app chỉnh ảnh là quen với cái này lắm này :D
```css
.fog {
    filter: blur(40px);
}
```
Giờ dựa vào kết quả trên màn hình, hãy chỉnh độ `blur` để đạt được độ mờ sương - hoặc dày như mây như mong muốn. Chỉ số càng cao, thì độ "tán" càng nhiều, trông sẽ càng mờ giống đám sương. Ngược lại, độ `blur` càng thấp, hình elip sẽ càng sắc nét và càng giống... hình elip :D.

Để cho giống sương mỏng hơn, thì có thể thêm vào `opacity` nhỏ để tăng độ trong suốt:
```css
.fog {
    opacity: 0.5;
}
```
![](https://images.viblo.asia/9598d1dc-ca12-48f0-8048-4ca1152c49da.png)

Giờ tạo thêm vài đám nữa bay lơ lửng là giống Sa Pa rồi đấy, còn để giống Hà Nội thì mây với sương màu xám tí là giống nhé :D

# Hiệu ứng sấm chớp
Nốt cái này cho đủ bộ thời tiết :D. Để làm sấm chớp cho giống thật, thì sẽ cần 1 tia chớp, không dùng thì mình tạo màn chớp thôi cũng không sao cả.

Ở đây hiệu ứng là cứ sau vài giây thì bầu trời lóe sáng, kèm theo là 1 tia chớp hiện lên, sau đó tất cả vụt tắt đi. Vậy mình sẽ tạo 1 màn đi kèm ngay sau màn background của screen, và sử dụng 1 hình ảnh tia chớp mà mình kiếm được
```html
<body>
    <div class="lightning">
        <img src="http://www.pngmart.com/files/11/Lightning-PNG-Transparent-Picture.png">
    </div>
</body>
<style>
.lightning {
  position: absolute;
  right: -50%;
  background: white; /* màn chớp của mình chọn màu trắng */
  animation: lightning 4s linear infinite; /* đặt tên hiệu ứng là lightning luôn, và cho chạy 4s loop */
}
.lightning img {
  width: 75%;
  transform: scaleX(-1) rotate(45deg); /* do cái ảnh nó chưa có độ nghiêng như mình muốn nên mình flip và nghiêng lại cho đẹp */
}
</style>
```
Do đã chọn màn chớp trắng, và chọn màn chớp hiện cùng với tia chớp, nên mình chọn luôn màn màu trắng và để nó animate cùng tia chớp. Nếu muốn màn chớp vài cái mới có tia chớp thì chỉ cần tạo thêm 1 layer nữa cho màn chớp riêng thôi nhé.

Giờ tới lúc tạo hiệu ứng là xong:
```css
    @keyframes lightning {
        0%, 100% {
            opacity: 0;
        }
        30% {
            opacity: 0; /* từ 0->30% thì nền vẫn như bình thường */
        }
        32% {
            opacity: 1; /* trong từ 30-32% thì hiện lên chớp, thời gian nhanh thì nó sẽ lóe lên nhanh */
        }
        37% {
            opacity: 0; /* từ 32-35% thì chớp tắt đi, mình để tắt đi lâu hơn 1 tí tạo hiệu ứng dư âm */
        }
    }
```
Demo tại đây nhé: https://codepen.io/bunnypi04/pen/wvaKzre
{@embed: https://codepen.io/bunnypi04/pen/wvaKzre}

# Làm mặt trời mọc - lặn
Việc mọc lặn của mặt trời này chỉ là khiến mặt trời di chuyển trên 1 đường tròn mà thôi.
### Trước hết tạo 1 mặt trời đã
```html
<div class="sun"></div>
<style>
.sun {
    width: 10vw;
    height: 10vw; /* chiều cao bằng chiều rộng = 10 view width */
    background-color: #fde477;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
```
Ở đây mình để mặt trời nằm tại trung tâm luôn
### Sử dụng `translateX()` để xác định bán kính đường tròn
Để xoay mặt trời theo đường tròn, cần phải xác định bán kính cho đường tròn. Lấy điểm tâm của đường tròn chính là vị trí mà vừa đặt mặt trời vào (điểm top: 50%; bottom: 50%), giờ phải dịch mặt trời ra rìa đường tròn (cách tâm 150px)

![](https://images.viblo.asia/0445ffe5-70f1-48fa-bdbc-04347dcd40bb.png)

```css
.sun {
    transform: translateX(150px);
}
```
### Thêm `rotate()` để cho mặt trời chạy quanh đường tròn
Nếu chúng ta thêm `rotate()` vào  `transform`, và phía trước `translateX` ở trên, mặt trời sẽ được xoat quanh tâm với bán kính của `translateX`. Để dễ nhìn sự di chuyển, hãy thử cho 1 góc 45 độ trước:

![](https://images.viblo.asia/94cb0661-a17e-4a16-9072-f1bf8287b2e6.png)
```css
.sun {
    transform: rotate(45deg) translateX(150px);
}
```

Vấn đề ở đây là cái mặt trời nó bị nghiêng rồi! Hãy tưởng tượng trường hợp này giống như bạn đi bộ quanh trái đất ấy. cho dù bạn đứng ở đâu trên đường tròn trái đất, thì chân vẫn hướng về tâm trái đất, và đầu thì hướng vuông góc mặt đất.

Nhưng mà cái mặt cười kia không muốn nó xoay thế kia thì làm thế nào?

Theo như hình vẽ có thể thấy, khi quay quanh tâm 45 độ thì vật thể cũng quay 45 độ. Vậy muốn nó trông y như hình dạng ban đầu thì chỉ cần xoay ngược lại là xong!
```css
.sun {
    transform: rotate(45deg) translateX(150px) rotate(-45deg);
}
```
Vậy là đã xử lý được vụ xoay. Giờ thì apply animation thôi:

```html
<div class="sun"></div>
<style>
.sun {
    width: 10vw;
    height: 10vw; /* chiều cao bằng chiều rộng = 10 view width */
    background-color: #fde477;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    animation: rise 5s infinite; /*cho nó xoay cả ngày luôn */
}
@keyframes rise {
  from {
    transform: rotate(0) translateX(-150px) rotate(0);
  }
  to {
    transform: rotate(360deg) translateX(-150px) rotate(-360deg);
  }
}
</style>
```
Mình có làm vài ví dụ so sánh ở đây, mọi người có thể tham khảo nhé: 
{@embed: https://codepen.io/bunnypi04/pen/abOORVB}

# Kết
Bài này đã hướng dẫn mọi người làm các animation thời tiết thường gặp, ngoài ra còn có các kiểu thời tiết như bão, vòi rồng, nắng chảy mỡ, động đất,... nữa mọi người có thể tìm hiểu thêm nhé. Bài này là nguyên liệu cho bài tiếp theo của mình, đấy là lấy dữ liệu thời tiết về và dựa theo đó làm hiệu ứng page cho nó giống thật :D. Mọi người đọc cho vui nhé: https://viblo.asia/p/tu-lam-chrome-start-up-page-du-bao-thoi-tiet-vyDZOaEx5wj