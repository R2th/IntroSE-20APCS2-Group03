# Question 1: Describe the basics of input and output of a stream cipher.
- Với **stream cipher (hệ mã luồng)** này việc mã hóa sẽ được thực hiện lần lượt trên từng bit của plain text.
- Điển hình nhất của hệ mã hóa này chính là mã hóa OTP ( One Time Pad):
    - Ở kiểu mã hóa này có đặc điểm sau:
        - Plain text, ciphertext và khóa có kích thước phải bằng nhau.
        - Khóa sinh ra phải là ngẫu nhiên mới đảm bảo tính bảo mật cho mã hóa.
        - Ciphertext chính là luồng xor các bit của plain text và khóa.
        - Nhờ đặc điểm của phép XOR mà ta sẽ giải mã bằng cách XOR ciphertext và khóa với nhau.
     - Các hàm của hệ mã này được mô tả như sau (với $\bigoplus$ là phép toán XOR):
         - $E(m, k) = m \bigoplus k = c$
         - $D(c, k) = c \bigoplus k = (m \bigoplus k) \bigoplus k = m$
  
  Đây là mô tả cơ bản về thuật toán OTP dùng để mã hóa 1 chuỗi `heilhitler`. Sau khi mà hóa ta được chuỗi `srlhssthsr`. Vì việc sử dụng key là một chuỗi bit được sinh ngẫu nhiên nên ta có thể chắc chắn rằng mã khóa sẽ không thể bị phá vỡ nếu không biết được key.
  
