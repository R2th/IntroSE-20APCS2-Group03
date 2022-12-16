Khi bạn build một Rails app mới, mặc định ta thường sử dụng ActiveRecord. Query với .**where**, insert với **.save** - tất cả đều dễ dàng và đủ nhanh.

Nhưng sau một thời gian - khi một trang có nội dung đơn giản mất những một giây hoặc lâu hơn để trở lại từ server, khi bạn bắt đầu thấy lỗi T505 Gateway Timeout từ nginx vì mất quá nhiều thời gian để xử lý nội dung bạn đã tải lên - đã đến lúc bạn sẽ phải dành một chút thời gian vào việc tăng hiệu suất.
Bạn có thể giải quyết rất nhiều vấn đề này với cache. Nhưng điều đó làm tăng thêm một lớp phức tạp. Các vấn đề về expiration, nesting partial,s và bug được sinh ra từ quá trình tạo app không phải là vấn đề cần xử lý lúc này. 

Thay vào đó, bạn cần dành thời gian để khắc phục những vấn đề về hiệu suất phổ biến nhất trong các ứng dụng Rails: **"Truy cập vào database quá nhiều"**

Ngay cả khi bạn đang chạy cơ sở dữ liệu trên cùng một máy, quá nhiều connect tới database sẽ làm giảm tốc độ. Và nếu cơ sở dữ liệu của bạn nằm trên một máy khác, việc fetching data thường sẽ gây ra lỗi.
Dưới đây mình xin trình bày một vài cách để cải tiến thời gian phản hồi của Rails app bằng cách tăng hiệu suất truy vấn với ActiveRecord.

# Lấy tất cả dữ liệu cùng một lúc trong ActiveRecord
Nếu bạn xem log trong ứng dụng chưa được tối ưu hóa, chúng có thể trông như thế này:
```
Processing by RestaurantsController#index as HTML
  Restaurant Load (1.6ms)  SELECT `restaurants`.* FROM `restaurants`
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 1
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 2
  Review Load (1.1ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 3
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 4
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 5
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 6
  Review Load (1.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 7
  Review Load (1.0ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 8
  Review Load (1.0ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 9
  Review Load (1.0ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` = 10
```
Bạn đang cố gắng tìm 10 nhà hàng cùng với các review và bạn đang thực hiện 10 lần gọi SQL!

Đó chính là vấn đề **"n+1 query"**: với mỗi nhà hàng, bạn thực hiện 1 truy vấn tới restaurant, cộng với 1 truy vấn tới mỗi review của nhà hàng đó. Có thể tưởng tượng nó sẽ tệ đến mức nào nếu bạn đi sâu hơn các associate như: lấy các địa chỉ chi nhánh của mỗi nhà hàng, rồi lấy số điện thoại của mỗi chi nhánh, ...

Bạn sẽ gặp sự cố này khi bạn lặp một danh sách các đối tượng và cố gắng truy vấn các liên kết của chúng:
```
<% @restaurants.each do |restaurant| %>
  <tr>
    <td><%= restaurant.name %></td>
    <td><%= restaurant.review_average %></td>
    ...
```

Bạn không cần phải truy cập cơ sở dữ liệu N + 1 lần, mà chỉ tối đa hai lần: một lần cho các nhà hàng bạn đang cố gắng tìm và một lần cho tất cả các đánh giá được liên kết với tất cả các nhà hàng đó. Giải pháp chính là **"eager loading"**, và dùng nó với **"included"**: 
### app/controllers/restaurants_controller.rb
```
def index
  @restaurants = Restaurant.all.includes(:reviews)
end
```
Hoặc, nếu bạn cần một truy vấn phức tạp hơn như là load trước tất cả các địa chỉ và tác giả của những bình luận liên quan tới nhà hàng đó:
### app/controllers/restaurants_controller.rb
```
def index
  @restaurants = Restaurant.all.includes([{:reviews => author}, :address])
