Kiểm thử là một phần thiết yếu của quy trình phát triển phần mềm trước khi đưa sản phẩm vào sử dụng. Việc kiểm thử này bao gồm rất nhiều công đoạn, một trong số đó là kiểm thử về Ui của phần mềm.
Trong bài viết này, mình xin được phép giới thiệu một số framework phục vụ cho việc kiểm thử UI trên nền tảng Android.
# Test case:
* Mở SignInActivity.
* Nhập "test" vào mục email.
* Click vào nút "Sign In" (id: `R.string.signIn`)
* Thông báo "An email adress shoud be valid" cần phải được hiển thị (id: `R.string.error_email_shoud_be_valid`)
![](https://images.viblo.asia/76d2f797-afc8-4132-82fa-7b63f559cef4.png)
# Framework
Để kiểm thử ứng dụng Android, có các kiểu framework khác nhau:
* Native framework : với Android thì có Espresso, UiAutomator
* Cross-platform framework: Appium, Calabash, ...
Ở bài viết này, mình sẽ giới thiệu một số UI testing framework phổ biến cho ứng dụng Android bao gồm:
* Appium (cross-platform).
* Espresso (native).
* UiAutomator (native).
# Appium
Appium là một mobile testing framework mã nguồn mở hỗ trợ cả Andorid và iOS. Ta có thể dễ dàng test tất cả các dạng ứng dụng mobile với Appium: native app, web app, hybrid app. Điều này có nghĩa là chúng ta có thể tạo những test sẽ hoạt động trên những platform khác nhau. Tuy nhiên, trong thực tế nó sử dụng XCTest để kiểm thử ứng dụng iOS và sử dụng UiAutomator để kiểm thử ứng dụng Android. Appium tương tác với ứng dụng bằng các sử dụng Selenium Web Driver và Node.js.
**Ưu điểm:**
* Là framework cross-platform, ta có thể tạo test case bằng Java, C#, JavaScript, Python, Ruby.
* Appium có nhiều điểm tương đồng với Selenium Web Driver. Rất nhiều developer và tester đã có kinh nghiệm với Selenium, có nghĩa là họ có thể bắt đầu với Appium một cách dễ dàng.
* Thực thi các test case cho các nền tảng khác nhau từ cùng code base.
* Hỗ trợ kiểm thử cho native, hybrid và cả mobile-web app.
**Nhược điểm:**
* Hỗ trợ Android SDK 16 trở lên.
* Test case chạy chậm.
* Test code lưu trữ độc lập với code của ứng dụng.
* Hai lần thực hiện cho hai nền tnagr khác nhau khi các ứng dụng khác nhau về bố cục UI.
*Lưu ý: Với Appium framework, chúng ta sẽ bắt đầu từ main Activity của ứng dụng. Đó là một SplashActivity mở ra màn hình LoginActivity nếu người dùng chưa đăng nhập.*
Cài đặt test case:
```
class AppiumSignInTest {

    private lateinit var appiumDriver: AppiumDriver<AndroidElement>

    @Before
    fun setup() {
        val capabilities = DesiredCapabilities()
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android")
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "emulator-5554")
        capabilities.setCapability("appPackage", "com.alex.mapnotes")
        capabilities.setCapability("appActivity", "com.alex.mapnotes.splash.SplashActivity")

        appiumDriver = AndroidDriver(URL("http://0.0.0.0:4723/wd/hub"), capabilities)
    }

    @Test
    fun shouldDisplaySinInErrorWhenEmailIsIncorrect() {
        val emailValue = "test"
        val expectedErrorMessage = "An email address should be valid"

        openSignInScreen()

        val emailInputField = appiumDriver.findElement(By.id("email"))
        emailInputField.setValue(emailValue)

        appiumDriver.hideKeyboard()

        val signInButton = appiumDriver.findElement(By.id("signIn"))
        signInButton.click()

        val snacknarError = appiumDriver.findElement(By.xpath("//*[@text='$expectedErrorMessage']"))
        assertNotNull(snacknarError)
    }

    @After
    fun tearDown() {
        appiumDriver.quit()
    }

    private fun openSignInScreen() {
        val signIn = appiumDriver.findElement(By.id("signIn"))
        signIn.click()
    }
}
```
Thời gian thực thi trung bình của kịch bản kiểm thử sau 3 lần đo: **12s 15ms**
# Espresso
Espresso là một framework phục vụ UI testing của Google. Framework này có một API đơn giản và cho phép chúng ta có thể viết những UI test case rõ ràng, dễ hiểu. Espresso có sự phụ thuộc vào thư viện Hamcrest và do đó hỗ trợ Matcher, giúp đơn giản hóa việc kiểm thử các kịch bản phức tạp bằng các giới thiệu các custom matcher và action.
Espresso cố một số module được thêm vào bao gồm:
* espresso-web: chứa resource hỗ trợ WebView.
* espresso-idling-resource: cơ chế của Espresso cho việc đồng bộ hóa với các công việc ở background.
* expresso-contrib: đóng góp từ cộng đồng, hỗ trợ DataPicker, ReccyclerView, Drawer action, ...
* espresso-intents: extension hỗ trợ validate và stub intent cho hermetic test.
* espresso-remote: chứa các phương thức cho multi-process.
**Ưu điểm:**
* Thời gian thực thi test case nhanh.
* Espresso hỗ trợ đồng bộ hoá, có nghĩa là ta không cần phải viết thêm code bổ sung để chờ tới khi activity/fragment được load hay finish.
* Espresso hỗ trợ kiểm thử các component cô lập. Ta có thể thực thi test case cho bất kỳ activity hay fragment nào.
* Hỗ trợ Hamcrest Matchers.
* Có thể test các Web components.
**Nhược điểm:**
* Test case chỉ có thể được viết cho Android platform.
* Test case chỉ có thể được viết bằng Java hoặc Kotlin.
*Lưu ý: Với Espresso framework, ta có thể bắt đầu ở Activity nào của ứng dụng*
Cài đặt test case:
```
@RunWith(AndroidJUnit4::class)
class EspressoSignInTest {

    @Rule @JvmField
    val activityRule = ActivityTestRule<SignInActivity>(SignInActivity::class.java)

    @Test
    fun shouldDisplaySinInErrorWhenEmailIsIncorrect() {
        val incorrectEmail = "test"

        onView(withId(R.id.email))
                .perform(replaceText(incorrectEmail), closeSoftKeyboard())

        onView(withId(R.id.signIn))
                .perform(click())

        onView(withText(R.string.error_email_should_be_valid))
                .check(matches(isDisplayed()))
    }
}
```
Thời gian thực thi trung bình của kịch bản kiểm thử sau 3 lần đo: **0s 967ms**
# UiAutomator
UiAutomator là một testing framework khác của Google, cho phép ta test bất kỳ ứng dụng nào được cài đặt trên thiết bị.
Thêm vào đó, ta có thể tương tác với các thành phần của hệ thống, như là Runtime Permission Dialog, Notification, ... cũng như tương tác với các nút bấm vật lý của thiết bị.
UiAutomator được đi kèm với UiAutomatorViewer. Công cụ này cho phép ta có thể explore UI của bất kỳ ứng dụng nào. Bạn có thể xem qua bài viết "[Effecient Testing Android app - Tool](https://alexzh.com/2018/12/10/efficient-testing-android-app-tools/)" để hiểu thêm về các công cụ phân tích UI của Android hiện có.
**Ưu điểm:**
* Khả năng tương tác với các thành phần hệ thống.
* API của framework khá đơn giản.
**Nhược điểm:**
* Hỗ trợ Android SDK 18 trở lên.
* API phức tạp khi làm việc với list.
* Không hỗ trợ các thành phần web.
*Lưu ý: Với UiAutomator, chúng ta sẽ bắt đầu từ main Activity của ứng dụng. Đó là một SplashActivity mở ra màn hình LoginActivity nếu người dùng chưa đăng nhập.*
Cài đặt test case:
```
@RunWith(AndroidJUnit4::class)
class UiAutomatorSignInTest {

    companion object {
        const val LAUNCH_TIMEOUT = 2_000L
        const val APP_PACKAGE = "com.alex.mapnotes"
    }

    private val device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())

    private fun openApp(packageName: String) {
        device.pressHome()

        // Wait for launcher
        val launcherPackage: String = device.launcherPackageName
        assertThat(launcherPackage, notNullValue())
        device.wait(
                Until.hasObject(By.pkg(launcherPackage).depth(0)),
                LAUNCH_TIMEOUT
        )

        // Start an activity
        val context = ApplicationProvider.getApplicationContext<Context>()
        val intent = context.packageManager.getLaunchIntentForPackage(packageName)
                .apply { addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK) }
        context.startActivity(intent)

        // Wait for the app to appear
        device.wait(Until.hasObject(By.pkg(APP_PACKAGE).depth(0)),
                LAUNCH_TIMEOUT)
    }

    private fun navigateToSignIn() {
        device.wait(Until.hasObject(By.res("com.alex.mapnotes:id/signIn")), LAUNCH_TIMEOUT)
        val login: UiObject2 = device.findObject(By.res("com.alex.mapnotes:id/signIn"))
        if (login.isEnabled) {
            login.click()
        }
        device.wait(Until.hasObject(By.res("com.alex.mapnotes:id/signIn")), LAUNCH_TIMEOUT)
    }

    @Test
    fun shouldDisplaySinInErrorWhenEmailIsIncorrect() {
        openApp(APP_PACKAGE)
        navigateToSignIn()

        val incorrectEmail = "test"
        val expectedErrorMessage = "An email address should be valid"

        val emailInput: UiObject2 = device.findObject(By.res("com.alex.mapnotes:id/email"))
        emailInput.text = incorrectEmail

        val signInButton: UiObject2 = device.findObject(By.res("com.alex.mapnotes:id/signIn"))
        if (signInButton.isEnabled) {
            signInButton.click()
        }

        device.wait(Until.hasObject(By.text(expectedErrorMessage)), LAUNCH_TIMEOUT)
        val errorMessage = device.findObject(By.text(expectedErrorMessage))
        assertEquals(expectedErrorMessage, errorMessage.text)
    }
}
```
Thời gian thực thi trung bình của kịch bản kiểm thử sau 3 lần đo: **8s 743ms**
# UiAutomator & Espresso
Xem xét Espresso và UiAutomator một cách độc lập không thực sự hoàn toàn chính xác bởi trong nhiều trường hợp ta có thể sử dụng cả Espresso và UiAutomator cùng với nhau. Sự kết hợp này mang lại lợi ích rất lớn khi kết hợp ưu điểm của cả hai framework. Do đó, nếu có thể bạn nên sử dụng cả hai. Bạn có thể xem qua bài viết "[Android testing: Espresso & UiAutomator together](https://alexzh.com/2016/08/21/android-testing-espresso-uiautomator-together/)" để tìm hiểu thêm về sự kết hợp này.
# Tóm tắt
| Tiêu chí | Appium | Espresso | UiAutomator |
| -------- | -------- | -------- |-------- |
| Thời gian thực thi | Chậm | Nhanh | Trung Bình |
| Ngôn ngữ hỗ trợ | Java, Kotlin, C#, JavaScript, Python, Ruby | Java, Kotlin	 | Java, Kotlin	 |
| Kiểu kiểm thử | Black Box	 | Gray Box	 | Black Box |
| Cài đặt | Khó | Dễ | Dễ |
Trên đây là bài viết của mình về Ui Testing trong Android. Cảm ơn bạn đã dành thời gian đọc bài viết.
# Tham khảo
* [Appium official website.](http://appium.io/)
* [Espresso overview.](https://developer.android.com/training/testing/espresso)
* [UiAutomator overview.](https://developer.android.com/training/testing/ui-automator)
* [Efficient Testing Android app — Tools.](https://alexzh.com/2018/12/10/efficient-testing-android-app-tools/)
* [Android testing: Espresso & UIAutomator together.](https://alexzh.com/2016/08/21/android-testing-espresso-uiautomator-together/)