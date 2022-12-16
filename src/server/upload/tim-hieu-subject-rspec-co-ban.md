# Mở đầu
Khi bắt đầu viết rspec có một keyword mà khiến mình rất khó hiểu và mơ hồ đó là **subject**. Trong bài viết này sẽ cung cấp cho các bạn đọc những thông tin cơ bản nhất và không còn bối rối với **subject** nữa.

Theo mô tả trong [comment](https://github.com/rspec/rspec-core/blob/922b4a6dc5ca397df19f5f282f2f6a2465b2e24a/lib/rspec/core/memoized_helpers.rb#L418) của **subject method** thì mục đích mang lại giúp chúng ta sử dụng  được với phong cách One-liner syntax, tiêu biểu như `is_expected`.

Định nghĩa :
> Nếu truyền vào **subject method** một cái tên thì sẽ tạo ra một method với tên đó và trả về **subject method**. Điều này giúp chúng ta khai báo **subject** một lần và có thể truy cập nó theo một cách ngầm định (implicitly) thông qua phong cách one-liners và một cách rõ ràng (explicitly) thông qua method được tạo ra.

Để hiểu rõ hơn về **subject** chúng ta cùng đi qua 3 vấn đề chính:
1. **Implicitly defined subject** - Tạm dịch: subject được định nghĩa ngầm
2. **Explicitly defined subject** - Tạm dịch: subject được định nghĩa rõ ràng 
3. **One-liner syntax** - Tạm dịch: Cú pháp phong cách một dòng

# Implicitly defined subject - subject được định nghĩa ngầm
Tại sao lại dùng cụm từ **implicitly defined subject** vì đơn giản nó được thực hiện ngầm mà khiến người dùng ban đầu thấy nó có quá nhiều magic và khó hiểu.
Nhiều khi bạn thấy ở đâu đó một đoạn code giống như sau: 

```
RSpec.describe Array do
  it "should be empty array when first created" do
    expect(subject).to be_empty
  end
end
```

Kha khá các câu hỏi có thể đặt ra ở đây như subject là cái gì? subject chứa gì? Dùng subject như nào cho hợp lý? …

Ở ví dụ trên thì **subject method** trả về một instance của class Array vì vậy kết quả quả test trên là pass.

Giải thích: 
**subject method** sẽ tương ứng với giá trị trả về của `Array.new` hay `[]`.
`be_empty` sẽ tương ứng với kết quả trả về của  `Array#empty?`

Từ ví dụ trên chúng ta đi qua định nghĩa: 
> Nếu đối số đầu tiên truyền vào một example group là một class thì một instance của class đó đều khả dụng trong các example của example group đó thông qua subject method. Có nghĩa là subject method sẽ trả về instance của class đó. 

Những phần xử lý đó là chạy ngầm và tự động nên chúng ta mới sử dụng cụm từ  **implicitly defined subject** - subject được định nghĩa ẩn. 

## Các example group lồng nhau
*(Nếu các bạn chưa biết thì khi sử dụng describe, context trong rspec thì các bạn đã tạo ra một example group và it sẽ tạo ra một example.)*

Các bạn chỉ cần nhớ giá trị **subject method** sẽ nhận giá trị của example group trong cùng, giống với câu "*Phép vua thua lệ làng*" đó. 

```
class ArrayWithOneElement < Array
  def initialize(*)
    super
    unshift "first element"
  end
end

RSpec.describe Array do
  describe ArrayWithOneElement do
    context "referenced as subject" do
      it "contains one element" do
        expect(subject).to include("first element")
      end
    end
  end
end
// KQ: Pass hết nhé
```

Chúng ta thấy có 2 group example là  **(1) RSpec.describe Array** và **(2) describe ArrayWithOneElement** vì (2) nằm bên trong (1) nên **subject method** bên trong những example của (2).
Dễ dàng có thể thử được kết quả trả về của subject method là:

![](https://images.viblo.asia/d2d3f112-df58-46bd-aedf-538486f1a9ac.png)

Do đó **subject** chắc chắn sẽ **include "first element"** rồi.

Các bạn cũng có thể đặt thêm một câu hỏi nữa: Vậy những example bên ngoài (2) thì **subject method** sẽ trả về gì nhỉ? Mình đoán kết quả sẽ là của (1) thôi hay `subject = Array.new = []`

Chứng minh thì rất dễ thôi hãy kiểm tra kết quả của đoạn code này nhé.
```
class ArrayWithOneElement < Array
  def initialize(*)
    super
    unshift 'first element'
  end
end

RSpec.describe Array do
  describe ArrayWithOneElement do
    context 'referenced as subject' do
      it 'contains one element' do
        expect(subject).to include('first element')
      end
    end
  end

  it "should be empty when first created" do
    expect(subject).to be_empty
  end
end
```

Kết quả: 
![](https://images.viblo.asia/e38fcc2f-5d1f-453d-9539-bacc25f8ce0a.png)

# Explicitly defined subject - subject được định nghĩa rõ ràng
Đây là phần mô tả được trích từ [relishapp.com](https://relishapp.com/rspec/rspec-core/v/3-6/docs/subject/explicit-subject) :
> "Use subject in the group scope to explicitly define the value that is returned by the subject method in the example scope.
> 
> ...
> 
> A named subject improves on the explicit subject by assigning it a contextually
> semantic name. Since a named subject is an explicit subject, it still defines the value that is returned by the subject method in the example scope. However, it defines an additional helper method with the provided name. This helper method is memoized.
> The value is cached across multiple calls in the same example but not across examples.
> 
> We recommend using the named helper method over subject in examples."

**Tạm dịch** : 

Sử dụng **subject** trong phạm vi group example để định nghĩa rõ ràng giá trị trả về bởi **subject method** trong phạm vi example.

Một **subject** được đặt tên cải thiện sự rõ ràng của **subject** bởi gán cho nó một cái tên phù hợp với ngữ cảnh. Khi một **subject** được đặt tên là một **subject** rõ ràng, thì nó vẫn định nghĩa giá trị được trả về cho **subject method** trong phạm vi example. Tuy nhiên, nó cũng định nghĩa thêm một **helper method** với tên được cung cấp và **helper method** này sẽ được ghi nhớ. Giá trị được cache giữa những lần gọi trong cùng một example và không cache giữa các example. 

Qua mô tả thì có thể hiểu như sau:
1. Trong phạm vi của example group (bên ngoài các example) các bạn sẽ sử dụng **subject** để chỉ rõ ràng giá trị mà **subject method** trả về.

```
RSpec.describe Array, "with some elements" do //example group
  subject { [1, 2, 3] }

  it "has the prescribed elements" do // a example
    expect(subject).to eq([1, 2, 3])
  end
end
```

Trong ví dụ trên subject method sẽ trả về `[1, 2, 3]` thay vì `[]` như **implicitly defined subject**. 
Nếu các bạn cố tình khai báo **subject** bên trong một example thì sẽ không có tác dụng và rspec cũng không báo lỗi gì.

2. Nếu khai báo như cách 1 chưa đủ rõ ràng thì chúng ta có thể đặt tên cho từng **subject**. Việc này sẽ giúp chúng ta làm 2 thứ một là gán giá trị trả về cho **subject method**, hai là tạo thêm một **helper method** với giá trị trả về giống **subject method**.

```
RSpec.describe Array, "with some elements" do //example group
  subject(:name) { [1, 2, 3] }

  it "has the prescribed elements" do // a example
    expect(name).to eq([1, 2, 3]) 
    // Thay vì expect(subject).to eq([1, 2, 3])
  end
end
```

Việc sử dụng subject một cách rõ ràng như vậy sẽ đỡ gây nhiều sự khó hiểu và sai lầm cũng như magic của subject.
Explicitly example có rất nhiều cách dùng và đặc điểm được nhắc đến trong [đây](https://relishapp.com/rspec/rspec-core/v/3-6/docs/subject/explicit-subject) các bạn có thể tham khảo nhé. 


***Tips***: một cách để các bạn quản lý và phán đoán được giá trị của **subject** sẽ là gì và bị biến đổi ra sao thì có thể sử dụng tư tưởng sau: 
- subject được khai báo bên trong sẽ có độ ưu tiên cao hơn bên ngoài (Phép vua thua lệ làng).
- subject method của từng example group là không ảnh hưởng đến nhau.
- example group bên trong không có subject thì sẽ lấy của example group bên ngoài nếu có. 

Ví dụ: 
```
class ArrayWithOneElement < Array
  def initialize(*)
    super
    unshift 'first element'
  end
end

RSpec.describe Array do # example group 1 - EG1
  subject(:name) { [] }

  describe ArrayWithOneElement do # example group 2 - EG2
    subject(:name) { ['first element'] }

    context 'referenced as subject' do # example group 3 - EG3
      it 'contains one element' do # example
        expect(name).to include('first element') # Vì EG3 không có subject nên dùng EG2, EG2 có độ ưu tiên cao hơn EG1
      end
    end
  end

  it 'should be empty when first created' do # example
    expect(name).to be_empty #subject của EG1
  end
end
```

# One-liner syntax
Rspec hỗ trợ cú pháp trên một dòng để mô tả một expectation trên **subject**. 

Ví dụ:
Cách thông thường:
```
RSpec.describe Array do # example group 1 - EG1
  it 'should be empty when first created' do # example
    expect(subject).to be_empty #subject của EG1
  end
end
```

Phong cách một dòng :
```
RSpec.describe Array do
  it { is_expected.to be_empty }
end
```

còn những phần mô tả cho example như *'should be empty when first created'* sẽ được tự động tạo ra.

Ngoài **is_expected** chúng ta có thể sử dụng với **should** như:
```
RSpec.describe Array do
  it { should be_empty }
end
```

**Có một vài lưu ý :**
* Đây là tính năng chỉ khả dụng khi sử dụng *gem rspec-expectations*
* Những examples sử dụng phong cách one-liner syntax không thể gọi trực tiếp từ command line với option `--example`
* One-liner syntax chỉ hoạt động với non-block expectations (ví dụ: `expect(obj)`) và sẽ không hoạt động với block expectations (ví dụ: `expect{ object }`)

Với cách viết này sẽ ngắn gọn hơn rất nhiều và thường thấy trong khi viết rspec cho model ở trong rails.

# Kết luận
Qua những kiến thức được tổng hợp và giải thích theo ý hiểu của mình mong các bạn có thể hiểu được những kiến thức cơ bản về subject. Giúp bạn trả lời được những câu hỏi cơ bản nó là cái gì, tại sao nó lại như vậy và cách dùng cơ bản. 
Thanks for reading to my post!

# Nguồn tham khảo
1. [Relish](https://relishapp.com/rspec/rspec-core/v/3-10/docs/subject)