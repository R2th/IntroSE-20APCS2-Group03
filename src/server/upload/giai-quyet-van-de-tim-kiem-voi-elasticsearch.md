Để có ý tưởng tốt hơn về cách hoạt động của ElasticSearch, hãy cùng xem xét ví dụ.

Hãy tưởng tượng rằng bạn làm việc cho một trang web lữu trữ blog và bạn muốn người dùng tìm kiếm những bài viết cụ thể trên toàn bộ trang web của bạn.

Nhiệm vụ đầu tiên của bạn là thực hiện tìm kiếm từ khoá. Ví dụ, nếu người dùng tìm kiếm "điện tử", thì bạn sẽ trả về tất cả bài viết có chứa từ khoá đó.

Mọi công cụ tìm kiếm sẽ làm việc đó cho bạn. Nhưng để có một tính năng tìm kiếm mạnh mẽ, bạn cần nhiều hơn thế nữa: kết quả được trả về một cách nhanh chóng, và chúng phải liên quan tới từ khoá tìm kiếm.

Sẽ thật tuyệt nếu cung cấp tính năng giúp người dùng tìm kiếm khi họ không biết chính xác về những gì họ đang tìm kiếm. 

Những tính năng này bao gồm: 

* Phát hiện lỗi chính tả.
* Cung cấp gợi ý.
* Chia kết quả  thành cách danh mục.

### Cung cấp chức năng tìm kiếm nhanh

Nếu bạn có một số lướng lớn bài viết trên website của bạn, việc tìm kiếm tất cả các bài đăng có chứa từ khoá "bầu cử" có thể tốn rất nhiều thời gian, và bạn không muốn người dụng phải đợi lâu.

Đó là nơi ElasticSearch giúp bạn bởi vì nó sử dụng Lucence, một thư viện tìm kiếm tốc độ cao, bằng cách tạo tất cả các chỉ mục.

Chỉ mục(index) là một cấu trúc dữ liệu mà bạn tạo cùng lúc với dữ liệu trong DB và có ý nghĩa giúp bạn tìm kiếm nhanh hơn. 

Bạn có thể thêm chỉ mục vào các trường(field) trong hầu hết dabatabase, và có nhiều cách để làm điều đó. 

Lucene thực hiện nó với lập chỉ mục đảo ngược(inverted indexing), có nghĩa là tạo ra một cấu trúc dữ liệu nơi chứa danh sách của mỗi từ.

Ví dụ, nếu bạn muốn tìm kiếm bài viết trên blog bằng những thẻ(tags), sử dụng chỉ mục đảo ngược (inverted indexing) sẽ như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/cv5mw83hcj_image.png)

Như bạn đã thấy dữ liệu ban đầu được tìm theo Blog Post Id, nhưng sau khi sử dụng chỉ mục đảo ngược thì sẽ được tìm theo Tags. Blog Post Id và Tags đảo ngược cho nhau.

Nếu bạn tìm kiếm bài viết mà có thẻ là elections, thì nó sẽ tìm kiếm nhanh hơn nhiều bằng cách sử dụng chỉ mục thay vì kiếm từng từ của từng bài viết, bởi vì bạn chỉ cần tìm nơi lưu trữ của thẻ elections, và sau đó bạn có thể tìm được những Blog Post Ids tương ứng.

Tốc độ này rất có ý nghĩa trong bổi cảnh của công cụ tìm kiếm. Trong thực tế rất hiếm khi bạn tìm kiếm một từ. 

Ví dụ: Bạn tìm kiếm từ khoá "Elasticsearch in Action", bạn tìm kiếm 3 từ có nghĩa là tốc độ của bạn tăng lên gấp 3 lần. 

Chỉ mục đảo ngược cũng phù hợp với công cụ tìm kiếm những thứ có liên quan.

Ví dụ: Khi bạn tìm kiếm từ khoá "peace", thì bạn khổng chỉ tìm thấy những tài liệu phù hợp, mà bạn còn thấy được số lượng tài liệu phù hợp mà không tốn bất kỳ công sức nào. 

Điều này rất quan trọng bởi vì nếu một từ xuất hiện trong hầu hết mọi tài liệu, có nghĩa là từ đó không liên quan nhiều đến nội dung tìm kiếm.

Nếu bạn tìm kiếm từ khoá "Elasticsearch in Action" và có hàng triệu tài liệu chừa từ khoá "in". Tại thời điểm này bạn nhận ra rằng từ khoá "in" là một từ phổ biến, và sự thật là những tài liệu tìm thấy cũng không liên quan gì đến vấn đề bạn tìm kiếm.

Ngược lại, nếu tài liệu bạn có chứa từ khoá "Elasticsearch", thì kết quả của bạn giảm còn xuống hàng trăm, và bạn biết rằng bạn đang tiến gần hơn các tài liệu có liên quan. Nhưng công việc đó không phải là của bạn, Elasticsearch sẽ làm điều đó.

Sự đánh đổi để cải thiện tốc độ và mức độ liên quan là: chỉ mục sẽ chiếm dung lượng ổ đĩa và việc thêm các bài đăng mới sẽ chậm hơn bởi vì bạn cần phải cập nhập lại chỉ mục sau khi thêm dữ liệu. 

### Đảm bảo kết quả có liên quan

Và đây là phần khó nhằng nhất: làm thế nào để những vài viết về chủ đề "elections" xuất hiện trước những bài chỉ chứa từ "elections" nhưng chủ đề của nó hoàn toàn không liên quan.

