# Giới thiệu
Anh em làm về IT thì biết rồi đấy, công nghệ mới thay đổi liên tục từng giây. Nhiều khi chưa kịp làm chủ công nghệ này thì đã có công nghệ khác tốt hơn và tối ưu hơn rồi.Tất nhiên, việc chạy theo công nghệ không phải lúc nào cũng tốt, nhưng ngược lại, cứ khư khư mãi một công nghệ cũ cũng là không nên.Mà công nghệ mới thường được phát triển dựa trên các ngôn ngữ lập trình khác nhau, nó được cập nhật hàng tuần chứ không muốn nói là hàng ngày.Chính vì vậy, việc học một ngôn ngữ lập trình (ở mức cơ bản, nắm được cú pháp, biết cách dùng) đôi khi sẽ giúp bạn làm chủ công nghệ được nhanh hơn.Sau đây mình sẽ chia sẻ những kiến thức cơ bản mà mình mới chuyển qua PHP gặp phải.

## Tìm hiểu nhưng cú pháp và lệnh cơ bản: 

1. Xuất dữ liệu ra màn hình bằng lệnh **echo** và **print**:

    Với PHP, có hai cách để xuất dữ liệu ra màn hình đó là **echo** và **print**.
    Lệnh **echo** và **print** khá giống nhau cả hai đều dùng để xuất dữ liệu ra màn hình, có một vài sự khác biệt nho nhỏ là : 
    * **echo** không trả về giá trị trong khi đó **print** trả về giá trị là 1 nên có thể sử dụng trong biểu thức 
    * có thể truyền nhiều đối số vào **echo** (mặc dù việc như vậy là hiếm) trong khi đó **print** chỉ có thể truyền 1 đối số
    * **echo** thì nhanh hơn **print** một chút.

2. Quy tắc đặt tên biến trong PHP:
    * Biến bắt đầu bằng ký hiệu $, theo sau là tên của biến.
    * Các biến PHP phải bắt đầu bằng chữ cái hoặc dấu gạch dưới.
    * Biến PHP không thể bắt đầu bằng số và ký tự đặc biệt.
    * Tên biến chỉ có thể chứa ký tự chữ và số và dấu gạch dưới (Az, 0-9 và _).
    * Tên biến phân biệt chữ hoa chữ thường ($age và $AGE là hai biến khác nhau)
    
     ví dụ như sau : 
     ```php
         <?php
             $a = "hello"; //bắt đầu bằng chữ cái (hợp lệ)
             $_b = "hello"; //bắt đầu bằng dấu gạch dưới (hợp lệ)
             echo "$a <br/> $_b";  
         ?>
     ```
    
3. Hằng số trong PHP     

    Hằng số trong PHP là tên hoặc mã định danh không thể thay đổi trong khi thực thi chương trình. Các hằng số PHP có thể được định nghĩa theo 2 cách là sử dụng hàm **define()** và sử dụng từ khóa **const**.    
    Các hằng số trong PHP tuân theo các quy tắc tương tự như biến PHP. Ví dụ: chỉ có thể bắt đầu bằng chữ cái hoặc dấu gạch dưới.
    Thông thường, hằng số PHP nên được định nghĩa bằng chữ in hoa.
    
    ***ví dụ :***
    ```php
        <?php
            define("MESSAGE", "Hello PHP");
            echo MESSAGE;
        ?>
    ```
    ```php
        <?php
            const MESSAGE="Hello const PHP";
            echo MESSAGE;
        ?>
    ```
   
