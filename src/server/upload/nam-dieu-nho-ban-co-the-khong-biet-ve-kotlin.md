>“The only true wisdom is in knowing you know nothing.” ― Socrates**

Tôi đã sử dụng Kotlin được gần hai năm và tôi bắt đầu từ việc đưa nó vào dự án đồ chơi dành cho các cuộc đàm phán công nghệ của tôi. Ngay từ dòng đầu tiên, tôi đã biết rằng ngôn ngữ này sẽ thay đổi cuộc đời tôi, và bạn biết gì không? Tôi đã hoàn toàn đúng.


Kiến thức làm cho bạn tốt hơn và đó là lý do tại sao hầu hết các kỹ sư thành công của thế giới không ngừng học hỏi những điều mới. Dưới đây là danh sách của tôi về năm điều ít được biết đến về Kotlin và tôi hy vọng bạn sẽ tìm thấy ít nhất ba điều đáng để biết.



-----

#### 1. Name your imports
Trong Kotlin, `imports` được trình biên dịch sử dụng để cho phép bạn đặt tên các lớp của mình theo tên không đủ tiêu chuẩn của chúng. Điều gì xảy ra nếu bạn có xung đột đặt tên? Chuyện buồn xảy ra!

```kotlin
package com.code.sliski.userinfoscreen.ui

import ...

import android.view.View // Conflict

class UserInfoFragment : Fragment(), com.code.sliski.userinfoscreen.ui.View { // Conflict

    override fun onCreateView(inflater: LayoutInflater, 
                              container: ViewGroup?, 
                              state: Bundle?): View = // Conflict
            inflater.inflate(user_info_fragment,
                             container,
                             false)
}

interface View // Conflict
```

###
Cá nhân, tôi ghét sử dụng tên package đủ điều kiện trong mã của mình vì nó làm giảm tính dễ đọc và rõ ràng. **Trong Python, bạn có thể đặt tên cho imports của mình để khắc phục các xung đột và Kotlin cũng hỗ trợ nó.**
###

```kotlin
import android.view.View as AndroidView // Named import

class UserInfoFragment : Fragment(), View {
    
    override fun onCreateView(inflater: LayoutInflater, 
                              container: ViewGroup?, 
                              state: Bundle?): AndroidView = // Using named import
}

```

#
#### 2. Change companion object name

`Companion object` đã được giới thiệu để thay thế các `static` member. Nó không chỉ để khai báo các thuộc tính tĩnh mà còn để đặt tên cho chúng. Làm sao? Hãy xem ví dụ này.

```kotlin
// Using in Java
CustomButton button = new CustomButton(context);
button.setVisibility(CustomButton.Companion.getGONE());

// Using in Kotlin
val button = CustomButton(context)
button.visibility = CustomButton.VISIBLE

class CustomButton(context: Context?) : View(context) {
    companion object {
        // Visibility
        val GONE = 1
        val VISIBLE = 2
        val INVISIBLE = 3
    }
}
```

Theo mặc định, Kotlin tạo một static nested class `Companion` cho mọi đối tượng companion. Đó là lý do tại sao bạn cần sử dụng CustomButton.Compmate để truy cập các thành viên tĩnh từ mã Java (bạn cũng có thể sử dụng nó trong Kotlin nhưng không cần thiết). **Kotlin cho phép bạn thay đổi tên mặc định của đối tượng companion thành bất kỳ tên nào bạn muốn**. Mã tái cấu trúc trông như thế này.

```kotlin
// Using in Java
CustomButton button = new CustomButton(context);
button.setVisibility(CustomButton.Visibility.getGONE());

...

class CustomButton(context: Context?) : View(context) {
    companion object Visibility {
        val GONE = 1
        val VISIBLE = 2
        val INVISIBLE = 3
    }
}
```

Hạn chế lớn nhất là Kotlin không hỗ trợ nhiều đối tượng companion cho một lớp. Nó sẽ là tuyệt vời để nhóm các thuộc tính tĩnh.

```kotlin
val button = CustomButton(context)
button.visibility = CustomButton.Visibility.VISIBLE
button.foregroundGravity = CustomButton.ForegroundGravity.LEFT

class CustomButton(context: Context?) : View(context) {

    companion object Visibility {
        val VISIBLE = 1
        val INVISIBLE = 2
    }

    companion object ForegroundGravity {
        val LEFT = 1
        val RIGHT = 2
    }
}
```

