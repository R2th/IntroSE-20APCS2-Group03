Bài viết này sẽ chia sẻ một số nguyên tắc tôi đúc kết được khi phát triển các ứng dụng Ruby on Rails. Những điều này thường ít được các developer chú trọng tới, đặc biệt là những developer mới vào nghề. Nhưng chúng đã giúp tôi rất nhiều trong quá trình làm việc từ lúc bắt đầu học RoR đến nay, vậy nên nếu bạn chưa áp dụng chúng, tôi hi vọng bạn sẽ thử sau khi đọc hết bài viết. Tôi sẽ giới thiệu lần lượt từng chủ đề một và cung cấp các tài liệu mà tôi thấy hữu ích khi mới tiếp cận lần đầu.

## Viết test
Hãy bắt đầu với unit test trước. Nếu bạn tự tin rằng ứng dụng của bạn hoạt động ổn định, bạn sẽ phải viết test. Rails cung cấp một framework mặc định hỗ trợ cho việc viết test là **Minitest**, nhưng tôi và đa số lập trình viên khác thích sử dụng **RSpec** hơn.

**Test-driven development - TDD** là quy trình làm việc mà bạn phải tạo các test trước, sau đó lần lượt hoàn thiện các chức năng sao cho chúng vượt qua được các test này. Thoạt nhìn điều này có vẻ rất mất thời gian, bạn vừa phải quyết định xem sẽ test chức năng gì, viết test cho chức năng đó, vân vân và mây mây. Nhưng dần dần bạn sẽ thấy được lợi ích của quá trình này, đặc biệt là trong tốc độ công việc. Viết test giúp việc thêm các chức năng mới, thay đổi code, hay refractor lại code nhanh hơn rất nhiều. Bạn sẽ không phải bật lại trình duyệt sau mỗi thay đổi để kiểm tra đoạn code có hoạt động hay không. Dưới đây là các tài liệu về TDD mà tôi đã tham khảo trong quá trình học TDD:
* [**Cài đặt một ứng dụng Rails cho TDD và BDD (Behavior-Driven Development) với Rspec và Capybara**](https://www.startuprocket.com/articles/how-to-setup-a-rails-app-for-test-driven-and-behavior-driven-development-with-rspec-and-capybara)
* [**Những ví dụ đầu tiên về RSpec trong Rails - SitePoint**](https://www.sitepoint.com/learn-the-first-best-practices-for-rails-and-rspec/)
* [**Test-Driven Development là gì và tại sao bạn phải quan tâm đến nó**](http://blog.thefirehoseproject.com/posts/test-driven-development-rspec-vs-test-unit/)
* [**Kiểm thử với RSpec Test và Capybara**](https://robots.thoughtbot.com/rspec-integration-tests-with-capybara)

## DRY
Rails khuyến khích DRY - viết tắt của **Don't Repeat Yourself** (đừng lặp lại bản thân). Ý tưởng của DRY rất đơn giản: hãy tái sử dụng code của bạn bất cứ khi nào có thể thay vì lặp lại các đoạn code giống nhau. Nó giúp bạn tiết kiệm thời gian, giảm lỗi, và code sạch đẹp hơn. Joel Abrahamsson đã viết một bài rất chi tiết về giá trị của DRY trong lập trình ở link sau: http://joelabrahamsson.com/the-dry-obsession/

## Các nguyên tắc của Sandi Matz

Sandi Matz là một lập trình viên Ruby rất nổi tiếng. Bà là tác giả những cuốn sách ***Lập Trình Hướng Đối Tượng trong Ruby*** và ***99 Bottles of OOP***. Đây là một vài nguyên tắc hữu ích mà tôi đã áp dụng:
#### 1. Một class không nên quá 100 dòng
Bạn có thể thêm các chức năng vào class bằng cách **include** hoặc **extend** các modules. Việc này giúp các class của bạn ngắn gọn và rõ ràng hơn. Dưới đây là một số tài liệu giải thích sự khác nhau giữa prepend, include và extend modules trong Ruby:
* **[Include và Extend trong Ruby](https://devblast.com/b/include-vs-extend-ruby)**
* [**Ruby modules: Include và Prepend và Extend**](http://leohetsch.com/include-vs-prepend-vs-extend/)
#### 2. Methods không nên quá 5 dòng
Method của bạn càng ít dòng thì càng dễ hiểu. Tên của method nên thể hiện được chức năng nó thực hiện. Luật 5 dòng cũng được áp dụng cho các lệnh if-else. Nhưng tôi biết việc viết các method chỉ trong 5 dòng là bất khả thi, vậy nên bạn không nhất thiết phải giới hạn mọi thứ trong 5 dòng, nhưng hãy cố gắng viết method càng ngắn gọn càng tốt. Bạn có thể tham khảo link sau về việc viết methods trong Ruby: 
* [**Làm thế nào để viết các methods trong Ruby tốt hơn - Kỹ thuật viết method**](https://medium.com/learning-how-to-code/how-to-write-better-ruby-methods-the-composed-method-technique-a0326151e1ad)
#### 3. Không truyền quá 4 tham số vào một method
Quá nhiều tham số có thể gây:
- Phức tạp
- Ít thay đổi hiệu quả
- Khó khăn trong quá trình test

Càng ít tham số method của bạn sẽ càng đơn giản. 
#### 4. Một action trong controller chỉ nên có một biến instance
Với một biến instance duy nhất, bạn sẽ kiểm soát biến tốt hơn và tránh được việc ghi đè chúng. Các templates của bạn cũng sẽ rõ ràng và dễ đọc hơn.
* **[Kĩ thuật Facade trong Rails](https://medium.com/kkempin/facade-design-pattern-in-ruby-on-rails-710aa88326f)**

Nếu muốn đọc thêm về các nguyên tắc của Sandi, bạn có thể truy cập đường link sau: **[Nguyên tắc Sandi Metz cho Developers](https://robots.thoughtbot.com/sandi-metz-rules-for-developers)**

## Tách methods
Mỗi method cần được đặt tên thể hiện đúng mục đích của chúng. Bạn viết code cho đồng nghiệp của bạn đọc chứ không phải cho máy. Method bạn viết có tên càng cụ thể, đồng nghiệp của bạn càng dễ nắm bắt mục đích của nó. Việc tạo mới một method cho từng mục đích riêng rẽ sẽ giúp việc debug và test dễ dàng hơn.

## SOLID
Solid và viết tắt của một kĩ thuật design pattern trong lập trình. Từng kí tự đại diện cho

* **Single Responsibility** - Đơn nhiệm
* **Open-closed** - đóng theo hướng mở
* **Liskov substitution** - thay thế Liskov
* **Interface segregation** - tách riêng các interface
* **Dependency inversion** - tương thích động

Michael Feathers - thành viên của Object Mentor Interational đã tạo ra SOLID. Áp dụng SOLID trong quá trình làm việc sẽ giúp code của bạn linh hoạt, dễ hiểu và dễ bảo trì hơn.

* [**Nguyên tắc SOLID trong ruby**](https://subvisual.co/blog/posts/19-solid-principles-in-ruby/)
* [**Quay về những điều cơ bản: SOLID**](https://robots.thoughtbot.com/back-to-basics-solid)
* [**Ruby Blog - Blog về Ruby và Ruby on Rails**](http://rubyblog.pro/?page=2) (bài viết này giải thích kĩ càng từng nguyên tắc một)

## N+1 Query
N+1 là một vấn đề của ORM (ActiveRecord) gây ảnh hưởng tới hiệu năng ứng dụng của bạn, chúng làm tăng số lượng truy vấn tới cơ sở dữ liệu. N+1 thường xảy ra khi bạn cần lấy dữ liệu từ các bảng liên quan tới nhau. Ví dụ:
```
class User
  has_many :posts
end

class Post
  belongs_to :user
end

posts = Post.last 10
posts.map{|post| post.user.name}
```
Đoạn code trên sẽ sinh ra 11 câu truy vấn tới cơ sở dữ liệu. Câu truy vấn đầu lấy dữ liệu 10 bài post cuối cùng, sau đó lại 10 câu truy vấn nữa để lấy ra tên của từng user của mỗi post. Nhưng với Rails, chúng ta có thể tối ưu lại đoạn code trên:
```
posts = Post.includes(:user).last 10
posts.map{|post| post.user.name}
```
Sau khi thêm `includes(:user)`, chúng ta chỉ còn lại 2 câu truy vấn. Bạn có thể tìm hiểu sâu hơn về N+1 trong những bài viết dưới đây:

* **[Hiểu rõ về joins, includes, preload và eager_load trong ActiveRecord](http://blog.scoutapp.com/articles/2017/01/24/activerecord-includes-vs-joins-vs-preload-vs-eager_load-when-and-where)**
* **[Tăng tốc trong Rails: Loại bỏ N+1](https://semaphoreci.com/blog/2017/08/09/faster-rails-eliminating-n-plus-one-queries.html)**
* **[Loại bỏ N+1 queries trong ứng dụng Ruby on Rails](http://www.diatomenterprises.com/remove-n1-queries-in-your-ruby-on-rails-app/)**
* [**10 mẹo để tránh N+1 queries trong Rails**](https://medium.com/@codenode/10-tips-for-eager-loading-to-avoid-n-1-queries-in-rails-2bad54456a3f)


## Memoization (Ghi nhớ)
Ghi nhớ (Memoization) là quá trình lưu lại kết quả của một method mất nhiều thời gian thực thi. Khi bạn gọi lại method này, nó sẽ trả lại kết quả đã được lưu trữ. Kĩ thuật này giúp bạn tiết kiệm công sức bằng cách sử dụng lại các kết quả đã được tính toán. Ví dụ bạn phải tạo một bản báo cáo cho từng công ty trong ứng dụng của bạn, hãy tưởng tượng một bảng có tên công ty ở phần đầu trang và các hoạt động theo ngày của công ty ở phần nội dung.
```
class CompaniesController
  def index
    @companies ||= Company.all
  end
  
  private
  
  helper_method :grouped_by_day_activities
  helper_method :activities_count
  
  def grouped_by_day_activities
    @grouped_by_day ||= Activity.all.group_by(&:day)
  end
  
  def activities_count
  @activities_count ||= grouped_by_day_activities.map do |day, activities|
    grouped_by_company_activities_count = activities.group_by(&:company_id).map do |c_id, activities|
      [c_id, activities.count]
    end.to_h
    [day, grouped_by_company_activities_count]
  end.to_h
end
end
# activities_count =>
# { ‘1/1/2018’: { 1: 10, 2: 6, 3: 9 },
# ‘2/1/2018’: { 1: 5, 2: 4, 3: 7} }
# /companies/index.html.erb
<table>
    <thead>
        <th>Date</th>
        <% @companies.each do |comp| %>
            <th><%= comp.name %></th>
        <% end %>
    </thead>
    <tbody>
        <% grouped_by_day_activities.each do |day, activities| %>
            <tr>
                <td>Day</td>
                <% @companies.each do |company| %>
                    <%= activities_count.fetch(day).fetch(company.id, 0) %>
                <% end %>
            </tr>
        <% end %>
    </tbody>
</table>
```

Trong trường hợp này, mỗi method trong controller đều sử dụng memoization. Memoization được khai báo bằng một kí hiệu **||=** (or eq). Biến `@companies` được gọi lần đầu ở phần đầu trang và lần thứ hai ở phần body. Chúng ta đã giảm được một câu truy vấn bằng cách sử dụng memoization.

Một method khác là `grouped_by_day_activities` thực hiện việc nhóm các hoạt động theo ngày. Lần đầu nó xuất hiện ở phần body của bảng và lần thứ hai ở method `activities_count`.

`activities_count` method trả lại một hash gồm id của công ty và số lượng hoạt động. Nó cũng được ghi nhớ. Đây là method được thực thi nhiều nhất và được gọi lại ở từng ô của bảng. Hãy tưởng tượng bạn sẽ phải mất nhiều thời gian thế nào khi phải gửi từng yêu cầu tới cơ sở dữ liệu ứng với từng ô. Thay vào đó bạn có thể sử dụng lại kết quả của các methods. Bạn cũng có thể ghi nhớ động bằng kỹ thuật **metaprogramming**
* **[4 patterns đơn giản cho việc memoization trong Ruby](https://www.justinweiss.com/articles/4-simple-memoization-patterns-in-ruby-and-one-gem/)**
* [**Cơ bản về memoization trong Ruby**](http://gavinmiller.io/2013/basics-of-ruby-memoization/)
* **[Memoization trong Ruby](https://atech.blog/atech/memoization-in-ruby)**
* [**Hướng dẫn của một lập trình viên Ruby về lưu trữ**](http://blog.honeybadger.io/rubyist_guide_to_memoization/)
* **[Memoization trong Ruby sử dụng Metaprogramming](http://nithinbekal.com/posts/ruby-memoization/)**

## Authentication (chứng thực)
Authentication là một cơ chế xác nhận đối tượng và các quyền. Nó cho phép bạn ẩn đi một số chức năng trong ứng dụng của bạn với người dùng chưa đăng ký. Một trong những gem nổi tiếng nhất của Rails về authentication là **[Devise](https://github.com/plataformatec/devise)**.

## Rails Authorization
Authorization đảm bảo người dùng có quyền thực hiện một hành động. Giả sử chúng ta có ba loại người dùng trong ứng dụng: admin, khách, quản lý. Chúng ta chỉ muốn admin và quản lý có quyền chỉnh sửa bài viết.
```
if user.role == "admin" || user.role == "manager"
<%= link_to "Edit post", edit_post_path(post) %>
```

Ứng dụng sẽ có một loạt các điều kiện như trên. Nhưng một ngày nọ chúng ta muốn khách cũng có thể chỉnh sửa được bài viết. Bây giờ chúng ta lại phải lần lượt tìm từng file và thay đổi lại điều kiện:
```
if user.role == "admin" || user.role == "manager" || user.role == "guest"
```
Với gem **pundit**, ứng dụng sẽ có thêm một thư mục là `policies`, nơi chứa các logic của việc phân quyền cho từng đối tượng. Hãy cùng xem file policy của người dùng:
```
class UserPolicy
  def can_edit_post?
    user.role == "admin" || user.role == "manager" || user.role == "guest"
  end
end
```

Câu lệnh if sẽ được viết lại như sau:
```
if policy(user).can_edit_post?
<%= link_to "Edit post", edit_post_path(post) %>
```

Việc thay đổi một dòng lệnh trong class user policy sẽ dễ dàng hơn nhiều mỗi khi chúng ta thay đổi lại logic của việc phân quyền. Nó sẽ giúp tiết kiệm thời gian và tránh được các bug khi phân quyền. Ngoài gem pundit bạn có thể tham khảo sử dụng một gem phân quyền nổi tiếng khác là **CanCanCan**
* **[ryanb/cancan](https://github.com/ryanb/cancan)**
* **[varvet/pundit](https://github.com/varvet/pundit)**
* **[Rails Authorization với Pundit](https://medium.freecodecamp.org/rails-authorization-with-pundit-a3d1afcb8fd2)**

## 7 patterns để refractor lại ứng dụng Rails
**Refractor** (tái cấu trúc code) là quá trình làm code của bạn nhanh hơn, dễ đọc hơn, và dễ bảo trì hơn mà không phải thay đổi các phương thức trong code. Các bài viết dưới đây sẽ giới thiệu các patterns thông dụng nhất trong việc tái cấu trúc lại ứng dụng Rails
* **[7 Design Pattern giúp refractor các thành phần MVC trong Rails - SitePoint](https://www.sitepoint.com/7-design-patterns-to-refactor-mvc-components-in-rails/)**
* **[7 Patterns giúp refractor lại các Fat Models trong Active Records](https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models/)**

## Background Jobs
Chắc chắn mọi người đều hiểu được sự cần thiết của tốc độ trong ứng dụng, do đó **background jobs** là một kĩ thuật quan trọng trong việc tạo ra những ứng dụng có phản hồi nhanh nhất có thể. Một background job (còn được biết với cái tên khác là job không đồng bộ - asynchronous job) thực thi các tác vụ tiêu tốn nhiều thời gian ngoài luồng xử lý chính trong ứng dụng. Thông thường một ứng dụng khi nhận được tin nhắn, nó sẽ cố gắng phản hồi trong vòng vài mili giây. Nhưng khi ứng dụng của bạn phải tiếp nhận một lượng lớn dữ liệu và cần nhiều thời gian để xử lý, background jobs là giải pháp tuyệt vời. Nó thực thi các tác vụ như bình thường nhưng sử dụng một luồng khác để xử lý. Bằng cách này bạn có thực hiện các tác vụ phức tạp mà không phải lo quá thời gian - timeouts. Một trong những gem phổ biến trong việc xử lý background jobs là **Sidekiq**
* **[mperham/sidekiq](https://github.com/mperham/sidekiq)**

## Screencast
Đây là một screencast rất hữu ích mà tôi muốn chia sẻ với các bạn: rubytapas. Có rất nhiều video hướng dẫn trải dài từ kiến thức cơ bản tới các kĩ thuật, khái niệm nâng cao trong lập trình và các nguyên tắc refractor, vân vân. 
* **[RubyTapas](https://www.rubytapas.com/)**

## Kết luận
Khi bắt đầu học Ruby on Rails, các tài liệu tham khảo trên đã giúp tôi hiểu hơn về Rails và hoàn thành các task tôi phải làm. Sự hỗ trợ từ các developers giàu kinh nghiệm hơn cũng rất quan trọng. Tôi may mắn nhận được sự hướng dẫn của một mentor và các kiến thức, sự hỗ trợ cũng như kiên nhẫn của anh ấy đã giúp tôi học được nhiều thứ. Tôi vẫn còn phải cố gắng nhiều, nhưng trong thời điểm tôi viết bài này, tôi cảm thấy mình cần phải làm gì đó cho cộng đồng Rails, tôi muốn chia sẻ kiến thức của mình tới cộng đồng như những gì mà anh mentor đã làm cho tôi ngày đấy.

Khi học một thứ gì đó phức tạp, điều quan trọng nhất bạn cần phải nhớ là không được bỏ cuộc. Tôi đã có một khoảng thời gian tệ hại khi học Rails. Mỗi sáng thức dậy tôi đều nghĩ "*mình chả biết gì cả, mình là một đứa vô dụng tệ hại.*" Đôi khi tôi dành cả ngày chỉ để hoàn thành một task mà tôi biết nếu là người khác thì họ có thể giải quyết trong 5 phút. Nhưng tôi không bỏ cuộc, và sau vài tháng thì tôi đã hiểu hơn cách mọi thứ hoạt động như thế nào.

Hãy kiên nhẫn và tin vào chính bản thân bạn.

## Tham khảo
> https://medium.com/@petro.yakubiv/twelve-tips-your-rails-mentor-should-have-shared-with-you-if-you-had-one-f385bdd61e1c