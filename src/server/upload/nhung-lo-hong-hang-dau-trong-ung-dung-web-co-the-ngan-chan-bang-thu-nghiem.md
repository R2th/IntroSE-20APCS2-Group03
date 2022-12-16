**Khi nói về rủi ro không gian mạng, điều đầu tiên chúng ta có thể nghĩ đến là phần mềm độc hại. Tuy nhiên, nhiều cuộc tấn công mạng có liên quan đến ứng dụng.** 
**Lỗ hổng bảo mật luôn là vấn đề đau đầu của các quản trị viên website. Những lỗ hổng này cho phép tin tặc khai thác – tấn công – xâm nhập – vi phạm dữ liệu của website doanh nghiệp.**

**Dưới đây là TOP những lỗ hổng bảo mật web phổ biến nhất theo tiêu chuẩn OWASP:**

### **1. Lỗ hổng Injection (Lỗi chèn mã độc)**

Injection là lỗ hổng xảy ra do sự thiếu sót trong việc lọc các dữ liệu đầu vào không đáng tin cậy. Khi bạn truyền các dữ liệu chưa được lọc tới Database (Ví dụ như lỗ hổng SQL injection), tới trình duyệt (lỗ hổng XSS), tới máy chủ LDAP (lỗ hổng LDAP Injection) hoặc tới bất cứ vị trí nào khác. Vấn đề là kẻ tấn công có thể chèn các đoạn mã độc để gây ra lộ lọt dữ liệu và chiếm quyền kiểm soát trình duyệt của khách hàng.

Mọi thông tin mà ứng dụng của bạn nhận được đều phải được lọc theo Whitelist. Bởi nếu bạn sử dụng Blacklist việc lọc thông tin sẽ rất dễ bị vượt qua (Bypass). Tính năng Pattern matching sẽ không hoạt động nếu thiết lập Blacklist.

* **Cách ngăn chặn lỗ hổng:**

Để chống lại lỗ hổng này chỉ đơn giản là vấn đề bạn đã lọc đầu vào đúng cách chưa hay việc bạn cân nhắc  liệu một đầu vào có thể được tin cậy hay không. Về căn bản, tất cả các đầu vào đều phải được lọc và kiểm tra trừ trường hợp đầu vào đó chắc chắn đáng tin cậy.(Tuy nhiên việc cẩn thận kiểm tra tất cả các đầu vào là luôn luôn cần thiết).

Ví dụ, trong một hệ thống với 1000 đầu vào, lọc thành công 999 đầu vào là không đủ vì điều này vẫn để lại một phần giống như “gót chân Asin”, có thể phá hoại hệ thống của bạn bất cứ lúc nào. Bạn có thể cho rằng đưa kết quả truy vấn SQL vào truy vấn khác là một ý tưởng hay vì cơ sở dữ liệu là đáng tin cậy. Nhưng thật không may vì đầu vào có thể gián tiếp đến từ những kẻ có ý đồ xấu.

Việc lọc dữ liệu khá khó vì thế ta nên sử dụng các chức năng lọc có sẵn trong framework của mình. Các tính năng này đã được chứng minh sẽ thực hiện việc kiểm tra một cách kỹ lưỡng. Chúng ta nên cân nhắc sử dụng các framework vì đây là một trong các cách hiệu quả để bảo vệ máy chủ của bạn.

### 2. Broken Authentication

Đây là nhóm các vấn đề có thể xảy ra trong quá trình xác thực. Có một lời khuyên là không nên tự phát triển các giải pháp mã hóa vì rất khó có thể làm được chính xác.

Có rất nhiều rủi ro có thể gặp phải trong quá trình xác thực:

* URL có thể chứa Session ID và rò rỉ nó trong Referer Header của người dùng khác.
* Mật khẩu không được mã hóa hoặc dễ giải mã trong khi lưu trữ.
* Lỗ hổng Session Fixation.
* Tấn công Session Hijacking có thể xảy ra khi thời gian hét hạn của session không được triển khai đúng hoặc sử dụng HTTP (không bảo mật SSL)...

* **Cách ngăn chặn lỗ hổng:**

Cách đơn giản nhất để tránh lỗ hổng bảo mật web này là sử dụng một framework. Trong trường hợp bạn muốn tự tạo ra bộ xác thực hoặc mã hóa cho riêng mình, hãy nghĩ đến những rủi ro mà bạn sẽ gặp phải và tự cân nhắc kĩ trước khi thực hiện.

