### **I. Giới thiệu**

-  Rails không có khả năng mở rộng tốt - việc này làm giảm giá trị của ngôn ngữ và framework. Tuy nhiên, nhiều doanh nghiệp từ các công ty khởi nghiệp nhỏ đến các nền tảng với hàng triệu người dùng đang sử dụng Rails làm cốt lõi. Một câu hỏi đặt ra là liệu Rails đơn giản không thể mở rộng quy mô hay vấn đề được ẩn giấu ở đâu đó sâu hơn.
-  Rails rất dễ học, nhưng để có thể thành thạo, chúng ta cần đầu tư nhiều thời gian cũng như bất kỳ framework hay ngôn ngữ nào khác. Chúng ta không thể hy vọng rằng các vấn đề sẽ biến mất một cách kỳ diệu chỉ vì chúng ta chuyển sang ngôn ngữ nhanh hơn. Một thuật toán chậm trong C ++ cũng sẽ chậm trong Ruby. Kiến trúc tồi làm giảm hiệu năng trong Haskell cũng sẽ làm giảm hiệu năng trong Ruby.
-  Theo kinh nghiệm của tôi, khi các nhà phát triển bắt đầu phàn nàn rằng Rails không thể mở rộng quy mô lúc đó họ đang gặp phải câu hỏi hóc búa thông thường: ứng dụng hoạt động tốt với một số lượng nhỏ records / requests, nhưng khi data lớn hơn thì ứng dụng không thể đáp ứng được.
-  Một trong những nghi ngờ thông thường về hiệu suất ngày càng chậm là các `N + 1 queries`.

### **II. Tìm hiểu về N+1 Database Queries**

- Hãy quan sát một ví dụ, với hai models có quan hệ:

```ruby
class Branch < ActiveRecord::Base
  has_many :builds
end

class Build < ActiveRecord::Base
  belongs_to :branch
end
```

- Nếu muốn liệt kê 10 `builds` mới nhất, chúng ta có thể sử dụng đoạn code sau đây:

```ruby
builds = Build.order(:finished_at).limit(10)

builds.each do |build|
  puts "#{build.branch.name} build number #{build.number}"
end
```

- Đoạn code hoạt động nhưng nó tạo ra quá nhiều câu truy vấn vào database:

```ruby
Build Load (1.7ms) SELECT "builds".* FROM "builds" ORDER BY "builds"."finished_at" ASC LIMIT 10

Branch Load (0.4ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 11]]
Branch Load (0.8ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 13]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 15]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 17]]
Branch Load (0.2ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 19]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 111]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 113]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 115]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 117]]
Branch Load (0.3ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" = $1 LIMIT 1 [["id", 119]]
```

- Đó là 11 câu truy vấn độc lập. Một truy vấn để load các `builds` và N truy vấn để load các `branches` của từng `build` , do đó chúng ta gọi là `N + 1 queries`. Cách tiếp cận này là rất không hiệu quả. Nếu chúng ta có 1000 `builds`, chúng ta sẽ cần kết nối với cơ sở dữ liệu 1001 lần. Kết nối cơ sở dữ liệu từ xa không miễn phí và mỗi kết nối sẽ dẫn đến giảm hiệu năng ứng dụng rất lớn.

### **III. Eager Loading trong Rails**

- Để cải thiện hiệu năng của ví dụ trước, chúng ta cần giảm số lượng truy vấn đến cơ sở dữ liệu. Trong Rails, điều này được thực hiện bằng cách load sẵn các relations liên quan, hay nói cách khác là thu thập dữ liệu liên quan chỉ với một truy vấn.
- Điều này rất dễ dàng trong Rails. Trong ví dụ trên, tất cả những gì chúng ta cần làm là đính kèm `.includes(:branches)` vào truy vấn cơ sở dữ liệu hiện có:

```ruby
builds = Build.order(:finished_at).includes(:branches).limit(10)

builds.each do |build|
  puts "#{build.branch.name} build number #{build.number}"
end
```

- Lần này, số lượng truy vấn tốt hơn nhiều. Chúng ta chỉ sử dụng 2 truy vấn để tải tất cả dữ liệu vào bộ nhớ - một truy vấn để tải các `builds` và một truy vấn khác để tải các `branches` liên quan:

```ruby
Build Load (0.5ms) SELECT "builds".* FROM "builds" ORDER BY "builds"."finished_at" ASC LIMIT 10
Branch Load (0.5ms) SELECT "branches".* FROM "branches" WHERE "branches"."id" IN (11, 13, 15, 17, 19, 111, 113, 115, 117, 119)
```

- Bây giờ, thậm chí với 10.000 `builds`, ứng dụng của chúng ta vẫn sẽ chỉ sử dụng 2 truy vấn cơ sở dữ liệu.
- Chúng ta có thể so sánh, thời gian cần thiết để load và hiển thị 1000 `builds` là 923,6 ms khi không dùng `Eager Loading` và chỉ 8,3 ms khi sử dụng `Eager Loading`,  nhanh hơn gần 110 lần. Đó là một sự khác biệt rất lớn.

### **VI. Kết luận**

Trên đây là giới thiệu về `N+1 queries` và cách loại bỏ `N+1 queries` cơ bản nhất trong `Rails`. Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về `N+1 queries` và cách tối ưu hiệu năng ứng dụng Rails cơ bản nhất khi gặp `N+1 queries`.
Phần sau chúng ta sẽ tìm hiểu các cách loại bỏ `N+1 queries` khác có thể sử dụng để tối ưu hiệu năng của Rails.

## **Tài liệu tham khảo**
https://semaphoreci.com/blog/2017/08/09/faster-rails-eliminating-n-plus-one-queries.html

## **Cảm ơn đã theo dõi**