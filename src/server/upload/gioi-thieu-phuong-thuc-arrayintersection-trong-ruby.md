Lấy gợi ý từ phương thức [Array#union](https://ruby-doc.org/core-2.6/Array.html#method-i-union) và [Array#difference](https://ruby-doc.org/core-2.6/Array.html#method-i-difference) . Ruby bây giờ [thêm](https://github.com/ruby/ruby/pull/2533/files) phương thức `Array#intersection` đó là một bí danh cho [Array#&](https://ruby-doc.org/core-2.6/Array.html#method-i-26)

Mục đích đằng sau những bổ sung này là làm cho các phương thức sạch hơn và dễ đọc hơn so với các toán tử của chúng.

Hãy xem từng phương thức làm gì.

## Array#intersection

Phương thức `Array#intersection` trả về một mảng mới chưa các phần tử chung của cả 2 mảng. Thứ tự sắp xếp của mảng trả về được lấy theo mảng ban đầu. Mảng kết quả có các phần từ duy nhất. Thứ tự được bảo toàn từ mảng đã cho

```
[ 1, 1, 3, 5 ].intersection([ 3, 2, 1 ]) #=> [ 1, 3 ]
[ "a" ].intersection #=> [ "a" ]
```

Bạn cũng có thể truyền nhiều mảng làm đối số cho phương thức.

`[ "a", "b", "z" ].intersection([ "a", "b", "c" ], [ "b" ])  # => [ "b" ]`

## Array#union

Một cách thiết lập khác, `Array#union` trả về mảng mới bằng cách nối các mảng khác với chính nó, không bao gồm bất kỳ bản sao nào. Thứ tự được bảo toàn từ mảng đã cho
```
[ "a", "b", "c" ].union( [ "c", "d", "a" ] ) #=> [ "a", "b", "c", "d" ]
[ "a" ].union #=> [ "a" ]
```

Giống như Array#intersection, bạn có thể truyền nhiều mảng làm đối số.

`[ 1, 2, "a" ].union([ 1, 27, "a" ], [ 2, "I" ]) #=> [ 1, 2, "a", 27, "I" ]`

## Array#difference
Như tên gọi của nó. `Array#difference` trả về một mảng mới với các phần tử khác nhau của 2 mảng. Thứ tự được bảo toàn từ mảng đã cho.

`[ 1, 4, 7, 8, "a", :t ].difference([ 4, :t ]) #=> [ 1, 7, 8, "a" ]`

Giống như 2 phương thức trên, bạn hoàn toàn có thể truyền nhiều mảng làm đối số

`[ 1, 4, 7, 8, "a", :t ].difference([ 4, :t ], [ "a" ]) #=> [ 1, 7, 8 ]`