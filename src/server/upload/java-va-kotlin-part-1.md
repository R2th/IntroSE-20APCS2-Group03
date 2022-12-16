![](https://images.viblo.asia/1151fc84-80c4-4358-a4e7-9b37716a6ead.jpg)
Khi bạn cần phát triển một android application. Có lẽ sẽ có ngay một ngôn ngữ lập trình hiện lên trong suy nghĩ của bạn và đó là java. 

Tuy nhiên dù trên thực tế đa phần ứng dụng android hiện nay được viết bằng java, thì java cũng không phải *lựa chọn* duy nhất cho bạn.

Bạn có thể lập trình ứng dụng android trên bất kỳ ngôn ngữ nào biên dịch và chạy trên nên tảng máy ảo java(JVM).
Và Kotlin là một ngôn ngữ như thế. Kotlin là một ngôn ngữ tương thích với JVM đã rất thành công khi trở thành lựa chọn trong cộng đồng android, một ngôn ngữ lập trình kiểu tĩnh (static type) từ JetBrains.

Trong bài viết này tôi sẽ đánh giá các ưu điểm và khuyết điểm của việc lựa chọn Kotlin thay cho Java. Vào cuối của bài viết này, bạn sẽ có được một cái nhìn chính xác về những gì Kotlin cung cấp và nó có phù hợp cho bạn hay không.

# Tại sao nên thay thế Java?
Java là một ngôn ngữ phổ biến và được sử dụng trên nhiều lĩnh lực khác nhau. Và java cũng là ngôn ngữ phát triển chính thức của android. Tuy thế java vẫn tồn tại nhiều khuyết điểm và điều đó khiến java không phải lúc nào cũng là lựa chọn tuyệt vời để phát triển ứng dụng android.

Java không phỉ một ngôn ngữ hiện đại. Nó quá dài dòng và mặc dù Java 8 là một bước tiến lớn cho nền tảng, giới thiệu nhiều tính năng mà các nhà phát triển đã chờ đợi (bao gồm cả tính năng lambda), thế nhưng Java nhìn chung cũng có một số vấn đề về tài liệu hướng dẫn sử dụng, bao gồm các khối try-catch, thiếu khả năng mở rộng, null-unsafety (vào đó là NullPointerException), chưa kể thiếu sự hỗ trợ cho các tính năng lập trình hàm. Cho dù Java đã bắt đầu thêm một số yếu tố lập trình hàm, chẳng hạn như biểu thức lambda và giao diện hàm, nhưng về cơ bản Java vẫn là một ngôn ngữ thủ tục. Cú pháp của Java cũng là khá dài dòng, đặc biệt là khi so sánh với nhiều ngôn ngữ lập trình hiện đại.
![](https://images.viblo.asia/5d822219-8b43-4067-aea0-77df29bd7de6.jpeg)
# Ưu điểm của Kotlin
Và thế là bạn cân nhắc rằng mình sẽ chuyển qua một ngôn ngữ hiện đại được thiết kế chạy trên JVM và Kotlin là một ngôn ngữ biên dịch sang Java bytecode và có vài điều thú vị khiến bạn sẽ chú ý đến.
### Kotlin có thể thay thế cho Java
Kotlin có một ưu điểm lớn mạnh đó là khả năng tương thích tuyệt vời với java. Thậm chí bạn có thể kết hợp cả kotlin và java trong cùng một dự án và mọi thứ vẫn trơn chu và hoàn hảo. Dưới đây, bạn có thể thấy một ví dụ về một dự án bao gồm một Activity Java và một Actitivy Kotlin.
![](https://images.viblo.asia/c9865879-2a44-4ae9-83a9-8ea9835b8c8f.jpeg)

Bởi vì các lớp Kotlin và Java có thể tồn tại song song trong cùng một dự án, bạn có thể bắt đầu sử dụng Kotlin mà không cần phải làm bất cứ điều gì to tát cả giống như chuyển đổi toàn bộ dự án sang Kotlin hoặc bắt đầu một dự án mới để bạn có thể thử Kotlin. Còn nếu không bạn hoàn toàn có thể chuyển đổi một phần dự án và phần còn lại vẫn sử dụng java như thường. Sau đó nếu không thích bạn cũng có thể chuyển ngược về java nếu muốn. Android studio có hỗ trợ tính năng chuyển đổi này mặc dù nó chưa được hoàn thiện cho lắm.

Và vì Kotlin là hoàn toàn tương thích với Java, bạn cũng có thể sử dụng phần lớn các thư viện Java và các framework trong dự án Kotlin của bạn—thậm chí nâng cao các framework dựa vào chú thích xử lý. Điều này làm khả năng phát triển của ứng dụng của bạn hoàn toàn không bị gò bó khi chuyển qua sử dụng kotlin.

### Dễ học
Kotlin nhằm mục đích là một nâng cao đối với Java, chứ không phải hoàn toàn viết lại, rất nhiều các kỹ năng bạn đã có và mài dũa trong suốt sự nghiệp Java của bạn vẫn được áp dụng đối với dự án Kotlin của bạn.

Kotlin cũng được thiết kế để có thể dễ học cho các nhà phát triển Java. Những nhà phát triển Java sẽ cảm thấy rằng hầu hết cú pháp của Kotlin đều quen thuộc; ví dụ, các code được sử dụng để tạo ra một lớp mới trong Kotlin là rất giống với Java:

> class MainActivity : AppCompatActivity() {

Kotlin cũng được thiết kế trực quan và dễ đọc, do đó, ngay cả khi bạn gặp một số code khác biệt, thì bạn vẫn có thể để biết được ý nghĩa về những gì code này làm. 
### Android Studio hỗ trợ
Chẳng có gì bất ngờ, rằng Android Studio hỗ trợ tốt cho Kotlin khi công ty phát triển Kotlin là JetBrains, công ty đứng sau IntelliJ—IDE mà Android Studio dựa trên nó. Khi mà bạn đã cài đặt plugin Kotlin, Android Studio sẽ làm cho việc cấu hình Kotlin trong dự án của bạn trở nên đơn giản với vài click chuột.
![](https://images.viblo.asia/2d4282dd-dd80-4d1d-9c86-ff9d8e446edd.jpeg)

### Code ngắn gọn hơn
Nếu bạn so sánh một lớp Java và một lớp Kotlin cho ra cùng một kết quả, thì cái được viết trong Kotlin thường sẽ gọn gàng hơn nhiều và nhỏ gọn hơn so với những gì được viết bằng Java. Và như mọi nhà phát triển đều biết, code ít hơn có nghĩa là ít lỗi hơn!

Kotlin đặc biệt tốt trong việc giảm số lượng code mà bạn cần phải viết, làm cho việc viết code trong Kotlin trở thành một trải nghiệm thú vị hơn nhiều, so với việc viết code trong nhiều ngôn ngữ khác như Java.
# Nhược điểm là gì?
Tuy có nhiều ưu điểm, nhưng chả có ngôn ngữ nào hoàn hảo cả. và Kotlin cũng như vậy. 

Thư viện tiêu chuẩn của Kotlin và runtime sẽ làm tăng kích thước tập tin .apk của bạn. Mặc dù nó chỉ tương đương với khoảng 800KB, nhưng nếu ứng dụng của bạn đã lớn sẵn rồi thì 800KB phụ có thể làm nó phình to và khiến người dùng nghĩ lại trước khi tải về ứng dụng của bạn.

Thêm nữa là tài liệu và cộng đồng support chưa mạnh, vì là một ngôn ngữ mới. Tuy vậy Kotlin vẫn ngày một hoàn thiện và hứa hẹn sẽ là một lựa chọn hoàn hảo để phát triển ứng dụng android.
# Tổng kết
Có lẽ bạn cũng đã có cái nhìn tổng quát về kotlin rồi. Trong bài tiếp theo mình sẽ đi sâu và đưa ví dụ cụ thể hơn về ưu điểm khi sử dụng kotlin.