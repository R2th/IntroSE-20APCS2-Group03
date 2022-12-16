Các bài viết trước:

1. [Ứng dụng AWS trong thực tế](https://viblo.asia/p/aws-amazon-web-services-la-gi-ung-dung-trong-thuc-te-4dbZNN98ZYM)
2. [Bạn có thể làm gì với AWS](https://viblo.asia/p/ban-co-the-lam-gi-voi-aws-aWj53bjpl6m)
3. [Lợi ích khi sử dụng AWS](https://viblo.asia/p/loi-ich-khi-su-dung-aws-LzD5dLWz5jY)

Hóa đơn từ AWS tương tự như hóa đơn tiền điện. Những dịch vụ được tính phí dựa trên việc sử dụng. Bạn trả tiền dựa trên thời gian máy ảo chạy, dung lượng lưu trữ, hoặc số lượng bộ cân bằng tải. Dịch vụ được lập hóa đơn hàng tháng. Giá cho mỗi dịch vụ luôn được công khai, nếu bạn muốn tính chi phí hàng tháng của một thiết lập đã định sẵn, bạn có thể sử dụng [AWS Simple Monthly Calculator](http://aws.amazon.com/calculator).

### Free Tier (cấp bậc miễn phí)
Bạn có thể sử dụng dịch vụ AWS miễn phí trong vòng 12 tháng kể từ ngày đăng kí. Ý tưởng đằng sau Free Tier là cho phép bạn thử nghiệm với AWS và có được một số trải nghiệm khi sử dụng dịch vụ đó. Đưới đây là những dịch vụ Free Tier cung cấp:

* 750 giờ (khoảng 1 tháng) cho một máy ảo nhỏ chạy trên Linux hoặc Windows. Điều này có nghĩa là 1 máy ảo chạy liên tục trong 1 tháng hoặc 750 máy ảo chạy trong 1 giờ.
* 750 giờ (khoảng 1 tháng) cho bộ cân bằng tải ứng dụng.
* Lưu trữ đối tượng (object store) 5GB.
* Cơ sở dữ liệu nhỏ với 20GB lưu trữ, bao gồm sao lưu.

Nếu bạn vượt quá giới hạn của Free Tier, bạn sẽ bắt đầu trả tiền cho các tài nguyên sử dụng mà không có thông báo gì. Bạn sẽ nhận hóa đơn vào cuối tháng. Trước khi sử dụng AWS bạn sẽ được hướng dẫn cách theo dõi chi phí.

Sau thời gian dùng thử 1 năm của bạn kết thúc, bạn trả tiền cho tất cả các tài nguyên bạn sử dụng. Nhưng một vài tài nguyên miễn phí vĩnh viễn. Ví dụ: 25 GB cơ sở dữ liệu NoSQL.

Bạn có thể tham khảo thêm về Free Tier tại [Free Tier](http://aws.amazon.com/free). Bạn sẽ được thông báo khi sử dụng những phần không hỗ trợ Free Tier, nên bạn đừng lo lắng về phần bị tính phí.

### Những khoảng phí mà bạn phải trả
Như đã đề cập, bạn có thể bị tính phí trong những trường hợp sau đây:

* Dựa theo số phút hoặc số giờ sử dụng: Máy ảo được tính phí theo phút. Bộ cân bằng tải được tính phí theo giờ
* Dựa trên lưu lượng truy cập: Lưu lượng truy cập được tính theo Gigabytes hoặc theo số lượng request (yêu cầu).
* Dựa trên việc sử dụng bộ nhớ: Mức sử dụng có thể được đo bằng sức chứa (ví dụ: bạn được cấp 50GB dung lượng và không quan tâm đến bạn sử dụng bao nhiêu trong số 50GB). Hoặc có thể tính theo dung lượng sử dụng thực tế (chẳng hạn như bạn sử dụng 2.3GB thì chỉ tính trên 2.3GB).

Chúng ta sẽ dựa trên ví dụ [Web shop](https://viblo.asia/p/ban-co-the-lam-gi-voi-aws-aWj53bjpl6m) bài trước và bổ sung phần tính phí như sau:

![Cách AWS tính phí](https://images.viblo.asia/310f432e-52ca-4eac-b018-bfb4c7c012ee.png)

Giả sử web shop bắt đầu chạy từ tháng 1, và bạn có chiến dịch tiếp thị để tăng doanh số bán hàng cho tháng tiếp theo. Thật là may mắn! Bạn có thể tăng doanh số lượng truy cập lên gấp 5 lần vào tháng 2. Như bạn đã biết, AWS tính phí dựa trên việc sử dụng.

![Bảng phí](https://images.viblo.asia/de5cdf8a-bc80-4e7f-a556-ee7b25d240d3.png)

Dựa theo bảng phí ta thấy: số lượng truy cập tăng từ 100.000 lên 500.000, và hóa đơn hàng tháng của bạn tăng từ $127 lên $495 USD (tăng 3.9 lần). Bởi vì web shop xử lý nhiều lượng truy cập hơn nên bạn phải trả thêm phí dịch vụ, như là CDN, máy chủ web, và cơ sở dữ liệu.

Những dịch vụ khác như lưu lượng lưu trữ cho các file tĩnh không tăng, nên giá vẫn giữ nguyên.

Với AWS, bạn có thể đạt được mối liên hệ tuyến tính giữ lưu lượng truy cập và chi phí. Và cơ hội khác đang chờ đợi bạn với mô hình định giá này.

### Lợi thế về trả tiền dựa trên mức sử dụng
Mô hình giá được tính dựa trên mức sử dụng của AWS tạo ra nhiều cơ hội mới.

Ví dụ: Rào cản cho việc bắt đầu dự án mới được giảm xuống, vì bạn không cần bắt buộc phải đầu tư vào cơ sở hạ tầng trước khi bắt đầu dự án. Bạn có thể khởi tạo máy ảo theo yêu cầu và chỉ trả trên từng giây sử dụng, và bạn có thể tắt máy ảo bất cứ lúc nào để dừng việc tính phí. Bạn không cần phải cam kết trước về lưu lượng bộ nhớ sử dụng.

Một ví dụ khác. Một máy chủ lớn có giá và công suất bằng 2 máy chủ nhỏ. Vì thế bạn có thể chia hệ thống thành những phần nhỏ, bởi vì chi phí là như nhau. Điều này giúp hệ thống bạn có khả năng chịu lỗi. Với lợi thế này công ty bạn không cần phải là công ty có qui mô lớn mà công ty nhỏ vẫn có thể tận dụng được ưu điểm của AWS.

### Các lựa chọn thay thế AWS
AWS không phải là nhà cung cấp dịch vụ điện toán đám mây duy nhất. Microsoft Azure và Google Cloud Platform (CGP) cũng là những nhà cung cấp lớn.

3 nhà cung cấp cloud có những điểm chung như sau:
* Cơ sở hạ tầng toàn cầu cung cấp về điện toán, mạng, và khả năng lưu trữ.
* Cơ sở hạ tầng như là một dịch vụ IssS (Infrastructure as a Service) cung cấp máy ảo theo yêu cầu: Amazon EC2, Azure Virtual Machines, Google Compute Engine.
* Hệ thống lưu trữ phân tán cao có thể mở rộng lưu trữ không giới hạn: Amazon S3, Azure Blob storage, Google Cloud Storage.
* Mô hình tính phí dựa trên việc sử dụng. (giống như tính tiền điện - xài nhiêu tính nhiêu, xài nhiều có thể chọn loại đăng kí 1 năm - 3 năm để được giảm giá)

Nhưng điều gì làm nên khác biệt giữa các nhà cung cấp cloud này?

AWS là công ty dẫn đầu thị trường điện toán đám mây, Cung cấp danh mục sản phẩm phong phú. Ngay cả khi AWS mở rộng sang lĩnh lực doanh nghiệp gần đây, rõ ràng AWS đang bắt đầu với dịch vụ giải quyết các vấn đề về internet-scale. Tóm lại, AWS đang xây dựng dịch vụ tuyệt vời dựa trên các công nghệ tiên tiến, chủ yếu là mã nguồn mở. AWS cung cấp cách dịch vụ phức tạp nhưng theo cách vững chắc và an toàn để hạn chế quyền truy cập vào cloud của bạn.

Microsoft cung cấp nền tảng công nghệ của Microsoft lên cloud, gần đây đang tập trung vào công nghệ mã nguồn mở và web. Có vẻ như Microsoft đang nổ lực rất nhiều để bắt kịp thị phần điện toán đám mây của AWS.

GCP tập trung vào những nhà phát triển muốn xây dựng hệ thống phân tán phức tạp. Google kết hợp với cơ sở hạ tầng toàn cầu của họ để cung cấp dịch vụ có thể mở rộng và chịu được lỗi (chẳng hạn như dịch vụ cân bằng tải của Google). GCP có vè tập trung hơn vào các ứng dụng cloud-native hơn là di chuyển máy chủ local của bạn lên cloud.

Không có lối tắt nào để đưa ra lựa chọn sáng suốt về việc nên chọn nhà cung cấp nào. Vì mỗi trường hợp và dự án đều khác nhau. Vấn đề là nằm ở trong chi tiết. Và đừng quên rằng bạn đang sử dụng nền tảng nào. (Bạn có đang sử dụng nhiều về công nghệ Microsoft không? Bạn có 1 nhóm lớn bao gồm các nhà quản trị hệ thống hoặc bạn là công ty tập trung vào nhà phát triển). Tóm lại theo tình hình hiện tại AWS là một nền tảng đám mây trưởng thành và mạnh mẽ nhất hiện nay.

Bài tiếp theo:

[Khám phá những dịch vụ của AWS](https://viblo.asia/p/cach-tinh-chi-phi-dich-vu-aws-maGK70BBZj2)

Nguồn tham khảo: **Amazon Web Services in Action, 2nd Edition (Michael Wittig và Andreas Wittig).**