Bạn muốn click vào 1 cái hình thì nó được zoom to ra để hiển thị cái hình, với công dụng như vậy nó được gọi là Lightbox. Mình cũng vừa mới làm lightbox và tìm thấy thư viện này, nay mình muốn chia sẽ nó với các bạn, tên nó như trên tiêu đề **Magnific Popup**

Nó hỗ trợ hầu hết các trình duyệt và hỗ trợ tốt hiển thị tốt cho cả moblie device.

**Browser Support**: IE7 (partially), IE8+, Chrome, Firefox, Safari, and Opera.

## 1. Thêm file vào project
Bạn có thể thêm thư viện vào project bằng cách include theo link online, hoặc bạn có thể down nó về và đưa vào trong project của bạn rồi mới link nó vào. Bạn cũng thể sử dụng npm để cài đặt nó.

```html
<!-- Magnific Popup core CSS file -->
<link rel="stylesheet" href="magnific-popup/magnific-popup.css">

<!-- jQuery 1.7.2+ or Zepto.js 1.0+ -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<!-- Magnific Popup core JS file -->
<script src="magnific-popup/jquery.magnific-popup.js"></script>
```

```js
// install with npm
npm install --save magnific-popup
```

## 2. Khởi tạo popup

### 2.1. Popup với 1 element

**JS**
```js
$(document).ready(function() {
  $('.image-link').magnificPopup({type:'image'});
});
```

**HTML**
```html
<a href="image.jpg" class="image-link">
   <img src="image.jpg" />
</a>
```

{@embed: https://codepen.io/onlylight/pen/wvaXbLL}

`type` có 4 loại: image, iframe, inline, ajax. 
1. Định nghĩa image: để hiển thị image, show hình ảnh hoặc tệp các hình ảnh.

```js
image: {
  markup: '<div class="mfp-figure">'+
            '<div class="mfp-close"></div>'+
            '<div class="mfp-img"></div>'+
            '<div class="mfp-bottom-bar">'+
              '<div class="mfp-title"></div>'+
              '<div class="mfp-counter"></div>'+
            '</div>'+
          '</div>', // Popup HTML markup
}
```

2. ĐỊnh nghĩa iframe: Hiển thị video, map... Magnific Popup support Youtube, Google Maps, Vimeo.
3. Định nghĩa inline: Hiển thị popup thông tin như text.
4. Định nghĩa ajax: Hiển thị nội dụng của 1 file, vd: .html

### 2.2. Popup với 1 element parent bên ngoài và hiệu ứng zoom

**HTML**
```html
<div class="parent-container">
  <a href="path-to-image-1.jpg">Open popup 1</a>
  <a href="path-to-image-2.jpg">Open popup 2</a>
  <a href="path-to-image-3.jpg">Open popup 3</a>
</div>
```

**JS**
```js
$('.parent-container').magnificPopup({
  mainClass: "item-image__control",
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image'
  // other options
});
```

Ta được kết quả sau:

{@embed: https://codepen.io/onlylight/pen/KKpejgM}

Delegate chỉ item con là đại diện bởi thể `<a>`

### 2.3 Popup với nhiều loại data

Sử dụng option items: option items định nghĩa data cho popup, giá trị cho items có thể là 1 object hoặc 1 array các object.

```js
$('#some-button').magnificPopup({
    items: [
      {
        src: 'path-to-image-1.jpg'
      },
      {
        src: 'http://vimeo.com/123123',
        type: 'iframe' // this overrides default type
      },
      {
        src: $('<div>Dynamically created element</div>'), // Dynamically created element
        type: 'inline'
      },
      {
        src: '<div>HTML string</div>',
        type: 'inline'
      },
      {
        src: '#my-popup', // CSS selector of an element on page that should be used as a popup
        type: 'inline'
      }
    ],
    gallery: {
      enabled: true
    },
    type: 'image' // this is default type
});
```

### 2.4 Popup với hiệu ứng zoom
Cũng như các phần trên ta sẽ đến với phần html đầu tiên

**HTML**

```html
<a href="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=1280" class="image-link">
   <img src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" />
</a>
```

**JS**

```js
$('.image-link').magnificPopup({
  type: 'image',
  mainClass: 'mfp-with-zoom', // this class is for CSS animation below

  zoom: {
    enabled: true, // By default it's false, so don't forget to enable it

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function
  }
});
```

với `mainClass` là attribute định nghĩa ngoài cùng của phần hiện thị giúp ta có thể style bằng css, 

Ta sẽ được kết quả như sau:

{@embed: https://codepen.io/onlylight/pen/poJKXEE}

## 3. Kết
Trên đây mình giới thiệu cho các bạn 1 vài option để có thể làm với **magnificPopup**, còn nhiều option thú vị khác bạn có thể tìm hiểu theo thông qua đường link tham khảo [sau](https://dimsemenov.com/plugins/magnific-popup/documentation.html).