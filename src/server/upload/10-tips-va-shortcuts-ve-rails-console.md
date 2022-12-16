### Mở đầu

Với Rails console, bạn có thể tương tác với ứng dụng Rails từ dòng lệnh mà không cần sử dụng trình duyệt web. Nó là một sell IRB mạnh mẽ được tải với môi trường Rails.

Bạn cũng có thể sử dụng Rails console cho truy vấn cơ sở dữ liệu, test hoặc debug ứng dụng rails mà không cần sử dụng tương tác trình duyệt.

Rất nhiều developers ở cấp độ mới bắt đầu không nhận thức được thực tế này. Bạn có thể test lệnh với backend của ứng dụng. Những phương pháp này ở đây có thể làm dễ dàng hơn cho bạn.

Bạn không còn phải đợi trước trình duyệt để kiểm tra đầu ra của mình.

### Starting Console
Bây giờ, chúng ta chạy rails console bằng lệnh sau:
```ruby
$ rails console
```
Hoặc ngắn gọn
```ruby
$ rails c
```
### Changing Environment
Theo mặc định khi bạn chạy rails console, nó sẽ kích hoạt trong mode development.
```ruby
$ rails console

Loading development environment (Rails 5.2.3)
```
Nếu bạn mướn mở Rails console trong một môi trường cụ thể, bạn có thể sử dụng option -e với tên môi trường.

Ví dụ, chúng ta muốn mở Rails console trong mode production:
```ruby
$ rails console -e production

Loading production environment (Rails 5.2.3)
```
### Clearing Console
Đôi khi ta không thích làm việc dưới cùng của cửa sổ hoặc khi có dữ liệu đầu ra lớn trên không gian làm việc. Lệnh Clear sẽ không hoạt động trong Rails console, nó sẽ trả về như sau:
```ruby
> clear

NameError (undefined local variable or method `clear' for main:Object)
```
Nếu ta muốn clear rails console, ta sử dụng ctrl+l trong môi trường Linux hoặc lệnh +k để clear trong mac.
### Reloading Console
Trong nôi trường development, mã ứng dụng sẽ tự động tải lại cho mọi request mới. Đôi khi bạn thay đổi hoặc thêm thư mục mới, bạn cần tải lại trình duyệt để xem những thay đổi trong ứng dụng rails.

Rails console đang chạy mặc định trong môi trường development, nhưng nó không tải lại các thay dổi mới. Tại thời điểm bắt đầu rails console, tất cả các tệp được tải và lưu trữ trong cache cho đến khi kết thúc rails console. Nếu bạn cần thay đổi mới trong rails console, bạn có thể thoát khỏi rails console và bắt đầu lại. Nhưng nó không phải là một ý tưởng tốt khi chúng ta thường xuyên thay đổi code. Thay vì điều này, chúng ta có thể sử dụng lệnh sau để làm mới những thay đổi mới:
```ruby
> reload!
 
Reloading...
 
 => true
```
### Autocomplete
Rails console có mặc định được dựng trong chức năng autocomplete. Khi bắt đầu nhập tên class và nhấn TAB, nó sẽ tự động hoàn thành nó hoặc nó sẽ hiển thị danh sách cách options có sẵn. Nó sẽ chỉ hoạt động với class tích hợp Ruby và Rails mặc định.
```ruby
> Hash TAB
 
Hash  HashWithIndifferentAccess
```
Chúng ta cũng có thể sử dụng autocomplate cho tên method của bất kỳ class hoặc object nào.
```ruby
> Hash.TAB
 
Display all 179 possibilities? (y or n)
```
Giả sử ta muốn autocomplete cho model và controllder có sẵn trong thư mục /app, điều này không thể thực hiện được lần đầu tiên. Nếu ta đã sử dụng rails console, thì ta có thể.

Ví dụ, chúng ta có model Product. Chúng ta  đã sử dụng trong rails console và bây giờ chúng ta muốn sử dụng nó để chạy query. Bây giờ, chúng ta có thể gõ Pro, nó sẽ trả về các options có sẵn.
```ruby
> Pro TAB
 
Proc     Process Product
```
Giả sử bạn gõ ‘Prod, nó sẽ autocomplete ra model Product.
```ruby
> Prod TAB
 
> Product
```
Giả sử bạn muốn autocomplete các method do người lập trình định nghĩa trong model, chúng ta lấy nó từ object Product.
```ruby
> product.ge

product.gem                product.get_discount_amt product.get_product_name   product.get_selling_price
```
### Searching Command History
Giả sử chúng ta muốn trả về các query đã sử dụng hoặc để sửa đổi query và chạy, rails console cung cấp ta 2 options.

1.  Chúng ta sử dụng mũi tên lên và xuống, bạn nên nhớ lại các lệnh đã sử dụng trước đó. Sử dụng mũi tên lên, chúng ta có thể xem code đã được sử dụng trước đó và sử dụng mũi tên xuống để quay lại.
2.  Giả sử bạn đang sử dụng rất nhiều query trong rails console, sử dụng mũi tên để tìm query sẽ mất nhiều thời gian hơn. Chúng ta có thể sử dụng lệnh tìm kiếm Unix bash shell ở đây. Bằng cách sử dụng Ctrl+r, chúng ta có thể tìm kiếm query được sử dụng trước đó ở phía sau và trả về query đầu tiên phù hợp với chuỗi tìm kiếm của ta.
### Last Expression
Đôi khi, khi đã gõ query và nhấn enter, nó sẽ trả về kết quả. Dựa trên kết quả này, bạn có thể thực hiện một số thao tác. Hãy nói, bạn quên gắn kết một biến, nếu tình huống này phát sinh, chỉ cần nhấn mũi tên lên và gán cho biến và enter.

Rails console cung cấp chúc năng tuyệt vời cho việc này. Nó lưu trữ biến thức cuối cùng trong biến '_'(gạch dưới).
```ruby
Product.where('mrp < 100')
```
Bây giờ nhấn enter nó sẽ trả về kết quả, ta có thể gán nhứng kết quả đó trong một số biến. giá trị _ sẽ liên tục thay đổi dựa trên biểu thức cuối cùng chúng ta chạy.

```ruby
> products = _
 
