RSpec là một trong những testing framework phổ biến nhất cho Ruby.
RSpec-rails là một mở rộng của RSpec, cho phép bạn viết unit tests cho controller, views, helpers và model trong ứng dụng Rails.
Có một số mẹo thật dễ dàng để viết các test cồng kềnh, chậm chạp và không cung cấp bất kỳ giá trị nào. Sau đây là một vài thủ thuật và thực tiễn tốt nhất sẽ làm cho công việc viết RSpec của bạn dễ dàng hơn một chút.

Một số trong số này có thể đơn giản trong khi một số khác có thể gây tranh cãi - chung quanh chủ để này là tất cả đều là ý kiến của tác giả.
## 1. describe
Các unit test thường liên quan đến việc thử nghiệm một *single method* trên một *single class*. Do đó, điều rất quan trọng là chúng ta mô tả method đang thử nghiệm một cách nhất quán. Tài liệu Ruby đã thiết lập một tiêu chuẩn ở đây - sử dụng **.** khi đề cập đến một Class method và **#** khi đề cập đến một instance method.
```ruby
describe '.build' do
describe '#admin?' do
```
Điều này nghe có vẻ như một điều đơn giản, nhưng nó giúp rspec dễ đọc một cách tuyệt vời.
## 2. subject
Khi tôi bắt đầu sử dụng rspec, tôi đã viết các test như này:
```ruby
describe Session do
  describe '.locate'
    before(:each) { @session = Session.locate }
  
    it 'should have a user' do
      @session.user.should_not be_nil
    end
    
    it 'should have an expiration' do
      @session.expiration.should_not be_nil
    end
  end
end
```
Cái này chắc chắn hoạt động, nhưng nó rất rườm rà - đặc biệt vì chúng ta chỉ thực sự thử nghiệm 2 thuộc tính. Sau đó, tôi phát hiện ra **subject**, làm cho sạch code hơn nhiều.
```ruby
describe Session do
  describe '.locate'
    subject { Session.locate }
  
    its(:user) { should_not be_nil }
    its(:expiration) { should_not be_nil }
  end
end
```
Hãy nhớ rằng **subject** có thể làm cho mã của bạn sạch hơn, nhưng bạn không cần sử dụng nó ở mọi nơi. Đôi khi thường xuyên dùng khối blocks **{}** sau **it**  vẫn là cách tiếp cận tốt nhất. Bạn đặc biệt không nên gọi **subject** một cách rõ ràng.

Ngoài ra còn có khái niệm về một *subject tiềm ẩn* - về cơ bản nếu bạn không chỉ định bất kỳ chủ thể  subject nào, đối tượng sẽ là một instance của bất kỳ điều gì được chỉ định trong describe block (được khởi tạo với hàm tạo mặc định). Điều này rất hữu ích nếu bạn muốn test một số giá trị mặc định trên đối tượng đang test.
```ruby
describe User do
  it { should be_valid }
end
```
## 3. let và let!
```ruby
describe Product do
  describe '.on_sale' do
    before do
      @product_on_sale = create(:product, on_sale: true)
      @product_not_on_sale = create(:product, on_sale: false)
    end   
    subject { Product.on_sale }
    
    it { should_include @product_on_sale }
    it { should_not_include @product_not_on_sale }
  end
end
```
Vấn đề với các biến **@instance** là chúng bắt đầu tồn tại bất cứ khi nào chúng được tham chiếu. Vì vậy, nếu chúng ta vô tình gõ **@prodect** thay vì **@product**, điều này sẽ đơn giản tạo ra một tham chiếu nil mà có thể cho chúng ta những kết quả giả lập.

Một cách tiếp cận tốt hơn là sử dụng **let**:
```ruby
describe Product do
  describe '.on_sale' do
    let(:product_on_sale) { create(:product, on_sale: true) }
    let(:product_not_on_sale) { create(:product, on_sale: false) }
    subject { Product.on_sale }
    
    it { should_include product_on_sale }
    it { should_not_include product_not_on_sale }
  end
end
```
Bây giờ chúng ta sẽ gặp lỗi nếu chúng ta gõ nhầm tên biến. Hãy cũng có những ưu điểm khác:

* Nó sẽ trả lại cùng một tham chiếu khi sử dụng nhiều lần trong cùng một same example, nhưng không trả về các examples.
* Nó sẽ lazy loaded, do đó bạn sẽ không lãng phí thời gian khi khởi tạo biến mà bạn không cần.

Tất nhiên, có các biến lazy loaded không phải lúc nào cũng lý tưởng - nếu bạn muốn ép buộc các biến được tạo ra, bạn có thể sử dụng lệnh thay thế  **let!** version.
## 4. specify
Có một số  kịch bản mà cú pháp của **it** thực sự trở thành gánh nặng - assertion rất dễ đọc, nhưng khó viết mô tả không chỉ lặp lại assertion. Bạn rõ ràng có thể  để describe ra ngoài, nhưng không đọc tốt hơn tí nào.
```ruby
describe Product do
  describe 'we can only have one featured product' do
    let(:previous_featured_product) { create(:product, featured: true) }
    let(:new_featured_product) { create(:product, featured: false) }
    before do
      new_featured_product.featured = true
      new_featured_product.save
    end
    
    it "the featured product should be updated" do
      Product.featured.should == new_featured_product
    end
    
    it "the old featured product should no longer be featured" do
      previous_featured_product.should_not be_featured
    end
  end
end
```
Một cách tiếp cận tốt hơn là sử dụng **specify** - mà chỉ đơn giản là một *alias* thay cho **it**, nhưng thực sự có thể giúp dễ đọc.

```ruby
describe Product do
  describe 'we can only have one featured product' do
    let(:previous_featured_product) { create(:product, featured: true) }
    let(:new_featured_product) { create(:product, featured: false) }
    before do
      new_featured_product.featured = true
      new_featured_product.save
    end
    
    specify { Product.featured.should == new_featured_product }
    specify { previous_featured_product.should_not be_featured }
  end
end
```
## 5. context
Cái tên nói lên tất cả, **context**(ngữ cảnh) chỉ đơn giản là một block khác (tương tự như **describe**) giúp bạn tổ chức các test của bạn thành các khối logic và cải thiện khả năng đọc. Bạn thực sự có thể tạo ra một số  test có cấu trúc độc đáo nếu bạn tận dụng lợi thế  tương tác của các blocks **let** và **subject**.
```ruby
describe Product do
  describe '#on_sale?'
    subject { build(:product, original_price: 105, price: current_price) }
    
    context 'the current price is equal to the original price' do
      let(:current_price) { 105 }
      it { should_not be_on_sale }
    end
    
    context 'the current price is less than the original price' do
      let(:current_price) { 95 }
      it { should be_on_sale }
    end
  end
end
```
## 6. factories
Đây là một ‘best pratice‘ gây tranh cãi cao.[Steve Klabnik đã viết một bài viết tuyệt vời](http://blog.steveklabnik.com/posts/2012-07-14-why-i-don-t-like-factory_girl)
về lý do tại sao các factories có thể là một ý tưởng tồi và làm thế nào nó có thể làm chậm bộ phần mềm test của bạn. Nó có vẻ không phải là một vấn đề lớn khi bạn chỉ có 200 hoặc 300 test và toàn bộ bộ phần mềm của bạn chạy trong 30 giây, nhưng một khi bạn đạt đến điểm mà toàn bộ bộ test của bạn mất 10 hoặc 15 phút để chạy nó trở nên vô cùng đau đớn vì mất thời gian.

Vì vậy, hãy nhớ rằng, các factories vẫn có thể hữu ích cho việc khởi tạo các đối tượng mặc định. Ví dụ, bạn có thể muốn kiểm tra một cái gì đó trên lớp **OrderService** của bạn. Order luôn được liên kết với một product, vì vậy bạn cần phải tạo một product hợp lệ.
```ruby
describe OrderService do
  describe '.order_for_product' do
    let(:product) { Product.new(sku: '123456') }
    subject { OrderService.order_for_product(product) }
    it { should be_valid }
    its(:product) { should == product }
  end
end
```
Tuyệt vời, chúng ta đang test *service method* của mình mà không cần bất kỳ *factory* nào (hoặc chọc vào cơ sở dữ liệu). Tuy nhiên, một tháng sau đó, lớp **Product** của chúng ta thay đổi đôi chút - giờ đây chúng ta yêu cầu tất cả các sản phẩm phải có giá. Chúng ta viết một test thất bại cho việc *validate* **Product**, chúng ta thêm validation vào class **Product**, chạy bộ test của chúng ta và ... **27 lỗi**. Rất tiếc, mọi nơi mà chúng ta đang khởi tạo **Product** trong các test của chúng ta cần phải thay đổi - chúng ta cần thêm giá ở mọi nơi.

Đây là loại kịch bản mà tôi thấy các factories rất hữu ích. Bạn có thể tránh factories nếu bạn thực sự muốn, nhưng tôi nghĩ rằng bạn đang làm cho mình rất đau khổ.

Tôi đồng ý với Steve rằng, tố c độ của bộ test là quan trọng và nên tránh tác động vào database, nhưng dĩ nhiên bạn luôn có thể truy vấn database mà chẳng cần factory. **Lời cuối cùng: dùng fatories, nhưng thận trọng.**
## 7. matchers
RSpec có một bộ "so sánh" (set of matchers) hoàn toàn thân thiện, thứ cải thiện tính dễ đọc của code cũng như cải thiện các message lỗi.
```ruby
describe Array do
  describe 'with 3 elements' do
    subject(:letters) { ['a','b','c'] }
    specify { letters.include?('d').should == true }
    specify { letters.should include('e') }
  end
end
```
Kết quả của 2 lỗi này là đây:
```
1) Array with 3 elements should == true
   Failure/Error: specify { letters.include?('d').should == true }
     expected: true
          got: false (using ==)
          
2) Array with 3 elements should include "e"
   Failure/Error: specify { letters.should include('e') }
     expected ["a", "b", "c"] to include "e"         
```
Rất dễ  dàng để thấy rằng, các lỗi này dễ đọc hơn. bất kí thuộc tính boolean nào có thể được sử dụng làm matcher, đó là lý do vì sao bạn có thể viết code như thế này đây:
```ruby
describe Product do
  describe '#featured' do
    subject { build(:product, featured: true) }
    it { should be_featured }
  end
end
```
Nhiều thư viện bao gồm các matchers bổ sung và thậm chí bạn có thể viết các matchers tùy chỉnh của riêng bạn.
## 8. shared examples
Shared examples là một tính năng rất hữu ích để loại bỏ trùng lặp giữa các lần kiểm tra, cá nhân người dịch bài này cảm thấy nó giống như nguyên lý dry - "viết một lần dùng mãi mãi". Tôi đã tìm thấy điều này đặc biệt hữu ích khi tôi có hai model có chức năng tương tự. (Ví dụ từ tài liệu RelishApp)
```ruby
require "set"

shared_examples "a collection" do
  let(:collection) { described_class.new([7, 2, 4]) }

  context "initialized with 3 items" do
    it "says it has three items" do
      collection.size.should eq(3)
    end
  end

  describe "#include?" do
    context "with an an item that is in the collection" do
      it "returns true" do
        collection.include?(7).should be_true
      end
    end

    context "with an an item that is not in the collection" do
      it "returns false" do
        collection.include?(9).should be_false
      end
    end
  end
end

describe Array do
  it_behaves_like "a collection"
end

describe Set do
  it_behaves_like "a collection"
end
```
Bạn cũng có thể truyền các tham số cho khối **shared_examples** cho phép bạn linh hoạt trong việc triển khai các thông số kỹ thuật được chia sẻ vào các hành vi "behaves".
## 9. expect
Cú pháp **expect** được giới thiệu trong RSpec 2.11 và rất hữu ích trong các kịch bản mà bạn không sử dụng cú pháp **subject**.
```ruby
describe Product do
  describe 'the default product'
    subject(:product) { Product.new }
  
    it 'should not be on sale' do
      expect(product).not_to be_on_sale
    end
  end
end
```
Nhắc lại, đây là một công cụ khác để cải thiện khả năng đọc mã của bạn. Sự lựa chọn giữa **expect** và **should** chỉ đơn giản là tận dụng khả năng đọc.
## Tài nguyên khác
Nếu bạn hoàn toàn mới học đối với RSpec hoặc Rails thì có hai cuốn sách mà tôi có thể giới thiệu.
![](https://images.viblo.asia/5be1f8e0-08db-4578-a8cd-a7ce1e44cb3c.jpg)
![](https://images.viblo.asia/85c48f72-7072-4168-ba1a-7ed8e27e3d9d.jpg)
Rõ ràng là nhiều mẫu pattern khác có thể được coi là ‘best practices’ trong Behavior Driven Testing - quá nhiều để test, bao nhiêu để  mock/stub, v.v. nhưng chúng không thực sự cụ thể đối với RSpec, đó là những gì tôi đã cố gắng tập trung ở đây.

Happy coding.
## Tham khảo
https://jacopretorius.net/2013/11/rspec-best-practices.html

https://kpumuk.info/ruby-on-rails/my-top-7-rspec-best-practices/