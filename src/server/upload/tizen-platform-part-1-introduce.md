Nói đến hệ điều hành cross-platform, chúng ta sẽ nghĩ ngay đến tên của những ông lớn như Android hay Apple với iOS, hầu hêt các thiết bị như smartPhone, smartTv, smartWatch ... trên thế giới hiện nay đều chạy trên các hện điều hành này, tuy nhiên, bên cạnh đó, một số đại gia khác trong ngành cũng đã ra đời những hệ điều hành cho riêng họ như LG với webOS hay Samsung với Tizen. Những hệ điều hành này ra đời sẽ góp phần tăng tính khốc liệt cho thị trường hiện nay, hiện vẫn đang được chi phối bởi hai kẻ khổng lồ là android vs iOS.

Serie này mình sẽ giới thiệu những thứ mình biết và đang tìm hiểu về hệ điều hành Tizen, làm sao để tạo ra một ứng dụng trên nền tảng này.

### Introduce.

Tizen là một hệ điều hành mã nguồn mở (base trên Linux) và tùy biến để đáp ứng nhu cầu của hệ sinh thái di động và các thiết bị có kết nối, bao gồm các nhà sản xuất thiết bị, nhà phát triển ứng dụng .. 

Hệ điều hành Tizen có thể được tích hợp trên nhiều loại thiết bị khác nhau (có khoảng 50 triệu thiết bị trên khắp thế giới ), hiện tại chúng ta có Tizen IVI dành cho hệ thống giải trí trên ô tô, Tizen Mobile cho thiết bị di động, Tizen TV và Tizen Wearable, ngoài ra Tizen còn được sử dụng cho máy ảnh, máy giặt, tủ lạnh .. với mục tiêu sử dụng cho IoT. 

![Tizen Mobile](https://images.viblo.asia/3eaece04-f8e9-476e-b6b8-4b75a8f9c42a.png)


![Tizen Wearable](https://images.viblo.asia/b392fd7e-4324-4890-b812-eeb89bc7bf99.png)


![Tizen TV](https://images.viblo.asia/c6860659-c787-4e8d-a56c-df4d85ea2771.png)

 ### Tizen Application Types

Nền tảng Tizen hỗ trợ 2 kiểu ứng dụng chính:
- **Native application**: ứng dụng xây dựng bằng ngôn ngữ C và có thể truy cập đến các chức năng ở cấp cao của thiết bị, như là camera, GPS, cảm biến hay có thể thay đổi những tùy chỉnh nâng cao.

Ứng dụng native sử dụng Native API, cung cấp tất cả khả năng  quản lí bộ nhớ, hiệu suất đi kèm với các ứng dụng được xây dựng cho Linux trong C, Native API cực kì hữu ích, bởi rất nhiều các api có khả năng sử dụng cao, ngoài ra nó còn cung cấp những giao diện để tương tác với những phần cứng có trong các thiết bị hiện đại ..

- **Web application**: bản chất là một trang web được lưu trữ ở trong thiết bị, được xây dựng bằng các ngôn ngữ web-native như HTML5, CSS, và Java Script. Một ứng dụng web sẽ sử dụng Tizen Web Framework để tương tác với các thành phần native.

Cũng như ứng dụng native, ứng dụng web cũng sẽ sử dụng một hệ thống api, gọi là web API, là một cấu trúc dự án ứng dụng web tiêu chuẩn, với những thành phần cơ bản. Web API được thiết kế để cho phép dễ dàng xây dựng một ứng dụng sử dụng những ngôn ngữ web-native.

Một ứng dụng được xây dụng bởi Web API cũng khá tương tự với một trang web tiêu chuẩn. Chúng ta cũng có một trang index.html, chia thư mục theo resource, như JavaScript, CSS, ảnh, âm thanh .. Cách tiếp cận này rất thuận lợi cho những developer vốn đã có base web, có thể sử dụng những ngôn ngữ cấp cao để tạo ra những ứng dụng đơn giản một cách nhanh chóng và dễ dàng.

- **Tizen .NET application:** đây là một cách mới để tạo ra một ứng dụng tizen, với tizen .NET, chúng ta có thể sử dụng ngôn ngữ C#, những tiêu chuẩn Common Language Infrastructure, managed runtime để phát triển ứng dụng nhanh, hiệu quả và thực thi mã an toàn.

### Tizen Architecture

Tizen được phát triển dựa trên Linux, nên phần nhân của tizen vẫn là Linux Kernel.

![Tizen Architecture](https://images.viblo.asia/117bd426-e720-487e-b940-cb042ec7b476.png)

So với android, tizen có ít layer hơn, có 3 layer chính trong kiến trúc của hệ điều hành này:

#### Nhân kernel

Phần nhân của hệ điều hành bao gồm Linux Kernel và Device Drivers, đáp ứng các hoạt động của user, là cầu nối giữa phần cứng và phần mềm, vì cả android và tizen đều sử dụng nhân kernel nên phần này cả hai hệ điều hành đều có vẻ tương tự nhau.

#### Tizen Core Services

Đây là phần quan trọng nhất của tizen, nó cung cấp các api để developer có thể sử dụng để xây dựng ứng dụng.

#### Application

Application Framework cho phép quản lý ứng dụng, thông báo tới ứng dụng các sự kiện thông thường như pin yếu, thiếu bộ nhớ, thay đổi screen orientation. 

### Conclusion

Phát hành lần đầu vào ngày 5 tháng 1 năm 2012, đến này tizen vẫn là một hệ điều hành non trẻ, chủ yếu chỉ được sử dụng trên các thiết bị của samsung, tuy nhiên, với sự phát triển của mình, hy vọng trong tương lai, tizen có thể đủ thực lực để cạnh tranh trực tiếp với android hay ios.

Bài viết này của mình đã giới thiệu khái quát về hệ điều hành tizen, phân loại cũng như kiến trúc của nó, ở bài viết sau, mình sẽ giới thiệu cách xây dựng môi trường để có thể tạo ra một ứng dụng tizen đầu tiên. 

Have fun !