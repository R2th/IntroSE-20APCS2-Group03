Trong quá trình học và làm việc với ruby thì mình đã tích hợp Rubocop để kiểm tra `coding convention` để code để cải thiện kỹ năng coding hơn. Rubocop đã giúp cho mình kiểm tra, đưa ra những suggestions và cách refactor.

Nếu như đã quá chán với những suggestions đơn giản như thay đổi về  dư thừa space, line trống... thì rubocop hỗ  trợ chúng ta option `rubocop -a`. Như mọi khi mình check rubocop trước khi push code thì có nhận được một message như này " `'Assignment Branch Condition size for [method] is too high. [xx/xx]`". Mình bắt đầu tìm hiểu nó là cái gì? và làm sao để fix nó để sau này gặp lại fix nhanh hơn.
# ABC là gì?
Theo định nghĩa trong [Rubocop](https://www.rubydoc.info/gems/rubocop/0.27.0/RuboCop/Cop/Metrics/AbcSize)
```
The ABC size is computed by counting the number of assignments, branches and conditions for a section of code. The counting rules in the original C++ Report article were specifically for the C, C++ and Java languages.
```

ABC size nó được tính bằng căn bậc 2 tổng bình phương của
- **A**ssignments: (bất cứ cái gì với phép gán)
- **B**ranchs: (gọi function, gọi class, hoặc với toán tử new)
- **C**ondition (Bất cứ cái gì với các phép logic `if`, `case`, `?`)

```
|ABC| = sqrt((A*A)+(B*B)+(C*C))
```
Giá trị mặc định của ABC Metric là 15 (tùy thuộc vào setting). Vậy 15 nghĩa là gì?
Chúng ta sẽ tính ngược lại một chút: 15*15 => 225; 225/3 => 75; Math.sqrt(75) ~=> 8.66
Như vậy để có ABC Metric là 15 chúng ta cần:
- 8 Assignments
- 8 Branches
- 8 Condition

Vì vậy để giảm giá trị ABC value chúng ta cần sử dụng ít biến trung gian hơn (các phép gán), ít các gọi các phương thức và điều kiện.

# Một số cách refactor
Đến đây chắc bạn cũng có một vài ý tưởng để giải quyết vấn đề, ở đây mình đưa 2 giải pháp mình thường dùng
Nếu các trong đoạn code có đoạn if/else để xử lý, nếu tách được hãy đưa nó ra các method helper.
Ví dụ ta có đoạn code login đơn giản sau:
```ruby
def login
  user = User.find_by(email: sess_param[:email].downcase)
  if user&.authenticate(sess_param[:password])
    if user.activated?
      log_in user
      sess_param[:remember_me] == "1" ? remember(user) : forget(user)
      redirect_back_or user
    else
      flash[:warning] = "Account not activated"
      redirect_to root_url
    end
  else
    flash.now[:danger] = "Login failed"
    render :new
  end
end
```
Ta sẽ tách đoạn kiểm tra activated thành 1 method helper khi đó method cực kì gọn và dễ  hiểu đúng không nào
```ruby
def login
  user = User.find_by(email: sess_param[:email].downcase)
  if user&.authenticate(sess_param[:password])
    user_actived? user
  else
    flash.now[:danger] = "Login failed"
    render :new
  end
end
```
hoặc nếu bạn sử dụng phép gán instance method (biến @) thường xuyên nên dùng callback để hạn chế phép gán.
ví dụ như sau
```ruby
def show
  @category = Category.friendly.find(params[:id])
  @categories = Category.all
  # Something
end
```
sẽ viết thành

```ruby
before_action :fetch_current_category,:fetch_categories, only: :show

def show
  # Something
end
private

def fetch_current_category
  @category = Category.friendly.find(params[:id])
end

def fetch_categories
  @categories = Category.all
end
```

# Tổng kết
Qua bài viết chắc bạn cũng đã hiểu về ABC Size là gì và giúp refactor lại code mình một cách ngắn gọn hơn.

http://redgreenrepeat.com/2017/01/20/understanding-assignment-branch-condition/
https://stackoverflow.com/questions/30932732/what-is-meant-by-assignment-branch-condition-size-too-high-and-how-to-fix-it