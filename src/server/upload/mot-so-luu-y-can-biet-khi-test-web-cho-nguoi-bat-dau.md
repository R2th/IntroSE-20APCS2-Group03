## Tester là gì ? Bạn cần làm gì để trở thành một tester giỏi ?
Tester là người kiểm thử phần mềm để tìm kiếm các lỗi, sai sót hay bất cứ cái gì mà có thể ảnh hưởng đến phần mềm. Với sự phát triển và cách nhìn nhận của từng công ty thì tester còn được chia ra thành rất nhiều nhánh ví trí nhỏ hơn như QA, QC, Manual Tester, Automation Tester… 
Bạn đã tìm được hướng đi cho mình với công việc làm tester và và bạn muốn khao khát trở thành tester giỏi ? Tất cả sự phát triển hình thành nào cũng phải có cái gốc đến cái ngọn, muốn giỏi cái vĩ đại thì ta cần phải nắm vững những cái cơ bản khi mới bắt đầu.
 6 Lưu ý hãy luôn nhớ khi bạn muốn kiểm tra thế nào của một hệ thống .
### * Kiểm thử giao diện 
### * Kiểm thử chức năng 
### * Kiểm thử CSDL 
### * Kiểm thử sự tương thích 
### * Kiểm thử bảo mật 
### * Kiểm thử hiệu năng
***1. 	Kiểm thử giao diện***

-----


Vì sao chàng trai đều thích bắt chuyện làm quen với những cô gái đẹp mà chẳng cần biết cô ấy như thế nào ? Cứ làm quen được với nàng đã mọi chuyện rồi sau tính tiếp. Và phần mềm cũng vậy, nếu bạn muốn sản phẩm công ty bạn làm ra có nhiều khách hàng tương tác hay biết đến thì hãy làm cho người ta có ánh mắt nhìn tuyệt vời về sản phẩm của bạn ngay sau khi họ nhìn thấy. Test giao diện rất đơn giản nhưng nó lại rất quan trọng. 

*1. 1	Tính chính xác*
-	Giao diện chung : Hiển thị màn hình mặc định, các footer, header, banner 
Các dự án đã có design và được khách hàng comfirm thì hãy nên tôn trọng và quan sát đúng như design khách hàng đã đồng ý. Check từng màn hình một footer, header, banner chuẩn nhất từ kích thước màu sắc, text đúng design. Một số khách hàng khó tính bạn có thể sử dụng một số tool để check kích thước Share X hay check màu có thể dùng Instant Eyedropper 
-	Kiểm tra bắt lỗi đầu vào.
Check tất cả các trường hợp theo validate yêu cầu, từ đó để check hiển thị các khung error message nhưng khách hàng mong muốn, nội dung lỗi hiển thị đúng lúc đúng vị trí và đúng thời điểm
-	Kiểm tra một số thông số khác như màu nền, màu chữ,…

*1. 2	Check tính thẩm mỹ*
-	Màu sắc các font chữ kích cỡ phải hợp nhất trong một trang và giữa các trang cũng cần có thống nhất. Rất nhiều trường hợp khi test trang home thì có font chữ một kiểu và trang mypage thì một kiểu. Cảm giác rất khó chịu hạn chế với người dùng. Một số font chữ gây mất chân chữ hoặc không rõ ràng ở một số trình duyệt cần sớm báo khách hàng để có phương án giải quyết tối ưu nhất.
-	Hình ảnh , icon phải có kích thước phù hợp với trang 
-	Đối với giá tri input cho hệ thống đôi khi nhập quá dài dẫn đến tràn thông tin kéo dài bị đè lên các mục khác cần kiểm tra kỹ để có đưa ra ý kiến xuống dòng hoặc giới hạn hiển thị.

*1. 3	Tính dễ sử dụng*

-	Vị trí các button ưu tiên là dễ dùng dễ sử dụng và dễ tìm 
-	Check các thông tin điều hướng các link, buttons, menu tới các trang phải chính xác thống nhất hệ thống 
-	Có thể sử dụng tab, enter, phóng to, thu nhỏ phím tắt trên bàn phím có thể điểu khiển hệ thống nhanh nhẹ.
-	Tùy theo từng thông tin cung cấp như option, tooltip, danh sách list cần phân trang, thanh cuộn ngang, cuộn dọc.
-	Chức năng fitter phải luôn hoạt động một cách chính xác nhất.
-	Check kéo kịch xuống, lên, trái phải sẽ không bị thừa khoảng trống không đáng có.
-	Chuyển các tab liên tục sẽ không bị vỡ hình hay lưu data của tab trước.

 Ví dụ về cách đo kích thước chuẩn nhất mà với khách hàng khó tính 
 
 Điều kiện: Design trên slide và yêu cầu kích thước chuẩn như slide trên mọi màn hình
 
Khó khăn: Màn hình của tester và màn hình design của khách hàng là không cùng kích cỡ nên rất khó so sánh.
### * Cách thực hiện: 

  Bước 1: Chỉnh phân dải của máy cùng bằng độ phân dải của màn hình
  
  Bước 2: Sử dụng Full Page Screen Capture chụp toàn bộ màn hình trên màn hình test
  
  Bước 3. Mở ảnh chụp màn hình và slide design đặt thẳng với nhau và đưa so sánh kích thước. 
Ngoài ra có thể sử dụng Instant Eyedropper để check màu design và web nếu không được ghi rõ mã màu trong thiết kế.

*Trong lần sau tôi sẽ nói tiếp về phần test chức năng, hẹn gặp lại các bạn.*