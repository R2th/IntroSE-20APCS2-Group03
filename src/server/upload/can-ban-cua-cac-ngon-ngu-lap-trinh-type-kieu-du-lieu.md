Thứ chúng ta tiếp xúc đầu tiên khi học một ngôn ngữ lập trình chính là Type - kiểu dữ liệu. Mỗi ngôn ngữ lập trình sẽ có các kiểu dữ liệu khác nhau để phục vụ nhu cầu riêng của nó. Đi liền với các định nghĩa về type khác nhau là cách thức sử dụng (khai báo, khởi tạo) cũng khác nhau. Bài viết sau đây mình phân loại các type trong ngữ lập trình, từ đó giúp các bạn hiểu rõ hơn về đặc thù của các ngôn ngữ lập trình.

# Static type vs Dynamic type:
* Biến của ngôn ngữ static type (java, c++) không thể đổi kiểu, trong khi ngôn ngữ dynamic type (js, python) thì kiểu của biến có thể thay đổi liên tục.
* So với Dynamic type, ngôn ngữ Static type có những ưu điểm sau:
    * **Self documentation**: Nhìn vào là biết hàm đó nhận tham số kiểu gì, trả về kiểu gì 
    * **Good for IDE**: IDE dễ dàng gợi ý hơn
    * **Less bug**: Vì quản lí kiểu chặt chẽ nên tránh được nhiều bug
* So với Dynamic type, ngôn ngữ Static type có những nhược điểm sau:
    * Code dài dòng hơn, nên tốc độ code chậm hơn và code khó đọc hơn
    * Hơi phức tạp với newbie
* Các ngôn ngữ Static type phổ biến: C, C++, Java, C#
* Các ngôn ngữ Dynamic type phổ biến:  Javascript, Python, Ruby, PHP
# Strong type vs Weak type:
* Các phép toán trong ngôn ngữ Strong type (java, C#) sẽ được trình biên dịch kiểm tra về tính tương thích của kiểu dữ liệu trước khi run. Chẳng hạn, ta không thể lấy 1 + "abc" trong java. Trong khi trong js, giữa các kiểu khác nhau vẫn có thể thực hiện được phép toán (1 + "abc" = "1abc")
* Tương tự như Static type vs Dynamic type, Strong type giúp code rõ ràng, ít bug hơn nhưng kém linh động hơn so với weak type
* Các ngôn ngữ Strong type phổ biến: Java, C#, Python, Ruby
* Các ngôn ngữ Weak type phổ biến:  C, C++, Javascript, PHP
# Type diagram
Bất kỳ ngôn ngữ sẽ mang 2 đặc tính trong 4 đặc tính về kiểu nên trên. Chẳng hạn trong javascript là ngôn ngữ Dynamic Weak Type trong khi Java là ngôn ngữ Static Strong Type. Chi tiết về các đặc tính type của các ngôn ngữ, bạn có thể tham khảo ảnh dưới đây.
![](https://images.viblo.asia/fc8cc7b9-bb1f-49bf-8a95-b3cb4f97bb75.png)

# --- Kết bài
Hi vọng thông qua bài viết, bạn đọc đã có cái nhìn tổng thể hơn về kiểu dữ liệu trong các ngôn ngữ lập trình. Hãy để lại comment nếu có thắc mắc gì nhé