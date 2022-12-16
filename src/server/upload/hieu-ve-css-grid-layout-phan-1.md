![](https://images.viblo.asia/74913ae5-58b9-4253-80a7-9c021a22ec1a.png)

Xin chào các bạn, mình là một Frontend Dev, vì vậy mình luôn tìm cách tối ưu cho website hay những ứng dụng một cách đơn giản, đỡ tốn nhiều công sức và dễ bảo trì nhất. Trước đây chúng ta dùng table để dàn dựng layout để rồi rất khó bảo trì, sau đó dựng layout bằng Float hay gần đây nhất chúng ta rất chuộng Flexbox với nhiều tính năng nhanh-gọn-nhẹ của nó. Tuy nhiên ứng dụng với UI ngày càng thiên biến vạn hóa nên việc chỉ sử dụng flexbox thực sự vẫn chưa tối ưu, cần nhiều giải pháp hơn để tạo ra layout một cách nhanh nhất, đẹp mà lại không mất nhiều thời gian.

Ở bài viết này mình xin chia sẻ đến các bạn kỹ thuật mới với CSS Grid, thông qua một số demo cụ thể để các bạn hiểu rõ hơn.

1 2 3 zô!

Giống như flexbox, để dùng được gird các bạn cũng cần phải thêm thuộc tính `display: grid` ở container bao bọc các items nhé.

## 1. Grid tracks

Grid tracks là khoảng trống giữa 2 grid line bất kỳ được đánh dấu thứ tự theo các hàng và cột. Các tracks được đánh dấu theo hàng và cột tương ứng từ trên cùng hoặc ngoài cùng bên trái.
```javascript
Tracks cột  = n cột  + 1
Tracks hàng = n hàng + 1
````
![](https://images.viblo.asia/bb5ed3b8-16e6-490e-9eca-9c48da359735.png)

## 2. grid-template-columns
Columns với đúng tên gọi là cột. Khi sử dụng thuộc tính này, grid container sẽ chia các items con bên trong thành các cột. Bạn muốn chia bao nhiêu cột cũng được.
Ví dụ mình có 10 items, mình muốn chia 1 hàng có 5 cột. Đơn vị ở đây các bạn có thể dùng `px, %, rem, em, vw, vh, auto`. Ngoài ra với flex bạn có thể dùng đơn vị `fr` dùng để phân bố các items có size có tỉ lệ với nhau.

```css
.container {
	grid-template-columns: 20% 20% 20% 20% 20%;
}
```

![](https://images.viblo.asia/d0a73bae-0475-4df3-a02e-e63a9f2c840b.jpg)

```css
.container {
	grid-template-columns: 200px 300px 100px 50px auto;
}
```

![](https://images.viblo.asia/89641050-87a9-420e-96e3-32a7bba4a00d.jpg)

```css
.container {
	grid-template-columns: 1fr 2fr 1fr 1fr 3fr;
}
```

![](https://images.viblo.asia/6b276b89-25c3-4158-ac6e-1d3385f89da9.jpg)

Các bạn muốn bao nhiêu cột thì thêm số lượng tương ứng như sau:

```css
grid-template-columns: [cột_1] [cột_2] [cột_3]... [cột_n];
```

## 3. grid-template-rows
Giống như grid-template-columns nhưng thuộc tính này là chia hàng (row). Các bạn có thể chia các items thành nhiều row tùy vào yêu cầu hoặc để auto cũng được.

## 4. repeat
Ở grid có một hàm rất tiện lợi giúp ta tạo nhiều cột hoặc hàng có giá trị giống nhau.
Ví dụ bạn tạo 1 hàng 5 cột:

Cách cũ:

```css
grid-template-columns: 20% 20% 20% 20% 20%;
```

Cách dùng hàm repeat:

```css
grid-template-columns: repeat(5, 20%); // trong đó 5 là số cột muốn tạo, 20% là độ rộng của cột
```

Bạn có thể lồng như sau để tạo ra 6 cột với bố cục cột đầu và cột cuối có size 10% còn 4 cột giữa có size 20%
```css
grid-template-columns: 10% repeat(4, 20%) 10%;
```

## 5. grid-gap
Thuộc tính này giúp chúng ta tạo khoảng cách giữa các phần tử với nhau theo cột và hàng. Thuộc tính này bao gồm thuộc tính` grid-row-gap` và `grid-column-gap`.
Ví dụ bạn muốn khoảng cách giữa các cột là 20px:
```css
grid-column-gap: 20px;
```
Hoặc bạn muốn khoảng cách giữa các row là 20px:
```css
grid-row-gap: 20px;
```
Còn muốn gom vào cùng một dòng thì ok thôi, nhìn đây:
```css
grid-gap: 20px;
```
Yên tâm là nó sẽ tạo khoảng cách ở giữa các cột và hàng, chứ không lấn ra ngoài như các tiền bối của nó là padding hay margin đâu nhé.

## 6. Tổng kết
#### - Ưu điểm:
+ Dàn layout 2 chiều cả ngang lẫn dọc
 + Dễ control được khoảng cách giữa các items
 + Dễ custom, thiên biến vạn hóa layout với responsive tuyệt vời

#### - Nhược điểm
 + Nhiều browser còn chưa hỗ trợ
 + Chưa được nhiều css library tích hợp
 + Mất nhiều thời gian để tìm hiểu

Qua bài chia sẻ trên mình nghĩ các bạn đã ít nhiều thấy được sự lợi hại của CSS Grid layout tuy nhiên còn khá nhiều sự thú vị từ kỹ thuật này. Các bạn hãy chờ đón phần kế tiếp của mình nhé.

Tham khảo: https://css-tricks.com/snippets/css/complete-guide-grid/