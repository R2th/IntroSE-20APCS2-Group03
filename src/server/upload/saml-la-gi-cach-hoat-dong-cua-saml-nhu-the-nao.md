## Vấn đề của chúng ta 

![image.png](https://images.viblo.asia/cb801e34-2ae8-4c8d-956c-67a05616ef2c.png)
- Ngày nay khi đang trong thời kỳ các ứng dụng web, các dịch vụ dựa trên đám mây khác nhau đã lan rộng và trở nên tiện lợi hơn, các vấn đề liên quan đến ID và mật khẩu đã phát sinh. Như hình mình hoạ trên bạn có thể dễ dàng nhận ra vấn đề hiện tại là gì. Giả sử bạn đang sử dụng 3 dịch vụ và mỗi dịch vụ đều yêu cầu bạn phải có một tài khoản để có thể sử dụng. Vì vậy bạn cần phải có 3 tài khoản cho 3 dịch vụ đó. Và bạn sử dụng càng nhiều dịch vụ thì số tài khoản bạn cần có sẽ tăng dần lên. Điều này dẫn đến việc quản lý tài khoản của bạn sẽ khó khăn hơn. Vì có quá nhiều tài khoản nên có sẽ có lúc bạn không nhớ ra mật khẩu tài khoản của bạn là gì đúng vậy không nhỉ. 
- Vậy có cách nào để cải thiện điều đó không ?
    - Dưới đây với mình sẽ có 2 cách. 
        - Tất cả các dịch vụ đều đăng ký với ID và password giống hệt nhau. ( mỗi lần tạo tài khoản cũng mất thời gian đấy nhỉ ) 
        - SSO (Single Sign-On) được sinh ra từ vấn đề khi các nhà cung cấp dịch vụ muốn người dùng có thể sử dụng các dịch vụ khác nhau mà chỉ cần đăng nhập vào một chỗ duy nhất. 

![image.png](https://images.viblo.asia/5e3d40c0-9fa6-407b-9460-d8e338e14bbd.png)

## SAML là gì 
- Vậy SAML là gì ? 
    - SAML là viết tắt của Security Assertion Markup Language
    - SAML là một tiêu chuẩn dựa trên XML (ngôn ngữ đánh dấu) để xác thực người dùng trên các miền Internet. Nó thường được sử dụng như một tiêu chuẩn để thực hiện đăng nhập một lần cho phép bạn đăng nhập vào nhiều dịch vụ chỉ bằng một lần đăng nhập duy nhất.
    - Khi đăng nhập bằng xác thực SAML, không chỉ xác thực người dùng mà cả thông tin thuộc tính cũng có thể được xác thực, do đó nó có tính năng giới hạn phạm vi truy cập của người dùng.
    - Nói cách khác, ngoài việc đạt được đăng nhập một lần bằng cách sử dụng xác thực SAML, còn có thể kiểm soát quyền truy cập, chẳng hạn như chỉ cho phép các phòng ban (trong công ty) cụ thể truy cập vào một số chức năng.

## SAML hoạt động như thế nào
   Trong xác thực SAML, thông tin xác thực được trao đổi giữa User (người dùng), SP( nhà cung cấp dịch vụ) và IdP (nhà cung cấp dịch vụ đăng nhập một lần). 
    - Giả dụ bạn truy cập vào 1 dịch vụ nào đó ( service A ), và dịch vụ đó cho phép bạn đăng nhập bằng tài khoản Google thì: SP (Service A), IdP (Google)

Sau đây chúng ta sẽ tìm hiểu về cách SAML hoạt động.

![image.png](https://images.viblo.asia/c3fcf7f1-f228-48d0-8f06-1776747f5917.png)

1. Người dùng truy cập SP
2. SP tạo yêu cầu xác thực SAML và trả lời người dùng
3. Người dùng gửi yêu cầu xác thực SAML nhận được từ SP tới IdP
   - Màn hình xác thực IdP được hiển thị và người dùng nhập ID đăng nhập và mật khẩu để xác thực với IdP
4. IdP đưa ra phản hồi xác thực SAML sau khi xác thực thành công
5. Người dùng gửi phản hồi xác thực SAML nhận được từ IdP tới SP
6. Bạn có thể đăng nhập khi SP nhận được phản hồi xác thực SAML

## Tham khảo
- https://www.varonis.com/blog/what-is-saml
- https://riptutorial.com/saml-2-0/example/23445/the-saml2-0-authentication-flow