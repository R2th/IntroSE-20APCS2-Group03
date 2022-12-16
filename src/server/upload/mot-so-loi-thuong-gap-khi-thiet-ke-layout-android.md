Chúng ta, với tư cách là nhà phát triển Android, chắc hẳn đều quá quen thuộc với file xml, nơi mà ta thiết kế giao diện cho ứng dụng của mình.Chắc hẳn kỹ năng mà chúng ta thành thạo nhất trong quá trình phát triển Android là làm việc với xml bởi vì chúng ta làm việc đó hàng ngày, trong mọi tính năng và cho mọi phần giao diện người dùng. Quay lại ngày xưa khi `ConstraintLayout` ra mắt như một cách tiếp cận mới để thực hiện công việc thiết kế layout, layouting đã trở nên ngon ngẻ hơn. Lợi ích của `ConstraintLayout` là không thể phủ nhận, tuy nhiên, mọi người vẫn thường mắc một số sai lầm làm mất đi tất cả những lợi ích này.

Trong bài viết này, chúng ta hãy tìm hiểu một số lý do khiến chúng ta mắc phải sai lầm đó nhé:
# 1. Đánh giá quá thấp ConstraintLayout
ConstraintLayout là một `ViewGroup` mạnh mẽ có thể vẽ hầu hết mọi màn hình (từ các cách sử dụng đơn giản đến phức tạp). Có rất ít trường hợp ConstraintLayout không thể hoàn thành công việc. Khi nói tới ConstraintLayout, tức là nói tới thư viện `ConstraintLayout` cung cấp không chỉ ConstraintLayout mà còn cung cấp một bộ công cụ đi kèm với nó như: `Group`, `Barrier`, `Guideline`, `Flow`, `Layer`, v.v. Tất cả chúng cung cấp cho chúng ta sức mạnh để bố trí một cách rất hiệu quả.

Tuy nhiên, vẫn có những người sử dụng `ConstraintLayout` theo cách mà chúng ta đã từng làm trong kỷ nguyên của RelativeLayout và LinearLayout. Nó có nghĩa là họ tạo các bố cục lồng nhau bên trong ConstraintLayout. Mục tiêu cuối cùng của ConstraintLayout là làm phẳng bố cục thành một lớp duy nhất, do đó, nếu bạn thấy bố cục của mình có nhiều lớp với ConstraintLayout làm là layout root, có thể sẽ có cách để tối ưu hóa bố cục đó hơn nữa. Hơn nữa còn có một số người còn  không thèm dùng ConstraintLayout, họ coi việc sử dụng các RelativeLayout là quen thuộc và không thấy  được việc sử dụng layout mới kia có tác dụng gì. Đúng là những suy nghĩ bảo thủ và cần phải thay đổi . Mình sẽ viết 1 bài viết để giải thích rõ điều này. Các bạn chờ thêm nhé !!! . Đã có link r nhé các bạn , Check tại [đây](https://viblo.asia/p/ban-co-thuc-hieu-su-hieu-ve-qua-trinh-ve-view-gGJ59Mbr5X2) nhé 

> Don’t add nested layouts, ConstraintLayout can do more than you think.

# 2. Lạm dụng ConstraintLayout
Như mình đã nói ở phía trên, ConstraintLayout rất mạnh mẽ; nó có một thuật toán rất phức tạp để tính toán và định vị tất cả các khung nhìn bên trong nó ( Cassowary thì phải , lâu rồi đầu óc quên hết =)) ) . Do đó, nó có hiệu suất thấp hơn nhiều so với các `ViewGroup` khác như `LinearLayout` ( khi không sử dụng weight ) hoặc `FrameLayout`, v.v.

> ConstraintLayout should be used only when there is no other way to achieve the same result with FrameLayout or LinearLayout.

Nếu bạn gặp những thứ như dưới đây, bạn nên xem xét cấu trúc lại nó ngay lập tức
```php
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
>
    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/photo"
        />

</androidx.constraintlayout.widget.ConstraintLayout>
```

```php 
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/tv_top"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/tv_middle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tv_top" />

    <TextView
        android:id="@+id/tv_below"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tv_middle" />


</androidx.constraintlayout.widget.ConstraintLayout>
```

Hai file xml này có thể được hoàn thành đơn giản hơn với FrameLayout và LinearLayout tương ứng. Chúng ta sẽ dùng constrant layout với những layout phức tạp hơn , lúc đó hiệu năng của nó mới được thể hiện rõ ràng 

