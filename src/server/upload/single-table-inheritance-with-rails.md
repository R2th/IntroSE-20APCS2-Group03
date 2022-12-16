1 What is Single Table Inheritance (STI)?

STI về cơ bản là ý tưởng sử dụng một bảng duy nhất để phản ánh nhiều mô hình kế thừa từ một base model, mà chính nó kế thừa từ ActiveRecord :: Base. Trong lược đồ cơ sở dữ liệu, các mô hình con được chỉ ra bởi một cột "loại" duy nhất. Trong Rails, thêm một cột "type" trong việc di chuyển cơ sở dữ liệu là đủ (sau khi viết các mô hình) để cho Rails biết rằng bạn đang lên kế hoạch thực hiện STI. 

2 Cài đặt:

Tạo 1 project mới:

`rails new sti --no-test-framework` 

Tạo model Tribe:

`rails g model tribe name:string`

Tạo model Animal:

`rails g model animal name:string age:integer race:string`

Cột race sẽ được sử dụng bởi Active Record để lưu tên mẫu. Mặc định, AR sẽ tìm kiếm một cột type nhưng bạn có thể sử dụng bất cứ điều gì miễn là bạn nói với AR về nó.

Sau đó, thêm trile_id vào bảng Animal

```
class AddTribeIdToAnimal < ActiveRecord::Migration
  def change
    add_column :animals, :tribe_id, :integer
  end
end
```

Và chạy lên migration
`rake db:migrate`

#app/models/tribe.rb
```
class Tribe < ActiveRecord::Base 
    has_many :animals 
end
```

#app/models/animal.rb
```
class Animal < ActiveRecord::Base 
    belongs_to :tribe 
    self.inheritance_column = :race 

    # We will need a way to know which animals
    # will subclass the Animal model
    def self.races
      %w(Lion WildBoar Meerkat)
    end

end
```
#app/models/lion.rb
```
class Lion < Animal
end 
```

#app/models/meerkat.rb
```
class Meerkat < Animal;
end 
```

#app/models/wildBoar.rb
```
class WildBoar < Animal
end
```

self.inheritance_column = :race được sử dụng để chị đình trường STI và không cần thiết nếu như chúng ta sử dụng trường mặc định là type.

#app/models/animal.rb
```
scope :lions, -> {where(race: “Lion”)}

scope :meerkats, -> {where(race: “Meerkat”)}

scope :wild_boars, -> {where(race: “WildBoar”)}
```

Thêm delegate vào model Tribe
```
delegate :lions, :meerkats, :wild_boars, to: :animals
```

Tạo dữ liệu để kiểm tra:

```
tribe = Tribe.create(name: 'LionTribe')

tribe.animals << Lion.new(name: "Simba", age: 10) 
tribe.animals << WildBoar.new(name: "Pumba", age: 30) 
tribe.animals << Meerkat.new(name: "Timon", age: 30)
```