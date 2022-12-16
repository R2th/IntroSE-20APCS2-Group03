Chào tất cả mọi người. Và để tiếp tục loạt bài về **Design Pattern** hôm nay, mình sẽ trình bày về **Behavioral Design Pattern** (mẫu thiết kế hành vi).<br>
Behavioral Design Pattern là các mẫu thiết kế xác định và định nghĩa các mẫu giao tiếp chung giữa các đối tượng. Bằng cách làm như vậy, những mô hình này làm tăng tính linh hoạt trong việc thực hiện giao tiếp của các đối tượng. Mẫu thiết kế bao gồm:<br>
* Chain of responsibility : là phương án để chuyển yêu cầu giữa một chuỗi các đối tượng.
* Iterator: truy cập liên tục các thành phần của bộ lựa chọn.
* Null Object: được thiết kế để hoạt động như giá trị mặc định của đối tượng.
* State: thay đổi hành vi của đối tượng khi trạng thái thay đổi.
* Strategy: Đóng gói thuật toán bên trong một lớp.
* Template method: Định nghĩa bộ khung gồm các bước chính xác của một thuật toán cho từng phân lớp.<br>
Và trong bài viết hôm nay mình sẽ đi sâu vào tìm hiểu mẫu **Template method**.<br>
# Tempalte method
## Mục đích
* Xác định bộ khung của một thuật toán trong một phép toán, một số bước sẽ được triển khai trong các phân lớp con. Template Method cho phép các lớp con định nghĩa lại các bước nhất định của thuật toán mà không thay đổi cấu trúc của thuật toán.
* Lớp cơ sở khai báo thuật toán "placeholders", các lớp dẫn xuất thực hiện việc triển khai thuật toán placeholders.<br>
## Vấn đề
Hai thành phần khác nhau nhưng có những điểm tương đồng đáng kể nhưng không chứng minh được việc sử dụng lại giao diện hoặc thực hiện chung. Nếu sự thay đổi chung cho cả hai thành phần trở nên cần thiết, cần phải tốn nhiều thời gian do trùng lặp.
## Hướng giải quyết
* Thành phần thiết kế quyết định các bước của một thuật toán là bất biến (hoặc là 1 chuẩn), và đó là biến thể. Các bước được thực hiện trong một lớp cơ sở trừu tượng, trong khi các bước biến thể đưa ra một các bước cài đặt mặc định, hoặc không thực hiện bất kỳ điều gì cả. Từng bước đại diện cho "hooks", hoặc "placeholders", có thể hoặc phải được cung cấp bằng các thành phần của phía khách trong một lớp có nguồn gốc cụ thể.
* Các thành phần thiết kế yêu cầu các bước cần thiết của một thuật toán, và thứ tự các bước, nhưng cho phép các thành phần phía khách được mở rộng hoặc thay thế một số bước này.
* Template Method được sử dụng nổi bật trong các frameworks. Mỗi framework thực hiện các phần không thay đổi của kiến trúc của miền và xác định "placeholders" cho tất cả tùy chọn hoặc tùy chỉnh cần thiết của khác hàng. Khi làm như vậy, framework này trở thành "center of the universe" (trung tâm của vũ trụ), và các tùy chỉnh phía khách đơn giản là "the third from the sun".
![](https://images.viblo.asia/705c3d93-3c2a-402a-ba2a-72073fcd24fa.png)
## Cấu trúc
Việc thực hiện `templateMethod ()` là: gọi `stepOne()`, gọi `stepTwo()`, và gọi `stepThree()`. `stepTwo()` là phương thức cầu nối - là một placeholder. Nó được khai báo trong lớp cơ sở, và sau đó được định nghĩa trong các lớp dẫn xuất.<br> Framework sử dụng rất nhiều Template Method rất nhiều. Tất cả các mã tái sử dụng được định nghĩa trong các lớp cơ sở của framework, và sau đó phái khách của framework được tự do xác định các tùy chỉnh bằng cách tạo ra các lớp dẫn xuất nếu cần.
## Lời kết
Trên đây, mình đã trình bày với các bạn về **Behavioral Design Pattern** và một mẫu thiết kế thuộc về nó là **Template Method Pattern** (mẫu thiết kế phương pháp mẫu) cùng với cấu trúc rõ ràng về chúng, mong rằng sẽ mang lại chút sự hứng thú và chút tò mò về các mẫu thiết kế còn lại để các bạn tiếp tục đi sâu với nó.<br>
Good luck!