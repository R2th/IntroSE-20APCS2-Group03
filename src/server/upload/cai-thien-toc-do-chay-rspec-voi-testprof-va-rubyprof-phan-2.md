Ở phần trước chúng ta đã cùng nhau tìm hiểu về gem `test-prof` và tìm hiểu một số phương thức khai thác thông tin từ các file RSpec, đó được coi như là bước đầu tiên khi bạn nhìn vào đống test suite, test example mà không biết bắt đầu cải thiện từ phần nào. Tiếp tục chuyên mục cải thiện tốc độ RSpec thì ở phần này mình sẽ trình bày tiếp về các phương thức kiểm tra hiệu năng của các testcase. Cùng bắt đầu thôi!!! (go)

#### Bạn đã dùng `let` và `before` đúng cách?

Trong khi viết rspec, chắc hẳn là ai cũng dùng rất nhiều `let` hoặc `before` đây là hai method tiện lợi giúp chúng ta viết code một cách 'DRY' nhất có thể, thế nhưng lạm dụng cách viết này đôi khi chưa chắc đã phải là tốt.

Ví dụ như trong dự án mình, mình thấy mọi người hay dùng `before` để gọi đến action trong khi viết test controller cụ thể như sau:

```ruby
context "test action A when params is B" do
  before do
    get :index
  end
  
  it "should assign instance var C" do
    expect
  end
  
  it "should assign instance var D" do
    expect
  end
end
```

Bạn có thể thấy là viết thế này chả có gì là sai cả, và mình cũng đã từng viết như thế nhiều lần, thậm chí con coi đây là một best practice và thường xuyên làm theo. Thế nhưng, nếu nhìn kỹ bạn cũng có thể thấy cách nghĩ đó là sai hoàn toàn.
Mặc dù cho kết quả chạy đúng, nhưng việc khai báo như trên dẫn đến việc chúng ta chạy test hai lần cho cùng một hành động, trong khi chỉ với 1 lần gọi chúng ta đã có thể test được cả hai trường hợp này rồi. 

Một cách sửa là chúng ta có thể chuyển 2 `expect` vào cùng một `it`, sau đó thêm tag `:aggregate_failures` vào `it`, tag đó giúp tất cả các `expect` đều chạy kể cả khi trước đó có một `expect` chạy lỗi (bình thường example sẽ fail ngay khi gặp 1 `expect` failed), điều này giúp chúng ta chạy một lần test là có thể kiểm tra được `expect` nào sai mà không phải chạy đi chạy lại.

```ruby
context "test action A when params is B" do
  before do
    get :index
  end
  
  it "should assign instance var C & D", :aggregate_failures do
    expect
    expect
  end
end
```

Thế nhưng, sửa như vậy vẫn chưa phải là best practice, chúng ta vẫn đang để phần gọi action ở `before`, như vậy có gì sai? Đôi khi trong dự án chúng ta sẽ bắt gặp nhiều trường hợp viết test kiểu một `context` có một `it` nhưng vẫn khai báo `before` cho nó, tôi đã từng thấy như vậy rất nhiều lần.

Chúng ta nên hiểu rằng, khi khai báo một block với `before`, nó sẽ đăng ký block đó với một loạt các `hooks` khác để chờ được gọi khi thực thi `it`, nên việc khai báo block ra `before` chạy sẽ mất thời gian hơn khi với mỗi `it` nó sẽ phải tìm trong hooks có block code không để thực thi, một vài example thì không vấn đề, với dự án lớn vài nghìn example thì nó sẽ kéo performance xuống rất nhiều. Vậy suy ra cách best practice nhất phải là:

```ruby
context "test action A when params is B", :aggregate_failures do
  it "should assign instance var C & D" dd
    get :index
   
    expect
    expect
  end
end
```

không cầu kỳ, đẹp đẽ nhưng lại rất thuyết phục!

Tương tự với `let`/`let!` cũng vậy, mình cũng gặp nhiều trường hợp viết test như này: một `context`, trong đó có 1 vài `it` nhưng lại khai báo khá nhiều `let`.

```ruby
RSpec.describe ClassName, type: controller do
  let(:common_data){FactoryGirl.create ...}
  let(:data_1){FactoryGirl.create ...}
  let(:data_2){FactoryGirl.create ...}

  it "A" do
    # chỉ sử dụng `common_data` & `data_1`
  end

  it "B" do
    # chỉ sử dụng `common_data` & `data_2`
  end
end
```

