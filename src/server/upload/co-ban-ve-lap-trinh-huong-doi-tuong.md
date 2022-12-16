## 1. Lập trình hướng đối tượng (object oriented programming - OOP) là gì?

Lập trình hướng đối tượng (object oriented programming – OOP) là một trong những kỹ thuật lập trình rất quan trọng và sử dụng nhiều hiện nay, cho phép lập trình viên tạo ra các đối tượng trong code, trừu tượng hoá các đối tượng trong thực tế.

### Đối tượng 

Một đối tượng bao gồm 2 thông tin: thuộc tính và phương thức.

- Thuộc tính: là những thông tin, đặc điểm của đối tượng. Ví dụ: con mèo có mắt, mũi, chân, đuôi...

- Phương thức: là những thao tác, hành động mà đối tượng đó có thể thực hiện. Ví dụ: một con mèo có thể kêu, chạy, ăn, uống...

### Lớp

Một lớp là một kiểu dữ liệu bao gồm các thuộc tính và các phương thức được định nghĩa từ trước. Đây là sự trừu tượng hóa của đối tượng. Khác với kiểu dữ liệu thông thường, một lớp là một đơn vị (trừu tượng) bao gồm sự kết hợp giữa các phương thức và các thuộc tính. Hiểu nôm na hơn là các đối tượng có các đặc tính tương tự nhau được gom lại thành một lớp đối tượng.

### Sự khác nhau giữa đối tượng và lớp

Lớp - có thể hiểu nó như là khuôn mẫu, đối tượng - một thực thể thể hiện dựa trên khuôn mẫu đó. Ví dụ: lại nói về mèo, có thể hiểu là class (lớp) mèo có:

Các thông tin, đặc điểm: 4 chân, 2 mắt, có đuôi, có chiều cao, có cân nặng, màu lông…

Các hành động như: kêu, đi, ăn, ngủ…

Đối tượng thì chính là con mèo vàng  ta đang nuôi trong nhà cũng mang đặc tính của lớp mèo.

