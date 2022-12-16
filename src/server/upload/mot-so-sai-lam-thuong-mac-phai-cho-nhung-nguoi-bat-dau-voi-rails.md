Ruby on Rails là một framework phổ biến được xây dựng bằng NNLT Ruby, hẳn các bạn cũng từng nghe qua hoặc đã sử dụng nó. Rails được xây dựng dựa trên nguyên tắc **Convention over configuration**. Theo đó, Rails rất dễ sử dụng, tuy nhiên cũng rất dễ trong việc sử dụng sai. Bài viết hôm nay mình sẽ chia sẽ một số sai lầm những người bắt đầu với Rails thường mắc phải (trong đó có mình), cũng như làm thế nào để tránh những sai lầm mắc phải này.

### 1. Đặt quá nhiều logic trong Controller

Rails được xây dựng trên mô hình MVC. Chúng ta cũng được nghe khá nhiều về **Fat model, thin controller**. Bắt đầu với Rails, bạn sẽ cảm thấy việc đặt những logic vào controller khá là dễ dàng, ví dụ những logic trong helper, hay thậm chí là những câu query đáng lẽ ra nó phải nằm ở model. Lúc này controller của bạn đã vi phạm nguyên tắc mỗi controller chỉ nên làm 1 việc đúng nhiệm vụ của nó, làm cho việc sửa code hoặc maintain trong tương lai sẽ trở nên khó khăn.

Thông thường, controller của bạn chỉ nên xử lý những việc sau:

- Xử lý về session và cookie, cũng như authentication, authorization
- Tìm kiếm đúng những dữ liệu cần thiết cho model trả về view
- quản lý các request parameter
- Render/Redirect kết quả

### 2. Đặt quá nhiều logic trong view

Rails ERB là một cách tuyệt vời để xây dựng các trang web với nội dung động. Tuy nhiên hãy thận trọng nếu bạn nhúng quá nhiều code Ruby vào HTML, để rồi đến một ngày khi nhìn lại bạn không còn nhận ra mình đang làm cái gì nữa. Hãy tránh sử dụng logic trong view, hãy đưa vào helper, code của bạn sẽ nhìn sáng sủa hơn, và còn có thể dùng lại ở đâu đó trên một trang view khác nữa. Ví dụ đơn giản

Thay vì sử dụng logic trong view như thế này

```ruby
<h1>
  Welcome
  <% if user_signed_in? %>
    <%= current_user.name %>
  <% else %>
    Guest
  <% end %>
</h1>
```

Bạn hoàn toàn có thể đưa nó vào helper

```ruby
def current_user_name
  user_signed_in? ? current_user.name : "Guess"
end

<h1>Welcome <%= current_user_name %></h1>
```

- Hãy sử dụng các layout hoặc partial để đóng gói những thứ lặp lại trên view của bạn
- Sử dụng present/decorator để xử lý các logic rồi đưa ra kết quả cuối cùng cho view

### 3. Đặt quá nhiều logic trong model

Có vẻ mâu thuẩn nhỉ, ở mục 1 chúng ta có nói **Fat model, thin controller**, vậy thì đặt logic nhiều vào model có gì sai? Không có gì sai, tuy nhiên model của bạn sẽ càng ngày càng phình to, rồi đến một lúc bạn sẽ cảm thấy mệt mỏi khi đọc lại những cái file đó. Giải quyết vấn đề này, hãy áp dụng các design pattern như: Service Object, Query Object, Form Object, ... file model của bạn sẽ trở nên nhẹ nhàng hơn, và thật thoải mái khi làm việc với chúng

### 4. Sử dụng quá nhiều gem

Ruby và Rails cung cấp cho chúng ta một hệ sinh thái Gem phong phú với bất cứ một chức năng nào mà các developer có thể nghĩ đến. Với gem file bạn có thể xây dựng những chức năng đơn giản một cách dễ dàng với những dòng code đơn giản. Tuy nhiên, hãy cân nhắc khi dùng gem. 
- Dùng càng nhiều gem hệ thống của bạn sẽ load càng nhiều code và tất nhiên performance sẽ bị ảnh hưởng. 
- Dùng nhiều gem bạn sẽ không control được code của mình nó đang làm cái gì

Dùng gem đúng mục đích và đừng quá lạm dụng nó.

### 5. Bỏ qua log file

Chắc hẳn ai cũng biết được mặc định những file log sẽ được tự động sinh ra và ghi lại những hoạt động của ứng dụng trong quá trình phát triển trên localhost, cũng như sản phầm đã đưa đến tay người dùng. Tuy nhiên, hẳn là cũng không ít người ngó ngàng đến những dòng log vô vị này, họ chỉ cần thấy ứng dụng chạy là vui lắm rồi. Hãy luôn tạo thói quen xem log khi chạy ứng dụng, điều này rất là quan trọng. Bạn sẽ thấy ngay những lỗi nhìn được trước khi sản phẩm đưa đến tay người dùng. Ví dụ phổ biến nhất có lẽ là N+1 query

```ruby
# users_controller
users = User.all

# users/index.html
users.all.each do |user|
  # show something
  user.news.count
end
```

Khi thực thi để show thông tin ở trang view, bạn sẽ thấy đầy đủ việc query ở trong log

```ruby
SELECT `users`.* FROM `users`SELECT `users`.* FROM `users`
SELECT COUNT(*) FROM `news` WHERE `news`.`user_id` = 1
SELECT COUNT(*) FROM `news` WHERE `news`.`user_id` = 2
SELECT COUNT(*) FROM `news` WHERE `news`.`user_id` = 3
SELECT COUNT(*) FROM `news` WHERE `news`.`user_id` = 4
.....
```

Bạn nhận thức được tác hại của N+1 query, nhưng vô tình code không để ý. Lúc này với thói quen nhìn file log mỗi lần thực thi sẽ giúp bạn fix được những lỗi có thể nhìn thấy.

### 6. Bỏ qua unit test

Vấn đề này có lẽ đã được bàn luận quá nhiều. Unit test là gì? Tại sao phải viết unit test? Viết unit test thế nào cho đúng? Các bạn có thể đọc bất cứ bài viết nào, hẳn nội dung cũng tương tự nhau thôi :D

### 7. Vấn đề từ việc gọi service từ bên ngoài

Ngày này hầu hết các ứng dụng đều cho phép các ứng dụng khác tương tác thông qua hệ thống API được public. Bạn đang viết một ứng dụng trong đó có hoạt động gọi API để lấy thông tin từ bên ngoài như Facebook, Google, hoặc một bên thứ 3 nào đó. Bạn đặt những dòng code thực thi việc gọi và lưu dữ liệu từ bên thứ 3 ngay trong những request thông thường của ứng dụng của bạn. Sẽ thế nào nếu quá trình gọi đó xảy ra rất chậm? Người dùng ứng dụng của bạn sẽ phải chờ, trong khi server của bạn lại rất ngon, xử lý các request trong vòng chưa tới 1 nốt nhạc. 

Giải quyết vấn đề này, hãy đưa việc gọi này xuống background job, nó sẽ thực thi ngầm cho bạn mà không ảnh hưởng đến những luồng xử lý thông thường trong ứng dụng của bạn. Vf hãy chú ý đặt log cẩn thận kẻo có lỗi bất ngờ xảy ra lại không biết đường nào mà lần :D

Rails có các gem hỗ trợ cho việc này như: Sidekiq, Delayed job, Resque


### 8. Đưa mọi thứ lên Github

Khi bắt đầu với việc code nói chung, và với Rails nói riêng, hẳn các bạn chỉ chăm chăm code làm sao cho chạy ngon lành, sau đó lưu lại thành quả của mình bằng cách push code lên 1 repository nào đó (chắc đa số là Github :D). Tuy nhiên, hãy nhận thức rằng đâu là dữ liệu có thể push, đâu là dữ liệu không nên push. Git cho phép bạn ignore những file mà bạn chỉ định trong **.gitignore**. 

Hãy nhét những file config như database.yml, secrets.yml, ... Những file này sẽ không bao giờ được đưa lên Github dì bạn có gõ lệnh gì đi nữa.

Với những secret_id, hoặc những dữ liệu nhạy cảm phải đưa vào trong code, hãy quản lý chúng bằng biến môi trường. Có thể sử dụng file quản lý biến môi trường của hệ điều hành. Hoặc Rails cung cấp gem **dotenv**, bạn chỉ cần tạo file **.env** và nhét tất cả biến môi trường của dự án vào đây, cuối cùng là đưa file nào vào **.gitignore**, những dữ liệu này sẽ chỉ nằm trên local mà thôi :D

### Kết

Rails là một framework mạnh mẽ, dễ học dễ sử dụng. Tuy nhiên, dù nó có mạnh mẽ thế nào, hỗ trợ bạn đến răng như thế nào đi chăng nữa, thì điều quan trọng nhất là bạn phải hiểu bạn đang làm gì, Rails nó giúp bạn những cái gì, từ đó đưa ra những phương án tối ưu nhất để đảm bảo ứng dụng có được chất lượng tốt nhất.

Thank for your reading!