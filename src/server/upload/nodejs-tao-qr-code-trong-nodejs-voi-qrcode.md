# Tạo mã QR Code trong nodejs với qrcode
## QR Code là gì?
QR Code (Quick Response Code) là dạng mã vạch hai chiều có thể được đọc bởi một máy đọc mã vạch hay smartphone có chức năng quét mã vạch, hay thông qua ứng dụng của bên thứ 3 (zalo, facebook, ...). Mã QR là một biểu tượng hai chiều, nó được phát minh vào năm 1994 bởi công ty Denso Wave (Nhật Bản). Thông tin thêm các bạn có thể xem [tại đây](https://aidcvn.com/ma-qr-code-la-gi.html#:~:text=M%C3%A3%20QR%20c%C3%B3%20b%E1%BB%91n%20m%E1%BB%A9c,v%E1%BB%B1c%20d%E1%BB%AF%20li%E1%BB%87u%20M%C3%A3%20QR.)
## Tạo QR code với qrcode
### Cài đặt thư viện qrcode
Đầu tiên chúng ta cần tạo mới một project. Và cài đặt thư viện express trên comand line với lệnh
>npm install express --save

Tiếp theo chúng ta sử dụng lệnh sau trên command line để cài đặt thư viện qrcode
> npm install qrcode --save

Hoặc bạn có thể cài đặt global với lệnh
> npm install -g qrcode

### Sử dụng thư viện qrcode
Bạn có thể tạo được một mã QR đơn giản với một vài dòng code như sau
```javascript
const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.get('/',async(req,res)=>{
    let img='';
    let qr= await QRCode.toDataURL('I am Cuamotcang!');
    console.log(qr);
    img = `<image src= " `+qr+ `" />`
    return res.send(img);
});

app.listen(3000, ()=>{
    console.log("app is running at port 3000")
})
```
Ví dụ trên mình đang tạo mã QR cho câu 'I am Cuamotcang'. Khi truy cập vào địa chỉ http://localhost:3000/ bạn sẽ thấy kết quả như sau. Bạn có thể lấy điện thoại ra để quét thử nhé! :wink:

![](https://images.viblo.asia/a1b75589-c78a-47ce-a3b0-0731974170c0.png)

Ngoài ra thông tin mã QR được in ra trong comand line bởi câu lệnh **console.log(qr)** ở trên sẽ như thế này:
> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOPSURBVO3BQY4jSQIDQWdA//+ybx/mwFMACUk1Nb00i38w84/DTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMefGmJPwklXck4ZNUbpLwk1TecZgph5lymCkvPkzlk5LwSSo3SXgiCU3lRuWTkvBJh5lymCmHmfLiy5LwhMoTSWgqLQk3KjcqLQlN5R1JeELlmw4z5TBTDjPlxV8mCU2lJaEloam0JPw/OcyUw0w5zJQXfxmVG5WWhBuVloSWhKbyX3aYKYeZcpgpL75M5Scl4ZtUPknlNznMlMNMOcyUFx+WhH+TSktCU2lJuElCU2lJaCo3SfjNDjPlMFMOM+XFm1R+kyTcJOEnqfyXHGbKYaYcZkr8gzckoam0JHySyk0SnlD5piR8kso3HWbKYaYcZkr8gy9KQlNpSbhRaUloKjdJaCo3SXhC5YkkNJWWhKbykw4z5TBTDjPlxb9M5SYJTyShqdwk4R1JuFF5QuUmCTcq7zjMlMNMOcyUFx+WhKZyk4QblSdUbpLQVFoSmspNEt6RhKZyo9KS8EmHmXKYKYeZ8uJNSWgqLQlN5UalJaGp3CShqdwkoam0JNyotCS0JDSVloSWhBuVbzrMlMNMOcyUF7+cSktCU3lC5QmVmyTcqLQkNJWbJNyofNJhphxmymGmvPhlkvBEEprKTRJuVG6S0FRaEloS3qFyk4Sm8o7DTDnMlMNMefHLqNwk4SYJTeVG5SYJTaUloam0JDSVmyQ0lZaEbzrMlMNMOcyUFz8sCU8koancJOGTVJ5Iwk0SnkhCU/mmw0w5zJTDTIl/8B+WhKbSktBUWhI+SeWJJNyo3CShqbzjMFMOM+UwU168KQk/SaWptCQ8odKScKPSknCThKbyjiR802GmHGbKYaa8+DCVT0rCTRKaSkvCTRJuVN6h8oTKEyqfdJgph5lymCkvviwJT6h8ksoTKi0JTyThHUloKj/pMFMOM+UwU178ZZLQVG5UblSeSMKNSkvCEyotCU3lHYeZcpgph5ny4i+j0pLwhMpNEppKU7lJQlO5SUJT+abDTDnMlMNMefFlKt+kcqPSktBUbpJwk4Sm0pLwDpWfdJgph5lymCkvPiwJPykJTaUl4R0qTyShqbQkPJGEn3SYKYeZcpgp8Q9m/nGYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgp/wPa0IYoBgikYgAAAABJRU5ErkJggg==

<br/>

Ngoài dạng Data URI ra thì qrcode còn hỗ trợ tạo mã qrcode với các dạng khác nhau như: String (toString), canvas (toCanvas), file (toFile), file stream (toFileStream). Sau đây là ví dụ tạo mã QR dưới dạng file:
```javascript
app.get('/',async(req,res)=>{
    await QRCode.toDataURL('cmc.png', 'I am Cuamotcang!');
    return res.send('hello');
});
```
Và đây là kết quả thu được truy cập **http://localhost:3000/**. Một file hình mới có tên cmc.png đã được tạo

![](https://images.viblo.asia/029499d4-5782-4aef-889a-db1187f5c76e.png)

### qrcode option
qrcode hỗ trợ  4 kiểu ký tự đầu vào khác nhau, và với mỗi loại thì sẽ tương ứng với số ký tự tối đa có thể mã hóa được.
| Kiểu dữ liệu | Loại ký tự | Khả năng mã hóa |
| - | - | - |
| Số đơn thuần | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 | Tối đa 7.089 ký tự |
|Số và chữ | 0–9, A–Z (upper-case only), space, $, % , +, -, ... |Tối đa 4.296 ký tự |
|Số nhị phân (8bit) | Ký tự từ bộ JIS X 0208 | Tối đa 2.953 byte |
| Kanji/Kana | Ký tự từ bộ ISO/IEC 8859-1 | Tối đa 1.817 ký tự |
<br/>
Ta cũng có thể trộn các kiểu mã hóa lại với nhau như trong ví dụ dưới đây:

```javascript
app.get('/',async(req,res)=>{
    let img='';
    const segs = [
        { data: 'CUAMOTCANG', mode: 'alphanumeric' },
        { data: '123', mode: 'numeric' }
    ]
    let qr= await QRCode.toDataURL(segs);
    img = `<image src= " `+qr+ `" />`
    return res.send(img);
});
```
Ngoài ra chúng ta cũng có thể thay đổi màu sắc, kích thước,  đuôi file, ... của mã QR được tạo ra. Chi tiết xem [tại đây](https://www.npmjs.com/package/qrcode#tofilepath-text-options-cberror). Dưới đây là một ví dụ minh họa:

```javascript
app.get('/',async(req,res)=>{
    let img='';
    const segs = [
        { data: 'CUAMOTCANG', mode: 'alphanumeric' },
        { data: '123', mode: 'numeric' }
    ]
    let qr= await QRCode.toDataURL(segs, {
        color: {
            dark: '#00F',
            light: '#0000'
        },
        width: 300,
        margin:10,
        scale: 10
    });
    img = `<image src= " `+qr+ `" />`
    return res.send(img);
});
```

## Lời kết
Đây là bài viết đầu tay của mình, hy vọng mọi người thích bài viết này. Trong bài viết còn có nhiều thiếu sót. Mong mọi người góp ý thêm ạ. Cám ơn mọi người đã đọc bài viết này. :grinning:

## Tham khảo
https://www.npmjs.com/package/qrcode

https://vi.wikipedia.org/wiki/M%C3%A3_QR

https://aidcvn.com/ma-qr-code-la-gi.html