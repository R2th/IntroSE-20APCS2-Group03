Hin chào, đây là chapter 2 trong loạt bài [Mastering Android Themes ](https://viblo.asia/s/mastering-android-themes-zD5dBoRWZjY). Nếu các bạn chưa đọc [chapter1](https://viblo.asia/p/mastering-android-themes-chapter-i-djeZ10dQKWz) thì tôi khuyến cáo bạn nên đọc nó trước khi chúng ta vào chapter2 này.

Ok, ở chap1 chúng ta đã thống nhất với nhau rằng không được hardcode bất cứ thứ gì và sẽ làm cho các style có khả năng tái sử dụng nhiều lần. Cùng xem những expert developer của chúng ta cải thiện cách tiếp cận cuối cùng từ các đồng nghiệp có kinh nghiệm như thế nào nhé.

Note: Chapter này tập chung vào phần Theme basic với design language. Nếu bạn chỉ muốn học về theme thôi, thì bạn có thể đọc chapter3 luôn cũng được. Tuy nhiên mình khuyến khích các bạn nên đọc bài này trước.

### I. Developer level - Expert
![](https://images.viblo.asia/c024e130-d059-4c90-aaaa-a41ed9bd3371.gif)

Các expert developers cảm thấy tự hào khi họ viết code/xml một cách tốt nhất theo phạm vi yêu cầu của project. Khi nói nến Styling, họ sẽ nói ngay đến *design language* 

### II. Design Language
Nhớ lại rằng, những devs có kinhg nghiệm sử dụng styles hoặc là hard-code hoặc là đặt tên gần giống với values: 
```xml
<style name="heading_text_style">
    <item name="android:padding">8dp</item>
</style>
```
hoặc 
```xml
<style name="heading_text_style">
    <item name="android:padding">@dimen/padding_8</item>
</style>
```
Vấn đề với cách tiếp cận cũ là không có nền tảng chung giữa các Designer và Developer. Họ không hiểu nhau trong từng ngữ cảnh  và các Devs có xu hướng sử dụng cùng một resource-reference ở nhiều nơi, vấn đề này dẫn đến việc maintain sẽ khó khắn sau này. Ví dụ, Thay đổi padding content của tất cả các Card-View từ 8 lên 16 có vẻ là không dễ dàng vì bạn đang dùng **padding_8** cho tất cả các View chứ không phải riêng cho Card-View. Dùng sẵn vài tools trong Android Studio có thể giúp bạn bớt cực, nhưng nó vẫn khá là khó khăn để maintain và nó ảnh hưởng tới phạm vi đọc code của chúng ta.

Expert Devs hiểu ra chìa khóa để Project successful là tương tác giữa các team với nhau. Nói cách khác, một dự án sẽ fail nếu như các ràng buộc giữa các team ko rõ ràng, sai lệch hoặc mơ hồ. Design và dev team cần phải tương tác với nhau mỗi ngày. Và thảo luận 2 điều sau 

###
##### Discussion1:
Designer to deverloper: làm cho text trong card-view màu đen , margin 16dp giữa các item trên Home page vì content sẽ padding 8dp và margin 8dp so với thằng view cha ==> Các devs có một chút kinh nghiệm ở chương 1 thường làm điều này

###
##### Discussion2:

Designer to developer: thay đổi text từ ‘content_text_color’,thay đổi margin giữa các items từ ‘content_margin’ thành ‘window_padding’. Tất cả các giá trị này đều nằm trong tài liệu thiết kế mà team design chia sẻ

###
##### D1 vs D2
Thảo luận 1 là một ví dụ về thiết kế trước và các dev tương tác với các giá trị chính xác có phần hỗn loạn mỗi lần thay đổi như thế. Các devs không hiểu lý do và dễ phát sinh ra lỗi.

Tuy nhiên ở thảo luận số 2, chúng ta đã thấy sinh khác biệt. Ở đây sẽ không có sự nhầm lẫn. Chúng ta có tài liệu để tham khảo, và các tài liệu này rất ít lỗi. Các devs có thể tạo ra các resoure files của họ từ Ngôn ngữ thiết kế và họ sử dụng cùng quy tắc đặt tên với files thiết kế. Để tôi cho bạn xem một vài ví dụ:
###
###### Usage in xml

```xml
<TextView
    android:id="@+id/heading"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"       
    android:textSize="@dimen/text_size_h1"
    android:padding="@dimen/text_content_padding"
    android:textColor="@color/content_text"
 />
```
###
###### Usage in styles
```xml
<style name="heading_text_style">
    <item name="android:textColor">@color/content_text</item>
    <item name="android:textSize">@dimen/text_size_h2</item>
    <item name="android:layout_margin">@dimen/text_content_margin</item>
    <item name="android:layout_width">match_parent</item>
    <item name="android:layout_height">wrap_content</item>
</style>
```
###### With
```xml
<TextView
    android:id="@+id/heading"
    android:style="@style/heading_text_style"
/>
```

###
Sử dụng phương pháp đề cập ở trên trở nên dễ dàng để tương tác và thực hiện thiết kế với mọi tính năng mới. Nó sẽ tăng tốc độ nhóm của bạn 2x
###
##### Bây giờ, chúng tôi đã đồng ý về ngôn ngữ thiết kế là khía cạnh quan trọng của một dự án. Chúng tôi sẽ sử dụng nó trong mọi dự án.

Ai sẽ định nghĩa ngôn ngữ thiết kế? Đề nghị của tôi là các nhà thiết kế nên đưa ra một ngôn ngữ thiết kế khi họ có hiểu biết về tất cả các thành phần được sử dụng trong một sản phẩm. Tuy nhiên, họ nên ngồi với các nhà phát triển để đưa ra một thuật ngữ phổ biến dựa trên nền tảng họ đang làm việc. Đừng trốn tránh nó, hãy là một đồng đội tốt. 
###
##### Theme & Style
Styling cho giao diện người dùng của bạn có nghĩa là gán mã màu và kích thước cho các thuộc tính khác nhau. Giống như màu text, kích thước của icon, kích thước văn bản, nền của màn hình, v.v.
Styles là một dạng bộ sưu tập tài nguyên có thể tái sử dụng được. Nhân tiện, một theme cũng là một tập hợp các tài nguyên làm thay đổi giao diện của sản phẩm của bạn. Sự khác biệt nhỏ là bạn áp dụng theme trên một mức độ lớn hơn, còn bạn thường áp dụng style ở cấp độ chi tiết. Sự khác biệt rất tinh tế đến mức không có theme resource trong Android. Chỉ có style resource. Bạn áp dụng theme với nhiều styles 
```xml
android:theme="@style/ThemeGrey"
```

###
### III. Tổng kết
Chuyên gia là những nhà phát triển có kinh nghiệm có khả năng hiểu được sức mạnh của ngôn ngữ thiết kế chung, tạo điều kiện cho việc tương tác, dễ đọc và bảo trì. Họ cũng tạo ra các styles bất cứ khi nào cần thiết và cộng tác với các nhà thiết kế cho một ngôn ngữ thiết kế. Họ xác định các styles hoạt động như theme với các thuật ngữ mạnh được sử dụng.

###
### IV. Tài liệu tham khảo
- [Medium](https://medium.com/mindorks/mastering-android-themes-chapter-2-79d5092aca5)
- [Android](https://developer.android.com/guide/topics/ui/look-and-feel/themes)