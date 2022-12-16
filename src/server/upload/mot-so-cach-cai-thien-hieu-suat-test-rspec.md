# 1.Tăng hiệu suất của phần cứng
* Khi muốn đạt được hiệu suất mà không phải làm gì nhiều, có thể nghĩ đến ngay việc cải thiện thông số kỹ thuật phần cứng. 
* Sẽ dễ dàng tăng gấp đôi hiệu suất trên bộ test của bằng cách nâng cấp Server CI từ một máy cũ hoặc thấp thành máy nhanh hơn.

# 2.Chạy song song các bộ test
* Chạy trên nhiều lõi CPU có thể giảm thêm thời gian cho bộ test.
* Có thể sử dụng một gem khá hiệu quả cho việc này là gem "parallel_tests". Gem này sử dụng cơ sở dữ liệu trên mỗi luồng và có thể chạy trên các server CI như Bitbucket. 
* Chạy bộ test song song cũng giúp nâng cấp phần cứng hiệu quả hơn. Khi chạy song song các bộ test, cần chú ý dữ liệu dùng chung giữa các bộ DB khác nằm ngoài, chẳng hạn như Elaticsearch.

# 3.Tăng hiệu năng test Rpsec với gem TestProf
![](https://images.viblo.asia/d2e4850e-6d8c-4108-a26b-31e4586d0432.png)
## 3.1 Before All (Transactional before_all)
Một tính năng tuyệt vời của rails là "transactional_tests", tức là chạy từng ví dụ trong transaction cuối cùng.
Vì vậy, không có gây ảnh hưởng database toàn cục. Tuy nhiên sẽ có những trường hợp riêng
```
describe BeatleWeightedSearchQuery do
  before(:each) do
    @paul = create(:beatle, name: "Paul")
    @ringo = create(:beatle, name: "Ringo")
    @george = create(:beatle, name: "George")
    @john = create(:beatle, name: "John")
  end
end
```
Viết lại với cách sử dụng before(:all)
```
describe BeatleWeightedSearchQuery do
  before(:all) do
    @paul = create(:beatle, name: "Paul")
    # ...
  end
end
```
Sau ví dụ code ở trên,  cần phải clean cơ sở dữ liệu, vì việc chạy toàn bộ dữ liệu không cần thiết trước khi chạy vào case test có thể làm tốc độ test giảm đi cũng như gây khó khăn với các data không cần thiết. Đôi khi có thể khiến kết quả test của bạn bị sai số.
Một lựa chọn tốt hơn là sử dụng Transaction để gói toàn bộ dữ liệu vào  và lúc đó before_all sẽ hoạt động dựa trên adapter được config như sau
```
class MyDBAdapter
  #before_all adapters must implement two methods:
  #- begin_transaction
  #- rollback_transaction
  def begin_transaction
    # ...
  end

  def rollback_transaction
    # ...
  end
end

#And then set adapter for `BeforeAll` module
TestProf::BeforeAll.adapter = MyDBAdapter.new
```
Lúc này file Rspec sẽ viết lại như sau
```
describe BeatleWeightedSearchQuery do
  before_all do
    @paul = create(:beatle, name: "Paul")
  end
end
```

và config với gem TestProf
```
TestProf::BeforeAll.configure do |config|
  config.before(:begin) do
    # do something before transaction opens
  end
  #after(:begin) is also available

  config.after(:rollback) do
    # do something after transaction closes
  end
  #before(:rollback) is also available
end
```

## 3.2 Let It Be
"Let" được sử dụng trong Rspec như một trong những thứ cơ bản nhất và quan trọng nhất. Khi bắt đầu với một file test dù là test cho controller, model hay feature thì đều sử dụng Let hay Let! để tạo và lưu dữ liệu cần thiết trong quá trình test.
Ví dụ sử dụng let! và tương tự với before_all
```
describe BeatleWeightedSearchQuery do
  let!(:paul) { create(:beatle, name: "Paul") }
  let!(:ringo) { create(:beatle, name: "Ringo") }
  let!(:george) { create(:beatle, name: "George") }
  let!(:john) { create(:beatle, name: "John") }

  specify { expect(subject.call("john")).to contain_exactly(john) }
...
end
```

```
describe BeatleWeightedSearchQuery do
  before_all do
    @paul = create(:beatle, name: "Paul")
    # ...
  end

  specify { expect(subject.call("joh")).to contain_exactly(@john) }
  ...
end
```

Ví dụ trên hoạt động khá tốt nhưng yêu cầu sử dụng các biến instance và xác định mọi thứ cùng một lúc. Do đó, không dễ để cấu trúc lại các case test hiện có sử dụng let/let!
Tuy nhiên, với let_it_be trong TestProf sẽ giúp dữ liệu ít phải tái cấu trúc hơn, let_it_be là sự kết hợp tuyệt vời của before_all và let

```
describe BeatleWeightedSearchQuery do
  let_it_be(:paul) { create(:beatle, name: "Paul") }
  let_it_be(:ringo) { create(:beatle, name: "Ringo") }
  let_it_be(:george) { create(:beatle, name: "George") }
  let_it_be(:john) { create(:beatle, name: "John") }

  specify { expect(subject.call("john")).to contain_exactly(john) }
...
end
```

**Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại !!!**

**Link tham khảo**
https://dev.to/bambangsinaga/improve-rspec-tests-4bjc

https://test-prof.evilmartians.io/#/let_it_be

https://test-prof.evilmartians.io/#/before_all