# I. Overview
Không thể phủ nhận rằng software design patterns đã giúp đỡ rất nhiều developer trong công đoạn phát triển phần mềm.  Những designs đấy đã được thảo luận, chứng minh, kiểm thử, tối ưu và áp dụng bởi rất nhiều các tiền bối tay to code như máy :male_detective: :computer:  . Vì thể chúng cũng nên tìm hiểu một chút và áp dụng để giải quyết những bài toán của mình một cách tích tế nhất nhé. Bài viết sau đây mình sẽ giới thiệu cho các bạn về Observer pattern.
### 
Các patterns được thành 4 nhóm: **Behavioral patterns**, **Structural patterns**, **Creational patterns**, **Concurrency patterns**. Observer pattern thuộc nhóm **behavioral patterns**, đúng như tên gọi "Observer" một component sẽ quan sát những thay đổi của các components khác liên quan. Một số ví dụ điển hình ở đây có thể kể đến như việc quan sát nhiệt độ, giá trị cổ phiếu, hay đơn giản là đăng ký một tài khoản mới, ...Để dễ dàng hình dung ta có thể lấy ví dụ như khi thời tiết thay đổi sắp có thiên tai, động đất gì đó :fearful: chúng ta phải đưa ra một notify để các ban ngành, địa phương có những hành động kịp thời chuẩn bị đối phó (ban ngành, địa phương là các Observers). 

# II. Implementation in Ruby

Class name của các observer object thường được đặt bởi cách thêm từ khóa `Observer` làm hậu tố đại loại là như này: UserObserver, StockObserver ...Nãy giờ luyên thuyên cũng đã đủ rồi mà dev thì nói chung là cứ bắt tay vào code là rõ cả thôi, mình sẽ lấy ví dụ ở bài viết này là StockObserver. 

Đầu tiên tạo file stock.rb: 
```
#!/usr/bin/ruby
load 'stock_observer.rb'
class Stock
 attr_reader :minimum_quantity_limit, :observer
 attr_accessor :available_quantity#, :observer
 
 def initialize(available_quantity, minimum_quantity_limit)
   @available_quantity = available_quantity
   @minimum_quantity_limit = minimum_quantity_limit
   @observer = StockObserver.new
 end
 
 def update_available_quantity(available_quantity)
   @available_quantity = available_quantity
   notify_observer
 end
 
 private
 def notify_observer
  @observer.notify(self)
 end
 
 s = Stock.new 40,10
 puts s.inspect
 s.update_available_quantity(20)
 s.update_available_quantity(15)
 s.update_available_quantity(10)
 s.update_available_quantity(9)
 s.update_available_quantity(5)
end
```

Tiếp đến là file observer `stock_observer.rb` để thực thi hành động khi có thông báo thay đổi từ stock nhé
```
class StockObserver
   def notify(stock)
     if stock.available_quantity <= stock.minimum_quantity_limit
       puts "Stock reached minimal limit! Minimum Quantity Limit: #{stock.minimum_quantity_limit} Available Quantity: #{stock.available_quantity}"
       #Code to send email to purchase dept
     else
       puts "Available Quantity: #{stock.available_quantity}"
     end
   end
end
```
Sau khi thực thi chương trình ta sẽ có kết quả output như sau: 
```
Available Quantity: 20
Available Quantity: 15
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 10
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 9
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 5
```

# III. Adding Multiple Observers
Trong các dự án thực tế một thành phần không chỉ có một observer mà có rất nhiều observers khi đó rất đơn giản ta chỉ cần thay vì khởi tạo một observer đơn lẻ thì biến nó thành có một mảng các observers thoai.
```
#!/usr/bin/ruby
load 'stock_observer.rb'
class Stock
 attr_reader :minimum_quantity_limit, :observers
 attr_accessor :available_quantity
 
 def initialize(available_quantity, minimum_quantity_limit)
   @available_quantity = available_quantity
   @minimum_quantity_limit = minimum_quantity_limit
   @observers = []
 end
 
 def update_available_quantity(available_quantity)
   @available_quantity = available_quantity
   notify_observers
 end
 
 def add_observers(*observer_instances)
   observer_instances.each{|observer_instance| observers << observer_instance}
 end
 
 private
 def notify_observers
   observers.each{|observer| observer.notify(self) }
 end
 
 s=Stock.new 40,10
 s.add_observers(StockObserver.new)
 puts s.inspect
 s.update_available_quantity(20)
 s.update_available_quantity(15)
 s.update_available_quantity(10)
 s.update_available_quantity(9)
 s.update_available_quantity(5)
end
```
Xem lại output nhé: 
```
Available Quantity: 20
In Test Observer
Available Quantity: 15
In Test Observer
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 10
In Test Observer
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 9
In Test Observer
Stock reached minimal limit!  Minimum Quantity Limit: 10   Available Quantity: 5
In Test Observer
```

# III. Creating Observers in Rails với ActiveRecord hay Mongoid
Với Rails framework chúng ta có thể tạo các observer rất đơn giản bằng cách kế thừa `ActiveRecord::Observer` như sau:
```
class StockObserver < ActiveRecord::Observer
  def after_update(stock)
    if stock.quantity <= stock.minial_limit
      #send email code here
    end    
  end
end
```
Với Mongoid ta chỉ cần thay thế keyword `ActiveRecord::Observer` bằng `Mongoid::Observer`

# IV. Activation of Observers
Chúng ta cần register observers trong `config/application.rb` file. Chỉ những observers đã được registered mới hoạt động.
```
config.active_record.observers = :stock_observer, :registration_observer
```
Còn với Mongoid 
```
config.mongoid.observers = :stock_observer, :registration_observer
```

# V. References
[Implementing Observer Pattern in Ruby](https://vteams.com/blog/implementing-observer-pattern-in-ruby/)