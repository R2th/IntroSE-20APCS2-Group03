Trong bài viết trước về bảo mật dữ liệu người dùng trong hệ điều hành Android,mình đã giới thiệu cách  mã hóa các dữ liệu quan trọng  thông qua mật mã do người dùng cung cấp. Ở bài viết này, mình sẽ giới thiệu về phần xác thực thông tin và lưu trữ khóa.

   Thông thường, khi làm việc với dịch vụ của bên thứ ba, chúng ta sẽ được cung cấp một số hình thức xác thực thông tin. Đơn giản nhất đó là việc xác thực thông tin thông qua tài khoản và mật khẩu.

   Đầu tiên, có vẻ như một giải pháp đơn giản là xây dựng giao diện người dùng yêu cầu người dùng đăng nhập, sau đó xác thực và lưu trữ thông tin đăng nhập của người dùng. Tuy nhiên, đây không phải là cách tốt nhất vì ứng dụng có những ứng dụng không cần biết thông tin đăng nhập cho tài khoản bên thứ ba h. Thay vào đó, chúng ta có thể sử dụng Account Manager, nó sẽ chịu trách nhiệm xác thực người dùng cho chúng ta.
# Account Manager
   Acccount Manager là một trình xác thực tải khoản người dùng để ứng dụng của bạn không phải xử lý trực tiếp mật khẩu. Nó thường cung cấp một Tokenthay cho tên người dùng và mật khẩu thực có thể được sử dụng để thực hiện các yêu cầu được xác thực cho một dịch vụ. Một ví dụ là khi yêu cầu Token OAuth2 của google
Đôi khi, tất cả thông tin bắt buộc đã được lưu trữ trên thiết. Ngoài ra,  Account manager sẽ cần gọi máy chủ để nhận mã thông báo được làm mới. Bạn có thể đã thấy phần Tài khoản trong Cài đặt của thiết bị cho các ứng dụng khác nhau. Chúng ta có thể lấy được danh sách các tài khoản thông qua đoạn code sau:
```kotlin
AccountManager accountManager = AccountManager.get(this);
Account[] accounts = accountManager.getAccountsByType("com.google");
```
   Khi bạn có tài khoản, bạn có thể yêu cầu Token thông qua phương thức `getAuthToken(Account, String, Bundle, Activity, AccountManagerCallback, Handler)`. Token sau đó có thể được sử dụng để thực hiện các cuộc gọi API. Đây có thể là API RESTful khi bạn sử dụng Token trong các request AOI mà không cần phải biết chi tiết tài khoản của người dùng.
Vì mỗi dịch vụ sẽ có cách khác nhau để xác thực và lưu trữ thông tin đăng nhập cá nhân của người dùng, vì vậy Account manager cung cấp các mô-đun xác thực phù hợp với các dịch vụ của bên thứ ba. Mặc dù Android có triển khai cho nhiều dịch vụ phổ biến, nhưng bạn có thể viết trình xác thực của riêng mình để xử lý lưu trữ xác thực tài khoản và thông tin xác thực của ứng dụng. Điều này cho phép bạn đảm bảo thông tin đăng nhập được mã hóa. Hãy nhớ rằng, điều này cũng có nghĩa là thông tin đăng nhập trong trình quản lý tài khoản được sử dụng bởi các dịch vụ khác có thể được lưu trữ dưới dạng văn bản rõ ràng.
# The Keychain
   Được giới thiệu trong Android 4.0 (API cấp 14), API Keychain xử lý việc quản lý khóa. Cụ thể, nó hoạt động với các đối tượng PrivateKey và X509Certert và cung cấp vùng chứa an toàn hơn so với sử dụng lưu trữ dữ liệu của ứng dụng của bạn. Đó là vì khóa riêng chỉ có thể truy cập từ ứng dụng của người dùng và chỉ sau khi người dùng ủy quyền. Điều này có nghĩa là màn hình khóa phải được thiết lập trên thiết bị trước khi bạn có thể sử dụng bộ lưu trữ thông tin xác thực. Ngoài ra, các đối tượng trong móc khóa có thể bị ràng buộc với phần cứng an toàn, nếu có sẵn.

Mã để cài đặt chứng chỉ như sau:
   
