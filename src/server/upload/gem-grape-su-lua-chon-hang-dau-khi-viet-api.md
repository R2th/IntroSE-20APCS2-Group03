## 1. Giới thiệu
Xin chào tất cả mọi người, một tháng trôi qua rất nhanh phải không nào. Tình hình dịnh bệnh covid 19 không chỉ trên nước ta mà trên toàn thế giới là mấy ngày qua rất là đáng lo ngại. 

Thôi đó là vấn đề chung rồi mình không nhắc đến nữa, đến với bài chia sẻ ngày hôm nay thì mình muốn giới thiệu với các bạn một gem viết api rất là tuyệt vời đó là gem grape api.

Trước tiên mình xin giới thiệu đơn giản về Api:
API được viết tắt bởi cụm từ tiếng Anh Application Programming Interface, tức giao diện lập trình ứng dụng. Đây là phương tiện cho hai hoặc nhiều ứng dụng trao đổi, tương tác với nhau, tạo ra tương tác giữa người dùng với ứng dụng hiệu quả và tiện lợi hơn.

Với API, các lập trình viên có thể tiếp cận, truy xuất dữ liệu từ máy chủ thể hiện chúng trên ứng dụng phần mềm hoặc website của mình một cách dễ dàng hơn.

Chắc các bạn sử dụng ngôn ngữ ruby để code thì có framework ruby on rails để code web nhỉ. Ở cái framework này  thường thường thì các bạn code api bằng rails api. Từ trước đến giờ mình cũng hay dùng cách này để code api, cũng cấu trúc controller, model, response trả về dạng json. Nhưng từ khi mình được join vào 1 dự án mới sử dụng gem grape api để viết api thì mình cảm thấy gem này vượt trội hơn so với cách viết api thông thường mà chúng ta sử dụng rails api. Để hiểu chi tiết về nó thì chúng mình cùng đi tìm hiểu nhé ! let go :running_woman:

## 2. Tìm hiểu về grape
### 2.1 Khái niệm
Grape là một khung API giống như REST cho Ruby. Nó được thiết kế để chạy trên Rack hoặc bổ sung các ứng dụng web hiện có như Rails và Sinatra bằng cách cung cấp DSL đơn giản để dễ dàng phát triển API RESTful. 

Hiện tại version grape đang chạy là 1.3.1. Lần update version tiếp theo là version 1.3.2

Để có thể hiểu nhanh thì chúng ta đi vào ví dụ đơn giản bên dưới nhé.

### 2.2 Ví dụ đơn giản

Các bạn tạo cho mình một project rails cơ bản nhé. Sau đó các bạn copy 3 gem dưới đây vào gemfile và chạy `bunlde install ` nhé.
```
 gem 'grape'
 gem 'grape_on_rails_routes'
 gem 'grape-entity'
```

Ở đây mình giới thiệu chức năng của từng gem:

 + `gem 'grape'` : gem này dùng để code api, đây là gem chính chúng ta sử dụng.
 + `gem 'grape_on_rails_routes'` : gem này dùng để chúng ta kiểm tra routes mà chúng ta định nghĩa. Bình thường các bạn cấu hình các routes trong file `routes.rb` trong thư mục `config`, khi muốn kiểm tra các bạn chạy lệnh `rails routes`. Nhưng khi các bạn sử dụng `gem 'grape'` thì chúng ta phải có 1 gem hỗ trợ để kiểm tra routes, và ở gem này để kiểm tra routes các bạn chạy lệnh `rails grape:routes`.
 + `gem 'grape-entity'`: gem này dùng để format lại response các bạn muốn trả ra như nào, gem này tương tự như 
` gem 'active_model_serializers'` các bạn có thể search và tìm hiểu thêm nhé.

Cấu hình để sử dụng gem các bạn cho 2 dòng này vô file `application.rb` nhé
```
 config.paths.add File.join('app', 'api'), glob: File.join('**', '*.rb')
 config.autoload_paths += Dir[Rails.root.join('app', 'api', '*')]
```

Ở đây mình làm ví dụ đơn giản là về CRUD Product nhé, các bạn tạo model Product với 3 trường là (name, quantity, price).

