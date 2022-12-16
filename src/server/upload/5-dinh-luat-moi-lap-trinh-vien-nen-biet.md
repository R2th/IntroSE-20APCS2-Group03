Đây là bài dịch từ trang [medium.com](https://medium.com). Mời các bạn xem bài gốc tại đây: https://medium.com/swlh/5-laws-every-software-developer-should-know-d28c197cce4f

Hiểu được những luật này có thể là chìa khóa thành công.

![](https://images.viblo.asia/70dfba4f-82ac-44c4-be9e-a097778c557a.jpeg)

Phát triển phần mềm là một việc phức tạp hơn các thuật ngữ định nghĩa về nó.  Trong ngành này, kinh nghiệm đóng một vai trò quan trọng trong sự thành công của bất quá trình sự phát triển phần mềm nào.  Kinh nghiệm đã dạy cho chúng ta rất nhiều điều mà chúng ta truyền lại các bài học này cho người khác.

Có một số luật dựa trên kinh nghiệm có thể giúp chúng ta học hỏi từ những sai lầm của những người đi trước và tránh chúng trong tương lai. Một số trong số chúng liên quan đến sự phát triển thuần túy, một số khác liên quan đến quản lý hệ thống. Tất cả chúng đều hữu ích cho sự phát triển của bạn với tư cách là một kỹ sư phần mềm.

Trong bài viết này, tôi sẽ thảo luận về năm định luật mà tôi luôn có trong đầu khi thiết kế hoặc triển khai phần mềm.

### 1. Định luật Murphy
[Luật này](https://en.wikipedia.org/wiki/Murphy%27s_law) được đặt ra bởi **Edward Murphy** - một kỹ sư hàng không vũ trụ - để đáp lại một vụ thử tên lửa thất bại vào đầu những năm 50.
Luật được phát biểu như sau:
> Nếu có gì có thể sai, nó sẽ sai.

Luật này dạy chúng ta tạo ra một thiết kế phòng thủ cho các phần quan trọng của ứng dụng vì cuối cùng sẽ có điều gì đó sai ở một số điểm nào đó.

Khi chúng ta giới thiệu phần mềm cho người dùng cuối, họ sẽ tìm ra những cách sáng tạo để nhập một thứ gì đó mà chúng ta không lên kế hoạch để phá vỡ hệ thống. Vì vậy, chúng ta cần làm cho phần mềm của mình đủ mạnh để phát hiện và xử lý các hành vi không mong muốn.

Luật này được nhấn mạnh trong [kỹ thuật lập trình phòng thủ](https://en.wikipedia.org/wiki/Defensive_programming). Đây là một dạng thiết kế phòng thủ nhằm đảm bảo chức năng vẫn hoạt động tốt của một phần mềm trong những trường hợp không lường trước được.

### 2. Định luật Conway
Vào những năm 60, một kỹ sư tên là **Melvin Conway** [nhận thấy rằng](https://en.wikipedia.org/wiki/Conway%27s_law) cách tổ chức đã được cấu trúc trước đó ảnh hưởng tới thiết kế của hệ thống đang được phát triển. Ông ấy mô tả ý tưởng như sau:
> Các tổ chức thiết kế hệ thống bị ràng buộc phải tạo ra các thiết kế là bản sao của cấu trúc truyền thông của các tổ chức đó.

Luật này rất đúng trong thế giới phát triển phần mềm và thậm chí còn được phản ánh ở cấp độ viết mã. Cách các nhóm được tổ chức để cung cấp các thành phần phần mềm sẽ ảnh hưởng trực tiếp đến thiết kế của từng thành phần.

Ví dụ: một nhóm các nhà phát triển được tập hợp sẽ có xu hướng tạo ra một ứng dụng nguyên khối với các thành phần được ghép nối với nhau. Mặt khác, nếu được chia thành nhiều nhóm phân tán sẽ có xu hướng tạo ra nhiều dịch vụ riêng biệt với sự phân tách rõ ràng hơn cho mỗi nhóm.
Cả 2 thiết kế đều không tốt hay xấu, nhưng cả hai đều bị ảnh hưởng bởi cách (các) nhóm giao tiếp với nhau. Các dự án nguồn mở, với nhiều cá nhân trên toàn cầu, thường là những ví dụ tuyệt vời về tính mô-đun và các thư viện có thể tái sử dụng.

### 3. Định luật Kernighan
Luật Kernighan được lấy theo tên **[Brian Kernighan](https://en.wikipedia.org/wiki/Brian_Kernighan)** và bắt nguồn từ một trích dẫn trong cuốn sách **[Các yếu tố của phong cách lập trình](https://en.wikipedia.org/wiki/The_Elements_of_Programming_Style)** của Kernighan và Plauger.
> Gỡ lỗi khó gấp đôi so với viết mã ngay từ đầu. Do đó, nếu bạn viết mã một cách khéo léo nhất có thể, theo định nghĩa, bạn sẽ không đủ thông minh để gỡ lỗi nó.

Nó hàm ý rằng làm cho mã đơn giản được ưu tiên hơn mã phức tạp vì việc gỡ lỗi khi bất kỳ vấn đề nào phát sinh với mã phức tạp có thể tốn kém hoặc thậm chí không khả thi.

Điều này đề cập đến vấn đề mà đa số các nhà phát triển phần mềm gặp phải trong công việc hàng ngày. Nó nhấn mạnh tầm quan trọng của mã đơn giản và con người có thể đọc được về lâu dài.

### 4. Định luật Knuth
[Luật này](https://en.wikiquote.org/wiki/Donald_Knuth#Quotes) của **Donald Knuth** nhắc nhở chúng ta rằng đừng bao giờ cố gắng tối ưu hóa mã của một ứng dụng quá sớm hoặc cho đến khi nó thực sự cần thiết.
> Tối ưu hóa sớm là gốc rễ của mọi vấn đề (hoặc ít nhất là hầu hết) trong lập trình.

Thật vậy, một mã nguồn được tạo ra với sự đơn giản và dễ đọc sẽ đáp ứng được 99% nhu cầu về hiệu suất và sẽ cải thiện đáng kể khả năng bảo trì của ứng dụng đó.

Trong *Java* hoặc *C#*, các *String* là cố định. Chúng ta được dạy sử dụng các cấu trúc khác để xây dựng các *String* động, như *StringBuilder*. Nhưng trên thực tế, cho đến khi bạn đã đo lường hiệu năng của ứng dụng, bạn thực sự không biết bao nhiêu lần một *String* sẽ được tạo và tác động đến hiệu suất là gì. Đây là một ví dụ cổ điển về tối ưu hóa quá sớm.

Theo quy tắc ngón tay cái, chúng ta nên đo lường đầu tiên trước khi bắt đầu tối ưu hóa bất cứ thứ gì.

### 5. Định luật Linus
Luật này được đặt tên để vinh danh **Linus Torvalds** trong cuốn sách của Eric S. Raymond “[Nhà thờ và Chợ phiên](https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar)”. Nó nói rằng càng nhiều người nhìn thấy một vấn đề, thì khả năng một người nào đó đã nhìn thấy và giải quyết vấn đề đó hoặc một cái gì đó tương tự càng cao.
> Với đủ nhãn cầu, tất cả các lỗi đều nông cạn.

Mặc dù ban đầu nó được sử dụng để mô tả giá trị của các mô hình mã nguồn mở cho các dự án. Nó cũng có thể được mở rộng cho các quy trình - nhiều đánh giá mã hơn, phân tích tĩnh hơn và các quy trình kiểm thử đa nguyên tắc sẽ làm cho các vấn đề hiển thị và dễ xác định hơn.

### Cuối cùng
Việc tuân theo mọi luật sẽ không giúp chúng ta trở thành nhà phát triển phần mềm tốt nhất, nhưng điều đó giúp chúng ta hiểu rõ hơn về chúng. Nhiều người trong chúng ta trực tiếp hoặc gián tiếp bắt gặp những quy luật này trong cuộc sống, công việc hàng ngày.

Là một nhà phát triển phần mềm, thật tốt khi nhận thức được những luật này vì chúng có những bài học giúp chúng ta phát triển trong sự nghiệp của mình.