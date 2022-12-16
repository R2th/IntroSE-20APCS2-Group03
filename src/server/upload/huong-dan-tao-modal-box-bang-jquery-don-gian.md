**Giới thiệu:**

**Modal Box** hay **Popup** là những thuật ngữ quen thuộc trong  **Jquery**. Nó giúp mở một cửa sổ nhỏ, nổi bật giữa trang web để hiện thông báo hướng dẫn, giới thiệu hay tạo một form lấy thông tin từ người dùng. Những box như vậy tương tác ngay trên trang hiện tại mà không cần mở trang mới, điều này tạo sự thân thiện và thích thú với người xem.

![](https://images.viblo.asia/cc6014e4-a956-4b71-901b-1559563f6ff8.png)

**HTML:**

```
<h2>Modal Demo</h2>
<button class='btn'>Open Modal</button>
<div class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Modal Box</p>
  </div>
</div>
```

**CSS:**

```
body {
  font-family: Arial, Helvetica, sans-serif;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, .4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
```

**JS:**

```
$(document).ready(function () {
  var modal = $('.modal');
  var btn = $('.btn');
  var span = $('.close');

  btn.click(function () {
    modal.show();
  });

  span.click(function () {
    modal.hide();
  });

  $(window).on('click', function (e) {
    if ($(e.target).is('.modal')) {
      modal.hide();
    }
  });
});
```

**Demo:**

https://codepen.io/huongk54a2/pen/EMGxwP

**Kết luận:** 

Hy vọng bài viết này sẽ giúp mọi người tạo ra được 1 Modal Box hay Popup đơn giản gọn nhẹ. Bài viết sau mình sẽ hướng dẫn mọi người tạo Tab bằng Jquery. Cảm ơn mọi người đã theo dõi.