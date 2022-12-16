### 1. Content Delivery Network (CDN)
### 
Một Content Delivery Network (CDN) hay mạng phân phối nội dung là một nhóm server đặt tại nhiều vị trái khác nhau để hỗ trợ nội dung được trải dài ở nhiều khu vực vị trí địa lý khác nhau.

CDN cũng được gọi là “distribution networks”.  Ý tưởng là tạo được nhiều điểm truy cập (Point of Presence – PoPs) ngoài server gốc. Việc này giúp website quản lý tốt traffic hơn bằng cách xử lý nhanh hơn yêu cầu của khách, tăng trải nghiệm người dùng.

Content ở đây là những yếu tố chữ và hình của website: văn bản, ảnh, file audio, videos, ....

Có 2 loại nội dung: động và tĩnh. Nội dung tĩnh là nội dung ban đầu (input) cũng chính là nội dung cuối cùng người khác nhìn thấy (output). Nó không thay đổi theo thời gian bởi tác động của người dùng. Server sẽ truyền cùng 1 dữ liệu đó cho mọi người. Quy trình là người dùng yêu cầu 1 file A từ web server, server sẽ trả lại file A đó.

Nội dung động (Dynamic content) là nội dung sẽ thay đổi dựa vào dữ liệu đầu vào. Nó được cá nhân hóa trên từng trang, tùy thuộc vào dữ liệu nhập vào của người dùng. Ví dụ của nội dung động là trang sản phẩm chứa tên sản phẩm, mô tả sản phẩm, và giá, bao gồm hình ảnh. Ví dụ khác là trang web hiển thị mà tương tác trực tiếp với người dùng để gửi tới người dùng những thông tin liên quan.

### 2. Amazon CloudFront
### 

CloudFront là dịch vụ CDN tốc độ cực cao mà Amazon cung cấp để phân phối dữ liệu, video, ứng dung, API ở mức độ toàn cầu mà vẫn đảm bảo an toàn bảo mật.

Amazon CloudFront hỗ trợ cả IPv4 và IPv6


**2.1 Egde Location**

CloudFront lưu trữ và phân phối data thông qua các trung tâm mạng lưới dữ liệu trên toàn thế giới, được gọi là Edge locations. Những Edge Locations này là nơi mà End-User có thể truy cập đến dịch vụ của AWS.

Hiện nay Amazon đang đặt các Edge Location ở 65 thành phố ở trên 29 quốc gia, cụ thể là có khoảng 155 edge locations, hoạt động như một cache dài hạn cho server của hệ thống. 

=>  
- Giảm độ trễ khi request và nhận dữ liệu
- Tốc độ truyền dữ liệu cao
 
 Các Edge Location được kết nối với nhau thông qua Amazon Backbone Network đạt 99.9% SLA (Service-level agreement  - Cam kết chất lượng dịch vụ)
 
 **2.2 Tài nguyên**
 
 Các tài nguyên được CloudFront hỗ trợ bao gồm: 

- Images
- Style Sheet
- Javascript Files
- Các bản install, patch được tải xuống
- Video Streaming: Live và In- Demand
- API: Moblile và Desktop
- Ứng dụng

**2.3 Bảo mật**

CloudFront cung cấp một số cơ chế về bảo mật như sau:
- AWS Shield, AWS Web Application Firewal (WAF)
- Hỗ trợ https và SSL/TLS
- Field-level encryption: Gói 1 số field vào và mã hóa cho đến khi request đến được với service có thẩm quyền trong ứng dụng của bạn
- Geo Restriction: Cho phép ngăn chặn các request đến từ một vùng địa lý nhất định
- Invalidiation API: Cho phép loại bỏ một số Objects khỏi Request (Lưu ý: Không thể invalid các object của RTMP distribution ( Real-Time Messaging Protocol) 


**2.4 Một số dịch vụ thường kết hợp cùng CloudFront**

Một số dịch vụ khác của AWS có thể kết hợp cùng CloudFront
![](https://images.viblo.asia/817d1a59-ba44-449d-8260-1cd0111932b6.png)

Kết hợp cùng các dịch vụ sẽ giúp bạn tối ưu được chất lượng của hệ thống và tiết kiệm chi phí.

Ngoài ra, Lambda@Edge là một dịch vụ sử dụng các Lambda function để tự custom content tại các Egde Location dựa trên các attribute trong request. Điều này giúp bạn tận dụng được các dữ liệu, tại mỗi Edge Location khác nhau và cũng custom được các response.

Như các dịch vụ CDN khác, CloudFront cũng hỗ trợ các thống kê và báo cáo hoạt động:
- Request & data tranfer trends
- Error Rate
- Cache statistics
- Access logs

Có 3 đặc tính của CloudFront có thể hỗ trợ bạn trong việc kinh doanh của hệ thống thông qua các báo cáo này
- Popular Objects: Các tài nguyên được sử dụng nhiều nhất
- Viewer: Thống kê địa điểm, browser/OS, thiết bị (Desktop, mobile, ...)
- Referrer: Các traffic trên hệ thống được đến từ đâu

**2.5 Cách thức hoạt động**

![](https://images.viblo.asia/8b74cd60-34ac-462b-a594-3df1182e0c3a.png)

Đầu tiên sử dụng CloudFront để chỉ rõ ra Origin Server, đây là nơi dùng để lưu trữ content, ví dụ như S3 hay chính Server của bạn. Đây sẽ là nơi mà CloudFront lấy dữ liệu và sau đó phân phối tới các Edge Locations trên khắp thế giới.

Khi có request đến, Edge Locations sẽ trả về dữ liệu luôn nếu như dữ liệu cần thiết đang được cache trên Edge Locations đó. Nếu không, CloudFront sẽ Request đến Origin Server để lấy dữ liệu đó, lưu lại tại cache của Edge Location và trả dữ liệu cho Request.

Các Origin Server này cũng có thể chỉ ra các Origin Server backup (một hoặc nhiều). CloudFront sẽ tự động Scales dựa trên nhu cầu sử dụng của Content đó, giúp giảm tải cho một server origin nhằm tăng trải nghiệm người dùng.

CloudFront sẽ tự động routing các request tới địa điểm thích hợp nhất dựa trên vị trí xuất phát của request đó để đem lại Performance nhanh nhất có thể.


Nguồn tham khảo:

https://app.pluralsight.com/library/courses/aws-network-design-getting-started

https://aws.amazon.com/cloudfront/

https://www.hostinger.vn/huong-dan/cdn-la-gi/

http://hanhtranglaptrinh.vn6.vn/toi-uu-amazon-s3-voi-amazon-cloudfront/

https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_Origin.html