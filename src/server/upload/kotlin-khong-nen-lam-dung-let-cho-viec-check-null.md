Với sự ra đời của *null safety* trong Kotlin, giờ đây mọi người đều biết standard function (hàm phạm vi) `let{...}`.

Ví dụ được đưa ra trong tài liệu *null safety* như dưới đây:

```
val listWithNulls: List<String?> = listOf(“Kotlin”, null)
for (item in listWithNulls) {
 item?.let { println(it) } // prints Kotlin and ignores null
}
```

Do đó, *let* sẽ thường được hiểu rằng đó là sự thay thế củaviệc check null, ví dụ: `if (variable! = null)`. Minh họa thêm dưới đây

```
// Cách tiếp cận thông thường
if (variable != null) { /*Do something*/ }
// Dường như là cách tiếp cận của Kotlin
variable?.let { /*Do something*/ }
```

Điều này là được phép, nhưng không phải lúc nào cũng sử dụng `let{...}` 

## Khi nào không nên sử dụng LET

### Lời khuyên 1.1: Khi chỉ sử dụng để check null cho một biến immutable, đừng sử dụng LET

Hãy tưởng tượng rằng nếu bạn có một function có thể nhận một biến nullable String như ví dụ ở dưới. 

```
// NOT RECOMMENDED
fun process(str: String?) {
    str?.let { /*Do something*/   }
}
```

Nhưng nến bạn thử decompiled thành Java code, thì đó là

```
public final void process(@Nullable String str) {
   if (str != null) {
      boolean var4 = false;
      /*Do something*/
   }
}
```

Nó thực hiện khai báo khởi tạo một biến. Khi bạn chạy xử lý function này sẽ mất thêm rất nhiều thời gian,  nó đang khởi tạo thêm biến `var4` mà ko có chút lợi ích nào.

Nếu thay đoạn code trên thành

```
// RECOMMENDED
fun process(str: String?) {
    if (str != null) {
        // Do Something
    }
}
```

Việc sử dụng `str` trong phạm vi `if` được `auto-cast` chuyển thành `non-nullable`. Mã dịch ngược là đơn giản hơn mà không cần thêm biến.

```
public final void process(@Nullable String str) {
   if (str != null) {
      /*Do something*/
   }
}
```

### Lời khuyên 1.2: Nếu bạn chỉ muốn truy cập nội dung biến đổi được kiểm tra, nhưng không phải nội dung phạm vi bên ngoài class, đừng sử dụng LET.

Lý do bạn kiểm tra một biến là null hay không, rất có thể bạn muốn truy cập vào nội dung của nó.

Giả sử bạn có một webview và muốn setting lại các giá trị của nó nếu giá trị hiện tại của nó không phải là null. Dưới đây có vẻ rất thuyết phục

```
// NOT RECOMMENDED
webviewSetting?.let {
    it.javaScriptEnabled = true
    it.databaseEnabled = true
}
```

Thay vào đó thì ta sẽ làm như bên dưới

