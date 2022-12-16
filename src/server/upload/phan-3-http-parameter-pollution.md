# 1. Mô Tả
- HTTP parameter pollution (HPP) là một kỹ thuật tấn công web mà kẻ tấn công sẽ tạo ra các tham số trùng nhau trong HTTP request. Lợi dụng các phản ứng khác nhau của các công nghệ web khi xử lý các tham số trùng nhau này để inject những đoạn mã độc hại nhằm tấn công server và người sử dụng.
- Đây là một kỹ thuật đơn giản nhưng khá hiệu quả. Kẻ tấn công có thể lợi dụng kỹ thuật này để :
    + Sửa đổi các tham số HTTP
    + Thay đổi các hành vi của ứng dụng web
    + Truy cập và khai thác các biến không được kiểm soát chặt chẽ
    + Bypass WAF và các cơ chế kiểm tra dữ liệu đầu vào

- Do đó, nếu một ứng dụng web tồn tại lỗ hổng để thực hiện cuộc tấn công HPP, kẻ tấn công có thể dễ dàng chèn các đoạn mã độc hại để tấn công web server cũng như người sử dụng.
- Sẽ có 2 loại HPP là Server-Side và Client-Site. Dưới đây chúng ta sẽ làm rõ hơn về hai kiểu HPP này.

# 2. Server-Side HPP ( HPP phía máy chủ ) 
- Khi bạn thực hiện một yêu cầu đến một trang web, các máy chủ của trang web sẽ xử lý yêu cầu đó và trả lời phản hồi. Trong một số trường hợp, các máy chủ sẽ không chỉ trả về một trang web mà còn chạy một số mã dựa trên thông tin được cung cấp cho nó thông qua URL mà nó đã gửi. Mã này chỉ chạy trên các máy chủ, vì vậy, nó về cơ bản là vô hình với bạn, bạn có thể thấy thông tin bạn gửi và kết quả bạn nhận được, nhưng quá trình ở giữa là một hộp đen. Trong HPP phía máy chủ, hacker gửi cho máy chủ thông tin bất thường nhằm cố gắng làm cho mã phía máy chủ trả về kết quả không mong muốn. Vì bạn có thể xem các chức năng mã máy chủ, HPP phía máy chủ phụ thuộc vào bạn xác định các tham số dễ bị tấn công và thử nghiệm chúng.
- Một ví dụ về HPP phía máy chủ có thể xảy ra nếu ngân hàng của bạn bắt đầu chuyển tiền thông qua trang web được xử lý trên các máy chủ của mình bằng cách chấp nhận các tham số URL. Giả sử bạn có thể chuyển tiền bằng cách điền các giá trị vào ba tham số URL **from**, **to** và **amount**, sẽ chỉ định số tài khoản để chuyển tiền từ, tài khoản cần chuyển và số tiền cần chuyển theo thứ tự đó. Một URL với các thông tin này chuyển **$5000** đô la từ số tài khoản **12345** sang tài khoản **67890** có thể trông giống như:
    ```html
         https://www.bank.com/transfer?from=12345&to=67890&amount=5000
    ```
   
- Có thể ngân hàng có thể đưa ra giả định rằng họ sẽ chỉ nhận được một tham số **from**. Nhưng điều gì xảy ra nếu bạn gửi hai, như sau:
    ```html
         https://www.bank.com/transfer?from=12345&to=67890&amount=5000&from=ABCDEF
    ```
   
- URL này ban đầu được cấu trúc giống như ví dụ đầu tiên, nhưng  sau đó thêm phần bổ sung từ tham số chỉ định một tài khoản gửi ABCDEF khác. Ta có thể đoán được, nếu ứng dụng dễ bị tấn công HPP và  kẻ tấn công có thể thực hiện chuyển khoản **from** từ một tài khoản mà không  phải của họ nếu như phía ngân lấy giá trị **from** cuối cùng mà nó nhận được. Thay vì chuyển **$5000** đô la từ tài khoản 12345 sang 67890, mã phía máy chủ sẽ sử dụng tham số thứ hai và gửi tiền từ tài khoản ABCDEF đến 67890.

- Cả hai lỗ hổng HPP **phía máy chủ(Server-Side)** và phía **máy khách( Client-Site )** phụ thuộc vào cách máy chủ xử lý khi nhận nhiều tham số có cùng tên. Ví dụ: PHP/Apache sử dụng lần xuất hiện cuối cùng, Apache Tomcat sử dụng lần xuất hiện đầu tiên, ASP/IIS sử dụng tất cả các lần xuất hiện, v.v. Kết quả là, không có quy trình đảm bảo duy nhất để xử lý nhiều lần gửi tham số có cùng tên và tìm HPP sẽ thực hiện một số thử nghiệm để xác nhận cách trang web mà bạn thử nghiệm hoạt động.

- Đôi khi các lỗ hổng PHP xảy ra là kết quả của việc ẩn hành vi phía máy chủ từ mã mà trực tiếp hiển thị cho bạn. Ví dụ: giả sử ngân hàng của chúng tôi quyết định sửa đổi cách xử lý chuyển khoản và thay đổi mã back-end của nó để không bao gồm một tham số từ URL, mà thay vào đó lấy một mảng chứa nhiều giá trị trong đó.

- Lần này, ngân hàng sẽ lấy hai tham số tài khoản được chuyển đến và số tiền cần chuyển. Tài khoản để chuyển **from** sẽ là cố định. Một liên kết ví dụ có thể trông giống như sau:
    ```html
         https://www.bank.com/transfer?to=67890&amount=5000
    ```
    
- Thông thường code phía máy chủ sẽ là một bí ẩn đối với chúng ta, nhưng may mắn thay, chúng tôi đã đánh cắp mã nguồn của họ và biết rằng mã Ruby phía máy chủ trông như sau:
    ```ruby
            user.account = 12345
            
            def prepare_transfer(params)
                params << user.account
                transfer_money(params) #user.account (12345) sẽ là params[2]
            end
            
            def transfer_money(params)
                to = params[0]
                amount = params[1]
                from = params[2]
                transfer(to,amount,from)
                end
    ```
    
- Mã này tạo ra hai hàm **prepare_transfer** và **transfer_money**. Hàm prepare_transfer  lấy một mảng được gọi là **params** chứa các tham số **to** và **amount** từ URL.Mảng sẽ là `[ 67890, 5000 ]` trong đó các giá trị mảng được phân tách bằng dấu phẩy. Dòng đầu tiên của hàm thêm thông tin tài khoản người dùng đã được xác định trước đó vào cuối mảng `[67890,5000,12345]` và sau đó params được chuyển đến transfer_money.

-  Như ta có thể thấy các tham số được đưa vào một mảng của Ruby. Mảng sẽ có thứ tự là số tài khoản **to**, số tiền chuyển **amount** và cuối cùng là số tài khoản **from** . Điều này được thể hiện rõ trong hàm **transfer_money**, với phần tử thứ 0 `params[0]` là **to** , tiếp đến `params[1]` là **amount** và  **from** = `params[2]`. Điều nay cũng có thể là nhược điểm, ý tưởng là bây giờ kẻ tấn công sẽ thay đổi trật tự của URL:

    ```html
         https://www.bank.com/transfer?to=67890&amount=5000&from=ABCDEF
    ```
    
- Mảng  `params` nhận được ở hàm prepare_transfer  lúc này sẽ là `[67890,5000,ABCDEF]` sau khi  được thêm tham số `user.account` và bên phía hàm transfer_money lúc này mảng params sẽ là  `[67890,5000,ABCDEF,12345]`. Kết quả xử lý thì biến **from** vẫn bị thay đổi thành một số tài khoản khác và đây sẽ là lỗ hổng nghiêm trọng.

