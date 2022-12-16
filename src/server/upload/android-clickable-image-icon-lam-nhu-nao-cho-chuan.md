Clickable image là việc rất hay gặp khi dev Android, nghe qua thì có vẻ đơn giản nhưng liệu rằng các bạn đã thực hiện nó đúng cách hay chưa?

# Cách đơn giản nhất

Với case như vậy thì hầu hết chúng ta sẽ làm như sau:

```xml
<ImageView
     android:layout_width=”wrap_content”
     android:layout_height=”wrap_content”
     android:onClick=”toastLove”
     android:src=”@drawable/ic_favorite_border_black_24dp” />
```

Tuy nhiên làm như vậy không ổn cho lắm khi mà trên phương diện là người dùng thì thực sự rất khó để có thể nhấn vào nó, bạn hãy quan sát hình sau:

![](https://images.viblo.asia/695c9a16-9536-4b7b-bb7b-8da77b3e1bee.gif)

Lí do rất đơn giản là image size chỉ là `24dp`, khá nhỏ để có thể ấn dễ dàng. Để có thể xem size thực tế của view thì bạn có thể bật `Show Layout Bound` ở trong `Developer Option` và hình dưới đây là kết quả:

![](https://images.viblo.asia/a074d055-3abd-4952-aaf8-cd0234dfd80a.png)

# Mở rộng vùng chạm

Theo tài liệu về [Touch target size](https://support.google.com/accessibility/android/answer/7101858?hl=en) thì bất kì thành phần nào mà có thể click hay touch hoặc một tương tác gì khác nên có kích thước đủ lớn để tương tác, kích thước width và height được khuyến nghị ít nhất là `48dp` theo như tài liệu về [Material Design](https://material.io/design/usability/accessibility.html#layout-typography)

![](https://images.viblo.asia/a1a978d6-376d-4920-bad2-6bcd6f701dc1.png)

Avatar: 40dp

Icon: 40dp

Touch target on both: 48dp

![](https://images.viblo.asia/5b86bdfa-2e58-4a23-ad7b-ddadfbc32b4a.png)

## margin được không nhỉ?

```xml
<ImageView
     android:layout_width=”wrap_content”
     android:layout_height=”wrap_content”
     android:onClick=”toastLove”
     android:layout_margin=”12dp”
     android:src=”@drawable/ic_favorite_border_black_24dp” />
```

![](https://images.viblo.asia/bbe2aadb-0073-4b9e-ae0c-05ca8eacf21e.gif)

Thử click vào vùng margin xem nào, click event không được gọi rồi :(

## padding thì sao nhỉ?


```xml
<ImageView
     android:layout_width=”wrap_content”
     android:layout_height=”wrap_content”
     android:onClick=”toastLove”
     android:padding=”12dp”
     android:src=”@drawable/ic_favorite_border_black_24dp” />
```

![](https://images.viblo.asia/b6ea2047-98cf-4ad7-aeac-5f142bb09996.gif)

Click vào vùng padding nào, ngon, click event đã được gọi :grinning:

Đến đây xong chưa nhỉ, khoan đã vẫn còn một chút nữa

## Background và State

- Với image icon có normal state và pressed state thì không thành vấn đề, người dùng dễ dàng nhận ra image icon đang được nhấn chọn
- Với image icon chỉ có một state thì sao nhỉ

1. Dùng `android:background="?android:selectableItemBackground"`

Cách này cho bạn hiệu ứng ripple trên toàn bộ size thực tế của image icon. Về design thì hơi bị cứng vì các góc là vuông chứ không tròn như xu thế bây giờ.

2. Dùng ` style=”@style/Widget.AppCompat.ActionButton”`

Android đã cung cấp sẵn style với những thuộc tính chúng ta cần, kết quả là một hiệu ứng ripple được bo tròn như sau:

```xml
<ImageView
     style=”@style/Widget.AppCompat.ActionButton”
     android:layout_width=”wrap_content”
     android:layout_height=”wrap_content”
     android:onClick=”toastLove”
     android:src=”@drawable/ic_favorite_border_black_24dp” />
```

![](https://images.viblo.asia/ce8dd451-263a-4a58-bded-2f402851e276.gif)

Chi tiết hơn về cài đặt style:

```xml
<style name=”Widget.Material.ActionButton”>
     <item name=”background”>?attr/actionBarItemBackground</item>
     <item name=”paddingStart”>12dp</item>
     <item name=”paddingEnd”>12dp</item>
     <item name
        =”minWidth”>@dimen/action_button_min_width_material</item>
     <item name
        =”minHeight”>@dimen/action_button_min_height_material</item>
     <item name=”gravity”>center</item>
     <item name=”scaleType”>center</item>
     <item name=”maxLines”>2</item>
</style>
<dimen name=”action_button_min_width_material”>48dp</dimen>
<dimen name=”action_button_min_height_material”>48dp</dimen>
```

Thật ngắn gọn và tiện lợi phải không các bạn, hãy áp dụng ngay để user không phải khó khăn khi muốn click vào bất kì image icon nào nhé :+1:

# Tham khảo

https://medium.com/@elye.project/preferred-way-to-set-clickable-image-icon-95b0c88f3cd9

https://support.google.com/accessibility/android/answer/7101858?hl=en

https://material.io/design/usability/accessibility.html#layout-typography