![](https://images.viblo.asia/6d7c5114-2a02-4a35-a904-bbde64f2950f.jpg)
# Question 2: Block ciphers and their characteristics and security concerns
### Các đặc điểm chính
- Khác với mã luồng, **mã khối (block cipher)** sẽ mã hóa từng khối dài bit (thường là bội số của 2) một lần. Mỗi khối này có độ dài $n$ gọi là **kích thước khối (block size)**.
- Trong trường hợp độ dài của plain text không phải là bội số của khối thì ta sẽ cần phải đệm thêm dữ liệu (padding) vào plaintext để đạt được độ dài thỏa mãn.
- Các hệ mã khối nổi tiếng đó là DES có kích thước khối là 64 (tức là mỗi lần mã hóa một khối plaintext 64 bit và cho ra khối ciphertext 64 bit) và kích thước khóa là 56 bit; AES có kích thước khối là 128 bit, và kích thước khóa là 128, 192 hoặc 256 bit.
- Mã khối rất khó bị phá vỡ nếu khối có kích thước đủ lớn. Tất nhiên việc tăng kích thước khối sẽ làm giảm tốc độ của thuật toán. Giả sử mã khối có độ dài khối là n= 128bit thì ta sẽ có $2^n = 2^{128}$ khả năng để thử. Và điều này với máy tính tính thông thường là không thể vì cần quá nhiều thời gian.
- ![](https://images.viblo.asia/ba3a7328-5c92-4b47-995e-36ae18420189.jpg)
### Các vấn đề liên quan đến bảo mật
- Về nguyên tắc thiết kế mã hóa khối người ta đã đưa ra 2 nguyên tắc để đảm bảo tính bảo mật cho thuật toán đó là việc tạo ra tính hỗn loạn rắc rồi ( confusion) và tính khuếch tán (diffusion)
    - **Confusion (hỗn loạn, rắc rối)**: sự phụ thuộc của ciphertext đối với plain text phải thực sự phức tạp để gây rắc rối, cảm giác hỗn loạn đối với kẻ thù có ý định phân tích tìm quy luật để phá mã. Quan hệ hàm số của mã-tin là phi tuyến (non-linear).
    - **Diffusion (khuếch tán)**: làm khuếch tán những mẫu văn bản mang đặc tính thống kê (gây ra do dư thừa của ngôn ngữ) lẫn vào toàn bộ văn bản. Nhờ đó tạo ra khó khăn cho kẻ thù trong việc dò phá mã trên cơ sở thống kê các mẫu lặp lại cao. Sự thay đổi của một bit trong một khối plain text phải dẫn tới sự thay đối hoàn toàn trong khối mã tạo ra.
# Question 3: What is the problem with LM hashes?
- **Hash LAN Manager** là một trong những thuật toán hash mật khẩu đầu tiên được sử dụng bởi các hệ điều hành Windows, chỉ có một phiên bản duy nhất được hỗ trợ cho tới khi xuất hiện NTLMv2 sử dụng trong Windows 2000, XP, Vista và Windows 7. Các hệ điều hành mới này vẫn hỗ trợ sử dụng các hash LM để có khả năng tương thích. Mặc dù vậy, nó đã bị vô hiệu hóa mặc định trong Windows Vista và Windows 7.

- Hash mật khẩu loại này được tính bằng một quá trình 6 bước sau:
    - Mật khẩu người dùng được chuyển đổi thành tất cả các ký tự in hoa.
    - Mật khẩu được bổ sung thêm các ký tự 0 vào cho tới khi có đủ 14 ký tự.
    - Mật khẩu mới được chia thành hai hash có 7 ký tự.
    - Các giá trị này được sử dụng để tạo hai khóa mã hóa DES, mỗi nửa đều được thêm vào một bit chẵn lẻ để tạo các khóa 64 bit.
    - Mỗi khóa DES sẽ được sử dụng để mã hóa một chuỗi ASCII định sẵn `(KGS!@#$%)`, cho kết quả ra trong hai chuỗi ciphertext 8-byte.
    - Hai chuỗi ciphertext 8-byte này sẽ được kết hợp để tạo thành một giá trị 16-byte, giá trị này chính là một hash LM hoàn chỉnh.

![](https://images.viblo.asia/ee986d8f-61a6-4baf-82e1-2a94af4d9672.jpg)

- Các mật khẩu sử dụng theo phương pháp LM hash có một số nhược điểm. Nhược điểm đầu tiên cần kể đến là sự mã hóa ở đây dựa vào Data Encyrption Standard (DES). DES khởi đầu từ một dự án của IBM vào những năm 70, dự án sau đó bị sửa đổi bởi NIST, được bảo trợ bởi NSA và được phát hành như một chuẩn ANSI vào năm 1981. DES được cho là khá an toàn trong nhiều năm sau những nghiên cứu kỹ lưỡng trong những năm 90 nhờ kích thước khoá 56-bit của nó. Tuy nhiên đến đầu năm 1998, Electronic Frontier Foundation thông báo là đã có thể crack DES trong khoảng thời gian 23 giờ. Từ đó, DES được xem như đã lỗi thời và cũng từ đó nó được thay thế bằng Triple-DES và AES. Tuy nhiên đây cũng là các chuẩn mã hóa đã có thế phá vỡ với sức mạnh tính toán hiện đại và có thể bị crack một cách dễ dàng.

- Trong quá trình tạo các khóa (key) DES, một mật khẩu được cấp bởi người dùng sẽ tự động chuyển đổi tất cả thành in hoa, sau đó được chèn thêm thành chuỗi có độ dài 14 ký tự (đây là chiều dài tối đa cho mật khẩu theo phương pháp LM hash), tiếp đó được chia thành hai hash 7 ký tự. Đây là một điểm yếu khi bạn chuỗi mật mã bị chia nhỏ và chỉ được phép sử dụng các ký tự ASCII in hoa. Xét về bản chất, thuật toán này làm cho việc sử dụng các ký tự khác cũng như tăng chiều dài mật khẩu trở nên vô nghĩa, đó chính là điều làm cho các mật khẩu LM trở nên dễ dàng phá bằng phương pháp brute-force.
# Question 4: What is pass the hash?
    
- Trong phân tích mã và bảo mật thì **pass the hash (vượt qua hàm băm)** là một kỹ thuật hack cho phép hacker xác thực với máy chủ hoặc dịch vụ từ xa bằng cách sử dụng hàm băm NTLM hoặc Lanman basic của mật khẩu người dùng, thay vì yêu cầu mật khẩu dạng bản rõ như thông thường .

- Sau khi kẻ tấn công có được giá trị băm mật khẩu người dùng và mật khẩu người dùng hợp lệ (bằng cách nào đó có thể là sử dụng các phương pháp và công cụ khác nhau), họ có thể sử dụng thông tin đó để xác thực với máy chủ hoặc dịch vụ từ xa bằng cách sử dụng xác thực LM hoặc NTLM mà không cần phải brute-force để có được mật khẩu (clear text). Cuộc tấn công khai thác điểm yếu triển khai trong giao thức xác thực, trong đó mật khẩu được băm vẫn giữ nguyên từ phiên này sang phiên khác cho đến khi mật khẩu được thay đổi ở lần tiếp theo.

- Kỹ thuật này có thể được thực hiện đối với bất kỳ máy chủ hoặc dịch vụ nào chấp nhận xác thực LM hoặc NTLM, cho dù nó chạy trên máy có Windows, Unix hoặc bất kỳ hệ điều hành nào khác.