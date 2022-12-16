### Lời tựa.
  

-----

Có lẽ những dev đang đọc bài post này là những dev ruby hay một lang tử lang thang tò mò với ruby. Thực tế khi mà chúng mà chúng ta làm việc có một lỗi có lẽ hay gặp nhất đó là:

 ```ruby
     NoMethodError: undefined method 'Cái gi đó' for nil:NilClass
 ```
 Nhìn rất quen đúng không.Thực ra sẽ có khá nhiều cách để xử lý vấn đề này nhưng hôm này mình sẽ chia sẽ với một khác niêm pattern đó là **Null object pattern** .Để bắt đầu với nó ta sẽ đi tới các ví dụ trước.
###  1. An example
 - Hãy tưởng tượng bạn có một ứng dụng và ứng dụng đó yêu cầu in ra câu chào với người dùng hiện tạ, đại loại là "Xin chào người anh em, Thang". Thật thú vị là điều đầu iên bạn sẽ nghĩ và viết như sau: 
 ```ruby
     Xin chào người anh em, <%= current_user.name %>
 ```
 Nhưng sẽ ra sao nếu như bạn hoặc một ai đó đăng xuất thì sao:
 ```ruby
     NoMethodError: undefined method `name' for nil:NilClass
 ```
 Bạn hoảng sợ khi thấy ứng dụng của mình bị die. Và nhanh chóng fix nó.
 ```ruby
     Xin chào người anh em, <%= current_user.name if current_user %>
 ```
 - Có vẻ như nếu làm như vậy thì ứng dụng của bạn sẽ chẳng bao h có lỗi. Và có vẽ đó là một pattern hay và rồi cứ thế bạn, đồng nghiệp của bạn dùng nó, càng ngày nó càng được sử dụng ở nhiều nới trong ứng dụng của bạn. Nó sẽ chẳng bao giờ là một mớ hỗn độn nếu như bạn gặp vấn đề sau:
 

-----

Khác hàng của bạn hay đại loại bạn muốn nếu với người truy cấp vào ứng dụng của bạn là khách (không đăng nhập) bạn sẽ hiển thị câu chào.
```ruby
Xin chào người anh em, vô danh
```

Quay lại bạn vào ứng dụng của mình 69 chỗ dùng theo cách:
```ruby
   Xin chào người anh em, <%= current_user.name if current_user %>  
```

Thật là tồi tệ bạn nghĩ đi tìm từng chỗ một và sửa nó theo spec mới.Sẽ chẳng sao nếu bạn nghĩ bình thường.Còn bạn thấy nó thật tệ thì solution ở đây cũng thật là đơn giản. Và từ đó `Null object` ra đời.

-----

###  2. Null object
Vấn đề của chúng ta là giải quyết vấn đề luôn hiện thị `vô danh` khi không đăng nhập.Chúng ta sẽ bắt đầu với một class mới:
```ruby
    class NullUser
      def name
        'Guest'
      end

      def logged_in?
        false
      end
    end
```
Sẽ thật dễ bảo trì nếu như bạn đặt class name theo kiểu như sau: 
```ruby

Null + (Ánh xạ tới môt object cụ thể trong ứng dụng của bạn).
```
Và ở đây là User.Và tiếp theo method `current_user`của bạn sẽ edit lại như sau:
```ruby
    def current_user
      current_user_session || NullUser.new
    end
```

Thật thú vì và từ bây gờ mỗi khi có spec mới là `Xin chào người anh em` và đằng sau nó là một cái gi mới như là `Loăng quăng, ...` thì ta sẽ sẽ refactor hơn.

###  3. NOTE
 Null object hay một pattern nào khác nó chỉ thực sự có ích khi mà bạn áp dụng nó đúng cách. Và ở đây là không phải bất cứ một class của bạn cũng tạo Null object điều đó có thể phá hủy ứng của bạn. Kêt luận là hay nhưng đừng lạm dụng. Cảm ơn mọi người.
### 4. Tham khảo
http://mitrev.net/2015/06/07/the-null-object-pattern/