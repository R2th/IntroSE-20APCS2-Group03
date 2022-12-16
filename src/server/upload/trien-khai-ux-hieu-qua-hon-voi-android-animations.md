# Mở đầu
Khi quá chú trọng vào chức năng của ứng dụng, ta có thể sẽ đánh giá thấp sự ảnh hưởng của trải nghiệm người dùng. Đa phần người dùng sẽ không thích những ứng dụng không có sự hấp dẫn về mặt trực quan. Để tạo ra sự khác biệt cho ứng dụng, chúng ta cần cung cấp cho các chức năng của ứng dụng một bộ `Animations`.

**Lấy một ví dụ:**
Ta cần một ứng dụng đặt bánh pizza trong đó người dùng có thể đặt bánh pizza với một số lượng tùy chỉnh. Bây giờ bạn sẽ giới thiệu ca sử dụng này như thế nào?

Dưới đây là một ví dụ mà bạn có thể tham khảo:

![](https://images.viblo.asia/56e85a8b-4592-4023-bdad-4619b88384d6.gif)

Điều cần thiết bây giờ là ta cần chuyển đổi ảnh GIF trên thành code để triển khai trong ứng dụng. Công việc nghe có vẻ không hề dễ dàng. Đầu tiên ta cần quan sát kĩ, thậm chí có thể cần phải làm chậm tốc độ của ảnh GIF lại để có thể theo dõi chính xác những gì đang diễn ra. Hãy để ý kĩ và kiểm tra từng màn hình một:
* Màn hình danh sách pizza
* Màn hình tùy biến
* Theo dõi màn hình giao hàng của bạn


Bây giờ ta có một sự hiểu biết tốt hơn về thiết kế. Giờ là thời điểm để chuyển đổi nó thành mã code.

# Màn hình Pizza List
Màn hình này đang hiển thị một danh sách các loại pizza và bằng cách nhấp vào nút `CUSTOMIZE`, ứng dụng điều hướng đến một màn hình khác với hình ảnh bánh pizza của màn hình hiện tại và đế bánh pizza của màn hình khác.
Bằng cách thêm một vài dòng code chúng ta có thể đạt được điều này:
```php
customiseButton.setOnClickListener {
    val intent = Intent(this, CustomiseActivity::class.java)
    val options = ActivityOptionsCompat
        .makeSceneTransitionAnimation(
            this, 
            pizzaImageView as View, 
            "pizza")
    startActivity(intent, options.toBundle())
}
```

Đừng quên thêm đoạn code dưới đây vào file `styles.xml` của bạn:
```php
<item name="android:windowContentTransitions">true</item>
```

# Màn hình Customization
Ở đây chúng ta cần rất nhiều animations. Trước khi bắt đầu về màn hình này, hãy tìm hiểu một chút về [ObjectAnimator](https://developer.android.com/reference/android/animation/ObjectAnimator), [ValueAnimator](https://developer.android.com/reference/android/animation/ValueAnimator) và [AnimationSet](https://developer.android.com/reference/android/view/animation/AnimationSet).
* `ObjectAnimator`: Lớp con này của `ValueAnimator` cung cấp hỗ trợ cho hoạt ảnh các thuộc tính trên các đối tượng đích.
* `ValueAnimator`: Lớp này cung cấp một công cụ thời gian đơn giản để chạy các animation, tính toán các giá trị animated và đặt chúng trên các đối tượng đích.
* `AnimationSet`: Đại diện cho một nhóm Animations được biểu diễn cùng nhau. Ta cần hiển thị nhiều `animation` đồng thời hoặc theo thứ tự liên tục. `AnimationSet` là phù hợp nhất cho việc này.

## AnimateCheeseHeight
Khi bắt đầu màn hình này, ta nhận thấy có thể điều khiển chiều cao của lớp phô mai tăng lên. Vì vậy, chúng ta cần sử dụng `ValueAnimator`. Ta cần tăng chiều cao từ 10dp đến 30dp, và cần cập nhật giá trị với `AnimatorUpdateListener`. Từ đó ta nhận được giá trị chiều cao được cập nhật và cập nhật các thông số bố cục của `PizzaCheeseImageView`.

```php
val anim = ValueAnimator.ofInt(pizzaCheeseImageView.measuredHeight, height)
    anim.addUpdateListener { valueAnimator ->
        val value = valueAnimator.animatedValue as Int
        val layoutParams = pizzaCheeseImageView.layoutParams
        layoutParams.height = value
        pizzaCheeseImageView.layoutParams = layoutParams
    }
    anim.duration = 300
    anim.start()
```
## AnimateCrustHeight
Với việc chiều cao lớp phô mai tăng lên, ta cũng cần tăng chiều cao của lớp vỏ bánh. Ta cũng sử dụng `ValueAnimator`. Ngoài ra khi chiều cao tăng, ta cần thay đổi cả bán kính góc để cung cấp hình dạng đồng nhất cho hình ảnh của đế bánh hoặc lớp phô mai. Vì vậy ta sẽ cập nhật đồng thời cả 2 thông số chiều cao và bán kính góc của `PizzaCrustImageView`
```php
val anim = ValueAnimator.ofInt(pizzaCrustImageView.measuredHeight, height)
    anim.addUpdateListener { valueAnimator ->
        val value = valueAnimator.animatedValue as Int
        val layoutParams = pizzaCrustImageView.layoutParams
        layoutParams.height = value
        pizzaCrustImageView.layoutParams = layoutParams
        pizzaCrustImageView.radius = value.div(2).toFloat()
    }
    anim.duration = 300
    anim.start()
```

## AnimateToppings
Khi người dùng chọn một topping, ta cần hiển thị một hình ảnh động rơi xuống từ đỉnh màn hình đến phía trên phô mai của pizza. Ta đang sử dụng `ObjectAnimator` vì nó có một thuộc tính được gọi là `translationY`, giúp tạo các lớp phủ để animate từ vị trí `intialY` đến vị trí `destinationY`. Ngoài ra, ta đang sử dụng `AccelerateInterpolator` giúp tăng tốc dần `animations`.
```php
ObjectAnimator.ofFloat(toppingsLayout,"translationY", 0f, toppingsLayout.height.toFloat() - 12f).apply {
        interpolator = AccelerateInterpolator()
        duration = 600
        start()
    }
```

## AnimatePizzaLayout
Như chúng ta có thể quan sát rằng nhiều `animation` đang diễn ra, vì vậy ta có thể chia chúng thành nhiều phần.

*FadeCheeseAnimation*
```php
val fadeCheese = ObjectAnimator.ofFloat(pizzaCheeseImageView, "alpha", 1f, 0f)
```

*FadeCrustAnimation*
```php
val fadeCrust = ObjectAnimator.ofFloat(pizzaCrustImageView, "alpha", 1f, 0f)
```

*FadeInPizzaAnimation*
```php
val fadeInPizza = ObjectAnimator.ofFloat(pizzaImageView, "alpha", 0f, 1f)
```

*ScaleUpPizzaXAnimation*
```php
val scaleUpPizzaX = ObjectAnimator.ofFloat(pizzaImageView, "scaleX", 0f, 0.8f)
```

*ScaleUpPizzaYAnimation*
```php
val scaleUpPizzaY = ObjectAnimator.ofFloat(pizzaImageView, "scaleY", 0f, 14f)
```

*TranslatePizzaYAnimation*
```php
val translatePizzaY = ObjectAnimator.ofFloat(pizzaImageView, "translationY", 0f, -360f)
```

*PlayAnimationsTogether*
```php
AnimatorSet().apply { 
  play(fadeCheese).with(fadeCrust).with(fadeInPizza).with(scaleUpPizzaX).with(scaleUpPizzaY).with(translatePizzaY)
}
```

# Theo dõi màn hình Delivery
Trong màn hình này, chúng ta cần làm `animation` phần trước của hộp và xoay hộp với giá trị `scaling` và `translation`.
## AnimateFrontCover
Chúng tôi cũng có thể sử dụng [ViewPropertyAnimator](https://developer.android.com/reference/android/view/ViewPropertyAnimator) thay vì `ObjectAnimator` cho `animation`. Bằng cách sử dụng `ViewPropertyAnimator`, chúng ta có thể thực hiện nhiều `animation` cùng nhau mà không cần sử dụng `AnimatioSet`. Nó cung cấp một cú pháp tốt hơn và một cách tối ưu hóa để làm sinh động một khung nhìn.

```php
frontCoverImageView
        .animate()
        .translationY(790f)
        .setDuration(300)
        .setListener(object : Animator.AnimatorListener {
            override fun onAnimationEnd(animation: Animator?) {
                backCoverImageView.visibility = VISIBLE
                backCoverImageView.alpha = 1f
                pizzaImageView.visibility = GONE
                frontCoverImageView.visibility = GONE
                rotateBoxAnimation()
            }
        })
        .startDelay = 500L
```

## RotateBoxAnimation 
Một lần nữa chúng ta có thể tách nhỏ các `animation`:
*ScaleDownXAnimation*
```php
val scaleDownX = ObjectAnimator.ofFloat(backCoverImageView, "scaleX", 1f, 0.6f)
```

*ScaleDownYAnimation*
```php
val scaleDownY = ObjectAnimator.ofFloat(backCoverImageView, "scaleY", 1f, 0.6f)
```

*RotateBoxAnimation*
```php
val rotateBox = ObjectAnimator.ofFloat(backCoverImageView, "rotation", 0f, -45f)
```

*TranslateXAnimation*
```php
val translateX = ObjectAnimator.ofFloat(backCoverImageView, "translationX", 0f, 1000f)
```

*PlayAnimationsTogether*
```php
AnimatorSet().apply {
    play(scaleDownX).with(scaleDownY).with(rotateBox).before(translateX)    
}
```


# Showtime
Chạy code và thưởng thức thành quả thôi nào!
![](https://images.viblo.asia/0762a2a8-5ad8-4239-b2af-04800f5a4b9c.gif)

# Nguồn tham khảo
[Make UX better with Android Animations](https://proandroiddev.com/make-ux-better-with-android-animations-207992d6f98a)