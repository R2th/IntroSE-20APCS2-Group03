# 1. Vấn đề
Nếu bạn là lập trình viên Android thì tôi dám đoán chắc là bạn đã từng ít nhất 1 lần sử dụng `SharedPreferences` để lưu những thôn tin tạm thời của ứng dụng ở dưới thiết bị.  Dẫu biết rằng dữ liệu `SharedPreferences` khi lưu dưới local sẽ được lưu tỏng thu mực riêng tư và chỉ ưng dụng của bạn truy cập được, nhưng khi người dùng Root máy hoặc 1 hacker nào đó nghịch ngợm thì mọi dư liệu lưu trong `SharedPreferences` sẽ bị lộ với người dùng hoặc hacker. Vì vậy việc mã hóa dữ liệu trước khi lưu xuống `SharedPreferences` là rất quan trọng. 


Nói về vấn đề mã hóa ở đây có thể bạn nghĩ ngay đến mã hóa với Base64 để biến 1 chuỗi String bình thường thành 1 chuỗi String rất chi là loằng ngoằng gây khó hiểu cho người đọc được, điều đó là tốt, không tồi nhưng mà nghe có vẻ đơn giản quá. Vậy chúng ta cần 1 cách mã hóa khác với 1 key mã hóa mà chỉ khi có key mã hóa đó thì mới có thể giải mã để được chuỗi ký tự ban đầu. 

