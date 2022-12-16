Sự phát triển bùng nổ của thị trường thiết bị di động sử dụng và ứng dụng di động khiến việc kiểm thử trở thành một yêu cầu quan trọng để mang lại sự thành công các ứng dụng di động chất lượng cao.

### Mobile application specifics

![](https://images.viblo.asia/2e22a2c0-4950-4467-b7c4-6d72cdfef542.png)

Một ứng dụng di động chắc chắn sẽ khác rất nhiều so với ứng dụng máy tính. Vì vậy, khi lên test plan phải cân nhắc thật kỹ điều này để điều chỉnh kế hoạch.

Vậy chúng ta hãy thử tìm hiểu, một ứng dụng di động khác biệt gì so với một ứng dụng máy tính:

* Thiết bị di động là một hệ thống nhỏ, không được trang bị đầy đủ mạnh mẽ như một chiếc máy tính. Do đó nó không thể hoạt động như một chiếc máy tính và có những vấn đề riêng của nó.
* Kiểm thử ứng dụng di động được cung cấp trên thiết bị cầm tay (Apple, Samsung, Nokia, v.v.), trong khi ứng dụng máy tính thì được kiểm thử trên môi trường riêng biệt.
* Màn hình thiết bị di động đa dạng, các phần mở rộng và màu sắc khác biệt so với một chiếc máy tính. Kích thước màn hình điện thoại di động cũng nhỏ hơn nhiều.
* Thực hiện cuộc gọi và nhận cuộc gọi là chức năng chính trên các thiết bị di động, đó là lý do tại sao các chức năng của ứng dụng không được làm ảnh hưởng tới các chức năng quan trọng này. Web app không có điều này.
* Có rất nhiều hệ điều hành riêng biệt được cấu trúc lại theo từng nhà phát triển di động(Android, iOS, BlackBerry...)
* Hệ điều hành trên thiết bị di động nhanh chóng lỗi thời, được update thường xuyên. Với một số thiết bị cụ thể sẽ bị giới hạn về việc nâng cấp hệ điều hành.
* Thiết bị di động sử dụng kết nối 2G, 3G, 4G hoặc Wifi, tùy vào thiết bị có thể hỗ trợ sóng 5G. Còn máy tính để bàn chỉ có thể sử dụng mạng dây hoặc kết nối Wifi.
* Kết nối mạng trên thiết bị di động liên tục thay đổi, đó là lý do tại sao một số ứng dụng hoạt động bằng kết nối internet cần được kiểm thử với nhiều loại kết nối, tốc độ khác nhau.
* Một số công cụ hỗ trợ, hỗ trợ tốt trên các thiết bị máy tính nhưng lại khó đề phù hợp trên các thiết bị di động.
* Ứng dụng di động phải hỗ trợ nhiều kênh đầu vào(bàn phím, giọng nói, cử chỉ, viết vẽ...) nên cần sử dụng nhiều công nghệ hơn so với ứng dụng máy tính.

### Một điều quan trọng khác trong quá trình kiểm thử ứng dụng di dộng đó là thể loại của ứng dụng.

Ứng dụng dành cho thiết bị di động được chia làm 3 loại chính: 
* Mobile Web Apps -  là trang web được mở trong ứng dụng duyệt web hỗ trợ bởi trình duyệt web của hệ điều hành.
* Native (Pure native) Apps - là ứng dụng được phát triển cho hệ điều hành riêng biệt(Android, iOS, Tizen, Windows 10 mobile, BlackBerry)
* Hybrid Apps - là sự kết hợp giữa Mobile web app + Native app: Nói dễ hiểu thì nó giống như là trình bày nội dung của trang web vào một định dạng riêng của ứng dụng.

|| Mobile Web Apps |Native (Pure native) Apps | Hybrid Apps |
| --------| -------- | -------- | -------- |
| Ưu điểm|  Dễ dàng phát triển. Dễ dàng truy cập. Cập nhật dữ liệu dễ dàng. Không cần phải cài đặt.     | Có thể hoạt động khi ngoại tuyến, tùy vào chức năng phát triển. Có thể sử dụng toàn bộ tính năng của thiết bị di động. Trải nghiệm người dùng được nâng cao. Thông báo đẩy có thể được sử dụng để nhắc nhở về các hành vi cảnh báo cho người dùng.    | Chi phí, hiệu quả cao hơn so với Native app. Dễ dàng phân phối. Trình duyệt nhúng được được vào app. Sử dụng các tính năng của thiết bị di động. |
| Nhược điểm|   Không hỗ trợ ngoại tuyển(khi offline, không có kết nối mạng). Chức năng bị hạn chế so với các loại khác(không có quyền truy cập vào hệ thống tệp, tài nguyên của thiết bị...). Apple store, Google play không hỗ trợ phân phối phát hành ứng dụng web di động.| Tốn kém hơn nhiều so với phát triển một ứng dụng web di động. Chi phí cao cho việc bảo trì, hoạt động.  | Việc sử dụng định dạng app + thời gian tải web nên nó sẽ hoạt động không nhanh bằng ứng dụng thông thường. Đồ họa sẽ là đồ họa chung của Web nên ít thân thiện với người dùng như một ứng dụng được phát triển cho riêng hệ điều hành nào đó. |

### Chiến lược kiểm thử trên thiết bị di động.

Bây giờ chúng ta sẽ nghĩ tới chiến lược kiểm thử. Hãy cùng điểm qua các điểm chính và các thách thức mà chúng ta sẽ đối mặt.

![](https://images.viblo.asia/a8409cb4-b2fc-4353-9357-9e813f7126f1.png)

**1.  Device selection - Chọn thiết bị kiểm thử**

![](https://images.viblo.asia/541b42fc-3c79-4a49-9222-b3f27cbd23bd.jpg)

Không còn nghi ngờ gì nữa, kiểm thử trên một thiết bị thực tế sẽ là quyết định tốt nhất cho bạn. Thực hiện kiểm thử trên thiết bị thực luôn đem lại kết quả đúng và chính xác nhất cho bạn so với giả lập.

Thực sự không phải là chuyện dễ trong việc chọn thiết bị test phù hợp nhất. Nhưng đây là những lưu ý bạn nên làm khi thực hiện chọn thiết bị:

* Thực hiện các bài khảo sát, phân tích xác định các thiết bị sử dụng phổ biến nhất trên thị trường.
* Chọn các thiết bị với các hệ điều hành hoặc phiên bản điều hành khác nhau.
* Chọn thiết bị kiểm thử với các kích cỡ màn hình khác nhau.
* Chú ý đến các yếu tố như là: Dung lượng bộ nhớ, các loại kết nối hỗ trợ, Ram...

Bảng so sánh ưu và nhược điểm khi kiểm thử trên các thiết bị di động thực:


| Ưu điểm | Nhược điểm |
| -------- | -------- |
| Độ chính xác cao trong các kết quả kiểm thử     | Một số lượng lớn các thiết bị cần được sử dụng |  
| Dễ dàng tìm ra lỗi     | Chi phí phát sinh trong quá trình bảo trì, bảo dưỡng thiết bị     |
 | Các điểm như: Hết pin, vị trí, thông báo đẩy, cảm biến dễ dàng thực hiện     | Các hạn chế về quyền truy cập khi sử dụng ở nước ngoài     |
 | Có khả năng thực hiện các interrupt bằng tin nhắn hoặc cuộc gọi     |      |
  | Có khả năng kiểm thử ứng dụng trên môi trường và điều kiện thực tế     |      |
   | Không có lỗi giả(lỗi thường phát hiện trên các máy ảo)  |      |
   
   Như bạn có thể thấy kiểm thử trên các thiết bị thực là quyết định tốt, nhưng nó cũng có một số hạn chế nhất định. Bạn phải biết nắm bắt và khắc phục chúng để làm cho quá trình kiểm thử ứng dụng trên thiết bị di động thực sự hiệu quả.
   
   
**2. Nên sử dụng Emulators hay Simulators?**

![](https://images.viblo.asia/f7d03c47-582f-4ce9-8bc0-e7b2e3a993ea.png)

Không có gì để khó nhận ra, chúng là những công cụ đặc biệt dùng để mô phỏng chức năng, hành vi của các thiết bị di động.

Mặc dù phát âm khá giống nhau, nhưng nghĩa và chức năng của chúng không có ý nghĩa gì tương đương nhau.

**Emulators** - Một trình giả lập thay thế cho thiết bị gốc. Mặc dù bạn có thể chạy các ứng dụng và phần mềm trên tiện ích của bạn, nhưng bạn không thể chỉnh sửa được các thông số kỹ thuật của nó.

**Simulators** - Không sao chép phần cứng của thiết bị nhưng cho phép bạn có khả năng thiết lập môi trường tương tự như hệ điều hành của thiết bị.

Vì vậy, với kinh nghiệm bản thân thì tốt nhất bạn nên dùng **Simulators** để kiểm thử ứng dụng mobile, còn **Emulators** thích hợp hơn cho việc kiểm thử trang web.



-----

[Phần 2: How to test mobile application? Các giai đoạn, phân loại trong kiểm thử ứng dụng di động](https://viblo.asia/p/how-to-test-mobile-application-cac-giai-doan-phan-loai-trong-kiem-thu-ung-dung-di-dong-phan-2-gDVK29Wr5Lj).

---

Phần tiếp theo sẽ đi hết chiến lược kiểm thử của mobile app. Đi sâu vào các loại kiểm thử trên mobile app, một số lưu ý khi kiểm thử mobile app.

Tài liệu tham khảo: https://www.360logica.com/blog/mobile-apps-vs-desktop-apps-a-deeper-look/

https://viblo.asia/p/mobile-testing-emulator-va-simulator-MdZkAjOJvox

https://geteasyqa.com/qa/mobile-apps-testing/