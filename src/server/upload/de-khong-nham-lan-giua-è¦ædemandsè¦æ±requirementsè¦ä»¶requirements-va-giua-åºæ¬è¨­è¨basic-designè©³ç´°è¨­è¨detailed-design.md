## Phân biệt các khái niệm đó để làm gì?

Nếu có lúc bạn đọc được quyển 「予定通り進まないプロジェクトの進め方/Cách để tiến hành một dự án không tiến triển theo kế hoạch」thì bạn sẽ thấy rằng thật dễ hiểu khi giải thích các khái niệm Demands, Requirements, Specification bằng ví dụ gọi món trong nhà hàng của thực khách.  Tôi rất muốn đào sâu hơn về vấn đề này vì ở giai đoạn đầu của phát triển hệ thống (bao gồm việc lên kế hoạch, viết detail design,...) có rất nhiều quy trình và tài liệu khiến chính bản thân tôi bối rối, vậy nên tôi muốn tìm hiểu và tóm tắt lại chúng.

Bài viết có mang yếu tố chủ quan của người viết nên mong các bạn hãy xem như đây là một tài liệu tham khảo thôi nhé.

## Tại sao các khái niệm đó lại dễ gây lúng túng

Phần lớn là do các lý do dưới đây:
 
  1. Nhiều từ ngữ giống nhau:
      - 要望/要求/要件: Mong muốn/Yêu cầu/Điều kiện
      - 設計/仕様: Thiết kế/Specification
      - 仕様書/定義書: Tài liệu đặc tả kỹ thuật/Định nghĩa yêu cầu
  2. Do các yếu tố văn hóa công ty nên tùy thuộc vào công ty, member, cấu trúc outsourcing mà cách gọi các giai đoạn và tài liệu sẽ có đôi chút khác nhau.
      - Tài liệu đặc tả kỹ thuật yêu cầu, Tài liệu định nghĩa yêu cầu, ...
      - Tài liệu đặc tả tính năng, Tài liệu định nghĩa tính năng,...
    
# Ví dụ về gọi món trong nhà hàng

Tiện đây thì ở trong quyển "予定通り進まないプロジェクトの進め方" có đề cập đến các khái niệm要望(Demands)/要求(Requirements)/要件(Requirements) tương ứng với các quá trình gọi món trong nhà hàng và tôi đã tổng hợp lại, ngoài ra, các khái niệm 基本設計(Basic design)/詳細設計(Detailed design) cũng được tôi thêm vào sau đó.



| 要望(Demands) |要求(Requirements)| 要件(Requirements) |
| -------- | -------- | -------- |
| Lí do đến nhà hàng: Muốn nhanh được lấp đầy cái bụng đói, Ăn uống vui vẻ| Sau khi trao đổi với phục vụ, yêu cầu đã được cụ thể hóa: Menu phải có cảm giác đầy đặn, Có cả món tráng miệng, Xem xét việc dị ứng với trứng    | Order: Cơm rang theo suất, Bỏ trứng với người bị dị ứng, Kem tươi theo suất     |



| 基本設計(Basic design) | 詳細設計(Detailed design) |
| -------- | -------- |
| Công thức (Nguyên liệu, Liều lượng), Trang trí   | Công thức (Cách chế biến, Công đoạn chế biến) , Loại dụng cụ chế biến    | 

## Ví dụ về tạo màn hình My home

