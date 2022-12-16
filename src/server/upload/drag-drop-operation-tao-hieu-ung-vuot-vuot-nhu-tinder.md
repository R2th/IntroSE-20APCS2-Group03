Android drag & drop framework giúp ứng dụng của bạn cho phép user di chuyển các thành phần trên màn hình dựa trên hành động kéo thả. Mục đích cốt lõi của nó là phục vụ cho chuyển động data, ngoài ra chúng ta còn có thể sử dụng nó để phục vụ những UI actions khác, ví dụ như kéo thả view từ vị trí này qua vị trí khác…

# 1. Tổng quan
Hoạt động drag & drop sẽ bắt đầu khi user bắt đầu có hành động kéo data, ứng dụng sẽ thông báo cho hệ thống rằng hoạt động dragging được bắt đầu. Hệ thống sẽ bắn calls back trở lại ứng dụng để nhận biết thành phần đại diện cho data đang được dragging. Khi user di chuyển ngón tay, system sẽ bắn những drag events tới drag event listener object và drag event callback methods có liên quan tới View đó bên trong layout. Và cuối cùng, khi user thả ngón tay ra, hoạt động drag sẽ kết thúc.

Để khởi tạo drag event listener object thì bạn implement từ interface View.OnDragListener . Và các View object đăng ký listener này chỉ cần gọi phương thức setOnDragListener() .

Khi user bắt đầu kéo data, hành động này sẽ mang theo cả data đang được moving và metadata mô tả nó gửi tới hệ thống. Trong khi user dragging data, hệ thống sẽ bắn drag events tới drag event listener/callback methods của mỗi View có đăng ký nhận drag event. Listeners/Callback methods sẽ dựa vào meta data để quyết định liệu có chấp nhận data được moving khi nó dropped không. Khi data được thả trên 1 View object, nếu listener hoặc callback method của View đó đã thông báo với hệ thống rằng chấp nhận drop action của data này, thì hệ thống sẽ bắn data đó tới listener/callback method của nó.

## 1.1. Drag & drop process - quá trình kéo & thả
Một drag & drop process có 4 giai đoạn cơ bản như sau:
### Giai đoạn 1 - Started
Khi user bắt đầu hành động drag data. Ứng dụng sẽ call method startDrag() để thông báo bắt đầu drag events với hệ thống. Arguments bên trong method này bao gồm có data moving, metadata mô tả data này, và callback method để vẽ drag shadow.

Trước tiên hệ thống sẽ callback lại ứng dụng để nhận drag shadow, sau đó nó hiển thị drag shadow này trên màn hình thiết bị.

Tiếp theo, hệ thống gửi drag events với action type ACTION_DRAG_STARTED tới tất cả View object trong layout. Để đăng ký lắng nghe toàn bộ quá trình kéo thả này, listeners phải return true. Và chỉ những listeners có đăng ký mới có thể tiếp tục lắng nghe. Từ đó, listeners có thể thay đổi cách thức hiển thị của View object khi nó nhận được action data dropped. Ngược lại, nếu listeners return false, nghĩa là nó không đăng ký lắng nghe drag & drop process này với hệ thống cho tới khi hệ thống bắn ra drag events với action type ACTION_DRAG_ENDED.
### Giai đoạn 2 - Continuing
Khi user tiếp tục drag. Nếu drag shadow giao nhau với vùng hiển thị của View object thì hệ thống sẽ gửi 1 hoặc nhiều drag events tới listener của View object đó (nếu nó có đăng ký lắng nghe process). Listener của View object này cũng có thể thay đổi giao diện của View để phản hồi lại sự kiện này.

### Giai đoạn 3 - Dropped
Khi user thả drag shadow bên trong vùng hiển thị (bounding box) của View object (nếu listener của View đó chấp nhận data), hệ thống sẽ bắn 1 drag event với action type ACTION_DROP và arguments bên trong startDrag() method tới listener của View object này. Listener cần return true cho hệ thống nếu chấp nhận action drop thành công.

