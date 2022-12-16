Người dùng luôn yêu cầu trải nghiệm liền mạch khi sử dụng ứng dụng và tất nhiên lập trình viên nào cũng vậy. Tuy nhiên bugs và crash luôn là nỗi ám ảnh với mọi coder. Crash khiến app nhận những đánh giá kém, bị gỡ cài đặt hay nghiêm trọng hơn là ảnh hưởng đến thương hiệu. Trong bài chia sẻ này mình sẽ chia sẻ một số cách để có thể cải thiện sự ổn định của ứng dụng khi lập trình Android bằng Kotlin. Mình cũng sẽ xem xét kết quả của một số thống kê trên Google Play và xem liệu có mối tương quan giữa việc sử dụng Kotlin và tỉ lệ crash hay không?
 ![](https://i.imgur.com/yNvUTgz.jpg)

 # Chất lượng ứng dụng
 
 Chất lượng ứng dụng của bạn không chỉ ảnh hưởng trải nghiệm người dùng mà còn nhiều tố khác:
 
 *   **Khả năng SEO của app** - Các đề xuất của Google Play là sự kết hợp giữa sự sắp xếp của con người và thuật toán, trong đó chất lượng ứng dụng là một trong những yếu tố cần cân nhắc lớn nhất.
 *   **Thương hiệu** - Tất nhiên chẳng ai muốn ứng dụng mình bị đánh giá 1 sao cả.
 *   **Số lượng người dùng** - Việc cải thiện người dùng tự nhiên và nhận thức về thương hiệu giúp cho việc giữ chân người dùng tốt hơn, điều này cũng có thể tác động đến mức độ tương tác.
 
>  Ứng dụng build bằng Kotlin có tỉ lệ crash thấp hơn 20%.
 
 Theo thống kê từ chính 1000 ứng dụng phổ biến nhất trên Google Play thì các ứng dụng sử dụng **Kotlin** có tỉ lệ crash ít hơn **20%**.
 

 
 # Tạm biệt NullPointerExceptions
 
 Nỗi ám ảnh #1 làm crash app Android trên Google Play chính là `NullPointerException`. Năm 2018, team dev dự án Google Home đã chuyển toàn bộ source code sang Kotlin và nhận được kết quả giảm [33% lỗi NullPointerExceptions](https://android-developers.googleblog.com/2020/07/Google-home-reduces-crashes.html) trong một năm.
 
 Về `NullPointerException`, nó xuất hiện khi ta truy xuất đến 1 trường hoặc 1 phương thức của 1 biến hay đối tượng null (tức là biến hay đối tượng đó không có bất cứ 1 giá trị nào). Để loại bỏ `NullPointerException`, bạn phải đảm bảo rằng đối tượng bạn đang tham chiếu đến phải `non-null` tức là không được rỗng trước khi gọi các phương thức trên hoặc đối tượng con của chúng. `Nullability` cũng là một phần của Kotlin. Ví dụ, khi khai báo một biến bạn phải từ đầu là `nullable` hay `non-nullable` bằng toán tử `?`. Bạn có thể tham khảo thêm [tại đây](https://kotlinlang.org/docs/null-safety.html#the-operator).

 # Tránh những lỗi phổ biến
 
 There are a lot of issues that we developers introduce without realising and a lot of them can be quite subtle and hard to investigate. Here are just a few of these issues that are avoided when using Kotlin.
 Có rất nhiều lỗi mà lập trình viên không thể phát hiện ra và rất nhiều trong số đó rất phức tạp. Đây là một số cách để tránh khi lập trình với Kotlin.

 ## `hashCode()` và equals()
 
 Khi hai đối tượng bằng nhau thì hashcode(mã băm) của chúng cũng sẽ giống nhau. Đây là một kiến thức căn bản mà mọi coder đều biết. Tuy nhiên, không phải ai cũng nhớ tạo ra phương thức này khi thêm một thuộc tính mới vào class. Nhưng với Kotlin, công việc này đã được hỗ trợ hoàn toàn bởi [data class](https://kotlinlang.org/docs/reference/data-classes.html). Với `data class`, **hashCode()** và **equals()** được tạo tự động bởi compiler và cũng sẽ cập nhật khi bạn thay đổi thuộc tính của class.
 
 
 ## So sánh hai đối tượng
 
 
 Muốn kiểm tra hai đối tượng có giá trị bằng nhau hay có giá trị tham chiếu tương đương(con trỏ của chúng giống nhau) thì phải làm thế nào? Trong Java, với kiểu nguyên thuỷ thì chúng ta thường sử dụng toán tử `==`, tuy nhiên khi đó là một sai lầm khi chúng ta phải so sánh giá trị tham chiếu của hai biến đó trong khi chúng ta chỉ muốn so sánh giá trị của chúng với nhau. Do đó Kotlin định nghĩa rằng toán tử `==` để so sánh giá trị của hai đối tượng và toán tử `===` để so sánh giá trị tham chiếu(địa chỉ con trỏ) của chúng. Lưu ý này giúp lập trình viên tránh phải so sánh hai địa chỉ con trỏ khi **không cần thiết**.
 
 
 ## Khi if-else là không đủ
 
Một thói quen khi lập trình đó là sử dụng rất nhiều câu lệnh `if-else` hay gọn gàng hơn một tí đó là `switch...case`. Nếu lạm dụng câu điều kiện `if-else` quá nhiều sẽ ảnh hưởng đến clean code của bạn và tất nhiên là khó để đảm bảo tất cả các case đều hoạt động chính xác theo logic. Do đó Kotlin đã ra đời biểu thức `when` để thay cho chính `switch...case`. Sức mạnh của `when` thì có thể kể đến như: cho phép ta gom nhóm điều kiện để sử dụng, cho phép ta kiểm tra theo các vùng dữ liệu liên tục, `when` có thể là một biểu thức có kiểu trả về,... Khi bạn chưa bao gồm tất cả trường hợp, `when` bạn sẽ gặp compiler error giúp bạn xử lý lỗi ngay từ lúc build.
 # Kết luận
 
 Sự ổn định của ứng dụng là quan trọng đối với người dùng và cả người phát triển. Kotlin đã cải tiến rất nhiều so với người tiền nhiệm là Java để giúp các lập trình viên khi xây dựng các ứng dụng trên nền tảng Android. Hi vọng qua bài viết trên sẽ giúp các bạn mở rộng thêm kiến thức của bản thân.