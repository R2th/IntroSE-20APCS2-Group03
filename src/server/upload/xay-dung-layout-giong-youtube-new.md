## Dạo đầu
Xin chào anh em.
Bài viết này nói về cách mình đã dựng lên thư viện [DraggablePanel](https://github.com/hoanganhtuan95ptit/DraggablePanel) một thư viện xây dựng layout giống YOUTUBE. Thư viện được mình xây dựng trên những hiểu biết hiện có của mình nên sẽ có nhiều chỗ chưa thực sự tối ưu. Mình rất mong nhận được gạnh đá của anh em =))).

![Alt text](https://github.com/hoanganhtuan95ptit/DraggablePanel/raw/master/output/ezgif.com-video-to-gif.gif)

Giờ thì bắt đầu thôi nào!!
## XMl  [Link](https://github.com/hoanganhtuan95ptit/DraggablePanel/blob/master/draggable/src/main/res/layout/layout_draggable_panel.xml)
```java
<?xml version="1.0" encoding="utf-8"?>
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <com.hoanganhtuan95ptit.draggable.widget.DragFrame
        android:id="@+id/frameDrag"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:background="@android:color/transparent">

        <com.google.android.material.appbar.AppBarLayout
            android:id="@+id/appbarLayout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@android:color/transparent"
            app:elevation="0dp">

            <com.google.android.material.appbar.CollapsingToolbarLayout
                android:id="@+id/collapsingToolbarLayout"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:layout_scrollFlags="scroll|exitUntilCollapsed">

                <androidx.appcompat.widget.Toolbar
                    android:id="@+id/toolbar"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:background="@android:color/transparent"
                    app:layout_collapseMode="pin" />
            </com.google.android.material.appbar.CollapsingToolbarLayout>
        </com.google.android.material.appbar.AppBarLayout>

        <FrameLayout
            android:id="@+id/frameSecond"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="@string/appbar_scrolling_view_behavior" />

        <FrameLayout
            android:id="@+id/frameFirst"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </com.hoanganhtuan95ptit.draggable.widget.DragFrame>

</merge>
```

Nhìn đến đây chắc anh em cùng giống mình đang chửi thế thằng viết code. (DM thằng code, layout rắc rối vl) (DragFrame lá cái méo gì thế nhỉ??) (sao phải dùng CollapsingToolbarLayout, AppBarLayout, Toolbar). Nhưng từ từ đã anh em cái gì nó cũng có lý do của nó =))). Mình xin trả lời từ thắc mắc của anh em.

Trước mình cũng chỉ dùng đến hai FrameLayout là `frameFirst` và `frameSecond`, nhưng rồi một ngày mình được xem video này [Cấm xem](https://www.youtube.com/watch?v=9RAqdgGXIj0&feature=share) bất ngờ chưa, nó là một video dọc. Là một fan chân chính với nhưng thế loại video nhẹ nhàng, tình cảm như: Anh thợ sửa ống nước may nắm, Cô hàng xóm... à nhầm  Xe đạp, Chờ anh trong con mưa, Quê tôi. Mình mới có cơ hội được xem những video doc và nhận ra rằng với các video đó youtube đã sử dụng cơ chế giống layout_behavior của CoordinatorLayout để có thể tối ưu nội dung bên dưới video (thực ra để nó tối ưu quảng cáo). 

(`DragFrame` lá cái méo gì thế nhỉ??) (sao phải dùng `CollapsingToolbarLayout`, `AppBarLayout`, `Toolbar`): nếu đọc nội dung bên trên thì chắc anh em cũng có câu trả cho mình rồi đúng không, vâng `dragFrame` là `CoordinatorLayout` và  `CollapsingToolbarLayout`, `AppBarLayout`, `Toolbar` là để hỗ trợ cho video dọc =))

Layout dựng xong, giờ là lúc phải xử lý chúng =)))

## CODE KOTLIN [Link](https://github.com/hoanganhtuan95ptit/DraggablePanel/blob/master/draggable/src/main/java/com/hoanganhtuan95ptit/draggable/DraggablePanel.kt)
 
 Đầu tiên Mình sẽ cần phải xây dựng cơ chế drag view 
