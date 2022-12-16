## Viết RSpec cho model trong Rails
Sau khi đã cài đặt đầy đủ các công cụ hỗ trợ cho viết rspec, chúng ta sẽ bắt đầu viết test cho models - phần core của một ứng dụng.

Trong bài đăng này, chúng ta sẽ hoàn thành các tasks sau:

* Đầu tiên, tạo một model spec cho một model đã có, ở đây là model Contact.
* Tiếp theo, đơn giản hóa quá trình tạo dữ liệu test với Factory.
* Cuối cùng, viết test cho validation của model, class và instance methods và cách tổ chức spec.

### Cấu tạo của một model spec

Một model spec cần test cho các phần sau:

* Factory sẽ cần tạo ra những object hợp lệ.
* Dữ liệu fail validate sẽ không hợp lệ.
* Class và instance methods sẽ thực hiện như mong đợi.

Chúng ta sẽ tìm hiểu về cấu trúc cơ bản của một model spec. Ví dụ, hãy xem các requirements của model Contact:
```ruby
describe Contact
  it "has a valid factory"
  it "is invalid without a firstname"
  it "is invalid without a lastname"
  it "returns a contact's full name as a string"
```
Có 3 điều cần lưu ý:

* Mỗi example (bắt đầu với *it*) chỉ mong đợi một kết quả. 
* Mỗi example phải rõ ràng.
* Phần mô tả của example bắt đầu bằng một động từ

### Tạo một model spec
Trong folder spec, tạo một folder models. Trong thư mục này, tạo file `contact_spec.rb` như sau:
```ruby
# spec/models/contact.rb
require "spec_helper"

describe Contact do
  it "has a valid factory"
  it "is invalid without a firstname"
  it "is invalid without a lastname"
  it "returns a contact's full name as a string"
end
```
Chạy rspec bằng dòng lệnh sau:
```
$ rspec spec/models/contact_spec.rb
```
Kết quả trả về sẽ là: 4 examples, 0 failures, 4 pending
### Tạo dữ liệu test với Factory
Trong thư mục spec, tạo folder factories, tại đây, tạo file `contact.rb` như sau:
```ruby
# spec/factories/contacts.rb
require "faker"

FactoryGirl.define do
  factory :contact do |f|
    f.firstname {Faker::Name.first_name}
    f.lastname {Faker::Name.last_name}
  end
end
```
Quay lại với `contact_spec.rb`, example đầu tiên của chúng ta là `it "has a valid factory"`. Chúng ta sẽ viết spec đầu tiên với factory vừa tạo:
```ruby
it "has a valid factory" do
  Factory.create(:contact).should be_valid
end
```
Dòng spec này sử dụng `be_valid` của RSpec để kiểm tra xác thực factory trả về một bản ghi hợp lệ.
Chạy RSpec một lần nữa sẽ thấy 1 example pass và 3 example pending.

### Testing validations
Validate cho firstname:
```ruby
# spec/models/contact_spec.rb
it "is invalid without a firstname" do
  Factory.build(:contact, firstname: nil).should_not be_valid
end
```
Ở đây ta dùng `build` mà không dùng `create` vì `create` sẽ tạo mới object và lưu vào database, còn `build` chỉ tạo mới mà không lưu vào database, nếu dùng `create` ở đây thì sẽ bị break trước khi chạy được test.

Chạy lại RSpec, ta sẽ có 2 spec pass và 2 spec pending. Tương tự viết spec cho validate lastname:
```ruby
# spec/models/contact_spec.rb
it "is invalid without a lastname" do
  Factory.build(:contact, lastname: nil).should_not be_valid
end
```
Mở rộng hơn, ta sẽ viết spec cho validate presence và uniqueness.
Trong model Phone:
```ruby
# app/models/phone.rb
validates :phone, uniqueness: {scope: :contact_id}
```
Viết spec cho validate trên:
```ruby
# spec/models/phone_spec.rb
it "does not allow duplicate phone numbers per contact" do
  contact = Factory(:contact)
  Factory.create(:phone, contact: contact, phone_type: "home", number: "785-555-1234")
  Factory.build(:phone, contact: contact, phone_type: "mobile", number: "785-555-1234").should_not be_valid
end
```
### Testing instance methods
Chúng ta có 1 instance method name trong model Contact:
```ruby
# app/models/contact.rb
  
def name
  [firstname, lastname].join " "
end
```
Viết spec cho method trên:
```ruby
# spec/models/contact_spec.rb
it "returns a contact's full name as a string" do
  contact = Factory(:contact, firstname: "John", lastname: "Doe")
  contact.name.should == "John Doe"
end
```
### Testing class methods and scopes

