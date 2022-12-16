Bài viết này nói về lớp Proxy `(java.lang.reflect.Proxy)` trong ngôn ngữ lập trình Java. 
* Thuật ngữ Proxy ở đây không phải là thuật ngữ Proxy thường dùng trong mạng máy tính, mà là lớp `java.lang.reflect.Proxy` được cài đặt sẵn trong bộ thư viện chuẩn của ngôn ngữ lập trình Java. 
* Bài viết dựa trên cách hiểu của mình, nên nếu có điểm nào sai, hãy comment để mình biết và sửa chữa :)

## 1. Sơ lược về lớp Proxy
* Lớp Proxy trong Java có chức năng chính gần tương tự như Proxy Design Pattern, là điều khiển việc thực hiện method của một Object khác bằng cách tạo ra một Object đại diện cho Object ban đầu - Gọi là Proxy.
* Lớp Proxy cung cấp các phương thức tĩnh để tạo ra các lớp proxy động (dynamic proxy class) và thực thể của nó, nó cũng là lớp cha của tất cả các Lớp Proxy động tạo ra bởi các phương thức nay.
* Đến đây chúng ta có một số thuật ngữ cần hiểu:
    * Dynamic proxy class - lớp proxy động, hay gọi đơn giản là proxy class: là một lớp implement nhiều Interface khác nhau, tuy nhiên khác với bình thường, đó là các việc class này được tạo ra ở thời điểm runtime của chương trình.
    * Proxy interface: là các Interface được implement bởi một proxy class.
    * Proxy instance là một thực thể của proxy class.

* Ví dụ một phương thức thường dùng của lớp `Proxy` để tạo thực thể cho một lớp proxy động: 
```java
static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)
```
* Method này bao gồm 3 tham số, theo thứ tự như sau:
    * Một `ClassLoader`. Các kiến thức về class loader nằm ngoài phạm vi của bài viết này. Ở đây chúng ta sử dụng `null` để sử dụng class loader mặc định.
    * Một mảng các đối tượng `Class`, mỗi một đối tượng là một Interface cần implement (lưu ý trong Java có một class tên là `Class`).
    * Một Invocation Handler. Đây là gì? Nhớ lại mục đích chính của Proxy là điều khiển việc thực thi của một Object ban đầu khác, bằng cách tạo một lớp bọc (Wrap) bên ngoài lớp gốc. Tham số này chính là thực thể của lớp gốc đó sau khi đã implement interface `InvocationHandler`.

* Để dễ hiểu hơn chúng ta xét ví dụ cụ thể sau: 
```java
Object proxy = Proxy.newProxyInstance(null, new Class[] { Comparable.class }, handler);
```

* Hãy hiểu đoạn lệnh `Proxy.newProxyInstance(...)` thực hiện công việc như sau, lớp Proxy cung cấp phương thức tĩnh `newProxyInstance` để tạo ra một lớp proxy động `$Proxy0` nào đó ở giai đoạn runtime, sau đó lớp `$Proxy0` này tạo một thực thể của nó, gán vào biến `proxy`. Để ý vế trái phép gán, ta có thể thấy biến này có kiểu Object. Vì sao lớp `$Proxy0` trên lại tạo ra một instance có kiểu là Object? Lớp này được tạo ra ở giai đoạn runtime, ở giai đoạn lập trình, hay compile, nó chưa được tạo ra, nên bạn sẽ không thể biết được lớp này cụ thể là lớp tên gì, hay lớp nào cả, vậy nên đơn giản nhất, dùng một biến kiểu Object để tham chiếu tới thực thể vừa tạo ra này. Lớp `$Proxy0` này, sẽ implement các interface trong mảng `new Class[] {...}`.
    * Nếu không muốn nhận trực tiếp thực thể tạo ra từ phương thức `newProxyInstance`, lớp `Proxy` còn có phương thức `getProxyClass` sẽ trả về đối tượng `Class` được tạo ra!.
        ```java
        static Class<?> getProxyClass(ClassLoader loader, Class<?>... interfaces)
        ```

* Thực thể `proxy`  được tạo ra bao gồm:
    * Tất cả các method trong các Interface mà lớp gốc sẽ implement (các method của các phần tử trong mảng kiểu `Class` - tham số thứ 2 của method `newProxyInstance`, trong ví dụ trên là lớp `Comparable`, nên sẽ bao gồm method `compareTo()`).
    * Tất cả các method được định nghĩa trong lớp Object `(toString(), equals(),...)`.

* Còn tham số `handler`? Như đã nêu ở trên, tham số này chính là lớp gốc sau khi đã implement interface `InvocationHandler`. Lớp này thường được định nghĩa dạng như sau:

    ```java
    class FoobarHandler implements InvocationHandler {
        private Object target;

        public FoobarHandler(Object t) {
            target = t;
        }

        @Override
        public Object invoke(Object proxy, Method m, Object[] args) throws Throwable {
            // do something here
            //...
            //...

            //invoke actual method
            return m.invoke(target, args);
        }
    }
    ```
* Khi có bất kì phương thức nào gọi trên đối tượng `proxy`, phương thức đó sẽ không được thực thi ngay lập tức, mà hàm `public Object invoke` sẽ được thực thi. 
    * Phương thức gốc được gọi ban đầu sẽ được "đóng gói" lại, truyền vào phương thức `public Object invoke` của `handler` dưới dạng tham số `Method m`.
    * Tham số của phương thức ban đầu cũng sẽ được "đóng gói" và truyền vào dưới dạng tham số thứ 3 `Object[] args`
    * Tham số đầu tiên `Object proxy` là proxy của `handler` này.
* Phương thức gốc sẽ được thực thi bằng lệnh `m.invoke(target, args)`. Lưu ý phân biệt tên method `invoke` của interface `InvocationHandler` và method `m.invoke` của đối tượng `Method m`. 

## 2. Thử tạo một đối tượng Proxy
Đặt ra một bài toán đơn giản như sau: <br>
* Bạn Dẫu cần viết một chương trình thực hiện việc tìm kiếm nhị phân. Vì đi đâu cũng nhanh như gió lốc, nên Dẫu quyết định sử dụng phương thức `Arrays.binarySearch` có sẵn để thực hiện cho nhanh. Tuy nhiên thầy giáo lại bắt Dẫu phải nêu ra phương thức này chạy cụ thể như thế nào, bằng việc in ra màn hình trực tiếp từng bước chạy của chương trình. Nếu tự viết hàm tìm kiếm thì Dẫu có thể `System.out.println()` để in ra các bước chạy, tuy nhiên Dẫu lại không biết tự viết nên đành phải dùng phương thức có sẵn, nhưng dùng phương thức có sẵn thì làm thế nào để in ra được từng bước chạy?? :'(  May mắn là Dẫu biết cách dùng Proxy, nên Dẫu viết chương trình như sau:

Lớp DebugHandler là lớp implement interface InvocationHandler:
```java
class DebugHandler implements InvocationHandler {
	// original Object
    private Object target;

	public DebugHandler(Object t) {
		target = t;
	}
    
	@Override
	public Object invoke(Object proxy, Method m, Object[] args) throws Throwable {
		// print implicit argument
		System.out.print(target);
		
		// print method name
		System.out.print("." + m.getName() + "(");
		
		// print explicit arguments
		if(args != null) {
			for(int i=0; i<args.length; i++) {
				System.out.print(args[i]);
				if(i<args.length - 1) System.out.println(", ");
			}
		}
		System.out.println(")");
		
		//invoke actual method
		return m.invoke(target, args);
	}
}
```
Lớp ProxyTest chứa hàm main thực thi chương trình chính:

```java
public class ProxyTest {
	public static void main(String[] args) {
		Object[] elements = new Object[1000];
       
       // wrap 1000 Integers from 1 to 1000 by 1000 proxies and assign them to the Object array named "elements"
		for(int i=0; i<elements.length; i++) {
			Integer value = i+1;
            
            // wrap
			InvocationHandler handler = new DebugHandler(value);
			
            // create proxy for the wrapped handler
            Object proxy = Proxy.newProxyInstance(null, new Class[] { Comparable.class }, handler);
            elements[i] = proxy;
		}
		
		// construct a random Integer to be found by Binary Search 
		Integer key = new Random().nextInt(elements.length) + 1;
		System.out.println("Key: " + key);
		
		// search for the key
		int result = Arrays.binarySearch(elements, key);
	
		// print match if found
		if(result >= 0) System.out.println(elements[result].toString());
		
	}
}
```
Kết quả chạy chương trình: (chương trình có thể tạo kết quả khác tùy vào giá trị Key được khởi tạo ngẫu nhiên)
```
Key: 140
500.compareTo(140)
250.compareTo(140)
125.compareTo(140)
187.compareTo(140)
156.compareTo(140)
140.compareTo(140)
140.toString()
140
```

