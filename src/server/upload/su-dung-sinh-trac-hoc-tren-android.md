Một trong những phương pháp bảo vệ thông tin nhạy cảm hoặc nội dung riêng tư trong ứng dụng của bạn là yêu cầu xác thực sinh trắc học, chẳng hạn như sử dụng nhận dạng khuôn mặt hoặc nhận dạng vân tay. Bài hướng dẫn này giải thích cách hỗ trợ luồng đăng nhập sinh trắc học trong ứng dụng của bạn.

## Khai báo các loại authentication mà app bạn hỗ trợ

Để xác định các loại authen mà ứng dụng của bạn hỗ trợ, hãy sử dụng interface [BiometricManager.Authenticators](https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators). Hệ thống cho phép bạn khai báo các loại xác thực sau:

* [BIOMETRIC_STRONG](https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators#BIOMETRIC_STRONG)

Xác thực bằng cách sử dụng phần cứng đáp ứng **mức độ mạnh** như được xác định trên [trang định nghĩa](https://source.android.com/compatibility/android-cdd#7_3_10_biometric_sensors) về khả năng tương thích.

* [BIOMETRIC_WEAK](https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators#BIOMETRIC_WEAK)

Xác thực bằng cách sử dụng phần cứng đáp ứng **mức độ yếu** như được xác định trên [trang định nghĩa](https://source.android.com/compatibility/android-cdd#7_3_10_biometric_sensors) về khả năng tương thích.

* [DEVICE_CREDENTIAL](https://developer.android.com/reference/androidx/biometric/BiometricManager.Authenticators#DEVICE_CREDENTIAL)

Xác thực bằng thông tin đăng nhập khóa màn hình - mã PIN, hình mở khóa hoặc mật khẩu của người dùng.

Để đăng ký trình xác thực, người dùng cần tạo mã PIN, hình mở khóa hoặc mật khẩu. Nếu người dùng chưa có, quy trình đăng ký sinh trắc học sẽ nhắc họ tạo những thứ này.

Để xác định các loại xác thực sinh trắc học mà ứng dụng của bạn sử dụng, hãy chuyển một loại xác thực hoặc kết hợp bitwise của các loại vào phương thức [setAllowedAuthenticators()](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.Builder#setallowedauthenticators). Đoạn code sau cho biết cách hỗ trợ xác thực bằng cách sử dụng phần tử phần cứng "mạnh" hoặc bằng chứng xác thực khóa màn hình.

```kotlin
// Allows user to authenticate using either a "strong" hardware element or
// their lock screen credential (PIN, pattern, or password).
promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        // Can't call setNegativeButtonText() and
        // setAllowedAuthenticators(... or DEVICE_CREDENTIAL) at the same time.
        // .setNegativeButtonText("Use account password")
        .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
        .build()
```

## Kiểm tra xem có thể xác thực sinh trắc học không

Sau khi bạn quyết định các yếu tố xác thực mà ứng dụng của bạn hỗ trợ, hãy kiểm tra xem các yếu tố này có sẵn không. Để làm như vậy, hãy chuyển cùng một kiểu kết hợp bitwise mà bạn [đã khai báo trước đó](https://developer.android.com/training/sign-in/biometric-auth#declare-supported-authentication-types) vào phương thức [canAuthenticate()](https://developer.android.com/reference/androidx/biometric/BiometricManager#canAuthenticate(int)). Nếu cần,  gọi intent action [ACTION_BIOMETRIC_ENROLL](https://developer.android.com/reference/android/provider/Settings#ACTION_BIOMETRIC_ENROLL). Trong intent extra, cung cấp tập hợp các trình xác thực mà ứng dụng của bạn chấp nhận. Mục đích này nhắc người dùng đăng ký thông tin xác thực cho trình xác thực mà ứng dụng của bạn chấp nhận.

```kotlin
val biometricManager = BiometricManager.from(this)
when (biometricManager.canAuthenticate(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)) {
    BiometricManager.BIOMETRIC_SUCCESS ->
        Log.d("MY_APP_TAG", "App can authenticate using biometrics.")
    BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE ->
        Log.e("MY_APP_TAG", "No biometric features available on this device.")
    BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE ->
        Log.e("MY_APP_TAG", "Biometric features are currently unavailable.")
    BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> {
        // Prompts the user to create credentials that your app accepts.
        val enrollIntent = Intent(Settings.ACTION_BIOMETRIC_ENROLL).apply {
            putExtra(Settings.EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED,
                BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
        }
        startActivityForResult(enrollIntent, REQUEST_CODE)
    }
}
```

## Xác định cách người dùng xác thực

Sau khi người dùng xác thực, bạn có thể kiểm tra xem người dùng đã xác thực bằng thông tin xác thực thiết bị hay thông tin xác thực sinh trắc học bằng cách gọi [getAuthenticationType()](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.AuthenticationResult#getAuthenticationType()).

## Hiển thị lời nhắc đăng nhập

Để hiển thị lời nhắc hệ thống yêu cầu người dùng xác thực bằng thông tin đăng nhập sinh trắc học, hãy sử dụng [Biometric librảy](https://developer.android.com/reference/androidx/biometric/package-summary). Dialog do hệ thống cung cấp này nhất quán trên các ứng dụng sử dụng nó, tạo ra trải nghiệm người dùng đáng tin cậy hơn.

![](https://images.viblo.asia/47325fe5-ce1a-4b8a-8f37-b6c729069c5c.png)

Các bước để thêm xác thực sinh trắc học vào ứng dụng của bạn bằng Biometric library:

1. Trong **app/build.gradle** file, thêm dependency Biometric library:

```kotlin
dependencies {
    implementation 'androidx.biometric:biometric:1.0.1'
}
```

2. Trong activity hoặc fragment sử dụng dialog biometric login, hiển thị dialog như sau:

```kotlin
private lateinit var executor: Executor
private lateinit var biometricPrompt: BiometricPrompt
private lateinit var promptInfo: BiometricPrompt.PromptInfo

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_login)
    executor = ContextCompat.getMainExecutor(this)
    biometricPrompt = BiometricPrompt(this, executor,
            object : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationError(errorCode: Int,
                errString: CharSequence) {
            super.onAuthenticationError(errorCode, errString)
            Toast.makeText(applicationContext,
                "Authentication error: $errString", Toast.LENGTH_SHORT)
                .show()
        }

        override fun onAuthenticationSucceeded(
                result: BiometricPrompt.AuthenticationResult) {
            super.onAuthenticationSucceeded(result)
            Toast.makeText(applicationContext,
                "Authentication succeeded!", Toast.LENGTH_SHORT)
                .show()
        }

        override fun onAuthenticationFailed() {
            super.onAuthenticationFailed()
            Toast.makeText(applicationContext, "Authentication failed",
                Toast.LENGTH_SHORT)
                .show()
        }
    })

    promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric login for my app")
            .setSubtitle("Log in using your biometric credential")
            .setNegativeButtonText("Use account password")
            .build()

    // Prompt appears when user clicks "Log in".
    // Consider integrating with the keystore to unlock cryptographic operations,
    // if needed by your app.
    val biometricLoginButton =
            findViewById<Button>(R.id.biometric_login)
    biometricLoginButton.setOnClickListener {
        biometricPrompt.authenticate(promptInfo)
    }
}
```

## Sử dụng giải pháp mật mã phụ thuộc vào xác thực

Để bảo vệ thêm thông tin nhạy cảm trong ứng dụng của mình, bạn có thể kết hợp mật mã vào quy trình xác thực sinh trắc học của mình bằng cách sử dụng phiên bản CryptoObject. Framework hỗ trợ các đối tượng mã hóa sau: [Signature](https://developer.android.com/reference/java/security/Signature), [Cipher](https://developer.android.com/reference/javax/crypto/Cipher) và [Mac](https://developer.android.com/reference/javax/crypto/Mac).

Sau khi người dùng xác thực thành công bằng lời nhắc sinh trắc học, ứng dụng của bạn có thể thực hiện thao tác mật mã. Ví dụ: nếu bạn xác thực bằng đối tượng **Cipher**, thì ứng dụng của bạn có thể thực hiện mã hóa và giải mã bằng đối tượng [SecretKey](https://developer.android.com/reference/javax/crypto/SecretKey).

Các phần sau đi qua các ví dụ về việc sử dụng đối tượng **Cipher** và đối tượng **SecretKey** để mã hóa dữ liệu. Mỗi ví dụ sử dụng các phương pháp sau:

```kotlin
private fun generateSecretKey(keyGenParameterSpec: KeyGenParameterSpec) {
    val keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
    keyGenerator.init(keyGenParameterSpec)
    keyGenerator.generateKey()
}

private fun getSecretKey(): SecretKey {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")

    // Before the keystore can be accessed, it must be loaded.
    keyStore.load(null)
    return keyStore.getKey(KEY_NAME, null) as SecretKey
}

private fun getCipher(): Cipher {
    return Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES + "/"
            + KeyProperties.BLOCK_MODE_CBC + "/"
            + KeyProperties.ENCRYPTION_PADDING_PKCS7)
}
```

## Xác thực chỉ bằng thông tin xác thực sinh trắc học

Nếu ứng dụng của bạn sử dụng secret key yêu cầu thông tin đăng nhập sinh trắc học để mở khóa, thì người dùng phải xác thực thông tin đăng nhập sinh trắc học của họ *mỗi lần* trước khi ứng dụng của bạn truy cập vào key.

Để mã hóa thông tin nhạy cảm chỉ sau khi người dùng xác thực bằng thông tin đăng nhập sinh trắc học, hãy hoàn thành các bước sau:

1. Generate key sử dụng cấu hình [KeyGenParameterSpec](https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec) sau:

```kotlin
generateSecretKey(KeyGenParameterSpec.Builder(
        KEY_NAME,
        KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .setUserAuthenticationRequired(true)
        // Invalidate the keys if the user has registered a new biometric
        // credential, such as a new fingerprint. Can call this method only
        // on Android 7.0 (API level 24) or higher. The variable
        // "invalidatedByBiometricEnrollment" is true by default.
        .setInvalidatedByBiometricEnrollment(true)
        .build())
```

2. Bắt đầu quy trình xác thực sinh trắc học kết hợp mật mã:

```kotlin
biometricLoginButton.setOnClickListener {
    // Exceptions are unhandled within this snippet.
    val cipher = getCipher()
    val secretKey = getSecretKey()
    cipher.init(Cipher.ENCRYPT_MODE, secretKey)
    biometricPrompt.authenticate(promptInfo,
            BiometricPrompt.CryptoObject(cipher))
}
```

3. Trong lệnh gọi lại xác thực sinh trắc học của bạn, hãy sử dụng secret key để mã hóa thông tin nhạy cảm:

```kotlin
override fun onAuthenticationSucceeded(
        result: BiometricPrompt.AuthenticationResult) {
    val encryptedInfo: ByteArray = result.cryptoObject.cipher?.doFinal(
            plaintext-string.toByteArray(Charset.defaultCharset())
    )
    Log.d("MY_APP_TAG", "Encrypted information: " +
            Arrays.toString(encryptedInfo))
}
```

## Xác thực bằng thông tin đăng nhập màn hình khóa hoặc sinh trắc học

Bạn có thể sử dụng secret key cho phép xác thực bằng thông tin xác thực sinh trắc học hoặc thông tin xác thực màn hình khóa (mã PIN, hình mở khóa hoặc mật khẩu). Khi định cấu hình key này, hãy chỉ định khoảng thời gian hiệu lực. Trong khoảng thời gian này, ứng dụng của bạn có thể thực hiện nhiều hoạt động mật mã mà người dùng không cần xác thực lại.

Để mã hóa thông tin nhạy cảm sau khi người dùng xác thực bằng thông tin đăng nhập trên màn hình khóa hoặc sinh trắc học, hãy hoàn thành các bước sau:

1. Generate key bằng cấu hình [KeyGenParameterSpec](https://developer.android.com/reference/android/security/keystore/KeyGenParameterSpec)

```kotlin
generateSecretKey(KeyGenParameterSpec.Builder(
    KEY_NAME,
    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
    .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
    .setUserAuthenticationRequired(true)
    .setUserAuthenticationParameters(VALIDITY_DURATION_SECONDS,
            ALLOWED_AUTHENTICATORS)
    .build())
```

2. Trong khoảng thời gian **VALIDITY_DURATION_SECONDS** sau khi người dùng xác thực, hãy mã hóa thông tin nhạy cảm:

```kotlin
private fun encryptSecretInformation() {
    // Exceptions are unhandled for getCipher() and getSecretKey().
    val cipher = getCipher()
    val secretKey = getSecretKey()
    try {
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        val encryptedInfo: ByteArray = cipher.doFinal(
                plaintext-string.toByteArray(Charset.defaultCharset()))
        Log.d("MY_APP_TAG", "Encrypted information: " +
                Arrays.toString(encryptedInfo))
    } catch (e: InvalidKeyException) {
        Log.e("MY_APP_TAG", "Key is invalid.")
    } catch (e: UserNotAuthenticatedException) {
        Log.d("MY_APP_TAG", "The key's validity timed out.")
        biometricPrompt.authenticate(promptInfo)
    }
```

## Xác thực bằng khóa xác thực mỗi lần sử dụng

Bạn có thể cung cấp hỗ trợ cho các khóa xác thực mỗi lần sử dụng trong phiên bản [BiometricPrompt](https://developer.android.com/reference/androidx/biometric/BiometricPrompt) của bạn. Khóa như vậy yêu cầu người dùng xuất trình thông tin xác thực sinh trắc học hoặc thông tin xác thực thiết bị mỗi khi ứng dụng của bạn cần truy cập vào dữ liệu được bảo vệ bởi khóa đó. Khóa xác thực mỗi lần sử dụng có thể hữu ích cho các giao dịch giá trị cao, chẳng hạn như thanh toán lớn hoặc cập nhật hồ sơ sức khỏe của một người.

Để liên kết đối tượng **BiometricPrompt** với khóa auth-per-use, hãy thêm code tương tự như sau:

```kotlin
val authPerOpKeyGenParameterSpec =
        KeyGenParameterSpec.Builder("myKeystoreAlias", key-purpose)
    // Accept either a biometric credential or a device credential.
    // To accept only one type of credential, include only that type as the
    // second argument.
    .setUserAuthenticationParameters(0 /* duration */,
            KeyProperties.AUTH_BIOMETRIC_STRONG or
            KeyProperties.AUTH_DEVICE_CREDENTIAL)
    .build()
```

## Xác thực mà không có hành động rõ ràng của người dùng

Theo mặc định, hệ thống yêu cầu người dùng thực hiện một hành động cụ thể, chẳng hạn như nhấn nút, sau khi thông tin xác thực sinh trắc học của họ được chấp nhận. Cấu hình này phù hợp hơn nếu ứng dụng của bạn đang hiển thị hộp thoại để xác nhận một hành động nhạy cảm hoặc rủi ro cao, chẳng hạn như mua hàng.

Tuy nhiên, nếu ứng dụng của bạn hiển thị hộp thoại xác thực sinh trắc học cho hành động có rủi ro thấp hơn, bạn có thể cung cấp gợi ý cho hệ thống rằng người dùng không cần xác nhận xác thực. Gợi ý này có thể cho phép người dùng xem nội dung trong ứng dụng của bạn nhanh hơn sau khi xác thực lại bằng phương thức thụ động, chẳng hạn như nhận dạng dựa trên khuôn mặt hoặc mống mắt. Để cung cấp gợi ý này, hãy truyền false vào phương thức [setConfirmationRequired()](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo.Builder#setConfirmationRequired(boolean)).

Hình ảnh cho thấy hai phiên bản của cùng một dialog. Một phiên bản yêu cầu hành động rõ ràng của người dùng và phiên bản khác thì không:

![](https://images.viblo.asia/c9b20578-da9d-4ffa-9412-f1b5f9bf611c.png) ![](https://images.viblo.asia/01734b32-90c3-40d3-9f54-00450c76dd0a.png)

Đoạn code sau cho biết cách trình bày một dialog không yêu cầu hành động rõ ràng của người dùng để hoàn tất quá trình xác thực:

```kotlin
// Allows user to authenticate without performing an action, such as pressing a
// button, after their biometric credential is accepted.
promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        .setNegativeButtonText("Use account password")
        .setConfirmationRequired(false)
        .build()
```

## Cho phép dự phòng thông tin xác thực không phải sinh trắc học

Nếu muốn ứng dụng của mình cho phép xác thực bằng thông tin xác thực sinh trắc học hoặc thiết bị, bạn có thể khai báo rằng [ứng dụng của mình hỗ trợ thông tin xác thực thiết bị](https://developer.android.com/training/sign-in/biometric-auth#declare-supported-authentication-types) bằng cách đưa **DEVICE_CREDENTIAL** vào tập hợp các giá trị mà bạn truyền vào [setAllowedAuthenticators()](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo.Builder#setAllowedAuthenticators(int)).

Nếu ứng dụng của bạn hiện đang sử dụng [createConfirmDeviceCredentialIntent()](https://developer.android.com/reference/android/app/KeyguardManager#createConfirmDeviceCredentialIntent(java.lang.CharSequence,%20java.lang.CharSequence)) hoặc [setDeviceCredentialAllowed()](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.PromptInfo.Builder#setDeviceCredentialAllowed(boolean)) để cung cấp khả năng này, hãy chuyển sang sử dụng **setAllowedAuthenticators()**.

Bài viết đến đây là hết. Cảm ơn các bạn đã đọc bài của mình :D