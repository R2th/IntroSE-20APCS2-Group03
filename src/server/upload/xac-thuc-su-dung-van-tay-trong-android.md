![](https://images.viblo.asia/b33338e7-8e6e-4ecb-9257-9d659b0f4c62.png)

Đã qua rồi những ngày bạn phải nhập thủ công tên người dùng và mật khẩu để đăng nhập vào một số ứng dụng Android. Bạn không những phải nhập một cách thủ công mà nó còn là một quá trình rất tốn thời gian và mang lại trải nghiệm không tốt cho người dùng. Ngoài ra, nếu bạn quên mật khẩu hoặc tên người dùng thì bạn sẽ phải khôi phục nó. Nhưng nếu chúng ta có thể sử dụng **Fingerprint** (Dấu vân tay) để xác thực thì sẽ không cần phải nhớ tên người dùng hay mật khẩu nữa. Ngoài ra, không ai có thể có cùng một dấu vân tay, vì vậy, chúng ta không cần phải lo lắng về tính xác thực.

### Tổng quan chung

Với sự ra đời của **Android 6.0 (Android M)**, đã có một số lượng thay đổi đáng kể đối với các API, một trong số đó là **Xác thực vân tay**. Giờ đây, chúng ta có thể dễ dàng triển khai Xác thực vân tay trong ứng dụng của mình trên các thiết bị có cảm biến vân tay. Toàn bộ quá trình Xác thực vân tay có thể được tóm tắt thành các bước dưới đây:

1. Yêu cầu cấp phép Xác thực vân tay trong **Manifest**.
2. Vì dấu vân tay chỉ có thể được áp dụng trên các thiết bị có màn hình khóa được bảo vệ bằng mã PIN, pattern hoặc mật khẩu. Vì vậy, chúng ta phải kiểm tra xem màn hình khóa của thiết bị có được bảo vệ bằng mã PIN, pattern hoặc mật khẩu hay không.
3. Sau đó, tạo một thể hiện của lớp **FingerprintManager**.
4. Bạn phải có quyền truy cập vào khu vực lưu trữ được sử dụng để lưu trữ các khóa mã hóa trên thiết bị Android. Vì vậy, ta cần tạo một thể hiện của Keystore để có quyền truy cập vào **Keystore container** của Android. Sau đó, tạo một khóa mã hóa với lớp **KeyGenerator** và lưu trữ nó trong Keystore container.
5. Với sự trợ giúp của khóa được tạo và lưu trữ trong  Keystore container, hãy khởi tạo thể hiện của lớp **Cipher** và sử dụng thể hiện này để tạo **CryptoObject** và gán nó cho **FringerprintManager** mà bạn đã tạo trước đó.
6. Gọi phương thức xác thực của lớp **FingerprintManger** và thực hiện các phương thức để xử lý các callback.

### Triển khai

Đầu tiên, hãy tạo một dự án mới trong Android Studio và đặt tên theo dự án của bạn. Ngoài ra, hãy đặt API tối thiểu thành **23**, tức là **Android 6.0**.

Sau khi tạo dự án, vui lòng đảm bảo rằng thiết bị của bạn có một số loại xác thực khác ngoài dấu vân tay vì Xác thực vân tay sẽ chỉ hoạt động trong trường hợp đó.

Thêm quyền sử dụng dấu vân tay trong tệp **AndroidManifest.xml** của bạn:
```java
<uses-permission android:name="android.permission.USE_FINGERPRINT"/>
```

Tiếp đến là code giao diện cho ứng dụng, code cho tệp **activity_main.xml**:
```java
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <ImageView
            android:layout_width="160dp"
            android:layout_height="160dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            android:layout_marginStart="8dp"
            app:layout_constraintBottom_toBottomOf="parent"
            android:layout_marginTop="8dp"
            app:layout_constraintTop_toTopOf="parent"
            android:layout_marginBottom="8dp"
            android:src="@drawable/ic_fingerprint"
            android:layout_marginEnd="8dp"
            android:id="@+id/fingerprint_iv"/>

    <TextView
            android:id="@+id/fingerprint_tv"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            android:layout_marginTop="32dp"
            app:layout_constraintTop_toBottomOf="@+id/fingerprint_iv"
            android:layout_marginEnd="8dp"
            android:text="Touch the Fingerpeint Sensor"
            android:textSize="24sp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Xác thực vân tay sử dụng **KeyguardManager** và **FingerprintManager**. Vì vậy, trong hàm `onCreate()`, bạn cần khởi tạo hai dịch vụ này:
```java
class MainActivity : AppCompatActivity() {

    private lateinit var fingerprintManager: FingerprintManager
    private lateinit var keyguardManager: KeyguardManager

    override fun onCreate(savedInstanceState: Bundle) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (checkLockScreen()) {
            //some other task
        }
    }
    private fun checkLockScreen(): Boolean {
        keyguardManager = getSystemService(Context.KEYGUARD_SERVICE)
               as KeyguardManager
        fingerprintManager = getSystemService(Context.FINGERPRINT_SERVICE)
                as FingerprintManager
        //some other task
    }
}
```

Nhiệm vụ tiếp theo của chúng ta là kiểm tra xem thiết bị có đang được bảo vệ bằng mã PIN hay mật khẩu không. Ngoài ra, nếu nó được bảo vệ bằng mật khẩu thì chúng ta phải kiểm tra xem đã có dấu vân tay được liên kết với thiết bị hay chưa. Vì vậy, chúng tôi sẽ thực hiện các kiểm tra này trong phương thức **checkLockScreen()**:
```java
private fun checkLockScreen(): Boolean {
    keyguardManager = getSystemService(Context.KEYGUARD_SERVICE)
            as KeyguardManager
    fingerprintManager = getSystemService(Context.FINGERPRINT_SERVICE)
            as FingerprintManager
    if (keyguardManager.isKeyguardSecure == false) {

        Toast.makeText(this,
            "Lock screen security not enabled",
            Toast.LENGTH_LONG).show()
        return false
    }

    if (ActivityCompat.checkSelfPermission(this,
            Manifest.permission.USE_FINGERPRINT) !=
        PackageManager.PERMISSION_GRANTED) {
        Toast.makeText(this,
            "Permission not enabled (Fingerprint)",
            Toast.LENGTH_LONG).show()

        return false
    }

    if (fingerprintManager.hasEnrolledFingerprints() == false) {
        Toast.makeText(this,
            "No fingerprint registered, please register",
            Toast.LENGTH_LONG).show()
        return false
    }
    return true
}
```

Bây giờ, chúng ta phải tạo một khóa mã hóa sẽ được lưu trữ trong Keystore System của Android. Vì vậy, chúng ta phải có được quyền truy cập của Keystore và sau đó tạo khóa mã hóa với sự trợ giúp của phương thức **generateKey()**:
```java
class MainActivity : AppCompatActivity() {

    ...

    private lateinit var keyStore: KeyStore
    private lateinit var keyGenerator: KeyGenerator
    private val KEY_NAME = "my_key"

    ...

    override fun onCreate(savedInstanceState: Bundle) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (checkLockScreen()) {
            generateKey()
            //some code
        }
    }
    private fun checkLockScreen(): Boolean {
        //some code
    }
    private fun generateKey() {
        try {
            keyStore = KeyStore.getInstance("AndroidKeyStore")
        } catch (e: Exception) {
            e.printStackTrace()
        }

        try {
            keyGenerator = KeyGenerator.getInstance(
                KeyProperties.KEY_ALGORITHM_AES,
                "AndroidKeyStore")
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException(
                "Failed to get KeyGenerator instance", e)
        } catch (e: NoSuchProviderException) {
            throw RuntimeException("Failed to get KeyGenerator instance", e)
        }

        try {
            keyStore.load(null)
            keyGenerator.init(
                KeyGenParameterSpec.Builder(KEY_NAME,
                    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                    .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
                    .setUserAuthenticationRequired(true)
                    .setEncryptionPaddings(
                        KeyProperties.ENCRYPTION_PADDING_PKCS7)
                    .build())
            keyGenerator.generateKey()
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException(e)
        } catch (e: InvalidAlgorithmParameterException) {
            throw RuntimeException(e)
        } catch (e: CertificateException) {
            throw RuntimeException(e)
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
    }
}
```

Như vậy, chúng ta đã tạo được key. Nhiệm vụ tiếp theo là khởi tạo mật mã sẽ được sử dụng cho `CryptoObject`. `CryptoObject` này sẽ được sử dụng trong quá trình xác thực dấu vân tay. Vì vậy, hãy tạo một phương thức gọi là **initCipher()** trong tệp MainActivity.kt:
```java
class MainActivity : AppCompatActivity() {

    ...
    
    private lateinit var cipher: Cipher
    private lateinit var cryptoObject: FingerprintManager.CryptoObject

    override fun onCreate(savedInstanceState: Bundle) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (checkLockScreen()) {
            generateKey()
            if (initCipher()) {
                cipher.let {
                    cryptoObject = FingerprintManager.CryptoObject(it)
                }
            }
        }
    }
    private fun checkLockScreen(): Boolean {
        //some code
    }
    private fun generateKey() {
        //some code
    }

    private fun initCipher(): Boolean {
        try {
            cipher = Cipher.getInstance(
                KeyProperties.KEY_ALGORITHM_AES + "/"
                        + KeyProperties.BLOCK_MODE_CBC + "/"
                        + KeyProperties.ENCRYPTION_PADDING_PKCS7)
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException("Failed to get Cipher", e)
        } catch (e: NoSuchPaddingException) {
            throw RuntimeException("Failed to get Cipher", e)
        }

        try {
            keyStore.load(null)
            val key = keyStore.getKey(KEY_NAME, null) as SecretKey
            cipher.init(Cipher.ENCRYPT_MODE, key)
            return true
        } catch (e: KeyPermanentlyInvalidatedException) {
            return false
        } catch (e: KeyStoreException) {
            throw RuntimeException("Failed to init Cipher", e)
        } catch (e: CertificateException) {
            throw RuntimeException("Failed to init Cipher", e)
        } catch (e: UnrecoverableKeyException) {
            throw RuntimeException("Failed to init Cipher", e)
        } catch (e: IOException) {
            throw RuntimeException("Failed to init Cipher", e)
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException("Failed to init Cipher", e)
        } catch (e: InvalidKeyException) {
            throw RuntimeException("Failed to init Cipher", e)
        }
    }
}
```

Tiếp đến là lớp **FingerprintHelper**:
```java
@SuppressLint("ByteOrderMark")
class FingerprintHelper(private val appContext: Context) : FingerprintManager.AuthenticationCallback() {

    lateinit var cancellationSignal: CancellationSignal

    fun startAuth(manager: FingerprintManager,
                   cryptoObject: FingerprintManager.CryptoObject) {

        cancellationSignal = CancellationSignal()

        if (ActivityCompat.checkSelfPermission(appContext,
                Manifest.permission.USE_FINGERPRINT) !=
            PackageManager.PERMISSION_GRANTED) {
            return
        }
        manager.authenticate(cryptoObject, cancellationSignal, 0, this, null)
    }

    override fun onAuthenticationError(errMsgId: Int,
                                        errString: CharSequence) {
        Toast.makeText(appContext,
            "Authentication error\n" + errString,
            Toast.LENGTH_LONG).show()
    }

    override fun onAuthenticationHelp(helpMsgId: Int,
                                      helpString: CharSequence) {
        Toast.makeText(appContext,
            "Authentication help\n" + helpString,
            Toast.LENGTH_LONG).show()
    }

    override fun onAuthenticationFailed() {
        Toast.makeText(appContext,
            "Authentication failed.",
            Toast.LENGTH_LONG).show()
    }

    override fun onAuthenticationSucceeded(
        result: FingerprintManager.AuthenticationResult) {

        Toast.makeText(appContext,
            "Authentication succeeded.",
            Toast.LENGTH_LONG).show()
    }
}
```

Cuối cùng, trong phương thức `onCreate` của `MainActivity`, chúng ta phải tạo một thể hiện của lớp `FingerprintHelper` để sử dụng phương thức **startAuth**:
```java
override fun onCreate(savedInstanceState: Bundle) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    if (checkLockScreen()) {
        generateKey()
        if (initCipher()) {
            cipher.let {
                cryptoObject = FingerprintManager.CryptoObject(it)
            }
            val helper = FingerprintHelper(this)

            if (fingerprintManager != null && cryptoObject != null) {
                helper.startAuth(fingerprintManager, cryptoObject)
            }
        }
    }
}
```

Chạy ứng dụng trên thiết bị của bạn và nhớ đảm bảo nó có cảm biến vân tay. Ngoài ra, hãy thử các tình huống khác nhau. Ví dụ: xóa tất cả dấu vân tay liên quan đến thiết bị của bạn, xóa mật khẩu của thiết bị, ...

Nguồn: https://blog.mindorks.com/authentication-using-fingerprint-in-android-tutorial