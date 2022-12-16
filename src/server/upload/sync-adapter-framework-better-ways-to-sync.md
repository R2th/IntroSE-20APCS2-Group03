# **I. Introduction**
Bài viết này giới thiệu với mọi người về Sync Adapter - công cụ cho phép đồng bộ hóa dữ liệu giữa device của bạn với server, hoặc giữa các device với nhau.
**SyncAdapterFramework** của android cho phép bạn có thể xây dựng mô hình để lưu trữ data ở một central storage area, và tạo các bản backup được đồng bộ trên nhiều devices khác nhau, đương nhiên, với **SyncAdapterFramework** thì việc đồng bộ này được thực hiện hoàn toàn tự động. Ngoài ra, khi sử dụng framework thì bạn có thể dễ dàng tận dụng những tính năng của nó mà bạn khó có thể có được nếu tự thiết kế cho mình một mô hình data transfer thông thường như:
1. *Plug-in architecture*
- Cho phép bạn add data transfer code vào system qua một callable component.
2. *Automate execution*
- Cho phép data transfer có khả năng tự động chạy dựa trên nhiều tiêu chí, bao gồm: data changes (data có thay đổi), elapsed time (sau một khoảng thời gian cố định), hoặc time of day (thời gian cố định trong ngày). Và đương nhiên, việc tự động chạy này không cần phải được thực hiện tuần tự, chúng chạy bất cứ khi nào có thể.
3. *Automate network checking*
- Việc thực hiện transfer data chỉ có thể xảy ra khi kết nối internet đang khả dụng
4. *Improved battery performance*
- Cho phép tập trung các task transfer cần thực hiện lại, và chạy chúng đồng thời tại 1 thời điểm. Việc truyền dữ liệu cũng được lên lịch để thực hiện đồng bộ với các device khác. Việc giảm thiểu số lần thực hiện đồng bộ dữ liệu giúp hệ thống giảm thiểu được số lần phải thực hiện kết nối internet, từ đó cải thiện được hiệu năng của pin.
5. *Account management and authentication*
- Nếu bạn cần một bước xác thực được tích hợp vào trong quá trình truyền dữ liệu. Bạn có thể thiết lập để tích hợp các thông tin xác thực vào trong quá trình truyền dữ liệu của mình.

