## Resize Observer là gì?

Theo MDN
> The ResizeObserver interface reports changes to the content rectangle of an Element or the bounding box of an SVGElement. The content rectangle is the box in which content can be placed, meaning the border box minus the padding.

Như vậy, chúng ta có thể dùng `ResizeObserver` để theo dõi sự thay đổi kích thước của một phần tử trong DOM. Từ đó thực thi một hàm callback có thể sử dụng tham số là kích thước của phần tử đang được theo dõi. Trường hợp sau đây là một ví dụ (ví dụ này sử dụng React Reflex, được viết từ `ResizeObserver`)

{@embed: https://codepen.io/leefsmp/pen/vrLKdG}

## Sử dụng

```javascript
const el = document.getElementById('#el');
const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    // DO ST
  }
});
ro.observe(el)
```

## Ví dụ

{@embed: https://codepen.io/JedTr/pen/xxKOdKz}

Ở đây, mình đưa ra một ví dụ đơn giản hơn. Sử dụng `ResizeObserver` để hiển thị kích thước của phần tử `#box`.

**+ Phần CSS:**
```css
@keyframes variant-size {
  from {
    width: 450px;
    height: 300px;
  }
  
  50% {
    width: 600px;
    height: 400px;
  }
  
  100% {
    width: 450px;
    height: 300px;
  }
}
```
Đối với phần CSS, chúng ta sử dụng `@keyframes` để thay đổi giá trị `width` và `height` của phần tử `#box` . Và sau đó dùng `ResizeObserver` để observe phần tử này

**+ Phần Javascript:**
```javascript
const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    var $target = entry.target
    $target.innerHTML = `${$target.clientWidth} x ${$target.clientHeight}`
  }
})

ro.observe(document.getElementById('box'))
```
Đối với phần Javascript, chúng ta sẽ cho hiển thị `width` và `height` vào innerHTML của `#box`. 

Các bạn có thể tham khảo thêm ví dụ https://que-etc.github.io/resize-observer-polyfill/. Ở đây, `ResizeObserver` được sử dụng để show các giá trị `width` và `height` của đồng thời nhiều element.

## Browser Support

![](https://images.viblo.asia/c11773cd-b669-40d2-ba8c-7e3f95b5b8d7.PNG)

Khá là ít phải ko nào. Vậy có polyfill hỗ trợ các browser khác hay ko? Rất may mắn là chúng ta chỉ cần search GG với từ khóa `ResizeObserver` Polyfill có ngay !!

### Polyfill
https://www.npmjs.com/package/resize-observer-polyfill (1.467.383 weekly downloads ở thời điểm hiện tại)

![](https://images.viblo.asia/1f9de3de-cdbc-46d2-b38d-820927a0bbcd.PNG)

## Một số package sử dụng Resize Observer

+  React Measure (https://www.npmjs.com/package/react-measure)

+  React Reflect (https://www.npmjs.com/package/react-reflex)

Ở đây mình chỉ đưa 2 package mà mình tìm thấy, chủ yếu là của `React`. Các bạn có thể tìm hiểu thêm các package khác nhé. Chúc các bạn thành công :p

## Tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver