Khi các bạn start một activity khác, dù là activity trong ứng dụng của bạn hay từ ứng dụng khác, không cần phải là activity một chiều. Bạn cũng có thể start một acitivty và nhận lại result. Ví dụ: ứng dụng của bạn có thể khởi động ứng dụng máy ảnh và kết quả là nhận được ảnh đã chụp. Hoặc, bạn có thể khởi động ứng dụng Danh bạ để người dùng chọn một liên hệ và kết quả là bạn sẽ nhận được chi tiết liên hệ.

Mặc dù các API **startActivityForResult()** và **onActivityResult()** cơ bản đã có sẵn ở class Activity trên tất cả các cấp API, nhưng tôi khuyên bạn nên sử dụng các Activity Result APIs được giới thiệu trong Activity AndroidX 1.2.0-alpha02 và Fragment 1.3.0-alpha02.

**Activity Result APIs** cung cấp các thành phần(components) để đăng ký kết quả(result), khởi chạy kết quả và xử lý kết quả sau khi hệ thống gửi đi.

Để chi tiết cụ thể hơn sử dụng **Activity Result APIs** như thế nào, tôi sẽ giới thiệu 2 trường hợp dưới đây sử dụng **Activity Result APIs**. (Lưu í có rất nhiều trường hợp khác tương tự để sử dụng API result)

# 1. Request Runtime Permissions
Gần đây, Android đã ngừng sử dụng API ActivityResult cũ và giới thiệu các API mới với AndroidX Activity 1.2.0-alpha02. Điều này giúp việc *request runtime permissions* sẽ dễ dàng hơn.
Với các API mới có sẵn, các nhà phát triển  có thể đăng ký results, launch for results và sau đó xử lý results do hệ thống tạo ra.

But Why?

Khi chúng ta start activity for a result, có khả năng process  và activity của bạn sẽ bị phá hủy(destroyed) do thiếu bộ nhớ, đối với các hoạt động đòi hỏi nhiều bộ nhớ như sử dụng máy ảnh. Do đó, các API result hoạt động tách result callback khỏi vị trí trong code của bạn, nơi activity khác được khởi chạy.

Do đó, thật không may khi process  hoặc activity được tạo lại, callback phải đăng ký nó mọi lúc, ngay cả khi logic start Activity khác chỉ xảy ra dựa trên input của user hoặc logic nghiệp vụ khác.

## What is different?
Trước đây, chúng ta phải quản lý *request code* trong khi yêu cầu quyền bằng cách chuyển nó đến phương thức **requestPermissions()**. Và sau đó sử dụng *request code* đó trong khi fetching result trong phương thức **OnRequestPermissionResult()** như được hiển thị bên dưới.

```java
ActivityCompat.requestPermissions(context,permissionArray,
                                  requestCode)
                                  
                                  
override fun onRequestPermissionsResult(requestCode: Int,
        permissions: Array<String>, grantResults: IntArray) {
    when (requestCode) {
        REQUEST_CODE -> {
            if ((grantResults.isNotEmpty() &&
              grantResults[0] == PackageManager.PERMISSION_GRANTED){
                // Permission is granted.
            } else {
               //permission is denied.
            }
            return
        }
    }
}
```

Với Activity Result API mới, chúng ta sẽ không phải tự quản lý request codes vì hệ thống tự xử lý nội bộ rồi.

Activity Result API mới cung cấp API registerForActivityResult() để đăng ký lệnh result callback. Nó cần một **ActivityResultContract** và một **ActivityResultCallback** và trả về một **ActivityResultLauncher**, bằng cách sử dụng chúng mà chúng ta có thể khởi chạy activity khác như được hiển thị bên dưới.
```java
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.button).setOnClickListener {
           activityResultLauncher.launch(Manifest.permission.CAMERA)
        }
    }
    

    private val activityResultLauncher =
        registerForActivityResult(
           ActivityResultContracts.RequestPermission()){isGranted ->
             // Handle Permission granted/rejected
             if (isGranted) {
                // Permission is granted
             } else {
                // Permission is denied
             }
           }
   }
```

- **ActivityResultContract:** chỉ định kiểu đầu vào cần thiết để tạo ra result. Trong ví dụ trên ActivityResultContracts.RequestPermission() được sử dụng có nghĩa là trình khởi chạy acticity sẽ require android permissions làm input đầu vào.
- **ActivityResultCallback:** chỉ định cách chúng ta xử lý phản hồi (response) của người dùng đối với yêu cầu cấp quyền.
- Khi phương thức  **launch()** được gọi với quyền CAMERA làm input đầu vào thì permission dialog (xuất hiện hộp thoại request permison) yêu cầu quyền CAMERA sẽ được hiển thị. Dựa trên phản hồi của người dùng đối với quyền, hệ thống gọi ra *activityResultCallback*.

Tương tự, nhiều quyền khác có thể được yêu cầu cùng một lúc bằng cách chuyển vào 1 Mảng permissions thay vì một permissions duy nhất làm đầu vào và sau đó chúng ta nhận được MutableMap với permission key and grant result dưới dạng value trong *activityResultCallback*.

