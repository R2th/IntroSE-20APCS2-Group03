## I. Introduction
Việc quản lý Android Touch flow control có không không được quan tâm trừ khi bạn cần đến nó, rồi nhận ra rằng nó không chỉ đơn giản như là việc tham chiếu tới mã nguồn. Do đó việc so một chút gì đó trong đầu về luồng xử lý touch events sẽ là có ích trong thời gian cần thiết.
Dưới đây là một vài ví dụ nơi chúng ta cần quản lý touch flow...
Hình dung bạn có ScrollView cùng với một ScrollView(Và với một ScrollView khác) được trông giống như GIF bên dưới. Bạn nghĩ bạn có thể quản lý touch control như thế nào?

<div align="center"><img src="https://images.viblo.asia/6108b3ef-364d-4747-88d5-23e9346c5a1f.gif" /></div><br />
                                                                                                
 Trong trường hợp bạn muốn lấy mã nguồn của nó, hãy tải về [ở đây](https://github.com/elye/demo_android_scrollview_in_scrollview).
 
 Điều tương tự được áp dụng cho RecyclerView trong một RecyclerView hoặc ViewPager trong ViewPager hoặc một sự pha trộn giữa chúng. Làm thế nào người ta có thể quản lý được flows nếu cần?
 
 Well, để thực hiện điều đó, thay vì tìm kiếm mã người rồi copy & paste, hãy tìm hiểu về touch flow control.
 
## II. The Touch Control Flow
### The Basic Flow
Hãy bắt đầu với flow cơ bản khi một sự kiện touch xảy ra. Nó bắt đầu từ Activity, flow đổ xuống layout(Từ parent tới các layout con), và rồi mỗi views chứa trong layouts.

<div align="center"><img src="https://images.viblo.asia/538b2a54-9a34-49fe-9111-811e08fd024c.png" /></div><br />

Mục tiêu của flow là tìm kiếm đối tượng đầu tiên cái quan tâm tới sự kiện touch được gửi đi. Một khi điều đó được tìm thấy, nhiệm vụ được hoàn thành. Nhưng nếu không đối tượng nào quan tâm tới sự kiện touch, thì nó sẽ được cho đi.

Toàn bộ câu truyện là tương tự một người cha láy một quả táo, và truyền tới cho người con trai lớn, rồi truyền cho người con trai nhỏ(giống như trình bày ở ảnh bên dưới).

<div align="center"><img src="https://images.viblo.asia/3f899b0c-8f78-4415-a33e-667f79827e6b.png" /></div><br />

Nếu đứa con trai nhỏ không quan tâm tới, anh ta sẽ truyền nó cho người con lớn. Nếu người con lớn không quan tâm, anh ta truyền nó lại cho người cha. Rồi người tra xác định xem có muốn lấy quả táo hay không? Nếu có, anh ta ăn nó, nếu không thì anh ta ném nó đi.

Tuy nhiên, nếu bất cứ đứa trẻ nào muốn quả táo, chúng sẽ lấy và ăn nó, và chỉ có thể thôi, người cha sẽ không nhận lại quả táo. Trong luồng này, người con thứ có quyển cao hơn trong việc nhận quả táo so với người con lớn.

Toàn bộ luồng được điểu kiển bởi hai phương thức này cái tồn tại trong mọi Activity ViewGroup(hoặc Layout), và View.

**Chú ý**: Điều này là không có trong Fragment.

```
override fun dispatchTouchEvent(event: MotionEvent): Boolean {
    // perform whatever needed to check if one should dispatch 
    // the touch further 
    return super.dispatchTouchEvent(event)
}

override fun onTouchEvent(event: MotionEvent): Boolean {
    // Decide what to do with the touch.
    // Return true if it did something, and false if it did nothing
    return super.onTouchEvent(event)
}
```

Để dẫn chứng về flow, có một simple app cái log ra flow giống như bên dưới, nơi vùng màu blue là một **View**, vùng màu red là một **ViewGroup**, và vùng màu trắng là **Activity**.

<div align="center"><img src="https://images.viblo.asia/bd4e24de-ae55-477e-b2df-daea690a118f.png" /></div><br />

Khi click vào vùng màu xanh(View), logs sẽ được ghi ra như bên dưới:

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN End with false
    MyLayout: onTouchEvent ACTION_DOWN Start
    MyLayout: onTouchEvent ACTION_DOWN End with false
   MyLayout: dispatchTouchEvent ACTION_DOWN End with false
  MyActivity: onTouchEvent ACTION_DOWN Start
  MyActivity: onTouchEvent ACTION_DOWN End with false
 MyActivity: dispatchTouchEvent ACTION_DOWN End with false
```

### The Intercept Flow
Thỉnh thoảng, tất nhiên **ViewGroup** muốn chặn lại sự kiện touch, và không gửi nó tới các đối tượng con(Có thể là **View** hoặc một **ViewGroup** con). Điều đó có thể được thực hiện với **onInterceptTouchEvent** function.

```
override fun onInterceptTouchEvent(event: MotionEvent): Boolean {
    // Decide if to intercept or not
    return super.onInterceptTouchEvent(event)
}
```

**Chú ý**: **onInterceptTouchEvent** chỉ sẵn có trong lớp **ViewGroup**, không có trong **Activity** và **View**.

<div align="center"><img src="https://images.viblo.asia/9349b870-b1bd-4135-961e-3b0ac2df6a1e.png" /></div><br />

Với điều này, sự kiện touch sẽ ngoài tầm với đối với **View**, trong khi **ViewGroup** có thể chịu trách nhiệm về sự kiện touch sơm hơn mà không cần lo lắng về việc con của nó tóm lấy được sự kiện touch đó.

Để dẫn chứng về flow, một simple app được sử dụng và được bật **onInterceptTouchEvent** của **Layout**, và khi touch vào blue **View**, bạn sẽ thay được rằng log sẽ ngừng lại tại **Layout** thay vì **View**.

<div align="center"><img src="https://images.viblo.asia/14bbd265-0bf6-4d8f-91a5-aa13bd0a6def.png" /></div><br />

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with true
    MyLayout: onTouchEvent ACTION_DOWN Start
    MyLayout: onTouchEvent ACTION_DOWN End with false
   MyLayout: dispatchTouchEvent ACTION_DOWN End with false
  MyActivity: onTouchEvent ACTION_DOWN Start
  MyActivity: onTouchEvent ACTION_DOWN End with false
 MyActivity: dispatchTouchEvent ACTION_DOWN End with false
```

## III. The Touch Comes in Batch

Khi chúng ta touch, một **MotionEvent.ACTION_DOWN** flag được gây ra. Tuy nhiên nó không kết thúc ở đó. Nó thường đi kèm với ít nhất một cái khác nếu không hơn. VD: **MotionEvent.ACTION_UP**. Một cái thông thường khác là **MotionEvent.ACTION_MOVE**. Nói một cách ngắn gọn chúng đến theo từng nhóm.

### 2 Pass Flow Optimization
Như vậy để tối ưu hóa control flow, thay vì gửi tất cả các sự kiện touch events thông qua flow, nó thực hiện một "***2 pass flow***".
Lần truyền đầu tiên(first pass) là để quét xem ai quan tâm tới flow, chỉ ra đối tượng **onTouch** đã bắt lấy hành vi. Điều này được thực hiện bằng cách gửi đi first **MotionEvent** cùng với nó.

Một khi nó đã xác định được rằng đối tượng **onTouch**, việc gửi đi nhằm duy trì **MotionEvent** bằng cách đó.

Để minh họa cho điều này, hãy giả sử first pass một **MotionEvent.ACTION_DOWN** được gửi đi trong flow nhưng không ai quan tâm tới nó ngoại trừ **Activity**.

<div align="center"><img src="https://images.viblo.asia/516ad463-9237-4094-9427-54f330fd124a.png" /></div><br />

Cùng với điều đó, **MotionEvent** đến sau(Ví dụ **MotionEvent.ACTION_MOVE** và **MotionEvent.ACTION_UP** được gửi theo một đường tắt, và bỏ qua **Layout** và **View** giống như bên dưới.

<div align="center"><img src="https://images.viblo.asia/37a74527-f899-4b11-9a24-c4ec2196e63b.png" /></div><br />

Để minh họa cho nó với sample App, giả sử Activity đang trả về **true** trong **onTouchEvent** của nó nhưng không trong **Layout** và **View**.

<div align="center"><img src="https://images.viblo.asia/c834d9e5-7dca-4e63-a209-c179ea31284c.png" /></div><br />

Với điều này, logs được ghi ra như bên dưới, nơi first pass đi trên con đường tới **View** và được duy trì chỉ ở phía **Activity**.

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN End with false
    MyLayout: onTouchEvent ACTION_DOWN Start
    MyLayout: onTouchEvent ACTION_DOWN End with false
   MyLayout: dispatchTouchEvent ACTION_DOWN End with false
  MyActivity: onTouchEvent ACTION_DOWN Start
  MyActivity: onTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE Start
  MyActivity: onTouchEvent ACTION_MOVE Start
  MyActivity: onTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_UP Start
  MyActivity: onTouchEvent ACTION_UP Start
  MyActivity: onTouchEvent ACTION_UP End with true
 MyActivity: dispatchTouchEvent ACTION_UP End with true
```

### Touches end at Layout
Tương tự, nếu touch event được sử dụng bởi Layout.

<div align="center"><img src="https://images.viblo.asia/78905852-84ad-41f7-8073-8e017a9fbb46.png" /></div><br />

first pass sẽ đến được **View**, nhưng không có cái nào theo sau sẽ kết thúc với **onTouchEvent** của **Layout**. Nó sẽ không thể đi tới **onTouchEvent** của **Activity**, bởi vì **Layout** đã tiêu thụ **MotionEvent**.

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN End with false
    MyLayout: onTouchEvent ACTION_DOWN Start
    MyLayout: onTouchEvent ACTION_DOWN End with true
   MyLayout: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE Start
   MyLayout: dispatchTouchEvent ACTION_MOVE Start
    MyLayout: onTouchEvent ACTION_MOVE Start
    MyLayout: onTouchEvent ACTION_MOVE End with true
   MyLayout: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_UP Start
   MyLayout: dispatchTouchEvent ACTION_UP Start
    MyLayout: onTouchEvent ACTION_UP Start
    MyLayout: onTouchEvent ACTION_UP End with true
   MyLayout: dispatchTouchEvent ACTION_UP End with true
 MyActivity: dispatchTouchEvent ACTION_UP End with true
```

### Touches end at View
Tương tự, nếu các sự kiện touches được sử dụng bởi **View**.

<div align="center"><img src="https://images.viblo.asia/486c77de-09aa-4440-b084-6f18dffffb34.png" /></div><br />

Logs sẽ được in ra như bên dưới.

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with true
     MyView: dispatchTouchEvent ACTION_DOWN End with true
   MyLayout: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE Start
   MyLayout: dispatchTouchEvent ACTION_MOVE Start
    MyLayout: onInterceptTouchEvent ACTION_MOVE Start
    MyLayout: onInterceptTouchEvent ACTION_MOVE End with false
     MyView: dispatchTouchEvent ACTION_MOVE Start
      MyView: onTouchEvent ACTION_MOVE Start
      MyView: onTouchEvent ACTION_MOVE End with true
     MyView: dispatchTouchEvent ACTION_MOVE End with true
   MyLayout: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_UP Start
   MyLayout: dispatchTouchEvent ACTION_UP Start
    MyLayout: onInterceptTouchEvent ACTION_UP Start
    MyLayout: onInterceptTouchEvent ACTION_UP End with false
     MyView: dispatchTouchEvent ACTION_UP Start
      MyView: onTouchEvent ACTION_UP Start
      MyView: onTouchEvent ACTION_UP End with true
     MyView: dispatchTouchEvent ACTION_UP End with true
   MyLayout: dispatchTouchEvent ACTION_UP End with true
 MyActivity: dispatchTouchEvent ACTION_UP End with true
```

Như vậy nó sẽ chỉ kết thúc với **onTouchEvent** của **View**, và không xảy ra tại **Layout** cũng như **Activity**. Có hai chú ý ở bên dưới.

**Chú ý thứ nhất**: Dường như không có sự tối ưu của flow, nhưng trong thực tế thì có, bởi vì nếu có nhiều **Views** trong Layout, chỉ **View** này sẽ nhận được và các **Views** khác sẽ bị bỏ qua. Tương tự chỉ các **Layout** cha của **View** này sẽ nhận được và không có bất cứ **Layouts** nào khác cũng như **Activity**.

**Chú ý thứ hai**: Nhằm thông báo, ngay cả khi **View** được gọi, nhưng đối với mỗi **MotionEvent** được truyền đi thông qua **Layout** nó sẽ vẫn kiểm tra xem nếu **onInterceptTouchEvent** được gây ra là **true**. Điều này có nghĩa là tại bất cứ lần nào, **Layout** vẫn có thể chặn lại **MotionEvent** đi theo sau đó cái được gửi tới **View**. Điều này sẽ được minh họa thêm ở bên dưới.

## IV. Special Flow Change Control

### Half way Interception

Như đã đề cập ở trên, **onInterceptTouchEvent** là luôn được kiểm tra cùng với **View** đang tiêu thu **Touch**. Điều này cho phép **Layout** vẫn chặn được các **MotionEvent** đi theo sau đó.

Tôi có thể thực hiện hành vi này với một cái vặn nhỏ bên dưới nhằm chặn lại khi nó không phải là **MotionEvent.ACTION_DOWN**.

```
override fun onInterceptTouchEvent(event: MotionEvent): Boolean {
    if (event.action != MotionEvent.ACTION_DOWN) {
        traceTouchEnd(4, TAG, "onInterceptTouchEvent", event, true)
        return true
    }
    return super.onInterceptTouchEvent(event)
}
```

Với điều đó, chúng ta sẽ lấy được đoạn logs như bên dưới.

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with true
     MyView: dispatchTouchEvent ACTION_DOWN End with true
   MyLayout: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE Start
   MyLayout: dispatchTouchEvent ACTION_MOVE Start
    MyLayout: onInterceptTouchEvent ACTION_MOVE Start
    MyLayout: onInterceptTouchEvent ACTION_MOVE End with true
     MyView: dispatchTouchEvent ACTION_CANCEL Start
      MyView: onTouchEvent ACTION_CANCEL Start
      MyView: onTouchEvent ACTION_CANCEL End with true
     MyView: dispatchTouchEvent ACTION_CANCEL End with true
   MyLayout: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_UP Start
   MyLayout: dispatchTouchEvent ACTION_UP Start
    MyLayout: onTouchEvent ACTION_UP Start
    MyLayout: onTouchEvent ACTION_UP End with true
   MyLayout: dispatchTouchEvent ACTION_UP End with true
 MyActivity: dispatchTouchEvent ACTION_UP End with true
```

Hai quá trình quan sát:
1. Bạn có thể quan sát thấy rằng **ACTION_CANCEL** được gửi tới **View** lần đầu tiên sau khi nó đã bị gián đoạn bởi **Layout**.
2. Các **MotionEvent** theo sau không đến được tới **View**. Do lời gọi **onInterruptTouchEvent** của **Layout** cũng là không cần thiết, và **Layout** đã nhận được dựa trên **onTouchEvent**.

**Note**: Hành vi này được sử dụng bởi RecyclerView, nơi nó cho phép các view của nó có một vài touch cục bộ, nhưng nếu nó sẽ làm gián đoạn các hành vi của người dùng move và scroll đối với điều hướng của nó và thu hồi lại chúng.

### Disallow Interception
Nhận ra rằng **Layout** vẫn có thể làm gián đoạn tất cứ **MotionEvent** đi theo sau nào đó, Android cũng cung cấp cho các đối tượng con một cách thức nhằm không cho phép quá trình đánh chặn các sự kiện touch. Điều này có thể được thực hiện bằng cách gọi **paren.requestDisallowInterceptTouchEvent(true)** trong phương thức của **View** giống như bên dưới.

```
override fun onTouchEvent(event: MotionEvent): Boolean {
    if (Control.viewDisallowParentIntercept) {
        parent.requestDisallowInterceptTouchEvent(true)
    }
    return super.onTouchEvent(event)
}
```

Hoặc bạn có thể kích hoạt code này trong ứng dụng ví dụ.

<div align="center"><img src="https://images.viblo.asia/a4479d01-d77a-4c42-b610-ce6c5592afab.png" /></div><br />

Logs sẽ được in ra như bên dưới, nơi **MotionEvent** luôn luôn đến được tới **View**. Chú ý rằng ở đây, bạn không chỉ thấy **onInterceptTouchEvent** trong fist pass, và các lần truyền event sau đó, chúng không còn ở đó nữa. Như vậy **Layout** không thể chặn lại bất cứ sự kiện touch nào khỏi **View**.

```
MyActivity: dispatchTouchEvent ACTION_DOWN Start
   MyLayout: dispatchTouchEvent ACTION_DOWN Start
    MyLayout: onInterceptTouchEvent ACTION_DOWN Start            /* Layout intercept touch events */
    MyLayout: onInterceptTouchEvent ACTION_DOWN End with false   /* Layout intercept touch events */
     MyView: dispatchTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN Start
      MyView: onTouchEvent ACTION_DOWN End with true
     MyView: dispatchTouchEvent ACTION_DOWN End with true
   MyLayout: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_DOWN End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE Start
   MyLayout: dispatchTouchEvent ACTION_MOVE Start
     MyView: dispatchTouchEvent ACTION_MOVE Start
      MyView: onTouchEvent ACTION_MOVE Start
      MyView: onTouchEvent ACTION_MOVE End with true
     MyView: dispatchTouchEvent ACTION_MOVE End with true
   MyLayout: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_MOVE End with true
 MyActivity: dispatchTouchEvent ACTION_UP Start
   MyLayout: dispatchTouchEvent ACTION_UP Start
     MyView: dispatchTouchEvent ACTION_UP Start
      MyView: onTouchEvent ACTION_UP Start
      MyView: onTouchEvent ACTION_UP End with true
     MyView: dispatchTouchEvent ACTION_UP End with true
   MyLayout: dispatchTouchEvent ACTION_UP End with true
 MyActivity: dispatchTouchEvent ACTION_UP End with true
```

Bằng cách hiểu rõ 4 functions ở đây(**dispatchTouchEvent**, **onTouchEvent**, **onInterceptTouchEvent**, và **requestDisallowInterceptTouchEvent**, bạn sẽ có một sự thấu hiểu tốt về làm thế nào điểu kiếm soát được touch flow.

Giống như ví dụ đơn giản ScrollView lồng trong ScrollView, nó là đơn giản nếu ghi đè lại phương thức trong **Layout** bao bọc ScrollView giống như code bên dưới.

```
override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
    parent.requestDisallowInterceptTouchEvent(true)
    return super.onInterceptTouchEvent(ev)
}
```

Ứng dụng ví dụ cái log ra touch flow đã trình bày ở bên trên: [elye/demo_android_touch_flow](https://github.com/elye/demo_android_touch_flow)

## V. Source
https://medium.com/@elye.project/understanding-android-touch-flow-control-bcc413e6a57e

## VI. Reference
https://medium.com/@suragch/how-touch-events-are-delivered-in-android-eee3b607b038
https://github.com/elye/demo_android_scrollview_in_scrollview
https://github.com/elye/demo_android_touch_flow
https://medium.com/@elye.project

## VII. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))