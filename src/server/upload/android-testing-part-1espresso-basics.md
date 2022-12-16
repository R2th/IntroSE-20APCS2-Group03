## Intro
Là một dev thì hẳn mọi người đã biết thì rõ ràng thử nghiệm là một phần quan trọng của trong quá trình phát triển phần mềm. Con người rất dễ có sai lầm và vì bản chất tự nhiên này thì phần mềm thường sẽ có bug khi được phát triển. Vì vậy việc kiểm thử sẽ giúp :
* Giúp phát hiện các khiếm khuyết hay lỗi trong quá trình phát triển.
* Đảm bảo độ tin cậy của khách hàng và sự hài lòng của họ đối với sản phẩm.
* Đảm bảo chất lượng sản phẩm, giúp tăng sự tự tin với khách hàng.

Bài viết này sẽ tập trung vào việc kiểm thử giao diện người dùng.
> *"Testing leads to failure, and failure leads to Understanding"*

Với Android có 2 loại kiểm thử chủ yếu.
## Unit Tests
Kiểm tra mọi phương thức hay hàm trong source code. Ví dụ như kiểm tra với một hàm truyền vào tham số x thì kết quả trả về phải là y. Các testcase này sẽ chạy trên một JVM locally mà không cần các trình giả lập hay thiết bị.
## Instrumentation Testing
Thường được sử dụng để kiểm thử cho UI hay SharedPreferences. Các testcase sẽ phải chạy với các hệ thống giả lập, mô phỏng hay thiết bị thật.
Instrumentation tests sử dụng một file apk để sử dụng riêng cho quá trình test. Khi chạy testcase, Android studio sẽ cài app vào thiết bị qua apk file và chạy gói thử nghiệm có chứ mã nguồn tương ứng.
## What is Espresso?
Espresso là một Instrumentation Testing framework được cung cấp và phát triển bởi google nhằm phục vụ cho việc kiểm thử giao diên người dùng.
## Setting Up
Adding espresso dependencies in app/build.gradle file

