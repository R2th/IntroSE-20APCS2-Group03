Câu chuyện này bắt đầu từ năm 2020, hồi đó có ngồi vọc vạch viết Restful API sử dụng `Nestjs` framework. Sau khoảng hơn một năm khi dự án đã lên production, khách hàng của tôi có thêm những yêu cầu mới. Tuy nhiên, lúc đó tôi đã là một Fan hâm mộ của `Golang` và chợt nhận ra mình phải giải quyết thêm một bài toán nữa. Đó chính là bài toán liên quan đến `Authentication` và `Authorize`. Trong lúc còn đang loay hoay không biết phải đi đâu về đâu thì mình đã may mắn được các cao nhân mách nước và bắt đầu tìm hiểu giao thức `OAuth2` từ đó. Hôm nay, mình sẽ chia sẻ với các bạn những gì mình đã học được từ `OAuth2` nhé. Chúng ta cùng bắt đầu nào!!!

### OAuth2 là gì?
* `OAuth2` là phiên bản 2 của giao thức `OAuth`. Giao thức này cho phép các ứng dụng của bên thứ ba cấp quyền truy cập giới hạn vào một dịch vụ HTTP thay mặt chủ sở hữu tài nguyên hoặc cho phép ứng dụng của bên thứ ba có quyền truy cập thay mặt cho chính nó. Quyền truy cập được yêu cầu bởi một khách, có thể là một trang **web** hoặc **ứng dụng di động**. 
* Phiên bản 2 được mong đợi sẽ làm đơn giản hóa phiên bản trước và làm cho tương tác giữa các ứng dụng khác nhau dễ dàng hơn.
* Đặc tả vẫn đang được biên soạn và giao thức vẫn liên tục phát triển, nhưng điều đó không làm cản trở việc nó được cài đặt và chào đón bởi những gã khổng lồ như **Google** hay **Facebook**.  
### Kiến thức cơ bản:
***Role*** (OAuth2 định nghĩa 4 role):
* chủ sở hữu tài nguyên (`resource owner`): thường chính là bạn.
* máy chủ tài nguyên (`resource server`): máy chủ lưu trữ dữ liệu được bảo vệ (VD: Google lưu trữ dữ liệu về hồ sơ và thông tin cá nhân của bạn).
* khách (`client`): ứng dụng yêu cầu truy cập tới một máy chủ tài nguyên (có thể là trang web PHP, ứng dụng Javascript hoặc một ứng dụng di động của bạn).
* máy chủ xác thực (`authorization server`): máy chủ sinh mã xác thực truy cập (***access token***) cho khách. Mã xác thực này được khách dùng để gửi yêu cầu đến máy chủ tài nguyên. Máy chủ này có thể tương tự máy chủ xác thực (thông thường sẽ là như vậy).

