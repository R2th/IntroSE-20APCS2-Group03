Chào các bạn, như trong tiêu đề đã nói, mình sẽ giới thiệu với các bạn một thuộc tính CSS rất hay và một vài effect có thể viết được từ nó.
## Clip trong CSS là gì?
Thuộc tính Clip trong CSS để khai báo vùng nào trong một element sẽ được hiện ra. Ví dụ ta có một tấm ảnh chân dung, nhưng ta chỉ muốn hiện mỗi mặt người trong đó, thì ta có thể dùng thuộc tính clip. Nói dễ hiểu nó là Crop đó.
*Lưu ý: Thuộc tính clip chỉ khai báo vùng crop hình chữ nhật mà thôi*

Cách sử dụng:
- Thêm position absolute cho element đó **(bắt buộc)**
- Viết cú pháp:
```
clip: auto|shape|initial|inherit;
// auto là mặc định
// shape ở đây là loại hình khối vùng hiển thị, kỳ lạ thay là chỉ có hình chữ nhật, cú pháp là rect(top, right, bottom, left) ... Tại sao lại không có hình khác thì chắc là do mấy ô đấy lười :)) Đùa vậy chứ hình khác mình sẽ nói sau
```
Demo lấy bản mặt thộn của Jon Snow: 
{@embed: https://codepen.io/terry-do/pen/wZyjJG}

## Clip-path là gì?
Là một thuộc tính của SVG, nhưng bạn có thể xài cho element thường thoải mái. Nó giống như clip, nhưng có thể **khai báo vùng clip theo nhiều hình khối khác nhau**.
*Tuy thuộc tính clip thông thường bị **deprecated** nhưng cá nhân mình cho rằng nên dùng clip được ngay khi có thể. 

(Clip hỗ trợ nhiều trình duyệt hơn nhiều, và performance nhanh hơn theo một vài performance test mình thấy trên mạng)

![](https://images.viblo.asia/0faccb93-e575-46b2-a9b3-163534140866.png)

Nhìn cái số trình duyệt clip path hỗ trợ mà phát nản :))*

Cú pháp FULL
```
/* Keyword values */
clip-path: none;

/* <clip-source> values */ 
clip-path: url(resources.svg#c1);

/* <geometry-box> values */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

/* Box and shape values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```

Mình khuyên cái này các bạn nên lên những trang công cụ như https://bennettfeely.com/clippy/ để sử dụng.

## Vậy ứng dụng chúng như thế nào?

Các bạn có thể crop ảnh dễ dàng, giới hạn vùng hiển thị, ... Thậm chí là viết ra những effect khá là thú vị. Mình cũng đã thử áp dụng và viết hiệu ứng *Glass Parallax* bằng CSS (Trông nó hơi ngu ngu tý mà kệ đi :rofl:
Ý tưởng ở đây là: Ta tạo ra bốn cái ảnh.

- Ảnh 1: Ảnh gốc trước khi chuyển
- Ảnh 2: Một lớp ảnh chuyển bị làm mờ, dùng clip để giới hạn chiều dài hiển thị khoảng 2/3
- Ảnh 3: Một lớp ảnh chuyển gốc, sắc nét không chỉnh sửa
- Ảnh 4: Một lớp ảnh chuyển được làm nét (Sharpen), clip để giới hạn chiều dài hiện thị khoảng 1/4

Khi chạy hiệu ứng: 
- Ảnh 1 và ảnh 2 trượt sang phải cùng lúc
- Ảnh 3 sẽ trượt ngay sau khi ảnh 2 trượt được 1 thời gian ngắn
- Ảnh 4 sẽ trượt khi ảnh 3 gần trượt xong với tốc độ nhanh

{@embed: https://codepen.io/terry-do/pen/jRzreE}

Ngoài ra còn các hiệu ứng khác như *Glitch Text* các bạn có thể tham khảo:

{@embed: https://codepen.io/cipherbeta/pen/YLdVjw}

## Lời kết
Qua bài trên hi vọng mình đã mang đến cho các bạn nhiều thứ mới mẻ, một công cụ đắc lực cho công cuộc mang đến khách hàng những trang web thật "chất". 
Cảm ơn các bạn đã đọc!