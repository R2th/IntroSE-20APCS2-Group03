# Giới thiệu
### Android Architecture

Dựa theo các khái niệm trên Internet, chúng ta biết rằng **Software Architecture** liên quan đến các cấu trúc cấp cao của một hệ thống phần mềm, hay các quy tắc trong việc hình thành nên các cấu trúc,...

Nói một cách đơn giản, việc quyết định và triển khai một kiến trúc code cụ thể hay một *pattern* là những gì mà chúng ta, các developer phải thường xuyên gặp phải.

### Vấn đề
* Một vài vấn đề chung như việc mắc nối chặt chẽ giữa các block code khiến cho thậm chí dù chỉ một sự thay đổi nhỏ ở một block code này sẽ ảnh hưởng hoặc có thể trở thành bug ở một block code khác.
* Khả năng copy-paste các đoạn code bị hạn chế.

### Giải pháp
Bản thân Android được viết dưới dạng mô hình *MVC*, nơi mà `Activity` sẽ chịu trách nhiệm về mọi thứ. Đối với một ứng dụng đơn giản, có lẽ việc sử dụng mô hình *MVC* là ổn, nhưng một khi độ phức tạp tăng lên sẽ đồng nghĩa với việc số lượng các vấn đề và trở ngại cũng tăng lên.

Ngày nay có rất nhiều mô hình khác nhau như *MVP*, *FLUX*, *MVI*, *MVVM*,.... Và tất nhiên, sẽ có rất nhiều các mô hình có thể giải quyết được các vấn đề nêu ở trên. Chúng ta có thể sử dụng bất kì mô hình nào chúng ta muốn, tuy nhiên chúng cần đáp ứng được các vấn đề sau:
* *Maintainable*.
* Có thể update/ refactor một cách dễ dàng.
* Mọi thứ đều hoạt động tốt.

### Mục tiêu
Và dựa trên các điều trên, chúng ta có thể thấy được một bức tranh tổng quan và mục đích của chúng ta cần xây dựng một hệ thống mà những thứ liên quan đến Android cần được gom vào một nơi, những thực thể khác - không cần đến Android để khởi chạy sẽ được phân tách ra ngoài, tiếp tục chia nhỏ các thực thể không cần đến Android thành các module code và điều này sẽ khiến cho code sẽ dễ dàng mở rộng, cũng như việc *maintain*.

# Vậy tại sao lại chọn MVVM?
Có rất nhiều trang blog cũng như bài viết chia sẻ về `architecture patterns`. Dựa vào các con số thống kê cũng như các phân tích, quan điểm trong các bài viết đó, không thể phủ nhận được sự phổ biến và phạm vi sử dụng của **MVP** (**Model** - **View** - **Presenter**). Ở một mức độ nhất định nào đó, **MVP** có thể hoàn toàn giải quyết các vấn đề của bài toán đưa ra nhưng tuy nhiên sẽ đến một lúc mà có những vấn đề **MVP** không thể nào giải quyết được.

Dưới đây là phát thảo cấu trúc của 2 mô hình **MVP** và **MVVM**

![MVP](https://images.viblo.asia/00845729-9faa-4590-8ddd-805e41cf60a4.png)

![MVVM](https://images.viblo.asia/c81ae6b3-9e94-4fd4-ba34-64b283efb9f3.png)

Chúng ta sẽ bắt đầu với các vấn đề sẽ xảy ra với **MVP** và cách mà **MVVM** có thể khắc phục chúng.

### Tight Coupling

Đối với mỗi *Activity/Fragment (View)*, chúng ta cần có môt *Presenter*. Đây là một ràng buộc chặt chẽ. *Presenter* sẽ tham chiếu đến *Activity* tương ứng và ngược lại. Mối quan hệ *1:1* này chính là nơi phát sinh vấn đề.

Khi mà độ phức tạp của *view* tăng lên, điều này đồng nghĩa với việc duy trì và xử lý các mối quan hệ này cũng càng trở nên phức tạp. Và nó dẫn đến cùng một vấn đề mà đó là chúng ta cần phải chỉnh sửa lại toàn bộ các mối quan hệ.

Và theo như mục tiêu được đưa ra ở đầu bài viết, chúng ta cần xây dựng một hệ thống phân tán. Để đạt được điều này và tránh sự ràng buộc của các mối quan hệ chặt chẽ, *ViewModel* được ra đời.

*ViewModels* là các *simples classes* sẽ tương tác với tầng logic/model, chỉ hiển thị trạng thái/dữ liệu và hoàn toàn không có liên quan đến vấn đề ai hay việc data sẽ được sử dụng như thế nào. Và một vấn đề khác được giải quyết đó chính là chỉ có *View(Activity)* tham chiếu đến *ViewModel*, điều này giải quyết được các ràng buộc chặt chẽ mà chúng ta gặp phải khi sử dụng *MVP*. Một *View* có thể tham chiếu đến nhiều *ViewModels* (*1:n*).

### Testability

Bởi vì *Presenter* bị ràng buộc cứng với *Views*, nên dẫn đến việc viết UT cũng trở nên khó khăn hơn vì nó có sự phụ thuộc của *View*.

Việc viết UT đối với *ViewModels* thậm chí còn dễ dàng hơn nhiều khi nó chỉ hiển thị trạng thái/data và do đó có thể test một cách độc lập mà không cần quan tấm đến việc nó sẽ được sử dụng như thế nào - điều này có nghĩa là nó không có sự phụ thuộc của *Views*.

# Kết luận
Tuy không thể phủ nhận được sự ảnh hưởng cũng như sự tuyệt vời của *MVP* nhưng luôn tồn tại các vấn đề phát sinh và chính các vấn đề này, đã cho ra đời các cấu trúc tiên tiến hơn và chúng ta phải công nhận rằng *MVVM* có một tầm quan trọng trong việc giải quyết một số vấn đề chúng ta gặp phải khi sử dụng các cấu trúc khác, đặc biệt là với *MVP*.

Trên đây là những luận điểm cho thấy được tầm quan trọng cũng như cách mà *MVVM* giải quyết các vấn đề của *MVP*. Đương nhiên, ở một góc nhìn khác, có thể sẽ có nhiều hơn các vấn đề mà *MVVM* có thể giải quyết được, hoặc sẽ có các vấn đề xảy ra với *MVVM* và sẽ cần một cấu trúc khác thay thế.

Suy cho cùng, không gì là hoàn hảo cả, khi một vấn đề được tìm thấy và nếu như chúng ta cảm thấy đó là điều cần thiết để thay đổi thì lúc đó có thể những thứ đi trước sẽ trở nên *lạc hậu* và chúng ta cần update những *thứ mới* (ở đây chính là các mô hình). Và sự hoàn hảo ở đây, cũng phụ thuộc vào quy mô của dự án mà chúng ta áp dụng, có thể đối với dự án này, *MVVM* là một sự lựa chọn thích hợp nhưng khi ở một dự án khác, nó có thể sẽ trở thành *thảm họa*.

Cảm ơn các bạn đã đọc bài.

Tham khảo : Android Pub