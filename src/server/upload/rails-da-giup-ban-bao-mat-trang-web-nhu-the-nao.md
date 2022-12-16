Khi tiếp xúc với website, có thể các bạn đã từng nghe hoặc đã quá quen thuộc với các lỗ hổng trong website liên quan đến XSS, Cross-Site Request Forgery, SQL Injection. 
Ngày nay, các framework ra đời đã hỗ trợ các phương thức bảo mật sẵn giúp developer hạn chế tối đa việc mắc phải các lỗ hổng huyền thoại đó.
Vậy, khi tiếp xúc với Rails, bạn đã biết Rails giúp bạn bảo mật trang web thế nào chưa?
Bài viết này sẽ giúp bạn hiểu thêm về một số cách Rail đã giúp bạn bảo mật website.

## Cross-site scripting (XSS) 
> Cross-site scripting (XSS) là một loại lỗ hổng bảo mật cho phép kẻ tấn công chèn mã script nguy hiểm vào một trang web. Khi người dùng truy cập trang web sau khi mã đó được nhúng, nó sẽ được thực thi trong trình duyệt của người dùng. TỪ đó, kẻ tấn công có thể lấy cắp cookie của người dùng, hoặc lợi dụng admin để thay đổi thông tin trên hệ thống,...

Có bao giờ bạn thắc mắc rằng, bạn thường sử dụng cặp thẻ `<%= %>` để hiển thị nội dung trong Rails? Thế lỡ nội dung đó chứa các thẻ html, script có mục đích xấu thì sao? 
Ai đó cố tình chèn vào nôi dung bình luận 1 script redirect để chuyển hướng người đọc qua 1 website khác. Nếu sử dụng `<%= %>` để render nội dung comment đó ra thì chẳng phải là đã dính lỗi XSS huyền thoại rồi sao??

 Thật ra, nếu bạn đã từng để ý hoặc thử qua việc dùng cặp thẻ `<%= %>` để render 1 nội dung chứa các thẻ html, script thì sẽ thấy rằng các thẻ đó đã bị loại bỏ và không hiển thị phía Client nữa. Bởi từ rails 3 trở lên đã hỡ trợ phòng tránh XSS  với cơ chế tự động escape. Bạn có thể an tâm khi render nội dung bằng cách sử dụng cặp thẻ `<%= %>`

Tuy nhiên, trong 1 số trường hợp bạn chắc chắn rằng nội dung bạn muốn hiển thị là an toàn, bạn có thể dụng raw hoặc html_safe
```
<%= raw @user.comment %>
<%= @user.comment.html_safe %>
```

## SQL Injection
> SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy - Theo wikipedia
> 

Hầu hết các Framework hiện nay đều cung cấp các provider, ORM (Object-Relational Mapping) giúp tương tác với CSDL một cách an toàn hơn thay vì phải viết SQL thuần. Chúng sẽ tự tạo câu lệnh SQL nên hacker cũng khó tấn công hơn. Và trong Rails, activerecord chính là cây cầu nối đó. Tuy nhiên, không phải activerecord sẽ giúp bạn ngăn chặn Sql injecttion mà còn tùy thuộc vào cách sử dụng của bạn. Nếu không hiểu rõ và cẩn thận trong quá trình code, bạn sẽ vẫn dính SQL Injection.

Để mô tả cho lỗ hổng này, mình sẽ đưa ra ví dụ cụ thể. Khi các bạn gán trực tiếp giá trị truyền vào cho câu lệnh SQL.

**Ex.*** Viết 1 scope với mục đích truyền vào 1 ID. Select từ Database để return Object có id = giá trị đó.*
![](https://images.viblo.asia/f6802cc0-db88-46f3-980d-57e5a4cff074.png)

Mình sẽ viết theo cách dính SQL Injection như sau:   `scope :by_id, ->(id){where("id = #{id}")}`

Khi chạy Scope. Giả sử mình sẽ truyền vào ID chuẩn là 1. Sẽ return được 1 object (Chính xác) 
![](https://images.viblo.asia/a6a95bc7-22d2-41c6-aff4-0d901e63d3f5.png)

Tuy nhiên, mình sẽ cố gắng truyền vào 1 giá trị để "hack" scope trên kia. `User.by_id("1 or 0=0").size`
![](https://images.viblo.asia/5b98bf4c-cfa0-429e-9bc0-65fc99564645.png)

Các bạn có thể thấy rõ ràng chúng ta đã dính SQL injection. Tất cả User đã bị trả về do tham số "1 or 0=0" đã được truyền trực tiếp vào câu lệnh SQL khiến cho câu lệnh or 0=0 luôn đúng nên câu truy vấn SQL đã trả về toàn bộ User có trong database. 

`SELECT COUNT(*) FROM `users` WHERE `users`.`deleted_at` IS NULL AND (id = 1 or 0=0)`

Tuy nhiên, cũng là tham số truyền vào là `"1 or 0=0"` nhưng nếu mình viết Scope theo các parameter được activerecord hỗ trợ chống SQL Injection thì kết quả sẽ khác. Đúng như chúng ta mong đợi
![](https://images.viblo.asia/524dbb7d-e444-4d7f-a0aa-c009b1ebe0f5.png)

## Cross-Site Request Forgery (CSRF)
> CSRF là viết tắt của từ "Cross-Site Request Forgery", đây là một kỹ thuật tấn công sử dụng quyền chứng thực của người dùng để thực hiện các hành động trên một website khác.
> 
Rails xây dựng hệ thống bảo vệ chống lại kiểu tấn công này bằng cách tạo ra các thẻ duy nhất và xác nhận tính xác thực của chúng với mỗi lần gửi thông qua token đã được mã hóa base64.

Nếu hiện tại bạn đang sử dụng Rails, rất có thể bạn đang sử dụng rails trong chính project của mình mà đôi khi không để ý đến. Bởi mặc định trong `application_controller.rb` đã khai báo sẵn một phương thức : `protect_from_forgery with: :exception ` . Đồng thời trong View application.html.erb cũng đã có sẵn một thẻ meta tag `<%= csrf_meta_tags %>`.
Trong các helper liên quan đến form như form_tag, form_for cũng khi bạn sử dụng cũng đều tự động sinh ra các hidden_file chứa token
![](https://images.viblo.asia/bfe596eb-0004-42b1-8b4b-6f8bad8dbd04.png)

Đó là cách cơ bản giúp bạn khai báo và sử dụng được CSRF protection trong ứng dụng Rails

Rails sẽ tự động sinh ra các token này và chúng được nhúng vào trang HTML. Với cùng với đó, token này cũng sẽ được lưu trữ trong session ở phía server. Khi một người dùng tạo 1 request lên hệ thống thì token ở trong html sẽ được gửi lên cùng với request đó thông qua header hoặc params. 
Rails sẽ nhận token được gửi lên cùng với request và token được lưu trong session để so sánh xem chúng có thật sự trùng khớp với nhau hay không. Nếu có hành động mới đựơc thực hiện.