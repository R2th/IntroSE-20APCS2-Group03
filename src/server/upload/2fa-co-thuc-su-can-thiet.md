Một mật khẩu mạnh chưa đủ để bảo vệ tài khoản của bạn

Chắc hẳn các bạn đã không dưới một làm bị mất tài khoản của mình vào tay người khác. Nguyên nhân có thể đến từ rất nhiều phía như: do các bạn đặt mật khẩu quá dễ, do các bạn vô tình tiết lộ cho ai đó, cũng có thể do các bạn lưu trữ không an toàn (viết ra giấy cho dễ nhớ là một ví dụ :D) hoặc cũng có thể đến từ nguyên nhân khách quan do ứng dụng bị tấn công khiến bạn lộ thông tin mật khẩu. Để lấy ví dụ cho vấn đề này, các bạn có thể đã nghe đến vụ 3 tỉ tài khoản Yahoo bị rò rỉ dữ liệu năm 2013 hay lộ thông tin hơn 160 triệu khách hàng của VNG ngày 24/04/2018. Đó chỉ là 1 trong số ít các ví dụ về việc tấn công lấy cắp thông tin người dùng. Vậy là một người dùng, bạn cần làm gì để bảo vệ mình trước vấn đề này. Câu trả lời sẽ có trong bài viết dưới đây.

# 2FA là gì?
2FA là tập hợp con của xác thực đa yếu tố (MFA). Xác thực đa nhân tố (viết tắt: MFA) là một hệ thống bảo mật yêu cầu nhiều phương thức xác thực từ các danh mục thông tin đăng nhập độc lập để xác minh danh tính của người dùng cho thông tin đăng nhập hoặc giao dịch khác. Mục tiêu của MFA là tạo ra một lớp bảo vệ kiên cố, đồng thời gây khó khăn cho một người không được phép truy cập vào một mục tiêu cụ thể, như: vị trí thực tế, thiết bị máy tính, mạng hoặc cơ sở dữ liệu. Nếu một yếu tố xác thực bị xâm phạm, kẻ tấn công vẫn phải vượt qua ít nhất một rào cản nữa để vi có thể xâm nhập trái phép thành công vào mục tiêu.

# Các yêu tố xác thực là gì?

Tùy thuộc vào người bạn hỏi, có từ 3 đến 5 yếu tố xác thực khác nhau có thể được sử dụng bởi các hệ thống 2FA. Tuy nhiên, hầu hết các hệ thống sử dụng 3 yếu tố sau:

- **Những gì người dùng biết**: Là những gì mà chỉ bạn mới có thể biết (Ví dụ: Mật khẩu, mã PIN ...).

