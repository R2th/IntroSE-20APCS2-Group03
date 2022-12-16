![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/04/leaves-g81ed61208_1920.jpeg)

Ba thành phần chính cấu tạo nên một trang web là **HTML**, **CSS** và **JavaScript**. 

**HTML** là ngôn ngữ đánh dấu giúp cấu trúc cho nội dung trang. 

**CSS** là ngôn ngữ về các kiểu áp dụng vào nội dung HTML để làm đẹp cho trang

**JavaScript(JS)** là ngôn ngữ kịch bản cho phép tạo một trang web với nội dung cập nhật, hình ảnh động, …

---

Trong bài viết này, mình sẽ cùng bạn tìm hiểu về *các cách thêm code JS vào trang web cùng các chiến lược tải, thực thi code JS*.

## Các cách thêm code JavaScript vào trang web
Để thêm code JS vào một trang web, có ba cách sau:

### Internal JS

Internal JS có thể dịch nôm na là code JS được tải nội bộ, tức là đặt bên trong thẻ <script></script>

```js
<script>code here</script>
```


### External JS với src

External JS sẽ ngược với Internal JS, code JS bây giờ không được đặt bên trong thẻ `<script></script>` nữa mà được đặt ở một nơi khác, và sẽ được tải thông qua đường dẫn được bỏ vào thuộc tính src của thẻ `<script>`

```js
<script src=”script.js”></script>
```

Ví dụ bên trên thể hiện việc tải file script.js nằm cùng thư mục với file chứa code HTML. Đường dẫn này có thể là tuyệt đối hoặc tương đối. 

(Bạn có thể đọc thêm về đường dẫn ở bài viết [này](https://beautyoncode.com/lam-quen-cau-lenh-va-he-thong-tap-tin-trong-linux/).)

### Inline JS

Inline JS là code JS được đặt luôn vào các thẻ HTML. Ví dụ:

```js
<button onclick=”createParagraph()”> Click me!</button>
```

**Lưu ý:** cách này là **BAD PRACTICE** nên bạn xem cho biết chứ hạn chế dùng nhé. Lý do là vì không nên viết code JS chung với code HTML mà nên tách riêng là ngoài. Có thể sử dụng external JS và sử dụng event handler như dưới đây.

```js
conts button = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}
```

Dù là có nhiều cách để thêm code **JS** vào như thế, nhưng trong dự án thực tế bạn sẽ thường thấy JS được thêm vào với kiểu **“External JS“**, tức là code JS sẽ được viết ở file riêng, tải vào bằng src. Việc này sẽ giúp dự án dễ mở rộng và sửa lỗi.

Còn nếu bạn muốn kiểm tra nhanh một đoạn code JS nhỏ thì bạn có thể sử dụng các cách còn lại nếu thấy thuận tiện hơn.

## Các chiến lược tải code JavaScript

Trước khi tìm hiểu liệu việc tải code JavaScript có thể nảy sinh vấn đề gì và cách giải quyết các vấn đề đó, thì việc đầu tiên là bạn cần biết qua *cách một trang web được dựng lên như thế nào?*

### Trang web được dựng lên như thế nào?

Khi bạn gõ đường dẫn vào trình duyệt và nhấn enter, một yêu cầu được gửi đến máy chủ và file HTML được tải về. 

Do đó, trình duyệt sẽ phân tích **HTML** đầu tiên, theo thứ tự từ trên xuống dưới. Trong file này chứa `<link>` để tải tiếp **CSS** và `<script>` để tải tiếp tệp **JavaScript**.

Trong khi phân tích **HTML**, trình duyệt tạo cây **DOM**, tạo cấu trúc **CSSOM** với nội dung **CSS** đồng thời cũng biên dịch và thực thi **JavaScript**.

Quá trình này diễn ra đồng thời, trang web được vẽ lên màn hình và bạn thấy trang web được hiển thị.
    
### Vấn đề thường gặp khi tải code JavaScript

Vậy là nội dung trang web trong file HTML được phân tích và dựng lên theo thứ tự từ trên xuống dưới. 

Và nếu bạn sử dụng JavaScript để thay đổi một thành phần nào đó của trang(một DOM là thẻ `<h2>` nào đó chẳng hạn), thì code sẽ không thể chạy nếu code JavaScript được tải và thực thi trước khi HTML dựng cái DOM(thẻ h2) mà bạn cần thay đổi lên.
    

### Giải quyết vấn đề

Để giải quyết vấn đề trên, có một số cách sau:

#### Dùng internal JS với **DOMContentLoaded**

*Giả sử bạn đang sử dụng internal JS, và đặt thẻ `<script>` ở `<header>`. *

Để đảm bảo tất cả DOM được dựng lên trước khi code JS thực thi, bạn có thể bọc tất cả code JS vào một sự kiện(event) có tên là `DOMContentLoaded`. 

Sự kiện này sẽ lắng nghe khi nào HTML được tải và dựng xong, thì khi đó mới thực thi code JS ở bên trong, do đó sẽ đảm bảo có đủ DOM để thực hiện code JS mà không gây lỗi.
    
```js
<script>
  document.addEventListener('DOMContentLoaded', () => {
     const button = document.querySelectorAll("button");  
  }
</script>
```
   

### Dùng external JavaScript với defer
    
*Giả sử bạn đang sử dụng external JS, và đặt thẻ `<script>` ở `<header>`.*

Để đảm bảo tất cả DOM được dựng lên trước khi code JS thực thi, bạn có thể sử dụng một thuộc tính là defer

Thuộc tính defer sẽ giúp cho trình duyệt biết là sẽ tiếp tục tải và dựng HTML dù cho nó có đọc thấy thẻ `<script>`. Tức là quá trình dựng DOM sẽ không bị ngắt quãng, đồng thời code JS vẫn được tải về, nhưng chưa được thực thi. Code JS sẽ thực thi một khi quá trình dựng DOM hoàn thành.

```js
<script src="script.js" defer></script>
```

#### Đặt code JavaScript load ngay trước thẻ `</body>`

Vì đã hiểu được lý do là DOM chưa dựng lên đủ để code JS thực thi mà không gây ra lỗi, nên có thể đảm bảo điều này bằng cách đặt `<script>` ngay trước thẻ `</body>`. Tức là code JS sẽ là code được tải và thực thi sau khi đã dựng xong DOM. 

Tuy nhiên, cũng có một vài vấn đề cho giải pháp này là code JS sẽ load cuối cùng dẫn đến nếu code JS nặng thì sẽ tạo nên vấn đề lớn về hiệu suất tải trang, làm chậm trang web. 

Cách này trước đây được sử dụng nhiều, khi mà chưa có `async/defer` ra đời. Tuy nhiên, nay thì nó đã khá lỗi thời nên ít được dùng đến vì hiệu quả không cao.

---

Vậy là chúng ta đã cùng đi qua những cách để thêm code JavaScript vào một trang web, cách một trang web được tải và dựng lên, cũng như các chiến lược tải và thực thi code JavaScript dựa trên vấn đề chính thường gặp.

[Bài gốc của nội dung này](https://beautyoncode.com/chien-luoc-tai-thuc-thi-code-javascript/) nằm trên blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!