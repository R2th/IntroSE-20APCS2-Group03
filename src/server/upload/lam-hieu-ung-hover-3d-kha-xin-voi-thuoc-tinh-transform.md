Sau một thời gian tiếp xúc và làm việc với `CSS`, mình muốn thử làm ra một hiệu ứng hover **"xịn sò"** nhất có thể với những kiến thức đã có. Vậy là sau vài giờ đồng hồ mầy mò kết hợp với một ít Jquery, đây là kết quả mình đạt được.
{@codepen: https://codepen.io/phongct-1713/pen/QRNGrq}


Trong bài viết này mình sẽ hướng dẫn các bạn cách để làm được hiệu ứng như trên.
### Phần 1. Chuẩn bị


Trước tiên, chúng ta tạo ra một element với class `.card` với tác dụng như một container chứa những element khác.
```html
<div class="card">
    <div class="card__img-wrapper"><img class="card__img" src=""/></div>
    <p class="card__title">Forest Road</p>
</div>
```

Để cho dễ nhìn hơn thì chúng ta sẽ style cho `body` center `.card` vào giữa màn hình.

```css
body {
    background: linear-gradient(to bottom, #355c7d, #6c5b7b, #c06c84);
    display: flex;
    height: 100vh;
    perspective: 1000px;
    transform-style: preserve-3d;
    overflow: hidden;
    font-family: 'Macondo Swash Caps', cursive;
}

.card {
    margin: auto;
}
```

Sau đó chúng ta sẽ style cho ảnh và chữ

```css
.card {
    margin: auto;
    position: relative;
}

.card__img-wrapper {
    border-radius: 15px;
    width: 300px;
    height: 450px;
    background: transparent;
    overflow: hidden;
}

.card__img {
    display: block;
    margin: -20% 0 0 -20%;
    width: 140%;
    height: 140%;
    object-fit: cover;
    backface-visible: hidden;
    vertical-align: middle;
}

.card__title {
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 5px;
    font-size: 30px;
    width: 100%;
    transition: all .3s ease;
    cursor: default;
    background: transparent;
    transition: all .3s ease;
}
```


Vậy là có được kết quả như sau.
{@codepen: https://codepen.io/phongct-1713/pen/RmVMEv}

Nhìn cũng khá ok, nhưng để cho **chất** hơn nữa chúng ta sẽ bắt tay vào làm hiệu ứng khi `hover`

### Phần 2. Viết Jquery


Trước tiên, chúng ta sẽ detect 2 sự kiện `mousemove` và `mouseleave` trong element `.card`.
```js
$(function(){
    $('.card').mousemove(function(ev){
        // Do something when mouse move
    });

    $('.card').mouseleave(function(ev) {
        // Do something when mouse leave
    });
})
```


Trong sự kiện `mousemove` chúng ta sẽ tìm đến vị trí con trỏ chuột khi di chuột trong `.card`  sau đó tính toán để áp dụng vào `transform`.
```js
$('.card').mousemove(function(ev){
    let parentWidth = $(this).width();  // Chiều rộng div cha
    let parentHeight = $(this).height();  // Chiều dài div cha
    let mouseX = ev.pageX - $(this).offset().left;  // Vị trí x chuột trong div cha
    let mouseY = ev.pageY - $(this).offset().top;  // Vị trí y chuột trong div cha
    let x = (parentWidth/2 - mouseX)/15;
    let y = -(parentHeight/2 - mouseY)/15;
    
    $(this).css({
      'transform': 'rotateX('+ y +'deg) rotateY('+ 2*x +'deg) translateZ(50px)',
      'transition': 'all .15s ease'
    });
    
    $(this).find('.card__img').css({
      'transform': 'scale(1.05) translateX('+ -5*x +'px) translateY('+ -5*y +'px)',
      'transition': 'all .15s ease'
    });
});
```


Sau đó, chúng ta sẽ trả `.card.` về trạng thái ban đầu sau khi `mouseleave`
```js
$('.card').mouseleave(function(ev) {
    $(this).css({
      'transform': 'rotateX(0) rotateY(0)',
      'transition': 'all .6s ease'
    });

    $(this).find('.card__img').css({
      'transform': 'scale(1) translateX(0px) translateY(0px) translateZ(0)',
      'transition': 'all .6s ease'
    });
});
```
{@codepen: https://codepen.io/phongct-1713/pen/QRNGrq}


### Lời kết
Vậy là chúng ta đã tạo được ra hiệu ứng hover khá đẹp mắt. Các bạn cứ thoải mái chỉnh sửa để tạo ra được những hiệu ứng **chất** hơn nhé. Xin cảm ơn