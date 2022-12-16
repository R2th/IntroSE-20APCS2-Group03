![](https://images.viblo.asia/265c6115-4a84-4bb7-b533-dffa06ed208a.png)
## 1. Vấn đề
  Thường thì máy chủ phụ trợ của bạn cần giao tiếp với các dịch vụ hạ nguồn, API của bên thứ ba và cơ sở dữ liệu. Những giao dịch này tốn cả thời gian và tiền bạc. Ví dụ, hãy xem xét API của bạn tìm nạp các bộ phim phổ biến từ API phim tính phí cho bạn dựa trên mỗi cuộc gọi bạn thực hiện hoặc, bạn cần phải có ngày tham gia của người dùng vào ứng dụng của mình để hiển thị trên hồ sơ của họ. Danh sách các bộ phim nổi tiếng không có khả năng thay đổi trong một vài giờ trong khi ngày tham gia của người dùng hoàn toàn không bị thay đổi.

Để tìm nạp dữ liệu phim phổ biến, mỗi lần bạn gọi API của bên thứ ba để có được thông tin giống như bạn đã nhận được một phút trước. Điều này sẽ thêm các vấn đề hiệu suất đáng chú ý và chi phí cao hơn cho ứng dụng của bạn. Tương tự, đối với một hồ sơ được truy cập thường xuyên, cơ sở dữ liệu liên tục được truy vấn cho cùng một dữ liệu và chắc chắn sẽ cung cấp các hóa đơn nặng.

Có một giải pháp đơn giản cho vấn đề này - Bộ nhớ đệm.
## 2. Giải pháp

### Bộ nhớ đệm

Bộ nhớ đệm là quá trình lưu trữ dữ liệu trong lớp lưu trữ dữ liệu tốc độ cao (bộ đệm). Bộ nhớ cache thường được lưu trữ trong phần cứng truy cập nhanh và hiệu quả hơn so với tìm nạp dữ liệu từ kho lưu trữ dữ liệu chính mà ứng dụng sử dụng.
Đây là một ví dụ rất cơ bản về bộ nhớ đệm - ghi nhớ. Lưu ý rằng ghi nhớ là một hình thức lưu trữ rất cụ thể liên quan đến việc lưu trữ giá trị trả về của hàm dựa trên các tham số của nó.

Tính số thứ n trong [chuỗi Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) .
```
const Dailymotion = (n) => { 
  if (n <2) return n; 

  return Dailymotion (n - 1) + Dailymotion (n - 2); 
}
```

Về cơ bản, đoạn trích ở trên gọi đệ quy phương thức này cho (n - 1) và (n - 2) và thêm nó lại với nhau, chia nó ra cho n = 4.
Đây là ngăn xếp cuộc gọi sẽ như thế nào:

![](https://images.viblo.asia/0163cb51-49d7-44ad-80c8-c77c101b88c5.png)
                                       *Callstack cho n = 4 mà không lưu trữ / ghi nhớ*
  
  Như bạn có thể thấy, chúng tôi tính toán `fibonacci(2)` có thể được coi là một hoạt động tiêu tốn tài nguyên tương đối nhiều lần. Về cơ bản, chúng tôi có thể lưu trữ giá trị cho `fibonacci(2)` một nơi nào đó khi chúng tôi tính toán nó lần đầu tiên và sử dụng giá trị của cửa hàng lần thứ hai để tăng tốc quá trình.

```
const Dailymotion = (n, bộ đệm) => { 
  cache = bộ đệm | | {}; 

  if (cache [n]) trả lại cache [n]; 
  if (n <2) trả về n; 

  return cache [n] = Dailymotion (n - 1, cache) + Dailymotion (n - 2, cache); 
}
```

Đây là ngăn xếp cuộc gọi được cập nhật với quá trình ghi nhớ:

![](https://images.viblo.asia/7c74d68c-11ad-48e3-84f7-6ba43ef1278d.png)
                                      *Callstack cho n = 4 với bộ nhớ đệm / ghi nhớ*

Như bạn có thể thấy, chúng tôi đã có thể giảm thời gian tính toán với việc ghi nhớ chỉ là một hình thức lưu trữ. Bây giờ, hãy sử dụng kỹ thuật này để phản hồi bộ đệm từ dịch vụ API của bên thứ ba bằng Redis.

### Redis

[Redis](https://redis.io/)  là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ nguồn mở, được sử dụng làm cơ sở dữ liệu, bộ đệm và môi giới tin nhắn. Tìm các hướng dẫn để tải nó trên máy cục bộ của bạn ở [đây](https://redis.io/download) .

## 3.Demo

Hãy thiết lập một dự án nút đơn giản để kiểm tra điều này. Trong thư mục dự án của bạn, chạy `npm init` để bắt đầu dự án nút. Trả lời tất cả các lời nhắc một cách thích hợp và sau đó tạo một tệp mới được gọi `index.js`  trong thư mục dự án.

Cài đặt tất cả các phụ thuộc mà chúng tôi sẽ sử dụng cho bản demo này:
```
npm i express redis node-fetch
```

Chúng tôi có một điểm cuối đơn giản cung cấp chi tiết về các lần ra mắt mới nhất của SpaceX.

```
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/spacex/launches", (req, res) => {  
  fetch("https://api.spacexdata.com/v3/launches/latest")
    .then(res => res.json())
    .then(json => { res.status(200).send(json) })
    .catch(error => {
      console.error(error);
      res.status(400).send(error);
    });
});
app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
```

Sau khi bạn chạy máy chủ bằng cách sử dụng, nó sẽ khởi động tại `localhost:4000`. Tôi đang sử dụng [Postman](https://www.postman.com/) để kiểm tra API của mình.
```
GET localhost:4000/spacex/launches
```

kết quả trong,

![](https://images.viblo.asia/b400ee8c-bb9c-48f3-bcb2-04edf2e4b968.png)
                                      *Thời gian phản hồi API 489 ms*
 
 Lưu ý thời gian trong hộp màu đỏ trên screengrab ở trên. Đó là 489ms. Bây giờ hãy thêm bộ nhớ đệm bằng Redis. Hãy chắc chắn rằng bạn có Redis chạy trên máy cục bộ của bạn. Chạy:
 
```
redis-server
```

 trên một cửa sổ thiết bị đầu cuối mới. Nó sẽ trông giống như thế này:
 
 ![](https://images.viblo.asia/8eb4a124-a87c-49b1-a5a0-cbd3f9e2d062.png)
 *Redis máy chủ screengrab*
 
 Bây giờ, hãy thêm phần mềm trung gian để kiểm tra xem khóa có tồn tại trong bộ đệm hay không, nếu không thì hãy lấy nó từ API của bên thứ ba và cập nhật bộ đệm.
 
```
"use strict";
const express = require("express");  
const fetch = require("node-fetch");
const redis = require("redis");
const PORT = process.env.PORT || 4000;
const PORT_REDIS = process.env.PORT || 6379;
const app = express();
const redisClient = redis.createClient(PORT_REDIS);
const set = (key, value) => {
   redisClient.set(key, JSON.stringify(value));
}
const get = (req, res, next) => {
	let key = req.route.path;
    redisClient.get(key, (error, data) => {
      if (error) res.status(400).send(err);
      if (data !== null) res.status(200).send(JSON.parse(data));
      else next();
 	});
}
app.get("/spacex/launches", get, (req, res) => {
  fetch("https://api.spacexdata.com/v3/launches/latest")
    .then(res => res.json())
    .then(json => {
    	set(req.route.path, json);
    	res.status(200).send(json);
    })
    .catch(error => {
      console.error(error);
      res.status(400).send(error);
    });
});
app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
```

Sau khi bạn nhận phương thức GET trên localhost:4000/spacex/launches, nó vẫn sẽ mất khoảng thời gian như lần đầu tiên chạy trước khi thêm Redis. Điều này là do bộ đệm không có khóa đó và hiện đã cập nhật nó. Khi chạy nó lần thứ hai, bạn sẽ có thể thấy sự khác biệt.

![](https://images.viblo.asia/065e4a28-a0fc-43ef-9695-1b6cf269a22e.png)
                                       *Thời gian phản hồi API 23 ms*
 
 Một cạm bẫy rất rõ ràng trong việc triển khai này là một khi chúng ta thêm nó vào bộ đệm, chúng ta sẽ không bao giờ lấy giá trị cập nhật từ API của bên thứ ba. Đây có lẽ không phải là hành vi dự kiến. Một cách để chống lại điều này là sử dụng `setex` trong đó có một đối số hết hạn. Nó chủ yếu chạy hai hoạt động chính  `SET` và `EXPIRE`. Sau thời gian hết hạn đã đặt, chúng tôi sẽ tìm lại dữ liệu từ API của bên thứ ba và cập nhật bộ đệm.

##  4. Kết luận

Bộ nhớ đệm là một công cụ mạnh mẽ khi được sử dụng đúng cách. Xem xét loại dữ liệu và tầm quan trọng của giá trị mới nhất, bộ đệm có thể được thêm vào để cải thiện hiệu suất, độ tin cậy và giảm chi phí.

[Nguồn dịch](https://codeburst.io/caching-api-with-redis-and-node-b6f76831b442)