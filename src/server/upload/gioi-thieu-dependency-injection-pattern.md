# Giới thiệu 

Dependency Injection là một trong những Design Pattern quan trọng trong lập trình hướng đối tượng. Là một kĩ thuật khá đơn giả tuy nhiên được sử dụng hầu hết bởi mọi lập trình viên. Trong bài viết này tôi sẽ giới thiệu về mẫu design này.
    
![](https://images.viblo.asia/b1d99387-c527-42b9-9a42-6432b619fc7e.png)


# Định nghĩa
Dependency Injection là một Design Pattern thuộc nhóm khởi tạo (Constructor). Cho phép khởi tạo một thực thể phụ thuộc bên ngoài class cha. Qua đó giảm thiểu sự phụ thuộc vào lớp cha trong quá trình khởi tạo.

![](https://images.viblo.asia/23b8a8ef-9619-4a73-982e-769381ede198.png)


Lợi ích:
   
   - Dễ viết Unit test
    
 - Dễ dàng thay đổi

- Dể mở rộng khi dự án tăng về quy mô


# Đặt vấn đề

Giả sử bạn có một chiếc xe máy. Trong chiếc xe máy có nhiều loại linh kiện, ví dụ như lốp xe. Ứng với lốp xe có nhiều loại lốp với giá tiền khác nhau. ví dụ loại A giá 1000$, loại B giá 500$.
 Ví dụ khi mua xe bạn chọn chiếc lốp loại B để tiết kiệm chi phí: 
![](https://images.viblo.asia/2ffcc339-f72a-46db-97a6-d0f7efaea0c9.png)

Khi bạn tạo một object xe, nôị tại class sẽ tạo ra một thực thể lốp. Điều này tạo nên sự phụ thuộc cho giữa 2 lớp. Điều này gây nên 2 vấn đề. 
- Bạn không thể thay đổi phần tử trong trong lớp phụ thuộc. Ví dụ: Trường hợp bạn có tiền và muốn thay lớp loại B thành loại A

- Trong trường hợp bạn muốn thay đổi bắt buộc bạn phải tác động vào nội tại của class để thay sữa lại thuộc tính trong class xe. Điều này vi phạm nguyên tắc Open-close trong SOLID.

# Giải quyết

Để giải quyết vấn để trên DI là một biện pháp hiệu quả.

Bản chất của DI là tạo ra một xem thực thể phụ thuộc như một interface. Ta không cố ràng buộc lớp cha và thực thể phụ thuộc và không khởi tạo thực thể phụ thuộc trong nội tại của hàm. Khi khởi tạo một thực thể của class cha. Ta khởi tạo thực thể phụ thuộc và truyền vào bên trong. Điều này sẽ giảm áp lực phụ thuộc cho lớp cha. 
![](https://images.viblo.asia/fb77b6ab-38ae-4a45-b844-b74f03dd0bcd.png)

Trong ví dụ trên thay vì tạo sẵn thực thể lốp trong nội tại class xe. Ta chỉ khai báo một interface và truyền thực thể từ bên ngoài. Do đó việc thay đổi trở nên dễ dàng hơn. Giả sử nếu ta muốn thay đổi lốp loại A sang B. Ta rất đơn giản thay đổi như sau 
![](https://images.viblo.asia/849ff8d9-9880-4fdf-ac6f-4e0f1ef568ad.png)

Như vậy ta đã dễ dàng thay từ lớp A sang lớp B mà không sửa code bên trong của class Xe điều này phù hợp với quy tắc của SOLID

# Các dạng DI

DI có 3 dạng sau

 - Khởi tạo thông qua constructor (Constructor Injection)
 ![](https://images.viblo.asia/afe1400e-0b34-4f5d-8edb-f94a2d6c9bf4.png)


- Khởi tạo thông qua setter (Setter Injection)
![](https://images.viblo.asia/0fc55e4d-29da-4e54-8f07-c19591ad137a.png)



#  Tổng kết
DI là một kĩ thuật khá phổ biến trong lập trình. Nắm rõ về kĩ thuật này sẽ giúp code của bạn trở nên chuyên nghiệp và tối ưu hơn.