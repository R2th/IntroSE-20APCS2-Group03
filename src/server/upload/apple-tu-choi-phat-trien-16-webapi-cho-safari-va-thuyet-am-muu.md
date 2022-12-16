## Lời tựa
Chỉ mới tuần trước thôi, cộng đồng developer trên thế giới đã "dậy sóng" khi Apple thông báo sẽ KHÔNG hỗ trợ 16 Web API cho trình duyệt Safari của mình. Bạn thử search google từ khóa "Apple declined to implement 16 Web APIs" sẽ thấy các trang lớn nhỏ đều đăng tin này. Vậy 16 Web API này cụ thể là gì? Việc Apple từ chối chúng có ảnh hưởng gì đến miếng cơm manh áo của lập trình viên tụi mình không? Hãy cùng mình xem xét và bạn sẽ tự có câu trả lời cho bản thân.

Trong bài viết này, mình sẽ cố gắng giải thích rõ hơn về ngữ cảnh của thị trường, sau đó mình sẽ giúp các bạn hiểu (cơ bản) về từng API và ứng dụng của nó như thế nào. Đương nhiên những giải thích của mình đến từ việc tự tìm hiểu cá nhân, nên nếu có sai sót gì thì các bạn góp ý trong phần Comment nhé.

Các bạn có thể xem bài viết gốc của mình tại đây: https://phucluong.com/apple-tu-choi-phat-trien-16-webapi-cho-safari-va-thuyet-am-muu/

