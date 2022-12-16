**1. Component Testing là gì?**

![](https://images.viblo.asia/c1523b85-40a3-42be-b620-3c6d91b970d3.jpeg)

Component Testing được định nghĩa là một loại kiểm thử phần mềm, trong đó kiểm thử được thực hiện trên từng thành phần riêng lẻ một cách riêng biệt mà không tích hợp với các thành phần khác. 

Nó còn được gọi là Kiểm thử mô-đun khi nó được nhìn từ góc độ kiến trúc. Component Testing còn được gọi là Kiểm thử đơn vị, Kiểm thử chương trình hoặc kiểm thử module

Nói chung, bất kỳ phần mềm nào nói chung đều được tạo ra từ một số thành phần. Kiểm tra mức độ thành phần liên quan đến việc kiểm tra các thành phần này riêng lẻ.

Đây là một trong những loại kiểm tra hộp đen thường xuyên nhất được thực hiện bởi Nhóm QA.

Theo sơ đồ dưới đây, sẽ có một chiến lược kiểm tra và kế hoạch kiểm tra cho kiểm thử thành phần. Nơi mỗi và mọi phần của phần mềm hoặc ứng dụng được xem xét riêng lẻ. 

Đối với mỗi thành phần này, một Kịch bản thử nghiệm sẽ được xác định, kịch bản này sẽ được đưa vào các trường hợp thử nghiệm cấp cao -> Các Trường hợp thử nghiệm chi tiết cấp thấp với điều kiện tiên quyết.

Việc sử dụng thuật ngữ ” Kiểm tra thành phần (Component Testing )” khác nhau giữa các miền và tổ chức với tổ chức.

 **2. Lý do phổ biến nhất dẫn đến nhận thức khác nhau về Component Testing:**
 
  + Loại mô hình vòng đời phát triển được chọn

  + Độ phức tạp của phần mềm hoặc ứng dụng đang thử nghiệm
  
  + Thử nghiệm có hoặc không cách ly với phần còn lại của thành phần khác trong phần mềm hoặc ứng dụng.
 
Như chúng ta đã biết Kiến trúc vòng đời kiểm thử phần mềm có rất nhiều thử nghiệm-hiện vật (Các tài liệu được tạo, sử dụng trong các hoạt động kiểm thử). 

Trong số nhiều thử nghiệm – hiện vật, đó là Chính sách thử nghiệm & Chiến lược thử nghiệm xác định các loại thử nghiệm, độ sâu của thử nghiệm sẽ được thực hiện trong một dự án nhất định.

 **3. Ai thực hiện Component Testing:**
 
Component Testing được thực hiện bởi người kiểm thử. ‘Kiểm thử đơn vị’ được thực hiện bởi các nhà phát triển nơi họ thực hiện kiểm tra chức năng hoặc quy trình riêng lẻ. Sau khi Kiểm thử đơn vị được thực hiện, kiểm thử tiếp theo là kiểm thử thành phần. Component Testing được thực hiện bởi những người kiểm thử.

 **4.Khi nào thực hiện Component Testing:**
 
Component Testing được thực hiện ngay sau khi Kiểm thử đơn vị được thực hiện bởi các nhà phát triển và bản dựng được phát hành cho nhóm kiểm thử. Bản dựng này được gọi là bản dựng UT (Unit Testing Build). Chức năng chính của tất cả các thành phần được kiểm tra trong giai đoạn này,

Tiêu chí đầu vào để Kiểm tra thành phần (Component Testing )”

      . Số lượng tối thiểu của thành phần được đưa vào UT phải được phát triển và thử nghiệm đơn vị.
   
Tiêu chí thoát cho Kiểm tra thành phần (Component Testing )”

      . Chức năng của tất cả các thành phần sẽ hoạt động tốt.
      
      . Không được có bất kỳ khuyết tật nghiêm trọng hoặc cao hoặc Trung bình và ưu tiên khuyết tật Nhật ký khiếm khuyết nào.
      
**5.Kỹ thuật Kiểm tra thành phần (Component Testing )**

Dựa trên độ sâu của các cấp độ kiểm tra, Kiểm tra thành phần (Component Testing ) có thể được phân loại là

   . CTIS – Thử nghiệm thành phần trong quy mô nhỏ
   
   . CTIL – Kiểm tra thành phần ở quy mô lớn
   
   ![](https://images.viblo.asia/21fd0d58-a866-401b-86f9-f68b81e025b8.png)

***5.1 CTIS – Thử nghiệm thành phần trong quy mô nhỏ***

Tùy thuộc vào độ sâu của mức độ kiểm tra, Kiểm tra thành phần (Component Testing )” được chia thành hai phần:

Kiểm tra thành phần ở quy mô nhỏ (CTIS)

Kiểm tra thành phần ở dạng lớn (CTIL)

Khi Component Testing được thực hiện tách biệt với các thành phần khác, nó được gọi là thử nghiệm thành phần nhỏ. Điều này được thực hiện mà không cần xem xét tích hợp với các thành phần khác.

Khi Component Testing được thực hiện mà không bị cô lập với các thành phần khác của phần mềm thì nó được gọi là Component Testing nói chung. Điều này xảy ra khi có sự phụ thuộc vào luồng chức năng của các thành phần và do đó chúng tôi không thể cô lập chúng.

Nếu các thành phần mà chúng ta có phụ thuộc chưa được phát triển, thì chúng ta sử dụng các đối tượng giả thay cho các thành phần thực. Các đối tượng giả này là sơ khai (được gọi là hàm) và trình điều khiển (gọi hàm).

**6.Các trường hợp kiểm tra mẫu cho Component Testing:**

Hãy xem xét 2 trang web theo sơ đồ được đề cập bên dưới, Ở đây cả hai trang web đều có liên quan với nhau theo quan điểm chức năng.

***Trang 1 là trang đăng nhập vào 1 website***

Khi người dùng nhập user-id và mật khẩu hợp lệ vào trường văn bản và nhấp vào nút gửi, trang web sẽ được điều hướng đến trang chủ của trang web đó.

![](https://images.viblo.asia/c77b87f1-a9ff-4a93-9683-a376c399f4f2.png)


***Trang web 2 là trang chủ của website đó***

![](https://images.viblo.asia/9e352e2d-515f-4469-94f6-19943fed3984.png)

Vì vậy, ở đây trang đăng nhập là một thành phần, và trang chủ là một thành phần khác. Bây giờ việc kiểm tra chức năng của từng trang riêng lẻ được gọi là Kiểm tra thành phần (Component Testing ) .

Kịch bản Component Testing trên trang web1 –

      . Nhập id người dùng không hợp lệ và xác minh xem có bất kỳ cảnh báo thân thiện với người dùng nào được hiển thị cho người dùng cuối hay không.
      
      . Nhập password vào xem có được mã hóa hay không? Khi click vào button eye xem có hiển thị password đã nhập và ngược lại được hay không.
      
      . Nhập tên người dùng và mật khẩu hợp lệ và nhấp vào nút ‘Đăng nhập’.
      
      . Xác minh tất cả các liên kết, button như: Forgot password, register now, login by facebook, google có hoạt động hay không.  
      
Kịch bản Component Testing trên trang web2 –

      . Xác minh xem thông báo “Đăng nhập thành công” có được hiển thị trên trang chủ hay không.
      
      . Xác minh xem tất cả liên kết ở phía bên trái của trang web có thể nhấp được hay không.
      
**7.Unit Testing Vs Component Testing:** 


| 1 | Unit Testing| Component Testing |
| -------- | -------- | -------- |
|1| Kiểm tra các chương trình, mô-đun riêng lẻ để chứng minh rằng chương trình thực thi theo thông số kỹ thuật được gọi là Kiểm thử đơn vị | Kiểm thử từng đối tượng hoặc các phần của phần mềm một cách riêng biệt có hoặc không có sự cô lập của các đối tượng khác được gọi là Kiểm thử thành phần |
|2| Nó được xác nhận dựa trên các tài liệu thiết kế | Nó được xác nhận dựa trên các yêu cầu kiểm tra, các trường hợp sử dụng  |
|3| Kiểm thử đơn vị được thực hiện bởi Nhà phát triển | Component Testing được thực hiện bởi Người kiểm tra | 
|4| Kiểm tra đơn vị được thực hiện đầu tiên | Component Testing được thực hiện sau khi kiểm thử đơn vị hoàn tất từ các nhà phát triển kết thúc. | 

 
 
 
 
**8.Kết thúc**

Trong Kỹ thuật phần mềm, Component Testing đóng một vai trò quan trọng trong việc tìm ra lỗi. 

Trước khi bắt đầu với Kiểm tra tích hợp , chúng tôi luôn khuyến nghị thực hiện Kiểm tra thành phần (Component Testing )” để đảm bảo rằng mỗi thành phần của ứng dụng đang hoạt động hiệu quả.

Kiểm thử tích hợp được theo sau bởi kiểm thử thành phần. Component Testing cũng được gọi là kiểm thử mô-đun trong một số tài liệu tham khảo.

Bài viết đến đây đã kết thúc, bài viết được tham khảo từ https://www.guru99.com/component-testing.html