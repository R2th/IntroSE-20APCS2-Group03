Từ phiên bản Android 5.0 Google đã giới thiệu tới đông đảo giới lập trình viên về `Material Design`. Vậy `Material Design` là gì? 

`Material Design` là 1 chuẩn thiết kế giao diện mới giành cho lập trình viên Android, nó bao gồm bố cục về cách sắp xếp layout, màu sắc, định hướng thao tác người dùng và tất nhiên là cả hiệu ứng làm sao để cho ra đời 1 ứng dụng vừa đẹp mắt về giao diện cũng như là thao tác thuận tiện nhất.

Nói về cách sắp xếp layout, màu sắc hay hành vi người dùng thì giúp cho đội thiết kế để vẽ nên những bản Design đẹp. Còn mình thấy cái thú vị nhất trong thiết kế `Material Design` mà Google hỗ trợ có ảnh hưởng lớn nhất đến thế giới lập trình chính là `Animate `. `Animate ` giúp tạo ra các ứng dụng có giao diện, cách chuyển qua chuyển lại giữa các màn hình hay đơn giản là tạo ra các hiệu ứng về chữ, button đẹp mắt. Tất nhiên điều này thì ngôn ngữ lập trình nào cũng có hỗ trợ, nhưng từ các bản Android trước 5.0 thì để làm điều này các lập trình viên thường tốn rất nhiều công sức và có thể gây ra rất nhiều `Bug` trong quá trình code.

Dưới đây mình sẽ giới thiệu với các bạn 1 vài Animate để tạo ra những hiệu ứng chuyển động bắt mắt.

# TransitionManager
Đầu tiên các bạn hãy chuẩn bị cho mình 1 layout đơn giản.
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
             android:id="@+id/transitions_container"
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             android:gravity="center"
             android:orientation="vertical">
 
    <Button
       android:id="@+id/button"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:text="DO MAGIC"/>
 
    <TextView
       android:id="@+id/text"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_marginTop="16dp"
       android:text="Transitions are awesome!"
       android:visibility="gone"/>
 
</LinearLayout>
```

và file Kotlin
```kotlin
var visible = false
button.setOnClickListener({
    TransitionManager.beginDelayedTransition(transitions_container)
    visible = !visible
    text.visibility = if (visible) View.VISIBLE else View.GONE

})
```

và đây là kết quả.
![](https://images.viblo.asia/4cd944dc-d98a-47dd-aadd-8d6916cc6ca8.gif)

Hiệu ứng cũng không quá tồi đúng không? Tất cả hiệu ứng ẩn hiện TextView đều được thự hiện và quản lý trong `TransitionManager`. Và tất điều các bạn cần làm là để lại quyền quản lý sự thay đổi của ViewGroup lại cho `TransitionManager` thông qua 1 câu lệnh.

```kotlin
TransitionManager.beginDelayedTransition(viewGroup)
```

ngoài ra các bạn có thế Custom các hiệu ứng thông qua tham số thứ 2 của hàm `beginDelayedTransition`

```java
beginDelayedTransition(final ViewGroup sceneRoot, Transition transition)
```

# Custom Animation with Transition
Dưới đây là 1 số hiệu ứng mặc định mà thư viện đã hỗ trợ sẵn cho các lập trình viên.

- **ChangeBounds**: Hiệu ứng này dùng để thay đổi vị trí và kích thước của View
- **Fade**: View bình thường thì chỉ có 2 trạng thái ẩn và hiện thì hiệu ứng này sẽ bổ xung thêm về trạng thái ẩn hiện của View bằng cách tăng dần độ hiện thị giúp View có trạng thái mờ mờ.
- **TransitionSet**: Hiệu ứng này cho phép lập trình viên thêm các chuyển tiếp giữa các chuyển động của View trên màn hình.
- **AutoTransition**: Nó thực chất là  `TransitionSet` nhưng chứa Fade out, ChangeBounds và Fade theo thứ tự tuần tự. AutoTransition được sử dụng là đối số mặc định khi bạn không chỉ định bất kỳ `TransitionSet` nào trong đối số thứ hai của `beginDelayedTransition`.

Ngoài những thuộc tính mặc định thì `Transition` còn cung cấp cho các bạn 1 số thuộc tính để bạn cài thêm cho hiệu ứng. VD như:

```kotlin
val transitionSet = TransitionSet()
        .apply {
            duration = 300 // set time
            startDelay = 200 // set time start animation
            // ...
        }

```

Dưới đây mình sẽ đưa thêm 1 số ví dụ về sử dụng `Transition` để tạo các hiệu ứng chuyển động cho View.

## Slide

![](https://images.viblo.asia/12ee4f49-9481-4248-91fd-863c746773b6.gif)

```kotlin
var visible = false
button.setOnClickListener({
    TransitionManager.beginDelayedTransition(transitions_container, Slide(Gravity.END))
    visible = !visible
    text.visibility = if (visible) View.VISIBLE else View.GONE

})
```

hoặc các bạn có thẻ set thêm `duration` và `startDelay`

```kotlin
val slide = Slide(Gravity.END).apply {
            duration = 1000
            startDelay = 200
        }
// ...

 TransitionManager.beginDelayedTransition(transitions_container, slide)
