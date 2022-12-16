Lập trình hướng đối tượng (object oriented programming – OOP) là một trong những mô hình lập trình được sử dụng nhiều nhất và cũng là một trong những mô hình hiệu quả nhất để mô hình hoá thế giới thực vào thế giới code. Các tính chất đặc biệt khiến việc “hướng đối tượng” trở nên hiệu quả đó là:
* Tính trừu tượng (abstraction): Tạo ra các lớp trừu tượng mô hình hoá các đối tượng trong thế giới thực.
* Tính đóng gói (Encapsulation): Các thực thể của lớp trừu tượng có các giá trị thuộc tính riêng biệt.
* Tính kế thừa (Inheritance): Các đối tượng có thể dễ dàng kế thừa và mở rộng lẫn nhau.
* Tính đa hình (Polymorphism): Có thể thực hiện một hành động đơn theo nhiều cách thức khác nhau tuỳ theo loại đối tượng cụ thể đang được gọi.

 Các tính chất đặc biệt này của OOP giúp chúng ta xây dựng được các chương trình giải quyết được nhiều vấn đề cụ thể khác nhau trong thế giới thực. Hầu hết lập trình viên đều đã biết các tính chất này của OOP, nhưng cách thức để phối hợp các tính chất này với nhau để tăng hiệu quả của ứng dụng thì không phải ai cũng nắm được. Một trong những chỉ dẫn để giúp chúng ta sử dụng được OOP hiệu quả hơn đó là nguyên tắc SOLID. Về cơ bản, SOLID là một bộ 5 chỉ dẫn đã được nhắc tới từ lâu bởi các nhà phát triển phần mềm, sau đó được tổng hợp và phát biểu thành nguyên tắc bởi Robert C. Martin, cũng chính là tác giả của cuốn sách The Clean Coder nổi tiếng mà mình đã từng review. Năm nguyên tắc này bao gồm:
* Single Responsibility principle (SRP).
* Open-Closed principle (OCP).
* Liskov substitution principle (LSP).
* Interface segregation principle (ISP).
* Dependency inversion principle (DIP). 

Các nguyên tắc trên được phát biểu như sau:
### **1.   SRP – Single responsibility principle**

***Phát biểu: Mỗi lớp chỉ nên chịu trách nhiệm về một nhiệm vụ cụ thể nào đó mà thôi.***

