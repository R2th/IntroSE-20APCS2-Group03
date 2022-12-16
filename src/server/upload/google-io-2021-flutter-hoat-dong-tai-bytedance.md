![image.png](https://images.viblo.asia/2b9455ec-8e1d-4072-bd21-9e159e64160d.png)

Flutter, một công nghệ mà ByteDance đã sử dụng và có nhiều đóng góp trong vài năm nay, gần đây trở nên nổi bật trên sân khấu của Google I/O. Được phát triển và có open source bởi Google, framework đa nền tảng để phát triển front end UI, đã thu được hơn 120.000 sao trên GitHub.

![image.png](https://images.viblo.asia/7e3e3175-9dc1-4116-8e63-75f395f8bed2.png)

Ngày nay, có hơn 500 developer Flutter tại ByteDance và hơn 200 trong số đó đang rất tích cực phát triển với Flutter. Các lập trình viên sử dụng Flutter không chỉ cho các ứng dụng di động mà còn đang thử nghiệm nó trên web, desktop và các nền tảng nhúng (embedded platform).

Ngoài ra, những hoạt động cốt lõi của ByteDance xuyêt suốt doanh nghiệp này và đã có những đóng góp lớn cho dự án Flutter hàng chục pull request (PR).

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/spotlight-google-i-o-flutter-dang-hoat-dong-tai-bytedance/)

## ByteDance làm cách nào để Flutter trở nên phù hợp với họ?

Câu chuyện của Flutter tại ByteDance bắt đầu từ 2 năm trước.

Vào thời điểm đó, nhóm kỹ sư front end của ByteDance nhận thấy rằng nhiều nhóm trong công ty cần phát triển nhiều nền tảng, nhưng họ thiếu công cụ tăng hiệu quả, hiệu suất, phát triển đa nền tảng.

Khi Google open source cho Flutter, nhóm ByteDance phát hiện ra chỉ cần phát triển ứng dụng một lần để hỗ trợ các nền tảng như Android, iOS và web. Ngoài ra, vì Flutter có công cụ render riêng, họ có thể đạt được hiệu suất ổn định hơn trên các nền tảng.Với Flutter, các phiên bản Android, iOS và web của ứng dụng sẽ tự động đồng bộ hóa. Không cần thiết kế và lập trình UI riêng cho từng nền tảng, do đó, những công việc thừa thải được loại bỏ.

Để hỗ trợ phát triển kinh doanh hiệu quả hơn, nhóm ByteDance đã thực hiện các công việc cơ bản trên chính framework Flutter, chẳng hạn như tối ưu hóa hiệu suất, tạo framework ứng dụng, chứa và hỗ trợ thêm vào ứng dụng. Họ cũng cải thiện các công cụ hiệu suất (performance) Flutter bao gồm các cải tiến đối với Frames Per Second (FPS) trong biểu đồ Frame và biểu đồ sự kiện theo thời gian (timeline event). Cả hai biểu đồ này đều là một phần của Performance View in Flutter DevTools.

Khi sử dụng Flutter, nhóm ByteDance đã gặp phải một số thử thách. Ví dụ: Flutter phải được thêm vào package cài đặt ứng dụng để tăng dung lượng của ứng dụng mà user download. Ngoài ra, Flutter sử dụng ngôn ngữ lập trình Dart, có dung lượng lớn hơn so với code gốc, làm tăng thêm dung lượng cho package.

Nhóm ByteDance đã bắt đầu một kế hoạch để tối ưu hóa dung lượng package bằng cách nén phần dữ liệu iOS và loại bỏ thư viện Skia và các thư viện khác (chẳng hạn như BoringSSL, ICU, text rendering và libwebp). Họ đã phân tích code Flutter Dart so với code của iOS và nhận thấy rằng, để triển khai cùng một tính năng nghiệp vụ, mã Dart đã tạo ra nhiều mã lệnh máy (machine code instruction) hơn. Để thu hẹp khoảng cách, họ đã giảm đi các code này, loại bỏ các lệnh debugging, loại bỏ việc khởi tạo dư thừa của các store có null, loại bỏ các tiêu đề `RawInstruction` với chế độ bare instructions, `StackMap` được nén lại, loại bỏ `CodeSourceMap`, v.v.

![image.png](https://images.viblo.asia/96141656-7267-46e7-9a22-7683c21f9497.png)

Cụ thể, mỗi tối ưu hóa này đã giảm kích thước package từ 0,2 đến 4 MB và giảm đáng kể tổng kích thước package khi kết hợp. Nhóm ByteDance đã chia sẻ kinh nghiệm của họ với các kỹ sư của Google và nhiều cải tiến đã được đưa vào dự án open source Flutter vì lợi ích của cộng đồng lớn hơn.

Tuy nhiên, khi ByteDance phát hành ứng dụng Flutter đầu tiên của họ, các vấn đề mới đã phát sinh. User đã thắc mắc rằng: "Tại sao UI rất lộn xộn khi tôi scroll trong ứng dụng?"

Khi nhóm ByteDance xem xét vấn đề, họ đã thấy rằng khi `FlutterView` mở rộng `TextureView`, UI vui nhộn hơn so với khi mở rộng `SurfaceView`. Tuy nhiên, trong công cụ Timeline chính thức, thời gian UI thread và thời gian GPU thread cho mỗi frame được render là giống nhau, với việc `TextureView` thỉnh thoảng bị kéo lên trước một chút.

Các chỉ số mâu thuẫn với trải nghiệm người dùng thực, điều này khiến nhóm nghiên cứu khó hiểu.

Lúc đầu, nhóm đã sử dụng công cụ Timeline để khắc phục sự cố nhưng không có kết quả. Sau khi đào sâu vào source code của công cụ, họ đã phát hiện ra gốc rễ của vấn đề.

`SurfaceView` có hiệu suất tốt hơn `TextureView`. Vì `SurfaceView` có bề mặt riêng và rendering được thực hiện trong ngữ cảnh OpenGL của riêng nó, nó có thể tương tác với `SurfaceFlinger` một cách độc lập và tận dụng tối đa khả năng triple-buffering. Mặt khác, `TextureView` là một chế độ xem thông thường phụ thuộc vào bề mặt của cửa sổ chính (host window) của nó để render. Điều đó có nghĩa là quá trình render không được thực hiện ngay sau khi UI và GPU thread hoàn thành công việc của chúng, mà cần phải đợi main native thread và `renderThread` trước khi view có thể tương tác được với `SurfaceFlinger`. Đó là một tiến trình render dài hơn nhiều so với `SurfaceView`.

Những phát hiện này không chỉ giúp nhóm loại bỏ sự khó hiểu mà còn dẫn đến 10 PR được gửi cho dự án mã nguồn mở Flutter. Với công việc cơ bản này được thực hiện, Flutter cuối cùng đã trở thành framework phù hợp để phát triển ứng dụng đa nền tảng tại ByteDance. Chẳng bao lâu nữa, công việc của nhóm ByteDance với Flutter sẽ được cung cấp cho các lập trình viên bên ngoài bằng cách sử dụng khung phát triển di động của họ, veMARS, mang lại lợi ích cho toàn bộ cộng đồng lập trình viên.

## Từ thử nghiệm đến sử dụng trong thực tế, đây là cách ByteDance đưa Flutter vào sử dụng

Việc ByteDance đưa Flutter vào sử dụng thực tế không thuận lợi như mong đợi.

Lúc đầu, nhóm ByteDance đã chọn một sản phẩm trưởng thành và lên kế hoạch triển khai lại tính năng phát lại (playback) video của app với Flutter.

Tính năng này, ban đầu được viết bằng native code dành cho Android và iOS, không dễ để viết lại bằng Flutter. Sau 6 tháng, nhóm nghiên cứu đưa ra kết luận rằng rất khó để làm cho tất cả live data compatible (dữ liệu trực tiếp tương thích) và thử thách để cập nhật logic nghiệp vụ hiện có.

Nhóm đã quyết định rằng việc cập nhật các tính năng hiện có của một sản phẩm trưởng thành với framework mới sẽ không hiệu quả. Điểm mạnh của Flutter sẽ được phát huy tốt hơn trong một app hoàn toàn mới. Trưởng nhóm nói rằng, “Trong một sản phẩm trưởng thành, mọi thứ đã được build tốt với công nghệ native Android hoặc iOS. Không có nhiều lợi ích khi triển khai lại các tính năng với Flutter chỉ để thực hiện các cải tiến nhỏ. Nó cũng làm tăng kích thước package vì động cơ Flutter được bao gồm trong package. Tuy nhiên, trong các sản phẩm mới hoặc các tình huống mới, Flutter có thể tăng năng suất của chúng tôi lên rất nhiều ”.

Với cách suy nghĩ đổi mởi, nhóm nghiên cứu đã chuyển trọng tâm sang các lĩnh vực mới như giáo dục.

Một trong những ứng dụng giáo dục của họ ở Trung Quốc giúp học sinh học các nét ký tự Trung Quốc; nhóm nghiên cứu muốn thêm một tính năng theo dõi đột quỵ.

Để thực hiện nó, nhóm đã lấy cảm hứng từ một số dự án mã nguồn mở và quyết định sử dụng đường dẫn SVG để thể hiện các nét vẽ. Các đường dẫn sau đó sẽ được điều chỉnh và định vị để tạo các ký tự:

![image.png](https://images.viblo.asia/b5c0cd8a-1976-4591-a132-f8ec49c52b90.png)

Họ xác định khung (skeleton) của mỗi nét vẽ để hướng dẫn chuyển động của bút cọ ảo, do đó bút di chuyển giống như trong thư pháp:

![image.png](https://images.viblo.asia/137d4a2d-0544-4498-b36e-0f09b3ede594.png)

Dựa trên thứ tự xác định của các bộ khung, một vòng tròn có bán kính nhất định được vẽ dọc theo mỗi bộ khung và các đường tròn này kết hợp với nhau tạo thành nét vẽ. Sau đó, nhóm đã thêm các key frame để đảm bảo rằng tốc độ frame của animation đủ nhanh để tránh bị giật.

Đó là cách họ tạo ra hiệu ứng tracking mượt mà, như được hiển thị trong GIF sau:

![image.png](https://images.viblo.asia/53b1854c-0fb5-47ca-adfc-6ffe4632977c.png)

Tính năng này, được xây dựng bằng Flutter, với hơn 9.000 ký tự Trung Quốc, bao gồm hầu hết các ký tự thường được sử dụng. So với việc phát triển bằng native code, Flutter đã tiết kiệm thời gian và nguồn lực.

Ngày nay, nhiều ứng dụng của ByteDance sử dụng phương pháp phát triển hybrid, kết hợp thế mạnh của Flutter và các công nghệ khác, với các ứng dụng mới hơn nghiêng về Flutter thuần túy. Đối với các ứng dụng như Xigua Video, TikTok Volcano và Open Language, Flutter đã tăng năng suất của các nhóm lên khoảng 33%.

## ByteDancers nắm bắt công nghệ mới nhất

Ngay cả bây giờ, nhóm Flutter tại ByteDance vẫn tiếp tục khám phá các công nghệ mới nhất. Theo trưởng nhóm, “Trong nhóm chúng tôi có nhiều người đam mê công nghệ với tầm nhìn toàn cầu, sẽ tiếp tục khám phá sự phát triển công nghệ toàn cầu và thảo luận về việc triển khai công nghệ. Chúng tôi có kết nối và hợp tác chặt chẽ với nhiều công ty công nghệ. Ví dụ, chúng tôi có các cuộc họp đồng bộ hóa (sync) hàng quý với Google để trao đổi về tiến độ, suy nghĩ, nhu cầu và ý tưởng của cả hai bên. ”

Một ngày nọ, người duy trì dự án mã nguồn mở Dart trên GitHub đến gặp trưởng nhóm ByteDance với những nhận xét sau: "Một người nào đó trong nhóm của bạn đã gửi hơn một chục bài PR cho Dart và tất cả chúng đều rất tốt và được suy nghĩ thấu đáo."

Người bảo trì dự án mã nguồn mở Dart đã nói về Frank. Frank là một cộng tác viên mã nguồn mở đầy nhiệt huyết và vừa lấy bằng cử nhân 3 năm trước. Cuộc hành trình của anh ấy trong thế giới mã nguồn mở bắt đầu trong năm đầu của trường đại học, năm 2015. Một trong những dự án mà anh ấy tạo ra và có nguồn mở trên GitHub đã có hơn 700 sao. Frank nói: “Nó đã có hàng trăm lượt tải xuống mỗi năm và nhiều lập trình viên trò chơi sử dụng nó để tạo các bản demo.

Sau khi tốt nghiệp, Frank tham gia nhóm Flutter tại ByteDance và trở thành một trong những người đóng góp nguồn mở tích cực nhất, đóng góp một số PR cho Dart và Flutter. Frank nhớ rằng khi làm việc với các vấn đề về kích thước package, anh ấy đã chủ động theo dõi một vấn đề có liên quan trong dự án Dart GitHub và anh ấy nhận thấy rằng thành phần Specializer có thể sử dụng một số điều chỉnh thêm. Anh ấy đã tạo ra một patch với những cải tiến cho phần mềm trung gian của trình biên dịch Dart và đã được đưa vào dự án. Ban đầu, patch không được chấp nhận do số lượng lớn các khối code bị ảnh hưởng và một vài lo ngại nhỏ. Anh ấy đã sửa lỗi patch này bảy lần trước khi nó được chấp nhận và merge vào code base.

Có rất nhiều người đam mê mã nguồn mở khác như Frank trong nhóm Flutter tại ByteDance.

Nhóm ByteDance đã nói rằng:

“Thực sự có nhiều người trong ngành thích công nghệ đã trưởng thành, nhưng cần thời gian để công nghệ phát triển và sẽ luôn có những người thích đi đầu như chúng tôi.”

Điều này đặc biệt đúng với một thứ mới lạ như Flutter. Cần phải có một số người dám thực hiện những bước đầu tiên. Tại ByteDance, nhóm kỹ sư Flutter, cũng như các nhóm kỹ thuật mà họ hỗ trợ, luôn tích cực thử và nắm bắt các công nghệ mới. Điều này đã mang lại lợi ích cho ByteDance rất nhiều.

ByteDance luôn muốn có thể góp phần thúc đẩy sự phát triển của ngành công nghiệp, và Flutter có thể sẽ là một trong những thứ đó.

Bài viết này được dịch từ [đây](https://medium.com/flutter/google-i-o-spotlight-flutter-in-action-at-bytedance-c22f4b6dc9ef).