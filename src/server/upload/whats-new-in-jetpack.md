# Hilt - Thư viện đề nghị Jetpack bổ sung cho Dependency Injection

Hilt là một thư viện Android mới giúp đơn giản hóa việc Dependency Injection (DI) trong ứng dụng của bạn. Hilt cho phép bạn tập trung vào chỉ các phần quan trọng của việc xác định và tiêm các ràng buộc mà không phải lo lắng về việc quản lý tất cả các thiết lập và nối dây DI.
Được xây dựng dựa trên Dagger, Hilt được hưởng lợi từ tính chính xác về thời gian biên dịch, cải thiện hiệu năng thời gian chạy và khả năng mở rộng. Hilt thêm tích hợp với các thư viện Jetpack và các framework class Android. Ví dụ: để thêm tham số của ViewModel, giờ đây bạn có thể chú thích hàm tạo ViewModel với @ViewModelInject và sau đó chú thích Fragment bằng @AndroidEntryPoint:
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->

class SearchViewModel @ViewModelInject constructor(
    private val repository: SearchRepository
): ViewModel() { … }

@AndroidEntryPoint
class SearchFragment : Fragment() {
    val viewModel: SearchViewModel by viewModels()
}
```

# Paging  3 - tải và hiển thị dữ liệu tăng dần
Paging  là một thư viện giúp bạn tải và hiển thị các khối dữ liệu nhỏ tăng dần. Paging 3 - một bản viết lại hoàn chỉnh của thư viện bằng cách sử dụng các coroutines của Kotlin. Bản phát hành mới này bổ sung các tính năng được yêu cầu cao như dấu phân cách, tiêu đề, chân trang và chuyển đổi danh sách và API để quan sát trạng thái tải danh sách và phương thức để thử lại và làm mới.
Ví dụ, với Paging 3, nguồn dữ liệu có thể được xác định bằng cách mở rộng lớp PagingSource và thực hiện chức năng tạm dừng tải, trong đó bạn có thể gọi trực tiếp các hàm tạm ngưng khác:

```

<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->

class MyPagingSource : PagingSource<Key, Value>() {
    override suspend fun load(params: LoadParams<Key>): LoadResult<Key, Value> {
        try {
            val result = api.requestPage(params.key)
            return Page(
                data = result.items,
                nextKey = result.nextKey
            )
        } catch(error: IOException) {
            return Error(error)
        }
    }
}
```

# App Startup - khởi tạo các thành phần khi khởi động ứng dụng
Thư viện App Startup cung cấp một cách đơn giản, hiệu quả để khởi tạo các thành phần khi khởi động ứng dụng. Thay vì xác định các nhà cung cấp nội dung riêng biệt cho từng thành phần bạn cần khởi tạo, App Startup cho phép bạn xác định các công cụ khởi tạo thành phần có chung một nhà cung cấp nội dung. Điều này có thể cải thiện đáng kể thời gian khởi động ứng dụng.
Ở đây, cách thức khởi động ứng dụng có thể được sử dụng để cải thiện thời gian khởi tạo WorkManager, thư viện sử dụng ContentProvider để sửa chữa, sau khi vô hiệu hóa ContentProvider của WorkManager

```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->

class WorkManagerInitializer : Initializer<WorkManager> {
    override fun create(context: Context): WorkManager {
        val configuration = Configuration.Builder()
            .setMinimumLoggingLevel(Log.DEBUG)
            .build()
        WorkManager.initialize(context, configuration)
        return WorkManager.getInstance(context)
    }
    
