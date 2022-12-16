## Introduction.

[Jacoco](https://www.eclemma.org/jacoco/) là thư viện được sử dụng rộng rãi nhằm ước lượng tỉ lệ bao phủ mã nguồn kiểm thử cho các projects chạy trong JVM(Java Virtual Machine). Quá trình thiết lập nó cho các ứng dụng Android có một vài điều khó hiểu cũng như khi có nhiều flavours, hay sử dụng kotlin và viết một số tests với [Robolectric](http://robolectric.org/) thậm chí còn làm cho nó trở nên khó khăn hơn. Có một vài hướng dẫn tuyệt với về việc làm thế nào để thiết lập nó, như [cái này](https://proandroiddev.com/unified-code-coverage-for-android-revisited-44789c9b722f), và [cái này](http://vgaidarji.me/blog/2017/12/20/how-to-configure-jacoco-for-kotlin-and-java-project/).  Trong bài viết này, mặc dù tôi chỉ gửi đến bạn một giải pháp sẵn có, nhưng sẽ chia sẻ toàn bộ chi tiết việc làm thế nào để làm được nó - bằng cách thức này bạn sẽ có thể lắp vào project của mình một cách tốt nhất.

## 1. Covering Unit Tests only.

Ý tưởng là bạn sẽ không cần làm phức tạp file **build.gradle** của mình với mã nguồn cấu hình của một bên thứ ba bất kì. Nhằm giữ cho mọi thứ sáng sủa - tất cả jacoco logic sẽ được viết trong một file riêng rẽ của nó - **jacoco.gradle**. File này có thể được nằm cạnh file **build.gradle** chình của bạn hoặc để giữ cho mọi thứ sáng sủa hơn - tôi di chuyển nó vào trong một đường dẫn riêng gọi là **buildScripts**. Cấu trúc project giờ đây trông sẽ như thế này:

<div align="center"><img src="https://images.viblo.asia/b18f58a0-9e47-4f0d-bdbf-129f7ca30df0.png"></div>

Hãy bắt đầu thực hiện file **jacoco.gradle**:

```
apply plugin:  'jacoco'
 
jacoco {
    toolVersion = "0.8.1"
    // Custom reports directory can be specfied like this:
    // reportsDir = file("$buildDir/customJacocoReportDir")
}
 
tasks.withType(Test) {
    jacoco.includeNoLocationClasses = true
}
```

Điều đầu tiên là đảm bảo việc sử dụng **[jacoco plugin](https://docs.gradle.org/current/userguide/jacoco_plugin.html)** của gradle(dòng 1).
Chúng ta có thể chỉ rõ hãy tham số cấu hình(khối code từ dòng 3): phiên bản của Jacoco(0.8.1 ở thời điểm viết bày này) và nơi các reports được sinh ra một cách tùy chọn). Tham số thứ hai được comment lại ở đây, do đó đường dẫn mặc định - **app/build/report/jacoco** sẽ được sử dụng.

Khối bắt đầu từ dòng 9 là cách thiết lập chính xác thuộc tính **[includeNoLocationClasses](https://docs.gradle.org/current/javadoc/org/gradle/testing/jacoco/plugins/JacocoTaskExtension.html#isIncludeNoLocationClasses)** trong phiên bản cuối cùng của jacoco. Bạn cần phải thực hiện điều này nếu bạn có các kiểm thử Robolectric trong bộ trang bị của mình. Xin hãy chú ý rằng quá trình enable thuộc tính này đã được thực hiện từ trước thông qua Android Plugin cho Gradle DSL, nhưng các thức này từ lâu đã không làm việc.

## 2. Setting up a Jacoco task.

Các dự án sử dụng Kotlin hoặc nhiều Android Flavours cần tạo một Gradle task tùy biến nhằm sinh ra các báo cáo mức độ bao phủ(coverage reports). Trong task này chúng ta sẽ chỉnh một vài tham số jacoco, nhưng mặt khác coverage report sẽ không được tính toán đủ(ví dụ Kotlin classes sẽ không được thêm vào bên trong nó). Đây là một đoạn trích nhằm tạo ra task như thế:

```
project.afterEvaluate {
 
    android.applicationVariants.all { variant ->
        def variantName = variant.name
        def testTaskName = "test${variantName.capitalize()}UnitTest"
 
        tasks.create(name: "${testTaskName}Coverage", type: JacocoReport, dependsOn: "$testTaskName") {
            // task implementation here ...
        }
    }
}
```

Bởi vì project của chúng ta có nhiều flavours, chúng ta sẽ cần tạo một task riêng cho mỗi flavour. Chúng ta duyệt qua tất cả các Android Variants được sinh ra(dòng 3). Đối với mỗi một cái chúng ta đặt tên cho task thực hiện quá trình chạy các unit test(dòng 5), cái có cầu trúc **test&lt;YourVariantName&gt;UnitTest**. Cuối cùng chúng ta định nghĩa custom task của mình trên dòng 7. Một vài thứ được chú thích ở đây:

1. Tên của task sẽ là **test&lt;YourVariantNam&gt;UnitTestCoverage**. Bạn có thể chọn bất cứ cái này bạn muốn ở đây, nhưng các tasks như vậy sẽ được tạo ra cho mỗi variant, nó là ý tưởng tốt khi thêm vào **${variantName}** hoặc **${testTaskName}** ở đây.
2. Loại task của chúng ta là một [JacocoReport](https://docs.gradle.org/current/dsl/org.gradle.testing.jacoco.tasks.JacocoReport.html), do đó chúng ta có thể chỉnh tất cả các thuộc tính của nó(kiểm tra chúng trong task document).
3. Bằng cách chỉ rõ rằng task của chúng ta phụ thuộc vào(dependsOn) **$testTaskName**, chúng ta đảm bảo nó sẽ luông được thực thi sau khi unit test được chạy.

## 3. Jacoco task implement.

Hãy đến với những thứ khó khăn nhất - quá trình thực hiện task thực sự. Giải pháp của tôi trông như thế này:

```
tasks.create(name: "${testTaskName}Coverage", type: JacocoReport, dependsOn: "$testTaskName") {
    // Line 2 & 3
    group = "Reporting"
    description = "Generate Jacoco coverage reports for the ${variantName.capitalize()} build."
 
    reports {
        html.enabled = true // Line 5
        xml.enabled = true
    }
 
    def excludes = [ // Line 10
            '**/R.class',
            '**/R$*.class',
            '**/BuildConfig.*',
            '**/Manifest*.*',
            '**/*Test*.*',
            'android/**/*.*'
    ]
    def javaClasses = fileTree(dir: variant.javaCompiler.destinationDir, excludes: excludes)
    def kotlinClasses = fileTree(dir: "${buildDir}/tmp/kotlin-classes/${variantName}", excludes: excludes)
    classDirectories = files([javaClasses, kotlinClasses])  // Line 18
 
    sourceDirectories = files([
            "$project.projectDir/src/main/java",
            "$project.projectDir/src/${variantName}/java",
            "$project.projectDir/src/main/kotlin",
            "$project.projectDir/src/${variantName}/kotlin"
    ])
 
    executionData = files("${project.buildDir}/jacoco/${testTaskName}.exec")
}
```

Các thực hành tốt nhất là luôn luông nhận một group và description khi quá trình tạo các Gradle tasks tùy biến(Dòng 2 và 3). Bằng cách này chúng ta sẽ liệt kê tốt những thứ trong output của câu lệnh **./gradlew tasks** cho project của mình.

<div align="center"><img src="https://images.viblo.asia/f5457778-e0e6-4154-b50e-88ea3d80da85.png"></div>
    
 Phần tiếp theo là quá trình cấu hình các types của reports chúng ta cần sinh ra(dòng 5). Cái HTML đầu tiên thì thân thiện với người dùng hơn và nó sử dụng khi quá trình kiểm tra coverage ở phía local. Còn XML được sử dụng bởi [Jenkins Jacoco plugin.](https://wiki.jenkins.io/display/JENKINS/JaCoCo+Plugin)
 
 Tiếp theo, chúng ta định nghĩa một danh sách các classes chúng ta cần loại trừ từ coverage reports của mình(dòng 10). Nó có ý nghĩa nhằm loại trừ mã nguồn tự sinh và mã nguồn cái bạn không có quyền kiểm soát(ví dụ mã nguồn của bên thứ ba,...). Nếu bạn sử dụng Kotlin trong project của mình, kiểm tra thêm phần [này](https://medium.com/@andrey.fomenkov/kotlin-jacoco-tuning-compiler-to-skip-generated-code-935fcaeaa391) để biết làm thế nào loại trừ mã nguồn kotlin được sinh ra trong các reports của mình.
 
 Dòng 18 định nghĩa đường dẫn tới các java classes đã được biên dịch. Hãy chú ý chúng ta sử dụng biến **variant.javaCompiler.destinationDir** cái được cung cấp bởi Gradle. Chúng ta đang loại trừ các classes chúng ta cần nhằm bỏ qua trong report sử dụng biến **excludes** chúng ta đã định nghĩa ở bên trên. Thật không may đường dẫn tới các Kotlin classes đã được biên dịch chưa được cung cấp cho chúng ta, do đó, chúng ta cần xây dựng nó cho bản thân mình. Tại thời điểm viết bài viết này(Gradle 4.7 và Kotlin 1.2.41, Jacoco 0.8.1) nó có cấu trúc như được trình bày ở dòng 19. Tôi hy vọng Gradle sẽ sớm cung cấp một thuộc tính tương tự như cái cho java, như thế chúng ta không cần thực hiện điều này bằng tay.
 
 Ở dòng 20 chúng ta chỉ thiết lập [JacocoReport.classDirectories](https://docs.gradle.org/current/dsl/org.gradle.testing.jacoco.tasks.JacocoReport.html#org.gradle.testing.jacoco.tasks.JacocoReport:classDirectories) cho task của mình - ví dụ: các classes được sinh ra cho bản báo cáo.
 
 Dòng 22 thiết lập thuộc tính [JacocoReport.sourceDirectories](https://docs.gradle.org/current/dsl/org.gradle.testing.jacoco.tasks.JacocoReport.html#org.gradle.testing.jacoco.tasks.JacocoReport:sourceDirectories) cho task của chúng ta, nơi chúng ta chỉ ra vị trí chứa source code cho các classes bên trên. Hãy chú ý rằng đối với các projects có nhiều flavour bạn có thể có nhiều đường dẫn tới mã nguồn java/kotlin. Trong ví dụ của chúng ta chúng ta có hai cái cho mỗi loại ngôn ngữ:
 
*  src/main/java
*  src/&lt;variantName&gt;/java
*  src/main/kotlin
*  src/&lt;variantName&gt;/kotlin

Đây chỉ là danh sách tất cả các đường dẫn cái chứa bất cứ mã nguồn cho các flavour cụ thể.

Điều cuối cùng - trên dòng 29 chúng ta thiết lập thuộc tính JacocoReport.executionData, cái liên kết với file ***.exec*** được tạo bởi Jacoco plugin của Gradle. File này chứa metadata cần thiết để sinh ra bản báo cáo(report). Hãy chú ý tới đường dẫn tới file này.

## 4. Generating Jacoco reports.

Với thiết lập ở bên trên chúng ta gần như đã sẵn sàng sinh ra coverage report cho tất cả unit tests(JUnit, Robolectric) cho mỗi flavour của ứng dụng. Bản báo cáo sẽ bao gồm chính xác cả mã nguồn Java lẫn kotlin.

Bước nhỏ cuối cùng là include ***jacoco.gradle*** file như là một phần của file ***build.gradle*** của ứng dụng:

```
... 
apply plugin: 'com.android.application'
apply from: 'buildscripts/jacoco.gradle'
...
```

Và đó là điều chúng ta muốn. Giờ đây bạn có thể sinh ra một report bằng cách thực hiện task cái mà chúng ta đã tạo ở bên trên:

***./gradlew testFreeDebugUnitTestCoverage***

Chúng ta không cần chỉ ra đường dẫn tới ouput của bản báo cáo, nó được sinh ra trong: app/build/reports/jacoco/testFreeDebugUnitTestCoverage.

## 5. Generating Coverage reports for UI Tests.

Trong một vài trường hợp bạn có thể cần sinh ra một coverage report cho Instrumentation tests của mình - ví dụ nếu bạn có rất nhiều Instrumented Unit Tests(Như là các tests cho Activities, Fragments, vv,...) hoặc ngay cả full-blown [BDD-style ](https://en.wikipedia.org/wiki/Behavior-driven_development)behavioural tests.

Để sinh ra được các báo cáo như vậy, bạn cần sử dụng một thuộc tính sẵn có trong Android Gradle Plugin DSL - [testCoverageEnabled](https://google.github.io/android-gradle-dsl/current/com.android.build.gradle.internal.dsl.BuildType.html#com.android.build.gradle.internal.dsl.BuildType:testCoverageEnabled). Thêm nó vào trong file ***build.grale***: 

```
android {
    buildTypes {
        debug {
            ...
            testCoverageEnabled true
        }
}
```

Quá trình thêm thuộc tính này vào(không cần bất cứ công việc chúng ta đã thực hiện ở trên) sẽ tự động thêm vào một Gradle reporting task cho project của chúng ta: ***createFreeDebugCoverageReport***. Quá trình thực thi task này sẽ sinh ra một reprot đơn giản cái chỉ chứa ***androidTests*** của bạn. Theo mặc định, report được đặt trong: app/build/reports/coverage/free/debug/.

## 6. Putting it all together.

Nếu bạn cần sinh ra một report duy nhất cái bao gồm cả unit và UI tests, chỉ có một vài bước được yêu cầu. Nếu bạn chưa sẵn sàng, thêm thuộc tính ***testCoverageEnabled*** từ bước 5, rồi chúng ta sẽ áp dụng một vài thay đổi nhằm tùy biến task được sinh ra trong các bước từ 1 đến 4:

```
...
def variantName = variant.name
def testTaskName = "test${variantName.capitalize()}UnitTest"
def uiTestCoverageTaskName = "test${variantName.capitalize()}CoverageReport"
 
tasks.create(name: "${testTaskName}Coverage", type: JacocoReport, dependsOn: "$testTaskName", "$uiTestCoverageTaskName") {
    ...
 
    executionData = files([
        "${project.buildDir}/jacoco/${testTaskName}.exec",
        "outputs/code-coverage/connected/*coverage.ec"
    ]) 
}
```

Chú ý: Làm thế nào để chúng ta thêm vào một phần phụ thuộc khcacs cho custom task của mình - ***$uiTestCoverageTaskName*** task ở dòng 6, cái được dựa trên task tự động được sinh ở bước 5. Phần phụ thuộc này sinh ra một ***.ec*** coverage report ngay sau khi ***androidTests*** được chạy. Thay đổi tiếp theo là để include file mới được sinh ra này(“outputs/code-coverage/connected/&#10033;coverage.ec”) vào cấu hình ***executionData*** của task của mình(dòng 11). Chú ý kí tự đại diện ở đây: ***&#10033;coverage.ec***. Chúng ta sử dụng một kí tự đại diện, bởi vì tên của file có thên của một thiết bị thật cho UI tests được chạy trên đó.

Quá trình chạy custom task ***test&lt;YourFlavourName&gt;UnitTestCoverage*** giờ đây sẽ chạy đồng thời cả unit và instrumentation tests và sẽ sinh ra một report dựa trên cả hai.

Hy vọng bạn thấy được những con số thực sự tốt khi bạn sinh ra các coverage reports của mình.

## Source.
https://www.veskoiliev.com/how-to-setup-jacoco-for-android-project-with-java-kotlin-and-multiple-flavours/
## Reference.
https://medium.com/@korwin22/jacoco-for-android-e56bffedef48
https://android.jlelse.eu/get-beautiful-coverage-reports-in-your-android-projects-ce9ba281507f
https://proandroiddev.com/unified-code-coverage-for-android-revisited-44789c9b722f
https://blog.gouline.net/code-coverage-on-android-with-jacoco-92ec90c9355e