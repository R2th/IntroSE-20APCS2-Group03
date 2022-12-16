Trước khi Lambda Expressions được thêm vào bởi JDK 8, Mình đã từng gặp các ví dụ về chúng trong các ngôn ngữ như C #, C ++ và Ruby.

Do đó khi tính năng này được thêm vào Java, mình bắt đầu thấy thú vị và muốn tìm hiểu kỹ hơn về chúng. Có thể nói sự bổ sung của phần tử cú pháp như Lambda Expressions giúp làm tăng thêm khả năng diễn đạt của ngôn ngữ lập trình Java. Trong bài viết này, mình muốn tập trung vào các khái niệm nền tảng mà bạn cần làm quen để bạn có thể bắt đầu thêm các Lambda Expressions vào code của mình ngay và lun. :smile:
## **Lambda Expressions**

Các Lambda Expressions tận dụng khả năng xử lý song song của các môi trường đa lõi. (thường được thấy cùng với sự hỗ trợ của các pipeline operations trên dữ liệu trong API Stream)

Chúng là các phương thức ẩn danh (các phương thức giang hồ vô danh không tên :joy:) dùng để thực hiện một phương thức được định nghĩa bởi *FunctionalInterface* trong Java. Điều quan trọng là mình cần phải biết *FunctionalInterface* là gì trước khi bắt đầu tìm hiểu kĩ về Lambda Expressions.
## **FunctionalInterface**

*FunctionalInterface* hay vietsub ra là *Giao diện chức năng* là một **interface** chứa một và chỉ một phương thức trừu tượng. (mới nghe là đã thấy hơi trừu tượng rồi đó :joy:)

Nếu bạn xem định nghĩa của *Runnable interface* của Java, bạn sẽ nhận thấy cách nó kiểu gì cũng  rơi vào trường hợp như định nghĩa của *Giao diện chức năng* vì nó chỉ định nghĩa một phương thức: **run ()**.

Trong code mẫu dươi đây, phương thức computeName hoàn toàn trừu tượng và là phương thức duy nhất được định nghĩa, biến MyName thành một *Giao diện chức năng*.

```
interface MyName{
    String computeName(String str);
}
```
## Toán tử mũi tên
Lambda Expressions cũng cung cấp một toán tử mới đó là toán tử mũi tên  (->) vào Java. Nó chia các Lambda Expressions thành hai phần:

> (n)  ->  n*n

Phía bên trái chỉ định các tham số theo yêu cầu của biểu thức, cũng có thể để trống nếu không có tham số nào được yêu cầu.

Phía bên phải là phần thân của lambda chỉ định các hành động của Lambda Expressions. Trong tiếng Việt thì mình có thể coi cái này giống như là "trở thành" cho dễ hiểu :stuck_out_tongue:. Ví dụ như "n trở thành n * n", hoặc "n trở thành n bình phương".

Với khái niệm tổng quát về *Giao diện chức năng* và toán tử mũi tên, bạn có thể kết hợp được thành một Lambda Expression đơn giản:

```
interface NumericTest {
	boolean computeTest(int n); 
}

public static void main(String args[]) {
	NumericTest isEven = (n) -> (n % 2) == 0;
	NumericTest isNegative = (n) -> (n < 0);

	// Output: false
	System.out.println(isEven.computeTest(5));

	// Output: true
	System.out.println(isNegative.computeTest(-5));
}
```

```
interface MyGreeting {
	String processName(String str);
}

public static void main(String args[]) {
	MyGreeting morningGreeting = (str) -> "Chao buoi sang " + str + "!";
	MyGreeting eveningGreeting = (str) -> "Chao buoi toi " + str + "!";
  
  	// Output: Chao buoi sang Dat! 
	System.out.println(morningGreeting.processName("Dat"));
	
	// Output: Chao buoi toi Minh!
	System.out.println(eveningGreeting.processName("Minh"));	
}
```

Các biến **morningGreet** và **eveningGreet** ở dòng 6 và 7 trong code ở trên tạo tham chiếu đến interface MyGreet và xác định các biểu thức chào khác nhau.

Khi viết Lambda Expressions, cũng có thể chỉ định rõ ràng loại tham số trong biểu thức như thế này:

```
MyGreeting morningGreeting = (String str) -> "Chao buoi sang " + str + "!";
MyGreeting eveningGreeting = (String str) -> "Chao buoi toi " + str + "!";
```
## Khối Lambda Expressions
Cho tới hiện tại thì mình chỉ nói về các ví dụ của các biểu thức lambdas đơn lẻ. Có một loại expression khác được sử dụng khi mà code ở phía bên phải của toán tử mũi tên chứa nhiều hơn một câu lệnh và nó được gọi là **khối lambdas**:

```
interface MyString {
	String myStringFunction(String str);
}

public static void main (String args[]) {
	// Khối Lambda dùng để đảo ngược chuỗi
	MyString reverseStr = (str) -> {
		String result = "";
		
		for(int i = str.length()-1; i >= 0; i--)
			result += str.charAt(i);
		
		return result;
	};

	// Output: gg51 ousaY
	System.out.println(reverseStr.myStringFunction("Yasuo 15gg")); 
}
```

## FunctionalInterface chung
Một Lambda Expression không thể chung chung. Nhưng *Giao diện chức năng* liên quan đến một Lambda Expression thì có thể. Có thể viết một giao diện chung và xử lý các kiểu trả về khác nhau như thế này:

```
interface MyGeneric<T> {
	T compute(T t);
}

public static void main(String args[]){

	// Phiên bản dành cho kiểu String của interface MyGereric
	MyGeneric<String> reverse = (str) -> {
		String result = "";
		
		for(int i = str.length()-1; i >= 0; i--)
			result += str.charAt(i);
		
		return result;
	};

	// Phiên bản dành cho kiểu Integer của interface MyGereric
	MyGeneric<Integer> factorial = (Integer n) -> {
		int result = 1;
		
		for(int i=1; i <= n; i++)
			result = i * result;
		
		return result;
	};

	// Output: !!iiigasaH
	System.out.println(reverse.compute("Hasagiii!!")); 

	// Output: 120
	System.out.println(factorial.compute(5)); 

}
```
## Lambda Expressions là đối số
Một cách sử dụng phổ biến của lambdas là duyệt thông qua chúng như là các đối số.

Chúng có thể được sử dụng trong bất kỳ đoạn code nào cung cấp kiểu giá trị trả về cụ thể. Cá nhân mình thấy tính năng này khá tiện vì nó có thể cho phép mình chuyển các đoạn mã thực thi làm đối số cho các phương thức.

Để truyền Lambda Expressions làm tham số, chỉ cần đảm bảo mình dùng đúng loại FunctionalInterface tương thích với tham số được yêu cầu.

```
interface MyString {
	String myStringFunction(String str);
}

public static String reverseStr(MyString reverse, String str){
  return reverse.myStringFunction(str);
}

public static void main (String args[]) {
	// Khối Lambda dùng để đảo ngược chuỗi
	MyString reverse = (str) -> {
		String result = "";
		
		for(int i = str.length()-1; i >= 0; i--)
			result += str.charAt(i);
		
		return result;
	};

	// Output: gg51 ousaY
	System.out.println(reverseStr(reverse, "Yasuo 15gg")); 
}
```

Những khái niệm này sẽ cung cấp cho bạn một nền tảng tốt để bắt đầu làm việc với các Lambda Expressions. Hi vọng sau bài viết này, các bạn đã hiểu hơn về Lambda Expressions cũng như thử mày mò test ngay cho nóng vào đống code của mình. :relaxed::relaxed: