## Giới thiệu
Bài viết này chúng ta sẽ cùng tìm hiểu nguyên tắc cơ bản của graphql và cách thức để xây dựng một graphql trong ứng dụng rails.
Ở trang [GraphQL official document](https://graphql.org/)  đã mô tả GraphQL như một ngôn ngữ query cho API và thời gian chạy để thực hiện các query với dữ liệu hiện có của bạn. Nó không giống với REST, GraphQL cho phép bạn truy vấn những dữ liệu bạn cần. GraphQL nó không thay thế cho REST nhưng nó có một số ưu điểm vượt trội hơn như: 
* Có thể request toàn bộ dữ liệu chúng ta cần trong một lần query.
*  Nó chỉ trả về dữ liệu chúng ta cần.
*  Nó không cần phải tách biệt các verson api như REST bởi vì nó cung cấp các tools hỗ trợ sự phát triển liên tục cấu trúc GraphQL.
*  Chúng ta chỉ yêu cầu một endpoint cho tất cả request của chúng ta.
Để làm rõ những tính năng trên của GraphQL chúng ta sẽ đi vào `build a to do app`
## Chuẩn bị
* Trong bài viết này mình sử dụng ruby 2.5.1 và rails 5.2.1
* Sử dụng RVM để quản lí các version của ruby
## Thực hiện
### Build Rails app và các gem hỗ trợ
* **Init project**:
```
rails new todos_graphql_api --api -T -d mysql
```
--api để nói với Rails là chỉ là API application. -T không khởi tạo minitest của Rails, ở bài viết này chúng ta sẽ sử dụng Rspec thay cho minitest.

Run: 
> rails db:create

*  **Một số gem cần dùng cho app**
    *  [GraphQL Rails](https://rubygems.org/gems/graphql): tích hợp graphql vào app
    *  [RSpec Rails](https://rubygems.org/gems/rspec-rails): Sử dụng để viết unit test
    *  [Factory Bot Rails](https://rubygems.org/gems/factory_bot_rails): Khởi tạo dữ liệu cho test
    *  [Database Cleaner](https://rubygems.org/gems/database_cleaner)
    *  [Shoulda Matchers](https://rubygems.org/gems/shoulda-matchers): Làm sạch dữ liệu trước khi chạy test
    *  [Faker](https://rubygems.org/gems/faker): Fake data mẫu
    *  [Pry Rails](https://rubygems.org/gems/pry-rails): Giúp debugger dễ dàng và giao diện dễ nhìn hơn so với debugger

Bây giờ chúng ta cập nhật lại gem file:
```
#Gemfile 
gem 'graphql', '~> 1.7', '>= 1.7.14'
```


Trong development và test group:
```
#Gemfile
group :development, :test do
  gem 'pry-rails', '~> 0.3.6'
end
```

Trong test group:
```
group :test do
  gem 'database_cleaner', '~> 1.6', '>= 1.6.2'
  gem 'factory_bot_rails', '~> 4.8', '>= 4.8.2'
  gem 'faker', '~> 1.8', '>= 1.8.7'
  gem 'rspec-rails', '~> 3.7', '>= 3.7.2'
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.2'
end
```

* Configure một chú nào:

    * Chúng ta run `rails g rspec:install` để initialize rspec
    * Update fiel spec/rails_helper.rb:
        ```
        #Require database cleaner at the top of the file.
        require 'database_cleaner'

        #[...]
        #configure shoulda matchers
        Shoulda::Matchers.configure do |config|
          config.integrate do |with|
           with.test_framework :rspec
           with.library :rails
         end
        end

        #[...]
        RSpec.configuration do |config|
          #[...]
          #set up factory bot
          config.include FactoryBot::Syntax::Methods

          #set up database cleaner
          #start by truncating all the tables but then use the faster transaction strategy the rest of the time.
         config.before(:suite) do
           DatabaseCleaner.clean_with(:truncation)
           DatabaseCleaner.strategy = :transaction
         end

         #start the transaction strategy as examples are run
         config.around(:each) do |example|
           DatabaseCleaner.cleaning do
             example.run
           end
         end

         #[...]
        end
        ```
        
Mọi sự chuẩn bị cơ bản đã xong, bây giờ chúng ta bắt đầu tạo model và tìm hiểu qua graphql nào!

* **Model**

Chúng ta tạo 2 model todolist và item:
> rails g model todo_list title
> 
> rails g model item todo_list:references done:boolean name
> 

Ở đây bảng item belongs_to bảng todo_list.

Chúng ta bắt đầu viết test case cho 2 model vừa tạo:
```
# spec/models/todo_list_spec.rb

RSpec.describe TodoList, type: :model do
  it 'has a valid factory' do
    # Check that the factory we created is valid
    expect(build(:todo_list)).to be_valid
  end

  let(:attributes) do
    {
      title: 'A test title'
    }
  end

  let(:todo_list) { create(:todo_list, **attributes) }

  describe 'model validations' do
    it do
        # check that the title field received the right values
        expect(todo_list).to allow_value(attributes[:title]).for(:title)
        # ensure that the title field is never empty
        expect(todo_list).to validate_presence_of(:title)
        # ensure that the title is unique for each todo list
        expect(todo_list).to validate_uniqueness_of(:title)
    end
  end

  describe 'model associations' do
    # ensure a todo list has many items
    it { expect(todo_list).to have_many(:items) }
  end
end
```

```
bundle exec rspec
```

Tất nhiên là test fails. Để pass được thì chúng ta cần update một số thứ:

Tạo todo_list factory:
```
touch spec/factories/todo_list.rb
```
sau đó thêm đoạn lệnh sau:
```
#spec/factories/todo_list.rb
FactoryBot.define do
  factory :todo_list do
    sequence(:title) { |n| "#{Faker::Lorem.word}-#{n}"}
  end
end
```

Sau đó chúng ta thêm một vài validate vào model todo_list:

```
# app/models/todo_list.rb

# [...]
validates :title, presence: true, uniqueness: true
has_many :items, dependent: :destroy
```

Thuộc tính dependent: :destroy cho phép bạn khi xóa todo_list thì sẻ xóa luôn nhưng items thuộc về nó.

Bạn chạy lại rspec và các test case bây giờ sẽ pass

Chúng ta làm tương tự cho item.

```
# spec/models/item_spec.rb

RSpec.describe Item, type: :model do
  # check that we have a factory for items
  it 'has a valid factory' do
    expect(build(:item)).to be_valid
  end

  let(:todo_list) { create(:todo_list) }
  let(:attributes) do
    {
      name: 'A test item',
      done: false,
      todo_list: todo_list
    }
  end

  let(:item) { create(:item, **attributes) }

  describe 'model validations' do
    # check that the fields received the right values
    it { expect(item).to allow_value(attributes[:name]).for(:name) }
    it { expect(item).to allow_value(attributes[:done]).for(:done) }
    # ensure that the title field is never empty
    it { expect(item).to validate_presence_of(:name) }
    # ensure that the title is unique for each todo list
    it { expect(item).to validate_uniqueness_of(:name)}
  end

  describe 'model associations' do
    it { expect(item).to belong_to(:todo_list) }
  end
end
```

Tạo file item.rb trong thư mục spec/factories/:
```
touch spec/factories/item.rb
```

```
# spec/factories/item.rb

FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "Item name #{n}"}
    done false

    todo_list
  end
end
```

Cập nhật lại model item.rb:
```
# app/models/item.rb

# [...]
validates :name, presence: true, uniqueness: true
belongs_to :todo_list
```

Chạy lại rspec lần nữa bạn sẽ thấy một màu xanh xanh
```
rspec spec/models
```

Để thuận tiện trong việc truy vấn chúng ta cần một vài data mẫu, để làm điều này thì các bạn mở file `db/seeds.rb` và thêm đoạn code sau vào: 
```
# db/seeds.rb
require 'faker'

# create 20 Todo Lists
20.times do
  TodoList.create(
    title: Faker::Lorem.word
  )
end

lists = TodoList.all

# for each Todo List, add 5 Items
lists.each do |list|
  5.times do
    list.items.create(
      name: Faker::Lorem.word,
      done: [true, false].sample
    )
  end
end
```

Sau đó chạy lệnh `rails db:seed`

Oke, cơ bản đã xong phần chuẩn bị model.
Phần một mình tạm dừng tại đây. Phần mình thú vị và hứng thú nhất là Graphql, phần này mình sẽ viết vào phần tiếp theo(mình sẽ tranh thủ viết sớm).

Cảm ơn các bạn đã đọc!
`Happy coding`

### Tài liệu tham khảo
[Trang chính chủ của graphql](https://graphql.org/learn/)