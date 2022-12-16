Trong quá trình làm đồ án về IoT của mình ở trên trường dù mới bắt đầu nhưng cũng đã gặp những vấn đề khá thú vị . Đầu tiên là việc cân nhắc giữa sử dụng SQL và NoSQL đễ lưu dữ liệu thì mình nghĩ là đối vs SQL việc định nghĩa các bảng để lưu giữ liệu có vẻ như ko phải là giải pháp tốt trong quá trình phát triển . Vì lúc đầu có thể hệ thống chỉ có senser đo độ ẩm sau đấy thì lại cải tiến lên có cả senser nhiệt độ thì việc tạo thêm bảng để lưu sẽ phức tạp khi truy vấn giữa các bảng mà viết lại thì dữ liệu cũ xử lý thế nào ? . Nên mình quyết định sử dụng NoSql và thử thách lần này đó chính là thiết kế database lưu trữ dữ liệu time-series bằng Mongodb. Trong bài này mình sẽ đề cập đến cách thiết kế schema và cách nó tác động đến bộ nhớ trong việc read, write, update và delete mà mình đã đọc được .

<img src="https://techvccloud.mediacdn.vn/zoom/650_406/2019/11/19/190685293c6-1574148506110816522309-crop-15741485125351555183928.jpg" alt="Viblo logo">

# Dữ liệu Time-series là gì ?
**Time-series Data** : là một chuỗi các dữ liệu, thường là thu thập dữ liệu liên tiếp từ cùng một nguồn trong một khoảng thời gian. Việc phân tích dữ liệu theo thời gian này có mục đích là theo dõi những biến đổi theo thời gian. Dù là ngành công nghiệp gì thì nhu cầu truy vấn, phân tích và tạo báo cáo theo thời gian thực cũng có. Đối với một nhà giao dịch chứng khoán họ cần dữ liệu liên tục để chạy các thuật toán để phân tích xu hướng và xác định các cơ hội. 

Trong time-series data có 2 loại đó là 
* Chuỗi thời gian thông thường (regular time series), là loại đều đặn bắn dữ liệu .
* Chuỗi thời gian bất thường (events) là những sự kiện thỉnh thoảng nó mới bắn 1 cái.
# Thiết kế time-series schema

Đầu tiên mình muốn đề cập đó là không có kiểu thiết kế nào là phù hợp với mọi ứng dụng cả. Mà tùy vào yêu cầu của project của bạn mà bạn phải lựa chọn cho phù hợp. Để minh họa hãy giả sử cứ mỗi 1s sensor đo độ ẩm sẽ gửi dữ liệu đến server và bạn phải xử lý nó .

## Cách 1 : Cứ dữ liệu đến là lưu lại thành 1 document (One document per data point)
Giả sử đây là dữ liệu về thu thập độ ẩm theo mỗi giây .

```js
{
  "_id" : ObjectId("5b7d95438aef9316840a494a"),
  "hum" : "80.9",
  "symbol" : "humidity",
  "createdAt" : "2020-03-01T16:54:28.003Z"
},
{
  "_id" : ObjectId("5b7e7fc046e3641fcfd6b4dc"),
  "hum : "81.1",
  "symbol" : "humidity",
  "createdAt" : "2020-03-01T16:54:29.003Z"
},
...
```

## Cách 2 : Gộp dữ liệu lại và lưu mỗi document trong 1 phút (Time-based bucketing of one document per minute)
```js
{
    "_id" : ObjectId("5b5279d1e303d394db6ea0f8"), 
    "hum" : {
        "0" : "81.9",
        "1" : "81.5",
        "2" : "82.0",
        …
        "59" : "82.0"
    },
   "symbol" : "humidity",
   "createdAt" : "2020-03-01T17:41:10.008Z"
},
   {
    "_id" : ObjectId("5b5279d1e303d394db6ea134"), 
    "hum" : {
        "0" : "81.7",
        "1" : "80.4",
        "2" : "82.46",
        ...
       "59" : "81.5"
    },
    "symbol" : "humidity",
    "createdAt" : "2020-03-01T17:42:10.008Z"
},
...
```

## So sánh 2 thiết kế này
Vì không có nhiều thời gian để thu thập nên mình sẽ sử dụng một thống kê của bài viết mình đọc được để so sánh vậy . Đây là link bài viết : https://www.mongodb.com/blog/post/time-series-data-and-mongodb-part-2-schema-design-best-practices

Về cơ bản thì họ đối chiếu lượng dữ liệu được lưu trữ tác động như nào về kích thước lưu trữ và tác động đến bộ nhớ dựa trên dữ liệu thu thập trong 4 tuần 

