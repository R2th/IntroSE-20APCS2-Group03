Các coder mới thường rất bỡ ngỡ khi vào dự án mới mà có các công nghệ mới, thấy mọi người dùng rất dễ dàng, còn mình thì lại chật vật đi mò mẫm tìm hiểu. Và khó khăn của mình gặp phải là ActiveModel Serializers. Sau khi tìm hiểu và sử dụng, mình thấy Serializers như bàn tay ma thuật giúp dữ liệu lấy từ active record, mình có thể nhào nặn để phù hợp với dữ liệu  mình cần. Khá thú vị  phải không và hữu ích đặc biệt là đối với các dự án sử dụng Rails API cần thao tác với dữ liệu kiểu Json.  Vì thế bài này mình muốn chia sẻ cho những bạn mới như mình có thể tiếp cận một cách dễ hiểu nhất về nó cũng như bước đầu có thể sử dụng và custom dữ liệu cho phù hợp.

## 1. Dữ liệu Demo
![](https://images.viblo.asia/2a9bfc7c-c042-4c2f-98e8-d4e973fd4f55.png)
Model Relationships

Và đây là phần nội dung trong model của chúng:
```
## app/models/user.rb
class User < ApplicationRecord
   has_many :mountains
   has_many :regions
end
## app/models/mountain.rb
class Mountain < ApplicationRecord
   belongs_to :user
   belongs_to :region, optional: true
end
## app/models/region.rb
class Region < ApplicationRecord
   has_many :mountains
   belongs_to :user
end
```

Chúng ta sẽ bắt đầu với action `Index` và `Show` trong Restful và chúng gần như giống nhau:

```
## app/controllers/users_controller.rb
class UsersController < ApplicationController
   def index
      render json: User.all
   end
   def show
      render json: User.find(params[:id])
   end
end

## app/controllers/mountains_controller.rb
class MountainsController < ApplicationController
   def index 
      render json: Mountain.all
   end
   def show 
      render json: Mountain.find(params[:id])
   end
end

## app/controllers/regions_controller.rb
class RegionsController < ApplicationController
   def index
      render json: Region.all
   end
   def show
      render json: Region.find(params[:id])
   end
end
```

Các bạn nhớ thêm khai báo trên Routes các action này nhé. Và phần quan trọng nhất, cùng đến với ActiveModel::Serializer nào.

## 2. ActiveModel::Serializer

`ActiveModel :: serializer` là gem của rails cho phép bạn mô tả những thuộc tính nào bạn muốn trả về trong phản hồi json của bạn. Ngoài ra, Bạn còn có thể custom lại cấu trúc dữ liệu trả về của model theo các thông số kỹ thuật và yêu cầu dự án của riêng bạn.
### a,  Set-up

Như các gem khác, bạn thêm gem này vào Gemfile:
```
gem 'active-model-serializer'
```
sau đó chạy `bundle install` là được.

Để thêm serializer vào dự án của bạn, bạn chạy câu lệnh:
```
rails g serializer <model>
```
Trong VD của chúng ta, cần chạy:
```
rails g serializer user
rails g serializer region
rails g serializer mountain
```
Các model sẽ được thêm file serializer tương ứng tại thư mục` /serializer` của roject có dạng như này:
```
## app/serializer/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
end
```

### b, Thêm Attributes

Vì đã có serializer, Rails sẽ tự động tìm đến `ActiveModel :: serializer` để xác định các thuộc tính nào trong các mô hình của bạn sẽ trả về. Hiện tại, với tập tin có cấu trúc như trên, thì không có gì! Hãy để thêm một số thuộc tính như:

```
## app/serializer/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
   attributes: :username, :address, :city, :state, :mountains, :regions
end
```

Thay vì truy xuất dữ liệu bình thường sẽ trả kiểu active record thì điều này sẽ trả về JSON chứa các thuộc tính của user: username, address, city, state  và bao gồm cả danh sách mountains và regions của user(vì chúng đều quan hệ 1-n với uesr mà :) ), tiện lợi nhỉ. Chẳng hạn như trong PHP, để có được 1 Json từ DL thông thường bạn phải hiểu và thao tác linh hoạt với 2 hàm` json_encode` và `json_decode`, nhiều khi khá lằng nhằng và phức tạp, với đống dữ liệu lớn, bạn nghiên cứu chán mới xong. Với serializer, chúng xử lí trong nốt nhạc vậy.

Tuy nhiên, cách tiếp cận này sẽ chỉ trả về một tệp json được lồng sâu một cấp(vd mới thể hiện được quan hệ cha con ở đây). Rất nhiều dữ liệu có thể có về mỗi `mountain` và `region` sẽ không được trả lại(VD: mỗi `region` sẽ liệt kê các `moutains` tương ứng chẳng hạn, nhưng chúng lồng sâu 2 cấp dưới `User` nên sẽ bị ActiveRecord::Serializer bỏ qua). Ta cần giải pháp cho tình huống này.

