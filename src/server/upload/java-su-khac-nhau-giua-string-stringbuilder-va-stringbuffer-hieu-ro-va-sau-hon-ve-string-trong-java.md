![](https://images.viblo.asia/11ac6581-6400-41b7-80af-258d8dca133a.png)
Trong bài này, mình sẽ nói rõ hơn về String, StringBuilder và StringBuffer. Các bạn sẽ hiểu rõ hơn và biết khi nào sử dụng chúng, cũng như dùng như nào là hợp lí, như nào là tiết kiệm bộ nhớ, ...
Mình vẫn sử dụng 1 số từ tiếng Anh đan xen để các bạn biết đang nói về gì, sau search google cho dễ, chứ dịch hết sang tiếng Việt bởi mình cũng từng đọc tài liệu tiếng Việt rồi xong muốn search nhiều khi dùng key word không sao chuẩn được để ra.
## String
String trong Java là immutable tức là không thể thay đổi. Còn khi mà bạn thay đổi 1 String Object trong Java thì 1 String object mới hoàn toàn sẽ được tạo ra mỗi lần bạn thay đổi. Có 2 cách để khai báo (declare) một String Object trong Java, các bạn có thể tham khảo ví dụ bên dưới
```
public class HelloWorld {
	public static void main(String[] args) {
		String s1 = "Xin chao cac ban!"; // Declared using String literal
		String s2 = new String("Cam on cac ban da doc bai viet cua minh!"); // Declared using new operator
	}
}
```
Sự khác nhau giữa 2 phương thức này (method) là khi dụng "new" operator, 1 String Object mới sẽ được tạo ra trong bộ nhớ heap. Nhưng khi sử dụng 1 literal object ( Literal có thể hiểu theo ngữ cảnh nào đó là việc “sử dụng chuỗi thuần tuý”), nếu đối tượng này đã tồn tại trong bộ nhớ heap rồi thì sẽ không tạo mới đối tượng nữa, sử dụng lại, giúp tiết kiệm bộ nhớ heap hơn. Khi sử dụng String literal thì String Object được lưu ở nơi nào đó được gọi là String Pool trong Java ( mình hay gọi là cái ao chứa chuỗi :) ). Nó nằm bên trong bộ nhớ heap, giúp tiết kiệm rất nhiều space cho Java Runtime mặc dù nó khá tốn thời gian để tạo ra 1 String Object. Vì thế nếu bạn muốn tạo mới một String Object mỗi lần gọi, thì sử dụng "new" operator, còn nếu muốn tiết kiệm bộ nhớ heap, thì sử dụng literal string để tạo 1 String Object.
![](https://images.viblo.asia/ca89726e-bf85-4bda-8482-87f0101b671a.png)
Khi sử dụng "new" operator, nếu đối tượng không tồn tại trong String Pool, đầu tiên nó sẽ tạo 1 đối tượng String trong String pool, và sau đó tạo trong bộ nhớ heap. Thường thì đối tượng String được tạo ra sẽ luôn chỏ đến đối tượng trong bộ nhớ heap. Tuy nhiên, nếu nó đã tồn tại trong String Pool, thì chỉ trong bộ nhớ heap String Object sẽ được tạo ra. Cái này cũng hay được hỏi khi phỏng vấn lắm đó, các bạn chú ý nha.
Ngoài ra, Java String class còn cho phép access với rất nhiều useful methods (phương thức) để áp dụng vào String. Một số phương thức như là: **substring(), charAt(), length(), equals(), concat(), replace(), trim(), split(), toUpperCase() and toLowerCase()**. Các phương thức này có thể sử dụng độc lập, cũng như kết hợp với nhau, tùy vào mục đích sử dụng của bạn.
```
public class HelloWorld {
	public static void main(String[] args) {
		String s1 = "Xin chao cac ban!"; // Declared using String literal
		String s2 = new String("Cam on cac ban da doc bai viet cua minh!"); // Declared using new operator
		System.out.print(s1.concat(s2).toUpperCase()); // XIN CHAO CAC BAN!CAM ON CAC BAN DA DOC BAI VIET CUA MINH!
	}
}
```
Trước khi tiếp tục, mình xin được giải thích qua về String Pool và Heap Memory để cho các bạn hiểu rõ hơn nhé.
![](https://images.viblo.asia/276fcb39-b432-4ff1-bd22-de0149a36b16.png)
Trong ảnh trên, các bọn có thể thấy Java Heap chưa luôn cái String Pool ( phần màu xám bạc đó). Ở đây, 2 đối tượng String s1 và s2 có giá trị = "Cat" đều chỉ chỏ về đối tượng "Cat" trong String Pool. Khi ta sử dụng double quotes( 2 dấu nháy kép) để tạo 1 String Object, thì đầu tiên nó sẽ tìm trong String Pool xem có thằng nào trong đó có giá trị như thế chưa, nếu có rồi thì nó lấy luôn thằng đó rồi trả về còn không nó mới tạo mới đối tượng vào nhét vào Pool. Còn sử dụng "new" operator, chúng ta sẽ bắt String class phải tạo mới một đối tượng String trong bộ nhớ heap, chúng ta có thể sử dụng method **intern()** để đưa đối tượng đó vào Pool hoặc refer tới một String Object khác có cùng giá trị trong Pool.
![](https://images.viblo.asia/96f6cb40-d7c3-419d-ba9d-8f260deb7b19.png)
Tham khảo thêm tại: [link](https://www.journaldev.com/797/what-is-java-string-pool#:~:text=When%20we%20use%20double%20quotes,String%20object%20in%20heap%20space.)
## StringBuilder
StringBuilder Class làm cho String class trở nên linh động hơn vì nó có thể tạo ra một set của các chuỗi kí tự có thể thay đối tượng. StringBuilder Class cũng có một loạt các methods (phương thức) để tương tác hay tác động lên các String objects như trong String Class
```
public static void main(String args[]) {
        StringBuilder sbd = new StringBuilder("xinnn chao");
		String s = sbd.replace(5, 11, "").append(" cac ban").toString();
		System.out.println(sbd); // xinnn cac ban
		System.out.print(s.toUpperCase()); // XINNN CAC BAN
    }
```
StringBuilder và StringBuffer cung cấp những methods(phương thức) mà String Class không hề có, ví dụ như phương thức insert(), delete() và reverse(). Khi cần thao tác nhiều hay chuỗi quá dài thì chúng ta nên sử dụng StringBuilder hoặc StringBuffer bởi vì chúng nhanh hơn và tiết kiệm bộ nhớ hơn rất nhiều so với String. Ví dụ, bạn đang muốn ra từ 0 đến 99 trong một String thì sử dụng StringBuilder sẽ tiện hơn rất nhiều.
```
class HelloWorld {
 public static void main(String args[]){
        StringBuilder sbd = new StringBuilder("0");
        for (int i = 0; i < 100; i++) {
            sbd.append(", "+i);
        }
    }
}
```
StringBuilder không cung cấp sự đồng bộ hóa (synchronization), nghĩa là các instances của StringBuilder không thể được chia sẻ giữa các luồng (threads). **Ở trong môi trường không đa luồng,** **ta nên sử dụng StringBuilder vì nó nhanh hơn StringBuffer**
## StringBuffer
Cũng giống như StringBuilder, StringBuffer cũng sử dụng để tạo ra các chuỗi dài có thể thay đổi một cách dễ dàng. Cả StringBuilder và StringBuffer đều sử dụng các phương thức (methods) giống nhau. Sự các nhau giữa 2 thằng này đó là StringBuffer thì dùng cho thread-safe (Nếu một object được tạo ra và chỉ được sử dụng bên trong method tạo ra nó, thì nó được coi là thread safe) và synchronized ( đồng bộ hóa) tức là thằng StringBuffer này được sử dụng trong đa luồng. **Ở trong môi trường đa luồng**, **ta nên sử dụng StringBuffer**
```
class Test extends Thread  {  
  StringBuffer sbr;

    public Test() {
        sbr = new StringBuffer();
    }

    public String hello() {
        sbr.append("Hello World");
        return(sbr.toString());
    }
}

 public class SbrEx {  
    public static void main(String args[]) {
      Test thread1 = new Test(); 
      thread1.start(); 
      Test thread2 = new Test(); 
      thread2.start(); 
      System.out.println(thread1.hello());
      System.out.println(thread2.hello());
    }
}
```
Ở đây, khi các luồng tiếp cận vào method hello(), StringBuffer phải được sử dụng để đảm bảo thread-safety.
Cám ơn các bạn đã đọc bài viết của mình :D Có sai sót gì, các bạn comment để mình update lại nha.

Nguồn tham khảo: [link](https://medium.com/javarevisited/string-stringbuilder-and-stringbuffer-do-you-know-the-difference-6a53429dcf)