### Việc tác động đến Storage
Việc sử dụng thiết kế 1 có vẻ là khá dễ hiểu nó cũng giống như một row trong bảng vậy . Với thiết kế này sẽ tạo ra một lượng lớn các documents

<img src="https://imgur.com/OoKa8B2.png" alt="Viblo logo">

Đây là so sanh về số lượng các documents

<img src="https://imgur.com/3unxOkn.png" alt="Viblo logo">

Đây là so sanh về kích thước dữ liệu ( đơn vị MB ) và kích thước lưu trữ 

Như đã thấy thì kích thước dữ liệu trong thiết kế 1 rất tốn bộ nhớ ( chú thích một xíu là tại sao Data size lại lới hơn nhiều Disk Storage Size đó là vì MongoDB’s WiredTiger storage engine đã nén dữ liệu lại trước khi lưu vào đĩa ) 
### Việc tác động đến việc sử dụng bộ nhớ
Một lượng lớn document sẽ không chỉ tăng kích thước lưu trữ dữ liệu mà còn tăng kích thước index . Không giống như một số cơ sở dữ liệu key-value tự định vị vị trí của nó, MongoDB cung cấp các index phụ cho phép bạn truy cập linh hoạt vào dữ liệu của mình hơn nữa cho phép bạn tối ưu hóa hiệu suất truy vấn. Túm lại là việc lưu index phục vụ cho truy vấn nhanh cũng tốn bộ nhớ như hình bên dưới thì việc đánh index cho document trong tuần thứ 4 của họ đã có kích thước là 103.03 MB rồi :v

<img src="https://imgur.com/ae3QRtL.png" alt="Viblo logo">

## Cách 3 : Size-based bucketing
Đặc điểm của loại thiết kế này phù hợp trong các trường hợp như dữ liệu ko được insert một cách đều đặn. Trong các ứng dụng dựa nhiều vào yếu tố thời gian như các project về IoT, dữ liệu cảm biến có thể được tạo ra trong khoảng thời gian không đều nghĩa là một số cảm biến có thể kích hoạt bằng điều kiện gì đó rồi cung cấp dữ liệu cho database ( lúc thì 1s gửi 1 lần lúc thì 15s gửi 1 lần ,v..v..). Trong những tình huống này thì việc áp dụng cách 2 có vẻ ko phải là một ý hay. Giải pháp thay thế đó là lưu theo kích thước. Với tính năng khóa dựa trên kích thước, chúng ta thiết kế schema xung quanh một document với một số điều kiện .

Ví dụ : chúng ta sẽ thiết kế với giới hạn là 200 events cho mỗi document hoặc hết thời gian là 1 ngày ( tùy vào điều kiện nào đến trước )

```js
{
    _id: ObjectId(),
    deviceid: 1234,
    sensorid: 3,
    nsamples: 5,
    day: ISODate("2018-08-29"),
    first:1535530412,
    last: 1535530432,
    samples : [
       { val: 50, time: 1535530412},
       { val: 55, time : 1535530415},
       { val: 56, time: 1535530420},
       { val: 55, time : 1535530430}, 
       { val: 56, time: 1535530432}
   ]
}
```

ví dụ trên là việc có gắng giới hạn số lượng insert thêm với mỗi document

```js
sample = {val: 59, time: 1535530450}
day = ISODate("2018-08-29")
db.iot.updateOne({deviceid: 1234, sensorid: 3, nsamples: {$lt: 200}, day: day},
                 {
                          $push: { samples: sample},
                          $min: { first: sample.time},
                          $max: { last: sample.time},
                          $inc: { nsamples: 1} 
                  }, 
                  { upsert: true } )
```  
Dữ liệu sẽ đc thêm vào cho đến khi đạt max là 200 sau đó nó sẽ tự tạo một document mới dựa theo lệnh (`upsert: true`) .

Lợi thế của cách này đó là khi chúng ta lấy dữ liệu theo thời gian ví dụ theo 1 ngày hoặc trong khoảng vài ngày sẽ vô cùng hiệu quả .Việc sử dụng cách này là một trong những cách hiệu quả nhất để lưu trữ dữ liệu IoT trong MongoDB.

Đây là những cách mà mình tổng hợp hi vọng sẽ giúp mọi người có thể chọn được cách thiết kế phù hợp với ứng dụng của mình .

Bài viết tham khảo : https://www.mongodb.com/blog/post/time-series-data-and-mongodb-part-2-schema-design-best-practices