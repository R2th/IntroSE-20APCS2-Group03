Chào các bạn, trong series này, mình sẽ giới thiệu về một số hiệu ứng loading khá độc, lạ và đẹp mắt, và cách làm ra chúng chỉ sử dụng HTML, CSS. ( Say no with Javascript :raised_back_of_hand:)
Đầu tiên, cũng là hiệu ứng mình thích nhất, đó là 
# Dragon loading...

## Chuẩn bị
Khâu chuẩn bị cũng khá đơn giản, chúng ta cần 1 file `index.html`, 1 file `index.css`, và thư mục `img` đặt cùng cấp với nhau. Bên trong thư mục `img` chứa ảnh từng bộ phận của con khủng long.
Các bạn có thể download ảnh tại [đây](https://ibb.co/album/hWVjfa)
## HTML
Ở file `index.html`, ta sẽ sử dụng 4 thẻ `div` cùng cấp được wrap trong 1 thẻ div chính bao ngoài:
Đầu tiên là thẻ để wrap bóng con rồng.
```html
    <div class="shadow-wrapper">
            <div class="shadow"></div>
    </div>
```
tiếp theo là thẻ div wrap tổng thể con rồng với các phần body, sừng trái, phải, mắt rái phải, vây, miệng và đuôi rồng, sử dụng background image hiển thị các bộ phận sử dụng image mình đã để ở trên. :grinning:
```html
    <div class="dragon">
            <div class="body"></div>
            <div class="horn-left"></div>
            <div class="horn-right"></div>
            <div class="eye left"></div>
            <div class="eye right"></div>
            <div class="blush left"></div>
            <div class="blush right"></div>
            <div class="mouth"></div>
            <div class="tail-sting"></div>
    </div>
```
thẻ này chứa cục lửa, và ta sử dụng css animation tạo hiệu ứng lửa bay:
```
    <div class="fire-wrapper">
            <div class="fire"></div>
    </div>
```
và cuối cùng là phần div hiển thị thanh loading :
```html
    <div class="progress">
        <span>Loading...</span>
        <div class="outer">
            <div class="inner"></div>
        </div>
    </div>
```

## CSS
Done, vậy là xong phần html, tiếp theo là CSS.
Đầu tiên, chúng ta cần phải định nghĩa ra một số keyframe chính tạo chuyển động các bộ phận cho con rồng:
```css
@keyframes zoomIn {
    100% {
        transform: scale(1.16, 1.16);
    }
}

@keyframes swingRight {
    100% {
        transform: rotate(5deg);
    }
}
// xoay sừng phải đi 5deg
@keyframes swingLeft {
    100% {
        transform: rotate(-5deg);
    }
}
// xoay sừng trái đi 5deg
@keyframes blush {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
// má hồng sẽ hiện khi ở 100% và ẩn khi ở 9%
@keyframes openMouth {
    0% {
                clip-path: ellipse(20% 0% at 50% 0);
    }

    50% {
                clip-path: ellipse(100% 100% at 50% 0);
    }

    70% {
                clip-path: ellipse(100% 100% at 50% 0);
    }

    100% {
                clip-path: ellipse(20% 0% at 50% 0);
    }
}
//Hiệu ứng đóng mở miệng cho con rồng
@keyframes tailUp {
    0% {
        transform: scaleY(0.9);
    }

    100% {
        transform: scaleY(1.06);
    }
}
// scale phần vây đuôi từ 0.9 lên 1.06
@keyframes loading {
    100% {
        width: 100%;
    }
}

@keyframes fireUp {
    0% {
        top: 70px;
    }

    20% {
        top: 70px;
    }

    100% {
        top: -80px;
    }
}
// Tạo hiệu ứng ngọn lửa đi lên
@keyframes fire {
    0% {
        transform: scale(0, 0);
        opacity: 0.8;
    }

    20% {
        transform: scale(0, 0);
        opacity: 0.8;
    }

    50% {
        opacity: 0.8;
    }

    100% {
        transform: scale(1, 1);
        opacity: 0;
    }
}
```
Tiếp theo, cùng "make up" sương sương cho thẻ `html, body, main` và phần body `dragon` đã nào:
```css
html {
    height: 100%;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #fff6e3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main {
    position: relative;
}

.dragon {
    width: 200px;
    height: 140px;
    transform-origin: 50% 80%;
    animation: zoomIn .5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
}

.dragon .body {
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 128px;
    background: url(./img/body.png) no-repeat center center;
    background-size: contain;
    z-index: 10;
}
```
 CSS cho phần sừng trái con rồng :
```css
.dragon .horn-left {
    position: absolute;
    top: -17px;
    left: 32px;
    width: 31px;
    height: 31px;
    background: url(./img/horn-left.png) no-repeat;
    background-size: contain;
    z-index: 9;
    transform-origin: 150% 200%;
    transform: rotate(-5deg);
    animation: swingRight .5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
}
```
Trong đó `position:absolute` giúp ta có thể tùy ý điều chỉnh vị chí cái sừng mà không ảnh hưởng tới các bộ phận khác ( miễn là thẻ div bao ngoài cùng `main` có `position: relative` )
`./img/horn-left.png` là đường dẫn cố định tới thư mục ảnh mà mình đã để theo cấu trúc thư mục ở trên. :nerd_face: Các bạn có thể download ảnh ở trên và dẫn tới đúng image, hoặc có thể sử đường dẫn online như mình để trong codepen cũng được. :grin:
Thuộc tính transform và animation sử dụng keyframe `swingRight` (đã định nghĩa ở trên) giúp chiếc sừng chuyển động nhịp nhàng tạo hiệu ứng đồng bộ khi con rồng thở ra lửa.

Tương tự, ta có css các bộ phận khác như sau:
```css
.dragon .horn-right {
    position: absolute;
    top: -16px;
    left: 110px;
    width: 34px;
    height: 31px;
    background: url(./img/horn-right.png) no-repeat;
    background-size: contain;
    z-index: 9;
    transform-origin: -50% 200%;
    transform: rotate(5deg);
    animation: swingLeft .5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
}

.dragon .eye {
    position: absolute;
    top: 39px;
    width: 11px;
    height: 11px;
    background: url(./img/eye.png) no-repeat;
    background-size: contain;
    z-index: 12;
}

.dragon .eye.left {
    left: 49px;
}

.dragon .eye.right {
    left: 118px;
    transform-origin: 50% 50%;
    transform: rotate(180deg);
}

.dragon .blush {
    position: absolute;
    top: 46px;
    width: 15px;
    height: 9px;
    background: url(./img/blush.png) no-repeat;
    background-size: 100% 100%;
    z-index: 11;
    animation: blush .5s ease infinite alternate;
}

.dragon .blush.left {
    left: 43px;
}

.dragon .blush.right {
    left: 120px;
}

.dragon .mouth {
    position: absolute;
    top: 52px;
    left: 49px;
    width: 78px;
    height: 56px;
    background: url(./img/mouth.png) no-repeat;
    background-size: 100%;
    z-index: 11;
    animation: openMouth 1s ease infinite;
}

.dragon .tail-sting {
    position: absolute;
    top: 67px;
    left: 139px;
    width: 40px;
    height: 38px;
    background: url(./img/tail-sting.png) no-repeat;
    background-size: contain;
    z-index: 9;
    transform-origin: 0 100%;
    animation: tailUp .5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
}
```
Tiếp theo là phần hiệu ứng bóng con rồng, ngọn lửa và thanh progress loading:
```css
.shadow-wrapper {
    position: absolute;
    top: 110px;
    width: 100%;
}

.shadow {
    margin: 0 auto;
    width: 110px;
    height: 30px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    z-index: 0;
    animation: zoomIn .5s cubic-bezier(0.47, 0, 0.75, 0.72) infinite alternate;
}

.fire-wrapper {
    position: absolute;
    width: 40px;
    top: 60px;
    left: 88px;
    transform: translate(-50%, -50%);
    transform-origin: 50% 100%;
    animation: fireUp 1s ease-in infinite;
}

.fire {
    padding-bottom: 135%;
    width: 100%;
    height: 100%;
    background: url(./img/fire.png) no-repeat;
    background-size: contain;
    animation: fire 1s ease-out infinite;
}

.progress {
    width: 100%;
}
.progress span {
    font-weight: bold;
    color: #fdcd33;
    margin-left: 4px;
}
.progress .outer {
    width: 100%;
    height: 14px;
    border-radius: 7px;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-top: 3px;
}

.progress .inner {
    width: 0;
    height: 100%;
    background: #ffcd33;
    animation: loading 2s linear infinite;
}

```

Done. Vậy là ta đã tạo xong được hiệu ứng dragon loading khá là cute mà cũng lạ nữa phải không. :smile:
	
{@embed: https://codepen.io/tuanphamle/pen/BaaKxPd}

# Tổng kết
Bài viết cũng đã khá dài, nên mình xin phép tạm dừng tại đây. Nếu có gì sai xót, mong mọi người lượng thứ và góp ý. Chin cảm ơn (bow)
:roll_eyes: