Nếu bạn là một lập trình viên Rails thì chắc chắn bạn sẽ không hề xa lạ gì với Rspec và FactoryBot(tên cũ là FactoryGirl). Khi dự án của bạn có thời gian phát triển dài và quy mô lớn thì số lượng testcase của unit test sẽ rất lớn, để chạy hết số lượng testcase thì có thể mất tương đổi nhiều thời gian. Bạn có thể cải thiện điều đó bằng 1 số thay đổi nhỏ với việc sử dụng FactoryBot


### FactoryBot.create, FactoryBot.build và Model.new
Ví dụ ta có model User như sau:

```
class User < ActiveRecord::Base
  def age
    ((Date.current - birthdate)/365.0).floor
  end
end
```

```
FactoryBot.define do
  factory :user do
  	#Some default value come here
  end
end
```

Và ta có unit test cho User#age như sau:

```
describe User do
  describe "#age" do
    it "calculates age given birthdate" do
      let(:user){FactoryBot.create :user, birthdate: date 366.days.ago}
      expect(user.age).to eq 1
    end

    it "calculates age correctly by rounding age down to the appropriate integer" do
      let(:user){FactoryBot.create :user, birthdate: date 360.days.ago}
      expect(user.age).to eq 0
    end
  end
end
```

Thử chạy thì ta có kết quả như sau:
```
rspec spec/models/user_spec.rb
..

Finished in 0.02278 seconds
2 examples, 0 failures
```
Xem ra mọi thứ đều hoàn toàn ổn và không có gì đặc biệt ở đây. Nhưng bạn hãy xem nội dung của hàm User#age, rõ ràng là nó chẳng hề quan tâm đến database, thử thay FactoryBot.create thành FactoryBot.build và chạy lại:
```
rspec spec/models/user_spec.rb
..

Finished in 0.00474 seconds
2 examples, 0 failures
```
Kết quả được cải thiện đáng kể. FactoryBot.create tạo 2 bạn ghi user trong database trong khi thực tế điều đó là không cần thiết với việc test User#age. Và phần lớn các method không cần đến dữ liệu được lấy từ database để có thể chạy đúng. Vì vậy tùy vào method bạn nên sử dụng hợp lý giữa FactoryBot.build và FactoryBot.create.

Giả sử User có thêm Profile, khi đó file model và factory sẽ trở thành:

```
class User < ActiveRecord::Base
  has_one :profile
  def age
    ((Date.current - birthdate)/365.0).floor
  end
end

FactoryBot.define do
  factory :user do
    profile
  end
  factory :profile
end
```

Giữ nguyên test và chạy lại thì kết quả bạn nhận được là:
```
rspec spec/models/user_spec.rb
..

Finished in 0.01199 seconds
2 examples, 0 failures
```
Mọi thứ chậm như khi ta dùng FactoryBot.create. Vậy thử đổi từ thành User.new thì sao:

```
describe User do
  describe "#age" do
    it "calculates age given birthdate" do
      let(:user){User.new birthdate: date 366.days.ago}
      expect(user.age).to eq 1
    end

    it "calculates age correctly by rounding age down to the appropriate integer" do
      let(:user){User.new birthdate: date 360.days.ago}
      expect(user.age).to eq 0
    end
  end
end
```

Kết quả lại nhanh như trước
```
rspec spec/models/user_spec.rb
..

Finished in 0.00489 seconds
```
Tại sao vậy. Thực tế là FactoryBot.build vẫn gọi hàm save dữ liệu vào database khi bạn build association. Đó là một ngoại lệ của FactoryBot.build. Hãy chú ý đến nó.

### Ghi vào ổ cứng khiến mọi thứ tồi tệ hơn

Đôi khi đối tượng sẽ cần ghi nên ổ cứng trong suốt vong đời của nó. Một ví dụ điển hình là xử lý tệp đính kèm với gem PaperClip hoặc Carrierwave, điều này dẫn đến việc ghi hàng nghìn file không cần thiết lên ổ cứng, điều đó khiến test trở nên chậm chạp hơn nhiều.

Rất khó để xác định sự chậm chạp này là sự khác biệt giữa FactoryBot.build, FactoryBot.create hay là cách xử lý các association. Dù là bạn dùng FactoryBot.build thì file vẫn sẽ được xử lý và tạo ra. Vì vậy hãy chắc chắn khi nào bạn nên có attachment trong đối tượng được test

### Tài liệu tham khảo
https://robots.thoughtbot.com/speed-up-tests-by-selectively-avoiding-factory-girl