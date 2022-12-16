**Bài viết này là một phần trong loạt series "Bảo mật dữ liệu trong Android":**

[**1.Mã hóa trong Android (Phần 1)**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-2-ma-hoa-trong-android-YWOZrzdPZQ0)

[**2.Mã hóa trong Android (Phần 2)**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-ma-hoa-trong-android-phan-2-eW65GeV6ZDO)

**3.Mã hóa dữ liệu lớn**

**4.Vector khởi tạo**

**5.Khóa không hợp lệ**

**6.Vân tay**

**7.Xác nhận thông tin thực**


Trong bài viết trước đây về [Mã hóa trong Android (Phần 2)](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-2-ma-hoa-trong-android-YWOZrzdPZQ0), tôi đã giới thiệu cách lưu trữ, khởi tạo và quản lý các khóa bất đồng bộ, thử mã hóa và giải mã dữ liệu bằng các Android Key Store provider. Bài viết này sẽ chỉ cho bạn cách làm việc với các khóa đối xứng, cách sử dụng các provider khác mà Java đã cung cấp và các "key wrapping" là gì.

**Nội dung bài viết:**
* Key Size
* What to do
* Default providers
* Symmetric Keys
* Key Wrapping
* Sample code
* What's Next
* Tips


## 1. Key size

Ở những bài viết trước cùng ta đã thử mã hóa với các dữ liệu nhỏ, ví dụ như một message "Hello World". Bây giờ hãy thử mã hóa với dữ liệu lớn, lớn hơn 250 ký tự xem như thế nào. Rất tiếc, với những gì đã tìm hiểu ở 2 bài viết trước, nếu sử dụng trong trường hợp này, **IllegalBlockSizeException** sẽ được ném ra:

![](https://images.viblo.asia/14be8c79-8441-49e0-9380-d3129345d040.png)https://images.viblo.asia/14be8c79-8441-49e0-9380-d3129345d040.png

Lý do là RSA không được thiết kế để hoạt động với lượng dữ liệu lớn. Bạn chỉ có thể xử lý tin nhắn với độ dài giới hạn, tùy thuộc vào kích thước khóa. Như vậy là với khóa có kích thước lớn hơn thì tin nhắn lớn hơn sẽ có thể mã hóa được.

> Lưu ý rằng việc sử dụng khóa có kích thước lớn sẽ tăng thời gian mã hóa và có thể ảnh hưởng đến hiệu suất ứng dụng. Vì vậy phải tránh mã hóa dữ liệu lớn trên main thread.

Trong quá trình khởi tạo khóa, bạn có thể chỉ định kích thước khóa bằng cách gọi method **setKeySize():**
```
// On Marshmallow and higher (API 23+)
val builder = KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
builder.setKeySize(1024)

// On Kitkat and up to Marshmallow (API 19 - 22)
val builder = KeyPairGeneratorSpec.Builder(context)
builder.setKeySize(1024)
```

> Không thể tùy chỉnh được kích thước của khóa trên API 18 trở xuống, trong Android Key Store provider.

Kích thước khóa mặc định sẽ được sử dụng trong trường hợp bạn không set lại size của khóa. Giá trị mặc định có thể phụ thuộc vào provider và phiên bản nền tảng. Đối với khóa RSA, với Android Key Store provider, kích thước mặc định của khóa là 2048 bit.

Kích thước khóa RSA được hỗ trợ là: 512, 768, 1024, 2048, 3072, 4096. Có thể tìm hiểu thê về kích thước của khóa và các thuật toán hay được sử dụng [tại đây](https://developer.android.com/training/articles/keystore.html#SupportedKeyPairGenerators).

Có một phương thức liên hệ giữa kích thước của khóa RSA (n-bits với PKCS1 padding) và kích thước tối đa của tin nhắn có thể mã hóa được bằng khóa RSA đó:
> floor(n/8)-11 bytes

Đối với khóa RSA 1024 bits (128 bytes), bạn có thể sử dụng để mã hóa tin nhắn lên tới 117 bytes. Vì vậy, tin nhắn dài nhất chúng ta có thể nhận được bằng cách mã hóa sử dụng khóa RSA là 468 bytes (khi sử dụng khóa 4096 bits - kích thước tối đã của khóa RSA).

## 2. What to do

Có một tính huống khá tệ khi làm việc với các phiên bản API cấp thấp, đó là việc khóa bất đối xứng và đối xứng chỉ có trên API 23+. Với trường hợp này chúng ta chỉ có 1 trong 2 lựa chọn bên dưới:
* 1. Tạo khóa đối xứng với một trong các provider mặc định của Java. Mã hóa/giải mã tin nhắn với nó. Sau đó mã hóa dữ liệu thô này bằng khóa công khai RSA và lưu nó vào một nơi nào đó vào đĩa. Khi giải mã, hãy lấy dữ liệu khóa thô được mã hóa, giải mã nó bằng khóa riêng RSA và sử dụng nó để giải mã tin nhắn.
* 2.Tách riêng thông điệp lớn trên các bộ phận và mã hóa/giải mã từng bộ phận riêng lẻ.

Về tùy chọn thứ hai, bởi vì chúng ta đang sử dụng chế độ mã hóa ECB, nó có thể tự động thực hiện được việc này không? Câu trả lời là không. (Xem [Encryption, Modes & Paddings](https://proandroiddev.com/secure-data-in-android-encryption-7eda33e68f58)).
Thật không may, ngay cả với chế độ ECB (trong Android Key Store provider), thuật toán RSA chỉ có thể xử lý một khối dữ liệu và nếu khối dữ liệu đó dài hơn kích thước tối đa mà khóa RSA được sử dụng (như công thức tính ở phần trên) - nó sẽ bị crash.

Để khắc phục điều này, bạn có thể tự tách dữ liệu và làm việc với các bộ phận của nó (mô phỏng chế độ ECB). Nhưng một lần nữa, RSA không được thiết kế cho các nhiệm vụ như thế này.

Như vậy nó sẽ đảm bảo an toàn hơn với tùy chọn đầu tiên.
> Bạn có thể kiểm tra việc thực hiện tùy chọn thứ hai [tại đây](https://github.com/yakivmospan/scytale/blob/develop/library/src/main/java/com/yakivmospan/scytale/Crypto.java#L192).

## 3. Default Providers

Điều đầu tiên chúng ta sẽ làm là: tạo khóa đối xứng với một trong những provider mặc định mà Java cung cấp.
Provider mặc định mà Java cung cấp phổ biến nhất là "the cut version of BC provider" được tạo bởi một bên thứ ba - [Bouncy Castle.](https://bouncycastle.org/specifications.html.)

```
fun generateDefaultSymmetricKey(): SecretKey {
    val keyGenerator = KeyGenerator.getInstance("AES", "BC")
    return keyGenerator.generateKey()
}
```

Lớp KeyGenerator chịu trách nhiệm tạo khóa đối xứng. Sử dụng một trong các phương thức **getInstance()** của nó để tạo một instance của khóa AES.
Bạn có thể tìm tất cả các providers có sẵn bằng cách gọi phương thức **Security.getProviders()**:

```
Security.getProviders().forEach { logi(it.name) }
```

Lưu ý: các providers có sẵn có thể khác nhau giữa các nền tảng. Nếu provider mà bạn đang tìm kiếm, không tồn tại trên thiết bị, bạn có thể đăng ký một provider của riêng mình (hoặc một số bên thứ ba) bằng cách gọi một trong:

```
Security.addProvider(provider)
// With this you are able to control the most preferred provider for
// your application. See Encryption in Android (Part 2)
Security.insertProviderAt(provider, position)
```

Hoặc bạn có thể sử dụng **getInstance(algorithm)**, nó sẽ trả về cho bạn cách triển khai được ưu tiên nhất, dựa trên danh sách các providers của bạn

```
val keyGenerator = KeyGenerator.getInstance("AES")
// Providers List:
// 1. Android Key Store
// 2. Custom Provider
// 3. BC
// Will output BC, if Android Key Store and Custom Provider do not // have AES algorithm.
keyGenerator.provider.name
```

## 4. Symmetric Keys

Về cơ bản, chúng ta không có khóa đối xứng cho tới trước API 23. Nhưng bắt đầu từ Android M, chúng ta chỉ có thể sử dụng một khóa đối xứng từ Android Key Store provider.
```
@TargetApi(23)
fun createAndroidKeyStoreSymmetricKey(alias: String): SecretKey {
    val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
    val builder = KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
    keyGenerator.init(builder.build())
    return keyGenerator.generateKey()
}

fun getAndroidKeyStoreSymmetricKey(alias: String): SecretKey? = keyStore.getKey(alias, null) as SecretKey?
```

Toàn bộ sourcecode bạn có thể tham khảo [ở đây](https://github.com/temyco/security-workshop-sample/blob/master/app/src/stages/stage1/level2/java/co/temy/securitysample/encryption/KeyStoreWrapper.kt).
 
## 5. Key Wrapping

Để bảo vệ khóa AES của chúng ta và lưu nó một cách an toàn trên thiết bị, chúng ta sẽ sử dụng khóa RSA, được lưu trữ trong Android Key Store, để mã hóa và giải mã nó. Quá trình này còn được gọi là **key wrapping**.

```
fun wrapKey(keyToBeWrapped: Key, keyToWrapWith: Key?): String {
    cipher.init(Cipher.WRAP_MODE, keyToWrapWith)
    val decodedData = cipher.wrap(keyToBeWrapped)
    return Base64.encodeToString(decodedData, Base64.DEFAULT)
}
```

Ở đây, thuật toán tách rời WRAP_MODE và phương thức wrap() riêng biệt. Để giải mã, sử dụng phương thức UNWRAP_MODE và unwrap().
```

fun unWrapKey(wrappedKeyData: String, algorithm: String, wrappedKeyType: Int, keyToUnWrapWith: Key?): Key {
    val encryptedKeyData = Base64.decode(wrappedKeyData, Base64.DEFAULT)
    cipher.init(Cipher.UNWRAP_MODE, keyToUnWrapWith)
    return cipher.unwrap(encryptedKeyData, algorithm, wrappedKeyType)
}
```

Toàn bộ sourcecode [ở đây](https://github.com/temyco/security-workshop-sample/blob/master/app/src/stages/stage1/level2/java/co/temy/securitysample/encryption/CipherWrapper.kt).

## 6. Sample code

Hãy thử mã hóa và giải mã tin nhắn lớn theo một cách mới chúng ta vừa tìm hiểu:
```
val message = "Very large message, bigger then 250 symblos..."

// Simple Shared Preferences wrapper, will be used to save wrapped key
val storage = Storage(context)

// Creates Android Key Store and provides manage functions
val keyStoreWrapper = KeyStoreWrapper(context)
```

Chạy từ Android M trở lên, sử dụng một khóa đối xứng:
```
// Create and Save asymmetric key
keyStoreWrapper.createAndroidKeyStoreSymmetricKey("MASTER_KEY")
    
// Get key from keyStore
val masterKey = keyStoreWrapper.getAndroidKeyStoreSymmetricKey("MASTER_KEY")

// Creates Cipher with symmetric transformation and provides encrypt and decrypt functions
val cipher = CipherWrapper("AES/CBC/PKCS7Padding")
    
// Encrypt message  
val encryptedMessage = cipher.encrypt(message, masterKey)
  
// Decrypt message  
val decryptedMessage = cipher.decrypt(encryptedMessage, masterKey)

// Ooops, InvalidKeyException: no IV set when one expected
```

Trước Android M, chúng ta sử dụng một khóa bất đối xứng và một khóa đối xứng:
```
// Creates Cipher with asymmetric transformation and provides wrap and unwrap functions
val cipherForWrapping = CipherWrapper("RSA/ECB/PKCS1Padding")
    
// Creates Cipher with symmetric transformation and provides encrypt and decrypt functions
val cipherForEncryption = CipherWrapper("AES/CBC/PKCS7Padding")

// ---------------- Create Keys
    
// Create AES BC provider key  
val symmetricKey = keyStoreWrapper.generateDefaultSymmetricKey()
  
// Create RSA AndroidKeyStore Provider key and save it into keystore
val masterKey = keyStoreWrapper.createAndroidKeyStoreAsymmetricKey(MASTER_KEY)

// Wrap AES Secret key with RSA Public key 
val encryptedSymmetricKey = cipherForWrapping.wrapKey(symmetricKey, masterKey.public)
    
// And save it to Shared Preferences  
storage.saveEncryptionKey(encryptedSymmetricKey)
    
//----------------- Encrypt / Decrypt with keys
  
// Get RSA master key from Android Key Store
masterKey = keyStoreWrapper.getAndroidKeyStoreAsymmetricKeyPair("MASTER_KEY")

// Get AES wrapped raw data from preferences
val encryptionKey = storage.getEncryptionKey()

// Unwrap AES key data with RSA Private key
symmetricKey = cipherForWrapping.unWrapKey(encryptionKey, ALGORITHM_AES, Cipher.SECRET_KEY, masterKey?.private) as SecretKey
  
// Encrypt message with AES Secret key
val encryptedMessage = cipherForEncryption.encrypt(message, symmetricKey)
  
// Encrypt message with AES Secret key
val decryptedMessage = cipherForEncryption.decrypt(encryptedMessage, symmetricKey)

// Ooops, InvalidKeyException: no IV set when one expected
```

Toàn bộ sourcecode [ở đây](https://github.com/temyco/security-workshop-sample/blob/master/app/src/stages/stage1/level2/java/co/temy/securitysample/authentication/EncryptionServices.kt).

## 7. What's Next

Bài viết tiếp theo sẽ về "Vector khởi tạo".

> Initialization Vector is a fixed-size input to a cryptographic primitive. It is typically required to be random or pseudorandom. The point of an IV is to tolerate the use of the same key to encrypt several distinct messages.

## 8. Tips

> Nói chung, cách tiếp cận tốt nhất để bảo mật dữ liệu người dùng là giảm thiểu việc sử dụng API truy cập dữ liệu người dùng nhạy cảm.
> Xem xét nếu có một cách mà logic ứng dụng của bạn có thể được thực hiện bằng cách sử dụng dạng băm hoặc không thể dịch ngược của dữ liệu.

Linh bài viết gốc: https://proandroiddev.com/secure-data-in-android-encrypting-large-data-dda256a55b36