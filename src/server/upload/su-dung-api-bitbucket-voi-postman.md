# Giới thiệu
## Bitbucket API
`Bitbucket` là một dịch vụ lưu trữ trên web dành cho các dự án có sử dụng Git/Mercurial revision.
Bạn có thể hiều một cách đơn giản là Bitbucket có cơ chế làm việc giống Github. 

`APi` là gì? API - "Application Programming Interface" một "giao diện" giữa phần mềm với phần mềm. API là cách để các phần mềm giao tiếp với nhau và tận dụng năng lực của nhau.

`Bitbucket API` là các API được các Bitbucket cung cấp để các ứng dụng khác có thể giao tiếp và sử dụng các tính năng của Bitbucket.

Cách sử dụng API là do nhà cung cấp đề ra với các dữ liệu gửi lên và nhận về. Bạn có thể tìm hiều các API mà Bitbucket hỗ trợ trên trang dành cho Developer của Atlassian [tại đây](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories).

# Sử dụng Bitbucket API bằng Postman
## Postman
Postman là một công cụ hỗ trợ test API, để tìm hiểu thêm về cách cài đặt và sử dụng bạn có thể xem thêm bài của  [@hientrinh](https://viblo.asia/p/api-testing-su-dung-postman-gGJ592JrKX2).

## Một số API thường dùng
### API đăng nhập
Đầu tiên để có thể tích hợp và tùy chỉnh các dữ liệu lưu trữ trên Bitbucket chúng ta cần có quyền đăng nhập vào tài khoản. Để làm điều này Bitbucket API đã cung cấp một API đăng nhập.
Nhưng trước đó chúng ta cần có xác thực `OAuth consumers` rằng mình sẽ cho phép sử dụng và tùy chỉnh dữ liệu Bitbucket. Cũng giống như cần có một người quản lý tòa nhà để quản lý những ai được vào liên hệ với anh ta như thế nào.

Tạo  `OAuth consumers` bằng tay qua trang chủ https://bitbucket.org vào Setting -> Bitbucket settings -> OAuth -> Add  consumers: 
*  Name: tùy chọn (oauth).
*  Callback URL: là địa nơi bạn sẽ nhận các dữ liệu trả về của Bitbucket (http://localhost::8000/bitbucket/callback). 
*  URL: chuyển hướng đến sau khi ủy quyền truy cập. (Cần thiết cho OAuth 2).
Còn mấy trường nữa ai cần gì có thể điền thêm :) 
* Permissions: Mỗi tick là một quyền bạn sẽ cấp cho User đang sử dụng OAuth này.

Sau đó `Save` lại. Tại danh sách `OAuth consumers` sẽ có thêm 1 oauth với các thông tin: `Key` và `Secret`

Và bây giờ có thể sử dụng để lấy `chìa khóa` từ người quản lý tòa nhà rồi.Với những ai sử dụng Laravel, chúng ta có thể sử dụng [Laravel Socialite](https://laravel.com/docs/5.7/socialite) để lấy thông tin chìa khóa (token) và nhớ lưu lại Chứng minh thư (refresh token) nhé vì token Bitbucket nhanh hết hạn lắm (7200s). Khi đó chúng ta cần lấy lại chìa khóa từ chứng minh thư được cấp.

Còn nếu không sử dụng Laravel mà sử dụng Postman thì sao? 
Chúng ta sẽ sử dụng OAuth 2.0 của Postman: Chọn Authorization -> Type -> OAuth 2.0 -> Get new access token :


Điền các trường cần thiết để get token nào: 
* Auth URL: https://bitbucket.org/site/oauth2/authorize
* Access Token URL: https://bitbucket.org/site/oauth2/access_token
* ....

![](https://images.viblo.asia/0341e2e6-188b-4e45-a03d-e1569ebcd245.PNG)
Chú ý: cần thay đổi Callback URL cho đúng đường dẫn nhận dữ liệu trả về mà bạn đã cấu hình trong khi tạo Oauth ở trên. Dù đường dẫn không tồn tại cũng được nhưng phải giống nhé. 

rồi sau đó click `Request Token` bitbucket sẽ trả về:
 
 ![](https://images.viblo.asia/02d28af1-c12b-4bc4-89b9-aab87105d137.PNG)
 
 Bạn có thể ấn tiếp `Use Token` để sử dụng Token này đăng nhập API bitbucket.

Còn một cách nữa để lấy Token mà bạn có thể thực hiện khi nhớ Refesh_token (chứng minh thư :))
 Đó là `Send` POST đến URL: https://bitbucket.org/site/oauth2/access_token
 với: 
 * Authorization là Basic: User name là Client ID, Password là Secret
 *  Body là: grant_type = refresh_token ;   refresh_token = adfasdfas...dfdfdfd
và sẽ được dữ liệu trả về: 
 
![](https://images.viblo.asia/f27d5fbf-ed53-4270-accc-71719cd7e102.PNG)

### API khác
Đăng nhập xong rồi hãy nhớ lưu lại `Token` và Refesh_token nhé! Và từ đó sẽ sử dụng được cho các API mà Bitbucket hỗ trợ.

Ví dụ để lấy tất cả các repo của usename là tessst1 ta có thể sử dụng Postman bằng cách:
`Send` với phương thức GET đến URL https://bitbucket.org/api/2.0/repositories/tessst1
với Authorization: "Bearer {token}" hoặc Oauth 2.0 token.

![](https://images.viblo.asia/901f51ed-e402-42d1-a178-39b97a2107ac.PNG)
  
Tương tự cho các API khác. 
## Kết luận
Bitbucket API là một công cụ hỗ trợ các nhà phát triển ứng dụng Bitbucket vào ứng dụng của họ :
```
Generate your own OAuth consumer key and secret to build your own custom integration with Bitbucket.
```
Cũng như các API khác thì Bitbucket không thể đáp ứng được tất cả các yêu cầu của người dùng ví dụ như: chưa có API lấy ra Collaborators như Github... (cũng có thể là mình chưa tìm thấy)

Nhưng dù sao thì Bitbucket API cũng cho chúng ta tương tác rất nhiều đến các dữ liệu như: fetch, webhook...

Cảm ơn bạn đã giành thời gian cho bài viết của mình!