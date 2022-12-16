Khi chúng ta viết ứng dụng thì việc xử lý các công việc bất song song là một vấn đề chúng ta sử phải đối mặt thường xuyên, đây là một vấn đề khá khó để kiểm soát, khiến chúng ta tốn công sức để thực hiện.

Chúng ta đã được biết rằng những tác vụ nặng và tốn thời gian nên được thực hiện trên background thread và chúng ta chỉ làm những công việc ngắn và nhẹ trên main thread. Bạn có thể cũng nghe về thread pools (hoặc coroutine dispatchers hoặc RxJava schedulers) và khái niệm về I/O - bound và CPU-bound. Nhưng liệu chúng ta đã hiểu rõ và có cái nhìn sâu sắc về nó chưa? Trong bài viết ngày hôm nay tôi sẽ cố gắng giải thích về chúng và tìm hiểu sự khác nhau giữa 2 concepts và tại sao việc hiểu chúng là quan trọng trong quá trình phát triển ứng dụng.

Tất cả chúng ta đều biết rằng main thread nên được giữ free càng nhiều càng tốt. Hầu hết các nền tảng ngăn cản chúng ta sử dụng main thread cho những công việc tốn nhiều thời gian. Android sẽ đơn giản là làm ứng dụng của bạn bị crash nếu có bất kỳ tác vụ liên quan đến mạng hoặc file (giả định rằng bạn đã đặt strict mode).

Trong Android, các thư viện phổ biến thường sử dụng thread-pool. Trong Kotlin Coroutine, bạn chỉ định một dispatcher cái mà thông thường là một pool của Thread objects mà sẽ được sử dụng khi thực thi. Với RxJava, bạn truyện một Scheduler tới phương thức subscribeOn() và observerOn()  để chỉ định nơi code của chúng ta sẽ được chạy.

Chúng ta thấy rằng cả hai thư viện này đều có API dành riêng cho công việc liên quan tới I/O, tách biệt với các kiểu hoạt động khác, nhưng tại sao lại như vậy? Tại sao chúng ta không sử dụng một thread pool duy nhất cho tất cả các background operation? Hệ điều hành sẽ xử lý schedule của những thread này giống nhau.

**Lý do đằng sau việc này là cách hoạt động một I/O operation so với các hoạt động khác là nó tốn nhiều CPU hơn**

# IOwait
Đọc và ghi data từ một file trên một file trong máy hoặc từ một socket network phải chờ đợi rất nhiều. CPU sẽ phải đợi cho đến khi các phần cứng cơ bản  phân phối dữ liệu vì nó không sẵn sàng ngay lập tức. Bất kỳ I/O operation mà đọc hoặc ghi sử dụng bất kỳ thứ gì mà không được lưu trữ trong RAM sẽ gây ra thứ được gọi là IOwait. Đây là một cuộc gọi hệ thống yêu cầu CPU tạm dừng việc thực thi luồng hiện tại cho đến khi dữ liệu có sẵn hoặc đã được truyền thành công.

> Có một ví dụ như thế này, chẳng hạn bạn đang chờ khách hàng báo thời gian và địa điểm gặp mặt để ký hợp đồng. Cho đến khi bạn nhận được thông báo thời gian và địa điểm thì bạn không thể đặt vé máy bay cũng như đi đến nơi ký hợp đồng mà bạn chỉ có thể chuẩn bị giấy tờ phục vụ cho việc ký hợp đồng được thôi. 

Khi hệ điều hành gặp IOwait, nó sẽ tạm dừng mọi hoạt động của thread đó và tự do lấy một luồng khác đã sẵn sàng để chạy. Về mặt lý thuyết, một hệ điều hành có thể có vô hạn các thread đang sleep do IOwait, mà người dùng không hề nhật thấy bất kỳ sự khác biệt nào (Trong thực tế, có các cách khác để xem, như RAM có sẵn, thời gian chuyển cảnh v.v.. nhưng nó vượt quá phạm vi của bài viết này).