## Khoảng cách công nghệ giữa App và Web

  ![Cuộc chiến âm thầm giữ Web (app) và Mobile app](https://images.viblo.asia/8f83072f-ba56-46c4-a86c-b48c3f2970ce.png)


Bạn hãy tự hỏi mình xem vì sao chúng ta tải một app từ Appstore về dùng, thay vì sử dụng các trang web với những chức năng tương tự? Có rất nhiều lý do không thể kể hết, mình xin liệt kê một vài lý do ngẫu nhiên theo trí nhớ của mình (mình mặc định các bạn hiểu là native app nhé, chứ không phải webapp):

* App chạy nhanh hơn web rất nhiều?
* App có thể chạy offline, web thì không?
* App có các tính năng như Geolocation, Bluetooth, Push notification, Device Motion, Sensors... web thì không?

KHOAN, hình như có gì đó KHÔNG đúng! Nếu bạn đang cảm giác như vậy, thì chứng tỏ bạn cũng rất hay cập nhật tin tức công nghệ. Đúng vậy, web đã có những tính năng trên, và còn nhiều hơn thế nữa.

Web đang phát triển từng ngày, hàng loạt các API được phát triển trong cuộc đua với app. Những gì app có thể làm được, thì web cũng đang dần rút ngắn khoảng cách với app. Và trong một tương lai không xa, web sẽ thay thế app? Các bạn có tin vào điều đó không?

Các bạn có thể tham khảo trang web [What web can do today](https://whatwebcando.today) để xem "Ngày nay web có thể làm được gì".

## "Thuyết âm mưu" về Apple
Bạn nghĩ sao nếu thật sự tương lai web sẽ thay thế app, và người dùng sẽ không còn tải app từ các Appstore nữa? Apple sẽ ra sao nếu app không còn đất dụng võ? Các native app developer sẽ thay đổi thế nào để thích ứng?

Và vì thế, có tin đồn rằng Apple đang muốn kìm hãm sự phát triển của web để hạn chế sự đe dọa đến đế chế của mình. Và tin đồn đó càng được tin tưởng khi Apple vừa từ chối không hỗ trợ 16 Web API giúp tăng sức mạnh của web và rút ngắn khoảng cách với app.

## Lý do Apple đưa ra là gì?

![User Fingerprinting](https://images.viblo.asia/6db685f7-400c-4f6e-adc7-839f4dae102f.png)

Tin đồn ở trên vẫn chỉ là tin đồn thôi nhé. Lý do Apple đưa ra là để tránh "user fingerprinting". Nói đơn giản là Apple không muốn tăng khả năng user bị lấy cắp thông tin về hành vi sử dụng web (bởi các công ty quảng cáo trực tuyến hay công ty thu thập và phân tích thông tin người dùng) để phục vụ cho nhiều mục đích khác nhau như quảng cáo online...

Tất nhiên lý do Apple đưa ra rất hợp tình hợp lý với triết lý phát triển sản phẩm lâu đời của mình. Nên tin đồn trên là mình bổ sung để các bạn đọc chơi cho biết thôi nhé.

## 16 Web API bị Apple từ chối hỗ trợ
Mình xin dài dòng thêm một câu nữa thôi nhé 😅. Tuy Apple từ chối hỗ trợ (cho Safari) nhưng hầu hết đều được hỗ trợ bởi Chrome và Firefox, vì thế chúng ta vẫn có thể lạc quan về sự phát triển của web trong tương lai.

### 1. Web bluetooth
API này cho phép trang web kết nối đến các thiết bị xung quanh thông qua bluetooth. Chỉ với API này, ứng dụng của nó là vô cùng nhiều. Bạn hãy tưởng tượng căn nhà của bạn sử dụng bóng đèn được tắt mở thông qua bluetooth. Thông thường bạn sẽ phải tải app để điều khiển tắt mở, nhưng giờ web đã có thể làm được rồi nhé.

**Ứng dụng**: [https://googlechrome.github.io/samples/web-bluetooth](https://googlechrome.github.io/samples/web-bluetooth)  
**Can I Use**: [https://caniuse.com/#feat=web-bluetooth](https://caniuse.com/#feat=web-bluetooth)  
**Demo:** các bạn thử bật bluetooth trên máy của mình và chạy dòng code đơn giản này với Chrome nhé:
``` javascript
navigator.bluetooth.getAvailability()
  .then(isBluetoothAvailable => {
    console.log(`Bluetooth is ${isBluetoothAvailable ? 'available' : 'unavailable'}`);
  });
```

![Bluetooth availability](https://images.viblo.asia/8f70ddac-d20f-4fd3-ac9e-078bb3dfb91a.png)

### 2. Web MIDI API
MIDI là viết tắt của Musical Instrument Digital Interface. Nó là API để kết nối và thao tác đến các thiết bị âm nhạc điện tử.

![https://unsplash.com/photos/sWbGwr1fOUk](https://images.viblo.asia/1f5d5591-81d4-4d60-b195-b93f476db026.jpg)

Mình thuộc nhóm mù âm nhạc nên cũng không hứng thú với Web API này lắm. Các bạn nếu có hứng thú thì có thể tìm hiểu thêm.

**Tham khảo:** [https://www.smashingmagazine.com/2018/03/web-midi-api/](https://www.smashingmagazine.com/2018/03/web-midi-api/)  
**Can I Use**: [https://caniuse.com/#feat=midi](https://caniuse.com/#feat=midi)

### 3. Magnetometer API
API này cho phép trang web kết nối với các bộ cảm biến đo từ trường (từ kế) xung quanh. Đây là loại cảm biến ít được biết đến, nó giúp trang web có khả năng đọc được cường độ từ trường bằng cách sử dụng cảm biến của thiết bị. Ứng dụng của nó thường dành cho các thiết bị ngoại vi như gamepad (điều khiển hành động của người chơi), hoặc cũng có thể biến trang web của bạn thành một chiếc la bàn. Các bạn có thể tham khảo demo ứng dụng WebVR (Web Virtual Reality) ở link bên dưới. Mình không thực sự rành về lĩnh vực này, nếu các bạn muốn tìm hiểu sâu hơn về nó thì có thể google thêm nhé.

**Demo:** [https://intel.github.io/generic-sensor-demos/](https://intel.github.io/generic-sensor-demos/)<br>
**Can I Use**: [https://caniuse.com/#feat=mdn-api_magnetometer](https://caniuse.com/#feat=mdn-api_magnetometer)

### 4. Web NFC API
API này cho phép trang web tương tác với các thẻ thông minh NFC (gọi là Tag) thông qua thiết bị đọc NFC. Theo [thế giới di động](https://www.thegioididong.com/tin-tuc/nfc-la-gi--590273), NFC (Near-Field Communications) là công nghệ kết nối không dây tầm ngắn trong khoảng cách 4 cm. Công nghệ này sử dụng cảm ứng từ trường để thực hiện kết nối giữa các thiết bị (smartphone, tablet, loa, tai nghe,…) khi có sự tiếp xúc trực tiếp (chạm).

![Ví dụ minh họa máy đọc NFC](https://images.viblo.asia/f8de3efe-89bb-4263-9c48-ad15b890b6ca.jpg)

API vẫn đang được phát triển và chưa có trên các browser hiện tại. Tuy nhiên bạn có thể thử với Chrome khi bật cờ `enable-experimental-web-platform-features` lên.

**Can I Use**: [https://caniuse.com/#feat=webnfc](https://caniuse.com/#feat=webnfc)

### 5. Device Memory API

Cho phép trang web lấy được thông tin về bộ nhớ (RAM) của thiết bị (tình bằng gigabyte). API này khá đơn giản, bạn hãy thử chạy đoạn script này với Chrome nhé:

``` javascript
const memory = navigator.deviceMemory;
console.log (`This device has at least ${memory}GiB of RAM.`);
```

![Device memory API](https://images.viblo.asia/603a01a3-b10a-4d2c-a24a-52d056686e5f.png)

**Can I Use**: [https://caniuse.com/#feat=mdn-api_navigator_devicememory](https://caniuse.com/#feat=mdn-api_navigator_devicememory)

### 6. Network Information API
API này cung cấp thông tin về kết nối mạng của thiết bị, và cho phép trang web biết khi nào loại kết nối (connection type) thay đổi. Bạn hãy thử chạy đoạn script này với Chrome nhé:
``` javascript
console.log(navigator.connection);
```

![Network information API](https://images.viblo.asia/27e8ae41-05f3-42b6-ab78-c867f1fbbb65.png)

**Tham khảo:** [https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)  
**Can I Use**: [https://caniuse.com/#feat=mdn-api_networkinformation](https://caniuse.com/#feat=mdn-api_networkinformation)

### 7. Battery Status API
API này cung cấp thông tin về pin của thiết bị, ví dụ như pin còn bao nhiêu %, có đang cắm sạc không... Bạn hãy chạy thử đoạn script này với Chrome nhé:
``` javascript
navigator.getBattery().then(function(battery) {
  console.log("Your battery level: " + battery.level * 100 + "%");
});
```

![Battery status API](https://images.viblo.asia/a224340b-fa2f-4677-9ef0-27345a4b9b87.png)

**Tham khảo:** [https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)  
**Can I Use**: [https://caniuse.com/#feat=battery-status](https://caniuse.com/#feat=battery-status)

### 8. Web Bluetooth Scanning
Cho phép trang web dò (scan) các thiết bị kết nối bluetooth trong phạm vi. Tính năng này vẫn đang được phát triển, nếu bạn muốn thử nghiệm thì có thể bật cờ `enable-experimental-web-platform-features` lên nhé.

**Demo:** [https://googlechrome.github.io/samples/web-bluetooth/scan.html](https://googlechrome.github.io/samples/web-bluetooth/scan.html)  
**Tham khảo:** [https://www.chromestatus.com/feature/5346724402954240](https://www.chromestatus.com/feature/5346724402954240)

### 9. Ambient Light Sensor
Google translate: "Cho phép trang web nhận biết được mức độ ánh sáng hiện tại hoặc độ rọi của ánh sáng xung quanh thiết bị thông qua các cảm biến của thiết bị. Bạn hãy tưởng tượng mình đang lướt web, mức độ độ ánh sáng phòng tự nhiên tụt xuống (ai đó kéo rèm chẳng hạn), thì trang web sẽ tự động chuyển sang các chế độ màu sắc phù hợp với mức độ sáng hiện tại.

Demo (Ambient Map demo): [https://intel.github.io/generic-sensor-demos](https://intel.github.io/generic-sensor-demos)<br>
**Can I Use**: [https://caniuse.com/#feat=mdn-api_ambientlightsensor](https://caniuse.com/#feat=mdn-api_ambientlightsensor)

### 10. HDCP Policy Check extension for EME
HDCP là viết tắt của High-bandwidth Digital Content Protection. API này cho phép trang web kiểm tra xem thiết bị có "HDCP policies" hay không, thường được sử dụng trong việc streaming video. HDCP không nằm trong hiểu biết của mình, nên mình lược dịch một vài thông tin từ nguồn trên mạng nhé.

Mục đích của HDCP là để bảo vệ bản quyền các nội dung số khi nó được truyền đến TV nhà bạn, thường là thông qua cổng kết nối HDMI hoặc DVI. Netflix yêu cầu HDCP khi stream nội dung từ thiết bị kết nối với TV của bạn.

Ngày nay, HDCP là một chính sách bắt buộc để stream các nội dung chất lượng cao. Ngày trước các web developer muốn có được quyền HDCP sẽ phải chờ đợi được cấp phép hoặc buộc phải stream với chất lượng thấp. HDCP Policy Check API ra đời để giải quyết vấn đề đó.

**Tham khảo:** [https://developers.google.com/web/updates/2018/08/chrome-69-media-updates#hdcp](https://developers.google.com/web/updates/2018/08/chrome-69-media-updates#hdcp)  
**Demo:** [https://googlechrome.github.io/samples/hdcp-detection/](https://googlechrome.github.io/samples/hdcp-detection/)

### 11. Proximity Sensor
Cho phép trang web biết được khoảng cách (và các thông tin khác) giữa thiết bị và một vật ở xa, thông qua cảm biến "proximity sensor". Một ví dụ để tưởng tượng về ứng dụng của nó với app nhé. Bạn có để ý khi gọi điện thoại (smartphone), bạn kê điện thoại lên gần tai để nghe, và wow (chỉ là bộ cảm biến bắn ra một event thôi), điện thoại tự tắt màn hình để tiết kiệm pin (và giảm nóng thiết bị). Ứng dụng của nó thì nhiều vô số kể, chỉ là bạn có nghĩ ra không thôi.

![Proximity events API](https://images.viblo.asia/504e241c-d988-4036-bc40-a344c96cd1cb.jpg)

**Tham khảo:** [https://developer.mozilla.org/en-US/docs/Web/API/Proximity_Events](https://developer.mozilla.org/en-US/docs/Web/API/Proximity_Events)<br>
**Can I Use**: [https://caniuse.com/#feat=proximity](https://caniuse.com/#feat=proximity)

### 12. WebHID
Cho phép trang web biết được thông tin về các thiết bị HID (Human Interface Device) được kết nối. Các thiết bị này ví dụ như: chuột máy tính, bàn phím, gamepad, touchscreen...

**Tham khảo:** [https://blog.scottlogic.com/2019/04/03/upcoming-webhid-api.html](https://blog.scottlogic.com/2019/04/03/upcoming-webhid-api.html)

### 13. Serial API
Cho phép trang web đọc và ghi dữ liệu từ các thiết như microcontroller, máy in 3D... Mình không quan tâm về phần cứng lắm, tuy nhiên nếu bạn yêu thích về phần cứng, thì bạn sẽ hiểu ứng dụng của nó nhiều thế nào.

**Tham khảo 1:** [https://github.com/svendahlstrand/web-serial-api](https://github.com/svendahlstrand/web-serial-api)  
**Tham khảo 2:** [https://dev.to/unjavascripter/the-amazing-powers-of-the-web-web-serial-api-3ilc](https://dev.to/unjavascripter/the-amazing-powers-of-the-web-web-serial-api-3ilc)  
**Demo:** [https://codelabs.developers.google.com/codelabs/web-serial/#0](https://codelabs.developers.google.com/codelabs/web-serial/#0)

### 14. Web USB
Cho phép trang web giao tiếp với các thiết bị thông qua cổng USB (Universal Serial Bus). Tất nhiên khi nói đến USB, chúng ta không chỉ nói đến các thiết bị lưu trữ mà chúng ta vẫn hay gọi là USB, mà còn các thiết bị khác như chuột, bàn phím và rất nhiều thiết bị khác. Và với những thiết bị "không chuẩn" ấy (non-standardized USB devices), thường chúng ta sẽ phải cài driver để có thể sử dụng. Đó là một trong những vấn đề mà WebUSB API giải quyết.

Bạn hãy chạy thử đoạn script này với Chrome nhé:
``` javascript
navigator.usb.requestDevice({ filters: [] })
.then(device => {
  console.log(device);
});
```

![WebUSB API](https://images.viblo.asia/2e125c4e-d492-4917-bde5-ec90bd558ec0.png)

**Tham khảo:** [https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web](https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web)
**Can I Use**: [https://caniuse.com/#feat=webusb](https://caniuse.com/#feat=webusb)

### 15. Geolocation Sensor
Trước đó chúng ta đã Geolocation API rồi, và đây là phiên bản mở rộng "xịn" hơn. Nó được giới thiệu là mang tính nhất quán với các bộ API khác trong "gia đình" Sensor APIs (https://www.w3.org/das/roadmap), tăng khả năng bảo mật, quyền riêng tư và dễ dàng mở rộng.

**Tham khảo:** [https://www.w3.org/TR/geolocation-sensor/](https://www.w3.org/TR/geolocation-sensor/)

### 16. Idle Detection
Cho phép chúng ta biết được khi nào thì user ở trạng thái "idle", hay có thể nói nôm na là không tương tác với thiết bị. Các trường hợp user ở trạng thái idle như: user không tương tác với chuột, bàn phím, màn hình, bật chế độ screensaver, khóa màn hình, hoặc thao tác trên một màn hình khác. Chúng ta có thể xác lập khoảng thời gian để bắn ra sự kiện này.

**Tham khảo:** [https://web.dev/idle-detection/](https://web.dev/idle-detection/)

## Kết luận
Như các bạn thấy, các API trên hầu hết được phát triển để Web có thể tương tác với phần cứng và người dùng tốt hơn (với mobile app, windows app hay macos app thì đơn giản). Tuy nhiên tiện dụng quá thì sẽ dễ bị kẻ xấu lợi dụng, và đó là cũng là lý do Apple từ chối phát triển các API trên, ngay cả Chrome và Firefox cũng phải cân nhắc một số API với lý do tương tự.

Ý kiến của các bạn thế nào, xin hãy để lại comment bên dưới nhé.