Hôm nay, nhân tiện có task research **call API** bằng thằng **AFNetworking** bên **Objective C**, lướt qua thấy một số kĩ thuật ***giao tiếp (Client / Server)*** mới. 

Đọc ra mới thấy có Library AFRocketClient sử dụng (Server sent event), rồi thì là HTTP Polling, Long Polling
Đúng là đụng vào cái nào cũng brand new, nên có tìm hiểu đôi chút, viết bài này chia sẻ chút kiến thức nhỏ nhoi.

-----

Funny Pic

![](https://images.viblo.asia/b14ba9e9-b6c5-47c3-aac0-9e5e3faa8a7f.jpg)

Do chưa bắt tay code thực tế, nên mình chỉ chú trọng vào bản chất, không có code ví dụ, mong anh em thông cảm.

-----

### 1. HTTP Regular - Kiểu truyền thống (anh hỏi thì em thưa).

Đối với HTTP kiểu truyền thống, khi anh (client) đưa ra câu hỏi, yêu cầu có thể **"ấy"** một cái được không?. Nếu em đồng ý, **lập tức** trả lời CÓ, ngược lại thì nói là KHÔNG. Chả hề chần chừ suy nghĩ. 

![](https://images.viblo.asia/83c35eef-c8fe-42e1-8415-1476431bc247.png)

-----
Vấn đề đối với kiểu truyền thống này là **hai chữ  lập tức.** 
Thời nay đã hiện đại rồi, vừa mới 8h02 client (anh) gửi request cho em (server) thì sau 2 mi li se cần ba má server (em) gửi request với nội dung đồng ý. 

Vậy là chỉ tại 2 mi li se cần mà client (anh) lại nhận được câu trả lời là **"éo"**. 

![](https://images.viblo.asia/b8be2bee-acf8-48fe-9930-1346b3d7663d.png)

Thiệt tình là cay cú vl, từ đó kỹ thuật HTTP Polling ra đời, mục đich nhằm gia tăng khả năng kết đôi, giúp tăng tỉ lệ sinh, giảm tỉ lệ tử, ... lạc đề :sweat_smile:

-----

### 2. HTTP Polling - Kiểu siêng năng (cứ sau 5 phút lại hỏi, bất kể em có đồng ý không, hết 5 phút lại hỏi).

Chính vì kiểu regular hỏi phát bị từ chối luôn, nên Polling ra đời, siêng năng cần cù gửi request sau một thời gian nhất định, vấn đề **bất kể phản hồi** (**response**) **có dữ liệu hay không?**. Cụ thể ra là kệ m* em có trả lời có hay là không, hay là ỉm (**timeout**) thì cứ 5 phút anh vẫn hỏi 1 lần (đẹp trai không bằng chai mặt) :disappointed: :disappointed: :disappointed: 

![](https://images.viblo.asia/19e87b1b-bd13-42cc-9e08-0a30c130a8a0.png)

-----
Chính vì nguyên nhân đó, kĩ thuật này sẽ gây lãng phí lớn, tiêu chí **realtime** cũng không thật sự ổn định. Chính vì cái thái độ chày cối bất cần này, kĩ thuật **HTTP Long Polling** ra đời.

-----
**Hỗ trợ**: Kĩ thuật này hoạt động ở tất cả browser có Javascript được bật.

**Lưu ý**: Kỹ thuật này là loại kĩ thuật gây lãng phí lớn, nếu thời gian giữa mỗi lần gửi request quá ít, gánh nặng về băng thông và xử lí request sẽ dồn nặng lên server.
Ngay lúc này, một cuộc tấn công DDos bùng phát, đảm bảo server sẽ quá tải và chết bất đắc kì tử. 
Vì vậy, nếu không cần thiết, nên thận trọng khi sử dụng HTTP Polling.

-----

### 3. HTTP Long Polling - Kiểu chai mặt (anh hỏi nhưng phải chờ em hỏi ba má mới trả lời anh được).

Mới nhìn sơ thì phương thức này đập vào mặt là một chữ Long, vấn đề là cái gì Long (pen!s thì khỏi nói :v). Đáng buồn thay, kỹ thuật này lại nhấn mạnh vào **thời gian chờ đợi** dài. 

Vậy kĩ thuật này hoạt động như thế nào?.

-----

Nhìn chung, client (anh) sẽ gửi request (yêu cầu) **liên tục lặp lại** giữa các khoảng  thời gian dài (long). Hình dung ra theo 4 bước dưới đây:
* **Bước 1**: Send request - anh hỏi em cho anh "ấy" cái được không?
* **Bước 2**: Server event - em mở một luồng suy nghĩ (idle event - khoảng chờ), chờ sự hiện phản hồi từ một client khác (ba má). Vấn đề là anh (client) không thể chờ em cả đời -> Next step.
* **Bước 3**: Nếu hết thời gian chờ, ba má chưa có câu trả lời thì em (server) vẫn phản hồi cho anh kết quả là "đéo".
* **Bước 4**: Send request again - sau khi nhận được câu trả lời (dù là yes hay no) thì anh (client) vẫn tiếp tục gửi lại request)

![](https://images.viblo.asia/d083c57c-56d3-40b6-b44c-b61218fc54f9.png)
                   Bảng so sánh độ trễ và tốc độ load giữa Polling và Long Polling

-----
##### Khi nào thì nên sử dụng kiểu chai mặt (HTTP Polling)?

So với kiểu truyền thống, kĩ thuật này mang màu sắc chai mặt (gửi request hoài hoài), nhưng cũng không phải là không có ưu điểm. 
Trường hợp user (ba má client) chỉ có mỗi một mụn con, đã gần đất xa trời, luôn mong ngóng có đứa nào đó chấp nhận cái request của con trai rồi mới nhắm mắt xuôi tay thì kĩ thuật này nên được áp dụng.
Ưu điểm của HTTP Long polling là nó đáp ứng Realtime (thời gian thực), với độ trễ (Latency) gần như bằng Zero (0).
Khi em trả lời là có, ngay lập tức anh (client) có câu trả lời sau 0 mi li se cần, sau đó ba má anh cũng biết, có thể thanh thản ra đi.

-----
![](https://images.viblo.asia/cca0032b-e2bb-4ac9-85f9-e02e54e25c1a.png)

-----
Nghiêm túc lại thì HTTP Polling sẽ cung cấp một API ổn định, mức độ phản hồi khi có thông tin mới rất nhanh, đáp ứng tiêu chí **realtime**.

-----
**Lưu ý**: một nhược điểm tương đối cố hữu đối với HTTP Polling là chiếm băng thông (bandwidth), vì vậy cần phải cân nhắc chu kì gửi request không nên diễn ra quá nhanh.

Con nào mà cứ 2 phút lại hỏi "cho anh ấy một cái", **nó lại chả block** :joy::joy::joy:.

-----

### 4. Server-Sent Events - Kiểu dồn dập (anh hỏi một lần, em trả lời liên tục, chắc em cũng thích "ấy" :drooling_face: ) .

Kỹ thuật này nhìn chung là giống **HTTP Polling**, tuy nhiên có đôi chút khác biệt ở chỗ, client (anh) chỉ hỏi có một lần (**kết nối chỉ mở một lần duy nhất**), sau đó em (server) do quá hăng hái, nhiệt tình, nên cứ 3s em lại trả lời một lần rằng "ba má em chưa chịu".
Việc giao tiếp này gần như là một chiều (**one way comminucation**). Chiều từ **server tới client**.

![](https://images.viblo.asia/2304e8c6-8d69-4d35-8770-ca68c926e077.png)
-----

Mới đầu đọc tới đây, mình cũng như anh em, đều phát sinh ý nghĩ rằng sao lại có cái kỹ thuật kết nối dở người kiểu này?.

Mục đích nó sinh ra là gì?

Sau một hồi **research** hăng hái, cuối cùng mình cũng có câu trả lời.
Thực sự thì **SSE (Server sent events)** lại thật sự hữu ích đối với các yêu cầu dữ liệu phản hồi **real time** liên tục. Ví dụ như ứng dụng xem vị trí máy bay, ta chỉ gửi request xem lộ trình của máy bay A380 một lần, sau đó, server sẽ liên tục trả về tọa độ (latitude, longitude) của máy bay.

-----

### 5. Kết luận

**Túm cái quần lại**, bài viết này cho các bạn một cái nhìn khách quan, vui vẻ về một số kỹ thuật mới (chắc có khi chỉ mới đối với mình :joy::joy:) sử dụng trong giao tiếp giữa **client** và **server**. Tuy nhiên, còn một thiếu sót nhỏ là chưa đề cập tới **Websocket**. Thời gian tới, mình sẽ viết riêng một bài mới về **Websocket** và **so sánh giữa Websocket và SSE (Server sent event)**.

-----

Cảm ơn các bạn đã đọc bài của mình, nếu bài viết của sai sót về nội dung, các bạn có thể comment phía dưới.
Để đọc thêm các bài viết khác hay và thú vị, các bạn có thể truy cập website của mình ([KieBlog.vn](https://kieblog.vn))

**Happy coding.**