# Mở đầu
Chắc hẳn việc load data và đổ lên Recycleview là công việc rất quen thuộc với các Dev Android chúng ta :3. Hôm nay mình xin giới thiệu với các bạn một animation xuất khi chúng ta bắt đầu đổ dữ liệu lên màn hình ;) Cùng bắt đầu nhé.
Như chúng ta đã biết có 2 cách để thay đổi animation của RecycleView khi bắt đầu xuất hiện nội dung là :
1. Implementing custom ItemAnimator
2. Thêm animation vào hàm onBindViewHolder() trong adapter
Ở phần này, chúng ta đi vào tìm hiểu 1 cách mới `LayoutAnimation`. Nó rất đơn giản và chỉ sử dụng số lượng code rất ít. Nó rất đáng chú ý và còn có thể sử dụng cho bất kì subclass nào của ViewGroup
# Tiến hành
1. Viết các file animation
*  Khởi tạo file item_animation_fall_down.xml trong thư mục res/anim/

```xml
<set xmlns:android="http://schemas.android.com/apk/res/android"
     android:duration="@integer/anim_duration_medium">

    <translate
        android:fromYDelta="-20%"
        android:toYDelta="0"
        android:interpolator="@android:anim/decelerate_interpolator"
        />

    <alpha
        android:fromAlpha="0"
        android:toAlpha="1"
        android:interpolator="@android:anim/decelerate_interpolator"
        />

    <scale
        android:fromXScale="105%"
        android:fromYScale="105%"
        android:toXScale="100%"
        android:toYScale="100%"
        android:pivotX="50%"
        android:pivotY="50%"
        android:interpolator="@android:anim/decelerate_interpolator"
        />

</set>

```

Ở đây chúng ta sử dụng Tween Animation để tạo hiệu ứng cho các item, nó có thẻ root là <set> và bên trong chứa các hiệu ứng của view như 
    
*    Alpha : Dùng để set độ mờ của của 1 view với độ mờ quy định là từ 0 đến 1

     
*    Scale : Làm cho một view nhỏ hơn hoặc lớn hơn dọc theo trục x hoặc trục y. Ta có thể chỉ định animation diễn ra xung quanh một điểm chốt (pivot point).
*   Translate : tịnh tiến một view dọc theo trục x hoặc trục y.
*    Rotate : quay một view quanh một điểm chốt theo một góc quay xác định.


   
   
*    Duration : Dùng để set thời gian diễn ra 1 animation

*  Interporator :   (nội suy) kiểu chạy

    @android:anim/accelerate_decelerate_interpolator - Tăng tốc, giảm tốc
    @android:anim/accelerate_interpolator - Tăng tốc

    @android:anim/anticipate_interpolator - (Biết trước) quay lên vị trí đầu, chạy tiếp
    @android:anim/anticipate_overshoot_interpolator - (Biết trước_Vượt qua) quay lên vị trí đầu, vượt qua vị trí cuối

    @android:anim/bounce_interpolator - (nẩy lên) nẩy lên ở vị trí cuối
    @android:anim/cycle_interpolator - (Vòng tròn) chạy qua lại đầu, cuối
    @android:anim/decelerate_interpolator - (Giảm tốc) Chậm dần

    @android:anim/linear_interpolator - (Thẳng) đều đều

    @android:anim/overshoot_interpolator - (Vượt qua) vượt qua vị trí cuối

    @android:anim/fade_in

    @android:anim/fade_out

    @android:anim/slide_in_left - Chạy từ trái qua

    @android:anim/slide_out_right - Chạy từ phải rồi mất
    
    
        
   Ở bài này mình dùng 3 animation là alpha, translate và scale ;) 
   
*  Translate Y -20% to 0% 
    
Trước khi bắt đầu load ta kéo view lên phía bên trên khoảng tầm 20% chiều cao của nó để nó có thể rạo hiệu ứng đổ xuống vị trí cuối cùng.


