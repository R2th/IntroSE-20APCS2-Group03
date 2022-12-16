Dự án Prometheus của Cloud Native Computing Foundation ([CNCF](https://www.cncf.io)) là một giải pháp giám sát và cảnh báo mã nguồn mở phổ biến, được tối ưu hóa cho các môi trường bộ chứa (container). Prometheus hiện nay đang dần trở thành tiêu chuẩn cho việc xây dựng hệ thống giám sát cho các ứng dụng chạy trên Kubernetes. Tuy nhiên, nhiều ứng dụng trong hệ thống của bạn có thể là ứng dụng của bên thứ ba và dịch vụ đám mây, vốn không hiển thị các chỉ số định dạng Prometheus. Ví dụ, Linux không hiển thị các chỉ số (metrics) được định dạng phù hợp với Prometheus. Đó là lý do tại sao các Prometheus Exporters, như nhà xuất Node Exporter tồn tại. Bạn có thể tải xuống và chạy nó để hiển thị hàng trăm chỉ số cho hệ điều hành.

Đối với mỗi lần tích hợp, mình thường dành khá nhiều thời gian để cố gắng tìm ra phiên bản của Exporter, Dashboard (trang tổng quan) và cảnh báo Prometheus phù hợp, tốt nhất mà mình nên sử dụng, cách thiết lập chúng và cách cập nhật phiên bản mới nhất... . Qua bài viết này, mình sẽ giới thiệu cho các bạn một số hướng dẫn hữu ích để có thể giám sát các ứng dụng và dịch vụ đám mây với các Prometheus Exporters một cách hiệu quả.

# Tìm Exporter phù hợp
Khi bạn bắt đầu sử dụng Prometheus, bạn sẽ nhanh chóng nhận thấy rằng có rất nhiều Exporter có sẵn để giám sát các ứng dụng của bạn. Và từ đó, bạn sẽ có một vấn đề về sự lựa chọn, liệu Exporter nào là phù hợp?

Đầu tiên để giải quyết vấn đề này, bạn có thể tự đánh giá các ứng viên là các Exporters cụ thể đáp ứng yêu cầu của bạn như thế nào, có cung cấp được các chỉ số mà bạn quan tâm hay không và cả mức độ phát triển của nó với tư cách là một dự án phần mềm. Ví dụ, một Exporter được phát triển cách đây nhiều năm, không có bảnn cập nhật gần đây, số lượng pull request, issue, sao trên Github thấp có khả năng không được sử dụng và không được hỗ trợ.

Tiếp đến, để có thể có được sự so sánh rõ ràng về nhiều khía cạnh khác nhau của một Exporter, bạn nên tham khảo một số danh sách đánh giá và sắp xếp. Điểm dừng đầu tiên của bạn nên là trang [EXPORTERS AND INTEGRATIONS](https://prometheus.io/docs/instrumenting/exporters/#exporters-and-integrations) trên trang web chính thức của Prometheus. Nếu một Exporter được liệt kê cho ứng dụng hoặc giao thức mà bạn sử dụng thì nó có thể là một lựa chọn tốt.

Ngoài ra còn có các danh sách các Exporter của các bên thứ ba như [PromCat.io](promcat.io) do Sysdig duy trì hay [Default port allocations
](https://github.com/prometheus/prometheus/wiki/Default-port-allocations) cũng cung cấp danh sách các Exporters một cách khá toàn diện. Ví dụ như PromCat giúp bạn tiết kiệm thời gian chọn và kiểm tra các Prometheus exporters, dashboards và cả cảnh báo, Sysdig duy trì trang web này và liên tục kiểm tra nội dung để đảm bảo rằng nó đang hoạt động chính xác.
![](https://images.viblo.asia/70e3fdcb-efb5-442a-9f5f-dbbc24e4eaf2.png)

# Kiểm tra các chỉ số của Exporter
Mỗi nhà Exporter sẽ có bộ số liệu (metrics) riêng. Thông thường chúng sẽ được mô tả trên trang dự án của Exporter, mặc dù đôi khi bạn phải xem trong phần help hoặc documentation :))). Nếu  sử dụng định dạng [OpenMetrics](https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md) thì nó có thể thêm các trường với thông tin bổ sung như loại, thông tin, đơn vị vào số liệu.
![](https://images.viblo.asia/b143bf51-fbef-4dc0-9a14-c5c3d99857b3.png)

Một điểm khác cần chú ý trong tài liệu của Exporter là việc sử label. Các label có thể cung cấp ngữ cảnh: “Đây là môi trường production hay devlopment?”, “Dịch vụ đang chạy trên máy chủ nào?”, “Dịch vụ này dành cho ứng dụng nào?” Ví dụ: team backend và team analytics có thể có các phiên bản MySQL riêng biệt. Sau đó, bạn sẽ muốn lọc các số liệu của chúng, được phân loại theo ứng dụng, môi trường (production hay development)... . 

Ngoài việc sử dụng các label để phân tích những gì đang xảy ra bên trong ứng dụng, chúng rất hữu ích khi tổng hợp các số liệu trên tất cả các hệ thống đã triển khai. Việc sử dụng label đúng cách có thể giúp trả lời các câu hỏi như "Tất cả các ứng dụng trên toàn hệ thống hiện đang sử dụng bao nhiêu bộ vi xử lý?" hoặc "Tổng mức sử dụng RAM của tất cả các ứng dụng thuộc sở hữu của nhóm frontend ở một khu vực cụ thể là bao nhiêu?" Bạn có thể tìm hiểu thêm một vài ví dụ về label tại [đây](https://prometheus.io/docs/practices/naming/#labels).
# Thiết lập các cảnh báo thực sự hữu ích
Thiết lập cảnh báo có thể là một thách thức cho bạn. Nếu bạn đặt một ngưỡng thấp cho các cảnh báo, team support có thể sẽ chán nản nhanh chóng, hoặc thậm chí phải bỏ lơ sau khi bị spam cả một đống cảnh báo ngày đêm :D. Mặt khác, nếu các cảnh báo không hoạt động vào đúng thời điểm, thì bạn có thể bỏ lỡ thông tin quan trọng và điều này có thể ảnh hưởng đến người dùng cuối.

Bước đầu tiên để tìm ra bất kỳ chiến lược cảnh báo nào là hiểu các ứng dụng của bạn và điều này cũng áp dụng cho các Prometheus Exporter. Trong muôn vàn các chỉ số khác nhau, bạn cần phải xác định những yếu tố quan trọng nào sẽ cần cảnh báo cho ứng dụng của bạn, dựa trên mục đích sử dụng, tình trạng và hiệu suất thực tế của ứng dụng.

Prometheus sử dụng [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) là ngôn ngữ truy vấn cho phép người dùng chọn và tổng hợp dữ liệu chuỗi thời gian trong thời gian thực. Vì vậy bạn cũng nên lựa chọn làm việc với các công cụ thiết lập cảnh báo sử dụng PromQL native, nó có thể giúp bạn tiết kiệm thời gian, vì bạn không cần phải dịch chúng sang một định dạng khác, vốn có nhiều lỗi. Ví dụ, promtool sẽ giúp [kiểm tra cấu hình cảnh báo](https://prometheus.io/docs/prometheus/latest/configuration/unit_testing_rules/) với PromQL (và không chỉ điều này).

Cuối cùng, cảnh báo của bạn cũng luôn luôn cần phải được thông tin đến người quản trị hoặc team support một cách kịp thời nhất có thể nhé. Vì vậy, ngoài việc thiết lập cảnh báo cho bất kỳ số liệu hoặc sự kiện nào, bạn cũng có thể gửi cảnh báo đến email, Slack, Pagerduty, Service Now,... .

# Cung cấp dữ liệu cho nhóm của bạn
Giờ đây, sau khi bạn đã có thông tin có giá trị từ các Prometheus Exporter mà bạn sử dụng để theo dõi, hãy đảm bảo rằng tất cả các thành viên trong team của bạn có thể xem và sử dụng thông tin đó. Cách phổ biến nhất để tương tác với các số liệu là trực quan hóa trên trang tổng quan.

PromQL là một ngôn ngữ truy vấn mạnh mẽ cho các số liệu được thu thập bởi các Prometheus Exporter. Với PromQL, bạn có thể thực hiện các phép toán phức tạp, phân tích thống kê và các chức năng khác nhau. Mặc dù việc trở nên thành thạo PromQL luôn là mục tiêu bạn nên hướng tới, thế nhưng nếu bạn là một người mới bắt đầu với Prometheus, với Exporter, hãy đảm bảo rằng công cụ visualization bạn lựa chọn cho phép bạn dễ dàng nhập dữ liệu vào trang tổng quan thông qua biểu mẫu web nhé. Ví dụ như Grafana - công cụ visualization tích hợp với Prometheus phổ biển nhất hiện nay.

# Kế hoạch mở rộng quy mô
Cuối cùng, khi bạn sử dụng Prometheus, số lượng Exporter có thể sẽ không ngừng tăng lên và các vấn đề về khả năng hiển thị, mở rộng quy mô theo chiều ngang và lưu trữ dài hạn có thể phát sinh. Cách tốt nhất là lập kế hoạch trước cho các trường hợp mở rộng quy mô về lượng số liệu thu thập. Để giải quyết các vấn đề về quy mô này, bạn có thể thử hợp nhất Grafana, tìm hiểu thêm về cách triển khai [Thanos](https://thanos.io/) hay [Cortex](https://cortexmetrics.io/) hoặc cũng có thể lựa chọn sử dụng giải các giải pháp thương mại.

# Tạm kết
Monitoring với Prometheus đang là một trong những xu hướng DevOps hàng đầu. Bạn sẽ cần các Exporter để giám sát các ứng dụng và dịch vụ đám mây quan trọng. Điều quan trọng cần nhớ là không phải tất cả các Exporter đều giống nhau và các giải pháp giám sát có thể chưa sẵn sàng để mở rộng quy mô. Mình hy vọng những tips nhỏ này sẽ giúp bạn thành công trong việc giám sát bằng cách sử dụng các Exporter đúng nhất, tìm kiếm các dự án được duy trì tốt, hiểu các chỉ số của bạn và lập kế hoạch tăng trưởng cho lâu dài.
# References
- https://prometheus.io/
- https://sysdig.com