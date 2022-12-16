Hế lô các bạn, là mình đây 😗 ... Mình đã quay lại =))

Sau một vài lần phải tham gia vào dự án ở giai đoạn đang phát triển thì mình nhận ra *Use case diagram* hỗ trợ việc tiếp cận dự án và quá trình test rất nhiều. Bài viết này mình sẽ nói một chút về lý do nên sử dụng nó trong kiểm thử phần mềm nhé!

Tuy nhiên chắc sẽ nhắc lại 1 chút xem “Use case diagram” là gì nhỉ! Phòng trường hợp ai đó chưa biết hoặc lâu rồi không động đến xong quên xừ mất! >.<

## 1. Về Use case diagram
Use case diagram là một trong số các biểu đồ trong UML. Ai mà còn chưa nhớ UML là gì thì đọc lại ở đây nhó :3 →  https://viblo.asia/p/phan-tich-thiet-ke-he-thong-thong-tin-su-dung-bieu-do-uml-phan-1-PjxMe6yNG4YL

Use case diagram: Biểu diễn sơ đồ chức năng của hệ thống. Mỗi use case mô tả chức năng mà hệ thống cần phải có xét từ góc độ người dùng. 

Sự tương tác trong biểu đồ use case có thể là:

- Cách thức mà người dùng tương tác với hệ thống
- Cách thức mà hệ thống tương tác với các hệ thống khác

Ví dụ: Hệ thống quản lý thư viện

- Admin: Đăng nhập vào hệ thống, thực hiện cập nhật thông tin và quản lý các giao dịch mượn, trả sách
- Bạn đọc: Chỉ có thể tìm kiếm, tra cứu thông tin

![image.png](https://images.viblo.asia/86ad148e-e150-4559-b3bd-6942e42a09d5.png)

## 2. Các thành phần của Use case diagram

*Actor:* Chỉ người dùng hoặc một đối tượng bên ngoài có khả năng tương tác với hệ thống.

*Use case:* Là các chức năng mà các actor sẽ sử dụng để thể hiện sự tương tác giữa những người dùng và hệ thống.

*Communication link:* Kết nối giữa Actor và Use case giúp thể hiện được sự tương tác giữa hệ thống và người dùng.

*Boundary of system:* Thể hiện phạm vi xảy ra của Use case

*Relationships:* Quan hệ trong Use case bao gồm 3 loại chính là: include, extend và  generalization

- Include: Là mqh bắt buộc phải có giữa các Use case với nhau. 

    Xét về nghĩa: include nghĩa là bao gồm → tức là nếu nói: use case A có mqh include với use case B thì điều đó có nghĩa là Use case A bao gồm Use case B
    
    Ví dụ: ![image.png](https://images.viblo.asia/d0c77443-1563-445d-9665-5bffa49d27ff.png)
    
    
- Extend: Là mối quan hệ mở rộng giữa các use case với nhau.
 
    Nó thể hiện mqh có thể có hoặc không giữa các use case với nhau. Nếu use case A là extend của use case B thì use case A chỉ là một optional và chỉ xảy ra trong một hoàn cảnh cụ thể được xác định.
    ![image.png](https://images.viblo.asia/f73a1613-a678-409c-902d-9d67ae0f2832.png)
    
- Generalization: là mqh cha/con giữa các use case với nhau, nó được dùng để thể hiện mqh giữa các actor với nhau. 

    Nhìn chung, generalization giúp thể hiện rõ hơn các yêu cầu bằng việc gom nhóm các use case lại theo quan hệ cha/con, và generaliozation có tính kế thừa: tức là thằng cha có gì thì thằng con sẽ có cái đó.
    
## 3. Các bước xây dựng Use case diagram
**Bước 1: Tìm Actor**

Trả lời các câu hỏi sau để tìm actor cho hệ thống:
- Ai sẽ là người sử dụng các chức năng của hệ thống?
- Ai cần sự hỗ trợ của hệ thống để thực hiện các công việc hàng ngày?
- Ai cần bảo trì, quản trị và đảm bảo hệ thống hoạt động?
- Hệ thống sẽ tương tác với các hệ thống nào khác?

**Bước 2: Xác định các Use case**

Trả lời cho câu hỏi các actor sử dụng chức năng gì trong hệ thống để từ đó xác định được các use case cần thiết cho hệ thống:
- Actor cần chức năng nào từ hệ thống?
- Actor cần phải xem, cập nhập hay lưu trữ thông tin gì trên hệ thống?
- Actor cần thông báo cho hệ thống những sự kiện gì? Sự kiện đó đại diện cho chức năng nào?
- HT có cần thông báo cho actor khi có sự thay đổi không?
- …

**Bước 3: Xác định mối quan hệ**

Phân tích và xác định các quan loại hệ giữa các Actor và Use case; giữa các Actor với nhau; giữa các Use case với nhau → sau đó nối chúng lại chúng ta sẽ được bản vẽ Use case.
## 4. Các ứng dụng trong dự án
Một vài ứng dụng điển hình của Use case diagram trong dự án:
- Phân tích và hiểu hệ thống
- Thiết kế hệ thống
- Làm cơ sở cho việc phát triển, kiểm tra các bản vẽ như Class Diagram, Activity Diagram, Sequence Diagram, Component Diagram
- Làm cơ sở để giao tiếp với khách hàng, các nhà đầu tư
- Giúp cho việc kiểm thử chức năng, kiểm thử chấp nhận

-----

Bên trên là một vài thông tin tóm tắt về Use case diagram. Mình chỉ tóm tắt sơ lược, các bạn có thể đọc thêm để rõ hơn nha. >.O

Có bạn từng hỏi mình rằng: “Em thấy cái use case diagram này nó có khác gì bản đồ tư duy đâu?” Híc ... thực tế là khác nhau đó các bạn 😄
- Bản đồ tư duy: là mind map, nó đơn giản là mình liệt kê ra các ý hiểu, các idea hoặc function theo dạng sơ đồ cây.
- Còn use case diagram: nó được vẽ dưới góc nhìn của user tương tác với hệ thống như thế nào; các hệ thống khác tương tác với hệ thống của mình như thế nào. Nó liên quan trực tiếp đến nghiệp vụ dự án.

Vậy CÂU HỎI đặt ra: *Vì sao tester nên biết và ứng dụng Use case diagram trong kiểm thử phần mềm?*

Oh ... overview 1 chút lý thuyết vậy đã :<

Nội dung có vẻ hơi dài nên mọi người tìm hiểu tiếp phần 2 ở đây nha: *###Buồn ngủ quá nên chưa edit xong phần 2 :< , mình sẽ update link sớm nhất nha###*