Ở phần này thì mình sẽ demo về thuật toán mã hóa **Advanced Encryption Standard**
VD này sẽ sử dụng dựa trên ngôn ngữ Ruby. 
Ruby thì nó hỗ trợ cho chúng ta các thuật toán để việc viết code nhanh hơn

Chúng ta sẽ sử dụng module [Cipher](https://ruby-doc.org/stdlib-2.7.2/libdoc/openssl/rdoc/OpenSSL/Cipher.html) của thư viện 'openssl' được cung cấp mặc định trong ruby để phục vụ cho việc viết code của chúng ta


## Chúng ta sẽ tạo hàm để mã hóa dữ liệu
```
def encrypt password, salt, data
    key = key_generator(password, salt)

    cipher = OpenSSL::Cipher.new('AES-128-CBC')
    cipher.encrypt
    cipher.key = key
    iv = cipher.random_iv
    encrypted = cipher.update(data) + cipher.final

    return {iv: iv, data: encrypted}
  end
```
- Thuât toán mã hóa được sử dụng là AES-128-CBC. Ví dụ ở đây ta dùng thuật toán mã hóa đối xứng AES với chiều dài khóa 128 bit, dùng CBC mode.  Để biết các thuật toán được openssl cung cấp ta có thể dùng hàm OpenSSL::Cipher.ciphers
- key: khóa dùng để mã hóa/giải mã.
- iv: vector khởi tạo(initialization vector)

Trong đoạn code trên khóa giải mã và vector đều được tạo random, mã này phải được lưu ở đâu đấy sau này dùng để giải mã lại. Đề phòng trường hợp quên thì mình sinh ra khóa từ một chuỗi password, mỗi khi cần giải mã chỉ cần nhập chuỗi password này vào là có thể lấy lại được văn bản ban đầu truyền vào.

Chúng ta sẽ dùng module `PKCS5` để sinh khóa từ 1 password cho trước

```
def key_generator(password, salt, key_length = 16)
    iter = 20000
    key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(password, salt, iter, key_length)

    return key
  end
```
- password: password dùng để tạo khóa.
- salt: chuỗi salt được append vào password trước khi hash(dùng chống dictionary attack)
- iter giá trị càng lớn thời gian sinh key sẽ càng lâu(điều này sẽ chống brute force attack)
- key_length chiều dài khóa được sinh ra(128 bit), phải tương thích với thuật toán mã hóa(trong ví dụ trên là thuật AES 128 bit)

Sử dụng hàm trên đã có thể mã hóa được rồi, giờ ta sẽ tạo hàm dùng để giải mã
## Tạo hàm giải mã
```
def decrypt(password, salt, iv, encrypted_data)
  key = key_generator(password, salt)
  decipher = OpenSSL::Cipher::AES.new(128, :CBC)
  decipher.decrypt
  decipher.key = key
  decipher.iv = iv
  plain = decipher.update(encrypted_data) + decipher.final

  return plain
end
```

Hàm giải mã chúng ta truyền vào password, chuỗi salt và iv (vector) được tạo ra khi mã hóa dữ liệu, encrypted_data là chuỗi text đã được mã hóa
Khi giải mã ta cũng sẽ generator ra chuỗi key giống như khi mã hóa để sử dụng

Giờ ta sẽ chạy thử hàm mã hóa và giải mã trên

Trước hết sẽ chạy hàm mã hóa
```
salt = OpenSSL::Random.random_bytes(16)
password = "123456789"
data = "Xin chào, tôi là Sơn, chào mừng đến với Ruby"
encrypted_data = AesDemo.new.encrypt(password, salt, data)
puts "#{encrypted_data}\n"
```
- password là mk mình dùng để gen khóa
- data là chuỗi text mình cần mã hóa

Đây là thông tin chuỗi text sau khi được mã hóa
```
{:iv=>"\xEEs\xB4\xEA\x92xU+a0\xE7\x89\x13\x96\x8A\xF5", :data=>"\x0E8\xC2I\x0E\xD6\xD2g\xD2\xD4\x94\xD11J\xCE^'d\xDF\xA5\b\xAD\xAE\x17\xCD7\xBEO\n\xEDeJ\xA3K\\+\a\xFC\xC7\xCCp\xC3\xC7\x9A\x9A\xAF\xDF4'\xD2\x01\x8F\x15=\xC3\xD6\x8A\xDE\xCBJ\xC8\xD0\x80a"}
```

Giờ dùng password, chuỗi salt đã tạo ở phía trên và mã iv(vector) sau khi chạy hàm mã hóa để giải mã chuỗi text đó ngược lại
```
decrypted_data = AesDemo.new.decrypt(password, salt, encrypted_data[:iv], encrypted_data[:data])
puts decrypted_data
```
kết quả là 
```
Xin chào, tôi là Newbe, chào mừng đến với Ruby
```
Đúng là chuỗi text ban đầu của mình

Đây là code full của vd trên

```
require 'openssl'

class AesDemo
  def encrypt password, salt, data
    key = key_generator(password, salt)

    cipher = OpenSSL::Cipher.new('AES-128-CBC')
    cipher.encrypt
    cipher.key = key
    iv = cipher.random_iv
    encrypted = cipher.update(data) + cipher.final

    return {iv: iv, data: encrypted}
  end

  def decrypt(password, salt, iv, encrypted_data)
    key = key_generator(password, salt)

    decipher = OpenSSL::Cipher::AES.new(128, :CBC)
    decipher.decrypt
    decipher.key = key
    decipher.iv = iv
    plain = decipher.update(encrypted_data) + decipher.final

    return plain
  end

  def key_generator(password, salt, key_length = 16)
    iter = 20000
    key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(password, salt, iter, key_length)

    return key
  end
end

salt = OpenSSL::Random.random_bytes(16)
password = "123456789"
data = "Xin chào, tôi là Sơn, chào mừng đến với Ruby"
encrypted_data = AesDemo.new.encrypt(password, salt, data)
puts "#{encrypted_data}\n"

decrypted_data = AesDemo.new.decrypt(password, salt, encrypted_data[:iv], encrypted_data[:data])
puts decrypted_data
```

## Kết
Trên đây mình đã demo mã hóa và giải mã AES sử dụng thư viện `openssl` trong ruby. 
Ở bài sau mình sẽ demo vd về 1 loại thuật toán mã hóa khác