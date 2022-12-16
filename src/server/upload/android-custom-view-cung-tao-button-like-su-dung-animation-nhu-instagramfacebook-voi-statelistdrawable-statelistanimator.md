# I. Giới thiệu
Trong ứng dụng android của bạn, chắc chắn rằng bạn đã từng làm việc với button và có thể là thay đổi trạng thái của button đó. 
Điều đó bạn có thể bắt gặp trong một số ví dụ như: Khi bạn like hoặc unlike một status trên instagram.
Nhưng nếu bạn để ý một chút, để không làm "khô khan" ứng dụng dụng của mình thì khi button like đó được thay đổi trạng thái các dev của instagram đã thêm animation cho nó. Trong bài viết này, mình cùng các bạn sẽ cùng nhau tìm hiểu và xây dựng animation với StateListDrawable giống như instagram nhé.

![](https://images.viblo.asia/7c9afe97-2437-46cc-b7bc-4ef6e4793f48.gif)
# II. StateListDrawable
- Trong android, định nghĩa của drawable rất linh hoạt. Nó có thể bao gồm bitmap, màu sắc và cũng có thể là các drawble khác.

- StateListDrawable là một công cụ tuyệt vời được cung cấp bởi android (mở rộng của Drawable) cho phép chúng ta có thể xác định nhiều drawable sẽ được chuyển đổi bởi android tuỳ thuộc vào trạng thái của một phần tử nào đó

- StateListDrawable xác định trước các trạng thái mà một phần tử có thể có. Có thể kể đến như: state_checked, state_pressed, state_focussed,...

## 1. Tạo icon like
Bạn có thể  tìm thấy icon like trong chính Android Studio của mình, bằng cách File > New > Vector Asset và click vào icon Android để hiện thị danh sách các icon

![](https://images.viblo.asia/19900b02-5887-4313-840f-efe2339cbb54.png)

Sau khi tạo xong icon, bạn có thể chỉnh sửa màu cho chúng trong drawable

## 2. Tạo file ic_like.xml
ic_like.xml là StateListDrawable, nó xác định icon trạng thái của nút like

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:state_checked="true"
        android:drawable="@drawable/ic_favorited_red_24dp"/>

    <item
        android:drawable="@drawable/ic_favorite_border_black_24dp"/>

</selector>
```

Nhìn nó khá đơn giản, chúng ta định nghĩa trong thẻ <selector> nó bảo gồm tất cả các trạng thái mà chúng ta muốn định nghĩa hay custom drawable/properties
    
   - Thẻ item sau định nghĩa trạng thái của button khi được checked
   
```xml
    <item
        android:state_checked="true"
        android:drawable="@drawable/ic_favorited_red_24dp"/>
```
   
   - Thẻ item sau định nghĩa mặc định khi button show hoặc khi unchecked

```xml
 <item
        android:drawable="@drawable/ic_favorite_border_black_24dp"/>
```
        
## 3. File activity.xml demo
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.framgianguyenvanthanhd.likeanimation.MainActivity">

    <CheckBox
        android:id="@+id/btn_like"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:button="@null"
        android:background="@drawable/ic_like"
        android:checked="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Điều mà chúng ta quan tâm ở đây là:

```xml
<CheckBox
        android:id="@+id/btn_like"
        ...
        android:button="@null"
        android:background="@drawable/ic_like"
        android:checked="false"
        ...
        .../>
```

Một câu hỏi đặt ra là tại sao lại dùng CheckBox mà không phải là ImageView hay ImageButton hay là Button. Câu trả lời là chúng ta có thể  dễ dàng kiểm tra trạng thái của CheckBox được cung cấp bởi Android

Sau khi xong các bước trên, ứng dụng của chúng ta sẽ chạy như sau:
![](https://images.viblo.asia/976af3cf-0405-4a35-9f82-9267299019ff.gif)
Trông có vẻ cũng ổn đó, nhưng để "ngầu" hơn thì chúng ta sẽ thêm vào đó animation nhé...

# III. StateListAnimator
- Để tạo animation sinh động hơn cho button trên, chúng ta sẽ sử dụng StateListAnimator

- Nó hoạt động cũng tương tự như StateListDrawable. Trong <selector> bạn có thể xác định các hình trạng thái khác nhau của phần tử, vì chúng ta đang mô phỏng instagram nên chúng ta sẽ làm tăng kích thước đầu tiên của button sau đó quay trở lại kích thước ban đầu của chúng

## 1. Tạo animation

Để thêm animation, chúng ta sẽ tạo thêm thư mục trong res với tên anim và thêm vào đó file anim_scale.xml 

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_checked="true">
        <set xmlns:android="http://schemas.android.com/apk/res/android">
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="5dp"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.0"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="1.0"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="0dp"
                android:valueType="floatType" />

        </set>

    </item>

    <item>
        <set>
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="5dp"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.0"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="1.0"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:startOffset="@android:integer/config_shortAnimTime"
                android:valueTo="0dp"
                android:valueType="floatType" />
        </set>
    </item>
</selector>
```

Nhìn nó khá phức tạp, nhưng có thể hiểu đơn giản như sau:

```xml
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleX"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="scaleY"
                android:valueTo="1.550"
                android:valueType="floatType" />
            <objectAnimator
                android:duration="@android:integer/config_shortAnimTime"
                android:propertyName="translationZ"
                android:valueTo="5dp"
                android:valueType="floatType" />
```

Chúng ta định nghĩa cho objectAnimation với một giá trị X tăng từ 1 đến 1.550, tương tự với Y, và Z tăng lên 5dp
Tương tự, chúng ta sẽ đặt giá trị trừ 1.550 về  1 và 5dp về 0dp. Nếu bạn chú ý thì icon của chúng ta sẽ to lên xong sẽ trở lại kích thước ban đầu

## 2. Thêm animation

Sau khi tạo xong file anim_scale.xml chúng ta sẽ thêm vào thuộc tính của CheckBox như sau:

```xml
<CheckBox
        android:id="@+id/btn_like"
        ...
        android:stateListAnimator="@anim/anim_scale"
        ...
        ... />
```

## 3.Kết quả
Sau khi làm theo các bước trên ứng dụng của chúng ta sẽ hoạt động như sau:

![](https://images.viblo.asia/c6045104-e95c-42d1-8c89-52cd68aedc0e.gif)

# IV. Kết luận
Trên đây chúng ta đã tìm hiểu StateListDrawable và StateListAnimator và demo nút like theo instagram. 

Cảm ơn các bạn đã theo dõi bài biết của mình!

**Link**
- github: https://github.com/oNguyenVanThanhD/Animation_Like_Demo
- ref: https://android.jlelse.eu/using-statelistanimators-to-create-instagram-like-animation-db2676c9391