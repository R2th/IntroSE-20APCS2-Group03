`jQuery` là một trong những thư viện javascript được yêu thích và đã từng được rất nhiều lập trình viên frontend sử dụng. Giờ đây, khi các trình duyệt ngày càng được phát triển và hỗ trợ nhiều tính năng hơn, chúng ta có thể thay thế những tác vụ của `jQuery` bằng các phương thức mặc định.

Điều này mang đến nhiều lợi ích như:

* Không quá phụ thuộc vào `jQuery`
* Không cần phải import thêm thư viện. Giảm tải cho server
* Tăng tốc độ xử lý. `jQuery` viết các hàm xử lý bao ngoài JavaScript để thân thiện hơn với người dùng, việc này đương nhiên sẽ làm cho tốc độ xử lý chậm hơn
* Sự ra đời của các thư viện như React, Angular, Vue... đã khiến cho việc can thiệp trực tiếp vào DOM trở thành một thói quen không tốt

Vì thế, dưới đây mình sẽ giới thiệu một số cách để thay thế các hàm của `jQuery` bằng các hàm JavaScript thuần (hay còn gọi là `VanillaJS`), được hỗ trợ bởi phần lớn trình duyệt hiện nay.

## 1. Query Selector

Đối với những selector phổ biến như class, id hoặc thuộc tính thì chúng ta có thể sử dụng như sau:
* `document.querySelector` trả về element đầu tiên được tìm thấy
* `document.querySelectorAll` trả về tất cả các element được tìm thấy dưới dạng một instance của NodeList. Nó có thể được convert qua array bằng cách `[].slice.call(document.querySelectorAll(selector) || []);`
* Nếu không có element nào được tìm thấy, thì `jQuery` sẽ trả về một array rỗng [] trong khi đó DOM API sẽ trả về null. Hãy chú ý đến `Null Pointer Exception`. Bạn có thể sử dụng toán tử || để đặt giá trị default nếu như không có element nào được tìm thấy, ví dụ như `document.querySelectorAll(selector) || []`

**Chú ý** : `document.querySelector` và `document.querySelectorAll` hoạt động khá chậm, hãy thử dùng `getElementById`, `document.getElementsByClassName` hoặc `document.getElementsByTagName` nếu bạn muốn đạt hiệu suất tốt hơn.

```javascript
// Chọn bằng ID
$('#myElement')

// Chọn bằng CSS class
$('.myElement')

// Chọn bằng tên thẻ
$('div')

// Phức tạp hơn
$('article#first p.summary')
```

```javascript
// Chọn bằng ID
document.getElementById('myElement')
document.querySelector('#myElement')

// Chọn bằng CSS class
document.getElementsByClassName('myElement')
document.querySelectorAll('.myElement')

// By tag name
document.getElementsByTagName('div')
document.querySelectorAll('div')

// Phức tạp hơn
document.querySelectorAll('article#first p.summary')
```

## 2. CSS & Style

**Get style của 1 element**

```javascript
// jQuery
$el.css('color');

// Native
const win = el.ownerDocument.defaultView;
win.getComputedStyle(el, null).color;
```

**Set style cho 1 element**
```javascript
// jQuery
$el.css({ color: '#f01' });

// Native
el.style.color = '#f01';
```

**Thêm class**
```javascript
// jQuery
$el.addClass(className);

// Native
el.classList.add(className);
```

**Xóa class**
```javascript
// jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);
```

**Kiểm tra tên class đã tồn tại chưa**
```javascript
// jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);
```

## 3. Thao tác với DOM

**Xóa 1 element**
```javascript
// jQuery
$el.remove();

// Native
el.parentNode.removeChild(el);
```

**Get và set nội dung của element**
```javascript
// jQuery
$el.html();
$el.html(htmlString);

// Native
el.innerHTML;
el.innerHTML = htmlString;
```

**Append**
```javascript
// jQuery
$el.append('<div id="container">Hello World</div>');

// Native (HTML string)
el.insertAdjacentHTML('beforeend', '<div id="container">Hello World</div>');

// Native (Element)
el.appendChild(newEl);
```

