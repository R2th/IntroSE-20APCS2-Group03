Hello mọi người lại là mình với series "Automation test mà không cần code" đây :heart_eyes_cat: 

:bookmark: Chủ đề hôm nay mình viết là "Debug trong Selenium IDE"

Bất kể 1 ngôn ngữ nào thì việc Debug là rất cần thiết trong quá trình làm việc. :bug: 

Vậy Debug trong Selenium có gì đặc biệt và có dễ sử dụng hay không thì mời bạn đọc bài hôm nay của mình nha

**Debug trong Selenium IDE**

Vậy Debug là gì?

> Debug là quá trình tìm kiếm ra lỗi hay nguyên nhân gây ra lỗi (bug ở đâu) để có hướng sửa lỗi (fix bug)

Là 1 quá trình tìm kiếm nguyên nhân gây ra bug và giúp developer gỡ lỗi tốt. Nếu mà lập trình viên không biết đến debug thì sẽ mất khá nhiều thời gian để tìm nguyên nhân gây ra lỗi

Để dễ hình dung thì mình đi vào bài toán cụ thể

Nếu nghi ngờ đoạn code nào gây ra bug thì bạn tích vào line code đó
![](https://images.viblo.asia/d7ea30dd-0332-4af8-bf4c-ec510079868d.PNG)
- Hoặc cách thứ 2 là nhấn chuột phải vào line code đó và chọn option "Toggle breakpoint"

- Để bỏ debug thì bạn chỉ cần click vào step đó 

Để bắt đầu debug thì ta chọn "Run current test" chương trình sẽ bắt đầu chạy

Khi chạy thì chương trình sẽ chạy từ đầu đến line code mà bạn đặt debug sẽ dừng lại. Tại đây bạn có 2 lựa chọn
+ Nếu bạn không muốn chạy từng step thì chọn option "Resume test execution" tương đương với tổ hợp phím "Ctrl + P" - chương trình sẽ chạy từ line code bị dừng để tiếp tục
+ Nếu nghi ngờ line code đó chứa nguyên nhân gây ra bug thì chọn option "Step over current command" tương đương với tổ hợp phím "Ctrl + '" chương trình sẽ chạy từng step

Tại đây check code, tìm nguyên nhân và fix

**Một số chức năng mở rộng của Selenium 2021**

**1. Chức năng "Play to this point"**

Chức năng này tương tự như đặt Debug ở trên, tuy nhiên khi chọn option này thì project sẽ chạy luôn và dừng ở Step đặt debug mà không cần thông qua "Run current test"

![](https://images.viblo.asia/3e8f3ea3-377b-456d-864c-328267f36a8c.gif)


**2. Chức năng "Record from here"**

  Chức năng này cho phép bạn record từ line được chọn Record from here. Chức năng này cần đến khi bạn muốn thêm thao tác Record tại line code mà bạn chọn. Trong 1 số trường hợp thì điều này là cần thiết để có thể tìm thêm được nguyên nhân gây ra lỗi cho code của bạn.
![](https://images.viblo.asia/c1c54e5c-7e59-4f9e-b9af-a223de384eb9.gif)



**3. Chức năng "Play from here"**

Chức năng này sẽ chạy từ line mà bạn chọn Play from here.
Chức năng này tối ưu thời gian và tập trung vào những dòng code mà bạn nghi ngờ chứa nguyên nhân gây ra bug mà không cần chạy lại từ đầu
![](https://images.viblo.asia/19e9db97-d929-4b79-8b8b-73734f4e959a.gif)



Qua bài viết này mình hy vọng bạn sẽ biết và sử dụng thành thạo tính năng Debug trong trong Selenium IDE :ey
Cảm ơn đã đọc bài! :heartpulse: