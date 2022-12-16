*Xem link  bài viết gốc tại: https://viblo.asia/p/bpm-tutorial-quy-trinh-xin-nghi-phep-phan-2-implement-the-process-1VgZvMYMKAw*
# Phần II: Implement the process
### Mục đích bài học:
 - Tạo Business object để lưu trữ data đặc trưng của process
 - Thêm các Team bằng cách thêm Lane và gán team vào Process
 - Implement timer intermediate events
 - Implement gateways

## 1. Tạo Business Object 
Business Object biểu thị dữ liệu của nghiệp vụ liên quan đến process hiện tại
- *absenceRequest*

1. Trong Library, click vào biểu tượng dấu cộng cạnh **Data** và chọn **Business Object**
 ![](https://images.viblo.asia/a0c21107-3a8b-4671-a178-c6507b8cff4e.png)

2. Nhập *AbsenceRequest* sau đó click **Finish**
3. Trong mục **Parameters**, click vào dấu cộng để tạo các parameters
4. Nhập *fullName* và giữ nguyên kiểu dữ liệu của biến (variable type) là **String**. Để đổi, click vào **Select** ở mục **Variable Type** và chọn kiểu dữ liệu trong danh sách.
5. Tiếp tục tạo các param sau:
 - **department (String)**  
 - **empNumb (String)**
 - **absenceType (String)**
 - **reasonAbsence (String)**
 - **startDate (Date)**
 - **endDate (Date)**
 ![](https://images.viblo.asia/d29a34a8-253d-4ac9-aa0e-82ddaa9e4768.PNG)

6. Lưu lại
7. Mở lại Process **Absence Management**, tab **Variables**
8. Đổi Variable type của biến private *absenceRequest* thành **AbsenceRequest**  bằng cách click vào nút **Select**/ chọn **AbsenceRequest**. Biến private của bạn sẽ nhìn như sau:
![](https://images.viblo.asia/2daffbd9-3dab-4ee3-a3d8-cb79cd5b1d83.PNG)
9. Lưu lại
10. Trở lại Process **Absence Management**, tab **Definition** để mở Process Diagram.
## 2. Implement timer intermediate events
Timer **Quá hạn phê duyệt** mà bạn đã gắn vào activity **Phê duyệt đơn nghỉ phép** ở bài học trước sẽ được cài đặt trong phần này, bạn sẽ cài đặt những thuộc tính sau:
- Trigger on - Định rõ thời gian khi nào timer intermediate event được khởi chạy
- Before or After difference - Định rõ khoảng thời gian trước hoặc sau khi thời gian xác định được chọn ở trên để chạy event.****
**Cách thức tiến hành**
1. Click vào timer intermediate event được gắn vào **Phê duyệt đơn nghỉ phép**
2. Mở mục **Implementation**
3. Trong mục *Event Properties*
 - Trigger on - Before due date. Event sẽ chạy trước khi task hết hạn.
 - Before or after difference - 1 Hour. Event sẽ chạy trước khi task hết hạn 1 tiếng.
 ![](https://images.viblo.asia/dff9f3db-a2de-4404-9822-0a0e54e49c44.PNG)
4. Lưu lại
## 3. Implement gateways
Ta sẽ  dùng các biến process để cài đặt hai gateway **Chuyển phê duyệt?** và **Phê duyệt?** , các biến này sẽ kiểm soát luồng nghiệp vụ đi theo hướng nào.
**Cách thức tiến hành**
1. Mở lại Process **Absence Management**, tab **Definition**
2. Cài  đặt gateway **Chuyển phê duyệt?**:
- Click chọn **Chuyển phê duyệt** gateway
- Trong tab **Properties** chọn **Implementation**
- Trong mục Decisions, ta thấy thứ tự luồng như sau: **Cần phê duyệt** và  flow mặc định **Hủy đơn**.
- Click chọn icon ![](https://images.viblo.asia/2d753152-500c-41e3-b343-016aca07a902.png) **Variable Picker**
- Chọn *absenceRequest/reasonAbsence*
- Đổi phép toán so sánh từ *None* sang !=
- Phần box cuối cùng điền "cancel" (logic này có nghĩa là nếu lý do là "cancel" thì hủy việc gửi đơn lên quản lý)
![](https://images.viblo.asia/7273ca40-0fd2-40ff-9359-3c8d26330fbc.PNG)
3. Lưu lại
4. Cài đặt gateway **Phê duyệt?**:
- Click chọn **Chuyển phê duyệt** gateway
- Trong tab **Properties** chọn **Implementation**
- Trong mục Decisions, ta thấy thứ tự luồng như sau: **Đồng ý**; **Từ chối** và  flow mặc định **Yêu cầu chỉnh sửa**.
- Đối với luồng **Đồng ý** Click **Variable Picker** 
- Chọn *managerDecision*
- Đổi phép so sánh từ *None* sang ==
- Điền kết quả so sánh là "accept"
- Tương tự vậy đối  với luồng **Từ chối** là == "reject"
![](https://images.viblo.asia/355306ca-34f6-4568-a18f-891419234bdb.PNG)
5. Lưu lại

## 4. Tổng kết 
Nhìn vào diagram, có thể thấy được chúng ta đã cài đặt xong tổng quan process cũng như luồng sử dụng chính của quy trình:
- Người dùng tạo đơn xin nghỉ phép
- Nếu đơn nghỉ phép có lý do khác lý do "cancel" thì chuyển cho ông quản lý, nếu "cancel" thì hồ sơ bị hủy
- Quản lý nhận tác vụ.
- Quản lý đưa ra một trong ba quyết định: Đồng ý -> Update thông tin HR -> End; Từ chối -> Send mail thông báo -> End; Yêu cầu chỉnh sửa -> trở lại Tạo đơn nghỉ phép