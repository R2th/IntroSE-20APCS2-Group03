Đây là bài 2 thuộc seri "Elastic là gì? Tôi có nên áp dụng vào dự án?" bạn có thể tham khảo chuỗi bài viết tại:

https://viblo.asia/s/elastic-la-gi-toi-co-nen-ap-dung-vao-du-an-QqKLvpm4l7z

Như bài trước đã đề cập: chúng ta đã xác định rằng lưu trữ và đánh chỉ mục dữ liệu của bạn trong ElasticSearch là một hướng đi chính xác nhằm cung cấp khả năng tìm kiếm kết quả một cách nhanh chóng và có liên quan.

Nhưng cuối cùng Elasticsearch chỉ là một công cụ tìm kiếm, nên bạn sẽ không bao giờ sử dụng nó một cách riêng lẽ.

Giống như bất kỳ nơi lưu trữ dữ liệu nào, bạn cần 1 cách thức để chèn dữ liệu vào nó, và bạn cũng cần một giao diện để cho người dùng tìm kiếm dữ liệu.

Để có ý tưởng về cách Elasticsearch ứng dụng trong hệ thống lớn, hãy cùng xem xét 3 ví dụ điển hình sau:

1. ElasticSearch là phần back-end chính cho trang web:

Như đã đề cập trước đó, bạn có một trang web cho phép người dùng viết bài đăng lên blog, nhưng bạn cũng muốn có khả năng tìm kiếm các bài viết. Bạn có thể sử dụng ElasticSearch để lưu trữ toàn bộ dữ liệu có liên quan đến bài đăng và phục vụ cho các câu truy vấn.

2. Thêm ElasticSearch vào một hệ thống hiện có: 

Bạn có thể đang đọc bài viết này bởi vì bạn đang có sẵn hệ thống lưu trữ dữ liệu và bạn muốn thêm vào chức năng tìm kiếm.

3. Sử dụng ElasticSearch như là phần back end của những giải pháp đã được xây dựng sẵn: 
 
Bởi vì Elasticsearch là mã nguồn mở và cung cấp giao thức HTTP, cho nên có một hệ sinh thái lớn hỗ trợ nó. 

Ví dụ: ElasticSearch phổ biến về dữ liệu log tập trung, cung cấp các công cụ có sẵn để viết và đọc ElasticSearch, ngoài ra còn có phần cấu hình các công cụ theo cách mà bạn muốn, vì thế bạn không cần phải phát triển gì thêm.

Chúng ta hay xem xét kỹ hơn từng kịch bản:

### ElasticSearch là phần back-end chính cho trang web

Theo cách truyền thống, các công cụ tìm kiếm được triển khai trên nơi lưu trữ dữ liệu kiên cố để cung cấp khả năng tìm kiếm nhanh và có liên quan. Bởi vì các công cụ tìm kiếm trong lịch sử không có một nơi lưu trữ bền vững hay tính năng cần thiết như thống kê.

Elasticsearch là một trong những công cụ tìm kiếm hiện đại cung cấp khả năng: lưu trữ bền vững, thống kê, và nhiều tính năng khác mà bạn mong đợi từ một nơi lưu trữ dữ liệu.

Nếu bạn bắt đầu một dự án mới, tôi khuyên bạn nên xem xét và sử dụng Elasticsearch như là nơi lưu trữ dữ liệu duy nhất để giữ cho thiết kế của bạn đơn giản nhất có thể. Điều này có thể không phù hợp với tất cả các trường hợp.

Ví dụ: Khi bạn cần phải cập nhập dữ liệu thường xuyên, thì bạn phải sử dụng ElasticSearch ở phía trên của cơ sở dữ liệu.

Lưu ý: Giống như NoSQL, ElasticSearch KHÔNG hỗ trợ phiên giao dịch (transaction).

Chúng ta sẽ quay trở lại ví dụ về blog: Bạn có thể lưu trữ những bài viết mới trong ElasticSearch. Tương tự, bạn có thể sử dụng ElasticSearch để lấy dữ liệu, tìm kiếm, và thống kê toàn bộ dữ liệu

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tcg62gw2eg_image.png)

