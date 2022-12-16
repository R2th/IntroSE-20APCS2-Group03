Để bố trí văn bản trên các view của ứng dụng Android, hệ thống cần thực hiện rất nhiều công việc. Mỗi text được hiển thị sẽ phụ thuộc vào phông chữ, ngôn ngữ, kích thước, style (như in đậm hoặc in nghiêng). Sau đó, hệ thống sẽ xử lý các quy tắc về cách chúng xếp hàng, kết hợp hoặc hợp nhất để tạo thành các từ. Cuối cùng chúng mới được hiển thị lên các view.
Vì những lý do này, nên để hiển thị được các văn bản hệ thống sẽ phải bỏ rất nhiều tài nguyên cũng như thời gian.Vì vậy, hệ thống Android sử dụng bộ đệm cho mỗi từ để tránh việc phải tính toán lại nhiều lần.

RecyclerView đặc biệt chú ý tới hiệu suất khi tải các view. Khi các mục mới xuất hiện trên màn hình, các khung hình cũ sẽ được tại sử dụng. Vì vậy, nếu một đoạn văn bản phức tạp trong một item của RecyclerView mất 12ms để tính toán, thì khung hình gần như chắc chắn bị bỏ qua (skip frame)

Trong bài viết này, chúng tôi sẽ nói về cách sử dụng API PrecomputingText mới để tính toán bố cục văn bản trước khi nó được sử dụng để hiển thị lên giao diện. Chúng tôi cũng sẽ xem xét các API tìm nạp văn bản mới trong Jetpack được thiết kế riêng để hiển thị số lượng lớn văn bản trong RecyclerView và cách chúng có thể giảm 95% chi phí đo lường văn bản.

# 1. Complex text layout
Các hình ảnh dưới đây cho thấy một RecyclerView đơn giản đang hiển thị các đoạn văn bản lớn. Trên Pixel2 (Chạy Android P, CPU 1GHz), đo 80 từ (~ 520 ký tự) sẽ mất 15,6ms. Đó là một lượng thời gian lớn! Thời gian tối đa cho một khung hình là 16,67ms, do đó, nếu UI phải xử lý những đoạn văn bản phức tạp hơn thì nó sẽ vượt quá thời hạn.

Bạn có thể không có nhiều văn bản trong TextViews của mình, nhưng nếu bạn đang chạy trên điện thoại cấp thấp, hiển thị một cái gì đó phức tạp hơn các ký tự La Mã hoặc sử dụng các phông chữ và kiểu khác nhau, thời gian như thế này có thể khá thực tế.

