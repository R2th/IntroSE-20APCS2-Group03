## 1. Animation là gì ? 
* Animation trong android là một công cụ mạnh mẽ để người dùng có thể hiểu được những thông tin phức tạp, khó hiểu khi sử dụng app. Việc thể hiện sự biến đổi của những thông tin có thể giúp người dùng hiểu được thao tác của mình với app đã đúng, quan trọng hơn cả là nếu một app có những animation hợp lí thì người dùng sẽ cảm thấy thích thú cũng như dễ chịu khi sử dụng. Có rất nhiều các loại animation trong android, nhưng trong bài viết này chúng ta sẽ làm quen những loại animation phổ biến nhất thông qua một app nhỏ.
## 2. Dựng layout:
* Trong lớp `app/res/layout/activity_main.xml` ta thay thế TextView mặc định bằng đoạn code sau:
```kotlin
<Button
            android:text="@string/rotate"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/rotateButton" app:layout_constraintEnd_toStartOf="@+id/translateButton"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            android:layout_margin="@dimen/standard_margin" android:textSize="12sp"/>

    <Button
            android:text="@string/translate"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/translateButton" app:layout_constraintEnd_toStartOf="@+id/scaleButton"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toEndOf="@+id/rotateButton"
            android:layout_margin="@dimen/standard_margin" android:textSize="12sp"
            android:layout_marginStart="14dp" android:layout_marginTop="16dp"/>

    <Button
            android:text="@string/scale"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/scaleButton"
            app:layout_constraintEnd_toStartOf="@+id/fadeButton"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toEndOf="@+id/translateButton"
            android:layout_margin="@dimen/standard_margin" android:textSize="12sp"
            android:layout_marginStart="15dp" android:layout_marginTop="@dimen/standard_margin"/>

    <Button
            android:text="@string/fade"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/fadeButton" app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toEndOf="@+id/scaleButton"
            android:layout_margin="@dimen/standard_margin" android:textSize="12sp"
            android:layout_marginTop="@dimen/standard_margin" app:layout_constraintEnd_toEndOf="parent"
            android:layout_marginStart="15dp"/>

    <Button
            android:text="@string/shower"
            android:layout_width="0dp"
            android:layout_height="wrap_content" android:id="@+id/showerButton"
            app:layout_constraintTop_toBottomOf="@+id/rotateButton"
            app:layout_constraintStart_toStartOf="@+id/scaleButton"
            android:layout_marginEnd="@dimen/standard_margin"
            android:layout_marginBottom="@dimen/standard_margin"
            app:layout_constraintEnd_toEndOf="parent" />

    <Button
            android:text="@string/sky_color"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            app:layout_constraintEnd_toEndOf="@+id/translateButton"
            app:layout_constraintTop_toBottomOf="@+id/rotateButton"
            android:id="@+id/colorizeButton"
            android:layout_marginStart="@dimen/standard_margin"
            android:layout_marginBottom="@dimen/standard_margin"
            app:layout_constraintStart_toStartOf="parent"/>

    <FrameLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:background="@color/black"
            app:layout_constraintTop_toBottomOf="@+id/showerButton" app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintVertical_bias="0.0"
            app:layout_constraintStart_toStartOf="parent">

        <ImageView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:srcCompat="@drawable/ic_star"
                android:id="@+id/star"
                android:layout_gravity="center"/>

    </FrameLayout>
 ```
 * Layout này gồm 6 nút ở trên cùng tương ứng với 6 animation mà chúng ta sử dụng trong project này, phần màn hình còn lại là một `FrameLayout` là vùng hiển thị hoạt ảnh của các animations.
 * Tại lớp `MaiActivity.kt` , bên trong `onCreate` ta thêm sự kiện `onClick` cho các button:
 ```kotlin
  rotateButton.setOnClickListener {
            rotater()
        }

        translateButton.setOnClickListener {
            translater()
        }

        scaleButton.setOnClickListener {
            scaler()
        }

        fadeButton.setOnClickListener {
            fader()
        }

        colorizeButton.setOnClickListener {
            colorizer()
        }

        showerButton.setOnClickListener {
            shower()
        }
 ```
##  3. Animation Rotate:
 * Khi bấm vào nút `Rotate` thì ngôi sao sẽ xoay 360 độ quanh tâm và thời gian xoay là 1 giây.
 * Tạo phương thức `rotater()`
  ```kotlin
   private fun rotater() {
        val animator = ObjectAnimator.ofFloat(star, View.ROTATION, -360f, 0f)
        animator.duration = 1000
        animator.disableViewDuringAnimation(rotateButton)
        animator.start()
    }
```
* Vẫn trong lớp `MainActivity.kt` thêm phương thức `disableViewDuringAnimation` để không cho click lại vào nút Rotate khi animation diễn ra, tránh cảm giác bị giật khi click liên tục vào nút này.
```kotlin
private fun ObjectAnimator.disableViewDuringAnimation(view: View) {
        addListener(object : AnimatorListenerAdapter() {
            override fun onAnimationStart(animation: Animator?) {
                view.isEnabled = false
            }

            override fun onAnimationEnd(animation: Animator?) {
                view.isEnabled = true
            }
        })
    }
```
## 4. Animation translate:
* Tạo phương thức  `translater()`
```kotlin
 private fun translater() {
        val animator = ObjectAnimator.ofFloat(star, View.TRANSLATION_X, 200f)
        animator.repeatCount = 1
        animator.repeatMode = ObjectAnimator.REVERSE
        animator.disableViewDuringAnimation(translateButton)
        animator.start()
    }
```
* Khi bấm nút `Translate` thì ngôi sao sẽ di chuyển theo phương ngang ( trục x) từ trái sang phải một khoảng 200 pixels và quay trở lại nhờ thuộc tính REVERSE. `repeatCount` là số lần lặp lại.
## 5. Animation Scale: 
* Tạo phương thức `scaler()`
```kotlin
private fun scaler() {
        val scaleX = PropertyValuesHolder.ofFloat(View.SCALE_X, 4f)
        val scaleY = PropertyValuesHolder.ofFloat(View.SCALE_Y, 4f)
        val animator = ObjectAnimator.ofPropertyValuesHolder(star, scaleX, scaleY)
        animator.repeatCount = 1
        animator.repeatMode = ObjectAnimator.REVERSE
        animator.disableViewDuringAnimation(scaleButton)
        animator.start()
    }
```
* Khi bấm vào nút `Scale` thì ngôi sao sẽ phóng to ra gấp 4 lần giá trị mặc định sau đó thu nhỏ lại như ban đầu, cũng bằng thuộc tính REVERSE.
## 6. Animation Fade:
* Tạo phương thức `fader()`
```kotlin
   private fun fader() {
        val animator = ObjectAnimator.ofFloat(star, View.ALPHA, 0f)
        animator.repeatCount = 1
        animator.repeatMode = ObjectAnimator.REVERSE
        animator.disableViewDuringAnimation(fadeButton)
        animator.start()
    }
```
* Khi bấm button `Fade` thì ngôi sao sẽ mờ dần cho đến khi trong suốt rồi dần dần trở lại như ban đầu ( REVERSE)
## 7. Animation Colorize:
* Tạo phương thức `colorizer()`
```kotlin
 private fun colorizer() {
        val animator = ObjectAnimator.ofArgb(star.parent,
            "backgroundColor", Color.BLACK, Color.RED)
        animator.duration = 500
        animator.repeatCount = 1
        animator.repeatMode = ObjectAnimator.REVERSE
        animator.disableViewDuringAnimation(colorizeButton)
        animator.start()
    }
```
* Khi bấm button `Sky Color` thì màu nền sẽ chuyển từ đen sang đỏ trong nửa giây và lại trở về màu đen như ban đầu (REVERSE)
## 8. Button cuối cùng là `Shower`
* Mỗi lần click vào button này sẽ tạo ra một ngôi sao với kích cỡ to nhỏ ngẫu nhiên nhờ  (Scale), tự xoay quanh trục với tốc độ ngẫu nhiên nhờ (Rotate) và rơi với tốc độ , vị trí ngẫu nhiên . Button này có thể click liên tục vì không ảnh hưởng đến một view cố định, mà mỗi lần click lại sinh ra một ngôi sao. `AnimatorSet` dùng để gộp 2 animation Rotate và Stranslate với nhau và thực hiện trong cùng một khoảng thời gian với nhau.
```kotlin
private fun shower() {
        val container = star.parent as ViewGroup
        val containerW = container.width
        val containerH = container.height
        var starW: Float = star.width.toFloat()
        var starH: Float = star.height.toFloat()

        val newStar = AppCompatImageView(this)
        newStar.setImageResource(R.drawable.ic_star)
        newStar.layoutParams = FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT)
        container.addView(newStar)

        newStar.scaleX = Math.random().toFloat() * 1.5f + .1f
        newStar.scaleY = newStar.scaleX
        starW *= newStar.scaleX
        starH *= newStar.scaleY

        newStar.translationX = Math.random().toFloat() * containerW - starW / 2

        val mover = ObjectAnimator.ofFloat(newStar, View.TRANSLATION_Y, -starH, containerH + starH)
        mover.interpolator = AccelerateInterpolator(1f)

        val rotator = ObjectAnimator.ofFloat(newStar, View.ROTATION,
            (Math.random() * 1080).toFloat())
        rotator.interpolator = LinearInterpolator()

        val set = AnimatorSet()
        set.playTogether(mover, rotator)
        set.duration = (Math.random() * 1500 + 500).toLong()

        set.addListener(object : AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator?) {
                container.removeView(newStar)
            }
        })

        set.start()
    }
```
* Đến đây thì mọi người có thể run app và xem thành quả của mình được rồi. Cảm ơn các bạn đã dành thời gian đọc bài viết này !!!
* Nguồn :  https://developer.android.com/codelabs/advanced-android-kotlin-training-property-animation?hl=en&continue=https%3A%2F%2Fcodelabs.developers.google.com%2F%230#0