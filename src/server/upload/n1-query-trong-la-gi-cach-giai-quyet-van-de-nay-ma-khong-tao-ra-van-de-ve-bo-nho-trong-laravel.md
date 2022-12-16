## 1. Giới thiệu
Một trong những vấn đề phổ biến của các lập trình viên khi họ tạo ứng dụng với ORM là truy vấn N + 1 trong ứng dụng của chúng ta. Vấn đề truy vấn N + 1 là một cách truy vấn cơ sở dữ liệu không hiệu quả khi ứng dụng của chúng ta tạo ra một truy vấn cho mỗi đối tượng đang gọi. Sự cố chủ yếu xảy ra khi chúng ta cung cấp danh sách dữ liệu tìm nạp từ cơ sở dữ liệu mà không thực hiện kỹ thuật tải mong muốn. May mắn thay, Laravel Eloquent của đã cung cấp cho chúng ta công cụ **eager loading** để có sẵn sàng đặt bảng nào sẽ được load một cách đơn giản.

Lấy ví dụ đơn giản về cách sử dụng **eager loading** trong Laravel. Giả sử, chúng ta có một ứng dụng web đơn giản là muốn hiển thị danh sách tiêu đề bài viết đầu tiên từ người dùng ứng dụng. Chúng ta có thể có mối quan hệ mô hình đơn giản như thế này:

*Mô hình quan hệ giữa  User với Article*

![](https://images.viblo.asia/9d27837e-3bd1-4dad-a54c-80c96a3935a8.png)

Tạo một route để đi đến trang test cho ví dụ trên:

![](https://images.viblo.asia/3d8da17a-08c5-40ec-8b4a-d79bd421c361.png)

Với một template test.blade.php đơn giản để hiển thị danh sách user với tiêu đề bài viết đầu tiên tương ứng:

![](https://images.viblo.asia/8492a345-338a-4d79-8a8e-3bcbdbbbf24c.png)

Sau đó khi vào vào trang demo chúng ta sẽ thấy như sau:

![](https://images.viblo.asia/e3846e01-66b2-4088-9b0b-e494677ec240.png)

Bây giờ vào trang test để xem một số thông số được hiển thị trên thanh debug bar nhé. Có 11 truy vấn để hiển thị 10 tiêu đề bài viết đầu tiên của người dùng, trong đó một truy vấn là để tải tất cả dữ liệu người dùng và phần còn lại là tải dữ liệu bài viết tương ứng của người dùng. Có thể thấy rằng 10 người dùng cho ra 10 câu truy vấn bài viết khác nhau. Điều kiện này được gọi là vấn đề truy vấn N + 1.

## 2. Giải quyết vấn đề N+1 query với eager load
Với ví dụ trên thì bạn có thể cảm thấy rằng nó không có vấn đề gì với hiệu suất ứng dụng của bạn cả. Nhưng điều gì sẽ xảy ra nếu chúng ta cần hiển thị không phải là 10 dữ liệu mà là một con số lớn hơn thế nhiều lần? Và thông thường, chúng ta cũng phải xử lý với logic phức tạp hơn thế và bao gồm nhiều hơn một N + 1 truy vấn trong một trang. Điều này đó có thể tạo ra hơn 11 truy vấn hoặc thậm chí nó có thể tạo ra các truy vấn tăng trưởng theo cấp số nhân. Vì vậy, làm thế nào chúng ta giải quyết nó? Có một câu trả lời phổ biến cho nó: **Eager Load**

### 2.1 Eager Load là gì?
Eager load là quá trình truy vấn cho một loại thực thể cũng load các thực thể liên quan như một phần của truy vấn ấy. Trong Laravel, chúng ta có thể tải dữ liệu eloquent relationship bằng cách sử dụng phương thức *with (..)*. Trong ví dụ trên, chúng ta nên điều chỉnh cách viết code với những thay đổi sau:

Sửa lại code phần tạo route bằng cách thêm eager load aticles khi load users

![](https://images.viblo.asia/64cf8bba-732d-4c42-ba89-65502c1192df.png)

Sửa lại đoạn code trong test.blade.php

![](https://images.viblo.asia/e984123b-89af-4b2b-b3c5-e60a59bebf1e.png)

Và cuối cùng chúng ta giảm được truy vấn xuống chỉ còn 2

![](https://images.viblo.asia/0e73eb27-a43b-4f6c-ac53-244decd4b7a9.png)

*Trang sau khi sử dụng eager load với hasOne relationship*

Chúng ta cũng có thể tạo mối quan hệ hasOne với truy vấn có liên quan để tìm nạp bài viết đầu tiên của người dùng:

![](https://images.viblo.asia/8afda2e7-82f8-4422-bff1-83a713a9ee15.png)

*hasOne relationship để lấy bài viết đầu tiên của mỗi user*

Sau đó, chúng ta có thể eager load nó khi load user:

![](https://images.viblo.asia/f3783f0c-6cf4-4235-bc2b-327d481d283d.png)

Và đây là kết quả:

![](https://images.viblo.asia/f7399d5a-d215-407d-82dc-504313149086.png)

*Trang sau khi sử dụng eager load với hasOne relationship*

Cuối cùng, chúng ta đã có thể giảm các truy vấn của mình và giải quyết vấn đề truy vấn N + 1. Tuy nhiên, chúng ta đã thực hiện tốt việc cải thiện hiệu suất website của mình chưa? Và câu trả lời có thể thể là chưa! Như đã thấy thì đúng là chúng ta đã giảm được các truy vấn xuống nhưng sự thật là chúng ta lại gặp một vấn đề mới (đúng hơn là tạo ra một vấn đề mới). Có thể thấy, chúng ta giảm các truy vấn từ 11 xuống 2 nhưng chúng ta cũng tăng các model được tải từ 20 lên 10010. Điều đó có nghĩa là để hiển thị tên 10 người dùng và tiêu đề bài viết đầu tiên của 10 người dùng, chúng ta đã tải 10010 phiên bản model eloquent cho bộ nhớ. Nếu bạn không không bị hạn chế tài nguyên bộ nhớ thì điều đó có lẽ không thành vấn đề, nhưng nếu bị hạn chế về tài nguyên bộ nhớ thì sẽ làm ứng dụng bị chậm, performance bị giảm xuống. Chúng ta sẽ cùng tìm hiểu tiếp về cách khắc phục vấn đề này ở bài viết tiếp theo nhé!