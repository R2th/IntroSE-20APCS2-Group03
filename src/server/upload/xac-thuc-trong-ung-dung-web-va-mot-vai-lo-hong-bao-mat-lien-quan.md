Xác thực là một trong các bài toán vô cùng quan trọng đối với một hệ thống, tổ chức. Không chỉ trong lĩnh vực công nghệ thông tin mà còn trong đời sống thường ngày chúng ta vẫn thường xuyên bắt gặp. Ví dụ, muốn vào công ty phải có thẻ của công ty cấp, muốn lấy xe thì phải có vé xe hoặc thẻ gửi xe... Đây đều là những ví dụ đơn giản nhất cho vấn đề xác thực mà chúng ta vẫn thường xuyên gặp. Còn đối với hệ thống thông tin, mỗi khi chúng ta nhập đăng nhập một hệ thống chính là một lần chúng ta phải thực hiện xác thực. Việc này có rất nhiều các cơ chế khác nhau, mỗi cơ chế lại có điểm mạnh, điểm yếu riêng để có thể cân nhắc và sử dụng. Trong bài này, mình sẽ nói sơ qua về vấn đề xác thực trong hệ thống thông tin nói chung và ứng dụng web nói riêng cũng như các lỗ hổng có thể có trong các cơ chế xác thực được sử dụng.

## I. Xác thực là gì?
### 1. Khái niệm xác thực
Theo định nghĩa từ **RFC 4949**, xác thực có thể được hiểu là

> The process of verifying a claim that a system entity or system resource has a certain attribute value.

Tạm hiểu đây là quá trình xác minh một tuyên bố rằng một thực thể hay tài nguyên của hệ thống có một thuộc tính nhất định. Khái niệm này có thể hơi trừu tượng và chung chung nên mình sẽ sử dụng định nghĩa của NIST trong *Electronic Authentication Guideline* về xác thực người dùng điện tử:

>Electronic authentication (e-authentication) is the process of establishing confidence in
user identities electronically presented to an information system.

Cái này tạm dịch là 

> Xác thực người dùng điện tử (e-athentication) là quá trình thiết lập tính tin cậy của định danh người dùng được biểu diễn điện tử trong hệ thống thông tin.

Trên đây là 2 khái niệm khá khô khan về việc xác thực. Đơn giản mà nói xác thực là quá trình xác thực 1 *định danh có vai trò gì trong hệ thống*. Quá trình này về cơ bản gồm 2 bước là 
- Định danh: Là quá trình hệ thống gán cho một người dùng một định danh để xác thực danh tính của mình
- Xác minh: Là quá trình người dùng chứng minh với hệ thống rằng định danh đó thực sự chính là mình.

Ví dụ đơn giản thế này, một công ty X có 1 nhân viên tên Alice. Công ty cấp cho Alice một mã nhân viên là *IDa* thì IDa sẽ là định danh của Alice đối với công ty. Kèm với đó, công ty ghi nhận lại vân tay của Alice. Mỗi khi ra vào công ty, Alice phải quét vân tay để có thể mở cửa ra vào - đây là quá trình xác minh.

### 2. Các phương pháp xác thực phổ biến
Hiện nay, việc xác thực đa phần được thực hiện theo 4 loại chính:
1. Dựa trên thứ mà người dùng biết: username-password, mã PIN, câu hỏi bảo mật, ...
2. Dựa trên thứ mà người dùng sở hữu: khóa mã hóa, access token, thẻ điện tử, thẻ thông minh,...
3. Dựa trên sinh trắc của người dùng: vân tay, khuôn mặt, võng mạc,..
4. Dựa trên sinh trắc động (các hành vi đặc trưng) của người dùng: chữ viết tay, chữ ký, giọng nói,...

### 3. Các cơ chế xác thực phổ biến trong ứng dụng web
Đối với việc xác thực cho một ứng dụng web hiện nay, người ta thường dựa trên các yếu tố người dùng biết hoặc người dùng sở hữu. Các cơ chế phổ biến thường được dùng có thể kể tới như:
1. Sử dụng cặp username-password
2. Sử dụng secret-key, access-token,...
3. Xác thực đa yếu tố
4. Sử dụng SSO (OAuth, OpenID connect, SAML,...)

Ngoài ra, còn rất nhiều các phương thức khác có thể sử dụng trong việc xác thực đối với ứng dụng web như sử dụng chứng chỉ xác thực, sử dụng ứng dụng xác thực,... Một ứng dụng web có thể sử dụng nhiều cơ chế xác thực khác nhau cũng như phối hợp các phương pháp xác thực với nhau tùy theo ý muốn của nhà phát triển ứng dụng web. 
## II. Các lỗ hổng có thể có trong quá trình xác thực
Không có một hệ thống an toàn, cũng không có một giải pháp hoàn hảo. Do đó, mỗi một cơ chế xác thực cũng luôn tồn tại những vấn đề riêng của chúng. Trong bài này, mình sẽ nói qua về các lỗ hổng, tấn công có thể có đối với một số các cơ chế xác thực phổ biến hiện nay. Đương nhiên, đây chưa phải là tất cả các tấn công có thể xảy ra, nó chỉ là những phương pháp thông thường mà các cơ chế này phải đối mặt thôi.
### 1. Username-password
#### a. Tấn công brute-force và tấn công từ điển
Trước hết nói qua một chút về khái niệm của 2 kiểu tấn công này. 
1. Tấn công brute-force: Là loại tấn công *try and error*. Cách hoạt động của nó là thử tất cả các trường hợp có thể có đến khi nào đạt được giá trị đúng.
2. Tấn công từ điển: Là loại tấn công *try-and-error*. Cách hoạt động của tấn công từ điển là thử tất cả các trường hợp đã được định nghĩa sẵn (trong từ điển) đến khi có giá trị đúng hoặc tất cả các trường hợp đều sai.

Về cơ bản, đây là 2 kiểu tấn công cơ bản nhất, đơn giản nhất, nghe qua là hiểu liền. Đối với tấn công loại này, thường sử dụng với xác thực bằng username-password như
- **Brute-force mật khẩu**: Kiểm tra tất cả các mật khẩu có thể có cho một username đến khi có mật khẩu đúng
- **Brute-force username**: Kiểm tra tất cả username của của hệ thống với cùng một (hoặc một số mật khẩu). Ví dụ, trong 1 hệ thống 1 triệu người dùng, có lẽ sẽ có 1 vài người sử dụng mật khẩu là 12345678. Điều này thường dễ hơn vì một số website sẽ giới hạn số lần nhập sai mật khẩu dựa theo username thay vì theo địa chỉ IP.
- **Do thám username**: Việc lộ tên tài khoản của người dùng hệ thống đôi khi là một vấn đề đáng chú ý khi nó có thể cho kẻ tấn công lên kế hoạch cho các tấn công xa hơn như phishing, brute-force password,... Việc do thám này có thể thực hiện dưới 1 số điều kiện như
    - Response trả về khi xác thực thành công và thất bại khác nhau
    - Response trả về khi sai mật khẩu và sai username khác nhau
    - Thời gian trả về response khi xác thực thành công và thất bại khác nhau
    - ...

#### b. Bypass các bảo vệ brute-force
Hiển nhiên với một tấn công đơn giản mà hiệu quả như brute-force, người ta phải áp dụng các biện pháp để hạn chế nó. Có thể kể tới các biện pháp như:
- Giới hạn số lần nhập sai mật khẩu của một tài khoản
- Giới hạn số lần nhập sai thông tin gửi từ một địa chỉ IP
- Giới hạn số request có thể được gửi từ một địa chỉ IP
- Sử dụng một token bảo vệ (ví dụ như csrf token)
- Sử dụng captcha
- ...

Tuy nhiên, việc áp dụng các biện pháp trên ra sao, đặt giới hạn như thế nào cũng không phải đơn giản. Việc thiết lập sai các bảo vệ này có thể dẫn tới việc kẻ tấn công có thể vượt qua các bảo vệ này và tiếp tục bruteforce. Các hạn chế có thể xảy ra như:
- Nếu giới hạn quá ít, với người dùng trí nhớ kém (như mình) có thể sẽ bị khóa tài khoản trong bất lực.
- Nếu giới hạn quá dài, thì kẻ tấn công may mắn sẽ thành công trước giới hạn bị khóa.
- Thời gian khóa quá ngắn thì sẽ vô dụng
- Thời gian khóa quá dài có ảnh hưởng tiêu cực tới trải nghiệm người dùng.
- Thông thường sẽ có các cơ chế mở khóa cho các tài khoản và IP. Nếu các cơ chế này có lỗ hổng thì kẻ tấn công vẫn có thể khai thác được
- ...


### 2. HTTP basic authentication
Việc sử dụng cơ chế *HTTP basic authentication* khá phổ biến vì tính đơn giản và tiện dụng của nó. Trong cơ chế này, client sẽ gửi một yêu cầu xác thực lên server và nhận về một token xác thực. Token này sẽ được gửi trong header của mọi yêu cầu phía client gửi lên sau này. Header này có dạng
```http
Authorization: Basic base64(username:password)
```
Ví dụ
```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Tuy nhiên, cơ chế này có những rủi ro riêng của nó. Có thể kể tới như:
- Mã hóa base64 là mã hóa 2 chiều và yếu, kẻ tấn công có thể tấn công Man-In-The-Middle lấy được token và có được username và password
- Bản thân cơ chế này không hỗ trợ các biện pháp chống tấn công brute-force

Việc khai thác được HTTP basic authentication tuy thông thường chỉ cho phép kẻ tấn công truy cập tới các trang không quá nhạy cảm. Tuy nhiên, đây có thể là bước đệm để có hắn có thể thực hiện các tấn công xa hơn.
### 3. Xác thực đa yếu tố
Về cơ bản, xác thực đa yếu tố sinh ra để tăng tính bảo mật cho việc xác thực. Tuy nhiên, việc triển khai xác thực đa yếu tố đôi khi có thể bị khai thác nếu các cấu hình hay logic xác thực được triển khai không an toàn. Dưới đây mình sẽ xem xét 1 số trường hợp có thể xảy ra đối với quá trình xác thực 2 yếu tố.

#### a. Người dùng ở trạng thái đã đăng nhập trước khi nhập mã xác thực
Đôi khi, các ứng dụng để trạng thái của người dùng sau khi xác thực bước 1 là đã xác thực. Điều này dẫn đến việc người dùng không cần thực hiện xác thực bước 2 để có thể truy cập vào ứng dụng web. Dưới đây là một ví dụ

![image.png](https://images.viblo.asia/f877a737-df6e-473c-98e1-7ce533ccca19.png)

Ở đây, mình có một trang cá nhân của người dùng chứa email và muốn thay đổi email của người dùng cần phải thực hiện đăng nhập qua 2 bước. Bước đầu tiên là đăng nhập với username và password

![image.png](https://images.viblo.asia/29d59923-4bcc-4dcf-a56f-6ae193d2a222.png)

Tiếp theo đó, người dùng được yêu cầu nhập mã xác thực gửi tới email của họ. 

![image.png](https://images.viblo.asia/0969d1f6-9c69-49d9-80e5-c329068d1b14.png)

Tuy nhiên, ứng dụng này lại cấp cho người dùng một session hợp lệ ngay sau khi xác thực bước 1

![image.png](https://images.viblo.asia/f2478dc5-3e4c-4e8d-b8d2-4e1b1e1736c5.png)

Và người dùng có thể bỏ qua bước nhập mã xác thực mà trực tiếp truy cập vào các tài nguyên mà không cần xác thực bước 2.

Nguyên nhân của lỗi này có thể có 2 nguyên nhân chính
- Nhà phát triển ứng dụng web thiếu kiến thức và cấu hình sai
- Tính năng xác thực 2 bước được phát triển sau và việc xử lý session trước đó vẫn được dữ nguyên, chỉ forward thẳng qua xác thực bước 2

#### b. Lỗ hổng trong logic xác thực đa yếu tố
Đôi khi, trong cơ chế xác thực của ứng dụng web có thể có lỗ hổng cho phép kẻ tấn công khai thác được. Dưới đây là một ví dụ rất đơn giản về vấn đề này.

Ở đây, cũng như ví dụ trước, sẽ có 2 bước xác thực là username-password và mã xác thực. Tuy nhiên sau khi người dùng sau khi xác thực với username và password sẽ được cấp 1 cookie tạm thời chứa thông tin người dùng:

![image.png](https://images.viblo.asia/38042417-34c0-4d19-9bdf-d8ec4dbf8760.png)

Cookie `verify=wiener` này sử dụng username để làm giá trị. Tuy nhiên kẻ tấn công có thể thực hiện sửa đổi giá trị này để tạo mã xác thực cho người dùng carlos

![image.png](https://images.viblo.asia/de1b460d-eaa7-4b91-855f-7628730e0b13.png)

Kẻ tấn công sau đó sẽ brute-force mã xác thực này

![image.png](https://images.viblo.asia/45fed78d-9721-4d32-b7fc-a00169569c9c.png)
Và với giá trị 1649 thì việc xác thực thành công

![image.png](https://images.viblo.asia/df52d799-c7d9-4984-9e4c-46845133b238.png)

![image.png](https://images.viblo.asia/b74ac43d-e4c4-4f8b-866b-723f271a8b74.png)

Sau khi xác thực đúng mã xác thực, ứng dụng dựa vào giá trị của cookie để trả về trang cá nhân của người dùng và kẻ tấn công truy cập được vào trang cá nhân của carlos đáng thương.

![image.png](https://images.viblo.asia/0189240f-02c7-4972-bc11-d8177a94998d.png)

#### c. Brute-force mã xác thực
Như ví dụ trên, việc sử dụng mã xác thực mà không có cơ chế bảo vệ có thể cho phép kẻ tấn công thực hiện brute-force mã này.

### 4. OAuth2
Mình đã từng viết 2 bài về việc cấu hình và lỗ hổng có thể có trong OAuth2, mọi người có thể tham khảo

[OAuth 2.0 và vài vấn đề bảo mật liên quan (Phần 1)](https://viblo.asia/p/oauth-20-va-vai-van-de-bao-mat-lien-quan-phan-1-yMnKM28zZ7P)

[OAuth 2.0 và vài vấn đề bảo mật liên quan (Phần 2)](https://viblo.asia/p/oauth-20-va-vai-van-de-bao-mat-lien-quan-phan-2-E375z7VqKGW)

### 5. Lỗ hổng khác của ứng dụng web
Ngoài các lỗ hổng trên còn rất nhiều các lỗ hổng khác có thể ảnh hưởng đến quá trình xác thực khác như
- Thiếu bảo vệ đối với cookie session
    - Thiết lập CSP không đúng
    - Không có các cờ an toàn như httpOnly hay SESSION_SECURE_COOKIE=true
    - ...
- Tấn công XSS
- Tấn công CSRF
- Tấn công lừa đảo (phishing)
- ...
- Cấu hình sai các chức năng
    - tạo mới mật khẩu
    - quên mật khẩu
    - thay đổi mật khẩu
    - đăng xuất
    - ...
- ...

Ngoài các lỗi này còn rất nhiều các lỗ hổng khác có thể khai thác vào cơ chế xác thực của ứng dụng web mà bài này chưa thể đề cập hết được.
### 6. Yếu tố con người
Máy móc không bao giờ sai, chỉ có người sử dụng nó sai mà thôi. Trong hệ thống thông tin, con người vẫn luôn là một điểm yếu chí mạng của bất cứ hệ thống nào. Một người dùng có thể vô tình hoặc cố ý gây hại đến hệ thống nói chung và cơ chế xác thực nói riêng như:
- Không khóa máy khi ra ngoài để người khác sử dụng tài khoản trong máy
- Nhấp vào các đường link lạ và bị tấn công malware, phising, csrf,...
- Vô tình làm lộ tài khoản trong các tấn công phishing
- Cấp quá nhiều quyền hạn khi xác thực SSO
- Chia sẽ mật khẩu với người khác
- Sử dụng mật khảu không an toàn, cùng mật khẩu cho nhiều tài khoản, quản lý tài khoản không an toàn
- ...

Còn vô số các trường hợp khác mà người dùng của hệ thống lại là điểm khai thác của kẻ tấn công. Do đó, việc đào tạo kiến thức về an ninh thông tin đối với người dùng, cấp phát quyền tối thiểu là những việc hết sức quan trọng trong việc đảm bảo an ninh thông tin của hệ thống.

## III. Những điều cần xem xét trong áp dụng các cơ chế xác thực
- Tất cả các thông tin để xác thực đều là thông tin nhạy cảm và phải được bảo vệ ở mức cao nhất
- Người dùng là điểm yếu lớn nhất, do đó việc gia cố điểm yếu này là vô cùng cần thiết. Tổ chức đào tạo, cung cấp kiến thức cho người dùng cũng như chỉ cấp các quyền cần thiết cho người dùng là việc vô cùng quan trọng
- Không nên để username của hệ thống có thể dò được. Điều này có thể cho phép kẻ tấn công thực hiện các tấn công xa hơn trong tương lai.
- Áp dụng các cơ chế chống brute-force
    - rate limit for user
    - rate limit for IP
    - captcha
    - ...
- Kiểm tra kĩ càng logic của code
- Khi viết thêm chức năng, cần xem xét cẩn thận các chức năng khác liên quan
- Áp dụng xác thực đa yếu tố một cách an toàn, chú ý đến việc xử lý logic trong xác thực đa yếu tố
- Áp dụng các cơ chế an toàn như csrf_token, CSP, thêm cờ cho các cookie nhạy cảm,...
- ...

## IV. Kết luận
Xác thực là một quá trình cần thiết và quan trọng trong hệ thống thông tin nói chung và ứng dụng web nói riêng. Có rất nhiều cơ chế xác thực cùng với các lỗ hổng nhắm vào các cơ chế này. Việc cấu hình sai và bị khai thác có thể dẫn tới việc ứng dụng web bị kẻ xấu tấn công. Do đó, nhà phát triển nên biết các lỗ hổng có thể có đối với ứng dụng của mình cũng như các biện pháp hạn chế chúng để tăng cường tính an toàn của ứng dụng web.

Bài viết này đương nhiên chưa thể kể hết về vấn đề xác thực của ứng dụng web, chỉ hy vọng sẽ giúp được mọi người phần nào trong việc cấu hình an toàn trong việc xác thực của ứng dụng web.
## V. Tham khảo
[https://portswigger.net/web-security/authentication/securing](https://portswigger.net/web-security/authentication/securing)