Trong Ruby chúng ta có 1 thư viện chuẩn với tên gọi [Coverage](https://ruby-doc.org/stdlib-2.5.0/libdoc/coverage/rdoc/Coverage.html) để đo độ bao phủ code trong quá trình chương trình được thực thi. Bài viết này sẽ giới thiệu với các bạn các loại độ bao phủ code và cách đo chúng bằng thư viện Corverage.

# Trước Ruby 2.5

## Line coverage

Trước Ruby 2.5 thì khi dùng Corverage chúng ta chỉ có thể đo độ bao phủ code theo dòng (**line coverage**). Độ bao phủ code theo dòng cho chúng ta biết liệu 1 dòng code có được thực thi hay không, và nếu được thực thi thì nó được thực thi bao nhiêu lần.

Giả sử chúng ta có 1file `score.rb` với nội dung như dưới đây:

```ruby
score = 33

if score >= 40
  p :PASSED
else
  p :FAILED
end
```

Chúng ta tạo 1 file nữa với tên gọi `score_coverage.rb`.

```ruby
require "coverage"

Coverage.start
load "score.rb"
p Coverage.result
```

Chúng ta sử dụng method `Coverage#start` để đo độ bao phủ code trong file `score.rb` còn method `Coverage#result` trả về kết quả đo.

Thử chạy file `score_coverage.rb` với Ruby 2.4

```
$ RBENV_VERSION=2.4.0 ruby score_coverage.rb
:FAILED
{ "score.rb"=> [1, nil, 1, 0, nil, 1, nil] }
```

Mỗi giá trị trong mảng `[1, nil, 1, 0, nil, 1, nil]` cho biết số lần từng dòng code trong file `score.rb` được thực thi. Mảng này cũng được gọi là **line coverage** của file `score.rb`.

Giá trị `nil` trong mảng line coverage có nghĩa là việc đo độ bao phủ không được thực hiện ở dòng đó hoặc dòng đó không phải là 1 dòng thích hợp. Đối với những dòng như `else`, `end` hoặc các dòng trống thì việc đo độ bao phủ sẽ không được thực hiện.

Dưới đây là cách đọc hiểu kết quả line coverage ở trên:

- Dòng 1 (ứng với index số 0 trong mảng) được thực thi 1 lần
- Việc đo độ bao phủ không được thực hiện  ở dòng 2 vì dòng đó trống
- Dòng 3 được thực thi 1 lần
- Dòng 4 không được thực thi
- Việc đo độ bao phủ không được thực hiện  ở dòng 5 vì dòng đó chỉ chứa mỗi từ khoá `else`
- Dòng 6 được thực thi 1 lần
- Việc đo độ bao phủ không được thực hiện  ở dòng 7 vì dòng đó chỉ chứa mỗi từ khoá `end`.

# Sau Ruby 2.5

Kể từ Ruby 2.5 thì thư viện `Coverage` đã được thêm 2 tính năng mới là đo độ bao phủ theo nhánh (**branch coverage**) và theo method (**method coverage**). Hãy cùng tìm hiểu những điểm thay đổi của thư viện `Coverage` ở dưới đây.

## Line coverage

Nếu chạy file `score_coverage.rb` ở trên với Ruby 2.5 chúng ta sẽ thấy kết quả không có gì thay đổi.

```
$ RBENV_VERSION=2.5.0 ruby score_coverage.rb
:FAILED
{ "score.rb" => [1, nil, 1, 0, nil, 1, nil] }
```

Việc này là để đảm bảo method `Coverage#start` có độ tương thích ngược 100%.

Nếu chúng ta bật option `lines` khi gọi `Coverage#start` thì kết quả sẽ thay đổi như sau

```ruby
require "coverage"

Coverage.start(lines: true)
load "score.rb"
p Coverage.result
```

```
$ RBENV_VERSION=2.5.0 ruby score_coverage.rb
:FAILED
{ "score.rb" => {
    :lines => [1, nil, 1, 0, nil, 1, nil]
  }
}
```

Chúng ta có thể thấy kết quả đo độ bao phủ code của file `score.rb` bây giờ là 1 hash và line coverage của file đó vẫn là `[1, nil, 1, 0, nil, 1, nil]`.

## Branch coverage

Branch coverage cho chúng ta biết những nhánh nào trong code được thực thi và những nhánh nào không được thực thi.

Bây giờ chúng ta sẽ sửa lại file `score_coverage.rb` bằng việc bật option `branches`

```ruby
require "coverage"

Coverage.start(branches: true)
load "score.rb"
p Coverage.result
```

```
$ RBENV_VERSION=2.5.0 ruby score_coverage.rb
:FAILED
{ "score.rb" =>
  { :branches => {
      [:if, 0, 3, 0, 7, 3] => {
        [:then, 1, 4, 2, 4, 15] => 0,
        [:else, 2, 6, 2, 6, 15] => 1
      }
    }
  }
}
```

Thông tin chứa trong những mảng ở trên bao gồm:

```ruby
[
  BRANCH_TYPE,
  UNIQUE_ID,
  START_LINE_NUMBER,
  START_COLUMN_NUMBER,
  END_LINE_NUMBER,
  END_COLUMN_NUMBER
]
```

Chú ý là số thứ tự dòng được tính từ 1 còn số thứ tự cột được tính từ 0.

Nói 1 cách cụ thể thì 

- `[:if, 0, 3, 0, 7, 3]` có nghĩa là câu lệnh `if` bắt đầu ở dòng 3, cột 0 và kết thúc ở dòng 7, cột 3.
- `[:then, 1, 4, 2, 4, 15]` có nghĩa là mệnh đề `then` bắt đầu ở dòng 4, cột 2  và kết thúc ở dòng 4, cột 15.
- `[:else, 2, 6, 2, 6, 15]` có nghĩa là mệnh đề `else` bắt đầu ở dòng 6, cột 2  và kết thúc ở dòng 6, cột 15.

Ngoài những mảng này ra, từ kết quả ở trên chúng ta có thể thấy những thông tin quan trọng hơn là nhánh từ `if` đến `then` đã không được thực thi (giá trị ứng với key `[:then, 1, 4, 2, 4, 15]` là 0) còn nhánh từ `if` đến `else` được thực thi 1 lần (giá trị ứng với key `[:else, 2, 6, 2, 6, 15]` là 1).

## Method coverage

Đo độ bao phủ theo method cho chúng ta biết những method nào được gọi và những method nào không được gọi.

Giả sử chúng ta có 1 file `grade_calculator.rb` với nội dung như dưới đây

```ruby
students_scores = { "Sam" => [53, 91, 72],
                    "Anna" => [91, 97, 95],
                    "Bob" => [33, 69, 63] }

def average(scores)
  scores.reduce(&:+)/scores.size
end

def grade(average_score)
  case average_score
  when 90.0..100.0 then :A
  when 80.0..90.0 then :B
  when 70.0..80.0 then :C
  when 60.0..70.0 then :D
  else :F
  end
end

def greet
  puts "Congratulations!"
end

def warn
  puts "Try hard next time!"
end


students_scores.each do |student_name, scores|
  achieved_grade = grade(average(scores))

  puts "#{student_name}, you've got '#{achieved_grade}' grade."

  if achieved_grade == :A
    greet
  elsif achieved_grade == :F
    warn
  end

  puts
end
```

Để đo độ bao phủ theo method của file trên, chúng ta sẽ tạo 1 file `grade_calculator_coverage.rb` và sử dụng method `Converage#start` với option `methods`

```ruby
require "coverage"

Coverage.start(methods: true)
load "grade_calculator.rb"
p Coverage.result
```

Thử chạy file này với Ruby 2.5

```
$ RBENV_VERSION=2.5.0 ruby grade_calculator_coverage.rb
Sam, you've got 'C' grade.

Anna, you've got 'A' grade.
Congratulations!

Bob, you've got 'F' grade.
Try hard next time!

{ "grade_calculator.rb" => {
    :methods => {
      [Object, :warn, 23, 0, 25, 3] => 1,
      [Object, :greet, 19, 0, 21, 3] => 1,
      [Object, :grade, 9, 0, 17, 3] => 3,
      [Object, :average, 5, 0, 7, 3] => 3
    }
  }
}
```

Những thông tin chứa trong các mảng ở trên bao gồm

```ruby
[ 
  CLASS_NAME,
  METHOD_NAME,
  START_LINE_NUMBER,
  START_COLUMN_NUMBER,
  END_LINE_NUMBER,
  END_COLUMN_NUMBER
]
```

Từ đó chúng ta có thể thấy `[Object, :grade, 9, 0, 17, 3] => 3` có nghĩa là method `Object#grade` bắt đầu từ dòng 9, cột 0, kết thúc ở dòng 17, cột 3 và đã được gọi 3 lần trong quá trình thực thi file `grade_calculator.rb`.

Một lưu ý cuối cùng là chúng ta có thể đo 3 loại độ bao phủ ở trên cùng 1 lúc bằng cách gọi 

```ruby
Coverage.start(lines: true, branches: true, methods: true)
```

Bài viết đến đây là kết thúc. Hi vọng nó sẽ có ích cho các bạn trong quá trình kiểm thử chương trình Ruby nói chung và Rails web app nói riêng. Cảm ơn các bạn đã theo dõi!

# Tham khảo

Ruby 2.5 supports measuring branch and method coverages

https://blog.bigbinary.com/2018/04/11/ruby-2-5-supports-measuring-branch-and-method-coverages.html