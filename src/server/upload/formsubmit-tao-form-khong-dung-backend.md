![](https://i2.wp.com/tienminhvy.com/wp-content/uploads/2020/08/formsubmit.png?resize=750%2C375&ssl=1)

Bài viết này mình xin chia sẻ với các bạn cách tạo Form liên hệ không dùng Backend một cách dễ dàng và nhanh gọn nhất có thể bằng cách sử dụng FormSubmit.

> Bài viết gốc: https://tienminhvy.com/kinh-nghiem/formsubmit-tao-form-khong-dung-backend

# Vấn đề

Như thường lệ, khi bạn tạo một mẫu form trong lập trình thì việc kết hợp ngôn ngữ lập trình PHP (hay thậm chí là MySQL) là điều chắc chắn phải làm. Tuy vậy, nếu bạn chỉ rành về Frontend nhưng không rành PHP và MySQL thì làm sao bây giờ?

Dùng Google Form? Không chuyên nghiệp! Nhờ người có kinh nghiệm? Có thể sẽ tốn phí, không cần thiết. Vì thế, để giải quyết vấn đề, FormSubmit đã ra đời.

# FormSubmit là gì?

Với FormSubmit, bạn hoàn toàn có thể tự thiết kế form HTML cho chính mình mà không cần phải sử dụng giao diện bên thứ 3 như Google,... Đây có thể coi là giải pháp khá ổn nếu bạn muốn tự tạo form tuỳ chỉnh một cách chuyên nghiệp hơn, không lệ thuộc vào Google hay bên thứ 3 nào khác.

Nếu vậy thì FormSubmit có cần bổ sung thêm Javascript không? Hoàn toàn không! Bạn chỉ cần tích hợp nó vào trong một mẫu form đơn giản bằng HTML và mọi thứ đã hoàn tất.

# Cách FormSubmit hoạt động

Cơ chế hoạt động của nó cũng tương đối đơn giản. Bạn thêm một URL vào phần **action** của một form và thế là xong. Người dùng chỉ cần nhập đủ các yêu cầu Form bạn thiết kế và nhấn Gửi thôi.

Tuy vậy, nó chỉ có thể giúp bạn có thể nhận lời nhắn từ người dùng mà thôi, không xử lý các tác vụ phức tạp được. Ngoài ra, nó cũng có hỗ trợ reCaptcha nữa, hạn chế Spam một cách tối đa.

# Hướng dẫn cách tạo Form không dùng Backend bằng FormSubmit

Để sử dụng, bạn tạo một form theo mẫu sau:

```html
<form action="https://formsubmit.co/email@example.com" method="POST"> 
  <label for="name">Tên</label> 
  <input id="name" type="text" name="name" required /><br /> 
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required /><br />
  <label for="message">Lời nhắn</label><br /> 
  <textarea id="message" name="message" placeholder="Lời nhắn" required ></textarea><br /> 
  <button type="submit">Gửi</button>
</form>
```

Sau đó, bạn chỉ cần đổi email@example.com thành email của bạn, rồi nhập dữ liệu giả vào (ví dụ như lần lượt từng ô nhập vào là test, test@test và test) rồi nhấn gửi.

![](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/08/formsubmit_02.png?resize=1024%2C332&ssl=1)

Nó sẽ gửi cho bạn một email với tiêu đề "Action Required: Activate FormSubmit on url-cua-ban" để xác nhận sẽ nhận lượt gửi từ url bạn đặt form đó (chú ý là bạn phải đặt trên localhost - host cá nhân dùng XAMPP hoặc AMPPS, hoặc dùng hosting).

![](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/08/formsubmit_01.png?w=1024&ssl=1)

Bạn vào thư đó và click xác nhận ACTIVATE FORM, sau khi nhấn vào mà nó chuyển sang trang có giao diện như thế này là hoàn tất.

![](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/08/formsubmit_03.png?w=867&ssl=1)

Và sau này, người dùng chỉ cần nhập theo form bạn đã thiết kế bằng HTML và CSS là xong. Có điều là người dùng sẽ phải biết chút ít về Tiếng Anh mới dễ thao tác ý :v

# Một số tính năng nâng cao

Các tính năng nâng cao chính như:

## _replyto

Cái này thì mặc định form nào cũng có cả rồi, tính năng này sẽ giúp bạn có thể reply (phản hồi) với người đã gửi form. Để kích hoạt tính năng này bạn thêm đoạn mã dưới vào form (trong thẻ <form></form>)

```html
<input type="email" name="email" placeholder="Email Address">
```

## _next

Mặc định thì khi gửi form thì người dùng sẽ được chuyển thẳng tới Landing page của FormSubmit luôn, tuy nhiên nếu bạn muốn thay đổi thì chỉ cần thêm đoạn bên dưới vào form là được.

```html
<input type="hidden" name="_next" value="https://example.com/landingpage.html">
```

Và nhớ thay URL https://example.com/landingpage.html thành URL của bạn

## _subject

Tính năng này dùng để thêm Tiêu đề của thư bạn muốn gửi đến. Ví dụ bạn không muốn dùng tiêu đề mặc định thì có thể dùng tính năng này. Để kích hoạt bạn thêm đoạn sau vào form:

```html
<input type="hidden" name="_subject" value="Tiêu đề mới!">
```

Trong đó ngay chỗ "Tiêu đề mới!" bạn thay thành tiêu đề bạn chọn là xong.

## _cc

CC này không phải nói tục đâu nghen :)) Đây là chức năng của email đó. Dạng như nó sẽ tạo bản sao rồi gửi cho nhiều người cùng lúc. Tính năng này đôi khi cũng khá hữu ích với bạn đó.

