Như các bạn đã biết, chúng ta sử dụng `Groovy` để viết Gradle build scripts. `Groovy` là ngôn ngữ động nên nó không có kiểu tĩnh, điều này sẽ gây khó khăn khi viết hoặc chỉnh sửa Gradle scripts vì tính năng tự động hoàn thiện không quá chính xác. Để cải thiện việc này, Gradle đã bắt đầu sử dụng Kotlin để viết scripts - "Gradle Kotlin Script". Ở bài viết này, mình sẽ hướng dẫn các bạn sử dụng *Gradle Kotlin Script* trong một project Android. Gradle's Kotlin DSL đã được thêm vào từ phiên bản Gradle 4.10 nên hãy chắc chắn bạn sử dụng Gradle 4.10 trở lên nhé ;)

#### Bước 1: tạo thư mục `buildSrc`
Khi tạo 1 project mới, Android Studio sẽ sinh ra 2 file `build.gradle`: 1 cho project và 1 cho *app* module.

Ta cần sắp xếp các thư viện được sử dụng một cách rõ ràng và tập trung nhất. Điều này giúp quản lý các thư viện dễ dàng hơn. Ví dụ như project của bạn có nhiều modules và các module này sử dụng cùng một vài thư viện. Nhưng thời điểm thêm thư viện vào module là khác nhau nên rất dễ xảy ra trường hợp phiên bản của các thư viện đó khác nhau làm mất sự đồng nhất trong source code.

Tạo thư mục `buildSrc` ngay dưới thư mục gốc của project sẽ giúp giải quyết vấn đề trên. Thư mục này là một tính năng của Gradle cho phép người dùng định nghĩa các tác vụ cũng như công cụ sử dụng trong suốt quá trình xây dựng các build scripts của project. Ta cũng có thể sử dụng Kotlin trong thư mục này bằng cách khai báo phần mở rộng `kotlin-dsl` ở file build config của thư mục.

Nếu bạn muốn tìm hiểu thêm về thư mục `buildSrc` này thì có thể nghiên cứu tài liệu của Gradle ở [đây](https://docs.gradle.org/current/userguide/organizing_gradle_projects.html#sec:build_sources).

Tiếp tới, tạo 2 files bên trong thư mục `buildSrc`:
1. **build.gradle.kts**
2. **Dependencies.kt** (bên trong thư mục con src/main/kotlin)

#### Bước 2: Sử dụng phần mở rộng `kotlin-dsl` trong `build.gradle.kts`
```kotlin
repositories {
    jcenter()
}

plugins {
    `kotlin-dsl`
}
```
File này có đuôi `.kts` để Gradle xác định đây là file script được viết bằng Kotlin chứ không phải Groovy.

#### Bước 3: Thêm các thư viện sử dụng trong project
```kotlin
const val kotlinVersion = "1.3.71"

object BuildPlugins {
    object Versions {
        const val buildToolVersion = "3.6.3"
    }

    const val androidGradlePlugin = "com.android.tools.build:gradle:${Versions.buildToolVersion}"
    const val kotlinGradlePlugin = "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion"
    const val androidApplication = "com.android.application"
    const val kotlinAndroid = "kotlin-android"
    const val kotlinAndroidExtensions = "kotlin-android-extensions"

    object BuildType {
        const val release = "release"
        const val debug = "debug"
    }
}

object AndroidSdk {
    const val min = 23
    const val compile = 29
    const val target = compile
    const val buildToolVersion = "29.0.1"
}

object AppConfig {
    const val applicationId = "com.illidant.moviedb"
    const val versionCode = 1
    const val versionName = "1.0"
    const val testInstrumentationRunner = "android.support.test.runner.AndroidJUnitRunner"
}

object Libraries {
    private object Versions {
        const val appCompat = "1.1.0"
        const val constraintLayout = "1.1.3"
        const val ktx = "1.2.0"
    }

    const val kotlinStdLib = "org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion"
    const val appCompat = "androidx.appcompat:appcompat:${Versions.appCompat}"
    const val constraintLayout =
        "androidx.constraintlayout:constraintlayout:${Versions.constraintLayout}"
    const val ktxCore = "androidx.core:core-ktx:${Versions.ktx}"
}

object TestLibraries {
    private object Versions {
        const val junit = "4.12"
        const val junitExt = "1.1.1"
        const val espresso = "3.2.0"
    }

    const val junit = "junit:junit:${Versions.junit}"
    const val junitExt = "androidx.test.ext:junit:${Versions.junitExt}"
    const val espresso = "androidx.test.espresso:espresso-core:${Versions.espresso}"
}
```

Đây đơn thuần là một file Kotlin lưu trữ các thư viện cũng như phiên bản của chúng được dùng xuyên suốt project. Quản lý các thư viện tập trung và rõ ràng như vậy rất dễ để quản lý sau này.

#### Bước 4: Chuyển đổi các file `build.gradle` và thêm vào các giá trị từ file `Dependencies.kt`
Đổi tên file `build.gradle` ở project level thành `build.gradle.kts`. Thay đổi các classpath bên trong `dependencies` block với các giá trị từ bản `Dependencies.kt` và chuyển đổi tác vụ `clean` thành cú pháp Kotlin. Sau khi sửa đổi thì file `build.gradle.kts` sẽ trông như dưới đây:
```kotlin
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath(BuildPlugins.androidGradlePlugin)
        classpath(BuildPlugins.kotlinGradlePlugin)
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

tasks {
    val clean by registering(Delete::class) {
        delete(buildDir)
    }
}
```

Tương tự như vậy với file `build.gradle` ở module `app`:
```kotlin
plugins {
    id(BuildPlugins.androidApplication)
    id(BuildPlugins.kotlinAndroid)
    id(BuildPlugins.kotlinAndroidExtensions)
}

android {
    compileSdkVersion(AndroidSdk.compile)
    defaultConfig {
        applicationId = AppConfig.applicationId
        minSdkVersion(AndroidSdk.min)
        targetSdkVersion(AndroidSdk.target)
        versionCode = AppConfig.versionCode
        versionName = AppConfig.versionName
        testInstrumentationRunner = AppConfig.testInstrumentationRunner
    }
    buildTypes {
        getByName(BuildPlugins.BuildType.release) {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    implementation(
        fileTree(
            mapOf(
                "dir" to "libs",
                "include" to listOf("*.jar")
            )
        )
    )
    implementation(Libraries.kotlinStdLib)
    implementation(Libraries.appCompat)
    implementation(Libraries.ktxCore)
    implementation(Libraries.constraintLayout)

    testImplementation(TestLibraries.junit)
    androidTestImplementation(TestLibraries.junitExt)
    androidTestImplementation(TestLibraries.espresso)
}
```
Giờ chỉ cần build và chạy project thôi.

Trên đây mình đã hướng dẫn các bạn sử dụng Gradle Kotlin Script vào 1 project Android. Nếu bài viết có gì sai sót mong các bạn góp ý để mình hoàn thiện bài viết hơn nhé. Happy coding!!!