Điều gì sẽ xảy ra nếu server mất kết nối? Bạn có thể được chấp nhận lỗi (fault tolerance) bằng cách sao chép dữ liệu của bạn tới server khác.

Nhiều tính năng khác làm cho ElasticSearch là một nơi lưu trữ dữ liệu NoSQL hấp dẫn. 

Nó không thể tuyệt vời cho mọi thứ, nhưng bạn nên cân nhắc thử, nếu thêm một nơi lưu trữ dữ liệu vào tổng thể thiết kế của bạn có đáng hay không?

### Thêm ElasticSearch vào một hệ thống hiện có

ElasticSearch không phải lúc nào cũng cung cấp chức năng mà bạn cần từ một nơi lưu trữ dữ liệu. Một số trường hợp bạn sử dụng ElasticSearch ở một nơi lưu trữ dữ liệu khác.

Ví dụ: Hỗ trợ phiên giao dịch (transaction support) và mối quan hệ phức tạp giữa dữ liệu là những tính năng mà ElasticSearch không hỗ trợ, ít nhất là trong phiên bản 1.

Nếu bạn muốn sử dụng những tính năng này, hãy cân nhắc vấn đề sử dụng ElasticSearch ở một nơi lưu trữ dữ liệu khác.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pbx8po7wfi_image.png)

Hoặc là bạn đã có sẵn hệ thống phức tạp, nhưng bạn muốn thêm chức năng tìm kiếm.  Sẽ thật nguy hiểm nếu như bạn thiết kế lại toàn bộ hệ thống cho mục đích sử dụng  duy nhất Elasticsearch. Cách tiếp cận an toàn hơn là thêm Elasticsearch vào hệ thống của bạn và làm cho nó tương tác với các thành phần có sẵn.

Bằng cách nào đi nữa. Nếu bạn có 2 nơi lưu trữ dữ liệu, thì bạn phải tìm cách cho chúng đồng bộ hoá dữ liệu.

Phụ thuộc vào kho lưu trữ dữ liệu chính của bạn là gì và cách trình bày dữ liệu của bạn, bạn có thể triển khai plugin Elasticsearch để giúp chúng đồng bộ hoá, như được mô tả ở hình trên.

Giả sử như bạn có cửa hàng bán lẻ online với thông tin sản phẩm được lưu trữ trong cơ sở dữ liệu SQL. Bạn cần tìm kiếm dữ liệu nhanh chóng và có liên quan, bạn cài đặt ElasticSearch.

Để đánh chỉ mục dữ liệu, bạn cần triển khai một cơ chế đồng bộ hoá, có thể là plugin của ElasticSearch hoặc một service do chính bạn xây dựng. Cơ chế đồng bộ hoá này có thể kéo tất cả các dữ liệu phù hợp cho từng sản phẩm và lập chỉ mục trong ElasticSearch, nơi mà sản phẩm được lưu dưới dạng tài liệu (document).

Khi người dùng nhập tiêu chí tìm kiếm trên trang web, thì web ứng dụng thực hiện truy vấn ElasticSearch cho tiêu chí đó. ElasticSearch trả về sản phầm phù hợp với tiêu chí, và được sắp xếp theo cách bạn muốn.

Cách sắp xếp có thể dựa trên điểm liên quan, cho biết từ tìm kiếm xuất hiện bao nhiều lần trong mỗi sản phẩm, hoặc bất kỳ thứ gì được lưu trữ trong sản phẩm như là: cách sản phẩm được thêm gần đây, xếp hạng trung bình, hoặc thậm chí là sự kết hợp của những thứ đó.

Việc chèn hoặc cập nhập thông tin vẵn có thể thực hiện trên cơ sở dữ liệu chính, do đó bạn chỉ sử dụng ElasticSearch để xử lý chức năng tìm kiếm. 

Nó phụ thuộc vào cơ chế đồng bộ hoá để giúp cho ElasticSearch luôn cập nhập những thay đổi mới nhất.

Khi bạn muốn tích hợp ElasticSearch với những thành phần khác, bạn có thể sử dụng những công cụ có sẵn đã tích hợp chức năng cần thiết.

