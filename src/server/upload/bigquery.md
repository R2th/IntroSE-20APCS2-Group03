Bài viết sau được dịch từ link: https://cloud.google.com/bigquery/

BigQuery là một dịch vụ lưu trữ dữ liệu không cần máy chủ, có khả năng mở rộng và giá thành rẻ của Google được thiết kế để trợ giúp các nhà phân tích dữ liệu.  Do không cần quản lý cơ sở hạ tầng nên bạn có thể tập trung vào phân tích dữ liệu để tìm ra các thông tin chi tiết có ý nghĩa bằng việc sử dụng các SQL quen thuộc. Hơn nữa, bạn cũng không cần quản trị cơ sở dữ liệu.  BigQuery giúp bạn phân tích tất cả dữ liệu bằng việc tạo ra một kho chứa dữ liệu được sắp xếp một cách khoa học theo cột và bảng tính. BigQuery giúp cho việc chia sẻ dữ liệu trong và ngoài tổ chức dưới dạng bộ dữ liệu, truy vấn, bảng tính và báo cáo trở nên dễ dàng hơn. BigQuery cho phép các tổ chức nắm bắt và phân tích dữ liệu trong thời gian thực nhờ khả năng nhập thông tin trực tiếp nhanh chóng, nhờ đó mà thông tin chi tiết của bạn luôn được cập nhật. BigQuery cho phép dùng miễn phí lên tới 1TB dữ liệu phân tích mỗi tháng và 10GB dữ liệu lưu trữ. 

{@youtube: https://youtu.be/eyBK9nj-7AA}


**Thiết lập và xử lý nhanh chóng**

Hãy nhanh chóng thiết lập kho dữ liệu của bạn và bắt đầu truy vấn dữ liệu ngay đi nào. Google BigQuery chạy các truy vấn SQL cực nhanh từ dạng gigabyte đến petabyte và giúp việc kết hợp các tập dữ liệu công khai hoặc thương mại với dữ liệu của bạn trở nên dễ dàng hơn. Hãy loại bỏ việc cung cấp cơ sở hạ tầng gây mất thời gian và giảm thời gian chết của bạn bằng một cơ sở hạ tầng không hề có máy chủ có thể xử lý tất cả quá trình bảo trì một cách liên tục, kể cả việc fix lỗi và nâng cấp. Google BigQuery sử dụng các SQL quen thuộc tuân thủ tiêu chuẩn ANSI và cung cấp các trình điều khiển ODBC và JDBC giúp cho việc tích hợp dữ liệu của bạn trở nên nhanh chóng và dễ dàng.

![Fast](https://cloud.google.com/images/products/bigquery/getup-running-fast.svg)

**Mở rộng liên tục**

Hãy loại bỏ vấn đề nan giải mang tên lên kế hoạch về dung lượng kho dữ liệu và chuyển sang một kho dữ liệu vô hạn với khả năng mở rộng cũng không giới hạn. Google BigQuery có thể giải quyết vấn đề về phân tích thời gian thực nhờ tận dụng cơ sở hạ tầng không cần máy chủ của Google với khả năng tự động mở rộng quy mô và tính năng nhập trực tuyến hiệu suất cao để tải dữ liệu. Bộ nhớ được quản lý theo cột của BigQuery cùng quy trình thực thi song song với số lượng lớn và tính năng tối ưu hóa hiệu suất tự động giúp người dùng có thể phân tích dữ liệu một cách đồng thời và nhanh chóng mà không bị ảnh hưởng bởi số lượng người dùng hay kích cỡ của dữ liệu.

![Fast](https://cloud.google.com/images/products/bigquery/scale-seamlessly.svg)

**Tăng tốc hiểu biết về dữ liệu của bạn nhờ sức mạnh của phân tích**

Bạn có thể phân tích thông tin nhanh hơn mà không cần sao chép hay dịch chuyển dữ liệu. BigQuery cung cấp cho bạn một cái nhìn tổng quát về dữ liệu bằng việc query liền mạch những dữ liệu được lưu trữ và quản lý bởi Big Query, Google Cloud, Google Cloud Big Table, Google sheet & Google Drive. BigQuery sẽ tích hợp với những công cụ ETL hiện có và Talend để gia tăng những dữ liệu bạn đã dùng.  BigQuery còn hỗ trợ các công cụ BI như Tableau, MicroStrategy, Looker, Google DataStudio mà không yêu cầu phần mềm đặc dụng, nhờ đó mà ai cũng có thể tạo ra những bản báo cao hay trang tổng quan thật đẹp mắt. Bạn còn có thể tự động nhập và trực quan hóa Google Ad và các dữ liệu tiếp thị với dịch vụ chuyển dữ liệu của BigQuery để thiết lập một kho lưu trữ dữ liệu tiếp thị công suất cao chỉ bằng vài cú nhấp chuột.

![Fast](https://cloud.google.com/images/products/bigquery/powerful-analysis.svg)

**Bảo vệ dữ liệu công việc và những khoản đầu tư của bạn**

Hãy thử trải nghiệm năng suất, độ bảo mật và những chức năng chưa từng có với mức giá vừa túi tiền của bạn. Google BigQuery sẽ loại bỏ gánh nặng về điều hành dữ liệu bằng cách cung cấp dịch vụ sao chép dữ liệu tự động để khôi phục sau thảm họa và khả năng xử lý cao mà không phải trả thêm phí.Google BigQuery cung cấp hợp đồng SLA (giữa khách hàng và nhà cung cấp dịch vụ) 99.9% và cũng tuân thủ những thỏa thuận an toàn của Mỹ và Liên minh Châu  u. BigQuery giúp cho việc duy trì tính bảo mật với nhận dạng chi tiết và quyền kiểm soát quản lý truy cập trở nên dễ dàng hơn. Dữ liệu trên BigQuery luôn được mã hóa, lưu trữ hoặc luân chuyển.

![Fast](https://cloud.google.com/images/products/bigquery/business-data-investments.svg)