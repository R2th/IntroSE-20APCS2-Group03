Chào các bạn đến với ***Chapter 1: Novice and Competent*** trong **Series**: [Mastering Android Themes](https://viblo.asia/s/mastering-android-themes-chapter-i-zD5dBoRWZjY)

Trong phần nàỳ mình sẽ đi qua cac vấn đề chính khi chúng ta phát triển style and theme cho ứng dụng android
Okey, bắt đầu nào

## Novice
Trong số chúng ta hẳn là ai cũng từng Hardcode với những string, color, dimens hay cả trong code (java, kotlin).... nhỉ. Yên tâm đê, bạn không cô đơn đâu, đó như là một điều tất yếu khi code, khi mà deadline dí, hay đơn giản là "bố  cứ code tạm để cho chạy đã, tý bố thay vào resource-value sau" ==> tý bố quên cmnl -_-

###
Đây là một ví dụ siêu kinh điển:

```xml
<TextView
    android:id="@+id/heading"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="10dp"
    android:textColor="#000022"
 />
```

##
##### ====> Đừng làm thế 
Đoạn code trên thực sự là một đoạn code THỐI (thối lắm ấy). Sao nó lại thối, bây giờ có thể bạn cóc quan tâm vì nó vẫn đang chạy ngon vãi cả chưởng, nhưng một ngày mưa gió nào đó bạn đọc lại nó và maintain thì...cũng đau đầu phết đấy.
Giả sử cái `android:textColor="#000022"` được viết ở 100 chỗ, rồi thằng designer nó bảo bạn thay đổi màu sắc cho vừa lòng ông khách hàng, rồi sao, đi tìm 100 chỗ đấy mà lại thay từng chỗ một (ngu_nguoi). Thực ra trên Android Studio có support vụ change something all in one, nhưng làm cách đó rất không chuyên nghiệp. Nên nhớ rằng, mỗi khi bạn hardcode là bạn đang tự gây thêm rắc rối cho mình trong tương lai.
###
> Okay, khi bạn đạt đến trình độ không hardcode bất cứ thứ gì thì bạn đã đến được level 2: **Competent** 

## Competent
Hầu hết các lập trinh viên có kinh nghiệm đều đã trải qua giai đoạn hardcode của mình và họ nhận ra rằng điều đó là không nên. Vậy họ làm thế nào. Đơn giản là họ không hardcode nữa. Họ sẽ maitains theo từng lọai resource khác nhau: colors, dimens,.... Sau đấy họ sẽ refers các resource đó tới bất kì đâu mà họ muốn. Dưới đây là một ví dụ:
####
*color.xml*
```xml
<resources>
<color name="primary">#222B2B</color>
<color name="primaryDark">#222224</color>
<color name="white">#FFFFFF</color>
<color name="black">#000000</color>
</resources>
```

###
*dimen.xml*
```xml
<resources>
    <dimen name="padding_16">16dp</dimen>
    <dimen name="padding_12">12dp</dimen>
</resources>
```

###
*Usage in xml*
```xml
<TextView
    android:id="@+id/heading"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="@dimen/padding_16"
    android:textColor="@color/black"
 />
```

Yeah, cho đến thời điểm hiện tại, nó vẫn chưa phải là giải pháp hoàn hảo,nhưng nó hoạt động tốt cho hầu hết các trường hợp.
Thực chất, nó cũng tương đưuơng hardcode **16dp** và **#000000** nhưng nó cũng đem lại một số lợi ích nhất định, khi thay đổi mã mầu thì tất cả chỗ nào dùng tự động thay đổi theo chẳng hạn. Sau tất cả thì nó vẫn không nên sử dụng, nó gần như kiểu Bạn đến phòng tập gym nhưng vẫn uống bia và ăn nhậu. Vậy vấn đề ở đây là gì?
####
> Điều gì xảy ra nếu design thay đổi và bạn cần phải tạo ra padding chuẩn là 12dp chứ không phải 16dp nữa, hoặc text color thay đổi từ black sang dark-gray. Bạn sẽ xử lý dư nào?
####
Bây giờ quay lại bài toán maintain bất tử, bạn sẽ phải tìm và thay tất cả padding_16 thành padding_12, 'đờ-phúc'. Lại chả khác gì so với cách cũ nhể.
####
##### ====> Đừng làm thế 
Điều này chắc chắn là tốt hơn hardcode nhưng nó vẫn chưa giải quyết được mục đích cuối của chúng ta. Style and Themes của chúng ta phải dễ đọc và dễ maintain hơn nữa

## Competent++ 
Các nhà phát triển đã có kinh nghiệm trong nghề, thì họ sẽ biết cách làm thế nào để code của họ dễ đọc và dễ maintain nhất có thể. Và đương nhiên là họ KHÔNG hardcode bất cứ thứ gì. Họ luôn tạo ra những đoạn code có thể tái sử dụng để sử dụng ở bất cứ đâu họ cần. Xem ví dụ này nhé:

###
*Styles.xml*
```xml
<style name="heading_text_style">
    <item name="android:textColor">@color/black</item>
    <item name="android:textSize">18dp</item>
    <item name="android:layout_marginLeft">8dp</item>
    <item name="android:layout_marginRight">8dp</item>
    <item name="android:layout_marginTop">4dp</item>
    <item name="android:layout_marginBottom">4dp</item>
    <item name="android:layout_width">match_parent</item>
    <item name="android:layout_height">wrap_content</item>
</style>
```
###
*or*
```xml
<style name="heading_text_style">
    <item name="android:textColor">@color/black</item>
    <item name="android:textSize">@dimen/size_16</item>
    <item name="android:layout_marginLeft">@dimen/margin_8</item>
    <item name="android:layout_marginRight">@dimen/margin_8</item>
    <item name="android:layout_marginTop">@dimen/margin_8</item>
    <item name="android:layout_marginBottom">@dimen/margin_8</item>
    <item name="android:layout_width">match_parent</item>
    <item name="android:layout_height">wrap_content</item>
</style>
```
###
*Usage of style*
```xml
<TextView
    android:id="@+id/heading"
    android:style="@style/heading_text_style"
/>
```

Bây giờ, tương tự như **heading_text_style**, chúng ta cần phải tạo thêm nhiều style trong app và sử dụng chúng ở mọi nơi mà ta cần. Nếu như design có thay đổi, bạn chỉ cần tìm file styles.xml và update style đó. 
Ngon chưa, chắc chắn nó là tốt nhất cho đến thời điểm hiện tại. Nó dễ đọc, dễ maintain nữa. Thực ra nó vẫn còn vấn đề đấy =)) Nhưng để dành cho Chapter2 nha.
###
---
#### Tài liệu tham khảo
- [Medium](https://medium.com/mindorks/mastering-android-themes-chapter-1-4aadfa750ca7)
- [Android](https://developer.android.com/guide/topics/ui/look-and-feel/themes)