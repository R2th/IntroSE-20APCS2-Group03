# 1. gem devise
Devise là một giải pháp xác thực cho Rails được tích hợp với Warden và được cung cấp bởi những người tuyệt vời tại Plataformatec.
Devise cung cấp 10 mô-đun khác nhau, tùy vào sự cần thiết cho ứng dụng của bạn, bạn có thể chọn 1 vài mô-đun:
+ Database Authenticatable: Điều này mã hóa và lưu trữ một mật khẩu vào cơ sở dữ liệu để xác nhận tính xác thực của người dùng trong khi đăng nhập.
+ Omniauthable: Điều này giúp cho OmniAuth có thể hỗ trợ cho Devise. Người dùng ứng dụng của bạn sẽ có thể đăng nhập bằng tài khoản như Facebook, Twitter và Google
+ Confirmable: Điều này cho phép việc gởi các email với các chỉ dẫn sẽ giúp xác nhận một tài khoản.
+ Recoverable: Mô-đun này giúp những khi người dùng quên mật khẩu và cần phải khôi phục nó. Với điều này, thì người dùng sẽ có thể thiết lập lại mật khẩu.
+ Registerable: Điều này xử lý quá trình đăng ký của người dùng. Nó cũng cho phép người dùng chỉnh sửa và xoá các tài khoản của họ.
+ Rememberable: Mô-đun này làm cho ứng dụng của bạn có thể nhớ một người dùng đã đăng nhập bằng cách lưu trữ một cookie.
+ Trackable: Mô-đun này giúp theo dõi tài khoản đăng nhập, mốc thời gian, và địa chỉ IP.
+ Timeoutable: Mô-đun này chịu trách nhiệm cho một phiên hết thời hạn mà đã không được kích hoạt trong một khoảng thời gian.
+ Validatable: Với mô-đun này, email và mật khẩu sẽ được kiểm tra tính hợp lệ.
+ Lockable	: Điều này cung cập một lớp phụ của bảo mật, khi được kích hoạt, một tài khoản có thể bị khoá sau một số lần cố gắng đăng nhập thất bại.
Tham khảo thêm tại : [Link](https://github.com/heartcombo/devise)
# 2. gem cancancan
Cancancan là một thư viện phân quyền cho ruby on rails, nó hạn chế các tài nguyên mà một user được phép truy cập. Tất cả các quyền hạn được quy định ở một nơi duy nhất (là class Ability) và riêng biệt với controllers, views và database queries
Nó bao gồm 2 phần chính:
The authorizations definition library: Thư viện xác nhận phân quyền cho phép xác nhận rules cho người dùng để truy cập đến các đối tượng khác nhau và nó cung cấp các helpers để check các quyền đó.
Controller helpers: giúp đơn giản hóa code trong rails controller bằng các thực hiện loading và checking các phân quyền của các model trong controllers.
Tham khảo thêm tại : [Link](https://github.com/CanCanCommunity/cancancan)

# 3. gem wicked pdf
Khi phải tạo file PDF từ code html chúng ta lập tức nghĩ đến WICKED PDF

Tham khảo thêm tại : [Link](https://github.com/mileszs/wicked_pdf)
# 4. gem carrierwave
Gem CarrierWave cung cấp một giải pháp đơn giản và hiệu quả để upload một hay nhiều file trong ứng dụng Ruby.
Tham khảo thêm tại : [Link](https://github.com/carrierwaveuploader/carrierwave)

# 5. gem groupdate
GROUPDATE là gem sinh ra để group các records bằng 1 khoảng thời gian (1 tuần,...), truy vấn trong sql
Tham khảo thêm tại : [Link](https://github.com/ankane/groupdate)

# 6. gem chartkick
Chartkick là 1 gem tuyệt vời, dùng để tạo ra chart bằng javascript, chỉ với 1 dòng code, bạn có thể include toàn bộ các charts, graphs
Tham khảo thêm tại : [Link](https://github.com/ankane/groupdate)
# 7. gem ransack
Ransack là 1 gem rất tốt và dễ sử dụng cho việc search. Ransack tích hợp sẵn các tính năng hay sử dụng, nếu muốn thay đổi nó bạn có thể custom phù hợp với yêu cầu dự án
Tham khảo thêm tại : [Link](https://github.com/activerecord-hackery/ransack)
# 8. gem active_model_serializers
ActiveModelSerializers là gem được thiết kể để chuyển đổi dữ liệu của bạn về json. ActiveModelSerializers vừa có performance tốt hơn jbuilder, vừa dễ sử dụng và hiệu quả
Tham khảo thêm tại : [Link](https://github.com/rails-api/active_model_serializers)
# 8. gem Ckeditor 
CKEditor (còn gọi là FCKeditor) là một trình soạn thảo mã nguồn mở theo kiểu WYSIWYG (tay làm - mắt thấy) của CKSource. Chương trình này có thể tích hợp vào các web site mà không cần cài đặt. Phiên bản đầu tiên được phát hành năm 2003 và đến nay được rất nhiều người sử dụng.
Tham khảo thêm tại : [Link](https://github.com/galetahub/ckeditor)
# 9. gem Kaminari
Phân trang trong Rails 
Tham khảo thêm tại : [Link](https://github.com/kaminari/kaminari)
# 10. gem Kaminari
Đây là gem hỗ trợ devise để đăng nhập bên thứ 3 như google, facebook,...
Tham khảo thêm tại : [Link](https://github.com/omniauth/omniauth)