Về cấu trúc api chúng ta các bạn tạo cho mình một thư mục api trong forder `app` nhé:

![](https://images.viblo.asia/5b139a0a-2fc7-4095-9c4a-61ec513e6c11.png)

Ở đây mình sẽ không thao tác trên controllers nhé, nhưng cái trong thư mục api của mình coi nó như là controller bình thường.

Khi làm dự án viết api thì các bạn thấy hay có forder `v1, v2, v3...` Vậy nó là cái gì ? Đó là version của api nhé. Ví dụ dự án của bạn phát triển qua 3 giai đoạn, mỗi giai đoạn các bạn sửa nay cần nâng cấp nó lên thì mình sẽ viết vào từng thư mục để tiện cho việc phát triển.

Mình sẽ có 3 file cơ bản là:

File `base.rb` file này là file cha và sẽ mount đến các file trong thư mục`v1, v2, v3...` nhé.

```
 class Base < Grape::API
   format :json
   prefix :api

   mount V1::ProductApi
 end
```

File `product_api.rb` đây là file mà chúng ta code các chức năng của bạn.
Bình thường trong rails thì các bạn định nghĩa routes trong file routes. Nhưng khi sử dụng gem grape thì chúng ta sẽ định nghĩa routes trong routes là phần code xử lý các chức năng luôn của mình. 

Rất lạ phải không nào, mình mới đầu làm quen với các sử dụng của gem này mình cũng rất là hoang mang vì nó khác rất nhiều với các viết api truyền thống.
```
 module V1
   class ProductApi < Grape::API
     version 'v1', using: :path

     resource :products do
       desc 'Get list products'
       get do
         @products = Product.all
         present @products, with: Entities::V1::ProductFormat
       end

       desc 'Create product'
       params do
         requires :name, type: String
         requires :quantity, type: Integer
         requires :price, type: Integer
       end
       post do
         @product = Product.create!(params)
         present @product, with: Entities::V1::ProductFormat
       end

       route_param :id do
         before do
           @product = Product.find(params[:id])
         end

         desc 'Show a product'
         get do
           @product
           present @product, with: Entities::V1::ProductFormat
         end

         desc 'Update a product'
         params do
           requires :id, type: Integer
           requires :name, type: String
           requires :quantity, type: Integer
           requires :price, type: Integer
         end
         patch do
           @product.update(params)
           present @product, with: Entities::V1::ProductFormat
         end

         desc 'Delete a product'
         params do
           requires :id, type: String
         end
         delete do
           @product.destroy
         end
       end
     end
   end
 end
```

File `product_format.rb` file này là chúng ta format response trả về. Ví dụ 1 record trong rails có cả các trường như created_at, updated_at, các bạn không cần dùng đến mấy trường đó và khi trả về cả những trường đó dẫn đến server chúng ta bị chậm hơn, điều đó gây lãng phí và không cần thiết.

Các bạn muốn trường nào trả về trong response thì có thể định nghĩa file trong forder entities nhé.
```
 module Entities::V1
   class ProductFormat < Grape::Entity
     expose :id
     expose :name
     expose :quantity
     expose :price
   end
 end
```

Và cuối cùng trong routes bạn config 
```
 Rails.application.routes.draw do
   mount Base => '/'
 end
```
Ok đến đây thì mình cũng đã hoàn thành ví dụ demo cho các bạn rồi.
## 3. Kết luận
Rất đơn giản phải không nào, chỉ với vài bước đơn giản là chúng ta có thể hiểu được cấu trúc sử dụng của gem grape api rồi. Đến đây thì bài chia sẻ của mình cũng xin phép được dừng lại, rất vui vì được chia sẻ kiến thức đến các bạn, cũng rất mong mọi người hiểu biết về kiến thức mới cùng chia sẻ cho mọi người biết và phát triển nhé

Nếu thấy hay hãy upvote cho mình nhé ! Tạm biệt các bạn hẹn các bạn vào lần chia sẻ tháng tới !

Tài liệu tham khảo:

+ https://github.com/ruby-grape/grape
+ https://github.com/ruby-grape/grape-entity
+ https://github.com/syedmusamah/grape_on_rails_routes