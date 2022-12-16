# Widget là gì?


Widget được xem như 1 ứng dụng hiển thị những thông tin quan trọng và đại diện cho 1 ứng dụng khác ngay trên màn hình chính của thiết bị Android. Người dùng có thể theo dõi thông tin và chức năng của ứng dụng mà không cần mở ứng dụng đó. Lượng thông tin được hiển thị tùy vào loại ứng dụng và kích thước của widget. Người dùng có thể thay đổi kích thước để thay đổi lượng thông tin  ( Nếu widget đó hỗ trợ ), hoặc di chuyển widget đến các vùng khác nhau trên màn hình chính.

![](https://images.viblo.asia/044f7ba0-ff1d-4c73-9b52-b7e66a1d44c2.png)
![](https://images.viblo.asia/49b8e403-0265-4837-afcb-f69c17a42f7d.png)

Widget xuất hiển dưới nhiều hình thức khác nhau. Chức năng chính của widget bao gồm hiển thị thông tin, làm phím tắt truy cập nhanh ứng dụng, điều khiển các cài đặt cơ bản của thiết bị, hoặc cung cấp 1 chức năng của ứng dụng và người dùng có thể tương tác, sử dụng nhanh ngay tại màn hình chính (VD: Gửi 1 email, tạo ghi chú, .. ).


# Các loại widget thường gặp

Các widger khác nhau có độ phức tạp và kiểu mang thông tin khác nhau. Tùy vào mục đích sử dụng mà widget được phân làm 4 loại chính:

## Widget thông tin

Hiển thị những thông tin quan trọng của ứng dụng để người dùng dễ dàng nắm bắt: Thông tin thời tiết, tiền tệ, tin tức,…

![](https://images.viblo.asia/0b65e6e3-5ec3-47ba-a694-641ead9fd8b2.png)

## Widget Collection

Hiển thị những thông tin cùng chủ đề theo dạng danh sách: Danh sách email, các file google drive,…

![](https://images.viblo.asia/0e3dcc85-2072-4518-b0db-b9875cbc91dc.png)

## Widget điều khiển

Giúp người dùng điều khiển những cài đặt thiết bị hoặc ứng dụng cơ bản thường dùng mà không cần truy cập vào cài đặt cũng như phải vào trực tiếp ứng dụng.

![](https://images.viblo.asia/e61a77d9-4488-4dda-89cc-2e4810f0e510.png)

## Widget Hybrid

Hiện nay hầu hết các widget là sự kết hợp giữa nhiều loại khác nhau, ví dụ widget phát nhạc của samsung hiển thị thông tin bài bát (loại 1 ), danh sách phát (loại 2 ) và người dùng có thể điều khiển player ngay trên homescreen (loại 3). Những widget kết hợp nhiều loại như vậy gọi là widget hybrid.

![](https://images.viblo.asia/1c178fcd-2577-49e1-8c3a-6b8f647310d3.png)

# Hạn chế của widget

Widget có thể được coi là 1 “ứng dụng mini” thay thế cho ứng dụng chính trong nhiều trường hợp cần sự truy cập nhanh chóng. Tuy nhiên, ta cũng cần chú ý những giới hạn của 1 widget trên homescreen của người dùng:

## Cử chỉ

Do được đặt trên màn hình chính của thiết bị, widget cần phối hợp cử chỉ sao cho không bị xung đột với cử chỉ thông thường trên màn hình. Ví dụ: 1 widget không thể hỗ trợ cử chỉ vuốt ngang để chuyển thông tin, vì cử chỉ ngang mặc định đã được gán cho hành động chuyển trang homescreen.

Về cơ bản, widget hỗ trợ 2 cử chỉ cơ bản là chạm và vuốt theo chiều dọc.

## Phần tử

Cũng do những giới hạn về cử chỉ mà widget chỉ hỗ trợ những layout và component sau:

![](https://images.viblo.asia/63668dd8-f59d-45e7-9c3f-0924c5b2ca5b.png)

![](https://images.viblo.asia/a42a803d-8786-4fff-8781-4056d877c147.png)
  
# Chú ý khi thiết kế và cài đặt 1 widget cho ứng dụng android 

## Nội dung widget

Thông tin mà widget hiển thị.

## Điều hướng

Chức năng extent mà người dùng có thể tương tác ngay trên homescreen (tạo ghi nhớ, tạo email,.. ).

## Điều chỉnh kích thước

Lên kế hoạch cho thay đổi về lượng thông tin khi người dùng thay đổi kích thước widget.

![](https://images.viblo.asia/aba34e3d-7ba2-47dc-9209-01d865df551f.png)

## Trang cài đặt cho widget

1 số widget có 1 khu vực cài đặt riêng (1 app riêng hoặc activity trong ứng dụng chính) để người dùng tùy chỉnh widget.

# Tạo 1 widget đơn giản

Ta hãy bắt đầu tạo 1 widget cơ bản qua ví dụ dưới đây. Widget sau đây có chức năng hiển thị tên, ghi chú ngắn hoặc bất cứ thông tin text nào trên homescreen. Người dùng có thể thay đổi thông tin hiển thị trong app cài đặt của widget và update lên màn hình chính.

Để cài đặt 1 widget, về cơ bản ta cần hoàn thành 4 bước sau:

1.	Thiết kế layout XML.

2.	Kế thừa class `AppWidgetProvider`.

3.	Cung cấp mô tả cho `AppWidgetProviderInfo`.
	
4.	Khai báo widget trong file `Manifest`.

Về cơ bản, widget và ứng dụng tương tác với nhau theo cơ chế broadcast. Bất cứ thay đổi trong ứng dụng có liên quan đến widget sẽ được cập nhật và ngược lại.

Ta sẽ thiết kế 1 layout đơn giản với 1 TextView được custom background, bạn đọc có thể tham khảo code XML dưới:


```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="match_parent"
                android:layout_height="match_parent">
    <TextView
            android:id="@+id/appwidget_text"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_vertical|center_horizontal"
            android:text="@string/appwidget_text"
            android:textColor="#111111"
            android:textSize="32sp"
            android:elevation="4sp"
            android:background="@drawable/widget_text_background"
            android:layout_margin="8dp"
            android:contentDescription="@string/appwidget_text"/>
</RelativeLayout>
```


Background cho TextView được thiết kế như sau (mang mục đích tham khảo):


```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="false">
        <shape android:shape="rectangle">
            <solid android:color="#ffffff"></solid>
            <size android:width="60dp"></size>
            <size android:height="60dp"></size>
            <corners android:radius="60dp"></corners>
        </shape>
    </item>
    <item android:state_pressed="true">
        <shape android:shape="rectangle">
            <solid android:color="#999999"></solid>
            <size android:width="60dp"></size>
            <size android:height="60dp"></size>
            <corners android:radius="60dp"></corners>
        </shape>
    </item>
</selector>
```


Sau khi có layout cho widget, ta bắt đầu cài đặt phần logic cho class `HomeWidget.kt`:


```
package com.example.demo_widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class HomeWidget : AppWidgetProvider() {

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent?) {
        super.onReceive(context, intent)
        val yourName = intent?.getStringExtra("NAME")
        updateAppWidgetText(context, yourName!!)
    }

    companion object {

        internal fun updateAppWidget(
            context: Context, appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val widgetText = context.getString(R.string.appwidget_text)
            val views = RemoteViews(context.packageName, R.layout.name_widget)
            views.setTextViewText(R.id.appwidget_text, widgetText)
            val intent = Intent(context, MainActivity::class.java)
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, 0)
            views.setOnClickPendingIntent(R.id.appwidget_text, pendingIntent)
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        fun updateAppWidgetText(
            context: Context, name: String
        ) {
            val views = RemoteViews(context.packageName, R.layout.name_widget)
            views.setTextViewText(R.id.appwidget_text, name)
            AppWidgetManager.getInstance(context).updateAppWidget(
                ComponentName(context, HomeWidget::class.java), views
            )
        }
    }
}
```


Giải thích: 

`override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray): `Callback được gọi mỗi khi widget được update thông qua activity, trong callback này ta cập nhất tất cả thể hiển của widget đang được hiển thị trên homescreen.

`override fun onReceive(context: Context, intent: Intent?): `Callback được gọi mỗi khi widget được update và nhận broadcast, ta sẽ xử lý thay đổi trong hàm này.

`onUpdateAppWidget():` hàm mặc định thực hiện update widget, trong ví dụ này là cập nhật text mặc định cho widget mỗi khi được tạo.

`updateAppWidgetText:()` hàm được tạo riêng với ví dụ này nhằm mục đích cập nhật nội dung TextView theo thay đổi của người dùng.

Widget giao tiếp với activity thông qua intent, trong `onUpdateAppWidget()`, ta tạo 1 intent và lắng nghe sự kiện click cho TextView với mục đích mở Activity cài đặt mỗi khi người dùng chạm vào.

`Tại onReceive():` ta lấy nội dung qua intent được truyền từ activity và gọi hàm `updateAppWidgetText()` để cập nhật mỗi khi người dùng tiến hành thay đổi nội dung.

Bước tiếp theo là cung cấp thông tin widget thông qua file XML metadata, được lưu trữ trong thư mục res/xml:


```
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
                    android:minWidth="40dp"
                    android:minHeight="40dp"
                    android:previewImage="@drawable/example_appwidget_preview"
                    android:initialLayout="@layout/name_widget"
                    android:resizeMode="horizontal|vertical"
                    android:widgetCategory="home_screen"
                    android:initialKeyguardLayout="@layout/name_widget">
</appwidget-provider>
```


Bây giờ, ta tiến hành tạo activity cài đặt, trong ví dụ trên là `MainActivity.kt`:

Layout bao gồm 1 EditText để người dùng nhập nội dung, và 1 button để submit thay đổi:


```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        tools:showIn="@layout/activity_main"
        tools:context=".MainActivity">

    <EditText
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:inputType="textPersonName"
            android:text="@string/editText"
            android:ems="10"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent" android:id="@+id/editText" android:layout_marginTop="240dp"
            app:layout_constraintTop_toTopOf="parent"/>
    <Button
            android:text="@string/button"
            style="@style/Widget.AppCompat.Button.Borderless"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent" app:layout_constraintEnd_toEndOf="parent"
            android:id="@+id/button"
            app:layout_constraintHorizontal_bias="0.498"
            android:layout_marginTop="24dp" app:layout_constraintTop_toBottomOf="@+id/editText"/>

</android.support.constraint.ConstraintLayout>
```


Cuối cùng là code phần logic cho MainActivity:


```
package com.example.demo_widget

import android.os.Bundle
import android.support.v7.app.AppCompatActivity;
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Intent


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        button.setOnClickListener {
            broadcastToWidget(editText.text.toString())
        }
    }

    private fun broadcastToWidget(text: String) {
        val intent = Intent(this, HomeWidget::class.java)
        intent.action = "android.appwidget.action.APPWIDGET_UPDATE"
        val ids = AppWidgetManager.getInstance(application)
            .getAppWidgetIds(ComponentName(application, HomeWidget::class.java!!))
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
        intent.putExtra("NAME", text)
        sendBroadcast(intent)
    }
}
```


Bước cuối cùng là khai báo widget trong file manifest bằng cặp thẻ <receiver></receiver>:


```
<receiver android:name=".HomeWidget">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE"/>
            </intent-filter>

            <meta-data
                    android:name="android.appwidget.provider"
                    android:resource="@xml/name_widget_info"/>
        </receiver>
```
            
Sau 4 bước trên, ta thu được kết quả như chuỗi hình minh họa bên dưới:

![](https://images.viblo.asia/5f6ab8a1-dde9-4537-865c-14ea1dc36a10.gif)

![](https://images.viblo.asia/e1b55a9c-8bcd-4543-a5bb-5fc9bbefc679.gif)

# Tổng kết

Bài viết đã chắt lọc những lý thuyết cơ bản nhất về Android widget. Hy vọng qua ví dụ cơ bản trên, bạn đọc có thể hình dung cũng như kiểm soát được cách cài đặt 1 widget cho 1 ứng dụng, qua đó nâng cao hiệu suất của ứng dụng cũng như trải nghiệm của người dùng.

Nguồn tham khảo: https://developer.android.com/guide/topics/appwidgets/overview