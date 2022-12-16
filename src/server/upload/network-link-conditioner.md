Một trong các trường hợp rất hay được *QA* kiểm tra đó là check app trong các điều kiện kết nối internet khác nhau. Thông thường *QA* thường check app trong điều kiện kết nối mạng bình thường. Sau đó kiểm tra trong trường hợp không có kết nối mạng bằng cách tắt wifi hay bật chế độ máy bay ...
Với các dev cũng như vậy, dev thường xử lý cho trường hợp điều kiện kết nối mạng ổn định và trong trường hợp không có kết nối mạng, sao cho các tính năng đều hoạt động được như mong muốn.
Tuy nhiên trong thực tế khi người dùng sử dụng app, có rất nhiều trường hợp khác nhau về kết nối mạng, như tốc độ chậm, delay cao, kết nối không ổn định ... và đây cũng là một vấn đề phát sinh rất nhiều lỗi của app.
Tuy nhiên, thông thường để test các trường hợp này thường rất khó, vì vậy trong bài viết này minh xin giới thiệu một công cụ rất hữu ích: "**Network link conditioner**" , có thể giúp chúng ra dễ dàng tạo các điều kiện môi trường mạng khác nhau để kiểm tra.
# Install
Để cài đặt trên Mac, chúng ta truy cập vào: https://developer.apple.com/download/more/
+ với **xcode < 8.0** : search *Hardware IO Tools for Xcode*
+ Với **xcode >= 8.0** : search *Additional Tools for Xcode*
Lựa chọn version phù hợp với xcode của bạn và cài đặt.

Chúng ta cũng có thể enable **Network link conditioner** trên *iPhone* bằng cách truy cập: *Setting* -> *Developer* ->* Network Link Conditioner*.
**Note:** trong trường hợp *iPhone* không có tab *Developer*, chúng ta chỉ cần kết nối *iPhone* với máy của dev, *Developer* sẽ được kích hoặt, mọi người có thể tham khảo thêm tại: https://www.wikihow.com/Enable-Developer-Mode-on-an-iPhone

# Create test profile
- Sau khi cài đặt, mặc định đã có một số *profile* để sử dụng như: *100% Lost* ( *profile* rất hữu ích để test trường hợp *timeout*), *3G*, *LTE*, *Very Bad Network* ...

- Hình ảnh *profile* *100% Loss* :

![](https://images.viblo.asia/ac952bbf-5895-4aa4-9aef-ea036cab7c47.png)

- Ngoài những *profile* mặc định, *Network Link Conditioner* còn cho phép chúng ta tuỳ chỉnh để tạo ra những *profile* khác nhau, các thông số có thể thay đổi gồm có: 
    - *Downlink and Uplink Bandwidth*: băng thông hay tốc độ của đường truyền up và down , đơn vị bps (bit per second)
    - *Downlink and Uplink Packets Dropped*: tỉ lệ gói tin bị từ chối chuyển đi.
    - *Downlink and Uplink Delay*: trễ khi truyền tin của đường truyền.
    - *DNS Delay*: trễ trong quá trình phân giải tên miền.
- Hãy cùng thử tạo một vài *profile*:

## Slow network

- Cấu hình này được thiết lập với các thông số: 
* *Downlink* and *Uplink Bandwidth* = 320kbps
* *Downlink* and *Uplink delay* = 100ms
* *DNS delay* = 200ms và *Downlink* and *Uplink Packets Dropped* = 0 %

![](https://images.viblo.asia/810670ea-273a-4241-a576-cdfc3c4ffdc8.png)
    
- Sau khi enable mạng, thử requets trang www.google.com bằng *[postman](https://www.getpostman.com/)*, thời gian request là 1287 ms so với 121 ms trong trường hợp mạng bình thường.
    
##  Nasty network

- Cấu hình này được "buff" thêm khi tăng tỷ lệ *Downlink* and *Uplink Packets Dropped* lên 50 %

![](https://images.viblo.asia/bfe58965-2d1f-4293-a200-9e59613f3fa5.png)

- Cùng cách kiểm tra như trên, kết quả thời gian request đã tăng lên tới: 56265 ms, lớn hơn rất nhiều so với trường hợp *Slow network*

## Black hold

- Cấu hình này bằng việc đặt tỉ lệ *Downlink Packets Dropped* = 100% sẽ khiến cho mạng giống như một hố đen, mọi tín hiệu qua nó đều sẽ bị biến mất. Với đặc điểm như vậy, cầu hình này rất phù hợp cho việc test trường hợp *request timeout*
![](https://images.viblo.asia/0a3bfdc7-cbe9-41c4-833b-bee2b6eca75e.png)

- Cùng cách kiểm tra và kết quả hoàn toàn như mong đợi, *postman* thông báo lỗi: "**Could not get any response**"

# Kết luận

- Như vậy qua bài viết này chúng ta đã có thể cài đặt và sử dụng *Network link conditioner* để tuỳ chỉnh tốc độ mạng bằng các cấu hình khác nhau một cách thật đơn giản. Bài viết này đến đây là hết, hy vọng rằng bài viết này sẽ giúp ích được cho mọi người, cảm ơn mọi người đã theo dõi!

-----

refs: 

https://medium.com/@YogevSitton/use-network-link-conditioner-when-testing-your-app-bad18ecad877

https://useyourloaf.com/blog/network-link-conditioner/