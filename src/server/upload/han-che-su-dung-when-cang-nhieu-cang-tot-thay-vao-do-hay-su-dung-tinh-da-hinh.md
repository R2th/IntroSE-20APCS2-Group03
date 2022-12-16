*Một tips nhỏ cho lập trình viên Android*

![](https://images.viblo.asia/fadeb311-cdf7-4bfa-af99-b42fa357f6e2.jpg)

Câu lệnh `when` thường bị coi là code xấu và nên tránh.

Giả sử `Button` cần phát triển với 5 kích thước được xác định trước:
*     small (height = 16dp)
*     medium (height = 24dp)
*     large (height = 32dp)
*     huge (height = 40dp)
*     custom

```swift
sealed class ButtonSize {
    object Small : ButtonSize()
    object Medium : ButtonSize()
    object Large : ButtonSize()
    object Huge : ButtonSize()
    data class Custom(val heightDpInt: Int) : ButtonSize()
}

@Composable
fun RenderButton(
    buttonSize: ButtonSize,
    onButtonClick: () -> Unit,
    text: String
) {
    Button(
        modifier = Modifier.height(buttonSize.getButtonHeight()).fillMaxWidth(),
        onClick = onButtonClick,
        content = { Text(text = text) }
    )
}

private fun ButtonSize.getButtonHeight(): Dp {
    return when (this) {
        ButtonSize.Small -> 16.dp
        ButtonSize.Medium -> 24.dp
        ButtonSize.Large -> 32.dp
        ButtonSize.Huge -> 40.dp
        is ButtonSize.Custom -> this.heightDpInt.dp
    }
}
```

Hãy nhìn kỹ hơn hàm getButtonHeight và hiểu điều gì sai ở đây.
```shell
private fun ButtonSize.getButtonHeight(): Dp {
    return when (this) { // Useless checking type
        ButtonSize.Small -> 16.dp // code duplication
        ButtonSize.Medium -> 24.dp // code duplication
        ButtonSize.Large -> 32.dp // code duplication
        ButtonSize.Huge -> 40.dp // code duplication
        is ButtonSize.Custom -> this.heightDpInt.dp // code duplication
    }
}
```

Hai vấn đề liên quan đến sự trùng lặp code:
* Khởi tạo Dp từ Int
* Thêm việc kiểm tra lúc runtime. Chúng ta đã quyết định trong ViewModel chiều cao của Button nên được sử dụng. Tại sao lại phải kiểm tra thêm? Nó vô dụng. Hơn nữa, nó làm tăng thời gian chạy. Tài nguyên của điện thoại Android có thể được sử dụng cho các hoạt động khác có giá trị hơn - ví dụ: chạy animation.

```swift
class ViewModel(
    // ...
): ViewModel(){

  val buttonSizeLiveData = MutableLiveData<ButtonSize>()

  // ...

  private fun methodThatDoesSomething() {
    // ...
    buttonSizeLiveData.post(ButtonSize.Small) // Here we decided what size should be rendered
    // ...
  }
  // ...
}

private fun ButtonSize.getButtonHeight(): Dp {
    val heightInt = when (this) {
        ButtonSize.Small -> 16 // Code duplication! Type-checking should be avoided!
        ButtonSize.Medium -> 24
        ButtonSize.Large -> 32
        ButtonSize.Huge -> 40
        is ButtonSize.Custom -> this.heightDpInt
    }
    return heightInt.dp // Here we fixed the 1st code duplication problem
}
```

Hãy loại bỏ việc kiểm tra. Tất cả những gì chúng ta nên làm là thay thế "when" bằng đa hình.
```scala
/*
 * Here we moved dp values from getButtonHeight method.
 * getButtonHeight method has been removed.
 */
sealed class ButtonSize(open val heightDpInt: Int) {
    object Small : ButtonSize(16)
    object Medium : ButtonSize(24)
    object Large : ButtonSize(32)
    object Huge : ButtonSize(40)
    data class Custom(override val heightDpInt: Int): ButtonSize(heightDpInt)

    fun getHeightDp(): Dp {
      return  heightDpInt.dp
    }
}

@Composable
fun RenderButton(
    buttonSize: ButtonSize,
    onButtonClick: () -> Unit,
    text: String
) {
    Button(
        modifier = Modifier.height(buttonSize.getHeightDp()).fillMaxWidth(),
        onClick = onButtonClick,
        content = { Text(text = text) }
    )
}
```

Hãy làm cho ví dụ phức tạp hơn. Giả sử rằng văn bản (text) và màu chữ của Button phụ thuộc vào ButtonSize. Chúng tôi sẽ xem xét cả hai trường hợp.
So sánh hai đoạn mã dưới đây:
```scala
sealed class ButtonSize(
    open val heightDpInt: Int,
    open val color: Color,
    open val textResId: Int
) {
    object Small : ButtonSize(16, Color.Red, R.string.small_button_text)
    object Medium : ButtonSize(24, Color.Gray, R.string.medium_button_text)
    object Large : ButtonSize(32, Color.Green, R.string.large_button_text)
    object Huge : ButtonSize(40, Color.Blue, R.string.huge_button_text)
    data class Custom(
        override val heightDpInt: Int,
        override val color: Color,
        override val textResId: Int
    ) : ButtonSize(heightDpInt, color, textResId)

    fun getHeightDp(): Dp {
        return heightDpInt.dp
    }
}

@Composable
fun RenderButton(
    buttonSize: ButtonSize,
    onButtonClick: () -> Unit
) {
    Button(
        modifier = Modifier
            .height(buttonSize.getHeightDp())
            .fillMaxWidth(),
        onClick = onButtonClick,
        colors = ButtonDefaults.buttonColors(
            backgroundColor = buttonSize.color,
        ),
        content = {
            Text(text = stringResource(buttonSize.textResId))
        }
    )
}
```
<div align="center">Ví dụ với tính đa hình</div>

```swift
sealed class ButtonSize() {
    object Small : ButtonSize()
    object Medium : ButtonSize()
    object Large : ButtonSize()
    object Huge : ButtonSize()
    data class Custom(
        val heightDpInt: Int,
        val color: Color,
        val textResId: Int
    ) : ButtonSize()
}

@Composable
fun RenderButton(
    buttonSize: ButtonSize,
    onButtonClick: () -> Unit
) {
    Button(
        modifier = Modifier
            .height(buttonSize.getButtonHeight())
            .fillMaxWidth(),
        onClick = onButtonClick,
        colors = ButtonDefaults.buttonColors(
            backgroundColor = buttonSize.getButtonColor(),
        ),
        content = {
            Text(text = stringResource(buttonSize.getButtonText()))
        }
    )
}

private fun ButtonSize.getButtonHeight(): Dp {
    return when (this) {
        ButtonSize.Small -> 16 // Code duplication
        ButtonSize.Medium -> 24 // Code duplication
        ButtonSize.Large -> 32 // Code duplication
        ButtonSize.Huge -> 40 // Code duplication
        is ButtonSize.Custom -> this.heightDpInt // Code duplication
    }
}

private fun ButtonSize.getButtonText(): Int {
    return when (this) {
        ButtonSize.Small -> R.string.small_button_text // Code duplication
        ButtonSize.Medium -> R.string.medium_button_text // Code duplication
        ButtonSize.Large -> R.string.large_button_text // Code duplication
        ButtonSize.Huge -> R.string.huge_button_text // Code duplication
        is ButtonSize.Custom -> this.textResId // Code duplication
    }
}

private fun ButtonSize.getButtonColor(): Color { 
  return when (this) {
        ButtonSize.Small -> Color.Red // Code duplication
        ButtonSize.Medium -> Color.Gray // Code duplication
        ButtonSize.Large -> Color.Green // Code duplication
        ButtonSize.Huge -> Color.Blue // Code duplication
        is ButtonSize.Custom -> this.color // Code duplication
    }
}
```
<div align="center">Ví dụ với biểu thức "when"</div>

**Lợi ích của Đa hình:**
*      Nó làm cho codebase nhỏ hơn.
*      Nó là dễ dàng hơn để mở rộng chức năng.
*      Nó giúp loại bỏ sự trùng lặp mã.
*      Nó làm giảm chi phí thời gian chạy.