# 1. Mô Tả
- Một trong những ví dụ nổi tiếng nhất về lỗ hổng **cross-site scripting** (XSS) là **Myspace Samy Worm** được tạo bởi Samy Kamkar. Vào tháng 10 năm 2005, Samy đã khai thác lỗ hổng XSS trên Myspace, cho phép anh ta lưu trữ một **payload JavaScript** trên hồ sơ của mình. Khi một người dùng đã đăng nhập truy cập vào hồ sơ Myspace của anh ta, **code payload** sẽ thực thi, làm cho những người bạn xem thông tin của Samy trên Myspace sẽ hiển thị văn bản: **“but most of all, samy is my hero”**. Sau đó, mã sẽ tự sao chép vào hồ sơ người xem và tiếp tục lây nhiễm các trang người dùng Myspace khác.
- Sau đó thì Samy đã bị chính phủ bắt và kết tội. Mặc dù worm Samy, là một ví dụ cực đoan, nhưng nó  cho thấy tác động rộng lớn mà lỗ hổng XSS có thể có trên một trang web. Tương tự như những lỗ hổng khác mà chúng ta đã từng đề cập đến, các lỗ hổng XSS thưởng sẽ khiến trình duyệt thực thi các lệnh Javascript không mong muốn. Các mã này sẽ chứa các ký tự đặc biệt bao gồm dấu ngoặc kép `( " )`, ngoặc đơn `( ' )` và dấu ngoặc nhọn `( < > )` . Chúng đặc biệt vì chúng sử dụng trong HTML và Javascript để xác định cấu trúc trang Web. Ví dụ: nếu một trang web không kiểm tra dấu ngoặc nhọn, bạn có thể chèn <script></script> :

    ```html
        <script>alert(document.domain)</script>
    ```

- Khi cac Payload này được gửi đến một trang web và được hiển thị không xác thực, các thể  <script> </ script>  khiến trình duyệt thực thi mã lệnh Javascript bên trong cặp thẻ <script>. Trong trường hợp này, payload sẽ thực thi chắc năng **alert**, tạo ra một pop-up bật lên hiển thị các thông tin tham chiếu đến các **DOM** của **document** bên trong dấu ngoặc đơn và trong trường hợp này , sẽ trả về tên miền của trang web. Nếu payload tđược thực thi trên `https://www.example.com/foo/bar`thì pop-up sẽ hiển thị`www.example.com `.
- Nếu một trang web được kiểm tra các ký tự đặc biệt như trên, chúng sẽ được hiển thị dưới dạng element của HTML. Xem mã nguồn trang web của họ ta có thể thấy họ mã hóa :  `( " )` là `&quot;` hoặc   `&#34;` ,  `( ' )` là `&apos;` hoặc `&39;` , `<` là `&lt;` hoặc `&#60;` và `> ` là  `&gt;` hoặc `&#62;` .

