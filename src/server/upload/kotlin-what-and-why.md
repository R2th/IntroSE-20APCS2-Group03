## 1. Đặc trưng của Kotlin.
Đầu tiên, Kotlin là gì. Nó là một ngôn ngữ lập trình nhắm mục tiêu vào Java platform. Kotlin ngắn gọn, an toàn, thực dụng, và focus vào khả năng tương tác với code Java. Nó được sử dụng mọi nơi mà Java đang được sử dụng, cho phát triển phía Server hay Android apps, và hơn thế nữa. Kotlin làm việc tốt với các thư viện và framework java hiện có và chạy với một mức hiệu suất như Java.
Chúng ta hãy bắt đầu với một ví dụ nhỏ để xem Kotlin trông như thế nào: Tạo ra một class Person, tạo một danh sách Person, sau đó tìm người già nhất và in ra kết quả.  Ngay cả trong đoạn mã nhỏ này bạn có thể thấy nhiều tính năng thú vị của Kotlin: Code được giải thích ngắn gọn nhưng đừng lo lắng vì có gì đó chưa rõ ràng ngay lập tức khi bạn nhìn thấy chúng. Chúng ta sẽ thảo luận chi tiết sau.
Đây là code:
```java
data class Person(val name: String,
val age: Int? = null)

fun main(args: Array<String>) {
val persons = listOf(Person("Alice"),
Person("Bob", age = 29))
val oldest = persons.maxBy { it.age ?: 0 }
println("The oldest is: $oldest")
}
// The oldest is: Person(name=Bob, age=29)
```