Sử dụn Developer Options > Monitoring > Profile GPU rendering, chúng ta có thể thấy vấn đề này một cách trực quan. Thanh ngang màu xanh lá cây cho thấy lý tưởng 16,67ms và các khung xếp chồng lên nhau theo chiều dọc tùy thuộc vào thời gian chúng sử dụng. Sử dụng TextView thông thường ở bên trái, có rất nhiều khung hình bị bỏ lỡ - những thay đổi lớn trong biểu đồ khi các mục mới xuất hiện trên màn hình.
![](https://images.viblo.asia/90a069d0-de15-41b8-ae80-3c8c0085e951.png)
Ảnh chụp bên phải hiển thị cùng một ứng dụng, nhưng sử dụng PrecomputingText để tránh công việc đo lường tốn nhiều thời gian trên luồng UI. Các công việc đo lường còn lại vẫn còn đó, gây ra các đột biến nhỏ, nhưng không còn gây ra [jank](https://developer.android.com/topic/performance/vitals/render#:~:text=If%20your%20app%20suffers%20from,in%20the%20Android%20vitals%20dashboard.). TextView.onMeasure giảm xuống còn 0,9ms - nhanh hơn 16 lần!
# 2. PrecomputedText
PrecomputingText, được công bố tại I / O năm 2018, là một API mới trong Android P, với phiên bản compat trong Jetpack giúp giảm thời gian xử lý văn bản UI. Nó cho phép bạn tính toán trước phần lớn công việc đo / bố trí trên một luồng chạy dưới nền.

Từ luồng UI, xác định tham số bố cục từ TextView:
```
val params : PrecomputedTextCompat.Params =
        TextViewCompat.getTextMetricsParams(myTextView)
```

Xử lý các công việc tính toán xử lý đoạn văn bản trên một chủ đề nền:
```
val precomputedText : Spannable =
        PrecomputedTextCompat.create(expensiveText, params)
```
Hiển thị lên TextView:
```
TextViewCompat.setPrecomputedText(myTextView, precomputedText)
```

Điều này giúp loại bỏ hơn 90% công việc của luồng UI - một cải thiện hiệu suất rất lớn! **PrecomputingTextCompat**, triển khai AndroidX, hoạt động trên L (API 21) trở lên, do đó mức tăng hiệu suất áp dụng cho khoảng 85% thiết bị hoạt động (tính đến tháng 5 năm 2018).

Cải tiến này là tuyệt vời, nhưng mẫu async ở trên không phải là tuyệt vời để hiển thị văn bản. Ví dụ: trong RecyclerView, văn bản trong một mục sẽ hiển thị ngay lập tức, không phải một khi nó đã cuộn nửa chừng màn hình. Để thực hiện điều này, chúng ta cần biết sớm các tham số văn bản và thực hiện công việc xử lý luồng nền trước khi TextView được hiển thị.

Làm thế nào chúng ta có thể xử lý đoạn văn bản từ trước khi nó được dùng tới vớiPrecomputingText ? 

# 3. Pre-compute layout
Sử dụng một luồng chạy dưới nền để xử lý văn bản trước khi nó được gọi đến trong khi bạn đang tải dữ liệu văn bản một cách bất đồng bộ. Ví dụ, chúng ta có thể tải dữ liệu từ mạng và có thể setup trước các style cho nó trước khi gửi đến luồng UI.

 Chúng tôi muốn xử lý trước toàn bộ văn bản trước khi gửi tới UI để giảm thiểu công việc xử lý giao diện người dùng:
 ````
 /* Worker Thread */
// resolve spans on worker thread to reduce load on UI thread
val expensiveSpanned = resolveIntoSpans(networkData.item.textData)
    
// pre-compute measurement work to reduce load on UI thread
val textParams: PrecomputedTextCompat.Params = // we’ll get to this
val precomputedText: PrecomputedTextCompat = 
PrecomputedTextCompat.create(expensiveSpanned, params)
 ````
 Sau đó, bạn có thể hiển thị PrecomputingText lên giao diện người dùng của bạn:
 `/* UI Thread */
myTextView.setTextMetricParams(precomputedText.getParams())
myTextView.setPrecomputedText(precomputedText)
`
PrecomputingText cần biết kích thước để thực hiện việc đo lường. Điều này có nghĩa là nó cần biết kích thước được tính toán bằng pixel để có thể điều chỉnh theo mật độ văn bản. Để chuyển đổi sp thành pixel, các bạn có thể sử dụng **DisplayMetrics.scaledDensity**.
Để ứng dụng chạy mượt nhất, hãy gọi ** DisplayMetrics.scaledDensity** ỏ một worker thread. Tuy nhiên, bạn phải đảm bảo công việc được hoàn thành trước khi hiển thị lên giao diện người dùng.

# 4. Tìm nạp trước với Future<>
Sẽ thật tuyệt nếu sử dụng được sức mạnh của PrecomputingText mà không phải thay đổi nhiều mã, hoặc lo lắng về việc tính toán kích thước văn bản ở các luồng chạy dưới nền. Hãy cùng xem một số thuộc tính thiết lập cho TextView:
`override fun onBindViewHolder(vh: ViewHolder, position: Int) {
    val itemData = getData(position)
    vh.textView.textSize = if (item.isImportant) 14 else 10
    vh.textView.text = itemData.text
}`

Điều gây khó khăn cho việc tính toán trước văn bản là Android TextViews thực hiện bố cục gần như ngay lập tức sau khi setText () được gọi và kích thước văn bản đã hoàn thành cho đến trước đó (lưu ý thuộc tính textSize động). Điều này có nghĩa là chúng tôi không có thời gian để đặt thực hiện công việc bố trí văn bản dưới nền.

Tuy nhiên, có một tính năng quan trọng phá vỡ sự mong đợi này - RecyclerView Prefetch. Do tìm nạp trước, RecyclerView đã vẽ trước một số item trước để có thể sử dụng ngay khi người dùng vuốt để xem item mới. Điều này đã giúp cho **PrecomputingText** có thời gian để thực hiện công việc của mình.

Trong phiên bản Jetpack beta gần đây nhất, chúng tôi đã thêm các tính năng bổ sung để hỗ trợ chính xác trường hợp sử dụng này. Hiện tại, nó có thể tạo ra một **Future<PrecomputedTextCompat>** và thông báo cho AppCompatTextView để chặn future đó cho tới khi lần gọi measure() tiếp theo hoàn thành
    `override fun onBindViewHolder(vh: ViewHolder, position: Int) {
    val itemData = getData(position)
    // first, modify item-dependent properties
    vh.textView.textSize = if (item.isImportant) 14 else 10
    // Pass text computation future to AppCompatTextView,
    // which awaits result before measuring.
    textView.setTextFuture(PrecomputedTextCompat.getTextFuture(
            item.text,
            TextViewCompat.getTextMetricsParams(textView),
            /*optional custom executor*/ null))
}`

 Lưu ý rằng bạn đang truy vấn TextViewCompat.getTextMetricsParams() và chuyển nó đến một luồng nền. Do đó, điều quan trọng là không thay đổi các thuộc tính TextView sau** ** (trừ khi bạn có thể đảo ngược và gọi **setTextFuture ()** ngay sau đó). Sửa đổi các thuộc tính có thể dẫn đến PrecomputingText không tương thích với TextView, trong trường hợp đó, một ngoại lệ sẽ được đưa ra trong quá trình đo.

Cách này không khả thi nếu bạn đã vô hiệu hóa tính năng tìm nạp trước hoặc nếu bạn sử dụng **CustomLayoutManager** mà không hỗ trợ rõ ràng về việc tìm nạp trước. Nếu bạn sử dụng **CustomLayoutManager**, hãy chắc chắn rằng nó triển khai **collectAdjacentPrefetchPositions()** để RecyclerView biết mục nào cần tìm nạp trước. Cũng lưu ý rằng tìm nạp trước chỉ áp dụng cho chế độ xem cuộn trên màn hình.

    
 Tổng kết :
PrecomputingText giải quyết hiệu suất bố cục văn bản trong RecyclerView, một trong những vấn đề về hiệu suất lớn nhất trong khi cuộn. Chỉ với một vài dòng mã và Jetpack mới nhất, bạn có thể giảm 95% chi phí đo lường văn bản!

Hiện tại, chúng tôi khuyên bạn nên thử PrecomputingText với TextViews trong danh sách thường hiển thị 200 ký tự trở lên. Chúng tôi rất thích nghe về trải nghiệm của bạn với nó và nơi nó giúp ích nhiều nhất trong ứng dụng của bạn. Đây là một phần của phiên bản beta của Jetpack, vì vậy, hãy dùng thử và cho chúng tôi biết suy nghĩ của bạn!
 Tham khảo : https://medium.com/androiddevelopers/prefetch-text-layout-in-recyclerview-4acf9103f438