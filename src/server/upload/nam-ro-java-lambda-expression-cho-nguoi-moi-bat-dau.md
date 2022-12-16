# Lời nói đầu
Java Lambda Expression (biểu thức Lambda) là một tính năng được thêm vào Java 8. Đây là một tính năng rất thú vị và nó đã góp phần thay đổi xu hướng lập trình trong Java. Đây là tính năng mà mình nghĩ là các bạn newbie nên dành thời gian để tìm hiểu và nắm bắt. Thú thật sau 1 năm làm việc, mình chẳng hề biết đến Lambda là gì. Cho tới khi mình tham gia dự án Java 8, mình bắt đầu tiếp xúc với biểu thức Lambda và nó đã làm thay đổi hoàn toàn tư duy cũng như phong cách code của mình. Trong bài viết này, mình sẽ tập trung giải thích một cách chi tiết nhất có thể để các bạn newbie có thể làm quen và sử dụng biểu thức Lambda vào code của mình. Những gì mình viết đều dựa trên những gì mình mày mò và rút ra trong quá trình làm việc nên hi vọng sẽ giúp ích cho các bạn. Không dài dòng nữa, mình xin bắt đầu ngay đây.
# Functional Interface
Trước khi làm quen với Lambda thì chúng ta cần phải nắm rõ một khái niệm rất quan trọng là Functional Interface.
Functional Interface là một interface (chắc chắn rồi) chỉ chứa một và chỉ một abtract method. Nên nhớ rõ đặc điểm này: một và chỉ một phương thức abtract. Do đó nó cũng có thể được gọi là Single Abstract Method (SAM – cái tên nói lên tất cả). 

Ví dụ về Functional Interface:

```
interface Hello {
    public void sayHello(String helloMessage); 
}
```
Java 8 cũng giới thiệu một annotation mới là @FunctionalInterface để chúng ta đánh dấu interface đó là Functional interface. Việc thêm annotation @FunctionalInterface là không bắt buộc tuy nhiên nó là cần thiết khi khai báo một functional interface. Bởi vì việc thêm @FunctionalInterface sẽ giúp bắt lỗi ở thời điểm biên dịch nếu vô tình thêm một method trừu tượng khác nữa vào interface có đánh dấu bởi annotation này.

