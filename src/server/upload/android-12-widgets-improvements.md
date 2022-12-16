Android 12 cải tiến API widget hiện có để cải thiện trải nghiệm người dùng và nhà phát triển trong platform và launcher. Sử dụng guide này để tìm hiểu cách đảm bảo widget của bạn tương thích với Android 12 và cũng là tài liệu tham khảo cho các API để làm mới widêt hiện có của bạn.

![](https://images.viblo.asia/c2c02295-5d82-49f6-b148-d7ea319d2513.png)

## Đảm bảo tiện ích của bạn tương thích với Android 12

Các widget trong Android 12 có các góc được bo tròn. Khi một widget ứng dụng được sử dụng trên thiết bị chạy Android 12 trở lên, launcher sẽ tự động xác định nền của widget và cắt nó để có các góc tròn.

Trong trường hợp này, widget của bạn có thể không hiển thị đúng trong một trong các điều kiện sau:

* **Widget chứa nội dung ở các góc:** Điều này có thể khiến một số nội dung trong khu vực góc bị cắt.
* **Widget sử dụng nền không dễ bị cắt:** Điều này bao gồm nền trong suốt, chế độ xem hoặc bố cục trống hoặc bất kỳ loại nền đặc biệt nào khác không dễ bị cắt. Hệ thống có thể không xác định được chính xác nền để sử dụng.

Nếu widget của bạn sẽ bị ảnh hưởng bởi thay đổi này, chúng tôi khuyên bạn nên làm mới nó với các góc được làm tròn (như được mô tả trong phần sau) để đảm bảo nó hiển thị đúng cách.

## Implement rounded corners

Android 12 giới thiệu các thông số hệ thống sau để đặt bán kính các góc tròn của widget của bạn:

* [system_app_widget_background_radius](https://developer.android.com/reference/android/R.dimen#system_app_widget_background_radius): Bán kính góc của nền widget, sẽ không bao giờ lớn hơn 28dp.
[ systemappwidgetinnerradius](https://developer.android.com/reference/android/R.dimen#systemappwidgetinnerradius):  Bán kính góc của bất kỳ chế độ xem nào bên trong widget. Con số này nhỏ hơn chính xác 8dp so với bán kính nền để căn chỉnh phù hợp khi sử dụng đệm 8dp.

Ví dụ sau đây cho thấy một widget sử dụng system_app_widget_background_radius cho góc của widget và system_app_widget_inner_radius cho các view bên trong widget.

![](https://images.viblo.asia/4ef9df76-0bec-47aa-838b-73a43e5fffde.png)

1. Góc của widget.
2. Góc của view bên trong widget.

### Tương thích ngược với các góc tròn

Để đảm bảo tính tương thích của widget với các phiên bản Android trước, chúng tôi khuyên bạn nên xác định các thuộc tính tùy chỉnh và sử dụng chủ đề tùy chỉnh để ghi đè chúng cho Android 12, như được hiển thị trong các ví dụ sau về tệp XML:

```/value/attrs.xml```
```xml
<resources>
  <attr name="backgroundRadius" format="dimension" />
</resources>
```

```/value/styles.xml```
```xml
<resources>
  <style name="MyWidgetTheme">
    <item name="backgroundRadius">@dimen/my_background_radius_dimen</item>
  </style>
</resources>
```
...

## Áp dụng màu sắc động

Trong Android 12, một widget có thể sử dụng màu chủ đề của thiết bị cho các nút, nền và các thành phần khác. Điều này cho phép chuyển đổi mượt mà hơn và nhất quán trên các widget khác nhau.

Trong ví dụ sau, màu chủ đề của thiết bị là "nâu", khiến màu nhấn và nền widget thích ứng. Bạn có thể đạt được điều này bằng cách sử dụng chủ đề mặc định của hệ thống (@android:style/Theme.DeviceDefault.DayNigh) và các thuộc tính màu của nó. Một số thuộc tính màu thường được sử dụng là:

* ```?android:attr/colorAccent```
* ```?android:attr/colorBackground```
* ```?android:attr/textColorPrimary and ?android:attr/textColorSecondary```

![](https://images.viblo.asia/dfb8c68f-a14c-4cbf-a831-889452a57993.png)
<div align="center">    
Widget light theme
</div>

![](https://images.viblo.asia/99211b21-26b9-4c9f-918a-acc2320729e8.png)
<div align="center">    
Widget dark theme
</div>

### Tương thích ngược với màu sắc động

Chúng tôi khuyên bạn nên tạo một chủ đề tùy chỉnh và ghi đè nó cho Android 12. Các ví dụ sau đây cho thấy cách thực hiện việc này với nhiều loại XML:

```/values/attrs.xml```
```xml
<resources>
  <style name="MyWidget.TextView">
    <item name="android:textColor">@color/my_text_color</item>
  </style>
  <style name="MyWidgetTheme">
    <item name="textViewStyle">@style/MyWidget.TextView</item>
  </style>
</resources>
```

```/value-31/styles.xml
```xml
<resources>
  <style name="MyWidgetTheme" parent="Theme.DeviceDefault.DayNight" />
</resources>
```

## Giúp cá nhân hóa các widget dễ dàng hơn

Nếu bạn chỉ định một activity configuration bằng thuộc tính [configure](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#configure) của [appwidget-provider](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo),  App Widget host sẽ khởi chạy hoạt động đó ngay lập tức sau khi người dùng thêm tiện ích vào màn hình chính của họ.

Android 12 bổ sung các tùy chọn mới để cho phép bạn cung cấp trải nghiệm cấu hình tốt hơn cho người dùng.

### Cho phép người dùng định cấu hình lại các widgets đã đặt

Để định cấu hình các widget được gắn nhãn là có thể cấu hình lại, người dùng có thể nhấn và giữ widget đó. Thao tác này sẽ hiển thị nút **Reconfigure**, họ có thể chạm vào nút này để thay đổi cài đặt.

![](https://images.viblo.asia/74b668b1-33a4-46e1-9221-bb6db4706e2e.png)
<div align="center">    
1. Reconfigure button.
</div>

Chỉ định cờ [reconfigurable](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#WIDGET_FEATURE_RECONFIGURABLE) trong thuộc tính [widgetFeatures](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#widgetFeatures) của **appwidget-provider**:

```xml
<appwidget-provider
  ...
  android:configure="com.myapp.WidgetConfigActivity"
  android:widgetFeatures="reconfigurable">
</appwidget-provider>
```

### Sử dụng cấu hình mặc định của widget

Nếu bạn muốn widget của mình sử dụng cấu hình mặc định khi người dùng thêm nó, bạn có thể bỏ qua bước cấu hình bằng cách chỉ định cả [configuration_optional](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#WIDGET_FEATURE_CONFIGURATION_OPTIONAL) và cờ **reconfigurable** trong trường **widgetFeatures**. Điều này bỏ qua việc khởi chạy configuration activity sau khi người dùng thêm widget. (Như đã đề cập trước đây, người dùng vẫn có thể định cấu hình lại widget sau đó.)

Ví dụ: widget đồng hồ có thể bỏ qua cấu hình ban đầu và hiển thị múi giờ của thiết bị theo mặc định.

```xml
<appwidget-provider
  ...
  android:configure="com.myapp.WidgetConfigActivity"
  android:widgetFeatures="reconfigurable|configuration_optional">
</appwidget-provider>
```

### Tương thích ngược với các tùy chọn cấu hình widget

Ứng dụng của bạn có thể sử dụng cờ **configuration_optional** và cờ **reconfigurable** trong các phiên bản Android trước. Tuy nhiên, các cờ này sẽ không có bất kỳ tác dụng nào và hệ thống sẽ vẫn khởi chạy activity configuration.

## Thêm các nút ghép mới

Android 12 bổ sung hỗ trợ mới cho hành vi trạng thái bằng cách sử dụng các thành phần hiện có sau:
* [CheckBox](https://developer.android.com/reference/kotlin/android/widget/CheckBox)
* [Switch](https://developer.android.com/reference/android/widget/Switch)
* [RadioButton](https://developer.android.com/reference/android/widget/RadioButton)

Tiện ích này vẫn ở trạng thái stateless. Ứng dụng của bạn phải lưu trữ trạng thái và đăng ký các sự kiện thay đổi trạng thái.

![](https://images.viblo.asia/6daa0c54-a6d7-4229-9ab0-0da209d166db.png)

Ví dụ code sau đây cho thấy cách triển khai các thành phần này:

```kotlin
// Check the view.
remoteView.setCompoundButtonChecked(R.id.my_checkbox, true)

// Check a radio group.
remoteView.setRadioGroupChecked(R.id.my_radio_group, R.id.radio_button_2)

// Listen for check changes. The intent will have an extra with the key
// EXTRA_CHECKED that specifies the current checked state of the view.
remoteView.setOnCheckedChangeResponse(
  R.id.my_checkbox,
  RemoteViews.RemoteResponse.fromPendingIntent(onCheckedChangePendingIntent)
)
```

### Tương thích ngược với các nút phức hợp tiện ích

Cung cấp hai bố cục khác nhau, với một thiết bị nhắm mục tiêu chạy Android 12 trở lên (**res/layout-v31**) và nhắm mục tiêu các phiên bản Android trước đó (trong thư mục **res/layout** mặc định).

## Sử dụng các API cải tiến cho kích thước và bố cục widget

Bắt đầu từ Android 12, bạn có thể cung cấp các thuộc tính kích thước tinh tế hơn và bố cục linh hoạt hơn bằng cách thực hiện các thao tác sau:

1. [ Chỉ định các ràng buộc bổ sung về kích thước tiện ích con](https://developer.android.com/about/versions/12/features/widgets#specify-widget-size-constraints)
2. Cung cấp [responsive layouts](https://developer.android.com/about/versions/12/features/widgets#provide-responsive-layouts) hoặc [exact layouts](https://developer.android.com/about/versions/12/features/widgets#provide-exact-layouts)

### Chỉ định các ràng buộc bổ sung về kích thước widget

Android 12 bổ sung các API mới cho phép bạn đảm bảo tiện ích của mình có kích thước đáng tin cậy hơn trên các thiết bị khác nhau với các kích thước màn hình khác nhau.

Ngoài các thuộc tính [minWidth](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#minWidth), [minHeight](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#minHeight), [minResizeWidth](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#minResizeWidth) và [minResizeHeight](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#minResizeHeight) hiện có, hãy sử dụng các thuộc tính ap**appwidget-provider** mới sau:

* [targetCellWidth](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#targetCellWidth) và [targetCellHeight](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#targetCellHeight): Xác định kích thước mục tiêu của widget theo các ô lưới của launcher. Nếu được xác định, các thuộc tính này được sử dụng thay vì **minWidth** hoặc **minHeight**.
* [maxResizeWidth](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#maxResizeWidth) và [maxResizeHeight](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#maxResizeWidth): Xác định kích thước tối đa mà launcher cho phép người dùng thay đổi kích thước của widget.

XML sau đây mô tả cách sử dụng các thuộc tính định size.

```xml
<appwidget-provider
  ...
  android:targetCellWidth="3"
  android:targetCellHeight="2"
  android:maxResizeWidth="250dp"
  android:maxResizeHeight="110dp">
</appwidget-provider>
```

### Cung cấp responsive layouts

Nếu  layou cần thay đổi tùy thuộc vào kích thước của widget, chúng tôi khuyên bạn nên tạo một tập hợp nhỏ  layou, mỗi  layou hợp lệ cho một loạt kích thước. (Nếu không thể, một tùy chọn khác là cung cấp  layou dựa trên kích thước chính xác của widget trong runtime.)

Việc triển khai tính năng này cho phép mở rộng quy mô mượt mà hơn và hiệu năng hệ thống tổng thể tốt hơn; điều này là do hệ thống không phải đánh thức ứng dụng mỗi khi nó hiển thị tiện ích ở một kích thước khác.

Ví dụ code sau đây cho thấy cách cung cấp danh sách  layout.

```kotlin
override fun onUpdate(...) {
  val smallView = ...
  val tallView = ...
  val wideView = ...

  val viewMapping: Map<SizeF, RemoteViews> = mapOf(
    SizeF(100f, 100f) to smallView,
    SizeF(100f, 200f) to tallView,
    SizeF(200f, 100f) to wideView
  )
  val remoteViews = RemoteViews(viewMapping)

  appWidgetManager.updateAppWidget(id, remoteViews)
}
```

### Cung cấp exact layouts

Nếu một tập hợp nhỏ các layout đáp ứng không khả thi, thay vào đó, bạn có thể cung cấp các layout khác nhau phù hợp với kích thước mà widget được hiển thị. Đây thường là hai kích thước dành cho điện thoại (chế độ dọc và ngang) và bốn kích thước dành cho máy có thể gập lại.

Để triển khai giải pháp này, ứng dụng của bạn cần thực hiện các bước sau:

1. Overload [AppWidgetProvider#onAppWidgetOptionsChanged(...)](https://developer.android.com/reference/android/appwidget/AppWidgetProvider#onAppWidgetOptionsChanged(android.content.Context,%20android.appwidget.AppWidgetManager,%20int,%20android.os.Bundle)), được gọi khi tập hợp kích thước thay đổi.
2. Gọi [getAppWidgetManager#getAppWidgetOptions(...)](https://developer.android.com/reference/android/appwidget/AppWidgetManager#getAppWidgetOptions(int)), trả về một [Bundle](https://developer.android.com/reference/android/os/Bundle) chứa các kích thước.
3. Truy cập key [AppWidgetManager.OPTION_APPWIDGET_SIZES](https://developer.android.com/reference/android/appwidget/AppWidgetManager#OPTION_APPWIDGET_SIZES) từ **Bundle**.

```kotlin
// Create the RemoteViews for the given size.
private fun createRemoteViews(size: SizeF): RemoteViews { }

override fun onAppWidgetOptionsChanged(
  context: Context,
  manager: AppWidgetManager,
  id: Int,
  newOptions: Bundle?
) {
  super.onAppWidgetOptionsChanged(context, manager, id, newOptions)
  // Get the new sizes.
  val sizes = newOptions?.getParcelableArrayList<SizeF>(
    AppWidgetManager.OPTION_APPWIDGET_SIZES
  )
  // Check that the list of sizes is provided by the launcher.
  if (sizes.isNullOrEmpty()) {
    return
  }
  // Map the sizes to the desired RemoteViews
  val remoteViews = RemoteViews(sizes.associateWith(::createRemoteViews))
  appWidgetManager.updateAppWidget(id, remoteViews)
}
```

## Cải thiện trải nghiệm widget picker của ứng dụng của bạn

### Thêm các bản xem trước widget có thể mở rộng vào widget picker

Trong Android 12, widget preview được hiển thị trong widget picker bao gồm bản xem trước có thể mở rộng mà bạn sẽ cung cấp dưới dạng layout XML được đặt thành kích thước mặc định của widget. Trước đây, widget preview là một tài nguyên tĩnh có thể vẽ được, trong một số trường hợp, widget preview không phản ánh chính xác các widget sau khi chúng được thêm vào màn hình chính.

Để triển khai widget preview có thể mở rộng, hãy sử dụng thuộc tính [previewLayout](https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo#previewLayout) của phần tử **appwidget-provider** để cung cấp layout XML thay thế:

```xml
<appwidget-provider
  ...
  android:previewLayout="@layout/my_widget_preview">
</appwidget-provider>
```

ý tưởng nhất, đây phải là bố cục giống với tiện ích con thực tế với các giá trị mặc định hoặc thử nghiệm thực tế.

### Khả năng tương thích ngược với các widget preview có thể mở rộng

Để bật widget pickers trên Android 11 trở xuống hiển thị bản xem trước widget của bạn, hãy tiếp tục chỉ định thuộc tính [previewImage](https://developer.android.com/guide/topics/appwidgets#preview). Nếu bạn thực hiện các thay đổi đối với giao diện của widget, hãy đảm bảo rằng bạn cũng cập nhật widget preview.

### Thêm mô tả cho widget của bạn

Trong Android 12, bạn có thể tùy chọn cung cấp mô tả cho widget picker để hiển thị cho widget của bạn.

![](https://images.viblo.asia/1d82fa94-e223-484f-8a07-15c0f715964f.png)

Cung cấp mô tả cho widget của bạn bằng cách sử dụng thuộc tính mô tả của **appwidget-provider**:

```xml
<appwidget-provider
  ...
  android:description="@string/my_widget_description">
</appwidget-provider>
```

## Enable smoother transitions

Trong Android 12, launchers cung cấp quá trình chuyển đổi mượt mà hơn khi người dùng khởi chạy ứng dụng của bạn từ mộtwidget. 
Để kích hoạt quá trình chuyển đổi được cải thiện này, hãy sử dụng **@android:id/background** hoặc**android.R.id.background** để xác định phần tử nền của bạn:

```xml
// Top level layout of the widget.
<LinearLayout
  ...
  android:id="@android:id/background">
</LinearLayout>
```

## Sử dụng bộ sưu tập RemoteViews được đơn giản hóa

Android 12 thêm phương thức [setRemoteAdapter(int viewId, RemoteViews.RemoteCollectionItems items)](https://developer.android.com/reference/android/widget/RemoteViews#setRemoteAdapter(int,%20android.widget.RemoteViews.RemoteCollectionItems)), cho phép ứng dụng của bạn truyền trực tiếp bộ sưu tập khi điền **ListView**. Trước đây, khi sử dụng [ListView](https://developer.android.com/reference/android/widget/ListView), cần phải triển khai và khai báo một **RemoteViewsService** để trả về [RemoteViewsFactory](https://developer.android.com/reference/android/widget/RemoteViewsService.RemoteViewsFactory).

Nếu bộ sưu tập không sử dụng một tập hợp layout cố định (nói cách khác, nếu một số mục chỉ đôi khi xuất hiện), hãy sử dụng **setViewTypeCount** để chỉ định số lượng bố cục duy nhất tối đa mà bộ sưu tập có thể chứa.

Dưới đây là một ví dụ về cách triển khai các bộ sưu tập RemoteViews được đơn giản hóa.

```kotlin
remoteView.setRemoteAdapter(
  R.id.list_view,
  RemoteViews.RemoteCollectionItems.Builder()
    .addItem(/* id= */ ID_1, RemoteViews(...))
    .addItem(/* id= */ ID_2, RemoteViews(...))
    ...
    .setViewTypeCount(MAX_NUM_DIFFERENT_REMOTE_VIEWS_LAYOUTS)
    .build()
)
```

## Sử dụng sửa đổi thời gian chạy của RemoteViews

Android 12 bổ sung một số phương thức **RemoteViews** cho phép sửa đổi thời gian chạy của các thuộc tính **RemoteViews**. Xem tham chiếu API **RemoteViews** để biết danh sách đầy đủ các phương pháp đã thêm. Ví dụ mã sau đây cho thấy cách sử dụng một số phương pháp mới.

```kotlin
// Set the colors of a progress bar at runtime.
remoteView.setColorStateList(R.id.progress, "setProgressTintList", createProgressColorStateList())

// Specify exact sizes for margins.
remoteView.setViewLayoutMargin(R.id.text, RemoteViews.MARGIN_END, 8f, TypedValue.COMPLEX_UNIT_DP)
```

Bài viết giới thiệu của mình đến đây là hết. Cảm ơn mọi người đã đọc :D