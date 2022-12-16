Khi chúng ta muốn tạo 1 multiselect box với 2 box Remove và Add rõ ràng như sau:
![](https://images.viblo.asia/f97ec91f-823f-425f-9e18-7c1bf8031cb6.png)

Thì đã có rất nhiều các thư viện js hỗ trợ điển hình là Jquery multiselect.js.<br>
Nhưng mình muốn tự làm 1 cái đơn giản chỉ với Jquery và sẽ kết hợp với nested_attributes của rails luôn.<br>
Ví dụ mình có 1 bảng Exam và 1 bảng Question có quan hệ n-n như sau:
```ruby
#models/exams.rb
class Exam < ApplicationRecord
  has_many :exam_questions, dependent: :destroy
  has_many :questions, through: :exam_questions
end
```

```ruby
#models/exam_questions.rb
class ExamQuestion < ApplicationRecord
  belongs_to :question
  belongs_to :exam
end
```

```ruby
#models/questions.rb
class Question < ApplicationRecord
  has_many :exam_questions, dependent: :destroy
  has_many :exams, through: :exam_questions
  
  scope :by_not_ids, -> (ids){where.not(id: ids)}
  # mình sẽ dùng scope trên để xíu nữa lấy ra các question chưa được thêm vào đề thi
end
```

Và mình muốn khi tạo Exam thì sẽ có thể chọn được các question vào exam đó luôn. Nên mình sẽ thêm `accepts_nested_attributes_for` trong exam_questions.rb
```ruby
#models/exam_questions.rb
class ExamQuestion < ApplicationRecord
  belongs_to :question
  belongs_to :exam
  accepts_nested_attributes_for :exam_questions, allow_destroy: true
end
```

Trong exams_controller.rb chỉ cần như sau:
```ruby
class ExamsController < ApplicationController
  before_action :load_exam, except: %i(index create new)
  
  def new
    @exam = Exam.new
    respond_to do |format|
      format.js
      format.html
    end
  end
  
  def create
    @exam = Exam.new exam_params
    if @exam.save
      flash[:success] = "Tạo đề thi thành công"
      redirect_to admin_exams_path
    else
      flash.now[:danger] = "Tạo đề thi thất bại"
      respond_to do |format|
        format.js
      end
    end
  end
  
  def update
    if @exam.update_attributes exam_params
      flash[:success] = "Cập nhật đề thi thành công"
      redirect_to admin_exams_path
    else
      flash.now[:danger] = "Cập nhật đề thi thất bại"
      respond_to do |format|
        format.js
      end
    end
  end

  def edit
  end
  
  private

  def load_exam
    @exam = Exam.find_by id: params[:id]
    return if @exam
    flash[:danger] = "Không tìm thấy đề thi"
    redirect_to admin_exams_path
  end

  def exam_params
    params.require(:exam).permit :title, exam_questions_attributes: %i(id question_id _destroy)
  end
end
```
Trong ví dụ này mình sẽ chỉ tạo exam có 1 thuộc tính duy nhất là `title`.<br>

Trong `views/exams/new.html.erb`:
```erb
<div class="block full">
  <div class="block-title text-center">
    <strong> Thêm mới đề thi </strong>
  </div><br>
  <%= render "form" %>
</div>
```

Trong `views/exams/edit.html.erb`:
```erb
<div class="block full">
  <div class="block-title text-center">
    <strong> Sửa đề thi </strong>
  </div><br>
  <%= render "form" %>
 </div>
```

và cuối cùng là `views/exams/form.html.erb`:
```erb
<%= simple_form_for @exam, html: {id: "exam-form"} do |f| %>

  <div class="row">
    <div class="col-md-3">
      <div class="pull-right">
        <strong>Tên đề thi</strong>
      </div>
    </div>
    <div class="col-md-7">
      <%= f.input :title, label: false, placeholder: "Nhập tên bài thi" %>
    </div>
  </div>
  
  <!-- select box Câu hỏi chưa được thêm vào đề thi -->
  <div class="col-md-6">
    <div class="block select-box-question avaiable-questions">
      <div class="block-title text-center">
        Danh sách câu hỏi có sẵn
      </div>
      <!-- by_not_ids để lấy ra danh sách câu hỏi chưa được thêm vào đề thi trong trường hợp edit exam -->
      <% Question.by_not_ids(@exam.question_ids).each do |question| %>
        <div class="block-question" data-question-id="<%= question.id %>">
          <%= strip_tags(question.content).truncate(50) %>
        </div>
      <% end %>
    </div>
  </div>
  
  <!-- select box Câu hỏi được thêm vào đề thi -->
  <div class="col-md-6">
    <div class="block select-box-question selected-questions">
      <div class="block-title text-center">
        Danh sách câu hỏi được chọn
      </div>
      <% @exam.exam_questions.each do |exam_question| %>
        <div class="block-question remove-exam" data-id="<%= exam_question.id %>">
          <%= strip_tags(exam_question.question.content).truncate(50) %>
        </div>
      <% end %>
    </div>
  </div>
  
  <br>
  <div class="text-center">
    <%= f.button :button, type: "button", id: "submit-exam-btn", class: "btn btn-sm btn-primary", name: nil do %>
      <i class="fa fa-floppy-o" aria-hidden="true"></i>
      Lưu đề thi
    <% end %>
  </div>
  <br>
<% end %>
```

Okay, giờ đến phần xử lý js:
```js
// Xử lý click vào tên question thì sẽ nhảy từ box remove sang box add và ngược lại
$(document).on('click', '.block-question', function() {
  if ($(this).parent('.avaiable-questions').length){
    $('.selected-questions').append($(this))
    $('.avaiable-questions').remove($(this))
  }
  else if ($(this).parent('.selected-questions').length){
    $('.avaiable-questions').append($(this))
    $('.selected-questions').remove($(this))
  }
});

// Xử lý khi ấn nút tạo exam
$(document).on('click' ,'#submit-exam-btn', function() {
  // lấy ra id của form
  var form = $(this).closest('#exam-form');
  
  // xử lý để phân biệt create và update exam
  var url = form.attr('action');
  var type = form.find('input[name="_method"]').val() || form.attr('method');

  // lấy giá trị của ô input title
  var title = $('#exam_title').val();

  // khởi tạo 1 biến json để lưu thông tin question 
  var exam_questions_attributes = {}
  
  // vòng lặp để lấy thông tin từng question trong "Add box" để lưu id(exam_question_id) và question_id vào biến exam_questions_attributes
  $('.selected-questions .block-question').each(function(index){
    exam_questions_attributes[index] = {"id": $(this).data('id'), "question_id": $(this).data('question-id')}
  });

  // cái này để lấy ra số question đã được lưu vào exam_questions_attributes
  var number_questions_selected = Object.keys(exam_questions_attributes).length;

  // vòng lặp để lấy thông tin từng question trong "Remove box" để lưu id(exam_question_id) và 1 biến mặc định _destroy = true(để đánh dấu cho nested_attributes biết phải xóa question_exam này) nối tiếp danh sách các "add question" trong biến exam_questions_attributes
  $('.avaiable-questions .remove-exam').each(function(index){
    exam_questions_attributes[index + number_questions_selected] = {"id": $(this).data('id'), "_destroy": true}
  });

  // Cuối cùng là gửi ajax các thông tin đã được xử lý đến controller để lưu thôi 
  $.ajax({
    url: url,
    type: type,
    data: {
      "exam[title]": title,
      "exam[exam_questions_attributes]": exam_questions_attributes
    }
  });
});
```
Xong, và đây là những gì chúng ta có :
![](https://images.viblo.asia/08d1e646-247b-4d93-8c92-9b0077d4c56f.gif)

### Tài liệu tham khảo 
https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
https://www.w3schools.com/js/js_json.asp