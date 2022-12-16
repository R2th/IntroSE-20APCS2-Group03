### 1. Xử lý array
Bài viết hôm nay sẽ chia sẻ về việc lưu cả 1 list vào trong environment

Mình xử dụng luôn api test của Postman: https://postman-echo.com/post

Body là:
```
{
    "book": [
        {
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
        },
        {
            "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": 12.99
        },
        {
            "category": "fiction",
            "author": "Herman Melville",
            "title": "Moby Dick",
            "isbn": "0-553-21311-3",
            "price": 8.99
        },
        {
            "category": "fiction",
            "author": "J. R. R. Tolkien",
            "title": "The Lord of the Rings",
            "isbn": "0-395-19395-8",
            "price": 22.99
        }
    ]
}
```
![](https://images.viblo.asia/0f2f9349-be67-46b3-88b0-c1c2fb263ca6.png)

Nhiệm vụ bây giờ là: Save toàn bộ author vào 1 array, sau đó save array vào environment
![](https://images.viblo.asia/ecee8c89-b767-48a6-aa4b-852ea3553e53.png)
```

[javascript]

var jsonData = pm.response.json();
// Get list books from response
var books = jsonData.json.book;

// Only for debug
console.log(books);

// Get list of authors, then save to environment
var authors = _.map(books, 'author');
pm.environment.set("authors", authors);

// Only for debug
for (i = 0; i < authors.length; i++){
    console.log(authors[i]);
}

[/javascript]
```
 
Và đây là kết quả

Console log

![](https://images.viblo.asia/5af79e89-cade-494d-9629-a6d25dff93e6.png)


Environment
![](https://images.viblo.asia/604a7f65-2580-4112-87ab-10fea3478b08.png)
### 2. làm việc với “thời gian”
Làm việc với API đôi khi chúng ta phải giả lập hoặc dùng những data dạng date_time – thời gian. Mà thời gian thì có rất nhiều kiểu: hiện tại, quá khứ, tương lai; chưa kể là với rất nhiều định dạng khác nhau, ví dụ
> 09/04/1986 | September 4, 1986 | Thursday, September 4, 1986 8:30 PM

Để làm việc với date_time một cách linh hoạt nhất ta cần phải đưa nó về dạng object thay vì text. Với mỗi ngôn ngữ lập trình, date_time đều được cung cấp dưới dạng các library (hoặc package). Trong javascript, đó là Moment.js và Postman cũng sử dụng thư viện này luôn.

![](https://images.viblo.asia/1b098b8e-9579-4ad5-83e8-afc36da49de1.png)
**a. Cách sử dụng**
Bạn có thể viết vào phần pre-request script:

Thời gian hiện tại:
```
var moment = require('moment');
 
//DD/MM/YYYY - 04/02/2021
console.log(moment().format("DD/MM/YYYY"));
 
//YYYY/MM/DD - 2021/02/04
console.log(moment().format("YYYY/MM/DD"));
 
//DD/MM/YYYY HH:mm - 04/02/2021 08:27
console.log(moment().format("DD/MM/YYYY HH:mm"));
 
//dddd, MMMM Do YYYY, h:mm:ss a - Thursday, February 4th 2021, 8:27:51 am
console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
```

Thời gian trong quá khứ:
```
var moment = require('moment');
 
now = moment();
console.log(now.format("DD/MM/YYYY HH:mm:ss"));
 
yesterday = moment().subtract(1, 'days');
console.log(yesterday.format("DD/MM/YYYY"));
 
last_1_hour = moment().subtract(1, 'hours');
console.log(last_1_hour.format("DD/MM/YYYY HH:mm:ss"));
 
last_2_minutes = moment().subtract(2, 'minutes');
console.log(last_2_minutes.format("DD/MM/YYYY HH:mm:ss"));
 
duration_1year_1month_1day_1hour_1minute = moment.duration({
    seconds: 0,
    minutes: 1,
    hours: 1,
    days: 1,
    weeks: 0,
    months: '1',
    years: '1'
});
 
time_in_the_past = moment().subtract(duration_1year_1month_1day_1hour_1minute);
console.log(time_in_the_past.format("DD/MM/YYYY HH:mm:ss"));
```

Thời gian ở tương lai
```
var moment = require('moment');
 
now = moment();
console.log(now.format("DD/MM/YYYY HH:mm:ss"));
 
tomorrow = moment().add(1, 'days');
console.log(tomorrow.format("DD/MM/YYYY"));
 
next_1day_1hour = moment().add(1, 'd').add(1, 'h');
console.log(next_1day_1hour.format("DD/MM/YYYY HH:mm:ss"));
 
duration_1year_1month = moment.duration({
    months: '1',
    years: '1'
});
 
time_in_the_future = moment().add(duration_1year_1month);
console.log(time_in_the_future.format("DD/MM/YYYY HH:mm:ss"));

```

**b. Tổng kết**

Như các bạn đã thấy ở phía trên, date_time được viết dưới dạng object, cho phép chúng ta tùy biến thoải mái: từ đổi format hiển thị đến cộng, trừ khoảng thời gian. Sẽ còn rất nhiều technique liên quan đến thời gian nữa nhưng mà trong bài mình không thể viết hết được, các bạn có thể đọc ở documentation của trang moment.js.

------------------------
Nguồn tham khảo

https://www.guru99.com/api-testing.html