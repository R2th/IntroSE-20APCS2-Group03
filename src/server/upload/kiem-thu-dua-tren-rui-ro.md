## Kiểm thử dựa trên rủi ro là gì?

Kiểm thử dựa trên rủi ro là việc ưu tiên các tính năng, mô-đun và các chức năng của Ứng dụng thử nghiệm (Application Under Test) dựa trên những tác động và khả năng xảy ra lỗi. Nó liên quan đến việc đánh giá rủi ro dựa trên độ phức tạp, mức độ quan trọng của nghiệp vụ, tần suất sử dụng, khu vực hiển thị, khu vực dễ bị tổn thương (dễ bị tấn công, sinh ra lỗi) ...
Rủi ro là sự xuất hiện của một sự kiện không chắc chắn, tác động tiêu cực ảnh hưởng đến các tiêu chí thành công có thể đo lường được của một dự án. Nó có thể là sự kiện đã từng xảy ra trong quá khứ, hiện tại hoặc có thể xảy ra trong tương lai. Những sự kiện không chắc chắn này có thể ảnh hưởng đến các mục tiêu chi phí, nghiệp vụ, kỹ thuật và chất lượng của một dự án. Rủi ro có thể là rủi ro tích cực hoặc tiêu cực.
* **Rủi ro tích cực** : mang đến các cơ hội giúp kinh doanh bền vững. Ví dụ như đầu tư vào 1 dự án mới, thay đổi quy trình nghiệp vụ, phát triển sản phẩm mới ...
* **Rủi ro tiêu cực :** là các mối đe dọa, được khuyến nghị để giảm thiểu hoặc loại bỏ chúng để đảm bảo cho sự thành công của dự án.

## Khi nào thì thực hiện kiểm thử dựa trên rủi ro?

Nên thực hiện kiểm thử dựa trên rủi ro trong các trường hợp sau:
* Các dự án có ràng buộc (giới hạn) về thời gian, tài nguyên, ngân sách ...
* Các dự án có thể sử dụng phân tích rủi ro để phát hiện các lỗ hổng để tấn công SQL injection.
* Kiểm thử bảo mật trong môi trường điện toán đám mây.
* Các dự án mới có các yếu tố rủi ro cao như : thiếu kinh nghiệm với các công nghệ được sử dụng, thiếu kiến thức nghiệp vụ ...
* Các mô hình gia tăng và lặp lại ...

## Quy trình quản lý rủi ro

### 1. Nhận định (xác định) rủi ro

Có thể xác định rủi ro thông qua : những cuộc thảo luận về rủi ro, checklist, kỹ thuật brainstorming, phỏng vấn, kỹ thuật Delphi, sơ đồ nguyên nhân và tác động, các bài học rút ra từ những dự án trước, phân tích nguyên nhân gốc rễ, liên hệ với các chuyên gia về domain và chuyên gia giải quyết vấn đề của đối tượng cụ thể.

**Risk Register :** là một trang tính chứa danh sách : các rủi ro đã được xác định, các response tiềm ẩn (potential response), các nguyên nhân gốc rễ. Nó được sử dụng để theo dõi các rủi ro (cả các mối đe dọa và cơ hội) trong suốt vòng đời của dự án. Các chiến lược đáp ứng rủi ro có thể được sử dụng để quản lý rủi ro tích cực và tiêu cực.
Cấu trúc phân tích rủi ro (Risk Breakdown structure) đóng một vai trò quan trọng trong việc lập kế hoạch rủi ro. Nó giúp xác định các khu vực dễ bị rủi ro, giúp đánh giá hiệu quả và giám sát rủi ro trong quá trình thực hiện dự án. Nó giúp cung cấp đủ thời gian và nguồn lực cho các hoạt động quản lý rủi ro. Nó cũng giúp phân loại nhiều nguồn nơi mà từ đó các rủi ro của dự án có thể phát sinh.

**Ví dụ về 1 Risk Breakdown structure:**

