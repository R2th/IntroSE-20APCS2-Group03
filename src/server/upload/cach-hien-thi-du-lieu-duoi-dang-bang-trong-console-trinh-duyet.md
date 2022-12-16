# Lời nói đầu
Console là một công cụ tích hợp trình duyệt ghi lại các lỗi xảy ra trên trang web. Nếu có bất kỳ lỗi nào:
 - chẳng hạn như các liên kết bị lỗi, các hàm JavaScript không hoàn chỉnh hoặc các thuộc tính CSS không xác định
 - các trình duyệt sẽ hiển thị các thông báo lỗi trong Console.
Trên hết, chúng ta cũng có thể tương tác với Bảng điều khiển thông qua trình báo và API Console, rất hữu ích khi kiểm tra một số chức năng và dữ liệu đầu ra. Ở đây, chúng tôi sẽ chỉ cho bạn một mẹo hữu ích cho việc sử dụng API Console.
# Truy cập Browser Console
Trong Chrome, chúng tôi có thể chọn menu View > Developer > JavaScript Console để hiển thị Console. Ngoài ra, chúng tôi cũng có thể sử dụng phím tắt: Cmd + Option + J trên OS X, và Ctrl + Shift + J  trên Windows.

Dưới đây là một Console Chrome không có lỗi.
![](https://images.viblo.asia/7eb76e26-c142-4af4-8dad-3490395d56ac.jpg)
Từ đây, chúng ta có thể bắt đầu sử dụng lệnh được cung cấp trong Console API.
# Tương tác với Console
Chúng tôi có thể tương tác với Bảng điều khiển trình duyệt thông qua chính Bảng điều khiển và bằng cách thêm JavaScript vào tài liệu. Ví dụ, ở đây chúng tôi nói với Bảng điều khiển để xuất ra Chào buổi sáng! Chúc bằng cách gõ lệnh console.log () trực tiếp trong Bảng điều khiển:
![](https://images.viblo.asia/458baca7-ba54-425c-9c8b-f253d9f96c65.jpg)
Như đã đề cập, chúng ta cũng có thể áp dụng console.log () trong tài liệu. Một sử dụng console.log () thực tế là để kiểm tra một câu lệnh điều kiện JavaScript. Chúng ta có thể thấy rõ hơn nếu kết quả trả về đúng hay sai với sự trợ giúp của console.log ().
Below is one example:
```javascript
var a = 1;
if(a == 1) {
  console.log('true');
} else {
  console.log('false');
}
```
Mã ở trên sẽ trả về true, vì một biến chứa số 1. Trong Bảng điều khiển, bạn sẽ thấy trình duyệt hiển thị true.

![](https://images.viblo.asia/e534aec7-4955-42fd-993e-5946d05a9d4f.jpg)
# Dữ liệu đầu ra dưới dạng bảng
Đôi khi, chúng ta sẽ xử lý một mảng dữ liệu hoặc danh sách các Đối tượng, như hiển thị bên dưới:
```javascript
var data = [
  { name: "Andi", age: "21", city: "Tuban" },
  { name: "Ani", age: "25", city: "Trenggalek" },
  { name: "Adi", age: "30", city: "Kediri" }
];
console.table(data);
```
Dữ liệu này sẽ khó đọc khi chúng ta sử dụng phương thức console.log (). Phương thức console.log () sẽ hiển thị Mảng trong chế độ xem dạng cây có thể thu gọn, như hiển thị bên dưới.

![](https://images.viblo.asia/109d2fcf-8a21-462d-96e4-15bee8897825.jpg)
Khi chúng ta đang xử lý một Array như vậy, sử dụng console.table () là cách tốt hơn để xuất nó. Phương pháp này sẽ hiển thị dữ liệu theo định dạng bảng. Lấy dữ liệu giống như trên, nó sẽ xuất hiện như sau:

![](https://images.viblo.asia/a2130d81-db30-4051-a167-98f83b74c1f4.jpg)
# Kết luận
Bảng điều khiển trình duyệt giúp nhà phát triển web xử lý lỗi trong trang web. Chúng ta cũng có thể sử dụng nó để kiểm tra đầu ra dữ liệu, như với phương thức console.log (). Khi chúng ta có một lệnh data data.table () mảng sẽ hữu ích hơn, vì nó hiển thị Mảng ở định dạng bảng dễ đọc. Xin lưu ý rằng console.table () chỉ có thể áp dụng trong các trình duyệt dựa trên Webkit như Chrome, Safari và phiên bản Opera mới nhất.
# Nguồn: 
https://www.hongkiat.com/blog/tabular-data-browser-console/