4. Hàm(function) trong PHP:

    Các hàm trong PHP thực sự góp phần tạo nên sự mạnh mẽ của ngôn ngữ lập trình PHP, nó có hơn 1000 hàm tích hợp sẵn.Bên cạnh các hàm PHP có sẵn, chúng ta có thể tạo các     hàm riêng của chúng ta.<br/>
    Một hàm là một khối các câu lệnh có thể được sử dụng nhiều lần trong một chương trình.<br/>Một hàm sẽ không thực thi ngay lập tức khi một trang tải.<br/>Một hàm sẽ được thực thi bằng một cuộc gọi đến hàm.
    
    ***Tạo một hàm do người dùng định nghĩa trong PHP***<br/>
    <br/>Khai báo hàm do người dùng định nghĩa bắt đầu bằng từ **function**:
    <br/>cú pháp:<br/>
     ```php
         function functionName() {
           // code được thực thi
         }
     ```
     Lưu ý: Tên hàm có thể bắt đầu bằng một chữ cái hoặc dấu gạch dưới (không phải là số).<br/>
     Ví dụ:<br/>
      Trong ví dụ dưới đây, chúng ta tạo ra một hàm có tên là "writeMsg()". Dấu ngoặc nhọn mở ({) cho biết sự khởi đầu của mã hàm và dấu ngoặc nhọn đóng (}) cho biết kết thúc hàm. Chức năng xuất ra "Hello world!". Để gọi hàm, chỉ cần viết tên của nó:
      ```php
          <?php
            function writeMsg() {
                echo "Hello world!";
             }
            writeMsg(); // gọi hàm
         ?>
      ```
    Kết quả:
    ```
        Hello world!
    ```
    **Các đối số của hàm trong PHP**
    
    Dữ liệu có thể được chuyển đến các hàm thông qua các đối số. Một đối số giống như một biến.Các đối số được xác định sau tên hàm, bên trong dấu ngoặc đơn. Bạn có thể thêm bao nhiêu đối số tùy thích, chỉ cần tách chúng bằng dấu phẩy.<br/>
Ví dụ sau có một hàm với một đối số ($name) và hiển thị đối số đó lên màn hình:
    ```php
        <?php
            function showName($name) {
            echo "$name <br>";
            }

            showName("Cong");
            showName("Dung");
            showName("Ngon");
            showName("Hanh");
        ?>
    ```
    Kết quả:
    ```
    Cong 
    Dung 
    Ngon 
    Hanh
    ```
    
    **Đối số có độ dài biến đổi trong PHP**
    
    PHP hỗ trợ chức năng đối số có độ dài biến đổi. Nó có nghĩa là bạn có thể chuyền 0, 1 hoặc n đối số trong hàm. Để làm như vậy, bạn cần sử dụng 3 dấu ba chấm (...) trước tên đối số.<br/>
    Khái niệm 3 dấu chấm được thực hiện cho đối số có chiều dài thay đổi kể từ PHP 5.6.

    Ví dụ:
    ```php
        <?php
            function add(...$numbers) {
                $sum = 0;
                foreach ($numbers as $n) {
                    $sum += $n;
                }
                return $sum;
            }

            echo add(1, 2, 3, 4);
        ?>
    ```
    Kết quả:
    ```
        10
    ```
5. Câu lệnh include và require trong PHP

    Câu lệnh **include** và **require** trong PHP được sử dụng để chèn nội dung của file php này vào file php khác.Việc chèn nội dung file là rất hữu ích khi bạn muốn chèn các dòng code php, html giống nhau vào nhiều trang khác nhau.<br/>
Câu lệnh include và require là giống nhau, trừ trường hợp bị lỗi:
    * require: sẽ tạo ra lỗi nghiêm trọng (E_COMPILE_ERROR) và dừng tập lệnh.
    * include: sẽ chỉ tạo cảnh báo (E_WARNING) và tập lệnh sẽ tiếp tục.<br/>
    
    Vì vậy, nếu bạn muốn chương trình tiếp tục được thực thi và hiển thị đến người dùng, ngay cả khi file được chèn vào bị thiếu, hãy sử dụng câu lệnh include. Nếu không, trong trường hợp FrameWork, CMS hoặc ứng dụng PHP phức tạp, hãy luôn sử dụng câu lệnh require để chèn một file là bắt buộc tới luồng thực thi. Điều này sẽ giúp tránh ảnh hưởng đến tính bảo mật và tính toàn vẹn của ứng dụng.<br/>
    Include các file tiết kiệm rất nhiều công sức. Điều này có nghĩa là bạn có thể tạo file header.php, footer.php hoặc menu.php cho tất cả các trang web của mình. Sau đó, khi cần cập nhật phần tiêu để của trang, bạn chỉ cần cập nhật file header.php.
    
    Cú pháp:
    ```php
        include 'filename';
        hoặc
        require 'filename';
    ```
    **include** vs **Require**
    
    Câu lệnh require cũng được sử dụng để bao gồm một file vào mã PHP.

    Tuy nhiên, có một sự khác biệt lớn giữa include và require, khi một file được chèn bằng lệnh include và PHP không thể tìm thấy nó, tập lệnh sẽ tiếp tục thực thi:
    ```php
        <html>
            <body>
                <h1>Welcome to Sun*</h1>
                <?php include 'file_khong_ton_tai.php';
                echo "Xe $car có màu $color.";
                ?>
            </body>
        </html>
    ```
    Kết quả:
    ```
    
    
    ```
    Nếu chúng ta làm ví dụ tương tự bằng cách sử dụng lệnh require, câu lệnh echo sẽ không được thực thi vì việc thực thi tập lệnh chết sau khi lệnh require trả về một lỗi nghiêm trọng:
    ```php
        <html>
            <body>
                <h1>Welcome to Sun*!</h1>
                <?php require 'file_khong_ton_tai.php';
                echo "Xe $car có màu $color.";
                ?>
            </body>
        </html>
    ```
    Kết quả:
    ```
        Welcome to Sun*!
    ```
   
