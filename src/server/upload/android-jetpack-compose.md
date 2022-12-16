# Mở đầu
**Jetpack Compose** là bộ công cụ hiện đại để xây dựng giao diện người dùng Android. **Jetpack Compose** đơn giản hóa và tăng tốc phát triển giao diện người dùng trên Android với ít mã code hơn, các công cụ mạnh mẽ và API Kotlin trực quan.

Trong bài này, bạn sẽ xây dựng một thành phần UI đơn giản với các hàm khai báo. Bạn sẽ không chỉnh sửa bất kỳ layout XML nào hoặc trực tiếp khởi tạo các widget UI. Thay vào đó, bạn sẽ gọi các hàm **Jetpack Compose** để gọi những phần tử nào bạn muốn và trình biên dịch **Compose** sẽ làm phần còn lại.

**Lưu ý:** Các ví dụ trong bài được thực hiện trên phiên bản mới nhất của [Android Studio Preview](https://developer.android.com/studio/preview)
# Tạo một ứng dụng support Jetpack Compose
Nếu bạn muốn bắt đầu một project mới hỗ trợ **Jetpack Compose** mặc định, Android Studio đã include sẵn các mẫu project mới để bạn có thể bắt đầu. Để tạo một project mới bao gồm **Jetpack Compose**, tiến hành các bước sau:
1. Nếu bạn đạng ở cửa sổ **Welcome to Android Studio**, hãy chọn **Start a new Android Studio project**. Nếu bạn đang ở một project mở sẵn, chọn **File > New > New Project** từ thanh menu.
2. Trong cửa sổ **Select a Project Template**, chọn **Empty Compose Activity** rồi **Next**.
3. Trong cửa sổ **Configure your project**, thực hiện các bước sau:
    * Đặt **Name, Package name** và **Save location** cho project.
    * Lưu ý rằng trong menu **Language**, **Kotlin** là tùy chọn duy nhất vì **Jetpack Compose** chỉ hoạt động với những class được viết bằng ngôn ngữ **Kotlin**.
    * Ở tùy chọn **Minimum API level dropdown**, chọn **API level 21 or higher**.
4. Chọn **Finish**


![](https://images.viblo.asia/55bb7d5c-aaec-49a9-8674-6a7270b77566.png)

![](https://images.viblo.asia/6d2cb76e-fd0f-4c42-ae92-373b388621bf.png)

Và đây là kết quả project bạn vừa tạo:
![](https://images.viblo.asia/c827306e-6e49-40b3-b9af-82bb6f30107a.png)

## Thêm Jetpack Compose vào project hiện tại
Nếu bạn muốn sử dụng **Jetpack Compose** trong một dự án hiện có, bạn sẽ cần phải cấu hình dự án của mình với các cài đặt và phụ thuộc bắt buộc
### Cấu hình file Gradle
Bạn cần cài đặt API tối thiểu của ứng dụng thành 21 hoặc cao hơn và bật **Jectpack Compose** trong file `build.gradle` của ứng dụng như dưới đây:
```php
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
    }
}
```

### Sử dụng plugin thử nghiệm Kotlin-Gradle
**Jetpack Compose** hiện yêu cầu phiên bản thử nghiệm của plugin Kotlin-Gradle. Để thêm plugin này, hãy thêm vào file `build.gradle` như sau:
```php
buildscript {
    repositories {
        google()
        jcenter()
        // To download the required version of the Kotlin-Gradle plugin,
        // add the following repository.
        maven { url 'https://dl.bintray.com/kotlin/kotlin-eap' }
    ...
    dependencies {
        classpath 'com.android.tools.build:gradle:4.0.0-alpha01'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.60-eap-25'
    }
}

allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://dl.bintray.com/kotlin/kotlin-eap' }
    }
}
```

### Thêm bộ công cụ Jetpack Compose vào dependencies
Thêm bộ công cụ **Jetpack Compose** vào dependencies của file `build.gradle` như sau:
```php
dependencies {
    // You also need to include the following Compose toolkit dependencies.
    implementation 'androidx.ui:ui-tooling:0.1.0-dev02'
    implementation 'androidx.ui:ui-layout:0.1.0-dev02'
    implementation 'androidx.ui:ui-material:0.1.0-dev02'
    ...
}
```

### Sử dụng Live Preview
**Live Preview** là một tính năng của ANdorid Studio cho phép bạn kiểm tra và so sánh các **composable functions** thông qua orientation, kích thước font và theme mà không cần phải deploy lại ứng dụng.

![](https://images.viblo.asia/eb5648c1-7613-4360-8fd2-83f04f147eed.png)

Như đã thấy ở hình trên, bạn có thể có nhiều preview của một **composable functions** với mỗi giới hạn của kích thước, thu phóng font hoặc theme khác nhau. Ngoài ra bạn có thể click vào các phần tử trong bản preview để nhanh chóng chuyển hướng đến chức năng có thể kết hợp cho phần tử đó trong trình biên soạn code.


### Tạo một Live Preview cơ bản
Dưới đây là ví dụ của một **composable function** được gọi `TutorialPreviewTemplate()`:
```php
@Composable
fun TutorialPreviewTemplate(
    colors: MaterialColors = lightThemeColors,
    typography: MaterialTypography = themeTypography
) {
    val context = +ambient(ContextAmbient)
    val previewPosts = getPostsWithImagesLoaded(posts.subList(1, 2), context.resources)
    val post = previewPosts[0]
    MaterialTheme(colors = colors, typography = typography) {
        Surface {
            PostCardTop(post)
        }
    }
}
```

Để tạo một live preview, tạo mới một **composable function** không có tham số bao gồm annotation `@Preview` ở bên trên annotation `@Composable`:
```php
/// This is the original composable function.
@Composable
fun TutorialPreviewTemplate( ... ) { ... }

// A new composable function that applies the @Preview annotation and does not
// take any parameters.
@Preview
@Composable
fun TutorialPreview() {
    // Call the composable function that you would like to
    // create a live preview for.
    TutorialPreviewTemplate()
}
```

Khi bạn tạo hoặc sửa đổi bản live preview, bạn cần rebuild lại project để xem các thay đổi. Chọn **Build > Make Project** trên thanh menu.

![](https://images.viblo.asia/fcfb40f7-58ab-4b26-a89f-7cdf3607189b.png)

Bạn có thể tạo nhiều bản live preview, xuất hiện cạnh nhau trong cửa sổ Preview của IDE như bên dưới, điều này rất hữu ích để so sánh các **composable function** khi hoạt động.
```php
/// This is the original composable function.
@Composable
fun TutorialPreviewTemplate( ... ) { ... }

@Preview
@Composable
fun TutorialPreview() { ... }

// This live preview uses the app's dark theme.
@Preview
@Composable
fun TutorialPreviewDark() {
    // Although you can't pass arguments to the live preview function itself,
    // you can pass arguments to the composable function that it calls.
    TutorialPreviewTemplate(colors = darkThemeColors)
}
```

![](https://images.viblo.asia/e099a235-47f7-4564-aa14-d301273c56a7.png)

### Đưa arguments thông qua annotation `@Preview`
Annotation `@Preview` có thể chứa các thông số để bạn có thể thay đổi cách IDE định nghĩa một **composable function** trên cửa sổ **Preview**. Trong ví dụ dưới đây, bạn có thể đặt tên cho live preview bằng cách truyền vào 1 chuỗi ký tự, điều này giúp bạn nhận biết các bản preview với nhau:
```php
// Pass a name for the preview to easily identify it in the Preview window.
@Preview("Default colors")
@Composable
fun TutorialPreview() {
    TutorialPreviewTemplate()
}

@Preview("Dark colors")
@Composable
fun TutorialPreviewDark() {
    TutorialPreviewTemplate(colors = darkThemeColors)
}
```

Tham số `@Preview` bạn có thể bổ sung với các đối số như sau:

* `widthDp`: Chiều rộng tối đa, được đo bằng dp, mà IDE có thể sử dụng khi hiển thị bản xem trước trực tiếp. Điều này hữu ích khi bạn muốn xem trước **composable function** của mình trên các kích thước màn hình giới hạn.
* `heightDp`: Chiều cao tối đa, được đo bằng dp, mà IDE có thể sử dụng khi hiển thị bản xem trước trực tiếp. Điều này hữu ích khi bạn muốn xem trước **composable function** của mình trên các kích thước màn hình giới hạn.
* `fontScale`: Hệ số tỉ lện, liên quan đến tỉ lệ base destiny (1f) của font chữ. Điều này hữu ích khi bạn muốn kiểm tra **composable function** cho các tùy chọn kích thước font chữ khác nhau.

```php
@Preview("Font scaling 1.5, height 300", fontScale = 1.5f, heightDp = 300)
@Composable
fun TutorialPreviewFontscale() {
    TutorialPreviewTemplate()
}
```

# Tổng kết
**Jetpack Compose** là tương lai mà các lập trình viên Android cần thiết để xây dựng UI cho ứng dụng của mình một cách nhanh chóng và trực quan hơn. Còn bạn nghĩ sao về nó, hãy comment chia sẻ cảm nhận của bản thân cho mọi người biết nhé.

### Nguồn tham khảo
[Android Developer Site](https://developer.android.com/jetpack/compose/setup#live-preview)