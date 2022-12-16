Espresso là một framwork của Android cung cấp giải pháp hỗ trợ cho việc triển khai Automation testing. Thực tế cho thấy đâu là một công cụ mạnh mẽ giúp bạn có thể đồng bộ hóa quá trình chạy test script một cách tự động với app của mình trên device Android.

### Basic example
```kotlin
onView(withId(R.id.my_text_view)).check(matches(withText("My text")));
```
Trên đây là một ví dụ đơn giản khi ta sử dụng Espresso. Với ví dụ trên thì Espresso sẽ tìm kiếm một view mà có Id là `R.id.my_text_view` và thực hiện một hành động kiểm tra là `check(....)`. Bên trong hành động check() này ta có thể đưa ra những `matches` để cài đặt điều kiện kiểm tra cho hành động của mình. Espresso cung cấp khá nhiều nhưng `matches` để ta có thể sử dụng sẵn như `withText`  `withId` ... Tuy nhiên, trong nhiều trường hợp phúc tạp hơn hoặc đối với những bài toán cụ thể với từng dự án thì chúng ta phải custom một `matches`  với nhưng điều kiện riêng. Và bài viết này sẽ hướng dẫn việc custom một `matches`.
### Writing your own Matcher
Đầu tiên ta cần tạo một class kế thừ class BaseMatcher của Espresso và truyền một generics như sau :
```kotlin
class HintTextColorMatcher extends BoundedMatcher<View, TextView> {
}
```
Matcher này sẽ được áp dụng với  `View` nhưng nó chỉ hoạt động với `TextView` mà thôi

Tiếp theo ta cần khai báo `constructor` và ta super một class chính là view class mà ta muốn Matcher này áp dụng. Với chúng ta bây giờ TextView:
```kotlin
class HintTextColorMatcher extends BoundedMatcher<View, TextView> {
  private HintTextColorMatcher() {
    super(TextView.class);
  }
}
```
Một Matcher sẽ cung cấp 2 API đó là:
* `matchesSafely`: Nơi bạn sẽ kiểm tra xem thành phần đã cho có khớp với tiêu chí của bạn không
* `describeTo`: Cho phép bạn chỉ định nội dung text sẽ được hiển thị trong trường hợp Trình so khớp này không khớp(sẽ đc hiển thì ở phần Log)

Một triển khai đơn giản có thể trông như thế này khi bạn kiểm tra xem nó có khớp với màu đỏ không:
```kotlin
class HintTextColorMatcher extends BoundedMatcher<View, TextView> {
  @Override protected boolean matchesSafely(TextView item) {
    return item.getCurrentHintTextColor() == Color.RED;
  }
  @Override public void describeTo(Description description) {
    description.appendText("with hint text color:")
      .appendValue(Color.RED);
 }
}
```
Bây giờ nếu bạn muốn sử dụng Matcher trên, bạn có thể sử dụng nó như thế này:
```kotlin
onView(withId(R.id.my_text_view)) .check(matches(new HintTextColorMatcher()));
```
Thậm chí chúng ta có thể làm tốt hơn khi cung cấp một factory method giúp người dùng có thể định kĩa màu muốn được kiểm tra : 
``` kotlin
class HintTextColorMatcher extends BoundedMatcher<View, TextView> {
  static HintTextColorMatcher withHintTextColor(int color) {
    return new HintTextColorMatcher(color);
  }
  private final int color;
  private HintTextColorMatcher(int color) {
    super(TextView.class);
    this.color = color;
  }
  @Override protected boolean matchesSafely(TextView item) {
    return item.getCurrentHintTextColor() == color;
  }
  @Override public void describeTo(Description description) {
    description.appendText("with hint text color:")
      .appendValue(color);
  }
}
```
Điều này cho phép chúng ta giữ nguyên mô hình như các Matcher khác.
```
onView(withId(R.id.my_text_view)).check(matches(withHintTextColor(Color.RED)));
```
### Conclusion
Trên đây là chia sẻ về cách custom một Matcher khi sử dụng Espresso. Mong có thể giúp ích cho bạn trong quá trình làm việc với Espresso. 

refer: