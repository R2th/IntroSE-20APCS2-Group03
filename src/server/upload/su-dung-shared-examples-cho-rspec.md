Làm việc với Rails chúng ta thường hay nhắc tới việc refactor code để làm đẹp code và tránh những code DRY, đó là việc làm thường xuyên của các developer.Nhưng đôi khi chúng ta ít quan tâm đến code Rspec đẹp hay xấu như code logic trong model.Refactor rspec code cũng là 1 trong những việc chúng ta nên quan tâm khi phát triển phần mềm, để làm cho code đẹp hơn, chạy chính xác các case và tránh lặp code cho rspec chạy nhanh hơn, ...Sau đây mình sẽ nói về việc sử dụng `shared examples` để xử lý DRY code trong Rspec.

Khi chúng ta có rất nhiều specs và đôi khi 1 số describe có hành vi tương tự nhau, khi đó tốt hơn là chúng ta có thể sử dụng `shared examples` để sử dụng cho nhiều specs như vậy.

Đầu tiên, viết specs cho action index trong users controller, đây là code 1 số case của action này:
```
# users_controller_spec.rb
describe "GET #index" do
  before do 
    5.times do
      FactoryGirl.create(:user) 
    end
    get :index
  end
  it {  expect(subject).to respond_with(:ok) }
  it {  expect(subject).to render_template(:index) }
  it {  expect(assigns(:users)).to match(User.all) }
end
# users_controller.rb
class UsersController < ApplicationController
  ....
  def index
    @users = User.all
  end
  ....
end
```

Bên cạnh đó, một số action index ở một số controller khác nhau sẽ có những chức năng khác nhau như: phân trang, search, sort, filer,...

Cuối cùng, tất cả data được trình bày dưới dạng HTML, JSSON hay XML sử dụng APIs.

Chúng ta có posts controller tương tự như users controller như sau:
```
describe "GET #index" do 
  before do 
    5.times do
      FactoryGirl.create(:post)
    end
    get :index
  end
  it {  expect(subject).to respond_with(:ok) }
  it {  expect(subject).to render_template(:index) }
  it {  expect(assigns(:posts)).to match(Post.all) }
end
# posts_controller.rb
class PostsController < ApplicationController
  ....
  def index
    @posts = Post.all
  end
  ....
end
```

Rspec viết chi cả users và posts controller rất tương tự nhau.Trong cả 2 controller chúng ta có các case:
- Response code("OK")
- render partial hoặc view.
- data chúng ta muốn render.

Vậy ở đây để tránh lặp code, chúng ta có thể sử dụng `shared examples`.

### định nghĩa một shared example.

Action index  cần trả về respond với code OK and render index template:

```
RSpec.shared_examples "index examples" do 
  it { expect(subject).to respond_with(:ok) }
  it { expect(subject).to render_template(:index) }
end
```

chúng ta có thể định nghĩa `it`, `describe`, `context` trong shared example.

### Sử dụng shared example.
Add `include_examples "index examples"` vào users và posts controller specs vào trong test của bạn:

```
# users_controller_spec.rb
describe "GET #index" do
  before do 
    5.times do
      FactoryGirl.create(:user) 
    end
    get :index
  end
  include_examples "index examples"
  it {  expect(assigns(:users)).to match(User.all) }
end
# similarly, in posts_controller_spec.rb
describe "GET #index" do
  before do 
    5.times do
      FactoryGirl.create(:post) 
    end
    get :index
  end
  include_examples "index examples"
  it {  expect(assigns(:posts)).to match(Post.all) }
end
```

Ta có thể sử dụng `it_behaves_like` hoặc `it_should_behaves_like` thay vì `include_examples` trong trường hợp này.Lưu ý:

- `include_examples` - includes examples trong context hiện tại
- `it_behaves_like` và `it_should_behave_like` include examples trong nested context.

### Tại sao sự khác biệt này lại quan trọng.
RSpec’s documentation có nói:

*When you include parameterized examples in the current context multiple times, you may override previous method definitions and last declaration wins.*

Vậy khi bạn đối mặt với tình huống các examples chưa các phương thức conflict với các method khác trong cùng 1 context, bạn có thể thay thế `include_examples` với `it_behaves_like` để loại bỏ tình huống này.
```
it { expect(assigns(:users)).to match(User.all) }
it { expect(assigns(:posts)).to match(Post.all) }
```

rspec sau khi refactor của ta như sau:
```
# specs/support/shared_examples/index_examples.rb
# here assigned_resource and resource class are parameters passed to index examples block 
RSpec.shared_examples "index examples" do |assigned_resource, resource_class| 
  it { expect(subject).to respond_with(:ok) }
  it { expect(subject).to render_template(:index) }
  it {  expect(assigns(assigned_resource)).to match(resource_class.all)   }
end
```

```
# users_controller_spec.rb
describe "GET #index" do
  before do 
    ...
  end
  include_examples "index examples", :users, User.all
end
# posts_controller_spec.rb
describe "GET #index" do
  before do 
    ...
  end
  include_examples "index examples", :posts, Post.all
end
```

Bây giờ controller specs đã trông sáng sủa hơn rất nhiều, đặc biệt là trong trường hợp có nhiều case chẳng hạn.