```kotlin
        Intent intent = KeyChain.createInstallIntent();
        byte[] p12Bytes = //... read from file, such as example.pfx or example.p12...
        intent.putExtra(KeyChain.EXTRA_PKCS12, p12Bytes);
        startActivity(intent);
```

Người dùng sẽ được nhắc nhập mật khẩu để truy cập khóa riêng và tùy chọn đặt tên cho chứng chỉ. Để lấy lại khóa, đoạn mã sau trình bày một UI cho phép người dùng chọn từ danh sách các khóa được cài đặt.
   
```
KeyChain.choosePrivateKeyAlias(this, this, new String[]{"RSA"}, null, null, -1, null);
```

Khi lựa chọn được thực hiện, tên bí danh chuỗi được trả về trong hàm gọi lại bí danh (bí danh Chuỗi cuối cùng) nơi bạn có thể truy cập trực tiếp vào khóa riêng hoặc chuỗi chứng chỉ.
   
```kotlin
    public class KeychainTest extends Activity implements ..., KeyChainAliasCallback
    {
        //...

        @Override
        public void alias(final String alias)
        {
            Log.e("MyApp", "Alias is " + alias);

            try
            {
                PrivateKey privateKey = KeyChain.getPrivateKey(this, alias);
                X509Certificate[] certificateChain = KeyChain.getCertificateChain(this, alias);
            }
            catch ...
        }

        //...
    }
```