Chúng ta hay sử dụng `let`  như một cách để 'né' việc khai báo instance variable, việc này không hề sai, nhưng đôi khi chúng ta lại hơi lạm dụng quá (tôi cũng vậy cho đến gần đây). Như ở ví dụ trên `data_1` và `data_2` được sử dụng chỉ trong một `it` duy nhất, nhưng việc khai báo nó ở `let` cũng dẫn tới mất thời gian tìm block code và thực thi như với trường hợp của `before`, chúng ta có thể thay lại như sau:

```ruby
RSpec.describe ClassName, type: controller do
  let(:common_data){FactoryGirl.create ...}

  it "A" do
    # chỉ sử dụng `common_data` & `data_1`
    data_1 = ... 
  end

  it "B" do
    # chỉ sử dụng `common_data` & `data_2`
    data_2 = ... 
  end
end
```

Như vậy là cũng tiết kiệm được mỗi example một cơ số thời gian rồi.

### Phát hiện việc '*lạm dụng*' `let` và `before`

Với `test-prof` chúng ta có thể sử dụng RSpecDissect để phát hiện các ra test suite của chúng ta có sử dụng quá nhiều thời gian vào việc chạy `let` và `before` hook hay không. Các chạy rất đơn giản:

```
RD_PROF=1 RD_PROF_TOP=10 rspec ...
```

Trong đó, `RD_PROF` là để nói với rspec là chạy RSpecDissect, còn `RD_PROF_TOP` để sinh ra báo cáo với 10 test suite chậm nhất. Kết quả sinh ra như sau:

```ruby
[TEST PROF INFO] RSpecDissect enabled

Total time: 25:14.870
Total `before(:each)` time: 14:36.482
Total `let` time: 19:20.259

Top 5 slowest suites (by `before(:each)` time):

Webhooks::DispatchTransition (./spec/services/webhooks/dispatch_transition_spec.rb:3) – 00:29.895 of 00:33.706 (327)
FunnelsController (./spec/controllers/funnels_controller_spec.rb:3) – 00:22.117 of 00:43.649 (133)
ApplicantsController (./spec/controllers/applicants_controller_spec.rb:3) – 00:21.220 of 00:41.407 (222)
BookedSlotsController (./spec/controllers/booked_slots_controller_spec.rb:3) – 00:15.729 of 00:27.893 (50)
Analytics::Wor...rsion::Summary (./spec/services/analytics/workflow_conversion/summary_spec.rb:3) – 00:15.383 of 00:15.914 (12)


Top 5 slowest suites (by `let` time):

FunnelsController (./spec/controllers/funnels_controller_spec.rb:3) – 00:38.532 of 00:43.649 (133)
 ↳ user – 3
 ↳ funnel – 2
ApplicantsController (./spec/controllers/applicants_controller_spec.rb:3) – 00:33.252 of 00:41.407 (222)
 ↳ user – 10
 ↳ funnel – 5
 ↳ applicant – 2
Webhooks::DispatchTransition (./spec/services/webhooks/dispatch_transition_spec.rb:3) – 00:30.320 of 00:33.706 (327)
 ↳ user – 30
BookedSlotsController (./spec/controllers/booked_slots_controller_spec.rb:3) – 00:25.710 of 00:27.893 e(50)
 ↳ user – 21
 ↳ stage – 14
AvailableSlotsController (./spec/controllers/available_slots_controller_spec.rb:3) – 00:18.481 of 00:23.366 (85)
 ↳ user – 15
 ↳ stage – 10
```

Như trong dự án mình đã từng phân tích, thời gian bỏ ra để chạy `let` và `before` chiếm gần như toàn bộ (80%) thời gian chạy toàn bộ các test cases.

### Thời gian chạy test chiếm phần lớn bởi việc... tạo data?

Khi chạy test, chắc chắn là chúng ta thường xuyên phải tạo dữ liệu, một phương thức chủ yếu là thông qua `FactoryGirl` chúng ta đã nói ở phần trước, phần này sẽ giới thiệu đến bạn hai cách tìm hiểu xem bạn có đang tạo data thừa thãi quá nhiều không.

#### Factory Doctor

Khi viết test model chúng ta nếu dùng factory `create` method quá nhiều cũng có thể giảm performance của cả test suite, dẫn đến toàn bộ test kéo theo sẽ chạy chậm, mà đôi khi một vài example check không thật sự cần thiết phải tạo data trong DB. Thay vào đó chúng ta có thể dùng `build` hoặc `build_stubbed`.

