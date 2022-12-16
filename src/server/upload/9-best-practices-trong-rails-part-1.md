**1 Bộ nhớ đệm với biến Instance** <br>
Hãy lấy một kịch bản chung của những người tạo ra Công ty, Người tạo dự án và Dự án. Các mô hình sẽ trông như thế nào
```
class Project < ActiveRecord::Base
    belongs_to :creator, :class_name => “User”
end
```
```
class User < ActiveRecord::Base
    belongs_to :company
    has_many :projects
end
```
```
class Company < ActiveRecord::Base
    has_many :users
end
```
Để tìm công ty của người tạo dự án, bạn sẽ cần phải viết một phương thức trong công ty. Điều này có thể được thực hiện theo hai cách: <br>
**- Cách viết Không Tốt**
```
class Project < ActiveRecord::Base
    belongs_to :creator, :class_name => “User”
    def company
        creator.company
    end
end
```
Đây là một cách tồi vì mỗi khi bạn gọi phương thức này, một truy vấn sẽ được thực hiện đến cơ sở dữ liệu để tìm ra công ty của chủ dự án. Chúng ta có thể tránh truy vấn db sau cuộc gọi đầu tiên bằng cách lưu kết quả vào một biến thể hiện.

**- Cách viết Tốt**
```
class Project < ActiveRecord::Base
    belongs_to :creator, :class_name => “User”
    def company
        @company ||= creator.company
    end
end
```
Sử dụng kỹ thuật này, cơ sở dữ liệu sẽ chỉ được truy vấn lần đầu tiên khi bạn gọi phương thức này. Sau lần gọi đầu tiên, người dùng hiện tại sẽ được gán cho biến đối tượng @company và lần sau khi bạn gọi phương thức này, nó sẽ chỉ trả về giá trị của @company.

Lưu ý- Chỉ sử dụng kỹ thuật này cho những trường hợp giá trị biến được lưu trong bộ nhớ cache không thay đổi thường xuyên. Nếu không, nó có thể dẫn đến một vấn đề tiềm năng của việc sử dụng dữ liệu cũ.

**2 Sử dụng Local Variables thay cho Instance Variables trong Partials** <br>
Mục đích của partial view là sử dụng lại nó ở bất cứ đâu nhưng nếu chúng ta sử dụng biến thể hiện trong các phần, nó có thể dẫn đến kết quả mâu thuẫn làm cho nó khó sử dụng lại. Một cách tiếp cận tốt hơn là sử dụng các local variables trong một partial view
**- Cách viết không tốt**
```
<%= render :partial => 'header' %>
```
**- Cách viết tôt**
```
<%= render :partial =>  'header', :locals => {:project => @project}%>
```

**3 Ngăn chặn SQL Injection** <br>
Bạn đã nghe nói về SQL Injection nhiều lần nhưng tôi vẫn đang thảo luận về điểm này vì nó rất quan trọng và quan trọng. 
Nếu người dùng chuyển một trích dẫn trong một văn bản đầu vào thì văn bản sau ký tự trích dẫn đơn được coi là câu lệnh SQL. Điều này có nghĩa là văn bản được coi là một câu lệnh SQL sẽ có quyền truy cập trực tiếp vào cơ sở dữ liệu, khiến toàn bộ cơ sở dữ liệu gặp rủi ro vì người dùng có thể đã nhập nội dung độc hại. Vì vậy, không bao giờ cung cấp đầu vào của người dùng như một truy vấn cơ sở dữ liệu mà không thoát khỏi dấu ngoặc kép. Rails cung cấp một cách dễ dàng để làm điều này.<br>
**- Cách viết không tốt**
```
User.where(“name = #{params[:name]}“)
```
**- Cách viết tôt**
```
User.where(“name = ?”, params[:name])
```
hoặc
```
User.where(name: params[:name])
```

**4 Tránh vấn đề n + 1** <br>
Hãy xem trường hợp sau đây
```
class User < ActiveRecord::Base
    has_one :house
end
```
```
class House < ActiveRecord::Base
    belongs_to :user
end
```
**- Cách viết không tốt** <br>
Một lỗi phổ biến được thực hiện trong khi truy xuất địa chỉ nhà của mỗi người dùng là thực hiện các thao tác sau trong controller
```
@users = User.limit(50)
```
trong view
```
<% @users.each do |user|%>
    <%= user.house.address %>
<% end %>
```
Đoạn mã trên sẽ thực thi 51 truy vấn, 1 để tìm nạp tất cả user và 50 người khác để tìm địa chỉ nhà của user<br>
**- Cách viết tốt** <br>
Việc truy xuất phải được thực hiện như sau
Trong controller
```
@users = User.includes(:house).limit(50)
```
Trong view
```
<% @users.each do |user|%>
    <%= user.house.address %>
<% end %>
```
Đoạn mã trên sẽ thực thi 2 truy vấn, 1 để tìm nạp tất cả user và 1 để nạp địa chỉ nhà của mỗi user. <br>
(Còn nữa)