Bây giờ hãy xem cách chúng ta có thể sử dụng bộ lưu trữ thông tin xác thực để lưu dữ liệu nhạy cảm của người dùng.
# The KeyStore
Trong hướng dẫn trước, chúng ta đã bảo vệ dữ liệu thông qua mật mã do người dùng cung cấp. Kiểu thiết lập này tốt, nhưng yêu cầu ứng dụng thường tránh việc người dùng đăng nhập nhiều lần và ghi nhớ một mật mã bổ sung.
Đó là nơi API KeyStore có thể được sử dụng. Kể từ API 1, KeyStore đã được hệ thống sử dụng để lưu trữ thông tin xác thực WiFi và VPN. Kể từ 4.3 (API 18), nó cho phép bạn làm việc với các khóa bất đối xứng dành riêng cho ứng dụng cá nhân và  Android M (API 23), nó có thể lưu khóa đối xứng AES. Vì vậy, trong khi API không cho phép lưu trữ các chuỗi nhạy cảm trực tiếp, các khóa này có thể được lưu trữ và sau đó được sử dụng để mã hóa các chuỗi.
Lợi ích của việc lưu trữ khóa trong KeyStore là nó cho phép các khóa được vận hành mà không làm lộ nội dung bí mật của khóa đó, dữ liệu chính không vào không gian ứng dụng. Hãy nhớ rằng các khóa được bảo vệ bởi các quyền để chỉ ứng dụng của bạn có thể truy cập chúng và chúng còn có thể được bảo mật bằng phần cứng nếu thiết bị có khả năng. 
## Generate a New Random Key
Trong ví dụ này, thay vì tạo khóa AES từ mật mã do người dùng cung cấp, chúng ta có thể tự động tạo khóa ngẫu nhiên sẽ được bảo vệ trong KeyStore. Chúng ta có thể làm điều này bằng cách tạo một phiên bản `KeyGenerator`, được đặt thành nhà cung cấp "AndroidKeyStore`.
```kotlin
//Generate a key and store it in the KeyStore
final KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
final KeyGenParameterSpec keyGenParameterSpec = new KeyGenParameterSpec.Builder("MyKeyAlias",
        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
        //.setUserAuthenticationRequired(true) //requires lock screen, invalidated if lock screen is disabled
        //.setUserAuthenticationValidityDurationSeconds(120) //only available x seconds from password authentication. -1 requires finger print - every time
        .setRandomizedEncryptionRequired(true) //different ciphertext for same plaintext on each call
        .build();
keyGenerator.init(keyGenParameterSpec);
keyGenerator.generateKey();
```
## Encrypting Data
Bây giờ khóa được lưu trữ trong KeyStore, chúng ta có thể tạo một phương thức mã hóa dữ liệu bằng cách sử dụng đối tượng `Cipher` , được cung cấp `SecretKey`. Nó sẽ trả về `HashMap` chứa dữ liệu được mã hóa và IV ngẫu nhiên sẽ cần để giải mã dữ liệu. Dữ liệu được mã hóa, cùng với IV, sau đó có thể được lưu vào một tệp hoặc vào các tùy chọn chia sẻ.
```kotlin
private HashMap<String, byte[]> encrypt(final byte[] decryptedBytes)
{
    final HashMap<String, byte[]> map = new HashMap<String, byte[]>();
    try
    {
        //Get the key
        final KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        final KeyStore.SecretKeyEntry secretKeyEntry = (KeyStore.SecretKeyEntry)keyStore.getEntry("MyKeyAlias", null);
        final SecretKey secretKey = secretKeyEntry.getSecretKey();
 
        //Encrypt data
        final Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        final byte[] ivBytes = cipher.getIV();
        final byte[] encryptedBytes = cipher.doFinal(decryptedBytes);
        map.put("iv", ivBytes);
        map.put("encrypted", encryptedBytes);
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
 
    return map;
}
```
## Decrypting to a Byte Array
Để giải mã, điều ngược lại được áp dụng. Đối tượng `Cipher` được khởi tạo bằng hằng số `DECRYPT_MODE` và một mảng `byte []` được giải mã được trả về.
```kotlin
private byte[] decrypt(final HashMap<String, byte[]> map)
{
    byte[] decryptedBytes = null;
    try
    {
        //Get the key
        final KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        final KeyStore.SecretKeyEntry secretKeyEntry = (KeyStore.SecretKeyEntry)keyStore.getEntry("MyKeyAlias", null);
        final SecretKey secretKey = secretKeyEntry.getSecretKey();
 
        //Extract info from map
        final byte[] encryptedBytes = map.get("encrypted");
        final byte[] ivBytes = map.get("iv");
 
        //Decrypt data
        final Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        final GCMParameterSpec spec = new GCMParameterSpec(128, ivBytes);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, spec);
        decryptedBytes = cipher.doFinal(encryptedBytes);
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
 
    return decryptedBytes;
}
```
## Testing the Example
Chúng ta cùng test ví dụ này :
```kotlin
@TargetApi(Build.VERSION_CODES.M)
private void testEncryption()
{
    try
    {
        //Generate a key and store it in the KeyStore
        final KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        final KeyGenParameterSpec keyGenParameterSpec = new KeyGenParameterSpec.Builder("MyKeyAlias",
                KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                //.setUserAuthenticationRequired(true) //requires lock screen, invalidated if lock screen is disabled
                //.setUserAuthenticationValidityDurationSeconds(120) //only available x seconds from password authentication. -1 requires finger print - every time
                .setRandomizedEncryptionRequired(true) //different ciphertext for same plaintext on each call
                .build();
        keyGenerator.init(keyGenParameterSpec);
        keyGenerator.generateKey();
 
        //Test
        final HashMap<String, byte[]> map = encrypt("My very sensitive string!".getBytes("UTF-8"));
        final byte[] decryptedBytes = decrypt(map);
        final String decryptedString = new String(decryptedBytes, "UTF-8");
        Log.e("MyApp", "The decrypted string is " + decryptedString);
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
}
```
## Using RSA Asymmetric Keys for Older Devices
Đây là một giải pháp tốt để lưu trữ dữ liệu cho các phiên bản  android M trở lên, nhưng nếu ứng dụng của bạn hỗ trợ các phiên bản cũ hơn thì sao? Trong khi các khóa đối xứng AES không được hỗ trợ theo android M, các khóa bất đối xứng RSA là. Điều đó có nghĩa là chúng ta có thể sử dụng khóa RSA và mã hóa để thực hiện điều tương tự.

Sự khác biệt chính ở đây là một khóa không đối xứng chứa hai khóa,` Private key` và `Public key`, trong đó Public key mã hóa dữ liệu và private key giải mã nó. `KeyPairGeneratorSpec` được truyền vào KeyPairGenerator được khởi tạo với `KEY_ALGORITHM_RSA` và nhà cung cấp `AndroidKeyStore`.
```kotlin
private void testPreMEncryption()
{
    try
    {
        //Generate a keypair and store it in the KeyStore
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
 
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        end.add(Calendar.YEAR, 10);
        KeyPairGeneratorSpec spec = new KeyPairGeneratorSpec.Builder(this)
                .setAlias("MyKeyAlias")
                .setSubject(new X500Principal("CN=MyKeyName, O=Android Authority"))
                .setSerialNumber(new BigInteger(1024, new Random()))
                .setStartDate(start.getTime())
                .setEndDate(end.getTime())
                .setEncryptionRequired() //on API level 18, encrypted at rest, requires lock screen to be set up, changing lock screen removes key
                .build();
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");
        keyPairGenerator.initialize(spec);
        keyPairGenerator.generateKeyPair();
 
        //Encryption test
        final byte[] encryptedBytes = rsaEncrypt("My secret string!".getBytes("UTF-8"));
        final byte[] decryptedBytes = rsaDecrypt(encryptedBytes);
        final String decryptedString = new String(decryptedBytes, "UTF-8");
        Log.e("MyApp", "Decrypted string is " + decryptedString);
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
}
```

