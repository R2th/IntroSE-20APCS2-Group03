# I. Mở đầu
* Khi đề cập đến **drap&drop** thường thì chúng ta sẽ liên tưởng tới những dòng code tính toán tọa độ các điển chạm, các sự kiện kéo thả, tốc độ di chuyển của các đối tượng và nhiều thứ liên quan. Tuy nhiên trong thực tế, Android đã hỗ trợ các API thực hiện rất tốt các tính năng này. Hôm nay chúng ta sẽ làm một demo nhỏ để tìm hiểu về khả năng hổ trợ **drap&drop** của Android.
# II. Nội dung chính
* Chúng ta sẽ tạo ra một ứng dụng đơn giản để xử lý nối ghép các từ trong một câu bằng cách kéo thả để ghép các từ trong câu đó theo một thứ tự nhất định. Về mặt UI, sẽ có hai RecyclerView – một để chứa các từ bị xáo trộn – một để chưa câu hoàn chỉnh.
```
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/bg_gradient"
  tools:context=".MainActivity">

  <androidx.cardview.widget.CardView
    android:id="@+id/rvSentenceCard"
    android:layout_width="0dp"
    android:layout_height="0dp"
    android:layout_margin="16dp"
    app:cardBackgroundColor="@android:color/transparent"
    app:cardCornerRadius="8dp"
    app:cardElevation="0dp"
    app:layout_constraintBottom_toTopOf="@id/rvWords"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHeight_percent="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent">

    <androidx.recyclerview.widget.RecyclerView
      android:id="@+id/rvSentence"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:overScrollMode="never" />
  </androidx.cardview.widget.CardView>

  <androidx.recyclerview.widget.RecyclerView
    android:id="@+id/rvWords"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:clipToPadding="false"
    android:overScrollMode="never"
    android:padding="16dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHeight_percent="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@id/rvSentenceCard" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
* Chúng ta có 2 thành phần chính – thành phần đầu tiên chứa các item được kéo đến – thành phần thứ hai chứa các item bị kéo đi. Sự kiện drag sẽ bắt đầu khi chúng ta long-click trên mỗi item của RecyclerView, và trong view holder sẽ được hiện thực như sau:
```
itemView.setOnLongClickListener { view ->
  val data = ClipData.newPlainText("", word)
  val shadowBuilder = View.DragShadowBuilder(view)
  if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
    view.startDragAndDrop(data, shadowBuilder, view, 0)
  } else {
    view.startDrag(data, shadowBuilder, view, 0)
  }
  true
}
```
* **ClipData** đóng vai trò tạo ra một dữ liệu đơn giản của item có thể kéo được và **DragShadowBuilder** đại diện cho user trong quá trình kéo. Bây giờ chúng ta có thể drap các từ nhưng chưa thể drop chúng đúng vị trí. Để có drop thì chúng ta cần phải sử dụng **DragListener**
```
class DropListener(private val onDrop: () -> Unit) : View.OnDragListener {
  override fun onDrag(view: View, dragEvent: DragEvent): Boolean {
    when (dragEvent.action) {
      // when item has been dropped, notify about it
      DragEvent.ACTION_DROP -> onDrop()
    }

    return true
  }
}

// binding is a viewBinding instance
binding.rvSentence.setOnDragListener(
  DropListener {
    wordsAdapter.removeItem(selectedWord) // remove dropped word from word box
    sentenceAdapter.addItem(selectedWord) // add dropped word to sentence
  }
)
```
* Và kết quả

![](https://images.viblo.asia/0930cecc-81a7-444b-b361-a4827d96d0a6.gif)
# III. Kết
* Với demo đơn giản như trên, chúng ta đã có thể xử lý sự kiện drag&drop chỉ dùng API của Android cũng cấp. Hy vọng từ demo đơn giản này, các bạn sẽ có thể xây dựng nên các ứng dụng có tính phức tạp cao hơn.
* Nội dung bài viết được tham khảo tại [đây](https://proandroiddev.com/drag-and-drop-in-android-all-you-need-to-know-6df8babfb507).