**RabbitMQ là gì?**

Với lập trình viên thì rabbitmq rất đáng giá, nếu không có các hệ thống message broker như rabbitmq thì bất cứ lúc nào cần đẩy data giữa các thành phần trong hệ thống, lập trình viên cần một kết nối trực tiếp. Thật ra, RabbitMQ chỉ là một message broker được sử dụng giao thức AMQP - Advanced Message Queue Protocol, nó được lập trình bằng ngôn ngữ Erlang, ngoài ra nó cung cấp cho lập trình viên một phương tiện trung gian để giao tiếp giữa nhiều thành phần trong một hệ thống lớn.Với cách này, RabbitMQ sẽ nhận message đến từ các thành phần khác nhau trong hệ thống, lưu trữ dữ liệu an toàn trước khi đẩy đến đích.

Hệ thống càng lớn, mức độ trao đổi message giữa càng thành phần cũng vì thế tăng lên khiến việc lập trình trở nên phức tạp. Đã từng có thời kì, các lập trình viên chỉ nên tập trung vào business logic của ứng dụng còn các công tác hậu trường thì nên được tái sử dụng các giải pháp đã có. Rabbitmq cũng là một giải pháp rất tốt trong các kiến trúc hệ thống lớn.

**Có nên dùng RabbitMQ?**

Trong một hệ thống phân tán sẽ có rất nhiều thành phần khác nhau. Nếu muốn các thành phần này giao tiếp được với nhau thì chúng phải biết nhau, nhưng điều này lại gây rắc rối cho việc viết code. Một thành phần phải biết quá nhiều đâm ra rất khó maintain, debug. Giải pháp ở đây là thay vì các liên kết trực tiếp, khiến các thành phần phải biết nhau thì sử dụng một liên kết trung gian qua một message broker. Với sự tham gia của message broker thì producer sẽ không hề biết consumer. Nó chỉ việc gửi message đến các queue trong message broker. Consumer chỉ việc đăng ký nhận message từ các queue này.

Có thể hiểu, vì producer nói chuyện với consumer trung gian qua message broker nên dù producer và consumer có khác biệt nhau về ngôn ngữ thì giao tiếp vẫn thành công. Dù viết bằng java, python, php hay ruby... thì chỉ cần thỏa mãn giao thức với message broker thì thông suốt hết. HIện nay, rabbitmq cũng đã cung cấp client library cho khá nhiều các ngôn ngữ rồi. Tính năng này cho phép tích hợp hệ thống linh hoạt.

**Các loại Exchange trong Rabbitmq**

Có 5 loại Exchange: direct, topic, fanout, headers.

**Direct Exchange**

Chức năng của Direct exchange là đẩy message đến hàng chờ đợi dựa theo khóa định tuyến routing key. Loại trao đổi trực tiếp này khá hữu ích khi bạn muốn phân biệt các thông báo được xuất bản cho cùng một trao đổi bằng cách sử dụng một mã định danh chuỗi đơn giản.

**Fanout Exchange**

Chức năng của Fanout exchange sẽ đẩy message đến toàn bộ hàng đợi gắn với nó. Nó được xem là một bản copy message tới tất cả những hàng đợi với bất kể một routing key nào. Nếu được đăng ký thì nó sẽ bị bỏ qua. Exchange này hữu ích với trường hợp ta cần một dữ liệu được gửi tới nhiều thiết bị khác nhau với cùng một message nhưng cách xử lý ở mỗi thiết bị, mỗi nơi là khác nhau.

**Topic Exchange**

Topic exchange sẽ làm một wildcard để gắn routing key với một routing pattern khai báo trong binding. Consumer có thể đăng ký những topic mà nó quan tâm. Cú pháp được sử dụng ở đây là * và #.

**Headers Exchange**

Một header exchange sẽ dùng các thuộc tính header của message để định tuyến. Headers Exchange rất giống với Topic Exchange, nhưng nó định tuyến dựa trên các giá trị tiêu đề thay vì các khóa định tuyến. Một thông điệp được coi là phù hợp nếu giá trị của tiêu đề bằng với giá trị được chỉ định khi ràng buộc.

**Dead Letter Exchange**

Nếu không tìm thấy hàng đợi phù hợp cho tin nhắn, tin nhắn sẽ tự động bị hủy. RabbitMQ cung cấp một tiện ích mở rộng AMQP được gọi là “Dead Letter Exchange” — Cung cấp chức năng để chụp các tin nhắn không thể gửi được.

**Các tính năng nổi bật của RabbitMQ**

**Liên kết**

Đối với các server cần các kết nối không quá chặt chẽ và có độ tin cậy cao so với clustering cho phép, RabbitMQ cung cấp một mô hình liên kết phù hợp với yêu cầu này.

**Routing linh hoạt**

Tin nhắn sẽ được route thông qua trao đổi trước khi chuyển đến queue. RabbitMQ cung cấp một số loại trao đổi được tích hợp sẵn cho định tuyến logic điển hình. Với các định tuyến phức tạp hơn, bạn có thể liên kết các trao đổi với nhau hoặc thậm chí có thể viết các kiểu trao đổi của riêng bạn như một plugin.

**Clustering/cụm**

RabbitMQ có chức năng nhóm lại với nhau, hợp thành một nhà trung gian duy nhất.

**Độ tin cậy**

RabbitMQ hỗ trợ nhiều tính năng khác nhau cho phép bạn giao dịch các tác vụ một cách tin cậy, với thời gian lưu lâu hơn, xác nhận giao hàng, xác nhận của nhà xuất bản và tính khả dụng cao.

**Queue có tính sẵn sàng cao**

Queue có thể được nhân bản trên một số máy trong một cluster, đảm bảo cho tin nhắn của bạn luôn an toàn ngay cả khi xảy ra tình huống lỗi phần cứng.

**Đa giao thức**

RabbitMQ hỗ trợ messaging thông qua nhiều giao thức messaging khác nhau.

**Đa dạng ứng dụng ngôn ngữ**

RabbitMQ hiện đã được phát triển với hệ ngôn ngữ phong phú bao gồm hầu hết mọi ngôn ngữ bạn có thể nghĩ đến.

**Giao diện quản lý**

Với giao diện quản lý sử dụng dễ dàng, RabbitMQ cho phép bạn theo dõi và kiểm soát mọi vấn đề trong chương trình messaging trung gian.

**Hệ thống plugin**

RabbitMQ hỗ trợ một loạt các phần mở rộng của plugin dưới nhiều hình thức khác nhau hoặc bạn cũng có thể tự viết các tiện ích mở rộng này.

**Tracing/Truy vết**

Nếu hệ thống messaging của bạn bị lỗi hoặc hoạt động không tốt, RabbitMQ sẽ hỗ trợ các thao tác truy vết để giúp bạn hiểu được hệ thống đang hoạt động như thế nào và vấn đề nào đang phát sinh.