Bài viết được tham khảo từ link https://github.com/ankane/searchkick#reindex

`Searchkick` là một gem khá quyen thuộc trong việc sử dụng `Elastisearch` trong `rails`, việc hiểu rõ hơn về gem này giúp bạn chủ động hơn trong công việc

Đôi khi trong lúc sử dụng ES (Elasticsearch), chúng ta cần skip đánh `index` hoặc đưa việc đánh `index` vào `job` chạy nền, `callbacks` giúp bạn làm điều đó

### To Reindex, or Not to Reindex
#### Reindex
* Khi bạn cài đặt hoặc nâng cấp `searchkick`
* Thay đổi phương pháp `search_data`
* Thay đổi phương pháp tìm kiếm

#### No need to reindex
* App khởi động

### Stay Synced
Có bốn cách để giữ cho chỉ mục được đồng bộ với cơ sở dữ liệu của bạn.

1. Ngay lập tức (mặc định)

Bất cứ khi nào một bản ghi được chèn vào, cập nhật hoặc xóa

2. Không đồng bộ

 Sử dụng công việc nền cho hiệu suất tốt hơn

```
class Product < ApplicationRecord
  searchkick callbacks: :async
end
```

`Jobs` được thêm vào một hàng đợi có tên là `searchkick`.

3. Hàng đợi

Đẩy id của các bản ghi cần cập nhật lên hàng đợi và sắp xếp lại lại dưới lên. Đây là cách hiệu suất hơn so với phương pháp không đồng bộ, cập nhật bản ghi riêng. Xem cách thiết lập.

4. Manual

Tắt đồng bộ hóa tự động

```
class Product < ApplicationRecord
  searchkick callbacks: false
end
```

Bạn có thể dùng cách này ví dụ khi import nhiều record vào cùng 1 lúc, sau đó đánh index lại các record mới được tạo ra cùng một lúc, Ví dụ

```
def import
    rows = CSV.read ...
    product_ids = []
    
    Searchkick.callbacks(false) do
      rows.each do |row|
        import product ...
        product_ids << product.id
      end
    end
    
    Product.where(id: product_ids).reindex
end
```

Chú ý hàm `reindex` đối với 1 `active record relation` không cần `accept_danger: true` đối với `Searchkick` ver 2.5.0 trở lên
Ngoài ra nếu trong `model product` bạn có gọi `reindex` thì chỉ cần check `Searchkick.callbacks?` là được
Ví dụ: 

```
class Product < ActiveRecord::Base
  after_commit: ->{some_associations.reindex if Searchkick.callbacks?}
end
```

### Queuing
Đẩy id của hồ sơ cần được sắp xếp lại cho hàng đợi và sắp xếp lại số lượng lớn để có hiệu suất tốt hơn. Trước tiên, thiết lập `Redis`. Chúng tôi khuyên bạn nên sử dụng `connection_pool`.

```
Searchkick.redis = ConnectionPool.new { Redis.new }
```

Và trong `model`

```
class Product < ApplicationRecord
  searchkick callbacks: :queue
end
```

Sau đó, thiết lập một `job` nền để chạy.

```
Searchkick::ProcessQueueJob.perform_later(class_name: "Product")
```

Bạn có thể kiểm tra chiều dài hàng đợi bằng:

```
Product.search_index.reindex_queue.length
```

### Reindex conditionally

```
class Product < ApplicationRecord
  searchkick callbacks: false

  # add the callbacks manually
  after_commit :reindex, if: -> (model) { model.previous_changes.key?("name") } # use your own condition
end
```

### Testing
Để thực hiện, chỉ bật tính năng gọi lại `Searchkick` cho các thử nghiệm cần đến.

#### Minitest
Thêm vào test/test_helper.rb:

```
# reindex models
Product.reindex

# and disable callbacks
Searchkick.disable_callbacks
```

Và sử dụng

```
class ProductTest < Minitest::Test
  def setup
    Searchkick.enable_callbacks
  end

  def teardown
    Searchkick.disable_callbacks
  end

  def test_search
    Product.create!(name: "Apple")
    Product.search_index.refresh
    assert_equal ["Apple"], Product.search("apple").map(&:name)
  end
end
```

#### RSpec

Thêm vào  spec/spec_helper.rb:

```
RSpec.configure do |config|
  config.before(:suite) do
    # reindex models
    Product.reindex

    # and disable callbacks
    Searchkick.disable_callbacks
  end

  config.around(:each, search: true) do |example|
    Searchkick.callbacks(true) do
      example.run
    end
  end
end
```

Và sử dụng

```
describe Product, search: true do
  it "searches" do
    Product.create!(name: "Apple")
    Product.search_index.refresh
    assert_equal ["Apple"], Product.search("apple").map(&:name)
  end
end
```

#### Factory Girl

Sử dụng một đặc tính và tạo một `mock` sau cho mỗi mô hình được lập chỉ mục:

```
FactoryGirl.define do
  factory :product do
    # ...

    # Note: This should be the last trait in the list so `reindex` is called
    # after all the other callbacks complete.
    trait :reindex do
      after(:create) do |product, _evaluator|
        product.reindex(refresh: true)
      end
    end
  end
end

# use it
FactoryGirl.create(:product, :some_trait, :reindex, some_attribute: "foo")
```

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn