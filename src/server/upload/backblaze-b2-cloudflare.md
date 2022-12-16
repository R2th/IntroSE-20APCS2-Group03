![ảnh.png](https://images.viblo.asia/6041c600-9b8c-4a72-8c86-34fdca5daef2.png)

Lưu trữ có giá rất rẻ, nhưng **chi phí cho băng thông thì lại cực đắt**.

Ở dịch vụ lưu trữ Amazon AWS S3, chi phí cho việc lưu 1TB dữ liệu chỉ có 25$/tháng, nhưng **để truyền ra (download) 1TB băng thông thì bạn sẽ tốn "sơ sơ" 120$** (với mức giá ở region Singapore). Với một hệ thống có khá khá người dùng và có đặc thù thường xuyên phải truyền tải một lượng lớn static assets, việc phải cung cấp lượng băng thông gấp 5 lần, 10 lần như vậy mỗi tháng là truyện bình thường.

Với lượng băng thông tăng lên như vậy, chi phí của S3 sẽ nhanh chóng đội **lên đến mức ngàn đô**, mức giá mà hoàn toàn không hề khả thi với nhiều người. Nhất là với những website phi lợi nhuận, hay lợi nhuận không đời nào đáp ứng nổi cho cái bill hàng tháng to như thế.

Vậy ngoài kia có còn những lựa chọn nào "hợp túi tiền" hơn không? Đây là một thử thách mình đã và đang gặp phải, và trong bài này là giải pháp hiện tại mà mình đang lựa chọn để giúp **cắt giảm chi phí tối đa** cho việc lưu trữ và truyền tải lượng lớn assets.

# Backblaze
![ảnh.png](https://images.viblo.asia/d9abe122-d593-43d1-ab50-48bc5c552bb9.png)

**Backblaze** là nhà cung cấp chuyên cung cấp các dịch vụ về backup dữ liệu hay lưu trữ đám mây. Backblaze cung cấp dịch vụ B2 Cloud Storage, dịch vụ lưu trữ đám mây có hỗ trợ tương thích với S3 API.

Mình tìm thấy Backblaze trong lúc đi tìm các nhà cung cấp dịch vụ lưu trữ giá rẻ, và thấy là Backblaze thường xuyên được nhắc đến và có nhiều phản hồi tốt trên cộng đồng bên Reddit. Thậm chí nhiều nhân viên của Backblaze cũng "nằm vùng" ở Reddit và thường xuyên hỗ trợ những thành viên bên đó luôn.

Ảnh dưới đây là mức giá của dịch vụ Backblaze B2, đặt cạnh với các dịch vụ lưu trữ khác từ AWS, GCP, Azure:

![ảnh.png](https://images.viblo.asia/050f97b4-469f-42d8-b422-173b1e226ce4.png)

Nhìn vào trong hình là đủ thấy, **chi phí của B2 rẻ hơn gấp nhiều lần** so với các "ông lớn" khác! Lưu trữ 1TB chỉ mất chi phí là 5$/tháng (so với 25$/tháng của AWS S3), và phí băng thông cho mỗi 1TB là 10$/tháng (so với 120$/tháng của S3). Tất nhiên là ở đây mình chỉ so sánh về giá và tập trung vào tối ưu chi phí là chính, và đương nhiên các cloud provider lớn thì có infrastructure tốt hơn nhiều.

Nhưng với **lòng tham không có đáy** của mình, chi phí băng thông chưa đủ để làm mình hài lòng. Với **0.01$/GB băng thông download**, người dùng tải xuống 10TB băng thông mỗi tháng thì chi phí sẽ là 100$/tháng. Rõ ràng là rẻ hơn nhiều so với mức "ngàn đô" của S3, nhưng vẫn chưa đủ rẻ với mình! Liệu có cách nào để tối ưu hơn nữa về chi phí không?

# Cloudflare
![ảnh.png](https://images.viblo.asia/961c8ad3-0bff-4380-8462-87eddb772c23.png)

Chắc hẳn bạn đã từng nghe nói đến **Cloudflare**, một dịch vụ CDN khá là nổi gần đây. Cloudflare được dùng ở rất nhiều website, và trước đây mình từng nghe là chiếm sơ sơ đến 15% lưu lượng internet của toàn thế giới. Cloudflare được ưa chuộng không chỉ vì giúp ẩn giấu IP của bạn đằng sau reverse proxy, giúp bảo vệ khỏi bot, crawler, các dạng tấn công và DDoS, mà còn giúp bạn cache lại các static asset tại khắp các edge server của Cloudflare trên toàn thế giới.

Và điểm mấu chốt cuối cùng là **Cloudflare cho sử dụng hoàn toàn miễn phí** với free plan! Gói miễn phí của Cloudflare **không có giới hạn băng thông** cụ thể nào, miễn là trang web của bạn không lạm dụng gói miễn phí một cách quá đáng. 

Và bởi vì Cloudflare cho phép cache lại các asset, bằng cách đặt bucket B2 phía sau Cloudflare, mình có thể hạn chế truy cập "nóng" các file, giúp mình **giảm thiểu thêm phí băng thông** và phí cho mỗi transaction của B2! Chưa kể, bạn được hưởng lợi nhờ vào Cloudflare đưa các file của bạn gần hơn với người sử dụng ở khắp nơi trên thế giới và tải xuống nhanh hơn, với độ trễ thấp hơn.

# Cloudflare Bandwidth Alliance
![ảnh.png](https://images.viblo.asia/cc71011c-d834-4244-900e-ae18740afceb.png)

Cloudflare hợp tác với rất nhiều các cloud provider và các doanh nghiệp mạng khác nhau và tạo nên một **Bandwidth Alliance**. Cloudflare cùng các đối tác trong chương trình Bandwidth Alliance thiết lập với nhau một **đường dây mạng riêng**, giúp giảm chi phí so với việc phải đi qua các hạ tầng mạng của bên thứ 3. Rất nhiều bên nằm trong chương trình Bandwidth Alliance, bao gồm cả các ông lớn như **Azure**, **GCP**, **Linode**, **Vultr**, và đương nhiên là không thể thiếu **Backblaze** mà mình nói đến ở trên.

Nhờ đó, nhiều cloud provider có cơ hội **loại bỏ hoàn toàn chi phí bandwidth cho khách hàng** của mình nếu lưu lượng bandwidth được truy cập thông qua Cloudflare, và **Backblaze là một trong những nhà cung cấp đó** :D Lưu ý là cloud provider nằm trong Bandwidth Alliance không có nghĩa là mọi nhà cung cấp đó đều chấp nhận cho bạn bỏ hoàn toàn giá bandwidth. Azure thì không có chính sách này, GCP thì giá băng thông chỉ giảm giá cho rẻ hơn nếu đi qua Cloudflare. Vultr thì có miễn phí bandwidth nếu là dịch vụ Cloud Compute, nhưng dịch vụ Object Storage thì lại không được miễn phí.

Nói một cách đơn giản hơn:
- Người dùng tải các file trực tiếp từ endpoint bucket B2 của tài khoản của bạn: **bạn sẽ phải trả phí tương đương 0.01$/GB**
- Người dùng tải file từ một tên miền của bạn, đã có sử dụng Cloudflare để thiết đặt reverse-proxy và CNAME đến endpoint của B2: **bạn trả phí 0$/GB**

Bạn có thể tìm hiểu thêm về chương trình **Bandwidth Alliance** của Cloudflare [tại đây](https://www.cloudflare.com/bandwidth-alliance/) và thông tin chính thức về việc miễn phí băng thông của Backblaze [tại đây](https://www.backblaze.com/blog/backblaze-and-cloudflare-partner-to-provide-free-data-transfer/).

# Kết quả cuối cùng
Cloudflare vui vẻ cho mình truyền tải **hơn 8TB băng thông mỗi tháng** mà không lấy một xu:
![ảnh.png](https://images.viblo.asia/f52740a1-26a5-427d-ae87-c5c3fb283561.png)

Và chi phí hóa đơn ở Backblaze của chu kỳ thanh toán tháng vừa rồi của mình:
![ảnh.png](https://images.viblo.asia/8f7309dd-a0c4-4af5-ae16-1a22c5bd1906.png)

Như vậy, mình **chỉ phải trả 0,78$** cho tháng vừa rồi để lưu trữ khoảng 100GB dữ liệu và truyền tải hơn 8TB băng thông! Thử tưởng tượng số tiền mà mình phải trả nếu sử dụng dịch vụ lưu trữ khác như AWS S3, hoặc nếu mình sử dụng Backblaze mà không cùng với Cloudflare... 😱