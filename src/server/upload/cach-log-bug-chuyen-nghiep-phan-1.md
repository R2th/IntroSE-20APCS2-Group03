Có lẽ có rất nhiều bài chia sẻ về cách log bug ( báo cáo lỗi ) khi các bạn Tester/QA thực hiện test một trang web hay 1 ứng dụng mobile nhưng hôm nay mình vẫn muốn chia sẻ một cách ngắn gọn và đầy đủ nhất về cách log bug dành cho các bạn newbie ( các bạn mới bắt đầu làm nghề tester nhé). ^^

Một report bug/ báo cáo lỗi chất lượng được xác định bởi tài liệu bằng văn bản và các tệp đính kèm được tải lên (ảnh chụp màn hình/screenshots và screencasts/quay video ). Tất cả các thông tin nên được cập nhật càng chi tiết và nhỏ gọn càng tốt. 

Khi log bug chúng ta chủ yếu sử dụng tool/ công cụ **Jira** hoặc **Redmine** ( tùy vào từng doanh nghiệp). Dưới đây là format template khi bạn log 1 bug cho dev.

Nó  bao gồm 3 phần chính:

**- Bug title/ Subject**

**- Description:**
+ Enviroment/Môi trường
+ Account/Tài khoản test
+ Link/Url test
+ Step/Các bước tái hiện bug 
+ Actual result/ Kết quả thực tế 
+ Expected result/ Kết quả mong đợi 
+ Link refer tài liệu/ spec
+ Link UI Zeplin

**- Attachment**

Chúng ta sẽ đi sâu vào từng mục nhé:

**I, Bug title/ Subject: Tiêu đề lỗi**

- Tiêu đề lỗi phải ngắn gọn và chính xác!
- Nó nên chứa tên chức năng, thành phần đã bị lỗi như thế nào. 
- Format: [SprintA][Tên số màn hình][Tên chức năng]: Nội dung Bug

 =>  [Sprint01][01-01][Login]: Trường password chưa được hiển thị dạng mã hóa.

|  Ví dụ  | English | Vietnamese |
| -------- | -------- | -------- |
|1 |Wrong: No search results. <br>Correct: Search results not displayed when entering a valid search on the homepage |Sai: Không có kết quả tìm kiếm <br> Đúng: Kết quả tìm kiếm không được hiển thị khi nhập tìm kiếm hợp lệ trên trang chủ
| 2| Wrong: Sometimes closing a window doesn’t work<br>Correct: Closing a window only works X out of Y times | Sai: Đôi khi việc đóng cửa sổ không hoạt động.<br>Đúng: Đóng cửa sổ chỉ hoạt động X trong số Y lần|
|3  | Wrong: Filter XYZ does not work<br>Correct: When applying filter XYZ, the products don’t change order     |Sai: Bộ lọc XYZ không hoạt động<br>Đúng: Khi áp dụng bộ lọc XYZ, các sản phẩm không thay đổi thứ tự   |

Đọc qua 3 ví dụ trên, các bạn có thấy sự khác biệt về cách log bug sao cho người đọc dễ hiểu và đi đúng trọng tâm rồi đúng không nào. Hãy mô tả ngắn gọn và chi tiết nhé. Tiếp theo chúng ta sang phần Description.


**II, Description: Mô tả tái hiện bug**

**- Enviroment/Môi trường:**
+ Với web: IE, Chrome, Edge, Firefox, Safari
+ Với app: Android/ IOS 

**- Account/Tài khoản test:**
+ Với web: nguyenvana/Aa@123456
+ Với App: nguyenvana/Aa@123456

**- Link/Url test:**      http://www.examplewebsite.com

**- Step/Các bước tái hiện bug:**  chúng ta sẽ ghi các bước để ra được màn hình gặp lỗi 

**- Actual result/ Kết quả thực tế:** Mô tả thực trạng chức năng đang xảy ra lỗi như thế nào

**- Expected result/ Kết quả mong đợi:** Mô tả kết quả đúng về chức năng như trong spec/tài liệu mô tả

**- Link refer tài liệu/ spec:** Để thêm rõ ràng chúng ta gắn thêm link tài liệu, để lấy dẫn chứng vs dev rằng chúng ta bắt bug đúng. Hơn nữa dev có thể đọc lại tài liệu mà cần tốn time tìm lại.

**- Link UI Zeplin:** Nếu bug về UI/UX thì chúng ta có thể gắn thêm link Zeplin của màn đó để dev mở ra xem lại rồi đối chiếu dễ hơn.


| VD | English |Vietnamese |
| -------- | -------- | -------- |
| 4     | [Sprint01][01-01][Login]: Password field is not  displayed in encrypted type.<br>- Enviroment:  Chrome<br>- Account: nguyenvana/Aa@123456<br>- Url: http://www.examplewebsite.com<br>- Step:<br>1. Go to Login page<br>2. Input valid username=nguyenvana<br>3. Input password =Aa@123456<br>Actual result: Password field is not  displayed in encrypted type<br>Expected result: Password is displayed in encrypted type    | [Sprint01][01-01][Login]: Trường password chưa được hiện thị dạng mã hóa<br>- Môi trường: Chrome<br>- Tài khoản: nguyenvana/Aa@123456<br>-  Url: http://www.examplewebsite.com<br>-  Các bước tái hiện:<br>1. Mở màn hình Login <br>2.  Nhập trường Tên người dùng =nguyenvana<br>3.  Nhập trường Mật khẩu =Aa@123456<br>Kết quả thực tế: Trường password chưa được hiện thị dạng mã hóa<br>Kết quả mong đợi: Trường password được hiện thị dạng mã hóa     | 

**- Link tài liệu:**  gắn link tài liệu dự án

**- Link UI zeplin:** gắn link tài liệu dự án
 Vậy là chúng ta đã hoàn thiện 1 report bug rồi. Ngoài ra chúng ta cần thêm những ảnh , chụp lại màn hình hoặc quay video để dev có thể hiểu mình đang sai ở đâu và fix bug được nhanh hơn. 
 
 
**III, Attachment/File đính kèm**

 - Các bạn có thể dùng 1 số tool để chụp màn hình: Awesome screenshot, Snipping Tool ...

Chúc các bạn sẽ trở thành 1 Tester/QA chuyên nghiệp và ghi điểm với Sếp của mình sau khi đọc xong bài chia sẻ của mình nhé. ^^ Hẹn gặp lại các bạn ở phần tiếp theo