#
#### 3. Compose functions
Tôi cá là bạn đã sử dụng các tham chiếu hàm trước đây nhưng bạn đã bao giờ thử sử dụng chúng để soạn các hàm chưa? Hãy tưởng tượng rằng bạn muốn ánh xạ một loạt các mức giá theo giá được đánh thuế, giảm giá và làm tròn. Sử dụng phương pháp phổ biến, bạn sẽ kết thúc với một cái gì đó như thế này.
```kotlin
val prices = listOf(21.8, 232.5, 231.3)
prices.map(::taxed)
      .map(::discounted)
      .map(::rounded)

fun taxed(value: Double): Double = value * 1.4
fun discounted(value: Double): Double = value * 0.9
fun rounded(value: Double): Double = Math.round(value).toDouble()
```

Mã tốt hơn đây 
```kotlin
val prices = listOf(21.8, 232.5, 231.3)
val taxedDiscountedRounded = compose(::taxed, ::discounted, ::rounded)
prices.map(taxedDiscountedRounded)

fun <A, B> compose(f: (A) -> A,
                   g: (A) -> A,
                   h: (A) -> B): (A) -> B = { x -> h(g(f(x))) }

fun taxed(value: Double): Double = value * 1.4
fun discounted(value: Double): Double = value * 0.9
fun rounded(value: Double): Double = Math.round(value).toDouble()
```

**Thành phần chức năng không chỉ làm cho mã của bạn sạch hơn mà còn nhanh hơn.** Một khi bạn hiểu nó, bạn sẽ có thể sáng tác hầu hết mọi thứ.

#
#### 4. Change name of generated class

Các hàm mở rộng là một trong những tính năng hấp dẫn nhất trong Kotlin nhưng sử dụng chúng trong mã Java có thể khiến bạn đau đầu nghiêm trọng. Nó là xấu xí và bên cạnh đó không có gì khác như gọi một phương thức tĩnh.

```kotlin
// Main.java
public static void main(String[] args) {
    String name = null;

    AnyKt.ifNull(name, new Function1<Object, Unit>() {
        @Override
        public Unit invoke(Object o) {
            return null;
        }
    });
}

// Any.kt
inline fun <T> T?.ifNull(function: (T?) -> Unit) {
    if (this == null) function(this)
}
```

Kotlin tạo lớp AnyKt với một phương thức tĩnh để bạn có thể sử dụng nó trong Java. **Có một tùy chọn để thay đổi tên của lớp được tạo để đạt được khả năng đọc tốt hơn.**

```kotlin
// Main.java
public static void main(String[] args) {
    String name = null;

    Nullcheck.ifNull(name, new Function1<Object, Unit>() {
        @Override
        public Unit invoke(Object o) {
            return null;
        }
    });
}

// Any.kt
@file:JvmName("Nullcheck")
package ...

inline fun <T> T?.ifNull(function: (T?) -> Unit) {
    if (this == null) function(this)
}
```

#
#### 5. Validate an assignment and “veto” it
Cách thức mà Kotlin xử lý ủy nhiệm là khá ngoạn mục, vì vậy nếu bạn không quen thuộc với nó, bạn hoàn toàn nên kiểm tra bài viết của tôi: "Zero boilerplate delegation in Kotlin". Bên cạnh "class delegation", còn có một cơ chế thú vị gọi là "delegated properties" được sử dụng để khởi tạo thuộc tính lười biếng. Làm thế nào bạn sẽ giải quyết tình huống mà bạn cần để có thể chặn một nhiệm vụ và "veto" nó? Có cách nào sạch sẽ để làm điều đó? Có, có!

```kotlin
var price: Double by Delegates.vetoable(0.0) { prop, old, new ->
    validate(new)
}

fun validate(price: Double) : Boolean {
    // Validation checks
}
```

Mẫu cho thấy việc sử dụng một built-in vetoable delegate. Lambda chuyển đến quyền phủ quyết được gọi trước khi gán giá trị mới cho property. Trả về false từ lambda cho phép bạn "phủ quyết" bài tập nhưng nếu bạn muốn chuyển nó qua trả về true.

Tham khảo : https://proandroiddev.com/5-small-things-you-probably-dont-know-about-kotlin-255261940de6