# Lời tựa
Xin chào, đến hẹn lại lên.  Hôm nay, Thống xin được chia sẽ về cách xử lí **panic** trong rest api nhé. 😁😁 
# Bài toán
**rest api -** <br>
![](https://images.viblo.asia/31f49a7b-e14e-4869-912c-fd7631217d99.png) <br>
Về kiến trúc mình sẽ dùng gin framework để support define rest api.  Khi có 1 request được gửi đến, nó sẽ đi qua 3 tầng - transport -> service -> repo -> **db library**. (Và như mọi lần, mình sẽ để [source](https://github.com/dnquangit/demo-catch-global-exception) ở đây và chỉ điểm mặt những ý chính để các bạn tiện theo dõi nhé). <br>
**Khi code golang, chắc hẳn bạn đã biết panic có thể stop "program" nếu nó ko được "recovered".**  **Và để rest server không bị crashed** thì bất cứ khi có 1 "panic" nào xãy ra ở trong quá trình call request, chúng ta phải sẽ catch được error và tiến hành **recover** lại. <br>
Okee, trước khi fix được bug thì ít nhất ta phải thấy được bug cái đã. 
# Tiến hành trigger panic  
Mình sẽ set up file ".env" và kích hoạt panic dưa theo file này: <br>
![image.png](https://images.viblo.asia/83cba2d1-d917-4367-9103-251b23ce5ff7.png) 
<br>**Trigger panic ở db library**: 
<br> ![image.png](https://images.viblo.asia/d7a21334-340c-47f0-9508-f240396c4e3f.png) 
<br> ![image.png](https://images.viblo.asia/9e5abbf3-a800-4650-9132-c88ab600e682.png)  
**Run server and see a run time error**: <br>
Server
<br> ![image.png](https://images.viblo.asia/9f3da617-7c21-40d6-afc8-278ec9e64a20.png)
<br> Client response
<br> ![image.png](https://images.viblo.asia/59b68c90-5df1-4457-833e-3e9f9fa29440.png) <br>
Run time error đã xuất hiện , client thì nhận được "response" và **server lại ko bị stop**. <br>
Dường như Thống đã chém gió hơi lố đà rầu các bác ạ. Server phải stop sau khi panicking đúng ko nào ? <br>
![image.png](https://images.viblo.asia/279cc5fb-378f-4bbd-b74d-e81840fa687f.png) <br>
<br>What's wrong in here ? 😁😁Lol thật ra thì cái server của Thống đã có sẵn cơ chế recover từ GIN framework với câu lệnh **gin.Default** và "**net/http**" library  rồi([recovery of gin](https://github.com/gin-gonic/gin/blob/master/recovery.go) and [recover of http](https://github.com/golang/go/blob/master/src/net/http/server.go)).  <br>Chúng ta không cần handle **panic** nữa và  hẹn gặp lại các bạn lần sau (ah mình lại đùa đấy 😅😅). Để ko mất thời gian, ta sẽ back lai cái client response ở trên. Về cơ bản, thằng GIN nó chỉ support chúng ta cái mã lỗi *5 xị* thôi và một good server thì không thễ nào trả về  mỗi cái mã lỗi như vậy được. Chúng ta phải giành lại cái quyền trả về lỗi đó.  <br>
**Vậy công việc bây giờ là bằng cách nào đó, phải catch "error" và format error và trả về client trước 2 thằng "recover" ở trên nó đụng tới**.  
# Add middleware for recover a panic
<br> ![image.png](https://images.viblo.asia/a817d4fd-efc5-4b71-b00e-0da391f42dc4.png) 
<br> ![image.png](https://images.viblo.asia/401ed572-3ccb-424f-a4fd-387e2ceaa24b.png) 
<br> Tác giả của GIN dường như cũng đã thấy ra vấn đề này và set up cho chúng ta sẵn cơ chế **middleware**. Chúng ta chỉ việc recover a panic tại **middleware** và include nó vào server qua hàm **"router.Use()"**.  Tất nhiên, GIN sẽ set up request cho gặp **middleware** trước khi gặp 2 thằng recover kia.  <br> <br>
**Call server again with recover middleware:**  <br>
![image.png](https://images.viblo.asia/543d0bea-8423-4ade-8966-b376424ed2c2.png)
# Vài lời sau cuối
* Rất cám ơn bạn đã chịu khó khi vẫn còn ngồi ở đây 😁😁. 
* Về ví dụ và định nghĩa, defer, recover, panic có rất nhiều trên mạng (i.e https://go.dev/play/p/g0ZfIRqKnrn). Nhưng để đọc xong nó và áp dụng vào thực tế thì không hề đơn giản. Như ví dụ ở trên mình làm với GIN, nhưng nếu swap qua mux.Router thì chúng ta cũng phải xem xét làm sao để có thể xư lí request trước khi cơ chế recover của nó đụng tới. 
* Về format error, tùy theo dự án mà bạn có thể set up theo cách bạn muốn. Mình chỉ để tạm thời để ví dụ đơn giản ở đây thôi nhé.   
* **Nếu thấy hay tặng Thống 1 like nhé**
* Tham khảo: 
    * https://200lab.io/blog/