Nếu như một class của chúng ta mà đảm nhiệm quá nhiều trách nhiệm. Điều này khiến cho code của chúng ta liên kết quá sâu với nhau và có thể bị lỗi nếu có bất cứ sự thay đổi nhỏ nào.
Giả sử như chúng ta có một class như sau:
 ![](https://images.viblo.asia/c275c553-438d-4cf6-9522-81175fbea506.png)


Chúng ta có thể thấy là class Order này có tới 3 trách nhiệm đó là hiển thị ra thông tin của order, xử lý order và lưu order và trong database. Như vậy, sau này chúng ta muốn gửi email cho người order, thêm các thao tác xử lý order thì khiến cho class này bị phình ra rất to. Theo nguyên lý chúng ta nên tách riêng ra 3 class như sau:
 
![](https://images.viblo.asia/94781955-e779-40f9-8be2-2a4f737dbde5.png)

### 2.   OCP – Open-Closed principle

***Phát biểu: Không được sửa đổi một Class có sẵn, nhưng có thể mở rộng bằng kế thừa.***

Nguyên tắc này có thể được hiểu rằng: các class hoặc hàm nên được thiết kế để mở rộng, nhưng đóng để tránh sự thanh đổi trực tiếp mã nguồn. Điều này có nghĩa là hệ thống nên được thiết kế để hỗ trợ các lập trình viên sau này có thể extend các class có sẵn để cung cấp thêm chức năng thay vì chỉnh sửa mã nguồn tồn tại sẵn trong hệ thống
Mình có ví dụ sau đây để các bạn có thể hiểu rõ hơn. Mình muốn tính toán tổng diện tích của mảng gồm khối hình học như sau:
 

![](https://images.viblo.asia/51cea7bc-75de-42f9-af9e-6c7dd1634530.png)



Đoạn code cho phép chúng ta tính diện tích của hình chữ nhật và hình vuông. Nếu giờ mình muốn mở rộng chương trình, muốn hỗ trợ thêm hình tam giác nữa. Lúc này mình phải sửa đổi hàm sum của class AreaCalculator. Như vậy là vi phạm nguyên tắc rồi, để sửa lại chúng ta cần làm như sau:
 ![](https://images.viblo.asia/638712ed-ee67-428b-bbad-575d3fd613c9.png)


Với đoạn code mới mà chúng ta đã sửa theo chuẩn nguyên lý sô 2 này, nếu bạn muốn mở rộng để tính toán thêm hình tròn, hình tam giác hay hình gì đi nữa thì bạn chỉ cần tạo THÊM một class và implement interface Shape là được, không cần phải sửa code đã có.
### **3.   LSP – Liskov substitution principle**

***Phát biểu: Các đối tượng (instance) kiểu class con có thể thay thế các đối tượng kiểu class cha mà không gây ra lỗi.***

Nguyên tắc này được hiểu đơn giản như sau. Một công ty có nhiều 2 loại nhân viên: nhân viên chính thức, thực tập sinh không lương. Với nhân viên chính thức thì cần nộp thuế thu nhập còn thực tập sinh thì không cần. Bạn có 1 lớp NhanVien để là class cha cho các nhân viên trong công ty như sau:
 
![](https://images.viblo.asia/cbaa7caa-071b-4ad9-a2f4-8af2e646580d.png)


Như vậy là đã vi phạm nguyên tắc này vì khi gọi hàm dongThue() của lớp ThucTapSinh sẽ khiến cho chương trình bị lỗi. Để giải quyết vấn đề này thì bạn cần tạo 1 interface NhanVienCanDongThue ra và những loại nhân viên nào cần đóng thuế thì chúng ta sẽ implement nó.
 
![](https://images.viblo.asia/eb9dbdd0-9024-41c6-8147-4cf170f9b0c4.png)




### **4.   ISP – Interface segregation principle**

***Phát biểu: Nếu Interface quá lớn thì nên tách thành các interface nhỏ hơn.***

Ví dụ như bạn có một interface chung dành cho các developer.
 
![](https://images.viblo.asia/fd4a74c4-8ad7-4060-a993-5490a2f8565f.png)


Đó, bạn sẽ thấy nó thật sự vô lý khi 1 PHPDeveloper implements interface Developer này lại phải đi codeRuby hay là codeIOS đúng ko. Trong trường hợp này chúng ta nên tách ra 3 interface nhỏ hơn thì PHPDeveloper chỉ implements interface PHPDeveloper thôi.
 ![](https://images.viblo.asia/b1a0add5-33de-4aa9-8751-2d61d6e37771.png)



### **5.   DIP – Dependency inversion principle**

Nguyên lý cuối cùng, tương ứng với chữ D trong SOLID. Nội dung nguyên lý:

***Phát biểu: Các thành phần hệ thống (class, module, …) chỉ nên phụ thuộc vào những abstractions, không nên phụ thuộc vào các concretions hoặc implementations cụ thể.***

Nguyên lý này khá lắt léo,chúng ta xét ví dụ sau:
 
![](https://images.viblo.asia/9e962b6e-c981-4cd4-ae12-4562a36083c4.png)



Trong phương thức khởi tạo của Class Driver chúng ta tạo ra một cái xe và gán nó cho người lái xe. Như vậy class Driver ràng buộc chặt chẽ với class Car. Người lái xe có thể lái nhiều loại xe khác nhau, nếu thay thế class Car bằng class khác, ứng dụng sẽ không chạy. Chúng ta tạo ra một định nghĩa trìu tượng (abstract class) hoặc một interface
 
![](https://images.viblo.asia/ab57713c-73fa-4a72-81e8-461cd4922365.png)



Như vậy, những người lái xe và những cái xe ô tô đều phụ thuộc vào interface Car, thứ hai là các class cụ thể như BMV, Mercedes phụ thuộc vào interface Car, do đó nếu có bất kỳ loại xe nào mà thực hiện theo định nghĩa trìu tượng Car thì người lái xe lái được tất.

# **Tổng kết**
Trên đây là những gì mình tìm hiểu về nguyên lý SOLID trong phát triển phần mềm. Thực ra ở thời điểm hiện tại mình cũng chưa thực sự hiểu cũng như áp dụng được hiệu quả và trọng vẹn những nguyên lý trên vào trong việc coding dự án. Hy vọng mình và các bạn trong tương lai có thể áp dụng SOLID một cách hiệu quả để việc xây dựng phần mềm trở nên tốt hơn nhé.