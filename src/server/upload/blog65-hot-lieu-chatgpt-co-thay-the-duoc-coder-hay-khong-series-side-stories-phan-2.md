![image.png](https://images.viblo.asia/08efa2cd-a0a5-4ca2-a368-8b09cb1f9db9.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊. Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Để trả lời câu hỏi: Liệu ChatGPT có thay thế được coder không?

***Thì toàn bộ nội dung của Blog này mình sẽ sử dụng ChatGPT để viết nó.***

# Chat với AI

## ChatGPT là gì?
ChatGPT là một ngôn ngữ máy học được huấn luyện bởi OpenAI để trả lời câu hỏi và thực hiện các nhiệm vụ liên quan đến ngôn ngữ tự nhiên. Nó được xây dựng dựa trên mô hình GPT-3, một trong những mô hình ngôn ngữ máy học lớn nhất hiện nay. ChatGPT có thể được sử dụng trong nhiều lĩnh vực khác nhau như tìm kiếm thông tin, hỗ trợ khách hàng và trả lời câu hỏi trực tuyến.

![Screenshot 2022-12-14 at 21.38.09.png](https://images.viblo.asia/69af993a-0d49-4576-8324-4fc6d76b1131.png)

## Tôi là một coder liệu bạn có khiến tôi mất việc không?
Không, ChatGPT không có khả năng thay thế coder vì nó không được thiết kế để viết mã lập trình hoặc thực hiện các nhiệm vụ liên quan đến lập trình. Coder vẫn là một người cần thiết để viết mã và thực hiện các nhiệm vụ liên quan đến lập trình. ChatGPT chỉ có thể giúp bạn trong việc trả lời câu hỏi và thực hiện các nhiệm vụ liên quan đến ngôn ngữ tự nhiên.

![Screenshot 2022-12-14 at 21.40.12.png](https://images.viblo.asia/ff97704b-e2fa-429b-bb85-e06c0b93e080.png)

## Tôi nên làm gì bây giờ?
Điều đó phụ thuộc vào bạn và những mục tiêu của bạn. Nếu bạn không biết bắt đầu từ đâu, bạn có thể thảo luận với người thân hoặc bạn bè để tìm ra những hoạt động mà bạn thích và có thể làm để giải trí hoặc phát triển bản thân. Bạn cũng có thể tìm kiếm các hoạt động và sự kiện đang diễn ra trong thành phố của bạn để tham gia và trải nghiệm thứ mới. Nếu bạn muốn tìm hiểu thêm về một chủ đề cụ thể, bạn có thể tìm kiếm trên internet hoặc đọc một sách hay.....

![Screenshot 2022-12-14 at 21.44.03.png](https://images.viblo.asia/7ec4048c-96f6-4e00-9db7-b5020e291fdb.png)

## Tôi muốn convert một list string sang scv sử dụng Nodejs express. Nếu mà có sử dụng thư viện thì càng tốt.

Để convert một list string sang csv sử dụng Node.js và express, bạn có thể sử dụng thư viện json2csv để thực hiện việc này.

Để cài đặt thư viện này, bạn có thể sử dụng lệnh sau:

`npm install json2csv`

Sau khi cài đặt xong, bạn có thể sử dụng nó như sau:

```javascrip
const json2csv = require('json2csv');

// Một array các string
const data = ['Hello', 'world', 'foo', 'bar'];

// Chuyển đổi array sang csv
const csv = json2csv.parse(data);

console.log(csv); // "Hello","world","foo","bar"
```

Các bạn có thể tham khảo thêm cách sử dụng của json2csv tại đây: https://www.npmjs.com/package/json2csv.

![Screenshot 2022-12-14 at 21.56.42.png](https://images.viblo.asia/f04e7198-b93b-4c53-ab94-c0acd27feaf3.png)

## Thư viện pg khi sử dụng transaction bị deadlock? Cách giải quyết?

Thư viện pg là một thư viện dùng để kết nối và thực hiện các truy vấn trên cơ sở dữ liệu PostgreSQL. Nếu bạn gặp vấn đề deadlock trong khi sử dụng transaction, một cách khắc phục thông dụng là sử dụng thuật toán SERIALIZABLE trong transaction đó. Điều này sẽ giúp tránh xung đột dữ liệu trong các giao dịch đồng thời và giúp tránh tình trạng deadlock.

![Screenshot 2022-12-14 at 22.22.32.png](https://images.viblo.asia/2f581b5e-fa91-45b0-890d-cc2b9c4d75b0.png)

## Làm sao để ghi một file csv nặng 10Gb vào Postgres bằng Nodejs?
![Screenshot 2022-12-14 at 22.33.59.png](https://images.viblo.asia/f46b9b52-d994-49f2-b591-830b028d0d9e.png)

# Kết luận
Trong bài viết này tôi đã hỏi AI rất nhiều câu hỏi và kết quả khá tuyệt vời. Tuy nhiên vấn đề lớn nhất ở đây là **câu hỏi.** 
Ví dụ câu hỏi: `Thư viện pg khi sử dụng transaction bị deadlock...` để tìm ra nó cả team phải mất thời gian gần vài ngày họp cũng 3-4 lần mới biết tìm ra vấn đề là ở thư viện pg. 
Còn khi đã biết câu hỏi thì thật sự tìm ra câu trả lời cũng khá giễ dàng. [Thậm chí cách giải quyết vấn đề này đã được update vào tài liệu của thư viện khoảng 3 tháng trước.](https://node-postgres.com/features/transactions).

Theo mình thì để nói là thay nhế được **Coder** thì có thể vì giờ cũng ít cái cần code rồi chủ yếu là giải quyết vấn đề và hiểu nghiệp vụ. Nếu giải quyết được vấn đề và tạo ra giá trị cho khách hàng thì bạn là một **Developer**.  Và rất khó để mấy con AI này thay thế được **Developer** trong tương lai gần.
Còn về vấn đề **Coder** và **Developer** thì mình sẽ có một Blog nói chi tiết về vấn đề này.

Con **AI** này khá tuyêt. Nếu biết tận dụng nó để **research** thì nó sẽ giúp đỡ chúng ta rất nhiều.

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/12/blog65-hot-lieu-chatgpt-co-thay-uoc.html