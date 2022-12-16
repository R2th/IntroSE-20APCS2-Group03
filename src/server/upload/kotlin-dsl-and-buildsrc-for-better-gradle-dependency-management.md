# 1. What is DSL?
## 1.1 DSL and GPL
Bạn có thể đã nghe về thuật ngữ như DSL và GPL. Nhưng 2 khái niệm này thực sự có ý nghĩa gì và chúng khác nhau như thế nào? 

**DSL, Domain-specific language** nó là 1 ngôn ngữ lập trình để viết " đánh dấu" ra những thứ rất cụ thể của ứng dụng. SQL, HTML, Groovy - nghe có vẻ quen thuộc phải không?

Bạn sử dụng **SQL** để viết các câu truy vấn với cơ sở dữ liệu, **HTML** để đánh dấu các thẻ của 1 trang WEB, **Groovy** nơi viết các tập lệnh của dự án, nơi quản lý các thư viện mà bạn sử dụng trong dự án. **DSL** không cung cấp quá nhiều hàm hay sự tùy biến trong nó nhưng nó cung cấp 1 giải pháp hiệu quả để giải quyết 1 vấn đề.


**GPL, General-purpose language** trái ngược với **DSL** đây là các ngôn ngữ lập trình như Kotlin, Java, Php vvv. Chúng linh hoạt, cung cấp cho bạn nhiều tính năng và là ngôn ngữ chính để bạn viết ứng dụng của mình.

## 1.2 What is Kotlin DSL?

- IDE hỗ trợ tự động gợi ý, tái sử dụng code, 
- Tự động phát hiện và `imports`
- Sử dụng cách viết của **Kotlin** một cách linh hoạt
- Sử dụng chung được các câu lệnh của **Kotlin** và tập lệnh dựa trên **Groovy**. Ví dụ. có `build.gradle` của một mô-đun được viết bằng **Groovy** và một mô-đun khác viết bằng `Kotlin DSL`

# 2. Using Kotlin DSL write build.gradle.kts
## 2.1 Update Gradle version
**Kotlin DSL** hỗ trợ `gradle-4.5.1` trở lên nên bạn cần cập nhật lại file `gradle-wrapper.properties` 
```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-4.5.1-all.zip
```

## 2.2 Create buildSrc directory

**Gradle**  cung cấp 1 số cách để bạn có thể xây dựng được `logic build` của dự án. Một trong những cách đó là tạo thư mục **buildSrc** trong thư mục gốc của dự án, khi bạn chạy **Gradle** nó sẽ kiểm tra sự tồn lại của một thư mục có tên **buildSrc**. **Gradle** sau đó sẽ tự động biên dịch và khởi tạo các đường dẫn tới đoạn code bạn viết trong thư mục **buildSrc**.

Với dự án có nhiều mô-đun `multi-project builds` thì bạn chỉ cần đặt thư mục **buildSrc** ở thư mục gốc ( và chỉ có duy nhất 1 thư mục **buildSrc** mà thôi ) cùng cấp  mô-đun bạn sử dụng.