![](https://images.viblo.asia/f0913ee8-e2bf-4b3c-ad9d-4a003d7ea238.png)

## 2. Các nguyên lý cơ bản của OOP

### Tính đóng gói (Encapsulation)

- Các dữ liệu và phương thức có liên quan với nhau được đóng gói thành các lớp để tiện cho việc quản lý và sử dụng. Tức là mỗi lớp được xây dựng để thực hiện một nhóm chức năng đặc trưng của riêng lớp đó.

- Ngoài ra, đóng gói còn để che giấu che dấu những tính chất xử lý bên trong của đối tượng, những đối tượng khác không thể tác động trực tiếp làm thay đổi trạng thái  chỉ có thể tác động thông qua các method public của đối tượng đó

![](https://images.viblo.asia/9d2547bf-9f37-4850-b3a2-e42c5093fd95.png)

 Nhìn vào ví dụ trên. Ta chỉ có thể gọi đến phương thức tinhdientich() để lấy ra diện tích của hình chữ nhật, hoàn toàn không biết xử lí bên trong hàm như thế nào.

### Tính kế thừa (Inheritance)

Nó cho phép xây dựng một lớp mới dựa trên các định nghĩa của lớp đã có. Có nghĩa là lớp cha có thể chia sẽ dữ liệu và phương thức cho các lớp con. Các lớp con không phải định nghĩa lại, ngoài ra có thể mở rộng các thành phần kế thừa và bổ sung thêm các thành phần mới. Tái sử dụng code, tránh bị lặp. Một số loại kế loại kế thừa thường gặp: đơn kế thừa, đa kế thừa, kế thừa đa cấp, kế thừa thứ bậc.

- Đơn kế thừa: một class con kế thừa từ 1 class cha

- Đa kế thừa: một class con kế thừa từ n class cha

- Kế thừa đa cấp: class A kế thừa từ class B, class B kế thừa từ class C

- Kế thừa thứ bậc: một class được nhiều class kế thừa

VD: 2 lớp Chó, Mèo

Mỗi lớp đều đại diện cho một loại động vật khác nhau nhưng lại có những thuộc tính, phương thức giống nhau như gọi có mắt, chân, ăn, uống, ngủ. Thay vì sao chép những thuộc tính này, ta nên đặt chúng vào một lớp chung gọi là lớp cha. Chúng ta có thể định nghĩa lớp cha – trong trường hợp này là Động vật và có những lớp con kế thừa từ nó, tạo ra một mối quan hệ cha/con.

### Tính đa hình (Polymorphism)

Tính đa hình là một hành động có thể được thực hiện bằng nhiều cách khác nhau. Đây lại là một tính chất có thể nói là chứa đựng hầu hết sức mạnh của lập trình hướng đối tượng.

Hiểu một cách đơn giản hơn: Đa hình là khái niệm mà hai hoặc nhiều lớp có những phương thức giống nhau nhưng có thể thực thi theo những cách thức khác nhau.

Ví dụ như ở phần trên, mỗi một động vật kế thừa từ lớp cha  vật nhưng có thể "Kêu" theo những cách khác nhau.  Con chó sẽ kêu gâu gâu, Con mèo sẽ kêu meo meo.

Vậy trong ví dụ chó, mèo xem như là các đối tượng. 2 con vật có thể hiểu cùng kêu nhưng theo các cách khác nhau.

Trong code để thể hiện tính đa hình có 2 cách:

Method Overloading (compile time polymorphism)

Method Overriding (run time polymorphism)

Method Overloading : nạp chồng các method có cùng tên nhưng khác tham số

Method Overriding:  Ghi đè lên phương thức của lớp cha

### Tính trừu tượng (Abstraction)

Trừu tượng có nghĩ là tổng quát hóa một cái gì đó lên, không cần chú ý chi tiết bên trong. Nó không màng đến chi tiết bên trong là gì và người ta vẫn hiểu nó mỗi khi nghe về nó.

Ví dụ: Máy nghe nhạc có thể dùng để phát nhạc, thì chức năng phát nhạc là đại diện cho trừu tượng (abstraction). Người dùng chỉ cần biết là  nút bật thì nhạc tự động phát, không cần biết bên trong nó làm thế nào.

Ở đây trong lập trình OOP, tính trừu tượng nghĩa là chọn ra các thuộc tính, phương thức của đối tượng cần cho việc giải quyết bài toán đang lập trình. Vì một đối tượng có rất nhiều thuộc tính phương thức, nhưng với bài toán cụ thể không nhất thiết phải chọn tất cả.

Ví dụ: Bài toán quản lý sinh viên chúng ta chỉ cần quản lý các thông tin như

Họ tên
Ngày sinh
Giới tính
…
Điểm thi
mà lại không cần quản lý thêm các thông tin:

Màu tóc
Sở thích
Chiều cao
Tại vì chúng thực sự không cần thiết.


## 3. Các ưu điểm của lập trình hướng đối tượng
Dựa trên nguyên lý kế thừa, trong quá trình mô tả các lớp có thể loại bỏ những chương trình bị lặp, dư. Và có thể mở rộng khả năng sử dụng các lớp mà không cần thực hiện lại. Tối ưu và tái sử dụng code hiệu quả.

Đảm bảo rút ngắn thời gian xây dựng hệ thống và tăng năng suất thực hiện.

Sự xuất hiện của 2 khái niệm mới là lớp và đối tượng chính là đặc trưng của phương pháp lập trình hướng đối tượng. Nó đã giải quyết được các khuyết điểm của phương pháp lập trình hướng cấu trúc để lại. Ngoài ra 2 khái niệm này đã giúp biểu diễn tốt hơn thế giới thực trên máy tính.

## Tài liệu tham khảo
https://topdev.vn/blog/oop-la-gi/

https://viblo.asia/p/4-dac-tinh-cua-lap-trinh-huong-doi-tuong-object-oriented-program-XL6lAA7Nlek