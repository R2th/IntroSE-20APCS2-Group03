### I. Introduce
Bạn đã bao giờ rơi vào tình huống cần tạo một ứng dụng Android với tính năng kéo và thả chưa? Nếu chưa thì có lẽ những gì bạn có thể cảm thấy gì lúc này là nó sẽ trông giống như một thứ gì đó rất phức tạp với các phép tính về chạm, kéo, chuyển động của các đối tượng và nhiều thứ tương tự như vậy, nhưng trên thực tế, đã có một API rất tuyệt trong Android Framework, vì vậy chúng ta chỉ cần sử dụng nó và xem nó hoạt động như thế nào trong thực tế.

Trong bài viết này, chúng ta sẽ cùng tạo một ứng dụng đơn giản, sẽ có các từ ngẫu nhiên và từ những từ đó, chúng ta sẽ tạo ra một câu. Mỗi từ sẽ được biểu diễn dưới dạng một box, và bằng cách kéo và thả, chúng ta sẽ tạo thành câu của mình. Vì vậy, UI sẽ có hai Recycler View, Một Recycler View cho các từ hỗn hợp, và Recycler View thứ hai cho một câu hoàn chỉnh sau khi kéo(các từ có thứ tự).

![](https://images.viblo.asia/864a0838-c93f-4e16-af19-870b2314bde3.png)

### II. Start
Về cơ bản, đây là phần code để biết ứng dụng của chúng ta sẽ trông như thế nào.

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

Chúng ta có hai thành phần. Phần đầu tiên là nơi các mục sẽ được kéo và thứ hai là nơi các mục sẽ được thả.

Hãy bắt đầu từ cái đầu tiên. Trong dự án demo, thao tác kéo sẽ bắt đầu bằng một cú nhấp chuột dài (long click) vào từng item của Recyclerview. Vì vậy, trong view holder của adapter, hãy thêm *LongClickListener* vào từng item.

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

Ở đây, instance  của *ClipData* là một dữ liệu đơn giản về item có thể kéo,  *DragShadowBuilder* là hình ảnh, được đại diện cho người dùng trong quá trình kéo.

Bây giờ chúng ta có thể kéo các từ, nhưng chúng ta không thể thả chúng.

Để có thể thả, chúng ta sẽ triển khai *DragListener*...

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
```
… và sau đó apply nó vào recyclerview. 

```
// binding is a viewBinding instance
binding.rvSentence.setOnDragListener(
  DropListener {
    wordsAdapter.removeItem(selectedWord) // remove dropped word from word box
    sentenceAdapter.addItem(selectedWord) // add dropped word to sentence
  }
)
```

### III. Result

![](https://images.viblo.asia/2423d7bc-7442-40ff-833c-041c2e75617e.gif)

Vâng, đây là tất cả những gì bạn cần. Những thứ cơ bản để thực hiện thao tác kéo và thả đơn giản trong bất kỳ ứng dụng Android nào. Bạn có thể thêm nhiều tinh chỉnh để làm cho quá trình kéo và thả phù hợp hơn với ứng dụng của bạn.

Source code đầy đủ của dự án demo, có thể hữu ích, nếu hướng dẫn này chưa đủ đối với bạn:

[Link Demo Github](https://github.com/robertlevonyan/DragAndDropDemo)

Cảm ơn các bạn đã đọc bài viết, xin chào và hẹn gặp lại trong các bài viết tiếp theo.

[Nguồn tham khảo](https://proandroiddev.com/drag-and-drop-in-android-all-you-need-to-know-6df8babfb507)