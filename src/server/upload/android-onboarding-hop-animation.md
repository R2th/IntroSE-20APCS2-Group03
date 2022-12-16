Chào các bạn, trong quá trình phát triển ứng dụng, hẳn các bạn đã từng thấy rất nhiều ứng dụng về tính năng rất hay nhưng giao diện đôi khi lại không hề bắt mắt chút nào. Các vấn đề như di chuyển màn hình rất khô khan cảm giác kém xa rất nhiều so với IOS. Đó là là điều cần hết sức lưu ý khi làm ứng dụng bởi đôi khi, chỉ cần cái animation đơn giản nhẹ nhàng đã làm cho người dùng cảm thấy dễ chịu và vô cùng thíc thú. Ví dụ như bức ảnh sau đây của android:
![](https://images.viblo.asia/7568b4f0-dcf6-4066-8a55-0ac7afd685e1.gif)

Như các bạn thấy, trước kia OS android đơn thuần chỉ đưa ra một UI thuần tuý để cho người dùng tương tác. Tuy nhiên giờ đây, họ đã chú ý hơn rất nhiều đến cảm giác của người dùng. Các icon hay màn hình thường có sự "nhún nhảy" mỗi khi người dùng thao tác, điều đó ko làm cho các chức năng trở nên thô cứng. Vậy là các nhà phát triển ứng dụng, chúng ta cũng nên thử một chút xem, biết đâu ứng dụng của chính các bạn phát triển lại trở nên lung linh hơn với các animation.

Sau đây chúng ta hãy thử với 1 TextView đơn giản nhé.

**One Hop**
```
val animation = textViewHop
    .animate()
    .translationYBy(-40f)
    .setDuration(200)

animation.withEndAction {
    textViewHop.animate().translationYBy(40f).duration = 200
}
```

Trên đây chúng ta đã tạo một animation cho một textview dịch chuyển theo chiều dọc trong một khoảng thời gian duration = 200. 
Và tiếp theo, chúng ta sẽ làm cho việc chuyển động kia được lặp lại với việc sử dụng postDelay

```
animationHandler.post(new Runnable(){
  @Override
  public void run(){
      //Hop animation
      animationHandler.postDelayed(this, 1000);
  }
});
```
‘this’ trong phương thức ‘postDelayed’ thì tham chiếu đến đối tượng Runnable trong java
Đối với Kotlin thì cũng tương tự

```
animationHandler.post(object : Runnable {
  override fun run() {
    // Hop animation   
    animationHandler.postDelayed(this, 1000)
  }
})
```

Trong Kotlin thì có thể phức tạp hơn một chút như sau:

```
private val animationHandler = Handler()
private lateinit var animationRunnable: Runnable

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    animationRunnable = Runnable { animationFunction() }
    animationHandler.post(animationRunnable)
}
private fun animationFunction() {
    val animation = textViewHop
        .animate()
        .translationYBy(-40f)
        .setDuration(200)
    animation.withEndAction {
        textViewHop.animate().translationYBy(40f).duration = 200
    }
    animationHandler.postDelayed(animationRunnable, 1000)
}

```

Về cơ bản thì chúng đều lấy ra đối tượng runnable, bạn có thể truyền tham số đến phương thức animationFunction. Và sau đây là kết quả bạn nhận được:
![](https://images.viblo.asia/af48db6b-f110-4655-886f-f099059d5644.gif)

Thật đơn giản phải không các bạn. Hi vọng từ đây các bạn có thể làm nhiều ứng dụng ngày càng đẹp hơn, không chỉ với một kiểu animation như thế này mà còn rất rất nhiều loại khác phù hợp với ứng dụng của các bạn. 

Cảm ơn các bạn đã quan tâm, bài viết được dịch từ [Android Onboarding Hop Animation](https://android.jlelse.eu/android-onboarding-hop-animation-1d1651b87e2c)