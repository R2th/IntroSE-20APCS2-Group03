Một công việc khá phổ biến đối với front-end developer là phải giả lập một backend REST service để nhận JSON data cung cấp cho ứng dụng front-end, và đảm bảo nó hoạt động như mong đợi trong khi đang chờ phía backend hoàn thiện service. 

Bạn vẫn có thể cài đặt backend server đầy đủ, bằng cách sử dụng Node.js, Express và MongoDB, tuy nhiên việc này tốn khá nhiều thời gian và phức tạp. Trong khi đó JSON Server lại là một giải pháp khá hoàn thiện cho yêu cầu nhanh và đơn giản với đầy đủ các CRUD operation. 

Vì vậy bài viết này sẽ hướng dẫn bạn cách cài đặt JSON server và publish một sample REST API.

### Cài đặt JSON Server
JSON Server được đóng gói như một NPM package. Vì vậy việc cài đặt có thể được thực hiện thông qua việc sử dụng gói Node.js manager:

`$ npm install -g json-server`

Tuỳ chọn -g sẽ giúp cho package được cài đặt ở level hệ thống.


### Tạo JSON File
Tiếp theo, hãy tạo file JSON với tên data.json. Trong file này sẽ chứa những dữ liệu được trả về bởi REST API. Dưới đây là một ví dụ về file json này:
```
{
  "employees": [
    {
      "id": 1,
      "first_name": "Sebastian",
      "last_name": "Nommand",
      "address": "123 Subway, NDC"
    },
    {
      "id": 2,
      "first_name": "Julia",
      "last_name": "Palmer",
      "address": "Path 12, Manchess Street"
    },
    {
      "id": 3,
      "first_name": "Anne",
      "last_name": "Cathays",
      "address": "4th floor, Nanman Landing"
    }
  ]
}
```

Cấu trúc trên mô tả employee object với các trường id, first_name, last_name và address.

### Khởi động Server

Hãy khởi động JSON server bằng việc chạy câu lệnh sau:

`$ json-server --watch data.json`

File data.json được truyền vào như một tham số trong câu lệnh trên, và option --watch được thêm vào nhằm đảm bảo server được start ở watch mode, trong mode này, server sẽ xem chừng cho những thay đổi của file và cập nhật kết quả vào API một cách phù hợp.

Bây giờ hãy mở địa chỉ http://localhost:3000/employees trên browser và ta sẽ nhận được kết quả của file json mà ta đã tạo.

Những HTTP endpoints sau đây được tạo tự động bởi JSON server, ta có thể tuỳ chọn để sử dụng sao cho phù hợp với mục đích của mình:

```
GET    /employees
GET    /employees/{id}
POST   /employees
PUT    /employees/{id}
PATCH  /employees/{id}
DELETE /employees/{id}
```

Ngoài ra ta còn có thể thêm vào URL các params khác, ví dụ như việc filter như sau:
> http://localhost:3000/employees?first_name=Sebastian

Kết quả trả về là một object employee.

### Deploy bằng địa chỉ IP

Việc deploy lên localhost như trên sẽ không thể sử dụng cho các trường hợp test từ bên ngoài ví dụ như mobile app, mà ta cần deploy nó với địa chỉ IP của máy.

Truy cập vào System Preferences/Network/Wifi, copy địa chỉ IP (ví dụ x.x.x.x) của máy và start json server với cú pháp sau:

> $ json-server --host X.X.X.X data.json

Bây giờ, ta hoàn toàn có thể truy cập vào địa chỉ http://x.x.x.x:3000/employees từ bên ngoài để truy xuất thông tin.

Ngoài ra, để tìm hiểu sâu hơn về những hỗ trợ mà json server cung cấp, các bạn có thể tìm hiểu thêm ở đây https://github.com/typicode/json-server