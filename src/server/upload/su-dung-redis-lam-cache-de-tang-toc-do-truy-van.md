# 1. Redis là gì?
Redis là một mã nguồn mở (BSD licensed) được sử dụng như một database, cache hoặc message broker.

Một số đặc điểm của Redis:
* Là cơ sở dữ liệu NoSQL, lưu trữ dữ liệu dưới dạng KEY-VALUE
* Lưu trữ dữ liệu trên RAM, giúp việc truy xuất dữ liệu cực kì nhanh chóng.
* Hỗ trợ nhiều cấu trúc dữ liệu cơ bản như Hash, List, Set, Sorted Set, String,....
* Hỗ trợ cơ chế Pub/Sub messaging.

Nhờ đặc điểm giúp giảm thời gian truy vấn, nên Redis có tác dụng rất mạnh mẽ trong việc sử dụng làm cache cho các ứng dụng web.
# 2. Sử dụng Redis trong việc cache dữ liệu
## 2.1. Các chiến thuật Caching
### 2.1.1. Cache Aside:
* Khi ứng dụng cần đọc dữ liệu từ database, nó sẽ kiểm tra trước xem cache có chứa dữ liệu mình cần không.
* Nếu có (cache hit) thì trả về dữ liệu cần truy vấn.
* Nếu dữ liệu không có sẵn trong cache (cache miss) thì ứng dụng sẽ lấy dữ liệu từ database.
![](https://images.viblo.asia/5e812aa3-0d82-4e71-bc64-ab1deaf733d7.png)
### 2.1.2. Read Through:
Giống với cache aside nhưng ở đây, việc lấy dữ liệu từ database khi cache miss là của cache (thường được hỗ trợ bởi thư viện hoặc nhà cung cấp cache độc lập)
![](https://images.viblo.asia/8e7b044d-1732-4f3a-8512-cf6711fbad04.png)
### 2.1.3. Write Through:
Dữ liệu được ghi vào cache và sau đó được lưu vào database. Khi được sử dụng cùng với phương pháp read through thì sẽ giúp dữ liệu có tính nhất quán, không phải sử dụng những kĩ thuật cache invalidation.
![](https://images.viblo.asia/3d6358f8-6af6-4abd-aded-948797ef2731.png)
### 2.1.4. Write Back:
Ứng dụng lưu mọi thứ vào trong cache, rồi sau một khoảng thời gian delay nào đó cache sẽ lưu lại tất cả vào database. Chiến thuật này thường được dùng cho các ứng dụng nặng, nhưng có nhược điểm là nếu xảy ra lỗi trước khi cache lưu dữ liệu vào database thì những dữ liệu vừa lưu trong cache sẽ bị mất.
![](https://images.viblo.asia/383eae8c-acd1-42d4-a28e-88e15da2fc04.png)
## 2.2. Cache invalidation
Khi dữ liệu trong database bị thay đổi thì dữ liệu trong cache đã bị cũ và không còn chính xác. Lúc này, cần thực hiện update hoặc gỡ bỏ những dữ liệu đã hết hạn trong cache, quá trình này gọi là cache invalidation.

=> Giải pháp:
* Có thể cài thời gian sống (TTL) cho mỗi dữ liệu cache, tùy theo tần số thay đổi của dữ liệu, tần suất được truy vấn của dữ liệu, độ quan trọng của dữ liệu,...
* Để tránh tình huống nhiều người dùng đang sử dụng ứng dụng, đúng lúc cache hết hạn đồng loạt khiến server đột ngột chịu tải lớn thì có thể đặt thời gian sống của mỗi dữ liệu khác nhau bằng cách đặt TTL là một giá trị ngẫu nhiên trong một khoảng nào đó.

# 2.3. Demo
```javascript
const redis = require('redis');
const randomInt = require('random-int');


const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

async function getRepos(req, res, next){
    try {
        console.log('Fetching data...');
        const username = req.body.username;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        const repos = data.public_repos;
        //send data to redis
        client.setex(username, randomInt(3600, 4200), repos);
        res.render('repos', {repos_result: repos});
    } catch (err){
        console.error(err);
        res.status(500);
    }
}

//cache middleware
function cache(req, res, next){
    const username = req.body.username
    client.get(username, (err, data) =>{
        if(err) throw err;

        if(data !== null){
            res.render('repos', {repos_result: data});

        }else{
            next();
        }
    })
}

router.post('/', cache, getRepos);
```
* Hàm getRepos:
    * Mục đích: Lấy ra số repository của một Github user nào đó.
    * API: https://api.github.com/users/${username} 
    * Sau khi fetch dữ liệu, ghi dữ liệu lấy được vào Redis.
* Hàm cache: Đây là middleware để kiểm tra xem dữ liệu có đang được lưu trong Redis hay không.
* Ở đây dùng chiến thuật cache aside, nếu kiểm tra trong cache không có dữ liệu cần lấy thì ứng dụng sẽ chuyển sang lấy dữ liệu qua API.
* TTL được set là một giá trị ngẫu nhiên trong khoảng (3600, 4200).

**Kết quả**

Truy vấn lần 1:
![](https://images.viblo.asia/68775650-8223-42d1-8e2a-867e254d559f.png)
Sau khi truy vấn lần đầu tiên với username được nhập vào là “dantokoro”, ta thấy repos chạy tốn 823ms. Sau khi được truy vấn lần đầu, kết quả sẽ được lưu vào redis server.
 
 Truy vấn lần 2:
 ![](https://images.viblo.asia/8d2d618c-7772-43b6-b716-fa9d195a9e12.png)
Truy vấn lại với username “dantokoro” như trên, ta thấy thời gian truy vấn nhanh hơn gần 20 lần do thay vì lấy dữ liệu từ api thì ứng dụng lấy dữ liệu từ redis.

Kiểm tra dữ liệu trên Redis:
![](https://images.viblo.asia/385ab795-d9ba-486e-ba60-6a99423a410c.png)
Mở Redis CLI, gõ câu lệnh KEYS * để lấy ra tất cả key đang được lưu, thấy Redis đang lưu key là dantokoro.

# Kết
Từ demo phía trên, ta có thể thấy rõ được tác dụng của Redis trong việc làm tăng tốc độ lấy dữ liệu. Việc sử dụng Redis làm cache phù hợp với hệ thống mà có những dữ liệu được user truy cập thường xuyên. Ngoài việc sử dụng làm cache, Redis còn vô vàn những ứng dụng hữu ích khác mà chúng ta nên tìm hiểu thêm.

Link github cho demo phía trên: https://github.com/dantokoro/demo-redis.git
(Link này bao gồm cả demo ứng dụng Redis để lưu session, các bạn có thể tham khảo thêm).

Cảm ơn đã theo dõi :D 

# Tài liệu tham khảo
1. https://medium.com/vunamhung/redis-l%C3%A0-g%C3%AC-t%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-c%C6%A1-s%E1%BB%9F-d%E1%BB%AF-li%E1%BB%87u-redis-60dd267f53ad
2. https://neopatel.blogspot.com/2012/04/adding-jitter-to-cache-layer.html
3. https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/
4. https://github.com/jankleinert/redis-session-demo