Với Elasticsearch, bạn sẽ có một vài thuật toán để tính điểm về mức độ liên quan, được sử dụng mặc định để sắp xếp thứ tự của kết quả.

Điểm mức độ liên quan là một số được gán cho từng tài liệu phù hợp với kết quả tìm kiếm và chỉ định mức độ phù hợp của tài liệu.

Ví dụ, nếu một bài viết có chưa từ khoá "elections" nhiều hơn bài viết khác thì có nhiều khả năng đó là cuộc bầu cử "election".

Theo mặc định, thuật toán được sử dụng để tính điểm tài liệu có liên quan là TF-IDF.

TF-IDF là từ viết tắt của term frequency-inverse document frequency, có 2 yếu tố ảnh hưởng đến điểm số liên quan.

* Term frequency - Tài liệu có từ tìm kiếm xuất hiện nhiều lần trong một bài viết được đánh điểm số cao hơn.
* Inverse document frequency - Điểm số của mỗi từ tìm kiếm là khác nhau, nếu từ đó không xuất hiện nhiều trong tài liệu(từ hiếm), thì từ khoá đó được đánh điểm số cao hơn.

Ví dụ: nếu bạn tìm kiếm "bicycle race" (cuộc đua xe đạp), thì từ khoá "bicycle" sẽ ít điểm hơn từ khoá "race". Nhưng nếu từ khoá xuất hiện nhiều lần trong 1 bài viết, thì điểm của bài viết đó sẽ cao hơn.

Ngoài việc chọn một thuật toán, Elasticsearch cung cấp nhiều tính năng tích hợp khác để tính điểm số liên quan phù hợp với nhu cầu của bạn.

Ví dụ: bạn có thể tăng điểm số ở 1 số phần cụ thể, chẳng hạn như tiêu đề của bài đăng  sẽ cao điểm hơn nội dung.

Điều này mang lại điểm số cao hơn cho những tài liệu phù hợp với tiêu chí tìm kiếm có từ khoá trong tiêu đề, so với từ khoá chứa trong nội dung.

Bạn có thể sử dụng script để điều chỉnh cách thức tính điểm.

Ví dụ, nếu bạn cho phép người dùng like bài viết, thì bạn có thể tăng điểm dựa trên số lược like, hoặc bạn có thế tính điểm bài viết mới cao hơn bài viết cũ nếu 2 bài cùng điểm với nhau.

### Tìm kiếm vượt xa hơn kết quả chính xác

Với Elasticsearch, bạn có các tùy chọn để thực hiện việc tìm kiếm của mình trực quan và vượt xa hơn khả năng tìm kiếm chính xác những gì người dùng gõ vào.

Các tùy chọn này rất có ích khi người dùng gõ những từ sai chính tả hoặc sử dụng một từ đồng nghĩa hoặc một từ khác so với những gì bạn lưu trữ. Chúng rất tiện lơi khi người dùng không biết chính xác mình tìm gì khi lần đầu truy cập vào trang web.

**Xử lý lỗi chính tả**

Bạn có thể cấu hình Elasticsearch để có thể cho phép lỗi chính tả, thay vì phải tìm chính xác. 

Có thể xử dụng truy vấn sương mù (fuzzy query) để tìm kiếm cho từ "bicycel" sẽ trả về bài viết "bicycle".

**Hỗ trợ dẫn xuất (derivative)**

Bạn có thể sử dụng chức năng phân tích, để giúp Elasticsearch hiểu rằng một bài viết có tiêu đề là "bicycle" thì sẽ tìm các từ liên quan như là: “bicyclist” hoặc "cycling".

**Sử dụng thống kê**

Khi người dùng không biết tìm kiếm gì, bạn có thể giúp họ bằng nhiều cách. 

Một trong những cách đó là trình bày số liệu thống kê thông qua phân nhóm.

Phân nhóm bằng cách trả về số lượng của kết quả từ câu truy vấn. Như là bao nhiêu chủ đề cho từng danh mục, hoặc trung bình lượt like, share cho từng danh mục.

Hãy tưởng tượng rằng khi vào blog của bạn, người dùng sẽ thấy các chủ đề phổ biến được liệt kê ở phía tay phải. 

Một chủ đề có thể là về xe đạp, những người thích về xe đạp sẽ nhấp vào đó để ta thu hẹp kết quả. Sau đó, bạn có cung cấp chủ đề liên quan như là: "đánh giá xe đạp", "sự kiện xe đạp",...

**Cung cấp gợi ý**

Khi người dùng bắt đầu gõ vào thanh công cụ tìm kiếm, bạn có thể giúp họ khám phá ra những từ tìm kiếm phổ biến. 

Bạn có thể sử dụng gợi ý để dự đoán kết quả tìm kiếm của người dùng, giống như cách làm của hầu hết các công cụ tìm kiếm.

Bạn có thể hiển thị kết quả phổ biến khi người dùng nhập. Sử dụng các loại truy vấn đặt biệt khớp với tiền tố, từ đại diện (wild cards), hoặc biểu thức chính quy. 

### Tổng kết

Các bạn vừa tìm hiểu qua cách hoạt động, và các tính năng đặc trưng của ElasticSearch. 

Trong phần tới mình mô tả ElasticSearch được ứng dụng thực tế như thế nào.

Các bạn đón xem bài viết tiếp theo của mình nhá.

Chúc cả nhà một ngày vui vẻ :)

### Tham khảo

Elasticsearch In Action (Matthew Lee Hinman and Radu Gheorghe)