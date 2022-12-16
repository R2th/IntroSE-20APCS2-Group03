Trong bài này, mình sẽ giới thiệu cho mọi người 1 thư viện rất hay, đó là **InboxRecyclerView**- một thư viện để xây dựng điều hướng có thể mở rộng View với cử chỉ pull-to-dismiss.
[Xem video demo](http://saket.me/wp-content/uploads/2018/09/google-inbox.mp4)
Library có 2 phần: `InboxRecyclerView` sử dụng cho List item trong RecyclerView hoặc List View and `ExpandablePageLayout` sử dụng cho expandable content. Khi item được clicked, `InboxRecyclerView` sẽ thực hiện theo 3 bước:

**1. Prepare to expand**

`InboxRecyclerView` căn chỉnh nội dung với list item được clicked. Trong expansion, chúng được cross-faded cho nhau để trong giống như list item đang được expanding.
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/align_content_with_item_on_click.mp4)
```
val itemLocation: Rect = captureViewLocation(clickedItem)
contentPage.visibility = View.VISIBLE
contentPage.translationY = itemLocation.y
contentPage.setDimensions(itemLocation.width, itemLocation.height)
```
Tại điểm này, App sẽ load nội dụng đến `ExpandablePageLayout`. Bạn có thể xem ví dụ [sample app](https://github.com/saket/InboxRecyclerView/blob/9e5881c945767aae4d627dbf4f3963bc65131d69/sample/src/main/java/me/saket/inboxrecyclerview/sample/inbox/InboxActivity.kt#L88).
**2. Expanding content**
Khi nội dung được căn chỉnh, bước tiếp theo là tạo animation trong expansion.
Trong thư viện sử dụng tính năng clipping content của View. Sử dụng View#setClippedBounds(Rect), phần hiển thị của View có thể tạo animated để tạo ảo tưởng rằng nó có thể thay đổi kích thước.
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/expand_content.mp4)
```kotlin
fun animateDimensions(toWidth: Int, toHeight: Int) {
  val fromWidth = clipBounds.width()
  val fromHeight = clipBounds.height()

  ObjectAnimator.ofFloat(0F, 1F)
    .addUpdateListener {
      val scale = it.animatedValue as Float
      val newWidth = (toWidth - fromWidth) * scale + fromWidth
      val newHeight = (toHeight - fromHeight) * scale + fromHeight)
      contentPage.clipBounds = Rect(0, 0, newWidth, newHeight)
    }
    .start()
}

```
Sử dụng Transition API với [ChangeBounds](https://developer.android.com/reference/android/transition/ChangeBounds). Nó tận dụng lợi thế của 1 hidden function: ViewGroup#suppressLayout() nó sẽ vô hiệu hóa hệ thống phân cấp dẫ đến animation được trơn tru hơn.
```kotlin
fun animateDimensions(toWidth: Int, toHeight: Int) {
  val transition = TransitionSet()
    .addTransition(ChangeBounds())
    .addTransition(ChangeTransform())
    .addTransition(Slide())
    .setOrdering(TransitionSet.ORDERING_TOGETHER)
  TransitionManager.beginDelayedTransition(parent as ViewGroup, transition)

  val params = contentPage.layoutParams
  params.width = toWidth
  params.height = toHeight
  contentPage.layoutParams = params
}
```
Rất tiếc, trải nghiệm voiws Transitions API không được tốt cho lắm, nơi expand animation đôi khi hoàn thành đột ngột.
**3. Animating list items**
Để làm cho nó trông giống như mục mở rộng đang đẩy các mực ra ngoài screen, các mục được di chuyển đồng bộ với nội dung mở trọng trong khi animation. Điều này được thực hienej trong [ItemExpandAnimator](https://github.com/saket/InboxRecyclerView/blob/master/inboxrecyclerview/src/main/java/me/saket/inboxrecyclerview/animation/ItemExpandAnimator.kt), và customisable.
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/animate_list_items.mp4)

#### Pull to collapse
Đây là 1 tính năng của  `InboxRecyclerView`. Nội dung có thể được collapsed khi dragging nó theo chiều dọc và dọc theo 2 hướng.
The gesture for this takes advantage of a property of Views where touch events can be intercepted by ViewGroups before they reach their children. I’ve explained this in a bit more detail in [my other post](http://saket.me/flick-dismissible-images/).
Cử chỉ cho tính năng này tận dụng lợi thế thuộc tính của View, nơi touch events có thể chặn boiwr ViewGroup trước khi chúng tiếp cận View children của chúng.
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/pull_to_collapse_2.mp4)
Khi cử chỉ vertical được phát hiện, trang được scrolled với cử chỉ. Phần thú vị của điều này là nội dung không chính xác di chuyển bằng ngón tay của người dùng. Một số ma sát được thêm vào chuyển động.
```kotlin
override fun onTouch(view, event): Boolean {

  when (event.action) {
    ACTION_MOVE -> {
      val deltaY = event.rawY - lastTouchY
      val friction = 4F
      var deltaYWithFriction = deltaY / frictionFactor

      view.translationY += deltaYWithFriction
      val lastTouchY = event.rawY
    }

    ACTION_UP -> {
      if (isEligibleForCollapse()) {
        collapsePage()
      } else {
        smoothlyResetPage()
      }
    }
  }
}
```

Ma sát ngày phát triển lớn hơn một khi page vượt qua khoảng cách ngưỡng và đủ điều kiện thu gọn:
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/pull_to_collapse_friction.mp4)

```kotlin
if (isEligibleForCollapse()) {
  val extraFriction = collapseDistanceThreshold / view.translationY
  deltaYWithFriction *= extraFriction
}
```

#### Polish
InboxRecyclerView áp dụng làm mờ khi nó bị che phủ. Khi nội dung của page dudocwj pulled, sắc thái làm mờ đi để đưa ra chỉ báo trực quan khi trang có thể thu gọn. 
[Click xem video demo](http://saket.me/wp-content/uploads/2018/09/background_tint_2.mp4)
Các bạn có thể xem thư viện và ví dụ [tại đây](https://github.com/saket/InboxRecyclerView)