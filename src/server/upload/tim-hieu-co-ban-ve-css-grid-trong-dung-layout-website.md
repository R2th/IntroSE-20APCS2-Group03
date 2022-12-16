## Giới thiệu
CSS Grid là một công cụ mạnh mẽ cho phép tạo bố cục hai chiều trên web. Bài viết này giúp bạn hiểu rõ hơn và tìm hiểu CSS Grid, khi nào sử dụng CSS Grid.

**Chú ý: Bài viết này giả định rằng bạn có kiến thức cơ bản về CSS Flexbox và các thuộc tính dựng bố cục CSS khác.**

Chắc hẳn các bạn biết đến trò chơi nổi tiếng Tic-Tac-Toe (cờ caro) chứ? Chúng ta biết bố cục của game này bao gồm: 3 hàng và 3 cột bằng nhau. Để vẽ ra bố cục của trò chơi này chúng ta cần 3 hàng và 3 cột chia làm 9 ô như hình bên dưới.

![](https://images.viblo.asia/c8b29b37-2f32-4e21-baa7-f3f489da6526.jpg)

## Khi nào sử dụng CSS Grid?
Nếu bạn quen thuộc với các kỹ thuật dựng layout đặc biệt là Flexbox - chúng ta sẽ sử dụng các kỹ thuật khác nhau phụ thuộc layout của design. Về mặt lý thuyết, sử dụng Grid so với Flexbox, có hai điều cần xem xét:
1. Bố cục hai chiều hoặc một chiều. 
2. Một cách tiếp cận layout-first hoặc content-first.

Grid là hai chiều và tốt nhất cho việc xếp các mục theo hai hướng (cột và hàng) cùng một lúc. Lưới cũng là một lựa chọn tuyệt vời cho cách tiếp cận layout-first. Điều này có nghĩa là chúng ta sẽ xác định layout của Grid trước sau đó đặt nội dung vào các layout Grid đã dựng trước đó.

![](https://images.viblo.asia/beb2a02e-56a7-453b-855c-f906c6f6168f.jpg)

Flexbox là một chiều và chỉ có thể tính toán và sắp xếp các mục theo một hướng tại một thời điểm - có thể là các mục theo hàng hoặc cột, nhưng không phải cả hai cùng một lúc. Flexbox hiệu quả hơn nếu chúng ta muốn sử dụng cách tiếp cận content-first - chúng ta phân phối và làm cho không gian có sẵn đáp ứng linh hoạt với nội dung.

![](https://images.viblo.asia/61dafc6d-61f3-4a27-83e2-f0bb46c231c4.jpg)

## Cấu tạo của CSS Grid
CSS Grid giới thiệu một số khái niệm và thuộc tính mới. Trong phần này, tôi sẽ giải thích các khái niệm cốt lõi với cú pháp ví dụ kèm theo.
### Display Grid
Bằng cách đặt giá trị `display` của một phần tử thành `grid`, chúng tôi kích hoạt bộ grid container.
```
.grid-container {
  display: grid;
}
```
### Explicit and Implicit Grids
Trong Grid, có khái niệm về một ẩn so với một lưới rõ ràng. Một lưới rõ ràng là khi chúng ta xác định rõ ràng kích thước và số lượng của các cột và / hoặc các cột lưới. Lưới ẩn là khi chúng ta không xác định kích thước và số lượng cột và / hoặc cột của lưới. Đây là khi chúng ta dựa vào thuật toán vị trí tự động của lưới Grid để quyết định nơi tạo các cột lưới và hoặc / hàng và nơi đặt các mục bên trong lưới.
### Grid Lines
Các đường lưới là các đường dọc và ngang phân tách một lưới thành các hàng và cột. Chúng có giá trị bởi vì chúng ta có thể tham chiếu chúng để đặt rõ ràng các mục lưới bên trong một lưới. Các đường lưới được xác định bởi số lượng cột và hàng mà chúng tôi đặt rõ ràng cho lưới hoặc các cột được trình duyệt tự động đặt hoàn toàn. Trong ví dụ dưới đây, có bốn cột. Do đó, các dòng lưới cột bắt đầu từ 1 và kết thúc ở 5. Tương tự chúng ta có hai hàng, do đó các dòng lưới hàng bắt đầu từ 1 và kết thúc ở 3.

![](https://images.viblo.asia/c155c9e5-6c3c-40f2-8d67-7463e069fa7b.jpg)

### Grid Track
Grid Track là khoảng cách giữa các cột và các hàng.
![](https://images.viblo.asia/afabfe7b-fa76-425c-8466-90f31a215eee.jpg)

Chúng ta xác định số lượng và kích thước của grid track sử dụng 2 thuộc tính `grid-template-columns` và `grid-template-rows`.

```
.grid-container {
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 170px);
}
```

### Grid Gap
Grid gap [gutter] là khoảng cách giữa 2 track được set thông qua 2 thuộc tính `grid-column-gap` và `grid-row-gap`

![](https://images.viblo.asia/ff9f533a-1524-48cf-8e0c-3930c3404218.jpg)

Thuộc tính shorthand của `column-gap` và `row-gap` là `grid-gap` bằng cách định nghĩa `grid-row-gap` sau đó là `grid-column-gap`.  Nếu đặt cùng kích thước chúng ta chỉ cần sử dụng 1 giá trị.

```
.grid-container {
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 170px);

/*  Setting column and row gaps  */
  grid-column-gap: 40px;
  grid-row-gap: 40px;

/*  Shorthand  */
  grid-gap: 40px;
}
```

### Grid Items
Tất cả các con trực tiếp của một grid container được gọi là các grid items.
![](https://images.viblo.asia/3906f4ca-11c7-429d-b0ef-5e712a8b0ae4.jpg)

Giống như Flexbox, bất kỳ phần tử nào không phải là con trực tiếp của grid containter sẽ không bị ảnh hưởng bởi các thuộc tính lưới. Chúng hiển thị theo normal flow của trang. 

## Inspecting & Debugging Grid
Chúng ta có thể sử dụng Firefor DevTools hoặc Chrome DevTool. Các công cụ này cung cấp các cách khác nhau để lập trình viên có thể inspect và debug các phần tử Grid.

Mở ví dụ trên [CodePen](https://codepen.io/Viget-FED/pen/QeZjNM?editors=1100) bằng Firefox và khám phá nhé.

![](https://images.viblo.asia/9a6f7391-f769-4186-b399-6313958896ad.png)

## Kết luận
Như vậy thông qua bài viết này chúng ta đã cùng nhau tìm hiểu về CSS Grid cơ bản. Các bạn tìm hiểu và áp dụng nó và chờ tiếp phần sau nhé!

**Bài viết tham khảo:** https://www.viget.com/articles/getting-started-with-css-grid-part-1/