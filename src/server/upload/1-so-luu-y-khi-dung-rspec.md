Chào các bạn, chắc hẳn những ai đã và đang làm việc với ngôn ngữ `ruby` cũng như `ruby on rails` cũng đều đã sử dụng `rspec` - 1 công cụ dùng để test những đoạn code chúng ta viết ra xem liệu chúng có chạy đúng theo spec và chức năng hay không. Hôm nay mình xin nêu ra 1 số tips nho nhỏ khi sử dụng `rspec` để chúng ta có được những đoạn test dễ đọc dễ hiểu, mong các bạn theo dõi.

# 1. Mô tả các kỳ vọng
Khi viết test chúng ta nên tưởng tượng ra model mình đang viết test nên trông ra sao, và các hành vi của nó như thế nào. Ví dụ chúng ta có model `User` trông như thế này:
```ruby
class User 
  validate :first_name, presence: true
  validate :last_name, presence: true
  validate :email_address, presence: true, uniqueness: true
end
```
Đoạn test của chúng ta sẽ có cấu trúc như sau:
```ruby
describe User do 
  it "is valid with a first name, last name, email and password"
  it "is invalid without a fist name"
  it "is invalid without a last name"
  it "is invalid without an email address"
  it "is invalid with a duplicate email address"
end
```
# 2. Mỗi test case bắt đầu bằng `it` chỉ nên kì vọng 1 kết quả duy nhất
Quy tắc này sẽ giúp chúng ta tìm ra lỗi nhanh hơn, đến thẳng chỗ đọan test bị fail và cũng như làm cho đoạn test sáng sủa dễ đọc hơn. Sau đây là ví dụ không tốt về việc không tuân theo quy tắc này:
```ruby
BAD
it "creates a resource" do
  expect(response).to respond_with_content_type :json
  expect(response).to assign_to :resource
end
```
Chúng ta sẽ sửa lại như sau:
```ruby
GOOD
it {is_expected.to respond_with_content_type :json}
it {is_expected.to assign_to :resource}
```
# 3. Viết mô tả rõ ràng cho từng test case
Đoạn mô tả sau `it`  là tùy chọn chứ không bắt buộc, chúng ta có thể viết hoặc không, thậm chí không viết gì cả nhưng mình khuyên các bạn nên viết nó vì nếu không, các đoạn test của chúng ta nhìn sẽ rất khô khan, máy móc và thậm chí là rất khó đọc, sau này maintain code thì chỉ có nước vỡ mồm :). Đừng viết mô tả quá dài tràn lan đại hải, hãy viết ngắn gọn súc tích để khi nhìn lại chúng ta sẽ nhận ra ngay đoạn test đó để test cái gì. Ví dụ như:
```ruby
BAD 
it "has 422 status code if an unexpected params will be added" do
```
Đoạn mô tả trên khá dài dòng và rối rắm, hãy cùng refactor lại chút:
```ruby
GOOD
context "when not valid" do
  it {is_expected.to respond_with 422}
end
```
Ngon rồi :). Ngoài ra các bạn cũng có thể dùng `ruby documentation convention` như `.` để mô tả `class method` và `#` để mô tả `instance method` 
```ruby
BAD
describe "the authenticate method for User" do
describe "if the user is an admin" do
```
```ruby
GOOD 
describe ".authenticate" do
describe "#admin?" do
```
# 4. Đùa đấy làm gì có phần 4 =)), đến đây là hết bài rồi, anw dù sao thì cũng cảm ơn các bạn đã đọc hết bài của mình, chúc các bạn sẽ tạo ra những test case dễ đọc và tin cậy, bye!