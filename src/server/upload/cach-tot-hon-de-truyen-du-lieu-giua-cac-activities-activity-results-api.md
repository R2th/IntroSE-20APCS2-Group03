![](https://images.viblo.asia/260bc015-43aa-4492-9d56-2e684761e2a3.jpeg)
### Induction
Như chúng ta đã biết, cách truyền dữ liệu và nhận response giữa các activity là những điều phổ biến nhất mà chúng ta làm trong giai đoạn phát triển trong một thời gian dài trước đây. Hiện nay, cách duy nhất để có được các response từ các activity tiếp theo là truyền Intent và requestCode thông qua startActivityForResult. Sau đó chúng ta phải kiểm tra request và result code trước khi parsing responses trên onActivityResult. Nó trông giống như đoạn mã dưới đây:
```
class OldMainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                REQUEST_PERMISSION -> {
                    // Do something if success / failed
                }
                REQUEST_MULTIPLE_PERMISSION -> {
                    // Do something if success / failed
                }
                REQUEST_TO_POST -> {
                    // Parse result and do something
                }
            }
        }

        super.onActivityResult(requestCode, resultCode, data)
    }

    companion object {
        const val REQUEST_PERMISSION = 1001
        const val REQUEST_MULTIPLE_PERMISSION = 1002
        const val REQUEST_TO_POST = 1003
    }
}
```
Như đoạn code ở trên thì có lẽ bạn sẽ đồng ý rằng, khi ứng dụng phát triển, sẽ có nhiều câu lệnh IF lồng nhau, code sẽ được liên kết chặt chẽ và khó khăn hơn để kiểm tra nó.
### Let’s Try Activity Results API
- Không chắc chắn rằng nó sẽ lại thay đổi trong tương lai hay không kể từ khi Activity Results API trong giai đoạn Alpha nhưng chúng ta tin tưởng rằng nếu có sự thay đổi, nó sẽ không phải là một sự thay đổi lớn. Hãy cùng cố gắng thực hiện nó! 
- Đầu tiên, đừng quên thêm vào Gradle dependency của bạn 
```
   implementation "androidx.activity:activity-ktx:1.2.0-alpha06"
   implementation "androidx.fragment:fragment-ktx:1.3.0-alpha06"
```
- Thứ 2, tạo result contract bằng cách extend một abstract class có tên là  ActivityResultContract<I,O>. Trong đó I có nghĩa là loại đầu vào và O có nghĩa là loại đầu ra, và bạn chỉ cần override 2 methods.
```
class PostActivityContract : ActivityResultContract<Int, String?>() {

    override fun createIntent(context: Context, input: Int): Intent {
        return Intent(context, PostActivity::class.java).apply {
            putExtra(PostActivity.ID, postId)
        }
    }

    override fun parseResult(resultCode: Int, intent: Intent?): String? {
        val data = intent?.getStringExtra(PostActivity.TITLE)
        return if (resultCode == Activity.RESULT_OK && data != null) data
        else null
    }
}
```
Và cuối cùng là register contract vào Activity. Bạn cần truyền custom constract và callback của bạn vào registerForActivityResult
```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
      
        start_activity_contract.setOnClickListener {
            openPostActivityCustom.launch(1)
        }
    }
  
    // Custom activity result contract
    private val openPostActivityCustom =
        registerForActivityResult(PostActivityContract()) { result ->
            // parseResult will return this as string?                                              
            if (result != null) toast("Result : $result")
            else toast("No Result")
        }
}
```
- OK, vậy là bạn đã xong việc rồi, như đoạn code mà bạn thấy ở trên, sẽ không có IF lồng nhau nữa và bạn có thể loại bỏ tất cả các request code constant bởi vì nó sẽ được duy trì bởi ComponentActivity class.
### But wait there’s more! Pre-built contracts for the rescue
- Đáng ngạc nhiên, Google cung cấp pre-built contract thường được sử dụng cho các task như 
```
StartActivityForResult()
RequestMultiplePermissions()
RequestPermission()
TakePicturePreview()
TakePicture()
TakeVideo()
PickContact()
CreateDocument()
OpenDocumentTree()
OpenMultipleDocuments()
OpenDocument()
GetMultipleContents()
GetContent()
```
- Thực ra StartActivityForResult rất giống custom contract mà chúng ta đã đi qua ở trên, nhưng điều khác biệt là bạn không cần phải xác định các loại đầu vào và đầu ra bởi vì thỉnh thoảng bạn có thể chỉ cần RESULT_OK để kích hoạt một số task
```
// General activity result contract
private val openPostActivity =
    registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
      if (result.resultCode == Activity.RESULT_OK) {
        // Do something here
        toast("Result OK from PostActivity")
      }
    }

btn_post.setOnClickListener {
  openPostActivity.launch(
    Intent(context, PostActivity::class.java).apply {
      putExtra(ID, 1)
    }
  )
}
```
- Và cuối cùng nhưng không kém phần quan trọng, requesting permission  sẽ dễ dàng hơn trước đây. Lần cuối cùng mà mìn tạo một class khác chỉ để xử lý multiple permissions, nhưng bây giờ, họ cung cấp RequestPermission và RequestMultiplePermission contract.
```
request_permission.setOnClickListener {
    requestPermission.launch(permission.BLUETOOTH)
}

request_multiple_permission.setOnClickListener {
    requestMultiplePermissions.launch(
        arrayOf(
            permission.BLUETOOTH,
            permission.NFC,
            permission.ACCESS_FINE_LOCATION
        )
    )
}

// Request permission contract
private val requestPermission =
    registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
        // Do something if permission granted
        if (isGranted) toast("Permission is granted")
        else toast("Permission is denied")
    }

// Request multiple permissions contract
private val requestMultiplePermissions =
    registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { permissions ->
        // Do something if some permissions granted or denied
        permissions.entries.forEach {
            // Do checking here
        }                                                                             
}
```
### Conclusion
- Activity Result API mới, cung cấp một cách dễ dàng hơn để thực hiện các task thông thường đặc biệt như requestPermission , takePicture và takePhoto, vì vậy chúng ta không cần phải dựa vào bất kỳ thư viện của bên thứ ba nào nữa.
- Bên cạnh đó, nó cũng giúp đơn giản hóa các Implement cũ mà có thể làm cho code lỏng lẻo, cải thiện việc tái sử dụng, và dễ dàng hơn để kiểm tra.
- Hy vọng bạn sẽ có thể áp dụng ngay vào dự án. 
- Link demo: https://github.com/andrewjapar/activity-results-sample 
- [Nguồn](https://proandroiddev.com/is-onactivityresult-deprecated-in-activity-results-api-lets-deep-dive-into-it-302d5cf6edd)