Chúng ta thương thấy 3 method này và có thể dẫn dến bối rối và nhầm lẫn giữa chúng:

- Event.preventDefault()
- Event.stopPropagation()
- Event.stopImmediatePropagation()

# Tóm tắt

Đầu tiên hãy xem tóm tắt tại MDN nhé :D

- **preventDefault**: Huỷ bỏ event nếu nó có thể huỷ mà không dừng sự lan rộng(propagation) của event tới phần khác.
- **stopPropagation** Ngăn chặn sự lan rộng của sự kiện hiện tại tới thằng khác.
- **stopImmediatePropagation** ngăn chặn những listeners cũng đang đang lắng nghe cùng event được gọi.

# Event.preventDefault

Hãy nhìn vào mãi ví dụ ở dưới. Chúng ta sẽ thấy việc click vào submit button trên form sẽ gửi nội dung của form tới chỗ xử lý. Event.preventDefault là cách hoàn hảo để không cho gửi form khi nhấn vào button submit.

```html
<form id="myForm" action="/my-handling-form-page" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" />
  </div>
  <div>
    <label for="mail">E-mail:</label>
    <input type="email" id="mail" />
  </div>
  <div>
    <label for="msg">Message:</label>
    <textarea id="msg"></textarea>
  </div>

  <div class="button">
    <button type="submit">Send your message</button>
  </div>
</form>
```

```Javascript
    $('#myForm').on('submit', function(e) {
    e.preventDefault(); // Now nothing will happen
});
```

Event.preventDefault sẽ đảm bảo rằng form không bao giờ được gửi, và nó đã giành được quyền kiểm soát và ngăn chặn sự kiện đó khi click. Đó là những gì chúng ta đã làm.

# Event.stopPropagation

stopPropagation để đảm bảo chắc chắn rằng event không lan rộng nữa. Hãy xem ví dụ ở dưới:

```html
<div class="container">
  <a href="#" class="element">Click Me!</a>
</div>
```

```Javascript
$('.container').on('click', function(e) {
    console.log('container was clicked');
});

$('.element').on('click', function(e) {
    e.preventDefault(); // Now link won't go anywhere
    console.log('element was clicked');
});
```

Bây giờ nếu bạn click link và trước đó đã mở console bạn sẽ thấy:

```Javascript
    "element was clicked"
    "container was clicked"
```

Bây giờ hãy thêm Event.stopPropagation:

```Javascript
    $('.container').on('click', function(e) {
    console.log('container was clicked');
});

$('.element').on('click', function(e) {
    e.preventDefault(); // Now link won't go anywhere
    e.stopPropagation(); // Now the event won't bubble up
    console.log('element was clicked');
});
```

Và click lại. Đây sẽ là cái bạn thấy:

```Javascript
    "element was clicked"
```

# Event.stopImmediatePropagation

Với 2 methods ở trên đã giúp bạn khoảng 90% các trường hợp cần thiết phải xử lí với events. Nhưng hãy tìm hiểu tiếp mothod cuối này nhé :D.

Chúng ta sẽ bắt đầu với markup tương tự ở trên, và thêm vào một class. Một cái là item mà tất cả các anchors sẽ nhận, và một cái riêng chỉ cho markup ở đây. Nó rất quan trọng để giúp code ví dụ này hoặt động.

```Javascript
    <div class="container">
        <a href="#" class="item element">Click Me!</a>
    </div>
```

Và chúng sẽ thêm Event.stopPropagation mothod mà chúng ta đã tìm hiểu ở phần trước.

```Javascript
$('.item').on('click', function(e) {
    console.log('an item was clicked');
});

$('.element').on('click', function(e) {
    e.preventDefault(); // Now link won't go anywhere
    e.stopPropagation(); // Now the event won't bubble up
    console.log('element was clicked');
});
```

Bây giờ hãy hãy xem có gì ở console khi click nhé.

```Javascript
"an item was clicked"
"element was clicked"
```

Vấn đề ở đây là .item và .element được xếp đồng hạng trên DOM. Nó không lan tràn lên phần tử trên như ví dụ trước đó. Và vì khi click cả 2 action gắn trên .element và .item sẽ chạy cùng lúc, bạn không thể dừng lan rộng(propagation) như bạn mong muốn.

Đây chính là cơ hội để xử dụng stopImmediatePropagation!

```Javascript
$('.element').on('click', function(e) {
    e.preventDefault(); // Now link won't go anywhere
    e.stopImmediatePropagation(); // Now item on click won't fire
    console.log('element was clicked');
});

$('.item').on('click', function(e) {
    console.log('an item was clicked');
});
```

Điêu quan trọng ở đây để ngăn chặn sự lan rộng tới cùng hạng của event trong DOM là đặt stopImmediatePropagation ở ngay khai báo lệnh đầu tiên về action lắng nghe event click trong code của bạn. Như ở dây là chuyển các method từ .item lên .element.

Và thành của của chúng ta đây:

```Javascript
"element was clicked"
```

[Bài tham khảo](https://codeplanet.io/preventdefault-vs-stoppropagation-vs-stopimmediatepropagation/?fbclid=IwAR0D1RDmzVvpwLJQWWidniDCjujqC9e43LknUxyMDUq0gbbbBBEH_u4Wjg0)