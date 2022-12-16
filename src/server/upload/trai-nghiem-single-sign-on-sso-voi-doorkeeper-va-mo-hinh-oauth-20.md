![](https://images.viblo.asia/36e41111-c5b3-42db-a678-cf4a5b0a0b3a.jpg)
Xin chào!

Hôm nay mình lại có dịp viết một bài mới. Trong bài này, mình sẽ chia sẻ về cách mà mình dùng Doorkeeper trong dự án thực tế.
<br>Hiện tại, dự án mình có 2 domain tương ứng với 2 server: Admin và API.
<br>Người dùng đầu tiên sẽ login vào Admin. Và từ đây, sẽ chuyển hướng đến Web app, rồi sau đó mới login vào API để lấy được access token
<br>Vấn đề đặt ra ở đây là, chúng ta sẽ đi từ Admin qua API như thế nào?
> Đã có rất nhiều bài giới thiệu về Doorkeeper là gì? Dùng như thế nào? Nên đối tượng mình nhắm đến trong bài viết này, đó là những ai đã biết đến và kinh qua thằng này. Cho nên mình xin phép được bỏ qua các khái niệm cơ bản.

### 1. Doorkeeper mang tư tưởng của OAuth 2.0
Doorkeeper là 1 gem (Rails engine) và nó xử việc chứng thực người dùng theo mô hình OAuth 2.0
<br>Hình vẽ dưới đây mô tả luồng xử lí cơ bản của mô hình OAuth 2.0
<br>
![](https://images.viblo.asia/b89004b2-f84f-4f2f-860d-0b3afeb047d1.png)
<br>
> Mô hình trên được lấy ra từ [chuẩn RFC](https://tools.ietf.org/html/rfc6749)

<br>Thật sự phải nói là khá trực quan, nhưng không dễ dàng để hiểu và nắm hết được chúng ta sẽ phải làm gì, và làm nó như thế nào.
<br>Trước tiên mình xin giới thiệu về các khái niệm trên hình vẽ - tương ứng với các đối tượng trong dự án của mình (theo định nghĩa kết hợp với kiến thức của bản thân):
1. Client: chính là phía người dùng, và mình sẽ nói là người đang xài Browser (mình nghĩ chỗ này hơi trừu tượng), trong trường hợp là mình đang dùng bên Admin
2. Resource Owner: đây là một server với mục đích cấp quyền cho client, để xác nhận là client này có quyền được login vào API, trong trường hợp này là server Admin
3. Authorization Server: server xác thực quyền của client, và cho phép client login vào và lấy dữ liệu từ API bằng cách trả về cho nó access token, tương ứng với server API
4. Resource Server: trong trường hợp này cũng chính là server API, là server xử lí dữ liệu sau khi người dùng đã login thành công
<br>Tới đây, không biết liệu với những khái niệm của bản thân mình ở trên, thì mọi người đã dễ tưởng tượng hơn về luồng xử lí của OAuth 2.0 chưa.

### 2. Luồng xử lí của OAuth 2.0
Trong thực tế, để login vào 1 API với Doorkeeper, chúng ta có 2 cách để thực hiện việc này.
1. Cách đầu tiên, đó là dùng Username, Password và grant_type (đây là type xác thực của Doorkeeper) trong trường hợp này, có grant_type có thể là password
<br>Cách này, theo như mô hình OAuth 2.0 thì nó tương ứng với 2 luồng (C) và (D). Chắc chắn một điều rằng, nó sẽ không bảo mật bằng khi chúng ta dùng đầy đủ tất cả các luồng từ (A) -> (F)
2. Cách thứ 2, đó chính là dùng đầy đủ các luồng từ (A) -> (F) như mô hình OAuth 2.0 đã mô tả. Đối với trường hợp này, thông tin đăng nhập không phải là Username hay password nữa, và grant_type cũng không phải là passowrd nữa. Lúc này, grant_type sẽ là authorizartion_code. Các thông tin đăng nhập sẽ bao gồm: client_id, client_secret, redirect_uri. Đây là thông tin của application được lưu trong table Doorkeeper::Application.

Mình sẽ đi chi tiết vào cách xử lí của các luồng này sau đây.

#### 1. Request Application Authorization 
Đầu tiên, client sẽ gửi một request đến Resource Owner (server Admin), với params chứa: client_id, redirect_uri và response_type="code" để lấy Authorization Grant, có thể gọi cái này giống như là sự xác thực được phép làm gì đó. 
<br>Ví dụ như khi bạn đi xem phim 18+, nhân viên bán vé sẽ xác thực xem bạn có đủ tuổi để xem bộ phim này không, và cấp cho bạn một cái xác thực, trong trường hợp này chính là Authorization Grant
#### 2. Get Authorization Grant
Sau khi gửi request đi, Resource Owner sẽ xác thực, và nếu thành công, nó sẽ cấp cho bạn 1 cái xác thực  để có thể thực hiện bước tiếp theo. Xác thực này được lưu trong table Doorkeeper::AccessGrant, và sẽ trả về cho bạn 1 cái redirect_uri cộng với 1 mã code trên cái link đấy, có dạng là (http://address?code=13oheasudyf298fdauskjhdq8ưqf)
#### 3. Request Authorization Grant
Sau khi đã có được redirect_uri và code, chúng ta truy cập đến đường link đấy. Nhưng vấn đề ở đây, là nó sẽ không request lên Authorization Server (server API) mà là request đến server của Web application nào đấy. Tất nhiên rồi, vì cái request_uri đấy, ban đầu là mình khai báo cho Web application mà. Rồi từ web app, chúng ta sẽ thêm vào params vài thông tin nữa, đó là client_id, client_secret, redirect_uri và grant_type.
#### 4. Get Access Token
Lúc này, sau khi xác thực thành công, chúng ta sẽ nhận được access_token. 
<br>Mình sẽ không mô tả 2 luồng xử lí cuối cùng, vì đơn giản, khi viết API, ai cũng hiểu 2 luồng cơ bản này - dùng access_token để truy cập vào API và lấy những gì có thể.

### 3. Tóm lại
Đây là lần đầu tiên mình có dịp làm việc với Single Sign On, và được tiếp xúc với mô hình OAuth 2.0. Thì cảm nhận của mình, là thực sự luồng đi nó khá là trơn tru, và hợp lí. Tất nhiên trong lúc code, không phải Doorkeeper sẽ làm tất cả cho mình, vì tuỳ theo yêu cầu của khách hàng, mình phải tuỳ biến rất là nhiều, nhưng chỉ là khía cạnh xử lí code. Còn về đường đi nước bước của nó, khỏi phải bàn. Tất nhiên rồi, vì đây là chuẩn do Google với Facebook cùng đưa ra mà. Nếu mình nói nó không hợp lí thì đơn giản là trình mình chưa đủ để hiểu được cái này thôi.

Một khi bạn đã nắm được tư tưởng của mô hình này, các bạn sẽ rất dễ dàng vẽ lại một mô hình khác, với hướng đi phù hợp với tính chất dự án của các bạn mà không cần phải đắn đo, làm thế nào cho đúng, làm thế nào cho hợp lí. [OAuth 2.0](https://developer.tizen.org/dev-guide/2.4/org.tizen.guides/html/native/account/oauth2_n.htm) - Trang này có mô tả thêm vài luồng đi khác nhau nữa, nhưng đều lấy nền tảng từ Oauth 2.0, các bạn hãy tham khảo nhé!

Trên đây là toàn bộ hiểu biết và cảm nhận của mình khi làm việc với gem Doorkeeper, và mô hình xác thực OAuth 2.0. Nếu có một thông tin gì không chính xác, mạnh dạn comment bên dưới, chúng ta có thể cùng trao đổi thêm nhé!

Cảm ơn mọi người đã đọc.

<br>THÂN ÁI!