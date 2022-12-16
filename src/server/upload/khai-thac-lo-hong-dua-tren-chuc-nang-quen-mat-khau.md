# 1. Giới thiệu
Xin chào tất cả các bạn. Hôm nay mình sẽ nói về một lỗ hổng bảo mật web liên quan đến chức năng quên mật khẩu.
Ngày nay, hầu hết các trang web có phần đăng nhập đều cung cấp chức đăng "Quên mật khẩu". Đây là 1 chức năng vô cùng cần thiết và tiện lợi. Chức năng này cung cấp cho phép người dùng khôi phục tài khoản khi họ quên mật khẩu, cho phép đặt lại mật khẩu mới. Chức năng đặt lại mật khẩu thường sử dụng 2 cách sau:
- Server sẽ gửi cho mình 1 đường link confirm, khi ta click vào thì sẽ chuyển đến giao diện cho phép đặt lại mật khẩu.
- Server sẽ reset mật khẩu của mình thành 1 chuỗi ngẫu nhiên, coi như là mật khẩu tạm thời và chỉ sử dụng được 1 lần (Chức năng này được facebook sử dụng để đặt lại mật khẩu).
Bài viết này mình sẽ liệt kê những cách có thể khai thác dựa theo lỗ hổng từ phía server thông qua chức năng quên mật khẩu.
# 2. Các cách khai thác
## 2.1. Liên kết đặt lại mật khẩu dễ đoán
Ta có thể xem xét 1 trang web gửi đường link đặt lại liên kết như sau:
http://example.com/resetpassword?token=Hahaha@gmail.com&Name_ID=VmlibG9tYW4=
Trang web trên có liên kết chứa nội dung dễ đoán là mã `token` chứa email của người dùng. Bên cạnh đó, `Name_ID` thực chất là `username` của người dùng được mã hóa B64 (mã hóa hoàn toàn có thể decrypt dễ dàng)
![](https://images.viblo.asia/e5f52eb3-10a8-4df6-a2fb-e870ede89b18.png)

Giải mã b64 bằng chức năng decoder trong burp suite ta được username người dùng là Vibloman.
Hacker có thể lợi dụng điều này để khai thác nhằm gửi yêu cầu đặt mật khẩu của nạn nhân về email mà hacker nắm giữ.

Ví dụ hacker muốn chiến tài khoản của người dùng có `username=HackMe123`
Hacker sẽ gửi yêu cầu đặt lại yêu cầu của bản thân sau đó hacker sẽ nhận được liên kết đặt lại mật khẩu có dạng:
http://example.com/resetpassword?token=Hacker@gmail.com&Name_ID=SGFja2Vy
Hacker sau đó sẽ thực hiện đổi `Name_ID` là username của bản thân thành username của người dùng. Thực hiện chuyển đổi  `username=HackMe123` sang b64:
![](https://images.viblo.asia/a75b54e2-aa54-4ace-a0ee-f714f4232987.png)

URL chứa liên kết đặt lại mật khẩu sau đó sẽ có dạng: http://example.com/resetpassword?token=Hacker@gmail.com&Name_ID=SGFja01lMTIz

Sau khi hacker gửi request, server sẽ thực hiện check token và xác nhận chính xác là email trên url và email từ nơi xác nhận là 1. Sau đó sẽ chuyển đến giao diện đổi mật khẩu của người dùng với Name_ID mà hacker truyền vào. Vậy là hacker chiếm tài khoản người dùng thành công.
![](https://images.viblo.asia/9af52eb6-4eb7-45eb-b756-7da37bd5f91b.png)

Việc đặt liên kết đặt lại mật khẩu với mã hóa yếu là một lỗ hổng nguy hiểm và dễ bị khai thác. Ngoài việc sử dụng email, username thì việc tạo mã thông báo đặt lại mật khẩu có thể dựa theo những tiêu chí sau:
- Được tạo dựa trên dấu thời gian (timestamp)
- Được tạo dựa trên userID
- Được tạo dựa trên tên và họ
- Được tạo dựa trên ngày sinh
Nếu trang web đó có sử dụng những tiêu chí dễ đoán trên thì hoàn toàn có thể thử khai thác theo cách này.
## 2.2. Liên kết đặt lại mật khẩu không hết hạn
Với cách đầu tiên, khi người dùng yêu cầu thay đổi mật khẩu thì họ sẽ nhận được một liên kết đặt lại mật khẩu để đặt lại mật khẩu. Đường link đấy cần phải được xử lí và hết hạn sau 1 khoảng thời gian nhất định hoặc hết hạn ngay khi đã dùng để đổi mật khẩu. Nếu nó chưa hết hạn và ta có thể sử dụng liên kết đó nhiều lần để đặt lại mật khẩu thì ta có thể coi nó như là lỗ hổng.
Tương tự đối với cách thứ 2 thì là việc mật khẩu tạm thời có thể sử dụng liên tục cũng có thể coi là lỗi.

Ví dụ: Lỗ hổng trên được phát hiện khá nhiều, dưới đây là 1 bài viết xác nhận về lỗ hổng dựa vào việc dùng liên kết đặt lại mật khẩu không hết hạn trên trang web `shopify`

![](https://images.viblo.asia/20297861-2d9d-4058-850c-14cf900e78fc.PNG)

Người dùng sẽ nhập email của họ tại đây. Sau đó truy cập vào email để nhận mã thông báo đặt lại mật khẩu có dạng https://stocky.shopifyapps.com/users/new_password?reset_token=your-reset-token. Ta có thể sử dụng liên kết này nhiều lần để đặt lại mật khẩu. Lỗ hổng trên nhận được bugbounty lên tới 500$ (1 con số khá lớn). Bạn có thể đọc chi tiết tại [đây](https://hackerone.com/reports/898841)

## 2.3. Không giới hạn số lượng yêu cầu khi đặt lại mật khẩu
Lỗ hổng trên xảy ra khi 1 trang web không giới hạn số lượng yêu cầu đặt lại mật khẩu trong 1 thời gian nhất định. Bạn có thể kiểm tra lỗ hổng trên như sau:
- Gửi 1 yêu cầu đặt lại mật khẩu
- Sử dụng 1 phần mềm để bắt request (ví dụ như burp suite)
- Thực hiện gửi hàng loạt yêu cầu 1 lúc (bạn có thể sử dụng chức năng intruder trong burp suite)
Nếu như những yêu cầu bạn gửi không bị chặn và đại diện thứ 3 bạn dùng để xác thực yêu cầu (ví dụ email) nhận được 1 loạt phản hồi về thì có thể coi như là lỗi. 

Lỗ hổng trên nhìn qua thì không ảnh hưởng gì đến tính bảo mật của người dùng cũng như doanh nghiệp, tuy nhiên thì rủi ro về kinh doanh là có. Nó có thể chiếm hàng loạt dung lượng trong thư đã gửi, điều này khiến cho người dùng bị khó chịu, làm chậm dịch vụ dẫn đến việc họ có thể ngưng sử dụng dịch vụ trang web. Bên cạnh đó, nếu người dùng đang sử dụng bất kỳ phần mềm dịch vụ email nào hoặc một số công cụ khiến trang web phải trả phí cho email của mình thì loại tấn công này có thể khiến doanh nghiệp của trang web đó mất tài chính.

Ví dụ:
Bạn có thể đọc 1 bài báo cáo về lỗ hổng trên tại [đây](https://hackerone.com/reports/751604). Trong bài viết trên thì lỗ hổng được đánh mức nguy hiểm là Medium (5.3) và cũng được trả bug bounty cho việc tìm ra lỗi đó
## 2.4. Không giới hạn độ dài của mật khẩu
Thông thường mật khẩu có 8–12–24 hoặc tối đa 48 chữ số. nếu không có giới hạn từ trong khi đặt lại mật khẩu, ta có thể coi nó là lỗ hổng bảo mật. Việc không giới hạn độ dài của mật khẩu đem lại 2 nguy cơ:
- Người dùng đặt mật khẩu quá ngắn: Điều này dẫn tới việc mật khẩu của họ bị yếu và dễ bị khai thác khi với kiểu tấn công brute force
- Đặt mật khẩu quá dài: hacker có thể lợi dụng việc không giới hạn độ dài mật khẩu để truyền vào 1 chuỗi dài, điều này khiến trang web có thể bị DOS, và đôi khi sẽ dẫn tới các lỗi overflow như `stackoverflow` hay `bufferoverflow` tùy theo chương trình xử lí

Về cách khai thác thì ta có thể thử:
- Gửi 1 yêu cầu đặt lại mật khẩu
- Lấy liên kết đặt lại mật khẩu và thử nhập mật khẩu quá dài hoặc quá ngắn.
Ví dụ: Báo cáo cho thấy trang web `nextcloud` có thể bị tấn công DOS dựa vào việc đặt lại mật khẩu. Bạn có thể đọc chi tiết tại [đây](https://hackerone.com/reports/840598) 
## 2.5. Rò rỉ mã thông báo thông qua miền kiểm soát
Đây là kỹ thuật theo đó kẻ tấn công thao túng một trang web dễ bị tấn công để tạo liên kết đặt lại mật khẩu trỏ đến một miền dưới sự kiểm soát của chúng. Hành vi này có thể được tận dụng để đánh cắp các mã thông báo bí mật cần thiết để đặt lại mật khẩu của người dùng tùy ý và cuối cùng là xâm phạm tài khoản của họ.

Mình sẽ ví dụ về cách khai thác trên thông qua 1 bài lab trên [portswiger](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning/lab-host-header-basic-password-reset-poisoning). Bài lab trên sẽ cho ta thấy cách 1 hacker lấy được liên kết đặt lại mật khẩu của người dùng thông qua miền thứ 3 như nào. Trang web trên cho mình 1 tài khoản để đăng nhập và yêu cầu mình cần đăng nhập vào tài khoản của carlos.
Giao diện đăng nhập của trang web:
![](https://images.viblo.asia/9fe68c68-e029-4724-8fad-335f69641d06.png)

### Tìm hiểu:
Tại giao diện đăng nhập có chức năng "Quên mật khẩu". Nhấp vào yêu cầu và nhập tên người dùng của mình (ở đây là wiener):

![](https://images.viblo.asia/431e308a-a25a-4a08-9e9b-39dd58d63a58.png)

Đi tới máy chủ khai thác và mở Email client:

![](https://images.viblo.asia/5650cc71-fb76-4523-a740-4c1a99709915.png)

Quan sát rằng ta đã nhận được một email có chứa liên kết để đặt lại mật khẩu của bạn. URL trên đã sử dụng tham số truy vấn `temp-forgot-password-token`. Tham số trên được mã hóa phức tạp nên ta không thể khai thác dựa vào phương pháp `2.1` ở trên được. Khi nhấp vào liên kết thì ta sẽ được đưa tới trang đổi mật khẩu. Tại đây trang web không thực hiện thêm bất kỳ bước xác thực người dùng nào trước khi cho phép ta đổi password tùy ý (cái này có thể dẫn tới lỗ hổng ở phương pháp `2.4` nhưng mình không đề cập ở đây):

![](https://images.viblo.asia/f048454f-c7b5-4cd1-9343-fd8c325b561a.png)

Trong Burp, truy cập đến request chứa URL `/forgot-password`.  Request này được sử dụng để kích hoạt email đặt lại mật khẩu, gửi request này đến Burp Repeater:

![](https://images.viblo.asia/85ba60a1-20da-4aba-b9b6-1c40b9d01f78.png)

Request sử dụng phương thức POST để truyền vào tham số có chứa `username=wiener`. Bên cạnh đó ta có thể thay đổi HOST tại header thành một miền tùy ý và vẫn kích hoạt đặt lại mật khẩu thành công. Ở đây ta sẽ đổi nó thành `Hacker.com`:

![](https://images.viblo.asia/dc0e5b5f-5811-4353-876e-97303caf9117.png)

Quay lại Email client và kiểm tra email đã nhận được:

![](https://images.viblo.asia/10cf4bfd-a185-44f5-becb-6c8a0fd83be9.png)

Liên kết đặt lại mật khẩu lúc này đã chứa miền `Hacker.com`. Như vậy là ta đã có thể kiểm soát được miền đầu ra của liên kết đặt lại mật khẩu.
### Khai thác:
Bài lab trên cho sẵn ta 1 máy chủ khai thác để có thể nhận các request. Quay lại Burp Repeater, thay đổi Host thành tên miền của máy chủ khai thác của mình, đồng thời thay đổi `username=carlos`:

![](https://images.viblo.asia/04471cff-040f-4f3a-8784-243e9c428dbf.png)

Đi tới máy chủ khai thác và mở `Access Log`. Ta sẽ thấy một yêu cầu GET /forgot-password với temp-forgot-password-token là tham số chứa mã thông báo đặt lại mật khẩu của Carlos:

![](https://images.viblo.asia/6d07390f-ac9b-4695-a3c1-5803a2d921e2.png)

Lặp lại bước quên mật khẩu ban đầu để nhận liên kết đặt lại mật khẩu. Vào phần `Email client` để lấy liên kết, thay thế temp-forgot-password-token bằng mã ta vừa lấy được từ`Access Log`:

![](https://images.viblo.asia/35065a11-ee32-4a53-9dd0-78ae2077be62.png)

Liên kết sẽ đưa ta đến giao diện đổi mật khẩu của người dùng Carlos. Thay đổi mật khẩu của Carlos, sau đó đăng nhập và giải quyết lab:

![](https://images.viblo.asia/2039d6b4-3178-4d20-80e5-7efa4401190c.png)

## 2.6. Đặt lại mật khẩu bằng cách sử dụng email kép
Hầu hết những trang web ngày nay sẽ yêu cầu người dùng nhập vào email của họ khi quên mật khẩu. Hướng khai thác của phương pháp trên là khi Hacker nhập vào email của họ, hacker sẽ truyền thêm 1 tham số email của người dùng mà hacker muốn chiếm đoạt.  Nếu liên kết trả về cùng một mã thông báo đặt lại mật khẩu trong email của họ, thì kẻ tấn công có thể chiếm đoạt bất kỳ tài khoản nào mà không cần sự tương tác của người dùng. Về phương pháp khai thác thì ta có thể sử dụng 1 trong những cách sau: 
- Sử dụng cùng 1 tham số đầu vào: email=victim@xyz.tld&email=hacker@xyz.tld
- Sử dụng dấu phân tách: email=victim@xyz.tld%0a%0dcc:hacker@xyz.tld
- Sử dụng các ký tự nối:
    + email=victim@xyz.tld,hacker@xyz.tld
    + email=victim@xyz.tld%20hacker@xyz.tld
    + email=victim@xyz.tld|hacker@xyz.tld
- Sử dụng bảng JSON: {“email”:[“victim@xyz.tld”,”hacker@xyz.tld”]}
Ví dụ về khai thác bằng email kép các bạn có thể tham khảo thêm tại [đây](https://hackerone.com/reports/1175081). 
# 3. Kết luận
Việc để hacker đổi được mật khẩu tài khoản sẽ mang lại tổn thất rất lớn đối với người dùng bị khai thác nói riêng và phía doanh nghiệp nói chung. Bên cạnh việc thường xuyên kiểm tra và nâng cấp nhằm đảm bảo an toàn từ phía server thì mỗi người dùng cũng nên tự bảo vệ tài khoản của bản thân để tránh bị khai thác bằng phương pháp brute force.

Các bạn có thể đọc thêm về brute force tại bài viết trước của mình tại [đây](https://viblo.asia/p/tan-cong-brute-force-la-gi-oOVlYbz458W)

Bài viết trên có sử dụng tư liệu tham khảo của bài viết [All about Password Reset vulnerabilities](https://infosecwriteups.com/all-about-password-reset-vulnerabilities-3bba86ffedc7) và 1 số báo cáo trên [hackerone](https://www.hackerone.com)