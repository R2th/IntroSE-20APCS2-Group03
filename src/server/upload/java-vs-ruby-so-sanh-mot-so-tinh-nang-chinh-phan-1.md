**Java** là ngôn ngữ lập trình biên dịch và là nền tảng điện toán để phát triển ứng dụng do Sun Microsystems phát triển, sau này được Tập đoàn Oracle mua lại vào năm 2009. Ngày nay, nền tảng Java thường được sử dụng làm nền tảng để phát triển và phân phối nội dung trên web. Java rất nhanh, mạnh mẽ, đáng tin cậy và an toàn.<br>
**Ruby** là một ngôn ngữ kịch bản được thiết kế và phát triển bởi Yukihiro Matsumoto vào giữa năm 1990. Ruby là mã nguồn mở và nó cũng có sẵn miễn phí trên Web, phải tuân theo giấy phép. Và sau đây là một số tính năng khác biệt của Java và Ruby<br>
### **1. Diễn giải/Biên dịch (Interpreted/Compiled)**<br>
Trong khi Ruby là một ngôn ngữ kịch bản diễn giải (**interpreted** scripting language) và được chạy trực tiếp mà không cần biên dịch hay tạo bytecode thì các ứng dụng trong Java đều đòi hỏi phải được biên dịch (**compile**) thông qua trình biên dịch *javac* trước khi khởi chạy.<br>
* Ruby:
```
>ruby helloruby.rb # chạy trực tiếp, không cần biên dịch
```
* Java:
```
>javac hellojava.java # biên dịch thông qua javac
>java hellojava # khởi chạy bằng file được biên dịch
```
### **2. Khai báo gói thư viện (Importing Packages)**<br>
Trong Ruby, câu lệnh **require** được sử dụng để thêm 1 gói thư viện (package) hay 1 module. Ngoài ra Ruby còn có thể thêm 1 file ngoại (external file) bằng cách sử dụng require hoặc **load**. Sự khác biệt giữa *load* và *require* là load thêm file ngoại được chỉ định mỗi khi phương thức (method) được thực thi trong khi require chỉ thêm file ngoại một lần.<br>
Trong Java, câu lệnh **import** được sử dụng để thêm một gói thư viện.<br>
* Ruby:
```
require "test_helper" # thêm các tính năng trong thư viện test_helper
require "abc.rb" # thêm các tính năng trong file abc.rb
```
* Java:
```
import "java.util.Scanner"; # thêm thư viện Scanner
```
### **3. Kiểu biến dữ liệu (Typed Variables)**<br>
Cả Ruby và Java đều có kiểu biến **strongly typed**, tuy nhiên đối với Ruby thì biến có dạng động (**dynamically typed**) nghĩa là biến số không có kiểu được định nghĩa rõ ràng. Còn trong Java thì các biến số đều có kiểu cố định (**statically typed**). (Để có thể hiểu rõ hơn về strongly typed, weakly typed, etc. các bạn có thể xem link tham khảo ở cuối bài).<br>
* Ruby:
```
str = "Hello Ruby" # biến str có kiểu là String
str = 1 # biến str có kiểu Integer
```
* Java:
```
String str = "Hello Java"; # biến str có kiểu String
String str = 1; # sẽ xảy ra lỗi incompatible types: int cannot be converted to String
```
### **4. Truyền kiểu dữ liệu (Casting)**<br>
Trong Ruby, không có phép truyền nào được sử dụng vì các biến có dạng dynamically typed và có thể được gán cho bất kỳ loại nào khác. Nhưng do trong Java các đối tượng đều có dạng cố định nên có thể được truyền tới các đối tượng khác nếu các đối tượng được truyền thuộc loại đối tượng được truyền tới. Ví dụ: một đối tượng thuộc loại LinkedHashset, LinkedHashset, có thể được chuyển sang Hashset vì LinkedHashset mở rộng Hashset. 
* Java:
```
HashSet hashSet = (HashSet) linkedHashSet;
```
### **5. Xử lý ngoại lệ (Exceptions Handling)**<br>
Trong Java, các ngoại lệ (exception) được xử lý bằng cách sử dụng cấu trúc **try-catch-finally**; bao gồm một **try** block, theo sau là một hoặc nhiều **catch** block, theo sau là **finally** block (finally block không bắt buộc). Trong try block, một số câu lệnh được chạy có thể tạo ra ngoại lệ. Mỗi một catch block sẽ xử lý một ngoại lệ. Trong finally block, một số câu lệnh có thể được chạy để đóng các đối tượng. finally block luôn được chạy sau khi ứng dụng thoát khỏi try block.
* Java:
```
try {
   String url="com:mysql:jdbc://localhost:3306/test";
   Connection connection=DriverManager.getConnection(url, "root","");
} catch (SQLException e) {
   System.err.println("Caught: SQLException: " + e.getMessage());
} finally(){
   connection.close();
}
```
Trong Ruby, các trường hợp ngoại lệ được xử lý bằng cách sử dụng cấu trúc **begin-rescue-ensure-end**. Cấu trúc bao gồm một hoặc nhiều mệnh đề **rescue** bao gồm các câu lệnh để chạy khi xảy ra ngoại lệ được chỉ định. Mệnh đề **ensure** bao gồm các câu lệnh luôn được chạy cho dù có ngoại lệ xảy ra hay không (ensure không bắt buộc). Mệnh đề rescue trong Ruby tương đương với mệnh đề try trong Java. Mệnh đề ensure trong Ruby tương đương với mệnh đề finally trong Java.
* Ruby:
```
begin
rescue RubyException1
    Statements to run when RubyException1 occurs.
rescue RubyException2
    Statements to run when RubyException2 occurs.
ensure
    Statements to run whether an exception occurs or does not occur.
end
```
### **Kết luận**<br>
Cả Java và Ruby đều giống nhau và chia sẻ rất nhiều tính năng song song. Đồng thời, cả hai đều có các tính năng cụ thể riêng giúp đáp ứng yêu cầu cụ thể. Với việc cả Java cũng như Ruby đều hỗ trợ lập trình hướng đối tượng (Object Oriented Programming), chúng ta sẽ cùng nhau thảo luận về những điểm khác nhau của Java và Ruby trong OOP ở phần tiếp theo. 
### **Tham khảo**<br>
1. https://www.developer.com/open/article.php/3716356/Java-vs-Ruby-a-Comparison-of-the-Key-Elements.htm
2. https://www.educba.com/java-vs-ruby/
3. https://viblo.asia/p/strong-vs-weak-static-vs-dynamic-typing-la-cai-khi-gi-JQVkVzZokyd