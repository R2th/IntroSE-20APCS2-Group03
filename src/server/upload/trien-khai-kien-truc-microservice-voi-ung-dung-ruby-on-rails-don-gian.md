Chào mọi người, chắc hẳn là các bạn đã từng nghe về kiến trúc Microservice va kiến trúc Monolithic, các ưu nhược điểm của mỗi loại kiến trúc. Cho nên ở đây mình sẽ không đề cập đến các vấn đề về lý thuyết nữa mà sẽ tập trung vào việc làm thế nào để triển khai một ứng dụng Ruby on Rails đơn giản, áp dụng kiến trúc microservice. Bài viết của mình sẽ tập trung vào các vấn đề sau:
1. Tổ chức database
2. Xây dựng API Gateway
3. Xử lý authentication và authorization

## 1. Tổ chức database
Thử tưởng tượng bạn đang xây dựng một hệ thống bán hàng online, sử dụng kiến trúc microservices. Hầu hết các service đều thực hiện tác vụ truy vấn và lưu trữ dữ liệu. Ví dụ như service Order xử lí việc đặt hàng, còn service Customer service thì xử lý các tác vụ liên quan đến thông tin khách hàng - (hình minh họa bên dưới). Vấn đề đặt ra ở đây là chúng ta sẽ lựa chọn kiến trúc database như thế nào cho ứng dụng trên ?
![](https://images.viblo.asia/c68b7819-8c7e-4e36-b33b-5040813b3291.png)

Ở đây đang có 2 kiểu database mà mình có thể nghĩ đến như sau:
1. Các service đều sử dụng chung 1 database
2. Mỗi service đều có cho nó một database riêng.

Mình sẽ chọn thực hiện theo phương án 1 vì trước mắt nó dễ implement cũng như truy vấn dữ liệu dễ dàng. Còn đối với phương án 2 thì mình hy vọn có thể trình bày với các bạn vào 1 ngày không xa.
## 2. Xây dựng API Gateway
#### API Gateway là gì
Trước khi đi vào việc implement 1 API Gateway trong Rails thì chúng ta cùng tìm hiểu xem API Gateway là gì.
API Gateway chịu trách nhiệm định tuyến các request, tổng hợp và chuyển đổi giao thức. Tất cả các request từ client sẽ đi qua API Gateway trước tiên. Sau đó nó định tuyến các request tới các microservice thích hợp. Nó giống như một tổng đài để điều phối các request đến từ trình duyệt (dạng HTTP REST request hay request đến URL một trang web). Nếu chúng ta không sử dụng API Gateway thì clients sẽ phải gử i request trực tiếp tới service cụ thể nào đó. Nó sẽ dẫn đến một số vấn đề rắc rối với client:

* Phần code phía client sẽ trở nên phức tạp vì phải tracking nhiều endpoint
* Sẽ tạo sự kết nối giữa client và backend. Client cần biết được các services đó đc phân chia như thế nào -> rất khó cho việc maitain của client và refactor service.
* Mỗi một service sẽ phải handle nhiều vấn đề liên quan như authentiaction, SSL hay client rate limiting

### Triển khai API Gateway với Rails
Nghe thì thấy khó nhằn nhưng thực sự khi triển khai với Rails thì nó không phức tạp như bạn nghĩ, về cơ bản  nó cũng chỉ là 1 Web App bình thường, đảm nhận công việc xử lí các request đến và đi mà thôi. Bên dưới sẽ là mô hình mà mình sẽ build:
![](https://images.viblo.asia/00f96055-6e5c-46c6-ad3a-a417836b80d6.png)

Dựa trên mô hình chúng ta có thể thấy, app của mình được chia làm thành 3 phần chính:
1. **Client/ User**: là phần Front end của app, được viết bằng một ngôn ngữ FrontEnd nào đó (AngularJS, ReactJS, VueJS, etc..)
2. **API Gateway**: đảm nhận nhiệm vụ định tuyến các request.
3. **Internal services**: xử lý các request mà client gửi đến, giao tiếp với API Gateway thông qua REST API

API Gateway của mình sẽ bao gồm các thành phần sau:
1. **Authentication**: Thực hiện xác thực người dùng
2. **Dynamic router**: đây là module đảm nhận nhiệm vụ phân tích request, dựa vào request để xác định request đó thuộc về service nào và url REST API của service đó để call service.
3. **Service model và Route model**: đây là 2 model để lưu trữ dữ liệu mà devloper dùng để khai báo các đường dẫn cũng như các service tương ứng và REST API của chúng, để cho khi request đến API Gateway, thì API Gateway có thể biết được sẽ chuyển request đó đến service nào
4. **Requester service**: đơn giản chỉ là 1 service đảm nhiệm việc gọi các Internal Service khác thông qua REST API sau khi đã định tuyến được internal service cần gọi là gì.

Để đơn giản thì mình có thể mô tả luồng đi của mô hình trên như sau:
* *Bước 1*: Khởi tạo data của model Route và Service tương ứng.  Chi tiết của 2 model này mình sẽ đề cập ở mục bên dưới. Chung quy là nó sẽ khai báo url của request này khi API Gateway nhận được, thì nó sẽ tương ứng với Internal Service nào.
* *Bước 2*: Khi Client gửi request đến API Gateway, sau khi pass qua được xác thực, thì thằng Dynamic Router sẽ so sánh url pattern của request và dữ liệu mà chúng ta đã khởi tạo ở bước 1 để tìm xem url đó tương ứng với Internal service nào.
* *Bước 3*: Sau khi đã xác định được Internal service cần thưc thi, thì Requester service sẽ được thực thi, gửi request đến REST API của các Internal service, sau đó trả lại kết quả cho client.

Sau đây chúng ta cùng đi vào chi tiết cách xây dựng các thành phần  trong API Gateway

### Authentication
Việc xử lý authentice ở đây thực ra khá đơn giản. Đầu tiên mình sẽ khởi tạo một User model để lưu lại thông tin xác thực người dùng.
```
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :email, null: false, index: true, unique: true
      t.string :password_digest
      t.string :role, null: false, default: 'user'
      t.datetime :last_login
      
      t.timestamps
    end
  end
end
```

Tiếp đến mình sẽ sử dụng gem knock để thực hiện việc xác thực người dùng, sử dụng JWT Token.
Các bạn có thể tham khảo hai bài hướng dẫn sau để thực hiện:
https://engineering.musefind.com/building-a-simple-token-based-authorization-api-with-rails-a5c181b83e02

### Service model và Route model
Có thể nói đây là phần quan trọng nhất, giúp chúng ta xác định được service cần thực thi khi có request đến. Cụ thể cấu trúc database của mình sẽ như hình bên dưới:
![](https://images.viblo.asia/a6eb4713-60fd-4720-a2fe-00a110286d24.png)

Trên đây là toàn bộ cấu trúc database mà mình sẽ dùng cho API Gateway. Ở đây chúng ta đã biết là bảng users được sử dụng cho phần xác thực, vậy còn bảng services và routes sẽ đóng vai trò gì, mình sẽ giải thích nhé.
1. **Bảng services:** có nhiệm vụ lưu lại những thông tin cơ bảng về REST API của internal service, những thông tin lưu ở bảng này thực ra khá là đơn giản, ngoài trường id ra thì nó chỉ có thêm 2 trường khác làm những nhiệm vụ sau:
* *url*: lưu lại tên miền của internal service, (ví dụ như là http://localhost:5000, https://example.com, etc ...)
* *token*:  đối với các internal service sử dụng authenticate, thì trường này sẽ lưu lại token sẽ sử dụng để có thể access vào service
2.  **Bảng routes:** bảng này sẽ lưu lại thông tin chi tiết hơn về REST API của internal service, mình lấy ví dụ, đối với service đảm nhận việc xử lý các bài post, thì có thể nó có nhiều chức năng như cập nhật bài post, xóa hay chỉnh sửa bài post, etc.., thì các thông tin này sẽ giúp cho dynamic router xác định được chính xác nó sẽ call đị chỉ API nào từ internal service.
* *serviceid*: xác định xem route này thuộc về internal service nào.
* *verb*: method HTTP của API request cần call đến.
* *url_pattern*: dùng để khai báo đường dẫn phía sau tên miền cũng như là đường dẫn public để phía client có thể access đến.
* *version*: lưu lại version của API

Để có thể giải thích rõ hơn chỗ này thì mình đã mô hình hóa nó bằng ví dụ thông qua sơ đồ bên dưới, diễn tả lại cách xử lý khi có request đến như thế nào.
![](https://images.viblo.asia/975477d4-c9db-4bf6-8103-9fa658d17d8c.png)

### Dynamic Router
Vậy là chúng ta đã đi qua hết 2/3 chặng đường rồi. Có lẽ mọi người sẽ thắc mắc là thằng Dynamic Router này thực sự đóng vai trò gì ?
Cùng nhìn lại ví dụ ở mục trước và xem vấn đề là gì nhé. Khi chúng ta khởi tạo dữ liệu cho 2 bảng services và routes, thì nó mới chỉ tác động ở tầng database mà thôi, vậy làm sao client có thể gọi request đến trong khi API Gateway của mình chưa tồn tại đường dẫn để cho Client có thể gọi đến. Cho nên thằng Dynamic Router được sinh ra để giải quyết vấn đề trên.

Khi chúng ta khởi tạo một record mới ở bảng routes, thì Dynamic Router có nhiệm vụ sinh ra một đường dẫn tương ứng, để cho client có thể gửi request đến. Dựa vào các dữ liệu mà chúng ta đã khởi tạo trong database thì Dynamic route có thể tạo ra 1 route tương ứng với đầy đủ các thành phần. Các bạn có thể tham khảo đoạn code sau:
```
class DynamicRouter
  def self.load
    # Routes table does not exist at initial app setup and causes to stop db migration
    return unless ActiveRecord::Base.connection.data_source_exists? 'routes'

    Rails.application.routes.draw do
      # todo: check for better route generator
      Route.all.each do |route|
        url_pattern = "api/#{route.version}/#{route.url_pattern}"
        case route.verb
        when 'get'
          get url_pattern, to: 'gateways#call'
        when 'post'
          post url_pattern, to: 'gateways#call'
        when 'put'
          put url_pattern, to: 'gateways#call'
        when  'delete'
          delet url_pattern, to: 'gateways#call'
        end
      end
    end
  end

  def self.reload
    Rails.application.routes_reloader.reload!
  end
end
```
## 3. Kết luận
Trên đây mình đã trình bày cho các bạn các thành phần cơ bản khi áp dụng microservice với API Gateway tự build. Ngoài các thành phần chính trên thì API Gateway của mình còn cung cấp các API dùng để khởi tạo service và routes, khởi tạo hoặc chỉnh sửa user. 

Nó vẫn đang có hạn chế đó là việc các Internal Serivce đều đang sử dụng chung 1 database, nó chưa sát lắm với kiến trúc  microservice hoàn chỉnh đó là một service sẽ có 1 database riêng và giữa các service sẽ liên lạc với nhau như thế nào ? Hy vọng tương lai mình sẽ có cơ hội giải thích nó các bạn. Thân chào!

Nguồn và link tham khảo:

https://github.com/octoberstorm/rails-microservice-prototype
https://github.com/jameskropp/Rails-API-Auth
https://microservices.io/patterns/data/database-per-service.html