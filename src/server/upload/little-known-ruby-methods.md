Ruby có rất nhiều method tích hợp sẵn. Sử dụng method phù hợp giúp tiết kiệm công sức và nâng cao hiệu suất, chất lượng công việc. Dưới đây là danh sách một số method thú vị nhưng ít được biết đến.
## 1. `Integer#digits`
Method này được giới thiệu trong Ruby 2.4, rất hữu ích khi làm việc với các chữ số của một số nguyên, nó dưa các chữ số của một số nguyên vào một mảng, và sắp xếp ngược lại.

Trước khi có `digits`, để lấy các chữ số của một số nguyên, giải pháp điển hình là chuyển số thành một chuỗi, sau đó cắt chuỗi thành một mảng ký tự bằng method `chars`, cuối cùng chuyển đổi những chuỗi vừa cắt được trở lại thành số nguyên:
```
123.to_s.chars.map(&:to_i).reverse
=> [3, 2, 1]
```
Với digits, mọi thứ đơn giản hơn nhiều:
```
123.digits
=> [3, 2, 1]
```
## 2. `Object#tap`
Khi bạn muốn tạo một object, thực thi một số method trên object, sau đó trả về object đó. Bạn có thể làm như sau:
```
user = User.new
user.name = "Test"
user
```
Cách trên cần chỉ định rõ đối tượng trả về, dùng đến biến tạm thời.

Với `tap` thì ví dụ trên sẽ trở thành: 
```
User.new.tap { |user| user.name = "Test" }
```
Đây là một method Ruby hữu ích.
## 3. `Array#values_at`
Trả về một mảng chứa các phần tử của mảng ban đầu tương ứng với các các vị trí truyền vào. Thường dùng với mục đích lấy nhiều giá trị không tuần tự từ một mảng hoặc một Hash.
```
arr = [1,2,3,4,5]
a, b, c = arr.values_at(0, 1, 4)
=> [1, 2, 5]
```
Ví dụ trên tướng tự với:
```
arr = [1,2,3,4,5]
a, b, c = arr[0], arr[1], arr[4]
=> [1, 2, 5]
```
`values_at` cũng được dùng với Hash:
```
hash = {a: 10, b: 20}
hash.values_at(:a, :b)
=> [10, 20]
```
## 4. `Hash#transform_values`
Trả về một Hash mới với các values được thực thi block, keys không thay đổi. Thường dùng khi muốn thay đổi tất cả values của Hash.

Giải pháp có thể là :
```
hash = {a: 10, b: 20}
hash.each { |k, v| hash[k] = v * 2 }
=> {:a=>20, :b=>40}
```
Với phiên bản Ruby >= 2.4, có một cách tốt hơn để làm điều này :
 ```
hash.transform_values { |v| v * 2 }
=> {:a=>40, :b=>80}
```
Đây là một method đến từ Rails, nhưng hiện đã có thể dùng ngoài framework.
## 5. `Kernel#itself`
Trả về object itself. Hữu ích cho các chaining methods, chẳng hạn `scope`.

Giả sử chúng ta có một mảng với các từ lặp lại và muốn đếm số lặp lại. Có rất nhiều cách để làm điều này, trong đó có thể dùng `Kernel#itself`.

```
words = %w(cat cat tiger dog cat)
words.group_by(&:itself).each_with_object({}) { |(k,v), hash| hash[k] = v.size }
=> {"cat"=>3, "tiger"=>1, "dog"=>1}
```
Trong documentation `itself` xuất hiện dưới `class Object`, nhưng nó được định nghĩa trên `module Kernel`.
## 6. `Enumerable#cycle`
Block gọi cho mỗi phần tử của enum lặp đi lặp lại n lần hoặc mãi mãi nếu none hoặc nil không được đưa ra. Trả về nil nếu vòng lặp kết thúc mà không bị gián đoạn. Nếu không có block, một enumerator được trả về.

Bạn muốn lặp lại một pattern hay chuyển đổi giữa 2 giá trị nào đó, `Enumerable#cycle` có thể là method bạn đang tìm kiếm.

```
array = %w(a b c)
array.cycle(3).to_a    # same as array * 3
=> ["a", "b", "c", "a", "b", "c", "a", "b", "c"]
```

