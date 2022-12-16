I . AESTHETIC CHECK 

Khi test web app hay bất kỳ ứng dụng nào khác,  QA cần phải để ý đến vẻ bề ngoài giao diện, bề ngoài của nó. Sau đây là 1 vài lưu ý:
1. Kiểm tra màu nền chung của toàn bộ màn hình
2. Kiểm tra màu sắc của các trường textbox
3. Kiểm tra màu chữ, font, font size của label 
4. Trong mode Read- only, mùa sắc và font chữ đúng với yêu cầu
5. Kiểm tra căn lề của các object hiển thị trên màn hình ( Label, Textbox,...)
6. Kiểm tra các error message: Nội dung, font chữ, màu sắc, vị trí, ...
7. Kiểm tra hiển thị của giá trị sau khi input vào textfield
8. Kiểm tra màu sắc của textbox border: khi nhập, khi có thông báo lỗi


II. VALIDATION CHECK 
 
Datatype: 
- varchar, nvarchar, ntext
- int, tinyint, float

1. Kiểm tra maxlength
2. Phân biệt chữ hoa / chữ thường
3. Phân biệt chữ Full size/ Half size (Tiếng Nhật)
4. Phân biệt ký tự unicode
5. Null
6. Ký tự đặc biệt(&^&^%$%^)
7. Space

Datatype: datetime

1. Kiểm tra maxlength
2. Kiểm tra ngày hợp lệ
3. Nhập chữ
4. Nhập ký tự đặc biệt 
5. Kiểm tra format
6. Kiểm tra đối với trường hợp năm nhuận 
8. Kiểm tra đối với tháng khi nhập: 00 và 13
9. Kiểm tra đối với ngày khi nhập:  00 và 32
10. Kiểm tra khi nhập 28 , 29, 30 tháng 2 

III. NAVIGATION CHECK

1. Có thể truy cập đến các trang khác nhau từ menu
2. Kiểm tra các page sau khi chọn page từ menu 
3. Kiểm tra highlight focus khi chọn item trên menu
4. Kiểm tra các message xác nhận chuyển trang


IV. USABILITY CHECK 

1. Các danh sách có được sort không?
2. Kiểm tra format của giá trị ngày tháng
3. Các phím tắt gán với button có hoạt động đúng không?
4. Tab/ Shift Tab order
5. Các trường Read- only và Disabled không có thứ tự Tab/ Shift Tab
6. Kiểm tra các tooltips, placeholders
7. Kiểm tra trường hợp khi input invalid value, vị trí lỗi có được highlight không?

V. DATA INTEGRITY CONDITIONS 

1. Kiểm tra việc lưu dữ liệu khi đóng cửa số
2. Kiểm tra chiều dài tối đa của tất cả các field, và đảm bảo giá trị nhập vào không bị cắt
3. Kiểm tra giá trị max/min đối với nhập số
4. Kiểm tra việc cho nhập số âm và có được lưu đúng trong database không?
5. Kiểm tra việc lưu nhiều dữ liệu cùng lúc được chính xác trong database không? Ví dụ trường hợp làm tròn,....

VI. RESPONSIVE

1. Text, control và hình ảnh được căn chỉnh đúng cách
2. Higlight, đổi màu sắc khi hover và ở trạng thái lựa chọn
3. Vùng có thể click thích hợp
4. Màu sắc, độ phủ bóng và độ dốc phù hợp
5. Kiểm tra padding chính xác
6. Văn bản, hình ảnh, điều khiển và khung không chạy vào các cạnh của màn hình
7. Kích cỡ phông chữ, kiểu dáng và màu sắc phù hợp với từng loại văn bản
8. Scroll đoạn văn bản đã nhập (dữ liệu đã được nhập) được hiển thị chính xác
9. Không bao giờ hiển thị thanh ngang của trang.
10. Có thể đọc được trang web trên mọi độ phân giải.




## Reference
https://www.testingexcellence.com/how-to-test-responsive-web-design/
http://www.testingvn.com/viewtopic.php?f=9&t=3348