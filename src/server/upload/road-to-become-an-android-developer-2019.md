# Giới thiệu
Là một lập trình viên Android, công việc của bạn là phát triển ứng dụng Android. Để phát triển ứng dụng mobile nền tảng hệ điều hành Android, việc đầu tiên của bạn là phải học lập trình Android. Để làm được điều đó, bạn cần biết kiến thức cơ bản về ngôn ngữ Java hoặc mới đây là Kotlin. 
![](https://images.viblo.asia/7798a8e4-cfb9-403b-9697-42455fffe40c.png)
# Ok, bắt đầu nào
Đầu tiên bạn cần nắm rõ những kiến thức cơ bản của lập trình hướng đối tượng [Java](https://docs.oracle.com/javase/6/docs/api/) như: 4 tính chất OOP (tính đóng gói, tính kế thừa, tính trừu tượng, tính đa hình), các khái niệm về collections và generics type, bộ nhớ stack và heap... 

Sau khi nắm được cơ bản về Java, việc tiếp theo là học Android.

Hiểu về [Activity](https://developer.android.com/reference/android/app/Activity) cũng như việc nắm vững về vòng đời của nó là rất quan trọng khi xây dựng ứng dụng. Activity là thành phần cung cấp màn hình hiển thị UI ứng dụng và nhận các tương tác của người dùng

Hiểu và nắm rõ về [Fragment](https://developer.android.com/reference/android/app/Fragment) và vòng đời của nó. Fragment là một thành phần độc lập, được sử dụng bởi activity như là một sub-activity và có vòng đời giao diện riêng. Mục đích chính của việc ra đời của Fragment là hỗ trợ cho việc xây dựng ứng dụng với giao diện linh hoạt trên màn hình kích cỡ lớn như tablet.

Học cách [debug](https://developer.android.com/studio/debug/) ứng dụng của bạn là kỹ năng quan trọng trong việc phát triển ứng dụng Android. Android Studio cung cấp debugger cho phép bạn thực hiện việc debug. 

Hiểu về navigation, [task và back stack](https://developer.android.com/guide/components/activities/tasks-and-back-stack). Android Activities xây dựng các màn hình cho phép bạn điều hướng giữa chúng và mang lại trải nghiệm tốt cho người dùng. Task là tập hợp các activity cho phép người dùng tương tác khi thực thi một công việc nào đó, các activity này được sắp xếp trong 1 stack được gọi là back stack theo thứ tự activity được open. Khi người dùng nhấn Back, activity finish và được pop vào stack. Cần đọc thêm cách Android quản lý các task, các giá trị launchMode và các giá trị flag.

Nắm rõ Context trong ứng dụng Android, để phát triển ứng dụng Android , bạn cần phải biết context là gì? Context hầu hết được sử dụng trong ứng dụng Android và là thành phần quan trọng trong Android nắm giữ thông tin môi trường ứng dụng cho phép truy cập các resource hệ thống như: activity, broadcast, intent..., nên phải hiểu để sử dụng một cách đúng đắn.

Hiểu về Processes và [thread](https://developer.android.com/reference/java/lang/Thread). Khi một thành phần ứng dụng khởi động, hệ thống Android sẽ khởi động một quy trình Linux mới cho ứng dụng với 1 luồng thực thi duy nhất.  Mặc định các thành thành phần trong cùng 1 ứng dụng được chạy trong 1 process và thread gọi là main thread. Java Virtual Machine cho phép 1 ứng dụng có nhiều thread thực thi. Bên cạnh main thread còn có worker thread để thực hiện các công việc trong background nữa. Bạn phải hiểu việc thực thi đa luồng trong ứng dụng cũng như ThreadPools và cách để tránh mắc lỗi Android Not Responding khi giao diện bị block quá 5s

Hãy nhớ học [asynctask](https://developer.android.com/reference/android/os/AsyncTask) để xử lý đa luồng trong project của bạn, Asynctask có nhiệm vụ thực thi các tác vụ ở background và publish kết quả lên giao diện mà không cần sự trợ giúp của Thread hay Handler. 

Biết các view và layout để phục vụ cho việc thiết kế UI ứng dụng với các thành phần có sẵn, hoặc học cách [Custom View](https://developer.android.com/guide/topics/ui/custom-components) để phát triển ứng dụng Android theo cách của chính bạn. Và có thể học material design để áp dụng theo chuẩn thiết kế để thiết kế ứng dụng awesome hơn nhé :grinning:

Hiểu biết về các [permission](https://developer.android.com/guide/topics/permissions/overview) trong Android để bảo vệ quyền riêng tư của người dùng và có thể cấp quyền truy cập đúng đắn

Học [xử lý thay đổi cấu hình](https://developer.android.com/guide/topics/resources/runtime-changes). Cấu hình thiết bị có thể thay đổi khi chạy chương trình ví dụ như xoay màn hình, hiện bàn phím hoặc khi người dùng kích hoạt chế độ đa màn hình. Bạn phải xử lý những thay đổi đó.

Học thêm về cách quản lý dữ liệu và file trong Android, các cách lưu trữ dữ liệu và SQL. Android cung cấp hệ quản trị [SQLite](https://developer.android.com/training/data-storage/sqlite) giúp bạn lưu trữ dữ liệu trên thiết bị. Bên cạnh đó, bạn cũng có thể sử dụng [RoomDatabase](https://developer.android.com/reference/android/arch/persistence/room/RoomDatabase)  để thực hiện việc này với những cách thức hỗ trợ mới giúp dễ dàng tiếp cận với dữ liệu. Sử dụng SharedPreference cung cấp cách thức truy vấn và lưu trữ dữ liệu dưới dạng key-value.

Học [Content providers](https://developer.android.com/guide/topics/providers/content-providers). Chúng được dùng để chia sẻ dữ liệu giữa các ứng dụng. Content provider cung cấp cơ chế cho việc định nghĩa an toàn dữ liệu và đóng gói dữ liệu.

[BroadcastReceiver](https://developer.android.com/guide/components/broadcasts) là nơi bạn có thể đăng ký sự kiện của hệ thống hay ứng dụng. Bạn sẽ nhận được thông báo về các sự kiện khi đã đăng ký. Ví dụ như khi mức pin của điện thoại xuống quá thấp, khi thay đổi trạng thái mạng, khi bật chế độ airplane, hệ thống sẽ báo cho bạn biết chẳng hạn.

Hiểu về các kiến thức [Looper](https://developer.android.com/reference/android/os/Looper), [Handler](https://developer.android.com/training/multiple-threads/communicate-ui) và HandlerThread để giải quyết các vấn đề lập trình không đồng bộ và xử lý việc giao tiếp giữa các thread với nhau.

Học [Service và IntentService](https://developer.android.com/reference/android/app/Service). Service là 1 thành phần được sử dụng để thực thi các hoạt động trong background như play nhạc, xử lý network transaction, tương tác content providers,...và nó không có giao diện người dùng. Đi kèm với service có thể là Notification nữa, nó dùng để thông báo cho người dùng trạng thái ứng dụng khi đang ở background.

Học thêm về các công cụ đo dữ liệu sử dụng, dữ liệu CPU…

Hiểu, nắm rõ các thư viện bên thứ 3 và áp dụng vào ứng dụng để dễ dàng sử dụng và phát triển.

Học các design pattern trong Android để nâng cao hiệu suất ứng dụng.

Học về Garbage Collector để đạt được hiệu suất cao trong Android. GC là nơi quản lý bộ nhớ, giống như máy ảo ART và Dalvik theo dõi bộ nhớ được cấp phát. Một khi xác định 1 phần bộ nhớ không được sử dụng bởi chương trình, nó sẽ giải phóng tài nguyên được cấp phát mà không cần sự can thiệp của lập trình viên.

Học  Android Architecture Components, [Android Jetpack](https://developer.android.com/jetpack/). Google phát hành Android Jetpack để đẩy nhanh quá trình xây dựng ứng dụng và xây dựng những ứng dụng chất lượng, thuận tiện nhất. Nó là phiên bản tiếp theo của Android Component mang lại nhiều lớp ích với các các thư viện hỗ trợ. Android Jetpack bao gồm foundation, architecture, behavior, ui giúp quản lý activities: background tasks, navigation, quản lý vòng đời,... khiến bạn tránh được các mã code boilerplate và làm nên ứng dụng tuyệt vời. Android Jetpack cũng được thiết kế để làm việc tốt với Kotlin. Những [Component](https://developer.android.com/topic/libraries/architecture) có thể kể đến như: LiveData, ViewModel, Data Binding, Paging, WorkManager. Bên cạnh đó việc sử dụng Navigation trong dự án cũng là một điểm cộng. 

Học cách viết [tests](https://developer.android.com/studio/test/). Bằng việc test, bạn có thể xác định các hành vi, chức năng ứng dụng một cách chính xác trước khi ứng dụng được release. 

Hãy tìm hiểu về [Retrofit](https://square.github.io/retrofit/) - A type-safe HTTP client for Android and Java. Retrofit giúp dễ dàng kết nối đến một dịch vụ REST trên web bằng cách chyển đổi API thành Java Interface

Học [RxJava, RxAndroid](http://reactivex.io/) cho việc lập trình các luồng không đồng bộ với việc sử dụng các luồng có thể quan sát được.

Học Dependency Injection, [Dagger](https://google.github.io/dagger/) . Dependency Injection là một concept cho các ngôn ngữ lập trình dựa trên khái niệm Inversion of Control mà theo đó, một lớp không nên cấu hình các phụ thuộc của nó mà nên được cấu hình từ bên ngoài. Dagger là dependency injection framework dựa trên Java Specification Request sử dụng việc tạo mã và dựa trên các chú thích. Nếu làm việc với Kotlin, Mình suggest bạn nên tìm hiểu về Koin, đây cũng là 1 Dependency Injection tương tự  như Dagger phía trên. 

Học các mô hình phát triển ứng dụng như MVP, MVVM để dễ dàng follow, development và maintain

Học cách ứng dụng các biện pháp [bảo mật](https://developer.android.com/topic/security/best-practices) vào việc xây dựng ứng dụng an toàn duy trì sự tin cậy người dùng và tính toàn vẹn của thiết bị.

Hiểu về các công cụ bổ trợ cho việc học Android như [Git](https://git-scm.com/). Git là 1 hệ thống kiểm soát phiên bản giúp ích cho việc tracking sử thay đổi các file trong máy tính và có thể trao đổi công việc với mọi người làm cùng dự án. 

Tìm hiểu về việc optimize ứng dụng để có performance tốt nhất. Nắm về việc memory leak để biết cách tránh nó khi phát triển ứng dụng. Nắm về Bitmap, nó sử dụng lượng memory và dẫn đến OOM nhanh. Image là nguyên nhân chính dẫn đến việc sử dụng lượng lớn memory. Học cách sử dụng [proguard](https://developer.android.com/studio/build/shrink-code) trong ứng dụng Android. Đó là công cụ được sử dụng để giảm thiểu lượng code, tối ưu code từ đó giảm thiểu kích cỡ ứng dụng.

Học thêm Continuous Integration. Continuous Integration là một thực hành của việc liên tục tích hợp những thay đổi tạo ra với project và test lại nó hàng ngày hoặc thường xuyên hơn.

Luôn theo dõi các công nghệ mới, so sánh với các công nghệ cũ để rút ra kinh nghiệm cho việc phát triển ứng dụng thuận tiện qua việc tham khảo trên các diễn đàn, trang chủ của các nhà phát triển ứng dụng.
# Kết luận
Bài viết chỉ mang tính chất tham khảo dựa trên kinh nghiệm bản thân nên có thể có phần khác với quãng đường mà bạn đang đi, nhưng tựu chung là cùng học tập kiến thức từ nguồn [google developer](https://developer.android.com) và các kiến thức làm việc trong dự án mà bản thân đúc kết lại để phát triển ứng dụng

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake: