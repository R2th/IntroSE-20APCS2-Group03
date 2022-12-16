Có khá nhiều lí do mà người dùng phải sử dụng `soft delete`, từ việc khôi phục dữ liệu bị xóa do sự cố, do sự xâm phạm trái phép đến các tính năng như thống kê, hay phục hồi dữ liệu. Một vài người dùng lại muốn các tính năng "lưu trữ", một tính năng dùng để ngăn cách giữa các đối tượng được sử dụng với các đối tượng không được sử dụng, và `soft delete` là một cách để thực hiện nó. 

## Soft delete strategy
Một trong những thư viện phổ biến nhất là [gem paranoia](https://github.com/rubysherpas/paranoia). Cách tiếp cận của gem này là:

* Thêm trường `deleted_at` vào các bảng cần sự hỗ trợ của tính năng `soft delete`. Tất cả các bản ghi mà giá trị của trường `deleted_at` không phải là `NULL` thì đều bị coi là bị xóa mềm. Khi một bản ghi bị xóa thông qua ActiveRecord (mặc định là ORM), bản ghi sẽ được cập nhật trường `deleted_at` là thời gian xóa thay vì bản ghi thực sự bị xóa khỏi database.
* Thêm [default scope](https://apidock.com/rails/ActiveRecord/Base/default_scope/class) cho `model` hỗ trợ `soft delete`, nên các query "thông thường" sẽ loại bỏ các bản ghi được đánh dấu đã bị xóa, làm cho các bản ghi đã bị xóa gần như vô hình với chương trình.
* Cung cấp các methods để tương tác với các bản ghi đã bị xóa mềm, bao gồm: `.with_deleted` và `.only_deleted` đê tìm kiếm các bản ghi bị xóa mềm, `.really_destroy!`  để xóa vĩnh viễn 1 bản ghi và `.restore` để khôi phục bản ghi bị xóa mềm (bằng cách cập nhật trường `deleted_at` là `NULL`).

VD:
```
class AddDeletedAtToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :deleted_at, :timestamp
  end
end

class Project < ActiveRecord::Base
  acts_as_paranoid, column: 'deleted_at'
end

project = Project.first
project.destroy # Xóa mềm
project.restore # Khôi phục
project.really_destroy! # Xóa vĩnh viễn
```

## Technical challenges

Cách tiếp cận được cung cấp bởi `gem paranoia` rất dễ hiểu và dễ triển khai, và cung cấp tính năng `soft deleted` một cách nhanh chóng. Điều này khiến nó trở nên khá phổ biến, đặc biệt là đối với các dự án nhỏ. Tuy nhiên, cách tiếp cận này có một vài nhược điểm, nó có thể thực sự nghiêm trọng khi trương trình chở nên phức tạp.

### Default scope

`Gem paranoia` sử dụng `default scope` để loại bỏ các bản ghi bị đáng dấu là đã bị xóa ra khỏi các câu query "thông thường". Việc này có thể có tác dụng phụ không mong muốn như:

* Sự hỗn độn giữa **ORM** và **Raw SQL**. Khi trương chình lớn lên, việc viết các câu SQL thuần để tăng hiệu năng là điều khó tránh khỏi. Và bất kỳ câu truy vấn SQL thuần nào cũng cần phải điểu chỉnh một cách thủ công để loại bỏ các bản ghi đã bị xóa mềm. 

### Validations and constraints

Hãy tưởng tượng bạn có một trường cần có tính model Project có validation uniqueness ở trường name, hãy đảm bảo ràng buộc uniqueness bao gồm cả các bản ghi đã bị xóa, bới nếu không thì các bản ghi đã bị xóa mềm có thể không thể tái sử dụng trong tương lai. Tuy nhiên, điều này lại có thể khiến người dùng khó hiểu, bởi họ không thấy các project đã bị xóa mềm và thắc mắc tại sao tên project của họ lại không hợp lệ. 

Mặt khác, nếu ràng buộc uniqueness không bao gồm các bản ghi bị xóa mềm, thì điều gì sẽ xảy ra khi 1 project bị xóa mềm, một project mới có tên trùng với project đã bị xóa được tạo, và người dùng cố gắng khôi phục lại dự án cũ. Bạn sẽ phải loại bỏ validation uniqueness, hay thực hiện thay đổi tên một cách thủ công (thêm hậu tố "old" và tên dự án cũ).

### Performance and scalability

Một vấn đề quan trọng cần xem xét là hiệu suất và khả năng mở rộng ảnh hưởng đến các bản ghi bị xóa mềm trên hệ thống. Mặc dù hầu hết các bản ghi như vậy có thể ẩn với hầu hết người dùng, chúng vẫn nằm trong cùng cơ sở dữ liệu với các bản ghi khác, và (tối thiểu là) sẽ tiếp tục chiếm không gian. Nếu các bản ghi bị xóa được đánh index (sẽ là mặc định, trừ khi bạn đánh index 1 phần và loại trừ chúng), thì bất kỳ index nào như vậy sẽ ảnh hưởng đến độ trễ khi thực hiện đọc/ghi dữ liệu.

Mặt khác, nếu bạn đánh index và loại trừ các bản ghi bị xóa, thì bạn sẽ không thể hưởng lợi từ chúng trong bất kỳ câu query mà bạn thực sự cần tìm kiếm chúng (chẳng hạn như nhật ký cần làm việc với tất cả các bản ghi, bao gồm cả những cái bị xóa mềm). 

Cuối cùng, nếu ứng dụng của bạn cung cấp một hạn ngạch sử dụng cho end user, bạn sẽ cần phải quyết định xem các bản ghi bị xóa mềm có được tính theo hạn ngạch hay không. Nếu vậy, khi người dùng của bạn xóa các bản ghi, họ sẽ có ít chỗ hơn cho các bản ghi khác. Nếu không, thì bạn có khả năng sẽ sử dụng tài nguyên hệ thống khác so với dự đoán hạn ngạch cho phép, ảnh hưởng đến hiệu suất hệ thống, chi phí vận hành của bạn hoặc cả hai.

### Hướng tiếp cận khác

Để khác phục các nhược điểm trên, bạn có thể chọn hướng tiếp cận khác. Ví dụ như [Basecamp](https://basecamp.com/) lựa chọn hướng tiếp cận **time-based garbage collection**. Cụ thể thì với hướng tiếp cận này, toàn bộ các bản ghi bị xóa mềm sẽ được lưu trữ ở một nơi riêng biệt, giống như "thùng rác". Trong khoảng thời gian nhất định, các dữ liệu trong "thùng rác" có thể được khôi phục, sau khoảng thời gian đó, các dự liệu sẽ bị xóa hoàn toàn khỏi hệ thống.


Bản thân `gem paranoia` ngay dòng đầu tiên cũng đã cảnh báo:

> not recommended for new projects

điều này muốn bạn nên thực sự cân nhắc trước khi sử dụng gem này.