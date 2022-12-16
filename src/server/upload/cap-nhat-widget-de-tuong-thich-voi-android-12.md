`Widget` là một phần của trải nghiệm Android trong một thời gian dài, với nhiều ứng dụng sử dụng widget một cách hiệu quả để tăng mức độ tương tác của người dùng. Người thường thíc sử dụng widget vì có thể dùng các tính năng của ứng dụng mà không cần mở ứng dụng, và còn có thể tùy chỉnh màn hình home trên thiết bị của họ.

Android 12 mang đến bản cập nhật cho các widget API hiện có và cải tiến thiết kế của các widget để phù hợp với ngôn ngữ thiết kế  [Material You](https://material.io/blog/announcing-material-you). Những thay đổi này cho phép bạn tạo các widget đẹp hơn sử dụng màu chủ đề của thiết bị và các góc bo tròn đồng thời nâng cao khả năng khám phá và hình ảnh để tìm kiếm và đặt các widget.

![image.png](https://images.viblo.asia/60fb96de-4b6a-43f5-b606-b109a8173317.png)
<div align="center">Trước đây (Android 11) so với thay đổi hiện tại chủ đề sáng và tối (Android 12)</div><br>

Trong bài viết này, chúng ta sẽ tìm hiểu cá cập nhật để widget tương thích với Android 12, với một số thay đổi đơn giản sẽ làm cho widget của bạn trông đẹp hơn trên các thiết bị chạy Android 12 đồng thời cung cấp trải nghiệm nhất quán trên các phiên bản Android cũ hơn.

### Những thay đổi trực quan
Không có gì ngạc nhiên khi những thay đổi về kiểu dáng và thiết kế là những thay đổi dễ thấy nhất đối với người dùng. Cập nhật các yếu tố hình ảnh như màu sắc và bán kính góc ngay lập tức mang đến một cái nhìn mới mẻ hơn. Để bắt đầu triển khai những thay đổi này, bạn nên tạo một custom theme.

#### Thêm Dynamic Colors
Bạn muốn hướng tới trải nghiệm người dùng tùy chỉnh hơn. Với Android 12, màu sắc động cho phé Widget của bạn nhất quán hơn với các widget khác và hệ thống. Các Widget có thể sử dụng theme mặc định của hệ thống là Theme.DeviceDefault.DayNight và sử dụng các color attributes trên các phần tử UI element của widget.

Để thực hiện việc này, bạn cần tạo một custom theme từ parent DeviceDefault cho các phiên bản android dưới 31.

```xml
values/themes.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->

<style name="Theme.AppWidget.AppWidgetContainer" 
    parent="@android:style/Theme.DeviceDefault" />
 ```
<br>
Đối với api level 31, sử dụn parent theme DeviceDefault.DayNight để tạo custom theme.

```xml
values-v31/themes.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->

<style name="Theme.AppWidget.AppWidgetContainer"  
    parent="@android:style/Theme.DeviceDefault.DayNight" />
```
Ngoài ra, nếu ứng dụng của bạn sử dụng Material Components thì bạn có thể sử dụng Theme.MaterialComponents.DayNight cho base theme thay vì Theme.DeviceDefault. 

Để làm cho widget của bạn áp dụng một cách linh hoạt các màu hệ thống, hãy set thêm vừa tạo cho cho widget và sử dụng các color attributes trên các view khác.

```xml
layout/widget_checkbox_list_title_region.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
...
<TextView android:id="@+id/checkbox_list_title"
    android:layout_width="0dp"
    android:layout_height="wrap_content"     
    android:layout_gravity="center_vertical" 
    android:layout_marginStart="8dp" 
    android:layout_weight="1" 
    android:text="@string/grocery_list" 
    android:textColor="?android:attr/textColorPrimary" />
<ImageButton
    android:layout_width="@dimen/widget_element_min_length"
    android:layout_height="@dimen/widget_element_min_length"
    android:background="?android:attr/selectableItemBackground"
    android:clickable="true"
    android:contentDescription="@string/add_button_grocery_list_content_description"
    android:src="@drawable/ic_add_24"
    android:tint="?android:attr/colorAccent" />
...
```
<br>

![image.png](https://images.viblo.asia/97e3db7e-645e-4ee9-892e-359144af5d1e.png)
<div align="center">Static colors với dynamic colors trên light/dark theme</div><br>

#### Bo tròn góc

Bắt đầu từ Android 12, các góc tròn được tự động áp dụng cho các widget. Điều này có nghĩa là nội dung của widget có thể bị cắt bởi tính năng che góc (corner masking) được áp dụng. Để tránh điều này và mang lại giao diện nhất quán hơn và trải nghiệm người dùng với các widget khác và hệ thống, bạn có thể sử dụng `system_app_widget_background_radius` để thêm các góc tròn vào đường viền của widget của mình và `system_app_widget_inner_radius` để thêm các góc tròn vào view trong widget. Giá trị này phải nhỏ hơn 8dp so với `system_app_widget_background_radius`.

Trong khi thực hiện việc này, cần lưu ý nếu widget của bạn có nội dung gần sát với các góc của nó, nội dung này có thể bị cắt. Để khắc phục điều này, bạn cần thêm đủ padding để tránh nội dung của widget chạm vào các góc bo tròn.

```xml
values/attrs.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<declare-styleable name="AppWidgetAttrs">
    <attr name="appWidgetPadding" format="dimension" />    
    <attr name="appWidgetInnerRadius" format="dimension" />
    <attr name="appWidgetRadius" format="dimension" />
</declare-styleable>
values/themes.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->

<style name="Theme.AppWidget.AppWidgetContainerParent" 
    parent="@android:style/Theme.DeviceDefault">
    <!-- Radius of the outer bound of widgets to make the rounded   
        corners -->
    <item name="appWidgetRadius">16dp</item>
    <!-- Radius of the inner view's bound of widgets to make the rounded corners. It needs to be 8dp or less than the value of appWidgetRadius -->
    <item name="appWidgetInnerRadius">8dp</item>
</style>
<style name="Theme.AppWidget.AppWidgetContainer" 
    parent="Theme.AppWidget.AppWidgetContainerParent">
    <!-- Apply padding to avoid the content of the widget colliding with the rounded corners -->
    <item name="appWidgetPadding">16dp</item>
</style>

values-v31/themes.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->

<style name="Theme.AppWidget.AppWidgetContainerParent" 
    parent="@android:style/Theme.DeviceDefault.DayNight"> 
    <item name="appWidgetRadius">
        @android:dimen/system_app_widget_background_radius</item>      
    <item name="appWidgetInnerRadius">
        @android:dimen/system_app_widget_inner_radius</item>
</style>

values/styles.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->

<style name="Widget.AppWidget.AppWidget.Container" 
    parent="android:Widget">
    <item name="android:id">@android:id/background</item>
    <item name="android:background">
        ?android:attr/colorBackground</item>
</style>
```
<br>

Nếu minTargetSDK của bạn thấp hơn 21, bạn cần tạo styl riêng cho version 21 vì `android:attr/colorBackground` được sử dụng trong các drawables yêu cầu API level 21.

Bây giờ bạn đã tạo được theme, bạn có thể set style cho layout của widget.

```xml
layout/widget_grocery_list.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<LinearLayout
    style="@style/Widget.AppWidget.AppWidget.Container">
    ...
</LinearLayout>
```
<br>

![image.png](https://images.viblo.asia/d3ff1e36-4094-4b00-9277-c675c7d83371.png)
<div align="center">Trước đây vs. Automatic corner masking vs. Rounded corners và applied padding</div><br>

#### Transitions
Android 12 cung cấp các transitions được cải thiện khi một ứng dụng được khởi chạy từ một widgeth. Transition này được hệ thống xử lý tự động và sẽ không hiển thị trên các phiên bản Android cũ hơn. Để kích hoạt tính năng này, bạn cần set một id và đặt giá trị của nó thành `android:id/background` trên root element của widget layout của bạn.

```xml
<LinearLayout
    android:id="@android:id/background">
    ...
</LinearLayout>
```
<br>

![image](https://miro.medium.com/max/700/0*ybgnQrfrJ2DBsPOP)
<div align="center">Transition in slow motion</div><br>

Nếu widget của bạn sử dụng [broadcast trampolines](https://developer.android.com/about/versions/12/behavior-changes-12?hl=ca#notification-trampolines), có nghĩa là widget của bạn tạo ra một `PendingIntent` khi người dùng bấm vào, để khởi chạy một activity từ broadcast receive hoặc service, animation này sẽ không được sử dụng.


### Cải tiến của widget picker

#### Previews

Android 12 có widget picker mới và cải tiến. Thay vì sử dụng  static drawable resource,  widget picker mới sử dụng layout XML để tạo một bản preview theo tỷ lệ widget của bạn.

Nếu widget của bạn không chứa các dynamic elements như ListView hoặc GridView, bạn có thể chỉ cần sử dụng widget’s layout để preview. Để làm cho nó hoạt động, bạn cần đặt trực tiếp các default values vào layout ban đầu.

```xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<TextView
    style="@style/Widget.AppWidget.Checkbox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/widget_title_preview" />
<TextView
    style="@style/Widget.AppWidget.Checkbox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/widget_subject_preview" />
```
<br>

Việc đặt các giá trị mặc định trên layout có thể gây ra độ trễ nhỏ khi giá trị placeholder được hiển thị trước khi giá trị thực được áp dụng. Để ngăn chặn điều này, bạn có thể tạo một file layout riêng cho bản preview và áp dụng custom preview theme.

```xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<resources>
    <!-- Declare attributes -->
    <attr name="widgetTitlePreview" format="string" />
    <attr name="widgetSubjectPreview" format="string" />
    <!-- Declare styles -->
    <style name="Theme.MyApp.Widget" 
        parent="@style/Theme.DeviceDefault.DayNight.AppWidget">
        <item name="widgetTitlePreview"></item>
        <item name="widgetSubjectPreview"></item>
    </style>
    <style name="Theme.MyApp.Widget.Preview">
        <item name="widgetTitlePreview">Preview Title</item>
        <item name="widgetSubjectPreview">Preview Subject</item>
    </style>
</resources>
```
<br>

Khi bạn có preview them, bạn có thể áp dụng nó cho preview item trong layout.

```xml
layout/my_widget_preview.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<LinearLayout ...>
    <include layout="@layout/widget_header"
         android:theme="@style/Theme.MyApp.Widget.Preview" /></LinearLayout>
layout/my_widget_actual.xml
<LinearLayout ...>
    <include layout="@layout/widget_header"
        android:theme="@style/Theme.MyApp.Widget" />
</LinearLayout>
```
<br>

Cuối cùng, bạn cần set widget’s layout để cho thuộc tính `previewLayout` của ` appwidget-provider`.

```xml
xml/app_widget_info_checkbox_list.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<appwidget-provider
    android:previewLayout="@layout/widget_grocery_list"
    ... 
/>
```
<br>

![image.png](https://images.viblo.asia/cb6cb657-ac8c-4ee0-84db-a21b035b7b3c.png)
<div align="center">Static preview vs. scaled preview</div><br>

Không thể set trực tiếp default values vào layout cho nhiều mục được hiển thị trong ListView, GridView hoặc Stack. Trong những trường hợp như vậy, bạn có thể tạo một layout khác cho bản widget preview và hard coded các preview item trong layout này.

Bạn nên tránh việc tránh việc sao chép toàn bộ layout và sử dụng thẻ <include> để sử dụng lại các phần của layout với các giá trị mặc định. Bạn có thể đặt bố cục mới này làm thuộc tính `previewLayout` của `appwidget-provider`.

#### Description

Bạn cũng có thể đặt thuộc tính description để cung cấp mô tả hiển thị trong  widget picker. Mặc dù điều này là tùy chọn, nhưng việc cung cấp mô tả có thể giúp người dùng hiểu rõ hơn những gì widget của bạn có thể làm.

```xml
app_widget_info_checkbox_list.xml
<!-- Copyright 2019 Google LLC.
SPDX-License-Identifier: Apache-2.0 -->
<appwidget-provider
   android:description="@string/app_widget_grocery_list_description"
   ... 
/>
```
<br>

![image.png](https://images.viblo.asia/0704aa11-0538-4542-bebc-472f353f49da.png)
<div align="center">Widget description</div><br>

### Tóm lược

Trong bài viết này, bạn đã thấy được cách cập nhật widget’s design và cung cấp trải nghiệm người dùng tốt hơn trong widget picker. Bạn có thể bắt đầu cập nhật các widget của mình cho Android 12 và người dùng của bạn sẽ ngay lập tức nhận thấy sự khác biệt trực quan. Ngoài ra bạn có thể tìm hiểu thêm [tại đây](https://developer.android.com/about/versions/12/features/widgets) về các API khác sẽ giúp widget của bạn được cá nhân hóa hơn, phản hồi nhanh hơn và cung cấp nhiều tương tác hơn.

### Nguồn bài viết
 - https://medium.com/androiddevelopers/updating-your-widget-for-android-12-92e7de87424c
 - https://developer.android.com/about/versions/12/features/widgets