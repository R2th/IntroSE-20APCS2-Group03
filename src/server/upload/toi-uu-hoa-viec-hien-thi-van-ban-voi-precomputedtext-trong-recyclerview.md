![](https://images.viblo.asia/d67efe5a-7868-4d2a-addf-4e8148a9c46f.png)
## I. Context
Việc hiển thị văn bản trên Android khá  phức tạp, bao gồm các tính năng như nhiều phông chữ, khoảng cách dòng, khoảng cách chữ cái, hướng văn bản, ngắt dòng, gạch nối và hơn thế nữa. TextView phải làm rất nhiều công việc để đo lường và bố trí văn bản: đọc phông chữ, tìm kiếm hình tượng, quyết định hình dạng, đo độ bounding ... Sau đó mới được đưa vào layout để hiển thị

Vì những lý do này, việc hiển thị văn bản có thể tốn kém tài nguyên. Android sử dụng bộ nhớ cache cho mỗi từ để tránh tính toán lại dữ liệu nhiều lần.

Với RecyclerView đặc biệt nhạy cảm với hiệu suất hiển thị các đoạn văn bản. Khi mà các view mới xuất hiện trên màn hình, chúng phải được bố trí như một phần của khung đầu tiên hiển thị chúng. Vì vậy, nếu một đoạn văn bản phức tạp trong một item RecyclerView mất 12ms để đo lường, tính toán, nó có thể dẫn đến [drop frames](https://developer.android.com/training/testing/performance)

Trong bài viết này, mình sẽ giới thiệu về cách sử dụng PrecomputedText để tính toán bố cục văn bản trên background , trước khi UI Thread cần đến nó để hiển thị.
Dưới đây mình sử dụng PrecomputedText để hiển thị số lượng lớn văn bản trong RecyclerView và cách chúng có thể giảm việc tính toán văn bản xuống 95%!
## II. Example
 Hình dưới đây cho thấy một recyclerview với các item hiển thị khối lượng text lớn.Đây là ví dụ được demo trên Pixel2 (Chạy Android P, CPU ở tốc độ 1GHz), với 80 từ (~ 520 ký tự) lấy TextView 15.6ms. Đó là một khoảng thời gian rất lớn!
 Như các bạn đã biết thì để cho người dùng có trải nghiệm mượt mà, thì Android sẽ chạy ở mức 60 khung hình/ giây (60fps) nghĩa là nó sẽ vẽ lại UI 16,67 một 1 lần, khi mà khung hình đó bị bỏ qua hay trì hoãn thì được gọi là jank. Thời hạn của mỗi khung hình được vẽ lại là 16,67 m, do đó, nếu UI thread dùng phải đo ngay cả một TextView phức tạp đó, nó sẽ vượt qua thời gian đó

Click vào Developer Options > Monitoring > Profile GPU rendering , ta có thể thấy vấn đề này một cách trực quan. Thanh ngang màu xanh lá cây cho thấy 16,67ms lý tưởng, và khung stack lên theo chiều dọc tùy thuộc vào bao nhiêu thời gian họ đi. Sử dụng TextView ở bên trái, ta thấy có rất nhiều khung hình bị bỏ qua - các mức tăng đột biến lớn trong biểu đồ khi các mục mới xuất hiện trên màn hình.
![](https://images.viblo.asia/ac7094b1-679e-4e32-a8e7-ccd3139d5c0d.png)

Hình bên phải vẫn là recyclerview đó, nhưng sử dụng PrecomputedText để tránh việc đo lường mất nhiều thời gian trên UI Thread. Các công việc đo đạc còn lại vẫn còn đó, gây ra lỗi nhỏ, nhưng không còn gây ra hiện tượng jank. TextView.onMeasuređược giảm xuống 0,9ms - nhanh hơn 16 lần.

## III. PrecomputedText
PrecomputedText được giới thiệu ở Google I/O năm nay, nó là một api mới trong Android P, với một phiên bản tương thích trong Jetpack làm giảm công việc trên thread UI của tính toán bố cục việc hiển thị đoạn văn bản. Nó cho phép bạn tính toán phần lớn công việc hiển thị trên background thread

Từ UI thread, xác định layout parameters từ một TextView:
``` kotlin
val params: PrecomputedTextCompat.Params = 
        TextViewCompat.getTextMetricsParams (myTextView)
```
Thực hiện tính toán hiển thị một đoạn văn bản dài trên background thread
``` kotlin
val precomputedText: Spannable = 
        PrecomputedTextCompat.create ( costText , params)
```
Sử dụng PrecomputedText được tạo ra trong một TextView:
``` kotlin
TextViewCompat.setPrecomputedText (myTextView, precomputedText)
```
Điều này di chuyển hơn 90% công việc ra khỏi UI Thread - một bước đột phá về mặt hiệu năng! PrecomputedTextCompat, việc triển khai AndroidX, hoạt động trên L (API 21) trở lên, do đó, hiệu suất đạt được áp dụng cho khoảng 85% thiết bị hoạt động (tính đến tháng 5 năm nay).

Một bước cải tiến rất tuyệt, nhưng việc thực hiện không đồng bộ ở trên không phải là tốt nhất để hiển thị văn bản . Ví dụ trong RecyclerView, văn bản trong một mục sẽ hiển thị ngay lập tức, không phải khi nó đã cuộn nửa chừng lên màn hình. Để thực hiện điều này, chúng ta cần phải biết các tham số văn bản sớm, và thực hiện nó trên background thread trước khi TextView được hiển thị.

Làm thế nào chúng ta có thể bắt đầu công việc PrecomputedText này sớm hơn để ta không cần trì hoãn việc hiển thị văn bản?
## IV. Pre-compute layout
Chạy background thread để xử lý trước văn bản khi bạn đang tải dữ liệu văn bản một cách không đồng bộ. Một ví dụ, phổ biến là lấy dữ liệu từ network, sau đó deserialize nó, có thể tạo style cho nó với Span trước khi đưa đến thread UI để hiển thị.

Rất tốt để sử dụng PrecomputedText ở đây, ngay sau khi deserialization. Ta muốn xử lý trước toàn bộ văn bản trước khi gửi đến giao diện người dùng để giảm thiểu công việc tính toán trên UI Thread

``` kotlin
/* Worker Thread */
// resolve spans on worker thread to reduce load on UI thread
val expensiveSpanned = resolveIntoSpans(networkData.item.textData)
    
// pre-compute measurement work to reduce load on UI thread
val textParams: PrecomputedTextCompat.Params = // we’ll get to this
val precomputedText: PrecomputedTextCompat = 
    PrecomputedTextCompat.create(expensiveSpanned, params)
```
Sau đó,hiển thị PrecomputedText đoạn văn bản trên UI Thread
``` kotlin
* UI Thread */
myTextView.setTextMetricParams(precomputedText.getParams())
myTextView.setPrecomputedText(precomputedText)
```

## V. The sizing problem
PrecomputedText cần phải biết kích thước glyph (hình tượng chữ) để đo lường, tính toán. Điều này có nghĩa rằng, nó cần phải biết kích thước, không phải trong sp (như thường được chỉ định trong XML), nhưng theo pixel , được điều chỉnh cho mật độ văn bản. Việc chuyển đổi sp thành pixel sử dụng **DisplayMetrics.scaledDensity**, điều này không đơn giản để chuyển đến background thread

Nền tảng thay đổi **scaledDensead** tại runtime để hỗ trợ mở rộng văn bản do người dùng xác định. Nếu bạn chỉ truy vấn DisplayMetrics một lần và chuyển chúng vào background thread, người dùng có thể quay lại từ việc thay đổi kích thước phông chữ trên toàn hệ thống thành ứng dụng chỉ có một nửa TextView có kích thước chính xác - không phải là trải nghiệm tuyệt vời.

Có thể xử lý chính xác, nhưng bạn cần phải rất cẩn thận - bất cứ khi nào activity được tạo lại, hãy chắc chắn truy vấn scaledDensity và nếu nó thay đổi, hãy drop và xây dựng lại bất kỳ PrecomputedText đã lưu trong bộ nhớ cache.

## VI. Prefetching with Future<>
Sẽ rất tốt để có được những lợi ích của PrecomputedText mà không thay đổi nhiều code, hoặc phải lo lắng về việc nảy thông tin kích thước văn bản trên các thread. 
``` kotlin
override fun onBindViewHolder(vh: ViewHolder, position: Int) {
    val itemData = getData(position)
    vh.textView.textSize = if (item.isImportant) 14 else 10
    vh.textView.text = itemData.text
}
```
Lý tưởng nhất, đoạn code này sẽ dễ dàng thích nghi để sử dụng PrecomputedText.

Điều gì làm cho văn bản precomputing khó khăn là Android TextViews thực hiện bố trí gần như ngay lập tức sau khi setText() được gọi, và text style không được set cho đến khi chỉ trước đó (textSize là thuộc tính động). -> Có nghĩa là không có khoảng cách thời gian để đặt trong nền bố cục văn bản hoạt động.

Tuy nhiên có một tính năng quan trọng phá vỡ mong đợi này -  RecyclerView Prefetch . Do tìm nạp trước, RecyclerView thực sự gọi onBindViewHolder() một số khung hình sớm hơn so với item layout. Nó thực hiện điều này để tránh làm công việc tăng/giảm công việc tính toán đo lường ở thời điểm cuối cùng, ngay khi nội dung sắp hiển thị.

May mắn cho PrecomputedText, việc này có tác dụng phụ tốt khi để lại hàng chục mili giây giữa ràng buộc và bố cục, một khoảng cách lý tưởng cho văn bản precomputing trên background thread 

Trong bản beta Jetpack gần đây nhất, đã thêm các tính năng bổ sung để hỗ trợ chính xác trường hợp sử dụng này. Bây giờ có thể tạo ra một Future<PrecomputedTextCompat> để sử lí trường hợp này

``` kotlin 
override fun onBindViewHolder(vh: ViewHolder, position: Int) {
    val itemData = getData(position)
    // first, modify item-dependent properties
    vh.textView.textSize = if (item.isImportant) 14 else 10
    // Pass text computation future to AppCompatTextView,
    // which awaits result before measuring.
    textView.setTextFuture(PrecomputedTextCompat.getTextFuture(
            item.text,
            TextViewCompat.getTextMetricsParams(textView),
            /*optional custom executor*/ null))
}
```
Ứng dụng sẽ khởi chạy PrecomputedText trên background thread. Thay vì chờ đợi công việc đó bên trong mã ràng buộc , TextView sẽ đợi và chặn kết quả ngay trước khi nó được đo. Khi cuộn RecyclerView, các item được  inflated/bound sớm và PrecomputedText tận dụng điều đó để ẩn việc tính toán của văn bản.
Lưu ý rằng bạn đang truy vấn **TextViewCompat.getTextMetricsParams()** và chuyển nó đến một background thread. Bởi vì điều này, điều quan trọng là không thay đổi thuộc tính TextView sau **setTextFuture()**, (trừ khi ta đang rebinding, và gọi **setTextFuture()** ngay lập tức). Việc sửa đổi các thuộc tính có thể dẫn đến PrecomputedText không tương thích với TextView, trong trường hợp đó một ngoại lệ sẽ được ném trong khi tính toán kích thước

PrecomputedTextCompat dựa trên bộ nhớ cache bố cục từ của Android, không tồn tại cho đến khi phát hành Lollipop (API 21). Vì lý do này, PrecomputedTextCompat không có precomputation trên các phiên bản nền tảng cũ hơn Lollipop.

Cách tiếp cận này sẽ không giúp đỡ nếu ta đã vô hiệu hóa tìm nạp trước(prefetch) hoặc nếu sử dụng custom layoutmanager không hỗ trợ hiển thị prefetch. Nếu sử dụng một custom LayoutManager, hãy chắc chắn nó thực hiện **collectAdjacentPrefetchPositions()** để RecyclerView biết những item nào cần tìm nạp trước. Tìm nạp trước chỉ áp dụng cho các lượt xem cuộn trên màn hình.
## VII. Databinding 
Nếu bạn đã từng sử dụng Data Binding, bạn có thể nhận được những lợi ích tương tự của PrecomputedText với BindingAdapter

``` xml
<layout
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable name="item" type="com.example.ItemData"/>
    </data>
    <TextView
        android:id="@+id/item_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="@{item.isImportant ? 14 : 10}"
        app:asyncText="@{item.text}"/>
</layout>
```
Bây giờ trong BindingAdapter, ta có thể định nghĩa thuộc tính đó asyncText và để triển khai nó để sử dụng PrecomputedText và setTextFuture
``` kotlin 
@BindingAdapter(
        "app:asyncText",
        "android:textSize",
        requireAll = false)
fun asyncText(view: TextView, text: CharSequence, textSize: Int?) {
    // first, set all measurement affecting properties of the text
    // (size, locale, typeface, direction, etc)
    if (textSize != null) {
        // interpret the text size as SP
        view.textSize = textSize.toFloat()
    }
    val params = TextViewCompat.getTextMetricsParams(view)
   (view as AppCompatTextView).setTextFuture(
           PrecomputedTextCompat.getTextFuture(text, params, null)
}
```
Cần đảm bảo lời gọi **getTextMetricsParams** chạy sau khi TextView có tất cả các thuộc tính khác bị ràng buộc, và Data Binding không cung cấp sự đảm bảo về adapter nào được gọi khi nào.
``` kotlin 
override fun onBindViewHolder(holder: Holder, position: Int) {
    holder.binding.item = getItem(position)
    holder.binding.executePendingBindings()
}
```
Cuối cùng, gọi executePendingBindings() để item được cập nhật mà không cần đợi giai đoạn bố cục tiếp theo. Điều này là bắt buộc khi sử dụng data binding bên trong RecyclerView, ngay cả khi không sử dụng PrecomputedText.
## VIII. Summary
PrecomputedText giải quyết hiệu suất hiển thị văn bản trong RecyclerView, một trong những vấn đề hiệu suất lớn nhất trong hiệu suất cuộn. Ta có thể giảm công việc tính toán đo lường văn bản xuống 95%!. PrecomputedText được khuyển sử dụng để thay thế TextViews thường hiển thị 200 ký tự trở lên để đảm bảo về mặt hiệu năng ứng dụng.

## IX. References
https://android-developers.googleblog.com/2018/07/whats-new-for-text-in-android-p.html

https://medium.com/androiddevelopers/prefetch-text-layout-in-recyclerview-4acf9103f438