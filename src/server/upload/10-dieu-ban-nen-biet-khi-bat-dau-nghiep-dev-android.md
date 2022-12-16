Trong bài viết này, mình sẽ cung cấp cho bạn chính xác những gì bạn nên biết khi bắt đầu phát triển Android.
Những mẹo này sẽ giúp bạn học cách phát triển Android nhanh hơn nhiều so với việc bạn loay hoay tìm cách hiểu những gì cần học trước.
Vì vậy, hãy bắt tay ngay vào nó nhé ! Let's go

# 1. Java vs Kotlin —Nên học cái nào trước ?
![](https://miro.medium.com/max/700/0*0NWc7epjJ8pxYErL)

Một trong những tình huống khó xử đầu tiên bạn sẽ phải đối mặt khi mới bắt đầu là liệu bạn nên học Java hay Kotlin trước.
Trước hết, bạn có thể xoa dịu tâm trí bằng cách nhận ra rằng câu hỏi này thực sự không quan trọng về lâu dài.
Cả Java và Kotlin đều có thể được sử dụng để phát triển các ứng dụng Android. Cả hai ngôn ngữ đều dễ học và một khi bạn biết một ngôn ngữ, việc học ngôn ngữ kia sẽ trở nên đơn giản.
Tuy nhiên, có những lợi ích và hạn chế đối với mỗi ngôn ngữ. Mình sẽ liệt kê những thứ đó và để bạn quyết định xem bạn muốn học cái nào trước nha.

**Java**

Đầu tiên, ta sẽ nói về Java. Đây là những lợi ích của nó:

*  Java là một ngôn ngữ lập trình hướng đối tượng rất nổi tiếng và được sử dụng rộng rãi. Như vậy, biết Java sẽ không chỉ giúp bạn hiểu nhiều ứng dụng, không chỉ ứng dụng Android. 
* Java khá dễ hiểu và có lẽ là một lựa chọn tuyệt vời cho ngôn ngữ lập trình đầu tiên của bạn. (trường học nào cũng dạy Java thì phải)
* Java đã có từ rất lâu, vì vậy ngôn ngữ này đã trưởng thành hơn rất nhiều so với Kotlin (bé Kotlin còn trẻ người non dạ lắm , mới có 10 tuổi thôi)
* Java là tiêu chuẩn thực tế để học OOP. Học design pattern sẽ rất đơn giản nếu bạn biết Java.
*  Java sẽ giúp bạn hiểu rõ hơn về JVM

Nhưng cái gì cũng có hai mặt cả, Java cũng có những nhược điểm. Dưới đây là một vài trong số đó:

* Rất nhiều code Java là "**boilerplate**" code. Nói cách khác, đó là những thứ cần thiết để code của bạn hoạt động, nhưng ít liên quan đến logic thực tế code của bạn. Điều này dẫn đến code trùng lặp và khó thay đổi nếu bạn không cẩn thận.
* Java là một ngôn ngữ khá “dài dòng”. Hầu hết code của bạn cần phải rõ ràng, đó là nguyên nhân tạo ra **boilerplate**. (cũng có nhiều người lại thích sự rõ ràng của java)

Có rất ít code trong phiên bản Kotlin, có rất nhiều tình huống khác nhau thì code của Kotlin biểu cảm hơn và gọn gàng hơn mã của Java.

Vì vậy, đó là một vài nét về Java. Bây giờ chúng ta hãy bàn luận về Kotlin nhé : 

**Kotlin**
 
Vì vậy, như mình đã nói, code Kotlin nhỏ gọn hơn và ít dài dòng hơn mã Java. Đó chỉ là một lợi thế của Kotlin so với Java:

*  Kotlin hiện là ngôn ngữ mà hầu hết các ứng dụng mới đang được phát triển và chính Google khuyên dùng ( tuổi trẻ nhưng bố thì làm to đây mà :atm:). Điều đó có nghĩa là bạn sẽ được cập nhật. Đây là lý do chính mà bạn có thể muốn học Kotlin trước.
*  Theo mình, Kotlin có phần dễ học hơn Java, mặc dù Java cũng khá dễ học. Tuy nhiên, mình biết Java trước Kotlin, vì vậy việc chuyển đổi khá dễ dàng ở 1 khía cạnh nào đó.
*  Kotlin có rất nhiều cú pháp để giảm độ dài dòng.
*  Kotlin tích hợp liền mạch với Java nên bạn không cần phải học Java để sử dụng Kotlin.
*  Kotlin có nhiều helper classes hơn và cấu trúc tổng thể dễ sử dụng hơn Java.
*  Kotlin khá tuyệt vời trong việc loại bỏ các giá trị null và check null khỏi code của bạn. Đây có lẽ là một trong những lợi thế lớn nhất của nó.
*  Kotlin code được mọi thứ Android, IOS (kotlin multiplatform mobile) , Web (ktor), Desktop App ,...

**Ý kiến của mình về những gì bạn nên học đầu tiên**

Vậy ý kiến của mình về việc học cái nào trước? Hãy nhớ rằng, ý kiến này thực sự ít ảnh hưởng đến con đường lâu dài của bạn.
Nhưng nếu phải chọn một cái, thì mình sẽ nói Java (khổ trước sướng sau thế mới giàu:rofl:). Java đơn giản là quá nổi tiếng và được sử dụng rộng rãi, bạn sẽ đánh giá cao rằng mình đã học được nó khi xem các `code samples`.

Và thêm vào đó, một khi bạn đã hiểu rõ về Java, bạn sẽ có thể học Kotlin trong vòng chưa đầy một tuần. Ta không thể nói như vậy khi học Kotlin trước.

Và một lưu ý nhỏ, một trong những ưu điểm lớn nhất của Kotlin - giảm độ chi tiết và độ dài của chương trình, cũng là một trong những nhược điểm lớn nhất của nó. Tại sao?
Bạn có thể nghĩ rằng độ dài tiết giảm luôn là điều tuyệt vời, nhưng nếu bạn học Kotlin trước, vấn đề xảy ra khi bạn không hiểu tại sao Kotlin lại được phát minh.
Nói cách khác, bạn sẽ không hiểu những điểm yếu của bản soạn thảo cũ và độ dài của Java dẫn đến việc tạo ra Kotlin - nếu bạn học Kotlin trước. Điều này có thể dẫn đến việc bạn làm những việc không đúng cách nếu bạn học Kotlin trước.

Học Java trước hết thiết lập một cơ sở tuyệt vời để bạn xây dựng kiến thức của mình. Học Kotlin trước tiên đảm bảo bạn sẽ được cập nhật.
Nhưng cuối cùng, nó thực sự không quan trọng nhiều như vậy. MÌnh nghĩ rằng các nhà phát triển Android nên thông thạo cả hai ngôn ngữ.
Cái này cũng khá giống với câu hỏi nên học C hay python trước và bạn biết ý kiến của mình sẽ thế nào rồi đó.
# 2.Học đúng nguồn tài liệu 
Có rất nhiều developer Android - và không phải tất cả họ đều làm đúng. Điều quan trọng là bạn phải học từ những nguồn phù hợp, nếu không bạn thực sự có thể đang học những tài liệu bất lợi.

Nền tảng yêu thích của mình để học nội dung liên quan đến Android là Google Codelab và Doc . Bạn có thể thích thứ gì đó như Pluralsight, Skillshare hoặc Udacity, Udemy
Cho dù bạn thích nền tảng nào, mình khuyên bạn nên tìm một số tài liệu trả phí chất lượng cao. Khi bạn tìm thấy một khóa học được đánh giá cao về chủ đề bạn muốn học, mình khuyên bạn nên kiểm tra ngày phát hành của khóa học đó và đảm bảo rằng khóa học đó là gần đây. Đồng thời càng nhiều sao càng tốt.
Các khóa học miễn phí không đánh giá cao bằng các khóa học trả phí, tất nhiên nó sẽ có cái đáng giá hơn khóa miễn phí trên mạng rồi.
Dẫu biết đây là những lời khuyên hiển nhiên, nhưng có rất nhiều khóa học được đánh giá cao, ví dụ như Udemy, đã lỗi thời nhưng được đánh giá cao vì tuổi đời của chúng. Cho nên bạn cần xem xét cận thẩn khi mua một khóa học nào đó nhé. Vì có nhiều khóa rất lâu rồi  nên sẽ có nhiều phần không update so với hiện tại. Tầm 2016 2017 thì bạn nên xem xét bỏ qua thôi .

Đảm bảo rằng bạn đang học tài liệu cập nhật, có liên quan.
Một số danh sách các giảng viên yêu thích của mình trên Udemy và YouTube để bạn có thể bắt đầu học nội dung chất lượng một cách nhanh chóng.
* [ Vasiliy Zukanov](https://www.techyourchance.com)
* [ Mitch Tabian](https://www.youtube.com/channel/UCoNZZLhPuuRteu02rh7bzsw)
* [Coding in Flow](https://www.youtube.com/channel/UC_Fh8kvtkVPkeihBs42jGcA)

# 3. Học với các phiên bản mới nhất của Android
![](https://miro.medium.com/max/700/0*9B9Ko-c_7iNbBX-z)
Như mình đã nói trước đây, điều quan trọng là bạn phải tìm hiểu về phiên bản Android mới nhất. Tại sao mình lại nhấn mạnh mẹo đơn giản này?
Lý do chính là đơn giản. Chỉ trong các phiên bản Android mới nhất, Google cuối cùng đã thúc đẩy các phương pháp thiết kế tốt, chẳng hạn như kiến trúc MVVM và databinding.
Những công nghệ và kiến trúc này không phải là mới, nhưng theo truyền thống, chúng rất phức tạp hoặc thậm chí không thể thực hiện được trong Android.
Như vậy, nhiều khóa học cũ sẽ dạy cho bạn các công nghệ cũ và do đó các phương pháp xấu, hack và cách giải quyết làm bẩn code của bạn.
Nói một cách nghiêm túc, hãy cố gắng nhận thức được những gì bạn nên học và tránh những cách làm cũ đó càng nhiều càng tốt.

# 4. Đảm bảo là bạn hiểu Lifecycles
Sau khi bạn học ngôn ngữ bạn chọn và hiểu các thành phần cơ bản của  Android framework, bạn cần bắt đầu tìm hiểu các vòng đời và cách chúng hoạt động.

Có ba vòng đời chính mà bạn nên quan tâm -  *app lifecycles, activity lifecycles, and fragment lifecycles.*
Biết những vòng đời này sẽ giúp bạn theo hai cách:

**1. Vòng đời là nền tảng cho mọi thứ trong quá trình phát triển Android.**

Bạn sẽ sử dụng `onCreateView()` trong mọi *fragment* và `onCreate()` trong mọi *activity*. Nhưng `onCreate()` cho một *fragment* và `onCreate()` cho một *activity* rất khác nhau. Những loại sắc thái này bạn sẽ chỉ biết được bằng cách học cách hoạt động của các vòng đời *acitivity* và *fragment*.

**2. Bạn sẽ có ít lỗi và rò rỉ bộ nhớ hơn**.

Một ví dụ cổ điển là observer sống lâu hơn listeners của nó, dẫn đến tình cờ `NullPointerExceptions`. Điều này xảy ra khi bạn quên hủy đăng ký người nghe của mình trong `onStop()` hoặc bạn sử dụng những thứ như `LiveData` (tự động quản lý vòng đời của nó) không đúng cách.
    Những lỗi này có thể tàn phá cơ sở code của bạn và gây ra nhiều giờ chửi bới màn hình và muốn đập vỡ máy tính của bạn ngay lập tức (đừng làm như vậy). =))
# 5. Biết nguyên lý SOLID 
![](https://miro.medium.com/max/222/0*V51nb0G24kosuWGD.png)

Nếu bạn là người mới bắt đầu, bạn có thể bỏ qua phần này . Nhưng nếu bạn biết Java và có thể tạo một vài ứng dụng đơn giản, thì đây là những điều bạn sẽ muốn tìm hiểu tiếp theo.
Cách đây không lâu, mình không nghĩ rằng việc biết các nguyên lý  SOLID và design patterns lại quan trọng hoặc có lợi đến vậy. Mình đã sai.

Rất nhiều lập trình viên tự học nghĩ rằng công nghệ họ đang sử dụng là thứ quan trọng nhất để học. Họ không sai nhiều - bạn cần biết các công cụ của mình.
Nhưng những công cụ và thư viện thực sự làm được gì cho bạn?

Chúng tăng tốc độ phát triển của bạn, đó là tất cả. Chúng không giới thiệu các khái niệm mới về thiết kế phần mềm.
Nói một cách đơn giản, bạn nên biết tại sao các công cụ bạn sử dụng lại tồn tại. Mình muốn nói rằng điều này thậm chí còn quan trọng hơn việc học chính công cụ đó.

Ví dụ: bạn không nên học Dagger 2 mà không tìm hiểu trước về `inversion of control`, `dependency injection` và thậm chí có thể thực hiện một số `dependency injection by hand`.

Sau đó, và chỉ khi đó, bạn mới nên học Dagger 2. Khi bạn biết lý do tại sao Dagger 2 tồn tại và các khái niệm dựa trên nó, bạn sẽ có thể học nó nhanh hơn nhiều.

Đi sâu vào vấn đề, các nguyên tắc thiết kế SOLID là nguyên tắc cơ bản cho hầu hết mọi thứ mà các nhà phát triển phần mềm hiện đại làm.

Ví dụ, `dependency inversion` - chữ “D” trong SOLID - là lý do toàn bộ lý do Dagger 2 tồn tại. Nếu bạn không biết SOLID và bạn đang sử dụng Dagger 2, bạn sẽ không biết framework thực sự đang làm gì.

Vì vậy, mình thực sự khuyên bạn nên tìm hiểu những kiến thức cơ bản về nguyên tắc thiết kế SOLID. Nếu bạn không làm điều đó ngay bây giờ, bạn chắc chắn sẽ học nó sau này. Mọi nhà phát triển phần mềm nên biết những nguyên tắc này.

# 6. Biết những Design Patterns cơ bản 
Một lần nữa, nếu bạn là người mới bắt đầu hoàn toàn, bạn có thể bỏ qua phần này.

Khi bạn có thêm kinh nghiệm viết code, bạn sẽ thấy rằng có một số pattern nhất định xuất hiện rất nhiều.
Đây không phải là một sự trùng hợp ngẫu nhiên. Có khoảng 23 design pattern chính đã được xây dựng từ vô số giờ kinh nghiệm và thất bại của hàng nghìn lập trình viên trong nhiều năm.

Vâng có thể nói nó chính là bí kíp võ công trong thiên hạ, hấp thụ được nó chả khác nào bạn có được bộ Cửu Âm Chân Kinh để xưng bá trong thiên hạ cả  =))

Lợi ích chính của các desgin pattern này là sự giao tiếp. Dưới đây là các mẫu thiết kế có thể bạn nên biết:
* `Observer pattern` (vì nó có ở khắp mọi nơi. Khi bạn cần giao tiếp từ đối tượng này sang đối tượng khác, đây là mẫu cần thực hiện của bạn). Bạn muốn tìm hiểu Rx, hãy biết về cái này đã nhé.
* `Adapter pattern` (để hiểu `RecyclerView` adapter ,`ListView` adapter, `ViewHolders`, v.v.)
* `Facade pattern` (để hiểu các API của bên thứ ba và lý do tại sao chúng được cấu trúc như vậy)

# 7. MVVM, MVC, MVP, hay MVI — Đâu là Best Architecture?
![](https://miro.medium.com/max/321/0*ynhsaQCLozBb2q_j.png)

Một câu hỏi mà mình gặp khó khăn khi lần đầu tiên bắt đầu học phát triển Android là “Ta nên sử dụng kiến trúc nào cho các ứng dụng của mình? Cái nào là tốt nhất?' Việc đưa mọi thứ vào MainActivity sẽ không hoạt động lâu dài được mà nên việc kiến trúc tốt là điều không thể thiếu.

Câu trả lời ngắn gọn là: MVC hoặc MVVM.

Câu trả lời dài về cơ bản là những mẫu này bao gồm các ý tưởng gần như chính xác. Chúng chỉ được thực hiện theo những cách hơi khác nhau. Kiến trúc tốt nhất là kiến trúc phù hợp với ứng dụng của bạn và cách người dùng sẽ tương tác với ứng dụng của bạn.
Tuy nhiên, nếu bạn thực sự muốn biết những gì bạn nên học đầu tiên ngay bây giờ, thì đây là những khuyến nghị của mình. Nhưng vì chúng rất giống nhau, nên bạn học cái nào trước là rất quan trọng

Cá nhân mình bây giờ nghĩ rằng MVC là thứ bạn có thể nên tìm hiểu đầu tiên - đơn giản vì nó được biết đến rộng rãi và nó đặt nền tảng cho các kiến trúc khác.

Nhưng nếu bạn không có nhiều thời gian để tìm hiểu nội dung mới, thì MVVM là kiến trúc được Google đề xuất và nó tương tự như MVC, với một số thay đổi. Học nó sẽ cho phép bạn đi sâu vào tài liệu Android và hiểu rất nhiều code ở đó.
Cho đến gần đây, MVVM là kiến trúc mà mình yêu thích. 

Sau đó là những kiến trúc ít được biết đến hơn.
* MVP về cơ bản là MVC với một vài khác biệt nhỏ.
* MVI là một spin khác của kiến trúc MVC, nhưng có thể phức tạp - bạn không nên tìm hiểu trước
* Bất kỳ mô hình kiến trúc nào khác có lẽ là điều bạn không nên quan tâm đến. 4 mẫu này được thiết lập tốt và nếu được triển khai tốt nó sẽ tạo ra clean code.

# 8. Nên học những công nghệ nào ?
![](https://miro.medium.com/max/700/0*xi9uQcm885t3_uHg)

Đây là một câu hỏi khác đã làm mình khó chịu khi mình mới bắt đầu. Sau khi biết framework Android cơ bản, bạn nên học những công nghệ nào? Ôi có cả tá công nghệ và thật sự bị hoãn loạn trong mê cung đó. Lạc vào động bàn tơ, bạn phải thực sự tỉnh táo chứ không sẽ bị mất xác trong mê cung đó mất. 

Sau khi phát triển ứng dụng một thời gian, mình đã đi đến kết luận rằng có lẽ bạn nên tập trung tìm hiểu những công nghệ cụ thể mà mình sẽ chỉ cho bạn ở đây.
Hãy nhớ rằng hầu hết tất cả các thư viện này đều được cộng đồng Android sử dụng rộng rãi và bạn có thể sẽ lướt qua chúng ở điểm này hay lúc khác:

* Thư viện AndroidX cơ bản (cấu thành Android Jetpack)

    Các thư viện này là cốt lõi của chức năng Android và hầu hết những thứ bạn sẽ sử dụng từ đây sẽ là các thành phần giao diện người dùng. Hãy nhớ rằng AndroidX thực sự là một bản viết lại của thư viện hỗ trợ Android (Android support library).
* Room Persistance Library

    Khi bạn cần lưu trữ ngoại tuyến, bạn thường sử dụng SQL để lấy nội dung từ cơ sở dữ liệu ngoại tuyến. Room sẽ giúp bạn thực hiện việc này nhanh hơn nhiều, bằng cách giúp bạn tạo các thực thể, DAO và tất cả các loại nội dung kỹ thuật gọn gàng.
* Google Firebase

    Firebase (đặc biệt là CloudFirestore ) chỉ đơn giản là cơ sở dữ liệu đám mây yêu thích của mình vào lúc này, vì vậy điều này có thể sẽ thay đổi. Nhưng nếu bạn muốn có một cơ sở dữ liệu đám mây vững chắc, bạn không thể bỏ qua Realtime Database hoặc Firestore cho Android 

* Retrofit (Okhttp)
Gần như mọi nhà phát triển sẽ cần phải làm việc với RESTful API tại một số thời điểm trong sự nghiệp của họ. Retrofit  là thư viện tiêu chuẩn cho mọi thứ REST trong Android. Nếu bạn đang viết các ứng dụng nối mạng, việc biết Retrofit - và do đó là REST - là một yêu cầu khá lớn đối với nhiều ứng dụng.
* Dagger -> Hilt (Koin)

    Dependency injection là một nguyên tắc quan trọng để xây dựng các ứng dụng Android tốt. Dagger là cách tiêu chuẩn để thực hiện việc này nhanh hơn so với việc tạo thành phần dependency injection của riêng bạn. Nó được sử dụng rộng rãi và có thể bạn sẽ sớm gặp phải Gần đây Hilt được giới thiệu  và được Google support mạnh mé. Học nó. Hơi khó nhằn tý nhưng nếu bạn dùng kotlin thì có thể dùng Koin - đơn giản nhanh gọn
* RxJava, RxKotlin, Corountine 

    RxJava là một thư viện thú vị. Mục đích chính là giúp bạn dễ dàng tạo code không đồng bộ chạy trên các chuỗi nền và trả về kết quả không đồng bộ. Nó được sử dụng trong nhiều ứng dụng Android, vì vậy bạn cần biết những kiến thức cơ bản về RxJava trước khi đọc code  của các ứng dụng này. Coroutine thì dành riêng cho Kotlin nhưng sử dụng đúng là nhanh gọn dễ hiểu hơn. Tàu nhanh thì chơi em Kotlin còn qua đêm thì chơi em Java. (bậy rồi )
* Glide (Coil)

    Glide là một thư viện tải hình ảnh phổ biến, hoàn chỉnh với bộ nhớ đệm tích hợp. Nó khá dễ sử dụng và được nhiều nhà phát triển Android sử dụng. Bạn cũng thể tham khảo Coil (con cưng của Kotlin)
* Mockito, MockK hoặc một số mock injection service cho unit testing.

    Mình sẽ nói rõ hơn điều này trong mẹo số 10.
* Gradle/Maven build automation systems

    Lý do đằng sau điều này là đơn giản. Bạn không cần phải biết nhiều về Gradle hoặc Maven, nhưng bạn nên biết đủ để sử dụng các thư viện và phụ thuộc khi cần thiết. Chỉ cần tìm kiếm bất cứ điều gì bạn không biết trên Google và bạn có thể sẽ nhận được câu trả lời tốt.

# 9. Khi nào có thể tự gọi mình là Dev Android  giỏi ?

Câu hỏi này sẽ khiến bạn đấu tranh trong một thời gian dài. 

Nhưng nếu bạn muốn, theo ý kiến của mình, một nhà phát triển Android có năng lực hiểu những điều sau:

* Tầm quan trọng của kiến trúc và thiết kế tốt phù hợp với các vấn đề của bạn.
* Tầm quan trọng của TDD.
* Các công nghệ  đã đề cập trong mẹo trước.
* Cấu trúc dữ liệu và thuật toán
* Cách truyền đạt vấn đề của bạn một cách rõ ràng và tầm quan trọng của việc giao tiếp thường xuyên.
* Việc luôn học hỏi và tương tác với các nhà phát triển Android khác là vô cùng quan trọng.

 Còn gì nữa không nhỉ ! Hãy cho mình biết nếu bạn có thứ khác muốn thêm vào danh sách này.
 
#  10. Sau khi học xong Basic, hãy bắt đầu Unit Testing

Cuối cùng, mình muốn để lại cho bạn một trong những phương pháp hay nhất mà bạn có thể bắt đầu sau khi đã học Java, Kotlin, Android framework và các công nghệ trong mẹo số 8 - Unit Test.
Unit Test có rất nhiều lợi ích. Mình sẽ phác thảo một vài trong số đó.

* `Single responsibility principle` (chữ cái đầu tiên của SOLID) được thực thi khi bạn unit test đúng cách.
* Bạn có thể thay đổi code của mình một cách tự tin hơn vì bạn được bảo vệ chống lại “sự hồi quy” hoặc chất lượng code giảm khi bạn thay đổi code.
* Bạn xác thực rằng code của bạn thực hiện những gì nó phải làm.

Gần như luôn luôn, bạn sẽ unit test bằng TDD, test driven development  mặc dù nó cũng rất khó nhằn. Đây là một kỹ thuật mà “Uncle Bob”-Martin rất ủng hộ và cuốn sách của ôn- Clean Code sẽ giúp bạn hiểu tại sao bạn nên sử dụng nó (đọc nó đi, hay lắm luôn đó)
Cuối cùng, khi bạn đã hiểu các nguyên tắc cơ bản về unit test, bạn nên cố gắng học Mockito cho các unit test Java hoặc MockK cho các unit test Kotlin.

Các thư viện này giúp bạn tạo ra các “mô phỏng” để thử nghiệm có thể đẩy nhanh thời gian phát triển của bạn một cách đáng kể. Mặc dù điều này thật tuyệt vời, nhưng bạn sẽ hiểu các khái niệm về TDD tốt hơn nhiều nếu bạn có một số kinh nghiệm thực hiện test mà không cần chúng.

# Kết luận
Muốn giỏi cái gì thì bạn thực sự phải thích nó, hãy vui vẻ với nó! Điều quan trọng là bạn phải thích tìm hiểu tất cả những thứ thú vị này. Đừng căng thẳng về nó hoặc cố gắng đi quá nhanh. Bạn sẽ không lưu giữ thông tin tốt nếu bạn làm như vậy.
Và cuối cùng, có lẽ bạn nên bắt đầu viết và cập nhật liên tục một blog nơi bạn nói về những gì bạn đã học được.

Đây là phương pháp cổ điển và nó sẽ giúp bạn củng cố kỹ năng giao tiếp bên cạnh các kỹ năng kỹ thuật của bạn. Nó cũng sẽ giúp bạn tương tác với các dev khác.
Tất cả những điều đó chính xác là những gì mình làm ở đây :), vì vậy hãy để lại suy nghĩ và ý kiến của bạn trong phần bình luận bên dưới.

Cảm ơn sự chú ý của các bạn. Bài viết được dịch từ [Medium](https://medium.com/swlh/11-things-you-should-know-when-starting-android-development-ca704f5394a7) cộng với sự xào nấu của mình. Rất hy vọng mọi người hứng thú.