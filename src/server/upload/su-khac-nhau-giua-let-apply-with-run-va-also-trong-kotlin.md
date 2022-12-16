Với những ai đã sử dụng Kotlin để phát triển ứng dụng, chắc hẳn đã không ít lần sử dụng các standard functions run, with, let, also và apply. Để hiểu và sử dụng thành thục chúng không phải là dễ. Và dưới đây là những điều đúc kết lại được.

## Scoping functions
Có thể hiểu đơn giản, scoping function là phạm vi ảnh hưởng nhất định của một hàm. Nó là điều cốt lõi để phân biệt giữa các scoping functions: run, with, T.run, T.let, T.also và T.apply.

Dưới đây là minh hoạ phạm vi của hàm run:

```kotlin
fun test() {
    var mood = "I am sad"

    run {
        val mood = "I am happy"
        println(mood) // I am happy
    }
    println(mood)  // I am sad
}
```

Ở trên, ta có thể thấy rõ ràng trong phạm vi của hàm run, biến mood đã được định nghĩa lại trước khi in ra mà không làm ảnh hưởng tới phần khác của chương trình 

## 3 attributes of scoping functions
### 1.Normal vs. extension function
Chúng ta sẽ cùng làm thử một ví dụ với with và T.run. Hai hàm này thực sự tương tự nhau, chỉ có một điểm khác biệt duy nhất là with - một normal function và T.run - một extension function.
```kotlin
with(webview.settings) {
    this.javaScriptEnabled = true
    this.databaseEnabled = true
}
// similarly
webview.settings.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

Bình thường sẽ chẳng có gì để xem xét ở đây cả. Nhưng nếu ta giả sử webview ở trên có thể có giá trị null thì sao. Nếu vậy bắt buộc chúng ta phải kiểu tra trước khi gắn giá trị cho các thuộc tính của nó:
```kotlin
with(webview.settings) {
    this?.javaScriptEnabled = true
    this?.databaseEnabled = true
}

// similarly.
webview.settings?.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

Về mặt hình thức, rõ ràng T.run trông có vẻ "mượt" hơn, chỉ cần kiểu tra null một lần duy nhất trước khi gắn giá trị cho các thuộc tính; còn với hàm with, mỗi lần định gắn giá trị cho thuộc tính bất kỳ nào đó, ta lại phải tự hỏi xem nó có thể null được hay không!

### 2. This vs. it argument
Lần này ta sẽ lấy T.run và T.let làm ví dụ minh họa.

```kotlin
stringVariable?.run {
    println("The length of this String is ${this.length}")
}
// Similarly.
stringVariable?.let {
    println("The length of this String is ${it.length}")
}
```

Hãy nhìn vào tham số của chúng để thấy sự khác biệt.
Trong T.run, block là T.() vì vậy mà trong phạm vi của hàm, T có thể được truyền vào như this.
Với T.let, nó gửi chính nó vào block: (T). Vì vậy mà T có thể được gọi ra trong hàm như it.

### 3. Return this vs. other type
Tiếp theo sẽ là T.let và T.also. Nếu chỉ nhìn vào phạm vi của hàm bên trong, ta sẽ chẳng thấy sự khác nhau của chúng ở đâu cả.

```kotlin
stringVariable?.let {
    println("The length of this String is ${it.length}")
}
// Exactly the same as below
stringVariable?.also {
    println("The length of this String is ${it.length}")
}
```

Tuy nhiên, khác biệt là giá trị trả lại của chúng. T.also trả về bản thân T, this, trong khi đó T.let cho phép trả về một kiểu giá trị khác.
Dưới đây là minh họa việc sử dụng T.let để trả về một giá trị khác mong muốn:

```kotlin
val original = "abc"
// Evolve the value and send to the next chain
original.let {
    println("The original String is $it") // "abc"
    it.reversed() // evolve it as parameter to send to next let
}.let {
    println("The reverse String is $it") // "cba"
    it.length  // can be evolve to other type
}.let {
    println("The length of the String is $it") // 3
}
```

Cũng với đoạn code trên, nếu thay đổi bằng also ta sẽ không được kết quả đúng nữa:
```kotlin
original.also {
    println("The original String is $it") // "abc"
    it.reversed() // useless
}.also {
    println("The reverse String is ${it}") // "abc"
    it.length  // useless
}.also {
    println("The length of the String is ${it}") // "abc"
}
```

Cách sửa lại cho đúng
```kotlin
original.also {
    println("The original String is $it") // "abc"
}.also {
    println("The reverse String is ${it.reversed()}") // "cba"
}.also {
    println("The length of the String is ${it.length}") // 3
}
```

T.let có vẻ như giúp chúng ta kết hợp thành một khối chức năng đồng nhất như ở ví dụ trên mà không phải rườm ra như khi sử dụng T.also.
Tuy nhiên, chúng ta vẫn có thể thấy T.also có một số điểm lợi thế khác như:
- Nó bóc tách rõ ràng từng phần chức năng nhỏ riêng biệt.
- Nó có thể tự thao tác trước khi được sử dụng

Và khi kết hợp cả hai T.let và T.also, một hàm sẽ thay đổi chính nó, một hàm sẽ duy trì chính nó, chúng sẽ đem lại những đoạn code ngắn gọn và dễ hiểu hơn:
```kotlin
// Normal approach
fun makeDir(path: String): File  {
    val result = File(path)
    result.mkdirs()
    return result
}

// Improved approach
fun makeDir(path: String) = path.let{ File(it) }.also{ it.mkdirs() }
```
## Looking at all attributes
Ở trên ta đã tìm hiểm được về 4 hàm run, with, Tlet và T.also. Vậy còn T.apply thì như thế nào T.apply có 3 tính chất bên dưới:
- Nó là một extension function
- this là tham số 
- Và nó cũng trả lại chính no, this

```kotlin
// Normal approach
fun createInstance(args: Bundle) : MyFragment {
    val fragment = MyFragment()
    fragment.arguments = args
    return fragment
}

// Improved approach
fun createInstance(args: Bundle) = MyFragment().apply { arguments = args }

//Or we could also making unchained object creation chain-able.

// Normal approach
fun createIntent(intentData: String, intentAction: String): Intent {
    val intent = Intent()
    intent.action = intentAction
    intent.data=Uri.parse(intentData)
    return intent
}

// Improved approach, chaining
fun createIntent(intentData: String, intentAction: String) =
        Intent().apply { action = intentAction }
                .apply { data = Uri.parse(intentData) }
```
## Function selections
Dựa vào các thuộc tính và tính năng của các , chúng tasẽ quyết định sử dụng dùng hàm nào cho hợp lý.
![](https://images.viblo.asia/5d60aa80-3d16-47aa-bc0b-e8f452753099.png)

Nguồn: https://kotlinexpertise.com/coping-with-kotlins-scope-functions/