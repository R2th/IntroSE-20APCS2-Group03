# I. Mở đầu
- Hôm nay, chúng ta cùng nói về một chủ đề về cách chúng ta có thể tận dụng  khoá trong android vào lưu trữ mật khẩu hoặc bất kỳ dữ liệu nhạy cảm nào khác, trong đó ta đề cập đến việc mã hoá và giải mã dữ liệu
- Trong dữ liệu mã hoá, không nhất thiết chỉ dành cho mật khẩu, nó có thể dành cho bất kỳ dữ liệu nhạy cảm nào và nó sẽ gây khó khăn khó khăn hơn nhiều đối với những kẻ tấn công hoặc phần mềm độc hại cố gắng muốn truy cập những thông tin nhạy cảm trong ứng dụng của bạn 
-  Một ứng dụng chỉ có thể chỉnh sửa, lưu và lấy ra các khoá riêng của nó. Ứng dụng sẽ tạo hoặc nhận một cặp khoá công khai hoặc khoá riêng tư, sau đó sẽ được lưu trữ trong hệ thống Android KeyStore. Sau đó, những khoá này sẽ được dùng để mã hoá trong ứng dụng và giải mã các thông tin đã mã hoá khi cần
-  Trong bài viết này, tôi sẽ demo một ứng dụng nhỏ, mã hoá đoạn text và giải mã chúng
# II. Tạo khoá
- Trước khi có thể quá trình mã hoá, chúng ra càn đưa ra một bí danh mà chúng ta muốn mã hoá và giải mã dữ liệu. Đây có thể là một chuỗi, bí danh được tạo sẽ xuất hiện trong Android KeyStore
- Trong demo này tôi sử dụng thuật toán mã hoá RSA để mã hoá thông tin 
-  Tham khảo thêm: https://developer.android.com/training/articles/keystore#SupportedCiphers

```
private fun createKeyIfNecessary(alias: String) {
        try {
            // Create new key if needed
            if (!keyStore.containsAlias(alias)) {
                val start = Calendar.getInstance()
                val end = Calendar.getInstance()
                end.add(Calendar.YEAR, 1)
                val spec = KeyPairGeneratorSpec.Builder(context)
                        .setAlias(alias)
                        .setSubject(X500Principal("CN=Sample Name, O=Android Authority"))
                        .setSerialNumber(BigInteger.ONE)
                        .setStartDate(start.time)
                        .setEndDate(end.time)
                        .build()
                val generator = KeyPairGenerator.getInstance("RSA", "AndroidKeyStore")
                generator.initialize(spec)
                generator.generateKeyPair()
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
```

Trong phương thức trên, nó thực hiện việc tạo khoá nếu trong AndroidKeyStore chưa tồn tại khoá được truyền vào

# III. Mã hoá

```
private fun encryptString(alias: String, initialText: String): String? {
        return try {
            val privateKeyEntry = keyStore.getEntry(alias, null) as KeyStore.PrivateKeyEntry
            val publicKey = privateKeyEntry.certificate.publicKey

            if (initialText.isEmpty()) {
                return null
            }

            val inCipher = Cipher.getInstance("RSA/ECB/PKCS1Padding")
            inCipher.init(Cipher.ENCRYPT_MODE, publicKey)

            val bytes = inCipher.doFinal(initialText.toByteArray())
            Base64.encodeToString(bytes, Base64.DEFAULT)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
```

- Trong phương thức trên, khi mã hoá dữ liệu, bạn càn truyền vào khoá chỉ định cho dữ liệu bạn cần mã hoá
- Định nghĩa thuật toán mã hoá để mã hoá cho dữ liệu, như trên là : "RSA/ECB/PKCS1Padding"
- Mã hoá data sang byte và encode về string

# IV. Giải mã

```
private fun decryptString(alias: String, encryptedText: String?): String? {
        if (TextUtils.isEmpty(encryptedText)) {
            return null
        }
        return try {
            val privateKeyEntry = keyStore.getEntry(alias, null) as KeyStore.PrivateKeyEntry
            val privateKey = privateKeyEntry.privateKey

            val output = Cipher.getInstance("RSA/ECB/PKCS1Padding")
            output.init(Cipher.DECRYPT_MODE, privateKey)

            val encryptData = Base64.decode(encryptedText, Base64.DEFAULT)
            val decodeData = output.doFinal(encryptData)

            String(decodeData)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
```

Trước khi bắt đầu giải mã, bạn phải khởi tạo instance của KeyStore
```
   private val keyStore: KeyStore = KeyStore.getInstance("AndroidKeyStore")
   
   -------
   
   init {
       keyStore.load(null)
   }
```

- Trong phương trên giải mã, bạn cần phải truyền vào khoá của dữ liệu mà bạn muốn gỉai mã chúng và điều cần lưu ý là thuật toán giải mã phải trùng với thuật toán đã mã hoá dữ liệu đó.
-  mode: ` Cipher.DECRYPT_MODE `
- Để giải mã, dùng  
```
val decodeData = output.doFinal(encryptData)
```
- Để hiển thị text không mã hoá:
```
 String(decodeData)
```

# V. Tổng kết
Trên là các bước đơn giản nhất để bạn có thể mã hoá một số dữ liệu nhạy cảm của ứng dụng của bạn như: mật khẩu, token user,...
Cảm ơn các bạn đã theo dõi bài viết của mình!
Chúc các bạn thành công!
Bài viết được tham khảo:
- https://medium.com/@josiassena/using-the-android-keystore-system-to-store-sensitive-information-3a56175a454b
- https://developer.android.com/training/articles/keystore#SupportedCiphers