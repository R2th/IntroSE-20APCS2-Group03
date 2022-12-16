Như các bạn đã biết, Material cho phép chúng ta có một giao diện người dùng thống nhất tuân theo các nguyên tắc và phương pháp hay nhất về giao diện người dùng Android, nhưng đồng thời, nó rất hạn chế khi ứng dụng cần mức độ tùy chỉnh UI phức tạp hơn.
 Trong bài đăng này, chúng ta sẽ tìm hiểu cách điều chỉnh, tùy chỉnh và mở rộng Compose Material Theme để đáp ứng các yêu cầu về UI ứng dụng của bạn và loại bỏ các hạn chế của Material.
##  Mở rộng Material colors

Compose cung cấp class `Colors` để tạo mô hình cho hệ thống màu Material bao gồm chín màu và hai chức năng để xác định các tập hợp màu sáng và tối.

Theo kinh nghiệm của chúng tôi, hầu hết các ứng dụng cần nhiều hơn 9 màu. Ví dụ: màu text link hoặc màu nền của tiêu đề phụ là những trường hợp phổ biến báo hiệu sự cần thiết của nhiều màu hơn.

Một điều quan trọng ở đây là tất cả các màu này phải được xác định trong bảng màu của bạn vì chúng có thể thay đổi tùy thuộc vào cấu hình của hệ thống (chế độ sáng hoặc tối) hoặc trạng thái ứng dụng của bạn.

Giả sử chúng ta muốn xác định một `subtitleTextColor`, trong trường hợp này, Google đề xuất một cách để làm điều đó:

```
@get:Composable
val Colors.subtitleTextColor: Color
    get() = if (isLight) Red300 else Red700
```

Quan sát kỹ đoạn code, bạn có thể thấy rằng `subtitleTextColor` chỉ dựa trên thuộc tính `light` của Material color. Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta muốn xử lý nhiều bảng màu trong cùng một ứng dụng, làm thế nào chúng ta có thể đạt được điều đó?

Cách tiếp cận mà chúng tôi sẽ sử dụng là xác định một class màu hoàn toàn mới có tên `AppColor`, class này sẽ giữ các màu tiêu chuẩn của Material  và thêm các màu tùy chỉnh của riêng.

```
@Stable
data class AppColors(
    val subtitleTextColor: Color,
    val materialColors: Colors,
){
 val primary: Color
  get() = materialColors.primary
  // Add other material colors properties
}
```
Sau đó, `AppColors` giữ tất cả các màu của ứng dụng. Mỗi ứng dụng cũng có thể xác định nhiều bảng màu, thường chọn một hoặc khác tùy thuộc vào trạng thái của ứng dụng. Giả sử bây giờ chúng ta muốn xác định hai bảng màu, một bảng dựa trên màu xanh lam và bảng còn lại dựa trên màu hồng:

```
enum class AppColorPalette {
  BLUE,
  PINK,
}

// AppCustomColors is private because we shouldn't expose a color that is not in a theme
private object AppCustomColors {
  val PINK_AMARANTH = Color(0xffe91e63)
  val PINK_MAROON = Color(0xffc2185b)
  val PINK_MAUVELOUS = Color(0xfff48fb0)
}

private val darkPinkColors = AppColors(
    linkTextColor = AppCustomColors.PINK_AMARANTH,
    materialColors = darkColors(
        primary = AppCustomColors.PINK_MAUVELOUS,
        primaryVariant = AppCustomColors.PINK_MAROON,
        .... // Material Colors
    )

// Define lightPinkColors, darkBlueColors, lightBlueColors the same way

@Composable
fun appColors(colorPalette: AppColorPalette, darkTheme: Boolean): AppColors =
    when (colorPalette) {
      AppColorPalette.BLUE -> if (darkTheme) darkBlueColors else lightBlueColors
      AppColorPalette.PINK -> if (darkTheme) darkPinkColors else lightPinkColors
    }
```

Đưa ra bảng màu và UI mode, phương thức `appColors` trả về một `AppColors` instance.

Ngay bây giờ chúng ta có một phương pháp cung cấp bảng màu `AppColors`, nhưng sau đó làm cách nào để chúng ta có được bảng màu ứng dụng hiện tại? Material cung cấp một cách để có được bảng màu Material hiện tại, bằng cách gọi một phương thức `composable` có tên là `MaterialTheme.colors`. Để có được bảng màu tùy chỉnh, chúng ta sẽ sử dụng cùng một ý tưởng: chúng tôi sẽ gọi `AppTheme.colors` và lấy nó. Để làm được điều đó, chúng ta sẽ phải tạo app theme của mình, một custom theme là kết quả của việc soạn `MaterialTheme`: 

```
object AppTheme {
  val colors: AppColors
    @Composable
    @ReadOnlyComposable
    get() = LocalAppColors.current
}

private val LocalAppColors = staticCompositionLocalOf {
  defaultAppColors() // For instance, pink dark colors
}

@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    colorPalette: AppColorPalette = AppColorPalette.PINK,
    content: @Composable () -> Unit,
) {
  val colors = appColors(colorPalette = colorPalette, darkTheme = darkTheme)
  CompositionLocalProvider(
      LocalAppColors provides colors,
  ) {
    MaterialTheme(
        colors = colors.materialColors,
        content = content,
    )
  }
}
```

## Tạo custom resource cho theme của bạn

### Xác định dimensions

Chúng ta có thể sử dụng một cách tiếp cận tương tự ở đây và xác định một lớp dimensions:

```
@Immutable
data class AppDims(
    val textSizeSmall: TextUnit,
    val textSizeMedium: TextUnit,
    val textSizeRegular: TextUnit,

    val listItemVerticalPadding: Dp,
    val listItemHorizontalPadding: Dp,
)
```


```
@Composable
fun appDims() = if (LocalConfiguration.current.screenWidthDp < 300) {
  smallDeviceAppDims
} else {
  regularAppDims
}

private val regularAppDims = AppDims(
    textSizeSmall = 12.sp,
    textSizeMedium = 14.sp,
    textSizeRegular = 16.sp,

    listItemVerticalPadding = 27.dp,
    listItemHorizontalPadding = 30.dp,
)

private val smallDeviceAppDims = AppDims(
    textSizeSmall = 12.sp,
    textSizeMedium = 13.sp,
    textSizeRegular = 14.sp,

    listItemVerticalPadding = 15.dp,
    listItemHorizontalPadding = 14.dp,
)
```

Sau đó, bạn phải thêm `AppDims` vào `AppTheme` của mình giống như chúng ta đã làm với ví dụ `AppColors`

## Tổng kết

Compose sắp thay đổi cách chúng tôi xây dựng ứng dụng Android, đó là một cách tiếp cận hoàn toàn mới giúp đơn giản hóa đáng kể và tăng tốc phát triển giao diện người dùng.

Tạo Theme bằng Material Theme giúp đóng gói và sử dụng lại các styles và assets. Không có gì tệ hơn việc có một ứng dụng khổng lồ là một mớ hỗn độn liên quan đến chủ đề, quản lý nội dung và cấu hình.

Nguồn:<br/>
https://developer.android.com/jetpack/compose <br/>
https://developer.android.com/jetpack/compose/themes <br/>
https://github.com/xmartlabs/gong <br/>
https://blog.xmartlabs.com/blog/extending-material-theme-in-jetpack-compose/