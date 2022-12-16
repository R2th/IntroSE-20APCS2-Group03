## 1. OpenSSL
**OpenSSL** là một thư viện rất phổ biến trong lĩnh vực bảo mật dữ liệu, nó cung cấp rất nhiều module hữu ích trong việc mã hóa (**encrypt**) và giãi mã (**decrypt**) với nhiều thuật toán khác nhau như: **AES, SEED, CAST, DES, RC ...**<br>
Đây là một thư viện mã nguồn mở và trong Ruby nó được tích hợp sẵn, chỉ cần cài xong ruby là có thể sữ dụng ngay mà ko cần phải cài đặt thêm bất cứ thứ gì khác. Rất tiện lợi phải ko nào :stuck_out_tongue_winking_eye:
## 2. OpenSSL::Cipher
**OpenSSL::Cipher** là một module của **OpenSSL**, cung cấp các **thuật toán đối xứng** để mã hóa và giải mã.<br>
Để xem danh sách các thuật toán được hỗ trợ có thể được lấy bằng cách:
```ruby
OpenSSL::Cipher.ciphers
```
Thuật toán được phân loại theo tên của nó, độ dài khóa (key length) tính bằng bit và chế độ (mode) được sử dụng. Cách chung nhất để tạo **Cipher instance** là như sau:
```ruby 
cipher = OpenSSL::Cipher.new('<name>-<key length>-<mode>')
```
Ví dụ:
```ruby
cipher = OpenSSL::Cipher.new('AES-128-CBC')
```
Ngoài ra ta còn 1 số cách khởi tạo khác như sau:
```ruby
cipher = OpenSSL::Cipher::AES.new(128, :CBC)
cipher = OpenSSL::Cipher::AES.new(128, 'CBC')
cipher = OpenSSL::Cipher::AES.new('128-CBC')
cipher = OpenSSL::Cipher::AES128.new(:CBC)
cipher = OpenSSL::Cipher::AES192.new(:CBC)
cipher = OpenSSL::Cipher::AES256.new(:CBC)
```
### 2.1 Encryption
Sau khi khởi tạo Cipher instance, để chọn chế độ mã hõa dữ liệu ta dùng `cipher.encrypt`<br>
Dưới đây là đoạn code demo quá trình encryption đơn giản:
```ruby
cipher = OpenSSL::Cipher.new('AES-256-CBC')
cipher.encrypt
cipher.key = key
cipher.iv = iv
ciphertext_blob = cipher.update(plaintext) + cipher.final
ciphertext_base64 = Base64.strict_encode64(ciphertext_blob)
```
Trong đó:<br>
- **Key**: Là khóa dùng để mã hóa và giãi mã dữ liệu, độ dài của nó phụ thuộc vào thuật toán, với **AES-128** là 16 bytes, **AES-256** là 32 bytes, ...
Ta có thể dùng `cipher.random_key` để tạo key hoặc cũng có thể tự tạo và cần được lưu lại dùng để giãi mã sau này. kiểu dữ liệu của key là một string bytes có dạng tương tự như này: 
    ```ruby
        a\xF9x\xAA\xA5hX\x0E\n\xDA\xB1]V\xEE\xAC\xA94\xEA\xE5\x1A@;i\x19\x88\xDF\xC1a|\xC6t\xC4
    ```
    Nếu ta để nguyên như vậy mà lưu DB hoặc ENV thì sẽ bị lỗi hoặc sai value, vì vậy để lưu lại key ta có thể **encode Base64** trước khi lưu, sau này muốn lấy lại key ta chỉ cần **decode Base64** là được. <br>