Tình cờ, sau khi tham khảo bài viết "Dùng việc xây nhà để giải thích các khái niệm khi xây dựng hệ thống" trên [IPA](https://www.ipa.go.jp/sec/reports/20180327.html) thì tôi cũng có vị dụ về tạo màn hình My home như dưới đây.

| 要望(Demands) |要求(Requirements)| 要件(Requirements) |
| -------- | -------- | -------- |
| Lí do muốn có nhà: Vì muốn kết hôn, Vì muốn có con| Sau khi thảo luận với đơn vị tư vấn nhà ở, các yêu cầu cụ thể được đưa ra: Muốn có phòng khách rộng rãi để có cuộc sống vui vẻ ở nhà,  Muốn không gian dễ dàng thay đổi để phù hợp với sự trưởng thành của con cái    | Nội dung truyền đạt cho kiến trúc sư: Mục đích của từng phòng, Chiều cao trần nhà, Số lượng và loại cửa sổ, Thông số kỹ thuật nhà bếp,...    |



| 基本設計(Basic design) | 詳細設計(Detailed design) |
| -------- | -------- |
| Sơ đồ thiết kế, Cách bài trí, Vật liệu,...   | Phương pháp xây dựng,...    | 

## Sự khác nhau của 要望(Demands)、要求(Requirements)、要件(Requirements) 

Từ ví dụ trên và các tài liệu và trang web khác nhau, tôi đã tóm tắt các khái niệm 要望(Demands)、要求(Requirements)、要件(Requirements) và giữa 基本設計(Basic design)、詳細設計(Detailed design) như sau.

|| 要望(Demands) |要求(Requirements)| 要件(Requirements) |
| -------- | -------- | -------- |-------- |
| Nói một cách đơn giản| Muốn~   | Muốn~ (cụ thể hơn)    |Cần~ (nội dung nhờ nhà cung cấp)|
| Nội dung output| Ý tưởng, Nhu cầu của user, Nhu cầu Business, Marketing, Dự toán, Schedule   | Requirements đã có độ ưu tiên, To-Be đã so sánh với As-Is, Mục đích phát triển của requirements,  Requirements đã chỉnh sửa sau khi đi từ mục đích tới phương pháp, Requirements đã phản ảnh hợp đồng (dự toán, cost)   | Yêu cầu chức năng, Yêu cầu UI/UX, Yêu cầu phi chức năng|
| Điểm chú ý| Nói chung, dễ phát sinh các vấn đề dưới đây: Chỉ viết phương pháp, hoặc là không phân biệt giữa mục đích và phương pháp, phần lớn là ít kiến thức về phương pháp ở phía yêu cầu.  Có ít kiến thức trong lĩnh vực có thể bỏ sót các nội dung cần quan tâm liên quan đến các yêu cầu.  Dễ đưa vào các yêu cầu tạm thời chưa rõ độ ưu tiên.| Mục đích là để phòng ngừa các rủi ro bên trái. Phần lớn thành công của dự án được quyết định sau giai đoạn này.|Nói chung, đây là nội dung yêu cầu với vendor, vì là bước ngoặt để phân rõ trách nhiệm nên cần có sự đồng ý của vendor.|

| | 基本設計(Basic design) | 詳細設計(Detailed design) |
| -------- | -------- |-------- |
| Nói một cách đơn giản | Để thoả mãn yêu cầu thì cần phải làm ... với ... Quyết định phần sẽ cho người dùng có thể xem (Input/Output) -> Xem xét đến người triển khai, phương pháp, công cụ hợp lý| Để tạo được những thứ đã quyết định trong Detailed design thì cần tạo những thứ như..., vì vậy, cần sử dụng... Quyết định những thứ người dùng không thể nhìn thấy được, các phương pháp, công cụ. |
| Nội dung output | Spec system, Spec tính năng, Spec màn hình. ※Không phải "How", mà là "What", tuy là Thiết kế cơ bản nhưng nội dung không gọi là "thiết kế".| Thiết kế kiến trúc, Thiết kế API, Thiết kế graph|
| Điểm chú ý | Đây là nội dung yêu cầu đến người phát triển, vì vậy cần có sự nhất trí từ người phát triển| --|

## Bổ sung định nghĩa các thuật ngữ

*** Specifications và Thiết kế**
Có nhiều bài viết đã giải thích nhưng có một cách đơn giản hơn: Specifications là những thứ được định nghĩa bởi "What - tạo cái gì?", còn Thiết kế là những thứ được định nghĩa bởi "How - tạo thế nào?"

Bài viết gốc tại [đây.](https://qiita.com/imasaaki/items/69a1e58903b477e33c8e)