Bảo mật là vấn đề cực kì quan trọng, Nhiều chính sách bảo mật như [CCPA](https://oag.ca.gov/privacy/ccpa), [PIPEDA](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/) hay [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) đã được ban hành để nhằm định hướng các ứng dụng được xây dựng được an toàn hơn, bảo vệ được dữ liệu của người dùng.
Trong chủ đề này chúng ta sẽ cũng tìm hiểu các thành phần được hổ trợ trong Android để bảo vệ dữ liệu của người dùng, các phương pháp cơ bản để thực hiện bảo vệ dữ liệu trên thiết bị Android.
Bài viết này sẽ lần lượt đi qua các phương pháp sau đây:
* Các pop-up về permission
* Truy cập dữ liệu từ nhóm các ứng dụng liên kết
* Xoá cache của ứng dụng và browser
* Tắt tính năng in log của ứng dụng
* Chống chụp ảnh màn hình
* Mã hoá dữ liệu cá nhân
* Bảo vệ mã nguồn của ứng dụng
* Cài đặt bảo vệ sinh trắc học

##  Các pop-up về permission
Từ trước Android 6.0 (Marshmallow) khi xây dựng một ứng dụng các permission về truy cập dữ liệu, sử dụng mạng, máy ảnh, ghi âm, gửi tin nhắn... sẽ được thiết lập trong AndroidManifest.xml và được hỏi một lần khi cài đặt ứng dụng. Nhưng từ Android 6.0 trở đi cơ chế này đã thay đổi, việc cài đặt ứng dụng được tách riêng với quá trình yêu cầu các quyền truy cập các tài nguyên từ bên ngoài. Với cơ chế này, việc yêu cầu các quyền sẽ được thực hiện khi chạy ứng dụng tại những chức năng cần thiết, điều này giúp người dùng dễ dàng giám sát được các quyền mình cấp cho ứng dụng và mục đích sử dụng của nó để làm gì.

Chẳng hạn như ứng dụng cần quyền ghi thông tin ra bộ nhớ ngoài, nó sẽ yêu cầu quyền bên dưới trong file AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
Khi chạy ứng dụng đến những nơi ta cần sử dụng bộ nhớ ngoài, ta sẽ phải kiếm tra xem có quyền ghi hay không, nếu có thì chúng ta có thể thực hiện, ngược lại phải hiện pop-up để yêu cầu sự đồng ý từ người dùng. Nếu chúng ta bỏ qua bước này và thực hiện truy cập ứng dụng của chúng ta sẽ bị crash ngay lập tức.

Việc kiểm tra có thể thưc hiện qua mã nguồn bên dưới

```java
if (ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)  != PackageManager.PERMISSION_GRANTED) { //1
   // No permission, request it
   ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE), WRITE_TO_SDCARD) //2
} else {
	// Permission granted
    // Do 3
}
```

Qua ví dụ chúng ta thấy có 3 bước chính:
1. Kiểm tra permission được cấp phép hay chưa.
2. Permission chưa được cấp quyền, hiển thị pop-up xin quyền từ người dùng.
3. Đã có quyền truy cập thực hiện công việc mong muốn.

Để nhận được thông tin phản hồi từ người dùng khi yêu cầu quyền truy cập ở bước 2, ta thực hiện việc lắng nghe tại hàm bên dưới:

```java
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
  when (requestCode) {
    WRITE_TO_SDCARD -> {
      if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
        // Permission was granted
		// Do 3
      }
      return
    }
  }
}
```
##  Truy cập dữ liệu từ nhóm các ứng dụng liên kết
Permission có thể bao phủ hầu hết các trường hợp truy xuất và nhận dữ liệu từ bên ngoài ứng dụng. Nhưng đôi khi chúng ta cần truyền  dữ liệu qua lại giữa các nhóm các ứng dụng chúng ta đã xây dựng.

Để thực hiện việc này nhiều người sẽ tạo các files lưu trữ chúng trên bộ nhớ ngoài hoặc tạo ra các socket để trao đổi các thông tin với nhau. Điều này thật sự là không an toàn khi thông tin có thể dễ dàng bị đánh cắp. Thay vào đó chúng ta có thể sử dụng các **Intents** để gửi dữ liệu giữa các ứng dụng. Sau đây là 1 ví dụ:
```java
val intent = Intent()
val packageName = "com.example.app" //1
val activityClass = "com.example.app.yourActivity" // 2
intent.component = ComponentName(packageName, activityClass)
intent.putExtra("UserInfo", "Example string") //3
startActivityForResult(intent) //4
```
Chúng ta thấy sẽ có 4 thông tin cần xác nhận:
1.  Package name của ứng dụng sẽ thực hiện gửi Intent
2.  Class sẽ nhận Intent được gửi tới
3.  Dữ liệu cần gửi đi
4.  Gửi Intent và chờ nhận kết quả phản hồi

Việc gửi dữ liệu Broadcast đến nhiều ứng dụng, đòi hỏi các ứng dụng phải cùng được **signed** với 1 khoá chung để có thể nhận dữ liệu. Nếu không thực hiện điều này bất kì ứng dụng nào lắng nghe thông tin đều có thể nhận được dữ liệu từ ứng dụng của bạn sẽ gửi. Tương tự như trong trường hợp một ứng dụng độc hại có thể gửi thông tin độc hại đến ứng dụng của bạn nếu ứng dụng của chúng ta đang đăng kí nhận thông tin Broadcast đó.

Để ngăn chặn điều này, hệ thống cung cấp cho chúng ta 1 thuộc tính là "**protectionLevel**", thuộc tính này giúp chúng ta chỉ gửi dữ liệu cho những ứng dụng cùng sigend với key do chúng ta quy định, những ứng dụng ngoài sẽ không thể nhận tín hiệu Broadcast này
```xml
android:protectionLevel="signature" />
```
Đồng thời chúng ta sẽ quy định 1 permission mà chỉ những ứng dụng do chúng ta xây dựng mới sử dụng, điều này giúp các ứng dụng có thể đọc thông tin của nhau và tránh bị truy cập trái phép từ ứng dụng ngoài. Ví dụ như permission sau đây
```xml
<permission android:name="com.canh.muoi.SHARE_DATA" android:protectionLevel="signature"/>
```
Trong AndroidManifest cũng cung cấp cho chúng ta 1 thuộc tính là "**android:exported**", khi thiết lập cho nó giá trị là "**false**" thì nó sẽ không nhận các Broadcast từ ứng dụng ngoài mà chỉ lắng nghe các Broadcast từ hệ thống hoặc từ chính ứng dụng tạo ra, điều này giúp ứng dụng không bị tấn công khi không phải lắng nghe và nhận các thông tin độc hại từ ứng dụng thứ ba.
```xml
<receiver android:exported="false" android:name="com.sample.myapp">
    <intent-filter>
       <action android:name="com.android.vending.INSTALL_REFERRER" />
    </intent-filter>
</receiver>
```
## Xoá cache của ứng dụng và browser
Có những trường hợp chúng ta cần phải xoá những thông tin và dữ liệu mà ứng dụng đã thu thập khỏi bộ nhớ hệ thống khi người dùng không còn sử dụng nữa hoặc thoát khỏi ứng dụng. Những thông tin này bao gồm cả các file dữ liệu và cache.

Ứng dụng của chúng ta có thể sử dụng các thư mục lưu trữ tạm, nó nên được xoá khi không còn sử dụng nữa. Chúng ta có thể thực hiện việc này trong hàm **onPause()** hoặc **onStop()** tuỳ vào mục đích hoạt động của ứng dụng ta xây dựng, ta có thể tham khảo đoạn code sau trong Activity của chương trình:

```java
override fun onStop() {
  cacheDir.deleteRecursively()
  externalCacheDir?.deleteRecursively()
 
  super.onStop()
}
```

Mục đích của hàm trên là thông báo cho OS rằng khi **Activity** của ứng dụng ở trạng thái **Stop** thì hãy xoá tất cả các cache.

Ứng dụng chúng ta xây dựng cũng có thể lưu trữ dữ liệu trong **Shared Preferences**, chúng ta có thể loại bỏ chúng ở đường dẫn "**data/data/yourpackagename/sharedprefs/yourprefsname.xml** và **your_prefs_name.bak**. Đồng thời xoá khỏi vùng nhớ tạm với đoạn code sau:

```java
context.getSharedPreferences("prefs", Context.MODE_PRIVATE).edit().clear().commit()
```

Ngoài ra, khi ứng dụng chúng ta có sử dụng các thành phần phục vụ cho việc nhập thông tin như các **EditText**, hệ thống sẽ mở keyboard cho người dùng nhập liệu. Tại đây nếu có thiết lập **auto-corrected** là **true** thì hệ thống có thể thu thập thông tin người dùng nhập cho việc học và gợi ý những từ liên quan dẫn đến việc rò rỉ thông tin mà đôi khi là những thông tin về tài khoản đăng nhập của người dùng.

Để tắt việc ghi nhận cache từ keyboard, chúng ta sẽ cần phải tắt tính năng auto-correct. Việc này được thực hiện từ file layout của ứng dụng nơi chưa các EditText, ta tìm đến các khai báo của EditText và thực hiện thiết lập thuộc tính như sau:
```xml
android:inputType="textNoSuggestions|textVisiblePassword|textFilter"
```

Có một loại cache chúng ta cũng cần phải chú ý, đó là Android sẽ lưu trữ cache của dữ liệu gửi qua **network** trong  bộ nhớ memory hoặc lưu trữ trên bộ nhớ thiết bị. Chúng ta hoàn toàn có thể chặn này bằng cách thiết lập cấu hình của việc kết nối như sau:

```java
connection.setRequestProperty("Cache-Control", "no-cache")
connection.defaultUseCaches = false
connection.useCaches = false
```
Đoạn code trên giúp chúng ta tắt tính năng cache khi thiết lập **HttpsUrlConnection**. Điều này sẽ giúp ngăn chặn việc lưu dữ liệu của người dùng khi gửi qua network.

Đối với việc sử dụng webview, chúng ta có thể loại bỏ việc lưu cache bởi đoạn code sau:
```java
webview.clearCache(true)
```

Ngoài ra, để thực sự loại bỏ cache chúng ta cần phải kiểm tra lại các thư viện từ bên thứ 3 mà chúng ta sử dụng có lưu trữ cache hay không. Chẳng hạn như là ứng dụng Glide rất phổ biến trong việc load và hiển thị hình ảnh, ứng dụng này có thể tính là cho phép chọn lưu cache của hình ảnh là trên memory hay trên bộ nhớ thiết bị, ta có thể loại bỏ việc lưu trữ trên thiết bị với đoạn mã dưới đây:

```java
Glide.with(context)
    .load(imageURL)
    .diskCacheStrategy(DiskCacheStrategy.NONE)
    ...
    .into(holder.imageView)
```

## Tắt tính năng in log của ứng dụng
VIệc sử dụng log để in ra các thông tin trong khi chạy diễn ra ở hầu hết các ứng dụng, việc sử dụng log này giúp người phát triển có thể nhanh chóng tìm được các vấn đề đang xảy ra trong ứng dụng đang xây dựng, từ đó đưa ra phương pháp sửa chữa thích hợp. Tuy nhiên, một số người có thể quên tắt hay xoá các log này đi khi release ứng dụng, điều này dẫn đến rò rỉ thông tin về ứng dụng và rất có thể thông tin này liên quan đến tính trạng đăng nhập, tài khoản của người dùng. Việc này sẽ gây ra nhiều thiệt hại cho nhà phát triển ứng dụng.

Để không xảy ra điều này, Android đã cung cấp cho chúng ta một class có tên là **BuildConfig** và chứa đựng một biến ta là **DEBUG**. Nó sẽ tự động thiết lập là "**true**" khi chúng ta tạo ứng dụng với bản **debug** và tự động thiết lập là "**false**" khi tạo ứng dựng với bản **release**. Ta có thể tận dụng điều này để chỉ in log ở ứng dụng debug

```java
if (BuildConfig.DEBUG) {
    Log.d(TAG, "Your log of your application...")
}
```

Việc thiết lập trên sẽ giúp cho ứng dựng ở bản release không còn rò rỉ những thông tin quan trọng. Tuy nhiên, nó sẽ hơi khó khăn cho quá trình sử dụng, khi chúng ta luôn phải kiểm tra ứng dựng có phải bản debug không để thực hiện in log. 

Để tránh việc này chúng ta có thể sử dụng một thư viện bên ngoài cho việc in log là [Timber](https://github.com/JakeWharton/timber) . Việc sử dụng thư viện này rất đơn giản chúng ta chỉ cần xác định là build là bản debug hay release 1 lần ở **MainApplication** của ứng dụng để kích hoạt thư viện này, chúng ta hãy xem đoạn mã bên dưới:

```java
if (BuildConfig.DEBUG) {
   Timber.plant(Timber.DebugTree())
}
```

Khi muốn in log ở bất kì đâu trong ứng dụng ta cũng sử dụng như thư viện Log của Android, nhưng không cần xác định TAG, Timber sẽ tự động nhận biết đang gọi ở class nào và in tên của class đó vào log giúp chúng ta nhận biết log đó đang được in ở class nào
```java
 Timber.d("Your log in application")
```

Phần 1 đến đây là hết, xin hẹn gặp lại các bạn ở phần 2 :bow::bow::bow: