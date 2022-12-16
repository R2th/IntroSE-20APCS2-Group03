# Giới thiệu
Flexbox là một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.
# Tìm hiểu thuộc tính quan trọng của flexbox
## Thuộc tính cha
### display flex
```
.container {
  display: flex; /* or inline-flex */
}
```
khởi tạo một container có display là flex, sau đó chúng ta có thể sử dụng các thuộc tính tiếp theo để căn chỉnh các đối tượng flex
### flex-direction
chỉ định xem các phần tử bên trong sắp xếp theo chiều nào. có thể chiều ngang, chiều dọc, đảo ngược ....
```
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
![](https://images.viblo.asia/833c21b8-6758-45b4-b6e2-dc86167ea592.png)
### flex-wrap
cho phép các phần tử bên xong xuống dòng hay không, xuống dòng ngược hay xuôi
```
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
![](https://images.viblo.asia/632951e0-d5c0-443b-8a5a-081a4585f4af.png)
### justify-content
sắp xếp các đổi tượng bên trong đối tượng flex như nào. sắp xếp theo chiều ngang
```
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```
![](https://images.viblo.asia/ced948d5-ea3e-4c3d-b129-db6adee2b66c.png)
### align-items
sắp xếp đối tượng bên trong đối tượng flex như nào, sắp xếp theo chiều dọc
```
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
![](https://images.viblo.asia/e97d14ee-b2d6-4476-a0e0-422c5b437657.png)
## Thuộc tính con
### order
Theo mặc định, các mục linh hoạt được đặt trong thứ tự nguồn. Tuy nhiên, thuộc tính order điều khiển thứ tự mà chúng xuất hiện trong vùng chứa flex.
```
.item {
  order: <integer>; /* default is 0 */
}
```
![](https://images.viblo.asia/cbe21e6f-bcd9-4d6e-87fc-bc35a8de0ff5.png)
### flex-grow
Điều này xác định khả năng cho một mục flex phát triển nếu cần thiết. Nó chấp nhận một giá trị đơn vị phục vụ như một tỷ lệ. Nó chỉ ra số lượng không gian có sẵn bên trong thùng chứa linh kiện mà vật phẩm đó phải chịu.
![](https://images.viblo.asia/a4d638fe-6cda-448c-8333-8b75e6da76c9.png)
# Tổng kết
Trên đây là một số ví dụ cơ bản của flexbox, mong mọi người hiểu được thêm một thuộc tính css mới
# Nguồn
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
https://thachpham.com/web-development/html-css/huong-dan-css3-flexbox-toan-tap.html