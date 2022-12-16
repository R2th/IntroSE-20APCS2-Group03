# Tổng quan về vấn đề bảo mật tài khoản
"Account take over" hay "Chiếm quyền tài khoản" trên website là một trong những lỗi vô cùng nghiêm trọng trong những lỗ hổng bảo mật mà website gặp phải. Có rất nhiều người vô tình hoặc bị kẻ tấn công chiếm quyền điều khiển tài khoản (mạng xã hội, ngân hàng, các trang web thương mại điện tử...). Nguyên nhân của việc này có thể đến từ nguyên nhân chủ quan hay khách quan từ phía người dùng. Chủ quan thì phần lớn nằm ở lỗi của người dùng, do người dùng thường kém hiểu biết về an toàn bảo mật website hoặc do bị tấn công bởi kẻ xấu thông qua hình thức tấn công Social engineering (tấn công do yếu tố con người). Hình thức tấn công này thường không đòi hỏi quá nhiều kỹ thuật, bản thân website cũng không bị lỗ hổng bảo mật mà nguyên nhanad đến chính từ sự thiếu cảnh giác này. Để hiểu hơn về hình thức tấn công này, các bạn có thể đọc một bài viết có liên quan đến hình thức tấn công này [tại đây](https://viblo.asia/p/toi-bi-mat-tien-roi-ngan-hang-den-tien-toi-di-aWj5332856m).
Hình thức tấn công thứ hai, cũng là hình thức và kỹ thuật mình sẽ đề cập tới phần lớn trong bài viết này đó là tấn công chủ động bởi hacker. Kẻ tấn công khai thác một số lỗ hổng của website từ từ đó thực hiện chiếm tài khoản của người dùng hoặc admin. ***Dĩ nhiên để tấn công chiếm quyền tài khoản thành công, các website đó phải có các lỗ hổng mà mình đề cập bên dưới :D***
![](https://images.viblo.asia/c95d6eff-4128-48f6-956f-cf9fbfdd6077.png)

# Các kỹ thuật tấn công phổ biến
# 1. Tấn công phishing, giả mạo trang web
Đây là một hình thức tấn công social engineering được thực hiện bởi kẻ xấu và không khai thác lỗ hổng của website. Hacker sẽ tạo ra một website giả mạo với giao diện giống hệt website gốc, thậm chí nếu tinh vi hơn hacker còn có thể mua 1 tên miền gần giống với tên miền thật. Ví dụ: https://www.amazon.com (website thật) và https://www.amazonn.com (website giả mạo) có giao diện giống hệt nhau:

![](https://images.viblo.asia/3f3e04fd-4762-4e09-af87-55ecc6bf4db7.png)

Tiếp theo hacker sẽ lừa người dùng bằng cách gửi email, sms và gửi link dẫn đến website giả mạo cho người dùng để dụ người dùng truy cập vào website giả mạo. Sau khi truy cập vào website giả mạo, vì có giao diện giống nhau nên người dùng sẽ nhập thông tin username/password, otp vào website từ đó hacker có thể dễ dàng lấy được thông tin tài khoản. Thực tế có rất nhiều cách để dụ người dùng bằng những kịch bản: Truy cập website và nhập thông tin ngân hàng để nhận thưởng, truy cập vào link để xem các nội dung video nhạy cảm, lừa người dùng là nhân viên của ngân hàng và yêu cầu người dùng truy cập vào link giả mạo để xác nhận thông tin... Vì vậy, nếu gặp các trường hợp trên các bạn cần thực sự tỉnh táo và kiểm tra website mình truy cập có phải là website giả mạo hay không bằng cách tìm kiếm trên google hoặc sử dụng extension [chong lua dao](https://chrome.google.com/webstore/detail/chongluadao/mdcemplfpeifcogglenloohjghjbigni?hl=vi) -extension được thực hiện bởi a Hiếu PC và các hacker khác hoàn toàn miễn phí để kiểm tra website giả mạo. Đồng thời tuyệt đối không cung cấp OTP cho bất kì ai dù đó là nhân viên ngân hàng hay bất kì người nào yêu cầu.

# 2. Tấn công brutefore tài khoản người dùng
### Bruteforce username/password
Tấn công brutefore là một hình thức tấn công vét cạn, kẻ tấn công sẽ sử dụng một từ điển có sẵn danh sách các username/password phổ biến và thực hiện thử lần lượt trên website đó đến khi nào đúng thì thôi. Để tấn công này có thể thực hiện thành công cần có 2 yếu tố. Yếu tố thứ nhất, do website không có cơ chế bảo vệ chống lại hình thức tấn công này dẫn đến hacker có thể thử số lần vô hạn mà không bị chặn. Để ngăn chặn điều này, các website cần có cơ chế ngăn chặn bằng cách nếu người dùng nhập sai thông tin đăng nhập quá số lần nhất định (có thể là 5 lần) sẽ thực hiện khóa chức năng đăng nhập hoặc khóa tài khoản đó trong một thời gian nhất định nào đó đủ để ngăn chặn việc tấn công liên tục bằng các công cụ tự động. Yếu tố thứ hai đến từ người dùng, do người dùng đặt mật khẩu không đủ mạnh dẫn đến việc hacker có thể dễ dàng tấn công do mật khẩu đã nằm trong từ điển có sẵn. Để hạn chế cũng như làm giảm nguy cơ bị tấn công, người dùng hãy đặt mật khẩu đủ dài (>8 ký tự) và đủ độ phức tạp (chữ hoa, thường, số, ký tự đặc biệt và không nằm trong các từ điển có sẵn) để giảm thiểu tỉ lệ thành công của hình thức tấn công này.

![](https://images.viblo.asia/cec67c2d-e996-4b34-a1b1-c706f572b000.png)

### Bruteforce OTP
Một hình thức brutefore khác là việc tấn công dò tìm các mã otp. Thông thường khi thực hiện chức năng reset password, một số website sẽ gửi về email của người dùng một chuỗi số 4 hoặc 6 ksy tự số để người dùng nhập vào và thực hiện reset mật khẩu. Tương tự như chức năng đăng nhập, nếu website không ngăn chặn số lần nhập sai, hacker có thể tấn công bằng cách sử dụng tool để bruteforce tất cả các số từ 0001- -> 9999 hoặc 000001 -> 999999. Cách này có tỉ lệ thành công là 100% nếu chúng ta không ngăn chặn số lần nhập sai. Hay nói cách khác, nếu bạn lập trình webiste với chức năng reset mật khẩu như vậy và không chặn số lần nhập sai mã otp thì tức là bạn đã vô tình khiến hacker có thể tấn công chiếm quyền bất kỳ tài khoản nào. Vậy biện pháp ở đây là gì? Chúng ta không nên gửi mã OTP mà thay vào đó hãy gửi một đường link random về email để người dùng click vào link đó. Hoặc nếu có sử dụng OTP thì cần ngăn chặn việc nhập mã OTP sai quá nhiều lần kết hợp sử dụng capcha khi người dùng nhập mã OTP:

![](https://images.viblo.asia/811cb724-b13a-4301-8699-829ed300f8ae.jpg)

## 3. Tấn công XSS

Với XSS, hacker có thể lợi dụng XSS để thực hiện ăn cắp thông tin cookie từ đó chiếm phiên làm việc của người dùng. Sau khi chiếm được phiên làm việc hacker thực hiện thay đổi thông tin email hoặc thêm email backup của hacker vào tài khoản, từ đó lợi dụng chức năng đổi mật khẩu qua email hacker có thể thực hiện đổi mật khẩu và chiếm quyền tài khoản người dùng. Để ngăn chặn việc này, website cần có các cờ bảo vệ cookie như: `http-only`, `http-secure` để bảo vệ cookie của người dùng.

![](https://images.viblo.asia/b0a72986-a48e-4f7b-b6bc-6dadf1648e37.png)


## 4. Tấn công IDOR

IDOR là kiểu tấn công mà hacker có thể thay đổi thông tin của người dùng khác qua chức năng cập nhật profile. Ví dụ, để cập nhật thông tin user của người dùng đang đăng nhập, người dùng hacker truy cập tới đường dẫn: `users/1/edit` và thực hiện cập nhật thông tin. Với `1` là id của người dùng. Bằng việc thay đổi id từ `1` sang `2`, hacker có thể truy cập và cập nhật thông tin của user có id bằng `2`: với đường dẫn `users/2/edit`. Nếu cập nhật thành công, hacker thay đổi thông tin email sang email của hacker và sau đó thực hiện chức năng reset password để đổi thông tin đăng nhập và từ đó chiếm luôn tài khoản của kẻ tấn công.
Để ngăn chặn cách tấn công này, chúng ta cần thực hiện kiểm tra quyền trên server để ngăn chặn việc truy cập sửa đổi thông tin trái phép từ người dùng không có quyền:

![](https://images.viblo.asia/d4eeed88-77c4-4a9d-9295-333465ed2736.png)

## 5. Tấn công host-header attack
- Đây la kiểu tấn công mà hacker khai thác vào lỗ hổng bảo mật trên website. Kẻ tấn công thay đổi thông tin HOST để server gửi các thông tin về HOST của hacker thay vì HOST của người dùng  truy cập. Có 2 phương thức được khai thác :
+ Password Reset Poisoning: cho phép atttack tìm ra link reset mật khẩu của user qua đó chiếm quyền điều khiển.
+ Cache poisoning :Bộ nhớ cache có thể bị nhiễm độc bởi http repsonse, bất cứ thành phần nào có mã chứa lỗ hổng đều có thể bị khai thác. Attacker có thể lợi dụng để ăn cáp cookie của người dùng.
    Hacker khi thực hiện gửi request lên server sẽ thay đổi giá trị của header: `Host`: hoặc thêm header: `X-Forwarded-Host`. Server khi nhận được request này thì thay vì response về Host bình thường thì sẽ trả về nội dụng là Host của hacker. Lợi dụng điều đó hacker khai thác vào chức năng reset password để khi server trả về sẽ chứa link reset password chứa host của hacker. Khi người dùng truy cập vào email có chứa link, thay vì dẫn tới trang đổi mật khẩu của website thì người dùng lại vào website của hacker, và đương nhiên hacker có được đường link reset password hợp lệ của người dùng. Để ngăn chặn việc này, website cần có cơ chế kiểm tra các haeder được gửi lên có hợp lệ và thực hiện whitelist các domain hợp lệ, tránh bị hacker tấn công thay đổi thông tin host.
    
![](https://images.viblo.asia/717de93f-15e1-4085-9de4-d022bc95c96f.png)

# Tổng kết
Đó là một số kịch bản và hình thức tấn công account takeover mà mình thấy khá phổ biến. Ngoài ra còn rất nhiều các hình thức tấn công khác nhau mà mình chưa liệt kê hết ở đây. Bài viết mong muốn mang tới nhận thức cho cả người dùng cũng như những developer khi phát triển ứng dụng web tránh gặp phải các tình huống và lỗi trên. Bài viết còn nhiều thiếu sót, mong nhận được đóng góp và góp ý từ các bạn. Cảm ơn các bạn đã theo dõi!