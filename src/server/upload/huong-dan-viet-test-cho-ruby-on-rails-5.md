#  Đặt vấn đề
 Việc testing dù không yêu cầu nhiều kiến thức và là việc những developer như chúng ta đều không thích nhưng chúng ta vẫn thường xuyên phải thực hiện nó. Đôi khi gặp bug logic, tôi thường suy nghĩ rằng: "Phải chi mình đã viết test trước thì không dính phải lỗi này rồi". Và bạn biết đó, chúng ta có hối hận thì cũng đã muộn, cách tốt nhất bây giờ là: "Tìm lại code và sửa thôi". Việc này sẽ vô cùng mất thời gian nếu bạn đã có unit test trước khi bạn bắt tay vào làm. Và nếu bạn đang làm Rails, TDD (Test Driven Development) là cách viét test vô cùng phổ biến trong cộng đồng Rails. Trong bài viết này mình sẽ hướng dẫn các bạn cách viết test và viết code để pass được đoạn test đó.
#  Vì sao lại cần test?
 Trước hết, chúng ta cần hiểu: Tại sao cần viết test?
 Testing sẽ khiến code của bạn chạy một cách chính xác nhất. Đầu tiên, nó sẽ giúp việc coding của bạn trở lên logic hơn. Bạn có thể viết một đoạn test trong model để validate sự tồn tại của email. Sau đó, bạn nhận ra  bạn cần include validate cho password hoặc thêm một thẻ input "password confirmation". Xong phim....
 Một lý do lớn hơn để bạn cần viết test vì bạn cần chắc chắn code của bạn phải chạy đúng khi có project của bạn cần thêm chức năng mới hoặc sửa những chức năng cũ có liên quan đến việc xử lý của bạn. Việc viết test cũng khiến bạn cảm thấy tự tin và chắc chắn hơn khi bạn refactor code của mình. Nếu tất cả các test đã viết được pass truowcs và sau khi thay đổi có nghĩa là bạn đã refactor một cách chính xác. Ngoài ra, còn các phương pháp viết test để bạn có thể tìm thấy issue hoặc bug trong ứng dụng của bạn sau khi code xong để đảm bảo rằng việc maintain và không làm ứng dụng của bạn chết trong tương lai.
#  Các framework sử dụng để testing
Có rất nhiều gem mặc đinh như là một đặc trưng của Rails để áp dụng cho việc test, bạn có thể chọn lựa những phương pháp này để thực hiện cho việc testing.
## 1. RSpec và MiniTest

Sau version mới nhất của Rails, test mặc định MiniTest đã được cải tiến hơn so với Rails Test::Unit. Tuy nhiên hiện tại chúng ta vẫn sử dụng RSpec thay cho MiniTest. RSpec tập trung vào khả năng tổng hợp đọc hàng loạt của các đoạn test. RSpec sử dụng từ khóa “describes” và “it” khi định nghĩa việc test groups và naming trong khi MiniTest sử dụng asset verbiage như các framework test khác.
Ví dụ:
```
describe “the test” do
  it “is a success” do
    expect(1).to eq(1)
  end
end
```
Nói chung là khi sử dụng RSpec bạn sẽ cảm thấy thích nó như tôi vậy, vì nó thực sự dễ dàng để sử dụng và tốt hơn khi bạn sử dụng CLI rất nhiều (Command line interface)
## 2. Capybara Feature Tests vs Integration Tests

Để hỗ trợ tốt hơn cho việc testing của mình, tôi thường sử dụng Capybara để bạn có thể built một test Integration trong quá trình test của mình. Khi bạn muốn test các ứng dụng web của mình bằng cách mô phỏng một người dùng thực sẽ tương tác với ứng dụng của bạn như thế nào (ví dụ như việc khi người dùng click vào button hay khi người dùng nhập form,...), bạn nên sử dụng Capybara.