`build_stubbed` thì nó có lợi hơn là sẽ khiến record của chúng ta như đã lưu trong DB rồi (chú ý là với một số quan hệ - association, hay query trực tiếp từ DB sau khi dùng `build_stubbed` sẽ không hoạt động)

Chạy Factory Doctor sẽ show ra report cho chúng ta nên sửa đoạn nào từ `create` thành `build_stubbed`. 

**_Cách chạy_**

```ruby
FDOC=1 rspec ...
```

Ví dụ output:

```
[TEST PROF INFO] FactoryDoctor report

Total (potentially) bad examples: 2
Total wasted time: 00:13.165

User (./spec/models/user_spec.rb:3) (3 records created, 00:00.628)
  validates name (./spec/user_spec.rb:8) – 1 record created, 00:00.114
  validates email (./spec/user_spec.rb:8) – 2 records created, 00:00.514
```

Lưu ý: đôi khi chức năng này cũng sẽ thông báo sai nên chúng ta cũng nên cẩn thận và chạy vài lần để kiểm tra các kết quả.

#### Factory Profiler

Method này giúp chúng ta nhận biết được chúng ta có _**chạy quá nhiều lần chạy tạo dữ liệu băng factory girls**_ hay không (thông qua `Factory.create`) hoặc là chúng ta **_có tạo nhiều data nested (factory cascade)_** hay không (_tạo record mà một hay nhiều attribute của record đó lại là một association_). Nó sẽ sinh ra một report bao gồm thông tin về số lần factory đó được gọi (`total`), số lần được gọi trực tiếp (`top-level`), tông thời gian để tạo factory đó (`total time`), thời gian chạy một lần gọi (`time per call`), thời gian chạy để tạo trực tiếp (`top-level time`) và tên của factory đó (`name` - chú ý là nó theo tên factory chúng ta khai báo chứ không theo tên model nên chúng ta có thể theo dõi chính xác factory nào được gọi).

**_Cách chạy_**

```ruby
# text output
FPROF=1 rspec ...
# html output
FPROF=flamegraph rspec ...
```

Ví dụ report của `Factory Profiler`:

```
[TEST PROF INFO] Factories usage

Total: 15285
Total top-level: 10286
Total time: 299.5937s
Total uniq factories: 119

 total   top-level   total time    time per call      top-level time            name
  6091        2715    115.7671s          0.0426s            50.2517s            user
  2142        2098     93.3152s          0.0444s            92.1915s            post
```

Sẽ xảy ra 2 trường hợp:

- Total > top-level: Record được tạo thông qua việc tạo association attribute quá nhiều -> 1 câu create nhưng chạy `n` câu SQL -> chúng ta cần phải tổ chức lại file factories, kiểm tra lại xem lần nào cần thiết tạo association, lần nào không, hoặc chỉ tạo những association nào là cần thiết.
- Total xấp xỉ hoặc bằng top-level: Chúng ta có thể cân nhắc những loại dữ liệu này là dữ liệu chỉ cần tạo một lần mà không thay đổi nhiều không, đôi khi chúng ta lại khai báo chúng trong `let` hoặc `let!` dẫn đến việc tạo đi tạo lại một dữ liệu giống nhau -> nên khai báo trước trong `before(:all)` để giảm số lần tạo.

Ngoài ra chúng ta cũng phải nhìn vào thời gian total với thời gian top-level để biết được rằng việc tạo nested có tiêu tốn nhiều thời gian quá không.

-----

Như vậy, ở phần này, chúng ta đã tìm hiểu được thêm một số cách để thu thập thông tin về hiệu năng chạy RSpec thông qua việc phân tích việc sử dụng helper `let` và `before`, cũng như việc tạo data đã hợp lý và đúng cách chưa. Ở phần tiếp theo cũng là phần cuối mình sẽ trình bày nốt về một số method sử dụng để cải thiện lại performance mà rất tiện lợi là không phải chỉnh sửa code quá nhiều, một việc chúng ta rất ngại khi phải bỏ ra quá nhiều effort để cải thiện test cho dự án.

Bài viết được tham khảo tại:

* https://test-prof.evilmartians.io/#/
* https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests
* https://guides.rubyonrails.org/active_support_instrumentation.html
* https://ruby-prof.github.io/