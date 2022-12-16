### CSS Grid

Bạn đã từng nghe nói về CSS Grid rồi chứ, tôi chắc chắn là nếu bạn là 1 Frontend thì hẳn đã từng nghe rồi. Nó đã được nhắc nhiều trong một năm trở lại đây, với cá nhân mình thì mình thấy Css Grid thật sự mạnh mẽ và giải quyết được rất nhiều kiểu layout. Đây là 1 định nghĩ ngắn về nó từ W3c:

> Grid Layout is a new layout model for CSS that has powerful abilities to control the sizing and positioning of boxes and their contents. Unlike Flexible Box Layout, which is single-axis–oriented, Grid Layout is optimized for 2-dimensional layouts: those in which alignment of content is desired in both dimensions.

Theo cách hiểu của mình thì CSS Grid là một mạng lưới các đường ngang và dọc vô hình. Chúng ta sắp xếp các phần tử trong khoảng trống giữa các dòng đó để tạo ra bố cục mong muốn. Một cách dễ dàng hơn, ổn định và chuẩn hóa để cấu trúc nội dung trong một trang web.

Trong bài này, chúng ta sẽ sử dụng khả năng sắp xếp thứ tự layout của CSS Grid để giải quyết vấn đề bố cục để đem lại kết quả mong muốn khi mà kết quả mong muốn phụ thuộc vào thứ tự sắp xếp layout. Cụ thể, chúng ta sẽ sử dụng checkbx và couter CSS.

### Counting With Checkboxes

Nếu bạn chưa bao giờ sử dụng Couter CSS, đừng lo lắng, khái niệm này khá đơn giản! Chúng ta thiết lập Couter để đếm một tập hợp các phần tử ở cùng cấp DOM.
Dưới đây là code để đếm checkbox đã chọn và chưa chọn:

```html
<input type="checkbox">Checkbox #1<br>
<input type="checkbox">Checkbox #2
<!-- more checkboxes, if we want them -->

<div class="total">
  <span class="totalChecked"> Total Checked: </span><br>
  <span class="totalUnChecked"> Total Unchecked: </span>
</div>
```

```css
::root {
  counter-reset: checked-sum, unchecked-sum;
}

input[type="checkbox"] {
  counter-increment: unchecked-sum;
}

input[type="checkbox"]:checked {
  counter-increment: checked-sum;
}

.totalUnChecked::after {
  content: counter(unchecked-sum);
}

.totalChecked::after {
  content: counter(checked-sum);
}
```

Trong đoạn code trên, hai bộ đếm được đặt ở root sử dụng thuộc tính couter theo quy tắc tương ứng, một cho các ô checkbox đã check và bộ đếm khác cho checkbox chưa được chọn, sử dụng số đếm ngược. Các giá trị được hiển thị dưới dạng nội dung của hai phần tử after và before của <span>  'rỗng bằng cách sử dụng counter ().
   
{@codepen:https://codepen.io/buiduccuong30051989/pen/ReBOKJ}

Cái này rất là hay. Chúng ta có thể sử dụng nó trong danh sách công việc, giao diện hộp thư đến email, biểu mẫu khảo sát hoặc bất kỳ tình huôngs nào  cần đếm số lựa chọn và chưa được lụa chọn. Tất cả điều này chỉ với CSS! Rất hữu ích, phải không?

Nhưng bạn cần chú ý thứ tự của code html, nếu couter đứng trên cùng như này, code sẽ ko chạy:

```html
<!-- This will not work! -->
<div class="total">
  <span class="totalChecked"> Total Checked: </span><br>
  <span class="totalUnChecked"> Total Unchecked: </span>
</div>
<input type="checkbox">Checkbox #1<br>
<input type="checkbox">Checkbox #2
```

Đó là khi chúng ta cần đến grid layout để sắp xếp lại bố cục mà vẫn giữ nguyên code html

```css
.grid { 
  display: grid; /* creates the grid */
  grid-template-columns: repeat(2, max-content); /* creates two columns on the grid that are sized based on the content they contain */
}

.total { 
  grid-row: 1; /* places the counters on the first row */
  grid-column: 1 / 3;  /* ensures the counters span the full grid width, forcing other content below */
}

```

Chúng ta đã xác định rằng sẽ có hai cột trên phần tử lưới trong CSS, mỗi cột chứa nội dung của chính và có kích thước tối đa .

Tiếp theo trong div total ta sẽ chỉ định cho nó nằm ở hàng đầu tiên bằng thuộc tính grid-row, và full width cho nó bằng grid-coumn.
Vậy là phân total sẽ được đưa lên hàng đầu tiên, dù rằng html của nó vẫn nằm ở dưới các checkbox.