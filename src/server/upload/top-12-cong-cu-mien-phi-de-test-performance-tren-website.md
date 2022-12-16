Performance của một trang web ảnh hưởng nhiều về mặt business, nó không phải là một yếu tố bắt buộc nhưng lại là một trong các tiêu chí quan trọng mà các doanh nghiệp mong muốn trong sản phẩm của họ. Các công cụ dưới đây là sự bổ sung đáng mong đợi..


**Performance mang lại giá trị gì?**

Trước khi nói về các tool, hãy cân nhắc về thời gian tải (load time) và giá trị của Performance. Chỉ khi hiểu được performance là chìa khóa quan trọng trong trải nghiệm của người dùng, bạn sẽ tìm hiểu về các công cụ để hỗ trợ kiểm tra thời gian tải của người dùng. Có nhiều quy tắc và công cụ về performance nhưng chung quy lại chỉ số performance là quan trọng nhất cần phải chú ý.

Thế nào là một ứng dụng web có tốc độ tải nhanh? Dưới đây là một số số liệu tham khảo
- Dưới 100ms được xem là tức thời
-  Từ 100ms -300ms là khoảng deplay có thể cảm nhận được
- 1s là giới hạn để dòng suy nghĩ của người dùng không bị gián đoạn
- 2s là khoảng thời gian mà user mong đợi một trang web load xong
-  Nếu thời gian tải là 3-4s, user có thể từ bỏ việc tiếp tục thao tác trên trang web đó
-  10s là khoảng thời gian giới hạn mà user có thể tập trung được

Mục đích của Performace testing là để kiểmt tra ứng dụng của bạn sẽ hoạt động như thế nào trong điều kiện phải load (tải) nhiều. Trước tiên, chúng ta cần hiểu Performance cơ bản của ứng dụng và performance của mỗi transaction (tiến trình xử lý một yêu cầu hoặc giao dịch). Ví dụ như trong một ứng dụng thương mại điện tử tiến trình xử lý Home page (home page transaction) trong khi tiến trình xử lý thanh toán phức tạp hơn và đôi khi phải sử dụng dịch vụ thanh toán của bên thứ ba, dịch vụ ship,.. nên sẽ chậm hơn. 
Để user có được trải nghiệm tốt nhất, chúng ta phải kiểm tra các luồng xử lý thông dụng nhất của người dùng và hiểu rõ hiệu suất cả bên browser và trên server.
Để hoàn thành công việc này, chúng ta cần các server- side, client- side, công cụ hỗ trợ test performance, chúng ta có thể tìm được các source free và open để sử dụng.


**Tool để kiểm tra Performance từ phía máy chủ?**

Apache Bench và Siege là 2 công cụ để kiểm tra số request mà server có thể chịu được trên mỗi giây. Nếu chúng ta chỉ quan tâm đến số request gửi lên server mà nó chịu được thì đây là một công cụ tuyệt vời. Tuy nhiên nếu cần một công cụ để kiểm tra với các giao dịch phức tạp và tạo ra mức đồng bộ cao thì nên sử dụng Locust.io và một số công cụ dưới đây.

* Locust.io: Đây là một công cụ tuyệt vời để hiểu hiệu suất ở phía máy chủ.
* Bees with Machine Guns: mà công cụ có thể tạo ra nhiều bees (ví dụ mirco EC2) để tấn công hệ thống, kiểm tra sức chịu đựng của ứng dụng web.
* Multi-Mechanize: Là một mã nguồn mở kiểm tra hiệu năng và tải (load) dùng lệnh Python. Nó thường được sử dụng để kiểm tra hiệu suất và khả năng mở rộng của web, chúng ta cũng có thể sử dụng Multi-Mechanize để tạo ra một khối lượng workload chống lại các API remote.
* Siege: Tiện ích load- testing, nó cho phép developer đo lươngd code theo thời gian, Siege hỗ trợ những xác thực cơ bản, cookie, HTTP và HTTPs, cho phép người dùng truy cập  server với số lượng browser có thể cấu hình được. 
* Apache Bench: Sử dụng công cụ này để đo điểm chuẩn cho Apache HTTP server.
* Httperf: Công cụ này đo hiệu suất máy chủ, nó có thể tạo ra số HTTP khác nhau và đo hiệu suất với các trường hợp đó. Trọng tâm của nó không phải là một tiêu chuẩn cụ thể mà là cung cấp một công cụ mạnh mẽ, hiệu suất cao, tạo điều kiện thuận lợi để xây dựng các tiêu chuẩn vi mô và vĩ mô. Ba đặc điểm khác biệt của Httperf là vững mạnh, nó bao gồm khả năng tạo và duy trì trạng thái overload ở máy chủ; hỗ trợ HTTP/1.1 và SSL; nó có khả năng mở rộng workload và đo lường performance.
* Jmeter: Sử dụng Apache Jmeter để kiểm tra performance trên cả tài nguyên động và tài nguyên tĩnh (files, servlets, Perl scripts, Java objects, databases, queries, FTP servers,...) Chúng ta có thể sử dụng nó để mô phỏng trạng thái load trên server, network Hoặc có thể dử dụng để phân tích đồ họa of performance hoặc test server/script/ hành vi của đối tượng dưới heavy load.

**Tool để kiểm tra Performance từ phía máy khách (client)**

Một số công cụ tốt nhất để kiểm tra  như là:
Google PageSpeed Insights là một dịch vụ phân tích nội dung của trang web và đưa ra các đề xuất để trang web của bạn load nhanh hơn. Giảm thời gian tải trang giúp tỷ lệ thoát trang và tăng tỷ lệ chuyển đổi.

![](https://images.viblo.asia/3283ad62-3512-42dd-a0b5-5135185acc23.PNG)

**Tool để kiểm tra Performance thực tế**

Sitespeed.io là một công cụ để đánh giá performance từ client từ các trình duyệt thực. Công cụ nguồn mở này phân tích trang web của bạn về tốc độ và performance dựa trên hiệu suất tốt nhất và các khoảng thời gian đo được. Chúng ta có thể phân tích một trang web hoặc phân tích và so sánh nhiều trang web.

![](https://images.viblo.asia/fd083d25-5611-4b44-9e4f-7aeeec0d408e.png)

Không phải lúc nào các nhóm cũng có thể thay đổi ứng dụng để tối ưu hóa hiệu suất từ máy khách, cho nên Google đã đầu tư vào việc tạo ngx_pagespeed và mod_pagespeed làm tiện ích mở rộng để tự động cải tiến hiệu suất mà không cần đổi mã. Dưới đây sẽ là những hữu ích khác của công cụ:

* Google ngx_pagespeed tăng tốc trang web và giảm thời gian tải trang, các module của mã nguồn nginx sẽ tự động áp dụng (CSS, Javascript, hình ảnh) để performace của page là tốt nhất mà không yêu cầu devs phải sửa đổi nội dung hoặc workflow.

* Google mod_pagespeed: tương tự như Google ngx_pagespeed, nó tăng tốc trang web và giảm thời gian tải trang. Module máy chủ Apache HTTP tự động áp dụng (CSS, Javascript, hình ảnh) để cải tiến và hiệu suất của web mà không yêu cầu devs phải sửa đổi nội dung hoặc workflow.

* WebPagetest.org cung cấp miễn phí những hiểu biết về hiệu suất từ phía client trên nhiều trình duyệt thực. Tiện ích này sẽ kiểm tra một trang web trong bất kỳ trình duyệt nào, từ bất kỳ vị trí nào, trong bất kỳ điều kiện về network nào.

https://techbeacon.com/app-dev-testing/web-performance-testing-top-12-free-open-source-tools-consider