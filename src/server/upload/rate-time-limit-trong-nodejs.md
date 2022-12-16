Chào các bạn, lại là mình đây. Hôm nay mình xin giới thiệu tới các bạn một kỹ thuật rất hay ho và hữu ích đó là Rate Limiting
##  1. Rate Limiting là gì?
Rate limiting được hiểu đơn giản là hạn chế (limit) lượng yêu cầu (request) tới server. Trên thực tế, người ta phải sử dụng 1 số thuật toán để đảm bảo chạy nhanh, chính xác mà lại ít tốn bộ nhớ. Giả sử như hệ thống của chúng ta nhận được hàng nghìn request nhưng mà trong số đó chỉ xử lí được trăm request/s chẳng hạn, và số request còn lại thì bị lỗi (do CPU hệ thống đang quá tải không thể xử lí được).

Để giải quyết được vấn đề này thì cơ chế Rate Limiting đã ra đời. Mục đích của nó chỉ cho phép nhận 1 số lượng request nhất định trong 1 đơn vị thời gian. Nếu quá sẽ trả về response lỗi.

## 2. Lợi ích, ứng dụng thực tế
* Hạn chế được việc bị tấn công DDOS (Distributed Denial of Service)
* Brute force password trong hệ thống (quét kiểu vét cạn)
* Hạn chế spam hệ thống, hạn chế số lượng request thừa phải xử lý

Có thể tìm hiểu thêm về tấn công DDOS [Tại đây](https://vi.wikipedia.org/wiki/T%E1%BA%A5n_c%C3%B4ng_t%E1%BB%AB_ch%E1%BB%91i_d%E1%BB%8Bch_v%E1%BB%A5), Brute force password [tại đây](https://quantrimang.com/cuoc-tan-cong-brute-force-la-gi-157987) 
## 3. express-rate-limit
Trong NodeJS, ta có thể dễ dàng tạo ra Rate Limiting với express-rate-limit.

### Cài đặt
Như mọi thư viện khác, ta có thể cài đặt express-rate-limit với lệnh
> $ npm install --save express-rate-limit
### Usage
Sau Khi tạo được một project. Ta có thể sử dụng express-rate-limit với một vài dòng như sau:
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const port = 3000;

const app = express();
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    message: 'Too many connection',
});

app.get('/', apiLimiter, (req,res) => {
   res.send(`I'm CuaMotCang`);
})

app.listen(port, () => {
    console.log('App is running');
})
```
Ở ví dụ trên mình đã tạo **Rate Limiting** cho mỗi địa chỉ IP chỉ được truy cập tối đa 2 lần mỗi phút.
Ta có thể kiểm tra bằng **Postman** 

![](https://images.viblo.asia/44f8f769-957e-435d-92ba-2726be27d844.png)
![](https://images.viblo.asia/185d780c-0263-4cd7-a65f-21a7410d19b3.png)

Hình đầu tiên là kết quả trả về khi ta truy cập đường dẫn lần đầu tiên. Hình thứ 2 là kết quả trả về khi truy cập lần thứ 3 trở đi trong vòng 1 phút so với request đầu tiên. Đơn giản qúa phải không nào? :stuck_out_tongue_winking_eye: :stuck_out_tongue_winking_eye:
### Rate limit options
* windowMS: Thời gian của một chu kỳ (tính bằng millisecond)
* Max: Lượng request tối đa có thể gửi trong 1 chu kỳ (VD: windowMS = 36000, max = 1000 => có thể gửi tối đa trong vòng 1h có thể gửi tối đa 1000 request)
* Message: Thông báo trả về client khi truy cập quá số lần quy định
* Handler: Một cách đơn giản hơn khi trả về client kiểu dữ liệu theo ý muốn. Mình trả về dữ liệu dạng object cho client. 429 là giá trị trả về khi lượng request vượt quá giới hạn.
    ``` javascript
    const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    handler: function (req, res) {
            res.status(429).send({
                status: 500,
                message: 'Too many requests!',
            });
        },
    });
    ```
    Và đây là kết quả:

    ![](https://images.viblo.asia/9fe5ec4a-2c8f-44d2-bf11-ba09ec4ec586.png)
* Skip: Có thể sử dụng nó như một white list. Ví dụ sau đây mình bypass địa chỉ local để có thể sử dụng địa chỉ này để thoải mái gửi request mà không bị chặn bởi **Rate Limiting**.
```javascript
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Too many requests!',
        });
    },
    skip: (req, res) => {
        if(req.ip === '::ffff:127.0.0.1')
            return true;
        return false;
    }
});
```
Ngoài ra còn một số option khác bạn có thể xem chi tiết [tại đây](https://www.npmjs.com/package/express-rate-limit).
### Script testing
Để đơn giản hơn cho việc thử nghiệm code với số lượng request lớn và thời gian lớn hơn bạn có thể tham khảo script sau:
``` javascript
const URL = 'http://localhost:3000/';

const request = require('request');
const req = async (url) => {
    return request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: url,
    }, function(error, response, body){
        console.log(body)
    })
};
setInterval(async () => {
    await req(URL);
}, 1000)
```
Script này sẽ request lên địa chỉ *http://localhost:3000/* mỗi 1 giây. Bạn có thể tùy biến tùy theo mục đích.
## Lời kết
Hy vọng bài viết này sẽ ít nhiều giúp ích cho các bạn. Trong bài viết còn nhiều thiếu sót, hy vọng được mọi người góp ý :blush::blush:

Tài liệu tham khảo:
* [https://toidicodedao.com](https://toidicodedao.com/2020/03/17/rate-limiting-chong-ddos-p1/)
* [https://www.npmjs.com/package/express-rate-limit](https://www.npmjs.com/package/express-rate-limit)