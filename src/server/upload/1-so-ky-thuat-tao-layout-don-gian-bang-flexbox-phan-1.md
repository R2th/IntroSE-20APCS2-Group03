### Giới thiệu
Thời buổi hiện nay khi việc yêu cầu đáp ứng chỉ trên các trình duyệt hiện đại thì cách tạo  layout bằng những kỹ thuật cũ đã quá lỗi thời thì thì với Flexbox hay Grid chúng ta tiết kiệm cả về thời gian lẫn số dòng code để có thể tạo ra layout như ý muốn. Trong bài này xin được chia sẻ 1 số kỹ thuật nho nhỏ tạo layout bằng Flexbox rất nhanh và đơn giản.![](https://images.viblo.asia/77394fab-c52e-4720-a063-520666253693.png)

### Flexbox Technique
Trước tiên chúng ta có HTML là các div tương ứng với box nhé.
```HTML
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</div>
```
**1. Stretch all, fixed spacing**<br>
 Đây là cách làm các box dàn đều ra khít với width của div cha của của các box. Cần cho class cha của các box là display: flex và flex-grow lớn hơn 0 và margin để căn đều bên trái là 2%, chỉ có cái box đầu là ko có margin.

```CSS
.container {
  display: flex;
}

.item {
  flex-grow: 1;
  height: 100px;
}

.item + .item {
  margin-left: 2%;
}
```
![](https://images.viblo.asia/9ed4e0ff-35cf-44a2-9ef3-5b19a5b1dd2c.png)


**2. Stretch middle, fixed spacing**<br>
Cách viết này dùng để dàn trải layout phụ thuộc vào độ rộng của box được set cố định và độ rộng còn lại sẽ dàn đều và box ở giữa để cân đối khoảng cách giữa các box. Ở đây sẽ set cho 2 box trái phải 100px.

```CSS
.container {
  display: flex;
}

.item {
  height: 100px;
  width: 100px; /* A fixed width as the default */
}

.item-center { 
  flex-grow: 1; /* Set the middle element to grow and stretch */
}

.item + .item { 
  margin-left: 2%; 
}
```
![](https://images.viblo.asia/3c741664-4e12-43ed-a6a4-fc53abb21d99.png)

**3. Alternating grid**<br>
Đây là layout tạo theo kiểu grid đối xứng bằng nhau về độ rộng cũng như full toàn bộ layout. Cần sét dóng đều trái phải với justify-content: space-between và tự động đẩy xuống dòng với flex-wrap. Để có cái box full 100% width thế kia ta dùng nth-child set cho mỗi cái 3 với cách tính theo số lẻ là 3n.
```CSS
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 48%;
  height: 100px;
  margin-bottom: 2%;
}

.item:nth-child(3n) {
  width: 100%;
}
```
![](https://images.viblo.asia/e98e748e-bf5b-4b18-9a7d-5f5b031dea63.png)

**4. Grid**<br>
Đây là 1 layout thường thấy trong các list item được bố trí bằng nhau cả chiều cao lẫn chiều rộng rồi khoảng cách. Mỗi box ta set width tương đối là 32% rồi, còn khoảng cách giữa cách box ở bottom là 2%. Hoặc theo công thức tổng - % width tương đối nhân số row rồi tất cả chia khoảng các box vs mép trái.
```CSS
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  flex: 0 32%;
  height: 100px;
  margin-bottom: 2%; /* (100-32*3)/2 */
}
```
![](https://images.viblo.asia/0b0d5a90-b85b-4c57-82ca-4058e0d72e83.png)

**5. grid, tỉ lệ (1:1)**<br>
Ở grid này chúng ta sẽ sét width và padding giữa các box và position relative tạo sự cân đối giữa các box.
```CSS
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 32%;
  padding-bottom: 32%; /* Same as width, sets height */
  margin-bottom: 2%; /* (100-32*3)/2 */
  position: relative;
}
```
![](https://images.viblo.asia/c85d4e7e-7f34-4fcf-b509-b6cc0cf020a4.png)


### Lời kết
 Hi vọng 1 số kỹ thuật về Flexbox nho nhỏ sẽ giúp cho các bạn đang tìm hiểu về Flexbox có thêm kiến thức để tạo layout nhanh nhất có thể theo ý muốn. Phần 2 sẽ là 5 kỹ thuật tạo layout bằng Flexbox theo các kiểu khác nhau. Cảm ơn mọi người đã đọc bài!