```java
        private var downY = 0f
        private var deltaY = 0

        private var firstViewDown = false

        override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
            when (ev!!.action) {
                MotionEvent.ACTION_DOWN -> {
                    firstViewDown = isViewUnder(frameFirst, ev)
                    downY = ev.rawY
                }
                MotionEvent.ACTION_MOVE -> {
                    checkFrameFirstMove(ev)
                }
            }
            return firstViewMove
        }

        override fun onTouchEvent(ev: MotionEvent?): Boolean {
            val motionY = ev!!.rawY.toInt()
            when (ev.action) {
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    firstViewMove = false
                    firstViewDown = false
                    handleUp()
                }
                MotionEvent.ACTION_MOVE -> {
                    checkFrameFirstMove(ev)
                    if (firstViewMove) {
                        handleMove(motionY)
                    }
                }
            }
            return firstViewDown
        }
```

Khi nhắc đến drag thì có hai vấn đề chúng ta cần quan tâm đầu tiên là: chạm vào đâu (`ACTION_DOWN`) và khi nào di chuyển (`ACTION_MOVE`). Ở đây mình thiết lập bộ lắng nghe chạm trên `frameDrag`.

### ACTION_DOWN: 
```java

        override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
            when (ev!!.action) {
                MotionEvent.ACTION_DOWN -> {
                    firstViewDown = isViewUnder(frameFirst, ev)
                    downY = ev.rawY
                }
                MotionEvent.ACTION_MOVE -> {
                    checkFrameFirstMove(ev)
                }
            }
            return firstViewMove
        }
            ....
        private fun isViewUnder(view: View?, ev: MotionEvent): Boolean {
            return if (view == null) {
                false
            } else {
                ev.x >= view.left && ev.x < view.right && ev.y >= view.top && ev.y < view.bottom
            }
        }
```
`isViewUnder` Giúp mình phát hiện khi người dùng chạm vào `frameDrag` người dùng có đang chạm vào `frameFirst` không

### ACTION_MOVE

```java

        override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
            when (ev!!.action) {
                MotionEvent.ACTION_DOWN -> {
                    firstViewDown = isViewUnder(frameFirst, ev)
                    downY = ev.rawY
                }
                MotionEvent.ACTION_MOVE -> {
                    checkFrameFirstMove(ev)
                }
            }
            return firstViewMove
        }
            ....
        private fun checkFrameFirstMove(ev: MotionEvent) {
            if (firstViewMove) return
            val calculateDiff: Int = calculateDistance(ev, downY)
            val scaledTouchSlop: Int = getScaledTouchSlop(getContext())
            if (calculateDiff > scaledTouchSlop && firstViewDown) {
                deltaY = ev.rawY.toInt() - (frameDrag.layoutParams as LayoutParams).topMargin
                firstViewMove = true
            }
        }
```

`checkFrameFirstMove` giúp mình kiểm tra xem người dùng có đang di chuyển `frameFirst` hay không.

### FrameDrag, ToolBar và AppbarLayout

Ok vậy là chúng ta đã dựng xong bộ drag cho view, giờ là lúc chúng ta phải xử lý giao diện khi người dùng di chuyển `frameFirst`
```java
        private fun handleMove(motionY: Int) {
            setMarginTop(motionY - deltaY)
        }


        private fun setMarginTop(top: Int) {
            val marginTop = when {
                top < 0 -> 0
                top > mMarginTopWhenMin -> mMarginTopWhenMin
                else -> top
            }
    
            if (marginTop == mCurrentMarginTop) return
            mCurrentMarginTop = marginTop
    
            val percent: Float = mCurrentMarginTop * 1f / mMarginTopWhenMin
            setPercent(percent)
        }

        private fun setPercent(percent: Float) {
            if (mCurrentPercent == percent || percent > 1 || percent < 0) return
            mCurrentPercent = percent
    
            refresh()
        }

        /**
         * update ui all view
         */
        open fun refresh() {
    
            updateState()
    
            mDraggableListener?.onChangePercent(mCurrentPercent)
    
            val layoutParams = frameDrag.layoutParams as LayoutParams
            layoutParams.topMargin = (mMarginTopWhenMin * mCurrentPercent).toInt()
            layoutParams.leftMargin = (mMarginEdgeWhenMin * mCurrentPercent).toInt()
            layoutParams.rightMargin = (mMarginEdgeWhenMin * mCurrentPercent).toInt()
            layoutParams.bottomMargin = (mMarginBottomWhenMin * mCurrentPercent).toInt()
            frameDrag.layoutParams = layoutParams
    
            val toolBarHeight = when {
                firstViewMove -> {
                    (mHeightWhenMaxDefault - (mHeightWhenMaxDefault - mHeightWhenMinDefault) * mCurrentPercent).toInt()
                }
                mCurrentPercent == 0f -> {
                    mHeightWhenMaxDefault
                }
                else -> {
                    mHeightWhenMinDefault
                }
            }
    
            toolbar.reHeight(toolBarHeight)
    
            refreshFrameFirst()
        }
    
        /**
         * update ui frame first
         */
        open fun refreshFrameFirst() {
            val frameFistHeight = if (mCurrentPercent < mPercentWhenMiddle) {
                (mHeightWhenMax - (mHeightWhenMax - mHeightWhenMiddle) * mCurrentPercent / mPercentWhenMiddle)
            } else {
                (mHeightWhenMiddle - (mHeightWhenMiddle - mHeightWhenMin) * (mCurrentPercent - mPercentWhenMiddle) / (1 - mPercentWhenMiddle))
            }
    
            appbarLayout.reHeight(frameFistHeight.toInt())
        }                   
```