### 3. Lỗ hổng XSS (Cross Site Scripting)
![](https://images.viblo.asia/c3715747-4e27-49e0-86f2-7eb060024382.png)

Lỗ hổng XSS (Cross-scite Scripting) là một lỗ hổng rất phổ biến. Kẻ tấn công chèn các đoạn mã JavaScript vào ứng dụng web. Khi đầu vào này không được lọc, chúng sẽ được thực thi mã độc trên trình duyệt của người dùng. Kẻ tấn công có thể lấy được cookie của người dùng trên hệ thông hoặc lừa người dùng đến các trang web độc hại

* **Cách ngăn chặn lỗ hổng:**

Có một cách bảo mật web đơn giản đó là không trả lại thẻ HTML cho người dùng. Điều này còn giúp chống lại HTML Injection – Một cuộc tấn công tương tự mà hacker tấn công vào nội dung HTML – không gây ảnh hưởng nghiêm trọng nhưng khá rắc rối cho người dùng. Thông thường cách giải quyết đơn giản chỉ là Encode (chuyển đổi về dạng dữ liệu khác) tất cả các thẻ HTML.

Ví dụ thẻ <script> được trả về dưới dạng <script&gt>
                                                    
### 4. Security Misconfiguration
                                                     
Trong thực tế, máy chủ website và các ứng dụng đa số bị cấu hình sai. Có lẽ do một vài sai sót như:
    
* Chạy ứng dụng khi chế độ debug được bật.
* Directory listing
* Sử dụng phần mềm lỗi thời (WordPress plugin, PhpMyAdmin cũ)
* Cài đặt các dịch vụ không cần thiết.
* Không thay đổi default key hoặc mật khẩu
* Trả về lỗi xử lý thông tin cho kẻ tấn công lợi dụng để tấn công, chẳng hạn như stack traces.
                                                     
 * **Cách ngăn chặn lỗ hổng:**
    
 Có một quá trình “xây dựng và triển khai” tốt (tốt nhất là tự động). Cần một quá trình audit các chính xác bảo mật trên máy chủ trước khi triển khai.
    
### 5. Sensitive data exposure (Rò rỉ dữ liệu nhạy cảm)
    
Lỗ hổng này thuộc về khía cạnh crypto và tài nguyên. Dữ liệu nhạy cảm phải được mã hóa mọi lúc, bao gồm cả khi gửi đi và khi lưu trữ – không được phép có ngoại lệ. Thông tin thẻ tín dụng và mật khẩu người dùng không bao giờ được gửi đi hoặc được lưu trữ không được mã hóa. Rõ ràng thuật toán mã hóa và hashing không phải là một cách bảo mật yếu. Ngoài ra, các tiêu chuẩn an ninh web đề nghị sử dụng AES (256 bit trở lên) và RSA (2048 bit trở lên).
    
 Cần phải nói rằng các Session ID và dữ liệu nhạy cảm không nên được truyền trong các URL và cookie nhạy cảm nên có cờ an toàn
    
  * **Cách ngăn chặn lỗ hổng:**
    
*  Sử dụng HTTPS có chứng chỉ phù hợp và PFS (Perfect Forward Secrecy). Không nhận bất cứ thông tin gì trên các kết nối không phải là HTTPS. Có cờ an toàn trên cookie.
* Cần hạn chế các dữ liệu nhạy cảm có khả năng bị lộ của mình. Nếu không cần những dữ liệu nhạy cảm này, hãy hủy nó. Dữ liệu không có không thể bị đánh cắp.
* Không bao giờ lưu trữ thông tin thẻ tín dụng, nếu không muốn phải đối phó với việc tuân thủ PCI. Hãy đăng ký một bộ xử lý thanh toán như Stripe hoặc Braintree.
* Nếu có dữ liệu nhạy cảm mà thực sự cần, lưu trữ mã hóa nó và đảm bảo rằng tất cả các mật khẩu được sử dụng hàm Hash để bảo vệ. Đối với Hash, nên sử dụng bcrypt. Nếu không sử dụng mã hoá bcrypt, hãy tìm hiểu về mã Salt để ngăn ngừa rainbow table attack.
    
 Không lưu trữ các khóa mã hóa bên cạnh dữ liệu được bảo vệ. Việc này giống như khóa xe mà cắm chìa luôn ở đó. Bảo vệ bản sao lưu của bạn bằng mã hóa và đảm bảo các khóa của bạn là riêng tư.
    
### 6. Missing function level access control (lỗi phân quyền)
    
Đây chỉ là sai sót trong vấn đề phân quyền. Nó có nghĩa là khi một hàm được gọi trên máy chủ, quá trình phân quyền không chính xác. Các nhà phát triển dựa vào thực tế là phía máy chủ tạo ra giao diện người dùng và họ nghĩ rằng khách hàng không thể truy cập các chức năng nếu không được cung cấp bởi máy chủ
    
Tuy nhiên, kẻ tấn công luôn có thể yêu cầu các chức năng “ẩn” và sẽ không bị cản trở bởi việc giao diện người dùng không cho phép thực hiện các chức năng này. Hãy tưởng tượng trong giao diện người dùng chỉ có bảng điều khiển/admin và nút nếu người dùng thực sự là quản trị viên. Không có gì ngăn cản kẻ tấn công phát hiện ra những tính năng này và lạm dụng nó nếu không phân quyền.

  * **Cách ngăn chặn lỗ hổng:**
   
Ở phía máy chủ, phải luôn được phân quyền một cách triệt để từ khâu thiết kế. Không có ngoại lệ – mọi lỗ hổng sẽ dẫn đến đủ các vấn đề nghiêm trọng
    
***Reference:***
    
https://testfort.com/blog/top-10-vulnerabilities-in-web-apps-you-can-prevent-with-testing
    
https://techblog.vn/lo-hong-web-ky-thuat-sql-injection
    
https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A2-Broken_Authentication
    
https://owasp.org/www-community/attacks/xss/
    
https://hdivsecurity.com/owasp-security-misconfiguration
    
https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A3-Sensitive_Data_Exposure