![](https://images.viblo.asia/09dda75d-5560-498c-9816-d5263faadae6.jpeg)

Đến file app/build.gradle

1.Thêm dependencies
```
androidTestCompile ‘com.android.support.test.espresso:espresso-core:3.0.1’
androidTestCompile ‘com.android.support.test:runner:1.0.1’
```
2.Tiếp tục thêm như sau vào file build.gradle
```
android.defaultConfig{
testInstrumentationRunner “android.support.test.runner.AndroidJUnitRunner”
}
```
Thiết lập này dùng để cài đặt AndroidJUnitRunner. AndroidJUnitRunner là thành phần đầu vào để chạy toàn bọ kiểm thử. Nó kiểm soát môi trường kiểm thử, các gói kiểm thửthử và sẽ khởi chạy tất cả các testcase trong gói kiểm thử của bạn.
## Getting Started
Để bắt đầu kiểm thử giao diện, Ta cần tao test class trong `module-name/src/androidTest/java/` với annotations là `@RunWith(AndroidJUnit4::class)`.

AndroidJUnitRunner sẽ kiểm tra các annotations để xác định các thiết lập trong quá trình chạy testcasetestcase.

Có 6 loại annotations được áp dụng cho các phương thức sử dụng bên trong test class đó là : @Test, @Before, @BeforeClass, @After, @AfterClass, @Rule.

![](https://images.viblo.asia/994b2102-699b-4cbe-8b70-1263ffea2d6e.jpeg)

```
Những điều quan trọng cần lưu ý :
* Activity sẽ được khởi chạy khi sử dụng @Rule và sẽ chạy trước khi quá trình test được bắt đầu.
* Theo mặc định, quy tắc sẽ được khởi tạo và hoạt động sẽ được khởi chạy (onCreate, onStart, onResume) trước khi chạy mọi phương thức @ Before.
* Activity sẽ bị hủy (onPause, onStop, onDestroy) sau khi chạy phương thức @After được gọi sau mỗi phương thức @Test.
* Khởi động của Activity có thể được hoãn lại bằng cách đặt launchActivity thành false trong hàm khởi tạo của ActivityTestRule, trong trường hợp đó bạn sẽ phải khởi chạy hoạt động theo cách thủ công trước khi thử nghiệm
```

### The espresso test of a view contains
Steps involved in espresso tests

![](https://images.viblo.asia/0d1e6394-63d2-42cc-a55e-a2199a8d6ad0.jpeg)

### Finding a View using a ViewMatcher

![](https://images.viblo.asia/23eb3389-b8d0-421b-8d2c-00b3d5b7ea6f.png)

Espresso sử dụng phương thức onView (Matcher<View> viewMatcher) để tìm kiếm một View cụ thể. Và phương thức onView này sử dụng Matcher làm đối số. Espresso cung cấp một số các ViewMatchers có thể được tìm thấy trong tờ Espresso Cheat.
    
Mỗi phần tử giao diện người dùng chứa các thuộc tính hoặc thuộc tính có thể được sử dụng để tìm phần tử đó. Giả sử để tìm một phần tử có `android:id=“+id/login_button”`. Ta có thể viết 
> Espresso.onView(withId(R.id.login_button))
### Performing actions on the View

![](https://images.viblo.asia/35009890-0b11-4520-8014-6365e92b871a.png)

Sau khi tìm thấy View bạn có thể thực hiện các hành động trên View hoặc trên con cháu của nó bằng cách sử dụng ViewActions của Espresso. Một số hành động phổ biến  là click(), clearText(), v.v.
> Espresso.onView(withId(R.id.login_button)).perform(click())
### Checking the ViewAssertions

![](https://images.viblo.asia/0a48645d-deaa-42cf-9ce3-2600e50f3ef6.png)

Sau khi thực hiện một hành động trên View, chúng ta sẽ muốn xem nếu view hoạt động như chúng ta muốn, điều này có thể được thực hiện bằng cách sử dụng phương thức check(ViewAssertion viewAssert)
> Espresso.onView(withId(R.id.login_result)).check(matches(withText(R.string.login_success)))
## Example Code
Trong ví dụ bên dưới, chúng tôi thực hiện kiểm tra màn hình đăng nhập nơi chúng tôi tìm kiếm văn bản chỉnh sửa thông tin đăng nhập và mật khẩu và nhập các giá trị và sau đó chúng tôi kiểm tra hai kịch bản **Login Success** và **Login Failure**
```
import android.support.test.rule.ActivityTestRule
import android.support.test.runner.AndroidJUnit4
import org.junit.runner.RunWith
import android.support.test.espresso.Espresso;
import android.support.test.espresso.action.ViewActions
import android.support.test.espresso.assertion.ViewAssertions.matches
import android.support.test.espresso.matcher.ViewMatchers.*

@RunWith(AndroidJUnit4::class)
class MainActivityInstrumentationTest {

    @Rule
    @JvmField
    public val rule  = ActivityTestRule(MainActivity::class.java)

    private val username_tobe_typed="Ajesh"
    private val correct_password ="password"
    private val wrong_password = "passme123"

    @Test
    fun login_success(){
        Log.e("@Test","Performing login success test")
        Espresso.onView((withId(R.id.user_name)))
                .perform(ViewActions.typeText(username_tobe_typed))

        Espresso.onView(withId(R.id.password))
                .perform(ViewActions.typeText(correct_password))

        Espresso.onView(withId(R.id.login_button))
                .perform(ViewActions.click())

        Espresso.onView(withId(R.id.login_result))
                .check(matches(withText(R.string.login_success)))
    }

    @Test
    fun login_failure(){
        Log.e("@Test","Performing login failure test")
        Espresso.onView((withId(R.id.user_name)))
                .perform(ViewActions.typeText(username_tobe_typed))

        Espresso.onView(withId(R.id.password))
                .perform(ViewActions.typeText(wrong_password))

        Espresso.onView(withId(R.id.login_button))
                .perform(ViewActions.click())

        Espresso.onView(withId(R.id.login_result))
                .check(matches(withText(R.string.login_failed)))
    }
}
```
## Kết luận
Trên là nhưng gì cơ bản nhất về Espresso framework trong android. Mọi người có thể tìm hiểu thêm về Espresso ở [đây](https://developer.android.com/training/testing/espresso/)

Còn [đây](https://github.com/googlesamples/android-testing) là một số demo hữu ích liên quan đến espresso