Giải thích:
* Ở lớp `DebugHandler`:
    * Đối tượng kiểu Object `target`: Khi chương trình chính gọi `InvocationHandler handler = new DebugHandler(value);` để tạo handler cho các proxy, thì các số nguyên Integer sẽ được gán vào cho Object `target` này.
    * Constructor `DebugHandler`: dễ hiểu, nó thực  hiện việc gán đối tượng ban đầu vào biến `target` khi khởi tạo proxy.
    * Phương thức `invoke`: là phương thức Override lại của Interface `InvocationHandler`. Khi có bất kì lời gọi phương thức nào xảy ra trên đối tượng proxy (ví dụ khi đối tượng proxy `elements[0]` được gọi `elements[0].compareTo()`), phương thức đó sẽ bị "đóng gói lại" truyền vào phương thức `invoke` của interface `InvocationHandler` dưới dạng tham số thứ 2 `Method m`, các tham số cho phương thức ban đầu (nếu có) cũng sẽ được "đóng gói", truyền vào dưới dạng tham số thứ 3 `Object[] args` sau đó thực thi hàm `invoke` này, cuối hàm `invoke` sẽ thực hiện lời gọi phương thức ban đầu `m.invoke(target, args)`. 
* Chương trình main trong lớp `ProxyTest` tạo 1000 thực thể proxy kiểu `Object`, 1000 proxy này wrap - đại diện cho 1000 đối tượng Integer có giá trị từ 1 đến 1000. Các thực thể proxy này được gán vào mảng `Object[] elements`.
* Khởi tạo giá trị `key` là một số ngẫu nhiên cần tìm kiếm trong khoảng 1 đến 1000.
* Gọi phương thức `Arrays.binarySearch(elements, key)` thực hiện tìm kiếm phần tử thuộc mảng `elements` "bằng" với `key`.
    * Chúng ta đều biết, tìm kiếm nhị phân phải thực hiện phép so sánh, và trong phương thức `Arrays.binarySearch`, phép so sánh thực hiện bằng cách gọi hàm `compareTo()` có dạng như thế này:
        ```java
        if (elements[i].compareTo(key) < 0) . . .
        ```
    * Lời gọi compareTo lên các phần tử proxy trong mảng elements, sẽ được "đóng gói" lại và truyền đến phương thức `invoke` của lớp `DebugHandler` dưới dạng tham số như đã viết ở trên. Tuy nhiên để ý 1 điều, lớp Object của Java không có phương thức `compareTo()`, vậy làm sao đối tượng proxy ban đầu biết `compareTo()` là gì để nó đóng gói? Câu trả lời nằm ở tham số thứ 2 của `newProxyInstance` ở chương trình main. Nó đã được implements lại interface `Comparable` trong thời điểm runtime của chương trình.  Phương thức `invoke` thực thi theo nội dung trong code, in ra đối tượng `target` ở đây là giá trị sẽ được so sánh với `key`, tên phương thức `Method m`, tham số `key` và cho ra kết quả: `500.compareTo(140)`,... 
    * Dòng cuối cùng trong kết quả `140.toString()` là từ câu lệnh cuối cùng:
        ```java
        if(result >= 0) System.out.println(elements[result].toString());
        ```
        Tương tự như trên, phương thức `toString()` được gọi lên phần tử proxy tìm thấy trong mảng sau khi chạy tìm kiếm nhị phân, nó gọi lại phương thức `invoke` của lớp `DebugHandler` và in ra nội dung gọi hàm. 
    * Dòng kết quả cuối cùng `140` là kết quả trả về sau khi thực hiện `invoke()`, hay nói cách khác, thực hiện `toString()` và được in ra bởi `System.out.println`.

## 3. Khi nào nên sử dụng Proxy
* Dẫn hướng các lời gọi phương thức đến các remote servers.
* Log lại các nội dung khi gọi hay kết thúc một phương thức dùng cho mục đích debug. (như trường hợp ví dụ trên).
* Khi một lớp implement nhiều Interface khác nhau, và xuất hiện trường hợp 2 hoặc nhiều Interface có các phương thức giống hoàn toàn với nhau. Có thể tìm hiểu qua link :https://stackoverflow.com/questions/13730419/two-interfaces-specify-methods-with-the-same-signature-but-specified-to-have-di.
* Thực hiện chức năng Lazy loading để tăng hiệu suất làm việc của chương trình. Lazy loading của Framework Hibernate là một ví dụ điển hình. 
* ...

## 4. Tài liệu tham khảo
* Sách:
    * Cay S. Horstmann (2016), Core Java Volume I - Fundamentals (tenth edition), Prentice Hall.
* Internet:
    * https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html