# I. Introduction

![](https://images.viblo.asia/5c068803-6202-4f6f-94c5-1961900feb5f.jpeg)


Khi xây dựng một ứng dụng phần mềm, là một developer việc đầu tiên ta cần quan tâm là sản phẩm đảm bảo hệ thông hoạt động một cách trơn chu và sự hài lòng của người dùng khi sử dụng ứng dụng.  Thiết kế UX / UI đóng một vai trò thiết yếu trong việc đạt được mục tiêu này. Trong bài viết này mình sẽ chia sẻ một số mẹo và thủ thuật giúp bạn có thể thiết kê UI/UX một cách tốt hơn. 

Một trong những quy tắc quan trọng nhất là phản hồi UI cho người dùng.

# Delight == Good UI + Good UX

Trong ứng dụng của bạn, không phải tất cả đều **clickable/selectable/checkable/actionable**. Một số khái niệm về trạng thái của các view trong Android như : state_pressed, state_checked, state_selected, state_enabled...

## Good UI

Thật tốt nếu bạn có thể xây dựng các phản hồi UI dựa trên các trạng thái mà user tác động vào ứng dụng. Nó tạo ra sự tự nhiên hơn với người dùng và đôi khi không có chúng chắc chắn sẽ gây khó chịu. Giờ thì thử xem các cách triển khai điều này nhé :grin: 

### 1. Ripple Effect (state_touched)

Kể từ khi xây dựng Material Theme, gợn sóng (ripple) là cách mà Android thể hiện một cái gì có có thể thao tác được (actionable). Khi user chạm vào view có thể thao tác, View đó sẽ hiển thị hiệu ứng gợn sóng. Mặc định, hầu hết các clickable view hiển thị hiệu ứng này nhưng thỉnh thoảng bạn cần custom UI và không may hiệu ứng này biến mất. Đây là cách bạn lấy lại hiệu ứng này :
~~~java
android:background="?android:attr/selectableItemBackground"  (1)
OR
android:foreground="?android:attr/selectableItemBackground" (2)
~~~
Nếu view của bạn không có background, bạn có thể sử dụng cách (1). Đôi khi bạn cần custom background, hãy sử dụng cách (2) thay thế.

### 2. Themed View Components

Nhiều khi bạn cần custom color cho các Button, Checkbox... Mình từng thấy các dev sử dụng drawable để hiển thị các trạng thái khác nhau ( checked, clicked, selected..) Nên nhớ, cố gắng không đi lệch khỏi hệ thống càng nhiều càng tốt. Hãy tận dụng những thứ có sẵn. Bên dưới là một số keyword để hiển thị các component hệ thống với các hành vi mặc định :
~~~java
Button with custom colour
android:backgroundTint="@color/red"
-----
Radio Button with custom colour
android:buttonTint="@color/red"
-----
Images & Icons
android:drawableTint="@color/red"
-----
ProgressBar with custom colour
android:progressTint="@color/red"
~~~

### 3. Shadow below components

Để hiển thị bóng bên dưới các component như cardview là sử dụng thuộc tính độ cao (elevation)
~~~java
android:elevation="1dp"
~~~

### 4. Merge tag and parent property

Nếu bạn muốn kiểm soát UI nhiều hơn, hãy sử dụng các thẻ hợp nhất. Tạo các XML riêng biệt cho các thành phần UI nhỏ, sử dụng ở nhiều nơi và include nó trong UI chính của bạn.
Bên dưới là một ví dụ :
~~~java
<LinearLayout>
    <include layout="@layout/light_expanded_card" />
    <include layout="@layout/light_collapsed_card" />
    <include layout="@layout/color_indicator_strip" />
</LinearLayout>
~~~

~~~java
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:parentTag="android.widget.LinearLayout">
~~~

### 5. ViewStub

Sử dụng ViewStub cho các view cần điều kiện để hiển thị và tần suất rất thấp. ViewStub sẽ không được inflated vào layout nếu không được gọi.
Nếu chưa biết gì về ViewStub. Hãy đọc qua ở đây nhé : https://developer.android.com/training/improving-layouts/loading-ondemand

###  6. Width/Height

Hãy nhớ 2 điều, luôn xây dựng UI một cách linh hoạt và không bao giờ hardcode kích thước (dimensions) trừ khi nó là cách duy nhất. Các designer sẽ hỏi bạn fixed width-height để đảm bảo nó trông đẹp. Đó không phải lỗi của họ, hãy cố gắng hiểu những gì họ muốn và sử dụng kiến thức của bạn để thực hiện nó một cách đúng đắn.

Một số cách đơn giản như xây dựng bộ dimenstion theo từng độ phân giải màn hình, xác định min_width, max_width, min_height, max_height.. .

### 7. Text size dp vs sp

Nếu bạn xác định kích thước văn bản bằng **dp**, bạn đang sai ?
Nếu bạn xác định kích thước văn bản bằng **sp**, bạn đang đúng ?
Trên thực tế, không có đúng hay sai ở đây. Với những người mới bắt đầu, thậm chí là từng có x năm kinh nghiệm vẫn hay gặp lỗi này. Họ sử dụng **dp** hoặc là **sp** trong toàn bộ ứng dụng.
Hãy kiểm tra lại :

- dp : "density independent pixels" = mật độ pixel độc lập.
- sp : "scale independent pixels" = tỉ lệ pixel độc lập.

Việc giải thích dp, sp nằm ngoài phạm vi của bài viết này. sp = dp * hệ số tỉ lệ. Android cho phép người dùng thiết lập kích thước văn bản theo sở thích của mình. 

![](https://images.viblo.asia/f3503db8-ce70-43c8-bad2-dda1d40cd77d.png)

Có một yếu tố tỉ lệ liên quan đến từng kích thước, Ví dụ, hay coi medium = 1, large = 1.5, small = 0.8 và micro = 0.5.

Vì vậy 100dp và 100sp sẽ giống nhau khi user không thay đổi cài đặt này. Nếu không sp = dp * hệ số tỉ lệ.

Quay trở lại câu hỏi, ta nên dùng cái nào và khi nào thì dùng nó ?

Hãy ngồi với designer của bạn và hỏi xem những phần văn bản nào họ không muốn thay đổi kích thước ngay cả khi người dùng thay đổi setting. Khi đó hãy sử dụng dp. Nếu không hãy sử dụng sp.

Note : thông thường với những văn bản bị hạn chế tiêu đề dòng đơn ( single line heading ), banner lỗi, văn bản có hình ảnh và biểu tượng là một phần của thiết kế và nên sử dụng dp. Một số văn bản kiểu free như mô tả, thông tin... có thể dùng sp.

##  Summary 

Trên đây là những chia sẻ của mình về tips & trick để xây dựng UI tốt hơn, Trong bài viết sau, mình sẽ chia sẻ tiếp làm sao để thiết kế UX tốt . Hẹn gặp ở bài viết sắp tới, chúc các bạn coding vui vẻ ^^

* [UX/UI tips & trick](https://medium.com/mindorks/android-ui-ux-tips-tricks-f7f838dac92f)
* [Android UI](https://developer.android.com/guide/topics/ui)