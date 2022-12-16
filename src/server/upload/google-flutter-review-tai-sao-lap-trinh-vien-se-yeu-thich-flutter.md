​


 Tại sao các lập trình yêu thích Flutter? Đơn giản bởi vì Flutter thật tuyệt vời. Flutter phục vụ cả việc kinh doanh(chi phí thấp hơn hăn) lẫn phát triển ứng dụng (tốc độ phát triển nhanh, ổn định và khả năng mở rộng). Đó chính là lí do tại sao nhiều công ty lớn chuyển sang Flutter, đơn giản có thể kể đến như Alibaba, Google Ads, Reflectly, eBay, và nhiều công ty nữa, ...
Google đã hoàn thành tốt việc xây dựng Flutter, và họ tiếp tục phát triển framework này thậm chí tốt hơn.

Những đặc điểm của Flutter
Có thể bạn đã biết một chút về Flutter:

Flutter là mã nguồn mở
Công cụ đa nền tảng viết bằng hẳn một ngôn ngữ riêng Dart, có bộ công cụ hình ảnh riêng (Skia).
Hiện tại Flutter hỗ trợ chính thức: Android, iOS, web (beta), macOS(beta), Window(beta), Linux . Gần như tất cả các nền tảng phổ biến hiện nay
Khả năng tạo ra UI cực mãnh mẽ. Các phần tử UI được đội Material Design của Google hỗ trợ.
Flutter đặc biệt vì điều gì?
Flutter là sự tổng hợp của native-app với sự linh hoạt trong việc phát triển ứng dụng đa nền tảng

Flutter combines the quality of native apps with the flexibility of cross-platform development.

Trong thực tế, nhiều công cụ đa nền tảng khác cũng có thể viết cho cả iOS và Android, nhưng vẫn chưa thể tạo ra giao diện giống nhau trên cả hai nền tảng.

Nhưng Flutter thực sự làm điều gì: thay thì viết giựa trên các phần tử UI native của nền tảng (giống như React Native và Xamarin), Flutter vẽ giao diện "from scratch" ( không dựa vào UI native).

Flutter duy trì trải nghiệm "native" và cách cảm nhận ứng dụng, nên bạn không cần phải lo nghĩ về hiệu năng trên bất kỳ nền tảng nào.



Ngoài ra, Flutter là mã nguồn mở, bất kỳ nhà phát triển nào cũng có thể đóng góp vào sự phát triển của Flutter trên GitHub .Và hãy thử nhìn vào độ phổ biến của Flutter – 96.1K GitHub stars, 13.3k forks, and 19,625 commits – bạn đã hiểu tại sao các lập trình viên yêu mến Flutter đến vậy.

Flutter hoạt động ra sao?
Flutter không trực tiếp biên dịch ra ứng dụng iOS hay Android. Ứng dụng đã được biên dịch là sự tổng hợp của cơ chế phiên dịch ( xây dựng trên nền C ++ ) và Flutter (  xây dựng trên Dart ),tất cả các file đều được sinh ra bằng cách biên dịch như thế này, cho từng nền tảng lại có một cơ chế tạo ra app phù hợp với nền tảng đó.



Nó giống như phát triển trò chơi: một trò chơi không phân bổ khuôn khổ của nó và chức năng được thực hiện với công cụ trò chơi. Tương tự đối với phần mềm Flutter - tất cả các ứng dụng dựa trên Flutter SDK thay thế các phần của khung gốc bằng các phần tử Flutter.



Mặc dù nó có thể tác động đến kích thước của ứng dụng cuối, nhưng hiệu suất vẫn khá tốt - kết xuất được thực hiện với tốc độ lên tới 120 FPS.

Do trình biên dịch gốc cho bộ xử lý ARM, kết xuất đơn giản và một bộ công cụ và công cụ tích hợp, Flutter làm cho quá trình phát triển đơn giản hơn.

Thêm vào đó, nó cung cấp một vài tính năng rất ngon như hot-reload.

Đây là cách thức hoạt động của nó:

Khi bạn nhấp vào nút hot-reload, tất cả các thay đổi về mã được hiển thị trong các tiện ích, trình giả lập và giả lập ngay lập tức. Ứng dụng tiếp tục hoạt động từ nơi trước khi bạn hot-reload: cập nhật mã, nhưng việc thực thi vẫn tiếp tục.



Tại sao chọn Flutter cho các ứng dụng đa nền tảng?

Các phiên bản Flutter mới sẽ tiếp tục ra mắt với các tính năng cao cấp hơn lên tay áo của họ. Nhưng đã có rất nhiều tính năng nâng cao giải thích hoàn hảo tại sao Flutter lại được yêu thích đến vậy.

Đầu tiên, phát triển đa nền tảng với Flutter, trái với niềm tin phổ biến, không làm cho phần mềm trở nên tồi tệ hơn.

Flutter đi kèm với tất cả các widget gốc cho giao diện Android và iOS như Thiết kế Vật liệu và Cupertino. Ngoài ra, khung có thể thay đổi hành vi của các yếu tố riêng biệt để tạo UX tương tự cho người dùng ứng dụng.

