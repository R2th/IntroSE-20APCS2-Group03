Trong bài viết [trước](https://viblo.asia/p/elasticsearch-series-p1-gioi-thieu-ve-elasticsearch-Az45bYqQlxY), chúng ta đã đề cập đến việc lưu trữ và lập chỉ mục dữ liệu (data indexing) trong Elaticsearch là một lựa chọn tốt để trả về kết quả nhanh chóng và phù hợp cho việc tìm kiếm. Nhưng xét cho cùng, bản chất Elasticsearch cũng chỉ là một công cụ tìm kiếm và bạn sẽ không bao giờ sử dụng nó độc lập một mình. Giống như bất kỳ kho dữ liệu nào khác, bạn cần một cách để cung cấp dữ liệu vào đó (elasticsearch), hơn nữa bạn cần cung cấp một giao diện( interface) cho người dùng đang tìm kiếm dữ liệu đó.
Để hiểu được ý tưởng về việc sử dụng Elaticsearch như thế nào, hãy cùng xem xét các kịch bản điển hình mà người ta thường sử dụng nhé:
1. Elasticsearch được sử dụng như là "primary-backend" cho trang web: Như chúng ta đã thảo luận, bạn có thể có một trang web cho phép mọi người viết bài đăng (posts) trên blog, nhưng bạn cũng muốn có khả năng tìm kiếm thông qua các bài đăng. Trong trường hợp này bạn có thể sử dụng Elaticsearch để lưu trữ tất cả dữ liệu liên quan đến các bài đăng này cũng như là phục vụ các truy vấn. Dễ hiểu hơn, so với cách sử dụng thông thường là lưu trữ tìm kiếm data trên database, người ta lại sử dụng Elaticsearch.
2. Thêm Elaticsearch vào hệ thống hiện có: Rất có thể bạn đang đọc bài viết này vì bạn đã có một hệ thống lớn và lượng dữ liệu data lớn trong database, bạn muốn  thêm tìm kiếm hoặc nâng cấp khả năng tìm kiếm trở nên "awesome"hơn. Chúng ta sẽ xem xét cách thức cài đặt và thực hiện một cách chi tiết hơn ở phần sau
3. Sử dụng Elaticsearch với các công cụ hiện có: Chúng ta đã biết Elasticsearch là mã nguồn mở và cung cấp giao diện HTTP đơn giản vì thế nên thông thường một hệ sinh thái lớn sẽ hỗ trợ nó, người ta sẽ kết hợp Elasticsearch cùng các công cụ hiện đã có tạo nên một hệ thống lớn, phức tạp và hiệu quả hơn.

Những điều nói trên chắc hẳn sẽ khá khó hiểu đối với newbie, vậy hãy cùng xem xét kỹ hơn từng bối cảnh sử dụng để hiểu thêm nhé:

## 1. Elasticsearch được sử dụng như là "primary-backend" cho trang web
Như chúng ta vẫn thường làm, các công cụ tìm kiếm được triển khai trên các kho dữ liệu được thiết lập tốt để cung cấp khả năng tìm kiếm nhanh và phù hợp. Điều đó bởi vì các công cụ tìm kiếm trong lịch sử đã có một bộ lưu trữ lâu bền hoặc các tính năng khác thường cần, chẳng hạn như số liệu thống kê.
Elaticsearch là một trong những công cụ tìm kiếm hiện đại cung cấp lưu trữ, số liệu thống kê lâu bền và nhiều tính năng khác mà bạn vẫn mong đợi từ kho dữ liệu. Nếu bạn đang bắt đầu một dự án mới, bạn nên cân nhắc sử dụng Elaticsearch làm kho lưu trữ dữ liệu duy nhất để giúp thiết kế của bạn đơn giản nhất có thể. Nhược điểm của nó là có thể nó không hoạt động tốt cho tất cả các trường hợp sử dụng, ví dụ, khi bạn có nhiều bản cập nhật, vì vậy bạn cũng có thể sử dụng Elaticsearch trên một kho lưu trữ dữ liệu khác, tùy theo dự án của bạn. Một nhường điểm nữa đến từ cách làm này là giống như các kho dữ liệu NoSQL khác thì Elaticsearch lại không hỗ trợ transactions, đây được xem là bất lợi lớn nhất khi sử dụng elasticsearch như là "primary back end" cho trang web của bạn
Cho một ví dụ, bạn có một trang blog, bạn có thể lưu trữ các bài viết mới trực tiếp trên Elastichsearch. Tương tự, bạn cũng có thể sử dụng ElasticSearch để thu về records bạn mong muốn, tìm kiếm hoặc thống kê.

![Elasticsearch as the
only back end storing and indexing
all your data](https://images.viblo.asia/0acfca9f-c8e1-4042-8451-66081aae0cf1.png)

Opps, điều gì sẽ xảy ra nếu một máy chủ ngừng hoạt động?
Không quá đáng lo ngại, nạn có thể đối phó với lỗi này bằng cách sao chép dữ liệu của bạn đến các máy chủ khác nhau, bên cạnh nó việc cung cấp nhiều tính năng khác làm cho Elaticsearch trở thành một kho lưu trữ dữ liệu NoSQL khá hấp dẫn. Tất nhiên không phải mọi thứ đều tuyệt, rằng vẫn tồn tại những nhược điểm riêng, nhưng bạn nên cân nhắc xem việc thêm một kho dữ liệu khác trong thiết kế tổng thể của bạn có đáng để thêm phần phức tạp hay không? 
## 2. Thêm Elaticsearch vào hệ thống hiện có
Bản thân Elaticsearch có thể không phải lúc nào cũng cung cấp tất cả các chức năng bạn cần từ một kho dữ liệu. Một số tình huống thì lại yêu cầu bạn sử dụng Elaticsearch ngoài kho lưu trữ dữ liệu khác.
Ví dụ: hỗ trợtransaction và các mối quan hệ phức tạp là các tính năng mà tìm kiếm Elas-tic hiện không hỗ trợ, ít nhất là trong các phiên bản đầu. Nếu bạn cần các tính năng đó, hãy cân nhắc sử dụng Elaticsearch cùng với một kho dữ liệu khác (phối hợp cùng nhau)
![](https://images.viblo.asia/dac4df87-f813-4d15-8b29-7d3a186c22b7.png)
Hoặc có thể bạn đã có một hệ thống phức tạp hoạt động rồi, nhưng bạn muốn thêm tìm kiếm hoặc implement khả năng tìm kiếm tốt và hiệu quả hơn. Có thể banh sẽ rủi ro khi thiết kế lại toàn bộ hệ thống cho mục đích duy nhất là sử dụng Elaticsearch một mình (mặc dù bạn có thể làm điều đó trong một khoảng thời gian dài, không bị ràng buộc về đueate). Cách tiếp cận an toàn hơn cả là thêm Elaticsearch vào hệ thống của bạn và setup cho nó hoạt động với các thành phần hiện đã có
Dù bằng cách nào đi nữa, nếu bạn có hai kho lưu trữ dữ liệu, bạn cũng sẽ phải tìm cách để đảm bảo giữ cho chúng được đồng bộ hóa. Tùy thuộc vào kho lưu trữ dữ liệu chính của bạn là gì và cách trình bày dữ liệu của bạn, bạn có thể triển khai một plugin Elaticsearch để giữ cho hai thực thể được đồng bộ hóa, như hình mô tả ở trên

Ví dụ: 
    Giả sử bạn có một cửa hàng bán lẻ online với thông tin sản phẩm được lưu trữ trong cơ sở dữ liệu SQL. Bạn cần tìm kiếm nhanh và phù hợp, vì vậy bạn cài đặt Elasticsearch. Để lập chỉ mục dữ liệu (index data), bạn cần triển khai một cơ chế đồng bộ hóa, có thể là một plugin Elaticsearch hoặc một dịch vụ tùy chỉnh mà bạn xây dựng. Cơ chế đồng bộ hóa này có thể get tất cả dữ liệu phù hợp với từng sản phẩm và đánh index data đó trong Elaticsearch, nơi mỗi sản phẩm được lưu trữ dưới dạng document.
    
Khi người dùng nhập các tiêu chí tìm kiếm trên trang web, ứng dụng web ở cửa hàng sẽ truy vấn Elaticsearch cho tiêu chí đó. Elaticsearch trả về một số tài liệu sản phẩm phù hợp với tiêu chí, được sắp xếp theo cách bạn thích. Sắp xếp có thể dựa trên điểm số liên quan cho biết số lần từ mà mọi người tìm kiếm xuất hiện trong mỗi sản phẩm hoặc bất kỳ thứ gì được lưu trữ trong tài liệu sản phẩm, chẳng hạn như cách sản phẩm được thêm gần đây, xếp hạng trung bình hoặc thậm chí là kết hợp những từ đó chẳng hạn.

Việc chèn hoặc cập nhật thông tin vẫn có thể được thực hiện trên cơ sở dữ liệu SQL chính của SQL, do đó bạn chỉ có thể sử dụng Elaticsearch để xử lý các tìm kiếm. Tùy theo cơ chế đồng bộ hóa mà Elaticsearch sẽ được cập nhật nhanh nhất với những thay đổi ở database.

## 3. Sử dụng Elaticsearch cùng các công cụ hiện có
Trong một số trường hợp sử dụng, bạn không phải viết code để hoàn thành công việc với Elaticsearch. Nhiều công cụ có sẵn hoạt động với Elaticsearch, vì vậy bạn không phải viết từ đầu.
Ví dụ: giả sử bạn muốn triển khai hệ thống logs quy mô lớn để lưu trữ, tìm kiếm và phân tích một số lượng lớn các sự kiện(event). Như được hiển thị trong hình dưới, để xử lý logs và xuất ra Elaticsearch, bạn có thể sử dụng các công cụ ghi nhật ký như Rupyslog (www.rsyslog.com), Logstash 2 (www.elastic.co/products/logstash) hoặc Apache Flume (http://flume.apache.org). Để tìm kiếm và phân tích các log đó trong giao diện trực quan, bạn có thể sử dụng Kibana (www.elastic.co/products/kibana). 
![](https://images.viblo.asia/42c20f22-abe5-4a3c-8f47-c8e667e1ba41.png)
Nổi bật trong này có thể kể để ELK, bạn có thể tìm hiểu kĩ hơn về ELK tại [đây nhé](https://aptech-danang.edu.vn/ace/tin-tuc-su-kien/chi-tiet/16458/tim-hieu-ve-elk-stack-cong-cu-quan-ly-log-ngau-nhat-qua-dat-)
![](https://images.viblo.asia/baef9b20-6596-4486-ad3f-45d33a07e96a.png)
Thực tế là Elaticsearch là mã nguồn mở theo giấy phép Apache 2, nói chính xác thì đây là lý do duy nhất mà rất nhiều công cụ hỗ trợ. Mặc dù Elaticsearch được viết bằng Java, nhưng có nhiều hơn một Java API co phép chúng ta làm việc với nó. Nó cũng hiển thị API REST, giúp cho bất kỳ ứng dụng nào cũng có thể truy cập, bất kể chương trình của bạn được viết bằng bất kì ngôn ngữ nào
Hơn nữa, các request và reply REST thường ở định dạng JSON. Thông thường, một request REST có tải trọng(payloads) của nó là JSON và các reply cũng là một tài liệu JSON.
NOTE: Tải trọng (payload) là phần thân (body) của yêu cầu (request) hoặc phản hồi (response) HTTP.

Bài viết được tham khảo từ cuốn sách Elasticsearch in Action (Radu Gheorghe & Matthew Lee Hinman & Roy Russo)