6.  Câu lệnh include_once và require_once trong PHP
  
      Chúng ta đã học về cách chèn file PHP và file PHP khác trong bài Câu lệnh include và require trong PHP. Trong bài viết này, chúng ta sẽ thảo luận về hai lệnh hữu ích hơn nữa chúng là các câu lệnh include_once và require_once trong PHP.<br/>
    Câu lệnh include_once và require_once là giống nhau, trừ trường hợp bị lỗi: /p>
    
       * require: sẽ tạo ra lỗi nghiêm trọng (E_COMPILE_ERROR) và dừng tập lệnh.
       *  include: sẽ chỉ tạo cảnh báo (E_WARNING) và tập lệnh sẽ tiếp tục.

    **Lệnh include_once() trong PHP**
    
       Lệnh require_once() có thể được sử dụng để chèm một tập tin php trong một số tập tin khác, khi bạn có thể cần phải bao gồm các tập tin được gọi nhiều hơn một lần. Nếu nó đã được chèn vào rồi, thì những vị trí chèn sau sẽ bỏ qua.<br/>
       File : x.php
       ```php
           <?php
                echo "Hôm nay là:".date("Y-m-d");
            ?>
       ```
       File x.php được sử dụng 2 lần với lệnh include_once() để chèn vào file z.php. Nhưng file thứ 2 sẽ bị bỏ qua.<br/>
       File: y.php
       ```php
           <?php
                echo "Chèn x.php lần 1: ";
                include_once('x.php');
                echo "</br>";
                echo "Chèn x.php lần 2: ";
                include_once('x.php');
            ?>
       ```
       Kết quả:
       ```
            Chèn x.php lần 1: Hôm nay là:2018-09-01
            Chèn x.php lần 2:
       ```
       Nếu lệnh require_once() không tìm thấy file được chèn thì hệ thống hiển thị cảnh báo không tìm thấy file được chèn, và tiếp tục thực thi các câu lệnh tiếp theo.
       
       **Lệnh require_once() trong PHP**
       
       Lệnh require_once() có thể được sử dụng để chèm một tập tin php trong một số tập tin khác, khi bạn có thể cần phải bao gồm các tập tin được gọi nhiều hơn một lần. Nếu nó đã được chèn vào rồi, thì những vị trí chèn sau sẽ bỏ qua.
       
       **Cú pháp:**
       ```php
           require_once('filename');
       ```
       ***Ví dụ:***

       File: x.php
       ```php
           <?php
                echo "Hôm nay là:".date("Y-m-d");
            ?>
       ```
       File x.php được sử dụng 2 lần với lệnh require_once() để chèn vào file y.php. Nhưng file thứ 2 sẽ bị bỏ qua.
       
       File: y.php
       ```php
           <?php
                echo "Chèn x.php lần 1: ";
                require_once('x.php');
                echo "</br>";
                echo "Chèn x.php lần 2: ";
                require_once('x.php');
            ?>
       ```
       Kết quả:
       ```
            Chèn x.php lần 1: Hôm nay là:2018-09-01
            Chèn x.php lần 2:
       ```
       Nếu lệnh require_once() không tìm thấy file được chèn thì chương trình sẽ bị dừng lại.
       
#       Kết luận

Bài viết cũng khá dài mình cũng đã giới thiệu với các bạn những cú pháp cơ bản mà khi các bạn từ ngôn ngữ khác chuyển qua sẽ cảm giác khá mới lạ .Trong bài tiếp theo mình sẽ giới thiệu với các bạn những thứ mà mình đã trải nghiệm khi mới chuyển qua PHP nhé . Cảm ơn các bạn đã đọc đến đây =))