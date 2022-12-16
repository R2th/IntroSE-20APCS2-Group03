Chắn hẳn bạn vẫn nhớ tất cả các file Util với tất cả các loại phương thức nhỏ mà cuối cùng bạn sử dụng rất nhiều trong ứng dụng của mình không? Nếu các phương thức tiện ích của bạn lấy các phương thức khác làm tham số, rất có thể bạn có thể cải thiện hiệu suất của ứng dụng bằng cách tiết kiệm bộ nhớ cho một số object, mà bạn thậm chí có thể không biết bạn đang thực hiện, với một từ khóa: **inline**. Hãy cùng xem những gì sẽ xảy ra khi bạn sử dụng những phương thức này và **inline** có tác dụng gì cũng như cách làm việc với **inline**.

### Function call — under the hood

Hãy cho rằng bạn sử dụng SharedPreferences rất nhiều trong ứng dụng của mình do đó bạn tạo chức phương thức tiện ích này để giảm thiểu việc viết lặp code mỗi khi bạn viết một cái gì đó trong SharedPreferences của bạn:

```java
fun SharedPreferences.edit(
    commit: Boolean = false,
    action: SharedPreferences.Editor.() -> Unit
) {
    val editor = edit()
    action(editor)
    if (commit) {
        editor.commit()
    } else {
        editor.apply()
    }
}
```

Sau đó, bạn có thể sử dụng nó để lưu lại một token dưới dạng String:

```java
private const val KEY_TOKEN = “token”
class PreferencesManager(private val preferences: SharedPreferences){
    fun saveToken(token: String) {
        preferences.edit { putString(KEY_TOKEN, token) }
    }
}
```

Bây giờ, hãy cùng xem điều gì sẽ xảy ra khi `Preferences.edit` được gọi. Nếu chúng ta nhìn vào mã bytecode của Kotlin (Tools> Kotlin > Decompiled Kotlin to Java), chúng ta sẽ thấy một lời gọi NEW, nghĩa là một object đang được tạo ra kể cả khi trong code chúng ta không hề gọi tới hàm khởi tạo của object đó:

```java
NEW com/example/inlinefun/PreferencesManager$saveToken$1
```

Cùng kiểm tra đoạn mã được dịch ngược để hiểu hơn về nó. Phương thức `saveToken` sau khi được dịch ngược sẽ như sau:

```java
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */
public final void saveToken(@NotNull final String token) {
    // the edit SharedPreferences extension function we defined is called
    PreferenceManagerKt.edit$default(
        this.preferences, // the shared preferences object
        false, // default value for commit flag
        (Function1)(new Function1() { // new Function created for the action
            // $FF: synthetic method
            // $FF: bridge method
            public Object invoke(Object var1) {
                this.invoke((Editor)var1);
                return Unit.INSTANCE;
            }
            public final void invoke(@NotNull Editor $this$edit) {
                Intrinsics.checkParameterIsNotNull($this$edit, "$receiver");
                $this$edit.putString("token", token); // our action implementation
            }
        }), 1, (Object)null);
}
```

> Mội một high-order function chúng ta tạo ra sẽ dẫn đến việc một object `Function` được tạo ra và nó sẽ được cấp phát bộ nhớ và có thể dẫn đến hiện tượng runtime overhead.

### Inline function — under the hood

Để cải thiện hiệu năng cho ứng dụng, ta có thể tránh việc khởi tạo object function mới bằng cách sử dụng từ khóa `inline`:

```java
inline fun SharedPreferences.edit(
    commit: Boolean = false,
    action: SharedPreferences.Editor.() -> Unit
) { … }
```

Bây giờ, mã bytecode của Kotlin không có bất kỳ lời gọi NEW nào và ở đây, mã java được dịch ngược của phương thức `saveToken` sẽ như sau:

```java
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */
public final void saveToken(@NotNull String token) {
  // content of the SharedPreferences.edit function
  SharedPreferences $this$edit$iv = this.preferences;
  boolean commit$iv = false;
  int $i$f$edit = false;
  Editor editor$iv = $this$edit$iv.edit();
  Intrinsics.checkExpressionValueIsNotNull(editor$iv, "editor");
  int var7 = false;
  
  // content of the action implementation
  editor$iv.putString("token", token);
  
  // content of the SharedPreferences.edit function
  editor$iv.apply();
}
```

Nhờ có từ khóa `inline`, trình biên dịch sao chép toàn bộ mã của inline function vào function gọi tới nó và tránh được việc phải tạo thêm 1 object Function mới.

### What to mark as inline

⚠️ Nếu bạn đang cố gắng đánh dấu một phương thức là `inline` nhưng nó lại không chứa tham số là một phương thức khác thì bạn sẽ không nhận ra lợi ích nào cho hiệu năng và trình IDE sẽ còn cảnh báo và nhắc bạn nên bỏ từ khóa `inline`:

![](https://images.viblo.asia/224a75aa-1c21-4e7e-8595-5172e943b997.png)

⚠️ Vì sử dụng `inline` có thể làm cho đoạn mã được biên dịch ra lớn hơn, bạn nên tránh việc sử dụng `inline` cho các phương thức lớn. Ví dụ, nếu bạn kiểm tra Kotlin Standard Library, bạn sẽ thấy đa phần các `inline function` chỉ có từ 1 - 3 dòng.

⚠️ Khi sử dụng các phương thức `inline`, bạn không được phép giữ tham chiếu đến hàm đó và truyền nó sang một hàm khác - bạn sẽ gặp lỗi biên dịch `Illegal usage of inline-parameter`.

Vì vậy, hãy sửa đổi phương thức `edit` và phương thức `saveToken`. phương thức `edit` nhận được một tham số khác sau đó truyền đến một hàm khác. `saveToken` sử dụng một biến giả được cập nhật trong hàm mới:

```java
fun myFunction(importantAction: Int.() -> Unit) {
    importantAction(-1)
}
inline fun SharedPreferences.edit(
    commit: Boolean = false,
    importantAction: Int.() -> Unit = { },
    action: SharedPreferences.Editor.() -> Unit
) {
    myFunction(importantAction)
    ...
}
...
fun saveToken(token: String) {
    var dummy = 3
    preferences.edit(importantAction = { dummy = this}) {
         putString(KEY_TOKEN, token)
    }
}
```

Ta có thể thấy rằng `myFuction(importantAction)` sẽ gây lỗi sau:

![](https://images.viblo.asia/66d513e0-b7ea-4184-9f10-f979305f96e4.png)

Ở đây, bạn có thể giải quyết lỗi này tùy thuộc vào phương thức của bạn như thế nào:

**Trường hợp 1**: Nếu bạn có nhiều hàm làm tham số và bạn chỉ cần giữ một tham chiếu đến một trong số chúng, thì bạn có thể đánh dấu nó là `noinline`.
Bằng cách sử dụng `noinline`, trình biên dịch sẽ tạo một đối tượng Function mới chỉ cho hàm cụ thể đó, những hàm còn lại vẫn sẽ là `inline`

Phương thức `edit`:

```java
inline fun SharedPreferences.edit(
    commit: Boolean = false,
    noinline importantAction: Int.() -> Unit = { },
    action: SharedPreferences.Editor.() -> Unit
) {
    myFunction(importantAction)
    ...
}
```

Nếu bạn kiểm tra bytecode, bạn sẽ thấy một lời gọi NEW xuất hiện:

```java
NEW com/example/inlinefun/PreferencesManager$saveToken$1
```

Trong đoạn mã dịch ngược ta có thể thấy như sau:

```java
/* Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 */
public final void saveToken(@NotNull String token) {
   // saveToken functionality
   final IntRef x = new IntRef();
   x.element = 3;
   
   // edit functionality inlined
   SharedPreferences $this$edit$iv = this.preferences;
 
   // new Function call for the noinline function declaration
   Function1 importantAction$iv = (Function1)(new Function1() {
        // $FF: synthetic method
        // $FF: bridge method
        public Object invoke(Object var1) {
            this.invoke(((Number)var1).intValue());
            return Unit.INSTANCE;
        }
        public final void invoke(int $receiver) {
            // saveToken functionality
           x.element = $receiver;
        }
   });
  
   // edit functionality inlined
   boolean commit$iv = false;
   int $i$f$edit = false;
   PreferenceManagerKt.myFunction(importantAction$iv);
   Editor editor$iv = $this$edit$iv.edit();
   Intrinsics.checkExpressionValueIsNotNull(editor$iv, "editor");
   int var9 = false;
   editor$iv.putString("token", token);
   editor$iv.apply();
}
```

**Trường hợp 2**: Nếu chức năng của bạn chỉ có một phương thức là tham số, bạn có thể bỏ qua luôn từ khóa `inline`. Nếu bạn thực sự muốn sử dụng `inline`, bạn phải đánh dấu tham số của mình bằng từ khóa `noinline`, nhưng với phương pháp này, bạn sẽ có được rất ít lợi ích về mặt hiệu năng từ việc sử dụng `inline`.

Để giảm phân bố bộ nhớ gây ra bởi biểu thức `lambda`, hãy sử dụng từ khóa `inline`. Hãy chắc chắn rằng bạn áp dụng nó cho các hàm ngắn và sử dụng các phương thức khác làm tham số. Nếu bạn cần giữ một tham chiếu đến phương thức hoặc truyền nó làm tham số cho phương thức khác, hãy sử dụng từ khóa `noinline`.

Nguồn: https://medium.com/androiddevelopers/inline-functions-under-the-hood-12ddcc0b3a56