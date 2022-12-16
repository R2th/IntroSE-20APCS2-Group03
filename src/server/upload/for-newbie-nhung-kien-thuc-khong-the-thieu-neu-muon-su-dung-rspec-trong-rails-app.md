![](https://images.viblo.asia/1cbb7935-8bfc-4e86-a08e-6bd748d91892.png)

## RSpec là gì?
RSpec là một trong những testing framework phổ biến nhất cho Ruby.

RSpec-rails là một mở rộng của RSpec, cho phép bạn viết unit tests cho controller, views, helpers và model trong ứng dụng Rails.

Nó cũng cung cấp khả năng viết integration tests với selenium (sử dụng capybara).

## Cài đặt và khởi tạo RSpec-rails
### Cài đặt
Thêm rspec-rails vào cả 2 môi trường `:development` và `:test` trong Gemfile:
```ruby
group :development, :test do
  gem 'rspec-rails', '~> 3.7'
end
```

Thêm vào cả `:development` là để khi generate model/controller, file spec cho model/controller đó sẽ tự động được thêm vào mà không cần dùng `RAILS_ENV=test`.

Đây là version mới nhất tại thời điểm của bài viết này.

Nó sẽ cài đặt những gems sau:
`rspec, rspec-core, rspec-expectations, rspec-mocks và rspec-rails`

### Khởi tạo và chạy Rpec
Khởi tạo thư mục `spec/` (nơi chứa các file specs) với cmd:
```
rails generate rspec:install
```
Nó sẽ thêm những files sau đây được dùng cho việc cấu hình:
- .rspec
- spec/rails_helper.rb
- spec/spec_helper.rb

Để chạy các file specs, sử dụng cmd: 
```
bundle exec rspec
```
Mặc định, câu lệnh trên sẽ chạy tất cả những file `_spec.rb` trong thư mục `spec/`

Nếu muốn chạy chỉ một file spec cụ thể nào đó, bạn sử dụng cmd giống như:

```
bundle exec rspec spec/models/book_spec.rb
```

## Cấu trúc cơ bản của spec file
### describe/it
Rspec sử dụng những từ như `"describe"` và `"it"` để thể hiện hành vi, tổ chức của codes giống như một cuộc hội thoại:
```ruby
 "Describe a bank account when it is first opened."
 "It has a balance of zero."
```

Phương thức `describe` tạo ra một example group. Bên trong describe block, bạn có thể khai báo các nested groups sử dụng `describe` hoặc `context`, hoặc bạn có thể khai báo các examples sử dụng `it`.

**Ví dụ:**

Một group, một example:
```ruby
 RSpec.describe "something" do
   it "does something" do
   end
 end
```

Nested example group (sử dụng context):
```ruby
 RSpec.describe "something" do
   context "in one context" do
     it "does one thing" do
     end
   end
 end
```


Hãy rõ ràng với những methods mà bạn đang mô tả. 

**Lời khuyên cho bạn khi sử dụng describe với class & methods:**
```ruby
- describe "ClasName" do end;
- describe "#instance_method" do end;
- describe ".class_method" do end;
```

**Ví dụ:**
```ruby
# lib/calculator.rb:
class Calculator
  def sum a, b
 a + b
  end
end
```

```ruby
# spec/calculator_spec.rb:
require 'rails_helper'
require 'calculator'
RSpec.describe Calculator do
  describe '#sum' do
     it 'return sum of 2 numbers' do
        calc   = Calculator.new
        result = calc.sum(1, 2)
        expect(result).to eq(3) # là một expectation
     end
  end
end
```


### Sử dụng context
Context là một phương pháp tốt giúp cho tests của bạn trở nên rõ ràng, dễ đọc và có tổ chức tốt hơn.

**Ví dụ ta có một đoạn test như sau:**
```ruby
 it 'has 200 status code if logged in' do
   expect(response).to respond_with 200
 end

 it 'has 401 status code if not logged in' do
   expect(response).to respond_with 401
 end
```

=> Bad codes. Không sử dụng if bên trong `it`. Thay vào đó hãy sử dụng `context`.

Đoạn test trên sẽ được viết lại với `context` như sau:
```ruby
 context 'when logged in' do
   it { expect(response).to respond_with 200 }
 end

 context 'when logged out' do
   it { expect(response).to respond_with 401 }
 end
```

**Note:** Tên context nên được bắt đầu với "when" hoặc "with"

## Expectation
Thư viện `rspec-expectations` được sử dụng để xác định những kết quả mong đợi của việc test.

Cấu trúc cơ bản của một rspec expectation:

```ruby
  expect(actual).to matcher(expected)
  expect(actual).not_to matcher(expected)
```
**Note**: Bạn cũng có thể viết `expect(..).to_not` thay vì `expect(..).not_to` tùy ý

**Ví dụ:**
```ruby
  expect(10).to eq(10)
  expect(10).not_to eq(9)
  expect(10).to_not eq(11)
```

## Matchers
rspec-expectations cung cấp một số các matchers phục vụ cho việc xác định kết quả mong đợi. Mỗi matcher có thể sử dụng với `expect(..).to` hay `expect(..).not_to`.

Một số matchers thường sử dụng:
```ruby
 expect(actual).to be(expected) # passes if actual.equal?(expected)
 expect(actual).to eq(expected) # passes if actual == expected
 expect(actual).to eql(expected)   # passes if actual.eql?(expected)
 expect(actual).to equal(expected) # passes if actual.equal?(expected)
```

```ruby
expect(5).to be >= 3
expect("Welcome to RSpec").to match(/RSpec$/)
expect(dog).to be_instance_of(Dog) # dog.class = Dog
expect(dog_is_a_friend).to be true
expect(user.email).to be_nil # user.email = nil
expect(str).to start_with("foo").and end_with("bazz") # str = 'foo bar bazz'

expect([]).to be_empty
expect([1, 3, 5]).to include(1, 3)

Expect error: expect { … }.to raise_error(ErrorClass)

expect([2, 4, 6]).to contain_exactly(6,2,4)
expect([2, 4, 6]).to match_array([2, 6, 4])

Theo dõi sự thay đổi:
expect { object.action }.to change(object, :value).from(old).to(new)
expect { object.action }.to change(object, :value).by(delta)

expect { a += 1 }.to change { a }.by(1)   // a thay đổi 1 đơn vị 
expect { a += 3 }.to change { a }.from(2).to(5) // Ban đầu a = 2
```

Đọc thêm: [Matchers Documentation](https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers)
<br>

**Ngoài ra chúng ta cũng có thể custom một matcher:**
```ruby
require 'rspec/expectations'
RSpec::Matchers.define :be_a_multiple_of do |expected|
  match do |actual|
    actual % expected == 0
  end
end

RSpec.describe 9 do
  it { expect(9).to be_a_multiple_of(3) }
end

RSpec.describe 9 do
  it { expect(9).not_to be_a_multiple_of(4) }
end
```

## Subject

### Implicitly subject:
Khi argument đầu tiên của example group ngoài cùng là một class, thì một instance của class đó sẽ được truyền đến mỗi example thông qua subject.

**Ví dụ:**
```ruby
  RSpec.describe Array do
    describe "when first created" do
      it "should be empty" do
        expect(subject).to be_empty     # subject ở đây là []
      end
    end
  end
```

### Explicit subject:
Ở đây chúng ta xác định một giá trị rõ ràng được trả về bởi subject method trong một example.

**Ví dụ:**
```
  RSpec.describe Array, "with some elements" do
    subject { [1, 2, 3] }

    it "has the expected elements" do
      expect(subject).to eq([1, 2, 3])
    end
  end
```

### Cú pháp One-liner:
- `is_expected.to` tương đương với `expect(subject).to`
- `should`

**Ví dụ:**
```
RSpec.describe Array do
  describe "when first created" do
    it { should be_empty }
    # or
    it { is_expected.to be_empty }
  end
end
```

## Before & after hooks

Sử dụng before và after hook để thực hiện một đoạn codes nào đó trước/sau khi chạy một example:

```ruby
before(:example) # chạy trước mỗi example
before(:context) # chạy một lần duy nhất, trước tất cả examples trong một group

after(:example) # chạy sau mỗi example
after(:context) # chạy một lần duy nhất, sau tất cả examples trong một group
```
Ví dụ sau đây sẽ minh họa cho cách thực thi của chúng:
```ruby
before(:context) 
# before(:context) run
it { expect(5).to be >= 3 }
it { expect("Welcome to RSpec").to match(/RSpec$/) }
it { expect(dog).to be_instance_of(Dog) }

before(:example)
# before(:example) run
it { expect(5).to be >= 3 }
# before(:example) run
it { expect("Welcome to RSpec").to match(/RSpec$/) }
# before(:example) run
it { expect(dog).to be_instance_of(Dog) }
```

before và after block được gọi theo thứ tự sau:
```ruby
before :suite 
before :context
before :example

after :example
after :context
after :suite
```
**Note:**
- Setting một instance variable không hỗ trợ trong before(:suite)
- Mocks chỉ hỗ trợ trong before(:example)
- :example và :context scope tương đương với :each và :all
- Chúng ta chỉ cần viết before/after thôi, không cần before(:each)/after(:each)


### before(:each)

Ví dụ ta có một class là `Contact`:
```ruby
class Contact
  def names
	@names ||= []
  end 
end
```

Một minh họa cho việc sử dụng `before` hook:
```ruby
RSpec.describe Contact do
  before { @contact = Contact.new }

  describe "initialized in before(:each)" do
    it "has 0 contacts" do
      expect(@contact.names.count).to eq(0)
    end
    
    it "can accept new contact" do
      @contact.names << "New contact"
    end
    
    it "still has 0 contacts" do
      expect(@contact.names.count).to eq(0)
    end
  end
end
```

### before(:all)

```ruby
RSpec.describe Contact do
  before(:all) { @contact = Contact.new }

  describe "initialized in before(:all)" do
    it "has 0 contacts" do
      expect(@contact.names.count).to eq(0)
    end
    
    it "can accept new contact" do
      @contact.names << "New contact"
    end
    
    it "has 1 contact" do
      expect(@contact.names.count).to eq(1)
    end
  end
end
```

## Helper methods:
### Let và let!
Khi bạn phải assign một variable, thay vì sử dụng before block để tạo một instance variable như lúc nãy đã làm, hãy sử dụng let.

Khi sử dụng let, variable đó sẽ được lazy load, có nghĩa là chỉ khi nào nó thực sự được gọi, nó mới được tạo ra, và nó sẽ được cache lại cho đến khi test kết thúc.

Sử dụng let! khi bạn muốn định nghĩa một variable ngay sau khi block đó được định nghĩa.

#### Let method
**Ví dụ:**
```ruby
RSpec.describe "let method" do
  let(:foo) do
    puts "define foo variable"
    "cute dog"
  end

  it "has expected result" do
    puts "begin it block"
    expect(foo).to eq("cute dog")
  end
end
```

**Kết quả:**
```ruby
let method
begin it block
define foo variable
     has expected result
```

#### Let! method
**Ví dụ:**
```ruby
RSpec.describe "let! method" do
  let!(:foo) do
    puts "define foo variable"
    "cute dog"
  end

  it "has expected result" do
    puts "begin it block"
    expect(foo).to eq("cute dog")
  end
end
```

**Kết quả:**
```ruby
let! method
define foo variable
begin it block
     has expected result
```

**Note:** Giá trị định nghĩa bên trong `let` chỉ được cache lại thông qua nhiều lần gọi trong cùng một example, chứ không được thông qua nhiều example khác nhau. Ví dụ:

```ruby
RSpec.describe "let method" do
    let(:foo) do 
      puts "define foo variable"
      "cute dog"
    end
    
    it "memoizes the value" do
      expect(foo).to eq("cute dog")
      expect(foo).to eq("cute dog")
    end
    
    it "is not cached across examples" do
      expect(foo).to eq("cute dog")
    end
end
```

**Kết quả:**
```ruby
let method
define foo variable
     memoizes the value
define foo variable
     is not cached across examples
```

### Định nghĩa một helper method tùy ý
Chúng ta có thể định nghĩa các helper method trong các example group sử dụng def hoặc define_method của Ruby. Các helper methods đó được tiếp xúc với example trong cùng group mà chúng được định nghĩa hoặc ở những group lồng bên trong group đó.

**Ví dụ:**

```ruby
RSpec.describe "define a helper method" do
  def help
    "foo"
  end

  it "has access to methods defined in its group" do
    expect(help).to be("foo")
  end
end
```

## described_class
Nếu argument đầu tiên của example group ngoài cùng là một class, class đó sẽ được truyền tới mỗi example thông qua described_class() method.
```ruby
RSpec.describe Array do
  it "is available as described_class" do
    expect(described_class).to eq(Array)
  end
end
```

## Shared examples
Hãy đến với một ví dụ đơn giản sau đây:
```ruby
RSpec.describe "Test shared_examples" do
  context "with first test case" do
    let(:something) { "parameter1" }
    
    it "uses the given parameter" do
      expect(something).to eq("parameter1")
    end
  end
  
  context "with second test case" do
    let(:another_thing) { "parameter2" }
    
    it "uses the given parameter" do
      expect(another_thing).to eq("parameter2")
    end
  end
end
```
**=>** Codes có sự trùng lặp. Trong những trường hợp như thế này, hãy sử dụng `shared_examples` để DRY tests của bạn.

Shared examples được sử dụng để mô tả hành vi của các class hoặc module. Sau khi được khai báo, nội dung của một shared group sẽ được lưu lại. Nó sẽ chỉ được thực thi khi được include vào trong một example group nào đó. 

Một shared examples được include vào trong một examples group sử dụng: 
```ruby
    include_examples "shared example name"
    it_behaves_like "shared example name"
```

**Note:** Không nên sử dụng `include_examples` đến một shared example nhiều lần trong cùng một example group.

Đoạn test ở trên được viết lại sử dụng `shared_examples` như sau:
```ruby
RSpec.shared_examples "shared example" do |parameter|
  let(:something) { parameter }
  
  it "uses the given parameter" do
  	expect(something).to eq(parameter)
  end
end
RSpec.describe "Test shared_examples" do
  context "with first test case" do
	it_behaves_like "shared example", "parameter1"
  end
  
  context "with second test case" do
	it_behaves_like "shared example", "parameter2"
  end
end
```

## Shared Context
Shared context cũng được sử dụng như một phương pháp để DRY tests của bạn.
Cách sử dụng của nó có hơi khác một chút so với shared examples:
- Shared examples chứa một tập các examples
- Shared context thường sẽ không chứa các examples, mà chỉ chứa những đoạn codes chuẩn bị cho việc test, như `helper method`, `before block`, `let`, `subject`,..
- Sử dụng `include_context` để include một shared context vào trong một example group.

**Ví dụ sử dụng shared_context:**
```ruby
RSpec.shared_context "shared example" do |parameter|
  before { @some_var = :some_value }
  
  def shared_method
    "this is shared method"
  end
  
  let(:shared_let) { "this shared let" }
  
  subject { "this is the subject" }
end
RSpec.describe "Test shared_examples" do
    include_context "shared context"
    
    it { expect(@some_var).to eq(:some_value) }
    it { expect(shared_method).to eq("this is shared method") }
    it { expect(shared_let).to eq("this shared let") }
    it { is_expected.to eq("this is the subject") }
end
```

## Stub/Mock data
Khi viết tests, đôi khi bạn sẽ muốn sử dụng những mock object thay vì sử dụng những real objects. Lý do là nếu bạn đang sử dụng ActiveRecord và tạo ra các real object, tests của bạn có thể sẽ tương tác với database và làm chậm tests của bạn.

Thư viện rspec-mocks giúp bạn điều khiển context trong một example bằng cách cung cấp các method stubs, fakes và message expectations trên các test-doubles và các đối tượng thực.

### Test doubles

Một test double là một object được đơn giản hóa và sẽ thay thế một object khác trong hệ thống của bạn trong khi test. Tạo một test double:

```ruby
  book = double("book")
  another_book = double("book", title: "The first book")
  
  book.title  # <Double "book"> received unexpected message :title with (no args)
  another_book.title # The first book
```
**Note:** Bạn phải xác định một method cụ thể cho test double đó trước khi gọi method đó, nếu không nó sẽ raise một exception.

Nếu bạn muốn chắc chắn rằng test double của bạn sẽ giống với một object đã có trong hệ thống, `instance_double` sẽ giúp bạn làm điều đó. Nếu một object đã tồn tại, chúng sẽ ngăn chặn việc bạn thêm stubs và expectations cho những methods không tồn tại hoặc có parameters không hợp lệ.

Ví dụ ta có một class `Book`, với một trường `title`:

```ruby
  book = instance_double(Book, title: "The first book")
  # => ok
  another_book = instance_double(Book, name: "Something")
  # => Failure/Error: the Book class does not implement the instance method: name
```

### Method stubs
Một `method stub` là một câu lệnh để một object (thực hoặc test double) nhận một giá trị biết trước. `rspec-mocks` hỗ trợ 3 mẫu khai báo method stubs:

```ruby
allow(book).to receive(:title) { "The RSpec book" }

allow(book).to receive(:title).and_return("The RSpec book")

allow(book).to receive_messages(
   title: "The RSpec book",
   description: "Write tests use method stubs"
)
```
 
Bạn cũng có thể sử dụng shortcut sau đây, tạo một test double sau đó khai báo method stub trong cùng một câu lệnh:
```ruby
book = double("book", :title => "The RSpec book")

```

### Stub một chuỗi methods

Bạn có thể sử dụng `receive_message_chain` thay thế receive để stub một chuỗi các methods như sau:

```ruby
  allow(book).to receive_message_chain("title.length") { 30 }
  
  allow(book).to receive_message_chain(:title, :length => 30)
  
  allow(book).to receive_message_chain(:title, :length) { 30 }

book.title.length # => 30
```

## Factory Bot

Factory Bot là một thư viện giúp chúng ta tạo ra những dữ liệu test. Khi viết unit tests trong ứng dụng Rails, hãy luôn nhớ sử dụng Factory Bot để tạo ra các object thay vì sử dụng Model.create().

Sử dụng factories giúp chúng ta giảm được sự rườm rà khi tạo những dữ liệu mới, tạo nhiều object, association một cách nhanh chóng, đơn giản.

**Ví dụ:**

```ruby
FactoryBot.define do
  factory :book do
     title "my first book title"
     description "my first book description"
  end
end

RSpec.describe Book, type: :model do
    let(:book) { FactoryBot.create :book }

    context "when create the first book" do
      it { expect(book.title).to eq("my first book title") }
      
      it { expect(book.description).to eq("my first book description") }
    end
end
```

Tìm hiểu chi tiết hơn về Factory Bot tại: [Factory Bot Rails](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md)

<br>
<br>

**Mọi công cụ đã được chuẩn bị đầy đủ cho việc viết unit tests trong Rails. Let's go.**

## Viết unit test trong rails

### Generators
Các files specs thường được tạo ra cùng với các thành phần khác trong ứng dụng Rails. Ví dụ, cmd `rails generate model` sẽ vừa tạo ra một file model, vừa tạo ra một file spec cho model đó.

Ngoài ra, RSpec generator cũng có thể chạy độc lập, sử dụng cmd:

```ruby
   rails generate rspec:model User
```

sẽ tạo ra một file spec trong `spec/models/user_spec.rb`

Chúng ta sử dụng pattern tương tự với các specs khác: controller, view, helper, mailer,...

### Model specs
Để hiểu rõ hơn về cách tạo các model specs, tôi sẽ hướng dẫn các bạn bằng một ví dụ cụ thể sau đây.

Đầu tiên, hãy tạo 2 model Author và Book với quan hệ `"1 Author has many books, and 1 book belongs to 1 author"`.

```ruby
rails generate model Author name:string age:integer

rails generate model Book title:string description:text author:references
```

class `Author`:
```ruby
class Author < ApplicationRecord
  has_many :books

  validates_presence_of :name
end
```

Factories cho `Author`:

```ruby
FactoryBot.define do
  factory :author do
    name "my first author"
    age 30
  end
end
```

class `Book`:
```ruby
class Book < ApplicationRecord
    belongs_to :author

    validates_presence_of :title
    validates :description, length: { maximum: 500 }
end
```

Factories cho class `Book`:
```ruby
FactoryBot.define do
  factory :book do
    title "my first book title"
    description "my first book description"
    association :author
  end
end
```

Ở đây ta sẽ viết test cho các `associations` và `validations` trong 2 models đó.

Đầu tiên là test associations cho `Book`. Sử dụng method `reflect_on_association` để kiểm tra thông tin về association của `Book` với `Author`.

```ruby
RSpec.describe Book, type: :model do
  describe "Associations" do
    it "belongs to author" do
      association = described_class.reflect_on_association(:author)
      expect(association.macro).to eq :belongs_to
    end
  end
end
```

Tương tự như vậy khi test associations trong `Author` model:

```ruby
RSpec.describe Author, type: :model do
  describe "Associations" do
    it "has many book" do
      association = described_class.reflect_on_association(:books)
      expect(association.macro).to eq :has_many
    end
  end
end
```

Tiếp theo, chúng ta sẽ test validations trong `Book` model:

```ruby
RSpec.describe Book, type: :model do
  describe "Validations" do
    subject { FactoryBot.create :book }
    
    it "is valid with valid attributes" do
        is_expected.to be_valid
    end
    
    it "is not valid without a title" do
	    subject.title = nil
        is_expected.to_not be_valid
    end
    
    it "is not valid with too long description" do
        subject.description = "a" * 501
        is_expected.to_not be_valid
    end
  end
end
```


Chúng ta viết tương tự như vậy đối với `Author` model.

**Note:** Ngoài ra, chúng ta có thể dễ dàng viết tests cho các associations và validations sử dụng gem [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers).

Những tests trên có thể viết lại sử dụng gem `shoulda-matchers` như sau:

```ruby
RSpec.describe Book, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:author)
  end
  
  describe "Validations" do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:description).is_at_most(500) }           
  end
end

RSpec.describe Author, type: :model do
  describe "Associations" do
    it { is_expected.to have_many(:books)
  end
  
  describe "Validations" do
    it { is_expected.to validate_presence_of(:name) }
  end
end
```

**Note**: Đối với một `ActiveRecord` model, ngoài associations và validations ra, chúng ta thường sẽ test thêm các `callbacks`, `scopes`, `public class methods` và `public  instance methods`.


### Controller specs

Một controller spec cho phép bạn giả lập một http request trong mỗi example, sau đó xác định những kết quả mong đợi như:
- rendered templates
- redirects
- instance variables được assign trong controller để được share với view
- cookies được gửi lại cùng với response

Để xác định kết quả mong đợi, bạn có thể sử dụng các matchers sau:
```ruby
have_http_status: expect(response).to have_http_status(200)

render_template: expect(response).to render_template(:show)

redirect_to: expect(response).to redirect_to(location)

be_a_new: expect(assigns(:book)).to be_a_new(Book)
```

Ví dụ ta có một `AuthorsController`, với action `index` như sau:
```ruby
class AuthorsController < ApplicationController
  def index
    @authors = Author.all
  end
end
```

Với controller như thế kia, chúng ta sẽ viết test như sau:

```ruby
RSpec.describe AuthorsController, type: :controller do
  describe "GET #index" do
    let!(:authors) { FactoryBot.create_list :author, 2 }
    
  	before { get :index }

  	it "returns a success response" do
	  expect(response).to be_success
  	end
    
  	it "assigns @authors" do
	  expect(assigns(:authors)).to eq(authors)
  	end
    
  	it "renders the index template" do
	  expect(response).to render_template(:index)
  	end
  end
end
```

### Feature spec
Feature spec sẽ test ứng dụng web của bạn bằng cách mô phỏng một người dùng thực sẽ tương tác với trang web của bạn như thế nào.

Feature spec yêu cầu sử dụng gem [Capybara](https://github.com/teamcapybara/capybara), version được khuyến nghị ở đây là 2.4.0 hoặc cao hơn. `Capybara` được thiết kế để mô phỏng các request của browser với HTTP. Nó chủ yếu sẽ gửi nội dung HTML.

Ví dụ tạo một feature spec cho việc tạo mới một Author:
```ruby
RSpec.feature "Author management", :type => :feature do
  scenario "Admin creates a new author" do
    visit "/authors/new"

    fill_in "Name", with: "First author" # Điền tên author vào textfiled Name
    fill_in "Age", with: 30 # Điền tuổi Author vào textfield Age
    click_button "Create Author" # Click vào button 'Create Author'

    expect(page).to have_text("Author was successfully created.")
  end
end
```

### Helper spec
Helper spec dùng để test các helper methods viết trong `ApplicationHelper` module và các helper module khác.

Cùng đến với một ví dụ sau, ta có một Helper method là `AuthorsHelper`:
```ruby
module AuthorsHelper
  def page_title
    @title || nil
  end
end
```

Đoạn codes trên sẽ được viết test như sau:

```ruby
RSpec.describe AuthorsHelper, :type => :helper do
   describe "#page_title" do
      let(:page_title) { "Authors Management" }
      
      it "get expected title" do
        assign(:title, page_title) # Set giá trị cho instance variable là title với page_title value 
        expect(helper.page_title).to eq(page_title)
      end	
   end
end
```

## Kết luận
Những kiến thức mình đã giới thiệu ở trên đều rất cơ bản, tuy nhiên sẽ rất cần thiết nếu như bạn muốn viết test với `RSpec` trong các ứng dụng Rails. Hi vọng sẽ giúp ích cho bạn đọc.

## Tài liệu tham khảo
1. https://relishapp.com/rspec/
2. http://www.betterspecs.org
3. https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md
4. https://github.com/thoughtbot/shoulda-matchers