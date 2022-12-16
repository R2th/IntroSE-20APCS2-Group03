# Mở đầu
Một trong những vấn đề lớn nhất trong lập trình là đối phó với bảo trì. Trong thực tế, chúng ta không luôn bắt đầu phát triển các dự án từ đầu. Hầu hết, chúng ta được chỉ định (hoặc nhận) một dự án đã được viết có thể một vài năm trước hoặc thậm chí lâu hơn.

Để làm việc hiệu quả với dự án đó, trước tiên chúng ta cần hiểu mã nguồn. Đây là điểm khi chúng tôi ngay lập tức nhận ra tầm quan trọng của mã sạch. Là nhà phát triển, chúng tôi phải cố gắng viết mã của mình càng sạch càng tốt.

Đây cũng là trường hợp cho CSS. Có một số điểm chúng ta cần chú ý trong khi viết CSS. Trong bài đăng này, tôi muốn chia sẻ một số những điều quan trọng nhất với bạn. Tôi tin rằng 7 mẹo này sẽ giúp bạn cải thiện chất lượng mã CSS của mình.

Vậy hãy bắt đầu ...
![](https://images.viblo.asia/6413a84d-136b-4da2-a710-8c85c010c4f6.jpeg)
# 1. DRY
**DRY** là viết tắt của "**Don't Repeat Yourself**" - "**Đừng lặp lại chính mình**" . Đây là một nguyên tắc phát triển phần mềm chung và có thể được áp dụng trong bất kỳ ngôn ngữ lập trình nào, cũng như trong CSS. Như chúng ta có thể hiểu từ tên của nó, DRY nhằm mục đích tránh hoặc giảm sự lặp lại càng nhiều càng tốt.

Ví dụ: chúng ta có thể tạo 3 lớp CSS cho 3 nút như thế này:
```
.primary-button {
  background: blue;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}

.form-button {
  background: green;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}

.cancel-button {
  background: red;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}
```

Hoặc chúng ta có thể sử dụng nguyên tắc DRY bằng cách viết các quy tắc chung **once** - **một lần** trong một lớp bổ sung và các quy tắc khác nhau trong các lớp khác:
```
.button {
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}

.primary-button {
  background: blue;
}

.form-button {
  background: green;
}

.cancel-button {
  background: red;
}
```

Như chúng ta có thể thấy, áp dụng nguyên tắc DRY tránh sự lặp lại, giảm số lượng dòng và cải thiện khả năng đọc và thậm chí hiệu suất.
# 2. Naming
Đặt tên bộ chọn CSS là một điểm quan trọng khác để viết CSS tốt hơn. Tên của bộ chọn phải **self-descriptive and readable** - **tự mô tả và có thể đọc được** ...
```
// BAD NAMING

.p {
  // Rules
}

.myFirstForm {
  // Rules
}
```
Thông thường, `<p>` là thẻ HTML và là viết tắt của đoạn văn. Ở trên, chúng ta không thể thực sự hiểu lớp p là gì. Ngoài ra, bạn nên tránh các tên như myFirstForm và tôi không khuyên bạn nên sử dụng camel case .

Thay vào đó, hãy sử dụng tên khai báo (được phân tách bằng dấu gạch ngang cho nhiều tên):
```
// GOOD NAMING

.article-paragraph {
  // Rules
}

.contact-form {
  // Rules
}
```
Đặt tên mọi thứ trong lập trình không phải là dễ dàng, nhưng có nhiều quy ước đặt tên khác nhau mà bạn có thể sử dụng trong dự án của mình.
# 3. Không sử dụng kiểu nội tuyến
Theo tôi, thực tế tốt nhất là không sử dụng kiểu nội tuyến. Tôi sẽ tập trung ở đây về lý do tại sao chúng ta không nên.

### Tách mối quan tâm
Theo nguyên tắc phân tách mối quan tâm, thiết kế (CSS), nội dung (HTML) và logic (JavaScript) nên được tách biệt vì các lý do như khả năng đọc và bảo trì tốt hơn.

Bao gồm các quy tắc CSS bên trong các thẻ HTML phá vỡ quy tắc này:
```
<div style="font-size: 16px; color: red;">Some Text</div>
```
### Khó khăn trong tìm kiếm
Một vấn đề khác khi sử dụng kiểu nội tuyến là chúng ta không thể tìm kiếm chúng. Vì vậy, khi chúng ta cần thay đổi về kiểu dáng, chúng ta thường tìm kiếm các bộ chọn CSS của phần tử HTML.

Ví dụ: hãy thay đổi kích thước phông chữ của văn bản trên trang web của chúng tôi. Để làm điều đó, trước tiên, chúng tôi tìm thấy phần cụ thể đó trên trình duyệt nơi cần thay đổi bằng cách xem cấu trúc HTML:
```
<div class="text-bold">Some Text</div>
```
Sau đó, chúng ta cần tìm bộ chọn, đó là lớp **text-bold** ở đây. Cuối cùng, chúng tôi đến lớp đó và thực hiện các thay đổi:
```
.text-bold {
  font-size: 16px;    // change the font-size to 14px
  font-weight: bold;
}
```
Nhưng nếu các quy tắc được viết theo kiểu nội tuyến thay vì sử dụng các lớp:
```
<div style="font-size: 16px; font-weight: bold">Some Text</div>
```
Ngay cả khi chúng tôi tìm thấy thẻ HTML, chúng tôi không thể biết liệu có các quy tắc kích thước phông chữ khác trong HTML hay không. Vì không có bộ chọn nào được sử dụng, chúng tôi phải lần lượt đi qua tất cả các trang HTML, cố gắng tìm các quy tắc kích thước phông chữ khác và thay đổi chúng.
### Các vấn đề Specificity / Overwrite
Inline-Styles có độ đặc hiệu cao nhất trong số các bộ chọn CSS (không tính các thẻ !important).
```
.text-bold {
  font-size: 16px;
  font-weight: bold;
}
```
```
<div class="text-bold" style="font-size: 14px">Some Text</div>
```
Ở đây, kích thước phông chữ của văn bản sẽ là 14px , vì kiểu nội tuyến có độ đặc hiệu cao hơn các lớp CSS. Khi bạn thực hiện một thay đổi trong lớp:
```
.text-bold {
  font-size: 20px;
  font-weight: bold;
}
```
Cỡ chữ vẫn sẽ là 14px. Vì vậy, thay đổi của bạn trong lớp CSS sẽ không hoạt động, điều này sẽ khiến bạn phải nói:

"Này, tại sao mã CSS của tôi không hoạt động? Tôi ghét CSS!"
và dẫn bạn sử dụng một thẻ !important Điều kỳ diệu:
```
.text-bold {
  font-size: 20px !important;
  font-weight: bold;
}
```
Đó là một điều không nên và không dẫn chúng ta đến điểm tiếp theo.
# 4. Tránh các thẻ !important
OK, vì vậy CSS của bạn không hoạt động như mong muốn và bạn đã làm cho nó hoạt động bằng cách áp dụng thẻ !important:
```
!important
```
Chuyện gì xảy ra tiếp theo? Thẻ !important có độ đặc hiệu cao nhất trong tất cả các bộ chọn CSS.

Về cơ bản, bạn đang nói với trình duyệt để áp dụng quy tắc cụ thể đó với thẻ !important luôn luôn và trong mọi trường hợp. Điều này là không tốt vì các quy tắc CSS có thể khác nhau từ bộ chọn này sang bộ chọn khác, từ bộ chọn cha mẹ đến con.

Cách duy nhất để ghi đè một thẻ !important là sử dụng một thẻ !important khác . Và điều này dẫn đến việc sử dụng các thẻ ngày càng quan trọng hơn. Tin tôi đi, trong tương lai gần mã dự án của bạn sẽ đầy! các thẻ !important , làm cho mã CSS của bạn khó bảo trì hơn nhiều. Vì vậy, cố gắng không sử dụng nó.
# 5. Sử dụng bộ tiền xử lý
Làm việc với Bộ xử lý CSS như Sass hoặc LESS rất hữu ích trong các dự án lớn hơn. Bộ tiền xử lý mang đến các tính năng bổ sung cho mã CSS mà chúng ta thường không thể làm được.

Ví dụ: chúng ta có thể xác định các biến, hàm và mixin, chúng ta có thể nhập và xuất các tệp CSS của mình trong các tệp CSS khác và chúng ta có thể viết mã CSS lồng nhau:
![](https://images.viblo.asia/aed0fb21-a7b5-4e04-b2ae-6f0603c671d6.png)
Một bộ tiền xử lý có cú pháp riêng và sau đó nó được dịch sang CSS tiêu chuẩn (trong một tệp CSS riêng) vì các trình duyệt không hiểu cú pháp.
# 6. Sử dụng Shorthands
Một số thuộc tính CSS như paddings, margins, fonts và borders có thể được viết theo cách đơn giản hơn nhiều bằng cách viết tắt. Sử dụng Shorthands giúp giảm các dòng quy tắc.

Vì vậy, không có Shorthands, một lớp CSS sẽ trông như thế này:
```
.article-container {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border-width: 1px;
  border-style: solid:
  border-color: black;
}
```
và với Shorthands, nó trông như thế này:
```
.article-container {
  padding: 10px 15px 20px 15px;
  margin: 10px 15px;
  border: 1px solid black;
}
```
# 7. Thêm comment khi cần thiết
Thông thường, mã chất lượng không cần bình luận vì nó phải rõ ràng và tự mô tả. Tuy nhiên, trong một số trường hợp, chúng ta có thể cần phải viết giải thích bổ sung.
```
// Your Comments
.example-class {
  // your rules
}
```
Vì vậy, khi bạn cảm thấy rằng một số phần của mã không rõ ràng, thì đừng ngại thêm ý kiến (nhưng mặt khác, hãy đảm bảo không lạm dụng nó).