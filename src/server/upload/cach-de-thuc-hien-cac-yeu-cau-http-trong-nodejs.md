### 1 - HTTP Bộ thư viện chuẩn để request.
Đầu tiên trong bài viết này là module HTTP mặc định trong thư viện chuẩn. Với module này, bạn chỉ cần sử dụng mà không phụ thuốc các install bên ngoài. Tất nhiên nó là dạng chuẩn nên không chuẩn so với các giải pháp mà chuẩn bị chúng ta liệt kê dưới đây.
Ví dụ về http:

```
const https = require('https');
https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
```
### 2 - REQUEST
Request là một ứng dụng HTTP được đơn giản hóa có thể so sánh được với thư viện yêu cầu của Python. Thư viện này thân thiện hơn nhiều so với module http mặc định và đã được coi là một sự truy cập cho cộng đồng trong nhiều năm.  Đây là lựa chọn của nhiều người trong đó có tôi kể từ khi tôi bắt đầu sử dụng Node.js và rất tuyệt vời để nhanh chóng hoàn thành công việc. Không giống như module http, bạn sẽ phải cài đặt module này làm phụ thuộc từ npm, nghĩa là bạn phải install nó.

Ví dụ về Request:


```
npm install request@2.81.0 //install in node use npm
const request = require('request');
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});
```


### 3 - Axios
Axios là một based HTTP client dựa trên promise cho trình duyệt cũng như node.js. Sử dụng Promises là một lợi thế lớn khi giao dịch với mã đòi hỏi một chuỗi sự kiện phức tạp hơn. Viết mã không đồng bộ có thể gây nhầm lẫn và Promises là một trong nhiều giải pháp cho vấn đề này. Ngoài ra chúng thậm chí còn hữu ích trong các ngôn ngữ khác như Swift.
Ví dụ về Axios:


```
const axios = require('axios');
axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
```

### Kết Luận:

Đương nhiên tất cả các cách trên không bao gồm tất cả các giải pháp, nhưng bây giờ bạn thấy cách chức năng cơ bản hoạt động trong một vài thư viện HTTP phổ biến nhất trong Node. Ngoài ra còn có các thư viện như  fetch để chuyển các chức năng tìm nạp của trình duyệt sang chương trình phụ trợ. Các ngôn ngữ khác có nhiều thư viện tương tự để giải quyết vấn đề này. Xem các hướng dẫn khác trong Swift, Python và Ruby. Ngoài ra, hãy xem Quickstarts của Node.js của chúng tôi để có nơi áp dụng các kỹ năng mới của bạn.

Hy vọng bài viết này sẽ cung cấp cho các bạn thêm phần lựa chọn trong các thực hiện của các bạn.