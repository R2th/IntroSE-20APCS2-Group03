JaCoCo là một thư viện code coverage cho Java, được tạo bởi EclEmma team. Trong Android chúng ta dùng nó để cấu hình coverage cho các unit test, đồng thời loại bỏ những class không cần thiết hoặc được generate từ các thư viện khác để đảm bảo % coverage là chính xác nhất. 

Trong bài viết này, mình sẽ trình bày về cách sử dụng JaCoCo để tính toán được % coverage code trong dự án. Cũng như làm sao nó có thể làm việc được với projects có nhiều [flavors](https://developer.android.com/studio/build/build-variants). 

## Setup 
Để apply **JaCoCo**, chúng ta cần config `build.gradle `của module như sau. 
```kotlin
apply plugin: 'jacoco'

android {
    defaultConfig {
        applicationId "com.android.example.github"
        minSdkVersion build_versions.min_sdk
        targetSdkVersion build_versions.target_sdk
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "com.android.example.github.util.GithubTestRunner"
    }
    buildTypes {
        debug {
            testCoverageEnabled true
        }
    }
    ...
}

jacoco {
    toolVersion = "0.7.4+"
}
```
Trong đó `toolVersion` là version bạn muốn sử dụng với **JaCoCo**. Ở đây mình để `0.7.4+` cho nên gradle sẽ nhận **JaCoCo** version mới nhất từ `0.7.4` trở lên. Bên cạnh đó, để đảm bảo chúng ta có thể coverage luôn của các test trong  [`testInstrumentation`](https://developer.android.com/training/testing/unit-testing/instrumented-unit-tests)  thì không thể thiếu `testCoverageEnabled true` trong `buildTypes` cần được tính coverage. Trong trường hợp chúng ta không bật `testCoverageEnabled` thì sẽ bị faild ở task `createDebugCoverageReport`. Mình sẽ nói về nó trong nội dung tiếp theo.

## Create JaCoCo report task
Chúng ta cần thêm một đoạn code này vào `build.gradle`của module, hoặc có thể tạo một file `.gralde` riêng cho nó và chỉ cần thêm `apply from: '../<your_dir>/<jacoco_file_name>.gradle'`.
```kotlin
task fullCoverageReport(type: JacocoReport) {
    dependsOn 'createDebugCoverageReport'
    dependsOn 'testDebugUnitTest'
    reports {
        xml.enabled = true
        html.enabled = true
    }

    def fileFilter = ['**/R.class', '**/R$*.class', '**/BuildConfig.*', '**/Manifest*.*',
                      '**/*Test*.*', 'android/**/*.*',
                      '**/*_MembersInjector.class',
                      '**/Dagger*Component.class',
                      '**/Dagger*Component$Builder.class',
                      '**/*_*Factory.class',
                      '**/*ComponentImpl.class',
                      '**/*SubComponentBuilder.class']
    def debugTree = fileTree(dir: "${buildDir}/intermediates/classes/debug", excludes: fileFilter)
    def mainSrc = "${project.projectDir}/src/main/java"

    sourceDirectories = files([mainSrc])
    classDirectories = files([debugTree])
    executionData = fileTree(dir: "$buildDir", includes: [
            "jacoco/testDebugUnitTest.exec",
            "outputs/code-coverage/connected/*coverage.ec"
    ])
}
```

Đầu tiên mình sẽ nói về 2 dòng ` dependsOn 'createDebugCoverageReport'` và
    `dependsOn 'testDebugUnitTest'`

- `createDebugCoverageReport`: Task này thực hiện chạy các test trong `testInstrumentation`, bao gồm các test với UI cũng như Espresso library. 
- `testDebugUnitTest`: Task này thì thực hiện các test trong Unit Test, thường chỉ bao gồm các test về business và logic.

Có 2 dạng để chúng ta có thể xem report, đó là `.xml` và `.html`, mình thường dùng dạng `.html` vì nó đơn giản hơn và chúng ta có thể xem trực tiếp trên browser.
```kotlin
reports {
        xml.enabled = true
        html.enabled = true
    }
```

Tiếp theo đó là 
```kotlin
def debugTree = fileTree(dir: "${buildDir}/intermediates/classes/debug", excludes: fileFilter)
```
- `debugTree` chỉ ra nơi mà code chúng ta được compile, để JaCoCo có thể tính toán được xem chúng ta đã coverage được bao nhiêu case trong mỗi class. Tuy nhiên, đường dẫn trên chỉ dành cho **Java**, trong trường hợp bạn sử dụng **Kotlin** cho dự án của mình, thì bạn phải đổi nó thành `$buildDir/tmp/kotlin-classes/debug`.
- `fileFilter` chỉ ra rằng những class hoặc package mà JaCoCo không cần quan tâm khi tính toán. Nó có thể là các class được generate bới Daggers, hoặc các Annotation, ... Điều này giúp tăng % coverage, vì JaCoCo sẽ không tính đến các class không cần thiết đã được exclude.
- `mainSrc`: Nơi chứa source mà bạn muốn tính coverage. Thường là đường dẫn đến source code của module.

Sau đó truyền các giá trị trên cho property tương ứng:
```kotlin
sourceDirectories = files([mainSrc])
classDirectories = files([debugTree])
```

Cuối cùng chỉ ra nơi export report mà chúng ta mong muốn:
```kotlin
executionData = fileTree(dir: "$buildDir", includes: [
            "jacoco/testDebugUnitTest.exec",
            "outputs/code-coverage/connected/*coverage.ec"
    ])
```

## Run JaCoCo report task 
Để thực hiện JaCoCo task, chúng ta có 2 cách đó là dùng: `./gralew` hoặc run trực tiếp trong Android Studio.
- Dùng `.gralew`

```kotlin
./gradlew fullCoverageReport 
```

Trong trường hợp JaCoCo report không thay đổi, hoặc không hiển thị. Chúng ta có thể dùng 
```kotlin
./gradlew clean fullCoverageReport
``` 
Lệnh `clean` được dùng để clean và rebuild lại project. 

- Dùng Android Studio
Sau khi sync file gradle xong, bạn có thể tìm trong tab: `gradle -> app -> Tasks -> other -> fullCoverageReport`
Với `fullCoverageReport` là tên task JaCoCo mà chúng ta đã tạo. Double click vào nó để run.

![](https://images.viblo.asia/cb8bcd5a-00fb-4dd8-bb3b-88cf3ac97bb1.png)![](https://images.viblo.asia/b3ea1890-5f6a-4a6a-a0f7-953c8f1645d0.png)

Thường thì mình sẽ sử dụng command, vì đôi khi Android Studio có thể hoạt động không đúng.

## Xem kết quả report
Để xem report, chúng ta sẽ vô đường dẫn `app/build/reports/jacoco/fullCoverageReport/html/index.html` và mở file `index.html`
![](https://images.viblo.asia/59a8c754-d2b0-4b9e-a99c-aabce1c7d882.png)
Ở đây chúng ta có thể thấy % tổng thể và từng package, đã được coverage bao nhiêu. Cũng như % các case mà chúng ta có thể đã miss. 

Để xem chi tiết chúng ta có thể vào class cụ thể cần coi. 
![](https://images.viblo.asia/c7f1595d-6cee-41fb-b021-0cbc5a8b8e16.png)
Như class `RepoRepository`,  ở đây JaCoCo chỉ ra rằng các func nào đã được coverage và được coverage bao nhiêu %. Cụ thể chúng ta chưa viết func `loadRepos(String)` cho nên class này chỉ coverage được 89%.

Bên cạnh đó, JaCoCo cũng chỉ ra cụ thể, các case nào trong class chưa được coverage. Ví dụ như:
![](https://images.viblo.asia/28b89565-a224-4cb7-a862-b41f14c4885d.png)

Phần màu đỏ, là phần chưa được coverage, còn phần màu xanh là đã được coverage và pass. 

## Config JaCoCo cho projects có nhiều flavors.
```kotlin
apply plugin: 'jacoco'

jacoco {
    toolVersion = "0.8.1"
}

project.afterEvaluate {
    // Grab all build types and product flavors
    def buildTypes = android.buildTypes.collect { type -> type.name }
    def productFlavors = android.productFlavors.collect { flavor -> flavor.name }

    // When no product flavors defined, use empty
    if (!productFlavors) productFlavors.add('')

    productFlavors.each { productFlavorName ->
        buildTypes.each { buildTypeName ->
            def sourceName, sourcePath
            if (!productFlavorName) {
                sourceName = sourcePath = "${buildTypeName}"
            } else {
                sourceName = "${productFlavorName}${buildTypeName.capitalize()}"
                sourcePath = "${productFlavorName}/${buildTypeName}"
            }
            def testTaskName = "test${sourceName.capitalize()}UnitTest"

            // Create coverage task of form 'testFlavorTypeCoverage' depending on 'testFlavorTypeUnitTest'
            task "${testTaskName}Coverage" (type:JacocoReport, dependsOn: "$testTaskName") {
                group = "Reporting"
                description = "Generate Jacoco coverage reports on the ${sourceName.capitalize()} build."

                def excludes = [
                        '**/R.class',
                        '**/R$*.class',
                        '**/Manifest*.*',
                        'android/**/*.*',
                        '**/BuildConfig.*',
                        '**/*$ViewBinder*.*',
                        '**/*$ViewInjector*.*',
                        '**/Lambda$*.class',
                        '**/Lambda.class',
                        '**/*Lambda.class',
                        '**/*Lambda*.class'
                ]

                classDirectories = fileTree(
                        dir: "${project.buildDir}/intermediates/classes/${sourcePath}",
                        excludes: excludes
                ) + fileTree(
                        dir: "${project.buildDir}/tmp/kotlin-classes/${sourceName}",
                        excludes: excludes
                )

                def coverageSourceDirs = [
                        "src/main/java",
                        "src/$productFlavorName/java",
                        "src/$buildTypeName/java"
                ]
                additionalSourceDirs = files(coverageSourceDirs)
                sourceDirectories = files(coverageSourceDirs)
                executionData = files("${project.buildDir}/jacoco/${testTaskName}.exec")

                reports {
                    xml.enabled = true
                    html.enabled = true
                }
            }
        }
    }
}
```
Đây là file config đầy đủ cho projects có nhiều flavors và đồng thời cho cả Kotlin và Java. Bạn có thể tham khảo thêm [tại đây](https://gist.github.com/mrsasha/384a19f97cdeba5b5c2ea55f930fccd4).

Trong projects có nhiều flavors thì tên của các task `createDebugCoverageReport` và `testDebugUnitTest` sẽ thành  `create<FlavorName>DebugCoverageReport` và `test<FlavorName>DebugUnitTest`.

Ví dụ mình có flavor là `Staging`, thì tương ứng mình sẽ có các task là `createStagingDebugCoverageReport` và `testStagingDebugUnitTest`.

## Tổng kết
Với JaCoCo, chúng ta dễ dàng tính được % coverage của dự án cũng như loại bỏ những class không cần thiết để đảm bảo % coverage là chính xác nhất. Hi vọng qua đây các bạn có thể hiểu hơn về JaCoCo và có thể config nó cho dự án của mình. Mọi người có thể comment bên dưới nếu có gì cần trao đổi thêm nhé.

**Thank you!!! & Happy coding!!!**


## Tham khảo
- https://github.com/android/architecture-components-samples/tree/master/GithubBrowserSample
- https://github.com/jacoco/jacoco
- https://gist.github.com/mrsasha/384a19f97cdeba5b5c2ea55f930fccd4