# 3. Client-Side HPP ( HPP phía máy khách ) 
- Mặt khác, các lỗ hổng HPP phía máy khách liên quan đến khả năng đưa các tham số vào một URL, sau đó được trả lại trên trang cho người dùng. Một ví dụ về hành vi này là cách sử dụng URL retical http://host/page.php?par=123%26action=edit và mã phía máy chủ:

    ```php
       <? $val=htmlspecialchars($_GET['par'],ENT_QUOTES); ?>
       <a href="/page.php?action=view&par='.<?=$val?>.'">View Me!</a>
    ```
    
- Tại đây, mã tạo ra một URL mới dựa trên URL do người dùng nhập. URL được tạo bao gồm một tham số **action** và tham số **par**, tham số thứ hai được xác định bởi URL người dùng. Trong URL lý thuyết kẻ tấn công vượt qua giá trị `123%26action=edit` như là giá trị của **par** , `%26` là giá trị được mã hóa URL cho `&`, có nghĩa là khi URL được phân tích cú pháp, `%26` được hiểu là `&`. Điều này có nghĩa là thêm một tham số bổ sung vào liên kết được tạo mà không thêm một tham số hành động rõ ràng. Nếu họ đã sử dụng `123&action=edit` thay vào đó. điều này sẽ được hiểu là hai tham số riêng biệt nhau với **par** sẽ bằng `123` và **action** tham số sẽ bằng `edit`. Nhưng kể từ khi trang web chỉ tìm kiếm và sử dụng tham số **par** trong mã của nó để tạo URL mới, tham số  **action** sẽ bị loại bỏ.Để giải quyết cho vấn đề này thì `%26` được sử dụng, `action` sẽ là một tham số riêng biệt , do đó giá trị **par’s** trở thành `123%26action=edit` .

- Bây giờ, mệnh (với mã hóa `&` là `%26`) sẽ được chuyển cho hàm `htmlspecialchars`. Hàm này chuyển đổi các ký tự đặc biệt, chẳng hạn như `%26` thành các giá trị được mã hóa HTML của chúng `%26` trở thành `&`. Giá trị chuyển đổi sau đó được lưu trữ trong `$val`. Sau đó, một liên kết mới được tạo bằng cách nối thêm `$val` vào giá trị `href` hiện tại. Lúc này liên kết sẽ là:

    ```html
        <a href="/page.php?action=view&par=123&amp;action=edit">
    ```
    
- Khi làm như vậy, kẻ tấn công đã quản lý để thêm bổ sung  `action=edit` vào URL `href`, điều này có thể dẫn đến lỗ hổng tùy thuộc vào cách máy chủ xử lý nhận hai tham số `action`.


# 4. Ví dụ
### 4.1. Nút chia sẻ lên mạng xã hội của trang HackerOne
- Các bài đăng của trang **HackerOne** thì đều có tính năng chia sẻ lên các trang mạng xã hội như Twitter, Facebook, v.v..Sau khi người dùng chia sẽ lên các trang mạng xã hội thì bài đăng sẽ tạo thành một `link`liên kết đế bài đăng để người dùng vào đọc bài.
- Thì một lỗ hổng đã được phát là có thể khai thác được đó là tin tặc có thế tấn công vào tham số `redirect` của URL để chuyển hướng trang đến không phải là bài đăng được chia sẻ và sẽ đưa người dùng đến một trang web khác của hacker. Ví dụ URL:
     + Đây là liên kết đến trang của blog được chia sẻ
        ```html
        https://hackerone.com/blog/introducing-signal
        ```
    + Và sau đó được thêm:
      ```html
      &u=https://vk.com/durov
      ```
   + kết quả là được link khi đưa lên Facebook sẽ là : 
     ```html
     https://www.facebook.com/sharer.php?u=https://hackerone.com/blog/introducing-signal?&u=https://vk.com/durov
     ```
   
- Nếu như người dùng click vào bài đăng để xem nội dung thì tham số **u** cuối cùng sẽ được ưu tiên hơn tham số **u** đầu tiên. Vậy là người dùng được đưa đến một trang web khác `https://vk.com/durov` thay vì đến HackerOne.
- Trong những tình huống này, có thể  các tham số`params` đã không được kiểm tra bảo mật thích hợp, điều này có thể dẫn đến các lỗ hổng HPP.

