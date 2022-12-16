Mỗi ứng dụng đều sử dụng nhiều đối tượng:textbox, link, calendar, combo box, select box, radio button, check box, ... Tùy thuộc vào đặc điểm, chức năng của từng đối tượng ta có những quan điểm kiểm thử khác nhau. 

Dưới đây tôi sẽ giới thiệu nhưng  testcase cơ bản cho calendar.

## 1. Check UI

- Check default của calendar:
  + Calendar hiển thị ngày hiện tại
  + Calendar hiển thị tháng hiện tại
- Check calendar khi hover vào 1 ngày bất kỳ:
  + Ngày được hover chuyển xám ( thể hiện ngày được focus)
  +  Ngày hiện tại vẫn được tô sáng( thể hiển ngày được chọn)

Tùy vào spec của từng hệ thống mà những ngày không hợp lệ có thể inactive để không cho phép chọn những ngày đó

## 2. Check hoạt động của calendar
- Kiểm tra xem calendar có được điều hướng tới ngày khác trong tháng hiện tại bằng cách click chuột vào ngày đó
- Kiểm tra xem calendar có được điều hướng tới ngày khác trong tháng hiện tại bằng cách ấn phím di chuyển, ( lên, xuống, sang trái, sang phải)
- Kiểm tra xem calendar có được điều hướng tới tháng khác trong năm không
-  Kiểm tra xem calendar có thể điều hướng tới năm khác không
- Kiểm tra xem hoạt động của calendar khi nhập value vào textbox:
  + Khi nhập giá trị với format hợp lệ  và giá trị hợp lệ
  
    => Chọn ngày đã nhập trong calendar (tô sáng)
  + Khi nhập giá trị với format không hợp lệ: 
    + chỉ có yyyy/mm, 
    + chỉ có mm/dd, 
    + chỉ có dd, 
    + hay là nhập character/ symbol/  space/,...
    
        => Tùy vào spec mà cho phép nhập các ký tự character/ symbol/  space/,...hay không, còn với trường hợp thiếu yếu tố của ngày/ tháng/ năm thì calendar sẽ focus vào ngày hiện tại mà không được chọn ngày nào
  + Khi nhập giá trị đúng format mà không hợp lệ về giá trị:
    - Nhập ngày <1
    - Nhập ngày > ngày lớn nhất của tháng ( ngày 29 với tháng 2 không nhuận, 29 với tháng 2 nhuận, 31 với tháng có 30 ngày, 32 với tháng có 31 ngày)
    - Nhập tháng <1
    - Nhập tháng >12
    
      => Hiển thị message báo lỗi, và calendar sẽ focus vào ngày hiện tại mà không được chọn ngày nào
  
  
 
 Ngoài ra với calendar app có thể kiểm tra thêm 1 số tính năng của ứng dụng, như là:
-  Kiểm tra xem calendar có cho phép ghi chú cho ngày bất kỳ không?
-  Kiểm tra xem calendar có cho phép edit ghi chú của 1 ngày bất kỳ không?
-  Kiểm tra xemc alendar có khả năng hiển thị ngày lễ không
-  Kiểm tra xem calendar có cho người dùng thêm tùy chọn tử vi
-  Kiểm tra xem calendar có cho phép người dùng lưu trữ ngày sinh nhật không
-  Kiểm tra xem calendar có cho phép người dùng lưu trữ kỷ niệm không
-  Kiểm tra xem calendar có thể đồng bộ hóa với tài khoản google không
-  Kiểm tra xem calendar có cho phép người dùng lưu trữ đếm ngược không
-  Kiểm tra xem calendar có hiển thị thông báo đúng với lịch trình đã được cài đặt trong calendar không
-  Kiểm tra xem calendar có cho phép người dùng giữ lại dữ liệu khi chuyển thiết bị không

## Tài liệu tham khảo:
https://onecore.net/sample-test-cases-for-calendar-app.htm