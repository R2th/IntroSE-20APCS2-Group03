Tiếp theo seri này, hôm nay mình sẽ giới thiệu về ngôn ngữ truy vấn SPARQL ! 

## 1.  SPARQL là gì ? 
SPARQL, phát âm là ‘sparkle’, là ngôn ngữ và giao thức truy vấn tiêu chuẩn cho Dữ liệu Mở Liên kết (Linked Open Data) trên web hoặc trong cơ sở dữ liệu đồ họa ngữ nghĩa (còn được gọi là RDF triplestore - bộ 3 RDF).
SPARQL, là viết tắt của Giao thức SPARQL và Ngôn ngữ Truy vấn RDF bằng tiếng Anh, “**SPARQL Protocol And RDF Query Language”**, cho phép những người sử dụng truy vấn thông tin từ các cơ sở dữ liệu hoặc bất kỳ nguồn dữ liệu nào có thể được ánh xạ tới RDF.
Tiêu chuẩn SPARQL được W3C thiết kế và phê chuẩn và giúp những người sử dụng và những người phát triển tập trung vào những gì họ muốn biết thay vì cách mà cơ sở dữ liệu được tổ chức.

SPARQL cho phép người dùng viết các truy vấn rõ ràng. Ví dụ, truy vấn sau đây trả về tên và email của từng người lưu trong dạng dữ liệu dataset:

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?name ?email
WHERE {
 ?person a foaf:Person.
 ?person foaf:name ?name.
 ?person foaf:mbox ?email.
}
```

## 2. SPARQL so với SQL

Hệt như SQL cho phép người sử dụng truy xuất và sửa đổi dữ liệu trong cơ sở dữ liệu quan hệ, SPARQL cung cấp chức năng y hệt cho các cơ sở dữ liệu đồ họa NoSQL như GraphDB.
Hơn nữa, một truy vấn SPARQL cũng có thể được thực thi trong bất kỳ cơ sở dữ liệu nào mà có thể được xem như RDF thông qua phần mềm trung gian (middleware). Ví dụ, cơ sở dữ liệu quan hệ có thể được yêu cầu truy vấn với SPARQL bằng việc sử dụng phần mềm ánh xạ cơ sở dữ liệu quan hệ sang RDF - RDB2RDF (Relational Database to RDF).
>    Đây là những gì làm cho SPARQL trở thành ngôn ngữ mạnh mạnh để tính toán, lọc, tổng hợp và có chức năng truy vấn tiếp (subquery).

Tương phản với SQL, các truy vấn SPARQL không bị ràng buộc phải làm việc bên trong một cơ sở dữ liệu: Các truy vấn liên đoàn (Federated queries) có thể truy cập nhiều kho dữ liệu (các điểm cuối). Hệ quả là, SPARQL vượt qua được các ràng buộc do sự tìm kiếm cục bộ đặt ra.
Sức mạnh của SPARQL cùng với sự mềm dẻo của RDF có thể dẫn tới các chi phí phát triển thấp hơn khi mà việc pha trộn các kết quả từ nhiều nguồn dữ liệu là dễ dàng hơn.
Các lựa chọn thiết kế đó - xúc tác cho các truy vấn đối với các nguồn phân tán về dữ liệu không thống nhất, là không ngẫu nhiên. SPARQL được thiết kế để xúc tác cho Dữ liệu Liên kết (Linked Data) cho Web Ngữ nghĩa (Semantic Web). Mục tiêu của nó là để hỗ trợ cho mọi người làm giàu dữ liệu của họ bằng việc liên kết nó với các tài nguyên ngữ nghĩa toàn cầu khác, cũng như việc chia sẻ, pha trộn, và sử dụng lại dữ liệu theo một cách thức có ý nghĩa hơn.


## 3. Các kiểu truy vấn trong SPARQL 

SPARQL coi dữ liệu của bạn như là đồ họa (graph) có định hướng, được gắn nhãn, điều đó được trình bày nội bộ bên trong như là bộ 3 gồm chủ ngữ, vị ngữ và bổ ngữ (subject, predicate and object).
Một cách tương ứng, truy vấn SPARQL gồm một tập hợp 3 mẫu theo đó từng yếu tố (chủ ngữ, vị ngữ và bổ ngữ) có thể là một biến (wildcard). Các giải pháp với các biến sau đó được thấy bằng việc khớp các mẫu trong truy vấn đó với bộ 3 trong tập hợp dữ liệu.

Ngôn ngữ SPARQL đặc tả bốn loại truy vấn khác nhau cho các mục đích khác nhau.

**1. Truy vấn SELECT**

Sử dụng để trích xuất các giá trị thô từ SPARQL endpoint, các kết quả được trả về trong một định dạng bảng.

**2. Truy vấn CONSTRUCT**

Sử dụng để trích xuất thông tin từ SPARQL endpoint và chuyển kết quả thành dạng RDF hợp lệ.

**1. Truy vấn ASK**

Sử dụng để cung cấp các kết quả dạng True/False đơn giản cho các truy vấn trên SPARQL endpoint

**1. Truy vấn DESCRIBE**

Sử dụng để trích xuất một đồ thị RDF từ SPARQL endpoint, các nội dung đó được đưa tới endpoint để quyết định dựa trên những thông tin có ích.

Mỗi dạng truy vấn đều dùng khối lệnh bên trong từ khóa WHERE để hạn chế truy vấn mặc dù trường hợp truy vấn DESCRIBE từ khóa WHERE là tùy chọn.

Ví dụ : 

Một ví dụ về truy vấn SPARQL các mô hình câu hỏi "tất cả các thủ đô quốc gia ở châu Phi là gì?":

```
PREFIX abc: <http://example.com/exampleOntology#>
SELECT ?capital ?country
WHERE {
  ?x abc:cityname ?capital;
     abc:isCapitalOf ?y.
  ?y abc:countryname ?country;
     abc:isInContinent abc:Africa.
}
```
Các biến được chỉ định bởi tiền tố "?" hoặc "$". Truy vấn rằng buộc các dữ liệu là ?capital và ?country sau đó trả về kết quả.

Để thực hiện các truy vấn ngắn gọn, SPARQL cho phép định nghĩa các tiền tố và các URI cơ sở trong một cách như Turtle. Trong truy vấn này, các tiền tố "abc" là viết tắt của đường dẫn "http://example.com/exampleOntology #".

## 4.Sức mạnh của SPARQL

Điểm mạnh nhất của SPARQL là điều hướng các mối quan hệ (navigating relations) trong dữ liệu đồ họa RDF thông qua việc khớp mẫu đồ họa, nơi mà các mẫu đơn giản có thể được kết hợp trong các mẫu đồ họa phức tạp hơn mà khai thác các mối quan hệ tỉ mỉ hơn trong các dữ liệu đó.
Các mối quan hệ như vậy có thể được khai thác bằng việc sử dụng các mẫu cơ bản, các kết nối mẫu, các liên minh, bằng việc thêm vào các mẫu tùy chọn mà có thể mở rộng thông tin về các giải pháp được tìm thấy, … Hơn nữa, các con đường đúng đắn cho phép sự kết hợp tuần tự (xếp chuỗi), sự kết hợp song song (xen kẽ), sự lặp đi lặp lại (Kleene star), sự nghịch đảo, …
Mẫu đồ họa cơ bản gồm bộ 3 theo đó từng yếu tố (chủ ngữ, vị ngữ và bổ ngữ) có thể là một biến (wildcard).

**Ví dụ,** mẫu ‘John’ (chủ ngữ) → ‘có con’ (vị ngữ) → X (bổ ngữ wilcard - ký tự đại diện) sẽ như là giải pháp cho từng bộ 3 trong đồ họa RDF mà khớp với chủ ngữ, khớp với vị ngữ và có bất kỳ bổ ngữ nào.
Vì thế nếu John có 2 con trai – Bob và Michael, thì bộ ba ‘John’ → ‘có con’ → ‘Bob’ và ‘John’ → ‘có con’ → ‘Michael’ sẽ là các giải pháp cho truy vấn SPARQL.

![](https://images.viblo.asia/eb05f9fd-ead7-4e0a-ab29-06aad9533de5.png)

Truy vấn SPARQL cũng có thể trình bày một liên minh các mẫu đồ họa đan xen nhau. Bất kỳ giải pháp nào cho ít nhất 1 trong số các mẫu là một giải pháp của liên minh đó.
Ví dụ liên minh các mẫu ‘John’ → ‘có con trai’ → X và ‘John’ → ‘có con gái’ → X sẽ như là những giải pháp cho tất cả các con trai của John và tất cả các con gái của John.

![](https://images.viblo.asia/ebc069a4-5bb3-42c3-bc31-b588085e45dd.png)

Mẫu đồ họa nhóm là sự kết hợp của 2 (hoặc nhiều hơn) mẫu đồ họa cơ bản. Không giống như liên minh, nó đòi hỏi rằng cả 2 (hoặc tất cả) các mẫu sẽ khớp nhau. Vì thế sự kết hợp của ‘John’ → ‘có con trai’ → Y và Y → ‘có con trai’ → Z sẽ như là các giải pháp trùng khớp cho các con trai của các con trai của John.

![](https://images.viblo.asia/b6d22390-da88-4dc3-997b-37faf387c87d.png)

Tuy nhiên, các con trai của các con gái của John sẽ không được trả về vì mẫu cơ bản đầu tiên trong truy vấn, ấy là ‘John’ → ‘có con trai’ → Y, sẽ không khớp với bộ 3 trong dữ liệu như ‘John’ → ‘có con gái’ → ‘Anna’.
Vì thế thậm chí nếu, ‘Anna’ → ‘có con trai’ → ‘Timmy’, thì Timmy sẽ không được hiển thị như là giải pháp của sự liên kết ở trên. May thay, mẫu đồ họa đan xen và mẫu đồ họa nhóm có thể dễ dàng kết hợp được với nhau. Vì thế liên minh của ‘John’ → ‘có con trai’ → Y và ‘John’ → ‘có con gái’ → Y được nhóm với Y → ‘có con trai’ → Z sẽ tìm thấy tất cả các cháu của John.

![](https://images.viblo.asia/d7077de3-6b84-4c25-a4a2-921c8a4e20f6.png)

Sự đa dạng rộng lớn các mẫu đồ họa có thể trùng khớp thông qua các truy vấn SPARQL phản ánh sự đa dạng rộng lớn trong dữ liệu mà SPARQL đã được thiết kế - cho dữ liệu của Web Ngữ nghĩa (Semantic Web).
Bằng việc đưa vào các giá trị tùy chọn sao cho các giải pháp không bị từ chối vì vài phần của mẫu không trùng khớp hoặc bằng việc kết hợp các mẫu đồ họa sao cho một trong số vài lựa chọn xen kẽ có thể trùng khớp, SPARQL có thể được sử dụng có hiệu quả và hiệu lực để trích xuất các thông tin cần thiết bị ẩn dấu trong các dữ liệu không thống nhất được lưu trữ trong các định dạng và các nguồn khác nhau.
Như nhà phát minh ra World Wide Web, nhà sáng tạo và bảo vệ Web Ngữ nghĩa và Giám đốc của W3C, Ngài Tim Berners-Lee, đã chỉ ra:
> “Việc cố sử dụng Web Ngữ nghĩa mà không có SPARQL là giống như việc cố sử dụng cơ sở dữ liệu quan hệ mà không có SQL. SPARQL làm cho có khả năng để truy vấn thông tin từ các cơ sở dữ liệu và các nguồn đa dạng khác trong tự nhiên, xuyên khắp Web”.


Nguồn : https://www.ontotext.com/knowledgehub/fundamentals/what-is-sparql/