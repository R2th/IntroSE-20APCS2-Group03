# Lập trình hướng đối tượng(OOP) là gì?
Lập trình hướng đối tượng là chia chương trình thành các đối tượng. Một chương trình hướng đối tượng là một tập hợp các đối tượng tương tác với nhau. 

Học lập trình hướng đối tượng là học cách " đóng gói" dữ liệu và hàm thành đối tượng, " đóng gói" như thế nào cho đúng, cho hợp lý.

**Mô hình lập trình hướng đối tượng**

![](https://images.viblo.asia/e4951ea5-fc87-4ad9-ad0e-9f8c745f6c94.PNG)

Hầu hết các ngôn ngữ lập trình và framework lập trình phổ biến hiện nay như Java, PHP, .NET, ruby đều hỗ trợ lập trình hướng đối tượng.

## Đối tượng là gì?
Đối tượng là một thành phần chương trình chứa cả dữ liệu và các hàm thao tác trên dữ liệu đó.

Trong lập trình hướng đối tượng chúng ta không đi tìm cách chia chương trình thành các hàm mà đi tìm cách chia chương trình thành các đối tượng. Việc chia chương trình thành các đối tượng làm cho việc thiết kế chương trình trở nên dễ dàng hơn vì các đối tượng trong chương trình rất gần gũi với các đối tượng trong thực tế.

**Một đối tượng bao gồm 2 thông tin: thuộc tính và hàm ( phương thức).**

 - Thuộc tính chính là những thông tin, đặc điểm của đối tượng. Ví dụ: con người có các đặc tính như mắt, mũi, tay, chân…
 - Phương thức là những thao tác, hành động mà đối tượng đó có thể thực hiện. Ví dụ: một người sẽ có thể thực hiện hành động nói, đi, ăn, uống, . . .

## Lớp là gì?
Một lớp đối tượng (gọi tắt là lớp) là một mô tả về một số đối tượng tương tự nhau. Nó xác định dữ liệu gì và các hàm nào sẽ có trong các đối tượng của lớp đó.

Khái niệm lớp trong lập trình hướng đối tượng giống khái niệm lớp trong sinh học. 

Ví dụ: cá chép, cá trôi, cá mè đều thuộc lớp cá.

Trong cuộc sống ta thấy các lớp lại được chia thành các lớp con. 
Ví dụ: Lớp động vật được chia thành lớp cá, lớp chim,  lớp động vật có vú...

## Sự khác nhau giữa lớp và đối tượng
Lớp là một khuôn mẫu còn đối tượng là một thể hiện cụ thể dựa trên khuôn mẫu đó

Ví dụ: Ta nói về loài chó, bạn có thể hiểu nó là class (lớp) chó có:

Các thông tin, đặc điểm: 4 chân, 2 mắt, có đuôi, có chiều cao, có cân nặng, màu lông…
Các hành động như: sủa, đi, ăn, ngủ…
Đối tượng thì chính là con chó Poodle ta đang nuôi trong nhà cũng mang đặc tính của lớp chó.

## Các đặc tính của LTHDT:
1. Tất cả đều là đối tượng.
2. Chương trình hướng đối tượng có thể coi là một tập hợp các đối tượng tương tác với nhau
3. Mỗi đối tượng trong chương trình có các dữ liệu độc lập của mình và chiếm bộ nhớ riêng của mình.
4. Mỗi đối tượng đều có dạng đặc trưng của lớp các đối tượng đó.
5. Tất cả các đối tượng thuộc về cùng một lớp đều có các hành vi giống nhau.

## Các nguyên lý cơ bản của LTHDT
**Tính đóng gói (Encapsulation)**

Các dữ liệu và phương thức có liên quan với nhau được đóng gói thành các lớp để tiện cho việc quản lý và sử dụng. Tức là mỗi lớp được xây dựng để thực hiện một nhóm chức năng đặc trưng của riêng lớp đó.
 Ngoài ra, đóng gói còn để che giấu một số thông tin và chi tiết cài đặt nội bộ để bên ngoài không thể nhìn thấy.
 
 Nói chung trạng thái đối tượng không hợp lệ thường do: chưa được kiểm tra tính hợp lệ, các bước thực hiện không đúng trình tự hoặc bị bỏ qua nên trong OOP có một quy tắc quan trọng cần nhớ đó là phải luôn khai báo các trạng thái bên trong của đối tượng là private và chỉ cho truy cập qua các public/protected method/property.

Ví dụ: Một viên thuốc chữa cảm. Chúng ta chỉ biết nó chữa cảm sổ mũi nhức đầu và một số thành phần chính, còn cụ thể bên trong nó có những hoạt chất gì thì hoàn toàn không biết.

**Tính kế thừa (Inheritance)**
Nó cho phép xây dựng một lớp mới dựa trên các định nghĩa của lớp đã có. Có nghĩa là lớp cha có thể chia sẽ dữ liệu và phương thức cho các lớp con. Các lớp con khỏi phải định nghĩa lại, ngoài ra có thể mở rộng các thành phần kế thừa và bổ sung thêm các thành phần mới. Tái sử dụng mã nguồn 1 cách tối ưu, tận dụng được mã nguồn. 

Một số loại kế loại kế thừa thường gặp: đơn kế thừa, đa kế thừa, kế thừa đa cấp, kế thừa thứ bậc.

Khi bắt đầu xây dựng ứng dụng chúng ta sẽ bắt đầu thiết kế định nghĩa các lớp trước. Thông thường một số lớp có quan hệ với những lớp khác, chúng có những đặc tính giống nhau.

VD: Lớp Android, và lớp Iphone kế thừa lớp  điện thoại Smartphone.

Mỗi lớp đều đại diện cho một loại smartphone khác nhau nhưng lại có những thuộc tính giống nhau như gọi điện, nhắn tin, chụp hình. Thay vì sao chép những thuộc tính này, ta nên đặt chúng vào một lớp chung gọi là lớp cha. Chúng ta có thể định nghĩa lớp cha – trong trường hợp này là Smartphone và có những lớp con kế thừa từ nó, tạo ra một mối quan hệ cha/con.

**Tính đa hình (Polymorphism)**
Tính đa hình là một hành động có thể được thực hiện bằng nhiều cách khác nhau. Đây lại là một tính chất có thể nói là chứa đựng hầu hết sức mạnh của lập trình hướng đối tượng.

Hiểu một cách đơn giản hơn: Đa hình là khái niệm mà hai hoặc nhiều lớp có những phương thức giống nhau nhưng có thể thực thi theo những cách thức khác nhau.

Một ví dụ về đa hình trong thực tế. Ta có 2 con vật: chó, mèo. Cả 2 con vật này đều là lớp động vật. Nhưng khi ta bảo cả 2 động vật kêu thì con chó sẽ kêu gâu gâu, con mèo sẽ kêu meo meo. Vậy trong ví dụ chó, mèo xem như là các đối tượng. 2 con vật có thể hiểu cùng kêu nhưng theo các cách khác nhau.

**Tính trừu tượng (Abstraction)**
Trừu tượng có nghĩ là tổng quát hóa một cái gì đó lên, không cần chú ý chi tiết bên trong. Nó không màng đến chi tiết bên trong là gì và người ta vẫn hiểu nó mỗi khi nghe về nó.

Ví dụ: Bạn chạy xe tay ga thì có hành động là tăng ga để tăng tốc, thì chức năng tăng ga là đại diện cho trừu tượng (abstraction). Người dùng chỉ cần biết là tăng ga thì xe tăng tốc, không cần biết bên trong nó làm thế nào.

Ở đây trong lập trình OOP, tính trừu tượng nghĩa là chọn ra các thuộc tính, phương thức của đối tượng cần cho việc giải quyết bài toán đang lập trình. Vì một đối tượng có rất nhiều thuộc tính phương thức, nhưng với bài toán cụ thể không nhất thiết phải chọn tất cả.

Tài liệu tham khảo: https://topdev.vn/blog/oop-la-gi/