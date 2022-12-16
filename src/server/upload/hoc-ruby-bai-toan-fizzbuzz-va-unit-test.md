Chào các bạn.

Sau bài [khai bút đầu năm](https://viblo.asia/p/vi-du-viet-test-rspec-va-viet-code-ruby-on-rails-gGJ59BD9KX2) và làm 1 chút test ở LinkedIn về Ruby on Rails(đã passed), mình cảm thấy có lẽ nên quay về luyện tập với Ruby thuần lại 1 chút. Ngoài ra mình cũng mới thực sự để tâm tới chứng chỉ Ruby Silver và Ruby Gold(ở Nhật) nên mong là thời gian tới, mình sẽ cố gắng để học Ruby thuần không framework và có thể ghi lại những câu hỏi mà mình memo trong quá trình ôn luyện thành 1 bài viết để mọi người có thể đọc. Dự định bài viết mình định xây dựng sẽ không đơn thuần là kiểu học ôn rồi cho đáp án luôn hay tips, mà sẽ theo cách thử bằng code có test để nội dung đổi mới, đồng thời cũng để luyện tập luôn viết unit test. Rất mong mọi người đón đọc và góp ý nếu mình lỡ chệch đường viết kiểu: câu hỏi-đáp án-giải thích mà không có quá trình code.

Bài lần này mình sẽ tiếp cận lại bài toán FizzBuzz theo hướng của người đã có kinh nghiệm về Ruby.

![image.png](https://images.viblo.asia/41c06e5d-9b94-4aee-bf61-257f90bde5db.png)

# Bài toán FizzBuzz
FizzBuzz là bài toán lập trình về câu lệnh điều kiện mình nghĩ ai học code cũng phải từng trải qua. Nhập các số nguyên vào làm input. Nếu là số chia hết cho 3, chúng ta sẽ có Fizz; chia hết cho 5 là Buzz và chia hết cho cả 3 lẫn 5 là FizzBuzz. Các trường hợp còn lại sẽ trả lại đúng giá trị input.
# Xử lý bài toán
Nếu như ở sách thì chắc chắn chúng ta sẽ được hướng dẫn viết chương trình luôn, sau đó quay ngược trở lại viết unit test.

Nhưng ở đây là người có kinh nghiệm về Ruby rồi, nên tự bản thân mình có bảo:

![](https://images.viblo.asia/997496f2-a2f9-474e-9f56-09ba59f8f215.png)

Thế nên các bước mình sẽ làm ngắn gọn như sau:
## Viết test case
Trước tiên, mình sẽ làm thư mục có cấu trúc như sau:
```
|-lib/
|--fizz_buzz.rb
|-test/
|--fizz_buzz_test.rb
```
Và test case viết ra mình sẽ cho vào thư mục test. Còn chương trình sẽ để vào thư mục `lib/`.

Ở đây thì mình sẽ dùng `gem 'minitest'` mặc định thôi nên viết ở `fizz_buzz_test.rb` sẵn như sau:
```Ruby
require 'minitest/autorun'
require './lib/fizz_buzz'

class FizzBuzzTest<Minitest::Test
  def test_fizz_buzz
    # test cases here
  end
end
```
Tiếp đây chúng ta sẽ phân tích: yêu cầu là có 4 trường hợp: chia hết cho 3, chia hết cho 5, chia hết cho 15 và có dư. Vậy nên ít nhất chúng ta phải có các case là 1, 3, 5, 15.

Để kiểm tra được tốt hơn thì mình sẽ lấy thêm 1 case 6 ở Fizz, case 10 ở Buzz. Case FizzBuzz mình sẽ lấy thêm 30.

Và với case trả nguyên số thì mình sẽ lấy 2,4. Nếu để gọn thì chỉ cần lấy thêm 1. Nhưng mình nghĩ ở đây liền thứ tự sẽ đẹp bài hơn

Và cứ theo yêu cầu ta có:
```Ruby
require 'minitest/autorun'
require './lib/fizz_buzz'

class FizzBuzzTest<Minitest::Test
  def test_fizz_buzz
    assert_equal '1', fizz_buzz(1)
    assert_equal '2', fizz_buzz(2)
    assert_equal 'Fizz', fizz_buzz(3)
    assert_equal '4', fizz_buzz(4)
    assert_equal 'Buzz', fizz_buzz(5)
    assert_equal 'Fizz', fizz_buzz(6)
    assert_equal 'Buzz', fizz_buzz(10)
    assert_equal 'Fizz Buzz', fizz_buzz(15)
    assert_equal 'Fizz Buzz', fizz_buzz(30)
  end
end
```

Viết xong rồi thì bước tiếp theo là chạy thử bằng `ruby test/fizz_buzz_test.rb` . Đừng mong đợi lần này chạy success, vì chúng ta đã viết code chính quái đâu.
## Viết code chính

Giờ chúng ta quay qua code chính ở `fizz_buzz.rb`
```Ruby
def fizz_buzz(n)
  if n % 15 == 0
    'Fizz Buzz'
  elsif n % 3 == 0
    'Fizz'
  elsif n % 5 == 0
    'Buzz'
  else
    n.to_s
  end
end
```

Bài cũng khá đơn giản và nhanh. Lúc này thì chạy test kia chắc chắn là pass rồi. Và chạy thử chương trình chắc chắn cũng ổn.

Vậy bày đặt viết test case làm gì?

## Yêu cầu bổ sung: không dùng if else

Mình nghĩ cái này mọi người gặp nhiều rồi. Phổ biến nhất là coding convention ở trong Ruby. Có các tình huống khác là nâng cấp version Rails/Ruby lên. Khi đó test case đóng vai trò quan trọng trong việc xác nhận hệ thống hoặc code viết ra có cho ra output mong muốn hay là không. Nếu không có test case trong trường hợp này thì công sức bạn bỏ ra để chạy thử toàn hệ thống thao cách thủ công sẽ rất lớn(Mình không đảm bảo test case chạy đúng thì hệ thống sẽ hoạt động đúng mà chỉ là phần lớn thôi. Nhưng thế cũng là 1 độ yên tâm cao để những phần test không cover được ta sẽ test bằng tay).

Ở đây thì yêu cầu sau khi đem code `fizz_buzz.rb` kia commit lên hệ thống, bạn bị review code lại với comment ở Github: KHÔNG DÙNG IF ELSE Ở ĐÂY!

Lúc này đơn giản là thay đổi code lại dùng `case ... when`. Và để kiểm tra hệ thống chạy đúng như kq cũ ko chúng ta sẽ chạy lại chương trình bằng tay mất khoảng gần 1 phút với việc gõ từng case... hoặc là chạy test viết ở trên chưa đến 10s.

Chương trình sẽ được viết lại như sau: 
```Ruby
def fizz_buzz(n)
  case
  when n % 15 == 0
    'Fizz Buzz'
  when n % 3 == 0
    'Fizz'
  when n % 5 == 0
    'Buzz'
  else
    n.to_s
  end
end
```
Đó. Bây giờ chạy lại kiểu gì thì cũng ổn rồi!
# Kết luận
Như vậy là mình đã áp dụng practice viết test trước, viết code sau với 1 bài toán FizzBuzz đơn giản. Hẹn gặp lại các bạn ở bài viết tiếp theo