Thứ hai, Flutter cho phép thực hiện biên dịch tệp rời rạc trong chế độ dev. Trình biên dịch JiT tăng tốc độ phát triển và gỡ lỗi phần mềm.

Thứ ba, Flutter cho phép một phụ trợ linh hoạt và có thể mở rộng.

Nó hỗ trợ các plugin như Firebase, SQLite, v.v. (pub.dev sẽ giúp bạn tìm ra plugin bạn yêu cầu). Firebase làm cho cơ sở hạ tầng của ứng dụng có thể mở rộng, không cần máy chủ và dự phòng.

Vì vậy, nếu bạn đang làm việc trên các ứng dụng yêu cầu cơ sở dữ liệu thời gian thực hoặc các chức năng đám mây, Flutter sẽ giúp bạn trở lại.

Và điều cuối cùng: Flutter rất dễ học.

Ngay từ đầu, các nhà phát triển của Google đã đặt mục tiêu hạ thấp rào cản gia nhập. Họ cẩn thận làm việc ra tài liệu và các nhà phát triển tài nguyên có thể sử dụng. Nó thậm chí có các phần đặc biệt mà bạn có thể sử dụng để bắt đầu học khung tùy thuộc vào chuyên môn của bạn:

Flutter cho các nhà phát triển Android
Flutter cho các nhà phát triển iOS
Flutter động cho React Native devs
Flutter động cho Xamarin.Forms devs
Flutter cho các nhà phát triển web
Do tài liệu chi tiết của Flutter, bạn sẽ tìm ra cách viết mã trong Dart ngay cả khi bạn chỉ có kinh nghiệm với các công cụ đồ họa Unity để tạo trò chơi Android.

Flutter 1.12 (Phiên bản mới nhất) và đặc quyền của nó

Hãy xem Flutter giới thiệu những tính năng hấp dẫn nào trong phiên bản 1.12 mới nhất của nó:

Chế độ tối iOS

Từ giờ trở đi, Flutter hỗ trợ giao diện iOS 13, bao gồm hỗ trợ chế độ tối hoàn toàn trong các tiện ích Cupertino. Và nó không chỉ là về việc hoán đổi nền nhưng điều chỉnh các màu còn lại để phù hợp.

Hỗ trợ bổ sung

Một cải tiến lớn khác là bản cập nhật Add-to-App, để tích hợp Flutter vào các ứng dụng iOS / Android hiện có.

Phiên bản mới của Flutter hỗ trợ thêm một phiên bản Flutter toàn màn hình vào ứng dụng, cùng với:

Tích hợp API ổn định trong Java, Kotlin, Objective-C và Swift
Hỗ trợ sử dụng plugin trong các mô-đun Flutter
Các cơ chế tích hợp bổ sung thông qua các khung Android AAR và iOS


Hỗ trợ web Beta

Các kênh Flutter master, dev và beta mới cung cấp hỗ trợ cải tiến cho web. Bạn muốn một số ví dụ?

Ở đây, Riv Rivet, một dự án giáo dục đã sử dụng Flutter và Firebase để tạo ra một phiên bản web của ứng dụng của họ.



Dart 2.7

Phiên bản mới của Dart 2.7.
Bản cập nhật này nâng cao trải nghiệm hoạt động với Dart 2.5 trong cách các chuỗi an toàn xử lý các khả năng và quy trình mở rộng. Điều này giúp các nhà phát triển ngăn ngừa lỗi khi các biến có giá trị bằng 0 và phân tích số nguyên trong một chuỗi.

Và đây là một số tính năng khác của phiên bản Flutter mới nhất:

hỗ trợ máy tính để bàn macOS (alpha)
gỡ lỗi đa thiết bị
thử nghiệm hình ảnh vàng
Cải tiến bản dựng Android
cập nhật DartPad
Flutter tốt, nhưng không phải không có vấn đề: Điều gì khiến các nhà phát triển chưa sử dụng Flutter?

Flutter rất tuyệt: dễ bắt đầu, đơn giản để làm việc và được trình bày bởi một công ty công nghệ lớn. Tuy nhiên, đây là những lý do tại sao Nhà phát triển cao cấp của bạn có thể không chia sẻ sự lạc quan của bạn.

Phổ biến (thấp) phổ biến

Không giống như Java / Kotlin cho Android hoặc Swift / Objective-C cho iOS, Dart chưa có mức độ phổ biến cao. Và nó rất khó xảy ra.

Dart không quá khó để học và có rất nhiều hướng dẫn (như bài này), nhưng một số nhà phát triển vẫn gắn bó với Java và các công cụ quen thuộc khác.

Đồng thời, bạn không thể sử dụng Flutter và không sử dụng Dart: ngay cả tính năng sát thủ của Flutter -hot-reload- sẽ không hoạt động nếu không có Dart.

Không hỗ trợ tất cả các thiết bị

Bạn không thể tạo ứng dụng cho các thiết bị iOS 32 bit như những thiết bị cũ hơn iPhone 5s. Tương tự cho máy tính để bàn Windows: bạn không thể chạy Flutter trên máy tính xách tay 32 bit của mình.

