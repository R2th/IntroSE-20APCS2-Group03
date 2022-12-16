# OOP là gì? 4 đặc tính cơ bản của OOP
 OOP ( Viết tắt của Object Oriented Progamming ) - Lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm lớp và đối tượng. OOP tập trung hơn vào cái đối tượng hơn là khai thác logic để thao tác chúng, giúp code dẽ quản lý, tái sử dụng được và dễ bảo trì 

> **Bất kỳ developer nào muốn đi trên con đường lập trình cũng phải biết về OOP**

Đọc bài viết này để biết: 
- OOP là gì? Đối tượng và lớp trong OOP là gì?
- Các đặc tínhc cơ bản của OOP là gì ? 

## **- Lập trình hướng đối tượng (OOP) dùng để làm gì? OOP được dùng để làm gì?**
## 
OOP (Viết tắt của Objec Oriented Progamming) - lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm về lớp và các đôi tượng. OOP tập trung vào các đối tượng hơn là logic để thao tác chúng 

OOP là nền tảng của các design patten hiện tại.

> Đọc thêm: [Design pattern là gì? Vì sao nên học design pattern?](https://itviec.com/blog/design-pattern/)
> 
Mục tiêu của OOP là tối ưu các việc quản lý soucre code, giúp tăng khả năng tái sử dụng và quan trọng hơn hết là giúp tóm tắt các thủ tục đã biết trước tính chất thông qua việc sử dụng các đôi tượng

## **- Đối tượng (Object) và Lớp (Class) trong OOP là gì?**
## 
 **Đối Tượng Object)**
 
 Đối tượng trong OOP gòm 2 thành phần chính:
  - thuộc tính (Attribute): là những thông tin đặc điểm đối tượng 
  - phương thức (Method): là những hành vi mà đối tượng có thể thực hiện

Dễ hình dung ta có một đối tượng là smartphone đối tượng này sẽ có:

- thược tính: màu sắc, bộ nhớ, hệ điều hành...
- phương thức: gọi điện, chụp ảnh, nhắn tin, ghi âm...
 
**Lớp (Class)**

lớp là sự trừu tượng hoá của đối tượng. Những đối tượng có đặc tính tương tự nhau sẽ được tập hợp thành một lớp. Lớp cũng sẽ bao gồm 2 thuộc tính và phương thức.

Một đối tượng sẽ được xem là 1 thực thể của lớp.

Tiếp nối ví dụ ở phần đối tượng (Object) phía trên ta có lớp (Class) smartphone gồm 2 thành phần:

- thuộc tính: màu sắc, bộ nhớ, hệ điều hành...
- phương thức: gọi điện, chụp ảnh, nhắn tin, ghi âm...

các đối tượng của lớp này có thể là: iphone, Samsung, Oppo, Huawei...

## **- ƯU Điểm của lập trình hướng đối tượng OOP**
## 
- OOP mô hình hoá những thứ phức tạp dưới dạng cấu trúc đơn giản.
- Code OOP có thể sử dụng lại, giúp tiết kiệm tài nguyên.
- Giúp sửa lỗi dẽ dàng hơn. so với việc tìm lỗi ở nhiều vị trí trong code thì tìm lỗi trong các ớp (được cấu trúc từ trước) đơn giản hơn và ít mất thời gian hơn.
- Có tính bảo mật cao, bảo vệ thông tin qua tính đóng gói. 
- Dễ mở rộng dự án.

## **- 4 Đặc tính cơ bản của OOP**
## 
### 1. Tính Đóng gói (Encapsulation)
### 
![image.png](https://images.viblo.asia/2d2f4674-5c62-4a76-87b6-e76d6b2baf45.png)


Tính đóng gói cho phép che giấu thông tin và những tính chất xử lý bên trong của đối tượng. Các đối tượng khác đều không thể tác động trực tiếp đến dữ liệu bên trong và thay đổi trạng thái của các đối tượng mà bắt buộc phải thông qua các phương thức công khai do đối tượng đó cung cấp 

>**Tính chất này giúp tăng tính bảo mật cho đối tượng và tránh tình trạng dữ liệu bị hư hỏng ngoài ý muốn.**

### 2. Tính kế thừa (Inheritance)
### 
Đây là tính chất được sử dụng khá nhiều. Tính kế thừa cho phép xây dụng một lớp mới (lớp Con), kế thừa và tái sử dụng các thuộc tính phương thức dựa trên lớp cũ (lớp Cha) đã có trước đó.

Các lớp Con kế thừa toàn bộ thành phần của lớp Cha và không cần phải đinh nghĩa lại. Lớp có có thể mở rộng các thành phần kế thừa hoặc bổ sung những thanh phần mới 

Ví dụ:
- Lớp Cha là smartphone, có các thuộc tính: màu sắc, bộ nhớ, hệ điều hành...
- Các lớp Con là IPhone, Samsung, Oppo cũng có các thuộc tinh màu sắc và bộ nhớ, hệ điều hành...

### 3. Tính đa hình (Polymorphim)
### 
Tính đa hình trong lập trình OOP cho phép các đối tượng khác nhau thực thi chức năng giống nhau theo những cách khác nhau. 

ví dụ:

- Ở lớp smartphone, mỗi một dòng máy đều kế thừa các thành phần của lớp cha nhưng Iphone chạy trên hệ điều hành IOS còn Samsung lại chạy trên hệ điều hành Androi.
- Chó và mèo cùng nghe mệnh lệnh "Kêu đi " từ người chủ. Chó sẽ "gâu gâu" còn mèo lại "meo meo".

![image.png](https://images.viblo.asia/8ae146fd-8cfd-4bf9-a954-5caee90ff3a6.png)

### 4. Tính trừu tượng
Tính trừu tượng giúp loại bỏ những thứ phức tạp không cần thiết của đối tượng và chỉ tâp trung vào những thứ cốt lõi quan trọng 

ví dụ: Quản lý nhân viên thì chỉ cần quan tam đến những thông tin như: 
- Họ Ttn
- ngày sinh
- giới tính
- ...

chứ không cần phải quản lý thêm thông tin về:
- chiều cao
- cân nặng
- sở thích
- màu da
- ...


## **Hết Rồi :)**

**Bạn thấy bài viết hay và cần thiết với nhiều người? Đừng ngại nhấn nút Share bên dưới nhé.**