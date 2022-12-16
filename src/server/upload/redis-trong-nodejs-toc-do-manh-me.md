![](https://images.viblo.asia/6bddb7ed-1b97-4dfe-9d16-3b7539286675.png)

-----


Như chúng ta đã biết **Redis** là một hệ thống lưu trữ dữ liệu dưới dạng *Key-Value* rất mạnh mẽ và phổ biến hiện nay. Redis nổi bật bởi việc hỗ trợ nhiều cấu trúc dữ liệu cơ bản như:hash, list, set, sorted set, string… Tất cả dữ liệu được ghi và lưu trên ram, do đó tốc độ đọc ghi dữ liệu rất là nhanh. Và trong bài viết này mình sẽ làm một ví dụ nho nhỏ để sử dụng và so sánh tốc độ khi sử dụng **Redis**. Bắt đầu thôi nào.
## Cài đặt server Redis
Bạn có thể dùng server window hoặc linux. Trong ví dụ này mình đang sử dụng server Redis cho window. Cài đặt server Redis cho window 
[tại đây](https://www.onlinetutorialspoint.com/spring-boot/setup-install-redis-server-on-windows-10.html).
Sau khi cài đặt xong server Redis. Trong folder vừa được cài đặt, chạy file redis-server.exe để khởi động server. 

-----

![](https://images.viblo.asia/929199b7-796d-4f7e-a02e-08cc218653e3.png)

## Cài đặt thư viện
Đầu tiên chúng ta cần tạo mới một project. Và cài đặt thư viện express trên comand line với lệnh
```
npm install express --save
```
Tiếp theo chúng ta sử dụng lệnh sau trên command line để cài đặt thư viện redis
```
npm install redis --save
```
## Sử dụng thư viện
### Trường hợp không dùng redis
Với trường hợp không dùng redis, tạo file withoutRedis.js, chúng ta sẽ tiến hành gọi api https://jsonplaceholder.typicode.com/todos/1 và ghi lại thời gian phản hồi của api đó.
```javascript
const express = require('express');
const axios = require('axios');
const PORT = 3002;
const app = express();

app.get('/', async (req, res) => {
    try {
        console.time('LOG_TIME');
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
        }).then(async response => {
            const {userId} = response.data;
            console.timeEnd('LOG_TIME');
            return res.json({userId});
        }).catch(async e => {
            console.log(e);
            return res.json({status: 500, message: 'error'});
        })
    } catch (e) {
        console.log(e);
    }
});

app.listen(PORT, (req, res) => {
    console.log('App is runing at port ', PORT);
})
```
Gọi api khoảng 10 lần bằng terminal ta được kết quả như hình bên dưới.

![image.png](https://images.viblo.asia/841c663e-532c-4cd1-b63c-255488d2af1c.png)

-----
Kết quả cho thấy, ta mất khoảng 150-400ms cho việc lấy dữ liệu từ api. Và giờ ta sẽ sử dụng Redis để xem kết quả sẽ như thế nào nhé.
### Sử dụng Redis
Tương tự với trường hợp ở trên, bây giờ ta sẽ tiến hành gọi api https://jsonplaceholder.typicode.com/todos/1 nhưng sẽ sử dụng redis.
Tạo file withRedis.js với vài dòng code sau:
```javascript
const express = require('express');
const axios = require('axios');
const PORT = 3001;
const app = express();
const redis = require('redis');

app.get('/', async (req, res) => {
    try {
        const client = redis.createClient();
        await client.connect();
        console.time('LOG_TIME');
        const value = await client.get('userId');
        //value is exists
        if(value) {
            console.timeEnd('LOG_TIME');
            return res.json({status: 200, message: 'OK'})
        }
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
        }).then(async response => {
            const {userId} = response.data;
            //send data to redis
            await client.set('userId', userId);
            console.timeEnd('LOG_TIME');
            return res.json(JSON.stringify(response.data));
        }).catch(async e => {
            console.log(e);
            return res.json({status: 500, message: 'error'});
        })
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
});

app.listen(PORT, (req, res) => {
    console.log('App is runing at port ', PORT);
})
```
Chạy file withRedis.js sau đó gọi API lần đầu tiên.
**Lưu ý:** chạy server redis trước khi chạy file withRedis.js

![image.png](https://images.viblo.asia/b2b9ab9c-8d14-4ad0-b74c-2264c4d1164f.png)

-----
Phải mất tới hơn 3s để có thể hoàn thành việc lấy dữ liệu từ api. Tuy nhiên sự chậm trễ đó là do việc sử dụng redis để lưu lại dữ liệu từ api. Check dữ liệu từ server redis (chạy file **redis-cli.exe**):

![image.png](https://images.viblo.asia/5731707d-43cc-4d5e-89e0-dbae6a27cbb4.png)

-----
Tuy nhiên chúng ta hãy thử gọi api thêm 10 lần nữa xem sao nhé!

![image.png](https://images.viblo.asia/ce1bba46-4e41-44d0-9980-971ce0daf923.png)

-----
Với các lần tiếp theo, việc lấy dữ liệu chỉ còn mất từ 0.3-0.4ms. Quá nhanh so với việc không sử dụng redis. Sự nhanh chóng là do khi data đã được lưu trữ tại server redis thì ta sẽ không cần gọi tới api  https://jsonplaceholder.typicode.com/todos/1 để lấy dữ liệu nữa mà sẽ lấy thẳng dữ liệu từ server redis.
## Lời kết
Với ví dụ trên, hy vọng giúp ích cho các bạn khi tìm hiểu và sử dụng redis. Bài viết còn nhiều thiếu sót, hy vọng được các bạn góp ý.
Nhân dịp đầu xuân năm mới, kính chúc các bạn thật nhiều sức khỏe và thành công. 😄


Tài liệu tham khảo: 
* [https://topdev.vn/blog/redis-la-gi](https://topdev.vn/blog/redis-la-gi/)
* https://www.onlinetutorialspoint.com/spring-boot/setup-install-redis-server-on-windows-10.html
* https://www.npmjs.com/package/redis