Nếu user thả drag shadow bên trong bounding box của View object không đăng ký lắng nghe process thì quá trình tiếp nhận data sẽ không xảy ra.

### Giai đoạn 4 - Ended
Cuối cùng, hệ thống sẽ bắn ra drag event với action type ACTION_DRAG_ENDED tới tất cả listeners để thông báo kết thúc process này.

## 1.2. Drag event listener & callback method
View object có thể nhận drag event bởi 1 trong 2 cách: implements View.OnDragListener hoặc call onDragEvent(DragEvent) callback method của nó. Bằng bất kể cách nào, View object sẽ nhận được 1 DragEvent object được bắn từ hệ thống.

Thông thường mình sẽ sử dụng listener hơn là callback method, vì callback method yêu cầu ta phải phân lớp các lớp View, còn với listener, ta chỉ việc implements 1 lần và dùng cho tất cả. Nếu bạn dùng cả 2 cách, thì hệ thống sẽ gọi tới listener đầu tiên và chỉ gọi tới callback method trong trường hợp listener return false.

## 1.3. Drag events
Hệ thống bắn ra drag event được bọc trong 1 DragEvent object. Object này bao gồm action type để thông báo cho listener những gì đang diễn ra trong drag & drop process. Ngoài ra drag event object còn mang theo những data khác phụ thuộc vào action type. 

Để nhận action type, listener calls getAction() method. Có tổng cộng 6 giá trị action type được định nghĩa sẵn bên trong DragEvent class. [Tham khảo]

Ngoài ra, drag event object còn mang theo data bên trong arguments của startDrag() method. Một số loại data chỉ phù hợp với vài action nhất định. [Tham khảo]

## 1.4. The drag shadow - hình ảnh đại diện data moving
Trong khi user thực hiện drag & drop operation, hệ thống sẽ hiển thị 1 hình ảnh đại diện cho đối tượng đang được dragging. Bạn cần khởi tạo View.DragShadowBuilder object và truyền vào arguments khi call startDrag() method để hệ thống có thể xác định được drag shadow.

Thành phần của một View.DragShadowBuilder class bao gồm 2 constructors và 2 methods:
Constructor
View.DragShadowBuilder(View): Constructor này nhận vào 1 View bất kỳ bên trong ứng dụng của bạn. Trong quá trình build drag shadow bạn có thể truy cập vào View này. View này hoàn toàn không liên quan gì đến View mà user dragging.
View.DragShadowBuilder(): Nếu sử dụng constructor này và bạn không extend View.DragShadowBuilder hoặc override its methods, bạn sẽ nhận được 1 drag shadow vô hình. Hệ thống không báo lỗi.
Method
onProvideShadowMetrics(): Method này được call ngay lập tức sau startDrag() method để cung cấp dimensions và touch point của drag shadow. Method này bao gồm 2 arguments, trong đó:
- dimensions: Là 1 Point object. Cung cấp kích thước width (x), height (y) của drag shadow.
- touch point: Là 1 Point object. Cung cấp vị trí (x, y) của drag shadow trong khi user thực hiện drag, nói cách khác nó chính là vị trí điểm chạm ngón tay của user.
onDrawShadow(): Method này được call ngay lập tức sau onProvideShadowMetrics() method để nhận drag shadow của chính nó. Method này có 1 argument là 1 Canvas object được hệ thống xây dựng từ arguments của onProvideShadowMetrics() method để vẽ drag shadow. 

> *Note: To improve performance, you should keep the size of the drag shadow small. For a single item, you may want to use a icon. For a multiple selection, you may want to use icons in a stack rather than full images spread out over the screen.*

# 2. Thực hành
Bài toán: Chúng mình sẽ cùng ứng dụng kiến thức drag&drop operation vừa học để xây dựng một demo nho nhỏ: **Tạo hiệu ứng reaction như tinder nhé.**

Đây là expected result:
[Link preview drive video](https://drive.google.com/file/d/1f9aDfSL3Wsrqa4gvgWHNXqTA3lyPW2LH/view?usp=sharing)
*(mình quay bằng máy ảo android dung lượng nặng quá nên mình không biết phải up lên bằng cách nào, bạn có trick nào không chỉ mình với nhé)*

Phân tích qua một chút:
- Khi user nhấp giữ và kéo ảnh qua trái/phải thì hình ảnh reaction result tương ứng (trái tim/dấu x) sẽ hiển thị lên để thể hiện cho user thấy expected result. Cuối cùng khi user thả tấm ảnh vào bên nào thì kết quả của bên đó sẽ được show lên màn hình.
- Vậy layout của mình cần có 1 tấm ảnh đại diện cho View object được drag, 2 View object đại diện cho những listeners (reject/approve), và 1 View object result (cái này mình sẽ add trong code chứ không bỏ vào file layout).

Ok vậy thì chúng ta bắt đầu thôi.

*Warning: thấy code mình cùi bắp thì comment góp ý chứ đừng chửi mình nhé, sẽ là một tổn thương rất lớn với mình đấy =))*

Trước tiên là xây dựng layout, các bạn có thể tham khảo qua layout của mình:

```scala
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   android:background="@android:color/white"
   tools:context=".MainActivity">

   <FrameLayout
       android:id="@+id/frameContent"
       android:layout_width="match_parent"
       android:layout_height="match_parent"
       android:layout_margin="8dp">

       <com.google.android.material.imageview.ShapeableImageView
           android:id="@+id/imgAvatar"
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           android:layout_margin="8dp"
           android:adjustViewBounds="true"
           android:scaleType="centerCrop"
           android:src="@drawable/girl"
           app:shapeAppearanceOverlay="@style/roundedCornersImageView" />
   </FrameLayout>

   <FrameLayout
       android:id="@+id/frameApproved"
       android:layout_width="96dp"
       android:layout_height="match_parent"
       app:layout_constraintEnd_toEndOf="parent">

       <ImageView
           android:id="@+id/imgApprove"
           android:layout_width="96dp"
           android:layout_height="96dp"
           android:layout_marginTop="144dp"
           android:src="@drawable/tinder_like"
           android:visibility="invisible"
           app:layout_constraintBottom_toBottomOf="parent"
           app:layout_constraintDimensionRatio="1:1" />
   </FrameLayout>

   <FrameLayout
       android:id="@+id/frameReject"
       android:layout_width="96dp"
       android:layout_height="match_parent"
       app:layout_constraintStart_toStartOf="parent">

       <ImageView
           android:id="@+id/imgReject"
           android:layout_width="96dp"
           android:layout_height="96dp"
           android:layout_marginTop="144dp"
           android:src="@drawable/tinder_nope"
           android:visibility="invisible"
           app:layout_constraintBottom_toBottomOf="parent"
           app:layout_constraintDimensionRatio="1:1"/>
   </FrameLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

Sau khi đã xây dựng xong layout, chúng ta tiến hành bước đầu tiên là start 1 drag.
Mình sẽ thực hiện start drag khi user nhấp giữ vào hình ảnh bắt đầu kéo. Mình cần khởi tạo các thành phần cần thiết để truyền vào func `startDragAndDrop()`:

```swift
imgAvatar.setOnLongClickListener { view ->
   view.tag = "image avatar"
   // Create a new ClipData.
   // This is done in two steps to provide clarity. The convenience method
   // ClipData.newPlainText() can create a plain text ClipData in one step.
   val item = ClipData.Item(view.tag as? CharSequence)

   // Create a new ClipData using the tag as a label, the plain text MIME type, and
   // the already-created item. This will create a new ClipDescription object within the
   // ClipData, and set its MIME type entry to "text/plain"
   val dragData = ClipData(
       view.tag as? CharSequence, // label
       arrayOf(ClipDescription.MIMETYPE_TEXT_PLAIN), // mineType
       item // item
   )

   // Instantiates the drag shadow builder.
   val shadowBuilder = View.DragShadowBuilder(view)
   view.startDragAndDrop(dragData, shadowBuilder, view, 0)
   true
}
```

Tiếp đến, mình cần khởi tạo 1 View.OnDragListener object và implements logic tương ứng với mỗi event action:

```swift
// Creates a new drag event listener
private val dragListener = View.OnDragListener { view, event ->
   // Handles each of the expected events
   when (event.action) {
       DragEvent.ACTION_DRAG_STARTED -> {
           // Determines if this View can accept the dragged data
           event.clipDescription.hasMimeType(ClipDescription.MIMETYPE_TEXT_PLAIN)
       }
       DragEvent.ACTION_DRAG_ENTERED -> {
           // Applies visibility mode is View.VISIBLE to the View.
           // Return true; the return value is ignored.
           when (view.id) {
               R.id.frameApproved -> imgApprove.visibility = View.VISIBLE
               R.id.frameReject -> imgReject.visibility = View.VISIBLE
           }

           // Invalidate the view to force update view appearance
           view.invalidate()
           true
       }
       DragEvent.ACTION_DRAG_LOCATION -> {
           // Ignore the event
           true
       }
       DragEvent.ACTION_DRAG_EXITED -> {
           // Re-sets the visibility mode to default. Returns true; the return value is ignored.
           when (view.id) {
               R.id.frameApproved -> imgApprove.visibility = View.INVISIBLE
               R.id.frameReject -> imgReject.visibility = View.INVISIBLE
           }

           // Invalidate the view to force update view appearance
           view.invalidate()
           true
       }
       DragEvent.ACTION_DROP -> {
           // Add reaction result to the view to indicate that action applied
           val resultIcon = ImageView(this)
           when (view.id) {
               R.id.frameApproved -> {
                   resultIcon.setBackgroundResource(R.drawable.ic_approved)
               }
               R.id.frameReject -> {
                   resultIcon.setBackgroundResource(R.drawable.ic_rejected)
               }
           }
           frameContent.addView(resultIcon)

           // Invalidate the view to force update view appearance
           view.invalidate()

           // Returns true. DragEvent.getResult() will return true.
           true
       }
       DragEvent.ACTION_DRAG_ENDED -> {
           // Re-sets the visibility mode to View.INVISIBLE
           when (view.id) {
               R.id.frameApproved -> imgApprove.visibility = View.INVISIBLE
               R.id.frameReject -> imgReject.visibility = View.INVISIBLE
           }

           // Invalidate the view to force update view appearance
           view.invalidate()

           // Does a getResult(), and displays what happened.
           when (event.result) {
               true ->
                   Toast.makeText(this, "The drop was handled.", Toast.LENGTH_SHORT)
               else ->
                   Toast.makeText(this, "The drop didn't work.", Toast.LENGTH_SHORT)
           }.show()

           // returns true; the value is ignored.
           true
       }
       else -> {
           // An unknown action type was received.
           Log.e("DragDrop Example", "Unknown action type received by OnDragListener.")
           false
       }
   }
}
```

Và cuối cùng là đăng ký listener cho các View objects cần thiết:

```go
// Register drag listeners
frameApproved.setOnDragListener(dragListener)
frameReject.setOnDragListener(dragListener)
```

Bây giờ thì nhấp build project và trải nghiệm kết quả thôi!

OK! Chia sẻ về chủ đề Drag&Drop operation của mình đến đây là hết. Cảm ơn bạn đã dành thời gian cho mình. Hẹn gặp lại bạn lần sau với những chủ đề hay ho hơn nhé.
Tạm biệt!