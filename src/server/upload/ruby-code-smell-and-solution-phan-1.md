# Giới thiệu
Trong phần 1 của series này chúng ta sẽ nói về 1 anti-pattern cực cực kì kì phổ biến không chỉ ở Ruby/RubyOnRails mà rất nhiểu các ngôn ngữ lập trình, framework khác. Đó là  **Large Class**.

Cái tên nói lên tất cả, **Large Class** dịch nôm na nghĩa là các class nhìn rất khủng bố, cồng kềnh, số lượng dòng code quá lớn. Túm cái váy lại, nếu 1 class bạn đã code ra mà có 1 trong những tiêu chí sau thì bạn nên xem xét refactor lại ngay không chết mấy ông code đoạn của mình, cũng như việc scale up dự án.

* Bạn không thể mô tả chình xác class đó đang làm cái gì trong 1 câu.
* Class đó cần thay đổi không chỉ bởi 1 lí do.
* Class đó có hơn 7 methods
* Class đó có điểm flog khoàng 50 trở lên. ( Mải ngồi chém gió, mình quên chưa giới thiệu **flog** là 1 tool ý nhầm gem ^^ giúp tính toán độ mùi code của chúng ta, và sẽ trả về 1 số điểm tương ứng, điểm flog càng cao code càng như ... Các bạn có thể tìm hiểu ở đây https://github.com/seattlerb/flog).

# Code Smell
Chém gió dài dòng quá happy coding phát cho dễ hiểu.
Sau đây là 1 đoạn code siêu mùi, siêu to khổng lồ đặc trưng cho **Large Class**.

```ruby
class Question < ActiveRecord::Base
  include ActiveModel::ForbiddenAttributesProtection

  SUBMITTABLE_TYPES = %w(Open MultipleChoice Scale).freeze

  validates :maximum, presence: true, if: :scale?
  validates :minimum, presence: true, if: :scale?
  validates :question_type, presence: true, inclusion: SUBMITTABLE_TYPES
  validates :title, presence: true

  belongs_to :survey
  has_many :answers
  has_many :options
  accepts_nested_attributes_for :options, reject_if: :all_blank

  def summary
    case question_type
    when 'MultipleChoice'
        summarize_multiple_choice_answers
    when 'Open'
        summarize_open_answers
    when 'Scale'
        summarize_scale_answers
    end
  end

  def steps
    (minimum..maximum).to_a
  end

  private

  def scale?
    question_type == 'Scale'
  end

  def summarize_multiple_choice_answers
    total = answers.count
    counts = answers.group(:text).order('COUNT(*) DESC').count
    percents = counts.map do |text, count|
      percent = (100.0 * count / total).round
      "#{percent}% #{text}"
    end

    percents.join(', ')
  end

  def summarize_open_answers
    answers.order(:created_at).pluck(:text).join(', ')
  end

  def summarize_scale_answers
    sprintf('Average: %.02f', answers.average('text'))
    end
  end
```

Oài nếu nhảy vào 1 dự án, thấy đoạn code này chắc chắn câu đầu tiên bạn thốt lên sẽ là WTF???, hay Tiếng Việt là ...(các bạn tự nghĩ nhé).
Các bạn sẽ dễ dàng thấy được class này có những vấn đề như sau:
* Class quá dài
* Class có quá nhiều `private method` nhiều hơn số lượng `public method` dẫn tới việc class này sẽ chịu trách nhiệm cho rất nhiều thứ.
* Các bạn để ý method `summary` ở đây có dùng swich case. Mà đã dùng switch case khả năng thêm case mới là rất cao trong tương lai => code của class bị thay đổi nhiều trong tương lai, các hành vi của class cũng bị thay đổi theo các case mới của `question_type`. 

Đây là những thứ cơ bản bạn sẽ nhận ra khi vừa nhìn qua code trên. OK vậy giải pháp ở đây là gì ??? 

# Giải pháp
OK. Bây giờ trước khi refactor đoạn code trên chúng ta sẽ tìm hiểu 1 số các solution có thể đã.
* **Move Method**: đây là cách đầu tiên mà mọi người sẽ nghĩ đến, trông cái class này nhiều method thì di chuyển tạm sang class khác. Nói đơn giản vậy nhưng bạn cần phải di chuyển tới đúng class cần chuyển, và class đó khả năng xử lí method tốt hơn
* **Extract Class** Chia ra làm nhiều class nhỏ nếu class đó chịu quá nhiều trách nhiệm. Ví dụ 1 bà vợ chịu trách nhiệm từ việc nấu ăn rửa bát, giặt quần áo, rồi thì abcxyz chi bằng ta lấy thêm mấy bà vợ nữa có phải các bá đều nhàn k( ế nhưng mà thế thì ông chồng lại nhọc ^^)
* Thay thế các câu điều kiện bằng tính đa hình: Cái này khó hiểu a nghen chắc mình sẽ viết riêng 1 bài về cái solution này.
* Các kĩ thuật extract object phổ biến trong Rails như: **Form Object**,  **Value Object**,  **Decorator Object**,  **Policy Object**,  **Service Object**... oài nhiều phết

# Cách phòng tránh
Cách phòng tránh tốt nhât cho **Large Class** là tuân thủ theo các quy ước có sẵn.
* **Single responsibility principle** Theo nguyên tắc này, mỗi class chỉ chịu 1 trách nhiệm duy nhất, khá dễ hiểu phải không.
*  **Composite over inheritance**  Inheritance là 1 điều điều gì đó rất tuyệt vời nhưng nếu không được áp dụng đúng sẽ là thật là kinh khủng. Composite hiểu đơn giản là cách tạo nên 1 object từ rất nhiều thành phần con, chứ không inheritance từ ông bố nào đó. Như vậy bạn có thể customize bất cứ phần nào của class(WOW Amesome)
*  **Dependency Injection** Cái này khó hiểu nè nhưng hiểu ra cũng thú vị lắm. Với khả năng chém gió hạn hẹp của mình chắc không thể nói đơn giản cho các bạn được. Các bạn có thể tìm hiểu thêm ở đây ( https://medium.com/@Bakku1505/introduction-to-dependency-injection-in-ruby-dc238655a278 )

Như vậy ở phần đầu của bài viết này mình đã giới thiệu sơ qua về anti-pattern **Large Class**. Trong những bài viết tiếp theo mình sẽ giới thiệu về các anti-pattern khác cũng như solution của chúng. Hi vọng mọi người sẽ theo dỏi và ủng hộ. Bye bye.

# Tài liệu tham khảo
https://github.com/thoughtbot/ruby-science