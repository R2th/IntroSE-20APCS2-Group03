## Điểm qua một số features chính mà Oracle đã phát triển cho Java 9, bao gồm Java programming, JVM, Tools và các libraries :
* Platform Module System (Project Jigsaw)
* Interface Private Methods
* Try-With Resources
* Anonymous Classes
* @SafeVarargs Annotation
* Collection Factory Methods
* Process API Improvement
* New Version-String Scheme
* JShell: The Java Shell (REPL)
* Process API Improvement
* Control Panel
* Stream API Improvement
* Installer Enhancement for Microsoft windows and many more
* Optional Class

### - Interface Private Methods : Ở Java 8 ta đã có thể cung cấp các hàm implement trong interface bằng cách sử dụng hàm Default và Static method. Và ở Java 9, để tránh code bị dư thừa và tăng cường khả năng tái sử dụng, Oracle tiếp tục cung cấp private method và private static method trong interface. Ví dụ :
```
interface iValidation{

// Tạo một hàm private access modifired để hỗ trợ default method
  private Long connectToDB(){
    // steps to connect to DB
  }
  
  // Tạo một hàm implement method. 
  // Giả sử trong trường hợp 2 view page có cùng nhu cầu  validation giống nhau, method này có thể được gọi ra dễ dàng mà không cần phải implement lại các method từ interface
  default boolean checkByDefault(Form form){
        connectToDB();
        // Tiếp tục check value từ form
  }
  
  // Trong trường hợp không muốn dùng default method ở trên, ta vẫn có thể tạo một abstract method để có thể tùy biến như ý muốn
  public  boolean  check(Form form);
  
  // hàm abstract bình thường trong interface, do đó tất nhiên vẫn sẽ cần override ở các implement class.
  public void print result();

}
```
```
public class ValidationClass implements iValidation {

    public  boolean  check(Form form) {
        //TODO
    }

    public static void main(String[] args) {
        ValidationClass v = new ValidationClass();
        
        // Có thể gọi check() vừa được implement
        v.check(new Form("abc", "xyz"));
        // Hoặc gọi default method checkByDefault() vốn dĩ đã được implement sẵn 
        v.checkByDefault(new Form("abc", "xyz"));
    }
}
```

### - Try-With Resources : Cải thiện feature này từ Java 7.
* Tránh việc viết nhiều các khối catch/finally block
* Clean code, tăng tính dễ đọc
* Không cần check null
* Không cần phải kiểm tra xem resource có tham chiếu đến một đối tượng hay null(better Exception Handling)
* Quản lý Resource tốt hơn
* Tránh memory leakages

Ví dụ :
Ở Java 7 hay 8
```
void test() throws IOException{
 BufferedReader reader = new BufferedReader(new FileReader("journaldev.txt"));
 // Có trường hợp xảy ra lỗi khi ứng dụng Try-With Resources khi sử dụng chính reference reader1 trong khối try{}, vì vậy phải ứng phó bằng việc tạo ra một thể hiện clone của reader1
 try (BufferedReader reader1 = reader) {
   System.out.println(reader1.readLine());
 }
}
```
Sau khi được nâng cấp ở Java 9
```
void test() throws IOException{
 BufferedReader reader = new BufferedReader(new FileReader("journaldev.txt"));
 try (reader) {
   System.out.println(reader1.readLine());
 }
}
```

### - Collection Factory Methods : Ở các phiên bản cũ, Java đã được hỗ trợ Generic cho các collection, nay ở Java 9 sẽ cung cấp thêm phương thức để ràng buộc số lượng của một collection(update feature đã có từ Java 7)
Đơn giản là Immutable(cố định) hoặc Unmodifiable(không thể thay đổi) một collection(Set, List, Map).
Ở Java 7
```
List<String> list = new ArrayList<>();
 list.add("one");
 list.add("two");
 list.add("three");
 List<String> immutableList = Collections.unmodifiableList(list);
```
Ở Java 9, cách khai báo đã đơn giản hơn rất nhiều :
```
List<String> immutableList = List.of("one","two","three");
```
Kết quả :


-----


![](https://images.viblo.asia/89e7caea-78ff-440a-96e8-ffcf7e56f049.png)

### - Optional Class : Là một container, dùng để thay thế cho null, hỗ trợ tốt hơn cho việc Exception handling, tránh lỗi NullPointerException.
Ví dụ dưới đây mới chỉ đề cập đến việc tương tác giữa Optional class và String. Vẫn có thể sử dụng cho một Class như bình thường :


-----
![](https://images.viblo.asia/35ebaea1-8856-4ac7-8226-b5cf7d0d64de.png)


### - JShell: The Java Shell (REPL) : Tương tác với Java programming thông qua terminal thay vì 1 editor như Eclipse hay Intellij,...
- Một số điểm quan trọng :
1. Tăng khả năng chạy 1 chương trình Java, hoặc test
2. REPL (Read Evaluate Print Loop) tool

Một số ví dụ cơ bản :


-----

![](https://images.viblo.asia/b983023e-3702-4fc4-80c6-37c488f94077.png)

Import : /import
```
jshell> /import  
|    import java.io.*  
|    import java.util.prefs.*  
|    import java.util.regex.*  
|    import java.util.stream.*  
|    import java.sql.*  
```

Debug, display giá trị các biến : /vars
```
jshell> /vars  
|    int $test1 = 5  
|    int $test1 = 5  
|    int $test3 = 25  
```
Và còn rất nhiều feature ta có thể tương tác được với Java programming thông qua Jshell như : 
- /save <tên_file> để lưu trữ các command ta viết xuống thư mục hiện tại
- Bắt các Exceptions một cách tự động, hiển thị thông tin như thường
- Các khái niệm access modifier, modifier không có tác dụng. Duy chỉ có abstract modifier là cho phép(khi được khai báo trong class)
- ...... 

### Stream API Improvement : Cải thiện Stream feature(Java 8), và thêm một số method mới :
- takeWhile() : lấy element phù hợp với điều kiện được định nghĩa. Nếu fail là stop luôn
```
List<Integer> list = Stream.of(1,2,3,4,5,6,7,8,9,10).takeWhile(i -> (i % 2 == 0)).collect(Collectors.toList());
// Result : [ ]. Vì ngay ở element vị trí 0 không chia hết cho 2 rồi nên stop luôn
// Kiểu trả về là java.util.ArrayList, được định nghĩa bởi .collect(Collectors.toList());
System.out.println(list);
System.out.println(list.getClass().getName());
```

- dropWhile() : Ngược lại với takeWhile(), element nào phù hợp điều kiện thì bỏ qua, ko phù hợp thì được collect
```
List<Integer> list = Stream.of(2,2,3,4,5,6,7,8,9,10).dropWhile(i -> (i % 2 == 0)).collect(Collectors.toList());
// Result : [3, 4, 5, 6, 7, 8, 9, 10] . Bởi 2 element đầu map nên bỏ qua
System.out.println(list);
```

- iterate() : Duyệt qua từng element, gồm 3 tham số seed, hasNext and next.
```
// Result : 1 3 9
Stream.iterate(1, i -> i <= 10, i -> i*3).forEach(System.out::println);
```

### To be continued