Mã hóa dữ liệu rất quan trọng trong mọi ứng dụng Android. Bạn cần biết một số cách để bảo mật dữ liệu, bảo mật file Android của bạn, bảo mật các các dữ liệu shared preferences, các key được sử dụng trong ứng dụng của bạn. Thực tế là, ngay cả sau khi áp dụng một số kỹ thuật mã hóa, dữ liệu của bạn có thể được lấy lại bởi một số chuyên gia, nhưng mục đích của bạn là làm thế nào để họ khó lấy dữ liệu hơn bằng cách cung cấp thêm một số lớp bảo mật bên trong ứng dụng của bạn. Trong blog này, chúng ta sẽ tìm hiểu cách mã hóa dữ liệu an toàn trên thiết bị và sử dụng AndroidKeyStore để lưu trữ khóa trong Android. Bắt đầu thôi nào

### Thư viện Jetpack Security

Tại Google I/O 19, thư viện Jetpack Security được giới thiệu cho phép chúng ta dễ dàng mã hóa dữ liệu, file và shared preferences. Nó cung cấp bảo mật mạnh mẽ, cân bằng một cách tuyệt vời giữa mã hoá và hiệu suất tốt. Ngoài ra, đối với các ứng dụng yêu cầu Keystore được hỗ trợ bằng phần cứng, nó cung cấp bảo mật tối đa. Vì vậy, tất cả những gì chúng ta cần làm chỉ là sử dụng thư viện này mà không nghĩ về công việc mà nó làm trong phần phụ trợ.

Nhưng hệ điều hành Android rất an toàn và chúng ta có hệ thống mã hóa dựa trên tệp riêng biệt, vậy tại sao phải sử dụng Thư viện Jetpack Security của Android? Có nhiều lý do khác nhau, một số trong số đó là:
- Nếu bạn đang làm việc trên một thiết bị đã root thì hệ thống file sẽ được mở khóa và một số kẻ tấn công có thể dễ dàng truy cập dữ liệu mặc dù bạn đã mã hóa toàn bộ bộ nhớ.
- Lý do khác có thể là bảo mật các khóa hoặc mã thông báo trong ứng dụng của bạn vì bạn không muốn người dùng của mình sử dụng các khóa này.

Vì vậy, Thư viện Jetpack Security này được sử dụng để mã hóa trên bộ nhớ điện thoại và được cung cấp cho phiên bản Android 6.0 trở lên. Tất cả những gì bạn cần làm là thêm thư viện này vào tệp `build.gradle` của bạn.

```
dependencies {
    ...
    implementation 'androidx.security:security-crypto:1.0.0-alpha01'
}
```

### Quản lý Key

Các key mà chúng ta sử dụng trong ứng dụng Android phải được bảo mật bởi vì nếu chúng ta không bảo mật các khóa Android của mình thì nó có thể được sử dụng để chống lại chúng ta theo một cách nào đó. Vì vậy, để bảo vệ các khóa của chúng ta khỏi bị người khác sử dụng, chúng ta có một thứ gọi là Android Keystore System trong Android. Nó bảo vệ key material của bạn khỏi việc sử dụng trái phép. Vì vậy, để sử dụng nó, bạn phải được ủy quyền. Nó được hỗ trợ phần cứng có nghĩa là nó chạy trên một không gian bộ nhớ riêng trên thiết bị. Vì vậy, mặc dù ứng dụng của bạn có quyền truy cập vào khóa, ứng dụng của bạn không biết  key material là gì và theo cách này,  key material của bạn được bảo mật. Đối với API 28 trở lên, bạn có thể sử dụng StrongBox Keymaster nằm trong module bảo mật phần cứng và nó là implementation của Keymaster HAL. Các module có CPU riêng và lưu trữ an toàn. Vì vậy, nó sẽ cung cấp thêm một lớp mã hóa cho các key của bạn.

Trong Jetpack Security chúng ta có một class là `MasterKeys` cho pháp chúng ta tạo ra các private key ( mặc định, chuẩn mã hoá ASE256 được sử dụng).

```kotlin
val keyGenParameterSpec = MasterKeys.AES256_GCM_SPEC
val masterKeyAlias = MasterKeys.getOrCreate(keyGenParameterSpec)
```

Ở đây, chúng ta đang sử dụngblock mode `GCM_SPEC` không có phần đệm. Nếu bạn muốn mã hóa một dữ liệu nhỏ có kích thước tương đương kích thước của khóa thì bạn không cần bất kỳ phần đệm hoặc blocking nào. Nhưng khi dữ liệu được mã hóa dài hơn kích thước của khóa, thì chúng ta sử dụng phần đệm và blocking.

Không phải lúc nào cũng bắt buộc phải sử dụng khóa 256-bit hoặc sử dụng GCM không có phần đệm. Bạn có sẵn các tùy chọn khác như `setBlockModes()`, `setEncryptPaddings`, `setKeySize()`, `setUserAuthenticationRequired()`, `setUnlockedDeviceRequired()`, và nhiều phương thức khác nữa.

