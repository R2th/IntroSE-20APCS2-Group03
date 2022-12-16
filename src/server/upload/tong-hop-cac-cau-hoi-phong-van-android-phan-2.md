### 18. Trình bày hai cách xoá toàn bộ backstack các Activities khi khởi động một Activity mới bằng Intent
* Cách 1. Sử dụng cờ `FLAG_ACTIVITY_CLEAR_TOP`. 
* Cách 2. Sử dụng `FLAG_ACTIVITY_CLEAR_TASK` và `FLAG_ACTIVITY_NEW_TASK` kết hợp với nhau.
### 19. Khác biệt giữa `FLAG_ACTIVITY_CLEAR_TASK` và `FLAG_ACTIVITY_CLEAR_TOP` là gì?
`FLAG_ACTIVITY_CLEAR_TASK` được sử dụng để xóa tất cả các hoạt động khỏi tác vụ bao gồm mọi phiên bản hiện có của lớp được gọi. Activity được khởi chạy theo ý định trở thành gốc mới của danh sách nhiệm vụ trống. Cờ này phải được sử dụng cùng với `FLAG_ ACTIVITY_NEW_TASK`

Mặt khác, `FLAG_ACTIVITY_CLEAR_TOP`, nếu được đặt và nếu một phiên bản cũ của `Acvitity` này tồn tại trong danh sách nhiệm vụ thì tất cả các `activities` khác bị xóa và `activity` cũ đó trở thành gốc của danh sách nhiệm vụ. Nếu không có phiên bản nào của activity đó thì một phiên bản mới của nó sẽ được đặt làm gốc của danh sách tác vụ. Sử dụng `FLAG_ACTIVITY_NEW_TASK` kết hợp là một phương pháp hay, mặc dù không cần thiết.
### 20. Mô tả về [ContentProvider](https://developer.android.com/guide/topics/providers/content-provider-basics)
`Content provider` quản lý quyền truy cập vào kho dữ liệu trung tâm. Nó là một phần của ứng dụng Android, thường cung cấp giao diện người dùng riêng để làm việc với dữ liệu. Tuy nhiên, các `content provider `chủ yếu nhằm mục đích được sử dụng bởi các ứng dụng khác, các ứng dụng này truy cập vào content provider bằng cách sử dụng một đối tượng client cung cấp. Cùng với nhau, nhà cung cấp và khách hàng của nhà cung cấp cung cấp một giao diện tiêu chuẩn, nhất quán cho dữ liệu cũng xử lý giao tiếp giữa các quá trình và truy cập dữ liệu an toàn. 

Thông thường, bạn làm việc với các nhà cung cấp nội dung theo một trong hai tình huống; bạn có thể muốn triển khai mã để truy cập một `content provider` hiện có trong một ứng dụng khác hoặc bạn có thể muốn tạo một `content provider` mới trong ứng dụng của mình để chia sẻ dữ liệu với các ứng dụng khác.

