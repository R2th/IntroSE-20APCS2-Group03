![](https://miro.medium.com/max/1760/1*8T8PYf0QF9cgXWlybvDjhg.png)
Khi chúng ta nói vể lint, nhiều developer nghĩ nó liên quan đến code style guide. Chà!, nhưng thực chất không chỉ có thế

> Linting is the process of analyzing code for potential errors.

Là một Android developer, chúng ta sử dụng ngôn ngữ kotlin để phát triển ứng dụng của mình, nhưng làm sao để đoạn code của chúng ta clean và dễ đang để đọc? Có thể vẫn có nhiều người trong chúng ta vẫn bị ảnh hưởng bởi [Java Code Style](https://source.android.com/setup/contribute/code-style) hay một số học theo [Kotlin Style Guide ](https://developer.android.com/kotlin/style-guide)

[Ktlin](https://ktlint.github.io/) có thể là trợ lý của chúng ta, nó được tạo ra để trở thành một định dạng viết tiêu chuẩn của Kotlin với sự đơn giản, mở rộng và có một công đồng hoạt động tích cực. Vậy làm thể nào để chúng ta sử dụng Ktlin trong project của mình?

Chúng ta nên đọc tài liệu trên [Ktlint](https://ktlint.github.io/), có rất nhiều cách để cài đặt Ktlint, ở bài viết này mình chỉ giới thiệu 1 cách 

## Cài đặt
Add Plugin cho build.grade.kts của bạn 

```Kotlin
plugins {
    id("org.jlleitschuh.gradle.ktlint") version Versions.ktlintPlugin
}
```

Sau đó setup các thuộc tính trong Ktlin 
```Kotlin
ktlint {
    version.set(Versions.ktlint)
    debug.set(true)
    verbose.set(true)
    android.set(false)
    outputToConsole.set(true)
    reporters.set(setOf(ReporterType.PLAIN,ReporterType.CHECKSTYLE))
    ignoreFailures.set(true)
    kotlinScriptAdditionalPaths {
        include(fileTree("scripts/"))
    }
    filter {
        exclude("**/generated/**")
        include("**/kotlin/**")
    }
}
```
Thêm ktlin cho các subproject
```Kotlin
subprojects {
    apply(plugin = "org.jlleitschuh.gradle.ktlint")
    
    // Optionally configure plugin
    ktlint {
       debug = true
    }
}
```
Ví dụ chi tiết bạn có thể tham khảo ví dụ sau đây 
```Kotlin 
ext.ReporterType = org.jlleitschuh.gradle.ktlint.reporter.ReporterType

apply plugin: "org.jlleitschuh.gradle.ktlint"

ktlint {
    version = "0.34.2"
    debug = true
    verbose = true
    android = false
    outputToConsole = true
    reporters = [ReporterType.PLAIN, ReporterType.CHECKSTYLE]
    ignoreFailures = true
    enableExperimentalRules = true
    additionalEditorconfigFile = file("/some/additional/.editorconfig")
    kotlinScriptAdditionalPaths {
        include fileTree("scripts/")
    }
    filter {
        exclude("**/generated/**")
        include("**/kotlin/**")
    }
}

buildscript {
    repositories {
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }
    dependencies {
        classpath "org.jlleitschuh.gradle:ktlint-gradle:8.2.0"
    }
}

allprojects {
    /* no need configuration */

}

subprojects {
    apply plugin: "org.jlleitschuh.gradle.ktlint"
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

```Kotlin
import org.jlleitschuh.gradle.ktlint.reporter.ReporterType

plugins {
    id("org.jlleitschuh.gradle.ktlint") version Versions.ktlintPlugin // "8.2.0"
}

ktlint {
    version.set(Versions.ktlint) // "0.34.2"
    debug.set(true)
    verbose.set(true)
    android.set(false)
    outputToConsole.set(true)
    reporters.set(setOf(ReporterType.PLAIN, ReporterType.CHECKSTYLE))
    ignoreFailures.set(true)
    kotlinScriptAdditionalPaths {
        include(fileTree("scripts/"))
    }
    filter {
        exclude("**/generated/**")
        include("**/kotlin/**")
    }
}

buildscript {
    /* no need configuration */
}

allprojects {
    /* no need configuration */
}

subprojects {
    apply(plugin = "org.jlleitschuh.gradle.ktlint")
}

tasks.register("clean", Delete::class) {
    delete(rootProject.buildDir)
}
```
### Kiểm tra lại 
Sau khi confige xong bạn có thể mở terminal và chay lệnh ./gradlew ktlintCheck để thấy các cảnh báo lỗi được tìm thấy 

![](https://miro.medium.com/max/1974/1*XA4G13sUbLAgyNEvQQpl4A.png)

![](https://miro.medium.com/max/1050/1*27tmgWhJTf-y7vl1jdMZ2A.png)
Khi chạy **./gradlew ktlintCheck** nó sẽ hiển thị một số lỗi định dạng. Không chỉ có thế, nó sẽ hiển thị cho bạn chính xác lỗi gặp phải, bạn có thể tự động sửa lỗi bằng cách chạy lệnh: **./gradlew ktlintFormat**

### Tham khảo 
https://proandroiddev.com/simplify-android-kotlin-code-with-ktlint-20c702108901