```
switch = %w(on off).cycle
switch.next
```
Rất hữu ích bởi vì không cần phải kiểm tra giá trị hiện tại để chuyển đổi sang giá trị còn lại. Chỉ cần gọi `next` còn lại để Ruby làm.
## 7. `String#squeeze`
Đây là một method đơn giản hoạt động trên các chuỗi, nhiệm vụ là loại bỏ các ký tự trùng lặp. Nếu chỉ gọi `squeeze` mà không truyền vào tham số sẽ nhận lại một chuỗi mới dã thay thế tất cả các chuỗi ký tự giống nhau bằng một ký tự duy nhất.
```
"aabbccdda".squeeze 
=> "abcda"
```
Cũng có thể truyền vào một range của characters, hữu ích nếu chỉ muốn xóa các bản sao của một số ký tự nhất định.
```
"aabbbccddeefffggg".squeeze("a-f")
=> "abcdefggg"
```
## 8. `Array#bsearch`
Khi tìm kiếm thông qua mảng trong Ruby, phương pháp đầu tiên xuất hiện được hướng đến trí là `Enumerable#find`. Phương pháp này sẽ tìm kiếm trong toàn bộ mảng cho đến khi tìm thấy kết quả phù hợp. Lý tưởng nhất là phần tử cần tìm ở vị trí đầu tiên, cần độ phức tạp O(n) để chạy một tìm kiếm nếu nó là phần tử cuối của một mảng lớn.

Có một cách nhanh hơn, `Array#bsearch` có thể tìm thấy một phần tử chỉ với độ phức tạp O(log n).

Dưới đây là sự khác biệt về thời gian tìm kiếm giữa hai phương pháp khi tìm kiếm trong phạm vi 50.000.000 số:
```
require 'benchmark'

data = (0..50_000_000)

Benchmark.bm do |x|
  x.report(:find) { data.find {|number| number > 40_000_000 } }
  x.report(:bsearch) { data.bsearch {|number| number > 40_000_000 } }
end

       user     system      total        real
find  2.257520   0.000000   2.257520 (  2.257550)
bsearch  0.000006   0.000000   0.000006 (  0.000006)
```
Như bạn có thể thấy, `bsearch` nhanh hơn nhiều. Tuy nhiên, khi dùng`bsearch`: Mảng phải đã được sort, điều này phần nào hạn chế tính hữu dụng của nó.

Lưu ý: Độ phức tạp của các thuật toán tìm kiếm được sắp xếp theo thứ tự: O(1), O(log n), O(n), O(n log(n)), O(n^2), O(2^n), O(n!), với n là kích thước của mảng. Bạn có thể tìm hiểu chi tiết hơn qua Google :stuck_out_tongue_winking_eye:
## 9. `Enumerable#flat_map`
Trả về một mảng mới với các kết quả được thực thi lệnh trong block một lần cho mọi phần tử trong enum. Nếu không có block, một enumerator sẽ được trả về.

Khi xử lý dữ liệu quan hệ, đôi khi chúng ta cần thu thập một loạt các thuộc tính không liên quan và trả về chúng trong một mảng không lồng nhau.

Giả sử bạn có một blog và bạn muốn tìm author của các comment để lại trên các post được viết trong tháng trước bởi một nhóm người dùng nhất định:
```
class Comment < ApplicationRecord
  def self.find_users(user_ids)
    users = User.where(id: user_ids)
    users.map { |user|
      user.posts.map { |post|
        post.comments.map { |comment|
          comment.author.name
        }.flatten
      }.flatten
    }.flatten
  end
end
```
Sau đó, bạn sẽ nhận được một kết tương tự:
```
Comment.find_users [1,2,3,4,5,6,7,8,9]
=> ["Author 1", "Author 2", "Author 3", "Author 4", nil, "Author 5"]
```
Bạn có một tùy chọn khác để có thể thu được kết quả như trên:
```
class Comment < ApplicationRecord
  def self.find_users(user_ids)
    users = User.where(id: user_ids)
    users.flat_map { |user|
      user.posts.flat_map { |post|
        post.comments.flat_map { |comment|
          comment.author.name
        }
      }
    }
  end
end
```
## 10. `<=>`
Để minh họa cách `<=>` hoạt động, cùng thử nghiệp với:
- `5<=>5`, trả về 0.
- `4<=>5`, trả về -1.
- `5<=>4`,  trả về 1.

=> Nếu hai số bằng nhau, trả về 0; khác nhau, xếp theo thứ tự tăng dần, trả về -1; khác nhau, xếp theo thứ tự giảm dần, trả về 1; Nếu không thể so sánh trả về nil

`<=>` rất hữu ích để xác định thứ tự sắp xếp và các phép toán số học vì nó trả về một trong giá trị kiểu Fixnum.

*Hy vọng những method đã giới thiệu ở trên hữu ích với bạn!*

*Thank you for reading!* :kissing_closed_eyes:

***Tham khảo***

[7 Little-Known Ruby Methods To Help You Write Better Code](https://www.rubyguides.com/2017/10/7-powerful-ruby-methods/)

[4 Ruby Methods You Didn’t Know You Needed](https://medium.com/better-programming/4-ruby-methods-you-didnt-know-you-needed-1b223ec1963c)

[Five Ruby Methods You Should Be Using](https://blog.engineyard.com/five-ruby-methods-you-should-be-using)