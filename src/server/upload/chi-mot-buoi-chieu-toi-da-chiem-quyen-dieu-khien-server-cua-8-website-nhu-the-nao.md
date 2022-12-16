Xin chào, xin chào các bạn.
Lâu lâu lâu lắm rồi mình mới có thời gian để viết bài, vì bận quá (thực ra là vì lười quá).

Chuyện là gần đây mình có hay lượn lờ đọc mấy bài về lập trình web (lại là câu chuyện về web đấy các bạn). Thì mình cũng chiếm được cái server nho nhỏ của 1 website (Tại sao tiêu đề là 8 mà đây mình lại ghi là 1, thì xem hồi sau sẽ rõ).

`Mình đã xin phép bên kia rồi mới viết bài nhé` Nhưng để giữ bí mật cho họ thì mình sẽ che tên web cũng như các thông tin nhạy cảm nhé, từ giờ mình sẽ dùng domain web đó là `https://xxxx.com` nha.

# Dạo chơi vớ phải bug

Mình có lên 1 vài trang đọc về lập trình thì vô tình vớ được 1 trang web của 1 bên dạy lập trình, thì mình cũng dạo xem họ có khóa gì thú vị không.

Mình truy cập vào `https://xxxx.com`, dạo một vòng. Đang dạo thì mình dừng lại chuột phải inspect thử 1 cái ảnh xem đường dẫn ảnh như nào. Thực ra là bệnh nghề nghiệp.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.43.42.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.43.42.png)

Tôi thử truy cập vào `https://portal.xxxx.com` xem thử nó là cái gì nha, nhìn cũng có vẻ được đấy. Nhưng khi truy cập vào thì nó yêu đầu đăng nhập.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-15_at_13.23.37.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-15_at_13.23.37.png)

Đến đây tôi tự hỏi: `Có cách nào đăng nhập được vào không ta, đăng nhập vào không biết có gì ha?` Những câu tự hỏi đó làm tôi càng tò mò hơn, quyết định tìm cách đăng nhập được vào trang này.

Mình thấy có đường dẫn ảnh lúc nãy là như này:
```
https://portal.xxxx.com/laravel-filemanager/photos/shares/Course/1_y6C4nSvy2Woe0m7bWEn4BA.png
```

Truy cập thử xem nào. À ha, trả về cái ảnh là đúng rồi nè.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.48.22.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.48.22.png)

Tuy nhiên tính tò mò nên tôi thử sửa đổi URL đi một tý, đó mà tôi lược bỏ tên file ảnh đi, nó chỉ còn vầy thôi `https://portal.xxxx.com/laravel-filemanager/photos/shares/Course/`

Thì ôi thôi, một tuyệt tác như vầy:

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.36.45.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.36.45.png)

Vậy là tôi đã có thông tin:

- Web dùng laravel
- Không tắt đi debug
- Vì không tắt DEBUG nên config gì của laravel là biết tuốt, biết tuốt

Thế thì như đã nói là website này bật DEBUG mode nên là show hết các thông tin cấu hình của web rồi: Thông tin truy cập database, các auth key của các dịch vụ nó dùng, ip thật, APP_KEY ... (Trong này có cái APP_KEY, tý tui sẽ biểu diễn đường quyền sau nha)

Database họ dùng tài khoản root luôn
`Thế là dở rồi bạn ơi, môi trường production mà không tắt DEBUG, lại dùng tài khoản root cho database là dở rồi` 

⇒ Đến đây, database connect được rồi, user của database là root rồi, thì đoạn này lợi dụng mysql để RCE vẫn là ok rồi, có điều như đã nói: `Trong nhiều trường hợp, sẽ không có chuyện may mắn như thế này, nên tôi vẫn đi tìm vector tấn công khác ngon hơn mà không cần dựa vào may mắn.`

# Khám phá thử database

Có Thông tin database thì tôi vào xem thế nào nha, thú vị nha.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.40.52.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.40.52.png)

Gòy xong luôn =)) 

`Count nhẹ cái database của portal thì cũng có trên 1200 tài khoản học viên đấy, là đông đấy, không ít đâu`

Trừ cái database `information_schema` và `mysql` của mysql ra thì trên này tôi đếm được 8 cái database của 8 cái website khác nhau các ông ạ, ác dữ vậy.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.57.58.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_18.57.58.png)

Rồi, giờ đến lúc biểu diễn đường quyền với `APP_KEY` có nhắc phía trên này. Vì tôi từng lập trình laravel, nên tôi biết nó dùng APP_KEY để làm KEY cho các hàm hash password của nó, vậy thì thử tạo cái hash password xem nào.

# Tạo password bypass authen truy cập vào xem ứng dụng dư lào.

(update: Phần này mình làm cho nó nguy hiểm thôi, chứ đoạn hay phía sau nhé, vì sau khi push bài lên mình nhận ra hình như hashpassword không cần APP_KEY =)) Thế thì tìm salt rounds cũng được, nhưng cứ thử thôi, vì thường mấy bạn code laravel toàn để mặc định không à, nên làm như tui cách dưới cũng không sai trong trường hợp này đâu nhé ) 

Tạo một project laravel để test.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.06.01.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.06.01.png)

Sau khi tạo xong project thì vứt cái APP_KEY vô file .env

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.08.32.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.08.32.png)

Rồi tạo hash password thôi nào

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.10.08.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.10.08.png)

Chạy lên xem để lấy hash nha.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.12.22.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.12.22.png)

Đấy, các bạn thấy có OK không ạ? Hơi ngu hơi thủ công nhỉ :v nhưng làm cho vui nên làm thế thôi.

Bây giờ thì cầm cái hash đó thay vào một user bất kỳ trong database nha, nhưng mà để cho không bị lộ thì mình tìm cái user nào mà từ lâu rồi không login ý.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_13.40.51.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_13.40.51.png)

Thứ 1: Đổi password hash trong database

Thứ 2: là chuyển cái trường check_lock_account về 0

Bây giờ có tài khoản rồi đó, tài khoản là email mà mình đổi hash password, còn mật khẩu là `123456`.

Thử đăng nhập vào portal nào, xem nào, xem nào. Hồi hộp quá.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.18.24.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.18.24.png)

⇒ OK rồi nhá, đăng nhập được rồi nhá, easy chưa. Đây vẫn là cú bypass ngu người dựa vào may mắn bên trên (Tôi viết cho có nội dung thôi, chứ hồi sau mới thực sự hấp dẫn nha). Đó chỉ là tôi thử để xem database họ lưu trữ cái gì thôi. Thực ra tôi có cách bypass authen ngon hơn ở phía dưới. Tiếp tục đọc bài viết, hồi sau sẽ rõ.

# Có được account đăng nhập dễ dàng hơn.

`Mình thật sự ngu ngốc, bypass thôi cũng làm ngu. hahaha`

Thực ra thì trong cuộc sống ít khi mà hên gặp cái server nào nó để DEBUG thế lắm, nên việc chỉnh sửa trong database nó là case hiếm hoi. Nhưng mình có cách khác để có account dễ hơn.

Sau một hồi dạo quanh quẩn ở [https://xxxx.com](https://xxxx.com) thì mình phát hiện web này có chức năng đăng ký khóa học, mà khi đăng ký xong nếu tài khoản chưa tồn tại trên hệ thống thì nó tự tạo tài khoản cho mình và mật khẩu được gửi vào mail, thế thì mình đăng ký thử nha.

Đăng ký khóa học để xem nha.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.09.44.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.09.44.png)

Đăng ký thành công này, và chờ mail gửi về này.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.10.40.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.10.40.png)

Mail gửi về cho mình tài password đăng nhập nè. OK, vậy là đã có tài khoản đăng nhập này,

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.25.07.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.25.07.png)

Đó, đó, Easy chưaaaaaa?

# Upload shell

Có được tài khoản đăng nhập rồi, giờ thì lượn lờ web xem như nào, thì mình hứng thú với chức năng upload file trong `Cài đặt tài Khoản`

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.15.39.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.15.39.png)

Thử upload 1 file không phải là ảnh thì nhận được thông báo lỗi

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.25.40.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_15.25.40.png)

Ok, ok, giờ bật Burpsuite lên và thực hiện upload file lại xem. Thử 1 file đúng các định dạng trên thì thành công.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.30.12.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.30.12.png)

Bây giờ thử upload shell lên thử nha, web kia là php-laravel nên mình làm tý shell là php nha, chuyển Burpsuite qua repeater nào.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.31.24.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.31.24.png)

Á kìa, vẫn thành công - tức là không filter phía server. Thiệt luôn á, mấy ông tõi code website này lười thiệt chứ, đã lỡ filter client rồi thì filter luôn server đi cho nó có đôi có cặp, như này là hỏng cả bánh kẹo rồi. Server nó trả về thành công thì coi như tôi cũng thành công 85% các ông ạ =))

Thử quay lại browser xem avatar chứ hả =))

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.32.51.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.32.51.png)

Image Avatar nó load lên bị lỗi này mấy má ơi, inspect lên xem nha.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.33.31.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.33.31.png)

WOW, see, see, you see? Còn gì nữa đâu mà khóc với sâu, thử truy cập vào đường dẫn thử xem.

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.48.01.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.48.01.png)

Đã bảo là không `Còn gì nữa đâu mà khóc với sầu`. Shell lên và thực thi được đây rồi thây =))

# Đao to búa lớn với reverseshell

Thì giờ thực thi command trên browser bất tiện nên là reverseshell nó về máy cho nó dễ thao tác.

Kiếm con server có ip public nhé. `Nc` cho nó port 8001 nè

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.50.58.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.50.58.png)

Tạo cái payload này

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.38.14.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_19.38.14.png)

Chạy cái payload này

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.49.32.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.49.32.png)

Nhận cái shell về nè

![https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.52.43.png](https://manhnv.com/images/posts/hacking/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/Screen_Shot_2021-01-14_at_14.52.43.png)

Sau khi reverseshell về được rồi, thì mình thử dùng `Linpeas` để scan xem có vector nào `Privilege Escalation` lên root được trên server này không.

(link đây: [https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS))

Thì ta nói, nó vô vàn cách để lên `root` từ con server này các ông ạ, khoan nói về các cách phức tạp thì cũng thấy đập vào mắt luôn là quả server kernel version cũ, có đầy exploit trên [`https://www.exploit-db.com/`](https://www.exploit-db.com/).

Giờ thì server này là của mình, nghịch thôi, phá thôi.

`ĐÙA ĐẤY, report cho bên họ thôi`

Ơ thế thì cũng chỉ mới 1 website thôi, lấy đâu ra 8 website?

`Thì thật ra có đoạn tôi quên kể là khi tôi reverseshell về rồi đó, tôi thử ls cái folder /var/www/html ra xem như nào, thì nó có tận 8 cái website trên đó mà những web đó đều đang chạy cả, có 1 số 8 website đó là trang quản lý task của công tý đó luôn, nhưng thôi tôi lương thiện mà, nên dừng ở đây report cho họ là được rồi`

# Kết luận

Nói chút qua timeline.

- Chiều 13/01/2021 (dương lịch): Tìm ra lỗi.
- Cũng trong chiều hôm ấy 13/01/2021: Viết report và gửi cho bên quản lý website
- Và chỉ hôm sau thôi (14/01/2021): Bên kia liên lạc lại với mình để confirm lỗi.
- Ngày 15/01/2021: Họ xác nhận đã fix xong lỗi, nhờ mình kiểm tra hộ có còn tồn tại lỗi không và mình có nhân tiện đó xin phép viết bài writeup luôn cho vui.
- ... Đấy sự kiện tiếp theo thì thôi khỏi kể nha 😋

Cuộc sống nhiều khi vô tình và đưa ta đến những điều thú vị, và bài viết này là một ví dụ như thế: `Tôi vô tình chiếm được website trên mạng nên mới vô tình viết bài này chứ không tôi ở ẩn vài năm nữa các bạn ạ =)) Lạnh cóng tay, nên lười lắm.`

Qua bài này thì cũng cảnh báo cho các bạn lập trình viên cũng như quản trị server vài thứ luôn nhé:

- Trên môi trường production thì đừng có mã lỡ tay bật DEBUG lên
- Tài khoản database thì nên tạo một tài khoản hạn chế quyền dành riêng cho từng ứng dụng web khác nhau, đừng mang ông `root` ra mà chạy như thế.
- Các bạn lập trình thì filter cẩn thận vào,  filter mỗi client thôi thì chỉ đánh lừa được người dùng bình thường thôi, gặp mấy ô thích chọc ngoáy là dở đấy.
- Nên nâng version kernel server thường xuyên đi nha, và bớt chạy các service dưới quyền root đi.
- ... Nhiều điều còn muốn nói lắm, cơ mà cái thói lười nó lại đến, nên thôi nhé.

======> Chiếm cái server này nó còn dễ hơn là chơi mấy bài CTF nữa

Cuối cùng, cảm ơn tất cả các bạn đã bỏ thời gian đọc bài viết của mình. Đợt này mình sẽ quay trở lại để viết blog, và mình có một series về OSWE có vẻ cũng hay. Hãy chờ đợi series học OSWE của mình sắp tới nhá, chắc chắn sẽ trước tết nè.
Các bạn nhớ theo dõi https://manhnv.com của mình để đọc thêm nhiều bài hay trong thời gian tới nha.


[update] - Các bác đọc bài thấy hay, share lên facebook bài này kèm hashtag này cho em với nhé: #Vui_Tet_Viblo_Tram_Tro_Keycap

Bài gốc: https://manhnv.com/2021/01/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao/

⇒ Các bạn đọc thấy hữu ích có thể lì xì mình tại đây ạ: https://manhnv.com/donate.html