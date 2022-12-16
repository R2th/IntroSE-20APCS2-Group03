# TÌm hiểu về Next & Break Keywords trong Ruby

Keywords giống như *next* và *break*  là một phần quan trọng của Ruby, vậy nên nếu bạn muốn hiểu rõ về Ruby thì bạn cần phải biết cách thức hoạt động của các keywords này. Bài viết này sẽ giúp bạn làm được điều đó.

## 1. Tác dụng của *next* và *break*

Trong Ruby cũng giống như các ngôn ngữ khác, chúng ta có nhiều loại [vòng lặp ](https://www.rubyguides.com/ruby-tutorial/loops/) như :

* while
* until
* each
* times
* etc…

Khi [viết một vòng lặp](https://www.rubyguides.com/ruby-tutorial/loops/),  bạn có thể muốn bỏ qua một lần lặp nào đó hoặc dừng vòng lắp sớm, *next* và *break* sẽ giúp bạn thực hiện mong muốn này. Hãy khám phá cách chúng hoạt động.

## 2. "next" keyword

*next* keyword giúp chúng ta bỏ qua một lần lặp.
Ví dụ trong trường hợp đếm một chuỗi, nhưng vì một số lí do nào đó mà bạn không muốn đếm chuỗi ở vị trí mà size của string bằng 4. Bạn có thể làm như sau:

```
strings = ["one", "two", "four", "five"]
strings.inject(0) do |sum, str|
  next if str.size == 4
  sum + str.size
end
# nil
```

Tuy nhiên, đoạn code trên sẽ không chạy và trả về giá trị nil. Tại sao lại thế?
Bởi vì *next* mặc định trả về giá trị nil giống như việc bạn gọi `return` mà không trả về giá trị nào. Như bạn đã biết, `inject`  lấy giá trị cuối cùng được trả về bởi khối lệnh và trở thành tham số đầu tiên của lần lặp tiếp theo. Nói cách khác thì `sum` ở đây sẽ bằng `nil`
Vậy giải pháp ở đây là gì? Hãy thay đổi code như sau và nó sẽ trả về giá trị của `sum` :

```
next sum if str.size == 4
```
Nếu hiệu suất không phải là ưu tiên cao nhất (thường là không phải), bạn có thể lọc trước mảng để tránh phải sử dụng *next*.
Hoặc để tốt hơn: 
```
strings = ["one", "two", "four", "five"]
strings.inject(0) { |sum, str| str.size == 4 ? sum : sum + str.size }
# 6
```
Tôi nghĩ rằng Ruby cung cấp cho bạn đầy đủ tools để bạn tránh phải sử dụng *next* , hãy sử dụng chúng!

## 3. "break" keyword

break cũng giống như next, nhưng nó dùng để dừng vòng lặp và trả về một giá trị, thay vì dừng một lần lặp. Nó có thể được sử dụng cho việc return sớm từ một vòng lặp.
> Why not use the return keyword? Because it will exit from the current method, not just the loop.

hoặc kết thúc một vòng lặp vô điều kiện
Ví dụ: in danh sách số từ 0 đến 9
```
count = 0
loop do
  break if count == 10
  puts count
  count += 1
end
```

Một cách khác tốt hơn là sử dụng phương thức `times`, `upto`, hoặc một phạm vi cộng với mỗi method.

Ví dụ:
```
0.upto(9).each(&method(:puts))
```
Ở đây, `&method(:puts)` chỉ là một phím tắt để gọi `puts` cho mỗi số.

Tránh nhầm lẫn `next` như một method Ruby, bởi vì một số cái tồn tại như một keyword, nó không có nghĩa là nó không thể sử dụng như một method. Một số ít class trong Ruby implement `next` như một method.

Ví dụ như `String` và `Integer`:
```
1.next
# 2
"zz".next
# "aaa"
```
Thật ngạc nhiên phải không?
Vậy thì chúng đã hoạt động như thế nào?

Mọi class trong Ruby implement chính nó ở phiên bản sau trong đó có logic cho giá trị next. Với Integer , sẽ cộng thêm 1. Với String, sẽ tăng kí tự cuối cùng thêm 1 (kí tự tiếp theo), +1 đối với số. Nếu có chuyển đổi 9 -> 0, z -> a, nó sẽ tăng kí tự tiếp theo bên trái.

## Kết luận:

Như vậy tôi vừa giới thiệu về next và break keywords trong Ruby, cách chúng bỏ qua 1 lần lặp, hoặc dừng vòng lặp sớm. Giờ là đến lượt bạn thực hành :)

Thanks for reading!

### Nguồn tham khảo:
bài viết được dịch từ :

https://www.rubyguides.com/2019/09/ruby-next-break-keywords/