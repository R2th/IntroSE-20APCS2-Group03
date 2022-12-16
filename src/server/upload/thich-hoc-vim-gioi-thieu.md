{@embed: https://youtu.be/JZiPLCs8sv8}
#   Lời nói đầu
 Từ thời cổ đại xa xưa, khi mà code còn được viết trên đá và phải compile bằng đầu thì con người luôn có khát khao để có thể viết code nhanh hơn. Và đó là lí do một trong những editor nổi tiếng nhất hiện tại được ra đời, vi. Trước tiên, chúng ta không đọc nó là Vy hay là Vi, cũng không phải là số 6 la mã, chúng ta đọc nó là `vi ai`. Khi bạn cảm thấy mình thao tác chậm thì dùng vi i, cảm thấy editor mình đang dùng quá nặng nề thì dùng vi i, cảm thấy không muốn rời tay ra khỏi bàn phím thì dùng vi i.
 #  Vào thế giới VIM và thoát ra một cách an toàn
Xin phép là trong bài viết này mình sẽ dùng VIM luôn nhé, cho nó nghệ nghệ. VIM viết tắt là vi improved, là một bản xịn sò hơn của vi, không phải nước tẩy rửa bồn cầu đâu nhé. Để mở VIM, chúng ta mở terminal lên (khuyến khích dùng linux hoặc macos nhé), gõ vim.
![image.png](https://images.viblo.asia/3b19ce18-6f2d-4c28-91ca-202bbd9d1a27.png)

Chúc mừng bạn đã bước vào thế giới của VIM. Tuy nhiên, đã có hàng ngàn, hàng triệu, hàng chục triệu, hàng trăm triệu con người bước vào thế giới VIM và họ không bao giờ bước ra được, không bao giờ, vì vậy, câu lệnh đầu tiên chúng ta cần biết đó là thoát khỏi thế giới VIM. Đừng như anh chai phía dưới
![image.png](https://images.viblo.asia/2c753b13-1bd5-415d-94f9-d925b886f6c3.png)
 
 Để thoát ra khỏi VIM, bấm `ESC`, gõ `:q!`  rồi `Enter` hoặc bấm `ESC` rồi bấm `ZZ`.
![image.png](https://images.viblo.asia/c5963f17-1041-4514-a03a-125abf155b42.png)
  # Lưu file
 Các bạn mở VIM ra như khi nãy bằng command `vim`. Sau khi VIM được mở ra, chúng ta sẽ gõ `:w filename`, lưu ý filename sẽ là tên file mà chúng ta cần lưu. 
  ![image.png](https://images.viblo.asia/6e2cac2d-b617-41d5-9a55-6f555c5e8fca.png) 
  
  Còn 1 cách nữa đó là khi mở VIM, các bạn thêm tên file luôn, ví dụ `vim filename`, sau khi mở được màn hình chào, các bạn sẽ gõ command `:w`, như vậy chúng ta đã lưu được 1 file từ VIM. Nếu muốn lưu xong thoát ra luôn thì dùng `:wq`.
  
  ![image.png](https://images.viblo.asia/1e7042cb-f118-49e9-8390-52822f06dc6e.png)
  
  ![image.png](https://images.viblo.asia/a660aba6-a4b9-4a42-9311-ad03630f5b44.png)
  # Những dòng code đầu tiên
Ok, tới giờ là ngon lành cành đào rồi. Chúng ta đã biết cách mở vim, lưu file và thoát ra khỏi VIM. Giờ thì viết vài dòng code trong VIM cho nó nghệ nghệ. Đầu tiên mở vim `vim`. Tiếp theo các bạn nhấn phím `i` trên bàn phím để vào `Insert Mode` còn `Insert Mode` là cái gì thì mình sẽ giải thích sau. Sau đó các bạn có thể tự do gõ những gì mình thích ví dụ như đây là dòng code tìm ra người đep trai nhất quả đất.
```
<?php
echo 'LKP' . PHP_EOL;
```
![image.png](https://images.viblo.asia/f2b03809-d4e7-49d4-8f94-8d297794ab93.png)

Sau đó các bạn gõ lệnh `:wq filename` trong trường hợp này filename của mình là `index.php`.  Như vậy, với `:wq index.php`, chúng ta vừa mới lưu file với tên là index.php và đồng thời thoát ra khỏi VIM, không muốn thoát thì đừng thêm q vào nhé. Giờ mình sẽ thử chạy file này bằng lệnh `php index.php`.

![image.png](https://images.viblo.asia/3f29e204-2085-41da-883b-e38ca9a50d25.png)
Ở bên dưới là kết quả in ra ai là người đẹp trai nhất thế giới.
# Kết
Mình nghĩ hôm nay vậy là đủ rồi. Chúng ta đã lấn ngón chân cái vào trong thế giới VIM, biết cách tạo file, lưu file, gõ text vào file và thoát ra khỏi VIM. Bài sau, chúng ta sẽ tiếp tục tìm hiểu nhiều hơn về VIM nữa nhé. Chúc các bạn vui khi dùng VIM.