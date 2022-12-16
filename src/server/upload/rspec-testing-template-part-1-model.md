Chào mọi người. Chắc hẳn nếu là một developer thì hẳn ai cũng từng nghe qua khái niệm unit test, cho nên ở đây mình không nhắc đến khái niệm nữa. Và bất cứ ai theo học Rails thì cũng đều học qua về RSpec để viết unit test. Viết thì ai cũng viết được, tuy nhiên trong một dự án, làm thế nào để viết đúng và đủ thì không hẳn ai cũng viết được, nhất là đối với các bạn fresher, chưa có nhiều kinh nghiệm trong việc viết unit test. Vì thế mình viết series về RSpec nhằm giúp các bạn fresher có thể nắm được khi gặp một model, một controller hay là một class trong Ruby thì phải làm thế nào để viết được đủ và đúng.

Trong một dự án Rails thì những thứ mà chúng ta thường hay phải viết Unit Test đó là Model, Controller và Service hoặc thư viện tự định nghĩa. Tất cả cũng đều tương tự như cách mà chúng ta viết Unit Test với một class hay function trong Ruby. Tuy nhiên trong Rails, thì mỗi cái có một đặc trưng riêng, nên mình sẽ giới thiệu từng đắc trưng của mỗi loại qua các bài viết, để các bạn có thể nắm được viết thế nào là đủ và đúng, xây dựng một template sẵn để các bạn có thể tham khảo. Ở bài đầu tiên của series thì mình sẽ giới thiệu đến các bạn cách viết Unit Test cho một model trong Rails như thế nào cho đủ.
Các thư viện mà mình sẽ sử dụng gồm các gem như sau: rspec-rails, shoulda-matchers, shoulda-callbacks, and factory_bot_rails.
## Model thì test những gì ?
Khi làm việc với Rails thì ắt hẳn thanh niên nào cũng phải đụng vào model, vậy trong model có những gì mà chúng ta cần phải test. Dưới đây mình sẽ liệt kê những thành phần mà chúng ta sẽ viết test như sau:
1. Active Model Validation
2. Active Record Associations
3. Callbacks
4. Scopes
5. Public Instance Methods
6. Public Class Methods