Đầu tiên bạn chỉ cần khai báo một class đơn giản gồm hai thuộc tính là name và tuổi. Thuộc tính age mặc định là null nếu nó không được chỉ định. Khi tạo danh sách peoples, bạn bỏ qua tuổi của Alice nên giá trị null sẽ được sử dụng. Sau đó bạn sử dụng phương thức maxBy để tìm người có tuổi già nhất trong danh sách. Trong maxBy đã truyền vào 1 tham số là biểu thức Lambda. Toán tử elvis trả về tuổi là 0 khi nó là null. Do vậy tuổi của Alice sẽ được xem là 0, của Bob là 29. Và Bob sẽ là người già nhất.
## 2. Những đặc điểm chính của Kotlin.
Có lẽ các bạn đã có hình dung về ngôn ngữ Kotlin rồi đúng không nào. Chúng ta sẽ phải xem xét các thuộc tính quan trọng của nó một cách chi tiết hơn. Trước hết, hãy lướt xem những loại ứng dụng nào có thể được xây dựng bởi ngôn ngữ Kotlin.
### 2.1 Các Target platforms: phía Server, Android, và những nơi nào Java chạy
Mục đích chính của Kotlin là cung cấp một giải pháp thay thế ngắn gọn hơn, năng suất hơn, an toàn hơn mà phù hợp trong tất cả các bối cảnh nơi Java được sử dụng ngày nay. Java là một ngôn ngữ vô cùng phổ biến, và nó được sử dụng trong nhiều môi trường khác nhau, từ smart card đến các trung tâm dữ liệu lớn nhất được điều hành bởi Google, Twitter, Linkedin và các công ty internet. Ở hầu hết những nơi này, sử dụng Kotlin có thể giúp các developers đạt được mục tiêu của họ với ít code hơn, ít rắc rối hơn.
Các lĩnh vực phổ biến để dùng Kotlin là:
- Xây dựng code phía Server.
- Xây dựng các ứng dụng di động chạy trên thiết bị Android.
Nhưng Kotlin cũng có thể hoạt động được trong các ngữ cảnh khác. Ví dụ như bạn có thể dùng Intel Multi-OS Engine 1 để chạy mã Kotlin trên thiết bị IOS. Còn để xây dựng các ứng dụng Desktop bạn có thể dùng Kotlin kết hợp với JavaFX 2
Ngoài Java thì Kotlin cũng được biên dịch thành JavaScript, cho phép bạn chạy mã Kotlin trong trình duyệt.
Như bạn có thể thấy, target của Kotlin khá là rộng. Nó không tập trung vào một miền vấn đề duy nhất hoặc giải quyết một loại thách thức duy nhất mà các developers phải đối mặt ngày nay.
### 2.2 Statically typed
Cũng giống như Java, thì ở trong Kotlin, mọi biểu thức trong một chương trình được biết đến vào thời gian biên dịch và trình biên dịch có thể xác nhận rằng các phương thức và trường mà bạn đang cố gắng truy cập tồn tại trên các đối tượng bạn sử dụng. 
Điều này khác với các ngôn ngữ lập trình dynamically typed như Groovy và JRuby. Các ngôn ngữ này cho phép bạn xác định các biến và hàm có thể lưu trữ hoặc trả về dữ liệu thuộc bất kỳ loại nào và giải quyết các tham chiếu phước thức và thuộc tính trong lúc runtime.
Ngoài ra Kotlin không yêu cầu bạn chỉ định rõ ràng từng loại biến trong code của bạn. Trong nhiều trường hợp, loại biến có thể tự động xác định từ ngữ cảnh, cho phép bạn bỏ khai báo kiểu. Ví dụ:
val x = 1
Bạn có thể khai báo một biến và bởi vì nó khởi tạo với một giá trị số nguyên, Kotlin tự động xác định rằng loại của nó là Int. 
Sau đây là một số lợi ích của static typing:
- Performance (hiệu suất) : Gọi các phương thức nhanh hơn bởi vì không cần phải đợi đến lúc runtime các phương thức mới được gọi
- Reliability (độ tin cậy) : Trình biên dịch xác minh tính chính xác của chương trình, do đó có ít nguy cơ gặp sự cố hơn khi chạy.
- Maintainability (khả năng bảo trì) : Làm việc với những đoạn code lạ thì dễ dàng hơn bởi vì bạn có thể thấy những loại của đối tượng mà code đang làm việc với chúng.
- Tool support (công cụ hỗ trợ) : Static typing cho phép tái cấu trúc đáng tin cậy, hoàn thành code một cách chính xác và các tính năng IDE khác.
Nhờ có tính suy luận logic của Kotlin nên phần lớn tính dài dòng của code được thu gọn, và không cần khai báo kiểu rõ ràng.
Nếu bạn nhìn vào chi tiết của hệ thống kiểu dữ liệu của Kotlin, bạn sẽ tìm thấy nhiều khái niệm quen thuộc như trong Java như Class, interface, và generics ,... vì vậy những hiểu biết của Java bạn có thể chuyển sang Kotlin.
Một điều quan trọng trong số đó là sự hỗ trợ nullable types của Kotlin, cho bạn viết các chương trình đáng tin cậy hơn và cách phát hiện các ngoại lệ tại thời điểm biên dịch. Chúng ta sẽ nói về chủ đề này sau.
Một điều mới nữa trong Kotlin là nó hỗ trợ các functional programming.
### 2.3 Functional and object-oriented
Là một Java Developers thì lập trình hướng đối tượng quá quen thuộc đối với bạn,nhưng functional programming thì có thể mới. Các khái niệm của lập trình hướng chức năng như sau:
- First-class functions: Bạn làm việc với các hàm như các giá trị. Có có thể lưu trữ chúng trong các biến, truyền chúng dưới dạng tham số hoặc trả về chúng từ các hàm khác.
- Immutability (tính không thay đổi): Bạn làm việc với các immutable objects (đối tượng bất biến), điều này đảm bảo rằng trạng thái của chúng không thể thay đổi sau khi khởi tạo.
- No side effects: bạn sử dụng các hàm thuần trả về kết quả giống với các đầu vào và không thay đổi trạng thái của các đối tượng khác với thế giới bên ngoài.
Những lợi ích bạn có thể đạt được từ việc viết mã theo functional style. Đầu tiên là sự đồng nhất. Functional code có thể cô đọng hơn với đối tác bắt buộc nó, bởi vì làm việc với các hàm như các giá trị nên sẽ mang lại cho bạn sức mạnh trừu tượng hơn nhiều, cho phép bạn tránh trùng lặp trong code của mình.
Lợi ích thứ hai là  safe multithreading. Một trong những nguồn lỗi lớn nhất trong các chương trình đa luồng là sửa đổi một dữ liệu cùng thời điểm mà không synchronization chúng. Nếu bạn sử dụng các dữ liệu bất biến và các hàm thuần túy, bạn có thể chắc chắn rằng những sửa đổi hoàn toàn như vậy sẽ không xảy ra, và bạn không cần phải đưa ra các sơ đồ đồng bộ hóa phức tạp.
Cuối cùng, Functional programming sẽ mang lại dễ dàng cho việc testing. Code mà No side effects thì thường dễ để test hơn. Các Function có thể được kiểm tra một cách cô lập mà không cần nhiều code để xây dựng toàn bộ môi trường mà chúng phụ thuộc.
Nói chung functional style có thể được sử dụng với bất kỳ ngôn ngữ lập trình nào, bao gồm cả Java. Nhưng không phải tất cả các ngôn ngữ được cung cấp và hỗ trợ cú pháp cần thiết để sử dụng nó dễ dàng. Ví dụ đối với các phiên bản Java trước Java 8. Kotlin có một bộ tính năng support phong phú ngày từ đầu. Chúng bao gồm: 
- Functional types, cho phép các function nhận các function khác dưới dạng tham số hoặc trả về các hàm khác.
- Lambda expressions, cho phép bạn vượt qua các khối code với một bản tóm tắt tối thiểu.
- Data classes, cung cấp một cú pháp ngắn gọn để tạo các đối tượng giá trị bất biến.
- Một bộ API phong phú trong các thư viện chuẩn để làm việc với các objects và collections theo functional style.
### 2.4 Free and open source
Ngôn ngữ Kotlin, bao gồm cả trình biên dịch, thư viện và tất cả các công cụ liên quan, hoàn toàn là nguồn mở và miễn phí. Nó có sẵn theo giấy phép của Apache, sự phát triển diễn ra tron GitHub và sự đóng góp rất lớn của cộng đồng. Bạn cũng có thể lựa chọn 3 IDE mã nguồn mở được hỗ trợ đầy đủ là IntelliJ, Android Studio và Eclipse để sử dụng Kotlin
Bây giờ bạn đã hiểu ngôn ngữ Kotlin là gì, hãy cùng để xem lợi ích của Kotlin hoạt động như thế nào trong các ứng dụng thực tế cụ thể.
## 3. Những ứng dụng Kotlin.
### 3.1 Kotlin trong xây dựng Server.
Lập trình phía Server là một khái niệm khá rộng. Nó bao gồm tất cả các loại ứng dụng sau:
- Ứng dụng Web trả về một trang HTML ở một trình duyệt.
- Backend của các ứng dụng di động cái mà hiển thị JSON API thông qua HTTP.
- Microservice giao tiếp với nhau thông qua giao thức RPC
Những ứng dụng này đã được xây dựng bằng Java nhiều năm trước đó. Kotlin ra đời mang lại ưu điểm là khả năng tương tác liền mạch với các mã code Java hiện có. Cho dù bạn viết một đoạn code mới hay di chuyển những mã trước đó vào trong Kotlin thì nó cũng phù hợp ngay. Dùng Kotlin thì System's code sẽ gọn hơn, đáng tin cậy hơn và dễ bảo trì hơn. Đồng thời Kotlin cung cấp một số kỹ thuật mới để phát triển hệ thống
### 3.2 Kotlin trong Android.
Các tính năng của ngôn ngữ Kotlin, kết hợp với với một trình biên dịch đặc biệt sẽ hỗ trợ Android Framework. Biến việc phát triển Android thành một trải nghiệm thú vị và hiệu quả hơn nhiều.
Các nhiệm vụ phát triển phổ biến như việc thêm listeners hoặc binding layout có thể được thực hiện với code ít hơn, thậm chí là không có dòng code nào cả (trình biên dịch sẽ tạo ra nó cho bạn). Thư viện Anko (https://github.com/kotlin/anko) cũng được xây dựng bởi Kotlin team, nó cải thiện trải nghiệm của bạn hơn bằng cách thêm các adapter Kotlin thân thiện xung quanh nhiều  API chuẩn Android.
Dưới đây là một ví dụ về Anko, chỉ để cho bạn cảm nhận về sự phát triển của Android với Kotlin. Bạn có thể dùng đoạn code này vào một Activity và một ứng dụng Android đơn giản.
```java
verticalLayout {
      val name = editText()
      button("Say Hello") {
            onClick { toast("Hello, ${name.text}!") }
      }
}
```
Một cái ưu điểm lớn khi sử dụng Kotlin là độ tin cậy của ứng dụng lớn hơn. Nếu bạn làm việc nhiều với Android thì bạn đã từng thấy những dialog như "Unforrtunately" hay "Process Has Stopped". Hộp thoại này xuất hiện khi ứng dụng của bạn ném ra một ngoại lệ không thường xuyên, một Null Pointer Exception. Với Kotlin thì việc theo dõi chính xác các giá trị null, làm cho null pointer exceptions trở nên ít xuất hiện hơn và gây khó chịu hơn. Hầu hết những lỗi Null Pointer Exception trong đều bị trình biên dịch của Kotlin phát hiện và sẽ sửa lỗi trước khi đến tay người dùng.
Đồng thời Kotlin hoàn toàn tương thích với Java 6. Ngoài bạn hưởng lợi những tính năng thú vị của Kotlin và người dùng có thể vẫn chạy các ứng dụng của họ cho dù không phải là phiên bản Android mới nhất.
## 4. Triết lý của Kotlin.
Khi nói về Kotlin thì chúng ta nghĩ đến một ngôn ngữ thực dụng, ngắn gọn, an toàn và tập trung vào khả năng tương tác.
### 4.1 Pragmatic (Thực dụng)
Có nghĩa là Kotlin là một ngôn ngữ thực tế được thiết kế để giải quyết các vấn đề trong thế giới thực. Thiết kế của nó được dựa trên nhiều năm kinh nghiệm để tạo ra các hệ thống quy mô lớn và các tính năng của nó được chọn để giải quyết các trường hợp sử dụng mà nhiều developers gặp phải. Hơn nữa các nhà phát triển của JetBrains đã thử nghiệm Kotlin những năm trước đó và cải tiến dần. Có thể tự tin để nói rằng Kotlin có thể giúp giải quyết thành công các vấn đề trong các dự án thực tế.
### 4.2 Concise (Ngắn gọn)
Có ý kiến cho rằng cá Developers dành nhiều thời gian để đọc code hơn là viết code mới. Hãy nghĩ đến trường hợp bạn là một thành viên của team trong một dự án lớn và bạn cần thêm một tính năng mới hoặc sửa lỗi. Bước đầu tiên của bạn là gì? Bạn phải tìm phần chính xác của đoạn code mà bạn cần thay đổi sau đó mới tiến hành thay đổi đúng không nào. Bạn phải đọc rất nhiều code để hiểu những gì bạn phải làm. Những đoạn code này thường là những đồng nghiệp hoặc những người đã rời dự án, thậm chí là rất lâu rồi.
Vậy mã càng ngắn gọn thì càng nhanh. Kotlin đã làm gọn mã code rất nhiều mà vẫn đảm bảo tiêu chuẩn. Ví dụ getter, setter và logic để gán các tham số của constructor được ẩn và không làm phức tạp mã code. Bình thường code Java hay ngôn ngữ khác để xử lý các công việc phổ biến thì phải viết mã rõ ràng và khá dài. Kotlin thì có một thư viện chuẩn phong phú cho bạn thay thế các đoạn mã dài và lặp đi lặp lại đó. Phương thức lambda giúp chuyển một khối code thành các chức năng của thư viện.
Tóm lại code ngắn gọn hơn thì mất ít thời gian để viết mà mất ít thời gian để đọc, cho phép bạn hoàn thành công việc nhanh hơn.
### 4.3 Safe (An toàn)
Một ngôn ngữ an toàn có nghĩa là nó được thiết kế để ngăn ngừa một số loại lỗi trong một chương trình. Tất nhiên không có ngôn ngữ ngăn ngừa tất cả các lỗi. Ngoài ra, ngăn ngừa lỗi thường đi kèm với chi phí, bạn cần cung cấp cho compiler nhiều thông tin hơn về hoạt động dự định của chương trình, để compiler có thể xác minh thông tin phù hợp. Do đó có một sự đánh đổi giữa mức độ an toàn và năng suất cần thiết để đưa vào các Anotations chi tiết.
Với Kotlin thì mức độ an toàn hơn Java, với chi phí tổng thể nhỏ hơn. Chạy trên JVM đã cung cấp rất nhiều đảm bảo an toàn, ví dụ an toàn bộ nhớ, ngăn ngừa tràn bộ đệm và các vấn đề sử dụng sai bộ nhớ được cấp phát động. Là một ngôn ngữ type safety nên Kotlin rất an toàn. Điều này cũng cho chi phí nhỏ hơn Java, bạn không thể chỉ định tất cả các khai báo kiểu, vì trong nhiều trường hợp compiler sẽ tự động nhập các kiểu dữ liệu
### 4.4 Interoperable (Khả năng tương tác)
Về khả năng tương tác của một ngôn ngữ. Bạn có thường ra đặt ra câu hỏi là "Tôi có thể sử dụng các thư viện hiện có của mình không?". Đối với Kotlin thì câu trả lời là "Hoàn toàn có". Bất kể loại API nào mà thư viện yêu cầu bạn sử dụng, bạn có thể làm việc với chúng bởi Kotlin. Bạn có thể gọi các phương thức Java, extend Class hay implement interface Java, áp dụng các anotations của Java trong Kotlin.
Trong một dự án thì bạn có thể trộn lẫn code Java và Kotlin để sử dụng sao cho linh động. Bạn có thể chuyển đổi qua lại giữa 2 ngôn ngữ ở bất kỳ đâu, code vẫn được biên dịch và hoạt động mà không cần sửa đổi.
Kotlin sử dụng các thư viện của Java hiện có ở mức độ lớn nhất có thể. Kotlin hiện không có bộ sưu tập thư viện riêng. Nó phụ thuộc hoàn toàn vào các  lớp thư viện tiêu chuẩn Java.
## 5. Sử dụng các công cụ Kotlin.
Giống như Java, Kotlin là một ngôn ngữ compiler. Điều này có nghĩa là trước khi bạn chạy mã Kotlin thì bạn cần phải biên dịch nó
### 5.1 Biên dịch mã Kotlin
Mã nguồn Kotlin thường được lưu trữ trong các tệp có đuôi là .kt. Trình biên dịch phân tích mã nguồn và tạo ra các tệp .class. Các tệp .class sau đó được đóng gói và thực thi theo môi trường ứng dụng được chạy.
![](https://images.viblo.asia/51ffc7b6-2a99-41d1-9434-6cfbb3fb3b3f.png)
### 5.2 Các Tool có thể sử dụng Kotlin.
Kotlin có thể chạy trên các IDEA mà từng dùng Java như IntelliJ IDEA, Android Studio, Eclipse.
Ngoài ra nếu muốn test các đoạn code nhỏ, các bạn có thể sử dụng REPL hoặc online ở trang https://try.kotl.in/ 
## 6. Tổng kết.
- Kotlin là một ngôn ngữ Static type và được support suy luận kiểu dữ liệu, cho phép duy trì tính chính xác và hiệu suất trong khi vẫn giữ mã nguồn ngắn gọn.
- Kotlin hỗ trợ cả 2 phương pháp lập trình là hướng đối tượng (object-oriented) và hướng chức năng (functional) cho phép trừu tượng hóa mức cao hơn thông qua các chức năng first-class. và đơn giản hóa testing và phát triển multi thread thông qua sự hỗ trợ của các immutable values.
- Kotlin làm việc tốt ở phía server, nó hỗ trợ tất cả các Framework hiện có và cung cấp các công cụ cho các tác vụ phổ biến như HTML 
- Kotlin cũng dùng cho Android. Nhờ có quá trình runtime nhỏ gọn, trình biên dịch đặc biệt đã hỗ trợ cho Android APIs. Và có 1 bộ thư viện phong phú cung cấp các chức năng thân thiện để phát triển Android.
- Kotlin là mã nguồn mở và miễn phí với sự hỗ trợ đầy đủ cho các IDE và hệ thống xử lý chính.
- Kotlin thực dụng, an toàn, ngắn gọn và khả năng tương tác cao. Có nghĩa là nó tập trung vào việc sử dụng các giải pháp đã được chứng minh cho các tác vụ chung, ngăn ngừa các lỗi phổ biến như NullPoiterException, hỗ trợ code nhỏ gọn, dễ đọc và tích hợp không hạn chế với Java.

Để thực hiện bài viết này mình đã tham khảo cuốn sách "Kotlin And Action". Cám ơn bạn đã theo dõi.