(Tiêu đề gốc: Kotlin has Nothing but there is nothing like Nothing in Java)

## Mở đầu

Trước khi đến với `Nothing`, đầu tiên, hãy nhìn sang người anh em của nó `Unit`.

### **Unit:**

`Unit` trong Kotlin tương ứng với `void` trong Java. Giống như void, Unit là kiểu trả về của bất kỳ hàm nào không trả về một giá trị có nghĩa, và ta không bắt buộc phải khai báo Unit là kiểu trả về. Nhưng không giống như void, Unit là một class thực sự (Singleton) với một thể hiện (instance) duy nhất.

### **Nothing:**

Nothing là một kiểu trong Kotlin đại diện cho "một giá trị không bao giờ tồn tại", điều đó có nghĩa là "chẳng có giá trị nào cả".

Nothing có thể được dùng như kiểu trả về của một hàm mà không bao giờ trả về kiểu mã thực thi, lặp lại vĩnh viễn hoặc luôn luôn bắn ra một ngoại lệ (Exception). Đừng bối rối bởi vì Java chẳng có bất kỳ thứ gì tương tự như kiểu Nothing.

-----

Vậy thì Kotlin cái này trong Kotlin để làm cảnh à ? Rõ là dở hơi. Bạn có thể sẽ nghĩ như vậy.

Nhưng hãy để tôi chỉ cho bạn 3 ví dụ để coi kiểu trả về Nothing sẽ hữu ích như thế nào nhé.

## Ví dụ về áp dụng Nothing

Trong những ví dụ dưới đây hãy giả sử có một hàm `reportError()` luôn luôn bắn ra một `RuntimeException`. Trong một ứng dụng thực tế, hàm `reportError()` có thể có một vài log cực kỳ hữu dụng trước khi bắn ra ngoại lệ hoặc bắn ra nhiều ngoại lệ khác nhau tuỳ theo từng điều kiện cụ thể.

**reportError() in Java:**

```Java:Java
void reportError() {
    throw new RuntimeException();
}
```

**reportError() in Kotlin:**

```Kotlin:Kotlin
fun reportError(): Nothing {
    throw RuntimeException()
}
```

*Lưu ý rằng Nothing được đề cập một cách rõ ràng là kiểu trả về, nếu không thì kiểu trả về vẫn sẽ là Unit.*

-----

### **1. Unreachable Code (Mã không được gọi tới)**

Điều gì sẽ xảy ra nếu chúng ta lỡ đặt một vài đoạn mã sau khi gọi phương thức `reportError()` này ?

Trong Java, chẳng có gì xảy ra cả:

```Java:Java
int i = 0;
void exampleOne() {
    reportError(); // bắn ra RuntimeException
    i = 1; // Đây là đoạn mã không được gọi tới. Nhưng nó chẳng có warning nào.
}
```

Còn trong Kotlin, sẽ có điều hay xảy ra vì chúng ta có Nothing.

```Kotlin:Kotlin
var i = 0;
fun exampleOne() {
    reportError(); // bắn ra RuntimeException
    i = 1; // Chúng ta sẽ nhận được warning 'Unreachable code' ở đây. 
}
```

Sẽ có một warning "Unreachable Code" trong Kotlin, trong khi trình biên dịch Java thì chẳng biết gì về điều này. Và như vậy Kotlin đã cứu chúng ta khỏi một bug tiềm tàng bằng cách sử dụng Nothing.

-----

### **2. Bắn vào trong một toán tử điều kiện ba ngôi**

Điều gì sẽ xảy ra nếu chúng ta gọi `reportError()` trong một toán tử điều kiện ba ngôi ?

Chúng ta sẽ nhận được một lỗi biên dịch "Incompatible types" trong Java, vì hàm `reportError` trả về kiểu void còn chúng ta thì lại đang cố gắng lưu nó thành một String.

```Java:Java
void exampleTwo(Map<String, String> map) {    
    String data = map.containsKey("key") ? map.get("key") : reportError();
    // Không biên dịch được - lỗi 'Incompatible types'.
}
```

Trong Kotlin (với việc sử dụng toán tử Elvis thì chẳng có toán tử điều kiện ba ngôi nào cả):

```Kotlin:Kotlin
fun exampleTwo(map: Map<String, String>) {
    val data: String = map["key"] ?: reportError()
    // Biên dịch ngon! Lưu ý kiểu là String.
}
```

Nó đưa ra kết quả lỗi biên dịch trong Java bởi vì trình biên dịch không thể hiểu được rằng `reportError()` sẽ không bao giờ trả về cái gì. Nhưng nó lại không phải là vấn đề đối với trình biên dịch của Kotlin vì nó có Nothing.

-----

### **3. Bắn vào trong một phương thức trả về một kiểu có nghĩa**

Điều gì sẽ xảy ra nếu chúng ta gọi hàm `reportError()` trong một phương thức mà có kiểu trả về khác với `void` hoặc `Unit` ?

Trong Java, chúng ta sẽ nhận được một lỗi "Missing return statement" (thiếu câu lệnh return).
```Java:Java
String exampleThree(int n) {
    if (n > 5) {
        return "Ok";
    }
    reportError();
    // Sẽ không biên dịch được - lỗi 'Missing return statement'. 
}
```
 
Trong Kotlin, chẳng có lỗi lầm gì hết:
```Kotlin:Kotlin
fun exampleThree(n: Int): String {
    if (n > 5) {
        return "Ok";
    }
    reportError(); // ném ra RuntimeException 
    // Biên dịch được!
}
```

## Tổng kết

Đối với tôi, một người đã từng rất bực mình không ít lần gặp phải những vấn đề kể trên trong thời gian làm việc với Java. Tôi đã nhiều lần phải đưa vào các câu lệnh trả về xàm xí như kiểu `return null` hay `return -1` chỉ để khắc phục lỗi "Missing return statement".

Vì vậy hãy nhớ sử dụng Nothing bất cứ khi nào các hàm không trả về bất cứ điều gì.

Source: https://medium.com/thoughts-overflow/kotlin-has-nothing-but-there-is-nothing-like-nothing-in-java-cab98e4f4d26