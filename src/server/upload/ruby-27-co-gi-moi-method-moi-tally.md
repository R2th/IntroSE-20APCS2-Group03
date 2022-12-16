Ruby 2.7 sẽ ra mắt vào tháng 12 năm nay, sẽ là 1 phiên bản hứa hẹn mới chăng?
Và từ bây giờ chúng ta đã có thể bắt đầu tìm kiếm & khám phá trước những điều thú vị sẽ được Release sắp tới.
![](https://images.viblo.asia/24cc24fc-291c-47dc-a11b-470b8bc68c94.png)
Lượn lờ 1 vòng docx của Ruby, chúng ta thấy có phương thức mới `Enumerable#tally`, cùng khám và phá nàoooo.  Let's go !!!

## Tally
`tally` sẽ đếm mọi thứ như sau ...

```Ruby
[1, 1, 2].tally
# => { 1 => 2, 2 => 1 }
[1, 1, 2].map(&:even?).tally
# => { false => 2, true => 1 }
```

## Ví dụ
Ví dụ được sử dụng trong đoạn code Test chính thức của Ruby cung cấp như sau:
```Ruby
[1, 2, 2, 3].tally
# => { 1 => 1, 2 => 2, 3 => 1 }
```

Có thể thấy `tally` hoạt động bằng cách đếm số lần xuất hiện của từng thành phần trong 1 Array.
Nếu chưa thực sự hiểu, chúng ta thử áp dụng điều này với Hash, nó có thể rõ ràng hơn 1 chút:
```Ruby
%w(foo foo bar foo baz foo).tally
=> {"foo"=>4, "bar"=>1, "baz"=>1}
```

Hiện tại `tally_by` chưa được chấp nhận vào core. Do đó, để thử dùng phương thức này chúng ta có thể thay thế bằng `map` trước.
```Ruby
%w(foo foo bar foo baz foo).map { |s| s[0] }.tally
=> {“f” => 4, “b” => 2}
```

Ở bài viết này, chúng ta "tạm chấp nhận" tính năng này, điều này sẽ tạo ra syntax như sau với `tally_by`:
```Ruby
%w(foo foo bar foo baz foo).tally_by { |s| s[0] }
=> {“f” => 4, “b” => 2}
```

## Tại sao lại dùng Tally?
Nếu bạn đã sử dụng Ruby, rất có thể bạn đã viết (hoặc thấy) những đoạn code giống như 1 trong những dòng dưới đây:
```Ruby
list.group_by { |v| v.something }.transform_values(&:size)
list.group_by { |v| v.something }.map { |k, vs| [k, vs.size] }.to_h
list.group_by { |v| v.something }.to_h { |k, vs| [k, vs.size] }
list.each_with_object(Hash.new(0)) { |v, h| h[v.something] += 1 }
```

Sẽ có khá nhiều biến thể khác  nhau của việc này, nhưng ở trên là 1 trong số những  biến thể phổ biến hơn cả mà bạn có thể thấy xung quanh.

## Tally tạo nên như thế nào
Phương pháp này hình thành như thế nào? Chàaa, nếu chúng ta thực hiện nó trong Ruby 1 cách đơn giản thì nó trông như thế nào nhỉ?
```Ruby
module Enumerable
  def tally_by(&function)
    function ||= -> v { v }
    
    each_with_object(Hash.new(0)) do |value, hash|
      hash[function.call(value)] += 1
    end
  end
  
  def tally
    tally_by(&:itself)
  end
end
```

Trong trường hợp không có các method được cung cấp sẵn, nó sẽ tự đếm chính nó, `itself` như 1 chức năng tự nhận dạng.
> Hàm nhận dạng `itself` là một hàm trả về những gì nó đã được cung cấp. Nếu bạn cho nó 1, nó trả về 1. Nếu bạn cho nó đúng, nó trả về đúng. Ruby cũng sử dụng khái niệm này trong một phương thức gọi là chính nó.

Stop -> Ở bài viết này chúng ta sẽ không đi sâu vào những gì đoạn code trên đã làm.  Chúng ta có thể tìm hiểu & thảo luận nó ở [đây](https://medium.com/@baweaver/reducing-enumerable-part-five-cerulean-master-of-tally-by-9d5f9e430bc2)

## Source Code
Nobu gần đây đã đẩy lên 1 commit fix lỗi trong Ruby core để thêm phương thức này:
Các bạn có thể xem chi tiết ở [đây](https://github.com/ruby/ruby/commit/673dc51c251588be3c9f4b5b5486cd80d46dfeee)

Và nó đã được Ruby core team chấp nhận với cái tên cuối cùng `tally` :v 
Tham khảo ở [đây](https://bugs.ruby-lang.org/issues/11076#change-75622)

## Tally?
Vậy cuối cùng Tally nghiã là gì? (mình xem phép để tiếng anh để đảm bảo ý nghĩa đúng nhất trong từ điển, hihi)
> **A tally** is a record of amounts or numbers which you keep changing and adding to as the activity which affects it progresses.
> https://www.collinsdictionary.com/us/dictionary/english/tally

Việc lựa chọn tên này đến từ đâu? Ban đầu tên `count_by` được đề xuất, nhưng tên nó đã bị từ chối vì nó gần với phương thức `count` và có 1 vài ý nghĩa không thực sự chính xác.
Trong 1 chuyến xe trở về từ khu vực Tahoe và RailsCamp West, chúng tôi (tôi, David, Stephanie và Shannon) đã thảo luận về những caí tên thay thế tiềm năng đề thử và đề xuất xem liệu tính năng này có thể được đặt dưới 1 tên khác không.

David đã đề xuất `tally`, và chính thức cái tên này được suggest. Có vẻ như đây là 1 cái tên hoàn hảo.
Bây giờ tôi đã trình bày một bài nói chuyện tại một vài hội nghị và quyết định đề cập đến `tally_by` thay vì  `Count_by` trong bài nói chuyện RubyConf của tôi trong một phần. Phiên bản bằng văn bản đã kết thúc tại [đây](https://medium.com/@baweaver/reducing-enumerable-part-five-cerulean-master-of-tally-by-9d5f9e430bc2)

Bài viết được dịch từ nguồn: https://medium.com/@baweaver/ruby-2-7-enumerable-tally-a706a5fb11ea