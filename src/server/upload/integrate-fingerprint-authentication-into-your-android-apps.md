# Introduction
Xác thực một chạm hiện vẫn là một công nghệ rất hữu ích với người dùng sử dụng smart phone. Trên Android, Fingerprint Authentication API đã được Google thêm vào Android 6.0 Marshmallow. Và điều này đã đơn giản hoá việc tích hợp bảo mật vân tay cho các ứng dụng chạy trên nền tản Android. Bạn có thể hoàn thành các tác vụ xác thực danh tính chỉ với một cái chạm nhẹ thay vì gõ password. 

Bài viết này sẽ giúp các bạn hiểu cách quét vân tay trên Android hoạt động và cách áp dụng sử dụng xác thực vân thay trong các ứng dụng Android.

Bạn có thể xem hộp thoại vân tay mẫu của Google trước khi bắt đầu.

https://github.com/googlesamples/android-FingerprintDialog

# Initial setup

* **Thêm permission vào file Manifest**
    ```
    <uses-permission android:name="android.permission.USE_FINGERPRINT"/>
    ```
    Vì quyền này được phân loại là [normal permission](https://developer.android.com/guide/topics/permissions/overview#normal-dangerous), không cần phải thêm nó dưới dạng runtime.


* **Tạo fingerprint UI**

    Android cung cấp cho bạn một thiết kế popup mặc định có thể được nhìn thấy bên dưới. Bạn có thể thiết kế lại màn hình của riêng mình. Chỉ cần tạo hộp thoại của bạn và sau đó gọi phương thức authenticate () để bắt đầu quét vân tay. Tôi sẽ giải thích cách thức hoạt động của phương thức này sau.
    
    ![](https://images.viblo.asia/27b389fc-b57f-49b5-b578-a27c45e48eff.png)
    
    
* **Khởi tạo KeyStore and generate key**

    Khóa bí mật phải được tạo trước khi quá trình xác thực. Khóa được tạo sẽ được lưu trữ an toàn trên thiết bị bằng cách sử dụng đối tượng ***KeyStore*** và được sử dụng để khởi tạo đối tượng ***cipher*** một chút sau đó. Đầu tiên, truy cập vào kho khóa.
    ```
    final KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
    keyStore.load(null);
    ```
    Tạo khóa bí mật sau khi lấy được đối tượng KeyGenerator. Các đối số bên dưới đang sử dụng để chỉ định loại khóa. KEY_STORE_ALIAS là vùng chứa cho khóa được lưu.
    ```
    final KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
    keyGenerator.init(new KeyGenParameterSpec.Builder(KEY_STORE_ALIAS, KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setUserAuthenticationRequired(true)
        .setEncryptionPaddings(
         KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .build());
    keyGenerator.generateKey();
    ```
    
* **Keyguard Manager**
    Lớp này cung cấp quyền truy cập vào màn hình khóa của bạn.
   ```
    KeyguardManager keyguardManager = (KeyguardManager).getSystemService(Context.KEYGUARD_SERVICE);
    keyguardManager.isKeyguardSecure();
    ```
    Trả về việc khóa bảo vệ có được bảo mật bằng mã PIN, hình mở khóa, mật khẩu hoặc thẻ SIM hiện đang bị khóa hay không.
    
* **Fingerprint Manager**
    [FingerprintManager](https://developer.android.com/reference/android/hardware/fingerprint/FingerprintManager) cung cấp các phương pháp liên quan đến vân tay. Hầu hết các phương pháp liên quan đến vân tay đều có thể được tìm thấy trong lớp này.
    ```
    FingerprintManager fingerprintManager = (FingerprintManager)
        .getSystemService(Context.FINGERPRINT_SERVICE);
    ```
    Sau khi nhận được đối tượng FingerprintManager, bạn sẽ có thể sử dụng một số phương thức của lớp này như isHardwareDetected (), hasEnrolledFingerprints () và xác thực (…).
    
    FingerprintManager.isHardwareDetected():
    
        Kiểm tra xem cảm biến vân tay có tồn tại hay không.
    
    FingerprintManager.hasEnrolledFingerprints(): 
    
        Kiểm tra xem có ít nhất một dấu vân tay được đăng ký trên thiết bị hay không.
    
    FingerprintManager.authenticate(FingerprintManager.CryptoObject crypto, 
        CancellationSignal cancel, int flags, 
            FingerprintManager.AuthenticationCallback callback, Handler handler): 
            
        Cố gắng xác thực đối tượng cypto. Phần cứng vân tay bắt đầu lắng nghe để quét sau cuộc gọi đó. Trước khi gọi phương thức này, các tham số thích hợp nên được chuẩn bị.
    
    **Parameter 1: CryptoObject**
    
    Trước khi tạo CryptoObject mới, bạn cần khởi tạo đối tượng Cipher như sau:
    >     try {
    >         final Cipher cipher = Cipher.getInstance(
    >                KeyProperties.KEY_ALGORITHM_AES + "/"
    >                 + KeyProperties.BLOCK_MODE_CBC + "/"
    >                 + KeyProperties.ENCRYPTION_PADDING_PKCS7);
    >         final SecretKey key;
    >         final KeyStore keyStore =  KeyStore.getInstance(ANDROID_KEY_STORE);
    >         keyStore.load(null);
    >         key = (SecretKey) keyStore.getKey(KEY_STORE_ALIAS, null);
    >         cipher.init(Cipher.ENCRYPT_MODE, key);
    >         return cipher;
    >     } catch (KeyPermanentlyInvalidatedException e) {
    >         return false;
    >     } catch (KeyStoreException | CertificateException | UnrecoverableKeyException | IOException
    >         | NoSuchAlgorithmException | InvalidKeyException | NoSuchPaddingException e) {
    >         throw new RuntimeException("Failed to init Cipher", e);
    >     }

    Việc khởi tạo đối tượng Cipher này sẽ được sử dụng để tạo ra cá thể CryptoObject. Trong khi khởi tạo mật mã, khóa được tạo và lưu trữ trong kho chứa keystore được sử dụng. Mật mã khởi tạo thành công có nghĩa là khóa đã lưu trước đó không bị vô hiệu và nó vẫn có sẵn để sử dụng.
    
    **Truyền CryptoObject làm đối số**
    >     if (initCipher()) {
    >     cancellationSignal = new CancellationSignal();
    >     fingerprintManager.authenticate(new FingerprintManager.CryptoObject(cipher), cancellationSignal,
    >         0,     // flags
    >         this,  // authentication callback 
    >         null); // handler
    >     }
    Sau khi đối tượng mật mã được khởi tạo, đối tượng mật mã được tạo ra bằng cách sử dụng cá thể mã hóa này. Đối tượng mật mã được tạo nên được chuyển thành tham số cho phương thức authenticate (). Phương thức đó có một số lời gọi lại hữu ích mà tôi sẽ nói sau.
    
    **Parameter 2: CancellationSignal**

    >     private void stopListeningAuthentication() {
    >         if (cancellationSignal != null) {
    >             cancellationSignal.cancel();
    >             cancellationSignal = null;
    >         }
    >         ...
    >     }
    >     

    CancellationSignal được sử dụng để hủy quá trình quét. Bằng cách gọi phương thức hủy và đặt đối tượng này thành null, bạn có thể ngừng quét vân tay bất cứ lúc nào. (lỗi đến hoặc người dùng nhấn nút hủy… vv)
    
    **Parameter 3: Flags**
    
    Nó đại diện cho cờ tùy chọn và có thể được đặt thành 0.
    
    **Parameter 4: Authentication Callback**
    
    Một đối tượng mở rộng từ FingerprintManager.AuthenticationCallback để nhận các kết quả xác thực.
    
    **Parameter 5: Handler**
    
    Đó là thông số tùy chọn. Nếu nó được thiết lập tùy chọn, FingerprintManager sẽ sử dụng lớp Looper từ trình xử lý này cho lớp MyHandler bên trong của nó.
    
    **Authentication Callbacks**
    
    Sau đây là một lớp trợ giúp mở rộng từ FingerprintManager.AuthenticationCallback được tạo, các callbacks sau được gọi tùy thuộc vào kết quả của phương thức xác thực (CryptoObject, CancellationSignal, int, AuthenticationCallback, Handler).
    
    ```
    /**
     * Called when an unrecoverable error has been encountered and the operation is complete.
     * No further callbacks will be made on this object.
     * @param errorCode An integer identifying the error message
     * @param errString A human-readable error string that can be shown in UI
     */
    public void onAuthenticationError(int errorCode, CharSequence errString) { }
    /**
     * Called when a recoverable error has been encountered during authentication. The help
     * string is provided to give the user guidance for what went wrong, such as
     * "Sensor dirty, please clean it."
     * @param helpCode An integer identifying the error message
     * @param helpString A human-readable string that can be shown in UI
     */
    public void onAuthenticationHelp(int helpCode, CharSequence helpString) { }
    /**
     * Called when a fingerprint is recognized.
     * @param result An object containing authentication-related data
     */
    public void onAuthenticationSucceeded(AuthenticationResult result) { }
    /**
     * Called when a fingerprint is valid but not recognized.
     */
    public void onAuthenticationFailed() { }

    ```
    
# Finally

Trên là một vài giải thích cơ bản cho việc áp dụng xác thực vân tay sử dụng Fingerprint Authentication API. Mong rằng bài viết hữu ích với những bạn đang muốn tìm hiểu về Fingerprint Authentication trên Android.

Bạn có thể tham khảo thêm ở [đây](https://developer.android.com/about/versions/marshmallow/android-6.0#fingerprint-authentication)