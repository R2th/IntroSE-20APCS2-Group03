# Giới thiệu
**[ConstraintLayout](https://developer.android.com/training/constraint-layout/)** (được công bố vào sự kiện Google I/O năm 2016) cho phép bạn thiết kế những layout phân cấp theo kiểu `khung nhìn phẳng (flat view)` lớn và có độ phức tạp cao. Tương tự như **[RelativeLayout](https://developer.android.com/reference/android/widget/RelativeLayout)**, tất cả các view sẽ được phân bố theo bố cục các cấp bậc (tức là sẽ có các layout cha, và trong các layout cha sẽ có các layout con,...). Nhưng **ConstraintLayout** có tính linh hoạt hơn nhiều so với **RelativeLayout** và dễ dàng sử dụng hơn với Android Studio's Layout Editor.

Và cùng thời điểm đó, một cấu trúc layout khác cũng được công bố, đó chính là **[FlexboxLayout](https://github.com/google/flexbox-layout)**. Nếu các bạn đã từng hay đang là một `Front-end` developer hay có kiến thức chuyên sâu về `css` thì chắc hẳn đã nghe qua về từ `flex` rồi đúng không? **FlexboxLayout** có các tính năng tương tự như thuộc tính **[flex](https://www.w3.org/TR/css-flexbox-1/)** bên css vậy. Và dưới đây, mình sẽ đưa ra một vài trường hợp để khẳng định về tính vi diệu của **FlexboxLayout**.

# Các điểm nhấn
Đầu tiên, có thể xem **FlexboxLayout** tương tự như là một **LinearLayout** nhưng ở một level cao hơn (giống như phiên bản đã được updated vậy đó :laughing:). Bởi vì sao? Vì bên trong hai layouts này, bố cục các *khung nhìn* con đều được sắp xếp một cách tuần tự. Vậy nó có gì nổi trội hơn **LinearLayout**?

**FlexboxLayout** cung cấp một tính năng "gói" các *khung nhìn* lại. Nói thì có vẻ khó hiểu vậy, nhưng nếu nhìn hình bên dưới chắc hẳn các bạn sẽ hiểu. Khi chúng ta thêm thuộc tính
```
flexWrap="wrap"
```
vào, những *khung nhìn* sẽ tự động được đẩy xuống dưới một cách tuần tự nếu như không còn đủ không gian dành cho nó ở vị trí hiện tại.

![](https://images.viblo.asia/b4ab4c51-278b-41a1-bc99-1b1a29cd3820.png)

Theo như hình, các bạn sẽ thấy các *khung nhìn* vẫn được bố trí một cách tuần tự, từ trái sang phải, và từ trên xuống dưới đúng không nào?

Tiếp theo, chính là độ cơ động trên các thiết bị có các kích thước màn hình khác nhau (điều này chắc hẳn không chỉ có các Android developer gặp phải mà chính các dev khác cũng đã từng trải qua cả rồi).

Và với tính năng đầu tiên mình đã nói, chúng ta có thể áp dụng để biến layout trở nên cơ động hơn khi gặp phải các thiết bị với kích thước màn hình khác nhau đúng không nào? Điều mình muốn nói ở đây, chính là nếu như bạn có một form input với nhiều field. Đối với các màn hình nhỏ, mỗi hàng chỉ có thể hiển thị 2 fields, và cứ tự động các fields tiếp theo sẽ được bố trí ngay bên dưới một cách tuần tự và hợp lý. Còn đối với các thiết bị có màn hình to hơn, một hàng có thể hiển thị 3 đến 4 fields, đúng không nào?

![](https://images.viblo.asia/01bf4aec-571e-4573-a68f-d7c7bfaf2ad9.png)
Nexus5X portrait

![](https://images.viblo.asia/7274454b-b753-4beb-a046-ba5ddf4ce5e8.png)

Nexus5X landscape

Trên đây là hai ví dụ với cùng một thiết bị, nhưng một bên là màn hình đứng còn một bên là màn hình ngang. Chắc hẳn các bạn cũng thấy được độ cơ động trong trường hợp này đúng không nào?

Và một điểm nổi bậc nữa, đó chính là thuộc tính `layout_flexGrow`. Việc sử dụng thuộc tính này giúp cải thiện giao diện của layout hơn. Và thuộc tính này hoạt động tương tự như `layout_weight` trong **LinearLayout**. Có nghĩa là nó sẽ tự động phân bố phần không gian còn lại theo giá trị đã được thiết lập cho các `khung nhìn con` trên cùng một dòng.

![](https://images.viblo.asia/698492f7-8437-41e3-bd1b-590afe77e7cc.png)

Và ưu điểm cuối cùng được đề cập trong bài viết này, chính là việc **FlexboxLayout** có thể được tích hợp với **[RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView)**

Và với phiên bản alpha **FlexboxLayoutManager** mới nhất, bạn có thể sử dụng tính năng `scrollable` trong một `container`. Điều này sẽ giúp việc tiết kiệm bộ nhớ trở nên hiệu quả hơn đúng không nào?

Tuy nhiên, bạn vẫn có thể sử dụng tính năng `scrollable` trong một `container` với **FlexboxLayout** được bao bọc với **ScrollView** nếu bạn muốn. Tuy nhiên có lẽ bạn sẽ gặp phải một vấn đề về `OutOfMemoryError` nếu như số lượng các items quá nhiều. Vì `FlexboxLayout` không thể tái sử dụng lại các *khung nhìn cũ* khi người dùng cuộn màn hình.

Nói nhiều thì cũng khó hiểu, một trường hợp thực tế hơn về việc tích hợp `RecyclerView` là vô cùng có lợi đối với các ứng dụng về view ảnh hay tin tức. Bởi vì những ứng dụng này đều cung cấp một lượng lớn các items trong khi cá nhân mỗi item sẽ có chiều rộng khác nhau đúng không nào?

# Kết luận
Trên đây chỉ là một vài điểm nổi trội của **FlexboxLayout**, tất nhiên sẽ có rất nhiều tính năng vượt trội khác. Các bạn có thể tìm thấy nhiều thông tin hơn về **FlexboxLayout** tại [đây](https://github.com/google/flexbox-layout).

Bài viết được mình tham khảo và dịch lại từ [đây](https://android-developers.googleblog.com/2017/02/build-flexible-layouts-with.html). Nếu có gì không chính xác, các bạn có thể để lại ở phần bình luận. Cảm ơn các bạn đã đọc bài.