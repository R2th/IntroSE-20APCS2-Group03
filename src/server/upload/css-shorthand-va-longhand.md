Bài viết được dịch từ nguồn: [CSS Shorthand vs. Longhand – Which to Use](https://www.hongkiat.com/blog/css-shorthand-longhand-notations/)

Một kiểu ra đời khi mà người ta muốn code CSS ngắn gọn hơn, còn một kiểu thì để giữ sự rõ ràng, dễ hiểu. Dù code theo kiểu nào thì cũng có mục đích cũng như ưu/nhược điểm riêng của từng kiểu.

Bài viết này sẽ giúp bạn hiểu hơn về 2 kiểu *shorthand* với *longhand* này để từ đó thấy được dùng kiểu nào sẽ là tốt hơn trong từng trường hợp cụ thể.

![](https://images.viblo.asia/63cd8b28-0741-491d-b2df-401db0823f76.jpg)

### Shorthand là gì

Kiểu *shorthand* đơn giản là sẽ đem gom giá trị của một số thuộc tính CSS lại với nhau. Ví dụ ta có thể gán giá trị cho `border-width`, `border-style` và  `border-color` mà chỉ cần sử dụng duy nhất thuộc tính `border` như sau:

```css
border: 1px solid blue;
```

Chắc hẳn ví dụ này cũng rất quen thuộc với bạn, code trên sẽ tương đương với:

```css
border-width: 1px;
border-style: solid
border-color: blue;
```
Với cách này thì ta không phải khai báo riêng lẻ cho từng giá trị `width`, `style`, `color`, giúp tiết kiệm không gian và thời gian.

#### 1. Cách thức hoạt động

Như đã đề cập ở trên, ta sẽ dùng `shorthand` để khai báo một tập hợp các giá trị của thuộc tính, thứ tự của các thuộc tính đó không quan trong, miễn nó đều là thành phần của thuộc tính bên ngoài (trong ví dụ trên là `width`, `style`, `color` của `border`). Với những thuộc tính có giá trị tương tự như `margin` thì thứ tự mới quan trọng, bạn hãy nhớ theo chiều kim đồng hồ.

Bây giờ, trong ví dụ trên thì sẽ ra sao nếu ta khai báo thiếu mất giá trị, giả sử là `border-style` chẳng hạn, code sẽ như này:

```css
border: 1px blue;
```

Kết quả là ta sẽ không thấy `border` hiện ra nữa, không phải khai báo `shorthand` kia không làm việc mà vì ta quên khai báo nên `border-style` đã nhận giá trị mặc định của nó là `none`. Code sẽ tương đương như sau:

```css
border: 1px none blue;
```

Bây giờ hãy bỏ `border-width` và giữ nguyên 2 thuộc tính còn lại:

```css
border: solid blue;
```

Kết quả là ta vẫn thấy `border` hiện ra nhưng với **dày** hơn `1px` một chút bởi vì `border-width` đã nhận giá trị mặc định là `medium`.

Điều này cho thấy, khi một giá trị của thuộc tính không được khai báo trong *Shorthand* thì nó sẽ nhận giá trị mặc định của mình (ngay cả khi nó phải ghi đè bất kỳ giá trị nào trước đó được gán cho cùng thuộc tính).

Nếu có khai báo `border-width: 1px` cho một thành phần ở đâu đó trước `border: solid blue` thì độ rộng của `border` sẽ là `medium` (mặc định) chứ không phải là `1px`.

Chú ý là ta sẽ không thể dùng các giá trị như `inherit`, `initial` hoặc là `unset` cho tất cả thuộc tính CSS trong *Shorthand*, vì như thế thì browser sẽ không thể nào biết được chính xác thuộc tính nào là đại diện cho *Shorthand*, cho nên tất cả khai báo sẽ bị hủy.

#### 2. Thuộc tính `all`

Có một *Shorthand* có thể áp dụng cho toàn bộ các thuộc tính CSS.  Các giá trị `inherit`, `initial` hay `unset` được áp dụng cho tất cả các thuộc tính và do đó đây là các giá trị duy nhất được chấp nhận bởi thuộc tính `all`.

```css
div {
  all: initial
}
```

Điều này sẽ làm cho tất cả các thành phần `div` bỏ qua các thuộc tính CSS mà nó có và đặt lại với giá trị mặc định. Chính vì thế mà không nên lạm dụng thuộc tính `all`.

**Note:** Thuộc tính `color` sẽ nhận giá trị `hexadecimal` trong *Shorthand* nếu như 2 số của giá trị `hex` trong nó là giống nhau, ví dụ `background: #445599` sẽ tương đương `background: #459`.

### Longhand là gì

Là các thuộc tính đơn lẻ có thể được gộp lại trong *Shorthand*, ví dụ như `background-image`, `margin-left`, `animation-duration`, ...

#### Vì sao ta sử dụng Longhand

Sử dụng *Longhand* thì dài hơn, không tiện nhưng sao ta vẫn cần sử dụng? Như đề cập ở phần trên, *Shorthand* sẽ ghi đè các thuộc tính bị bỏ sót với giá trị mặc định của nó, đây sẽ là vấn đề nếu như việc ghi đè đó là không cần thiết.

Hãy lấy ví dụ khai báo `font` bên dưới để làm ví dụ, sử dụng nó trong thành phần `h4` (được in đậm với mặc định `font-weight:bold`):

```css
font: 20px "courier new";
```

Trong *Shorthand* này, thuộc tính `font-weight` không được khai báo nên nó sẽ nhận giá trị mặc định là `font-weight:normal` nên thẻ `h4` kia sẽ mất **in đậm**.

Với ví dụ trên thì khai báo 2 thuộc tính *Longhand* là `font-size` và `font-family` sẽ tốt hơn. Và khai báo *Shorthand* cho một vài thuộc tính thì cũng không có nhiều ý nghĩa.

Trong giai đoạn phát triển, một số dev (đặc biệt là newbie) có thể thấy việc sử dụng *Longhand* sẽ dễ dàng hơn rất nhiều so với *Shorthand* vì nó dễ đọc và rõ ràng hơn.

***
### Tham khảo
- https://www.hongkiat.com/blog/css-shorthand-longhand-notations/


***
Cám ơn vì đã theo dõi bài viết, hi vọng sẽ có ích với bạn.