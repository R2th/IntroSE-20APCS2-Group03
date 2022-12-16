Bài viết này là từ kinh nghiệm của một người đã chuyển mã nguồn của [plugin Activity Tracker ](https://github.com/dkandalov/activity-tracker) cho Intellij IDEs từ Groovy sang Kotlin.

Nó được viết cho bất kỳ ai quen thuộc với Groovy hoặc Kotlin và có thể đặc biệt liên quan nếu bạn đang cân nhắc việc chuyển từ Groovy sang Kotlin. Hy vọng rằng, nó có thể sẽ là bài đọc thú vị cho những người không chuyên về Groovy hoặc không chuyên về Kotlin.
Xin lưu ý rằng đây không phải là một sự so sánh toàn diện hoặc tổng quan về ngôn ngữ. Sự khác biệt duy nhất được đề cập là những thứ mà tôi gặp phải khi chuyển đổi mã Groovy thành Kotlin.

## Về việc chuyển đổi

Các plugin trên IntelliJ thường được viết bằng Java với một chútc cấu hình xml và Java API trên nền tảng IntelliJ. Activity Tracker không giống như vậy. Đầu tiên, nó hầu như bỏ qua cấu hình xml chuẩn và sử dụng API LivePlugin Groovy. Từ quan điểm của plugin, điều này có nghĩa là ngoài các Java API chuẩn, nó phải giao tiếp với LivePlugin Groovy API. Ngoài ra, Activity Tracker được viết bằng Groovy.

Viết plugin trong Groovy không phải là một điều phổ biến. Vào thời điểm đó, động cơ chính của tôi là sử dụng ngôn ngữ lập trình thú vị hơn Java 6. Những ngày này IntelliJ sử dụng Java 8 và Kotlin là ngôn ngữ “chính thức được chấp thuận” để viết các plugin. Vì vậy, việc di chuyển từ Groovy sang Kotlin không chỉ mang lại niềm vui mà còn về việc chuyển sang công nghệ tiêu chuẩn.

## Sẽ không có từ khóa `new`

Không giống như Groovy (và có lẽ hầu hết các ngôn ngữ JVM), sẽ không có từ khóa `new` nào trong Kotlin. Để tạo một thể hiện của một lớp, bạn chỉ có thể sử dụng tên lớp với các tham số khởi tạo.

```
## Groovy
new ActivityTracker.Config(...)

## Kotlin
ActivityTracker.Config(...)
```

## Sẽ không có ép kiểu ngầm cho số

Không giống như Groovy (và có lẽ hầu hết các ngôn ngữ JVM), không có sự thu hẹp/mở rộng kiểu ngầm định cho các số trong Kotlin. Đó là nếu bạn có biến kiểu Long bạn không thể gán giá trị Int cho nó và ngược lại.
Mặc dù điều này có vẻ kỳ lạ, nó có ý nghĩa hoàn hảo bởi vì các lớp Int và Long không phải là kiểu con của nhau. Điều tương tự cũng áp dụng cho Double và Float. Xem xét mức độ tinh tế và khó khăn để tìm lỗi chuyển đổi tiềm ẩn này có lẽ là một thiết kế tốt.

(Trong trường hợp bạn đang tự hỏi về sự tràn số, nó vẫn còn ở đó. Hoạt động theo cách tương tự như trong Java.)

```
## Groovy
def longValue = 123L
def intValue = 123
longValue = intValue // works ok

## Kotlin
var longValue = 123L
var intValue = 123
longValue = intValue // compilation error
longValue = intValue.toLong() // works ok
```

## Closure type parameters
Trong các kiểu mặc định của Groovy và các tham số kiểu là tùy chọn. Bạn có thể bỏ qua tất cả các loại với nhau hoặc chỉ định chúng khi bạn muốn làm. Tôi thấy hữu ích khi luôn thêm các loại vào thư viện và các API khác có thể được sử dụng nhiều từ mã khác. Nó hoạt động tốt ngoại trừ loại đóng `Closure<V>` có tham số kiểu chỉ cho giá trị trả về của nó. Để công bằng, có chú thích ClosureParams để chỉ định các loại cho đầu vào bao đóng, nhưng quá khó để sử dụng.

Trong Kotlin, các bao đóng (aka lambdas) có các tham số kiểu cho đầu vào và đầu ra như bạn mong đợi.

```
## Groovy
private updateState(Closure<State> closure) {...}
// or
private updateState(@ClosureParams(State.class) Closure<State> closure) {...}

## Kotlin
private fun updateState(closure: (State) -> State) {...}
```

## `With` với `run` và `apply`

Một trong những tính năng thú vị trong Groovy là hàm `.with` được định nghĩa trên lớp Object. Phải mất một bao đóng và thực hiện nó với `this` để chỉ mục tiêu đối tượng. Kết quả của hàm `.with` là giá trị của biểu thức cuối cùng trong phần bao đóng. Điều này có thể hữu ích khi gọi một loạt các phương thức trên đối tượng không có API hoàn thiện.

Và sự gây nhầm lẫn ở đây, Kotlin có chức năng thực hiện chính xác điều tương tự ngoại trừ việc nó không thể được gọi trên chính đối tượng. Vì vậy, để thay thế Groovy `.with` trong Kotlin có chức năng `.run`. Ngoài ra, còn có hàm `.apply` trong Kotlin giống như `.run` nhưng trả về đối tượng đích. Điều này rất hữu ích cho việc xây dựng cây đối tượng và tránh nó như là biểu thức cuối cùng trong mỗi bao đóng.

```
# Groovy
def actionGroup = new DefaultActionGroup().with {
    add(toggleTracking)
    add(new DefaultActionGroup("Current Log", true).with {
        add(showStatistics)
        add(openLogInIde)
        add(openLogFolder)
        addSeparator()
        add(rollCurrentLog)
        add(clearCurrentLog)
        it // <-- meh
    })
    //...
    it // <-- meh
}

## Kotlin
val actionGroup = DefaultActionGroup().apply {
    add(toggleTracking)
    add(DefaultActionGroup("Current Log", true).apply {
        add(showStatistics)
        add(openLogInIde)
        add(openLogFolder)
        addSeparator()
        add(rollCurrentLog)
        add(clearCurrentLog)
    })
    // ...
}
```

## Sửa đổi đối tượng bất biến

Cả Groovy và Kotlin đều có thể định nghĩa các lớp value-object, tức là một lớp với các trường bất biến và các phương thức equality và hash được định nghĩa ngầm định. Trong Groovy, nó là một lớp có chú thích `@Immutable`, trong Kotlin nó được định nghĩa là `data class`. Một trong những điều bạn có thể muốn làm với value-object là sao chép nó vào đối tượng mới thay đổi một hoặc nhiều trường.

Mặc dù việc triển khai bên dưới là khác nhau, nhưng từ quan điểm người dùng có thể thấy cách viết của Groovy và Kotlin trông giống nhau.

```
# Groovy
@Immutable(copyWith = true)
static final class State {
    boolean isTracking
    boolean trackIdeActions
}
new State(false, false).copyWith(trackIdeActions: true)

# Kotlin
data class State(
        val isTracking: Boolean,
        val trackIdeActions: Boolean)
State(false, false).copy(trackIdeActions = true)
```

## Groovy getters và setters

Khi tham khảo getters/setters từ mã Groovy, bạn có thể coi như là đang sử dụng một trường công khai. Vì vậy, thay vì getter `o.getFoo()`, bạn có thể sử dụng `o.foo`. Và thay vì setter `o.setFoo("bar")`, bạn có thể làm `o.foo = "bar"`.
Kotlin cũng có getters / setters groovy, mặc dù chỉ có các instance methods.

```
# Java
ActionManager actionManager = ActionManager.getInstance();
println(actionManager.getComponentName());

# Groovy
def actionManager = ActionManager.instance
println(actionManager.componentName)

# Kotlin
val actionManager = ActionManager.getInstance()
println(actionManager.componentName)
```

## Tên phương thức với khoảng trắng

Cả Groovy và Kotlin đều cho phép tên phương thức có dấu cách. Điều này nghe có vẻ giống như một tính năng kỳ lạ nhưng thật tuyệt vời khi đặt tên cho các bài kiểm tra đơn vị để bạn không phải chọn giữa trường hợp camel case, underscores hoặc trộn cả hai.

Một câu hỏi ít thực tế hơn nhưng thú vị hơn là liệu bất kỳ chuỗi nào cũng có thể là tên phương thức. Đối với Groovy câu trả lời là "có". Kotlin có vẻ hạn chế hơn.

```
# Groovy
@Test def "convert event object into csv line"() {...}
@Test def "\n"() {...} // good names are hard
@Test def ""() {...}   // the shortest method name ever

# Kotlin
@Test fun `convert event object into csv line`() {...}
@Test fun `\n`() {...} // doesn't compile
@Test fun ``() {...}   // doesn't compile
```

## Hầu hết tùy chọn `return`

Trong Groovy, biểu thức cuối cùng trong hàm/bao đóng là giá trị trả về của nó. Bạn có thể sử dụng từ khóa `return` để trả về từ hàm trước đó, nếu không, từ khóa đó hoàn toàn là tùy chọn.
Trong Kotlin, điều này phức tạp hơn. Các hàm phải có từ khóa `return` trong khi lambdas không thể sử dụng `return`. Kết quả của biểu thức cuối cùng trong lambda là giá trị lambda sẽ trả về. Và `return` trong lambda có nghĩa là trở về từ phương thức kèm theo.

Phải có lý do chính đáng đằng sau thiết kế này ở Kotlin nhưng tại sao biểu hiện cuối cùng trong chức năng cần từ khóa `return` vẫn là một bí ẩn đối với tôi.
Trong thực tế, tôi đã không có vấn đề với nó, ngoại trừ khi biến Kotlin lambdas thành các phương thức và ngược lại bởi vì mã phải được sửa đổi để thêm/xóa các trả về.

## Getting Class object

Kotlin có các lớp phản chiếu riêng, tức là ngoài `java.lang.Class` còn có `kotlin.reflect.KClass`. Điều này có ý nghĩa bởi vì Kotlin có các tính năng ngôn ngữ không tồn tại trong Java. (Ví dụ, bạn có thể muốn kiểm tra bằng cách sử dụng sự phản chiếu nếu đối số hàm là tùy chọn)

Trong Groovy, theo như tôi biết, không thể kiểm tra bằng cách sử dụng sự phản chiếu cho dù đối số hàm là tùy chọn hay không. Có lẽ, phân tích Groovy AST là cách để làm điều đó.

```
# Java
println(ActivityTracker.class);

#Groovy
println(ActivityTracker)

#Kotlin
println(ActivityTracker::class.java)
```

## Appending writer

Groovy có một vài phương thức "trợ giúp" được tự động thêm vào các lớp lõi Java. Ví dụ, với phương thức `withWriterAppend()` trong lớp `ResourceGroovyMethods`, nó đơn giản hóa việc thêm vào một tệp văn bản bằng cách sử dụng Writer.
Trong Kotlin cũng có một vài phương thức "trợ giúp". Đặc biệt cho các hoạt động IO, trong `kotlin.io.FileReadWrite` có hàm `writer()`. Nó gần như là điều đúng, ngoại trừ việc không có tùy chọn để làm cho người viết có thể chắp thêm được.

Do đó, cách sử dụng trong Groovy có phần chi tiết hơn.

```
# Java
// Too many lines of code

# Groovy
new File(statsFilePath).withWriterAppend("UTF-8") { writer ->
    // use writer
}

# Kotlin
FileOutputStream(File(statsFilePath), true).buffered().writer(utf8).use { writer ->
    // use writer
}
```

## Nâng cấp Collections và Maps

Trong Groovy, có một vài hàm trong lớp `DefaultGroovyMethods` được tự động thêm vào tất cả các collections class. Ví dụ, hàm `collectEntries()` lấy một bao đóng và giả sử kết thúc trả về mảng hai phần tử, đặt chúng vào một map với phần tử đầu tiên làm khóa và phần tử thứ hai làm giá trị của nó. Hoặc `sort()`  chức năng cần một bao đóng và trả về collections được sắp xếp hoặc thậm chí là một maps được sắp xếp.

Kotlin có nhiều chức năng tương tự có sẵn trên các collections và maps. Tuy nhiên, có một số khác biệt nhỏ. Tương tự như Groovy `collectEntries()`, Kotlin có hàm `associBy()` nhưng nó chỉ có sẵn trên các collections chứ không phải trên maps. Điều này làm cho việc chuyển đổi một maps thành maps khác trở nên khó khăn hơn. Một ví dụ khác là hàm `sortBy()` trong Kotlin chỉ tồn tại trên các collections chứ không phải maps.

(Lưu ý rằng ngoại trừ một vài khác biệt mã dưới đây là gần như giống hệt nhau.)

```
# Groovy
def eventsByFile = events
    .findAll{ it.eventType == "IdeState" && it.focusedComponent == "Editor" && it.file != "" }
    .groupBy{ it.file }
    .collectEntries{ [fileName(it.key), it.value.size()] }

// OMG, map sorted by its own value
eventsByFile.sort{ it.value }

# Kotlin
val eventsByFile = events
    .filter{ it.eventType == "IdeState" && it.focusedComponent == "Editor" && it.file != "" }
    .groupBy{ it.file }.toList()
    .associateBy({ it.first }, { it.second.size })

eventsByFile
    .map{ Pair(fileName(it.key), it.value.size)}
    .sortedBy{ it.second }
```

## Cùng một lớp trong các trình nạp lớp khác nhau

Trên các trình nạp lớp JVM hoạt động giống như “namespaces”. Ví dụ, nếu bạn tải chính xác cùng một bytecode cho một lớp trong hai trình nạp lớp khác nhau, thì các thực thể của lớp sẽ không thể gán được giữa các trình nạp lớp.

Trong Groovy, điều này vẫn đúng nhưng vì Groovy là một ngôn ngữ được chọn tùy chọn, bạn có thể bỏ qua các kiểu và sử dụng đối tượng từ một trình nạp lớp khác gọi phương thức động. Đây không phải là một tính năng bạn sẽ sử dụng hàng ngày nhưng nó có thể hữu ích.

Vì Kotlin là ngôn ngữ được gõ tĩnh nên không có cách giải quyết nào (trừ một số phép thuật phản chiếu dài dòng). Để chính xác, Kotlin có các loại động nhưng chúng chỉ được hỗ trợ cho JavaScript và không có sẵn trên JVM.

```
# Groovy
private updateState(Closure<State> closure) {
    // note that parameter class is commented out because on plugin reload it will
    // be a different type (since it's loaded in new classloader)
    stateVar.set { /*State*/ oldValue ->
        def newValue = closure.call(oldValue)
        onUpdate(oldValue, newValue)
        newValue
    }
}

# Kotlin
// Can't do this :(
// The workaround is to convert object to/from instance of a class
// from parent class loader, e.g. java.lang.String.
```

## Mở rộng Groovy interfaces/classes trong Kotlin

Nếu bạn định sử dụng Groovy API từ Kotlin, hãy lưu ý rằng nó không hoạt động tốt vào lúc này. Về cơ bản, trình biên dịch Kotlin không nhìn thấy việc triển khai phương thức của `groovy.lang.GroovyObject` được Groovy tạo ra.

Cách giải quyết duy nhất mà tôi tìm thấy là tự thực hiện các phương thức này trong Kotlin. Nếu bạn biết câu trả lời, tôi sẽ biết ơn nếu bạn có thể trả lời câu hỏi này trên [diễn đàn Kotlin](https://discuss.kotlinlang.org/t/extending-groovy-class-from-kotlin/1675).

```
# Groovy
class MyGroovyClass {
    def foo() {}
}

# Kotlin
// compilation fails with:
// Object must be declared abstract or implement abstract base
// class member public abstract fun setProperty(p0: String!, p1: Any!): Unit
object : MyGroovyClass() {
    override fun foo() {}
}

# Java
// yes, this works fine in Java
new MyGroovyClass() {
    @Override public Object foo() {
        return super.foo();
    }
};
```

## Tổng kết

Kotlin đã được tạo ra vài năm sau Groovy và mượn một số tính năng từ nó vì vậy khi chuyển từ Groovy, Kotlin cảm thấy giống như "một ngôn ngữ tôi hầu như biết".

Được viết tĩnh, Kotlin có thể có một chút "trói buộc" hơn Groovy. Mặt khác, nó có vẻ phù hợp hơn để viết “các dự án doanh nghiệp có thừa kế lớn”.

Nếu bạn mong đợi ý kiến về ngôn ngữ nào tốt hơn, xin lỗi sẽ không có một ngôn ngữ nào. Cả Groovy và Kotlin đều tốt.

Để kết luận, đây là đoạn mã cuối cùng hiển thị sự thiết kế chiến lược của các thư viện lõi Kotlin:
```
public operator fun times(other: Long): Long
```


Bài viết được dịch từ: https://dkandalov.github.io/groovy/kotlin/2016/06/06/From-Groovy-to-Kotlin.html