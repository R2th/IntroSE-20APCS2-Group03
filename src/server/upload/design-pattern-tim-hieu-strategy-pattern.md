## 0. Các design pattern trong Java
Một design pattern là giải pháp được chứng minh là tốt để giải quyết một vấn đề hay nhiệm vụ cụ thể.

### Chúng ta hãy xem xét bằng cách lấy một ví dụ như sau:
### *Vấn đề được đưa ra:*
Giả sử bạn muốn tạo một class mà chỉ một instance duy nhất được tạo và tất cả các class khác chỉ có thể sử dụng duy nhất instance đó :-?.


### *Giải pháp:*
Design pattern Singleton là giải pháp tốt nhất cho vấn đề cụ thể ở trên. Vì vậy, mỗi design pattern có một số đặc điểm kỹ thuật hoặc bộ quy tắc để giải quyết các vấn đề.


> Nhưng hãy nhớ một điều, các Design pattern là các chiến lược độc lập về ngôn ngữ lập trình để giải quyết các vấn đề thiết kế hướng đối tượng phổ biến. Điều đó có nghĩa là, một mẫu thiết kế đại diện cho một ý tưởng, không phải là một triển khai cụ thể.
> Bằng cách sử dụng các Design pattern, bạn có thể làm cho code của mình linh hoạt hơn, có thể tái sử dụng và bảo trì. Đây là phần quan trọng nhất vì java bên trong tuân theo các Design pattern. Để trở thành một dev ngon, bạn phải biết ít nhất một số Design pattern phổ biến :D.


### Ưu điểm của design pattern:
* Chúng có thể tái sử dụng trong nhiều dự án.
* Cung cấp các giải pháp giúp xác định kiến trúc hệ thống.
* Cung cấp sự minh bạch cho việc thiết kế một ứng dụng.
* Chúng là những giải pháp đã được chứng minh vì chúng được xây dựng dựa trên kiến thức và kinh nghiệm của các chuyên gia phát triển phần mềm.
* Các design pattern không đảm bảo một giải pháp tuyệt đối cho một vấn đề. Chúng cung cấp sự rõ ràng cho kiến trúc hệ thống và khả năng xây dựng một hệ thống tốt hơn.

### Liệt kê các Design Pattern phổ biến
1. Creational Design Pattern:
Factory Pattern, Abstract Factory Pattern, Singleton Pattern, Prototype Pattern, Builder Pattern.
2. Structural Design Pattern:
Adapter Pattern, Bridge Pattern, Composite Pattern, Decorator Pattern, Facade Pattern, Flyweight Pattern, Proxy Pattern
3. Behavioral Design Pattern:
Chain Of Responsibility Pattern, Command Pattern, Interpreter Pattern, Iterator Pattern, Mediator Pattern, Memento Pattern, Observer Pattern, State Pattern, Strategy Pattern, Template Pattern, Visitor Pattern

## 1. Strategy Pattern là gì?
Strategy Pattern là một behavior design pattern. Strategy Pattern được phát biểu như sau: "Xác định một họ chức năng, gói gọn từng chức năng và làm cho chúng có thể thay thế cho nhau". Khi áp dụng Strategy Pattern thì các hành vi hoặc giải thuật của một class có thể thay đổi ở runtime.

### Lợi ích của Strategy Pattern:
* Nó cung cấp một sự thay thế cho các class con.
* Nó định nghĩa mỗi hành vi trong lớp riêng, loại bỏ sự cần thiết cho các câu lệnh có điều kiện.
* Nó giúp dễ dàng mở rộng và kết hợp hành vi mới mà không thay đổi ứng dụng.

### Sử dụng:
* Khi nhiều lớp chỉ khác nhau về hành vi.
* Khi bạn cần các biến thể khác nhau của thuật toán.

## 2.  UML cho Strategy Pattern:
![Hình minh họa sơ đồ UML cho Strategy Pattern](https://images.viblo.asia/24c69ea5-7ee0-44bf-a502-bc50908252ad.jpg)

## 3. Thực hiện
Chúng ta sẽ tạo một interface có tên là Strategy, interface này định nghĩa 1 method doOperation(). Tiếp theo sẽ tạo các class implements interface Strategy, và cuối cùng là tạo Context class sẽ sử dụng Strategy.

StrategyPatternDemo class sẽ sử dụng Context và Strategy để thể hiện việc thay đổi hành vi khi áp dụng Strategy Pattern

### Bước 1: Tạo interface Strategy.java

```
package com.vuta.dpattern.test;

public interface Strategy {
	public int doOperation(int num1, int num2);
}

```

### Bước 2: Tạo các class cụ thể hóa interface Strategy

```
package com.vuta.dpattern.test;

public class OperationAdd implements Strategy {
	@Override
	public int doOperation(int num1, int num2) {
		return num1 + num2;
	}
}
```

```
package com.vuta.dpattern.test;

public class OperationSubstract implements Strategy {
	@Override
	public int doOperation(int num1, int num2) {
		return num1 - num2;
	}
}
```

```
package com.vuta.dpattern.test;

public class OperationMultiply implements Strategy {
	@Override
	public int doOperation(int num1, int num2) {
		return num1 * num2;
	}
}
```

### Bước 3: Tạo các Context class

```
package com.vuta.dpattern.test;

public class Context {
	private Strategy strategy;

	public Context(Strategy strategy) {
		this.strategy = strategy;
	}

	public int executeStrategy(int num1, int num2) {
		return strategy.doOperation(num1, num2);
	}
}
```

### Bước 4: Tạo các StrategyPatternDemo class

```
package com.vuta.dpattern.test;

public class StrategyPatternDemo {
	public static void main(String[] args) {
		Context context = new Context(new OperationAdd());
		System.out.println("10 + 5 = " + context.executeStrategy(10, 5));

		context = new Context(new OperationSubstract());
		System.out.println("10 - 5 = " + context.executeStrategy(10, 5));

		context = new Context(new OperationMultiply());
		System.out.println("10 * 5 = " + context.executeStrategy(10, 5));
	}
}
```

> Output
> 
> 10 + 5 = 15
> 
> 10 - 5 = 5
> 
> 10 * 5 = 50