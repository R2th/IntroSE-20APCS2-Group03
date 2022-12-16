# Quảng cáo phương thuốc quý

Nếu các bạn đã chán ngấy với việc viết và nhìn những dòng code sau đây lặp đi lặp lại thì bài viết này là dành cho bạn. Một cách chữa ngấy cho các bạn nhé vì nhà tôi 3 đời chữa ngấy rồi =)).

Ở đâu đó có đoạn code rspec cho controller: 
```
describe "GET #index" do
  before do 
    get :index
  end
  it {  expect(subject).to respond_with(:ok) }
  it {  expect(subject).to render_template(:index) }
end
```

Các bạn thử nghĩ xem viết rspec cho  **#index** ở 10 controller như thế kia có phải là chán không? Còn chưa kể đến **#show**,  **#edit** trong từng controller, tính nhẩm nhanh thì cũng phải lặp lại khoảng ~30 lần ấy chứ. (#index, #show, #edit / controller). 

Để chữa ngấy thì áp dụng DRY thông qua **shared examples** đi rất chi là hiệu quả nuônnnnnn.

# Cách sử dụng thuốc quý
*Hãy đọc kỹ tính chất và bản chất của thuốc để có thể sử dụng chữa đúng bệnh, đúng chỗ nhé.*

**Bonus**

Trong bài có sử dụng nhiều thuật ngữ **example** và **example group**. Nếu các bạn chưa biết thì khi sử dụng **describe, context** trong rspec thì các bạn đã tạo ra một **example group** và **it** sẽ tạo ra một **example**. Một example group sẽ chứa nhiều example.

Ví dụ:
Một group và một example.
```
RSpec.describe "something" do
  it "does something" do
  end
end
```

Example group lồng nhau:
```
RSpec.describe "something" do
  context "in one context" do
    it "does one thing" do
    end
  end

  context "in another context" do
    it "does another thing" do
    end
  end
end
```

