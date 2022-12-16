Trong bài viết này, chúng ta sẽ cùng nói về các phần tử `<input>` hỗ trợ tạo ra các biểu mẫu nhập liệu để thu thập thông tin từ người sử dụng. Ví dụ thường thấy của các phần tử `<input>` và các biểu mẫu nhập liệu trên các trang web là khung đăng nhập tài khoản người dùng, ô tìm kiếm, v.v.... Hãy mở đầu với một vài trường nhập liệu văn bản.

## Các phần tử `input` cơ bản nhất

Kiểu `input` cơ bản nhất được thấy trên hầu hết các trang web là `text`.
Một ô nhập liệu nhỏ cho phép chúng ta nhập vào 1 dòng chữ.

```text.html
Trường text thông thường:<br>
<input type="text" placeholder="Bạn có thể gõ chữ ở đây..."><br>
Trường text mật khẩu:<br>
<input type="password" placeholder="Mật khẩu sẽ được ẩn đi">
```

Liên kết tham khảo: [thuộc tính `type`](https://www.w3schools.com/tags/att_input_type.asp).

## Container `<form>`

Để đóng gói dữ liệu thu thập được từ người sử dụng và gửi về một máy chủ thực hiện dịch vụ,
các thẻ input cần được đặt trong một container `<form>` có một nút nhấn `submit`.

```form.html
<form>
   Tên của bạn:<br>
   <input type="text" name="name"><br>
   Tin nhắn:<br>
   <input type="text" name="message"><br>
   <br>
   <button type="submit">Gửi</button>
   <button type="reset">Đặt lại</button>
</form>
```

Khi các `input` được sử dụng trong một biểu mẫu để thu thập và gửi thông tin tới máy chủ,
mỗi `input` sẽ cần được gắn tên bằng [thuộc tính `name`](https://www.w3schools.com/tags/att_name.asp). Đây là một tiện ích được thiết kế để coder có thể làm việc với các thông tin thu thập được khi viết code cho phần mềm xử lý ở phía máy chủ.

## Bảo mật khi nhận & gửi dữ liệu

Theo thiết lập mặc định thì khi một biểu mẫu được xác nhận gửi đi, các thông tin thu thập được sẽ được hiển thị ngay trên thanh địa chỉ của trình duyệt web mà bạn đang sử dụng.

![](https://images.viblo.asia/7587d5cb-5025-4eba-961e-12304f7ebddd.jpg)

Điều này không có vấn đề gì đối với những thông tin chung chung như từ khóa tìm kiếm google, hay từ khóa tìm kiếm sản phẩm trên một trang web bán hàng online. Tuy nhiên, trong trường hợp những thông tin thu thập được rất quan trọng như thông tin đăng nhập, thì chúng ta cần sử dụng [thuộc tính `method`](https://www.w3schools.com/tags/att_form_method.asp) để giữ cho các thông tin được an toàn.

Thuộc tính `method` có thể được sử dụng với 1 trong 2 giá trị: `get` và `post`. Trong đó `method="get"` được sử dụng ngầm định nếu không được chỉ định trong code HTML. Còn `method="post"` chính là phương thức có thể giúp chúng ta ngăn không cho những thông tin quan trọng bị hiển thị trên thanh địa chỉ của trình duyệt web.

```post.html
<form method="post">
   <!-- inputs & buttons -->
</form>
```

[[HTML] Bài 8 - Các Kiểu Input Khác](https://viblo.asia/p/html-bai-8-cac-kieu-input-khac-gAm5yExk5db)