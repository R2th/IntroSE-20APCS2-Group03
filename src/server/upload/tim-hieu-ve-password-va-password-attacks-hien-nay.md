## I. Sơ lược về Password <br><br>
Password là một chuỗi tổ hợp các ký tự có độ dài giới hạn, được sử dụng để xác thực quyền truy cập vào hệ thống kỹ thuật số. <br> <br>
Dù hiện tại thế giới có rất nhiều phương thức xác thực mới, như sinh trắc học, chữ ký số,...tuy nhiên password vẫn là một thứ không thể thay thế ở nhiều hệ thống, hệ điều hành,... hay các giao thức truy nhập, bởi nó đảm bảo được 2 điều: <br><br>


> **1. Bí mật:** Chỉ một hoặc rất ít người biết nội dung (  tổ hợp ký tự ) của password được sử dụng.

>**2. Bảo mật:** Trên lý thuyết, mọi password đều có thể bị crack. Tuy nhiên để làm được điều đó phải tốn nhiều công sức, đôi khi là cả may mắn, và đôi khi là không thể.

Những phương thức "mới" như vân tay, nhận diện khuôn mặt,...có thể bị làm giả, copy và bị qua mặt. Đơn giản như khi chúng ta ngủ, có người lấy ngón tay chúng ta để "by pass" chính điện thoại của chúng ta. Hay phức tạp hơn là dấu vân tay bị copy  và sử dụng vào mục đích xấu. Hay phức tạp hơn nữa là Face ID của Apple bị một chiếc mặt nạ do BKAV làm giả đánh lừa.<br>
Những ví dụ trên đều nói lên sự quan trọng và tính **không thể thay thế hoàn toàn** của password.

## II. Password Attacks
Như vậy, password vẫn được sử dụng rất nhiều. Song song đó, khao khát để phá vỡ tính Bí mật và Bảo mật của password từ các hacker ngày một tăng, bởi khi có được password đúng, hacker có toàn quyền với các tài nguyên/dịch vụ của người dùng được xác thực bởi password đó.  Và người dùng hiện nay thường dùng chung một password cho  nhiều dịch vụ khác nhau.<br> <br>
![alt](https://i.ibb.co/KmxLzQ8/LP-ADFS-Blog-Image.png)

<br><br>
Các kỹ thuật tấn công password được gọi với nhiều cái tên khác nhau tùy vào các kỹ thuật và cách thức tiếp cận khác nhau, các bạn có thể tham khảo tại [đây](https://www.onelogin.com/learn/6-types-password-attacks). Sau đây là 6 cái tên phổ biến và đáng chú ý:<br>
<br>

> **1. Brute Force:**  Đây là kiểu tấn công mà chúng ta sẽ “mò” tất cả các tổ hợp ký tự có thể là password cho đến khi có một tổ hợp ký tự trùng khớp. Phương pháp tấn công này giúp ta thấy rõ được điểm mạnh cốt lõi của password: Password là bí mật, trừ người sở hữu, không ai biết được nó có độ dài bao nhiêu và tổ hợp từ những ký tự gì. Thường Brute Force chỉ dùng để "mò" những password yếu, phổ biến, nhắm vào những người dùng thông thường. <br> <br>
> 
> **2. Dictionary attack:** Một kiểu tấn công lợi dụng thực tế rằng mọi người có xu hướng sử dụng các từ phổ biến và password ngắn, cũng như có liên quan tới thông tin cá nhân, gia đình... Hay những công ty, tổ chức thường đặt password theo một format xác định. Từ đó chúng tạo ra một từ điển password để tăng tỉ lệ tìm ra password đúng.<br><br>
> **3.  Traffic interception:** Bằng nhiều cách và phần mềm khác nhau, hacker nghe lén, chặn bắt các gói tin và phân tích chúng nhằm có được các thông tin nhạy cảm.
<br><br>
> **4. Key logger attack:** Trước khi bị 'dính' vào kiểu tấn công này, người dùng thường đã bị 'dính' một tấn công nào đó khác, như bị lây nhiễm trojan hay bị mở backdoor, dính Keylog... Qua đó hacker có được thông tin về tổ hợp phím mà người dùng đã sử dụng.
<br><br>
> **5. Social engineering attacks:** Tấn công kỹ nghệ xã hội sử dụng kiến thức và cách thức tiếp cận liên quan tới tâm lý học hành vi, như giả mạo (Phishing / Spear phishing), khơi gợi tính tò mò hoặc tham lam ( Baiting )...
<br><br>
> **6. Man In the Middle:** Trong kiểu tấn công này, hacker không chỉ 'đứng giữa' và nghe ngóng những thông tin được truyền trong mạng, chúng còn có thể gửi xen vào cũng như thay đổi luồng dữ liệu để kiểm soát sâu hơn những thông tin được gửi nhận.
<br><br>

## III.Password và Password Attacks hiện nay<br><br>
Trong những thập kỷ qua, những lập trình viên, người quản trị hệ thống, các nhà mật mã học, và đôi khi là cả chính phủ, thông qua những chính sách cũng như giáo dục, luôn muốn người dùng hiểu được sự quan trọng của bảo mật và lợi ích của một mật mã "tốt". Tuy nhiên hầu hết người dùng đều đánh đổi sự bảo mật để đổi lấy sự tiện dụng. <br><br>
 Vì vậy, rất nhiều các cách xác thực khác, như quét vân tay, mống mắt, nhận diện khuôn mặt...được tạo ra, tuy nhiên không thể bao quát hết "tầm hoạt động" của password. Và cũng như những phân tích ở trên, hiện nay password là không thể thay thế.<br><br>
 ![alt](https://i.ibb.co/q7Kk0k9/hack-like-pro-grab-crack-encrypted-windows-passwords-w1456.jpg)<br><br>
Hiện nay, các chính sách bảo mật, các chính sách xác thực nói riêng và chính sách an toàn thông tin nói chung được nâng cao. Ví dụ như những dịch vụ yêu cầu bảo mật cao như đăng nhập tài khoản ngân hàng, password phải bảo đảm đủ độ phức tạp, nếu user nhập password sai 5 lần, ngay lập tức user bị vô hiệu quá. Hay tính năng xác thực 2 bước được rất nhiều dịch vụ khuyến khích (chứ không thể ép buộc) user sử dụng.<br><br>
Tuy nhiên không phải nơi nào cũng có những chính sách như vậy, thậm chí có nơi dù đề ra chính sách nhưng vì lỗi con người không tuân thủ chặt chẽ nên vô tình tạo ra lỗ hổng, và có những dịch vụ thì gần như không có chính sách cụ thể về an toàn. Ví dụ như việc đặt password Wifi, đặt password để truy nhập một Port nào đó trên sever, hay đặt password cho một file .rar được nén...
<br><br>
Với việc kết hợp các kiểu tấn công được nên trên, hay sử dụng những kiểu tấn công mới khác, nếu password không đủ "tốt", người dùng không đủ tính táo thì hoàn toàn có nguy cơ bị xâm phạm password, từ đó dẫn tới nhiều hậu quả khó lường.