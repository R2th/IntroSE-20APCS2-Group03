# **1.Introduction**
**PhpStorm** là một **IDE thần thánh** được sử dụng phổ biến nhất hiện nay bởi cộng đồng các lập trình viên **PHP** trên toàn thế giới. 

**PhpStorm** giúp lập trình viên tạo và chỉnh sửa mã nguồn bất kể ngôn ngữ lập trình mà họ đang sử dụng. Như bất kỳ trình soạn thảo IDE khác, nó đi kèm với các tính năng cơ bản như đánh dấu trang, hoàn thành mã, phóng to thu nhỏ, các điểm ngắt....

Tuy nhiên, nó có chứa các tính năng khác nhau như các **macro**, **git**, **terminal**, **database**, phân tích mã và nhanh chóng chuyển hướng để làm cho công việc của bạn dễ dàng hơn nhiều.
# **2.Tips**
* **Working with If and Switch Statements**

    **PhpStorm** cho phép bạn chuyển đổi một khối **if** thành **switch** và ngược lại.
    Bạn chỉ cần đặt con trỏ trước khối lệnh và nhấn **Alt+Enter**, sau đó chọn **Replace 'if with switch'**.
 
     ![](https://images.viblo.asia/a545f601-a180-4d99-a720-6fe0aa3caec5.png)
  
 * **Joining Lines**
 
     Chọn các dòng cần join và nhấn **Ctrl + Shift + J** để nối dòng bên dưới con trỏ vào cuối dòng hiện tại.
   
 * **Split A String Across Two Lines**
 
    Để chia một chuỗi thành nhiều dòng, đặt con trỏ ở bất cứ đâu trong chuỗi và nhấn **Ctrl + Enter**.
    
    `<?php
echo "Today is Monday. " .
    "Clean your house.";
?>`

 * **Code Completion Inside Comments**
 
    Để Comments function bạn đặt con trỏ phía trên function và nhấn /*  rồi **enter**, sau đó gõ từ đầu tiên của tên function đó rồi nhấn **Ctr+Space**
   
   ![](https://images.viblo.asia/e3679c1c-7d6a-4df5-ad58-48be29625f96.png)
   
  * **View Documentation on php.net**
  
      Để link đến tài liệu trực tiếp hàm **str_replace** trên trang php.net., bạn đặt con trỏ trong hàm và nhấn **Shift + F1**. 
  
      `str_replace('you', 'He', 'You are really a nice person, Have a nice time');`
  
  
   * **Testing Regular Expressions**

       Với **PHPStorm**, bạn có thể kiểm tra các biểu thức  **Regular Expressions** thông thường mà không cần phải rời khỏi nó.
   
       `<?php
            preg_match('\d+', '12345');
        ?>`

       Di chuyển con trỏ vào pattern **\d** nhấn **Alt+Enter**, sau đó chọn  **Inject language or reference** và chọn **RegExp (Regular Expression)** để cho phép xác định biểu thức chính quy.
   
       ![](https://images.viblo.asia/2e1dd75d-5f71-4884-8fe3-086da60b16f9.png)
   
       ![](https://images.viblo.asia/12da6d1c-d186-4204-bf84-f72e848bc61c.png)
   
       Sau đó di chuyển con trỏ vào pattern **\d** ( đã đổi màu khác)  nhấn **Alt+Enter**,  chọn **Check RegExp**
   
       ![](https://images.viblo.asia/5b445f77-ebf6-4bd8-9d76-fcbb361487e0.png)
   
       ![](https://images.viblo.asia/99bc95a6-e764-4796-b8f1-bd456bcc00a2.png)
   
  * **Reformatting Source Code**
   
       Đây là 1 chức năng mà có lẽ mình rất thích khi sử dụng IDE này, nó giúp định dạng lại mã nguồn của bạn trông đẹp hơn theo chuẩn **PSR1/PSR2**, bạn chỉ cần nhấn tổ hợp phím này  **Ctr+Alt+L**. Nếu bạn sử dụng hệ điều hành **ubuntu** thì phải set lại **keyboard shortcuts** nhé vì nó trùng với **Lock the screen**.
       
       ![](https://images.viblo.asia/ca9a5d5f-0bff-4620-a6da-13e01f3ca1b8.png)


  * **Browse remote host**

    Nếu bạn muốn debug hay test code trên server thì đây là chức năng tuyệt vời nhất  để làm điều đó, **PHPStorm** hỗ trợ 
    **Browse remote host**  giúp connect trực tiếp  đến server, thao tác thật nhanh chóng và tiện lợi.
    
    Vào **Tools | Deployment | Browse Remote Host** click vào ... và add name server, type kết nối!
    
    ![](https://images.viblo.asia/ef83fb42-757c-4b7c-b0ae-52ea5952e225.png)
    
    Tiếp tục điền đầy đủ thông tin cần thiết vào **Deployment**
    
    ![](https://images.viblo.asia/538314de-41a7-4ebb-bac6-9c541908035a.png)
    
 * **Terminal**
 
     **PhpStorm** cung cấp côg cụ terminal mạnh mẽ nhúng sẵn trong IDE này giúp developer không cần phải chuyển qua sử dụng terminal có trên hệ điều hành. Tiện ích này giúp giảm bớt thời gian chuyển qua lại giữa hai ứng dụng IDE và terminal.
     Để hiển thị terminal bạn nhấn **Alt + F12** hoặc có thể nhấn vào biểu tượng  ở phía dưới màn hình.
     
     ![](https://images.viblo.asia/f60a1656-dc6e-4079-aada-a9af028e2191.png)
     
 * **Database Tools and SQL**

    **PhpStorm** cho phép xử lý dữ liệu trong cơ sở dữ liệu (CSDL) quan hệ và hỗ trợ ngôn ngữ SQL. Các hệ quản trị CSDL được hỗ trợ: MySQL, PostgreSQL, Microsoft SQL Server, Oracle, AWS Redshift, Sybase, DB2, SQLite, HyperSQL, Apache Derby, H2, cung cấp một giao diện xử lý trực quan với nhiều tính năng hữu ích
    
    ![](https://images.viblo.asia/cd08867b-0100-465b-93c4-4fb0b80e20b6.png)
    
 * **Git Integration**
 
    Một plugin tích hợp sẵn khác cho phép thao tác với Git. Tính năng nổi bật và đáng sử dụng nhất có lẽ là Resolve Conflicts, giúp xử lý xung đột khi merge hay rebase nhánh một cách trực quan. Sau khi kích hoạt plugin, các tính năng của plugin sẽ được hiển thị ở mục Git trong tab VCS.
# **2.Conclusion**

Như vậy là tôi đã vừa giới thiệu qua 1 số cách sử dụng PhpStorm hằng ngày của mình, ngoài ra còn rất nhiều chức năng khác nữa, các bạn có thể tham khảo thêm tại đây [Features](https://www.jetbrains.com/phpstorm/features/). Hy vọng các bạn có thể sử dụng chúng một cách hiệu quả để cải thiện tốc độ code của mình!