![](https://images.viblo.asia/0c9f7940-d642-445e-a51b-68a1a27cfda4.png)

### 2. Phân tích rủi ro (bao gồm phần tích định lượng và phân tích định tính)

Khi danh sách các rủi ro tiềm ẩn đã được xác định, bước tiếp theo là phân tích chúng và lọc các rủi ro dựa trên ý nghĩa. Một trong những kỹ thuật phân tích rủi ro định tính là sử dụng Ma trận rủi ro (Risk Matrix, sẽ được đề cập trong phần tiếp theo). Kỹ thuật này được sử dụng để xác định xác suất và tác động của rủi ro.

### 3. Lập kế hoạch ứng phó rủi ro

Dựa trên các phân tích, chúng ta có thể quyết định xem các rủi ro này có cần phải ứng phó hay không. Ví dụ, một số rủi ro sẽ yêu cầu phải có kế hoạch ứng phó cụ thể trong bản kế hoạch dự án, trong khi một số khác yêu cầu một kế hoạch ứng phó trong giám sát dự án, và một số sẽ không yêu cầu bất kỳ sự ứng phó nào cả.
Chủ thể của rủi ro chịu trách nhiệm xác định các tùy chọn để giảm xác suất và tác động của các rủi ro được giao.

**Risk mitigation (Giảm thiểu rủi ro)** là một phương pháp ứng phó rủi ro được sử dụng để giảm thiểu các tác động bất lợi của các mối đe dọa có thể xảy ra. Điều này có thể được thực hiện bằng cách loại bỏ các rủi ro hoặc giảm chúng xuống mức chấp nhận được.

![](https://images.viblo.asia/9acbb220-3335-447a-8d87-b17e04daaa76.png)

**Dự phòng rủi ro (Risk Contingency)**
Dự phòng có thể được mô tả như là một khả năng của một sự kiện không chắc chắn, nhưng tác động là không rõ hoặc không thể đoán trước. Nó xác định những bước thực hiện khi một sự kiện không thể đoán trước xảy ra.

### 4. Theo dõi và kiểm soát rủi ro

Quy trình kiểm soát và giám sát rủi ro được sử dụng để theo dõi các rủi ro đã xác định, giám sát các rủi ro còn lại, xác định rủi ro mới, cập nhật đăng ký rủi ro, phân tích lý do thay đổi, thực hiện kế hoạch ứng phó rủi ro và trình kích hoạt giám sát rủi ro.
Điều này có thể đạt được bằng cách đánh giá rủi ro, kiểm tra rủi ro, phương sai và phân tích xu hướng, đo lường hiệu suất kỹ thuật, các cuộc họp cập nhật trạng thái và các cuộc họp tổng kết nhìn lại (retrospective).

![](https://images.viblo.asia/9496a4e5-4ea4-41b4-b01f-10359ba82da2.png)

Chúng ta cần nhớ rằng rủi ro tăng lên với những thay đổi về công nghệ, quy mô của dự án, thời gian của dự án (khung thời gian dự án), số lượng nhà đầu tư, dự toán, effort và tình trạng thiếu kỹ năng thích hợp.

## Phương pháp kiểm thử dựa trên rủi ro

1. Phân tích yêu cầu.
2. Review tài liệu (SRS, FRS, Usecases). Hoạt động này được thực hiện để tìm và loại bỏ lỗi và các điểm còn mơ hồ.
3. Khóa phase lấy yêu cầu (requirements sign-off's) là một trong những kỹ thuật giảm rủi ro để tránh việc đưa các thay đổi muộn vào các dự án. Bất kỳ thay đổi nào đối với các yêu cầu sau khi tài liệu đã được baseline sẽ liên quan đến quá trình kiểm soát thay đổi và phê duyệt tiếp theo sau.
4. Tính toán khả năng và tác động có thể có của mỗi yêu cầu đối với dự án trên các tiêu chí như chi phí, tiến độ, tài nguyên, phạm vi, đảm bảo hiệu suất kỹ thuật, độ tin cậy, độ phức tạp ...
5. Xác định xác suất thất bại và các khu vực có nguy cơ cao. Điều này có thể được thực hiện bằng cách sử dụng ma trận đánh giá rủi ro.
6. Sử dụng thanh ghi rủi ro (Risk Register) để liệt kê tập hợp các rủi ro được xác định. Cập nhật, theo dõi và giám sát các rủi ro định kỳ theo các khoảng thời gian đều đặn.
7. Việc lập hồ sơ rủi ro cần phải được thực hiện ở giai đoạn này để hiểu được khả năng rủi ro và mức độ chấp nhận rủi ro.
8. Ưu tiên các yêu cầu dựa trên xếp hạng.
9. Xác định quy trình Kiểm thử dựa trên rủi ro.
10. Xem xét các nguy cơ cao và trung bình để lập kế hoạch giảm thiểu, thực thi, giám sát tiến độ. Rủi ro thấp có thể được xem xét trên danh sách theo dõi.
11. Đánh giá chất lượng dữ liệu rủi ro để phân tích chất lượng của dữ liệu.
12. Lập kế hoạch và xác định thử nghiệm theo xếp hạng.
13. Áp dụng phương pháp kiểm thử thích hợp và các kỹ thuật thiết kế kiểm thử để thiết kế các trường hợp thử nghiệm sao cho các mục rủi ro cao nhất được kiểm tra trước. Các mục có nguy cơ cao nên được kiểm tra bởi người có kinh nghiệm và kiến thức tốt về domain.
14. Có thể sử dụng nhiều kỹ thuật thiết kế kiểm thử khác nhau, ví dụ: sử dụng kỹ thuật bảng quyết định cho các mục kiểm tra có nguy cơ cao và sử dụng phân vùng tương đương cho các mục thử nghiệm có nguy cơ thấp.
15. Các trường hợp kiểm thử cũng được thiết kế để cover được nhiều chức năng.
16. Chuẩn bị dữ liệu kiểm thử,  các điều kiện và môi trường kiểm thử.
17. Review : kế hoạch kiểm thử (Test Plan), chiến lược kiểm thử, Test cases, báo cáo thử nghiệm (Test Report) hoặc bất kỳ tài liệu nào khác được tạo bởi nhóm kiểm thử.
18. Đánh giá ngang hàng là một bước quan trọng trong việc xác định khuyết tật và giảm thiểu rủi ro.
19. Thực hiện chạy khô (dry run) và kiểm tra chất lượng trên kết quả
20. Các trường hợp kiểm thử được thực hiện theo mức độ ưu tiên của mục rủi ro.
21. Duy trì truy xuất nguồn gốc giữa các mục rủi ro, các thử nghiệm bao gồm chúng, kết quả của các thử nghiệm đó và các khuyết tật được tìm thấy trong quá trình thử nghiệm. Tất cả các chiến lược thử nghiệm được thực hiện đúng cách sẽ làm giảm rủi ro về chất lượng.
22. Thử nghiệm dựa trên rủi ro có thể được sử dụng ở mọi cấp độ kiểm thử, ví dụ: Kiểm thử thành phần, Kiểm thử tích hợp, Kiểm thử hệ thống và Kiểm thử chấp nhận
23. Ở cấp độ hệ thống, chúng ta cần tập trung vào những gì quan trọng nhất trong ứng dụng. Điều này có thể được xác định bằng cách nhìn vào tính hiển thị của các chức năng, tần số sử dụng và chi phí có thể phát sinh của lỗi (failure).
24. Tất cả các khu vực có nguy cơ cao cần được kiểm tra đầy đủ, từ đó chỉ còn một số rủi ro còn lại.
25. Phân tích kết quả kiểm thử và báo cáo kết quả dựa trên rủi ro.
26. Đánh giá lại các sự kiện rủi ro hiện tại và các sự kiện rủi ro mới dựa trên các chỉ số rủi ro chính.
27. Cập nhật thanh ghi rủi ro (Risk Register).
28. Kế hoạch dự phòng - Kế hoạch này hoạt động như kế hoạch dự phòng / kế hoạch khẩn cấp cho rủi ro phơi nhiễm cao.
29. Phân tích lỗi và ngăn ngừa lỗi để loại bỏ các khuyết tật.
30. Sử dụng kỹ thuật kiểm thử lại và kiểm thử hồi quy để xác thực các sửa lỗi dựa trên phân tích rủi ro được tính toán trước và các khu vực có nguy cơ cao để cover nhiều nhất để tránh các bug phát sinh thêm ở các khu vực liên quan.
31. Kiểm thử tự động dựa trên rủi ro (nếu khả thi)
32. Tính toán rủi ro còn lại
33. Theo dõi và kiểm soát rủi ro
34. Tiêu chí thoát hoặc tiêu chí hoàn thành có thể được sử dụng cho các mức độ rủi ro khác nhau. Tất cả các rủi ro chính đã được giải quyết với các hành động thích hợp hoặc các kế hoạch dự phòng. Rủi ro phơi nhiễm ở mức ngang hàng hoặc thấp hơn mức đã được chấp thuận là chấp nhận được đối với dự án.
35. Đánh giá lại hồ sơ rủi ro và phản hồi của khách hàng.

## Phương pháp kiểm thử dựa trên rủi ro để kiểm thử hệ thống

1. **Kiểm thử kỹ thuật của hệ thống** - Kiểm thử môi trường và kiểm thử tích hợp. Kiểm thử môi trường bao gồm kiểm thử trong các môi trường : phát triển (local), thử nghiệm (staging) và sản xuất (production).
2. **Kiểm thử chức năng của hệ thống** - Kiểm tra tất cả các chức năng, tính năng, chương trình, mô-đun. Mục đích của thử nghiệm này là để đánh giá liệu hệ thống có đáp ứng được các yêu cầu cụ thể của nó hay không.
3. **Kiểm thử phi chức năng của hệ thống** - Kiểm thử hiệu năng, kiểm thử tải, kiểm thử căng thẳng (stress test), kiểm tra cấu hình, kiểm thử bảo mật, các thủ tục sao lưu và khôi phục, tài liệu (tài liệu hệ thống, tài liệu vận hành và cài đặt).

Sơ đồ dưới đây cung cấp một cái nhìn tổng quan rõ ràng về quy trình nêu trên:

![](https://images.viblo.asia/5b506ccc-2316-47b8-8153-0c38f8b6973b.png)

Kiểm thử hệ thống bao gồm cả kiểm thử chức năng và kiểm thử phi chức năng.
Kiểm thử chức năng đảm bảo rằng sản phẩm / ứng dụng đáp ứng các yêu cầu của khách hàng và nghiệp vụ. Mặt khác, kiểm thử phi chức năng được thực hiện để xác minh xem sản phẩm có tuân theo mong đợi của khách hàng về chất lượng, khả năng sử dụng, độ tin cậy, hiệu suất, khả năng tương thích, ... hay không.

## Quy trình kiểm thử dựa trên rủi ro

Quy trình kiểm thử dựa trên rủi ro bao gồm các bước sau:
1. Risk Identification (Xác định rủi ro)
2.  Risk Analysis (Phân tích rủi ro)
3. Risk Response (Ứng phó rủi ro)
4. Test Scoping (Xác định phạm vi kiểm thử)
5. Test Process definition (Xác định quy trình kiểm thử)

![](https://images.viblo.asia/455c5603-f1b2-4576-a018-3025af1b93c8.png)

1. Trong quy trình này, các rủi ro được xác định và phân loại, một bản dự thảo rủi ro được chuẩn bị, phân loại (sắp xếp) rủi ro được thực hiện để xác định các rủi ro đáng kể.
2. Ứng phó rủi ro liên quan đến việc xây dựng các mục tiêu kiểm thử từ các rủi ro và lựa chọn các kỹ thuật thích hợp để chứng minh các hoạt động kiểm thử / kỹ thuật kiểm thử để đáp ứng các mục tiêu kiểm thử.
3. Tài liệu về các phụ thuộc, yêu cầu, chi phí, thời gian cần thiết để kiểm thử ... được xem xét để tính toán hiệu quả kiểm thử.
4. Xác định phạm vi kiểm thử là một hoạt động đánh giá đòi hỏi sự tham gia của tất cả các bên liên quan và nhân viên kỹ thuật. Điều quan trọng là phải tuân theo phạm vi rủi ro đã thỏa thuận. Những rủi ro này cần được giải quyết bằng cách kiểm tra, và tất cả các thành viên đồng ý với trách nhiệm được giao cho họ và phân bổ ngân sách cho các hoạt động này.
5. Sau khi phạm vi kiểm thử đã được xác định, các mục tiêu kiểm thử, các giả định, phụ thuộc cho từng giai đoạn kiểm thử phải được biên dịch theo định dạng chuẩn.

Ví dụ về 1 phạm vi của kiểm thử chức năng:

![](https://images.viblo.asia/33d047e6-789c-4ff0-bd26-8768e1ea1127.png)

Các thủ tục thiết kế và đánh trọng số ưu tiên rủi ro, sắp xếp trình tự kiểm tra, estimate ... các bạn có thể tham khảo thêm ở bài viết gốc.

## Ma trận đánh giá độ ưu tiên và rủi ro

Ma trận đánh giá rủi ro là ma trận xác suất tác động. Nó cung cấp cho nhóm dự án một cái nhìn nhanh về các rủi ro và độ ưu tiên mà mỗi rủi ro này cần được giải quyết.

> Risk rating = Probability x Severity

Xác suất là thước đo cơ hội cho một sự kiện không chắc chắn sẽ xảy ra. Nó được thể hiện theo tỷ lệ phần trăm.
Có thể phân loại theo các mức : Thường xuyên (A), Có thể xảy ra (B), Thỉnh thoảng (C), Remote (D), Không chắc có (E), Loại bỏ (F)
* Thường xuyên - Dự kiến xảy ra nhiều lần trong hầu hết các trường hợp (91 - 100%)
* Có thể xảy ra - Có khả năng xảy ra nhiều lần trong hầu hết các trường hợp (61 - 90%)
* Thỉnh thoảng - Đôi khi có thể xảy ra (41 - 60%)
* Remote - Không xảy ra / Đôi khi có thể xảy ra (11 - 40%)
* Không chắc có - Có thể xảy ra trong các trường hợp hiếm hoi và đặc biệt (0 -10%)
* Loại bỏ - Không thể xảy ra (0%)

Mức độ nghiêm trọng là mức độ thiệt hại hoặc tổn thất gây ra do sự kiện không chắc chắn. Được tính từ 1 đến 4 và có thể được phân loại là Catastrophic (thảm họa) = 1, Critical (nguy cơ) = 2, Marginal (biên) = 3, Negligible (không đủ điều kiện) = 4
* Catastrophic - Hậu quả khắc nghiệt làm cho dự án hoàn toàn không hiệu quả và thậm chí có thể dẫn đến việc chết dự án. Đây phải là ưu tiên hàng đầu trong quá trình quản lý rủi ro.
* Critical - Hậu quả nghiêm trọng có thể dẫn đến một lượng lớn tổn thất. Dự án bị đe dọa nghiêm trọng.
* Marginal - thiệt hại ngắn hạn vẫn có thể đảo ngược thông qua các hoạt động phục hồi.
* Negligible - Ít hoặc thiệt hại hoặc tổn thất tối thiểu. Điều này có thể được theo dõi và quản lý bởi các thủ tục thông thường.

Mức độ ưu tiên được phân thành bốn loại, được ánh xạ theo mức độ nghiêm trọng và xác suất rủi ro như được trình bày trong hình dưới đây:

![](https://images.viblo.asia/90ec0df6-1445-41da-96ad-cb469b3fcd1f.png)

**Serious** (Nghiêm trọng) : Những rủi ro thuộc loại này được đánh dấu bằng màu cam. Hoạt động này phải được dừng lại và phải hành động ngay để cô lập rủi ro. Các biện pháp kiểm soát hiệu quả phải được xác định và thực hiện. Hơn nữa, hoạt động không được tiến hành trừ khi rủi ro được giảm xuống mức thấp hoặc trung bình.

**High** (Cao) : Những rủi ro thuộc danh mục này được đánh dấu bằng màu đỏ, cần phải có hành động hoặc các chiến lược quản lý rủi ro. Phải hành động ngay lập tức để cô lập, loại bỏ, thay thế rủi ro và thực hiện các biện pháp kiểm soát rủi ro hiệu quả. Nếu những vấn đề này không thể được giải quyết ngay lập tức, các mốc thời gian nghiêm ngặt phải được xác định để giải quyết những vấn đề này (duedate).

**Medium** (Trung bình) : Những rủi ro thuộc danh mục này được đánh dấu bằng màu vàng. Các bước hợp lý và thực tế phải được thực hiện để giảm thiểu rủi ro.

**Low** (Thấp) : Những rủi ro thuộc danh mục này được đánh dấu bằng màu xanh lục, có thể được bỏ qua vì chúng thường không gây ra bất kỳ vấn đề nghiêm trọng nào. Đánh giá định kỳ là điều bắt buộc để đảm bảo các sự kiểm soát vẫn hiệu quả.

## Check list chung cho kiểm thử dựa trên rủi ro

* Các chức năng quan trọng trong dự án.
* Chức năng hiển thị của người dùng trong dự án
* Chức năng có tác động an toàn lớn nhất
* Các chức năng có tác động tài chính lớn nhất đối với người dùng
* Khu vực phức tạp của mã nguồn và mã dễ bị lỗi
* Các tính năng hoặc chức năng có thể được kiểm tra sớm trong chu kỳ phát triển.
* Các tính năng hoặc chức năng đã được thêm vào thiết kế sản phẩm ở phút cuối cùng.
* Các yếu tố quan trọng của các dự án tương tự trước đây / có liên quan gây ra vấn đề.
* Các yếu tố hoặc vấn đề chính của các dự án tương tự / liên quan có ảnh hưởng rất lớn đến chi phí hoạt động và bảo trì.
* Yêu cầu kém dẫn đến thiết kế và thử nghiệm kém có thể ảnh hưởng đến mục tiêu và chuyển giao của dự án.
* Trong trường hợp xấu nhất, một sản phẩm có thể quá khiếm khuyết đến mức không thể sửa lại và phải được loại bỏ hoàn toàn, điều này sẽ gây ra thiệt hại nghiêm trọng cho danh tiếng của công ty. Xác định phân loại vấn đề là rất quan trọng đối với mục tiêu sản phẩm.
* Các tình huống hoặc vấn đề có thể gây ra các khiếu nại dịch vụ khách hàng liên tục (lộ thông tin khách hàng ....).
* Kiểm thử đầu cuối có thể dễ dàng tập trung vào nhiều chức năng của hệ thống.
* Bộ kiểm thử tối ưu có thể giảm thiểu tối đa hóa mức độ rủi ro.
* Xác định những thử nghiệm nào sẽ có mức độ rủi ro cao nhất đối với tỷ lệ thời gian bắt buộc.

## Đánh giá rủi ro vốn có và các rủi ro còn lại

Xác định và phân tích rủi ro nên bao gồm 4 loại : rủi ro vốn có, rủi ro còn lại, rủi ro thứ cấp và rủi ro tái phát.

* Rủi ro vốn có: Các rủi ro đã được xác định / đã có trong hệ thống trước khi các kiểm soát và phản hồi được thực hiện.
* Rủi ro còn lại: Rủi ro còn sót lại sau khi kiểm soát và phản hồi đã được thực hiện.
* Rủi ro thứ cấp: Rủi ro mới phát sinh do việc thực hiện kế hoạch ứng phó rủi ro hiện tại.
* Rủi ro tái phát: Khả năng xảy ra rủi ro ban đầu.

Đo lường kết quả Kiểm thử dựa trên rủi ro giúp tổ chức biết mức độ chất lượng của rủi ro còn lại trong quá trình thực hiện kiểm thử và đưa ra các quyết định release đúng đắn.

### Lập hồ sơ rủi ro và phản hồi của khách hàng

Lập hồ sơ rủi ro là một quá trình để tìm ra mức độ rủi ro tối ưu cho khách hàng xem xét rủi ro cần thiết, khả năng rủi ro và khả năng chịu rủi ro.

* Rủi ro bắt buộc là mức độ rủi ro mà khách hàng phải đối mặt để thu được lợi tức khả quan
* Khả năng rủi ro là mức độ rủi ro chung có thể gặp phải
* Khả năng chịu rủi ro là mức độ rủi ro mà khách hàng muốn thực hiện (có thể ứng phó được)

## Lợi ích của Kiểm thử dựa trên rủi ro

* Cải thiện hiệu suất và giảm chi phí
* Cải thiện cơ hội thị trường (Thời gian ra thị trường) và Giao hàng đúng hạn.
* Cải thiện hiệu suất dịch vụ
* Cải thiện chất lượng vì tất cả các chức năng quan trọng của ứng dụng đều được kiểm tra.
* Cung cấp thông tin rõ ràng về phạm vi kiểm tra. Sử dụng phương pháp này, chúng ta biết những gì đã và chưa được kiểm thử.
* Là cách hiệu quả để giảm thiểu rủi ro còn lại khi phát hành.
* Đo lường kết quả thử nghiệm dựa trên phân tích rủi ro cho phép tổ chức xác định mức độ rủi ro, chất lượng rủi ro còn lại trong quá trình thực hiện kiểm thử và đưa ra quyết định phát hành thông minh.
* Tối ưu hóa việc kiểm thử với các phương pháp xác định rủi ro được đánh giá cao.
* Cải thiện sự hài lòng của khách hàng - Do có sự tham gia của khách hàng và báo cáo tốt và theo dõi tiến độ.
* Phát hiện sớm các khu vực có vấn đề tiềm ẩn từ đó đưa ra các biện pháp phòng ngừa hiệu quả để khắc phục những vấn đề này.
* Theo dõi và đánh giá rủi ro liên tục trong toàn bộ vòng đời của dự án giúp xác định và giải quyết các rủi ro và giải quyết các vấn đề có thể gây nguy hiểm cho việc đạt được các mục tiêu tổng thể của dự án.

## Lời kết
Bài viết trên còn sơ sài, nếu bạn quan tâm có thể tham khảo bài viết gốc : https://www.guru99.com/risk-based-testing.html
Hẹn gặp lại các bạn ở các bài viết tiếp theo.