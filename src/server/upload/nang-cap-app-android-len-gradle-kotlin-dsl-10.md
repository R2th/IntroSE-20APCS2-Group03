![](https://images.viblo.asia/3bfb94ee-6881-4dbb-981b-bff1c35b0141.jpeg)
source: https://android.jlelse.eu/defining-dependencies-in-gradle-kotlin-dsl-8da748276e9e
# Giới thiệu

**Kotlin DSL RC 1.0** đã được giới thiệu và từ nay các bạn có thể code gradle bằng Kotlin thay vì Groovy như trước. Có nhiều lí do khiến cho Gradle làm như vậy nhưng nhìn chung là họ muốn mang đến cho mọi IDE sức mạnh của build script.

- Tự động hoàn thiện
- Hỗ trợ nội dung
- Tài liệu dễ dàng
- Dễ xem source
- Tối ưu và hơn thế nữa

Phiên bản 1.0 này các bạn có thể sử dụng với **Gradle từ 4.10 trở lên**. Bản phát hành chính thức sẽ đến với Gradle 5. Họ cho biết rằng sẽ không có sự thay đổi nào quá lớn nên bạn có thể tiến hành nâng cấp app Android của mình ngay từ bây giờ.

Và bản thân mình thì mình sẽ ứng dụng vào app Movie DB huyền thoại, nơi mình thử nghiệm các công nghệ mới để áp dụng cho dự án.

https://github.com/dangquanuet/The-Movie-DB-Kotlin

Nếu bạn chỉ cần xem thực tế code như thế nào thì bạn có thể xem ở pull request sau:

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/53/files

# Nâng cấp lên Gradle 4.10

Đầu tiên bạn cần nâng cấp lên Gradle 4.10 hoặc cao hơn. Bạn có thể thực hiện bằng cách vào và sửa file [gradle-wrapper.properties](https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/gradle/wrapper/gradle-wrapper.properties)

```
#Thu Sep 06 14:20:52 ICT 2018
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-4.10-all.zip
```

# Nâng cấp Android Studio

Hãy đảm bảo rằng bạn đã lên phiên bản Android Stuido stable mới nhất để tránh lỗi không đán có, tại thời điểm mình viết thì là **Android Studio 3.1.4**.

TIếp theo chúng ta sẽ thực hiện chuyển các file gradle sang Kotlin Script

# KTS extension

**Ktx** là phần mở rộng của **Gradle Kotlin Scripts**. Chúng ta sẽ đổi tên file **build.gradle** sang file **build.gradle.ktx**

## root > settings.gradle.kts

Đổi tên (Shift + F6) file **settings.gradle** thành file **settings.gradle.kts**. Sau đó bạn sửa nội dung của file đó thành như sau

```kotlin
// before
include ':app'

// after
include(":app")
```

Nếu lúc này bạn thử chạy gradle thì sẽ thấy lỗi như sau

```
Configuration on demand is not supported by the current version of the Android Gradle plugin since you are using Gradle version 4.6 or above. Suggestion: disable configuration on demand by setting org.gradle.configureondemand=false in your gradle.properties file or use a Gradle version less than 4.6.
Open File
```

Để sửa lỗi này thì bạn cần **bỏ check Configure on demand**

**Android Studioi > Settings/Preferences > Build, Execution.. > Compiler**

![](https://images.viblo.asia/dc791df1-36b3-4195-910c-e2530ea46e54.png)

Làm như trên sẽ giải quyết được lỗi trước đó. TIếp theo chúng ta sẽ cập nhật các file gradle

## root > build.gradle.kts

Bạn cần đổi tên **build.gradle** thành **build.gradle.kts**, sau đó chúng ta thực hiện việc thay thế code Groovy bằng Kotlin như sau

```
// before
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

// after
classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.2.61")
```

chi tiết hơn thì các bạn xem ở đây nhé

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/53/files#diff-392475fdf2bc320d17762ed97109a121

## app > build.gradle.kts

Chúng ta làm tương tự là đổi tên **build.gradle** thành **build.gradle.kts** và thực hiện cập nhật code Kotlin.

```
// before
apply plugin: 'com.android.application'

// after
plugins {
    id("com.android.application")
    ...
}
```

tương tự với các phần khác trong file **app > build.gradles.kts**. Trong khi mình update thì có gặp một số lỗi tương thích và mình đã fix hết. Chi tiết các bạn có thể xem ở link sau của mình.

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/53/files#diff-392475fdf2bc320d17762ed97109a121

![](https://images.viblo.asia/694901de-ce81-4a20-999e-cf6dfbc57da7.png)

Đặc biệt Gradle Kotlin DSL hỗ trợ **auto-reload** khi bạn thay đổi thuộc tính trong gradle, thay vì cứ phải sync gradle mỗi lần thêm hoặc xoá. Thật tiện phải không nào.

Đây là toàn bộ pull request thực hiện việc nâng cấp lên Gradle Kotlin DSL 1.0 của mình, các bạn có thể tham khảo nhé.

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/53/files

# Nguồn
Bài viết có tham khảo từ bài dưới đây.
https://proandroiddev.com/migrating-android-app-to-gradle-kotlin-dsl-1-0-c903760275a5