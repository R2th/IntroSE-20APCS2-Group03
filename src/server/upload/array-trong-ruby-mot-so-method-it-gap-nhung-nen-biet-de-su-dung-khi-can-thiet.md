# 1. Giới thiệu 
Hôm nay trong quá trình hệ thống lại tất cả các methods về array trong ruby. Mình tranh thủ note lại luôn một số method ít sử dụng mà nếu ko biết về nó thì mình lại phải mày mò tốn thời gian trong khi nếu mình biết thì chỉ cần ráp vào là mọi chuyện easy :v: 

Nên tốt nhất `Mặc dù nó ít dùng nhưng cũng phải biết` về sự tồn tại của nó để có thể sử dụng ngay khi gặp case cần dùng tới (yaoming)
ary & other_ary → new_ary
# 2. Một số Methods
Note: Trong bài viết này mình sử dụng từ viết tắt `ary` == `array`
## 2.1 ary `&` other_ary → new_ary
Trả về mảng mới với các phần tử chung của cả 2 mảng và không có phần tử duplicate

**Ví dụ:** `[ 1, 1, 2, 4 ] & [ 1, 2, 6 ]   #=> [ 1, 2 ]`

Lúc trước mình có dùng trong trường hợp hơi củ chuối tí là khi query 2 mảng id theo 2 điều kiện khác nhau (2 điều kiện này khá là phức tạp nên ko gộp trung vào 1 câu query được) sau đó lấy uniq mảng ids này.

## 2.2 ary `* int/float` → new_ary | ary * str → new_str
Đều trả về 1 mảng mới khi đem array đi nhân. Tuy nhiên: 
* Khi nhân với `i` integer: Lặp lại với `i` lần mảng hiện tại. `[ 1, 2, 3 ] * 3    #=> [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]`

* Khi nhân với `f` float: Lặp lại với mảng với số lần làm tròn xuống của f. `[ 1, 2, 3 ] * 3.7    #=> [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]`
* Khi nhân với string: tạo tạo thành string. `[ 1, 2, 3 ] * "a" #=> "1a2a3a"`

## 2.3 ary << obj → ary
Đưa obj vào chính mảng hiện tại

Ví dụ: `[ 1, 2 ] << "c" << "d" << [ 3, 4 ] #=>  [ 1, 2, "c", "d", [ 3, 4 ] ]`

Trường hợp đưa phần tử vào mảng, Tùy vào trường hợp để sử dụng. nếu cách `<<` này sẽ `đỡ tốn bộ nhớ hơn` so với cộng 2 mảng. 

Vì khi cộng 2 mảng thì nó sẻ khởi tạo ra mảng mới. **ary + other_ary → new_ary**
## 2.4 ary <=> other_ary → -1, 0, +1 or nil
Nó sẽ tiến hành lấy từ giá trị của thằng sau so sánh với thằng trước theo index 

* Trả về nil nếu đem ary so sánh với datatype khác
     *  Ví dụ  `[1, 2] <=> "a"` Hoặc `[1, 2] <=> 1` Hoặc `[1, 2] <=> {}` vân vân và mây mây

* Trả về -1 nếu other_ary có ký tự khác bằng nhau:
     * Ví dụ:  `[1, 2, 3] <=> [1,2,2]` 
     * Trừơng hợp nhiều thằng sau đúng những phần tử đầu những nhiều hơn cũng không đc. VD như này: `[1, 2, 3] <=> [1, 2, 3, 4]`
     
 * Trả về 0 nếu 2 array bằng nhau:
     * Ví dụ  `[1, 2] <=> [1, 2]`

* Trả về 1 nếu 2 array bằng nhau:
     * Ví dụ  `[1, 2, 3] <=> [1, 2]`

## 2.4 Một số hàm cắt ary, lấy giá trị của ary
**ary[index] → obj or nil**

**ary[start, length] → new_ary or nil**

**ary[range] → new_ary or nil**

**slice(index) → obj or nil**

**slice(start, length) → new_ary or nil**

**slice(range) → new_ary or nil**

Ví dụ: 
```
a = [ "a", "b", "c", "d", "e" ]
a[2] + a[0] + a[1]    #=> "cab"
a[6]                   #=> nil
a[1, 2]                #=> [ "b", "c" ]
a[1..3]                #=> [ "b", "c", "d" ]
a[4..7]                #=> [ "e" ]
a[6..10]               #=> nil
a[-3, 3]               #=> [ "c", "d", "e" ]
# special cases
a[5]                   #=> nil
a[5, 1]                #=> []
a[5..10]               #=> []
```
## 2.4 at(index) → obj or nil
```
a = [ "a", "b", "c", "d", "e" ]
a.at(0)     #=> "a"
a.at(-1)    #=> "e"
```
## 2.5 clear → ary
```
a = [ "a", "b", "c", "d", "e" ]
a.clear    #=> [ ]
```
## 2.6 compact → new_ary và compact! → ary or nil
Tạo ra mảng mới với các giá trị của mảng cũ khác nil
```
A = [ "a", nil, "b", nil, "c" ]
A.compact #=> [ "a", "b", "c" ]
A #=> [ "a", nil, "b", nil, "c" ]

```

**compact!** chỉ khác `compact` là nó thao tác trên chính bản thân mảng đó mà không tạo ra mảng copy
```
A = [ "a", nil, "b", nil, "c" ]
A.compact! #=> [ "a", "b", "c" ]
A #=> [ "a", "b", "c" ]
```

```
[ "a", "b", "c" ].compact! #> nil
```
## 2.7 Counting
**count → int**

**count(obj) → int**

**count { |item| block } → int**

```
ary = [1, 2, 4, 2]
ary.count             #=> 4
ary.count(2)          #=> 2 # count theo giá trị
ary.count{|x|x%2==0}  #=> 3 # count theo điều kiện
```

## 2.8 delete_if {|item| block } → ary
Xóa theo điều kiện
```
a = [ "a", "b", "c" ]
a.delete_if {|x| x >= "b" }   #=> ["a"]
```
## 2.9 flatten
Có thể đưa về mảng cấp 1 duy nhất **flatten → new_ary**
```
s = [ 1, 2, 3 ]           #=> [1, 2, 3]
t = [ 4, 5, 6, [7, 8] ]   #=> [4, 5, 6, [7, 8]]
a = [ s, t, 9, 10 ]       #=> [[1, 2, 3], [4, 5, 6, [7, 8]], 9, 10]
a.flatten                 #=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
Hoặc loại bỏ theo cấp độ **flatten(level) → new_ary**
```
a = [ 1, 2, [3, [4, 5] ] ]
a.flatten(1)              #=> [1, 2, 3, [4, 5]]
```

#  Kết luận
Trên đây là một số method ít sử dụng nhưng lại rất thuận tiện khi gặp phải mà mình nên biết.
Còn những case hay sử dụng thì mình sẽ ko đề cập đến.

Tham khảo thêm tại https://ruby-doc.org/core-1.9.3/Array.html