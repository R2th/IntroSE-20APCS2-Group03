Thông thường, chúng ta sử dụng các API `startActivityForResult()`và `onActivityResult()`để bắt đầu một activity khác và nhận lại kết quả trên các lớp activity ở tất cả các API levels.

*Khi sử dụng JetPack, chúng ta nên sử dụng những Activity Result APIs hoàn toàn mới được giới thiệu trong AndroidX kể từ phiên bản  `Activity 1.2.0-alpha02` và `Fragment 1.3.0-alpha02` đã được triển khai* .

Bây giờ chúng ta có một abstraction tuyệt vời cho phép xử lý phương thức `onActivityResult()` trong một cấu trúc rất clean và có thể sử dụng lại, Bạn có thể đăng ký một callback cho một `Activity Result`, ` Activity Result API` cung cấp các thành phần để đăng ký nhận kết quả, khởi chạy activity và xử lý kết quả khi nó được gửi về bởi hệ thống.

## Activity Result API

- `registerForActivityResult()`- Để đăng ký result callback
- `ActivityResultContract`- Một contract quy định rằng một hoạt động có thể được gọi với đầu vào  thuộc loại I và tạo ra đầu ra thuộc loại O. Làm cho việc gọi một  result callback là an toàn.
- `ActivityResultCallback`- Một type-safe callback kiểu được gọi khi có ActivityResult. Nó là  single method interface  với [onActivityResult ()](https://developer.android.com/reference/androidx/activity/result/ActivityResultCallback#onActivityResult(O)) nhận một đối tượng của kiểu đầu ra được xác định trong ActivityResultContract
- `ActivityResultLauncher`- Trình khởi chạy cho một previously-prepared call trước đó để bắt đầu quá trình thực thi [ActivityResultContract](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContract) .

> registerForActivityResult () lấy một [ActivityResultContract](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContract) và một [ActivityResultCallback](https://developer.android.com/reference/androidx/activity/result/ActivityResultCallback) và trả về một [ActivityResultLauncher](https://developer.android.com/reference/androidx/activity/result/ActivityResultLauncher) mà bạn sẽ sử dụng để khởi chạy activity khác.

Chúng ta có thể sử dụng các contracts khác nhau hoặc muốn các callbacks riêng  biệt cho nhiều activity result call, tacó thể gọi `registerForActivityResult()`nhiều lần để đăng ký nhiều phiên bản `ActivityResultLauncher`.

`registerForActivityResult()`là an toàn để gọi trước khi Fragment hoặc Activity của bạn được tạo, cho phép nó được sử dụng trực tiếp khi khai báo các biến thành viên cho các `ActivityResultLauncher` được trả về. Nhưng bạn không thể khởi chạy `ActivityResultLauncher` cho đến khi được [CREATED](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State#CREATED) fragment hoặc activity.

## Khởi chạy một activity for result

Gọi `launch()`bắt đầu quá trình tạo ra kết quả. Khi người dùng hoàn tất activity tiếp theo và quay trở lại,  onActivityResult () từ ActivityResultCallback sau đó sẽ được thực thi:

```kotlin
val getContent = registerForActivityResult(GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}

override fun onCreate(savedInstanceState: Bundle?) {
    // ...

    val selectButton = findViewById<Button>(R.id.select_button)

    selectButton.setOnClickListener {
        // Pass in the mime type
        getContent.launch("image/*")
    }
}
```

Chúng ta có thể sử dụng prebuilt `ActivityResultContract`từ [ActivityResultContracts](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts) . Bên cạnh đó, bạn cũng có thể tạo các contracts tùy chỉnh. Bạn có thể đọc [ở đây](https://developer.android.com/training/basics/intents/result#custom) để tìm hiểu thêm về cách tạo contract tùy chỉnh.

## Generic StartActivityForResult

`StartActivityForResult`có thể được sử dụng cho các mục đích chung. Đây là một [ActivityResultContract](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContract) không thực hiện bất kỳ chuyển đổi kiểu nào, lấy [Intent](https://developer.android.com/reference/android/content/Intent.html) thô làm đầu vào và [ActivityResult](https://developer.android.com/reference/androidx/activity/result/ActivityResult) làm đầu ra. Có thể được đăng ký `ActivityResultCaller.registerForActivityResult(ActivityResultContract, ActivityResultCallback)`để tránh phải quản lý request codes khi gọi activity API mà  type-safe contract không có sẵn.

```kotlin
val startForResult = registerForActivityResult(StartActivityForResult()) { result: ActivityResult ->
    if (result.resultCode == Activity.RESULT_OK) {
        val intent = result.intent
        // Handle the Intent
    }
}

override fun onCreate(savedInstanceState: Bundle) {
    // ...

    val startButton = findViewById(R.id.start_button)

    startButton.setOnClickListener {
        // passing it the Intent you want to start
        startForResult.launch(Intent(this, ResultProducingActivity::class.java))
    }
}
```

## Nhận Activity result trong một class riêng biệt
Trong khi các lớp `ComponentActivity` và `Fragment` triển khai `ActivityResultCaller` để cho phép bạn sử dụng các `registerForActivityResult()` API, bạn cũng có thể nhận được kết quả hoạt động trong một lớp riêng biệt không triển khai `ActivityResultCaller` bằng cách sử dụng `ActivityResultRegistry` trực tiếp.

```kotlin
class MyLifecycleObserver(private val registry : ActivityResultRegistry)
        : DefaultLifecycleObserver {
    lateinit var getContent : ActivityResultLauncher<String>

    override fun onCreate(owner: LifecycleOwner) {
        getContent = registry.register("key", owner, GetContent()) { uri ->
            // Handle the returned Uri
        }
    }

    fun selectImage() {
        getContent.launch("image/*")
    }
}

class MyFragment : Fragment() {
    lateinit var observer : MyLifecycleObserver

    override fun onCreate(savedInstanceState: Bundle?) {
        // ...

        observer = MyLifecycleObserver(requireActivity().activityResultRegistry)
        lifecycle.addObserver(observer)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val selectButton = view.findViewById<Button>(R.id.select_button)

        selectButton.setOnClickListener {
            // Open the activity to select an image
            observer.selectImage()
        }
    }
}
```

## Những Contracts có thể sử dụng

- [RequestPermission](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.RequestPermission)
- [RequestMultiplePermissions](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.RequestMultiplePermissions)
- [TakePicture](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.TakePicture)
- [OpenDocument](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.OpenDocument)
- [OpenDocumentTree](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.OpenDocumentTree)
- [StartActivityForResult](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContracts.StartActivityForResult)

## Tạo một custom contract
Mặc dù `ActivityResultContracts` chứa một số lớp `ActivityResultContract` được tạo sẵn để sử dụng, bạn cũng có thể tạo các contract của riêng mình để cung cấp API an toàn cho kiểu dữ liệu chính xác mà bạn yêu cầu.

Mỗi `ActivityResultContract` yêu cầu xác định các lớp đầu vào và đầu ra, sử dụng Void (trong Kotlin, sử dụng một trong hai Void? hoặc Unit) làm kiểu đầu vào nếu bạn không yêu cầu bất kỳ đầu vào nào.

Mỗi contract phải triển khai phương thức `createIntent()`, phương thức này nhận một Context và đầu vào và constructs Intent sẽ được sử dụng với `startActivityForResult()`.

Mỗi contract cũng phải thực hiện `parseResult()`, tạo ra kết quả từ các contracts đã cho resultCode (ví dụ: `Activity.RESULT_OK` hoặc `Activity.RESULT_CANCELED`) và Intent.

Các contract có thể tùy chọn thực hiện `getSynchronousResult()` nếu có thể xác định kết quả cho một đầu vào nhất định mà không cần gọi `createIntent()`, bắt đầuactivity khác và sử dụng `parseResult()` để xây dựng kết quả.

```kotlin
class PickRingtone : ActivityResultContract<Int, Uri?>() {
    override fun createIntent(context: Context, ringtoneType: Int) =
        Intent(RingtoneManager.ACTION_RINGTONE_PICKER).apply {
            putExtra(RingtoneManager.EXTRA_RINGTONE_TYPE, ringtoneType)
        }

    override fun parseResult(resultCode: Int, result: Intent?) : Uri? {
        if (resultCode != Activity.RESULT_OK) {
            return null
        }
        return result?.getParcelableExtra(RingtoneManager.EXTRA_RINGTONE_PICKED_URI)
    }
}
```
## Tham khảo
- https://developer.android.com/training/basics/intents/result
- https://developer.android.com/reference/androidx/activity/result/contract/package-summary
- https://medium.com/droid-log/androidx-activity-result-apis-the-new-way-7cfc949a803c