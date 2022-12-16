## KIỂM THỬ TỰ ĐỘNG
### Kiểm thử tự động là gì?
Kiểm thử tự động thực hiện kiểm thử hệ thống với dữ liệu đầu vào và đầu ra đã được xác định một cách tự động. Thay vì kiểm thử thủ công Kiểm thử tự động là sử dụng công cụ để thực hiện các test case. 

### Vì sao phải thực hiện kiểm thử tự động?
Kiểm thử tự động giúp:
-	Tiết kiệm chi phí: Kiểm thử thủ công tất cả các kịch bản nhiều lần sẽ gây tốn thời gian và tiền bạc. Đối với những dự án lớn đã đi đến giai đoạn bảo trì thì kiểm thử tự động là một lựa chọn đúng đắn để sử dụng. Tần suất thực hiện một test suite là thường xuyên hơn với tổng số test case lớn. Kiểm thử tự động giúp giảm nguồn lực.
-	Tăng độ bao phủ: có thể thực thi số lượng lớn test case trong thời gian ngắn nên giúp tăng độ bao phủ.
-	Tiết kiệm thời gian: Hoàn thành công việc mà trong khoảng thời gian đó kiểm thử thủ công không thể hoàn thành được.
-	Chính xác hơn: Nhờ độ ổn định cao, kiểm thử tự động có thể thực thi các test case với độ chính xác cao hơn. Kiểm thử thủ công gây nhàm chán có thể dẫn đến sai xót trong quá trình kiểm thử.

### Khi nào thực hiện kiểm thử tự động?
-	Đa số được thực hiện trong các dự án lớn, thời gian dài.
-	Chức năng đã được kiểm thử thủ công ít nhất một lần. Các bug tìm thấy khi kiểm thử thủ công đã được fix. 
-	Kiểm thử tự động được dùng để kiểm tra tải và hiệu suất với nhiều người dùng ảo thực thi performance test hay load test.
-	Thường xuyên phải thực thi regression test. Từ khi DEV đưa ra bản build mới cho tới khi phiên bản mới tới tay khách hàng chỉ trong thời gian ngắn. Trong thời gian ngắn ngủi này, sẽ thực thi việc regression test, đồng nghĩ với việt một số lượng test case lớn phải được thực thi trong một khoảng thời gian ngắn. Đây là lúc cần thiết để sử dụng kiểm thử tự động.
### Không nên kiểm thử tự động khi:
- Hệ thống chưa có tính ổn định, yêu cầu hệ thống thường xuyên thay đổi.
- Các trường hợp kiểm thử mới được thiết kế và chưa được thực hiện qua kiểm thử thủ công ít nhất một lần.
- Các trường hợp kiểm thử thực hiện trên cơ sở ad-hoc.

## MỘT SỐ LỆNH SELENIUM WEBDRIVER
### Selenium WebDriver
Selenium Webdriver là một tool open source giúp việc thực thi các hành động lên trang web một cách tự động. Selenium WebDriver cho phép sử dụng một trong số các ngôn ngữ lập trình (HTML, Java, .Net, Perl, Ruby,…) để tạo kịch bản test.  Đây được coi là một trong những công cụ kiểm thử tự động khá thú vị. Web Driver có thể giao tiếp trực tiếp với các trình duyệt Web và tương tác để thực hiện Automation.
 
### Một số lệnh
**a.	Locating GUI Elements**
![](https://images.viblo.asia/c9d4cd3d-30a6-46c0-a8d4-e05291722367.png)

 
**b.	Navigate commands**
![](https://images.viblo.asia/b8a93a50-b538-45ed-a23c-14d8790a065e.png)

**c.	Get Commands**
  ![](https://images.viblo.asia/d9bfc97e-dcd3-4d70-8e89-a09266199ec1.png)

**d.	Closing and Quitting Browser Windows**
 ![](https://images.viblo.asia/a68e39cf-8f72-4352-8656-d4a545ff29e2.png)
###  Ví dụ
Truy cập vào website, thực hiện tìm kiếm theo từ khòa và đóng tất cả cái cửa sổ trình duyệt đang mở.
![](https://images.viblo.asia/5256e591-c8e4-410c-8e0f-dc3f135f4313.png)

![](https://images.viblo.asia/a0cf1015-b4af-4ed0-9d11-126dc4cc1c9d.gif)