**Bài viết này là một phần trong loạt series "Bảo mật dữ liệu trong Android":**

[**1.Mã hóa trong Android (Phần 1)**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-2-ma-hoa-trong-android-YWOZrzdPZQ0)

[**2.Mã hóa trong Android (Phần 2)**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-ma-hoa-trong-android-phan-2-eW65GeV6ZDO)

[**3.Mã hóa dữ liệu lớn**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-ma-hoa-du-lieu-lon-4P856dgWZY3)

**4.Vector khởi tạo**

**5.Khóa không hợp lệ**

**6.Vân tay**

**7.Xác nhận thông tin thực**


Trong bài viết trước đây về [Mã hóa dữ liệu lớn](https://viblo.asia/p/bao-mat-du-lieu-trong-android-ma-hoa-du-lieu-lon-4P856dgWZY3), tôi đã giới thiệu về kích thước khóa mật mã, các providers mặc định của Java, cách tạo khóa đối xứng và các cách tiếp cận khác nhau để mã hóa dữ liệu lớn ở các cấp API khác nhau. Bài viết này sẽ cho bạn thấy **Vector khởi tạo** là gì, tại sao chúng ta cần nó và làm thế nào để sử dụng nó.

**Nội dung bài viết:**
* Initialization Vector
* Default Value
* Custom Value
* Empty Value
* Randomized Encryption
* Example
* What's Next
* Tips


## 1. Initialization Vector

Vector khởi tạo là một đầu vào có kích thước cố định cho một mã hóa nguyên thủy. Nó thường được yêu cầu là ngẫu nhiên hoặc giả ngẫu nhiên. Quan điểm của IV là chấp nhận sử dụng cùng một khóa để mã hóa một số tin nhắn riêng biệt. (The point of an IV is to tolerate the use of the same key to encrypt several distinct messages.)

Và nó được yêu cầu cho các thuật toán khối (như CBC trong AES) trong hầu hết các providers, bao gồm AndroidKeyStore provider cũng như BC provider.

Trên API 18, với key mặc đinh từ các BC provider của Java, nếu IV được chỉ định trong quá trình giải mã, sẽ dẫn tới **IllegalArgumentException**:

![](https://images.viblo.asia/b404f4aa-c2a4-4836-b122-8396bc6de557.png)

Trên API 23, với key từ AndroidKeyStore provider, **InvalidKeyException**  sẽ bị ném ra:
> InvalidKeyException: IV required when decrypting. Use IvParameterSpec or AlgorithmParameters to provide it.

## 2. Default Value

Cách dễ nhất để implement Vector khởi tạo, là sử dụng dữ liệu mảng byte được tạo bởi Cipher trong quá trình mã hóa. Nó có thể được truy xuất bằng phương thức **cipher.getIV()**:
```
cipher.init(Cipher.ENCRYPT_MODE, key)
val iv = cipher.iv // returns automatically generated IV value
...
// Encrypt data with Cipher
```

> Note, default value được tạo trong quá trình khởi tạo Cipher. Do đó, **cipher.init()** phải được gọi trước, nếu không, **cipher.getIv()** sẽ trả về dữ liệu trống.

Sau đó, trong quá trình giải mã, khởi tạo Cipher với **IvParameterSpec** được tạo từ giá trị **IV** được tạo:
```
val ivSpec = IvParameterSpec(iv)
cipher.init(Cipher.DECRYPT_MODE, key, ivSpec)
...
// Decrypt data using Cipher, initialized with IV
```

Giống như **Salt value**, Vector khởi tạo có thể được lưu trữ trong ở bất kỳ đâu, cùng với dữ liệu được mã hóa.
Và một trong những cách có thể để lưu trữ nó, là thêm **dữ liệu IV** vào kết quả mã hóa:
```
fun encrypt(data: String, key: Key?, useInitializationVector: Boolean = false): String {
    cipher.init(Cipher.ENCRYPT_MODE, key)

    var result = ""
    if (useInitializationVector) {
        val iv = cipher.iv
        val ivString = Base64.encodeToString(iv, Base64.DEFAULT)
        result = ivString + IV_SEPARATOR
    }
    val bytes = cipher.doFinal(data.toByteArray())
    result += Base64.encodeToString(bytes, Base64.DEFAULT)

    return result
}
```

Và phân tích nó trước khi giải mã, từ dữ liệu được mã hóa:
```
fun decrypt(data: String, key: Key?, useInitializationVector: Boolean = false): String {
    var encodedString: String

    if (useInitializationVector) {
        val split = data.split(IV_SEPARATOR.toRegex())
        if (split.size != 2) throw IllegalArgumentException("Passed data is incorrect. There was no IV specified with it.")

        val ivString = split[0]
        encodedString = split[1]
        val ivSpec = IvParameterSpec(Base64.decode(ivString, Base64.DEFAULT))
        cipher.init(Cipher.DECRYPT_MODE, key, ivSpec)
    } else {
        encodedString = data
        cipher.init(Cipher.DECRYPT_MODE, key)
    }

    val encryptedData = Base64.decode(encodedString, Base64.DEFAULT)
    val decodedData = cipher.doFinal(encryptedData)
    return String(decodedData)
}
```

[Source code demo ở đây.](https://github.com/temyco/security-workshop-sample/blob/master/app/src/stages/stage1/level3/java/co/temy/securitysample/encryption/CipherWrapper.kt)

## 3. Custom Value

Như tác giả Dorian Cussen đã đề cập trong [blog](https://doridori.github.io/#sthash.v2XCm19w.HqNqSUWP.dpbs) của mình, giá trị IV mặc định, được cung cấp bởi Cipher, chủ yếu phụ thuộc vào việc triển khai của Provider.
Có thể phải đối mặt với tình huống khi **cipher.getIV()** không được triển khai - trả về một mảng rỗng hoặc null.
Để an toàn và tránh rơi vào trường hợp như vậy - hãy tạo một Vector khởi tạo một cách tường minh, sử dụng **SecureRandom** class.
To create custom IV value, use nextBytes(byte[] key) method, from SecureRandom class :
Để tạo giá trị IV tùy chỉnh, sử dụng phương thức **nextBytes(byte[] key)**, từ **SecureRandom** class:
```
val iv = ByteArray(ivLength)
SecureRandom().nextBytes(iv)
```
Độ dài **ivLength** tùy thuộc vào từng thuật toán. Và đối với hầu hết thuật toán, bao gồm cả CBC, IV phải có cùng độ dài với khối trong đó.
> AES algorithm uses 128-bit blocks, so Initialization Vector’s length is equal to 128 bits (ivLength = 16// bytes).

Khi giá trị custom của IV, chỉ cần khởi tạo một Cipher với nó:
```
cipher.init(Cipher.ENCRYPT_MODE, key, IvParameterSpec(iv))
cipher.init(Cipher.DECRYPT_MODE, key, IvParameterSpec(iv))
```

Note, giá trị được tạo phải được chuyển vào phương thức **init()** cho cả mã hóa và giải mã.

## 4. Empty Value

Có thể, nhưng không được khuyến khích, để cheat trên Cipher. Thay vì tạo dữ liệu Vector Khởi tạo ngẫu nhiên mới mỗi lần trước khi mã hóa, sau đó lưu và phân tích cú pháp trước khi giải mã, IV có thể được khởi tạo một lần, dưới dạng một mảng, với độ dài cố định của các giá trị static và được sử dụng ở mọi nơi:
```
// Create an array of 16 bytes, filled with 0 [0, 0, 0, 0 ..0]
val iv = ByteArray(16)
// Use this array during encryption and decryption as IV data
cipher.init(Cipher.ENCRYPT_MODE, key, IvParameterSpec(iv))
cipher.init(Cipher.DECRYPT_MODE, key, IvParameterSpec(iv))
```

> Hãy nhớ rằng thực hiện việc này là đã đi sai bản chất của IV.
 
## 5. Randomized Encryption

Để bảo vệ dữ liệu người dùng khỏi việc sử dụng IV không chính xác (không ngẫu nhiên hoặc trống), theo mặc định, AndroidKeyStore provider không cho phép sử dụng các giá trị IV tùy chỉnh:
```
val iv = ByteArray(16)
cipher.init(Cipher.ENCRYPT_MODE, key, IvParameterSpec(iv))
// will throw InvalidAlgorithmParameterException: Caller-provided IV // not permitted
cipher.doFinal(data.toByteArray())
```

On API 23, the setRandomizedEncryptionRequired method was added to KeyGenParameterSpec class, that should allow you to control whether IV may be custom or not. From documentation:
Trên API 23, phương thức **setRandomizedEncryptionRequired** đã được thêm vào class **KeyGenParameterSpec**, cho phép bạn kiểm soát xem IV có thể tùy chỉnh hay không. Từ tài liệu:
```
Sets whether encryption using this key must be sufficiently randomized to produce different ciphertexts for the same plaintext every time.
…
When IND-CPA is required: in block modes which use an IV, such as GCM, CBC, and CTR, caller-provided IVs are rejected when encrypting, to ensure that only random IVs are used.
```

```
val builder = KeyGenParameterSpec.Builder()
// Forces to use only Default Generated, by Cipher, IV.
// Default value.
builder.setRandomizedEncryptionRequired(true)
// Enables to use Custom Generated IV's.
// Not working.
builder.setRandomizedEncryptionRequired(false)
```

Nhưng nó không hoạt động, (ít nhất là đối với AES và CBC). Ngay cả sau khi vô hiệu hóa  việc ngẫu nhiên, Cipher vẫn gặp sự cố với **InvalidAlgorithmParameterException** và tiếp tục yêu cầu Vector khởi tạo mặc định.

## 6. Example

Cùng mã hóa và giải mã tin nhắn bằng các khóa AES đối xứng với Vector khởi tạo:
```
val message = "Very large message, bigger then 250 symblos..."

// Simple Shared Preferences wrapper, will be used to save wrapped key
val storage = Storage(context)

// Creates Android Key Store and provides manage functions
val keyStoreWrapper = KeyStoreWrapper(context)

// Create and Save asymmetric key
keyStoreWrapper.createAndroidKeyStoreSymmetricKey("MASTER_KEY")
    
// Get key from keyStore
val masterKey = keyStoreWrapper.getAndroidKeyStoreSymmetricKey("MASTER_KEY")

// Creates Cipher with symmetric transformation and provides encrypt and decrypt functions
val cipher = CipherWrapper("AES/CBC/PKCS7Padding")
    
// Encrypt message with IV
val encryptedMessage = cipher.encrypt(message, masterKey, useInitializationVector = true)

// Decrypt message with IV
val decryptedMessage = cipher.decrypt(encryptedMessage, masterKey, useInitializationVector = true)
```

[Full source code ở đây.](https://github.com/TeamTechnologies/security-workshop-sample/blob/master/app/src/stages/stage1/level3/java/co/temy/securitysample/authentication/EncryptionServices.kt)

## 7. What's Next

Bài viết kế tiếp sẽ là về "Khóa không hợp lệ".

## 8. Tips

> Hãy cẩn thận khi ghi nhật ký trên thiết bị. Đặc biệt nếu các nhật ký này là tài nguyên được chia sẻ và có sẵn cho các ứng dụng khác, chẳng hạn như trên Android.

> Ngay cả khi dữ liệu nhật ký là tạm thời và sẽ bị xóa khi khởi động lại, việc ghi lại nhật ký thông tin người dùng là không phù hợp và có thể vô tình làm rò rỉ dữ liệu người dùng sang các ứng dụng khác.

> Ngoài việc không nên đăng nhập sử dụng thông tin cá nhân, các ứng dụng cũng nên hạn chế việc sử dụng nhật ký.

Linh bài viết gốc: https://proandroiddev.com/secure-data-in-android-initialization-vector-6ca1c659762c