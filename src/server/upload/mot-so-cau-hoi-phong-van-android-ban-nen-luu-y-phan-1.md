Sau đây là một số câu hỏi thường gặp khi đi phỏng vấn về vị trí lập trình Android mà mình tổng hợp lại được. Trước khi bước vào buổi phỏng vấn hãy review lại một lần nhé, biết đâu lại gặp phải "câu tủ". Mình sẽ bỏ qua một số câu hỏi định nghĩa cơ bản như `activity` là gì, hay liệt kê vòng đời của `activity` và `fragment`, ... mà tập trung vào các câu hỏi thường bị bỏ qua. Các câu trả lời sẽ tập trung vào các ý chính một cách vắn tắt, bạn có thể tìm hiểu chi tiết hơn sử dụng các từ khóa chính trong câu hỏi. Các bạn có thể theo dõi phần tiếp theo tại [đây](https://viblo.asia/p/mot-so-cau-hoi-phong-van-android-ban-nen-luu-y-phan-2-L4x5xkyglBM).
### 1. Application là gì?
Lớp **Application** trong Android là lớp cơ sở trong ứng dụng Android chứa tất cả các `component` khác như `activity` và `service`. Lớp `Application` hoặc bất kỳ lớp con nào của lớp nó sẽ được khởi tạo trước bất kỳ lớp nào khác khi `process` cho ứng dụng của bạn được khởi tạo.
### 2. Context là gì?
Một **Context** là một đối tượng để phục vụ các xử lý liên quan tới hệ thống hay cung cấp thông tin của môi trường hệ thống. Nó cung cấp các dịch vụ như để giải quyết `resources`, lấy quyền truy cập vào cơ sở dữ liệu và `preferences`, ... `Context` có thể được coi là thành phần xử lý về môi trường mà ứng dụng của bạn đang hoạt động trong đó.
**Application Context:** là một `context` gắn liền với vòng đời của một ứng dụng. `Application context` có thể được sử dụng khi bạn cần một `context` có vòng đời riêng biệt với `context` hiện tại hoặc khi bạn truyền một `context` ra ngoài phạm vi hoạt động của một `activity`.
**Activity Context:** `context` này là có sẵn ở trong một `activity`, nó gắn liền với vòng đời của `activity` này. Bạn nên sử dụng  loại `context` này khi phạm vi hoạt động bạn cần chỉ ở trong `activity` này hay bạn cần một `context` có vòng đời gắn liền với `context` hiện tại.
### 3. Tại sao bytecode không thể chạy được trong Android?
Bởi vì Android sử dụng **DVM - Dalvik Virtual Machine** (từ các phiên bản trước `Lollipop`) và **ART - Android Runtime** (chính thức từ phiên bản `Lollipop` trở lên, tuy nhiên nó đã được thông báo và cho dùng thử nghiệm từ phiên bản `Kitkat`) để thực thi chương trình chứ không sử dụng `JVM (Java Virtual Machine)`.
### 4. BuildType ở trong Gradle là gì? Nó được sử dụng với mục đích gì?
Các loại `build` định nghĩa những thuộc tính mà `Gradle` sử dụng khi xây dựng và đóng gói một ứng dụng Android. 
* `Build type` xác định cách một module được xây dựng, ví dụ như có sử dụng ProGuard hay không, ...
* `Product flavor` xác định những gì sẽ được tạo ra, ví dụ như tài nguyên nào được bao gồm trong bản build.
* `Gradle` tạo ra một `build variant` cho mọi tổ hợp có thể có từ `product flavor` và `build type` trong dự án của bạn.
### 5. Quá trình build một ứng dụng trong Android.
![](https://images.viblo.asia/f3c64a9c-1049-4bd4-ad50-cba2b5cdcb81.png)
### 6. Ở trong activity, khi nào thì onDestroy() được gọi mà không có onPause() và onStop()?
Khi `finish()` được gọi ở trong phương thức `onCreate()` của activity đó, hệ thống sẽ gọi trực tiếp `onDestroy()`.
### 7. Tại sao chỉ nên gọi setContentView() trong onCreate() ở trong một activity?
Vì `onCreate()` chỉ được gọi tới một lần nên đây là thời điểm chúng ta nên khởi tạo hầu hết các yếu tố cần thiết. Nó sẽ không hiệu quả nếu ta gọi `setContentView()` ở trong `onResume()` hay `onStart()` (bởi chúng được gọi tới nhiều lần) vì `setContentView()` là một hoạt động tiêu tốn khá nhiều tài nguyên.
### 8. Phân biệt Service, Intent Service, AsyncTask và Thread.
* **Service** là một thành phần được sử dụng để thực hiện các tác vụ ở background ví dụ như chơi nhạc. Nó không có giao diện người dùng (`user interface`). Service có thể chạy ở trong background vô thời hạn ngay cả khi ứng dụng bị hủy.
* **AsyncTask** cho phép bạn thực hiện các công việc bất đồng bộ ở `background thread` và publish kết quả lên trên `UI thread` mà không yêu cầu bạn phải xử lý cách các thread hay handler hoạt động.
* **IntentService** là một loại `Service` để xử lý lần lượt các yêu cầu bất đồng bộ (thông qua `Intent`) ở `background thread`. `Client` sẽ gửi yêu cầu thông qua việc gọi tới `startService(Intent)` và nó cũng không yêu cầu bạn phải "động tay động chân" tới việc xử lý thread / handler.
* Một **Thread** là một luồng thực thi tuần tự trong một chương trình. `Thread` có thể được coi là một `mini-process` chạy ở trong `main process`.
### 9. Job Scheduling là gì?
**Job Scheduling API**, như tên gọi của nó, cho phép chúng ta lên lịch công việc trong khi hệ thống sẽ thực hiện công việc tối ưu hóa dựa trên bộ nhớ, nguồn và trạng thái kết nối. `JobScheduler` hỗ trợ lập lịch biểu các công việc. Hệ thống Android có thể kết hợp các công việc này để giảm lượng tiêu thụ pin. `JobManager` giúp việc xử lý upload dễ dàng hơn vì nó tự động xử lý các trạng thái kết nối của mạng. Nó cũng sẽ sống sót kể cả khi ứng dụng bị khởi động lại. Một số tình huống hữu ích:
* Các tác vụ cần được thực hiện khi thiết bị được kết nối với nguồn điện.
* Các tác vụ yêu cầu truy cập mạng hoặc kết nối Wi-Fi.
* Các tác vụ không quan trọng hay không được người dụng chú ý đến.
* Các tác vụ cần được chạy thường xuyên dưới dạng hàng loạt trong đó yếu tố thời gian không quá quan trọng.
### 10. Mối quan hệ giữa vòng đời của AsyncTask và Activity? Những vấn đề gì có thể xảy ra khi sử dụng chúng chung với nhau? Giải quyết những vấn đề đó thế nào?
`AsyncTask` không được gắn với vòng đời của `Activity` chứa nó. Ví dụ, nếu bạn khởi động `AsyncTask` bên trong một `Activity` và khi người dùng quay thiết bị, `Activity` sẽ bị hủy (và một instance mới của `Activity` sẽ được tạo) nhưng `AsyncTask` sẽ không bị hủy mà thay vào đó sẽ tiếp tục chạy cho đến khi nó hoàn thành.
<br><br>
Sau đó, khi AsyncTask hoàn thành, thay vì cập nhật giao diện người dùng của `Activity` mới, nó sẽ cập nhật phiên bản `Activity` trước đó (`Activity` đã bị hủy). Điều này có thể dẫn đến một `Exception`: `java.lang.IllegalArgumentException`.
<br><br>
Ngoài ra còn có khả năng dẫn đến rò rỉ bộ nhớ (`memory leak`) vì AsyncTask duy trì một tham chiếu đến `Activity` cũ, ngăn cản `Activity` này bị thu gom rác của Java thu thập khi vẫn còn hoạt động.
<br><br>
Vì những lý do này, việc sử dụng `AsyncTask` cho các tác vụ nền chạy dài thường là một ý tưởng tồi. Thay vào đó đối với các tác vụ nền chạy dài, bạn nên sử dụng một cơ chế khác (chẳng hạn như `service`).
### 11. Phương thức onTrimMemory() là gì?
**onTrimMemory ()**: Được gọi khi hệ điều hành xác định rằng đây là thời điểm tốt để xử lý bộ nhớ không cần thiết từ một tiến trình của nó. Ví dụ điều này sẽ xảy ra khi tiến trình chạy ở chế độ nền và không đủ bộ nhớ để duy trì được nhiều tiến trình nền như mong muốn, khi đó hệ thống sẽ dựa trên độ ưu tiên của tiến trình để `kill` bớt cho tới khi bộ nhớ đã ổn định.
Hệ thống Android có thể lấy lại bộ nhớ cấp phát cho ứng dụng của bạn theo nhiều cách hoặc `kill` ứng dụng của bạn nếu cần  thiết để giải phóng bộ nhớ cho các tác vụ quan trọng. Để giúp cân bằng bộ nhớ của hệ thống và tránh việc hệ thống hủy tiến trình của ứng dụng, bạn có thể `implement` interface `ComponentCallbacks2` ở trong các lớp `Activity` của mình. Phương thức `callback` onTrimMemory () được cung cấp cho phép ứng dụng của bạn lắng nghe các sự kiện liên quan đến bộ nhớ khi ứng dụng của bạn ở `foreground` hoặc `background` từ đó bạn có thể xử lý khi hệ thống cần thu hồi lại bộ nhớ từ ứng dụng của bạn.
### 12. Android Interface Definition Language (AIDL) và Messenger Queue.
* **Messenger Queue** tạo cho ta một hàng đợi và các dữ liệu / thông điệp được truyền giữa 2 hoặc nhiều hơn các tiến trình một cách tuần tự. Trong trường hợp của `AIDL` thì các thông điệp được truyền đi một cách song song.
* **AIDL** sử dụng dành cho mục đích khi bạn phải giao tiếp ở mức ứng dụng để chia sẻ và kiểm soát dữ liệu. Ví dụ: một ứng dụng yêu cầu danh sách tất cả các liên hệ từ ứng dụng Danh bạ và nó cũng muốn hiển thị thời lượng cuộc gọi và bạn có thể ngắt kết nối nó khỏi ứng dụng đó.
* Đối với trương hợp của `Messenger Queue`, bạn sẽ chủ yếu làm việc trên nhiều `thread` và `process` để quản lý hàng đợi chứa các thông điệp để không xuất hiện sự can thiệp của các dịch vụ bên ngoài tại đây.
### 13. ThreadPool là gì? Có hiệu quả hơn nếu sử dụng nó thay vì sử dụng nhiều Thread riêng biệt.
Việc tạo và hủy các `Thread` có mức sử dụng CPU cao, vì vậy khi chúng ta cần thực hiện rất nhiều tác vụ đơn giản, nhỏ, chi phí để tạo các `Thread` riêng rẽ có thể chiếm một phần đáng kể chu kỳ CPU và ảnh hưởng nghiêm trọng đến thời gian đáp ứng cuối cùng. `ThreadPool` bao gồm một hàng đợi nhiệm vụ và một nhóm các `worker thread`, cho phép nó chạy nhiều instance một cách song song của một tác vụ.
### 14. Sự khác biệt giữa Serializable và Parcelable?
`Serialization` là quá trình chuyển đổi một đối tượng thành một luồng (`stream`) byte để lưu trữ một đối tượng vào bộ nhớ, để nó có thể được tái tạo sau này khi cần, trong khi vẫn giữ trạng thái và dữ liệu ban đầu của đối tượng.
`Serializable` là một `standard Java interface`. `Parcelable` là một interface cụ thể của Android, bạn phải tự triển khai việc `serialization`. Tuy nhiên `Parcelable` có hiệu quả hơn nhiều so với `Serializable` (vấn đề với cách tiếp cận sử dụng `Serializable` là nó sự dụng cơ chế `reflection` và đó là một quá trình tương đối chậm. Cơ chế này cũng có xu hướng tạo ra rất nhiều đối tượng tạm thời và gây tiêu tốn tài nguyên khi bộ `Garbage collection` phải thu thập tất cả chúng).
### 15. Bạn sẽ cập nhật UI trên activity từ một background service như thế nào?
Ta cần phải đăng ký một `LocalBroadcastReceiver` trong `activity` đó. Và gửi một `broadcast` với dữ liệu chứa trong `intent` từ `background service` này. Miễn là `activity` còn hoạt động ở trên `foreground`, giao diện người dùng sẽ được cập nhật. Lưu ý bạn nên nhớ hủy đăng ký `broadcast receiver` ở trong phương thức `Stop()`của `activity` để tránh bị `memory leak`. Ta cũng có thể sử dụng một Handler để truyền dữ liệu thông qua nó.
### 16. Sự khác biệt giữa việc add / replace fragment trong backstack?
* **replace** loại bỏ `fragment` hiện có và thêm một `fragment` mới vào. Điều này có nghĩa là khi bạn nhấn nút quay lại, `fragment` đã được thay thế sẽ được khởi tạo lại với `onCreateView` của nó được gọi.
* **add** giữ lại các `fragment` hiện có và thêm một `fragment` mới đè lên chúng, có nghĩa là `fragment` hiện có sẽ hoạt động và những `fragment` ở dưới sẽ không rơi vào trạng thái `paused`. Do đó khi nút back được nhấn `onCreateView` không được gọi cho những `fragment` này.
### 17. Tại sao ta nên truyền các tham số vào Fragment thông qua Bundle?
Lý do tại sao bạn nên chuyển các tham số thông qua **bundle** là vì khi hệ thống khôi phục một `fragment` (ví dụ: người dùng thay đổi cấu hình), nó sẽ tự động khôi phục `bundle` của bạn. Bằng cách này, bạn đảm bảo được rằng trạng thái của `fragment` sẽ được khôi phục một cách chính xác về đúng trạng thái của `fragment` đó khi được khởi tạo.
### 18. Retained fragment là gì?
Mặc định, `Fragment` sẽ bị hủy và được tạo lại cùng với `parent Activity` của chúng khi thay đổi cấu hình xảy ra. Lời gọi tới phương thức `setRetainInstance(true)` cho phép chúng ta bỏ qua chu trình "hủy-và-tái tạo" này; báo hiệu cho hệ thống rằng bạn muốn giữ lại `instance` hiện tại của `fragment` khi `activity` được tạo lại, đó chính là `retainted fragment`.
### 19. Sự khác nhau giữa FragmentPagerAdapter và FragmentStatePagerAdapter?
* **FragmentPagerAdapter**: `fragment` của mỗi trang mà người dùng truy cập sẽ được lưu trữ trong bộ nhớ, mặc dù `view` của nó sẽ bị hủy. Vì vậy, khi trang được hiển thị lại, chỉ `view` được tạo lại còn `instance` của `fragment` không được tạo lại. Điều này có thể dẫn đến việc một lượng bộ nhớ đáng kể được sử dụng cho công việc này. `FragmentPagerAdapter` chỉ nên được sử dụng khi chúng ta cần lưu toàn bộ `fragment` trong bộ nhớ. `FragmentPagerAdapter` gọi `detach(Fragment)` trong `transaction` thay vì `remove(Fragment)`.
* **FragmentStatePagerAdapter**: `instance` của `fragment` sẽ bị phá hủy khi nó không còn hiển thị cho người dùng nữa, ngoại trừ `saved state` của nó. Điều này dẫn đến việc chỉ sử dụng một lượng nhỏ bộ nhớ và có thể hữu ích để xử lý các tập dữ liệu lớn hơn. Nên được sử dụng khi chúng ta phải sử dụng các `fragment` động. Nó sẽ không ảnh hưởng đến hiệu suất ngay cả khi có số lượng `fragment` là rất lớn.
### 20. Sự khác nhau giữa margin & padding.
**Padding** là khoảng không gian được thêm vào bên trong container (ví dụ, nếu nó là một `button`, `padding` sẽ được thêm vào bên trong `button` đó. Còn **margin** sẽ được thêm vào không gian bên ngoài của container.

### 21. View Group là gì? Nó khác View như thế nào?
* **View:** các đối tượng `View` là các khối giao diện cơ bản `User Interface` (UI) trong Android. `View` là một hộp hình chữ nhật đơn giản, nó có thể phản hồi hành động của người dùng lên nó. Ví dụ: `EditText`, `Button`, `CheckBox`, ... `View` tham chiếu đến lớp `android.view.View`, là lớp cơ sở của tất cả các lớp UI.
* **ViewGroup**: `ViewGroup` là một `container` vô hình. Nó có thể chứa các `View` và `ViewGroup`. Ví dụ, `LinearLayout` là một `ViewGroup` có thể chứa `Button` (View) và các Layouts khác. `ViewGroup` là lớp cơ sở cho `Layout`.
### 22. Sự khác nhau giữa hình ảnh .png thông thường và hình ảnh nine-patch là gì?
**Nine-patch** là một trong những tài nguyên `bitmap` có thể thay đổi được kích thước, chúng được sử dụng làm hình nền hoặc các hình ảnh khác trên thiết bị. Lớp `NinePatch` cho phép vẽ một `bitmap` trong chín bộ phận (section). Bốn góc (corner) không `scale` được; phần ở giữa của hình ảnh có thể được `scale` theo cả hai trục, bốn cạnh được `scale` trên một trục.
### 23. Khi nào thì bạn nên sử dụng FrameLayout?
**FrameLayout** được thiết kế để chứa một item duy nhất, làm cho chúng trở thành lựa chọn hiệu quả khi bạn cần hiển thị một `View` duy nhất.
Nếu bạn thêm nhiều `View` vào `FrameLayout` thì chúng sẽ xếp chồng lên nhau (cái sau đè lên cái trước), vì vậy `FrameLayout` cũng hữu ích trong trường hợp nếu bạn cần các `View` xếp chồng chéo.
### 24. Adapter là gì?
Một **Adapter** chịu trách nhiệm chuyển đổi từng `data entry` vào `View`, sau đó có thể được thêm vào `AdapterView` (ListView / RecyclerView) để hiển thị.
### 25. Tóm tắt quá trình tạo một custom View.
* Tạo một lớp là `Subclass` của một `View`.
* Tạo một file `res/value/attrs.xml` và định nghĩa các thuộc tính bạn muốn sử dụng với custom `View` đó.
* Trong lớp này, tạo một `constructor`, khởi tạo các đối tượng `Paint` và lấy các thuộc tính ở trên.
* Ghi đè `onSizeChanged()` hoặc `onMeasure()`.
* Vẽ `View` của bạn bằng cách ghi đè `onDraw()`.
### 26. Mô tả ngắn gọn một số cách để tối ưu hóa View usage.
* Kiểm tra những quá trình `draw` tiêu tốn nhiều tài nguyên (excessive overdraw): cài đặt ứng dụng của bạn trên thiết bị Android và sau đó bật tùy chọn `Debug GPU Overview`.
* Làm phẳng `view hierarchy`: kiểm tra hệ thống phân cấp `view` của bạn bằng công cụ `Hierarchy Viewer` của Android Studio (nên sử dụng `ConstraintLayout` nhiều nhất có thể để đảm bảo layout của bạn luôn chỉ có một tầng duy nhất).
* Ước lượng thời gian mỗi `View` cần để hoàn thành quá trình `measure`, `layout` và các giai đoạn `draw`. Bạn cũng có thể sử dụng `Hierarchy Viewer` để xác định bất kỳ phần nào của `rendering pipeline` mà bạn cần tối ưu hóa.
### 27. Bitmap pooling trong Android?
**Bitmap pooling** là một kỹ thuật đơn giản nhằm mục đích sử dụng lại `bitmap` thay vì tạo các đối tượng bitmap mới mỗi lần cần. Khi bạn cần một bitmap, bạn sẽ kiểm tra một `bitmap stack` để xem có bất kỳ bitmap nào có sẵn hay không. Nếu không có bitmap có sẵn, bạn tạo một bitmap mới, ngược lại bạn `pop` một bitmap từ `stack` và sử dụng lại nó. Sau đó, khi bạn hoàn thành công việc với bitmap này, bạn có thể đặt nó lại lên một `stack`.
### 28. Sự khác biệt giữa commit() và apply() trong SharedPreferences là gì?
**commit ()** ghi dữ liệu một cách đồng bộ và trả về giá trị `boolean` thành công hay thất bại tùy thuộc vào kết quả ngay lập tức.
**apply()** hoạt động một cách bất đồng bộ và nó sẽ không trả về bất kỳ giá trị `boolean` nào. Ngoài ra nếu có `apply()` chưa được hoàn thành và bạn thực hiện một `commit()` khác. `commit()` đó sẽ bị chặn cho đến khi `apply()` được hoàn thành.
Về hiệu năng `apply` nhanh hơn `commit` vì nó xử lý việc lưu trữ dữ liệu một cách bất đồng bộ.
### 29. Làm giảm dung lượng file apk trong Android như thế nào?
* Bật **Proguard** trong project của bạn.
* Bật **shrinkResources**.
* Loại bỏ tất cả các tài nguyên cục bộ không được sử dụng bằng cách thêm tên tài nguyên cần thiết trong **resConfigs**.
* Chuyển đổi tất cả các hình ảnh sang dạng **webp** hoặc **vector drawable**.
### 30. S.O.L.I.D principles trong phát triển phần mềm.
* The **S**ingle Responsibility Principle (SRP)
* The **O**pen-Closed Principle (OCP)
* The **L**iskov Substitution Principle (LSP)
* The **I**nterface Segregation Principle (ISP)
* The **D**ependency Inversion Principle (DIP)
<br><br>

Cảm ơn các bạn đã dành thời gian để đọc đến tận đây, chúc các bạn có một buổi phỏng vấn thành công ^^.
<br><br>
Nguồn: https://android.jlelse.eu/android-interview-questions-cheat-sheet-96ea01c88def