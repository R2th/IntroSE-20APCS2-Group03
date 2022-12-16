![](https://images.viblo.asia/6a8e3094-1c53-480c-977d-fbe278e28c45.jpg)

Hello anh em, mình tiếp tục trở lại với series về thủ thuật CSS đây.

### 1. Select Items Using Negative nth-child

Chúng ta chỉ thường hay sử dụng `nth-child` để chọn các phần tử ở các vị trí như:

* `:nth-child(2)`: Chọn phần tử thứ 2
* `:nth-child(2n)`: Chọn phần tử thứ 2, 4, 6, 8....
* `:nth-child(2n + 1)`: Chọn phần tử thứ 1, 3, 5, 7...

Thế thì làm sao để chọn **phần tử nằm trong 1 khoảng** hoặc là chọn hết **tất cả phần tử ngoại trừ 1 khoảng**.

Ok tips ở đây là chúng ta sẽ dùng `nth-child` với số âm để có được kết quả:

* `:nth-child(-n + 5)`: Chọn phần tử từ 1 đến 5
* `:not(:nth-child(-n + 5))`: Chọn tất cả phần tử ngoại trừ từ 1 đến 5
* `:nth-child(n + 3):nth-child(-n + 7)`: Chọn phần tử từ 3 đến 7

### 2. Equal-Width Table Cells

Đây là thuộc tính mà mình mới biết được gần đây trong khi tìm cách chia đều `width` cho các cột trong table. Chỉ cần 1 thuộc tính đơn giản là:

```css
table {
  table-layout: fixed;
}
```

### 3. Avoid Collapsing Margins

**Collapsing Margins** là cách mà trình duyệt hành xử với layout khi có 2 component liền kề nhau, component A có `margin-bottom` lớn hơn `margin-top` của component B thì khoảng cách giữa 2 component sẽ bằng giá trị của `margin-bottom`

A có `margin-bottom` là `30px`, B có `margin-top` là `20px`. Vậy thì khoảng cách giữa 2 khối này sẽ là `30px`, chứ không phải là `50px`

{@codepen: https://codepen.io/tinhh/pen/gKzgzj/}

Và để tránh tình trạng này xảy ra, cách mà mình hay áp dụng đó là **Single-direction margin declarations**, nghĩa là khai báo `margin` theo 1 hướng là **top** hoặc là **bottom** cho các component trên trang, cách này giúp mình dễ dàng kiểm soát được khoảng cách giữa các component.

Tuy nhiên vẫn sẽ có những trường hợp không thể tránh khỏi nếu chúng ta dùng thêm các libs CSS vào project, nhưng chỉ cần biết về `Collapsing Margins` thì chúng ta sẽ chú ý và tìm cách chỉnh CSS để mà layout chuẩn như bản design.

### 4. Use Pointer Events to Control Mouse Events

[pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) là thuộc tính mình mới tìm hiểu kỹ hơn gần đây.

Trong một tình huống style CSS cho thẻ button có trạng thái `disabled` thì bị ảnh hưởng CSS cho trạng thái `hover`

Thay vì đi override style trạng thái `hover` cho button disabled và thay đổi kiểu con trỏ chuột, thì chỉ cần sử dụng thuộc tính `pointer-events: none` là đủ.

Xem thêm demo dưới để hiểu hơn về sức mạnh của thuộc tính này:

{@codepen: https://codepen.io/tinhh/pen/RJyKQQ/}

# Tổng kết

Những kiến thức ở trên đều là do làm dự án nhiều, va chạm nhiều trường hợp layout nên mình mới lượm được. Hi vọng giúp được ai đó!

**P/s: Xin nhắc lại là tiêu đề câu view nhé! Anh em Frontend pro rồi đừng chém em ạ!**