### 21. Truy cập dữ liệu bằng Content Provider
Khi bạn muốn truy cập dữ liệu trong `content provider`, bạn sử dụng đối tượng `ContentResolver` trong Ngữ cảnh của ứng dụng để giao tiếp với nhà cung cấp với tư cách là khách hàng. Đối tượng ContentResolver giao tiếp với đối tượng nhà cung cấp, một thể hiện của lớp triển khai ContentProvider. Đối tượng nhà cung cấp nhận yêu cầu dữ liệu từ máy khách, thực hiện hành động được yêu cầu và trả về kết quả. Đối tượng này có các phương thức gọi các phương thức có tên giống hệt nhau trong đối tượng nhà cung cấp, một phiên bản của một trong các lớp con cụ thể của ContentProvider. Các phương thức ContentResolver cung cấp các chức năng "CRUD" (tạo, truy xuất, cập nhật và xóa) cơ bản của `persistent storage.`
### 22. Trình bày về [Service](https://developer.android.com/reference/android/app/Service)
`Service` là một thành phần ứng dụng đại diện cho mong muốn của ứng dụng để thực hiện một hoạt động chạy lâu hơn trong khi không tương tác với người dùng hoặc cung cấp chức năng cho các ứng dụng khác sử dụng. Mỗi lớp Service phải có một khai báo `<service>` tương ứng trong `AndroidManifest.xml` của gói. Service có thể được khởi động bằng `Context.startService ()` và `Context.bindService ()`. Có ba loại service
* Foreground Service : Thực hiện một số hoạt động mà người dùng dễ nhận thấy. Ví dụ: chúng ta có thể sử dụng để phát một bản âm thanh. Một Thông báo phải được hiển thị cho người dùng.
* Background Serivce : Thực hiện một hoạt động mà người dùng không trực tiếp nhận thấy. Trong Android API cấp 26 trở lên, có những hạn chế đối với việc sử dụng các background service và bạn nên sử dụng [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager) trong những trường hợp này.
* Bound Service: Một service bị ràng buộc khi một thành phần ứng dụng liên kết với nó bằng cách gọi `bindService ()`. Dịch vụ liên kết cung cấp giao diện máy khách-máy chủ cho phép các thành phần tương tác với dịch vụ, gửi yêu cầu, nhận kết quả. Một dịch vụ liên kết chỉ chạy miễn là một thành phần ứng dụng khác được liên kết với nó.

### 23. Khác nhau giữa Service và IntentService
`Service` là lớp cơ sở cho các dịch vụ Android có thể được mở rộng để tạo bất kỳ dịch vụ nào. Một lớp trực tiếp mở rộng từ `Service` chạy trên luồng chính vì vậy nó sẽ chặn giao diện người dùng (nếu có) và do đó chỉ nên được sử dụng cho các tác vụ ngắn hoặc nên sử dụng các `thread` khác cho các tác vụ dài hơn. 

IntentService là một lớp con của Dịch vụ xử lý các yêu cầu không đồng bộ (được biểu thị dưới dạng "Intent") theo yêu cầu. Khách hàng gửi yêu cầu thông qua các cuộc gọi `startService (Intent)`. Dịch vụ được khởi động khi cần thiết, xử lý lần lượt từng `intent` bằng `worker thread `và tự dừng khi hết công việc.
### 24. Khác nhau giữa Async Tasks và Thread
`Thread` được sử dụng để tách các hoạt động đang chạy dài ra khỏi luồng chính để hiệu suất được cải thiện. Nhưng nó không thể bị hủy một cách đơn giản và nó không thể xử lý các thay đổi cấu hình của Android. Bạn không thể cập nhật giao diện người dùng từ Thread.

`AsyncTask` thì giống như một phương tiện giao tiếp giữa thread và UI thread.Nó cho phép bạn thực hiện việc khác ở background thread như gọi một API và cập nhật lại kết quả lên UI thread.

### 25. Khác nhau giữa Service, IntentService, Thread và Async task
Android Service là một thành phần được sử dụng để thực hiện các hoạt động trên nền như phát nhạc. Nó không có bất kỳ giao diện người dùng nào (giao diện người dùng). Dịch vụ có thể chạy ẩn vô thời hạn ngay cả khi ứng dụng bị hủy.

AsyncTask cho phép bạn thực hiện công việc không đồng bộ trên giao diện người dùng của mình. Nó thực hiện các hoạt động chặn trong một thread khác và sau đó xuất bản kết quả trên UI thread, mà không yêu cầu bạn tự xử lý các luồng và / hoặc trình xử lý. 

IntentService là một lớp cơ sở cho các Dịch vụ xử lý các yêu cầu không đồng bộ (được biểu thị dưới dạng Intent) theo yêu cầu. Khách hàng gửi yêu cầu thông qua các cuộc gọi `startService (Intent)`; dịch vụ được khởi động khi cần thiết, xử lý lần lượt từng intent bằng `worker thread` và tự dừng khi hết công việc. 

Thread là một luồng điều khiển tuần tự duy nhất trong một chương trình. Các luồng có thể được coi là các quy trình nhỏ chạy trong một quy trình chính.

