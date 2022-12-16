## Lời nói đầu
   Mặc dù, có rất nhiều bài viết giới thiệu về Full Text Search, Elasticsearch, Elasticsearch trong Rails, cách cài cắm, sử dụng ...,trên Viblo cũng như trên Internet mà các bạn có thể dễ dàng tìm kiếm được.
Nhưng mình vẫn muốn viết 1 bài về Elasticseach dưới góc nhìn của mình để cho các bạn mới làm việc với Elasticsearch sẽ có cái nhìn dễ dàng hơn với "công cụ" search nổi tiếng và vô cùng mạnh mẽ này.

## Elasticsearch là gì?
   Mình xin mạn phép diễn giải theo ý hiểu của mình :v, còn để có định nghĩa chính xác, và đầy đủ nhất các bạn có thể tham khảo trên Google thông qua keyword: "Elasticsearch là gì?" sẽ ra cơ số kết quả nhaa =)))
- Theo ý hiểu của mình thì Elasticsearch (ES) cơ bản là "công cụ" hỗ trợ tìm kiếm văn bản, bất cứ cái gì có dạng văn bản text, string, file (PDF, word, excel) ... là nó hỗ trợ tìm kiếm sất. Ngoài ra còn vài cái kiểu như thu thập, đánh giá kết quả tìm kiếm ... thì mình tạm thời không đề cập đến nha :D
- Vậy tại sao phải dùng ES trong khi tìm kiếm văn bản có thể sử dụng câu lệnh like SQL cũng được mà? OK, ví dụ dưới đây sẽ phần nào giải thích cho các bạn hiểu. Ví dụ có 1 từ khóa là "one":

    (1) Nếu search bằng truy vấn LIKE "%one%" thì kết quả sẽ chỉ cần chứa "one" là ra, vd: "phone", "zone", "money", "alone" ... nói chung sẽ là 1 list kết quả không mong muốn
Còn search bằng ES thì gõ "one" sẽ chỉ có "one" được trả về mà thôi ^^

    (2) Ví dụ nữa là ..., tiếng Việt mình đi, bạn có từ khóa có dấu là "Sơn Tùng", mà lại gõ "Son Tung" thì truy vấn LIKE là sẽ không trả về được kết qủa đó (như thế là hỏng rồi, tìm Sếp mà mãi k ra =))) ), nhưng cái này ES làm được nha

    (3) Về Perfomance thì ES sẽ là tốt hơn, truy vấn LIKE sẽ tìm kiếm đơn thuần toàn văn bản không sử dụng `index`, nghĩa là tập dữ liệu càng lớn thì tìm kiếm càng lâu, trong khi ES lại "đánh index" cho các trường được chọn để tìm kiếm, cái này thì hồi sau đến đoạn Demo mình nó rõ hơn còn giờ các bạn cứ tạm công nhận như vậy đi (lol)

## Elastisearch hoạt động như thế nào?
Elasticsearch là 1 server riêng biệt để "phục vụ" việc tìm kiếm dữ liệu. Hiểu đơn giản thì là như thế này:
- ES sẽ chạy 1 cổng (dưới local defaul là 9200), App mình chạy 1 cổng riêng (dưới local hay là 3000). Người ta cũng có thể dùng ES là DB chính nhưng thường không ai làm thế vì cái gì cũng có nhiệm vụ riêng biệt của nó, ES không mạnh trong các thao tác CRUD, nên thường sẽ dùng song song với 1 DB chính (SQL, MySQL, MongoDB ...)

- Tóm gọn, mô tả theo cách hiểu của mình thì quá trình hoạt động của ES sẽ được mô tả như sau:

    (1) Tạo Mapping

    (2) Reindex Data & Push Data lên Server ES

    (3) Get Data từ server ES về

### 1. Tạo Mapping
Mapping là quá trình định nghĩa làm thế nào một document và các fields của nó được lưu trữ và đánh index. Cụ thể sử dụng mapping để định nghĩa:
- Fields nào được sử dụng như full text search, fields nào cần anaylstic (phân tích)
- Field nào chứa numbers, dates hay geolocations ...
- Kiểu dữ liệu của fields
- Các Custom khác ... 

Ví dụ:
- Có 1 bảng Faq với các column (Title, Question, Answer, Date, Priority, Tag, Color ....) mục đích tìm kiếm chỉ theo 3 trường là Title, Question, Answer thì chúng ta chỉ cần xây dựng Mapping đánh Index cho Title, Question, Answer mà thôi, còn các trường khác không cần care

Tạo Mapping là phần đầu tiên cũng là phần quan trọng nhất trọng quá trính xây dựng lên base ES, nên các bạn chú ý tổ chức Mapping sao cho hợp lý và tối ưu nhất

### 2. Reindex Data
Quá trình này gồm 2 phần đánh Index và đẩy dữ liệu lên ES

#### 2.1 Inverted Index
- Sở dĩ ES trả về kết quả search cực nhanh bởi vì thay vì tìm kiếm text by text, ES tìm kiếm bởi `inverted index`. Cái này thì hơi trừu tượng 1 chút, hiểu đơn giản thì dữ liệu là 1 quyển sách, để tìm kiếm nhanh thì người ta sinh ra 1 cái là mục lục đánh dấu các content, thì cách mục lục bản chất giống như việc đánh index vậy.
 
- Công việc đánh Index nge chưng khá đơn giản nhưng bên dưới ES làm khá nhiều việc.
Mysql bình thường sẽ đánh theo các trường trng bảng cụ thể như (name, email ...), Tuy nhiên ES sẽ đánh index theo đơn vị là term, cụ thể như sau:
    ```
    Title (A1) = "Hello World"
    Question (A2) = "What is the World"
    Answer (A3) = "Hello Baby"
    ```

- Vậy thì Invered Index sẽ như sau
    ```
    "Hello" => {A1, A3}
    "World" => {A1, A2}
    "What" => {A2}
    "is" => {A2}
    "the" => {A2}
    "Baby" => {A3}
    ```

- Có thể thấy các từ sẽ được tách thành tổ hợp các Term. Và công việc tìm kiếm sẽ dựa trên tổ hợp các term này. Ở đây sẽ phát sinh 1 câu hỏi là làm sao ES tách được các chuỗi thành các Term? Phần này liên quan đến Core bên trong ES nó giải quyết rồi, mình chỉ giải thích 1 chút:

- `Tokenize` là bài toán quan trọng trong thuật toán tìm kiếm của ES, trong đó có 2 kỹ thuật cơ bản:
    
    (1) N-Gram Morphological Analysis: là kỹ thuật chia các chuỗi to thành các chuỗi con theo trọng số với độ dài N, N = (1..3), ví dụ N = 2, khi tách chuối "HELLO WORLD" ta sẽ được các term như sau
    ```
    "HELLO WORLD" => {"HE", "EL", "LL", "LO", "O ", " W", "WO", "OR", "RL", "LD"}
    ```

    (2) Morphological Analysis http://en.wikipedia.org/wiki/Morphology_(linguistics) (MA) là kỹ thuật xử lý ngôn ngữ tự nhiên (National Language Procesing). Đơn giản là kỹ thuât tách các chuỗi thành từ có nghĩa dựa theo ngôn ngữ, ví dụ "HELLO WORLD" sẽ được phân tích như sau:
    ```
    "HELLO WORLD" => {"HELLO", "WORLD"}
    ```
     2 kỹ thuật này sẽ được phối kết hợp với nhau vì ngôn ngữ khá đa dạng và luôn thay đổi nên đôi khi chỉ sử dụng kỹ thuật MA sẽ không chính xác trong 1 số trường hợp nhất định


#### 2.2 Push Data lên Server ES
- Sau khi đánh Index xong, chúng ta phải push dữ liệu lên Server ES. Về nguyên lý thì chính là gửi request đến server của ES, may mắn thay phần này trong Rails chúng ta có các Gem hỗ trợ, chỉ cần gõ các method được Gem define để đẩy lên, không phải xây dựng Request để gửi lên (yaoming). Có rất nhiều gem để implement ES trong Rails, tuy nhiên trong phạm vi bài này mình sẽ chỉ giới thiếu cũng như Demo cách implement ES trong Ruby on Rails gem `Searchkick` 
- Và việc push dữ liệu lên ES với gem `Searchkick` rất đơn giản, ví dụ ta cần đẩy bảng Faq lên server ES thì đơn giản làm như sau:
    ```
    Faq.reindex
    ```
- `reindex` là method được gem Searchkick define hỗ trợ cho việc push data lên server ES. Để tìm hiểu hơn về kỹ thuật này các bạn có thể tham khảo tại [đây](https://github.com/ankane/searchkick).
- Xong xuôi quá trình Reindex Data dưới local các bạn có thể check lại bằng cách vào url sau: http://localhost:9200/all/mapping để xem lại thành quả :D


### 3. Get Data từ server Elasticsearch về
Sau khi dữ liệu đã có trên ES, chúng ta phải lấy về để dùng, giống như SQL bình thường, khi muốn lấy data về chúng ta phải sử dụng các lệnh SQL kiểu như `Select` ... thì bên ES cũng define kiểu query của riêng họ, được gọi là query DSL. Về cơ bản thì query này sẽ tạo 1 request với format nhất định và gửi request này lên server ES (cổng 9200) để get dữ liệu về. Sẽ kiểu như thế này

``` 
Faquestion Search (11.6ms)  curl http://localhost:9200/faquestions_development/_search?pretty -H 'Content-Type: application/json' -d '{"query":{"bool":{"must":[],"filter":[{"term":{"field_id":1}}],"must_not":{"exists":{"field":"deleted_at"}}}},"size":10000,"from":0,"highlight":{"fields":{"title.analyzed":{},"question.analyzed":{},"answer.analyzed":{}}}}'
```

Xây dựng query dsl là 1 phần quan trọng không kém với việc xây dựng mapping mà phía đầu mình có nói đến, để nói sâu hơn về query này và các kiểu query thông thường từ cơ bản đến nâng cao mình sẽ đề cập thêm khi Implement ES với 1 ứng dụng Rails ở phần tới ^^

## Tạm kết
Trên đây là 1 cách giới thiệu về ES theo góc nhìn và kinh nghiệm của mình, hy vọng cách nhìn nhận vấn đề này sẽ ít nhiều mang lại sự đơn giản cho các bạn khi mới tiếp cận làm việc với ES.
Trong phần tới mình sẽ đi sâu hơn về việc triển khai ES trong 1 ứng dụng Rails cụ thể (từ việc cài cắm Server Elasticsearch ở local, xây dựng Mapping, đánh Index data và query lấy dữ liệu về ...)