Viết test là một phần hết sức quan trọng khi chúng ta phát triển bất cứ một chương trình nào. Tuy nhiên đôi khi tạo gặp khó khăn để làm sao test của chúng ta viết ra thật clean và chạy nhanh nhất là đối với một project có nhiều member tham gia việc phát triển trong một thời gian dài. Trong bài này tôi sẽ tập trung vào việc làm sao cho test của chúng ta chạy nhanh hơn theo 2 cách : Refactor lại các phần chung của test lặp lại nhiều lần và giảm việc request tới database trong khi test.

## Ví dụ
Trước hết chúng ta có ví dụ dưới đây:

```Ruby
class AgePolicy
  def old_enough? age
    age >= 18
  end
end
```

Trên đây là một policy đơn giản để giúp kiểm tra người dùng có đủ tuổi để sử dụng ứng dụng không.
Và chúng ta có thể viết test cho class trên đơn giản như:

```Ruby
require 'spec_helper'

describe AgePolicy do
  describe '#old_enough?' do
    it 'returns false if user is 16 years old' do
      policy = AgePolicy.new

      expect(policy.old_enough?(16)).to eq(false)
    end

    it 'returns false if user is 12 years old' do
      policy = AgePolicy.new

      expect(policy.old_enough?(12)).to eq(false)
    end

    it 'returns true if user is 18 years old' do
      policy = AgePolicy.new

      expect(policy.old_enough?(18)).to eq(true)
    end

    it 'returns true if user is 20 years old' do
      policy = AgePolicy.new

      expect(policy.old_enough?(20)).to eq(true)
    end
  end
end
```

Trong những trường hợp như ở trên chúng ta có thể sử dụng `shared_example` được cung cấp bởi `RSpec` để refactor lại như bên dưới:

```Ruby
require 'spec_helper'

describe AgePolicy do
  describe '#old_enough?' do
    shared_examples 'user eligible for taking an action' do |age|
      it "returns true if user is #{age} years old" do
        policy = AgePolicy.new

        expect(policy.old_enough?(age)).to eq(true)
      end
    end

    shared_examples 'user not eligible for taking an action' do |age|
      it "returns false if user is #{age} years old" do
        policy = AgePolicy.new

        expect(policy.old_enough?(age)).to eq(false)
      end
    end

    it_behaves_like 'user not eligible for taking an action', 16
    it_behaves_like 'user not eligible for taking an action', 12
    it_behaves_like 'user eligible for taking an action', 18
    it_behaves_like 'user eligible for taking an action', 20
  end
end
```

Test của chúng ta đã chạy nhanh hơn một chút và ngoài ra chúng ta đã không để bị lặp code.

## Custom matchers

`RSpec` cung cấp cho chúng ta rất nhiều matcher tiện dụng. Như ví dụ ở trên chúng ta đã sử dụng `be_truthy` và `be_falsey`. Đôi khi để expect một giá trị cho trước chúng ta có thể lại lại một đoạn code nhiều lần. Ví dụ điển hinh cho trường hợp này đó là khi ta viết test responese cho controller. Hãy xem ví dụ bên dưới:

```Ruby
class SomeController
  def show
    render json: { success: true }
  end
end
```

Chúng ta sẽ viết thế nào cho trường hợp success trả về true :

```Ruby
describe SomeController do
  describe 'GET #show' do
    it 'returns success response' do
      get :show, id: 11, format: :json
      
      expect(JSON.parse(response.body)).to eq({success: true})
    end
  end
end
```

Nếu bạn có một logic lặp lại nhiều lần trong suốt quá trình viết test bạn hoàn toàn có thể tạo ra một matcher để thực hiện điều trên. Ví dụ thay vì viết test như trên bạn có thể viết lại như sau:
```Ruby
expect(response).to be_json_success
```

Để tạo một matcher như vậy bạn phải tạo một file `matchers.rb` trong `spec/support` và định nghĩa matcher của bạn ở đó

```Ruby
RSpec::Matchers.define :be_json_success do |expected|
  match do |actual|
    json_response = JSON.parse(actual.body)
    expect(json_response['success']).to eq(true)
  end
end
```

Bước cuối cùng là bạn thêm `require 'support/matchers'` đó vào file `spec_helper.rb` vậy là xong.


## Xóa hết association không cần thiết trong factories

Phương thức này sẽ rất hữu dụng cho bạn nếu bạn sử dụng `FactoryBot` (trước đây là `FactoryGirl`). Hãy tưởng tượng bạn có model `User` và mỗi một user có một `Contact` và một `Location`. Factory của bạn sẽ có giống như sau:

```Ruby
FactoryGirl.define do
  factory :user do
    contact
    location  
  end
end
```

Mỗi khi FactoryBot tạo hoặc build một user thì hai record contact và location sẽ đồng thời được tạo. (Đúng vậy kể cả bạn có sử dụng build). Nếu bạn không muốn tạo bất kỳ associated record nào thì hãy sử dụng `FactoryBot.build_stubbed :user`.

Giờ hãy tưởng tượng bạn sử dụng factory trên cho mọi test bạn có. Nếu bạn thật sự cần đến tất cả các association trong database thì mọi việc đều ổn cả. Còn nếu không cần thì bạn có cơ hội carit thiện performance của test một cách đang kể. Factory cơ bản của bạn sẽ có các thông tin cơ bản để record là valid. Nếu đôi khi bạn cần sử dụng đến association thì sẽ cân nhắc sử dụng `trait`

```Ruby
FactoryGirl.define do
  factory :user do
    first_name { "John" }
    last_name { "Doe" }
    
    trait :with_location do
      location
    end
  end
end
```

Bạn có thể gọi trail bằng cách

```Ruby
FactoryBot.create :user, :with_location
```

## Sử dụng Rails Transactional test

Đã bao nhiêu lần bạn chỉ sự dụng duy nhất một record cho tất cả các test của bạn? 
Chúng ta hãy thử sử dụng lại factory `User` ở trên để tạo một test đơn giản:

```Ruby
require 'spec_helper'

describe User do
  let!(:user) { FactoryGirl.create :user }
  
  it 'does something' do
    # test with user
  end
  
  it 'does something' do
    # test with user
  end
  
  it 'does something' do
    # test with user
  end
end
```

Với ví dụ ở trên có bay nhiêu record user được tạo trong database? Mỗi một test tạo 1 user vậy câu trả lời ở đây là ba.

Để tránh trường hợp trên bạn có thể sử dựng helper `let_it_be` của gem `test-prof`. Helper này giúp record được tạo duy nhất một lần vào bắt đầu của test và được xóa đi khi việc test kết thúc. Sau khi bạn cài đặt gem xong bạn thêm `require 'test_prof/recipes/rspec/let_it_be'` vào `spec_helper.rb` :

```Ruby
require 'spec_helper'

describe User do
  let_it_be(:user) { FactoryGirl.create :user }
  
  it 'does something' do
    # test with user
  end
  
  it 'does something' do
    # test with user
  end
  
  it 'does something' do
    # test with user
  end
end
```

Vậy là xong. Nếu bạn có nhiều example sử dụng chung một record tốc độ test của bạn có thể cải thiện lên tới 50%. 
Và hãy nhớ luôn luôn sửa dụng `stubs` nếu bạn không cần lưu dữ liệu vào database.