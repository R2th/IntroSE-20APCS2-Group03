![](https://miro.medium.com/max/3048/1*bz8gy0o_tryvknKkx2moAw.png)

[BottomNavigationView](https://developer.android.com/reference/android/support/design/widget/BottomNavigationView) tạo các thanh điều hướng phía dưới, giúp bạn dễ dàng khám phá và chuyển đổi giữa các chế độ xem nội dung cấp cao nhất chỉ bằng một cú chạm. Mẫu này có thể được sử dụng khi bạn có từ 3 đến 5 mục để điều hướng đến.

### Chuyện gì xảy ra khi có quá 3 mục điều hướng

Khi ứng dụng của chúng tôi có 3 điểm đến cấp cao nhất, thành phần sẽ tự động phân phối chúng đồng nhất giữ cùng khoảng cách và chỉ áp dụng phần đệm, tăng một chút kích thước của chú thích và kiểu in đậm khi được chọn.

![](https://miro.medium.com/max/984/1*rVHokpY5bQK6WDDUozZ0Jw.gif)

Bây giờ, nếu ứng dụng của chúng tôi có nhiều hơn 3 điểm đến cấp cao nhất, hành vi mặc định của bottomNavlationView là kích hoạt một cái gì đó có tên là chế độ thay đổi. Trong chế độ này khi một mục từ thành phần được chọn, một hình động để tăng phần tử được hiển thị cũng như hiệu ứng thu nhỏ trên các phần khác:

![](https://miro.medium.com/max/984/1*2iM1Z4zYU5IMG26FZtvS0w.gif)

Đôi khi hiệu ứng này không phải là thứ chúng ta cần trong ứng dụng của mình, sau đó chúng ta cần áp dụng một hướng dẫn đơn giản nhưng không nổi tiếng để đạt được điều gì đó tương tự như hành vi cơ bản giống như trường hợp cơ bản khi có 3 điểm đến cấp cao nhất. Hướng dẫn này là nhãnVisibilityMode từ không gian làm việc của ứng dụng:

```
<android.support.design.widget.BottomNavigationView
    android:id="@+id/main_bottom_navigation"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_marginBottom="0dp"
    android:layout_marginEnd="0dp"
    android:layout_marginStart="0dp"
    android:background="@color/bottombar_background"
    android:theme="@style/Widget.BottomNavigationView"
    app:itemBackground="@color/bottombar_background"
    app:itemIconTint="@drawable/bottomnav_item_color"
    app:itemTextColor="@drawable/bottomnav_item_color"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:labelVisibilityMode="labeled"
    app:menu="@menu/main_bottom_navigation" />
```

**labeled** sẽ giữ cho tất cả các nhãn có thể nhìn thấy.

**unlabeled** sẽ chỉ hiển thị các biểu tượng.

**selected** sẽ chỉ hiển thị nhãn cho mục đã chọn và các mục dịch chuyển. 

**auto** sẽ chọn nhãn hoặc chọn dựa trên số lượng vật phẩm chúng tôi đã dán nhãn cho 1 mặt hàng3 và chọn cho hơn 3 mặt hàng.

![](https://miro.medium.com/max/1252/1*tj22GloRRPWRYOOHS8YmoQ.png)
> app:labelVisibilityMode=”unlabeled” → No shift mode
 
![](https://miro.medium.com/max/1252/1*jgOQEsXf8_19BXWt0yEJFQ.png)
> No app:labelVisibilityMode applied → See the shift mode

![](https://miro.medium.com/max/1264/1*te8pz-0s5mstPUQjWC8sDA.png)
> app:labelVisibilityMode=”labeled” → No shift mode
 
### Làm thế nào để thay đổi giao diện của Label
Khi triển khai bottomNavestionView cách hiển thị các biểu tượng và văn bản trong chế độ xem là thông qua **app:menu** Hướng dẫn chỉ thị bố cục menu sẽ sử dụng.

```
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/bottomnav_home"
        android:icon="@drawable/bottomnav_home"
        android:title="@string/title_home" />

    <item
        android:id="@+id/bottomnav_my_stuff"
        android:icon="@drawable/bottomnav_my_stuff"
        android:title="@string/title_my_stuff" />

    <item
        android:id="@+id/bottomnav_notifications"
        android:icon="@drawable/bottomnav_notifications"
        android:title="@string/title_notifications" />

    <item
        android:id="@+id/bottomnav_search"
        android:icon="@drawable/bottomnav_search"
        android:title="@string/title_search" />

    <item
        android:id="@+id/bottomnav_tools"
        android:icon="@drawable/bottomnav_tools"
        android:title="@string/title_tools" />
</menu>
```

Nhưng nếu chúng ta cần thay đổi tiêu đề phông chữ hoặc kích thước văn bản, điều mà chắc chắn chúng ta sẽ cần phải làm, cách duy nhất và dễ nhất để làm là tạo một kiểu tùy chỉnh và đặt nó làm chủ đề:

```
<!-- Bottom Navigation -->
<style name="Widget.BottomNavigationView" parent="Widget.Design.BottomNavigationView">
    <item name="fontFamily">@font/helvetica_neue_medium</item>
    <item name="android:textSize">9sp</item>
    <item name="android:textStyle">bold</item>
</style>
```

Điều này sẽ giúp chúng tôi tiết kiệm rất nhiều thời gian để cố gắng thực hiện cùng một chương trình hoặc sử dụng một cách khác như thêm thư viện của bên thứ ba.

Ngoài ra, xem xét các thành phần vật liệu cho mã nguồn Android, cụ thể là tệp attrs.xml, nó có thể cung cấp cho chúng tôi một số thông tin chi tiết để hiểu các tùy chọn nào có sẵn cho Trò chơi và các giá trị tương ứng của chúng để đáp ứng các yêu cầu thiết kế của chúng tôi hoặc giảm bớt .xml để xác định kích thước hiện tại, thông tin này là vàng.

Tôi đã xem và đọc một số câu hỏi và câu trả lời trên các diễn đàn khác nhau về bottomNavlationComponent, và hầu hết tất cả chúng đều được tóm tắt về những gì tôi đã chia sẻ với bạn về bài viết này. Hãy cho tôi biết nếu bạn có một mẹo khác hoặc một câu hỏi khác và có thể trong số tất cả cũng có thể trả lời nó.

Source: [Some tips to a better experience working with Android’s BottomNavigationView](https://proandroiddev.com/some-tips-to-a-better-experience-working-with-androids-bottomnavigationview-2a224c687c1f)