```

## ChangeImageTransform
`Transition` này sẽ tác động lên `matrix` của `Image`. Nó tạo ra hiệu ứng đẹp khi chúng ta thay đổi `scaleType` của `ImageView`, thường thì `ChangeImageTransform` sẽ đi kèm với `ChangeBounds` để thay đổi kích thước và vị trí của ảnh

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    // ...
    val transitionSet = TransitionSet()
            .apply {
                addTransition(ChangeBounds())
                addTransition(ChangeImageTransform())
            }
            
    var mExpanded = false
    image.setOnClickListener({
        TransitionManager.beginDelayedTransition(transitions_container, transitionSet)
        mExpanded = !mExpanded
        val params : ViewGroup.LayoutParams = image.layoutParams
        params.height = if (mExpanded) ViewGroup.LayoutParams.MATCH_PARENT else ViewGroup.LayoutParams.WRAP_CONTENT

        image.scaleType = if (mExpanded) ImageView.ScaleType.CENTER_CROP else ImageView.ScaleType.FIT_CENTER
    })
}
```

## Recolor

```kotlin
var isColorsInverted = false;
button.setOnClickListener({
    button.setTextColor(resources.getColor(
            if (!isColorsInverted) R.color.colorAccent else R.color.colorPrimary))
    button.setBackgroundColor(resources.getColor(
            if (!isColorsInverted) R.color.colorPrimary else R.color.colorAccent))
})
```

![](https://images.viblo.asia/78bca809-a1da-4e55-9abc-fad605c5adf7.gif)

## Create Transition with xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet xmlns:app="http://schemas.android.com/apk/res-auto"
              app:transitionOrdering="together"
              app:duration="400">
    <changeBounds/>
    <changeImageTransform/>
    <fade
       app:fadingMode="fade_in"
       app:startDelay="200">
        <targets>
            <target app:targetId="@id/transition_title"/>
        </targets>
    </fade>
</transitionSet>

// And using:
TransitionInflater.from(getContext()).inflateTransition(R.anim.my_the_best_transition);
```

## Custom Transitions
Các bạn cũng có thể tự Custom riêng từng hiệu ứng sao cho phù hợp vơi yêu cầu của Project bằng cách kế thừa từ class `Transition`.

```kotlin
class CustomTransition : Transition() {
    override fun captureEndValues(transitionValues: TransitionValues?) {
        TODO("Send End value to createAnimator")
    }

    override fun captureStartValues(transitionValues: TransitionValues?) {
        TODO("Send Start value to createAnimator")
    }

    override fun createAnimator(sceneRoot: ViewGroup?, startValues: TransitionValues?, endValues: TransitionValues?): Animator {
        TODO("Custom Animation")
        return super.createAnimator(sceneRoot, startValues, endValues)
    }

}
```

ở đây mình sẽ viết 1 class Scale() đơn giản để làm ví dụ cho các bạn dễ hiểu hơn

```kotlin
class Scale : Visibility() {
    val SCALE_X = "scaleX"
    val SCALE_Y = "scaleY"

    var disappearedScale = 0f

    fun setDisappearedScale(disappearedScale: Float): Scale {
        if (disappearedScale < 0f) {
            throw IllegalArgumentException("disappearedScale cannot be negative!")
        }
        this.disappearedScale = disappearedScale
        return this
    }

    override fun captureEndValues(transitionValues: TransitionValues?) {
        TODO("Send End value to createAnimator")
    }

    override fun captureStartValues(transitionValues: TransitionValues?) {
        super.captureStartValues(transitionValues)
        transitionValues?.values?.put(SCALE_X, transitionValues.view.scaleX)
        transitionValues?.values?.put(SCALE_Y, transitionValues.view.scaleY)
    }

    private fun createAnimation(view: View?, startScale: Float, endScale: Float,
                                values: TransitionValues?): Animator? {
        val initialScaleX = view?.scaleX
        val initialScaleY = view?.scaleY
        var startScaleX = initialScaleX?.times(startScale)
        val endScaleX = initialScaleX?.times(endScale)
        var startScaleY = initialScaleY?.times(startScale)
        val endScaleY = initialScaleY?.times(endScale)

        if (values != null) {
            val savedScaleX: Float = values.values[SCALE_X] as Float
            val savedScaleY: Float = values.values[SCALE_Y] as Float

            if (savedScaleX != initialScaleX) {
                startScaleX = savedScaleX
            }
            if (savedScaleY != initialScaleY) {
                startScaleY = savedScaleY
            }
        }

        view?.scaleX = if (startScaleX == null) 0f else startScaleX
        view?.scaleY = if (startScaleY == null) 0f else startScaleY

        return mergeAnimators(
                ObjectAnimator.ofFloat(view, View.SCALE_X, startScaleX!!, endScaleX!!),
                ObjectAnimator.ofFloat(view, View.SCALE_Y, startScaleY!!, endScaleY!!))
    }

    override fun onAppear(sceneRoot: ViewGroup?, view: View?, startValues: TransitionValues?,
                          endValues: TransitionValues?): Animator? {
        return createAnimation(view, disappearedScale, 1f, startValues)
    }

    override fun onDisappear(sceneRoot: ViewGroup?, view: View?, startValues: TransitionValues?,
                             endValues: TransitionValues?): Animator? {
        return createAnimation(view, 1f, disappearedScale, startValues)
    }
}
```

>`Lời kết: Qua bài viết này hi vọng các bạn hiểu rõ hơn về `Animation` trong android và nhất là từ phiên bản Android 5.0 trở lên và có thể áp dụng các hiệu ứng chuyển động làm sao cho hợp lý để tạo nên 1 Project đẹp.`

> `Link tham khảo: https://medium.com/@andkulikov/animate-all-the-things-transitions-in-android-914af5477d50`