Trong bài [Ruby_Unit testing](https://viblo.asia/p/ruby-unit-testing-oOVlYOLoK8W) thì mình đã tìm hiểu cách kiểm tra code đối với model, trong bài này sẽ tìm hiểu cách kiểm tra code trên controller – hay còn gọi là Functional Testing.
Khi tạo một controller thì Rails sẽ tự động tạo ra một file dùng để test controller này. Ngoài ra, khi tạo một model thì Rails cũng sẽ định nghĩa controller cho model này, vì thế cũng sẽ tạo một file test cho controller này.
Trong ví dụ toy_app mình đã tạo 2 controller `users` và `microposts` nên tương ứng ta có 2 file test là `users_controller_test.rb` và `microposts_controller_test.rb`

![](https://images.viblo.asia/1a21f2ba-d960-4d75-b1e7-55353fac2fe4.png)

Nội dung file users_controller_test.rb như sau:
test/controllers/users_controller_test.rb
```
require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url
    assert_response :success
  end

  test "should get new" do
    get new_user_url
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { user: { email: @user.email, name: @user.name } }
    end

    assert_redirected_to user_url(User.last)
  end

  test "should show user" do
    get user_url(@user)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_url(@user)
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { email: @user.email, name: @user.name } }
    assert_redirected_to user_url(@user)
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete user_url(@user)
    end

    assert_redirected_to users_url
  end
end
```
Trong đó, đoạn `setup do...end` là khởi tạo. Ở đây là khởi tạo biến `@user` là đối tượng `one` trong fixture.
Sau đó các đoạn code test, ở đây các phương thức `get`, `post`, `patch` sẽ gửi các gói tin HTTP lên server, theo sau là tên các hàm trong model mà Rails đã định nghĩa trước, các phương thức gửi sẽ tương ứng với một phương thức của giao thức HTTP như GET, POST, PATCH, PUT… sau đó chúng ta dùng các phương thức assert để kiểm tra dữ liệu trả về từ server, trong đó:
* **assert_response**: nhận vào tham số mã và kiểm tra xem gói tin trả về có mã giống với tham số hay không, ở đoạn code trên các đoạn assert_response đều kiểm tra với mã là :success, tương ứng với mã từ 200-299, ngoài ra còn có :redirect tương ứng với mã từ 300-399, :missing là mã 404, :error là từ 500-599.
* **assert_not_nil**: nhận vào một đối tượng và kiểm tra xem đối tượng đó có giá trị là nil hay không
* **assert_difference**: nhận vào tham số là một biểu thức (phép tính, hàm, toán tử…v.v) và tính với hiệu của biểu thức đó sau khi thực hiện phần code phía sau, rồi kiểm tra xem hiệu đó có bằng 1 hay không.
* **assert_redirected_to**: nhận vào tham số là một URL, kiểm tra xem URL đó có giống với hành động chuyển hướng trang web cuối cùng được thực hiện hay không.
Chúng ta có thể chạy lệnh rake test:functionals để Rails chạy những test trên.

https://phocode.com/blog/2016/11/18/rails-functional-testing/