### c, Attributes với Nested ActiveRecord Associations

```
## app/serializer/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
   attributes: :username, :address, :city, :state
   has_many :mountains
   has_many :regions
end
```

Tuy nhiên, điều gì sẽ xảy ra nếu bạn muốn cung cấp các thuộc tính tùy chỉnh hoặc thực hiện các thao tác trên các thuộc tính của bạn trước khi gửi chúng đến frontend (hoặc bất cứ nơi nào chúng có thể đi)?  Những triển khai này sẽ là trường hợp cụ thể và cần lưu ý việc chuyển đổi dữ liệu đơn giản (viết hoa, toán đơn giản, v.v.) có lẽ nên được thực hiện trên thiết bị client (ví dụ sử dụng JavaScript). Điều này cũng có lợi ích của việc trả lại dữ liệu cho client hoặc người dùng của bạn phản ánh chặt chẽ cách nó được lưu trữ trong cơ sở dữ liệu.

### d, Custom Attributes

Tuy nhiên, nếu bạn muốn thực hiện các phép biến đổi phức tạp hoặc đang phục vụ các client có tài nguyên hạn chế cần dữ liệu được định dạng trước, thì các thuộc tính tùy chỉnh là cách phù hợp. Hãy reformat serializer để trả về một `combined_address`, thay vì riêng biệt trên đường phố, thành phố và vùng miền:

```
class UserSerializer < ActiveModel::Serializer
   attributes: :username, :combined_address
   has_many :mountains
   has_many :regions
   def combined_address
      combined_address = object.street + ',' + object.city + ',' +  object.state
      return combined_address
   end
end
```

Với cách ở trên, đối tượng đề cập đến User hoặc current class của bạn và có chức năng tương đương với việc gõ `User.street + ',' + User.city + ',' + User.state`.

Điểm đáng chú ý ở đây là các chức năng được xác định trong `ActiveModel :: serializer` ( hàm combined_address) có toàn quyền truy cập vào các phương thức và liên kết ActiveRecord thông thường (ví dụ: `User.username`, `User.maxs`, `User.find`, v.v.) và toàn bộ sức mạnh của Ruby. Mặc dù ví dụ này cực kỳ đơn giản và dễ dàng thực hiện phía client, nhưng nó chỉ hiển thị những gì có thể được thực hiện và những biến đổi phức tạp hơn của dữ liệu của chúng tôi có thể được thực hiện.

## 3. Sử dụng ngoại API ở backend phục vụ frontend

Các tùy chỉnh được mô tả ở trên không yêu cầu phải dùng `ActiveModel :: serializer` . Toàn bộ chức năng trên có thể được thực hiện bằng cách chỉ sử dụng `users_controller` và model user. Chỉ cần tạo một tuyến đường đến chức năng chính xác trong  model user của bạn, xây dựng hàm băm trong hàm đó đại diện cho dữ liệu bạn muốn bằng cách sử dụng các liên kết và phương thức ActiveRecord của bạn, sau đó trả về hàm băm đó.

Ví dụ: giả sử, bạn nói rằng bạn muốn người dùng của bạn có thể truy vấn API hoặc phụ trợ của bạn với một số tham số nhất định, sử dụng các tham số đó để tìm nạp từ API bên ngoài và sau đó cung cấp thông tin trả về cho user hoặc client của bạn. Ví dụ dưới đây cho thấy cách thực hiện việc này bằng API Dark Sky cho thời tiết.

```
## app/config/routes.rb
get 'weather/forecast/:lat/:lon', to: 'weather#getForecast'

## app/controllers/weather.rb
class WeatherController < ApplicationController
   def getForecast
      render json: Weather.getForecast(params[:lat], params[:lon])
   end
end
## app/model/weather.rb
class Weather < ApplicationRecord
   def self.getForecast(lat, lon)
      lat = lat.to_f
      lon = lon.to_f
      key = <api key here>
      url = "https://api.darksky.net/forecast/" + key + "/#{lat},#{lon}"
      response = HTTParty.get(url)
      return response.parsed_response
      ## optionally perform transformation to this data, then return
   end
```
VD trên cho thấy muốn lấy thông tin weather bạn tạo trên model hàm cung cấp đầy đủ về  thông số cần thiết, key và url API, và response thì khi call API, controller sẽ sử lý và trả ra được dữ liệu bạn mong muốn. Nhưng mình thấy khai thác gì cũng phải viết hàm tại model thế này thì hệ lụy model fat là điều không thể tránh khỏi.

## 4. Lời kết

Trên đây là VD mình lấy để giải thích về cách sử dụng và custom lại kiểu dữ liệu bạn muốn lấy từ database bằng serializer. Bài viết còn nhiều thiếu sót rất mong các bạn có thể đóng góp để  mình hoàn thiện tốt hơn. :)

[Tham khảo](https://medium.com/@imanj12/how-to-write-custom-serializers-in-ruby-on-rails-1b8a30351532)