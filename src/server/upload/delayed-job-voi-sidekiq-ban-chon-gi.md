![](https://images.viblo.asia/de1862f9-985e-4e9e-9c12-f8962570977f.png)

Vài tuần trước tôi đã đặt ra một câu hỏi trên [Reddit](https://www.reddit.com/r/rails/comments/99x86q/delayedjob_or_sidekiq_which_should_i_use/), yêu cầu những người contributors cho tôi biết tôi nên sử dụng background job nào cho một dự án mới, Delayed Job hoặc Sidekiq. Tôi lấy phản hồi của mọi người và viết hướng dẫn nhỏ tiện dụng này.

Chọn framework phù hợp để xử lý các tác vụ chạy tốn thời gian (như gửi email hoặc chạy báo cáo với Amazon Redshift) nền tảng là rất quan trọng nếu bạn muốn các ứng dụng web dựa trên Ruby on Rails của bạn chạy trơn tru.
Khi bạn đang cố gắng chọn sử dụng framework nào, so sánh ưu và nhược điểm của từng framework giúp xóa ảnh. Trong bài đăng này, tôi sẽ giúp bạn làm điều đó bằng cách so sánh hai frameworks nền Rails phổ biến là **Delayed Job** và **Sidekiq**. 

![](https://images.viblo.asia/e476c3ba-0703-4d4b-8071-6d639695ab3b.png)

### Delayed Job (DJ)
Framework nền Ruby này giúp bạn maintain một bảng job trong database. Điều này giúp bạn theo dõi các nhiệm vụ và biết vị trí của từng nhiệm vụ trong vòng đời của job đó. Dưới đây là một số ưu và nhược điểm quan trọng cần xem xét khi sử dụng [Delayed Job](https://github.com/collectiveidea/delayed_job):

![](https://images.viblo.asia/6ac04427-9c68-4944-b9ef-1c0e34a09841.jpg)

#### 1.  Thuận lợi:
* **Tích hợp dễ dàng với Rails:**
Cho dù bạn đang sử dụng cơ sở dữ liệu quan hệ hoặc cơ sở dữ liệu không quan hệ(non-relational database), bạn có thể dễ dàng tích hợp DJ với Rails.
* **Lưu trữ dữ liệu tùy chỉnh:** Một trong những lợi ích chính của việc sử dụng DJ là bạn có thể sử dụng kho dữ liệu chính của mình. Điều này rất hữu ích vì nó cho phép bạn kiểm soát việc xử lý ngoại tuyến và cho phép bạn tùy chỉnh kho dữ liệu của mình để phù hợp với nhu cầu của bạn.
* **Tối thiểu hóa các dependencies:**  DJ cho phép bạn giữ dependencies ở mức tối thiểu. Điều đó có nghĩa là bạn không phải chạy nhiều dependencies cùng một lúc.
Ví dụ: nếu bạn chỉ cần ba services để chạy chương trình của mình, DJ sẽ vượt qua Sidekiq. Thay vì yêu cầu nhiều services và dependencies để chạy chương trình của bạn một cách hiệu quả, bạn có thể giới hạn các dependencies mà bạn cần. Điều này làm cho việc sử dụng framework hiệu quả hơn liên quan đến việc sử dụng tài nguyên so với Sidekiq.
* **Tiến trình đáng tin cậy:** Nhờ tuổi thọ của nó, DJ cung cấp sự ổn định và độ tin cậy khi xử lý các background job. Nó đã giúp Shopify xử lý một số nhiệm vụ, bao gồm cập nhật công cụ tìm kiếm và phân phối bản tin.
#### 2.  Khó khăn:
* **Performance**: Mặc dù một số người đã tuyên bố chạy DJ mỗi giây với tốc độ nhanh ngay cả trên phần cứng lẻ, nhưng nếu so sánh về hiệu suất thì đa số sẽ nói DJ kém hơn Sidekiq.
* **Phụ thuộc với cơ sở dữ liệu**: Vì DJ phụ thuộc rất nhiều vào cơ sở dữ liệu, bạn có thể gặp phải sự cố nếu bạn có một job bị xếp hàng tồn đọng có thể quá nhiều để cơ sở dữ liệu của bạn xử lý. Đó là bởi vì có một ứng dụng và một job dựa trên cùng một cơ sở dữ liệu có thể gây ra gánh nặng cho cơ sở dữ liệu, điều này có thể cản trở việc xử lý.
* **Không có Dashboard**: Nếu không có bảng điều khiển hiển thị trạng thái jobs của bạn trong thời gian thực, có thể khó biết được job nào cần ưu tiên khi bạn cần gỡ lỗi job bị kẹt hoặc thất bại trong quá trình xử lý. Bạn có thể sử dụng gem [delay_job_web](https://github.com/ejschmitt/delayed_job_web), nhưng nó thiếu một số tính năng của bảng điều khiển chính thức.

### Sidekiq
[Sidekiq](https://sidekiq.org/) là một background job scheduler được tạo ra bởi tác giả Mike Perham và là open source. Nó phổ biến trong các doanh nghiệp, như Comcast và Everlane, và lý tưởng cho những người có truy vấn yêu cầu tốc độ nhanh. Dưới đây là một số ưu và nhược điểm quan trọng cần xem xét khi sử dụng Sidekiq:
![](https://images.viblo.asia/9c0d00b2-439d-4c39-af29-f464d5bb1fec.jpg)
#### 1.  Thuận lợi:
* **Tốc độ siêu nhanh**: Tốc độ là một trong những lý do hàng đầu khiến các nhà phát triển lựa chọn Sidekiq. Đó là bởi vì Sidekiq được hỗ trợ bởi Redis, một kho lưu trữ dữ liệu chủ yếu là bộ nhớ và được sử dụng làm cơ sở dữ liệu. Điều này làm cho việc truy xuất và tạo dữ liệu nhanh hơn nếu framework dựa hoàn toàn vào cơ sở dữ liệu. Sidekiq chỉ mất 22 giây để xử lý tới 100.000 công việc so với 465 của DJ.
* **Đa luồng**: Khi bạn cần tính đồng thời cao, thì Sidekiq là cơ sở dữ liệu lý tưởng để chọn. Sidekiq cung cấp tính đồng thời cao hơn DJ nhờ khả năng đa luồng của nó. Điều này có nghĩa là nhiều jobs có thể được xếp hàng trong background trước khi được xử lý mà không ảnh hưởng đến quy trình làm việc đồng bộ trong ứng dụng của bạn. Nó cũng theo yêu cầu và có sẵn bất cứ khi nào bạn cần.
* **Tự động chạy Redis**:  Với Sidekiq, bạn có thể dựa vào nó để tự động chạy Redis. Điều này giúp dễ dàng set up và ý tưởng hóa nếu bạn không muốn đưa trực tiếp vào hàng đợi trong bộ đệm chính của mình. Bạn cũng có thể dễ dàng thêm nó dưới dạng một ứng dụng hoặc sử dụng một cá thể Redis trên các nền tảng clound khác nhau, chẳng hạn như Heroku.
* **Khả năng mở rộng.**: Điều tuyệt vời khi sử dụng Sidekiq là bạn có thể mở rộng quy mô dự án của mình nếu cơ sở khách hàng của bạn tăng lên nhờ các gói nâng cấp cao cấp của Sidekiq là Pro và Enterprise. Điều này sẽ rất lý tưởng khi bạn sẵn sàng mở rộng quy mô khi phát triển từ một doanh nghiệp nhỏ thành một doanh nghiệp lớn.
* **Cung cấp một API hợp lý và đơn giản.**: API của Sidekiq rất rõ ràng và cung cấp tính linh hoạt vì bạn có thể tạo kịch bản cho giao diện người dùng web (UI) với API. Vì API của Sidekiq public nên bạn có thể xem hàng đợi và tác vụ trong thời gian thực. Nó cũng có một bảng điều khiển thời gian thực, cung cấp cái nhìn sâu sắc về tình trạng của công việc và hàng đợi.
* **Hỗ trợ nâng cao**: Ngoài Ruby ra thì Java cũng có thể sử dụng Sidekiq. Bạn cũng có thể tận hưởng dịch vụ hỗ trợ chuyên dụng qua email khi đăng ký các dịch vụ của gói Pro và Enterprise.
#### 2.Khó khăn
* **Phụ thuộc nhiều vào Redis**: Nếu bạn không có Redis trong môi trường nhà phát triển của mình, thì Sidekiq có thể không phải là framework tốt nhất để sử dụng. Thay vì sử dụng cơ sở dữ liệu để lưu trữ các công việc sắp tới của bạn, Sidekiq sử dụng Redis. Điều đó sẽ rất khó khăn nếu bạn không quen thuộc với Redis.
* **Mất mát dữ liệu**: Nếu Redis gặp sự cố trong khi bạn đang xếp hàng hoặc có 1 job trong hàng đợi, bạn sẽ mất dữ liệu. Điều này là do Redis là một kho lưu trữ dữ liệu có cấu trúc dữ liệu trong bộ nhớ.
* **Yêu cầu vài dependencies**:  Để chạy thành công Sidekiq, nó đòi hỏi một số services khác. 

### Cuối cùng...
Cả Sidekiq và Delayed Job đều cung cấp các giải pháp tuyệt vời để xử lý các background jobs. Bạn cần xem xét nhu cầu của bạn về các yếu tố: hỗ trợ, đơn giản, hiệu suất, ổn định và khả năng phục hồi mà bạn đưa ra quyết định của mình. Chúc may mắn!

Nguồn dịch: [https://www.sqlbot.co/blog/delayed-job-vs-sidekiq-which-one-should-you-choose](https://www.sqlbot.co/blog/delayed-job-vs-sidekiq-which-one-should-you-choose)