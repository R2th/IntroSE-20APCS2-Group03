Trong một trang web, đứng từ quan điểm kinh doanh, bạn nên xây dựng một công cụ tìm kiếm hiệu quả, để tăng tỉ lệ so sánh và từ đó, sẽ mang lại nhiều lợi nhuận hơn. Nếu công cụ tìm kiếm trong trang web của bạn không cung cấp đủ các thông tin cần thiết hay hiệu năng tìm kiếm quá thấp, thì người dùng sẽ bỏ qua trang của bạn mà tìm đến đối thủ cạnh tranh.

Vì vậy, một công cụ tìm kiếm hiệu quả là gì?

Mục đích của quá trình tìm kiếm là trả về các kết quả gần nhất mong muốn của user, bao gồm cả các nội dung phổ biến từ trang web.

Đó là các tính năng phổ biến của một công cụ tìm kiếm hiện nay:

- Full-text search ( tìm kiếm theo từ, có thể bằng các từ đơn giản hay các mệnh đề, hoặc các kiểu biến đổi khác nhau của từ hoặc mệnh đề )
- Multifield search ( tìm kiếm trên toàn bộ các trường dữ liệu trong cơ sở dữ liệu )
- Highlighting ( làm nổi bật các từ nằm trong ô tìm kiếm ở kết quả trả về, giúp người dùng dễ dàng tìm kiếm nội dung phù hợp hơn )
- Search by synonyms ( tìm kiếm theo các từ đồng nghĩa, kết quả trả về sẽ chứa các từ đồng nghĩa với từ mà người dùng nhập )
- Autocomplete suggestions ( tự động đưa ra các gợi ý, khi người dùng bắt đầu nhập các kí tự để tìm kiếm, sẽ tự động trả về danh sách các từ khoá giống với các kí tự người dùng nhập )
![](https://images.viblo.asia/8a8eff4a-02c1-4f4f-aa64-244b4074f75d.png)

- Faceted search ( đưa ra một số các thuộc tính tìm kiếm, VD: các trang thương mại sử dụng đặc tính này để thông báo cho khách hàng biết có bao nhiêu mục của một mẫu, một màu, hay một kích thước cụ thể hoặc các thuộc tính khác được tìm )
![](https://images.viblo.asia/cd0c458d-baa4-4b74-9559-06d4b4230265.png)

- Fuzzy search ( tìm kiếm theo các từ khoá sai chính tả )
- Spelling corrections ( sửa lỗi chính tả của từ khoá tìm kiếm )
- Geospatial search ( tìm kiếm đối tượng vị trí dựa theo kinh độ và vĩ độ )
![](https://images.viblo.asia/ca0b82d2-be47-413e-86ee-c2856b36428d.png)

Hệ thống nên cung cấp khả năng thu hẹp kết quả tìm kiếm bằng cách sử dụng các phạm vi ( giá cả, ngày, kích thước, ... ), sắp xếp ( bằng sự phổ biến, ngày, giá cả ) và các bộ lọc ( bao gồm các tham số mong muốn ). Khi chúng ta đề cập đến các ứng dụng web, nơi mà các thông tin thay đổi liên tục ( giá cả, các mô tả, hay các sản phẩm phù hợp ), sẽ cực kỳ quan trong khi bao gồm khả năng cập nhật tại thời gian thực, VD: với công cụ  eCommerce hay đặt hàng, cần hiển thị ngay các sản phẩm hay dịch vụ phù hợp.

Ngoài các tính năng phổ biến ở trên, công cụ cũng cần cung cấp các thông tin bổ sung khi khách hàng tìm kiếm các sản phẩm hay thông tin quan tâm nhất, giúp cải thiện trải nghiệm người dùng.

VD trên amazon, ta có cung cấp các sản phẩm đề cử
![](https://images.viblo.asia/471478b6-a921-451f-81b2-b0c1f0a82342.png)

## Chúng ta nên chọn công cụ tìm kiếm nào?

Các khoảng hơn 20 công cụ tìm kiếm, nhưng nếu bạn muốn tìm một giải pháp tìm kiếm hiệu quả và đáng tin cậy cho trang web của bạn, chúng ta nên xem xét 1 trong 3 giải pháp sau: Elasticsearch, Solr, hay Sphinx, đó các công cụ đứng top năm 2018

Cả 3 giải pháp trên là mã nguồn mở, được hỗ trợ rất tốt bởi cộng đồng. Chúng cung cấp khả năng tìm kiếm mạnh mẽ, hiệu năng cao, dễ mở rộng và mềm dẻo, mặc dù tất cả chúng vẫn có các đặc điểm riêng.
![](https://images.viblo.asia/6bd9f051-2d43-4286-9b45-d902148b55dd.png)

##  Elasticsearch

Elasticsearch, giải pháp tìm kiếm đứng đầu trong năm 2018, đúng với cái tên của nó `elastic`, có khả năng hoạt động tốt trên nhiều môi trường. Nó là công nghệ mã nguồn mở và sử dụng thư viện Apache Lucene

Nhiều công ty trên thế giới sử dụng Elastic cho ứng dụng, Vd như TripAdvisor, Shopify, Mozilla, Foursquare, Etsy, Github, SoundCloud, eBay, Yelp, và Netflix, và nhiều ứng dụng khác.

### Điểm mạnh của ELASTICSEARCH

1. Đánh Index gần đạt thời gian thực

Elasticsearch có khả năng thay đổi dữ liệu index cực nhanh, gần như tức thì ( ít hơn 1 giây ). Nó phù hợp với các dự án có database liên tục cập nhật. VD, với Uber,  Elasticsearch tổng hợp số liệu kinh doanh với giá tiền thay đổi và hỗ trợ theo các vị trí trong thời gian thực. Nó có khả năng đáp ứng nhiều hơn 1000 câu truy vấn mỗi giây.

2. Khả năng mở rộng lớn

Khi cơ sở dữ liệu phát triển, nó sẽ trở nên khó khăn để tìm kiếm. Nhưng Elasticsearch sẽ mở rộng cùng với khi cơ sở dữ liệu của bạn lớn dần, vì vậy tốc độ tìm kiếm vẫn không chậm đi. 

Expedia, một trong những ứng dụng tổng hợp vé khách sạn và máy bay lớn nhất, cung cấp khả năng tìm kiếm tới 1 TB một ngày, với 300 nghìn sự kiện mỗi giây. Với sự trợ giúp của Elasticsearch, họ có thể quản lý  để cải thiện trải nghiệm đặt vé của khách hàng.

3. Lưu trữ

ES có thể được dùng không chỉ như một giải pháp index, mà đó còn là nơi lưu trữ dữ liệu. Tuy nhiên, chúng tôi không khuyến khích sử dụng nó như bộ lưu trữ chính, chúng ta nên tiếp tục lưu trữ dữ liệu tại cơ sở dữ liệu chính, bởi vì bảo mật và độ tin cậy sẽ tốt hơn, chỉ sử dụng ES với mục đích index dữ liệu và lưu trữ log

VD, trang Florida.com, tổng hợp tất cả thông tin về các resort Florida, hỗ trợ cho một cơ sở dữ liệu lớn của các khách sạn, nhà hàng, các sự kiện, sự kiện thể thao, mua sắm, ... Vơi ES, dữ liệu được lưu trữ trong DB của chúng ta sẽ được nhanh chóng index lại và trở nên tìm kiếm một cách tức thì.

4. Trực quan hoá dữ liệu

Đây là một trong những đặc điểm xu hướng ngày nay đã được thực hiện trong ES. Elastic Stack ( sự kết hợp của ES, Logstash và Kibana ) tạo nên một công cụ tuyệt vời cho khả năng phân tích. Nó cho phép giám sát lưu lượng hoạt động của ứng dụng trong thời gian thực ( tổng số người sử dụng, số người sử dụng một lần, địa chỉ IP, câu truy vấn phổ biến nhất, các trang được gọi nhiều nhất, các thiết hay trình duyệt được dùng, log lưu lượng trong ngày, ... )

Những thông tin được trực quan thành các biểu đầu, bản đầu và bảng với các màu sắc khác nhau trong dashboard. Nó rất hữu ích khi làm việc với các team phân tán, mọi người có thể nhìn thấy được các thông tin được cập nhật lập tức và sau đó sử dụng những dữ liệu này để tìm ra các thông tin hiểu rõ hơn về người dùng và cải thiện nội dung và UX của sản phẩm.
 
 Với sự giúp đỡ của ES, ứng dụng The Guardian đã tạo một hệ thống phân tích đầy sức mạnh, mà có thể xử lý 40 triệu tài liệu mỗi ngày để hình dung rõ hơn cách nội dung được sử dụng.
 
 Tại Netflix, với 8 triệu sự kiện và 24GB mỗi giây trong giờ cao điểm, ES được sử dụng như một công cụ phân tích thời gian thực cho các sự kiện như các hoạt động theo dõi video, các hoạt động UI, các log lỗi, hiệu năng, các khả năng chuẩn đoán, ...
 
 5. Phân tích bảo mật 

Elastic Stack cũng là một công cụ phân tích bảo mật tuyệt vời. Khả năng phân tích trực quan hoá log gần như thời gian thực cho phép bạn xác định các mối đe doạ bảo mật ( các vấn đề với một web server, các link bị lỗi, cố gắng truy cập không được phép, các vị trí tấn công )

Nhờ ES, Dell tăng cường khả năng bảo mật của họ bằng cách đảm bảo chỉ những người được quyền mới có thể truy cập vào các cluster của họ. Dell cũng giảm bớt số các server sử dụng là 25-30%

6. Học máy

Elasticsearch cung cấp các đặc điểm học máy bằng cách sử dụng các công cụ bổ sung X-Pack. Các thuật toán Học máy được tập trung vào sự phát hiện bất thường và ngoại lệ trong một chuỗi dữ liệu theo thời gian 

7. Amazon Elasticsearch Service

Amazon Elasticsearch Service cho phép dễ dàng và nhanh chóng cài đặt và sử dụng Elasticsearch trên cloud mà bạn không cần phải tự cấu hình cho các server 

### Nhược điểm của Elasticsearch

Elastic hiện nay vẫn là một công nghệ trẻ. Rất nhiều tính năng mong muốn được thêm vào thông qua các extension. VD, ES không có tính năng "Did You Mean?"

## SOLR

Solr là một công cụ tìm kiếm khác, cũng được dựa trên Apache Lucene, do đó, nó cũng có các đặc điểm chung với Elasticsearch, nhưng vẫn có một vài sự khác nhau trong cấu trúc. 

Các công ty sử dụng Solr là Cnet, CitySearch, Bloomberg, Magento, Zappos, AOL, eTrade, Disney, Apple, NASA, MT, ...

### Điểm mạnh của SOLR 

1. Faceted search

Solr có khả năng tìm kiếm dựa theo facet xuất sắc, nó cung cấp giải pháp hoàn hảo cho các trang web thương mại như Zappos, sử dụng Solr để tìm kiếm và điều hướng 150,000 loại giầy và các sản phẩm khác.
![](https://images.viblo.asia/0adb8fa1-c9dc-4105-8ff7-d47e107c20c7.png)

2. Tập hợp các tính năng 

Solr có thể cung cấp tính năng full text search hiêu quả với khả năng cấu hình cao ( thậm chí nhiều hơn Elasticsearch ). Sorl hỗ trợ thực hiện đa dạng các gợi ý, làm nổi bật các chức năng và có bộ kiểm tra cú pháp "Did you mean?" ( cái mà không có trong ES )
![](https://images.viblo.asia/db29bf93-f5b4-4283-a69d-23725688e73f.png)

3. Đa dạng nội dung các tài liệu

Solr là một trong số ít các công cụ tìm kiếm có thể đọc các tài liệu với nội dung đa dạng, bao gồm PDF, Word, XML, hay text thông thường. 

Điều này thật hoàn hào với các dự án mà cần phải tìm kiếm qua một số lượng lớn các file PDF hay Word trong trang web ( VD các hợp đồng, bản tóm tắt, các tài liệu học, sách, ... )

4. Trực quan hoá dữ liệu 

Banana là một công cụ trực quan hoá ( được fork từ Kibana ) để làm việc cùng với Solr, cho phép các admin theo dõi các sự kiện hay log ở màn hình dashboard. 

VD, với ngan hàng, các nhà quản lý có thể lấy ra các thông tin giao dịch thất bại và tìm hiểu lý do cho mỗi vấn đề đó, từ đó giúp giảm bớt các công việc thủ công. Điều này có thể giảm bớt quá trình tìm kiếm thủ công bằng log.
![](https://images.viblo.asia/6e44b9c7-6d5d-4d46-8b7f-5059003d2064.png)

5. Học máy 

Solr, khi hoạt động với Bloomberg, đã được cài đặt khả năng Học máy để sử dụng khái niệm đánh giá lại các tài liệu dựa theo điểm thông qua nhiều truy vấn phức tạp. Học máy hướng đến người dùng các trải nghiệm tốt hơn về tìm kiếm ngay lập tức cho hầu hết các công ty, con người và tin tức.

### Nhược điểm của SOLR

Solr không nhanh bằng Elasticsearch và chỉ làm việc tốt với các dữ liệu tĩnh ( không yêu cầu thay đổi thường xuyên ). Lý do là vì cache. Với Solr, cache là toàn cục, nghĩa là chỉ với một thay đổi nhỏ xảy ra trong cache, tất cả index được yêu cầu cập nhật. Điều này dẫn đến rất tốn thời gian. Ngược lại, với Elastic, quá trình cập nhật được chia thành từng phần.

## Sphinx

Mặc dù Sphinx chỉ được đứng thứ 5 trong bảng công cụ tìm kiếm năm 2018, nhưng nó vẫn là một công nghệ đầy sức mạnh và phổ biến. Sphinx được dùng cho các hệ thống nổi tiếng như Joomla.org, CouchSurfing.org, Wikimapia.org, Tumblr.com và hàng trăm ứng dụng khác.

### Điểm mạnh của Sphinx

1. Đầy sức mạnh và nhanh 

Sphinx đã được phát triển trong những năm gần đầy, và đã trở thành một công cụ tìm kiếm gần đạt thời gian thực. Nó đã đạt tốc độ hơn 500 truy vấn một giây cho 1 triệu tài liệu, với số lượng đăng ký index lớn nhất là đạt 25 tỷ tài liệu.

Với sự trợ giúp của Sphinx, Craigslist đã phục vụ hơn 300 triệu truy vấn mỗi ngày. Nhiều hơn 50 tỷ trang mỗi tháng.

Infegy sử dụng Sphinx để index 22 tỷ bài post Twitter, Facebook và các trang blog khác, để phục vụ cho khả năng giám sát phương tiện truyền thông xã hội và phân tích truy vấn. 

2. Faceted search

Sphinx có một trải nghiệm tuyệt vời với faceted search

Trang video lớn nhất của trung quốc, Youku Tudou, sử dụng Sphinx để faceted search cho các nội dung, được phân bố cho 400 triệu người dùng mỗi tháng, với đỉnh điểm khối lượng sử dụng đạt 15,000 truy vấn mỗi giây. 

Greenice gần đây cũng sử dụng Sphix cho các cửa hàng kinh doanh phần cứng máy tính. Faceted search được sử dụng với các thuộc tính như nhãn hàng, loại, mục đích dùng, độ phân giải màn hình, dung lượng HDD, dung lượng SSD, ...
![](https://images.viblo.asia/3adaff0a-992a-4315-bcaa-571cd0d4f11c.png)

3. Không có gì là vô dụng 

Nếu bạn cần các chức năng tìm kiếm thông thường, và không cần các tính năng bổ sung như trực quan hoá dữ liệu và phân tích, hãy sử dụng Sphinx. Nó khá nhanh và đầy sức mạnh cho khả năng index và truy vấn một khối lượng lớn các tài liệu mả chỉ sử dụng giới hạn nguồn tài nguyên máy tính, không giống như Elasticsearch, tiêu thụ khá nhiều bộ nhớ. 

Một trong những ví dụ đó là Boardreader, Sphinx có thể index tới 16 tỷ tài liệu thông qua 37 thiết bị.

### Nhược điểm của SOLR

Sphinx rất tốt cho các dữ liệu có cấu trúc ( đinh nghĩa các trường text và các thuộc tính không phải là text ), nhưng nó không phải là sự lựa chọn tốt nhất cho các dự án mà cần xử lý các dữ liệu không cấu trúc ( DOC, PDF, MP3, ... ), khi đó chúng ta sẽ cần phải tốn khá nhiều thời gian để cấu hình. 

## So sánh các công cụ tìm kiếm 

![](https://images.viblo.asia/5980c02f-b0be-4934-904d-cf380be5892f.png)

## Làm thế nào để sử dụng công cụ tìm kiếm cho dự án

Khi bạn thấy việc trả về kết quả truy vấn mất một thời gian, điều đó sẽ ảnh hưởng đến trải nghiệm người dùng 

Bằng việc trang bị cho cơ sở dữ liệu của bạn một công cụ tìm kiếm đầy sức mạnh, hiệu năng của ứng dụng sẽ được cải thiện nhanh chóng.

Các công cụ tìm kiếm cung cấp các tính năng phức tạp như gợi ý, full-text, faceted, fuzzy search, .. sẽ giúp trả về các kết quả chính xác và hữu ích hơn.

Như bạn thấy, sự khác nhau giữa Elasticsearch, Solr và Sphinx là khá nhỏ. Tất cả đã cung cấp đủ các tính năng chính, với khả năng tìm kiếm nhanh và hiệu quả. 

Hiện nay, Elasticsearch được sử dụng khá nhiều, đó là lựa chọn tốt nhất cho hầu hết dự án. Nó nhanh, mềm dèo và dễ dàng để làm việc, nó cung cấp không chỉ tốc độ và các khả năng tìm kiếm liên quan, ngoài ra nó có thể dùng để lưu trữ dữ liệu. Nó cũng hiệu quả trong việc tìm kiếm dữ liệu trong log , từ đó rất nhanh chóng để xác định vấn đề của ứng dụng và cung cấp khả năng trực quan hoá mọi thứ trong ứng dụng của chúng ta trong thời gian thực. 

Nếu dự án của bạn đang dùng Solr hay Sphinx rồi, cũng ko cần thiết phải chuyển qua Elasticsearch. Tuy nhiên, sẽ là tốt hơn nếu bạn có nhiều kinh nghiệm và cảm thấy thoải mái với một trong các công cụ tìm kiếm đó.