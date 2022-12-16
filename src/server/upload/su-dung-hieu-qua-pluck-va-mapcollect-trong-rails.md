Hãy cùng đến ngay với ví dụ sau đây để tìm hiểu sự khác nhau giữa *pluck*, *select* và *collect/map* trong việc lấy ra những *value* của các *attribute/column* cụ thể nhé.

Đặt trường hợp, bạn muốn select *id* các *user* mà có age > 20 chẳng hạn 

Thì SQL của nó sẽ trông như sau
```sql
select id from users where age > 20;
```

Trong Rails ta có thể dụng 1 trong các *option* sau để thu được cùng một kết quả là 1 mảng các *id*


### Option 1 - Collect
```sql
User.where('age > 20').select(:id).collect(&:id)
```
### Option 2 - Map
```sql
User.where('age > 20').select(:id).map(&:id)
```
### Option 3 - Pluck
```sql
User.where('age > 20').pluck(:id)
```

Hãy cùng mình giải mã cách thức hoạt động của từng *method* trên nhé :robot:

### Collect/Map
Collect và Map: 2 cái tên 1 chức năng.
> Sơ lược về khái niệm: được hiểu là những *looping method/method vòng lặp* được sử dụng với *Array* hoặc *Hash*

Phân tích từng bước:
* Select sẽ trả về mảng các ActiveRecord sẽ được trả về sau khi query database
* Sau đó, Collect/Map sẽ *loop* qua từng *element* trong mảng ActiveRecord để lấy ra *id*

### Pluck
Phân tích
* Pluck trả về luôn một mảng các value của *attribute*  ta truyền vào (:id)
* Nó chỉ select (những) *attribute* này khi query
* Do đó, Rails nhận một mảng của *attribute value* thay vì một mảng các *ActiveRecord* 
* Vì vậy, ta ta bớt đi được step loop qua từng phần tử trong mảng *ActiveRecord*

Hãy xem performance của từng cách tiếp cận nhé

### Collect
```ruby
puts Benchmark.measure {
  User.where('age > 20').select(:id).collect(&:id)
}

User Load (0.7ms)  SELECT id FROM `users` WHERE (age < 20)
0.010000   0.000000   0.010000 (  0.011173)
nil
```
Thời gian cần : 0.011173 s

### Pluck
```ruby
puts Benchmark.measure {
  User.where('age > 20').pluck(:id)
}

SQL (0.7ms)  SELECT `users`.`id` FROM `users` WHERE (age < 20)
0.010000   0.000000   0.010000 (  0.003422)
nil
```
Thời gian cần : 0.003422 s

*Benchmark* cho thấy **pluck** cần ít thời gian để xử lý hơn so với **map**

#### Pluck "đa" attribute/column
Ta có thể truyền nhiều *attribute* 1 lúc vào **pluck**, kết quả thu được là một mảng 2 chiều value của các attribute này.
```ruby
User.where('age > 20').pluck(:id, :name)
```

### Nhận xét
Bản chất ở đây, pluck query những cái chúng ta cần ngay tại tầng database
nếu dùng trực tiếp `map` với Model, Rails sẽ gom tất cả attribute của table vào memory.
Nếu bạn không muốn ngốn bộ nhớ trong khi chỉ cần 1 vài attribute nhất định thì hãy dùng `pluck`

### Có thể iem chưa biết về pluck
Ở phần này, mình sẽ giới thiệu thêm một cách sử dụng đặc biệt với `pluck` :sunglasses: 

Thực chất, ta có thể truyền trực tiếp một string SQL vào `pluck`. Cách này thì không được mô tả trong document chính thức của Rails.

Cùng xem một bài toán: ta phải tạo *full_name* từ *first_name* và *last_name* của user

Một cách làm thông thường
```ruby
User.active.pluck(:first_name, :last_name).map { |names| names.join(" ") }

SELECT `users`.`first_name`, `users`.`last_name` FROM `users`
```

Một cách ngắn gọn hơn ta có thể
```ruby
User.pluck(<<-PLUCK)
     CONCAT_WS(" ", users.first_name, users.last_name)
PLUCK

SELECT CONCAT_WS(" ", users.first_name, users.last_name) FROM `users`
```

> Nguồn tham khảo:
> 
> https://collectiveidea.com/blog/archives/2015/05/29/how-to-pluck-like-a-rails-pro
> 
> https://rubyinrails.com/2014/06/05/rails-pluck-vs-select-map-collect/