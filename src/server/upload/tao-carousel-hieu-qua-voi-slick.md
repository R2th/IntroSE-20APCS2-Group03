# Giới thiệu
**Slick** là một thự viện javascript rất phổ biến dùng để tạo carousel một cách hiệu quả và dễ dàng.  
Nó hỗ trợ khá dầy đủ tình năng cho carousel như sau:
* Fully responsive. Scales với container .
* Separate settings cho từng breakpoint
* Swipe enabled / disabled
* Desktop mouse dragging
* Infinite looping.
* Hỗ trợ arrow key navigation
* Thêm, xoá, lọc các slides
* Autoplay, dots, arrows, callbacks, etc...

# Cài đặt
* Thêm `slick.css` vào trong `<head>`

Nếu bạn download bộ thư viện này về, bạn cần copy file slick.css này và import vào trong project của bạn.
```html
<link rel="stylesheet" type="text/css" href="slick/slick.css"/>
```

hoặc dùng CDN:
```html
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
```

* Thêm `slick.js `trước thẻ đóng <body> sau jQuery. jQuery là phải required.

```html
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="slick/slick.min.js"></script>
```
    
 hoặc dùng CDN:
```html
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
```
    
* Package Managers

**Bower**
    
`bower install --save slick-carousel`

**NPM**
    
`npm install slick-carousel`
    
Đến đây là xong, bạn có thể bắt đầu dùng được thư viện này rồi. 
   
#  Cách sử dụng
*  Set up HTML:
```html
<div class="your-class">
  <div>your content</div>
  <div>your content</div>
  <div>your content</div>
</div>
```
* Initialize carousel slider:
```js
$(document).ready(function(){
  $('.your-class').slick({
    // các settings ...
  });
});	
```
    
 Bạn cũng có thể dùng Data Attribute Settings như sau:
    
```html
 <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
      <div><h3>5</h3></div>
      <div><h3>6</h3></div>
</div>
```
    
Refresh browser, bạn sẽ nhận được carousel với các setting default.
 
# Một số settings 
 Ơ trên là default setting của nó. Có khá nhiều settings bạn có thể dùng tuỳ thuộc vào yêu cầu thực tế của mình. 
    
* Default:
```js
    $('.single-item').slick();
```
 ![](https://images.viblo.asia/4b436ffd-2fcc-4f94-ac6e-77e662b276b0.png)

* Multiple sliders:
```js
$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});
```
  ![](https://images.viblo.asia/44901fc8-27fa-4ec5-8590-633bdde483ac.png)
* Lazy Loading:

```html
    ...
    <img data-lazy="img/lazyfonz1.png"/>
    ...
```
```js
$('.lazy').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 3,
  slidesToScroll: 1
});
    
```
* autoplay:
```js
$('.autoplay').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});
```
*  Fade:
```js
$('.fade').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});
```
*  Center Mode:
```js
$('.center').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
```
![](https://images.viblo.asia/68ed7404-cfd6-46f9-b6b4-88452fe64081.png)

Ở đây là một số settings cơ bản thường dùng, còn có nhiều settings nữa bạn có thể tìm thêm trong document của nó.
    
 https://github.com/kenwheeler/slick/
    
 https://kenwheeler.github.io/slick/