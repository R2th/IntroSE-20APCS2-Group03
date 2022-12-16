## RSpec là gì?
RSpec là một trong những testing framework phổ biến nhất cho Ruby, cho phép bạn viết unit tests cho controller, views, helpers và model trong ứng dụng Rails. Trên trang mạng có nhiều ngồn tài liệu cung cấp tổng quan đầy đủ về những gì bạn có thể làm với RSpec. Nhưng có ít tài liệu nói về cách tạo ra một RSpec tuyệt vời.

tài liệu này sẽ giới thiệu một số cách viết spec (có thể) tốt hơn dựa trên những gì mình biết 

### 1.  describe methods

Hãy rõ ràng về phương pháp bạn đang mô tả. Ví dụ, sử dụng Ruby documentation convention '.' khi đề cập đến tên của class method và # khi đề cập đến tên của instance method.

BAD:
```
describe 'the authenticate method for User' do
describe 'if the user is an admin' do
```

GOOD:
```
describe '.authenticate' do
describe '#admin?' do
```

### 2. Sử dụng contexts
điều nà sẽ làm cho tests của chúng ta trở lên rõ ràng và có dễ hiểu hơn. về lâu dài với một dự án dài hơi và có sự luân chuyển nhân sự thì nhưng người mới cũng sẽ dễ hiểu được ý đồ viết test của người trước hơn

BAD:
```
it 'has 200 status code if logged in' do
  expect(response).to respond_with 200
end
it 'has 401 status code if not logged in' do
  expect(response).to respond_with 401
end
```

GOOD:
```
context 'when logged in' do
  it { is_expected.to respond_with 200 }
end
context 'when logged out' do
  it { is_expected.to respond_with 401 }
end
```
Khi mô tả một context, hãy bắt đầu mô tả của bằng "when" hoặc "with".

### 3. Mô tả rõ ràng nhưng phải ngắn gọn
theo những người có kinh nghiệm một description không bao giờ nên dài hơn 40 ký tự. Nếu điều này xảy ra, bạn nên phân tách nó bằng cách sử dụng một context.
 
BAD:
```
it 'has 422 status code if an unexpected params will be added' do
```

GOOD:
```
context 'when not valid' do
  it { is_expected.to respond_with 422 }
end
```

Trong ví dụ này, mình đã xóa mô tả liên quan đến mã trạng thái, đã được thay thế bằng expect it { is_expected.to respond_with 422 }. Nếu bạn chạy thử test này, bạn sẽ có được output

```
when not valid
  it should respond with 422
```

### 4. Test tất cả nhưng trường hợp có thể 
viết test tốt là một chuyện nhưng nếu bạn không test hết tất cả nhưng trường hợp thì việc viết test sẽ trở nên vô ích.

DESTROY ACTION

```
before_filter :find_owned_resources
before_filter :find_resource

def destroy
  render 'show'
  @consumption.destroy
end
```

Nếu ở đây bạn chỉ test với trường hợp resource đã bị xóa hay chưa thì thật sự chưa ổn lắm có 2 trường hợp nữa là resource không được tìm thấy và resource không được sở hữu.

BAD:
```
it 'shows the resource'
```

GOOD:
```
describe '#destroy' do

  context 'when resource is found' do
    it 'responds with 200'
    it 'shows the resource'
  end

  context 'when resource is not found' do
    it 'responds with 404'
  end

  context 'when resource is not owned' do
    it 'responds with 404'
  end
end
```

### 5. Sử dụng subject 
Nếu bạn có một số test liên quan đến cùng một chủ đề, hãy sử dụng subject {} để DRY(Don't Repeat Yourself) chúng.

BAD:
```
it { expect(assigns('message')).to match /it was born in Belville/ }
```

GOOD:
```
subject { assigns('message') }
it { is_expected.to match /it was born in Billville/ }
```

GOOD:
```
subject(:hero) { Hero.first }
it "carries a sword" do
  expect(hero.equipment).to include "sword"
end
```

### 6. Sử dụng let và let!

Khi bạn phải gán một biến thay vì sử dụng blok trước để tạo biến instance , hãy sử dụng let. Việc sử dụng let để biến chỉ load khi nó được sử dụng lần đầu tiên trong test và được lưu vào bộ đệm cho đến khi test cụ thể đó kết thúc. Một mô tả thực sự sâu về điều này bạn có thể được tìm thấy trong [stackoverflow](https://stackoverflow.com/questions/5359558/when-to-use-rspec-let/5359979#5359979) này.

BAD:
```
describe '#type_id' do
  before { @resource = FactoryGirl.create :device }
  before { @type     = Type.find @resource.type_id }

  it 'sets the type_id field' do
    expect(@resource.type_id).to equal(@type.id)
  end
end
```

GOOD:
```
describe '#type_id' do
  let(:resource) { FactoryGirl.create :device }
  let(:type)     { Type.find resource.type_id }

  it 'sets the type_id field' do
    expect(resource.type_id).to equal(type.id)
  end
end
```

GOOD:
```
context 'when updates a not existing property value' do
  let(:properties) { { id: Settings.resource_id, value: 'on'} }

  def update
    resource.properties = properties
  end

  it 'raises a not found error' do
    expect { update }.to raise_error Mongoid::Errors::DocumentNotFound
  end
end
```

Sử dụng let! nếu bạn muốn định nghĩa biến khi block được định nghĩa. Điều này có thể hữu ích để đưa vào cơ sở dữ liệu của bạn để kiểm tra các truy vấn hoặc phạm vi.

### 7. Chỉ tạo dữ liệu bạn cần
Nếu bạn đã từng làm việc trong một dự án trung bình (hoặc đôi khi cả những dự án nhỏ), việc chạy spec thực sự rất nặng. Để giải quyết vấn đề này, thì điều quan trọng là không tải nhiều dữ liệu hơn mức cần thiết. Ngoài ra, nếu bạn nghĩ rằng bạn cần hàng tá bản ghi thì có lẽ bạn đã sai.

GOOD
```
describe "User" do
  describe ".top" do
    before { FactoryGirl.create_list(:user, 3) }
    it { expect(User.top(2)).to have(2).item }
  end
end
```

### 8. Sử dụng factories và không fix cứng 
Khi cần tạo bản ghi mới bạn có thể sử dụng FactoryGirl thay vì fix cứng giá trị thuộc tính của bản ghi đó. Việc sử dụng factory sẽ giúp bạn dễ kiểm soát hơn, và cũng giảm bớt mức độ chi tiết khi tạo ra một bản ghi tăng tính ngẫu nhiên khi test.

BAD
```
user = User.create(
  name: 'Genoveffa',
  surname: 'Piccolina',
  city: 'Billyville',
  birth: '17 Agoust 1982',
  active: true
)
```

GOOD
```
user = FactoryGirl.create :user
```

nguồn: http://www.betterspecs.org/