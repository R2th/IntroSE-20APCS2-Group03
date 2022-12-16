## Intersection Observer API là gì?
Theo MDN
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Như vậy ```IntersectionObserver``` sẽ theo dõi bất đồng bộ (async) sự giao nhau của phần tử này với phần tử khác. 

## Sử dụng 
```js
var el = document.getElementById('#el');
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
      // TO DO
  });
}, options);
observer.observe(el)
```

## Các ví dụ 

**[1] Lazy Load Image** 

{@embed: https://codepen.io/mishunov/pen/qpmWYP}

Ở ví dụ này, chúng ta sẽ lưu hình ảnh ở ```data-src```
```html
<img class="db w-100" data-src="https://farm9.staticflickr.com/8713/16979768317_44c27d64c9_z_d.jpg">
```
và load hình ảnh từ ```data-src``` vào ```src``` khi scroll tới phần hình ảnh 
```js
const images = document.querySelectorAll('[data-src]');
...

// define observer
let observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(entry => {
    // nếu scroll tới phần entry
    if (entry.isIntersecting) {
      preloadImage(entry.target);
      ...
    }
  });
}, config);

// observe toàn bộ image 
images.forEach(image => {
  observer.observe(image);
});

// load hình ảnh từ data-src vào src
function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) { return; }
  img.src = src;
  _updateMonitoring();
}
...
```

**[2] Infinite Scroll**

{@embed: https://codepen.io/JedTr/pen/rXBOxj}

Phần HTML 
```html
<div>1</div>
<div>2</div>
<div>3</div>
...
<div>9</div>
<div id="last">10</div>
```
Ở ví dụ này chúng ta sẽ observe element ```#last```
```js
let element = document.getElementById("last");
let elementsCounter = 10;


function ioHandler(entries) {  
  for (let entry of entries) {
    if (entry.intersectionRatio === 1) {
       // Tạm ngừng observe 
      io.unobserve(element)
      
      // Tạo thêm 10 element
      elementsCounter += 10
      
      for (let i = elementsCounter - 9; i <= elementsCounter; i++) {
        element = document.createElement('div')
        element.textContent = i;
        document.body.appendChild(element);
      }
      
      // Bây giờ observe element cuối cùng vừa được tạo
      io.observe(element)
    }

  }
}

...

const io = new IntersectionObserver(ioHandler, ioConfig);

io.observe(last)
```

Đây chỉ là ví dụ minh hoạ. Thông thường chúng ta sẽ request từ API để load thêm bài viết hoặc nội dung khác cần thiết.

## Intersection Observer vs EventListener Scroll

Hẳn các bạn sẽ thắc mắc rằng. Tại sao chúng ta lại sử dụng ```IntersectionObserver``` trong khi đã có EventListener Scroll? Có thể cải thiện được performance hay ko?

Các bạn có thể tham khảo bài so sánh về performance sau. medium.com/@cristinallamas/intersection-observer-vs-eventlistener-scroll-90aed9dc0e62

Kết luận ngắn của bài so sánh: Có thể cải thiện được performance nhé :stuck_out_tongue_winking_eye:

## Can I Use
![](https://images.viblo.asia/7b5df685-ce0a-4647-bcf8-457cded54d30.png)

Chúng ta có thể sử dụng polyfill để hỗ trợ cho IE và một số trình duyệt khác.

### Polyfill 
https://www.npmjs.com/package/intersection-observer (318,502 weekly downloads ở thời điểm hiện tại)

![](https://images.viblo.asia/6ac88cb0-89a8-444a-9e1d-01efe4402e01.png)

## Kết luận 
Intersection Observer API có thể thay thể cho EventListener Scroll trong xử lý nhiều tác vụ, như là lazy load images, infinite scroll,... và còn nhiều thứ khác nữa. Các bạn có thể tìm hiểu thêm nhé :kissing_heart:
    
## Tham khảo 
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/