# ElasticSearch là gì?
Elasticsearch là công cụ tìm kiếm dựa trên nền tảng Apache Lucene. Nó cung cấp API cho việc lưu trữ và tìm kiếm dữ liệu một cách nhanh chóng. Nó được xây dựng, phát triển bằng ngôn ngữ java dựa trên Lucene – phần mềm tìm kiếm và trả về thông tin  (information retrieval software) với hơn 15 năm kinh nghiệm về full text indexing and searching.
Elasticsearch được xây dựng để hoạt động như một server cloud theo cơ chế của RESTful. Điều này giúp nó có thể tương tác và sử dụng bới rất nhiều ngôn ngữ , cũng chính do đó cũng là điểm yếu của nó khi độ bảo mật không cao.
# Ưu và nhược điểm của ElasticSearch, khi nào nên sử dụng?
*  Ưu điểm
1. Tìm kiếm dữ liệu rất nhanh chóng, mạnh mẽ dựa trên Apache Lucene. Tìm kiếm trong elasticsearch gần như là realtime hay còn gọi là near-realtime searching
2. Có khả năng phân tích dữ liệu (Analysis data)
3. Lưu trữ dữ liệu full-text
4. Đánh index cho dữ liệu (near-realtime search/indexing, inverted index)
5. Hỗ trợ tìm kiếm mờ (fuzzy), tức là từ khóa tìm kiếm có thể bị sai lỗi chính tả hay không đúng cú pháp thì vẫn có khả năng elasticsearch trả về kết quả tốt.
6. Hỗ trợ nhiều Elasticsearch client phổ biến như Java, PhP, Javascript, Ruby, .NET, Python 

*  Nhược điểm
1. Elasticsearch được thiết kế cho mục đích search, do vậy với những nhiệm vụ khác ngoài search như CRUD thì elastic kém thế hơn so với những database khác như Mongodb, Mysql …. Do vậy người ta ít khi dùng elasticsearch làm database chính, mà thường kết hợp nó với 1 database khác.
2. Trong elasticsearch không có khái niệm database transaction , tức là nó sẽ không đảm bảo được toàn vẹn dữ liệu trong các hoạt động Write, Update, Delete.
3. Elasticsearch không cung cấp bất kỳ tính năng nào cho việc xác thực và phân quyền (authentication or authorization) . Điều này làm cho ElasticSearch kém sự bảo mật với các hệ quản trị cơ sở dữ liệu hiện nay.
* Khi nào nên sử dụng ElasticSearch?
1.Tìm kiếm text thông thường – Searching for pure text (textual search).
2.Tìm kiếm text và dữ liệu có cấu trúc – Searching text and structured 	data (product search by name + properties).
3.Tổng hợp dữ liệu – Data aggregation.
4.Tìm kiếm theo tọa độ – Geo Search.
5.Lưu trữ dữ liệu theo dạng JSON – JSON document storage.
6.Phục vụ cho việc lưu trữ và phân tích dữ liệu lớn.

