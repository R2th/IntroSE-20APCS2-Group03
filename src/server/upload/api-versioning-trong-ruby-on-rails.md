API versioning giúp thay đổi luồng xử lý của API cho những clients khác nhau. Một version API được xác định thông qua URL hoặc HTTP headers gửi lên từ phía client. Có rất nhiều cách để tạo 1 versioning.
Về cơ bản, khi bạn muốn thực hiện những thay đổi quan trọng trong code hoặc logic trong app và những thay đổi này có thể ảnh hưởng đến người dùng hiện tại, API là cách duy nhất để tránh ảnh hưởng tới người dùng cũ.
## API Versioning trong Ruby on Rails
Rails cung cấp rất nhiều gems hỗ trợ việc xây dựng API versioning. Hãy cùng tham khảo chức năng của chúng.
* ### *Versionist*
Đây là gems hỗ trợ 3 phân loại version theo: HTTP header, đường dẫn URL và request parameter. Routes, controller, serialiazers, tests và documentation là những namespaced. Điều này đã phân tách những dòng code của 1 version API khỏi những version khác. Điều này có vẻ như không cần thiết vì phần lớn những thay đổi xảy ra ở views hoặc serializers nhưng chính xác thì việc phân tách logic trong mỗi namespaces là một cách tiếp cận rất rõ ràng và tường minh khi làm việc với nhiều versions bên trong một controller.

Gem versionist cung cấp Rails generators để tạo ra 1 version mới cho API của bạn cũng như những thành phần mới bên trong vesion hiện tại. Nó cũng cung cấp 1 Rail generator để copy những thành phần trong version hiện tại sang version mới. Chúng ta không cần phải copy code từ version trước, chỉ cần kế thừa từ controller của version trước đó.

Dưới đây là một ví dụ của việc sử dụng gem versionist:
```ruby
namespace :versionist_api do

   api_version(

     header: {

       name: "Accept",

       value:  'application/vnd.versionist_api.v2+json'

     },

     module: "V2",

     defaults: { format: :json }

   ) do

     resources :books, only: [:index, :create, :show, :update, :destroy]

   end



   api_version(

     header: {

       name: 'Accept',

       value: 'application/vnd.versionist_api.v1+json'

     },

     module: 'V1',

     default: true,

     defaults: { format: :json }

   ) do



     resources :books, only: [:index, :create, :show, :update, :destroy]

   end

end
```
* ### *versioncake*
Đối với gem versioncake, phần lớn viện phân chia version cho views và controllers không phải là namespaced. Một ưu điểm của versioncake là nó sẽ chạy version trước nếu version hiện tại không có method tương ứng. Bên cạnh path, query params, accept header hay custom header, nó còn cung cấp khả năng tạo ra một version của riêng bạn để chấp nhận một đối tượng request nào đó. Nó cho phép các dev có thể chỉ định 1 version API tại bất kì đâu dưới bất kì hình thức nào mà họ mong muốn.
Dù versioncake không hỗ trợ controller, nó cung cấp 1 method đặc biệt để truy cập những request version và latest version bên trong controller. Tuy nhiên, điều này sẽ gây khó khăn cho dev khi viết code, đặc biệt trong trường hợp có những logic điều kiện bên trong controllers. Vì vậy, tốt hơn hãy sử dụng factory pattern trong trường hợp những action trong controller được thiết kế để thực thi 1 nhiệm vụ duy nhất trong mỗi version.

Versioncake có rất nhiều tính năng phong phú phục vụ những tác vụ khác nhau, bên cạnh đó, nó cũng có những hạn chế như sự xuống cấp của version. Ta có thể thấy đây là một phương án hoàn thiện cho việc versioning API nhưng ở góc độ khác, nó mang đến một vài rắc rối với những tính năng không cần thiết.

Ngoài ra, một vấn đề khác của versioncake là . Những gems như jbuilder và rabl có thể sử dụng versioncake từ templates của chúng và save như views. Nhưng với những gems hiện đại và phổ biến hơn như active_model_serializers không thể sử dụng versioncake. Điều này có thể không phải vấn đề lớn nếu bạn không muốn tái sử dụng thành phần của views như partials, với actiove_model_serializers, bạn có thể sử dụng tính kế thừa của Ruby
* ### *Grape*
Grape không đơn thuần là một công cụ API versioning, nó giống như REST- một API framework. Grape được thiết kế để chạy trên Rack hoặc những framework như Rails và Sinatry hỗ trợ bởi 1 ngông ngữ lập trình riêng biệt.

Để thực hiện chia phiên bản cho API, grape cung cấp 4 phương pháp: đường dẫn URL, Accept Header, Accept-Version Header và Request Parameter
As for API versioning, grape offers four strategies: URL Path, Accept Header (similar to the versioned media type approach), Accept-Version Header, and Request Parameter.
Duớii đây là một ví dụ ngắn của việc sử dụng grape cho mục địch phân loại version API.

Trước hết là module để cấu hình cho version đầu tiên:
```ruby
module GrapeApi

 module V1

   module Defaults

     extend ActiveSupport::Concern



     included do

       # this would let first api version respond to second as fallback

       version ['v2', 'v1'], using: :header, vendor: 'grape_api'

       # ….

     end

   end

end
```

Và version thứ hai: 
```ruby

module GrapeApi

 module V2

   module Defaults

     extend ActiveSupport::Concern



     included do

       # version "v2", using: :path

       version 'v2', using: :header, vendor: 'grape_api'

     end

 end

end
```
Ở file grape_api/base.rb, version thứ hai sẽ được đặt trước. Điều này giúp những request gửi tới version 2 sẽ được thực hiện với V2 logic (nếu tồn tài) hoặc trở lại version 1 để thực thi.
```ruby
module GrapeApi

 class Base < Grape::API

   mount GrapeApi::V2::Base

   mount GrapeApi::V1::Base

 end

end
```