    override fun dependencies() : List<Class<out Initializer<*>>> = emptyList()
}
```

# Auto-fill IME tích hợp
Android 11 giới thiệu API nền tảng cho bàn phím để hiển thị các đề xuất tự động điền từ các ứng dụng như trình quản lý mật khẩu. API tự động điền Jetpack cảm ứng giúp bàn phím và dịch vụ tự động điền dễ dàng hơn để tận dụng tính năng mới này thông qua lớp InlineSuggestionUi của nó. Dịch vụ tự động điền có thể sử dụng lớp này để tạo các đề xuất tương thích; bàn phím có thể sử dụng nó để tùy chỉnh phong cách của các đề xuất.

![](https://miro.medium.com/max/300/1*XDi9ae-_RZwhfgLb9P47bQ.png)

# Animations  dễ dàng hơn với core-animation và SeekableAnimatedVectorDrawable

Để làm cho việc triển khai và kiểm tra hoạt ảnh dễ dàng hơn, chúng tôi đã thêm hai thư viện mới: androidx.core: core-animation và androidx.core: core-animation-tests. Chúng tôi cũng đã giới thiệu một API mới SeekableAnimatedVectorDrawable như một phần của thư viện androidx.vectordrawable.
core-animation cung cấp tất cả các tính năng được thêm vào API Animator kể từ Ice Cream Sandwich, chẳng hạn như tạm dừng / tiếp tục và tìm kiếm.
SeekableAnimatedVectorDrawable, dựa trên core-animation, là một thay thế mới, có thể tìm kiếm cho AnimatedVectorDrawable (AVD). Nó sử dụng định dạng tương tự như AVD và thêm khả năng tìm kiếm, tạm dừng và tiếp tục phát lại. AVD có thể tìm kiếm không sử dụng render thread, do đó chỉ nên ưu tiên AVD khi các tính năng bổ sung của lớp mới được yêu cầu.


# Debug database của bạn với Database Inspector trong Android Studio

Vấn đề Debug database của bạn giờ đây dễ dàng hơn trong Android Studio 4.1 Beta với Database Inspector mới. Công cụ này cho phép bạn kiểm tra, truy vấn và sửa đổi cơ sở dữ liệu SQLite trong ứng dụng đang chạy của bạn. Cho dù bạn trực tiếp sử dụng Room hay SQLite, bạn có thể bắt đầu gỡ lỗi cơ sở dữ liệu của mình bằng cách chọn View> Tool Windows> Database Inspector từ thanh menu.


# WindowManager - hỗ trợ tốt hơn cho các yếu tố hình thức thiết bị
Thư viện WindowManager là một bổ sung mới cho Android Jetpack nhằm giúp các nhà phát triển ứng dụng hỗ trợ các yếu tố hình thức mới như có thể gập lại, màn hình có bản lề và hơn thế nữa. Nó cung cấp một bề mặt API chung cho các tính năng WindowManager khác nhau trên cả phiên bản nền tảng cũ và mới.
Bản phát hành ban đầu cung cấp hỗ trợ cho các loại thiết bị có thể gập khác nhau đã có mặt và sắp ra mắt thị trường, để các nhà phát triển ứng dụng có thể nhắm mục tiêu toàn bộ các loại cấu hình phần cứng.

# MotionLayout - xây dựng hình ảnh động và tương tác cho Android
API MotionLayout mở rộng các khả năng phong phú của ConstraintLayout để giúp các nhà phát triển Android quản lý chuyển động phức tạp và widget animation trong ứng dụng của họ. Với MotionLayout, bạn có thể mô hình hóa hoạt hình của mình dưới dạng chuyển tiếp giữa các ràng buộc và dễ dàng tích hợp hoạt ảnh với các View phổ biến như RecyclerView và ViewPager. Android Studio 4.0 cũng bao gồm Motion Editor, một công cụ đồ họa để tạo và xem trước các hình ảnh động sử dụng MotionLayout.
![](https://miro.medium.com/max/600/0*WHn3aAaQMSYs6ag0)

# Navigation
Navigation 2.3 bổ sung hỗ trợ cho dynamic feature modules cho phép bạn tải xuống các phần của ứng dụng khi người dùng cần, giảm đáng kể kích thước tải xuống ban đầu của ứng dụng. Bây giờ, bạn có thể điều hướng đến các mô-đun này như thể chúng là một phần của APK cơ sở. Cùng với việc cho phép các tham số truy vấn, các liên kết sâu hiện hỗ trợ các hành động tùy chỉnh và các loại mime.
Một API mới để trả về một kết quả, cho phép bạn truy vấn bất kỳ back stack entry nào và set the result cho SavingStateHandle của nó. TestNavhostControll mới cho phép bạn truy cập Navigation back stack và đặt đích hiện tại trong test.

# WorkManager
Các bản releases mới nhất của WorkManager, thêm hỗ trợ cho công việc dài hạn hoặc quan trọng cần được hệ điều hành duy trì bằng cách sử dụng foreground services.
Để giúp chẩn đoán sự cố với các tác vụ WorkManager của bạn dễ dàng hơn, chúng tôi đã thêm API chẩn đoán mới cho phép bạn xem lén trạng thái nội bộ của WorkManager và chuyển trạng thái của nó vào logcat:

```
Recently completed work:
Id Class Name Job Id State Unique Name Tags
88e31476–50d5–4a3a-855a-7c158d61543e com.example.DiagnosticsWorker null SUCCEEDED com.example.DiagnosticsWorker
939d3d81–4a24–4920-ab6a-2a5b850f377b com.example.ToastWorker null SUCCEEDED com.example.ToastWorker
59ab8eb1–2645–446d-8811–1e7b887ab5bc com.example.ForegroundWorker null CANCELLED com.example.ForegroundWorker
7a6c23d2-a1f9–4477-af77–1f16b45cd765 com.example.ForegroundWorker 0 SUCCEEDED com.example.ForegroundWorker

Running work:
Id Class Name Job Id State Unique Name Tags
7c8bc01f-a60c-4b63-a6aa-2055d4d9d88e com.example.DiagnosticsWorker 4 RUNNING com.example.DiagnosticsWorker
```

Để giúp bạn tránh các lỗi phổ biến khi sử dụng WorkManager, chúng tôi cũng đã thêm các quy tắc Lint để gắn cờ chúng. Các cập nhật API khác bao gồm: hỗ trợ cài đặt và quan sát tiến trình trung gian cho workers; cải tiến API truy vấn cho worker hiện tại; và cải tiến in-process scheduler trong quá trình được sử dụng để chạy workers của bạn.

# Benchmark

Bản phát hành alpha mới của thư viện Benchmark tích hợp với cấu hình CPU để bạn có thể lập hồ sơ Benchmark của mình và sau đó xem phương pháp hoặc dấu vết được lấy mẫu ngay trong Android Studio. Chúng tôi cũng đã thêm hỗ trợ cho theo dõi phân bổ bộ nhớ, để bạn có thể tối ưu hóa thời gian phân bổ và giảm tải cho garbage collection.

# Permissions
Để làm việc dễ dàng hơn với các quyền, chúng tôi đã giới thiệu API ActivityResult mới. Các API này đơn giản hóa các quyền yêu cầu bằng cách thay thế requestPermissions bằng hợp đồng RequestPermission, nhưng cũng cung cấp các hợp đồng an toàn loại cho các mục đích chung, như chụp ảnh hoặc nhắc người dùng mở tài liệu.
# Game SDK
SDK Android Games, được ra mắt vào đầu năm nay, hiện cũng là một phần của Jetpack và có sẵn trên Google Maven Repository. SDK hiện cung cấp API tạo nhịp độ khung và Trình điều chỉnh hiệu suất Android. Tìm hiểu thêm về SDK trò chơi từ tài liệu chính thức.
# CameraX
Có rất nhiều biến thể trong máy ảnh trên các thiết bị Android; CameraX chạy trên 90% trong số chúng. Kể từ khi CameraX đạt bản beta vào tháng 2 năm ngoái, chúng tôi đã tập trung vào độ tin cậy để đảm bảo hoạt động tốt nhất của API trên một loạt các thiết bị. Phòng thử nghiệm CameraX của chúng tôi chạy bộ thử nghiệm tự động của chúng tôi trên các loại thiết bị đại diện cho hơn 400M thiết bị hoạt động đang sử dụng.
Phiên bản mới nhất của CameraX mang đến những cải tiến cho tiện ích PreviewView. Bây giờ nó xử lý các tương tác với vòng đời ứng dụng của bạn và xem máy nhắn tin một cách đáng tin cậy. Nó cũng được tối ưu hóa để sử dụng trong suốt SurfaceView dưới mui xe trên các thiết bị sẽ được hưởng lợi từ các cải tiến hiệu suất của nó. Điều này dẫn đến ít bộ đệm và hiệu quả năng lượng tốt hơn.
Kiểm tra các tài liệu và mẫu CameraX mở rộng để tìm hiểu thêm về các API.
# Security
Thư viện Bảo mật Jetpack cung cấp các bản tóm tắt mã hóa dựa trên tệp an toàn và dễ sử dụng như EncryptedFile và EncryptedSharedPreferences. Jetpack Security tận dụng kho Android Key Keystore, nơi cung cấp lưu trữ được hỗ trợ bằng phần cứng và hoạt động an toàn. Jetpack Security hiện có tại Release Candidate 2 cho Marshmallow + và 1.1.0 alpha cho hỗ trợ Lollipop +.
Ứng dụng
AppCompat cung cấp backport cho nhiều yếu tố UI và các tính năng nền tảng, từ chủ đề Vật liệu, đến các vật dụng như Thanh công cụ, đến chủ đề tối. Trong các bản phát hành mới nhất, chúng tôi đã thêm các quy tắc Lint cho phép bạn hiểu rõ hơn các thuộc tính nào đến từ AppCompat và thuộc tính nào từ khung công tác và đảm bảo bạn sử dụng đúng quy tắc. Chúng tôi cũng đã cải thiện sự ổn định đáng kể để triển khai chủ đề tối của AppCompat.
# Webkit
Thư viện Jetpack của Webpack bổ sung một API mới trong phiên bản 1.2.0 để buộc chế độ tối cho nội dung của nó. Khi API này được bật, WebView sẽ hiển thị các trang web trong chủ đề tối được hỗ trợ. Khi các trang web không hỗ trợ chủ đề tối, API sẽ đảo ngược một số màu nhất định.
# Jetpack Compose - Bộ công cụ UI mới của Android
Jetpack Compose, bộ công cụ UI hiện đại, mới của Android, hiện đã có trong Developer Preview 2. Bản phát hành này bổ sung nhiều tính năng mới: Xem khả năng tương tác, thêm các thành phần Material UI , hỗ trợ dark theme, UI testing và animation APIs, hỗ trợ ban đầu cho ConstraintLayout, cải tiến state management, tích hợp với observable streams and RTL support. Android Studio previews bây giờ có thể tương tác và đã có nhiều cải tiến trình biên dịch.

Nguồn:
https://medium.com/androiddevelopers/whats-new-in-jetpack-1891d205e136