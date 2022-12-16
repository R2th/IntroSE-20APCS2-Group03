## 1.Giới thiệu
Trong lập trình, chúng ta hẳn sẽ gặp các trường hợp cần insert một lượng lớn dữ liệu vào trong cơ sở dữ liệu, và trường hợp thường gặp nhất là đọc dữ liệu từ các file excel, csv... và thêm vào cơ sở dữ liệu. Và nếu thực hiện theo cách thông thường thì số câu lệnh SQL phải thực thi sẽ rất nhiều. Xét ví dụ dưới đây: 

Ví dụ: Ở đây mình có một bảng Product gồm 2 trường name và price, mình sẽ khởi tạo 100 đối tượng và sau đó insert vào trong cơ sở dữ liệu
```
    products = []
    
    100.times do |i|
      products << Product.new(name: "Product #{i}", price: "1000")
    end

    products.each do |product|
      product.save
    end
```
Và đây là kết quả, quá trình xử lý ở model hết khoảng 14 giây, và có 100 câu query insert được thực thi để chèn dữ liệu vào trong database, nếu trong trường hợp này chúng ta có 1.000 hay 10.000... Product thì số lượng query sẽ rất lớn và thời gian thực thi sẽ rất lâu. Và may mắn thay, có một thư viện có thể giúp chúng ta trong việc này là gem activerecord-import
![](https://images.viblo.asia/fb1d29bc-8c43-464a-8ec1-e635e931c049.png)
## 2.Cài đặt và sử dụng
### 2.1 Cài đặt
Cách cài đặt rất đơn giản, bạn chỉ cần thêm *gem "activerecord-import"* vào Gemfile và chạy lệnh *bundle install* để cài đặt. Sau khi cài đặt, gem sẽ tự tạo một class method trong class ActiveRecord::Base là *import*  

Và đây là kết quả khi sử dụng gem activerecord-import, thời gian được rút ngắn rất đáng kể, chỉ còn khoảng 0,5s. Vì activerecord-import đã lấy dữ liệu và chỉ sử dụng 1 câu lệnh insert để chèn nhiều dữ liệu vào database

![](https://images.viblo.asia/69920f05-f93f-4de6-abc8-e18752a4b227.png)

Đây là tính năng chính của activerecord-import là tạo ra số lượng câu insert nhỏ nhất , tránh vấn đề N+1 câu insert
### 2.2 Sử dụng
**- Sử dụng ActiveRecord Models**
```
    products = []
    
    100.times do |i|
      products << Product.new(name: "Product #{i}", price: "1000")
    end
    
    Product.import products
```

Với quan hệ association ta sử dụng option :recursive
```
    products = []
    
    100.times do |i|
      product = Product.new(name: "Product #{i}", price: "1000")
      product.product_order.build user_id: user.id
      products << product
    end
    
    Product.import products,  recursive: true
```

**- Sử dụng mảng**
```
    product_values = []
    columns = [ :name, :price ]
    
    100.times do |i|
      product_values << ["Product #{i}", "1000"]
    end
    
    Product.import columns, product_values
```

**-Sử dụng hash**
```
    product_values = []
    
    100.times do |i|
      product_values << { name: "Product #{i}", price: "1000" }
    end
    
    Product.import product_values
```
**- Các giá trị trả về**
Sau khi method import được thực thi nó sẽ trả về một đối tượng ActiveRecord::Import::Result chứa các thuộc tính thể hiện kết quả của qúa trình import
- failed_instances : Một mảng các đối tượng mà validate fails và không được insert vào database
- num_inserts :  Số lượng các câu lệnh insert trong quá trình import dữ liệu
- ids : Một mảng chưa id của các record được thêm thành công (chỉ có ở db Postgres)

**- Các tùy chọn**


| Key | Tùy chọn |Mặc định| Mô tả |
| -------- | -------- |-------- |-------- |
| :validate | true/false | true | Bật tắt validation |
| ::validate_uniqueness |  true/false | false |  Bật tắt các validation unique |
| :on_duplicate_key_ignore | true/false | false | Nếu là true sẽ bỏ qua các record bị trùng khóa chính hoặc column unique |
| :on_duplicate_key_update | :all, Array, Hash | N/A | Nếu bị trùng khóa chính hoặc column unique, sẽ ghi đè lên dữ liệu cũ |
| :recursive | true/false | false | Sử dụng khi muốn import một object có quan hệ has_many associations (chỉ khả dụng ở db Postgres) |
| :timestamps | true/false | true | Bật tắt timestamps cho các bảng ghi được import. Sử dụng trong trường hợp các bản ghi quá lớn ,để tránh trường hợp quá tải |
| :batch_size | Integer | Tổng số lượng records | Chỉ định số lượng record sẽ được insert |
| :raise_error | true/false | false | Bắn ra exception nếu có bất kỳ record nào không hợp lệ, có thể thay thế bằng method import! |

## 3.Tham khảo
- https://github.com/zdennis/activerecord-import
- https://techblog.vn/gem-activerecord-import-in-rails