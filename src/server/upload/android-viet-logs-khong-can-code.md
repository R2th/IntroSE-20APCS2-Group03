Khi thực hiện debug project Android, đôi khi chúng ta phải đặt vào đoạn logging để theo dõi luồng hoạt động của code.
```
class MainActivity : AppCompatActivity() {
 
    lateinit var retrofit: Retrofit
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
 
        setupToolbar()
        Log.d("MyApp", "Toolbar Set")
 
        initRetrofit()
        Log.d("MyApp", "Retrofit Initialized")
 
 
        var myButton = findViewById<Button>(R.id.search_close_btn)
        myButton.setOnClickListener {
            Log.d("MyApp", "My Button Clicked")
        }
 
        Log.d("MyApp", "Activity Creation Done!")
 
    }
}
```
Việc viết log này rất bình thường, tuy nhiên có đôi khi chúng ta quên xóa log trước khi commit, ta có thể không pass được code review hoặc khi phiên bản đã release mà code Log vẫn còn ở đó.

Tốt nhất là chúng ta nên loại bỏ những đoạn code logging này sau khi ta đã hoàn thành việc debug, kể cả khi bạn sử dụng ProGuard để lọc những đoạn code này, nhìn chung nó sẽ làm ảnh hưởng đến khả năng đọc codebase của project. Nhẹ nhàng thì giống như các comment, chúng sẽ lọt thỏm và vô dụng giữa các đoạn code xử lí, tệ thì có thể gây ra hiểu nhầm khi research code.

Tệ hơn nữa, một số đoạn logging yêu cần các điều kiện cụ thể để xuất ra các giá trị mong muốn. Điều này sẽ khiến ta phải viết thêm những block if else quả thực dài dòng và đôi lúc không cần thiết.

Tuy nhiên giờ đây AndroidStudio (hoặc IntelliJ) đã giúp chúng ta giải quyết được vấn đề này, đó là cho phép chúng ta tạo các non-suppending breakpoints (Các breakpoints không dừng hoạt động của app khi debug)

**Sau đây là cách làm thực hiện đặt non-suppending breakpoints**

Đầu tiên, hãy đặt breakpoint debug ở một dòng bất kì trong đoạn code xử lí bạn muốn. Ta thực hiện chỉnh sửa breakpoint đó bằng cách click chuột phải vào nó, hoặc dùng tổ hợp phím Ctrl+Shift+f8, ta sẽ thấy giao diện chính sửa như hình sau

![](https://images.viblo.asia/4c6a01de-230a-4306-a61c-d05afc3b2542.png)

Ta thực hiện loại bỏ tick suppend trên checkbox, ta sẽ thấy có thêm nhiều tùy chọn hơn bên dưới

![](https://images.viblo.asia/c0b8e3e4-ff4d-4b6c-845e-2b85bcdec008.png)

Bây giờ ta viết bất kì một đoạn Log nào đó trong ô Evaluate and log như sau

![](https://images.viblo.asia/ed48e3aa-bafe-484d-920b-1d900eac2b17.png)

Đã xong! Việc còn lại bạn phải làm chỉ là chạy app ở chế độ debugger attached như mọi khi, nhưng đoạn non-suppend breakpoint này sẽ không stop app của bạn, và khi đoạn code xử lí được chạy qua sẽ hiện Log trên màn hình debug console
Code của bạn sẽ gọn hơn trước
```
class MainActivity : AppCompatActivity() {
 
    lateinit var retrofit: Retrofit
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
 
        setupToolbar()
        initRetrofit()
        
        var myButton = findViewById<Button>(R.id.search_close_btn)
        myButton.setOnClickListener {
            
        }
 
    }
}
```
Cảm ơn các bạn đã theo dõi