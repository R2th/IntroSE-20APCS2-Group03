Nếu bạn là một Android Developer thì chắc hẳn đã nghe hay sử dụng Kotlin rồi, nhưng bạn đã thực sự hiểu rõ và có hứng thú để học và xây dựng ứng dụng Android với Kotlin chưa.

Ở bài này mình sẽ chia sẻ một vài thông tin có thể sẽ hữu ích với nhũng người bắt đầu học Kotlin mà mình lượm nhặt được trên Internet :").

# Kotlin là gì ?
Đầu tiên ta phải biết Kotlin là cái gì đã:

> Kotlin là một ngôn ngữ lập trình mới từ JetBrains. Nó xuất hiện lần đầu tiên vào năm 2011 khi JetBrains công bố một dự án mới có tên là "Kotlin". Giống như Swift, Kotlin là một ngôn ngữ mã nguồn mở.
>

Mặc dù đúng là đa số các ứng dụng Android được viết bằng Java, nhưng khi nói đến phát triển Android, Java không phải là lựa chọn duy nhất của bạn.

Bạn có thể viết các ứng dụng Android bằng bất cứ ngôn ngữ nào có thể biên dịch và chạy trên máy ảo Java (JVM). Và Kotlin là một trong những ngôn ngữ lập trình tương thích với JVM đã thực sự gây sự chú ý cho cộng đồng Android, Kotlin đang ngày một phổ biến hơn và có thể sẽ thay thế Java trong việc phát triển ứng dụng Android trong tương lai.


-----


**Giống như Java, C, và C++, Kotlin cũng là một ngôn ngữ kiểu tĩnh - statically typed programming language.** 

Ngôn ngữ kiểu tĩnh là những ngôn ngữ mà các variable cần phải định danh trước khi được sử dụng. Có nghĩa là variable cần phải khai báo và khởi tạo trước.
 
 Về cơ bản thì kiểu Static typing không có nghĩa là chúng ta cần phải khai báo toàn bộ variable trước tiên. Chúng có thể được khởi tạo ở bất cứ đâu trong ứng dụng và các lập trình viên phải làm việc đó, để sử dụng những variable ở nơi mà mình cần.
```kotlin
/* Java Code */
int num1, num2; 
num1 = 20; 
num2 = 30;
/* Kotlin Code*/
val a: Int
val b: Int
a=5
b=10
```

# **Những điểm nổi bật:**
* ##  Ngắn gọn:
     Giảm đáng kể số lượng mã s bạn cần phải viết

    Tạo một Object với các phương thức getters, setters, equals(), hashCode(), toString() and copy() chỉ trong một dòng code:


    ```kotlin
    data class Customer(val name: String, val email: String, val company: String)
    ```


    Hoặc lọc danh sách sửa dụng biểu thức lambda: 


    ```kotlin
    val positiveNumbers = list.filter { it > 0 }
    ```


    Bạn muốn singleton? Tạo một Object:

    ```kotlin 
    object ThisIsASingleton {
        val companyName: String = "JetBrains"
    }
    ```
* ##  An toàn:
    **Tránh toàn bộ các lớp lỗi như NullPointerException**.

    Loại bỏ những NullPointerExceptions phiền toái:

    ```kotlin
    var output: String
    output = null   // Lỗi compile
    ```
    Trong Lotlin phân biệt giữa những tham chiếu có thể null và những tham chiếu không thể:
    

    ```kotlin
    var a: String = “abc”
    a = null // compile error
    ```
    
    Để cho phép null, bạn có thể khai báo một biến là chuỗi rỗng, được viết bằng String ?:
    
   
    ```kotlin
    var b: String? = “abc”
    b = null // ok
    ```
    
    Kotlin bảo vệ bạn khỏi việc sử dụng các kiểu nullable


    ```kotlin
    val name: String? = null    // Kiểu Nullable 
    println(name.length())      // Lỗi compile
    ```

    Và nếu bạn kiểm tra kiểu của đối tượng, trình biên dịch sẽ tự động tạo nó cho bạn

    ```kotlin
    fun calculateTotal(obj: Any) {
        if (obj is Invoice)
            obj.calculateTotal()
    }
    ```