Biểu đồ nhỏ bên dưới cho thấy sự khác biệt về hiệu suất giữa ConstraintLayout so với LinearLayout và FrameLayout khi mà view của ta quá đơn giản 
![](https://miro.medium.com/max/600/1*8O47G0Etl9p3f1_abXS1Dg.png)

# 3. Có phải mọi layout đều bắt đầu với một ViewGroup?
Trong Android, tồn tại nhiều giả định sai lầm đã trở thành thói quen của nhiều developer. Bắt đầu một tệp xml với một trong các `ViewGroup` được xác định trước là một giả định như vậy. Bạn đã bao giờ nhìn thấy bố cục này và hỏi FrameLayout làm gì trong trường hợp này?
```php
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/tv_top"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</FrameLayout>
```

Vâng câu trả lời là chả làm cái quái gì cả
> ViewGroup is fundamentally used to group a group of Views. In other words, there must be at least 2 views so that a ViewGroup can really do its job.
> 
Một trường hợp rất phổ biến là các item rong RecyclerView. Chúng đôi khi không chứa nhiều hơn một TextView hoặc một ImageView. Do đó, chỉ cần sử dụng trực tiếp widget là đủ:
```php
<?xml version="1.0" encoding="utf-8"?>
<TextView 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" 
    tools:text="Item"/>
```
Một trường hợp phức tạp hơn một chút là văn bản có biểu tượng ở đầu/cuối/trên/dưới thì 
![](https://miro.medium.com/max/515/1*V8Xif8pFQvXP_7iNSd1ldA.png)

Mọi người thường nghĩ đến việc sử dụng `FrameLayout` hoặc `LinearLayout` (và đôi khi, thậm chí là ConstraintLayout) với `TextView` và ImageView để vẽ được view này. Tuy nhiên, có một sự thật là TextViews có thể cung cấp nhiều hơn bạn nghĩ. Đối với chế độ xem này, ta sẽ sử dụng TextView đơn giản với `drawableEnd` là xong :
```php
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:text="Item"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/background_corner_10"
    android:drawableEnd="@drawable/ic_arrow"
    android:padding="16dp" />
```
`TextView` cung cấp cho chúng ta khả năng vẽ tối đa 4 biểu tượng theo 4 hướng bắt đầu / kết thúc / trên / dưới. Hãy tận dụng chúng nhé

# 4. Có phải thẻ  included layout phải bắt đầu với container (ViewGroup)?
`<include>` là một thẻ rất hữu ích giúp chúng ta sử dụng lại bố cục hoặc tránh tạo một file xml quá dài.

Quay lại mục đích của ConstraintLayout: nó làm phẳng hệ thống phân cấp của `views`. Giả sử rằng chúng ta thêm một thẻ `<include>`  để nhập một bố cục vào main layout được bao phủ bởi ConstraintLayout, nếu bố cục thêm vào  là một ViewGroup như một vùng chứa của một tập hợp các chế độ xem con bên trong nó, chúng ta có tổng cộng ít nhất 2 lớp. Do đó, điều này phá vỡ nguyên tắc sử dụng ConstraintLayout.
Chúng ta làm gì bây giờ?
> Always utilize the <merge> tag to keep the layout as slight as possible.

    
Làm thế nào về việc sử dụng lại layout ở những nơi khác nhau với dữ liệu khác nhau?
Nó khá đơn giản với sự trợ giúp của databinding. Giả sử rằng chúng ta muốn sử dụng lại một button mà text có thể thay đổi:
```php
<?xml version="1.0" encoding="utf-8"?>
<layout>
    <data>
        <variable
            name="buttonText"
            type="String"
            />
    </data>
    <merge 
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
 tools:parentTag="androidx.constraintlayout.widget.ConstraintLayout"
        >

        <Button
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            style="@style/ButtonSave"
            android:text="@{buttonText}"
            tools:text="Validate"
            />
    </merge>
</layout>
```
Trong main layout, chúng ta thêm thẻ  `<include>`  và truyền `buttonText`
```php
<include
    layout="@layout/button_validate"
    bind:buttonText="@{@string/validate}"
    >
```

Như bạn có thể thấy, không có lớp nào được tạo nữa, bây giờ bạn có thể tự do đặt `buttonText` trong các màn hình khác nhau
# 5. Cân nhắc giữa  performance code vs clean and scalable code.
Cuối cùng nhưng cũng không kém phần quan trọng, kể cả code logic lẫn code layout , performance code và clean code luôn luôn được đặt lên bàn cân để xem xét 
Nhìn vào hình ảnh này 
![](https://miro.medium.com/max/700/1*b6BTT2GWn_OV2j5grVsabQ.png)

Chúng ta có một danh sách các tùy chọn  trong Settings. Thông thường, chúng ta nghĩ đến việc sử dụng RecyclerView để làm việc này một cách dễ dàng. Tuy nhiên, khi xem xét kỹ hơn, danh sách này là tĩnh và được xác định trước và chúng ta có tất cả dữ liệu ngay từ đầu rồi . Điều đó làm cho việc dùng RecyclerViews trở nên hơi quá. Như kiểu giết gà dùng dao mổ trâu . Hơn nữa, vấn đề với RecyclerViews là chúng thêm ít nhất 2 lớp vào cấu trúc phân cấp: một là bản thân RecyclerView dưới dạng ViewGroup và lớp kia là  cho `itemView` nếu nó phải là một view phức tạp.
Do đó, sẽ phải có sự đấu tranh để lựa chọn giữa một layout sạch / có thể bảo trì / có thể mở rộng và hiệu quả / hiệu năng.

Không có câu trả lời thỏa đáng cho câu hỏi này, nó phụ thuộc vào tình hình thực tế với các thông số kỹ thuật khác nhau. Nếu danh sách nhỏ và chúng ta khá chắc chắn rằng sẽ không có bất kỳ bảo trì nào về phần này, chúng ta nên chọn bố cục một lớp với một số đoạn code trùng lặp được chấp nhận. Tuy nhiên, nếu danh sách lớn đến mức bạn có thể làm rối loạn tệp xml với hàng tá khối tương tự hoặc bạn biết rằng ứng dụng khách sẽ yêu cầu nhiều tùy chọn hơn trong các phiên bản tiếp theo, thì nên sử dụng RecyclerViews để thực hiện công việc.
Vẫn còn một tiêu chí cuối cùng mà bạn có thể dựa vào nếu bạn thấy mình không thể quyết định lựa chọn nào tốt hơn:
> User experience always comes before all. Users do not care about how clean your codes are, they only care about how your apps perform.

Trên đây là một số điểm về layout mà mình gặp phải thường xuyên trong công việc . Nếu bạn tìm thấy bất kỳ vấn đề tương tự nào khác, hãy chia sẻ chúng trong phần bình luận nhé.

Bài viết này được dịch từ trang [Medium](https://medium.com/swlh/some-common-mistakes-in-doing-layout-in-android-a8ee035f199c). Cảm ơn sự quan tâm của mọi người :100::heart_eyes::100::heart_eyes: