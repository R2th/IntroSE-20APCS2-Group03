Đây là một phần trong series nói về cách sử dụng Coroutines trong Android. Bài viết này tập trung vào **Cách thức coroutines hoạt động** và **Các vấn đề mà chúng giải quyết**


### 1.Những việc mà coroutines có thể làm được?
Kotlin coroutines giới thiệu một kiểu mới của Lập trình bất đồng bộ, nó có thể sử dụng trên Android để đơn giản hoá mã code. Mặc dù họ mới sử dụng Kotlin vào năm 1.3, nhưng khái niệm về coroutines đã xuất hiện từ buổi bình minh của các ngôn ngữ lập trình. Ngôn ngữ đầu tiên để khám phá bằng cách sử dụng coroutines là Simula vào năm 1967.

Trong vài năm gần đây, coroutines đã trở nên phổ biến và hiện được đưa vào nhiều ngôn ngữ lập trình phổ biến như Javascript, C #, Python, Ruby và Go và một vài cái tên nữa. Các coroutines Kotlin dựa trên các khái niệm đã được thiết lập được sử dụng để xây dựng các ứng dụng lớn.

Trên Android, coroutines là một giải pháp tuyệt vời cho hai vấn đề:

* **Long running tasks** là các tác vụ mất quá nhiều thời gian để chặn mainThread.
* **Main-safety** cho phép bạn đảm bảo rằng mọi suspend function có thể được gọi từ mainThread

###
Hãy cùng nhau lặn xuống để xem làm thế nào coroutines có thể giúp chúng ta cấu trúc mã theo cách sạch hơn!


### 2.Long running tasks
Tìm nạp trang web hoặc tương tác với API đều liên quan đến việc thực hiện yêu cầu mạng. Tương tự, đọc từ cơ sở dữ liệu hoặc tải hình ảnh từ đĩa liên quan đến việc đọc tệp. Những thứ này là những gì tôi gọi là các tác vụ chạy dài - các tác vụ mất quá nhiều thời gian để ứng dụng của bạn dừng lại và chờ đợi chúng!


Có thể khó hiểu một chiếc điện thoại hiện đại thực thi mã nhanh như thế nào so với yêu cầu mạng. Trên Pixel 2, một chu kỳ CPU duy nhất chỉ mất dưới 0,0000000004 giây, một con số mà rất khó nắm bắt về mặt con người. Tuy nhiên, nếu bạn nghĩ về một yêu cầu mạng chỉ trong nháy mắt, khoảng 400 mili giây (0,4 giây), thì dễ hiểu hơn là CPU hoạt động nhanh như thế nào.  Chỉ trong nháy mắt, hoặc yêu cầu mạng hơi chậm, CPU có thể thực hiện hơn một tỷ chu kỳ!

Trên Android, mọi ứng dụng đều có một mainThread chịu trách nhiệm xử lý UI (như vẽ views) và điều phối các tương tác của người dùng. Nếu có quá nhiều công việc xảy ra trên thread này, ứng dụng dường như bị treo hoặc chậm, dẫn đến trải nghiệm người dùng không mong muốn. Bất kỳ tác vụ chạy dài nào cũng nên được thực hiện mà không chặn mainThread.

Để thực hiện một request mạng ngoài mainThread, một mẫu phổ biến là callbacks. Callbacks cung cấp một điều khiển cho một thư viện mà nó có thể sử dụng để callbacks mã của bạn tại một thời điểm nào đó trong tương lai. Với các callbacks, fetch developer.android.com có thể trông như thế này:

```kotlin
class ViewModel: ViewModel() {
   fun fetchDocs() {
       get("developer.android.com") { result ->
           show(result)
       }
    }
}
```

Mặc dù **get** được gọi từ mainThread, nó sẽ sử dụng một luồng khác để thực hiện request mạng. Sau đó, một khi kết quả có sẵn từ mạng, callbacks sẽ được gọi trên luồng chính. Đây là một cách tuyệt vời để xử lý các tác vụ chạy dài và các thư viện như Retrofit có thể giúp bạn thực hiện các request mạng mà không chặn mainThread.

##### Using coroutines for long running tasks

Coroutines là một cách để đơn giản hóa code được sử dụng để quản lý các tác vụ chạy dài như **fetchDocs**. Để khám phá cách coroutines làm cho code chạy các tác vụ chạy dài trở nên đơn giản hơn, hãy để viết lại ví dụ callbacks ở trên để sử dụng coroutines.

```kotlin
// Dispatchers.Main
suspend fun fetchDocs() {
    // Dispatchers.Main
    val result = get("developer.android.com")
    // Dispatchers.Main
    show(result)
}
// look at this in the next section
suspend fun get(url: String) = withContext(Dispatchers.IO){/*...*/}
```

Liệu code này có chặn mainThread không? Làm thế nào để nó trả về một kết quả từ **get** mà không cần chờ request và chặn mạng? Hóa ra coroutines cung cấp một cách để Kotlin thực thi code này và không bao giờ chặn mainThread.

Coroutines xây dựng dựa trên các chức năng thông thường bằng cách thêm hai hoạt động mới. Ngoài việc **invoke** (hoặc call) và **return**, coroutines thêm **suspend** và **resume**.

* **suspend** - tạm dừng việc thực hiện coroutine hiện tại, lưu tất cả các biến cục bộ
* **resume** - tiếp tục một coroutine bị đình chỉ từ nơi nó đã bị tạm dừng

Chức năng này được thêm vào bởi Kotlin bởi từ khóa suspend trên function. Bạn chỉ có thể gọi các suspend function từ các suspend function khác hoặc bằng cách sử dụng trình tạo coroutine như *launch* để bắt đầu một coroutine mới.

> **suspend** và **resume** làm việc cùng nhau để thay thế cuộc gọi lại.


Trong ví dụ trên, **get** sẽ tạm dừng coroutine trước khi nó bắt đầu request mạng. Hàm get vẫn sẽ chịu trách nhiệm chạy yêu cầu mạng khỏi luồng chính. Sau đó, khi yêu cầu mạng hoàn thành, thay vì gọi một cuộc gọi lại để thông báo cho luồng chính, nó có thể chỉ cần khôi phục lại coroutine mà nó bị treo.