Ví dụ bạn muốn tạo bản sao cho email example@example.com đi thì chỉ cần thêm đoạn sau:

```html
<input type="hidden" name="_cc" value="example@example.com">
```

Thay example@example.com thành email bạn muốn là được, nếu bạn muốn tạo nhiều bản sao rồi gửi nhiều email cùng lúc thì phân cách mỗi email bằng dấu phẩy như này:

```html
<input type="hidden" name="_cc" value="email1@example.com,email2@example.com">
```

Nhớ thay email1@example.com với email2@example.com thành các email của bạn!

## _honey

Tính năng này thì cũng không hữu dụng lắm vì chủ yếu khi bạn muốn tắt form đi thì kích hoạt nó là xong. Nhưng dùng reCaptcha của Google rồi thì không cần thêm vào nữa. Nếu thích thì bạn có thể kích hoạt bằng cách thêm đoạn sau:

```html
<input type="text" name="_honey" style="display:none">
```

Nhớ thêm style="display:none" vào tag input để ẩn nó nhé!

## Tắt reCaptcha bằng _captcha

Bạn có thể tắt reCaptcha bằng tính năng này nếu không muốn sử dụng tính năng reCaptcha của Google, nhưng mình khuyên bạn không nên tắt reCaptcha vì nó sẽ tạo điều kiện cho các email SPAM vô tội vạ vào hòm thư của bạn. Nhưng nếu bạn vẫn muốn tắt thì thêm đoạn sau vào form:

```html
<input type="hidden" name="_captcha" value="false">
```

## _autoresponse

Bạn có thể thiết lập tin nhắn tự động trả lời thông qua kích hoạt tính năng sau bằng đoạn mã:

```html
<input type="hidden" name="_autoresponse" value="Tin nhắn của bạn">
```

Thay dòng "Tin nhắn của bạn" thành đoạn văn bản bạn muốn, nhớ thêm tag input email vào mới kích hoạt được nha:

```html
<input type="email" name="email" placeholder="Email">
```

## _template

Bạn cũng có thể đổi template cho thư mình nhận khi người dùng gửi form nữa đó. Hiện thì FormSubmit hỗ trợ 3 loại: basic (mặc định), table, box.

![](https://i2.wp.com/formsubmit.co/image/basic-template.png?resize=732%2C627&ssl=1)

Loại basic

![](https://i0.wp.com/formsubmit.co/image/table-template.png?resize=730%2C588&ssl=1)

Loại table

![](https://i0.wp.com/formsubmit.co/image/box-template.png?resize=730%2C767&ssl=1)

Loại box

Để có thể thay đổi thì bạn dùng đoạn mã sau vào form:

```html
<input type="hidden" name="_template" value="table">
```

# Các tính năng nâng cao khác
## _webhook

Đây là tính năng nâng cao dành cho API. Khi gửi form thì sẽ kích hoạt API luôn.

```html
<input type="hidden" name="_webhook" value="https://example.com/webhook">
```

Bạn có thể xem ví dụ về API của FormSubmit [tại đây](https://formsubmit.co/api-documentation)

## Ẩn email

Bạn còn nhớ cái email bạn đầu bạn nhận để Activate form không, nó có gửi bạn một cái dãy dài ngoằn ngay chỗ "Use this email address alias..." đó, đó chính là email của bạn đã mã hoá đó.

Với cách này, bạn có thể bảo đảm cho địa chỉ email của bạn an toàn khỏi những Spammer, bạn có thể kích hoạt bằng cách đổi URL ngay chỗ action thành:

```html
<form action="https://formsubmit.co/doan-ma" method="POST" />
```

Thay doan-ma bằng cái chuỗi mà bạn nhận được trong email đó là xong.

## Upload file

Bạn cũng có thể cho phép người dùng kèm file vào nữa, bạn chỉ cần thêm enctype="multipart/form-data" vào thẻ form (bên cạnh action) và thêm thẻ này vào form:

```html
<input type="file" name="attachment" accept="image/png, image/jpeg">
```

Tuy vậy, cách này không khuyến khích vì có thể xảy ra các lỗi bảo mật.

## Form Ajax (động)

Nếu bạn không muốn chuyển trang khi nhấn gửi thì tính năng này rất phù hợp với bạn. Chỉ cần thêm đoạn sau vào nơi cuối cùng của file HTML là xong:

```html
<script>
$.ajax({
url: "https://formsubmit.co/ajax/email@example.com",
method: "POST",
data: {message: "hello!"}
});
</script>
```

Đổi email@example.com thành email của bạn hoặc chuỗi bạn nhận được trong email ban đầu.

## Truy cập vào khu lưu trữ form người dùng đã gửi

Bạn xem thêm về API của họ [tại đây](https://formsubmit.co/api-documentation)

# Tóm lại

Bài viết này tương đối dài, nhưng mình đã tóm gọn lại rồi, hy vọng qua bài này bạn có thể tự tạo một form mẫu và dùng nó để nhận tin nhắn người dùng gửi đến một cách tốt nhất nhé.

Chúc các bạn thành công!