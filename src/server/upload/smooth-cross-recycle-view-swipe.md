Nếu bạn để ý bạn sẽ nhận ra rằng Google Playstore App là một RecyclerView vertical có chứa nhiều RecyclerView horizontal. Cuộn giữa chúng rất mượt, sau khi cuộn theo chiều vertical, bạn chạm một lần bạn có thể dừng cuộn vertical rồi cuộn theo chiều horizontal như hình bên dưới:
![Google playstore app scoll](https://cdn-images-1.medium.com/max/1600/1*46DT233SDQpIhMIL7BrG3w.gif).

# Đó là những gì bạn đã thử làm và trải nghiệm 

Bạn đã từng thử làm làm ứng dụng có RecyclerView vertical và có chứa nhiều RecyclerView horizontal chưa?. Nếu đã từng bạn có thể làm mượt như Google playstore App hay không?. Tôi đã làm và gặp vấn đề: Nếu đang scroll theo chiều vertical và không thể scroll theo chiều horizontal ngay 1 lần chạm đầu tiên, nó cần phải chạm vào một lần nữa sau đó mới có thể scroll theo chiều horizontal:
![Issue when scroll](https://cdn-images-1.medium.com/max/1600/1*hoxc1C-I-UTh4WPLnDZlSA.gif).

Đó không phải là một vấn đề lớn, nhưng từ quan điểm user friendliness, thì tính năng nhỏ như vậy sẽ làm ảnh hưởng rất nhiều đến trải nghiệm người dùng.
Vì vậy, chúng ta cần làm gì để giải quyết được vấn đề đó?

# Solution
Ban đầu, tôi đã suy nghĩ về việc tự mình quản lý luồng  touch, sử dụng  custom RecyclerView  để override **onInterceptTouchEvent** function theo blog [ Understanding Android touch flow control.](https://medium.com/@elye.project/understanding-android-touch-flow-control-bcc413e6a57e)

Tuy nhiên, điều này cực kỳ khó khăn, vì nếu tôi thực hiện điều đó, RecyclerView vertical có thể được scroll ngay lập tức, nhưng sau đó nó sẽ ngăn không cho RecyclerView scroll vertical  khi chạm vào RecyclerView horizontal.
# Sử dụng addOnItemTouchListener
Sau đó, tôi tìm hiểu ra rằng trong RecyclerView có hỗ trọ phương thức để chặn touch behavior, bằng cách sử dụng `*addOnItemTouchListener*`.
Nói tóm lại, trong RecyclerView chỉ cần thêm `*ItemTouchListener*` như dưới đây, để giải quyết được vấn đề đã đặt ra:
```
recycler_view.addOnItemTouchListener(
  object: RecyclerView.OnItemTouchListener {
    override fun onTouchEvent(rv: RecyclerView, e: MotionEvent) {}
    override fun onInterceptTouchEvent(rv: RecyclerView, e: 
            MotionEvent): Boolean {
        if (e.action == MotionEvent.ACTION_DOWN &&
            rv.scrollState == RecyclerView.SCROLL_STATE_SETTLING) {
            rv.stopScroll()
        }
        return false
    }
    override fun onRequestDisallowInterceptTouchEvent(
        disallowIntercept: Boolean) {}
})
```

Kết quả trông giống như bên dưới, chỉ cần một lần chạm trên Horizontal RecyclerView, có thể cuộn theo chiều Horizontal mà không cần phải chạm lại,

![Solution scroll](https://cdn-images-1.medium.com/max/1600/1*vKVmHLjHNL_FpMhmQ6NfpA.gif).
Tôi hy vọng bài viết này sẽ hữu ích cho bạn

[Thao khảo mã code ở đây](https://github.com/elye/demo_android_vertical_horizontal_recyclerview_scroll)

Bài viết được dịch từ [đây](https://medium.com/@elye.project/smooth-cross-recyclingviews-swipe-cc2810e13e0a?sk=eee448ba230f0a764512f0142f8674e1)