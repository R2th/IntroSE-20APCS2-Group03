Lint là 1 tool dùng cho static code để phân tích và bắt các issue tiềm năng ngay trong thời gian compile, chứ không phải chờ đến khi run mới phát hiện bug. Nó thực hiện các check đồng thời trên mã nguồn có thể phát hiện các vấn đề như biến hoặc function argument không sử dụng , biến hoặc hàm không xác định, code tối ưu hóa kém, v.v. hiện tại đang có hàng trăm Lint check đã được public.

Nhưng đôi khi, chúng ta cần phát hiện các issue cụ thể trong codebase mà không được kiểm tra bởi các kiểm tra hiện có.

### **Hello, custom Lint check**

Mục tiêu là chúng ta sẽ tạo custom Lint check nhằm phát hiện 1 method sai khi gọi nó trong 1 object. Ý tưởng của kiểm tra này là khi chúng ta mutil click vào một Android View, nó sẽ mở ra nhiều activity hoặc gọi nhiều lần 1 api không? (tất nhiên gọi nhiều lần là sai, ví dụ này diễn ra khá phổ biến, mà nhiều developer mắc phải, đặc biệt là các junior).

Custom Lint check được viết như một phần của Java (hoặc Kotlin) tiêu chuẩn. Cách dễ nhất để bắt đầu là tạo một dự án dựa trên Gradle-based (nó không phải là một dự án Android).

Tiếp theo, cần thêm phụ thuộc Lint. Trong tệp build.gradle:

```java
compileOnly "com.android.tools.lint:lint-api:$lintVersion"
compileOnly "com.android.tools.lint:lint-checks:$lintVersion"
```

Điều này sẽ thêm phụ thuộc cho cả writing và testing của các check. Có 1 mẹo nhỏ ở đây: lintVersion phải là gradlePluginVersion + 23.0.0, gradlePluginVersion là biến được định nghĩa trong root project build.gradle khi tạo dự án Android bằng Android Studio và tại thời điểm này, phiên bản ổn định mới nhất là 3.3.0, điều đó có nghĩa là lintVersion phải là 26.3.0.

Mỗi kiểm tra Lint bao gồm 4 phần:

* Issue - issue trong code mà chúng ta đang cố gắng ngăn chặn xảy ra. Khi Lint check fail, đây là những gì được báo cho người dùng.
* Detector - một công cụ tìm kiếm sự cố theo các class API Lint.
* Implementation - phạm vi có thể xảy ra issue (source fule, tệp XML, compiled code, ...)
* Registry - custom_ Lint_ check registry sẽ được sử dụng cùng với registry hiện có chứa các check được xác định trước.

### **Implementation**

Bắt đầu implement cho custom check. Mỗi check sẽ chứa mội detector và scope:

```java
val correctClickListenerImplementation = Implementation(CorrectClickListenerDetector::class.java, Scope.JAVA_FILE_SCOPE)
```

chú ý rằng Scope.JAVA_FILE_SCOPE cũng được dùng Kotlin class.

### **Issue**

Tiếp theo cần define cho issue. Mỗi issue bao gồm các phần sau:

ID - unique identifier
Description - gồm 5-6 từ, tổng kết ngắn gọn của issue.
Explanation - full giải thích của issue, bao gồm cả suggestion của cách fix
Category - category của issue (performance, translation, security,...)
Priority - từ 1 - 10, 10 là cấp độ cao nhất
Severity - severity của issue (fatal, error, warning, info hoặc ignore)
Implementation - implementation được sử dụng khi phát hiện ra issue.

```java
val ISSUE_CLICK_LISTENER = Issue.create(
    id = "UnsafeClickListener",
    briefDescription = "Unsafe click listener", 
    explanation = """"
        This check ensures you call click listener that is throttled 
        instead of a normal one which does not prevent double clicks.
        """.trimIndent(),
    category = Category.CORRECTNESS,
    priority = 6,
    severity = Severity.WARNING,
    implementation = correctClickListenerImplementation
)
```

### **Detector**

API Lint cung cấp interface cho từng scope khi implement. Mỗi interface này hiển thị các phương thức mà bạn có thể ghi đè và truy cập các phần của code bạn quan tâm.

UastScanner - Các tệp Java hoặc Kotlin (UAST - Unified Abstract Syntax Tree)
ClassScanner - compiled files (bytecode)
BinaryResourceScanner - binary resources như bitmap hoặc tệp res / raw
ResourceFolderScanner - resources folders
XmlScanner - Tệp XML
GradleScanner - Tập tin Gradle
OtherFileScanner - mọi thứ khác
Ngoài ra, class Detector là một lớp cơ sở có các dummy implement của tất cả các phương thức mà mỗi giao diện trên lộ ra, do đó bạn không bị buộc phải thực hiện một giao diện hoàn chỉnh trong trường hợp bạn chỉ cần một phương thức.

Bây giờ, chúng ta đã sẵn sàng để thực hiện một Detector sẽ check lệnh gọi method chính xác trên một đối tượng.

```java
private const val REPORT_MESSAGE = "Use setThrottlingClickListener"

/**
 * Custom detector class that extends base Detector class and specific
 * interface depending on which part of the code we want to analyze.
 */
class CorrectClickListenerDetector : Detector(), Detector.UastScanner {

/**
* Method that defines which elements of the code we want to analyze.
* There are many similar methods for different elements in the code,
* but for our use-case, we want to analyze method calls so we return
* just one element representing method calls.
*/
override fun getApplicableUastTypes(): List<Class<out UElement>>? {
    return listOf<Class<out UElement>>(UCallExpression::class.java)
}

/**
    * Since we've defined applicable UAST types, we have to override the
    * method that will create UAST handler for those types.
    * Handler requires implementation of an UElementHandler which is a
    * class that defines a number of different methods that handle
    * element like annotations, breaks, loops, imports, etc. In our case,
    * we've defined only call expressions so we override just this one method.
    * Method implementation is pretty straight-forward - it checks if a method
    * that is called has the name we want to avoid and it reports an issue otherwise.
    */
    override fun createUastHandler(context: JavaContext): UElementHandler? {
        return object: UElementHandler() {

            override fun visitCallExpression(node: UCallExpression) {
                if (node.methodName != null && node.methodName?.equals("setOnClickListener", ignoreCase = true) == true) {
                    context.report(ISSUE_CLICK_LISTENER, node, context.getLocation(node), REPORT_MESSAGE, createFix())
                }
            }
        }
    }

    /**
     * Method will create a fix which can be trigger within IDE and
     * it will replace incorrect method with a correct one.
     */
    private fun createFix(): LintFix {
        return fix().replace().text("setOnClickListener").with("setThrottlingClickListener").build()
    }
}
```

Điều cuối cùng cần làm là add issue và registry và thông báo với Lint rằng có 1 custom registry nên được thực hiện:

```java
class MyIssueRegistry : IssueRegistry() {
    override val issues: List<Issue> = listOf(ISSUE_CLICK_LISTENER)
}
```

Trong module build.gradle:

```java
jar {
    manifest {
        attributes("Lint-Registry-v2": "co.infinum.lint.MyIssueRegistry")
    }
}
```

Nguồn: https://infinum.co/the-capsized-eight/what-is-android-lint-and-how-helps-write-maintainable-code