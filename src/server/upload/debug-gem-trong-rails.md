Khi code của gặp vấn đề ,chúng ta sẽ theo dõi màn hình console để biết được lỗi gì đang xảy ra.Nhưng đôi khi console không giúp chúng ta tìm được gốc rễ của lỗi mà chúng ta gặp phải .Khi đó gem byebug sẽ giúp bạn giải quyết vấn đề đó.
<br>
# 1.SetUp<br>
 Chúng ta có thể sử dụng byebug gem để đặt breakpoints và debug code của mình qua đó giải quyết vấn đề chúng ta gặp phải<br>
 Để cài đặt gem byebug ta chạy dòng lệnh.<br><br>
 ![](https://images.viblo.asia/80ee2227-8c42-46dc-9822-0822fe98f1e1.png)
 <br>
###  1.1 Byebug cung cấp một số các chức năng cơ bản như:<br>
 -Stepping: thực thi các câu lệnh theo trình tự.<br>
 -Breaking: tạo breakpoint, conditional breakpoint…<br>
 -Evaluating: Basic REPL functionality.<br>
 -Tracking: theo dõi sự thay đổi của variables hay các dòng lệnh khi thực thi.<br>
###  1.2 Commands trong byebug:<br>
![](https://images.viblo.asia/263fab68-d08d-43d9-83eb-a49834fdb1e2.png)<br>
# 2.Sử Dụng<br>
Ta đặt byebug ở dòng code muốn kiểm tra:<br>
![](https://images.viblo.asia/85edef65-39e0-45d0-ab99-3336d1a99fe2.png)<br>
Khi chạy trình duyệt của bản sẽ bị treo cho đến khi chúng ta debug xong,terminal sẽ hiện ra như sau:<br>
![](https://images.viblo.asia/745fbff1-d103-470e-b3bc-1b7a8bb8ef43.png)<br>
Command sẽ hỗ trợ bạn:<br>
-next: move đến execution của dòng tiếp theo,vd từ dòng 8 xuống dòng 9.<br>
-step: nếu tại dòng 8, bạn gõ step, byebug sẽ nhảy vào definition của method find_recent.<br>
-up: tương tự như step out, sau khi step in tại dòng 8, debugger nhảy vào method find_recent, muốn nhảy ra lại, các bạn gõ lệnh up.<br>
-pp: viết tắt của pretty print, giúp bạn xem value của một variable nào đó đã được format cho dễ nhìn.<br>
-continue: thoát debugger và tiếp tục execution của app.<br>
-help <command>: xem description của command.<br>
Tài liệu thâm khảo:<br>
https://guides.rubyonrails.org/debugging_rails_applications.html