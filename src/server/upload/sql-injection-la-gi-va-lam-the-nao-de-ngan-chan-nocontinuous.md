Xin chào mn, ở [phần trước](https://viblo.asia/p/sql-injection-la-gi-va-lam-the-nao-de-ngan-chan-no-gAm5yWwAZdb) mình đã giới thiệu sơ qua về khái niệm của SQL Injection và một số cách tấn công từ lỗ hổng này. Như đã hứa hôm nay mình sẽ tiếp tục chia sẻ về làm thế nào để ngăn chặn SQL Injection, mình nghĩ vấn đề này khá là bổ ích cho một developer. Bây giờ chúng ta đi vào vấn đề chính nào và xem nó có gì hay ho để cho ta học hỏi ko nhé!!!

Trước khi đi vào chi tiết mình xin giới thiệu sơ qua về nội dung, nội dung sẽ xoay quanh vấn để khắc phục SQL Injection và mình sẽ đi theo 2 hướng đó là:
1. Bàn luận với một tư cách là **Người quan tâm**
2. Bàn luận với tư cách là **Dev Ruby on Rails** chân chính


## Bàn luận với tư cách là *Người quan tâm*
Có một tin tốt là có rất nhiều điều mà chủ sở hữu trang web có thể làm được để khắc phục và giảm thiểu được lỗ hổng về SQL Injection. Mặc dù ko có thứ gì gọi là giải pháp hoàn hảo trong bảo mật mạng.

Dưới đây là một số steps giúp bạn giảm thiểu và tránh trở thành nạn nhân của SQL Injection:

* **Trust no one:** Giả sử như mọi dữ liệu người dùng gửi lên server toàn là chứa mã độc, trong trường hợp này chúng ta nên dùng **_validate_**  bởi một function được định nghĩa bởi Mysql đó là **mysql_real_escape_string()** để chắc chắn một điều rằng, không có bất kì một kí tự đặc biệt nào ví dụ như **'** được đưa vào câu truy vấn SQL. Bạn cũng nên làm sạch data từ người dùng bằng một số validate do mình tự định nghĩa. Ví dự như Email thì chỉ cho phép một số kí tự cho phép và bắt buộc phải có kí tự @ chẳng hạn, hoặc là số điện thoại phải validate cho phép một kí tự trong số điện thoại hợp lệ...
* **Không sử dụng SQL động và không xây dựng câu truy vấn với dữ liệu nhập vào từ người dùng:** Mặc dù chúng ta đã clear dữ liệu trước nhưng sẽ có một số trường hợp mình không thể đảm bảo là dữ liệu đó đã an toàn tuyệt đối. Cho nên để khắc phục vấn đề này chúng ta sử dụng ***parameterized query*** hoặc có thể sử dụng ***stored procedures*** nếu có thể. Tuy nhiên có một số lưu ý khi sử dụng ***stored procedures***, nó chỉ có thể ngăn chặn một vài kiểu tấn công SQL Injecton, vậy nên chúng cũng ko nên phụ thuộc hay lạm dụng thằng này quá.
* **Firewall:** *Web application firewall*(WAF): Tường lửa ứng dụng web, sử dụng trong mục đích hỗ trợ lọc dữ liệu độc hại trước khi đi vào hệ thống. Một điểm cộng nữa là hệ thống tường lửa sẽ có một số quy tắc bảo mật mặc định, ngoài những quy tắc đó chúng ta có thêm mới những quy tắc khi chúng ta cần. Có một WAF free khá là phổ biến đó là open source **ModSecurity**, nó hỗ trợ cho Apache, Microsoft IIS và nginx web servers. ModSecurity cung cấp một bộ quy tắc tinh vi và không ngừng phát triển để lọc các yêu cầu web có nguy cơ tiềm tàng,
* **Giảm bề mặt tấn công:** Loại bỏ một số database function mà bạn không cần thiết để giảm bớt lỗ hổng cho hacker tấn công.
* **Sử dụng đặc quyền phù hợp:** Không kết nối  với database bằng một tài khoản có đặc quyền cấp quản trị viên trừ những trường hợp cần đến role này. Sử dụng một tài khoản bị giới hạn là một biện pháp rất an toàn, chúng ta có thể giới hạn khả năng của hacker. Ví dụ, đoạn code cho trang login nên truy vấn cơ sở dữ liệu sử dụng tài khoản đã bị giới hạn và chỉ truy cập vào những bảng liên quan, nếu làm như vậy thì hacker không thể truy cập được toàn bộ cơ sở dữ liệu khi chúng vào được đây.
* **Tăng cường bảo mật nếu có thể:** Giả sử như ứng dụng web của chúng ta kém an toàn thì để tăng độ bảo mật nên mã hóa hoặc băm mật khẩu và dữ liệu bí mật khác, bao gồm cả chuỗi kết nối.
* **Không nên tiết lộ những thông tin không cần thiết:** Các hacker được học rất nhiều về kiến trúc cơ sở dữ liệu từ các thông báo lỗi, vì vậy hãy chắc chắn rằng bạn chỉ hiển thị tối thiểu thông tin cần thiết. Có thể sử dụng *RemoteOnly* để custom lỗi code để hiện thị một thông báo lỗi dài dòng và chắc chắn răng tin tặc không thể có nhiều thông tin hơn từ nó.
* **Liên tục theo dõi các câu lệnh SQL từ các ứng dụng kết nối với cơ sở dữ liệu:** Như vậy sẽ giúp bạn xác định được những câu SQL giả mạo và lỗ hổng của hệ thống.
* **Có thể mua một phần mềm tốt nhất**: Đội phát triển chịu trách nhiệm kiểm tra mã code và sửa lỗi bảo mật trước khi chuyển giao sản phẩm. Giúp cho sản phẩm trở thành tốt nhất có thể.


## Bàn luận với tư cách là *Dev Ruby on Rails* chân chính
Về techincal thì sẽ có rất nhiều cách để giải quyết vấn đề này, hôm nay mình sẽ chia sẻ một số cách thông dụng nhất cho các bạn dev.

* Sử dụng **Dynamic Finder**: Khi chúng ta cần tìm kiếm thông tin từ database dựa trên một filed nhất định thì chúng ta nên dùng **dynamic attribute-bases finder** để tránh SQL Injection. Nó hoạt động giống như **parameterized** và quan tâm đến param truyền vào, dưới đây là cách sử dụng


> User.find_by name: params[:name] # Find traditional
> 
> User.find_by_name name # Dynamic find


 Phương thức **find_by** sử dụng ở line 1 có thể bị tấn công SQL Injection nếu như chúng ta sử dụng không cẩn thận. Còn ở line 2 chúng ta sử dụng **find_by_attribute**(*dynamic find* ) thì Active Record tự hiểu parameter truyền vào ở đây không thể nào là một column hay một table và thêm nó vào SQL query với dấu --

* Không nên truyền một **String** như một tham số: Một số phương thức nhận tham số từ nhiều định dạng khác nhau, nó hoạt động ổn khi tham số đó là một **Integer** nhưng nó sẽ trở thành một lỗ hổng của SQL Injection nếu như nó là một **String**. Để hiểu rõ hơn trường hợp này thì mình có đưa ra một ví dụ phía dưới:

```
User.where("name = '#{params[:name]'") # SQL Injection!
```

Nếu như name = 'fff' thì kết quả trả về của câu truy vấn trên như sau:
```
SELECT "users".* FROM "users" WHERE (name = 'fff')
=> #<ActiveRecord::Relation []>
```
Nhưng nếu name được gán bằng name = "' OR 1='1" thì kết quả sẽ thay đổi:
```
SELECT "users".* FROM "users" WHERE (name = ' ' OR '1'='1')
=> #<ActiveRecord::Relation [#<User id: 1, name:'jack', …….>]>
```

Như ví dụ trên thì kẽ tấn công có thể dể dàng tích hợp toán tử OR vào câu query của mình và truy xuất data trong database mặc dù name không tồn tại.  Để giải quyết nó chúng ta có rất nhiều cách:
```
# 1
User.where(["name = ?", "#{params[:name]}"])
```
Theo cách này thì SQL Injection sẽ không khả thi, bởi vì phần tử đầu tiên của mảng là một template, còn phần thứ hai là tham số cho template.

```
# 2
User.where({ name: params[:name] })
```
Cách này thì column đã set rõ ràng, tham số truyền vào sẽ được xem là value của column này. Ngoài ra chúng ta còn có một số cách viết khác:
```
User.where(email: email)
User.where("email = ?", email)
User.where("email = :email", email: email)
```

Trong một số trường hợp bạn muốn truy vấn một chuỗi các query, thông thường chúng ta sẽ sử dụng toán tử AND:
```
# Unsafe
def unsafe_query
  sql = []
  sql << "email = #{email}" if condition1?
  sql << "name = #{name}"   if condition2?
  # ... etc

  User.where(sql.join(' and '))
end
```
Nếu viết như trên chúng ta sẽ mắc phải quy tắc : *If you have to add surrounding quotes to your query, you’re vulnerable to SQL Injection.*, có nghĩa là nếu như bạn thêm kí tự ' vào câu query thì bạn đã tạo ra lỗ hổng SQL Injection. 
Active record hỗ trợ chúng ta viết multiple query một cách dễ dàng như sau:

```
# Safe
def safe_query
  User.all.tap do |query|
    query.where(email: email) if condition1?
    query.where(name: name)   if condition2?
    # ... etc
  end
end
```

Thêm một ví dụ về Raw Queries:

```
# Unsafe
st = ActiveRecord::Base.connection.raw_connection.prepare(
  "select * from users where email = '#{email}'")
results = st.execute
st.close

# Safe
st = ActiveRecord::Base.connection.raw_connection.prepare(
  "select * from users where email = ?")
results = st.execute(email)
st.close
```

Qua những ví dụ mà mình đưa ra, mình xin tổng kết lại là khi làm việc với câu truy vấn SQL thì điều kiêng kị nhất là bạn ko nên pass trược tiếp một param vào câu lệnh truy vấn mà thay vào đó là một số cách mà mình đã nêu ở trên nhé.

Hôm nay mình xin phép dừng lại tại đây và cũng kết thúc bài sharing về SQL Injection, mình vừa tìm hiểu vừa học nên có một số ý không đúng lắm, hy vọng nhận được sự góp ý từ mn. 

Chúc mn cuối tuần vui vẻ nhé!!

Happy Coding