Capybara là một plugs in trong RSpec với cùng syntax và cú pháp viết test nên bạn có thể hoàn toàn yên tâm khi sử dụng Capybara mà không cần lưu ý quá nhiều đến việc phải viết như thế nào. 
Dưới đây mình có ví dụ sau:
```
describe “the signin process”, type: :feature do
 before :each do
   User.make(email: ‘user@example.com’, password: ‘password’)
 end
 it “signs me in” do
   visit ‘/sessions/new’
   within(“#session”) do
     fill_in ‘Email’, with: ‘user@example.com’
     fill_in ‘Password’, with: ‘password’
   end
   click_button ‘Sign in’
   expect(page).to have_content ‘Success’
 end
end
```
## 3. FactoryGirl

Một plugin tôi muốn nhắc đến cuối cùng là FactoryGirl. 
Như bạn cũng biết, phương pháp test mặc định của Rails là fixtures. Fixtures file được viết với định dạng của YAML. FactoryGirl cho phép bạn khởi tạo các object tĩnh cho việc test của mình. Khi các fixture của bạn cần connect với nhiều model thì việc testing trở lên vô cùng phức tạp, đặc biệt là khi các model của bạn lại có mối quan hệ phức tạp với nhau nữa. FactoryGirl giống như một API để tạo các đối tương cho việc test. Điều ddos có nghĩa là khi testing, bạn có thể sử dụng API thông thường để khởi tạo như `build` hay `create`. FactoryGirl cũng khiến việc testing đơn giản hơn rất nhiều khi bạn có thể include association thông qua việc định nghĩa các factory.

# Các loại test

Có 3 loại test chính mà chúng ta thường xuyên phái test trong Rails là: Test Model, test Controller và test cho View. Thêm vào đó thì đôi khi bạn cũng phải test chức năng. Những đoạn test này cần phải được pass hết trong quá trình bạn coding. Mỗi loại test này cũng có tầm quan trọng và nơi viết riêng.
## 1. Model/Unit Tests

Spec cho model là loại test đơn giản nhất mà bạn cần viết khi bắt đầu viết Test trong Rails. Phần này, bạn chủ yếu cần test những vấn đề đơn giản như các method CRUD (Create/Read/Update/Delete) cho một object với mỗi model. Ngoài ta trong model, chúng ta cần test cả validation và association nữa.
Spec trong model thường sẽ chạy nhanh nhất và độc lập nhất.
Ví dụ:
```
FactoryGirl.define do
  factory :user do
    name “Same Name”
    email “test@user.com”
  end
end
class User < ApplicationRecord
  validates :email, presence: true
  validates :name, presence: true, uniqueness: true
…
describe User do
  it “has a valid factory” do
    expect(FactoryGirl.build(:user).save).to be_true
  end
  it “is invalid without a name” do
    expect(FactoryGirl.build(:user, name: nil).save).to be_false
  end
  it “is invalid without a unique name” do
    user = FactoryGirl.create(:user)
    expect(FactoryGirl.build(:user, name: “Same Name”)).to be_false
  end
  it “is invalid without an email” do
    expect(FactoryGirl.build(:user, email: nil)).to be_false
  end
end
```
Với ví dụ trên, chúng ta đã viết một định nghĩa Factory cho việc tạo một người dùng hợp lệ với những giá trị mặc định trong đó chúng ta định nghĩa việc thành công hay không của một user sẽ được tạo ra với class User như đã được định nghĩa trước đó.
## 2. Controller Tests

Test cho controller sẽ là một phần vô cùng quan trọng khi bạn cần kiểm tra logic của mình trong ứng dụng. Việc test này chủ yếu test các loại yêu cầu được gửi đến, loại user, việc thành công hay thất bạn của Model, ... Spec trong controller chạy chậm hơn Model do chúng còn chịu sự chi phối của vòng đời của một request, tuy vậy nhưng chúng cũng nhanh hơn test chức năng nhiều. Và hãy nhớ răng, ccontroller là nơi chức nhiều việc xử lý nhất trong ứng dụng của bạn.
Ví dụ:
```
describe UsersController do
  describe “GET index” do
    it “assigns @users” do
      user = FactoryGirl.create(:user)
      get :index
      expect(assigns(:users)).to eq([user])
    end
    it “renders the index template” do
      get :index
      expect(response).to render_template(“index”)
    end
  end
  describe “GET #show” do
    it “renders the #show view” do
      get :index, {id:user.id}
      response.should render_template :show
    end
  end
 end
end
```

