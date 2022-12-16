Hẳn là bạn đã từng gặp trường hợp dở khóc, dở cười khi cu Leader của bạn bắt bạn phải custom ra một cái TextView mà thay đổi đc size khi mà cái nội dung hoặc cái layout cha của nó thay đổi kích cỡ, và cái TextView đó của bạn cũng phải support auto-size với các thiết bị có kích thước khác nhau. Ngon !! ông nào rảnh thì ngồi lọ mọ tìm hiểu, ông nào lười thì lên bố nó github tìm libs, và có ối thư viện làm được điều đó, nhưng từ nay chúng ta đã có thể sử dụng Auto-sizing TextView do chính anh Gú gồ support.

![](https://images.viblo.asia/cce482a0-3ab8-4977-9929-e6710f5e17bc.jpg)

Với Android 8 (Api level 26) hoặc cao hơn, bạn có thể sử dụng TextView mà cho phép tự động thay đổi size để vẽ trên layout cha dựa vào các đặc tính và ranh giới bố cục của TextView. Cài đặt này giúp dễ dàng tối ưu TextSize trên các màn hình có kích thước khác nhau của các devices khác nhau với nội dung động.
Thư viện Android Support 26 hỗ trợ đầy đủ tính năng AutoSize TextView trên những thiết bị có   ***Android 4 (Api lv14) < VERSION < Android 8 (Api lv 26)*** . Ahihi, Gói android.support.v4.widget chứa TextViewCompat cho phép truy cập các tính năng theo kiểu tương thích ngược.

### Cài đặt AutoSizeTextView 
Các bạn có thể sử dụng *framework* hoặc *support library* để sử dụng được *AutoSize TextView* bằng Code hoặc bằng Xml.
Có 3 cách để bạn để để cài đặt AutoSizing TextView:
* Default
* Granularity
* Preset Sizes

> Chú cmn ý: Nếu bạn set *autosizing* trong XML thì không nên sử dụng thuộc tính *wrapcontent* cho *layoutwidth* và *layoutheight* cho TextView. Nó có thể gây ra kết quả không mong muốn.


### Default [Mặc định]
Default cho phép Autosizing scale theo cả chiều ngang và chiều dọc 
* Để khai báo *default setting* trong code Java hoặc Kotlin, hãy gọi phương thức **setAutoSizeTextTypeWithDefaults(int autoSizeTextType)**. Sử dụng **AUTO_SIZE_TEXT_TYPE_NONE** để tắt autosizing hoặc **AUTO_SIZE_TEXT_TYPE_UNIFORM** để scale theo cả chiều ngang và nhiều dọc một cách đồng đều.
> Chú cmn ý: dimensions mặc định khi scale là :
>  
    > minTextSize = 12sp
    > 
    > maxTextSize = 112sp
    > 
    > granularity = 1px (mức độ chi tiết)
    
    
* Để khai báo default setting trong XML, sử dụng *android* namespace và set thuộc tính *autoSizeTextType* là *none* hoặc *uniform*.

```
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android:layout_width="match_parent"
    android:layout_height="200dp"
    android:autoSizeTextType="uniform" />
```


**Using support library**

* Để khai báo *default setting* thông qua thư viện support, gọi phương thức **TextViewCompat.setAutoSizeTextTypeWithDefaults(TextView textview, int autoSizeTextType)** truyền vào một instance của một TextView và một trong 2 type *TextViewCompat*.**AUTOSIZETEXTTYPENONE** hoặc *TextViewCompat.**AUTOSIZETEXTTYPEUNIFORM***

* Để khai báo *default setting* trong XML thông qua thư viện support, sử dung *app* namespace và set thuộc tính *autoSizeTextType* là *none* hoặc *uniform*.

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <TextView
      android:layout_width="match_parent"
      android:layout_height="200dp"
      app:autoSizeTextType="uniform" />

</LinearLayout>
```

### Granularity [Mức độ chi tiết]

Bạn có thể khai báo khoảng *minimum* đến *maximum* size của TextView và một *dimension* chỉ định cho size của mỗi lần tăng kích thước. TextView sẽ scale trong khoảng từ *minimum* đến *maximum* size. Mỗi lần tăng kích thước xảy ra, nó sẽ tăng mức độ chi tiết theo thuộc tính *granularity*.
* Để định nghĩa khoảng *minimum*, *maximum* và một *dimension* trong code, gọi phương thức **setAutoSizeTextTypeUniformWithConfiguration(int autoSizeMinTextSize, int autoSizeMaxTextSize, int autoSizeStepGranularity, int unit),** truyền vào các giá trị *minimum*, *maximum*, *granularity* và đơn vị TypeValue.
* Để định nghĩa khoảng *minimum*, *maximum* và một *dimension* trong XML, sử dụng *android* namespace và set một số thuộc tính sau đây
    * set *autoSizeText* là *none* hoặc *uniform*
    * set *autoSizeMinTextSize*, *autoSizeMaxTextSize* và *autoSizeStepGranularity* 
```
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android:layout_width="match_parent"
    android:layout_height="200dp"
    android:autoSizeTextType="uniform"
    android:autoSizeMinTextSize="12sp"
    android:autoSizeMaxTextSize="100sp"
    android:autoSizeStepGranularity="2sp" />
```

**Using support library** 

* Để định nghĩa khoảng *minimum*, *maximum* và một *dimension* trong XML, gọi phương thức **TextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(int autoSizeMinTextSize, int autoSizeMaxTextSize, int autoSizeStepGranularity, int unit)**, truyền vào các giá trị *minimum*, *maximum*, *granularity* và đơn vị TypeValue.

* Để định nghĩa khoảng *minimum*, *maximum* và một *dimension* trong XML thông qua thư viện support, sử dung *app* namespace và set *autoSizeText*, *autoSizeMinTextSize*, *autoSizeMaxTextSize*, và *autoSizeStepGranularity* trong layout XML

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <TextView
      android:layout_width="match_parent"
      android:layout_height="200dp"
      app:autoSizeTextType="uniform"
      app:autoSizeMinTextSize="12sp"
      app:autoSizeMaxTextSize="100sp"
      app:autoSizeStepGranularity="2sp" />

</LinearLayout>
```

### Preset Sizes

*Preset sizes* cho phép bạn chỉ định rõ ràng tất cả các giá trị mà TextView sẽ khi nó tự động *auto-sizing* text. 

* Để sử dụng *preset sizes* thiết lập autosizing TextView trong code, gọi phương thức **setAutoSizeTextTypeUniformWithPresetSizes(int[] presetSizes, int unit)** truyền vào mảng size và đơn vị TypeValue
* Để sử dụng *preset sizes* trong XML, sử dụng *android* namespace và set các thuộc tính sau:
    * set *autoSizeText* là *none* hoặc *uniform*
    * set *autoSizePresetSizes* là một loạt các kích thước sẽ set size cho TextView. Mảng array resouce này nên khai báo trong *res/values/arrays.xml*

```
<resources>
  <array name="autosize_text_sizes">
    <item>10sp</item>
    <item>12sp</item>
    <item>20sp</item>
    <item>40sp</item>
    <item>100sp</item>
  </array>
</resources>
```

```
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android:layout_width="match_parent"
    android:layout_height="200dp"
    android:autoSizeTextType="uniform"
    android:autoSizePresetSizes="@array/autosize_text_sizes" />
```

**Using support library**

* Sử dụng *preset sizes* trong code thông qua thư viện support, gọi phương thức **TextViewCompat.setAutoSizeTextTypeUniformWithPresetSizes(TextView textView, int[] presetSizes, int unit)**, truyền vào instance của TextView, một mảng size và đơn vị TypeValue

* Sử dung *preset sizes* trong XML thông qua thư viện support, sử dung *app* namespace, set thuộc tính *autoSizeText* và *autoSizePresetSizes* trong XMLXML

```
<resources>
  <array name="autosize_text_sizes">
    <item>10sp</item>
    <item>12sp</item>
    <item>20sp</item>
    <item>40sp</item>
    <item>100sp</item>
  </array>
</resources>
```

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <TextView
      android:layout_width="match_parent"
      android:layout_height="200dp"
      app:autoSizeTextType="uniform"
      app:autoSizePresetSizes="@array/autosize_text_sizes" />
</LinearLayout>
```

### Additional resources

Chắc anh, chị, em đọc hết bài rồi nhể, bonus cho video có iem gái xuynh đẹp nói về Autosizing TextView nè:
https://www.youtube.com/watch?v=JYrpEAz_A1U



### Tham khảo
* [TextView](https://developer.android.com/reference/android/widget/TextView)
* [TypedValue](https://developer.android.com/reference/android/util/TypedValue)
* [Autosizing](https://developer.android.com/guide/topics/ui/look-and-feel/autosizing-textview)