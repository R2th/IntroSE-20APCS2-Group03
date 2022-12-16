# Mở đầu
Trước khi bắt đầu bài đọc này, bạn nên đọc bài viết trước của series để có những kiến thức cơ bảnvề cách chúng ta có những chuỗi hash sử dụng trong blockchain

https://viblo.asia/p/de-bat-dau-tim-hieu-ve-blockchain-hay-hoc-ve-hasing-functionham-bam-GrLZDR825k0

## Một số khái niệm cơ bản
* Mã hóa (Encryption): Là quá trình chuyển đổi thông tin từ dạng thông thường (có thể đọc được) ví dụ như 1 đoạn text, 1 con số nào đó sang dạng không đọc được (một đoạn mã hóa), nhằm bảo mật thông tin.
* Giải mã (Decryption): Là quá trình ngược của mã hóa - chuyển đổi từ thông tin đã mã hóa về thông tin ban đầu.
* Khóa (Key): Là một đoạn thông tin được sử dụng để mã hóa và/hoặc giải mã.

# Mã hóa khóa đối xứng (Symmetric-key cryptography)
## Mã hóa đối xứng là gì?
Là một phương pháp mã hóa trong đó một khóa giống nhau sẽ vừa được dùng để mã hóa, vừa được dùng để giải mã các tệp tin.
![](https://images.viblo.asia/cc682750-d962-4215-90ec-80fd23a77965.png)

## Cách thức hoạt động
Một sơ đồ mã hóa đối xứng thường sử dụng một khóa đơn được chia sẻ giữa 2 hoặc nhiều người dùng với nhau. Khóa duy nhất này sẽ được dùng cho cả 2 tác vụ mã hóa và giải mã các văn bản thô (các tin nhắn hoặc mảnh dữ liệu cần được mã hóa). Quá trình mã hóa bao gồm việc chạy văn bản thô (đầu vào) thông qua một thuật toán mã hóa còn gọi là mật mã (cipher) sẽ lần luợt tạo ra các bản mã - ciphertext (đầu ra).

Khi sơ đồ mã hóa đủ mạnh thì cách duy nhất để đọc và truy cập được các thông tin chứa trong các bản mã là sử dụng khóa tương ứng để giải mã. Quá trình giải mã về cơ bản sẽ chuyển đổi các bản mã trở về dạng văn bản thô ban đầu.

Mức độ bảo mật của các hệ thống mã hóa đối xứng sẽ phụ thuộc vào độ khó trong việc suy đoán ngẫu nhiên ra khóa đối xứng theo hình thức tấn công brute force. Lấy ví dụ, để dò ra mã hóa của 1 khóa 128-bit thì sẽ mất tới vài tỷ năm nếu sử dụng các phần cứng máy tính thông thường. Thông thường, các khóa có độ dài tới 256-bit có thể được xem là có độ bảo mật cao tuyệt đối, có khả năng chống lại được hình thức tấn công brute force từ các máy tính lượng tử. 
## Ưu điểm
Ưu điểm của các phương pháp này là đơn giản, tốc độ cao, mang lại hiệu quả tốt nếu bạn không chia sẻ khóa của mình cho người khác.
## Nhược điểm
Để có thể trao đổi thông tin bí mật với nhau, hai bên phải thống nhất với nhau trước về khóa bí mật. 

=> Bài toán đặt ra là làm sao có thể đảm bảo việc gửi khóa cho nhau là bí mật.

* Nếu các khóa này được chia sẻ lên các kết nối không an toàn thì nguy cơ bị can thiệp bởi một bên thứ 3 là rất lớn. Khi một người dùng không được ủy quyền chiếm được quyền truy cập một khóa đối xứng thì mọi dữ liệu được mã hóa bằng khóa đó sẽ bị xâm phạm.
* Do bên gửi và nhận sử dụng chung khóa, chúng ta không thể xác định được nguồn gốc của một thông điệp (message) là do ai gửi.

# Mã hóa khóa công khai (Public-key cryptography)
## Mã hóa khóa công khai là gì?
Mật mã hóa khóa công khai là một dạng mật mã hóa cho phép người sử dụng trao đổi các thông tin mật mà không cần phải trao đổi các khóa chung bí mật trước đó. Điều này được thực hiện bằng cách sử dụng một cặp khóa có quan hệ toán học với nhau là khóa công khai và khóa bí mật *(theo Wikipedia)*. Do đó, Mã hóa khóa công khai sinh ra để xử lý nhược điểm về truyền tải khóa chung của Mã hóa đối xứng

## Cách thức hoạt động
### Cặp khóa công khai và khóa bí mật
Chọn một số ngẫu nhiên lớn để sinh cặp khóa.
![](https://images.viblo.asia/ad6f4f87-3277-40d6-b578-7b3a677c877d.jpg)
Khác với mã đối xứng, mã hóa khóa bất đối xứng sử dụng một cặp khóa: khóa công khai (public key) và khóa bí mật (private key). Hai khóa này được xây dựng sao cho từ một khóa, rất khó có cách sinh ra được khóa còn lại. Một khóa sẽ dành để mã hóa, khóa còn lại dùng để giải mã. Chỉ có người sở hữu nắm được khóa bí mật trong khi khóa công khai được phổ biến rộng rãi.
### Cách hoạt động
![](https://images.viblo.asia/7ef62f90-8f67-49d9-bb41-c4d9de545f38.jpg)
* Người nhận sẽ tạo ra một gặp khóa (public key và private key), họ sẽ giữ lại private key và truyền cho bên gửi public key. Vì public key này là công khai nên có thể truyền tự do mà không cần bảo mật.
* Trước khi gửi tin nhắn, người gửi sẽ mã hóa dữ liệu bằng mã hóa bất đối xứng với những key nhận được từ người nhận (khóa công khai)
* Người nhận sẽ giải mã dữ liệu nhận được bằng thuật toán được sử dụng ở bên người gửi, với key giải mã là private key.
==> Ta có thể đảm bảo rằng, với dữ liệu đã được mã hóa gửi qua internet, thì chỉ có người nhận với private key mới có thể giải mã và đọc nội dung
### Bổ sung thêm cho mô hình 
![](https://images.viblo.asia/d54996db-e236-4797-aa91-d4729dd2b70a.jpg)
* Ở mô hình bổ sung này, Chúng ta có thêm 1 phần đó là sử dụng cặp khóa công khai và private của người gửi, chi tiết như sau:
* Người gửi sẽ sử dụng private key của mình để mã hóa dữ liệu lần 1 sau đó mới dùng public key của người nhận để mã hóa lần 2 rồi mới gửi chuỗi mã hóa tới người nhận
* Ở bên người nhận, họ cũng sẽ cần giải mã 2 lần, lần 1 là private key của chính họ và lần cuối là dùng public key của người gửi
=> Với cách làm này, ta có thể xử lý được thêm 1 vấn đề trong mã hóa đối xứng đó là có thể xác định được, chính Bob mới là người gửi gói tin chứ không phải ai khác vì ta dùng public key của Bob mới có thể giải mã được tập tin
## Ưu điểm
* Mã hóa bất đối xứng an toàn hơn vì nó sử dụng các key khác nhau cho quá trình mã hóa và giải mã. Nó đảm bảo việc xác minh ai là người gửi gói tin đồng thời cũng đảm bảo việc người đọc được gói tin sẽ là người nhận chứ không phải bên thứ 3
## Nhược điểm
* Mã hóa bất đối xứng mất nhiều thời gian hơn để thực hiện do logic phức tạp liên quan. Vì lý do này, mã hóa đối xứng vẫn được ưu tiên sử dụng khi truyền dữ liệu hàng loạt.
* Tồn tại khả năng một người nào đó có thể tìm ra được khóa bí mật. Không giống với hệ thống mật mã sử dụng một lần (one-time pad) hoặc tương đương, chưa có thuật toán mã hóa khóa bất đối xứng nào được chứng minh là an toàn trước các tấn công dựa trên bản chất toán học của thuật toán. 
* Một điểm yếu tiềm tàng trong việc sử dụng khóa bất đối xứng là khả năng bị tấn công dạng kẻ tấn công đứng giữa (man in the middle attack): kẻ tấn công lợi dụng việc phân phối khóa công khai để thay đổi khóa công khai. Sau khi đã giả mạo được khóa công khai, kẻ tấn công đứng ở giữa 2 bên để nhận các gói tin, giải mã rồi lại mã hóa với khóa đúng và gửi đến nơi nhận để tránh bị phát hiện. Dạng tấn công kiểu này có thể phòng ngừa bằng các phương pháp trao đổi khóa an toàn nhằm đảm bảo nhận thực người gửi và toàn vẹn thông tin. Một điều cần lưu ý là khi các chính phủ quan tâm đến dạng tấn công này: họ có thể thuyết phục (hay bắt buộc) nhà cung cấp chứng thực số xác nhận một khóa giả mạo và có thể đọc các thông tin mã hóa.
# Kết luận

Xin cảm ơn bạn đã quan tâm đến bài viết này, chúc bạn sẽ có được những kiến thức cơ bản về mã hóa công khai được sử dụng trong blockchain. Phần tiếp theo, tôi nghĩ chúng ta nên tìm hiểu thêm về 1 thuật toán trong mã hóa công khai đó là RSA và một khái niệm là Digital signatures, mời các bạn đón đọc!

* Nguồn tham khảo

https://academy.binance.com/vi/articles/what-is-symmetric-key-cryptography
https://vi.wikipedia.org/wiki/M%E1%BA%ADt_m%C3%A3_h%C3%B3a_kh%C3%B3a_c%C3%B4ng_khai