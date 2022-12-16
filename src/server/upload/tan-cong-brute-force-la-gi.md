![](https://images.viblo.asia/c1030ad8-8201-4be8-bec4-f89da396df76.jpg)

Ngày nay, các cá nhân sở hữu nhiều tài khoản và có nhiều mật khẩu. Mọi người có xu hướng sử dụng liên tục một vài mật khẩu đơn giản, điều này khiến họ dễ bị tấn công Brute Force. Vậy brute-force là gì?

Hôm nay mình sẽ giới thiệu cho các bạn về tấn công Brute Force hay còn gọi là Brute Force Attack. Đây là 1 kiểu tấn công cổ điển nhưng vẫn được các hacker ngày nay ưa chuộng bởi tính đơn giản nhưng có thể đem lại hậu quả rất lớn của nó. 
# 1. Khái niệm
 Tấn công brute-force là một phương pháp bẻ khóa phổ biến . Một cuộc tấn công brute-force liên quan đến việc 'đoán' tên người dùng và mật khẩu để truy cập trái phép vào hệ thống, hacker sẽ sử dụng phương pháp thử và sai để cố gắng đoán thông tin đăng nhập hợp lệ. Ngoài ra ta có thể sử dụng brute-force để khai thác OTP, Timestamp , Cookie, vv... Tuy nhiên bài viết này sẽ tập trung vào brute-force mật khẩu để đăng nhập tài khoản người dùng. 
 
 Các cuộc tấn công này thường được tự động hóa bằng cách sử dụng danh sách các từ gồm tên người dùng và mật khẩu thường được sử dụng để có thể đạt được kết quả tốt nhất. Việc sử dụng các công cụ chuyên dụng có khả năng cho phép hacker thực hiện đăng nhập 1 cách tự động nhiều lần với tốc độ cao. 
 
 Brute-force là một phương pháp tấn công đơn giản và có tỷ lệ thành công cao. Bởi vì tùy thuộc vào độ dài và độ phức tạp của mật khẩu, việc bẻ khóa mật khẩu có thể mất từ vài giây đến nhiều năm. Do đó các trang web sử dụng phương thức đăng nhập dựa trên mật khẩu hoàn toàn có thể rất dễ bị tấn công nếu họ không thực hiện đầy đủ biện pháp bảo vệ bạo lực.
# 2. Nguyên nhân
Hình thức tấn công brute-force dễ phòng chống nhưng lại rất dễ gặp phải. Nguyên nhân của kiểu tấn công này là do:
- Đặt mật khẩu không an toàn, dễ đoán ra, sử dụng phổ biến.
- Sử dụng mật khẩu liên quan đến bản thân có thể dễ lấy được trên các mạng xã hội như: tên, ngày sinh.
- Từ phía sever, việc không giới hạn số lần nhập sai có thể tạo cơ hội cho hacker có thể tấn công brute-force.
# 3. Hậu quả
 Việc đánh cắp được mật khẩu người dùng luôn đi kèm với những hậu quả vô cùng nghiêm trọng. Có thể nhìn thấy ngay, nạn nhân của Brute Force Attack sẽ bị lộ thông tin đăng nhập và toàn bộ thông tin của tài khoản đó. 

Mức độ nghiêm trọng sẽ tùy thuộc vào loại thông tin bị rò rỉ. Nếu tài khoản bị đánh cắp là tài khoản quan trọng của 1 tổ chức nào đó thì cơ sở dữ liệu nhạy cảm từ toàn bộ tổ chức có thể bị lộ trong các vụ vi phạm dữ liệu cấp công ty . 

Ngoài ra,  việc Brute-Force với tần suất cao có thể coi như 1 kiểu tấn công DOS vào hệ thống web đó dẫn tới có thể treo cả server nếu server đó yếu.
# 4. Các công cụ khai thác
![](https://images.viblo.asia/ccfb83c1-ed66-4e24-bc36-1944df85c59e.jpg)

Việc đoán mật khẩu email hoặc trang web mạng xã hội của người dùng có thể là một quá trình tốn nhiều thời gian, đặc biệt nếu tài khoản có mật khẩu mạnh. Để đơn giản hóa quá trình này, hacker đã phát triển phần mềm và công cụ để giúp họ bẻ khóa mật khẩu.

Các công cụ tấn công brute-force bao gồm các ứng dụng bẻ khóa mật khẩu, bẻ khóa các tổ hợp tên người dùng và mật khẩu mà sẽ rất khó để một người tự bẻ khóa. Các công cụ tấn công brute-force thường được sử dụng bao gồm:
### a. Aircrack-ng: 
Một bộ công cụ đánh giá an ninh mạng Wi-Fi để giám sát và xuất dữ liệu và tấn công một tổ chức thông qua các phương pháp như điểm truy cập giả mạo và chèn gói.
### b. John the Ripper: 
Một công cụ khôi phục mật khẩu mã nguồn mở hỗ trợ hàng trăm loại mật mã và băm, bao gồm mật khẩu người dùng cho macOS, Unix và Windows, máy chủ cơ sở dữ liệu, ứng dụng web, lưu lượng truy cập mạng, khóa cá nhân được mã hóa và tệp tài liệu.
### c. Hydra: 
Hydra là một nền tảng mở, được cộng đồng bảo mật và những kẻ tấn công liên tục phát triển các mô-đun mới. Nó có thể tấn công hơn 50 giao thức và trên nhiều hệ điều hành khác nhau.
### d. L0phtCrack:
Một công cụ bẻ khóa mật khẩu Windows. Nó sử dụng bảng cầu vồng, từ điển và các thuật toán đa xử lý.
### e. Burpsuite:
Burpsuite không phải là 1 công cụ chuyên dụng để tấn công brute-force, tuy nhiên bạn hoàn toàn có thể tùy chỉnh đầu vào bộ mật khẩu để hướng tới 1 cuộc tấn công brute-force tùy ý.
# 5. Demo khai thác và phân tích
Sau đây mình sẽ thử khai thác lấy password bằng brute-force. Mình sẽ cố gắng làm thủ công nhất có thể để bạn đọc có thể hiểu được cách mà hacker sử dụng brute-force để lấy dữ liệu. Việc khai thác sẽ trên portswigger và sử dụng công cụ Burpsuite để khai thác. Link khai thác tại [đây](https://portswigger.net/web-security/authentication/password-based/lab-username-enumeration-via-different-responses).

Vào khai thác sẽ cho mình 1 trang đăng nhập. Nhiệm vụ mình sẽ là sử dụng kỹ thuật brute-force để lấy được `username` và `password` của người dùng và đăng nhập vào để lấy dữ liệu. Thực hiện đăng nhập với 1 giá trị bất kỳ ta được:
![](https://images.viblo.asia/af9b45f4-2d11-4100-a61f-c687f08b7236.png)

Kết quả trả về là `Invalid username` . Như vậy có thể hiểu khi nhập vào 1 username không tồn tại thì sẽ có thông báo `Invalid username`, nên có thể suy luận nếu mình nhập đúng username thì kết quả trả về sẽ khác. Dựa vào đó mình sẽ sử dụng brute-force để mò ra `username`. Sử dụng burpsuite bắt request ta được:
![](https://images.viblo.asia/355fdf58-129f-47b6-9f15-7fb7eab3db0f.png)

Chuyển request sang intruder. Tại tab `Positions`chọn `clear$`. Sau đó bôi đen giá trị `username` và chọn `add$` sau khi ta làm xong sẽ được như sau:
![](https://images.viblo.asia/e98ff83a-b0c5-4583-9b18-7910971d5f6d.png)

Việc làm trên sẽ khiến các giá trị sau đó truyền vào sẽ được chuyển thành giá trị của `username`. Tiếp theo, thực hiện copy danh sách `username`, danh sách `username` của bài trên đã được giới hạn lại để dễ làm. Danh sách có thể lấy tại [đây](https://portswigger.net/web-security/authentication/auth-lab-usernames).

Trong thực tế, danh sách `username` và `password` thường sẽ rất dài để có thể thử nhiều trường hợp hơn, các bạn có thể tự tạo danh sách cho mình hoặc tìm kiếm những danh sách `username` và `password` thông dụng trên github như:  https://github.com/duyet/bruteforce-database.

Quay lại bài, chuyển sang tab `Payloads`, tại `Payload Options` chọn paste `username` đã lấy ta được:
![](https://images.viblo.asia/49d947c7-d51a-400a-80cb-4ba8b9c0d479.png)

Tiếp tục chuyển sang tab `Options`. Tại `Grep-Match` chọn `clear`, sau đó ta thêm `Invalid username` vào và chọn `Add`:
![](https://images.viblo.asia/0ac62f18-4822-41a6-8019-9c3f6cab8299.png)

Việc này sẽ khiến kết quả trả về thực hiện kiểm tra trong `response` có ký tự  `Invalid username` hay không. Thực hiện attack và đợi kết quả trả về:
![](https://images.viblo.asia/5b605710-03d7-42a3-bb05-b36ff620cac6.png)

Để ý cột `Invalid username` tại kết quả trả về, nếu trong `response` có ký tự  `Invalid username` thì kết quả sẽ có dấu tích, như vậy là không đúng username. Suy ra `username=antivirus` theo kết quả trên sẽ là username đúng.
Thực hiện tương tự để lấy password:
![](https://images.viblo.asia/bcccfeb6-515e-424d-b785-9799d549431b.png)

Thực hiện lấy danh sách password tại [đây](https://portswigger.net/web-security/authentication/auth-lab-passwords):
![](https://images.viblo.asia/c1eae1ca-109b-4acb-bc1c-bbf905f07734.png)

Thực hiện attack ta thu được kết quả:
![](https://images.viblo.asia/b54747db-0dcd-4940-b7e4-ede21214be89.png)

Thông thường khi đăng nhập thành công thì trang web sẽ tự động chuyển hướng sang trang chủ khai thác. Vì thế kết quả tại cột `Status` sẽ trả về là `302`. Dựa vào đó ta thu được `password=andrew`.
Thực hiện đăng nhập với `username=antivirus&password=andrew` ta được:
![](https://images.viblo.asia/8eb3662d-1362-4396-b50d-55fa8170d48d.png)

Vậy là thành công đăng nhập vào tài khoản của nạn nhân bằng cách sử dụng brute-force.

# 6. Cách khắc phục
Việc khắc phục brute-force có thể đến từ 2 phía: người dùng và quản trị trang web. 
### a. Đối với người dùng, để tránh bị  brute-force thì có thể làm theo cách sau:
- Không sử dụng thông tin liên quan đến bản thân mà có thể lấy được trên mạng như tên, ngày sinh, vv...
- Có càng nhiều ký tự càng tốt: việc sử dụng từ 10 ký tự trở lên có thể khiến cho việc brute-force tốn rất nhiều thời gian, thời gian có thể lên cả năm trời.
- Kết hợp các chữ cái, số và các ký hiệu đặc biệt.
- Tránh sử dụng những mật khẩu đơn giản như: 123456, password,...
- Bên cạnh đó việc không sử dụng cùng 1 mật khẩu trên nhiều tài khoản khác nhau có thể tránh tối đa hậu quả khi bị mất mật khẩu.
### b. Với quản trị viên, bạn có thể thực hiện các phương pháp để bảo vệ người dùng khỏi việc bẻ khóa mật khẩu bằng brute-force:
- Yêu cầu mật khẩu mạnh: bạn có thể buộc người dùng xác định mật khẩu dài và phức tạp. Bạn cũng nên thực thi các thay đổi mật khẩu định kỳ.
- Hạn chế số lần đăng nhập sai: Giới hạn số lần thử cũng làm giảm khả năng bị tấn công brute-force. Đi kèm với đó là việc làm tăng thời gian cho phép nhập khi nhập quá nhiều lần sai.
- Xác thực hai yếu tố: Quản trị viên có thể yêu cầu xác thực hai bước và cài đặt hệ thống phát hiện xâm nhập phát hiện các cuộc tấn công. Điều này yêu cầu người dùng theo dõi nỗ lực đăng nhập bằng yếu tố thứ hai, chẳng hạn như khóa USB vật lý hoặc quét sinh trắc học dấu vân tay.
- Captcha: các công cụ như reCAPTCHA yêu cầu người dùng hoàn thành các tác vụ đơn giản để đăng nhập vào hệ thống. Việc này có thể ngăn chặn các công cụ brute-force tự động.