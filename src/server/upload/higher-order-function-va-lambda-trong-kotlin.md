# Giới thiệu
Bài viết này sẽ giúp bạn hiểu về 1 tính năng của Kotlin giúp chúng ta có thể tối ưu hóa và làm giảm code của mình đó chính là **Higher oder funtions** và **Lambdas** một thứ mà thường làm chúng ta ghét hoặc sợ bởi vì cú pháp và cách sử dụng kỳ lạ của nó.
![](https://cdn-images-1.medium.com/max/1600/1*-xYwCIXc-SXMHEmc3EtjaQ.png)

## Phần 1 - Higher Order Function?

**1. Giới thiệu**

> Các hàm thông thường luôn chỉ nhận vào các tham số dữ liệu, nhưng với Higher Oder Funtion lại có thể nhận một funtion khác như một param hoặc có thể trả về một funtion được gọi là 1 Higher order funtion.

**2. Ví dụ thực tế :**

 ```
fun doSomethingWithNumber(number: Int, receiver: (String?) -> Unit) {
    var result: String? = null
    //...do complex work with number

    receiver(result)
}
```
Function **doSomethingWithNumber()** có 2 param là **number** kiểu **Int** và **receiver** là một function **(String?) -> Unit** với **String** là kiểu của tham số truyền vào và **Unit (Void)** là kiểu trả về của hàm. Ta có thể gọi **doSomethingWithNumber()** bằng những cách sau:

* Function References:
 ```
doSomethingWithNumber(1000, ::processWithResult)

fun processWithResult(result: String?) : Unit {
    // do something with result
}
```
Lúc này sau khi mà function **doSomethingWithNumber()** gọi **receiver(result)**, sẽ nhảy vào function **processWithResult()** với **result** được truyền từ function **doSomethingWithNumber()**, điều này giống với **callback** trong **Java** hay các ngôn ngữ khác. Thay vì ta truyền **interface** thì ở đây ta truyền **reference** của function vào bằng cách sử dụng toán tử **::** và tên function.

* Nói thêm một chút về **Function References**. Toán tử **::** có thể sử dụng với các overload function ví dụ như:
```
fun isOdd(x: Int) = x % 2 != 0
fun isOdd(s: String) = s == "brillig" || s == "slithy" || s == "tove"

val numbers = listOf(1, 2, 3)
println(numbers.filter(::isOdd)) // refers to isOdd(x: Int)
```
* Function Anonymous
```
doSomethingWithNumber(1000, fun(result: String?) {
    // do something with result
})
```

Thay vì truyền reference của function vào, ta định nghĩa luôn function ở argument. Function Anonymous khá giống với với các function thông thường, chỉ khác một điều là tên của function bị bỏ qua.
## Phần 2 - Lambda?

Lambda là một trong những tính năng Java 8 quan trọng nhất giúp chúng ta thực thi interface ngắn gọn và rõ ràng
(tức là các interface chỉ có một phương thức trừu tượng) bằng cách loại bỏ code bản mẫu. Tóm lại thì ngắn gọn Lambda như  sau :

* Biểu thức của lambda luôn được bao bởi **{}**
* Nếu lambda function có bất kì param nào nó phải ở trước toán tử **->** (kiểu dữ liệu của param có thể được bỏ qua)
* Body của lambda function phải ở sau toán tử **->**

```
//1
doSomethingWithNumber(1000, { result ->
    // do something with result
})

//2
doSomethingWithNumber(1000, { result : String? ->
    // do something with result
})

//3
doSomethingWithNumber(1000) { result ->
    // do something with result
}
```
3 cách sử dụng trên là như nhau và như các cách **function reference** và **function anonymous**. Cách gọi thứ 3 nhìn có vẻ khác biệt chút so với 2 cách gọi còn lại. Một điểm thêm ở đây là nếu param cuối là function thì ta có thể khai báo **lambda function** bên ngoài **()**.

* **it: implicit name of a single parameter**
```
doSomethingWithNumber(1000) {
    println("The result is $it")
    // do something with result
}
```
Có thể hiểu ở đây **it** là tên đại diện cho parameter duy nhất

* **Destructuring trong Lambdas**

Ở đây ta đã destructure entry ra 2 tham số key và value..
```
map.mapValues { entry -> "${entry.value}!" }
map.mapValues { (key, value) -> "$value!" }
```
* **Lambda return**
```
//The first way
ints.filter {
    val shouldFilter = it > 0
    shouldFilter
}

//The second way
ints.filter {
    val shouldFilter = it > 0
    return@filter shouldFilter
}
```
Ở đây ta có một một Collection ints gọi đến function filter(), param của function filter() là function có kiểu trả về là Boolean. Ta sử dụng lambda để thực hiện điều này. Có 2 cách để return một function:

   
1.    Cách thứ nhất, giá trị của biểu thức cuối cùng trùng với return type sẽ được coi là giá trị trả về, shouldFilter được coi là giá trị trả về.
2.    Cách thứ hai, sử dụng Return at Labels để xác định vị trí trả về, nếu chỉ để return shouldFilter nó sẽ hiểu là đang return trả function bên ngoài.

* **Closures**


Lambda, anonymous function, local function và [object expression](https://kotlinlang.org/docs/reference/object-declarations.html#object-expressions) đều có thể truy cập closure của nó (nôm na như là vùng bên ngoài khai báo nó). Nó có thể truy cập các function, biến và param được khởi tạo ở bên ngoài, không giống Java, ta chỉ sử dụng được các biến và param ở vùng bên ngoài nếu như chúng được khai báo là final

1. Java
```
final String username = edtUsername.getText().toString();

btnLogin.setOnClickListener(new View.OnClickListener() {
  @Override
  public void onClick(View v) { //username phải là final
    if (username != null && !username.isEmpty()) {
      //.....
    }
  }
});
```
2. Kotlin
```
var sum = 0
ints.filter { it > 0 }.forEach {
    sum += it //sum không cần phải là val (final)
}
print(sum)
```
* **Function Literals**

Theo mình tìm hiểu định nghĩa của Function Literals như sau và mình thấy hợp lý: [Comment](https://stackoverflow.com/questions/12314905/exact-meaning-of-function-literal-in-javascript)
> **A function literal is just an expression that defines an unnamed function.**

Một số ví dụ về function literal trong Kotlin:
   ```
val m = { (x : String) -> println("$x") }
val n : (String) -> Unit = { x -> println("$x") }
val o : (String) -> Unit = { (x : String) -> println("$x") }

fun main(args : Array<String>) {
    m("good morning")
    n("good morning")
    o("good morning")
}
```

Tất cả m, n và o đều thực hiện chức năng như nhau.
    
### Kết luận :
> Lambdas có cả nghìn công dụng bất cứ khi nào bạn nghĩ " Could I make thí cleaner somehow" thì lambda giúp bạn làm điều đó . Trong phần này tôi đã khái niệm cơ bản về Higher oder funtion và Lambda để vận dụng nó tốt trong ứng dụng của chúng ta, thì cần phải thực hành và tham khảo từ nhiều nguồn.
Cảm ơn các bạn, chúc các bạn học tập thật tốt !!!
 ### Tham khảo :
* [Higher-Order Functions and Lambdas](https://kotlinlang.org/docs/reference/lambdas.html)
* [USING LAMBDA EXPRESSIONS IN ANDROID](https://www.techjini.com/blog/using-lambda-expressions-android/)
* [Kotlin Fever : Part 3 — Lambdas and Higher Order Functions](https://medium.cobeisfresh.com/kotlin-fever-part-3-lambdas-and-higher-order-functions-e9d4a7093c71)