Nghĩ đến đây bạn có thể đưa ra 1 ý kiến là lưu key mã hóa đó trong code và sử dụng mỗi lần cần giải mã hay là mã hóa dữ liệu. Nhưng như vậy đặt ra 1 vấn đề là nếu lưu key mã hóa trong code thì khi Encode file apk thì hacker cũng có thể lấy được key mã hóa đó, nên bạn cần lưu key mã hóa đó ở đâu mà chỉ mình ứng dụng của bạn khi khỏi chạy mới có thể đoc được, vậy nên bạn hãy nói chào mừng với [Android keystore](https://developer.android.com/training/articles/keystore.html)


# 2. Android keystore
Android KeyStore cho phép một ứng dụng lưu trữ các khóa mật mã có thể được trích xuất từ toàn bộ quá trình ứng dụng hoặc toàn bộ thiết bị Android. Nhưng chờ đã, tôi không muốn yêu cầu người dùng nhập một khóa để lưu dữ liệu và mã hóa cứng trong ứng dụng.  Android KeyStore cung cấp cho bạn có thể tạo các khóa mà không cần tương tác của người dùng.

Vì vậy, bây giờ chúng ta có một cách để tạo khóa và lưu trữ chúng một cách an toàn.

# 3. Generate keys
Việc tạo khóa khá đơn giản,  sử dụng KeyPairGeneratorSpec để `keys` thông qua `ALIAS`, ngày bắt đầu và ngày kết thúc

```Java

Calendar start = Calendar.getInstance();
    Calendar end = Calendar.getInstance();
    end.add(Calendar.YEAR, 25);
    
KeyPairGeneratorSpec spec =
        new KeyPairGeneratorSpec.Builder(context)
                .setAlias(ALIAS)
                .setSubject(new X500Principal("CN=" + ALIAS))
                .setSerialNumber(BigInteger.valueOf(1337))
                .setStartDate(start.getTime())
                .setEndDate(end.getTime())
                .build();
```

Nhưng từ API 23 thì phương thức [KeyPairGeneratorSpec](https://developer.android.com/reference/android/security/KeyPairGeneratorSpec) đã bị `deprecated` và thay vào đó là sử  dụng [KeyGenParameterSpec](https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec.html) tốt hơn.

```Java
KeyPairGeneratorSpec spec =
        new KeyGenParameterSpec.Builder(
                 ALIAS,
                 KeyProperties.PURPOSE_SIGN)
                 .setAlgorithmParameterSpec(new ECGenParameterSpec("secp256r1"))
                 .setDigests(KeyProperties.DIGEST_SHA256,
                         KeyProperties.DIGEST_SHA384,
                         KeyProperties.DIGEST_SHA512)
                 // Only permit the private key to be used if the user authenticated
                 // within the last five minutes.
                 .setUserAuthenticationRequired(true)
                 .setUserAuthenticationValidityDurationSeconds(5 * 60)
                 .build();
```

sau khi đã có `KeyPairGeneratorSpec` rồi thì bạn cần tạo `Key` và lưu nó vào `KeyStore` của hệ thống

```Java
KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(
         KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore");
keyPairGenerator.initialize(spec);
KeyPair keyPair = keyPairGenerator.generateKeyPair();

```

Như vậy là bạn đã tạo thành công 1 `KeyPair`, bạn có thể sử dụng ngay KeyPair ở đây để `Get` ra `PrivateKey` hay `PublicKey` hoặc bạn có thể sử dụng 

```Java
 KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
 keyStore.load(null);
 PrivateKey privateKey = (PrivateKey) keyStore.getKey("key1", null);
 PublicKey publicKey = keyStore.getCertificate("key1").getPublicKey();
 
```

để `Get` ra `PrivateKey` hay `PublicKey` ở mọi chỗ cần dùng trong hệ thống của bạn.

```Java
public void createKeys(Context context) {
    KeyPairGeneratorSpec spec;
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODE.M) {
            spec = new KeyPairGeneratorSpec.Builder(context).build();
    } else {
             spec = new KeyGenParameterSpec.Builder().build();
    }
    
    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", "AndroidKeyStore");
    keyPairGenerator.initialize(spec);
    KeyPair keyPair = keyPairGenerator.generateKeyPair();
}
```

Như vậy để tạo ra Key mã hóa tốt nhất thì bạn nên kiểm tra phiên bản Android đang chạy trên máy. Và việc tạo key mã hóa tới đây của chúng ta đã xong. Việc mã hóa dữ liệu sử dụng cặp Key `PrivateKey` và `PublicKey`  này khá nhiều, dưới đây mình sẽ giới thiệu với bạn 2 giải thuật mã hóa phổ biến nhất để giúp bạn hình dung ra các sử dụng cặp Key mà chúng ta vừa tạo ra như thế nào.



# 4. Encrypt and Decrypt data

`Encrypt` dữ liệu trước khi lưu xuống `SharedPreferences`
```Java
public String encrypt(String encryptData) throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        
        // Check exists key ALIAS
        if (!keyStore.containsAlias(ALIAS)) createKeys();
        
        KeyStore.PrivateKeyEntry privateKeyEntry =
            (KeyStore.PrivateKeyEntry) keyStore.getEntry(alias, null);
        PublicKey publicKey = privateKeyEntry.getCertificate().getPublicKey();
        
        Cipher inputCipher = Cipher.getInstance("RSA");
        inputCipher.init(Cipher.ENCRYPT_MODE, publicKey);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        CipherOutputStream cipherOutputStream = new CipherOutputStream(outputStream, inputCipher);
        cipherOutputStream.write(secret.getBytes());
        cipherOutputStream.close();

        return Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT);
    }
```


`Decrypt` dữ liệu được lấy từ `SharedPreferences` để sử dụng

```Java
public String decrypt(String encrypted) throws Exception {
        byte[] encryptedBytes = Base64.decode(encrypted, Base64.DEFAULT);
        KeyStore keyStore = KeyStore.getInstance(ANDROID_KEY_STORE);
        keyStore.load(null);
        
        // Check exists key ALIAS
        if (!keyStore.containsAlias(ALIAS)) createKeys();
        
        KeyStore.PrivateKeyEntry privateKeyEntry =
            (KeyStore.PrivateKeyEntry) keyStore.getEntry(alias, null);
        PrivateKey privateKey = privateKeyEntry.getPrivateKey();
        
        Cipher output = Cipher.getInstance("RSA");
        output.init(Cipher.DECRYPT_MODE, privateKey);
        CipherInputStream cipherInputStream = new CipherInputStream(
            new ByteArrayInputStream(encryptedBytes), output);
        ArrayList<Byte> values = new ArrayList<>();
        int nextByte;
        while ((nextByte = cipherInputStream.read()) != -1) {
            values.add((byte) nextByte);
        }

        byte[] bytes = new byte[values.size()];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = values.get(i);
        }
        return new String(bytes);
    }
```

Như vậy dữ liệu của bạn khi được lưu xuống `SharedPreferences` sẽ được mã hóa thành những chuỗi ký tự rất loằng ngoằng và rất khó giải mã nếu không có `KeyStore.PrivateKeyEntry` được lưu trong `KeyStore`, vậy là dữ liệu của bạn cũng đã được an toàn với 1 cơ số Hacker hạng xoàng rồi nhé :D.

# 5. Kết luận
Bài viết này mình đã giới thiệu với các  1 có chế để mã hóa và giải mã dữ liệu dựa vào Key được lưu trữ trong `KeyStore` của hệ thống. 

Qua bài viết mình cũng hi vọng các bạn hiểu thêm về tầm quan trọng của dữ liệu người dùng và cách mã hóa chúng trước khi lưu xuống `SharedPreferences` của hệ thống.