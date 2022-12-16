Chắc hẳn các bạn đã quá quen thuộc với mô hình client-server. Và hiện nay có rất nhiều ngôn ngữ sử dụng để viết server cho các ứng dụng, front-end. Sau đây mình xin giới thiệu về Feathers một framework khá phổ biển cho việc phát triển một API.
# Tại sao lại nên sử dụng Feathers?
* Không giống với các framework khác, Feathers rất dễ dàng tích hợp với client-side framework.
* Feathers có thể làm việc tốt trên các browser hiện tại, trên mobile (ReactNative, lonic) và trên server với Nodejs.
* Feathers là một framework được xây dựng với promises và ES6.
* Feathers được tổ chức để bạn có thể dễ dàng phân tách thành các microservices và mở rộng dễ dàng.
* Với Feathers bạn có thể tích hợp hơn 15 loại cơ sở dữ liệu như MongoDB, PostgreSQL,...
* Ngoài ra với một số plugin như authentication, sms and email bạn có thể dễ dàng xây dựng một API hoàn chỉnh cho các ứng dụng của bạn.
# Xây dựng một API đơn giản với Feathersjs.
## 1.1. Khởi tạo ứng dụng.
Đầu tiên chúng ta cần cài đặt **node** và **npm** để tiếp tục cài đặt Feathers. Với cách cài đặt **node** và **npm** mình sẽ không nhắc lại nữa. Các bước tiếp theo mình sẽ hướng dẫn tạo một Project với Feathers framework. Ngoài npm các bạn có thể sử dụng **yarn** để cài đặt.
1. Cài đặt feathersjs cli<br />
`npm install -g @feathersjs/cli`
2. Cài đặt Yeoman generator cho Feathers<br />
`npm install -g  yo generate-feathers`
3. Tạo folder cho project<br />
`mkdir feathers-demo`
4. Đi tới thư mục feathers-demo vừa tạo<br />
`cd feathers-demo`
5. Khởi tạo Project với Feathers Framework<br />
`yo feathers`
6. Chạy server vừa mới tạo<br />
`npm start`

Sau khi khởi động `npm start` chúng ta sẽ được kết quả sau:
![](https://images.viblo.asia/2b6362f4-fe02-4530-8c44-9ea86c89a385.png)
## 1.2. Khởi tạo service.
Vậy là với các bước trên chúng ta đã có một ứng dụng bằng Feathers hoàn toàn mới. Tiếp tục để tạo một service trong Feathers framework chúng ta tiếp tục sử dụng lệnh sau:<br />
`yo feathers:service`<br />
Quá trình thực hiện bằng câu lệnh trên sẽ như hình dưới.
![](https://images.viblo.asia/4a998fcf-bae3-4080-b1c6-c91fe8bd8469.png)<br />
Với câu lệnh GET trực tiếp từ browser <br />
`http://localhost:3030/message`<br />
chúng ta sẽ thấy có kết quả như sau:<br />
![](https://images.viblo.asia/92003165-bcfc-40c5-a9fb-316dddf76d06.png)<br />
Để ý thấy chỉ bằng một các câu lệnh chúng ta chưa phải làm gì thì Feathers đã thực hiện tất cả các bước và chúng ta dễ dàng có được một API hoàn chính chỉ bằng việc chạy lệnh `yo feathers:service`.
Thật dễ dàng phải không nào.
Ngoài ra với các method của RESTful API chúng ta sẽ đều có đầy đủ cả. Sau khi tạo ra một service với tên gọi messages như trên thì trong folders sẽ sinh ra đầy đủ 3 bộ phân.<br />
**Model**: Ở thư mục model chúng ta sẽ thấy **messages.model.js** file. Mặc định sẽ sinh ra một field **text**.<br />
**Service**: Ở thư mục service chúng ta sẽ thấy **messages.service.js** file.<br />
**Hooks**: Cùng với thư mục service chúng ta sẽ thấy **messages.hooks.js** file.<br />
Với mỗi một file ở trên đều đảm nhậm 3 nhiệm vụ rõ ràng khác nhau. Để đề cập chi tiết của 3 file này ở bài sau mình sẽ nói chi tiết hơn. Còn bây giờ để tiếp thục với phương thức POST ở trên chúng ta chỉ cần vào POSTMAN và truyền vào body với params text chúng ta sẽ trực tiếp add có dữ liệu vào DB của chúng ta. Hoặc sử dụng câu lệnh sau:<br />
`curl 'http://localhost:3030/message/' -H 'Content-Type: application/json' --data-binary '{"text": "Hello world"}'`<br />
Và kết quả sẽ như hình sau:<br />
![](https://images.viblo.asia/03b922fc-a292-43bb-90cb-08333d523772.png)<br />
Chúng ta thấy kết quả đúng như chúng ta mong đợi đúng không nào.

# Kết luận.
Vậy chỉ với một vài thao tác đơn giản chúng ta đã có thể tạo cho mình được một REST API cực kì đơn giản và dễ tiếp cân. Nếu muốn mở rộng thêm các service khác các bạn chỉ cần add thêm service mới và mọi thứ đều tự động được genarate sẵn. Việc code sẽ trở nên dễ dàng hơn rất rất nhiều.