# Design pattern là gì?
![](https://images.viblo.asia/d7c49d6f-c143-434b-a2fc-49c050cf7238.png)
Nếu bạn đã từng code, có lẽ việc cảm thấy thích thú khi tìm ra giải pháp cho những vấn đề được giao đã không còn gì xa lạ. Trên con đường đó, có những tình huống bạn phải đối mặt không chỉ một lần rồi suy nghĩ về nó và đi đến kết luận "again and again"... Vậy tại sao không viết lại "solution" để áp dụng khi cần thiết? Từ đó khái niệm về design pattern xuất hiện, tập hợp mọi "solution" của lập trình viên có hiểu biết chuyên sâu chia sẻ được mọi người ứng dụng trong quá trình thiết kế và xây dựng dự án, bên cạnh đó việc biết đến design pattern giúp bạn tiết kiệm thời gian và "effort" trong công việc.

### Các Object cơ bản trong dự án API với Rails
![](https://images.viblo.asia/60c780b0-7996-4bb8-aa76-9ea5ef7eaacf.png)
Để nói về design pattern với Rails, bài viết này mình sẽ follow bố cục 3 câu hỏi chính where? - Ảnh hưởng ở đâu?, why? - Tại sao phải sử dụng? và how? - Sử dụng như thế nào?

### Where?

Làm việc với Rails hẳn bạn đã quen với MVC (Model - View - Controller) và với API chỉ có Model - Controller, từ đó việc áp dụng design pattern trong Rails API xảy ra ở Model và Controller.

### Why?

Ngán ngẩm khi làm việc với hơn nghìn dòng code cùng trên một file, đôi khi comment trong code còn không xuất hiện, đó là lúc bạn nhận ra phải đi debug từng dòng để test xem những fuction đó hoạt động như thế nào và trả về những gì. Để tìm được thông tin cần thiết khi làm việc hay bảo trì chả khác gì việc đi mò kim đáy bể , đặc biệt với một member mới tham gia dự án. Để phân tích rõ hơn mình sẽ chia ra làm 2 phần riêng biệt là Model và Controller.

**Đối với Model:**
    
   + **Trước tiên về phần validates khi tạo form:**
 
Form được tạo ra để create/validate record dựa vào model_params hẳn đã không còn xa lạ nữa,  việc khá là đơn giản nếu bạn chỉ xử lý trên một model nhất định. Tuy nhiên, không phải lúc nào mọi việc cũng diễn ra như ý muốn, một form có thể create/validate nhiều record và nhận attributes params tương ứng với record đó. 

Đến đây hẳn nhiều bạn đã nghĩ đến việc sử dụng accepts_nested_attributes_for: của Rails, như vậy nếu form chứa nhiều model cùng làm việc với nhau trong điều kiện riêng rẽ cho đối với mỗi model (giả sử model Company khi :update, model Tag khi :new), số câu lệnh accepts_nested_attributes_for: tăng lên, gián tiếp làm phình to model và một lý do nữa là một phần những lập trình viên lâu năm cho rằng việc dùng accepts_nested_attributes_for: là không tốt và sẽ được loại bỏ khỏi Rails sau này. 

Sau khi mình lục tìm trong bách khoa toàn thư desgin pattern, chúng ta có một object khá thú vị.
   
###    FORM OBJECT
   
   Form object là kỹ thuật tạo một class ở đó tất cả những model bị tác động đến trong quá trình tạo form được đặt vào cùng chỗ và xử lý validate trong một form duy nhất. Giả dụ khi xác nhận lại thông tin một user lúc nhấn vào link invite từ hệ thống, bạn phải xác nhận cả thông tin của công ty mà user làm admin.
   
   ```ruby
   class Api::V1::ConfirmationForm
     include ActiveModel::Model

     attr_accessor :name, :phone_number, :token, :company_name, :postal_code, :address_building

     validates :name, :phone_number, :token, :company_name, presence: true # validates từ ActiveModel::Model

     def save
       raise Api::Error::ControllerRuntimeError, :invalid_params unless valid? 
       # Hàm valid? trong ActiveModel::Model, return false khi vi phạm validates ở trên
       ActiveRecord::Base.transaction do
         create_company
         create_user
       end
     end

     private
     def create_company
       #Tạo một company với các attributes thích hợp
     end

     def create_user
       #Tạo một user
     end
   end
   ```
   Ở controller ta gọi form như sau: 
   ```ruby
   class Api::V1::ConfirmationsController < Api::V1::BaseController
   
   def create
     render_jsonapi Api::V1::ConfirmationForm.new(confirmation_params).save, type: :user_confirmation
   end
   
   private
   def confirmation_params
     params.require(:confirmation).permit :name, :phone_number, :token, :company_name, :postal_code, :address_building
   end
   ```
   
   Lúc này bạn có thể giảm bớt các câu validates bên model User và Company, làm model trở nên rõ ràng hơn thuận tiện cho việc maintain và sử dụng. Vậy là xong phần thứ nhất khi xử lý model, phần hai sẽ liên quan đến việc tóm gọn scope.
   + **Trong scope:**
   
  Trong dự án mình từng tham gia, ở model User đã từng xuất hiện số lượng dòng code ~200, và không nói quá thì trong nó như một bài "văn" vậy rất rối mắt và trong đó đa số các line code bị chiếm dụng bới scope :joy:. Giả sử bạn muốn lấy điểm cao nhất của từng users từ bảng users_exams và sắp xếp nó.
  
  ```ruby
  scope :sort_by_max_score, (lambda do |direction|
     left_joins(:users_exams)
     .select("(select max(score) from users_exams
      where users_exams.user_id = users.id) as max_score")
     .order("max_score": direction, updated_at: :desc)
  end)
  
 scope :distinct_users, -> {select("distinct users.*")} # Câu distinct ở đây bởi với mỗi user có nhiều users_exams
 
 User.distinct_users.sort_by_max_score 
  ```
Vậy là được một câu sort :v:, thử nghĩ nếu có cả filter và không chỉ mỗi max_score mà còn blah blah các thứ, vậy thì chúc mừng bạn sắp phải viết bài văn vào model User rồi đấy. Nhưng may thay design pattern cho  chúng ta một object để làm tất cả những công việc query phức tạp như thế này.

### QUERY OBJECT

Query Object theo trường hợp lý tưởng có thể hiểu là một class riêng biệt chứa một câu truy vấn cụ thể, và chỉ thực hiện một logic duy nhất.

```ruby
 class UsersQuery
  def initialize users = User.all, sort_params = {}, q_params = {}
    @users = users
    @sort_params = sort_params
    @q_params = q_params
  end

  def all
    users.from("(#{QUERY_OBJ}) as users").ransack(q_params).result
  end

  def sort
    all.send("sort_by_#{key}", direction)
  end

  private
  attr_reader :users, :sort_params, :q_params

  QUERY_OBJ = <<-SQL
    # Raw SQL
  SQL 

  def key
    sort_params.present? ? sort_params.keys.first : :updated_at
  end

  def direction
    sort_params.present? ? sort_params.values.first : :desc
  end
end
```

```ruby
def Api::V1::UsersController < Api::V1::BaseController
  def index
    users = UsersQuery.new.sort
    
    render_jsonapi users
  end
end
```

Như vậy bạn có thể thêm bao nhiêu câu query vào trong QUERY_OBJ tùy thích và biến cái scope phức tạp như lúc đầu thành thế này:
```ruby
scope :sort_by_max_score, ->(direction) {order max_score: direction, updated_at: :desc}
```
Một query_object được sử dụng tuân thủ theo các quy tắc về Single Responsibility Principle, trả về ActiveRecord::Relation(không phải Array) và đại diện cho một câu truy vấn phức tạp.

Bài viết đến đây là hết rồi, chúc bạn thành công trong công cuộc khiến code của mình clean và dry. Hẹn gặp lại ở phần 2 với design pattern cho Controller và một vài lỗi anti-pattern thông dụng :D 

Bài viết tham khảo từ 2 cuốn sách: Head First Design Pattern và Design Patterns for Dummies