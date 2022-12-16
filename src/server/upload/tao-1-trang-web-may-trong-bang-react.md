**Bạn là người yêu nhạc nhưng bố mẹ lại bắt bạn làm lập trình viên? Và 1 ngày chán chường không biết phải làm gì? Cùng thử làm cái máy trống xem sao!(go).**
# Máy trống là gì? Và thiết kế sẽ ra sao?

Máy trống là 1 công cụ mô tả âm thanh của dàn trống bằng máy. Ngày nay thì nó đã hiện đại hơn nhiều khi mô tả được nhiều âm thanh hơn và là công cụ không thể thiếu cho các loại EDM.

Qua đó chúng ta sẽ phác hoạ giao diện tạm xấu xấu như sau:
![](https://images.viblo.asia/9ece9c3f-172f-445e-9857-dfa5cc1bfca1.png)
# Khởi tạo project
Bình thường thì React dùng JSX mãi rồi. Hôm nay đổi thử sang TypeScript xem sao. Làm theo hướng dẫn tại [đây](https://github.com/Microsoft/TypeScript-React-Starter) và chúng ta có kết quả
![](https://images.viblo.asia/4b8dc3ee-9db4-45ab-b85f-b0502a021dba.png)
Tiếp theo chúng ta sẽ chỉnh ở `tsconfig.json` ở `“noImplicitAny”: true,` thành `“noImplicitAny”: false,`. Khuyến cáo chỉnh tương tự ở `noUnusedLocals`.
# Component Transport
Bây giờ chúng ta sẽ cài đặt thư viện Tone.js
```bash
npm install — save tone
```

Sau đó sẽ là code cho Component Transport
![](https://images.viblo.asia/4e97ad18-0614-4c2c-918a-4f6c130b5af8.png)

Sau đó là thử đặt 1 `instrument` trong 1 `transport` và đặt `transport` trong app và thử kết quả bằng cách click:

![](https://images.viblo.asia/daf367a0-f601-4d1d-9811-91f9823e1a09.png)
# Bộ máy âm 
## Bộ kick
Phần này là cái phần tính toán tần số đau đầu nên mình xin skip vì rất may Tone.js cung cấp cho chúng ta API và chúng ta chỉ cần viết sau:
```javascipt
var AudioParam = AudioParam.exponentialRampToValueAtTime(value, endTime)
```
Và chúng ta có 1 thứ trông như này


![](https://images.viblo.asia/a66e6d98-900e-4c71-bb40-60d6d2dbb6ce.png)

Quay lại Component Transport
![](https://images.viblo.asia/9b81ec29-c287-451e-8131-b9443a6575b7.png)

# Vòng lặp
Cái kick ở trên ngon đấy, nhưng mà 1 bài hát thì sẽ lặp nhiều lần kick. Chúng ta sẽ sửa lại nó như sau:
![](https://images.viblo.asia/2fc289f3-d760-44f0-afd7-eb1e3ea4bc70.png)
Thế là xong
# Component InstumentHack
![](https://images.viblo.asia/3afcb0c7-1a80-476b-9065-49ccbd4b1c17.png)

Sau đó cập nhật lại Instrument
![](https://images.viblo.asia/f72fe057-b684-4356-9d1a-82acf1628dd2.png)
# Các component Steps
Lặp đi lặp lại 1 nhịp quả là nhàm chán. Vậy nên tiếp theo sẽ là các component Step.

Đầu tiên là Step đơn lẻ
![](https://images.viblo.asia/68aa8a40-2d6e-427b-93bb-4b64551be3ec.png)
Tiếp đó là Steps để gom các Step kia

![](https://images.viblo.asia/a579189d-fb3f-4386-8460-85e70d095dbd.png)
Và sửa lại Transport

![](https://images.viblo.asia/57f4f37b-5966-4e64-bba1-eedf45ad429f.png)
Trông cái này hiện cứ hao hao 1 cây đàn phím ấy nhỉ
![](https://images.viblo.asia/09ac9e07-d434-4a38-a85a-98698ab9ccf0.png)
# Làm các component hoạt động nào 

Viết lại InstrumentHack
![](https://images.viblo.asia/ccec0e1e-7da9-498b-921d-c7adfcbb2f02.png)
Bổ sung method nhỏ này vào nào
```javascript
areEqual = (a, b) => {
   a.forEach((item, index) => {
      if(item !== b[index]) return false
   }
   return true;
}
```

![](https://images.viblo.asia/bdbc60b2-6e66-4246-a80d-f704f377c102.png)
# Play/Pause
Chúng ta sẽ làm nút Play/Pause như sau:
![](https://images.viblo.asia/0589d229-e350-40fe-86fa-4d9f74ba4423.png)

Và giờ chúng ta sẽ lấy `Transport.start` và đặt vào 1 method của `TransportComponent`
![](https://images.viblo.asia/55bd2200-54ac-4146-92f9-b42d281d834d.png)
# Các nhạc cụ khác
Vì cần nhiều nhạc cụ nên chúng ta sẽ render chúng như sau:

![](https://images.viblo.asia/6e910877-df54-469c-8117-57944adc4ce6.png)
## Snare
![](https://images.viblo.asia/9bb4c4a0-82c6-43ea-8b20-2a6dd3724fc9.png)
![](https://images.viblo.asia/a327e4aa-cde7-4e59-afd5-bbbf15bf54d7.png)
## Clap
![](https://images.viblo.asia/2ba3c6ef-941f-4ad8-afd1-9fafb330eb54.png)

![](https://images.viblo.asia/7d970e18-f474-4e3b-a9d5-32f315838e52.png)
## Hat
![](https://images.viblo.asia/efc73f8a-431e-4bfc-b1d3-9d797f153c88.png)
![](https://images.viblo.asia/7e800e06-6e9f-44cc-8393-594693a4db57.png)
# Làm 1 đoạn Jam nào
![](https://images.viblo.asia/c3592c34-bcef-4c61-a05a-26ee7f5abdd0.png)
# Chọn nhạc cụ
`IntrumentHack` sẽ lựa chọn loại nhạc cụ để chơi và tuyền vào steps. Các loại khác sẽ là `null`
![](https://images.viblo.asia/42d28644-0bbb-437e-9488-d29a7c54bbf2.png)
Method `render` của `Instrument`
![](https://images.viblo.asia/696b6ed5-0701-4436-91ec-0abce65ad577.png)
Và cuối cùng thì chúng ta sẽ truyền trạng thái từ `TransportComponent` vào `InstrumentHack`
# Thành quả
Sau 1 số lằng nhằng ở trên thì chúng ta đã có giao diện thành phẩm bên dưới
![](https://images.viblo.asia/560d8736-b41f-4acc-b657-986deb39d228.png)

# Nguồn
Bài viết được dịch và lược từ https://medium.com/@gabrielyshay/creating-a-web-drum-machine-e24843e4392a