Và các nhà phát triển Flutter không có kế hoạch sửa chữa nó vì "điều này sẽ liên quan đến một khối lượng công việc rất đáng kể".

Vì vậy, nếu bạn muốn mã hóa bằng Flutter, bạn sẽ phải sở hữu một thiết bị x64 bit hoặc nâng cấp thiết bị bạn sử dụng ngay bây giờ.

Số lượng thư viện hạn chế

Mặc dù có nhiều lib Flutter như fl_chart (để vẽ đồ họa trong Flutter), path_provider (được sử dụng để định vị tệp trên Android / iOS), flutter_sliding_tutorial và nhiều hơn nữa, số lượng vẫn còn hạn chế.



Điều này không khó để giải thích: Flutter là một khung tương đối mới và các nhà phát triển đã không có đủ thời gian để phát triển nhiều lib như ngôn ngữ bản địa cung cấp.

Tuy nhiên, các thư viện quan trọng nhất đã có sẵn và những thư viện mới sẽ xuất hiện mọi lúc.

Các ứng dụng rung có kích thước lớn hơn

... so với các ứng dụng được phát triển riêng. Nhóm của Flutter đã đo kích thước ứng dụng tối thiểu (không có Thành phần Vật liệu, chỉ có một tiện ích Trung tâm duy nhất, được xây dựng với apk bản dựng rung --split-per-abi), được gói và nén, là 4,3 MB cho ARM và 4,6 MB cho ARM 64 .

Ứng dụng cơ bản bây giờ là ~ 4 MB trong Android và ~ 10 MB trong iOS.

Chuyên môn ít được chứng minh

Flutter có thể được các nhà phát triển yêu thích, nhưng các công ty lớn đã không vội vàng ngừng tạo các ứng dụng gốc (hoặc React Native) và chuyển sang Flutter.

Đối với hầu hết các công ty, vấn đề lớn nhất là tính mới của Flutter. Dart mới hơn Java hoặc C # và bản thân Flutter là hoàn toàn mới.

Tất nhiên, có nhiều ứng dụng nguồn mở Flutter, bao gồm cả những ứng dụng lớn như Google Ads hoặc Hamilton (kiểm tra danh sách đầy đủ ở đây), nhưng không quá nhiều.

Và không ai muốn trở thành người áp dụng một khuôn khổ hoàn toàn mới chỉ phải chuyển sang phát triển native một vài tháng sau đó.



Nhưng điều quan trọng hơn cả là Flutter là con đường bạn đi một mình:

chưa có nhiều best practice (ít nhất là tại các dự án quy mô lớn)
luôn luôn là một cơ hội bạn là người đầu tiên đối mặt với vấn đề đặc biệt này
ít hy vọng ai đó sẽ giúp bạn - bạn sẽ phải thực hiện từng bước một cách cẩn thận và sẵn sàng đối mặt với hậu quả
Sử dụng Flutter ở đâu

Trước hết, tốt hơn là sử dụng Flutter cho các công ty khởi nghiệp MVP khi bạn có giới hạn thời gian và thường có tiền để xác minh mô hình kinh doanh.

Một ứng dụng Flutter rẻ hơn *:

* so với chi phí của hai ứng dụng gốc
nhóm phát triển nhỏ hơn 40%
quy trình đơn giản
bạn có thể dành nhiều thời gian hơn để làm việc với các tính năng của ứng dụng.
Bằng cách chọn tham gia dự án Flutter, bạn sẽ giảm số giờ phát triển. Phát triển rung không mất nhiều thời gian so với bản địa.
Dưới đây là một ví dụ. Hãy nói rằng bạn đã tạo ra một ứng dụng giống như Instagram cho hai nền tảng. Phát triển iOS sẽ mất khoảng 700 giờ, Android - cũng là 700h.

Với Flutter, bạn sẽ bao quát cả hai nền tảng và tiết kiệm thời gian: 700h Android + 700h iOS so với 700h Flutter.

Bạn tiết kiệm hàng tấn thời gian bạn có thể dành cho việc khác, như đánh bóng các tính năng.

Kết thúc

Nếu bạn đang xây dựng các ứng dụng trong thời gian giới hạn với ngân sách hạn chế, Flutter chắc chắn đáng để thử.

Nó có vẻ tốt như vậy và với mỗi bản cập nhật mới, các nhà phát triển của Google bổ sung thêm nhiều công cụ để phát triển đa nền tảng.

Tất nhiên, khung này có vẻ không bình thường đối với những người yêu thích C # và Java, nhưng điều đó không có nghĩa là nó sẽ buộc bạn ra khỏi vùng thoải mái của bạn. Nắm vững các khác biệt cú pháp nhỏ, bạn sẽ sớm thấy rằng việc phát triển UI nhanh hơn vài lần so với phát triển bản địa.

Và nếu bạn thành công và nếu Flutter bám sát, nó có thể mang đến cho bạn một số trải nghiệm và cơ hội phát triển di động thú vị trong tương lai.

Học ở đâu:
Hãy cùng Techmaster bắt kịp ngay công nghệ cực hot này:

https://techmaster.vn/khoa-hoc/j86/lap-trinh-di-dong-flutter-cho-ios-android