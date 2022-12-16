![](https://images.viblo.asia/6f8bdfca-c85c-457c-8c49-4bfef8c779cf.png)


# Mở đầu

Khi làm việc với android chúng ta thường dùng dialog để show lỗi gọi api, và nếu mà màn hình của bạn có nhiều fragment và các fragment này đồng thời gọi các api khác nhau và bị lỗi thì hiển nhiên bạn chỉ muốn app show lên một dialog thôi. Ví dụ điển hình là case bạn dùng viewpager thì các page bên cạnh đã được load sẵn và cũng sẽ show dialog lỗi gây ra việc duplicate và làm phiền ng dùng.


Vậy chúng ta có cách nào để xử lý việc này cho tiện không, có nhiều cách có thể làm và mình xin giới thiệu một cách để các bạn cùng tham khảo nhé.

# Phát triển

Hướng xử lý của mình là 
- Tạo biến lưu reference của showing dialog hiện tại.
- Mỗi khi tạo dialog cần check có dialog nào đang đc show ko để dismiss nó đi và show dialog mới.
- Khi fragment bị destroy thì cần huỷ dialog show bởi context của fragment đó và gán lại biến showing dialog thành null

```kotlin
var showingDialog: Dialog? = null

fun Context?.showDialog(
    title: String? = null, message: String? = null,
    textPositive: String? = null, positiveListener: (() -> Unit)? = null,
    textNegative: String? = null, negativeListener: (() -> Unit)? = null,
    cancelable: Boolean = false, canceledOnTouchOutside: Boolean = true
): AlertDialog? {
    val context = this ?: return null
    return MaterialAlertDialogBuilder(context).apply {
        setTitle(title)
        setMessage(message)
        setPositiveButton(textPositive) { dialog, which ->
            positiveListener?.invoke()
        }
        setNegativeButton(textNegative) { dialog, which ->
            negativeListener?.invoke()
        }
        setCancelable(cancelable)
    }.create().apply {
        setCanceledOnTouchOutside(canceledOnTouchOutside)
        // dismiss other showing dialog
        if (showingDialog?.isShowing == true) {
            showingDialog?.dismiss()
        }
        // listen onDestroy event and dismiss
        if (context is LifecycleOwner) {
            context.lifecycle.addObserver(object : LifecycleObserver {
                @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
                fun onDestroy() {
                    this@apply.dismiss()
                    if (showingDialog === this@apply) {
                        showingDialog = null
                    }
                }
            })
        }
        showingDialog = this
        show()
    }
}
```

Cùng với hướng xử lý như vậy các bạn có thể làm cho các loại dialog khác

Bài lần này xin hết tại đây, hẹn gặp lại các bạn trong các bài tiếp theo :)

Mình mới mở tài khoản medium https://medium.com/@anhquan.vn, mọi người vào follow để nhận những bài mới nhất trên đó của mình nhé, cảm ơn mọi người.