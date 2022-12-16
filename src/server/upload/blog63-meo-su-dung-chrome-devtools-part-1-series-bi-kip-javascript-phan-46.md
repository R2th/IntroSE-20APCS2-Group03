![image.png](https://images.viblo.asia/25cc2938-ace3-48e1-af20-a82bcf589581.png)

Ok như thường lệ lại là mình Tuấn đây,

Hôm nay OT sấp mặt, giờ cũng khuya rồi nên mình cùng nhau lướt nhanh qua một số Tips sử dụng Chrome DevTools nhé.
# Chụp màn hình
AE nào đang làm Outsourcing cho FPT, Rikkei,... các kiểu! 1 ngày chụp cả trăm bức evidence thì đây đúng là Típ hay. (Tất nhiên có ae nhiều ae đang xài tool nhưng sao mà ngầu bằng Chrome DevTools được 😂... `Cmd + shift + P gõ cạch cạch enter` là xong)

## Chức năng chụp toàn màn hình 
Mở DevTools máy Mac thì click chuột phải chọn `Inspect`

![Screenshot 2022-12-12 at 23.30.34.png](https://images.viblo.asia/8aa62cb2-40f5-4a84-b728-b5b5d972f978.png)

Tiếp theo góc bên trái chọn 3 chấm sau đó chọn Run command
(Hoặc nhấn tổ hợp phím: Cmd + shift + P)

![Screenshot 2022-12-12 at 23.30.17.png](https://images.viblo.asia/34bd4f06-1aac-49f5-b894-b04dbd93c3f3.png)

Gõ chứ 'screen' nó sẽ hiện một số chức năng như sau
Chọn chức năng `Capture full size screenshot`

![Screenshot 2022-12-12 at 23.33.44.png](https://images.viblo.asia/aa47e2ca-0ae3-4029-abc8-219e8efda91a.png)

Kết quả sẽ như hình bên dưới

![viblo.asia_u_Clarence161095 (3).png](https://images.viblo.asia/d247623c-2d21-4cb3-aa29-83639d6d12df.png)

## Chức năng chụp một Element bất kỳ 
Tại `Elements Panel` chọn vào Element bạn muốn chụp
Ở đây mình muộn chụp thẻ  `<header>` mình click chọn vào nó 

![Screenshot 2022-12-12 at 23.35.35.png](https://images.viblo.asia/6a9e67e9-1e28-4d28-b637-f609e1865673.png)

Sau mở Run command hoặc nhấn phím tắt `Cmd + shift + P` gõ 'screen'

![Screenshot 2022-12-12 at 23.38.15.png](https://images.viblo.asia/14d30961-61ab-479b-9015-a54d73c17633.png)

Chọn vào `Capture node screenshot` -> ta da đây chính là kết quả

![Capture node screenshot](https://images.viblo.asia/64f1400e-1afb-4850-b409-18a82cc1a85f.png)

## Tương tự thì Run Comand có rất nhiều hàm có sẵn hay ho 
Phần này ae tự khám phá nhé nhiều lắm...

# Tham chiếu tới một biến trong `console panel`
Ngồi buồn buồn dùng `console` tính toán xem tiền bạc cuối năm thế nào....
Giới thiệu ae một biến magic: `$_` nó tham chiếu tới kết quả chuối cùng của ae

![Screenshot 2022-12-12 at 23.50.54.png](https://images.viblo.asia/14f78211-2fa2-42b9-8bb4-486b361f9282.png)

Thử một ví dụ khác xem nào:

![Screenshot 2022-12-12 at 23.54.46.png](https://images.viblo.asia/d45bb23e-fccd-4f41-9027-9d222d22e9b7.png)

Tất nhiên là nó có thể refer tới bất cứ thứ gì chúng ta mới thực thi. Điều này có nghĩa có sẽ là kết quả excute cuối cùng của callStack (maybe 🤣)

![Screenshot 2022-12-13 at 00.08.13.png](https://images.viblo.asia/da093c77-d94f-465b-8270-2444e65e00e1.png)

# Kết luận
Chuỗi bài về các mẹo sử dụng Chrome DevTools còn rất dài nên hôm này dừng lại đây thôi.

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/12/blog63-meo-su-dung-chrome-devtools-part.html