# Mở đầu
Kotlin đã làm việc cho bạn như thế nào trong các dự án Android của bạn? Điều gì sẽ xảy ra nếu tôi nói với bạn rằng Kotlin có thể được sử dụng để xây dựng các ứng dụng đa nền tảng và rất rõ ràng tôi không chỉ nói về iOS và Android mà ngay cả các ứng dụng JavaScript. Tuyệt vời phải không?
Trong bài này, chúng ta sẽ thảo luận về,
* Kotlin Multiplatform là gì?
* Kotlin Multiplatform hoạt động như thế nào?
* Làm cách nào để thiết lập dự án Đa nền tảng Kotlin của bạn?
* Làm thế nào chúng ta có thể chia sẻ code trên các nền tảng?

Nguồn: https://blog.mindorks.com/getting-started-with-kotlin-multi-platform

# Kotlin Multiplatform là gì?
Khi chúng ta xây dựng một ứng dụng cho khởi nghiệp, chúng ta viết các ứng dụng iOS hoặc Android một cách phổ biến nhất. Chúng ta có thể có thay đổi thiết kế nhưng ít nhiều chúng ta có cùng logic cốt lõi cho các ứng dụng. Vì vậy, thay vì viết hai ứng dụng, Kotlin Multiplatform cung cấp cách chia sẻ business logic phổ biến và xây dựng ứng dụng cho các nền tảng khác nhau bằng cách sử dụng Kotlin.

Kotlin Multiplatform là một tính năng  của ngôn ngữ kotlin cho phép chúng ta chạy Kotlin trong JavaScript, iOS và các ứng dụng máy tính để bàn và do đó phát triển các ứng dụng bằng cách sử dụng Kotlin. Nói ngắn gọn,

> Kotlin Multiplatform says that, it will take care of the buisness logic and we just need to take care of the UI.

