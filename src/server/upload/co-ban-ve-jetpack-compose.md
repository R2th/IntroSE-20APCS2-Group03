Hello mọi người :stuck_out_tongue_winking_eye:  hôm nay mình sẽ giới thiệu đến cho mọi người về một bộ toolkit mới của Google được  đó là Jetpack Compose. Vậy bộ tool này là gì và nó hay như nào thì hãy đọc bài viết của mình nhá.
# Khái niệm
Jetpack Compose theo như Google định nghĩa thì nó là một bộ công cụ để xây dựng giao diện người dùng Android gốc. Jetpack Compose đơn giản hóa và tăng tốc phát triển giao diện người dùng trên Android với ít mã hơn, công cụ mạnh mẽ và API Kotlin trực quan.
Đối với ai từng lập trình Flutter hoặc React Native thì sẽ dễ dàng hơn rất nhiều vì ý tưởng của compose cũng dựa trên việc thiết kế UI theo dạng cây.
# Cài đặt môi trường 
Để dùng được tool kit này thì cài [ Android Studio Canary](https://developer.android.com/studio/preview) và Kotlin version là 1.4.0 trở lên.

Cấu hình trong file `build.gradle`:

Bạn cần đặt cấp API tối thiểu của ứng dụng thành 21 trở lên và bật Jetpack Compose trong tệp build.gradle
```kotlin
android {
    defaultConfig {
        ...
        minSdkVersion 21
    }

    buildFeatures {
        // Enables Jetpack Compose for this module
        compose true
    }
    ...

    // Set both the Java and Kotlin compilers to target Java 8.

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = "1.8"
        useIR = true
    }

    composeOptions {
        kotlinCompilerVersion '1.4.0'
        kotlinCompilerExtensionVersion '1.0.0-alpha05'
    }
}
```

và thêm Jetpack Compose phụ thuộc vào bộ công cụ trong `build.gradle` :
```kotlin
dependencies {
    implementation 'androidx.compose.ui:ui:1.0.0-alpha05'
    // Tooling support (Previews, etc.)
    implementation 'androidx.ui:ui-tooling:1.0.0-alpha05'
    // Foundation (Border, Background, Box, Image, Scroll, shapes, animations, etc.)
    implementation 'androidx.compose.foundation:foundation:1.0.0-alpha05'
    // Material Design
    implementation 'androidx.compose.material:material:1.0.0-alpha05'
    // Material design icons
    implementation 'androidx.compose.material:material-icons-core:1.0.0-alpha05'
    implementation 'androidx.compose.material:material-icons-extended:1.0.0-alpha05'
    // Integration with observables
    implementation 'androidx.compose.runtime:runtime-livedata:1.0.0-alpha05'
    implementation 'androidx.compose.runtime:runtime-rxjava2:1.0.0-alpha05'

    // UI Tests
    androidTestImplementation 'androidx.ui:ui-test:1.0.0-alpha05'
}
```
# Tạo project compose
Vào  **File > New > New Project**  và chọn **Empty Compose Activity**

![](https://images.viblo.asia/f8e79705-e6bc-4e03-8732-d024fd45e2f4.png)

Trong `MainActivity.kt` sẽ hiển thị như sau:

![](https://images.viblo.asia/c9b06ffd-56f7-4162-a7b0-b17112348a0b.png)

Ở màn hình bên trái sẽ có các thành phần mới khác với các thành phần như android gốc và việc viết UI không dựa vào file xml nữa mà được viết ngay trong class. 

Chúng ta sẽ đi từng thành phần.

##  @Composable

Jetpack compose được xây dựng xung quanh hàm composable. Đó là những function sẽ  là nơi ta xác định UI và data của nó cũng tức là nơi ta thực hiện việc thêm các TextView hoặc các Button... 
### Thêm một phần tử Text.
setContent sẽ đóng vai trò như setContentView như trrong android gốc. Chỉ cần thêm một class Text và khai báo trong constructor của nó là xong (ez :stuck_out_tongue_winking_eye:).
```kotlin
 setContent {
    Text("Hello")
 }
```

![](https://images.viblo.asia/298bec56-4a85-46b7-aecd-e4da33e88d95.png)

###  Khai báo hàm thì sao?
Thì nó cũng giống với việc khai báo như Android gốc nhưng nếu có chứa các phần tử UI thì phải khai báo thêm @Composable trước tên hàm.

Hàm bình thường.
```kotlin
fun Greetings(name: String) {
    return
}
```

Hàm có chứa UI.
```
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

## @Preview
Cho phép bạn xem trước các chức năng có thể tổng hợp của mình trong IDE, thay vì cần tải ứng dụng xuống thiết bị hoặc trình giả lập Android.

![](https://images.viblo.asia/c9b06ffd-56f7-4162-a7b0-b17112348a0b.png)

Trong bản Android Cavany có 2 mode build là `app` và `Default preview` khi build lên bản `Default preview` nó sẽ build ra những hàm @Composable nào có đi kèm với @Preview và được hiển thị ở bên phải màn hình. Và khi có update UI thì chỉ cần nhấn vào icon refresh phía trên bên trái màn hình là được.

## Layout

Các phần tử UI được phân cấp, với các phần tử được chứa trong các phần tử khác. Trong Compose, bạn xây dựng hệ thống phân cấp giao diện người dùng bằng cách gọi các hàm có thể tổng hợp từ các hàm có thể tổng hợp khác.
```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text(text = "Hello")
            NewsStory()
        }
    }
}

@Composable
fun NewsStory() {
    Text("A day in Shark Fin Cove")
    Text("Davenport, California")
    Text("December 2018")
}
```
![](https://images.viblo.asia/3c7eabc7-7e41-47bf-a883-be843823f6fd.png)

### Sử dụng Column
Phần tử Column sẽ chứa các phần tử  con và sẽ hiển thị theo dạng cột và theo thứ tự được add vào.
```kotlin
   Column(
        modifier = androidx.compose.ui.Modifier.padding(16.dp)
    ) {
        Text("A day in Shark Fin Cove")
        Text("Davenport, California")
        Text("December 2018")
    }
```
![](https://images.viblo.asia/0909aafe-d240-4ed7-9d37-1ec8d9067a0d.png)

### Image

```kotlin
@Composable
fun NewsStory() {
    val image = imageResource(R.drawable.header)
    Column(
        modifier = androidx.compose.ui.Modifier.padding(16.dp)
    ) {
        val imageModifier = androidx.compose.ui.Modifier
            .preferredHeight(180.dp)
            .fillMaxWidth()

        Image(image, modifier = imageModifier,
            contentScale = ContentScale.Crop)

        Text("A day in Shark Fin Cove")
        Text("Davenport, California")
        Text("December 2018")
    }
}
```


**favouriteHeight (180.dp)**: Chỉ định chiều cao của hình ảnh.

**fillMaxWidth ()**: Chỉ định rằng hình ảnh phải đủ rộng để lấp đầy bố cục của nó.


**contentScale = ContentScale.Crop**: Chỉ định rằng đồ họa sẽ lấp đầy chiều rộng của cột và được cắt nếu cần đến chiều cao thích hợp.

![](https://images.viblo.asia/8dd1cc6b-dd7d-49fa-87d7-a283f6164142.png)

## Material Design
###  Dùng thuộc tính Shape

Một trong những trụ cột của Material Design System là `Shape`. Sử dụng hàm `clip()` để làm tròn các góc của hình ảnh.

Hình dạng không thể nhìn thấy, nhưng đồ họa được cắt để phù hợp với `Shape`, vì vậy nó hiện có các góc tròn.

![](https://images.viblo.asia/a7d11eb0-f748-41d8-a15a-7d19715f0034.png)

### Các thuộc tính khác trong Text
```kotlin
   Text("Một ngày mưa giông bão tố " +
   "Tôi thấy cá mập",
            style = typography.h6,
            maxLines = 2,
            overflow = TextOverflow.Ellipsis)
        Text("Davenport, California",
            style = typography.body2)
        Text("December 2018",
            style = typography.body2)
```

![](https://images.viblo.asia/b8915426-8112-4942-a6fc-285ba938f2ae.png)

# Tổng kết:
Mình thấy Jetpack compose này khá tiện lợi vừa xử lý logic và UI cùng trên một file nên sẽ rút gọn thời gian viết code lại của dev, vì ra sau nên còn một số thiếu sót vì vậy sẽ khó cạnh tranh với các Framework khác như ReactNative, Flutter,... 

Cảm ơn các bạn đã xem bài của mình nha :heart_eyes::heart_eyes::heart_eyes::heart_eyes:

### Link tham khảo:
> 
> https://developer.android.com/jetpack/compose/tutorial