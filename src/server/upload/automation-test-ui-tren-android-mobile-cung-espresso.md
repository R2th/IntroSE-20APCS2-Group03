# I. Định nghĩa: 
![](https://images.viblo.asia/8da3d46f-03c0-4315-a019-dba23635052f.png)
Espresso là một framework được cung cấp và phát triển bởi google nhằm phục vụ cho việc kiểm thử giao diên trên nền tảng Android.

# II. Vì sao cần sử dụng Espresso - ưu điểm của automation testing :
- Các test tự động thực hiện chính xác các trường hợp test giống nhau.
- Developer có thể nhanh chóng phát hiện vấn đề nhanh chóng
- Đạt được phạm vi test rộng hơn, mang đến một ứng dụng có chất lượng tốt hơn.
=> Vì vậy chúng mình sẽ thử tìm hiểu về Espresso qua việc tích hợp nó vào một dự án Android Studio xem hiệu quả như thế nào nhé.

# III. Hướng dẫn cài đặt và sử dụng Espresso 
## 1. Chuẩn bị :
Android Studio phiên bản 3.1.3 trở lên

Plugin Kotlin phiên bản 1.2.51 trở lên

## 2. Tạo một dự án Android Studio
Khởi động Android Studio 3 và tạo một dự án mới có activity rỗng gọi là MainActivity. 
Đảm bảo là đã hỗ trợ Kotlin.
![](https://images.viblo.asia/c0ed6961-945c-4a32-a27a-f74c59c7e8df.jpg)

## 3. Setting Espresso và AndroidJUnitRunner

Sau khi tạo được dự án mới và đảm bảo thêm các dependency sau đây từ Android Testing Support Library trong build.gradle

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

Instrumentation AndroidJUnitRunner:
- Một Instrumentation chạy test JUnit3 và JUnit4 đối với Android 
- Lưu ý rằng Instrumentation chỉ đơn giản là một class cơ sở để triển khai instrumentation code của ứng dụng.

Vô hiệu animation
- Việc đồng bộ hóa Espresso, không biết làm sao để đợi một animation kết thúc, nó có thể khiến vài test thất bại 
- Nếu bạn cho phép animation diễn ra trên thiết bị test. Để tắt animation trên thiết bị test của bạn, hãy đi tới Settings > Developer Options và tắt tất cả các tùy chọn sau trong mục "Drawing":
               * Quy mô animation của cửa sổ
               * Quy mô animation của chuyển tiếp
               * Quy mô thời lượng animation

## 4. Viết scrips trong Espresso
Chúng mình sẽ viết test scrips để test màn hình Login.
### 4.1 Quy trình đăng nhập:
   - Khởi động ứng dụng và màn hình đầu tiên được hiển thị chứa duy nhất một nút Login.
   - Nhấn nút Login sẽ mở ra màn hình LoginActivity. 
   - Màn hình này chỉ chứa hai EditTexts (username và password) và nút Submit.
      
### 4.2 Scrips của MainActivity:
  ![](https://images.viblo.asia/b1ddb675-3430-4de9-a03c-ade10b7fc6be.png)
### 4.3 Scrips của LoginActivity
   ![](https://images.viblo.asia/74a633ae-3720-4691-b554-f16c9662e49f.png)
### 4.4 Test scrips để trỏ đến tên MainActivity:
   - Nhấn Shift-Control-T. Chọn Create New Test ... trong menu popup.
   ![](https://images.viblo.asia/babdba97-9d6d-4552-a6ef-8dec258cd29d.png)
   - Nhấn OK và một hộp thoại khác xuất hiện.
   -  Chọn thư mục androidTest và click OK một lần nữa. 
   -  Lưu ý rằng vì chúng ta đang viết một instrumentation test (test đặc thù của Android SDK), các test case nằm trong thư mục androidTest/java.
* Bây giờ, Android Studio đã tạo thành công một class test . Phía trên tên class, bổ sung chú thích là các test dành riêng cho Android: @RunWith (AndroidJUnit4::class).
```
import android.support.test.runner.AndroidJUnit4
import org.junit.runner.RunWith
 
@RunWith(AndroidJUnit4::class)
class MainActivityTest {
 
 
}
```

### 4.5 Test các activity
   Cần phải thông báo cho Espresso biết Activity nào cần mở hoặc khởi động trước khi thực hiện và loại bỏ sau khi thực hiện test.
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

**NOTE: **
@Rule có nghĩa rằng đây là một quy tắc test JUnit4. Các quy tắc test JUnit4 được vận hành trước và sau khi test
Scrip này khởi chạy MainActivity trước mỗi phương thức test

### 4.6 Ba bước chính trong khi test bằng Espresso:

1. Tìm widget (TextView hoặc Button) muốn test.
2. Thực hiện một hoặc nhiều hoạt động trên widget đó.
3. Xác minh hoặc test xem liệu hiện giờ widget đó có ở trạng thái ổn định hay không.

**Ghi chú:**

@BeforeClass: phương thức static có chú thích này phải được thực thi một lần trước tất cả các test trong class. Có thể sử dụng để tạo một kết nối tới một database.

@Before: phương thức có chú giải này phải được thực thi trước mỗi phương thức test trong class.

@Test: phương thức có chú thích này nên chạy như một trường hợp test.

@After: phương thức có chú giải này nên chạy sau mỗi phương thức test.

@AfterClass: phương thức có chú thích này nên chạy sau khi tất cả các phương thức test trong class đã được chạy. 

### 4.7 Tìm View qua onView()
* Trong MainActivity chỉ có 1 button Login. Kịch bản test sẽ là tìm button đó và click vào nó.
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
- Để tìm các widget trong Espresso, mình sử dụng phương thức tĩnh onView() (thay vì findViewById()).
- OnView(withId(R.id.btn_login)) sẽ trả về ViewInteraction cho View có ID là R.id.btn_login.
- Ở ví dụ trên sử dụng withId() để tìm kiếm một widget có id cho trước.
-  Những matcher khác có thể sử dụng là:
            
      withText(): trả về một matcher phù hợp với TextView dựa trên giá trị thuộc tính text của nó.
            
      withHint(): trả về một matcher phù hợp với TextView dựa trên giá trị thuộc tính hint của nó.
            
      withTagKey(): trả về một matcher phù hợp với View dựa trên các khóa tag.
            
      withTagValue(): trả về một matcher phù hợp với View dựa trên các giá trị thuộc tính tag.
-  Check button Login có thực sự hiển thị trên màn hình 
     `onView(withId(R.id.btn_login)).check(matches(isDisplayed()))`
-  Các view matcher có thể truyền vào phương thức matches() là:
       
      hasFocus(): trả về một matcher phù hợp với các view hiện đang được tập trung.
       
      isChecked(): trả về một matcher nhận một view chỉ khi view này là CompoundButton (hoặc subtype của) và ở trạng thái checked. 
      
      Trái ngược với phương thức này isNotChecked().
      
      isSelected(): trả về một matcher phù hợp với các view đã chọn.

### 4.8 RUN TEST:
- Click vào hình tam giác màu xanh lục bên cạnh phương thức hoặc tên class. 
- Nhấp vào tam giác màu xanh lục bên cạnh tên class sẽ chạy tất cả các phương thức test trong class đó, trong khi đó hình tam giác bên cạnh một phương thức chỉ chạy test cho chính phương thức đó.
![](https://images.viblo.asia/0d5f868d-1acd-4dfb-a719-a6330a4ba65d.png)
![](https://images.viblo.asia/33eb5b7c-5a25-4617-bed0-34850730178f.png)
### 4.9 Thao tác trên View
* Trên ViewInteraction được trả về bằng cách gọi onView(), chúng ta có thể mô phỏng các hành động mà người dùng có thể thực hiện trên một widget.

* Ví dụ:

 Có thể mô phỏng một hành động click chỉ bằng cách gọi phương thức static click() trong class ViewActions. 
 Hành động này sẽ trả về một đối tượng ViewAction.

ViewAction:
```
@Test
fun clickLoginButton_opensLoginUi() {
    // ...
 
    onView(withId(R.id.btn_login)).perform(click())
}
```

- Sự kiện Click bằng cách gọi perform() trước tiên. Phương thức này thực hiện hành động đã cho trên View được chọn bởi view matcher hiện tại. 
- Có thể truyền cho một hành động duy nhất hoặc một danh sách các hành động (xử lý theo thứ tự). Ở đây,đang được gán phương thức click(). 
- Các phương thức khác có thể là:

     typeText() để giả lập việc nhập văn bản vào EditText.

     clearText() để mô phỏng hành động xóa văn bản trong EditText.

     doubleClick() để mô phỏng hành động nhấp đúp vào View.

     longClick() để giả lập hành động nhấp chuột vào View.
 
     scrollTo() để mô phỏng hành động cuộn một ScrollView đến một View cụ thể có thể nhìn thấy.

     swipeLeft() để mô phỏng hành động vuốt sang phải - sang trái ngang qua trung tâm của một View.

### 4.10 Xác thực với View Assertion
* Để hoàn thành phần test, để xác nhận rằng màn hình LoginActivity được hiển thị bất cứ khi nào nút Login được nhấp vào. 
* Mặc dù chúng ta đã thấy cách sử dụng check() trên ViewInteraction, nhưng hãy sử dụng nó một lần nữa, truyền cho nó một ViewAssertion khác.
```
@Test
fun clickLoginButton_opensLoginUi() {
    // ... 
     
    onView(withId(R.id.tv_login)).check(matches(isDisplayed()))
}
```

* Bố cục LoginActivity, ngoài EditTexts và một Button, cũng có một TextView với ID là R.id.tv_login.
 * Vì vậy, chỉ cần thực hiện test để xác nhận rằng TextView hiển thị với người dùng.
* Retest:
![](https://images.viblo.asia/16772e33-8833-43a9-a032-9ac7488ec1d8.png)

* Kết quả quá trình thực hiện các test:
  - Khởi động MainActivity bằng field activityRule.
  - Xác minh button Login (R.id.btn_login) hiển thị ( isDisplayed() ) .
 - Mô phỏng action click chuột lên button Login.
-  Confirm khi LoginActivity hiển thị cho người dùng bằng cách xem TextView có id R.id.tv_login trong LoginActivity có hiển thị hay không.
# IV. Reference:
1. https://developer.android.com/training/testing/espresso
2. https://viblo.asia/p/android-testing-part-1espresso-basics-RQqKLYOmZ7z