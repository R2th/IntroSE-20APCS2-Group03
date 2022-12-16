## Cryptography - không chỉ là một phần của nền tảng kỹ thuật số

Như [Bruce Scheneider](https://www.schneier.com/blog/about/) đã đề cập tới trong quyển sách [Applied Cryptography](https://www.schneier.com/books/applied_cryptography/) - "*The art and science of keeping messages secure is cryptography*". Cryptography  (mật mã học) - thứ mà ngày nay được coi như là một phần trong nền tảng ngành công nghiệp kĩ thuật số - không thực sự chỉ gắn liền với máy tính. Thực ra, nó đã xuất hiện từ rất lâu trước thời đại của máy tính rồi, dưới nhiều hình dạng khác nhau. Từ bài viết *[Lịch sử của Cryptography](https://en.wikipedia.org/wiki/History_of_cryptography#Classical_cryptography)*:

> Ứng dụng sớm nhất của mật mã được tìm thấy và ghi nhận là  các chữ tượng hình - thứ được khắc lên tường của một hầm mộ Ai Cập cổ đại có  tiên đại khoảng 1900 TCN. Trong suốt chiều dài lịch sử của con người, có nhiều ví dụ cho thấy mật mã đã được sử dụng từ rất sớm. Các học giả Do Thái đã sử dụng các thuật toán thay thế đơn giản ( ví dụ như mật mã Atbash) từ khoảng 500-600 TCN. Ở Ấn Độ từ những năm 400 TCN cho tới 200 SCN, kĩ thuật [Mlecchita vikalpa](https://en.wikipedia.org/wiki/Mlecchita_vikalpa) đã được ghi lại trong các tài liệu [Kama Sutra](https://en.wikipedia.org/wiki/Kama_Sutra) như một phương thức liên lạc bí mật. Một phần của cuốn [Greek Magical Papyri](https://en.wikipedia.org/wiki/Greek_Magical_Papyri) có từ thời AI Cập cổ đại cũng được ghi bằng mật mã. 

Ngày này, mật mã học cũng hiện diện phổ biến hơn. Một trong những mật mã thông dụng nhất, được gọi là [Caesar cipher, hay shift cipher](https://en.wikipedia.org/wiki/Caesar_cipher), được sử dụng rộng rãi trong các trò chơi của trẻ em. Loại mật mã này có cơ chế là sử dụng một bảng chữ cái được chế từ bảng chữ cái bình thường, với các kí tự được dịch chuyển đi 1 khoảng đơn vị. 

Ví dụ dưới là của loại [ROT13](https://en.wikipedia.org/wiki/ROT13), với các kí tự được dịch chuyển 13 vị trí so với vị trí gốc của chúng:

![alt text](https://cdn-images-1.medium.com/max/800/1*5WajhLbPptMMtDIOyS44aw.png)

Ngày nay, khi nói về mật mã, ta thường nói về chúng trong ứng dụng máy tính. Làm cách nào để các thông tin cá nhân, thông tin tài chính được trao đổi một cách bảo mật qua web (trong các giao dịch ngân hàng online); Làm cách nào để dữ liệu có thể được lưu trữ một các an toàn ?

Nhắc tới mật mã, và việc bảo mật dữ liệu, ta sẽ thường phải quan tấm tới nhiều vấn đề. Chúng bao gồm những khái niệm về **confidentiality** (bảo mật), **integrity** (tính toàn vẹn), **availability**, and **non-repudiation**.

- Confidentiality: Dữ liệu của ta không thể bị truy cập / đọc bảo người dùng không được cấp phép.
- Integrity: Dữ liệu của ta phải 100% nguyên vẹn, đảm bảo là không bị chỉnh sửa, dù là bởi nguyên nhân nào như bị tấn công, mất mát dữ liệu ...
- Availability: Data có thể truy cập bất cứ khi nào cần thiết.
- Non-repudiation: Trong một giao dịch, khi một bên A thực hiện gửi data cho bên B, thì người đó sẽ không có khả năng phủ nhận việc đó sau này. Nói cách khác, phải có một cách để đảm bảo rằng *không ai khác ngoài A* có thể là tác giả và người gửi thông điệp.

Cryptography không giúp chúng ta nhiều về tính availability, nhưng ở các mặt khác, các cơ chế mã hóa điện tử hiện nay thường được sử dụng rộng rãi và giúp ta thực hiện việc đảm bảo 3 mục tiêu còn lại. Khi nói về mã hóa điện tử, đó sẽ thường là việc ám chỉ một trong những kĩ thuật phổ biến như:

1. Symmetric encryption
2. Asymmetric encryption
3. Hash functions
4. Digital signatures

Trong bài viết này, tôi sẽ giới thiệu lần lượt về từng loại, đồng thời cung cấp một ví dụ đơn giản để giúp người đọc hiểu hơn về chúng.

## Symmetric Encryption (Mã hóa đối xứng)

> Encryption: Là quá trình mã hóa một thông điệp, làm cho nó trở thành không-đọc-được
> 
> Decryption: Quá trình ngược lại với encryption, biến một nội dung đã-mã-hóa trở lại về nội dung có thể hiểu được.

Để tiến hành mã hóa và giải mã data, ta cần có `data` (nội dung thông điệp mà ta cần mã hóa) cùng với một `key` (thứ sẽ quy định đầu ra của mã hóa). 

Với phương pháp symmetric encryption, key được dùng khi mã hóa và giải mã là một. Ta có thể thử lấy một chuỗi string và encrypt nó:

```
> require 'openssl'
=> false

> data = 'Chuoi can ma hoa'                        # => data cần mã hóa
=> "Chuoi can ma hoa"

> cipher = OpenSSL::Cipher.new('aes256')
=> #<OpenSSL::Cipher:0x005573bca92880>

> cipher.encrypt
=> #<OpenSSL::Cipher:0x005573bca92880>

> key = cipher.random_key
=> "\xAD\xF8\xFC\x02xF.cD\x0F\x1D\xAA\xF0_\xD7\xFB\xA4YSg\xC6=_\x83\xCCd\xA1y\xC4\x97\xD7l"

> iv = cipher.random_iv
=> "\xC9\xBFn\xC8R\xBA\x12\xDA \xED/s\x9Cm@M"

> output = cipher.update(data) + cipher.final
=> "\x8B\bz2\x82\xCA<\x12 C\xD01\xDAO\xCD\x92\x9E\xB9\x80d\xB6\x15f\xCEH\xB0\xBBCb\xAF\xB2\xAA"
```

Như vậy là từ data ban đầu là `'Chuoi can ma hoa'`, sau quá trình encrypt nó đã trở thành 1 chuỗi kí tự không-có-ý-nghĩa-gì `\x8B\bz2\x82\xCA<\x12 C\xD01\xDAO\xCD\x92\x9E\xB9\x80d\xB6\x15f\xCEH\xB0\xBBCb\xAF\xB2\xAA`.

---

Giờ  thì thử quay ngược lại và giải mã chuỗi output, sử dụng cái `key` mà ta lấy ra ở trên.

```
> cipher.decrypt
=> #<OpenSSL::Cipher:0x005573bca92880>

> cipher.iv = iv
=> "\xC9\xBFn\xC8R\xBA\x12\xDA \xED/s\x9Cm@M"
> cipher.key = key
=> "\xAD\xF8\xFC\x02xF.cD\x0F\x1D\xAA\xF0_\xD7\xFB\xA4YSg\xC6=_\x83\xCCd\xA1y\xC4\x97\xD7l"

> data_decrypted = cipher.update(output) + cipher.final
=> "Chuoi can ma hoa"
```

Trong trường hợp này, sử dụng cùng một key dùng khi mã hóa để giải mã, ta lấy lại được chuỗi ban đầu.

## Asymmetric Encryption (Mã hóa bất đối xứng)

Như đã nói ở trên, mã hóa đối xứng là trường hợp mà key dùng để mã hóa cũng như giải mã là một. Cơ chế này sẽ sinh ra một vấn đề: Nếu như ta cần phải gửi data đi trong một môi trường không an toàn (qua mạng internet ...) ? Dùng cùng một `key` để encrypt và decrypt data, có thể trước tiên ta sẽ phải gửi cái key đó cho phía đối tác. Nhưng điều đó cũng có nghĩa là ta gửi key qua một môi trường không an toàn ! 

Đây là lúc mà asymmetric encryption xuất hiện.

Về cơ bản, đối với asymmetric encryption, thay vì sử dụng 1 key như trên, ta sẽ phải sinh ra 2 key, và 2 key này sẽ có quan hệ về mặt toán học với nhau. Một trong hai key sẽ là *private key*, là cái mà *chỉ có ta* mới có, và không được chia sẻ cho ai; cái còn lại sẽ là *public key*, là cái mà ta sẽ dùng để gửi cho phía đối tác.

Về cơ chế, quá trình mã hóa này sẽ bao gồm:
- Khi phía client yêu cầu thiết lập một kết nối an toàn với server, server sẽ gửi public key của mình cho client.
- Client generate ra một `symmetric cipher` và encrypt nó, sử dụng public key được server gửi cho, rồi gửi lại về server.
- Server decrypt message nhận lại từ client - sử dụng private key - và lấy sra được `symmetric cipher`.
- Bây giờ, cả 2 phía client-server đều đã có chung một `symmetric cipher`, và lại dùng nó để thiết lập một secure connection sử dụng `Symmetric Encryption` như trên.

Giờ, lại có một vấn đề khác nảy sinh: làm sao để biết chắc cái `public key` kia là chính xác (vd. thực sự là do server tạo ra chứ không phải hàng fake ? ). Nói chung, có một vài cách để giải quyết vấn đề này, trong đó cách thông thường nhất (và được sử dụng rộng rãi nhất) là sử dụng [Public key Infrastructure](https://vi.wikipedia.org/wiki/H%E1%BA%A1_t%E1%BA%A7ng_kh%C3%B3a_c%C3%B4ng_khai) (PKI). 

Trong môi trường internet, đây là vai trò của [Certificate Authority](https://vi.wikipedia.org/wiki/Nh%C3%A0_cung_c%E1%BA%A5p_ch%E1%BB%A9ng_th%E1%BB%B1c_s%E1%BB%91) - một nơi (hay một thư mục) chứa tất cả các địa chỉ website cần certificate, cùng với public key của chúng. Khi ta kết nối tới một website nào đó, trước hết, public key của nó sẽ được chứng thực bởi `Certificate Authority`.

>  Nhà cung cấp chứng thực số (Certificate Authority) đóng vai trò là bên thứ ba (được cả hai bên tin tưởng) để hỗ trợ cho quá trình trao đổi thông tin an toàn. Các nhà cung cấp chứng thực số là thành phần trung tâm trong nhiều mô hình hạ tầng khóa công khai (PKI).
Hiện nay có nhiều CA thương mại mà người dùng phải trả phí khi sử dụng dịch vụ. Các tổ chức và chính phủ cũng có thể có những CA của riêng họ. Bên cạnh đó cũng có những CA cung cấp dịch vụ miễn phí. 

Quay lại với ví dụ ở phía đầu bài, lần này, ta sẽ thử với một cặp public/private key:

```
> require 'openssl'
=> false

> data = 'Chuoi can ma hoa'                        # => data cần mã hóa
=> "Chuoi can ma hoa"

> key = OpenSSL::PKey::RSA.new(2048)
=> #<OpenSSL::PKey::RSA:0x005573bc97aab0>

> key
=> #<OpenSSL::PKey::RSA:0x005573bc97aab0>
> key.public_key
=> #<OpenSSL::PKey::RSA:0x005573bc966808>

> output = key.private_encrypt(data)
=> "\x89\xA7}:\x14\xD7A=\xA1\xA8\x9C\e\xEAf\xCF\x03`\xAAP\xEF\x97t1\x1A\x16\x11\xA4\xC3E\xA4\"\xF4w\xCA\xBD\xE1\xF5\xBD\xFB\xCBh\xCD\\]Yy%\xB6\b?\n\xACbOE\x90\f\xF2X\xCC\xF7\xCA\x99\x9E}\x0E\x96\xFA\xD1q\xC8\xC11\xB4o\x9D]H\v,@\x91\xC9\\\x13\xA2\x91\x03\x86\xBF\xC7Bj\xBE\x15\xF5\xDEv,d\x99\x89\x86\xB5(\x804f\xCB\nO\xA2#\xAA{\x8D\xB7`\xDC\x1E\xCA\xEC\xAC\f\x8B\xB2\xAF\xE1\xDB\x1E)YL\xC7@n\x87j\x8F\xFC\xEB\xC5\xBFmO\xA6\x95\x13\xCC\xFF\xA1b\x12Y\xED\xE0(\x00Xk\xB3Sw\xD4\xBFq\xA8\x8Aj\xD8\x1C\xA1\xF1\x1FG\x1F\xDB\xDE\xE5b\xA7\xCFn\x83\xC5\xCB\xA3\x041\xD3\x8E\xB7w%M\xA4\xD4\x8A\xCA\xE2y\xF6\x93\x06\x1Dt\x96Wjr}k\xB4\xB1\x15vi\xAC\xF9&\x1A#\x1Edo\x0Fx\xE8a\xCA\xE6\x9C1x\xC4\x9EWl\x89APVJ\"\xF3\tS\xA6\x812\x97*\x12]\xCC\xA3"
```

Đầu tiên, chú ý rằng `key` và `public key` của ta là 2 object riêng biệt với object ID khác nhau. Sử dụng hàm `#private_encrypt`, ta có thể mã hóa data sử dụng private key.

Chuỗi đã mã hóa có thể giải mã sử dụng `public key`.

```
> data_decrypted = key.public_decrypt(output)
=> "Chuoi can ma hoa"
```

Sử dụng `#public_decrypt`, ta có thể lấy lại được message ban đầu mà KHÔNG cần sử dụng private key - thứ mà ta chỉ dùng để encrypt thông điệp, và chỉ giữ lại cho ta mà thôi.

## Hashing functions

Một hàm hashing , ngược lại với cơ chế mã hóa / giải mã như trên, là **hàm một chiều**. Điều này có nghĩa là ta có thể tạo một hash từ data đầu vào, nhưng sẽ không có cách gì để đảo ngược quá trình và lấy lại data ban đầu từ hash được sinh ra. Như vậy, đây có thể không phải là một cách hay để lưu trữ dữ liệu, nhưng lại rất hữu ích khi muốn verify tính chính xác của data.

Một hàm hashing sẽ nhận đầu vào lại một data, và đầu ra sẽ là một chuỗi *nhìn-có-vẻ-là-random* (nhưng không hề :) ), và sẽ luôn có độ dài cố định. 

Một hàm hashing lý tưởng sẽ phải thỏa mãn:
- một hàm sẽ tạo ra output độc nhất với mỗi một input khác nhau (nghĩa là 2 input khác nhau sẽ không được phép cho ra output giống nhau).
- Một input giống nhau sẽ luôn phải cho ra cùng một output qua mỗi lần thực hiện.

Ví dụ, lần này ta sẽ thử với một hàm hashing:

```
> require 'openssl'
=> false

> input = 'input data'
=> "input data"
> digest = Digest::SHA256.digest(input)
=> "\xB4\xA6\x97\xA0W11c\xAE\xE3<\xD8\xD4\ff\xE9\xF0\xF1w\xE0\f\xAC-\xE3$u\xFF\xFFai\xC3\xE3"
```

Như đã thấy, với `input` là "input data", hàm hashing sẽ cho ra output là một chuỗi bất kì ở bên dưới.

Một lần nữa, chạy lại hàm hash với input một lần nữa, và xác thực nó với biến `digest`.

```
> Digest::SHA256.digest(input) == digest
=> true
```

Như đã thấy, chỉ cần data vẫn giữ nguyên giá trị, digest đầu ra sẽ luôn là một giá trị. Ngược lại, chỉ cần thay đổi một chút `input` đầu vào.

```
> input = 'input data :)'
=> "input data :)"

> Digest::SHA256.digest(input) == digest
=> false
```

Thực ra, chỉ cần thay đổi 1 chút trong `input` đầu vào, ta cũng sẽ nhận được một `output` hoàn toàn khác biệt.

```
> Digest::SHA256.digest(input)
=> "\x04\xA9\x13\xD9\xF810\xFD\xF3\x80\xCB\x06\x96\xAA\x16e\x15\x8B-\x833\xA6_\xE6\xA02s4\xA3\x14\xC1\x1D"
```

Vậy ứng dụng của hashing function là gì ?

Một trong những trường hợp phổ biến nhất đó là khi ta cần lưu trữ password của người dùng:

- Password của user cần được lưu trữ để xác thực khi đăng nhập.
- Mặt khác, việc lưu password trong DB rất nguy hiểm một khi DB bị rò rỉ hay đánh cắp.

Lúc này, ta có thể sử dụng cơ chế hashing function vào trường hợp này:
- Chỉ lưu trữ chuỗi hashed của password.
- Mỗi khi user tiến hành đăng nhập, thực hiện lại hashing với password đó và so sánh với chuỗi đã lưu trong DB.

Như vậy là ta vừa đảm bảo có lưu trữ một cái-gì-đó để so sánh, vừa đảm bảo không để lộ thông tin nhạy cảm một khi có sự cố xảy ra.

## Digital signatures (chữ ký số)

Chữ kí số là sự kết hợp của kĩ thuật hashing với asymmetric encryption. Message đầu vào, trước tiên sẽ được hash, và sau đó thì được mã hóa tiếp với private key của người gửi. Đầu ra sẽ là chứ kí, được gửi kèm với message.

Bên nhận sẽ sử dụng public key được bên gửi cung cấp đề decrypt ra mã hash của chữ kí, và sau đó message cũng lại được hash để so sánh với chuỗi vừa decrypt kia. Trong trường hợp ta biết chắc public key là chính xác (là key chuẩn do bên gửi tạo ra), và việc decrypt thành công, vậy thì ta có thể đảm bảo message vừa nhận được chính xác là message do bên gửi đưa tới. Và nếu mã hash lấy được khớp với mã hash khi ta hashing message, vậy ta có thể đảm bảo tiếp sự toàn vẹn của message.

### Nguồn:

https://medium.com/@ahjuice/cryptography-what-is-it-and-how-does-it-work-2a21a730d694