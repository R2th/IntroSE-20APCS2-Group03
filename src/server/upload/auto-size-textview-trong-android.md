![](https://images.viblo.asia/86b8ff95-973e-4d1c-9f7b-4ab087e33536.jpg)

Đôi khi, chúng ta cần `TextView` thay đổi kích thước văn bản theo nội dung được đặt trong đó. Tuy nhiên, Android đã không có nhiều hỗ trợ phần này cho đến khi Android O. Và sau đó thì Android đã đưa ra thư viện hỗ trợ cho tính năng này. Bây giờ chúng ta hãy xem nó hoạt động như thế nào nhé.

Đầu tiên, tôi thêm thư viện support v26 trở lên vào file `build.gradle`.

```
implementation 'com.android.support:appcompat-v7:26.1.0'
implementation 'com.android.support:support-v4:26.1.0'
```

hoặc

```
    implementation 'com.android.support:appcompat-v7:27.1.1'
    implementation 'com.android.support:support-v4:27.1.1'
```

Mặc dù, nó đã được giới thiệu trong Android O, nhưng thông qua việc sử dụng thư viện hỗ trợ, tính năng này tương thích từ Android 4.0 trở lên.Bây giờ, thêm một `TextView` như tôi thường làm.

``` 
<TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="150dp"
        android:background="@color/colorPrimaryDark"
        android:text="@string/text"
        android:textColor="@android:color/white"
        />
```

Và ta thêm thuộc tính ` android:autoSizeTextType="uniform"` vào trong `TextView` .

```
<TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="150dp"
        android:background="@color/colorPrimaryDark"
        android:text="@string/text"
        android:textColor="@android:color/white"
        tools:targetApi="o"
        />
```
 
 Và bây giờ thì size của `TextView`  sẽ tự động điều chỉnh theo độ rộng của `TextView`
 Khi không có thuộc tính ` android:autoSizeTextType="uniform"`
 
![](https://images.viblo.asia/a8d5d77e-29a6-434a-a5e4-e6b4fb5613a8.png)

Và khi được thêm thuộc tính `android:autoSizeTextType="uniform"`

![](https://images.viblo.asia/e05504ce-a824-416d-8d77-3102741dd044.png)

Ngoài cách thêm trực tiếp bằng xml như thế này thì bạn còn có thể thêm bằng Java Code
```
TextViewCompat.setAutoSizeTextTypeWithDefaults(mTextViewAutoSize,
                TextViewCompat.AUTO_SIZE_TEXT_TYPE_UNIFORM);
              
 ```
               
Lưu ý, bạn không nên set thuộc tính `wrap_content` cho `layout_width` và `layout_height` cho thuộc tính của `TextView`. nó sẽ ra một kết quả khác đấy

Tuy nhiên, thuộc tính này không phải là thuộc tính duy nhất, vẫn còn thuộc tính khác. Nhưng ` uniform` là loại mặc định , nhưng vẫn có 2 cách điều chỉnh kích thước văn bản theo yêu cầu của tôi.
1. Granularity (Mức độ chi tiết)
2. Preset Sizes (Thiết lập kích thước)

### 1.Granularity (Mức độ chi tiết)
Trong mức độ chi tiết, `TextView` quy mô có thể thống nhất, trong phạm vi giữa các thuộc tính kích thước tối thiểu và tối đa đã cho. Mỗi lần gia tăng tính theo kích thước thì `Text_View`  được chỉ định trong thuộc tính độ chi tiết đã được đặt ra.
Trong XML, chúng ta có thể làm điều đó bằng cách thêm những thuộc tính này vào `TextView`:

```
android:autoSizeMaxTextSize="100sp"
        android:autoSizeMinTextSize="10sp"
        android:autoSizeStepGranularity="1sp"
        android:autoSizeTextType="uniform"
```

Hoặc ta có thể sử dụng trong Java Code bằng cách này :

```
TextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(mTextViewAutoSize, 10, 100, 1,
                TypedValue.COMPLEX_UNIT_SP);
 ```
                
### 2. Preset Sizes (Thiết lập kích thước)
Bằng cách sử dụng kích thước được đặt trước, bạn có thể tự động hóa `TextView` từ danh sách các kích thước được xác định trước.
Trong XML, hãy sử dụng `autoSizePresetSizesautoSizePresetSizes` thuộc tính trong `TextView`.

Trước tiên, tôi tạo một list trong  `res/values/arrays.xml`.

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <array name="text_size_auto">
        <item>5sp</item>
        <item>10sp</item>
        <item>15sp</item>
        <item>25sp</item>
        <item>35sp</item>
        <item>45sp</item>
        <item>55sp</item>
    </array>
</resources>
```

và khai báo thuộc tính trong `TextView`

```android:autoSizePresetSizes="@value/text_size_auto"```

Hoặc trong Java Code

```
int[] listTextSize = getBaseContext().getResources().getIntArray(R.array.text_size_auto);
        TextViewCompat.setAutoSizeTextTypeUniformWithPresetSizes(mTextViewAutoSize, listTextSize,
                TypedValue.COMPLEX_UNIT_SP);
```

Trên đây là hướng dẫn của tôi. Nếu có gì sai sót mong các bạn thông cảm.