- **IV ("initialization vector")**: Với các mode **CBC, CFB, OFB và CTR** đều cần một "vectơ khởi tạo", hay gọi tắt là IV. Riêng mode **ECB** là mode duy nhất không yêu cầu IV, chính vì vậy người ta khuyên không nên dùng mode ECB trừ khi bạn hoàn toàn chắc chắn rằng bạn thực sự cần nó, bỡi vì IV mục đích nhằm tăng tính bảo mật của dữ liệu mã hóa, nếu không có IV thì sẽ dễ bị tấn công hơn. <br>
Để hiểu hơn về IV bạn nên tìm hiểu thêm về cách thức hoạt động của mode **CBC (Cipher Block Chaining)**. Nói chung khi sữ dụng mode CBC thì có một số lời khuyên về IV như sau: <br>
    - IV phải là ngẫu nhiên và nên được tạo bằng `cipher.random_iv` <br>
    - IV không nên được sử dụng lại. Tức là, không nên mã hóa data "A" và data "B" với cùng một IV. Mỗi bản ghi nên có IV riêng của nó.
IV không phải là một bí mật như key. Nó có thể được lưu trữ trong bản rõ cùng với data đã mã hóa. <br>
    - IV cũng tương tự key nên để lưu lại IV cũng làm tương tự như với key.<br>
 - **plaintext**: Data cần mã hóa hay còn gọi là bản rõ.
 - **ciphertext_blob**: Là data đã được mã hóa, nó cũng có dạng string bytes như key.
 - **ciphertext_base64**: Là encode Base64 của ciphertext_blob, mục đích để có thể dễ dàng lưu trữ.
###  2.2 Decryption 
Decryption là quá trình ngược lại của encryption để giãi mã data đã được mã hóa. để chọn chế độ giã mã dữ liệu ta dùng cipher.decrypt. <br>
Dưới đây là đoạn code demo quá trình decryption để lấy lại data đã mã hóa ở trên:
```ruby
cipher = OpenSSL::Cipher.new('AES-256-CBC')
cipher.decrypt
cipher.key = key
cipher.iv = iv
ciphertext_blob = Base64.strict_decode64 ciphertext_base64
plaintext = cipher.update(ciphertext_blob) + cipher.final
```
**Lưu ý**: 
- Thuật toán, Key và IV của encrypt và decrypt là giống nhau thì mới có thể mã hóa và giã mã thành công.
- Key và IV nên khác nhau với từng plaintext, và nên lưu cùng với ciphertext.
- Nếu muốn khởi tạo một cipher để encrypt/decrypt nhiều data plaintext/ciphertext khác nhau thì trước mỗi lần encrypt/decrypt ta cần reset cipher bằng cách `cipher.reset`
## 3. Tổng kết
Trên đây là một vài khái niệm cũng như giãi thích cách sữ dụng OpenSSL::Cipher trong Ruby để mã hóa và giãi mã dữ liệu.
Như mọi người đã biết thì phần quan trọng nhất trong quá trình encrypt/decrypt chính là key, ở bài viết này chỉ giớ thiệu về cipher cũng như cách sữ dụng nên không chú trọng vào việc tạo key cũng như quản lý key. <br>

Trong các dự án thực tế người ta không hoặc ít khi tạo và lưu key ở server hoặc DB, vì như vậy là không an toàn, nếu bị hack server hoặc DB thì coi như mất data (vì có key là có thể giãi mã được). Chính vì thế người ta thường tạo key bằng password, sau đó lưu password ở một nơi bí mật nào đó hoặc để end user tự quản lý password, trong OpenSSL có sẵn các module để làm việc đó chẳng hạn như OpenSSL::PKCS5. Ngoài ra người ta còn sữ dụng các dịch vụ bên thứ ba để tạo và quản lý key thay cho ứng dụng của mình, KMS (Key Management Service) của AWS là một ví dụ điển hình. Ở bài viết sau mình sẽ giới thiệu cụ thể hơn về AWS KMS.<br>


Cảm ơn mn đã đọc bài !!! :grinning: <br>

Tài liệu tham khảo:<br>
https://ruby-doc.org/stdlib-2.5.1/libdoc/openssl/rdoc/OpenSSL.html <br>
https://docs.ruby-lang.org/en/master/OpenSSL/Cipher.html