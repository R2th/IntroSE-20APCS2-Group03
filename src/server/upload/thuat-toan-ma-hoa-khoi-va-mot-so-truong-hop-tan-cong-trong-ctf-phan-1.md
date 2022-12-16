![](https://images.viblo.asia/fda045ea-8b36-42e2-aa66-4eb7692abe18.jpeg)

Mã hoá luôn là một trong những biện pháp hiệu quả nhất trong việc đảm bảo tính bí mật của thông tin. Các thuật toán mã hoá được ứng dụng rộng rãi, tồn tại trong nhiều sản phẩm công nghệ. Một số ứng dụng phổ biến có thể kể đến như: SSL/TLS, VPN, WPA2, chữ ký số, truyền tin bí mật end to end (E2EE),...

Ngày nay đã có rất nhiều thuật toán mã hoá mạnh được cung cấp sẵn trong các thư viện của mỗi ngôn ngữ. Nhưng không có thuật toán nào hoàn hảo trong mọi trường hợp, mỗi thuật toán sẽ có điểm mạnh và điểm yếu riêng. Để đạt hiệu quả tốt nhất thì chúng ta cần lựa chọn thuật toán phù hợp với nhu cầu sử dụng, đồng thời cũng cần để ý đến những điểm yếu của thuật toán để có phương án khắc phục.

Trong bài viết này, mình sẽ chia sẻ một số kiến thức về phương pháp mã hoá theo khối mà mình đã tích luỹ được qua quá trình học tập và chơi CTF.

# Thuật toán mã hoá khối
Có nhiều phương pháp phân loại thuật toán khác nhau, phổ biến nhất là phân loại theo khoá. Với cách phân loại này thì các thuật toán mã hoá sẽ được chia thành 2 nhóm:
- Thuật toán mã hoá khoá bí mật (hay còn gọi là khoá đối xứng - symmetric key)
- Thuật toán mã hoá khoá công khai (hay còn gọi là khoá bất đối xứng - asymmetric key)

Một cách phân loại khác mà mình hay sử dụng khi chia sẻ về mã hoá với những bạn mới tìm hiểu về CTF là chia theo thời gian/công nghệ. Với cách này, các thuật toán mã hoá cũng được chia thành 2 nhóm:
- Thuật toán mã hoá cổ điển: chủ yếu sử dụng các phép quay, phép thay thế,....
- Thuật toán mã hoá hiện đại: sử dụng các tính chất toán học, đại số, khối lượng tính toán lớn,...

Ngoài ra còn một cách phân loại nữa cũng phổ biến, đó là chia theo khối dữ liệu mã hoá. Cách này cũng chia các thuật toán mã hoá thành 2 nhóm:
- Thuật toán mã hoá dòng: mã hoá từng ký tự của bản rõ.
- Thuật toán mã khoá khối: chia bản rõ thành từng khối có kích thước bằng nhau, sau đó tiến hành mã hoá với từng khối dữ liệu.

![](https://images.viblo.asia/8e5977c3-dd4f-4a08-90d3-27b38fbf8f70.jpg)

Có thể thấy thuật toán mã hoá dòng thực ra là thuật toán mã hoá khối, với độ dài mỗi khối là 1 ký tự. Tuy nhiên giữa 2 loại vẫn có những sự khác biệt lớn. Ví dụ như: khi chia bản rõ thành từng khối bằng nhau, nếu khối cuối cùng không đủ kích thước thì sẽ phải bổ sung thêm 1 số lượng dữ liệu cho đủ kích thước. Phần dữ liệu bổ sung thêm này được gọi là **padding**.

Chủ đề chính trong bài viết này sẽ liên quan tới thuật toán mã hoá khối.

## Nguyên lý hoạt động
Nguyên lý hoạt động cơ bản như mình đã đề cập bên trên, tuy nhiên cụ thể sẽ có một số yếu tố khác được thêm vào, và có cả những giá trị cụ thể đặc trưng cho thuật toán.

### Bản rõ - Plaintext
Bản rõ sẽ được chia thành từng khối có kích thước bằng nhau. Kích thước của mỗi khối sẽ thay đổi tuỳ theo thuật toán sử dụng. Ví dụ với một số thuật toán sau đây:
- DES: 1 block = 64 bits = 8bytes
- AES: 1 block = 128 bits = 16 bytes

### Bản mã - Ciphertext
Độ dài bản mã của mỗi khối bằng với độ dài phần bản rõ của khối đó. Tức là với thuật toán AES thì mỗi khối đầu vào sẽ cho ra 1 đoạn văn bản mã hoá có độ dài 16 bytes. Tất nhiên, việc độ dài bản mã và độ dài bản rõ có sự chênh lệch hay không tuỳ thuộc vào cách xử lý của thuật toán mã hoá. Nhưng thường thì độ dài giữa đầu vào và đầu ra là không đổi, bởi việc tạo ra chênh lệch độ dài không có ý nghĩa mấy. 

Nếu độ dài bản mã < độ dài bản rõ thì thông tin đã bị nén lại một phần. Việc giải mã lại thông tin một cách nguyên vẹn, không thất thoát thông tin sẽ khó khăn hơn. Ví dụ điển hình của việc nén thông tin là các hàm băm (hash). Trong hàm băm thi thông tin, bất kể kích thước lớn hay nhỏ, khi đi qua hàm băm đều cho ra kết quả có độ dài cố định. Điều này khiến việc phục hồi lại bản rõ là bất khả thi.

Trường hợp độ dài bản mã > độ dài bản rõ cũng tương tự. Tác dụng trong việc gia tăng hiệu quả mã hoá không cao, việc khôi phục bản rõ khó hơn. Thậm chí ở trường hợp này thì dữ liệu còn bị phình ra, tốn dung lượng lưu trữ hơn cần thiết.

Trường hợp dữ liệu đầu vào không chia đủ thành các khối đều nhau, thì thuật toán sẽ có biện pháp để thêm phần padding. Lúc này, khi xét trên toàn bộ bản rõ gốc và bản mã, ta sẽ thấy bản mã có độ dài lớn hơn bản rõ vì có thêm phần padding.

### Khoá mã hoá
Đa số các thuật toán mã hoá theo khối cũng là loại mã hoá sử dụng khoá bí mật (theo những thuật toán mình biết, thì hiện tại không có thuật toán mã hoá khoá công khai nào tiến hành mã hoá theo khối. Nhưng có thể hiểu biết của mình chưa đủ rộng). Độ dài khoá thì linh động, các thuật toán DES, AES có cơ chế để tăng độ bảo mật dựa theo kích thước khoá. Độ dài khoá càng lớn thì bản mã càng khó bị giải mã trái phép.

### Padding
Padding là phần dữ liệu được thêm vào phía cuối của bản rõ, cũng chính là phía cuối của khối đầu vào cuối cùng. Một số cách thêm padding như: 
- Thêm toàn các byte "0x00".
- Thêm vào 1 byte "0x80" và sau đó là các byte "0x00" (ISO padding)

Việc thêm padding nhằm đảm bảo bản rõ sẽ được chia thành các khối có kích thước đều nhau trước khi đưa vào trong hàm mã hoá. Tuy nhiên không phải tất cả các thuật toán mã hoá khối và chế độ mã hoá đều sử dụng padding.

Để xác định bản rõ có được thêm padding hay không, một số trường hợp sẽ thêm các padding đặc thù để đánh dấu. Một số thì lại chọn phương án "dummy": mặc định thêm padding, kể cả khi độ dài bản rõ đã đủ chia thành các khối đều nhau. Tuy nhiên thường thì lập trình viên sẽ sử dụng phương pháp padding có sẵn được cung cấp bởi các thư viện như ANSI, PKCS5, PKCS7,...

### IV - Initialization vector
IV là một giá trị đặc thù được sử dụng bởi một số chế độ và thuật toán mã hoá khối. Giá trị này được sử dụng để đảm bảo cho dù cùng một bản rõ với cùng khoá mã hoá, thì kết quả của mỗi lần mã hoá sẽ không giống nhau. IV có kích thước bằng với kích thước khối.

## Một số thuật toán mã hoá khối
### DES - Data Encryption Standart 
DES là một trong số những thuật toán mã khoá khối đầu tiên được công nhận và sử dụng rộng rãi. DES được phát triển và hoàn thiện bởi IBM từ thập niên 1970, là bản cải tiến từ thuật toán mã hoá LUCIFER. Sau đó cũng trong thời gian này được công nhận bởi NBS (U.S National Bureau of Standards) và NSA (U.S National Security Agency).

![](https://images.viblo.asia/bcd4ea83-e4d0-4369-9313-9636358aed1e.jpeg)

DES cũng có một phiên bản tăng cường là 3-DES. Bản chất là sử dụng 3 lần thuật toán DES theo trình tự:
- Quá trình mã hoá: `Mã hoá => Giải mã => Mã hoá`
- Quá trình giải mã: `Giải mã => Mã hoá => Giải mã`

![](https://images.viblo.asia/c75f385c-4be9-4b2c-a2f0-502a941d33fe.jpg)

### IDEA - International Data Encryption Algorithm
IDEA được công bố lần đầu tiên vào năm 1991, với mục đích thay thế DES. Tuy có những điểm vượt trội nhất định nhưng IDEA lại không thể đáp ứng yêu cầu về tốc độ mã hoá để có thể ứng dụng trong mã hoá đường truyền mạng tốc độ cao.

![](https://images.viblo.asia/5ae8973e-d740-4df5-9f9a-d64a74aa3660.png)

### RC5
Thuật toán mã hoá RC5 có chút khác biệt so với các thuật toán mã hoá khối khác. Các thuật toán mã hoá khối thường có kích thước khối cố định, người dùng có thể thay đổi độ dài khoá để tăng tính bảo mật cho thuật toán. Còn RC5 lại có thể thay đổi kích thước khối: 32, 64 hoặc 128 bit.

![](https://images.viblo.asia/a9f4c796-286f-4077-89ed-b5fd96d14118.jpg)

RC5 có thể gợi lên hội 6 RC gồm RC1, RC2, RC3,... RC6 nhưng chúng không thực sự "thân nhau" cho lắm:
- RC1 chưa từng được công bố.
- RC2 là thuật toán mã hoá khối 64 bit.
- RC3 chết non.
- RC4 là thuật toán mã hoá dòng.
- RC5 là thuật toán mã hoá khối có thể lựa chọn kích thước khối trong 32, 64, và 128 bit.
- RC6 là thuật toán mã hoá khối 128 bit vượt trội hơn RC5.

### AES
Có tên khác là **Rijndael**, sau khi chiến thắng cuộc thi Advanced Encryption Standard to NIST (National Institute of Standards and Technology) tổ chức thì mới được đổi tên thành AES - tên viết tắt của cuộc thi.

![](https://images.viblo.asia/2c30647d-d2af-471f-8669-3a09b672eed4.jpg)

Ngày nay, AES vẫn là thuật toán mã hoá khoá bí mật được tin tưởng sử dụng. Với độ dài khoá 256 bit, AES có đủ khả năng để bảo vệ thông tin trước các cuộc tấn công.

### Blowfish
Blowfish có tốc độ mã hoá nhanh hơn cả DES, do đó có thể được sử dụng trong mã hoá gói tin mạng tốc độ cao. Tuy nhiên quá trình thay đổi khoá mã hoá của nó lại lâu hơn so với các thuật toán khác. Blowfish còn được sử dụng trong hash mật khẩu. Mặc dù thuật toán mã hoá này chỉ tiêu tốn 4Kb RAM nhưng như vậy vẫn chưa đủ nhỏ để sử dụng trong thẻ thông minh.

![](https://images.viblo.asia/b13ebddd-5d6d-4e0d-8d87-c40a0ed3384a.jpg)

-----

Trong phần 2, chúng ta sẽ đề cập cụ thể về từng chế độ cũng như điểm yếu của chúng.