Ta có một class method trả về những contact có name bắt đầu bằng một kí tự truyền vào:
```ruby
# app/models/contact.rb
def self.by_letter(letter)
  where("lastname LIKE ?", "#{letter}%").order(:lastname)
end
```
Để test cho method này, thêm vào spec contact đoạn code sau:
```ruby
# spec/models/contact_spec.rb
require "spec_helper"

describe Contact do

  # validation examples ...

  it "returns a sorted array of results that match" do
    smith = Factory(:contact, lastname: "Smith")
    jones = Factory(:contact, lastname: "Jones")
    johnson = Factory(:contact, lastname: "Johnson")
  
    Contact.by_letter("J").should == [johnson, jones]
  end
end
```
### Tổ chức spec với describe và context
Chúng ta đã test cho trường hợp tìm theo name và có kết quả trả về, còn trường hợp không có kết quả trả về thì sao?

Chúng ta có thể viết test cho những trường hợp này như sau:
```ruby
# spec/models/contact_spec.rb
require "spec_helper"

describe Contact do

  # validation examples ...
  
  it "returns a sorted array of results that match" do
    smith = Factory(:contact, lastname: "Smith")
    jones = Factory(:contact, lastname: "Jones")
    johnson = Factory(:contact, lastname: "Johnson")
  
    Contact.by_letter("J").should == [johnson, jones]
  end

  it "returns a sorted array of results that match" do
    smith = Factory(:contact, lastname: "Smith")
    jones = Factory(:contact, lastname: "Jones")
    johnson = Factory(:contact, lastname: "Johnson")

    Contact.by_letter("J").should_not include smith
  end
end
```
Có một vấn đề ở đây là ta đều tạo ra 3 object giống nhau trong mỗi example. Chúng ta nên áp dụng nguyên tắc DRY cho việc viết test giống như khi viết code trong app của bạn. Hãy sử dụng một vài thủ thuật trong RSpec để dọn dẹp nó.
Đầu tiên ta sẽ tạo những `describe` trong `describe Contact` để gom những phần test có cùng chức năng lại với nhau.
```ruby
# spec/models/contact_spec.rb
require "spec_helper"

describe Contact do

  # validation examples ...
  
  describe "filter last name by letter" do
    # filtering examples ...
  end
end
```
Chia nhỏ describe bằng 2 `context`, một context cho trường hợp đúng và một context cho trường hợp sai:
```ruby
# spec/models/contact_spec.rb
require "spec_helper"

describe Contact do

  # validation examples ...

  describe "filter last name by letter" do
    context "matching letters" do
      # matching examples ...
    end
    
    context "non-matching letters" do
      # non-matching examples ...
    end
  end
end
```
Sử dụng before và after để thực hiện một đoạn codes nào đó trước/sau khi chạy một example.
Ở đây ta dùng before để tạo 3 object chung cho cả 2 example:
```ruby
before :each do
  @smith = Factory(:contact, lastname: "Smith")
  @jones = Factory(:contact, lastname: "Jones")
  @johnson = Factory(:contact, lastname: "Johnson")
end
```
Như vậy file spec cho model contact đầy đủ của chúng ta là:
```ruby
require "spec_helper"

describe Contact do
  it "has a valid factory" do
    Factory(:contact).should be_valid
  end

  it "is invalid without a firstname" do
    Factory.build(:contact, firstname: nil).should_not be_valid
  end

  it "is invalid without a lastname" do
    Factory.build(:contact, lastname: nil).should_not be_valid
  end

  it "returns a contact's full name as a string" do
    Factory(:contact, firstname: "John", lastname: "Doe").name.should == "John Doe"
  end

  describe "filter last name by letter" do      
    before :each do
      @smith = Factory(:contact, lastname: "Smith")
      @jones = Factory(:contact, lastname: "Jones")
      @johnson = Factory(:contact, lastname: "Johnson")
    end

    context "matching letters" do
      it "returns a sorted array of results that match" do
        Contact.by_letter("J").should == [@johnson, @jones]
      end
    end

    context "non-matching letters" do
      it "does not return contacts that don't start with the provided letter" do
        Contact.by_letter("J").should_not include @smith
      end
    end
  end
end
```
Khi chạy RSpec sẽ thu được kết quả là:
```
6 examples, 0 failures
```


Nguồn tham khảo: *https://everydayrails.com/2012/03/19/testing-series-rspec-models-factory-girl.html*