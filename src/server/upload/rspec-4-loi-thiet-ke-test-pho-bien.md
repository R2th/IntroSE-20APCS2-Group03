Làm việc với RoR, chắc hẳn không ai còn xa lạ gì với việc sử dụng [Rspec](https://github.com/rspec/rspec) để viết UnitTest. Nó thật sự giúp các DEV kiểm soát tốt hơn mã code của mình, đặc biệt với những hệ thống bussiness phức tạp thì càng cần phải viết UnitTest thật đầy đủ.
Tuy nhiên, phải thừa nhận là không phải DEV nào cũng biết viết Rspec đúng. Và tôi cho rằng thà không viết test còn hơn là viết những đoạn mã test `yếu`. Bởi vì, nếu chúng ta không viết test thì chúng ta sẽ phải test lại bằng tay, nhưng với 1 đoạn mã rspec `yếu`, chúng ta sẽ lầm tưởng rằng mọi thứ vẫn OK.

Làm thế nào để phát hiện được một test `yếu` ? Dưới đây là một số lỗi thường gặp trong quá trình tạo test.

Chúng ta sẽ viết 1 đoạn mã đơn giản và 1 đoạn test `yếu` và cùng phân tích nó:

```
module Users
  class NameService
    def initialize(user)
      @user = user
    end
  
    def name
      if user.name.present?
        user.name
      else
        ::ExternalAPI.new(user).get_name
      end
    end
  
    private
    attr_reader :user
  end
end
```

Class này sẽ return tên của user nếu nó tồn tại, nếu không sẽ lấy tên thông qua API.
Chúng ta cùng xem xét đoạn test `yếu` sau đây:

```
require 'spec_helper'

describe Users::NameService do
  describe '#name' do
    it 'returns name' do
      user = User.create!(name: 'Mike Black')
      service = described_class.new(user)
      
      expect(service.name).to eq(user.name)
    end
    
    it 'returns name' do
      user = User.create!(name: nil)
      service = described_class.new(user)
      
      expect(service.name).to eq('Mike Jr Black')
    end
  end
end
```

Vì sao đoạn test này là bị gọi là `yếu`. Hãy cùng phân tích:

### Rspec không thể hiểu được.
Khi chạy Rspec với flag `--format documentation`, bạn sẽ nhận ra rằng nếu không nhìn vào Class và đoạn code test thì sẽ không tài nào hiểu được `method` này đang làm gì. Tất nhiên, chúng ta biết được `method` này return ra tên, nhưng ngoài ra thì không biết thêm thông tin gì cả. `Test` có thể coi là một nguồn kiến thức tốt nhất về ứng dụng nên việc viết mô tả rõ ràng, dễ hiểu là điều rất quan trọng.
Hãy xem đoạn fix sau:

```
describe Users::NameService do
  describe '#name' do
    it 'returns user name if the user has a name' do
      user = User.create!(name: 'Mike Black')
      service = described_class.new(user)
      
      expect(service.name).to eq(user.name)
    end
    
    it 'returns user name from API if the user does not have a name' do
      user = User.create!(name: nil)
      service = described_class.new(user)
      
      expect(service.name).to eq('Mike Jr Black')
    end
  end
end
```

Giờ hãy chạy lại Rspec với flag `--format documentation` để thấy sự khác biệt :)

### Không cô lập được test
Ở đây, chúng ta muốn kiểm tra service tên, tuy nhiên trong đoạn mã lại sử dụng class `ExternalAPI#get_name` (class này không có ý nghĩa với UnitTest, nơi chúng ta phải cô lập đoạn mã và chỉ test mình nó mà thôi).
Giả sử, class của bạn hoạt động tốt nhưng nếu class `ExternalAPI#get_name` có lỗi, thì đoạn mã test của chúng ta sẽ gặp lỗi và chúng ta phải sửa đồng thời cả 2 đoạn mã test `Users::NameService#name` và `ExternalAPI#get_name`.
Cách cô lập mã test ở đây là sử dụng [stub](https://relishapp.com/rspec/rspec-mocks/v/3-7/docs).
Ví dụ:

```
describe Users::NameService do
  describe '#name' do
    it 'returns user name if the user has a name' do
      user = User.create!(name: 'Mike Black')
      service = described_class.new(user)
      
      expect(service.name).to eq(user.name)
    end
    
    it 'returns user name from API if the user does not have a name' do
      user = User.create!(name: nil)
      external_api = instance_double(ExternalAPI, get_name: 'Mike Jr Black')
      allow(ExternalAPI).to receive(:new).with(user).and_return(external_api)
      
      service = described_class.new(user)
      
      expect(service.name).to eq('Mike Jr Black')
    end
  end
end
```

Bây giờ, đoạn mã `Users::NameService#name` đã được cô lập, và không phụ thuộc vào class `ExternalAPI#get_name`.

### Sử dụng database không thật sự cần thiết
Chúng ta không thật sự cần phải thao tác với cơ sở dữ liệu khi test để viết test. Thay vào đó ta sử dụng [stub](https://relishapp.com/rspec/rspec-mocks/v/3-7/docs) và tăng tốc độ test.

```
describe Users::NameService do
  describe '#name' do
    it 'returns user name if the user has a name' do
      user = instance_double(User, name: 'Mike Black')
      service = described_class.new(user)
      
      expect(service.name).to eq(user.name)
    end
    
    it 'returns user name from API if the user does not have a name' do
      user = instance_double(User, name: nil)
      external_api = instance_double(ExternalAPI, get_name: 'Mike Jr Black')
      allow(ExternalAPI).to receive(:new).with(user).and_return(external_api)
      
      service = described_class.new(user)
      
      expect(service.name).to eq('Mike Jr Black')
    end
  end
end
```

Bạn thấy chứ, ta hoàn toàn không cần phải thao tác với database mà vẫn viết test được server name. Thật tuyệt, test của ta còn nhanh hơn nữa :).

### Test các method private
Đây cũng là một sai lầm khá phổ biến. Vì về cơ bản, các method private luôn được gọi bởi các method public, vì vậy chỉ cần viết test cho method public là đã đủ rồi. Tuy nhiên đôi khi đoạn mã quá phức tạp, bạn thấy cần phải viết test cho method private thì hãy phân tách chúng vào các class nhỏ hơn và test chúng một cách độc lập.
Cách tốt nhất để tránh việc phải viết test cho method private là chúng ta hãy áp dụng [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)  khi thiết kế các methods.

### Tham khảo
http://pdabrowski.com/blog/ruby-on-rails/testing/rspec-4-common-tests-design-mistakes/