*    Alpha 0 to 1 
  
  Chỉnh độ mờ của view để nó xuât hiện từ từ
  
*   Scale X/Y 105% to 100%

Tỉ lệ co dãn được đặt để cho phép nó có thể thu dãn xuống cuối cùng.Làm view có cảm giác rơi xuống dưới


   
2. Định nghĩa Layout Animation xử dụng item animation

> layout_animation_fall_down.xml
> 
```xml
<?xml version="1.0" encoding="utf-8"?>
<layoutAnimation
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:animation="@anim/item_animation_fall_down"
    android:delay="15%"
    android:animationOrder="normal"/>
```

*  android:animation="@anim/item_animation_fall_down”

Định nghĩa animation nào được sử dụng

*  android:delay=”15%" 

Thời gian khi chuyển item

*  android:animationOrder="normal" 

Có 3 loại thường dùng là norml, reverse và random. Được sử dụng để kiểm soát thứ tự nội dung khi xuất hiện hiệu ứng. Normal thì sẽ xuất hiện theo thứ tự sắp xếp của layout (vertical thì sẽ xuất hiện theo thứ tự tư top đến bottom), reverse thì theo chiều ngược lại. Còn random thì sẽ xuất hiện theo thứ tự ngẫu nhiên.

3. Gắn Layout Animation

Chúng ta có thể sử dụng 1 trong 2 cách sau dể áp dụng Layout Animation
*  Bằng code
```kotlin
	val resId = R.anim.layout_animation_fall_down
	val animation = AnimationUtils.loadLayoutAnimation(context, resId)
	recyclerview.setLayoutAnimation(animation)
```

* Bằng xml

```xml
<android.support.v7.widget.RecyclerView
    android:layout_width="match_parent"
    android:layout_height="match_parent"                                        
    android:layoutAnimation="@anim/layout_animation_fall_down"/>
```

* Nếu bạn muốn thay đổi dữ liệu hoặc muốn reload lại animation thì bạn có thể sử dụng 

```kotlin
private fun runLayoutAnimation(recyclerView: RecyclerView) {
	val context = recyclerView.context
	val controller = AnimationUtils.loadLayoutAnimation(context, R.anim.layout_animation_fall_down)
	recyclerView.layoutAnimation = controller
	recyclerView.adapter!!.notifyDataSetChanged()
	recyclerView.scheduleLayoutAnimation()
}
```

# Custom thêm animation
### Slide from right

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
     android:duration="@integer/anim_duration_long">

    <translate
        android:interpolator="@android:anim/decelerate_interpolator"
        android:fromXDelta="100%p"
        android:toXDelta="0"
        />

    <alpha
        android:fromAlpha="0.5"
        android:toAlpha="1"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        />

</set>
```

> item_animation_from_right.xml
> 
```xml
<?xml version="1.0" encoding="utf-8"?>
<layoutAnimation
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:animation="@anim/item_animation_from_right"
    android:delay="10%"
    android:animationOrder="normal"
    />
```


### Slide from bottom

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
     android:duration="@integer/anim_duration_long">

    <translate
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:fromYDelta="50%p"
        android:toYDelta="0"
        />

    <alpha
        android:fromAlpha="0"
        android:toAlpha="1"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        />

</set>
```

> item_animation_from_bottom.xml
> 

```xml
<?xml version=1.0 encoding=utf-8?>
<layoutAnimation
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:animation="@anim/item_animation_from_bottom"
    android:delay="15%"
    android:animationOrder="normal"
    />
```

# Tham khảo
https://developer.android.com/guide/topics/graphics/view-animation


https://proandroiddev.com/enter-animation-using-recyclerview-and-layoutanimation-part-1-list-75a874a5d213

# Demo của mình
Các bạn có thể tham khảo tại github

https://github.com/ducvu212/LayoutAnimation


Cảm ơn các bạn đã theo dõi :D