*Lưu ý:* **SyncAdapterFramework** chạy bất đồng bộ, nó sẽ giúp bạn có thể đồng bộ data thường xuyên và hiệu quả, nhưng không realtime. Nếu muốn đồng bộ data realtime, bạn hãy thử tìm hiểu [**AsyncTask**](https://developer.android.com/reference/android/os/AsyncTask), hoặc [**InternService**](https://developer.android.com/reference/android/app/IntentService) nhé.



# **II. Implement**
Bây giờ chúng mình sẽ cùng nhau đi qua từng bước để học cách implement **sync adapter**,  **Service** để chạy nó, các thành phần cần thiết để cài cắm sync adapter, và làm sao để có thể chạy nó bằng nhiều cách khác nhau. 
## **1. Create a stub authenticator**
- Bài toán đặt ra là framework của bạn cần phải đồng bộ data từ device với server, thông qua một credential như là một authenticator (việc đăng nhập tài khoản để xác thực). Để làm được việc đó, yêu cầu framework của bạn phải cung cấp một component called, hiểu như một phần trong sync adapter, nhiệm vụ của nó là kết nối giữa device và server của bạn bằng thông tin account, và tạo một standard interface để xử lý thông tin xác thực này.
Trong trường hợp app của bạn không sử dụng thông tin xác thực, thông tin này sẽ được ignored. Tuy nhiên, bạn vẫn cần phải cung cấp 1 authenticator component cho nó, bạn cũng cần tạo 1 bound service để cho phép sync adapter tự động gọi authenticator's method.
### 1.1. Add a stub authenticator component
Để tạo một stub authenticator component, bạn cần tạo 1 class extends từ **AbstractAccountAuthenticator**, và khai báo các required methods, đơn giản hóa nó thì ta sẽ để nó return null hoặc throws ra một exception. Bạn có thể đọc thêm về [**AbstractAccountAuthenticator**](https://developer.android.com/reference/android/accounts/AbstractAccountAuthenticator) để tự custom lại class Authenticator của mình sao cho phù hợp với requirements.

```
/*
 * Implement AbstractAccountAuthenticator and stub out all
 * of its methods
 */
class Authenticator(context: Context) // Simple constructor
    : AbstractAccountAuthenticator(context) {

    // Editing properties is not supported
    override fun editProperties(r: AccountAuthenticatorResponse, s: String): Bundle {
        throw UnsupportedOperationException()
    }

    // Don't add additional accounts
    @Throws(NetworkErrorException::class)
    override fun addAccount(
            r: AccountAuthenticatorResponse,
            s: String,
            s2: String,
            strings: Array<String>,
            bundle: Bundle
    ): Bundle?  = null

    // Ignore attempts to confirm credentials
    @Throws(NetworkErrorException::class)
    override fun confirmCredentials(
            r: AccountAuthenticatorResponse,
            account: Account,
            bundle: Bundle
    ): Bundle?  = null

    // Getting an authentication token is not supported
    @Throws(NetworkErrorException::class)
    override fun getAuthToken(
            r: AccountAuthenticatorResponse,
            account: Account,
            s: String,
            bundle: Bundle
    ): Bundle {
        throw UnsupportedOperationException()
    }

    // Getting a label for the auth token is not supported
    override fun getAuthTokenLabel(s: String): String {
        throw UnsupportedOperationException()
    }

    // Updating user credentials is not supported
    @Throws(NetworkErrorException::class)
    override fun updateCredentials(
            r: AccountAuthenticatorResponse,
            account: Account,
            s: String,
            bundle: Bundle
    ): Bundle {
        throw UnsupportedOperationException()
    }

    // Checking features for the account is not supported
    @Throws(NetworkErrorException::class)
    override fun hasFeatures(
            r: AccountAuthenticatorResponse,
            account: Account,
            strings: Array<String>
    ): Bundle {
        throw UnsupportedOperationException()
    }
}
```

### 1.2. Bind the authenticator to the framework
Để **SyncAdapterFramework** access được vào authenticator của bạn, bạn cần tạo 1 bound **[Service](https://developer.android.com/reference/android/app/Service)**. Service này sẽ cung cấp 1 Android binder object, cho phép framework call authenticator và truyền data giữa chúng.
Khi framework khởi chạy service này lần đầu, nó sẽ cần phải access vào authenticator. Bạn có thể khởi tạo authenticator bằng cách gọi constructor của nó bên trong `onCreate` của service.

```
/**
* A bound Service that instantiates the authenticator
* when started.
*/
class AuthenticatorService : Service() {

    // Instance field that stores the authenticator object
    private lateinit var mAuthenticator: Authenticator

    override fun onCreate() {
        // Create a new authenticator object
        mAuthenticator = Authenticator(this)
    }

    /*
     * When the system binds to this Service to make the RPC call
     * return the authenticator's IBinder.
     */
    override fun onBind(intent: Intent?): IBinder = mAuthenticator.iBinder
}
```

### 1.3. Add the authenticator metadata file
Để cắm authenticator của bạn với sync adapter và account frameworks, bạn cần cung cấp cho framework một metadata mô tả về component. Metadata này làm nhiệm vụ khai báo account type bạn đã tạo cho sync adapter, và khai báo các user interface element cho hệ thống sử dụng nếu bạn muốn hiển thị account type tới người dùng. Metadata này nên được khai báo trong 1 xml file, đặt trong thư mục `/res/xml/` của project. Thông thường nó sẽ được đặt tên là `authenticator.xml`. Nếu muốn, bạn có thể thử đặt cho nó một cái tên khác hợp lý hơn.
File `authenticator.xml` chứa đựng single element `<account-authenticator>` gồm những attributes:
- `android:accoutnType`:  **SyncAdapterFramework** yêu cầu với mỗi sync adapter sẽ cần có một account type đặt trong domain name. Framework sẽ sử dụng nó như là internal identification của sync adapter. Nếu server yêu cầu xác thực, account type cùng với user account sẽ được dùng như là thông tin xác thực. Nếu server không yêu cầu xác thực, bạn vẫn cần phải cung cấp account type. Có thể sử dụng giá trị là domain name mà bạn control. Trong khi Framework sử dụng nó để quản lý sync adapter của bạn. Giá trị này sẽ không được gửi lên server.
- `android:icon` : Nếu bạn muốn sync adapter của mình được visible, set attribute `android:userVisible="true"` bên trong `res/xml/syncadapter.xml`. Và đừng quên cung cấp cho nó một **[Drawable](https://developer.android.com/guide/topics/resources/drawable-resource)** làm icon resource. Adapter của bạn sẽ xuất hiện trong **Accounts** section của system's Setting app.
- `android:smallIcon` : Có thể sử dụng thay thế cho `android:icon` tùy thuộc vào screen size.
- `android:label` : Thuộc tính này cho phép đặt tên cho account type, và sẽ hiển thị ngay bên cạnh icon.

```
<?xml version="1.0" encoding="utf-8"?>
<account-authenticator
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:accountType="example.com"
        android:icon="@drawable/ic_launcher"
        android:smallIcon="@drawable/ic_launcher"
        android:label="@string/app_name"/>
```
    
### 1.4. Declare the authenticator in the manifest
Bạn cần phải khai báo service của mình bên trong app manifest (`manifests/AndroidManifest.xml`) để có thể xác thực service đó với hệ thống, nếu không service sẽ không chạy được.

```
    <service
            android:name="com.example.android.syncadapter.AuthenticatorService">
        <intent-filter>
            <action android:name="android.accounts.AccountAuthenticator"/>
        </intent-filter>
        <meta-data
            android:name="android.accounts.AccountAuthenticator"
            android:resource="@xml/authenticator" />
    </service>
```
    
Trong đó: 
-  `<intent-filter>`: Filter intent action `android.accounts.AccountAuthenticator`. Intent action này được gửi bởi authenticator. Và mỗi khi nhận được intent action này, hệ thống sẽ khởi chạy **AuthenticatorService**.
- `<meta-data>`: Khai báo metadata cho authenticator. Thuộc tính `android:name` sẽ link metadata với authentication framework. Thuộc tính `android:resource` link tới file metadata của bạn. 





*Ở phần tiếp theo, mình sẽ cùng các bạn tìm cách cài cắm **[ContentProvider](https://developer.android.com/reference/android/content/ContentProvider)**, tạo và khởi chạy **SyncAdapter**. Nếu cảm thấy bài viết này hữu ích, hãy cho mình 1 like và chờ đón phần tiếp theo nhé!*
*Cảm ơn bạn đã đọc!*

***Update: [Phần 2 - Sync Adapter Framework - Better ways to sync](https://viblo.asia/p/sync-adapter-framework-better-ways-to-sync-phan-2-LzD5dWMYljY)***