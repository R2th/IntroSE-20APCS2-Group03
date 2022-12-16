Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây: https://medium.com/swlh/swiftplantuml-aee34c5f84ea

Tôi thường xuyên làm việc với các dự án phần mềm được viết bằng Swift và tôi thường hay phải tạo sơ đồ dựa trên tiền đề của mã nguồn hiện có, cho mục đích tài liệu hoặc để giải thích các khái niệm thiết kế hệ thống.

UML như một ngôn ngữ mô hình hóa có mục đích chung, dễ hiểu và thể hiện thiết kế của một hệ thống theo một chuẩn chung. Các công cụ mô hình đồ họa, ví dụ: **Visio** hoặc **StarUML**, rất linh hoạt nhưng tôi thường thấy mình phải vật lộn để vẽ nhanh mối quan hệ các thành phần hoặc các khía cạnh bố cục khác.

Các công cụ mô hình hóa văn bản giúp tôi tạo và làm việc hiệu quả hơn với các sơ đồ phần mềm. Mọi chuyện bắt đầu khi tôi khám phá ra [sequisediagram.org](https://sequencediagram.org/) và việc tạo sơ đồ tuần tự dễ dàng như thế nào bằng cách kết hợp tập lệnh ký hiệu văn bản và vẽ bằng cách nhấp và kéo trong cùng một mô hình.

Sau đó, tôi phát hiện ra **[PlantUML](https://plantuml.com/)** là một công cụ mã nguồn mở để tạo nhiều loại biểu đồ UML khác nhau từ một ngôn ngữ văn bản thuần túy. Có một hệ sinh thái sôi động xung quanh PlantUML. [PlantText](https://www.planttext.com/), một công cụ trực tuyến được thiết kế tốt để tạo hình ảnh dựa trên tài liệu ngôn ngữ PlantUML.

Nhưng hãy quay lại với Swift và trường hợp sử dụng để tạo sơ đồ lớp từ mã nguồn Swift hiện có. Điều này có thể giải quyết như thế nào? Bằng cách phân tích cú pháp mã nguồn, hãy chuyển đổi nó thành một tập lệnh phù hợp với ngôn ngữ PlantUML và sau đó sử dụng một công cụ trực tuyến để tạo sơ đồ thực tế. Đã có nhiều dự án mã nguồn mở khác nhau để giải quyết quá trình này.

Nhưng những công cụ này yêu cầu người dùng cài đặt thủ công các phần phụ thuộc bổ sung (ví dụ: NodeJS, Graphviz hoặc Python). Một số dự án không còn được duy trì và bị giới hạn khi nói đến chức năng. Và không có công cụ nào trong số này được viết bằng Swift :(

Tôi muốn cung cấp một công cụ cho các nhà phát triển Swift được viết bằng Swift! Điều này hy vọng sẽ cho phép tôi và những người đóng góp tiềm năng thực hiện các cải tiến trong tương lai nhanh hơn và hiệu quả hơn.

Và vì vậy tôi bắt đầu làm việc trên **SwiftPlantUML**, một tiện ích có sẵn dưới dạng [Xcode Source Editor Extension](https://github.com/MarcoEidinger/SwiftPlantUML-Xcode-Extension).

![](https://images.viblo.asia/2b0ddc91-59f2-45ac-8364-c07a0574cca8.png)

Bạn có thể tạo sơ đồ từ các dòng mã đã chọn hoặc từ toàn bộ tệp được hiển thị trong Xcode. Sơ đồ lớp sau đó sẽ được mở trong trình duyệt của bạn.

![](https://images.viblo.asia/d4d8e927-2844-48cc-8647-828fcdc10041.gif)

Bạn cũng có thể sử dụng **SwiftPlantUML** như một công cụ dòng lệnh hoặc Swift Package. Điều này đặc biệt hữu ích khi sử dụng nhiều tệp nguồn làm cơ sở cho sơ đồ. Hoặc để áp dụng các tùy chỉnh trong quá trình tạo.

Để có đầy đủ chức năng và triển vọng về lộ trình sắp tới, vui lòng truy cập https://github.com/MarcoEidinger/SwiftPlantUML

Pull request, và các vấn đề và đề xuất được chào đón nồng nhiệt.