* ##  Đa năng:
    
    Xây dựng các ứng dụng phía server, ứng dụng Android hoặc  front-end  chạy trong trình duyệt.
    ![](https://images.viblo.asia/e4ec1899-4eb1-4126-bf9c-1cfeb0045c31.jpeg)
    Kotlin biên dịch tới JVM bytecode hoặc JavaScript, viết mã trong Kotlin và quyết định nơi bạn muốn triển khai :
    ```kotlin
    import kotlin.browser.window

    fun onLoad() {
        window.document.body!!.innerHTML += "<br/>Hello, Kotlin!"
    }
    ```
* ##  Tương thích: 
    Tận dụng các Framework và thư viện hiện có của JVM với khả năng tương tác Java 100%. Thậm chí có code Java và Kotlin tồn tại song song trong cùng dự án, và tất cả mọi thứ vẫn sẽ được biên dịch một cách hoàn hảo


    Điểm đặc biệt về Kotlin là nó có thể dễ dàng kết hợp với Maven, Gradle và các hệ thống build khác.

     Tất cả mọi thứ bạn có thể làm với Java, bạn có thể làm trong Kotlin. Nếu bạn không biết làm thế nào để làm điều đó trong Kotlin, bạn chỉ cần làm điều đó trong Java và để cho các plugin Kotlin chuyển nó sang Kotlin.
    
* ##   Công cụ dễ sửu dụng:
  Chọn bất kỳ Java IDE hoặc xây dựng từ Command line
  
  ![](https://images.viblo.asia/709dfd3a-bdbc-443f-9872-77adfc719a2f.png)
  ![](https://images.viblo.asia/caddadf2-95af-4d26-857f-456c181f2379.png)
      


* ##  Được hỗ trợ chính thức bởi Google
    
Google đã công bố hỗ trợ chính thức cho Kotlin tại Google I/O vào tháng 5 năm 2017:
 > *Koitlin là một ngôn ngữ được thiết kế một cách thông minh, vững chắc, chúng tôi tin rằng sẽ làm cho việc phát triển Android nhanh hơn và thú vị hơn ... Hơn nữa, rất nhiều  lập trình viên đã nói với chúng tôi rằng họ yêu thích Kotlin... Cộng đồng Android lên tiếng và chúng tôi lắng nghe.*>
 > 
và tại Google I/O năm 2018:
> *35% các nhà phát triển chuyên nghiệp sử dụng Kotlin… ngày càng có nhiều sự phát triển Android sắp tới với Kotlin và chúng tôi cam kết lâu dài`*
    > 

Cam kết của Google có nghĩa là Android Studio 3.0 hỗ trợ đầy đủ sự phát triển của Kotlin, vì vậy bạn có thể bắt đầu mà không cần phải tìm hiểu một công cụ mới. Bạn có thể chuyển đổi giữa mã Java và Kotlin thông qua một lần nhấp nút đơn giản trong Android Studio.

![](https://images.viblo.asia/ff6c6e05-61cd-4c10-a940-777f77b06239.png)

Kotlin được phát triển bởi JetBrains, công ty đứng sau IntelliJ—IDE mà Android Studio dựa trên nó. Không có gì bất ngờ, rằng Android Studio hỗ trợ tốt cho Kotlin. Một khi bạn đã cài đặt plugin Kotlin, Android Studio làm cho việc cấu hình Kotlin trong dự án của bạn trở nên đơn giản giống như mở một vài menu.

Một khi bạn đã thiết lập plugin Kotlin cho Android Studio, IDE của bạn sẽ không gặp vấn đề gì việc hiểu, biên dịch và chạy code Kotlin. Android Studio cũng cung cấp việc gỡ lỗi, tự động hoàn tác, điều hướng code, unit testing, và tái cấu trúc cho Kotlin.

![](https://images.viblo.asia/203b83b2-a3de-4e4c-a6bd-b3b40a6db3aa.jpeg)

* ## Biểu thức Lambda
    Một biểu thức lambda đại diện cho một hàm ẩn danh. Lambda là một cách tuyệt vời để giảm thiểu số lượng code cần thiết để thực hiện một số tác vụ phát sinh tại mọi thời điểm trong phát triển Android—ví dụ như viết listener và callback
    
    Java 8 đã giới thiệu các biểu thức lambda gốc và chúng giờ đây được hỗ trợ trong Android Nougat. Hơn nữa, nếu bạn đang làm việc trên một dự án có chứa cả code Kotlin lẫn Java, thì bạn có thể sử dụng các biểu thức lambda trên toàn bộ dự án của bạn!
    
    Một biểu thức lambda bao gồm một tập hợp các tham số, một toán tử lambda (->) và thân hàm, được sắp xếp theo định dạng sau:
    
    ```kotlin
    { x: Int, y: Int -> x + y }
    ```
    
    
    Khi xây dựng biểu thức lambda trong Kotlin, bạn cần phải tuân theo các quy tắc sau:

    * Biểu thức lambda nên được bao quanh bởi các dấu ngoặc nhọn.

    *   Nếu biểu thức có chứa bất kỳ tham số nào, thì bạn cần phải khai báo chúng phía trước biểu tượng mũi tên `->`.

    * Nếu bạn đang làm việc với nhiều tham số, thì bạn nên tách chúng bằng dấu phẩy.

    *   Phần thân theo sau dấu `->`.
 
  
    Lợi ích chính của biểu thức lambda đó là chúng cho phép bạn định nghĩa các hàm ẩn danh và sau đó chuyển các hàm này ngay lập tức dưới dạng một biểu thức. Điều này cho phép bạn thực hiện nhiều tác vụ phát triển thông dụng một cách ngắn gọn hơn.
    
    Chúng ta hãy tìm hiểu một ví dụ: thêm một click listener vào một nút. Trong Java 7 trở về trước:
    
    ```java
    button.setOnClickListener(new View.OnClickListener() {

       @Override
       public void onClick(View v) {
           Toast.makeText(this, "Button clicked", Toast.LENGTH_LONG).show();
       }
    });
    ```
    
    Tuy nhiên, hàm lambda trong Kotlin cho phép bạn thiết lập một click listener bằng một dòng code:



    ```kotlin
    button.setOnClickListener({ view -> toast("Button clicked") })
    ```
    
* ##     Một số tính năng khác
    * Nó có một hệ thống generics tốt hơn (mẫu), theo đó thông tin không bị mất mát.
    * Thuộc tính delegated
    * Lazy loading
    * Dependency injection đơn giản
    * Các lớp theo mặc định là  không thể mở rộng


# Một số nhược điểm
* Các phương thức tĩnh hoạt động khác nhau (Nhưng: điều này không có tác động đến việc thực hiện cuối cùng), và các lớp theo mặc định không thể mở rộng, điều này làm cho việc kiểm thử trở nên khó khăn hơn.
* Plugin IDE Kotlin đôi khi không ổn định
* Kotlin StdLib đóng góp vào số lượng phương thức
* Có 6317 phương pháp cho các phương pháp StdLib và 11423 cho thư viện Reflection
* Compilation mất nhiều thời gian hơn

# Kết luận




-----



**Tài liệu tham khảo**

https://blog.mindorks.com

https://viblo.asia

https://code.tutsplus.com