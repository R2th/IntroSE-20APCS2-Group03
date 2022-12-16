![](https://images.viblo.asia/2b2079e6-fd41-483e-a679-160772617cd2.png)

Nếu bạn đã từng làm về ReactNative hẳn bạn sẽ rất thích framework React UI của nó. Các thành phần (component) nhỏ có thể tái sử dụng mà bạn sử dụng để xây dựng giao diện người dùng của mình rất tuyệt vời và mang lại sự linh hoạt và tốc độ phát triển nhanh.

Quay trở lại với Android, ta cần lo lắng về việc giữ cấu trúc phân cấp View (View hierarchy) càng phẳng càng tốt. Vì vậy rất khó để sử dụng hướng tiếp cận dựa trên các component như ReactNative. Kết quả dẫn đến là sự rối rắm và khó bảo trì của mã nguồn.

### Giải quyết vấn đề với Jetpack Compose

**Compose** có cơ chế khá giống với các khung UI framework hiện có như React, Litho hoặc Flutter.

UI framework hiện tại của Android đã có từ năm 2008 và theo thời gian, nó đã trở nên phức tạp hơn rất nhiều. Jetpack Compose ra đời nhằm mục đích bắt đầu sự mới mẻ trong việc thiết kế giao diện dựa trên các component. Framework này được viết với các mục tiêu chính:

* **Tách biệt khỏi các bản platform release**: Điều này cho phép việc sửa lỗi và release sản phẩm nhanh chóng hơn vì nó độc lập với các bản phát hành Android mới.
* **Ít các thành phần giao diện hơn**: Không bắt buộc bạn phải sử dụng View hay Fragment khi tạo giao diện người dùng của mình. Tất cả mọi thứ là một component và có thể được kết hợp tự do với nhau.
* **Làm rõ quyền sở hữu trạng thái (state) và xử lý sự kiện**: Một trong những điều quan trọng và phức tạp nhất để có trong các ứng dụng lớn là việc xử lý luồng dữ liệu và trạng thái trong giao diện người dùng của bạn. Compose cho ta biết rõ cái gì đang chịu trách nhiệm về trạng thái và cách xử lý các sự kiện, tương tự như cách React xử lý việc này.
* **Viết ít mã hơn**: Viết UI trong Android thường yêu cầu RẤT NHIỀU mã, đặc biệt là khi tạo bố cục phức tạp hơn (ví dụ với RecyclerView chẳng hạn). Compose đơn giản hóa đáng kể cách bạn xây dựng giao diện người dùng của mình.

Điều này giúp ta dễ dàng tạo các thành phần biệt lập và có thể tái sử dụng, khiến việc tạo một màn hình mới với các thành phần hiện có trở nên dễ dàng hơn. Giúp bạn có nhiều thời gian hơn tập trung vào việc tạo trải nghiệm người dùng tuyệt vời thay vì cố gắng giữ giữ View hierarchy thật phẳng.

### Một ứng dụng Compose đơn giản: Hello World

Hãy cùng xem một đoạn mã cho một ứng dụng Hello World đơn giản với Jetpack Compose.

```java
class ComposeActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { CraneWrapper { MyApp() } }
    }

    @Composable
    fun MyApp() {
        MaterialTheme {
            Text(text = "Hello world!", style = +themeTextStyle { h3 })
        }
    }
}
```

Trong phương thức onCreate, ta đặt nội dung của ứng dụng Compose bằng cách gọi setContent. Đây là một phương thức khởi tạo cây widget và bọc nó trong FrameLayout.

Để làm cho mọi thứ hoạt động, chúng ta cần phải bọc ứng dụng của mình trong CraneWrapper và MaterialTheme. CraneWrapper chịu trách nhiệm thiết lập các provider cho Context, FocusManager và TextInputService. MaterialTheme cung cấp các màu sắc, styles và fonts cho các widget của bạn. Sau đó chúng ta có thể thêm một thành phần Text để hiển thị văn bản của chúng ta trên màn hình.

### Giới thiệu một số state

Quản lý luồng dữ liệu và trạng thái có thể là một nhiệm vụ đầy thách thức. Để minh họa việc này dễ dàng như thế nào với Compose, hãy tạo một ứng dụng counter đơn giản.

Jetpack Compose áp dụng các ý tưởng từ các UI framework hiện đại khác như Flutter và React để xử lý state.

```java
@Composable
fun MyApp() {
    MaterialTheme { Counter() }
}

@Composable
fun Counter() {
    val amount = +state { 0 }

    Column {
        Text(text = "Counter demo")
        Button(text = "Add", onClick = { amount.value++ })
        Button(text = "Subtract", onClick = { amount.value-- })
        Text(text = "Clicks: ${amount.value}")
    }
}
```

Trong bản demo ở trên, chúng ta có nút "Add" và "Subtract" cùng với một nhãn hiển thị số lần nhấn hiện tại. Như bạn có thể thấy bên dưới, bằng cách cập nhật state cho "amount", các widget tự cập nhật (recompose) lại trên giao diện của chúng khi trạng thái thay đổi.

![](https://images.viblo.asia/8ba82d88-264a-4540-a93f-0e6837351cbe.gif)

### Custom State Models

Thay vì sử dụng `+state {}` để tạo ra một model cho một giá trị, chúng ta cũng có thể tạo model tùy chỉnh bằng cách sử dụng chú thích @Model. Chúng ta có thể cải thiện hơn nữa ứng dụng counter của mình bằng cách chia nhỏ nó thành các widget nhỏ hơn và tạo một model cho các widget khác nhau để chúng có thể tự cập nhật và hiển thị trạng thái từ model đó.
    
```java
@Model
class CounterModel {
    var counter: Int = 0
    var header = "Counter demo"

    fun add() { counter++ }

    fun subtract() { counter-- }
}
```
    
Bằng cách sử dụng chú thích @Model, plugin Compose Compiler làm cho tất cả các biến trong model của bạn có thể quan sát được để chúng có thể được sử dụng để biên dịch lại các widget của bạn. Hãy cập nhật thử widget sử dụng CounterModel này:
    
```java
@Composable
fun Counter(counterModel: CounterModel) {
    Column {
        CounterHeader(counterModel)
        AddSubtractButtons(counterModel)
        CounterLabel(counterModel)
    }
}

@Composable
fun CounterHeader(counterModel: CounterModel) {
    Text(text = counterModel.header)
}

@Composable
fun AddSubtractButtons(counterModel: CounterModel) {
    Button(
        text = "Add",
        onClick = { counterModel.add() })
    Button(
        text = "Subtract",
        onClick = { counterModel.subtract() })
}

@Composable
fun CounterLabel(counterModel: CounterModel) {
    Text(text = "Clicks: ${counterModel.counter}")
}
```
    
Widget duy nhất mà ứng dụng counter có giờ được chia thành nhiều widget nhỏ hơn. CounterModel được truyền xung quanh cho các widget khác nhau, để hiển thị dạng trạng thái của mô hình đó hoặc để biến đổi trạng thái của mô hình bằng cách gọi hàm add() hoặc subtract().

### Không cần sử dụng View nữa

Các Jetpack Compose widget không sử dụng View hay Fragment nữa, chúng chỉ là các phương thức để vẽ lên canvas. Plugin Compose Compiler xử lý tất cả các phương thức với chú thích @Composable và tự động cập nhật cấu trúc phân cấp UI.

Ví dụ: widget Divider bao gồm widget Padding, Padding lại chứa thêm widget DrawFillRect. Nhìn vào mã nguồn của DrawFillRect, ta sẽ thấy được nó vẽ một đường thẳng trực tiếp lên canvas. Tất cả các widget khác được triển khai theo cùng một cách.
    
```java
@Composable
private fun DrawFillRect(brush: Brush) {
    Draw { canvas, parentSize ->
        val paint = Paint()
        brush.applyBrush(paint)
        canvas.drawRect(parentSize.toRect(), paint)
    }
}
```
    
Nhìn vào Layout Inspector (Trình kiểm tra bố cục) trong khi chạy một trong các ứng dụng mẫu của Google cho thấy rõ ràng rằng không hề có một thành phần View hay ViewGroups nào trong ứng dụng Android sử dụng Compose. FrameLayout chứa CraneWrapper mà chúng ta đã tạo trong mã, từ đó hệ thống phân cấp UI Compose được vẽ trên màn hình.
    
![](https://images.viblo.asia/beb828db-99a5-484f-a55e-c17e31c485a2.png)
   
Không sử dụng các View cũng có nghĩa là Jetpack Compose không thể tận dụng các View hiện có như android.widget.Button và phải xây dựng tất cả các widget từ đầu. Ví dụ, Flutter có cách tiếp cận tương tự và cho thấy đây là một công việc khá tốn thời gian. Đây là một trong những lý do khiến cho Jetpack Compose sẽ mất một thời gian nữa trước khi được sẵn sàng sử dụng trong việc phát triển sản phẩm.

### Tất cả mọi thứ là một widget

Rất giống với Flutter, mọi thứ đều là một widget trong Compose. Các widget phức tạp hơn đã được chia thành các widget rất cụ thể với trách nhiệm rõ ràng. Do đó, ngay cả padding, space, margin, ... cũng là một widget. Ví dụ: nếu bạn muốn thêm padding xung quanh button của mình, bạn chỉ cần bọc nó trong padding widget:
    
```java
Padding(padding = 16.dp) {
    Button(text = "Say hello", onClick = { ... })
}
```
    
### Sử dụng mã với UI

Ta có thể dễ dàng sử dụng Kotlin với các widget UI. Ví dụ: nếu bạn muốn hiển thị một số UI có điều kiện hoặc lặp đi lặp lại, bạn có thể dễ dàng hiển thị danh sách các tên như dưới đây.
    
```java
Column {
    listOf("John", "Julia", "Alice", "Mark").forEach {
        Text(text = it)
    }
}
```
    
Đây là một tính năng thực sự mạnh mẽ, nhưng bạn nên cẩn thận không đưa ra quá nhiều logic trong UI của mình.

### Tương thích với ứng dụng Android hiện có của bạn

Compose được thiết kế theo cách mà bạn có thể thêm nó vào ứng dụng hiện có của mình và dần dần chuyển một số phần của giao diện người dùng của bạn sang framework mới này. Các ví dụ trên thêm Jetpack Compose UI vào một Activity. Nó cũng có thể nhúng các Compose widget vào trong bố cục XML hiện có bằng cách sử dụng chú thích GenerateView:

```java
@Composable
@GenerateView
fun Greeting(name: String) { /* … */ }

// In some existing layout.xml
<GreetingView app:name=”John” />
```

### Kết luận

Compose giải quyết một vấn đề đang ngày càng nhức nhối khi phát triển ứng dụng Android. Nó giúp việc phát triển được nhanh nhẹn hơn, tiết kiệm thời gian để tập trung vào việc xây dựng trải nghiệm người dùng tuyệt vời và với trách nhiệm rõ ràng của từng widget giúp ta tránh được tối đa các lỗi.

Compose sẽ còn một con đường dài phía trước trước khi được đưa vào sử dụng rộng rãi. Tuy nhiên, tôi nghĩ rằng đây là thời điểm thích hợp để chúng ta biết về Jetpack Compose. Những người phát triển framework này đang tích cực tìm kiếm thông tin phản hồi và trong giai đoạn này vẫn có thể thực hiện các thay đổi để cải thiện framework hơn.