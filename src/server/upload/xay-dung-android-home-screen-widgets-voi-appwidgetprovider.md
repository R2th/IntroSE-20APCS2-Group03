![](https://images.viblo.asia/4cfbe687-176b-4ce8-9c6d-f5d93af4fb3e.png)

# 1. Giới thiệu về Home screen widgets và AppWidgetProvider
## 1.1 Home screen widget 
 - Home screen widget chính là các broadcast receivers, nó cung cấp các thành phần để tương tác với app. Nó chủ yếu được sử dụng trên màn home của hệ điều hành Android, như hình ảnh trên.  Nó thường sẽ hiển thị một phần dữ liệu quan trọng của app và cho phép người dùng tương tác. Ví dụ như app dự báo thời tiết, nó sẽ hiển thị thông tin tóm tắt nhưng cần thiết với người dùng, khi user click vào widget thì nó sẽ mở app. 
 - Widget sẽ có một số các yếu điểm, vì nó là một ứng dụng nên nó sẽ tốn RAM, càng nhiều widget trên homescreen thì bạn sẽ càng có ít dung lượng RAM để sử dụng. Hoặc có những widget cần phải kết nối tới server riêng thì lúc đó bạn sẽ bị tốn lưu lượng. Vì vậy, bạn hãy cân nhắc khi sử dụng widget nhé !
 - Widget sử dụng RemoteView để tạo giao diện, một RemoteView có thể được thực hiện bởi một tiến trình khác giống với quyền gốc của ứng dụng. Bằng cách này widget chạy với quyền của ứng dụng của nó.
 - Giao diện người dùng cho một Widget được định nghĩa bởi một broadcast receiver. Receiver này sẽ gắn layout của nó vào một object có type là RemoteView. Object này sẽ được gửi tới Android, nó sẽ được chuyển lên màn home.
## 1.2 AppWidgetProvider
AppWidgetProvider là một class được extend từ BroadcastReceiver, tiện cho việc xử lý App Widget broadcasts. AppWidgetProvider chỉ nhận event broadcasts mà liên quan đến App Widget, ví dụ như là khi App Widget được update, xóa đi, enable hay disable. Khi có broadcast even thì AppWidgetProvider nhận những method sau:
+ ***onUpdate()*** : Hàm này được gọi để update App Widget trong khoảng thời gian được định nghĩa bởi thuộc tính *updatePeriodMillis* trong AppWidgetProviderInfo. Phương thức này cũng được gọi khi mà người dùng add App Widget, vì vậy nó sẽ thực hiện các setup cần thiết như là định nghĩa các event xử lý cho Views và start Service nếu cần. Tuy nhiên, nếu bạn khai báo một configuaration Activity, phương thức này không được gọi khi mà user add App Widget, nhưng sẽ được gọi cho lần update tiếp theo.
+ ***onAppWidgetOptionsChanged()*** :  Hàm này được sử dụng từ API 16 trởi lên, nó được gọi khi nó lần đầu được đặt ra home và nó cũng được gọi khi mà nó thay đổi kích thước. Bạn có thể sử dụng callback này để show hoặc hide content dựa trên kích cỡ của widget. Để lấy kích thước của widget, gọi *getAppWidgetOptions()* nó sẽ return một Bundle bao gồm : 


   -    OPTION_APPWIDGET_MIN_WIDTH— : Chứa giới hạn dưới của current width, đơn vị là dp.
      - OPTION_APPWIDGET_MIN_HEIGHT— : Chứa giới hạn dưới của current height, đơn vị là dp.
      - OPTION_APPWIDGET_MAX_WIDTH—: Chứa giới hạn trên của current width, đơn vị là dp.
      - OPTION_APPWIDGET_MAX_HEIGHT—: Chứa giới hạn trên của current height, đơn vị là dp.

+ ***onDeleted(Context, int[])*** : Hàm này được gọi khi mà một APP Widget bị xóa từ App Widget host.
+ ***onEnabled(Context)*** : Hàm này được gọi khi mà một instance App Widget được tạo lần đầu tiên. Ví dụ, nếu user add hai instances của App Widget, nó chỉ được gọi lần đầu tiên. Nếu bạn cần mở một database mới hoặc thực hiện setup một lần cho tất cả các App Widget instance  thì hàm này là thích hợp để bạn làm điều đó.
+ ***onDisabled(Context)*** : Hàm này được gọi khi mà instance cuối cùng của App Widget bị xóa khỏi App Widget chủ. Hàm này thích hợp cho việc clean các công việc khi thực hiện xong ở hàm onEnable(Context), ví dụ như là xóa database tạm thời.
+ ***onReceive(Context, Intent)*** : Hàm này được gọi cho các broadcast và trước khi gọi mỗi phương thức ở trên. Bạn thường không cần implement phương thức này vì mặc định AppWidgetProvider nó sẽ lọc tất cả các App Widget broadcasts và gọi các phương thức ở trên.

Trong các callback trên thì *onUpdate()* là quan trọng nhất bởi vì nó được gọi khi App Widget được add vào host. Nếu App Widget của bạn phản hồi các tương tác của người dùng thì bạn vần implement phương thức này để handle nó trong đây. Nếu App Widget không cần tạo các file tạm hay database tạm thời, hoặc thực hiện các công việc yêu cầu clean-up thì có thể chỉ cần gọi mỗi hàm *onUpdate()* thôi.
# 2. Tạo một home screen widget
Để tạo một widget, bạn cần : 

 +  Tạo một file layout 
 +  Tạo một file XML (AppWidgetInfo) cái mà mô tả các thuộc tính của widget như là size hoặc chu kỳ update.
 +  Tạo một class extend từ AppWidgetProvider dùng để tạo giao diện cho widget.
 +  Cài đặt thông tin Widget  vào file AndroidManifest.xml.

Trước Android 3.1, một widget luôn được fix cứng là một số lượng ô cố định trên màn home. 

Sau phiên bản đó thì widget có thể thay đổi kích thước tùy vào ý định của người dùng. Để bật chức năng này cho widget, bạn cần sử dụng thuộc tính này trong file xml: *android:resizeMode="horizontal|vertical*  

Đầu tiên là tạo một file background cho widget như sau : background_widget.xml

```java
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle" >

    <stroke
        android:width="2dp"
        android:color="#FFFFFFFF" />

    <gradient
        android:angle="225"
        android:endColor="#DD2ECCFA"
        android:startColor="#DD000000" />

    <corners
        android:bottomLeftRadius="7dp"
        android:bottomRightRadius="7dp"
        android:topLeftRadius="7dp"
        android:topRightRadius="7dp" />

</shape>
```

Tạo file layout cho widget : widget_layout.xml

```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="@dimen/dp_8"
    android:background="@drawable/background_widget"
    android:orientation="vertical"
    android:id="@+id/widgetLayout">

    <TextView
        android:id="@+id/titleWidget"
        style="@android:style/TextAppearance.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="4dip"
        android:textColor="@color/white"
        android:text="Name update: "/>

    <TextView
        android:id="@+id/timeWidget"
        style="@android:style/TextAppearance.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="4dip"
        android:gravity="center_horizontal|center_vertical"
        android:textColor="@color/white" />
</LinearLayout>
```

File info cho widget : tạo ở thư mục res/xml : widget_info.xml

```java
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:initialLayout="@layout/widget_layout"
    android:previewImage="@mipmap/ic_launcher"
    android:minHeight="72dp"
    android:minWidth="300dp"
    android:updatePeriodMillis="30000" >

</appwidget-provider>
```

Sau đó tạo Class MovieWidgetProvider extend từ AppWidgetProvider : 

```java
class MovieWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context?,
        appWidgetManager: AppWidgetManager?,
        appWidgetIds: IntArray?
    ) {
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        super.onReceive(context, intent)

    }
}
```

Thêm các thông tin của widget vào file AndroidManifest.xml : 

```java
  <receiver android:name=".screen.widget.MovieWidgetProvider">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data
                    android:name="android.appwidget.provider"
                    android:resource="@xml/widget_info" />
        </receiver>
```

Ở đây, mình kết hợp với FirebaseMessagingService để nhận thông báo và update widget mỗi khi có silent push : 

( Để nhận silent push thì noti bắn về không có cục notification mà chỉ có cục data thôi )

```java

override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        ....
        var name = ""
        remoteMessage.data.let { data ->
            name = data["name"].toString()
        }
        
        if (!name.isNullOrEmpty()) {
            val view = RemoteViews(packageName, R.layout.widget_layout)
            view.setTextViewText(R.id.timeWidget, name)
            val theWidget = ComponentName(this, MovieWidgetProvider::class.java)
            val manager = AppWidgetManager.getInstance(this)
            manager.updateAppWidget(theWidget, view)
            return
        }
        ... 
 }
```

Kết quả như sau : 


![](https://images.viblo.asia/d084dc2d-e9da-43ed-81fd-f904670e48c0.png)   ![](https://images.viblo.asia/6d281dc6-384b-4387-bbb6-5e90c5911cf1.png)

Hết roài, xin chào và hẹn gặp lại !!

# Tham khảo : 

Android docs : https://developer.android.com/reference/android/appwidget/AppWidgetProvider