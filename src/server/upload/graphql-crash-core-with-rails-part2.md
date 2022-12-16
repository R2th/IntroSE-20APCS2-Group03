Hello guys !

Ở bài lần trước chúng ta cũng đã đi tìm hiểu và biết được `GraphQL` là gì ? Nó hoạt động ra sao và tại ra nó lại được ưa chuộm như vậy, và thêm 1 số cơ bản khác về `GraphQL` , thì trong bài ngày hôm nay tôi và các bạn sẽ đi tiếp tục tìm hiểu nó thông qua 1 dự án demo được sử dụng Ruby On Rails làm framework chính cùng kết hợp `GraphQL`.  Nhưng trước hết để làm được việc này chúng ta cần phải cài đặt `GraphQL` trên môi trường của rails.

# Cài đặt GraphQL
* đầu tiên chúng ta cần phải tạo 1 project demo 

`rails new graphql-ruby --skip-yarn --skip-action-mailer --skip-action-cable --skip-sprockets --skip-coffee --skip-javascript --skip-turbolinks --api`

* sau đó di chuyển vào thư mục dự án :

`cd graphql-ruby`

### Generating models:

ở đây chúng ta tạo 2 model `order` và `payment`
```
$ rails g model Order description:string total:float
$ rails g model Payment order_id:integer amount:float
```

và chúng ta thiết lập mối quan hệ giữa 2 bảng là là 1-n :

```
# app/models/order.rb
class Order < ApplicationRecord
    has_many :payments
end
```

```
# app/models/payment.rb
class Payment < ApplicationRecord
    belongs_to :order
end
```


### Create Database 

* chúng ta chạy câu lệnh :

`$ rails db:create` để tạo 1 SQLite3 development database (default)

and

* run `$ rails db:migrate` để models và cơ sở dữ liệu , sau đó chúng ta cần 1 số dữ liệu mẫu để thực hiện,

### ADD seed data

các bạn mở file `seed.rb` đây là nơi chúng ta sẽ tạo ra cái dữ liệu mẫu để phục vụ quá trình làm 

thêm 1 vài đối tượng ví dụ để bắt đầu cơ sở dữ liệu :

```
# db/seeds.rb
order1 = Order.create(description: "King of the Hill DVD", total: 100.00)
order2 = Order.create(description: "Mega Man 3 OST", total: 29.99)
order3 = Order.create(description: "Punch Out!! NES", total: 0.75)

payment1 = Payment.create(order_id: order1.id, amount: 20.00)
payment2 = Payment.create(order_id: order2.id, amount: 1.00)
payment3 = Payment.create(order_id: order3.id, amount: 0.25)
```
sau khi tạo xong 1 vài đối tượng mẫu chúng ta cần chạy câu lệnh sau để ghi dữ liệu vào database:

`$ rails db:seed`

đến đây cơ bản chúng ta đã hoàn thiện phần setup nhưng chúng ta vẫn chưa thấy có chỗ nào liên quan đến `graphQL` phải không .
Ngay bây giờ đây chúng ta sẽ đến phần quan trọng thêm `GraphQL` vào dự án .

### Adding GraphQL

* Đầu tiên ta cần thêm gem `graphql` vào file Gemfile

```
# Gemfile
gem 'graphql'
```
 Sau đó chạy câu lệnh `bundle install` để cài đặt gem trong ứng dụng của mình.




#### Install GraphQL with 'rails generate'




Sau bước trên chúng ta cần phải chạy tiếp tới câu lệnh :

`$ rails generate graphql:install` sau khi chạy câu lệnh này nó sẽ tự thêm cho chúng ta 1 thư mục `/graphql/` vào sơ đồ thư mục chính của chúng ta, và cũng như bộ điều khiển dành riêng cho GraphQL các bạn có thể xem tại đường dẫn `/controllers/graphql_controller.rb.`




#### Add GraphQL objects for models :
Bây giờ chúng ta cần tạo các đối tượng GraphQL để phù hợp với các mô hình của chúng ta:

chỉ đơn giản chúng ta chạy 2 câu lệnh dưới đây :

```
$ rails generate graphql:object order
$ rails generate graphql:object payment
```

Done, bây giờ chúng ta có tất cả các tệp và thư mục cần thiết để tạo Truy vấn đầu tiên của mình! Tuy nhiên, một số tệp trong số đó vẫn cần thêm một số mã. Next ! Chúng ta cần xác định các loại GraphQL và các trường của chúng :

```
# app/graphql/types/payment_type.rb
module Types
    class PaymentType < Types::BaseObject
        field :id, ID, null: false
        field :amount, Float, null: false
    end
end
```

Điều này cho phép chúng ta truy xuất các đối tượng PaymentType có chứa trường id (với khóa chính ID đặc biệt), và trường `amount` sẽ có định dạng Float. Vì cả hai đều được đặt thành null: false, nên việc nhận được phản hồi Truy vấn bằng nil trong một trong hai trường sẽ gây ra lỗi.

Các đối tượng GraphQL sẽ kế thừa từ các `Types::BaseObject`. Do đó, khi chúng ta đã xác định `class PaymentType < Types::BaseObject` của mình, bây giờ chúng ta có sẵn`Types::PaymentType`. Chúng ta có thể sử dụng các Loại tùy chỉnh này để xác định những gì chúng ta nhận lại từ mỗi trường.

Hãy xem cách chúng ta có thể sử dụng `Types::PaymentType in OrderType:`


```
# app/graphql/types/order_type.rb
module Types
    class OrderType < Types::BaseObject
        field :id, ID, null: false
        field :description, String, null: false
        field :total, Float, null: false
        field :payments, [Types::PaymentType], null: false
        field :payments_count, Integer, null: false

        def payments_count
            object.payments.size
        end
    end
end
```

* Một số điều cần lưu ý ở đây:

  -  Vì model `order` có cột  `id`,`description` và `total`, chúng ta có thể chỉ cần tạo một trường cho họ và truy xuất dữ liệu của họ.
  -  Bởi vì mối quan hệ has_many-thuộc_to của chúng ta, chúng ta cũng có thể làm một trường `payments` sau đó tra về tất cả `Types::PaymentType` đối tượng thuộc mỗi `order`.

 - Tuy nhiên `order` không có cột `payments_count` vì vậy chúng ta xác định phương thức `Payment_count ()` để trả về một số nguyên bằng độ dài của mảng thanh toán.


#### Define fields on QueryType

Chúng ta gần như đã sẵn sàng để viết Truy vấn đầu tiên, nhưng trước tiên, chúng ta cần cho QueryType chính mong đợi nó, Khi GraphQL nhận được một yêu cầu Truy vấn (trái ngược với một yêu cầu Mutation), nó sẽ được chuyển đến lớp QueryType, Giống như `Types` ở trên, chúng ta sẽ xác định các phương thức Truy vấn có thể có thông qua các trường.

Truy vấn đầu tiên của chúng ta sẽ chỉ đơn giản là truy xuất tất cả các Đơn hàng trong cơ sở dữ liệu, Bên trong khai báo của class `QueryType`, chúng ta sẽ thêm một trường trả về một mảng  ty `Types::OrderType`:

```
# app/graphql/types/query_type.rb
module Types
    class QueryType < Types::BaseObject
        field :all_orders, [Types::OrderType], null: false

        def all_orders
            Order.all
        end
    end
end
```
Như ở trên, chúng ta xác định phương thức all_orders () của mình bên dưới trường có cùng tên và yêu cầu nó trả về tất cả các Đơn hàng một cách đơn giản.

Mọi thứ hiện đã được thiết lập! Chúng ta có thể mở Insomnia và viết Truy vấn đầu tiên để lấy lại tất cả các Đơn hàng từ cơ sở dữ liệu.


#### Writing our first Query

GraphQL Query format
Đây là những gì Truy vấn đầu tiên của chúng ta sẽ trông như thế nafy :

```
query {
    allOrders {
        id
        description
        total      
        payments {
            id
            amount
        }
        paymentsCount
    }
}
```
Ở trên cùng, chúng ta xác định yêu cầu là `query {}`, bên trong truy vấn, chúng ta gọi `all_orders` của `QueryType` thông qua `allOrders 
{}`. đừng quên chuyển từ  snake-case to camel-case!

Bên trong `allOrders {}`, chúng ta chọn các trường từ mô hình Order mà chúng ta muốn trả về, Đây là những trường giống như chúng ta đã xác định trong `app/graphql/types/order_type.rb` Bạn có thể chọn và chọn những cái bạn muốn nhận!

Lưu ý rằng : với trường `Payment {}`, chúng ta cũng phải xác định các trường từ `Types :: PaymentType` mà chúng ta muốn nhận. Các trường có sẵn là những trường chúng ta đã xác định trong `app / graphql / styles / Payment_type.rb.`

Trường `PaymentCount` sẽ chạy phương thức `Payment_count` trên `Types::OrderType` và trả về giá trị thích hợp.
và bây giờ Hãy đưa Truy vấn này vào Insomnia và kiểm tra API của chúng ta!

#### Execute Query in Insomnia
Đầu tiền chúng ta cần phải bật server lên bằng câu lệnh: `rails s`và click vào đường link sau đây:  http://localhost:3000/graphql.

Mở Insomnia và tạo một POST reques. Ở góc trên cùng bên trái của trình soạn thảo văn bản yêu cầu, hãy  bảo định dạng của yêu cầu POST được đặt thành "GraphQL Query". ("Truy vấn GraphQL".)

NEXT :

Chúng ta thêm mã từ truy vấn ở trên. Sau đó, gửi nó đi và xem những gì nó trả về:

![](https://images.viblo.asia/2e8129e4-d2d9-4c0a-a485-c4bd1a3f8062.png)


Tuyệt vời! Tất cả dữ liệu của chúng ta đều đẹp và có tổ chức - và đó là chính xác và CHỈ những gì chúng ta yêu cầu


ok tiếp theo Hãy chạy một truy vấn tương tự, nhưng với ít trường hơn:


```
query {
    allOrders {
        description
        total      
        payments {
            amount
        }
    }
}
```
![](https://images.viblo.asia/aa8272d3-b1f1-4f87-ae1c-c0c3ba483d37.png)


Hoàn hảo! Nếu chúng ta không cần` id` hoặc `PaymentCount`, thì hoàn toàn không cần đưa chúng vào Truy vấn!

## Conclusion :

Bây giờ chúng ta có một API rất đơn giản để truy vấn dữ liệu từ cơ sở dữ liệu bằng GraphQL! Tuy nhiên, vì Truy vấn GraphQL chỉ có thể truy xuất dữ liệu, chúng t không thể sử dụng mã hiện tại của mình để thực hiện bất kỳ thay đổi nào đối với cơ sở dữ liệu. Vậy trong hôm nay chúng ta đã có 1 bài tổng quan về cách cài đặt và ghép nối 2 thằng lại với nhau, và cách sử dụng graphql sau khi ghép nối, hy vọng rằng bài viết này đầu tiên sẽ giúp các bạn cài đặt được graphql và hơn nữa biết cách sử dụng cơ bản của nó khi kết hợp với Rails. Hẹn các bạn trong các bài viết tiếp theo !

Nguồn:  https://dev.to/isalevine/ruby-on-rails-graphql-api-tutorial-from-rails-new-to-first-query-76h