```kotlin
val someAdvanceSpec = KeyGenParameterSpec.Builder(
    "master_key",
    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
).apply {
    setBlockModes(KeyProperties.BLOCK_MODE_GCM)
    setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
    setKeySize(256)
    setUserAuthenticationRequired(true)
    setUserAuthenticationValidityDurationSeconds(30)
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES_P){//Android P or higher
        setUnlockedDeviceRequired(true)
    }
}.build()
val advKey = MasterKeys.getOrCreate(someAdvanceSpec)
```

Bạn cũng có thể tạo cặp khóa EC mới bằng cách sử dụng `KeyPairGenerator` API.

```kotlin
val kpg: KeyPairGenerator = KeyPairGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_EC,
        "AndroidKeyStore"
)
val parameterSpec: KeyGenParameterSpec = KeyGenParameterSpec.Builder(
        alias,
        KeyProperties.PURPOSE_SIGN or KeyProperties.PURPOSE_VERIFY
).run {
    setDigests(KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
    build()
}

kpg.initialize(parameterSpec)

val kp = kpg.generateKeyPair()
```

Bây giờ, chúng ta đã có một key, và chúng ta có thể sử dụng key này cho nhiều mục đích ví dụng như sử dụng để mã hoá file. Hãy xem chúng ta làm như thế nào nhé

### File Encryption

Với sự trợ giúp của thư viện Jetpack Security, bạn có thể mã hóa các tệp có trong ứng dụng của mình. Nó sử dụng Streaming AES để xử lý các tệp ở mọi kích cỡ. Tất cả những gì bạn cần làm là tạo một file và sau đó làm file này trở thành file được mã hóa. Sau khi nhận được file đã mã hóa, nếu bạn muốn ghi một số dữ liệu vào file được mã hóa thì bạn có thể sử dụng phương thức `openFileOutput()` và nếu bạn muốn đọc dữ liệu từ file được mã hóa của mình thì bạn có thể sử dụng phương thức `openFileInput()`. Dưới đây là code thực hiện:

```kotlin
val secretFile = File(filesDirectory, "super_secret")
val encryptedFile = EncryptedFile.Builder(
    secretFile,
    applicationContext,
    advancedKeyAlias,
    FileEncryptionScheme.AES256_GCM_HKDF_4KB)
    .setKeysetAlias("file_key") //this is optional
    .setKeysetPrefName("secret_shared_prefs") //this is optional
    .build()

...

encryptedFile.openFileOutput().use { outputStream ->
    //write data from your encrypted file
}

encryptedFile.openFileInput().use { inputStream ->
    //read file from your encrypted file
}
```

Mọi thứ đã được mã hoá và giải mã ngay ở nơi mà bạn gọi đến dữ liệu, bạn không cần phải lo lắng cách thức mà nó làm việc.

### SharedPreferences Encryption

Chúng ta lưu trữ dữ liệu trong SharedPreferences bởi vì nó dễ dàng trong việc sử dụng. Nhưng bên cạnh đó, nó lại quá dễ dàng để cho tấn công và lấy các key-value từ SharedPreferences. Thế nên chúng ta cần mã hoá dữ liệu SharedPreferences và điều này hoàn toàn dễ dàng khi sử dụng EncryptedSharedPreferences. Nó hoạt động với Android 6.0 và cao hơn.

Để sử dụng EncryptedSharedPreferences, chỉ cần tạo hoặc nhận một Master Key từ AndroidKeyStore:

```kotlin
val myMaterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
```

Sau khi nhận được Master Key, bây giờ khởi tạo một instance của EncryptedSharedPreferences: 

```kotlin
val mySharedPreferences = EncryptedSharedPreferences.create(
    "my_preference_file_name",
    myMasterKeyAlias,
    applicationContext,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV, //for encrypting Keys
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM ////for encrypting Values
)
```

Và sau đó, bạn có thể lưu dữ liệu và đọc nó ra từ EncryptedSharedPreferences như vẫn hay làm

```kotlin
//save data
mySharedPreferences.edit()
    .putString("MY_DATA", saveText.text.toString())
    .apply()

//read data
val someValue = mySharedPreferences.getString("MY_DATA", "")
```

Kết thúc
Trong blog này, chúng ta đã tìm hiểu cách bảo mật các key của mình với sự trợ giúp của AndroidKeyStore và với sự trợ giúp của các key này, chúng tôi có thể bảo mật các file và SharedPreferences của mình. Nếu bạn muốn có một số mã hóa nâng cao thì bạn có thể sử dụng Tink, đây là thư viện mã nguồn mở của Google cũng được Jetpack Security Library sử dụng. Nó có bảo mật đa nền tảng cung cấp bảo mật cho các phiên bản Android khác nhau và cho các thiết bị di động khác nhau. Bạn có thể tìm hiểu thêm về Tink từ [đây](https://github.com/google/tink).

Hy vọng bạn đã học được một cái gì đó mới ngày hôm nay.

Nguồn: [How to encrypt data safely on the device and use the AndroidKeyStore?](https://blog.mindorks.com/how-to-encrypt-data-safely-on-device-and-use-the-androidkeystore)