```
// RECOMMENDED
webviewSetting?.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

Sử dụng `run`, vì `it` sẽ được gửi biến lên  như `this` đến trong phạm vi, và điều này loại bỏ sự cần thiết của `it`

### Lời khuyên 1.3: Nếu bạn cần xâu chuỗi nội dung biến ban đầu sau phạm vi, đừng sử dụng LET.

Giả sử bạn có 1 danh sách `String` không thể `null`,  và bạn chỉ muốn in ra kích thước của nó, và sau đó sâu  chuỗi nó để làm muột việc khác (ví dụ: để đơn giản, giả sử bạn muốn in từng `String`).

Một cách để thực hiện việc đó là

> Lưu ý: Vì mục đích đơn giản, giả sử vì một số lý do, tôi không muốn `String` trong phạm vi bên trong của `let` với `it.forEach{ println(it) }`.

```
// NOT RECOMMENDED
stringList?.let {
    println("Total Count: ${it.size}")
    it
}?.forEach{ println(it) }
```

Nó không tốt, vì chúng ta phải có `it` ở đó cho mục đích lấy giá trị trả về.

Thay vào đó thì hãy xem xét việc sử dụng `also`

```
// THIS IS BETTER THAN PREVIOUS
stringList?.also {
    println("Total Count: ${it.size}")
}?.forEach{ println(it) }
```

Điều này sẽ loại bỏ sự cần thiết phải getting `it`

> Lưu ý: Cách tiếp cận tốt hơn ở trên không lý tưởng ( Đó là lý do tại sao tôi không viết `RECOMMENDED`),  vì nó có nhiều `?`. Tôi sẽ minh họa thêm dưới đây tại sao điều này không lý tưởng. Nhưng vì lý do đơn giản tôi phải cung cấp ví dụ.

Vây, rõ ràng là `let` không phải là phương phát tốt nhất trong 1 số case (mặc dù ta vẫn sẽ đạt được mục đích khi sử dụng nó).

> Lưu ý: Để có cái nhìn rõ hơn về các scope function khác như là `let`, bạn có thể tham khảo bài viết dưới đây
> 
> https://medium.com/@elye.project/mastering-kotlin-standard-functions-run-with-let-also-and-apply-9cd334b0ef84

## Khi nào nên sử dụng LET

### Lời khuyên 2.1: Nếu bạn đang kiểm tra trạng thái null của biến mutable, hãy sử dụng LET để đảm bảo giá trị của biến đó là bất biến

Đây là trường hợp trạng thái/ nội dung của biến được kiểm tra có thể thay đổi ngay cả sau khi người ta đã kiểm tra nó bằng cách sử dụng `if condition`

Hãy xem ví dụ về biến toàn cục sau

```
// RECOMMENDED
private var str: String? = null

fun process() {
    str?.let { /*Do something*/ }
}
```


Điều này có ý nghĩa để sử dụng `let`

Lý do là bởi vì chúng ta thưởng sử dụng `ìf` để check, việc smart casting không nên áp dụng để kiểm tra biến toàn cục, do tính biến đổi của nó

```
// NOT RECOMMENDED
private var str: String? = null

fun process() {
    if (str != null) {
        println(str?.length)
    }
}
```

Ví dụ bên trên rất rõ ràng, ngay cả khi trong phạm vi `if (str != null)`, chúng ta không thể  bảo đảm là `str` sẽ không null. Vì thế toán tử `?` vẫn cần thiết để chúng ta sử dụng như một cách tiếp cận thông thường.

### Lời khuyên 2.2: Nếu bạn muốn truy cập vào nội dung bên ngoài scope, sử dụng `LET` để phân biệt `it` và `this`  dễ dàng hơn.

Quay trở lại ví dụ về `webviewSetting` bên trên, giả sử chúng ta cần truy cập vào biến phạm vi bên ngoài. Nếu chúng ta sử dụng `run`, nó sẽ trông như thế này

```
// ERROR
var javaScriptEnabled = false
var databaseEnabled = false

webviewSetting?.run {
    javaScriptEnabled = javaScriptEnabled
    databaseEnabled = databaseEnabled
}
```

Điều này sẽ gây nhầm lẫn cho trình biên dịch với nó. Tất nhiên bạn có thể đổi tên nó một chút và trình biên dịch đủ thông minh để mã hóa cho chúng như bên dưới, và nó sẽ biên dịch. Tuy nhiên, nó vẫn còn gây nhầm lẫn cho đánh giá PR, vv

```
// ERROR
var isJavaScriptEnabled = false
var isDatabaseEnabled = false

webviewSetting?.run {
    isJavaScriptEnabled = javaScriptEnabled
    isDatabaseEnabled = databaseEnabled
}
```

Vì vậy, với điều này, sẽ tốt hơn khi sử dụng bên dưới (giả sử khuyến nghị 2.1 ở trên được đáp ứng, trong đó biến có thể thay đổi)

```
// RECOMMENDED
var javaScriptEnabled = false
var databaseEnabled = false

webviewSetting?.let {
    javaScriptEnabled = it.javaScriptEnabled
    databaseEnabled = it.databaseEnabled
}
```

Nếu sử dụng `run`, người ta có thể sử dụng `this`, nhưng nó rất khó hiểu như được hiển thị bên dưới trong việc phân biệt biến nào thuộc về phạm vi nào.

```
// NOT RECOMMENDED
var javaScriptEnabled = false
var databaseEnabled = false

webviewSetting?.run {
    javaScriptEnabled = this.javaScriptEnabled
    databaseEnabled = this.databaseEnabled
}
```

### Lời khuyên 2.3: Khi bạn có một chuỗi dai nullable trước mặt, sử dụng `LET` để loại bỏ nhiều `?` check

Tham khảo function bên dưới

```
// NOT RECOMMENDED
fun process(string: String?): List<Char>? {
    return string?.asIterable()?.distinct()?.sorted()
}
```

Mỗi chuỗi các `?` không phải là í hay, vì nó sẽ đưa ra các điều kiện kiểm tra null không cần thiết, bởi vì `?` đầu tiên nên đã loại bỏ kết quả null.

Mã dịch ngược trông như dưới đây

```
@Nullable
public final List process(@Nullable String string) {
   List var2;
   if (string != null) {
      Iterable var10000 = StringsKt.asIterable(
                           (CharSequence)string);
      if (var10000 != null) {
         var2 = CollectionsKt.distinct(var10000);
         if (var2 != null) {
            var2 = CollectionsKt.sorted((Iterable)var2);
            return var2;
         }
      }
   }

   var2 = null;
   return var2;
}
```

Sử dụng `LET` như bên dưới, loại bỏ `?` và giảm hàm check điều kiện và độ phức tạp của code (sẽ hữu ích nếu bạn tạo unit test để đạt điểm cao hơn và độ phủ phức tạp cao hơn)

> Lưu ý: Đây là với giả định bạn cần truy cập vào nội dung phạm vi bên ngoài theo điểm 2 ở trên (lưu ý: Tôi loại bỏ nội dung phạm vi bên ngoài phạm vi bên ngoài để giải thích). Trường hợp khác sử dụng `run` sẽ tốt hơn.

```
// RECOMMENDED
fun process(string: String?): List<Char>? {
    return string?.let {
        it.asIterable().distinct().sorted()
    }
}
```

Dịch ngược code sẽ nhìn như bên dưới

```
@Nullable
public final List process(@Nullable String string) {
   List var10000;
   if (string != null) {
      int var4 = false;
      var10000 = CollectionsKt.sorted(
                   (Iterable)CollectionsKt.distinct(
                      StringsKt.asIterable((CharSequence)string)));
   } else {
      var10000 = null;
   }

   return var10000;
}
```

>Lưu ý: Trong một số trường hợp, trình biên dịch sẽ tối ưu hóa `?`, ví dụ như khi sử dụng `filter`, `map` ... Trong trường hợp này, không có kiểm tra null bổ sung nào được thực hiện, do đó code dịch ngược là như nhau. Tuy nhiên, với `let`, nó làm giảm số lượng `?` cần thiết trong code, do đó vẫn tiện dụng khi chúng ta có một chuỗi dài nullable.

### Lời khuyên 2.4: Khi bạn cần truy cập kết quả, sử dụng `LET` để trả về kết quả cuối cùng trong phạm vi scope.

Tham khảo function bên dưới

```
// NOT RECOMMENDED
fun process(stringList: List<String>?, removeString: String): Int? {
    var count: Int? = null

    if (stringList != null) {
        count = stringList.filterNot{ it == removeString }
                        .map { it.length }
                        .sum()
    }
    
    return count
}
```

Chúng ta cần lấy kết quả của chuỗi, tức là đầu ra của `sum`.

Mặc dù `stringList` là một biến không thay đổi, có vẻ như chúng ta nên cân nhắc việc không nên sử dụng `LET` (Lời khuyên 1.1).

Ở trường hợp này, việc không sử dụng `LET` sẽ buộc chúng ta tạo ra một biến khác cho mục đích đó.

Vì vậy, chúng ta có thể loại bỏ biến bổ sung bằng cách sử dụng `LET` như dưới đây. Súc tích hơn và không cần thêm biến.

```
// RECOMMENDED
fun process(stringList: List<String>?, removeString: String): Int? {
    return stringList?.let {
        it.filterNot{ it == removeString }.map { it.length }.sum()
    }
}
```

-----

Hy vọng bài viết này sẽ giúp ích được nhiều cho các bạn.

Nguồn tham khảo: 
https://medium.com/@elye.project/kotlin-dont-just-use-let-7e91f544e27f