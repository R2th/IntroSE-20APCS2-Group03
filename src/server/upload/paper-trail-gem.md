Papel Trail là gem dùng để theo dõi các thay đổi đối với model của bạn, kiểm tra hoặc versioning.

1. Cài đặt Papel Trail:

Thêm gem Papel Trail vào Gemfile:

```
gem "paper_trail"
```

Chạy lệnh: `bundle install`

Thêm table versions

```
bundle exec rails generate paper_trail:install
```

Sau khi chạy lệnh trên, sẽ sinh ra 1 file migration như sau:
```
class CreateVersions < ActiveRecord::Migration[5.0]

  
  TEXT_BYTES = 1_073_741_823

  def change
    create_table :versions, { options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci" } do |t|
      t.string   :item_type, {:null=>false, :limit=>191}
      t.integer  :item_id,   null: false
      t.string   :event,     null: false
      t.string   :whodunnit
      t.text     :object, limit: TEXT_BYTES

      t.datetime :created_at
    end
    add_index :versions, %i(item_type item_id)
  end
end
```

Sau đó tiếp tục chạy lệnh:
```
bundle exec rake db:migrate
```

Như vậy, quá trình cài đặt gem `paper_trail` đã xong.

2. Sử dụng:

Thêm `has_paper_trail` vào các model để tracking sự thay đổi.

```
class Car < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_paper_trail

  belongs_to :category
end
```

Thêm `before_action :set_paper_trail_whodunnit` vào `ApplicationController` để tracking ai đã change version model.
Xem lịch sử thay đổi:

```
car = Car.last

car.name # xxx

 car.versions #<ActiveRecord::Associations::CollectionProxy []>
 
 car.update_attributes name: "New name"
```
 
 Kiểm tra lại lịch sử thay đổi:
 
  `car.versions`
  
  #<ActiveRecord::Associations::CollectionProxy [#<PaperTrail::Version id: 4, item_type: "Car", item_id: 22, event: "update", whodunnit: nil, object: "---\nid: 22\nname: xxx\ncost: 1\nversion: \nwidth: \nhei...", created_at: "2018-06-06 06:23:27">]>
  
  Lấy ra dữ liệu trước khi thay đổi:
  car.versions.last.reify
  ![](https://images.viblo.asia/32db8b38-9438-4b0a-a9ad-ef65dff6807e.png)
  
  Xem sự kiện thay đổi record:
  
  `car.versions.last.event #"update"`
  
  Revert model:
  
  Như ở ví dụ trên, chúng ta đã thay đổi tên của cả từ "xxx" thành "New name", vậy làm sao để revert nó lại như ban đầu?
  Lấy lại thay đổi ở version trước:
  
`  car.paper_trail.previous_version`
  
![](https://images.viblo.asia/8a1a2593-14e1-4ee4-b62f-8cacf05ba765.png)

Và thực hiện:

`previous.save `để revert.