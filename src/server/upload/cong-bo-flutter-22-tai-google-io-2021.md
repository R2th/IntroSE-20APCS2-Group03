![image.png](https://images.viblo.asia/fad9d938-847b-49ab-85e2-2903fba28858.png)

Flutter 2.2 – Động lực thúc đẩy phát triển bộ công cụ giao diện người dùng đa nền tảng hàng đầu

Tại Google I/O, Flutter đã công bố Flutter 2.2, bản phát hành mới nhất của họ về toolkit mã nguồn mở để xây dựng các ứng dụng đẹp cho mọi thiết bị từ một nền tảng duy nhất. Flutter 2.2 là phiên bản tốt nhất của Flutter, với các bản cập nhật giúp các nhà phát triển kiếm tiền từ ứng dụng của họ dễ dàng hơn bao giờ hết thông qua mua hàng trong ứng dụng, thanh toán và quảng cáo; để kết nối với các dịch vụ đám mây và API mở rộng ứng dụng để hỗ trợ các khả năng mới; và với các tính năng công cụ và ngôn ngữ cho phép các nhà phát triển loại bỏ toàn bộ class of errors, tăng hiệu suất ứng dụng và giảm kích thước package.

https://200lab.io/blog/flutter-co-gi-moi-trong-flutter-2/

![](https://images.viblo.asia/feb75304-1db7-4aac-adc2-c0dfe72323f7.png)

## Phát triển app trên nền tảng của Flutter 2

Flutter 2.2 được xây dựng trên nền tảng của Flutter 2, đã mở rộng Flutter từ gốc mobile app của nó để kết hợp sử dụng web, desktop và embedded (hệ thống nhúng). Nó được thiết kế độc đáo cho giới ambient computing, nơi người dùng có nhiều loại thiết bị và kiểu dáng khác nhau và đang tìm kiếm trải nghiệm nhất quán trải dài trong cuộc sống hàng ngày của họ. Với Flutter 2.2, các doanh nghiệp, công ty khởi nghiệp và doanh nhân đều có thể xây dựng các giải pháp chất lượng cao để phát huy hết tiềm năng của thị trường, cho phép cảm hứng sáng tạo (thay vì nền tảng mục tiêu) là yếu tố hạn chế duy nhất.

> Flutter hiện là framework phổ biến nhất để phát triển đa nền tảng.

Một nghiên cứu gần đây dành cho nhà phát triển thiết bị di động nêu bật sự phát triển của Flutter. Dự báo số lượng nhà phát triển di động đến năm 2021 của công ty phân tích SlashData cho thấy Flutter hiện là framework phổ biến nhất để phát triển đa nền tảng, với 45% nhà phát triển lựa chọn nó, tương ứng với mức tăng trưởng 47% trong khoảng thời gian từ Q1 2020 đến Q1 2021. Dữ liệu riêng của chúng tôi xác nhận sự thay đổi này đối với Flutter; trong 30 ngày qua, hơn 1/8 ứng dụng mới trong Play Store được tạo bằng Flutter.

Tại I/O, đội ngũ Flutter đã chia sẻ rằng hiện đã có hơn 200.000 ứng dụng trong Play Store được xây dựng bằng Flutter. Các ứng dụng này đến từ các công ty như Tencent, có ứng dụng nhắn tin WeChat được hơn 1,2 tỷ người dùng trên iOS và Android sử dụng; ByteDance, người khởi xướng TikTok, người hiện đã xây dựng 70 ứng dụng riêng biệt bằng Flutter; và các ứng dụng khác từ các công ty bao gồm BMW, SHEIN, Grab và DiDi. Tất nhiên, Flutter không chỉ được sử dụng bởi các tập đoàn lớn. Một số ứng dụng sáng tạo nhất đến từ những cái tên mà bạn có thể chưa từng nghe đến: ví dụ, Wombo, ứng dụng chụp ảnh tự sướng đang “hot”; Fastic, ứng dụng quản lý bữa ăn gián đoạn và Kite, một ứng dụng giao dịch đầu tư tuyệt đẹp.

## Giới thiệu Flutter 2.2

Bản phát hành Flutter 2.2 tập trung vào các cải tiến đối với trải nghiệm phát triển để bạn có thể cung cấp các ứng dụng hiệu quả, đáng tin cậy hơn cho khách hàng của mình.

Sound null safety hiện là default cho các dự án mới. Null safety bổ sung bảo vệ chống lại các null reference ngoại lệ, cung cấp cho các nhà phát triển phương tiện để thể hiện các loại non-nullable trong code của họ. Và vì quá trình triển khai của Dart là hợp lý, trình biên dịch có thể loại bỏ các lần null check trong thời gian chạy, giúp tăng hiệu suất cho các ứng dụng của bạn. Hệ sinh thái đã phản hồi nhanh chóng, với khoảng 5.000 package đã được cập nhật để hỗ trợ null safety.

Có rất nhiều cải tiến về hiệu suất trong bản phát hành này: đối với ứng dụng web, chúng tôi cung cấp bộ nhớ đệm nền bằng cách sử dụng service worker; đối với các ứng dụng Android, Flutter hỗ trợ các deferred component; đối với iOS, đội ngũ Flutter đang làm việc trên công cụ để biên dịch trước các shader để loại bỏ hoặc giảm bớt jank trong lần chạy đầu tiên. Nó cũng đã thêm một số tính năng mới vào bộ DevTools giúp bạn hiểu cách phân bổ bộ nhớ trong ứng dụng của mình cũng như hỗ trợ cho các tiện ích mở rộng công cụ của bên thứ ba.

Ngoài ra, đội ngũ Flutter đang việc trên một số lĩnh vực quan trọng cần cải thiện, chẳng hạn như khả năng truy cập được cải thiện cho các web target.

Công việc của đội ngũ Flutter là mở rộng vượt ra khỏi giới hạn cốt lõi của Flutter. Họ cũng đã hợp tác với các nhóm Google khác để có thể tích hợp Flutter vào hệ thống developer stack rộng lớn hơn của họ. Đặc biệt, họ tiếp tục xây dựng các dịch vụ đáng tin cậy giúp các nhà phát triển kiếm tiền một cách hợp lý từ ứng dụng của họ. Ads SDK mới của Flutter được cập nhật trong bản phát hành này với tính năng null safety và hỗ trợ cho các banner thích hợp. Flutter 2.2 cũng đang giới thiệu một payment plugin mới hợp tác với nhóm Google Pay, cho phép bạn thanh toán cho hàng hóa thực trên cả iOS và Android. Và họ đã cập nhật plugin mua hàng trong ứng dụng, cùng với một codelab phù hợp.

Dart cũng nhận được một bản cập nhật trong bản phát hành này. Dart 2.13 mở rộng hỗ trợ cho khả năng tương tác gốc, với sự hỗ trợ cho các arrays và packed structs trong FFI. Nó cũng bao gồm sự hỗ trợ cho các type aliases, giúp tăng khả năng đọc và cung cấp một lộ trình nhẹ nhàng hơn cho các tình huống tái cấu trúc nhất định. Flutter tiếp tục bổ sung các tích hợp cho hệ sinh thái rộng lớn hơn, với Dart GitHub Action and a curated Docker Official Image được tuyển chọn tối ưu hóa cho việc triển khai logic nghiệp vụ trên điện toán đám mây (Cloud).

## Dự án của Google và hơn thế nữa

Mặc dù Google tiếp tục là nhà đóng góp chính cho dự án Flutter, nhưng đội ngũ Flutter vẫn rất vui khi thấy sự phát triển của hệ sinh thái rộng lớn hơn xung quanh Flutter.

![](https://images.viblo.asia/c608fc9f-10f4-4e80-aff3-ae46422597f6.png)

Một lĩnh vực cụ thể tăng trưởng đặc biệt trong những tháng gần đây là mở rộng Flutter sang nhiều nền tảng và hệ điều hành khác. Tại Flutter Engage, đội ngũ Flutter đã thông báo rằng Toyota đã và đang đưa Flutter vào hệ thống thông tin giải trí trên xe thế hệ tiếp theo của họ. Và vào tháng trước, Canonical đã xuất xưởng bản phát hành Ubuntu đầu tiên của họ với hỗ trợ tích hợp cho Flutter, tích hợp Snap và hỗ trợ cho Wayland.

Có thêm hai đối tác mới chứng minh hệ sinh thái ngày càng phát triển này. Samsung đang chuyển Flutter sang Tizen, với một kho lưu trữ open source mà những người khác cũng có thể đóng góp. Và Sony đang dẫn đầu nỗ lực cung cấp giải pháp cho embedded Linux.

Các nhà thiết kế cũng được hưởng lợi từ bản chất open source của dự án này, với thông báo từ Adobe về cập nhật XD to Flutter plugin. Adobe XD cung cấp cho các nhà thiết kế một cách tuyệt vời để thử nghiệm. Giờ đây với hỗ trợ Flutter nâng cao, các nhà thiết kế và nhà phát triển có thể cộng tác trên cùng một nội dung, đưa những ý tưởng tuyệt vời vào sản xuất nhanh hơn bao giờ hết.

Cuối cùng, Microsoft tiếp tục hợp tác với Flutter; bên cạnh công việc mà Surface team đã và đang làm để xây dựng trải nghiệm có thể gập lại với Flutter, chứng kiến hỗ trợ alpha của Flutter dành cho các ứng dụng UWP được xây dựng cho Windows 10. Nhiều ứng dụng giúp cho các tính năng thích ứng với nền tảng được tích hợp trong Flutter hơn để cung cấp trải nghiệm tuyệt vời trên thiết bị di động, desktop, web và hơn thế nữa.

## Xây dựng trải nghiệm tuyệt vời

Hơn bất cứ điều gì, Flutter để giúp các developer xây dựng những trải nghiệm tuyệt vời. Việc phát triển ứng dụng có thể tốt hơn, Flutter có thể trao quyền cho bạn bằng cách loại bỏ những trở ngại truyền thống để tiếp cận khách hàng của bạn.

Một ví dụ là một dự án của Cơ quan Cựu chiến binh Hoa Kỳ. Video dưới đây cho thấy ứng dụng Flutter của họ đang giúp họ phục hồi chức năng như thế nào cho những người lính bị rối loạn căng thẳng sau chấn thương.

https://www.youtube.com/watch?v=2S-KkvFuLWs

Với rất nhiều hội thảo, thuyết trình và các phiên họp theo yêu cầu về Flutter tại Google I/O, đội ngũ Flutter đã chia sẻ công việc của mình với tất cả các bạn. Và đừng quên xem ứng dụng web gian hàng ảnh vui nhộn của họ, được xây dựng bằng Flutter, cho phép bạn tạo ảnh tự sướng với linh vật Dash của Flutter và bạn bè của cô ấy!

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/cong-bo-flutter-2-2-tai-google-i-o-2021/)

![](https://images.viblo.asia/34b6f70f-4dbf-4096-b2bd-c3800dca794a.png)