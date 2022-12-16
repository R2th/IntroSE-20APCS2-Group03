![](https://images.viblo.asia/b4530311-365c-4b75-abf0-490b5e8f560d.png)

Developer không chỉ code mà cần phải viết test đi kèm theo với Code

Trong ngôn ngữ Ruby, **RSpec** là một trong những testing framework được sử dụng phổ biến nhất. Việc viết test khi coding giúp ích rất nhiều cho developer trong việc đảm bảo chất lượng của các đoạn code được test, giúp điều tra bug xảy ra dễ dàng hơn.

Bài viết này chúng ta cùng tìm hiểu một số tip nên được sử dụng khi viết rspec, giúp các đoạn code testing trở nên hiệu quả và cũng dễ dàng trong việc đọc, maintain

:male_detective:

----

# Structure code to right place
Tất cả các test case đều bao gồm 3 block:
* **Setup**: Phần code chuẩn bị trước khi chạy test, như khởi tạo các biến , action(`let`, `let!`), chạy các function trước khi test(`before`)
* **Assert**: Phần code chứa các test case được khai báo(`it`)
* **Teardown**: Phần code sau khi đã chạy qua các test case(`after`), thường có nhiệm vụ dọn dẹp, khôi phục các trạng thái được `setup` ban đầu

Khi viết test ta nên cấu trúc, phân chia code theo đúng các block ở trên: 

```ruby
# BAD

describe "#upload" do
    it "should upload success" do
         user.uploader.open
         expect { user.upload }.to change { user.images.size }.by(1)
         user.uploader.close
    end
end

# GOOD

describe "#upload" do
    # Setup
    let(:user) { create :user, :with_images }
    let(:action) { user.upload }
  
    before { user.uploader.open }
    
    # Teardown
    after { user.uploader.close }
   
   # Assert
    it "should upload success" do
         expect { action }.to change { user.images.size }.by(1)
    end
end
```

-----

# Use instance_double instead of double
Trong quá trình viết test, có thể ta muốn `mock` instances của một Class nào đó, khi đó sử dụng `instance_double` sẽ an toàn hơn sử dụng `double`:

```ruby
class User
    def show_info
       #  ...
    end
end

# use double
sherlock = double("User")
allow(sherlock).to receive(:show_info) # => OK
allow(sherlock).to receive(:show_info).with(:name) # => Fail, nhưng không raise exception
allow(sherlock).to receive(:some_method) # Fail, cũng không raise exception

# use instance_double
sherlock = instance_double("User")
allow(sherlock).to receive(:show_info) # => OK
allow(sherlock).to receive(:show_info).with(:name) # => Fail, raise wrong number of argument
allow(sherlock).to receive(:some_method) # Fail, raise method not implement
```

----

# DESCRIBE for testing target, CONTEXT for scenarios
Dùng **Describe** để chỉ định đối tượng cần test, **Context** để mô tả các test case có thể xảy ra, giúp việc code trở nên dễ track hơn, hơn nữa, các `context` cũng được phân chia, phân biệt với các `context` khác

```ruby
describe "#authenticate" do
    let!(:user) { create :user, email: "test@example.com", password: "123456" }
  
    context "when email and password not match" do
        let(:param) { { email: "test@exaple.com", password: "xxxxxx" } }
        
        it "should return failure" do
            # ...
        end
    end
    
    context "when email and password match" do
        let(:param) { { email: "test@exaple.com", password: "123456" } }
        
        it "should return success" do
            # ...
        end
    end
end
```

----

# Understand how transactions work in RSpec
`Transaction` mặc định được tạo vào gắn mỗi một `example` trong `Rspec`, cho phép `database` `rolled backed` về trạng thái ban đầu, sử dụng cho những `example` sau đó.

Các record được tạo trong `before(:context)` hay `before(:all)` sẽ không bị `rolled back`:
```ruby
context "context 1" do
  before(:context) do
    create(:user) # WON"T BE ROLLED-BACK
  end

  before do
    create(:user) # will be rolled-back
  end

  # ...
end

context "context 2" do
  before(:context) do
    create(:user) # WON"T BE ROLLED-BACK
  end

  # ...
end

# BY NOW, THERE ARE 2 USER RECORDS COMMITED TO DATABASE
```

----

# Use bulk method if possible
```ruby
# BAD

it "should update user success" do
    expect(user.name).eq "Sherlock"
    expect(user.email).eq "test@example.com"
    expect(user.sex).eq "Male"
    expect(user.address).eq "221 Baker street"
    expect(user.phone).eq "12345678"
end

# GOOD

it "should update user success" do
    expect(user).to have_attributes(
        name: "Sherlock",
        email: "test@example.com",
        sex: "Male",
        address: "221 Baker street",
        phone: "12345678"
    )
end
```

VIết như trên tránh việc lặp những đoạn code giống nhau (**DRY**), cũng như chỉ ra tất cả các `assertion` đều dùng cho một `object`

-----

# Use configs for patterned test case
Cũng là một các viết **DRY**, code trông gọn hơn và giúp cho người đọc dễ follow hơn:

```ruby
# BAD
#
describe ".extract_extension" do
  subject { described_class.extract_extension(filename) }
  
  context "when the filename is empty" do
    let(:filename) { "" }
    it { is_expected.to eq "" }
  end

  context "when the filename is video123.mp4" do
    let(:filename) { "video123.mp4" }
    it { is_expected.to eq "mp4" }
  end

  context "when the filename is video.edited.mp4" do
    let(:filename) { "video.edited.mp4" }
    it { is_expected.to eq "mp4" }
  end

  context "when the filename is video-edited" do
    let(:filename) { "video-edited" }
    it { is_expected.to eq "" }
  end

  context "when the filename is .mp4" do
    let(:filename) { ".mp4" }
    it { is_expected.to eq "" }
  end
end


# GOOD
#
describe ".extract_extension" do
  subject { described_class.extract_extension(filename) }

  test_cases = [
    "" => "",
    "video123.mp4" => "mp4"
    "video.edited.mp4" => "mp4"
    "video-edited" => ""
    ".mp4" => ""
  ]

  test_cases.each do |test_filename, extension|
    context "when filename = #{test_filename}" do
      let(:filename) { test_filename }
      it { is_expected.to eq extension }
    end
  end
end
```
-----

Trên đây là một số tip mình tìm hiểu được trong quá trình viết `Rspec`, cảm ơn mọi người đã đọc bài viết :christmas_tree: