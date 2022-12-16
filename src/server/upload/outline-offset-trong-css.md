# Sử dụng `outline-offset` trong CSS
## Đầu tiên chúng ta cùng tìm hiểu `outline-offset` là gì ?
`outline-offset` là một thuộc tính của CSS dùng để định nghĩa đường viền quanh một phần tử theo vị trí chỉ định. Vậy để tìm hiểu về `outline-offset` thì chúng ta xem `outline` dùng để làm gì ?
## `outline` là gì ?
`outline` khá giống với thuộc tính `border` đều tạo 1 đường viền bao quanh phần tử, điểm khác biệt giữa 2 thuộc tính là:
- `outline` là thuộc tính không tác động lên box-model, không làm ảnh hưởng đến bố cục trang (kiểu như position).
- Với `outline` bạn không thể style cho từng đường viền như `border` với các thuộc tính `border-top`, `border-bottom`, `border-left`, `border-right`.
- Với `outline` bạn có thể tuỳ chọn vị trí cho đường viền của phần tử (`outline-offset`) còn `border` thì không.
- Các giá trị của `outline` giống với `border` đều có width, style, color.
Vậy chúng ta dùng `outline-offset` để có thể thay đổi vị trí của đường viền quanh phần tử chỉ định, việc mà `border` không làm được.
## Giá trị trong `outline-offset`
`outline-offset` chấp nhận giá trí là một độ dài:
- Giá trị mặc định là 0.
- Nhận giá trị bất kỳ (bao gồm cả giá trị âm).


**Chú ý** `outline-offset` có giá trị giống `outline-width` nhưng không nhận giá trị phần trăm (%).

## Vị trí của `outline-offset`
Mặc định `outline-offset` sẽ được vẽ xung quanh phần tử được chỉ định (Nếu có `border` thì `outline`sẽ được vẽ bên ngoài `border` ). Do đó ta có thể kết hợp cả 2 để tạo hiệu ứng mình mong muốn.

```css
.box {
  width: 200px;
  height: 200px;
  background: #ccc;
  margin: auto;
  border: solid 8px yellow;
  outline: solid 8px orange;
}
```

![](https://images.viblo.asia/55240fe1-43ac-410a-a10d-366a6abccb0b.png)

Từ đây, ta có thể thay đổi vị trí của `outline` so với viền của `border` bằng cách dùng `outline-offset`. Ví dụ về sử dụng `outline-offset`

![](https://images.viblo.asia/cfa97462-cbf7-48be-ab92-cbc034d15db9.png)

Trên là ví dụ về giá trị dương. Nếu bạn muốn đường viền nằm bên trong thì hay dùng giá trị âm cho `outline-offset` và sẽ được kết quả sau đây:

![](https://images.viblo.asia/2d7d5215-663f-4b0d-aafe-ae1dfa19df01.png)

## Sự khác biệt khi sử dụng `outline` và `border`
Để hiểu rõ hơn sự khác nhau của 2 thuộc tính `outline` và `border`. Hãy xem demo sau:

{@embed: https://codepen.io/onlylight/pen/ZEzmard}

## Kết
Thay vì chỉ set `outline: 0;` cho các element trong trang. Bây giờ bạn có thể tận dụng `outline` để style theo kiểu bạn mong muốn mà không sợ bị ảnh hưởng đến layout của trang.

Tài liệu tham khảo https://css-tricks.com/almanac/properties/o/outline-offset/