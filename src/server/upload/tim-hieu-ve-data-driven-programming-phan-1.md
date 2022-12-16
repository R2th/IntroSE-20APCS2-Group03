**Trong những năm lập trình, đa số bản thân chỉ sử dụng kiểu lập trình hướng thủ tục (Procedure Oriented Programming - POP) và hướng đối tượng (Object Oriented Programming – OOP), vì mình code C# và Java là chính. Thời mình chuyển qua lập trình Front-end với ReactJs thì được tìm hiểu với khái niệm lập trình hướng dữ liệu (Data Oriented Programming – DOP) này. Cảm thấy mỗi loại sẽ có nhiều ưu điểm và khuyết điểm khá hay nên lên viết bài viết để mọi người cùng góp ý nhé.**

![](https://images.viblo.asia/02df81b6-644f-4c3b-96f3-36cf5bd6e090.jpg)

**Data Driven Programming (DDP) hay Data Oriented Programming (DOP) được định nghĩa là kiểu lập trình nơi mà code chương trình không chứa hoặc rất ít các xử lý business logic. Đa số các xử lý business logic này sẽ nằm ở datasource (có thể là XML, Json hay SQL database). Trong bài viết mình sẽ dùng cụm từ Data Driven, do hiện nay khái niệm được dùng phát triển và nghiệp vụ (Business) như một xu hướng và văn hóa nên sử dụng cụm từ này sẽ gần gũi và dễ tiếp hơn. Trong bài viết này mình so sánh DDP và OOP, do công việc và stack của bản thân làm việc với 2 kiểu lập trình này nhiều hơn.**

![](https://images.viblo.asia/c076e54c-ab90-481c-a38c-35d10e24e925.jpeg)

## DDP và OOP

Mình sẽ lướt qua định nghĩa, chỉ chủ yếu đi về việc áp dụng chính của các kiểu lập trình khi có yêu cầu bài toán đưa ra (Requirement)

### 1/ Lập trình hướng đối tượng OOP
Kiểu lập trình này thường gần gũi hơn với yêu cầu người dùng và cuộc sống quanh ta. Thường cách để xác định logic của kiểu này sẽ là
* Xác định các đối tượng (objects) trong yêu cầu bài toán
* Xác định các thuộc tính, dữ liệu và quan hệ giữa các đối tượng trong yêu cầu bài toán

![](https://images.viblo.asia/e9823672-573d-4107-bf44-75a6bfec3fa2.png)


### 2/ Lập trình hướng dữ liệu DDP

Với DDP thì yêu cầu bài toán được ra cần được nhìn với khía cạnh là dữ liệu (Data). Trong DDP, kể cả các function xử lý cũng sẽ được gắn liền với dữ liệu, lúc này việc thiết kế data structures của sẽ tốn nhiều thời gian hơn để xây dựng. Dẫn đế việc số lượng dòng code & thời gian thực thi chương trình sẽ được giảm tải, do các xử lý logic đã được gắn trong dữ liệu rồi

![](https://images.viblo.asia/17e0d06a-df78-45d5-afce-b5f78c7c8d9d.png)


### 3/ OOP vs DDP
**OOP** là kiểu lập trình truyền thống của dân lập trình viên

**Ưu điểm**
* Cách thức thiết kế sẽ là ánh xạ giữa yêu cầu bài toán thực tế và ngôn ngữ lập trình nên việc thiết kế tương đối đơn giản
* Bản thân OOP hỗ trợ rất tốt các kỹ thuật Kế thừa, Đa hình nên việc phát triển & mở rộng code cho các ứng dụng này rất linh động

**Khuyết điểm**
* Đối với các yêu cầu chương trình về xử lý dữ liệu, lọc & chuyển đổi dữ liệu thì OOP sẽ tốn nhiều thời gian thiết kế
* Khi data model hoặc data logic thay đổi thì cần người lập trình viên phải chỉnh sửa và maintain data trên chương trình

**DDP** thường được sử dụng nhiều với các úng dụng xử lý , chuyển đổi dữ liệu và các ứng dụng lập trình front-end hiện tại

**Ưu điểm**
* Logic nằm data nên việc thay đổi logic yêu cầu bài toán có để cho chính End User hoặc Business End tự thay đổi và maintain. Miễn không thay đổi structure của data
* Performance ứng dụng sẽ được rút ngắn do xử lý logic đa phần đã điều hướng trong chính dữ liệu

**Khuyết điểm**
* Khi dữ liệu quá lớn, việc thiết kế logic dữ liệu sẽ là thách thử lớn
* Cần sự phối hợp và am hiểu lớn về yêu cầu bài toán. Đôi lúc người lập trình và business user phải ngồi với nhau để làm cấu trúc dữ liệu

![](https://images.viblo.asia/915b7419-ec17-4b1f-ab16-a88cb15b8a8c.jpg)

Trong bài sau, mình sẽ đi vào một ví dụ thực tế về cách OOP và DDP giải quyết bài toán thực tế. Các mô tả, thiết kế của cả 2 loại này luôn
### Yêu cầu bài toán: Xây dựng chương trình hiển thị tiền lương & phúc lợi cho công ty gồm 3 cấp nhân viên: STAFF, MANAGER, TOP MANAGER (Kiểu lãnh đạo cấp cao). Mỗi cấp bậc sẽ có mức phúc lợi và phương thức chi trả khác nhau

Hẹn gặp lại mọi người ở bài sau nhé


**Bài viết có tham khảo từ các nguồn**
* https://medium.com/@jonathanmines/data-oriented-vs-object-oriented-design-50ef35a99056
* https://prateekvjoshi.com/2013/11/30/programming-paradigms-object-oriented-vs-data-oriented/