Như chúng ta sẽ khám khá trong phần tiếp theo, có một cộng đồng lớn, xây dựng công cụ (tools) cho ElasticSearch, và đôi khi bạn không cần xây dựng bất cứ thứ gì.

### Tích hợp ElasticSearch với các công cụ có sẵn

Trong một số trường hợp thực tế, bạn không phải viết bất kỳ dòng code nào cho ElasticSearch. Nhiều công cụ có sẵn hoạt động với ElasticSearch, vì vậy bạn không cần phải viết từ đầu.

Ví dụ: bạn muốn trển khai framework lưu log với qui mô lớn bao gồm những chức năng: lưu trữ, tìm kiếm, và phần tích số lượng lớn các sự kiện. 

Như hình mình hoạ dưới đây, để xử lý log và xuất ra kết quả trong ElasticSearch, bạn có thể sử dụng công cụ log như Rsyslog (www.rsyslog.com) hoặc Logstash (www.elastic.co/products/logstash) hoặc Apache Flume (http://flume.apache.org). Để tìm kiếm và phân tích log trên giao diện trực quan, bạn có thể sử dụng Kibana (www.elastic.co/products/kibana).

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/xnxe81rv1d_image.png)

Thực tế ElasticSearch là mã nguồn mở theo giấy phép của Apache 2, Đó là lí do tại sao có nhiều công cụ hỗ trợ ElasticSearch. 

Mặc dù ElasticSearch được viết bằng Java, nhưng có nhiêu hơn 1 API cho bạn làm việc với nó. ElasticSearch cũng hỗ trợ REST API giúp ứng dụng nào cũng có thể truy cập mà không cần phân biệt ngôn ngữ lập trình của bạn là gì. Hơn nữa, các yêu cầu và trả lời REST thường là định dạng JSON(JavaScript Object Notation) .

### JSON vs YAML

> JSON là một định dạng hiển thị cấu trúc dữ liệu. Một đối tượng JSON thường chứa những keys và values. Value có thể là chuỗi, số, true/false, hay đối tượng khác, hoặc là 1 mảng.
 
> JSON giúp cho các ứng dụng chuyển đổi và tạo (parse and generate) một cách dễ dàng. YAML (YAML Ain’t Markup Language) cũng hỗ trợ cùng mục đích đó. Để kích hoạt YAML ta truyên tham số format=yaml vào HTTP request.
 
> JSON thường được sử dụng cho những giao thức HTTP, còn YAML thường được sử dụng cho các file cấu hình.
 
Ví dụ: Khi bạn đánh chỉ mục cho sự kiện log, thì chúng sẽ được hiển thị như sau:

```
{
    "message": "logging to Elasticsearch for the first time",
    "timestamp": "2013-08-05T10:34:00"
}
```

Yêu cầu tìm kiếm sự kiện log với giá trị là "first" sẽ trông như sau:

```
{
    "query": {
        "match": {
            "message": "first"
        }
    }
}
```

Truyền dữ liệu và chạy câu truy vấn thông qua đối tượng JSON qua HTTP giúp cho bạn dễ mở rộng - từ hệ thống log Rsyslog cho tới kết nối framework như là Apache ManifoldCF để tương tác với ElasticSearch.

Nếu bạn xây dựng 1 ứng dụng mới từ đầu hoặc bạn mới thêm chức năng tìm kiếm và hệ thống sẵn có, REST API là một trong những tính năng làm cho ElasticSearch trở nên hấp dẫn.

### Lời kết

Các bạn vừa tìm hiểu cách ElasticSearch có thể áp dụng vào như án, những ưu điểm, nhược điểm cũng như cách triển khai.

Trong phần tiếp theo mình sẽ trình bày: 
1. Tính năng đặc trưng của ElasticSearch. 
2. Mở rộng chức năng Lucene.
3. Cấu trúc dữ liệu trong ElasticSearch.
4. Cài đặt ElasticSearch.

### Tham khảo
Elasticsearch In Action (Matthew Lee Hinman and Radu Gheorghe)

### Góp ý
Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn.

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! 😃

Phúc Vưu.