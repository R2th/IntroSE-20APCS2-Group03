![](https://images.viblo.asia/73120724-1626-4b6e-b9d3-cea9497da754.png)
 Ngày nay , có rất nhiều trang web có chức năng cho phép người dùng tải lên tập tin của họ . Chẳng hạn như facebook ,google drive ,... Điều này giúp cho người dùng có thể lưu trữ hay chia sẻ thông tin của mình với mọi người và  đồng thời mang lại những trải nghiệm sử dụng mang tính cá nhân cao hơn . Đây gần như đã trở thành 1 chức năng không thế thiếu đối với 1 web site . Nhưng điều đó cũng đồng thời đem lại cho trang web những rủi ro bảo mật lớn hơn.
## I. Khái niệm
### 1. Web Shells là gì ?
 **Trước khi tìm hiểu về lỗ hổng File Upload , chúng ta cần phải tìm hiểu web shell là gì ?**
* Theo như định nghĩa của [wikipedia](https://en.wikipedia.org/wiki/Web_shell), thì web shell là 1 dạng mã độc, cửa hậu có nhiều chức năng để hỗ trợ các hacker chiếm quyền quản lý các hệ thống website.WebShell thường được viết bằng nhiều loại ngôn ngữ và thường thì chính là ngôn ngữ mà website đó đang sử dụng. Chức năng cơ bản là tải tệp tin lên máy chủ, kết nối đến cơ sở dữ liệu, vượt qua các cơ chế bảo mật, cấu hình, tấn công bruteforce, Get Root, Local Attack… chỉ cần hacker có thể tải được các tệp tin webshell này lên hệ thống của website thì xem như hacker đã có toàn quyền kiểm soát website đó, cho dù không biết tài khoản và mật khẩu của máy chủ này là gì. WebShell có rất nhiều loại và biến thể khác nhau, không đơn thuần chỉ là 1 tệp tin mà chúng còn được các hacker biến tấu thành nhiều loại để thuận tiện tải các tệp tin khắc lên máy chủ của nạn nhân. 

###   2. File Upload Vulnerabilities 
  Theo như phân tích của wordfence , sau khi phân tích hơn 1599 lỗ hổng trong vòng 14 tháng vào năm 2019 , thì File Upload là loại lỗ hổng phổ biến thứ 3 trong các loại lỗ hổng hiện nay và đồng thời nó cũng được xếp hạng 3 trong OWASP vào năm 2007 và đến năm 2019 theo edgescan, File Upload vẫn giữ được vị trí trong top 10 .
![](https://images.viblo.asia/0cf08d23-6729-403b-b130-d215be638486.png)

 Khác với các loại lỗ hổng khác , File Upload được sử dụng tùy thuộc vào mục đích của người sử dụng . Hacker có thể sử dụng File Upload để nhúng 1 đoạn mã độc lên trang web , điều này có thể dẫn đến việc như là đưa 1 trang lừa đảo lên trang web hoặc là đánh sập , hủy hoại luôn trang web đấy . Ngoài ra , hacker có thể lấy được thông tin nội bộ của máy chủ web và sử dụng nó vào những việc phi pháp như là chiếm đoạt và các hoạt động mua bán thông tin có liên quan .
### 3. Vậy Shell và File Upload có liên quan gì đến nhau ?
 Thông thường, đối với các web site có chức năng upload file VD: Khi ta đăng 1 file ảnh lên 1 trang web. Chúng ta có thể lợi dụng tính năng này để tải shell lên hệ thống . Tuy nhiên , điều này đã được phòng tránh bằng cách sử dụng một số filters để ngăn chặn khả năng tải lên mã độc. Do đó , để có thể khai thác được lỗ hổng này , chúng ta cần phải vượt qua các filters đó , bao gồm :
      
*        Client side filters
*        Content/type Vertification
*        The extension Black listing
*        The extension White listing 
*        The content length and malicious script checks

## II. Khai thác lỗ hổng
### 1. Client Side Filters
 Client Side Filters là một kiểu xác thực các yêu cầu khi được gửi lên máy chủ . Được sử dụng trên những trang web có sử dụng thuộc tính của JavaScript, VBScript hoặc HTML5 . Các lập trình viên thường sử dụng kiểu xác nhận này để mang tới sự phản hồi nhanh hơn cho người dùng. 
  Để bypass qua client side filter , chúng ta có thể sử dụng các cách như : 
  
  *  Tắt javascript của trình duyệt thông qua Developer Tools của Chrome , Firefox
  *  Giả mạo yêu cầu gửi lên ( Proxify the application and tamper the request)
  *  Giả mạo dữ liệu bằng cách sử dụng firefox addon. 
 
 Ví dụ với giả mạo yêu cầu gửi lên : 
 Chúng ta có một trang web có thể tải ảnh lên : 
 ![](https://images.viblo.asia/77b3721b-d95d-40c5-bc49-8fc809ca5df1.png)
 
Ở đây chúng ta có một file shell.php với nội dung bên trong như sau 
![](https://images.viblo.asia/9b5b61ab-5ca9-4d49-8b66-30dbcbd91d54.png)


Tuy nhiên nếu muốn đăng được shell này lên trang web chúng ta phải khiến nó nghĩ rằng chúng ta đã gửi lên đúng định dạng được yêu cầu. Thay đổi extension của file thành shell.php.jpg sau đó sử dụng burp suite để thay đổi request lên server đổi lại tên file thành shell.php :

![](https://images.viblo.asia/538bdc6c-f199-43b4-b3fa-5319cd844052.png)

> Và chúng ta đã upload thành công file lên :

![](https://images.viblo.asia/f38ad7e2-38b9-41d1-ae21-756347a95d36.png)
> Truy cập đường dẫn và chúng ta thu được kết quả : 
> 
![](https://images.viblo.asia/ac27649f-0425-4162-ac4b-8131f24d7871.png)

### 2.Content/type Vertification
 Đây là kiểu xác thực mà nhà phát triển yêu cầu file upload trong trường hợp này bắt buộc phải là kiểu image thì mới được chấp thuận . Tuy nhiên , Content/type lại có thể thay đổi trước khi đến server cho nên chúng ta chỉ cần đổi từ type application/octet-stream sang image/(kiểu định dang ảnh của bạn) ví dụ như là image/jpeg 
 ![](https://images.viblo.asia/7a9ac233-8df0-47bd-b0ee-4adaaf1dd0cd.png)
### 3.The extensions Black listing
 Như cái tên gọi của nó, black list tức là 1 danh sách đen các shell bị  các nhà phát triển web chặn nhằm chống việc tải shell lên trang web. Tuy nhiên cũng giống như cái cách mà các nhà mạng viettel chặn các trang web đen , đó là chúng ta sẽ không bao giờ lọc được hết tất cả các trang web hay là các shell . 
 
 Ví dụ : Nhà phát triển lọc các trang php để không bị đẩy lên server 
* Hacker có thể có thể đổi đuôi extension thành `shell.php1` ,`shell.php2` ,`shell.php3` ,... Và thậm chí shell vẫn có thể chạy với các đuôi như `.pl` hoặc `.cgi`
*  Nếu tất cả các đuôi bạn thử đều đã nằm trong danh sách đen, chúng ta có thể check xem bộ lọc có phân biệt chữ hoa chữ thường không : `shell.Php1`, `shell.PHP2` ,....
*  Đôi khi ,nhà phát triển có thể tạo 1 regex kiểm thử `.jpg` ,vì vậy chúng ta có thể thử cách chồng extension như là `shell.jpg.php`
*  Tuy nhiên , nếu tất cả các bước trên đều thất bại , thì chúng ta vẫn còn 1 khả năng cuối cùng để tải shell lên bằng cách sử dụng `.htaccess` file. Tập tin `.htaccess` (hypertext access) là một file có ở thư mục gốc của các hostting và do apache quản lý, cấp quyền. File `.htaccess` có thể điều khiển, cấu hình được nhiều thứ với đa dạng các thông số, nó có thể thay đổi được các giá trị được set mặc định của apache. 
> ```
> AddType application/x-httpd-php .jpg ( tuỳ thuộc extension bạn chọn)
> ```
   
   
   Câu lệnh này cho phép file ảnh có thể chạy được code `.php`  
   
   
> Link tham khảo [.htaccess](https://www.youtube.com/watch?v=6rhkCtmxHfs)
### 4. The extentions White listing
 Trái ngược với black list , có một số trang web lại yêu cầu bạn bắt buộc phải sử dụng những extension được liệt kê trong white list như là` .jpg` ,` jpeg` , `.gif` ,... Vậy làm như thế nào để vượt qua được nó :scream:
*  Null Byte Injection là một kỹ thuật khai thác trong đó sử dụng các ký tự null byte URL-encoded (ví dụ: 00%, hoặc 0x00 trong hex) được người dùng cung cấp. Một null byte trong các URL được đại diện bởi ‘00%’, trong ASCII là một ” ” (giá trị null ) trong quá trình lây nhiểm . Phần sau %00 sẽ được hiểu là giá trị null , là giá trị kết thúc của chuỗi nên tệp được tải lên với tên là shell.php
>   `shell.php%00.jpg `
* Bypass using Double Extension 
> Trong một số trường hợp , chúng ta có thể sử dụng `shell.php.jpg`,`shell.php;.jpg`,`shell.php:jpg` để thực thi lệnh shell , nhưng lổ hỗng này, thường là do cấu hình của webserver hoặc hệ điều hành . Lỗi của nhà phát triển ở đây , là khi chúng ta tải tệp tin lên mà tên của tệp tin không thay đổi dẫn đến lỗ hổng này 
* Invalid Extension Bypass
> Ngoài ra , vẫn còn 1 số lỗi từ phía máy chủ như là nếu chúng ta sử dụng extension `.test` thì hệ điều hành sẽ không nhận ra . Cho nên chúng ta có thể tải lên tệp shell.php.test và hệ điều hành sẽ bỏ qua `.test` và thực thi shell
### 5. Bypassing the Content Length and Malicious script checks
  Đây là cách ít phổ biến nhất , đối với một số trang web nhất định và thường là khá ít , chúng ta sẽ phải đối mặt với kiểm tra độ dài của file upload . Với những web như vậy , chúng ta sẽ sử dụng những lệnh shell ngắn để bypass như là : 
  > `<?system($_GET[0]);`

## III. Phòng chống
 Đến hiện tại , tấn công thông qua file upload đã không còn thông dụng nữa và hầu hết là rất ít khi xuất hiện , nếu có thì chỉ thông qua các cuộc thi ctf , và một số các trang web có bảo mật kém . Tuy nhiên , chúng ta vẫn luôn cần đề phòng để tránh những hậu quả khó lường mà nó có thể gây ra . Dưới đây là một số cách đơn giản để bạn có thể bảo vệ trang web của mình trước tấn công upload file : 
* Giới hạn các loại tệp mà bạn cho phép tải lên ở những loại cần thiết cho trải nghiệm người dùng
* Sử dụng bộ lọc white list để loại bỏ những extension đem lại rủi ro 
* Ứng dụng sẽ thực hiện việc lọc và kiểm tra nội dung của file được tải lên và loại bỏ trực tiếp nếu phát hiện nguy cơ rủi ro
* Giới hạn quyền của thư mục . Tức là tệp được tải lên sẽ không có bất kì quyền "thực thi" nào đối với ứng dụng,website và tự động loại bỏ nếu có 
* ... 

Ngoài ra bạn có thể tham khảo thêm các cách phòng chống khác trên các trang web tin cậy như :

 * [https://www.owasp.org/index.php/Unrestricted_File_Upload](https://www.owasp.org/index.php/Unrestricted_File_Upload)
* https://www.opswat.com/blog/file-upload-protection-best-practices
* https://www.wordfence.com/learn/how-to-prevent-file-upload-vulnerabilities/