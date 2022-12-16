Đây đã là Seri số 4 trong loạt bài về Semantic Annotation rồi, không biết còn ai đọc không :))) 
Thực ra đây là miền kiến thức không mới, nhưng không phải phổ biến và "trending" nên khá ít người biết và muốn tìm hiểu. Cá nhân với bản thân mình, đây là nội dung mình tìm hiểu và làm đồ án, nên mình đã tìm hiểu rất nhiều về nó. Lý do mình tiếp tục viết cõ lẽ là cũng sợ mình quên, bởi hiện tại mình đã đi làm không làm về lĩnh vực này nên âu viết vừa để ôn lại, vừa viết cho chính bản thân mình để bản thân sẽ nhớ về nó. Viết để cho bạn nào đi sau có thể hiểu được sơ qua về miền vấn đề này ... 
Thôi không lan man nữa, tiếp tục nào ! 

Tóm tắt một tý nhỉ ? 
**Phần 1:  Semantic Web - Web ngữ nghĩa** mình giới thiệu sơ qua về các khái niệm, công dụng và sức mạnh của Semantic Annotation
**Phần 2: Cách thức Semantic Annotation** hoạt động thì đúng như tên của nó, mình chia sẻ cách Semantic hoạt động  
**Phần 3: Ontology và RDF** từ phần này, mình chia sẻ các khái niệm "chuyên ngành" hơn, nhưng cũng là khái niệm cơ bản của  Semantic Annotation
Và phần này, sẽ tiếp tục là khái niệm cơ bản như thế, đó chính là **RDF Triplestore**, một trong những khái niệm là cốt lõi của Semantic Annotation! 

### 1. Khái niệm RDF Triplestore

RDF triplestore là dạng cơ sở dữ liệu đồ thị lưu trữ các sự việc theo ngữ nghĩa. Là cơ sở dữ liệu đồ thị, triplestore lưu trữ dữ liệu như là mạng các đối tượng với các đường liên kết được cụ thể hóa giữa chúng. Điều này làm cho RDF triplestore trở thành lựa chọn được ưu tiên để quản lý các dữ liệu được kết nối cao độ với nhau. Triplestore là mềm dẻo và ít tốn kém hơn so với cơ sở dữ liệu quan hệ
Cơ sở dữ liệu RDF, thường được gọi là cơ sở dữ liệu đồ thị ngữ nghĩa, cũng có khả năng điều khiển các truy vấn ngữ nghĩa mạnh và sử dụng suy diễn để phát hiện ra thông tin mới vượt ra khỏi các mối quan hệ đang tồn tại.

### 2. Thành phần RDF Triplestore

Thành phần RDF triplestore là các ontologies ! hay nói cách khác, RDF triplestore mô tả các sự việc thông qua ontologies

Cấu tạo : 

![](https://images.viblo.asia/b7477576-072f-4854-bf79-67a13717f546.png)

3 thành phần của RDF triplestore là chủ ngữ → vị ngữ → bổ ngữ (subject → predicate → object) . 
Bộ 3 trên định nghĩa các lớp đối tượng và các thuộc tính quan hệ, và trật tự phân cấp của chúng.

Dữ liệu trong RDF triplestore được lưu trữ trong mối quan hệ được gọi là triple (bộ 3), vì thể có tên là triplestore. Bộ 3 đó cũng được tham chiếu tới như là ‘các câu lệnh’ và ‘các câu lệnh RDF’.

Ví dụ : " Tôi học Semantic Annotation"
Thì sẽ được mô tả dứoi dạng triple như sau :
Tôi - Học - Semantic Annotation
Với Tôi là chủ ngữ (subject), học là vị ngữ (predicate),  Semantic Annotation là  bổ ngữ (object)
Ở đây, Tôi, Học , Semantic Annotation là các ontology đã được định nghĩa trong cơ sở tri thức. Vị ngữ (học)  chỉ ra cách mà chủ ngữ và bổ ngữ được kết nối.

### 3. Tham chiếu tới dữ liệu phi cấu trúc

Các triplestore cũng giúp trích xuất thông tin và làm giàu nội dung từ các dữ liệu phi cấu trúc bằng việc khai thác văn bản (text mining). Sau khi văn bản được trích xuất từ bất kỳ dạng dữ liệu phi cấu trúc nào, dù nó là các bài báo hay tài liệu, thì các câu được chia thành các phần bài nói chuyện. Các khái niệm và các thực thể quan trọng, như các danh từ riêng, được nhận diện bằng các danh sách từ trong từ điển.

Công nghệ ngữ nghĩa và các thuật toán máy học phân loại và làm sáng tỏ ngữ nghĩa giữa các thực thể. Bằng ‘việc học’ ngữ cảnh và ý nghĩa của các thực thể, các thuật toán có khả năng làm sáng tỏ ngữ nghĩa ‘Paris’, ví dụ, dù nó được tham chiếu tới Paris, nước Pháp, hay Paris, Texas, hoặc Paris Hilton, hay Paris, Chúa Trời trong thần thoại Hy Lạp.

Ngoài các mối quan hệ đang có, các bộ 3 cũng trình bày các liên kết giữa các cơ sở dữ liệu với các dữ liệu và tài liệu có cấu trúc mà chứa văn bản tuôn chảy tự do, phi cấu trúc. RDF triplestore, thường được tham chiếu tới như là cơ sở dữ liệu đồ thị và graph db, liên kết các thực thể từ đó chúng đã được trích xuất.

### 4. Ứng dụng 

RDF triplestore điều khiển lượng dữ liệu khổng lồ, chúng cải thiện cho sức mạnh tìm kiếm và phân tích của các tổ chức. Điều quan trọng hơn là các triplestore có khả năng suy diễn ra các sự việc tiềm ẩn vượt ra khỏi các câu lệnh rõ ràng. Việc suy diễn ra các mối quan hệ nằm ngoài dữ liệu ban đầu, với sự trợ giúp của cơ sở dữ liệu đồ thị ngữ nghĩa, biến thông tin thành tri thức. Điều này cho phép các tổ chức phát hiện ra các mối quan hệ ẩn dấu trong khắp các dữ liệu của họ.

Giành được nhiều tri thức hơn các đối thủ cạnh tranh, các doanh nghiệp có thể dễ dàng hơn trong việc mở rộng phạm vi tri thức đó thành các giải pháp thông minh hơn và có được lợi thế lớn hơn trong cạnh tranh. Truyền thông & xuất bản, y tế và khoa học đời sống, nhân văn số và các lĩnh vực dịch vụ tài chính đang sử dụng rộng rãi rồi RDF triplestore để quản lý các dữ liệu có cấu trúc và phi cấu trúc.

Các cơ sở dữ liệu RDF triplestore được sử dụng thành công cho việc quản lý các tập hợp dữ liệu của Dữ liệu Mở Liên kết (Linked Open Data), như DBPedia và GeoNames, chúng được xuất bản như là các RDF và được kết nối với nhau. Dữ liệu Mở Liên kết cho phép truy vấn và trả lời các truy vấn có tính liên đoàn nhanh hơn nhiều và để giành được các kết quả tìm kiếm thích hợp cao.

Triplestore làm cho những nỗ lực truy vấn dữ liệu đa dạng và đang tiến hóa từ các nguồn khác nhau hiệu quả hơn về chi phí và tốn ít thời gian hơn.

Tạm thời thế đã nhỉ :))) Bài sau mình sẽ nói thêm về ngôn ngữ SPARQL ! mội ngôn ngữ chuyên dùng trong Semantic Annotation !!!!