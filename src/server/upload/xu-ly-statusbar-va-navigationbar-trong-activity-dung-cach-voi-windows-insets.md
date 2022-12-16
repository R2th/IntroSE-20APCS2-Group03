Có lẽ khi lập trình Android, chúng ta thường sẽ gặp khá nhiều vấn đề về việc hiển thị UI cho đúng để hỗ trợ cho tất cả hoặc đa số các dòng máy trên thị trường hiện nay. Mội trong những vấn đề nan giải nhất có lẽ là vẽ UI ở chế độ full-screen, chúng ta phải xử lý Status bar và Navigation Bar overlapping.

**Có thể bạn sẽ thấy quen thuộc khi nhìn vào ảnh minh họa này:**

![](https://images.viblo.asia/57350984-5b52-45d6-813e-a82b087e5eda.png)

**Hay ở Navigation bar**

![](https://images.viblo.asia/dacf8638-ae47-4946-9cb8-963d336ad1d1.png)

Trên các diễn đàn như StackOverFlow, có khá nhiều solution đã được đưa ra, như margin toolbar, fab... theo 1 số dp nhất định. Điều này có thể giải quyết bài toán trên các máy có tai thỏ

![](https://images.viblo.asia/6def373b-1b50-44ee-af4f-a969071e878f.jpg)

-----
Nhưng với máy không có tai thỏ, thanh toolbar sẽ bị đấy xuống 1 khoảng gây mất thẩm mĩ 
![](https://images.viblo.asia/c82922ea-fd92-4805-95f8-47827365bf13.jpg)

## Cách giải quyết tổng quát bằng Window Inset
### Window Insets
> Describes a set of insets for window content.
> 
Để hiểu rõ hơn về Window Insetm, bạn có thể tham khảo tại trang d.android https://developer.android.com/reference/android/view/WindowInsets
còn hôm nay tôi muốn đi trực tiếp vào cách bạn sử dụng inset để giải quyết margin View

```
ViewCompat.setOnApplyWindowInsetsListener(viewBinding.root) { _, insets ->
               val params = toolbar.layoutParams as ViewGroup.MarginLayoutParams
               params.setMargins(0, insets.systemWindowInsetTop, 0, 0)
               view.layoutParams = menuLayoutParams
               insets.consumeSystemWindowInsets()
        }
```

Bạn thêm dòng trên vào phương thức onResume của Activity hoặc Fragment. Nó sẽ set 1 callback, khi màn hình được tính toán xong các độ dài của navigation bar hay status bar thì callback sẽ được gọi lại, cùng với giá trị inset. Lúc này bạn chỉ việc setMargin cho toolbar hay fab 

```
    // margin top 
    val params = view.layoutParams as ViewGroup.MarginLayoutParams
    params.setMargins(0, marginTop, 0, 0)
    view.layoutParams = menuLayoutParams
```

Để tổng quát thì bạn có thể viết các Extension của View:

```
fun View.setMarginTop(marginTop: Int) {
    val menuLayoutParams = this.layoutParams as ViewGroup.MarginLayoutParams
    menuLayoutParams.setMargins(0, marginTop, 0, 0)
    this.layoutParams = menuLayoutParams
}

fun View.setMarginBottom(margin: Int) {
    val menuLayoutParams = this.layoutParams as ViewGroup.MarginLayoutParams
    menuLayoutParams.setMargins(0, 0, 0, margin)
    this.layoutParams = menuLayoutParams
}
```

và xong, sau cùng code sẽ trông như thế này:
```
ViewCompat.setOnApplyWindowInsetsListener(mBinding.root) { _, insets ->
            mBinding.toolBar.setMarginTop(insets.systemWindowInsetTop)
            insets.consumeSystemWindowInsets()
        }
```

Đến đây bạn đã làm chủ được inset rồi đấy :D Mong bài viết có thể giúp ích cho bạn!