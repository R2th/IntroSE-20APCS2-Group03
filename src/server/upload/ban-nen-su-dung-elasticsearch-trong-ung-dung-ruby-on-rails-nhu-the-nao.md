Elasticsearch là một công cụ phân tích và mã nguồn mở mạnh mẽ và linh hoạt, phân tán, theo thời gian thực. Đó là tiêu chuẩn vàng trong công nghệ tìm kiếm. Nó được xây dựng dựa trên thư viện Apache Lucene và cung cấp một giao diện RESTful HTTP mạnh mẽ để truy vấn và lập chỉ mục một lượng lớn dữ liệu có cấu trúc. Ngay từ đầu, nó cung cấp một công cụ tìm kiếm hiệu quả, có thể mở rộng và mạnh mẽ. Đặc điểm chính của Elasticsearch là nó được phân phối ở cốt lõi của nó, có nghĩa là bạn có thể dễ dàng mở rộng quy mô theo chiều ngang để dự phòng hoặc cho vấn đề hiệu suất.

Elasticsearch cũng có thể được sử dụng như một công cụ lưu trữ dữ liệu, nhưng nó có một số nhược điểm:
* Trong Elasticsearch, dữ liệu có sẵn "gần thời gian thực". Có nghĩa là, khi bạn gửi một nhận xét cho một bài đăng và sau đó làm mới trang, nó có thể sẽ không hiển thị vì chỉ mục vẫn đang cập nhật.
* Elasticsearch không cung cấp bất kỳ hệ thống kiểm soát truy cập hoặc bảo mật nội bộ nào. Bạn sẽ cần một tường lửa để bảo vệ ES khỏi sự truy cập từ bên ngoài.
* Ngoài ra còn có hỗ trợ hạn chế cho tính toán nâng cao ở phía cơ sở dữ liệu.
* Sao lưu không được ưu tiên nhiều như các giải pháp lưu trữ dữ liệu khác, mặc dù ES được phân phối và tương đối ổn định. Nếu Elasticsearch là nơi lưu trữ dữ liệu chính của bạn, bạn có thể sẽ phải suy nghĩ lại về nó.
# Những điều bạn cần biết về Elasticsearch:
Elasticsearch không phải hướng đối tượng mà là hướng tài liệu (document-oriented). Nó sử dụng các document để lưu trữ toàn bộ các đối tượng của nó. Các document này được lập chỉ mục để có thể tìm kiếm được. Ở đây, một document thuộc về một loại, trong khi một loại thuộc về một chỉ mục. Mỗi chỉ mục ES có thể được chia thành nhiều phần được gọi là các shard. Khi dung lượng lưu trữ cần thiết của bạn vượt quá khả năng của một nút hoặc máy chủ, điều này sẽ được thực hiện. Nó cũng có thể được sử dụng để tăng hiệu suất của cluster bằng cách song song hóa các hoạt động giữa các shard.

Thời điểm tạo chỉ mục, số lượng primary shard được cố định. Về cơ bản, điều này xác định lượng dữ liệu tối đa được lưu trữ trong chỉ mục của bạn, vì mỗi nút bị ràng buộc bởi số lượng CPU, RAM và I/Os mà nó có thể sở hữu để phù hợp với ít nhất một shard. Bạn chỉ được phép thay đổi số lượng replica shard (bản sao của primary shard) sau khi chỉ mục đã được tạo, mặc dù điều này chỉ ảnh hưởng đến thông lượng của cluster của bạn chứ không ảnh hưởng đến khả năng lưu trữ dữ liệu thực tế.
# Bạn có thực sự cần Elasticsearch?
Thông thường, vấn đề bạn đang cố gắng giải quyết có thể được giải quyết dễ dàng hơn rất nhiều với một số truy vấn SQL nâng cao và có lẽ là một số chỉ mục mới. Nói chung có hai trường hợp sử dụng Elasticsearch có ý nghĩa đó là: tìm kiếm toàn văn bản và để chuẩn hóa dữ liệu phức tạp.

Chúng ta thường cố gắng chuẩn hóa dữ liệu của mình để khớp với các model của chúng ta. Nhưng chúng ta có thể gặp phải một số vấn đề về hiệu suất khi thực hiện việc này khi truy vấn trên các bảng chuẩn hóa. Việc sử dụng công nghệ tìm kiếm như Elasticsearch giúp việc chuẩn hóa dữ liệu đó và truy xuất dữ liệu nhanh hơn nhiều.

Nếu bạn cần Elasticsearch, hướng dẫn bên dưới sẽ giúp bạn bắt đầu:
* Làm theo hướng dẫn cài đặt do Elasticsearch cung cấp.
* Nếu đây là chỉ mục Elasticsearch đầu tiên mà bạn thêm vào dự án, thì bạn sẽ phải cài đặt elasticsearch-rails và elasticsearch-model gems.
* Để định cấu hình gem, bạn sẽ cần file initializer để thiết lập Elasticsearch Client để các model sử dụng.
* Thiết lập chỉ mục trên model khi dự án rails đã sẵn sàng.
* Bước đầu tiên rõ ràng khi thiết lập chỉ mục là định cấu hình chỉ mục trên model bạn muốn tìm kiếm. Tuy nhiên, cách tiếp cận được đề xuất là đóng gói logic lập chỉ mục vào một ActiveSupport::Concern sau đó include vào model của bạn. Hãy nhớ rằng, ở đây bạn chỉ muốn lập chỉ mục các trường / quan hệ mà bạn yêu cầu lập chỉ mục tìm kiếm. Bạn càng lập chỉ mục nhiều trường, chỉ mục sẽ càng lớn trong Elasticsearch. Điều này có nghĩa là bạn sẽ cần phần cứng mạnh hơn và chỉ mục càng lớn thì thời gian truy vấn tìm kiếm càng lâu. Tiếp theo, quyết định có bao nhiêu shard sẽ giữ dữ liệu. Một primary shard là đủ nếu nếu bạn không cần xử lí một lượng lớn dữ liệu.
* Khi bạn đã xác định chỉ mục, đã đến lúc bắt đầu truy vấn. Hãy nhớ rằng, trước khi có thể bắt đầu truy vấn, bạn cần lập chỉ mục một số dữ liệu. elasticsearch-model gem đã cung cấp cho chúng ta một giao diện tìm kiếm mạnh mẽ cho API RESTful Elasticsearch. Bạn có thể truy vấn với bất kỳ điểm cuối API nào được đề cập trong tài liệu Elasticsearch.
* Chỉ cần include Elasticsearch::Model::Callbacks, có thể thiết lập Callbacks tự động. Có thể tùy chỉnh các Callback dễ dàng và bạn có thể kiểm soát khi nào bạn thực sự muốn các chỉ mục được cập nhật.
* Cuối cùng, hãy dành thời gian để viết một bản cách import nhanh hơn. Tính năng import được tích hợp không hiệu quả lắm.

*Nguồn: [Amit Ashwini](https://medium.com/swlh/how-should-you-use-elasticsearch-in-ruby-on-rails-app-3d8d6997cc75)*