### 4.2. Twitter Web Intents
- Twitter Web Intents cung cấp các pop-up để làm việc với người dùng Twitter tweet, replies, retweets,likes và follows  trong bối cảnh của các trang web không phải Twitter. Chúng giúp người dùng có thể tương tác với nội dung Twitter mà không cần rời khỏi trang hoặc phải ủy quyền cho một ứng dụng mới có thể tương tác. Dưới đây, một ví dụ về một trong những pop-up bật lên này trông như thế nào:

    ![](https://images.viblo.asia/aba31168-6193-4047-a0cf-635df31dd5d7.png)
    
- Qua thử nghiệm thì đã phát hiện ra rằng cả 4 chức năng  following a user, liking a tweet, retweeting, và tweeting đều dính HPP. Twitter sẽ tạo hành động thông qua một yêu cầu GET với các tham số URL như sau:
    ```html
    https://twitter.com/intent/intentType?paramter_name=paramterValue
    ```
    
- URL này sẽ bao gồm **intentType** và một hoặc nhiều tham số **name/value** , ví dụ: tên người dùng Twitter và id Tweet. Twitter sẽ sử dụng các tham số này để tạo pop-up hiển thị cho người dùng follow hoặc like tweet. Nhận thấy rằng nếu tạo  ra một URL có hai tham số **screen_name** cho mục đích follow, thay vì **screen_name** like:

    ```html
    https://twitter.com/intent/follow?screen_name=twitter&screen_name=ericrtest3
    ```
    
- Twitter sẽ xử lý yêu cầu bằng cách ưu tiên giá trị screen_name thứ hai hơn là giá trị đầu tiên. Điều này có thể khiến sau khi bấm theo dõi sẽ theo dõi một tài khoản của hacker chứ không phải là theo dõi tài khoản chính chủ. Truy cập URL được tạo sẽ dẫn đến biểu mẫu HTML sau được tạo bởi mã back-end Twitter với hai tham số **screen_name**:

    ```html
    <form class="follow" id="follow_btn_form" action="/intent/follow?screen_name=ericrte\
    st3" method="post">
        <input type="hidden" name="authenticity_token" value="...">
        <input type="hidden" name="screen_name" value="twitter">
        <input type="hidden" name="profile_id" value="783214">
        <button class="button" type="submit" >
        <b></b><strong>Follow</strong>
        </button>
    </form>
    ```
    
- Twitter sẽ lấy thông tin từ tham số **screen_name** đầu tiên được liên kết với tài khoản Twitter chính thức để nạn nhân nhìn thấy hồ sơ chính xác của người dùng mà họ dự định theo dõi, bởi vì tham số **screen_name** đầu tiên của URL để điền vào hai giá trị đầu vào. Tuy nhiên hãy để ý đến **action** của form. Khi click vào button để submit form thì họ sẽ chèn cho **screen_name** bằng **ericrtest3** để nó là screen_name thứ 2:

    ```html
    https://twitter.com/intent/follow?screen_name=twitter&screen_name=ericrtest3
    ```
    
- Vậy là người được theo dõi đã chuyển sang cho hacker.


# Tổng Kết 
- HPP là một kỹ thuật hacking khá đơn giản nhưng hiệu quả. Nó có thể được sử dụng để tấn công cả server-side và client-side. Vì vậy, các lập trình viên cần hiểu về lỗ hổng này và các công nghệ web mà họ sử dụng để có thể phòng chống các nguy cơ tấn công từ bên ngoài. Cách tốt nhất để phòng chống vẫn là kiểm tra chặt chẽ giá trị của tất cả các tham số đầu vào.
- Nếu là hacker hay để ý vào các tham số của URL. Khai thác vào các liên kết với các mạng xã hội sẽ là một ý tưởng hay

## Nguồn:
- Đọc từ sách: https://www.hackerone.com/blog/Hack-Learn-Earn-with-a-Free-E-Book