> products.count 
 
=> 12
```
Bây giờ chúng ta kiểm tra biến _. Nó có giá trị là 12 vì nó chỉ lưu trưc giá trị biểu thức cuối cùng.
```ruby
> _
 
=> 12
```
### Vô hiệu hóa CSRF Token
Ví dụ, ta muốn kiểm tra method create product qua console, ở đây, ta có thể sử dụng dòng sau để gọi method create cho product:
```ruby
> app.post "/products", params: {name: "pen"}
```
Nó sẽ trả về response:
```ruby
Started POST "/products" for 127.0.0.1 at 2019-08-03 22:00:09 +0530
 
Processing by ProductsController#create as HTML
 
  Parameters: {"name"=>"pen"}
 
Can't verify CSRF token authenticity.
 
Completed 422 Unprocessable Entity in 2ms (ActiveRecord: 0.0ms)
 
ActionController::InvalidAuthenticityToken (ActionController::InvalidAuthenticityToken):
 
(irb):22:in `irb_binding'
 
 => 422
```
Sử dụng lệnh sau ta có thể vô hiệu hóa xác thực của mã thông báo CSRF.
```ruby
ApplicationController.allow_forgery_protection = false
```
Bây giờ ta có thể gọi method create để tạo 1 product, nó sẽ hoạt động như mong đợi.
### Sandbox
Sanbox là một option rất tốt để tương tác vơi ứng dụng rails, đặc biệt là trong môi trường development. Nó sẽ khôi phục hoặc hoàn nguyên tất cả các thay đổi chúng ta đã thực hiện trong cơ sở dữ liệu khi chúng ta thoát khỏi rails console.

Ví dụ, chúng ta sẽ test một số code trong rails console mà không thay đổi dữ liệu, có thể gọi rails console với option -sandbox.
```ruby
$ rails console -e production --sandbox 
 
Loading production environment in sandbox (Rails 5.2.3)
 
Any modifications you make will be rolled back on exit
```
tiếp theo chúng ta xóa 1 product để test option -sandbox.
```ruby
> Product.destroy(1)
 
Product Destroy (0.7ms)  DELETE FROM "products" WHERE "products"."id" = $1  [["id", 1]]
 
> Product.find(1)
 
ActiveRecord::RecordNotFound (Couldn't find Product with 'id'=1)
 
> exit
 
ROLLBACK
```
Đối với ví dụ trên, ta đã xóa 1 product, khi ta thoát khỏi rails console, tất cả các thao tác với cơ sở dữ liệu đều được khôi phục. Để bắt đầu một thao tác mới và test xem các thao tác với cơ sở dữ liệu có thực sự được phục hồi hay không.
```ruby
$ rails console -e production --sandbox 
 
> Product.find(1)
 
=> #<Product id: 1, name: "Apple", ….>
```
Nếu ta thực sự cần thay đổi cơ sở dữ liệu, ta xóa option -sandbox.
### Source Location
Trong khi làm việc với rails console, method source_location chúng ta có thể thấy method được xác định và thực hiện chi tiết của method. Ví dụ, model Product của chúng ta có method instance discount_amount, chúng ta có thể nhận được vị trí của method discount_amount như sau:
```ruby
> Product.instance_method(:discount_amount).source_location

 => ["/home/arjun/Sampl_work/rr/app/models/product.rb", 7]
```
Chúng ta có thể gọi trực tiếp  soure_location. Đầu tiên, chúng ta gọi instance_method trên model Product bằng cách chuyền tên method làm đối số, điều này sẽ trả về object, nó đại diện cho method discount_amount. Từ object này, chúng ta có thể gọi vị trí soure của method.

Vị trí soure trả về đầu ra dưới dạng 1 mảng gồm hai giá trị. Giá trị đầu tiên đại diện vị trí của tệp và giá trị thú hai đại diện cho số dòng nơi method được định nghĩa.
```ruby
 > helper.pluralize(5, 'person')
 
 => "5 people"
 
> helper.number_to_currency(100)
 
 => "$100.00"
 
 > helper.number_to_human(1000)
 
 => "1 Thousand"
```
Nếu bạn muốn biết tất cả các method helper có sẵn, hãy sử dụng lệnh sau trong rails console, nó sẽ trả về danh sách các method helper.
```ruby
> helper.methods
```
### Listing tables
Giả sử bạn muốn biết chúng ta đã sử dụng bao nhiêu bảng trong cơ sở dữ liệu của mình, bạn có thể sử dụng lệnh  sau để liệt kê tất cả các tên bảng:
```ruby
> ActiveRecord::Base.connection.tables

 => ["schema_migrations", "ar_internal_metadata", "products", "articles"]
```
### Kết luận
Như vậy đây là 10 mẹo và cách viết tắt về raisl console, hi vọng các có thể ứng dụng khi lúc cần :v.

tài liệu tham khảo:
https://www.agiratech.com/rails-console-shortcuts-to-boost-productivity-ruby-on-rails-guide/