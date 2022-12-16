### Lý do cần mã hóa dữ liệu


-----


- Trong các bài toán thực tế, đối với ứng dụng liên quan đến thông tin, dữ liệu của user đòi hỏi các lập trình viên phải đảm bảo an toàn và tránh bị kẻ gian "Trộm" dữ liệu gây những ảnh hưởng đến user(dữ liệu ở đây có thể là thông tin tài khoản, thông tin ví điện tử, thông tin ngân hàng...). Từ đó đòi hỏi chúng ta cần phải thực hiện encrypt/decrypt dữ liệu sao cho an toàn nhất.
- Dữ liệu user có thể lưu trữ ở 2 vùng đó là: local(SharedPreferences, SQLite, File...), Internet(Server) và dĩ nhiên đối với bất kỳ vùng lưu trữ nào thì dữ liệu của chúng ta cũng đều cần được mã hóa để đảm bảo an toàn nhất.

Trong bài viết này mình sẽ hướng dẫn các bạn encrypt/decrypt dữ liệu trên phạm vi local, đối với phạm vi Internet(Server) mình sẽ hướng dẫn các bạn ở các bài viết tiếp theo nhé.
### Bắt đầu mã hóa dữ liệu(Đây là phần tạo key trên android chung để xử lý mã hóa đối với cả local và server)


-----


Để bắt đầu mã hóa chúng ta cần phải thực hiện generate 1 cặp key pair(bao gồm 1 public key và 1 private key)
- Public key là khóa công khai sử dụng cho việc giải mã, khóa này có thể chia sẻ cho các bên thứ 3 biết để thực hiện giải mã khi nhận được dữ liệu từ phía local
- Private key là khóa bí mật được dùng để mã hóa dữ liệu trước khi lưu trữ, khóa này chỉ 1 mình user biết và không được chia sẻ với các bên khác

Với việc generate key pair ta có thể sử dụng các giải thật ví dụ như: RSA, EC...
Ở bài viết này mình sẽ sử dụng giải thuật RSA
```
fun generateKeySet(context: Context, alias: String) {
    val keyPairGenerator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        keyPairGenerator.initialize(genKeyGenParameterSpec(alias))
    } else {
        keyPairGenerator.initialize(genKeyPairGeneratorSpec(context, alias))
    }
    keyPairGenerator.generateKeyPair()
    genECKeys(context, alias)
}
@RequiresApi(Build.VERSION_CODES.M)
fun genKeyGenParameterSpec(alias: String): KeyGenParameterSpec {
    return KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
            .setDigests(KeyProperties.DIGEST_SHA256)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_PKCS1)
            .setAlgorithmParameterSpec(RSAKeyGenParameterSpec(KEY_SIZE, RSAKeyGenParameterSpec.F4))
            .setUserAuthenticationRequired(false)
            .build()
} 
@RequiresApi(api = Build.VERSION_CODES.KITKAT)
fun genKeyPairGeneratorSpec(context: Context, alias: String): KeyPairGeneratorSpec {
    val start = Calendar.getInstance()
    val end = Calendar.getInstance()
    end.add(Calendar.YEAR, 1000)
    return KeyPairGeneratorSpec.Builder(context)
            .setAlias(alias)
            .setSubject(X500Principal("CN=Sample Name, O=Android Authority"))
            .setSerialNumber(BigInteger.ONE)
            .setAlgorithmParameterSpec(RSAKeyGenParameterSpec(KEY_SIZE, RSAKeyGenParameterSpec.F4))
            .setStartDate(start.time)
            .setEndDate(end.time)
            .build()
} 
```
đọan code trên là việc chúng ta đã tạo ra 1 cặp keypair để phục vụ cho việc mã hóa và giải mã của chúng ta sau này.

- các bạn để ý chúng ta có 1 tham số đó là "alias" đây chính là định danh của keys mà chúng ta vừa tạo trong android KeyStore. Sau khi keys đã được tạo chúng ta sẽ sử dụng chính "alias" này để truy cập đến public/private key để thực hiện encrypt/decrypt
- Để get public key bạn sẽ thực hiện như sau
```
fun getPublicKey(alias: String): PublicKey? {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")
    keyStore.load(null)
    if (!keyStore.containsAlias(alias)) {
        return null
    }
    val cert = keyStore.getCertificate(alias)
    return cert.publicKey
}
```
- Để get private key
```
fun getPrivateKey(alias: String): PrivateKey? {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")
    keyStore.load(null)
    if (!keyStore.containsAlias(alias)) {
        return null
    }
    val privateKeyEntry = keyStore.getEntry(alias, null) as KeyStore.PrivateKeyEntry
    return privateKeyEntry.privateKey
}
```
### Mã hóa dữ liệu ở local


-----


- Đối với việc mã hóa chúng ta sẽ làm như sau
```
fun getEncryptedString(alias: String, data: String): String? {
    val cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding")
    val publicKey = getPublicKey(alias)
    if (publicKey != null) {
        cipher.init(Cipher.ENCRYPT_MODE, publicKey)
        return Base64.encodeToString(cipher.doFinal(data.toByteArray()), Base64.DEFAULT)
    }
    return null
}
```
- Decrypt data
```
fun getDecryptedString(alias: String, data: String): String? {
    val cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding")
    val privateKey = getPrivateKey(alias)
    if (privateKey != null) {
        cipher.init(Cipher.DECRYPT_MODE, privateKey)
        return String(cipher.doFinal(Base64.decode(data, Base64.DEFAULT)))
    }
    return null
}
```
### Demo


-----


- Bước 1: tạo key pair
    
    `generateKeySet(context, "demo_key")`
- Bước 2: Mã hóa

    `val encrypt = getEncryptedString("demo_key", "Hello world")`
- Bước 3: Giải mã

    `val data = getDecryptedString("demo_key", encrypt)`

#### Kết quả data: "Hello world"

**Note**: Vì public/private key được lưu trữ trong android KeyStore nên việc truy cập chỉ được cho phép trên chính ứng dụng của bạn, các ứng dụng bên thứ 3 không thể truy cập được nên việc này rất là an toàn và đảm bảo rẳng chỉ có bạn mới có thể encrypt/decrypt đc
Bài tiếp theo mình sẽ hướng dẫn các bạn encrypt/decrypt với server