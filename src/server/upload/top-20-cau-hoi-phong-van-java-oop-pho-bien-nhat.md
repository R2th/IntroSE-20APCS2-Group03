### ***Câu hỏi***
1. Thế nào là lập trình hướng đối tượng ?
2. Các tính chất của hướng đối tượng là gì ?
3. Thế nào là lớp?
4. Thế nào là đối tượng?
5. Thế nào là tính đóng gói?
6. Có mấy loại access modifier? Phân biệt sự khác nhau giữa chúng?
7. Thế nào là tính đa hình?
8. Phân biệt override và overload?
9. Có thể override 1 static method không?
10. Thế nào là tính trừu tượng?
11. Có thể sử dụng thuộc tính trong interface?
12. Interface có thể là final không? 
13. Có thể cài đặt phương thức trong interface? 
14. Có thể cài đặt phương thức trong abstract class?
15. Có thể cài đặt nhiều interface trong class không?
16. Thế nào là tính kế thừa?
17. Có thể sử dụng constructor của lớp cha để tạo đối tượng cho lớp con không?
18. Thế nào là static?
19. Thế nào là final?
20. Có bắt buộc phải khai báo constructor trong lớp?

### ***Câu trả lời***

### 1. Thế nào là lập trình hướng đối tượng ?
Lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm về lớp và đối tượng. Nó tập trung vào các đối tượng thao tác hơn là logic để thao tác chúng, giúp code dễ quản lý, tái sử dụng được và dễ bảo trì.
### 2. Các tính chất của hướng đối tượng là gì ?
Lập trình hướng đối tượng bao gồm 4 tính chất

- Tính đóng gói
- TÍnh kế thừa
- Tính trừu tượng
- Tính đa hình
### 3. Thế nào là lớp?
Một class đại diện cho 1 loại đối tượng. Nó có thể được hiểu giống như 1 bản định nghĩa của đối tượng.
### 4. Thế nào là đối tượng?
Đối tượng là một thể hiện của lớp. Nó bao gồm các thuộc tính và phương thức.
### 5. Thế nào là tính đóng gói?
Đóng gói là việc che giấu các thông tin quan trọng của 1 lớp. Nó được thể hiển thông qua các access modifier như private, public, default, protected
### 6. Có mấy loại access modifier? Phân biệt sự khác nhau giữa chúng?
Có 4 loại access modifier là: private, protected, default, public. 
Trong đó: 
- **Private**: Chỉ có thể truy cập trong cùng class.
- **Default**: Có thể truy cập trong cùng class và cùng package.
- **Protected**: Có thể truy cập trong cùng class, package và ngoài package bởi lớp con.
- **Public**: Có thể truy cập ở bất cứ đâu.
### 7. Thế nào là tính đa hình?
Tính đa hình là khi một hành động có thể được thực hiện theo nhiều cách khác nhau. Nó được thể hiện thông qua override và overload.
### 8. Phân biệt override và overload?
Overide là việc lớp con ghi đè phương thức của lớp cha.
Overload là việc một class sử dụng được cùng một phương thức nhưng khác nhau biến truyền vào hàm
### 9. Có thể override 1 static method không?
Không.
### 10. Thế nào là tính trừu tượng?
Tính trừu tượng là ẩn các chi tiết triển khai và chỉ hiển thị các tính năng với người dùng. Tính chất này cho phép loại bỏ các tính chất phức tạp của đổi tượng, chỉ cần đưa ra các tính chất cần thiết trong lập trình giúp tập trung vào những cốt lõi của đối tượng. Nó được thể hiện thông qua interface và abstract class.
### 11. Có thể sử dụng thuộc tính trong interface?
Có. Thuộc tính phải là hằng số và được khai báo với từ khóa final.
### 12. Interface có thể là final không? 
Không. Vì cần phải có một lớp implement interface thì mới sử dụng được.
### 13. Có thể cài đặt phương thức trong interface? 
Không thể
### 14. Có thể cài đặt phương thức trong abstract class?
Có. Phương thức không phải là abstract method thì có thể cài đặt. 
### 15. Có thể cài đặt nhiều interface trong class không?
Có 
### 16. Thế nào là tính kế thừa?
Là khả năng tái sử dụng lại thuộc tính và phương thức của một lớp. Thể hiện thông qua từ khóa extend.
### 17. Có thể sử dụng constructor của lớp cha để tạo đối tượng cho lớp con không?
Không. Phải cài đặt lại constructor trên lớp con. Có thể sử dụng từ khóa super() để gọi lại đối tượng của lớp cha.
### 18. Thế nào là static?
Những hàm, phương thức có từ khóa static sẽ thuộc về lớp có thể được truy cập trực tiếp từ Class mà không cần phải tạo đối tượng.
### 19. Thế nào là final?
Những thuộc tính final sẽ không thể thay đổi giá trị của nó 
Những phương thức final sẽ không thể overide ở lớp con
Những class final sẽ không thể kế thừa được
### 20. Có bắt buộc phải khai báo constructor trong lớp?
Không. Nếu không khai báo constructor, class sẽ sử dụng default constructor