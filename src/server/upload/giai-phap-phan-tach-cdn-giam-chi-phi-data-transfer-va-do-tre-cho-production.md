Ở bài viết này chúng ta sẽ không bàn về CDN là gì, cách dùng như thế nào. Bài viết phù hợp với các products có tải lớn, nhiều cấu hình origin đang chạy trên AWS, cân nhắc nhiều nhà cung cấp local CDN vì vấn đề chi phí và độ trễ.
 # AWS edge locations có mặt tại Việt Nam
 Đầu tiên, giải pháp này cũng bắt nguồn từ thông tin cực hữu ích là cuối tháng 8/2022, AWS đã ra mắt 02 AWS edge locations mới tại Hà Nội và Hồ Chí Minh. Với edge location này dự kiến sẽ cải thiện độ trễ byte đầu tiên tới 30% đối với dữ liệu truyền qua, cung cấp kết nối an toàn, đáng tin cậy, hiệu suất cao tới end-user tại Việt Nam. Đã vậy còn đang miễn phí 1TB băng thông toàn cầu.
 Thực tế nó ngon thật, latency đang nhỏ hơn cả một số local CDN hiện tại. (Đã được kiểm chứng bởi các kỹ sư của Sapo, Hoang-phuc và các đơn vị khác).
 
 # Luồng CDN cơ bản:
![](https://images.viblo.asia/de0e8d4d-fef2-4c02-a862-f6cd735a705c.png)
# Thực trạng
## Khía cạnh kỹ thuật
1. Về góc độ production, chỉ sử dụng một nhà cung cấp cho một dịch vụ chính là một SPF – single point of failure.
2. Mặc dù các nhà cung cấp CDN luôn cam kết được hỗ trợ chống tấn công DDoS ở tầng này, nhưng vẫn tiềm ẩn rủi ro bị tấn công/lỗi hệ thống bị lỗi kết nối một phần hoặc toàn bộ.
3. Với nhiều origin như media files trên S3, xử lý ảnh thumb ở cụm compute, css,... đòi hỏi mỗi lần cấu hình trên một nhà cung cấp CDN rất phức tạp.
4. Hơn nữa, độ trễ từ mỗi nhà cung cấp tới origin khác nhau, thường là đi internet với độ trễ cao. Đặc biệt lúc đứt cáp thì càng thảm hoạ.
5. Thực tế mình còn gặp tình huống cụm CDN của một Việt Nam local brand bị tèo nhiều lần một tháng, dẫn tới lỗi phía end-user và đồng thời phải gọi lại origin khiến chi phí data transfer vụt lên cao từ vài chục đến vài trăm dollar, thậm chí hơn nữa. (1TB ~ 1000$ từ S3 Singapore về Việt Nam).
## Khía cạnh chi phí
1. Data transfer = Cloudfront bandwidth là 0,120 USD/GB cho 10TB đầu. (Khoảng 2700 VNĐ, tính theo giá 23000VNĐ/Dollar). 10TB có phí khoảng $1200, tức  ~ 28.800.000 VNĐ ( => Để data chạy thẳng từ origin tới end-user tốn chi phí ngang nhau nhưng độ trễ thấp hơn.
2. AWS Cloudfront dùng trên 10TB thì đâu đó làm việc với sale sẽ giảm về $0.085/GB (Khoảng 1955 VNĐ/GB). 10TB sau có phí khoảng $850, tức ~ 20.000.000 VNĐ. Sẽ là bao nhiêu nếu băng thông mỗi tháng lên tới 50-100TB??
3. Chi phí trên 1GB băng thông với các local brand ở Việt Nam chỉ khoảng 100-500 VNĐ/GB. 10TB sau có phí khoảng 1.000.000 VND --> 5.000.000 VNĐ
4. Chi phí xoá cache, chi phí phòng chống tấn công với AWS ghi rất cụ thể, nhưng local brand lại thường free.

# Giải pháp phân tách
Chúng ta sẽ dùng cloudfront endpoint để làm source cho local CDN provider. Chi tiết:
![](https://images.viblo.asia/d5dbd42e-18ed-4a43-ade6-c8a5b3d3731b.png)

Sau khi tách, chúng ta dùng endpoint của cloudfront làm source cho mọi nhà cung cấp CDN sẽ mang lại lợi ích:

1. Đổi nhà cung cấp một cách đơn giản chỉ bằng một endpoint.
2. Latency từ PoP của AWS tới S3 thì đương nhiên nhà siêu thấp (đi theo đường backbone của AWS) mà nó lại ở ngay HN và HCM. Sau đó từ PoP tới các PoP của local CDN lại càng không cần lo. Thử nghiệm cái này rất dễ để chứng minh.
3. Giảm rất nhiều chi phí CDN và data transfer out của S3. (Đương nhiên là vẫn còn ít chi phí từ Cloudfront tới local CDN provider)
4. Được support xử lý tấn công tốt hơn từ local CDN provider.
5. Trường hợp xấu nhất là tất cả các local CDN provider kém thì chỉ cần CNAME trực tiếp domain về cloudfront mà không phải điều chỉnh quá nhiều.

## Gợi ý tiêu chí chọn một CDN Provider
1. Hạ tầng đủ lớn, sức chịu tải cao, phân tán gần end-user của sản phẩm không?
2. Có những hỗ trợ về chống tấn công DDoS không?
3. SLA cho service là bao nhiêu?
4. Lúc lỗi thì có kênh hỗ trợ 24/7 có Hotline, chat nào?
5. Chi phí cạnh tranh (Đa phần ở Việt Nam thì đều giá tốt, chênh nhau không nhiều nên chi phí là yếu tố tính cuối cùng)
6. Khả năng peering của nhà cung cấp với các nhà mạng Việt Nam: Liệu CDN peering với nhà mạng nào có % lưu lượng người dùng chiếm tỉ trọng cao nhất? Dù có peering với 10 ông nhà mạng mà chỉ chiếm 30% thì sẽ ko hiệu quả bằng 3 nhà mạng chiếm 70% lưu lượng ở Việt Nam.
7. Khả năng tận dụng các in-house development cho các chức năng khác nhau của cùng một nhà cung cấp: Ví dụ như khả năng kết hợp giữa AWS Việt Nam với CDN trong nước có khó khăn gì cho việc sử dụng cùng với nhau so với việc dùng Cloudfront native từ chính Aws?
8. Tiện dụng trong thanh toán, phần này các anh chị kế toán rất thích thanh toán chung các dịch vụ của một nhà cung cấp hơn tách các bill và đối soát hàng tháng.
9. Bảo mật: Các node/edge của các nhà cung cấp CDN còn để tận dụng là công cụ hỗ trợ tấn công từ bên ngoài (ví dụ: Anti-DDOS) nên cần check xem trong tương lai gần có cần hay không ? Nâng cấp dễ dàng không?

----Tiêu chí 6, 7, 8, 9 được góp ý thêm từ anh Bảo - Trưởng phòng kinh doanh Quốc tế của FPT Telecom.

Mong nhận được thêm đóng góp để cải thiện hơn từ mọi người.