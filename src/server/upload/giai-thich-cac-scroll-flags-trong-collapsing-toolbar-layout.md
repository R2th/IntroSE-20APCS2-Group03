Trong bài viết này, chúng ta sẽ tìm hiểu các kiểu scrollflags (cờ) trong CollapsingToolbar thông qua các minh họa và cách kết hợp các flags lại với nhau.
## 1. ScrollFlags
Hiện tại trong CollapsingToolbarLayout cung cấp 5 kiểu scrollflags:
* scroll
* expandAlways
* expandAlwaysCollapsed
* snap
* exitUntilCollapsed

Để có thể sử dụng các flags này, bạn chỉ cần thêm thuộc tính dưới đây vào trong thẻ CollapsingToolbar:
```
app:layout_scrollFlags=”<select-flag-here>” 
```
Thuộc tính trên có nhiệm vụ định nghĩa hành vi của AppBarLayout và các View con trong nó. Bạn có thể dùng nó trực tiếp thuộc tính này lên AppBarLayout hoặc lên các View con trong file xml.

Bấy giờ, chúng ta sẽ thử thiết kế một layout có sử dụng CollapsingToolbarLayout mà không dùng flags nào để xem nó thế nào.

![](https://images.viblo.asia/2ecfeef1-acc7-4bb6-92ae-1bd6c12d7cec.gif)
Như bạn thấy ở trên thì không có hiện tượng đặc biệt gì xảy ra khi trong ta scroll (cuộn) màn hình. NestedScrollView được scroll bình thường ở phía dưới CollapsingToolbar mà không ảnh hưởng đến nó và CollapsingToolbar đang ở trong trạng expanded (mở rộng). Điều này có nghĩa nếu bạn muốn các View ở trong CollapsingToolbar luôn được giữ trong trạng thái hiện thị như trên thì bạn không cần sử dụng đến thuộc tính layout_scrollFlags.
### 1.1 scroll
```
app:layout_scrollFlags=”scroll”
```
Flag scroll này cho phép NestedScrollView báo hiệu cho CollapsingToolbar rằng nó đang trong thái scrolling.
* Nếu NestedScrollView đang được cuộn lên, có nghĩa ta vuốt màn hình lên thì  CollapsingToolbar sẽ được thu lại lên phía trên cho đến khi biến mất và phần nội dung trong NestedScrollView sẽ được mở rộng toàn màn hình.
* Ngược lại, nếu NestedScrollView được cuộn xuống dưới thì phần CollapsingToolbar sẽ dần được mở rộng ra.

![](https://images.viblo.asia/79e5f083-80d5-4d9a-8446-604d37484172.gif)
### 1.2 enterAlways, enterAlwaysCollapsed, snap & exitUntilCollapsed
```
app:layout_scrollFlags=”enterAlways”
app:layout_scrollFlags=”enterAlwaysCollapsed”
app:layout_scrollFlags=”snap”
app:layout_scrollFlags=”exitUntilCollapsed”
```
Nếu các flags này được sử dụng một cách độc lập, riêng mình nó thì CollapsingToolbar sẽ có cùng một biểu hiện tương đồng nhau (như ảnh dưới). Điều này có lẽ sẽ khiến cho các bạn thắc mắc liệu giữa chúng có điểm gì khác biệt không? Để thấy được sự khác biết ấy, chúng ta sẽ cần phải kết hợp chúng lại với flag scroll. Khi mỗi flag trên được kết hợp chung với scroll thì nó sẽ làm cho CollapsingToolbar có những hành vi khác nhau mỗi khi ta vuốt màn hình.
![](https://images.viblo.asia/2ecfeef1-acc7-4bb6-92ae-1bd6c12d7cec.gif)
## 2. Combinding  ScrollFlags (kết hợp)
Các ScrollFlags có thể được kết hợp, sử dụng cùng một lúc để tạo ra những hiệu ứng riêng biệt. Để kết hợp chúng lại, chúng ta chỉ cần thêm dấu "|" vào giữa các flags.

Ví dụ: để kết hợp 2 flags là scroll và enterAlways, chúng ta sẽ làm như sau:
```
app:layout_scrollFlags=”scroll|enterAlways”
```
Ở phần 1, chúng ta đã thấy chỉ có flag scroll mới tạo ra điểm khác biệt khi được sử dụng một mình. Bấy giờ, chúng ta sẽ thử kết hợp các flags lại với nhau và xem sự khác biệt giữa chúng.
### 2.1 scroll|enterAlways vs scroll|enterAlwaysCollapsed
Các bạn thử hãy tập trung để xem sự khác biệt giữa 2 sự kết hợp: **scroll|enterAlways** (trái) - **scroll|enterAlwaysCollapsed** (phải)

![](https://images.viblo.asia/ffcb9e9f-21e2-4665-959a-dc12a27ce594.gif) ![](https://images.viblo.asia/ae1da083-e312-46ba-8fcf-f7fe83dd7f8f.gif)

Điểm khác biệt của 2 sự kết hợp này được thể hiện khi CollapsingToolbar được expand khi chúng ta vuốt màn hình lên.
* **scroll|enterAlways**: Mỗi khi chúng ta vuốt màn hình lên, CollapsingToolbar liền bắt đầu expand và hiển thị toàn bộ nội dung trong nó. Cho phép hiển thị View ngay lập tức.
* **scroll|enterAlwaysCollapsed**: Khác với ở trên, CollapsingToolbar sẽ chỉ được expand khi màn hình được vuốt lên đến phần trên cùng của giao diện (top).  Nếu bạn khai báo thêm thuộc tính minHeight vào CollapsingToolbar thì phần View sẽ luôn được hiển thị với minHeight và được mở rộng khi scroll đến top.

### 2.2 scroll|enterAlways vs scroll|snap
Các bạn đã biết được flag **scroll|enterAlways** (trái) hoạt động thể nào, hãy thử so sánh nó với **scroll|snap** (phải).

![](https://images.viblo.asia/ffcb9e9f-21e2-4665-959a-dc12a27ce594.gif) ![](https://images.viblo.asia/4062cf7a-cdb3-4be4-8953-86f88e5472dd.gif)
* **scroll|snap**: snap sẽ luôn làm cho `CollapsingToolbar` được mở rộng hay thu lại dựa trên trạng thái hiện tại của `CollapsingToolbar `.

### 2.3 scroll|enterAlways vs scroll|exitUntilCollapse
![](https://images.viblo.asia/ffcb9e9f-21e2-4665-959a-dc12a27ce594.gif) ![](https://images.viblo.asia/76df04aa-c352-4bb6-a7bd-6a0f6d0f0164.gif)

- **scroll|exitUntilCollapsed**: Flags này sẽ giữ cho toolbar luôn hiển thị ở trên top và sẽ không bị ẩn khi scroll. Flag này có đặc điểm tương tự như flag `enterAlwaysCollapsed` - chỉ mở rộng `CollapsingToolbar`  khi `NestedScrollView` khi scroll lên top.