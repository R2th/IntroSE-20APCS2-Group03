Như trong một [bài hướng dẫn](https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-02-yMnKMypEK7P) gần đây của mình vể serverless, mình có nhắc tới các kiểu cấu trúc cho một dự án sử dụng mô hình serverless sử dụng các dịch vụ của aws và tookit serverlessjs.

Trong bài hướng dẫn thì mình đã có nó là sử dụng **Monolithic Pattern**, vậy chúng ta thường có những kiểu cấu trúc mẫu nào cho các dịch vụ serverless và ưu nhược điểm của từng loại là gì?

# Serverless Patterns
Theo tìm hiểu của mình thì có thể chia làm 4 pattern như sau:
1. Microservices Pattern (Nano Service Pattern)
2. Services Pattern (Microservice Pattern)
3. Monolithic Pattern
4. Graph Pattern

Mình đọc một số bài viết khác nhau thì có sự phân biệt tên gọi cho số (1) và (2), mặc dù trong các bài viết thì vẫn mô tả các pattern giống nhau.

## Microservices Pattern
Trong kiểu mẫu này, mỗi hàm hay api đều được chịu trách nhiệm bởi một aws function độc lập.
Như trong ví dụ dưới đây, mỗi aws function sẽ xử lý một endpoint riêng biệt. `Một sự kiện - một function`.
![](https://images.viblo.asia/624f43f5-b1f2-402a-91f0-371ee425e166.png)

Nội dung của file serverless.yml cơ bản sẽ giống như thế này
```
service: pizza-customer-ordering
provider: aws
functions:
  getCustomers:
    handler: handlers.getCustomers
    events:
      - http: get customers
  createCustomer:
    handler: handlers.createCustomer
    events:
      - http: post customers
```

**Ưu điểm**
* Nhìn tổng quan, mỗi công việc/ api endpoint được chịu trách nhiệm bởi một function riêng biệt (aws function), điều này cho phép chúng ta sửa đổi các thành phần riêng lẻ của một service mà không ảnh hưởng tới toàn bộ hệ thống. Đây được xem là một mô hình rất an toàn và "uyển chuyển"
* Dễ dàng cho debug, vì mỗi sự kiện được xử lý bởi một hàm nên chúng ta thường chỉ có một kết quả được mong đợi cho cho từng sự kiện.
* Sự tách biệt độc lập rất thích hợp khi các team làm việc riêng lẻ. Các team có thể thêm hoặc sửa những hàm của mình mà ít ảnh hưởng tới toàn bộ dịch vụ.

**Hạn chế**
* Chúng ta sẽ có rất nhiều function, gây khó khăn cho việc quản lý. Khi xây dựng dịch vụ theo hướng này, chúng ta sẽ phải chia nhỏ các chức năng của dịch vụ (micro -> nano) cho các function đảm nhận riêng biệt
* Hiệu suất có thể bị giảm, vì các function chỉ đảm nhiệm một công việc duy nhất nên chúng có thể được gọi ít hơn và dẫn tới một vấn đề là `cold start`.
* Việc deploy sẽ chậm hơn vì chúng ta có nhiều function cần được quản lý.
* Số lượng function sẽ bị giới hạn bởi giới hạn số lượng tài nguyên của CloudFormation.

## Services Pattern
Kiểu thì mỗi fucntion sẽ đảm nhận nhiều chức năng hơn (thường là 4 tương ứng với 4 http action), các chức năng thường liên quản tới một đối tượng của dịch vụ.
Như trong ví dụ của chúng ta, mỗi nhóm tài nguyên REST sẽ được một aws function đảm nhận. `Nhiều sự kiện - một function`.
![](https://images.viblo.asia/4a0c366c-8146-4d3c-888f-6ca9782b8799.png)

serverless.yml
```
service: pizza-customer-ordering
provider: aws
functions:
  customers:
    handler: handler.customers
      events:
        - http: post customers
        - http: put customers/{id}
        - http: get customers
        - http: delete customers/{id}
```

Như chúng ta thấy, chúng ta sẽ phân tích HTTP request đầu vào và phân loại theo `path` + `method` ở trong code, tùy theo đó mà trả lại response tương ứng. Nó giống như chúng ta tạo ra một http router ở đầu của aws Lambda funtion. 

**Ưu điểm**
* Giảm số lượng function chúng ta phải quả lý.
* Sự tách biệt giữa các phần vẫn được duy trì.
* Các team vẫn có thể làm việc độc lập.
* Việc deploy sẽ nhanh hơn.
* Hiệu suất làm việc tăng lên(lý thuyết), khi nhiều công việc được đảm nhận bởi một function, function đó sẽ được gọi nhiều hơn và tránh được `cold start`.

**Hạn chế**
* Việc debug sẽ khó hơn khi mà một function đã đảm nhận nhiều công việc, sẽ có nhiều output của cùng một function.
* Kích thước một funtion sẽ trở nên lớn khi chúng ta đẩy nhiều chức năng cho function đó.

## Monolithic Pattern
Chúng ta sẽ `nhồi nhét` tất cả vào một function duy nhất `Mọi sự kiện - một function`.

Như trong ví dụ, tất cả http request sẽ được xử lý bởi một function duy nhất.
![](https://images.viblo.asia/f8029f44-8b57-4dd8-bc0d-5befce8cdb2f.png)

serverless.yml
```
service: pizza-customer-ordering
provider: aws
functions:
  pizzaCustomerOrdering:
    handler: handler.pizzaCustomerOrdering
      events:
        - http: post customers
        - http: put customers/{id}
        - http: get customers
        - http: delete customers/{id}
        - http: post orders
        - http: put orders/{id}
        - http: get orders
        - http: delete orders/{id}
```

**Ưu điểm**
* Chỉ có một function, dễ cho việc quả lý.
* Việc deploy nhanh, tùy thuộc vào kích thước code của function.
* Hiệu suất làm việc cao, vì chỉ có một function nên lúc nào cũng được gọi giảm tối đa việc `cold start`.

**Hạn chế**
* Yêu cầu chúng ta phải xây dựng một http router phức tạp hơn cho lambda function.
* Khó cho việc theo dõi hiệu suất làm việc, function sẽ thực thi với các thời gian trả về là khác nhau.
* Kích thước code của function có thể quá lớn, đạt tới giới hạn của lambda function.
## Graph Pattern
Graph Pattern cũng tương tự như Monolithic Pattern, nhưng nó cho phép chúng ta tận dụng được ưu điểm của GraphQL để giảm số lượng endpoint REST API xuống còn từ 1 đến 2 endpoint. GrapQL sẽ lấy chính xác dữ liệu mà bạn mong muốn.
![](https://images.viblo.asia/cab46288-5f96-476d-82be-2c7a95ef9106.png)

serverless.yml
```
service: pizza-customer-ordering
provider: aws
functions:
  socialNetwork:
    handler: handler.pizzaCustomerOrdering
      events:
        - http: get query
```

**Ưu điểm**
Kế thừa các ưu điểm của Monolithic Pattern.
* Việc deploy nhanh hơn vì có một function nhưng cũng chỉ có từ 1 đến 2 endpoint.

**Hạn chế**
* Kích thước code của function có thể quá lớn, đạt tới giới hạn của lambda function.
* Chúng ta phải biết về GraphQL.

# Kết luận
Mình đã trình bày 4 patterns dành cho ứng dụng kiểu serverless mà chúng ta có thể sử dụng.

Mỗi ứng dụng, dự án đề có yêu cầu và tùy chọn khác nhau vì vậy với bài viết này mình hy vọng mọi người có thể lựa chọn được một pattern phù hợp để xây dựng một ứng dụng serverless.

Bài viết được đăng bởi cùng tác giả tại [đường dẫn.](https://codetheworld.io/cac-kieu-to-chuc-cac-service-cua-mot-ung-dung-serverless.html)