Một số quy tắc khai báo Functional Interface
-	Một Functional Interface hợp lệ chỉ có duy nhất một method trừu tượng.
-	Một Functional Interface có thể có các phương thức của lớp java.lang.Object
-	Phương thức default and static không phá vỡ quy tắc của Functional interface.
-	Một Functional Interface có thể kế thừa từ một Functional Interface khác chỉ khi nó không có bất kỳ phương thức trừu tượng nào
-	Các Functional Interface đã được định nghĩa trong Java 8 – Java Predefined-Functional Interfaces được đặt trong gói java.util.function
-	Tham khảo chi tiết tại [đây](https://gpcoder.com/3869-functional-interface-trong-java-8/)

Vì sao chúng ra phải nắm rõ Functional Interface. Nguyên nhân rất đơn giản, một trong các ứng dụng quan trọng nhất của Lambda Expression để tạo ra thể hiện (instance) cho interface đó.

# Toán tử mũi tên (->)
Java 8 giới thiệu một toán tử mới là toán tử mũi tên ->. Toán tử này được dùng trong biểu thức Lambda với mục đích chia biểu thức Lambda thành 2 phần: tham số và nội dung thực thi

Ví dụ:

`(int a, int b) -> { do something };`

# Biểu thức Lambda là gì và tại sao phải sử dụng biểu thức Lambda
Biểu thức Lambda có thể được định nghĩa là một hàm ẩn danh (anonymous function).  Vì là hàm ẩn danh nên nó có đầy đủ đặt điểm của một hàm là có các tham số (parameters) và nội dung thực thi (body). Tham số của một hàm thì có thể có hoặc không, tương tự nội dung thực thi thì có thể có kiểu trả về hoặc không có kiểu trả về. Biểu thức Lambda sẽ dựa trên danh sách tham số đầu vào và xử lý bằng những lệnh ở phần body để cho ra kết quả.

Biểu thức Lambda cung cấp cách thức implement cho method được định nghĩa ở functional interface. Bên cạnh đó biểu thức Lambda cũng cung cấp các thư viện giúp cải tiến cách thức làm việc với Collection như duyệt, filter, và truy xuất dữ liệu…

Với những đặc điểm trên, Lambda giúp giảm số dòng code. Bên cạnh đó, biểu thức Lambda còn có thể hỗ trợ thực hiện tuần tự (Sequential) và song song (Parallel) hiệu quả hơn thông qua Stream API (mình sẽ không tích hợp kiến thức liên quan đến Stream API vào bài này. Phần kiến thức về biểu thức Lambda và Steam API mình sẽ giới thiệu ở các bài viết sau)

Tham khảo thêm tại [đây](https://viblo.asia/p/gioi-thieu-lambda-expression-trong-java-8-EyORkbklGqB#_3-tai-sao-phai-su-dung-lambda-expression-2)

# Cú pháp của biểu thức Lambda
`(argument-list) -> {body}`

Biểu thức Lambda trong java gồm có 3 thành phần sau:
-	Argument-list: danh sách tham số, có thể không có, có một hoặc nhiều tham số.
-	Arrow-operator: toán tử mũi tiên được sử dụng để liên kết danh sách tham số và body của biểu thức.
-	Body: nội dung thực thi, là 1 khối lệnh hoặc 1 biểu thức.

Ví dụ về biểu thức Lambda
-	Không có tham số: 
    ```
    @FunctionalInterface
    interface Hello {
        public String sayHello();
    }

    public class LambdaExpression {
        public static void main(String[] args) {
            Hello s = () -> {
                return "Hello Lambda.";
            };
            System.out.println(s.sayHello());
        }
    }
    ```

-	Có 1 tham số:

    ```
    @FunctionalInterface
    interface Hello {
        public String sayHello(String name);
    }

    public class LambdaExpression {
        public static void main(String[] args) { 
            Hello s = name -> "Hello, " + name;
            System.out.println(s.sayHello("Lambda"));
        }
    }
    ```

-	Có nhiều tham số:
    ```

    @FunctionalInterface
    interface Hello {
        public String sayHello(String name, String com);
    }

    public class LambdaExpression {
        public static void main(String[] args) { 
            Hello s = (name, com) -> "Hello, " + name + ". Welcome to " + com;
            System.out.println(s.sayHello("newbie", "Lambda"));
        }
    }
    ```

Về khai báo danh sách tham số:
-	Các tham số cách nhau bởi dấu phẩy

    Đúng:
    `(int a, int b, int n) -> { doSomthing(); }`

    Sai:
    `(int a; int b; int n) -> { doSomthing(); }`

-	Danh sách tham số phải được đặt trong ngoặc tròn. Trường hợp có 1 tham số thì không bắt buộc và không cần thiết phải có dấu ngoặc tròn

    Đúng: `(int a, int b) -> { doSomthing(); }`
    
    Đúng: `(int a) -> { doSomthing(); }`
    
    Đúng: `a -> { doSomthing(); } //best way of single param`
    
    Sai: `int a, int b -> { doSomthing(); }`
    
-	Không bắc buộc phải khai báo kiểu dữ liệu của tham số. Giả sử trường hợp dùng biểu thức Lambda để implement function interface thì kiểu dữ liệu của tham số sẽ được ngầm hiểu là kiểu dữ liệu đã khai báo ở abtract method. Việc loại bỏ khai báo kiểu dữ liệu tham số trong biểu thức Lambda 
  
    `(int a, int b) -> { doSomthing(); }` hoặc có thể viết là `(a, b) -> { doSomthing(); }`


Về trình bày nội dung thực thi:
-	Nội dung thực thi phải được đặt trong dấu ngoặc nhọn. Trường hợp có một dòng lệnh thì không bắt buộc. Điều này tương tự với nội dung thực thi của lệnh if, for…

    Đúng: `Foo foo = parameter -> buildString(parameter);`

    Đúng:` Foo foo = parameter -> {buildString(parameter); return true;}`

-	Trường hợp nội dung thực thi gồm nhiều câu lệnh thì không nên đặt trong biểu thức Lambda. Biểu thức Lambda nên chỉ có từ 2-5 dòng lệnh để tránh sự phức tạp về trình bày cũng như mục đích sử dụng biểu thức Lambda.

    ```
    Foo foo = parameter -> { 
    String result = "Something " + parameter; 
        //many lines of code 
        return result; 
    };
    ```

    Sẽ tốt hơn nếu được viết như sau:

    ```
    Foo foo = parameter -> buildString(parameter);
    private String buildString(String parameter) {
        String result = "Something " + parameter;
        //many lines of code
        return result;
    }
    ```

# Một số ứng dụng của biểu thức Lambda
Ngoài việc được sử dụng để implement Function interface như ở các ví dụ trên thì biểu thức Lambda còn được sử dụng thường xuyên khi làm việc với Collection. Phổ biến nhất là việc áp dụng biểu thức Lambda vào vòng lặp forEach

```
List<String> list=new ArrayList<String>();  
//init list
list.forEach( n -> System.out.println(n) );  
```

Biểu thức Lambda cũng được dùng để thay thế các Anonymous inner class. Anonymous inner class: Inner class là class (non static) được viết trong một class khác (out-class). Anonymous class là Inner class nhưng không có ''class' đặt trước tên của class. Khi thực hiện sắp xếp với Collection, chắc hẳn mọi nguời đều tiếp xúc với một Anonymous inner class là Comparator rồi nhỉ.

Trường hợp dùng Comparator 

```
listDevs.sort(new Comparator<Developer>() {
	@Override
	public int compare(Developer o1, Developer o2) {
		return o2.getAge() - o1.getAge();
	}
});	
```

Trường hợp dùng Lambda

`listDevs.sort((Developer o1, Developer o2)->o1.getAge()-o2.getAge());`

# Một số lưu ý khi sử dụng biểu thức Lambda
Biểu thức Lambda được sử dụng tốt nhất khi kết hợp với Function interface. Bạn không thể sử dụng biểu thức Lambda với một interface có nhiều hơn một abtract method. Các lưu ý khi khởi tạo một Function interface:
-	Sử dụng @FunctionalInterface Annotation
-	Hãy nghiên cứu về các Functional interfaces nằm trong gói java.util.function trước khi khởi tạo một  Functional interfaces nhằm giảm thiểu những việc không cần thiết.
-	Không nên lạm dụng các method default và static trong Functional interfaces. Đặc biệt là cho các Functional interfaces kế thừa từ các Functional interfaces khác.
-	Khi sử dụng biểu thức Lambda hãy chắc chắn số lượng parameter và kiểu giá trị trả về của biểu thức Lambda phải tương ứng với phương thức duy nhất ở Functional interfaces.

Vì biểu thức Lambda là tính năng trong Java 8 nên hãy chắc chắn rằng bạn đã cài đặt Java 8 hoặc mới hơn. Biểu thức Lambda không khả dụng cho Java 7 hoặc các phiên bản sớm hơn.

Biểu thức Lambda cũng được dùng để thay thế các Anonymous inner class. Tuy nhiên, hãy tìm hiểu kỹ về sự khác biệt giữa chúng để có thể sử dụng biểu thức Lambda một cách thích hợp. Tham khảo thêm tại [đây](https://viblo.asia/p/lambda-va-anonymous-inner-class-lam-viec-the-nao-eW65GYbPZDO)

# Lời kết
Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Hi vọng bài viết này sẽ giúp ích cho các bạn khi làm việc với Lambda Expression. Rất mong các bạn có thể góp ý thêm.
# Tham khảo
https://gpcoder.com/3869-functional-interface-trong-java-8/

https://viblo.asia/p/gioi-thieu-lambda-expression-trong-java-8-EyORkbklGqB

https://blog.idrsolutions.com/2014/10/5-minutes-explanation-java-lambda-expression/

https://www.javatpoint.com/java-lambda-expressions