### 26. [Handler](https://developer.android.com/reference/android/os/Handler) là gì?
Một Handler cho phép bạn gửi và xử lý các đối tượng Message và Runnable được liên kết với MessageQueue của một luồng. Mỗi cá thể của Handler được liên kết với một luồng duy nhất và hàng đợi thông báo của luồng đó. Khi bạn tạo một Handler mới, nó được liên kết với một Looper. Nó sẽ gửi thông điệp và quyền chạy đến hàng đợi tin nhắn của Looper đó và thực thi chúng trên chuỗi của Looper đó. 

Có hai cách sử dụng chính cho Handler: (1) để lên lịch cho các thông báo và các quyền chạy sẽ được thực thi vào một thời điểm nào đó trong tương lai; và (2) để xếp hàng một hành động sẽ được thực hiện trên một luồng khác với luồng của bạn.

Handler được thực hiện ngoài vòng đời của Activity, vì vậy ta cần thực hiện dọn dẹp một cách cẩn thận, nếu ko sẽ gây ra rò rỉ bộ nhớ(memory leaks).

### 27. [Job Scheduler](https://developer.android.com/reference/android/app/job/JobScheduler) là gì?

Đúng như tên gọi, JobSchedulerr API cho phép lập lịch công việc đồng thời cho phép hệ thống tối ưu hóa dựa trên điều kiện bộ nhớ, nguồn và kết nối. JobScheduler hỗ trợ lập lịch hàng loạt công việc. Hệ thống Android có thể kết hợp các công việc để giảm mức tiêu thụ pin. JobManager giúp việc xử lý tải lên dễ dàng hơn vì nó tự động xử lý tình trạng không đáng tin cậy của mạng. Nó cũng sống sót khi khởi động lại ứng dụng. Một số tình huống:
* Các công việc cần thực hiện sau khi thiết bị được kết nối với nguồn điện 
* Các công việc yêu cầu quyền truy cập mạng hoặc kết nối Wi-Fi. 
* Công việc không quan trọng hoặc người dùng phải không chú ý.
* Các công việc cần được chạy thường xuyên hàng loạt trong đó thời gian không quan trọng.

### 28. Mỗi quan hệ giữa vòng đời của Async Task và Activity? Những vấn đề khi sử dụng và cách giải quyết?

`AsyncTask` không được gắn với vòng đời của Activity chứa nó. Ví dụ, nếu bạn khởi động AsyncTask bên trong một Activity và khi người dùng quay thiết bị, Activity sẽ bị hủy (và một instance mới của Activity sẽ được tạo) nhưng AsyncTask sẽ không bị hủy mà thay vào đó sẽ tiếp tục chạy cho đến khi nó hoàn thành.

Sau đó, khi AsyncTask hoàn thành, thay vì cập nhật giao diện người dùng của Activity mới, nó sẽ cập nhật phiên bản Activity trước đó (Activity đã bị hủy). Điều này có thể dẫn đến một Exception:` java.lang.IllegalArgumentException.`

Ngoài ra còn có khả năng dẫn đến rò rỉ bộ nhớ (memory leak) vì AsyncTask duy trì một tham chiếu đến Activity cũ, ngăn cản Activity này bị thu gom rác của Java thu thập khi vẫn còn hoạt động.

Vì những lý do này, việc sử dụng AsyncTask cho các tác vụ nền chạy dài thường là một ý tưởng tồi. Thay vào đó đối với các tác vụ nền chạy dài, bạn nên sử dụng một cơ chế khác (chẳng hạn như `service`).

### 29. Phương thức onTrimMemory() là gì?
`onTrimMemory ()`: Được gọi khi hệ điều hành xác định rằng đây là thời điểm thích hợp để một tiến trình cắt bớt bộ nhớ không cần thiết khỏi tiến trình của nó. Điều này sẽ xảy ra chẳng hạn khi nó chạy ở chế độ nền và không có đủ bộ nhớ để giữ cho nhiều tiến trình nền chạy như mong muốn.

