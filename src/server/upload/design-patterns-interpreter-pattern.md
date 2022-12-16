Interpreter thông dịch viên - là pattern giúp tạo ra một phương thức để định tính một ngôn ngữ hoặc một biểu thức.
Interpreter được xếp vào nhóm các pattern Hành Vi.

Interpreter triển khai một giao diện biểu thức để thực hiện định tính các yêu cầu nhận được trong bối cảnh cụ thể.
Pattern này thường được sử dụng để phân tích các cú pháp SQL, hoặc dùng trong các thuật toán xử lý các ký hiệu v.v...

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/5573b749-6946-44df-b1cd-30ac75e9f3de.png)

Ở đây chúng ta có một phần mềm giúp truy vấn và xác thực thông tin liên quan tới người dùng.
Phần mềm này sẽ đưa ra kết luận đúng hoặc sai khi nhận được tên người dùng và câu hỏi được chọn để hỏi.

Một `abstract` có tên là `Expression` được tạo ra để đại diện cho các `interpreter` 
hay các object đại diện cho câu hỏi và sẽ nhận vào tham số để kiểm định và trả lại kết quả 
`true` hoặc `false`.

Class triển khai `Terminal` đại diện cho một `Expression` đơn nguyên giữ các nút dữ liệu để đưa ra nhận định
`true` hoặc `false` cho tham số được truyền vào. Bên cạnh đó là 2 class `And` và `Or` được sử dụng để
tạo ra các biểu thức `Expression` kết hợp - tức là kết hợp nhiều nút dữ liệu trở thành một `interpreter` tổng
thay vì mang mỗi tham số đi hỏi từng `interpreter` một rồi mới gom kết quả trả lời cho client.

Cách thức hoạt động của chương trình như chúng ta thấy rất đơn giản. Đầu tiên dữ liệu được tải từ `database`
lên rồi được chuyển thành các `Expression` đơn nguyên là các `Terminal`, rồi được ghép thành các `Expression` 
phức hợp hay các `interpreter` nhận tham số trực tiếp để trả lời câu hỏi. Sau đó thì với mỗi tham số được
truyền vào, các `interpreter` phức sẽ cho câu trả lời cuối cùng là `true` hoặc `false`.

### Bước 1

Tạo `abstract Expression`.

`interpreterpattern/Expression.java`
```java
package interpreterpattern;

public abstract class Expression {
   public abstract boolean interpret(String context);
}
```

### Bước 2

Tạo class triển khai `Terminal` và 2 class tổng hợp `And` và `Or`.

`interpreterpattern/Terminal.java`
```java
package interpreterpattern;

public class Terminal
extends Expression {
   private String data;

   public Terminal(String data) {
      this.data = data;
   }

   @Override
   public boolean interpret(String context) {
      return context.contains(data);
   }
}
```

`interpreterpatter/And.java`
```java
package interpreterpattern;

public class And
extends Expression {
   private Expression expr1 = null;
   private Expression expr2 = null;

   public And(
      Expression expr1,
      Expression expr2
   ) {
      this.expr1 = expr1;
      this.expr2 = expr2;
   }

   @Override
   public boolean interpret(String context) {
      return expr1.interpret(context) && expr2.interpret(context);
   }
}
```

`interpreterpattern/Or.java`
```java
package interpreterpattern;

public class Or
extends Expression {
   private Expression expr1 = null;
   private Expression expr2 = null;

   public Or(
      Expression expr1,
      Expression expr2
   ) {
      this.expr1 = expr1;
      this.expr2 = expr2;
   }

   @Override
   public boolean interpret(String context) {
      return expr1.interpret(context) || expr2.interpret(context);
   }
}
```

### Bước 3

Sử dụng các `class Expression` để tạo ra các biểu thức dữ liệu và truyền vào một vài tham số hỏi để
kiểm tra hoạt động.

`PatternDemo.java`
```java
import interpreterpattern.And;
import interpreterpattern.Expression;
import interpreterpattern.Or;
import interpreterpattern.Terminal;

public class PatternDemo {
   public static void main(String[] args) {
      Expression isMale = getMale();
      Expression isMarriedWoman = getMarriedWoman();

      System.out.println("John is male? " + isMale.interpret("John"));
      System.out.println("Julie is married? " + isMarriedWoman.interpret("Julie"));
   }

   public static Expression getMale() {
      Expression robert = new Terminal("Robert");
      Expression john = new Terminal("John");
      return new Or(robert, john);
   }

   public static Expression getMarriedWoman() {
      Expression julie = new Terminal("Julie");
      Expression marry = new Terminal("Marry");
      return new And(julie, marry);
   }
}
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```
John is male? true
Julie is married? false
```