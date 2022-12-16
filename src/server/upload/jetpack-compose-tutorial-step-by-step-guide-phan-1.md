Trong series này mình sẽ giới thiệu về Jetpack Compose, một bộ công cụ hiện đại để xây dựng giao diện cho các ứng dụng Android. Chúng ta sẽ học cách để sử dụng các component cơ bản như Text, TextField, Preview, Column, Row, Button, Card, AlertDialog, MaterialDesign, ... Series học Jetpack Compose của mình sẽ chia thành 3 phần để các bạn không cảm thấy buồn ngủ  và chán nản khi đọc một bài viết quá dài. 

**Lưu ý**: Để sử dụng Jetpack Compose, bạn cần có phiên bản Canary mới nhất của Android Studio 4.2. Vì vậy, bạn có thể chuyển sang trang https://developer.android.com/studio/preview và tải xuống phiên bản Canary mới nhất, sau đó hãy tạo một Empty Compose Activity.

# I. Composable Function
Trong Jetpack Compose, Composable Function được sử dụng để định nghĩa tất cả giao diện người dùng của ứng dụng. Vì vậy, bạn không cần sử dụng bất kỳ tệp XML nào, tất cả những gì bạn cần làm chỉ là tạo một composable function bằng cách sử dụng annotation @Composable. Cú pháp cơ bản của hàm Composable là:

```Kotlin
@Composable
fun AnyUiComponent() {
    // Code for UI element
}
```

Bây giờ, bạn đã biết Composable Function là gì và cách tạo một hàm Composable. Mình sẽ chuyển sang ví dụ về Text.

# II. Displaying a Simple Text
Trong phần này, chúng ta sẽ học cách hiển thị một đoạn text đơn giản bằng cách sử dụng Text Composable. Ví dụ:

```Kotlin
@Composable
fun SimpleText(displayText: String) {
    Text(text = displayText)
}
```

Chúng ta có thể thấy hàm SimpleText() là một Composable Function và bên trong hàm SimpleText() sử dụng Text truyền vào displayText. Bây giờ, bạn có thể gọi hàm SimpleText này từ khối setContent bên trong phương thức onCreate của Acivity.

```Kotlin
class SimpleTextActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                SimpleText(getString("I am learning Compose"))
            }
        }
    }
}
```

Ở đây, mình đang sử dụng thuộc tính Column để hiển thị một số nội dung theo chiều dọc và bên trong Column mình đang gọi hàm SimpleText.

# III. Applying Styles to a Text
Chúng ta có thể áp dụng nhiều style khác nhau cho một đoạn text như tăng cỡ chữ, thay đổi màu, ... Cùng theo dõi hàm SetTextStyling của mình bên dưới đây nhé:

```Kotlin
@Composable
fun SetTextStyling(displayText: String, style: TextStyle? = null, maxLines: Int? = null) {
    Text(
        text = displayText,
        modifier = Modifier.padding(16.dp),
        style = style ?: TextStyle.Default,
        overflow = TextOverflow.Ellipsis,
        maxLines = maxLines ?: Int.MAX_VALUE
    )
}
```

Mình sẽ giải thích các tham số được sử dụng trong hàm trên:
* displayText: Đoạn text mà bạn muốn hiển thị
* style: Style áp dụng cho đoạn text
* maxLines: Quy định số dòng tối đa mà đoạn text có thế hiển thị. Nếu đoạn text được set chiếm số dòng trên màn hình nhiều hơn số dòng chúng ta quy định trong maxLine thì dấu (...) sẽ được hiển thị.

Để thiết đặt size text chúng ta viết như sau:

```Kotlin
style = TextStyle(
    fontSize = 24.sp
)
```

Nếu bạn muốn hiển thị chữ đậm:

```Kotlin
style = TextStyle(
    fontWeight = FontWeight.Bold
)
```

Tương tự, bạn có thể thay đổi textColor, font-family, underline text, ...

# IV. Taking inputs using TextField
Cũng giống như EditText, trong Compose chúng ta có thể sử dụng TextField và BaseTextField. BaseTextField vẫn đang trong giai đoạn thử nghiệm và có thể bị xóa hoặc thêm vĩnh viễn bất cứ lúc nào. Vì vậy, để sử dụng BaseTextField, bạn cần thêm annotation @ExperimentalFoundationApi.

Sau đây là một ví dụ đơn giản về BaseTextField:

```Kotlin
@ExperimentalFoundationApi
@Composable
fun SimpleTextFieldComponent() {
    Surface(color = Color.LightGray, modifier = Modifier.padding(16.dp)) {
        var text by remember { mutableStateOf(TextFieldValue("Enter text here")) }
        BaseTextField(
            value = text,
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            onValueChange = {
                text = it
            }
        )
    }
}
```

Trong hàm trên, mình khai báo BaseTextField bên trong Surface, sử dụng callback có tên là onValueChange. Callback sẽ được gọi khi có sự thay đổi về text mà người dùng nhập vào và đoạn text thay đổi sẽ được cập nhật giá trị bên trong callback.

Material Design cũng cung cấp một Composable cho EditText đó là TextField. Cách triển khai đơn giản của TextField như sau:

