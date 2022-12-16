# Giới thiệu
Jetpack compose sắp tạo ra một cuộc cách mạng phát triển ứng dụng Android. Chúng ta không cần sử dụng xml cho các bố cục nữa. Với Jetpack compose, chúng ta có thể dễ dàng tạo tất cả các chế độ xem bằng cách sử dụng mã Kotlin.

Ví dụ: để tạo một recycler view, chúng ta phải dùng hai tệp xml và một lớp adapter. Chúng ta đã từng có một tệp xml cho activity hoặc fragment. Và, một tệp xml khác cho danh sách. Ngoài ra, chúng tôi cần viết một lớp adapter rất phức tạp.

Tuy nhiên, bây giờ chúng ta có thể tạo ra cùng một kết quả chỉ bằng cách sử dụng một lớp Kotlin đơn giản.
Từ loạt bài hướng dẫn này, bạn sẽ có thể từng bước thành thạo Jetpack Compose

Tôi sẽ ra một series về Jetpack Compose mong các bạn đón đọc :
```
       1) Introduction and Project Setup

       2) Modifiers in Jetpack Compose

       3) Column Layout in Jetpack Compose

       4) Row Layout in Jetpack Compose

       5) Box Layout in Jetpack Compose

       6) Buttons in Jetpack Compose

       7) Jetpack Compose Recyclerview Example
```

# 1. Cài đặt dự án cho Jetpack Compose
Đối với những dự án dùng Jetpack Compose thì chúng ta cần phải dùng Android Studio “Canary Build”(Arctic Fox). 
Đây là link để tải về Canary :https://developer.android.com/studio/preview

Bây giờ chọn New Project -> Empty Compose Activity
![](https://images.viblo.asia/5ffb0a10-7a84-4013-8d49-34d4dc910ea7.png)

Lưu ý là chọn SDK level 21 trở lên, điều đó là yêu cầu để có thể sử dụng đc Jetpack Compose
![](https://images.viblo.asia/a25527e7-0b10-419f-8c3c-3d5fc872cd83.png)

Cuối cùng sau khi đợi build chúng ra sẽ được một project mới
![](https://images.viblo.asia/edae6dfe-cda7-4859-8183-92efdf2f4ed8.png)

Nếu bạn chạy app ngay lúc này bạn sẽ thấy dòng chữ ***Hello Android*** ngay trên màn hình

### Không có xml file

Như bạn đã thấy, hàm onCreate() khác biệt so với hàm mà chúng ta đã thường xuyên làm việc. onCreate() có một lệnh gọi hàm setContentView(). Hàm đó có file xml là một đối số.

```kotlin
 override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
```

Nhưng bây giờ chúng ta có khối setContent thay vì gọi hàm setContentView().
```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            JetpackComposeBeginTheme {
                // A surface container using the 'background' color from the theme
                Surface(color = MaterialTheme.colors.background) {
                    Greeting("Android")
                }
            }
        }
    }
```

### Theme.kt
***JetpackComposeBeginTheme*** là tên của theme được tạo cho dự án này. Nếu bạn đặt dự án là "Abc" thì tên theme sẽ là "AbcTheme"
### Surface
Surface(*bề mặt*) chỉ ra rõ ràng rằng code sử dụng một material surface. chúng ta có thể sử dụng nó để cung cấp bề mặt chung để xem các thành phần.

Chúng ta có thể sử dụng nó để đặt các thuộc tính chung như màu nền, đường viền và độ cao. Tương tự như các chủ đề, chúng ta sẽ nghiên cứu thêm về các bề mặt ở phần sau của loạt bài hướng dẫn này.

Trên thực tế, đối với một dự án đơn giản như thế này, chúng tôi không yêu cầu khối chủ đề hoặc khối bề mặt. Loại bỏ hai khối đó và chạy mã. Bạn sẽ nhận được kết quả tương tự.
### Composable Functions
Trong Jetpack Compose, một thành phần giao diện người dùng chỉ đơn giản là một chức năng với một annotation(chú thích) có thể tổng hợp.

Không giống như các tên hàm khác, các tên hàm này bắt đầu bằng chữ hoa.

Từ khối setContent, chúng ta gọi hàm "Greeting".
```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

Mục tiêu của chức năng này là hiển thị Văn bản “Hello Android” trên màn hình.

Để làm điều đó, chúng ta cần gọi hàm “Text ()”.

Text () là một **Jetpack Compose Function.**

Khi chúng tôi gọi một function như vậy, thư viện Jetpack Compose sẽ sử dụng một plugin trình biên dịch Kotlin tùy chỉnh để chuyển đổi nó thành một phần tử giao diện người dùng.

Tuy nhiên, tất cả các chức năng trong jetpack compose đều là các chức năng có thể kết hợp.

Vì chúng ta đang gọi một hàm có thể tổng hợp từ hàm “Greeting”, chúng ta phải chú thích hàm “Greeting” bằng @Composable
### Preview Functions
Android Studio cho phép chúng ta xem trước giao diện người dùng của mình mà không cần phải mở trình giả lập hoặc kết nối với thiết bị.

Đối với điều đó, tất cả những gì chúng ta cần làm là tạo một hàm có thể kết hợp (không có tham số) và chú thích nó bằng @Preview.

Sau đó, chúng tôi sẽ gọi các chức năng có thể tổng hợp khác từ nó để có bản xem trước trực tiếp.

Bạn có thể cập nhật các bản xem trước bất kỳ lúc nào bằng cách nhấp vào nút làm mới ở đầu cửa sổ xem trước.
```kotlin
@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    JetpackComposeBeginTheme {
        Greeting("Android")
    }
}
```
### Các Composable functions đã được định nghĩa bên ngoài lớp MainActivity
Nếu bạn nghiên cứu kỹ đoạn mã trên, bạn sẽ thấy rằng hai hàm đã được định nghĩa bên ngoài MainActivity.

Trong Kotlin, có thể định nghĩa một hàm bên ngoài lớp. Chúng tôi gọi chúng là các package level functions.

Việc xác định chúng dưới dạng các package level functions., cho phép chúng tôi sử dụng lại chúng một cách hiệu quả.
### Hiển thị một Văn bản bằng cách sử dụng Jetpack compose
Trên thực tế, ActivityMain.kt được tạo đã tạo theo các phương pháp hay nhất. Nó cung cấp một cấu trúc tốt.

Tuy nhiên, chúng ta có thể nhận được kết quả tương tự chỉ cần gọi hàm Text() từ onCreate ().
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text(text = "Hello Android!")
        }
    }
}
```
Trên đây không chứng minh phương pháp viết mã tốt nhất. Nhưng, tốt cho một dự án đơn giản như thế này.
Tiếp theo tôi sẽ ra thêm những tutorial giúp bạn có thể tiếp cận tốt nhất dễ hiểu nhất với Jetpack Compose, các bạn hãy nhớ follow và like cho mình nhé, nếu thấy hay có thể chia sẻ cho mọi người cùng đọc. 

Hẹn các bạn ở số tiếp theo. Thân ái chào tạm biệt!!!

Link tham khảo: https://appdevnotes.com/complete-jetpack-compose-tutorial-for-beginners/