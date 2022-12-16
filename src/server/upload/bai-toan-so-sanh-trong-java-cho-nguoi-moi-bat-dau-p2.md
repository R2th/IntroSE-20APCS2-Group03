# Lời nói đầu
Hello everyone! Vẫn là mình với bài toán so sánh trong Java. Ở phần 1 mình đã giới thiệu cái ví dụ cơ bản nhất trong bải toán so sánh. Trong phần này, mình sẽ viết về so sánh đối tượng trong Java với những ví dụ thường gặp nhất trong thực tế và cách giải quyết. Rất mong bài viết sẽ giúp ích cho các bạn. Còn nếu chưa xem qua phần 1, bạn có thể xem tại [đây](https://viblo.asia/p/bai-toan-so-sanh-trong-java-cho-nguoi-moi-bat-dau-p1-m68Z0RpQ5kG) nhé.

# Ôn tập
Ờ thì phần 1 của chúng ta ra đời cách đây cũng khá lâu nên hãy ôn lại một chút nào. Ở cuối bài mình có đưa một bài tập nho nhỏ, không biết các bạn đã có đáp án cho mình chưa. Bài toán của chúng ta: Hãy cho biết kết quả và giải thích thử ví dụ sau nhé:
```
    Integer x = 1;
    Integer a = new Integer(1);
    System.out.println("x == a: " + (x == a));
```

Kết quả cho bài toán này là `false`. Hẳn là ai cũng đúng nhỉ. Lí do nằm ở toán tử new tạo ra đối tượng mới với vùng nhớ riêng biệt nên khi dùng toán tử `==` so sánh sẽ cho kết quả false. Quá dễ phải không nào. Thêm một ví dụ nữa để kết thúc phần ôn tập nhé.

```
    String s1 = "welcome";  
    String s2 = new String("welcome");
    System.out.print("s1 == s2: " + (s1 == s2));
```

Kết quả sẽ là gì nào. `true` or `false`. Đơn giản phải không nào. Mọi string được tạo bằng string literal (sử dụng double quotes) sẽ được lưu ở String pool. Khi tạo bằng string literal, Java sẽ truy cập vào String Pool, rồi tìm ở trong Pool ô nhớ nào có cùng giá trị với nó, nếu tìm thấy thì sẽ tham chiếu đến địa chỉ của ô nhớ đó, còn không thì nó sẽ tạo ô nhớ mới ở trong Pool rồi sẽ thực hiện việc tham chiếu. Khi sử dụng toán tử new, thì Java sẽ không tạo ô nhớ mới ở bộ nhớ String Pool mà sẽ tạo ở bộ nhớ Heap. Và khi đó nó sẽ luôn luôn tạo ô nhớ mới cho dù đã có sẵn những ô nhớ khác có cùng giá trị. Chính vì thế kết quả sẽ là false. 
Qua ví dụ ôn tập, hẳn các bạn cũng nhớ lại kiến thức ở phần 1 rồi nhỉ. Kiến thức quan trọng nhất mình muốn nhắc lại là khi so sánh bằng toán tử `==` hãy luôn xác định rõ đối tượng cần so sánh được lưu ở đâu và lưu như thế nào. Từ đó chúng ta có thể nhanh chóng xác định được kết quả một cách chính xác. Còn bây giờ chúng ta hãy đến với phần tiếp theo.

# Phương thức equals trong Java
Ở phần trước mình cũng đã giới thiệu sơ về phương thức equals trong Java. Đây là phương thức có sẵn của lớp Object được sử dụng cho trường hợp muốn so sánh giá trị của 2 đối tượng. Chúng ta cũng đã có ví dụ về sử dụng phương thức equals cho 2 đối tượng thuộc lớp Wrapper. Hãy cùng nhìn lại một chút nào:

```
    Integer c = new Integer(1);
    Integer d = new Integer(1);
    System.out.println("c equals d: " + (c.equals(d)));
```
    
Ví dụ này, khi so sánh bằng toán tử `==` thì kết quả sẽ là false. Nhưng khi so sánh bằng phương thức equals thì sẽ là true. Tại sao lại như vậy, phương thứ equals đã thực hiện so sánh như thế nào? Có phải nó chỉ so sánh giá trị, không so sánh địa chỉ của các đối tượng như mọi ngời vẫn hay nói hay không? Hãy cùng mình tìm hiểu nhé.
Như mình đã giới thiệu thì phương thức equals là phương thức có sẵn của lớp Object (lớp cha của mọi lớp) và theo Java doc thì phương thức equals sẽ return true khi và chỉ khi cả hai đối tượng có cùng tham chiếu, nghĩa là nó trả về kết quả của phép so sánh bằng toán tử `==`. Để dễ hình dung thì nó trông như thế này:

```
    public boolean equals(Object obj) { 
        return (this == obj); 
    }
```

Đến đây chắc hẳn các bạn sẽ thắc mắc kết quả so sánh bằng toán tử == là false tại sao so sánh bằng phương thức equals lại ra true. Nó có so sánh giá trị đâu, nó so sánh bằng toán từ == mà. Lý do thì đây là phương thức equals của lớp Object và 2 đối tượng so sánh của chúng ta lại là đối tượng của lớp Integer, và hiển nhiên, lớp Integer đã override lại phương thức equals của lớp Object. Phương thức equals của lớp Integer sẽ trả về true khi và chỉ khi hai đối tượng không null và có cùng giá trị int:

```
    public boolean equals(Object obj) {
        if (obj instanceof Integer) {
            return value == ((Integer)obj).intValue();
        }
        return false;
    }
```

Do đó, kết quả của c.equals(d) trong ví dụ trên sẽ là `true` vì có cùng giá trị là 1. Cảm thấy rối rối rồi có đúng không. Chúng ta đi tiếp thêm một ví dụ để nắm rõ hơn nhé:

```
    String s1 = "welcome";  
    String s2 = new String("welcome");
    System.out.print("s1 equals s2: " + (s1.equals(s2)));
```

Ở ví dụ này, hai đối tượng thuộc lớp String và chúng ta cần xác định phương thức equals của lớp String hoạt động như thế nào. Nó sẽ thực hiện so sánh theo định nghĩa của lớp Object hay thực hiện theo cách của riêng nó. Rất dễ đoán đương nhiên là nó sẽ so sánh theo cách của nó rồi có đúng không. Vậy phương thức equals của lớp String sẽ như thế nào. It’s time for google :smile:. Và kết quả là phương thức equals của lớp String sẽ trả về true khi và chỉ khi 2 đối tượng không null và có cùng chuỗi kí tự. (chi tiết xem tại [đây](http://www.docjar.com/html/api/java/lang/String.java.html))

Qua ví dụ này bạn đã hình dung được phương thức equals hoạt động như thế nào chưa? Kết quả khi so sánh bằng phương thức equals sẽ tùy thuộc vào lớp đó có override lại phương thức equals của lớp Object hay không và nó override như thế nào. Bạn có nghĩ rằng chỉ cần nắm hết các phương thức equals là có thể thực hiện bài toán so sánh một cách dễ dàng. Thực tế cho thấy là bạn không thể nào nhớ tất cả phương thức equals của mỗi lớp được, nó quá nhiều và thực sự không cần thiết. Bạn chỉ nên nhớ những phương thức equals thuộc những lớp phổ biến, thường xuyên sử dụng như String, Date… Bởi vì bạn hoàn toàn có thể override lại phương thức equals theo cách mà bạn mong muốn. Đó là sự tuyệt vời của OOP và Java cho phép chúng ta làm điều đó một cách dễ dàng. Nhưng đừng làm điều đó với những lớp cơ bản như String, điều đó chỉ tốn thời gian của bạn mà thôi. Và khi đã nắm được điều này, chúng ta hãy đến với bài toán tiếp theo nào.

# Bài toán thông thường level 1
Chúng ta bắt đầu bằng bằng bài toán so sánh hai đối tượng thuộc lớp tự định nghĩa phổ biến. Đó những lớp mô tả thực thể (entity class). Những lớp này có đặc điểm là các thuộc tính thường là kiểu nguyên thủy hoặc String. Giả sử chúng ra có một lớp Person như sau:

```
    public class Person {
        public String name;
        public int age;
        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
    }
```

Và bây giờ chúng ta tạo ra hai đối tượng của lớp Person

```
    Person a = new Person("name", 24);
    Person b = new Person("name", 24);
```

Hai đối tượng a, b đều có name là “name” và có age là 24. Chúng nên bằng nhau khi so sánh. Và tất nhiên chúng ta sẽ dùng phương thức equals để so sánh hai đối tượng thuộc kiểu tham chiếu. Nhưng đừng quá vội vàng dùng equals ngay, chúng ta cần phải override lại nó trước đã. Giả sử mình override như sau:

```
    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass()) return false;
        Person anotherPerson = (Person) obj;
        return name.equals(anotherPerson.name) && age == anotherPerson.age;
    }
```
Sau khi đã override phương thức equals như trên, khi so sánh a, b kết quả sẽ ra `true`. Nếu chúng ta không override thì kết quả chỉ là kết quả dùng toán tử `==` thôi. Đừng quên điều này nhé. Bên cạnh đó, khi override phương thức equals cần lưu ý:
-	điều đầu tiên cần làm là check null và xác định lớp của đối tượng cần so sánh. Điều này đảm bảo không xảy ra NullPointerException và tránh xảy ra lỗi khi type cast cũng như giảm bớt xử lý không cần thiết.
-	tiếp theo là type cast đối tượng thuộc lớp Object về lớp đang thực hiện so sánh. Điều này sẽ tránh gây ra lỗi khi truy cập đến các phần tử trong quá trình so sánh các phần tử ở xử lý tiếp theo.

Đơn giản phải không. Chúng ta sẽ giữ mọi thứ ở trên và tới với trường hợp tiếp theo, trường hợp này sẽ cho kết quả như thế nào

```
    Person a = new Person("name", 24);
    Object c = new Person("name", 24);
    System.out.print(c.equals(a));
```
Đối tượng c thuộc lớp Object được tạo ra từ lớp Person. Vậy khi dùng `c.equals(a)` thì đối tượng c sẽ gọi phương thức equals của lớp Object hay của lớp Person. Và lúc này đối tượng c thuộc lớp Object có bằng với đối tượng a thuộc lớp Person khi so sánh bằng phương thức equals hay không? Đây là phần kiến thức rất dễ nhầm lẫn trong Java đặc biệt là các bạn mới. Khi tạo một đối tượng từ một lớp con, đối tượng đó chỉ được truy cập đến các phần tử và phương thức của lớp cha. Tuy nhiên đối với những phương thức của lớp cha đã được lớp con override thì Java sẽ luôn thực thi phương thức ở lớp con. Vì thế mà phương thức equals trong trường hợp này là phương thức equals của lớp Person (vì Object là cha của mọi lớp và phương thức equals đã được lớp Person override). Vấn đề tiếp theo, kết quả là `false` hay `true` khi sử dụng phương thức equals. Để trả lời được câu hỏi này, bạn cần phải xác định được kết quả của điểu kiện `getClass() != obj.getClass()`. Đối với đối tượng a, thì `getClass()` sẽ cho kết quả là Person.  Còn với đối tượng c, kết quả là Person hay Object. Chúng ta biết rằng đối tượng c thuộc lớp Object do khai báo. Nhưng có thật như vậy. Đối với mọi câu lệnh gán, thì phần bên phải dấu `=` luôn là phần chạy trước. Trong trường hợp này, nó sẽ tạo ra một đối tượng của lớp Person sau đó mới type cast về lớp Object. Nên kiểu thật sự của nó là Person và `getClass()` sẽ trả về giá trị là “Person”. Và sau tất cả kết quả khi so sánh bằng phương thức equals sẽ là `true`. Tưởng dễ mà không phải dễ phải không nào. 

Bây giờ nếu như chúng ta có thêm một class Student kế thừa từ lớp Person:

```
    public class Student extends Person{
        public String school;
        Person(String name, int age, String school) {
            super(name, age);
            this.school = school;
        }
    }
```

Tiếp theo là tạo đối tượng thuộc lớp Student
`Student d = new Student("name", 24, "ABC");`
Lúc này nếu so sánh d với a bằng phương thức equals, kết quả sẽ ra `false`. Tuy nhiên vì đó vẫn là một người do cùng tên và tuổi nên chúng ta mong muốn một kết quả `true`. Như vậy trường hợp này nên như thé nào. Phần này dành cho bài tập về nhà. Các bạn hãy nghĩ ra những các giải quyết và đưa ra cách hay nhất nhé.

# Bài toán thông thường level 2
Đến với phần này tất nhiên bài toán sẽ trở nên phức tạp hơn. Hãy nghĩ về một lớp với nhiều thuộc tính, vài chục thậm chí là cả trăm thuộc tính. Liệu phương thức equals có còn khả thi lúc này. Override lại phương thức equals, so sánh từng thuộc tính một, rồi check xem có thiếu cái nào dư cái nào thật không dễ dàng. Và hơn cả là tốn thời gian. Chính vì thế, chúng ta cần một phương pháp khác. Cái chúng ta cần là so sánh từng thuộc tính với nhau. Và ý tưởng là gom tất cả thuộc tính thành một mảng, sau đó lặp từng thuộc tính và so sánh chúng với nhau. Điều đó đảm bảo chúng ta check toàn bộ các thuộc tính và cho kết quả so sánh đúng với mong muốn. 
Vậy làm sao để làm được điều đó? Đây cũng là một trong những điều đánh giá một dev có kinh nghiệm hay không. Và đó cũng là lí do mình muốn giới thiệu nó cho các bạn. Vì đây không phải là thức gì quá cao siêu hay mới lạ. Đó là khái niệm về Reflection và ứng dụng của nó. Nếu bạn chưa biết, hãy tìm hiểu nó ngay bây giờ. Với Reflection ta dễ dàng tổng hợp được tất cả các thuộc tính của một lớp, bao gồm tên và giá trị. Trong trường hợp này chúng ta chỉ cần reflect Field để lấy toàn bộ properties của object:

```
    public boolean deepEquals(Object obj, Object anotherObj) throws Exception {
        if (obj == anotherObj) return true;
        if (obj == null || anotherObj == null) return false;
        //return false nếu không cùng một class type
        if (obj.getClass() != anotherObj.getClass()) return false;
        boolean result = true;
        //lấy toàn bộ thuộc tính của một lớp từ đối tượng của lớp đó
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.get(obj) != field.get(anotherObj)) return false;
        }
        return result;
    }
```

Phương thức này có thể so sánh ngay cả khi cả hai đối tượng đều bằng `null` (cho kết quả `true`), điều không thể làm bằng phương thức equals. Đây mới chỉ là ví dụ tiêu biểu và nếu bạn muốn, bạn có thể tùy chỉnh để nó có thể so sánh với subclass của nó hoặc so sánh với một số thuộc tính mà không phải là tất cả. Hãy thử demo một số trường hợp và xem bạn có thể là được những gì. 


Chỉ cần tìm hiểu một chút thì bài toán trên trông khá đơn giản đúng không nào. Nhưng cuộc đời thì không hề đơn giản. Nếu như có một thuộc tính là một đối tượng thuộc một lớp khác thì sao? Rõ ràng việc so sánh hai thuộc tính có khác nhau không trong vòng lặp foreach ở ví dụ trên sẽ không đáp ứng được. Lúc này ta cần phải kiểm tra thuộc tính một cách cẩn thận hơn bằng cách dùng đệ quy:

`if (!deepEquals(field.get(obj), field.get(anotherObj))) return false;`

Thấy ổn rồi có đúng không. Vậy bây giờ nếu đó không phải là một object mà là một List thì sao. OK chúng ta chỉ cần so sánh số lượng phần tử ở mỗi list, sau đó check xem từng phần tử có bằng nhau khi so sánh bằng phương thức deepEquals ở trên hay không. Thế là xong. Tuy nhiên bạn có thể tạo một demo và xem liệu nó có đơn giản như thế không nhé. Đối với mình thì so sánh List, hay so sánh Collections nó thuộc một level cao hơn mà mình sẽ tiếp tục giới thiệu ở phần sau. Còn ở phần này, mức độ 1 đối tượng với nhiều thuộc tính đã là quá đủ rồi.

# Lời kết
Qua bài viết này mình hi vọng các bạn sẽ có cái nhìn rõ ràng về phương thức equals cũng như cách sử dụng nó. Phương thức equals không phải chỉ so sánh giá trị, không so sánh vùng nhớ như các bạn đã từng nghĩ đâu nhé. Với các bài toán trong bài, mình cũng mong các bạn tự tạo demo và thử thật nhiều trường hợp. Vì biết đâu mình sai ở đâu đó và các bạn có thể giúp mình sửa những lỗi sai đó. Bài kế tiếp, mình sẽ viết về một thứ đã được note khi override phương thức equals: phương thức hashCode và các bài toán liên quan đến so sánh 2 collections. Và nếu có bất cứ ý kiến gì, hãy cho mình biết ngay nhé.

# Tham khảo
https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html

https://docs.oracle.com/javase/7/docs/api/java/lang/Integer.html

https://docs.oracle.com/javase/7/docs/api/java/lang/String.html

https://o7planning.org/vi/10213/so-sanh-va-sap-xep-trong-java

https://o7planning.org/vi/10155/huong-dan-java-reflection