```java
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.button).setOnClickListener {
           activityResultLauncher.launch(
           arrayOf(Manifest.permission.CAMERA,    
                   Manifest.permission.READ_EXTERNAL_STORAGE)             
           ) 
        }
    }

    private val activityResultLauncher =
        registerForActivityResult(
           ActivityResultContracts.RequestMultiplePermissions())   
             { permissions ->
                // Handle Permission granted/rejected
               permissions.entries.forEach {
                  val permissionName = it.key
                  val isGranted = it.value
                  if (isGranted) {
                     // Permission is granted
                  } else {
                     // Permission is denied
                  }
              }
           }
        }
```

# 2. Launching an activity for get content result
Trong khi registerForActivityResult() register callback của bạn, nó không khởi chạy activity khác và bắt đầu yêu cầu result. Thay vào đó, đây là trách nhiệm của instance ActivityResultLauncher được trả về.

Nếu input đầu vào của phương thức **launch()** tồn tại, trình khởi chạy sẽ lấy đầu vào phù hợp với loại ActivityResultContract. Gọi phương thức **launch()** sẽ bắt đầu quá trình tạo ra kết quả. Khi người dùng hoàn tất activity tiếp theo và returns activity, onActivityResult() từ ActivityResultCallback sau đó sẽ được thực thi, như thể hiện trong ví dụ sau:
```java
ActivityResultLauncher<String> mGetContent = registerForActivityResult(new GetContent(),
    new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
            // Handle the returned Uri
        }
});

@Override
public void onCreate(@Nullable savedInstanceState: Bundle) {
    // ...

    Button selectButton = findViewById(R.id.select_button);

    selectButton.setOnClickListener(new OnClickListener() {
        @Override
        public void onClick(View view) {
            // Pass in the mime type you'd like to allow the user to select
            // as the input
            mGetContent.launch("image/*");
        }
    });
}
```

Ở trên, chúng ta gọi *launch("image/")*, tham số là 1 dạng string mime type dạng image,  trình khởi chạy sẽ lấy đầu vào phù hợp với loại ActivityResultContract ở đây chính là GetContent() và sẽ trả về kết quả phù hợp với ResultContact của GetContent chính là Uri. Ngoài ra còn có rất nhiều dạng input khác tương tự nữa. 

## Receiving an activity result in a separate class
Nhận result activity trong một lớp riêng biệt.

Trong khi các lớp ComponentActivity và Fragment triển khai interface ActivityResultCaller để cho phép bạn sử dụng các API registerForActivityResult(), bạn cũng có thể nhận được result activity trong một lớp riêng biệt mà không triển khai ActivityResultCaller bằng cách sử dụng trực tiếp ActivityResultRegistry.

Ví dụ: bạn có thể muốn triển khai LifecycleObserver xử lý việc đăng ký contract cùng với việc khởi chạy trình khởi chạy:
```java
class MyLifecycleObserver implements DefaultLifecycleObserver {
    private final ActivityResultRegistry mRegistry;
    private ActivityResultLauncher<String> mGetContent;

    MyLifecycleObserver(@NonNull ActivityResultRegistry registry) {
        mRegistry = registry;
    }

    public void onCreate(@NonNull LifecycleOwner owner) {
        // ...

        mGetContent = mRegistry.register(“key”, owner, new GetContent(),
            new ActivityResultCallback<Uri>() {
                @Override
                public void onActivityResult(Uri uri) {
                    // Handle the returned Uri
                }
            });
    }

    public void selectImage() {
        // Open the activity to select an image
        mGetContent.launch("image/*");
    }
}

class MyFragment extends Fragment {
    private MyLifecycleObserver mObserver;

    @Override
    void onCreate(Bundle savedInstanceState) {
        // ...

        mObserver = new MyLifecycleObserver(requireActivity().getActivityResultRegistry());
        getLifecycle().addObserver(mObserver);
    }

    @Override
    void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Button selectButton = findViewById(R.id.select_button);
        selectButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                mObserver.selectImage();
            }
        });
    }
}
```

Khi sử dụng các API ActivityResultRegistry, bạn nên sử dụng các API sử dụng LifecycleOwner, vì LifecycleOwner sẽ tự động xóa trình khởi chạy đã đăng ký của bạn khi Vòng đời bị hủy (lifecycle onDestroy). Tuy nhiên, trong trường hợp không có sẵn LifecycleOwner, mỗi lớp ActivityResultLauncher vẫn cho phép bạn gọi unregister() theo cách thủ công để thay thế.

## Creating a custom contract
Đang cập nhật....



Để biết thêm thông tin chi tiết, Bạn có thể xem tài liệu chính thức tại đây:
- https://developer.android.com/training/basics/intents/result
- https://developer.android.com/training/permissions/requesting

Nguồn tham khảo: 
https://medium.com/codex/android-runtime-permissions-using-registerforactivityresult-68c4eb3c0b61