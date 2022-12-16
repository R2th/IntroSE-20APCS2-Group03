### Explicit và implicit grids là gì
Để hiểu được sự khác nhau giữa grid-template và grid-auto chúng ta phải hiểu được thế nào là explicit và implicit grids là gì.
Định nghĩa explicit và implecit grids có thể là 1 vòng tròn. Explicit có ví dụ là xác định được sử dụng để tạo ra bởi explicit-grids, thuộc tính của grid-template-*.
theo định nghĩa của [W3C Candidate Recommendation:](https://www.w3.org/TR/css-grid-1/#explicit-grids)

> The three properties grid-template-rows, grid-template-columns, and grid-template-areas together define the explicit grid.

Mặt khác, implicit grids được định nghĩa là những thứ khác:

> When grid items are positioned outside of [the explicit grid], the grid container generates implicit grid tracks by adding implicit grid lines to the grid. These lines together with the explicit grid form the implicit grid.

Các định nghĩa này hơi khó để hình dung, nhưng cứ làm nhiều bạn sẽ nghiệm ra.

Với grid container, nó là những grid cells, bất kỳ vị trí cells và kích thước nào đều được sử dụng thuộc tính grid-template-* từ một phần của explicit-grid. bất kỳ grid cells nào không có vị trí và kích thước sử dụng thuộc tính này đều là implicit grid.

### Thuộc tính grid-template và grid-auto khác nhau như thế nào?

BỞi vì cấu trúc và cú pháp của tên thuộc tính grid-template và grid-auto có nhiều điểm tương đồng. Nó có thể dễ dàng nghĩ rằng các giá trị mà họ chấp nhận và do đó những gì họ đạt được, tương tự là tốt. Ngược lại, những giá trị này đang làm những việc rất khác nhau.

Trong khi thuộc tính grid-template-* định nghĩa cả giá trị vị trí và kích thước, còn thuộc tính grid-auto-* chỉ định nghĩa kích thước của grid cells.
Sự khác biệt này trở nên rõ ràng khi bạn xem xét những thuộc tính này là gì. Thuộc tính grid-template-* được sử dụng để tạo explicit grid, trong khi grid-auto-* được sử dụng để định nghĩa kích thước của emplicit grid (những cái được tự động khởi tạo)

### Cách grid-template hoạt động

Có 4 thuộc tính của grid-template-* là: - grid-template-rows, grid-template-columns, grid-template-areas, và grid-template, thuộc tính cuối cùng là một cách viết tắt cho ba thuộc tính đầu tiên. Với mục đích của bài viết này, tôi sẽ tập trung vào hai bài đầu tiên.
chọn thuộc tính đầu tiên - grid-template-rows, Nếu chúng ta muốn tạo một lưới với một hàng có chiều cao 100px, chúng ta sẽ sử dụng CSS sau:
```
.grid {
	display: grid;
	grid-template-rows: 100px;
}
```

Nếu chúng ta muốn thêm một hàng khác, chúng ta chỉ cần thêm một giá trị độ dài khác, cách nhau bằng dấu cách với giá trị độ dài đầu tiên.

```
.grid {
	display: grid;
	grid-template-rows: 100px 100px;
}
```

Chúng ta có thể làm tương tự cho các cột sử dụng thuộc tính grid-template-columns.
Mặc dù có một số cách để xác định chiều cao / chiều rộng của mỗi hàng / cột bằng cách sử dụng thuộc tính grid-template- *, luôn có một kết hợp một-một giữa giá trị và bản nhạc. Như tôi đã trình bày trong ví dụ trên, mỗi giá trị độ dài được phân cách bằng khoảng trống được biểu thị bằng một hàng. Đây là cách các thuộc tính grid-template- * được sử dụng để không chỉ xác định kích thước, nhưng vị trí và bố trí của các grid-cells.

### Cách Grid-Auto hoạt động

Có ba thuộc tính grid-auto- * là: grid-auto-rows, grid-auto-columns, và grid-auto-flow. Với mục đích của bài viết này, tôi sẽ tập trung vào hai thuộc tính đầu tiên.

Thuộc tính grid-auto-rows và grid-auto-columns chấp nhận một giá trị độ dài duy nhất, được sử dụng để xác định kích thước của bất kỳ implicit grid cells. Ví dụ: chúng tôi có thể xác định rằng mọi hàng implicit grid row phải có chiều cao là 100px.

```
.grid {
	display: grid;
	grid-auto-rows: 100px;
}
```

Không giống như các thuộc tính grid-template- *, các thuộc tính grid-auto- * chỉ chấp nhận một giá trị độ dài duy nhất.

### Làm việc với explicit và implicit grids
Để hiểu rõ hơn sự khác biệt giữa thuộc tính grid-template- * và grid-auto- *, hãy xem vd dưới đây:
```
<div class="grid">
  <div class="cell">Cell 1</div>
  <div class="cell">Cell 2</div>
  <div class="cell">Cell 3</div>
  <div class="cell">Cell 4</div>
  <div class="cell">Cell 5</div>
  <div class="cell">Cell 6</div>
  <div class="cell">Cell 7</div>
  <div class="cell">Cell 8</div>
</div>
```
```
.grid {
	display: grid;
	grid-gap: 10px; /* add spacing for better visibility */
}
```

Hiện tại, lưới của chúng ta trông như thế này:
![](https://images.viblo.asia/c0dac639-d5ee-4707-aee0-0fe00863ce38.png)

Mặc dù nó có vẻ như không có gì đã xảy ra, nhưng một implicit grid đã thực sự được tạo ra. Lưới này có một cột và nhiều hàng vì có các grid cells. Chúng ta có thể thấy điều này nếu chúng ta sử dụng grid inspector trong Firefox.
![](https://images.viblo.asia/0a692868-31fc-4d47-95fa-73652e323a21.png)

##### đặt kích thước của implicit grid với grid-auto

All articles written with ❤ by Ire Aderinokun

Home The Newsletter The App Support on Patreon
Nếu chúng ta muốn xác định kích thước của chiều cao của các hàng này, chúng ta có thể sử dụng thuộc tính grid-auto-rows.
```
.grid {
	display: grid;
	grid-gap: 10px; /* add spacing for better visibility */
	grid-auto-rows: 30px;
}
```

![](https://images.viblo.asia/3976afe9-b480-42e3-b211-3ac81730d672.png)

*Lưu ý rằng tất cả những gì chúng ta đã làm được đưa ra một giá trị chiều cao duy nhất và kiểu này được áp dụng cho tất cả các hàng trong lưới.*

##### Khởi tạo một explicit grid với grid-template

Bây giờ chúng ta hãy định nghĩa một explicit grid. Chúng tôi có thể tạo explicit grid có hai hàng, mỗi hàng có chiều cao là 100px

```
.grid {
  display: grid;
  grid-gap: 10px; /* add spacing for better visibility */
  grid-auto-rows: 30px;
  grid-template-rows: 100px 100px;
}
```

![](https://images.viblo.asia/484fe240-329d-46d3-9a19-b72cf2551171.png)

Những gì chúng ta có thể thấy là chỉ có hai hàng đầu tiên có chiều cao là 100px và phần còn lại có chiều cao được xác định bởi thuộc tính grid-auto-rows. Chúng ta có thể thấy rõ hơn sự khác biệt giữa  explicit và implicit grids trong hình ảnh bên dưới

![](https://images.viblo.asia/6d2cf129-8915-44ff-8889-86d225a89271.png)

---
Nguồn: [Bitsofco](https://bitsofco.de/understanding-the-difference-between-grid-template-and-grid-auto/)