Là một developer quan tâm đến hiệu suất của hệ thống thì một trong những điều bạn cần lưu ý đó là loại bỏ N+1 query bằng cách sử dụng các method #includes, #preload hoặc #eager_load. Nhưng có bao giờ bạn nghĩ là làm thế nào để bạn biết bạn đã thực hiện thành công điều đó hay chưa? Có cách nào để test chúng hay không? Sau đây là một số phương pháp:

Ví dụ bạn có 2 model Oder và OderLine như sau:

```
class Order < ActiveRecord::Base
  has_many :order_lines

  def self.last_ten
    limit(10).preload(:order_lines)
  end
end
class OrderLine < ActiveRecord::Base
  belongs_to :order
end
```

Bây giờ ta muốn kiểm tra xem method Oder.last_ten đã thực hiện eager loading thành công hay chưa?
Lưu ý: Các ví dụ sau đều được thực hiện với Rspec.

### Sử dụng association(:name).loaded?

```
require "rails_helper"

RSpec.describe Order, type: :model do
  specify "#last_ten eager loading" do
    o = Order.new()
    o.order_lines.build
    o.order_lines.build
    o.save!

    orders = Order.last_ten
    expect(orders[0].association(:order_lines).loaded?).to eq(true)
    # hoặc
    expect(orders[0].association(:order_lines)).to be_loaded
  end
end
```

Bởi vì chúng ta sử dụng preload(:order_lines) nên chúng ta quan tâm xem order_lines có được load thật không. Để kiểm tra chúng ta cần 1 object Order (ở đây là orders[0]) để xác minh điều đó

### Đếm số lượng query với ActiveSupport::Notifications


Đôi khi bạn muốn làm việc với một biểu đồ các object ActiveRecord nhưng kết quả bạn nhận về không phải là nó mà là một giá trị được tính toán dựa trên chúng. Vậy làm thế nào để kiểm tra xem nó có xuất hiên N+1 query ở đây? Không thể kiếm tra trên kết quả trả về, giá trị trả về không được load thêm gì. Vậy chúng ta cần làm gì?

Vẫn với ví dụ trên ta thay đổi một chút như sau:

```
class Order < ActiveRecord::Base
  has_many :order_lines

  def self.average_line_gross_price_today
    lines = where("created_at > ?", Time.current.beginning_of_day)
	.preload(:order_lines).flat_map do |order|
        order.order_lines.map(&:gross_price)
    end
    lines.sum / lines.size
  end
end

class OrderLine < ActiveRecord::Base
  belongs_to :order

  def gross_price
    # ...
  end
end
```

Điều mà chúng ta muốn biết ở đây là Order.average_line_gross_price_today có bị N+1 query hay không? Đoạn code order.order_lines.map(&:gross_price) có phát sinh truy vấn vào DB hay ko? Có một cách đó là sử dụng ActiveSupport::Notifications và nhận thông báo về mọi câu SQL được thực thi.

```
require "rails_helper"

RSpec.describe Order, type: :model do
  specify "#average_line_gross_price_today eager loading" do
    o = Order.new()
    o.order_lines.build
    o.order_lines.build
    o.save!

    count = count_queries{ Order.average_line_gross_price_today }
    expect(count).to eq(2)
  end

  private

  def count_queries &block
    count = 0

    counter_f = ->(name, started, finished, unique_id, payload) {
      unless %w[ CACHE SCHEMA ].include?(payload[:name])
        count += 1
      end
    }

    ActiveSupport::Notifications.subscribed(
      counter_f,
      "sql.active_record",
      &block
    )

    count
  end
end
```

Một điều mà bạn cần lưu ý khi làm theo cách này là bạn phải tạo đủ số lượng bản ghi để có thể phát hiện được các vấn đề của eager loading. Một order với một order_line không đủ để đảm bảo có hay không có eager loading. Trong trường hợp này bạn cần ít nhất 2 order_line để có thể thấy sự khác biệt của query trước và sau khi sử dụng eager loading.

Bạn cũng có thể sử dụng gem "db-query-matchers" https://github.com/brigade/db-query-matchers để kiếm tra điều đó. Gem "db-query-matchers" cung cấp một số Rspec matcher cho phép bạn kiểm tra sự tương tác với DB. Ví dụ:

```
  context 'when we expect no queries' do
    it 'does not make database queries' do
      expect { subject.make_no_queries }.to_not make_database_queries
    end
  end

  context 'when we expect queries' do
    it 'makes database queries' do
      expect { subject.make_some_queries }.to make_database_queries
    end
  end

  context 'when we expect exactly 1 query' do
    it 'makes database queries' do
      expect { subject.make_one_query }.to make_database_queries(count: 1)
    end
  end

  context 'when we expect max 3 queries' do
    it 'makes database queries' do
      expect { subject.make_several_queries }.to make_database_queries(count: 0..3)
    end
  end

  context 'when we expect a possible range of queries' do
    it 'makes database queries' do
      expect { subject.make_several_queries }.to make_database_queries(count: 3..5)
    end
  end

```

### Tài liệu tham khảo
1. https://blog.arkency.com/two-ways-for-testing-preloading-eager-loading-of-activerecord-association-in-rails/
2. https://github.com/brigade/db-query-matchers