end
```

Bạn phải chỉ ra được các liên kết bạn muốn load trước, sử dụng cú pháp array và hash như trên. Rails sẽ cố gắng hết sức để cải thiện các truy vấn đó:
```
Restaurant Load (1.2ms)  SELECT `restaurants`.* FROM `restaurants`
Review Load (3.0ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`restaurant_id` IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
```

Nếu bạn không phải là người fetching dữ liệu gốc, bạn cần phải tự tải trước, sử dụng **ActiveRecord::Associations::Preloader**:
```
ActiveRecord::Associations::Preloader.new.preload(@restaurants, [:reviews])
```
Nhưng nó chủ yếu hoạt động theo cùng một cách.

Vấn đề "N + 1 query" rất dễ khắc phục và dễ dàng tránh được khi bạn biết cách. Nhưng nó cũng dễ dàng bỏ lỡ, đặc biệt là nếu code của bạn được trải ra trên một số partials.

[Bullet gem](https://github.com/flyerhzm/bullet) sẽ cố gắng tự động phát hiện các truy vấn N + 1 khi chúng xảy ra, vì vậy bạn có thể tìm và sử dụng chúng. Và nếu bạn đang sử dụng [skylight.io](https://www.skylight.io/) để theo dõi hiệu suất của ứng dụng trong khi sử dụng, nó cũng sẽ phát hiện và báo cáo chúng cho bạn.
# Một vài tip cho preloading# 
Các ứng dụng thường có những cách khác nhau để show những dữ liệu giống nhau trên các trang giống nhau. Có thể bạn muốn hiển thị địa chỉ sắp xếp theo khoảng cách ở 1 phần nào đó của ứng dụng, và bạn lại muốn chỉ hiển thị địa chỉ mà có liên kết số điện thoại ở 1 phần khác của ứng dụng. 

Chỉ dùng eager loading cho trường hợp này chưa phải là tối ưu. Bởi nó là cùng một dữ liệu, chỉ được trình bày theo một cách khác. Vì vậy, đối với tình huống này, ta có thể tạo một liên kết unsorted_unfiltered_addresses và tải trước như sau: 
### app/models/restaurant.rb ### 
```
has_many :unsorted_unfiltered_addresses, :class_name => "Address"
```
```
Restaurant.includes(:unsorted_unfiltered_addresses)
```
Sau đó, tôi sẽ làm phần còn lại của việc sắp xếp và lọc trong Ruby:
```
def addresses_sorted_by_distance(point)
  unsorted_unfiltered_addresses.sort_by do |address|
    address.distance_from(point)
  end
end

def addresses_with_phone_numbers
  unsorted_unfiltered_addresses.select do |address|
    address.phone_number.present?
  end
end
```
Nó tiết kiệm được một vòng lặp truy vấn nhưng làm cho code phức tạp hơn một chút. Tuy nhiên, điều này là hữu ích và nên làm như vậy.
# Tạo SQL của riêng bạn trong ActiveRecord
Thế còn việc lấy số lượng đánh giá cho một nhà hàng? Hoặc trung bình đánh giá hoặc ngày đánh giá sớm nhất? Nếu bạn không cần bất kỳ dữ liệu đánh giá cụ thể nào, và bạn gọi tất cả các đối tượng review chỉ để tính toán thì thực sự đó là một sự lãng phí, trừ khi cơ sở dữ liệu tuyệt vời để thực hiện công việc đó cho bạn.

Thay vào đó, hãy sử dụng phương thức **select** để thực hiện kết hợp các yêu cầu đó cho bạn khi bạn truy vấn:
### app/controllers/restaurants_controller.rb
```
@restaurants = Restaurant.all
  .select("restaurants.*, AVG(reviews.rating) AS review_average")
  .joins(:reviews)
  .group("restaurants.id")
```
Sử dụng tích hợp hợp SQL, bạn có thể dễ dàng tính toán thông tin đó trước khi nó được đưa vào ứng dụng của bạn. Khi bạn sử dụng **AS** trong **select**, Rails sẽ tạo các thuộc tính phù hợp một cách kỳ diệu:
```
@restaurants.first.review_average # => 2.3
```
Chúng chỉ hiển thị dưới dạng các thuộc tính một lần trên model của bạn.

Đi xa hơn nữa, bạn có thể thả hoàn toàn SQL vào truy vấn để tiết kiệm cho mình nhiều lần gọi hơn nữa. Ví dụ: nếu bạn chỉ muốn tìm 10 nhà hàng đầu tiên có ít nhất 10 đánh giá trong 3 tháng qua, cùng với tổng số tất cả những đánh giá đó?

Bạn có thể làm như thế này, trong Rails:
```
@restaurants = Restaurant.all
  .select("restaurants.*, COUNT(reviews.id) AS review_count")
  .joins(:reviews)
  .group("restaurants.id")
  .where("reviews.created_at > ?", 3.months.ago)
  .having("COUNT(reviews.id) > 10")
  .limit(10)
```
Tuy nhiên, khi truy vấn trở nên phức tạp hơn, có thể sử dụng hàm find_by_sql, vì vậy tôi không phải nhớ các quirks của các phương thức truy vấn:
```
@restaurants = Restaurant.find_by_sql(["
  SELECT  restaurants.*, COUNT(reviews.id) AS review_count
    FROM `restaurants`
      INNER JOIN `reviews` ON `reviews`.`restaurant_id` = `restaurants`.`id`
    WHERE (reviews.created_at > ?)
    GROUP BY restaurants.id
    HAVING COUNT(reviews.id) > 10
    LIMIT 10", 3.months.ago])
```
Và cũng giống như trước đây, Rails sẽ tạo các thuộc tính cho tất cả các cột mà bạn **SELECT**

Sử dụng SQL như vậy là kỹ năng của riêng mỗi người. Đó là điều bạn sẽ phải nghiên cứu trước khi ta muốn đạt được điều gì đó tuyệt vời. Nhưng SQL là hữu ích cho rất nhiều tình huống xử lý dữ liệu phức tạp. Vậy nên chúng ta cần dành thời gian để tìm hiểu nó.

Trên đây là một số cách mà mình mới tham khảo được về cách để tăng tốc độ truy vấn ActiveRecord. Mình biết vẫn còn có nhiều cách khác nữa, rất mong nhận được sự góp ý của các bạn!

# Tham khảo
https://blog.codeship.com/speed-up-activerecord/