Ai đang sử dụng Elasticsearch?
![](https://images.viblo.asia/9f89ebbf-f9a2-4a35-bce2-8539cd7c9a0b.png)

# Các khái niệm cơ bản
* Cluster: tập hợp các node chứa tất cả các dữ liệu. Mỗi cluster được định danh bằng một unique name. Mỗi cluster có một node chính (master) được lựa chọn tự động và có thể thay thế khi gặp sự cố. 
* Node: nơi lưu trữ dữ liệu, tham gia vào việc đánh chỉ mục của cluster cũng như thực hiện việc tìm kiếm. Mỗi node được định danh bằng một unique name.
* Index: Là một tập hợp các document.
* Shard: Tập con các document của một index. Một index có thể có nhiều shard. Có hay loại shard được sử dụng là Primary Shard và Replica Shard.
* Document: một JSON object với một số dữ liệu. Đây là đơn vị dữ liệu cơ bản trong Elasticsearch.
Đối chiếu các khái niệm lưu trữ của Elasticsearch với một hệ quản trị cơ sở dữ liệu
![](https://images.viblo.asia/08db2f29-7f36-4ae8-a449-4a371a320ccc.png)
Cách lưu cấu trúc cơ bản của 1 cluster trong Elasticsearch 
![](https://images.viblo.asia/aca0877e-50b6-47f8-a7e4-fbb7cb3e7ddd.png)
* Elasticsearch sử dụng inverted index để đánh chỉ mục cho các tài liệu. Inverted index là một cách đánh chỉ mục dựa trên trên đơn vị là từ nhằm mục đích tạo mối liên kết giữa các từ và các document chứa từ đó.

**Cơ chế tìm kiếm**

Giả sử có hai văn bản: 
1. The quick brown fox jumped over the lazy dog
2. Quick brown foxes leap over lazy dogs in summer
![](https://images.viblo.asia/e7782b0a-8841-4cbd-846a-b3f912db0426.png)
Khi tìm từ quick brown ,  ta chỉ cần tìm document mà các term xuất hiện: 
![](https://images.viblo.asia/2630a959-bf5b-4fa9-93aa-f5fe36e6fc12.png)
Cả hai document đều khớp với kết quả tìm kiếm, nhưng có thể thấy document 1 có độ chính xác cao hơn so với document 2. 
# Các câu truy vấn cơ bản
* Match query

Là truy vấn chuẩn để thực hiện full text query. Bao gồm truy vấn kết hợp và truy vấn cụm từ hoặc gần đúng. Match query chấp nhận văn bản, số, ngày tháng.
Match query trả về các document chứa ít nhất 1 trong các từ trong truy vấn.

![](https://images.viblo.asia/82be90fb-5489-4805-a054-211e6e2e218a.png)
* Match Phrase Query

Trả về các document chứa cụm từ trong truy vấn.
![](https://images.viblo.asia/d62fda20-f29d-4a51-9af6-a58e70b7651f.png)
* Match Phrase Prefix Query

Trả về các document khớp với tiền tố trong truy vấn.
![](https://images.viblo.asia/97c8aaa9-cec5-4dcd-ad14-8b4a1307b094.png)

* Multi Match Query

Tương tự match query nhưng cho phép tìm kiếm trên nhiều trường.
![](https://images.viblo.asia/33e243cf-2476-4a68-bda8-50d6ee83ce29.png)
* Controlling percision

Sẽ làm gì khi người dung đưa ra 1 truy vấn có 4 từ và cần lấy có các  document chứa ít nhất 3 từ trong đó. Elastic hỗ chợ minimum_should_match parameter, cho phép chỉ ra số terms sẽ so sánh trong tài liệu chứa các kết quả thích hợp .
![](https://images.viblo.asia/73dce494-ca56-47c6-aef1-db22bfda4f8e.png)
* Combining Queries

Combining queries cho phép thực hiện nhiều điều kiện trong tìm kiếm.
![](https://images.viblo.asia/9713b05f-3735-4a11-8f95-39dd1026e02f.png)
* Controlling Analysis

Để nâng cao hiệu quả tìm kiếm cần sử dụng các Analyzer phù hợp.
Analyzer là thành phần được sử dụng để chuẩn hóa các document trong Elasticsearch. 
Các Analyzer thực hiện một số công việc như:
Character filters: Tiền xử lý chuỗi đầu vào như việc loại bỏ các thẻ html_tag hay chuyền ký hiệu & thành thành chữ "and".
Tokenizer: Chuỗi sau khi được làm "sạch" bởi Chracter filters thì sẽ được tách từ bởi một bộ tách từ tokenizer do mình lựa chọn hoặc định nghĩa, đơn giản nhất là tách từ theo khoảng trắng hay dấu chấm câu, các từ được tách ra này gọi là term.
Token filters Cuối cùng, mỗi term được qua Token filters (bộ lọc thẻ) để "làm mượt" thêm, ví dụ như việc chuyển các ký tự hoa về ký tự thường (lowercase) hay loại bỏ các từ dừng (từ xuất hiện nhiều nhưng gần như không ảnh hưởng tới kết quả tìm kiếm).

Query được phân tích bởi analyzer.

![](https://images.viblo.asia/35a5f27f-20d9-4965-8a1a-1d1e67a8b8ce.png)
# Fuzzy Search
 Fuzzy Seach (tìm kiếm "mờ"), hay còn hay được gọi là Approximate Search (tìm kiếm "xấp xỉ") là khái niệm để chỉ kỹ thuật để tìm kiếm một xâu "gần giống" (thay vì "giống hệt") so với một xâu cho trước.

Việc áp dụng kỹ thuật Fuzzy Search giúp cho người dùng dễ dàng tiếp cận được với nội dung hơn, khi mà họ có thể tìm thấy được những thứ cần thiết, ngay cả khi họ không nhớ được chính xác nội dung mình muốn tìm kiếm là gì.

Fuzzy Seach trong Elasticsearch sử dụng nền tảng dựa trên khoảng cách Levenstein.
Khoảng cách Levenshtein giữa chuỗi S1 và chuỗi S2 là số bước ít nhất biến chuỗi S1 thành chuỗi S2 thông qua 3 phép biến đổi là:
- xoá 1 ký tự.
- thêm 1 ký tự.
- thay ký tự này bằng ký tự khác.

Ví dụ: Khoảng cách Levenshtein giữa 2 chuỗi "kitten" và "sitting" là 3, vì phải dùng ít nhất 3 lần biến đổi.

	kitten -> sitten (thay "k" bằng "s")
	sitten -> sittin (thay "e" bằng "i")
	sittin -> sitting (thêm ký tự "g")
   Fuzzy search trong Elasticsearch sử dụng khoảng cách Levenshtein và cho phép ta config tham số fuzziness để cho kết quả phù hợp nhất với nhu cầu:

- 0, 1, 2: Là khoảng cách Levenshtein lớn nhất được chấp thuận. Nghĩa là trong ví dụ trên nếu bạn đặt fuzziness=3 thì "cân đường" sẽ không được tìm thấy với từ khoá "con đường"
- AUTO: Sẽ tự động điều chỉnh kết quả dựa trên độ dài của term. Cụ thể:
```
0..2: bắt buộc match chính xác (khoảng cách Levenshtein lớn nhất là 0)
3..5: khoảng cách Levenshtein lớn nhất là 1
5 trở lên: khoảng cách Levenshtein lớn nhất là 2
```
Đoạn truy vấn ví dụ cho tìm kiếm mờ
![](https://images.viblo.asia/a9fce439-883d-42a2-9224-2b089222c682.png)
# Kết luận
Như vậy ở trên đã hướng dẫn những vẫn đề cơ bản nhất về elasticsearch, hi vọng qua bài viết này sẽ giúp người đọc hiểu thêm hoặc biết thêm một công cụ hỗ trợ việc tìm kiếm kết quả một cách nhanh chóng mà nhiều người cũng như doanh nghiệp tin dùng, mong rằng người đọc sẽ có thể dử dụng tốt nó trong các dự án cũng như công việc của mình. Cảm ơn sự theo dõi của mọi người.