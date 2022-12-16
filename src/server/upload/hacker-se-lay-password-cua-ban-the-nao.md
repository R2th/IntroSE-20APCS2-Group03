Chắc hẳn ai học tập, làm việc trong ngành IT cũng từng được nghe câu hỏi: "Có biết hack facebook không", "Có lấy được pass của abc không", ... :D. Rõ ràng là mọi người rất quan tâm đến vấn đề password (của người khác =)) ), đặc biệt là trong thời đại hiện nay.

Mặc dù chưa bao giờ thử, cũng chưa thành công lấy password của ai, nhưng mình thấy đây cũng là một chủ đề khá thú vị, và mọi người đều nên có nhận thức về vấn đề này, để bảo vệ thông tin cá nhân của mình. Vì thế sau khi tìm hiểu một vài nơi trên Internet, mình cũng xin tổng hợp 1 vài phương pháp các hacker thường sử dụng để lấy password của người khác.

## 1. Credential stuffing
**Risk Level: High**
![image.png](https://images.viblo.asia/ca1d6d13-b3fd-4d8a-bc9a-edaa6ffe9cbd.png)

- Trong phương pháp này, hacker sẽ sử dụng một kho dữ liệu những credentials đã bị lấy cắp.
- Sau đó thông qua các phần mềm tự động (bot) để thử các credentials này trên các nền tảng mạng xã hội, ngân hàng, v.v.. xem có thể lấy được tài khoản nào không.
- Do chúng ta thường để username và password giống nhau cho các nền tảng, nên khi một nền tảng đã từng bị hack, rất có thể các nền tảng khác cũng sẽ bị hacker khai thác tương tự.


## 2. Phishing emails
**Risk Level: High**
![image.png](https://images.viblo.asia/e5cf2abe-53db-4f4a-8039-19a98ff7b909.png)
- Phishing email là một trong những phương pháp phổ biến nhất để lấy cắp password và các thông tin giá trị khác.
- Hacker sẽ gửi cho bạn một đường link độc hại (**malicious link**), dẫn tới một **trang web giả mạo** (được làm giống hệt trang đăng nhập facebook chẳng hạn) để lừa bạn nhập vào các thông tin cá nhân, username, password.
- Ngoài ra, phishing email cũng có thể có những file đính kèm, sẽ cài đặt các phần mềm độc hại, ảnh hưởng tới máy tính của bạn khi click vào.
- Vì thế, hãy luôn cẩn thận với các email spam cũng như đường link lạ trên Internet.

## 3. Password Spraying
**Risk Level: High**
- Thống kê cho thấy có khoảng **16%**, các cuộc tấn công, lấy cắp password là từ phương pháp password spraying này.
- Đây là một kỹ thuật sử dụng list nhưng password thường hay sử dụng (có thể là top 5, top 10, top 100 các password) để test với một số account nhất định.
- Thường các trang web hiện nay đều giới hạn số lần nhập sai password với cùng một IP, nên hacker thường sẽ sử dụng nhiều IP để tăng số lượng password có thể thử, trước khi bị phát hiện.
- Để tránh việc bị hack bằng phương pháp này, bạn nên đảm bảo mình có một password mạnh, hoặc ít nhất là không nằm trong những top password tệ như trong link bên dưới :D.

[Top 200 most common
passwords of the year 2020](https://nordpass.com/most-common-passwords-list/)

## 4. Keylogging
**Risk Level: Medium**
![what-is-a-keylogger.jpg](https://images.viblo.asia/9a3c2773-d24f-4eaf-b382-231afdb93fea.jpg)
- Keylogging là một trong những phương pháp lâu đời nhất mà hacker dùng để lấy cắp password cũng như các thông tin giá trị khác.
- Hackers sẽ sử dụng một phần mềm giám sát gọi là **keylogger** (có thể ở dạng một phần mềm chạy ngầm hoặc dạng extension trên browser, v.v.) để track và ghi lại các hoạt động trên bàn phím của một người và gửi lại cho hacker đã tạo ra nó (thông qua email hoặc 1 server nào đó được dựng lên).
- Độ nguy hiểm của Keylogging không quá cao như các phương pháp ở trên, do hacker cần tiếp xúc với máy tính của bạn để có thể cài được keylogger. Tuy nhiên, bạn cũng nên cẩn trọng khi tải các phần mềm không đáng tin trên Internet.

## 5. Brute force attacks
**Risk Level: Low**
![image.png](https://images.viblo.asia/a60c10dd-32fc-4250-8ac6-0828c3a809c1.png)
- Đây là một chiến thuật mà hacker sử dụng để truy cập trái phép vào network bằng cách đoán tên username và password. Hacker có thể làm việc này thủ công hoặc sử dụng các phầm mềm tự động gọi là bot.
- Nói cách khác thì hacker sẽ thử tất cả các tổ hợp password có thể, để cố gắng truy cập vào account của ai đó. Đôi khi cũng có những dạng khác, như là thử tất cả các tổ hợp từ trong từ điển chẳng hạn (Dictionary attack), v.v..
- Đây có thể là phương pháp hack password được nhìn thấy nhiều nhất trên phim ảnh, khi mà các hacker sẽ chạy một đoạn script hoặc thuật toán nào đó, và 3..2..1.. đã crack thành công password. :D
- Trên thực tế thì đây là một phương pháp khá tốn công và tốn thời gian đối với hacker, đặc biệt với các password có độ phức tạp lớn.

## 6. Extortion hoặc Blackmail
**Risk Level: Low**
![image.png](https://images.viblo.asia/cc2b5834-5700-4137-8850-3197efc7b6f3.png)
- Đây là dạng mà hacker sẽ gửi trực tiếp các email nặc danh yêu cầu đối tượng cung cấp password, nếu không sẽ làm điều gì đó xấu mà họ không mong muốn, như là sử dụng thông tin nhạy cảm, thông tin cá nhân để làm hại tới họ.
- Có thể thấy đây là một dạng thư đe dọa, tống tiền khá thường gặp.


### Lời kết
Rõ ràng có khá nhiều cách để một hacker có thể lấy password của bạn, ngoài những phương pháp trên, còn có Man-in-the-middle attack, Monitoring public Wi-Fi, Local discovery mà mình chưa kể tới.
Thậm chí có thể còn nhiều cách nguy hiểm khác nữa mà những người thực sự có mục đích xấu mới biết được.

VÌ thế việc ý thức về bảo mật thông tin cá nhân cũng như chủ động phòng tránh những phương pháp cơ bản này là rất quan trọng.

Mình cũng xin liệt kê một vài cách cơ bản để có thể phòng tránh việc bị đánh cắp password.
* Cảnh giác với những email đáng ngờ (Phishing emails).
* Tránh để các đối tượng không đáng tin sử dụng PC của bạn.
* Sử dụng phầm mềm antivirus.
* Tránh sử dụng public Wifi.
* Tránh truy cập vào các đường link, website không đáng tin cậy.
* Đặt mật khẩu mạnh cho account trên các nền tảng, và thường xuyên thay đổi mật khẩu.
* Tránh sử dụng chung password cho tất cả các nền tảng.
* Sử dụng MFA (Multi-factor authentication) cho các tài khoản quan trọng.

### References
[How hackers steal your passwords](https://www.graphus.ai/blog/how-hackers-steal-your-passwords/)

[7 Ways Hackers Steal Your Passwords](https://www.sentinelone.com/blog/7-ways-hackers-steal-your-passwords/)

[What is Credential Stuffing?](https://www.cloudflare.com/en-gb/learning/bots/what-is-credential-stuffing/)

[What is a Brute Force Attack? Types & Examples](https://phoenixnap.com/blog/brute-force-attack)