**Mở đầu**

Đã có người từng nói với tôi rằng, "Bước vào một dự án mới, chưa cần tìm đọc nhưng file doc của dự án, nhưng chú giải, chú thích, ghi ghép...Mà chỉ cần xem thư mục Model của dự án là chúng ta đã hiểu được hệ thống đó hoạt động như thế nào rồi". Đương nhiên, tôi không hề phủ nhận tầm quan trọng của các file document, mà chỉ nhấn mạnh tầm quan trong của Model-Trái tim của một project.


-----



Một hệ thống chạy trơn chu cần có một Model hoàn hảo. Và việc test model chính là việc kiểm tra, đảm bảo sự hoàn hảo đó.

Vậy, chúng ta phải kiểm tra những gì? Câu trả lời là: Kiểm tra mọi thử trong model, đảm bảo rằng chúng hoạt động như mong muốn.

Trong một model, thường bao gồm những phần sau:

1. Danh sách các accsocication(1 loạt những has_many, belongs_to, has_one...)
2. Các validate
3. Các scope
4. các instance method
5. Các class method

Đâu tiên, để dễ dàng cho vấn đề tìm hiểu của chúng ta. hãy bắt đầu tạo ra một model quen thuộc mà có lẽ tất cả chúng ta đều từng gặp qua: **User**

Hãy chắc chắn rằng chúng ta đã có đầy đủ các gem cần thiết trước khi bắt đầu: [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers),  [rpsec](https://github.com/rspec/rspec-rails), [factory-bot](https://github.com/thoughtbot/factory_bot)

Giả sủ chúng ta đã có một file app/models/user.rb như sau:
```
#db
# name: String
# email: String
# sex: String
# age: Integer
Class User < ApplicationRecord
    has_many: books, depndent: :destroy
    has_many: actions, through: :action_users
    belongs_to: team, optional: true
    
    validates :email, presence: true
    validates :sex, inclusion: { in: ['female', 'male'] } 
    
    scope: allMale, ->{ where sex: 'male' }
    
    def isAdult
        self.age > 18
    end
    
    class << self
        def countPeople(type)
            return unless ["male", female"].include type
            self.all.try("#{type}").count
        end
    end
end
```

Run in termial:
```
rails g rspec:model user
```

Rspec sẽ create 1 file theo đường dẫn:
```
Running	via	Spring preloader in process 32008
create spec/models/user_spec.rb
```

Chúng ta  đã có một file Rspec sơ khai, đuơng  nhiên là bây giờ là chúng ta sẽ lấp đầy nó bằng rất nhiều những bài test =)).

**Theo lý thuyết, chúng ta cần phải viết test trước khi code, nhưng trong bài này, chúng ta tập chung vào việc học cách viết test nên chúng ta sẽ làm ngược lại: test sau khi có code.**
### Test các accsociation
Việc test các accsociation này khá đơn giản, chúng ta chỉ cần viết những kì vọng rằng các accsociation đó tồn tại:

Hãy tạo ra một describe cho việc test nhóm này và viết 3 kì vọng cho 3 accsociation trong ví dụ:

```
describe "#accsociation" do
    it{expect have_many(:books)}
    it{expect have_many(:actions).through(:action_users)}
    it{expect belong_to(:team)}
end
```
### Test các attribute của model

```
 describe "column_specifications" do
      it{expect have_db_column(:name).of_type(:string)}
      it{expect have_db_column(:email).of_type(:string)}
      it{expect have_db_column(:sex).of_type(:string)}
      it{expect have_db_column(:age).of_type(:integer)}
 end
```
### Test các scope của model

Chúng ta cần đảm bảo rằng, scope hoạt đôngh như mong muốn. Có nghĩa là với input vào và ta sẽ kì vòng output như dự kiến:

Như trên ví dụ, chúng ta hiểu rằng scope :allMale là để filter ra tất cả Male trong User. Chúng ta có thể kiếm tra output của scope bằng cách kì vọng số count, kỳ vọng chính xác kết quả trả về....
Dưới đây tôi sẽ ví dụ về cả 2 cách kì vọng này

```
describe "#scope allMale" do
        let(:user1) { create(:user, name: "Nguyen Van A", age: 17, sex: "male") }
        let(:user2) { create(:user, name: "Nguyen Van B", age: 21, sex: "male") }
        let(:user3) { create(:user, name: "Nguyen Thi C", age: 21, sex: "female") }
        
        it "count of males is 2" do
            expect(User.allMale.count).to eq 2
        end
        
        it "males include user1 and user2" do
            expect(User.allMale).to include user1
            expect(User.allMale).to include user2
        end
        
        it "males is not include user3" do
            expect(User.allMale).not_to include user3
        end
end
```

### Test các method của model
Tương tự như scope, chúng ta cũng kiếm tra output của method với từng input ban đầu:
```
describe "#isAdult" do
        let(:user1) { create(:user, name: "Nguyen Van A", age: 17, sex: "male") }
        let(:user2) { create(:user, name: "Nguyen Van B", age: 21, sex: "male") }
        let(:user3) { create(:user, name: "Nguyen Thi C", age: 21, sex: "female") }
        
        it "user1 is not Adult" do
            expect(user1.isAdult).to eq false
        end
        
       it "user1 is Adult" do
            expect(user1.isAdult).to eq true
       end
end
```

```
describe "#countPeople" do
        let(:user1) { create(:user, name: "Nguyen Van A", age: 17, sex: "male") }
        let(:user2) { create(:user, name: "Nguyen Van B", age: 21, sex: "male") }
        let(:user3) { create(:user, name: "Nguyen Thi C", age: 21, sex: "female") }
        context "type is invalid" do
            it "return nil" do
                expect(User.countPeople("abc")).to eq nil
            end
       end
       
       context "type is valid" do
           it "return count is correct"
               expect(User.countPeople("male").to eq 2)
           end
       end
end
```


Chúng ta thấy việc tạo dữ liệu test liên tục lặp lại trong từng phần, ta có thể gộp lại và đặt ở ngoài của các describe. Sau đây là file rspec cho các model User:

```
RSpec.describe User, type: :model do
    let(:user1) { create(:user, name: "Nguyen Van A", age: 17, sex: "male") }
    let(:user2) { create(:user, name: "Nguyen Van B", age: 21, sex: "male") }
    let(:user3) { create(:user, name: "Nguyen Thi C", age: 21, sex: "female") }
 
    describe "#accsociation" do
        it{expect have_many(:books)}
        it{expect have_many(:actions).through(:action_users)}
        it{expect belong_to(:team)}
    end
 
    describe "column_specifications" do
        it{expect have_db_column(:name).of_type(:string)}
        it{expect have_db_column(:email).of_type(:string)}
        it{expect have_db_column(:sex).of_type(:string)}
        it{expect have_db_column(:age).of_type(:integer)}
    end
    
    describe "#scope allMale" do
        it "count of males is 2" do
            expect(User.allMale.count).to eq 2
        end
        
        it "males include user1 and user2" do
            expect(User.allMale).to include user1
            expect(User.allMale).to include user2
        end
        
        it "males is not include user3" do
            expect(User.allMale).not_to include user3
        end
    end
    
    describe "#isAdult" do
        it "user1 is not Adult" do
            expect(user1.isAdult).to eq false
        end
        
       it "user1 is Adult" do
            expect(user1.isAdult).to eq true
       end
    end
    
    describe "#countPeople" do
       context "type is invalid" do
            it "return nil" do
                expect(User.countPeople("abc")).to eq nil
            end
       end
       
       context "type is valid" do
           it "return count is correct"
               expect(User.countPeople("male").to eq 2)
           end
       end
    end
end
```

Các bạn có thể tham khảo một số  convension về cách viết rspec để có một file rspec hoàn hảo:
http://www.betterspecs.org/