Điều quan trọng cần phải nhớ ở đây là một luồng dành riêng cho mọi công việc I/O sẽ dành phần lớn thời gian để đợi trong khi chờ các hệ thống phần cứng khác hoàn thành công việc. Hầu hết các ứng dụng đang đọc ghi rất nhiều dữ liệu mà mỗi thao tác đó sẽ yêu cầu các luồng riêng.

Nếu bạn có quá nhiều thread sẵn sàng để làm công việc I/O, hiệu năng của ứng dụng của bạn sẽ bị ảnh hưởng vì chúng thậm chó có thể bắt đầu cho đến khi một số thao tác I/O khác được hoàn thành và thread đó sẽ quay trở lại thread pool. Điều này có nghĩa là số lượng thread trong thread pool của bạn thực hiện các thao tác I/O phải khá lớn.
# Chỉ CPU làm việc
Phần lớn các công việc cần chạy nền của ứng dụng sẽ liên quan đến việc đọc và ghi một file, một database, hoặc network nhưng một số công việc mà không làm bất cứ I/O nào vẫn nặng đủ để yêu cầu một background thread để chúng không block main thread của chúng ta. Đây có thể là một công việc mà yêu cầu một xử lý đáng kể, như làm mờ ảnh, nén hoặc giải nén dữ liệu trong bộ nhớ hoặc chạy AI code cho trò chơi.

Hãy lấy một ví dụ hơi thiếu thực tế một chút đó là sắp xếp một lượng lớn array của string. Tất cả dữ liệu sẵn sàng cho CPU ngay lập tức vì nó được lưu trữ trong RAM. Không IOwait xảy ra, nhưng việc sắp xếp cũng tốn một thời gian đủ để chúng ta gặp vấn đề nếu chúng được. Chúng ta chạy việc này trên background thread nơi nó có thể làm công việc của nó sau đó trả kết quả về cho main thread sau khi nó hoàn thành.

Bây giờ hãy tưởng tượng rằng ứng dụng của bạn đột nhiên sẽ có 4 arrays khác nhau mà cần sắp xếp cùng một thời điểm. CPU trong trường hợp này có 4 lõi, điều ngày có nghĩa là là phần cứng hỗ trợ 4 thread được thực thi song song. Điều gì sẽ xảy ra nếu tất cả những lỗi này đột ngột bận rộn để thực thi việc sắp xếp các array của bạn? Không có IOwait xảy ra trong khi sắp xếp, do đó CPU sẽ không dừng việc thực thi như đối với một I/O operation. Mặc dù hệ điều hành sẽ chuyển đổi  việc thực thi các luồng ngay khi chúng không thực hiện IOwait, nhưng nó sẽ không tạm dừng các thread thường xuyên, điều này có nguy cơ dẫn tới rủi ro rằng CPU quá ít cho main thread
  
 # Nhưng nếu...
 
 Tất nhiên có nhiều thứ hơn là chỉ đơn giản nghĩ về I/O và CPU-only work. Chúng ca cũng có thể nói về memory-bound và cache-bound nhưng phần lớn những app developers, như thế là đủ để xem xét về sự khác nhau giữa CPU và I/O.
 
 Điểm nổi bật của vấn đề này là bạn cần 2 thread pools khác nhau cho các công việc chạy nền mà ứng dụng của bạn sẽ làm. Các hoạt động I/O nên có một thread pool lớn hơn nhiều so với các hoạt động chỉ dành cho CPU.
 
> Chú ý rằng Kotlin Coroutine dispatcher chia sẽ các luồng khi có thể. Điều này làm nó vô cùng hiệu quả chuyển giữa hai context. Tuy nhiêm trường hợp cho I/O-bound và CPU-bound vẫn được áp dụng.

Chúng ta hãy xem xét một trường hợp phức tạp hơn một chút để hiểu điều gì có thể xảy ra.

Hãy xem trường hợp ứng dụng của bạn đang lấy các bức ảnh ở trên mạng và hiển thị chúng trong một list. Trước khi chúng được hiển thị, bạn sẽ làm mờ mỗi bức ảnh. Bạn bây giờ có một tác vụ cho mỗi item trong list mà làm một công việc I/O nặng theo sau bởi một CPU-only work nặng. Thread pool nào bạn nên sử dụng? Nếu chúng ta chỉ show một bức ảnh tại một thời điểm, nó sẽ được chấp nhận để xử lý tất cả trên một thread từ I/O thread pool, nhưng còn trường hợp chúng ta hiển thị nhiều bức ảnh trong list thì sao?

Một lần nữa, nó phụ thuộc vào tình hình của bạn. Bạn có thể ổn khi thực hiện mọi thứ trên I/O thread, nhưng nếu bạn gặp vấn đề về hiệu năng bạn có thể muốn xem xét chuyển sang một CPU-bound thread pool sau khi bạn đã truy xuất thành công hình ảnh tự mạng và sắp thực hiện việc làm mờ. Trong ví dụ của chúng ta ở trên, điều này có nghĩa rằng bạn có một vấn đề ki scroll trong trong khi image đang được làm mờ.

Ví dụ ở dưới đây mô tả cách bạn sẽ làm điều này sử dụng Kotlin Coroutines. Chú ý rằng ở đây chỉ biểu thị cách chuyển đổi giữa các thread pool khác nhau. Cũng lưu 
 ý rằng nếu bạn sử dụng Coroutine apdater cho Retrofit gọi tới fetchImageAsync() có thể chạy trên main bởi vì Retrofit sử dụng thread pool riêng.
 
 ```kotlin
 launch(Dispatchers.IO) {
    val image = api.fetchImageAsync(url).await()
    withContext(Dispatchers.Default) {
        val blurred = image.blur()
        withContext(Dispatchers.Main) {
            displayImage(blurred)
        }
    }
}
 ```

# Tóm lại
Phần lớn thời gian làm việc với background của bạn sẽ bao gồm các I/O operation nặng, miễn là bạn đảm bảo chắc chắn rằng chúng hoàn thành trên một Scheduler hoặc một Dispatcher thích hợp mà bạn cho là ổn. Một lỗi cơ bản là cố gắng tự tối ưu hóa việc này, thường dựa vào kinh nghiệm đã được học. Trừ khi bạn có một trường hợp rất đặc biệt, tránh việc tự mình khai định nghĩa thread pools.

Vì hầu hết các thư viện liên quan đến concurrency cho chúng ta (như RxJava hoặc Kotlin Coroutine) cung cấp cho chúng ta những thread pools được cấu hình sẵn, tất cả những gì bạn phải nghĩ là sử dụng kiểu nào dựa vào công việc bạn sẽ làm.

Trong trường hợp bạn làm việc với cả hai CPU-heavy cũng như I/O-intensive, hãy cân nhắc chia tách các operator thành hai phần và chuyển đổi thread pools ở giữa. Một ví dụ có thể liên quan là nếu bạn sử dụng một cái gì đó như Glide hoặc Picasso để tải xuống và sau đó transform images. Một lần nữa, sử dụng như thế nào lại phụ thuộc vào tính huống cụ thể của bạn.

Cố gắng xác định loại công việc mà mỗi hoạt động sẽ được thực hiện. Nếu không chắc chắn hãy sử dụng một cái gì đó như StricMode trên Android để phát hiện xem liệu nó có đang thực hiện bất kỳ file hoặc network operations nào không.

Vì vậy, để tổng hợp nó; Nhiều I/O thread có thể ổn, nhưng nhiều luồng chỉ CPU có thể rất tệ.

# Kết
Bài viết của mình đến đây là kết thúc. Cảm ơn mọi người đã đọc. Hi vọng mọi người sẽ ủng hộ mình trong những bài viết tiếp theo.
# Tham khảo
Bài viết có tham khảo từ: https://hellsoft.se/https-hellsoft-se-understanding-cpu-and-io-bound-for-asynchronous-operations-6511c70a5685