Hế lô anh em!

Một chương trình Java là một chuỗi các lệnh được thực thi theo một thứ tự nhất định. Chính vì theo một thứ tự nhất định nên chương trình Java sẽ có bắt đầu và kết thúc.

![](https://images.viblo.asia/3a7e9bd3-36df-4aae-8829-f3dc610c892f.png)

Để thực thi một chương trình Java cần phải đánh dấu cho máy ảo Java (JVM - Java Virtual Machine) biết nơi bắt đầu thực thi chương trình. Trong Java, tất cả các câu lệnh (statements), hướng dẫn (instructions), mã (code) đều phải được đặt bên trong những class.

Nói chung là class sẽ bao ngoài tất cả, class chính là một cách để đóng gói dữ liệu và những phương thức lại với nhau. Do đó một class có thể bao gồm cả biến (variables) và phương thức (methods). Một biến có thể bao gồm dữ liệu (data) và một phương thức là một tập hợp các hoạt động (operations) trên dữ liệu đó.

Bài viết hôm nay mình sẽ cùng anh em "nghịch" phương thức main() trong Java xem sao nhé!

Okay, bắt đầu thôi!
# Khai báo một Java Class.
Trước tiên chúng ta hãy xem một class trong Java được khai báo như thế nào. Một Java class bình thường, không có biến, không có phương thức sẽ được khai báo như sau:

```JAVA
public class HelloJava {  
      
} 
```

Lưu ý rằng tên của class bắt buộc phải trùng với tên file. Trong trường hợp này class của mình tên là HelloJava thì tên file tương ứng phải là HelloJava.java.

Đây chính là quy tắc để trình biên dịch Java (Java compiler) có thể biên dịch chương trình.

Người ta khuyến khích nên đặt những Java class bên trong những Java package. Về bản chất Java package chỉ là những thư mục trong máy tính nhóm những file Java lại với nhau.

![](https://images.viblo.asia/539d0939-5c68-4645-b11d-d95df342b616.png)

**Note 1:** Khi file .java nằm trong một package nào đó thì trong file .java đó bạn phải đánh dấu package chứa file .java đó như ảnh bên trên.

# Phương thức main()

Giống như C/C++ bắt đầu thực thi chương trình trong hàm main() thì Java cũng vậy. Một chương trình Java cần một hàm main() để khởi chạy.

Chúng ta có thể chọn tên class để thực thi và khi đó hàm main() sẽ luôn luôn được gọi trước. Phương thức main() trong Java được đặt bên trong một class và được khai báo với cú pháp **bắt buộc** như hình bên dưới. Thứ duy nhất anh em có thể thay đổi đó là tên tham số truyền vào!

![](https://images.viblo.asia/4d1fc7ce-33f3-431b-a1b8-0c38868b0496.png)

**(1)** - Là các keyword bắt buộc **public, static, void**. Anh em sẽ không thể đổi tên, đổi kiểu hay bỏ những keyword này nếu muốn định nghĩa đó là hàm main().

**public**: Chế độ truy cập (access modifier) ở chế độ công khai giúp trình biên dịch của Java có thể gọi hàm ở bất cứ đâu trong ứng dụng.

**static**: Khi ứng dụng Java được khởi chạy thì chưa có một object nào được tạo ra. Mà hàm main sẽ chạy đầu tiên nên cần để là static để chương trình có thể gọi hàm main khi chưa có object nào được khởi tạo.

**void**: Hàm main() sẽ không trả về bất cứ thứ gì bởi vì khi hàm main() kết thúc cũng là lúc chương trình Java kết thúc. Nếu cố tình trả về sẽ bị lỗi error: **incompatible types: unexpected return value**

![](https://images.viblo.asia/4981412c-b240-4ff3-ad86-4efb33cefae3.png)

**(2)** - Là tên hàm, các bạn cũng không được phép thay đổi tên hàm main(). Bắt buộc phải là "main", cố tình thay đổi cũng sẽ lỗi.

![](https://images.viblo.asia/f5af41fb-a60d-4afd-899a-dc8dd1d0cbbb.png)

**(3)** - Hàm main() chỉ chứa một tham số duy nhất đó làm một mảng String. Đây gọi là các tham số dòng lệnh (command line agruments). Chúng ta có thể đổi tên tham số truyền vào, ví dụ: String[] arguments, String[] stringArray, String[] params... Miễn đó là một mảng String.

# Chạy hàm main() trong Java.
Nếu sử dụng các IDE như Netbeans, Eclipse, InteliJ Idea thì việc chạy một chương trình có hàm main() là rất đơn giản. Các bạn chỉ cần nhấn vào các nút biên dịch tương ứng của từng IDE là xong (nên nhiều bạn không biết chương trình Java được biên dịch như thế nào. Mà có cần thiết phải biết không ta? :) đi làm mấy ai để ý đâu! theo các bạn thì sao??)

Trong bài viết này mình sẽ cùng các bạn chạy chương trình Java chứa hàm main() bằng lệnh (command line). Đây là chương trình HelloWorld đơn giản, mình sẽ in ra các giá trị trong mảng String được truyền vào bằng command line.

```JAVA
public class HelloWorld {  
    public static void main(String[] args) {  
        for(String s: args){  
            System.out.println(s);  
        }  
    }  
}  
```

+ Chạy lệnh javac <filename>.java để biên dịch file .java thành file .class
    
       -> Trong ví dụ này mình sẽ chạy như sau: javac HelloWorld.java
+ Tiếp tục chạy lệnh: java <filename> <prams list>
    
       -> Trong ví dụ này mình sẽ chạy như sau: java HelloWorld "Hello Java" "I love to code Java". Mình truyền hai tham số vào mảng String đó là "Hello Java" và "I love to code Java". Và chương trình sẽ in ra như sau.
    
![](https://images.viblo.asia/5d7c5a8f-a795-4352-bab9-c1e377e520eb.png)
    
Đây chính là ý nghĩa cũng như cách bạn truyền tham số cho hàm main. Qua đó giúp chúng ta hiểu hơn về cách hàm main() trong Java hoạt động ra sao. Vì là tham số dòng lệnh (command line agruments) nên bạn chỉ có thể truyền từ dòng lệnh. Đây chính là sơ đồ quá trình thực thi.

![](https://images.viblo.asia/230b8e04-a2aa-4cfc-aede-02bb4f6f251b.png)

**Note 2**: Một Java class chỉ có thể có duy nhất một hàm main(). Nhưng mỗi Java class trong ứng dụng về lý thuyết có thể chứa một hàm main(), tức là ứng dụng có thể có nhiều hàm main trong các class khác nhau.
Nhưng chúng ta không thể gọi nhiều hàm main một lúc, chỉ có cách hàm main() này gọi hàm main() khác và những hàm này sẽ được thực thi theo thứ tự.
    
# Kết luận:
Vậy là trong bài viết này mình đã cùng các bạn đi vào chi tiết cấu trúc cũng như các quy tắc của hàm main() trong Java. Tuy chỉ là những kiến thức rất đơn giản song mình nghĩ không phải bạn nào cũng để ý.
Mình hi vọng bài viết sẽ giúp các bạn phần nào hiểu hơn về cách thức hàm main() nói riêng và cách một chương trình Java được thực thi, biên dịch. Nếu bài viết còn thiếu sót mong các bạn đóng góp ý kiến nha. Thanks all!