```Kotlin
@Composable
fun SimpleMaterialTextFieldComponent() {
    var text by savedInstanceState { "" }
    TextField(
        value = text,
        modifier = Modifier.padding(16.dp).fillMaxWidth(),
        onValueChange = { text = it },
        label = { Text("Label") }
    )
}
```

TextField hoạt động tương tự như BaseTextField. Bên trong TextField có một thuộc tính khác đó là label, nó giống như chúng ta sử dụng EditText và sử dụng thuộc tính hint. Label được hiển thị bên trong TextField khi TextField không chứa bất kỳ ký tự nào.

Chúng ta có thể tùy chỉnh BaseTextField và TextField bằng cách truyền vào các tham số như ví dụ sau đây:
* Chỉ hiển thị bàn phím số:

```Kotlin
var text by remember { mutableStateOf(TextFieldValue("0123")) }
BaseTextField(value = text,
    keyboardType = KeyboardType.Number,
    onValueChange = {
        text = it
    }
)
```

* Nhập password:

```Kotlin
keyboardType = KeyboardType.Password,
visualTransformation = PasswordVisualTransformation()
```

* Thêm placeholder cho TextField (placeholder là đoạn text hiển thị khi TextField empty và focused):

```Kotlin
placeholder = { Text("MindOrks") }
```

Khá là đơn giản phải không nào, ngoài ra chúng ta có thể thêm icons, hiển thị message lỗi bên trong TextFiled, chỉ định errorColor, backgroundColor, intractionState, activeColor, inactiveColor ... Bạn có thể thử những thuộc tính này và tự mình xem thành quả bên trong Android Studio. Bạn có thể preview bất kỳ thuộc tính UI nào, hãy cùng xem cách làm thế nào nhé :D

# V. Preview in Android Studio
Android Studio cung cấp những tính năng thật tuyệt vời để xem trước các thành phần UI mà không cần phải build lên app. Bất cứ khi nào bạn muốn kiểm tra một UI component nào đó chỉ cần tạo ra một Composable function và thêm annotation @Preview.

```Kotlin
// This is a Composable function to display a Text
@Composable
fun SimpleText(displayText: String) {
    Text(text = displayText)
}

@Preview
@Composable
fun SimpleTextPreview() {
    SimpleText("Hi I am learning Compose")
}
```

Giờ thì bạn có thể xem trước kết quả giao diện của hàm SimpleText ở tab preview (nằm phía bên phải của Android Studio). Nếu bạn click vào bất cứ thành phần UI nào trên preview, Android Studio sẽ đưa bạn đến vị trí dòng code mà thành phần UI đó được tạo ra. Ngoài ra, bạn có thể đặt tên cho bản xem trước bằng cách sử dụng tham số name.

```Kotlin
@Preview(name = "Named Preview")
```

Mặc định tên của Preview sẽ là tên của hàm, dưới đây là giới thiệu về tính năng preview bên trong Android Studio:

![](https://images.viblo.asia/3f497a28-dd10-4766-a70e-f8e841b81dc2.jpg)

**Lưu ý:** Bạn không thể truyền tham số cho hàm Preview Composable

# VI. Preview Parameter
Trong phần trước, mình đã giới thiệu cách sử dụng tính năng xem trước của Android Studio. Bây giờ, khi muốn tạo ra một ứng dụng Android, thông thường sẽ là app nhận dữ liệu từ server trả về rồi hiển thị dữ liệu đó lên màn hình. Một câu hỏi được đặt ra đó là làm thế nào chúng ta xem trước được khi có dữ liệu trả về UI của chúng ta sẽ hiển thị thế nào ? Trong trường hợp này, chúng ta sẽ sử dụng @PreviewParameter annotation.

Ý tưởng chính ở đây chính là tạo dữ liệu dummy rồi truyền dữ liệu đó vào Preview Composable Function. Ở phần trước trong mục lưu ý mình có nói là *Bạn không thể truyền tham số cho hàm Preview Composable*, vì vậy để truyền được tham số thì bạn cần @PreviewParamter annotation.

Hãy cùng mình tạo dữ liệu dummy nhé. Mình tạo một data class đặt tên là Blog có hai thuộc tính là name và author:

```Kotlin
data class Blog(
    val name: String,
    val author: String
)
```

Sau đó mình tạo một class đặt tên là DummyBlogProvider:

```Kotlin
class DummyBlogProvider : PreviewParameterProvider<Blog> {
    override val values =
        sequenceOf(Blog("Learning Compose", "MindOrks"), Blog("Learning Android", "MindOrks"))
    override val count: Int = values.count()
}
```

Tạo xong dữ liệu rồi chúng ta có thể dùng dữ liệu này trong phần xem trước:

```Kotlin
@Preview
@Composable
fun BlogInfo(@PreviewParameter(DummyBlogProvider::class) blog: Blog) {
    SimpleTextComponent("${blog.name} by ${blog.author}")
}
```

Phần 1 cũng khá là dài rồi, ở phần 2 mình sẽ giới thiệu Column, Box, Button, Card, Clickable, Image và phần 3 sẽ là Material + Animation. Các bạn hãy đón đọc các phần tiếp theo nhé :D

# VII. Tài liệu tham khảo
Project tìm hiểu Jetpack Compose trong Android bằng ví dụ: https://github.com/MindorksOpenSource/Jetpack-Compose-Android-Examples
https://blog.mindorks.com/jetpack-compose-tutorial