Để mã hóa, chúng ta cần lấy `RSAPublicKey` từ cặp khóa và sử dụng nó với đối tượng `Cipher`.
```kotlin
public byte[] rsaEncrypt(final byte[] decryptedBytes)
{
    byte[] encryptedBytes = null;
    try
    {
        final KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        final KeyStore.PrivateKeyEntry privateKeyEntry = (KeyStore.PrivateKeyEntry)keyStore.getEntry("MyKeyAlias", null);
        final RSAPublicKey publicKey = (RSAPublicKey)privateKeyEntry.getCertificate().getPublicKey();
 
        final Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding", "AndroidOpenSSL");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
 
        final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        final CipherOutputStream cipherOutputStream = new CipherOutputStream(outputStream, cipher);
        cipherOutputStream.write(decryptedBytes);
        cipherOutputStream.close();
 
        encryptedBytes = outputStream.toByteArray();
 
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
    return encryptedBytes;
}
```

Và giả mã bằng `RSAPrivateKey`.
```kotlin
public byte[] rsaDecrypt(final byte[] encryptedBytes)
{
    byte[] decryptedBytes = null;
    try
    {
        final KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        final KeyStore.PrivateKeyEntry privateKeyEntry = (KeyStore.PrivateKeyEntry)keyStore.getEntry("MyKeyAlias", null);
        final RSAPrivateKey privateKey = (RSAPrivateKey)privateKeyEntry.getPrivateKey();
 
        final Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding", "AndroidOpenSSL");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
 
        final CipherInputStream cipherInputStream = new CipherInputStream(new ByteArrayInputStream(encryptedBytes), cipher);
        final ArrayList<Byte> arrayList = new ArrayList<>();
        int nextByte;
        while ( (nextByte = cipherInputStream.read()) != -1 )
        {
            arrayList.add((byte)nextByte);
        }
 
        decryptedBytes = new byte[arrayList.size()];
        for(int i = 0; i < decryptedBytes.length; i++)
        {
            decryptedBytes[i] = arrayList.get(i);
        }
    }
    catch (Throwable e)
    {
        e.printStackTrace();
    }
 
    return decryptedBytes;
}
```
Một điều về RSA là mã hóa chậm hơn so với AES. Điều này thường tốt cho một lượng nhỏ thông tin, chẳng hạn như khi bạn bảo mật các chuỗi tùy chọn được chia sẻ. Tuy nhiên, nếu bạn thấy có vấn đề về hiệu suất khi mã hóa một lượng lớn dữ liệu, thay vào đó, bạn có thể sử dụng ví dụ này để mã hóa và lưu trữ chỉ một khóa AES. Sau đó, sử dụng mã hóa AES nhanh hơn đã được thảo luận trong hướng dẫn trước cho phần còn lại của dữ liệu của bạn. Bạn có thể tạo khóa AES mới và chuyển đổi nó thành mảng byte [] tương thích với ví dụ này.

```kotlin
KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
keyGenerator.init(256); //AES-256
SecretKey secretKey = keyGenerator.generateKey();
byte[] keyBytes = secretKey.getEncoded()
```
## Conclusion
Vậy là mình đã hoàn thành việc hướng dẫn mọi người cách làm việc với thông tin đăng nhập và khóa. Phần lớn sự nhầm lẫn xung quanh các khóa và lưu trữ có liên quan đến sự phát triển của HĐH Android, nhưng bạn có thể chọn giải pháp nào sẽ được sử dụng với mức API mà ứng dụng của bạn hỗ trợ.

## Tham khảo
https://code.tutsplus.com/tutorials/keys-credentials-and-storage-on-android--cms-30827