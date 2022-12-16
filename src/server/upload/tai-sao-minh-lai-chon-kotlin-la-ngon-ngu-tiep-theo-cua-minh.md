# Tại sao tôi lại chọn Kotlin là ngôn ngữ tiếp theo của mình?

Khi bạn suy nghĩ về phát triển Android, rất có thể là một ngôn ngữ lập trình ngay lập tức ở trong suy nghĩ của bạn: Java.
Mặc dù đúng là đa số các ứng dụng Android được viết bằng Java, nhưng khi nói đến phát triển Android, Java không phải là lựa chọn duy nhất của bạn.
Bạn có thể viết các ứng dụng Android bằng bất cứ ngôn ngữ nào có thể biên dịch và chạy trên máy ảo Java (JVM), và người dùng cuối của bạn sẽ không hề biết. Và một trong những ngôn ngữ lập trình tương thích với JVM là Kotlin.

![](https://images.viblo.asia/bff75d5f-3542-4c87-8d73-5e01093f5708.png)

Kotlin là một ngôn ngữ mới được phát triển bởi Jetbrains, Kotlin cũng giống như Java, kotlin chạy trên nền tảng JVM ( Java Virtual Machine ) và sử dụng các công cụ thư viện hiện có của Java.
Kotlin được giới thiệu từ năm 2011 cho đến khi phát hành phiên bản 1.0 thì mục tiêu quan trọng là tính hữu dụng. Jetbrains luôn chú trọng tới tính tương hợp với Java. Kotlin cũng sở hữu những tính năng hoàn toàn mới như giúp ngăn chặn các lỗi NULL POINTER, một lỗi đáng sợ với mọi lập trình viên. Do kotlin làm việc với cùng code và cơ sở hạ tầng của Java nên kotlin sẽ không có trình quản lý gói và build system của riêng nó.

### Tại sao nên chuyển từ Java?

Cho dù Java là một trong những ngôn ngữ lập trình được sử dụng rộng rãi và là ngôn ngữ chính thức để phát triển Android từ trước tới nay, nhưng có rất nhiều lý do tại sao Java có thể không phải lúc nào cũng là sự lựa chọn tốt nhất cho dự án Android của bạn.

Vấn đề lớn nhất là Java không phải là một ngôn ngữ hiện đại, và mặc dù Java 8 là một bước tiến lớn cho nền tảng, giới thiệu nhiều tính năng mà các nhà phát triển đã chờ đợi (bao gồm cả tính năng lambda), tại thời điểm của bài viết Android chỉ hỗ trợ một phần của các tính năng mà Java 8 cung cấp. Có vẻ như các nhà phát triển Android không chắc sẽ sớm được hưởng lợi một cách đầy đủ từ những tính năng của Java 8, do đó, trong tương lai nếu bạn muốn sử dụng Java trong dự án Android của bạn, thì bạn sẽ gặp khá nhiều khó khăn với Java 7.

Java nhìn chung cũng có một số vấn đề về tài liệu hướng dẫn sử dụng, thiếu khả năng mở rộng, null-unsafety (vào đó là NullPointerException), chưa kể thiếu sự hỗ trợ cho các tính năng lập trình hàm. Cho dù Java đã bắt đầu thêm một số yếu tố lập trình hàm, chẳng hạn như biểu thức lambda và giao diện hàm, nhưng về cơ bản Java vẫn là một ngôn ngữ thủ tục. Cú pháp của Java cũng là khá dài dòng, đặc biệt là khi so sánh với nhiều ngôn ngữ lập trình hiện đại. Vậy Kotlin có gì đặc biệt hơn?

### Ưu điểm của Kotlin

Mặc dù được sử dụng rộng rãi, nhưng trong quá trình hoạt động ngôn ngữ Java sinh ra rất nhiều file rác. Java 8 đã giải quyết một số vấn đề ngôn ngữ và đặc biệt hơn là với Java 10. Để có được nhiều lợi ích từ việc chỉnh sửa trong hai phiên bản này, bạn phải đặt SDK tối thiểu sang Android 24 chỉ để sử dụng Java 8. Kotlin nhắm đến việc lấp đầy khoảng trống đó của một ngôn ngữ hiện đại đang thiếu cho nền tảng Android.

**1. Có thể thay thế cho Java**
-	Có một điểm mạnh của kotlin là khả năng tương thích cao của Kotlin với Java. Chúng ta có thể sử dụng chung code chung chúng song song trong cùng một dự án. Vì trong thực tế khi được biên dịch do kotlin và java cùng được JVM biên dịch sang java bytecode nên chúng ta sẽ không biết đoạn nào được viết bằng java đoạn nào được viết bằng Kotlin
-	Vì Kotlin là hoàn toàn tương thích với Java, bạn cũng có thể sử dụng phần lớn các thư viện Java và các framework trong dự án Kotlin của bạn—thậm chí nâng cao các framework dựa vào chú thích xử lý.

**2. Dễ học**
-	Kotlin nhằm mục đích là nâng cao hơn so với java, nó khắc phục các nhược điểm của java chứ không phải một ngôn ngữ hoàn toàn mới. Do vậy bạn hoàn toàn có thể ứng dụng các kinh nghiệm với Java của mình cho Kotlin
-	Kotlin cũng được thiết kế trực quan và dễ đọc, do đó, ngay cả khi bạn gặp một số code khác biệt, thì bạn vẫn có thể để biết được ý nghĩa về những gì code này làm. ![](https://images.viblo.asia/8cb4059c-a682-40d5-b654-7b57f5496916.png)



**3. Kết hợp những gì tốt nhất của lập trình hàm và lập trình thủ tục**
-	Hiện đang có một số lý thuyết lập trình được sử dụng rộng rãi, nhưng khi nói đến các câu hỏi về "phương pháp nào là tốt nhất", thì không dễ để có câu trả lời. Mỗi kiểu lập trình có tập hợp điểm mạnh và điểm yếu của nó, do đó, mặc dù không thiếu các kịch bản mà lập trình hàm có một lợi thế, thì cũng có rất nhiều vấn đề nơi mà một cách tiếp cận lập trình thủ tục sẽ hiệu quả hơn.Vậy tại sao bạn cần phải lựa chọn giữa hàm và thủ tục? Giống như nhiều ngôn ngữ lập trình hiện đại khác, Kotlin nhằm mục đích mang lại cho bạn những gì tốt nhất của cả hai bằng cách kết hợp các khái niệm và các yếu tố của lập trình thủ tục và hàm.

**4. Android Studio hỗ trợ**
-	Kotlin được phải triển bởi Jetbrains – Công ty đứng sau IntelliJ – IDE mà Android Studio dựa trên nó. Và không có gì bất giờ khi android studio hỗ trợ cực kỳ tốt cho kotlin.
-	Một khi project của bạn đã được thiết lập plugin kotlin cho android studio, bạn thậm chí của thể chuyển tất cả java code sang kotlin một cách đơn giản mà không hể có lỗi gì.

![](https://images.viblo.asia/dd1ebf7d-0f8b-47dd-908b-398cc9246bc4.png)

**5. Code ngắn gọn hơn nhiều so với Java**
-	Nếu bạn so sánh một class Java và một class Kotlin tương tự thì code của Kotlin dễ đọc, rõ rang và nhỏ gọn hơn nhiều so với Java. Việc giảm số lượng code sẽ tạo cảm giác thú vị hơn nhiều so với code Java.
-	Đặc biệt, các extension của Kotlin Android (mà chúng ta sẽ khám phá trong phần hai) cho phép bạn nhập tham chiếu đến một View vào một tập tin Activity, từ đó, bạn có thể làm việc với giao diện như thể nó là một phần của Activity đó. Điều này có nghĩa là bạn không còn phải xác định mỗi View bằng cách sử dụng findViewById, mà có thể chuyển đổi code chẳng hạn như:

```
fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
        }
```
```
FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
```

**6. Kotlin đã được “ ưu tiên ” trong phát triển ứng dụng android**

-	Java giờ đây không còn là “soái ca” trong lập trình android nữa vì đã có Kotlin. Tại sự kiện Google I/O tháng 5/2017, Google đã chính thức công nhận Kotlin là ngôn ngữ để phát triển ứng dụng Android bên cạnh Java, C++

**Tuy vậy, dù Kotlin có vẻ rất hoàn hảo hoàn toàn có thể đánh bại Java trở thành ngôn ngữ lập trình chính trong android. Nhưng bên cạnh đó Kotlin cũng có những nhược điểm của nó**

### Nhược điểm
**1. Thêm thời gian chạy Runtime**

- Thư viện tiêu chuẩn của Kotlin và runtime sẽ làm tăng kích thước tập tin .apk của bạn. Mặc dù nó chỉ tương đương với khoảng 800KB, nhưng nếu ứng dụng của bạn đã lớn sẵn rồi thì 800KB phụ có thể làm nó phình to và khiến người dùng nghĩ lại trước khi tải về ứng dụng của bạn.

**2. Không hẳn code của Kotlin đã dễ dàng đọc hiểu đối với beginner**
-	Mặc dù cú pháp của Kotlin rất ngắn gọn nhưng bạn có thể gặp một số khó khan ban đầu, với đoạn code ngắn gọn đó xử lý rất nhiều thứ trong đó. Trong khi đó Java rất dài dòng nhưng ngược lại mọi thứ đều rất đầy đủ và dễ dàng hiểu. Nếu bạn đã code Java trong thời gian dài, chuyển sang Kotlin sẽ gặp một vài những khó chịu ban đầu với 

**3. Cộng đồng hỗ trợ Kotlin chưa đủ lớn**
-	Mặc dù kotlin đã được công nhận chính thức nhưng cộng đồng của nó so với Java thì là rất nhỏ. Nếu bạn chuyển sang Kotlin có thể gặp ít sự giúp đỡ từ cộng đồng như những diễn đàn StackOverFlow. Cùng thời điểm tìm kiếm với chủ để **Kotlin** có 15,429 kết quả trong khi đó con số của **Java** là 1,472,070 kết quả.

# Kết luận
- Trên đây là phần trình bày của mình về những ưu điểm và nhược điểm của Kotlin. Các bạn có thể tham khảo thêm về Kotlin tại [đây](https://kotlinlang.org/?fromMenu) nhé
- Kotlin cũng đã được Google công nhận là ngôn ngữ chính để phát triển ứng dụng android, nên trong tương lai cộng đồng Kotlin sẽ phát triển mạnh mẽ và sẽ có nhiều thư viện để support cho nó nhiều hơn

# References
* https://kotlinlang.org/?fromMenu
* https://medium.com/@octskyward/why-kotlin-is-my-next-programming-language-c25c001e26e3