# I. Giới thiệu
Đã đến lúc nói lời tạm biệt với Toast messages truyền thống trong Android và thay vào đó là Snackbar.

Snackbar là sự thêm mới hiển thị gần tương tự Toast messages nhưng với nhiều tùy chỉnh hơn.

Snackbar đã được giới thiệu trong  Material Design. Nó có sẵn thông qua design support library. 

Nhưng, khi sự phát triển của Android đang chuyển từ các support libraries sang AndroidX, Snackbar sẽ có sẵn cho chúng tôi thông qua material design libraries.

Chúng ta có thể có một Snackbar trong các dự án AndroidX của mình bằng cách tích hợp material design library bằng cách thêm dòng sau vào tệp build.gradle.
```
implementation 'com.google.android.material:material:1.0.0'
```

# II. Ưu điểm
Không giống như Toast message, chúng ta có thể lắng nghe click với các views trong Snackbar thông qua đó chúng ta có thể thực hiện một hành động tùy chỉnh hoặc loại bỏ Snackbar. Với UX, Snackbar đi đến level cao hơn với coordinator layout. Trên hết, chúng ta cũng có thể tạo Snackbar tùy chỉnh dễ dàng.

# III. Nhược điểm
Đối với Toast message bạn có thể hiển thị bất cứ khi nào chỉ cần có context, nhưng Snackbar ngoài cần có context còn phải một view từ active layout

Cùng với đó Snackbar chỉ được hiển thị khi view nó liên kết hiển thị trên màn hình . Có thể lấy ví dụ như sau: Nếu bạn hiển thị Snackbar trên ActivityA, nếu bạn kill ActivityA đi thì Snackbar cũng ngay lập tức bị ẩn đi mặc cho thời gian chưa kết thúc. Tôi nghĩ đây có thể hợp lý cho hầu hết các trường hợp.

# IV. Custom Snackbar
- Hiển thị Simple với message
```
Snackbar  
    .make(view, "Your message here",               
                Snackbar.LENGTH_SHORT)
    .show()
```
![](https://images.viblo.asia/2a7f6fac-61c0-4e52-b076-771aad8c2599.png)

- Tùy chỉnh background snackbar
```
val snackbar = Snackbar.make(view, message, Snackbar.LENGTH_INDEFINITE)
// To change background color to red
snackbar.view.setBackgroundColor(ContextCompat.getColor(activity!!,R.color.color_red_AA)) 
snackbar.show()
```
![](https://images.viblo.asia/f26a04fd-6ae9-46d4-a17d-db91689ada6a.png)

- Thêm một action cho Snackbar
```
val snackbar = Snackbar.make(view, message, Snackbar.LENGTH_INDEFINITE)
// To change background color to red
snackbar.view.setBackgroundColor(ContextCompat.getColor(activity!!,R.color.color_red_AA)) 
// To change color for action button
snackbar.setActionTextColor(Color.WHITE)
snackbar.setAction("RETRY"){
    fun onClick(v: View) {
        youractionhere()
    }
}.show()
```
![](https://images.viblo.asia/f1d256df-d10b-416c-aab8-f0d8f07457cb.png)

-  Custom snackbar với error message và success message

Ví dụ lỗi thì sẽ hiển thị snackbar đỏ, thành công thì hiển thị snackbar xanh với icon cho mỗi loại.

  B1. Tạo xml với bố cục icon bên trái, message ở giữa và action bên phải của layout:
```
<?xml version="1.0" encoding="utf-8"?>
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:layout_height="wrap_content"
    tools:layout_width="match_parent"
    tools:parentTag="androidx.constraintlayout.widget.ConstraintLayout">
    
    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/snack_constraint"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/color_red_AA">

        <androidx.appcompat.widget.AppCompatImageView

            android:id="@+id/im_action_left"
            android:layout_width="30dp"
            android:layout_height="30dp"
            android:layout_margin="16dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:ignore="VectorDrawableCompat" />
        
        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_message"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:gravity="left"
            android:paddingLeft="10dp"
            android:paddingTop="10dp"
            android:paddingBottom="10dp"
            android:textColor="@color/white"
            android:textSize="12sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toRightOf="@+id/im_action_left"
            app:layout_constraintStart_toEndOf="@+id/im_action_left"
            app:layout_constraintEnd_toStartOf="@+id/tv_action"
            app:layout_constraintTop_toTopOf="parent"
            />

        <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/tv_action"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="left"
            android:paddingLeft="10dp"
            android:paddingTop="10dp"
            android:paddingRight="16dp"
            android:paddingBottom="10dp"
            android:textColor="@color/white"
            android:textSize="12sp"
            android:textStyle="bold"
            android:visibility="gone"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toRightOf="@+id/tv_message"
            app:layout_constraintStart_toEndOf="@+id/tv_message"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            />

    </androidx.constraintlayout.widget.ConstraintLayout>

</merge>
```

B2. Bước tiếp theo sẽ custom 1 class Snackbar

```
class SimpleCustomSnackbarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr), ContentViewCallback {

    lateinit var tvMsg: TextView
    lateinit var tvAction: TextView
    lateinit var imLeft: ImageView
    lateinit var layRoot: ConstraintLayout

    init {
        View.inflate(context, R.layout.view_snackbar_simple, this)
        clipToPadding = false
        this.tvMsg = findViewById(R.id.tv_message)
        this.tvAction = findViewById(R.id.tv_action)
        this.imLeft = findViewById(R.id.im_action_left)
        this.layRoot = findViewById(R.id.snack_constraint)
    }

    override fun animateContentIn(delay: Int, duration: Int) {
        val scaleX = ObjectAnimator.ofFloat(im_action_left, View.SCALE_X, 0f, 1f)
        val scaleY = ObjectAnimator.ofFloat(im_action_left, View.SCALE_Y, 0f, 1f)
        val animatorSet = AnimatorSet().apply {
            interpolator = OvershootInterpolator()
            setDuration(500)
            playTogether(scaleX, scaleY)
        }
        animatorSet.start()
    }

    override fun animateContentOut(delay: Int, duration: Int) {
    }
}
```

Bây giờ có thể dễ dàng gọi View vừa custom trong xml 

```
<?xml version="1.0" encoding="utf-8"?>
<com.example.myapplication.customsnackbar.SimpleCustomSnackbarView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:padding="8dp"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

B4: Tạo class extends `BaseTransientBottomBar` để tạo Snackbar equal behavior
```
class SimpleCustomSnackbar (
    parent: ViewGroup,
    content: SimpleCustomSnackbarView
) : BaseTransientBottomBar<SimpleCustomSnackbar>(parent, content, content) {


    init {
        getView().setBackgroundColor(ContextCompat.getColor(view.context, android.R.color.transparent))
        getView().setPadding(0, 0, 0, 0)
    }

    companion object {

        fun make(view: View,
                 message : String, duretion : Int,
                 listener : View.OnClickListener?,icon : Int, action_lable : String?, bg_color : Int): SimpleCustomSnackbar? {

            // First we find a suitable parent for our custom view
            val parent = view.findSuitableParent() ?: throw IllegalArgumentException(
                "No suitable parent found from the given view. Please provide a valid view."
            )

            // We inflate our custom view
            try{
                val customView = LayoutInflater.from(view.context).inflate(
                    R.layout.layout_simple_custom_snackbar,
                    parent,
                    false
                ) as SimpleCustomSnackbarView
                // We create and return our Snackbar
                customView.tvMsg.text = message
                action_lable?.let {
                    customView.tvAction.text = action_lable
                    customView.tvAction.setOnClickListener {
                        listener?.onClick(customView.tvAction)
                    }
                }
                customView.imLeft.setImageResource(icon)
                customView.layRoot.setBackgroundColor(bg_color)


                return SimpleCustomSnackbar(
                    parent,
                    customView).setDuration(duretion)
            }catch ( e: Exception){
                Log.v("exception ",e.message)
            }

            return null
        }

    }

}
```
```
internal fun View?.findSuitableParent(): ViewGroup? {
    var view = this
    var fallback: ViewGroup? = null
    do {
        if (view is CoordinatorLayout) {
            // We've found a CoordinatorLayout, use it
            return view
        } else if (view is FrameLayout) {
            if (view.id == android.R.id.content) {
                // If we've hit the decor content view, then we didn't find a CoL in the
                // hierarchy, so use it.
                return view
            } else {
                // It's not the content view but we'll use it as our fallback
                fallback = view
            }
        }

        if (view != null) {
            // Else, we will loop and crawl up the view hierarchy and try to find a parent
            val parent = view.parent
            view = if (parent is View) parent else null
        }
    } while (view != null)

    // If we reach here then we didn't find a CoL or a suitable content view so we'll fallback
    return fallback
}
```

--------
Show error message

```
val clicklistneer : View.OnClickListener = View.OnClickListener {
    //TODO Do something on snackbar click
}
SimpleCustomSnackbar.make(coordinator,"Something went wrong",Snackbar.LENGTH_INDEFINITE,clicklistneer,
    R.drawable.ic_error_round,"RETRY",ContextCompat.getColor(this, R.color.color_red_AA))?.show()
```
![](https://images.viblo.asia/d8921283-6a76-4046-96c9-bca5b92f3e7d.png)

Show success message
```
val clicklistneer : View.OnClickListener = View.OnClickListener {
    //TODO Do something on snackbar click
}
SimpleCustomSnackbar.make(coordinator,"Updated successfully",Snackbar.LENGTH_INDEFINITE,null,
    R.drawable.ic_sucess,null,ContextCompat.getColor(this, R.color.color_green_AA))?.show()
```
![](https://images.viblo.asia/76efc19d-4442-4094-a4ab-11dfafb3cb93.png)

# V.Tổng kết
Trên đây là vài customs đơn giản về snack bar. Bạn có thể có nhiều những cách custom khác nhau tùy theo ý muốn của bạn.

Cảm ơn các bạn đã theo dõi bài viết!

ref: [medium](https://medium.com/better-programming/custom-snackbars-in-android-5cb90af2728e)