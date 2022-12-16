# Intro
> Bug đã được fix nên giờ mới được publish bài viết. Tất cả nội dung dưới đây chỉ còn tính tham khảo :warning: 

Trong một ngày đẹp trời, thấy platform X thông báo về một dịch vụ mới mang tên Y tại địa chỉ: https://subdomainy.sitex.com. Cảm thấy bị lôi cuối với những lời lẽ "có cánh" mà X quảng cáo, tôi cũng dành chút thời gian vào dùng thử xem sao. Nhìn chung dịch vụ có nhiều chức năng rất hay, thú vị, và tiện lợi, các bạn cũng nên thử qua :grinning:. Tuy nhiên, đối với một người có sẵn tính tò mò như tôi thì điều tôi luôn quan tâm là liệu một dịch vụ mới như vậy, liệu nó có lỗ hổng gì không. Và thế là tôi cũng như nhiều bạn khác trong team Cyber Security Research, thuộc R&D Lab của Sun* đã cùng ngồi với nhau thử pentest dịch vụ Y xem sao. Sau một vài ngày thử nghiệm, cuối cùng chúng tôi cũng có chút ít thành quả. Đó là tận dụng lỗi Self-XSS và Local File Inclusion để xem được toàn bộ source code của Y 😳

# Các lỗi phát hiện
## Lỗi XSS

- Ở các vị trí của phần nhập thông tin Profile:
    -  Phía frontend đã validation thay thế `<` và `>` bằng escaped HTML entities tương ứng.
    -  Tuy nhiên, phía backend không có validation dẫn đến người dùng có chèn vào các tag tuỳ ý như `<script>`, `<a>`, `<img>` bằng cách thay đổi trực tiếp vào dữ liệu được post lên.
- VD chèn payload

```html
<img src=x onerror='alert(document.domain)' />
```

vào mục "Career Goal":
![](https://images.viblo.asia/fb3a450f-863f-4b1d-a7d6-73019ab27197.png)


- Dữ liệu trả về chưa được escape, vào trang tạo profile mới sẽ trigger javascript và hiện ra pop-up:

![](https://images.viblo.asia/84a715b3-0417-495a-bd43-63f771e983c0.png)


- Tuy nhiên, lỗi chỉ dừng ở mức Self-XSS do sau khi convert sang PDF để chia sẻ cho người khác thì javascript sẽ không được thực thi nữa.

## Lỗi Local File Inclusion (LFI)
- Chỉ Self-XSS thì sẽ không có ý nghĩa gì cả, chúng ta cần tìm hiểu thêm.
- Kiểm tra file PDF được generate ra tại, VD: https://subdomainy.sitex.com/resumes/xxxxxxx-xxxxx-434c-xxxx-991b91f64c2f/preview thấy trang sử dụng `wkhtmltopdf` để thực hiện việc convert từ file HTML => file PDF.
- Thử chèn

```html
<script>document.write(document.location.pathname)</script>
```

vào mục "Career Goal", ta được:

![](https://images.viblo.asia/299a963b-5fa9-401d-bb60-867bb424477e.png)

Code Javascript đã được thực thi, vậy dịch vụ Y có thể đang sử dụng [KnpSnappy](https://github.com/KnpLabs/KnpSnappyBundle) để thực hiện render PDF bằng webkit. Thử ghi file bằng `fs` của NodeJS và một số hàm `JSON` thì không thành công.

- Thử sử dụng `XMLHttpRequest` để thực hiện lấy local file bằng protocol `file:///` với payload

```html
<script>x = new XMLHttpRequest; x.onload = function () { document.write(this.responseText + document.location.pathname) }; x.open('GET', 'file:///etc/passwd'); x.send();</script>
```

ta đọc được nội dung file:

![](https://images.viblo.asia/d8945780-c96f-444e-8c5e-e6118c5c986a.png)

Sau quá trình fuzzing, phát hiện thêm một số điểm sau:
-  Dịch vụ Y được deploy trong docker
-  thư mục gốc của project đặt tại `/`
-  framework sử dụng là Laravel, từ đó có thể tiếp tục đọc các file config, seed, controller, để kiểm tra các bug logic. VD: nội dung file `config/database.php`

![](https://images.viblo.asia/71e4749e-e935-4783-8e1a-fb1903f281fc.png)

-  Các config kết nối đến DB đều được lưu trong biến môi trường, tạm thời mình chưa tìm ra được cách đọc.

# Timeline
- 30-05-2019: Tìm thấy bug, viết report và liên hệ với dev team của dịch vụ Y.
-  ??-??-2020: **dịch vụ Y** đã được đập đi xây lại hoàn toàn (tất nhiên lý do không phải do bug này đâu nhé :joy:). Hura !!!!

**Phiên bản mới, ngon hơn, đẹp hơn, và KHÔNG còn lỗi nữa. Anh em cứ yên tâm mà dùng cho cuộc đời đỡ khổ nhé** :smile:

# Bài học rút ra

- Nhớ thực hiện input validation ở cả client và server và output encoding tất cả các ký tự nguy hiểm nha.

# Thanks
- @doandinhlinh
- @minhtuan.nguy
- @nguyenmanh97
- @ngovannghia