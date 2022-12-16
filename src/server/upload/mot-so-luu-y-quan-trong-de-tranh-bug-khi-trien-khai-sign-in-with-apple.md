Trong phần trước, mình đã hướng dẫn các bạn implement chức năng Sign In With Apple trong ứng dụng iOS, tuy nhiên để triển khai một cách nhanh chóng và chính xác nhất thì có một vài lưu ý quan trọng cần phải nắm được trước khi bắt tay vào thực hiện.
# Design chỉ có nút Sign In, không có Sign Up ở iOS version thấp
Thông thường các ứng dụng triển khai chức năng này thì đa số là main tain, có nghĩa là thêm button Sign In With Apple vào màn hình sign in hoặc sign up có sẵn. Điều này cũng đã được đề cập từ trước, khiến design bị hạn chế và chúng ta phải chọn phù hợp nhất có thể với thiết kế có sẵn sao cho hài hoà.
Tuy nhiên, có một điểm khá là "khó chịu" mà dev sẽ gặp phải nếu ứng dụng có phần đăng kí. Đó là: từ iOS 13.0 đến iOS 13.2, apple chỉ hỗ trợ button "Sign In With Apple" mà không có "Sign Up With Apple". Chỉ i0S 13.2 trở lên, chúng ta mới có nút "Sign Up With Apple". Điều đó có nghĩa là bạn phải sử dụng button có title "Sign In With Apple" với mục đích Sign Up
![](https://images.viblo.asia/acf1e17b-0f7f-42f8-bc47-47db60a886e5.png)

## Cách khắc phục:
Do đó chúng ta phải buộc chấp nhận chỉ sử dụng 1 nút cho 2 chức năng, hoặc tạo custom 1 button mới.

# Button không thể tap
Đây có thể nói là 1 bug của SDK này, buton mà Apple cung cấp là ASAuthorizationAppleIDButton(), thực ra là 1 UIControl, tuy nhiên chúng ta có thể setTarget với loại .touchUpInside cho nó để bắt sự kiện. Nhưng khi chạy thì nó không thực sự mượt, đôi khi phải long press thì mới chạy (botay). Trường hợp này rất nhiều developer đã gặp phải
https://stackoverflow.com/questions/58114826/asauthorizationappleidbutton-not-responding-to-touchupinside-events
## Cách khắc phục:
Vấn đề này có thể khắc phục khá đơn giản, bằng cách gán UITapGestureRecognizer() cho button là xong.

# Thông tin User chỉ trả về 1 lần đầu
ASAuthorizationControllerDelegate() được sử dụng để lấy thông tin của user bao gồm có thể là email, full name, userIdentifier, ...., thông qua hàm  

`func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization)` 

Những thông tin này sẽ được sử dụng để đưa lên server tạo tài khoản hoặc đăng nhập. Tuy nhiên có 1 sự thật là khi bấm nút sign in with apple, thông tin email và name chỉ được trả về đối với lần đầu tiên khi người dùng sử dụng chức năng này, từ những lần sau sẽ chỉ còn trả về userIdentifier mà thôi, các trường còn lại sẽ là nil. Đây có thể là cơ chế để bảo mật. Vì vậy các thông tin về mail sẽ cần phải lưu lại vào keychain (apple cũng có hướng dẫn điều này)

## Cách khắc phục:
Điều này sẽ khiến việc Dev test khó khăn 1 chút, tuy nhiên nếu chúng ta hiểu được cơ chế thì có thể dễ dàng khắc phục: Apple sẽ lưu lại Bundle ID của app, sau đó nếu đã request thông tin rồi thì sẽ không trả về từ các lần sau nữa. Vì vậy chúng ta có thể xoá app đã dùng Sign In With Apple trong mục Setting của máy iPhone

```
iPhone Settings > Apple Id > Password & Security > Apple ID logins > {YOUR APP} > Stop using Apple ID
```

# Account Enterprise của Apple không thể tạo certificate có chứa Sign In With Apple
Đây là điều khá phiền toái mà mình đã gặp phải, nếu trong project đã được chia môi trường staging hoặc development, tạo certificate bằng tài khoản enterprise thì sẽ không thể add được chức năng sign in with apple. Mà phải tạo bằng account Apple Programing thì mới có. Kéo theo hàng loạt các thay đổi config khác rất bất tiện

## Cách khắc phục
*Các bạn có thể tham khảo*
Chắc chắn là phải dùng certificate có thể tạo được capacity Sign In With apple thì chúng ta mới làm được, tuy nhiên bạn vẫn có thể trick bằng cách dùng trên certificate production, rồi sau đó config API về môi trường staging hoặc dev là được
# Tổng kết
Trên đây là một vài kinh nghiệm "để đời" của mình khi triển khai chức năng này, tuy không nhiều nhưng lại rất quan trọng cho những bạn chưa biết. CHúc các bạn áp dụng thành công !