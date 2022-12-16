Unit test là một phần không thể thiếu trong mỗi ứng dụng. Một hệ thống có unit test chạy nhanh và hiệu quả sẽ tiết kiệm được rất nhiều thời gian deploy cho team trong quá trình phát triển. Dưới đây mình xin gợi ý một số cách để có thể tối ưu hóa unit test trong rails:

## Sử dụng :create, :build và :build_stubbed một cách hợp lý
### create:
```
FactoryBot.create(:comment)
```
Trong trường hợp này một đối tương comment sẽ được tạo ra. Nó và tất cả association sẽ được lưu tại Database.

### build:
```
FactoryBot.build(:comment)
```

Trong trường hợp này đối tượng comment sẽ không được lưu vào Database tuy nhiên các association của nó thì có.
```
factory :comment do
  association :post
end

FactoryBot.build(:comment)
(0.1ms)  begin transaction
Post Create (0.5ms)  INSERT INTO "posts" DEFAULT VALUES
(0.6ms)  commit transaction
```

### build_stubbed:
```
FactoryBot.build_stubbed(:comment) 
```

:build_stubbed sẽ không gọi đến Database. Nó sẽ tạo và gán các thuộc tính cho một đối tượng để làm cho đối tượng hoạt động giống như đối tượng được tạo ra bởi **:create**. Các association của nó cũng sẽ được tạo bằng **:build_stubbed** nên hoàn toàn không có tác động nào lên Database.
```
comment = FactoryBot.build_stubbed(:comment)
#<Comment:0x007f94d2b92df0 id: 1002, post_id: 1001, body: "text">
comment.post
#<Post:0x007f94d5883440 id: 1001, name: nil>
```

### Khi nào nên dùng :build_stubbed ?
Ta có model:
```
class Comment < ApplicationRecord
  belongs_to :post
  
  def full_comment
      content + post.name
  end
end

class Post < ApplicationRecord
  has_many :comments
end
```

Factory:
```
factory :comment do
  content: {"A"}
  association :post
end

factory :post do
  name: {"B"}
end
```

Sử dụng rspec để test cho method **full_comment**:
```
...
describe ".full_comment" do
  let!(:comment) {FactoryBot.build_stubbed(:comment)}
  it {expect(comment.full_comment).to eq("AB")}
end
```

Trong hầu hết các trường hợp việc lưu đối tượng vào Database là không cần thiết. Vậy nên khi viết test chúng ta nên hạn chế sử dụng **:create** mà thay vào đó sử dụng **:build** và **:build_stubbed** để giảm sự phụ thuộc vào Database. Điều này giúp cho test chạy nhanh và ổn định hơn rất nhiều.

## Loại bỏ những association không cần thiết
Ở Ví dụ trên ta có Factory:
```
factory :comment do
  content: {"A"}
  association :post
end
```

Cứ mỗi khi ta tạo một đối tượng comment 1 đối tượng post cũng sẽ được tạo kèm. Việc này sẽ làm ảnh hưởng đến performance của các test case vì không phải lúc nào ta cũng cần sử dụng đến association của nó.

Để tránh việc này ta có thể sửa factory lại thành:
```
factory :comment do
  content: {"A"}
  trait :with_post do
    association :post
  end
end
```

Bây giờ bất cứ khi nào bạn muốn tạo ra một comment kèm post chỉ cần:
```
FactoryBot.create(:comment, :with_post)
```

## Sử dụng before(:all) để loại bỏ let! không cần thiết
Nếu như đoạn test ở ví dụ đầu tiên có nhiều test case hơn:
```
...
describe ".full_comment" do
  let!(:comment) {FactoryBot.build_stubbed(:comment)}
  it {expect(comment.full_comment).to eq("AB")}
  
  context "2" do
    # case 2
  end
  
  context "3" do
    # case 3
  end
end
```

Lúc này let! sẽ tạo ra một đối tượng comment cho mỗi case (tổng cộng 3 đối tượng) trong khi đó có thể ta chỉ cần sử dụng một. Ta có thể sửa code như sau:
```
...
describe ".full_comment" do
  before(:all) {@comment = FactoryBot.build_stubbed(:comment)}
  it {expect(@comment.full_comment).to eq("AB")}
  
  context "2" do
    # case 2
  end
  
  context "3" do
    # case 3
  end
end
```

Lúc này tất cả các testcase sẽ sử dụng chung một đối tượng comment.

Tuy nhiên bạn nên thận trọng khi sử dụng **before(:all)** , trong trường hợp này là việc làm đối tượng comment "global" giữa các test case, các test case có thể thay đổi thuộc tính của đối tượng này dẫn đến làm sai lệch kết quả của các test case khác.

## Sử dụng Mock và stub
Nếu bạn không muốn thực thi một phương thức tốn nhiều thời gian (như call API, lấy kết quả từ một module khác có xử lý nặng) bạn có thể fake kết quả trả về bằng stub:
```
allow(book).to receive(:title) { "The RSpec book" }

allow(book).to receive(:title).and_return("The RSpec book")

allow(book).to receive_messages(
   title: "The RSpec book",
   description: "Write tests use method stubs"
)
```

Bạn có thể sử dụng receive_message_chain thay thế receive để stub một chuỗi các methods như sau:
```
allow(book).to receive_message_chain("title.length") { 30 }
  
  allow(book).to receive_message_chain(:title, :length => 30)
  
  allow(book).to receive_message_chain(:title, :length) { 30 }

book.title.length # => 30
```

## Tham khảo:
https://medium.com/appaloosa-store-engineering/tips-to-improve-speed-of-your-test-suite-8418b485205c

https://relishapp.com/rspec/rspec-core/v/3-6/docs/helper-methods/let-and-let

https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md

https://medium.com/@DmytroVasin/speed-up-your-tests-via-build-stubbed-f1926863b3d7

https://www.netguru.com/blog/9-ways-to-speed-up-your-rspec-tests