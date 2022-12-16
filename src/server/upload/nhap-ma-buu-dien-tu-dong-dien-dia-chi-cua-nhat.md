### Giới thiệu
Chào các bạn!
Trong bài này mình xin giới thiệu tới các bạn về một thư viện mà nó sẽ giúp chúng ta khi nhập mỗi mã bưu điện thôi sẽ tự động nhập nốt các địa chỉ còn lại.
Đây là một thư viên hữu ích mà được Developer người Nhật viết ra chính vì thế nó chỉ dùng cho các sản phẩm từ Nhật Bản và có ích rất nhiều cho các bạn làm Frontend
khi làm phần form có chỗ điền thông tin mã bưu điện địa chỉ.

Thư viện này có tên là **ajaxzip3** và hầu như khách hàng của các bạn không thể biết tới điều này họ chỉ có thiết kế từng input để nhập tay hoặc bấm vào nút tìm kiếm để ra một list danh sách rồi thấy địa chỉ phù hợp rồi chọn mới được nhập vào như cái hình bên dưới thì sẽ khá bất tiện.
Vì vậy các bạn hãy mạnh dạn giới thiệu và đề xuất với khách hàng của mình nhé.

![](https://images.viblo.asia/e986408d-04df-4e5b-957a-c8a3c16b95df.png)

![](https://images.viblo.asia/67ac5a23-a876-4ec2-b5a2-6fd2d815612d.gif)


###   Cách dùng
Các bạn chỉ cần gọi thư viện này theo đường link sau hoặc download hẳn về local server nhé
<br>
<br>**Script**
> <script src="https://ajaxzip3.github.io/ajaxzip3.js"></script>
<br>**Github code**
> https://github.com/ajaxzip3/ajaxzip3.github.io

<br>**HTML**
```html
<form>
  <label>郵便番号(ハイフンもOK)</label>
  <input type="text" name="zip01" size="10" maxlength="8" onKeyUp="AjaxZip3.zip2addr(this,'','pref01','addr01');">
  <label>都道府県</label>
  <input type="text" name="pref01" size="20">
  <label>以降の住所</label>
  <input type="text" name="addr01" size="60">
</form>
```
Giao diện sẽ như thế này,
có thể nhập "**-**" hoặc không có cũng được
![](https://images.viblo.asia/ceba4285-cc54-4864-97e1-6b5f7029f874.png)



Ngoài ra cũng có thể nhập theo 2 input theo kiểu như thế này
Input 1 nhập 3 số đầu, còn input 2 nhập 4 số cuối.
![](https://images.viblo.asia/63a475b3-f3f2-4f51-a0c4-c2c433759ae2.png)

### Demo
Các bạn xem demo mình làm trên codepen nhé
{@embed: https://codepen.io/Truelove/pen/MWwjMXR}

### Lời kết
Hi vọng chia sẻ này sẽ hữu ích với các bạn làm Frontend khi làm về form nhật địa chỉ cho khách hàng Nhật nhé.
Cảm ơn các bạn đã đọc bài !