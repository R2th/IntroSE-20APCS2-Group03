![](https://images.viblo.asia/baef73e5-3172-4813-b23e-eccb6c80e41b.png)

Ứng dụng Android có thể chia sẻ data giữa các ứng dụng dễ dàng. Dữ liệu được chia sẻ bao gồm **text, image, video , aduio file** ..... Ví dụ bạn có thẻ chia sẻ một image từ ứng dụng Google Photo tới ứng dụng Facebook hoặc ứng dụng Instagram. Ngày nay nó là một tính năng phổ biến trong các ứng dụng social trên Android.

![](https://images.viblo.asia/50329043-8d0e-4f08-9ccd-c12025e0a0e6.png)

Để nhận data từ các ứng dụng khác, chúng ta cần phải coinfig *Activity* trong *AndroidMainifest.xml* và xử lý *Intent* chứa *action* và *data* đã được gửi từ hệ thống.
Thực hiện tính năng chia sẻ này chỉ cần 2 bước trong khoảng 10 phút. Tôi tìn rằng bạn sẽ tìm thấy điều thú vị và hữu ích trong bài viết ngắn này. Chúng ta hay bắt đầu!

### Step 1. Add < Intent-filter> Trong AndroidManifest
```xml 
<manifest>
  <application>
    <activity android:name="lequanghoa.apps.SharingActivity">
      
      <!-- Add below codes-->
      <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
        <!-- Or any of the below-->
        <!--<data android:mimeType="text/*" /> -->
        <!--<data android:mimeType="video/*" /> -->
      </intent-filter>
      
    </activity>
  </application>
</manifest>
```

Chúng ta add 4 tags tới *Activity* để xử lý data đang đến trong AndroidMainifest.xml . Chúng là:
1. **< intent-filter>**
     Để nói rằng *Activity* này được áp dụng để xử lý hệ thống *Intent* với action và data được xác định tại các tag tương ứng là *< action>* và *< data>*
2.**< action>**
   Định nghĩa IntentAction mà *Activity* này có thể xử lý.
  *android.intent.action.SEND* nhận về single data và *android.intent.action.SENDMULTIPLE* nhận về một list data. Trường action được sử dụng bởi hệ thống để lọc  ra (filter) những ứng dụng mà sẵn sàng xử lý yêu cầu của *Intent*.
3. **< category>**
*android.intent.category.DEFAULT* phải được định nghĩa tại* < category>* nếu không thì *Activity* không thể nhận Intent không rõ dàng(implicit Intent) do đó không thể hiển thị tại dialog chia sẻ bên dưới.
4. **< data> **
 Khai báo type của MINE( (Multipurpose Internet Mail Extensions) để Activity này chú ý. Có một vài loại phổ biến: 
 - *text/*  *  cái này bao gồm *text/plain, text/rtf, text/html, text/json*
 - *image/* * cái này bao gồm *image/jpg, image/png, image/gif*
 - *video/*  * cái này bao gồm *video/mp4, video/3gp*
 - *audio/* * cái này bao gồm *audio/wav*
 - *application/pdf* *  cái này bao gồm *pdf file*
 
 ![](https://images.viblo.asia/280c3da3-82e8-40e2-aa60-9c8e5715fa68.png)

Tại thời điểm này bạn có thể nhìn thấy icon ứng dụng của bạn suất hiện tại dialog sharing . Tiêu đề bôi đậm (bold) là tên ứng dụng và tiêu đề bên dưới là tên *Activity* được khai báo trong AndroidManifest.xml. Nhìn bên dưới: 

```xml 
<manifest>
  <!-- Bold title -->
  <application
    android:label="Demo app">
    
    <!-- Regular subtitle -->
    <activity
      android:label="Act label">
      
    </activity>
  </application>
</manifest>
```

### Step 2 Xử Lý Data Tại Activity

```
class SharingActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_sharing)
    
    val isActivityLaunchedFromActionSend = intent?.action == Intent.ACTION_SEND
    val isActivityLaunchedFromActionSendMultiple = intent?.action == Intent.ACTION_SEND_MULTIPLE
    val isTextData = intent.type?.startsWith("text/") == true
    val isImageData = intent.type?.startsWith("image/") == true
    if (isActivityLaunchedFromActionSend && isTextData) {
      
      // Session 1: Handle received text data
      val sentString = intent.getStringExtra(Intent.EXTRA_TEXT)
      fooTextView.text = sentString
      
    } else if (isActivityLaunchedFromActionSend && isImageData) {
      
      // Session 2: Handle received image data
      val sentImageURI = intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri
      fooImageView.setImageURI(sentImageURI)
      
    } else if (isActivityLaunchedFromActionSendMultiple && isImageData) {
      
      // Session 3: Handle received multiple image data
      // Example of receiving 3 image URIs.
      val imageURIList = intent.getParcelableArrayListExtra<Parcelable>(Intent.EXTRA_STREAM) ?: arrayListOf()
      fooImageView.setImageURI(imageURIList.get(0) as? Uri)
      fooImageView2.setImageURI(imageURIList.get(1) as? Uri)
      fooImageView3.setImageURI(imageURIList.get(2) as? Uri)
      
    }
  }
}
```

Sau khi click vào icon app tại dialog sharing, *Activity* được xác định của bạn sẽ chạy và được khởi tạo. Data đã được gửi (ví dụ text, image, videok audio URI...) có thể được lấy về từ *Intent* đang tới tại *onCreate*() với các gía trị *key* khác nhau.
Trước khi tất cả bắt đầu, line (7-8) trong đoạn code trên là cần thiết để xác định rằng Intent được gửi đến từ *ACTIONSEND or ACTIONSENDMULTIPLE*
Ngoài ra data mine type cũng lên được được kiểm tra để đảm bảo rằng đúng *key* và *function* được sử dụng sau để lấy về data đã được gửi

![](https://images.viblo.asia/a6218199-5224-458b-90d6-efe22b1cceb5.gif)

Tại line 14-15 text đã gửi có thể được lấy về từ key *Intent.EXTRATEXT*
```
val sentString = intent.getStringExtra(Intent.EXTRA_TEXT)
fooTextView.text = sentString
```

![](https://images.viblo.asia/9f08f623-bdc8-4e39-9daf-9efc5477ab0a.gif)

Tại line 20-21 URI của image đã gửi có thể được lấy về từ key  *Intent.EXTRASTREAM*

```
val sentImageURI = intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri
fooImageView.setImageURI(sentImageURI)
```

![](https://images.viblo.asia/d83c1c97-10fb-40bf-a5b8-220d27f6d2b2.gif)

Tại line 20-21 URI của nhiều image đã gửi có thể được lấy về từ key *Intent.EXTRASTREAM* nhưng với 1 function khác *getParcelableArrayListExtra(key: String)*

```
val imageURIList = intent.getParcelableArrayListExtra<Parcelable>(Intent.EXTRA_STREAM) ?: arrayListOf()
fooImageView.setImageURI(imageURIList.get(0) as? Uri)
fooImageView2.setImageURI(imageURIList.get(1) as? Uri)
fooImageView3.setImageURI(imageURIList.get(2) as? Uri)
```

###  Summary
1.  *Activity* phải được khai báo với *< intent-filter>* để nói với hệ thống rằng Activity này có thể xử lý nhưng Intent nhất định với action và data được xác định tại các tag *< action> và < data>*
2. *android.intent.action.SEND or android.intent.action.SENDMULTIPLE* lên được khai báo tại tag *< action>* để nhận data từ các app khác.
3.  *android.intent.category.DEFAULT* phải được định nghĩa tại tag *< category>* để hiển thị app tại dialog sharing
4.  *MINE type*  được khai báo tại tag *< data>* để nói với hệ thống loại data nào mà *Activity* này có thể xử lý ví dụ *text/, image/*......
5.  Cả *IntentAction* và *data type* phải được kiểm tra tại callback* onCreate()* của *Activity* cụ thể. *Intent.EXTRATEXT* được xử lỵ để lấy về text và *Intent.EXTRASTREAM* được xử dụng để lấy về image đã gửi

Bài Viết Trên Được Tham Khảo Từ Nguồn:
[https://itnext.io/android-receiving-data-in-2-steps-21c49920172d](https://itnext.io/android-receiving-data-in-2-steps-21c49920172d)