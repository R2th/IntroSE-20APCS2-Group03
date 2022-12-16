Bài viết được dịch từ nguồn: https://hackernoon.com/how-to-create-a-custom-webhook-url-using-autocode-kx1x3uck

Để nhanh chóng có được URL Webhook có thể tùy chỉnh của riêng bạn, chỉ cần Fork từ link: https://autocode.com/src/ymusleh/my-webhook/. 

Bạn có thể thay đổi tên của dự án nếu muốn, vì nó được phản ánh trong URL webhook được tạo.

Khi bạn đã fork, bạn sẽ được đưa vào trình chỉnh sửa `AutoCode`. Nhấp vào nút `Deploy` khai màu xanh lam ở góc dưới cùng bên trái của trình chỉnh sửa. Khi nó được triển khai, hãy mở `function / __ main __. js` để xem URL Webhook trực tiếp ở cuối trình chỉnh sửa.

![](https://images.viblo.asia/6d71cd16-2911-4c6c-b6c2-bf7c9c46b9a5.jpeg)

Bạn có thể thêm bất kỳ logic xử lý tùy chỉnh nào bạn muốn vào webhook bất cứ lúc nào và chỉ cần nhấp vào `Deploy` button!

Lưu ý: Đảm bảo bạn bao gồm `/`  ở cuối url.

```
$ curl --request POST \
    --url https://YOUR_USERNAME.api.stdlib.com/my-webhook@dev/ \
    --header 'content-type: application/json' \
    --data '{
  "some_data": "This is sample data",
  "more_data": "More sample data"
}'

# OR

$ curl --request GET \
  --url 'https://YOUR_USERNAME.api.stdlib.com/my-webhook@dev/?some_data=%22This%20is%20sample%20data%22&more_data=%22More%20sample%20data%22'
```

![](https://images.viblo.asia/3bcd9312-33dd-4fb4-a6cd-26afb8b653c2.jpeg)

## Introduction

Thông thường, khi làm việc trên các dự án liên quan đến việc tích hợp các công cụ khác nhau với nhau hoặc đồng bộ hóa dữ liệu giữa các dịch vụ khác nhau, bạn có thể thấy mình đang sử dụng webhook. Rất nhiều công cụ / dịch vụ cho phép bạn đặt URL webhook mà sau đó chúng có thể đẩy dữ liệu đến dựa trên một số trình kích hoạt. Sau đó, máy chủ webhook đằng sau URL đó có thể thực hiện logic tùy chỉnh với dữ liệu đó.

Nghe khá đơn giản phải không? Tuy nhiên, bạn sẽ nhận ra rằng mình phải cung cấp một máy chủ mới, phát triển và triển khai ứng dụng web cũng như lo lắng về các tác vụ quản trị khác như bảo trì và khả năng mở rộng. Chưa kể, mỗi khi bạn muốn thực hiện thay đổi hoặc kiểm tra các `payload` khác nhau, bạn cần phải thực hiện lại quá trình triển khai.

Điều này gây thêm rất nhiều trở ngại chỉ để thực hiện một tác vụ đơn giản là nhận và xử lý dữ liệu từ một dịch vụ bên ngoài.

Chúng tôi nhận được rất nhiều câu hỏi về việc thiết lập webhook tại Autocode và tôi nghĩ rằng đó là cách dễ nhất để bắt đầu và có một URL webhook hoạt động trong (theo nghĩa đen) vài giây. Tôi đã tạo một source code trong AutoCode mà bạn có thể chỉ cần phân nhánh và triển khai để có được URL webhook của riêng mình ngay lập tức!

Webhook của bạn được triển khai trên công nghệ không máy chủ hàng đầu. Điều đó có nghĩa là nó sẽ mở rộng cho bạn mà không cần bất kỳ nỗ lực quản trị nào từ phía bạn (Dịch đến đoạn này thấy khá hấp dẫn :)).

## How It Works

```
/**
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @returns {object} result Your return value
*/
module.exports = async (context) => {
  let result = {};

  console.log('params:', context.params);
  console.log('headers:', context.http.headers);
  console.log('body:', context.http.body);

  return result;
};
```

Bạn cũng có thể chuyển vào các tham số được đặt tên với tính năng kiểm tra kiểu được đưa ra khỏi `box` dựa trên đặc tả FunctionScript.

Chỉ cần bao gồm tham số được đặt tên làm đối số trong hàm và cập nhật `comment` phía trên hàm xác định tên và kiểu của tham số mà nó sẽ `expect`:

```
/**
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @param {string} name
* @param {number} age 
* @returns {object} result Your return value
*/
module.exports = async (name = "Bob", age, context) => {
  let result = {};

  console.log('params:', context.params);
  console.log('headers:', context.http.headers);
  console.log('body:', context.http.body);

  return result;
};
```

## Testing with Payloads

Bạn có thể kiểm tra URL webhook của mình trước khi triển khai nó từ bên trong trình chỉnh sửa AutoCode.

Nhấn vào `Edit Test Event Payload` ở đầu tệp `endpoint`:

![](https://images.viblo.asia/f399ca57-2c11-4541-8820-3c0af37335b3.jpeg)

Khi bạn đã hoàn tất việc đặt và lưu `test payloads`, hãy nhấp vào nút `Run Test Event` màu xanh lục ở góc dưới cùng bên phải của trình chỉnh sửa.

Sau đó, điều đó sẽ mở ra một bảng điều khiển hiển thị bất kỳ nhật ký hoặc lỗi nào bạn có thể mắc phải:

![](https://images.viblo.asia/2ea96616-f77c-4889-b07c-8c1557f4e0ea.jpeg)

![](https://images.viblo.asia/9692d4f4-a670-4e41-85d9-3e07d310d996.jpeg)

### Deploying your Webhook

Khi bạn đã sẵn sàng triển khai URL webhook của mình và bắt đầu lắng nghe các sự kiện, tất cả những gì bạn cần làm là nhấn vào nút `Deploy` màu xanh lam ở góc dưới cùng bên trái của trình chỉnh sửa:

![](https://images.viblo.asia/f3237219-c7e2-4577-a87f-4cd523cacf9a.jpeg)

Sau khi được triển khai, URL được hiển thị hiện đã sẵn sàng để xử lý các sự kiện từ bất kỳ dịch vụ bên ngoài nào. Bạn cũng có thể xem `log` thời gian thực bằng cách nhấp vào nút `View Logs` ở cùng góc của trình chỉnh sửa.

Lưu ý: Đảm bảo bạn bao gồm /  ở cuối URL.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn