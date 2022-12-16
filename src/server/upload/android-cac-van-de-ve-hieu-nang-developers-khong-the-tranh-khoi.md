`Nói về "Kỹ thuật phát triển phần mềm" truyền thống có 2 khía cạnh để tối ưu hoá một chương trình. Một là "local optimization" cụ thể là cải thiện trong các chức năng của chương trình. Đây là cách có thể thực hiện được bằng việc sử dụng các thuật toán, cấu trúc dữ liệu và giải thuật. Hướng thứ 2 là tối ưu ở tầng cao hơn, tầng thiết kế. Một chương trình nếu được thiết kế  không tốt sẽ rất khó để cải thiện hiệu năng. Hơn nữa việc tối ưu hoá ở tầng thiết kế cũng khó khắc phục hơn (thậm chí là không thể khắc phục) khi đang trong giai đoạn cuối của vòng đời phát triển phần mềm. Vì vậy chúng cần phải được thực hiện trong giai đoạn thiết kế. `

-----

`Với Android, khi phát triển một ứng dụng, có một vài vấn đề mà các nhà phát triển rất hay gặp phải, một số ở tầng thiết kế, một số ở tầng triển khai. Chúng làm  giảm đáng kể hiệu năng của ứng dụng. Dưới đây là 4 vấn đề các developers gặp phải nhiều nhất. `

# Battery
- Hầu hết các developers đều học được các kỹ năng lập trình trên các thiết bị có kết nối với một nguồn điện chính. Nhưng lại có rất ít trong số đó có hiểu biết về giá trị của năng lượng trong các hoạt động nhất định. Một nghiên cứu được thực hiện bởi **[Purue University](https://www.microsoft.com/en-us/research/people/?from=http%3A%2F%2Fresearch.microsoft.com%2Fen-us%2Fpeople%2Fmzh%2Feurosys-2012.pdf)**: "Phần lớn năng lượng tiêu hao trong các ứng dụng smartphone là dành cho các tác vụ vào ra (I/O) và chủ yếu là network I/O". Đồng thời cũng chỉ ra rằng 65%-75% năng lượng tiêu hao trong các ứng dụng miễn phí là dành cho các tác vụ của bên quảng cáo thứ 3.

- Lí do là vì các bộ phận vô tuyến điện (trong bài viết này mình sẽ gọi là "radio") như wifi, 3G/4G của smartphones dùng khá nhiều năng lượng để truyền tín hiệu. Mặc định thì các bộ phận này tắt (asleep) nhưng khi có yêu cầu ví dụ như network I/O thì các bộ phận này được bật lên để xử lý các gói tin và sẽ tiếp tục duy trì trạng thái chứ không tắt ngay lập tức. Sau một khoảng thời gian, nếu không có bất kì yêu cầu hay hoạt động nào được đưa ra, chúng mới được tắt hoàn toàn. Và thật không may, công đoạn bật tắt này tốn khá nhiều năng lượng. 

- Thử tưởng tượng, trường hợp xấu nhất khi có một vài network I/O được yêu cầu mở -> chúng được tạm dừng -> ngay sau đó lại tiếp tục. Khi đó năng lượng phải được cung cấp để bật, để truyền dữ liệu, năng lượng để duy trì và tạm tắt, sau đó lại được bật ngay lập tức để hoạt động trở lại và để làm nhiều công việc hơn. 

  ### `"Rather than sending the data piecemeal, it is better to batch up these network requests and deal with them as a block."`

- Thông thường sẽ có 3 loại yêu cầu truy cập mạng mà một ứng dụng thực hiện: 
    1. Loại đầu tiên là yêu cầu thực hiện ngay lập tức (do now) ví dụ như người dùng thực hiện thao tác refreshed lại news feed thì dự liệu cần được cập nhật ngay lập tức. Nếu nó không được hiện thị sớm thì có thể người dùng sẽ nghĩ ứng dụng bị lỗi. Với loại này thì có rất ít cách để tối ưu hoá.
    2. Loại truy cập mạng thứ 2 là kéo dữ liệu từ cloud,... ví dụ có một bài viết mới được cập nhật, thì cần hiển thị một item mới trên news feed.
    3. Loại này ngược với loại 2 là đẩy/gửi dữ liệu lên cloud,... 
   
- Với loại 2 và 3, thay vì gửi dữ liệu từng phần, làm cho bộ phận truyền tín hiệu bật và chờ liên tục để thực hiện các phần, chúng ta nên đóng gói chúng lại và xử lý như một khối. Theo cách đó thì radio sẽ chỉ được kích hoạt một lần, các requets được thực hiện, cách này đảm bảo rằng radio sẽ không bị khởi động lại ngay sau khi nó vừa bị tạm dừng. Để theo dõi thông tin về việc gửi request network theo gói bạn có thể xem qua về **[GcmNetworkManager](https://developers.google.com/android/reference/com/google/android/gms/gcm/GcmNetworkManager)**
API.
![alt](https://cdn57.androidauthority.net/wp-content/uploads/2016/01/battery-historian-16x9-1080p-1340x754.jpg)

- Đồng thời để giúp bạn theo dõi và phát hiện các tác vụ sử dụng năng lượng trong ứng dụng. Google đã giới thiệu một công cụ có tên **[Battery historian](https://github.com/google/battery-historian)** Nó ghi lại thông tin các tác vụ liên quan đến pin (hỗ trợ từ Android 5.0 Lollipop - API Level 21+).
# Memory
- Tuỳ thuộc vào ngôn ngữ lập trình bạn sử dụng C/C++ hay Java mà chúng ta sẽ có các cách quản lý bộ nhớ khác nhau. Trong C việc cấp phát và giải phóng memory là hoàn toàn thủ công, bạn phải tự kiểm soát việc đó. Nhưng với Java, tiến trình giải phóng memory được tự động xử lý bởi **[Garbage collector (GC)](https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html)** Nhưng lại có một nhược điểm là khiến các Android Developers có xu hướng không để ý đến memory. Chúng ta thoải mái cấp phát memory khắp nơi và tin tưởng rằng GC sẽ lo toan chu đáo mọi việc :)) 

- Ở một mức độ nào đó thì việc này là đúng nhưng việc xử lý của GC có thể tác động đến hiệu năng ứng dụng của bạn mà không thể biết trước. Và thực tế, với các thiết bị Android trước Android 5.0 Lollipop, khi GC chạy, toàn bộ các hoạt động khác phải dừng lại cho đến khi nó thực hiện xong. Nếu bạn viết một ứng dụng game, bạn sẽ cần ứng dụng **render khung hình sau mỗi 16ms để có được 60 fps**. Do đó khi cấp phát bộ nhớ quá bừa bại, rất có thể bạn sẽ khiến GC được kích hoạt tại mỗi frame, hoặc vài frames và đó là lí do khiến game của bạn bị drop frames hay dễ hiểu là giật lag =)))

- Một trường hợp rất dễ khởi chạy GC là khi làm việc với Bitmaps. Nếu thông qua network, hay lấy từ disk một ảnh đã được nén và để decoded, nó cần được cấp phát bộ nhớ cho ảnh với kích thước đầy đủ sau khi decoded. Vì vậy điều đầu tiên chúng ta cần làm là tái sử memory cấp phát cho các bitmaps. Thay vì cấp phát vùng nhớ cho bitmap mới và chờ GC dọn vùng nhớ của bitmap cũ. Để rõ hơn, bạn hãy tham khảo một bài viết rất hay của Google dành cho các developers về **[Caching Bitmaps](https://developer.android.com/topic/performance/graphics/cache-bitmap)**

{@youtube: https://youtu.be/OrLEoIsMIAc}

# Data Serialization
- Data Serialization (dữ liệu tuần tự) dường như xuất hiện ở mọi nơi, trao đổi dữ liệu với cloud, lưu trữ trên disk, trao đổi dữ liệu giữa các process,.. tất cả đều có thể thực hiện với data serialization. Nhưng bạn có biết định dạng dữ liệu này cũng ảnh hưởng đến hiệu năng của ứng dụng cũng như bộ nhớ mà nó sử dụng.

- Vấn đề ở đây là cách thức tiêu chuẩn mà data serialization triển khai, nó không thực sự hiệu quả như bạn nghĩ. Ví dụ với JSON, Bạn có thể thấy đây là một định dạng tuyệt vời, bạn có thể đọc nó dễ dàng, dễ thay đổi hay chỉnh sửa. Tuy nhiên thì nó dành cho máy tính chứ đâu phải cho bạn :) Do đó định dạng bạn coi là tuyệt vời này đi kèm quá nhiều các khoảng trắng, các kí tự kèm theo đã khiến nó không mấy hiệu qủa và trông thật cồng kềnh. Nếu không bị thuyết phục, bạn hãy xem qua video này của Colt McAnlis - developer của Google tập trung về mảng hiệu năng: **[why these human-readable formats are bad for your app.](https://www.youtube.com/watch?v=IwxIIUypnTE)**

- Rất nhiều Android Developer nghĩ rằng chỉ cần implement *Serializable* là mọi chuyện được giải quyết. Tuy nhiên thì không phải vậy, với cơ chế của Serializable nó sinh ra rất nhiều các đối tượng rác tạm thời và sẽ khiến GC phải làm việc, đồng thời tốc độ rất chậm, nếu bạn truyền hàng nghìn đối tượng serialized thì toàn bộ quá trình có thể mất đến hơn 1s.

- Vậy giải pháp ở đây là gì? Thông thường chúng ta sẽ sử dụng *Parcelable* nhưng đây vẫn không phải là giải pháp hoàn hảo vì bạn sẽ không thể lưu trữ đối tượng Parcelable vào disk, bị phụ thuộc vào nền tảng hay tốn nhiều mã nguồn để triển khai. Cách tiếp cận tốt nhất được Google giới thiệu là sử dụng *Binary serialization format.* 2 thư viện tốt nhất triển khai binary serialization **[Nano Proto Buffers](https://github.com/protocolbuffers/protobuf)** và **[FlatBuffers](https://github.com/google/flatbuffers)**

- **Nano Proto Buffer** là một phiên bản được thiết kế bởi **[Google's Protocol Buffers](https://developers.google.com/protocol-buffers/)** cho các hệ thống hạn chế tài nguyên như Android. Nó tiết kiệm cả về thời gian chạy lẫn số lượng mã code.

![alt](https://cdn57.androidauthority.net/wp-content/uploads/2016/01/flatbufffers.jpg)

- **FlatBuffers** là một thư viện hiệu quả đa nền tảng cho C++, Java, C#, Go, Python và JavaScript. Ban đầu được Google tạo ra cho các nhà phát triển game và các ứng dụng tập trung vào hiệu năng khác. Bạn có thể xem qua tại **[FlatBuffers in Android - introduction](http://frogermcs.github.io/flatbuffers-in-android-introdution/)**

# Threading
- Threading là một chủ đề rất quan trọng nếu bạn muốn có một ứng dụng phản hồi tuyệt vời với người dùng, đặc biệt trong thời đại của các bộ vi xử lý đa nhân. Tuy nhiên rất khó để triển khai  sử dụng thread đúng đắn vì các giải pháp xử lý luồng phức tạp đòi hỏi nhiều kiến thức về đồng bộ hoá, một thread phải chờ đợi một thread khác sẽ làm ứng dụng của bạn trở nên chậm chạp.

- Mặc đinh, Android chỉ chạy một luồng duy nhất, bao gồm xử lý tương tác người dùng, vẽ giao diện. Quay trở lại với qui tắc 16ms, tất cả việc vẽ giao diện và các công việc khác nên được thực hiện trong khoảng thời gian đó. Sử dụng 1 thread là tốt cho một ứng dụng đơn giản, nhưng khi mọi chuyện phức tạp hơn thì một luồng mới được tạo ra là điều nên làm, ví dụ tải một bitmap trên mainthread thì **[giao diện người dùng sẽ bị dừng.](https://developer.android.com/training/articles/perf-anr)**

- Những tác vụ như thế nên được triển khai ở một luồng riêng biệt (không giới hạn): bitmap decoding, networking requests, database access, file I/O,... 
    ### `"All AsyncTask tasks are executed on the same single thread."`
    
- Một ví dụ về luồng đơn giản, có lẽ các developers đã quá quen với **AsyncTask**. Nó là một class cho phép ứng dụng xử lý các tác vụ trên một luồng khác và trả kết qủa về Ui thread mà không cần sử dụng đến Thread hay Handler. Thật tuyệt vời phải không, nhưng có một vấn đề là: Toàn bộ các công việc được triển khai với AsyncTask đều được thực hiện trên 1 luồng duy nhất. Trước Android 3.1 Google triển khai AsyncTask với một `pool of threads` cho phép thực hiện nhiều tác vụ song song. Tuy nhiên điều này gây thêm quá nhiều vấn đề cho các developers, Google đã thay đổi như hiện nay. 

- Điều này có nghĩa là gì, khi bạn bắt đầu 2 hoặc 3 công việc cho AsyncTask cùng một lúc thì chúng sẽ thực hiệnt tuần tự. Công việc đầu tiên thực hiện trong khi công việc 2, 3 phải chờ. 1 xong thì 2 tiếp tục và cứ như thế :)

- Và giải pháp ở đây là sử dụng **[Pool of worker threads](https://developer.android.com/training/multiple-threads/)** để chỉ định những luồng nào sẽ chiiuj trách nhiệm với những tác vụ nào. Để thiết lập cho các worker threads, bạn có thể tham khảo bài viết này của Google **[Processes and Threads documentation.](https://developer.android.com/guide/components/processes-and-threads)**

# Wrap-up
- Dĩ nhiên, còn rất nhiều những bài toán về hiệu năng khác mà chúng ta gặp phải, để giúp ứng dụng của bạn có một hiệu năng tốt nhất và không tốn quá nhiều tài nguyên chúng ta phải không ngừng trau dồi thêm kinh nghiệm và học hỏi. **[Android Performance Patterns](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9CBxr3BVjPTPoDPLdPIFCE)** - đây là một series rất hay tập hợp các videos giúp bạn viết một ứng dụng Android nhanh hơn, hiệu quả hơn mà mình tham khảo được.

- Nếu có bất kì góp ý nào mong nhận được sự đóng góp của bạn ở mục comment phía dưới. Cảm ơn bạn đã đọc bài viết của mình! Dưới đây là các tài liệu mình đã tham khảo:
    > - [Serialization performance (Android Performance Patterns Season 4 ep14)](https://www.youtube.com/watch?v=IwxIIUypnTE)
    > - [Parcelable vs Serializable
](http://www.developerphil.com/parcelable-vs-serializable/)
    > - [Is using Serializable in Android bad?](https://stackoverflow.com/questions/3611843/is-using-serializable-in-android-bad)
    > - [Parcelable & Serializable trong Android](https://viblo.asia/p/parcelable-serializable-trong-android-KE7bGonKM5e2)
    > - [Top Android performance problems faced by app developers](https://www.androidauthority.com/top-android-performance-problems-666234/)