# 1. Giới thiệu
Khi mình đọc lại test case của dự án, có khá nhiều đoạn code dài và rối mắt khi đọc dẫn đến việc bạn phải tốn nhiều thời gian cho việc đọc hiểu code. Hơn thế nữa, việc viết test không theo một quy chuẩn sẽ kiến bạn trở nên lúng túng, không biết sẽ triển khai thêm code test mới ở đâu. Vì thế, mình viết bài này nhắm mục đích giúp các bạn có thêm những lựa chọn hữu ích khi viết code, giúp code trở nên trong sáng, sạch đẹp hơn.
# 2. Code style
## A. Controller
Với controller, việc sắp xếp theo thứ tự method như dưới đây sẽ giúp bạn dễ dàng tìm kiếm, đọc hiểu code hơn.
```
index
create
show
update
destroy
other actions
private methods
```
## B. Models
Với model
- Sắp xếp theo bảng chữ cái.
- Sắp xếp theo thứ tự, ví dụ
```
class MyModel < ApplicationRecord
  include DateTime

  CONSTANT = ...

  attr_accessor :name

  belongs_to :animal

  has_one :dog

  has_many :feature

  accepts_nested_attributes_for :foods

  delegate

  validates :name

  enum category: { pug: 0, hasky: 1 }

  after_destroy :destroy_feature

  scope :first_scope

  class << self
    def method1; end

    def method2; end
  end

  def instance_method1; end

  private

  def do_something; end
end
```
# 3. Spec, test case
Sau đây là một số lưu ý khi viết test :
### 1. Viết test case method theo thứ tự như trong models, controller sẽ giúp bạn dễ dàng tìm kiếm và viết thêm mã
```
RSpec.describe MyModel, type: :model do
  describe 'associations' do; end

  describe 'validations' do; end

  describe 'enums' do; end

  describe 'callbacks' do
    describe 'method1' do; end

    describe 'method2' do; end
  end
  
  ...
end
```
### 2. Đưa subject lên đầu method sẽ giúp bạn clear về nội dung viết test
```
describe 'delete_extended_object' do
  subject { parent.destroy }

  ..
end
```
### 3. Chỉ khai báo dữ liệu dùng đến trong blocks
```
BAD
  let!(:animal) { create :animal, type: 'dog'}
  let!(:dog1) { create :dog, name: 'abc', age: 2, type: :husky, parent_object: animal }
  let!(:user_login) { create :user, name: 'user1', is_login: false }
  
  let(:return_object1) do
    {
      animal: { id: 1, type: 'dog' }
    }
  end
  let(:return_object2) do
    {
      user: { id: 1, name: 'user1' },
      pet: { id: 1, name: 'abc' }
    }
  end

  context 'action 1' do
    it { expect(response.body).to eq return_object1 }
  end

  context 'action 2' do
    it { expect(response.body).to eq return_object2 }
  end
```
Ví dụ, khối **context1** chỉ sử dụng dữ liệu **animal**, nhưng lại tạo dữ liệu cho cả **dog1** và **user_login**. Tất nhiên, việc viết mã như trên không có gì sai.
Tuy nhiên khối mã trên sẽ tốn thêm thời gian để tạo dữ liệu dư thừa mà không sử dụng đến.
```
GOOD
let!(:animal) { create :animal, type: 'dog'}

context 'action 1' do
  let(:return_object1) do
    {
      animal: { id: 1, type: 'dog' }
    }
  end

  it { expect(response.body).to eq return_object1 }
end

context 'action 2' do
  let!(:dog1) { create :dog, name: 'abc', age: 2, type: :husky, parent_object: animal }
  let!(:user_login) { create :user, name: 'user1', is_login: false }
  
  let(:return_object2) do
    {
      user: { id: 1, name: 'user1' },
      pet: { id: 1, name: 'abc' }
    }
  end

  it { expect(response.body).to eq return_object2 }
end
```
### 4. Tránh việc gọi method, truy vấn trong response trả về
Không nên
```
BAD
  describe 'PATCH /api/v1/objects' do
    let!(:animal) { create :animal, type: 'dog'}
  
    context 'action 1' do
      let(:return_object1) do
        {
          animal: {
            id: 1,
            type: animal.type,
            feature: animal.method_feature 
          }
        }
      end
  
      it { expect(response.body).to eq return_object1 }
    end
  end
```
Khi gọi đến thuộc tính, method sẽ làm tăng thời gian chạy test case. Không những thế, việc xem lại test case sẽ tốn nhiều thời gian hơn, như phải tìm thuộc tính method sẽ trả ra giá trị nào.
```
GOOD
describe 'PATCH /api/v1/objects' do
  let!(:animal) { create :animal, type: 'dog'}

  context 'action 1' do
    let(:return_object1) do
      {
        animal: {
          id: 1,
          type: 'dog',
          feature: 'rescue'
        }
      }
    end

    it { expect(response.body).to eq return_object1 }
  end
end
```
### 5. Định hình cấu trúc trả về để viết test hiệu quả, tránh việc bỏ sót
Khi viết test chúng ta nên định hình các cấu trúc sẽ được trả về, phân chia chúng thành các case .
Ví dụ các test case thường sẽ bắt đầu bằng expect nil, sau đó sẽ đến cách case khác. 
```
  context 'if return value is blank' do
    it 'return nil' do; end

    it 'return empty array' do; end
  end

  context 'if return value is present ' do
    it 'return integer' do; end

    it 'return array' do; end
  end
```
[Tham khảo thêm](https://nimblehq.co/compass/development/code-conventions/ruby/rspec)