- Sau khi bạn đã tìm thấy lỗ hổng XSS, bạn nên xác nhận tác động của nó vì không phải tất cả các lổ hổng XSS đều giống nhau. Xác nhận tính tác động của một lổ hổng XSS có thể cải thiện tiền thưởng của bạn nếu bạn có báo cáo.
- Ví dụ: lỗ hổng XSS trên trang web không sử dụng cờ `httpOnly` trên cookie rất dễ tấn công lỗ hổng XSS. Nếu không có cờ `httpOnly`, XSS có thể đọc được giá trị cookie của bạn và nếu chúng bao gồm các cookie xác định session, thì có thể đánh cắp session của mục tiêu và truy cập vào tài khoản của người dùng. Bạn có thể alert  `document.cookie` để xác nhận điều này (để biết cookie nào được coi là nhạy cảm với một trang web yêu cầu dùng thử và lỗi trên cơ sở từng trang web). Ngay cả trong trường hợp bạn không có quyền truy cập vào các cookie nhạy cảm, bạn có thể cảnh báo `document.domain` để xác nhận xem bạn có thể truy cập thông tin người dùng nhạy cảm từ DOM hay không và thực hiện các hành động thay mặt cho mục tiêu. XSS có thể không phải là một lỗ hổng cho trang web nếu tên miền chính xác không được cảnh báo.
- Ví dụ: nếu bạn alert `document.domain` từ một <iframe> , JavaScript của bạn có thể vô hại vì nó không thể truy cập cookie, thực hiện các hành động trên tài khoản của người dùng hoặc truy cập thông tin người dùng nhạy cảm từ DOM. Điều này là do các trình duyệt thực hiện một Chính sách Same Origin Policy (SOP) là một cơ chế bảo mật.
- SOP giới hạn cách các documents (D trong DOM) được phép tương tác với các tài nguyên được tải từ nguồn gốc khác. SOP bảo vệ các trang web khỏi những trang web độc hại đang cố gắng khai thác chúng thông qua người dùng.  Ví dụ: nếu bạn truy cập `www.malicious.com` và nó đã yêu cầu GET yêu cầu tới `www.example.com/profile` trong trình duyệt của bạn, SOP sẽ ngăn `www.malicy.com` đọc response từ` www.example.com/profile`. Tuy nhiên,` www.example.com `có thể cho phép các trang web khác tương tác với `cross origin` của nó nhưng điều này thường bị giới hạn ở các websites cụ thể và broad, vì tương tác không hạn chế thường là một sai lầm.
- Nguồn gốc của trang web được xác định bởi giao thức (ví dụ: HTTP hoặc HTTPS), máy chủ lưu trữ (ví dụ: `www.example.com`) và cổng của trang web. Ngoại lệ cho quy tắc này là Internet Explorer, tổ chức để ý đến cổng này là một phần của nguồn gốc lỗ hổng. Dưới đây là một số ví dụ về `origins` và `whether` chúng có được coi là giống như `http://www.example.com` hay không.

    ![](https://images.viblo.asia/d38c6ca9-f0f1-4901-9045-bba634962301.png)
      
- Có một số tình huống trong đó URL sẽ không khớp với origin. Các trình duyệt sẽ xử lý  hai trường hợp này SOP khác nhau: `about: blank ` và `javascript :` . Hai phương án này kế thừa origin của document mở nó. Trường hợp `about: blank` là một phần của lược đồ URL được sử dụng để truy cập từ thông tin hoặc tương tác với chính trình duyệt. Lược đồ URL JavaScript được sử dụng để thực thi JavaScript. URL không cung cấp thông tin về origin của nó, vì vậy hai lược đồ được xử lý khác nhau.

- Khi bạn tìm thấy lỗ hổng XSS, sử dụng `alert(document.domain)` trong bằng chứng khái niệm của bạn là hữu ích vì nó xác nhận origin nơi XSS được thực thi, đặc biệt trong các trường hợp URL hiển thị trong trình duyệt khác với origin mà XSS thực thi chống lại. Đây chính xác là những gì xảy ra khi một trang web mở  URL`javascript:`. Nếu `www.example.com` mở URL `javascript: alert (document.domain)` , địa chỉ trình duyệt sẽ hiển thị `javascript:alert(document.domain)` nhưng  alert sẽ hiện `www.example.com` vì alert kế thừa origin của document trước.
- Mặc dù chúng tôi chỉ đưa ra một ví dụ sử dụng thẻ <script> của HTML để đạt được XSS, nhưng bạn sẽ không thể gửi các thẻ HTML khi bạn tìm thấy một  injection tiềm năng . Trong những trường hợp đó, bạn vẫn có thể gửi các dấu ngoặc đơn hoặc kép vào payload XSS. Điều này vẫn có thể có ý nghĩa tùy thuộc vào nơi  injection của bạn xảy ra. Ví dụ: giả sử, bạn nói rằng bạn có quyền truy cập vào thuộc tính mã giá trị sau:

    ```html
        <input type="text" name="username" value="hacker">
    ```
- Bằng cách injecting một dấu ngoặc kép vào thuộc tính của giá trị, bạn có thể đóng ngoặc đã tồn tại và inject một mã độc hay vào payload XSS. Bạn nên thay đổi giá trị thuộc tính thành " onfocus=alert(document.cookie) autofocus " và kết quả là :

    ```html
        <input type="text" name="username" value="hacker" onfocus=alert(document.cookie) autofocus "">
    ```
 - Thuộc tính `autofocus` là một thuộc tính của thẻ <input>, nó sẽ tự động thực hiện đoạn mã bên trong nếu `input` bị thay đổi. Tuy nhiên `autofocus` sẽ không thể thực hiện được với thẻ <input> kiểu hidden và nếu có nhiều trường sử dụng `autofocus` trong một page. Nếu payload được chạy nó sẽ hiện alert với thông báo `document.cookie`.
 - Tương tự, hãy nói bạn có quyền truy cập vào một biến trong thẻ Javascript. Nếu bạn có thể đưa các dấu ngoặc đơn vào bên trong giá trị biến, bạn có thể kết thúc biến và thực thi mã Javascript của mình.

    ```html
        <script>
            var name = 'hacker';
        </script>
    ```
    
- Ở đây, vì chúng ta kiểm soát giá trị hacker, thay đổi tên biến tành `hacker';alert(document.cookie);''` kết quả là :

    ```html
        <script>
            var name = 'hacker';alert(document.cookie);'';
        </script>
     ```
    
- Việc chèn dấu ngoặc đơn và dấu chấm phẩy sẽ đóng tên biến và vì chúng ta đang ở trong thẻ <script>,  hàm Javascript `alert(document.cookie)`mà chúng ta đưa vào sẽ được thực hiện. Chúng ta add thêm `';`  để kế thúc cuộc gọi hàm và đảm bảo Javascript về đúng mắt cú pháp vì trang web bao gồm `';` để kết thúc tên biến. Không có `';` cuối cùng sẽ có bị sai cú pháp.
- Về mặt thử nghiệm XSS, điều quan trọng cần biết là có 2 loại XSS chính: reflected và stored. **Reflected XSS** xảy ra khi payload XSS được phân phối và thực thi thông qua một yêu cầu HTTP duy nhất và không được lưu trữ ở bất kỳ đâu trên trang web. Vì nó không được lưu trữ, nên nó không thể thực hiện payload mà không gửi yêu cầu HTTP khác với payload. Tuy nhiên, các trình duyệt (Chrome, Internet Explorer, Edge và Safari) đã cố gắng ngăn chặn loại lỗ hổng này bằng cách đưa ra trình kiểm tra XSS. Điều này được xây dựng trong các trình duyệt nhằm bảo vệ người dùng khỏi các liên kết độc hại thực thi Javascript. Khi điều này xảy ra, trình duyệt thường sẽ hiển thị một thông báo cho biết trang bị chặn để bảo vệ người dùng.
- Bất chấp những nỗ lực tốt nhất của các nhà phát triển trình duyệt, việc kiểm tra XSS thường bị bỏ qua vì những cách phức tạp để Javascript có thể được thực thi trên một trang web. Vig những lần bỏ qua này thường xuyên thay đổi, chúng nằm ngoài phạm vi của cuốn sách này, nhưng hai tài liệu tuyệt vời là https://blog.innerht.ml/the-misunderstood-x-xss-protection/ và https://github.com/masatokinugawa/filterbypass/wiki/Browser’s-XSS-Filter-Bypass-Cheat-Sheet
- Ngược lại thì **Stored XSS** xảy ra khi một trang web lưu một payload độc hại và không được kiểm tra kỹ lưỡng. Khi tìm kiến stored XSS, điều quan trọng cần lưu ý là các trang web có thể hiển thị payload được nhập vào ở nhiều vị trí khác nhau. Payload có thể không thực thi ngay sau khi Submit nhưng có thể thực thi khi ai đó truy cập đến trang có hiển thị nó. Ví dụ : nếu bạn tạo một profile trên một trang web có payload XSS là tên của bạn, XSS có thể không thực thi khi ai đó vào xem hồ sơ của bạn nhưng có thể nó sẽ thực thi khi ai đó tìm kiems tên bạn hoặc gửi tin nhắn cho bạn.
- XSS cũng có thể chia làm 3 loại nhỉ: DOM Based, Blind và Self. DOM Based là kết quả việc chiếm đoạt một trang web có sử dụng Javascript để thực thi mã độc hại và có thể Stored or Reflected. Ví dụ: nếu một trang web đã sử dụng HTML để thay thế nội dung của một trang web bằng giá trị từ URL mà không kiểm tra đầu vào độc hại, có thể thực thi XSS:

    ```html
        <html>
            <body>
                <h1>Hi <span id="name"></span></h1>
                <script>
                    document.getElementById('name').innerHTML=location.hash.split('#')[1]
                </script>
            </body>
        </html>
    ```
    
- Trong trang web ví dụ này, thẻ `script`đang gọi đối tượng hàm `getElementById` của document, đây là một hàm tìm kiếm đối tượng HTML bằng  **ID "name"**. Nó sẽ trả về một ánh xạ đến phần tử `<span>` trong thẻ `<h1>`. Tiếp theo là sửa đổi text bên trong thẻ `<span id="name"> </span>` bằng phương thức innerHTML. Script thiết lập text bên trong thẻ `span></span>` với giá trị từ `ocation.hash`, hoặc bất cứ điều gì sau dấu `#` trong URL (location là API trình duyệt khác, tương tự như DOM và nó cấp quyền truy cập vào thông tin về URL hiện tại).
- Nếu trang này có thể truy cập được tại `www.example.com/hi`, truy cập `www.example.com/hi#Peter` sẽ dẫn đến việc trang HTML tự động được cập nhật thành `<h1>HI Peter</h1>`. Tuy nhiên, vì trang này được kiểm tra giá trị `#` trong URL trước khi truy cập phần tử span, nếu người dùng truy cập `www.example.com/h1#<img src=x onerror=alert(document.domain)>`, thông báo alert Javascript sẽ bật lên với nội dụng ` www.example.com` (giả sử không có hình ảnh x nào được trả về trình duyệt). Kết quả HTML từ trang sẽ như thế này:

    ```html
        <html>
            <body>
                <h1>Hi <span id="name"><img src=x onerror=alert(document.domain)></span></h1>
                <script>
                    document.getElementById('name').innerHTML=location.hash.split(‘#’)[1]
                </script>
            </body>
        </html>
    ```
    
- **Blind XSS** là một loại của stored XSS trong đó payload XSS được hiển thị bởi một người dùng khác trong một vị trí của trang web mà một hacker thường có thể truy cập. Ví dụ: điều này có thể xảy ra nếu bạn có thể chèn thêm XSS vào họ và tên của mình khi tạo hồ sơ cá nhân trên một trang web. Những giá trị đó có thể không nhìn thấy khi người dùng thường xuyên xem hồ sơ của bạn nhưng khi người quản trị truy cập trang quản trị để liệt kê tất cả người dùng mới trên trang web, các ký tự nếu không được kiểm tra kỹ lưỡng có thể bị chèn XSS vào và khai thác. Công cụ XSSHunter (https://xsshunter.com/) của Matt Bryant rất tuyệt vời để phát hiện những thứ này. Các payload thực thi javascript được thiết kết bởi Matt sẽ tải một lệnh từ xa được thiết kế để đọc các DOM, thông tin trình duyệt, cookie và các thông tin khác mà nó sẽ gửi lại vào tài khoản XSSHunter của bạn khi tập lệnh được thực thi.
- Các lỗ hổng **Self XSS** có thể được lưu trữ hoặc có thể không được lưu trữ nhưng thường chỉ ảnh hưởng đến người dùng khi nhập vào payload, do đó nó được đặt là `"self"`. Ví dụ: điều này có thể xảy ra khi XSS được gửi qua request POST, nhưng request được CSRF bảo vệ vì vậy chỉ chính hắn mới có thể gửi payload XSS. Vì kẻ tấn công chỉ có thể tự tấn công, nên loại XSS này thường được coi là mức nghiêm trọng thấp hơn và không được trả tiền bởi nó không nằm trong danh sách được thưởng. Nếu bạn tìm thấy loại XSS này, tốt nhất bạn nên lưu ý về nó và tìm cơ hội kết hợp nó với lỗ hổng khác để tấn công, chẳng hạn như `login/logout` CSRF. Trong kiểu tấn công này, mục tiêu được đăng xuất khỏi tài khoản của họ và đăng nhập vào tài khoản kẻ tấn công bằng mã Javascript độc hại. Cuộc tấn công này thường yêu cầu khả năng đăng nhập lại vào tài khoản mục tiêu thông qua mã độc Javascript.
- Tác động của XSS phụ thuộc vào nhiều yếu tố khác nhau, bao gồm cả việc ` stored ` hoặc ` reflected`, liệu cookie có thể truy cập được không, nơi payload được thực thi, v.v. Mặc dù có những tác động tiềm ẩn, việc sửa các lổ hổng XSS thường dễ dàng và chỉ yêu cầu các nhà phát triển phần mềm kiểm tra kỹ lưỡng dữ liệu đầu vào của người dùng.

    
# 2.Ví Dụ
###     2.1. Shopify Wholesale
- Difficulty: Low
- Url: wholesale.shopify.com
- Report Link: https://hackerone.com/reports/106293 5
- Date Reported: December 21, 2015
- Bounty Paid: $500
- Description:
+ Website Shopify’s wholesale là một trang web đơn giản với các chức năng nhập tên sản phẩm và click `"Find Products"`. Đây là hình ảnh chụp

![](https://images.viblo.asia/c9e2f8bf-d904-4931-adef-4027dc210e7a.png)
    
- Lỗ hổng XSS ở đây là lỗ hổng cơ bản nhất bạn có thế tìm thấy - nhập text vào ô `search` không được kiểm tra vì vậy bất kỳ mã Javascript nào được nhập đều được thực thi. Tại đây thử với : `test';alert('XSS');'`
- Lý do công vieeucj nầy là Shopify lấy đầu vào từ người dùng, thực hiện truy vấn tìm kiếm và khi không có kết quả nào được trả về, Shopify sẽ in một thông báo nói rằng không tìm thấy sản phầm nào có tên như đoạn mã Javascript đã nhập và trình duyệt sẽ thực thi, kết quả là trang đã bị khai thác XSS.

### 2.2. Shopify Giftcard Cart
- Difficulty: Low
- Url: hardware.shopify.com/cart
- Report Link: https://hackerone.com/reports/95089 7
- Report Date: October 21, 2015
- Bounty Paid: $500
- Description:
- Shopify Giftcard Cart cho phep người dùng thiết kế thẻ quà tặng của riêng họ với một biểu mẫu HTML bao gồm input upload file, một số ô để nhập text cho phần chi tiết,v.v... Tại đây, một ảnh chụp màn hình : 

![](https://images.viblo.asia/a42ce8f4-c922-4deb-8d9e-92d0003dc784.png)
    
- Lỗ hổng XSS ở đây xảy ra khi Javascript được nhập vào trường tên hình ảnh trên `form`. Một tác vụ khá dễ dàng khi được thực hiện với proxy HTML gửi request. Vì vậy form sẽ bao gồm:

    ```html
        Content-Disposition: form-data; name="properties[Artwork file]"
    ```
- Sẽ bị chặn và đổi thành :

    ```html
        Content-Disposition: form-data; name="properties[Artwork file<img src='test' onmouse\over='alert(2)'>]";
    ```

### 2.3. Shopify Currency Formatting
 - Difficulty: Low
- Url: SITE.myshopify.com/admin/settings/generalt
- Report Link: https://hackerone.com/reports/104359 9
- Report Date: December 9, 2015
- Bounty Paid: $1,000
- Description:
 - Trong phần cài đặt của Shopify’s store bao gồm khả năng thay đổi định dạng tiền tệ. Vào ngày 9 tháng 12 đã có báo cáo rằng các value của các input đầu vào có thể chưa được kiểm tra đúng các khi thiết lập các trang truyền thông xã hội.
 - Nói cách khác, người dùng độc hại có thể thiết lập một cửa hàng và thay đổi cài đặt tiền tệ cho cửa hàng như sau:
 
    ![](https://images.viblo.asia/6db31bf5-0ef8-47b7-8322-0dccbdc4ab7f.png)
    
- Sau đó, người dùng có thể kích hoạt các kênh bán hàng truyền thông xã hội, trong trường hợp báo cáo Facebook, Twitter và khi người dùng nhấp vào tab kênh bán hàng đó. Javascript đã được thực thi đến lỗ hổng XSS.

### 2.4. Yahoo Mail Stored XSS
- Difficulty: Low
- Url: Yahoo Mail
- Report Link: Klikki.fi 10
- Date Reported: December 26, 2015
- Bounty Paid: $10,000
- Description:
- Yahoo mail editor cho phép người dùng chỉnh sửa mọi người nhúng ảnh vào email thông qua thẻ IMG của HTML. Lỗ hổng này phát sinh khi thẻ IMG HTML không đúng định dạng hoặc không hợp lệ.
- Hầu hết các thể HTML chấp nhận các thuộc tính, thông tin bổ sung về HTML. Ví dụ: thẻ IMG lấy thuộc tính `src`trỏ đến địa chỉ của hình ảnh để hiển thị. Hơn nữa, một số thuộc tính được gọi là thuộc tính boolean nếu chúng được bao gồm, chúng  đại diện cho một giá trị thực trong HTML và khi chúng bị bỏ qua chúng đại diện cho một false value.
- Liên quan đến lỗ hổng này , Jouko Pynnonen nhận thấy rằng nếu anh ta thêm các thuộc tính boolean vào các thẻ HTML có giá trị, Yahoo Mail sẽ xóa giá trị nhưng để lại các dấu bằng . Dưới đây là ví dụ:

    ```html
        <INPUT TYPE="checkbox" CHECKED="hello" NAME="check box">
    ```
-  Ở đây, thẻ đầu vào có thể bao gồm `checked` biểu thì là ô input đó được chọn hay không. Theo phân tích mô tả ở trên, điều này sẽ trở thành:

    ```html
         <INPUT TYPE="checkbox" CHECKED= NAME="check box">
    ```
- Lưu ý rằng HTML sẽ chuyển từ trạng thái được chọn sang không được chọn nhưng vẫn bao gồm cả dấu bằng.
- Phải thừa nhận rằng điều này có vẻ vô hại nhưng theo thông số kỹ thuật của HTML, các trình duyệt đọc điều này là `CHECKED` có giá trị `NAME=` kiểm tra và thẻ đầu vào có hộp thuộc tính thứ 3 không có giá trị. Điều này là do HTML cho phép không hoặc nhiều ký tự khoảng trắng xung quanh dấu bằng, trong một giá trị thuộc tính không được trích dẫn.
- Để khai thác điều này Jouko đã gửi thẻ IMG sau :
    ```html
         <img ismap='xxx' itemtype='yyy style=width:100%;height:100%;position:fixed;left:0px;\ top:0px; onmouseover=alert(/XSS/)//'>
    ```
- Bộ lọc Yahoo Mail sẽ biến thành:
    ```html
        <img ismap=itemtype=yyy style=width:100%;height:100%;position:fixed;left:0px;top:0px\; onmouseover=alert(/XSS/)//>
    ```
- Do đó trình duyệt sẽ hiển thị thẻ IMG chiếm toàn bộ cửa sổ trình duyệt và khi chuột di qa hình ảnh mã Javascript sẽ được thực thi.

### 2.5. Google Image Search
- Difficulty: Medium
- Url: images.google.com
- Report Link: Zombie Help 11
- Date Reported: September 12, 2015
- Bounty Paid: Undisclosed
- Description:
- Vào tháng 9 năm 2015, Mahmoud Jamal đã sử dụng Google Images để tìm kiếm ảnh hồ sơ HackerOne của mình. Tring khi trình duyệt, anh nhận thấy một điều thú bị trong URL hình ảnh từ Google:
    ```html
             http://www.google.com/imgres?imgurl=https://lh3.googleuser.com/...
    ```
- Lưu ý tham chiếu đến `imgurl`trong URL thực tế. Khi di chuột qua hình thu nhỏ, Mahmoud nhận thấy rằng thuộc tính tag href có cùng một URL. Do đó anh ta thử thay đổi tham số thàng `javascript:alert(1)` và nhận thấy rằng anchor thẻ href cũng thay đổi tương tự.
- Vui mừng tại thời điểm này, anh ta nhấp vào liên kết nhưng không có Javascript nào được thực thi vì URL Google đã được thay đổi thành một cái gì đó khác. Hóa ra Google đã thay đổi giá trị URL khi nút chuột được nhấp qua thông qua cuộc gọi onmousedown của javascript.
- Suy nghĩ về điều này, Mahmoud quyết định thử bàn phím của mình và lướt qua trang. Khi anh ta đến nút Xem hình ảnh, Javascript đã được kích hoạt dẫn đến lỗ hổng XSS. Đây là hình ảnh:

![](https://images.viblo.asia/8cb6290c-6ff4-4322-b131-7c3a80d2c578.png)
             
### 2.6. Google Tagmanager Stored XSS
- Difficulty: Medium
- Url: tagmanager.google.com
- Report Link: https://blog.it-securityguard.com/bugbounty-the-5000-google-xss 12
- Date Reported: October 31, 2014
- Bounty Paid: $5000
- Description:
- Vào tháng 10 năm 2014 Patrik Fehrehbach đã tìm thấy lỗ hổng XSS được lưu trữ trên Google. Phần thú vị là cách anh quản lý để có được payload vượt qua Google.
- Google Tagmanager là một công cụ SEO giúp các nhà tiếp thị dễ dàng thêm và cập nhật thẻ trang web - bao gồm conversion tracking, site analytics, remarketing,  và nhiều hơn. Để làm điều này nó có một số `From` web để người dùng tương tác. Kết quả là Patrik bắt đầu tìm ra bằng cách nhập payload XSS vào các trường `form` có sẵn trông giống như `#”><imgsrc=/ onerror=alert(3)>`. Nếu được chấp nhận, điều này sẽ đóng `>` HTML hiện có và sau đó thử tải một hình ảnh không tồn tại để thực thi Javascript, alert(3).
- Tuy nhiên, điều này đã không hoạt động. Google đã kiểm tra đúng cách đầu vào. Nhưng, Patrik nhận thấy giải pháp thay thế - Google cung cấp khả năng tải lên tệp JSON bằng nhiều thẻ. Vì vậy anh đã làm như thế này:

    ```html
             "data": {
                    "name": "#"><img src=/ onerror=alert(3)>",
                    "type": "AUTO_EVENT_VAR",
                    "autoEventVarMacro": {
                    "varType": "HISTORY_NEW_URL_FRAGMENT"
                }
            }
    ```
- Tại đây bạn sẽ nhận thấy tên của thẻ là payload XSS của mình. Hóa ra Google đã không kiểm tra đầu vào từ các tệp được tải lên và payload được thực thi.

# 3. Tổng kết
- Các lỗ hổng XSS đại diện cho rủi ro thực sự đối với các nhà phát triển trang web và vẫn còn phổ biến trên các trang web, thường là trong tầm nhìn rõ ràng. Bằng cách chỉ cần gửi callback đến phương thức `alert()` của Javascript, alert(‘test’), bạn có thể kiểm tra xem trường nhập liệu có dễ bị tấn công hay không. Ngoài ra, bạn có thể kết hợp điều này với HTML Injection và gửi các ký tự được mã hóa ASCII để xem văn bản có được rendered và interpreted hay không.
- Khi tìm kiếm lỗ hổng XSS, đây là một số điều cần nhớ:
    + Các lỗ hổng XSS không cần phải phức tạp. Điều quan trọng là phải xem xét nơi một trang web hiển thị đầu vào của bạn và cụ thể là trong bối cảnh nào, cho dù đó là HTML HTML hay JavaScript.
    + Payload XSS có thể không được thực thi ngay sau khi được gửi. Nó rất quan trọng để tìm kiếm tất cả các địa điểm mà đầu vào của bạn có thể được hiển thị và xác nhận xem payload có được kiểm tra đúng cách hay không. Trang web http://html5sec.org, được các chuyên gia kiểm tra thâm nhập tại Cure53, là tài liệu tham khảo tuyệt vời cho payload XSS bị phá vỡ bởi vectơ tấn công.
    + Bất cứ khi nào một trang web kiểm tra đầu vào thông qua sửa đổi, chẳng hạn như bằng cách xóa các ký tự, thuộc tính, v.v., bạn nên kiểm tra chức năng kiểm tra này. Ví dụ: bạn có thể làm điều này bằng cách gửi các giá trị không mong muốn, chẳng hạn như các thuộc tính boolean với các giá trị.
    + Hãy cảnh giác với các tham số URL mà bạn kiểm soát được reflected trên trang vì chúng có thể cho phép bạn tìm một khai thác XSS có thể bỏ qua mã hóa. Ví dụ: nếu bạn có quyền kiểm soát giá trị href trong thẻ anchor , bạn thậm chí có thể không cần sử dụng các ký tự đặc biệt để dẫn đến lỗ hổng XSS.
    + Donith cho rằng một trang web không dễ bị tấn công chỉ vì cổ, thương hiệu, chức năng, v.v. Ngay cả các trang web nổi tiếng nhất cũng có thể có lỗi chưa được phát hiện.
    + Hãy chú ý đến các cơ hội trong đó các trang web đang kiểm tra đầu vào trên ứng dụng thay vì khi kết xuất đầu vào. Khi một phương thức đệ trình mới được thêm vào trang web và trang web được đang kiểm tra đầu vào, điều này sẽ tạo cơ hội cho các lỗi nhà phát triển tiềm năng và các lỗi tiềm ẩn.
    + Hãy kiên trì khi bạn thấy hành vi kỳ lạ từ một trang web kiểm tra đầu vào của người dùng và đào sâu vào mã trang web để xem cách hoạt động của kiểm tra. Bạn có thể cần học một số JavaScript để làm điều này, nhưng hiểu được mã nguồn của trang web trong thời gian dài sẽ có giá trị.