Trong phần test này, chúng ta đang test cho việc liệt kê tất cả  user trong ứng dụng của bạn. 
Đầu tiên, trong trường hợp chúng ta cần có một output đúng. Sau khi tạo được user, chúng ta gọi đến phương thức `:index`, khi đó trong controller sẽ có biến instance chứa mảng các user trong hệ thống (trong trường hợp này là 1 user) cho việc test.
Đoạn test thứ 2 khá đơn giản, tại action index chúng ta cần render vầ template index

Đoạn test trên khá đơn giản và được giản lược đi rất nhiều để bạn có thể hiểu được cách viết test cho controller mà thôi. Việc test của bạn sẽ còn cần kiểm tra cả hành vi của controller và việc render như thế nào nữa.

## 3. View Tests

Viết spec trong View thường chúng ta hay bỏ qua do chúng ta luôn có cái nhìn trực quan với giao diện chúng. Tuy nhiên, chúng ta vẫn cần viết test cho view vì nếu view không đúng thì khi chúng ta viết feature test sẽ không đạt được sự chính xác cần thiết hay đôi khi bạn cần test việc xử lý if-else trên view.

```
FactoryGirl.define do
  factory :user do
    name “Same Name”
    email “test@user.com”
    admin false
  end
end
<%- if @user.admin? %>
  <h1>Welcome back admin</h1>
<%- else %>
  <h1>Welcome back pal</h1>
<%- end %>
describe “rendering homepage” do
  it “displays admin message” do
    assign(:user, FactoryGirl.create(:user, admin: true))
    render :template => “home/index.html.erb”
    expect(rendered).to match /admin/
  end
  it “displays regular user message” do
    assign(:user, FactoryGirl.create(:user))
    render :template => “home/index.html.erb”
    expect(rendered).to match /pal/
  end
end
```

Trong ví dụ trên, chúng ta có một view đơn giản để render ra message. Message trả ra sẽ phụ thuộc vào việc user có phải là admin hay không.  
## 4. Test Chức năng

Cuối cùng là test chức năng, các tốt nhất để đảm bảo rằng ứng dụng của bạn chạy một cách chính xác với mọi mặt. Sử dụng RSpec và Capybara, bạn sẽ có thể viết một kế hoạch đơn giản cho việc thực hiện các chức năng trong ứng dụng của bạn nếu bạn là end user.

```
describe “Signing Up”, type: :feature do
it “allows a user to sign up” do
 visit root_path
 expect(page).to have_content ‘Sign Up’
 within(“form#user_new”) do
   fill_in ‘Name’, with: ‘John’
   fill_in ‘Email’, with: ‘user@example.com’
   fill_in ‘Password’, with: ‘password’
   fill_in ‘Retype Password’, with: ‘password’
 end
 click_button ‘Sign Up’
 expect(page).to have_content ‘Welcome to Sample App’
 expect(page).to have_content ‘John’
 end
end
```

Đoạn test trên mô phỏng hành động của end user khi thao tác với ứng dụng của bạn, khi lần đầu đăng kí, họ sẽ nhìn thấy form đăng kí, điền vào form và đăng nhập vào ứng dụng sao khi signup.
Như bạn có thể thấy, test chức năng cung cấp một cách tốt nhất để test ứng dụng ở mức high level mà chỉ có người dùng mới có thể thao tác. Tuy nhiên thì việc test chức năng thường chạy chậm hơn các loại test khác.

Trong bài viết sau, mình sẽ giới thiệu về một vài tool hay sử dụng để kiểm soát việc viết test của mình.

Tài liệu tham khảo:
https://hackernoon.com/your-guide-to-testing-in-ruby-on-rails-5-c8bd122e38ad