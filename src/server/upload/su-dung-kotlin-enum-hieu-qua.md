Enumerations có hình thức khai báo là `enum class`, được biết như là một đại diện xấu trên Android. Trong thực tế, các tài liệu chính thức đã [đề nghị tránh dùng chúng](https://developer.android.com/topic/performance/reduce-apk-size#remove-enums). Nhưng đồng thời, [Effective Java](https://www.amazon.com//dp/0134685997) lại có hẳn một chapter viết đầy đủ về `enum`.

Trong bài viết này, chúng ta sẽ tách mình khỏi các chi tiết cụ thể của Android và chỉ quan tâm đến các đoạn mã có liên quan đến enum hữu ích.

# Declaration
## Naming
Sử dụng `CamelCase` chứ không sử dụng ký hiệu `UPPERCASE` để đặt tên cho `sealed class`.
```
sealed class Level {
    data class HIGH(val value: Long) : Level()
    data class LOW(val value: Short) : Level()
}
```

Đối với Enumerations là không quá khác biệt.
```
enum class Fruit {
    Apple, Orange
}
```

## Commas
Chúng ta có một enum là `Screen`.
```
enum class Screen(val analyticsName: String) {
    SignIn("Sign In")
}
```

Tại một số thời điểm chúng ta cần thêm một trường hợp khác cho `Screen` - `SignUp`.
```
enum class Screen(val analyticsName: String) {
    SignIn("Sign In"),
    SignUp("Sign Up")
}
```

Trông có vẻ ổn, nhưng thay đổi này nhìn từ phối cảnh VCS sẽ như sau:
```
- SignIn("Sign In")
+ SignIn("Sign Up"),
+ SignUp("Sign Up")
```

Cách tiếp cận này làm cho khó thấy qua các thay đổi của SignIn. Thay đổi SignIn cuối cùng lại được gắn với SignUp. Chúng ta có thể giải quyết điều này bằng cách đặt dấu phẩy sau mỗi trường hợp liệt kê.
```
enum class Screen(val analyticsName: String) {
    SignIn("Sign In"),
    SignUp("Sign Up"),
}
```

Bằng cách này, sự thay đổi của VCS trở nên tối thiểu.
```
+ SignUp("Sign Up"),
```

# Usage
## Constants Namespacing
Cách tiếp cận trực tiếp để tạo không gian tên là sử dụng tiền tố.
```
companion object {
    const val SHARED_PREFERENCE_KEY_TOKEN = "token"
    const val SHARED_PREFERENCE_KEY_SESSIONS_COUNT = "sessions-count"
}
```

Cách tiếp theo - đặt tên `companion object`.
```
companion object SharedPreferenceKeys {
    const val TOKEN = "token"
    const val SESSIONS_COUNT = "sessions-count"
}
```

Có một nhược điểm - một class chỉ có thể có một `companion object` duy nhất, được đặt tên hoặc không. `enum` thì không có những hạn chế như vậy.
```
enum class SharedPreferenceKey(val value: String) {
    Token("token"),
    SessionsCount("sessions-count"),
}
```

## Abstraction
### API
Hãy tưởng tượng rằng một backend trả về các mã code trong các phản hồi lỗi error response.
```
data class ErrorResponse(@SerializedName("code") val code: String)
```

Đây là một khai báo tốt nhưng việc sử dụng trở nên lặp đi lặp lại và dễ bị lỗi chính tả.
```
if (error.code == "not_found") {
    throw RuntimeException()
}

// ... 1_000_000 LOC ...

// Oops!
if (error.code == "not__found") {
    throw RuntimeException()
}
```

Enumerations  là hoàn hảo cho việc này.
```
enum class ErrorCode(val value: String) {
    @SerializedName("not_found") NotFound,
    @SerializedName("unauthorized") Unauthorized,
}

data class ErrorResponse(@SerializedName("code") val code: ErrorCode?)
```

### Android Resources
Có thể định nghĩa `enum` trong `XML` rất hữu ích khi custom `view`.
```
<declare-styleable name="NavigationBar">
    <attr name="navigationIcon">
        <enum name="back" value="0"/>
        <enum name="close" value="1"/>
        <enum name="menu" value="2"/>
    </attr>
</declare-styleable>
```

```
<NavigationBar
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    application:navigationIcon="close"/>
```

Thay vì dùng kiểu `Int` trong `NavigationBar.kt`, tốt hơn là khai báo một `enum` để nhân bản `XML` trực tiếp.
```
enum class NavigationIcon(val attrValue: Int) {
    Back(0),
    Close(1),
    Menu(2),
}
```

```
val defaultIcon = NavigationIcon.Back

val icon = attrs.getInt(R.styleable.NavigationBar_navigationIcon, defaultIcon.attrValue).let { attrValue ->
    NavigationIcon.values().find { it.attrValue == attrValue } ?: defaultIcon
}
```

## Iterating
### Templates
Giả sử rằng chúng ta cần kết xuất một trang HTML. Vì chúng ta muốn giữ đồng bộ màu ứng dụng và màu HTML, chúng ta cần dịch tài nguyên sang các giá trị hex RGBA.

Đây là nơi phương thức `enum` `value()` trở nên hữu ích. Chúng ta có thể khai báo các liên kết màu, đi qua tất cả chúng và nhận CSS được xử lý.

```
enum class CssTemplateColor(val mask: String, @ColorRes val res: Int) {
    Background("color_background", R.color.white),
    Text("color_text", R.color.black),
}
```

```
val cssTemplate =
    """
    body {
        background-color: {{color_background}};
        color: {{color_text}};
    }
    """

val css = CssTemplateColor.values().fold(cssTemplate) { css, color ->
    css.replace("{{${color.mask}}}", "#${color.res.hexRgba()}")
}
```

### Tests
Điều này không hữu ích cho các cách tiếp cận dựa trên JUnit nhưng enumerations hiệu quả với bất kỳ thứ gì liên quan đến specification.
```
ErrorCode.values().forEach { errorCode ->

    it("creates error response from error code [${errorCode.name}]") {
        assertThat(api.response(errorCode)).isEqualTo(ErrorResponse(errorCode))
    }
}
```

Đây là một cách tương đương thô của JUnit test:
```
@Test fun `it creates error response`() {
    ErrorCode.values().forEach { errorCode ->
        assertThat(api.response(errorCode)).isEqualTo(ErrorResponse(errorCode))
    }
}
```

## `sealed class`
Cách sử dụng sealed class như sau là không hợp lý:
```
sealed class Color {
    object Red : Color()
    object Green : Color()
    object Blue : Color()
}
```

Nó hoàn toàn có thể thay thế bằng một `enum` đơn giản:
```
enum class Color {
    Red, Green, Blue
}
```

sealed class Color ở trên sẽ được biên dịch tương đương:
```
public abstract class Color {

    private Color() {
    }

    public static final class Red extends Color {
        public static final Color.Red INSTANCE = new Color.Red();
    }

    public static final class Green extends Color {
        public static final Color.Green INSTANCE = new Color.Green();
    }

    public static final class Blue extends Color {
        public static final Color.Blue INSTANCE = new Color.Blue();
    }
}
```

# Refactoring
## `sealed class` → `enum class`
Không cần phải có một `sealed class` với các `object`. Thay thế nó bằng `enum`.
```
sealed class RiskLevel {
    object Low : RiskLevel()
    object Medium : RiskLevel()
    object High : RiskLevel()
}
```
⬇️
```
enum class RiskLevel { Low, Medium, High }
```

## Methods → Fields
Chúng ta có thể đặt giá trị kết quả của `inline method` vào `enum` vì cả hai đều hoạt động giống nhau.
```
private fun getPageForRiskLevel(riskLevel: RiskLevel): Int {
    return when (riskLevel) {
        RiskLevel.Low -> R.raw.low_risk_error_pages
        RiskLevel.Medium -> R.raw.medium_and_high_risk_error_pages
        RiskLevel.High -> R.raw.medium_and_high_risk_error_pages
    }
}

private fun getStyleForRiskLevel(riskLevel: RiskLevel): Int {
    return when (riskLevel) {
        RiskLevel.Low -> R.raw.low_and_medium_risk_error_style
        RiskLevel.Medium -> R.raw.low_and_medium_risk_error_style
        RiskLevel.High -> R.raw.high_risk_error_style
    }
}
```
⬇️
```
enum class RiskLevel(@RawRes val html: Int, @RawRes val css: Int) {
    Low(R.raw.low_risk_error_pages, R.raw.low_and_medium_risk_error_style),
    Medium(R.raw.medium_and_high_risk_error_pages, R.raw.low_and_medium_risk_error_style),
    High(R.raw.medium_and_high_risk_error_pages, R.raw.high_risk_error_style),
}
```

## Khi sử dụng
Vì chúng ta không có method nữa nên chúng ta có thể tham chiếu tới các trường enum trực tiếp.
```
val htmlResource = getPageForRiskLevel(riskLevel)
val cssResource = getStyleForRiskLevel(riskLevel)

ErrorPages.createErrorPage(htmlResource, cssResource)
```
⬇️
```
ErrorPages.createErrorPage(riskLevel.html, cssResource.css)
```

# Kết luận
Như vậy chúng ta đã lược bỏ tối giản hóa được code, làm code trở nên declarative hơn.

Đây cũng là những trường hợp nên sử dụng enumeration mà không cần đến `sealed class`.

Ref: https://arturdryomov.online/posts/kotlin-enum-recipes/