Chúng ta sẽ lần lượt đi qua từng thành phần để làm có thể cover hết tất cả. Với mỗi thành phần này chúng ta sẽ để trong một describe riêng nhé các bạn.
### 1. Active Model Validation
Trong Rails cung cấp cho chúng ta rất nhiều kiểu validation, mình có thể tóm gọn chúng bằng những loại sau:
* Basic Validation: là các kiểu validation cơ bản mà hầu như các developer đều thuộc nằm lòng như presence, numericality, uniqueness.
Dưới đây là một đoạn test validate mà mình đã build sẵn.
```
  describe "ActiveModel validations" do
    # http://guides.rubyonrails.org/active_record_validations.html
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/frames
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/Shoulda/Matchers/ActiveModel
    .....
    # Basic validations
    it { expect(bodybuilder).to validate_presence_of(:food).with_message(/you can't get big without your protein!/) }
    it { expect(developer).to validate_presence_of(:favorite_coffee) }
    it { expect(meal).to validate_numericality_of(:price) }
    it { expect(tumblog).to validate_numericality_of(:follower_count).only_integer }
    it { expect(odd_number).to validate_numericality_of(:value).odd }
    it { expect(even_number).to validate_numericality_of(:value).even }
    it { expect(mercedes).to validate_numericality_of(:price).is_greater_than(30000) }
    it { expect(junked_car).to validate_numericality_of(:price).is_less_than_or_equal_to(500) }
    it { expect(blog_post).to validate_uniqueness_of(:title) }
    it { expect(wishlist).to validate_uniqueness_of(:product).scoped_to(:user_id, :wishlist_id).with_message("You can only have an item on your wishlist once.") }
   .....
```
* Format Validations: đây là kiểu validation mà chúng ta thường gặp nhất khi kiểm tra định dạng email, password, hay là một url nào đó, bla...bla.. mà người dùng nhập vào có đúng với định dạng mà mình mong muốn hay không.
```
describe "ActiveModel validations" do
    .....
    # Format validations
    it { expect(user).to allow_value("JSON Vorhees").for(:name) }
    it { expect(user).to_not allow_value("Java").for(:favorite_programming_language) }
    it { expect(user).to allow_value("dhh@nonopinionated.com").for(:email) }
    it { expect(user).to_not allow_value("base@example").for(:email) }
    it { expect(user).to_not allow_value("blah").for(:email) }
    it { expect(blog).to allow_blank(:connect_to_facebook) }
    it { expect(blog).to allow_nil(:connect_to_facebook) }
    .....
end
```
* Inclusion/acceptance of values: đây là kiểu validation để kiểm tra xem giá trị mà người dùng muốn lưu vào database có phải là những giá trị mà ta mong muốn hay không, chỉ có những giá trị mà ta cho phép hoặc thuộc những giá trị mà chúng ta đã quy định từ trước thì mới pass validation.
```
describe "ActiveModel validations" do
    .....
    # Inclusion/acceptance of values
    it { expect(tumblog).to ensure_inclusion_of(:status).in_array(['draft', 'public', 'queue']) }
    it { expect(tng_group).to ensure_inclusion_of(:age).in_range(18..35) }
    it { expect(band).to ensure_length_of(:bio).is_at_least(25).is_at_most(1000) }
    it { expect(tweet).to ensure_length_of(:content).is_at_most(140) }
    it { expect(applicant).to ensure_length_of(:ssn).is_equal_to(9) }
    it { expect(contract).to validate_acceptance_of(:terms) }  # For boolean values
    it { expect(user).to validate_confirmation_of(:password) }  # Ensure two values match
    .....
end
```
### 2. ActiveRecord Associations
Với testing assocition của Record thì đơn giản hơn so với việc check validation, ở đây chúng ta chỉ cần check là đã khai báo đầy đủ các quan hệ giữa các bảng của database trong model mà thôi.
```
describe "ActiveRecord associations" do
    # Associations
    it { expect(profile).to belong_to(:user) }
    it { expect(wishlist_item).to belong_to(:wishlist).counter_cache }
    it { expect(metric).to belong_to(:analytics_dashboard).touch }
    it { expect(user).to have_one(:profile }
    it { expect(classroom).to have_many(:students) }
    it { expect(initech_corporation).to have_many(:employees).with_foreign_key(:worker_drone_id) }
    it { expect(article).to have_many(:comments).order(:created_at) }
    it { expect(user).to have_many(:wishlist_items).through(:wishlist) }
    it { expect(todo_list).to have_many(:todos).dependent(:destroy) }
    it { expect(account).to have_many(:billings).dependent(:nullify) }
    it { expect(product).to have_and_belong_to_many(:descriptors) }
    it { expect(gallery).to accept_nested_attributes_for(:paintings) }
    
    # Read-only matcher
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/Shoulda/Matchers/ActiveRecord/HaveReadonlyAttributeMatcher
    it { expect(asset).to have_readonly_attribute(:uuid) }

    # Databse columns/indexes
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/Shoulda/Matchers/ActiveRecord/HaveDbColumnMatcher
    it { expect(user).to have_db_column(:political_stance).of_type(:string).with_options(default: 'undecided', null: false)
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/Shoulda/Matchers/ActiveRecord:have_db_index
    it { expect(user).to have_db_index(:email).unique(:true)
end
```
Các bạn cần lưu ý, ngoài association ra thì có một chỗ mà các bạn thường hay bỏ qua mà không viết unit test đó là kiếm tra index của cá cột trong database và kiểm tra các giá trị Read-only. Ở đoạn mẫu trên mình đã cung cấp cho các bạn các đoạn mẫu để có thể áp dụng.
### 3. Callbacks
Hiện nay, theo cộng đồng Ruby thì nên hạn chế việc sử dụng callback, vì nếu sử dụng nhiều và lạm dụng thì sẽ rất khó đọc được flow của code. Để viết unit test cho callback thì hiện tại có một gem hỗ trợ khá là ok đó là Shoulda Callback Matchers. Chúng ta chỉ cần cài đặt và viết như sau, gem sẽ support việc testing callback cho chúng ta.
```
  context "callbacks" do
    # http://guides.rubyonrails.org/active_record_callbacks.html
    # https://github.com/beatrichartz/shoulda-callback-matchers/wiki
    
    let(:user) { create(:user) }

    it { expect(user).to callback(:send_welcome_email).after(:create) }
    it { expect(user).to callback(:track_new_user_signup).after(:create) }
    it { expect(user).to callback(:make_email_validation_ready!).before(:validation).on(:create) }
    it { expect(user).to callback(:calculate_some_metrics).after(:save) }
    it { expect(user).to callback(:update_user_count).before(:destroy) }
    it { expect(user).to callback(:send_goodbye_email).before(:destroy) }
  end
```
### 4. Scope
Về bản chất một scope cũng là một class method, tuy nhiên chúng ta lại được khuyên dùng scope hơn là class method, vậy nguyên nhân tại sao =>>> GOOGL IS YOUR FRIEND. Ở bài viết này mình không đề cập sâu những vấn đề trên mà mình chỉ đề cập đến vấn đề viết test cho nó sao cho gọn gàng và đầy đủ, cùng tham khảo mẫu sau của mình nhé.
```
  describe "scopes" do
    # It's a good idea to create specs that test a failing result for each scope, but that's up to you
    it ".loved returns all votes with a score > 0" do
      product = create(:product)
      love_vote = create(:vote, score: 1, product_id: product.id)
      expect(Vote.loved.first).to eq(love_vote)
    end

    it "has another scope that works" do
      expect(model.scope_name(conditions)).to eq(result_expected)
    end
  end
```
### 5. Public instance method và Public class method.
Đây là hai kiểu hàm cơ bản trong Rails nên mình sẽ không đề cập đến nhiều, tuy nhiên khi viết Unit test thì cách viết của chúng khá là giống nhau nên mình sẽ gộp chúng lại trong cùng một mẫu để các bạn cùng tham khảo.
```
  describe "public instance methods" do
    context "responds to its methods" do
      it { expect(factory_instance).to respond_to(:public_method_name) }
      it { expect(factory_instance).to respond_to(:public_method_name) }
    end

    context "executes methods correctly" do
      context "#method name" do
        it "does what it's supposed to..."
          expect(factory_instance.method_to_test).to eq(value_you_expect)
        end
      end
    end
  end

  describe "public class methods" do
    context "responds to its methods" do
      it { expect(factory_instance).to respond_to(:public_method_name) }
      it { expect(factory_instance).to respond_to(:public_method_name) }
    end

    context "executes methods correctly" do
      context "self.method name" do
        it "does what it's supposed to..."
          expect(factory_instance.method_to_test).to eq(value_you_expect)
        end
      end
    end
  end

```
## Kết luận
Ở trên mình đã chia sẻ một template để các bạn nhập môn với RSpec có thể tham khảo để có thể test đầy đủ cho một model. Với mỗi thành phần trong model thì mình đã viết rất chi tiết chỗ nào cần cái gì và test cái gì trong các đoạn code mẫu, hy vọng nó có ích cho các bạn trong các project của các bạn. Ngoài cách viết thế nào cho đủ thì ở trên mình cũng đã đưa có các bạn các trình bày một file RSpec như thế nào cho đẹp và dễ đọc. Các bạn có thể tham khảo bản template đầy đủ [ở đây](https://gist.github.com/buiquangthang/8017c7a29174e7b396d20239be55f2a3). Hẹn gặp lại các bạn ở bài tiếp theo trong series này: RSpec Controller Testing Template.