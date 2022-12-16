Ruby không ngừng phát triển

Phiên bản 2.7 này xoay quanh những  thay đổi về các tính năng và phương thức mới. 

Dự kiến release bản chỉnh thức vào [ngày 25 tháng 12 năm 2019](https://bugs.ruby-lang.org/projects/ruby-trunk/roadmap#2.7)

Theo Matz (Yukihiro Matsumoto - người sáng tạo ra Ruby) thì đây chính là phiên bản 2.x cuối cùng trước khi chúng ta đón phiên bản 3.0  vào năm sau

Trước khi chờ đợi bản release của 2.7, chúng ta hãy cùng tìm hiểu một số thay đổi và tính năng đã public trong version này nào!!!

![](https://images.viblo.asia/d0958e19-522d-4c88-935d-58e45e987d70.png)

## 1.Enumerable#tally

Đây là một phương thức Ruby mới, nó đếm tất cả các phần tử trong một mảng và trả về một `hash` với số đếm của chúng.

Bạn có thể tự làm điều này, nhưng phương thức `tally` này giúp bạn tiết kiệm công việc đó.

Ví dụ:
```
%w(a a a b b c).tally
# {"a"=>3, "b"=>2, "c"=>1}
```

Nó rất hữu ích phải không.

[Tham khảo thêm](https://viblo.asia/p/ruby-27-co-gi-moi-method-moi-tally-XL6lAoyAKek)

## 2.Numbered Parameters For Blocks (Experimental)

Đây là một tính năng mới thú vị, nó là một tên mặc định cho các tham số trong một `block`.

Ví dụ với một `block` đơn giản:

```
[1,2,3].each { |n| puts n }
```


`|n|`  đóng vai trò là tham số, làm sao để bạn có thể xác định và sử dụng được nó

Nhưng nếu chúng ta đặt cho chúng những cái tên mặc định thì sao?

Đó là một trong những tính năng mà Ruby 2.7 mang lại, mặc dù là một tính năng thử nghiệm (Experimental), nó có thể giúp chúng ta tiết kiệm rất nhiều việc code

Ví dụ:

```
[1,2,3].each { puts _1 }
# 1
```

Với `_1` chính là tham số thứ nhất, chúng ta cũng có thể sử dụng `_2` ứng với tham số thứ 2 và `_3` là tham số thứ 3

Chú ý là sẽ không có giá trị `_0`

Trước đó, Matz đã định đặt định danh cho biến trên là `@1`, nhưng vi nó trông khá giống instance variable, nên sau khi thảo luận, nó đã được thay thế bằng `_1`

## 3.Array#intersection

Phuơng thức mới nhưng không phải là chức năng mới

Nó giống như là một `alias`

Ruby 2.6 trước đó đã giới thiệu các phương thức `#union` & `#difference` của Array, để phù hợp với các ngắn gọn hơn  `#|` và  `# -`.

Nhưng nó lại thiếu đi phuơng thức #intersection, ta chỉ biết nó với cú pháp ngắn gọn hơn đó là `&` ( tìm các phần tử giống nhau giữa 2 mảng)

Ví dụ

```
[1, 2, 3].intersection([2, 3, 4])
# [2, 3]

[1, 2, 3] & [2, 3, 4]
# [2, 3]
```

![](https://images.viblo.asia/8ae84ea3-6f1d-4c34-b4e0-f8b8800a8620.PNG)

[Tham khảo thêm](https://blog.saeloun.com/2019/10/14/ruby-adds-array-intersection.html)


## 4.Enumerable#filter_map

`filter_map` là phương thức kết hợp của 2 phương thức `filter` và `map` ( Đúng như tên gọi của nó)

Bạn có thể làm điều này trong 2 cách:

```
(1..8).select(&:even?).map { |n| n ** 2 }
# OR
(1..8).map { |n| n ** 2 if n.even? }.compact
```

Ta nghiêng về cách thứ nhất hơn, vì nó tường minh dễ hình dung hơn

Và với hiện tại, ruby 2.7 sẽ làm điều đó với `filter_map`

```
(1..8).filter_map { |n| n ** 2 if n.even? }
# [4, 16, 36, 64]
```

Đơn giản phải không nào

Bên cạnh đó, có một vài điều bạn nên biết

Đó là `filter_map` không giống với `map + compact`, bởi vì nó sẽ loại bỏ cả những `false object` và `compact`  thì không 

## 5.Enumerator#produce

Đây là phương thức mới khá thú vị, nhưng nó lại đòi hỏi một số khả năng sáng tạo của bạn nếu muốn tận dụng tối da

`Enumerator#produce` là gì nào ???

Theo như đề xuất tính năng: 

> “This method produces an infinite sequence where each next element is calculated by applying the block to the previous element.”

Có nghĩa là nó sẽ tạo ra một chuỗi vô hạn không có điểm dừng

Ví dụ:

```
Enumerator.produce(1, &:next).take(5)
# [1, 2, 3, 4, 5]
```

Ở ví dụ trên, không thành vấn đề nếu bạn muốn lấy 10 `take(10)` hoặc 10000 `take(10000)` phần tử

`1` là giá trị khởi tạo của nó

Và `&:next` là phương thức được gọi để sinh ra phần tử tiếp theo trong chuỗi

## 6.IRB Gets a Face Lift?

Gần đây, IRB đã nhận được nhiều sự chú ý, và Ruby 2.7 tiếp tục bổ sung thêm nó.

We’re getting:

Chúng ta sẽ có:

* Multi-line editing
* Viết cú pháp nhiều dòng (Multi-line editing)
* Highlighting cú pháp
* Tích hợp thêm Ruby Document
* Command history được bật mặc định
* Auto-completion được bật mặc định

Đây là một thay đổi lớn, nó lớn đến mức mà sẽ có thông báo hiện ra nếu bạn bắt đầu cài đặt irb với Ruby 2.7

## 7.Ruby Pattern Matching (Experimental)

Một tính năng luôn được yêu cầu và nó đã đến trong bản 2.7 tên là  `Pattern Matching`

Nó được đánh dấu là thử nghiệm.

Theo như tôi hiểu chính xác thì `pattern matching` giống như `regular expressions`, nhưng dành cho cấu trúc dữ liệu (Array/Hash).

Ví dụ:

```
[1,2,3] in [a,b,c] # true
[1,2,3] in [a]     # false
```

Nếu như match thành công, các tên biến này `a`  sẽ  trờ thành biến local, và bạn có thể truy cập được nó.

Ví dụ với hash:

```
{ a: 1, b: 2, c: [] } in { a: a, b: b, c: [] }
# true

p a
# 1
```

Keyword là `in`

Nó thật dễ hiểu phải không!!

## 8.Tổng kết

Trên đây là những cập nhật mới nhất về ngôn ngữ lập trình Ruby

Mong rằng bài viết này sẽ giúp cho mọi người có cái nhìn khái quát trước khi bản release 2.7 được tung ra

Cảm ơn mọi người đã theo dõi

Tài liệu tham khảo: https://www.rubyguides.com/2019/12/ruby-2-7-new-features/