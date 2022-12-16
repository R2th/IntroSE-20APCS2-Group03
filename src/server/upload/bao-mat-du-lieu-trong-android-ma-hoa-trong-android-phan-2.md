**Bài viết này là một phần trong loạt series "Bảo mật dữ liệu trong Android":**

[**1.Mã hóa trong Android (Phần 1)**](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-2-ma-hoa-trong-android-YWOZrzdPZQ0)

**2.Mã hóa trong Android (Phần 2)**

**3.Mã hóa dữ liệu lớn**

**4.Vector khởi tạo**

**5.Khóa không hợp lệ**

**6.Vân tay**

**7.Xác nhận thông tin thực**


Trong bài viết trước đây về [Mã hóa trong Android (Phần 1)](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-2-ma-hoa-trong-android-YWOZrzdPZQ0), chúng ta đã nói về Kiến trúc mã hóa Java và hệ thống lưu trữ khóa Android. Bài viết này sẽ chỉ cho bạn cách làm việc với keyguard, cách tạo và quản lý khóa mật mã cũng như cách mã hóa và giải mã dữ liệu trong Android.

**Nội dung bài viết:**
* Lock Screen
* Choose a Key
* Key Storage
* Key Generation
* Key Management
* Encryption & Decryption
* Sample code
* What's Next
* Tips


## 1. Lock Screen

> If you want to secure your data — protect your device.

Để an toàn hơn, trước khi cung cấp quyền truy cập vào bất kỳ ứng dụng nào, chúng ta có thể yêu cầu người dùng thiết lập Màn hình khóa (nếu chưa được thiết lập). Ngoài ra, có một số tính năng khác mà chúng ta có thể xem xét sau loạt bài này, chẳng hạn như bảo mật vân tay, yêu cầu màn hình khóa phải được thiết lập.

Và có một system service đặc biệt có thể giúp chúng ta thực hiện nhiệm vụ này - **KeyguardManager**.

```
private val keyguardManager: KeyguardManager

init {
    keyguardManager = context.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
}

fun isDeviceSecure(): Boolean = if (hasMarshmallow()) keyguardManager.isDeviceSecure else keyguardManager.isKeyguardSecure

// Used to block application if no lock screen is setup.
fun showDeviceSecurityAlert(): AlertDialog {
    return AlertDialog.Builder(context)
            .setTitle(R.string.lock_title)
            .setMessage(R.string.lock_body)
            .setPositiveButton(R.string.lock_settings, { _, _ -> context.openLockScreenSettings() })
            .setNegativeButton(R.string.lock_exit, { _, _ -> System.exit(0) })
            .setCancelable(BuildConfig.DEBUG)
            .show()
}

fun hasMarshmallow() = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
```

- Phương thức isDeviceSecure: có sẵn từ API 23, giúp kiểm tra xem thiết bị đã được bảo mật bằng mã PIN, hoặc mật khẩu... hay chưa.
- Phương thức isKeyguardSecure: có sẵn từ API 16, kiểm tra xem thiết bị đã được bảo mật bằng mã PIN, hoặc mật khẩu hoặc thẻ SIM hiện đang bị khóa hay không. Nó không phải là lựa chọn tốt nhất để sử dụng, vì nó kiểm tra xem SIM có bị khóa hay không, nhưng dù sao vẫn tốt hơn là không có gì.

