Một vài standard functions của Kotlin giống nhau đến mức chúng ta không chắc khi sử dụng chúng. Ở đây tôi sẽ giới thiệu một cách đơn giản để phân biệt rõ ràng sự khác biệt của chúng và cách chọn sử dụng chúng.

## Scoping functions

Các function mà chúng ta sẽ tập trung vào là run, with, T.run, T.let, T.also và T.apply. Chúng ta gọi chúng là các **scoping functions** khi ta xem main functionality của chúng cung cấp một scope bên trong function cho người gọi.

Cách đơn giản nhất để minh họa scope là function run.

```java
fun test() {
    var mood = "I am sad"

    run {
        val mood = "I am happy"
        println(mood) // I am happy
    }
    println(mood)  // I am sad
}
```

## 3 thuộc tính của scoping functions

Để làm cho các scoping functions trở lên thú vị hơn, hãy phân loại hành vi của chúng với 3 thuộc tính. Chúng ta sẽ sử dụng các thuộc tính này để phân biệt chúng với nhau.

### 1. Normal vs. extension function

Nếu chúng ta nhìn vào `with` và `T.run`, cả hai function thực sự khá giống nhau.

```java
with(webview.settings) {
    javaScriptEnabled = true
    databaseEnabled = true
}
// similarly
webview.settings.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

Tuy nhiên, sự khác biệt của chúng là một normal function với `with`, trong khi function còn lại là extension function, tức là `T.run`.

Vì vậy, câu hỏi là, lợi thế của chúng là gì?

Hãy tưởng tượng nếu `webview.settings` có thể là null, chúng sẽ trông như dưới đây.

```java
with(webview.settings) {
      this?.javaScriptEnabled = true
      this?.databaseEnabled = true
}

webview.settings?.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

Trong trường hợp này, rõ ràng  `T.run` extension function là tốt hơn, vì chúng ta có thể check null trước khi sử dụng.

### 2. This vs. it argument

Nếu chúng ta nhìn vào `T.run` và `T.let`, cả hai function đều giống nhau ngoại trừ một điều, cách chúng nhận đối số. Dưới đây cho thấy logic tương tự cho cả hai funcion

```java
stringVariable?.run {
      println("The length of this String is $length")
}

stringVariable?.let {
      println("The length of this String is ${it.length}")
}
```

Nếu bạn kiểm tra `T.run` function, bạn sẽ nhận thấy `T.run` chỉ được thực hiện dưới dạng extension function được gọi là `block: T. ()`. Do đó tất cả bên trong scope,  `T` có thể được gọi là `this`. Trong lập trình, `this` có thể hầu hết được bỏ qua. Do đó, trong ví dụ của chúng ta ở trên, có thể sử dụng `$length` trong câu lệnh `println`, thay vì `${this.length}`. Tôi gọi là **this as argument**.

Tuy nhiên với `T.let`, bạn sẽ thấy rằng `T.let` đang tự gửi chính mình vào function `block: (T)`. Do đó đây giống như một đối số lambda argument. Nó có thể được gọi trong scope function là `it`. Vì vậy, tôi gọi là **it as argument**.

Từ những điều trên, có vẻ như `T.run` vượt trội hơn `T.let` vì nó implicit, nhưng có một số lợi thế tinh tế của chức năng T.let như sau: 

* `T.let` không phân biệt rõ ràng hơn khi sử dụng function/member vs. the external class function/member.
* Trong trường hợp `this` có thể bỏ qua, ví dụ: khi nó được gửi dưới dạng parameter của funtion, `it` sẽ ngắn viết hơn `this` và rõ ràng hơn.
* `T.let` cho phép đặt tên tốt hơn cho biến được sử dụng đã chuyển đổi, tức là bạn có thể convert `it` thành một số tên khác.

### 3. Return this vs. other type

Bây giờ, hãy nhìn vào `T.let` và `T.also`, cả hai đều giống hệt nhau, nếu chúng ta nhìn vào  function scope bên trong của nó.

```java
stringVariable?.let {
      println("The length of this String is ${it.length}")
}

// Exactly the same as below

stringVariable?.also {
      println("The length of this String is ${it.length}")
}
```

Tuy nhiên sự khác biệt của chúng là return. `T.let` trả về một giá trị khác, trong khi `T.also` trả về chính `T` tức là `this`.

Cả hai đều hữu ích cho nối chuỗi, trong đó `T.also` cho phép bạn thực hiện trên cùng một biến, tức là `this`.

Minh họa đơn giản:

```java
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

// Wrong
// Same value is sent in the chain (printed answer is wrong)
original.also {
    println("The original String is $it") // "abc"
    it.reversed() // even if we evolve it, it is useless
}.also {
    println("The reverse String is ${it}") // "abc"
    it.length  // even if we evolve it, it is useless
}.also {
    println("The length of the String is ${it}") // "abc"
}

// Corrected for also (i.e. manipulate as original string
// Same value is sent in the chain 
original.also {
    println("The original String is $it") // "abc"
}.also {
    println("The reverse String is ${it.reversed()}") // "cba"
}.also {
    println("The length of the String is ${it.length}") // 3
}
```

`T.also` có vẻ vô nghĩa, vì chúng ta có thể dễ dàng kết hợp chúng thành một block function duy nhất. Hãy để ý, nó có một số lợi thế tốt

1. Nó có thể cung cấp một quá trình phân tách rất rõ ràng trên cùng một object, tức là làm cho function nhỏ hơn.
2. Nó có thể rất mạnh để tự thao tác trước khi được sử dụng, tạo ra một hoạt động xây dựng chuỗi.

Khi cả hai kết hợp chuỗi, tức là một người tự phát triển, một người giữ lại chính mình, nó sẽ trở thành một thứ gì đó mạnh mẽ:

```java
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

Bằng cách nhìn vào 3 thuộc tính, chúng ta có thể biết khá nhiều function behavior. Hãy để tôi minh họa về chức năng `T.apply`, vì nó chưa được đề cập ở trên. 3 thuộc tính của `T.apply` như dưới đây

1. Nó là extension function.
2. Nó nhận `this` là  argument
3. Nó returen this (chính nó)

Do vậy, người ta có thể tưởng tượng, nó có thể được sử dụng như là 

```java
// Normal approach
fun createInstance(args: Bundle) : MyFragment {
    val fragment = MyFragment()
    fragment.arguments = args
    return fragment
}
// Improved approach
fun createInstance(args: Bundle) 
              = MyFragment().apply { arguments = args }
```

Hoặc chúng ta cũng có thể làm cho chuỗi tạo object không xác định.

```java
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
```

## Function selections

Do đó, với 3 thuộc tính, bây giờ chúng ta có thể phân loại các function tương ứng. Và dựa vào đó, chúng ta có thể hình thành một cây quyết định bên dưới có thể giúp quyết định function nào chúng ta muốn sử dụng đang chờ xử lý đối với những gì chúng ta cần.

![](https://images.viblo.asia/fbe90f37-8e00-46ef-9947-aac425bbef30.png)

Hy vọng rằng cây quyết định ở trên làm rõ các function rõ ràng hơn và cũng đơn giản hóa việc ra quyết định của bạn, cho phép bạn nắm vững cách sử dụng các function này một cách thích hợp.


## Tài liệu tham khảo

https://medium.com/@elye.project/mastering-kotlin-standard-functions-run-with-let-also-and-apply-9cd334b0ef84