Khi người dùng di chuyển mình sẽ tính toán ra `%` dựa vào `marginTop`, Từ phần `%` hiện có mình sẽ tính toán để cập nhật kính thước các view thành phần ở `refresh` (Cập nhật cho `FragDrag` và `toolbar`), `refreshFrameFirst` (cập nhật cho `appbarLayout`)

### FrameFirst, FrameSecond

Sau khi xử lý xong `FrameDrag`, `ToolBar` và `AppbarLayout` giờ là lúc xử lý `FrameFist` và `FrameSecond`.
Ở đây chỉ cần tạo một `CoordinatorLayout.Behavior` và lắng nghe sự thay đổi của `AppbarLayout` từ đó cập nhật kích thước của `FrameFirst` là xong 
```java
        class DragBehavior(private val frameSecond: View) : CoordinatorLayout.Behavior<View>() {
        
            override fun layoutDependsOn(parent: CoordinatorLayout, fab: View, dependency: View): Boolean {
                return true
            }
            override fun onDependentViewChanged(parent: CoordinatorLayout, child: View, dependency: View): Boolean {
                child.reHeight(frameSecond.y.toInt())
                return true
            }
        }

        ...........................

        val params = frameFirst.layoutParams as CoordinatorLayout.LayoutParams
        params.behavior = DragBehavior(frameSecond)
        frameFirst.layoutParams = params
```

### ACTION_UP, ACTION_CANCEL

Sau khi đã hoàn thiện xử lý các thao tác khi `down` mà `move` thì khi `up` chúng ta sẽ làm gì. Tại đây mình thực hiện tính toán dựa vào *MarginTop* để đưa ra ra quyết định nên chuyển về `min` hay `max`. Mình xây dựng 3 hàm `maximize`, `minimize`, `close` và dùng `SpringAnimation` để chuyển về các trạng thái như  `MAX`, `MIN`, `CLOSE`

```java

        private fun handleUp() {
            val moveToMin = if (abs(velocityY) < 200) {
                mCurrentMarginTop > mMarginTopWhenMin - mCurrentMarginTop
            } else {
                velocityY >= 0
            }

            if (moveToMin) {
                maxToMinAnim { minimize() }
            } else {
                minToMaxAnim { maximize() }
            }
        }
        
        
        /**
         * mở rộng lâyout
         */
        open fun maximize() {
            mTempState = State.MAX
            if (!frameInitializing) {
                return
            }
            when (mCurrentState) {
                State.MAX -> {
                    appbarLayout.resizeAnimation(-1, mTempHeight, 300) {
                        mHeightWhenMax = mTempHeight
    
                        if (mCurrentPercent != 0f || (!needExpand && !showKeyboard)) {
                            updateState()
                            return@resizeAnimation
                        }
    
                        appbarLayout.addOnOffsetChangedListener(object : OnOffsetChangedListener {
                            override fun onOffsetChanged(appBarLayout: AppBarLayout?, verticalOffset: Int) {
                                if (mCurrentPercent != 0f || !needExpand) {
                                    appbarLayout.removeOnOffsetChangedListener(this)
                                    return
                                }
    
                                if (abs(verticalOffset) == 0) {
                                    updateState()
    
                                    needExpand = false
    
                                    mDraggableListener?.onExpanded()
    
                                    appbarLayout.removeOnOffsetChangedListener(this)
                                }
                            }
                        })
                        appbarLayout.setExpanded(true, true)
                    }
                }
                State.MIN -> {
                    minToMaxAnim { maximize() }
                }
                State.CLOSE -> {
                    visible()
                    closeToMinAnim { maximize() }
                }
                else -> {
                }
            }
        }
    
        /**
         * thu nhỏ layout
         */
        open fun minimize() {
            mTempState = State.MIN
            if (!frameInitializing) {
                return
            }
            when (mCurrentState) {
                State.MAX -> {
                    maxToMinAnim { minimize() }
                }
                State.MIN -> {
                    visible()
                    updateState()
                }
                State.CLOSE -> {
                    visible()
                    closeToMinAnim { minimize() }
                }
                else -> {
                }
            }
        }

        /**
         * đóng layout
         */
        open fun close() {
            mTempState = State.CLOSE
            if (!frameInitializing) {
                return
            }
            when (mCurrentState) {
                State.MAX -> {
                    maxToMinAnim { close() }
                }
                State.MIN -> {
                    minToCloseAnim { close() }
                }
                State.CLOSE -> {
                    gone()
                    updateState()
                }
                else -> {
    
                }
            }
        }
        
        fun Float.springAnimation(minValue: Float,
                                  maxValue: Float,
                                  startValue: Float,
                                  endValue: Float,
                                  onUpdate: (Float) -> Unit,
                                  onEnd: () -> Unit) {
            val springX = SpringForce(endValue)
            springX.dampingRatio = 0.7f
            springX.stiffness = 300f
            val springAnimation = SpringAnimation(FloatValueHolder())
            springAnimation.setStartVelocity(this)
                    .setMinValue(minValue)
                    .setMaxValue(maxValue)
                    .setStartValue(startValue)
                    .setSpring(springX)
                    .setMinimumVisibleChange(DynamicAnimation.MIN_VISIBLE_CHANGE_PIXELS)
                    .addUpdateListener { dynamicAnimation: DynamicAnimation<*>, value: Float, _: Float ->
                        onUpdate(value)
                        if (value == endValue) {
                            dynamicAnimation.cancel()
                        }
                    }
                    .addEndListener { _: DynamicAnimation<*>?, _: Boolean, _: Float, _: Float ->
                        onEnd()
                    }
                    .start()
        }
```

## Cách dùng [Link](https://github.com/hoanganhtuan95ptit/DraggablePanel/blob/master/example/src/main/java/com/hoanganhtuan95ptit/example/NormalActivity.kt)

Khi đã dựng xong giờ là lúc dùng chúng, 

```java

        <com.hoanganhtuan95ptit.draggable.DraggablePanel
                android:id="@+id/draggablePanel"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:height_when_max="300dp"
                app:height_when_min="80dp"
                app:margin_bottom_when_min="8dp"
                app:margin_edge_when_min="8dp"
                app:percent_when_middle="0.9"
                app:state="MIN" />
        
        ---------------------------
        
        draggablePanel.setDraggableListener(object : DraggablePanel.DraggableListener {
            override fun onExpanded() {
                super.onExpanded()
            }

            override fun onChangeState(state: DraggablePanel.State) {
            }

            override fun onChangePercent(percent: Float) {
                alpha.alpha = 1 - percent
            }

        })

        supportFragmentManager.beginTransaction().add(R.id.frameFirst, TopFragment()).commit()
        supportFragmentManager.beginTransaction().add(R.id.frameSecond, BottomFragment()).commit()

        btnMax.setOnClickListener { draggablePanel.maximize() }
        btnMin.setOnClickListener { draggablePanel.minimize() }
        btnClose.setOnClickListener { draggablePanel.close() }
```

## Kết luận
Cảm ơn anh em đã đọc đến đoạn này, Mình hi vọng thư viện sẽ giúp ích cho anh em trong quá trình phát triển các dự án của anh em. Dự án được xây dựng dựa trên những hiểu biết của mình nên sẽ không tránh khỏi những thiếu sót, rất mong được anh em góp ý =))). Anh Em vào đây [DraggablePanel](https://github.com/hoanganhtuan95ptit/DraggablePanel) để rate cho mình nhé =)) để mình có động lực làm những dự án open source tiếp theo. Cảm ơn anh em =)))