Từ [Gradle Documentation](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html#sec:build_sources):

> When you run Gradle, it checks for the existence of a directory called buildSrc. Gradle then automatically compiles and tests this code and puts it in the classpath of your build script. You don’t need to provide any further instruction.
>


Bạn cần viết 2 trong thư mục **buildSrc** này

- build.gradle.kts
- Kotlin Code hoặc Java Code (nhưng ở đây mình khuyến cáo các bạn sử dụng Kotlin code)


![](https://images.viblo.asia/feda10ef-1ab0-4eb2-b8e8-89c907092209.png)



ở file **build.gradle.kts** đặt đoạn mã 

```Kotlin
import org.gradle.kotlin.dsl.`kotlin-dsl`

plugins {
    `kotlin-dsl`
}
```
để cho phép sử dụng `kotlin-dsl plugin`

Trong thư mục `src/main/kotlin` mình viết 2 file Kotlin code.

**Version.kt** nơi mình định nghĩa các Version của các thư viện sử dụng trong dự án.
```Kotlin
object Versions {
        val kotlin_version = "1.2.31"
        val android_plugin_version = "3.1.0"
        val support_lib = "27.0.2"
        val retrofit = "2.3.0"
        val rxjava = "2.1.9"
        val constraint_layout = "1.1.0-beta6"
        val junit = "4.12"
        val junit_runner = "1.0.1"
        val espresso_core = "3.0.1"
        // ...
    }
```

**Config.kt** nơi mình viết các liên kết đến các thư viện mình sử dụng.

```Kotlin
object BuildPlugins {
        val android_plugin = "com.android.tools.build:gradle:${Versions.android_plugin_version}"
        val kotlin_plugin = "org.jetbrains.kotlin:kotlin-gradle-plugin:${Versions.kotlin_version}"
    }

    object Android {
        val applicationId = "com.jetruby.kotlindslgradleexample"
        val build_tools_version = "27.0.3"
        val compileSdk = 27
        val minSdk = 16
        val targetSdk = 27
        val versionCode = 1
        val versionName = "1.0"
    }

    object Libs {
        val kotlin_stdlib = "org.jetbrains.kotlin:kotlin-stdlib-jre8:${Versions.kotlin_version}"

        val support_annotations = "com.android.support:support-annotations:${Versions.support_lib}"
        val support_appcompat_v7 = "com.android.support:appcompat-v7:${Versions.support_lib}"
        val retrofit = "com.squareup.retrofit2:retrofit:${Versions.retrofit}"
        val retrofit_rxjava_adapter = "com.squareup.retrofit2:adapter-rxjava2:${Versions.retrofit}"
        val rxjava = "io.reactivex.rxjava2:rxjava:${Versions.rxjava}"
        val constraint_lauout =
            "com.android.support.constraint:constraint-layout:${Versions.constraint_layout}"

        val junit = "junit:junit:${Versions.junit}"
        val junit_runner = "com.android.support.test:runner:${Versions.junit_runner}"
        val espresso_core = "com.android.support.test.espresso:espresso-core:${Versions.espresso_core}"
    }
```

Sau khi đã định nghĩa và đồng bộ lại **Gradle** thì mình có thể truy cập các giá trị trên ở bất cứ chỗ nào mình cần trong dự án.


## 2.3 Write build.gradle.kts

Như đã nói ở trên thì sau khi đồng bộ **Gradle** thì mình có thể truy cập các giá trị đã được định nghĩa trong 2 file `Config.kt` và `Version.kt` ở bất kỳ đâu trong dự án, nhưng mà trong giới hạn khuôn khổ nhỏ của bài viết mình sẽ chỉ giới thiệu với các bạn sử dụng các giá trị trong 2 file trên để viết các `build.gradle.kts` file trong dự án.


Khi các khởi tạo 1 **Project** hay 1 **Module** trong dự án thì mặc định  Android Studio sẽ sinh ra cho bạn mỗi 1 Project hay Module 1 file `build.gradle`. Các `build.gradle` là nơi bạn định nghĩa các rằng buộc về thư viện sử dụng "build.gradle trong các Module" hay cấu hình cho Project dự án "trong build.gradle của Root Project". Để sử dụng được cách viết `Kotlin-dsl` thì các cần đổi tên các thư mục `build.gradle` này thành `build.gradle.kts`. 

Điều này cho phép **Gradle** sử dụng các đoạn mã **Kotlin** khi đồng bộ dự án của bạn.

Nhưng có 1 vấn đề ở đây khi bạn **Rename** từ `build.gradle -> build.gradle.kts` là các đoạn code cũ với cách viết **Groovy** không còn phù hợp với file `build.gradle.kts` và bạn cần sửa đổi để chúng có thể được đồng bộ.

![](https://images.viblo.asia/e56ac675-7fc8-4ffb-8c3a-abfcff89d795.png)

Các bạn đừng nhìn thấy lỗi báo đỏ choe choét này là hoảng sợ nhé. Mình sẽ hướng dẫn các bạn Fix bug ngay ở dưới đây thôi :D

### 2.3.1 Configuring plugins

```Kotlin

plugins {
    id("com.android.application")
    kotlin("android")
    kotlin("android.extensions")
    kotlin("kapt")
}
```

đây là cách viết bằng **Kotlin** để **Gradle** có thể biên dịch được các **plugins** sử dụng trong Project.

- id() để cung cấp đĩnh nghĩa các **plugins** thông thường cho Android
- kotlin() để cung cấp đĩnh nghĩa các **plugins Kotlin**   cho Android

### 2.3.2 Configuring ‘android’ block

```Kotlin
android {
    compileSdkVersion(Config.Android.compileSdk)
    buildToolsVersion(Config.Android.build_tools_version)

    defaultConfig {
        minSdkVersion(Config.Android.minSdk)
        targetSdkVersion(Config.Android.targetSdk)

        applicationId = Config.Android.applicationId
        versionCode = Config.Android.versionCode
        versionName = Config.Android.versionName

        testInstrumentationRunner = "android.support.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles("proguard-rules.pro")
        }
    }
}
```

ở phần Android Block bạn cũng cần thay đổi 1 chút để phù hợp với cách viết code của Kotlin.

Như ở đây các bạn thấy mình đã sử dụng các định nghĩ có sẵn từ trước trong file **Config.kt** và khi viết như vậy thì IDE sẽ hỗ trợ bạn "auto complete" viết code =)) thật đơn giản phải không nào.


```Kotlin
dependencies {
    implementation(Config.Libs.kotlin_stdlib)
    implementation(Config.Libs.retrofit)
    implementation(Config.Libs.retrofit_rxjava_adapter)
    implementation(Config.Libs.support_appcompat_v7)
    implementation(Config.Libs.support_annotations)
    implementation(Config.Libs.constraint_lauout)

    testImplementation(Config.Libs.junit)
    androidTestImplementation(Config.Libs.junit_runner)
    androidTestImplementation(Config.Libs.espresso_core)
}
```

Tiếp đến là các thư viện sử dụng trong Project. Ngoài ra còn khá nhiều thay đổi trong cách viết trong file `.kts` các bạn có thể [tham khảo ở đây.](https://guides.gradle.org/migrating-build-logic-from-groovy-to-kotlin/)

Có 1 điều tuyệt vời khi các bạn đã định nghĩa sẵn các `Lib` hay `Config` ở thư mục **buildSrc** là với Project được chia nhỏ thành nhiều **Module** như trong mô hình **Clean Architecture**  là đoạn mã có thể tái sửa dụng ở các file `build.gradle.kts` của từng Module kiến cho việc đồng bộ về thư viện, phiên bản xuyên suốt các Module trở nên dễ dàng hơn.


**module_a/build.gradle.kts**
```Kotlin
dependencies {
    implementation(Config.Libs.kotlin_stdlib)
    implementation(Config.Libs.retrofit)
    implementation(Config.Libs.retrofit_rxjava_adapter)
    implementation(Config.Libs.support_appcompat_v7)
    implementation(Config.Libs.support_annotations)
    implementation(Config.Libs.constraint_lauout)
    //...
}
```


**module_b/build.gradle.kts**
```Kotlin
dependencies {
    implementation(Config.Libs.kotlin_stdlib)
    implementation(Config.Libs.retrofit)
    implementation(Config.Libs.retrofit_rxjava_adapter)
    implementation(Config.Libs.support_appcompat_v7)
    implementation(Config.Libs.support_annotations)
    implementation(Config.Libs.constraint_lauout)
    //...
}
```
Và khi bạn cần thay đổi Version của 1 thư viện thì bạn chỉ cần chỉnh sửa version ở file `Version.kt`  rồi đồng bộ lại **Gradle** là toàn bộ các Module trong dự án có sử dụng thư viện đó cũng sẽ được thay đổi theo, đây chính là tính tái sử dụng rất tốt mà **Kotlin-dsl** mang lại.




> Trên đây mình vừa mới giới thiệu với các bạn một cách viết khá mới và hay khi định nghĩa các **Gradle** trong dự án Android. Cách viết mới sẽ làm một số bạn mới làm quen bỡ ngỡ nhưng sử dụng dần thì các bạn sẽ thấy được sự tiện dụng cũng như tính năng ưu việt mà nó mang lại. Hi vọng bài viết sẽ giúp bạn hiểu thêm về Kotlin-dsl và sử dụng Kotlin-dsl 1 cách thành thạo hơn