# Dược lực học - Shared examples
Tạm dịch định nghĩa [shared examples](https://github.com/rspec/rspec-core/blob/fe3084758857f0714f05ada44a18f1dfe9bf7a7e/features/example_groups/shared_examples.feature): 
**Shared examples** (Những example được chia sẻ) cho phép bạn mô tả hành vi của những class hoặc module. Khi được khai báo, nội dung của một shared group được lưu trữ. Nó chỉ được thực hiện trong context của example group khác, điều này cung cấp bất kỳ bối cảnh shared group cần phải chạy. 

Hiểu theo cách đơn giản hơn, shared examples cho phép chúng ta khai báo ra các example và sử dụng lại những example đó trong nhiều nơi khác. Đó là điểm nổi bật nhất mà shared example mang lại và giúp code unit test tuân theo nguyên lý DRY(giảm thiểu những phần code lặp lại).

Để sử dụng được tính năng shared examples chúng ta chỉ cần thực hiện hai bước:
1. Định nghĩa shared examples
2. Sử dụng shared examples đã khai bảo ở example group khác.

## Định nghĩa shared examples
Cách định nghĩa một shared examples là sử dụng **shared_examples** method. Định nghĩa của method này cũng nêu rất rõ về chức năng của **shared_examples** đó là: Lưu trữ block cho những lần sử dụng sau. Block truyền vào **shared_examples** method sẽ được đánh giá trong một example group khác thông qua **include_examples**, **include_context** hoặc **it_behaves_like**.

Ví dụ mẫu:
```
#Khai báo shared examples có tên "some example"
RSpec.shared_examples 'some example' do |parameter|
  let(:something) { parameter }
  it 'uses the given parameter' do
    expect(something).to eq(parameter)
  end
end
```

## Sử dụng shared examples đã khai bảo ở example group khác.
Sau khi đã có một shared examples hãy dùng một trong những cách sau để sử dụng shared example đó: 
```
  include_examples "name"      # include the examples in the current context
  it_behaves_like "name"       # include the examples in a nested context
  it_should_behave_like "name" # include the examples in a nested context
  matching metadata            # include the examples in the current context
```

Ví dụ mẫu:
```
RSpec.describe Array do
  include_examples "some example", "parameter1"
end
```

Chú ý: shared_examples chỉ được sử dụng  trong ***example group*** nếu nó được sử dụng trong một ***example*** sẽ gây lỗi.

## Phân biệt include_examples và it_behaves_like
Như ở trên đã đề cập chúng ta thấy có 4 cách để sử dụng một shared example nhưng trong bài này sẽ tập trung vào 3 cách đầu và làm rõ sự khác nhau giữa chúng.

Định nghĩa của [include_examples](https://github.com/rspec/rspec-core/blob/1b65f8521ffc4d593662191fc8693907bc630e74/lib/rspec/core/example_group.rb#L353) bạn có thể xem ở [đây](https://github.com/rspec/rspec-core/blob/1b65f8521ffc4d593662191fc8693907bc630e74/lib/rspec/core/example_group.rb#L353) nhé. Hiểu đơn giản là nó chỉ include (kéo) nội dung của shared examples vào example group. 

Ví dụ: 
```
RSpec.describe Array do
  include_examples "some example", "parameter1"
  #Những example trong "some example" sẽ thuộc example group là SomeClass
end
```

Bản chất của đoạn code trên tương tự :
```
RSpec.describe Array do
  let(:something) { "parameter1" }

  it "uses the given parameter" do
    expect(something).to eq("parameter1")
  end
end
```

Nếu bạn chạy command rspec sẽ thấy kết quả như sau:
![](https://images.viblo.asia/d19702d5-ac6d-4000-9541-4e6bd742e4b7.png)

Bạn cần cẩn thận khi sử dụng **include_examples** nhiều lần trong cùng một example group. Nếu trong shared example cùng khai báo nhiều method có cùng tên thì chỉ method cuối cùng sẽ được lấy. 

Ví dụ 1:
```
RSpec.shared_examples 'some example' do |parameter|
  let(:something) { parameter }
  it 'uses the given parameter' do
    expect(something).to eq(parameter)
  end
end

RSpec.describe Array do
  include_examples 'some example', 'parameter1' #example1
  include_examples 'some example', 'parameter2' #example2
end
```

Bạn sẽ mong muốn là cả 2 example trên đều pass nhưng kết quả thì không.
![](https://images.viblo.asia/18fb008f-966f-4d61-b590-5959bd613c22.png)

example1 bị failed lý do thì quá rõ mong muốn "parameter1" mà nhận được "parameter2".

Vì bản chất của đoạn ví dụ 1 trên như sau:
```
RSpec.describe Array do
  let(:something) { 'parameter1' }
  let(:something) { 'parameter2' }

  it 'uses the given parameter' do
    expect(something).to eq('parameter1')
  end

  it 'uses the given parameter' do
    expect(something).to eq('parameter2')
  end
end
```

**let(:something)** bị khai báo 2 lần trong cùng phạm vi của example group nên chỉ cái cuối cùng được chấp nhận. Do đó giá trị của **something** trả về sẽ là "parameter2" thay vì "parameter1" dẫn đến bị failed example1.

Do đó khi dùng **include_examples** bạn cần chú ý tới nội dung của shared example có gì và phạm vi của example group sử dụng nó.

Để khắc phục được vấn đề trên bạn có thể dùng **it_behaves_like** hoặc **it_should_behave_like**. Cả hai đều như nhau cả chỉ khác tên gọi. 
Chúng làm thêm một việc so với **include_examples** đó là tạo thêm một example group bọc lại những example bên trong shared example.

Ví dụ:
```
RSpec.shared_examples 'some example' do |parameter|
  let(:something) { parameter }
  it 'uses the given parameter' do
    expect(something).to eq(parameter)
  end
end

RSpec.describe Array do
  it_behaves_like 'some example', 'parameter1'
  it_behaves_like 'some example', 'parameter2'
end
```

Kết quả như mong muốn cả hai example đều pass.
![](https://images.viblo.asia/ede47054-6583-41ad-b7a1-c64b4567d8ee.png)

Từ ảnh trên bạn dễ dàng thấy bên ngoài example "uses the given parameter" đều ở bên trong example group là "behaves like some example".
Đó là sự khác nhau duy nhất giữa **include_examples** và **it_behaves_like**. Để cho an toàn, dễ nhầm lẫn và khó kiểm soát thì bạn có thể dùng **it_behaves_like** thay cho **include_examples**.
# Kết luận
Trong bài chỉ tập trung làm rõ về **shared example** và sự khác nhau giữa **include_example** và **it_behaves_like**. Bên cạnh đó có rất nhiều cách dùng khác của shared examples ở [đây](https://relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples). Sau bài này mong các bạn đọc sẽ áp dụng được nhiều điều khi viết rspec cho dự án của mình. Cũng như hiểu rõ hơn về rspec nói chung và examples nói riêng. Nếu các bạn thấy những example có vẻ giống nhau và lặp đi lặp lại nhiều lần thì hãy nghĩ tới shared example nhé.

Cách giải quyết cho vấn đề được đề ra ở đầu của bài viết các bạn có thể sử dụng shared example với tham số nhé. :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Thanks for reading to my post! :heartbeat:

Tài liệu tham khảo
1. https://relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples