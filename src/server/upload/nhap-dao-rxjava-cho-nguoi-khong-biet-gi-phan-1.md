Chắc hẳn đến thời điểm hiện tại hầu hết các bạn dev Android không còn xa lạ gì với khái niệm Reactive Programming/RxJava. Tuy nhiên, đối với người mới bắt đầu mà không có kiến thức về functional programming, thì việc áp dụng cú pháp của RxJava có vẻ sẽ khá là khó khăn. Trong Scala, các bạn có thể tìm thấy rất nhiều operator tương tự như trong RxJava như map (), Flatmap (), filter (), v.v... Nếu các bạn đã học Scala hoặc bất kỳ ngôn ngữ functional nào khác (mà RxJava mượn ý tưởng và cú pháp từ), thi các bạn có thể có một số lợi thế so với những người chưa học bao giờ. Trong loạt bài này, trước khi nói về RxJava, mình sẽ vẽ "vài đường cơ bản" về funtional programming để phục vụ cho các bạn chưa biết gì. Một điều khá may là trong Java 8, chúng ta có một thứ gọi là "Stream API". Class "Stream" rất giống với "Observable" trong RxJava, vì vậy mình sẽ nhặt ra một số thứ từ Stream API của Java 8 để giải thích cho các bạn về RxJava.

Ok mở bài thế thôi :grinning:, đầu tiên mình sẽ nói về lợi ích của functional programming. Có 2 lợi ích chính như sau:
1. Function có thể được sử dụng như một param cho các function khác. Đây là kiểu function mà người ta gọi là “first-class object”
2. Functional programming xử lý các operations như các "hàm" trong toán học, tức chỉ quan tâm đến kết quả hoặc đầu ra từ hàm cuối cùng để tránh việc phải quan tâm đến việc thay đổi của state hay mutable object.

> It treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data- Wikipedia

Stream API trong RxJava/Java 8 hỗ trợ các biểu thức lambda, cung cấp cho ta lợi ích đầu tiên. Ví dụ như sau:

```

	interface NewAction{
		void call();
	}

	public static void execute(NewAction action){
		action.call();
	}
	public static void main(String[] args) {
		
		execute( new NewAction() {
			
			@Override
			public void call() {
				// TODO Auto-generated method stub
				System.out.println("action start");
			}
		} );
		
		
		execute(()->System.out.println("action start"));
	}
```

Chúng ta hãy xem sự khác biệt giữa dòng 11 và dòng 21, cả hai đều in ra String là  “action start”, nhưng cái thứ hai thì ngắn hơn rất nhiều, không cần tạo instance của interface “NewAction” và override method "call" nữa, mà chỉ cần code phần thân của method và truyền nó vào execute(). Đây không phải là thứ ma thuật hắc ám gì cả. Trong Java 8, các bạn có thể sử dụng biểu thức lambda này nếu interface các bạn muốn tạo instance chỉ chứa một method, sau đó các bạn có thể đặt phần thân method vào bất cứ đâu mà không cần phải tạo instance cho interface.
Tuy nhiên, nhìn vào ví dụ thì ai chưa biết sẽ nghĩ function print() đang được truyền vào làm tham số, nhưng thực ra không phải thế, mà chỉ là compiler đang giúp chúng ta đỡ phải viết nhiều code mà thôi.

Ok, chúng ta hãy xem ví dụ dưới đây, minh họa cho lợi ích thứ 2.
```
public static void main(String[] args) {
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		arrayList.stream()
		         .map(integer -> integer + 1)
		         .filter(integer -> integer < 10)
		         .limit(10);
	}
```
Trong ví dụ trên, chúng ta chuyển đổi arraylist thành một stream (khái niệm stream này không phải là InputStream hoặc OutputSteam của Java) và sửa đổi stream bằng cách áp dụng các operator khác nhau. Trước tiên, chúng ta map tất cả các element trong stream (stream này là stream của các object thuộc kiểu Integer) bằng cách thêm 1, sau đó lọc ra các Integer nhỏ hơn 10, rồi cuối cùng chúng tôi lấy ra 10 phần tử đầu tiên từ stream. Lưu ý rằng mỗi khi chúng ta áp dụng một operator, chúng ta sẽ tạo ra một stream mới và đó là lý do tại sao chúng ta có thể "nối đuôi" các stream như vậy.
Nhưng mà khoan, cấu trúc gì kì quặc thế? Code thế thì sẽ có lợi ích gì?

![](https://images.viblo.asia/8ca0adbb-a5e9-4642-87f1-3a1c1d51842e.png)

Như mình đã đề cập rằng trong ngôn ngữ functional, chúng ta hướng đến việc không có “states” và chỉ tập trung vào kết quả của function.
Ví dụ, chúng ta có một dây chuyền thực thi function như sau:
funcA () -> funB () -> funcC ();
Trong trường hợp này, funC() chỉ xử lý kết quả từ funcB() và nó sẽ không sử dụng kết quả từ funcA(). Đây là kịch bản lý tưởng nhất cho functional programming. Hẳn là các bạn đang thốt lên "Oắt dờ hợi?" đúng không? Nhưng từ từ, các bạn thử nghĩ xem, là các bạn đã từng gặp code kiểu này chưa?
```

private boolean flag;

	void A(){
		flag = true;
		//do something
		B();
	}
	void B(){
		C();
	}
	void C(){
		if(flag){
			//do something
		}
	}
	
```
Trong ví dụ này, chúng ta sử dụng một biến global để kiểm soát việc thực thi C(), nhưng biến đó là mutable và nó đã được thay đổi trong A()!!! Vì vậy, mặc dầu chuỗi các hàm là A() -> B() -> C(), C() không hoàn toàn dựa vào B() và điều đó trái với quy tắc của functional programming.
Có lẽ chúng ta có thể thay đổi một tí.
```
void A(){
		boolean flag = true;
		//do something
		B(flag);
	}
	void B(boolean flag){
		C(flag);
	}
	void C(boolean flag){
		if(flag){
			//do something
		}
	}
```
Ngon hơn nhiều rồi đúng không? Giờ B() và C() không dựa vào bất kỳ biến global nào nữa, mà việc thực thi B() và C() giờ đây hoàn toàn được quyết định bởi các tham số riêng của nó.
Tiến thêm bước nữa, chúng ta có thể làm cho nó giống RxJava hơn:
```
public static void main(String[] args) {
		new Exe(true)
		.A()
		.B()
		.C();
	}
	
	static class Exe {
		boolean flag;
		public Exe(boolean flag){
			this.flag = flag;
			//do something
		}
		Exe A(){
			boolean flag = true;
			//do something
			return new Exe(flag);
		}
		Exe B(){
			return new Exe(flag);
		}
		Exe C(){
			if(flag){
				//do something
			}
			return new Exe(flag);
		}
	}
```
Đoạn code trên cho thấy cách chúng ta có thể làm cho đoạn code ban đầu "functional" hơn.
Nhưng câu hỏi là, chúng ta vẫn có một flag boolean trong class Exe! Đó không phải là trái với quy tắc của functional programming hay sao?
Thực ra thì điều đó không hoàn toàn là đúng, vì mặc dù chúng ta luôn luôn phải nhớ là chúng ta không muốn biến mutable kiểm soát việc thực thi chuỗi method, nhưng điều đó không có nghĩa là chúng ta không được dùng các biến global. Trong đoạn mã trên, mỗi khi chúng ta gọi A(), B() hoặc C(), chúng ta sẽ trả về một instance mới của lớp Exe, chứ không phải thực hiện tất cả các thay đổi trên một instance. Tức là chỉ có instance cuối cùng của Exe sẽ kiểm soát việc thực hiện các method call hiện tại.
Ok, hãy xem lại API Stream của Java 8. Ta có thể thấy các operator như map(), filter(), limit() sẽ tạo ra một "Stream" mới và chuyển đến operator call tiếp theo. Ta luôn có thể sửa đổi stream được tạo bởi operator cuối cùng.
```

public static void main(String[] args) {
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		arrayList.stream()
		         .map(integer -> integer + 1)
             //at this point, stream has already been modified by adding 1 to each element
		         .filter(integer -> integer < 10)
             //at this point, stream has already been modified by filtering out those numbers less than 10
		         .limit(10);
	}
```
Mình xin kết thúc phần 1 tại đây. Phần sau mình sẽ giới thiệu về một số operators và API trong RxJava :grinning:

-------------------------------------------
Nguồn: https://medium.com/@qingzhong/rxjava-for-100-beginners-part-1-1ab9081f2a34