## 1. Stack Trace  là gì:
-  Trong quá trình lập trình Rails, thỉnh thoảng ta sẽ thấy những thông báo lỗi như thế này.
    ![](https://images.viblo.asia/a1f1d899-903f-4bb2-a15b-5a4a511711e2.png)

- Thông báo lỗi đang hiển thị Stack Trace, bao gồm 3 phần `ApplicationTrace` (được hiển thị mặc định), `Framework Trace` và `Full Trace`.
- Stack Trace là thứ tự chi tiết các function xãy ra lỗi được gọi, cho phép ta debug và fix lỗi. 

## 2. Cách đọc của Stack Trace:
- Trong nhiều trường hợp, Stack Trace được hiển thi khá dài, nhất là phần Framework Trace và Full Trace.
- Tuy nhiên đọc Stack Trace là kĩ năng cần thiết giúp chúng ta tìm ra code đang chạy theo thứ tự nào, lỗi xảy ra ở đâu và tại sao.
- Trong hình minh họa trên, màn hình đang hiển thị 1 đoạn Stack Trace ngắn, nhìn vào đó ta có thể biết được các thông tin sau
- Nội dung lỗi: `When assigning attributes, you must pass a hash as an argument.`
- Lỗi tại: `app/controllers/users_controller.rb:5:in show`
- Code tại dòng lỗi: `@user = User.new(params[:id])`

- Ta thay thế function new bắng function find và chạy lại, kết quả thu được
    ![](https://images.viblo.asia/f3279b42-f5a0-48e5-8b84-cc365608a09b.png)

## 3. Tác dụng Stack Trace:
- Ta sẽ thử với 1 đoạn Stack Trace dài hơn để làm rõ hơn tác dụng của Stack Trace.
- Ta thêm 2 function trong `application_helper.rb`
    ```
      def raise_error
        raise "Error"
      end

      def call_raise_error
        raise_error
      end
    ```

- Gọi function `call_raise_error` trong method show của `UsersController` và chạy lại.
    ```
    def show
        call_raise_error
        @user = User.find(params[:id])
    end
    ```
    
- Kết quả thu được
    ![](https://images.viblo.asia/77d9d90d-dbd6-4200-b4d8-4a1a3447f7b2.png)
    
- Lần này ta có 1 đoạn Stack Trace dài hơn và chi tiết hơn.
- Các dòng trong Stack Trace được hiển thị từ dưới lên theo thứ tự chạy của các function được gọi.
- Trong ví dụ, các funtion được gọi theo thứ tự
  * `app/controllers/users_controller.rb:5:in show` gọi `app/helpers/application_helper.rb:7:in call_raise_error`
  * `app/helpers/application_helper.rb:7:in call_raise_error` gọi `app/helpers/application_helper.rb:3:in raise_error`
- Dòng trên cùng là dòng đang gây ra lỗi.
   * `app/helpers/application_helper.rb:3:in raise_error`
- Trong nhiều trường hợp ta cần sữa lỗi theo thứ tự từ tên xuống dưới.

- Click vào từng dòng có thể xem được chi tiết code lỗi tại dòng đó.
- Lỗi tại dòng `app/controllers/users_controller.rb:5:in show`
    ![](https://images.viblo.asia/2f50a206-6512-4dd1-88be-b9d0a66eba89.png)
- Lỗi tại dòng `app/helpers/application_helper.rb:7:in `call_raise_error'`
    ![](https://images.viblo.asia/0c98783e-053a-4cf7-8698-1a397e5685f5.png)

- Trong Rails Stack Trace chỉ được hiển thị khi xảy ra lỗi.
- Để in ra Stack Trace trong cả trường hợp xảy ra lỗi và không xảy ra lỗi, ta sử dụng
    ```
    puts caller
    ```
- Ví dụ khi mình sử dụng caller cho action show của UsersController
    ```
    def show
        @user = User.find(params[:id])
        puts caller
    end
    ```
- Kết quả thu được
    ![](https://images.viblo.asia/99d6ba81-b064-4fc9-ada0-175d7c410831.png)
  
## 4. Link source code:
- https://github.com/LeTanThanh/stack_strace