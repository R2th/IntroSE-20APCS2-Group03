## Giới thiệu
Các bạn làm frontend chắc chắn đã gặp những design selectbox dạng dropdown khác với UI mặc định của trình duyệt.
Để đáp ứng thì css là không đủ trong nhiều trường hợp, mình sẽ giới thiệu cách custom = jquery :joy_cat:

![](https://images.viblo.asia/752bf095-d876-4598-9053-47947ee5695c.png)


## Lý thuyết
Nguyên lý rất đơn giản, mình sẽ ẩn cái select mặc định đi = css,
sau đó vẽ 1 cái UI dạng form input (mask) để hiển thị value selected, và vẽ 1 cái ul li là dropdown các option của select.
Khi click vào form input mask, dùng jquery để show dropdown options, khi select options thì đóng dropdown đồng thời set value cho select thật + hiển thị value lên input mask.

## Code

{@embed: https://codepen.io/dfly24s/pen/mdrMxOp}