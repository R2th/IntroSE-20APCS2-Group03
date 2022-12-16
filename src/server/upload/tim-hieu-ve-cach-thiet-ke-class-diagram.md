Trong 1 dự án, việc tổ chức code cũng như clean code là 1 điều rất quan trọng, nếu cách thiết kế các class hợp lý và rõ ràng sẽ giúp ích rất nhiều cho việc mở rộng và bảo trì sau này. Để làm được điều này chúng ta cần phải có 1 bản thiết kế Class Diagram thật sự hợp lý. Vậy Class Diagram là gì, hãy cùng tìm hiểu.
![](https://images.viblo.asia/d90c2059-3bd2-4124-9b7a-b96a0fcc24ef.png)
## Định nghĩa Class Diagram
- Class diagram mô tả kiểu của các đối tượng trong hệ thống và các loại quan hệ khác nhau tồn tại giữa chúng.
- Là một kỹ thuật mô hình hóa tồn tại ở tất cả các phương pháp phát triển hướng đối tượng.
- Biểu đồ hay dùng nhất trong UML và gần gũi nhất với các lập trình viên. 
- Giúp các lập trình viên trao đổi với nhau và hiểu rõ ý tưởng của nhau.

## Các tính chất cơ bản của class diagram
- Tên class
- Attribute (field, property)
- Operation (method, function)

Ví dụ khai báo tên, attribute, operation kèm theo kiểu trả về của 1 class:
![](https://images.viblo.asia/5b3dc477-b7f4-4dfe-b02c-8055b1489d90.PNG)

## Access Modifier trong  class diagram
- Sử dụng để đặc tả phạm vi truy cập cho các Attribute và Operation của 1 class (Cấp quyền cho các class khác sử dụng Attribute và Operation của class này).
- 4 lựa chọn phạm vi truy cập
    
    + Private ( - ): Chỉnh mình các đối tượng được tạo từ class này có thể sử dụng.
    + Public ( + ): Mọi đối tượng đều có thể sử dụng.
    + Protected ( # ): Chỉ các đối tượng được tạo từ class này và class kế thừa từ class này có thể sử dụng.
    + Package/Default: Các đối tượng được tạo từ class trong lớp cùng gói có thể sử dụng.
  
  ![](https://images.viblo.asia/94064e86-7fcf-4ead-b647-3d3e1e5fd068.PNG)
## Relationship trong class diagram
- Sử dụng để thể hiện mỗi quan hệ giữa đối tượng được tạo từ 1 class với các đối tượng được tạo từ class khác trong class diagram.
- 4 loại Relationship:
![](https://images.viblo.asia/c869cd68-1172-4a51-8257-81c732537bae.PNG)

    + Inheritance: 1 class kế thừa từ 1 class khác.
    + Association: 2 class có liên hệ với nhau nhưng không chỉ rõ mối liên hệ.
    + Composition: Đối tượng tạo từ lass A mất thì đối tượng tạo từ class B sẽ mất.
    + Agreegation: Đối tượng tạo từ lass A mất thì đối tượng tạo từ class B vẫn tồn tại độc lập.
![](https://images.viblo.asia/e1f89064-9f49-40c9-82c3-2bbb40a7b390.PNG)


## Multiplicity trong class diagram
- Sử dụng để thể hiện quan hệ về số lượng giữa các đối tượng được tạo từ các class trong class diagram

    + 0...1: 0 hoặc 1
    + n : Bắt buộc có n
    + 0...* : 0 hoặc nhiều
    + 1...* : 1 hoặc nhiều
    + m...n: có tối thiểu là m và tối đa là n

![](https://images.viblo.asia/91cafd9c-0266-4817-90f8-428fed42a708.PNG)

-----

## Kết luận
- Việc thiết kế class diagram là điều cần thiết mà 1 lập trình viên chuyên nghiệp cần phải có.
- Lý thuyết của class diagram khá đơn giản nhưng để thực hành tốt thì cần tư duy và kinh nghiệm lập trình để bản thiết kế đạt được kết quả tốt nhất.
- Rất mong sự góp ý của các bạn để mình hoàn thiện hơn trong các bài viết tiếp theo ❤️