Tóm lại, đa nền tảng Kotlin là một cách để chia sẻ code giữa các nền tảng khác nhau.
# Kotlin Multiplatform hoạt động thế nào?
![](https://images.viblo.asia/184580c2-9e65-4fe1-8cbf-522d5f0a6eeb.png)
Ở đây, nếu bạn có thể hình dung khi chúng ta viết Kotlin Shared code cho các nền tảng và sau đó nó sẽ biên dịch nó sẽ được tạo tự động cho nền tảng cụ thể. Ví dụ: nếu bạn compile trên JVM, mã khác sẽ chạy trên Android hoặc bất kỳ nền tảng JVM nào.

Vì vậy, về cơ bản, nó sử dụng lại logic nghiệp vụ gần như phổ biến cho tất cả các ứng dụng.
# Làm thế nào để set up Kotlin Multiplatform project?
Bây giờ, từ phần này, chúng ta sẽ đi sâu vào code và setup dự án. Để bắt đầu, chúng ta phải cài đặt IntelliJ CE Version và thiết lập trong máy local của bạn. Trong trường hợp của tôi, tôi đang sử dụng Macbook. Sau khi chạy nó, tôi sẽ thấy
## Bước 1
Chạy IDE và chọn Mobile Android / iOS từ phần bên dưới, sau đó nhấn next.
![](https://images.viblo.asia/28fb88a7-3e59-4f42-a0ec-4bf858f5f3a0.png)
## Bước 2
Sau đó, chúng ta đến màn hình này, chúng ta chỉ cần xử lý trước.
![](https://images.viblo.asia/3c0c6bf7-b952-4544-8762-4fa43035c072.png)
## Bước 3
Trong phần này, bạn cần đặt đường dẫn cụ thể nơi bạn muốn lưu trữ dự án và chỉ cần nhấn vào kết thúc. Dự án của bạn sẽ được thiết lập.

Bây giờ, khi thiết lập xong, dự án của bạn sẽ xuất hiện một lỗi như sau,
![](https://images.viblo.asia/f8f8bb28-8bb7-4734-abb1-b16ff45b3cc6.png)
Điều này về cơ bản có nghĩa là chúng ta cần đặt đường dẫn của SDK của mình trong tệp local.properIES. 
> Mẹo: Nếu bạn đã có bất kỳ dự án Android nào của mình, chỉ cần kiểm tra local.properies của họ và bạn sẽ tìm thấy đường dẫn của thư mục
 
Đây là cách chúng tôi có thể thiết lập dự án trong Kotlin MultiPl Platform. Đây chỉ là một sự khởi đầu.

Bây giờ chúng ta mô đun hóa dự án. Đối với dự án này, trước tiên chúng tôi sẽ lấy dự án và nhập nó bằng Android Studio. Bạn có thể tải xuống và thiết lập Android Studio từ đây.

Hãy nhập dự án và đi đến cấu trúc dự án trong Android Studio.
![](https://images.viblo.asia/bf9c0b3f-7e36-48b3-8c8c-a155d1e98f6a.png)

Ở đây, trong thư mục ứng dụng, chúng ta sẽ có
![](https://images.viblo.asia/fbdc1b75-4a16-4597-9c77-57ce25b7e825.png)
Trong đoạn mã trên, src chứa tất cả mã. Đối với dự án này, chúng tôi sẽ xóa tất cả các mô-đun lúc đầu và sau đó sẽ bắt đầu tạo thư mục / gói riêng của chúng tôi.

Bây giờ, chúng ta sẽ đổi tên **app** folder thành **shared**. Và sau đó chúng ta sẽ bắt đầu mô đun hóa  phần code base.

Chúng ta sẽ tạo 4 thư mục trong **src** của **shared** có tên là **androidMain**, **iosMain**, **commonMain**, **main**. Bây giờ, hãy tạo một thư mục kotlin trong ba thư mục đầu tiên và AndroidManifest.xml trong thư mục **main** Cấu trúc mới sẽ như  đây,

![](https://images.viblo.asia/c6c355e6-ca1c-44b3-ab8c-957097c20d9b.png)

 Về cơ bản, chúng ta có hai dự án **shared** và **iosApp**, một dự án chứa các thư mục trên và **iosApp** mà chúng ta đã nhận được khi tạo dự án.

Bây giờ, chúng ta cần tạo một dự án Android. Vì vậy, để làm điều đó, chúng tôi sẽ tạo một dự án Android bằng Android Studio ở một nơi khác trong hệ thống của chúng ta với Activity trống (giả sử MainActivity) và nhanh chóng sao chép trong thư mục dự án đa nền tảng mà chúng tôi đã tạo dưới dạng gói AndroidApp. Vì vậy, bây giờ dự án đa nền tảng cuối cùng trông như,
![](https://images.viblo.asia/c2995022-894e-47b4-9b6a-e77ac81f2e7c.png)
Ở đây, androidApp là dự án Android mà chúng ta đã tạo bằng Android Studio và dán nó ở đây. Bây giờ, chỉnh sửa tệp settings.gradle và thay thế bao gồm dòng,
```kotlin
include ':androidApp', ':shared'
```
Vì vậy, bây giờ hãy thực hiện một số code trong các dự án multiplatform.

Đầu tiên, chúng ta cần thiết lập build.gradle của một dự án chia sẻ. Chúng tôi sẽ thay thế bằng,
```kotlin
plugins {
    id 'org.jetbrains.kotlin.multiplatform'
}
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    buildTypes {
        release {
            minifyEnabled false
        }
    }
}

kotlin {
    android("android")
    // This is for iPhone emulator
    // Switch here to iosArm64 (or iosArm32) to build library for iPhone device
    targets {
        final def iOSTarget = System.getenv('SDK_NAME')?.startsWith("iphoneos") \
                          ? presets.iosArm64 : presets.iosX64

        fromPreset(iOSTarget, 'ios') {
            binaries {
                framework()
            }
        }
    }
    sourceSets {
        commonMain {
            dependencies {
                implementation kotlin('stdlib-common')
            }
        }
        commonTest {
            dependencies {
                implementation kotlin('test-common')
                implementation kotlin('test-annotations-common')
            }
        }
        androidMain {
            dependencies {
                implementation kotlin('stdlib')
            }
        }
        androidTest {
            dependencies {
                implementation kotlin('test')
                implementation kotlin('test-junit')
            }
        }
        iosMain {
        }
        iosTest {
        }
    }
}

// This task attaches native framework built from ios module to Xcode project
// (see iosApp directory). Don't run this task directly,
// Xcode runs this task itself during its build process.
// Before opening the project from iosApp directory in Xcode,
// make sure all Gradle infrastructure exists (gradle.wrapper, gradlew).
task copyFramework {
    def buildType = project.findProperty('kotlin.build.type') ?: 'DEBUG'
    def target = project.findProperty('kotlin.target') ?: 'ios'
    dependsOn kotlin.targets."$target".binaries.getFramework(buildType).linkTask

    doLast {
        def srcFile = kotlin.targets."$target".binaries.getFramework(buildType).outputFile
        def targetDir = getProperty('configuration.build.dir')
        copy {
            from srcFile.parent
            into targetDir
            include 'shared.framework/**'
            include 'shared.framework.dSYM'
        }
    }
}

task iosTest {
    def device = project.findProperty("iosDevice")?.toString() ?: "iPhone X"
    dependsOn kotlin.targets.ios.binaries.getTest('DEBUG').linkTaskName
    group = JavaBasePlugin.VERIFICATION_GROUP
    description = "Runs iOS tests on a simulator"

    doLast {
        def binary = kotlin.targets.ios.binaries.getTest('DEBUG').outputFile
        exec {
            commandLine 'xcrun', 'simctl', 'spawn', device, binary.absolutePath
        }
    }
}

tasks.check.dependsOn iosTest
```
Ở đây, chúng ta đã thêm một plugin cho đa nền tảng và thư viện. Chúng ta đã thêm thư viện plugin để nó có thể được nhập vào AndroidApp dự án Android.
```kotlin
kotlin {
}
```
Trong phần này, chúng ta thêm cấu hình thiết bị nơi tôi có thể chạy các ứng dụng để kiểm tra. Chúng tôi đã thêm iOS và Android bằng cách sử dụng,
```kotlin
android("android")
// This is for iPhone emulator
// Switch here to iosArm64 (or iosArm32) to build library for iPhone device
targets {
    final def iOSTarget = System.getenv('SDK_NAME')?.startsWith("iphoneos") \
                      ? presets.iosArm64 : presets.iosX64

    fromPreset(iOSTarget, 'ios') {
        binaries {
            framework()
        }
    }
}
```
Lần nữa,
```kotlin
sourceSets {
}
```
chứa sự phụ thuộc cho các dự án riêng lẻ như được chỉ định ở trên.

Bây giờ, để tích hợp *shared module* trong ứng dụng Android, ta sẽ triển khai nó dưới dạng thư viện của Android,

```kotlin
implementation project(':shared')
```
# Cùng chạy app Hello World nào :))
Tạo một tệp Sample.kt trong thư mục shared/kotlin và thêm,
```kotlin
object Sample {
    fun sayHelloWorld(): String = "Hello World"
}
```
trong androidApp, chúng tôi có thư mục Activity (MainActivity.kt) khi chúng tôi tạo dự án bằng Android Studio. Tệp hoạt động sẽ có tệp XML của nó với textView như thế này
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:id="@+id/text"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

và trong MainActivity.kt, tôi sẽ chỉ đặt văn bản thành textView này trong onCreate () như,
```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        text.text = Sample.sayHelloWorld()

    }
}
```
Vì vậy, khi chúng tôi chạy ứng dụng Android, nó sẽ tạo đầu ra
![](https://images.viblo.asia/510b6560-1428-48fc-9e4c-13d634c10f11.png)
Đây là cách chúng ta có thể chạy ứng dụng Android trong trình giả lập. Trong ví dụ trên, chúng tôi chỉ chia sẻ một logic chung để in "Hello World", đây chỉ là một biểu diễn chuỗi.
# Làm thế nào chúng ta có thể chia sẻ mã trên các nền tảng?
Điều gì xảy ra nếu chúng ta phải chia sẻ một số bộ mã, chỉ dành riêng cho nền tảng. Vì vậy, ví dụ để chứng minh,
```kotlin
if(platform == "iOS"){

}else if(platform =="android") {
    
}
```
Ở đây chúng ta cần phải làm một cái gì đó như thế này, giống như các nền tảng chéo khác. Nhưng trong Kotlin chúng ta có những từ khóa như thực tế và mong đợi.

Để giải thích cho bạn rõ hơn, giả sử tôi muốn in Phiên bản Android mà ứng dụng đang chạy. Điều này không thể được thực hiện từ gói chia sẻ chung.

Trước tiên hãy vào  shared->main->AndroidManifest.xml và thêm phần sau đây,
```kotlin
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="<my project package>"/>
```
Vì vậy, để có được sự triển khai đầy đủ của mã dành riêng cho nền tảng, kotlin có hai từ khóa thực tế và mong đợi. Hãy hiểu họ,

trong Sample.kt của mô-đun shared / commonMain, tôi sẽ thêm
```kotlin
expect fun platformName(): String

object Sample {
    fun sayPlatformName(): String = platformName()
}
```
và trong Sample.kt của mô-đun chia sẻ / androidMain, chúng tôi sẽ làm
```kotlin
import android.os.Build

actual fun platformName(): String = "Android ${Build.VERSION.SDK_INT}"
```
Tại đây, bạn có thể thấy *Sample.kt* của **androidMain**, chúng tôi có một hàm gọi là **platformName()** với từ khóa thực tế trả về Phiên bản API của Android. Nó được nhập từ gói android.os.Build.

và trong Sample.kt của commonMain, chúng tôi tạo hàm platformName() với từ khóa mong đợi. và trong đối tượng, chúng ta có **sayPlatformName()** với trả về platformName().

Và trong MainActivity của dự án Android, chúng tôi gọi sayPlatformName là,
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ....
    text.text = Sample.sayPlatformName()
}
```
và khi chúng ta chạy nó,
![](https://images.viblo.asia/32a9578f-d17b-4fb7-8062-3c540967ad25.png)
Nó tạo ra đầu ra với mã phiên bản, tức là 28.

Nhưng chính xác những gì đang xảy ra ở đây? Hãy phá vỡ nó từng bước một.

* **expect**, xác định rằng tên hàm được mong đợi từ mã dành riêng cho nền tảng.
* **actual**, xuất mã từ nền tảng có cùng tên hàm mà hàm mong đợi trong mã được chia sẻ chung.
* Tất cả các tuyên bố thực tế phù hợp với bất kỳ phần nào của một tuyên bố dự kiến cần phải được đánh dấu là tất cả thực tế.
* chức năng mong đợi sẽ không bao giờ thực hiện bất kỳ.
Mô tả hình ảnh của kỳ vọng thực tế là,

![](https://images.viblo.asia/85fdcde6-99e7-43e4-a6fe-4e93b734848a.png)

Vì vậy, đây là cách chúng ta có thể viết mã dành riêng cho nền tảng cho Android, iOS hoặc JS.

Đó là cách bạn thiết lập một dự án Đa nền tảng và làm việc với nó.