## Mở đầu
Rails là framework cho ngôn ngữ Ruby và đang được sử dụng mạnh mẽ. 

RSpec là một trong những testing framework phổ biến nhất cho Ruby.
RSpec-rails là một mở rộng của RSpec, cho phép bạn viết unit tests cho controller, views, helpers và model trong ứng dụng Rails.
Nó cũng cung cấp khả năng viết integration tests với selenium (sử dụng capybara).

Vậy tại sao nên dùng RSpec? Có một vài lí do mà mình thấy từ thực tế khi phát triển dự án đó là:
- Viết unit test giúp kiểm tra đoạn code vừa viết có chạy hay ko.
- Giúp dev liệt kê các trường hợp có thể xảy ra với đoạn code mình vừa viết. Qua đó giúp phát hiện các trường hợp lúc code bị thiếu, chưa nghĩ ra. Cũng như có thể tái hiện các trường hợp mà khi test tay chưa test được.
- Đây là một hình thức giải thích khá hiệu quả, giúp reviewers và teamates đọc hiểu code nhanh hơn.
- Viết unit test tốt thì khi maintain dự án sẽ giảm thiểu rủi ro và đỡ mất nhiều effort.

Vậy, làm sao để viết rspec ngắn gọn mà vẫn đầy đủ, dễ hiểu? 
## Cải thiện cách mô tả từng trường hợp

Vì viết rspec để kiểm tra code đã viết với từng trường hợp xem đã đúng hay chưa. Nên việc mô tả các trường hợp này là một phần tương đối quan trọng. Rspec sử dụng describe, context và it để làm việc này.

Describe và context giúp chia unit test thành các khối, có thể coi như là các test case. Chúng giúp mô tả trường hợp đang xảy ra, việc này giúp test trở nên dễ đọc và dễ bao quát hơn. Thông thường, trong describe sẽ bao gồm các context và describe nhỏ hơn. Sự khác biệt giữa describe và context thật ra là không nhiều, nó chỉ mang nghĩ convention là chủ yếu. Describe thì nên dùng khi mô tả các method hoặc function được viết test. Còn context thì mô tả các trường hợp xảy ra đối với method hoặc function đó. Với mỗi trường hợp đó sẽ có hành xử như thế nào thì sử dụng it. Một vài lưu ý về format:
```
describe 'ClassName'
describe '.class_method'
describe '#instance_method'
```

Context thì nên bắt đầu với when/which:
```
context 'when ....'
context 'with ....'
```

It nên bắt đầu bằng động từ:
```
it 'return ....'
it 'update ....'
```

Ví dụ:
```
# user.rb

def is_admin?
  is_admin == 1
end
```
thì nên viết rspec với cấu trúc kiểu:
```
describe '#is_admin?'
  context 'when is_admin attribute equal to 1' do
     it 'return true' do
     end
     
   # it 'return true if is_admin attribute equal to 1' => not good
  end
  
  context 'when is_admin attribute not equal to 1' do
     it 'return false' do
     end
  end
  
  # it 'return false if is_admin attribute not equal to 1' => not good
end
```
Một lưu ý nữa:  Để tránh sự phức tạp trong mô tả example, thay vì sử dụng if trong it, hãy để nội dung phần if đấy lên context nhé.

## Cải thiện tốc độ

Tốc độ của rspec phụ thuộc nhiều vào việc tạo các bản ghi pre-condition. Việc tạo bản ghi sẽ chủ yếu thông qua gem [factorybot](https://github.com/thoughtbot/factory_bot).

FactoryBot cung cấp khung xương để tạo data thông qua các file factory. Để hiểu rõ hơn thì trong phần này mình sẽ xem xét ví dụ với model item và model category có quan hệ: item belongs to category
```
FactoryBot.define do
  factory :item do
    association :category
    sequence(:name) {|n| "item #{n}"}
  end
end
```

* FactoryBot.create: tạo instance và association liên quan, sau đó trả ra instance sau khi đã được lưu vào database. Ví dụ khi FactoryBot.create(:item) thì ngoài item, category cũng sẽ được tạo
```
irb(main):001:0> FactoryBot.create(:item)
  Category Create (0.3ms)  INSERT INTO `categories` (`name`, `created_at`, `updated_at`) VALUES ('category 1', '2020-01-13 07:34:26', '2020-01-13 07:34:26')
  Item Create (0.3ms)  INSERT INTO `items` (`category_id`, `name`, `created_at`, `updated_at`) VALUES (1, 'item 1', '2020-01-13 07:34:26', '2020-01-13 07:34:26')
=> #<Item id: 1, category_id: 1, name: "item 1", created_at: "2020-01-13 07:34:26", updated_at: "2020-01-13 07:34:26">
```
Bên cạnh đó, các call back liên quan đến việc create item object cũng sẽ được gọi như before(:create), after(:create), after(:build)

* FactoryBot.build: build instance và association liên quan, tuy nhiên, sẽ không trigger vào database mà trả ra instance đấy luôn. Ví dụ khi FactoryBot.build(:item) thì sẽ chỉ đơn giản là
```
irb(main):002:0> item = FactoryBot.build(:item)
=> #<Item id: nil, category_id: nil, name: "item 1", created_at: nil, updated_at: nil>
irb(main):003:0> item.category
=> #<Category id: nil, name: "category 2", created_at: nil, updated_at: nil>
```
Callback được gọi ở đây sẽ chỉ có after(:build)

* FactoryBot.build_stubbed: tạo object và gán các giá trị thuộc tính vào object đó, và tương tự như `build`, sẽ không trigger vào database.
```
irb(main):04:0> item = FactoryBot.build_stubbed(:item)
=> #<Item id: 1002, category_id: 1001, name: "item 2", created_at: "2020-01-13 08:34:32", updated_at: "2020-01-13 08:34:32">
irb(main):05:0> item.category
=> #<Category id: 1001, name: "category 2", created_at: "2020-01-13 08:34:32", updated_at: "2020-01-13 08:34:32">
```
Có thể thấy rằng các giá trị id, created_at, updated_at đều khác nil. Tuy nhiên, khi `Item.find(item.id)` thì sẽ trả ra exception, bởi vì giá trị id này được fake ra, không hề tồn tại. Callback được gọi là after(:build).

Vậy, trong các example, thay vì dùng `create`, hãy tận dụng `build` và `build_stubbed` triệt để, vì càng thao tác với database ít thì tốc độ test càng nhanh.

Ví dụ: Thay vì item chỉ thuộc về 1 category như hiện tại thì item sẽ thuộc về 1 list category, lưu bởi trường `category_ids` với kiểu dữ liệu string. Và để lấy ra list item cùng thuộc về 1 category thì có scope
```
# item.rb

scope :belongs_to_category, -> (category_id) { where("category_ids LIKE ?", "%#{category_id}%") }
```

Để viết test cho scope này, input data mà mình tạo là:
```
irb(main):012:0> category = FactoryBot.build_stubbed(:category)
=> #<Category id: 1006, name: "category 1", created_at: "2020-01-13 09:29:55", updated_at: "2020-01-13 09:29:55">
irb(main):016:0> item2 = FactoryBot.create(:item, category_ids: "")
   (0.5ms)  BEGIN
  Item Create (0.7ms)  INSERT INTO `items` (`category_ids`, `name`, `created_at`, `updated_at`) VALUES ('', 'item 3', '2020-01-13 09:31:16', '2020-01-13 09:31:16')
   (4.4ms)  COMMIT
=> #<Item id: 1, category_ids: "", name: "item 3", created_at: "2020-01-13 09:31:16", updated_at: "2020-01-13 09:31:16">
irb(main):017:0> item = FactoryBot.create(:item, category_ids: category.id)
   (0.5ms)  BEGIN
  Item Create (0.8ms)  INSERT INTO `items` (`category_ids`, `name`, `created_at`, `updated_at`) VALUES ('1006', 'item 4', '2020-01-13 09:31:26', '2020-01-13 09:31:26')
   (11.6ms)  COMMIT
=> #<Item id: 2, category_ids: "1006", name: "item 4", created_at: "2020-01-13 09:31:26", updated_at: "2020-01-13 09:31:26">
```

Mình đã dùng build_stubbed để tạo data thay cho create. Và khi đấy
```
irb(main):018:0> Item.belongs_to_category(category.id)
  Item Load (0.9ms)  SELECT  `items`.* FROM `items` WHERE (category_ids LIKE '%1006%') LIMIT 11
=> #<ActiveRecord::Relation [#<Item id: 2, category_ids: "1006", name: "item 4", created_at: "2020-01-13 09:31:26", updated_at: "2020-01-13 09:31:26">]>
```

## DRY unit test

Tất nhiên rồi, Don't repeat yourself (DRY) code rồi thì hãy cố gắng DRY unit test nữa nhé. Và để làm được việc này thì hãy sử dụng `share_examples` và `share_context`

* `share_example`:
     * được hiểu như là một example, bao gồm pre-condition(có thể có hoặc không), behavior
     * được sử dụng thông qua: `include_examples`, `it_behaves_like`
* `share_context`:
     * được hiểu như là một ngữ cảnh, chỉ gồm pre-condition
     * được sử dụng thông qua: `include_context`

Ví dụ: Giả sử có yêu cầu: mỗi user login hệ thống vào ngày 2020/01/01 thì sẽ được tặng 1000 points. Khi đó, unit test sẽ là:
```
share_context 'user login' do
   let(:user) { FactoryBot.create(:user) }
  # thao tác login, ví dụ như gọi api /login
end

share_examples 'user's point not update' do
   it { expect(user.point).to eq 0 }
end
```

sử dụng helper [travel_to](https://api.rubyonrails.org/v5.2.4.1/classes/ActiveSupport/Testing/TimeHelpers.html#method-i-travel_to)
```
context 'when user login before 2020/01/01' do
   before { travel_to Time.zone.local(2019, 12, 31, 23, 59, 00) }
   include_context 'user login'
   it_behaves_like 'user's point not update'
   # include_examples 'users's point not update' -> OK
end

context 'when user login after 2020/01/01' do
   before { travel_to Time.zone.local(2020, 01, 02, 00, 01, 00) }
   include_context 'user login'
   it_behaves_like 'user's point not update'
    # include_examples 'users's point not update' -> OK
end

context 'when user login on 2020/01/01' do
   before { travel_to Time.zone.local(2020, 01, 01, 00, 01, 00) }
   include_context 'user login'
   it 'update user's point to 1000 do
      expect(user.point).to eq 1000
   end
end
```

Ở đây, việc sử dụng `it_behaves_like` để gọi lại shared_examples cũng tương tự như dùng `include_examples`. Tuy nhiên, trong một số trường hợp khác thì không. Theo [document](https://relishapp.com/rspec/rspec-core/v/3-9/docs/example-groups/shared-examples) có viết:
> include_examples "name"      # include the examples in the current context
> 
> it_behaves_like "name"       # include the examples in a nested context

Để làm rõ hơn điều này, ta sẽ xem xét ví dụ sau:
```
shared_examples "some example" do |param|
  let(:something) { param }
  it "uses the given parameter" do
    expect(something).to eq(param)
  end
end
```
nếu gọi liên tiếp 2 shared_examples này bởi include_examples với giá trị params truyền vào khác nhau như:
```
context 'do something' do
   include_examples 'some example', 'first value'
   include_examples 'some example', 'second value'
end
```
chạy test thì sẽ thấy example đầu tiên bị fail. Đọc log sẽ thấy expected là 'second value', còn current là 'first value', điều này có nghĩa là biến something đã nhận giá trị truyền vào sau cùng. Map với docs bên trên thì sẽ hiểu: khi sử dụng `include_examples` thì example sẽ được thêm luôn vào context hiện tại, còn khi sử dụng `it_behaves_like` thì example sẽ được bọc trong một context nữa, rồi mới thêm vào context hiện tại. Do đó, khi include 2 lần liên tiếp như ví dụ trên, thì biến something, trong cùng 1 context, đã được khai báo 2 lần, dẫn đến việc bị ghi đè, nên giá trị nhận được đó là giá trị khai báo sau, là 'second value'

## Kết
Bài viết mang quan điểm cá nhân của mình, sau một khoảng thời gian đã viết rspec khá nhiều. Mong nhận được sự đóng góp của mọi người!