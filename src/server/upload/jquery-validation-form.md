Xây dựng một website mang tính hoàn hảo, toàn vẹn cao thì không thể thiếu **validate form** kiểm tra dữ liệu đầu vào. Ngay cả khi chúng ta xây dựng code ở phần backend thì chúng ta củng sẽ check dữ liệu nhập vào, nhưng có một các tiện hơn để check validate dữ liệu khi mà dữ liệu chưa cần gửi về server để kiểm tra, đó là jQuery Validation Form, sau đây mình sẽ hướng dẫn cách để validate form signup bằng jQuery.

## jQuery là gì ?
jQuery là một thư viện JavaScript đa tính năng, nhỏ gọn, nhanh, được tạo bởi John Resig vào năm 2006 với một phương châm hết sức ý nghĩa: Write less, do more - Viết ít hơn, làm nhiều hơn.

jQuery đơn giản hóa việc duyệt tài liệu HTML, xử lý sự kiện, hoạt ảnh và tương tác Ajax để phát triển web nhanh chóng. Các phân tích web đã chỉ ra rằng, jQuery là thư viện JavaScript được triển khai rộng rãi nhất.

### Bắt đầu triển khai nào
Chúng ta sẽ bắt đầu bằng cách xem qua 1 form đăng kí cho dễ hình dung nhé.

![](https://images.viblo.asia/c93c4727-8abd-4de1-a1be-f9b8e3ad3481.png)

Code của nó
![](https://images.viblo.asia/09df5f11-a423-4e5a-8ebe-d6e0656e81fa.png)
Chúng ta cần chú ý tới id của form, name của các trường, những cái này sẽ thực hiện cho công việc validate dữ liệu.


### Thêm thư viện jquery
Chúng ta có thể tải jquery library  [tại đây](https://jquery.com/download/) hoặc lấy link online có thể nhúng trực tiếp được luôn, rồi nhúng vào thẻ <script></scrip>. Trông nó như sau:

```
<script src="http://code.jquery.com/jquery-3.4.1.min.js" 
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.js"></script>
```
### Bắt đầu thực hiện validate
Cấu trúc khung của nó như thế này
```
<script type="text/javascript">
      $(document).ready(function () {

        //Khi bàn phím được nhấn và thả ra thì sẽ chạy phương thức này
        $("#formDemo").validate({
          rules: {
            name: "required",
            email: {
              required: true,
              email: true
            },
            password: {
              required: true,
              minlength: 6,
              maxlength: 15
            },
            checkbox: "required"
          },
          messages: {
            name: "Vui lòng nhập tên!",
            email: {
              required: "Vui lòng nhập vào email",
              email: "Nhập đúng định dạng email đê :D"
            },
            password: {
              required: "Vui lòng nhập mật khẩu!",
              minlength: "Độ dài tối thiểu 6 kí tự",
              maxlength: "Độ tài tối đa 15 kí tự"
            },
            checkbox: "Xác nhận Admin đẹp zai"
          }
        });
      });
    </script>
```
* rules: Các trường ta cần validate, các quy tắc được đặt ra
* messages: Thông báo khi dữ liệu chưa nhập đúng

Khi nhấn submit form mà chưa nhập dữ liệu ta sẽ nhận được thông báo
![](https://images.viblo.asia/532ee1ea-2f65-4d70-88f0-2c35c20663d5.png)

Ta thấy mấy cái thông báo chữ xấu, với lại màu khó ưa, ta có thể css màu mè các kiểu, class là class="error". 

Pass hết validate
![](https://images.viblo.asia/2aa9c3f3-e322-41ee-91ef-4c6b8f6e22df.png)

Ngoài những rules validate mà tớ dùng thì còn có 1 núi những quy tắc khác, bảng sau:


| rules | Cách dùng |
| -------- | -------- |
| required     | Không được bỏ trống    
| remote     | Gửi yêu cầu về Web Server để xác thực 
| minlength     | Độ dài tối thiểu
| maxlength     | 	Độ dài tối đa 
| rangelength     | Độ dài tối thiểu từ x tới y
| min     | Số tối thiểu
| max     |Số tối đa
| range     | Số tối thiểu từ x tới y 
| email     | 	Xác thực định dạng Email
| url     | Xác thực định dạng URL  
| date     | 	Xác thực định dạng ngày tháng
| dateISO     | Xác thực định dạng ngày tháng theo chuẩn ISO
| number     | Phải là số, bao gồm số thập phân
| digits     | 	Chỉ chấp nhận số nguyên dương
| creditcard     | Xác thực số thẻ tín dụng  
| equalTo     |Phải trùng với phần tử nào đó



Có thể [vào đây](https://jqueryvalidation.org/documentation/) để tham khảo thêm nhiều cái lạ hơn nữa./

### Kết
Củng không chia sẻ thứ gì quá mới lạ nhưng biết đâu sẽ giúp ích cho một số bạn mới bắt đầu làm quen. Cám ơn  đã đọc bài viết của mình.