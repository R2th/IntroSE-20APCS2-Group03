## Một tí gọi là lý thuyết để anh em tham khảo
### Cache là gì?
"Caching là một kỹ thuật tăng độ truy xuất dữ liệu và giảm tải cho hệ thống. Cache là nơi lưu tập hợp các dữ liệu, thường có tính chất nhất thời, cho phép sử dụng lại dữ liệu đã lấy hoặc tính toán trước đó, nên sẽ giúp tăng tốc cho việc truy xuất dữ liệu ở những lần sau.". Em xin phép được trích nguồn các bác muốn đọc thêm thì bơi vào  [đây](https://viblo.asia/p/caching-la-gi-va-no-hoat-dong-nhu-the-nao-m68Z0QpXlkG)
### Lợi ích của việc cache data
- Tăng tốc độ xử lý, thay vì phải gọi API bên thứ ba hoặc query database nhiều lần. Ngoài ra, giảm số lần gọi API hoặc query database còn giảm thiểu băng thông truyền tải giữa các server và giảm thiểu xử lý từ CPU nhất là với những dữ liệu được sử dụng nhiều lần trong ứng dụng.
- Vẫn có thể truy vẫn được data khi không có kết nối giữa các server.
- Đáp ứng được truy vấn lớn trong thời gian ngắn. trả về dữ liệu gần như ngay lập tức với những dữ liệu có trong bộ nhớ cache.
### Cũng có một số hạn chế
- Nói túm lại thì cache cũng là một kỹ thuật dùng bộ nhớ để để tốc độ nên dĩ nhiên là tốn thêm một vùng nhớ để lưu dữ liệu cache (dù cũng không nhiều mấy).
- Nếu data cache chỉ dùng đúng một lần thì việc cache không những không có lợi ích gì mà còn làm chậm ứng dụng.
- Nếu không xóa cache khi không còn sử dụng sẽ gây ra việc lãng phí bộ nhớ.

### Redis là gì?
"Redis là gì? – Redis (REmote DIctionary Server) là một mã nguồn mở được dùng để lưu trữ dữ liệu có cấu trúc, có thể sử dụng như một database, bộ nhớ cache hay một message broker." Em lại xin phép trích nguồn, các bác muốn đọc thêm tí lý thuyết thì bơi vào  [đây](https://topdev.vn/blog/redis-la-gi/). Nói túm lại là không phải code NodeJS mới dùng Redis mà nó có thể lưu tùm lum thứ.
### Redis hoạt động như thế nào
"Khác với RDMS như MySQL, hay PostgreSQL, Redis không có bảng. Redis lưu trữ data dưới dạng key-value. Thực tế thì memcache cũng làm vậy, nhưng kiểu dữ liệu của memcache bị hạn chế, không đa dạng được như Redis, do đó không hỗ trợ được nhiều thao tác từ phía người dùng. Dưới đây là sơ lược về các kiểu dữ liệu Redis dùng để lưu value." tớ lại xin trích của bạn @NTPhuongThao - https://viblo.asia/p/nguyen-tac-hoat-dong-cua-redis-server-naQZRq7GKvx

## Sử dụng Redis trong thực tế
![Sử dụng Redis trong thực tế](https://images.viblo.asia/89732de7-b554-422a-9ed9-e4ef9352fc29.png)
Để hạn chế việc request nhiều lần đến server khách hoặc xử lý phức tạp, khi một request được gọi đến server thì trước tiên server sẽ kiểm tra xem dữ liệu có trong server redis hay chưa?
Nếu có rồi thì lấy dữ liệu trong cache trả về cho người dùng.
Nếu chưa có thì thực hiện thao tác, trả về cho người dùng đồng thời cũng lưu dữ liệu đó vào cache.

Tớ không có code ở đây nên dịch tạm một bài ví dụ về việc tạo một server có redis và kiểm tra tốc độ response khi bộ nhớ cache có data và khi bộ nhớ cache không có data.

Tạo mới một thư mục:
`mkdir redis-cache`

Cd đến thư mục vừa được tạo:
`cd redis-cache`

Tạo file package.json file:
`npm init --force`

--force Tạo file pakage.json với các giá trị mặc định mà bạn không bị hỏi thêm thông tin gì. Sau khi hoàn thành bạn sẽ có một file pakage.json trong thư mục hiện tại.

Tạo một file server.js ở thư mục hiện tại.

Cài đặt Express, Redis, and node-fetch modules:
`npm install --save node-fetch express redis`

Bây giờ Redis đã được cài đặt và các bạn có thể coppy đoạn code này vào file server.js.

```
const express = require('express')
const fetch = require("node-fetch");
const redis = require('redis')
 
// create express application instance
const app = express()
 
// create and connect redis client to local instance.
const client = redis.createClient(6379)
 
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});
 
// get photos list
app.get('/photos', (req, res) => {
 
    // key to store results in Redis store
    const photosRedisKey = 'user:photos';
 
    // Try fetching the result from Redis first in case we have it cached
    return client.get(photosRedisKey, (err, photos) => {
 
        // If that key exists in Redis store
        if (photos) {
 
            return res.json({ source: 'cache', data: JSON.parse(photos) })
 
        } else { // Key does not exist in Redis store
 
            // Fetch directly from remote api
            fetch('https://jsonplaceholder.typicode.com/photos')
                .then(response => response.json())
                .then(photos => {
 
                    // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                    client.setex(photosRedisKey, 3600, JSON.stringify(photos))
 
                    // Send JSON response to client
                    return res.json({ source: 'api', data: photos })
 
                })
                .catch(error => {
                    // log error message
                    console.log(error)
                    // send error to the client 
                    return res.json(error.toString())
                })
        }
    });
});
 
// start express server at 3000 port
app.listen(3000, () => {
    console.log('Server listening on port: ', 3000)
});
```

Và bây giờ một server sử dụng redis để cache data đã hòa thành, bây giờ chúng ta sử dụng postman để thử xem redis có hiệu quả không.

Ở request đầu tiên,
![](https://images.viblo.asia/19ba6261-d32f-4148-985a-3e7387118166.png)

Redis chưa cache data, server phải gửi reqest đến server khác để lấy data nên reponse tốn nhiều thời gian (3325 milliseconds).

Nhưng từ request thứ 2 trở đi,
![](https://images.viblo.asia/579cfad2-861e-4f80-a887-06d7fbb24155.png)

Redis đã có data cache từ request trước nên reponse về rất nhanh (1048 milliseconds).

Tài liệu tham khảo: https://medium.com/tech-tajawal/introduction-to-caching-redis-node-js-e477eb969eab, https://viblo.asia/p/caching-la-gi-va-no-hoat-dong-nhu-the-nao-m68Z0QpXlkG, https://topdev.vn/blog/redis-la-gi, https://viblo.asia/p/nguyen-tac-hoat-dong-cua-redis-server-naQZRq7GKvx