## Page: DOMContentLoaded, load, beforeunload, unload.

Vòng đời của một trang HTML có 3 events chính:
*
* `DOMContentLoaded` - trình duyệt sẽ tải đầy đủ trang HTML, và DOM tree( cây) được built, nhưng các tài nguyên như hình ảnh,  css ... vẫn chưa được tải.
* `load` - không chỉ HTML được tải , mà còn tất cả các tài nguyên như hình ảnh, css, ...
* `beforeunload/unload` - user rời khỏi trang.

Tác dụng của mỗi event:

* `DOMContentLoaded` event - DOM đã sẵn sàng, có thể thao tác với DOM. vd: `document.querySelector('.className')`.
* `load` event - Tài nguyên đã được tải, như hình ảnh, css,...
* `beforeunload` event - Người dùng sẽ rời khỏi trang: chúng ta có thể kiểm tra xem người dùng có lưu các thay đổi hay không và hỏi họ xem họ có thực sự muốn rời đi không.
* `unload` event - người dùng gần như rời đi, nhưng chúng ta vẫn có thể bắt đầu một số thao tác, chẳng hạn như gửi số liệu thống kê.

Chúng ta sẽ đến với chi tiết của những event này.

### DOMContentLoaded

Sự kiện `DOMContentLoaded` xảy ra trên đối tượng `document`.

Nếu muốn sử dụng chúng ta phải bắt sự kiện  bằng `addEventListener`:

```
document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
```

vd: 

```
<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

Trong ví dụ, trình xử lý `DOMContentLoaded` chạy khi `document`  được tải, do đó nó có thể thấy tất cả các `element`, bao gồm cả `<img>` bên dưới.

Nhưng nó không chờ đợi hình ảnh tải. Vì vậy, `alert` ra  kích thước bằng 0.

Ngay từ cái nhìn đầu tiên, sự kiện `DOMContentLoaded` rất đơn giản. `DOM` tree đã sẵn sàng - có thể bắt sự kiên tại đậy.

### DOMContentLoaded and scripts

Khi trình duyệt xử lý `HTML-document` và bắt gặp thẻ `<script>`, nó cần thực thi trước khi tiếp tục building DOM. Đây là một biện pháp phòng ngừa, vì `scripts` có thể sửa đổi DOM và thậm chí `document.write` vào nó, vì vậy `DOMContentLoaded` phải chờ.

Vì vậy, `DOMContentLoaded` chắc chắn  sau scripts:


```
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

Ở ví dụ trên, chúng ta sẽ nhìn thấy theo thứ tụ là "Library loaded..."  rồi "DOM ready".


### DOMContentLoaded and styles

Các tài nguyên bên ngoài như hình không ảnh hưởng đến DOM, vì vậy `DOMContentLoaded` không đợi chúng.

 Nếu chúng ta có script sau style, thì script đó phải đợi cho đến khi stylesheet được tải:
 
 ```
 <link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

Lý do cho điều này là đoạn script có thể muốn lấy tọa độ và các thuộc tính phụ thuộc kiểu khác của các `element`, như trong ví dụ trên. Đương nhiên, nó phải chờ style được tải.

Vì `DOMContentLoaded` đợi script, nên giờ nó cũng phải đợi các style trước chúng.

### Built-in browser autofill

Firefox, Chrome and Opera tự động điền(autofill) vào `DOMContentLoaded`.

Ví dụ: nếu trang có biểu mẫu đăng nhập và mật khẩu và trình duyệt ghi nhớ các giá trị, thì trên `DOMContentLoaded`, nó có thể  tự động điền chúng (nếu được người dùng đồng ý).

Vì vậy, nếu `DOMContentLoaded` bị hoãn bởi thời gian tải script, thì tính năng autofill cũng đang đợi. Có thể bạn đã thấy điều đó trên một số trang web (nếu bạn sử dụng tự động điền trình duyệt) - các trường đăng nhập / mật khẩu không được tự động điền ngay lập tức, nhưng sẽ có delay cho đến khi trang tải đầy đủ, khi có sự kiện `DOMContentLoaded`.


### window.onload

Sự kiện `load` trên đối tượng `windown` kích hoạt khi toàn bộ trang được tải bao gồm các styles, hình ảnh và các tài nguyên khác.

Ví dụ dưới đây hiển thị chính xác kích thước hình ảnh, bởi vì `window.onload` chờ tất cả hình ảnh:

```
<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

### window.onunload

Khi một người dùng rời khỏi trang, sự kiện `unload` sẽ kích hoạt trên `windown`. Chúng ta có thể làm một cái gì đó mà không có liên quan đến delay, như đóng các cửa sổ bật lên có liên quan.

Chúng ta có thể thu thập dữ liệu về cách sử dụng trang: nhấp chuột, cuộn, xem các khu vực trang, v.v.

Đương nhiên,`unload` event là khi người dùng rời khỏi trang và chúng ta muốn lưu dữ liệu trên máy chủ của chúng ta.

Tồn tại một phương thức `navigator.sendBeacon (url, dữ liệu)`  đặc biệt cho việc này, được mô tả trong [https://w3c.github.io/beacon/](https://w3c.github.io/beacon/)

to be continue ...