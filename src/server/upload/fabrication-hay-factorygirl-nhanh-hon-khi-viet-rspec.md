## Lời nói đầu
Uni-test là 1 phần hết sức quen thuộc trong các dự ánh Ruby on Rails.
Có khá nhiều testing framework dành cho Ruby on Rails, nhưng quen thuộc và có cú pháp đơn giản nhất phải kể đến là Rspec. Vậy Rspec là gì? ... Thì ở phạm vi bài viết này mình sẽ không đề cập đến, để tìm hiểu thêm các bạn có thể tham khảo các bài viết về Rspec khác trên Viblo.

Dạo gần đây, Mainteance 1 dự án RoR trong quá trình viết Rspec, mình thấy trong Project đang phát triển có sử dụng gem `Fabrication` để tạo ra các đối tượng kiểm thử. Với mình thì gem này khá lạ, vì trước mình đều dùng `Factory Girl` hay mới đây là `Factory Bot` để tạo các đối tượng kiểm thử. Nên cũng thử tìm hiểu xem `Fabrication` nó như thế nào, và cụ thể là so sánh với `Factory Girl`  thì cái nào sẽ tạo dữ liệu thử nghiệm nhanh hơn?

Ở bài viết này mình cũng chỉ tập trung so sánh tốc độ tạo dữ liệu thử nghiệm của 2 Gem, chứ không đi sau vào phân tích hay tìm hiểu cách sử dụng 1 gem nào đó.

## Setup
Để kiểm tra hiệu suất của 2 gem này trong việc tạo dữ liệu thử nghiệm? Chúng ta tạo ra 1 hệ thống nho nhỏ có chứa 1 vài model với các quan hệ như dưới đây:
```Ruby
rails generate model address street:string city:string state:string postal:string
```

```Ruby
class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :postal, null: false
      t.timestamps
    end
  end
end
```

```Ruby
class Address < ApplicationRecord
  has_one :company
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true
  validates :postal, presence: true
end
```

```Ruby
rails generate model company name:string address:references
```

```Ruby
class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name, null: false, index: { unique: true }
      t.references :address, null: false, index: true
      t.timestamps
    end
    add_foreign_key :companies, :addresses
  end
end
```

```Ruby
class Company < ApplicationRecord
  belongs_to :address
  has_many :employees
  validates :name, presence: true, uniqueness: true
end
```

```Ruby
rails generate model employee name:string email:string company:references
```

```Ruby
class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :email, null: false, index: { unique: true }
      t.references :company, null: false
      t.timestamps
    end
    add_foreign_key :employees, :companies
  end
end
```

```Ruby
class Employee < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  belongs_to :company
end
```

Sau khi tạo 1 hệ thống để test như trên, chúng ta sẽ tạo ra các `factories` và `fabricators` giống hệt nhau như sau:
```Ruby
Fabricator(:address) do
  street '123 Sandhill Road'
  city 'Whitehorse'
  state 'Yukon'
  country 'Canada'
  postal '00000'
end

FactoryGirl.define do
  factory :address do
    street '123 Sandhill Road'
    city 'Whitehorse'
    state 'Yukon'
    country 'Canada'
    postal '00000'
  end
end

Fabricator(:company) do
  name { sequence { |index| "Company ##{index}" } }
  address
end

FactoryGirl.define do
  factory :company do
    sequence(:name) { |index| "Company ##{index}" }
    association :address, strategy: :build
  end
end

Fabricator(:employee) do
  name { sequence { |index| "Employee ##{index}" } }
  email { sequence { |index| "#{index}@fake.host" } }
  company
end

FactoryGirl.define do
  factory :employee do
    sequence(:name) { |index| "Employee ##{index}" }
    sequence(:email) { |index| "#{index}@fake.host" }
    association :company, strategy: :build
  end
end
```

## Điểm Benchmarks
Điểm Benchmarks để so sánh sự khác biệt giữa Fabricator và Factory Girl (cụ thể là chỉ số bmbm) sẽ được tạo ra thông qua việc `create` và `build` các đối tượng thử nghiệm.
Các điểm chuẩn chạy trong 1 transaction có thể kết nối với nhau (tương tự như cách chúng được gọi trong môi trường thử nghiệm)

```Ruby
require 'benchmark'

ITERATIONS = 50_000

def autorollback
  ApplicationRecord.transaction(joinable: true) do
    yield
    raise ActiveRecord::Rollback
  end
end

Benchmark.bmbm(32) do |benchmark|
  [Fabricate, FactoryGirl].each do |service|
    %i[address company employee].each do |resource|
      benchmark.report("#{service}.build(#{resource.inspect})") do
        ITERATIONS.times { autorollback { service.build(resource) } }
      end
      benchmark.report("#{service}.create(#{resource.inspect})") do
        ITERATIONS.times { autorollback { service.create(resource) } }
      end
    end
  end
end
```

## Kết quả
Các kết quả sau đây được tính bằng giây

```
                                       user     system      total        real
Fabricate.build(:address)         25.620000   2.340000  27.960000 ( 30.918019)
Fabricate.create(:address)        62.510000   6.780000  69.290000 ( 79.881861)
Fabricate.build(:company)         31.290000   2.230000  33.520000 ( 36.253026)
Fabricate.create(:company)       134.810000  12.270000 147.080000 (173.582866)
Fabricate.build(:employee)        40.980000   2.300000  43.280000 ( 46.014712)
Fabricate.create(:employee)      220.580000  19.250000 239.830000 (286.526900)
FactoryGirl.build(:address)       24.420000   2.070000  26.490000 ( 29.069839)
FactoryGirl.create(:address)      61.420000   6.440000  67.860000 ( 77.759625)
FactoryGirl.build(:company)       34.430000   2.210000  36.640000 ( 39.499374)
FactoryGirl.create(:company)     173.610000  14.070000 187.680000 (221.798007)
FactoryGirl.build(:employee)      45.290000   2.290000  47.580000 ( 50.445987)
FactoryGirl.create(:employee)    256.920000  20.540000 277.460000 (330.741249)
```

![](https://images.viblo.asia/e3d365de-6e03-4c10-a6a2-186ac985bd42.png)

![](https://images.viblo.asia/c03cbc57-59a0-40a9-817c-1e1aa5fbf00a.png)

![](https://images.viblo.asia/7e7b5d19-63f8-4950-af1c-0197e262633d.png)

## Tổng kết
Dựa vào các kết quả thử nghiệm trên thì có thể thấy Fabricate có 1 lợi thế nhỏ so với Factory Girl trong việc `build` và `create` các resources nested.

Sự khác biệt kể trên là ít hơn mười phần trăm (có thể chấp nhận được nếu bỏ qua hiệu suất).

Như vậy, chúng ta hãy lựa chọn Gem mà chúng ta cảm thấy thuận tiện hơn trong việc viết Rspec vì cả 2 gem này đều có tốc độ tạo dữ liệu thử nghiệm là ngang bằng nhau trong các trường hợp bình thường và 1 chút xíu khác biệt trong các trường hợp phức tạp hơn

## Tài liệu tham khảo
Bản dịch từ: https://ksylvest.com/posts/2017-08-12/fabrication-vs-factorygirl