Android có thể lấy lại bộ nhớ từ ứng dụng của bạn theo một số cách hoặc hủy hoàn toàn ứng dụng của bạn nếu cần để giải phóng bộ nhớ cho các tác vụ quan trọng. Để giúp cân bằng bộ nhớ hệ thống và tránh việc hệ thống phải hủy quy trình ứng dụng của bạn, bạn có thể triển khai giao diện `ComponentCallbacks2` trong các lớp Hoạt động của mình. Phương thức gọi lại onTrimMemory () được cung cấp cho phép ứng dụng của bạn lắng nghe các sự kiện liên quan đến bộ nhớ khi ứng dụng của bạn ở nền trước hoặc nền sau đó giải phóng các đối tượng theo vòng đời ứng dụng hoặc các sự kiện hệ thống cho biết hệ thống cần lấy lại bộ nhớ.

### 30. Android Bound Service
A bound service là một dịch vụ cho phép các thành phần android khác (như hoạt động) liên kết với nó và gửi và nhận dữ liệu. A bound service là một dịch vụ có thể được sử dụng không chỉ bởi các thành phần chạy trong cùng một quy trình với dịch vụ cục bộ, mà các hoạt động và dịch vụ, chạy trong các quy trình khác nhau, có thể liên kết với nó và gửi và nhận dữ liệu.

Khi triển khai một dịch vụ ràng buộc, chúng ta phải mở rộng lớp Service nhưng chúng ta cũng phải ghi đè phương thức `onBind`. Phương thức này trả về một đối tượng triển khai `IBinder`, có thể được sử dụng để tương tác với `service`.

### 31. Android Interface Definition Language (AIDL) và Messenger Queue
* Messenger Queue tạo cho ta một hàng đợi và các dữ liệu / thông điệp được truyền giữa 2 hoặc nhiều hơn các tiến trình một cách tuần tự. Trong trường hợp của AIDL thì các thông điệp được truyền đi một cách song song.
* AIDL sử dụng dành cho mục đích khi bạn phải giao tiếp ở mức ứng dụng để chia sẻ và kiểm soát dữ liệu. Ví dụ: một ứng dụng yêu cầu danh sách tất cả các liên hệ từ ứng dụng Danh bạ và nó cũng muốn hiển thị thời lượng cuộc gọi và bạn có thể ngắt kết nối nó khỏi ứng dụng đó.
* Đối với trương hợp của Messenger Queue, bạn sẽ chủ yếu làm việc trên nhiều thread và process để quản lý hàng đợi chứa các thông điệp để không xuất hiện sự can thiệp của các dịch vụ bên ngoài tại đây.

### 32. ThreadPool là gì? Có hiệu quả hơn nếu sử dụng nó thay vì sử dụng nhiều Thread riêng biệt.
Việc tạo và hủy các Thread có mức sử dụng CPU cao, vì vậy khi chúng ta cần thực hiện rất nhiều tác vụ đơn giản, nhỏ, chi phí để tạo các Thread riêng rẽ có thể chiếm một phần đáng kể chu kỳ CPU và ảnh hưởng nghiêm trọng đến thời gian đáp ứng cuối cùng. ThreadPool bao gồm một hàng đợi nhiệm vụ và một nhóm các worker thread, cho phép nó chạy nhiều instance một cách song song của một tác vụ.

## 33. Sự khác biệt giữa Serializable và Parcelable?
`Serialization` là quá trình chuyển đổi một đối tượng thành một luồng (stream) byte để lưu trữ một đối tượng vào bộ nhớ, để nó có thể được tái tạo sau này khi cần, trong khi vẫn giữ trạng thái và dữ liệu ban đầu của đối tượng. `Serializable` là một `standard Java interface`. `Parcelable` là một interface cụ thể của Android, bạn phải tự triển khai việc `serialization`. Tuy nhiên `Parcelable` có hiệu quả hơn nhiều so với Serializable (vấn đề với cách tiếp cận sử dụng Serializable là nó sự dụng cơ chế reflection và đó là một quá trình tương đối chậm. Cơ chế này cũng có xu hướng tạo ra rất nhiều đối tượng tạm thời và gây tiêu tốn tài nguyên khi bộ Garbage collection phải thu thập tất cả chúng).