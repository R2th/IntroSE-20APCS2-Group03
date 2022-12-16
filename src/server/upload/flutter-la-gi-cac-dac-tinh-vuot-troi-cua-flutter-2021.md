![image.png](https://images.viblo.asia/b9e1fc04-1f78-4de3-95a8-5785172e15b6.png)

## Flutter là gì?

> “Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.” – Google, flutter.dev

Tạm dịch: Flutter là bộ công cụ giao diện người dùng của Google để tạo các ứng dụng đẹp, được biên dịch native cho thiết bị di động, web và máy tính để bàn từ một mã nguồn duy nhất.

Flutter là một framework giao diện người dùng mã nguồn mở miễn phí được tạo bởi Google và được phát hành vào tháng 5 năm 2017. Nói một cách dễ hiểu, điều này cho phép bạn tạo một ứng dụng di động chỉ với một lần code. Có nghĩa là bạn có thể sử dụng một ngôn ngữ lập trình và một mã nguồn để tạo hai ứng dụng khác nhau (IOS và Android).

Không giống như các giải pháp phổ biến khác, Flutter không phải là một framework hoặc thư viện; đó là một SDK hoàn chỉnh – bộ công cụ phát triển phần mềm đa nền tảng.

Các bạn có thể theo dõi các bài viết khác về Flutter tại [đây](https://200lab.io/blog/flutter-la-gi/)

### Flutter đề cập đến hai thành phần quan trọng

SDK – Software Development Kit (Bộ công cụ phát triển phần mềm): Một tập hợp các công cụ sẽ giúp bạn phát triển các ứng dụng của mình. Nó bao gồm các công cụ để biên dịch mã nguồn của bạn thành các mã máy native (mã sử dụng cho IOS và Android).

Framework – UI Library Based on Widgets (Thư viện giao diện người dùng dựa trên widgets): Tập hợp các phần tử giao diện người dùng có thể tái sử dụng (Button, Text Inputs, Slider, v.v.) giúp bạn có thể cá nhân hóa ứng dụng bạn tạo theo nhu cầu cá nhân của mình.

Để phát triển với Flutter, bạn sẽ sử dụng một ngôn ngữ lập trình có tên là Dart. Đây cũng là ngôn ngữ của Google được tạo vào tháng 10 năm 2011 và đã được cải thiện rất nhiều trong những năm qua. Dart tập trung vào phát triển front-end; bạn có thể sử dụng nó để tạo các ứng dụng di động và web.

## Quá trình phát triển

![image.png](https://images.viblo.asia/830c3170-c382-460d-8e37-c5efb588b687.png)

Vào năm 2015, Google đã công bố Flutter, một SDK mới dựa trên ngôn ngữ Dart, làm nền tảng tiếp theo để phát triển Android và vào năm 2017, phiên bản alpha của nó (0.0.6) đã được phát hành cho công chúng lần đầu tiên.

Tại I/O 2017, Google đã trình diễn việc sử dụng Flutter và các khả năng đa nền tảng của nó, đồng thời tiếp tục quảng bá nó tại I/O 2018. Kể từ đó, Google đã đầu tư vào Flutter và khuyến nghị đây là cách mà mọi người nên phát triển ứng dụng di động.

Vào ngày 4 tháng 12 năm 2018, Flutter 1.0 đã được phát hành tại sự kiện Flutter Live và có sẵn để các nhà phát triển có thể bắt đầu sử dụng SDK để tạo ứng dụng dễ dàng hơn. Đây được đánh dấu là phiên bản “stable” đầu tiên.

Tại Google I/O 2019, việc hỗ trợ Flutter cho desktop và web platforms đã được công bố công khai, các công cụ để phát triển ứng dụng Flutter cho Windows, macOS, Linux và web đã được phát hành. Cùng với đó là sự ra đời của Flutter 1.12.

Tính đến ngày 30 tháng 4 năm 2021, 2.0.6 chính là phiên bản cập nhật mới nhất của Flutter.

## Đặc điểm

![image.png](https://images.viblo.asia/12b0aba2-c593-4d3f-bc17-e4addb8f834b.png)

Sự ra đời của Flutter đã phần nào giảm bớt những khó khăn thường gặp trong mobile là Fast Development và Native Performance. Trong khi React Native chỉ đảm bảo được Fast Development và Code Native thuần chỉ đảm bảo được Native Performance thì Flutter làm được cả 2 điều trên.

Hot Reload – JIT (Just-in-time)

![image.png](https://images.viblo.asia/6f7b079c-140d-4ff7-acce-2d960cb33a73.png)

Công cụ hot reload đã được khắc sâu vào kiến trúc của Flutter và không yêu cầu bất kỳ plugin nào hoạt động. Hot reload về cơ bản cho phép bạn xem các bản cập nhật trong thời gian thực.

Hãy tưởng tượng bạn đã gặp lỗi khi chạy một chương trình. Trong Flutter, bạn có thể sửa nó ngay lập tức, tiếp tục từ nơi bạn đã dừng lại mà không cần khởi động lại toàn bộ. Quay trở lại lập trình thông thường (native code), nơi việc chạy lại ứng dụng mất vài phút có thể là một cuộc đấu tranh gian khổ.

Hot reload nâng cao năng suất của lập trình viên, giúp họ tiết kiệm thời gian phát triển sản phẩm, kiểm thử mã nguồn (test) và tìm lỗi (debug) nhanh hơn đáng kể. Khi bạn đã quen thuộc với Hot Reload, đó là trải nghiệm rất khó từ bỏ.

AOT – Ahead-of-time Compiler

![image.png](https://images.viblo.asia/21fadcb6-a3e9-42dd-9fbc-f381fcb623b1.png)

Khi tiến hành biên dịch để đóng gói sản phẩm (archive), Dart sẽ sử dụng trình biên dịch AOT để có được file thực thi hiệu năng cao. Đây là một đặc tính cho phép DART vừa có khả năng hot load trong lúc phát triển (development) vừa có tính chất như một ngôn ngữ static typed.

Expressive and Flexible UI

![image.png](https://images.viblo.asia/69b6a46f-1322-4a9f-93b6-4e21cf062c93.png)

Đây là lý do thúc đẩy Flutter ra đời. Trước đó việc xây dựng các ứng dụng có UI đẹp, animation mượt mà rất phức tạp và gian nan với hầu hết các nhà phát triển ứng dụng di động.

Trong Flutter, giao diện người dùng được xây dựng với các widget, các khối xây dựng UI nhỏ được lắp ráp bằng một kỹ thuật gọi là Composition. Bản thân Flutter cũng có sẵn rất nhiều Widget dựng sẵn, các developer có thể tận dụng dễ dàng hơn thay vì phải xây dựng chúng từ đầu.

Toàn bộ quá trình này tương tự như sử dụng các thành phần React. Có sẵn hai bộ UI: Material Design (tương thích với các nguyên tắc thiết kế của Google) dành cho Android và Cupertino (tương thích với Apple’s Human Interface Guidelines) dành cho iOS. Các developer có thể dùng một trong hai hoặc phối hợp chúng lại với nhau.

Tools

![image.png](https://images.viblo.asia/01004cad-4b82-4d7f-b3df-b7213579515c.png)

Ứng dụng Flutter có thể được viết bằng bất kỳ trình soạn thảo mã nào, nhưng hai ứng dụng được ưu tiên là Android Studio và Visual Studio Code (VS Code). Mình lựa chọn VS Code vì nó nhẹ và nhanh. VS Code cũng có rất nhiều plugin cho Flutter, cho phép bạn làm việc hiệu quả hơn trong quá trình phát triển Flutter.

Các lệnh tích hợp trong Flutter (command line tools) cũng cho phép bạn chạy các ứng dụng Flutter trên nhiều thiết bị cùng một lúc. Đây là một tính năng cực kỳ tiện dụng, vì bạn có thể thấy ứng dụng của mình sẽ trông như thế nào và hoạt động như thế nào trên nền tảng iOS và Android, thậm chí cả nền tảng Web.

Viết code một lần duy nhất

![image.png](https://images.viblo.asia/20d6fc9b-fd3b-4570-b1fc-ae153de78908.png)

Flutter thực sự là một single-code base đa nền tảng. Điều này có nghĩa là bạn chỉ cần viết code một lần và nó sẽ hoạt động được trên iOS, Android và thậm chí cả web.

Khác với những nền tảng trước đó, như React Native, code Web và Mobile App dù có chung các khái niệm nhưng cơ bản là bạn cần thay đổi source code để đảm bảo chúng hoạt động tốt. Với Flutter bạn không còn phải làm điều này nữa, thực sự là source code được tái sử dụng với cả Web và Mobile.

Một quan niệm sai lầm lớn về việc phát triển trong Flutter là bạn phải nhắm mục tiêu giao diện cho iOS và Android riêng biệt. Vì điều này đánh mất lợi thế mạnh nhất của Flutter. Thay vào đó, bạn hãy thống nhất UI/UX trên cả 2 nền tảng iOS và Android, điều mà các nền tảng framework khác không thể làm được.

## Một số ứng dụng được build từ Flutter

![image.png](https://images.viblo.asia/3cb770f7-cc27-42eb-847c-d29205e05108.png)

Google Ads: Ứng dụng Google Ads giúp người dùng quản lý, tối ưu hóa và theo dõi tất cả các chiến dịch quảng cáo từ sự tiện lợi của thiết bị Android.

Grab: Flutter đã giúp Grab xây dựng ứng dụng merchant cho hoạt động kinh doanh giao đồ ăn đang phát triển nhanh chóng của mình.

BMW: Flutter cho phép BMW xây dựng ứng dụng My BMW cho iOS và Android từ một cơ sở mã duy nhất. Ứng dụng được BMW phát triển hoàn toàn in-house bằng cách sử dụng Flutter.

eBay: Ứng dụng eBay Motors là một công cụ quyền năng để duyệt, mua và bán xe trực tiếp từ điện thoại của người tiêu dùng.

Baidu: Baidu Tieba là nền tảng truyền thông lớn nhất của Trung Quốc được tổ chức bởi công ty công cụ tìm kiếm Baidu của Trung Quốc.

## Bạn muốn học Flutter?

Nếu bạn muốn học chuyên sâu về Flutter, trước tiên bạn phải hiểu rõ về lập trình Dart, Android Studio và các ngôn ngữ lập trình web như HTML, JavaScript và CSS. Flutter thật sự rất dễ học và dễ sử dụng. Bạn sẽ cảm thấy Flutter là một framework hiện đại khi bạn học nó. Bên cạnh đó, Flutter có nguồn tài liệu rất tốt và một cộng đồng đang phát triển rất mạnh mẽ. Bạn có thể tìm hiểu và trao đổi thêm các thông tin về Flutter thông qua các trang như: Flutter Awesome, Awesome Flutter, It’s all widgets! hoặc Flutter Community,…


## Kết

Trong thời kỳ phát triển mạnh mẽ của công nghệ, tốc độ, chính xác và tiện lợi là những yêu cầu tiên quyết. Mình nghĩ là Flutter có thể đáp ứng điều này khi mà hiện nay có rất nhiều ứng dụng tin tưởng lựa chọn Flutter để build và phát triển như Grab, .Và trong tương lai gần, mình tin Flutter sẽ tạo nên sự bùng nổ trong ngành công nghệ thông tin.