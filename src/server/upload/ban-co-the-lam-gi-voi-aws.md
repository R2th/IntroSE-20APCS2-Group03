Bài viết liên quan:
[Ứng dụng AWS trong thực tế](https://viblo.asia/p/aws-amazon-web-services-la-gi-ung-dung-trong-thuc-te-4dbZNN98ZYM)

Bạn có thể chạy tất cả các loại ứng dụng trên AWS bằng cách sử dụng một hoặc nhiều dịch vụ. Trong phần này sẽ cung cấp ví dụ về những gì bạn có thể thao tác với AWS.

### Hosting một trang web shop
Tèo là CIO của doanh nghiệp thương mại cỡ trung bình. Anh ấy muốn phát triển web shop nhanh và đáng tin cậy. Ban đầu anh ta đặt máy chủ web shop dạng on-premises(máy chủ của chính doanh nghiệp), và 3 năm trước anh ấy đã thuê máy trong trung tâm dữ liệu. Máy chủ xử lý yêu cầu (request) từ khách hàng và cơ sở dữ liệu lưu trữ thông tin sản phẩm, đơn đặt hàng. Tèo đang đánh giá cách tận dụng lợi thế của AWS để chạy thiết lập(setup) giống như vậy trên AWS.

![web shop](https://images.viblo.asia/9fd4dffb-5cdb-4933-b0fe-a2aa2f8bdf09.png)

| On-premises server | AWS |
| -------- | -------- | 
| Web server: được quản lý bởi bạn    | Web server: được quản lý bởi bạn     |
| Database: được quản lý bởi bạn    | Database: được quản lý miễn phí bởi AWS     |

Tèo không chỉ muốn nâng cấp và di chuyển cơ sở hạ tầng của mình lên AWS mà anh ấy còn muốn tận dụng những ưu điểm AWS cung cấp. Các dịch vụ AWS cung cấp giúp cải thiện phần cài đặt của anh ấy:

* Web shop bao gồm: nội dung động (chẳng hạn như sản phẩm và giá của chúng) và nội dung tĩnh (logo của công ty). Việc chia nhỏ những phần này sẽ giúp giảm tải trên máy chủ web và cải thiện hiệu suất bằng cách phân phối nội dung tĩnh qua content delivery network CDN (mạng phân phối nội dung).
* Việc chuyển sang dịch vụ không cần bảo trì: cơ sở dữ liệu, lưu trữ đối tượng, hệ thống DNS. Giúp Tèo không phải quản lý các phần này trên hệ thống, giảm chi phí vận hành và cải thiện chất lượng.
* Ứng dụng chạy trên web shop có thể được cài đặt trên máy ảo. Sử dụng AWS, Tèo có thể chạy lượng tài nguyên giống như sử dụng trên máy on-premise. Nhưng ưu điểm của AWS so với on-premise là anh ấy có thể chia thành nhiều máy ảo nhỏ hơn mà không trả thêm phí. Nếu một máy ảo bị lỗi thì bộ cân bằng tải sẽ gửi yêu cầu của khách hàng tới máy ảo khác. Thiết lập này giúp cải thiện độ tin cậy của web shop.

![](https://images.viblo.asia/e0d3a765-0763-4577-92e8-cdfeee1c984d.png)

Chạy web shop trên AWS với CDN giúp cản thiện tốc độ truy cập. Bộ cân bằng tải (load balancer) giúp nâng cao độ tin cậy, và cơ sở dữ liệu được quản lý miễn phí, giúp giảm chi phí bảo trì.

Tèo cảm thấy hạnh phúc khi chạy web shop trên AWS. Bằng cách di chuyển cơ sở hạ tầng của anh ấy lên cloud giúp cải thiện độ tin cậy và tốc độ truy cập của web shop.

### Chạy ứng dụng Java EE trong mạng riêng (private network)

Tí là kiến trúc sư hệ thống cấp cao trong một tập đoàn toàn cầu. Anh ấy muốn di chuyển các phần ứng dụng của công ty lên AWS khi hợp đồng trung tâm dữ liệu hết hạn trong vài tháng tới, để giảm thiểu chi phí và có được sự linh hoạt. 

Anh ấy muốn chạy các ứng dụng doanh nghiệp (chẳng hạn như ứng dụng Java EE) bao gồm một máy chủ ứng dụng và một cơ sở dữ liệu SQL trên AWS. 

Để làm được điều đó, Tí cần một mạng ảo trên cloud và kết nối với mạng công ty thông qua Virtual Private Network (VPN). Anh ấy cài đặt ứng dụng cần thiết máy chủ trên máy ảo để chạy Java EE. Tí còn muốn lưu trữ dữ liệu trên dịch vụ cơ sở dữ liệu SQL (Oracle database, Microsoft SQL Server,..).

Để bảo mật, Tí sử dụng mạng con để phân tách các hệ thống có mức độ bảo mật khác nhau. Bằng cách sử dụng danh sách access-control, Tí có thể kiểm soát lưu lượng truy cập vào và ra cho mỗi mạng con.

Ví dụ: Cơ sở dữ liệu chỉ có thể được truy cập từ mạng con của máy chủ JEE giúp bảo mật dữ liệu quan trọng. 

Tí kiểm soát lưu lương truy cập internet bằng cách sử dụng Network Address Translation (NAT) và qui tắc tưởng lửa (firewall rules).

![AWS private network](https://images.viblo.asia/ea41be62-61c0-4f76-be5b-a643b6607f28.png)

Tí quản lý để kết nối trung tâm dữ liệu cục bộ với mạng riêng chạy từ xa trên AWS để cho phép khách hàng truy cập vào máy chủ JEE. 

Để bắt đầu, Tí sử dụng VPN để tạo kết nối trung tâm dữ liệu cục bộ với AWS, nhưng anh ấy đã suy nghĩ về việc thiết lập kết nối mạng chuyên dụng để giảm chi phí mạng và tăng thông lượng mạng trong tương lai.

Dự án là một thành công lớn đối với Tí. Anh ấy có thể giảm thời gian thiết lập ứng dụng doanh nghiệp từ hàng tháng xuống còn vài giờ, vì AWS đã giải quyết vấn đề cho bạn về máy ảo, cơ sở dữ liệu, và thậm chí cơ sở hạ tầng mạng theo yêu cầu trong vòng vài phút.

Dự án của Tí còn được hưởng lợi từ chi phí cơ sở hạ tầng AWS giá thấp, so với việc sử dụng cơ sở hạ tầng on-premises.

### Triển khai hệ thống có tính khả dụng cao

Mẹo là kỹ sư phần mềm làm việc cho công ty khởi nghiệp đang phát triển nhanh. Anh ấy biết rằng luật Murphy áp dụng cho cơ sở hạ tầng CNTT: bất cứ điều gì **có thể xảy** ra sai sót đều **sẽ xảy ra** sai sót.

Anh ta đang làm việc chăm chỉ để xây dựng hệ thống có tính khả dụng cao để ngăn chặn sự cố hỏng hóc trong kinh doanh.

Tất cả các dịch vụ trên AWS đều có tính khả dụng cao hoặc có thể sử dụng theo cách có tính khả dụng cao. Vì thế anh ta quyết định xây dựng một hệ thống có kiến trúc khả dụng cao:

* Dịch vụ cơ sở dữ liệu cung cấp tính năng sao chép và xử lý dự phòng. Trong trường hợp cơ sở dữ liệu master bị lỗi, cơ sở dữ liệu dự phòng cung cấp một cơ sở dữ liệu master mới một cách tự động.
* Mẹo sử dụng những máy ảo như là máy chủ web. Theo mặc định, những máy ảo này không có tính khả dụng cao, nhưng Mẹo có thể khởi tạo nhiều máy ảo trung trung tâm dữ liệu khác nhau để đạt được tính khả dụng cao.
* Dịch vụ cân bằng tải (load balancer) kiểm tra tính ổn định của các máy chủ web và gửi yêu cầu từ người dùng đến cách máy hoạt động ổn định.

![highly available system](https://images.viblo.asia/9288df94-a1ab-4849-9920-cee2ad828ca4.png)

Cho đến nay, Mẹo đã bảo vệ công ty khởi nghiệp khỏi những sự cố lớn. Tuy nhiên anh ấy và nhóm luôn lập kế hoạch cho sự thất bại và không ngừng cải thiện khả năng phục hồi của hệ thống.

### Thu lợi từ chi phí thấp cho cơ sở hạ tầng xử lý hàng loạt (batch process)

Sửu là nhà khoa học dữ liệu và anh ấy cần xử lý một lượng lớn dữ liệu đo lường được thu thập từ những gas turbine. Anh ấy cần tạo báo cáo chứa điều kiện bảo trì của hàng trăm turbine mỗi ngày. Vì thế nhóm của anh ấy cần một cơ sở hạ tầng điện toán để phân tích dữ liệu mới mỗi ngày.

Các công việc hàng loạt được chạy theo lịch trình và lưu trữ kết quả tổng hợp trong cơ sở dữ liệu. Công cụ kinh doanh thông minh (business intelligence tool) được sử dụng để tạo các báo cáo dữ liệu lưu trữ trong cơ sở dữ liệu.

Vì ngân sách cho cơ sở hạ tầng máy tính rất nhỏ, Sửu và nhóm của anh ấy đã tìm kiếm một giải pháp hiệu quả về chi phí cho việc phân tích dữ liệu. Anh ấy đã tìm ra cách để sử dụng mô hình giá của AWS một cách thông minh:

* AWS tính phí máy ảo chạy trên từng phút. Vì thế Sửu khởi tạo máy ảo khi bắt đầu chạy công việc hàng loạt (batch job), và tắt máy ảo ngay khi công việc kết thúc. Làm như vậy cho phép anh ta chỉ chi trả cho cơ sở hạ tầng khi thực sự xử dụng chúng. Đây là một thay đổi lớn so với trung tâm dữ liệu truyền thống nơi mà Sửu phải chi trả phí hàng tháng cho mỗi máy, bất kể là sử dụng ít hay nhiều.
* AWS cung cấp các máy chủ dự phòng trong trung tâm dữ liệu của họ với mức chiết khấu đáng kể: Nếu Sửu không quan trọng thời gian chạy trong ngày. Anh ấy có thể đợi cho đến khi AWS có máy chủ trống, sau đó hệ thống của Sửu sẽ được khởi chạy và AWS sẽ chiết khấu anh ấy đến 50%.

![Low cost with batch process](https://images.viblo.asia/be23b9ee-d891-46ec-810d-5143e0e3791a.png)

Sửu cảm thấy rất vui khi có quyền chi cấp sơ sở hạ tầng máy tính cho phép anh ấy phân tích dữ liệu với chi phí thấp. 

Bây giờ bạn có hiểu biết chung về những gì có thể làm với AWS. Nói chung, bạn có thể thuê bất kì máy chủ ứng dụng trên AWS. Phần tiếp theo sẽ giải thích về 9 ưu điểm mà AWS cung cấp cho bạn.

Bài tiếp theo: [Lợi ích của AWS](https://viblo.asia/p/aws-amazon-web-services-la-gi-ung-dung-trong-thuc-te-LzD5dLWz5jY)

Nguồn tham khảo: **Amazon Web Services in Action, 2nd Edition (Michael Wittig và Andreas Wittig).**