***Token*** (Mã xác thực): Mã xác thực là các chuỗi ngẫu nhiên được sinh bởi máy chủ xác thực và được phát hành khi khách yêu cầu. 
1. **Có hai loại mã xác thực**:
* Mã xác thực truy cập (***access token***): đây là mã quan trọng nhất vì nó cho phép ứng dụng bên thứ ba được truy cập vào dữ liệu người dùng. Mã này được gửi từ khách dưới dạng tham số (parameter) hoặc một header trong yêu cầu gửi tới máy chủ tài nguyên. Nó bị giới hạn thời gian có hiệu lực bởi máy chủ xác thực. nó cần phải được bảo mật càng sớm càng tốt nhưng chúng ta sẽ thấy điều đó không phải lúc nào cũng thực hiện được, đặc biệt khi khách là một trình duyệt web gửi yêu cầu tới máy chủ tài nguyên bằng Javascript.
* Mã xác thực làm mới (***refresh token***): mã này được phát hành cùng với mã xác thực truy cập, nhưng không giống mã xác thực truy cập, nó không được gửi trong mỗi yêu cầu của khách tới máy chủ tài nguyên. Nó chỉ được gửi tới máy chủ xác thực để gia hạn (*renew*) mã xác thực truy cập khi nó đã hết hạn. vì những lý do an ninh, không phải lúc nào ta cũng lấy được mã này.
2. **Phạm vi của mã xác thực truy cập**: 
* Phạm vi (*scope*) là một tham số dùng để giới hạn quyền của mã xác thực truy cập. Máy chủ xác thực là nơi định nghĩa danh sách các phạm vi. Khách cần gửi các phạm vi cần sử dụng cho ứng dụng của mình trong khi gửi yêu cầu tới máy chủ xác thực. Phạm vi càng hẹp thì khả năng chủ sở hữu tài nguyên cấp phép truy cập càng cao.
3. **HTTPS**:
* `OAuth2` yêu cầu sử dụng **HTTPS** khi giao tiếp giữa khách và máy chủ xác thực do các thông tin nhạy cảm được trao đổi giữa 2 thành phần này (các mã xác thực hoặc có thể là `resource owner credentials`). Trên thực tế bạn không bắt buộc phải làm như vậy nếu tự xây dựng máy chủ xác thực của riêng mình nhưng bạn nên biết rằng bạn đang tạo ra một lỗ hổng an ninh lớn bằng việc làm đó.
4. **Đăng ký như một máy khách**:
* Khi bạn muốn truy xuất dữ liệu từ máy chủ tài nguyên bằng `OAuth2`, bạn phải đăng ký làm ứng dụng khách của máy chủ xác thực. 
Mỗi nhà cung cấp có thể tự do cho phép điều này theo phương pháp mà họ lựa chọn. Giao thức chỉ xác định các tham số phải được chỉ định bởi máy khách và những tham số sẽ được máy chủ xác thực trả về. Dưới đây là các tham số (chúng có thể khác nhau tùy thuộc vào nhà cung cấp): 
```
    - Đăng ký khách (Client registration) 
    - Application Name: tên ứng dụng 
    - Các URL để điều hướng: URL của ứng dụng khách để nhận mã xác thực (authorization code) và mã xác thực truy cập (access token) 
    - (Các) loại cấp quyền (grant type): các loại xác thực (authorization) sẽ được khách hàng sử dụng.
    - Javascript Origin (tùy chọn): tên máy chủ sẽ được phép yêu cầu máy chủ tài nguyên qua XMLHttpRequest. 
```
* Phản hồi của máy chủ xác thực:
```
    - Id khách hàng: chuỗi ngẫu nhiên duy nhất 
    - Client secret: khóa bí mật phải được giữ bí mật 
```
### Các loại cấp quyền xác thực (authorization grant types):
`OAuth2` xác định **4** loại cấp quyền tùy thuộc vào vị trí và tính chất của khách (client) liên quan đến việc lấy mã xác thực truy cập.
1. **Cấp mã xác thực (Authorization Code Grant)**:

***Khi nào nó nên được sử dụng***?
* Nó nên được sử dụng ngay khi máy khách là máy chủ *web*. Nó cho phép bạn có được mã xác thực truy cập tồn tại lâu dài vì nó có thể được gia hạn bằng mã xác thực làm mới (nếu máy chủ xác thực cho phép điều đó). 

***Ví dụ***:
*  Chủ sở hữu tài nguyên: bạn.
*  Máy chủ tài nguyên: một máy chủ của Google.
*  Khách hàng: bất kỳ trang web nào.
* Máy chủ xác thực: một máy chủ của Google.

***Tình huống***:
* Một trang web muốn lấy thông tin về hồ sơ trên Google của bạn. Bạn được chuyển hướng bởi khách (trang web) đến máy chủ xác thực (Google). Nếu bạn cho phép truy cập, máy chủ xác thực sẽ gửi mã xác thực (authorization code) đến máy khách (trang web) trong phản hồi (callback response). Sau đó, mã này được trao đổi (exchange) với mã xác thực truy cập giữa máy khách và máy chủ xác thực. Trang web lúc này có thể sử dụng mã xác thực truy cập này để truy vấn máy chủ tài nguyên (Google) và truy xuất dữ liệu hồ sơ của bạn. Bạn không bao giờ nhìn thấy mã xác thực truy cập, nó sẽ được lưu trữ bởi trang web (ví dụ: trong phiên). Google cũng gửi thông tin khác cùng với mã xác thực truy cập, chẳng hạn như thời gian tồn tại của mã xác thực (token lifetime) và cuối cùng là mã xác thực làm mới (refresh token). Đây là tình huống lý tưởng và an toàn hơn vì mã xác thực truy cập không được chuyển (pass) qua phía máy khách (trình duyệt web trong ví dụ). 

***Sơ đồ trình tự***

![](https://images.viblo.asia/e938df67-106c-4c7f-b1de-6ed2648b10d8.png)
   
2. **Cấp quyền ẩn (Implicit grant)**:

***Khi nào nó nên được sử dụng***?
* Nó thường được sử dụng khi máy khách đang chạy trong trình duyệt sử dụng ngôn ngữ kịch bản như Javascript. Loại cấp quyền này không cho phép phát hành mã xác thực làm mới (**refresh token**).

***Ví dụ***:
* Chủ sở hữu tài nguyên: bạn.
* Máy chủ tài nguyên: một máy chủ Facebook.
* Khách hàng: một trang web sử dụng AngularJS chẳng hạn.
* Máy chủ ủy quyền: một máy chủ Facebook.

***Tình huống***:
* Khách hàng (AngularJS) muốn lấy thông tin về hồ sơ Facebook của bạn.
* Bạn được trình duyệt chuyển hướng đến máy chủ xác thực (Facebook). 
* Nếu bạn cho phép truy cập, máy chủ xác thực sẽ chuyển hướng bạn đến trang web có mã xác thực truy cập trong phân đoạn (fragment) URI (không được gửi đến máy chủ web). Ví dụ về gọi lại (callback): http://example.com/oauthcallback#access_token=MzJmNDc3M2VjMmQzN. 
* Mã thông báo truy cập này lúc này có thể được máy khách (AngularJS) truy xuất và sử dụng để truy vấn máy chủ tài nguyên (Facebook). Ví dụ về truy vấn: https://graph.facebook.com/me?access_token=MzJmNDc3M2VjMmQzN. 

`Có thể bạn tự hỏi làm cách nào mà ứng dụng khách có thể thực hiện lời gọi đến API Facebook bằng Javascript mà không bị chặn vì chính sách nguồn gốc giống nhau (Same Origin Policy)? Yêu cầu tên miền chéo (cross-domain request) này có thể thực hiện được vì Facebook cho phép nó nhờ header có tên Access-Control-Allow-Origin hiện diện trong phản hồi`.

**Lưu ý: loại xác thực này chỉ nên được sử dụng nếu không còn loại nào khác. Thật vậy, nó là loại kém an toàn nhất vì mã xác thực truy cập sẽ bị lộ (và do đó dễ bị tấn công) ở phía khách**.

***Sơ đồ trình tự***

![](https://images.viblo.asia/0335360a-0d11-479b-a069-64d549cb8c62.png)

3.**Resource Owner Password Credentials Grant**:

***Khi nào nó nên được sử dụng***?

* Với loại cấp quyền này, thông tin xác thực (mật khẩu) được gửi đến máy khách và sau đó đến máy chủ xác thực. Do đó bắt buộc phải có sự tin tưởng tuyệt đối giữa hai chủ thể này. Nó chủ yếu được sử dụng khi máy khách đã được phát triển bởi cùng nhà phát triển với máy chủ xác thực. Ví dụ: chúng ta có thể tưởng tượng một trang web có tên example.com đang tìm kiếm quyền truy cập vào các tài nguyên được bảo vệ của tên miền phụ api.example.com của chính nó. Người dùng sẽ không ngạc nhiên khi nhập thông tin đăng nhập / mật khẩu của mình trên trang web example.com vì tài khoản của họ đã được tạo trên đó. 

***Ví dụ***:

* Chủ sở hữu tài nguyên: bạn có tài khoản trên trang web acme.com của công ty Acme.
* Máy chủ tài nguyên: Công ty Acme tiết lộ API của mình tại api.acme.com.
* Khách hàng: trang web acme.com từ công ty Acme.
* Máy chủ ủy quyền: một máy chủ Acme.

***Tình huống***:

* Công ty Acme, đang hoạt động tốt, nghĩ rằng sẽ cung cấp một API RESTful cho các ứng dụng của bên thứ ba.
* Công ty này cho rằng sẽ thuận tiện khi sử dụng API của riêng mình để tránh phải “tái tạo lại bánh xe”. 
* Công ty cần một mã xác thực truy cập để gọi các phương thức của API của riêng mình. 
* Để làm điều này, công ty yêu cầu bạn nhập thông tin đăng nhập của bạn thông qua một biểu mẫu HTML tiêu chuẩn như bạn thường làm. 
* Ứng dụng phía máy chủ (trang web acme.com) sẽ trao đổi thông tin đăng nhập của bạn với mã xác thực truy cập từ máy chủ xác thực (tất nhiên nếu thông tin đăng nhập của bạn hợp lệ). 
* Giờ Ứng dụng này có thể sử dụng mã xác thực truy cập để truy vấn máy chủ tài nguyên của chính nó (api.acme.com).

***Sơ đồ trình tự***:

![](https://images.viblo.asia/3c8da819-0215-4da9-abad-757a95b417fa.png)

4.**Lỗ hổng trong Cấp mã xác thực (Authorization Code Grant)**

***Khi nào nó nên được sử dụng***?

* Loại cấp quyền này được sử dụng khi khách là chủ sở hữu tài nguyên. Sẽ không có xác thực để lấy từ người dùng cuối.

***Ví dụ***:

* Chủ sở hữu tài nguyên: bất kỳ trang web nào.
* Máy chủ tài nguyên: Google Cloud Storage.
* Khách hàng: chủ sở hữu tài nguyên.
* Máy chủ ủy quyền: một máy chủ của Google.

***Tình huống***:

* Trang web lưu trữ các file của nó trên Google Cloud Storage.
* Trang web phải thông qua API của Google để truy xuất hoặc sửa đổi tệp và phải xác thực với máy chủ xác thực. 
* Sau khi được xác thực, trang web sẽ nhận được mã thông báo truy cập hiện có thể được sử dụng để truy vấn máy chủ tài nguyên (Google Cloud Storage). 

`Ở đây, người dùng cuối không phải cấp quyền truy cập vào máy chủ tài nguyên.`

***Sơ đồ trình tự***:

![](https://images.viblo.asia/5fc05b8a-12b9-4a48-adc1-032097282484.png)

### Cách dùng mã xác thực truy cập (Access token usage):
Mã xác thực (*access token*) có thể được gửi theo nhiều cách đến máy chủ tài nguyên. Bạn có thể sử dụng **GET** hoặc **POST**.

***Ví dụ*** 1:
```
GET: https://api.example.com/profile?access_token=MzJmNDc3M2VjMmQzN.
```
**Điều này là không lý tưởng vì mã thông báo có thể được tìm thấy trong nhật lý truy cập của máy chủ web.**

***Ví dụ*** 2:

***Authorization header***
```
GET / profile HTTP / 1.1 
Máy chủ: api.example.com
Authorization: Bearer MzJmNDc3M2VjMmQzN 
```
**Cách này có vẻ tốt hơn, nhưng không phải máy chủ tài nguyên nào cũng chấp nhận điều này.**

### An ninh:
Có khá nhiều ý kiến khác nhau chỉ trích về giao thức `OAuth2` vẫn chưa đáp ứng được những tiêu chuẩn bảo mật. Tuy nhiên, nó thường đến từ việc do cách thức triển khai giao thức không tốt. Nói về bảo mật thì cũng không phải thế mạnh của mình, vì thế phần này mình sẽ chỉ đề cập đến những lỗ hổng trong giao thức `OAuth2` và những link liên quan để mọi người cùng thảo luận thêm. Dưới đây là một vài những sai lần cần tránh khi sử dụng:
1. **Lỗ hổng trong Cấp mã xác thực (Authorization Code Grant)** [More Infomation!](https://tools.ietf.org/html/rfc6749#section-10.12)
2.  **Lỗ hổng trong cấp quyền ẩn (Implicit Grant)** [More Infomation!](https://tools.ietf.org/html/rfc6819#section-4.4.2.6)
3.  **Clickjacking** [More Infomation!](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

### Tổng kết:
Dù thích hay không thích, muốn hay không muốn thì mọi người cũng có thể thấy được `OAuth2` dường như đang tự coi mình  như một giải pháp tiêu chuẩn để phân quyền giữa các ứng dụng khác nhau. Trong bất kỳ trường hợp nào, tôi hy vọng tôi đã giúp các bạn có thêm một góc nhìn về cách hoạt động của nó. 

Đây là một bài viết khá dài. Và tôi rất vui khi mọi người đọc đến những dòng cuối cùng của bài viết. Mọi thiếu sót trong bài viết mọi người có thể để ở bên dưới comment để cùng thoải luân nhé. Cảm ơn mọi người rất nhiều.
[Link bài viết gốc trên blog của mình!](https://chiasekienthuc.netlify.app/blog/oauth2)