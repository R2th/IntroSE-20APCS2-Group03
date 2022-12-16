Có bao giờ bạn bị *comment* chỉ vì *code format* của bạn khác với những người còn lại? bạn phải hì hục chỉnh sửa thay đổi *code setting* trong *Android Studio*? *import setting* của người khác vào *AS* và làm lại điều này nhiều lần trên nhiều *project* khác nhau? Thực sự hơi phiền toái !

Trong bài viết này, mình sẽ giới thiệu cho các bạn 2 công cụ mình thường hay sử dụng trong *code android* là `ktlint` và `detekt` để kiểm tra *code style*, *format code* và *code smell*. Việc *config* được thực hiện trực tiếp trên *code base* và kết quả hoàn toàn giống nhau trên các máy khác nhau nên rất thuận tiện. Bài viết chủ yếu *share code*, các bước *config* nếu có chỗ nào thắc mắc mọi người hãy *comment* hoặc *contact*, mình sẽ hỗ trợ. 

## Chuẩn bị
Những thứ cần lưu ý khi bắt đầu.
1. *Android gradle project* sử dụng [Gradle’s Kotlin DSL](https://docs.gradle.org/current/userguide/kotlin_dsl.html) . Nếu bạn dùng `Groovy`, hãy nghiên cứu thêm và tự *convert*, mình nghĩ cũng không quá phức tạp.
2. Nếu *project* của bạn có nhiều `module` (nhớ phân biệt với `package`) thì bạn cần thực hiện trên tất cả *module*.  

## [Cài đặt ktlint](https://github.com/pinterest/ktlint)
`Ktlint` là `Kotlin linter` *opensource* để *check* và *format Kotlin code style, convention*. Mục đích mình sử dụng *ktlint* trong dự án là để giúp anh em đỡ phải *config android studio code style setting* lằng nhằng như trước nữa, và để đơn giản nhất thì mình gần như dùng *format* chuẩn của `pinterest` đưa ra, mọi người có thể *custom* và nó không quá khó. Quan trọng là *code style rule* nên được thực hiện ngay lúc *init* hoặc *start* dự án (có thể là *maintain source* hay *source* mới).

Không dông dài nữa, hãy bắt đầu:

#### 1. Vào [github](https://github.com/pinterest/ktlint) của ktlint và chọn version mới nhất
Khai báo trong *file dependency* của bạn (trong *project* mình là `Configs.kt`), nếu bạn không có *file* này, tạm thời bỏ qua *step* 1 này.
```kotlin
object Versions {
    const val ktlint = "0.36.0"
    // other libs versions ...
}
object Deps {
    const val ktlint = "com.pinterest:ktlint:${Versions.ktlint}"
    // other dependencies ...
}
```
#### 2. Tạo 1 *file* quản lý `source ktlint`, tạm gọi là `ktlint.gradle.kts`

```kotlin
repositories {
    jcenter()
}

val ktlint by configurations.creating
val ktlintCheck by tasks.creating(JavaExec::class) {
    group = "verification"
    description = "Check Kotlin code style."
    classpath = configurations.getByName("ktlint")
    main = "com.pinterest.ktlint.Main"
    args = listOf("src/**/*.kt", "--reporter=html,output=$buildDir/reports/ktlint/ktlint.html")
}

val ktlintFormat by tasks.creating(JavaExec::class) {
    group = "formatting"
    description = "Fix Kotlin code style deviations."
    classpath = configurations.getByName("ktlint")
    main = "com.pinterest.ktlint.Main"
    args = listOf("-F", "src/**/*.kt")
}

dependencies {
    ktlint(Deps.ktlint)
}
```
Một vài điểm lưu ý trong đống *code* này:
- Mình tạo 1 *configurations* để khai báo *dependency* tên là `ktlint` (giống như `implementation`, `testImplementation` hay `kapt`,...)
- Tạo 2 *gradle task*:
    -  `ktlintCheck`: dùng để check *Kotlin code style* và *convention*. Ở đây mình chỉ làm đơn giản là *check* và tạo *report* dạng `html` ở đường dẫn  `app/build/reports/ktlint/ktlint.html`
    -  `ktlintFormat`: dùng để *format code* tự động.
-  Nếu bạn *skip* bước 1 thì có thể thay thế chỗ *dependencies* như sau:
    ```kotlin
    dependencies {
        ktlint("com.pinterest:ktlint:0.36.0")
    }
    ```

#### 3. Vào file `app/build.gradle.kts` hoàn thành các bước cuối cùng

- Thêm *references* đến *file* `ktlint.gradle.kts`, lưu ý chỗ `from`, ở đây mình đang để cùng cấp với *file* `build.gradle.kts` nhé.
```kotlin
plugins {
    id(Plugins.androidApp)
    kotlin(Plugins.kotlinAndroid)
    ...
}
// Add this references
buildscript {
    apply(from = "ktlint.gradle.kts") // path to ktlint.gradle.kts file
}
android {...}
```
#### 4. Custom một vài rule

Nếu bạn thấy cần thiết để phù hợp dự án hoặc *code style* của bạn và anh em trong *team*.

- Tạo 1 *file* `.editorconfig` đặt ở thư mục ngoài cùng (`rootDir`) dự án. Chỉnh sửa *config* cần thiết, [xem hướng dẫn đầy đủ ở đây](https://github.com/pinterest/ktlint#editorconfig). Với dự án của mình, hiện tại mình chỉ *setup* 1 tý thôi:

```python
# this use for ktlint config
# see more at https://github.com/pinterest/ktlint#editorconfig
[*.{kt, kts}]
# Comma-separated list of rules to disable
disabled_rules=no-wildcard-imports
```
#### 5. Chạy thử kết quả
- Chạy lệnh `./gradlew ktlintFormat` sau khi bạn *code* xong để tự động *format code*.
- Sau khi chạy lệnh, thường thì tự động *format* sẽ thành công. Nếu bị lỗi thì có thể vào thư mục `app/build/reports/ktlint` để xem *report* và *fix* bằng tay. Theo kinh nghiệm mình làm thì chắc phải *99.69%* là thành công, phần trăm lỗi còn lại là do thuật toán tự động *format* còn 1 vài lỗi nhỏ và cần *fix* bằng cơm (yaoming).

Report html format:
![](https://images.viblo.asia/faa3768d-a6de-4c7d-ba2b-47ecb3d3e303.png)

## [Cài đặt detekt](https://github.com/detekt/detekt) 

> Meet detekt, a static code analysis tool for the Kotlin programming language. It operates on the abstract syntax tree provided by the Kotlin compiler.

Về cơ bản đây là một *linter*, *analyzer* dùng để *check code smell*, tạo một *report* về độ phức tạp của code như *LOCs*, độ phức tạp chu kỳ (`cyclomatic complexity`) và số lượng *code smell*... 

*detekt* cũng là một *wrapper* dựa trên *ktlint* nên nó có thể *formatting code*, nhưng mình đã dùng *ktlint* riêng (luôn mới nhất) nên không muốn dùng *detekt* cho việc *auto format*.

Và tương tự như *ktlint*, mình cũng chỉ *apply* ở mức nhanh, gọn nhất có thể, hạn chế thay đổi qúa nhiều *config* có sẵn của *detekt*. Bạn có thể thay đổi cho phù hợp dự án mình nhé.

Nào bắt đầu thôi !

#### 1. Setup dependency
Khai báo *dependency* 
```kotlin
object Versions {
    const val detekt = "1.9.1"
}
object Plugins {
    const val detekt = "io.gitlab.arturbosch.detekt"
}
```
Trong *file* `app/build.gradle.kts`:
```kotlin
plugins {
    id(Plugins.androidApp)
    kotlin(Plugins.kotlinAndroid)
    id(Plugins.detekt).version(Versions.detekt)
    // or id("io.gitlab.arturbosch.detekt").version("1.9.1")
    ...
}
detekt {
    config = files("$rootDir/config/detekt/detekt.yml") // config rules file
    input = files("src/main/java") // note: java or kotlin???
}
tasks {
    withType<Detekt> {
        // Target version of the generated JVM bytecode. It is used for type resolution.
        this.jvmTarget = "1.8"
    }
}
```
**Note**: 
- `Detekt` chạy cần `jvmTarget 1.8`
- Lưu ý thư mục *input source* của dự án mình đang là `src/main/java`, của bạn có thể là `src/main/kotlin` hoặc gì đó :) .

#### 2. Generate default detekt config
Chạy lệnh `./gradlew detektGenerateConfig`, *task* này sẽ tự động sinh ra *file* `detekt.yml` chứa toàn bộ *default config rules*. 
#### 3. Chạy thử  kết quả
- Chạy lệnh `./gradlew detekt`.
- Mình nghĩ với dự án đã *implement* lâu (*maintain*) thì sẽ *fail* kha khá :D . Mình khuyên ngay tại lúc này, hãy làm các bước sau theo đúng trình tự:
    - Vào thư mục *report* để xem toàn bộ lỗi.
    - *Fix* các lỗi nặng về *code smell*, càng nhiều càng tốt vì bản chất nó không tốt cho dự án.
    - Chạy lại và *check report* để fix tiếp nếu còn nhiều lỗi nặng.
- Sau khi *fix* toàn bộ các lỗi nên *fix*, nếu không thể *pass*, hãy thử chỉnh sửa vài *rule* cho phù hợp dự án - bước 4.
#### 4. Custom config rules

**Important Note**: Vì đây là những *config* đã chuẩn và phù hợp cho hầu hết các dự án *kotlin*, nên hãy suy nghĩ trước khi thay đổi.

*Ok*, sự thật là nếu bạn *apply detekt* vào một dự án đã quá lâu thì thực sự nó rất khó để làm điều *note* trên, và một sự thật khác là một vài *config* trong *android* khác so với *kotlin* thuần, dù là do vậy nhưng việc *custom* vẫn nên hạn chế thấp nhất có thể. *Rule* để thay đổi là:

> Kiểm tra những lỗi *fail* trong *report* và chắc chắn rằng nó cần được dùng trong dự án.

Mở file `config/detekt.yml` và thay đổi. Dưới đây là những phần bên mình có *modify*, bạn có thể tham khảo:
```yaml
# this is some of sample rules can be updated or not
maxIssues: 3 # default is 0, we should consider on this :D 
TooGenericExceptionCaught:
    active: true
    excludes: "**/test/**,**/androidTest/**,**/*.Test.kt,**/*.Spec.kt,**/*.Spek.kt"
    exceptionNames:
     - ArrayIndexOutOfBoundsException
     - Error
     # - Exception My project needs to catch Exception... :(
     - IllegalMonitorStateException
     - NullPointerException
     - IndexOutOfBoundsException
     - RuntimeException
     # - Throwable My project needs to catch Throwable... :(
ForbiddenComment:
    active: false #true, I think while implementation phase, TODO, FIXME comments should be kept.
ReturnCount:
    active: false #true
...
WildcardImport:
    active: false #default is true
```

## Conclusion
Trên đây là toàn bộ những bước cơ bản để giúp dự án *android* (*kotlin*)  tăng một chút chất lượng ở giai đoạn *implementation code* về *convention*, *code style*, *quality*... Hy vọng mọi người *apply* thành công !

Source code tham khảo: 
- [ktlint setup](https://github.com/namnh-0652/AndroidSetup/commit/466f6b8e8508e9f926ff4425780dc0812b1aa64b)
- [detekt setup](https://github.com/namnh-0652/AndroidSetup/commit/402f409acd3e05857a2daa5d9894edec4eb5d61e) 

**Happy Coding !**