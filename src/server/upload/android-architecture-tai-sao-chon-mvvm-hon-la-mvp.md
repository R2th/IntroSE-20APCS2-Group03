# I. Vấn đề
Một số vấn đề để một lập trình viên quyết định chọn mô hình xây dựng ứng dụng như  là làm sao để tái sử dụng code, dễ maintenance, dễ viết unit test hay dễ đọc hiểu với người mới vào trong dự án. Một số vấn đề trên dẫn đến việc chọn lựa mô hình khi bắt đầu một dự án mới là một điều hết sức quan trọng đối với mỗi lập trình viên. Hiện nay, có thể thấy 2 mô hình phổ biến nhất là MVVM và MVP. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về chúng và xem cái nào ưu việt hơn

# II. Giải pháp
Bản thân Android được viết dưới dạng MVC trong đó Activity chịu trách nhiệm cho rất nhiều thứ trong đó bao gồm tất cả các logic. Với những ứng dụng đơn giản thì có thể mọi thứ vẫn còn dễ dàng, nhưng khi ứng dụng đủ lớn, số lượng logic tăng lên và mức độ vấn đề cũng tăng theo.
Có nhiều mô hình tiếp cận khác nhau như MVP, MVI, MVVM,... được chứng mình là có thể giải quyết các vấn đề trên. Người ta có thể sử dụng bất kỳ cách tiếp cận nào, chúng thích ứng với các cách thay đổi một cách nhanh chóng,...

# III. Mục tiêu
Xây dựng mọi thứ một cách phân tán như vậy để tách biệt dữ liệu - logic - view ra để đối với những project lớn khi số lượng logic và dữ liệu đủ lớn sẽ hữu ích trong việc mở rộng, bảo trì, test,...

# IV. Tại sao là MVVM?
Có khá nhiều bài viết về MVP về sự sử dụng rộng rãi của mô hình này: Model — View — Presenter. Đó là một mô hình trưởng thành và ở mức độ nhất định, có thể giải quyết vấn đề nhưng vẫn có khá nhiều hạn chế và nó cần phải cải thiện một số thứ.

MVP đã là tốt, tuyệt vời nhưng Google đã giới thiệu các thành phần kiến trúc Android bao gồm ViewModel thay vì Presenter và do đó bằng chứng là ngay cả Google cũng hỗ trợ MVVM.

Một mô hình MVP đơn giản như sau:

![](https://images.viblo.asia/c7a5a0c1-8cdd-4ac6-ab3c-b2deb1955eab.png)
MVP

Và một mô hình MVVM đơn giản như sau:

![](https://images.viblo.asia/76cc82d4-2013-43df-8337-99ae7e827f7a.png)
MVVM

Nhìn vào hình trên thì bạn có nhận ra sự khác biệt?

Hãy bắt đầu vào những hạn chế của MVP và cách chúng ta có thể khắc phục chúng bằng cách sử dụng MVVM.

Đối với mỗi View thì đều yêu cầu 1 Presenter, đây là quy tắc ràng buộc cứng nhắc. Presenter giữ tham chiếu đến View và View cũng giữ tham chiếu đến Presenter. Mối quan hệ 1:1 và đó là vấn đề lớn nhất.

Khi sự phức tạp hay độ lớn của ứng dụng tăng lên dẫn đễ việc duy trì và xử lý mối quan hệ này cũng vậy.

Điều này dẫn đến cùng một vấn đề mà chúng ta hay gặp trước đây vì trong những thay đổi trong thiết kế, chúng ta có thể phải sửa lại mối quan hệ này.

Chính vì những hạn chế trên của Presenter, MVVM được giới thiệu.

ViewModel là các class mô phỏng tương tác với logic/model layer và chỉ hiện trạng thái/ dữ liệu mà không quan tâm ai hoặc dữ liệu sẽ được tiêu thụ thế nào. Chỉ View giữ tham chiếu đến ViewModel và không có trường hợp ngược lại, điều này giải quyết vấn đề của Presenter và View. Một View có thể giữ tham chiếu nhiều ViewModel. Ngay cả một View cũng có thể giữ tham chiếu đến nhiều ViewModel

# V. Khả năng test
Bởi vì Presenter bị ràng buộc chặt chẽ với View, dẫn đến việc unit test trở nên hơi khó khăn. ViewModel thâm chí còn thân thiện hơn vơi Unit test vù chúng chỉ hiển thị trạng thái và do đó có thể được kiểm tra độc lập mà không yêu cầu kiểm tra dữ liệu được tiêu thụ như thế nào. Đây là 2 lý do chính làm cho sự phân biệt, lựa chọn rõ ràng ảnh hưởng đến khả năng unit test của 2 mô hình

# VI. Tổng kết
Các mô hình này đang tiếp tục phát triển và MVVM có thể nói tiềm năng để trở nên mạnh mẽ, hữu ích nhưng tuyệt vời để thực hiện. MVP cũng rất hữu dụng và phổ biến nhưng chưa có thể hoàn hảo.
Không có thể chắc chắn về tương lai, phù hợp tốt cho tất cả các giải pháp. Người ta có thể thích hoặc không thích MVVM nhưng đó cũng không quá quan trọng, miễn là chúng ta đạt được mục tiêu đang đáp ứng tốt cho project phát triển.
Đây cũng là một số cảm nhận khi tôi sử dụng qua 2 mô hình này. Chia sẻ về một số hạn chế của MVP và nó có thể khắc phục bằng MVVM.
Cảm ơn các bạn đã theo dõi bài viết!

Tham khảo: https://android.jlelse.eu/why-to-choose-mvvm-over-mvp-android-architecture-33c0f2de5516