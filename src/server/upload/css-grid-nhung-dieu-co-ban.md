*Các website hiện nay phần lớn đều được thiết kế để hổ trở hiển thị tốt trên tất cả các thiết bị từ Mobile, Tablet, Laptop, và PC (Responsive). 
Bài viết này giới thiệu cơ bản cách tạo Responsiveness Grid (dạng lưới) sử dụng CSS Grid thay cho @media với các class name làm HTML trở nên rối rắm.
Bắt đầu thiết lập grid ( level up by step nhé =]]] )
*

### Responsive Grid cơ bản
Thuộc tính grid-template-columns: định nghĩa cột, chiều rộng cột
và grid-template-rows: định nghĩa dòng, chiều cao dòng
HTML: 
```
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

CSS
```
/* 3 cột 2 hàng*/
.wrapper {
  display: grid;
  grid-template-columns: 100px 100px 100px; 
  grid-template-rows: 80px 50px;
}
```
![](https://images.viblo.asia/efa87ac5-fc8f-4c5b-b641-949d8e12cead.png)

```
/* 2 cột 3 hàng */
.wrapper {
  display: grid;
  grid-template-columns: 100px 200px;
  grid-template-rows: 80px 60px 40px;
}
```

![](https://images.viblo.asia/edd76c04-30fc-435a-9273-cab3d6b3ada0.png)


### Resonsive Grid với fraction unit (fr)
The fr unit là một khái niệm giúp bạn chia nhỏ grid ra thành nhiều phần (fraction unit) mỗi phần nó sẽ có tỉ lệ tương đối với grid wrapper theo ý muốn của bạn. Nó làm cho các cột của bạn respoinsive.
```
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 80px 60px 40px;
}
```
![](https://images.viblo.asia/9c93ca50-794e-42da-ac01-ee5eca30b789.png)

Sử dụng fr thay cho px giúp chúng ta tùy biến hơn trong việc chia độ rộng của cột , nó chia toàn bộ chiều rộng wrapper thành các fraction (bao nhiêu fractions thì tùy bạn muốn) ví dụ
grid-template-columns: 1fr 2fr nghĩa là wrapper được chia thành 3 fractions trong đó cột 1 chiến 1fr và cột 2 chiếm 2fr.


### Responsive Grid nâng cao với repeat(),  auto-fit, minmax()
Với những ví dụ trên chúng ta có thể responsive ok rồi, tuy nhiên thì nó vẫn còn nhiều thứ ko đáp ứng được yêu cầu. Bây giờ nâng cao hơn xíu để hoàn thiện hơn nhé.

**Liệt kê cột với repeat()**
Ví dụ Grid của bạn có 5 cột bằng nhau thay vì phải viết:  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
ta có thể viết gọn như này:  grid-template-columns: repeat(5,  1fr);
repeat() cũng có thể dung cho 1 phần của danh sách cột
ví dụ: chia 5 cột, cột đầu và 2 cột cuối 5px, 2 cột ở giữa sẽ là 1fr
```
.wrapper {
  display: grid;
  grid-template-columns: 50px repeat(2, 1fr) 50px 50px;
  grid-template-rows: 80px 60px 40px;
}
```
![](https://images.viblo.asia/5390a5a0-106f-4352-9c54-6eabf8f0c411.png)

**Sử dụng auto-fit để thay thế số cột cố định**
Sử dụng auto-fit phải đi kèm với chiều rộng cố định chứ ko thể dung với fraction.
```
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-template-rows: repeat(2, 100px);
}
```
![](https://images.viblo.asia/d4d8a0db-363b-4de3-8d9b-2a9c46667a21.png)

**Tùy chỉnh kích thước với minmax()**
Ok bây giờ ta khắc phục vấn đề trên bằng cách thêm minmax() function kết hợp với fraction và auto thay cho việc gán cứng kích thước chiều rộng chiều cao với pixel.
Note: với row kết hợp với minmax() thì dùng grid-auto-rows thay cho grid-template-rows
```
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: minmax(100px, auto);
}
```
![](https://images.viblo.asia/d74788fb-2991-441f-a9b5-c2e2010f9f52.png)

Và việc kết hợp với auto-fit cho ra kết quả như bên trên, các grid item luôn tự động dàn trải để fit full với chiều rộng của wrapper

Bài viết này cho bạn cái nhìn đầu tiên về CSS Grid, thứ theo mình rất hay cho việc bố cục trang web nhanh, gọn, tiện lợi.