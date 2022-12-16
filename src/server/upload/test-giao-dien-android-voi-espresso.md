Trong bài viết này, bạn sẽ tìm hiểu cách viết test cho giao diện ứng dụng Android, bằng cách sử dụng framework [Espresso](https://developer.android.com/training/testing/espresso/) 
và tự động hóa quy trình test của bạn, thay vì sử dụng quy trình test thủ công tẻ nhạt và dễ bị lỗi.

## 1. Tại sao sử dụng Espresso ?

Một trong những vấn đề với việc test thủ công là nó có thể tốn thời gian và tẻ nhạt khi thực hiện. 
Ví dụ: để test một màn hình đăng nhập (theo cách thủ công) trong ứng dụng Android, bạn sẽ phải thực hiện các thao tác sau:

1. Khởi chạy ứng dụng.
2. Điều hướng đến màn hình đăng nhập.
3. Xác nhận nếu username và password hiển thị.
4. Nhập tên người dùng và mật khẩu vào các trường tương ứng.
5. Xác nhận xem nút đăng nhập có hiển thị hay không và sau đó nhấp vào nút đăng nhập đó.
6. Kiểm tra xem các view chính xác có được hiển thị khi đăng nhập đó thành công hay không.

Thay vì sử dụng thời gian để test thủ công như trên, bạn có thể viết code để test giao diện một cách dễ dàng.

Một số ưu điểm của test tự động bao gồm:

* Các test tự động thực hiện chính xác các trường hợp test giống nhau mỗi khi chúng được thực thi.
* Lập trình viên có thể phát hiện vấn đề một cách nhanh chóng trước khi gửi đến QA.
* Tiết kiệm rất nhiều thời gian, không giống như test thủ công. Bằng cách tiết kiệm thời gian, các kỹ sư phần mềm và đội QA có thể dành nhiều thời gian hơn cho các công việc khác.
* Phạm vi kiểm tra cao hơn đạt được,  do đó chất lượng của ứng dụng sẽ tốt hơn.

Trong hướng dẫn này, chúng ta sẽ sử dụng Espresso trong project Android để test một màn hình Đăng nhập và một RecyclerView.

## 2. Chuẩn bị

* Hiểu biết cơ bản về Android và Kotlin.
* Android Studio 3.1.3 trở lên
* Plugin Kotlin 1.2.51 trở lên

## 3. Tạo Android Studio project

Mở Android Studio và tạo project mới, nhớ chọn **Include Kotlin support**

![](https://images.viblo.asia/49abe4c0-21ca-424d-8760-a15d5350b0d4.jpg)

## 4. Thiết lập Espresso và AndroidJUnitRunner

Sau khi tạo project mới, thêm các dependencies sau vào file **build.gradle**

```
android {
    //...
    defaultConfig {
        //...
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    //...
}
 
dependencies {
    //...
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test:rules:1.0.2'
 
}
```

**Tắt Animation**

Việc đồng bộ hóa của Espresso ko biết cách đợi một animation kết thúc.
Vì vậy, nếu bạn bật aniamtion trong thiết bị test của bạn, có thế ảnh hưởng đến 1 số trường hợp test bị thất bại.

Để tắt animation trên thiết bị test, mở mục **Settings > Developer Options** , tắt tất cả các tùy chọn sau trong phần **"Drawing"** :

* Window animation scale
* Transition animation scale
* Animator duration scale

## 5. Viết Test sử dụng Espresso

Đầu tiên, chúng ta bắt đầu test màn hình Đăng nhập. 
Dưới đây là cách luồng đăng nhập bắt đầu: người dùng khởi chạy ứng dụng và màn hình đầu tiên được hiển thị chứa một nút **Login** duy nhất. 
Khi nhấn nút **Login**, nó sẽ mở ra màn hình LoginActivity. Màn hình này chỉ chứa hai EditTexts (trường tên người dùng và mật khẩu) và nút **Submit**.

Layout của MainActivity như sau :

![](https://images.viblo.asia/c352b800-eff7-4e27-9cae-5e7488544080.png)

Layout của LoginActivity như sau :

![](https://images.viblo.asia/bec4ab4c-c96e-4932-a586-92b754faa624.png)

Bây giờ, hãy viết test cho MainActivity. 
Mở lớp MainActivity, di chuyển con trỏ đến tên MainActivity và nhấn **Shift-Control-T**.
Chọn **Create New Test** trong hộp thoại.

![](https://images.viblo.asia/c6cdff14-8dc8-4748-adb5-e04c98dc936f.png)

Nhấn nút OK và một hộp thoại khác xuất hiện. Chọn thư mục androidTest và nhấp vào nút OK một lần nữa. 
Lưu ý rằng bởi vì chúng ta đang viết một instrumentation test (test chỉ định của Android SDK), các trường hợp test sẽ nằm trong thư mục **androidTest/java** .

Bây giờ, Android Studio đã tạo thành công một lớp test cho chúng ta. Phía trên tên lớp, hãy thêm annotation sau : @RunWith (AndroidJUnit4 :: class).

```
import android.support.test.runner.AndroidJUnit4
import org.junit.runner.RunWith
 
@RunWith(AndroidJUnit4::class)
class MainActivityTest {
 
 
}
```

**Test Activity**

Bởi vì chúng ta muốn test một Activity, chúng ta phải thiết lập một chút. 
Chúng ta cần phải thông báo cho Espresso biết Activity nào để mở hoặc khởi động trước khi thực hiện và phá hủy sau khi thực hiện bất kỳ phương thức test nào.

```
import android.support.test.rule.ActivityTestRule
import android.support.test.runner.AndroidJUnit4
import org.junit.Rule
import org.junit.runner.RunWith
 
@RunWith(AndroidJUnit4::class)
class MainActivityTest {
 
    @Rule @JvmField
    var activityRule = ActivityTestRule<MainActivity>(
            MainActivity::class.java
    )
 
}
```

Lưu ý rằng chú thích @Rule có nghĩa đây là một quy tắc test JUnit4. Các quy tắc test JUnit4 được chạy trước và sau mỗi phương thức test (được chú thích bằng @Test). 
Trong kịch bản của chúng ta, chúng ta muốn khởi chạy MainActivity trước mỗi phương thức test và phá hủy nó sau đó.

Chúng ta cũng thêm chú thích @JvmField Kotlin. 
Điều này đơn giản chỉ thị trình biên dịch không tạo ra các getters và setters cho thuộc tính và thay vào đó để lộ nó như là một trường Java đơn giản.

Các loại chú thích sau đây có thể được áp dụng cho các phương thức được sử dụng bên trong lớp test :

* @BeforeClass: điều này chỉ ra rằng phương thức mà chú thích này được áp dụng cho phải được thực hiện một lần và trước tất cả các test trong class. Ví dụ, để thiết lập một kết nối đến một cơ sở dữ liệu.

* @Before: chỉ ra rằng phương thức chú giải này được gắn vào phải được thực thi trước mỗi phương thức test trong class.
 
* @Test: chỉ ra rằng phương thức chú thích này được gắn vào nên chạy như một test case.
 
* @After: chỉ ra rằng phương thức chú giải này được gắn vào nên chạy sau mỗi phương thức test.
 
* @AfterClass: chỉ ra rằng phương thức chú thích này được gắn vào nên chạy sau khi tất cả các phương thức test trong class đã được chạy. Ở đây, chúng ta thường sẽ đóng tài nguyên đã được mở trong @BeforeClass.

**Tìm một View sử dụng onView()**

Trong layout của MainActivity, chúng ta chỉ có một Widget là button **Login**.
Hãy test theo kịch bản sau : người dùng thấy và nhấp vào nút **Login** đó.

```
import android.support.test.espresso.Espresso.onView
import android.support.test.espresso.matcher.ViewMatchers.withId
 
// ...
@RunWith(AndroidJUnit4::class)
class MainActivityTest {
 
    // ...
 
    @Test
    @Throws(Exception::class)
    fun clickLoginButton_opensLoginUi() {
        onView(withId(R.id.btn_login))
    }
}
```

Để tìm các widget trong Espresso, chúng ta sử dụng phương thức onView () (thay vì findViewById ()). 
Kiểu tham số mà chúng ta cung cấp cho onView () là một Matcher. Lưu ý rằng API của Matcher không đến từ SDK Android mà thay vào đó là từ Dự án Hamcrest. 
Thư viện matcher của Hamcrest nằm trong thư viện Espresso mà chúng ta đã kéo qua Gradle.

OnView (withId (R.id.btn_login)) sẽ trả về ViewInteraction cho View có ID là R.id.btn_login. 
Trong ví dụ trên, chúng ta đã sử dụng withId () để tìm kiếm một widget với id đã cho. Các view matcher khác mà chúng ta có thể sử dụng là:

* withText (): trả về một matcher khớp với TextView dựa trên giá trị thuộc tính văn bản của nó.
 
* withHint (): trả về một matcher khớp với TextView dựa trên giá trị thuộc tính hint của nó.
 
* withTagKey (): trả về một matcher khớp với View dựa trên các khóa thẻ.
 
* withTagValue (): trả về một matcher khớp với các khung nhìn dựa trên các giá trị thuộc tính tag.