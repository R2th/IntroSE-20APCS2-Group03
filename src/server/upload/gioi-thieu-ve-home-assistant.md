![](https://images.viblo.asia/2613b3b0-6df9-474f-b1fe-bbcce5d253e6.jpeg)
Như chúng ta đã biết rằng J.A.R.V.I.S là trợ lý ảo rất đắc lực của Iron man, và chắc hẳn trong chúng ta ai cũng muốn mình cũng sở hữu những cái hiện đại như vậy mà chúng ta hay nghĩ chỉ trong phim ảnh, và đây một J.A.R.V.I.S của ông chủ Facebook
{@embed: https://www.youtube.com/watch?v=vvimBPJ3XGQ}

 Ở bài [Smart home basic with rails app](https://viblo.asia/p/smart-home-basic-with-rails-app-Eb85ogo652G) trước mình đã giới thiệu tới các bạn một số khái niệm về IOT, về Smart Home rồi và hôm nay cũng liên quan đến SmartHome, IoT đó chính là một nền nền tảng tự động hóa là  **Home Assistant**  do Google tạo ra.
### What's Home Assistant?
**Home Assistant**(HASS) là một nền tảng tự động hóa và là một open source chạy trên Python 3.x. Đặc biệt là nó là miễn phí và nó có khả năng bảo mật cao, an toàn thông tin bởi vì nó hoạt động trong mang LAN trong nhà, và không đẩy dữ liệu đi đâu cả.

Home Assistant nó đã được tích hợp rất nhiều thiết bị, hiện tại thì cỡ 1000 thiết bị đã được tích hợp nó để tạo một hệ thống SmartHome hoàn chỉnh và mang tính thương mại cao. Nó cho phép chúng ta liên kết các thiết bị với nhau về mặt dữ liệu. Để hiểu hơn về HASS thì chúng ta cần phải biết về Hub, vậy Hub là gì?

### What's Hub?
![](https://images.viblo.asia/c24429aa-bafb-4c9d-94e8-cd66ba7f0673.jpg)
Như hình ở trên thì Hub là Smart Home Hub - nó hoạt động giống như bộ não của chúng ta hay là CPU của máy tính vậy, là nơi nhận tín hiệu đầu vào từ voice, input, từ thao tác người dùng, thì ở đây nó sẽ xử lý mọi thông tin và sau đó đưa ra tín hiệu của thiết bị mà nó đã xử lý để thực hiện lệnh. Và nó chính là thiết bị kết nối với output và input, và kể cả thiết bị của các hãng khác nhau thì nó vẫn hoạt động được bình thường,.
Như vậy chúng ta đã hiểu HASS là gì và Hub là gì rồi nhé.
### Characteristics of HASS
- Cũng như các hệ thống IoT hiện nay thì HASS đều cung cấp cho chúng ta bản client trên mobile và computer để có thể điều khiển thiết bị điện trong nhà từ xa. 
- HASS cũng k có điện toán đám mây, vậy nên khi loại bỏ nó thì sẽ tăng cường an ninh, tính ổn định cao và cá nhân hóa.
- HASS cũng như một framwork IoT khác nên nó hoàn toàn có thể kết nối với Arduino, Nest... để xử lý phần đầu ra của tin hiệu, Bởi tính đa dạng đó mà làm cho việc hoàn thiện một hệ thống trở nên dễ dàng hơn.
- Bởi lẽ HASS là một open source nên là việc mở rộng khá là dễ dàng và linh động.
- HASS là một chương trình dự trên sự kiện và trạng thái của thực thể, ví dụ như bạn ra lệnh cho nó bật đèn, thì tùy vào mức độ ánh sáng của căn phòng mà thiết bị đó sẽ điều chỉnh độ sáng sao cho hợp lý với thời điểm hiện tại, Hay là đèn trong garage thì khi chúng ta ra lệnh đóng garage thì đồng nghĩ với việc là đèn trong garaga sẽ tắt đi do nó nhận thấy của garage đã đóng rồi. Hay là một ứng dụng thông minh mà ai cũng muốn là khi chúng ta đi làm về cảm thấy mệt mỏi, vừa vào nhà, đã có HASS phát lệnh chào bạn và mở ngay bản nhạc nhẹ nhàng thư giãn, nước nóng đã được bật, đèn đã được mở, rèm cửa cũng mở ra, điều hòa được mở sao cho phù hợp với nhiệt độ trong phòng, và việc của bạn là thư giãn. Hoặc là ứng dụng khi bạn đi ra khởi nhà và bạn chỉ cần ra lệnh tắt toàn bộ thiết bị thì bạn chả cần làm gì mà nhà của bạn đã tắt hết rồi,, rất tiện lợi về thời gian và công sức.

### Implement HASS
Hass có thể chạy trên nhiều thiết bị, thử nghĩ bạn mở PC và mở HASS chạy cả ngày thì bạn biết hậu quả nhưu thế nào rồi đấy, vừa tốn điện, vừa hao mòn PC, vậy nên máy tính nhúng Raspberry Pi hay là một loại khác là một lựa chọn quá chuẩn cho chi phí.
![](https://images.viblo.asia/1a9af00b-c7fd-46be-b0cf-fa476e1801a8.jpg)

Nhìn vào hình trên thì nó chả khác gì một PC bình thường phải không ạ. :)
Ngoài ra bạn có thể tìm hiểu ở https://www.raspberrypi.org/ để biết rõ hơn về nó nhé, biết đâu đấy bạn sẽ tìm ra mộ ứng dụng hay thì sao. :v: 
### SUMMARY
Như vậy mình cũng đã giới thiệu tới các bạn thế nào là HASS và các triển khai cũng như đặc điểm của nó để các bạn hình dung rõ hơn về tính thực tế của nó là như thế nào, ở bài viết sau, mình sẽ hướng dẫn các bạn setting môi trường và cài đặt nó như thế nào nhé. Nếu có gì sai sót mong được các bạn đóng góp để mình hoàn thiện hơn ạ. Thanks!

Tham khảo:
https://www.home-assistant.io/