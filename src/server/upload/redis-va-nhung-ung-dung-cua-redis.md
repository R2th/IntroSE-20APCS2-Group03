**Redis là gì**
  
  - Redis là tên viết tắt của Remote Dictionary Server, là kho lưu trữ dữ liệu dạng key-value trong RAM. NÓ là mã nguồn mở có tốc độ truy cập nhanh dùng làm cơ sở dữ liệu, bộ nhớ đệm, trình chuyển tiếp tin nhắn và lưu dữ danh sách tác việc cần xử lý.
   - Redis cung cấp thời gian phản hồi ở tốc độ chưa đến một mili giây, giúp thực hiện hàng triệu yêu cầu mỗi giây cho các ứng dụng thời gian thực. 
   - Redis thường được chọn sử dụng cho hoạt động lưu trữ bộ nhớ đệm, quản lý phiên, trò chơi, bảng xếp hạng, phân tích theo thời gian thực, ...
  
   ![](https://images.viblo.asia/0f4b7875-0415-423f-af83-44c420a97849.png)

**Cách thức hoạt động của Redis**

  - Toàn bộ dữ liệu Redis nằm trong bộ nhớ, trái với cơ sở dữ liệu thông thường lưu dữ liệu trên ổ đĩa. Bằng cách loại bỏ sự cần thiết phải truy cập ổ đĩa, kho dữ liệu bộ nhớ như Redis tránh được sự chậm trễ do thời gian tìm kiếm và có thể truy cập dữ liệu trong vài micro giây. Redis có cấu trúc dữ liệu linh hoạt, độ khả dụng cao, dữ liệu trên Ram, hộ trợ lưu trữ trên ổ đĩa, cluster giúp xây dựng các ứng dụng quy mô lớn theo thời gian thực.

**Tính năng mới của Redis 5.**

![](https://images.viblo.asia/81c86dd3-4577-4ef1-a1ed-2ea5667c8706.png)

   - Redis 5.* hiện là phiên bản GA mới nhất của Redis. Kể từ khi phát hành lần đầu năm 2009, từ một công nghệ lưu trữ bộ nhớ đệm, Redis đã phát triển thành một kho lưu trữ dữ liệu trong bộ nhớ nhanh và dễ sử dụng, cung cấp các cấu trúc dự liệu linh hoạt và phản hồi trong thời gian chưa đển 1 mili giây. Redis đã đạt được cột mốc quan trọng với bản 5.0 trong đó có nhiều tiến bộ và cải tiến khác nhau. Điều đáng  chú ý ở đây là sự ra mắt của Streams, cấu trúc dữ liệu hoàn toàn mới trong Redis. Bản phát hành này cũng bổ sung thêm lệnh cho tập dữ liệu được sắp xếp và các khả năng mới cho API mô-đun.

**Lợi ích của Redis**

  - Kho dữ liệu trong bộ nhớ
     + Toàn bộ dữ liệu Redis nằm trong bộ nhớ chính của máy chủ, trái với cơ sở dữ liệu thông thường phần lớn các tác vụ đều yêu cầu truy cập qua lại tới ổ đĩa, kho dữ liệu trong bộ nhớ như Redis không phải mất thời gian cho truy cập ỗ đĩa, do đó kho dữ liệu này có thể hộ trợ thêm khá nhiều tác vụ và có thời gian phản hổi nhanh hơn. Kết quả là hiệu suất nhanh thấy rõ với các tác vụ đọc hoặc ghi thông thường, hộ trợ hàng triệu tác vụ mỗi giây.

  - Cấu trúc dữ liệu linh hoạt
    + String: văn bản hoặc dữ liệu nhị phân có kích thước lên tới 512MB.
    + List: tập hợp các String được sắp xếp theo thứ tự như khi được thêm vào.
    + Set: tập hợp chưa được sắp xếp.
    + ZSet: tập hợp được sắp xếp theo giá trị.
    + Hash: cấu trúc dữ liệu dùng để lưu trữ danh sách theo key-value.
    + Bitmap: kiểu dữ liệu cho phép thực hiện các tác vụ quy mô bit.
    + HyperLogLogs: cấu trúc dữ liệu xác suất để ước tính các thành phần duy nhất trong một tập dữ liệu.
  - Đơn giản và dễ sử dụng
    + Redis đơn giản hóa bằng cách cho phép bạn viết ít dòng lệnh hơn để lưu trữ, truy cập và sử dụng dữ liệu trên ứng dụng. Ví dụ nếu ứng dụng của bạn có dữ liệu được lưu trên một mảng băm và bạn muốn lưu dữ liệu đó trên kho dữ liệu, bạn chỉ cần sử dụng cấu trúc dữ liệu mã hash của Redis. Tác vụ tương tự trên kho dữ liệu không có cấu trúc dữ liệu hash sẽ cần nhiều dòng mã để chuyển đổi từ định dạng này sang định dạng khác. Redis được trang bị cấu trúc dữ liệu riêng và nhiều tùy chọn để điều khiển và tương tác với dữ liệu của bạn. Có nhiều ngôn ngữ hộ trỡ Redis như Java, Python, PHP, JavaScript, Nodejs...
  - Sao chép và độ bền
    + Redis sử dụng  kiến trúc bản Master-Slave và hộ trỡ sao chép không đồng bộ trong đó có thể sao chép dữ liệu sang nhiều máy chủ bản sao. Việc này mang lại hiệu suất đọc cao hơn vì có thể chia tách các yêu cầu giữa các máy chủ và tốc độ khôi phục nhanh hơn khi máy chủ gặp sự cố. Về độ bền Redis hộ trợ sao lưu sang ổ đĩa tại một thời điểm nào đó.
  - Khả năng mở rộng
    + Redis là dự án mã nguồn mở được một cộng đồng đông đảo ủng hộ. Không có giới hạn về nhà cung cấp hoặc công nghệ vì Redis có tính tiêu chuẩn mở, hộ trợ định dạng dữ liệu mở và tập hợp các máy chủ.

**Trường hợp sử dụng phổ biến của Redis**

   - Lưu trữ bộ nhớ đệm: Redis là lựa chọn tuyệt vời để triển khai một bộ nhớ đệm trong bộ nhớ có độ khả dụng cao để giảm độ trễ truy cập dữ liệu, tăng hiệu suất và giảm tải cho cơ sở dữ liệu quan hệ và ứng dụng. Redis có thể phục vụ những dữ liệu thường xuyên được yêu cầu và dễ dàng thay đổi quy mô để đáp ứng mức tải cao mà không cần cải thiện backend với chi phí thấp hơn. Một số ví dụ về bộ nhớ đệm như kết quả truy vấn cơ sở dữ liệu, các đối tượng thường xuyên được sử dụng,...
   - Trò chuyện, nhắn tin và danh sách xử lý tác vụ: Redis với cơ chế Pub/Sub là cấu trúc gửi nhận tin nhắn trong Redis cho phép Redis hộ trợ các room chat hiệu suất cao theo thời gian thực. Cấu trúc dữ liệu dạnh list giúp dễ dàng triển khai một danh sách các tác vụ cần xử lý có tải trọng nhẹ.
   - Bảng xếp hạng game: Redis là giải pháp hay được các nhà phát triển game dùng để xây dụng bảng xếp hạng theo thời gian thực. Chỉ cần sử dụng cấu trúc dữ liệu ZSET cấu trúc này đảm bảo tính duy nhất của các thành phần trong khi vẫn duy trì danh sách được sắp xếp theo điểm số của người dùng. Tạo danh sách xếp hạng theo thời gian thực dễ thực hiện khi cập nhật điểm số.
   - Lưu trữ session: Redis là kho dữ liệu trong bộ nhớ có độ khả dụng và độ bền cao, được dùng để lưu trữ và quản lý session cho các ứng dụng internet. Redis có độ trễ thấp, quy mô, độ đàn hồi cần thiết để quản lý dữ liệu session như thông tin đăng nhập, trạng thái session.
   - Phát tán nội dung dữ liệu: Redis cung cấp kho lưu trữ trong bộ nhớ, có tốc độ truy cập nhanh để sử dụng trực tiếp. Có thể sử dụng Redis để lưu trữ dữ liệu về người dùng, xem lịch sử, thông tin/mã thông báo xác thực cho hàng triệu người dùng và hiện thị tập tin cho phép truyền tại nội dung cho người dùng di động, máy tính bàn cùng lúc.
   - Dữ liệu tọa độ: Redis tích hợp để quản lý dữ liệu địa lý theo thời gian thực ở quy mô, tốc độ mong muốn. Các lệnh như GEOADD, GEODIST, GEORADIUS và GEORADIUSMEMBER để lưu trữ, xử lý và phân tích địa lý giúp dữ liệu địa ký dễ dàng nhanh chóng hơn.
   - Machine Learning: Các ứng dụng chịu sự chi phối của dữ liệu yêu cầu machine learning phải có khả năng nhanh chóng xử lý được dữ liệu khổi lượng lớn, đa dạng, tốc độ cao và tự động hóa. Redis cung cấp kho lưu trữ bộ nhớ, tốc độ nhanh để truy cập, đào tạo và triển khai mô hình machine learning một cách nhanh chóng.
   - Phân tích theo thời gian thực: Dùng Redis kết hợp với các giải pháp trực tuyến như Apache Kafka và Amazon Kinesis làm kho dữ liệu trong bộ nhớ để tiêu thụ, xử lý và phân tích dữ liệu thời gian thực. Redis là lựa chọn lý tưởng cho các trường hợp sử dụng phân tích thời gian thực như mạng xã hooik, IoT.
 
 [Reference: https://aws.amazon.com/redis/?nc1=h_ls](https://aws.amazon.com/redis/?nc1=h_ls)