- **Những gì người dùng có**: Là những gì mà chỉ bạn mới có (Ví dụ: security token-mã thông báo bảo mật, [RSA SecurID key](https://www.rsa.com/en-us/products/rsa-securid-suite/rsa-securid-access)).

- **Những gì thuộc về duy nhất người dùng**: Là những đặc điểm chỉ bạn có (Ví dụ: biometric verification-xác minh sinh trắc học).

Sử dụng 3 yếu tố này, bạn có thể tạo một hệ thống 2FA an toàn. Ví dụ phổ biến nhất về 2FA liên quan đến việc sử dụng ATM ngân hàng. Để sử dụng ATM ngân hàng, bạn phải chèn thẻ ngân hàng (thứ mà bạn có) và nhập mã PIN ngân hàng (thứ mà bạn biết).

Hai yếu tố còn lại mà một số hệ thống sử dụng là:

**Vị trí**: Giới hạn các vị trí bạn có thể đăng nhập vào một dịch vụ từ hoặc sử dụng vị trí hiện tại của bạn để theo dõi nơi bạn đang đăng nhập để phát hiện hoạt động đáng ngờ (chẳng hạn như đăng nhập từ hai vị trí khác nhau cùng một lúc)

**Thời gian**: Hạn chế đăng nhập vào một khoảng thời gian cụ thể.
# Tại sao chúng ta nên sử dụng 2FA
Khi kích hoạt 2FA, chúng ta có thêm một lớp bảo mật khác giữa dữ liệu của chúng ta và kẻ tấn công. Nó giống như một hệ thống an ninh gia đình. Chúng ta đều có khóa cửa cho ngôi nhà của chúng ta, và chúng ta vẫn gắn thêm hệ thống camera giám sát cho ngôi nhà của chúng ta. Nếu kẻ trộm tìm cách tấn công ngôi nhà, chúng không có chìa khóa và tìm cách phá khóa, nhưng qua camera chúng ta có thể nhìn thấy được kẻ trộm và dễ dàng tìm ra danh tính. 2FA cũng hoạt động giống như vậy. Khi các bạn có các tài khoản (tài khoản ngân hàng, tài khoản mạng xã hội...ngoài việc dùng mật khẩu mạnh để bảo vệ, chúng ta sử dụng thêm hệ thống xác thực 2FA để bảo vệ tài khoản. Mỗi khi đăng nhập vào tài khoản, chúng ta cần có thêm thông tin từ việc xác thực 2FA để có thể đăng nhập. Thông tin trong 2FA là duy nhất, được sinh ra bằng thuật toán tự động và ngẫu nhiên và chỉ có thể sử dụng một lần duy nhất. Vì vậy, khi hacker lấy được thông tin tài khoản của bạn thì họ cũng không thể đăng nhập vào tài khoản của bạn nếu không có thông tin từ 2FA.

# 2FA được triển khai như thế nào
Ngày nay, nhiều ứng dụng và trang web phổ biến nhất cung cấp 2FA như Google, Facebook, Twitter, Steam và Amazon. Có 4 cách chính để triển khai 2FA ảnh hưởng đến cách người dùng đăng nhập vào ứng dụng:

**SMS**: Khi nhập tên người dùng và mật khẩu của họ, một tin nhắn văn bản được gửi đến người dùng với một mã phải được nhập để đăng nhập vào ứng dụng. Mã này sẽ được gửi về số điện thoại duy nhất mà người dùng đã thiết lập trước đó trong ứng dụng.

**Email**: Khi nhập tên người dùng và mật khẩu của họ, một email sẽ được gửi đến địa chỉ email của người dùng, trong email có chứa mã đăng nhập mà người dùng sẽ dùng để đăng nhập. Email này cũng cần được người dùng thiết lập trước đó.

**Security token**: Được chia ra làm 2 loại chính:

***- Security hard token***: Các thiết bị phần cứng nhỏ mà chủ sở hữu mang để cho phép truy cập vào dịch vụ mạng. Thiết bị có thể ở dạng thẻ thông minh hoặc có thể được nhúng vào trong một đối tượng được mang dễ dàng như fob key hoặc ổ USB. Mã thông báo phần cứng cung cấp yếu tố sở hữu cho multifactor authentication. Mã thông báo dựa trên phần mềm đang trở nên phổ biến hơn các thiết bị phần cứng. Ví dụ: RSA SecurID - hardware token

![](https://images.viblo.asia/90f5bef5-0ca5-4b2a-be07-83822e742af1.jpg)

 ***- Security soft token***: Các ứng dụng mã thông báo bảo mật dựa trên phần mềm tạo mã PIN đăng nhập một lần. Mã thông báo mềm thường được sử dụng cho multifactor mobile authentication, trong đó chính thiết bị - chẳng hạn như điện thoại thông minh - cung cấp yếu tố sở hữu (possession factor). Ví dụ: Google Authenticator
 
 ![](https://images.viblo.asia/a375ccce-6809-4472-916d-e5596b0e2cca.png)
**Xác thực qua ứng dụng**: Khi nhập tên người dùng và mật khẩu của họ, thông báo đẩy được gửi từ một ứng dụng trên điện thoại của người dùng có chứa mã nhạy cảm với thời gian mà họ có thể sử dụng để đăng nhập vào ứng dụng. Ví dụ, 2FA trên ứng dụng Steam

![](https://images.viblo.asia/75afe7fd-32d4-4226-b071-ed0cd17ba981.png)

# 2FA vẫn có thể bị tấn công và thỏa hiệp
2FA không hoàn hảo, nó vẫn có thể bị tấn công bởi những kẻ tấn công. Dưới đây là 4 cách mà kẻ tấn công có thể xâm phạm tài khoản có 2FA. Một số phương pháp này phụ thuộc vào các điểm yếu trong việc triển khai 2FA ở phía ứng dụng, trong khi các phương pháp khác có thể được thực thi trên các hệ thống được bảo mật hoàn toàn thông qua kỹ thuật tấn công [social engineering](https://www.imperva.com/learn/application-security/social-engineering-attack/).

* **Phishing**: Nếu nạn nhân bị dụ đến trang đăng nhập giả, kẻ tấn công có thể lấy thông tin đăng nhập (tên người dùng / mật khẩu) mà nạn nhân đã nhập và chuyển chúng đến trang đăng nhập thực. Trang đăng nhập thực sau đó sẽ yêu cầu kẻ tấn công lấy mã 2FA được gửi cho nạn nhân. Kẻ tấn công sau đó sẽ lừa nạn nhân gửi cho chúng mã 2FA mà họ nhận được trên điện thoại của họ, sau đó họ sử dụng mã đó để đăng nhập trên trang thật. Ở đây rõ ràng hacker cần lừa lạn nhân qua 2 giai đoạn là đăng nhập trên trang giả và cung cấp mã 2FA. Nếu bạn không bật 2FA, thì cuộc tấn công càng trở nên đơn giản hơn rất nhiều.

![](https://images.viblo.asia/bf42b75a-211d-40d0-b947-c991c4348720.png)

Ví dụ trên mô tả quá trình tấn công lừa đảo để chiểm đoạt tài khoản ngân hàng của Bob.

* Password reset: Trên nhiều ứng dụng, 2FA có thể được bỏ qua bằng cách sử dụng chức năng Quên mật khẩu của bạn. Nhưng trước đó địa chỉ email của bạn đã bị hacker chiếm mất để có thể thực hiện cuộc tấn công này.
* Brute Force: Kẻ tấn công có thể thử tất cả các tổ hợp chữ cái và số tạo nên mã 2FA. Bạn không thể làm gì nhiều để ngăn chặn điều này. Việc triển khai 2FA tốt sẽ hạn chế số lần thử đoán mã 2FA và cũng sẽ khiến mã 2FA hoạt động trong một khoảng thời gian ngắn (ví dụ 20 giây sau khi nhập tên người dùng và mật khẩu của bạn).
* Đăng nhập của bên thứ ba: Nếu bạn sử dụng Đăng nhập trên Facebook với Facebook, để bỏ qua việc tạo tài khoản cho một số trang web nhất định, bạn sẽ gặp nhiều rủi ro hơn nếu tài khoản Facebook của bạn bị xâm phạm

# Vậy việc sử dụng 2FA có bắt buộc không?
Chúng ta đã hiểu 2FA là gì, cách thức mà nó thực hiện và một số nguy cơ tấn công. Giờ đã đến lúc phải trả lời câu hỏi 2FA có bắt buộc phải sử dụng với các tài khoản. Theo tôi, 2FA nên là bắt buộc với các ứng dụng có liên quan đến tiền bạc (tài khoản ngân hàng, tài khoản game, tài khoản trên các trang có chức năng thanh toán), sử dụng với các tài khoản quan trọng cá nhân (facebook, google,..), các tài khoản quan trọng có chứa thông tin nhạy cảm và tài khoản của công ty bạn đang làm việc. Cung cấp 2FA giúp các ứng dụng an toàn hơn trong khi không làm mất đi nhiều tiện ích ở phía người dùng. Có nhiều cách để thực hiện 2FA và các công ty có thể chọn cách phù hợp nhất với họ.

Tuy nhiên, điều quan trọng cần lưu ý là việc bắt buộc 2FA sẽ không giải quyết được tất cả các vấn đề bảo mật của. Thêm 2FA sẽ thêm một hệ thống khác có khả năng bị ngừng hoạt động, dẫn đến thời gian ngừng hoạt động của hệ thống hoặc khiếu nại của khách hàng. Như đã được trình bày ở trên, vẫn có nhiều cách khác nhau để kẻ tấn công có thể lấy được thông tin 2FA mà nguyên nhân không nằm ở việc hệ thống triển khai 2FA mà hoàn toàn đến từ phía người dùng.

Việc sử dụng 2FA hay không là quyết định của bạn. Bạn không bao giờ an toàn 100% và dữ liệu của bạn không bao giờ an toàn 100%. Bất kỳ biện pháp bảo vệ bổ sung nào bạn bổ sung thêm mà cụ thể ở đây là 2FA đều có để giảm khả năng bạn sẽ bị tấn công và để giảm thiệt hại do bị tấn công.
# Nguồn tham khảo
https://medium.com/swlh/should-2fa-be-mandatory-b479b22ca685