![](https://miro.medium.com/max/1776/1*U24_ZyMJKI_c2qMspCXxZw.gif)

Nhìn vào cách **fetchDocs** thực thi, bạn có thể thấy cách **suspend** hoạt động. Bất cứ khi nào một coroutine bị treo, khung ngăn xếp hiện tại (nơi mà Kotlin sử dụng để theo dõi function nào đang chạy và các biến của nó) sẽ được sao chép và lưu lại cho lần sau. Khi nó tiếp tục, khung ngăn xếp được sao chép trở lại từ nơi nó được lưu và bắt đầu chạy lại. Ở giữa hình động - khi tất cả các coroutines trên luồng chính bị treo, luồng chính sẽ tự do cập nhật màn hình và xử lý các sự kiện của người dùng. Cùng nhau, suspend và resume thay thế callbacks. Khá gọn gàng!

> Khi tất cả các coroutines trên luồng chính bị treo, luồng chính sẽ tự do thực hiện các công việc khác.


Mặc dù chúng tôi đã viết mã tuần tự đơn giản trông giống hệt như một request mạng chặn, các coroutines sẽ chạy code của chúng tôi chính xác như chúng tôi muốn và tránh chặn mainThread!
Tiếp theo, chúng ta hãy xem cách sử dụng coroutines cho main-safety và khám phá dispatchers.

### 3. Main-safety with coroutines

Trong các coroutines của Kotlin, các suspend function được viết tốt luôn an toàn để gọi từ luồng chính. Bất kể họ làm gì, họ phải luôn cho phép bất kỳ thread nào gọi họ.

Tuy nhiên, có rất nhiều điều chúng tôi làm trong các ứng dụng Android quá chậm để xảy ra trên luồng chính. Yêu cầu mạng, phân tích cú pháp JSON, đọc hoặc viết từ cơ sở dữ liệu hoặc thậm chí chỉ lặp qua các danh sách lớn. Bất kỳ thứ nào trong số này đều có khả năng chạy chậm, đủ để khiến người dùng có thể nhìn thấy được jank và nên chạy theo luồng chính.

Sử dụng đình chỉ không nói với Kotlin để chạy một chức năng trên một luồng nền. Thật đáng để nói rõ ràng và thường thì các coroutines sẽ chạy trên luồng chính. Trên thực tế, đó là một ý tưởng thực sự tốt khi sử dụng Dispatchers.Main.im ngay khi khởi chạy một coroutine để đáp ứng với sự kiện UI - theo cách đó, nếu bạn không thực hiện một nhiệm vụ chạy dài đòi hỏi sự an toàn chính, kết quả có thể có sẵn trong khung tiếp theo cho người dùng.

> Coroutines sẽ chạy trên luồng chính và đình chỉ không có nghĩa là nền.


Để thực hiện một chức năng hoạt động mà quá chậm đối với an toàn chính của luồng chính, bạn có thể yêu cầu các coroutines của Kotlin thực hiện công việc trên bộ điều phối Mặc định hoặc IO. Trong Kotlin, tất cả các coroutine phải chạy trong một bộ điều phối - ngay cả khi chúng chạy trên luồng chính. Quân đoàn có thể tự đình chỉ, và người điều phối là điều biết cách nối lại họ.

Để chỉ định nơi các coroutines sẽ chạy, Kotlin cung cấp ba Công cụ bạn có thể sử dụng để gửi luồng.

```kotlin
+-----------------------------------+
|         Dispatchers.Main          |
+-----------------------------------+
| Main thread on Android, interact  |
| with the UI and perform light     |
| work                              |
+-----------------------------------+
| - Calling suspend functions       |
| - Call UI functions               |
| - Updating LiveData               |
+-----------------------------------+

+-----------------------------------+
|          Dispatchers.IO           |
+-----------------------------------+
| Optimized for disk and network IO |
| off the main thread               |
+-----------------------------------+
| - Database*                       |
| - Reading/writing files           |
| - Networking**                    |
+-----------------------------------+

+-----------------------------------+
|        Dispatchers.Default        |
+-----------------------------------+
| Optimized for CPU intensive work  |
| off the main thread               |
+-----------------------------------+
| - Sorting a list                  |
| - Parsing JSON                    |
| - DiffUtils                       |
+-----------------------------------+
```

> * Room will provide main-safety automatically if you use suspend functions, RxJava, or LiveData.
> *  Networking libraries such as Retrofit and Volley manage their own threads and do not require explicit main-safety in your code when used with Kotlin coroutines.
> 

Để tiếp tục với ví dụ trên, hãy để sử dụng bộ điều phối để xác định hàm get. Bên trong phần thân của bạn, bạn gọi vớiContext (Dispatchers.IO) để tạo một khối sẽ chạy trên bộ điều phối IO. Bất kỳ mã nào bạn đặt bên trong khối đó sẽ luôn thực thi trên bộ điều phối IO. Vì withContext tự nó là một hàm tạm dừng, nó sẽ hoạt động bằng cách sử dụng coroutines để cung cấp sự an toàn chính.

```kotlin
// Dispatchers.Main
suspend fun fetchDocs() {
    // Dispatchers.Main
    val result = get("developer.android.com")
    // Dispatchers.Main
    show(result)
}
// Dispatchers.Main
suspend fun get(url: String) =
    // Dispatchers.Main
    withContext(Dispatchers.IO) {
        // Dispatchers.IO
        /* perform blocking network IO here */
    }
    // Dispatchers.Main

```

 
 
    
Với coroutines, bạn có thể thực hiện gửi chủ đề với kiểm soát chi tiết. Vì withContext cho phép bạn kiểm soát luồng nào mà bất kỳ dòng mã nào thực thi mà không đưa ra một cuộc gọi lại để trả về kết quả, bạn có thể áp dụng nó cho các chức năng rất nhỏ như đọc từ cơ sở dữ liệu của bạn hoặc thực hiện yêu cầu mạng. Vì vậy, một cách thực hành tốt là sử dụng withContext để đảm bảo mọi chức năng đều được gọi an toàn trên bất kỳ Bộ điều phối nào kể cả Chính - theo cách đó, người gọi không bao giờ phải suy nghĩ về luồng nào sẽ cần để thực thi chức năng.
    
Trong ví dụ này, fetchDocs đang thực thi trên luồng chính, nhưng có thể gọi get một cách an toàn thực hiện một yêu cầu mạng trong nền. Vì coroutines hỗ trợ tạm dừng và tiếp tục, coroutine trên luồng chính sẽ được nối lại với kết quả ngay khi khối withContext hoàn tất.

> Well written suspend functions are always safe to call from the main thread (or main-safe).
> 

Nó là một ý tưởng thực sự tốt để làm cho mọi chức năng đình chỉ chính trở nên an toàn. Nếu nó làm bất cứ điều gì chạm vào đĩa, mạng hoặc thậm chí chỉ sử dụng quá nhiều CPU, hãy sử dụng withContext để đảm bảo an toàn khi gọi từ luồng chính. Đây là mô hình mà các thư viện dựa trên coroutines như Retrofit và Room tuân theo. Nếu bạn theo phong cách này trong suốt cơ sở mã của bạn, mã của bạn sẽ đơn giản hơn nhiều và tránh trộn lẫn các mối quan tâm luồng với logic ứng dụng. Khi được theo dõi một cách nhất quán, các coroutines có thể tự do khởi chạy trên luồng chính và thực hiện các yêu cầu cơ sở dữ liệu hoặc mạng với mã đơn giản trong khi đảm bảo người dùng giành chiến thắng nhìn thấy jank.


### 4. Performance of withContext

withContext cũng nhanh như gọi lại hoặc RxJava để cung cấp sự an toàn chính. Nó thậm chí còn có thể tối ưu hóa các cuộc gọi với Nội dung ngoài những gì có thể với các cuộc gọi lại trong một số trường hợp. Nếu một chức năng sẽ thực hiện 10 cuộc gọi đến cơ sở dữ liệu, bạn có thể yêu cầu Kotlin chuyển đổi một lần trong một bên ngoài với Nội dung xung quanh tất cả 10 cuộc gọi. Sau đó, mặc dù thư viện cơ sở dữ liệu sẽ gọi vớiContext nhiều lần, nó sẽ ở trên cùng một bộ điều phối và đi theo một đường dẫn nhanh. Ngoài ra, chuyển đổi giữa Dispatchers.Default và Dispatchers.IO được tối ưu hóa để tránh chuyển đổi luồng bất cứ khi nào có thể.

### 5. What’s next

Trong bài viết này, chúng tôi đã khám phá những vấn đề mà coroutines là tuyệt vời để giải quyết. Coroutines là một khái niệm thực sự cũ trong các ngôn ngữ lập trình đã trở nên phổ biến gần đây do khả năng tạo mã tương tác với mạng đơn giản hơn.

Trên Android, bạn có thể sử dụng chúng để giải quyết hai vấn đề thực sự phổ biến:

* Đơn giản hóa mã cho các tác vụ chạy dài như đọc từ mạng, đĩa hoặc thậm chí phân tích kết quả JSON lớn.
* Thực hiện chính xác an toàn chính để đảm bảo rằng bạn không bao giờ vô tình chặn luồng chính mà không làm cho mã khó đọc và viết.

### 6. Reference

[Medium](https://medium.com/androiddevelopers/coroutines-on-android-part-i-getting-the-background-3e0e54d20bb)