## 4. Ajax
[Fetch API](https://fetch.spec.whatwg.org/) là một chuẩn mới thay thế cho `XMLHttpRequest` để xử lý ajax.
```javascript
// jQuery
$(selector).load(url, completeCallback)

// Native
fetch(url).then(data => data.text()).then(data => {
  document.querySelector(selector).innerHTML = data
}).then(completeCallback)
```
Xem thêm về Fetch API tại [đây](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## 5. Events

**Document ready**
```javascript
// jQuery
$(document).ready(function() {
    console.log( "ready!" );
});

// Native
document.addEventListener('DOMContentLoaded', function () {
    console.log("ready!");
});
```

**Bind event bằng on**
```javascript
// jQuery
$el.on(eventName, eventHandler);

// Native
el.addEventListener(eventName, eventHandler);
```

**Unbind event bằng off**
```javascript
// jQuery
$el.off(eventName, eventHandler);

// Native
el.removeEventListener(eventName, eventHandler);
```

## 6. Các hàm tiện ích
Hầu hết các hàm tiện ích của `jQuery` có thể sử dụng trực tiếp bằng Vanilla JS. Những hàm nâng cao khuyến khích sử dụng các thư viện chuyên biệt, nâng cao tính nhất quán và hiệu năng. Ví dụ như [Lodash](https://lodash.com/).

**isArray**
```javascript
// jQuery
$.isArray(array);

// Native
Array.isArray(array);
```

**inArray**
```javascript
// jQuery
$.inArray(item, array);

// Native
array.indexOf(item) > -1;

// ES6-way
array.includes(item);
```

**array loop**
```javascript
// jQuery
$.each(array, (index, value) => {
});
$.map(array, (value, index) => {
});

// Native
array.forEach((value, index) => {
});
array.map((value, index) => {
});
```

**parseJSON**
```javascript
// jQuery
$.parseJSON(str);

// Native
JSON.parse(str);
```

## 7. Promises

JavaScript đã cung cấp các phương thức rất tối giản và đầy đủ để xử lý promise.

**done, fail, always**
```javascript
// jQuery
$promise.done(doneCallback).fail(failCallback).always(alwaysCallback)

// Native
promise.then(doneCallback, failCallback).then(alwaysCallback, alwaysCallback)
```

**when**
```javascript
// jQuery
$.when($promise1, $promise2).done((promise1Result, promise2Result) => {
});

// Native
Promise.all([$promise1, $promise2]).then([promise1Result, promise2Result] => {});
```

Tìm hiểu thêm tại [đây](https://promisesaplus.com/).

## 8. Animation

**Show & hide element**
```javascript
// jQuery
$el.show();
$el.hide();

// Native
el.style.display = ''|'inline'|'inline-block'|'inline-table'|'block';
el.style.display = 'none';
```

**FadeIn & FadeOut**

Xử lý phần này bằng JS thuần có vẻ hơi cực, nên sử dụng một thư viện chuyên về xử lý animation.
```javascript
// jQuery
$el.fadeIn(3000);
$el.fadeOut(3000);

// Native fadeOut
function fadeOut(el, ms) {
  if (ms) {
    el.style.transition = `opacity ${ms} ms`;
    el.addEventListener(
      'transitionend',
      function(event) {
        el.style.display = 'none';
      },
      false
    );
  }
  el.style.opacity = '0';
}

// Native fadeIn
function fadeIn(elem, ms) {
  elem.style.opacity = 0;

  if (ms) {
    const opacity = 0;
    const timer = setInterval(function() {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 1;
  }
}
```

## Kết luận

Bạn có nên từ bỏ `jQuery` không? Câu trả lời là... hên xui. Nếu dự án của bạn đang dùng một thư việc ngoài phụ thuộc vào `jQuery`, chẳng hạn như FancyBox, và việc thay đổi có thể đòi hỏi nhiều thời gian để hoàn thành, thì câu trả lời là không nên. Nếu bạn muốn sử dụng những thư viện mới, và muốn phía client đạt hiệu năng cao nhất thì ưu tiên những giải pháp không cần `jQuery`.

Bài viết này không có ý định khuyên bạn từ bỏ hoàn toàn `jQuery`, cũng không phủ định sự tuyệt vời của nó. Chỉ đơn giản là bổ sung thêm chút thông tin để giúp lựa chọn của các bạn thêm chính xác.

![funny](https://images.viblo.asia/4f30cee2-5b74-49f0-b3c5-74e7b37abc58.png)

(ảnh lượm lặt trên mạng)

## Tham khảo

* https://github.com/nefe/You-Dont-Need-jQuery
* https://ehkoo.com/bai-viet/co-the-ban-khong-can-jquery
* https://viblo.asia/p/ban-nen-hoc-javascript-thuan-truoc-khi-hoc-cac-framework-js-3Q75wDE7KWb
* http://youmightnotneedjquery.com/