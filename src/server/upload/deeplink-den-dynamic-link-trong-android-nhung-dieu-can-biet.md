# Deeplink đến Dynamic link trong Android - Những điều cần biết

Bài viết cũng được mình đăng tại blog cá nhân: [Code cùng Trung](https://codecungtrung.com/). Các bạn ghé qua để học thêm kiến thức hay nhé :D

- [Deeplink đến Dynamic link trong Android](https://codecungtrung.com/android/advanced-android/deeplink-va-dynamic-link-trong-android)

And now !!! 
 
 Đã bao giờ bạn nhấn vào **một đường link** mà sau đó một ứng dụng khác được mở lên chưa, hoặc bạn hay thấy mọi người **chia sẻ link** để từ đó có thể tải ứng dụng về ? Hẳn có lúc bạn đã làm, đã thấy phải không nào. Vậy họ làm như thế nào nhỉ ? :no_mouth::no_mouth:
 
 Câu trả lời chính là sử dụng **Deeplink** đó. Sau đây chúng ta cùng tìm hiểu nhé !!!
 
## I. Khái niệm

### 1. Deep link là gì ?

Là thành phần giúp di chuyển giữa web và ứng dụng. Chúng đơn giản là URL mà giúp di chuyển tới thành phần nào đó của ứng dụng.

Tuy nhiên nếu ứng dụng khác trong thiết bị có thể xử lý cùng loại Intent, thì người dùng có thể sẽ không đi thẳng đến app. 

<img src="https://miro.medium.com/max/1400/1*1Tw0Yy2tHoq3mHleM789rQ.jpeg">

Có một khái niệm khác là App link. Nó cũng chính là deep link mà đã được xác thực là thuộc về app của mình. Khi nhấn vào URL, nó sẽ mở luôn app, không hiển thị dialog chọn ứng dụng

### 2. Kịch bản từ Deep link tới nội dung app

Khi click một URl, hệ thống Android sẽ làm từng bước sau, theo tuần tự, cho đến khi thành công

- Mở ứng dụng mặc định theo setting của người dùng có thể xử lý URL, nếu được chỉ định

- Mở ứng dụng duy nhất có thể xử lý URL

- Cho phép người dùng chọn ứng dụng từ dialog 

### 3. App link vs deep link

<img src="https://developer.android.com/training/app-links/images/app-disambiguation_2x.png" width="280">

App link sẽ dẫn người dùng thẳng vào app mà không hiện dialog như trên

### Cách làm

- Set android:autoVerify="true"

+ Sẽ xác thực toàn bộ host liên kết với URL

Check toàn bộ intent filter bao gồm

```
Action: android.intent.action.VIEW

Categories: android.intent.category.BROWSABLE và android.intent.category.DEFAULT

Data scheme: http or https

```

Giả sử tìm được thì sẽ check file Digital Asset Links

Digital Asset Links phải có ở trên website để chỉ thị app liên kết với website và xác thực URL intent


### 4. Tạo deeplink và Lấy parameter

Mình sẽ truyền id và name theo 2 cách sau

Sử dụng câu lệnh cmd

```
adb shell 'am start 
-W -a android.intent.action.VIEW 
-d "http://www.testapp.com/main?id=12345&name=Trung" 
gooner.demo.training_deep_link'

``` 

Sử dụng file html

```
<a href="test://gooner.demo/main?/id=12345&name=Trung">Open APP</a>

```
File html
<img src="https://github.com/trungcnn-1883/Training_Deep_link/raw/master/img/d3.png">

Giao diện web
<img src="https://github.com/trungcnn-1883/Training_Deep_link/raw/master/img/d4.png">


Code để lấy, trong onCreate hoặc onStart

```
        val data = intent?.data.let {
            Log.d("Data11", " " + it?.getQueryParameter("id"))
            Log.d("Data11", " " + it?.getQueryParameter("name"))
        }
```

### 5. Tương tác với deeplink

a. Deeplink không ở trong nội dung trang web

- Nếu link không ở trong nội dung của 1 trang web: sẽ xuất hiện dialog chọn app

 Sau đó nhấn app của mình sẽ mở app lên


b. Trường hợp link được đính trong nội dung trang web

- Có app: mở app 

- Không có: app không được mở lên, không có gì xảy ra khi nhấn vào deeplink

Các bạn để lại ý kiến phần này nhé, mình thử nhiều lúc kết quả không dk như trên.
Mong có sự góp ý của các bạn :pray::pray::clap:

### 6. Deeplink với Navigation Component

### a. Một số vấn đề khi sử dụng deeplink như sau:

### 1. Phải tạo nhiều link ở file manifest, bao gồm cả http và https

### 2. Xử lý parameters trong link

Case 1

```
val myUri = Uri.parse(myLink) // http://mysite.com?myParam=VALUE
val myParamValue = myUri.getQueryParameter("myParam")
```

Case 2

```
val myUri = Uri.parse(myLink) // http://mysite.com/VALUE/stuff
val myParamValue = myUri.pathSegments[0]
```

### 3. Xử lý di chuyển màn khi mở link


Navigation sẽ giúp khắc phục các vấn đề này 

1.
```

<fragment
    android:id="@+id/pagesListFragment"
    android:name="com.ekalips.navigatortest.pages.PagesListFragment"
    android:label="Pages"
    tools:layout="@layout/fragment_pages_list">
    <action
        android:id="@+id/viewPage"
        app:destination="@id/pageFragment"/>
    <deepLink app:uri="myapp.com" />
</fragment>
```

URI ko có scheme => Schema sẽ được coi là  **http** hay **https**

2. 

```
<fragment
    android:id="@+id/pageFragment"
    android:name="com.ekalips.navigatortest.page.PageFragment"
    android:label="Page"
    tools:layout="@layout/fragment_page">
    <argument
        android:name="title"
        app:type="string" />

    <argument
        android:name="detail"
        app:type="string" />

    <action
        android:id="@+id/viewPageComments"
        app:destination="@id/pageCommentsFragment"/>
    <deepLink app:uri="myapp.com/{title}/{detail}" />
</fragment>
```

Các tham số được viết trong dấu {} và thẻ <argument>. Muốn nhận ta đơn giản chỉ cần gọi getArguments() rồi get ra thuộc tính là xong

Có thể sử dụng Safe Args để tiện cho việc lấy dữ liệu

3. Về cơ bản nó sẽ lấy theo file navigation graph ta tạo ra (tùy theo loại deep link), từ đó đơn giản hóa việc tạo di chuyển

### b. Phân loại

Có 2 loại deep link:

- Explicit: sử dụng PendingIntent, thường dùng trong notification, app widget

- Implicit: sử dụng URI, khi nhấn vào thì mở apps

### 7. DynamicLink của Firebase

### a. Khái niệm

 DynamicLink FireBase là các link liên kết hoạt động theo cách bạn muốn, nó sử dụng được trên nhiều nền tảng (iOS, Android, Web) và cho dù ứng dụng của bạn đã được cài đặt hay chưa. 

 Có thể tạo bằng cách sử dụng Firebase console, REST API, iOS hoặc Android Builder API, hoặc thêm tham số Dynamic Link tới domain của app. 

Lợi ích: 

- Có thể làm tăng lượt người sử dụng app từ web

- Quảng cáo đơn giản hơn, chỉ cần gửi link là được

<img src="https://firebase.google.com/docs/dynamic-links/images/social-campaign.png">

- Chia sẻ nội dung của app dễ hơn, trên bất kì nền tảng nào, hay đã dùng app hay chưa

Cách hoạt động

<img src="https://images.viblo.asia/1cce0481-1753-44b6-991e-03c2ef813bf9.png">

### b. Hoạt động trong các trường hợp

- Firebase deeplink cần có internet mới có thể hoạt động, ko sẽ báo lỗi

- Nếu có app thì sẽ mở app

- Ko có app thì ta sẽ có thể chỉ định dẫn tới google play store hoặc link mà ta muốn

### c. Cách khởi tạo

- Sử dụng Firebase console: đơn giản, với mục đích để test hoặc cho đội marketing dễ quảng cáo app

<img src="https://github.com/trungcnn-1883/Training_Deep_link/raw/master/img/d1.png">

- Trong code 

```
    fun generateContentLink(): String {
        val baseUrl = Uri.parse("https://gooner.demo/test/?title=Happy-to-meet-you")
        val domain = "https://gooner.page.link"

        val link = FirebaseDynamicLinks.getInstance()
            .createDynamicLink()
            // deep link
            .setLink(baseUrl)
            // dynamic link
            .setDomainUriPrefix(domain)
            .setAndroidParameters(
                DynamicLink.AndroidParameters.Builder("gooner.demo.training_deep_link")
                    .setFallbackUrl(Uri.parse("https://gooner.demo/test/?title=Can't-install-on-device")).build()
            )
            .setIosParameters(DynamicLink.IosParameters.Builder("gooner.demo.iOS").build())
            .buildDynamicLink()

        return link.uri.toString()

    }
```

### d. So sánh

- Dynamic Link vs Deep Link

Dynamic link bao gồm cả deeplink + một số thông tin khác như package name, version, link khi không cài được app (afl), ...

So sánh

<img src="https://github.com/trungcnn-1883/Training_Deep_link/raw/master/img/d2.png">

- Long vs short dynamic link

+ Long: chứa đầy đủ thông tin như package android, ios, parameter

+ Short: link rút gọn, che giấu đi thông tin


```
Long Dynamic Link

https://gooner.page.link/?link=https://gooner.demo/main/?title%3DHappy-to-meet-you-kaka11111&apn=gooner.demo.training_deep_link

Short Dynamic Link

https://gooner.page.link/main 

```

Trong code gen ra bằng **buildDynamicLink()** và **buildShortDynamicLink()**


## II. Code

### 1. Code deep link cơ bản

- Thêm <action> **ACTION_VIEW**: để intent filter có thể tìm từ Google Search

```
  <action android:name="android.intent.action.VIEW"/>
```

- Thêm thẻ <data>

```
 <data android:scheme="http"
                      android:host="www.example.com"/>

 <data android:scheme="app"
                      android:host="open.my.app"
                      android:pathPrefix="/main"/>
```

- Thêm thẻ <category>

```
// Để có thể mở app từ trình duyệt

<category android:name="android.intent.category.BROWSABLE"/>

// Mở app từ implicit intent, nếu đúng component name thì app có thể được mở 

<category android:name="android.intent.category.DEFAULT"/>
```

Cùng 1 activity có thể có nhiều intent filter với thẻ <data> khác nhau

```
<activity
    android:name="com.example.android.GizmosActivity"
    android:label="@string/title_gizmos" >
    <intent-filter android:label="@string/filter_view_http_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with "http://www.example.com/gizmos” -->
        <data android:scheme="http"
              android:host="www.example.com"
              android:pathPrefix="/gizmos" />
        <!-- note that the leading "/" is required for pathPrefix-->
    </intent-filter>
    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with "example://gizmos” -->
        <data android:scheme="example"
              android:host="gizmos" />
    </intent-filter>
</activity>
```

Và nếu viết như trên thì chỉ có https://www.example.com và app://open.my.app là có thể dẫn tới app

Nếu viết như sau

```
<intent-filter>
  ...
  <data android:scheme="https" android:host="www.example.com" />
  <data android:scheme="app" android:host="open.my.app" />
</intent-filter>
```
Thì sẽ tạo ra 4 URL có thể dẫn tới app.

 ### Deeplink có rất nhiều ứng dụng trong thực tế, đặc biệt trong việc quảng cáo, quảng bá sản phẩm. Qua bài viết các bạn cũng thấy cũng khá dễ làm, dễ học phải không nào. Vậy còn chần chừ gì nữa mà không thử ngay thôi :100::raised_hand_with_fingers_splayed::clap:
    
    
 -------------------------------------------------------------------------
    
 Xem thêm các bài viết khác của mình tại Viblo

- [Service trong Android - Những khái niệm cơ bản - Phần 1](https://viblo.asia/p/service-trong-android-nhung-khai-niem-co-ban-phan-1-Az45boyoKxY)
- [Location trong Android](https://viblo.asia/p/location-trong-android-vyDZOp8klwj)
- [App bundle và Dynamic delivery trong Android](https://viblo.asia/p/app-bundle-va-dynamic-delivery-trong-android-bJzKmwOYl9N)
   
  
 Blog cá nhân , các bạn hãy theo dõi để tiếp tục cập nhật những kiến thức mới nhé. Cảm ơn các bạn :D

 Code cùng Trung - Chia sẻ để tiến bước:
    https://codecungtrung.com/
    
Một blog khác của mình về sách. Các bạn có thể tìm được nhiều đầu sách hay, với các chủ đề phong phú.

Xem ngay tại **Trạm đọc sách:** https://tramdocsach.com/