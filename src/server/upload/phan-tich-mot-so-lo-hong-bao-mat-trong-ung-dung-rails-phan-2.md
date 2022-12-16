# I. Tổng quan vấn đề bảo mật trong Rails
Ở phần I, mình đã phân tích chi tiết cũng như chỉ ra cách khai thác lỗ hổng** SQL Injection** - một trong những lỗ hổng bảo mật có mức độ nguy hiểm nghiêm trọng cho phép kẻ tấn công khai thác và lấy dữ liệu trong database. 
Ở phần II này, mình sẽ tiếp tục phân tích một số lỗ hổng bảo mật khác mà ứng dụng Rails thường gặp phải. Đó là lỗ hổng **Insecure Direct Object Reference** và lỗ hổng **Cross-Site Scripting**
# II. Lỗ hổng Insecure Direct Object Reference
![](https://images.viblo.asia/200f2c98-25af-4940-9fe1-d82eef7a8adf.png)

## 1. Nguyên nhân
Nguyên nhân của lỗ hổng Direct Object Reference (hay còn gọi là IDOR) đến từ việc ứng dụng không kiểm tra quyền của người dùng khi thực hiện truy cập tới một tài nguyên trong hệ thống. Bằng việc thay đổi tham số truyền vào, kẻ tấn công có thể thực hiện truy cập trái phép tới dữ liệu của người dùng khác hoặc thực hiện thay đổi chúng. Lỗ hổng thuộc phạm vi **Authorization** trong ứng dụng web.

## 2. Phân tích lỗi trong code
```ruby
#app/controllers/work_info_controller.rb

def index
  @user = User.find_by(id: params[:user_id])
  if !(@user) || @user.admin
    flash[:error] = "Sorry, no user with that user id exists"
    redirect_to home_dashboard_index_path
  end
end
```
Đoạn code trên thực hiện tìm người dùng thông qua việc truyền vào tham số `user_id`. Sau đó sẽ kiểm tra xem người dùng đó có phải là admin của hệ thống hay không, nếu không  phải là admin thì người dùng sẽ được chuyển đến trang `home_dashboard_index`.
Vấn đề ở đây là thay lấy giá trị ID người dùng từ phiên của người dùng hiện tại thì ứng dụng lại thực hiện lấy ID người dùng từ tham số đầu vào (user_id người dùng trong URL RESTful) dẫn đến việc kẻ tấn công có thể giả mạo id của admin để truy cập vào admin_d.

## 3. Khai thác lỗ hổng bằng tay
Khi chúng ta đăng nhập thành công vào hệ thống, hệ thống sẽ redirect chúng ta về trang dash board với đường dẫn: 

`
/users/2/work_info
`

Với 2 là id của chúng ta. Bằng cách thay đổi id từ 2 sang 1, chúng ta có thể truy cập tới dash board của user có id là 1 (ở đây chính là admin)


## 4. Khai thác lỗ hổng bằng tay công cụ Autorize
Để sử dụng công cụ Autorize - Extension của Burpsuite để khai thác lỗ hổng IDOR, mời các bạn theo dõi bài viết chi tiết dưới đây:

***Nguồn: [Tìm kiếm các lỗi IDOR, chưa bao giờ lại dễ đến thế với extension Autorize
](https://viblo.asia/p/tim-kiem-cac-loi-idor-chua-bao-gio-lai-de-den-the-voi-extension-autorize-gDVK2z02KLj) - Tác giả: Ngụy Minh Tuấn***

## 5. Khuyến nghị
Như chúng ta dẫ phân tích nguyên nhân của lỗ hổng đến từ việc chứng ta không kiểm tra quyền của người dùng hiện tại khi thực hiện truy cập tới tài nguyên. Để giải quyết vấn đề này, chúng ta chỉ cần kiểm tra người dùng hiện tại đang thực hiện request có phải là người dùng gửi request tới tài nguyên cần truy cập hay không là được.

Trongg Rails, các bạn sử dụng hàm `current_user` để kiểm tra user hiện tại:

```ruby
def index
  @user = current_user
  if !(@user) || @user.admin
    flash[:error] = "Apologies, looks like something went wrong"
    redirect_to home_dashboard_index_path
  end
end
```
# II. Lỗ hổng Cross-Site Scripting - XSS
![](https://images.viblo.asia/06652eee-60a8-4c0e-9d9c-24760e65c9c7.png)

## 1. Nguyên nhân
Lỗi XSS xảy ra khi nào ứng dụng lấy dữ liệu không đáng tin cậy và gửi đến trình duyệt web mà không được kiểm tra và thực hiện output encoding đúng cách. XSS cho phép những kẻ tấn công thực thi các tập lệnh trong trình duyệt của nạn nhân, có thể chiếm quyền điều khiển các phiên của người dùng, phá hoại các trang web hoặc chuyển hướng người dùng đến các trang web độc hại.

## 2. Phân loại
Lỗ hổng XSS chia ra làm 3 loại chính :
**1. Reflected XSS :**
- XSS sẽ thực thi khi người dùng click vào một đường link có chứa mã javascript đọc hại
**2. Stored XSS**
- Nội dung javascript độc hại sẽ được lưu trữ lại trên server và hiển thị lên website. Bất cứ khi nào, người dùng nào xem nội dung đó thì đoạn mã javascript độc hại sẽ thực thi ở trình duyệt của người dùng đó.
**3. DOM XSS**
- Một thẻ javascript ẩn sẽ được thêm vào website, khi người dùng xem nội dung của website đó hoặc thực hiện một thao tác trong trang web, đoạn javascript độc hại sẽ thực thi
## 3. Phân tích lỗi trong code
```ruby
# app/views/layouts/shared/_header.html.erb

<li style="color: #FFFFFF">
  <!--
  I'm going to use HTML safe because we had some weird stuff
  going on with funny chars and jquery, plus it says safe so I'm guessing
  nothing bad will happen
  -->
  Welcome, <%= current_user.first_name.html_safe %>
</li>
```

```ruby
# Psuedo-code to help conceptualize
def raw(dirty_string)
  dirty_string.to_s.html_safe
end
```
Đoạn code trên lấy giá trị trường `first_name` của user đế hiển thị, tuy nhiên không thực hiện validate cũng như ouput encoded dẫn đến việc lỗ hổng XSS bị khai thác. Hàm `html_safe` chỉ nên được sử dụng nếu dữ liệu trước đó đã được validate và không chứa mã javascript độc hại

## 4. Khai thác lỗ hổng (Stored XSS)
Chúng ta thực hiện cập nhập trường first name của user với giá trị:

```ruby
<script>alert(document.cookie)</script>
```

Khi vào trang profile của người dùng, đoạn mã javascript trên sẽ thực  hiện và trang web sẽ hiện một pop-up với nội dung là cookie của người dùng:

## 5. Khuyến nghị
Thông thường, các developer thường mắc lỗi khi sử dụng `html_safe` so với `raw` với ý tưởng là cái này an toàn hơn cái kia. Nhưng thực tế, việc sử dụng hàm html_safe vẫn có thể bị khai thác lỗi XSS.

Trong ví dụ này, chỉ cần loại bỏ lệnh gọi `html_safe` thì Rails mặc định sẽ thực hiện encoded dữ liệu để chống XSS.

Ngoài ra, nếu bạn muốn sử dụng `html_safe` , bạn cần sử dụng một số hàm: `sanitize ()` hoặc `strip_tags ()` đê thực hiện filter các dữ liệu javascript độc hại trước khi hiển thị


```ruby
# app/views/layouts/shared/_header.html.erb

<li style="color: #FFFFFF">
  <!--
  I'm going to use HTML safe because we had some weird stuff
  going on with funny chars and jquery, plus it says safe so I'm guessing
  nothing bad will happen
  -->
  Welcome, <%= current_user.first_name %>
</li>
```

# IV. Tổng kết
Hai lỗ hổng bảo mật trên là 2 lỗ hổng khá phổ biến trong ứng dụng rails, nó nằm chủ yếu ở việc lập trình viên không sử dụng khuyển nghị bảo mật của framework Rails dẫn đến bị mắc các lỗ hổng trên. Bài học ở đây là chúng ta cần tìm hiểu kĩ framework cũng như nghiên cứu tài liệu để giúp hạn chế gặp phải các lỗ hổng bảo mật khi phát triển ứng dụng. Cảm ơn các bạn đã theo dõi.