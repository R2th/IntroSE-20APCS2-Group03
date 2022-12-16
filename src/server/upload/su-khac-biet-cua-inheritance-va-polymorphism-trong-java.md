![](https://images.viblo.asia/23112ea2-d68b-4b8e-a65b-a5c3cb06bf00.jpg)
Như các bạn cũng đã biết khi bắt đầu học trong Javacore thì các sempai Internet chắc chắc sẽ giới thiệu cho các bạn về 4 tính chất của Java rồi nhỉ ?

Vì vậy bài viết này tôi sẽ không đi sâu vào giải thích tất tần tật về chúng đâu, mà nó sẽ nêu các điểm khác nhau của Kế thừa (Inheritance) và Đa hình (Polymorphism) trong JAVA

Lập trình hướng đối tượng (OOP) là một mô hình lập trình phổ biến trong phát triển phần mềm. Nó giúp mô hình hóa các kịch bản trong thế giới thực bằng cách sử dụng các đối tượng. Java là một ngôn ngữ lập trình hỗ trợ OOP. Một `class` là một kế hoạch chi tiết và nó giúp để tạo ra các đối tượng. Một lớp có `attributes` và `behaviors`. Các `attributes` được gọi là `properties` trong khi `behaviors` được gọi là các `methos`. Hai trụ cột chính của OOP là Kế thừa và Đa hình

| Kế thừa | Đa hình |
| -------- | -------- |
| Cơ chế cho phép một lớp sử dụng các thuộc tính và phương thức của một lớp đã tồn tại| Cơ chế  cho phép một đối tượng hành xử theo nhiều cách     |
| Thực hiện kế thừa xảy ra ở các cấp `class`| Thực hiện kế thừa xảy ra ở các cấp `method`   |
| Cung cấp khả năng sử dụng lại code| Cho phép gọi các phương thức phù hợp tại thời gian biên dịch và thời gian chạy   |


## Kế thừa trong Java là gì ?

Kế thừa trong Java là cơ chế cho phép một lớp sử dụng các thuộc tính và hành vi của một lớp đã tồn tại (chúng ta sẽ gọi lớp này là lớp cha và lớp mới được thừa kế là lớp con). Ưu điểm chính của nó là nó cung cấp khả năng sử dụng lại code. Cùng xem một ví dụ về tính thừa kế đơn (Single Inheritance):  

class A:
```JAVA
package inheritance;

public class A {
	public void sum() {
		int a = 10;
		int b = 20;
		System.out.println("Sum: " + (a + b));
	}
}
```
Trong Java, theo quy ước đặt tên thì bạn nên đặt tên package bắt đầu chữ in thường và tên lớp in hoa nhé. 

class B:
```JAVA
package inheritance;

public class B extends A {
	public void sub() {
		int a = 10;
		int b = 20;
		System.out.println("Sub: " + (a - b));
	}
}
```
class Main:
```JAVA
package inheritance;

public class Main {
	public static void main(String[] args) {
		B objB = new B();
		objB.sum();
		objB.sub();
	}
}
```
Kết quả: 
```
Sum: 30
Sub: -10
```
Class A có method sum() để cộng hai giá trị. Class B mở rộng từ class A và nó có một method sub() để trừ hai giá trị. Class Main có method main() là method chính để chạy chương trình. 'objB' là đối tượng của class B. Vì class B kế thừa từ class A nên đối tượng đó có thể sử dụng các properties  và methods của class A. Do đó, 'objB' có thể gọi cả methob sum() và sub(). :wink:
Đến đây chắc bạn cũng hiểu hơn về tính Kế thừa rồi nhỉ :laughing:

## Đa hình trong Java là gì ?
Đa hình có tên tiếng anh là Polymorphism
* Poly - Many
* Morphism - Forms.

Polymorphism có nghĩa là "many forms" (nhiều hình thức).

Đa hình trong Java cho phép đối tượng thể hiện các hành vi khác nhau ở các giai đoạn khác nhau trong vòng đời của nó. Chủ yếu có hai loại là `overloading` và `overriding`. Hai khái niện này có thể dễ hiểu nhưng cũng dễ quên nhé và trong phỏng vấn cũng dễ bị hỏi nhiều, nên tôi khuyên các bạn node lại :sweat_smile:

### Overloading
`overloading` cho phép các method trong cùng một lớp hoặc các lớp con có cùng tên nhưng với các tham số khác nhau. Nó cũng được gọi là 'static binding’ and ‘compile-time polymorphism’. Ví dụ cho dễ hiểu nhé:
```JAVA
package overloading;

public class Overloading {
	public int sum() {
		int a = 10;
		int b = 20;
		return a + b;
	}
	
	public int sum(int a, int b) {
		return a + b;
	}
	
	public static void main(String[] args) {
		Overloading objO = new Overloading();
		System.out.println(objO.sum());
		System.out.println(objO.sum(10, 30));
	}
}

```
Kết quả với Overloading :
```
30
40
```
Class Overloading  có hai method cùng tên là sum. Method sum thứ nhất thì không có tham số nào, tức khi gọi hàm này ta không cần phải truyền tham số vào. Method sum thứ hai thì có hai tham số, tức khi gọi hàm phải truyền vào hai tham số.

### Overriding
`overriding` cho phép cũng cấp để triển khai cho một phương thức đã tồn tại trong lớp cha của nó. Nó được gọi là  ‘late binding’, ‘dynamic binding’ và ‘runtime polymorphism'. Ví dụ như sau: 
Class Vehicle: 
```JAVA
package overriding;

public class Vehicle {
	public void display() {
		System.out.println("This is a vehicle");
	}
}
```
Class Car:
```JAVA
package overriding;

public class Car extends Vehicle{
	public void display() {
		System.out.println("This is a car");
	}
}
```
Class Main:
```JAVA
package overriding;

public class Main {
	public static void main(String[] args) {
		Car objCar = new Car();
		objCar.display();
	}
}
```
Kết quả của Overriding:
```
This is a car
```
Class Vehicle có một method display(). Class Car extends từ class Vehicle và nó cũng có method display() riêng của nó. Vehicle là lớp cha, trong khi Car là lớp con. 'objCar' là đối tượng được tạo từ Car. Khi đó gọi display(), chúng ta có thể thấy việc triển khai phương thức display() trong class Car. Mặc dù lớp cha có lớp display(), nhưng nó bị ghi đè bởi display() của lớp con, nên kết quả cuối cùng nó ra như vậy đấy.

## Điểm khác biệt của Inheritance  và Polymorphism trong Java
### Định nghĩa
Kế thừa là cơ chế cho phép một lớp mới sử dụng các thuộc tính và phương thức của lớp cha, trong khi đa hình là khả năng của một đối tượng hành xử theo nhiều cách. Vì vậy, đây là sự khác biệt chính giữa Kế thừa và Đa hình trong Java.
### Thực hiện
Hơn nữa, việc thực hiện kế thừa xảy ra ở cấp class, trong khi thực hiện đa hình xảy ra ở cấp method.
### Sử dụng
Hơn vào đó, trong khi kế thừa cung cấp khả năng sử dụng lại code, đa hình cho phép gọi các phương thức phù hợp tại thời gian biên dịch và thời gian chạy. Do đó, đây là một sự khác biệt khác giữa Kế thừa và Đa hình trong Java.
## Kết luận
Kế thừa và Đa hình là các khái niệm có liên quan với nhau, vì đa hình động áp dụng cho các lớp cũng thực hiện khái niệm kế thừa. 

Sử dụng tính Kế thừa trong Java để ghi đè phương thức (method Overriding) trong Đa hình, do đó có thể thu được tính đa hình tại runtime.

## Nguồn tham khảo
* Internet:
https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html