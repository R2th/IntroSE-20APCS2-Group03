AccordionView là một view bao gồm một danh sách các **titles**, và khi bạn click vào một tile cụ thể thì phần chi tiết description sẽ được hiển thị. Cái đặc biệt ở đây là description của chính nó sẽ bị đóng lại khi có bất kỳ một description khác nào đó được mở ra.

Điều này đảm bảo người dùng sẽ tập trung vào chỉ một item được mở ra ở một khoảng thời gian.

Tôi đã nhận được yêu cầu để thực thi việc này. và sau một vài nghiên cứu, tôi nhận thấy rằng nó hoàn toàn có thể thực hiện được bằng cách sử dụng `ConstraintLayout`

Điều này không quá khó khi sử dụng `ConstraintLayout` và `ConstraintSet`. Tôi muốn chia sẻ cách thức dễ dàng để làm được điều này. Tôi hi vọng bạn có thể thực hiện được một vài điều thú vị với `ConstraintLayout` và `ConstraintSet` sau khi đọc post này.

Đây là phần thực hiện mà tôi đã đưa lên github: [https://github.com/worker8/AccordionView](https://github.com/worker8/AccordionView)

Dưới đây là cách thức mà nó thực hiện

![AccordionView](https://cdn-images-1.medium.com/max/1600/0*FBrJrxomFA2wo8Ln.gif)

Bài post gốc được đăng tại [bloggie.io](https://bloggie.io/@_junrong/the-making-of-accordionview-using-constraintlayout)

### Yêu cầu cơ bản
- Bài này yêu cầu bạn phải có những hiểu biết cơ bản về `ConstraintLayout`
- Hiểu biết cơ bản về `ConstraintSet` (bạn có thể đọc [ở đây](https://bloggie.io/@_junrong/introduction-to-constraintset))

### Naming
Khi tôi sử dụng trong một case đơn giản, ví dụ, `constraintLayout` nó làm mới một `object` khi tôi sử dụng upper case, giống với `ConstraintLayout`, nó làm mới với một `class`

## The Basic Concept

Hãy bắt đầu với một vài thứ đơn giản trước khi chuyển qua cách thức để implement `AccordionView`

Từ lâu, người dùng đã có mong muốn làm thế nào để khi có nhiều items và họ muốn hiển thị nó bên trong một `AccordionView`. Chúng ta cần tạo ra tất các cả view một cách link động. Vì thế cho nên, để thay cho việc sử dụng `xml` để kết nối các view trong `ConstraintLayout`, chúng ta cần sử dụng đến `ConstraintSet` để kết nối linh động trong code lập trình.

Để giải quyết điều này, chúng ta có thể chia ra 3 bước:

1. `createView()`
2. `addView()`
3. `applyConstraints()`

### Step 1: createView()

Để bắt đầu, chúng ta sẽ tạo ra một `ConstraintLayout` trống và một `TitleView` trống.

![Empty_title_view](https://cdn-images-1.medium.com/max/1600/0*orhKay-bY_5ZYsmz.png)

Đoạn code để tạo ra tương tự như bên dưới:

```kotlin
fun onCreate() { 
    // step 1
    constraintLayout = LayoutInflater.from(this)
        .inflate(R.layout.empty_constraint_layout, constraintLayout, false) 
    titleView = LayoutInflater.from(this) 
        .inflate(R.layout.title_view, constraintLayout, false) setContentView(constraintLayout) 
}
```

Tại đây, `titleView` vẫn chưa được nhìn thấy bởi vì nó chưa được add vào bên trong của `constraintLayout`

### Step 2: addView

Tiếp theo, chúng ta cần add view tới `constraintlayout`, nhưng bạn vẫn chưa thấy gì xuất hiện trên màn hình

![addView](https://cdn-images-1.medium.com/max/1600/0*T_AJtK3nwb1dGbSM.png)

Đoạn code đó ở đây

```kotlin
fun onCreate() {
    // Step 1
    constraintLayout = LayoutInflater.from(this)
        .inflate(R.layout.empty_constraint_layout, constraintLayout, false)
    titleView = LayoutInflater.from(this)
        .inflate(R.layout.title_view, constraintLayout, false)

    // Step 2
    constraintLayout.addView(titleView)
    setContentView(constraintLayout)
}
```

Ở đây thì `titleView` vẫn đang đang chưa được cố định vì chúng ta vẫn chưa đưa các thuộc tính cho để đưa vào `constraintlayout`

### Step 3: applyConstraints

Bây giờ, chúng ta cần add view vào constraintLayout bằng cách sử dụng `ConstraintSet`

Sau khi thực hiện xong thì view sẽ tương tự như hình mô tả dưới đây

![applyConstraints](https://cdn-images-1.medium.com/max/1600/0*e7S6DmNGDPwD-iyU.png)

chúng ta sẽ cài đặt cho ConstraintSet như dưới đây

```kotlin
fun onCreate() {
    // Step 1
    constraintLayout = LayoutInflater.from(this)
        .inflate(R.layout.empty_constraint_layout, constraintLayout, false)
    titleView = LayoutInflater.from(this)
        .inflate(R.layout.title_view, constraintLayout, false)

    // Step 2
    constraintLayout.addView(titleView)

   // Step 3
    val set = ConstraintSet()
    set.clone(constraintLayout)
    set.connect(titleView.id, ConstraintSet.TOP, ConstraintSet.PARENT_ID, ConstraintSet.TOP)
    set.connect(titleView.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
    set.connect(titleView.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)
    set.applyTo(constraintLayout)

    setContentView(constraintLayout)
}
```
Bằng cách kết nối

- titleView `TOP` to parent `TOP`
- titleView `START` to parent `START`
- titleView `END` to parent `END`

`titleView` sẽ được cài đặt thuộc tính và ở top của `constraintLayout`

## Implementing AccordionView

Như vậy, chúng ta đã nắm rõ về basic concept, chúng ta có thể sử dụng tiếp 3 steps đó để tạo `AccordionView`.

![AccordionView](https://cdn-images-1.medium.com/max/1600/0*FGOAQ-g_0vP7OUCk.png)

### Step 1: createViews

Trong trường hợp thực tế, số lượng `TitleView` có thể là bất kỳ, và trong hướng dẫn này, chúng ta sẽ cố định số lượng `TitleView` là 4.

Một cách tương tự, chúng ta tạo views, nhưng thời gian này chúng ta cần tạo `Views` thay thế cho `view`

![Views](https://cdn-images-1.medium.com/max/1600/0*dbH5kv9gwbjatEj-.png)

```kotlin
// ... onCreate()
    // Step 1
    val numberOfTitles = 4
    val titleViewList = mutableListOf()

    for (index in 0 until numberOfTitles) {
        val titleView = LayoutInflater.from(this)
            .inflate(R.layout.title_view, constraintLayout, false)
        titleView.id = View.generateViewId()
        titleViewList.add(titleView)
    }
```

Số lượng title có thể thay đổi, chúng ta thực hiện lặp lại các bước trên. Tôi đang tạo `TitleView` từng view một rồi thêm chúng vào trong list `titleViewList`.

Chú ý, chúng ta cần sử dụng `View.generateViewId()` để tạo ra một id duy nhất cho mỗi một `TitleView`. Thêm nữa, chúng ta không thể áp dụng constraint đúng nếu như không dùng id để tham chiếu đến các view.

### Create View for Content

Tôi đã nói về Title View, nhưng đừng quên, chúng ta còn có content view nữa.

![Contentview](https://cdn-images-1.medium.com/max/1600/0*Iid5jJRwGVdpu-Ua.png)

```kotlin
// ... onCreate()
    // Step 1
    val contentView = LayoutInflater.from(this)
        .inflate(R.layout.content_view, constraintLayout, false)
```

Ở điểm này, chúng ta có `titleView` trong danh sách và `contentView` nhưng chúng vẫn chưa được add vào `constraintLayout`.

### Step 2: addViews

Bước tiếp theo chúng ta cần thêm tất cả view tới `constraintLayout`. nó nên trông giống như bên dưới

![addView](https://cdn-images-1.medium.com/max/1600/0*baHLe4_LsSMYBeqM.png)

Chú ý là không có constraints được thêm vào ở đây, vì thế cho nên các view trong hình bên trên sẽ được mở ra cùng với nhau

```kotlin
// ... onCreate()
    // Step 2
    titleViewList.forEach { titleView ->
        constraintLayout.addView(titleView)
    }
    constraintLayout.addView(contentView)
```

### Step 3 apply constraints

Đầu tiên, chúng ta sử dụng cùng một kỹ thuật để đặt `TitleView` lên đầu tiên.

![constrain](https://cdn-images-1.medium.com/max/1600/0*WaGDnVnxkj3TM-fU.png)

```kotlin
// ... onCreate()
   // Step 3
   val set = ConstraintSet()
   set.clone(constraintLayout)

   val tempTitleView1 = titleViewList[0] // obtain from the list

   set.connect(tempTitleView1.id, ConstraintSet.TOP, ConstraintSet.PARENT_ID, ConstraintSet.TOP)
   set.connect(tempTitleView1.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
   set.connect(tempTitleView1.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)

   set.applyTo(constraintLayout)
```
Lưu ý rằng phần lớn là giống trong phần “Basic Concept” ở trên. Vì vậy, không cần giải thích.

Tiếp theo, chúng ta nên kết nối với `TitleView` tiếp theo.

```kotlin
// ... onCreate()
   // Step 3
   val set = ConstraintSet()
   set.clone(constraintLayout)

   val tempTitleView1 = titleViewList[0] // obtain from the list

   set.connect(tempTitleView1.id, ConstraintSet.TOP, ConstraintSet.PARENT_ID, ConstraintSet.TOP)
   set.connect(tempTitleView1.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
   set.connect(tempTitleView1.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)

   val tempTitleView2 = titleViewList[1] // obtain from the list
   // Important Line:
   set.connect(tempTitleView2.id, ConstraintSet.TOP, tempTitleView1.id, ConstraintSet.BOTTOM)
   set.connect(tempTitleView2.id, ConstraintSet.START, ConstraintSet.PARENT_ID, ConstraintSet.START)
   set.connect(tempTitleView2.id, ConstraintSet.END, ConstraintSet.PARENT_ID, ConstraintSet.END)

   set.applyTo(constraintLayout)
```

Dòng quan trọng cần chú ý là 

```kotlin
set.connect(tempTitleView2.id, ConstraintSet.TOP, tempTitleView1.id, ConstraintSet.BOTTOM)
```

Thay vì việc kết nối tới TOP của parent, chúng ta kết nối nó tới BOTTOM quả `TitleView` trước đó.

Bằng cách sử dụng cùng một method, chúng ta có thể kết nối mọi thứ bao gồm cả `contentView`.

Và cuối cùng, kết quả thu được sẽ trông giống như thế này

![content](https://cdn-images-1.medium.com/max/1600/0*7Ybm373_QRRs9G5b.png)

### Changing Constraints

Như ở đây chúng ta có thể thấy phần nội dụng được mở ra sẽ là item ở dưới cùng. hãy tưởng tượng nếu như người dùng muốn mở item ở giữa thì sao.

Trong trường hợp này chúng ta sẽ cần phải thay đổi constraint.

![constraint](https://cdn-images-1.medium.com/max/1600/0*9eEFeK-GhLHdoTlZ.png)

chúng ta có thể xem mã giả ở dưới đây

```
// Top down
1. connect TitleView1 to the TOP of parent
2. connect TitleView2 to the BOTTOM of TitleView1

// Bottom up
3. connect TitleView4 to the BOTTOM of parent
4. connect TitleView3 to the TOP of TitleView4

// Middle
5. connect ContentView to BOTTOM of TitleView2
6. connect ContentView to TOP of TItleView3
```

Số lương item có thể bị thay đổi, chúng ta cần phải tạo cho code linh động hơn

```
// Top down
1. connect first `TitleViews` until the selected item (e.g. TitleView2) in a loop

// Bottom up
2. connect the last `TitleViews` upwards until selected item + 1 (e.g. TitleView3) in a loop

// Middle
3. connect ContentView to the row above
4. connect ContentView to the row underneath
```

Sau khi kết nôi xong, bạn cần phải `applyTo()` để làm cho View vẽ lại chính nó, để enable hiệu ứng moving. đây là phương thức được sử dụng
`TransitionManager.beginDelayedTransition(constraintLayout)`.

Thêm nữa, chúng ta nên cẩn thận hơn để chỉnh sửa các constraint.

![constrain](https://cdn-images-1.medium.com/max/1600/0*bVNICOBBb_DCt9z7.png)

Xem ảnh trên, chúng ta có thể thấy `titleView4` đã được di chuyển xuống vị trí dưới cùng, chúng ca cần clear constraint `TOP` mà đã được sử dụng để kết nối với `titleView3`.

```kotlin
   val set = ConstraintSet()
   set.clone(constraintLayout)
   set.clear(titleView4.id, ConstraintSet.TOP)
   set.applyTo(constraintLayout)
```

Kết Thúc Phần 1

Nguồn tham khảo: [The making of AccordionView using ConstraintLayout](https://proandroiddev.com/the-making-of-accordionview-using-constraintlayout-c86992ffbb7b)