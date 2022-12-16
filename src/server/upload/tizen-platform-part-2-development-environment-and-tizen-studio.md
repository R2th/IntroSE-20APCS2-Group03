Ở bài trước, mình đã giới thiệu cơ bản về hệ điều hành tizen, trong bài viết này, mình xin được giới thiệu bước đầu tiên để có thể xây ứng một ứng dụng tizen: cài đặt môi trường và các thành phần trong Tizen Studio.

### Tizen Studio 

Tizen Studio là một IDE được xây dựng dựa trên một version mới của Eclipse, vì vậy chúng ta có thể trải nghiệm sự ổn định, cấu hình nhẹ và giao diện thích hợp duy nhất cho môi trường phát triển tizen. Với Tizen Studio, chúng ta có thể lựa chọn và cài đặt chỉ những platform hay profile cần thiết.

Sử dụng Tizen Studio,  như những IDE khác, chúng ta có một môi trường hoàn chỉnh để phát triển ứng dụng (kể cả với những bản Tizen SDK cũ) : chúng ta có thể lập trình, build, debug, profile và giả lập máy ảo để chạy cả ứng dụng tizen native và tizen web. Môi trường phát triển trong Tizen Studio cực kì đơn giản, nó cho phép chúng ta phát triển ứng dụng thoải mái hơn và tập trung hơn vào tizen, hiện nay, có khoảng 200 ví dụ trực tuyến đang có sẵn để giúp chúng ta hiểu hơn về tizen, và tất nhiên, kho ví dụ này vẫn luôn được cập nhật và phát triển từng ngày.

### Let's start

Chúng ta có thể cài đặt môi trường phát triển Tizen trên cả 3 hệ điều hành thông dụng nhất hiện nay là Window, Mac OS và Ubuntu.

Note: từ Tizen Studio 3.0 trở về sau, việc hỗ trợ hệ điều hành Window và Ubuntu 32 bit sẽ không còn nữa. 

Để có thể bắt đầu xây dựng một ứng dụng, cần có những công cụ được cung cấp bởi Tizen Studio sau:

* Tất nhiên đầu tiên là  [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download), hướng dẫn cài đặt và cái package liên quan có thể tham khảo tại  [đây](https://developer.tizen.org/development/tizen-studio/download/installing-tizen-studio)

* [Native tools:](https://developer.tizen.org/development/tizen-studio/download/installing-tizen-studio) : những công cụ sử dụng khi lập trình ứng dụng tizen native,  sử dụng ngôn ngữ C.

* [Web tools](https://developer.tizen.org/development/tizen-studio/web-tools) : những công cụ sử dụng khi lập trình ứng dụng tizen web bằng Java Script, HTML, và CSS.

* [Platform tools](https://developer.tizen.org/development/tizen-studio/platform-tools): công cụ phát triển dành cho Ubuntu.

* [Tizen Studio for RT](https://developer.tizen.org/development/tizen-studio/rt-ide) : công cụ dành cho việc phát triển những ứng dụng cho các thiết bị IoT low-end (cấp thấp) và low-cost (giá thấp) như là các thiết bị gia dụng không có màn hình. 

* [Configurable SDK](https://developer.tizen.org/development/tizen-studio/configurable-sdk) 

### Installer and Package Manager

Chức năng này cho phép chúng ta cài đặt, nâng cấp và bảo trì Tizen Studio, chúng ta có thể lựa chọn và cài đặt những platform và những profile cần thiết, và nâng cấp thông qua các bản cập nhật thường xuyên.

Công cụ này cung cấp những thông tin chính xác để cấu hình môi trường phát triển dễ dàng.

Tính năng cũng tương tự như SDK manager của Android Studio mọi người nhỉ?

![](https://images.viblo.asia/dd3d442f-ce74-4bfb-8c49-32112f939a1d.png)


### Tizen Studio development environment 

Đây chính là nơi chúng ta sẽ dành hầu hết thời gian của mình, chúng ta có cái gọi là giao diện “unified Tizen”, cung cấp một môi trường phát triển nhanh, cải thiện tính dễ sử dụng thông qua việc sắp xếp menu và các biểu tượng trên thanh công cụ.
Ngoài ra, hệ thống trợ giúp bằng thông báo trên Tizen Studio cũng rất tốt, nó giúp người dùng nhanh chóng làm quen và giải quyêt các vấn đề một cách dễ dàng.
![](https://images.viblo.asia/5ba62292-2b1b-4675-a74f-820d0ff42167.png)

Như mình đã nói ở trên, vì là base trên eclipse nên IDE này cũng khá quen thuộc với mọi người, việc tiếp cận với nó do đó cũng dễ dàng hơn rất nhiều.

### Native UI Builder 

Chức năng này được sử dụng cho việc phát triển các ứng dụng native, cho phép xây dựng giao diện của ứng dụng theo cách WYSIWYG - what you see is what you get, rất trực quan.

![](https://images.viblo.asia/7187fe7d-d1b6-4509-b955-fa7cb462b1fa.png)


 ### Emulator

Đây là một phần không thể thiếu trong Tizen Studio, việc giả lập các máy ảo rất cần thiết trong quá trình xây dựng ứng dụng, trong điều kiện chúng ta không có, hoặc không có đủ các thiết bị thật. 

![](https://images.viblo.asia/333d8eb8-57fb-444d-b425-97ad1f862c8f.png)

![](https://images.viblo.asia/84c3eac1-a799-449c-b7bd-6be771e06b86.png)


### Profiling tool

Đây là một công cụ cho phép tối ưu hóa ứng dụng, tương tụ như chức năng profile của Android Studio, bằng cách sử dụng Dynamic Analyzer, các trạng thái của thiết bị, như việc trạng thái sử dụng bộ vi xử lí, bộ nhớ, hay cách sự kiện trên giao diện … sẽ được đo lường và phân tích, đây là những thông tin hữu ích để chúng ta có thể tối ưu hóa ứng dụng tizen của mình

![](https://images.viblo.asia/1c7d952d-08d5-4db9-be99-eedf7c6e19bc.png)

### Conclusion

Như các bạn đã thấy, tizen cũng đã rất quan tâm đến cộng đồng các nhà phát triển ứng dụng khi đã cung cấp một môi người phát triển khá đầy đủ và chất lượng. Hy vọng qua bài viết này, mọi người đã có một cái nhìn tốt hơn cho hệ điều hành mới mẻ này. 

Have fun !