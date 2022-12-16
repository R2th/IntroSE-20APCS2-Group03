Hôm nay mình sẽ tiếp tục bài viết [Rails AntiPattern: Duplicate Code Duplication (p1)](https://viblo.asia/p/rails-antipattern-duplicate-code-duplication-p1-1VgZvwGYlAw) cùng với giải pháp tránh lặp code tiếp theo, đó là sử dụng metaprogramming.

Metaprogramming là một công cụ tuyệt vời để tạo ra các đoạn code DRY bằng các ngôn ngữ rất năng động. Metaprogramming hiểu đơn giản là "Code sinh ra code" nghĩa là mình viết một chương trình và chương trình này sẽ sinh ra, điều khiển các chương trình khác hoặc làm 1 phần công việc ở thời điểm biên dịch. Chính vì vậy, metaprogramming giúp source của chúng ta trở nên ngắn gọn hơn, giảm thiểu vấn đề duplicate, như các method có chức năng tương tự nhau trong source code (nhất là trong test), dễ dàng thay đổi cũng như chỉnh sửa, giúp hệ thống trở nên gọn nhẹ và mượt mà hơn.

Để minh họa việc sử dụng Metaprogramming để giữ ứng dụng DRY. Cùng xem ví dụ: Purchase model từ một ứng dụng của một cửa hàng. Ví dụ đầu tiên là test cho model:
```
class PurchaseTest < Test::Unit::TestCase
    context "Given some Purchases of each status" do
        setup do
            %w(in_progress submitted approved shipped received canceled).each do |s|
               Factory(:purchase, :status => s)
            end
        end

        context "Purchase.all_in_progress" do
            setup { @purchases = Purchase.all_in_progress }
            should "not be empty" do assert !@purchases.empty?
        end

        should "return only in progress purchases" do
            @purchases.each do |purchase|
                assert purchase.in_progress?
            end 
        end

        should "return all in progress purchases" do 
            expected = Purchase.all.select(&:in_progress?)
            assert_same_elements expected, @purchases
        end
    end 
end
```
Một Purchase object có thể có nhiều trạng thái: in_progress, submitted, approved, shipped, received, and canceled. Nó cũng định nghĩa các class method để tìm các đối tượng Purchase của 1 trạng thái cụ thể. 

Việc thực hiện chính xác của Purchase model sẽ là khai báo từng cặp phương thức cho mọi trạng thái (ví dụ, các phương thức all_submitted và submitted?) bằng tay:
```
class Purchase < ActiveRecord::Base
  validates_presence_of: status
  validates_inclusion_of: status, : in => %w(in_progress submitted approved shipped received canceled)

  # Status Finders
  def self.all_in_progress
  	where(: status => "in_progress")
  end

  def self.all_submitted
  	where(: status => "submitted")
  end

  def self.all_approved
  	where(: status => "approved")
  end

  def self.all_shipped
  	where(: status => "shipped")
  end
  
  def self.all_received
  	where(: status => "received")
  end
  
  def self.all_canceled
  	where(: status => "canceled")
  end
  
  # Status Accessors
  def in_progress?
  	status == "in_progress"
  end
  
  def submitted?
  	status == "submitted"
  end
  
  def approved?
  	status == "approved"
  end
  
  def shipped?
  	status == "shipped"
  end
  
  def received?
  	status == "received"
  end
  
  def canceled?
 	status == "canceled"
  end
end
```
Rõ ràng đoạn code này có vấn đề bảo trì trong quá trình phát triển. Vấn đề thực sự ở đây là đoạn code chưa DRY.
Giả sử Purchase model của chúng ta có thêm status thì chúng ta sẽ phải sửa ở 3 chỗ validate, accessor, finder. Bạn nên để status ở 1 nơi duy nhất và bạn có thể thực hiện nó với metaprogramming:
```
class Purchase < ActiveRecord::Base

  STATUSES = %w(in_progress submitted approved shipped received)
  

  validates_presence_of: status

  validates_inclusion_of: status, : in => STATUSES
  

  # Status Finders

  class << self
    STATUSES.each do |status_name | 
      define_method "all_#{status_name}"
        where(: status => status_name) 
      end
    end
  end

  # Status Accessors
  
  STATUSES.each do |status_name | 
  	define_method "#{status_name}?"
      status == status_name 
    end
  end 
end
```
Vấn đề mà hầu hết các lập trình viên Ruby mới bắt đầu găp phải với metaprogramming  là sự phức tạp được giới thiệu; đây là một điều hoàn toàn đúng. Trước khi bắt đầu, hãy xem qua việc triển khai này và thảo luận một chút về những gì đang diễn ra.

Khía cạnh quan trọng nhất của đoạn code này là danh sách các trạng thái được giữ rõ ràng trong mảng Purchase :: STATUSES. Đây là vị trí độc nhất, có thẩm quyền của danh sách, và việc thay đổi danh sách sẽ ngay lập tức thay đổi code khi cần thiết.

DRY không chỉ là về các dòng code. Mình tin rằng code ít hơn sẽ là code tốt hơn và mình sẽ tổ chức lại đoạn code trên bằng cách sử dụng scope:
```
class Purchase < ActiveRecord::Base
  validates :status,
    :presence => true,
    :inclusion => { :in => %w(in_progress submitted approved
    shipped received canceled) }
  
  # Status Finders
  scope :all_in_progress, where(:status => "in_progress")
  scope :all_submitted, where(:status => "submitted")
  scope :all_approved, where(:status => "approved")
  scope :all_shipped, where(:status => "shipped")
  scope :all_received, where(:status => "received")
  scope :all_canceled, where(:status => "canceled")
  
  # Status Accessors
  def in_progress?
  	status == "in_progress"
  end
  
  def submitted?
  	status == "submitted"
  end
  
  def approved?
  	status == "approved"
  end
  
  def shipped?
  	status == "shipped"
  end
  
  def received?
  	status == "received"
  end
  
  def canceled?
  	status == "canceled"
  end
end
```
Ví dụ về metaprogramming trước có thể nhiều bạn sẽ gặp phải khó khăn khi đọc code và điều này có thể giải quyết bằng cách đặt code vào 1 macro:
```
# lib/extensions/statuses.rb
class ActiveRecord::Base
  def self.has_statuses(*status_names)
    validates :status,
      :presence => true,
      :inclusion => { :in => status_names }
      
    # Status Finders
    status_names.each do |status_name|
      scope "all_#{status_name}", where(:status => status_name)
    end

    # Status Accessors
    status_names.each do |status_name|
      define_method "#{status_name}?" do
          status == status_name
      end
    end
  end
end

class Purchase < ActiveRecord::Base
	has_statuses :in_progress, :submitted, :approved, :shipped,
		:received
end
```
**Tài liệu tham khảo: cuốn Rails AntiPatterns: Best Practice Ruby on Rails Refactoring by Chad Pytel**