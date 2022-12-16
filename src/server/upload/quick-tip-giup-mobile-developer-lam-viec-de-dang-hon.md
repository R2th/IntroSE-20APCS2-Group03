Như tiêu đề, hôm nay mình sẽ chia sẻ một công cụ khá là cũ nhưng rất tuyệt để giúp anh em mobile developer có thể làm việc dễ dàng hơn (một chút). 
Tên của nó là **Android Debug Bridge**  (hay tên gọi thân thuộc hơn là adb :kissing: ), nghe đến đây hẵn anh em sẽ tặc lưỡi "ui giời!!!, cái này thì xưa như quả đất, thằng nào làm di dộng mà không biết cái này ??". 
> Với những ai chưa biết adb là gì, thì adb là một công cụ để giúp laptop/pc có thể giao tiếp với smartphone. Giao tiếp theo đặt lệnh ấy, chứ không phải giao tiếp kiểu truyền file nha :)). Các bạn có thể kham khảo thêm tại [đây](https://developer.android.com/studio/command-line/adb). 
> 
Đúng vậy, ai cũng biết adb là gì, nhưng không phải ai cũng sử dụng hết sức mạnh của nó. Nhất là khi thằng Android Studio 3 và bè phái ADV (máy ảo android) của nó ra đời, mọi người dường như quên mất sự hiện diện của huyền thoại này :disappointed_relieved:. Hôm nay, mình sẽ chia sẻ một mẹo nhỏ đê giúp mọi người có thể yêu lại từ đầu.
## Vậy ưu điểm của nó là gì ?
**Ưu điểm 1:** **Hỗ trợ kết nối smartphone với laptop/pc**

Đúng như tên gọi, adb là một dạng cầu nối, giúp laptop/pc có thể ra lệnh cho thiết bị android của chúng ta hoạt động theo ý mình. Một ví dụ điển hình nhất đó là việc thay vì phải chạy **máy ảo -> tốn ram, tốn gpu/cpu**, chúng ta hoàn toàn có thể kết nối điện thoại với laptop thông qua dây cap để lập trình. Như vậy laptop sẽ **chịu tải nhẹ hơn, đỡ nóng giận hơn, quan trọng hơn là tốc độ load cực nhanh**. Điều này thật sự hữu ích với những bạn thích một chiếc laptop mỏng nhẹ (như mình sài asus ux410) nhưng vẫn có thể code mọi thứ trên đời. Thêm nữa đó là việc chạy trên máy thật sẽ giúp mình có được trải nghiệm thật hơn so với chạy trên máy ảo (anh em nào làm flutter chắc sẽ hiểu vấn đề này).
Nhược điểm duy nhất của cách này là chúng ta sẽ phải cắm đoạn cap dài lòng thòng từ điện thoại tới laptop.

**Ưu điểm 2:** **Vẫn là hỗ trợ kết nối :v**

Đây chính là trọng tâm mà mình muốn đề cập (ở trên là chém gió thôi :v).

ADB có một kiểu giao tiếp là server-client thông qua giao thức [TCP](https://vi.wikipedia.org/wiki/TCP). Điều này có nghĩa là, chúng ta có thể biến smartphone thành một máy chủ để nhận lệnh từ phía client (laptop) thông qua kết nối wifi. Nói đơn giản là thay vì cắm cáp thì giờ chỉ cần phát wifi hoặc kết nối chung 1 cục wifi là có thể code được rồi :v.
### Hướng đẫn
**Lưu ý: Điện thoại và máy tính phải được kết nối chung 1 mạng wifi nha**

Để cài đặt lần đầu các bạn mở cmd hoặc shell lên, gõ:
```
adb version
```
Nếu cmd hiển thị gần giống như này (hình dưới) nghĩa là máy bạn đã được cài adb trước đó. Thường thì khi cài Android Studio có cài sẵn adb rồi.
![](https://images.viblo.asia/e08d56e7-ebc8-4efb-b11f-fe678c49b8cf.png)
Kế tiếp, để setup lần đầu thì cần phải đau. Các bạn cắm cáp vào laptop và smartphone để 2 bên nhận ra nhau, rồi mở cmd gõ lệnh:
```
adb tcpip 5555
```
Cái này là để mở port, nghĩa là máy tính mà điện thoại sẽ giao tiếp với nhau qua cổng 5555 này, bạn có thểm thay số nào tùy thích vào. <br>
Tiếp đến, trên điện thoại truy cập vào wifi -> xem thông tin -> ghi cái IP Address ra giấy rồi nhập lệnh:
```
adb connect <ip address>:5555
```
Thay *<ip address>* bằng IP mà bạn vừa viết ra giấy. 
    
![](https://images.viblo.asia/4519071c-2aaf-4e75-b78e-7dcb41bfd494.png)
    
Rồi xong!! như vậy là giờ bạn có thể rút cap ra và run code thử.
Sau khi đã kết nối thành công thì những lần sau, máy sẽ tự động nhận biết để tự kết nối, chúng tả chỉ cần ngồi tận hưởng thôi.
Để tắt chế độ này (để sử dụng cap truyền thống), các bạn nhập lệnh:
```
adb usb
```
Vời cách này bạn có thể kết nối không chỉ một mà có thể nhiều thiết bị cùng lúc mà không cần phải dây dợ hay máy ảo gì cả :)).
Kham khảo thêm tại [đây](https://developer.android.com/studio/command-line/adb).