![](https://images.viblo.asia/afe4dd6f-92cc-4366-b5e9-2b83ea9d553d.png)https://images.viblo.asia/afe4dd6f-92cc-4366-b5e9-2b83ea9d553d.png

Bây giờ, trong onStart () của Activity, chúng ta chỉ cần kiểm tra xem thiết bị có được bảo mật bằng màn hình khóa hay không và nếu không, sẽ hiển thị cảnh báo bảo mật.

```
private var deviceSecurityAlert: AlertDialog? = null

override fun onStart() {
    super.onStart()
    if (!systemServices.isDeviceSecure()) {
        deviceSecurityAlert = systemServices.showDeviceSecurityAlert()
    }
}
```

## 2. Choose a Key

Khi thiết bị đã được bảo mật bằng khóa màn hình, chúng ta có thể tập trung vào bảo vệ dữ liệu nhạy cảm của ứng dụng, như mật khẩu và thông tin cá nhân của người dùng. Chúng ta đã biết rằng mã hóa sẽ được sử dụng cho việc này. Và trước tiên, những gì chúng ta cần làm là chọn khóa thích hợp (đối xứng, không đối xứng) và thuật toán để sử dụng cho việc mã hóa.

Ngoài ra, chúng ta biết rằng khóa đối xứng có sẵn từ API 23 và bất đối xứng từ API 18 (xem [Mã hóa trong Android (Phần 1)](https://viblo.asia/p/bao-mat-du-lieu-trong-android-phan-1-ma-hoa-trong-android-YWOZrzdPZQ0)). Sự lựa chọn của chúng ta là khóa bất đối xứng, nhưng nên chọn thuật toán nào?

![](https://images.viblo.asia/cb57e932-b8ad-4bca-a706-e7f5c4c11d29.png)

RSA - thuật toán duy nhất có sẵn cho khóa bất đối xứng trên Android với các thiết bị có API 18+.

## 3. Key Storage

Trên Android, các khóa mật mã được lưu trữ trong KeyStore:

```
private val keyStore: KeyStore = createAndroidKeyStore()

private fun createAndroidKeyStore(): KeyStore {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")
    keyStore.load(null)
    return keyStore
}
```

Phương thức **getInstance ("type")**, tạo ra một instance của KeyStore với type đã cho.
Ngoài ra, còn có một phương thức khác: **getInstance ("type", "provider")** trả về một đối tượng KeyStore có type từ provider được chỉ định.

```
val keyStore = KeyStore.getInstance ("AndroidKeyStore")
keyStore.provider.name // AndroidKeyStore
keyStore.type // AndroidKeyStore
```

Nhưng lưu ý rằng nếu có các type đăng ký trong nhiều provider khác nhau, có trùng tên thì phương thức **getInstance("type")** sẽ trả về cho bạn kết quả đầu tiên trong số chúng.
Phương thức **getInstance("type")** đã hoạt động rất tốt từ trước đến nay. Vì vậy tôi khuyên bạn nên sử dụng nó để lấy một instance KeyStore.
Nếu bạn vẫn còn một số nghi ngờ hoặc có điều gì đó không hoạt động như mong đợi, hãy sử dụng phương thức**getInstance ("type", "provider")**.
Sau khi tạo đc một instance, bạn phải gọi phương thức **load(loadStoreParameter)** để tải dữ liệu lưu trữ khóa dựa trên **ProtectionParameter** được cung cấp..

**ProtectionParameter** có thể được sử dụng để kiểm tra tính toàn vẹn của dữ liệu lưu trữ khóa hoặc để bảo vệ dữ liệu lưu trữ khóa nhạy cảm (như PrivateKey).

## 4. Key Generation

Trên Android, các khóa mật mã bất đối xứng được tạo bằng KeyPairGenerator:

```
fun createAndroidKeyStoreAsymmetricKey(alias: String): KeyPair {
    val generator = KeyPairGenerator.getInstance("RSA", "AndroidKeyStore")

    if (SystemServices.hasMarshmallow()) {
        initGeneratorWithKeyGenParameterSpec(generator, alias)
    } else {
        initGeneratorWithKeyPairGeneratorSpec(generator, alias)
    }
    
    // Generates Key with given spec and saves it to the KeyStore
    return generator.generateKeyPair()
}
```

Tương tự như KeyStore, phương thức **getInstance(“algorithm”, “provider”)** được sử dụng để tạo khóa.

Ngoài ra, còn có một phiên bản khác, đơn giản hóa, đó là **getInstance(“algorithm”)**. Không nên sử dụng phương thức này vì nó đang tìm kiếm thuật toán trong số tất cả các provider đã có và không giống như KeyStore, tên các thuật toán phổ biến trong các provider là giống nhau (ví dụ RSA có thể tồn tại ở hầu hết mọi nơi). Ở đây chúng ta cần xác định rõ ràng provider mà chúng ta muốn sử dụng.
Vì vậy KeyPairGenerator phải được khởi tạo với parameter rõ ràng. Trước Android M, lớp KeyPairGeneratorSpec nên được sử dụng như bên dưới:

```
private fun initGeneratorWithKeyPairGeneratorSpec(generator: KeyPairGenerator, alias: String) {
    val startDate = Calendar.getInstance()
    val endDate = Calendar.getInstance()
    endDate.add(Calendar.YEAR, 20)

    val builder = KeyPairGeneratorSpec.Builder(context)
          .setAlias(alias)
          .setSerialNumber(BigInteger.ONE)
          .setSubject(X500Principal("CN=${alias} CA Certificate"))
          .setStartDate(startDate.time)
          .setEndDate(endDate.time)

    generator.initialize(builder.build())
}
```

Trong KeyStore, mỗi khóa phải có một định danh - **alias**. Nếu bạn đang cố lưu khóa vào kho lưu trữ khóa, với b đã có, khóa sẽ bị ghi đè với giá trị mới. Sử dụng **setAlias()** để cung cấp định danh.
Các khóa bất đối xứng phải được ký với một chứng chỉ - **certificate**. Nó chủ yếu được sử dụng trong giao tiếp client-server, trong đó client (hoặc server) cần xác minh **certificate**, để chắc chắn rằng đó là máy chủ thực sự chứ không phải một kẻ mạo danh khác . Bạn sẽ không thể lưu khóa bất đối xứng nếu không có **certificate**.

Nếu cả PublicKey và PrivateKey đều mong muốn sử dụng trong một ứng dụng, thì bạn chỉ có thể tạo chứng chỉ giả, self signed, certificate.

Chứng chỉ yêu cầu thời hạn hiệu lực, có thể được set bằng setStartDate và setEndDate. Ngoài ra, bạn cần cung cấp số sê-ri và subject cho certificate , có thể set bằng cách sử dụng setSerialNumber và setSubject.

> Data:
  Version: 3 (0x2)
  Serial Number: 1 (0x1)
Signature Algorithm: sha256WithRSAEncryption
  Issuer: CN=MASTER_KEY CA Certificate
  Validity
    Not Before: Nov  7 12:59:12 2017 GMT
    Not After : Nov  7 12:59:12 2037 GMT
  Subject: CN=MASTER_KEY CA Certificate
  Subject Public Key Info:
    Public Key Algorithm: rsaEncryption
      Public-Key: (2048 bit)
      Modulus:
        00:b8:bf:51:10:fc:8c:7f:39:31:cc:be:43:43:81:
        f1:8b:5a:55:94:c4:5c:8c:56:51:5a:63:85:36:87:
        ff:3e:f2:a2:3b:9c:b0:e0:a8:3d:5e:1b:41:9c:00:
        6e:02:b2:42:d0:9c:e8:2f:4a:52:62:ac:7d:8e:75:
        a0:5e:58:57:ae:a5:2e:2c:48:0c:7f:cc:1a:95:46:
        2b:2b:a7:5e:96:69:d7:98:b8:32:92:7d:80:e9:19:
        07:da:52:1a:29:de:e1:fb:56:43:60:7f:28:ce:23:
        ca:ee:12:11:17:1d:0b:86:76:1a:f1:99:69:81:01:
        b0:d3:2c:6b:e7:ac:4f:f2:f7:97:88:ef:94:7a:28:
        a4:66:6e:d5:29:67:84:12:2e:d3:d3:d7:a6:f6:d4:
        ed:81:a4:24:9b:f2:2a:77:16:d9:0d:62:31:cd:cc:
        c4:f0:fc:be:8d:6a:b4:14:fc:26:6b:a0:06:79:95:
        40:68:0e:da:5e:25:69:f9:36:fb:eb:35:a5:e2:63:
        81:f0:88:c2:8e:be:fc:8d:65:ce:99:7f:88:cf:af:
        50:9a:59:77:dc:cd:76:a9:8c:64:de:e8:57:3b:40:
        bf:72:21:2c:60:3d:e0:7b:dd:1e:01:81:3a:24:81:
        d4:a9:e2:e8:af:80:f6:00:f6:7f:fd:9f:48:d2:f7:
        96:d1
      Exponent: 65537 (0x10001)
Signature Algorithm: sha256WithRSAEncryption
  1f:f6:40:99:1c:c1:62:19:89:1f:35:fb:18:7e:93:1e:99:8c:
  84:a4:cd:7b:93:c7:23:46:7c:9a:50:aa:a5:f2:34:07:82:ef:
  45:28:ac:50:6c:4e:a2:92:35:e4:75:97:12:47:ef:80:e4:6d:
  b2:61:e4:4b:7f:79:4c:7c:ee:87:a9:ad:23:a1:ec:e9:1a:2c:
  8e:0c:04:61:6c:4b:f3:6e:a6:ff:3e:bb:ad:45:5a:c5:0f:ae:
  4e:7c:d5:93:d0:98:69:0d:3e:bc:22:1f:85:11:db:0e:80:66:
  ff:58:4d:57:2f:64:cb:f8:c0:07:c9:91:f9:7a:a8:48:0e:f6:
  2a:08:d9:db:89:8c:5b:24:a7:ad:8a:08:f5:aa:3e:ac:99:31:
  15:9d:93:4f:d1:c5:7b:2d:41:f2:7e:99:5b:38:b8:1d:1a:63:
  d2:57:34:10:4b:06:95:39:41:df:22:38:8d:a9:4f:9b:05:86:
  46:09:02:51:fc:41:39:54:ca:dd:1d:8e:34:77:01:1b:87:51:
  22:9c:4b:e8:ae:d5:8d:d8:e6:e1:ba:18:41:94:ef:64:b6:63:
  d9:2e:06:ea:1e:ae:80:11:5f:71:b2:28:b0:cc:4e:18:5e:3f:
  4f:28:ae:4f:90:57:1e:41:51:36:02:94:ad:9b:7d:03:25:e7:
  f7:8a:4d:26
  
Sau khi tạo xong ket detaail, cần khởi tạo một instance của **KeyPairGenerator** với đặc tả bằng cách sử dụng method **initialize(specification)**.
Trong Android M, **KeyGenParameterSpec** đã được giới thiệu để thay thế **KeyPairGeneratorSpec**. Nó được sử dụng để khởi tạo các khóa bất đối xứng và đối xứng. 
 
 ```
 @TargetApi(Build.VERSION_CODES.M)
private fun initGeneratorWithKeyGenParameterSpec(generator: KeyPairGenerator, alias: String) {
    val builder = KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_ECB)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_PKCS1)
    generator.initialize(builder.build())
}
 ```
 
 **KeyGenParameterSpec** yêu cầu chỉ định mục đích sử dụng khóa. Chẳng hạn, các khóa được tạo bằng KeyProperIES.PURPOSE_ENCRYPT chỉ được sử dụng trong mã hóa, không thể được sử dụng để giải mã.
Ngoài ra, bạn phải chỉ định block mode và encryption padding (xem [Encryption, Modes & Paddings](https://proandroiddev.com/secure-data-in-android-encryption-7eda33e68f58)) mà bạn muốn sử dụng cho khóa này. Sử dụng các method setBlockModes và setEncodingPaddings để làm điều đó.
Không có nhu cầu xác định fake certificate, KeyGenParameterSpec sẽ tự động làm điều này. Bạn vẫn có thể tùy chỉnh các giá trị mặc định với:

```
.setCertificateNotBefore(startDate) // By default, this date is Jan 1 1970.
.setCertificateNotAfter(endDate) // By default, this date is Jan 1 2048.
.setCertificateSerialNumber(number) // By default, the serial number is 1.
.setCertificateSubject(x500Principal) // By default, the subject is CN=fake.
```

Cuối cùng, khi KeyPairGenerator được khởi tạo với các đặc tả, hãy sử dụng phương thức GenerKeyPair() để tạo cặp PrivateKey - PublicKey. Trong Android KeyStore, methid này sẽ tự động lưu khóa trong KeyStore.
 
## 5. Key Management

KeyStore cung cấp các phương thức, giúp chúng ta quản lý các khóa đã lưu:

```
fun getAndroidKeyStoreAsymmetricKeyPair(alias: String): KeyPair? {
       val privateKey = keyStore.getKey(alias, null) as PrivateKey?
       val publicKey = keyStore.getCertificate(alias)?.publicKey

   return if (privateKey != null && publicKey != null) {
       KeyPair(publicKey, privateKey)
   } else {
       null
   }
}

fun removeAndroidKeyStoreKey(alias: String) = keyStore.deleteEntry(alias)
```

- **getKey(“alias”, “password”)** - trả về một key có alias hoặc null nếu alias đã cho không tồn tại hoặc không xác định mục nhập liên quan đến khóa. Trong Android KeyStore, không nhất thiết phải yêu cầu mật khẩu.
- 
- **getCertificate(“alias”)**  - trả về Certificate hoặc null nếu alias đã cho không tồn tại hoặc không chứa Certificate.

- **deleteEntry(“alias”)** - xóa một khóa với alias đã cho, KeyStoreException có thể được ném ra.

## 6. Encryption & Decryption

Trên Android, mã hóa và giải mã được thực hiện với Cipher:

```
companion object {
    var TRANSFORMATION_ASYMMETRIC = "RSA/ECB/PKCS1Padding"
}

val cipher: Cipher = Cipher.getInstance(transformation)
```

Method **getInstance(“transformation”)**: cho phép transit giữa các Provider và nên được sử dụng để tạo một instance của Cipher.
Method getInstance(“transformation”, "provider"): cho phép transit sang đúng Provider mong muốn. Nhưng lưu ý, bạn không nên sử dụng nó với Cipher.

```
val transformation = "RSA/ECB/PKCS1Padding"
val provider = "AndroidKeyStore"
// API 19
val cipher: Cipher = Cipher.getInstance(transformation)
cipher.provider.name // AndroidOpenSSL
// API 23, 24
val cipher: Cipher = Cipher.getInstance(transformation)
cipher.provider.name // AndroidKeyStoreBCWorkaround
val cipher: Cipher = Cipher.getInstance(transformation, provider)
// throws java.security.NoSuchAlgorithmException: 
// Provider AndroidKeyStore does not provide RSA/ECB/PKCS1Padding
```

Như bạn có thể thấy, về mặt kỹ thuật, AndroidKeyStore provider không cung cấp thuật toán RSA cho Cipher. Thay vào đó, AndroidOpenSSL và AndroidKeyStoreBCWorkaround sử dụng các khóa của AndroidKeyStore provider cho thuật toán này.
Để bắt đầu làm việc với Cipher, chúng ta cần khởi tạo nó cho hoạt động cụ thể với khóa. Sử dụng method **init(mode, key)** với **Codes.ENCRYPT_MODE** để khởi tạo nó để mã hóa:

```
fun encrypt(data: String, key: Key?): String {
    cipher.init(Cipher.ENCRYPT_MODE, key)
    val bytes = cipher.doFinal(data.toByteArray())
    return Base64.encodeToString(bytes, Base64.DEFAULT)
}
```

Sử dụng method **init(mode, key)** với **Codes.DECRYPT_MODE** để giải mã:

```
fun decrypt(data: String, key: Key?): String {
    cipher.init(Cipher.DECRYPT_MODE, key)
    val encryptedData = Base64.decode(data, Base64.DEFAULT)
    val decodedData = cipher.doFinal(encryptedData)
    return String(decodedData)
}
```

Sau khi khởi tạo, sử dụng method doFinal(data) để xử lý dữ liệu được mã hóa hoặc giải mã với Cipher.
Bạn có thể khởi tạo lại một instance Cipher nhiều lần nếu cần.
Source code tham khảo tại đây.

## 7. Sample code

Bạn có thể tham khảo toàn bộ code demo [ở đây](https://github.com/temyco/security-workshop-sample/blob/master/app/src/stages/stage1/level1/java/co/temy/securitysample/authentication/EncryptionServices.kt).

## 8. What's Next

Bài viết tiếp theo sẽ về mã hóa dữ liệu lớn của người dùng (ví dụ như tin nhắn lơn hơn 250 ký tự).

## 9. Tips

> Nếu ứng dụng của bạn yêu cầu quyền truy cập vào dữ liệu nhạy cảm, hãy đánh giá xem bạn có cần truyền nó đến máy chủ hay không.

>Hạn chế truyền dữ liệu người dùng một cách tối đa.

> Đảm bảo rằng bạn không vô tình để lộ dữ liệu người dùng cho các ứng dụng khác trên thiết bị thông qua IPC, các tệp bên ngoài ứng dụng hoặc network sockets.


Linh bài viết gốc: https://proandroiddev.com/secure-data-in-android-encryption-in-android-part-2-991a89e55a23