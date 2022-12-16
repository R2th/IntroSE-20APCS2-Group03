Vài ngày trước, tôi đã làm việc trong một dự án yêu cầu Horizontal NEWS di chuyển trong một mục mới cứ sau 3500ms.

Trong khi bắt đầu, tôi rất chắc chắn rằng tôi sẽ tìm thấy một thư viện thực hiện điều này. Vì vậy, tôi đã dành vài giờ để tìm kiếm thư viện plug and play đó nhưng tất cả các chương trình đã bị hủy bỏ. Vì vậy, tôi quyết định thực hiện một số nghiên cứu về thư viện Android gần nhất mà tôi có thể thao tác để cung cấp cho tôi cái này. Tôi đã bắt gặp một lớp được xây dựng có tên là **LinearSmoothScrolling**.


```kotlin
private class SmoothScroller extends LinearSmoothScroller {
        private final float distanceInPixels;
        private final float duration;

        public SmoothScroller(Context context, int distanceInPixels, int duration) {
            super(context);
            this.distanceInPixels = distanceInPixels;
            this.duration = duration;
        }

        @Override
        public PointF computeScrollVectorForPosition(int targetPosition) {
            return ScrollingLinearLayoutManager.this
                    .computeScrollVectorForPosition(targetPosition);
        }

        @Override
        protected int calculateTimeForScrolling(int dx) {
            float proportion = (float) dx / distanceInPixels;
            return (int) (duration * proportion);
        }
    }
  ```
  
  
  Lớp này mở rộng từ RecyclerView.SmoothScroller cung cấp một phương thức để cuộn đến một mục xem tái chế. Mặt khác để làm việc này. Chúng tôi đã kết hợp điều này với Trình quản lý bố cục tùy chỉnh để hỗ trợ chức năng cuộn.
  
  
  ```kotlin
  
 public class ScrollingLinearLayoutManager extends LinearLayoutManager {
    private final int duration;

    public ScrollingLinearLayoutManager(Context context, int orientation, boolean reverseLayout, int duration) {
        super(context, orientation, reverseLayout);
        this.duration = duration;
    }

    @Override
    public void smoothScrollToPosition(RecyclerView recyclerView, RecyclerView.State state,
                                       int position) {
        View firstVisibleChild = recyclerView.getChildAt(0);
        int itemHeight = firstVisibleChild.getHeight();
        int currentPosition = recyclerView.getChildLayoutPosition(firstVisibleChild);
        int distanceInPixels = Math.abs((currentPosition - position) * itemHeight);
        if (distanceInPixels == 0) {
            distanceInPixels = (int) Math.abs(firstVisibleChild.getY());
        }
        SmoothScroller smoothScroller = new SmoothScroller(recyclerView.getContext(), distanceInPixels, duration);
        smoothScroller.setTargetPosition(position);
        startSmoothScroll(smoothScroller);
    }

    private class SmoothScroller extends LinearSmoothScroller {
        private final float distanceInPixels;
        private final float duration;

        public SmoothScroller(Context context, int distanceInPixels, int duration) {
            super(context);
            this.distanceInPixels = distanceInPixels;
            this.duration = duration;
        }

        @Override
        public PointF computeScrollVectorForPosition(int targetPosition) {
            return ScrollingLinearLayoutManager.this
                    .computeScrollVectorForPosition(targetPosition);
        }

        @Override
        protected int calculateTimeForScrolling(int dx) {
            float proportion = (float) dx / distanceInPixels;
            return (int) (duration * proportion);
        }
    }
}
```
Với các mã ở trên, chúng ta chỉ cần gọi phương thức smoothscrolltopocation và chỉ định vị trí chúng ta muốn cuộn đến khi hoạt động của chúng ta bắt đầu nhưng chúng ta muốn chuyển từ một vị trí trong tái chế sang một vị trí khác trong một khoảng thời gian xác định.


```Kotlin
    private class SwipeTask extends TimerTask {
    public void run() {
        newsRecyclerView.post(()->{
            int nextPage = (scrollManager.findFirstVisibleItemPosition() + 1) % mNewsAdapter.getItemCount();
            newsRecyclerView.smoothScrollToPosition(nextPage);
        });
    }
}
```
   
Sử dụng Lớp **SwipeTask**, sau đó chúng ta có thể tạo phương thức để chơi, dừng và đặt lại bộ đếm thời gian cuộn của mình.

```kotlin
private void stopScrollTimer() {
    if (null != swipeTimer) {
        swipeTimer.cancel();
    }
    if (null != swipeTask) {
        swipeTask.cancel();
    }
}

private void resetScrollTimer() {
    stopScrollTimer();
    swipeTask = new SwipeTask();
    swipeTimer = new Timer();
}

private void playCarousel() {
       resetScrollTimer();
       swipeTimer.schedule(swipeTask,0, DEFAULT_SLIDE_INTERVAL);
}
```

Cuối cùng, chúng tôi gọi nhiệm vụ tái chế của chúng tôi là Trình quản lý bố cục Scroller mà chúng tôi đã tạo.

```kotlin
scrollManager = new ScrollingLinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false, 100);
newsRecyclerView.setLayoutManager(scrollManager);
newsRecyclerView.setAdapter(mNewsAdapter);
```
Điều này làm cho một cách đơn giản để tạo một Carousel đơn giản cho các mục Recyclerview.
Nếu điều này hữu ích, vui lòng để lại một cái vỗ tay và chia sẻ


##### Ref: https://medium.com/@tejumoladavid_91868/how-to-implement-an-horizontal-timed-scrolling-recyclerview-in-android-e4da369532f0