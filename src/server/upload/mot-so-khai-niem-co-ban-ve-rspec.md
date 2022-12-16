## 1.Giới thiệu
Song song với việc code thì một kỹ thuật cơ bản mà developer cần phải biết đó là Unit test. Trong bài viết này mình sẽ giới thiệu một số thuật ngữ cơ bản trong Unit test cho RoR, đó là RSpec

RSpec là một công cụ test dành cho RoR, được sử dụng phổ biến trong các ứng dụng viết bằng RoR. Mặc dù nó rất mạnh và có DSL (domain-specific language) mạnh, nó lại có thể được sử dụng rất đơn giản và bạn có thể dễ dàng làm quen với nó. 

## 2. Các khái niệm trong Rspec:
### 2.1 Describe
* `describe` dùng để nhóm các test case theo `class`, `module`, `method` hoặc theo `action của controller`.
* Cần có mô tả cho trường hợp không là method.
* Trong trường hợp đối với instance method thì gắn thêm "#" ví dụ "#method".
* Trong trường hợp đối với class method thì gắn thêm "." ví dụ ".method".

ex:
``` RUBY
class Person
    def show_gender person
      # do something
    end

    def self.age
      # do something
    end
end

# the spec
describe Person do
    describe "#show_gender" do
      #do something
    end

    describe ".age" do
      #do something
    end
end
```

### 2.2 Context
* `context` dùng để nhóm các điều kiện của example.
* Phần mô tả của context thường bắt đầu bằng `when` hoăc `with`
ex:
``` RUBY
class Person
  def show_gender person
    if person.gender == :boy
      # do some thing
    else
      # do something
    end
  end
end

# the spec
describe Person do
  describe "#show_gender" do
    context "when person is boy" do
      #do something
    end
     
    context "when person isn't boy" do
      #do something
    end
  end
end
```
### 2.3 It
 * `it` được sử dụng để định nghĩa một "Ví dụ" hay nói cách khác là dùng để định nghĩa 1 test case.
* Chúng ta có thể mô tả cho it để test case được rõ ràng

* Ví dụ:
``` RUBY
it "The show_gender method should return the gender of person" do
   #do something
end
```

Note: 
* Theo convention của công ty. thì 1 it chỉ tương ứng với 1 test case (1 expect). 
* Tuy nhiên một số trường hợp cùng 1 dữ liệu đầu vào, cùng hành động, chỉ khác nhau về việc so sánh đầu ra thì việc lặp lại nhiều `it` dẫn đến performance khi chạy rspec bị giảm. vì mỗi lần chạy `it` là một lần chạy `let` để tạo data.

### 2.4 Expect
* `expect` được sử dụng để xác định "Kỳ vọng" của 1 case trong RSpec. 
* Đây là một bước xác minh việc kết quả đầu ra có đúng như mong đợi hay không.
Ví dụ: 
``` RUBY
#class
class Person
  def show_gender person
    if person.gender == :boy
      "boy"
    else
      "girl"
    end
  end
end

#The rspec
let!(:person) {FactoryGirl.create :persion, gender: :boy}

it {expect(person.show_gender person).to eq "boy"}
```

### 2.5 Let và let!
* Dùng `let` khi tạo data trong example, `let` là `lazy evaluation`.
* `Trái ngược với let`, `let!` dùng để ép buộc tạo data trước khi thực hiện 1 method nào đó.
ex:
``` RUBY
# Giả sử mình có 2 model Person và Student đồng thời có factory của chúng
let(:person) {FactoryGirl.create :person}
let!(:student) {FactoryGirl.create :student}
#binding.pry trong it

it {binding.pry #do some thing}
#ở đây nếu mình kiểm tra
Person.count
> 0

Student.count
> 1
```
* `Không nên` sử dụng biến instance để thay cho let.
### 2.6 Stub, mock dữ liệu test
Thông thường minh hay sử dụng `allow()` và `allow_any_instance_of()` để mock dữ liệu test

* Ví dụ mock dữ liệu test cho class method age trả về  của class Person
``` RUBY
allow(Person).to receive(age).and_return 10
```

* Ví dụ mock dữ liệu test cho instance method show_gender của class Person
``` RUBY
allow_any_instance_of(Person).to receive(age).and_return "boy"
```

Ngoài ra bạn có thể sử dụng "and_raise" để mock cho trường hợp raise 1 exeption.
## Kết luận
* Trên đây là một số giới thiệu của mình về những khái niệm thường gặp khi viết Rspec.
* Một số đánh giá mang tính chủ quan được mình rút ra trong quá trình làm việc vs Rspec, nếu có gì sai sót mong mọi người góp ý nhiệt tình.
* Thank you!