![](https://images.viblo.asia/bfd5262a-1675-4921-82e3-f9b1f00a1e3a.png)

### Lambda Expression
**Lambda Expression** về cơ bản là các hàm ẩn danh (`anonymous function`) mà bạn có thể coi là một giá trị. Ví dụ, ta có thể truyền chúng làm tham số cho các phương thức, trả về chúng hoặc làm bất kỳ điều gì khác mà chúng ta có thể làm với một đối tượng bình thường.

Ví dụ về một `Lambda Expression`:

```java
val square : (Int) -> Int = { value -> value * value }
```
Để sử dụng phương thức trên:
```java
val nine = square(3)
```
<br>

Bây giờ, hãy tìm hiểu nó thông qua một ví dụ đơn giản hơn:
```java
val doNothing: (Int) -> Int = {value -> value}
```
`Lambda Expression` ở trên không hề làm nhiệm vụ gì cả. Vế:
```java 
{value -> value}
``` 
đã là một phương thức hoàn chỉnh. Nó lấy một số `int` làm tham số và trả về một giá trị cũng dưới dạng `int`.
Trong vế: 
```java
(Int) -> Int
```
**(Int)** đại diện cho kiểu dữ liệu của tham số đầu vào.
<br>
**Int** đại diện cho kiểu dữ liệu trả về.
<br><br>
Vì vậy `doNothing` chính là một phương thức lấy một giá trị `int` và trả về giá trị tương đương duới dạng `int`.
<br><br>
Hãy xem xét một ví dụ khác:
```java
val add: (Int, Int) -> Int = {a, b -> a + b}
```
Đây cũng là một `Lambda Expression` lấy hai số `int` làm tham số, cộng chúng với nhau và trả về một giá trị `int`.
Tương tự như trên thì vế
```java
{a, b -> a + b}
```
cũng chính là một phuơng thức lấy hai số `int` làm tham số, cộng chúng và trả về một giá trị `int`.

Trong 
```java
(Int, Int) -> Int
```
**(Int, Int)** đại diện cho hai tham số đầu vào có kiểu `int`.
<br>
**Int** đại diện cho kiểu trả về cũng là `int`.
<br><br>
Ta có thể gọi phương thức này như sau:
```java
val result = add (2,3)
```
<br>

### Higher-Order Function
**Higher-Order Function** là các phương thức có thể sử dụng các phương thức như một tham số hay trả về một phương thức.
<br><br>
`Higher-Order Function` có thể thực hiện hai việc sau:
* Có thể lấy các phương thức làm tham số.
* Có thể trả về một phương thức.
<br>
Chúng ta sẽ kiểm chức từng thứ một trước.

Đặc điểm đầu tiên - Một phương thức có thể lấy các phương thức làm tham số.
```java
fun passMeFunction(abc: () -> Unit) {
    // I can take function
    // do something here
    // execute the function
    abc()
}
```
Phương thức `passMeFunction()` nhận phương thức 
```java
abc: () -> Unit
```
làm tham số của nó (`abc` chỉ là tên của tham số, bạn có thể đặt chúng theo ý của mình).
```java
() -> Unit
```
là một thành phần rất quan trọng. 
<br>
**()** thể hiện rằng phương thức truyền vào không có tham số.

**Unit** thể hiện rằng phương thức truyền vào không trả về giá trị gì.
<br><br>
Như ta thấy `passMeFunction` có thể lấy một phương thức khác (không có tham số) và không trả về giá trị gì cả (`Unit`).

Cùng thử truyền cho `passMeFunction` một phương thức:
```java
passMeFunction (
    {
         val user = User()
         user.name = "ABC"
         println("Lambda is awesome")
    }
)
```
Ở đây `{}` là một phương thức trong chính nó.

Nó không có tham số và không trả về bất kì giá trị nào. Nó chỉ tạo ra một`User`, gán tên cho user đó và in một dòng chữ. 
<br><br>
Vì `Kotlin` cung cấp cho chúng ta một cách ngắn gọn để xử lý trong trường hợp này, ta có thể rút gọn đoạn code trên bằng cách bỏ đi `()`:
```java
passMeFunction {
    val user = User()
    user.name = "ABC"
    println("Lambda is awesome")
}
```
Bây giờ, chúng ta đã hiểu làm thế nào để truyền một phương thức dưới dạng tham số cho một phương thức.
<br><br>
Hãy chuyển sang đặc điểm thứ hai - Một phương thức mà có thể trả về một phương thức.
<br><br>
Giả sử chúng ta có một hàm **add** có hai tham số và trả về một giá trị `int`.
```java
fun add(a: Int, b: Int): Int = a + b
```
Cùng với phương thức **returnMeAddFunction** không có tham số nào và trả về một hàm như sau **((Int, Int) -> Int)**.
```java
fun returnMeAddFunction(): ((Int, Int) -> Int) {
     // can do something and return function as well
     // returning function
     return ::add
}
```

**(Int, Int)** có nghĩa là phương thức này cần hai tham số có giá trị `int`.

**Int** có nghĩa là hàm sẽ trả về giá trị dưới dạng `int`.
<br><br>
Bây giờ, chúng ta có thể gọi hàm **returnMeAddFunction**, lấy hàm **add** và gọi nó như bên dưới:
```java
val add = returnMeAddFunction()

val result = add(2, 2)
```
Đây chính là `Higher-Order Function` trong `Kotlin`.
<br><br>
Chúc các bạn học tập vui vẻ!