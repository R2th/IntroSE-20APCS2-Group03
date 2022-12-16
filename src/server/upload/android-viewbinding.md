# I. Mở đầu
Người ta thường nói rằng các nhà phát triển lười biếng và đó (thường) là một điều tốt. Điều đó chỉ có nghĩa là thay vì lặp đi lặp lại cùng một nhiệm vụ hoặc đoạn code, họ có xu hướng tìm cách ngăn chặn sự lặp lại đó và tối ưu hóa thời gian của họ.

Các nhà phát triển Android trong những năm gần đây luôn cố gắng đến việc sử dụng findViewById "truyền thống" như sau:

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/mainTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:gravity="center"
        android:padding="16dp"
        android:textSize="18sp"
        tools:text="Main Title" />

    <TextView
        android:id="@+id/subTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/mainTitle"
        android:gravity="center"
        android:padding="16dp"
        android:textSize="14sp"
        tools:text="Main Subtitle" />
</RelativeLayout>
```

Nếu muốn truy cập vào các view đã khai báo ở trên và sử dụng Java thì nó có thể như sau:

```
public class MainActivity extends AppCompatActivity {
    private TextView txtViewMainTitle;
    private TextView txtViewSubTitle;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txtViewMainTitle = findViewById(R.id.mainTitle;
        txtViewSubTitle = findViewById(R.id.subTitle);
                                        
        txtViewMainTitle.setText("This is my main title");
        txtViewSubTitle.setText("This is my subTitle");
    }
```

Chắc hẳn nếu là 1 developer Android thì nhìn rất quen thuộc đúng không nào...

# II. findViewById - "Cách cũ"
Để bỏ cách này, nhiều developer đã sử dụng Butter Knife hoặc sử dụng RoboGuice. Tôi tin rằng Butter Knife vẫn đang được sử dụng trong nhiều ứng dụng và github vẫn đang hoạt động nhưng việc phát triển thư viện sẽ làm chúng ít được sử dụng hơn so với view binding

Nếu ứng dụng của bạn sử dụng Kotlin thì có một cách khác đó là sử dụng  [Kotlin Android Extensions](https://kotlinlang.org/docs/tutorials/android-plugin.html)

Thông thường với các thư viện trên. Bạn cần trường yêu cầu chú thích cho mỗi view trước khi sử dụng chúng. Nhưng với Kotlin Android Extensions thì sử dụng rất dễ dàng, chúng ta không cần thêm chú thích nhưng vẫn có thể truy cập đến view dễ dàng:

```
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mainTitle.text = "This is my main title"
        subTitle.text = "This is my subTitle"
    }
}
```
Nhìn thật dễ dàng đúng không!

# III. findViewById - "Cách mới"
"ViewBinding" được công bố tại Google I/O 2019, mơis hơn, nhanh hơn, đơn giản và type/null an toàn với bind views

Tại thời điẻm này chỉ tính năng thử nghiệm có sẵn trong [ Android Studio 3.6 Canary 11+](https://developer.android.com/studio/preview)

Vì vậy, sau khi tải xuống Android Studio Canary 12 để bắt đầu sử dụng ViewBinding, bạn sẽ cần bật nó trong tệp build.gradle

```
android {
    ...
    viewBinding {
        enabled = true
    }
}
```

Mặc dù tài liệu chính thức không đề cập đến nó, bạn cũng sẽ cần nâng cấp Plugin Android Gradle của mình lên 3.6.0-alpha11 trở lên:

```
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        google()
        jcenter()
        
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.6.0-alpha12'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

Vui lòng lưu ý rằng phiên bản Gradle sẽ được sử dụng phải là 5.6.1 trở lên, hãy xem gradle-wrapper.properations của bạn và kiểm tra xem nó có đúng không.

Và bây giờ chúng ta đã sẵn sàng để bắt đầu sử dụng ViewBinding! Xem xét ví dụ trước, sử dụng ViewBinding, mã của chúng ta sẽ sau:

```
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.mainTitle.text = "This is my main title"
        binding.subTitle.text = "This is my subTitle"
    }
}
```

Tên class binding được tạo ra bằng cách chuyển tên của XML file và thêm Binding vào cuối. 

Lớp ActivityMainBinding của chúng ta có hai trường: một TextView được gọi là mainTitble và một TextView khác được gọi là subTitle. Bất kỳ View nào trong bố cục không có ID, sẽ không có tham chiếu đến nó trong lớp liên kết.

Để truy cập vào view root của tệp bố cục tương ứng, mỗi lớp liên kết cũng bao gồm một phương thức getRoot () cung cấp một tham chiếu trực tiếp. Trong ví dụ của chúng ta phương thức getRoot () trong lớp ActivityMainBinding sẽ trả về khung nhìn gốc RelativeLayout.

# IV. Ưu điểm chính
* Null Safe: ràng buộc view tạo ra các tham chiếu trực tiếp đến các view, do đó, không có rủi ro về NullPointerException do ID view không hợp lệ. Ngoài ra, khi chế độ xem chỉ tồn tại đối với một số điều kiện, trường chứa tham chiếu của nó trong lớp liên kết được đánh dấu bằng @Nullable.
* Type safety: Tất cả các trường liên kết view được tạo phù hợp với cùng loại với các trường được tham chiếu trong XML, do đó, không cần phải đánh máy. Điều này có nghĩa là rủi ro của ngoại lệ truyền lớp là thấp hơn nhiều, vì nếu vì một lý do nào đó, xml và code của bạn không khớp với nhau, build sẽ thất bại tại thời gian compile thay vào lúc run
* Speed: nó không có bất kỳ tác động tốc độ thời gian build app nào vì nó không sử dụng bộ xử lý chú thích như ButterKnife vs DataBinding.

# V. ViewBinding vs DataBinding
Có lẽ bạn đang hình dung ViewBinding và DataBinding giống nhau?

Cả hai đều tạo các lớp ràng buộc mà bạn có thể sử dụng để tham chiếu các view trực tiếp, nhưng sự khác biệt là:
* Cách tiếp cận DataBinding cần bạn thêm thẻ <layout> vào bố cục xml của bạn trong  để kích hoạt quy trình liên kết dữ liệu;
* ViewBinding không hỗ trợ các biến bố cục hoặc biểu thức bố cục, do đó, nó có thể được sử dụng để liên kết bố cục với dữ liệu trong file XML.

# VI. Kết luận

Đây chỉ là một giới thiệu ngắn gọn về ViewBinding và vì đây là một tính năng thử nghiệm nên nó dường như có rất nhiều tiềm năng.
    
refs: [Medium](https://proandroiddev.com/hello-viewbinding-goodbye-findviewbyid-edca92b397c)