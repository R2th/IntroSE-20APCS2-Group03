Trong bài viết này, tôi sẽ thử viết các script bằng Kotlin thay vì Groovy, đặt chúng dưới dạng các task của Gradle và thực thi chúng.

Tôi đã đọc một bài thảo luận ở [đây](https://discuss.gradle.org/t/how-can-i-run-kotlin-script-kts-filles-from-within-gradle/21651/4). Ai đó muốn thực thi các script Kotlin với Gradle build scripts. Tất nhiên, điều này hoàn toàn có thể thực hiện được bằng cách sử dụng kotlinc như trong phần script viết bằng Groovy. Mặc dù vậy, điều này trông không được đẹp, và, như được đề cập đến trong bài thảo luận trên, nó không hiệu quả và khó quản lý. Một giải pháp khác được đặt ra là sử dụng các tập lệnh Gradle được viết bằng `Kotlin DSL` và khai báo các task tùy biến bên trong file `build.gradle.kts`, cách đó giúp chúng ta có thể giữ và chạy các đoạn code Kotlin như bình thường:

```
// build.gradle.kts
//
// Execute Kotlin task with:  gradle  -q foo

task("foo") {
  group = "com.kotlinexpertise"
  description = "my foo task"
  doLast {
    println("Hello from foo task")
  }
}
```

Nhưng trong trường hợp của tôi đã xuất hiện một vấn đề với cách tiếp cận này. Tôi đã có nhiều Kotlin script lớn mà tôi muốn thực hiện theo cách này. Nếu tôi đã đặt tất cả chúng vào các `task`, file script sẽ bị phình to và khó duy trì. Lưu ý rằng trong trường hợp của tôi, các tác vụ này sẽ không đóng góp trực tiếp vào build logic mà chỉ cung cấp các tác vụ business-relevant, mà tôi muốn thực hiện thông qua Gradle.

## Sử dụng Gradle `buildScr` để giải quyết vấn đề

Như được mô tả trong tài liệu Gradle, build logic và đặc biệt là các tác vụ tùy chỉnh không nên đặt trực tiếp vào trong build script. Do đó, Gradle cung cấp khả năng sử dụng thư mục được gọi là buildSrc. Thư mục này được coi là một bản dựng, tức là Gradle tự động biên dịch và kiểm tra mã này và làm cho nó có sẵn trên đường dẫn của build script. Phần sau đây cho thấy cấu trúc dự án điển hình sử dụng thư mục buildSrc đặc biệt này:

```
├── build.gradle //main build
├── buildSrc
│   ├── build.gradle //build for buildSrc
│   └── src //custom plugins, taks etc.
│       ├── main
│       │   └── java
│       │       └── com
│       │           └── enterprise
│       │               ├── Deploy.java
│       │               └── DeploymentPlugin.java
│       └── test
│           └── java
│               └── com
│                   └── enterprise
│                       └── DeploymentPluginTest.java
└── settings.gradle
```

Như bạn có thể thấy ở đây, buildSrc có `build.gradle` của riêng nó, trong đó chúng tôi xác định các dependencies và plugin cho chính buildSrc. Như đã đề cập, mã được biên dịch sẽ có sẵn cho bản dựng xung quanh để bạn có thể xác định các tác vụ tùy chỉnh trong buildSrc và sử dụng chúng trong `build.gradle` chính.

## Một ví dụ về cách thực thi Kotlin Scrips với Gradle

Giả sử chúng tôi có hai nhiệm vụ lớn hơn mà chúng tôi muốn thực hiện dưới dạng các Gradle `task`, chúng tôi gọi là `task1` và `task2`. Cả hai nhiệm vụ đều phù hợp để thực thi với Kotlin.

File build của project ban đầu trông như thế này:

```
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.2.51"
}

java.sourceSets {
    getByName("main").java.srcDirs("...")
}

repositories {
    mavenCentral()
}

dependencies {
    compile(kotlin("stdlib-jdk8"))
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}
```

Điều này rất cơ bản và không có gì đặc biệt trong đó. Bây giờ, mục tiêu là xác định hai tác vụ tùy chỉnh taks1 và task2 trong tập lệnh này. Cả hai tác vụ được cho là có thể thực thi được thông qua `gradle -q task1 | task2`. Để thực hiện điều này, tôi tạo cấu trúc thư mục buildSrc như được hiển thị ở trên cùng cấp với file build script đã tồn tại. Trong buildSrc, bây giờ chúng ta tạo các `task` tùy chỉnh dưới dạng các class của Kotlin:

```
package com.kotlinexpertise.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import java.sql.DriverManager

open class Task1 : DefaultTask() {

    init {
        group = "com.kotlinexpertise"
        description = "task1"
    }

    @TaskAction
    fun run() {
        Class.forName("com.mysql.jdbc.Driver")
        //heavy task implementation
    }
}
```

Giống như chúng ta khai báo trực tiếp một tác vụ trong Gradle build script, chúng ta khai báo `group`, `description` và chính tác vụ đó trong một phương thức được chú thích bằng `@TaskAction`, mà chúng ta đặt tên là `run`. Bạn có thể tìm hiểu thêm về các tasks tùy chỉnh ở [đây](https://docs.gradle.org/current/userguide/custom_tasks.html). Để làm cho điều này thú vị hơn một chút, tôi muốn thêm `MySQL driver` trong task này, việc này yêu cầu tôi cung cấp phần phụ thuộc tương ứng có sẵn cho bản dựng `buildSrc`. Hãy cùng xem qua build script của nó (tồn tại trực tiếp trong `buildSrc`):

```
plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
}

dependencies {
    compile("mysql:mysql-connector-java:5.1.24")
}
```

Như đã đề cập, chúng tôi thêm các dependencies mà chúng tôi muốn sử dụng trong buildSrc. Một điều cần lưu ý là plugin org.gradle.kotlin.kotlin-dsl được áp dụng cho bản build này để thiết lập các tính năng và phụ thuộc của trình biên dịch Kotlin sao cho khớp với các tính năng được cung cấp với Gradle. Chúng tôi đã sử dụng bí danh `kotlin-dsl` trong ví dụ này.

Bây giờ, sau khi định nghĩa cả `Task1` và `Task2` là các lớp con của `DefaultTask`, chúng có thể được sử dụng trong file script `build.gradle.kts` chính như thế này:

```
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.kotlinexpertise.tasks.*

//...

task<Task1>("task1")
task<Task1>("task2")
```

Lưu ý rằng cả hai cần phải được import như ở đây. Trong console, `gradle tasks` sẽ liệt kê chúng và bạn có thể thực thi chúng bằng cách chạy `gradle -q task1` và `gradle -q task2` tương ứng. Bạn cũng có thể thấy các tác vụ được liệt kê trong IntelliJ IDEA:

![](https://images.viblo.asia/82f7897d-b805-45e8-9151-68ace656b74e.png)

Bạn có thể xem source code tại đây: https://github.com/s1monw1/gradle_buildSrc_kotlin

Bài viết được dịch từ https://kotlinexpertise.com/execute-kotlin-scripts-with-gradle/