Instrumentation testing là phương thức thường được sử dụng để kiểm thử UI, ở đó các test case mà dev đưa ra sẽ được chạy trực tiếp trên thiết bị thật, gần với trải nghiệm của người dùng nhất. Hãy cùng tìm hiểu xem với Android thì ta hiện thực phương thức này như thế nào nhé.
# Expresso là gì ?
Expresso là framework được Google cung cấp nhằm hiện thực Instrumentation testing với target audience là những người developer muốn sử dụng việc kiểm thử tự động trong suốt quá trình phát triển phần mềm
> Use Espresso to write concise, beautiful, and reliable Android UI tests.

Ngoài Expresso còn một số framework về kiểm thử khá nổi tiếng khác như: [Appium](https://appium.io/), [Calabash](https://github.com/calabash/calabash-android)...
# Bắt đầu với Expresso
## Cài đặt Expresso
Cài các dependencies bao gồm: `espresso-core` , `test:runner`,`test:rules`. Hãy thay đổi thành các version mới nhất thích hợp với thời điểm bạn đọc bài viết này nhé.
```kotlin
androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
androidTestImplementation 'androidx.test:runner:1.4.0'
androidTestImplementation 'androidx.test:rules:1.4.0'
```
## Cài đặt môi trường kiểm thử (instrumentation runner)
Thêm dòng sau vào block `android.defaultConfig`:
```kotlin
testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
```
## Tạo test class
Tại class bất kì, ta nhấn tổ hợp `Cmd + Shift + T`

![image.png](https://images.viblo.asia/044e95e3-88dc-4b6b-99ad-aa10b6caa959.png)

Thêm Anotation `@RunWith(AndroidJUnit4::class)`:
```kotlin
@RunWith(AndroidJUnit4::class)
class MainActivityTest {
}
```
Các Anotation dùng trong class:
* @BeforeClass: Thực thi trước khi khởi chạy test, thường dùng để kết nối network hoặc database
* @Before: Phương thức luôn được thực thi trước mỗi test case
* @Test: Phương thức đại diện cho một test case
* @After:Phương thức luôn được thực thi sau mỗi test case
* @AfterClass: Thực thi sau khi tất cả các test case đã chạy xong
### Lưu ý
Các test case khi chạy đều cần phải xác định nơi mà chúng bắt đầu. Điều này có thể được thực hiện với những cách sau:
* Thêm 1 @Before function để launch đúng activity:
```kotlin
@Before
fun setup() {
    launchActivity<MainActivity>()
}
```
* Sử dụng `ActivityTestRule` 
```kotlin
@Rule @JvmField
var activityRule = ActivityTestRule<MainActivity>(
        MainActivity::class.java
)
```
# Quá trình kiểm thử với Expresso
Bất kì công cụ kiểm thử nào đặt biệt là kiểm thử về mặt giao diện (UI Test) cũng tuân thủ theo những quy trình sao cho các test case có thể giả lập được tác vụ của người dùng. Để phục vụ cho điều đó, Expresso cung cấp công cụ tương ứng với các bước có thể có trong một test case:
![sd.png](https://images.viblo.asia/56ac8151-bb09-4140-b37f-a25a40be1d51.png)
Các bước ấy sẽ bao gồm:
1. Tìm view (tìm button, spiner, menu, text...)
2. Thực thi hành động với view đã tìm (click, trượt, giữ...)
3. Kiểm tra kì vọng (so kết quả đạt được và kết quả kì vọng)
## Tìm view với ViewMatcher
Tương tự như con người Expresso cũng cần phải xác định được vật thể trước khi ta đưa ra các hành động. 
> Điều kiện để mắt ta nhìn thấy một vật là có ánh sáng từ vật đó truyền vào mắt ta 😆

Để làm được điều đó ta cần sử dụng phương phức `onView(viewMatcher)` mà Expresso cung cấp, các matcher ở đây bao gồm:
![image.png](https://images.viblo.asia/17f29a85-53c3-452e-9b9e-9d4afb528c33.png)

Các phương thức trên được cung cấp đúng với ý nghĩa của nó, ví dụ:
* Muốn tìm Button với `android:id="+id/btn_sign_in"` thì matcher sẽ là `withId(R.id.btn_sign_in)`
* Tìm TextView `Hello world` -> `withText("Hello world")`
* ...
**Lưu ý:** Cần import ViewMatcher trước khi sử dụng:
```kotlin
import androidx.test.espresso.matcher.ViewMatchers.*
```
## Thực hiện giả lập các hành động với ViewAction
Sau khi tìm được view chúng ta cần thực hiện các thao tác lên view đó như một người dùng thật sự , các thao tác này có thể là click, giữ, xoá đoạn văn bản... Các hành động này sẽ được biểu thị bởi `ViewAction` thông qua phương thức `ViewInteraction.perform(viewAction1, viewAction2...)`
```kotlin
onView(withId(R.id.tv_username)).perform(clearText(), typeText("user123")) // Xoá và nhập text
onView(withId(R.id.btn_sign_in)).perform(click()) // Bấm nút sign in
```
Các ViewAction khác mà bạn có thể tham khảo:
![image.png](https://images.viblo.asia/3b9fa4a5-0c8e-452e-90c7-c5d2485843d7.png)
## Kiểm tra kì vọng với ViewAssertion
Khi đã thực hiện được các thao tác giả lập với view mong muốn, ta sẽ muốn kiểm tra xem hoạt động, trạng thái lúc này có đúng ý mình không. Expresso cung cấp phương thức `check(viewAssertion)` giúp ta dễ dàng hiện thực được điều trên. Ở đây viewAssertion là các điều kiện, các thoả mãn mà ta mong muốn, ví dụ:

Một test case với mô tả: khi đăng nhập màn hình xuất hiện dòng chữ `"Chào một ngày mới"` ở TextView có id là `tv_hello_user`. Để kiểm thử test case này ta cần thực hiện các thao tác nhập user name, password, bấm đăng nhập và nhìn thấy được dòng chữ `"Chào một ngày mới"`:
```kotlin
onView(withId(R.id.tv_username)).perform(typeText("user123"))
onView(withId(R.id.tv_pwd)).perform(typeText("12345678"))
onView(withId(R.id.btn_sign_in)).perform(click())
onView(withId(R.id.tv_hello_user)).check(matches(withText("Chào một ngày mới")))
```

Ngoài matches ra còn rất nhiều ViewAssertion phục vụ cho các mục đích khác nhau:
![image.png](https://images.viblo.asia/73669daa-3fb5-4aa0-b800-534776c0aa0d.png)
# Lời kết
Trên là những điều cơ bản mà bạn có thể bắt đầu với Expresso để kiểm thử tự động về mặt giao diện cho ứng dụng của mình. Các bạn có thể tham khảo thêm về Expresso ở [đây](https://developer.android.com/training/testing/espresso).

Cảm ơn các bạn đã đọc bài viết.

# Reference 
1. https://medium.com/@surya.n1447/android-ut-and-ui-testing-basics-part-3-eefccaef5309
2. https://viblo.asia/p/android-testing-part-1espresso-basics-RQqKLYOmZ7z