![image.png](https://images.viblo.asia/ef96d75b-f39f-498a-8391-4de743f39114.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊. 
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Tiếp tục tìm hiểu thêm một số Tips sử dụng Chrome DevTools nào.

Bạn nào chưa xem bài trước thì tham khảo tại đây nhé:
* [Part 1](https://viblo.asia/p/blog63-meo-su-dung-chrome-devtools-part-1-series-bi-kip-javascript-phan-46-MkNLrOD8VgA)

# Resend XHR request
Ae nào mà là Front-end Dev thì quá quen với `XHR request` rồi đúng không. Trong một số trường hợp chúng ta muốn gửi lại `XHR request`, thường thì ae Junior hay `F5` để refresh lại trang hoặc là thực hiện lại follow tương ứng để gửi lại `XHR request`. Cách này vừa rắc rồi và cồng kềnh.

Thay vào đó ae hãy thực hiện các bước sau:
* Vào `Network Panel`
* chọn `XHR request` mà ae muốn resend
* click chụt phải
* chọn `Relay XHR`

![image.png](https://images.viblo.asia/b53cdb49-8ab9-4691-b22d-bcf49e483159.png)

# Theo dõi trạng thái tải trang
Nếu các bạn muốn theo dõi trạng thái của trang thay đổi như thế nào khi load trang. Thì đây chính là một cách cực kỳ hay để các bạn Tracking quá trình đó.

Các bước thức hiện như sau:
* Vào `Network Panel`
* chọn `Capture screenshot` (Nếu ko thấy thì ae nhấn vào biểu tượng setting ở góc phải bàn mình dưới dấu `X`
* Refesh lại trang
=> Các bạn sẽ nhận được 1 list cách screenshot quá trình tải trang. Điểm đặc biệt là khi click vào từng hình thì nó sẽ hiện các `request` tương ứng. (Y như redux devtool vậy đó)

![Screenshot 2022-12-14 at 00.06.05.png](https://images.viblo.asia/46db0151-9cc5-4c57-9374-b4a234916a60.png)

![Screenshot 2022-12-14 at 00.10.40.png](https://images.viblo.asia/cef387e1-8b33-4650-a59e-80e223c378e1.png)

![Recording 2022-12-14 at 00.43.47.gif](https://images.viblo.asia/c17853df-4ee0-4137-a401-0d9528973a6d.gif)

# Copy Variables

Sử dụng hàm copy giá trị của một biến biến từ console vào bộ nhớ Clipboard.
Cái này rất tiện khi bạn muốn copy giá trị của một biến khi nó được in ra console. 

Ví dụ khi các bạn thực hiện lệnh `copy($_)` ([`$_` đã được mình nói đến ở bài trược nó refer tới giá trị được thực thi cuối cùng](https://viblo.asia/p/blog63-meo-su-dung-chrome-devtools-part-1-series-bi-kip-javascript-phan-46-MkNLrOD8VgA))
=> Clipboard hiện tại sẽ là: `{name: 'Tuan'}`

![Recording 2022-12-14 at 00.35.11.gif](https://images.viblo.asia/9d02623f-393c-4b6e-93a5-eacd249883a2.gif)

Một ví dụ khác bạn muộn thực hiện copy `location` hiện tại chẳng hạn. 

![Recording 2022-12-14 at 00.30.40.gif](https://images.viblo.asia/af598f4e-8f86-4eca-9b56-836323ee708d.gif)

# Kết luận
Chuỗi bài về các mẹo sử dụng Chrome DevTools còn rất dài nên hôm này dừng lại đây thôi. Hẹn các bạn ở bài hướng dẫn tiếp theo nhé.

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/12/blog64-meo-su-dung-chrome-devtools-part.html