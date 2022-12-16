# Đặt vấn đề
Mình đã nghe rất nhiều người nói "session sẽ mất khi đóng trình duyệt". Đặc biết là khi còn là sinh viên thì câu này là câu "thần chú" khi đi phỏng vấn. Vậy có phải khi đóng trình duyệt thật sự session sẽ mất không ? Và session còn mất trong các trường hợp nào nữa?
> Note: Bài này mình dùng ngôn ngữ php và nginx nhé
# Session là gì?
Một session hay còn gọi là một phiên làm việc. Trong khoa học máy tính, Nó đơn giản là cách giao tiếp giữa client  với server. Một session bắt đầu khi client gửi request đến sever, nó tồn tại xuyên suốt từ trang này đến trang khác trong ứng dụng và chỉ kết thúc khi hết thời gian timeout . Giá trị của session sẽ được lưu trong một tệp tin trên máy chủ.

Khái niệm session chắc không quá xa lạ nữa. Mình muốn làm dõ hơn nữa khái niệm này:

***"Giá trị của session sẽ được lưu trong một tệp tin trên máy chủ"***

**Mình muốn biết  tập tin đó lưu trữ nhưng gì và ở đâu ?**

Mình sẽ tạo ra 1 session và lưu 1 số giá trị vào: 

```php
<?php
session_start();

$_SESSION["color"] = "red";
$_SESSION["color1"] = "yellow";

echo "Session is created";
```

Sau đó mở trình duyệt chrome để chạy. 
![](https://images.viblo.asia/9b0807c7-a680-4616-96d0-137f3719ead6.png)
Vậy là mình đã tạo session thành công.

Thì mặc định session sẽ được lưu `/var/lib/php/session` nhé và chúng ta có thể thay đổi nơi lưu trữ session trong file php.ini

![](https://images.viblo.asia/5b8de0be-5526-4969-88d1-62c9260c4341.png)

Mình thấy có file `sess_qg2vvqet5ft791f4hgc49hcqr8` được tạo ra. thử mở ra xem có gì bên trong nào

![](https://images.viblo.asia/9e884e3c-f3fb-45cf-ba17-11deda5eb356.png)

Vậy là trong file lưu tên và giá trị mà chúng ta vừa set vào còn `s:3` và `s:6` là kiểu dữ liệu và độ dài (String độ dài 3 và String độ dài 6)
# Cách phân biệt session của các trình duyệt khác nhau
* Session khi sinh ra được lưu trên 1 file có tên dài dòng, khó đoán và được tạo ngẫu nhiên là session id trên máy chủ, và đồng thời gửi lại cho client 1 Session cookie (không phải session)  có nội dung (hay giá trị) đúng như session id (để có thể so khớp session nào là của client nào).

> Session cookie (không phải session) khác với cookie thông thường đó là khi đóng trình duyệt thì loại cookie này sẽ mất.

Vậy chúng ta tìm trên trình duyệt chrome xem cookie này như thế nào:
![](https://images.viblo.asia/a2df5ee9-3b0a-44ed-8dbb-df1bf8d61ba1.png)

>  Đối với mỗi ngôn ngữ lập trình web sẽ có tên Session cookie quy định như php là PHPSESSID, jsp là JSESSIONID, … 

Vậy PHPSESSID của trình duyệt này là `qg2vvqet5ft791f4hgc49hcqr8` và nó match đúng với file vừa được tạo ra trên server.

**Để làm dõ hơn thì mình mở bằng trình duyệt firefox** 
![](https://images.viblo.asia/e0c541d0-9d50-4ffd-8b92-083b5d6ae178.png)

Sau khi chạy thì mình thấy trên server có tạo thêm 1 file `sess_su7q6pskehc3nfqiu479p4oqvn`

![](https://images.viblo.asia/44dc1f7f-17bd-4a46-b04f-463b4aba8d8b.png)

Và session cookie của trình duyệt firefox cũng match đúng với file đó.

Vậy dựa vào PHPSESSID đó mà server có thể phân biệt được session nào là của trình duyệt nào.

# Timeout của session
Là khoảng thời gian mà session tồn tại nếu không có request từ client đến server . mặc định là 24 phút .bạn cũng có thể thay đổi khoảng thời gian này phong file php.ini


# Quay lại vấn đề
Dựa vào những thứ tìm được từ bên trên mình sẽ đặt giả thiết thế này cho  hình dung:

* Tủ (session) :file_cabinet:
* Chìa khóa (Session cookie) :old_key:
* Bạn (client) :speak_no_evil:
* người cho thuê tủ (server) :pig:
* Đồ dùng trong tủ (nội dung của session) :cookie:

Qui định : 
* Mỗi chìa khóa chỉ mở được 1 tủ, mỗi tủ có đồ dùng  bên trong. 
* Nếu bạn không quay lại sử dụng tủ thì tủ sẽ bị thi hồi sau 1 khoảng thời gian (do người cho thuê quyết định) kể cả bạn có chìa khóa. :joy::joy:
* Nếu làm mất chìa khóa thì bạn sẽ không sử dụng được tủ.

**Như đã biết thì đóng trình duyệt thì Session cookie sẽ mất.**

Trường hợp này được tưởng tượng như sau:

Người cho thuê tủ cho bạn thuê tủ và đưa cho bạn chìa khóa để sử dụng cái tủ đấy. nhưng vô tình bạn làm mất chìa khóa. Mặc dù vẫn có tủ ở đấy. Và theo quy định bạn không sử dụng tủ trong 1 khoảng thời gian thì tủ sẽ bị thu hồi.

Vậy câu **"session sẽ mất khi đóng trình duyệt"**

Trường hợp này sẽ là:
Tủ sẽ bị thu hồi khi bạn mất chìa khóa. nhưng thật ra bạn mất chìa khóa thì tủ vẫn còn đó. chỉ là do không có chìa khóa bạn không thể sử dụng được tủ và do không sử dụng lên sau 1 khoảng thời gian tủ sẽ bị thu hồi.

# Kết luận
Vậy  ***đóng trình duyệt thì session bị mất***  . Lý do là khi đóng trình duyện thì Session cookie của bạn bị xóa. và vì không có cái Session cookie nữa .lên server không biết bạn là ai còn cái session cũ của bạn thì vẫn còn ở đó. và do sau 1 khoảng thời gian được qui định session ấy không được sử dụng đến vì vậy nó đã bị kill

Qua bài viết này mình muốn làm dõ hơn vì sao đóng trình duyệt thì session bị mất. qua đó cũng hiểu dõ hơn về cớ chế hoạt động của session. 

> Cảm ơn các bạn đã đọc đến đây ạ :heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes: