### Vấn đề phát sinh của cơ sở dữ liệu trong quá trình phát triển ứng dụng web.
* Trong trường hợp cơ sở dữ liệu của bạn có thay đổi về một số trường trong một bảng hoặc thêm mới bảng thì sẽ xử lý như thế nào? Thì ở bài này đối với ứng dụng web sử dụng Entity Framework Code First bạn có thể sử dụng Migration để khắc phục vấn đề này.
* Ở bài này mình sẽ thêm trường **Prices**, **CreateDate** và **ModifyDate** cho bảng **Products**.
### Thêm field mới vào model
* Trước tiên để thêm trường vào bàng **Products** chúng ta cần thêm vào Model Product tương ứng như sau:
![](https://images.viblo.asia/fb4d37f6-9848-4ed8-b799-c968d0d29f60.PNG)
* Chú thích nhỏ cho các bạn là **DateTime** và **DateTime?** khác nhau ở chỗ nếu trường thông thường **DateTime** có nghĩa là trường này không cho phép lưu giá trị null(tương ứng với not allow null trong SQL) còn với **DateTime?** sẽ cho phép null.
### Sử dụng migration để thêm field.
* Bạn mở cửa sổ Package Manager Console lên và insert lệnh `Add-Migration`, sau đó bạn đạt tên cho Migration đó.
![](https://images.viblo.asia/bae990f9-379a-498d-96b8-bf754a0ad5af.PNG)
* Sau khi thêm migration thành công bạn sẽ thấy trong thư mục **Migrations** sẽ tự động tạo thêm cho bạn 1 file chứ thông tin bạn vừa thay đổi trong model.
![](https://images.viblo.asia/adbf7bc3-fab1-42ee-8f91-acb1d3efaa04.PNG)
* Sau đó bạn kiểm tra lại cơ sở dữ liệu đã có thay đổi chưa:

![](https://images.viblo.asia/1827c0e2-d869-4aa3-acf3-65ab96b7bd78.PNG)
* Vậy là đã thêm thành công các trường sử dụng Migration.
* Chúc các bạn thành công.