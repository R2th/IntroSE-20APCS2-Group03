Android KTX (cho KoTlin eXtension) là một tập hợp các extensions của Kotlin giúp các nhà phát triển viết mã ngắn gọn hơn và loại bỏ boilerplate code khỏi dự án của bạn.

### Cách Java cũ
Hãy tưởng tượng bạn muốn có một phương thức cung cấp activity gốc của một view. Bạn có thể viết một class với một method trong companion object của nó:

```
class ViewUtils{
    companion object {
        fun getParentActivity(view:View): AppCompatActivity?{
            var context = view.context
            while (context is ContextWrapper) {
                if (context is AppCompatActivity) {
                    return context
                }
                context = context.baseContext
            }
            return null
        }
    }
}
```

Sau đó, tất cả những gì bạn cần làm là gọi ViewUtils.getParentActivity (viewInstance). Tuy nhiên, sẽ rất tuyệt nếu bạn có thể gọi viewInstance.getParentActivity ().

### Function Extension
Function extension với Kotlin là một cách để bạn thêm một phương thức vào một lớp mà không cần phải kế thừa từ lớp đó. Ví dụ, nếu bạn muốn thêm một phương thức getParentActivity () vào lớp View, bạn có thể viết:

```
fun View.getParentActivity(): AppCompatActivity?{
    var context = this.context
    while (context is ContextWrapper) {
        if (context is AppCompatActivity) {
            return context
        }
        context = context.baseContext
    }
    return null
}
```

Điều này cho phép bạn gọi trực tiếp viewInstance.getParentActivity (). Nhưng thay vào đó, chúng tôi có thể muốn gọi viewInstance.parentActivity làm thuộc tính của lớp View.

### Extension Property
Tương tự như trên, có thể thêm thuộc tính, bằng cách xác định đó là phương thức get và / hoặc set:

```
val  View.parentActivity: AppCompatActivity?
    get() {
        var context = this.context
        while (context is ContextWrapper) {
            if (context is AppCompatActivity) {
                return context
            }
            context = context.baseContext
        }
        return null
    }
```

Bây giờ, bạn có thể gọi viewInstance.parentActivity để nhận Activity của view.

### Android KTX

Như chúng ta vừa thấy ở trên, Kotlin Extension rất hữu ích cho phép nhà phát triển viết mã sạch hơn. Đó là lý do tại sao Android quyết định cung cấp cho các nhà phát triển một số extension cho Kotlin để giúp chúng ta viết mã sạch hơn.

Ví dụ, nếu bạn muốn thêm một listener vào một instance của animator , bạn phải viết đoạn code sau:

```
animatorInstance.addListener(object: Animator.AnimatorListener{
    override fun onAnimationRepeat(animator: Animator?) {
        // onRepeat behavior
    }

    override fun onAnimationEnd(animator: Animator?) {
        // onEnd behavior
    }

    override fun onAnimationCancel(animator: Animator?) {
        // onCancel behavior
    }

    override fun onAnimationStart(animator: Animator?) {
        // onStart behavior
    }
})
```

Đây là điều ta không thích, bởi vì hầu hết thời gian, bạn chỉ cần một trong số đó. Ví dụ, bạn sẽ có một hành vi cho sự kết thúc của hình ảnh động, và ba phương pháp khác sẽ vẫn trống. Không phải code sạch hơn chúng ta đã thấy. Nhưng Core Kotlin Extension cho phép chúng tôi thực hiện điều này một cách rõ ràng hơn.

Đầu tiên, thêm một dependency vào thư viện KTX core:

`implementation 'androidx.core:core-ktx:1.0.0-beta01'`

Sau đó, tất cả những gì bạn phải làm là gọi một trong những function extension chức năng được cung cấp, vì vậy code của bạn sẽ sạch hơn:

```
animatorInstance.doOnEnd { 
    // onEnd behaviour
}
```

Như bạn có thể thấy, điều này cho phép chúng ta viết code sạch hơn nhiều.